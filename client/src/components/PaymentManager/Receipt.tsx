import styled from 'styled-components';
import useAPI, { BaseAPI } from '../../cores/hooks/useAPI';
import { getTemperature } from '../../utils/kiosk';
import { parseNumberToMoneyType, parseZeroPaddedNumber } from '../../utils/parse';
import Loader from '../common/Loader';
import { ColumnWrapper } from '../common/Wrapper';
import { ElementBox, OptionWrapper } from '../KioskManager/KioskCart/CartElement';
import { ReactComponent as Dokgo } from '../../assets/dokgo-baedal.svg';
import { useEffect } from 'react';
import { changeKioskStatus } from '../../cores/hooks/useKioksStatus';
import useTimer from '../../cores/hooks/useTimer';
interface ReceiptProps {
  receiptId: number;
}

interface ReceiptItemType {
  itemName: string;
  itemPrice: number;
  sizeName: string;
  surcharge: number;
  isIce: boolean;
  amount: number;
}

interface ReceiptResponse {
  id: number;
  orderNumber: number;
  givenPrice: number | null;
  totalAmount: number;
  paymentMethodName: '카드' | '현금';
  itemList: ReceiptItemType[];
}

const TIME_LIMIT = 5;

function Receipt({ receiptId }: ReceiptProps) {
  const { data, isLoading, error } = useAPI({
    url: `/sales/${receiptId}`,
    method: 'GET',
  }) as BaseAPI<ReceiptResponse>;

  const { remainTime, invoke, clear } = useTimer(TIME_LIMIT);

  useEffect(() => {
    invoke(() => changeKioskStatus('IDLE'));

    return clear;
  }, []);

  if (isLoading)
    return (
      <ReceiptBox>
        <Loader />
      </ReceiptBox>
    );

  if (!data || error) return <ReceiptBox />;

  const { orderNumber, givenPrice, totalAmount, paymentMethodName, itemList } = data;

  const shouldShowGivenPrice = givenPrice && givenPrice - totalAmount > 0;

  return (
    <ReceiptBox>
      <OrderNumber>주문번호 {parseZeroPaddedNumber(orderNumber, 2)}</OrderNumber>
      <ColumnWrapper style={{ flex: 1, width: '100%', overflowY: 'auto' }}>
        {itemList.map(({ itemName, itemPrice, sizeName, surcharge, isIce, amount }) => (
          <ElementBox key={itemName + sizeName + isIce}>
            <OptionWrapper>
              <span className="element-name">{itemName}</span>
              <span className="element-temperature">{getTemperature(isIce)}</span>
              <span className="element-size">{sizeName}</span>
              <span className="element-amount">{amount}</span>
              <span className="element-total">{parseNumberToMoneyType(itemPrice + surcharge)}</span>
            </OptionWrapper>
          </ElementBox>
        ))}
      </ColumnWrapper>
      <TotalLabel>
        <em>{paymentMethodName}</em>(으)로 <em>{parseNumberToMoneyType(totalAmount)}</em>원
        결제했어요!
      </TotalLabel>
      <ReturnLabel>
        {shouldShowGivenPrice && (
          <>
            <em>잔돈</em>으로 <em>{parseNumberToMoneyType(givenPrice - totalAmount)}원</em>
            돌려드려요.
          </>
        )}
      </ReturnLabel>
      <Dokgo className="dokgo" />
      <TimerText>
        <em>{remainTime}초</em> 뒤에 자동으로 닫혀요.
      </TimerText>
    </ReceiptBox>
  );
}

const ReceiptBox = styled(ColumnWrapper)`
  position: relative;
  height: 100%;

  align-items: center;

  .dokgo {
    transform: translateY(29px);
  }
`;

const OrderNumber = styled.div`
  font-size: 30px;
  font-weight: 700;

  margin-bottom: 41px;
`;

const TotalLabel = styled.p`
  font-size: 24px;
  font-weight: 400;
  margin-bottom: 13px;

  & > em {
    font-weight: 700;
    color: ${({ theme }) => theme.colors.primary};
  }
`;

const ReturnLabel = styled.p`
  font-size: 20px;
  font-weight: 400;
  margin-bottom: 13px;

  & > em {
    font-weight: 600;
    color: ${({ theme }) => theme.colors.secondary};
  }
`;

const TimerText = styled.p`
  position: absolute;
  bottom: 0;
  transform: translateY(250%);

  font-size: 36px;
  font-weight: 700;
  color: white;
  & > em {
    color: ${({ theme }) => theme.colors.secondary};
  }
`;

export default Receipt;
