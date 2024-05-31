import { MagnifyingGlass } from 'phosphor-react'
import { ButtonSearch, SeachFormContainer, Select } from './styles'
import { useState } from 'react'

interface SearchFormProps {
  onSearch: (searchTerm: string) => void
  setSelectedStatus: (status: string) => void
}

export function SearchForm({ onSearch, setSelectedStatus }: SearchFormProps) {
  const [searchTerm, setSearchTerm] = useState('')

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value)
  }

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    onSearch(searchTerm)
  }

  const handleStatusChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedStatus(event.target.value)
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
        <option value="income">Entrada</option>
        <option value="outcome">Saída</option>
      </Select>
      <ButtonSearch type="submit">
        <MagnifyingGlass size={20} />
        Buscar
      </ButtonSearch>
    </SeachFormContainer>
  )
}
