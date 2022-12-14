import { useEffect, useState } from 'react';
import styled from 'styled-components';

import Modal from '../common/Modal';
import CategoryTab from './CategoryTab';

import MenuGrid from './KioskMenu/MenuGrid';
import ShoppingCart from './KioskCart/ShoppingCart';
import PaymentManager from '../PaymentManager';
import MenuDetail from './KioskMenu/MenuDetail';
import MenuItem from './KioskMenu/MenuItem';

import { ReactComponent as Logo } from '../../assets/logo.svg';
import { ReactComponent as XCircle } from '../../assets/icons/x-circle.svg';

import type { CategorizedMenu } from '../../App';
import useTimer from '../../cores/hooks/useTimer';

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

export type CartInfoCreateDto = Omit<CartInfoType, 'cartElementId'>;

const IDLE_TIMEOUT = 10;

function KioskManager({ data }: KioskProps) {
  const { remainTime, invoke, pause, clear } = useTimer(IDLE_TIMEOUT);
  const [selectedCategoryIdx, setselectedCategoryIdx] = useState(0);
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);
  const [isShoppingModalOpen, setIsShoppingModalOpen] = useState(false);
  const [currentShoppingMenuId, setCurrentShoppingMenuId] = useState<number | null>(null);
  const [cartInfoList, setCartInfoList] = useState<CartInfoType[]>([]);

  const getCategories = () =>
    data.map(({ id, name }) => ({
      id,
      name,
    }));

  const showMenuItemIntoGrid = () => {
    return data.map((menuData) => (
      <div key={menuData.id} className="translated-box">
        {menuData.items.map((menu) => (
          <MenuItem key={menu.id} menuInfo={menu} onClickMenu={openModalWithSelectedMenu} />
        ))}
      </div>
    ));
  };

  const changeCategoryIdx = (nextCategoryIdx: number) => setselectedCategoryIdx(nextCategoryIdx);

  const removeFromCartInfoList = (targetId: number) => {
    setCartInfoList((prevCartInfoList) =>
      prevCartInfoList.filter(({ cartElementId }) => cartElementId !== targetId),
    );
  };

  const clearCartInfoList = () => {
    setCartInfoList([]);
  };

  const findCartInfoId = (targetCartInfo: CartInfoCreateDto) => {
    const { menuId: targetMenuId, sizeId: targetSizeId, isIce: targetIsIce } = targetCartInfo;
    return cartInfoList.find(
      ({ menuId, sizeId, isIce }) =>
        targetMenuId === menuId && targetSizeId === sizeId && targetIsIce === isIce,
    )?.cartElementId;
  };

  const updateCartInfo = (
    targetCartInfoId: number,
    updateInfo: Pick<CartInfoCreateDto, 'total' | 'amount'>,
  ) => {
    const copiedCartInfoList = [...cartInfoList];
    const targetCartInfo = copiedCartInfoList.find(
      ({ cartElementId }) => targetCartInfoId === cartElementId,
    );

    if (!targetCartInfo) return;

    const { total, amount } = updateInfo;

    targetCartInfo.amount += amount;
    targetCartInfo.total += total;

    setCartInfoList(copiedCartInfoList);
  };

  const addCartInfo = (newCartInfo: CartInfoCreateDto) => {
    const existCartInfoId = findCartInfoId(newCartInfo);
    const isCartInfoAlreadyExist = existCartInfoId !== undefined;

    if (isCartInfoAlreadyExist) {
      const { amount, total } = newCartInfo;
      updateCartInfo(existCartInfoId, { amount, total });
      return;
    }

    setCartInfoList((prevCartInfoList) => [
      ...prevCartInfoList,
      {
        ...newCartInfo,
        cartElementId: prevCartInfoList.length + 1,
      },
    ]);
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

  const openPaymentModal = () => {
    setIsPaymentModalOpen(true);
  };

  useEffect(() => {
    if (cartInfoList.length > 0) {
      invoke(clearCartInfoList);
      return;
    }

    clear();
  }, [cartInfoList]);

  useEffect(() => {
    if (isPaymentModalOpen || isShoppingModalOpen) {
      pause();
      return;
    }

    if (remainTime < IDLE_TIMEOUT) invoke(clearCartInfoList);
  }, [isPaymentModalOpen, isShoppingModalOpen, remainTime]);

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
          <MenuGrid selectedCategoryIdx={selectedCategoryIdx}>{showMenuItemIntoGrid()}</MenuGrid>
          <ShoppingCart
            resetTimeout={remainTime}
            openPaymentModal={openPaymentModal}
            cartInfoList={cartInfoList}
            clearCartInfoList={clearCartInfoList}
            removeFromCartInfoList={removeFromCartInfoList}
          />
        </section>
      </KioskContent>
      <Modal isOpen={isShoppingModalOpen}>
        <MenuDetail
          menuId={currentShoppingMenuId}
          closeModal={closeModal('SHOPPING')}
          addCartInfo={addCartInfo}
        />
      </Modal>
      <Modal isOpen={isPaymentModalOpen}>
        <PaymentManager
          cartInfoList={cartInfoList}
          closeButton={
            <button className="payment-cancel-button" onClick={closeModal('PAYMENT')}>
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
