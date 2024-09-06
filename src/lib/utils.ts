import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const calculateDiscount = (actualPrice: number, offerPrice: number) => {
  const discountAmount: number = actualPrice - offerPrice;
  return ((discountAmount / actualPrice) * 100).toFixed(2);
};
