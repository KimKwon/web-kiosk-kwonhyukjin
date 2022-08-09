import { CartInfoType } from '../KioskManager';

interface PaymentManagerProps {
  closeButton: JSX.Element;
  cartInfoList: CartInfoType[];
}

function PaymentManager({ closeButton }: PaymentManagerProps) {
  return (
    <div>
      <div>결제매니저</div>
      {closeButton}
    </div>
  );
}

export default PaymentManager;
