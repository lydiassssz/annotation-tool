import { useCSVData } from '@/features/csv/CSVContext'
import type { TableRow } from '@/utils/table_type'
import { useState } from 'react'

export const usePredictedLabel = (dataTable: TableRow[], cursor: number) => {
  const [predictedLabel, setPredictedLabel] = useState<number | null>(null)
  const { teacherSpeakerCode } = useCSVData()

  const calculatePredictedLabel = (): Promise<number | null> => {
    return new Promise((resolve) => {
      if (dataTable.length === 0 || cursor < 0 || cursor >= dataTable.length) {
        resolve(null)
        setPredictedLabel(null)
        return
      }

      let prediction: number | null = 0
      if (dataTable[cursor].new_label === null) {
        const currentSpeakerCode = dataTable[cursor].speaker_code

        if (currentSpeakerCode === teacherSpeakerCode) {
          prediction = -1
        } else {
          for (let i = cursor - 1; i >= 0; i--) {
            if (dataTable[i].speaker_code === currentSpeakerCode) {
              prediction = dataTable[i].new_label || 0
              break
            }
          }
        }
      } else {
        prediction = dataTable[cursor].new_label || 0
      }
      resolve(prediction)
      setPredictedLabel(prediction)
    })
  }

  const calculatePreviousLabel = (): Promise<number | null> => {
    return new Promise<number | null>((resolve) => {
      if (dataTable.length === 0 || cursor <= 0) {
        resolve(null)
        return
      }

      for (let i = cursor; i >= 0; i--) {
        if (dataTable[i].label !== null && dataTable[i].label !== undefined) {
          resolve(dataTable[i].label ?? null)
          return
        }
      }

      resolve(null)
    })
  }

  return { predictedLabel, calculatePredictedLabel, calculatePreviousLabel }
}
