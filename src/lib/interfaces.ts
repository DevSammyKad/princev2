export type Cart = {
  userId: string;
  items: Array<{
    id: string;
    name: string;
    price: number;
    salePrice: number;
    quantity: number;
    imageString: string;
  }>;
};
