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
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 24px;
`;

export default MenuGrid;
