import axios from "axios";
import { createContext, useState } from "react";

const getProducts = async () => {
  const { data } = await axios.get(
    `${process.env.NEXT_PUBLIC_API_URL}/products`
  );
  return data;
};

const pay = async (pricingId: string) => {
  const { data } = await axios.post(
    `${process.env.NEXT_PUBLIC_API_URL}/subscription/pay`,
    { pricingId }
  );
  return data;
};

export default Object.freeze({
  getProducts,
  pay,
});
