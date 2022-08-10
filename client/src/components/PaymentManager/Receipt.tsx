interface ReceiptProps {
  receiptId: number;
}

function Receipt({ receiptId }: ReceiptProps) {
  return <div>{receiptId} 결제완료</div>;
}

export default Receipt;
