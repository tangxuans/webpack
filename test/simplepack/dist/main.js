(function (modules) {
        console.log("modules",modules);

            function require(filename) {
                console.log("filename",filename);
                var fn = modules[filename]
                console.log("fn",fn,typeof fn)
                var module = {exports:{}}
                fn(require,module,module.exports)
                // console.log("11111module.exports",module.exports)
                return module.exports
            }
            require("D:\Awumao\my-project1\builder-webpack\test\simplepack\src\index.js")
        })({'D:\Awumao\my-project1\builder-webpack\test\simplepack\src\index.js':function(require,module,exports){"use strict";

var _greeting = require("./greeting.js");

var _greeting2 = _interopRequireDefault(_greeting);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

console.log(_greeting2.default);
document.write((0, _greeting2.default)(1));},'./greeting.js':function(require,module,exports){"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
// import head from './head.js'
var Add = function Add(num) {
  return num + 1; // head(num)
};
exports.default = Add;},})