import styled, { css } from 'styled-components';
import { invokeToast } from '../../../cores/hooks/useToast';
import mixin from '../../../cores/styles/mixin';
import Button from '../../common/Button';
import { ColumnWrapper } from '../../common/Wrapper';
import { CartInfoType } from '../index';
import CartElement from './CartElement';

interface ShoppingCartProps {
  resetTimeout: number;
  cartInfoList: CartInfoType[];
  removeFromCartInfoList: (cartElementId: number) => void;
  clearCartInfoList: () => void;
  openPaymentModal: () => void;
}

function ShoppingCart(props: ShoppingCartProps) {
  const {
    resetTimeout,
    cartInfoList,
    removeFromCartInfoList,
    clearCartInfoList,
    openPaymentModal,
  } = props;

  const isCartEmpty = cartInfoList.length === 0;

  const getTotalPrice = () => cartInfoList.reduce((acc, { total }) => acc + total, 0);

  const handlePayment = () => {
    if (isCartEmpty) {
      invokeToast('메뉴를 선택해주세요!');
      return;
    }

    openPaymentModal();
  };

  return (
    <CartContainer>
      {cartInfoList.map((cartInfo) => (
        <CartElement
          key={cartInfo.cartElementId}
          cartInfo={cartInfo}
          removeFromCartInfoList={removeFromCartInfoList}
        />
      ))}

      <CartButtonWrapper>
        <Button onClick={clearCartInfoList} variant="contained" size="md" color="gray02">
          <ColumnWrapper>
            {!isCartEmpty && (
              <TimerWarnText shouldBlink={resetTimeout % 2 === 1}>
                {resetTimeout}초 남음
              </TimerWarnText>
            )}
            <span>전체 취소</span>
          </ColumnWrapper>
        </Button>
        <Button onClick={handlePayment} variant="contained" size="md" color="primary">
          <PaymentButtonInnerText>
            <p>결제하기</p>
            <span className="cart-total-price">{getTotalPrice().toLocaleString()}</span>
          </PaymentButtonInnerText>
        </Button>
      </CartButtonWrapper>
    </CartContainer>
  );
}

const CartContainer = styled.ul`
  flex: 1;
  height: 577px;

  display: flex;
  flex-direction: column;
  gap: 5px;

  margin: 5px;
  padding: 36px 30px;

  border-radius: 12px;
  background-color: ${({ theme }) => theme.colors.background};
  box-shadow: 1px 1px 1px 1px rgba(0, 0, 0, 0.25);
`;

const CartButtonWrapper = styled.div`
  width: 100%;
  margin-top: auto;

  display: flex;
  justify-content: space-between;
  align-self: flex-end;

  & > button {
    &:hover {
      transform: scale(0.95);
    }
  }
`;

const PaymentButtonInnerText = styled.div`
  display: flex;
  flex-direction: column;

  & > .cart-total-price {
    font-size: 20px;
    font-weight: 600;
    ${mixin.concatWonUnit}
  }
`;

const TimerWarnText = styled.p<{ shouldBlink: boolean }>`
  ${({ theme, shouldBlink }) =>
    shouldBlink
      ? css`
          color: ${theme.colors.yellow};
          font-size: 0.8em;
          animation: shakeHard ease infinite 0.5s;
        `
      : css`
          font-size: 0.8em;
          color: inherit;
        `};

  @keyframes shakeHard {
    0% {
      transform: rotate(-5deg);
    }

    50% {
      transform: translateY(-10px) rotate(0deg);
    }

    100% {
      transform: rotate(5deg);
    }
  }
`;

export default ShoppingCart;
