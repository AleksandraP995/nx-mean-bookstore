import { BookItem } from "../bookItem/bookItem";

export interface ShoppingDialogData {
  shoppingList: BookItem[];
  totalPriceSummary: number;
  discountCode: string;
}
