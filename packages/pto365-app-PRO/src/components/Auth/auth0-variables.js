var URL = require('url-parse');
const url = new URL(window.location)
export const AUTH_CONFIG = {
  domain: 'pto365.eu.auth0.com',
  clientId: 'qGF7qtmeUYdk2rsN42qIStih1z3u2ctn',
  callbackUrl:  url.protocol + '//' + url.host + '/#/callback'
}

