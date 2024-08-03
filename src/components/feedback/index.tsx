import { useState } from 'react';
import { Container, ModalOverlay, ModalContent, CloseButton } from './styles';
import { MdOutlineFeedback } from 'react-icons/md';
import { X } from 'phosphor-react'
export function Feedback() {
  const [openModal, setOpenModal] = useState(false);

  const handleModal = () => {
    setOpenModal(!openModal);
  };

  return (
    <>
      <Container onClick={handleModal}>
        <MdOutlineFeedback size={30} />
      </Container>

      {openModal && (
        <ModalOverlay onClick={handleModal}>
          <ModalContent onClick={(e) => e.stopPropagation()}>
            <h2>Feedback</h2>
            <p>Deixe seu feedback aqui!</p>
            <CloseButton>
              <button onClick={handleModal}><X size={20}/></button>
            </CloseButton>
          </ModalContent>
        </ModalOverlay>
      )}
    </>
  );
}
