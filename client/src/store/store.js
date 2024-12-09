import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./auth-slice";
import adminProductSlice from "./admin/product-slice";
import shopProductsSlice from "./shop/products-slice";
import shopCartSlice from "./shop/cart-slice";
import shopAddressSlice from "./shop/address-slice";
import shopSearchSlice from "./shop/search-slice";
import shopReviewSlice from "./shop/review-slice";
import commonFeatureSlice from "./common-slice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    adminProduct: adminProductSlice,
    shopProducts: shopProductsSlice,
    shopCart: shopCartSlice,
    shopAddress: shopAddressSlice,
    shopSearch: shopSearchSlice,
    shopReview: shopReviewSlice,
    commonFeature: commonFeatureSlice,
  },
});

export default store;
