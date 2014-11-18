module.exports = {
  "appDir": "web",
  baseUrl: 'js/',
  "dir": "build",
  "mainConfigFile": "/web/js/common.js",
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
  "modules": [
    {
      "name": "common",
      "include": [
        "jquery",
        "underscore",
        "backbone"
      ]
    },
    {
      "name": "app/hello/main",
      "exclude": ["common"]
    }
  ]
}
