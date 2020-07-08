// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

import {Environment} from "../app/shared/environment";

export const environment: Environment = {
    production: true,
    webUrl: 'https://biblioveda-staging.firebaseapp.com',
    apiUrl: 'https://biblioveda-staging.firebaseapp.com/api',
    loginUrl: 'https://biblioveda-staging.firebaseapp.com/api/authenticate',
    userInfoUrl: 'https://biblioveda-staging.firebaseapp.com/userinfo',
    snackBarTimeout: 6000,
    stripePKTest: 'pk_test_OEHhwIrzS65W1Xb3E5gB8JQX00qcn9akEr',
    stripePK: 'pk_live_N8ZEvI83aoS2fLLQ3huUDsxQ00yONW9KdU',
    stripeSKTest: 'sk_test_1jnJLDckkMOglfaBbGcrPtsn00iGerniHP',
    stripeSK: '',
    clientIdTest: 'ca_GaIXY9PRK5n1lm0d6C3wiD4OH8M5rW2d',
    clientId: '',
    firebase: {
        // biblioveda-staging
        apiKey: "AIzaSyALFppVXB9X7b6EYhFxTlrQIP4tC7A5Il0",
        authDomain: "biblioveda-staging.firebaseapp.com",
        databaseURL: "https://biblioveda-staging.firebaseio.com",
        projectId: "biblioveda-staging",
        storageBucket: "biblioveda-staging.appspot.com",
        messagingSenderId: "957722304574",
        appId: "1:957722304574:web:64c47243e2366ea5cab16f",
        measurementId: "G-R5NBT1J8XJ"
    }
};