import { useState } from 'react';
import styled from 'styled-components';
import { CategorizedMenu } from '../../App';
import { ReactComponent as Logo } from '../../assets/logo.svg';
import { ReactComponent as XCircle } from '../../assets/icons/x-circle.svg';
import CategoryTab from './CategoryTab';
import MenuGrid from './KioskMenu/MenuGrid';
import ShoppingCart from './KioskCart/ShoppingCart';
import Modal from '../common/Modal';
import PaymentManager from '../PaymentManager';
import MenuDetail from './KioskMenu/MenuDetail';
import MenuItem from './KioskMenu/MenuItem';
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
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);
  const [isShoppingModalOpen, setIsShoppingModalOpen] = useState(false);
  const [currentShoppingMenuId, setCurrentShoppingMenuId] = useState<number | null>(null);
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

  const closeModal = (type: 'PAYMENT' | 'SHOPPING') => {
    const targetModalSetter = type === 'PAYMENT' ? setIsPaymentModalOpen : setIsShoppingModalOpen;
    return () => {
      targetModalSetter(false);
      setCurrentShoppingMenuId(null);
    };
  };

  const openModalWithSelectedMenu = (menuId: number) => {
    setCurrentShoppingMenuId(menuId);
    setIsShoppingModalOpen(true);
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
          <MenuGrid>
            {data[selectedCategoryIdx]?.items?.map((menu) => (
              <MenuItem key={menu.id} menuInfo={menu} onClickMenu={openModalWithSelectedMenu} />
            )) || []}
          </MenuGrid>
          <ShoppingCart
            cartInfoList={cartInfoList}
            clearCartInfoList={clearCartInfoList}
            removeFromCartInfoList={removeFromCartInfoList}
          />
        </section>
      </KioskContent>

      <Modal isOpen={isShoppingModalOpen}>
        <MenuDetail menuId={currentShoppingMenuId} closeModal={closeModal('SHOPPING')} />
      </Modal>
      <Modal isOpen={isPaymentModalOpen}>
        <PaymentManager
          cartInfoList={cartInfoList}
          closeButton={
            <button onClick={closeModal('PAYMENT')}>
              <XCircle />
            </button>
          }
        />
      </Modal>
    </KioskContainer>
  );
}

const KioskContainer = styled.main`
  width: 100%;

  display: flex;
  flex-direction: column;
  align-items: center;
  & > header {
    padding: 10px 0;
  }
`;

const KioskContent = styled.section`
  width: 100%;
  padding: 20px 160px;
  padding-bottom: 0;

  & > section {
    width: 100%;
    display: flex;

    margin-top: 36px;
  }
`;

const Delimiter = styled.div`
  width: 100%;
  height: 1px;

  border: 2px solid ${({ theme }) => theme.colors.gray01};
  box-shadow: 3px 3px 3px rgba(0, 0, 0, 0.25);
`;

export default KioskManager;
