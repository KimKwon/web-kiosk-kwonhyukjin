import styled from 'styled-components';
import { MenuType } from '../../App';
import MenuItem from './MenuItem';

interface MenuGridProps {
  currentMenuList: MenuType[];
}

function MenuGrid(props: MenuGridProps) {
  const { currentMenuList } = props;
  return (
    <SectionContainer>
      {currentMenuList.map((menu) => (
        <MenuItem key={menu.id} menuInfo={menu} />
      ))}
    </SectionContainer>
  );
}

const SectionContainer = styled.section`
  flex: 2;

  height: 600px;
  overflow-y: auto;
  padding: 5px;

  display: grid;
  grid-template-columns: repeat(3, 198px);
  justify-content: center;
  gap: 24px;

  user-select: none;
`;

export default MenuGrid;
