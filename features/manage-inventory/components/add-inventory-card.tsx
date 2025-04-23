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

enum FitStyles {
  XSmall = "xs",
  Small = "s",
  Medium = "m",
  Large = "l",
  XLarge = "xl",
}

export default function AddInventoryCard() {
  const fields = new ProductForm();
  const [formData, setFormData] = useState(fields);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({
      ...prev, // copy all previous elements
      [e.target.name]: e.target.value, // overwrite the updated inputs by using e (e is the event object that contains changes to the input field)
    }));
  };

  return (
    <div>
      <div className="factoExtraBold-title text-left">ADD PRODUCT</div>
      <div className="w-full flex rounded-md border-black">
        <form className="grid grid-cols-2 gap-6">
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
          </div>
        </form>
      </div>
    </div>
  );
}
