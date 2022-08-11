import ErrorBoundary from './components/ErrorBoundary';
import FallbackUI from './components/ErrorBoundary/FallbackUI';
import IdleKioskScreen from './components/IdleKioskScreen';
import KioskManager from './components/KioskManager';
import useAPI, { BaseAPI } from './cores/hooks/useAPI';
import useKioskStatus, { KioskStatus } from './cores/hooks/useKioksStatus';
import useToast from './cores/hooks/useToast';

export interface MenuType {
  id: number;
  name: string;
  price: number;
  description: string;
  thumbnail: string;
  specificTemperatureOnly: 'HOT' | 'ICED' | null;
  rank: number | null;
}

export interface CategorizedMenu {
  id: number;
  name: string;
  items: MenuType[];
}

function ErrorCapturingApp() {
  return (
    <ErrorBoundary
      fallback={({ resetError, error }) => <FallbackUI error={error} resetError={resetError} />}
    >
      <App />
    </ErrorBoundary>
  );
}

function App() {
  const { data, isLoading } = useAPI({
    url: 'menu',
    method: 'GET',
  }) as BaseAPI<CategorizedMenu[]>;

  const { kioskStatus } = useKioskStatus();
  const { isToastOpen, renderToast } = useToast();

  const screenHandler = () => {
    switch (kioskStatus) {
      case KioskStatus.IDLE:
        return <IdleKioskScreen isMenuReady={Boolean(!isLoading && data)} />;
      case KioskStatus.SHOPPING:
        if (!data) throw Error('키오스크 데이터를 불러오지 못했어요.');
        // 최상단 Error Boundary에 의해 처리되게 할 예정
        return <KioskManager data={data} />;
      default:
        return <IdleKioskScreen isMenuReady={Boolean(!isLoading && data)} />;
    }
  };

  return (
    <>
      {screenHandler()}
      {isToastOpen && renderToast()}
    </>
  );
}

export default ErrorCapturingApp;
