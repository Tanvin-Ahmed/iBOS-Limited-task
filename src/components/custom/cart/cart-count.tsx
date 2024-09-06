import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { StoreContext } from "@/context/store-context";
import { Info } from "lucide-react";
import { useContext } from "react";

const CartCount = () => {
  const { subTotal } = useContext(StoreContext);

  return (
    <>
      <h2 className="text-2xl font-semibold">Oder details</h2>
      <Card className="bg-slate-50">
        <CardContent className="mt-5 text-muted-foreground space-y-3">
          <div>
            <div className="flex justify-between gap-3">
              <p>Subtotal</p>
              <p>€{subTotal}</p>
            </div>
            <div className="flex justify-between gap-3">
              <p>Shipping</p>
              <p>Free</p>
            </div>
            <div className="flex justify-between gap-3">
              <p className="flex items-center gap-1">
                Estimated Tax <Info className="h-4 w-4" />
              </p>
              <p>€ -</p>
            </div>
          </div>
          <Separator />
          <div className="flex justify-between items-center gap-3">
            <p className="text-muted-foreground font-bold text-lg">Total</p>
            <p className="font-bold text-lg text-black">€ {subTotal}</p>
          </div>
        </CardContent>
      </Card>
      <Button className="w-full uppercase">Go to Checkout</Button>
    </>
  );
};

export default CartCount;
