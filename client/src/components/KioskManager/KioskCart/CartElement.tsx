import styled from 'styled-components';
import { CartInfoType } from '..';
import mixin from '../../../cores/styles/mixin';
import { getTemperature } from '../../../utils/kiosk';

interface CartElementProps {
  cartInfo: CartInfoType;
  removeFromCartInfoList: (cartElementId: number) => void;
}

function CartElement(props: CartElementProps) {
  const { cartInfo, removeFromCartInfoList } = props;
  const { cartElementId, menuName, sizeName, total, amount, isIce } = cartInfo;
  return (
    <ElementBox>
      <OptionWrapper>
        <span className="element-name">{menuName}</span>
        <span className="element-temperature">{getTemperature(isIce)}</span>
        <span className="element-size">{sizeName}</span>
        <span className="element-amount">{amount}</span>
        <span className="element-total">{total.toLocaleString()}</span>
      </OptionWrapper>
      <RemoveButton onClick={() => removeFromCartInfoList(cartElementId)}>삭제</RemoveButton>
    </ElementBox>
  );
}

const ElementBox = styled.li`
  width: 100%;

  display: flex;
  align-items: center;
  gap: 10px;

  border-radius: 8px;
  background-color: white;

  padding: 0 10px;

  list-style: none;
`;

const OptionWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  padding: 11px 0;

  flex: 1;

  & > span {
    font-weight: 400;
    font-size: 14px;
    text-align: center;

    &.element-name {
      width: 40%;
      ${mixin.textEllipsis(1)}
      text-align: start;
    }

    &.element-temperature {
      width: 12%;
      letter-spacing: -0.02em;
    }
    &.element-size {
      width: 15%;
      letter-spacing: -0.05em;
    }
    &.element-amount {
      width: 5%;
    }

    &.element-total {
      width: 15%;
      letter-spacing: -0.05em;
      text-align: end;
    }
  }
`;

const RemoveButton = styled.button`
  padding: 3px 9px;
  border-radius: 8px;
  background-color: ${({ theme }) => theme.colors.background};

  font-weight: 500;
  font-size: 12px;
`;

export default CartElement;
