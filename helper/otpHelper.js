var https = require("follow-redirects").https;
var fs = require("fs");
export async function sendOTP(mobile, otpCode) {
  var options = {
    method: "POST",
    hostname: "rg6qzp.api.infobip.com",
    path: "/whatsapp/1/message/template",
    headers: {
      Authorization:
        "App bd8566f12c2b3dee52cf8bfc6a136cc4-ffbe2352-2b32-4479-b2ce-5a7de1ae9907",
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    maxRedirects: 20,
  };

  var req = https.request(options, function (res) {
    var chunks = [];

    res.on("data", function (chunk) {
      chunks.push(chunk);
    });

    res.on("end", function (chunk) {
      var body = Buffer.concat(chunks);
      console.log(body.toString());
    });

    res.on("error", function (error) {
      console.error(error);
    });
  });

  var postData = JSON.stringify({
    messages: [
      {
        from: "447860099299",
        to: "918057672688",
        messageId: "c6731a81-b9f1-420f-b9a8-bdd8b2950bb1",
        content: {
          templateName: "message_test",
          templateData: {
            body: {
              placeholders: ["Investment"],
            },
          },
          language: "en",
        },
      },
    ],
  });

  req.write(postData);

  req.end();
}
