export interface SaleInfo {
  country: string;
  saleability: string;
  isEbook: boolean;
}
export interface Pdf {
  isAvailable: boolean;
  acsTokenLink?: string;
};

export interface AccessInfo {
  country: string;
  viewability: string;
  embeddable: boolean;
  publicDomain: boolean;
  textToSpeechPermission: string;
  epub: {
    isAvailable: boolean;
  };
  pdf: Pdf
  webReaderLink: string;
  accessViewStatus: string;
  quoteSharingAllowed: boolean;
};