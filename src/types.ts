export type User = {
  firstName?: string;
  lastName?: string;
  email: string;
  password: string;
  agree: boolean;
};

export type Category = {
  id: string;
  name: string;
};

export type Product = {
  id: string;
  name: string;
  actualPrice: string;
  offerPrice: string;
  description: string;
  categoryId: string;
  image: string;
};

export type Cart = {
  id: string;
  name: string;
  actualPrice: string;
  offerPrice: string;
  description: string;
  categoryId: string;
  image: string;
  itemCount: number;
};

export type PageInfo = {
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
};
