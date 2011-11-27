/*
Copyright 2011 Joe Gibbs Politz. All Rights Reserved.

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
*/
var defaults = (function() {
  var required={};
  function D(defaults, f) {
    var g = function(options) {
      if (typeof options === 'undefined' || options === null) { options = {}; }
      if (typeof options !== 'object') {
        throw new TypeError("Bad invocation options: " + String(options));
      }
      var args = defaults.map(function(keyval) {
        var key = Object.keys(keyval)[0];
        if (options.hasOwnProperty(key)) {
          return options[key];
        }
        else {
          if (keyval[key] === required) {
            throw new TypeError("Missing required keyword argument " + key);
          }
          else {
            return keyval[key];
          }
        }
      });
      return f.apply(this, args);
    };
    g.direct = f;
    return g;
  }

  function getArgNames(f) {
    var fstr = f.toString();
    var open = fstr.indexOf('(');
    var close = fstr.indexOf(')');
    var argnames = fstr.slice(open + 1, close).split(',').
      map(function(s) { return s.trim(); });
    return argnames;
  }

  function D2(defaults, f) {
    var i = 0;
    var defaultDict = getArgNames(f).map(function(argname) {
      var o = {};
      o[argname] = defaults[i];
      i += 1;
      return o;
    });
    return D(defaultDict, f);
  }
  
  return {
    D: D,
    D2: D2,
    __: required
  };
})();

var __ = defaults.__;
var D = defaults.D;
var D2 = defaults.D2;

