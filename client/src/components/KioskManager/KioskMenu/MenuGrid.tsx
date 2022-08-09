import styled from 'styled-components';

interface MenuGridProps {
  children: JSX.Element[];
}

function MenuGrid(props: MenuGridProps) {
  const { children } = props;
  return <SectionContainer>{children}</SectionContainer>;
}

const SectionContainer = styled.section`
  flex: 2;

  height: 600px;
  overflow-y: auto;
  padding: 5px;

  display: grid;
  grid-template-columns: repeat(3, 198px);
  justify-content: flex-start;
  gap: 24px;

  user-select: none;
`;

export default MenuGrid;
