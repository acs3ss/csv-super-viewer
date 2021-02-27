/*! For license information please see index.js.LICENSE.txt */
(()=>{var e={460:function(e,t){var r,i;void 0===(i="function"==typeof(r=function e(){"use strict";var t="undefined"!=typeof self?self:"undefined"!=typeof window?window:void 0!==t?t:{},r=!t.document&&!!t.postMessage,i=r&&/blob:/i.test((t.location||{}).protocol),n={},s=0,a={parse:function(r,i){var o=(i=i||{}).dynamicTyping||!1;if(b(o)&&(i.dynamicTypingFunction=o,o={}),i.dynamicTyping=o,i.transform=!!b(i.transform)&&i.transform,i.worker&&a.WORKERS_SUPPORTED){var h=function(){if(!a.WORKERS_SUPPORTED)return!1;var r,i,o=(r=t.URL||t.webkitURL||null,i=e.toString(),a.BLOB_URL||(a.BLOB_URL=r.createObjectURL(new Blob(["(",i,")();"],{type:"text/javascript"})))),h=new t.Worker(o);return h.onmessage=m,h.id=s++,n[h.id]=h}();return h.userStep=i.step,h.userChunk=i.chunk,h.userComplete=i.complete,h.userError=i.error,i.step=b(i.step),i.chunk=b(i.chunk),i.complete=b(i.complete),i.error=b(i.error),delete i.worker,void h.postMessage({input:r,config:i,workerId:h.id})}var f=null;return a.NODE_STREAM_INPUT,"string"==typeof r?f=i.download?new u(i):new c(i):!0===r.readable&&b(r.read)&&b(r.on)?f=new l(i):(t.File&&r instanceof File||r instanceof Object)&&(f=new d(i)),f.stream(r)},unparse:function(e,t){var r=!1,i=!0,n=",",s="\r\n",o='"',h=o+o,u=!1,d=null,c=!1;!function(){if("object"==typeof t){if("string"!=typeof t.delimiter||a.BAD_DELIMITERS.filter((function(e){return-1!==t.delimiter.indexOf(e)})).length||(n=t.delimiter),("boolean"==typeof t.quotes||"function"==typeof t.quotes||Array.isArray(t.quotes))&&(r=t.quotes),"boolean"!=typeof t.skipEmptyLines&&"string"!=typeof t.skipEmptyLines||(u=t.skipEmptyLines),"string"==typeof t.newline&&(s=t.newline),"string"==typeof t.quoteChar&&(o=t.quoteChar),"boolean"==typeof t.header&&(i=t.header),Array.isArray(t.columns)){if(0===t.columns.length)throw new Error("Option columns is empty");d=t.columns}void 0!==t.escapeChar&&(h=t.escapeChar+o),"boolean"==typeof t.escapeFormulae&&(c=t.escapeFormulae)}}();var l=new RegExp(p(o),"g");if("string"==typeof e&&(e=JSON.parse(e)),Array.isArray(e)){if(!e.length||Array.isArray(e[0]))return g(null,e,u);if("object"==typeof e[0])return g(d||f(e[0]),e,u)}else if("object"==typeof e)return"string"==typeof e.data&&(e.data=JSON.parse(e.data)),Array.isArray(e.data)&&(e.fields||(e.fields=e.meta&&e.meta.fields),e.fields||(e.fields=Array.isArray(e.data[0])?e.fields:f(e.data[0])),Array.isArray(e.data[0])||"object"==typeof e.data[0]||(e.data=[e.data])),g(e.fields||[],e.data||[],u);throw new Error("Unable to serialize unrecognized input");function f(e){if("object"!=typeof e)return[];var t=[];for(var r in e)t.push(r);return t}function g(e,t,r){var a="";"string"==typeof e&&(e=JSON.parse(e)),"string"==typeof t&&(t=JSON.parse(t));var o=Array.isArray(e)&&0<e.length,h=!Array.isArray(t[0]);if(o&&i){for(var u=0;u<e.length;u++)0<u&&(a+=n),a+=m(e[u],u);0<t.length&&(a+=s)}for(var d=0;d<t.length;d++){var c=o?e.length:t[d].length,l=!1,f=o?0===Object.keys(t[d]).length:0===t[d].length;if(r&&!o&&(l="greedy"===r?""===t[d].join("").trim():1===t[d].length&&0===t[d][0].length),"greedy"===r&&o){for(var p=[],g=0;g<c;g++){var _=h?e[g]:g;p.push(t[d][_])}l=""===p.join("").trim()}if(!l){for(var v=0;v<c;v++){0<v&&!f&&(a+=n);var y=o&&h?e[v]:v;a+=m(t[d][y],v)}d<t.length-1&&(!r||0<c&&!f)&&(a+=s)}}return a}function m(e,t){if(null==e)return"";if(e.constructor===Date)return JSON.stringify(e).slice(1,25);!0===c&&"string"==typeof e&&null!==e.match(/^[=+\-@].*$/)&&(e="'"+e);var i=e.toString().replace(l,h);return"boolean"==typeof r&&r||"function"==typeof r&&r(e,t)||Array.isArray(r)&&r[t]||function(e,t){for(var r=0;r<t.length;r++)if(-1<e.indexOf(t[r]))return!0;return!1}(i,a.BAD_DELIMITERS)||-1<i.indexOf(n)||" "===i.charAt(0)||" "===i.charAt(i.length-1)?o+i+o:i}}};if(a.RECORD_SEP=String.fromCharCode(30),a.UNIT_SEP=String.fromCharCode(31),a.BYTE_ORDER_MARK="\ufeff",a.BAD_DELIMITERS=["\r","\n",'"',a.BYTE_ORDER_MARK],a.WORKERS_SUPPORTED=!r&&!!t.Worker,a.NODE_STREAM_INPUT=1,a.LocalChunkSize=10485760,a.RemoteChunkSize=5242880,a.DefaultDelimiter=",",a.Parser=g,a.ParserHandle=f,a.NetworkStreamer=u,a.FileStreamer=d,a.StringStreamer=c,a.ReadableStreamStreamer=l,t.jQuery){var o=t.jQuery;o.fn.parse=function(e){var r=e.config||{},i=[];return this.each((function(e){if("INPUT"!==o(this).prop("tagName").toUpperCase()||"file"!==o(this).attr("type").toLowerCase()||!t.FileReader||!this.files||0===this.files.length)return!0;for(var n=0;n<this.files.length;n++)i.push({file:this.files[n],inputElem:this,instanceConfig:o.extend({},r)})})),n(),this;function n(){if(0!==i.length){var t,r,n,h=i[0];if(b(e.before)){var u=e.before(h.file,h.inputElem);if("object"==typeof u){if("abort"===u.action)return"AbortError",t=h.file,r=h.inputElem,n=u.reason,void(b(e.error)&&e.error({name:"AbortError"},t,r,n));if("skip"===u.action)return void s();"object"==typeof u.config&&(h.instanceConfig=o.extend(h.instanceConfig,u.config))}else if("skip"===u)return void s()}var d=h.instanceConfig.complete;h.instanceConfig.complete=function(e){b(d)&&d(e,h.file,h.inputElem),s()},a.parse(h.file,h.instanceConfig)}else b(e.complete)&&e.complete()}function s(){i.splice(0,1),n()}}}function h(e){this._handle=null,this._finished=!1,this._completed=!1,this._halted=!1,this._input=null,this._baseIndex=0,this._partialLine="",this._rowCount=0,this._start=0,this._nextChunk=null,this.isFirstChunk=!0,this._completeResults={data:[],errors:[],meta:{}},function(e){var t=y(e);t.chunkSize=parseInt(t.chunkSize),e.step||e.chunk||(t.chunkSize=null),this._handle=new f(t),(this._handle.streamer=this)._config=t}.call(this,e),this.parseChunk=function(e,r){if(this.isFirstChunk&&b(this._config.beforeFirstChunk)){var n=this._config.beforeFirstChunk(e);void 0!==n&&(e=n)}this.isFirstChunk=!1,this._halted=!1;var s=this._partialLine+e;this._partialLine="";var o=this._handle.parse(s,this._baseIndex,!this._finished);if(!this._handle.paused()&&!this._handle.aborted()){var h=o.meta.cursor;this._finished||(this._partialLine=s.substring(h-this._baseIndex),this._baseIndex=h),o&&o.data&&(this._rowCount+=o.data.length);var u=this._finished||this._config.preview&&this._rowCount>=this._config.preview;if(i)t.postMessage({results:o,workerId:a.WORKER_ID,finished:u});else if(b(this._config.chunk)&&!r){if(this._config.chunk(o,this._handle),this._handle.paused()||this._handle.aborted())return void(this._halted=!0);o=void 0,this._completeResults=void 0}return this._config.step||this._config.chunk||(this._completeResults.data=this._completeResults.data.concat(o.data),this._completeResults.errors=this._completeResults.errors.concat(o.errors),this._completeResults.meta=o.meta),this._completed||!u||!b(this._config.complete)||o&&o.meta.aborted||(this._config.complete(this._completeResults,this._input),this._completed=!0),u||o&&o.meta.paused||this._nextChunk(),o}this._halted=!0},this._sendError=function(e){b(this._config.error)?this._config.error(e):i&&this._config.error&&t.postMessage({workerId:a.WORKER_ID,error:e,finished:!1})}}function u(e){var t;(e=e||{}).chunkSize||(e.chunkSize=a.RemoteChunkSize),h.call(this,e),this._nextChunk=r?function(){this._readChunk(),this._chunkLoaded()}:function(){this._readChunk()},this.stream=function(e){this._input=e,this._nextChunk()},this._readChunk=function(){if(this._finished)this._chunkLoaded();else{if(t=new XMLHttpRequest,this._config.withCredentials&&(t.withCredentials=this._config.withCredentials),r||(t.onload=k(this._chunkLoaded,this),t.onerror=k(this._chunkError,this)),t.open(this._config.downloadRequestBody?"POST":"GET",this._input,!r),this._config.downloadRequestHeaders){var e=this._config.downloadRequestHeaders;for(var i in e)t.setRequestHeader(i,e[i])}if(this._config.chunkSize){var n=this._start+this._config.chunkSize-1;t.setRequestHeader("Range","bytes="+this._start+"-"+n)}try{t.send(this._config.downloadRequestBody)}catch(e){this._chunkError(e.message)}r&&0===t.status&&this._chunkError()}},this._chunkLoaded=function(){4===t.readyState&&(t.status<200||400<=t.status?this._chunkError():(this._start+=this._config.chunkSize?this._config.chunkSize:t.responseText.length,this._finished=!this._config.chunkSize||this._start>=function(e){var t=e.getResponseHeader("Content-Range");return null===t?-1:parseInt(t.substring(t.lastIndexOf("/")+1))}(t),this.parseChunk(t.responseText)))},this._chunkError=function(e){var r=t.statusText||e;this._sendError(new Error(r))}}function d(e){var t,r;(e=e||{}).chunkSize||(e.chunkSize=a.LocalChunkSize),h.call(this,e);var i="undefined"!=typeof FileReader;this.stream=function(e){this._input=e,r=e.slice||e.webkitSlice||e.mozSlice,i?((t=new FileReader).onload=k(this._chunkLoaded,this),t.onerror=k(this._chunkError,this)):t=new FileReaderSync,this._nextChunk()},this._nextChunk=function(){this._finished||this._config.preview&&!(this._rowCount<this._config.preview)||this._readChunk()},this._readChunk=function(){var e=this._input;if(this._config.chunkSize){var n=Math.min(this._start+this._config.chunkSize,this._input.size);e=r.call(e,this._start,n)}var s=t.readAsText(e,this._config.encoding);i||this._chunkLoaded({target:{result:s}})},this._chunkLoaded=function(e){this._start+=this._config.chunkSize,this._finished=!this._config.chunkSize||this._start>=this._input.size,this.parseChunk(e.target.result)},this._chunkError=function(){this._sendError(t.error)}}function c(e){var t;h.call(this,e=e||{}),this.stream=function(e){return t=e,this._nextChunk()},this._nextChunk=function(){if(!this._finished){var e,r=this._config.chunkSize;return r?(e=t.substring(0,r),t=t.substring(r)):(e=t,t=""),this._finished=!t,this.parseChunk(e)}}}function l(e){h.call(this,e=e||{});var t=[],r=!0,i=!1;this.pause=function(){h.prototype.pause.apply(this,arguments),this._input.pause()},this.resume=function(){h.prototype.resume.apply(this,arguments),this._input.resume()},this.stream=function(e){this._input=e,this._input.on("data",this._streamData),this._input.on("end",this._streamEnd),this._input.on("error",this._streamError)},this._checkIsFinished=function(){i&&1===t.length&&(this._finished=!0)},this._nextChunk=function(){this._checkIsFinished(),t.length?this.parseChunk(t.shift()):r=!0},this._streamData=k((function(e){try{t.push("string"==typeof e?e:e.toString(this._config.encoding)),r&&(r=!1,this._checkIsFinished(),this.parseChunk(t.shift()))}catch(e){this._streamError(e)}}),this),this._streamError=k((function(e){this._streamCleanUp(),this._sendError(e)}),this),this._streamEnd=k((function(){this._streamCleanUp(),i=!0,this._streamData("")}),this),this._streamCleanUp=k((function(){this._input.removeListener("data",this._streamData),this._input.removeListener("end",this._streamEnd),this._input.removeListener("error",this._streamError)}),this)}function f(e){var t,r,i,n=Math.pow(2,53),s=-n,o=/^\s*-?(\d+\.?|\.\d+|\d+\.\d+)(e[-+]?\d+)?\s*$/,h=/(\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d:[0-5]\d\.\d+([+-][0-2]\d:[0-5]\d|Z))|(\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d:[0-5]\d([+-][0-2]\d:[0-5]\d|Z))|(\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d([+-][0-2]\d:[0-5]\d|Z))/,u=this,d=0,c=0,l=!1,f=!1,m=[],_={data:[],errors:[],meta:{}};if(b(e.step)){var v=e.step;e.step=function(t){if(_=t,w())E();else{if(E(),0===_.data.length)return;d+=t.data.length,e.preview&&d>e.preview?r.abort():(_.data=_.data[0],v(_,u))}}}function k(t){return"greedy"===e.skipEmptyLines?""===t.join("").trim():1===t.length&&0===t[0].length}function E(){if(_&&i&&(x("Delimiter","UndetectableDelimiter","Unable to auto-detect delimiting character; defaulted to '"+a.DefaultDelimiter+"'"),i=!1),e.skipEmptyLines)for(var t=0;t<_.data.length;t++)k(_.data[t])&&_.data.splice(t--,1);return w()&&function(){if(_)if(Array.isArray(_.data[0])){for(var t=0;w()&&t<_.data.length;t++)_.data[t].forEach(r);_.data.splice(0,1)}else _.data.forEach(r);function r(t,r){b(e.transformHeader)&&(t=e.transformHeader(t,r)),m.push(t)}}(),function(){if(!_||!e.header&&!e.dynamicTyping&&!e.transform)return _;function t(t,r){var i,n=e.header?{}:[];for(i=0;i<t.length;i++){var s=i,a=t[i];e.header&&(s=i>=m.length?"__parsed_extra":m[i]),e.transform&&(a=e.transform(a,s)),a=C(s,a),"__parsed_extra"===s?(n[s]=n[s]||[],n[s].push(a)):n[s]=a}return e.header&&(i>m.length?x("FieldMismatch","TooManyFields","Too many fields: expected "+m.length+" fields but parsed "+i,c+r):i<m.length&&x("FieldMismatch","TooFewFields","Too few fields: expected "+m.length+" fields but parsed "+i,c+r)),n}var r=1;return!_.data.length||Array.isArray(_.data[0])?(_.data=_.data.map(t),r=_.data.length):_.data=t(_.data,0),e.header&&_.meta&&(_.meta.fields=m),c+=r,_}()}function w(){return e.header&&0===m.length}function C(t,r){return i=t,e.dynamicTypingFunction&&void 0===e.dynamicTyping[i]&&(e.dynamicTyping[i]=e.dynamicTypingFunction(i)),!0===(e.dynamicTyping[i]||e.dynamicTyping)?"true"===r||"TRUE"===r||"false"!==r&&"FALSE"!==r&&(function(e){if(o.test(e)){var t=parseFloat(e);if(s<t&&t<n)return!0}return!1}(r)?parseFloat(r):h.test(r)?new Date(r):""===r?null:r):r;var i}function x(e,t,r,i){var n={type:e,code:t,message:r};void 0!==i&&(n.row=i),_.errors.push(n)}this.parse=function(n,s,o){var h=e.quoteChar||'"';if(e.newline||(e.newline=function(e,t){e=e.substring(0,1048576);var r=new RegExp(p(t)+"([^]*?)"+p(t),"gm"),i=(e=e.replace(r,"")).split("\r"),n=e.split("\n"),s=1<n.length&&n[0].length<i[0].length;if(1===i.length||s)return"\n";for(var a=0,o=0;o<i.length;o++)"\n"===i[o][0]&&a++;return a>=i.length/2?"\r\n":"\r"}(n,h)),i=!1,e.delimiter)b(e.delimiter)&&(e.delimiter=e.delimiter(n),_.meta.delimiter=e.delimiter);else{var u=function(t,r,i,n,s){var o,h,u,d;s=s||[",","\t","|",";",a.RECORD_SEP,a.UNIT_SEP];for(var c=0;c<s.length;c++){var l=s[c],f=0,p=0,m=0;u=void 0;for(var _=new g({comments:n,delimiter:l,newline:r,preview:10}).parse(t),v=0;v<_.data.length;v++)if(i&&k(_.data[v]))m++;else{var y=_.data[v].length;p+=y,void 0!==u?0<y&&(f+=Math.abs(y-u),u=y):u=y}0<_.data.length&&(p/=_.data.length-m),(void 0===h||f<=h)&&(void 0===d||d<p)&&1.99<p&&(h=f,o=l,d=p)}return{successful:!!(e.delimiter=o),bestDelimiter:o}}(n,e.newline,e.skipEmptyLines,e.comments,e.delimitersToGuess);u.successful?e.delimiter=u.bestDelimiter:(i=!0,e.delimiter=a.DefaultDelimiter),_.meta.delimiter=e.delimiter}var d=y(e);return e.preview&&e.header&&d.preview++,t=n,r=new g(d),_=r.parse(t,s,o),E(),l?{meta:{paused:!0}}:_||{meta:{paused:!1}}},this.paused=function(){return l},this.pause=function(){l=!0,r.abort(),t=b(e.chunk)?"":t.substring(r.getCharIndex())},this.resume=function(){u.streamer._halted?(l=!1,u.streamer.parseChunk(t,!0)):setTimeout(u.resume,3)},this.aborted=function(){return f},this.abort=function(){f=!0,r.abort(),_.meta.aborted=!0,b(e.complete)&&e.complete(_),t=""}}function p(e){return e.replace(/[.*+?^${}()|[\]\\]/g,"\\$&")}function g(e){var t,r=(e=e||{}).delimiter,i=e.newline,n=e.comments,s=e.step,o=e.preview,h=e.fastMode,u=t=void 0===e.quoteChar?'"':e.quoteChar;if(void 0!==e.escapeChar&&(u=e.escapeChar),("string"!=typeof r||-1<a.BAD_DELIMITERS.indexOf(r))&&(r=","),n===r)throw new Error("Comment character same as delimiter");!0===n?n="#":("string"!=typeof n||-1<a.BAD_DELIMITERS.indexOf(n))&&(n=!1),"\n"!==i&&"\r"!==i&&"\r\n"!==i&&(i="\n");var d=0,c=!1;this.parse=function(e,a,l){if("string"!=typeof e)throw new Error("Input must be a string");var f=e.length,g=r.length,m=i.length,_=n.length,v=b(s),y=[],k=[],E=[],w=d=0;if(!e)return j();if(h||!1!==h&&-1===e.indexOf(t)){for(var C=e.split(i),x=0;x<C.length;x++){if(E=C[x],d+=E.length,x!==C.length-1)d+=i.length;else if(l)return j();if(!n||E.substring(0,_)!==n){if(v){if(y=[],A(E.split(r)),q(),c)return j()}else A(E.split(r));if(o&&o<=x)return y=y.slice(0,o),j(!0)}}return j()}for(var R=e.indexOf(r,d),S=e.indexOf(i,d),O=new RegExp(p(u)+p(t),"g"),I=e.indexOf(t,d);;)if(e[d]!==t)if(n&&0===E.length&&e.substring(d,d+_)===n){if(-1===S)return j();d=S+m,S=e.indexOf(i,d),R=e.indexOf(r,d)}else{if(-1!==R&&(R<S||-1===S)){if(!(R<I)){E.push(e.substring(d,R)),d=R+g,R=e.indexOf(r,d);continue}var D=U(R,I,S);if(D&&void 0!==D.nextDelim){R=D.nextDelim,I=D.quoteSearch,E.push(e.substring(d,R)),d=R+g,R=e.indexOf(r,d);continue}}if(-1===S)break;if(E.push(e.substring(d,S)),M(S+m),v&&(q(),c))return j();if(o&&y.length>=o)return j(!0)}else for(I=d,d++;;){if(-1===(I=e.indexOf(t,I+1)))return l||k.push({type:"Quotes",code:"MissingQuotes",message:"Quoted field unterminated",row:y.length,index:d}),z();if(I===f-1)return z(e.substring(d,I).replace(O,t));if(t!==u||e[I+1]!==u){if(t===u||0===I||e[I-1]!==u){-1!==R&&R<I+1&&(R=e.indexOf(r,I+1)),-1!==S&&S<I+1&&(S=e.indexOf(i,I+1));var T=F(-1===S?R:Math.min(R,S));if(e[I+1+T]===r){E.push(e.substring(d,I).replace(O,t)),e[d=I+1+T+g]!==t&&(I=e.indexOf(t,d)),R=e.indexOf(r,d),S=e.indexOf(i,d);break}var L=F(S);if(e.substring(I+1+L,I+1+L+m)===i){if(E.push(e.substring(d,I).replace(O,t)),M(I+1+L+m),R=e.indexOf(r,d),I=e.indexOf(t,d),v&&(q(),c))return j();if(o&&y.length>=o)return j(!0);break}k.push({type:"Quotes",code:"InvalidQuotes",message:"Trailing quote on quoted field is malformed",row:y.length,index:d}),I++}}else I++}return z();function A(e){y.push(e),w=d}function F(t){var r=0;if(-1!==t){var i=e.substring(I+1,t);i&&""===i.trim()&&(r=i.length)}return r}function z(t){return l||(void 0===t&&(t=e.substring(d)),E.push(t),d=f,A(E),v&&q()),j()}function M(t){d=t,A(E),E=[],S=e.indexOf(i,d)}function j(e){return{data:y,errors:k,meta:{delimiter:r,linebreak:i,aborted:c,truncated:!!e,cursor:w+(a||0)}}}function q(){s(j()),y=[],k=[]}function U(i,n,s){var a={nextDelim:void 0,quoteSearch:void 0},o=e.indexOf(t,n+1);if(n<i&&i<o&&(o<s||-1===s)){var h=e.indexOf(r,o);if(-1===h)return a;o<h&&(o=e.indexOf(t,o+1)),a=U(h,o,s)}else a={nextDelim:i,quoteSearch:n};return a}},this.abort=function(){c=!0},this.getCharIndex=function(){return d}}function m(e){var t=e.data,r=n[t.workerId],i=!1;if(t.error)r.userError(t.error,t.file);else if(t.results&&t.results.data){var s={abort:function(){i=!0,_(t.workerId,{data:[],errors:[],meta:{aborted:!0}})},pause:v,resume:v};if(b(r.userStep)){for(var a=0;a<t.results.data.length&&(r.userStep({data:t.results.data[a],errors:t.results.errors,meta:t.results.meta},s),!i);a++);delete t.results}else b(r.userChunk)&&(r.userChunk(t.results,s,t.file),delete t.results)}t.finished&&!i&&_(t.workerId,t.results)}function _(e,t){var r=n[e];b(r.userComplete)&&r.userComplete(t),r.terminate(),delete n[e]}function v(){throw new Error("Not implemented.")}function y(e){if("object"!=typeof e||null===e)return e;var t=Array.isArray(e)?[]:{};for(var r in e)t[r]=y(e[r]);return t}function k(e,t){return function(){e.apply(t,arguments)}}function b(e){return"function"==typeof e}return i&&(t.onmessage=function(e){var r=e.data;if(void 0===a.WORKER_ID&&r&&(a.WORKER_ID=r.workerId),"string"==typeof r.input)t.postMessage({workerId:a.WORKER_ID,results:a.parse(r.input,r.config),finished:!0});else if(t.File&&r.input instanceof File||r.input instanceof Object){var i=a.parse(r.input,r.config);i&&t.postMessage({workerId:a.WORKER_ID,results:i,finished:!0})}}),(u.prototype=Object.create(h.prototype)).constructor=u,(d.prototype=Object.create(h.prototype)).constructor=d,(c.prototype=Object.create(c.prototype)).constructor=c,(l.prototype=Object.create(h.prototype)).constructor=l,a})?r.apply(t,[]):r)||(e.exports=i)}},t={};function r(i){if(t[i])return t[i].exports;var n=t[i]={exports:{}};return e[i].call(n.exports,n,n.exports,r),n.exports}(()=>{"use strict";const e=r(460),t=document.getElementById("open-file-button"),i=document.getElementById("save-file-button"),n=document.getElementById("header-check-box");let s,a;function o(e,t,r,n){e.setAttribute("contenteditable","true"),e.dataset.row=r.toString(),e.dataset.col=n.toString(),e.textContent=t,e.addEventListener("input",(e=>{i.classList.add("btn-secondary"),i.classList.remove("btn-nochanges"),a[Number(e.target.dataset.row)][Number(e.target.dataset.col)]=e.target.innerText}))}t.addEventListener("click",(async()=>{[s]=await window.showOpenFilePicker({types:[{accept:{"text/csv":[".csv"]}}]});const t=await s.getFile(),r=await t.text(),i=e.parse(r);0!=i.errors.length&&console.log("Error parsing CSV:",i.errors.map((e=>e.message))),a=i.data,console.log(i),function(e){var t;const r=document.getElementById("table-container");for(;r.hasChildNodes();)null===(t=r.lastChild)||void 0===t||t.remove();const i=n.checked&&e.length>0;if(i){const t=document.createElement("thead");r.appendChild(t);const i=document.createElement("tr");t.appendChild(i);for(let t=0;t<e[0].length;t++){const r=document.createElement("th");o(r,e[0][t],0,t),i.appendChild(r)}r.appendChild(i)}const s=document.createElement("tbody");r.appendChild(s);for(let t=i?1:0;t<e.length;t++){const r=document.createElement("tr");for(let i=0;i<e[t].length;i++){const n=document.createElement("td");o(n,e[t][i],t,i),r.appendChild(n)}s.appendChild(r)}}(a)})),i.addEventListener("click",(async()=>{const t=e.unparse(a);!async function(e,t){const r=await e.createWritable();await r.write(t),await r.close()}(s,t),console.log("File saved"),i.classList.add("btn-nochanges"),i.classList.remove("btn-secondary")}))})()})();
//# sourceMappingURL=index.js.map