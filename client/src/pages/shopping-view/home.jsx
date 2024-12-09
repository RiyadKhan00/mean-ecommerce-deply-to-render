import React, { useEffect, useState } from "react";

import banner1 from "../../assets/banner-1.webp";
import banner2 from "../../assets/banner-2.webp";
import banner3 from "../../assets/banner-3.webp";
import {
  Accessibility,
  Antenna,
  BabyIcon,
  BedDouble,
  ChevronLeftIcon,
  ChevronRightIcon,
  CloudLightning,
  Cog,
  Shirt,
  ShirtIcon,
  UmbrellaIcon,
  WashingMachine,
  WatchIcon,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchAllFilterdProducts,
  fetchProductDetails,
} from "@/store/shop/products-slice";
import ShoppingProductTile from "@/components/shopping-view/product-tile";
import { useNavigate } from "react-router-dom";
import { addToCart, fetchCartItems } from "@/store/shop/cart-slice";
import { toast } from "@/hooks/use-toast";
import ProductDetailsDialog from "@/components/shopping-view/product-details";
import { getFeatureImages } from "@/store/common-slice";

const categoriesWidthIcon = [
  { id: "men", label: "Men", icon: ShirtIcon },
  { id: "women", label: "Women", icon: CloudLightning },
  { id: "kids", label: "Kids", icon: BabyIcon },
  { id: "accesories", label: "Accesories", icon: WatchIcon },
  { id: "footwear", label: "Footwear", icon: UmbrellaIcon },
];

const brandWithIcon = [
  { id: "nike", label: "Nike", icon: Shirt },
  { id: "adidas", label: "Adidas", icon: WashingMachine },
  { id: "puma", label: "Puma", icon: BedDouble },
  { id: "levis", label: "Levi's", icon: Cog },
  { id: "zara", label: "Zara", icon: Accessibility },
  { id: "h&m", label: "H&M", icon: Antenna },
];

const ShoppingHome = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const { productlist, productDetails } = useSelector(
    (state) => state.shopProducts
  );
  const { user } = useSelector((state) => state.auth);
  const [openDetailsDialog, setOpenDetailsDialog] = useState(false);
  const { featureImageList } = useSelector((state) => state.commonFeature);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleNavigateTolistingPpage = (getCurrentItem, section) => {
    sessionStorage.removeItem("filters");

    const currentFilter = {
      [section]: [getCurrentItem.id],
    };

    sessionStorage.setItem("filters", JSON.stringify(currentFilter));
    navigate("/shop/listing");
  };

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prevSlide) => (prevSlide + 1) % featureImageList.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [featureImageList]);

  useEffect(() => {
    dispatch(
      fetchAllFilterdProducts({
        filterParams: {},
        sortParams: "price-lowtohight",
      })
    );
  }, [dispatch]);

  useEffect(() => {
    if (productDetails !== null) setOpenDetailsDialog(true);
  }, [productDetails]);

  const handleGetProductDetails = (getCurrentProductId) => {
    dispatch(fetchProductDetails(getCurrentProductId));
  };

  const handleAddToCart = (getCurrentProductId) => {
    dispatch(
      addToCart({
        userId: user.id,
        productId: getCurrentProductId,
        quantity: 1,
      })
    ).then((data) => {
      if (data.payload.success) {
        dispatch(fetchCartItems(user.id));
        toast({
          title: "Product is added to cart",
        });
      }
    });
  };

  useEffect(() => {
    dispatch(getFeatureImages());
  }, [dispatch]);

  return (
    <div className="flex flex-col min-h-screen">
      <div className="relative w-full h-[600px] overflow-hidden">
        {featureImageList && featureImageList.length > 0
          ? featureImageList.map((slide, index) => (
              <img
                src={slide.image}
                alt={index}
                key={index}
                className={`${
                  index === currentSlide ? "opacity-100" : "opacity-0"
                } absolute top-0 left-0 w-full h-full object-cover  transition-opacity duration-1000`}
              />
            ))
          : null}

        <Button
          variant="outline"
          size="icon"
          onClick={() =>
            setCurrentSlide(
              (prevSlide) =>
                (prevSlide - 1 + featureImageList.length) %
                featureImageList.length
            )
          }
          className="absolute top-1/2 left-4 transform -transform-y-1/2 bg-white/80"
        >
          <ChevronLeftIcon className="w-4 h-4" />
        </Button>

        <Button
          variant="outline"
          size="icon"
          onClick={() =>
            setCurrentSlide(
              (prevSlide) => (prevSlide + 1) % featureImageList.length
            )
          }
          className="absolute top-1/2 right-4 transform -transform-y-1/2 bg-white/80"
        >
          <ChevronRightIcon className="w-4 h-4" />
        </Button>
      </div>

      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-8">
            Shop by category
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {categoriesWidthIcon.map((categoryItem, i) => (
              <Card
                key={i}
                onClick={() =>
                  handleNavigateTolistingPpage(categoryItem, "category")
                }
                className="cursor-pointer hover:shadow-lg transition-shadow "
              >
                <CardContent className="flex flex-col items-center justify-center p-6">
                  <categoryItem.icon className="w-12 h-12 mb-4 text-black" />
                  <span className="font-bold">{categoryItem.label}</span>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-8">Shop by Brand</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {brandWithIcon.map((brandItem, i) => (
              <Card
                key={i}
                onClick={() => handleNavigateTolistingPpage(brandItem, "brand")}
                className="cursor-pointer hover:shadow-lg transition-shadow "
              >
                <CardContent className="flex flex-col items-center justify-center p-6">
                  <brandItem.icon className="w-12 h-12 mb-4 text-black" />
                  <span className="font-bold">{brandItem.label}</span>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="py-12">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-8">
            Feature Products
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {productlist && productlist.length > 0
              ? productlist.map((productItem, i) => (
                  <ShoppingProductTile
                    handleGetProductDetails={handleGetProductDetails}
                    product={productItem}
                    key={i}
                    handleAddToCart={handleAddToCart}
                  />
                ))
              : null}
          </div>
        </div>
      </section>
      {productDetails && (
        <ProductDetailsDialog
          open={openDetailsDialog}
          setOpen={setOpenDetailsDialog}
          productDetails={productDetails}
        />
      )}
    </div>
  );
};

export default ShoppingHome;
