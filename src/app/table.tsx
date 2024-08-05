import React from 'react'

interface TableRow {
  number: number
  text: string
  speaker_code: number
  from: number
  to: number
  label: number
  new_label: number | null
}

interface TableProps {
  testTable: TableRow[]
  cursor: number
  setCursor: React.Dispatch<React.SetStateAction<number>>
  handleLabelChange: (index: number, newLabel: number | null) => void
  predictedLabel: number | null
  handleTextClick: (index: number) => void
}

const Table: React.FC<TableProps> = ({
  testTable,
  cursor,
  setCursor,
  handleLabelChange,
  predictedLabel,
  handleTextClick,
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
          const isInvalid =
            row.new_label !== null && row.new_label >= row.number
          const isEmpty = row.new_label === null

          return (
            <tr
              key={row.number}
              style={{
                backgroundColor: cursor === index ? '#f0f0f0' : 'transparent',
              }}
            >
              <td>{row.number}</td>
              <td>
                <span
                  onClick={() => handleTextClick(index)}
                  style={{ cursor: 'pointer' }}
                >
                  {row.text}
                </span>
              </td>
              <td>{row.speaker_code}</td>
              <td>{row.from}</td>
              <td>{row.to}</td>
              <td>{row.label}</td>
              <td
                style={{
                  position: 'relative',
                }}
              >
                <input
                  type="text"
                  value={row.new_label === null ? '' : row.new_label.toString()}
                  onChange={(e) =>
                    handleLabelChange(index, parseInt(e.target.value) || null)
                  }
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
