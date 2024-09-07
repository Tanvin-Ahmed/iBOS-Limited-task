import CartCount from "@/components/custom/cart/cart-count";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { StoreContext } from "@/context/store-context";
import { Frown, X } from "lucide-react";
import { useContext } from "react";

const Cart = () => {
  const { updateCart, cartItems, removeFromCart } = useContext(StoreContext);

  return (
    <section className="container p-4 mx-auto min-h-[77.5vh] max-h-full md:space-y-0 space-y-10">
      <div className="grid grid-cols-12 gap-4">
        <div className="md:col-span-9 col-span-12 space-y-4">
          <h2 className="text-2xl font-semibold">An overview of your order</h2>

          <Card className="bg-slate-50">
            <CardContent className="mt-5">
              {!cartItems.length ? (
                <div className="flex flex-col gap-2 justify-center items-center p-4 rounded">
                  <Frown className="h-10 w-10 text-muted-foreground" />
                  <small className="text-muted-foreground">
                    No item add yet!
                  </small>
                </div>
              ) : (
                <div className="space-y-6">
                  {cartItems.map((item, index) => (
                    <div key={item.id} className="flex flex-col gap-2">
                      <div className="flex justify-start items-start gap-6">
                        <div className="flex items-center gap-2">
                          <div className="flex justify-center items-center bg-white rounded">
                            <Button
                              size={"icon"}
                              variant={"ghost"}
                              className="h-7 w-7"
                              disabled={item.itemCount <= 1}
                              onClick={() =>
                                updateCart({
                                  ...item,
                                  itemCount: (item.itemCount -= 1),
                                })
                              }
                            >
                              -
                            </Button>
                            <p>{item.itemCount}</p>
                            <Button
                              size={"icon"}
                              variant={"ghost"}
                              className="h-7 w-7"
                              onClick={() =>
                                updateCart({
                                  ...item,
                                  itemCount: (item.itemCount += 1),
                                })
                              }
                            >
                              +
                            </Button>
                          </div>
                          <img
                            src={item.image}
                            alt="cover"
                            className="rounded h-12 w-12 object-contain"
                          />
                        </div>
                        <div className="w-full flex justify-between gap-2">
                          <CardTitle
                            className="text-[16px] hidden sm:block"
                            title={item.name}
                          >
                            {item.name}
                          </CardTitle>
                          <CardTitle
                            className="text-[14px] block sm:hidden"
                            title={item.name}
                          >
                            {item.name.length > 10
                              ? `${item.name.substring(0, 10)}...`
                              : item.name}
                          </CardTitle>

                          <X
                            onClick={() => removeFromCart(item.id)}
                            className="text-muted-foreground h-5 w-5 cursor-pointer"
                          />
                        </div>
                      </div>
                      <p className="text-right">
                        €{(Number(item.offerPrice) * item.itemCount).toFixed(2)}
                      </p>

                      {index === cartItems.length - 1 ? null : (
                        <Separator className="bg-gray-200" />
                      )}
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </div>
        {/* for large screen */}
        <div className="col-span-3 md:block hidden space-y-4">
          <CartCount />
        </div>
      </div>
      {/* for small screen */}
      <div className="space-y-4 pb-10 md:pb-0 md:hidden">
        <CartCount />
      </div>
    </section>
  );
};

export default Cart;
