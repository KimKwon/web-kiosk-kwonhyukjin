import { useEffect, useState } from 'react';

type KioskStatus = 'IDLE' | 'SHOPPING';

export const changeKioskStatus = (nextKioskStatus: KioskStatus) => {
  const kioskStatusChangeEvent = new CustomEvent('kioskstatuschange', {
    detail: {
      nextKioskStatus,
    },
  });

  dispatchEvent(kioskStatusChangeEvent);
};

function useKioskStatus() {
  const [kioskStatus, setKioskStatus] = useState<KioskStatus>('IDLE');

  useEffect(() => {
    function handleKioskChange({ detail }: CustomEvent) {
      const { nextKioskStatus } = detail;
      setKioskStatus(nextKioskStatus);

      console.log('키오스크체인지?');
    }
    window.addEventListener('kioskstatuschange', handleKioskChange as EventListener);

    return () => {
      window.removeEventListener('kioskstatuschange', handleKioskChange as EventListener);
    };
  }, []);

  return {
    kioskStatus,
  };
}

export default useKioskStatus;
