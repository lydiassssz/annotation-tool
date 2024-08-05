import React, { useEffect } from 'react'

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
  inputRefs: React.MutableRefObject<HTMLInputElement[]> // 追加
}

const Table: React.FC<TableProps> = ({
  testTable,
  cursor,
  setCursor,
  handleLabelChange,
  predictedLabel,
  handleTextClick,
  inputRefs,
}) => {
  const handleInputChange = (
    index: number,
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    handleLabelChange(index, parseInt(e.target.value) || null)
  }

  useEffect(() => {
    if (inputRefs.current[cursor]) {
      const input = inputRefs.current[cursor]
      const { selectionStart, selectionEnd } = input
      // ここでカーソル位置の変更に対応する処理を追加
    }
  }, [cursor])

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
                  onChange={(e) => handleInputChange(index, e)}
                  onClick={() => setCursor(index)}
                  ref={(el) => {
                    if (el) inputRefs.current[index] = el
                  }} // 修正
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
