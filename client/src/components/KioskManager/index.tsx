import { CategorizedMenu } from '../../App';
import { changeKioskStatus } from '../../cores/hooks/useKioksStatus';
import Button from '../common/Button';

interface KioskProps {
  data: CategorizedMenu;
}

function KioskManager({ data }: KioskProps) {
  return (
    <div>
      <Button variant="contained" color="primary" onClick={() => changeKioskStatus('IDLE')}>
        키오스크 메인으로~
      </Button>
    </div>
  );
}

export default KioskManager;
