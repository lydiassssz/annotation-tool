import type { TableRow } from '@/app/utils'
import Encoding from 'encoding-japanese'
import React, { useRef, useState } from 'react'
import { AiOutlineUpload } from 'react-icons/ai'

type ParsedData = string[][]

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
  const result: TableRow[] = []

  // ヘッダー行をスキップする場合、最初の行を削除します
  if (rows.length > 0) {
    rows.shift() // 最初の行を削除
  }

  const regex = /(".*?"|[^",\s]+)(?=\s*,|\s*$)/g

  for (const row of rows) {
    const columns =
      row.match(regex)?.map((col) => col.replace(/(^"|"$)/g, '')) || []

    if (columns.length >= 7) {
      const [number, text, speaker_code, from, to, label, new_label] = columns

      result.push({
        number: parseInt(number, 10),
        text,
        speaker_code: parseInt(speaker_code, 10),
        from: parseFloat(from), // floatとして読み込む
        to: parseFloat(to), // floatとして読み込む
        label: parseInt(label, 10),
        new_label: new_label === '0' ? null : parseInt(new_label, 10),
      })
    }
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
