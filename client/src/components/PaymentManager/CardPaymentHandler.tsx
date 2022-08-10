import { useEffect, useState } from 'react';
import { PaymentHandlerProps } from '.';
import { getRandomNumber } from '../../utils/kiosk';
import Loader from '../common/Loader';

function CardPaymentHandler({ endPayment }: PaymentHandlerProps) {
  const [isPaymentOngoing, setIsPaymentOngoing] = useState(true);

  useEffect(() => {
    const randomLatency = getRandomNumber({ start: 3, end: 7 });

    setTimeout(() => {
      endPayment();
      setIsPaymentOngoing(false);
    }, randomLatency * 1000);
  }, []);

  return isPaymentOngoing ? <Loader loadingText="결제하는 중" /> : null;
}

export default CardPaymentHandler;
