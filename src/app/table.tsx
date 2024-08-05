import React from 'react'

interface TableRow {
  number: number
  text: string
  speaker_code: number
  from: number
  to: number
  label: number
  new_label: number | NaN
}

interface TableProps {
  testTable: TableRow[]
  cursor: number
  setCursor: React.Dispatch<React.SetStateAction<number>>
  handleLabelChange: (index: number, newLabel: string) => void
  predictedLabel: number
}

// Table component definition
const Table: React.FC<TableProps> = ({
  testTable,
  cursor,
  setCursor,
  handleLabelChange,
  predictedLabel,
}) => {
  return (
    <table>
      <thead>
        <tr>
          <th>Number</th>
          <th>Text</th>
          <th>Speaker Code</th>
          <th>From</th>
          <th>To</th>
          <th>Label</th>
          <th>New Label</th>
        </tr>
      </thead>
      <tbody>
        {testTable.map((row, index) => {
          const isInvalid = !isNaN(row.new_label) && row.new_label >= row.number
          const isEmpty = isNaN(row.new_label)

          return (
            <tr
              key={row.number}
              style={{
                backgroundColor: cursor === index ? '#f0f0f0' : 'transparent',
              }}
            >
              <td>{row.number}</td>
              <td>{row.text}</td>
              <td>{row.speaker_code}</td>
              <td>{row.from}</td>
              <td>{row.to}</td>
              <td>{row.label}</td>
              <td
                style={{
                  position: 'relative', // Set position to relative to allow absolute positioning within it
                }}
              >
                <input
                  type="text"
                  value={isNaN(row.new_label) ? '' : row.new_label}
                  onChange={(e) => handleLabelChange(index, e.target.value)}
                  onClick={() => setCursor(index)}
                  style={{
                    backgroundColor: isEmpty
                      ? 'transparent'
                      : isInvalid
                        ? '#fdd'
                        : 'transparent',
                    color: isInvalid ? '#a00' : 'inherit',
                    position: 'relative',
                  }}
                />
                {cursor === index && isEmpty && (
                  <span
                    style={{
                      position: 'absolute',
                      left: '5px',
                      top: '50%',
                      transform: 'translateY(-50%)',
                      color: predictedLabel !== row.label ? '#ff9999' : 'gray',
                      pointerEvents: 'none',
                      zIndex: 0,
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
  )
}

export default Table
