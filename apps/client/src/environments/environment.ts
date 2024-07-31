export const environment = {
    production: false,
    name:'local',
    settings: {
      apiUrl: 'http://localhost:3000',
      logLevel: 'DEBUG',
      siteUrl: 'http://localhost:4200',
      // api_url: 'https://www.googleapis.com/books/v1',
      // googleBooksApiUrl: '/api/books/v1',
      googleBooksApiUrl :"/google-books-api/books/v1",
      googleBooksApiKey: 'AIzaSyCTjNavkH5W2Ik-Wp6_O65GDOBlDvYL8_8',
      firebaseWebApiKey: 'AIzaSyCTjNavkH5W2Ik-Wp6_O65GDOBlDvYL8_8',
      firebaseApiUrl: 'https://identitytoolkit.googleapis.com/v1',
      firebaseDBUrl: 'https://bookstore-app-419008-default-rtdb.europe-west1.firebasedatabase.app/',
      postgreUrl: 'postgres://admin:ADMIN@localhost:5432/mydb'
    },
    firebaseConfig: {
      apiKey: "AIzaSyCTjNavkH5W2Ik-Wp6_O65GDOBlDvYL8_8",
      authDomain: "bookstore-app-419008.firebaseapp.com",
      databaseURL: "https://bookstore-app-419008-default-rtdb.europe-west1.firebasedatabase.app",
      projectId: "bookstore-app-419008",
      storageBucket: "bookstore-app-419008.appspot.com",
      messagingSenderId: "235442773395",
      appId: "1:235442773395:web:58b0550fd8ec50d94bdc66",
      measurementId: "G-HCQL35Q0ER"
    }
  };