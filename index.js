/*! For license information please see index.js.LICENSE.txt */
(()=>{var t={460:function(t,e){var n,i;void 0===(i="function"==typeof(n=function t(){"use strict";var e="undefined"!=typeof self?self:"undefined"!=typeof window?window:void 0!==e?e:{},n=!e.document&&!!e.postMessage,i=n&&/blob:/i.test((e.location||{}).protocol),r={},s=0,a={parse:function(n,i){var o=(i=i||{}).dynamicTyping||!1;if(y(o)&&(i.dynamicTypingFunction=o,o={}),i.dynamicTyping=o,i.transform=!!y(i.transform)&&i.transform,i.worker&&a.WORKERS_SUPPORTED){var l=function(){if(!a.WORKERS_SUPPORTED)return!1;var n,i,o=(n=e.URL||e.webkitURL||null,i=t.toString(),a.BLOB_URL||(a.BLOB_URL=n.createObjectURL(new Blob(["(",i,")();"],{type:"text/javascript"})))),l=new e.Worker(o);return l.onmessage=g,l.id=s++,r[l.id]=l}();return l.userStep=i.step,l.userChunk=i.chunk,l.userComplete=i.complete,l.userError=i.error,i.step=y(i.step),i.chunk=y(i.chunk),i.complete=y(i.complete),i.error=y(i.error),delete i.worker,void l.postMessage({input:n,config:i,workerId:l.id})}var f=null;return a.NODE_STREAM_INPUT,"string"==typeof n?f=i.download?new d(i):new u(i):!0===n.readable&&y(n.read)&&y(n.on)?f=new c(i):(e.File&&n instanceof File||n instanceof Object)&&(f=new h(i)),f.stream(n)},unparse:function(t,e){var n=!1,i=!0,r=",",s="\r\n",o='"',l=o+o,d=!1,h=null,u=!1;!function(){if("object"==typeof e){if("string"!=typeof e.delimiter||a.BAD_DELIMITERS.filter((function(t){return-1!==e.delimiter.indexOf(t)})).length||(r=e.delimiter),("boolean"==typeof e.quotes||"function"==typeof e.quotes||Array.isArray(e.quotes))&&(n=e.quotes),"boolean"!=typeof e.skipEmptyLines&&"string"!=typeof e.skipEmptyLines||(d=e.skipEmptyLines),"string"==typeof e.newline&&(s=e.newline),"string"==typeof e.quoteChar&&(o=e.quoteChar),"boolean"==typeof e.header&&(i=e.header),Array.isArray(e.columns)){if(0===e.columns.length)throw new Error("Option columns is empty");h=e.columns}void 0!==e.escapeChar&&(l=e.escapeChar+o),"boolean"==typeof e.escapeFormulae&&(u=e.escapeFormulae)}}();var c=new RegExp(p(o),"g");if("string"==typeof t&&(t=JSON.parse(t)),Array.isArray(t)){if(!t.length||Array.isArray(t[0]))return m(null,t,d);if("object"==typeof t[0])return m(h||f(t[0]),t,d)}else if("object"==typeof t)return"string"==typeof t.data&&(t.data=JSON.parse(t.data)),Array.isArray(t.data)&&(t.fields||(t.fields=t.meta&&t.meta.fields),t.fields||(t.fields=Array.isArray(t.data[0])?t.fields:f(t.data[0])),Array.isArray(t.data[0])||"object"==typeof t.data[0]||(t.data=[t.data])),m(t.fields||[],t.data||[],d);throw new Error("Unable to serialize unrecognized input");function f(t){if("object"!=typeof t)return[];var e=[];for(var n in t)e.push(n);return e}function m(t,e,n){var a="";"string"==typeof t&&(t=JSON.parse(t)),"string"==typeof e&&(e=JSON.parse(e));var o=Array.isArray(t)&&0<t.length,l=!Array.isArray(e[0]);if(o&&i){for(var d=0;d<t.length;d++)0<d&&(a+=r),a+=g(t[d],d);0<e.length&&(a+=s)}for(var h=0;h<e.length;h++){var u=o?t.length:e[h].length,c=!1,f=o?0===Object.keys(e[h]).length:0===e[h].length;if(n&&!o&&(c="greedy"===n?""===e[h].join("").trim():1===e[h].length&&0===e[h][0].length),"greedy"===n&&o){for(var p=[],m=0;m<u;m++){var _=l?t[m]:m;p.push(e[h][_])}c=""===p.join("").trim()}if(!c){for(var b=0;b<u;b++){0<b&&!f&&(a+=r);var v=o&&l?t[b]:b;a+=g(e[h][v],b)}h<e.length-1&&(!n||0<u&&!f)&&(a+=s)}}return a}function g(t,e){if(null==t)return"";if(t.constructor===Date)return JSON.stringify(t).slice(1,25);!0===u&&"string"==typeof t&&null!==t.match(/^[=+\-@].*$/)&&(t="'"+t);var i=t.toString().replace(c,l);return"boolean"==typeof n&&n||"function"==typeof n&&n(t,e)||Array.isArray(n)&&n[e]||function(t,e){for(var n=0;n<e.length;n++)if(-1<t.indexOf(e[n]))return!0;return!1}(i,a.BAD_DELIMITERS)||-1<i.indexOf(r)||" "===i.charAt(0)||" "===i.charAt(i.length-1)?o+i+o:i}}};if(a.RECORD_SEP=String.fromCharCode(30),a.UNIT_SEP=String.fromCharCode(31),a.BYTE_ORDER_MARK="\ufeff",a.BAD_DELIMITERS=["\r","\n",'"',a.BYTE_ORDER_MARK],a.WORKERS_SUPPORTED=!n&&!!e.Worker,a.NODE_STREAM_INPUT=1,a.LocalChunkSize=10485760,a.RemoteChunkSize=5242880,a.DefaultDelimiter=",",a.Parser=m,a.ParserHandle=f,a.NetworkStreamer=d,a.FileStreamer=h,a.StringStreamer=u,a.ReadableStreamStreamer=c,e.jQuery){var o=e.jQuery;o.fn.parse=function(t){var n=t.config||{},i=[];return this.each((function(t){if("INPUT"!==o(this).prop("tagName").toUpperCase()||"file"!==o(this).attr("type").toLowerCase()||!e.FileReader||!this.files||0===this.files.length)return!0;for(var r=0;r<this.files.length;r++)i.push({file:this.files[r],inputElem:this,instanceConfig:o.extend({},n)})})),r(),this;function r(){if(0!==i.length){var e,n,r,l=i[0];if(y(t.before)){var d=t.before(l.file,l.inputElem);if("object"==typeof d){if("abort"===d.action)return"AbortError",e=l.file,n=l.inputElem,r=d.reason,void(y(t.error)&&t.error({name:"AbortError"},e,n,r));if("skip"===d.action)return void s();"object"==typeof d.config&&(l.instanceConfig=o.extend(l.instanceConfig,d.config))}else if("skip"===d)return void s()}var h=l.instanceConfig.complete;l.instanceConfig.complete=function(t){y(h)&&h(t,l.file,l.inputElem),s()},a.parse(l.file,l.instanceConfig)}else y(t.complete)&&t.complete()}function s(){i.splice(0,1),r()}}}function l(t){this._handle=null,this._finished=!1,this._completed=!1,this._halted=!1,this._input=null,this._baseIndex=0,this._partialLine="",this._rowCount=0,this._start=0,this._nextChunk=null,this.isFirstChunk=!0,this._completeResults={data:[],errors:[],meta:{}},function(t){var e=v(t);e.chunkSize=parseInt(e.chunkSize),t.step||t.chunk||(e.chunkSize=null),this._handle=new f(e),(this._handle.streamer=this)._config=e}.call(this,t),this.parseChunk=function(t,n){if(this.isFirstChunk&&y(this._config.beforeFirstChunk)){var r=this._config.beforeFirstChunk(t);void 0!==r&&(t=r)}this.isFirstChunk=!1,this._halted=!1;var s=this._partialLine+t;this._partialLine="";var o=this._handle.parse(s,this._baseIndex,!this._finished);if(!this._handle.paused()&&!this._handle.aborted()){var l=o.meta.cursor;this._finished||(this._partialLine=s.substring(l-this._baseIndex),this._baseIndex=l),o&&o.data&&(this._rowCount+=o.data.length);var d=this._finished||this._config.preview&&this._rowCount>=this._config.preview;if(i)e.postMessage({results:o,workerId:a.WORKER_ID,finished:d});else if(y(this._config.chunk)&&!n){if(this._config.chunk(o,this._handle),this._handle.paused()||this._handle.aborted())return void(this._halted=!0);o=void 0,this._completeResults=void 0}return this._config.step||this._config.chunk||(this._completeResults.data=this._completeResults.data.concat(o.data),this._completeResults.errors=this._completeResults.errors.concat(o.errors),this._completeResults.meta=o.meta),this._completed||!d||!y(this._config.complete)||o&&o.meta.aborted||(this._config.complete(this._completeResults,this._input),this._completed=!0),d||o&&o.meta.paused||this._nextChunk(),o}this._halted=!0},this._sendError=function(t){y(this._config.error)?this._config.error(t):i&&this._config.error&&e.postMessage({workerId:a.WORKER_ID,error:t,finished:!1})}}function d(t){var e;(t=t||{}).chunkSize||(t.chunkSize=a.RemoteChunkSize),l.call(this,t),this._nextChunk=n?function(){this._readChunk(),this._chunkLoaded()}:function(){this._readChunk()},this.stream=function(t){this._input=t,this._nextChunk()},this._readChunk=function(){if(this._finished)this._chunkLoaded();else{if(e=new XMLHttpRequest,this._config.withCredentials&&(e.withCredentials=this._config.withCredentials),n||(e.onload=E(this._chunkLoaded,this),e.onerror=E(this._chunkError,this)),e.open(this._config.downloadRequestBody?"POST":"GET",this._input,!n),this._config.downloadRequestHeaders){var t=this._config.downloadRequestHeaders;for(var i in t)e.setRequestHeader(i,t[i])}if(this._config.chunkSize){var r=this._start+this._config.chunkSize-1;e.setRequestHeader("Range","bytes="+this._start+"-"+r)}try{e.send(this._config.downloadRequestBody)}catch(t){this._chunkError(t.message)}n&&0===e.status&&this._chunkError()}},this._chunkLoaded=function(){4===e.readyState&&(e.status<200||400<=e.status?this._chunkError():(this._start+=this._config.chunkSize?this._config.chunkSize:e.responseText.length,this._finished=!this._config.chunkSize||this._start>=function(t){var e=t.getResponseHeader("Content-Range");return null===e?-1:parseInt(e.substring(e.lastIndexOf("/")+1))}(e),this.parseChunk(e.responseText)))},this._chunkError=function(t){var n=e.statusText||t;this._sendError(new Error(n))}}function h(t){var e,n;(t=t||{}).chunkSize||(t.chunkSize=a.LocalChunkSize),l.call(this,t);var i="undefined"!=typeof FileReader;this.stream=function(t){this._input=t,n=t.slice||t.webkitSlice||t.mozSlice,i?((e=new FileReader).onload=E(this._chunkLoaded,this),e.onerror=E(this._chunkError,this)):e=new FileReaderSync,this._nextChunk()},this._nextChunk=function(){this._finished||this._config.preview&&!(this._rowCount<this._config.preview)||this._readChunk()},this._readChunk=function(){var t=this._input;if(this._config.chunkSize){var r=Math.min(this._start+this._config.chunkSize,this._input.size);t=n.call(t,this._start,r)}var s=e.readAsText(t,this._config.encoding);i||this._chunkLoaded({target:{result:s}})},this._chunkLoaded=function(t){this._start+=this._config.chunkSize,this._finished=!this._config.chunkSize||this._start>=this._input.size,this.parseChunk(t.target.result)},this._chunkError=function(){this._sendError(e.error)}}function u(t){var e;l.call(this,t=t||{}),this.stream=function(t){return e=t,this._nextChunk()},this._nextChunk=function(){if(!this._finished){var t,n=this._config.chunkSize;return n?(t=e.substring(0,n),e=e.substring(n)):(t=e,e=""),this._finished=!e,this.parseChunk(t)}}}function c(t){l.call(this,t=t||{});var e=[],n=!0,i=!1;this.pause=function(){l.prototype.pause.apply(this,arguments),this._input.pause()},this.resume=function(){l.prototype.resume.apply(this,arguments),this._input.resume()},this.stream=function(t){this._input=t,this._input.on("data",this._streamData),this._input.on("end",this._streamEnd),this._input.on("error",this._streamError)},this._checkIsFinished=function(){i&&1===e.length&&(this._finished=!0)},this._nextChunk=function(){this._checkIsFinished(),e.length?this.parseChunk(e.shift()):n=!0},this._streamData=E((function(t){try{e.push("string"==typeof t?t:t.toString(this._config.encoding)),n&&(n=!1,this._checkIsFinished(),this.parseChunk(e.shift()))}catch(t){this._streamError(t)}}),this),this._streamError=E((function(t){this._streamCleanUp(),this._sendError(t)}),this),this._streamEnd=E((function(){this._streamCleanUp(),i=!0,this._streamData("")}),this),this._streamCleanUp=E((function(){this._input.removeListener("data",this._streamData),this._input.removeListener("end",this._streamEnd),this._input.removeListener("error",this._streamError)}),this)}function f(t){var e,n,i,r=Math.pow(2,53),s=-r,o=/^\s*-?(\d+\.?|\.\d+|\d+\.\d+)(e[-+]?\d+)?\s*$/,l=/(\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d:[0-5]\d\.\d+([+-][0-2]\d:[0-5]\d|Z))|(\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d:[0-5]\d([+-][0-2]\d:[0-5]\d|Z))|(\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d([+-][0-2]\d:[0-5]\d|Z))/,d=this,h=0,u=0,c=!1,f=!1,g=[],_={data:[],errors:[],meta:{}};if(y(t.step)){var b=t.step;t.step=function(e){if(_=e,k())C();else{if(C(),0===_.data.length)return;h+=e.data.length,t.preview&&h>t.preview?n.abort():(_.data=_.data[0],b(_,d))}}}function E(e){return"greedy"===t.skipEmptyLines?""===e.join("").trim():1===e.length&&0===e[0].length}function C(){if(_&&i&&(x("Delimiter","UndetectableDelimiter","Unable to auto-detect delimiting character; defaulted to '"+a.DefaultDelimiter+"'"),i=!1),t.skipEmptyLines)for(var e=0;e<_.data.length;e++)E(_.data[e])&&_.data.splice(e--,1);return k()&&function(){if(_)if(Array.isArray(_.data[0])){for(var e=0;k()&&e<_.data.length;e++)_.data[e].forEach(n);_.data.splice(0,1)}else _.data.forEach(n);function n(e,n){y(t.transformHeader)&&(e=t.transformHeader(e,n)),g.push(e)}}(),function(){if(!_||!t.header&&!t.dynamicTyping&&!t.transform)return _;function e(e,n){var i,r=t.header?{}:[];for(i=0;i<e.length;i++){var s=i,a=e[i];t.header&&(s=i>=g.length?"__parsed_extra":g[i]),t.transform&&(a=t.transform(a,s)),a=w(s,a),"__parsed_extra"===s?(r[s]=r[s]||[],r[s].push(a)):r[s]=a}return t.header&&(i>g.length?x("FieldMismatch","TooManyFields","Too many fields: expected "+g.length+" fields but parsed "+i,u+n):i<g.length&&x("FieldMismatch","TooFewFields","Too few fields: expected "+g.length+" fields but parsed "+i,u+n)),r}var n=1;return!_.data.length||Array.isArray(_.data[0])?(_.data=_.data.map(e),n=_.data.length):_.data=e(_.data,0),t.header&&_.meta&&(_.meta.fields=g),u+=n,_}()}function k(){return t.header&&0===g.length}function w(e,n){return i=e,t.dynamicTypingFunction&&void 0===t.dynamicTyping[i]&&(t.dynamicTyping[i]=t.dynamicTypingFunction(i)),!0===(t.dynamicTyping[i]||t.dynamicTyping)?"true"===n||"TRUE"===n||"false"!==n&&"FALSE"!==n&&(function(t){if(o.test(t)){var e=parseFloat(t);if(s<e&&e<r)return!0}return!1}(n)?parseFloat(n):l.test(n)?new Date(n):""===n?null:n):n;var i}function x(t,e,n,i){var r={type:t,code:e,message:n};void 0!==i&&(r.row=i),_.errors.push(r)}this.parse=function(r,s,o){var l=t.quoteChar||'"';if(t.newline||(t.newline=function(t,e){t=t.substring(0,1048576);var n=new RegExp(p(e)+"([^]*?)"+p(e),"gm"),i=(t=t.replace(n,"")).split("\r"),r=t.split("\n"),s=1<r.length&&r[0].length<i[0].length;if(1===i.length||s)return"\n";for(var a=0,o=0;o<i.length;o++)"\n"===i[o][0]&&a++;return a>=i.length/2?"\r\n":"\r"}(r,l)),i=!1,t.delimiter)y(t.delimiter)&&(t.delimiter=t.delimiter(r),_.meta.delimiter=t.delimiter);else{var d=function(e,n,i,r,s){var o,l,d,h;s=s||[",","\t","|",";",a.RECORD_SEP,a.UNIT_SEP];for(var u=0;u<s.length;u++){var c=s[u],f=0,p=0,g=0;d=void 0;for(var _=new m({comments:r,delimiter:c,newline:n,preview:10}).parse(e),b=0;b<_.data.length;b++)if(i&&E(_.data[b]))g++;else{var v=_.data[b].length;p+=v,void 0!==d?0<v&&(f+=Math.abs(v-d),d=v):d=v}0<_.data.length&&(p/=_.data.length-g),(void 0===l||f<=l)&&(void 0===h||h<p)&&1.99<p&&(l=f,o=c,h=p)}return{successful:!!(t.delimiter=o),bestDelimiter:o}}(r,t.newline,t.skipEmptyLines,t.comments,t.delimitersToGuess);d.successful?t.delimiter=d.bestDelimiter:(i=!0,t.delimiter=a.DefaultDelimiter),_.meta.delimiter=t.delimiter}var h=v(t);return t.preview&&t.header&&h.preview++,e=r,n=new m(h),_=n.parse(e,s,o),C(),c?{meta:{paused:!0}}:_||{meta:{paused:!1}}},this.paused=function(){return c},this.pause=function(){c=!0,n.abort(),e=y(t.chunk)?"":e.substring(n.getCharIndex())},this.resume=function(){d.streamer._halted?(c=!1,d.streamer.parseChunk(e,!0)):setTimeout(d.resume,3)},this.aborted=function(){return f},this.abort=function(){f=!0,n.abort(),_.meta.aborted=!0,y(t.complete)&&t.complete(_),e=""}}function p(t){return t.replace(/[.*+?^${}()|[\]\\]/g,"\\$&")}function m(t){var e,n=(t=t||{}).delimiter,i=t.newline,r=t.comments,s=t.step,o=t.preview,l=t.fastMode,d=e=void 0===t.quoteChar?'"':t.quoteChar;if(void 0!==t.escapeChar&&(d=t.escapeChar),("string"!=typeof n||-1<a.BAD_DELIMITERS.indexOf(n))&&(n=","),r===n)throw new Error("Comment character same as delimiter");!0===r?r="#":("string"!=typeof r||-1<a.BAD_DELIMITERS.indexOf(r))&&(r=!1),"\n"!==i&&"\r"!==i&&"\r\n"!==i&&(i="\n");var h=0,u=!1;this.parse=function(t,a,c){if("string"!=typeof t)throw new Error("Input must be a string");var f=t.length,m=n.length,g=i.length,_=r.length,b=y(s),v=[],E=[],C=[],k=h=0;if(!t)return j();if(l||!1!==l&&-1===t.indexOf(e)){for(var w=t.split(i),x=0;x<w.length;x++){if(C=w[x],h+=C.length,x!==w.length-1)h+=i.length;else if(c)return j();if(!r||C.substring(0,_)!==r){if(b){if(v=[],D(C.split(n)),z(),u)return j()}else D(C.split(n));if(o&&o<=x)return v=v.slice(0,o),j(!0)}}return j()}for(var S=t.indexOf(n,h),R=t.indexOf(i,h),O=new RegExp(p(d)+p(e),"g"),L=t.indexOf(e,h);;)if(t[h]!==e)if(r&&0===C.length&&t.substring(h,h+_)===r){if(-1===R)return j();h=R+g,R=t.indexOf(i,h),S=t.indexOf(n,h)}else{if(-1!==S&&(S<R||-1===R)){if(!(S<L)){C.push(t.substring(h,S)),h=S+m,S=t.indexOf(n,h);continue}var A=q(S,L,R);if(A&&void 0!==A.nextDelim){S=A.nextDelim,L=A.quoteSearch,C.push(t.substring(h,S)),h=S+m,S=t.indexOf(n,h);continue}}if(-1===R)break;if(C.push(t.substring(h,R)),N(R+g),b&&(z(),u))return j();if(o&&v.length>=o)return j(!0)}else for(L=h,h++;;){if(-1===(L=t.indexOf(e,L+1)))return c||E.push({type:"Quotes",code:"MissingQuotes",message:"Quoted field unterminated",row:v.length,index:h}),M();if(L===f-1)return M(t.substring(h,L).replace(O,e));if(e!==d||t[L+1]!==d){if(e===d||0===L||t[L-1]!==d){-1!==S&&S<L+1&&(S=t.indexOf(n,L+1)),-1!==R&&R<L+1&&(R=t.indexOf(i,L+1));var T=F(-1===R?S:Math.min(S,R));if(t[L+1+T]===n){C.push(t.substring(h,L).replace(O,e)),t[h=L+1+T+m]!==e&&(L=t.indexOf(e,h)),S=t.indexOf(n,h),R=t.indexOf(i,h);break}var I=F(R);if(t.substring(L+1+I,L+1+I+g)===i){if(C.push(t.substring(h,L).replace(O,e)),N(L+1+I+g),S=t.indexOf(n,h),L=t.indexOf(e,h),b&&(z(),u))return j();if(o&&v.length>=o)return j(!0);break}E.push({type:"Quotes",code:"InvalidQuotes",message:"Trailing quote on quoted field is malformed",row:v.length,index:h}),L++}}else L++}return M();function D(t){v.push(t),k=h}function F(e){var n=0;if(-1!==e){var i=t.substring(L+1,e);i&&""===i.trim()&&(n=i.length)}return n}function M(e){return c||(void 0===e&&(e=t.substring(h)),C.push(e),h=f,D(C),b&&z()),j()}function N(e){h=e,D(C),C=[],R=t.indexOf(i,h)}function j(t){return{data:v,errors:E,meta:{delimiter:n,linebreak:i,aborted:u,truncated:!!t,cursor:k+(a||0)}}}function z(){s(j()),v=[],E=[]}function q(i,r,s){var a={nextDelim:void 0,quoteSearch:void 0},o=t.indexOf(e,r+1);if(r<i&&i<o&&(o<s||-1===s)){var l=t.indexOf(n,o);if(-1===l)return a;o<l&&(o=t.indexOf(e,o+1)),a=q(l,o,s)}else a={nextDelim:i,quoteSearch:r};return a}},this.abort=function(){u=!0},this.getCharIndex=function(){return h}}function g(t){var e=t.data,n=r[e.workerId],i=!1;if(e.error)n.userError(e.error,e.file);else if(e.results&&e.results.data){var s={abort:function(){i=!0,_(e.workerId,{data:[],errors:[],meta:{aborted:!0}})},pause:b,resume:b};if(y(n.userStep)){for(var a=0;a<e.results.data.length&&(n.userStep({data:e.results.data[a],errors:e.results.errors,meta:e.results.meta},s),!i);a++);delete e.results}else y(n.userChunk)&&(n.userChunk(e.results,s,e.file),delete e.results)}e.finished&&!i&&_(e.workerId,e.results)}function _(t,e){var n=r[t];y(n.userComplete)&&n.userComplete(e),n.terminate(),delete r[t]}function b(){throw new Error("Not implemented.")}function v(t){if("object"!=typeof t||null===t)return t;var e=Array.isArray(t)?[]:{};for(var n in t)e[n]=v(t[n]);return e}function E(t,e){return function(){t.apply(e,arguments)}}function y(t){return"function"==typeof t}return i&&(e.onmessage=function(t){var n=t.data;if(void 0===a.WORKER_ID&&n&&(a.WORKER_ID=n.workerId),"string"==typeof n.input)e.postMessage({workerId:a.WORKER_ID,results:a.parse(n.input,n.config),finished:!0});else if(e.File&&n.input instanceof File||n.input instanceof Object){var i=a.parse(n.input,n.config);i&&e.postMessage({workerId:a.WORKER_ID,results:i,finished:!0})}}),(d.prototype=Object.create(l.prototype)).constructor=d,(h.prototype=Object.create(l.prototype)).constructor=h,(u.prototype=Object.create(u.prototype)).constructor=u,(c.prototype=Object.create(l.prototype)).constructor=c,a})?n.apply(e,[]):n)||(t.exports=i)},601:(t,e)=>{"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.CSVTable=void 0,e.CSVTable=class{constructor(t,e){this.data=[[]],this.maxColumns=0,this.tableContainer=t,this.editedCallback=e}getContents(){return this.data}setContents(t){this.data=t}getMaxColumns(){return this.maxColumns}appendRow(t){this.data.push(t),this.editedCallback(!0)}createTable(){this.tableContainer=this.resetTable(),this.maxColumns=Math.max(...this.data.map((t=>t.length)));const t=document.createElement("div");for(let e=0;e<this.maxColumns;e++){const n=this.insertColumnActions(e);t.append(n)}t.append(document.createElement("div")),this.tableContainer.append(t);for(let t=0;t<this.data.length;t++){const e=this.data[t];for(;e.length<this.maxColumns;)e.push("");const n=this.makeRowWithEditableContent(e,t);this.tableContainer.append(n)}document.documentElement.style.setProperty("--columns",(this.maxColumns+1).toString()),this.editedCallback(!1)}insertRow(t,e){const n=new Array(this.maxColumns).fill("");this.data.push(n);for(let t=this.data.length-1;t>e;t--)this.data[t]=this.data[t-1];this.data[e]=n;const i=this.makeRowWithEditableContent(n,e);let r=t;for(;r.nextElementSibling;)r=r.nextElementSibling,r.dataset.row=(Number(r.dataset.row)+1).toString();t.insertAdjacentElement("afterend",i),this.editedCallback(!0)}insertColumn(t){let e=this.tableContainer.firstElementChild;for(let n=t;n<this.maxColumns;n++)e.children[n].dataset.col=(Number(e.children[n].dataset.col)+1).toString();const n=this.insertColumnActions(t);e.children[t].insertAdjacentElement("beforebegin",n);for(let n=0;n<this.data.length;n++){e=e.nextElementSibling,this.data[n].push("");for(let i=this.data[n].length-1;i>t;i--)this.data[n][i]=this.data[n][i-1],e.children[i].dataset.col=(Number(e.children[i].dataset.col)+1).toString();this.data[n][t]="";const i=document.createElement("div");this.makeCellWithEditableContents(i,"",t),e.children[t].insertAdjacentElement("beforebegin",i)}this.maxColumns++,document.documentElement.style.setProperty("--columns",(this.maxColumns+1).toString()),this.editedCallback(!0)}removeRow(t,e){for(let t=e+1;t<this.data.length;t++)this.data[t-1]=this.data[t];this.data.pop();let n=t;for(;n.nextElementSibling;)n=n.nextElementSibling,n.dataset.row=(Number(n.dataset.row)-1).toString();t.remove(),this.editedCallback(!0)}removeColumn(t){let e=this.tableContainer.firstElementChild;for(let n=t+1;n<this.maxColumns;n++)e.children[n].dataset.col=(Number(e.children[n].dataset.col)-1).toString();e.children[t].remove();for(let n=0;n<this.data.length;n++){e=e.nextElementSibling;for(let i=t+1;i<this.data[n].length;i++)this.data[n][i-1]=this.data[n][i],e.children[i].dataset.col=(Number(e.children[i].dataset.col)-1).toString();this.data[n].length>t&&(this.data[n].pop(),e.children[t].remove())}this.maxColumns--,document.documentElement.style.setProperty("--columns",(this.maxColumns+1).toString()),this.editedCallback(!0)}resetTable(){this.tableContainer.remove();const t=document.getElementById("table-container-container"),e=document.createElement("div");return e.setAttribute("id","table-container"),t.appendChild(e),e}insertColumnActions(t){const e=document.createElement("div");e.classList.add("actions"),e.dataset.col=t.toString();const n=document.createElement("div");n.classList.add("btn-group"),n.setAttribute("role","toolbar");const i=document.createElement("button");i.addEventListener("click",(t=>{const e=Number(t.target.parentElement.parentElement.dataset.col);this.insertColumn(e+1)})),i.textContent="+",i.classList.add("btn","btn-success","btn-sm"),n.append(i);const r=document.createElement("button");return r.addEventListener("click",(t=>{const e=Number(t.target.parentElement.parentElement.dataset.col);this.removeColumn(e)})),r.textContent="−",r.classList.add("btn","btn-danger","btn-sm"),n.append(r),e.append(n),e}makeRowWithEditableContent(t,e){const n=document.createElement("div");n.dataset.row=e.toString();for(let e=0;e<this.maxColumns;e++){const i=document.createElement("div");this.makeCellWithEditableContents(i,t[e],e),n.append(i)}const i=document.createElement("div");i.classList.add("actions");const r=document.createElement("div");r.classList.add("btn-group"),r.setAttribute("role","toolbar");const s=document.createElement("button");s.dataset.row=e.toString(),s.addEventListener("click",(t=>{const e=t.target.parentElement.parentElement.parentElement,n=Number(e.dataset.row);this.insertRow(e,n+1)})),s.textContent="+",s.classList.add("btn","btn-success","btn-sm"),r.append(s);const a=document.createElement("button");return a.dataset.row=e.toString(),a.addEventListener("click",(t=>{const e=t.target.parentElement.parentElement.parentElement,n=Number(e.dataset.row);this.removeRow(e,n)})),a.textContent="−",a.classList.add("btn","btn-danger","btn-sm"),r.append(a),i.append(r),n.append(i),n}makeCellWithEditableContents(t,e,n){t.setAttribute("contenteditable","true"),t.dataset.col=n.toString(),t.textContent=e,t.addEventListener("input",(t=>{const e=t.target;this.data[Number(e.parentElement.dataset.row)][Number(e.dataset.col)]=e.innerText,this.editedCallback(!0)}))}}}},e={};function n(i){if(e[i])return e[i].exports;var r=e[i]={exports:{}};return t[i].call(r.exports,r,r.exports,n),r.exports}(()=>{"use strict";const t=n(460),e=n(601),i=document.getElementById("open-file-button"),r=document.getElementById("save-file-button"),s=document.getElementById("header-check-box");let a,o;function l(){const{children:t}=document.getElementById("table-container");t[1].classList.toggle("header")}function d(t){t?(r.classList.add("btn-success"),r.classList.remove("btn-nochanges")):(r.classList.add("btn-nochanges"),r.classList.remove("btn-success"))}i.addEventListener("click",(async()=>{[o]=await window.showOpenFilePicker({types:[{accept:{"text/csv":[".csv"]}}]}),a=new e.CSVTable(document.getElementById("table-container"),d);const n=await o.getFile(),i=await n.text(),r=t.parse(i);0!=r.errors.length&&console.log("Error parsing CSV:",r.errors.map((t=>t.message))),a.setContents(r.data),a.createTable(),s.checked&&l()})),r.addEventListener("click",(async()=>{const e=t.unparse(a.getContents());!async function(t,e){const n=await t.createWritable();await n.write(e),await n.close()}(o,e),d(!1)})),s.addEventListener("change",(()=>l()))})()})();
//# sourceMappingURL=index.js.map