
import { BookItem } from "@org-bookstore/app-configuration";

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
