'use client'
import Modal from '@/components/Modal'
import { useCSVData } from '@/features/csv/CSVContext'
import { CSVDownloader } from '@/features/csv/CSVDownloader'
import { CSVUploader } from '@/features/csv/CSVUploader'
import type { TableRow } from '@/utils/table_type'
import { useState } from 'react'
import { AiOutlineSetting } from 'react-icons/ai'

const Header = () => {
  const [isSettingsOpen, setIsSettingsOpen] = useState(false)
  const { csvData, setCSVData, teacherSpeakerCode, setTeacherSpeakerCode } =
    useCSVData() // Contextから取得

  const handleSettingsClick = () => {
    setIsSettingsOpen(!isSettingsOpen)
  }

  const handleDataLoaded = (data: TableRow[]) => {
    setCSVData(data)
  }

  const handleCloseModal = () => {
    setIsSettingsOpen(false)
  }

  const handleSpeakerCodeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value, 10)
    if (isNaN(value) || value < 0 || value > 10) {
      setTeacherSpeakerCode(1) // 無効な値はデフォルトにリセット
    } else {
      setTeacherSpeakerCode(value)
      console.log(`Teacher speaker code set to: ${value}`)
    }
  }

  return (
    <header className="flex items-center justify-between bg-white p-4 shadow-md">
      <div className="flex space-x-4">
        <CSVUploader onDataLoaded={handleDataLoaded} />
        <CSVDownloader data={csvData} filename="annotated_data.csv" />
      </div>
      <button onClick={handleSettingsClick} className="btn">
        <AiOutlineSetting />
      </button>

      <Modal isOpen={isSettingsOpen} onClose={handleCloseModal}>
        <div className="flex flex-col space-y-4">
          <label className="block text-sm font-medium text-gray-700">
            教師のspeaker_code
          </label>
          <input
            type="number"
            min="0"
            max="10"
            value={teacherSpeakerCode} // Contextの値を表示
            onChange={handleSpeakerCodeChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            placeholder="0～10の数字を入力"
          />
        </div>
      </Modal>
    </header>
  )
}

export default Header
