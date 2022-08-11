import { useRef } from 'react';
import styled from 'styled-components';

import { ReactComponent as Dokgo } from '../../assets/dokgo-vertical.svg';
import mixin from '../../cores/styles/mixin';

function Toast({ toastText }: { toastText: string }) {
  const toastRef = useRef<HTMLDivElement>(null);

  return (
    <ToastBox ref={toastRef}>
      <Dokgo />
      <p>{toastText}</p>
    </ToastBox>
  );
}

const ToastBox = styled.div`
  z-index: 999;
  position: fixed;
  left: 15px;
  bottom: 15px;

  width: 300px;
  border-radius: 12px;
  box-shadow: 3px 3px 3px rgba(0, 0, 0, 0.25);

  display: flex;
  align-items: center;
  background-color: white;

  animation: smoothAppear ease-out 300ms;

  @keyframes smoothAppear {
    from {
      opacity: 0;
      transform: translateY(-5%);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  & > p {
    flex: 1;
    font-size: 20px;
    font-weight: 500;
    color: ${({ theme }) => theme.colors.primary};

    padding: 0 15px;
    text-align: center;

    word-break: keep-all;
    ${mixin.textEllipsis(3)}
  }
`;

export default Toast;
