import { BookItem } from "./bookItem/bookItem";

export interface BooksVolume {
    kind: string,
    totalItems: number,
    items: BookItem[];
}