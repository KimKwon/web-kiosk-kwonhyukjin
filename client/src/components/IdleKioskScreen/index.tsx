import { changeKioskStatus } from '../../cores/hooks/useKioksStatus';
import Button from '../common/Button';

function IdleKioskScreen({ isMenuReady }: { isMenuReady: boolean }) {
  const moveToKioskMain = () => {
    if (!isMenuReady) return;
    changeKioskStatus('SHOPPING');
  };

  return (
    <main>
      <Button variant="contained" color="gray02" onClick={moveToKioskMain}>
        주문하러가요.
      </Button>
    </main>
  );
}

export default IdleKioskScreen;
