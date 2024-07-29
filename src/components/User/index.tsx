import * as Dialog from '@radix-ui/react-dialog'
import { X } from 'phosphor-react'
import {
  CloseButton,
  Content,
  Overlay
} from './styles'
import { useState } from 'react'

interface UserProps{
  name: string
  email: string
}

export function ModalUser() {
  const [users, setUsers] = useState<[UserProps]>([])

  return (
    <Dialog.Portal>
      <Overlay />
      <Content>
        <Dialog.Title>{}</Dialog.Title>
        <CloseButton>
          <X size={24} />
        </CloseButton>
        
      </Content>
    </Dialog.Portal>
  )
}
