exports.configCORS = function() {
  /*
 * CORS CONFIG (Might not be necessary if you never set it?)...
 */
  var AWS = require("aws-sdk");
  var curOrigins = [];
  var pushedOrigins = [];
  var addedOrigins = [];
  var pushOrigins = false;

  var options = {
    bucket: process.env.APOS_S3_BUCKET,
    endpoint: process.env.APOS_S3_ENDPOINT
  };
  process.env.AWS_ACCESS_KEY_ID = process.env.APOS_S3_KEY;
  process.env.AWS_SECRET_ACCESS_KEY = process.env.APOS_S3_SECRET;
  var s3 = new AWS.S3(options);

  var getCorsConfig = { Bucket: process.env.APOS_S3_BUCKET };
  var putCorsConfig = {
    Bucket: process.env.APOS_S3_BUCKET,
    CORSConfiguration: {
      CORSRules: [
        {
          AllowedHeaders: ["Authorization"],
          AllowedMethods: ["GET"],
          AllowedOrigins: ["*"],
          MaxAgeSeconds: 3000
        },
        {
          AllowedHeaders: ["*"],
          AllowedMethods: ["PUT", "POST", "DELETE"],
          AllowedOrigins: curOrigins,
          ExposeHeaders: ["x-amz-server-side-encryption"],
          MaxAgeSeconds: 3000
        }
      ]
    },
    ContentMD5: ""
  };

  // Get S3 config
  s3.getBucketCors(getCorsConfig, function(err, data) {
    if (err) {
      console.log("Get Config Error", err);
    } else {
      /* Get existing origins */
      if (data.CORSRules) {
        for (var ruleset in data.CORSRules) {
          var iOrigins = data.CORSRules[ruleset].AllowedOrigins;
          for (var origin in iOrigins) {
            var jOrigin = iOrigins[origin];
            if (curOrigins.indexOf(jOrigin) < 0 && jOrigin != "*") {
              curOrigins.push(jOrigin.toString());
            }
          }
        }
      }
      var newOrigins = [process.env.ORIGIN];
      for (var origin in newOrigins) {
        var kOrigin = newOrigins[origin];
        if (curOrigins.indexOf(kOrigin) < 0) {
          curOrigins.push(kOrigin.toString());
          addedOrigins.push(kOrigin.toString());
          pushOrigins = true;
        }
      }
      // Set new S3 CORS config
      if (pushOrigins) {
        s3.putBucketCors(putCorsConfig, function(err, data) {
          if (err) {
            console.log("Put Config Error", putCorsConfig, err);
          } else {
            // update the displayed CORS config for the selected bucket
            // console.log("Success", data);
            console.log("Added the following origins to the bucket CORS config:\n", addedOrigins.toString());
          }
        });
      } else {
        console.log("No CORS origins added, Existing origins are:");
        console.log(curOrigins);
      }
    }
  });
};
