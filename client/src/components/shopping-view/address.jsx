import React, { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { useFormik } from "formik";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Textarea } from "../ui/textarea";
import { useDispatch, useSelector } from "react-redux";
import {
  addNewAddress,
  delelteAddress,
  editAddress,
  fetchAllAddress,
} from "@/store/shop/address-slice";
import AddressCard from "./address-card";
import { toast } from "@/hooks/use-toast";

const Address = () => {
  const [currentEditeId, setCurrentEditedId] = useState(null);

  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { addressList } = useSelector((state) => state.shopAddress);

  const [initialValues, setInitialValues] = useState({
    address: "",
    city: "",
    phone: "",
    pincode: "",
    notes: "",
  });

  const { handleChange, handleSubmit, values } = useFormik({
    initialValues: initialValues,
    enableReinitialize: true,

    onSubmit: (value, action) => {
      if (addressList.length >= 3 && currentEditeId === null) {
        action.resetForm();
        toast({
          title: "You can add max 3 addresses",
          variant: "destructive",
        });
        return;
      }

      currentEditeId !== null
        ? dispatch(
            editAddress({
              userId: user.id,
              addressId: currentEditeId._id,
              formData: value,
            })
          ).then((data) => {
            if (data.payload.success) {
              dispatch(fetchAllAddress(user.id));
              action.resetForm();
              setCurrentEditedId(null);
              toast({
                title: "Address updated successfully",
              });
            }
          })
        : dispatch(
            addNewAddress({
              ...value,
              userId: user.id,
            })
          ).then((data) => {
            if (data.payload.success) {
              dispatch(fetchAllAddress(user.id));
              action.resetForm();
              toast({
                title: "Address Added successfully",
              });
            }
          });
    },
  });

  useEffect(() => {
    dispatch(fetchAllAddress(user.id));
  }, [dispatch]);

  useEffect(() => {
    setInitialValues({
      ...initialValues,
      address: currentEditeId ? currentEditeId.address : "",
      city: currentEditeId ? currentEditeId.city : "",
      phone: currentEditeId ? currentEditeId.phone : "",
      pincode: currentEditeId ? currentEditeId.pincode : "",
      notes: currentEditeId ? currentEditeId.notes : "",
    });
  }, [currentEditeId]);

  const isFormValid = (formData) => {
    return Object.keys(formData)
      .map((key) => formData[key] !== "")
      .every((item) => item);
  };

  const handleDeleteAddress = (getCurrentAddress) => {
    dispatch(
      delelteAddress({ userId: user.id, addressId: getCurrentAddress._id })
    ).then((data) => {
      if (data.payload.success) {
        dispatch(fetchAllAddress(user.id));
        toast({
          title: "Address deleted successfully",
        });
      }
    });
  };

  const handleEditAddress = async (getCurrentAddress) => {
    setCurrentEditedId(getCurrentAddress);
  };

  return (
    <Card>
      <div className="mb-5 p-3 grid grid-cols-1 sm:grid-cols-2  gap-2">
        {addressList && addressList.length > 0
          ? addressList.map((singleAddressItem, i) => (
              <AddressCard
                handleDeleteAddress={handleDeleteAddress}
                key={i}
                addressInfo={singleAddressItem}
                handleEditAddress={handleEditAddress}
              />
            ))
          : null}
      </div>

      <CardHeader>
        <CardTitle>
          {currentEditeId !== null ? "Edite Adress" : "Add New Address"}
        </CardTitle>
      </CardHeader>

      <CardContent className="space-y-3">
        <form onSubmit={handleSubmit}>
          <div>
            <Label htmlFor="address" className="my-2.5">
              Address
            </Label>
            <Input
              placeholder="Enter product title"
              name="address"
              onChange={handleChange}
              value={values.address}
            />
          </div>
          <div>
            <Label htmlFor="city" className="my-2.5">
              City
            </Label>
            <Input
              placeholder="Enter product city"
              name="city"
              onChange={handleChange}
              value={values.city}
            />
          </div>
          <div>
            <Label htmlFor="phone" className="my-2.5">
              Phone
            </Label>
            <Input
              placeholder="Enter sale price phone"
              name="phone"
              onChange={handleChange}
              value={values.phone}
            />
          </div>
          <div>
            <Label htmlFor="pincode" className="my-2.5">
              Pincode
            </Label>
            <Input
              placeholder="Enter pincode"
              name="pincode"
              onChange={handleChange}
              value={values.pincode}
            />
          </div>
          <div>
            <Label htmlFor="notes" className="my-2.5">
              Notes
            </Label>
            <Textarea
              placeholder="Enter notes"
              name="notes"
              onChange={handleChange}
              value={values.notes}
            />
          </div>

          <Button
            disabled={!isFormValid(values)}
            className="w-full bg-black mt-4"
            type="submit"
          >
            {currentEditeId !== null ? "Edit" : "Submit"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default Address;
