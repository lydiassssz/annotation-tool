export const useInputValidation = (testTable, setTestTable) => {
  const handleLabelChange = (index, newLabel) => {
    const updatedTable = [...testTable]
    const number = updatedTable[index].number

    // 数字以外の入力を無効にし、number以上の値も受け付ける
    const numericValue = newLabel === '' ? '' : parseInt(newLabel, 10) || ''

    updatedTable[index].new_label = numericValue === '' ? NaN : numericValue

    setTestTable(updatedTable)
  }

  return { handleLabelChange }
}
