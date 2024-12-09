import React from "react";
import { DialogContent } from "../ui/dialog";
import { Label } from "../ui/label";
import { Separator } from "../ui/separator";
import { useFormik } from "formik";
import { Button } from "../ui/button";

const AdminOrderDetailsView = () => {
  const { handleChange, handleSubmit, values } = useFormik({
    initialValues: {
      state: "",
    },
    enableReinitialize: true,

    onSubmit: (value, action) => {},
  });

  return (
    <DialogContent className="sm:max-w-[600px]">
      <div className="grid gap-6">
        <div className="grid gap-2">
          <div className="flex mt-6 items-center justify-between">
            <p className="font-medium">Order ID</p>
            <Label>123456</Label>
          </div>

          <div className="flex mt-2 items-center justify-between">
            <p className="font-medium">Order Date</p>
            <Label>Order Date</Label>
          </div>

          <div className="flex mt-2 items-center justify-between">
            <p className="font-medium">Order Price</p>
            <Label>$500</Label>
          </div>

          <div className="flex mt-2 items-center justify-between">
            <p className="font-medium">Order Status</p>
            <Label>In Process</Label>
          </div>
        </div>
        <Separator />
        <div className="grid gap-4">
          <div className="grid gap-2">
            <div className="font-medium">Order Details</div>
            <ul className="grid gap-3">
              <li className="flex items-center justify-between">
                <span>Product One</span>
                <span>$100</span>
              </li>
            </ul>
          </div>
        </div>
        <div className="grid gap-4">
          <div className="grid gap-2">
            <div className="font-medium">Shipping Info</div>
            <div className="grid gap-0.5 text-muted">
              <span>John Doe</span>
              <span>Address</span>
              <span>City</span>
              <span>Pincode</span>
              <span>Phone</span>
              <span>Notes</span>
            </div>
          </div>
        </div>

        <div>
          <form onSubmit={handleSubmit}>
            <Label htmlFor="catagory" className="my-2.5">
              Order Status
            </Label>
            <select
              name="state"
              onChange={handleChange}
              className="product-select"
              value={values.state}
            >
              <option value="">--Please chose an option--</option>
              <option value="pending">Pending</option>
              <option value="inProcess">In Process</option>
              <option value="inShipping">In Shipping</option>
              <option value="delivered">Delivered</option>
              <option value="rejected">Rejected</option>
            </select>

            <Button className="bg-black mt-2 w-full">
              Update Order Status
            </Button>
          </form>
        </div>
      </div>
    </DialogContent>
  );
};

export default AdminOrderDetailsView;
