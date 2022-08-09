import { useState } from 'react';
import styled from 'styled-components';
import { CategorizedMenu } from '../../App';
import { ReactComponent as Logo } from '../../assets/logo.svg';
import CategoryTab from './CategoryTab';
import MenuGrid from './KioskMenu/MenuGrid';
import ShoppingCart from './KioskCart/ShoppingCart';
interface KioskProps {
  data: CategorizedMenu[];
}

export interface CartInfoType {
  cartElementId: number;
  menuId: number;
  menuName: string;
  sizeId: number;
  sizeName: string;
  total: number;
  amount: number;
  isIce: boolean;
}

function KioskManager({ data }: KioskProps) {
  const [selectedCategoryIdx, setselectedCategoryIdx] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [cartInfoList, setCartInfoList] = useState<CartInfoType[]>([
    {
      cartElementId: 1,
      menuId: 1,
      menuName: '크림 아메리카노',
      sizeId: 1,
      sizeName: 'Venti',
      total: 9000,
      amount: 2,
      isIce: true,
    },
    {
      cartElementId: 2,
      menuId: 1,
      menuName: '과테말라 아야르자',
      sizeId: 1,
      sizeName: 'Grande',
      total: 15000,
      amount: 10,
      isIce: false,
    },
    {
      cartElementId: 3,
      menuId: 1,
      menuName: '콜롬비아 안티오키아',
      sizeId: 1,
      sizeName: 'Tall',
      total: 267000,
      amount: 97,
      isIce: true,
    },
  ]);

  const getCategories = () =>
    data.map(({ id, name }) => ({
      id,
      name,
    }));
  const changeCategoryIdx = (nextCategoryIdx: number) => setselectedCategoryIdx(nextCategoryIdx);

  const removeFromCartInfoList = (targetId: number) => {
    setCartInfoList((prevCartInfoList) =>
      prevCartInfoList.filter(({ cartElementId }) => cartElementId !== targetId),
    );
  };

  const clearCartInfoList = () => {
    setCartInfoList([]);
  };

  return (
    <KioskContainer>
      <header>
        <Logo />
      </header>
      <Delimiter />
      <KioskContent>
        <CategoryTab
          categories={getCategories()}
          selectedCategoryIdx={selectedCategoryIdx}
          changeCategoryIdx={changeCategoryIdx}
        />
        <section>
          <MenuGrid currentMenuList={data[selectedCategoryIdx]?.items || []} />
          <ShoppingCart
            cartInfoList={cartInfoList}
            clearCartInfoList={clearCartInfoList}
            removeFromCartInfoList={removeFromCartInfoList}
          />
        </section>
      </KioskContent>
    </KioskContainer>
  );
}

const KioskContainer = styled.main`
  width: 100%;

  display: flex;
  flex-direction: column;
  align-items: center;
  & > header {
    padding: 20px 0;
  }
`;

const KioskContent = styled.section`
  width: 100%;
  padding: 35px 183px;

  & > section {
    width: 100%;
    display: flex;

    margin-top: 57px;
  }
`;

const Delimiter = styled.div`
  width: 100%;
  height: 1px;

  border: 2px solid ${({ theme }) => theme.colors.gray01};
  box-shadow: 3px 3px 3px rgba(0, 0, 0, 0.25);
`;

export default KioskManager;
