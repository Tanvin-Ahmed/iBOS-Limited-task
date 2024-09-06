import { Product } from "@/types";

type PaginatedResult<T> = {
  data: T[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
};

export const paginateProducts = (
  products: Product[],
  page: number,
  pageSize: number,
  categoryId?: string
): PaginatedResult<Product> => {
  // Filter products by category if a categoryId is provided
  const filteredProducts = categoryId?.trim()
    ? products.filter((product) => product.categoryId === categoryId)
    : products;

  // Calculate total pages
  const total = filteredProducts.length;
  const totalPages = Math.ceil(total / pageSize);

  // Ensure the page number is within bounds
  const currentPage = Math.max(1, Math.min(page, totalPages));

  // Get the products for the current page
  const start = (currentPage - 1) * pageSize;
  const paginatedData = filteredProducts.slice(start, start + pageSize);

  return {
    data: paginatedData,
    total,
    page: currentPage,
    pageSize,
    totalPages,
  };
};
