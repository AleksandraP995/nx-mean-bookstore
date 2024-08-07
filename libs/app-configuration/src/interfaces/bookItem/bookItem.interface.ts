
import { AccessInfo, SaleInfo } from "./accessInfo.interface";
import { VolumeInfo } from "./volumeInfo.interface";

export interface BookItem {
    kind: string;
    id: string;
    etag: string;
    selfLink: string;
    volumeInfo: VolumeInfo;
    saleInfo: SaleInfo;
    accessInfo: AccessInfo;
    searchInfo: {
      textSnippet: string;
    };
  }

  export const bookForDisplay: BookItem = {
    kind: '',
    id: '',
    etag: '',
    selfLink: '',
    volumeInfo: {
      title: '',
      subtitle: '',
      authors: [],
      publisher: '',
      publishedDate: '',
      description: '',
      industryIdentifiers: [],
      readingModes: {
        text: false,
        image: false
      },
      pageCount: 0,
      printType: '',
      categories: [],
      maturityRating: '',
      allowAnonLogging: false,
      contentVersion: '',
      panelizationSummary: {
        containsEpubBubbles: false,
        containsImageBubbles: false
      },
      imageLinks: {
        smallThumbnail: '',
        thumbnail: ''
      },
      language: '',
      previewLink: '',
      infoLink: '',
      canonicalVolumeLink: ''
    },
    saleInfo: {
      country: '',
      saleability: '',
      isEbook: false
    },
    accessInfo: {
      country: '',
      viewability: '',
      embeddable: false,
      publicDomain: false,
      textToSpeechPermission: '',
      epub: {
        isAvailable: false
      },
      pdf: {
        isAvailable: false,
        acsTokenLink: undefined
      },
      webReaderLink: '',
      accessViewStatus: '',
      quoteSharingAllowed: false
    },
    searchInfo: {
      textSnippet: ''
    }
}
