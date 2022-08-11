import { useEffect, useState } from 'react';

export const KioskStatus = {
  IDLE: 'IDLE',
  SHOPPING: 'SHOPPING',
} as const;

type KioskStatusType = keyof typeof KioskStatus;

export const changeKioskStatus = (nextKioskStatus: KioskStatusType) => {
  const kioskStatusChangeEvent = new CustomEvent('kioskstatuschange', {
    detail: {
      nextKioskStatus,
    },
  });

  dispatchEvent(kioskStatusChangeEvent);
};

function useKioskStatus() {
  const [kioskStatus, setKioskStatus] = useState<KioskStatusType>(KioskStatus.IDLE);

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
