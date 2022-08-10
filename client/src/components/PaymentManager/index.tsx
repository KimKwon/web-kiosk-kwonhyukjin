import React, { useMemo, useState } from 'react';
import useMutation from '../../cores/hooks/useMutation';
import styled from 'styled-components';

import Button from '../common/Button';
import { ColumnWrapper } from '../common/Wrapper';

import CardPaymentHandler from './CardPaymentHandler';
import CashPaymentHandler from './CashPaymentHandler';
import Receipt from './Receipt';

import { ReactComponent as CardMethod } from '../../assets/icons/payment-card.svg';
import { ReactComponent as CashMethod } from '../../assets/icons/10000.svg';

import { CartInfoType } from '../KioskManager';
interface CreatePaymentDto {
  paymentMethodId: number;
  givenPrice?: number;
  itemList: Array<{
    itemId: number;
    total: number;
    amount: number;
    sizeId: number;
    isIce: boolean;
  }>;
}

interface PaymentManagerProps {
  closeButton: JSX.Element;
  cartInfoList: CartInfoType[];
}

export interface PaymentHandlerProps {
  totalPrice: number;
  requestPayment: (givenPrice?: number) => void;
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

function PaymentManager({ closeButton, cartInfoList }: PaymentManagerProps) {
  const [createdReceiptId, setCreatedReceiptId] = useState<number | null>(null);
  const [selectedMethodId, setSelectedMethodId] = useState<number>();
  const [CurrentHandler, setCurrentHandler] =
    useState<React.FunctionComponent<PaymentHandlerProps>>();

  const isPaymentEnd = createdReceiptId !== null;

  const { mutate: postPayment } = useMutation<{ salesId: number }>({
    url: '/sales',
    method: 'POST',
  });

  const totalPrice = useMemo(
    () => cartInfoList.reduce((acc, { total }) => acc + total, 0),
    [cartInfoList],
  );

  const requestPayment = async (givenPrice?: number) => {
    if (!selectedMethodId) return;

    const receipt = await postPayment<CreatePaymentDto>({
      paymentMethodId: selectedMethodId,
      givenPrice,
      itemList: cartInfoList.map(({ menuId, total, amount, sizeId, isIce }) => ({
        itemId: menuId,
        total,
        amount,
        sizeId,
        isIce,
      })),
    });

    if (!receipt) {
      /**
       * TODO
       * 결제에 실패했어요
       * Alert
       */
      return;
    }

    setCreatedReceiptId(receipt.salesId);
  };

  const showPaymentMethods = () => (
    <ButtonWrapper>
      {paymentMethodAdaptor.map(({ methodId, methodName, methodIcon, paymentHandler }) => (
        <Button
          key={methodId}
          onClick={() => {
            setCurrentHandler(() => paymentHandler);
            setSelectedMethodId(methodId);
          }}
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
      {isPaymentEnd && <Receipt receiptId={createdReceiptId} />}
      {!isPaymentEnd && (
        <>
          {CurrentHandler ? (
            <CurrentHandler requestPayment={requestPayment} totalPrice={totalPrice} />
          ) : (
            showPaymentMethods()
          )}
          {closeButton}
        </>
      )}
    </PaymentManagerBox>
  );
}

const PaymentManagerBox = styled(ColumnWrapper)`
  justify-content: center;
  position: relative;
  width: 590px;
  height: 600px;

  transform: translateY(-10%);

  padding: 29px 50px;
  border-radius: 18px;
  background-color: white;

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
