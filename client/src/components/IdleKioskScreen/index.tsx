import styled from 'styled-components';
import { changeKioskStatus, KioskStatus } from '../../cores/hooks/useKioksStatus';
import Button from '../common/Button';

function IdleKioskScreen({ isMenuReady }: { isMenuReady: boolean }) {
  const moveToKioskMain = () => {
    if (!isMenuReady) return;
    changeKioskStatus(KioskStatus.SHOPPING);
  };

  return (
    <IdleKioskMain>
      <h1>
        일등커피숍 커피<em>의</em>민족입니다
      </h1>
      <Button variant="contained" color="primary" size="md" onClick={moveToKioskMain}>
        {isMenuReady ? '주문하러갈까요?' : '메뉴 가져오는 중'}
      </Button>
    </IdleKioskMain>
  );
}

const IdleKioskMain = styled.main`
  width: 100vw;
  height: 100vh;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 50px;

  & > h1 {
    font-family: 'BMDOHYEON';
    font-style: normal;
    font-weight: 400;
    font-size: 48px;

    & > em {
      font-size: 0.8em;
    }
  }
`;

export default IdleKioskScreen;
