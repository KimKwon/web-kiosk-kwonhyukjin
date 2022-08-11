import { useState } from 'react';
import styled, { css } from 'styled-components';

import { PaymentHandlerProps } from '.';
import { ColumnWrapper, FlexWrapper } from '../common/Wrapper';

import { ReactComponent as Cash10000 } from '../../assets/icons/cash/10000.svg';
import { ReactComponent as Cash5000 } from '../../assets/icons/cash/5000.svg';
import { ReactComponent as Cash1000 } from '../../assets/icons/cash/1000.svg';
import { ReactComponent as Dokgo } from '../../assets/dokgo-baedal.svg';
import mixin from '../../cores/styles/mixin';
import { parseNumberToMoneyType } from '../../utils/parse';
import { invokeToast } from '../../cores/hooks/useToast';

const CASH_METHODS = [
  {
    icon: Cash10000,
    price: 10000,
  },
  { icon: Cash5000, price: 5000 },
  { icon: Cash1000, price: 1000 },
];

function CashPaymentHandler(props: PaymentHandlerProps) {
  const { requestPayment, totalPrice } = props;
  const [givenPrice, setGivenPrice] = useState(0);

  const hasEnoughCashToPayment = givenPrice >= totalPrice;

  const handleRequestPayment = () => {
    if (!hasEnoughCashToPayment) return;
    requestPayment(givenPrice);
  };

  const handleInsertCash = (currentInsertCash: number) => {
    if (hasEnoughCashToPayment) {
      invokeToast('잔돈이 충분하지 않아요.');
      return;
    }

    setGivenPrice((prevPrice) => prevPrice + currentInsertCash);
  };

  const showCashPaymentMethods = () => {
    return CASH_METHODS.map(({ icon: CashIcon, price }) => (
      <button type="button" key={`cashMethod-${price}`} onClick={() => handleInsertCash(price)}>
        <CashIcon />
      </button>
    ));
  };

  return (
    <CashPaymentHandlerBox>
      <MethodList>{showCashPaymentMethods()}</MethodList>
      <PriceCalculator>
        <PriceLabelBox>
          <p>결제금액</p>
          <span>{parseNumberToMoneyType(totalPrice)}</span>
        </PriceLabelBox>
        <PriceLabelBox isPaymentAvailable={hasEnoughCashToPayment}>
          <p>투입금액</p>
          <span className="given-price">{parseNumberToMoneyType(givenPrice)}</span>
        </PriceLabelBox>
        <RequestPaymentButton
          onClick={handleRequestPayment}
          isPaymentAvailable={hasEnoughCashToPayment}
        >
          <span>결제하러가기</span>
          <Dokgo />
        </RequestPaymentButton>
      </PriceCalculator>
    </CashPaymentHandlerBox>
  );
}

const CashPaymentHandlerBox = styled(FlexWrapper)`
  height: 100%;
`;

const MethodList = styled(ColumnWrapper)`
  justify-content: center;
  gap: 80px;
`;

const PriceCalculator = styled(ColumnWrapper)`
  flex: 1;

  margin-top: 50px;
  align-items: center;

  gap: 87px;
`;

const PriceLabelBox = styled(ColumnWrapper)<{ isPaymentAvailable?: boolean }>`
  position: relative;
  gap: 16px;

  & > p {
    font-size: 28px;
    font-weight: 500;
  }

  & > span {
    font-size: 24px;
    font-weight: 500;
    color: ${({ theme }) => theme.colors.primary};

    ${mixin.concatWonUnit}
  }

  & > span.given-price {
    color: ${({ theme, isPaymentAvailable }) =>
      isPaymentAvailable ? theme.colors.primary : theme.colors.gray02};
  }
`;

const RequestPaymentButton = styled.button<{ isPaymentAvailable: boolean }>`
  position: absolute;
  bottom: 0;
  right: 0;

  display: flex;
  flex-direction: column;
  & > span {
    font-size: 24px;
    font-weight: 500;
    margin-bottom: 10px;

    transform: translateX(15%);
  }
  ${({ isPaymentAvailable, theme }) =>
    isPaymentAvailable
      ? css`
          color: ${theme.colors.primary};
          & > svg {
            opacity: 1;
          }
        `
      : css`
          color: ${theme.colors.gray02};
          & > svg {
            opacity: 0.5;
          }
        `};
`;

export default CashPaymentHandler;
