import { useEffect, useRef, useState } from 'react';

function useTimer(initialTimeout: number) {
  const [remainTime, setRemainTime] = useState(initialTimeout);
  const remainTimeRef = useRef<number>(initialTimeout);
  const intervalRef = useRef<NodeJS.Timer | null>(null);

  useEffect(() => {
    remainTimeRef.current = remainTime;
  }, [remainTime]);

  const _setInterval = (timeout: number, cb: () => unknown) => {
    setRemainTime(timeout);
    intervalRef.current = setInterval(() => {
      setRemainTime((prevRemainTime) => prevRemainTime - 1);

      if (remainTimeRef.current - 1 === 0) {
        clear();
        cb();
      }
    }, 1000);
  };

  const _clearInterval = () => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    intervalRef.current = null;
  };

  const invoke = (cb: () => unknown) => {
    if (intervalRef.current) return;

    _setInterval(remainTime, cb);
  };

  const pause = () => {
    _clearInterval();
  };

  const clear = () => {
    _clearInterval();
    setRemainTime(initialTimeout);
  };

  return { remainTime, invoke, clear, pause };
}

export default useTimer;
