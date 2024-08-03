import styled from 'styled-components';

export const Container = styled.div`
  position: fixed;
  height: 50px;
  width: 50px;
  padding: 1rem;
  bottom: 1%;
  right: 1%;
  border-radius: 50%;
  cursor: pointer;
  svg{

  }
`
export const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

export const ModalContent = styled.div`
  background: white;
  padding: 20px;
  border-radius: 8px;
  width: 300px;
  text-align: center;
`;

export const CloseButton = styled.div`
  position: relative;
  background: transparent;
  left: 8rem;
  bottom: 3.5rem;
  line-height: 0;
  cursor: pointer;
  color: ${(props) => props.theme['gray-500']};
`
