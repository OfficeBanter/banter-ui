// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  appUrl: 'https://banter.ngrok.io',
  apiUrl: 'https://banterapi.ngrok.io',
  supportUrl: 'https://banter.so/support',
  slackBotScopes: [
    'channels:history',
    'channels:join',
    'channels:manage',
    'channels:read',
    'chat:write',
    'groups:read',
    'im:history',
    'im:write',
    'users:read',
    'users:read.email',
  ],
  slackUserScopes: ['identity.basic'],
  slackClientId: '2992182071106.2994532468276',
  slackAuthorizeUrl: 'https://slack.com/oauth/v2/authorize',
  slackAddRedirectUri: 'https://banter.ngrok.io/auth/add',
  slackSignInRedirectUri: 'https://banter.ngrok.io/auth/signin',
  stripeKey:
    'pk_test_51IRPreIm5FrTb5AJB6CVjpriFwTL0Cyvyf6DbNoqsQUPO5uCSrlsCQXEuiGoEXAh9xlT0S5fcm90ez9YowHpwCRS00FO8n1lmI',
  launchDarklyId: '62772302a7c64b149aa4153b',
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
