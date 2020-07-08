// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

import {Environment} from "../app/shared/environment";

export const environment : Environment = {
  production: true,
  webUrl: "https://app.biblioveda.org",
  // webUrl: "https://csp.bv.co",
  apiUrl: "https://api.biblioveda.org/api",
  loginUrl: "https://api.biblioveda.org/api/authenticate",
  userInfoUrl: "https://api.biblioveda.org/userinfo",
  snackBarTimeout: 6000,
  stripePKTest: "pk_test_OEHhwIrzS65W1Xb3E5gB8JQX00qcn9akEr",
  stripePK: "pk_live_N8ZEvI83aoS2fLLQ3huUDsxQ00yONW9KdU",
  stripeSKTest: "sk_test_1jnJLDckkMOglfaBbGcrPtsn00iGerniHP",
  stripeSK: "",
  clientIdTest: "ca_GaIXY9PRK5n1lm0d6C3wiD4OH8M5rW2d",
  clientId: "",
  firebase: {
    // biblioveda-admin-production
    apiKey: "AIzaSyANDNk_KSQo5wkQqI8OSQ_84vQ23WRdZw4",
    authDomain: "app.biblioveda.org",
    databaseURL: "https://biblioveda-production.firebaseio.com",
    projectId: "biblioveda-production",
    storageBucket: "",
    messagingSenderId: "521893339273",
    appId: "1:521893339273:web:791764756824c439"
  }
};
