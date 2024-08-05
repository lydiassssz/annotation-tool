// 型の定義
export interface TableRow {
  number: number
  text: string
  speaker_code: number
  from: number
  to: number
  label: number
  new_label: number | null
}

// test_tableをTableRow[]型に変更
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
  {
    number: 5,
    text: 'テキスト4',
    speaker_code: 3,
    from: 9.02,
    to: 15.26,
    label: 0,
    new_label: 0,
  },
  {
    number: 6,
    text: 'テキスト5',
    speaker_code: 2,
    from: 15.26,
    to: 15.82,
    label: 5,
    new_label: 5,
  },
  {
    number: 7,
    text: 'テキスト6',
    speaker_code: 3,
    from: 15.82,
    to: 29.14,
    label: 5,
    new_label: 5,
  },
  {
    number: 8,
    text: 'テキスト7',
    speaker_code: 2,
    from: 29.14,
    to: 29.82,
    label: 7,
    new_label: 7,
  },
  {
    number: 9,
    text: 'テキスト8',
    speaker_code: 3,
    from: 29.82,
    to: 37.6,
    label: 7,
    new_label: 7,
  },
  {
    number: 10,
    text: 'テキスト9',
    speaker_code: 1,
    from: 37.6,
    to: 39.28,
    label: 9,
    new_label: null,
  },
  {
    number: 11,
    text: 'テキスト10',
    speaker_code: 3,
    from: 39.4,
    to: 44.53999999999999,
    label: 10,
    new_label: null,
  },
  {
    number: 12,
    text: 'テキスト11',
    speaker_code: 2,
    from: 44.54,
    to: 45.62,
    label: 11,
    new_label: null,
  },
  {
    number: 13,
    text: 'テキスト12',
    speaker_code: 3,
    from: 45.62,
    to: 57.74,
    label: 11,
    new_label: null,
  },
  {
    number: 14,
    text: 'テキスト1',
    speaker_code: 2,
    from: 57.74,
    to: 57.94,
    label: 13,
    new_label: null,
  },
]
