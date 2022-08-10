import styled from 'styled-components';

import { CartInfoType } from '../KioskManager';

import { ReactComponent as CardMethod } from '../../assets/icons/payment-card.svg';
import { ReactComponent as CashMethod } from '../../assets/icons/10000.svg';
import CardPaymentHandler from './CardPaymentHandler';
import CashPaymentHandler from './CashPaymentHandler';
import Button from '../common/Button';
import React, { useState } from 'react';
import { ColumnWrapper } from '../common/Wrapper';

interface PaymentManagerProps {
  closeButton: JSX.Element;
  cartInfoList: CartInfoType[];
}

const paymentMethodAdaptor = [
  {
    methodId: 1,
    methodName: '카드결제',
    methodIcon: CardMethod,
    paymentHandler: CardPaymentHandler,
  },
  {
    methodId: 2,
    methodName: '현금결제',
    methodIcon: CashMethod,
    paymentHandler: CashPaymentHandler,
  },
];

function PaymentManager({ closeButton }: PaymentManagerProps) {
  const [CurrentHandler, setCurrentHandler] = useState<React.FunctionComponent>();

  const showPaymentMethods = () => (
    <ButtonWrapper>
      {paymentMethodAdaptor.map(({ methodId, methodName, methodIcon, paymentHandler }) => (
        <Button
          key={methodId}
          onClick={() => setCurrentHandler(() => paymentHandler)}
          variant="contained"
          color="primary"
          size="lg"
          startIcon={methodIcon}
        >
          {methodName}
        </Button>
      ))}
    </ButtonWrapper>
  );

  return (
    <PaymentManagerBox>
      {CurrentHandler ? <CurrentHandler /> : showPaymentMethods()}
      {closeButton}
    </PaymentManagerBox>
  );
}

const PaymentManagerBox = styled(ColumnWrapper)`
  justify-content: center;
  position: relative;
  width: 590px;
  height: 600px;

  padding: 29px 50px;

  border-radius: 18px;

  background-color: white;

  transform: translateY(-10%);

  & > .payment-cancel-button {
    position: absolute;
    left: 50%;
    bottom: 0;
    transform: translate(-50%, 150%);
  }
`;

const ButtonWrapper = styled(ColumnWrapper)`
  align-items: center;
  & > button {
    flex-grow: 0;
  }
  gap: 80px;
`;

export default PaymentManager;
