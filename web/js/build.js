({
  "appDir": "js/",
  baseUrl: './',
  //"dir": "build",
  "mainConfigFile": "common.js",
  //"optimize": "uglify2",
  "optimize": "none",
  //"optimizeCss": "standard",
  //"preserveLicenseComments": false,
  //"generateSourceMaps": false,
  "normalizeDirDefines": "all", //
  "skipDirOptimize": false, //speed up non-build bundle
  //"skipModuleInsertion": false,
  //"stubModules": ["text"],
  //"removeCombined": true,
  "optimizeAllPluginResources": true,
  paths: {
    "users": "backoffice/users/main"
    // Other paths to other modules
  },
  "modules": [
    {
      "name": "vendors",
      "include": [
        "jquery",
        "underscore",
        "backbone",
        "modernizr"
      ]
    },
    {
      "name": "users",
      "exclude": ["common"]
    }
  ]
});
