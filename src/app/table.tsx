// table.tsx

import { useCSVData } from '@/app/CSVContext'
import type { TableRow } from '@/app/utils'
import React from 'react'

const getBackgroundColor = (
  speaker_code: number,
  isCursor: boolean,
  teacherSpeakerCode: number,
) => {
  const colors: Record<number, [string, string]> = {
    1: ['#cce5ff', '#a5c2ea'],
    2: ['#d4edda', '#a3d5af'],
    3: ['#fff3cd', '#ffe597'],
    4: ['#f8d7da', '#f5c6cb'],
    5: ['#ffe5d4', '#f8c6a2'],
    6: ['#e2d9f3', '#d0a6f1'],
  }

  if (speaker_code === teacherSpeakerCode) {
    return isCursor ? '#d9d9d9' : '#f0f0f0'
  }

  const colorPair = colors[speaker_code] || ['transparent', 'transparent']
  return isCursor ? colorPair[1] : colorPair[0]
}

interface TableProps {
  testTable: TableRow[]
  cursor: number
  setCursor: React.Dispatch<React.SetStateAction<number>>
  handleLabelChange: (index: number, newLabel: number | null) => void
  predictedLabel: number | null
  handleTextClick: (index: number) => void
  handleInputClick: (index: number) => void
  inputRefs: React.MutableRefObject<HTMLInputElement[]>
}

const Table: React.FC<TableProps> = ({
  testTable,
  cursor,
  handleLabelChange,
  predictedLabel,
  handleTextClick,
  handleInputClick,
  inputRefs,
}) => {
  const { teacherSpeakerCode } = useCSVData()

  if (testTable.length === 0) {
    return <div>No data available.</div>
  }

  const headers = Object.keys(testTable[0])

  // 追加: 入力した `new_label` に対応する `speaker_code` を取得する関数
  const getSpeakerCodeForLabel = (label: number | null) => {
    const foundRow = testTable.find((row) => row.number === label)
    return foundRow ? foundRow.speaker_code : null
  }

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full border-collapse">
        <thead>
          <tr>
            {headers.map((header) => (
              <th
                key={header}
                className={`w-40 p-2 capitalize ${header === 'from' || header === 'to' ? 'hidden-column' : ''}`}
              >
                {header.replace('_', ' ')}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {testTable.map((row, index) => {
            const isCursor = cursor === index
            const bgColor = getBackgroundColor(
              row.speaker_code,
              isCursor,
              teacherSpeakerCode,
            )

            // 追加: `new_label` が `number` 列の `speaker_code` と一致する場合の判定
            const speakerCodeForLabel = getSpeakerCodeForLabel(row.new_label)
            const isInvalid =
              row.new_label !== null &&
              (row.new_label >= row.number ||
                speakerCodeForLabel === row.speaker_code)
            const isEmpty = row.new_label === null

            return (
              <tr
                key={row.number || index}
                className={`border-t ${isCursor ? 'bg-gray-200' : ''}`}
              >
                {headers.map((header) => {
                  const cellValue = row[header as keyof TableRow]

                  // 特定のカラムに対する処理
                  switch (header) {
                    case 'number':
                      return (
                        <td
                          key={header}
                          className="p-2"
                          style={{ backgroundColor: bgColor }}
                        >
                          {cellValue}
                        </td>
                      )

                    case 'text':
                      return (
                        <td
                          key={header}
                          className="w-1/2 cursor-pointer p-2"
                          style={{ backgroundColor: bgColor }}
                          onClick={() => handleTextClick(index)}
                        >
                          {cellValue}
                        </td>
                      )

                    case 'speaker_code':
                      return (
                        <td
                          key={header}
                          className="w-auto p-2"
                          style={{ backgroundColor: bgColor }}
                        >
                          {cellValue}
                        </td>
                      )

                    case 'from':
                    case 'to':
                      return (
                        <td
                          key={header}
                          className="hidden-column p-2"
                          style={{ backgroundColor: bgColor }}
                        >
                          {Number(cellValue).toFixed(2)}
                        </td>
                      )

                    case 'label':
                      return (
                        <td
                          key={header}
                          className="w-auto p-2"
                          style={{ backgroundColor: bgColor }}
                        >
                          {cellValue}
                        </td>
                      )

                    case 'new_label':
                      return (
                        <td
                          key={header}
                          className="relative w-auto p-2"
                          style={{
                            backgroundColor: isEmpty
                              ? 'transparent'
                              : isInvalid
                                ? '#fdd'
                                : 'white',
                            color: isInvalid ? '#a00' : 'inherit',
                          }}
                        >
                          <input
                            type="text"
                            value={
                              cellValue == null ? '' : cellValue.toString()
                            }
                            onChange={(e) =>
                              handleLabelChange(
                                index,
                                e.target.value === ''
                                  ? null
                                  : Number(e.target.value),
                              )
                            }
                            onClick={() => handleInputClick(index)}
                            ref={(el) => {
                              if (el) inputRefs.current[index] = el
                            }}
                            className="w-full"
                          />
                          {cursor === index &&
                            isEmpty &&
                            predictedLabel !== null && (
                              <span
                                className="absolute left-2 top-1/2 z-0 -translate-y-1/2 text-gray-500"
                                style={{
                                  pointerEvents: 'none',
                                }}
                              >
                                {predictedLabel}
                              </span>
                            )}
                        </td>
                      )

                    default:
                      // 不明なカラムに対する汎用的な処理
                      return (
                        <td
                          key={header}
                          className="w-auto p-2"
                          style={{ backgroundColor: bgColor }}
                        >
                          {cellValue}
                        </td>
                      )
                  }
                })}
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  )
}

export default Table
