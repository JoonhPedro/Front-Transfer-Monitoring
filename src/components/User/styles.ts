import * as Dialog from '@radix-ui/react-dialog'
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

  div {
    width: 100px;
    height: 100px;
    background-color: ${(props) => props.theme['gray-600']};
    border-radius: 50%;
  }
`

export const NameUserLogo = styled.h1`
  display: flex;
  outline: none;
  color: ${(props) => props.theme['green-300']};
  width: 100px;
  height: 100px;
  font-size: 50px;
  align-items: center;
  justify-content: center;
`

export const ContainerUser = styled.div``

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
