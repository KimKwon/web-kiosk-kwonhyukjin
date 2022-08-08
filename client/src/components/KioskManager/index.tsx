import { useState } from 'react';
import styled from 'styled-components';
import { CategorizedMenu } from '../../App';
import { ReactComponent as Logo } from '../../assets/logo.svg';
import CategoryTab from './CategoryTab';
import MenuGrid from './MenuGrid';
import ShoppingCart from './ShoppingCart';
interface KioskProps {
  data: CategorizedMenu[];
}

interface CartInfoType {
  menuId: number;
  sizeId: number;
  total: number;
  amount: number;
  isIce: boolean;
}

function KioskManager({ data }: KioskProps) {
  const [selectedCategoryIdx, setselectedCategoryIdx] = useState(data[0].id);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [cartInfo, setCartInfo] = useState<CartInfoType[]>([]);

  const getCategories = () =>
    data.map(({ id, name }) => ({
      id,
      name,
    }));
  const changeCategoryIdx = (nextCategoryIdx: number) => setselectedCategoryIdx(nextCategoryIdx);

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
          <ShoppingCart />
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
