import {
  HeaderContainer,
  HeaderContent,
  NewTransactionButton,
  ButtonContainer,
} from './styles'

import { Link } from 'react-router-dom'
import * as Dialog from '@radix-ui/react-dialog'
import logoImg from '../../assets/logo.svg'
import { NewTransactionsModal } from '../NewTransactionsModal'
import { ButtonSearch } from '../../pages/transactions/layout/components/SerchForm/styles'

export function Header() {
  return (
    <HeaderContainer>
      <HeaderContent>
        <div>
          <img src={logoImg} alt="" />
        </div>
        <ButtonContainer>
          <Dialog.Root>
            <Dialog.Trigger asChild>
              <NewTransactionButton>Nova transação</NewTransactionButton>
            </Dialog.Trigger>
            <NewTransactionsModal />
          </Dialog.Root>
          <ButtonSearch>
            <Link to="/Relatorios">Relatorio</Link>
          </ButtonSearch>
        </ButtonContainer>
      </HeaderContent>
    </HeaderContainer>
  )
}
