import React from "react";
import { SheetContent, SheetHeader, SheetTitle } from "../ui/sheet";
import { Button } from "../ui/button";
import UserCartItemsContent from "./cart-items-content";
import { useNavigate } from "react-router-dom";

const UserCartWrapper = ({ cartItems, setOpenCartSheet }) => {
  const navigate = useNavigate();

  const totalCartAmout =
    cartItems && cartItems.length > 0
      ? cartItems.reduce(
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
    <SheetContent className="sm:max-w-md">
      <SheetHeader>
        <SheetTitle>Your Cart</SheetTitle>
      </SheetHeader>

      <div className="mt-8 space-y-4">
        {cartItems && cartItems.length > 0
          ? cartItems.map((item, i) => (
              <UserCartItemsContent key={i} cartItem={item} />
            ))
          : null}
      </div>
      <div className="mt-8 space-y-5">
        <div className="flex justify-between">
          <span className="font-bold">Total</span>
          <span className="font-bold">${totalCartAmout}</span>
        </div>
      </div>
      <Button
        onClick={() => {
          setOpenCartSheet(false);
          navigate("/shop/checkout");
        }}
        className="w-full mt-5 bg-black"
      >
        Checkout
      </Button>
    </SheetContent>
  );
};

export default UserCartWrapper;
