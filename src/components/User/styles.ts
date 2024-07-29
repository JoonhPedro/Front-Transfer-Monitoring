import * as Dialog from '@radix-ui/react-dialog'
import * as RadioGroup from '@radix-ui/react-radio-group'
import styled from 'styled-components'

export const Overlay = styled(Dialog.Overlay)`
  position: fixed;
  width: 100vw;
  height: 100vh;
  inset: 0;
  background: rgb(0, 0, 0, 0.75);
`

export const Container = styled.div`
  min-width: 25rem;
  display: grid;
  text-align: center;
`
export const Logo = styled.div`
  display: flex;
  justify-content: center;
  padding-bottom: 1rem;
  img{
  width: 100px;
  height: 100px;
  background-color: red;
  border-radius: 50%;
  }
`

export const ContainerUser = styled.div`

`

export const Content = styled(Dialog.Content)`
  min-width: 32rem;
  border-radius: 6px;
  padding: 2.5rem 3rem;
  background: ${(props) => props.theme['gray-800']};

  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);

    input {
      border-radius: 6px;
      border: 0;
      background: ${(props) => props.theme['gray-900']};
      color: ${(props) => props.theme['gray-300']};
      padding: 1rem;

      &::placeholder {
        color: ${(props) => props.theme['gray-500']};
      }
    }

    button[type='submit'] {
      height: 58px;
      border: 0;
      background: ${(props) => props.theme['green-500']};
      color: ${(props) => props.theme.white};
      font-weight: bold;
      padding: 0 1.25rem;
      border-radius: 6px;
      margin-top: 1.5rem;
      cursor: pointer;

      &:hover {
        background: ${(props) => props.theme['green-700']};
        transition: background-color 0.2s;
      }
    }
  Link {
    text-align: center;
  }
`
export const CloseButton = styled(Dialog.Close)`
  position: absolute;
  background: transparent;
  border: 0;
  top: 2.8rem;
  right: 2.8rem;
  line-height: 0;
  cursor: pointer;
  color: ${(props) => props.theme['gray-500']};
`

export const TransactionType = styled(RadioGroup.Root)`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1rem;
  margin-top: 0.5rem;
`
