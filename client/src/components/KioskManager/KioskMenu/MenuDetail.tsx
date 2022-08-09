import styled from 'styled-components';
import useAPI, { BaseAPI } from '../../../cores/hooks/useAPI';
import Button from '../../common/Button';
import Loader from '../../common/Loader';
import { ReactComponent as Minus } from '../../../assets/icons/minus.svg';
import { ReactComponent as Plus } from '../../../assets/icons/plus.svg';
import { useState } from 'react';
import mixin from '../../../cores/styles/mixin';
import { ColumnWrapper, FlexWrapper } from '../../common/Wrapper';
import { temperature } from '../../../constants/temperature';

type SizeType = {
  surcharge: number;
  name: string;
};
interface MenuDetailResponse {
  id: number;
  name: string;
  description: string;
  price: number;
  thumbnail: string;
  specificTemperatureOnly: string;
  sizes: SizeType[];
}
interface MenuDetailProps {
  closeModal: () => void;
  menuId: number | null;
}

interface SelectedOptionsType {
  amount: number;
  selectedSize: SizeType | null;
  selectedTemperature: keyof typeof temperature | null;
}

function MenuDetail({ closeModal, menuId }: MenuDetailProps) {
  const [selectedOptions, setSelectedOptions] = useState<SelectedOptionsType>({
    amount: 1,
    selectedSize: null,
    selectedTemperature: null,
  });
  const { data, isLoading } = useAPI({
    url: `menu/${menuId}`,
    method: 'GET',
  }) as BaseAPI<MenuDetailResponse>;

  const handleSelectOption = (
    key: keyof SelectedOptionsType,
    payload: SelectedOptionsType[keyof SelectedOptionsType],
  ) => {
    setSelectedOptions((prevOptions) => ({
      ...prevOptions,
      [key]: payload,
    }));
  };

  if (isLoading) {
    return (
      <DetailBox>
        <Loader />
      </DetailBox>
    );
  }

  if (!data) return <DetailBox />;

  const { thumbnail, name, sizes, specificTemperatureOnly, description, price } = data;

  const { amount, selectedSize, selectedTemperature } = selectedOptions;

  const possibleTemperatures = Object.values(temperature).filter(
    (temperatureName) =>
      specificTemperatureOnly === null || temperatureName === specificTemperatureOnly,
  );

  return (
    <DetailBox>
      <FlexWrapper>
        <ImageBox>
          <img src={thumbnail} alt="menu-thumbnail" />
        </ImageBox>
        <DetailInfo>
          <p className="menu-name">{name}</p>
          <p className="menu-description">{description}</p>
          <p className="menu-price">{price.toLocaleString()}</p>
          <FlexWrapper style={{ gap: '25px' }}>
            <button type="button">
              <Minus />
            </button>
            <span className="menu-amount">{amount}</span>
            <button type="button">
              <Plus />
            </button>
          </FlexWrapper>
        </DetailInfo>
      </FlexWrapper>
      <ColumnWrapper style={{ marginTop: '72px', gap: '50px' }}>
        <OptionWrapper>
          <OptionLabel>SIZE</OptionLabel>
          <div>
            {sizes.map(({ name, surcharge }) => (
              <Button
                key={name}
                onClick={() => handleSelectOption('selectedSize', { name, surcharge })}
                variant={name === selectedSize?.name ? 'contained' : 'outlined'}
                color="primary"
                size="sm"
                extraStyle={{ borderRadius: '8px' }}
              >
                {name}
              </Button>
            ))}
          </div>
        </OptionWrapper>
        <OptionWrapper>
          <OptionLabel>SORT</OptionLabel>
          <div>
            {possibleTemperatures.map((name) => (
              <Button
                key={name}
                onClick={() => handleSelectOption('selectedTemperature', name)}
                variant={name === selectedTemperature ? 'contained' : 'outlined'}
                color="primary"
                size="sm"
                extraStyle={{ borderRadius: '8px' }}
              >
                {name}
              </Button>
            ))}
          </div>
        </OptionWrapper>
      </ColumnWrapper>

      <ButtonWrapper>
        <Button
          onClick={closeModal}
          variant="contained"
          size="md"
          color="gray02"
          extraStyle={{ width: '218px' }}
        >
          돌아가기
        </Button>
        <Button variant="contained" size="md" color="primary" extraStyle={{ width: '218px' }}>
          담기
        </Button>
      </ButtonWrapper>
    </DetailBox>
  );
}

const DetailBox = styled(ColumnWrapper)`
  position: relative;
  width: 590px;
  height: 660px;

  padding: 29px 50px;

  border-radius: 18px;

  background-color: white;
`;

const ButtonWrapper = styled(FlexWrapper)`
  margin-top: auto;
  display: flex;
  justify-content: space-between;
`;

const ImageBox = styled.div`
  padding: 25px 55px;
  box-shadow: 2px 3px 3px 3px rgba(0, 0, 0, 0.25);
  border-radius: 12px;

  & > img {
    width: 90px;
    height: 160px;

    object-fit: cover;
  }
`;

const DetailInfo = styled(ColumnWrapper)`
  flex: 1;
  margin-left: 54px;
  padding: 15px 0;

  & .menu-name {
    margin-bottom: 12px;

    font-size: 24px;
    font-weight: 600;
    color: ${({ theme }) => theme.colors.black01};
  }

  & .menu-description {
    margin-bottom: 32px;

    font-size: 16px;
    color: ${({ theme }) => theme.colors.gray01};
  }

  & .menu-price {
    margin-bottom: 27px;

    font-size: 24px;
    font-weight: 600;
    color: ${({ theme }) => theme.colors.primary};
    ${mixin.concatWonUnit}
  }

  & .menu-amount {
    font-size: 24px;
    font-weight: 600;
  }
`;

const OptionWrapper = styled(FlexWrapper)`
  align-items: center;
  gap: 48px;
  & > div {
    display: flex;
    gap: 19px;
  }

  & .size-label {
    font-size: 24px;
  }
`;

const OptionLabel = styled.span`
  font-size: 24px;
  font-weight: 600;
  letter-spacing: -0.05em;
  color: ${({ theme }) => theme.colors.black01};

  min-width: 60px;
`;

export default MenuDetail;
