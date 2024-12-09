import React from "react";
import { Button } from "../ui/button";
import { Minus, Plus, Trash } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { deleteCartItem, updateCartQuantity } from "@/store/shop/cart-slice";
import { useToast } from "@/hooks/use-toast";

const UserCartItemsContent = ({ cartItem }) => {
  const { user } = useSelector((state) => state.auth);
  const { cartItems } = useSelector((state) => state.shopCart);
  const { productlist } = useSelector((state) => state.shopProducts);
  const dispatch = useDispatch();
  const { toast } = useToast();

  const handelUpdateQuantity = (getCartItems, typeOfAction) => {
    if (typeOfAction == "plus") {
      let getCartItem = cartItems.items || [];

      if (getCartItem.length) {
        const indexOfCurrentCartItem = getCartItem.findIndex(
          (item) => item.productId === getCartItems.productId
        );

        const getCurrentProductIndex = productlist.findIndex(
          (product) => product._id === getCartItems.productId
        );

        const getTotalStock = productlist[getCurrentProductIndex].totalStock;

        if (indexOfCurrentCartItem > -1) {
          const getQuantity = getCartItem[indexOfCurrentCartItem].quantity;

          if (getQuantity + 1 > getTotalStock) {
            toast({
              title: `Only ${getQuantity} quantity can be added for this items`,
              variant: "destructive",
            });

            return;
          }
        }
      }
    }

    dispatch(
      updateCartQuantity({
        userId: user.id,
        productId: getCartItems.productId,
        quantity:
          typeOfAction === "plus"
            ? getCartItems.quantity + 1
            : getCartItems.quantity - 1,
      })
    ).then((data) => {
      if (data.payload.success) {
        toast({
          title: "Cart item is update successfully",
        });
      }
    });
  };

  const handleCartItemDelete = (getCartItems) => {
    dispatch(
      deleteCartItem({ userId: user.id, productId: getCartItems.productId })
    ).then((data) => {
      if (data.payload.success) {
        toast({
          title: "Cart item is deleted successfully",
        });
      }
    });
  };

  return (
    <div className="flex items-center space-x-4">
      <img
        src={cartItem.image}
        alt={cartItem.title}
        className="w-20 h-20 rounded object-cover"
      />

      <div className="flex-1">
        <h3 className="font-extrabold">{cartItem.title}</h3>
        <div className="flex gap-2 items-center mt-1">
          <Button
            variant="outline"
            size="icon"
            className="h-8 w-8 rounded-full"
            disabled={cartItem.quantity === 1}
            onClick={() => handelUpdateQuantity(cartItem, "minus")}
          >
            <Minus className="w-4 h-4" />
            <span className="sr-only">Decrease</span>
          </Button>
          <span className="font-semibold">{cartItem.quantity}</span>
          <Button
            variant="outline"
            size="icon"
            className="h-8 w-8 rounded-full"
            onClick={() => handelUpdateQuantity(cartItem, "plus")}
          >
            <Plus className="w-4 h-4" />
            <span className="sr-only">Decrease</span>
          </Button>
        </div>
      </div>

      <div className="flex flex-col items-end">
        <p className="font-semibold">
          $
          {(
            (cartItem.salePrice > 0 ? cartItem.salePrice : cartItem.price) *
            cartItem.quantity
          ).toFixed(2)}
        </p>

        <Trash
          onClick={() => handleCartItemDelete(cartItem)}
          className="cursor-pointer mt-1"
          size={20}
        />
      </div>
    </div>
  );
};

export default UserCartItemsContent;