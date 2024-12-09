import axios from "axios";

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
  isLoading: false,
  productList: [],
};

export const addNewProduct = createAsyncThunk(
  "/products/addnewProduct",
  async (formData) => {
    const result = await axios.post("api/admin/products/add", formData, {
      headers: {
        " Content-Type": "application/json",
      },
    });

    return result.data;
  }
);

export const fetchAllProducts = createAsyncThunk(
  "/products/fetchAllProducts",
  async () => {
    const result = await axios.get("api/admin/products/get");

    return result.data;
  }
);

export const editProduct = createAsyncThunk(
  "/products/editProduct",
  async ({ id, values }) => {
    const result = await axios.put(`api/admin/products/edit/${id}`, values, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    return result.data;
  }
);

export const deleteProduct = createAsyncThunk(
  "/products/deleteProduct",
  async (id) => {
    const result = await axios.delete(`api/admin/products/delete/${id}`);

    return result.data;
  }
);

const adminProductsSlice = createSlice({
  name: "adminproduct",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllProducts.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchAllProducts.fulfilled, (state, action) => {
        (state.isLoading = false), (state.productList = action.payload.data);
      })
      .addCase(fetchAllProducts.rejected, (state, action) => {
        (state.isLoading = false), (state.productList = []);
      });
  },
});

export default adminProductsSlice.reducer;