// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  API_URL: "http://localhost:8081",

  // Your web app's Firebase configuration
  firebase: {
    apiKey: "AIzaSyA3XS8HByBCOzmPAC5wQyHBOerB-FQV6as",
    authDomain: "relaxwithgems.firebaseapp.com",
    databaseURL: "https://relaxwithgems.firebaseio.com",
    projectId: "relaxwithgems",
    storageBucket: "relaxwithgems.appspot.com",
    messagingSenderId: "987052125870",
    appId: "1:987052125870:web:155417ac029e7fae2fc73f",
    measurementId: "G-GKGM4MBHGR"
  }
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
