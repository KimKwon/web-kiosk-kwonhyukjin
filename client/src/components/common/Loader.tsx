import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { ReactComponent as Baedalyee } from '../../assets/logo-big.svg';

function Loader(loadingText = '달려가는 중') {
  const [dots, setDots] = useState('');

  useEffect(() => {
    const intervalId = setInterval(() => {
      setDots((prevDots) => {
        if (prevDots.length === 5) {
          return '';
        }
        return prevDots.concat('.');
      });
    }, 500);

    return () => {
      clearInterval(intervalId);
    };
  }, []);

  return (
    <>
      <LoaderBox>
        <LoadingText>
          {loadingText} {dots}
        </LoadingText>
        <Baedalyee />
      </LoaderBox>
    </>
  );
}

const LoaderBox = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  flex-direction: column;
  gap: 20px;

  & > svg {
    animation: moveLeftSlowly ease-in-out 150ms infinite;
  }

  @keyframes moveLeftSlowly {
    from {
      transform: translateY(-2px);
    }

    to {
      transform: translateY(2px);
    }
  }
`;

const LoadingText = styled.div`
  text-align: center;
  font-size: 20px;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.primary};
`;

export default Loader;
