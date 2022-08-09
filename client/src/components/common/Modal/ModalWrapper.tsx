import styled from 'styled-components';

function ModalWrapper({ children }: { children: JSX.Element | React.ReactNode }) {
  return (
    <ModalOverlay>
      <ModalContent>{children}</ModalContent>
    </ModalOverlay>
  );
}

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.45);
`;

const ModalContent = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;

  transform: translate(-50%, -50%);
`;

export default ModalWrapper;
