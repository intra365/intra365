var adalConfig = {
    tenant: 'common',
    clientId: 'd6a110f7-a04b-4142-bdc8-2a8ae5c8cc97',
    extraQueryParameter: 'nux=1',
    disableRenewal: true,
    endpoints: {
      'https://graph.microsoft.com': 'https://graph.microsoft.com'
    }
    // cacheLocation: 'localStorage', // enable this for IE, as sessionStorage does not work for localhost. 
  };
  
  module.exports = adalConfig;