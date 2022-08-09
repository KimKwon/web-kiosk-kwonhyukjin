import { CartInfoType } from '../KioskManager';

interface PaymentManagerProps {
  CloseButton: JSX.Element;
  cartInfoList: CartInfoType[];
}

function PaymentManager({ CloseButton }: PaymentManagerProps) {
  return (
    <div>
      <div>결제매니저</div>
      {CloseButton}
    </div>
  );
}

export default PaymentManager;
