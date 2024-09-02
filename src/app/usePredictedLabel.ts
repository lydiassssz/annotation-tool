import { useCSVData } from '@/app/CSVContext'
import type { TableRow } from '@/app/utils'
import { useState } from 'react'

export const usePredictedLabel = (testTable: TableRow[], cursor: number) => {
  const [predictedLabel, setPredictedLabel] = useState<number | null>(null)
  const { teacherSpeakerCode } = useCSVData()

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

        if (currentSpeakerCode === teacherSpeakerCode) {
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

  const calculatePreviousLabel = () => {
    return new Promise<number | null>((resolve) => {
      if (testTable.length === 0 || cursor <= 0) {
        resolve(null)
        return
      }

      for (let i = cursor; i >= 0; i--) {
        if (testTable[i].label !== null) {
          resolve(testTable[i].label)
          return
        }
      }

      resolve(null)
    })
  }

  return { predictedLabel, calculatePredictedLabel, calculatePreviousLabel }
}
