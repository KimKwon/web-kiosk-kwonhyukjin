import styled from 'styled-components';

interface CategoryTabProps {
  categories: Array<{
    id: number;
    name: string;
  }>;
  selectedCategoryId: number;
  changeCategoryId: (nextCategoryId: number) => void;
}

function CategoryTab(props: CategoryTabProps) {
  const { categories, changeCategoryId, selectedCategoryId } = props;
  return (
    <CategoryTabNav>
      {categories.map(({ id, name }) => (
        <CategoryTabElement
          key={id}
          onClick={() => changeCategoryId(id)}
          selected={selectedCategoryId === id}
        >
          {name}
        </CategoryTabElement>
      ))}
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
