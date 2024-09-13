const request = require("request");

class HTTPService {
  /**
   * execute Http request
   */
  static async executeHTTPRequest(method, hostname, path, data, headers) {
    return await new Promise(function (fulfill, reject) {
      request(
        {
          url: hostname + path,
          method: method,
          headers: headers,
          json: data,
        },
        function (error, response, body) {
          if (error) {
            console.log("err" + error);
            reject(error);
          } else {
            fulfill(body);
          }
        }
      );
    });
  }
}

module.exports = HTTPService;
