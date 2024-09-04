// 型の定義
// from,toはセット5以降に存在しないカラムになりました。labelは今後存在しないカラムになる可能性があります。
import type React from 'react'

export interface TableRow {
  number: number
  text: string
  speaker_code: number
  from?: number | null
  to?: number | null
  label?: number | null
  new_label: number | null
}

export type TableProps = {
  dataTable: TableRow[]
  cursor: number
  setCursor: React.Dispatch<React.SetStateAction<number>>
  handleLabelChange: (index: number, newLabel: number | null) => void
  predictedLabel: number | null
  handleTextClick: (index: number) => void
  handleInputClick: (index: number) => void
  inputRefs: React.MutableRefObject<HTMLInputElement[]>
}

export const getBackgroundColor = (
  speaker_code: number,
  isCursor: boolean,
  teacherSpeakerCode: number,
): string => {
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

export const getSpeakerCodeForLabel = (
  label: number | null,
  dataTable: TableRow[],
): number | null => {
  const foundRow = dataTable.find((row) => row.number === label)
  return foundRow ? foundRow.speaker_code : null
}

// test用、初期表示用のデータ(ここに書くのは美しくないような気もするがどうなんだろうか...)
export const test_table: TableRow[] = [
  {
    number: 2,
    text: 'テキスト1',
    speaker_code: 2,
    from: 3.52,
    to: 6.29999999999999,
    label: 0,
    new_label: 0,
  },
  {
    number: 3,
    text: 'テキスト2',
    speaker_code: 3,
    from: 6.3,
    to: 7.9,
    label: 2,
    new_label: 2,
  },
  {
    number: 4,
    text: 'テキスト3',
    speaker_code: 2,
    from: 7.9,
    to: 9.02,
    label: 0,
    new_label: 0,
  },
]
