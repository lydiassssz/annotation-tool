'use client'

import { useCSVData } from '@/app/CSVContext'
import { useEffect, useRef, useState } from 'react'
import Table from './table'
import { useInputValidation } from './useInputValidation'
import { usePredictedLabel } from './usePredictedLabel'

export default function Page() {
  const { csvData } = useCSVData()
  const [testTable, setTestTable] = useState(csvData)
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

      if (currentLabel === null) {
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
    if (cursor !== index) {
      const number = testTable[index].number
      handleLabelChange(cursor, number)
    }
    setCursor((prevCursor) => Math.min(prevCursor + 1, testTable.length - 1))
  }

  const handleInputClick = (index: number) => {
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

  useEffect(() => {
    setTestTable(csvData)
  }, [csvData])

  return (
    <div>
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
    </div>
  )
}
