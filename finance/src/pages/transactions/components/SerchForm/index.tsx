import { MagnifyingGlass } from 'phosphor-react'
import { ButtonSearch, SeachFormContainer } from './styles'

export function SearchForm() {
  return (
    <SeachFormContainer>
      <input type="text" placeholder="Busque por transações" />

      <ButtonSearch type="submit">
        <MagnifyingGlass size={20} />
        Buscar
      </ButtonSearch>
    </SeachFormContainer>
  )
}
