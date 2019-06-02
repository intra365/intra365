/**
 * Configuration settings
 * @param url Host url
 */
export function readSharePointConfig(url)  {
    return new Promise((resolve, reject) => {
      var l1 = url.split("//");
      var l2 = l1[1].split(".");

      var domain = l2[0];
      function getChar(s, p) {
        if (!s) return "-";
        if (p > s.length) return "-";
        var c = s.substring(p, p + 1);

        return c;
      }

      var blobPath =
        getChar(domain, 0) +
        "/" +
        getChar(domain, 1) +
        "/" +
        getChar(domain, 2) +
        "/" +
        domain;

      fetch(
        `https://blob.jumpto365.com/config/sharepoint.com/${blobPath}/config.json`
      )
        .then(data => {
          return data.json();
        })
        .then(json => {
          return resolve({ ...json });
        })
        .catch(error => {
          console.log("error", error);
          return resolve({ error });
        });
    });
  }