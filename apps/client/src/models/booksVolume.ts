import { BookItem } from "@org-bookstore/app-configuration";

export interface BooksVolume {
    kind: string,
    totalItems: number,
    items: BookItem[];
}