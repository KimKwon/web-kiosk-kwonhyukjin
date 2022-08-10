import { useState } from 'react';
import { PaymentHandlerProps } from '.';

function CashPaymentHandler(props: PaymentHandlerProps) {
  const { endPayment, totalPrice } = props;
  const [givenPrice] = useState(0);
  return (
    <div>
      <span>{totalPrice} 내야함</span>
      <button onClick={endPayment}>영수증보여줘</button>
      <div>받은 돈: {givenPrice}</div>
    </div>
  );
}

export default CashPaymentHandler;
