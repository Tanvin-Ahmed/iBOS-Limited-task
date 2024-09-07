import ChooseCategory from "@/components/custom/store/choose-category";
import ProductPagination from "@/components/custom/store/product-pagination";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { PRODUCT_PER_PAGE } from "@/constant/constant";
import { StoreContext } from "@/context/store-context";
import categories_data from "@/data/category.json";
import products_data from "@/data/product.json";
import { calculateDiscount } from "@/lib/utils";
import { paginateProducts } from "@/query-function/query";
import { PageInfo, Product } from "@/types";
import { ShoppingBasket } from "lucide-react";
import { useContext, useEffect, useState } from "react";

const StorePage = () => {
  const {
    setCategories,
    categories,
    setProducts,
    products,
    selectedCategoryId,
    setSelectedCategoryId,
    insertCartItem,
  } = useContext(StoreContext);
  const [pageInfo, setPageInfo] = useState<PageInfo>({
    page: 1,
    pageSize: PRODUCT_PER_PAGE,
    total: 0,
    totalPages: 1,
  });

  // fetching categories
  useEffect(() => {
    setCategories(categories_data);
  }, [setCategories]);

  // fetching products
  useEffect(() => {
    const products = paginateProducts(products_data, 1, PRODUCT_PER_PAGE);
    const { data, ...rest } = products;
    setProducts(data);
    setPageInfo(rest);
  }, [setProducts]);

  const handleCategorySelect = (categoryId: string) => {
    setSelectedCategoryId(categoryId);

    const products = paginateProducts(
      products_data,
      1,
      PRODUCT_PER_PAGE,
      categoryId
    );

    const { data, ...rest } = products;
    setProducts(data);
    setPageInfo(rest);
  };

  const handleAddToCart = (item: Product) => {
    insertCartItem(item);
  };

  return (
    <section className="container p-4 mx-auto min-h-[77.5vh] max-h-full space-y-10 md:space-y-0">
      {/* category option for sm screen */}
      <div className="md:hidden">
        <ChooseCategory handleCategorySelect={handleCategorySelect} />
      </div>
      <div className="grid grid-cols-12 gap-4">
        {/* category option for large screen */}
        <div className="md:col-span-2 md:flex md:gap-3 space-y-3 hidden overflow-hidden">
          <div>
            <Button
              className="w-full flex justify-start"
              variant={selectedCategoryId ? "ghost" : "default"}
              onClick={() => handleCategorySelect("")}
            >
              All category
            </Button>
            {categories
              .filter((f) => f.name.trim().length)
              .map((category) => (
                <Button
                  key={category.id}
                  className="w-full flex justify-start"
                  variant={
                    selectedCategoryId === category.id ? "default" : "ghost"
                  }
                  onClick={() => handleCategorySelect(category.id)}
                >
                  {category.name}
                </Button>
              ))}
          </div>
          <Separator orientation="vertical" />
        </div>
        <div className="md:col-span-10 col-span-12">
          {
            <div className="grid lg:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-3">
              {products.map((product) => (
                <Card key={product.id} className="h-full flex flex-col">
                  <CardContent className="pt-6 space-y-2 flex-1">
                    <img
                      src={product.image}
                      alt=""
                      className="h-[250px] w-auto object-cover"
                    />
                    <CardTitle className="text-[16px]">
                      {product.name}
                    </CardTitle>
                    <p className="flex items-center gap-3 flex-wrap sm:flex-nowrap">
                      €{product.offerPrice}{" "}
                      <span className="text-muted-foreground line-through">
                        €{product.actualPrice}
                      </span>{" "}
                      <span className="text-red-500">
                        {calculateDiscount(
                          Number(product.actualPrice),
                          Number(product.offerPrice)
                        )}
                        % OFF
                      </span>
                    </p>
                    <small className="text-muted-foreground">
                      {product.description}
                    </small>
                  </CardContent>
                  <CardFooter>
                    <Button
                      className="w-full"
                      onClick={() => handleAddToCart(product)}
                    >
                      <ShoppingBasket className="w-4 h-4 mr-3" /> Add to cart
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          }

          <div className="my-10">
            <ProductPagination pageInfo={pageInfo} setPageInfo={setPageInfo} />
          </div>
        </div>
      </div>
    </section>
  );
};

export default StorePage;
