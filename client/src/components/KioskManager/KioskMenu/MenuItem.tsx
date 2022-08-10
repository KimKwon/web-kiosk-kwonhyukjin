import styled from 'styled-components';
import { MenuType } from '../../../App';
import mixin from '../../../cores/styles/mixin';

import { ReactComponent as FirstMedal } from '../../../assets/icons/first-medal.svg';
import { ReactComponent as SecondMedal } from '../../../assets/icons/second-medal.svg';
import { ReactComponent as ThirdMedal } from '../../../assets/icons/third-medal.svg';

const RANK_MEDAL = [FirstMedal, SecondMedal, ThirdMedal];

interface MenuItemInterface {
  onClickMenu: (menuId: number) => void;
  menuInfo: Pick<MenuType, 'name' | 'price' | 'thumbnail' | 'id' | 'rank'>;
}

function MenuItem({ menuInfo, onClickMenu }: MenuItemInterface) {
  const { name, price, thumbnail, id, rank } = menuInfo;

  const isValidRank = rank && rank > 0 && rank <= 3;

  const Medal = isValidRank && RANK_MEDAL[rank - 1];

  return (
    <MenuBox onClick={() => onClickMenu(id)}>
      <>
        {Medal && <Medal />}
        <img src={thumbnail} alt="menu-thumbnail" />
        <p className="menu-name">{name}</p>
        <p className="menu-price">{price.toLocaleString()}</p>
      </>
    </MenuBox>
  );
}

const MenuBox = styled.article`
  position: relative;
  width: 198px;
  max-height: 276px;

  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 22px;

  border-radius: 12px;
  box-shadow: 2px 3px 3px 3px rgba(0, 0, 0, 0.25);

  padding: 22px 35px;

  & > svg {
    position: absolute;
    top: 0;
    left: 7px;
  }

  & > img {
    width: 100%;
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
