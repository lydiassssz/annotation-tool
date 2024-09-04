'use client'

import Table from '@/components/table'
import { useCSVData } from '@/features/csv/CSVContext'
import { useHandleClick } from '@/features/input_assist/useHandleClick'
import { useHandleKeyDown } from '@/features/input_assist/useHandleKeyDown'
import { useInputValidation } from '@/features/input_assist/useInputValidation'
import { usePredictedLabel } from '@/features/input_assist/usePredictedLabel'
import { useEffect, useRef, useState } from 'react'

export default function Page() {
  const { csvData } = useCSVData()
  const [dataTable, setDataTable] = useState(csvData)
  const [cursor, setCursor] = useState(0)
  const inputRefs = useRef<HTMLInputElement[]>([])
  const { predictedLabel, calculatePredictedLabel, calculatePreviousLabel } =
    usePredictedLabel(dataTable, cursor)
  const { handleLabelChange } = useInputValidation({ dataTable, setDataTable })
  const handleKeyDown = useHandleKeyDown({
    cursor,
    setCursor,
    dataTable,
    setDataTable,
    calculatePredictedLabel,
    calculatePreviousLabel,
  })

  const { handleTextClick, handleInputClick } = useHandleClick({
    cursor,
    setCursor,
    dataTable,
    handleLabelChange,
  })

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown)
    return () => {
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [handleKeyDown])

  useEffect(() => {
    if (inputRefs.current[cursor]) {
      inputRefs.current[cursor].focus()
    }
  }, [cursor])

  useEffect(() => {
    setDataTable(csvData)
    calculatePredictedLabel().then((r) => console.log(r))
  }, [calculatePredictedLabel, csvData, cursor])

  return (
    <div>
      <Table
        dataTable={dataTable}
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
