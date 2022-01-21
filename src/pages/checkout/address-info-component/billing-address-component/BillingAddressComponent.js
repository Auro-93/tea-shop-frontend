import React, { useState } from "react";
import AddressFormComponent from "../address-form-component/AddressFormComponent";

const BillingAddressComponent = ({ address }) => {
  const [addressData, setAddressData] = address;
  const [billingAddressVal, setBillingAddressVal] = useState({
    streetAddress: "",
    postalCode: "",
    city: "",
    region: "",
    country: "",
    errorMessage: "",
  });

  const { streetAddress, postalCode, city, region, country, errorMessage } =
    billingAddressVal;

  const handleChange = (e) => {
    setAddressData({ ...addressData, errorMessage: "", stepComplete: false });
    if (e.target.type === "select-one") {
      setBillingAddressVal({
        ...billingAddressVal,
        [e.target.id]: e.target.value,
        errorMessage: "",
      });
    } else {
      setBillingAddressVal({
        ...billingAddressVal,
        [e.target.name]: e.target.value,
        errorMessage: "",
      });
    }
  };

  const onSubmit = (e) => {
    e.preventDefault();
    if (!streetAddress || !postalCode || !city || !region || !country) {
      setBillingAddressVal({
        ...billingAddressVal,
        errorMessage: "All fields are required",
      });
    } else {
      setBillingAddressVal({
        ...billingAddressVal,
        errorMessage: "",
      });

      setAddressData({
        ...addressData,
        isAddedBilling: true,
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

export default BillingAddressComponent;
