//let _module = require("./test_module");
//let partModule = _module.partModule;
//let moduleName = _module.moduleName;

const { partModule, moduleName } = require("./module.test")

partModule.func()
console.log("moduleName:", moduleName)
