interface ReceiptProps {
  receiptInfo: {
    selectedMethodId: number;
    totalPrice: number;
    givenPrice?: number;
  };
}

function Receipt(props: ReceiptProps) {
  const { selectedMethodId, totalPrice, givenPrice } = props.receiptInfo;
  return <div>{`${selectedMethodId}로 ${givenPrice}받아서 ${totalPrice}결제완료`}</div>;
}

export default Receipt;
