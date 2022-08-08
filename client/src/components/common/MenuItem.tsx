import styled from 'styled-components';
import { MenuType } from '../../App';

function MenuItem({ menuInfo }: { menuInfo: MenuType }) {
  const { name, price, description, thumbnail, specificTemperatureOnly } = menuInfo;
  return <MenuBox>{name}</MenuBox>;
}

const MenuBox = styled.article``;

export default MenuItem;
