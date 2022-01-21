import React, { useState, useEffect } from "react";
import AddressFormComponent from "../address-form-component/AddressFormComponent";

const ShippingAddressComponent = ({ address }) => {
  const [addressData, setAddressData] = address;
  const [shippingAddressVal, setShippingAddressVal] = useState({
    streetAddress: "",
    postalCode: "",
    city: "",
    region: "",
    country: "",
    errorMessage: "",
  });

  useEffect(() => {
    console.log(shippingAddressVal);
  }, [shippingAddressVal]);

  const { streetAddress, postalCode, city, region, country, errorMessage } =
    shippingAddressVal;

  const handleChange = (e) => {
    setAddressData({ ...addressData, errorMessage: "", stepComplete: false });
    if (e.target.type === "select-one") {
      setShippingAddressVal({
        ...shippingAddressVal,
        [e.target.id]: e.target.value,
        errorMessage: "",
      });
    } else {
      setShippingAddressVal({
        ...shippingAddressVal,
        [e.target.name]: e.target.value,
        errorMessage: "",
      });
    }
  };

  const onSubmit = (e) => {
    e.preventDefault();
    if (!streetAddress || !postalCode || !city || !region || !country) {
      setShippingAddressVal({
        ...shippingAddressVal,
        errorMessage: "All fields are required",
      });
    } else {
      setShippingAddressVal({
        ...shippingAddressVal,
        errorMessage: "",
      });

      setAddressData({
        ...addressData,
        isAddedShipping: true,
        shippingAddress: {
          streetAddress,
          postalCode,
          city,
          region,
          country,
        },
        date: new Date(),
      });
      if (addressData.shippingEqualToBilling) {
        setAddressData({
          ...addressData,
          isAddedShipping: true,
          shippingAddress: {
            streetAddress,
            postalCode,
            city,
            region,
            country,
          },
          billingAddress: {
            streetAddress,
            postalCode,
            city,
            region,
            country,
          },
          date: new Date(),
        });
      }
    }
  };

  return (
    <AddressFormComponent
      handleChange={handleChange}
      streetAddress={streetAddress}
      postalCode={postalCode}
      city={city}
      region={region}
      country={country}
      onSubmit={onSubmit}
      errorMessage={errorMessage}
    />
  );
};

export default ShippingAddressComponent;
