import styled from 'styled-components';
import { ReactComponent as LeftPolygon } from '../../assets/icons/left-polygon.svg';
import { ReactComponent as RightPolygon } from '../../assets/icons/right-polygon.svg';

interface CategoryTabProps {
  categories: Array<{
    id: number;
    name: string;
  }>;
  selectedCategoryIdx: number;
  changeCategoryIdx: (nextCategoryIdx: number) => void;
}

function CategoryTab(props: CategoryTabProps) {
  const { categories, changeCategoryIdx, selectedCategoryIdx } = props;

  const isFirstCategory = selectedCategoryIdx === 0;
  const isLastCategory = categories.length - 1 === selectedCategoryIdx;

  const navigateCategory = (targetIdx: -1 | 1) => {
    if ((isFirstCategory && targetIdx < 0) || (isLastCategory && targetIdx > 0)) return;
    changeCategoryIdx(selectedCategoryIdx + targetIdx);
  };

  return (
    <CategoryTabNav>
      <CategoryNavigator onClick={() => navigateCategory(-1)} navigateDisabled={isFirstCategory}>
        <LeftPolygon />
      </CategoryNavigator>
      {categories.map(({ id, name }, idx) => (
        <CategoryTabElement
          key={id}
          onClick={() => changeCategoryIdx(idx)}
          selected={selectedCategoryIdx === idx}
        >
          {name}
        </CategoryTabElement>
      ))}
      <CategoryNavigator onClick={() => navigateCategory(1)} navigateDisabled={isLastCategory}>
        <RightPolygon />
      </CategoryNavigator>
    </CategoryTabNav>
  );
}

const CategoryTabNav = styled.nav`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 183px;
`;

const CategoryTabElement = styled.button<{ selected: boolean }>`
  position: relative;

  font-size: 25px;
  font-weight: 500;
  color: ${({ selected, theme: { colors } }) => (selected ? colors.black01 : colors.gray01)};
  padding: 0;
  margin-top: -5px;

  &:after {
    content: '';
    display: ${({ selected }) => (selected ? 'block' : 'none')};
    position: absolute;
    left: 0;
    bottom: 0px;
    transform: translateY(100%);
    width: 100%;
    height: 5px;
    background-color: ${({ theme }) => theme.colors.primary};
  }
`;

const CategoryNavigator = styled.button<{ navigateDisabled: boolean }>`
  & > svg > path {
    fill: ${({ navigateDisabled, theme: { colors } }) => !navigateDisabled && colors.primary};
  }
`;

export default CategoryTab;
