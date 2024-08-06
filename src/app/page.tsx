'use client'

import { useEffect, useRef, useState } from 'react'
import { CSVDownloader } from './CSVDownloader' // 追加
import { CSVReader } from './CSVReader'
import Table from './table'
import { useInputValidation } from './useInputValidation'
import { usePredictedLabel } from './usePredictedLabel'
import { test_table } from './utils'

export default function Page() {
  const [testTable, setTestTable] = useState(test_table)
  const [cursor, setCursor] = useState(0)
  const inputRefs = useRef<HTMLInputElement[]>([])
  const { predictedLabel, calculatePredictedLabel } = usePredictedLabel(
    testTable,
    cursor,
  )
  const { handleLabelChange } = useInputValidation({ testTable, setTestTable })

  const handleKeyDown = async (e: {
    key: string
    preventDefault: () => void
  }) => {
    if (e.key === 'ArrowUp' && cursor > 0) {
      setCursor(cursor - 1)
    } else if (e.key === 'ArrowDown' && cursor < testTable.length - 1) {
      setCursor(cursor + 1)
    } else if (e.key === 'Enter' && cursor < testTable.length - 1) {
      setCursor(cursor + 1)
    } else if (e.key === 'Space' && cursor === testTable.length - 1) {
      setCursor(cursor + 1)
    } else if (e.key === 'Tab') {
      const currentLabel = testTable[cursor].new_label

      if (currentLabel === null) {
        // 予測機能を使う
        const updatedTable = [...testTable]
        const prediction = await calculatePredictedLabel()
        updatedTable[cursor].new_label = Number(prediction)

        setTestTable(updatedTable)
        setCursor((prevCursor) =>
          Math.min(prevCursor + 1, testTable.length - 1),
        )
        e.preventDefault()
      } else {
        setCursor((prevCursor) =>
          Math.min(prevCursor + 1, testTable.length - 1),
        )
        e.preventDefault()
      }
    }
  }

  const handleTextClick = (index: number) => {
    // 現在編集中の行に値を設定する
    const number = testTable[index].number
    handleLabelChange(cursor, number)
    // カーソルを1つ下に移動する
    setCursor((prevCursor) => Math.min(prevCursor + 1, testTable.length - 1))
  }

  const handleInputClick = (index: number) => {
    // inputがクリックされた時、カーソルをその行に移動する
    setCursor(index)
  }

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown)
    return () => {
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [cursor, testTable.length])

  useEffect(() => {
    if (inputRefs.current[cursor]) {
      inputRefs.current[cursor].focus()
    }
  }, [cursor])

  useEffect(() => {
    calculatePredictedLabel()
  }, [cursor])

  const handleDataLoaded = (data: typeof testTable) => {
    setTestTable(data)
  }

  return (
    <>
      <CSVReader onDataLoaded={handleDataLoaded} />
      <CSVDownloader
        data={testTable}
        filename="annotated_data.csv" // デフォルトファイル名
        style={{ position: 'absolute', top: 10, right: 10 }}
      />
      <Table
        testTable={testTable}
        cursor={cursor}
        setCursor={setCursor}
        handleLabelChange={handleLabelChange}
        predictedLabel={predictedLabel}
        handleTextClick={handleTextClick}
        handleInputClick={handleInputClick}
        inputRefs={inputRefs}
      />
    </>
  )
}
