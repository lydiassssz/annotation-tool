import React from 'react'

// 背景色のマッピング
const getBackgroundColor = (speaker_code: number, isCursor: boolean) => {
  const colors: Record<number, [string, string]> = {
    1: ['#f0f0f0', '#d9d9d9'], // 灰色
    2: ['#cce5ff', '#a5c2ea'], // 薄い青、濃い青
    3: ['#d4edda', '#a3d5af'], // 薄い緑、濃い緑
    4: ['#fff3cd', '#ffecb5'], // 薄い黄色、濃い黄色
    5: ['#f8d7da', '#f5c6cb'], // 薄い赤、濃い赤
    6: ['#ffe5d4', '#f8c6a2'], // 薄いオレンジ、濃いオレンジ
    7: ['#e2d9f3', '#d0a6f1'], // 薄い紫、濃い紫
  }

  // 色の配列を取得
  const colorPair = colors[speaker_code] || ['transparent', 'transparent']

  // カーソルが合わさった場合のみ濃い色
  return isCursor ? colorPair[1] : colorPair[0]
}

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
  handleInputClick: (index: number) => void
  inputRefs: React.MutableRefObject<HTMLInputElement[]>
}

const Table: React.FC<TableProps> = ({
  testTable,
  cursor,
  setCursor,
  handleLabelChange,
  predictedLabel,
  handleTextClick,
  handleInputClick,
  inputRefs,
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
          const isCursor = cursor === index
          const bgColor = getBackgroundColor(row.speaker_code, isCursor)

          return (
            <tr
              key={row.number}
              style={{
                backgroundColor: isCursor ? '#f0f0f0' : 'transparent',
              }}
            >
              <td style={{ backgroundColor: bgColor }}>{row.number}</td>
              <td
                style={{ backgroundColor: bgColor, cursor: 'pointer' }}
                onClick={() => handleTextClick(index)}
              >
                {row.text}
              </td>
              <td style={{ backgroundColor: bgColor }}>{row.speaker_code}</td>
              <td style={{ backgroundColor: bgColor }}>{row.from}</td>
              <td style={{ backgroundColor: bgColor }}>{row.to}</td>
              <td style={{ backgroundColor: bgColor }}>{row.label}</td>
              <td
                style={{
                  position: 'relative',
                }}
              >
                <input
                  type="text"
                  value={row.new_label === null ? '' : row.new_label.toString()}
                  onChange={(e) =>
                    handleLabelChange(index, Number(e.target.value) || null)
                  }
                  onClick={() => handleInputClick(index)} // 修正: inputがクリックされた時にその行にカーソルを移動
                  ref={(el) => {
                    if (el) inputRefs.current[index] = el
                  }}
                  style={{
                    backgroundColor: isEmpty
                      ? 'transparent'
                      : isInvalid
                        ? '#fdd'
                        : 'white',
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
