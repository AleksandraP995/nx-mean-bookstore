/* eslint-disable @typescript-eslint/no-duplicate-enum-values */


export enum BookQueryParams {
    maxResult = 36,
    startIndex = 0,
    defaultQueryValue = 'all'
}

export enum DialogUIDimensions {
    dialogWidth = '650px',
    newUserDialogWidth = '450px',
    newUserDialogHeight = '850px',
    shoppingCartDialogWidth = '850px',
    dialogHeight = '450px',
}

export const discountsList = new Map([
    ['bs2024', 5],
    ['vega2024', 10],
    ['laguna2022', 12],
    ['bukastore2111', 7]
  ]);