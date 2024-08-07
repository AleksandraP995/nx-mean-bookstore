import { BookItem } from "@org-bookstore/app-configuration";

export interface ShoppingDialogData {
  shoppingList: BookItem[];
  totalPriceSummary: number;
  discountCode: string;
}
