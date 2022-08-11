import { changeKioskStatus, KioskStatus } from '../../cores/hooks/useKioksStatus';

function FallbackUI({ error, resetError }: { error: Error; resetError: () => void }) {
  const { message } = error;

  return (
    <div>
      <h1>문제가 생겼어요.</h1>
      <p>{message}</p>
      <button onClick={resetError}>다시 시도하기</button>
      <button onClick={() => changeKioskStatus(KioskStatus.IDLE)}>메인으로 돌아가기</button>
    </div>
  );
}

export default FallbackUI;
