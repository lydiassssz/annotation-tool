import { useCSVData } from '@/app/CSVContext'
import type { TableRow } from '@/app/utils'
import React from 'react'

const getBackgroundColor = (
  speaker_code: number,
  isCursor: boolean,
  teacherSpeakerCode: number,
) => {
  const colors: Record<number, [string, string]> = {
    1: ['#cce5ff', '#a5c2ea'], // 薄い青、濃い青
    2: ['#d4edda', '#a3d5af'], // 薄い緑、濃い緑
    3: ['#fff3cd', '#ffe597'], // 薄い黄色、濃い黄色
    4: ['#f8d7da', '#f5c6cb'], // 薄い赤、濃い赤
    5: ['#ffe5d4', '#f8c6a2'], // 薄いオレンジ、濃いオレンジ
    6: ['#e2d9f3', '#d0a6f1'], // 薄い紫、濃い紫
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

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full border-collapse">
        <thead>
          <tr>
            <th className="w-20 p-2">Number</th>
            <th className="min-w-[200px] flex-1 p-2">Text</th>
            <th className="w-40 p-2">Speaker Code</th>
            <th className="w-40 p-2">From</th>
            <th className="w-40 p-2">To</th>
            <th className="w-40 p-2">Label</th>
            <th className="w-40 p-2">New Label</th>
          </tr>
        </thead>
        <tbody>
          {testTable.map((row, index) => {
            const isInvalid =
              row.new_label !== null && row.new_label >= row.number
            const isEmpty = row.new_label === null
            const isCursor = cursor === index
            const bgColor = getBackgroundColor(
              row.speaker_code,
              isCursor,
              teacherSpeakerCode,
            )

            return (
              <tr
                key={row.number}
                className={`border-t ${isCursor ? 'bg-gray-200' : ''}`}
              >
                <td className="p-2" style={{ backgroundColor: bgColor }}>
                  {row.number}
                </td>
                <td
                  className="flex-1 cursor-pointer p-2"
                  style={{ backgroundColor: bgColor }}
                  onClick={() => handleTextClick(index)}
                >
                  {row.text}
                </td>
                <td className="p-2" style={{ backgroundColor: bgColor }}>
                  {row.speaker_code}
                </td>
                <td className="p-2" style={{ backgroundColor: bgColor }}>
                  {row.from}
                </td>
                <td className="p-2" style={{ backgroundColor: bgColor }}>
                  {row.to}
                </td>
                <td className="p-2" style={{ backgroundColor: bgColor }}>
                  {row.label}
                </td>
                <td
                  className="relative p-2"
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
                      row.new_label === null ? '' : row.new_label.toString()
                    }
                    onChange={(e) =>
                      handleLabelChange(index, Number(e.target.value) || null)
                    }
                    onClick={() => handleInputClick(index)}
                    ref={(el) => {
                      if (el) inputRefs.current[index] = el
                    }}
                    className="w-full"
                  />
                  {cursor === index && isEmpty && (
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
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  )
}

export default Table
