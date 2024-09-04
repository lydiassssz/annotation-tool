'use client'

import type { TableRow } from '@/utils/table_type'
import { test_table } from '@/utils/table_type'
import React, { createContext, useContext, useEffect, useState } from 'react'

interface CSVContextProps {
  csvData: TableRow[]
  setCSVData: (data: TableRow[]) => void
  teacherSpeakerCode: number
  setTeacherSpeakerCode: (code: number) => void
}

const CSVContext = createContext<CSVContextProps | undefined>(undefined)

export const CSVProvider = ({ children }: { children: React.ReactNode }) => {
  const [csvData, setCSVData] = useState<TableRow[]>(test_table)
  const [teacherSpeakerCode, setTeacherSpeakerCode] = useState<number>(1) // デフォルトを1に設定

  // teacherSpeakerCodeが変化した際にログを出力
  useEffect(() => {
    console.log(`Teacher speaker code changed to: ${teacherSpeakerCode}`)
  }, [teacherSpeakerCode])

  return (
    <CSVContext.Provider
      value={{ csvData, setCSVData, teacherSpeakerCode, setTeacherSpeakerCode }}
    >
      {children}
    </CSVContext.Provider>
  )
}

export const useCSVData = () => {
  const context = useContext(CSVContext)
  if (!context) {
    throw new Error('useCSVData must be used within a CSVProvider')
  }
  return context
}
