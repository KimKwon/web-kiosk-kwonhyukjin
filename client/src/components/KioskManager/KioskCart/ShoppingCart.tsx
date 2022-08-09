import styled from 'styled-components';
import mixin from '../../../cores/styles/mixin';
import Button from '../../common/Button';
import { CartInfoType } from '../index';
import CartElement from './CartElement';

interface ShoppingCartProps {
  cartInfoList: CartInfoType[];
  removeFromCartInfoList: (cartElementId: number) => void;
  clearCartInfoList: () => void;
}

function ShoppingCart(props: ShoppingCartProps) {
  const { cartInfoList, removeFromCartInfoList, clearCartInfoList } = props;

  const isCartEmpty = cartInfoList.length === 0;

  const getTotalPrice = () => cartInfoList.reduce((acc, { total }) => acc + total, 0);

  const handlePayment = () => {
    if (isCartEmpty) {
      /**
       * 메뉴를 선택해주세요!
       * AlertBox 보여주기
       */
      return;
    }

    /**
     * 결제모달을 핸들링하는 로직 배치
     */
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

      <CardButtonWrapper>
        <Button onClick={clearCartInfoList} variant="contained" size="md" color="gray02">
          전체 취소
        </Button>
        <Button onClick={handlePayment} variant="contained" size="md" color="primary">
          <PaymentButtonInnerText>
            <p>결제하기</p>
            <span className="cart-total-price">{getTotalPrice().toLocaleString()}</span>
          </PaymentButtonInnerText>
        </Button>
      </CardButtonWrapper>
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

const CardButtonWrapper = styled.div`
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

export default ShoppingCart;
