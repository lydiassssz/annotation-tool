import { useState } from 'react'

interface TestTableRow {
  speaker_code: number
  new_label: number | null
}

export const usePredictedLabel = (
  testTable: TestTableRow[],
  cursor: number,
) => {
  const [predictedLabel, setPredictedLabel] = useState<number | null>(null)

  const calculatePredictedLabel = () => {
    return new Promise((resolve) => {
      if (testTable.length === 0 || cursor < 0 || cursor >= testTable.length) {
        resolve(null)
        setPredictedLabel(null)
        return
      }

      let prediction = 0
      if (testTable[cursor].new_label === null) {
        const currentSpeakerCode = testTable[cursor].speaker_code

        if (currentSpeakerCode === 1) {
          prediction = -1
        } else {
          for (let i = cursor - 1; i >= 0; i--) {
            if (testTable[i].speaker_code === currentSpeakerCode) {
              prediction = testTable[i].new_label || 0
              break
            }
          }
        }
      } else {
        prediction = testTable[cursor].new_label || 0
      }
      resolve(prediction)
      setPredictedLabel(prediction)
    })
  }

  return { predictedLabel, calculatePredictedLabel }
}
