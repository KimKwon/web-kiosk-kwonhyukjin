import IdleKioskScreen from './components/IdleKioskScreen';
import KioskManager from './components/KioskManager';
import useAPI, { BaseAPI } from './cores/hooks/useAPI';
import useKioskStatus from './cores/hooks/useKioksStatus';

export interface MenuType {
  id: number;
  name: string;
  price: number;
  description: string;
  thumbnail: string;
  specificTemperatureOnly: 'HOT' | 'ICED' | null;
}

export interface CategorizedMenu {
  id: number;
  name: string;
  items: MenuType[];
}

function App() {
  const { data, isLoading } = useAPI({
    url: 'menu',
    method: 'GET',
  }) as BaseAPI<CategorizedMenu[]>;

  const { kioskStatus } = useKioskStatus();

  const screenHandler = () => {
    switch (kioskStatus) {
      case 'IDLE':
        return <IdleKioskScreen isMenuReady={Boolean(!isLoading && data)} />;
      case 'SHOPPING':
        if (!data) throw Error('키오스크 데이터를 불러오지 못했어요.');
        // 최상단 Error Boundary에 의해 처리되게 할 예정
        return <KioskManager data={data} />;
      default:
        return <IdleKioskScreen isMenuReady={Boolean(!isLoading && data)} />;
    }
  };

  return screenHandler();
}

export default App;
