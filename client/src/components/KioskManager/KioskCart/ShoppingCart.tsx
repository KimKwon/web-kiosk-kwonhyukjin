import styled from 'styled-components';
import { CartInfoType } from '../index';
import CartElement from './CartElement';

interface ShoppingCartProps {
  cartInfoList: CartInfoType[];
  removeFromCartInfoList: (cartElementId: number) => void;
}

function ShoppingCart(props: ShoppingCartProps) {
  const { cartInfoList, removeFromCartInfoList } = props;
  return (
    <CartContainer>
      {cartInfoList.map((cartInfo) => (
        <CartElement
          key={cartInfo.cartElementId}
          cartInfo={cartInfo}
          removeFromCartInfoList={removeFromCartInfoList}
        />
      ))}
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

export default ShoppingCart;
