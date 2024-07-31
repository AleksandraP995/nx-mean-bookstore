import { BookItem } from "../bookItem/bookItem";

export interface ShoppingState {
    shoppingList: BookItem[]
    discountCode: string;
    isBought: boolean;
    totalPrice: TotalPricePerBook;
    totalPriceSummary: number;
  }

export interface TotalPricePerBook {
    bookId: string, 
    bookPrice: number 
}