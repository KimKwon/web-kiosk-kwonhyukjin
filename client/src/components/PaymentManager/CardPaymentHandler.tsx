import { useEffect, useState } from 'react';
import { PaymentHandlerProps } from '.';
import { getRandomNumber } from '../../utils/kiosk';
import Loader from '../common/Loader';

const CART_LATENCY_RANGE = {
  start: 3,
  end: 7,
};

function CardPaymentHandler({ requestPayment }: PaymentHandlerProps) {
  const [isPaymentOngoing, setIsPaymentOngoing] = useState(true);

  useEffect(() => {
    const randomLatency = getRandomNumber(CART_LATENCY_RANGE);

    setTimeout(() => {
      requestPayment();
      setIsPaymentOngoing(false);
    }, randomLatency * 1000);
  }, []);

  return isPaymentOngoing ? <Loader loadingText="결제하는 중" /> : null;
}

export default CardPaymentHandler;
