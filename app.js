require("dotenv").config();
var cfenv = require("cfenv");
var appEnv = cfenv.getAppEnv();
var path = require("path");

// Deployment specific variables
var cfURL = appEnv.getServiceURL("cal-knowledgebase-db");
var mongoURL = cfURL ? cfURL : "mongodb://localhost:27017/cal-knowledgebase";
var appURL = cfURL ? appEnv.url : "http://localhost:3000";
process.env.ENV = cfURL ? "PROD" : "DEV";

var apos = require('apostrophe')({
  shortName: 'cal-knowledgebase',
  title: 'Cal Knowledgebase',
  baseUrl: appURL,

  // See lib/modules for basic project-level configuration of our modules
  // responsible for serving static assets, managing page templates and
  // configuring user acounts.

  modules: {

    // Apostrophe module configuration

    // Note: most configuration occurs in the respective
    // modules' directories. See lib/apostrophe-assets/index.js for an example.
    
    // However any modules that are not present by default in Apostrophe must at
    // least have a minimal configuration here: `moduleName: {}`

    'apostrophe-assets': {
      // Will minify css and js on production server.
      minify: (process.env.ENV === 'PROD')
    },
    'apostrophe-attachments': {
      uploadfs: {
        backend: 's3',
        origins: ['localhost', "https://cal-knokwledgebase.w3bmix.ibm.com/"],
        secret: process.env.APOS_S3_SECRET,
        key: process.env.APOS_S3_KEY,
        bucket: process.env.APOS_S3_BUCKET,
        endpoint: process.env.APOS_S3_ENDPOINT,
        https: true,
        cors: true
      }
    },
    'apostrophe-db': {
      uri: mongoURL
    },
    'apostrophe-express': {
      session: {
        secret: 'CALK'
      }
    },
    'apostrophe-groups': {},

    'apostrophe-passport': {
      strategies: [
        {
          module: 'passport-google-oauth20',
          match: 'email',
          // emailDomain: 'google.com',
          options: {
            clientID: '333888495380-022go2r46ocvvb3teggvlemid6b2j2tg.apps.googleusercontent.com',
            clientSecret: 'bYYLbBx7dfWBGDuNwLTZjq77'
          },
          authenticate: {
            scope: ['profile', 'email']
          }
        }
      ],
      create: {
        group: {
          title: 'employee'
        }
      }
    },

    // If a template is not found somewhere else, serve it from the top-level
    // `views/` folder of the project

    'apostrophe-templates': {
      viewsFolderFallback: path.join(__dirname, 'views')
    },

    'apostrophe-users': {},

    // My Modules
    'columns-widgets': {},
    'wiki': {},
    'wiki-pages': {}
  }
});
