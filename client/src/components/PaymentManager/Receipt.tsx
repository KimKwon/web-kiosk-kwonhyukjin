interface ReceiptProps {
  receiptInfo: {
    selectedMethodId: number;
    totalPrice: number;
    givenPrice?: number;
  };
}

function Receipt(props: ReceiptProps) {
  const { selectedMethodId, totalPrice } = props.receiptInfo;
  return (
    <div>{`${selectedMethodId}번 결제수단으로 ${totalPrice.toLocaleString()}원 결제완료`}</div>
  );
}

export default Receipt;
