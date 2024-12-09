import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import React, { Fragment, useEffect, useState } from "react";

import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useFormik } from "formik";
import ProductImageUpload from "@/components/admin-view/image-upload";
import { useDispatch, useSelector } from "react-redux";
import {
  addNewProduct,
  deleteProduct,
  editProduct,
  fetchAllProducts,
} from "@/store/admin/product-slice";
import { useToast } from "@/hooks/use-toast";
import AdminProductTile from "../../components/admin-view/product-tile";

const AdminProducts = () => {
  const [openCreateProductDialog, setOpenCreateProductDialog] = useState(false);
  const [imageFile, setImageFile] = useState(null);
  const [formData, setFormData] = useState("");
  const [uploadedImageUrl, setUploadedImageUrl] = useState("");
  const [imageLoadingState, setImageLoadingState] = useState(false);
  const [currentEditId, setCurrentEtidId] = useState(null);
  const [initialValues, setInitialValues] = useState({
    title: "",
    description: "",
    category: "",
    brand: "",
    price: "",
    salePrice: "",
    totalStock: "",
  });

  const { productList } = useSelector((state) => state.adminProduct);
  const { toast } = useToast();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchAllProducts());
  }, [dispatch]);

  useEffect(() => {
    setInitialValues({
      ...initialValues,
      title: formData !== "" ? formData.title : "",
      description: formData !== "" ? formData.description : "",
      category: formData !== "" ? formData.category : "",
      brand: formData !== "" ? formData.brand : "",
      price: formData !== "" ? formData.price : "",
      salePrice: formData !== "" ? formData.salePrice : "",
      totalStock: formData !== "" ? formData.totalStock : "",
    });
  }, [formData]);

  const { handleChange, handleSubmit, values } = useFormik({
    initialValues: initialValues,
    enableReinitialize: true,

    onSubmit: (value, action) => {
      let values = Object.assign(value, { image: uploadedImageUrl || null });
      currentEditId !== null
        ? dispatch(editProduct({ id: currentEditId, values })).then((data) => {
            if (data.payload.success) {
              dispatch(fetchAllProducts());
              setOpenCreateProductDialog(false);
              setCurrentEtidId(null);
              action.resetForm();
            }
          })
        : dispatch(addNewProduct(values)).then((data) => {
            if (data.payload.success) {
              dispatch(fetchAllProducts());
              setOpenCreateProductDialog(false);
              setImageFile(null);
              action.resetForm();
              toast({
                title: "Product added successfull",
              });
            }
          });
    },
  });

  const formValid = () => {
    return Object.keys(formData)
      .map((key) => formData[key] !== "")
      .every((item) => item);
  };

  const handelDelete = (productDletedId) => {
    dispatch(deleteProduct(productDletedId)).then((data) => {
      if (data.payload.success) {
        dispatch(fetchAllProducts());
      }
    });
  };

  return (
    <Fragment>
      <div className="mb-5 w-full flex justify-end">
        <Button
          onClick={() => setOpenCreateProductDialog(true)}
          className="bg-black"
        >
          Add New Product
        </Button>
      </div>
      <div className="grid gap-4 md:grid-cols-3 lg:grid-cols-4">
        {productList && productList.length > 0
          ? productList.map((productItem) => (
              <AdminProductTile
                setOpenCreateProductDialog={setOpenCreateProductDialog}
                setCurrentEtidId={setCurrentEtidId}
                setFormData={setFormData}
                product={productItem}
                key={productItem._id}
                handelDelete={handelDelete}
              />
            ))
          : null}
      </div>

      <Sheet
        open={openCreateProductDialog}
        onOpenChange={() => {
          setOpenCreateProductDialog(false);
          setCurrentEtidId(null);
          setFormData("");
        }}
      >
        <SheetContent side="right" className="overflow-auto">
          <SheetHeader>
            <SheetTitle>
              {currentEditId !== null ? "Edit Product" : "Add New Product"}
            </SheetTitle>
          </SheetHeader>
          <ProductImageUpload
            imageFile={imageFile}
            setImageFile={setImageFile}
            uploadedImageUrl={uploadedImageUrl}
            setUploadedImageUrl={setUploadedImageUrl}
            setImageLoadingState={setImageLoadingState}
            imageLoadingState={imageLoadingState}
            isEditMode={currentEditId !== null}
          />
          <div className="py-6">
            <form onSubmit={handleSubmit}>
              <div>
                <Label htmlFor="title" className="my-2.5">
                  Title
                </Label>
                <Input
                  placeholder="Enter product title"
                  name="title"
                  onChange={handleChange}
                  value={values.title}
                />
              </div>
              <div>
                <Label htmlFor="description" className="my-2.5">
                  Description
                </Label>
                <Textarea
                  placeholder="Enter product descripttion"
                  name="description"
                  onChange={handleChange}
                  value={values.description}
                />
              </div>

              <div>
                <Label htmlFor="catagory" className="my-2.5">
                  Category
                </Label>
                <select
                  name="category"
                  onChange={handleChange}
                  className="product-select"
                  value={values.category}
                >
                  <option value="">--Please chose an option--</option>
                  <option value="men">Men</option>
                  <option value="women">Women</option>
                  <option value="kids">Kids</option>
                  <option value="accessories">Accessories</option>
                  <option value="footwear">Footwear</option>
                </select>
              </div>

              <div>
                <Label htmlFor="brand" className="my-2.5">
                  Brand
                </Label>

                <select
                  name="brand"
                  onChange={handleChange}
                  className="product-select"
                  value={values.brand}
                >
                  <option value="">--Please chose an option--</option>
                  <option value="nike">Nike</option>
                  <option value="addids">Adidas</option>
                  <option value="puma">Puma</option>
                  <option value="levis">Levi's</option>
                  <option value="zara">Zara</option>
                  <option value="n&m">H&M</option>
                </select>
              </div>

              <div>
                <Label htmlFor="price" className="my-2.5">
                  Price
                </Label>
                <Input
                  placeholder="Enter product price"
                  name="price"
                  onChange={handleChange}
                  value={values.price}
                />
              </div>
              <div>
                <Label htmlFor="sele-price" className="my-2.5">
                  Sale
                </Label>
                <Input
                  placeholder="Enter sale price (optional)"
                  name="salePrice"
                  onChange={handleChange}
                  value={values.salePrice}
                />
              </div>
              <div>
                <Label htmlFor="total" className="my-2.5">
                  Total Stock
                </Label>
                <Input
                  placeholder="Enter total stock"
                  name="totalStock"
                  onChange={handleChange}
                  value={values.totalStock}
                />
              </div>
              <Button className="w-full bg-black mt-4" type="submit">
                {currentEditId !== null ? "Edit" : "Submit"}
              </Button>
            </form>
          </div>
        </SheetContent>
      </Sheet>
    </Fragment>
  );
};

export default AdminProducts;
