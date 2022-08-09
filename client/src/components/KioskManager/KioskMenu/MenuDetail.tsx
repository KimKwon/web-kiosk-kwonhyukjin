import Button from '../../common/Button';

interface MenuDetailProps {
  closeModal: () => void;
  menuId: number | null;
}

function MenuDetail({ closeModal }: MenuDetailProps) {
  return (
    <div>
      <div>
        <Button onClick={closeModal} variant="contained" size="md" color="gray02">
          돌아가기
        </Button>
        <Button variant="contained" size="md" color="primary">
          담기
        </Button>
      </div>
    </div>
  );
}

export default MenuDetail;
