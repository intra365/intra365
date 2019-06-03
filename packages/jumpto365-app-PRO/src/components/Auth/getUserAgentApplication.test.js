require('jest-localstorage-mock');
var Auth = require(".")
var config = require("./config")
it('Find production MSAL', () => {
    
    
    var clientApplication1 = Auth.getUserAgentApplcation("https://22")
    expect(clientApplication1.clientId).toBe(config.clientID)
  });
  
  it('Find preview  MSAL', () => {
    
    
    var clientApplication2 = Auth.getUserAgentApplcation("https://preview.app.jumpto365.com")
    expect(clientApplication2.clientId).toBe(config.environments[0].clientID)
  });

