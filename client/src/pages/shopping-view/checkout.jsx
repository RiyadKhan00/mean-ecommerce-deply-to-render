import Address from "@/components/shopping-view/address";
import img from "../../assets/accimg.webp";
import { useSelector } from "react-redux";
import UserCartItemsContent from "@/components/shopping-view/cart-items-content";
import { Button } from "@/components/ui/button";

const ShoppingCheckout = () => {
  const { cartItems } = useSelector((state) => state.shopCart);

  const totalCartAmout =
    cartItems && cartItems.items && cartItems.items.length > 0
      ? cartItems.items.reduce(
          (sum, currentItem) =>
            sum +
            (currentItem.salePrice > 0
              ? currentItem.salePrice
              : currentItem.price) *
              currentItem.quantity,
          0
        )
      : 0;

  return (
    <div className="flex flex-col">
      <div className="relative h-[300px] w-full overflow-hidden">
        <img src={img} className="h-full w-full object-cover object-center" />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-5 p-5">
        <Address />
        <div className="flex flex-col gap-4">
          {cartItems && cartItems.items && cartItems.items.length > 0
            ? cartItems.items.map((item, i) => (
                <UserCartItemsContent key={i} cartItems={item} />
              ))
            : null}

          <div className="mt-8 space-y-5">
            <div className="flex justify-between">
              <span className="font-bold">Total</span>
              <span className="font-bold">${totalCartAmout}</span>
            </div>
          </div>

          <div className="mt-4 w-full">
            <Button className="w-full bg-black">Checkout with Paypal</Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShoppingCheckout;
