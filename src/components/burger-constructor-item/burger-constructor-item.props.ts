export interface BurgerConstructorItemProps {
  index: number;
  text: string;
  price: number;
  thumbnail: string;
  handleClose: () => void;
  isHover?: boolean;
  id?: string;
  moveItems: (dragIndex: number, hoverIndex: number) => void;
}