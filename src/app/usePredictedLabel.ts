import { useState } from 'react'

export const usePredictedLabel = (testTable, cursor) => {
  const [predictedLabel, setPredictedLabel] = useState(NaN)

  const calculatePredictedLabel = () => {
    return new Promise((resolve) => {
      let prediction = 0
      if (isNaN(testTable[cursor].new_label)) {
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
        prediction = testTable[cursor].new_label
      }
      resolve(prediction)
      setPredictedLabel(prediction)
    })
  }

  return { predictedLabel, calculatePredictedLabel }
}
