// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
import 'zone.js/dist/zone-error';
import {Environment} from "../app/shared/environment";

export const environment: Environment = {
  production: false,
  webUrl: 'http://localhost:4200',
  apiUrl: 'http://localhost:3000',
  loginUrl: 'http://localhost:3000/login',
  userInfoUrl: 'http://localhost:9146/userinfo',
  snackBarTimeout: 3000
};

