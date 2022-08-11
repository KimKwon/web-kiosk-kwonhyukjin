import styled from 'styled-components';
import Button from '../common/Button';
import { FlexWrapper } from '../common/Wrapper';

function FallbackUI({ error, resetError }: { error: Error; resetError: () => void }) {
  const { message } = error;

  return (
    <FallbackUIContainer>
      <b>Sorry,</b>
      <h1>문제가 생겼어요.</h1>
      <p>에러메시지: {message}</p>

      <FlexWrapper style={{ gap: '10px' }}>
        <Button onClick={resetError} variant="contained" color="gray02">
          다시 시도하기
        </Button>
        <Button onClick={() => (location.href = '/')} variant="contained" color="gray01">
          새로고침하기
        </Button>
      </FlexWrapper>
    </FallbackUIContainer>
  );
}

const FallbackUIContainer = styled.main`
  width: 100vw;
  height: 100vh;

  background-color: ${({ theme }) => theme.colors.primary};
  color: white;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  gap: 18px;

  & > b {
    font-size: 60px;
    font-weight: 700;
  }

  & > h1 {
    font-size: 36px;
    font-weight: 700;
  }

  & > p {
    font-size: 24px;
    color: ${({ theme }) => theme.colors.background02};
  }
`;

export default FallbackUI;
