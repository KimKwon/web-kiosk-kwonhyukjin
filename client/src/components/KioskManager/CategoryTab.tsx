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
  return (
    <CategoryTabNav>
      <LeftPolygon />
      {categories.map(({ id, name }) => (
        <CategoryTabElement
          key={id}
          onClick={() => changeCategoryIdx(id)}
          selected={selectedCategoryIdx === id}
        >
          {name}
        </CategoryTabElement>
      ))}
      <RightPolygon />
    </CategoryTabNav>
  );
}

const CategoryTabNav = styled.nav`
  width: 100%;
  display: flex;
  justify-content: space-between;
  padding: 0 183px;
`;

const CategoryTabElement = styled.button<{ selected: boolean }>`
  position: relative;

  font-size: 25px;
  font-weight: 500;
  color: ${({ theme }) => theme.colors.black01};
  background-color: transparent;
  padding: 0;

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

export default CategoryTab;
