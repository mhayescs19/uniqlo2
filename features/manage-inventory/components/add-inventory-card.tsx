"use client";

import { useState } from "react";

class ProductForm {
  productName: string;
  sku: string;
  price: number;
  fit: FitStyles;

  constructor() {
    this.productName = "";
    this.sku = "";
    this.price = 0;
    this.fit = FitStyles.XSmall;
  }
}

class ProductFormErrors {
  productName: string;
  sku: string;
  price: string;
  fit: string;

  constructor() {
    this.productName = "";
    this.sku = "";
    this.price = "";
    this.fit = "";
  }

  isErrors() {
    return Object.values(this).some((error) => error !== ""); // check to see if there is at least one property that is not an empty string
  }
}

enum FitStyles {
  XSmall = "xs",
  Small = "s",
  Medium = "m",
  Large = "l",
  XLarge = "xl",
}

export default function AddInventoryCard() {
  const fields = new ProductForm();
  const fieldErrors = new ProductFormErrors();

  const [formData, setFormData] = useState(fields);
  const [errors, setErrors] = useState(fieldErrors);

  const [selectedSize, setSelectedSize] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({
      ...prev, // copy all previous elements
      [e.target.name]: e.target.value, // overwrite the updated inputs by using e (e is the event object that contains changes to the input field)
    }));
  };

  const handleSizeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedSize(e.target.value);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); // prevent immediate page refresh; allows custom logic

    const currErrors = validate();
    if (currErrors.isErrors()) {
      console.log("setting errors");
      console.log(currErrors);
      setErrors(currErrors);
      return;
    }
  };

  const validate = () => {
    const errors = new ProductFormErrors();

    if (
      !formData.productName.trim() ||
      formData.productName.trim().length < 2
    ) {
      console.log("invalid product name");
      errors.productName = "Name must be at least 2 characters";
    }

    return errors;
  };

  return (
    <div>
      <div className="factoExtraBold-title text-left">ADD PRODUCT</div>
      <div className="w-full flex rounded-md border-black">
        <form className="flex flex-col gap-3.75 pt-2" onSubmit={handleSubmit}>
          <div className="flex flex-col">
            <label className="pb-1.75 font-bold">Name</label>
            <input
              className="border-2 border-C6C6C6 p-3 font-medium text-sm text-605C5C rounded-[5px]"
              type="text"
              name="productName"
              placeholder="Enter product name"
              value={formData.productName}
              onChange={handleChange}
            ></input>
            {errors.productName !== "" && (
              <div className="pt-1 text-red-700 text-[0.7rem]">
                {errors.productName}
              </div>
            )}
          </div>
          <FormField
            inputLabel="Name"
            type="text"
            identifier="productName"
            placeholder="Enter product name"
            value={formData.productName}
            handleChange={handleChange}
            error={errors.productName}
          />
          <FormField
            inputLabel="SKU"
            type="number"
            identifier="sku"
            placeholder="Enter product SKU"
            value={formData.sku}
            handleChange={handleChange}
            error={errors.sku}
          />
          <label className="font-bold">Fit</label>
          <div className="flex flex-row gap-4">
            <label
              className={`relative w-12.75 flex justify-center items-center font-medium pill ${
                selectedSize === "XS" ? "selected" : ""
              }`}
            >
              <input
                type="radio"
                name="fit"
                value="XS"
                checked={selectedSize === "XS"}
                onChange={handleSizeChange}
                className="sr-only"
              />
              <span className="ml-[-3px]">XS</span>
            </label>
            <label
              className={`w-12.75 text-center font-medium pill ${
                selectedSize === "S" ? "selected" : ""
              }`}
            >
              <input
                type="radio"
                name="fit"
                value="S"
                checked={selectedSize === "S"}
                onChange={handleSizeChange}
              />
              S
            </label>
          </div>
          <div className="flex flex-col">
            <label className="pb-1.75 font-bold">SKU</label>
            <input
              className="border-2 border-C6C6C6 p-3 font-medium text-sm text-605C5C rounded-[5px]"
              type="text"
              name="productName"
              placeholder="Enter product name"
              value={formData.productName}
              onChange={handleChange}
            ></input>
            {errors.productName !== "" && (
              <div className="pt-1 text-red-700 text-[0.7rem]">
                {errors.productName}
              </div>
            )}
          </div>
          <button type="submit" className="cursor-pointer">
            Add to inventory
          </button>
        </form>
      </div>
    </div>
  );
}
