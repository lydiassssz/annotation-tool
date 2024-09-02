// CSVReader.tsx

import type { TableRow } from '@/app/utils'
import Encoding from 'encoding-japanese'
import React, { useRef, useState } from 'react'
import { AiOutlineUpload } from 'react-icons/ai'

interface FileUploaderProps {
  onFileLoaded: (content: ArrayBuffer) => void
}

export function FileUploader({ onFileLoaded }: FileUploaderProps) {
  const fileInputRef = useRef<HTMLInputElement | null>(null)

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (e) => {
        const content = e.target?.result as ArrayBuffer
        onFileLoaded(content)
      }
      reader.readAsArrayBuffer(file)
    }
  }

  const handleButtonClick = () => {
    fileInputRef.current?.click()
  }

  return (
    <div>
      <input
        type="file"
        accept=".csv"
        onChange={handleFileUpload}
        ref={fileInputRef}
        style={{ display: 'none' }}
      />
      <button onClick={handleButtonClick} className="btn">
        <AiOutlineUpload />
      </button>
    </div>
  )
}

export function decodeShiftJIS(arrayBuffer: ArrayBuffer) {
  const uint8Array = new Uint8Array(arrayBuffer)
  const decoded = Encoding.convert(uint8Array, {
    to: 'UNICODE',
    from: 'SJIS',
  })
  return Encoding.codeToString(decoded)
}

const parseCSV = (csvString: string): TableRow[] => {
  const rows = csvString
    .split('\n')
    .map((line) => line.trim())
    .filter((line) => line.length > 0)

  if (rows.length === 0) return []

  const headerLine = rows[0]
  const headers = headerLine.split(',').map((col) => col.trim())

  // 変数を使って、必要なカラムを前に持ってくる
  const preferredOrder = [
    'number',
    'text',
    'speaker_code',
    'from',
    'to',
    'label',
    'new_label',
  ]
  const reorderedHeaders = headers
    .filter((header) => preferredOrder.includes(header))
    .concat(headers.filter((header) => !preferredOrder.includes(header)))

  const result: TableRow[] = []

  for (let i = 1; i < rows.length; i++) {
    const row = rows[i]
    const columns = row.match(/(".*?"|[^",\s]+)(?=\s*,|\s*$)/g) || []

    const rowData: TableRow = {
      number: 0,
      text: '',
      speaker_code: 0,
      from: 0,
      to: 0,
      label: 0,
      new_label: null,
    }

    reorderedHeaders.forEach((header, index) => {
      const value = columns[index] !== undefined ? columns[index] : ''

      // 特定のカラムに対して型変換を適用
      switch (header) {
        case 'number':
        case 'speaker_code':
        case 'label':
          rowData[header] = parseInt(value, 10) || 0
          break
        case 'from':
        case 'to':
          rowData[header] = parseFloat(value) || 0
          break
        case 'new_label':
          rowData[header] =
            value === '0' || value === '' ? null : parseInt(value, 10)
          break
        case 'text':
          rowData[header] = value.replace(/^"|"$/g, '').replace(/""/g, '"') // ダブルクオートを正しく処理
          break
        default:
          break
      }
    })

    // from または to がデフォルト値のままの場合に削除する
    if (rowData.from === 0) delete rowData.from
    if (rowData.to === 0) delete rowData.to

    result.push(rowData as TableRow)
  }

  return result
}

interface CSVReaderProps {
  onDataLoaded: (data: TableRow[]) => void
}

export function CSVReader({ onDataLoaded }: CSVReaderProps) {
  const [, setCSVData] = useState<null | TableRow[]>(null)

  const handleFileLoaded = async (content: ArrayBuffer) => {
    const decodedContent = decodeShiftJIS(content)
    const parsedData: TableRow[] = parseCSV(decodedContent)
    setCSVData(parsedData)
    onDataLoaded(parsedData)
  }

  return (
    <div>
      <FileUploader onFileLoaded={handleFileLoaded} />
    </div>
  )
}
