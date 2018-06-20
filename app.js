require("dotenv").config();
var cfenv = require("cfenv");
var appEnv = cfenv.getAppEnv();
var path = require("path");
var async = require("async");
var _ = require("lodash");

// Deployment specific variables
var dbName = process.env.DBNAME || "cal-knowledgebase-db";;
var cfURL = appEnv.getServiceURL(dbName);
process.env.ENV = appEnv.isLocal
  ? "DEV"
  : "PROD";
var mongoURL = process.env.Env === "PROD"
  ? cfURL
  : process.env.APOS_MONGODB_URI;
var minify = process.env.ENV === "PROD"
  ? true
  : false;
process.env.ORIGIN = !appEnv.isLocal // Initial Conditional
  ? appEnv.url
  : process.env.ORIGIN // Secondary Conditional
    ? process.env.ORIGIN
    : "http://localhost:3000";;

/*  ===== CORS  ===== */
/*  Uncomment if there's asset issues */
var cors = require("./cors.js");
cors.configCORS();

var apos = require('apostrophe')({
  shortName: 'cal-knowledgebase',
  title: 'Cal Knowledgebase',
  baseUrl: process.env.ORIGIN,
  modules: {
    'apostrophe-assets': {},
    'apostrophe-attachments': {
      uploadfs: {
        backend: 's3',
        secret: process.env.APOS_S3_SECRET,
        key: process.env.APOS_S3_KEY,
        bucket: process.env.APOS_S3_BUCKET,
        endpoint: process.env.APOS_S3_ENDPOINT,
        https: true,
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
          title: 'employee',
          permissions: ['admin']
        }
      }
    },

    'apostrophe-search': {},

    // If a template is not found somewhere else, serve it from the top-level
    // `views/` folder of the project

    'apostrophe-templates': {
      viewsFolderFallback: path.join(__dirname, 'views')
    },

    'apostrophe-users': {},

    // My Modules
    'columns-widgets': {},
    'prism-widgets': {},
    'article': {},
    'article-widgets': {},
    'article-pages': {},
    'article-collections': {},
    'article-collections-pages': {},
    'article-collections-widgets': {},
    'notice-widgets': {},
    'piece-contents-widgets': {},
    'theme-knowledgebase': {}
  }
});

console.log(
  "Environment:",
  process.env.ENV,
  "| Mongo URL:",
  mongoURL,
  "| Backend:",
  apos.options.modules["apostrophe-attachments"].uploadfs.backend,
  "| Base URL:",
  process.env.ORIGIN
);