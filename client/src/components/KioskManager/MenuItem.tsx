import styled from 'styled-components';
import { MenuType } from '../../App';
import mixin from '../../cores/styles/mixin';

function MenuItem({ menuInfo }: { menuInfo: Pick<MenuType, 'name' | 'price' | 'thumbnail'> }) {
  const { name, price, thumbnail } = menuInfo;
  return (
    <MenuBox>
      <img src={thumbnail} alt="menu-thumbnail" />
      <p className="menu-name">{name}</p>
      <p className="menu-price">{price.toLocaleString()}</p>
    </MenuBox>
  );
}

const MenuBox = styled.article`
  width: 198px;
  max-height: 276px;

  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 22px;

  border-radius: 12px;
  background-color: ${({ theme }) => theme.colors.background02};
  box-shadow: 2px 3px 3px 3px rgba(0, 0, 0, 0.25);

  padding: 22px 35px;

  & > img {
    width: 78px;
    height: 140px;

    object-fit: cover;
  }

  & > p {
    font-weight: 500;

    &.menu-name {
      font-size: 18px;
      height: 36px;
      color: ${({ theme }) => theme.colors.black01};
      word-break: keep-all;
      text-align: center;
    }

    &.menu-price {
      font-size: 16px;
      color: ${({ theme }) => theme.colors.primary};
      ${mixin.concatWonUnit}
    }
  }

  &:hover {
    cursor: pointer;
    transform: scale(0.95);
  }
`;

export default MenuItem;
