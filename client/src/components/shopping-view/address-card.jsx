import React from "react";
import { Card, CardContent, CardFooter } from "../ui/card";
import { Label } from "../ui/label";
import { Button } from "../ui/button";

const AddressCard = ({
  addressInfo,
  handleDeleteAddress,
  handleEditAddress,
}) => {
  return (
    <Card className="cursor-pointer">
      <CardContent className={` grid p-4 gap`}>
        <Label>Address: {addressInfo.address}</Label>
        <Label>City: {addressInfo.city}</Label>
        <Label>Pincode: {addressInfo.pincode}</Label>
        <Label>Phone: {addressInfo.phone}</Label>
        <Label>Notes: {addressInfo.notes}</Label>
      </CardContent>
      <CardFooter className="p-3 flex justify-between">
        <Button
          onClick={() => handleEditAddress(addressInfo)}
          className="bg-black"
        >
          Edit
        </Button>
        <Button
          onClick={() => handleDeleteAddress(addressInfo)}
          className="bg-black"
        >
          Delete
        </Button>
      </CardFooter>
    </Card>
  );
};

export default AddressCard;
