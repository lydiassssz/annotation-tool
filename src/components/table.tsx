import { useCSVData } from '@/features/csv/CSVContext'
import type { TableProps } from '@/utils/table_type'
import { getBackgroundColor, getSpeakerCodeForLabel } from '@/utils/table_type'
import React from 'react'

const Table: React.FC<TableProps> = ({
  dataTable,
  cursor,
  handleLabelChange,
  predictedLabel,
  handleTextClick,
  handleInputClick,
  inputRefs,
}) => {
  const { teacherSpeakerCode } = useCSVData()

  if (dataTable.length === 0) {
    return <div>No data available.</div>
  }

  const headers = Object.keys(dataTable[0])

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
          {dataTable.map((row, index) => {
            const isCursor = cursor === index
            const bgColor = getBackgroundColor(
              row.speaker_code,
              isCursor,
              teacherSpeakerCode,
            )

            const speakerCodeForLabel = getSpeakerCodeForLabel(
              row.new_label,
              dataTable,
            )
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
                  const cellValue = row[header as keyof typeof row]

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
