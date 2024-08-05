// Define the types
interface TableRow {
  number: number
  text: string
  speaker_code: number
  from: number
  to: number
  label: number
  new_label: number
}

// Define the type for the function arguments
interface UseInputValidationProps {
  testTable: TableRow[]
  setTestTable: React.Dispatch<React.SetStateAction<TableRow[]>>
}

// Apply types to the function parameters
export const useInputValidation = ({
  testTable,
  setTestTable,
}: UseInputValidationProps) => {
  const handleLabelChange = (index: number, newLabel: string) => {
    const updatedTable = [...testTable]

    const numericValue = newLabel === '' ? '' : parseInt(newLabel, 10) || ''

    updatedTable[index].new_label = numericValue === '' ? NaN : numericValue

    setTestTable(updatedTable)
  }

  return { handleLabelChange }
}
