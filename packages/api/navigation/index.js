

  /**
   * Reads navigation structure from an anonymous endpoint
   * @param {*} url  can contain  a SAS token but is access
   */
  function load(url) {
    return new Promise((resolve, reject) => {
      if (!url) return reject("Missing url");
      fetch(url)
        .then(data => {
          return data.json();
        })
        .then(json => {
         
          return resolve({ result: json });
        })
        .catch(error => {
          console.log("error", error);
          return resolve({ error });
        });
    });
  }

module.exports = {
  load
}