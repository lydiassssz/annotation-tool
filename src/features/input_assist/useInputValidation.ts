import type { TableRow } from '@/utils/table_type'
import type React from 'react'

// Define the types

// Define the type for the function arguments
interface UseInputValidationProps {
  dataTable: TableRow[]
  setDataTable: React.Dispatch<React.SetStateAction<TableRow[]>>
}

// Apply types to the function parameters
export const useInputValidation = ({
  dataTable,
  setDataTable,
}: UseInputValidationProps) => {
  const handleLabelChange = (index: number, newLabel: number | null) => {
    const updatedTable = [...dataTable]
    updatedTable[index].new_label = newLabel === 0 ? null : newLabel
    setDataTable(updatedTable)
  }

  return { handleLabelChange }
}
