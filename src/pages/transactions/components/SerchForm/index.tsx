import { MagnifyingGlass } from 'phosphor-react'
import React, { useState } from 'react'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import { ButtonSearch, SeachFormContainer, Select } from './styles'

interface SearchFormProps {
  onSearch: (searchTerm: string) => void
  setSelectedStatus: (status: string) => void
  onDateRangeChange: (startDate: Date | null, endDate: Date | null) => void
}

export function SearchForm({
  onSearch,
  setSelectedStatus,
  onDateRangeChange,
}: SearchFormProps) {
  const [searchTerm, setSearchTerm] = useState('')
  const [dateRange, setDateRange] = useState<{
    startDate: Date | null
    endDate: Date | null
  }>({
    startDate: null,
    endDate: null,
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value)
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    onSearch(searchTerm)
  }

  const handleStatusChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedStatus(e.target.value)
  }

  const handleStartDateChange = (date: Date | null) => {
    setDateRange((prevDateRange) => ({
      ...prevDateRange,
      startDate: date,
    }))
    onDateRangeChange(date, dateRange.endDate)
  }

  const handleEndDateChange = (date: Date | null) => {
    setDateRange((prevDateRange) => ({
      ...prevDateRange,
      endDate: date,
    }))
    onDateRangeChange(dateRange.startDate, date)
  }

  return (
    <SeachFormContainer onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Busque por transações"
        value={searchTerm}
        onChange={handleChange}
      />
      <Select onChange={handleStatusChange}>
        <option value="">Todos</option>
        <option value="income" color="red">
          Entrada
        </option>
        <option value="outcome">Saída</option>
      </Select>
      <DatePicker
        selected={dateRange.startDate}
        onChange={handleStartDateChange}
        placeholderText="Data Inicial"
      />
      <DatePicker
        selected={dateRange.endDate}
        onChange={handleEndDateChange}
        placeholderText="Data Final"
      />
      <ButtonSearch type="submit">
        <MagnifyingGlass size={20} />
        Buscar
      </ButtonSearch>
    </SeachFormContainer>
  )
}
