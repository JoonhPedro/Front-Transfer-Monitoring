import {
  ButtonContainer,
  HeaderContainer,
  HeaderContent,
  NewTransactionButton,
} from './styles'

import * as Dialog from '@radix-ui/react-dialog'
import { FaRegUser } from 'react-icons/fa'
import { useNavigate } from 'react-router-dom'
import logoImg from '../../assets/logo.svg'
import { ButtonSearch } from '../../pages/transactions/layout/components/SerchForm/styles'
import { NewTransactionsModal } from '../NewTransactionsModal'
import { ModalUser } from '../User'

export function Header() {
  const navigate = useNavigate()
  const handleReport = () => {
    navigate('/Relatorios')
  }
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
          <ButtonSearch onClick={handleReport}>Relatorio</ButtonSearch>
          <Dialog.Root>
            <Dialog.Trigger asChild>
              <ButtonSearch>
                <FaRegUser />
              </ButtonSearch>
            </Dialog.Trigger>
            <ModalUser />
          </Dialog.Root>
        </ButtonContainer>
      </HeaderContent>
    </HeaderContainer>
  )
}
