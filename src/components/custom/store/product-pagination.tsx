import React, { useContext } from "react";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { PageInfo } from "@/types";
import { useWindowWidth } from "@react-hook/window-size";
import { StoreContext } from "@/context/store-context";
import { paginateProducts } from "@/query-function/query";
import products_data from "@/data/product.json";
import { PRODUCT_PER_PAGE } from "@/constant/constant";

type Props = {
  pageInfo: PageInfo;
  setPageInfo: React.Dispatch<React.SetStateAction<PageInfo>>;
};

const ProductPagination = ({ pageInfo, setPageInfo }: Props) => {
  const { setProducts, selectedCategoryId } = useContext(StoreContext);

  const windowWidth = useWindowWidth();
  const { page, totalPages } = pageInfo;

  const showPreviousButton = page > 1;
  const showNextButton = page < totalPages;

  const handlePageChange = (newPage: number) => {
    const result = paginateProducts(
      products_data,
      newPage,
      PRODUCT_PER_PAGE,
      selectedCategoryId
    );
    setPageInfo((prev) => ({ ...prev, page: newPage }));
    setProducts(result.data);
  };

  const getPageNumbers = () => {
    const pages = [];
    const range = windowWidth >= 500 ? 1 : 0; // Number of pages to show around the current page

    // Show first page
    if (totalPages > 1) pages.push(1);

    // Add ellipses if needed after the first page
    if (page > range + 2) {
      pages.push(-1); // Ellipsis
    }

    // Add page numbers around the current page
    for (
      let i = Math.max(2, page - range);
      i <= Math.min(totalPages - 1, page + range);
      i++
    ) {
      pages.push(i);
    }

    // Add ellipses if needed before the last page
    if (page < totalPages - range - 1) {
      pages.push(-1); // Ellipsis
    }

    // Show last page
    if (totalPages > 1 && !pages.includes(totalPages)) {
      pages.push(totalPages);
    }

    return pages;
  };

  const pages = getPageNumbers();

  return (
    <Pagination>
      <PaginationContent>
        {showPreviousButton && (
          <PaginationItem>
            <PaginationPrevious
              className="cursor-pointer"
              onClick={() => handlePageChange(page - 1)}
            />
          </PaginationItem>
        )}

        {windowWidth > 400
          ? pages.map((pageNumber, index) => (
              <React.Fragment key={index}>
                {pageNumber === -1 ? (
                  <PaginationEllipsis />
                ) : (
                  <PaginationItem>
                    <PaginationLink
                      className="cursor-pointer"
                      isActive={pageNumber === page}
                      onClick={() => handlePageChange(pageNumber)}
                    >
                      {pageNumber}
                    </PaginationLink>
                  </PaginationItem>
                )}
              </React.Fragment>
            ))
          : null}

        {showNextButton && (
          <PaginationItem>
            <PaginationNext
              className="cursor-pointer"
              onClick={() => handlePageChange(page + 1)}
            />
          </PaginationItem>
        )}
      </PaginationContent>
    </Pagination>
  );
};

export default ProductPagination;
