"use client";

import FormField from "@/components/form-field";
import PillSelectRadio from "@/components/pill-select-radio";
import { useState } from "react";

class ProductForm {
  productName: string;
  sku: string;
  price: string;
  fit: FitStyles;

  constructor() {
    this.productName = "";
    this.sku = "";
    this.price = "";
    this.fit = FitStyles.NotSelected;
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
  NotSelected = "xx",
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
    setFormData((prev) => ({
      ...prev, // copy all previous elements
      [e.target.name]: e.target.value, // overwrite the updated inputs by using e (e is the event object that contains changes to the input field)
    }));
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

    if (formData.fit === FitStyles.NotSelected) {
      errors.fit = "Please select a product fit";
    }

    return errors;
  };

  return (
    <div>
      <div className="factoExtraBold-title text-left mb-1.5">ADD PRODUCT</div>
      <div className="w-full flex rounded-md">
        <form
          className="flex flex-col gap-3.75 max-w-sm mx-auto border border-outline-gray-light-4 p-4 rounded-lg"
          onSubmit={handleSubmit}
        >
          <FormField
            inputLabel="Name"
            type="text"
            identifier="productName"
            placeholder="Enter product name"
            value={formData.productName}
            handleChange={handleChange}
            error={errors.productName}
          />
          <div className="flex flex-row gap-3.75">
            <FormField
              inputLabel="SKU"
              type="number"
              identifier="sku"
              placeholder="Enter product SKU"
              value={formData.sku}
              handleChange={handleChange}
              error={errors.sku}
            />
            <div className="w-25">
              <FormField
                inputLabel="Price"
                type="number"
                identifier="price"
                placeholder="0.00"
                value={formData.price}
                handleChange={handleChange}
                error={errors.price}
              />
            </div>
          </div>
          <label className="font-bold">Fit</label>
          <div className="flex flex-row gap-4">
            <PillSelectRadio
              name="XS"
              formGroupIdentifier="fit"
              selectionState={formData.fit}
              handleSelectionChange={handleSizeChange}
              textOffset={-3}
            />
            <PillSelectRadio
              name="S"
              formGroupIdentifier="fit"
              selectionState={formData.fit}
              handleSelectionChange={handleSizeChange}
            />
            <PillSelectRadio
              name="M"
              formGroupIdentifier="fit"
              selectionState={formData.fit}
              handleSelectionChange={handleSizeChange}
            />
            <PillSelectRadio
              name="L"
              formGroupIdentifier="fit"
              selectionState={formData.fit}
              handleSelectionChange={handleSizeChange}
            />
            <PillSelectRadio
              name="XL"
              formGroupIdentifier="fit"
              selectionState={formData.fit}
              handleSelectionChange={handleSizeChange}
            />
          </div>
          {errors.fit !== "" && (
            <div className="pt-1 text-red-700 text-[0.7rem]">{errors.fit}</div>
          )}
          <button
            type="submit"
            className="factoExtraBold text-[1.25rem] text-white p-1.75 border-2 border-[outline-gray] bg-black rounded-sm cursor-pointer"
          >
            ADD TO INVENTORY
          </button>
        </form>
      </div>
    </div>
  );
}
