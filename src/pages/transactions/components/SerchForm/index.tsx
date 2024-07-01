import { MagnifyingGlass } from 'phosphor-react'
import React, { useState } from 'react'
import { ButtonSearch, SeachFormContainer, Select } from './styles'
import { Spinner } from '@chakra-ui/react'

interface SearchFormProps {
  onSearch: (searchTerm: string) => void
  setSelectedStatus: (status: string) => void
  loading: boolean
}

export function SearchForm({ onSearch, setSelectedStatus }: SearchFormProps) {
  const [searchTerm, setSearchTerm] = useState('')
  const [loading, setLoading] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    try {
      setLoading(true)
      setSearchTerm(e.target.value)
    } catch (err) {
      return (err as Error).message
    } finally {
      setLoading(false)
    }
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    try {
      setLoading(true)
      onSearch(searchTerm)
    } catch (err) {
      return (err as Error).message
    } finally {
      setLoading(false)
    }
  }

  const handleStatusChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    try {
      setLoading(true)
      setSelectedStatus(e.target.value)
    } catch (err) {
      return (err as Error).message
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      {loading ? (
        <>
          <Spinner
            thickness="4px"
            speed="0.65s"
            emptyColor="gray.200"
            color="blue.500"
            size="xl"
          />
        </>
      ) : (
        <>
          <SeachFormContainer onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="Busque por transações"
              value={searchTerm}
              onChange={handleChange}
            />
            <Select onChange={handleStatusChange}>
              <option value="">Todos</option>
              <option value="income">Entrada</option>
              <option value="outcome">Saída</option>
            </Select>
            <ButtonSearch type="submit">
              <MagnifyingGlass size={20} />
              Buscar
            </ButtonSearch>
          </SeachFormContainer>
        </>
      )}
    </>
  )
}
