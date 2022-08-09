import styled from 'styled-components';

function ShoppingCart() {
  return <CartContainer>쇼핑카트</CartContainer>;
}

const CartContainer = styled.div`
  flex: 1;

  margin: 5px;

  height: 577px;
  border-radius: 12px;
  background-color: ${({ theme }) => theme.colors.background};
  box-shadow: 1px 1px 1px 1px rgba(0, 0, 0, 0.25);
`;

export default ShoppingCart;
