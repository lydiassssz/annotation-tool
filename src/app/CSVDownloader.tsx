import type { TableRow } from '@/app/utils'
import Encoding from 'encoding-japanese'
import React from 'react'
import { AiOutlineDownload } from 'react-icons/ai'

// CSV 文字列を Shift-JIS 形式でエンコードし、ダウンロードする
const downloadCSV = (data: TableRow[], filename: string) => {
  if (data.length === 0) {
    console.warn('No data to download')
    return
  }

  // ヘッダーを可変にする
  const header = Object.keys(data[0])

  const csvRows = [
    header.join(','), // ヘッダー
    ...data.map((row) => {
      const escapedRow = header.map((key) => {
        let cellValue = row[key as keyof TableRow]
        if (typeof cellValue === 'string') {
          // テキスト内のダブルクオートをエスケープし、カンマが含まれている場合は""で囲む
          cellValue = `"${cellValue.replace(/"/g, '""')}"`
        }
        return cellValue === null || cellValue === undefined
          ? ''
          : cellValue.toString()
      })
      return escapedRow.join(',')
    }),
  ]

  const csvString = csvRows.join('\r\n')

  // Shift-JIS 形式にエンコード
  const sjisArray = Encoding.convert(csvString, {
    to: 'SJIS',
    from: 'UNICODE',
    type: 'arraybuffer',
  })
  const uint8Array = new Uint8Array(sjisArray)

  // Shift-JIS エンコードのデータを Blob に渡す
  const blob = new Blob([uint8Array], { type: 'text/csv;charset=shift_jis' })

  const url = URL.createObjectURL(blob)
  const link = document.createElement('a')
  link.href = url
  link.download = filename
  link.click()
  URL.revokeObjectURL(url)
}

interface CSVDownloaderProps {
  data: TableRow[]
  filename: string
  style?: React.CSSProperties
}

export const CSVDownloader: React.FC<CSVDownloaderProps> = ({
  data,
  filename,
  style,
}) => {
  return (
    <button
      onClick={() => downloadCSV(data, filename)}
      style={style}
      className="btn"
    >
      <AiOutlineDownload />
    </button>
  )
}
