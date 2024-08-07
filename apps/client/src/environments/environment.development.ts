export const environment = {
    production: false,
    settings: {
      apiUrl: 'http://localhost:3000',
      googleBooksApiUrl: "/google-books-api/books/v1",
      logLevel: 'DEBUG',
      siteUrl: 'http://localhost:4200',
      apiBooksUrl: '/api/books/v1',
    },
    firebaseConfig: {
      apiKey: process.env["FIREBASE_API_KEY"],
      authDomain: process.env["FIREBASE_AUTH_DOMAIN"],
      databaseURL: process.env["FIREBASE_DB_URL"],
      projectId: process.env["FIREBASE_PROJECT_ID"],
      storageBucket: process.env["FIREBASE_STORAGE_BUCKET"],
      messagingSenderId: process.env["FIREBASE_MESSAGING_SENDER_ID"],
      appId: process.env["FIREBASE_APP_ID"],
      measurementId: process.env["FIREBASE_MEASUREMENT_ID"]
    }
  };