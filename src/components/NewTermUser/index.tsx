import * as Dialog from '@radix-ui/react-dialog'
import { X } from 'phosphor-react'
import { CloseButton, Content, Overlay, Description, P } from './styles'
import { Textarea } from '@chakra-ui/react'
import { useEffect, useState } from 'react'
import { api } from '../../services/api'

interface TermoProps {
  id: string
  contract: string
  observation: string
  created_at: string
  updated_at: string
}

gitexport function NewTermUser() {
  const [termo, setTermo] = useState<TermoProps[]>([])

  useEffect(() => {
    loadTransactions()
  }, [])

  async function loadTransactions() {
    try {
      const response = await api.get('/termo')
      setTermo(response.data)
    } catch (err) {
      console.error((err as Error).message)
    }
  }

  return (
    <Dialog.Portal>
      <Overlay />
      <Content>
        <Dialog.Title> Termo de Uso </Dialog.Title>
        <CloseButton>
          <X size={24} />
        </CloseButton>
        <Description>
          {termo.map((data) => (
            <>
              <Textarea disabled>{data.contract || 'Sem dados'}</Textarea>
              <P>{data.observation || 'Sem dados'}</P>
            </>
          ))}
        </Description>
      </Content>
    </Dialog.Portal>
  )
}
