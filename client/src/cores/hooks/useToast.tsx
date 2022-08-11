import { useEffect, useState } from 'react';
import Toast from '../../components/common/Toast';
import debounce from '../../utils/debounce';

const _invokeToast = (_toastText: string) => {
  const invokeToastCustomEvent = new CustomEvent('invoketoast', {
    detail: {
      toastText: _toastText,
    },
  });

  dispatchEvent(invokeToastCustomEvent);
};

export const invokeToast = debounce(_invokeToast, 300);

function useToast() {
  const [isToastOpen, setIsToastOpen] = useState(false);
  const [toastText, setToastText] = useState('');

  const renderToast = () => {
    return <Toast toastText={toastText} />;
  };

  useEffect(() => {
    function handleInvokeToast(e: Event) {
      if (!(e instanceof CustomEvent)) return;
      const { toastText } = e.detail;
      setToastText(toastText);
      setIsToastOpen(true);

      setTimeout(() => {
        setIsToastOpen(false);
        setToastText('');
      }, 1000);
    }
    window.addEventListener('invoketoast', handleInvokeToast);

    return () => {
      window.removeEventListener('invoketoast', handleInvokeToast);
    };
  }, []);

  return { isToastOpen, renderToast };
}

export default useToast;
