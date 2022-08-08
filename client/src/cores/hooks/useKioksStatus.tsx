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
    function handleKioskChange(e: Event) {
      if (!(e instanceof CustomEvent)) return;
      const { nextKioskStatus } = e.detail;
      setKioskStatus(nextKioskStatus);
    }
    window.addEventListener('kioskstatuschange', handleKioskChange);

    return () => {
      window.removeEventListener('kioskstatuschange', handleKioskChange);
    };
  }, []);

  return {
    kioskStatus,
  };
}

export default useKioskStatus;
