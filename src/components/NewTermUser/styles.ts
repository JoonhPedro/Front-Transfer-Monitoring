import * as Dialog from '@radix-ui/react-dialog'
import styled from 'styled-components'

export const Overlay = styled(Dialog.Overlay)`
  position: fixed;
  width: 100vw;
  height: 150vh;
  inset: 0;
  background: rgb(0, 0, 0, 0.75);
`

export const Content = styled(Dialog.Content)`
  min-width: 70rem;
  border-radius: 6px;
  padding: 2.5rem 3rem;
  background: ${(props) => props.theme['gray-800']};
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`
export const P = styled.p`
  color: cyan;
  padding-top: 1rem;
  text-align: center;
`
export const CloseButton = styled(Dialog.Close)`
  position: absolute;
  background: transparent;
  border: 0;
  top: 2.5rem;
  right: 2.8rem;
  line-height: 0;
  cursor: pointer;
  color: ${(props) => props.theme['gray-500']};
`

export const Description = styled(Dialog.Description)`
  padding-top: 2rem;
`
