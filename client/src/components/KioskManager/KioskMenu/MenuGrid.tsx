import styled from 'styled-components';

interface MenuGridProps {
  children: JSX.Element[];
  selectedCategoryIdx: number;
}

function MenuGrid(props: MenuGridProps) {
  const { children, selectedCategoryIdx } = props;

  const currentTranslateX = `translateX(${-100 * selectedCategoryIdx}%)`;

  return <GridSection currentTranslateX={currentTranslateX}>{children}</GridSection>;
}

const GridSection = styled.section<{ currentTranslateX: string }>`
  flex: 2;

  height: 600px;

  display: flex;
  overflow-x: hidden;

  & > div.translated-box {
    transform: ${({ currentTranslateX }) => currentTranslateX};
    transition: transform ease 0.3s;
    flex: 0 0 auto;
    width: 100%;
    overflow-y: auto;
    padding: 5px;

    display: grid;
    grid-template-columns: repeat(3, 1fr);
    justify-content: flex-start;
    gap: 24px;

    user-select: none;
  }
`;

export default MenuGrid;
