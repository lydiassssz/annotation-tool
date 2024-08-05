'use client'

import { useEffect, useRef, useState } from 'react'
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
    } else if (e.key === 'Tab') {
      const currentLabel = testTable[cursor].new_label

      if (currentLabel === null || isNaN(currentLabel)) {
        // 予測機能を使う
        const updatedTable = [...testTable]
        const prediction = await calculatePredictedLabel()
        if (prediction !== 0) {
          updatedTable[cursor].new_label = Number(prediction)
          setTestTable(updatedTable)
        }

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
    const number = testTable[index].number
    handleLabelChange(index, number)
    setCursor((prevCursor) => Math.min(prevCursor + 1, testTable.length - 1))
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
      <Table
        testTable={testTable}
        cursor={cursor}
        setCursor={setCursor}
        handleLabelChange={handleLabelChange}
        predictedLabel={predictedLabel}
        handleTextClick={handleTextClick}
        inputRefs={inputRefs} // 追加
      />
    </>
  )
}
