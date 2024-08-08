'use client'

import type { TableRow } from '@/app/utils'
import { test_table } from '@/app/utils'
import React, { createContext, useContext, useState } from 'react'

interface CSVContextProps {
  csvData: TableRow[]
  setCSVData: (data: TableRow[]) => void
}

const CSVContext = createContext<CSVContextProps | undefined>(undefined)

export const CSVProvider = ({ children }: { children: React.ReactNode }) => {
  const [csvData, setCSVData] = useState<TableRow[]>(test_table)

  return (
    <CSVContext.Provider value={{ csvData, setCSVData }}>
      {children}
    </CSVContext.Provider>
  )
}

export const useCSVData = () => {
  console.log('useCSVData')
  const context = useContext(CSVContext)
  if (!context) {
    throw new Error('useCSVData must be used within a CSVProvider')
  }
  return context
}
