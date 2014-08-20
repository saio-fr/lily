/*! jQuery v1.10.2 | (c) 2005, 2013 jQuery Foundation, Inc. | jquery.org/license
*/
(function(e,t){var n,r,i=typeof t,o=e.location,a=e.document,s=a.documentElement,l=e.jQuery,u=e.$,c={},p=[],f="1.10.2",d=p.concat,h=p.push,g=p.slice,m=p.indexOf,y=c.toString,v=c.hasOwnProperty,b=f.trim,x=function(e,t){return new x.fn.init(e,t,r)},w=/[+-]?(?:\d*\.|)\d+(?:[eE][+-]?\d+|)/.source,T=/\S+/g,C=/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g,N=/^(?:\s*(<[\w\W]+>)[^>]*|#([\w-]*))$/,k=/^<(\w+)\s*\/?>(?:<\/\1>|)$/,E=/^[\],:{}\s]*$/,S=/(?:^|:|,)(?:\s*\[)+/g,A=/\\(?:["\\\/bfnrt]|u[\da-fA-F]{4})/g,j=/"[^"\\\r\n]*"|true|false|null|-?(?:\d+\.|)\d+(?:[eE][+-]?\d+|)/g,D=/^-ms-/,L=/-([\da-z])/gi,H=function(e,t){return t.toUpperCase()},q=function(e){(a.addEventListener||"load"===e.type||"complete"===a.readyState)&&(_(),x.ready())},_=function(){a.addEventListener?(a.removeEventListener("DOMContentLoaded",q,!1),e.removeEventListener("load",q,!1)):(a.detachEvent("onreadystatechange",q),e.detachEvent("onload",q))};x.fn=x.prototype={jquery:f,constructor:x,init:function(e,n,r){var i,o;if(!e)return this;if("string"==typeof e){if(i="<"===e.charAt(0)&&">"===e.charAt(e.length-1)&&e.length>=3?[null,e,null]:N.exec(e),!i||!i[1]&&n)return!n||n.jquery?(n||r).find(e):this.constructor(n).find(e);if(i[1]){if(n=n instanceof x?n[0]:n,x.merge(this,x.parseHTML(i[1],n&&n.nodeType?n.ownerDocument||n:a,!0)),k.test(i[1])&&x.isPlainObject(n))for(i in n)x.isFunction(this[i])?this[i](n[i]):this.attr(i,n[i]);return this}if(o=a.getElementById(i[2]),o&&o.parentNode){if(o.id!==i[2])return r.find(e);this.length=1,this[0]=o}return this.context=a,this.selector=e,this}return e.nodeType?(this.context=this[0]=e,this.length=1,this):x.isFunction(e)?r.ready(e):(e.selector!==t&&(this.selector=e.selector,this.context=e.context),x.makeArray(e,this))},selector:"",length:0,toArray:function(){return g.call(this)},get:function(e){return null==e?this.toArray():0>e?this[this.length+e]:this[e]},pushStack:function(e){var t=x.merge(this.constructor(),e);return t.prevObject=this,t.context=this.context,t},each:function(e,t){return x.each(this,e,t)},ready:function(e){return x.ready.promise().done(e),this},slice:function(){return this.pushStack(g.apply(this,arguments))},first:function(){return this.eq(0)},last:function(){return this.eq(-1)},eq:function(e){var t=this.length,n=+e+(0>e?t:0);return this.pushStack(n>=0&&t>n?[this[n]]:[])},map:function(e){return this.pushStack(x.map(this,function(t,n){return e.call(t,n,t)}))},end:function(){return this.prevObject||this.constructor(null)},push:h,sort:[].sort,splice:[].splice},x.fn.init.prototype=x.fn,x.extend=x.fn.extend=function(){var e,n,r,i,o,a,s=arguments[0]||{},l=1,u=arguments.length,c=!1;for("boolean"==typeof s&&(c=s,s=arguments[1]||{},l=2),"object"==typeof s||x.isFunction(s)||(s={}),u===l&&(s=this,--l);u>l;l++)if(null!=(o=arguments[l]))for(i in o)e=s[i],r=o[i],s!==r&&(c&&r&&(x.isPlainObject(r)||(n=x.isArray(r)))?(n?(n=!1,a=e&&x.isArray(e)?e:[]):a=e&&x.isPlainObject(e)?e:{},s[i]=x.extend(c,a,r)):r!==t&&(s[i]=r));return s},x.extend({expando:"jQuery"+(f+Math.random()).replace(/\D/g,""),noConflict:function(t){return e.$===x&&(e.$=u),t&&e.jQuery===x&&(e.jQuery=l),x},isReady:!1,readyWait:1,holdReady:function(e){e?x.readyWait++:x.ready(!0)},ready:function(e){if(e===!0?!--x.readyWait:!x.isReady){if(!a.body)return setTimeout(x.ready);x.isReady=!0,e!==!0&&--x.readyWait>0||(n.resolveWith(a,[x]),x.fn.trigger&&x(a).trigger("ready").off("ready"))}},isFunction:function(e){return"function"===x.type(e)},isArray:Array.isArray||function(e){return"array"===x.type(e)},isWindow:function(e){return null!=e&&e==e.window},isNumeric:function(e){return!isNaN(parseFloat(e))&&isFinite(e)},type:function(e){return null==e?e+"":"object"==typeof e||"function"==typeof e?c[y.call(e)]||"object":typeof e},isPlainObject:function(e){var n;if(!e||"object"!==x.type(e)||e.nodeType||x.isWindow(e))return!1;try{if(e.constructor&&!v.call(e,"constructor")&&!v.call(e.constructor.prototype,"isPrototypeOf"))return!1}catch(r){return!1}if(x.support.ownLast)for(n in e)return v.call(e,n);for(n in e);return n===t||v.call(e,n)},isEmptyObject:function(e){var t;for(t in e)return!1;return!0},error:function(e){throw Error(e)},parseHTML:function(e,t,n){if(!e||"string"!=typeof e)return null;"boolean"==typeof t&&(n=t,t=!1),t=t||a;var r=k.exec(e),i=!n&&[];return r?[t.createElement(r[1])]:(r=x.buildFragment([e],t,i),i&&x(i).remove(),x.merge([],r.childNodes))},parseJSON:function(n){return e.JSON&&e.JSON.parse?e.JSON.parse(n):null===n?n:"string"==typeof n&&(n=x.trim(n),n&&E.test(n.replace(A,"@").replace(j,"]").replace(S,"")))?Function("return "+n)():(x.error("Invalid JSON: "+n),t)},parseXML:function(n){var r,i;if(!n||"string"!=typeof n)return null;try{e.DOMParser?(i=new DOMParser,r=i.parseFromString(n,"text/xml")):(r=new ActiveXObject("Microsoft.XMLDOM"),r.async="false",r.loadXML(n))}catch(o){r=t}return r&&r.documentElement&&!r.getElementsByTagName("parsererror").length||x.error("Invalid XML: "+n),r},noop:function(){},globalEval:function(t){t&&x.trim(t)&&(e.execScript||function(t){e.eval.call(e,t)})(t)},camelCase:function(e){return e.replace(D,"ms-").replace(L,H)},nodeName:function(e,t){return e.nodeName&&e.nodeName.toLowerCase()===t.toLowerCase()},each:function(e,t,n){var r,i=0,o=e.length,a=M(e);if(n){if(a){for(;o>i;i++)if(r=t.apply(e[i],n),r===!1)break}else for(i in e)if(r=t.apply(e[i],n),r===!1)break}else if(a){for(;o>i;i++)if(r=t.call(e[i],i,e[i]),r===!1)break}else for(i in e)if(r=t.call(e[i],i,e[i]),r===!1)break;return e},trim:b&&!b.call("\ufeff\u00a0")?function(e){return null==e?"":b.call(e)}:function(e){return null==e?"":(e+"").replace(C,"")},makeArray:function(e,t){var n=t||[];return null!=e&&(M(Object(e))?x.merge(n,"string"==typeof e?[e]:e):h.call(n,e)),n},inArray:function(e,t,n){var r;if(t){if(m)return m.call(t,e,n);for(r=t.length,n=n?0>n?Math.max(0,r+n):n:0;r>n;n++)if(n in t&&t[n]===e)return n}return-1},merge:function(e,n){var r=n.length,i=e.length,o=0;if("number"==typeof r)for(;r>o;o++)e[i++]=n[o];else while(n[o]!==t)e[i++]=n[o++];return e.length=i,e},grep:function(e,t,n){var r,i=[],o=0,a=e.length;for(n=!!n;a>o;o++)r=!!t(e[o],o),n!==r&&i.push(e[o]);return i},map:function(e,t,n){var r,i=0,o=e.length,a=M(e),s=[];if(a)for(;o>i;i++)r=t(e[i],i,n),null!=r&&(s[s.length]=r);else for(i in e)r=t(e[i],i,n),null!=r&&(s[s.length]=r);return d.apply([],s)},guid:1,proxy:function(e,n){var r,i,o;return"string"==typeof n&&(o=e[n],n=e,e=o),x.isFunction(e)?(r=g.call(arguments,2),i=function(){return e.apply(n||this,r.concat(g.call(arguments)))},i.guid=e.guid=e.guid||x.guid++,i):t},access:function(e,n,r,i,o,a,s){var l=0,u=e.length,c=null==r;if("object"===x.type(r)){o=!0;for(l in r)x.access(e,n,l,r[l],!0,a,s)}else if(i!==t&&(o=!0,x.isFunction(i)||(s=!0),c&&(s?(n.call(e,i),n=null):(c=n,n=function(e,t,n){return c.call(x(e),n)})),n))for(;u>l;l++)n(e[l],r,s?i:i.call(e[l],l,n(e[l],r)));return o?e:c?n.call(e):u?n(e[0],r):a},now:function(){return(new Date).getTime()},swap:function(e,t,n,r){var i,o,a={};for(o in t)a[o]=e.style[o],e.style[o]=t[o];i=n.apply(e,r||[]);for(o in t)e.style[o]=a[o];return i}}),x.ready.promise=function(t){if(!n)if(n=x.Deferred(),"complete"===a.readyState)setTimeout(x.ready);else if(a.addEventListener)a.addEventListener("DOMContentLoaded",q,!1),e.addEventListener("load",q,!1);else{a.attachEvent("onreadystatechange",q),e.attachEvent("onload",q);var r=!1;try{r=null==e.frameElement&&a.documentElement}catch(i){}r&&r.doScroll&&function o(){if(!x.isReady){try{r.doScroll("left")}catch(e){return setTimeout(o,50)}_(),x.ready()}}()}return n.promise(t)},x.each("Boolean Number String Function Array Date RegExp Object Error".split(" "),function(e,t){c["[object "+t+"]"]=t.toLowerCase()});function M(e){var t=e.length,n=x.type(e);return x.isWindow(e)?!1:1===e.nodeType&&t?!0:"array"===n||"function"!==n&&(0===t||"number"==typeof t&&t>0&&t-1 in e)}r=x(a),function(e,t){var n,r,i,o,a,s,l,u,c,p,f,d,h,g,m,y,v,b="sizzle"+-new Date,w=e.document,T=0,C=0,N=st(),k=st(),E=st(),S=!1,A=function(e,t){return e===t?(S=!0,0):0},j=typeof t,D=1<<31,L={}.hasOwnProperty,H=[],q=H.pop,_=H.push,M=H.push,O=H.slice,F=H.indexOf||function(e){var t=0,n=this.length;for(;n>t;t++)if(this[t]===e)return t;return-1},B="checked|selected|async|autofocus|autoplay|controls|defer|disabled|hidden|ismap|loop|multiple|open|readonly|required|scoped",P="[\\x20\\t\\r\\n\\f]",R="(?:\\\\.|[\\w-]|[^\\x00-\\xa0])+",W=R.replace("w","w#"),$="\\["+P+"*("+R+")"+P+"*(?:([*^$|!~]?=)"+P+"*(?:(['\"])((?:\\\\.|[^\\\\])*?)\\3|("+W+")|)|)"+P+"*\\]",I=":("+R+")(?:\\(((['\"])((?:\\\\.|[^\\\\])*?)\\3|((?:\\\\.|[^\\\\()[\\]]|"+$.replace(3,8)+")*)|.*)\\)|)",z=RegExp("^"+P+"+|((?:^|[^\\\\])(?:\\\\.)*)"+P+"+$","g"),X=RegExp("^"+P+"*,"+P+"*"),U=RegExp("^"+P+"*([>+~]|"+P+")"+P+"*"),V=RegExp(P+"*[+~]"),Y=RegExp("="+P+"*([^\\]'\"]*)"+P+"*\\]","g"),J=RegExp(I),G=RegExp("^"+W+"$"),Q={ID:RegExp("^#("+R+")"),CLASS:RegExp("^\\.("+R+")"),TAG:RegExp("^("+R.replace("w","w*")+")"),ATTR:RegExp("^"+$),PSEUDO:RegExp("^"+I),CHILD:RegExp("^:(only|first|last|nth|nth-last)-(child|of-type)(?:\\("+P+"*(even|odd|(([+-]|)(\\d*)n|)"+P+"*(?:([+-]|)"+P+"*(\\d+)|))"+P+"*\\)|)","i"),bool:RegExp("^(?:"+B+")$","i"),needsContext:RegExp("^"+P+"*[>+~]|:(even|odd|eq|gt|lt|nth|first|last)(?:\\("+P+"*((?:-\\d)?\\d*)"+P+"*\\)|)(?=[^-]|$)","i")},K=/^[^{]+\{\s*\[native \w/,Z=/^(?:#([\w-]+)|(\w+)|\.([\w-]+))$/,et=/^(?:input|select|textarea|button)$/i,tt=/^h\d$/i,nt=/'|\\/g,rt=RegExp("\\\\([\\da-f]{1,6}"+P+"?|("+P+")|.)","ig"),it=function(e,t,n){var r="0x"+t-65536;return r!==r||n?t:0>r?String.fromCharCode(r+65536):String.fromCharCode(55296|r>>10,56320|1023&r)};try{M.apply(H=O.call(w.childNodes),w.childNodes),H[w.childNodes.length].nodeType}catch(ot){M={apply:H.length?function(e,t){_.apply(e,O.call(t))}:function(e,t){var n=e.length,r=0;while(e[n++]=t[r++]);e.length=n-1}}}function at(e,t,n,i){var o,a,s,l,u,c,d,m,y,x;if((t?t.ownerDocument||t:w)!==f&&p(t),t=t||f,n=n||[],!e||"string"!=typeof e)return n;if(1!==(l=t.nodeType)&&9!==l)return[];if(h&&!i){if(o=Z.exec(e))if(s=o[1]){if(9===l){if(a=t.getElementById(s),!a||!a.parentNode)return n;if(a.id===s)return n.push(a),n}else if(t.ownerDocument&&(a=t.ownerDocument.getElementById(s))&&v(t,a)&&a.id===s)return n.push(a),n}else{if(o[2])return M.apply(n,t.getElementsByTagName(e)),n;if((s=o[3])&&r.getElementsByClassName&&t.getElementsByClassName)return M.apply(n,t.getElementsByClassName(s)),n}if(r.qsa&&(!g||!g.test(e))){if(m=d=b,y=t,x=9===l&&e,1===l&&"object"!==t.nodeName.toLowerCase()){c=mt(e),(d=t.getAttribute("id"))?m=d.replace(nt,"\\$&"):t.setAttribute("id",m),m="[id='"+m+"'] ",u=c.length;while(u--)c[u]=m+yt(c[u]);y=V.test(e)&&t.parentNode||t,x=c.join(",")}if(x)try{return M.apply(n,y.querySelectorAll(x)),n}catch(T){}finally{d||t.removeAttribute("id")}}}return kt(e.replace(z,"$1"),t,n,i)}function st(){var e=[];function t(n,r){return e.push(n+=" ")>o.cacheLength&&delete t[e.shift()],t[n]=r}return t}function lt(e){return e[b]=!0,e}function ut(e){var t=f.createElement("div");try{return!!e(t)}catch(n){return!1}finally{t.parentNode&&t.parentNode.removeChild(t),t=null}}function ct(e,t){var n=e.split("|"),r=e.length;while(r--)o.attrHandle[n[r]]=t}function pt(e,t){var n=t&&e,r=n&&1===e.nodeType&&1===t.nodeType&&(~t.sourceIndex||D)-(~e.sourceIndex||D);if(r)return r;if(n)while(n=n.nextSibling)if(n===t)return-1;return e?1:-1}function ft(e){return function(t){var n=t.nodeName.toLowerCase();return"input"===n&&t.type===e}}function dt(e){return function(t){var n=t.nodeName.toLowerCase();return("input"===n||"button"===n)&&t.type===e}}function ht(e){return lt(function(t){return t=+t,lt(function(n,r){var i,o=e([],n.length,t),a=o.length;while(a--)n[i=o[a]]&&(n[i]=!(r[i]=n[i]))})})}s=at.isXML=function(e){var t=e&&(e.ownerDocument||e).documentElement;return t?"HTML"!==t.nodeName:!1},r=at.support={},p=at.setDocument=function(e){var n=e?e.ownerDocument||e:w,i=n.defaultView;return n!==f&&9===n.nodeType&&n.documentElement?(f=n,d=n.documentElement,h=!s(n),i&&i.attachEvent&&i!==i.top&&i.attachEvent("onbeforeunload",function(){p()}),r.attributes=ut(function(e){return e.className="i",!e.getAttribute("className")}),r.getElementsByTagName=ut(function(e){return e.appendChild(n.createComment("")),!e.getElementsByTagName("*").length}),r.getElementsByClassName=ut(function(e){return e.innerHTML="<div class='a'></div><div class='a i'></div>",e.firstChild.className="i",2===e.getElementsByClassName("i").length}),r.getById=ut(function(e){return d.appendChild(e).id=b,!n.getElementsByName||!n.getElementsByName(b).length}),r.getById?(o.find.ID=function(e,t){if(typeof t.getElementById!==j&&h){var n=t.getElementById(e);return n&&n.parentNode?[n]:[]}},o.filter.ID=function(e){var t=e.replace(rt,it);return function(e){return e.getAttribute("id")===t}}):(delete o.find.ID,o.filter.ID=function(e){var t=e.replace(rt,it);return function(e){var n=typeof e.getAttributeNode!==j&&e.getAttributeNode("id");return n&&n.value===t}}),o.find.TAG=r.getElementsByTagName?function(e,n){return typeof n.getElementsByTagName!==j?n.getElementsByTagName(e):t}:function(e,t){var n,r=[],i=0,o=t.getElementsByTagName(e);if("*"===e){while(n=o[i++])1===n.nodeType&&r.push(n);return r}return o},o.find.CLASS=r.getElementsByClassName&&function(e,n){return typeof n.getElementsByClassName!==j&&h?n.getElementsByClassName(e):t},m=[],g=[],(r.qsa=K.test(n.querySelectorAll))&&(ut(function(e){e.innerHTML="<select><option selected=''></option></select>",e.querySelectorAll("[selected]").length||g.push("\\["+P+"*(?:value|"+B+")"),e.querySelectorAll(":checked").length||g.push(":checked")}),ut(function(e){var t=n.createElement("input");t.setAttribute("type","hidden"),e.appendChild(t).setAttribute("t",""),e.querySelectorAll("[t^='']").length&&g.push("[*^$]="+P+"*(?:''|\"\")"),e.querySelectorAll(":enabled").length||g.push(":enabled",":disabled"),e.querySelectorAll("*,:x"),g.push(",.*:")})),(r.matchesSelector=K.test(y=d.webkitMatchesSelector||d.mozMatchesSelector||d.oMatchesSelector||d.msMatchesSelector))&&ut(function(e){r.disconnectedMatch=y.call(e,"div"),y.call(e,"[s!='']:x"),m.push("!=",I)}),g=g.length&&RegExp(g.join("|")),m=m.length&&RegExp(m.join("|")),v=K.test(d.contains)||d.compareDocumentPosition?function(e,t){var n=9===e.nodeType?e.documentElement:e,r=t&&t.parentNode;return e===r||!(!r||1!==r.nodeType||!(n.contains?n.contains(r):e.compareDocumentPosition&&16&e.compareDocumentPosition(r)))}:function(e,t){if(t)while(t=t.parentNode)if(t===e)return!0;return!1},A=d.compareDocumentPosition?function(e,t){if(e===t)return S=!0,0;var i=t.compareDocumentPosition&&e.compareDocumentPosition&&e.compareDocumentPosition(t);return i?1&i||!r.sortDetached&&t.compareDocumentPosition(e)===i?e===n||v(w,e)?-1:t===n||v(w,t)?1:c?F.call(c,e)-F.call(c,t):0:4&i?-1:1:e.compareDocumentPosition?-1:1}:function(e,t){var r,i=0,o=e.parentNode,a=t.parentNode,s=[e],l=[t];if(e===t)return S=!0,0;if(!o||!a)return e===n?-1:t===n?1:o?-1:a?1:c?F.call(c,e)-F.call(c,t):0;if(o===a)return pt(e,t);r=e;while(r=r.parentNode)s.unshift(r);r=t;while(r=r.parentNode)l.unshift(r);while(s[i]===l[i])i++;return i?pt(s[i],l[i]):s[i]===w?-1:l[i]===w?1:0},n):f},at.matches=function(e,t){return at(e,null,null,t)},at.matchesSelector=function(e,t){if((e.ownerDocument||e)!==f&&p(e),t=t.replace(Y,"='$1']"),!(!r.matchesSelector||!h||m&&m.test(t)||g&&g.test(t)))try{var n=y.call(e,t);if(n||r.disconnectedMatch||e.document&&11!==e.document.nodeType)return n}catch(i){}return at(t,f,null,[e]).length>0},at.contains=function(e,t){return(e.ownerDocument||e)!==f&&p(e),v(e,t)},at.attr=function(e,n){(e.ownerDocument||e)!==f&&p(e);var i=o.attrHandle[n.toLowerCase()],a=i&&L.call(o.attrHandle,n.toLowerCase())?i(e,n,!h):t;return a===t?r.attributes||!h?e.getAttribute(n):(a=e.getAttributeNode(n))&&a.specified?a.value:null:a},at.error=function(e){throw Error("Syntax error, unrecognized expression: "+e)},at.uniqueSort=function(e){var t,n=[],i=0,o=0;if(S=!r.detectDuplicates,c=!r.sortStable&&e.slice(0),e.sort(A),S){while(t=e[o++])t===e[o]&&(i=n.push(o));while(i--)e.splice(n[i],1)}return e},a=at.getText=function(e){var t,n="",r=0,i=e.nodeType;if(i){if(1===i||9===i||11===i){if("string"==typeof e.textContent)return e.textContent;for(e=e.firstChild;e;e=e.nextSibling)n+=a(e)}else if(3===i||4===i)return e.nodeValue}else for(;t=e[r];r++)n+=a(t);return n},o=at.selectors={cacheLength:50,createPseudo:lt,match:Q,attrHandle:{},find:{},relative:{">":{dir:"parentNode",first:!0}," ":{dir:"parentNode"},"+":{dir:"previousSibling",first:!0},"~":{dir:"previousSibling"}},preFilter:{ATTR:function(e){return e[1]=e[1].replace(rt,it),e[3]=(e[4]||e[5]||"").replace(rt,it),"~="===e[2]&&(e[3]=" "+e[3]+" "),e.slice(0,4)},CHILD:function(e){return e[1]=e[1].toLowerCase(),"nth"===e[1].slice(0,3)?(e[3]||at.error(e[0]),e[4]=+(e[4]?e[5]+(e[6]||1):2*("even"===e[3]||"odd"===e[3])),e[5]=+(e[7]+e[8]||"odd"===e[3])):e[3]&&at.error(e[0]),e},PSEUDO:function(e){var n,r=!e[5]&&e[2];return Q.CHILD.test(e[0])?null:(e[3]&&e[4]!==t?e[2]=e[4]:r&&J.test(r)&&(n=mt(r,!0))&&(n=r.indexOf(")",r.length-n)-r.length)&&(e[0]=e[0].slice(0,n),e[2]=r.slice(0,n)),e.slice(0,3))}},filter:{TAG:function(e){var t=e.replace(rt,it).toLowerCase();return"*"===e?function(){return!0}:function(e){return e.nodeName&&e.nodeName.toLowerCase()===t}},CLASS:function(e){var t=N[e+" "];return t||(t=RegExp("(^|"+P+")"+e+"("+P+"|$)"))&&N(e,function(e){return t.test("string"==typeof e.className&&e.className||typeof e.getAttribute!==j&&e.getAttribute("class")||"")})},ATTR:function(e,t,n){return function(r){var i=at.attr(r,e);return null==i?"!="===t:t?(i+="","="===t?i===n:"!="===t?i!==n:"^="===t?n&&0===i.indexOf(n):"*="===t?n&&i.indexOf(n)>-1:"$="===t?n&&i.slice(-n.length)===n:"~="===t?(" "+i+" ").indexOf(n)>-1:"|="===t?i===n||i.slice(0,n.length+1)===n+"-":!1):!0}},CHILD:function(e,t,n,r,i){var o="nth"!==e.slice(0,3),a="last"!==e.slice(-4),s="of-type"===t;return 1===r&&0===i?function(e){return!!e.parentNode}:function(t,n,l){var u,c,p,f,d,h,g=o!==a?"nextSibling":"previousSibling",m=t.parentNode,y=s&&t.nodeName.toLowerCase(),v=!l&&!s;if(m){if(o){while(g){p=t;while(p=p[g])if(s?p.nodeName.toLowerCase()===y:1===p.nodeType)return!1;h=g="only"===e&&!h&&"nextSibling"}return!0}if(h=[a?m.firstChild:m.lastChild],a&&v){c=m[b]||(m[b]={}),u=c[e]||[],d=u[0]===T&&u[1],f=u[0]===T&&u[2],p=d&&m.childNodes[d];while(p=++d&&p&&p[g]||(f=d=0)||h.pop())if(1===p.nodeType&&++f&&p===t){c[e]=[T,d,f];break}}else if(v&&(u=(t[b]||(t[b]={}))[e])&&u[0]===T)f=u[1];else while(p=++d&&p&&p[g]||(f=d=0)||h.pop())if((s?p.nodeName.toLowerCase()===y:1===p.nodeType)&&++f&&(v&&((p[b]||(p[b]={}))[e]=[T,f]),p===t))break;return f-=i,f===r||0===f%r&&f/r>=0}}},PSEUDO:function(e,t){var n,r=o.pseudos[e]||o.setFilters[e.toLowerCase()]||at.error("unsupported pseudo: "+e);return r[b]?r(t):r.length>1?(n=[e,e,"",t],o.setFilters.hasOwnProperty(e.toLowerCase())?lt(function(e,n){var i,o=r(e,t),a=o.length;while(a--)i=F.call(e,o[a]),e[i]=!(n[i]=o[a])}):function(e){return r(e,0,n)}):r}},pseudos:{not:lt(function(e){var t=[],n=[],r=l(e.replace(z,"$1"));return r[b]?lt(function(e,t,n,i){var o,a=r(e,null,i,[]),s=e.length;while(s--)(o=a[s])&&(e[s]=!(t[s]=o))}):function(e,i,o){return t[0]=e,r(t,null,o,n),!n.pop()}}),has:lt(function(e){return function(t){return at(e,t).length>0}}),contains:lt(function(e){return function(t){return(t.textContent||t.innerText||a(t)).indexOf(e)>-1}}),lang:lt(function(e){return G.test(e||"")||at.error("unsupported lang: "+e),e=e.replace(rt,it).toLowerCase(),function(t){var n;do if(n=h?t.lang:t.getAttribute("xml:lang")||t.getAttribute("lang"))return n=n.toLowerCase(),n===e||0===n.indexOf(e+"-");while((t=t.parentNode)&&1===t.nodeType);return!1}}),target:function(t){var n=e.location&&e.location.hash;return n&&n.slice(1)===t.id},root:function(e){return e===d},focus:function(e){return e===f.activeElement&&(!f.hasFocus||f.hasFocus())&&!!(e.type||e.href||~e.tabIndex)},enabled:function(e){return e.disabled===!1},disabled:function(e){return e.disabled===!0},checked:function(e){var t=e.nodeName.toLowerCase();return"input"===t&&!!e.checked||"option"===t&&!!e.selected},selected:function(e){return e.parentNode&&e.parentNode.selectedIndex,e.selected===!0},empty:function(e){for(e=e.firstChild;e;e=e.nextSibling)if(e.nodeName>"@"||3===e.nodeType||4===e.nodeType)return!1;return!0},parent:function(e){return!o.pseudos.empty(e)},header:function(e){return tt.test(e.nodeName)},input:function(e){return et.test(e.nodeName)},button:function(e){var t=e.nodeName.toLowerCase();return"input"===t&&"button"===e.type||"button"===t},text:function(e){var t;return"input"===e.nodeName.toLowerCase()&&"text"===e.type&&(null==(t=e.getAttribute("type"))||t.toLowerCase()===e.type)},first:ht(function(){return[0]}),last:ht(function(e,t){return[t-1]}),eq:ht(function(e,t,n){return[0>n?n+t:n]}),even:ht(function(e,t){var n=0;for(;t>n;n+=2)e.push(n);return e}),odd:ht(function(e,t){var n=1;for(;t>n;n+=2)e.push(n);return e}),lt:ht(function(e,t,n){var r=0>n?n+t:n;for(;--r>=0;)e.push(r);return e}),gt:ht(function(e,t,n){var r=0>n?n+t:n;for(;t>++r;)e.push(r);return e})}},o.pseudos.nth=o.pseudos.eq;for(n in{radio:!0,checkbox:!0,file:!0,password:!0,image:!0})o.pseudos[n]=ft(n);for(n in{submit:!0,reset:!0})o.pseudos[n]=dt(n);function gt(){}gt.prototype=o.filters=o.pseudos,o.setFilters=new gt;function mt(e,t){var n,r,i,a,s,l,u,c=k[e+" "];if(c)return t?0:c.slice(0);s=e,l=[],u=o.preFilter;while(s){(!n||(r=X.exec(s)))&&(r&&(s=s.slice(r[0].length)||s),l.push(i=[])),n=!1,(r=U.exec(s))&&(n=r.shift(),i.push({value:n,type:r[0].replace(z," ")}),s=s.slice(n.length));for(a in o.filter)!(r=Q[a].exec(s))||u[a]&&!(r=u[a](r))||(n=r.shift(),i.push({value:n,type:a,matches:r}),s=s.slice(n.length));if(!n)break}return t?s.length:s?at.error(e):k(e,l).slice(0)}function yt(e){var t=0,n=e.length,r="";for(;n>t;t++)r+=e[t].value;return r}function vt(e,t,n){var r=t.dir,o=n&&"parentNode"===r,a=C++;return t.first?function(t,n,i){while(t=t[r])if(1===t.nodeType||o)return e(t,n,i)}:function(t,n,s){var l,u,c,p=T+" "+a;if(s){while(t=t[r])if((1===t.nodeType||o)&&e(t,n,s))return!0}else while(t=t[r])if(1===t.nodeType||o)if(c=t[b]||(t[b]={}),(u=c[r])&&u[0]===p){if((l=u[1])===!0||l===i)return l===!0}else if(u=c[r]=[p],u[1]=e(t,n,s)||i,u[1]===!0)return!0}}function bt(e){return e.length>1?function(t,n,r){var i=e.length;while(i--)if(!e[i](t,n,r))return!1;return!0}:e[0]}function xt(e,t,n,r,i){var o,a=[],s=0,l=e.length,u=null!=t;for(;l>s;s++)(o=e[s])&&(!n||n(o,r,i))&&(a.push(o),u&&t.push(s));return a}function wt(e,t,n,r,i,o){return r&&!r[b]&&(r=wt(r)),i&&!i[b]&&(i=wt(i,o)),lt(function(o,a,s,l){var u,c,p,f=[],d=[],h=a.length,g=o||Nt(t||"*",s.nodeType?[s]:s,[]),m=!e||!o&&t?g:xt(g,f,e,s,l),y=n?i||(o?e:h||r)?[]:a:m;if(n&&n(m,y,s,l),r){u=xt(y,d),r(u,[],s,l),c=u.length;while(c--)(p=u[c])&&(y[d[c]]=!(m[d[c]]=p))}if(o){if(i||e){if(i){u=[],c=y.length;while(c--)(p=y[c])&&u.push(m[c]=p);i(null,y=[],u,l)}c=y.length;while(c--)(p=y[c])&&(u=i?F.call(o,p):f[c])>-1&&(o[u]=!(a[u]=p))}}else y=xt(y===a?y.splice(h,y.length):y),i?i(null,a,y,l):M.apply(a,y)})}function Tt(e){var t,n,r,i=e.length,a=o.relative[e[0].type],s=a||o.relative[" "],l=a?1:0,c=vt(function(e){return e===t},s,!0),p=vt(function(e){return F.call(t,e)>-1},s,!0),f=[function(e,n,r){return!a&&(r||n!==u)||((t=n).nodeType?c(e,n,r):p(e,n,r))}];for(;i>l;l++)if(n=o.relative[e[l].type])f=[vt(bt(f),n)];else{if(n=o.filter[e[l].type].apply(null,e[l].matches),n[b]){for(r=++l;i>r;r++)if(o.relative[e[r].type])break;return wt(l>1&&bt(f),l>1&&yt(e.slice(0,l-1).concat({value:" "===e[l-2].type?"*":""})).replace(z,"$1"),n,r>l&&Tt(e.slice(l,r)),i>r&&Tt(e=e.slice(r)),i>r&&yt(e))}f.push(n)}return bt(f)}function Ct(e,t){var n=0,r=t.length>0,a=e.length>0,s=function(s,l,c,p,d){var h,g,m,y=[],v=0,b="0",x=s&&[],w=null!=d,C=u,N=s||a&&o.find.TAG("*",d&&l.parentNode||l),k=T+=null==C?1:Math.random()||.1;for(w&&(u=l!==f&&l,i=n);null!=(h=N[b]);b++){if(a&&h){g=0;while(m=e[g++])if(m(h,l,c)){p.push(h);break}w&&(T=k,i=++n)}r&&((h=!m&&h)&&v--,s&&x.push(h))}if(v+=b,r&&b!==v){g=0;while(m=t[g++])m(x,y,l,c);if(s){if(v>0)while(b--)x[b]||y[b]||(y[b]=q.call(p));y=xt(y)}M.apply(p,y),w&&!s&&y.length>0&&v+t.length>1&&at.uniqueSort(p)}return w&&(T=k,u=C),x};return r?lt(s):s}l=at.compile=function(e,t){var n,r=[],i=[],o=E[e+" "];if(!o){t||(t=mt(e)),n=t.length;while(n--)o=Tt(t[n]),o[b]?r.push(o):i.push(o);o=E(e,Ct(i,r))}return o};function Nt(e,t,n){var r=0,i=t.length;for(;i>r;r++)at(e,t[r],n);return n}function kt(e,t,n,i){var a,s,u,c,p,f=mt(e);if(!i&&1===f.length){if(s=f[0]=f[0].slice(0),s.length>2&&"ID"===(u=s[0]).type&&r.getById&&9===t.nodeType&&h&&o.relative[s[1].type]){if(t=(o.find.ID(u.matches[0].replace(rt,it),t)||[])[0],!t)return n;e=e.slice(s.shift().value.length)}a=Q.needsContext.test(e)?0:s.length;while(a--){if(u=s[a],o.relative[c=u.type])break;if((p=o.find[c])&&(i=p(u.matches[0].replace(rt,it),V.test(s[0].type)&&t.parentNode||t))){if(s.splice(a,1),e=i.length&&yt(s),!e)return M.apply(n,i),n;break}}}return l(e,f)(i,t,!h,n,V.test(e)),n}r.sortStable=b.split("").sort(A).join("")===b,r.detectDuplicates=S,p(),r.sortDetached=ut(function(e){return 1&e.compareDocumentPosition(f.createElement("div"))}),ut(function(e){return e.innerHTML="<a href='#'></a>","#"===e.firstChild.getAttribute("href")})||ct("type|href|height|width",function(e,n,r){return r?t:e.getAttribute(n,"type"===n.toLowerCase()?1:2)}),r.attributes&&ut(function(e){return e.innerHTML="<input/>",e.firstChild.setAttribute("value",""),""===e.firstChild.getAttribute("value")})||ct("value",function(e,n,r){return r||"input"!==e.nodeName.toLowerCase()?t:e.defaultValue}),ut(function(e){return null==e.getAttribute("disabled")})||ct(B,function(e,n,r){var i;return r?t:(i=e.getAttributeNode(n))&&i.specified?i.value:e[n]===!0?n.toLowerCase():null}),x.find=at,x.expr=at.selectors,x.expr[":"]=x.expr.pseudos,x.unique=at.uniqueSort,x.text=at.getText,x.isXMLDoc=at.isXML,x.contains=at.contains}(e);var O={};function F(e){var t=O[e]={};return x.each(e.match(T)||[],function(e,n){t[n]=!0}),t}x.Callbacks=function(e){e="string"==typeof e?O[e]||F(e):x.extend({},e);var n,r,i,o,a,s,l=[],u=!e.once&&[],c=function(t){for(r=e.memory&&t,i=!0,a=s||0,s=0,o=l.length,n=!0;l&&o>a;a++)if(l[a].apply(t[0],t[1])===!1&&e.stopOnFalse){r=!1;break}n=!1,l&&(u?u.length&&c(u.shift()):r?l=[]:p.disable())},p={add:function(){if(l){var t=l.length;(function i(t){x.each(t,function(t,n){var r=x.type(n);"function"===r?e.unique&&p.has(n)||l.push(n):n&&n.length&&"string"!==r&&i(n)})})(arguments),n?o=l.length:r&&(s=t,c(r))}return this},remove:function(){return l&&x.each(arguments,function(e,t){var r;while((r=x.inArray(t,l,r))>-1)l.splice(r,1),n&&(o>=r&&o--,a>=r&&a--)}),this},has:function(e){return e?x.inArray(e,l)>-1:!(!l||!l.length)},empty:function(){return l=[],o=0,this},disable:function(){return l=u=r=t,this},disabled:function(){return!l},lock:function(){return u=t,r||p.disable(),this},locked:function(){return!u},fireWith:function(e,t){return!l||i&&!u||(t=t||[],t=[e,t.slice?t.slice():t],n?u.push(t):c(t)),this},fire:function(){return p.fireWith(this,arguments),this},fired:function(){return!!i}};return p},x.extend({Deferred:function(e){var t=[["resolve","done",x.Callbacks("once memory"),"resolved"],["reject","fail",x.Callbacks("once memory"),"rejected"],["notify","progress",x.Callbacks("memory")]],n="pending",r={state:function(){return n},always:function(){return i.done(arguments).fail(arguments),this},then:function(){var e=arguments;return x.Deferred(function(n){x.each(t,function(t,o){var a=o[0],s=x.isFunction(e[t])&&e[t];i[o[1]](function(){var e=s&&s.apply(this,arguments);e&&x.isFunction(e.promise)?e.promise().done(n.resolve).fail(n.reject).progress(n.notify):n[a+"With"](this===r?n.promise():this,s?[e]:arguments)})}),e=null}).promise()},promise:function(e){return null!=e?x.extend(e,r):r}},i={};return r.pipe=r.then,x.each(t,function(e,o){var a=o[2],s=o[3];r[o[1]]=a.add,s&&a.add(function(){n=s},t[1^e][2].disable,t[2][2].lock),i[o[0]]=function(){return i[o[0]+"With"](this===i?r:this,arguments),this},i[o[0]+"With"]=a.fireWith}),r.promise(i),e&&e.call(i,i),i},when:function(e){var t=0,n=g.call(arguments),r=n.length,i=1!==r||e&&x.isFunction(e.promise)?r:0,o=1===i?e:x.Deferred(),a=function(e,t,n){return function(r){t[e]=this,n[e]=arguments.length>1?g.call(arguments):r,n===s?o.notifyWith(t,n):--i||o.resolveWith(t,n)}},s,l,u;if(r>1)for(s=Array(r),l=Array(r),u=Array(r);r>t;t++)n[t]&&x.isFunction(n[t].promise)?n[t].promise().done(a(t,u,n)).fail(o.reject).progress(a(t,l,s)):--i;return i||o.resolveWith(u,n),o.promise()}}),x.support=function(t){var n,r,o,s,l,u,c,p,f,d=a.createElement("div");if(d.setAttribute("className","t"),d.innerHTML="  <link/><table></table><a href='/a'>a</a><input type='checkbox'/>",n=d.getElementsByTagName("*")||[],r=d.getElementsByTagName("a")[0],!r||!r.style||!n.length)return t;s=a.createElement("select"),u=s.appendChild(a.createElement("option")),o=d.getElementsByTagName("input")[0],r.style.cssText="top:1px;float:left;opacity:.5",t.getSetAttribute="t"!==d.className,t.leadingWhitespace=3===d.firstChild.nodeType,t.tbody=!d.getElementsByTagName("tbody").length,t.htmlSerialize=!!d.getElementsByTagName("link").length,t.style=/top/.test(r.getAttribute("style")),t.hrefNormalized="/a"===r.getAttribute("href"),t.opacity=/^0.5/.test(r.style.opacity),t.cssFloat=!!r.style.cssFloat,t.checkOn=!!o.value,t.optSelected=u.selected,t.enctype=!!a.createElement("form").enctype,t.html5Clone="<:nav></:nav>"!==a.createElement("nav").cloneNode(!0).outerHTML,t.inlineBlockNeedsLayout=!1,t.shrinkWrapBlocks=!1,t.pixelPosition=!1,t.deleteExpando=!0,t.noCloneEvent=!0,t.reliableMarginRight=!0,t.boxSizingReliable=!0,o.checked=!0,t.noCloneChecked=o.cloneNode(!0).checked,s.disabled=!0,t.optDisabled=!u.disabled;try{delete d.test}catch(h){t.deleteExpando=!1}o=a.createElement("input"),o.setAttribute("value",""),t.input=""===o.getAttribute("value"),o.value="t",o.setAttribute("type","radio"),t.radioValue="t"===o.value,o.setAttribute("checked","t"),o.setAttribute("name","t"),l=a.createDocumentFragment(),l.appendChild(o),t.appendChecked=o.checked,t.checkClone=l.cloneNode(!0).cloneNode(!0).lastChild.checked,d.attachEvent&&(d.attachEvent("onclick",function(){t.noCloneEvent=!1}),d.cloneNode(!0).click());for(f in{submit:!0,change:!0,focusin:!0})d.setAttribute(c="on"+f,"t"),t[f+"Bubbles"]=c in e||d.attributes[c].expando===!1;d.style.backgroundClip="content-box",d.cloneNode(!0).style.backgroundClip="",t.clearCloneStyle="content-box"===d.style.backgroundClip;for(f in x(t))break;return t.ownLast="0"!==f,x(function(){var n,r,o,s="padding:0;margin:0;border:0;display:block;box-sizing:content-box;-moz-box-sizing:content-box;-webkit-box-sizing:content-box;",l=a.getElementsByTagName("body")[0];l&&(n=a.createElement("div"),n.style.cssText="border:0;width:0;height:0;position:absolute;top:0;left:-9999px;margin-top:1px",l.appendChild(n).appendChild(d),d.innerHTML="<table><tr><td></td><td>t</td></tr></table>",o=d.getElementsByTagName("td"),o[0].style.cssText="padding:0;margin:0;border:0;display:none",p=0===o[0].offsetHeight,o[0].style.display="",o[1].style.display="none",t.reliableHiddenOffsets=p&&0===o[0].offsetHeight,d.innerHTML="",d.style.cssText="box-sizing:border-box;-moz-box-sizing:border-box;-webkit-box-sizing:border-box;padding:1px;border:1px;display:block;width:4px;margin-top:1%;position:absolute;top:1%;",x.swap(l,null!=l.style.zoom?{zoom:1}:{},function(){t.boxSizing=4===d.offsetWidth}),e.getComputedStyle&&(t.pixelPosition="1%"!==(e.getComputedStyle(d,null)||{}).top,t.boxSizingReliable="4px"===(e.getComputedStyle(d,null)||{width:"4px"}).width,r=d.appendChild(a.createElement("div")),r.style.cssText=d.style.cssText=s,r.style.marginRight=r.style.width="0",d.style.width="1px",t.reliableMarginRight=!parseFloat((e.getComputedStyle(r,null)||{}).marginRight)),typeof d.style.zoom!==i&&(d.innerHTML="",d.style.cssText=s+"width:1px;padding:1px;display:inline;zoom:1",t.inlineBlockNeedsLayout=3===d.offsetWidth,d.style.display="block",d.innerHTML="<div></div>",d.firstChild.style.width="5px",t.shrinkWrapBlocks=3!==d.offsetWidth,t.inlineBlockNeedsLayout&&(l.style.zoom=1)),l.removeChild(n),n=d=o=r=null)}),n=s=l=u=r=o=null,t
}({});var B=/(?:\{[\s\S]*\}|\[[\s\S]*\])$/,P=/([A-Z])/g;function R(e,n,r,i){if(x.acceptData(e)){var o,a,s=x.expando,l=e.nodeType,u=l?x.cache:e,c=l?e[s]:e[s]&&s;if(c&&u[c]&&(i||u[c].data)||r!==t||"string"!=typeof n)return c||(c=l?e[s]=p.pop()||x.guid++:s),u[c]||(u[c]=l?{}:{toJSON:x.noop}),("object"==typeof n||"function"==typeof n)&&(i?u[c]=x.extend(u[c],n):u[c].data=x.extend(u[c].data,n)),a=u[c],i||(a.data||(a.data={}),a=a.data),r!==t&&(a[x.camelCase(n)]=r),"string"==typeof n?(o=a[n],null==o&&(o=a[x.camelCase(n)])):o=a,o}}function W(e,t,n){if(x.acceptData(e)){var r,i,o=e.nodeType,a=o?x.cache:e,s=o?e[x.expando]:x.expando;if(a[s]){if(t&&(r=n?a[s]:a[s].data)){x.isArray(t)?t=t.concat(x.map(t,x.camelCase)):t in r?t=[t]:(t=x.camelCase(t),t=t in r?[t]:t.split(" ")),i=t.length;while(i--)delete r[t[i]];if(n?!I(r):!x.isEmptyObject(r))return}(n||(delete a[s].data,I(a[s])))&&(o?x.cleanData([e],!0):x.support.deleteExpando||a!=a.window?delete a[s]:a[s]=null)}}}x.extend({cache:{},noData:{applet:!0,embed:!0,object:"clsid:D27CDB6E-AE6D-11cf-96B8-444553540000"},hasData:function(e){return e=e.nodeType?x.cache[e[x.expando]]:e[x.expando],!!e&&!I(e)},data:function(e,t,n){return R(e,t,n)},removeData:function(e,t){return W(e,t)},_data:function(e,t,n){return R(e,t,n,!0)},_removeData:function(e,t){return W(e,t,!0)},acceptData:function(e){if(e.nodeType&&1!==e.nodeType&&9!==e.nodeType)return!1;var t=e.nodeName&&x.noData[e.nodeName.toLowerCase()];return!t||t!==!0&&e.getAttribute("classid")===t}}),x.fn.extend({data:function(e,n){var r,i,o=null,a=0,s=this[0];if(e===t){if(this.length&&(o=x.data(s),1===s.nodeType&&!x._data(s,"parsedAttrs"))){for(r=s.attributes;r.length>a;a++)i=r[a].name,0===i.indexOf("data-")&&(i=x.camelCase(i.slice(5)),$(s,i,o[i]));x._data(s,"parsedAttrs",!0)}return o}return"object"==typeof e?this.each(function(){x.data(this,e)}):arguments.length>1?this.each(function(){x.data(this,e,n)}):s?$(s,e,x.data(s,e)):null},removeData:function(e){return this.each(function(){x.removeData(this,e)})}});function $(e,n,r){if(r===t&&1===e.nodeType){var i="data-"+n.replace(P,"-$1").toLowerCase();if(r=e.getAttribute(i),"string"==typeof r){try{r="true"===r?!0:"false"===r?!1:"null"===r?null:+r+""===r?+r:B.test(r)?x.parseJSON(r):r}catch(o){}x.data(e,n,r)}else r=t}return r}function I(e){var t;for(t in e)if(("data"!==t||!x.isEmptyObject(e[t]))&&"toJSON"!==t)return!1;return!0}x.extend({queue:function(e,n,r){var i;return e?(n=(n||"fx")+"queue",i=x._data(e,n),r&&(!i||x.isArray(r)?i=x._data(e,n,x.makeArray(r)):i.push(r)),i||[]):t},dequeue:function(e,t){t=t||"fx";var n=x.queue(e,t),r=n.length,i=n.shift(),o=x._queueHooks(e,t),a=function(){x.dequeue(e,t)};"inprogress"===i&&(i=n.shift(),r--),i&&("fx"===t&&n.unshift("inprogress"),delete o.stop,i.call(e,a,o)),!r&&o&&o.empty.fire()},_queueHooks:function(e,t){var n=t+"queueHooks";return x._data(e,n)||x._data(e,n,{empty:x.Callbacks("once memory").add(function(){x._removeData(e,t+"queue"),x._removeData(e,n)})})}}),x.fn.extend({queue:function(e,n){var r=2;return"string"!=typeof e&&(n=e,e="fx",r--),r>arguments.length?x.queue(this[0],e):n===t?this:this.each(function(){var t=x.queue(this,e,n);x._queueHooks(this,e),"fx"===e&&"inprogress"!==t[0]&&x.dequeue(this,e)})},dequeue:function(e){return this.each(function(){x.dequeue(this,e)})},delay:function(e,t){return e=x.fx?x.fx.speeds[e]||e:e,t=t||"fx",this.queue(t,function(t,n){var r=setTimeout(t,e);n.stop=function(){clearTimeout(r)}})},clearQueue:function(e){return this.queue(e||"fx",[])},promise:function(e,n){var r,i=1,o=x.Deferred(),a=this,s=this.length,l=function(){--i||o.resolveWith(a,[a])};"string"!=typeof e&&(n=e,e=t),e=e||"fx";while(s--)r=x._data(a[s],e+"queueHooks"),r&&r.empty&&(i++,r.empty.add(l));return l(),o.promise(n)}});var z,X,U=/[\t\r\n\f]/g,V=/\r/g,Y=/^(?:input|select|textarea|button|object)$/i,J=/^(?:a|area)$/i,G=/^(?:checked|selected)$/i,Q=x.support.getSetAttribute,K=x.support.input;x.fn.extend({attr:function(e,t){return x.access(this,x.attr,e,t,arguments.length>1)},removeAttr:function(e){return this.each(function(){x.removeAttr(this,e)})},prop:function(e,t){return x.access(this,x.prop,e,t,arguments.length>1)},removeProp:function(e){return e=x.propFix[e]||e,this.each(function(){try{this[e]=t,delete this[e]}catch(n){}})},addClass:function(e){var t,n,r,i,o,a=0,s=this.length,l="string"==typeof e&&e;if(x.isFunction(e))return this.each(function(t){x(this).addClass(e.call(this,t,this.className))});if(l)for(t=(e||"").match(T)||[];s>a;a++)if(n=this[a],r=1===n.nodeType&&(n.className?(" "+n.className+" ").replace(U," "):" ")){o=0;while(i=t[o++])0>r.indexOf(" "+i+" ")&&(r+=i+" ");n.className=x.trim(r)}return this},removeClass:function(e){var t,n,r,i,o,a=0,s=this.length,l=0===arguments.length||"string"==typeof e&&e;if(x.isFunction(e))return this.each(function(t){x(this).removeClass(e.call(this,t,this.className))});if(l)for(t=(e||"").match(T)||[];s>a;a++)if(n=this[a],r=1===n.nodeType&&(n.className?(" "+n.className+" ").replace(U," "):"")){o=0;while(i=t[o++])while(r.indexOf(" "+i+" ")>=0)r=r.replace(" "+i+" "," ");n.className=e?x.trim(r):""}return this},toggleClass:function(e,t){var n=typeof e;return"boolean"==typeof t&&"string"===n?t?this.addClass(e):this.removeClass(e):x.isFunction(e)?this.each(function(n){x(this).toggleClass(e.call(this,n,this.className,t),t)}):this.each(function(){if("string"===n){var t,r=0,o=x(this),a=e.match(T)||[];while(t=a[r++])o.hasClass(t)?o.removeClass(t):o.addClass(t)}else(n===i||"boolean"===n)&&(this.className&&x._data(this,"__className__",this.className),this.className=this.className||e===!1?"":x._data(this,"__className__")||"")})},hasClass:function(e){var t=" "+e+" ",n=0,r=this.length;for(;r>n;n++)if(1===this[n].nodeType&&(" "+this[n].className+" ").replace(U," ").indexOf(t)>=0)return!0;return!1},val:function(e){var n,r,i,o=this[0];{if(arguments.length)return i=x.isFunction(e),this.each(function(n){var o;1===this.nodeType&&(o=i?e.call(this,n,x(this).val()):e,null==o?o="":"number"==typeof o?o+="":x.isArray(o)&&(o=x.map(o,function(e){return null==e?"":e+""})),r=x.valHooks[this.type]||x.valHooks[this.nodeName.toLowerCase()],r&&"set"in r&&r.set(this,o,"value")!==t||(this.value=o))});if(o)return r=x.valHooks[o.type]||x.valHooks[o.nodeName.toLowerCase()],r&&"get"in r&&(n=r.get(o,"value"))!==t?n:(n=o.value,"string"==typeof n?n.replace(V,""):null==n?"":n)}}}),x.extend({valHooks:{option:{get:function(e){var t=x.find.attr(e,"value");return null!=t?t:e.text}},select:{get:function(e){var t,n,r=e.options,i=e.selectedIndex,o="select-one"===e.type||0>i,a=o?null:[],s=o?i+1:r.length,l=0>i?s:o?i:0;for(;s>l;l++)if(n=r[l],!(!n.selected&&l!==i||(x.support.optDisabled?n.disabled:null!==n.getAttribute("disabled"))||n.parentNode.disabled&&x.nodeName(n.parentNode,"optgroup"))){if(t=x(n).val(),o)return t;a.push(t)}return a},set:function(e,t){var n,r,i=e.options,o=x.makeArray(t),a=i.length;while(a--)r=i[a],(r.selected=x.inArray(x(r).val(),o)>=0)&&(n=!0);return n||(e.selectedIndex=-1),o}}},attr:function(e,n,r){var o,a,s=e.nodeType;if(e&&3!==s&&8!==s&&2!==s)return typeof e.getAttribute===i?x.prop(e,n,r):(1===s&&x.isXMLDoc(e)||(n=n.toLowerCase(),o=x.attrHooks[n]||(x.expr.match.bool.test(n)?X:z)),r===t?o&&"get"in o&&null!==(a=o.get(e,n))?a:(a=x.find.attr(e,n),null==a?t:a):null!==r?o&&"set"in o&&(a=o.set(e,r,n))!==t?a:(e.setAttribute(n,r+""),r):(x.removeAttr(e,n),t))},removeAttr:function(e,t){var n,r,i=0,o=t&&t.match(T);if(o&&1===e.nodeType)while(n=o[i++])r=x.propFix[n]||n,x.expr.match.bool.test(n)?K&&Q||!G.test(n)?e[r]=!1:e[x.camelCase("default-"+n)]=e[r]=!1:x.attr(e,n,""),e.removeAttribute(Q?n:r)},attrHooks:{type:{set:function(e,t){if(!x.support.radioValue&&"radio"===t&&x.nodeName(e,"input")){var n=e.value;return e.setAttribute("type",t),n&&(e.value=n),t}}}},propFix:{"for":"htmlFor","class":"className"},prop:function(e,n,r){var i,o,a,s=e.nodeType;if(e&&3!==s&&8!==s&&2!==s)return a=1!==s||!x.isXMLDoc(e),a&&(n=x.propFix[n]||n,o=x.propHooks[n]),r!==t?o&&"set"in o&&(i=o.set(e,r,n))!==t?i:e[n]=r:o&&"get"in o&&null!==(i=o.get(e,n))?i:e[n]},propHooks:{tabIndex:{get:function(e){var t=x.find.attr(e,"tabindex");return t?parseInt(t,10):Y.test(e.nodeName)||J.test(e.nodeName)&&e.href?0:-1}}}}),X={set:function(e,t,n){return t===!1?x.removeAttr(e,n):K&&Q||!G.test(n)?e.setAttribute(!Q&&x.propFix[n]||n,n):e[x.camelCase("default-"+n)]=e[n]=!0,n}},x.each(x.expr.match.bool.source.match(/\w+/g),function(e,n){var r=x.expr.attrHandle[n]||x.find.attr;x.expr.attrHandle[n]=K&&Q||!G.test(n)?function(e,n,i){var o=x.expr.attrHandle[n],a=i?t:(x.expr.attrHandle[n]=t)!=r(e,n,i)?n.toLowerCase():null;return x.expr.attrHandle[n]=o,a}:function(e,n,r){return r?t:e[x.camelCase("default-"+n)]?n.toLowerCase():null}}),K&&Q||(x.attrHooks.value={set:function(e,n,r){return x.nodeName(e,"input")?(e.defaultValue=n,t):z&&z.set(e,n,r)}}),Q||(z={set:function(e,n,r){var i=e.getAttributeNode(r);return i||e.setAttributeNode(i=e.ownerDocument.createAttribute(r)),i.value=n+="","value"===r||n===e.getAttribute(r)?n:t}},x.expr.attrHandle.id=x.expr.attrHandle.name=x.expr.attrHandle.coords=function(e,n,r){var i;return r?t:(i=e.getAttributeNode(n))&&""!==i.value?i.value:null},x.valHooks.button={get:function(e,n){var r=e.getAttributeNode(n);return r&&r.specified?r.value:t},set:z.set},x.attrHooks.contenteditable={set:function(e,t,n){z.set(e,""===t?!1:t,n)}},x.each(["width","height"],function(e,n){x.attrHooks[n]={set:function(e,r){return""===r?(e.setAttribute(n,"auto"),r):t}}})),x.support.hrefNormalized||x.each(["href","src"],function(e,t){x.propHooks[t]={get:function(e){return e.getAttribute(t,4)}}}),x.support.style||(x.attrHooks.style={get:function(e){return e.style.cssText||t},set:function(e,t){return e.style.cssText=t+""}}),x.support.optSelected||(x.propHooks.selected={get:function(e){var t=e.parentNode;return t&&(t.selectedIndex,t.parentNode&&t.parentNode.selectedIndex),null}}),x.each(["tabIndex","readOnly","maxLength","cellSpacing","cellPadding","rowSpan","colSpan","useMap","frameBorder","contentEditable"],function(){x.propFix[this.toLowerCase()]=this}),x.support.enctype||(x.propFix.enctype="encoding"),x.each(["radio","checkbox"],function(){x.valHooks[this]={set:function(e,n){return x.isArray(n)?e.checked=x.inArray(x(e).val(),n)>=0:t}},x.support.checkOn||(x.valHooks[this].get=function(e){return null===e.getAttribute("value")?"on":e.value})});var Z=/^(?:input|select|textarea)$/i,et=/^key/,tt=/^(?:mouse|contextmenu)|click/,nt=/^(?:focusinfocus|focusoutblur)$/,rt=/^([^.]*)(?:\.(.+)|)$/;function it(){return!0}function ot(){return!1}function at(){try{return a.activeElement}catch(e){}}x.event={global:{},add:function(e,n,r,o,a){var s,l,u,c,p,f,d,h,g,m,y,v=x._data(e);if(v){r.handler&&(c=r,r=c.handler,a=c.selector),r.guid||(r.guid=x.guid++),(l=v.events)||(l=v.events={}),(f=v.handle)||(f=v.handle=function(e){return typeof x===i||e&&x.event.triggered===e.type?t:x.event.dispatch.apply(f.elem,arguments)},f.elem=e),n=(n||"").match(T)||[""],u=n.length;while(u--)s=rt.exec(n[u])||[],g=y=s[1],m=(s[2]||"").split(".").sort(),g&&(p=x.event.special[g]||{},g=(a?p.delegateType:p.bindType)||g,p=x.event.special[g]||{},d=x.extend({type:g,origType:y,data:o,handler:r,guid:r.guid,selector:a,needsContext:a&&x.expr.match.needsContext.test(a),namespace:m.join(".")},c),(h=l[g])||(h=l[g]=[],h.delegateCount=0,p.setup&&p.setup.call(e,o,m,f)!==!1||(e.addEventListener?e.addEventListener(g,f,!1):e.attachEvent&&e.attachEvent("on"+g,f))),p.add&&(p.add.call(e,d),d.handler.guid||(d.handler.guid=r.guid)),a?h.splice(h.delegateCount++,0,d):h.push(d),x.event.global[g]=!0);e=null}},remove:function(e,t,n,r,i){var o,a,s,l,u,c,p,f,d,h,g,m=x.hasData(e)&&x._data(e);if(m&&(c=m.events)){t=(t||"").match(T)||[""],u=t.length;while(u--)if(s=rt.exec(t[u])||[],d=g=s[1],h=(s[2]||"").split(".").sort(),d){p=x.event.special[d]||{},d=(r?p.delegateType:p.bindType)||d,f=c[d]||[],s=s[2]&&RegExp("(^|\\.)"+h.join("\\.(?:.*\\.|)")+"(\\.|$)"),l=o=f.length;while(o--)a=f[o],!i&&g!==a.origType||n&&n.guid!==a.guid||s&&!s.test(a.namespace)||r&&r!==a.selector&&("**"!==r||!a.selector)||(f.splice(o,1),a.selector&&f.delegateCount--,p.remove&&p.remove.call(e,a));l&&!f.length&&(p.teardown&&p.teardown.call(e,h,m.handle)!==!1||x.removeEvent(e,d,m.handle),delete c[d])}else for(d in c)x.event.remove(e,d+t[u],n,r,!0);x.isEmptyObject(c)&&(delete m.handle,x._removeData(e,"events"))}},trigger:function(n,r,i,o){var s,l,u,c,p,f,d,h=[i||a],g=v.call(n,"type")?n.type:n,m=v.call(n,"namespace")?n.namespace.split("."):[];if(u=f=i=i||a,3!==i.nodeType&&8!==i.nodeType&&!nt.test(g+x.event.triggered)&&(g.indexOf(".")>=0&&(m=g.split("."),g=m.shift(),m.sort()),l=0>g.indexOf(":")&&"on"+g,n=n[x.expando]?n:new x.Event(g,"object"==typeof n&&n),n.isTrigger=o?2:3,n.namespace=m.join("."),n.namespace_re=n.namespace?RegExp("(^|\\.)"+m.join("\\.(?:.*\\.|)")+"(\\.|$)"):null,n.result=t,n.target||(n.target=i),r=null==r?[n]:x.makeArray(r,[n]),p=x.event.special[g]||{},o||!p.trigger||p.trigger.apply(i,r)!==!1)){if(!o&&!p.noBubble&&!x.isWindow(i)){for(c=p.delegateType||g,nt.test(c+g)||(u=u.parentNode);u;u=u.parentNode)h.push(u),f=u;f===(i.ownerDocument||a)&&h.push(f.defaultView||f.parentWindow||e)}d=0;while((u=h[d++])&&!n.isPropagationStopped())n.type=d>1?c:p.bindType||g,s=(x._data(u,"events")||{})[n.type]&&x._data(u,"handle"),s&&s.apply(u,r),s=l&&u[l],s&&x.acceptData(u)&&s.apply&&s.apply(u,r)===!1&&n.preventDefault();if(n.type=g,!o&&!n.isDefaultPrevented()&&(!p._default||p._default.apply(h.pop(),r)===!1)&&x.acceptData(i)&&l&&i[g]&&!x.isWindow(i)){f=i[l],f&&(i[l]=null),x.event.triggered=g;try{i[g]()}catch(y){}x.event.triggered=t,f&&(i[l]=f)}return n.result}},dispatch:function(e){e=x.event.fix(e);var n,r,i,o,a,s=[],l=g.call(arguments),u=(x._data(this,"events")||{})[e.type]||[],c=x.event.special[e.type]||{};if(l[0]=e,e.delegateTarget=this,!c.preDispatch||c.preDispatch.call(this,e)!==!1){s=x.event.handlers.call(this,e,u),n=0;while((o=s[n++])&&!e.isPropagationStopped()){e.currentTarget=o.elem,a=0;while((i=o.handlers[a++])&&!e.isImmediatePropagationStopped())(!e.namespace_re||e.namespace_re.test(i.namespace))&&(e.handleObj=i,e.data=i.data,r=((x.event.special[i.origType]||{}).handle||i.handler).apply(o.elem,l),r!==t&&(e.result=r)===!1&&(e.preventDefault(),e.stopPropagation()))}return c.postDispatch&&c.postDispatch.call(this,e),e.result}},handlers:function(e,n){var r,i,o,a,s=[],l=n.delegateCount,u=e.target;if(l&&u.nodeType&&(!e.button||"click"!==e.type))for(;u!=this;u=u.parentNode||this)if(1===u.nodeType&&(u.disabled!==!0||"click"!==e.type)){for(o=[],a=0;l>a;a++)i=n[a],r=i.selector+" ",o[r]===t&&(o[r]=i.needsContext?x(r,this).index(u)>=0:x.find(r,this,null,[u]).length),o[r]&&o.push(i);o.length&&s.push({elem:u,handlers:o})}return n.length>l&&s.push({elem:this,handlers:n.slice(l)}),s},fix:function(e){if(e[x.expando])return e;var t,n,r,i=e.type,o=e,s=this.fixHooks[i];s||(this.fixHooks[i]=s=tt.test(i)?this.mouseHooks:et.test(i)?this.keyHooks:{}),r=s.props?this.props.concat(s.props):this.props,e=new x.Event(o),t=r.length;while(t--)n=r[t],e[n]=o[n];return e.target||(e.target=o.srcElement||a),3===e.target.nodeType&&(e.target=e.target.parentNode),e.metaKey=!!e.metaKey,s.filter?s.filter(e,o):e},props:"altKey bubbles cancelable ctrlKey currentTarget eventPhase metaKey relatedTarget shiftKey target timeStamp view which".split(" "),fixHooks:{},keyHooks:{props:"char charCode key keyCode".split(" "),filter:function(e,t){return null==e.which&&(e.which=null!=t.charCode?t.charCode:t.keyCode),e}},mouseHooks:{props:"button buttons clientX clientY fromElement offsetX offsetY pageX pageY screenX screenY toElement".split(" "),filter:function(e,n){var r,i,o,s=n.button,l=n.fromElement;return null==e.pageX&&null!=n.clientX&&(i=e.target.ownerDocument||a,o=i.documentElement,r=i.body,e.pageX=n.clientX+(o&&o.scrollLeft||r&&r.scrollLeft||0)-(o&&o.clientLeft||r&&r.clientLeft||0),e.pageY=n.clientY+(o&&o.scrollTop||r&&r.scrollTop||0)-(o&&o.clientTop||r&&r.clientTop||0)),!e.relatedTarget&&l&&(e.relatedTarget=l===e.target?n.toElement:l),e.which||s===t||(e.which=1&s?1:2&s?3:4&s?2:0),e}},special:{load:{noBubble:!0},focus:{trigger:function(){if(this!==at()&&this.focus)try{return this.focus(),!1}catch(e){}},delegateType:"focusin"},blur:{trigger:function(){return this===at()&&this.blur?(this.blur(),!1):t},delegateType:"focusout"},click:{trigger:function(){return x.nodeName(this,"input")&&"checkbox"===this.type&&this.click?(this.click(),!1):t},_default:function(e){return x.nodeName(e.target,"a")}},beforeunload:{postDispatch:function(e){e.result!==t&&(e.originalEvent.returnValue=e.result)}}},simulate:function(e,t,n,r){var i=x.extend(new x.Event,n,{type:e,isSimulated:!0,originalEvent:{}});r?x.event.trigger(i,null,t):x.event.dispatch.call(t,i),i.isDefaultPrevented()&&n.preventDefault()}},x.removeEvent=a.removeEventListener?function(e,t,n){e.removeEventListener&&e.removeEventListener(t,n,!1)}:function(e,t,n){var r="on"+t;e.detachEvent&&(typeof e[r]===i&&(e[r]=null),e.detachEvent(r,n))},x.Event=function(e,n){return this instanceof x.Event?(e&&e.type?(this.originalEvent=e,this.type=e.type,this.isDefaultPrevented=e.defaultPrevented||e.returnValue===!1||e.getPreventDefault&&e.getPreventDefault()?it:ot):this.type=e,n&&x.extend(this,n),this.timeStamp=e&&e.timeStamp||x.now(),this[x.expando]=!0,t):new x.Event(e,n)},x.Event.prototype={isDefaultPrevented:ot,isPropagationStopped:ot,isImmediatePropagationStopped:ot,preventDefault:function(){var e=this.originalEvent;this.isDefaultPrevented=it,e&&(e.preventDefault?e.preventDefault():e.returnValue=!1)},stopPropagation:function(){var e=this.originalEvent;this.isPropagationStopped=it,e&&(e.stopPropagation&&e.stopPropagation(),e.cancelBubble=!0)},stopImmediatePropagation:function(){this.isImmediatePropagationStopped=it,this.stopPropagation()}},x.each({mouseenter:"mouseover",mouseleave:"mouseout"},function(e,t){x.event.special[e]={delegateType:t,bindType:t,handle:function(e){var n,r=this,i=e.relatedTarget,o=e.handleObj;return(!i||i!==r&&!x.contains(r,i))&&(e.type=o.origType,n=o.handler.apply(this,arguments),e.type=t),n}}}),x.support.submitBubbles||(x.event.special.submit={setup:function(){return x.nodeName(this,"form")?!1:(x.event.add(this,"click._submit keypress._submit",function(e){var n=e.target,r=x.nodeName(n,"input")||x.nodeName(n,"button")?n.form:t;r&&!x._data(r,"submitBubbles")&&(x.event.add(r,"submit._submit",function(e){e._submit_bubble=!0}),x._data(r,"submitBubbles",!0))}),t)},postDispatch:function(e){e._submit_bubble&&(delete e._submit_bubble,this.parentNode&&!e.isTrigger&&x.event.simulate("submit",this.parentNode,e,!0))},teardown:function(){return x.nodeName(this,"form")?!1:(x.event.remove(this,"._submit"),t)}}),x.support.changeBubbles||(x.event.special.change={setup:function(){return Z.test(this.nodeName)?(("checkbox"===this.type||"radio"===this.type)&&(x.event.add(this,"propertychange._change",function(e){"checked"===e.originalEvent.propertyName&&(this._just_changed=!0)}),x.event.add(this,"click._change",function(e){this._just_changed&&!e.isTrigger&&(this._just_changed=!1),x.event.simulate("change",this,e,!0)})),!1):(x.event.add(this,"beforeactivate._change",function(e){var t=e.target;Z.test(t.nodeName)&&!x._data(t,"changeBubbles")&&(x.event.add(t,"change._change",function(e){!this.parentNode||e.isSimulated||e.isTrigger||x.event.simulate("change",this.parentNode,e,!0)}),x._data(t,"changeBubbles",!0))}),t)},handle:function(e){var n=e.target;return this!==n||e.isSimulated||e.isTrigger||"radio"!==n.type&&"checkbox"!==n.type?e.handleObj.handler.apply(this,arguments):t},teardown:function(){return x.event.remove(this,"._change"),!Z.test(this.nodeName)}}),x.support.focusinBubbles||x.each({focus:"focusin",blur:"focusout"},function(e,t){var n=0,r=function(e){x.event.simulate(t,e.target,x.event.fix(e),!0)};x.event.special[t]={setup:function(){0===n++&&a.addEventListener(e,r,!0)},teardown:function(){0===--n&&a.removeEventListener(e,r,!0)}}}),x.fn.extend({on:function(e,n,r,i,o){var a,s;if("object"==typeof e){"string"!=typeof n&&(r=r||n,n=t);for(a in e)this.on(a,n,r,e[a],o);return this}if(null==r&&null==i?(i=n,r=n=t):null==i&&("string"==typeof n?(i=r,r=t):(i=r,r=n,n=t)),i===!1)i=ot;else if(!i)return this;return 1===o&&(s=i,i=function(e){return x().off(e),s.apply(this,arguments)},i.guid=s.guid||(s.guid=x.guid++)),this.each(function(){x.event.add(this,e,i,r,n)})},one:function(e,t,n,r){return this.on(e,t,n,r,1)},off:function(e,n,r){var i,o;if(e&&e.preventDefault&&e.handleObj)return i=e.handleObj,x(e.delegateTarget).off(i.namespace?i.origType+"."+i.namespace:i.origType,i.selector,i.handler),this;if("object"==typeof e){for(o in e)this.off(o,n,e[o]);return this}return(n===!1||"function"==typeof n)&&(r=n,n=t),r===!1&&(r=ot),this.each(function(){x.event.remove(this,e,r,n)})},trigger:function(e,t){return this.each(function(){x.event.trigger(e,t,this)})},triggerHandler:function(e,n){var r=this[0];return r?x.event.trigger(e,n,r,!0):t}});var st=/^.[^:#\[\.,]*$/,lt=/^(?:parents|prev(?:Until|All))/,ut=x.expr.match.needsContext,ct={children:!0,contents:!0,next:!0,prev:!0};x.fn.extend({find:function(e){var t,n=[],r=this,i=r.length;if("string"!=typeof e)return this.pushStack(x(e).filter(function(){for(t=0;i>t;t++)if(x.contains(r[t],this))return!0}));for(t=0;i>t;t++)x.find(e,r[t],n);return n=this.pushStack(i>1?x.unique(n):n),n.selector=this.selector?this.selector+" "+e:e,n},has:function(e){var t,n=x(e,this),r=n.length;return this.filter(function(){for(t=0;r>t;t++)if(x.contains(this,n[t]))return!0})},not:function(e){return this.pushStack(ft(this,e||[],!0))},filter:function(e){return this.pushStack(ft(this,e||[],!1))},is:function(e){return!!ft(this,"string"==typeof e&&ut.test(e)?x(e):e||[],!1).length},closest:function(e,t){var n,r=0,i=this.length,o=[],a=ut.test(e)||"string"!=typeof e?x(e,t||this.context):0;for(;i>r;r++)for(n=this[r];n&&n!==t;n=n.parentNode)if(11>n.nodeType&&(a?a.index(n)>-1:1===n.nodeType&&x.find.matchesSelector(n,e))){n=o.push(n);break}return this.pushStack(o.length>1?x.unique(o):o)},index:function(e){return e?"string"==typeof e?x.inArray(this[0],x(e)):x.inArray(e.jquery?e[0]:e,this):this[0]&&this[0].parentNode?this.first().prevAll().length:-1},add:function(e,t){var n="string"==typeof e?x(e,t):x.makeArray(e&&e.nodeType?[e]:e),r=x.merge(this.get(),n);return this.pushStack(x.unique(r))},addBack:function(e){return this.add(null==e?this.prevObject:this.prevObject.filter(e))}});function pt(e,t){do e=e[t];while(e&&1!==e.nodeType);return e}x.each({parent:function(e){var t=e.parentNode;return t&&11!==t.nodeType?t:null},parents:function(e){return x.dir(e,"parentNode")},parentsUntil:function(e,t,n){return x.dir(e,"parentNode",n)},next:function(e){return pt(e,"nextSibling")},prev:function(e){return pt(e,"previousSibling")},nextAll:function(e){return x.dir(e,"nextSibling")},prevAll:function(e){return x.dir(e,"previousSibling")},nextUntil:function(e,t,n){return x.dir(e,"nextSibling",n)},prevUntil:function(e,t,n){return x.dir(e,"previousSibling",n)},siblings:function(e){return x.sibling((e.parentNode||{}).firstChild,e)},children:function(e){return x.sibling(e.firstChild)},contents:function(e){return x.nodeName(e,"iframe")?e.contentDocument||e.contentWindow.document:x.merge([],e.childNodes)}},function(e,t){x.fn[e]=function(n,r){var i=x.map(this,t,n);return"Until"!==e.slice(-5)&&(r=n),r&&"string"==typeof r&&(i=x.filter(r,i)),this.length>1&&(ct[e]||(i=x.unique(i)),lt.test(e)&&(i=i.reverse())),this.pushStack(i)}}),x.extend({filter:function(e,t,n){var r=t[0];return n&&(e=":not("+e+")"),1===t.length&&1===r.nodeType?x.find.matchesSelector(r,e)?[r]:[]:x.find.matches(e,x.grep(t,function(e){return 1===e.nodeType}))},dir:function(e,n,r){var i=[],o=e[n];while(o&&9!==o.nodeType&&(r===t||1!==o.nodeType||!x(o).is(r)))1===o.nodeType&&i.push(o),o=o[n];return i},sibling:function(e,t){var n=[];for(;e;e=e.nextSibling)1===e.nodeType&&e!==t&&n.push(e);return n}});function ft(e,t,n){if(x.isFunction(t))return x.grep(e,function(e,r){return!!t.call(e,r,e)!==n});if(t.nodeType)return x.grep(e,function(e){return e===t!==n});if("string"==typeof t){if(st.test(t))return x.filter(t,e,n);t=x.filter(t,e)}return x.grep(e,function(e){return x.inArray(e,t)>=0!==n})}function dt(e){var t=ht.split("|"),n=e.createDocumentFragment();if(n.createElement)while(t.length)n.createElement(t.pop());return n}var ht="abbr|article|aside|audio|bdi|canvas|data|datalist|details|figcaption|figure|footer|header|hgroup|mark|meter|nav|output|progress|section|summary|time|video",gt=/ jQuery\d+="(?:null|\d+)"/g,mt=RegExp("<(?:"+ht+")[\\s/>]","i"),yt=/^\s+/,vt=/<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:]+)[^>]*)\/>/gi,bt=/<([\w:]+)/,xt=/<tbody/i,wt=/<|&#?\w+;/,Tt=/<(?:script|style|link)/i,Ct=/^(?:checkbox|radio)$/i,Nt=/checked\s*(?:[^=]|=\s*.checked.)/i,kt=/^$|\/(?:java|ecma)script/i,Et=/^true\/(.*)/,St=/^\s*<!(?:\[CDATA\[|--)|(?:\]\]|--)>\s*$/g,At={option:[1,"<select multiple='multiple'>","</select>"],legend:[1,"<fieldset>","</fieldset>"],area:[1,"<map>","</map>"],param:[1,"<object>","</object>"],thead:[1,"<table>","</table>"],tr:[2,"<table><tbody>","</tbody></table>"],col:[2,"<table><tbody></tbody><colgroup>","</colgroup></table>"],td:[3,"<table><tbody><tr>","</tr></tbody></table>"],_default:x.support.htmlSerialize?[0,"",""]:[1,"X<div>","</div>"]},jt=dt(a),Dt=jt.appendChild(a.createElement("div"));At.optgroup=At.option,At.tbody=At.tfoot=At.colgroup=At.caption=At.thead,At.th=At.td,x.fn.extend({text:function(e){return x.access(this,function(e){return e===t?x.text(this):this.empty().append((this[0]&&this[0].ownerDocument||a).createTextNode(e))},null,e,arguments.length)},append:function(){return this.domManip(arguments,function(e){if(1===this.nodeType||11===this.nodeType||9===this.nodeType){var t=Lt(this,e);t.appendChild(e)}})},prepend:function(){return this.domManip(arguments,function(e){if(1===this.nodeType||11===this.nodeType||9===this.nodeType){var t=Lt(this,e);t.insertBefore(e,t.firstChild)}})},before:function(){return this.domManip(arguments,function(e){this.parentNode&&this.parentNode.insertBefore(e,this)})},after:function(){return this.domManip(arguments,function(e){this.parentNode&&this.parentNode.insertBefore(e,this.nextSibling)})},remove:function(e,t){var n,r=e?x.filter(e,this):this,i=0;for(;null!=(n=r[i]);i++)t||1!==n.nodeType||x.cleanData(Ft(n)),n.parentNode&&(t&&x.contains(n.ownerDocument,n)&&_t(Ft(n,"script")),n.parentNode.removeChild(n));return this},empty:function(){var e,t=0;for(;null!=(e=this[t]);t++){1===e.nodeType&&x.cleanData(Ft(e,!1));while(e.firstChild)e.removeChild(e.firstChild);e.options&&x.nodeName(e,"select")&&(e.options.length=0)}return this},clone:function(e,t){return e=null==e?!1:e,t=null==t?e:t,this.map(function(){return x.clone(this,e,t)})},html:function(e){return x.access(this,function(e){var n=this[0]||{},r=0,i=this.length;if(e===t)return 1===n.nodeType?n.innerHTML.replace(gt,""):t;if(!("string"!=typeof e||Tt.test(e)||!x.support.htmlSerialize&&mt.test(e)||!x.support.leadingWhitespace&&yt.test(e)||At[(bt.exec(e)||["",""])[1].toLowerCase()])){e=e.replace(vt,"<$1></$2>");try{for(;i>r;r++)n=this[r]||{},1===n.nodeType&&(x.cleanData(Ft(n,!1)),n.innerHTML=e);n=0}catch(o){}}n&&this.empty().append(e)},null,e,arguments.length)},replaceWith:function(){var e=x.map(this,function(e){return[e.nextSibling,e.parentNode]}),t=0;return this.domManip(arguments,function(n){var r=e[t++],i=e[t++];i&&(r&&r.parentNode!==i&&(r=this.nextSibling),x(this).remove(),i.insertBefore(n,r))},!0),t?this:this.remove()},detach:function(e){return this.remove(e,!0)},domManip:function(e,t,n){e=d.apply([],e);var r,i,o,a,s,l,u=0,c=this.length,p=this,f=c-1,h=e[0],g=x.isFunction(h);if(g||!(1>=c||"string"!=typeof h||x.support.checkClone)&&Nt.test(h))return this.each(function(r){var i=p.eq(r);g&&(e[0]=h.call(this,r,i.html())),i.domManip(e,t,n)});if(c&&(l=x.buildFragment(e,this[0].ownerDocument,!1,!n&&this),r=l.firstChild,1===l.childNodes.length&&(l=r),r)){for(a=x.map(Ft(l,"script"),Ht),o=a.length;c>u;u++)i=l,u!==f&&(i=x.clone(i,!0,!0),o&&x.merge(a,Ft(i,"script"))),t.call(this[u],i,u);if(o)for(s=a[a.length-1].ownerDocument,x.map(a,qt),u=0;o>u;u++)i=a[u],kt.test(i.type||"")&&!x._data(i,"globalEval")&&x.contains(s,i)&&(i.src?x._evalUrl(i.src):x.globalEval((i.text||i.textContent||i.innerHTML||"").replace(St,"")));l=r=null}return this}});function Lt(e,t){return x.nodeName(e,"table")&&x.nodeName(1===t.nodeType?t:t.firstChild,"tr")?e.getElementsByTagName("tbody")[0]||e.appendChild(e.ownerDocument.createElement("tbody")):e}function Ht(e){return e.type=(null!==x.find.attr(e,"type"))+"/"+e.type,e}function qt(e){var t=Et.exec(e.type);return t?e.type=t[1]:e.removeAttribute("type"),e}function _t(e,t){var n,r=0;for(;null!=(n=e[r]);r++)x._data(n,"globalEval",!t||x._data(t[r],"globalEval"))}function Mt(e,t){if(1===t.nodeType&&x.hasData(e)){var n,r,i,o=x._data(e),a=x._data(t,o),s=o.events;if(s){delete a.handle,a.events={};for(n in s)for(r=0,i=s[n].length;i>r;r++)x.event.add(t,n,s[n][r])}a.data&&(a.data=x.extend({},a.data))}}function Ot(e,t){var n,r,i;if(1===t.nodeType){if(n=t.nodeName.toLowerCase(),!x.support.noCloneEvent&&t[x.expando]){i=x._data(t);for(r in i.events)x.removeEvent(t,r,i.handle);t.removeAttribute(x.expando)}"script"===n&&t.text!==e.text?(Ht(t).text=e.text,qt(t)):"object"===n?(t.parentNode&&(t.outerHTML=e.outerHTML),x.support.html5Clone&&e.innerHTML&&!x.trim(t.innerHTML)&&(t.innerHTML=e.innerHTML)):"input"===n&&Ct.test(e.type)?(t.defaultChecked=t.checked=e.checked,t.value!==e.value&&(t.value=e.value)):"option"===n?t.defaultSelected=t.selected=e.defaultSelected:("input"===n||"textarea"===n)&&(t.defaultValue=e.defaultValue)}}x.each({appendTo:"append",prependTo:"prepend",insertBefore:"before",insertAfter:"after",replaceAll:"replaceWith"},function(e,t){x.fn[e]=function(e){var n,r=0,i=[],o=x(e),a=o.length-1;for(;a>=r;r++)n=r===a?this:this.clone(!0),x(o[r])[t](n),h.apply(i,n.get());return this.pushStack(i)}});function Ft(e,n){var r,o,a=0,s=typeof e.getElementsByTagName!==i?e.getElementsByTagName(n||"*"):typeof e.querySelectorAll!==i?e.querySelectorAll(n||"*"):t;if(!s)for(s=[],r=e.childNodes||e;null!=(o=r[a]);a++)!n||x.nodeName(o,n)?s.push(o):x.merge(s,Ft(o,n));return n===t||n&&x.nodeName(e,n)?x.merge([e],s):s}function Bt(e){Ct.test(e.type)&&(e.defaultChecked=e.checked)}x.extend({clone:function(e,t,n){var r,i,o,a,s,l=x.contains(e.ownerDocument,e);if(x.support.html5Clone||x.isXMLDoc(e)||!mt.test("<"+e.nodeName+">")?o=e.cloneNode(!0):(Dt.innerHTML=e.outerHTML,Dt.removeChild(o=Dt.firstChild)),!(x.support.noCloneEvent&&x.support.noCloneChecked||1!==e.nodeType&&11!==e.nodeType||x.isXMLDoc(e)))for(r=Ft(o),s=Ft(e),a=0;null!=(i=s[a]);++a)r[a]&&Ot(i,r[a]);if(t)if(n)for(s=s||Ft(e),r=r||Ft(o),a=0;null!=(i=s[a]);a++)Mt(i,r[a]);else Mt(e,o);return r=Ft(o,"script"),r.length>0&&_t(r,!l&&Ft(e,"script")),r=s=i=null,o},buildFragment:function(e,t,n,r){var i,o,a,s,l,u,c,p=e.length,f=dt(t),d=[],h=0;for(;p>h;h++)if(o=e[h],o||0===o)if("object"===x.type(o))x.merge(d,o.nodeType?[o]:o);else if(wt.test(o)){s=s||f.appendChild(t.createElement("div")),l=(bt.exec(o)||["",""])[1].toLowerCase(),c=At[l]||At._default,s.innerHTML=c[1]+o.replace(vt,"<$1></$2>")+c[2],i=c[0];while(i--)s=s.lastChild;if(!x.support.leadingWhitespace&&yt.test(o)&&d.push(t.createTextNode(yt.exec(o)[0])),!x.support.tbody){o="table"!==l||xt.test(o)?"<table>"!==c[1]||xt.test(o)?0:s:s.firstChild,i=o&&o.childNodes.length;while(i--)x.nodeName(u=o.childNodes[i],"tbody")&&!u.childNodes.length&&o.removeChild(u)}x.merge(d,s.childNodes),s.textContent="";while(s.firstChild)s.removeChild(s.firstChild);s=f.lastChild}else d.push(t.createTextNode(o));s&&f.removeChild(s),x.support.appendChecked||x.grep(Ft(d,"input"),Bt),h=0;while(o=d[h++])if((!r||-1===x.inArray(o,r))&&(a=x.contains(o.ownerDocument,o),s=Ft(f.appendChild(o),"script"),a&&_t(s),n)){i=0;while(o=s[i++])kt.test(o.type||"")&&n.push(o)}return s=null,f},cleanData:function(e,t){var n,r,o,a,s=0,l=x.expando,u=x.cache,c=x.support.deleteExpando,f=x.event.special;for(;null!=(n=e[s]);s++)if((t||x.acceptData(n))&&(o=n[l],a=o&&u[o])){if(a.events)for(r in a.events)f[r]?x.event.remove(n,r):x.removeEvent(n,r,a.handle);
u[o]&&(delete u[o],c?delete n[l]:typeof n.removeAttribute!==i?n.removeAttribute(l):n[l]=null,p.push(o))}},_evalUrl:function(e){return x.ajax({url:e,type:"GET",dataType:"script",async:!1,global:!1,"throws":!0})}}),x.fn.extend({wrapAll:function(e){if(x.isFunction(e))return this.each(function(t){x(this).wrapAll(e.call(this,t))});if(this[0]){var t=x(e,this[0].ownerDocument).eq(0).clone(!0);this[0].parentNode&&t.insertBefore(this[0]),t.map(function(){var e=this;while(e.firstChild&&1===e.firstChild.nodeType)e=e.firstChild;return e}).append(this)}return this},wrapInner:function(e){return x.isFunction(e)?this.each(function(t){x(this).wrapInner(e.call(this,t))}):this.each(function(){var t=x(this),n=t.contents();n.length?n.wrapAll(e):t.append(e)})},wrap:function(e){var t=x.isFunction(e);return this.each(function(n){x(this).wrapAll(t?e.call(this,n):e)})},unwrap:function(){return this.parent().each(function(){x.nodeName(this,"body")||x(this).replaceWith(this.childNodes)}).end()}});var Pt,Rt,Wt,$t=/alpha\([^)]*\)/i,It=/opacity\s*=\s*([^)]*)/,zt=/^(top|right|bottom|left)$/,Xt=/^(none|table(?!-c[ea]).+)/,Ut=/^margin/,Vt=RegExp("^("+w+")(.*)$","i"),Yt=RegExp("^("+w+")(?!px)[a-z%]+$","i"),Jt=RegExp("^([+-])=("+w+")","i"),Gt={BODY:"block"},Qt={position:"absolute",visibility:"hidden",display:"block"},Kt={letterSpacing:0,fontWeight:400},Zt=["Top","Right","Bottom","Left"],en=["Webkit","O","Moz","ms"];function tn(e,t){if(t in e)return t;var n=t.charAt(0).toUpperCase()+t.slice(1),r=t,i=en.length;while(i--)if(t=en[i]+n,t in e)return t;return r}function nn(e,t){return e=t||e,"none"===x.css(e,"display")||!x.contains(e.ownerDocument,e)}function rn(e,t){var n,r,i,o=[],a=0,s=e.length;for(;s>a;a++)r=e[a],r.style&&(o[a]=x._data(r,"olddisplay"),n=r.style.display,t?(o[a]||"none"!==n||(r.style.display=""),""===r.style.display&&nn(r)&&(o[a]=x._data(r,"olddisplay",ln(r.nodeName)))):o[a]||(i=nn(r),(n&&"none"!==n||!i)&&x._data(r,"olddisplay",i?n:x.css(r,"display"))));for(a=0;s>a;a++)r=e[a],r.style&&(t&&"none"!==r.style.display&&""!==r.style.display||(r.style.display=t?o[a]||"":"none"));return e}x.fn.extend({css:function(e,n){return x.access(this,function(e,n,r){var i,o,a={},s=0;if(x.isArray(n)){for(o=Rt(e),i=n.length;i>s;s++)a[n[s]]=x.css(e,n[s],!1,o);return a}return r!==t?x.style(e,n,r):x.css(e,n)},e,n,arguments.length>1)},show:function(){return rn(this,!0)},hide:function(){return rn(this)},toggle:function(e){return"boolean"==typeof e?e?this.show():this.hide():this.each(function(){nn(this)?x(this).show():x(this).hide()})}}),x.extend({cssHooks:{opacity:{get:function(e,t){if(t){var n=Wt(e,"opacity");return""===n?"1":n}}}},cssNumber:{columnCount:!0,fillOpacity:!0,fontWeight:!0,lineHeight:!0,opacity:!0,order:!0,orphans:!0,widows:!0,zIndex:!0,zoom:!0},cssProps:{"float":x.support.cssFloat?"cssFloat":"styleFloat"},style:function(e,n,r,i){if(e&&3!==e.nodeType&&8!==e.nodeType&&e.style){var o,a,s,l=x.camelCase(n),u=e.style;if(n=x.cssProps[l]||(x.cssProps[l]=tn(u,l)),s=x.cssHooks[n]||x.cssHooks[l],r===t)return s&&"get"in s&&(o=s.get(e,!1,i))!==t?o:u[n];if(a=typeof r,"string"===a&&(o=Jt.exec(r))&&(r=(o[1]+1)*o[2]+parseFloat(x.css(e,n)),a="number"),!(null==r||"number"===a&&isNaN(r)||("number"!==a||x.cssNumber[l]||(r+="px"),x.support.clearCloneStyle||""!==r||0!==n.indexOf("background")||(u[n]="inherit"),s&&"set"in s&&(r=s.set(e,r,i))===t)))try{u[n]=r}catch(c){}}},css:function(e,n,r,i){var o,a,s,l=x.camelCase(n);return n=x.cssProps[l]||(x.cssProps[l]=tn(e.style,l)),s=x.cssHooks[n]||x.cssHooks[l],s&&"get"in s&&(a=s.get(e,!0,r)),a===t&&(a=Wt(e,n,i)),"normal"===a&&n in Kt&&(a=Kt[n]),""===r||r?(o=parseFloat(a),r===!0||x.isNumeric(o)?o||0:a):a}}),e.getComputedStyle?(Rt=function(t){return e.getComputedStyle(t,null)},Wt=function(e,n,r){var i,o,a,s=r||Rt(e),l=s?s.getPropertyValue(n)||s[n]:t,u=e.style;return s&&(""!==l||x.contains(e.ownerDocument,e)||(l=x.style(e,n)),Yt.test(l)&&Ut.test(n)&&(i=u.width,o=u.minWidth,a=u.maxWidth,u.minWidth=u.maxWidth=u.width=l,l=s.width,u.width=i,u.minWidth=o,u.maxWidth=a)),l}):a.documentElement.currentStyle&&(Rt=function(e){return e.currentStyle},Wt=function(e,n,r){var i,o,a,s=r||Rt(e),l=s?s[n]:t,u=e.style;return null==l&&u&&u[n]&&(l=u[n]),Yt.test(l)&&!zt.test(n)&&(i=u.left,o=e.runtimeStyle,a=o&&o.left,a&&(o.left=e.currentStyle.left),u.left="fontSize"===n?"1em":l,l=u.pixelLeft+"px",u.left=i,a&&(o.left=a)),""===l?"auto":l});function on(e,t,n){var r=Vt.exec(t);return r?Math.max(0,r[1]-(n||0))+(r[2]||"px"):t}function an(e,t,n,r,i){var o=n===(r?"border":"content")?4:"width"===t?1:0,a=0;for(;4>o;o+=2)"margin"===n&&(a+=x.css(e,n+Zt[o],!0,i)),r?("content"===n&&(a-=x.css(e,"padding"+Zt[o],!0,i)),"margin"!==n&&(a-=x.css(e,"border"+Zt[o]+"Width",!0,i))):(a+=x.css(e,"padding"+Zt[o],!0,i),"padding"!==n&&(a+=x.css(e,"border"+Zt[o]+"Width",!0,i)));return a}function sn(e,t,n){var r=!0,i="width"===t?e.offsetWidth:e.offsetHeight,o=Rt(e),a=x.support.boxSizing&&"border-box"===x.css(e,"boxSizing",!1,o);if(0>=i||null==i){if(i=Wt(e,t,o),(0>i||null==i)&&(i=e.style[t]),Yt.test(i))return i;r=a&&(x.support.boxSizingReliable||i===e.style[t]),i=parseFloat(i)||0}return i+an(e,t,n||(a?"border":"content"),r,o)+"px"}function ln(e){var t=a,n=Gt[e];return n||(n=un(e,t),"none"!==n&&n||(Pt=(Pt||x("<iframe frameborder='0' width='0' height='0'/>").css("cssText","display:block !important")).appendTo(t.documentElement),t=(Pt[0].contentWindow||Pt[0].contentDocument).document,t.write("<!doctype html><html><body>"),t.close(),n=un(e,t),Pt.detach()),Gt[e]=n),n}function un(e,t){var n=x(t.createElement(e)).appendTo(t.body),r=x.css(n[0],"display");return n.remove(),r}x.each(["height","width"],function(e,n){x.cssHooks[n]={get:function(e,r,i){return r?0===e.offsetWidth&&Xt.test(x.css(e,"display"))?x.swap(e,Qt,function(){return sn(e,n,i)}):sn(e,n,i):t},set:function(e,t,r){var i=r&&Rt(e);return on(e,t,r?an(e,n,r,x.support.boxSizing&&"border-box"===x.css(e,"boxSizing",!1,i),i):0)}}}),x.support.opacity||(x.cssHooks.opacity={get:function(e,t){return It.test((t&&e.currentStyle?e.currentStyle.filter:e.style.filter)||"")?.01*parseFloat(RegExp.$1)+"":t?"1":""},set:function(e,t){var n=e.style,r=e.currentStyle,i=x.isNumeric(t)?"alpha(opacity="+100*t+")":"",o=r&&r.filter||n.filter||"";n.zoom=1,(t>=1||""===t)&&""===x.trim(o.replace($t,""))&&n.removeAttribute&&(n.removeAttribute("filter"),""===t||r&&!r.filter)||(n.filter=$t.test(o)?o.replace($t,i):o+" "+i)}}),x(function(){x.support.reliableMarginRight||(x.cssHooks.marginRight={get:function(e,n){return n?x.swap(e,{display:"inline-block"},Wt,[e,"marginRight"]):t}}),!x.support.pixelPosition&&x.fn.position&&x.each(["top","left"],function(e,n){x.cssHooks[n]={get:function(e,r){return r?(r=Wt(e,n),Yt.test(r)?x(e).position()[n]+"px":r):t}}})}),x.expr&&x.expr.filters&&(x.expr.filters.hidden=function(e){return 0>=e.offsetWidth&&0>=e.offsetHeight||!x.support.reliableHiddenOffsets&&"none"===(e.style&&e.style.display||x.css(e,"display"))},x.expr.filters.visible=function(e){return!x.expr.filters.hidden(e)}),x.each({margin:"",padding:"",border:"Width"},function(e,t){x.cssHooks[e+t]={expand:function(n){var r=0,i={},o="string"==typeof n?n.split(" "):[n];for(;4>r;r++)i[e+Zt[r]+t]=o[r]||o[r-2]||o[0];return i}},Ut.test(e)||(x.cssHooks[e+t].set=on)});var cn=/%20/g,pn=/\[\]$/,fn=/\r?\n/g,dn=/^(?:submit|button|image|reset|file)$/i,hn=/^(?:input|select|textarea|keygen)/i;x.fn.extend({serialize:function(){return x.param(this.serializeArray())},serializeArray:function(){return this.map(function(){var e=x.prop(this,"elements");return e?x.makeArray(e):this}).filter(function(){var e=this.type;return this.name&&!x(this).is(":disabled")&&hn.test(this.nodeName)&&!dn.test(e)&&(this.checked||!Ct.test(e))}).map(function(e,t){var n=x(this).val();return null==n?null:x.isArray(n)?x.map(n,function(e){return{name:t.name,value:e.replace(fn,"\r\n")}}):{name:t.name,value:n.replace(fn,"\r\n")}}).get()}}),x.param=function(e,n){var r,i=[],o=function(e,t){t=x.isFunction(t)?t():null==t?"":t,i[i.length]=encodeURIComponent(e)+"="+encodeURIComponent(t)};if(n===t&&(n=x.ajaxSettings&&x.ajaxSettings.traditional),x.isArray(e)||e.jquery&&!x.isPlainObject(e))x.each(e,function(){o(this.name,this.value)});else for(r in e)gn(r,e[r],n,o);return i.join("&").replace(cn,"+")};function gn(e,t,n,r){var i;if(x.isArray(t))x.each(t,function(t,i){n||pn.test(e)?r(e,i):gn(e+"["+("object"==typeof i?t:"")+"]",i,n,r)});else if(n||"object"!==x.type(t))r(e,t);else for(i in t)gn(e+"["+i+"]",t[i],n,r)}x.each("blur focus focusin focusout load resize scroll unload click dblclick mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave change select submit keydown keypress keyup error contextmenu".split(" "),function(e,t){x.fn[t]=function(e,n){return arguments.length>0?this.on(t,null,e,n):this.trigger(t)}}),x.fn.extend({hover:function(e,t){return this.mouseenter(e).mouseleave(t||e)},bind:function(e,t,n){return this.on(e,null,t,n)},unbind:function(e,t){return this.off(e,null,t)},delegate:function(e,t,n,r){return this.on(t,e,n,r)},undelegate:function(e,t,n){return 1===arguments.length?this.off(e,"**"):this.off(t,e||"**",n)}});var mn,yn,vn=x.now(),bn=/\?/,xn=/#.*$/,wn=/([?&])_=[^&]*/,Tn=/^(.*?):[ \t]*([^\r\n]*)\r?$/gm,Cn=/^(?:about|app|app-storage|.+-extension|file|res|widget):$/,Nn=/^(?:GET|HEAD)$/,kn=/^\/\//,En=/^([\w.+-]+:)(?:\/\/([^\/?#:]*)(?::(\d+)|)|)/,Sn=x.fn.load,An={},jn={},Dn="*/".concat("*");try{yn=o.href}catch(Ln){yn=a.createElement("a"),yn.href="",yn=yn.href}mn=En.exec(yn.toLowerCase())||[];function Hn(e){return function(t,n){"string"!=typeof t&&(n=t,t="*");var r,i=0,o=t.toLowerCase().match(T)||[];if(x.isFunction(n))while(r=o[i++])"+"===r[0]?(r=r.slice(1)||"*",(e[r]=e[r]||[]).unshift(n)):(e[r]=e[r]||[]).push(n)}}function qn(e,n,r,i){var o={},a=e===jn;function s(l){var u;return o[l]=!0,x.each(e[l]||[],function(e,l){var c=l(n,r,i);return"string"!=typeof c||a||o[c]?a?!(u=c):t:(n.dataTypes.unshift(c),s(c),!1)}),u}return s(n.dataTypes[0])||!o["*"]&&s("*")}function _n(e,n){var r,i,o=x.ajaxSettings.flatOptions||{};for(i in n)n[i]!==t&&((o[i]?e:r||(r={}))[i]=n[i]);return r&&x.extend(!0,e,r),e}x.fn.load=function(e,n,r){if("string"!=typeof e&&Sn)return Sn.apply(this,arguments);var i,o,a,s=this,l=e.indexOf(" ");return l>=0&&(i=e.slice(l,e.length),e=e.slice(0,l)),x.isFunction(n)?(r=n,n=t):n&&"object"==typeof n&&(a="POST"),s.length>0&&x.ajax({url:e,type:a,dataType:"html",data:n}).done(function(e){o=arguments,s.html(i?x("<div>").append(x.parseHTML(e)).find(i):e)}).complete(r&&function(e,t){s.each(r,o||[e.responseText,t,e])}),this},x.each(["ajaxStart","ajaxStop","ajaxComplete","ajaxError","ajaxSuccess","ajaxSend"],function(e,t){x.fn[t]=function(e){return this.on(t,e)}}),x.extend({active:0,lastModified:{},etag:{},ajaxSettings:{url:yn,type:"GET",isLocal:Cn.test(mn[1]),global:!0,processData:!0,async:!0,contentType:"application/x-www-form-urlencoded; charset=UTF-8",accepts:{"*":Dn,text:"text/plain",html:"text/html",xml:"application/xml, text/xml",json:"application/json, text/javascript"},contents:{xml:/xml/,html:/html/,json:/json/},responseFields:{xml:"responseXML",text:"responseText",json:"responseJSON"},converters:{"* text":String,"text html":!0,"text json":x.parseJSON,"text xml":x.parseXML},flatOptions:{url:!0,context:!0}},ajaxSetup:function(e,t){return t?_n(_n(e,x.ajaxSettings),t):_n(x.ajaxSettings,e)},ajaxPrefilter:Hn(An),ajaxTransport:Hn(jn),ajax:function(e,n){"object"==typeof e&&(n=e,e=t),n=n||{};var r,i,o,a,s,l,u,c,p=x.ajaxSetup({},n),f=p.context||p,d=p.context&&(f.nodeType||f.jquery)?x(f):x.event,h=x.Deferred(),g=x.Callbacks("once memory"),m=p.statusCode||{},y={},v={},b=0,w="canceled",C={readyState:0,getResponseHeader:function(e){var t;if(2===b){if(!c){c={};while(t=Tn.exec(a))c[t[1].toLowerCase()]=t[2]}t=c[e.toLowerCase()]}return null==t?null:t},getAllResponseHeaders:function(){return 2===b?a:null},setRequestHeader:function(e,t){var n=e.toLowerCase();return b||(e=v[n]=v[n]||e,y[e]=t),this},overrideMimeType:function(e){return b||(p.mimeType=e),this},statusCode:function(e){var t;if(e)if(2>b)for(t in e)m[t]=[m[t],e[t]];else C.always(e[C.status]);return this},abort:function(e){var t=e||w;return u&&u.abort(t),k(0,t),this}};if(h.promise(C).complete=g.add,C.success=C.done,C.error=C.fail,p.url=((e||p.url||yn)+"").replace(xn,"").replace(kn,mn[1]+"//"),p.type=n.method||n.type||p.method||p.type,p.dataTypes=x.trim(p.dataType||"*").toLowerCase().match(T)||[""],null==p.crossDomain&&(r=En.exec(p.url.toLowerCase()),p.crossDomain=!(!r||r[1]===mn[1]&&r[2]===mn[2]&&(r[3]||("http:"===r[1]?"80":"443"))===(mn[3]||("http:"===mn[1]?"80":"443")))),p.data&&p.processData&&"string"!=typeof p.data&&(p.data=x.param(p.data,p.traditional)),qn(An,p,n,C),2===b)return C;l=p.global,l&&0===x.active++&&x.event.trigger("ajaxStart"),p.type=p.type.toUpperCase(),p.hasContent=!Nn.test(p.type),o=p.url,p.hasContent||(p.data&&(o=p.url+=(bn.test(o)?"&":"?")+p.data,delete p.data),p.cache===!1&&(p.url=wn.test(o)?o.replace(wn,"$1_="+vn++):o+(bn.test(o)?"&":"?")+"_="+vn++)),p.ifModified&&(x.lastModified[o]&&C.setRequestHeader("If-Modified-Since",x.lastModified[o]),x.etag[o]&&C.setRequestHeader("If-None-Match",x.etag[o])),(p.data&&p.hasContent&&p.contentType!==!1||n.contentType)&&C.setRequestHeader("Content-Type",p.contentType),C.setRequestHeader("Accept",p.dataTypes[0]&&p.accepts[p.dataTypes[0]]?p.accepts[p.dataTypes[0]]+("*"!==p.dataTypes[0]?", "+Dn+"; q=0.01":""):p.accepts["*"]);for(i in p.headers)C.setRequestHeader(i,p.headers[i]);if(p.beforeSend&&(p.beforeSend.call(f,C,p)===!1||2===b))return C.abort();w="abort";for(i in{success:1,error:1,complete:1})C[i](p[i]);if(u=qn(jn,p,n,C)){C.readyState=1,l&&d.trigger("ajaxSend",[C,p]),p.async&&p.timeout>0&&(s=setTimeout(function(){C.abort("timeout")},p.timeout));try{b=1,u.send(y,k)}catch(N){if(!(2>b))throw N;k(-1,N)}}else k(-1,"No Transport");function k(e,n,r,i){var c,y,v,w,T,N=n;2!==b&&(b=2,s&&clearTimeout(s),u=t,a=i||"",C.readyState=e>0?4:0,c=e>=200&&300>e||304===e,r&&(w=Mn(p,C,r)),w=On(p,w,C,c),c?(p.ifModified&&(T=C.getResponseHeader("Last-Modified"),T&&(x.lastModified[o]=T),T=C.getResponseHeader("etag"),T&&(x.etag[o]=T)),204===e||"HEAD"===p.type?N="nocontent":304===e?N="notmodified":(N=w.state,y=w.data,v=w.error,c=!v)):(v=N,(e||!N)&&(N="error",0>e&&(e=0))),C.status=e,C.statusText=(n||N)+"",c?h.resolveWith(f,[y,N,C]):h.rejectWith(f,[C,N,v]),C.statusCode(m),m=t,l&&d.trigger(c?"ajaxSuccess":"ajaxError",[C,p,c?y:v]),g.fireWith(f,[C,N]),l&&(d.trigger("ajaxComplete",[C,p]),--x.active||x.event.trigger("ajaxStop")))}return C},getJSON:function(e,t,n){return x.get(e,t,n,"json")},getScript:function(e,n){return x.get(e,t,n,"script")}}),x.each(["get","post"],function(e,n){x[n]=function(e,r,i,o){return x.isFunction(r)&&(o=o||i,i=r,r=t),x.ajax({url:e,type:n,dataType:o,data:r,success:i})}});function Mn(e,n,r){var i,o,a,s,l=e.contents,u=e.dataTypes;while("*"===u[0])u.shift(),o===t&&(o=e.mimeType||n.getResponseHeader("Content-Type"));if(o)for(s in l)if(l[s]&&l[s].test(o)){u.unshift(s);break}if(u[0]in r)a=u[0];else{for(s in r){if(!u[0]||e.converters[s+" "+u[0]]){a=s;break}i||(i=s)}a=a||i}return a?(a!==u[0]&&u.unshift(a),r[a]):t}function On(e,t,n,r){var i,o,a,s,l,u={},c=e.dataTypes.slice();if(c[1])for(a in e.converters)u[a.toLowerCase()]=e.converters[a];o=c.shift();while(o)if(e.responseFields[o]&&(n[e.responseFields[o]]=t),!l&&r&&e.dataFilter&&(t=e.dataFilter(t,e.dataType)),l=o,o=c.shift())if("*"===o)o=l;else if("*"!==l&&l!==o){if(a=u[l+" "+o]||u["* "+o],!a)for(i in u)if(s=i.split(" "),s[1]===o&&(a=u[l+" "+s[0]]||u["* "+s[0]])){a===!0?a=u[i]:u[i]!==!0&&(o=s[0],c.unshift(s[1]));break}if(a!==!0)if(a&&e["throws"])t=a(t);else try{t=a(t)}catch(p){return{state:"parsererror",error:a?p:"No conversion from "+l+" to "+o}}}return{state:"success",data:t}}x.ajaxSetup({accepts:{script:"text/javascript, application/javascript, application/ecmascript, application/x-ecmascript"},contents:{script:/(?:java|ecma)script/},converters:{"text script":function(e){return x.globalEval(e),e}}}),x.ajaxPrefilter("script",function(e){e.cache===t&&(e.cache=!1),e.crossDomain&&(e.type="GET",e.global=!1)}),x.ajaxTransport("script",function(e){if(e.crossDomain){var n,r=a.head||x("head")[0]||a.documentElement;return{send:function(t,i){n=a.createElement("script"),n.async=!0,e.scriptCharset&&(n.charset=e.scriptCharset),n.src=e.url,n.onload=n.onreadystatechange=function(e,t){(t||!n.readyState||/loaded|complete/.test(n.readyState))&&(n.onload=n.onreadystatechange=null,n.parentNode&&n.parentNode.removeChild(n),n=null,t||i(200,"success"))},r.insertBefore(n,r.firstChild)},abort:function(){n&&n.onload(t,!0)}}}});var Fn=[],Bn=/(=)\?(?=&|$)|\?\?/;x.ajaxSetup({jsonp:"callback",jsonpCallback:function(){var e=Fn.pop()||x.expando+"_"+vn++;return this[e]=!0,e}}),x.ajaxPrefilter("json jsonp",function(n,r,i){var o,a,s,l=n.jsonp!==!1&&(Bn.test(n.url)?"url":"string"==typeof n.data&&!(n.contentType||"").indexOf("application/x-www-form-urlencoded")&&Bn.test(n.data)&&"data");return l||"jsonp"===n.dataTypes[0]?(o=n.jsonpCallback=x.isFunction(n.jsonpCallback)?n.jsonpCallback():n.jsonpCallback,l?n[l]=n[l].replace(Bn,"$1"+o):n.jsonp!==!1&&(n.url+=(bn.test(n.url)?"&":"?")+n.jsonp+"="+o),n.converters["script json"]=function(){return s||x.error(o+" was not called"),s[0]},n.dataTypes[0]="json",a=e[o],e[o]=function(){s=arguments},i.always(function(){e[o]=a,n[o]&&(n.jsonpCallback=r.jsonpCallback,Fn.push(o)),s&&x.isFunction(a)&&a(s[0]),s=a=t}),"script"):t});var Pn,Rn,Wn=0,$n=e.ActiveXObject&&function(){var e;for(e in Pn)Pn[e](t,!0)};function In(){try{return new e.XMLHttpRequest}catch(t){}}function zn(){try{return new e.ActiveXObject("Microsoft.XMLHTTP")}catch(t){}}x.ajaxSettings.xhr=e.ActiveXObject?function(){return!this.isLocal&&In()||zn()}:In,Rn=x.ajaxSettings.xhr(),x.support.cors=!!Rn&&"withCredentials"in Rn,Rn=x.support.ajax=!!Rn,Rn&&x.ajaxTransport(function(n){if(!n.crossDomain||x.support.cors){var r;return{send:function(i,o){var a,s,l=n.xhr();if(n.username?l.open(n.type,n.url,n.async,n.username,n.password):l.open(n.type,n.url,n.async),n.xhrFields)for(s in n.xhrFields)l[s]=n.xhrFields[s];n.mimeType&&l.overrideMimeType&&l.overrideMimeType(n.mimeType),n.crossDomain||i["X-Requested-With"]||(i["X-Requested-With"]="XMLHttpRequest");try{for(s in i)l.setRequestHeader(s,i[s])}catch(u){}l.send(n.hasContent&&n.data||null),r=function(e,i){var s,u,c,p;try{if(r&&(i||4===l.readyState))if(r=t,a&&(l.onreadystatechange=x.noop,$n&&delete Pn[a]),i)4!==l.readyState&&l.abort();else{p={},s=l.status,u=l.getAllResponseHeaders(),"string"==typeof l.responseText&&(p.text=l.responseText);try{c=l.statusText}catch(f){c=""}s||!n.isLocal||n.crossDomain?1223===s&&(s=204):s=p.text?200:404}}catch(d){i||o(-1,d)}p&&o(s,c,p,u)},n.async?4===l.readyState?setTimeout(r):(a=++Wn,$n&&(Pn||(Pn={},x(e).unload($n)),Pn[a]=r),l.onreadystatechange=r):r()},abort:function(){r&&r(t,!0)}}}});var Xn,Un,Vn=/^(?:toggle|show|hide)$/,Yn=RegExp("^(?:([+-])=|)("+w+")([a-z%]*)$","i"),Jn=/queueHooks$/,Gn=[nr],Qn={"*":[function(e,t){var n=this.createTween(e,t),r=n.cur(),i=Yn.exec(t),o=i&&i[3]||(x.cssNumber[e]?"":"px"),a=(x.cssNumber[e]||"px"!==o&&+r)&&Yn.exec(x.css(n.elem,e)),s=1,l=20;if(a&&a[3]!==o){o=o||a[3],i=i||[],a=+r||1;do s=s||".5",a/=s,x.style(n.elem,e,a+o);while(s!==(s=n.cur()/r)&&1!==s&&--l)}return i&&(a=n.start=+a||+r||0,n.unit=o,n.end=i[1]?a+(i[1]+1)*i[2]:+i[2]),n}]};function Kn(){return setTimeout(function(){Xn=t}),Xn=x.now()}function Zn(e,t,n){var r,i=(Qn[t]||[]).concat(Qn["*"]),o=0,a=i.length;for(;a>o;o++)if(r=i[o].call(n,t,e))return r}function er(e,t,n){var r,i,o=0,a=Gn.length,s=x.Deferred().always(function(){delete l.elem}),l=function(){if(i)return!1;var t=Xn||Kn(),n=Math.max(0,u.startTime+u.duration-t),r=n/u.duration||0,o=1-r,a=0,l=u.tweens.length;for(;l>a;a++)u.tweens[a].run(o);return s.notifyWith(e,[u,o,n]),1>o&&l?n:(s.resolveWith(e,[u]),!1)},u=s.promise({elem:e,props:x.extend({},t),opts:x.extend(!0,{specialEasing:{}},n),originalProperties:t,originalOptions:n,startTime:Xn||Kn(),duration:n.duration,tweens:[],createTween:function(t,n){var r=x.Tween(e,u.opts,t,n,u.opts.specialEasing[t]||u.opts.easing);return u.tweens.push(r),r},stop:function(t){var n=0,r=t?u.tweens.length:0;if(i)return this;for(i=!0;r>n;n++)u.tweens[n].run(1);return t?s.resolveWith(e,[u,t]):s.rejectWith(e,[u,t]),this}}),c=u.props;for(tr(c,u.opts.specialEasing);a>o;o++)if(r=Gn[o].call(u,e,c,u.opts))return r;return x.map(c,Zn,u),x.isFunction(u.opts.start)&&u.opts.start.call(e,u),x.fx.timer(x.extend(l,{elem:e,anim:u,queue:u.opts.queue})),u.progress(u.opts.progress).done(u.opts.done,u.opts.complete).fail(u.opts.fail).always(u.opts.always)}function tr(e,t){var n,r,i,o,a;for(n in e)if(r=x.camelCase(n),i=t[r],o=e[n],x.isArray(o)&&(i=o[1],o=e[n]=o[0]),n!==r&&(e[r]=o,delete e[n]),a=x.cssHooks[r],a&&"expand"in a){o=a.expand(o),delete e[r];for(n in o)n in e||(e[n]=o[n],t[n]=i)}else t[r]=i}x.Animation=x.extend(er,{tweener:function(e,t){x.isFunction(e)?(t=e,e=["*"]):e=e.split(" ");var n,r=0,i=e.length;for(;i>r;r++)n=e[r],Qn[n]=Qn[n]||[],Qn[n].unshift(t)},prefilter:function(e,t){t?Gn.unshift(e):Gn.push(e)}});function nr(e,t,n){var r,i,o,a,s,l,u=this,c={},p=e.style,f=e.nodeType&&nn(e),d=x._data(e,"fxshow");n.queue||(s=x._queueHooks(e,"fx"),null==s.unqueued&&(s.unqueued=0,l=s.empty.fire,s.empty.fire=function(){s.unqueued||l()}),s.unqueued++,u.always(function(){u.always(function(){s.unqueued--,x.queue(e,"fx").length||s.empty.fire()})})),1===e.nodeType&&("height"in t||"width"in t)&&(n.overflow=[p.overflow,p.overflowX,p.overflowY],"inline"===x.css(e,"display")&&"none"===x.css(e,"float")&&(x.support.inlineBlockNeedsLayout&&"inline"!==ln(e.nodeName)?p.zoom=1:p.display="inline-block")),n.overflow&&(p.overflow="hidden",x.support.shrinkWrapBlocks||u.always(function(){p.overflow=n.overflow[0],p.overflowX=n.overflow[1],p.overflowY=n.overflow[2]}));for(r in t)if(i=t[r],Vn.exec(i)){if(delete t[r],o=o||"toggle"===i,i===(f?"hide":"show"))continue;c[r]=d&&d[r]||x.style(e,r)}if(!x.isEmptyObject(c)){d?"hidden"in d&&(f=d.hidden):d=x._data(e,"fxshow",{}),o&&(d.hidden=!f),f?x(e).show():u.done(function(){x(e).hide()}),u.done(function(){var t;x._removeData(e,"fxshow");for(t in c)x.style(e,t,c[t])});for(r in c)a=Zn(f?d[r]:0,r,u),r in d||(d[r]=a.start,f&&(a.end=a.start,a.start="width"===r||"height"===r?1:0))}}function rr(e,t,n,r,i){return new rr.prototype.init(e,t,n,r,i)}x.Tween=rr,rr.prototype={constructor:rr,init:function(e,t,n,r,i,o){this.elem=e,this.prop=n,this.easing=i||"swing",this.options=t,this.start=this.now=this.cur(),this.end=r,this.unit=o||(x.cssNumber[n]?"":"px")},cur:function(){var e=rr.propHooks[this.prop];return e&&e.get?e.get(this):rr.propHooks._default.get(this)},run:function(e){var t,n=rr.propHooks[this.prop];return this.pos=t=this.options.duration?x.easing[this.easing](e,this.options.duration*e,0,1,this.options.duration):e,this.now=(this.end-this.start)*t+this.start,this.options.step&&this.options.step.call(this.elem,this.now,this),n&&n.set?n.set(this):rr.propHooks._default.set(this),this}},rr.prototype.init.prototype=rr.prototype,rr.propHooks={_default:{get:function(e){var t;return null==e.elem[e.prop]||e.elem.style&&null!=e.elem.style[e.prop]?(t=x.css(e.elem,e.prop,""),t&&"auto"!==t?t:0):e.elem[e.prop]},set:function(e){x.fx.step[e.prop]?x.fx.step[e.prop](e):e.elem.style&&(null!=e.elem.style[x.cssProps[e.prop]]||x.cssHooks[e.prop])?x.style(e.elem,e.prop,e.now+e.unit):e.elem[e.prop]=e.now}}},rr.propHooks.scrollTop=rr.propHooks.scrollLeft={set:function(e){e.elem.nodeType&&e.elem.parentNode&&(e.elem[e.prop]=e.now)}},x.each(["toggle","show","hide"],function(e,t){var n=x.fn[t];x.fn[t]=function(e,r,i){return null==e||"boolean"==typeof e?n.apply(this,arguments):this.animate(ir(t,!0),e,r,i)}}),x.fn.extend({fadeTo:function(e,t,n,r){return this.filter(nn).css("opacity",0).show().end().animate({opacity:t},e,n,r)},animate:function(e,t,n,r){var i=x.isEmptyObject(e),o=x.speed(t,n,r),a=function(){var t=er(this,x.extend({},e),o);(i||x._data(this,"finish"))&&t.stop(!0)};return a.finish=a,i||o.queue===!1?this.each(a):this.queue(o.queue,a)},stop:function(e,n,r){var i=function(e){var t=e.stop;delete e.stop,t(r)};return"string"!=typeof e&&(r=n,n=e,e=t),n&&e!==!1&&this.queue(e||"fx",[]),this.each(function(){var t=!0,n=null!=e&&e+"queueHooks",o=x.timers,a=x._data(this);if(n)a[n]&&a[n].stop&&i(a[n]);else for(n in a)a[n]&&a[n].stop&&Jn.test(n)&&i(a[n]);for(n=o.length;n--;)o[n].elem!==this||null!=e&&o[n].queue!==e||(o[n].anim.stop(r),t=!1,o.splice(n,1));(t||!r)&&x.dequeue(this,e)})},finish:function(e){return e!==!1&&(e=e||"fx"),this.each(function(){var t,n=x._data(this),r=n[e+"queue"],i=n[e+"queueHooks"],o=x.timers,a=r?r.length:0;for(n.finish=!0,x.queue(this,e,[]),i&&i.stop&&i.stop.call(this,!0),t=o.length;t--;)o[t].elem===this&&o[t].queue===e&&(o[t].anim.stop(!0),o.splice(t,1));for(t=0;a>t;t++)r[t]&&r[t].finish&&r[t].finish.call(this);delete n.finish})}});function ir(e,t){var n,r={height:e},i=0;for(t=t?1:0;4>i;i+=2-t)n=Zt[i],r["margin"+n]=r["padding"+n]=e;return t&&(r.opacity=r.width=e),r}x.each({slideDown:ir("show"),slideUp:ir("hide"),slideToggle:ir("toggle"),fadeIn:{opacity:"show"},fadeOut:{opacity:"hide"},fadeToggle:{opacity:"toggle"}},function(e,t){x.fn[e]=function(e,n,r){return this.animate(t,e,n,r)}}),x.speed=function(e,t,n){var r=e&&"object"==typeof e?x.extend({},e):{complete:n||!n&&t||x.isFunction(e)&&e,duration:e,easing:n&&t||t&&!x.isFunction(t)&&t};return r.duration=x.fx.off?0:"number"==typeof r.duration?r.duration:r.duration in x.fx.speeds?x.fx.speeds[r.duration]:x.fx.speeds._default,(null==r.queue||r.queue===!0)&&(r.queue="fx"),r.old=r.complete,r.complete=function(){x.isFunction(r.old)&&r.old.call(this),r.queue&&x.dequeue(this,r.queue)},r},x.easing={linear:function(e){return e},swing:function(e){return.5-Math.cos(e*Math.PI)/2}},x.timers=[],x.fx=rr.prototype.init,x.fx.tick=function(){var e,n=x.timers,r=0;for(Xn=x.now();n.length>r;r++)e=n[r],e()||n[r]!==e||n.splice(r--,1);n.length||x.fx.stop(),Xn=t},x.fx.timer=function(e){e()&&x.timers.push(e)&&x.fx.start()},x.fx.interval=13,x.fx.start=function(){Un||(Un=setInterval(x.fx.tick,x.fx.interval))},x.fx.stop=function(){clearInterval(Un),Un=null},x.fx.speeds={slow:600,fast:200,_default:400},x.fx.step={},x.expr&&x.expr.filters&&(x.expr.filters.animated=function(e){return x.grep(x.timers,function(t){return e===t.elem}).length}),x.fn.offset=function(e){if(arguments.length)return e===t?this:this.each(function(t){x.offset.setOffset(this,e,t)});var n,r,o={top:0,left:0},a=this[0],s=a&&a.ownerDocument;if(s)return n=s.documentElement,x.contains(n,a)?(typeof a.getBoundingClientRect!==i&&(o=a.getBoundingClientRect()),r=or(s),{top:o.top+(r.pageYOffset||n.scrollTop)-(n.clientTop||0),left:o.left+(r.pageXOffset||n.scrollLeft)-(n.clientLeft||0)}):o},x.offset={setOffset:function(e,t,n){var r=x.css(e,"position");"static"===r&&(e.style.position="relative");var i=x(e),o=i.offset(),a=x.css(e,"top"),s=x.css(e,"left"),l=("absolute"===r||"fixed"===r)&&x.inArray("auto",[a,s])>-1,u={},c={},p,f;l?(c=i.position(),p=c.top,f=c.left):(p=parseFloat(a)||0,f=parseFloat(s)||0),x.isFunction(t)&&(t=t.call(e,n,o)),null!=t.top&&(u.top=t.top-o.top+p),null!=t.left&&(u.left=t.left-o.left+f),"using"in t?t.using.call(e,u):i.css(u)}},x.fn.extend({position:function(){if(this[0]){var e,t,n={top:0,left:0},r=this[0];return"fixed"===x.css(r,"position")?t=r.getBoundingClientRect():(e=this.offsetParent(),t=this.offset(),x.nodeName(e[0],"html")||(n=e.offset()),n.top+=x.css(e[0],"borderTopWidth",!0),n.left+=x.css(e[0],"borderLeftWidth",!0)),{top:t.top-n.top-x.css(r,"marginTop",!0),left:t.left-n.left-x.css(r,"marginLeft",!0)}}},offsetParent:function(){return this.map(function(){var e=this.offsetParent||s;while(e&&!x.nodeName(e,"html")&&"static"===x.css(e,"position"))e=e.offsetParent;return e||s})}}),x.each({scrollLeft:"pageXOffset",scrollTop:"pageYOffset"},function(e,n){var r=/Y/.test(n);x.fn[e]=function(i){return x.access(this,function(e,i,o){var a=or(e);return o===t?a?n in a?a[n]:a.document.documentElement[i]:e[i]:(a?a.scrollTo(r?x(a).scrollLeft():o,r?o:x(a).scrollTop()):e[i]=o,t)},e,i,arguments.length,null)}});function or(e){return x.isWindow(e)?e:9===e.nodeType?e.defaultView||e.parentWindow:!1}x.each({Height:"height",Width:"width"},function(e,n){x.each({padding:"inner"+e,content:n,"":"outer"+e},function(r,i){x.fn[i]=function(i,o){var a=arguments.length&&(r||"boolean"!=typeof i),s=r||(i===!0||o===!0?"margin":"border");return x.access(this,function(n,r,i){var o;return x.isWindow(n)?n.document.documentElement["client"+e]:9===n.nodeType?(o=n.documentElement,Math.max(n.body["scroll"+e],o["scroll"+e],n.body["offset"+e],o["offset"+e],o["client"+e])):i===t?x.css(n,r,s):x.style(n,r,i,s)},n,a?i:t,a,null)}})}),x.fn.size=function(){return this.length},x.fn.andSelf=x.fn.addBack,"object"==typeof module&&module&&"object"==typeof module.exports?module.exports=x:(e.jQuery=e.$=x,"function"==typeof define&&define.amd&&define("jquery",[],function(){return x}))})(window);
//     Underscore.js 1.5.2
//     http://underscorejs.org
//     (c) 2009-2013 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
//     Underscore may be freely distributed under the MIT license.
(function(){var n=this,t=n._,r={},e=Array.prototype,u=Object.prototype,i=Function.prototype,a=e.push,o=e.slice,c=e.concat,l=u.toString,f=u.hasOwnProperty,s=e.forEach,p=e.map,h=e.reduce,v=e.reduceRight,g=e.filter,d=e.every,m=e.some,y=e.indexOf,b=e.lastIndexOf,x=Array.isArray,w=Object.keys,_=i.bind,j=function(n){return n instanceof j?n:this instanceof j?(this._wrapped=n,void 0):new j(n)};"undefined"!=typeof exports?("undefined"!=typeof module&&module.exports&&(exports=module.exports=j),exports._=j):n._=j,j.VERSION="1.5.2";var A=j.each=j.forEach=function(n,t,e){if(null!=n)if(s&&n.forEach===s)n.forEach(t,e);else if(n.length===+n.length){for(var u=0,i=n.length;i>u;u++)if(t.call(e,n[u],u,n)===r)return}else for(var a=j.keys(n),u=0,i=a.length;i>u;u++)if(t.call(e,n[a[u]],a[u],n)===r)return};j.map=j.collect=function(n,t,r){var e=[];return null==n?e:p&&n.map===p?n.map(t,r):(A(n,function(n,u,i){e.push(t.call(r,n,u,i))}),e)};var E="Reduce of empty array with no initial value";j.reduce=j.foldl=j.inject=function(n,t,r,e){var u=arguments.length>2;if(null==n&&(n=[]),h&&n.reduce===h)return e&&(t=j.bind(t,e)),u?n.reduce(t,r):n.reduce(t);if(A(n,function(n,i,a){u?r=t.call(e,r,n,i,a):(r=n,u=!0)}),!u)throw new TypeError(E);return r},j.reduceRight=j.foldr=function(n,t,r,e){var u=arguments.length>2;if(null==n&&(n=[]),v&&n.reduceRight===v)return e&&(t=j.bind(t,e)),u?n.reduceRight(t,r):n.reduceRight(t);var i=n.length;if(i!==+i){var a=j.keys(n);i=a.length}if(A(n,function(o,c,l){c=a?a[--i]:--i,u?r=t.call(e,r,n[c],c,l):(r=n[c],u=!0)}),!u)throw new TypeError(E);return r},j.find=j.detect=function(n,t,r){var e;return O(n,function(n,u,i){return t.call(r,n,u,i)?(e=n,!0):void 0}),e},j.filter=j.select=function(n,t,r){var e=[];return null==n?e:g&&n.filter===g?n.filter(t,r):(A(n,function(n,u,i){t.call(r,n,u,i)&&e.push(n)}),e)},j.reject=function(n,t,r){return j.filter(n,function(n,e,u){return!t.call(r,n,e,u)},r)},j.every=j.all=function(n,t,e){t||(t=j.identity);var u=!0;return null==n?u:d&&n.every===d?n.every(t,e):(A(n,function(n,i,a){return(u=u&&t.call(e,n,i,a))?void 0:r}),!!u)};var O=j.some=j.any=function(n,t,e){t||(t=j.identity);var u=!1;return null==n?u:m&&n.some===m?n.some(t,e):(A(n,function(n,i,a){return u||(u=t.call(e,n,i,a))?r:void 0}),!!u)};j.contains=j.include=function(n,t){return null==n?!1:y&&n.indexOf===y?n.indexOf(t)!=-1:O(n,function(n){return n===t})},j.invoke=function(n,t){var r=o.call(arguments,2),e=j.isFunction(t);return j.map(n,function(n){return(e?t:n[t]).apply(n,r)})},j.pluck=function(n,t){return j.map(n,function(n){return n[t]})},j.where=function(n,t,r){return j.isEmpty(t)?r?void 0:[]:j[r?"find":"filter"](n,function(n){for(var r in t)if(t[r]!==n[r])return!1;return!0})},j.findWhere=function(n,t){return j.where(n,t,!0)},j.max=function(n,t,r){if(!t&&j.isArray(n)&&n[0]===+n[0]&&n.length<65535)return Math.max.apply(Math,n);if(!t&&j.isEmpty(n))return-1/0;var e={computed:-1/0,value:-1/0};return A(n,function(n,u,i){var a=t?t.call(r,n,u,i):n;a>e.computed&&(e={value:n,computed:a})}),e.value},j.min=function(n,t,r){if(!t&&j.isArray(n)&&n[0]===+n[0]&&n.length<65535)return Math.min.apply(Math,n);if(!t&&j.isEmpty(n))return 1/0;var e={computed:1/0,value:1/0};return A(n,function(n,u,i){var a=t?t.call(r,n,u,i):n;a<e.computed&&(e={value:n,computed:a})}),e.value},j.shuffle=function(n){var t,r=0,e=[];return A(n,function(n){t=j.random(r++),e[r-1]=e[t],e[t]=n}),e},j.sample=function(n,t,r){return arguments.length<2||r?n[j.random(n.length-1)]:j.shuffle(n).slice(0,Math.max(0,t))};var k=function(n){return j.isFunction(n)?n:function(t){return t[n]}};j.sortBy=function(n,t,r){var e=k(t);return j.pluck(j.map(n,function(n,t,u){return{value:n,index:t,criteria:e.call(r,n,t,u)}}).sort(function(n,t){var r=n.criteria,e=t.criteria;if(r!==e){if(r>e||r===void 0)return 1;if(e>r||e===void 0)return-1}return n.index-t.index}),"value")};var F=function(n){return function(t,r,e){var u={},i=null==r?j.identity:k(r);return A(t,function(r,a){var o=i.call(e,r,a,t);n(u,o,r)}),u}};j.groupBy=F(function(n,t,r){(j.has(n,t)?n[t]:n[t]=[]).push(r)}),j.indexBy=F(function(n,t,r){n[t]=r}),j.countBy=F(function(n,t){j.has(n,t)?n[t]++:n[t]=1}),j.sortedIndex=function(n,t,r,e){r=null==r?j.identity:k(r);for(var u=r.call(e,t),i=0,a=n.length;a>i;){var o=i+a>>>1;r.call(e,n[o])<u?i=o+1:a=o}return i},j.toArray=function(n){return n?j.isArray(n)?o.call(n):n.length===+n.length?j.map(n,j.identity):j.values(n):[]},j.size=function(n){return null==n?0:n.length===+n.length?n.length:j.keys(n).length},j.first=j.head=j.take=function(n,t,r){return null==n?void 0:null==t||r?n[0]:o.call(n,0,t)},j.initial=function(n,t,r){return o.call(n,0,n.length-(null==t||r?1:t))},j.last=function(n,t,r){return null==n?void 0:null==t||r?n[n.length-1]:o.call(n,Math.max(n.length-t,0))},j.rest=j.tail=j.drop=function(n,t,r){return o.call(n,null==t||r?1:t)},j.compact=function(n){return j.filter(n,j.identity)};var M=function(n,t,r){return t&&j.every(n,j.isArray)?c.apply(r,n):(A(n,function(n){j.isArray(n)||j.isArguments(n)?t?a.apply(r,n):M(n,t,r):r.push(n)}),r)};j.flatten=function(n,t){return M(n,t,[])},j.without=function(n){return j.difference(n,o.call(arguments,1))},j.uniq=j.unique=function(n,t,r,e){j.isFunction(t)&&(e=r,r=t,t=!1);var u=r?j.map(n,r,e):n,i=[],a=[];return A(u,function(r,e){(t?e&&a[a.length-1]===r:j.contains(a,r))||(a.push(r),i.push(n[e]))}),i},j.union=function(){return j.uniq(j.flatten(arguments,!0))},j.intersection=function(n){var t=o.call(arguments,1);return j.filter(j.uniq(n),function(n){return j.every(t,function(t){return j.indexOf(t,n)>=0})})},j.difference=function(n){var t=c.apply(e,o.call(arguments,1));return j.filter(n,function(n){return!j.contains(t,n)})},j.zip=function(){for(var n=j.max(j.pluck(arguments,"length").concat(0)),t=new Array(n),r=0;n>r;r++)t[r]=j.pluck(arguments,""+r);return t},j.object=function(n,t){if(null==n)return{};for(var r={},e=0,u=n.length;u>e;e++)t?r[n[e]]=t[e]:r[n[e][0]]=n[e][1];return r},j.indexOf=function(n,t,r){if(null==n)return-1;var e=0,u=n.length;if(r){if("number"!=typeof r)return e=j.sortedIndex(n,t),n[e]===t?e:-1;e=0>r?Math.max(0,u+r):r}if(y&&n.indexOf===y)return n.indexOf(t,r);for(;u>e;e++)if(n[e]===t)return e;return-1},j.lastIndexOf=function(n,t,r){if(null==n)return-1;var e=null!=r;if(b&&n.lastIndexOf===b)return e?n.lastIndexOf(t,r):n.lastIndexOf(t);for(var u=e?r:n.length;u--;)if(n[u]===t)return u;return-1},j.range=function(n,t,r){arguments.length<=1&&(t=n||0,n=0),r=arguments[2]||1;for(var e=Math.max(Math.ceil((t-n)/r),0),u=0,i=new Array(e);e>u;)i[u++]=n,n+=r;return i};var R=function(){};j.bind=function(n,t){var r,e;if(_&&n.bind===_)return _.apply(n,o.call(arguments,1));if(!j.isFunction(n))throw new TypeError;return r=o.call(arguments,2),e=function(){if(!(this instanceof e))return n.apply(t,r.concat(o.call(arguments)));R.prototype=n.prototype;var u=new R;R.prototype=null;var i=n.apply(u,r.concat(o.call(arguments)));return Object(i)===i?i:u}},j.partial=function(n){var t=o.call(arguments,1);return function(){return n.apply(this,t.concat(o.call(arguments)))}},j.bindAll=function(n){var t=o.call(arguments,1);if(0===t.length)throw new Error("bindAll must be passed function names");return A(t,function(t){n[t]=j.bind(n[t],n)}),n},j.memoize=function(n,t){var r={};return t||(t=j.identity),function(){var e=t.apply(this,arguments);return j.has(r,e)?r[e]:r[e]=n.apply(this,arguments)}},j.delay=function(n,t){var r=o.call(arguments,2);return setTimeout(function(){return n.apply(null,r)},t)},j.defer=function(n){return j.delay.apply(j,[n,1].concat(o.call(arguments,1)))},j.throttle=function(n,t,r){var e,u,i,a=null,o=0;r||(r={});var c=function(){o=r.leading===!1?0:new Date,a=null,i=n.apply(e,u)};return function(){var l=new Date;o||r.leading!==!1||(o=l);var f=t-(l-o);return e=this,u=arguments,0>=f?(clearTimeout(a),a=null,o=l,i=n.apply(e,u)):a||r.trailing===!1||(a=setTimeout(c,f)),i}},j.debounce=function(n,t,r){var e,u,i,a,o;return function(){i=this,u=arguments,a=new Date;var c=function(){var l=new Date-a;t>l?e=setTimeout(c,t-l):(e=null,r||(o=n.apply(i,u)))},l=r&&!e;return e||(e=setTimeout(c,t)),l&&(o=n.apply(i,u)),o}},j.once=function(n){var t,r=!1;return function(){return r?t:(r=!0,t=n.apply(this,arguments),n=null,t)}},j.wrap=function(n,t){return function(){var r=[n];return a.apply(r,arguments),t.apply(this,r)}},j.compose=function(){var n=arguments;return function(){for(var t=arguments,r=n.length-1;r>=0;r--)t=[n[r].apply(this,t)];return t[0]}},j.after=function(n,t){return function(){return--n<1?t.apply(this,arguments):void 0}},j.keys=w||function(n){if(n!==Object(n))throw new TypeError("Invalid object");var t=[];for(var r in n)j.has(n,r)&&t.push(r);return t},j.values=function(n){for(var t=j.keys(n),r=t.length,e=new Array(r),u=0;r>u;u++)e[u]=n[t[u]];return e},j.pairs=function(n){for(var t=j.keys(n),r=t.length,e=new Array(r),u=0;r>u;u++)e[u]=[t[u],n[t[u]]];return e},j.invert=function(n){for(var t={},r=j.keys(n),e=0,u=r.length;u>e;e++)t[n[r[e]]]=r[e];return t},j.functions=j.methods=function(n){var t=[];for(var r in n)j.isFunction(n[r])&&t.push(r);return t.sort()},j.extend=function(n){return A(o.call(arguments,1),function(t){if(t)for(var r in t)n[r]=t[r]}),n},j.pick=function(n){var t={},r=c.apply(e,o.call(arguments,1));return A(r,function(r){r in n&&(t[r]=n[r])}),t},j.omit=function(n){var t={},r=c.apply(e,o.call(arguments,1));for(var u in n)j.contains(r,u)||(t[u]=n[u]);return t},j.defaults=function(n){return A(o.call(arguments,1),function(t){if(t)for(var r in t)n[r]===void 0&&(n[r]=t[r])}),n},j.clone=function(n){return j.isObject(n)?j.isArray(n)?n.slice():j.extend({},n):n},j.tap=function(n,t){return t(n),n};var S=function(n,t,r,e){if(n===t)return 0!==n||1/n==1/t;if(null==n||null==t)return n===t;n instanceof j&&(n=n._wrapped),t instanceof j&&(t=t._wrapped);var u=l.call(n);if(u!=l.call(t))return!1;switch(u){case"[object String]":return n==String(t);case"[object Number]":return n!=+n?t!=+t:0==n?1/n==1/t:n==+t;case"[object Date]":case"[object Boolean]":return+n==+t;case"[object RegExp]":return n.source==t.source&&n.global==t.global&&n.multiline==t.multiline&&n.ignoreCase==t.ignoreCase}if("object"!=typeof n||"object"!=typeof t)return!1;for(var i=r.length;i--;)if(r[i]==n)return e[i]==t;var a=n.constructor,o=t.constructor;if(a!==o&&!(j.isFunction(a)&&a instanceof a&&j.isFunction(o)&&o instanceof o))return!1;r.push(n),e.push(t);var c=0,f=!0;if("[object Array]"==u){if(c=n.length,f=c==t.length)for(;c--&&(f=S(n[c],t[c],r,e)););}else{for(var s in n)if(j.has(n,s)&&(c++,!(f=j.has(t,s)&&S(n[s],t[s],r,e))))break;if(f){for(s in t)if(j.has(t,s)&&!c--)break;f=!c}}return r.pop(),e.pop(),f};j.isEqual=function(n,t){return S(n,t,[],[])},j.isEmpty=function(n){if(null==n)return!0;if(j.isArray(n)||j.isString(n))return 0===n.length;for(var t in n)if(j.has(n,t))return!1;return!0},j.isElement=function(n){return!(!n||1!==n.nodeType)},j.isArray=x||function(n){return"[object Array]"==l.call(n)},j.isObject=function(n){return n===Object(n)},A(["Arguments","Function","String","Number","Date","RegExp"],function(n){j["is"+n]=function(t){return l.call(t)=="[object "+n+"]"}}),j.isArguments(arguments)||(j.isArguments=function(n){return!(!n||!j.has(n,"callee"))}),"function"!=typeof/./&&(j.isFunction=function(n){return"function"==typeof n}),j.isFinite=function(n){return isFinite(n)&&!isNaN(parseFloat(n))},j.isNaN=function(n){return j.isNumber(n)&&n!=+n},j.isBoolean=function(n){return n===!0||n===!1||"[object Boolean]"==l.call(n)},j.isNull=function(n){return null===n},j.isUndefined=function(n){return n===void 0},j.has=function(n,t){return f.call(n,t)},j.noConflict=function(){return n._=t,this},j.identity=function(n){return n},j.times=function(n,t,r){for(var e=Array(Math.max(0,n)),u=0;n>u;u++)e[u]=t.call(r,u);return e},j.random=function(n,t){return null==t&&(t=n,n=0),n+Math.floor(Math.random()*(t-n+1))};var I={escape:{"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#x27;"}};I.unescape=j.invert(I.escape);var T={escape:new RegExp("["+j.keys(I.escape).join("")+"]","g"),unescape:new RegExp("("+j.keys(I.unescape).join("|")+")","g")};j.each(["escape","unescape"],function(n){j[n]=function(t){return null==t?"":(""+t).replace(T[n],function(t){return I[n][t]})}}),j.result=function(n,t){if(null==n)return void 0;var r=n[t];return j.isFunction(r)?r.call(n):r},j.mixin=function(n){A(j.functions(n),function(t){var r=j[t]=n[t];j.prototype[t]=function(){var n=[this._wrapped];return a.apply(n,arguments),z.call(this,r.apply(j,n))}})};var N=0;j.uniqueId=function(n){var t=++N+"";return n?n+t:t},j.templateSettings={evaluate:/<%([\s\S]+?)%>/g,interpolate:/<%=([\s\S]+?)%>/g,escape:/<%-([\s\S]+?)%>/g};var q=/(.)^/,B={"'":"'","\\":"\\","\r":"r","\n":"n","	":"t","\u2028":"u2028","\u2029":"u2029"},D=/\\|'|\r|\n|\t|\u2028|\u2029/g;j.template=function(n,t,r){var e;r=j.defaults({},r,j.templateSettings);var u=new RegExp([(r.escape||q).source,(r.interpolate||q).source,(r.evaluate||q).source].join("|")+"|$","g"),i=0,a="__p+='";n.replace(u,function(t,r,e,u,o){return a+=n.slice(i,o).replace(D,function(n){return"\\"+B[n]}),r&&(a+="'+\n((__t=("+r+"))==null?'':_.escape(__t))+\n'"),e&&(a+="'+\n((__t=("+e+"))==null?'':__t)+\n'"),u&&(a+="';\n"+u+"\n__p+='"),i=o+t.length,t}),a+="';\n",r.variable||(a="with(obj||{}){\n"+a+"}\n"),a="var __t,__p='',__j=Array.prototype.join,"+"print=function(){__p+=__j.call(arguments,'');};\n"+a+"return __p;\n";try{e=new Function(r.variable||"obj","_",a)}catch(o){throw o.source=a,o}if(t)return e(t,j);var c=function(n){return e.call(this,n,j)};return c.source="function("+(r.variable||"obj")+"){\n"+a+"}",c},j.chain=function(n){return j(n).chain()};var z=function(n){return this._chain?j(n).chain():n};j.mixin(j),A(["pop","push","reverse","shift","sort","splice","unshift"],function(n){var t=e[n];j.prototype[n]=function(){var r=this._wrapped;return t.apply(r,arguments),"shift"!=n&&"splice"!=n||0!==r.length||delete r[0],z.call(this,r)}}),A(["concat","join","slice"],function(n){var t=e[n];j.prototype[n]=function(){return z.call(this,t.apply(this._wrapped,arguments))}}),j.extend(j.prototype,{chain:function(){return this._chain=!0,this},value:function(){return this._wrapped}})}).call(this);
(function(){var t=this;var e=t.Backbone;var i=[];var r=i.push;var s=i.slice;var n=i.splice;var a;if(typeof exports!=="undefined"){a=exports}else{a=t.Backbone={}}a.VERSION="1.1.0";var h=t._;if(!h&&typeof require!=="undefined")h=require("underscore");a.$=t.jQuery||t.Zepto||t.ender||t.$;a.noConflict=function(){t.Backbone=e;return this};a.emulateHTTP=false;a.emulateJSON=false;var o=a.Events={on:function(t,e,i){if(!l(this,"on",t,[e,i])||!e)return this;this._events||(this._events={});var r=this._events[t]||(this._events[t]=[]);r.push({callback:e,context:i,ctx:i||this});return this},once:function(t,e,i){if(!l(this,"once",t,[e,i])||!e)return this;var r=this;var s=h.once(function(){r.off(t,s);e.apply(this,arguments)});s._callback=e;return this.on(t,s,i)},off:function(t,e,i){var r,s,n,a,o,u,c,f;if(!this._events||!l(this,"off",t,[e,i]))return this;if(!t&&!e&&!i){this._events={};return this}a=t?[t]:h.keys(this._events);for(o=0,u=a.length;o<u;o++){t=a[o];if(n=this._events[t]){this._events[t]=r=[];if(e||i){for(c=0,f=n.length;c<f;c++){s=n[c];if(e&&e!==s.callback&&e!==s.callback._callback||i&&i!==s.context){r.push(s)}}}if(!r.length)delete this._events[t]}}return this},trigger:function(t){if(!this._events)return this;var e=s.call(arguments,1);if(!l(this,"trigger",t,e))return this;var i=this._events[t];var r=this._events.all;if(i)c(i,e);if(r)c(r,arguments);return this},stopListening:function(t,e,i){var r=this._listeningTo;if(!r)return this;var s=!e&&!i;if(!i&&typeof e==="object")i=this;if(t)(r={})[t._listenId]=t;for(var n in r){t=r[n];t.off(e,i,this);if(s||h.isEmpty(t._events))delete this._listeningTo[n]}return this}};var u=/\s+/;var l=function(t,e,i,r){if(!i)return true;if(typeof i==="object"){for(var s in i){t[e].apply(t,[s,i[s]].concat(r))}return false}if(u.test(i)){var n=i.split(u);for(var a=0,h=n.length;a<h;a++){t[e].apply(t,[n[a]].concat(r))}return false}return true};var c=function(t,e){var i,r=-1,s=t.length,n=e[0],a=e[1],h=e[2];switch(e.length){case 0:while(++r<s)(i=t[r]).callback.call(i.ctx);return;case 1:while(++r<s)(i=t[r]).callback.call(i.ctx,n);return;case 2:while(++r<s)(i=t[r]).callback.call(i.ctx,n,a);return;case 3:while(++r<s)(i=t[r]).callback.call(i.ctx,n,a,h);return;default:while(++r<s)(i=t[r]).callback.apply(i.ctx,e)}};var f={listenTo:"on",listenToOnce:"once"};h.each(f,function(t,e){o[e]=function(e,i,r){var s=this._listeningTo||(this._listeningTo={});var n=e._listenId||(e._listenId=h.uniqueId("l"));s[n]=e;if(!r&&typeof i==="object")r=this;e[t](i,r,this);return this}});o.bind=o.on;o.unbind=o.off;h.extend(a,o);var d=a.Model=function(t,e){var i=t||{};e||(e={});this.cid=h.uniqueId("c");this.attributes={};if(e.collection)this.collection=e.collection;if(e.parse)i=this.parse(i,e)||{};i=h.defaults({},i,h.result(this,"defaults"));this.set(i,e);this.changed={};this.initialize.apply(this,arguments)};h.extend(d.prototype,o,{changed:null,validationError:null,idAttribute:"id",initialize:function(){},toJSON:function(t){return h.clone(this.attributes)},sync:function(){return a.sync.apply(this,arguments)},get:function(t){return this.attributes[t]},escape:function(t){return h.escape(this.get(t))},has:function(t){return this.get(t)!=null},set:function(t,e,i){var r,s,n,a,o,u,l,c;if(t==null)return this;if(typeof t==="object"){s=t;i=e}else{(s={})[t]=e}i||(i={});if(!this._validate(s,i))return false;n=i.unset;o=i.silent;a=[];u=this._changing;this._changing=true;if(!u){this._previousAttributes=h.clone(this.attributes);this.changed={}}c=this.attributes,l=this._previousAttributes;if(this.idAttribute in s)this.id=s[this.idAttribute];for(r in s){e=s[r];if(!h.isEqual(c[r],e))a.push(r);if(!h.isEqual(l[r],e)){this.changed[r]=e}else{delete this.changed[r]}n?delete c[r]:c[r]=e}if(!o){if(a.length)this._pending=true;for(var f=0,d=a.length;f<d;f++){this.trigger("change:"+a[f],this,c[a[f]],i)}}if(u)return this;if(!o){while(this._pending){this._pending=false;this.trigger("change",this,i)}}this._pending=false;this._changing=false;return this},unset:function(t,e){return this.set(t,void 0,h.extend({},e,{unset:true}))},clear:function(t){var e={};for(var i in this.attributes)e[i]=void 0;return this.set(e,h.extend({},t,{unset:true}))},hasChanged:function(t){if(t==null)return!h.isEmpty(this.changed);return h.has(this.changed,t)},changedAttributes:function(t){if(!t)return this.hasChanged()?h.clone(this.changed):false;var e,i=false;var r=this._changing?this._previousAttributes:this.attributes;for(var s in t){if(h.isEqual(r[s],e=t[s]))continue;(i||(i={}))[s]=e}return i},previous:function(t){if(t==null||!this._previousAttributes)return null;return this._previousAttributes[t]},previousAttributes:function(){return h.clone(this._previousAttributes)},fetch:function(t){t=t?h.clone(t):{};if(t.parse===void 0)t.parse=true;var e=this;var i=t.success;t.success=function(r){if(!e.set(e.parse(r,t),t))return false;if(i)i(e,r,t);e.trigger("sync",e,r,t)};M(this,t);return this.sync("read",this,t)},save:function(t,e,i){var r,s,n,a=this.attributes;if(t==null||typeof t==="object"){r=t;i=e}else{(r={})[t]=e}i=h.extend({validate:true},i);if(r&&!i.wait){if(!this.set(r,i))return false}else{if(!this._validate(r,i))return false}if(r&&i.wait){this.attributes=h.extend({},a,r)}if(i.parse===void 0)i.parse=true;var o=this;var u=i.success;i.success=function(t){o.attributes=a;var e=o.parse(t,i);if(i.wait)e=h.extend(r||{},e);if(h.isObject(e)&&!o.set(e,i)){return false}if(u)u(o,t,i);o.trigger("sync",o,t,i)};M(this,i);s=this.isNew()?"create":i.patch?"patch":"update";if(s==="patch")i.attrs=r;n=this.sync(s,this,i);if(r&&i.wait)this.attributes=a;return n},destroy:function(t){t=t?h.clone(t):{};var e=this;var i=t.success;var r=function(){e.trigger("destroy",e,e.collection,t)};t.success=function(s){if(t.wait||e.isNew())r();if(i)i(e,s,t);if(!e.isNew())e.trigger("sync",e,s,t)};if(this.isNew()){t.success();return false}M(this,t);var s=this.sync("delete",this,t);if(!t.wait)r();return s},url:function(){var t=h.result(this,"urlRoot")||h.result(this.collection,"url")||U();if(this.isNew())return t;return t+(t.charAt(t.length-1)==="/"?"":"/")+encodeURIComponent(this.id)},parse:function(t,e){return t},clone:function(){return new this.constructor(this.attributes)},isNew:function(){return this.id==null},isValid:function(t){return this._validate({},h.extend(t||{},{validate:true}))},_validate:function(t,e){if(!e.validate||!this.validate)return true;t=h.extend({},this.attributes,t);var i=this.validationError=this.validate(t,e)||null;if(!i)return true;this.trigger("invalid",this,i,h.extend(e,{validationError:i}));return false}});var p=["keys","values","pairs","invert","pick","omit"];h.each(p,function(t){d.prototype[t]=function(){var e=s.call(arguments);e.unshift(this.attributes);return h[t].apply(h,e)}});var v=a.Collection=function(t,e){e||(e={});if(e.model)this.model=e.model;if(e.comparator!==void 0)this.comparator=e.comparator;this._reset();this.initialize.apply(this,arguments);if(t)this.reset(t,h.extend({silent:true},e))};var g={add:true,remove:true,merge:true};var m={add:true,remove:false};h.extend(v.prototype,o,{model:d,initialize:function(){},toJSON:function(t){return this.map(function(e){return e.toJSON(t)})},sync:function(){return a.sync.apply(this,arguments)},add:function(t,e){return this.set(t,h.extend({merge:false},e,m))},remove:function(t,e){var i=!h.isArray(t);t=i?[t]:h.clone(t);e||(e={});var r,s,n,a;for(r=0,s=t.length;r<s;r++){a=t[r]=this.get(t[r]);if(!a)continue;delete this._byId[a.id];delete this._byId[a.cid];n=this.indexOf(a);this.models.splice(n,1);this.length--;if(!e.silent){e.index=n;a.trigger("remove",a,this,e)}this._removeReference(a)}return i?t[0]:t},set:function(t,e){e=h.defaults({},e,g);if(e.parse)t=this.parse(t,e);var i=!h.isArray(t);t=i?t?[t]:[]:h.clone(t);var r,s,n,a,o,u,l;var c=e.at;var f=this.model;var p=this.comparator&&c==null&&e.sort!==false;var v=h.isString(this.comparator)?this.comparator:null;var m=[],y=[],_={};var w=e.add,b=e.merge,x=e.remove;var E=!p&&w&&x?[]:false;for(r=0,s=t.length;r<s;r++){o=t[r];if(o instanceof d){n=a=o}else{n=o[f.prototype.idAttribute]}if(u=this.get(n)){if(x)_[u.cid]=true;if(b){o=o===a?a.attributes:o;if(e.parse)o=u.parse(o,e);u.set(o,e);if(p&&!l&&u.hasChanged(v))l=true}t[r]=u}else if(w){a=t[r]=this._prepareModel(o,e);if(!a)continue;m.push(a);a.on("all",this._onModelEvent,this);this._byId[a.cid]=a;if(a.id!=null)this._byId[a.id]=a}if(E)E.push(u||a)}if(x){for(r=0,s=this.length;r<s;++r){if(!_[(a=this.models[r]).cid])y.push(a)}if(y.length)this.remove(y,e)}if(m.length||E&&E.length){if(p)l=true;this.length+=m.length;if(c!=null){for(r=0,s=m.length;r<s;r++){this.models.splice(c+r,0,m[r])}}else{if(E)this.models.length=0;var T=E||m;for(r=0,s=T.length;r<s;r++){this.models.push(T[r])}}}if(l)this.sort({silent:true});if(!e.silent){for(r=0,s=m.length;r<s;r++){(a=m[r]).trigger("add",a,this,e)}if(l||E&&E.length)this.trigger("sort",this,e)}return i?t[0]:t},reset:function(t,e){e||(e={});for(var i=0,r=this.models.length;i<r;i++){this._removeReference(this.models[i])}e.previousModels=this.models;this._reset();t=this.add(t,h.extend({silent:true},e));if(!e.silent)this.trigger("reset",this,e);return t},push:function(t,e){return this.add(t,h.extend({at:this.length},e))},pop:function(t){var e=this.at(this.length-1);this.remove(e,t);return e},unshift:function(t,e){return this.add(t,h.extend({at:0},e))},shift:function(t){var e=this.at(0);this.remove(e,t);return e},slice:function(){return s.apply(this.models,arguments)},get:function(t){if(t==null)return void 0;return this._byId[t.id]||this._byId[t.cid]||this._byId[t]},at:function(t){return this.models[t]},where:function(t,e){if(h.isEmpty(t))return e?void 0:[];return this[e?"find":"filter"](function(e){for(var i in t){if(t[i]!==e.get(i))return false}return true})},findWhere:function(t){return this.where(t,true)},sort:function(t){if(!this.comparator)throw new Error("Cannot sort a set without a comparator");t||(t={});if(h.isString(this.comparator)||this.comparator.length===1){this.models=this.sortBy(this.comparator,this)}else{this.models.sort(h.bind(this.comparator,this))}if(!t.silent)this.trigger("sort",this,t);return this},pluck:function(t){return h.invoke(this.models,"get",t)},fetch:function(t){t=t?h.clone(t):{};if(t.parse===void 0)t.parse=true;var e=t.success;var i=this;t.success=function(r){var s=t.reset?"reset":"set";i[s](r,t);if(e)e(i,r,t);i.trigger("sync",i,r,t)};M(this,t);return this.sync("read",this,t)},create:function(t,e){e=e?h.clone(e):{};if(!(t=this._prepareModel(t,e)))return false;if(!e.wait)this.add(t,e);var i=this;var r=e.success;e.success=function(t,e,s){if(s.wait)i.add(t,s);if(r)r(t,e,s)};t.save(null,e);return t},parse:function(t,e){return t},clone:function(){return new this.constructor(this.models)},_reset:function(){this.length=0;this.models=[];this._byId={}},_prepareModel:function(t,e){if(t instanceof d){if(!t.collection)t.collection=this;return t}e=e?h.clone(e):{};e.collection=this;var i=new this.model(t,e);if(!i.validationError)return i;this.trigger("invalid",this,i.validationError,e);return false},_removeReference:function(t){if(this===t.collection)delete t.collection;t.off("all",this._onModelEvent,this)},_onModelEvent:function(t,e,i,r){if((t==="add"||t==="remove")&&i!==this)return;if(t==="destroy")this.remove(e,r);if(e&&t==="change:"+e.idAttribute){delete this._byId[e.previous(e.idAttribute)];if(e.id!=null)this._byId[e.id]=e}this.trigger.apply(this,arguments)}});var y=["forEach","each","map","collect","reduce","foldl","inject","reduceRight","foldr","find","detect","filter","select","reject","every","all","some","any","include","contains","invoke","max","min","toArray","size","first","head","take","initial","rest","tail","drop","last","without","difference","indexOf","shuffle","lastIndexOf","isEmpty","chain"];h.each(y,function(t){v.prototype[t]=function(){var e=s.call(arguments);e.unshift(this.models);return h[t].apply(h,e)}});var _=["groupBy","countBy","sortBy"];h.each(_,function(t){v.prototype[t]=function(e,i){var r=h.isFunction(e)?e:function(t){return t.get(e)};return h[t](this.models,r,i)}});var w=a.View=function(t){this.cid=h.uniqueId("view");t||(t={});h.extend(this,h.pick(t,x));this._ensureElement();this.initialize.apply(this,arguments);this.delegateEvents()};var b=/^(\S+)\s*(.*)$/;var x=["model","collection","el","id","attributes","className","tagName","events"];h.extend(w.prototype,o,{tagName:"div",$:function(t){return this.$el.find(t)},initialize:function(){},render:function(){return this},remove:function(){this.$el.remove();this.stopListening();return this},setElement:function(t,e){if(this.$el)this.undelegateEvents();this.$el=t instanceof a.$?t:a.$(t);this.el=this.$el[0];if(e!==false)this.delegateEvents();return this},delegateEvents:function(t){if(!(t||(t=h.result(this,"events"))))return this;this.undelegateEvents();for(var e in t){var i=t[e];if(!h.isFunction(i))i=this[t[e]];if(!i)continue;var r=e.match(b);var s=r[1],n=r[2];i=h.bind(i,this);s+=".delegateEvents"+this.cid;if(n===""){this.$el.on(s,i)}else{this.$el.on(s,n,i)}}return this},undelegateEvents:function(){this.$el.off(".delegateEvents"+this.cid);return this},_ensureElement:function(){if(!this.el){var t=h.extend({},h.result(this,"attributes"));if(this.id)t.id=h.result(this,"id");if(this.className)t["class"]=h.result(this,"className");var e=a.$("<"+h.result(this,"tagName")+">").attr(t);this.setElement(e,false)}else{this.setElement(h.result(this,"el"),false)}}});a.sync=function(t,e,i){var r=T[t];h.defaults(i||(i={}),{emulateHTTP:a.emulateHTTP,emulateJSON:a.emulateJSON});var s={type:r,dataType:"json"};if(!i.url){s.url=h.result(e,"url")||U()}if(i.data==null&&e&&(t==="create"||t==="update"||t==="patch")){s.contentType="application/json";s.data=JSON.stringify(i.attrs||e.toJSON(i))}if(i.emulateJSON){s.contentType="application/x-www-form-urlencoded";s.data=s.data?{model:s.data}:{}}if(i.emulateHTTP&&(r==="PUT"||r==="DELETE"||r==="PATCH")){s.type="POST";if(i.emulateJSON)s.data._method=r;var n=i.beforeSend;i.beforeSend=function(t){t.setRequestHeader("X-HTTP-Method-Override",r);if(n)return n.apply(this,arguments)}}if(s.type!=="GET"&&!i.emulateJSON){s.processData=false}if(s.type==="PATCH"&&E){s.xhr=function(){return new ActiveXObject("Microsoft.XMLHTTP")}}var o=i.xhr=a.ajax(h.extend(s,i));e.trigger("request",e,o,i);return o};var E=typeof window!=="undefined"&&!!window.ActiveXObject&&!(window.XMLHttpRequest&&(new XMLHttpRequest).dispatchEvent);var T={create:"POST",update:"PUT",patch:"PATCH","delete":"DELETE",read:"GET"};a.ajax=function(){return a.$.ajax.apply(a.$,arguments)};var k=a.Router=function(t){t||(t={});if(t.routes)this.routes=t.routes;this._bindRoutes();this.initialize.apply(this,arguments)};var S=/\((.*?)\)/g;var $=/(\(\?)?:\w+/g;var H=/\*\w+/g;var A=/[\-{}\[\]+?.,\\\^$|#\s]/g;h.extend(k.prototype,o,{initialize:function(){},route:function(t,e,i){if(!h.isRegExp(t))t=this._routeToRegExp(t);if(h.isFunction(e)){i=e;e=""}if(!i)i=this[e];var r=this;a.history.route(t,function(s){var n=r._extractParameters(t,s);i&&i.apply(r,n);r.trigger.apply(r,["route:"+e].concat(n));r.trigger("route",e,n);a.history.trigger("route",r,e,n)});return this},navigate:function(t,e){a.history.navigate(t,e);return this},_bindRoutes:function(){if(!this.routes)return;this.routes=h.result(this,"routes");var t,e=h.keys(this.routes);while((t=e.pop())!=null){this.route(t,this.routes[t])}},_routeToRegExp:function(t){t=t.replace(A,"\\$&").replace(S,"(?:$1)?").replace($,function(t,e){return e?t:"([^/]+)"}).replace(H,"(.*?)");return new RegExp("^"+t+"$")},_extractParameters:function(t,e){var i=t.exec(e).slice(1);return h.map(i,function(t){return t?decodeURIComponent(t):null})}});var I=a.History=function(){this.handlers=[];h.bindAll(this,"checkUrl");if(typeof window!=="undefined"){this.location=window.location;this.history=window.history}};var N=/^[#\/]|\s+$/g;var O=/^\/+|\/+$/g;var P=/msie [\w.]+/;var C=/\/$/;var j=/[?#].*$/;I.started=false;h.extend(I.prototype,o,{interval:50,getHash:function(t){var e=(t||this).location.href.match(/#(.*)$/);return e?e[1]:""},getFragment:function(t,e){if(t==null){if(this._hasPushState||!this._wantsHashChange||e){t=this.location.pathname;var i=this.root.replace(C,"");if(!t.indexOf(i))t=t.slice(i.length)}else{t=this.getHash()}}return t.replace(N,"")},start:function(t){if(I.started)throw new Error("Backbone.history has already been started");I.started=true;this.options=h.extend({root:"/"},this.options,t);this.root=this.options.root;this._wantsHashChange=this.options.hashChange!==false;this._wantsPushState=!!this.options.pushState;this._hasPushState=!!(this.options.pushState&&this.history&&this.history.pushState);var e=this.getFragment();var i=document.documentMode;var r=P.exec(navigator.userAgent.toLowerCase())&&(!i||i<=7);this.root=("/"+this.root+"/").replace(O,"/");if(r&&this._wantsHashChange){this.iframe=a.$('<iframe src="javascript:0" tabindex="-1" />').hide().appendTo("body")[0].contentWindow;this.navigate(e)}if(this._hasPushState){a.$(window).on("popstate",this.checkUrl)}else if(this._wantsHashChange&&"onhashchange"in window&&!r){a.$(window).on("hashchange",this.checkUrl)}else if(this._wantsHashChange){this._checkUrlInterval=setInterval(this.checkUrl,this.interval)}this.fragment=e;var s=this.location;var n=s.pathname.replace(/[^\/]$/,"$&/")===this.root;if(this._wantsHashChange&&this._wantsPushState){if(!this._hasPushState&&!n){this.fragment=this.getFragment(null,true);this.location.replace(this.root+this.location.search+"#"+this.fragment);return true}else if(this._hasPushState&&n&&s.hash){this.fragment=this.getHash().replace(N,"");this.history.replaceState({},document.title,this.root+this.fragment+s.search)}}if(!this.options.silent)return this.loadUrl()},stop:function(){a.$(window).off("popstate",this.checkUrl).off("hashchange",this.checkUrl);clearInterval(this._checkUrlInterval);I.started=false},route:function(t,e){this.handlers.unshift({route:t,callback:e})},checkUrl:function(t){var e=this.getFragment();if(e===this.fragment&&this.iframe){e=this.getFragment(this.getHash(this.iframe))}if(e===this.fragment)return false;if(this.iframe)this.navigate(e);this.loadUrl()},loadUrl:function(t){t=this.fragment=this.getFragment(t);return h.any(this.handlers,function(e){if(e.route.test(t)){e.callback(t);return true}})},navigate:function(t,e){if(!I.started)return false;if(!e||e===true)e={trigger:!!e};var i=this.root+(t=this.getFragment(t||""));t=t.replace(j,"");if(this.fragment===t)return;this.fragment=t;if(t===""&&i!=="/")i=i.slice(0,-1);if(this._hasPushState){this.history[e.replace?"replaceState":"pushState"]({},document.title,i)}else if(this._wantsHashChange){this._updateHash(this.location,t,e.replace);if(this.iframe&&t!==this.getFragment(this.getHash(this.iframe))){if(!e.replace)this.iframe.document.open().close();this._updateHash(this.iframe.location,t,e.replace)}}else{return this.location.assign(i)}if(e.trigger)return this.loadUrl(t)},_updateHash:function(t,e,i){if(i){var r=t.href.replace(/(javascript:|#).*$/,"");t.replace(r+"#"+e)}else{t.hash="#"+e}}});a.history=new I;var R=function(t,e){var i=this;var r;if(t&&h.has(t,"constructor")){r=t.constructor}else{r=function(){return i.apply(this,arguments)}}h.extend(r,i,e);var s=function(){this.constructor=r};s.prototype=i.prototype;r.prototype=new s;if(t)h.extend(r.prototype,t);r.__super__=i.prototype;return r};d.extend=v.extend=k.extend=w.extend=I.extend=R;var U=function(){throw new Error('A "url" property or function must be specified')};var M=function(t,e){var i=e.error;e.error=function(r){if(i)i(t,r,e);t.trigger("error",t,r,e)}}}).call(this);
/*
 AutobahnJS - http://autobahn.ws

 Copyright (C) 2011-2014 Tavendo GmbH.
 Licensed under the MIT License.
 See license text at http://www.opensource.org/licenses/mit-license.php

 AutobahnJS includes code from:

 when - http://cujojs.com

 (c) copyright B Cavalier & J Hann
 Licensed under the MIT License at:
 http://www.opensource.org/licenses/mit-license.php

 Crypto-JS - http://code.google.com/p/crypto-js/

 (c) 2009-2012 by Jeff Mott. All rights reserved.
 Licensed under the New BSD License at:
 http://code.google.com/p/crypto-js/wiki/License

 console-normalizer - https://github.com/Zenovations/console-normalizer

 (c) 2012 by Zenovations.
 Licensed under the MIT License at:
 http://www.opensource.org/licenses/mit-license.php

*/
window.define||(window.define=function(c){try{delete window.define}catch(g){window.define=void 0}window.when=c()},window.define.amd={});(function(c){c||(c=window.console={log:function(c,a,b,d,h){},info:function(c,a,b,d,h){},warn:function(c,a,b,d,h){},error:function(c,a,b,d,h){}});Function.prototype.bind||(Function.prototype.bind=function(c){var a=this,b=Array.prototype.slice.call(arguments,1);return function(){return a.apply(c,Array.prototype.concat.apply(b,arguments))}});"object"===typeof c.log&&(c.log=Function.prototype.call.bind(c.log,c),c.info=Function.prototype.call.bind(c.info,c),c.warn=Function.prototype.call.bind(c.warn,c),
c.error=Function.prototype.call.bind(c.error,c));"group"in c||(c.group=function(g){c.info("\n--- "+g+" ---\n")});"groupEnd"in c||(c.groupEnd=function(){c.log("\n")});"time"in c||function(){var g={};c.time=function(a){g[a]=(new Date).getTime()};c.timeEnd=function(a){var b=(new Date).getTime();c.info(a+": "+(a in g?b-g[a]:0)+"ms")}}()})(window.console);/*
 MIT License (c) copyright 2011-2013 original author or authors */
(function(c){c(function(c){function a(a,b,e,c){return(a instanceof d?a:h(a)).then(b,e,c)}function b(a){return new d(a,B.PromiseStatus&&B.PromiseStatus())}function d(a,b){function d(a){if(m){var c=m;m=w;p(function(){q=e(l,a);b&&A(q,b);f(c,q)})}}function c(a){d(new k(a))}function h(a){if(m){var b=m;p(function(){f(b,new z(a))})}}var l,q,m=[];l=this;this._status=b;this.inspect=function(){return q?q.inspect():{state:"pending"}};this._when=function(a,b,e,d,c){function f(h){h._when(a,b,e,d,c)}m?m.push(f):
p(function(){f(q)})};try{a(d,c,h)}catch(n){c(n)}}function h(a){return b(function(b){b(a)})}function f(a,b){for(var e=0;e<a.length;e++)a[e](b)}function e(a,b){if(b===a)return new k(new TypeError);if(b instanceof d)return b;try{var e=b===Object(b)&&b.then;return"function"===typeof e?l(e,b):new t(b)}catch(c){return new k(c)}}function l(a,e){return b(function(b,d){G(a,e,b,d)})}function t(a){this.value=a}function k(a){this.value=a}function z(a){this.value=a}function A(a,b){a.then(function(){b.fulfilled()},
function(a){b.rejected(a)})}function q(a){return a&&"function"===typeof a.then}function m(e,d,c,f,h){return a(e,function(e){return b(function(b,c,f){function h(a){n(a)}function A(a){k(a)}var l,q,D,m,k,n,t,g;t=e.length>>>0;l=Math.max(0,Math.min(d,t));D=[];q=t-l+1;m=[];if(l){n=function(a){m.push(a);--q||(k=n=s,c(m))};k=function(a){D.push(a);--l||(k=n=s,b(D))};for(g=0;g<t;++g)g in e&&a(e[g],A,h,f)}else b(D)}).then(c,f,h)})}function n(a,b,e,d){return u(a,s).then(b,e,d)}function u(b,e,c){return a(b,function(b){return new d(function(d,
f,h){function A(b,q){a(b,e,c).then(function(a){l[q]=a;--k||d(l)},f,h)}var l,q,k,m;k=q=b.length>>>0;l=[];if(k)for(m=0;m<q;m++)m in b?A(b[m],m):--k;else d(l)})})}function y(a){return{state:"fulfilled",value:a}}function x(a){return{state:"rejected",reason:a}}function p(a){1===E.push(a)&&C(v)}function v(){f(E);E=[]}function s(a){return a}function K(a){"function"===typeof B.reportUnhandled?B.reportUnhandled():p(function(){throw a;});throw a;}a.promise=b;a.resolve=h;a.reject=function(b){return a(b,function(a){return new k(a)})};
a.defer=function(){var a,e,d;a={promise:w,resolve:w,reject:w,notify:w,resolver:{resolve:w,reject:w,notify:w}};a.promise=e=b(function(b,c,f){a.resolve=a.resolver.resolve=function(a){if(d)return h(a);d=!0;b(a);return e};a.reject=a.resolver.reject=function(a){if(d)return h(new k(a));d=!0;c(a);return e};a.notify=a.resolver.notify=function(a){f(a);return a}});return a};a.join=function(){return u(arguments,s)};a.all=n;a.map=function(a,b){return u(a,b)};a.reduce=function(b,e){var d=G(H,arguments,1);return a(b,
function(b){var c;c=b.length;d[0]=function(b,d,f){return a(b,function(b){return a(d,function(a){return e(b,a,f,c)})})};return I.apply(b,d)})};a.settle=function(a){return u(a,y,x)};a.any=function(a,b,e,d){return m(a,1,function(a){return b?b(a[0]):a[0]},e,d)};a.some=m;a.isPromise=q;a.isPromiseLike=q;r=d.prototype;r.then=function(a,b,e){var c=this;return new d(function(d,f,h){c._when(d,h,a,b,e)},this._status&&this._status.observed())};r["catch"]=r.otherwise=function(a){return this.then(w,a)};r["finally"]=
r.ensure=function(a){function b(){return h(a())}return"function"===typeof a?this.then(b,b).yield(this):this};r.done=function(a,b){this.then(a,b)["catch"](K)};r.yield=function(a){return this.then(function(){return a})};r.tap=function(a){return this.then(a).yield(this)};r.spread=function(a){return this.then(function(b){return n(b,function(b){return a.apply(w,b)})})};r.always=function(a,b){return this.then(a,a,b)};F=Object.create||function(a){function b(){}b.prototype=a;return new b};t.prototype=F(r);
t.prototype.inspect=function(){return y(this.value)};t.prototype._when=function(a,b,e){try{a("function"===typeof e?e(this.value):this.value)}catch(d){a(new k(d))}};k.prototype=F(r);k.prototype.inspect=function(){return x(this.value)};k.prototype._when=function(a,b,e,d){try{a("function"===typeof d?d(this.value):this)}catch(c){a(new k(c))}};z.prototype=F(r);z.prototype._when=function(a,b,e,d,c){try{b("function"===typeof c?c(this.value):this.value)}catch(f){b(f)}};var r,F,I,H,G,C,E,B,J,w;E=[];B="undefined"!==
typeof console?console:a;if("object"===typeof process&&process.nextTick)C=process.nextTick;else if(r="function"===typeof MutationObserver&&MutationObserver||"function"===typeof WebKitMutationObserver&&WebKitMutationObserver)C=function(a,b,e){var d=a.createElement("div");(new b(e)).observe(d,{attributes:!0});return function(){d.setAttribute("x","x")}}(document,r,v);else try{C=c("vertx").runOnLoop||c("vertx").runOnContext}catch(L){J=setTimeout,C=function(a){J(a,0)}}c=Function.prototype;r=c.call;G=c.bind?
r.bind(r):function(a,b){return a.apply(b,H.call(arguments,2))};c=[];H=c.slice;I=c.reduce||function(a){var b,e,d,c,f;f=0;b=Object(this);c=b.length>>>0;e=arguments;if(1>=e.length)for(;;){if(f in b){d=b[f++];break}if(++f>=c)throw new TypeError;}else d=e[1];for(;f<c;++f)f in b&&(d=a(d,b[f],f,b));return d};return a})})("function"===typeof define&&define.amd?define:function(c){module.exports=c(require)});var CryptoJS=CryptoJS||function(c,g){var a={},b=a.lib={},d=b.Base=function(){function a(){}return{extend:function(b){a.prototype=this;var e=new a;b&&e.mixIn(b);e.hasOwnProperty("init")||(e.init=function(){e.$super.init.apply(this,arguments)});e.init.prototype=e;e.$super=this;return e},create:function(){var a=this.extend();a.init.apply(a,arguments);return a},init:function(){},mixIn:function(a){for(var b in a)a.hasOwnProperty(b)&&(this[b]=a[b]);a.hasOwnProperty("toString")&&(this.toString=a.toString)},
clone:function(){return this.init.prototype.extend(this)}}}(),h=b.WordArray=d.extend({init:function(a,b){a=this.words=a||[];this.sigBytes=b!=g?b:4*a.length},toString:function(a){return(a||e).stringify(this)},concat:function(a){var b=this.words,e=a.words,d=this.sigBytes;a=a.sigBytes;this.clamp();if(d%4)for(var c=0;c<a;c++)b[d+c>>>2]|=(e[c>>>2]>>>24-8*(c%4)&255)<<24-8*((d+c)%4);else if(65535<e.length)for(c=0;c<a;c+=4)b[d+c>>>2]=e[c>>>2];else b.push.apply(b,e);this.sigBytes+=a;return this},clamp:function(){var a=
this.words,b=this.sigBytes;a[b>>>2]&=4294967295<<32-8*(b%4);a.length=c.ceil(b/4)},clone:function(){var a=d.clone.call(this);a.words=this.words.slice(0);return a},random:function(a){for(var b=[],e=0;e<a;e+=4)b.push(4294967296*c.random()|0);return new h.init(b,a)}}),f=a.enc={},e=f.Hex={stringify:function(a){var b=a.words;a=a.sigBytes;for(var e=[],d=0;d<a;d++){var c=b[d>>>2]>>>24-8*(d%4)&255;e.push((c>>>4).toString(16));e.push((c&15).toString(16))}return e.join("")},parse:function(a){for(var b=a.length,
e=[],d=0;d<b;d+=2)e[d>>>3]|=parseInt(a.substr(d,2),16)<<24-4*(d%8);return new h.init(e,b/2)}},l=f.Latin1={stringify:function(a){var b=a.words;a=a.sigBytes;for(var e=[],d=0;d<a;d++)e.push(String.fromCharCode(b[d>>>2]>>>24-8*(d%4)&255));return e.join("")},parse:function(a){for(var b=a.length,e=[],d=0;d<b;d++)e[d>>>2]|=(a.charCodeAt(d)&255)<<24-8*(d%4);return new h.init(e,b)}},t=f.Utf8={stringify:function(a){try{return decodeURIComponent(escape(l.stringify(a)))}catch(b){throw Error("Malformed UTF-8 data");
}},parse:function(a){return l.parse(unescape(encodeURIComponent(a)))}},k=b.BufferedBlockAlgorithm=d.extend({reset:function(){this._data=new h.init;this._nDataBytes=0},_append:function(a){"string"==typeof a&&(a=t.parse(a));this._data.concat(a);this._nDataBytes+=a.sigBytes},_process:function(a){var b=this._data,e=b.words,d=b.sigBytes,f=this.blockSize,l=d/(4*f),l=a?c.ceil(l):c.max((l|0)-this._minBufferSize,0);a=l*f;d=c.min(4*a,d);if(a){for(var k=0;k<a;k+=f)this._doProcessBlock(e,k);k=e.splice(0,a);b.sigBytes-=
d}return new h.init(k,d)},clone:function(){var a=d.clone.call(this);a._data=this._data.clone();return a},_minBufferSize:0});b.Hasher=k.extend({cfg:d.extend(),init:function(a){this.cfg=this.cfg.extend(a);this.reset()},reset:function(){k.reset.call(this);this._doReset()},update:function(a){this._append(a);this._process();return this},finalize:function(a){a&&this._append(a);return this._doFinalize()},blockSize:16,_createHelper:function(a){return function(b,e){return(new a.init(e)).finalize(b)}},_createHmacHelper:function(a){return function(b,
e){return(new z.HMAC.init(a,e)).finalize(b)}}});var z=a.algo={};return a}(Math);(function(){var c=CryptoJS,g=c.lib.WordArray;c.enc.Base64={stringify:function(a){var b=a.words,d=a.sigBytes,c=this._map;a.clamp();a=[];for(var f=0;f<d;f+=3)for(var e=(b[f>>>2]>>>24-8*(f%4)&255)<<16|(b[f+1>>>2]>>>24-8*((f+1)%4)&255)<<8|b[f+2>>>2]>>>24-8*((f+2)%4)&255,l=0;4>l&&f+0.75*l<d;l++)a.push(c.charAt(e>>>6*(3-l)&63));if(b=c.charAt(64))for(;a.length%4;)a.push(b);return a.join("")},parse:function(a){var b=a.length,d=this._map,c=d.charAt(64);c&&(c=a.indexOf(c),-1!=c&&(b=c));for(var c=[],f=0,e=0;e<
b;e++)if(e%4){var l=d.indexOf(a.charAt(e-1))<<2*(e%4),t=d.indexOf(a.charAt(e))>>>6-2*(e%4);c[f>>>2]|=(l|t)<<24-8*(f%4);f++}return g.create(c,f)},_map:"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/="}})();(function(){var c=CryptoJS,g=c.enc.Utf8;c.algo.HMAC=c.lib.Base.extend({init:function(a,b){a=this._hasher=new a.init;"string"==typeof b&&(b=g.parse(b));var d=a.blockSize,c=4*d;b.sigBytes>c&&(b=a.finalize(b));b.clamp();for(var f=this._oKey=b.clone(),e=this._iKey=b.clone(),l=f.words,t=e.words,k=0;k<d;k++)l[k]^=1549556828,t[k]^=909522486;f.sigBytes=e.sigBytes=c;this.reset()},reset:function(){var a=this._hasher;a.reset();a.update(this._iKey)},update:function(a){this._hasher.update(a);return this},finalize:function(a){var b=
this._hasher;a=b.finalize(a);b.reset();return b.finalize(this._oKey.clone().concat(a))}})})();(function(c){var g=CryptoJS,a=g.lib,b=a.WordArray,d=a.Hasher,a=g.algo,h=[],f=[];(function(){function a(b){for(var e=c.sqrt(b),d=2;d<=e;d++)if(!(b%d))return!1;return!0}function b(a){return 4294967296*(a-(a|0))|0}for(var e=2,d=0;64>d;)a(e)&&(8>d&&(h[d]=b(c.pow(e,0.5))),f[d]=b(c.pow(e,1/3)),d++),e++})();var e=[],a=a.SHA256=d.extend({_doReset:function(){this._hash=new b.init(h.slice(0))},_doProcessBlock:function(a,b){for(var d=this._hash.words,c=d[0],h=d[1],g=d[2],m=d[3],n=d[4],u=d[5],y=d[6],x=d[7],p=
0;64>p;p++){if(16>p)e[p]=a[b+p]|0;else{var v=e[p-15],s=e[p-2];e[p]=((v<<25|v>>>7)^(v<<14|v>>>18)^v>>>3)+e[p-7]+((s<<15|s>>>17)^(s<<13|s>>>19)^s>>>10)+e[p-16]}v=x+((n<<26|n>>>6)^(n<<21|n>>>11)^(n<<7|n>>>25))+(n&u^~n&y)+f[p]+e[p];s=((c<<30|c>>>2)^(c<<19|c>>>13)^(c<<10|c>>>22))+(c&h^c&g^h&g);x=y;y=u;u=n;n=m+v|0;m=g;g=h;h=c;c=v+s|0}d[0]=d[0]+c|0;d[1]=d[1]+h|0;d[2]=d[2]+g|0;d[3]=d[3]+m|0;d[4]=d[4]+n|0;d[5]=d[5]+u|0;d[6]=d[6]+y|0;d[7]=d[7]+x|0},_doFinalize:function(){var a=this._data,b=a.words,d=8*this._nDataBytes,
e=8*a.sigBytes;b[e>>>5]|=128<<24-e%32;b[(e+64>>>9<<4)+14]=c.floor(d/4294967296);b[(e+64>>>9<<4)+15]=d;a.sigBytes=4*b.length;this._process();return this._hash},clone:function(){var a=d.clone.call(this);a._hash=this._hash.clone();return a}});g.SHA256=d._createHelper(a);g.HmacSHA256=d._createHmacHelper(a)})(Math);(function(){var c=CryptoJS,g=c.lib,a=g.Base,b=g.WordArray,g=c.algo,d=g.HMAC,h=g.PBKDF2=a.extend({cfg:a.extend({keySize:4,hasher:g.SHA1,iterations:1}),init:function(a){this.cfg=this.cfg.extend(a)},compute:function(a,e){for(var c=this.cfg,h=d.create(c.hasher,a),g=b.create(),z=b.create([1]),A=g.words,q=z.words,m=c.keySize,c=c.iterations;A.length<m;){var n=h.update(e).finalize(z);h.reset();for(var u=n.words,y=u.length,x=n,p=1;p<c;p++){x=h.finalize(x);h.reset();for(var v=x.words,s=0;s<y;s++)u[s]^=v[s]}g.concat(n);
q[0]++}g.sigBytes=4*m;return g}});c.PBKDF2=function(a,b,d){return h.create(d).compute(a,b)}})();/*
 MIT License (c) 2011-2013 Copyright Tavendo GmbH. */
var AUTOBAHNJS_VERSION="0.8.2",global=this;
(function(c,g){"function"===typeof define&&define.amd?define(["when"],function(a){return c.ab=g(c,a)}):"undefined"!==typeof exports?"undefined"!=typeof module&&module.exports&&(exports=module.exports=g(c,c.when)):c.ab=g(c,c.when)})(global,function(c,g){var a={_version:AUTOBAHNJS_VERSION};(function(){Array.prototype.indexOf||(Array.prototype.indexOf=function(a){if(null===this)throw new TypeError;var d=Object(this),c=d.length>>>0;if(0===c)return-1;var f=0;0<arguments.length&&(f=Number(arguments[1]),
f!==f?f=0:0!==f&&(Infinity!==f&&-Infinity!==f)&&(f=(0<f||-1)*Math.floor(Math.abs(f))));if(f>=c)return-1;for(f=0<=f?f:Math.max(c-Math.abs(f),0);f<c;f++)if(f in d&&d[f]===a)return f;return-1});Array.prototype.forEach||(Array.prototype.forEach=function(a,d){var c,f;if(null===this)throw new TypeError(" this is null or not defined");var e=Object(this),l=e.length>>>0;if("[object Function]"!=={}.toString.call(a))throw new TypeError(a+" is not a function");d&&(c=d);for(f=0;f<l;){var g;f in e&&(g=e[f],a.call(c,
g,f,e));f++}})})();a._sliceUserAgent=function(a,d,c){var f=[],e=navigator.userAgent;a=e.indexOf(a);d=e.indexOf(d,a);0>d&&(d=e.length);c=e.slice(a,d).split(c);e=c[1].split(".");for(d=0;d<e.length;++d)f.push(parseInt(e[d],10));return{name:c[0],version:f}};a.getBrowser=function(){var b=navigator.userAgent;return-1<b.indexOf("Chrome")?a._sliceUserAgent("Chrome"," ","/"):-1<b.indexOf("Safari")?a._sliceUserAgent("Safari"," ","/"):-1<b.indexOf("Firefox")?a._sliceUserAgent("Firefox"," ","/"):-1<b.indexOf("MSIE")?
a._sliceUserAgent("MSIE",";"," "):null};a.getServerUrl=function(a,d){return"file:"===c.location.protocol?d?d:"ws://127.0.0.1/ws":("https:"===c.location.protocol?"wss://":"ws://")+c.location.hostname+(""!==c.location.port?":"+c.location.port:"")+"/"+(a?a:"ws")};a.browserNotSupportedMessage="Browser does not support WebSockets (RFC6455)";a.deriveKey=function(a,d){return d&&d.salt?CryptoJS.PBKDF2(a,d.salt,{keySize:(d.keylen||32)/4,iterations:d.iterations||1E4,hasher:CryptoJS.algo.SHA256}).toString(CryptoJS.enc.Base64):
a};a._idchars="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";a._idlen=16;a._subprotocol="wamp";a._newid=function(){for(var b="",d=0;d<a._idlen;d+=1)b+=a._idchars.charAt(Math.floor(Math.random()*a._idchars.length));return b};a._newidFast=function(){return Math.random().toString(36)};a.log=function(){if(1<arguments.length){console.group("Log Item");for(var a=0;a<arguments.length;a+=1)console.log(arguments[a]);console.groupEnd()}else console.log(arguments[0])};a._debugrpc=!1;a._debugpubsub=
!1;a._debugws=!1;a._debugconnect=!1;a.debug=function(b,d,h){if("console"in c)a._debugrpc=b,a._debugpubsub=b,a._debugws=d,a._debugconnect=h;else throw"browser does not support console object";};a.version=function(){return a._version};a.PrefixMap=function(){this._index={};this._rindex={}};a.PrefixMap.prototype.get=function(a){return this._index[a]};a.PrefixMap.prototype.set=function(a,d){this._index[a]=d;this._rindex[d]=a};a.PrefixMap.prototype.setDefault=function(a){this._index[""]=a;this._rindex[a]=
""};a.PrefixMap.prototype.remove=function(a){var d=this._index[a];d&&(delete this._index[a],delete this._rindex[d])};a.PrefixMap.prototype.resolve=function(a,d){var c=a.indexOf(":");if(0<=c){var f=a.substring(0,c);if(this._index[f])return this._index[f]+a.substring(c+1)}return!0===d?a:null};a.PrefixMap.prototype.shrink=function(a,d){for(var c=a.length;0<c;c-=1){var f=a.substring(0,c);if(f=this._rindex[f])return f+":"+a.substring(c)}return!0===d?a:null};a._MESSAGE_TYPEID_WELCOME=0;a._MESSAGE_TYPEID_PREFIX=
1;a._MESSAGE_TYPEID_CALL=2;a._MESSAGE_TYPEID_CALL_RESULT=3;a._MESSAGE_TYPEID_CALL_ERROR=4;a._MESSAGE_TYPEID_SUBSCRIBE=5;a._MESSAGE_TYPEID_UNSUBSCRIBE=6;a._MESSAGE_TYPEID_PUBLISH=7;a._MESSAGE_TYPEID_EVENT=8;a.CONNECTION_CLOSED=0;a.CONNECTION_LOST=1;a.CONNECTION_RETRIES_EXCEEDED=2;a.CONNECTION_UNREACHABLE=3;a.CONNECTION_UNSUPPORTED=4;a.CONNECTION_UNREACHABLE_SCHEDULED_RECONNECT=5;a.CONNECTION_LOST_SCHEDULED_RECONNECT=6;a.Deferred=g.defer;a._construct=function(a,d){return"WebSocket"in c?d?new WebSocket(a,
d):new WebSocket(a):"MozWebSocket"in c?d?new MozWebSocket(a,d):new MozWebSocket(a):null};a.Session=function(b,d,c,f){var e=this;e._wsuri=b;e._options=f;e._websocket_onopen=d;e._websocket_onclose=c;e._websocket=null;e._websocket_connected=!1;e._session_id=null;e._wamp_version=null;e._server=null;e._calls={};e._subscriptions={};e._prefixes=new a.PrefixMap;e._txcnt=0;e._rxcnt=0;e._websocket=e._options&&e._options.skipSubprotocolAnnounce?a._construct(e._wsuri):a._construct(e._wsuri,[a._subprotocol]);
if(!e._websocket){if(void 0!==c){c(a.CONNECTION_UNSUPPORTED);return}throw a.browserNotSupportedMessage;}e._websocket.onmessage=function(b){a._debugws&&(e._rxcnt+=1,console.group("WS Receive"),console.info(e._wsuri+"  ["+e._session_id+"]"),console.log(e._rxcnt),console.log(b.data),console.groupEnd());b=JSON.parse(b.data);if(b[1]in e._calls){if(b[0]===a._MESSAGE_TYPEID_CALL_RESULT){var d=e._calls[b[1]],c=b[2];if(a._debugrpc&&void 0!==d._ab_callobj){console.group("WAMP Call",d._ab_callobj[2]);console.timeEnd(d._ab_tid);
console.group("Arguments");for(var f=3;f<d._ab_callobj.length;f+=1){var h=d._ab_callobj[f];if(void 0!==h)console.log(h);else break}console.groupEnd();console.group("Result");console.log(c);console.groupEnd();console.groupEnd()}d.resolve(c)}else if(b[0]===a._MESSAGE_TYPEID_CALL_ERROR){d=e._calls[b[1]];c=b[2];f=b[3];h=b[4];if(a._debugrpc&&void 0!==d._ab_callobj){console.group("WAMP Call",d._ab_callobj[2]);console.timeEnd(d._ab_tid);console.group("Arguments");for(var g=3;g<d._ab_callobj.length;g+=1){var m=
d._ab_callobj[g];if(void 0!==m)console.log(m);else break}console.groupEnd();console.group("Error");console.log(c);console.log(f);void 0!==h&&console.log(h);console.groupEnd();console.groupEnd()}void 0!==h?d.reject({uri:c,desc:f,detail:h}):d.reject({uri:c,desc:f})}delete e._calls[b[1]]}else if(b[0]===a._MESSAGE_TYPEID_EVENT){if(d=e._prefixes.resolve(b[1],!0),d in e._subscriptions){var n=b[1],u=b[2];a._debugpubsub&&(console.group("WAMP Event"),console.info(e._wsuri+"  ["+e._session_id+"]"),console.log(n),
console.log(u),console.groupEnd());e._subscriptions[d].forEach(function(a){a(n,u)})}}else if(b[0]===a._MESSAGE_TYPEID_WELCOME)if(null===e._session_id){e._session_id=b[1];e._wamp_version=b[2];e._server=b[3];if(a._debugrpc||a._debugpubsub)console.group("WAMP Welcome"),console.info(e._wsuri+"  ["+e._session_id+"]"),console.log(e._wamp_version),console.log(e._server),console.groupEnd();null!==e._websocket_onopen&&e._websocket_onopen()}else throw"protocol error (welcome message received more than once)";
};e._websocket.onopen=function(b){if(e._websocket.protocol!==a._subprotocol)if("undefined"===typeof e._websocket.protocol)a._debugws&&(console.group("WS Warning"),console.info(e._wsuri),console.log("WebSocket object has no protocol attribute: WAMP subprotocol check skipped!"),console.groupEnd());else if(e._options&&e._options.skipSubprotocolCheck)a._debugws&&(console.group("WS Warning"),console.info(e._wsuri),console.log("Server does not speak WAMP, but subprotocol check disabled by option!"),console.log(e._websocket.protocol),
console.groupEnd());else throw e._websocket.close(1E3,"server does not speak WAMP"),"server does not speak WAMP (but '"+e._websocket.protocol+"' !)";a._debugws&&(console.group("WAMP Connect"),console.info(e._wsuri),console.log(e._websocket.protocol),console.groupEnd());e._websocket_connected=!0};e._websocket.onerror=function(a){};e._websocket.onclose=function(b){a._debugws&&(e._websocket_connected?console.log("Autobahn connection to "+e._wsuri+" lost (code "+b.code+", reason '"+b.reason+"', wasClean "+
b.wasClean+")."):console.log("Autobahn could not connect to "+e._wsuri+" (code "+b.code+", reason '"+b.reason+"', wasClean "+b.wasClean+")."));void 0!==e._websocket_onclose&&(e._websocket_connected?b.wasClean?e._websocket_onclose(a.CONNECTION_CLOSED,"WS-"+b.code+": "+b.reason):e._websocket_onclose(a.CONNECTION_LOST):e._websocket_onclose(a.CONNECTION_UNREACHABLE));e._websocket_connected=!1;e._wsuri=null;e._websocket_onopen=null;e._websocket_onclose=null;e._websocket=null};e.log=function(){e._options&&
"sessionIdent"in e._options?console.group("WAMP Session '"+e._options.sessionIdent+"' ["+e._session_id+"]"):console.group("WAMP Session ["+e._session_id+"]");for(var a=0;a<arguments.length;++a)console.log(arguments[a]);console.groupEnd()}};a.Session.prototype._send=function(b){if(!this._websocket_connected)throw"Autobahn not connected";switch(!0){case c.Prototype&&"undefined"===typeof top.root.__prototype_deleted:case "function"===typeof b.toJSON:b=b.toJSON();break;default:b=JSON.stringify(b)}this._websocket.send(b);
this._txcnt+=1;a._debugws&&(console.group("WS Send"),console.info(this._wsuri+"  ["+this._session_id+"]"),console.log(this._txcnt),console.log(b),console.groupEnd())};a.Session.prototype.close=function(){this._websocket_connected&&this._websocket.close()};a.Session.prototype.sessionid=function(){return this._session_id};a.Session.prototype.wsuri=function(){return this._wsuri};a.Session.prototype.shrink=function(a,d){void 0===d&&(d=!0);return this._prefixes.shrink(a,d)};a.Session.prototype.resolve=
function(a,d){void 0===d&&(d=!0);return this._prefixes.resolve(a,d)};a.Session.prototype.prefix=function(b,d){this._prefixes.set(b,d);if(a._debugrpc||a._debugpubsub)console.group("WAMP Prefix"),console.info(this._wsuri+"  ["+this._session_id+"]"),console.log(b),console.log(d),console.groupEnd();this._send([a._MESSAGE_TYPEID_PREFIX,b,d])};a.Session.prototype.call=function(){for(var b=new a.Deferred,d;!(d=a._newidFast(),!(d in this._calls)););this._calls[d]=b;for(var c=this._prefixes.shrink(arguments[0],
!0),c=[a._MESSAGE_TYPEID_CALL,d,c],f=1;f<arguments.length;f+=1)c.push(arguments[f]);this._send(c);a._debugrpc&&(b._ab_callobj=c,b._ab_tid=this._wsuri+"  ["+this._session_id+"]["+d+"]",console.time(b._ab_tid),console.info());return b.promise.then?b.promise:b};a.Session.prototype.subscribe=function(b,d){var c=this._prefixes.resolve(b,!0);c in this._subscriptions||(a._debugpubsub&&(console.group("WAMP Subscribe"),console.info(this._wsuri+"  ["+this._session_id+"]"),console.log(b),console.log(d),console.groupEnd()),
this._send([a._MESSAGE_TYPEID_SUBSCRIBE,b]),this._subscriptions[c]=[]);if(-1===this._subscriptions[c].indexOf(d))this._subscriptions[c].push(d);else throw"callback "+d+" already subscribed for topic "+c;};a.Session.prototype.unsubscribe=function(b,d){var c=this._prefixes.resolve(b,!0);if(c in this._subscriptions){var f;if(void 0!==d){var e=this._subscriptions[c].indexOf(d);if(-1!==e)f=d,this._subscriptions[c].splice(e,1);else throw"no callback "+d+" subscribed on topic "+c;}else f=this._subscriptions[c].slice(),
this._subscriptions[c]=[];0===this._subscriptions[c].length&&(delete this._subscriptions[c],a._debugpubsub&&(console.group("WAMP Unsubscribe"),console.info(this._wsuri+"  ["+this._session_id+"]"),console.log(b),console.log(f),console.groupEnd()),this._send([a._MESSAGE_TYPEID_UNSUBSCRIBE,b]))}else throw"not subscribed to topic "+c;};a.Session.prototype.publish=function(){var b=arguments[0],d=arguments[1],c=null,f=null,e=null,g=null;if(3<arguments.length){if(!(arguments[2]instanceof Array))throw"invalid argument type(s)";
if(!(arguments[3]instanceof Array))throw"invalid argument type(s)";f=arguments[2];e=arguments[3];g=[a._MESSAGE_TYPEID_PUBLISH,b,d,f,e]}else if(2<arguments.length)if("boolean"===typeof arguments[2])c=arguments[2],g=[a._MESSAGE_TYPEID_PUBLISH,b,d,c];else if(arguments[2]instanceof Array)f=arguments[2],g=[a._MESSAGE_TYPEID_PUBLISH,b,d,f];else throw"invalid argument type(s)";else g=[a._MESSAGE_TYPEID_PUBLISH,b,d];a._debugpubsub&&(console.group("WAMP Publish"),console.info(this._wsuri+"  ["+this._session_id+
"]"),console.log(b),console.log(d),null!==c?console.log(c):null!==f&&(console.log(f),null!==e&&console.log(e)),console.groupEnd());this._send(g)};a.Session.prototype.authreq=function(a,d){return this.call("http://api.wamp.ws/procedure#authreq",a,d)};a.Session.prototype.authsign=function(a,d){d||(d="");return CryptoJS.HmacSHA256(a,d).toString(CryptoJS.enc.Base64)};a.Session.prototype.auth=function(a){return this.call("http://api.wamp.ws/procedure#auth",a)};a._connect=function(b){var d=new a.Session(b.wsuri,
function(){b.connects+=1;b.retryCount=0;b.onConnect(d)},function(d,f){var e=null;switch(d){case a.CONNECTION_CLOSED:b.onHangup(d,"Connection was closed properly ["+f+"]");break;case a.CONNECTION_UNSUPPORTED:b.onHangup(d,"Browser does not support WebSocket.");break;case a.CONNECTION_UNREACHABLE:b.retryCount+=1;if(0===b.connects)b.onHangup(d,"Connection could not be established.");else if(b.retryCount<=b.options.maxRetries)(e=b.onHangup(a.CONNECTION_UNREACHABLE_SCHEDULED_RECONNECT,"Connection unreachable - scheduled reconnect to occur in "+
b.options.retryDelay/1E3+" second(s) - attempt "+b.retryCount+" of "+b.options.maxRetries+".",{delay:b.options.retryDelay,retries:b.retryCount,maxretries:b.options.maxRetries}))?(a._debugconnect&&console.log("Connection unreachable - retrying stopped by app"),b.onHangup(a.CONNECTION_RETRIES_EXCEEDED,"Number of connection retries exceeded.")):(a._debugconnect&&console.log("Connection unreachable - retrying ("+b.retryCount+") .."),c.setTimeout(function(){a._connect(b)},b.options.retryDelay));else b.onHangup(a.CONNECTION_RETRIES_EXCEEDED,
"Number of connection retries exceeded.");break;case a.CONNECTION_LOST:b.retryCount+=1;if(b.retryCount<=b.options.maxRetries)(e=b.onHangup(a.CONNECTION_LOST_SCHEDULED_RECONNECT,"Connection lost - scheduled "+b.retryCount+"th reconnect to occur in "+b.options.retryDelay/1E3+" second(s).",{delay:b.options.retryDelay,retries:b.retryCount,maxretries:b.options.maxRetries}))?(a._debugconnect&&console.log("Connection lost - retrying stopped by app"),b.onHangup(a.CONNECTION_RETRIES_EXCEEDED,"Connection lost.")):
(a._debugconnect&&console.log("Connection lost - retrying ("+b.retryCount+") .."),c.setTimeout(function(){a._connect(b)},b.options.retryDelay));else b.onHangup(a.CONNECTION_RETRIES_EXCEEDED,"Connection lost.");break;default:throw"unhandled close code in ab._connect";}},b.options)};a.connect=function(b,d,c,f){var e={};e.wsuri=b;e.options=f?f:{};void 0===e.options.retryDelay&&(e.options.retryDelay=5E3);void 0===e.options.maxRetries&&(e.options.maxRetries=10);void 0===e.options.skipSubprotocolCheck&&
(e.options.skipSubprotocolCheck=!1);void 0===e.options.skipSubprotocolAnnounce&&(e.options.skipSubprotocolAnnounce=!1);if(d)e.onConnect=d;else throw"onConnect handler required!";e.onHangup=c?c:function(b,d,c){a._debugconnect&&console.log(b,d,c)};e.connects=0;e.retryCount=0;a._connect(e)};a.launch=function(b,d,c){a.connect(b.wsuri,function(c){!b.appkey||""===b.appkey?c.authreq().then(function(){c.auth().then(function(b){d?d(c):a._debugconnect&&c.log("Session opened.")},c.log)},c.log):c.authreq(b.appkey,
b.appextra).then(function(e){var g=null;"function"===typeof b.appsecret?g=b.appsecret(e):(g=a.deriveKey(b.appsecret,JSON.parse(e).authextra),g=c.authsign(e,g));c.auth(g).then(function(b){d?d(c):a._debugconnect&&c.log("Session opened.")},c.log)},c.log)},function(b,d,g){c?c(b,d,g):a._debugconnect&&a.log("Session closed.",b,d,g)},b.sessionConfig)};return a});ab._UA_FIREFOX=/.*Firefox\/([0-9+]*).*/;ab._UA_CHROME=/.*Chrome\/([0-9+]*).*/;ab._UA_CHROMEFRAME=/.*chromeframe\/([0-9]*).*/;ab._UA_WEBKIT=/.*AppleWebKit\/([0-9+.]*)w*.*/;ab._UA_WEBOS=/.*webOS\/([0-9+.]*)w*.*/;ab._matchRegex=function(c,g){var a=g.exec(c);return a?a[1]:a};
ab.lookupWsSupport=function(){var c=navigator.userAgent;if(-1<c.indexOf("MSIE")){if(-1<c.indexOf("MSIE 10"))return[!0,!0,!0];if(-1<c.indexOf("chromeframe")){var g=parseInt(ab._matchRegex(c,ab._UA_CHROMEFRAME));return 14<=g?[!0,!1,!0]:[!1,!1,!1]}if(-1<c.indexOf("MSIE 8")||-1<c.indexOf("MSIE 9"))return[!0,!0,!0]}else{if(-1<c.indexOf("Firefox")){if(g=parseInt(ab._matchRegex(c,ab._UA_FIREFOX))){if(7<=g)return[!0,!1,!0];if(3<=g)return[!0,!0,!0]}return[!1,!1,!0]}if(-1<c.indexOf("Safari")&&-1==c.indexOf("Chrome")){if(g=
ab._matchRegex(c,ab._UA_WEBKIT))return-1<c.indexOf("Windows")&&"534+"==g||-1<c.indexOf("Macintosh")&&(g=g.replace("+","").split("."),535==parseInt(g[0])&&24<=parseInt(g[1])||535<parseInt(g[0]))?[!0,!1,!0]:-1<c.indexOf("webOS")?(g=ab._matchRegex(c,ab._UA_WEBOS).split("."),2==parseInt(g[0])?[!1,!0,!0]:[!1,!1,!1]):[!0,!0,!0]}else if(-1<c.indexOf("Chrome")){if(g=parseInt(ab._matchRegex(c,ab._UA_CHROME)))return 14<=g?[!0,!1,!0]:4<=g?[!0,!0,!0]:[!1,!1,!0]}else if(-1<c.indexOf("Android")){if(-1<c.indexOf("Firefox")||
-1<c.indexOf("CrMo"))return[!0,!1,!0];if(-1<c.indexOf("Opera"))return[!1,!1,!0];if(-1<c.indexOf("CrMo"))return[!0,!0,!0]}else if(-1<c.indexOf("iPhone")||-1<c.indexOf("iPad")||-1<c.indexOf("iPod"))return[!1,!1,!0]}return[!1,!1,!1]};
/* Modernizr 2.6.2 (Custom Build) | MIT & BSD
 * Build: http://modernizr.com/download/#-cssanimations-csstransitions-touch-shiv-cssclasses-prefixed-teststyles-testprop-testallprops-prefixes-domprefixes-load
 */
;window.Modernizr=function(a,b,c){function z(a){j.cssText=a}function A(a,b){return z(m.join(a+";")+(b||""))}function B(a,b){return typeof a===b}function C(a,b){return!!~(""+a).indexOf(b)}function D(a,b){for(var d in a){var e=a[d];if(!C(e,"-")&&j[e]!==c)return b=="pfx"?e:!0}return!1}function E(a,b,d){for(var e in a){var f=b[a[e]];if(f!==c)return d===!1?a[e]:B(f,"function")?f.bind(d||b):f}return!1}function F(a,b,c){var d=a.charAt(0).toUpperCase()+a.slice(1),e=(a+" "+o.join(d+" ")+d).split(" ");return B(b,"string")||B(b,"undefined")?D(e,b):(e=(a+" "+p.join(d+" ")+d).split(" "),E(e,b,c))}var d="2.6.2",e={},f=!0,g=b.documentElement,h="modernizr",i=b.createElement(h),j=i.style,k,l={}.toString,m=" -webkit- -moz- -o- -ms- ".split(" "),n="Webkit Moz O ms",o=n.split(" "),p=n.toLowerCase().split(" "),q={},r={},s={},t=[],u=t.slice,v,w=function(a,c,d,e){var f,i,j,k,l=b.createElement("div"),m=b.body,n=m||b.createElement("body");if(parseInt(d,10))while(d--)j=b.createElement("div"),j.id=e?e[d]:h+(d+1),l.appendChild(j);return f=["&#173;",'<style id="s',h,'">',a,"</style>"].join(""),l.id=h,(m?l:n).innerHTML+=f,n.appendChild(l),m||(n.style.background="",n.style.overflow="hidden",k=g.style.overflow,g.style.overflow="hidden",g.appendChild(n)),i=c(l,a),m?l.parentNode.removeChild(l):(n.parentNode.removeChild(n),g.style.overflow=k),!!i},x={}.hasOwnProperty,y;!B(x,"undefined")&&!B(x.call,"undefined")?y=function(a,b){return x.call(a,b)}:y=function(a,b){return b in a&&B(a.constructor.prototype[b],"undefined")},Function.prototype.bind||(Function.prototype.bind=function(b){var c=this;if(typeof c!="function")throw new TypeError;var d=u.call(arguments,1),e=function(){if(this instanceof e){var a=function(){};a.prototype=c.prototype;var f=new a,g=c.apply(f,d.concat(u.call(arguments)));return Object(g)===g?g:f}return c.apply(b,d.concat(u.call(arguments)))};return e}),q.touch=function(){var c;return"ontouchstart"in a||a.DocumentTouch&&b instanceof DocumentTouch?c=!0:w(["@media (",m.join("touch-enabled),("),h,")","{#modernizr{top:9px;position:absolute}}"].join(""),function(a){c=a.offsetTop===9}),c},q.cssanimations=function(){return F("animationName")},q.csstransitions=function(){return F("transition")};for(var G in q)y(q,G)&&(v=G.toLowerCase(),e[v]=q[G](),t.push((e[v]?"":"no-")+v));return e.addTest=function(a,b){if(typeof a=="object")for(var d in a)y(a,d)&&e.addTest(d,a[d]);else{a=a.toLowerCase();if(e[a]!==c)return e;b=typeof b=="function"?b():b,typeof f!="undefined"&&f&&(g.className+=" "+(b?"":"no-")+a),e[a]=b}return e},z(""),i=k=null,function(a,b){function k(a,b){var c=a.createElement("p"),d=a.getElementsByTagName("head")[0]||a.documentElement;return c.innerHTML="x<style>"+b+"</style>",d.insertBefore(c.lastChild,d.firstChild)}function l(){var a=r.elements;return typeof a=="string"?a.split(" "):a}function m(a){var b=i[a[g]];return b||(b={},h++,a[g]=h,i[h]=b),b}function n(a,c,f){c||(c=b);if(j)return c.createElement(a);f||(f=m(c));var g;return f.cache[a]?g=f.cache[a].cloneNode():e.test(a)?g=(f.cache[a]=f.createElem(a)).cloneNode():g=f.createElem(a),g.canHaveChildren&&!d.test(a)?f.frag.appendChild(g):g}function o(a,c){a||(a=b);if(j)return a.createDocumentFragment();c=c||m(a);var d=c.frag.cloneNode(),e=0,f=l(),g=f.length;for(;e<g;e++)d.createElement(f[e]);return d}function p(a,b){b.cache||(b.cache={},b.createElem=a.createElement,b.createFrag=a.createDocumentFragment,b.frag=b.createFrag()),a.createElement=function(c){return r.shivMethods?n(c,a,b):b.createElem(c)},a.createDocumentFragment=Function("h,f","return function(){var n=f.cloneNode(),c=n.createElement;h.shivMethods&&("+l().join().replace(/\w+/g,function(a){return b.createElem(a),b.frag.createElement(a),'c("'+a+'")'})+");return n}")(r,b.frag)}function q(a){a||(a=b);var c=m(a);return r.shivCSS&&!f&&!c.hasCSS&&(c.hasCSS=!!k(a,"article,aside,figcaption,figure,footer,header,hgroup,nav,section{display:block}mark{background:#FF0;color:#000}")),j||p(a,c),a}var c=a.html5||{},d=/^<|^(?:button|map|select|textarea|object|iframe|option|optgroup)$/i,e=/^(?:a|b|code|div|fieldset|h1|h2|h3|h4|h5|h6|i|label|li|ol|p|q|span|strong|style|table|tbody|td|th|tr|ul)$/i,f,g="_html5shiv",h=0,i={},j;(function(){try{var a=b.createElement("a");a.innerHTML="<xyz></xyz>",f="hidden"in a,j=a.childNodes.length==1||function(){b.createElement("a");var a=b.createDocumentFragment();return typeof a.cloneNode=="undefined"||typeof a.createDocumentFragment=="undefined"||typeof a.createElement=="undefined"}()}catch(c){f=!0,j=!0}})();var r={elements:c.elements||"abbr article aside audio bdi canvas data datalist details figcaption figure footer header hgroup mark meter nav output progress section summary time video",shivCSS:c.shivCSS!==!1,supportsUnknownElements:j,shivMethods:c.shivMethods!==!1,type:"default",shivDocument:q,createElement:n,createDocumentFragment:o};a.html5=r,q(b)}(this,b),e._version=d,e._prefixes=m,e._domPrefixes=p,e._cssomPrefixes=o,e.testProp=function(a){return D([a])},e.testAllProps=F,e.testStyles=w,e.prefixed=function(a,b,c){return b?F(a,b,c):F(a,"pfx")},g.className=g.className.replace(/(^|\s)no-js(\s|$)/,"$1$2")+(f?" js "+t.join(" "):""),e}(this,this.document),function(a,b,c){function d(a){return"[object Function]"==o.call(a)}function e(a){return"string"==typeof a}function f(){}function g(a){return!a||"loaded"==a||"complete"==a||"uninitialized"==a}function h(){var a=p.shift();q=1,a?a.t?m(function(){("c"==a.t?B.injectCss:B.injectJs)(a.s,0,a.a,a.x,a.e,1)},0):(a(),h()):q=0}function i(a,c,d,e,f,i,j){function k(b){if(!o&&g(l.readyState)&&(u.r=o=1,!q&&h(),l.onload=l.onreadystatechange=null,b)){"img"!=a&&m(function(){t.removeChild(l)},50);for(var d in y[c])y[c].hasOwnProperty(d)&&y[c][d].onload()}}var j=j||B.errorTimeout,l=b.createElement(a),o=0,r=0,u={t:d,s:c,e:f,a:i,x:j};1===y[c]&&(r=1,y[c]=[]),"object"==a?l.data=c:(l.src=c,l.type=a),l.width=l.height="0",l.onerror=l.onload=l.onreadystatechange=function(){k.call(this,r)},p.splice(e,0,u),"img"!=a&&(r||2===y[c]?(t.insertBefore(l,s?null:n),m(k,j)):y[c].push(l))}function j(a,b,c,d,f){return q=0,b=b||"j",e(a)?i("c"==b?v:u,a,b,this.i++,c,d,f):(p.splice(this.i++,0,a),1==p.length&&h()),this}function k(){var a=B;return a.loader={load:j,i:0},a}var l=b.documentElement,m=a.setTimeout,n=b.getElementsByTagName("script")[0],o={}.toString,p=[],q=0,r="MozAppearance"in l.style,s=r&&!!b.createRange().compareNode,t=s?l:n.parentNode,l=a.opera&&"[object Opera]"==o.call(a.opera),l=!!b.attachEvent&&!l,u=r?"object":l?"script":"img",v=l?"script":u,w=Array.isArray||function(a){return"[object Array]"==o.call(a)},x=[],y={},z={timeout:function(a,b){return b.length&&(a.timeout=b[0]),a}},A,B;B=function(a){function b(a){var a=a.split("!"),b=x.length,c=a.pop(),d=a.length,c={url:c,origUrl:c,prefixes:a},e,f,g;for(f=0;f<d;f++)g=a[f].split("="),(e=z[g.shift()])&&(c=e(c,g));for(f=0;f<b;f++)c=x[f](c);return c}function g(a,e,f,g,h){var i=b(a),j=i.autoCallback;i.url.split(".").pop().split("?").shift(),i.bypass||(e&&(e=d(e)?e:e[a]||e[g]||e[a.split("/").pop().split("?")[0]]),i.instead?i.instead(a,e,f,g,h):(y[i.url]?i.noexec=!0:y[i.url]=1,f.load(i.url,i.forceCSS||!i.forceJS&&"css"==i.url.split(".").pop().split("?").shift()?"c":c,i.noexec,i.attrs,i.timeout),(d(e)||d(j))&&f.load(function(){k(),e&&e(i.origUrl,h,g),j&&j(i.origUrl,h,g),y[i.url]=2})))}function h(a,b){function c(a,c){if(a){if(e(a))c||(j=function(){var a=[].slice.call(arguments);k.apply(this,a),l()}),g(a,j,b,0,h);else if(Object(a)===a)for(n in m=function(){var b=0,c;for(c in a)a.hasOwnProperty(c)&&b++;return b}(),a)a.hasOwnProperty(n)&&(!c&&!--m&&(d(j)?j=function(){var a=[].slice.call(arguments);k.apply(this,a),l()}:j[n]=function(a){return function(){var b=[].slice.call(arguments);a&&a.apply(this,b),l()}}(k[n])),g(a[n],j,b,n,h))}else!c&&l()}var h=!!a.test,i=a.load||a.both,j=a.callback||f,k=j,l=a.complete||f,m,n;c(h?a.yep:a.nope,!!i),i&&c(i)}var i,j,l=this.yepnope.loader;if(e(a))g(a,0,l,0);else if(w(a))for(i=0;i<a.length;i++)j=a[i],e(j)?g(j,0,l,0):w(j)?B(j):Object(j)===j&&h(j,l);else Object(a)===a&&h(a,l)},B.addPrefix=function(a,b){z[a]=b},B.addFilter=function(a){x.push(a)},B.errorTimeout=1e4,null==b.readyState&&b.addEventListener&&(b.readyState="loading",b.addEventListener("DOMContentLoaded",A=function(){b.removeEventListener("DOMContentLoaded",A,0),b.readyState="complete"},0)),a.yepnope=k(),a.yepnope.executeStack=h,a.yepnope.injectJs=function(a,c,d,e,i,j){var k=b.createElement("script"),l,o,e=e||B.errorTimeout;k.src=a;for(o in d)k.setAttribute(o,d[o]);c=j?h:c||f,k.onreadystatechange=k.onload=function(){!l&&g(k.readyState)&&(l=1,c(),k.onload=k.onreadystatechange=null)},m(function(){l||(l=1,c(1))},e),i?k.onload():n.parentNode.insertBefore(k,n)},a.yepnope.injectCss=function(a,c,d,e,g,i){var e=b.createElement("link"),j,c=i?h:c||f;e.href=a,e.rel="stylesheet",e.type="text/css";for(j in d)e.setAttribute(j,d[j]);g||(n.parentNode.insertBefore(e,n),m(c,0))}}(this,document),Modernizr.load=function(){yepnope.apply(window,[].slice.call(arguments,0))};
/*
 * Snap.js
 *
 * Copyright 2013, Jacob Kelley - http://jakiestfu.com/
 * Released under the MIT Licence
 * http://opensource.org/licenses/MIT
 *
 * Github:  http://github.com/jakiestfu/Snap.js/
 * Version: 1.9.3
 */
/*jslint browser: true*/
/*global define, module, ender*/
(function(win, doc) {
    'use strict';
    var Snap = Snap || function(userOpts) {
        var settings = {
            element: null,
            dragger: null,
            disable: 'none',
            addBodyClasses: true,
            hyperextensible: true,
            resistance: 0.5,
            flickThreshold: 50,
            transitionSpeed: 0.3,
            easing: 'ease',
            maxPosition: 230,
            minPosition: -230,
            tapToClose: true,
            touchToDrag: true,
            slideIntent: 40, // degrees
            minDragDistance: 5
        },
        cache = {
            simpleStates: {
                opening: null,
                towards: null,
                hyperExtending: null,
                halfway: null,
                flick: null,
                translation: {
                    absolute: 0,
                    relative: 0,
                    sinceDirectionChange: 0,
                    percentage: 0
                }
            }
        },
        eventList = {},
        utils = {
            hasTouch: ('ontouchstart' in doc.documentElement || win.navigator.msPointerEnabled),
            eventType: function(action) {
                var eventTypes = {
                        down: (utils.hasTouch ? 'touchstart' : 'mousedown'),
                        move: (utils.hasTouch ? 'touchmove' : 'mousemove'),
                        up: (utils.hasTouch ? 'touchend' : 'mouseup'),
                        out: (utils.hasTouch ? 'touchcancel' : 'mouseout')
                    };
                return eventTypes[action];
            },
            page: function(t, e){
                return (utils.hasTouch && e.touches.length && e.touches[0]) ? e.touches[0]['page'+t] : e['page'+t];
            },
            klass: {
                has: function(el, name){
                    return (el.className).indexOf(name) !== -1;
                },
                add: function(el, name){
                    if(!utils.klass.has(el, name) && settings.addBodyClasses){
                        el.className += " "+name;
                    }
                },
                remove: function(el, name){
                    if(settings.addBodyClasses){
                        el.className = (el.className).replace(name, "").replace(/^\s+|\s+$/g, '');
                    }
                }
            },
            dispatchEvent: function(type) {
                if (typeof eventList[type] === 'function') {
                    return eventList[type].call();
                }
            },
            vendor: function(){
                var tmp = doc.createElement("div"),
                    prefixes = 'webkit Moz O ms'.split(' '),
                    i;
                for (i in prefixes) {
                    if (typeof tmp.style[prefixes[i] + 'Transition'] !== 'undefined') {
                        return prefixes[i];
                    }
                }
            },
            transitionCallback: function(){
                return (cache.vendor==='Moz' || cache.vendor==='ms') ? 'transitionend' : cache.vendor+'TransitionEnd';
            },
            canTransform: function(){
                return typeof settings.element.style[cache.vendor+'Transform'] !== 'undefined';
            },
            deepExtend: function(destination, source) {
                var property;
                for (property in source) {
                    if (source[property] && source[property].constructor && source[property].constructor === Object) {
                        destination[property] = destination[property] || {};
                        utils.deepExtend(destination[property], source[property]);
                    } else {
                        destination[property] = source[property];
                    }
                }
                return destination;
            },
            angleOfDrag: function(x, y) {
                var degrees, theta;
                // Calc Theta
                theta = Math.atan2(-(cache.startDragY - y), (cache.startDragX - x));
                if (theta < 0) {
                    theta += 2 * Math.PI;
                }
                // Calc Degrees
                degrees = Math.floor(theta * (180 / Math.PI) - 180);
                if (degrees < 0 && degrees > -180) {
                    degrees = 360 - Math.abs(degrees);
                }
                return Math.abs(degrees);
            },
            events: {
                addEvent: function addEvent(element, eventName, func) {
                    if (element.addEventListener) {
                        return element.addEventListener(eventName, func, false);
                    } else if (element.attachEvent) {
                        return element.attachEvent("on" + eventName, func);
                    }
                },
                removeEvent: function addEvent(element, eventName, func) {
                    if (element.addEventListener) {
                        return element.removeEventListener(eventName, func, false);
                    } else if (element.attachEvent) {
                        return element.detachEvent("on" + eventName, func);
                    }
                },
                prevent: function(e) {
                    if (e.preventDefault) {
                        e.preventDefault();
                    } else {
                        e.returnValue = false;
                    }
                }
            },
            parentUntil: function(el, attr) {
                var isStr = typeof attr === 'string';
                while (el.parentNode) {
                    if (isStr && el.getAttribute && el.getAttribute(attr)){
                        return el;
                    } else if(!isStr && el === attr){
                        return el;
                    }
                    el = el.parentNode;
                }
                return null;
            }
        },
        action = {
            translate: {
                get: {
                    matrix: function(index) {

                        if( !utils.canTransform() ){
                            return parseInt(settings.element.style.left, 10);
                        } else {
                            var matrix = win.getComputedStyle(settings.element)[cache.vendor+'Transform'].match(/\((.*)\)/),
                                ieOffset = 8;
                            if (matrix) {
                                matrix = matrix[1].split(',');
                                if(matrix.length===16){
                                    index+=ieOffset;
                                }
                                return parseInt(matrix[index], 10);
                            }
                            return 0;
                        }
                    }
                },
                easeCallback: function(){
                    settings.element.style[cache.vendor+'Transition'] = '';
                    cache.translation = action.translate.get.matrix(4);
                    cache.easing = false;
                    clearInterval(cache.animatingInterval);

                    if(cache.easingTo===0){
                        utils.klass.remove(doc.body, 'snapjs-right');
                        utils.klass.remove(doc.body, 'snapjs-left');
                    }

                    utils.dispatchEvent('animated');
                    utils.events.removeEvent(settings.element, utils.transitionCallback(), action.translate.easeCallback);
                },
                easeTo: function(n) {

                    if( !utils.canTransform() ){
                        cache.translation = n;
                        action.translate.x(n);
                    } else {
                        cache.easing = true;
                        cache.easingTo = n;

                        settings.element.style[cache.vendor+'Transition'] = 'all ' + settings.transitionSpeed + 's ' + settings.easing;

                        cache.animatingInterval = setInterval(function() {
                            utils.dispatchEvent('animating');
                        }, 1);
                        
                        utils.events.addEvent(settings.element, utils.transitionCallback(), action.translate.easeCallback);
                        action.translate.x(n);
                    }
                    if(n===0){
                           settings.element.style[cache.vendor+'Transform'] = '';
                       }
                },
                x: function(n) {
                    if( (settings.disable==='left' && n>0) ||
                        (settings.disable==='right' && n<0)
                    ){ return; }
                    
                    if( !settings.hyperextensible ){
                        if( n===settings.maxPosition || n>settings.maxPosition ){
                            n=settings.maxPosition;
                        } else if( n===settings.minPosition || n<settings.minPosition ){
                            n=settings.minPosition;
                        }
                    }
                    
                    n = parseInt(n, 10);
                    if(isNaN(n)){
                        n = 0;
                    }

                    if( utils.canTransform() ){
                        var theTranslate = 'translate3d(' + n + 'px, 0,0)';
                        settings.element.style[cache.vendor+'Transform'] = theTranslate;
                    } else {
                        settings.element.style.width = (win.innerWidth || doc.documentElement.clientWidth)+'px';

                        settings.element.style.left = n+'px';
                        settings.element.style.right = '';
                    }
                }
            },
            drag: {
                listen: function() {
                    cache.translation = 0;
                    cache.easing = false;
                    utils.events.addEvent(settings.element, utils.eventType('down'), action.drag.startDrag);
                    utils.events.addEvent(settings.element, utils.eventType('move'), action.drag.dragging);
                    utils.events.addEvent(settings.element, utils.eventType('up'), action.drag.endDrag);
                },
                stopListening: function() {
                    utils.events.removeEvent(settings.element, utils.eventType('down'), action.drag.startDrag);
                    utils.events.removeEvent(settings.element, utils.eventType('move'), action.drag.dragging);
                    utils.events.removeEvent(settings.element, utils.eventType('up'), action.drag.endDrag);
                },
                startDrag: function(e) {
                    // No drag on ignored elements
                    var target = e.target ? e.target : e.srcElement,
                        ignoreParent = utils.parentUntil(target, 'data-snap-ignore');
                    
                    if (ignoreParent) {
                        utils.dispatchEvent('ignore');
                        return;
                    }
                    
                    
                    if(settings.dragger){
                        var dragParent = utils.parentUntil(target, settings.dragger);
                        
                        // Only use dragger if we're in a closed state
                        if( !dragParent && 
                            (cache.translation !== settings.minPosition && 
                            cache.translation !== settings.maxPosition
                        )){
                            return;
                        }
                    }
                    
                    utils.dispatchEvent('start');
                    settings.element.style[cache.vendor+'Transition'] = '';
                    cache.isDragging = true;
                    cache.hasIntent = null;
                    cache.intentChecked = false;
                    cache.startDragX = utils.page('X', e);
                    cache.startDragY = utils.page('Y', e);
                    cache.dragWatchers = {
                        current: 0,
                        last: 0,
                        hold: 0,
                        state: ''
                    };
                    cache.simpleStates = {
                        opening: null,
                        towards: null,
                        hyperExtending: null,
                        halfway: null,
                        flick: null,
                        translation: {
                            absolute: 0,
                            relative: 0,
                            sinceDirectionChange: 0,
                            percentage: 0
                        }
                    };
                },
                dragging: function(e) {
                    if (cache.isDragging && settings.touchToDrag) {

                        var thePageX = utils.page('X', e),
                            thePageY = utils.page('Y', e),
                            translated = cache.translation,
                            absoluteTranslation = action.translate.get.matrix(4),
                            whileDragX = thePageX - cache.startDragX,
                            openingLeft = absoluteTranslation > 0,
                            translateTo = whileDragX,
                            diff;

                        // Shown no intent already
                        if((cache.intentChecked && !cache.hasIntent)){
                            return;
                        }

                        if(settings.addBodyClasses){
                            if((absoluteTranslation)>0){
                                utils.klass.add(doc.body, 'snapjs-left');
                                utils.klass.remove(doc.body, 'snapjs-right');
                            } else if((absoluteTranslation)<0){
                                utils.klass.add(doc.body, 'snapjs-right');
                                utils.klass.remove(doc.body, 'snapjs-left');
                            }
                        }

                        if (cache.hasIntent === false || cache.hasIntent === null) {
                            var deg = utils.angleOfDrag(thePageX, thePageY),
                                inRightRange = (deg >= 0 && deg <= settings.slideIntent) || (deg <= 360 && deg > (360 - settings.slideIntent)),
                                inLeftRange = (deg >= 180 && deg <= (180 + settings.slideIntent)) || (deg <= 180 && deg >= (180 - settings.slideIntent));
                            if (!inLeftRange && !inRightRange) {
                                cache.hasIntent = false;
                            } else {
                                cache.hasIntent = true;
                            }
                            cache.intentChecked = true;
                        }

                        if (
                            (settings.minDragDistance>=Math.abs(thePageX-cache.startDragX)) || // Has user met minimum drag distance?
                            (cache.hasIntent === false)
                        ) {
                            return;
                        }

                        utils.events.prevent(e);
                        utils.dispatchEvent('drag');

                        cache.dragWatchers.current = thePageX;
                        // Determine which direction we are going
                        if (cache.dragWatchers.last > thePageX) {
                            if (cache.dragWatchers.state !== 'left') {
                                cache.dragWatchers.state = 'left';
                                cache.dragWatchers.hold = thePageX;
                            }
                            cache.dragWatchers.last = thePageX;
                        } else if (cache.dragWatchers.last < thePageX) {
                            if (cache.dragWatchers.state !== 'right') {
                                cache.dragWatchers.state = 'right';
                                cache.dragWatchers.hold = thePageX;
                            }
                            cache.dragWatchers.last = thePageX;
                        }
                        if (openingLeft) {
                            // Pulling too far to the right
                            if (settings.maxPosition < absoluteTranslation) {
                                diff = (absoluteTranslation - settings.maxPosition) * settings.resistance;
                                translateTo = whileDragX - diff;
                            }
                            cache.simpleStates = {
                                opening: 'left',
                                towards: cache.dragWatchers.state,
                                hyperExtending: settings.maxPosition < absoluteTranslation,
                                halfway: absoluteTranslation > (settings.maxPosition / 2),
                                flick: Math.abs(cache.dragWatchers.current - cache.dragWatchers.hold) > settings.flickThreshold,
                                translation: {
                                    absolute: absoluteTranslation,
                                    relative: whileDragX,
                                    sinceDirectionChange: (cache.dragWatchers.current - cache.dragWatchers.hold),
                                    percentage: (absoluteTranslation/settings.maxPosition)*100
                                }
                            };
                        } else {
                            // Pulling too far to the left
                            if (settings.minPosition > absoluteTranslation) {
                                diff = (absoluteTranslation - settings.minPosition) * settings.resistance;
                                translateTo = whileDragX - diff;
                            }
                            cache.simpleStates = {
                                opening: 'right',
                                towards: cache.dragWatchers.state,
                                hyperExtending: settings.minPosition > absoluteTranslation,
                                halfway: absoluteTranslation < (settings.minPosition / 2),
                                flick: Math.abs(cache.dragWatchers.current - cache.dragWatchers.hold) > settings.flickThreshold,
                                translation: {
                                    absolute: absoluteTranslation,
                                    relative: whileDragX,
                                    sinceDirectionChange: (cache.dragWatchers.current - cache.dragWatchers.hold),
                                    percentage: (absoluteTranslation/settings.minPosition)*100
                                }
                            };
                        }
                        action.translate.x(translateTo + translated);
                    }
                },
                endDrag: function(e) {
                    if (cache.isDragging) {
                        utils.dispatchEvent('end');
                        var translated = action.translate.get.matrix(4);

                        // Tap Close
                        if (cache.dragWatchers.current === 0 && translated !== 0 && settings.tapToClose) {
                            utils.dispatchEvent('close');
                            utils.events.prevent(e);
                            action.translate.easeTo(0);
                            cache.isDragging = false;
                            cache.startDragX = 0;
                            return;
                        }

                        // Revealing Left
                        if (cache.simpleStates.opening === 'left') {
                            // Halfway, Flicking, or Too Far Out
                            if ((cache.simpleStates.halfway || cache.simpleStates.hyperExtending || cache.simpleStates.flick)) {
                                if (cache.simpleStates.flick && cache.simpleStates.towards === 'left') { // Flicking Closed
                                    action.translate.easeTo(0);
                                } else if (
                                    (cache.simpleStates.flick && cache.simpleStates.towards === 'right') || // Flicking Open OR
                                    (cache.simpleStates.halfway || cache.simpleStates.hyperExtending) // At least halfway open OR hyperextending
                                ) {
                                    action.translate.easeTo(settings.maxPosition); // Open Left
                                }
                            } else {
                                action.translate.easeTo(0); // Close Left
                            }
                            // Revealing Right
                        } else if (cache.simpleStates.opening === 'right') {
                            // Halfway, Flicking, or Too Far Out
                            if ((cache.simpleStates.halfway || cache.simpleStates.hyperExtending || cache.simpleStates.flick)) {
                                if (cache.simpleStates.flick && cache.simpleStates.towards === 'right') { // Flicking Closed
                                    action.translate.easeTo(0);
                                } else if (
                                    (cache.simpleStates.flick && cache.simpleStates.towards === 'left') || // Flicking Open OR
                                    (cache.simpleStates.halfway || cache.simpleStates.hyperExtending) // At least halfway open OR hyperextending
                                ) {
                                    action.translate.easeTo(settings.minPosition); // Open Right
                                }
                            } else {
                                action.translate.easeTo(0); // Close Right
                            }
                        }
                        cache.isDragging = false;
                        cache.startDragX = utils.page('X', e);
                    }
                }
            }
        },
        init = function(opts) {
            if (opts.element) {
                utils.deepExtend(settings, opts);
                cache.vendor = utils.vendor();
                action.drag.listen();
            }
        };
        /*
         * Public
         */
        this.open = function(side) {
            utils.dispatchEvent('open');
            utils.klass.remove(doc.body, 'snapjs-expand-left');
            utils.klass.remove(doc.body, 'snapjs-expand-right');

            if (side === 'left') {
                cache.simpleStates.opening = 'left';
                cache.simpleStates.towards = 'right';
                utils.klass.add(doc.body, 'snapjs-left');
                utils.klass.remove(doc.body, 'snapjs-right');
                action.translate.easeTo(settings.maxPosition);
            } else if (side === 'right') {
                cache.simpleStates.opening = 'right';
                cache.simpleStates.towards = 'left';
                utils.klass.remove(doc.body, 'snapjs-left');
                utils.klass.add(doc.body, 'snapjs-right');
                action.translate.easeTo(settings.minPosition);
            }
        };
        this.close = function() {
            utils.dispatchEvent('close');
            action.translate.easeTo(0);
        };
        this.expand = function(side){
            var to = win.innerWidth || doc.documentElement.clientWidth;

            if(side==='left'){
                utils.dispatchEvent('expandLeft');
                utils.klass.add(doc.body, 'snapjs-expand-left');
                utils.klass.remove(doc.body, 'snapjs-expand-right');
            } else {
                utils.dispatchEvent('expandRight');
                utils.klass.add(doc.body, 'snapjs-expand-right');
                utils.klass.remove(doc.body, 'snapjs-expand-left');
                to *= -1;
            }
            action.translate.easeTo(to);
        };

        this.on = function(evt, fn) {
            eventList[evt] = fn;
            return this;
        };
        this.off = function(evt) {
            if (eventList[evt]) {
                eventList[evt] = false;
            }
        };

        this.enable = function() {
            utils.dispatchEvent('enable');
            action.drag.listen();
        };
        this.disable = function() {
            utils.dispatchEvent('disable');
            action.drag.stopListening();
        };

        this.settings = function(opts){
            utils.deepExtend(settings, opts);
        };

        this.state = function() {
            var state,
                fromLeft = action.translate.get.matrix(4);
            if (fromLeft === settings.maxPosition) {
                state = 'left';
            } else if (fromLeft === settings.minPosition) {
                state = 'right';
            } else {
                state = 'closed';
            }
            return {
                state: state,
                info: cache.simpleStates
            };
        };
        init(userOpts);
    };
    if ((typeof module !== 'undefined') && module.exports) {
        module.exports = Snap;
    }
    if (typeof ender === 'undefined') {
        this.Snap = Snap;
    }
    if ((typeof define === "function") && define.amd) {
        define("snap", [], function() {
            return Snap;
        });
    }
}).call(this, window, document);
/**
 * @preserve FastClick: polyfill to remove click delays on browsers with touch UIs.
 *
 * @version 0.6.11
 * @codingstandard ftlabs-jsv2
 * @copyright The Financial Times Limited [All Rights Reserved]
 * @license MIT License (see LICENSE.txt)
 */

/*jslint browser:true, node:true*/
/*global define, Event, Node*/


/**
 * Instantiate fast-clicking listeners on the specificed layer.
 *
 * @constructor
 * @param {Element} layer The layer to listen on
 */
function FastClick(layer) {
        'use strict';
        var oldOnClick, self = this;


        /**
         * Whether a click is currently being tracked.
         *
         * @type boolean
         */
        this.trackingClick = false;


        /**
         * Timestamp for when when click tracking started.
         *
         * @type number
         */
        this.trackingClickStart = 0;


        /**
         * The element being tracked for a click.
         *
         * @type EventTarget
         */
        this.targetElement = null;


        /**
         * X-coordinate of touch start event.
         *
         * @type number
         */
        this.touchStartX = 0;


        /**
         * Y-coordinate of touch start event.
         *
         * @type number
         */
        this.touchStartY = 0;


        /**
         * ID of the last touch, retrieved from Touch.identifier.
         *
         * @type number
         */
        this.lastTouchIdentifier = 0;


        /**
         * Touchmove boundary, beyond which a click will be cancelled.
         *
         * @type number
         */
        this.touchBoundary = 10;


        /**
         * The FastClick layer.
         *
         * @type Element
         */
        this.layer = layer;

        if (!layer || !layer.nodeType) {
                throw new TypeError('Layer must be a document node');
        }

        /** @type function() */
        this.onClick = function() { return FastClick.prototype.onClick.apply(self, arguments); };

        /** @type function() */
        this.onMouse = function() { return FastClick.prototype.onMouse.apply(self, arguments); };

        /** @type function() */
        this.onTouchStart = function() { return FastClick.prototype.onTouchStart.apply(self, arguments); };

        /** @type function() */
        this.onTouchMove = function() { return FastClick.prototype.onTouchMove.apply(self, arguments); };

        /** @type function() */
        this.onTouchEnd = function() { return FastClick.prototype.onTouchEnd.apply(self, arguments); };

        /** @type function() */
        this.onTouchCancel = function() { return FastClick.prototype.onTouchCancel.apply(self, arguments); };

        if (FastClick.notNeeded(layer)) {
                return;
        }

        // Set up event handlers as required
        if (this.deviceIsAndroid) {
                layer.addEventListener('mouseover', this.onMouse, true);
                layer.addEventListener('mousedown', this.onMouse, true);
                layer.addEventListener('mouseup', this.onMouse, true);
        }

        layer.addEventListener('click', this.onClick, true);
        layer.addEventListener('touchstart', this.onTouchStart, false);
        layer.addEventListener('touchmove', this.onTouchMove, false);
        layer.addEventListener('touchend', this.onTouchEnd, false);
        layer.addEventListener('touchcancel', this.onTouchCancel, false);

        // Hack is required for browsers that don't support Event#stopImmediatePropagation (e.g. Android 2)
        // which is how FastClick normally stops click events bubbling to callbacks registered on the FastClick
        // layer when they are cancelled.
        if (!Event.prototype.stopImmediatePropagation) {
                layer.removeEventListener = function(type, callback, capture) {
                        var rmv = Node.prototype.removeEventListener;
                        if (type === 'click') {
                                rmv.call(layer, type, callback.hijacked || callback, capture);
                        } else {
                                rmv.call(layer, type, callback, capture);
                        }
                };

                layer.addEventListener = function(type, callback, capture) {
                        var adv = Node.prototype.addEventListener;
                        if (type === 'click') {
                                adv.call(layer, type, callback.hijacked || (callback.hijacked = function(event) {
                                        if (!event.propagationStopped) {
                                                callback(event);
                                        }
                                }), capture);
                        } else {
                                adv.call(layer, type, callback, capture);
                        }
                };
        }

        // If a handler is already declared in the element's onclick attribute, it will be fired before
        // FastClick's onClick handler. Fix this by pulling out the user-defined handler function and
        // adding it as listener.
        if (typeof layer.onclick === 'function') {

                // Android browser on at least 3.2 requires a new reference to the function in layer.onclick
                // - the old one won't work if passed to addEventListener directly.
                oldOnClick = layer.onclick;
                layer.addEventListener('click', function(event) {
                        oldOnClick(event);
                }, false);
                layer.onclick = null;
        }
}


/**
 * Android requires exceptions.
 *
 * @type boolean
 */
FastClick.prototype.deviceIsAndroid = navigator.userAgent.indexOf('Android') > 0;


/**
 * iOS requires exceptions.
 *
 * @type boolean
 */
FastClick.prototype.deviceIsIOS = /iP(ad|hone|od)/.test(navigator.userAgent);


/**
 * iOS 4 requires an exception for select elements.
 *
 * @type boolean
 */
FastClick.prototype.deviceIsIOS4 = FastClick.prototype.deviceIsIOS && (/OS 4_\d(_\d)?/).test(navigator.userAgent);


/**
 * iOS 6.0(+?) requires the target element to be manually derived
 *
 * @type boolean
 */
FastClick.prototype.deviceIsIOSWithBadTarget = FastClick.prototype.deviceIsIOS && (/OS ([6-9]|\d{2})_\d/).test(navigator.userAgent);


/**
 * Determine whether a given element requires a native click.
 *
 * @param {EventTarget|Element} target Target DOM element
 * @returns {boolean} Returns true if the element needs a native click
 */
FastClick.prototype.needsClick = function(target) {
        'use strict';
        switch (target.nodeName.toLowerCase()) {

        // Don't send a synthetic click to disabled inputs (issue #62)
        case 'button':
        case 'select':
        case 'textarea':
                if (target.disabled) {
                        return true;
                }

                break;
        case 'input':

                // File inputs need real clicks on iOS 6 due to a browser bug (issue #68)
                if ((this.deviceIsIOS && target.type === 'file') || target.disabled) {
                        return true;
                }

                break;
        case 'label':
        case 'video':
                return true;
        }

        return (/\bneedsclick\b/).test(target.className);
};


/**
 * Determine whether a given element requires a call to focus to simulate click into element.
 *
 * @param {EventTarget|Element} target Target DOM element
 * @returns {boolean} Returns true if the element requires a call to focus to simulate native click.
 */
FastClick.prototype.needsFocus = function(target) {
        'use strict';
        switch (target.nodeName.toLowerCase()) {
        case 'textarea':
                return true;
        case 'select':
                return !this.deviceIsAndroid;
        case 'input':
                switch (target.type) {
                case 'button':
                case 'checkbox':
                case 'file':
                case 'image':
                case 'radio':
                case 'submit':
                        return false;
                }

                // No point in attempting to focus disabled inputs
                return !target.disabled && !target.readOnly;
        default:
                return (/\bneedsfocus\b/).test(target.className);
        }
};


/**
 * Send a click event to the specified element.
 *
 * @param {EventTarget|Element} targetElement
 * @param {Event} event
 */
FastClick.prototype.sendClick = function(targetElement, event) {
        'use strict';
        var clickEvent, touch;

        // On some Android devices activeElement needs to be blurred otherwise the synthetic click will have no effect (#24)
        if (document.activeElement && document.activeElement !== targetElement) {
                document.activeElement.blur();
        }

        touch = event.changedTouches[0];

        // Synthesise a click event, with an extra attribute so it can be tracked
        clickEvent = document.createEvent('MouseEvents');
        clickEvent.initMouseEvent(this.determineEventType(targetElement), true, true, window, 1, touch.screenX, touch.screenY, touch.clientX, touch.clientY, false, false, false, false, 0, null);
        clickEvent.forwardedTouchEvent = true;
        targetElement.dispatchEvent(clickEvent);
};

FastClick.prototype.determineEventType = function(targetElement) {
        'use strict';

        //Issue #159: Android Chrome Select Box does not open with a synthetic click event
        if (this.deviceIsAndroid && targetElement.tagName.toLowerCase() === 'select') {
                return 'mousedown';
        }

        return 'click';
};


/**
 * @param {EventTarget|Element} targetElement
 */
FastClick.prototype.focus = function(targetElement) {
        'use strict';
        var length;

        // Issue #160: on iOS 7, some input elements (e.g. date datetime) throw a vague TypeError on setSelectionRange. These elements don't have an integer value for the selectionStart and selectionEnd properties, but unfortunately that can't be used for detection because accessing the properties also throws a TypeError. Just check the type instead. Filed as Apple bug #15122724.
        if (this.deviceIsIOS && targetElement.setSelectionRange && targetElement.type.indexOf('date') !== 0 && targetElement.type !== 'time') {
                length = targetElement.value.length;
                targetElement.setSelectionRange(length, length);
        } else {
                targetElement.focus();
        }
};


/**
 * Check whether the given target element is a child of a scrollable layer and if so, set a flag on it.
 *
 * @param {EventTarget|Element} targetElement
 */
FastClick.prototype.updateScrollParent = function(targetElement) {
        'use strict';
        var scrollParent, parentElement;

        scrollParent = targetElement.fastClickScrollParent;

        // Attempt to discover whether the target element is contained within a scrollable layer. Re-check if the
        // target element was moved to another parent.
        if (!scrollParent || !scrollParent.contains(targetElement)) {
                parentElement = targetElement;
                do {
                        if (parentElement.scrollHeight > parentElement.offsetHeight) {
                                scrollParent = parentElement;
                                targetElement.fastClickScrollParent = parentElement;
                                break;
                        }

                        parentElement = parentElement.parentElement;
                } while (parentElement);
        }

        // Always update the scroll top tracker if possible.
        if (scrollParent) {
                scrollParent.fastClickLastScrollTop = scrollParent.scrollTop;
        }
};


/**
 * @param {EventTarget} targetElement
 * @returns {Element|EventTarget}
 */
FastClick.prototype.getTargetElementFromEventTarget = function(eventTarget) {
        'use strict';

        // On some older browsers (notably Safari on iOS 4.1 - see issue #56) the event target may be a text node.
        if (eventTarget.nodeType === Node.TEXT_NODE) {
                return eventTarget.parentNode;
        }

        return eventTarget;
};


/**
 * On touch start, record the position and scroll offset.
 *
 * @param {Event} event
 * @returns {boolean}
 */
FastClick.prototype.onTouchStart = function(event) {
        'use strict';
        var targetElement, touch, selection;

        // Ignore multiple touches, otherwise pinch-to-zoom is prevented if both fingers are on the FastClick element (issue #111).
        if (event.targetTouches.length > 1) {
                return true;
        }

        targetElement = this.getTargetElementFromEventTarget(event.target);
        touch = event.targetTouches[0];

        if (this.deviceIsIOS) {

                // Only trusted events will deselect text on iOS (issue #49)
                selection = window.getSelection();
                if (selection.rangeCount && !selection.isCollapsed) {
                        return true;
                }

                if (!this.deviceIsIOS4) {

                        // Weird things happen on iOS when an alert or confirm dialog is opened from a click event callback (issue #23):
                        // when the user next taps anywhere else on the page, new touchstart and touchend events are dispatched
                        // with the same identifier as the touch event that previously triggered the click that triggered the alert.
                        // Sadly, there is an issue on iOS 4 that causes some normal touch events to have the same identifier as an
                        // immediately preceeding touch event (issue #52), so this fix is unavailable on that platform.
                        if (touch.identifier === this.lastTouchIdentifier) {
                                event.preventDefault();
                                return false;
                        }

                        this.lastTouchIdentifier = touch.identifier;

                        // If the target element is a child of a scrollable layer (using -webkit-overflow-scrolling: touch) and:
                        // 1) the user does a fling scroll on the scrollable layer
                        // 2) the user stops the fling scroll with another tap
                        // then the event.target of the last 'touchend' event will be the element that was under the user's finger
                        // when the fling scroll was started, causing FastClick to send a click event to that layer - unless a check
                        // is made to ensure that a parent layer was not scrolled before sending a synthetic click (issue #42).
                        this.updateScrollParent(targetElement);
                }
        }

        this.trackingClick = true;
        this.trackingClickStart = event.timeStamp;
        this.targetElement = targetElement;

        this.touchStartX = touch.pageX;
        this.touchStartY = touch.pageY;

        // Prevent phantom clicks on fast double-tap (issue #36)
        if ((event.timeStamp - this.lastClickTime) < 200) {
                event.preventDefault();
        }

        return true;
};


/**
 * Based on a touchmove event object, check whether the touch has moved past a boundary since it started.
 *
 * @param {Event} event
 * @returns {boolean}
 */
FastClick.prototype.touchHasMoved = function(event) {
        'use strict';
        var touch = event.changedTouches[0], boundary = this.touchBoundary;

        if (Math.abs(touch.pageX - this.touchStartX) > boundary || Math.abs(touch.pageY - this.touchStartY) > boundary) {
                return true;
        }

        return false;
};


/**
 * Update the last position.
 *
 * @param {Event} event
 * @returns {boolean}
 */
FastClick.prototype.onTouchMove = function(event) {
        'use strict';
        if (!this.trackingClick) {
                return true;
        }

        // If the touch has moved, cancel the click tracking
        if (this.targetElement !== this.getTargetElementFromEventTarget(event.target) || this.touchHasMoved(event)) {
                this.trackingClick = false;
                this.targetElement = null;
        }

        return true;
};


/**
 * Attempt to find the labelled control for the given label element.
 *
 * @param {EventTarget|HTMLLabelElement} labelElement
 * @returns {Element|null}
 */
FastClick.prototype.findControl = function(labelElement) {
        'use strict';

        // Fast path for newer browsers supporting the HTML5 control attribute
        if (labelElement.control !== undefined) {
                return labelElement.control;
        }

        // All browsers under test that support touch events also support the HTML5 htmlFor attribute
        if (labelElement.htmlFor) {
                return document.getElementById(labelElement.htmlFor);
        }

        // If no for attribute exists, attempt to retrieve the first labellable descendant element
        // the list of which is defined here: http://www.w3.org/TR/html5/forms.html#category-label
        return labelElement.querySelector('button, input:not([type=hidden]), keygen, meter, output, progress, select, textarea');
};


/**
 * On touch end, determine whether to send a click event at once.
 *
 * @param {Event} event
 * @returns {boolean}
 */
FastClick.prototype.onTouchEnd = function(event) {
        'use strict';
        var forElement, trackingClickStart, targetTagName, scrollParent, touch, targetElement = this.targetElement;

        if (!this.trackingClick) {
                return true;
        }

        // Prevent phantom clicks on fast double-tap (issue #36)
        if ((event.timeStamp - this.lastClickTime) < 200) {
                this.cancelNextClick = true;
                return true;
        }

        // Reset to prevent wrong click cancel on input (issue #156).
        this.cancelNextClick = false;

        this.lastClickTime = event.timeStamp;

        trackingClickStart = this.trackingClickStart;
        this.trackingClick = false;
        this.trackingClickStart = 0;

        // On some iOS devices, the targetElement supplied with the event is invalid if the layer
        // is performing a transition or scroll, and has to be re-detected manually. Note that
        // for this to function correctly, it must be called *after* the event target is checked!
        // See issue #57; also filed as rdar://13048589 .
        if (this.deviceIsIOSWithBadTarget) {
                touch = event.changedTouches[0];

                // In certain cases arguments of elementFromPoint can be negative, so prevent setting targetElement to null
                targetElement = document.elementFromPoint(touch.pageX - window.pageXOffset, touch.pageY - window.pageYOffset) || targetElement;
                targetElement.fastClickScrollParent = this.targetElement.fastClickScrollParent;
        }

        targetTagName = targetElement.tagName.toLowerCase();
        if (targetTagName === 'label') {
                forElement = this.findControl(targetElement);
                if (forElement) {
                        this.focus(targetElement);
                        if (this.deviceIsAndroid) {
                                return false;
                        }

                        targetElement = forElement;
                }
        } else if (this.needsFocus(targetElement)) {

                // Case 1: If the touch started a while ago (best guess is 100ms based on tests for issue #36) then focus will be triggered anyway. Return early and unset the target element reference so that the subsequent click will be allowed through.
                // Case 2: Without this exception for input elements tapped when the document is contained in an iframe, then any inputted text won't be visible even though the value attribute is updated as the user types (issue #37).
                if ((event.timeStamp - trackingClickStart) > 100 || (this.deviceIsIOS && window.top !== window && targetTagName === 'input')) {
                        this.targetElement = null;
                        return false;
                }

                this.focus(targetElement);

                // Select elements need the event to go through on iOS 4, otherwise the selector menu won't open.
                if (!this.deviceIsIOS4 || targetTagName !== 'select') {
                        this.targetElement = null;
                        event.preventDefault();
                }

                return false;
        }

        if (this.deviceIsIOS && !this.deviceIsIOS4) {

                // Don't send a synthetic click event if the target element is contained within a parent layer that was scrolled
                // and this tap is being used to stop the scrolling (usually initiated by a fling - issue #42).
                scrollParent = targetElement.fastClickScrollParent;
                if (scrollParent && scrollParent.fastClickLastScrollTop !== scrollParent.scrollTop) {
                        return true;
                }
        }

        // Prevent the actual click from going though - unless the target node is marked as requiring
        // real clicks or if it is in the whitelist in which case only non-programmatic clicks are permitted.
        if (!this.needsClick(targetElement)) {
                event.preventDefault();
                this.sendClick(targetElement, event);
        }

        return false;
};


/**
 * On touch cancel, stop tracking the click.
 *
 * @returns {void}
 */
FastClick.prototype.onTouchCancel = function() {
        'use strict';
        this.trackingClick = false;
        this.targetElement = null;
};


/**
 * Determine mouse events which should be permitted.
 *
 * @param {Event} event
 * @returns {boolean}
 */
FastClick.prototype.onMouse = function(event) {
        'use strict';

        // If a target element was never set (because a touch event was never fired) allow the event
        if (!this.targetElement) {
                return true;
        }

        if (event.forwardedTouchEvent) {
                return true;
        }

        // Programmatically generated events targeting a specific element should be permitted
        if (!event.cancelable) {
                return true;
        }

        // Derive and check the target element to see whether the mouse event needs to be permitted;
        // unless explicitly enabled, prevent non-touch click events from triggering actions,
        // to prevent ghost/doubleclicks.
        if (!this.needsClick(this.targetElement) || this.cancelNextClick) {

                // Prevent any user-added listeners declared on FastClick element from being fired.
                if (event.stopImmediatePropagation) {
                        event.stopImmediatePropagation();
                } else {

                        // Part of the hack for browsers that don't support Event#stopImmediatePropagation (e.g. Android 2)
                        event.propagationStopped = true;
                }

                // Cancel the event
                event.stopPropagation();
                event.preventDefault();

                return false;
        }

        // If the mouse event is permitted, return true for the action to go through.
        return true;
};


/**
 * On actual clicks, determine whether this is a touch-generated click, a click action occurring
 * naturally after a delay after a touch (which needs to be cancelled to avoid duplication), or
 * an actual click which should be permitted.
 *
 * @param {Event} event
 * @returns {boolean}
 */
FastClick.prototype.onClick = function(event) {
        'use strict';
        var permitted;

        // It's possible for another FastClick-like library delivered with third-party code to fire a click event before FastClick does (issue #44). In that case, set the click-tracking flag back to false and return early. This will cause onTouchEnd to return early.
        if (this.trackingClick) {
                this.targetElement = null;
                this.trackingClick = false;
                return true;
        }

        // Very odd behaviour on iOS (issue #18): if a submit element is present inside a form and the user hits enter in the iOS simulator or clicks the Go button on the pop-up OS keyboard the a kind of 'fake' click event will be triggered with the submit-type input element as the target.
        if (event.target.type === 'submit' && event.detail === 0) {
                return true;
        }

        permitted = this.onMouse(event);

        // Only unset targetElement if the click is not permitted. This will ensure that the check for !targetElement in onMouse fails and the browser's click doesn't go through.
        if (!permitted) {
                this.targetElement = null;
        }

        // If clicks are permitted, return true for the action to go through.
        return permitted;
};


/**
 * Remove all FastClick's event listeners.
 *
 * @returns {void}
 */
FastClick.prototype.destroy = function() {
        'use strict';
        var layer = this.layer;

        if (this.deviceIsAndroid) {
                layer.removeEventListener('mouseover', this.onMouse, true);
                layer.removeEventListener('mousedown', this.onMouse, true);
                layer.removeEventListener('mouseup', this.onMouse, true);
        }

        layer.removeEventListener('click', this.onClick, true);
        layer.removeEventListener('touchstart', this.onTouchStart, false);
        layer.removeEventListener('touchmove', this.onTouchMove, false);
        layer.removeEventListener('touchend', this.onTouchEnd, false);
        layer.removeEventListener('touchcancel', this.onTouchCancel, false);
};


/**
 * Check whether FastClick is needed.
 *
 * @param {Element} layer The layer to listen on
 */
FastClick.notNeeded = function(layer) {
        'use strict';
        var metaViewport;
        var chromeVersion;

        // Devices that don't support touch don't need FastClick
        if (typeof window.ontouchstart === 'undefined') {
                return true;
        }

        // Chrome version - zero for other browsers
        chromeVersion = +(/Chrome\/([0-9]+)/.exec(navigator.userAgent) || [,0])[1];

        if (chromeVersion) {

                if (FastClick.prototype.deviceIsAndroid) {
                        metaViewport = document.querySelector('meta[name=viewport]');
                        
                        if (metaViewport) {
                                // Chrome on Android with user-scalable="no" doesn't need FastClick (issue #89)
                                if (metaViewport.content.indexOf('user-scalable=no') !== -1) {
                                        return true;
                                }
                                // Chrome 32 and above with width=device-width or less don't need FastClick
                                if (chromeVersion > 31 && window.innerWidth <= window.screen.width) {
                                        return true;
                                }
                        }

                // Chrome desktop doesn't need FastClick (issue #15)
                } else {
                        return true;
                }
        }

        // IE10 with -ms-touch-action: none, which disables double-tap-to-zoom (issue #97)
        if (layer.style.msTouchAction === 'none') {
                return true;
        }

        return false;
};


/**
 * Factory method for creating a FastClick object
 *
 * @param {Element} layer The layer to listen on
 */
FastClick.attach = function(layer) {
        'use strict';
        return new FastClick(layer);
};


if (typeof define !== 'undefined' && define.amd) {

        // AMD. Register as an anonymous module.
        define(function() {
                'use strict';
                return FastClick;
        });
} else if (typeof module !== 'undefined' && module.exports) {
        module.exports = FastClick.attach;
        module.exports.FastClick = FastClick;
} else {
        window.FastClick = FastClick;
}
/*! http://mths.be/placeholder v2.0.7 by @mathias */
;(function(window, document, $) {

	// Opera Mini v7 doesn’t support placeholder although its DOM seems to indicate so
	var isOperaMini = Object.prototype.toString.call(window.operamini) == '[object OperaMini]';
	var isInputSupported = 'placeholder' in document.createElement('input') && !isOperaMini;
	var isTextareaSupported = 'placeholder' in document.createElement('textarea') && !isOperaMini;
	var prototype = $.fn;
	var valHooks = $.valHooks;
	var propHooks = $.propHooks;
	var hooks;
	var placeholder;

	if (isInputSupported && isTextareaSupported) {

		placeholder = prototype.placeholder = function() {
			return this;
		};

		placeholder.input = placeholder.textarea = true;

	} else {

		placeholder = prototype.placeholder = function() {
			var $this = this;
			$this
				.filter((isInputSupported ? 'textarea' : ':input') + '[placeholder]')
				.not('.placeholder')
				.bind({
					'focus.placeholder': clearPlaceholder,
					'blur.placeholder': setPlaceholder
				})
				.data('placeholder-enabled', true)
				.trigger('blur.placeholder');
			return $this;
		};

		placeholder.input = isInputSupported;
		placeholder.textarea = isTextareaSupported;

		hooks = {
			'get': function(element) {
				var $element = $(element);

				var $passwordInput = $element.data('placeholder-password');
				if ($passwordInput) {
					return $passwordInput[0].value;
				}

				return $element.data('placeholder-enabled') && $element.hasClass('placeholder') ? '' : element.value;
			},
			'set': function(element, value) {
				var $element = $(element);

				var $passwordInput = $element.data('placeholder-password');
				if ($passwordInput) {
					return $passwordInput[0].value = value;
				}

				if (!$element.data('placeholder-enabled')) {
					return element.value = value;
				}
				if (value == '') {
					element.value = value;
					// Issue #56: Setting the placeholder causes problems if the element continues to have focus.
					if (element != safeActiveElement()) {
						// We can't use `triggerHandler` here because of dummy text/password inputs :(
						setPlaceholder.call(element);
					}
				} else if ($element.hasClass('placeholder')) {
					clearPlaceholder.call(element, true, value) || (element.value = value);
				} else {
					element.value = value;
				}
				// `set` can not return `undefined`; see http://jsapi.info/jquery/1.7.1/val#L2363
				return $element;
			}
		};

		if (!isInputSupported) {
			valHooks.input = hooks;
			propHooks.value = hooks;
		}
		if (!isTextareaSupported) {
			valHooks.textarea = hooks;
			propHooks.value = hooks;
		}

		$(function() {
			// Look for forms
			$(document).delegate('form', 'submit.placeholder', function() {
				// Clear the placeholder values so they don't get submitted
				var $inputs = $('.placeholder', this).each(clearPlaceholder);
				setTimeout(function() {
					$inputs.each(setPlaceholder);
				}, 10);
			});
		});

		// Clear placeholder values upon page reload
		$(window).bind('beforeunload.placeholder', function() {
			$('.placeholder').each(function() {
				this.value = '';
			});
		});

	}

	function args(elem) {
		// Return an object of element attributes
		var newAttrs = {};
		var rinlinejQuery = /^jQuery\d+$/;
		$.each(elem.attributes, function(i, attr) {
			if (attr.specified && !rinlinejQuery.test(attr.name)) {
				newAttrs[attr.name] = attr.value;
			}
		});
		return newAttrs;
	}

	function clearPlaceholder(event, value) {
		var input = this;
		var $input = $(input);
		if (input.value == $input.attr('placeholder') && $input.hasClass('placeholder')) {
			if ($input.data('placeholder-password')) {
				$input = $input.hide().next().show().attr('id', $input.removeAttr('id').data('placeholder-id'));
				// If `clearPlaceholder` was called from `$.valHooks.input.set`
				if (event === true) {
					return $input[0].value = value;
				}
				$input.focus();
			} else {
				input.value = '';
				$input.removeClass('placeholder');
				input == safeActiveElement() && input.select();
			}
		}
	}

	function setPlaceholder() {
		var $replacement;
		var input = this;
		var $input = $(input);
		var id = this.id;
		if (input.value == '') {
			if (input.type == 'password') {
				if (!$input.data('placeholder-textinput')) {
					try {
						$replacement = $input.clone().attr({ 'type': 'text' });
					} catch(e) {
						$replacement = $('<input>').attr($.extend(args(this), { 'type': 'text' }));
					}
					$replacement
						.removeAttr('name')
						.data({
							'placeholder-password': $input,
							'placeholder-id': id
						})
						.bind('focus.placeholder', clearPlaceholder);
					$input
						.data({
							'placeholder-textinput': $replacement,
							'placeholder-id': id
						})
						.before($replacement);
				}
				$input = $input.removeAttr('id').hide().prev().attr('id', id).show();
				// Note: `$input[0] != input` now!
			}
			$input.addClass('placeholder');
			$input[0].value = $input.attr('placeholder');
		} else {
			$input.removeClass('placeholder');
		}
	}

	function safeActiveElement() {
		// Avoid IE9 `document.activeElement` of death
		// https://github.com/mathiasbynens/jquery-placeholder/pull/99
		try {
			return document.activeElement;
		} catch (err) {}
	}

}(this, document, jQuery));
/*!
 * Paper.js v0.9.18 - The Swiss Army Knife of Vector Graphics Scripting.
 * http://paperjs.org/
 *
 * Copyright (c) 2011 - 2014, Juerg Lehni & Jonathan Puckey
 * http://scratchdisk.com/ & http://jonathanpuckey.com/
 *
 * Distributed under the MIT license. See LICENSE file for details.
 *
 * All rights reserved.
 *
 * Date: Mon Apr 7 11:24:38 2014 +0200
 *
 ***
 *
 * Straps.js - Class inheritance library with support for bean-style accessors
 *
 * Copyright (c) 2006 - 2013 Juerg Lehni
 * http://scratchdisk.com/
 *
 * Distributed under the MIT license.
 *
 ***
 *
 * Acorn.js
 * http://marijnhaverbeke.nl/acorn/
 *
 * Acorn is a tiny, fast JavaScript parser written in JavaScript,
 * created by Marijn Haverbeke and released under an MIT license.
 *
 */
var paper=new function(t){var e=new function(){function n(t,n,i,r,a){function o(s,o){o=o||(o=u(n,s))&&(o.get?o:o.value),"string"==typeof o&&"#"===o[0]&&(o=t[o.substring(1)]||o);var l,d="function"==typeof o,f=o,_=a||d?o&&o.get?s in t:t[s]:null;a&&_||(d&&_&&(o.base=_),d&&r!==!1&&(l=s.match(/^([gs]et|is)(([A-Z])(.*))$/))&&(h[l[3].toLowerCase()+l[4]]=l[2]),f&&!d&&f.get&&"function"==typeof f.get&&e.isPlainObject(f)||(f={value:f,writable:!0}),(u(t,s)||{configurable:!0}).configurable&&(f.configurable=!0,f.enumerable=i),c(t,s,f))}var h={};if(n){for(var l in n)n.hasOwnProperty(l)&&!s.test(l)&&o(l);for(var l in h){var d=h[l],f=t["set"+d],_=t["get"+d]||f&&t["is"+d];!_||r!==!0&&0!==_.length||o(l,{get:_,set:f})}}return t}function i(t,e,n){return t&&("length"in t&&!t.getLength&&"number"==typeof t.length?a:o).call(t,e,n=n||t),n}function r(t,e){for(var n in e)e.hasOwnProperty(n)&&(t[n]=e[n]);return t}var s=/^(statics|enumerable|beans|preserve)$/,a=[].forEach||function(t,e){for(var n=0,i=this.length;i>n;n++)t.call(e,this[n],n,this)},o=function(t,e){for(var n in this)this.hasOwnProperty(n)&&t.call(e,this[n],n,this)},h=Object.create||function(t){return{__proto__:t}},u=Object.getOwnPropertyDescriptor||function(t,e){var n=t.__lookupGetter__&&t.__lookupGetter__(e);return n?{get:n,set:t.__lookupSetter__(e),enumerable:!0,configurable:!0}:t.hasOwnProperty(e)?{value:t[e],enumerable:!0,configurable:!0,writable:!0}:null},l=Object.defineProperty||function(t,e,n){return(n.get||n.set)&&t.__defineGetter__?(n.get&&t.__defineGetter__(e,n.get),n.set&&t.__defineSetter__(e,n.set)):t[e]=n.value,t},c=function(t,e,n){return delete t[e],l(t,e,n)};return n(function(){for(var t=0,e=arguments.length;e>t;t++)r(this,arguments[t])},{inject:function(t){if(t){var e=t.statics===!0?t:t.statics,i=t.beans,r=t.preserve;e!==t&&n(this.prototype,t,t.enumerable,i,r),n(this,e,!0,i,r)}for(var s=1,a=arguments.length;a>s;s++)this.inject(arguments[s]);return this},extend:function(){for(var t,e=this,i=0,r=arguments.length;r>i&&!(t=arguments[i].initialize);i++);return t=t||function(){e.apply(this,arguments)},t.prototype=h(this.prototype),t.base=e,c(t.prototype,"constructor",{value:t,writable:!0,configurable:!0}),n(t,this,!0),arguments.length?this.inject.apply(t,arguments):t}},!0).inject({inject:function(){for(var t=0,e=arguments.length;e>t;t++){var i=arguments[t];i&&n(this,i,i.enumerable,i.beans,i.preserve)}return this},extend:function(){var t=h(this);return t.inject.apply(t,arguments)},each:function(t,e){return i(this,t,e)},clone:function(){return new this.constructor(this)},statics:{each:i,create:h,define:c,describe:u,set:r,clone:function(t){return r(new t.constructor,t)},isPlainObject:function(t){var n=null!=t&&t.constructor;return n&&(n===Object||n===e||"Object"===n.name)},pick:function(){for(var e=0,n=arguments.length;n>e;e++)if(arguments[e]!==t)return arguments[e]}}})};"undefined"!=typeof module&&(module.exports=e),Array.isArray||(Array.isArray=function(t){return"[object Array]"===Object.prototype.toString.call(t)}),document.head||(document.head=document.getElementsByTagName("head")[0]),e.inject({toString:function(){return null!=this._id?(this._class||"Object")+(this._name?" '"+this._name+"'":" @"+this._id):"{ "+e.each(this,function(t,e){if(!/^_/.test(e)){var n=typeof t;this.push(e+": "+("number"===n?a.instance.number(t):"string"===n?"'"+t+"'":t))}},[]).join(", ")+" }"},exportJSON:function(t){return e.exportJSON(this,t)},toJSON:function(){return e.serialize(this)},_set:function(n,i){if(n&&e.isPlainObject(n)){var r=n._filtering||n;for(var s in r)if(s in this&&r.hasOwnProperty(s)&&(!i||!i[s])){var a=n[s];a!==t&&(this[s]=a)}return!0}},statics:{exports:{enumerable:!0},extend:function ie(){var t=ie.base.apply(this,arguments),n=t.prototype._class;return n&&!e.exports[n]&&(e.exports[n]=t),t},equals:function(t,n){function i(t,e){for(var n in t)if(t.hasOwnProperty(n)&&!e.hasOwnProperty(n))return!1;return!0}if(t===n)return!0;if(t&&t.equals)return t.equals(n);if(n&&n.equals)return n.equals(t);if(Array.isArray(t)&&Array.isArray(n)){if(t.length!==n.length)return!1;for(var r=0,s=t.length;s>r;r++)if(!e.equals(t[r],n[r]))return!1;return!0}if(t&&"object"==typeof t&&n&&"object"==typeof n){if(!i(t,n)||!i(n,t))return!1;for(var r in t)if(t.hasOwnProperty(r)&&!e.equals(t[r],n[r]))return!1;return!0}return!1},read:function(n,i,r,s){if(this===e){var a=this.peek(n,i);return n.__index++,a}var o=this.prototype,h=o._readIndex,u=i||h&&n.__index||0;s||(s=n.length-u);var l=n[u];return l instanceof this||r&&r.readNull&&null==l&&1>=s?(h&&(n.__index=u+1),l&&r&&r.clone?l.clone():l):(l=e.create(this.prototype),h&&(l.__read=!0),l=l.initialize.apply(l,u>0||s<n.length?Array.prototype.slice.call(n,u,u+s):n)||l,h&&(n.__index=u+l.__read,l.__read=t),l)},peek:function(t,e){return t[t.__index=e||t.__index||0]},remain:function(t){return t.length-(t.__index||0)},readAll:function(t,e,n){for(var i,r=[],s=e||0,a=t.length;a>s;s++)r.push(Array.isArray(i=t[s])?this.read(i,0,n):this.read(t,s,n,1));return r},readNamed:function(n,i,r,s,a){var o=this.getNamed(n,i),h=o!==t;if(h){var u=n._filtered;u||(u=n._filtered=e.create(n[0]),u._filtering=n[0]),u[i]=t}return this.read(h?[o]:n,r,s,a)},getNamed:function(n,i){var r=n[0];return n._hasObject===t&&(n._hasObject=1===n.length&&e.isPlainObject(r)),n._hasObject?i?r[i]:n._filtered||r:t},hasNamed:function(t,e){return!!this.getNamed(t,e)},isPlainValue:function(t){return this.isPlainObject(t)||Array.isArray(t)},serialize:function(t,n,i,r){n=n||{};var s,o=!r;if(o&&(n.formatter=new a(n.precision),r={length:0,definitions:{},references:{},add:function(t,e){var n="#"+t._id,i=this.references[n];if(!i){this.length++;var r=e.call(t),s=t._class;s&&r[0]!==s&&r.unshift(s),this.definitions[n]=r,i=this.references[n]=[n]}return i}}),t&&t._serialize){s=t._serialize(n,r);var h=t._class;!h||i||s._compact||s[0]===h||s.unshift(h)}else if(Array.isArray(t)){s=[];for(var u=0,l=t.length;l>u;u++)s[u]=e.serialize(t[u],n,i,r);i&&(s._compact=!0)}else if(e.isPlainObject(t)){s={};for(var u in t)t.hasOwnProperty(u)&&(s[u]=e.serialize(t[u],n,i,r))}else s="number"==typeof t?n.formatter.number(t,n.precision):t;return o&&r.length>0?[["dictionary",r.definitions],s]:s},deserialize:function(t,n,i){var r=t,s=!i;if(i=i||{},Array.isArray(t)){var a=t[0],o="dictionary"===a;if(!o){if(i.dictionary&&1==t.length&&/^#/.test(a))return i.dictionary[a];a=e.exports[a]}r=[];for(var h=a?1:0,u=t.length;u>h;h++)r.push(e.deserialize(t[h],n,i));if(o)i.dictionary=r[0];else if(a){var l=r;n?r=n(a,l,s):(r=e.create(a.prototype),a.apply(r,l))}}else if(e.isPlainObject(t)){r={};for(var c in t)r[c]=e.deserialize(t[c],n,i)}return r},exportJSON:function(t,n){var i=e.serialize(t,n);return n&&n.asString===!1?i:JSON.stringify(i)},importJSON:function(t,n){return e.deserialize("string"==typeof t?JSON.parse(t):t,function(t,i,r){var s=n&&n.constructor===t?n:e.create(t.prototype),a=s===n;if(!r&&1===i.length&&s instanceof y&&(!(s instanceof x)||a)){var o=i[0];e.isPlainObject(o)&&(o.insert=!1)}return t.apply(s,i),a&&(n=null),s})},splice:function(e,n,i,r){var s=n&&n.length,a=i===t;i=a?e.length:i,i>e.length&&(i=e.length);for(var o=0;s>o;o++)n[o]._index=i+o;if(a)return e.push.apply(e,n),[];var h=[i,r];n&&h.push.apply(h,n);for(var u=e.splice.apply(e,h),o=0,l=u.length;l>o;o++)u[o]._index=t;for(var o=i+s,l=e.length;l>o;o++)e[o]._index=o;return u},capitalize:function(t){return t.replace(/\b[a-z]/g,function(t){return t.toUpperCase()})},camelize:function(t){return t.replace(/-(.)/g,function(t,e){return e.toUpperCase()})},hyphenate:function(t){return t.replace(/([a-z])([A-Z])/g,"$1-$2").toLowerCase()}}});var n={attach:function(n,i){if("string"!=typeof n)return e.each(n,function(t,e){this.attach(e,t)},this),t;var r=this._eventTypes[n];if(r){var s=this._handlers=this._handlers||{};s=s[n]=s[n]||[],-1==s.indexOf(i)&&(s.push(i),r.install&&1==s.length&&r.install.call(this,n))}},detach:function(n,i){if("string"!=typeof n)return e.each(n,function(t,e){this.detach(e,t)},this),t;var r,s=this._eventTypes[n],a=this._handlers&&this._handlers[n];s&&a&&(!i||-1!=(r=a.indexOf(i))&&1==a.length?(s.uninstall&&s.uninstall.call(this,n),delete this._handlers[n]):-1!=r&&a.splice(r,1))},once:function(t,e){this.attach(t,function(){e.apply(this,arguments),this.detach(t,e)})},fire:function(t,e){var n=this._handlers&&this._handlers[t];if(!n)return!1;for(var i=[].slice.call(arguments,1),r=this,s=0,a=n.length;a>s;s++)if(n[s].apply(r,i)===!1&&e&&e.stop){e.stop();break}return!0},responds:function(t){return!(!this._handlers||!this._handlers[t])},on:"#attach",off:"#detach",trigger:"#fire",_installEvents:function(t){var e=this._handlers,n=t?"install":"uninstall";for(var i in e)if(e[i].length>0){var r=this._eventTypes[i],s=r[n];s&&s.call(this,i)}},statics:{inject:function re(){for(var t=0,n=arguments.length;n>t;t++){var i=arguments[t],r=i._events;if(r){var s={};e.each(r,function(t,n){var r="string"==typeof t,a=r?t:n,o=e.capitalize(a),h=a.substring(2).toLowerCase();s[h]=r?{}:t,a="_"+a,i["get"+o]=function(){return this[a]},i["set"+o]=function(t){var e=this[a];e&&this.detach(h,e),t&&this.attach(h,t),this[a]=t}}),i._eventTypes=s}re.base.call(this,i)}return this}}},r=e.extend({_class:"PaperScope",initialize:function se(t){if(paper=this,this.settings={applyMatrix:!0,handleSize:4,hitTolerance:0},this.project=null,this.projects=[],this.tools=[],this.palettes=[],this._id=t&&(t.getAttribute("id")||t.src)||"paperscope-"+se._id++,t&&t.setAttribute("id",this._id),se._scopes[this._id]=this,!this.support){var e=Q.getContext(1,1);se.prototype.support={nativeDash:"setLineDash"in e||"mozDash"in e,nativeBlendModes:te.nativeModes},Q.release(e)}},version:"0.9.18",getView:function(){return this.project&&this.project.getView()},getPaper:function(){return this},execute:function(t){paper.PaperScript.execute(t,this),Z.updateFocus()},install:function(t){var n=this;e.each(["project","view","tool"],function(i){e.define(t,i,{configurable:!0,get:function(){return n[i]}})});for(var i in this)!/^_/.test(i)&&this[i]&&(t[i]=this[i])},setup:function(t){return paper=this,this.project=new v(t),this},activate:function(){paper=this},clear:function(){for(var t=this.projects.length-1;t>=0;t--)this.projects[t].remove();for(var t=this.tools.length-1;t>=0;t--)this.tools[t].remove();for(var t=this.palettes.length-1;t>=0;t--)this.palettes[t].remove()},remove:function(){this.clear(),delete r._scopes[this._id]},statics:new function(){function t(t){return t+="Attribute",function(e,n){return e[t](n)||e[t]("data-paper-"+n)}}return{_scopes:{},_id:0,get:function(t){return t&&t.getAttribute&&(t=t.getAttribute("id")),this._scopes[t]||null},getAttribute:t("get"),hasAttribute:t("has")}}}),s=e.extend(n,{initialize:function(t){this._scope=paper,this._index=this._scope[this._list].push(this)-1,(t||!this._scope[this._reference])&&this.activate()},activate:function(){if(!this._scope)return!1;var t=this._scope[this._reference];return t&&t!==this&&t.fire("deactivate"),this._scope[this._reference]=this,this.fire("activate",t),!0},isActive:function(){return this._scope[this._reference]===this},remove:function(){return null==this._index?!1:(e.splice(this._scope[this._list],null,this._index,1),this._scope[this._reference]==this&&(this._scope[this._reference]=null),this._scope=null,!0)}}),a=e.extend({initialize:function(t){this.precision=t||5,this.multiplier=Math.pow(10,this.precision)},number:function(t){return Math.round(t*this.multiplier)/this.multiplier},point:function(t,e){return this.number(t.x)+(e||",")+this.number(t.y)},size:function(t,e){return this.number(t.width)+(e||",")+this.number(t.height)},rectangle:function(t,e){return this.point(t,e)+(e||",")+this.size(t,e)}});a.instance=new a;var o=new function(){function e(e,n,i){var r=n===t,s=n-c,a=i+c,o=0;return function(t){return(r||t>s&&a>t)&&(e[o++]=n>t?n:t>i?i:t),o}}var n=[[.5773502691896257],[0,.7745966692414834],[.33998104358485626,.8611363115940526],[0,.5384693101056831,.906179845938664],[.2386191860831969,.6612093864662645,.932469514203152],[0,.4058451513773972,.7415311855993945,.9491079123427585],[.1834346424956498,.525532409916329,.7966664774136267,.9602898564975363],[0,.3242534234038089,.6133714327005904,.8360311073266358,.9681602395076261],[.14887433898163122,.4333953941292472,.6794095682990244,.8650633666889845,.9739065285171717],[0,.26954315595234496,.5190961292068118,.7301520055740494,.8870625997680953,.978228658146057],[.1252334085114689,.3678314989981802,.5873179542866175,.7699026741943047,.9041172563704749,.9815606342467192],[0,.2304583159551348,.44849275103644687,.6423493394403402,.8015780907333099,.9175983992229779,.9841830547185881],[.10805494870734367,.31911236892788974,.5152486363581541,.6872929048116855,.827201315069765,.9284348836635735,.9862838086968123],[0,.20119409399743451,.3941513470775634,.5709721726085388,.7244177313601701,.8482065834104272,.937273392400706,.9879925180204854],[.09501250983763744,.2816035507792589,.45801677765722737,.6178762444026438,.755404408355003,.8656312023878318,.9445750230732326,.9894009349916499]],i=[[1],[.8888888888888888,.5555555555555556],[.6521451548625461,.34785484513745385],[.5688888888888889,.47862867049936647,.23692688505618908],[.46791393457269104,.3607615730481386,.17132449237917036],[.4179591836734694,.3818300505051189,.27970539148927664,.1294849661688697],[.362683783378362,.31370664587788727,.22238103445337448,.10122853629037626],[.3302393550012598,.31234707704000286,.26061069640293544,.1806481606948574,.08127438836157441],[.29552422471475287,.26926671930999635,.21908636251598204,.1494513491505806,.06667134430868814],[.2729250867779006,.26280454451024665,.23319376459199048,.18629021092773426,.1255803694649046,.05566856711617366],[.24914704581340277,.2334925365383548,.20316742672306592,.16007832854334622,.10693932599531843,.04717533638651183],[.2325515532308739,.22628318026289723,.2078160475368885,.17814598076194574,.13887351021978725,.09212149983772845,.04048400476531588],[.2152638534631578,.2051984637212956,.18553839747793782,.15720316715819355,.12151857068790319,.08015808715976021,.03511946033175186],[.2025782419255613,.19843148532711158,.1861610000155622,.16626920581699392,.13957067792615432,.10715922046717194,.07036604748810812,.03075324199611727],[.1894506104550685,.18260341504492358,.16915651939500254,.14959598881657674,.12462897125553388,.09515851168249279,.062253523938647894,.027152459411754096]],r=Math.abs,s=Math.sqrt,a=Math.pow,h=Math.cos,u=Math.PI,l=1e-5,c=1e-11;return{TOLERANCE:l,EPSILON:c,KAPPA:4*(s(2)-1)/3,isZero:function(t){return r(t)<=c},integrate:function(t,e,r,s){for(var a=n[s-2],o=i[s-2],h=.5*(r-e),u=h+e,l=0,c=s+1>>1,d=1&s?o[l++]*t(u):0;c>l;){var f=h*a[l];d+=o[l++]*(t(u+f)+t(u-f))}return h*d},findRoot:function(t,e,n,i,s,a,o){for(var h=0;a>h;h++){var u=t(n),l=u/e(n),c=n-l;if(r(l)<o)return c;u>0?(s=n,n=i>=c?.5*(i+s):c):(i=n,n=c>=s?.5*(i+s):c)}return n},solveQuadratic:function(t,n,i,a,o,h){var u=e(a,o,h);if(r(t)<c)return r(n)>=c?u(-i/n):r(i)<c?-1:0;var l=n/(2*t),d=i/t,f=l*l;if(d-c>f)return 0;var _=f>d?s(f-d):0,g=u(_-l);return _>0&&(g=u(-_-l)),g},solveCubic:function(t,n,i,l,d,f,_){if(r(t)<c)return o.solveQuadratic(n,i,l,d,f,_);n/=t,i/=t,l/=t;var g=e(d,f,_),p=n*n,v=(p-3*i)/9,m=(2*p*n-9*n*i+27*l)/54,y=v*v*v,w=m*m-y;if(n/=3,r(w)<c){if(r(m)<c)return g(-n);var x=s(v),b=m>0?1:-1;return g(2*-b*x-n),g(b*x-n)}if(0>w){var x=s(v),C=Math.acos(m/(x*x*x))/3,S=-2*x,P=2*u/3;return g(S*h(C)-n),g(S*h(C+P)-n),g(S*h(C-P)-n)}var k=(m>0?-1:1)*a(r(m)+s(w),1/3);return g(k+v/k-n)}}},h=e.extend({_class:"Point",_readIndex:!0,initialize:function(t,e){var n=typeof t;if("number"===n){var i="number"==typeof e;this.x=t,this.y=i?e:t,this.__read&&(this.__read=i?2:1)}else"undefined"===n||null===t?(this.x=this.y=0,this.__read&&(this.__read=null===t?1:0)):(Array.isArray(t)?(this.x=t[0],this.y=t.length>1?t[1]:t[0]):null!=t.x?(this.x=t.x,this.y=t.y):null!=t.width?(this.x=t.width,this.y=t.height):null!=t.angle?(this.x=t.length,this.y=0,this.setAngle(t.angle)):(this.x=this.y=0,this.__read&&(this.__read=0)),this.__read&&(this.__read=1))},set:function(t,e){return this.x=t,this.y=e,this},equals:function(t){return this===t||t&&(this.x===t.x&&this.y===t.y||Array.isArray(t)&&this.x===t[0]&&this.y===t[1])||!1},clone:function(){return new h(this.x,this.y)},toString:function(){var t=a.instance;return"{ x: "+t.number(this.x)+", y: "+t.number(this.y)+" }"},_serialize:function(t){var e=t.formatter;return[e.number(this.x),e.number(this.y)]},getLength:function(){return Math.sqrt(this.x*this.x+this.y*this.y)},setLength:function(t){if(this.isZero()){var e=this._angle||0;this.set(Math.cos(e)*t,Math.sin(e)*t)}else{var n=t/this.getLength();o.isZero(n)&&this.getAngle(),this.set(this.x*n,this.y*n)}},getAngle:function(){return 180*this.getAngleInRadians.apply(this,arguments)/Math.PI},setAngle:function(t){this.setAngleInRadians.call(this,t*Math.PI/180)},getAngleInDegrees:"#getAngle",setAngleInDegrees:"#setAngle",getAngleInRadians:function(){if(arguments.length){var t=h.read(arguments),e=this.getLength()*t.getLength();return o.isZero(e)?0/0:Math.acos(this.dot(t)/e)}return this.isZero()?this._angle||0:this._angle=Math.atan2(this.y,this.x)},setAngleInRadians:function(t){if(this._angle=t,!this.isZero()){var e=this.getLength();this.set(Math.cos(t)*e,Math.sin(t)*e)}},getQuadrant:function(){return this.x>=0?this.y>=0?1:4:this.y>=0?2:3}},{beans:!1,getDirectedAngle:function(){var t=h.read(arguments);return 180*Math.atan2(this.cross(t),this.dot(t))/Math.PI},getDistance:function(){var t=h.read(arguments),n=t.x-this.x,i=t.y-this.y,r=n*n+i*i,s=e.read(arguments);return s?r:Math.sqrt(r)},normalize:function(e){e===t&&(e=1);var n=this.getLength(),i=0!==n?e/n:0,r=new h(this.x*i,this.y*i);return i>=0&&(r._angle=this._angle),r},rotate:function(t,e){if(0===t)return this.clone();t=t*Math.PI/180;var n=e?this.subtract(e):this,i=Math.sin(t),r=Math.cos(t);return n=new h(n.x*r-n.y*i,n.x*i+n.y*r),e?n.add(e):n},transform:function(t){return t?t._transformPoint(this):this},add:function(){var t=h.read(arguments);return new h(this.x+t.x,this.y+t.y)},subtract:function(){var t=h.read(arguments);return new h(this.x-t.x,this.y-t.y)},multiply:function(){var t=h.read(arguments);return new h(this.x*t.x,this.y*t.y)},divide:function(){var t=h.read(arguments);return new h(this.x/t.x,this.y/t.y)},modulo:function(){var t=h.read(arguments);return new h(this.x%t.x,this.y%t.y)},negate:function(){return new h(-this.x,-this.y)},isInside:function(t){return t.contains(this)},isClose:function(t,e){return this.getDistance(t)<e},isColinear:function(t){return Math.abs(this.cross(t))<1e-5},isOrthogonal:function(t){return Math.abs(this.dot(t))<1e-5},isZero:function(){return o.isZero(this.x)&&o.isZero(this.y)},isNaN:function(){return isNaN(this.x)||isNaN(this.y)},dot:function(){var t=h.read(arguments);return this.x*t.x+this.y*t.y},cross:function(){var t=h.read(arguments);return this.x*t.y-this.y*t.x},project:function(){var t=h.read(arguments);if(t.isZero())return new h(0,0);var e=this.dot(t)/t.dot(t);return new h(t.x*e,t.y*e)},statics:{min:function(){var t=h.read(arguments),e=h.read(arguments);return new h(Math.min(t.x,e.x),Math.min(t.y,e.y))},max:function(){var t=h.read(arguments),e=h.read(arguments);return new h(Math.max(t.x,e.x),Math.max(t.y,e.y))},random:function(){return new h(Math.random(),Math.random())}}},e.each(["round","ceil","floor","abs"],function(t){var e=Math[t];this[t]=function(){return new h(e(this.x),e(this.y))}},{})),u=h.extend({initialize:function(t,e,n,i){this._x=t,this._y=e,this._owner=n,this._setter=i},set:function(t,e,n){return this._x=t,this._y=e,n||this._owner[this._setter](this),this},getX:function(){return this._x},setX:function(t){this._x=t,this._owner[this._setter](this)},getY:function(){return this._y},setY:function(t){this._y=t,this._owner[this._setter](this)}}),c=e.extend({_class:"Size",_readIndex:!0,initialize:function(t,e){var n=typeof t;if("number"===n){var i="number"==typeof e;this.width=t,this.height=i?e:t,this.__read&&(this.__read=i?2:1)}else"undefined"===n||null===t?(this.width=this.height=0,this.__read&&(this.__read=null===t?1:0)):(Array.isArray(t)?(this.width=t[0],this.height=t.length>1?t[1]:t[0]):null!=t.width?(this.width=t.width,this.height=t.height):null!=t.x?(this.width=t.x,this.height=t.y):(this.width=this.height=0,this.__read&&(this.__read=0)),this.__read&&(this.__read=1))},set:function(t,e){return this.width=t,this.height=e,this},equals:function(t){return t===this||t&&(this.width===t.width&&this.height===t.height||Array.isArray(t)&&this.width===t[0]&&this.height===t[1])||!1},clone:function(){return new c(this.width,this.height)},toString:function(){var t=a.instance;return"{ width: "+t.number(this.width)+", height: "+t.number(this.height)+" }"},_serialize:function(t){var e=t.formatter;return[e.number(this.width),e.number(this.height)]},add:function(){var t=c.read(arguments);return new c(this.width+t.width,this.height+t.height)},subtract:function(){var t=c.read(arguments);return new c(this.width-t.width,this.height-t.height)},multiply:function(){var t=c.read(arguments);return new c(this.width*t.width,this.height*t.height)},divide:function(){var t=c.read(arguments);return new c(this.width/t.width,this.height/t.height)},modulo:function(){var t=c.read(arguments);return new c(this.width%t.width,this.height%t.height)},negate:function(){return new c(-this.width,-this.height)},isZero:function(){return o.isZero(this.width)&&o.isZero(this.height)},isNaN:function(){return isNaN(this.width)||isNaN(this.height)},statics:{min:function(t,e){return new c(Math.min(t.width,e.width),Math.min(t.height,e.height))},max:function(t,e){return new c(Math.max(t.width,e.width),Math.max(t.height,e.height))},random:function(){return new c(Math.random(),Math.random())}}},e.each(["round","ceil","floor","abs"],function(t){var e=Math[t];this[t]=function(){return new c(e(this.width),e(this.height))}},{})),d=c.extend({initialize:function(t,e,n,i){this._width=t,this._height=e,this._owner=n,this._setter=i},set:function(t,e,n){return this._width=t,this._height=e,n||this._owner[this._setter](this),this},getWidth:function(){return this._width},setWidth:function(t){this._width=t,this._owner[this._setter](this)},getHeight:function(){return this._height},setHeight:function(t){this._height=t,this._owner[this._setter](this)}}),f=e.extend({_class:"Rectangle",_readIndex:!0,beans:!0,initialize:function(n,i,r,s){var a=typeof n,o=0;if("number"===a?(this.x=n,this.y=i,this.width=r,this.height=s,o=4):"undefined"===a||null===n?(this.x=this.y=this.width=this.height=0,o=null===n?1:0):1===arguments.length&&(Array.isArray(n)?(this.x=n[0],this.y=n[1],this.width=n[2],this.height=n[3],o=1):n.x!==t||n.width!==t?(this.x=n.x||0,this.y=n.y||0,this.width=n.width||0,this.height=n.height||0,o=1):n.from===t&&n.to===t&&(this.x=this.y=this.width=this.height=0,this._set(n),o=1)),!o){var u=h.readNamed(arguments,"from"),l=e.peek(arguments);if(this.x=u.x,this.y=u.y,l&&l.x!==t||e.hasNamed(arguments,"to")){var d=h.readNamed(arguments,"to");this.width=d.x-u.x,this.height=d.y-u.y,this.width<0&&(this.x=d.x,this.width=-this.width),this.height<0&&(this.y=d.y,this.height=-this.height)}else{var f=c.read(arguments);this.width=f.width,this.height=f.height}o=arguments.__index}this.__read&&(this.__read=o)},set:function(t,e,n,i){return this.x=t,this.y=e,this.width=n,this.height=i,this},clone:function(){return new f(this.x,this.y,this.width,this.height)},equals:function(t){var n=e.isPlainValue(t)?f.read(arguments):t;return n===this||n&&this.x===n.x&&this.y===n.y&&this.width===n.width&&this.height===n.height||!1},toString:function(){var t=a.instance;return"{ x: "+t.number(this.x)+", y: "+t.number(this.y)+", width: "+t.number(this.width)+", height: "+t.number(this.height)+" }"},_serialize:function(t){var e=t.formatter;return[e.number(this.x),e.number(this.y),e.number(this.width),e.number(this.height)]},getPoint:function(t){var e=t?h:u;return new e(this.x,this.y,this,"setPoint")},setPoint:function(){var t=h.read(arguments);this.x=t.x,this.y=t.y},getSize:function(t){var e=t?c:d;return new e(this.width,this.height,this,"setSize")},setSize:function(){var t=c.read(arguments);this._fixX&&(this.x+=(this.width-t.width)*this._fixX),this._fixY&&(this.y+=(this.height-t.height)*this._fixY),this.width=t.width,this.height=t.height,this._fixW=1,this._fixH=1},getLeft:function(){return this.x},setLeft:function(t){this._fixW||(this.width-=t-this.x),this.x=t,this._fixX=0},getTop:function(){return this.y},setTop:function(t){this._fixH||(this.height-=t-this.y),this.y=t,this._fixY=0},getRight:function(){return this.x+this.width},setRight:function(e){this._fixX!==t&&1!==this._fixX&&(this._fixW=0),this._fixW?this.x=e-this.width:this.width=e-this.x,this._fixX=1},getBottom:function(){return this.y+this.height},setBottom:function(e){this._fixY!==t&&1!==this._fixY&&(this._fixH=0),this._fixH?this.y=e-this.height:this.height=e-this.y,this._fixY=1},getCenterX:function(){return this.x+.5*this.width},setCenterX:function(t){this.x=t-.5*this.width,this._fixX=.5},getCenterY:function(){return this.y+.5*this.height},setCenterY:function(t){this.y=t-.5*this.height,this._fixY=.5},getCenter:function(t){var e=t?h:u;return new e(this.getCenterX(),this.getCenterY(),this,"setCenter")},setCenter:function(){var t=h.read(arguments);return this.setCenterX(t.x),this.setCenterY(t.y),this},getArea:function(){return this.width*this.height},isEmpty:function(){return 0===this.width||0===this.height},contains:function(e){return e&&e.width!==t||4==(Array.isArray(e)?e:arguments).length?this._containsRectangle(f.read(arguments)):this._containsPoint(h.read(arguments))},_containsPoint:function(t){var e=t.x,n=t.y;return e>=this.x&&n>=this.y&&e<=this.x+this.width&&n<=this.y+this.height},_containsRectangle:function(t){var e=t.x,n=t.y;return e>=this.x&&n>=this.y&&e+t.width<=this.x+this.width&&n+t.height<=this.y+this.height},intersects:function(){var t=f.read(arguments);return t.x+t.width>this.x&&t.y+t.height>this.y&&t.x<this.x+this.width&&t.y<this.y+this.height},touches:function(){var t=f.read(arguments);return t.x+t.width>=this.x&&t.y+t.height>=this.y&&t.x<=this.x+this.width&&t.y<=this.y+this.height},intersect:function(){var t=f.read(arguments),e=Math.max(this.x,t.x),n=Math.max(this.y,t.y),i=Math.min(this.x+this.width,t.x+t.width),r=Math.min(this.y+this.height,t.y+t.height);return new f(e,n,i-e,r-n)},unite:function(){var t=f.read(arguments),e=Math.min(this.x,t.x),n=Math.min(this.y,t.y),i=Math.max(this.x+this.width,t.x+t.width),r=Math.max(this.y+this.height,t.y+t.height);return new f(e,n,i-e,r-n)},include:function(){var t=h.read(arguments),e=Math.min(this.x,t.x),n=Math.min(this.y,t.y),i=Math.max(this.x+this.width,t.x),r=Math.max(this.y+this.height,t.y);return new f(e,n,i-e,r-n)},expand:function(){var t=c.read(arguments),e=t.width,n=t.height;return new f(this.x-e/2,this.y-n/2,this.width+e,this.height+n)},scale:function(e,n){return this.expand(this.width*e-this.width,this.height*(n===t?e:n)-this.height)}},new function(){return e.each([["Top","Left"],["Top","Right"],["Bottom","Left"],["Bottom","Right"],["Left","Center"],["Top","Center"],["Right","Center"],["Bottom","Center"]],function(t,e){var n=t.join(""),i=/^[RL]/.test(n);e>=4&&(t[1]+=i?"Y":"X");var r=t[i?0:1],s=t[i?1:0],a="get"+r,o="get"+s,l="set"+r,c="set"+s,d="get"+n,f="set"+n;this[d]=function(t){var e=t?h:u;return new e(this[a](),this[o](),this,f)},this[f]=function(){var t=h.read(arguments);this[l](t.x),this[c](t.y)}},{beans:!0})}),_=f.extend({initialize:function(t,e,n,i,r,s){this.set(t,e,n,i,!0),this._owner=r,this._setter=s},set:function(t,e,n,i,r){return this._x=t,this._y=e,this._width=n,this._height=i,r||this._owner[this._setter](this),this}},new function(){var t=f.prototype;return e.each(["x","y","width","height"],function(t){var n=e.capitalize(t),i="_"+t;this["get"+n]=function(){return this[i]},this["set"+n]=function(t){this[i]=t,this._dontNotify||this._owner[this._setter](this)}},e.each(["Point","Size","Center","Left","Top","Right","Bottom","CenterX","CenterY","TopLeft","TopRight","BottomLeft","BottomRight","LeftCenter","TopCenter","RightCenter","BottomCenter"],function(e){var n="set"+e;this[n]=function(){this._dontNotify=!0,t[n].apply(this,arguments),this._dontNotify=!1,this._owner[this._setter](this)}},{isSelected:function(){return this._owner._boundsSelected},setSelected:function(t){var e=this._owner;e.setSelected&&(e._boundsSelected=t,e.setSelected(t||e._selectedSegmentState>0))}}))}),g=e.extend({_class:"Matrix",initialize:function ae(t){var e=arguments.length,n=!0;if(6===e?this.set.apply(this,arguments):1===e?t instanceof ae?this.set(t._a,t._c,t._b,t._d,t._tx,t._ty):Array.isArray(t)?this.set.apply(this,t):n=!1:0===e?this.reset():n=!1,!n)throw Error("Unsupported matrix parameters")},set:function(t,e,n,i,r,s,a){return this._a=t,this._c=e,this._b=n,this._d=i,this._tx=r,this._ty=s,a||this._changed(),this},_serialize:function(t){return e.serialize(this.getValues(),t)},_changed:function(){var t=this._owner;t&&(t._applyMatrix?t.transform(null,!0):t._changed(9))},clone:function(){return new g(this._a,this._c,this._b,this._d,this._tx,this._ty)},equals:function(t){return t===this||t&&this._a===t._a&&this._b===t._b&&this._c===t._c&&this._d===t._d&&this._tx===t._tx&&this._ty===t._ty||!1},toString:function(){var t=a.instance;return"[["+[t.number(this._a),t.number(this._b),t.number(this._tx)].join(", ")+"], ["+[t.number(this._c),t.number(this._d),t.number(this._ty)].join(", ")+"]]"},reset:function(t){return this._a=this._d=1,this._c=this._b=this._tx=this._ty=0,t||this._changed(),this},apply:function(){var t=this._owner;return t?(t.transform(null,!0),this.isIdentity()):!1},translate:function(){var t=h.read(arguments),e=t.x,n=t.y;return this._tx+=e*this._a+n*this._b,this._ty+=e*this._c+n*this._d,this._changed(),this},scale:function(){var t=h.read(arguments),e=h.read(arguments,0,{readNull:!0});return e&&this.translate(e),this._a*=t.x,this._c*=t.x,this._b*=t.y,this._d*=t.y,e&&this.translate(e.negate()),this._changed(),this},rotate:function(t){t*=Math.PI/180;var e=h.read(arguments,1),n=e.x,i=e.y,r=Math.cos(t),s=Math.sin(t),a=n-n*r+i*s,o=i-n*s-i*r,u=this._a,l=this._b,c=this._c,d=this._d;return this._a=r*u+s*l,this._b=-s*u+r*l,this._c=r*c+s*d,this._d=-s*c+r*d,this._tx+=a*u+o*l,this._ty+=a*c+o*d,this._changed(),this},shear:function(){var t=h.read(arguments),e=h.read(arguments,0,{readNull:!0});e&&this.translate(e);var n=this._a,i=this._c;return this._a+=t.y*this._b,this._c+=t.y*this._d,this._b+=t.x*n,this._d+=t.x*i,e&&this.translate(e.negate()),this._changed(),this},skew:function(){var t=h.read(arguments),e=h.read(arguments,0,{readNull:!0}),n=Math.PI/180,i=new h(Math.tan(t.x*n),Math.tan(t.y*n));return this.shear(i,e)},concatenate:function(t){var e=this._a,n=this._b,i=this._c,r=this._d;return this._a=t._a*e+t._c*n,this._b=t._b*e+t._d*n,this._c=t._a*i+t._c*r,this._d=t._b*i+t._d*r,this._tx+=t._tx*e+t._ty*n,this._ty+=t._tx*i+t._ty*r,this._changed(),this},preConcatenate:function(t){var e=this._a,n=this._b,i=this._c,r=this._d,s=this._tx,a=this._ty;return this._a=t._a*e+t._b*i,this._b=t._a*n+t._b*r,this._c=t._c*e+t._d*i,this._d=t._c*n+t._d*r,this._tx=t._a*s+t._b*a+t._tx,this._ty=t._c*s+t._d*a+t._ty,this._changed(),this},isIdentity:function(){return 1===this._a&&0===this._c&&0===this._b&&1===this._d&&0===this._tx&&0===this._ty},orNullIfIdentity:function(){return this.isIdentity()?null:this},isInvertible:function(){return!!this._getDeterminant()},isSingular:function(){return!this._getDeterminant()},transform:function(t,e,n,i,r){return arguments.length<5?this._transformPoint(h.read(arguments)):this._transformCoordinates(t,e,n,i,r)},_transformPoint:function(t,e,n){var i=t.x,r=t.y;return e||(e=new h),e.set(i*this._a+r*this._b+this._tx,i*this._c+r*this._d+this._ty,n)},_transformCoordinates:function(t,e,n,i,r){for(var s=e,a=i,o=s+2*r;o>s;){var h=t[s++],u=t[s++];n[a++]=h*this._a+u*this._b+this._tx,n[a++]=h*this._c+u*this._d+this._ty}return n},_transformCorners:function(t){var e=t.x,n=t.y,i=e+t.width,r=n+t.height,s=[e,n,i,n,i,r,e,r];return this._transformCoordinates(s,0,s,0,4)},_transformBounds:function(t,e,n){for(var i=this._transformCorners(t),r=i.slice(0,2),s=i.slice(),a=2;8>a;a++){var o=i[a],h=1&a;
o<r[h]?r[h]=o:o>s[h]&&(s[h]=o)}return e||(e=new f),e.set(r[0],r[1],s[0]-r[0],s[1]-r[1],n)},inverseTransform:function(){return this._inverseTransform(h.read(arguments))},_getDeterminant:function(){var t=this._a*this._d-this._b*this._c;return isFinite(t)&&!o.isZero(t)&&isFinite(this._tx)&&isFinite(this._ty)?t:null},_inverseTransform:function(t,e,n){var i=this._getDeterminant();if(!i)return null;var r=t.x-this._tx,s=t.y-this._ty;return e||(e=new h),e.set((r*this._d-s*this._b)/i,(s*this._a-r*this._c)/i,n)},decompose:function(){var t=this._a,e=this._b,n=this._c,i=this._d;if(o.isZero(t*i-e*n))return null;var r=Math.sqrt(t*t+e*e);t/=r,e/=r;var s=t*n+e*i;n-=t*s,i-=e*s;var a=Math.sqrt(n*n+i*i);return n/=a,i/=a,s/=a,e*n>t*i&&(t=-t,e=-e,s=-s,r=-r),{scaling:new h(r,a),rotation:180*-Math.atan2(e,t)/Math.PI,shearing:s}},getValues:function(){return[this._a,this._c,this._b,this._d,this._tx,this._ty]},getTranslation:function(){return new h(this._tx,this._ty)},getScaling:function(){return(this.decompose()||{}).scaling},getRotation:function(){return(this.decompose()||{}).rotation},inverted:function(){var t=this._getDeterminant();return t&&new g(this._d/t,-this._c/t,-this._b/t,this._a/t,(this._b*this._ty-this._d*this._tx)/t,(this._c*this._tx-this._a*this._ty)/t)},shiftless:function(){return new g(this._a,this._c,this._b,this._d,0,0)},applyToContext:function(t){t.transform(this._a,this._c,this._b,this._d,this._tx,this._ty)}},e.each(["a","c","b","d","tx","ty"],function(t){var n=e.capitalize(t),i="_"+t;this["get"+n]=function(){return this[i]},this["set"+n]=function(t){this[i]=t,this._changed()}},{})),p=e.extend({_class:"Line",initialize:function(t,e,n,i,r){var s=!1;arguments.length>=4?(this._px=t,this._py=e,this._vx=n,this._vy=i,s=r):(this._px=t.x,this._py=t.y,this._vx=e.x,this._vy=e.y,s=n),s||(this._vx-=this._px,this._vy-=this._py)},getPoint:function(){return new h(this._px,this._py)},getVector:function(){return new h(this._vx,this._vy)},getLength:function(){return this.getVector().getLength()},intersect:function(t,e){return p.intersect(this._px,this._py,this._vx,this._vy,t._px,t._py,t._vx,t._vy,!0,e)},getSide:function(t){return p.getSide(this._px,this._py,this._vx,this._vy,t.x,t.y,!0)},getDistance:function(t){return Math.abs(p.getSignedDistance(this._px,this._py,this._vx,this._vy,t.x,t.y,!0))},statics:{intersect:function(t,e,n,i,r,s,a,u,l,c){l||(n-=t,i-=e,a-=r,u-=s);var d=u*n-a*i;if(!o.isZero(d)){var f=t-r,_=e-s,g=(a*_-u*f)/d,p=(n*_-i*f)/d;if((c||g>=0&&1>=g)&&(c||p>=0&&1>=p))return new h(t+g*n,e+g*i)}},getSide:function(t,e,n,i,r,s,a){a||(n-=t,i-=e);var o=r-t,h=s-e,u=o*i-h*n;return 0===u&&(u=o*n+h*i,u>0&&(o-=n,h-=i,u=o*n+h*i,0>u&&(u=0))),0>u?-1:u>0?1:0},getSignedDistance:function(t,e,n,i,r,s,a){a||(n-=t,i-=e);var o=i/n,h=e-o*t;return(s-o*r-h)/Math.sqrt(o*o+1)}}}),v=s.extend({_class:"Project",_list:"projects",_reference:"project",initialize:function(t){s.call(this,!0),this.layers=[],this.symbols=[],this._currentStyle=new F(null,null,this),this.activeLayer=new x,this._view=Z.create(this,t||Q.getCanvas(1,1)),this._selectedItems={},this._selectedItemCount=0,this._updateVersion=0},_serialize:function(t,n){return e.serialize(this.layers,t,!0,n)},clear:function(){for(var t=this.layers.length-1;t>=0;t--)this.layers[t].remove();this.symbols=[]},isEmpty:function(){return this.layers.length<=1&&(!this.activeLayer||this.activeLayer.isEmpty())},remove:function oe(){return oe.base.call(this)?(this._view&&this._view.remove(),!0):!1},getView:function(){return this._view},getCurrentStyle:function(){return this._currentStyle},setCurrentStyle:function(t){this._currentStyle.initialize(t)},getIndex:function(){return this._index},addChild:function(t){return t instanceof x?(e.splice(this.layers,[t]),this.activeLayer||(this.activeLayer=t)):t instanceof y?(this.activeLayer||this.addChild(new x(y.NO_INSERT))).addChild(t):t=null,t},getSelectedItems:function(){var t=[];for(var e in this._selectedItems){var n=this._selectedItems[e];n.isInserted()&&t.push(n)}return t},getOptions:function(){return this._scope.settings},_updateSelection:function(t){var e=t._id,n=this._selectedItems;t._selected?n[e]!==t&&(this._selectedItemCount++,n[e]=t):n[e]===t&&(this._selectedItemCount--,delete n[e])},selectAll:function(){for(var t=this.layers,e=0,n=t.length;n>e;e++)t[e].setFullySelected(!0)},deselectAll:function(){var t=this._selectedItems;for(var e in t)t[e].setFullySelected(!1)},hitTest:function(){for(var t=h.read(arguments),n=P.getOptions(e.read(arguments)),i=this.layers.length-1;i>=0;i--){var r=this.layers[i].hitTest(t,n);if(r)return r}return null},getItems:function(t){return y._getItems(this.layers,t,!0)},getItem:function(t){return y._getItems(this.layers,t,!1)},importJSON:function(t){this.activate();var n=this.activeLayer;return e.importJSON(t,n&&n.isEmpty()&&n)},draw:function(t,n,i){this._updateVersion++,t.save(),n.applyToContext(t);for(var r=new e({offset:new h(0,0),pixelRatio:i,trackTransforms:!0,transforms:[n]}),s=0,a=this.layers.length;a>s;s++)this.layers[s].draw(t,r);if(t.restore(),this._selectedItemCount>0){t.save(),t.strokeWidth=1;for(var o in this._selectedItems){var u=this._selectedItems[o],l=u._globalMatrix,c=this._scope.settings.handleSize,d=c/2;if(u._updateVersion===this._updateVersion&&(u._drawSelected||u._boundsSelected)&&l){var f=u.getSelectedColor()||u.getLayer().getSelectedColor();if(t.strokeStyle=t.fillStyle=f?f.toCanvasStyle(t):"#009dec",u._drawSelected&&u._drawSelected(t,l),u._boundsSelected){var _=l._transformCorners(u.getInternalBounds());t.beginPath();for(var s=0;8>s;s++)t[0===s?"moveTo":"lineTo"](_[s],_[++s]);t.closePath(),t.stroke();for(var s=0;8>s;s++)t.fillRect(_[s]-d,_[++s]-d,c,c)}}}t.restore()}}}),m=e.extend({_class:"Symbol",initialize:function he(t,e){this._id=he._id=(he._id||0)+1,this.project=paper.project,this.project.symbols.push(this),t&&this.setDefinition(t,e)},_serialize:function(t,n){return n.add(this,function(){return e.serialize([this._class,this._definition],t,!1,n)})},_changed:function(t){8&t&&y._clearBoundsCache(this),1&t&&(this.project._needsUpdate=!0)},getDefinition:function(){return this._definition},setDefinition:function(t,e){t._parentSymbol&&(t=t.clone()),this._definition&&(this._definition._parentSymbol=null),this._definition=t,t.remove(),t.setSelected(!1),e||t.setPosition(new h),t._parentSymbol=this,this._changed(9)},place:function(t){return new S(this,t)},clone:function(){return new m(this._definition.clone(!1))}}),y=e.extend(n,{statics:{extend:function ue(t){return t._serializeFields&&(t._serializeFields=new e(this.prototype._serializeFields,t._serializeFields)),ue.base.apply(this,arguments)},NO_INSERT:{insert:!1}},_class:"Item",_applyMatrix:!0,_canApplyMatrix:!0,_boundsSelected:!1,_selectChildren:!1,_serializeFields:{name:null,matrix:new g,pivot:null,locked:!1,visible:!0,blendMode:"normal",opacity:1,guide:!1,selected:!1,clipMask:!1,applyMatrix:null,data:{}},initialize:function(){},_initialize:function(t,e){var n=t&&t.internal===!0,i=this._matrix=new g,r=paper.project;return n||(this._id=y._id=(y._id||0)+1),this._applyMatrix=this._canApplyMatrix&&paper.settings.applyMatrix,e&&i.translate(e),i._owner=this,this._style=new F(r._currentStyle,this,r),this._project||(n||t&&t.insert===!1?this._setProject(r):(r.activeLayer||new x).addChild(this)),t&&t!==y.NO_INSERT?this._set(t,{insert:!0}):!0},_events:new function(){var t={mousedown:{mousedown:1,mousedrag:1,click:1,doubleclick:1},mouseup:{mouseup:1,mousedrag:1,click:1,doubleclick:1},mousemove:{mousedrag:1,mousemove:1,mouseenter:1,mouseleave:1}},n={install:function(e){var n=this.getView()._eventCounters;if(n)for(var i in t)n[i]=(n[i]||0)+(t[i][e]||0)},uninstall:function(e){var n=this.getView()._eventCounters;if(n)for(var i in t)n[i]-=t[i][e]||0}};return e.each(["onMouseDown","onMouseUp","onMouseDrag","onClick","onDoubleClick","onMouseMove","onMouseEnter","onMouseLeave"],function(t){this[t]=n},{onFrame:{install:function(){this._animateItem(!0)},uninstall:function(){this._animateItem(!1)}},onLoad:{}})},_animateItem:function(t){this.getView()._animateItem(this,t)},_serialize:function(t,n){function i(i){for(var a in i){var o=s[a];e.equals(o,"leading"===a?1.2*i.fontSize:i[a])||(r[a]=e.serialize(o,t,"data"!==a,n))}}var r={},s=this;return i(this._serializeFields),this instanceof w||i(this._style._defaults),[this._class,r]},_changed:function(e){var n=this._parentSymbol,i=this._parent||n,r=this._project;if(8&e&&(this._bounds=this._position=this._decomposed=this._globalMatrix=this._currentPath=t),i&&40&e&&y._clearBoundsCache(i),2&e&&y._clearBoundsCache(this),r&&(1&e&&(r._needsUpdate=!0),r._changes)){var s=r._changesById[this._id];s?s.flags|=e:(s={item:this,flags:e},r._changesById[this._id]=s,r._changes.push(s))}n&&n._changed(e)},set:function(t){return t&&this._set(t,{insert:!0}),this},getId:function(){return this._id},getClassName:function(){return this._class},getName:function(){return this._name},setName:function(e,n){if(this._name&&this._removeNamed(),e===+e+"")throw Error("Names consisting only of numbers are not supported.");if(e&&this._parent){for(var i=this._parent._children,r=this._parent._namedChildren,s=e,a=1;n&&i[e];)e=s+" "+a++;(r[e]=r[e]||[]).push(this),i[e]=this}this._name=e||t,this._changed(128)},getStyle:function(){return this._style},setStyle:function(t){this.getStyle().set(t)},hasFill:function(){return this.getStyle().hasFill()},hasStroke:function(){return this.getStyle().hasStroke()},hasShadow:function(){return this.getStyle().hasShadow()}},e.each(["locked","visible","blendMode","opacity","guide"],function(t){var n=e.capitalize(t),t="_"+t;this["get"+n]=function(){return this[t]},this["set"+n]=function(e){e!=this[t]&&(this[t]=e,this._changed("_locked"===t?128:129))}},{}),{beans:!0,_locked:!1,_visible:!0,_blendMode:"normal",_opacity:1,_guide:!1,isSelected:function(){if(this._selectChildren)for(var t=0,e=this._children.length;e>t;t++)if(this._children[t].isSelected())return!0;return this._selected},setSelected:function(t,e){if(!e&&this._selectChildren)for(var n=0,i=this._children.length;i>n;n++)this._children[n].setSelected(t);(t=!!t)^this._selected&&(this._selected=t,this._project._updateSelection(this),this._changed(129))},_selected:!1,isFullySelected:function(){if(this._children&&this._selected){for(var t=0,e=this._children.length;e>t;t++)if(!this._children[t].isFullySelected())return!1;return!0}return this._selected},setFullySelected:function(t){if(this._children)for(var e=0,n=this._children.length;n>e;e++)this._children[e].setFullySelected(t);this.setSelected(t,!0)},isClipMask:function(){return this._clipMask},setClipMask:function(t){this._clipMask!=(t=!!t)&&(this._clipMask=t,t&&(this.setFillColor(null),this.setStrokeColor(null)),this._changed(129),this._parent&&this._parent._changed(1024))},_clipMask:!1,getData:function(){return this._data||(this._data={}),this._data},setData:function(t){this._data=t},getPosition:function(t){var e=this._position,n=t?h:u;if(!e){var i=this._pivot;e=this._position=i?this._matrix._transformPoint(i):this.getBounds().getCenter(!0)}return new n(e.x,e.y,this,"setPosition")},setPosition:function(){this.translate(h.read(arguments).subtract(this.getPosition(!0)))},getPivot:function(t){var e=this._pivot;if(e){var n=t?h:u;e=new n(e.x,e.y,this,"setAnchor")}return e},setPivot:function(){this._pivot=h.read(arguments),this._position=t},_pivot:null,getRegistration:"#getPivot",setRegistration:"#setPivot"},e.each(["bounds","strokeBounds","handleBounds","roughBounds","internalBounds","internalRoughBounds"],function(t){var n="get"+e.capitalize(t),i=t.match(/^internal(.*)$/),r=i?"get"+i[1]:null;this[n]=function(e){var i=this._boundsGetter,s=!r&&("string"==typeof i?i:i&&i[n])||n,a=this._getCachedBounds(s,e,null,r);return"bounds"===t?new _(a.x,a.y,a.width,a.height,this,"setBounds"):a}},{beans:!0,_getBounds:function(t,e,n){var i=this._children;if(!i||0==i.length)return new f;for(var r=1/0,s=-r,a=r,o=s,h=0,u=i.length;u>h;h++){var l=i[h];if(l._visible&&!l.isEmpty()){var c=l._getCachedBounds(t,e,n);r=Math.min(c.x,r),a=Math.min(c.y,a),s=Math.max(c.x+c.width,s),o=Math.max(c.y+c.height,o)}}return isFinite(r)?new f(r,a,s-r,o-a):new f},setBounds:function(){var t=f.read(arguments),e=this.getBounds(),n=new g,i=t.getCenter();n.translate(i),(t.width!=e.width||t.height!=e.height)&&n.scale(0!=e.width?t.width/e.width:1,0!=e.height?t.height/e.height:1),i=e.getCenter(),n.translate(-i.x,-i.y),this.transform(n)},_getCachedBounds:function(t,e,n,i){e=e&&e.orNullIfIdentity();var r=i?null:this._matrix.orNullIfIdentity(),s=(!e||e.equals(r))&&t,a=this._parent||this._parentSymbol;if(n&&a){var o=n._id,h=a._boundsCache=a._boundsCache||{ids:{},list:[]};h.ids[o]||(h.list.push(n),h.ids[o]=n)}if(s&&this._bounds&&this._bounds[s])return this._bounds[s].clone();e=e?r?e.clone().concatenate(r):e:r;var u=this._getBounds(i||t,e,s?this:n);if(s){this._bounds||(this._bounds={});var l=this._bounds[s]=u.clone();l._internal=!!i}return u},statics:{_clearBoundsCache:function(e){if(e._boundsCache){for(var n=0,i=e._boundsCache.list,r=i.length;r>n;n++){var s=i[n];s._bounds=s._position=t,s!==e&&s._boundsCache&&y._clearBoundsCache(s)}e._boundsCache=t}}}}),{beans:!0,_decompose:function(){return this._decomposed=this._matrix.decompose()},getRotation:function(){var t=this._decomposed||this._decompose();return t&&t.rotation},setRotation:function(t){var e=this.getRotation();if(null!=e&&null!=t){var n=this._decomposed;this.rotate(t-e),n.rotation=t,this._decomposed=n}},getScaling:function(){var t=this._decomposed||this._decompose();return t&&t.scaling},setScaling:function(){var t=this.getScaling();if(null!=t){var e=h.read(arguments,0,{clone:!0}),n=this._decomposed;this.scale(e.x/t.x,e.y/t.y),n.scaling=e,this._decomposed=n}},getMatrix:function(){return this._matrix},setMatrix:function(t){this._matrix.initialize(t),this._applyMatrix?this.transform(null,!0):this._changed(9)},getGlobalMatrix:function(t){var e=this._globalMatrix,n=this._project._updateVersion,i=this.getView()._matrix;return e&&e._updateVersion!==n&&(e=null),e||(e=this._globalMatrix=this._matrix.clone(),e.preConcatenate(this._parent?this._parent.getGlobalMatrix(!0):i),e._updateVersion=n),t?e:i.inverted().concatenate(e)},getApplyMatrix:function(){return this._applyMatrix},setApplyMatrix:function(t){(this._applyMatrix=this._canApplyMatrix&&!!t)&&this.transform(null,!0)},getTransformContent:"#getApplyMatrix",setTransformContent:"#setApplyMatrix"},{getProject:function(){return this._project},_setProject:function(t,e){if(this._project!==t){this._project&&this._installEvents(!1),this._project=t;for(var n=this._children,i=0,r=n&&n.length;r>i;i++)n[i]._setProject(t);e=!0}e&&this._installEvents(!0)},getView:function(){return this._project.getView()},_installEvents:function le(t){le.base.call(this,t);for(var e=this._children,n=0,i=e&&e.length;i>n;n++)e[n]._installEvents(t)},getLayer:function(){for(var t=this;t=t._parent;)if(t instanceof x)return t;return null},getParent:function(){return this._parent},setParent:function(t){return t.addChild(this)},getChildren:function(){return this._children},setChildren:function(t){this.removeChildren(),this.addChildren(t)},getFirstChild:function(){return this._children&&this._children[0]||null},getLastChild:function(){return this._children&&this._children[this._children.length-1]||null},getNextSibling:function(){return this._parent&&this._parent._children[this._index+1]||null},getPreviousSibling:function(){return this._parent&&this._parent._children[this._index-1]||null},getIndex:function(){return this._index},isInserted:function(){return this._parent?this._parent.isInserted():!1},equals:function(t){return t===this||t&&this._class===t._class&&this._style.equals(t._style)&&this._matrix.equals(t._matrix)&&this._locked===t._locked&&this._visible===t._visible&&this._blendMode===t._blendMode&&this._opacity===t._opacity&&this._clipMask===t._clipMask&&this._guide===t._guide&&this._equals(t)||!1},_equals:function(t){return e.equals(this._children,t._children)},clone:function(t){return this._clone(new this.constructor(y.NO_INSERT),t)},_clone:function(n,i){if(n.setStyle(this._style),this._children)for(var r=0,s=this._children.length;s>r;r++)n.addChild(this._children[r].clone(!1),!0);(i||i===t)&&n.insertAbove(this);for(var a=["_locked","_visible","_blendMode","_opacity","_clipMask","_guide","_applyMatrix"],r=0,s=a.length;s>r;r++){var o=a[r];this.hasOwnProperty(o)&&(n[o]=this[o])}return n._matrix.initialize(this._matrix),n._data=this._data?e.clone(this._data):null,n.setSelected(this._selected),this._name&&n.setName(this._name,!0),n},copyTo:function(t){return t.addChild(this.clone(!1))},rasterize:function(t){var n=this.getStrokeBounds(),i=(t||this.getView().getResolution())/72,r=n.getTopLeft().floor(),s=n.getBottomRight().ceil(),a=new c(s.subtract(r)),o=Q.getCanvas(a.multiply(i)),h=o.getContext("2d"),u=(new g).scale(i).translate(r.negate());h.save(),u.applyToContext(h),this.draw(h,new e({transforms:[u]})),h.restore();var l=new C(y.NO_INSERT);return l.setCanvas(o),l.transform((new g).translate(r.add(a.divide(2))).scale(1/i)),l.insertAbove(this),l},contains:function(){return!!this._contains(this._matrix._inverseTransform(h.read(arguments)))},_contains:function(t){if(this._children){for(var e=this._children.length-1;e>=0;e--)if(this._children[e].contains(t))return!0;return!1}return t.isInside(this.getInternalBounds())},hitTest:function(n,i){function r(i,r){var s=p["get"+r]();return n.subtract(s).divide(l).length<=1?new P(i,g,{name:e.hyphenate(r),point:s}):t}if(n=h.read(arguments),i=P.getOptions(e.read(arguments)),this._locked||!this._visible||this._guide&&!i.guides||this.isEmpty())return null;var s=this._matrix,a=i._totalMatrix,o=this.getView(),u=i._totalMatrix=a?a.clone().concatenate(s):this.getGlobalMatrix().clone().preConcatenate(o._matrix),l=i._tolerancePadding=new c(T._getPenPadding(1,u.inverted())).multiply(Math.max(i.tolerance,1e-5));if(n=s._inverseTransform(n),!this._children&&!this.getInternalRoughBounds().expand(l.multiply(2))._containsPoint(n))return null;var d,f,_=!(i.guides&&!this._guide||i.selected&&!this._selected||(d=i.type)&&("string"==typeof d?d!==e.hyphenate(this._class):!(this instanceof d))),g=this;if(_&&(i.center||i.bounds)&&this._parent){var p=this.getInternalBounds();if(i.center&&(f=r("center","Center")),!f&&i.bounds)for(var v=["TopLeft","TopRight","BottomLeft","BottomRight","LeftCenter","TopCenter","RightCenter","BottomCenter"],m=0;8>m&&!f;m++)f=r("bounds",v[m])}var y=!f&&this._children;if(y)for(var w=this._getChildHitTestOptions(i),m=y.length-1;m>=0&&!f;m--)f=y[m].hitTest(n,w);return!f&&_&&(f=this._hitTest(n,i)),f&&f.point&&(f.point=s.transform(f.point)),i._totalMatrix=a,f},_getChildHitTestOptions:function(t){return t},_hitTest:function(e,n){return n.fill&&this.hasFill()&&this._contains(e)?new P("fill",this):t}},{matches:function(n){function i(t,n){for(var r in t)if(t.hasOwnProperty(r)){var s=t[r],a=n[r];if(e.isPlainObject(s)&&e.isPlainObject(a)){if(!i(s,a))return!1}else if(!e.equals(s,a))return!1}return!0}for(var r in n)if(n.hasOwnProperty(r)){var s=this[r],a=n[r];if(s===t&&"type"===r&&(s=e.hyphenate(this._class)),/^(constructor|class)$/.test(r)){if(!(this instanceof a))return!1}else if(a instanceof RegExp){if(!a.test(s))return!1}else if("function"==typeof a){if(!a(s))return!1}else if(e.isPlainObject(a)){if(!i(a,s))return!1}else if(!e.equals(s,a))return!1}return!0},getItems:function(t){return y._getItems(this._children,t,!0)},getItem:function(t){return y._getItems(this._children,t,!1)},statics:{_getItems:function ce(t,e,n){for(var i=n&&[],r=0,s=t&&t.length;s>r;r++){var a=t[r];if(a.matches(e)){if(!n)return a;i.push(a)}var o=ce(a._children,e,n);if(n)i.push.apply(i,o);else if(o)return o}return n?i:null}}},{importJSON:function(t){var n=e.importJSON(t,this);return n!==this?this.addChild(n):n},addChild:function(e,n){return this.insertChild(t,e,n)},insertChild:function(t,e,n){var i=this.insertChildren(t,[e],n);return i&&i[0]},addChildren:function(t,e){return this.insertChildren(this._children.length,t,e)},insertChildren:function(t,n,i,r){var s=this._children;if(s&&n&&n.length>0){n=Array.prototype.slice.apply(n);for(var a=n.length-1;a>=0;a--){var o=n[a];!r||o instanceof r?o._remove(!1,!0):n.splice(a,1)}e.splice(s,n,t,0);for(var h=this._project,u=h&&h._changes,a=0,l=n.length;l>a;a++){var o=n[a];o._parent=this,o._setProject(this._project,!0),o._name&&o.setName(o._name),u&&this._changed(5)}this._changed(11)}else n=null;return n},_insert:function(t,e,n){if(!e._parent)return null;var i=e._index+(t?1:0);return e._parent===this._parent&&i>this._index&&i--,e._parent.insertChild(i,this,n)},insertAbove:function(t,e){return this._insert(!0,t,e)},insertBelow:function(t,e){return this._insert(!1,t,e)},sendToBack:function(){return this._parent.insertChild(0,this)},bringToFront:function(){return this._parent.addChild(this)},appendTop:"#addChild",appendBottom:function(t){return this.insertChild(0,t)},moveAbove:"#insertAbove",moveBelow:"#insertBelow",reduce:function(){if(this._children&&1===this._children.length){var t=this._children[0].reduce();return t.insertAbove(this),t.setStyle(this._style),this.remove(),t}return this},_removeNamed:function(){var t=this._parent._children,e=this._parent._namedChildren,n=this._name,i=e[n],r=i?i.indexOf(this):-1;-1!=r&&(t[n]==this&&delete t[n],i.splice(r,1),i.length?t[n]=i[i.length-1]:delete e[n])},_remove:function(t,n){var i=this._parent;if(i){if(this._name&&this._removeNamed(),null!=this._index&&e.splice(i._children,null,this._index,1),this._installEvents(!1),t){var r=this._project;r&&r._changes&&this._changed(5)}return n&&i._changed(11),this._parent=null,!0}return!1},remove:function(){return this._remove(!0,!0)},removeChildren:function(t,n){if(!this._children)return null;t=t||0,n=e.pick(n,this._children.length);for(var i=e.splice(this._children,null,t,n-t),r=i.length-1;r>=0;r--)i[r]._remove(!0,!1);return i.length>0&&this._changed(11),i},clear:"#removeChildren",reverseChildren:function(){if(this._children){this._children.reverse();for(var t=0,e=this._children.length;e>t;t++)this._children[t]._index=t;this._changed(11)}},isEmpty:function(){return!this._children||0==this._children.length},isEditable:function(){for(var t=this;t;){if(!t._visible||t._locked)return!1;t=t._parent}return!0},_getOrder:function(t){function e(t){var e=[];do e.unshift(t);while(t=t._parent);return e}for(var n=e(this),i=e(t),r=0,s=Math.min(n.length,i.length);s>r;r++)if(n[r]!=i[r])return n[r]._index<i[r]._index?1:-1;return 0},hasChildren:function(){return this._children&&this._children.length>0},isAbove:function(t){return-1===this._getOrder(t)},isBelow:function(t){return 1===this._getOrder(t)},isParent:function(t){return this._parent===t},isChild:function(t){return t&&t._parent===this},isDescendant:function(t){for(var e=this;e=e._parent;)if(e==t)return!0;return!1},isAncestor:function(t){return t?t.isDescendant(this):!1},isGroupedWith:function(t){for(var e=this._parent;e;){if(e._parent&&/^(Group|Layer|CompoundPath)$/.test(e._class)&&t.isDescendant(e))return!0;e=e._parent}return!1},translate:function(){var t=new g;return this.transform(t.translate.apply(t,arguments))},rotate:function(t){return this.transform((new g).rotate(t,h.read(arguments,1,{readNull:!0})||this.getPosition(!0)))}},e.each(["scale","shear","skew"],function(t){this[t]=function(){var e=h.read(arguments),n=h.read(arguments,0,{readNull:!0});return this.transform((new g)[t](e,n||this.getPosition(!0)))}},{}),{transform:function(t,e){t&&t.isIdentity()&&(t=null);var n=this._matrix,i=(e||this._applyMatrix)&&(!n.isIdentity()||t);if(!t&&!i)return this;if(t&&n.preConcatenate(t),i=i&&this._transformContent(n)){var r=this._pivot,s=this._style,a=s.getFillColor(!0),o=s.getStrokeColor(!0);r&&r.transform(n),a&&a.transform(n),o&&o.transform(n),n.reset(!0)}var h=this._bounds,u=this._position;this._changed(9);var l=h&&t&&t.decompose();if(l&&!l.shearing&&0===l.rotation%90){for(var c in h){var d=h[c];(i||!d._internal)&&t._transformBounds(d,d)}var f=this._boundsGetter,d=h[f&&f.getBounds||f||"getBounds"];d&&(this._position=d.getCenter(!0)),this._bounds=h}else t&&u&&(this._position=t._transformPoint(u,u));return this},_transformContent:function(t){var e=this._children;if(e){for(var n=0,i=e.length;i>n;n++)e[n].transform(t,!0);return!0}},globalToLocal:function(){var t=this.getGlobalMatrix();return t&&t._inverseTransform(h.read(arguments))},localToGlobal:function(){var t=this.getGlobalMatrix();return t&&t._transformPoint(h.read(arguments))},fitBounds:function(t,e){t=f.read(arguments);var n=this.getBounds(),i=n.height/n.width,r=t.height/t.width,s=(e?i>r:r>i)?t.width/n.width:t.height/n.height,a=new f(new h,new c(n.width*s,n.height*s));a.setCenter(t.getCenter()),this.setBounds(a)},_setStyles:function(t){var e=this._style,n=e.getFillColor(),i=e.getStrokeColor(),r=e.getShadowColor();if(n&&(t.fillStyle=n.toCanvasStyle(t)),i){var s=e.getStrokeWidth();if(s>0){t.strokeStyle=i.toCanvasStyle(t),t.lineWidth=s;var a=e.getStrokeJoin(),o=e.getStrokeCap(),h=e.getMiterLimit();if(a&&(t.lineJoin=a),o&&(t.lineCap=o),h&&(t.miterLimit=h),paper.support.nativeDash){var u=e.getDashArray(),l=e.getDashOffset();u&&u.length&&("setLineDash"in t?(t.setLineDash(u),t.lineDashOffset=l):(t.mozDash=u,t.mozDashOffset=l))}}}if(r){var c=e.getShadowBlur();if(c>0){t.shadowColor=r.toCanvasStyle(t),t.shadowBlur=c;var d=this.getShadowOffset();t.shadowOffsetX=d.x,t.shadowOffsetY=d.y}}},draw:function(t,e){if(this._visible&&0!==this._opacity){var n=this._updateVersion=this._project._updateVersion,i=e.trackTransforms,r=e.transforms,s=this._matrix,a=r[r.length-1],o=a.clone().concatenate(s);if(o.isInvertible()){i&&(r.push(this._globalMatrix=o),o._updateVersion=n);var h,u,l,d=this._blendMode,f=this._opacity,_="normal"===d,g=te.nativeModes[d],p=_&&1===f||e.clip||(g||_&&1>f)&&this._canComposite();if(!p){var v=this.getStrokeBounds(a);if(!v.width||!v.height)return;l=e.offset,u=e.offset=v.getTopLeft().floor(),h=t,t=Q.getContext(v.getSize().ceil().add(new c(1,1)),e.pixelRatio)}t.save(),p?(t.globalAlpha=f,g&&(t.globalCompositeOperation=d)):t.translate(-u.x,-u.y),(p?s:o).applyToContext(t),!p&&e.clipItem&&e.clipItem.draw(t,e.extend({clip:!0})),this._draw(t,e),t.restore(),i&&r.pop(),e.clip&&!e.dontFinish&&t.clip(),p||(te.process(d,t,h,f,u.subtract(l).multiply(e.pixelRatio)),Q.release(t),e.offset=l)}}},_canComposite:function(){return!1}},e.each(["down","drag","up","move"],function(t){this["removeOn"+e.capitalize(t)]=function(){var e={};return e[t]=!0,this.removeOn(e)}},{removeOn:function(t){for(var e in t)if(t[e]){var n="mouse"+e,i=this._project,r=i._removeSets=i._removeSets||{};r[n]=r[n]||{},r[n][this._id]=this}return this}})),w=y.extend({_class:"Group",_selectChildren:!0,_serializeFields:{children:[]},initialize:function(t){this._children=[],this._namedChildren={},this._initialize(t)||this.addChildren(Array.isArray(t)?t:arguments)},_changed:function de(e){de.base.call(this,e),1026&e&&(this._clipItem=t)},_getClipItem:function(){var e=this._clipItem;if(e===t){e=null;for(var n=0,i=this._children.length;i>n;n++){var r=this._children[n];if(r._clipMask){e=r;break}}this._clipItem=e}return e},isClipped:function(){return!!this._getClipItem()},setClipped:function(t){var e=this.getFirstChild();e&&e.setClipMask(t)},_draw:function(t,e){var n=e.clip,i=!n&&this._getClipItem(),r=!0;if(e=e.extend({clipItem:i,clip:!1}),n?this._currentPath?(t.currentPath=this._currentPath,r=!1):(t.beginPath(),e.dontStart=e.dontFinish=!0):i&&i.draw(t,e.extend({clip:!0})),r)for(var s=0,a=this._children.length;a>s;s++){var o=this._children[s];o!==i&&o.draw(t,e)}n&&(this._currentPath=t.currentPath)}}),x=w.extend({_class:"Layer",initialize:function(n){var i=e.isPlainObject(n)?new e(n):{children:Array.isArray(n)?n:arguments},r=i.insert;i.insert=!1,w.call(this,i),(r||r===t)&&(this._project.addChild(this),this.activate())},_remove:function fe(t){return this._parent?fe.base.call(this,t):null!=this._index?(this._project.activeLayer===this&&(this._project.activeLayer=this.getNextSibling()||this.getPreviousSibling()),e.splice(this._project.layers,null,this._index,1),this._installEvents(!1),this._project._needsUpdate=!0,!0):!1},getNextSibling:function _e(){return this._parent?_e.base.call(this):this._project.layers[this._index+1]||null},getPreviousSibling:function ge(){return this._parent?ge.base.call(this):this._project.layers[this._index-1]||null},isInserted:function pe(){return this._parent?pe.base.call(this):null!=this._index},activate:function(){this._project.activeLayer=this},_insert:function ve(t,n,i){return n instanceof x&&!n._parent?(this._remove(!0,!0),e.splice(n._project.layers,[this],n._index+(t?1:0),0),this._setProject(n._project,!0),this):ve.base.call(this,t,n,i)}}),b=y.extend({_class:"Shape",_applyMatrix:!1,_canApplyMatrix:!1,_boundsSelected:!0,_serializeFields:{type:null,size:null,radius:null},initialize:function(t){this._initialize(t)},_equals:function(t){return this._type===t._type&&this._size.equals(t._size)&&e.equals(this._radius,t._radius)},clone:function(t){var e=new b(y.NO_INSERT);return e.setType(this._type),e.setSize(this._size),e.setRadius(this._radius),this._clone(e,t)},getType:function(){return this._type},setType:function(t){this._type=t},getShape:"#getType",setShape:"#setType",getSize:function(){var t=this._size;return new d(t.width,t.height,this,"setSize")},setSize:function(){var t=c.read(arguments);if(this._size){if(!this._size.equals(t)){var e=this._type,n=t.width,i=t.height;if("rectangle"===e){var r=c.min(this._radius,t.divide(2));this._radius.set(r.width,r.height)}else"circle"===e?(n=i=(n+i)/2,this._radius=n/2):"ellipse"===e&&this._radius.set(n/2,i/2);this._size.set(n,i),this._changed(9)}}else this._size=t.clone()},getRadius:function(){var t=this._radius;return"circle"===this._type?t:new d(t.width,t.height,this,"setRadius")},setRadius:function(t){var e=this._type;if("circle"===e){if(t===this._radius)return;var n=2*t;this._radius=t,this._size.set(n,n)}else if(t=c.read(arguments),this._radius){if(this._radius.equals(t))return;if(this._radius.set(t.width,t.height),"rectangle"===e){var n=c.max(this._size,t.multiply(2));this._size.set(n.width,n.height)}else"ellipse"===e&&this._size.set(2*t.width,2*t.height)}else this._radius=t.clone();this._changed(9)},isEmpty:function(){return!1},toPath:function(n){var i=new(T[e.capitalize(this._type)])({center:new h,size:this._size,radius:this._radius,insert:!1});return i.setStyle(this._style),i.transform(this._matrix),(n||n===t)&&i.insertAbove(this),i},_draw:function(t,e){var n=this._style,i=n.hasFill(),r=n.hasStroke(),s=e.dontFinish||e.clip;if(i||r||s){var a=this._radius,o=this._type;if(e.dontStart||t.beginPath(),"circle"===o)t.arc(0,0,a,0,2*Math.PI,!0);else{var h=a.width,u=a.height,l=.5522847498307936;if("ellipse"===o){var c=h*l,d=u*l;t.moveTo(-h,0),t.bezierCurveTo(-h,-d,-c,-u,0,-u),t.bezierCurveTo(c,-u,h,-d,h,0),t.bezierCurveTo(h,d,c,u,0,u),t.bezierCurveTo(-c,u,-h,d,-h,0)}else{var f=this._size,_=f.width,g=f.height;if(0===h&&0===u)t.rect(-_/2,-g/2,_,g);else{l=1-l;var p=_/2,v=g/2,c=h*l,d=u*l;t.moveTo(-p,-v+u),t.bezierCurveTo(-p,-v+d,-p+c,-v,-p+h,-v),t.lineTo(p-h,-v),t.bezierCurveTo(p-c,-v,p,-v+d,p,-v+u),t.lineTo(p,v-u),t.bezierCurveTo(p,v-d,p-c,v,p-h,v),t.lineTo(-p+h,v),t.bezierCurveTo(-p+c,v,-p,v-d,-p,v-u)}}}t.closePath()}s||!i&&!r||(this._setStyles(t),i&&(t.fill(n.getWindingRule()),t.shadowColor="rgba(0,0,0,0)"),r&&t.stroke())},_canComposite:function(){return!(this.hasFill()&&this.hasStroke())},_getBounds:function(t,e){var n=new f(this._size).setCenter(0,0);return"getBounds"!==t&&this.hasStroke()&&(n=n.expand(this.getStrokeWidth())),e?e._transformBounds(n):n}},new function(){function t(t,e,n){var i=t._radius;if(!i.isZero())for(var r=t._size.divide(2),s=0;4>s;s++){var a=new h(1&s?1:-1,s>1?1:-1),o=a.multiply(r),u=o.subtract(a.multiply(i)),l=new f(o,u);if((n?l.expand(n):l).contains(e))return u}}function e(t,e){var n=t.getAngleInRadians(),i=2*e.width,r=2*e.height,s=i*Math.sin(n),a=r*Math.cos(n);return i*r/(2*Math.sqrt(s*s+a*a))}return{_contains:function n(e){if("rectangle"===this._type){var i=t(this,e);return i?e.subtract(i).divide(this._radius).getLength()<=1:n.base.call(this,e)
}return e.divide(this.size).getLength()<=.5},_hitTest:function i(n,r){var s=!1;if(this.hasStroke()){var a=this._type,o=this._radius,h=this.getStrokeWidth()+2*r.tolerance;if("rectangle"===a){var u=t(this,n,h);if(u){var l=n.subtract(u);s=2*Math.abs(l.getLength()-e(l,o))<=h}else{var c=new f(this._size).setCenter(0,0),d=c.expand(h),_=c.expand(-h);s=d._containsPoint(n)&&!_._containsPoint(n)}}else"ellipse"===a&&(o=e(n,o)),s=2*Math.abs(n.getLength()-o)<=h}return s?new P("stroke",this):i.base.apply(this,arguments)}}},{statics:new function(){function t(t,n,i,r,s){var a=new b(e.getNamed(s));return a._type=t,a._size=i,a._radius=r,a.translate(n)}return{Circle:function(){var n=h.readNamed(arguments,"center"),i=e.readNamed(arguments,"radius");return t("circle",n,new c(2*i),i,arguments)},Rectangle:function(){var e=f.readNamed(arguments,"rectangle"),n=c.min(c.readNamed(arguments,"radius"),e.getSize(!0).divide(2));return t("rectangle",e.getCenter(!0),e.getSize(!0),n,arguments)},Ellipse:function(){var e=b._readEllipse(arguments),n=e.radius;return t("ellipse",e.center,n.multiply(2),n,arguments)},_readEllipse:function(t){var n,i;if(e.hasNamed(t,"radius"))n=h.readNamed(t,"center"),i=c.readNamed(t,"radius");else{var r=f.readNamed(t,"rectangle");n=r.getCenter(!0),i=r.getSize(!0).divide(2)}return{center:n,radius:i}}}}}),C=y.extend({_class:"Raster",_applyMatrix:!1,_canApplyMatrix:!1,_boundsGetter:"getBounds",_boundsSelected:!0,_serializeFields:{source:null},initialize:function(e,n){this._initialize(e,n!==t&&h.read(arguments,1))||("string"==typeof e?this.setSource(e):this.setImage(e)),this._size||(this._size=new c)},_equals:function(t){return this.getSource()===t.getSource()},clone:function(t){var e=new C(y.NO_INSERT),n=this._image,i=this._canvas;if(n)e.setImage(n);else if(i){var r=Q.getCanvas(this._size);r.getContext("2d").drawImage(i,0,0),e.setCanvas(r)}return this._clone(e,t)},getSize:function(){var t=this._size;return new d(t.width,t.height,this,"setSize")},setSize:function(){var t=c.read(arguments);if(!this._size.equals(t)){var e=this.getElement();this.setCanvas(Q.getCanvas(t)),e&&this.getContext(!0).drawImage(e,0,0,t.width,t.height)}},getWidth:function(){return this._size.width},getHeight:function(){return this._size.height},isEmpty:function(){return 0==this._size.width&&0==this._size.height},getPpi:function(){var t=this._matrix,e=new h(0,0).transform(t),n=new h(1,0).transform(t).subtract(e),i=new h(0,1).transform(t).subtract(e);return new c(72/n.getLength(),72/i.getLength())},getImage:function(){return this._image},setImage:function(t){this._canvas&&Q.release(this._canvas),t.getContext?(this._image=null,this._canvas=t):(this._image=t,this._canvas=null),this._size=new c(t.naturalWidth||t.width,t.naturalHeight||t.height),this._context=null,this._changed(521)},getCanvas:function(){if(!this._canvas){var t=Q.getContext(this._size);try{this._image&&t.drawImage(this._image,0,0),this._canvas=t.canvas}catch(e){Q.release(t)}}return this._canvas},setCanvas:"#setImage",getContext:function(t){return this._context||(this._context=this.getCanvas().getContext("2d")),t&&(this._image=null,this._changed(513)),this._context},setContext:function(t){this._context=t},getSource:function(){return this._image&&this._image.src||this.toDataURL()},setSource:function(t){function e(){var t=i.getView();t&&(paper=t._scope,i.setImage(n),i.fire("load"),t.update())}var n,i=this;n=document.getElementById(t)||new Image,n.naturalWidth&&n.naturalHeight?setTimeout(e,0):(q.add(n,{load:e}),n.src||(n.src=t)),this.setImage(n)},getElement:function(){return this._canvas||this._image},getSubCanvas:function(t){var t=f.read(arguments),e=Q.getContext(t.getSize());return e.drawImage(this.getCanvas(),t.x,t.y,t.width,t.height,0,0,t.width,t.height),e.canvas},getSubRaster:function(t){var t=f.read(arguments),e=new C(y.NO_INSERT);return e.setCanvas(this.getSubCanvas(t)),e.translate(t.getCenter().subtract(this.getSize().divide(2))),e._matrix.preConcatenate(this._matrix),e.insertAbove(this),e},toDataURL:function(){var t=this._image&&this._image.src;if(/^data:/.test(t))return t;var e=this.getCanvas();return e?e.toDataURL():null},drawImage:function(t){var e=h.read(arguments,1);this.getContext(!0).drawImage(t,e.x,e.y)},getAverageColor:function(t){var n,i;t?t instanceof A?(i=t,n=t.getBounds()):t.width?n=new f(t):t.x&&(n=new f(t.x-.5,t.y-.5,1,1)):n=this.getBounds();var r=32,s=Math.min(n.width,r),a=Math.min(n.height,r),o=C._sampleContext;o?o.clearRect(0,0,r+1,r+1):o=C._sampleContext=Q.getContext(new c(r)),o.save();var h=(new g).scale(s/n.width,a/n.height).translate(-n.x,-n.y);h.applyToContext(o),i&&i.draw(o,new e({clip:!0,transforms:[h]})),this._matrix.applyToContext(o),o.drawImage(this.getElement(),-this._size.width/2,-this._size.height/2),o.restore();for(var u=o.getImageData(.5,.5,Math.ceil(s),Math.ceil(a)).data,l=[0,0,0],d=0,_=0,p=u.length;p>_;_+=4){var v=u[_+3];d+=v,v/=255,l[0]+=u[_]*v,l[1]+=u[_+1]*v,l[2]+=u[_+2]*v}for(var _=0;3>_;_++)l[_]/=d;return d?D.read(l):null},getPixel:function(t){var t=h.read(arguments),e=this.getContext().getImageData(t.x,t.y,1,1).data;return new D("rgb",[e[0]/255,e[1]/255,e[2]/255],e[3]/255)},setPixel:function(){var t=h.read(arguments),e=D.read(arguments),n=e._convert("rgb"),i=e._alpha,r=this.getContext(!0),s=r.createImageData(1,1),a=s.data;a[0]=255*n[0],a[1]=255*n[1],a[2]=255*n[2],a[3]=null!=i?255*i:255,r.putImageData(s,t.x,t.y)},createImageData:function(){var t=c.read(arguments);return this.getContext().createImageData(t.width,t.height)},getImageData:function(t){var t=f.read(arguments);return t.isEmpty()&&(t=new f(this._size)),this.getContext().getImageData(t.x,t.y,t.width,t.height)},setImageData:function(t){var e=h.read(arguments,1);this.getContext(!0).putImageData(t,e.x,e.y)},_getBounds:function(t,e){var n=new f(this._size).setCenter(0,0);return e?e._transformBounds(n):n},_hitTest:function(t){if(this._contains(t)){var e=this;return new P("pixel",e,{offset:t.add(e._size.divide(2)).round(),color:{get:function(){return e.getPixel(this.offset)}}})}},_draw:function(t){var e=this.getElement();e&&(t.globalAlpha=this._opacity,t.drawImage(e,-this._size.width/2,-this._size.height/2))},_canComposite:function(){return!0}}),S=y.extend({_class:"PlacedSymbol",_applyMatrix:!1,_canApplyMatrix:!1,_boundsGetter:{getBounds:"getStrokeBounds"},_boundsSelected:!0,_serializeFields:{symbol:null},initialize:function(e,n){this._initialize(e,n!==t&&h.read(arguments,1))||this.setSymbol(e instanceof m?e:new m(e))},_equals:function(t){return this._symbol===t._symbol},getSymbol:function(){return this._symbol},setSymbol:function(t){this._symbol=t,this._changed(9)},clone:function(t){var e=new S(y.NO_INSERT);return e.setSymbol(this._symbol),this._clone(e,t)},isEmpty:function(){return this._symbol._definition.isEmpty()},_getBounds:function(t,e,n){return this.symbol._definition._getCachedBounds(t,e,n)},_hitTest:function(t,e){var n=this._symbol._definition.hitTest(t,e);return n&&(n.item=this),n},_draw:function(t,e){this.symbol._definition.draw(t,e)}}),P=e.extend({_class:"HitResult",initialize:function(t,e,n){this.type=t,this.item=e,n&&(n.enumerable=!0,this.inject(n))},statics:{getOptions:function(t){return t&&t._merged?t:new e({type:null,tolerance:paper.settings.hitTolerance,fill:!t,stroke:!t,segments:!t,handles:!1,ends:!1,center:!1,bounds:!1,guides:!1,selected:!1,_merged:!0},t)}}}),k=e.extend({_class:"Segment",beans:!0,initialize:function(e,n,i,r,s,a){var o,h,u,l=arguments.length;0===l||(1===l?e.point?(o=e.point,h=e.handleIn,u=e.handleOut):o=e:2===l&&"number"==typeof e?o=arguments:3>=l?(o=e,h=n,u=i):(o=e!==t?[e,n]:null,h=i!==t?[i,r]:null,u=s!==t?[s,a]:null)),new M(o,this,"_point"),new M(h,this,"_handleIn"),new M(u,this,"_handleOut")},_serialize:function(t){return e.serialize(this.isLinear()?this._point:[this._point,this._handleIn,this._handleOut],t,!0)},_changed:function(t){var e=this._path;if(e){var n,i,r=e._curves,s=this._index;r&&(t&&t!==this._point&&t!==this._handleIn||!(n=r[s-1]||e._closed&&r[r.length-1])||n._changed(),t&&t!==this._point&&t!==this._handleOut||!(i=r[s])||i._changed()),e._changed(25)}},getPoint:function(){return this._point},setPoint:function(){var t=h.read(arguments);this._point.set(t.x,t.y)},getHandleIn:function(){return this._handleIn},setHandleIn:function(){var t=h.read(arguments);this._handleIn.set(t.x,t.y)},getHandleOut:function(){return this._handleOut},setHandleOut:function(){var t=h.read(arguments);this._handleOut.set(t.x,t.y)},isLinear:function(){return this._handleIn.isZero()&&this._handleOut.isZero()},setLinear:function(){this._handleIn.set(0,0),this._handleOut.set(0,0)},isColinear:function(t){var e=this.getNext(),n=t.getNext();return this._handleOut.isZero()&&e._handleIn.isZero()&&t._handleOut.isZero()&&n._handleIn.isZero()&&e._point.subtract(this._point).isColinear(n._point.subtract(t._point))},isOrthogonal:function(){var t=this.getPrevious(),e=this.getNext();return t._handleOut.isZero()&&this._handleIn.isZero()&&this._handleOut.isZero()&&e._handleIn.isZero()&&this._point.subtract(t._point).isOrthogonal(e._point.subtract(this._point))},isArc:function(){var t=this.getNext(),e=this._handleOut,n=t._handleIn,i=.5522847498307936;if(e.isOrthogonal(n)){var r=this._point,s=t._point,a=new p(r,e,!0).intersect(new p(s,n,!0),!0);return a&&o.isZero(e.getLength()/a.subtract(r).getLength()-i)&&o.isZero(n.getLength()/a.subtract(s).getLength()-i)}return!1},_selectionState:0,isSelected:function(t){var e=this._selectionState;return t?t===this._point?!!(4&e):t===this._handleIn?!!(1&e):t===this._handleOut?!!(2&e):!1:!!(7&e)},setSelected:function(t,e){var n=this._path,t=!!t,i=this._selectionState,r=i,s=e?e===this._point?4:e===this._handleIn?1:e===this._handleOut?2:0:7;t?i|=s:i&=~s,this._selectionState=i,n&&i!==r&&(n._updateSelection(this,r,i),n._changed(129))},getIndex:function(){return this._index!==t?this._index:null},getPath:function(){return this._path||null},getCurve:function(){var t=this._path,e=this._index;return t?(e>0&&!t._closed&&e===t._segments.length-1&&e--,t.getCurves()[e]||null):null},getLocation:function(){var t=this.getCurve();return t?new I(t,this===t._segment1?0:1):null},getNext:function(){var t=this._path&&this._path._segments;return t&&(t[this._index+1]||this._path._closed&&t[0])||null},getPrevious:function(){var t=this._path&&this._path._segments;return t&&(t[this._index-1]||this._path._closed&&t[t.length-1])||null},reverse:function(){return new k(this._point,this._handleOut,this._handleIn)},remove:function(){return this._path?!!this._path.removeSegment(this._index):!1},clone:function(){return new k(this._point,this._handleIn,this._handleOut)},equals:function(t){return t===this||t&&this._class===t._class&&this._point.equals(t._point)&&this._handleIn.equals(t._handleIn)&&this._handleOut.equals(t._handleOut)||!1},toString:function(){var t=["point: "+this._point];return this._handleIn.isZero()||t.push("handleIn: "+this._handleIn),this._handleOut.isZero()||t.push("handleOut: "+this._handleOut),"{ "+t.join(", ")+" }"},transform:function(t){this._transformCoordinates(t,Array(6),!0),this._changed()},_transformCoordinates:function(t,e,n){var i=this._point,r=n&&this._handleIn.isZero()?null:this._handleIn,s=n&&this._handleOut.isZero()?null:this._handleOut,a=i._x,o=i._y,h=2;return e[0]=a,e[1]=o,r&&(e[h++]=r._x+a,e[h++]=r._y+o),s&&(e[h++]=s._x+a,e[h++]=s._y+o),t&&(t._transformCoordinates(e,0,e,0,h/2),a=e[0],o=e[1],n?(i._x=a,i._y=o,h=2,r&&(r._x=e[h++]-a,r._y=e[h++]-o),s&&(s._x=e[h++]-a,s._y=e[h++]-o)):(r||(e[h++]=a,e[h++]=o),s||(e[h++]=a,e[h++]=o))),e}}),M=h.extend({initialize:function(e,n,i){var r,s,a;if(e)if((r=e[0])!==t)s=e[1];else{var o=e;(r=o.x)===t&&(o=h.read(arguments),r=o.x),s=o.y,a=o.selected}else r=s=0;this._x=r,this._y=s,this._owner=n,n[i]=this,a&&this.setSelected(!0)},set:function(t,e){return this._x=t,this._y=e,this._owner._changed(this),this},_serialize:function(t){var e=t.formatter,n=e.number(this._x),i=e.number(this._y);return this.isSelected()?{x:n,y:i,selected:!0}:[n,i]},getX:function(){return this._x},setX:function(t){this._x=t,this._owner._changed(this)},getY:function(){return this._y},setY:function(t){this._y=t,this._owner._changed(this)},isZero:function(){return o.isZero(this._x)&&o.isZero(this._y)},setSelected:function(t){this._owner.setSelected(t,this)},isSelected:function(){return this._owner.isSelected(this)}}),z=e.extend({_class:"Curve",initialize:function(t,e,n,i,r,s,a,o){var h=arguments.length;if(3===h)this._path=t,this._segment1=e,this._segment2=n;else if(0===h)this._segment1=new k,this._segment2=new k;else if(1===h)this._segment1=new k(t.segment1),this._segment2=new k(t.segment2);else if(2===h)this._segment1=new k(t),this._segment2=new k(e);else{var u,l,c,d;4===h?(u=t,l=e,c=n,d=i):8===h&&(u=[t,e],d=[a,o],l=[n-t,i-e],c=[r-a,s-o]),this._segment1=new k(u,null,l),this._segment2=new k(d,c,null)}},_changed:function(){this._length=this._bounds=t},getPoint1:function(){return this._segment1._point},setPoint1:function(){var t=h.read(arguments);this._segment1._point.set(t.x,t.y)},getPoint2:function(){return this._segment2._point},setPoint2:function(){var t=h.read(arguments);this._segment2._point.set(t.x,t.y)},getHandle1:function(){return this._segment1._handleOut},setHandle1:function(){var t=h.read(arguments);this._segment1._handleOut.set(t.x,t.y)},getHandle2:function(){return this._segment2._handleIn},setHandle2:function(){var t=h.read(arguments);this._segment2._handleIn.set(t.x,t.y)},getSegment1:function(){return this._segment1},getSegment2:function(){return this._segment2},getPath:function(){return this._path},getIndex:function(){return this._segment1._index},getNext:function(){var t=this._path&&this._path._curves;return t&&(t[this._segment1._index+1]||this._path._closed&&t[0])||null},getPrevious:function(){var t=this._path&&this._path._curves;return t&&(t[this._segment1._index-1]||this._path._closed&&t[t.length-1])||null},isSelected:function(){return this.getPoint1().isSelected()&&this.getHandle2().isSelected()&&this.getHandle2().isSelected()&&this.getPoint2().isSelected()},setSelected:function(t){this.getPoint1().setSelected(t),this.getHandle1().setSelected(t),this.getHandle2().setSelected(t),this.getPoint2().setSelected(t)},getValues:function(t){return z.getValues(this._segment1,this._segment2,t)},getPoints:function(){for(var t=this.getValues(),e=[],n=0;8>n;n+=2)e.push(new h(t[n],t[n+1]));return e},getLength:function(){return null==this._length&&(this._length=this.isLinear()?this._segment2._point.getDistance(this._segment1._point):z.getLength(this.getValues(),0,1)),this._length},getArea:function(){return z.getArea(this.getValues())},getPart:function(t,e){return new z(z.getPart(this.getValues(),t,e))},getPartLength:function(t,e){return z.getLength(this.getValues(),t,e)},isLinear:function(){return this._segment1._handleOut.isZero()&&this._segment2._handleIn.isZero()},isHorizontal:function(){return this.isLinear()&&o.isZero(this._segment1._point._y-this._segment2._point._y)},getIntersections:function(t){return z.getIntersections(this.getValues(),t.getValues(),this,t,[])},_getParameter:function(e,n){return n?e:e&&e.curve===this?e.parameter:e===t&&n===t?.5:this.getParameterAt(e,0)},divide:function(t,e,n){var i=this._getParameter(t,e),r=1e-5,s=null;if(i>r&&1-r>i){var a=z.subdivide(this.getValues(),i),o=n?!1:this.isLinear(),u=a[0],l=a[1];o||(this._segment1._handleOut.set(u[2]-u[0],u[3]-u[1]),this._segment2._handleIn.set(l[4]-l[6],l[5]-l[7]));var c=u[6],d=u[7],f=new k(new h(c,d),!o&&new h(u[4]-c,u[5]-d),!o&&new h(l[2]-c,l[3]-d));if(this._path)this._segment1._index>0&&0===this._segment2._index?this._path.add(f):this._path.insert(this._segment2._index,f),s=this;else{var _=this._segment2;this._segment2=f,s=new z(f,_)}}return s},split:function(t,e){return this._path?this._path.split(this._segment1._index,this._getParameter(t,e)):null},reverse:function(){return new z(this._segment2.reverse(),this._segment1.reverse())},remove:function(){var t=!1;if(this._path){var e=this._segment2,n=e._handleOut;t=e.remove(),t&&this._segment1._handleOut.set(n.x,n.y)}return t},clone:function(){return new z(this._segment1,this._segment2)},toString:function(){var t=["point1: "+this._segment1._point];return this._segment1._handleOut.isZero()||t.push("handle1: "+this._segment1._handleOut),this._segment2._handleIn.isZero()||t.push("handle2: "+this._segment2._handleIn),t.push("point2: "+this._segment2._point),"{ "+t.join(", ")+" }"},statics:{getValues:function(t,e,n){var i=t._point,r=t._handleOut,s=e._handleIn,a=e._point,o=[i._x,i._y,i._x+r._x,i._y+r._y,a._x+s._x,a._y+s._y,a._x,a._y];return n&&n._transformCoordinates(o,0,o,0,6),o},evaluate:function(t,e,n){var i,r,s=t[0],a=t[1],o=t[2],u=t[3],l=t[4],c=t[5],d=t[6],f=t[7],_=1e-5;if(0===n&&(_>e||e>1-_)){var g=_>e;i=g?s:d,r=g?a:f}else{var p=3*(o-s),v=3*(l-o)-p,m=d-s-p-v,y=3*(u-a),w=3*(c-u)-y,x=f-a-y-w;if(0===n)i=((m*e+v)*e+p)*e+s,r=((x*e+w)*e+y)*e+a;else if(_>e&&o===s&&u===a||e>1-_&&l===d&&c===f?(i=d-s,r=f-a):_>e?(i=p,r=y):e>1-_?(i=3*(d-l),r=3*(f-c)):(i=(3*m*e+2*v)*e+p,r=(3*x*e+2*w)*e+y),3===n){var b=6*m*e+2*v,C=6*x*e+2*w;return(i*C-r*b)/Math.pow(i*i+r*r,1.5)}}return 2===n?new h(r,-i):new h(i,r)},subdivide:function(e,n){var i=e[0],r=e[1],s=e[2],a=e[3],o=e[4],h=e[5],u=e[6],l=e[7];n===t&&(n=.5);var c=1-n,d=c*i+n*s,f=c*r+n*a,_=c*s+n*o,g=c*a+n*h,p=c*o+n*u,v=c*h+n*l,m=c*d+n*_,y=c*f+n*g,w=c*_+n*p,x=c*g+n*v,b=c*m+n*w,C=c*y+n*x;return[[i,r,d,f,m,y,b,C],[b,C,w,x,p,v,u,l]]},solveCubic:function(t,e,n,i,r,s){var a=t[e],h=t[e+2],u=t[e+4],l=t[e+6],c=3*(h-a),d=3*(u-h)-c,f=l-a-c-d;return o.solveCubic(f,d,c,a-n,i,r,s)},getParameterOf:function(t,e,n){var i=1e-5;if(Math.abs(t[0]-e)<i&&Math.abs(t[1]-n)<i)return 0;if(Math.abs(t[6]-e)<i&&Math.abs(t[7]-n)<i)return 1;for(var r,s,a=[],o=[],h=z.solveCubic(t,0,e,a),u=z.solveCubic(t,1,n,o),l=0;-1==h||h>l;)if(-1==h||(r=a[l++])>=0&&1>=r){for(var c=0;-1==u||u>c;)if((-1==u||(s=o[c++])>=0&&1>=s)&&(-1==h?r=s:-1==u&&(s=r),Math.abs(r-s)<i))return.5*(r+s);if(-1==h)break}return null},getPart:function(t,e,n){return e>0&&(t=z.subdivide(t,e)[1]),1>n&&(t=z.subdivide(t,(n-e)/(1-e))[0]),t},isLinear:function(t){var e=o.isZero;return e(t[0]-t[2])&&e(t[1]-t[3])&&e(t[4]-t[6])&&e(t[5]-t[7])},isFlatEnough:function(t,e){var n=t[0],i=t[1],r=t[2],s=t[3],a=t[4],o=t[5],h=t[6],u=t[7],l=3*r-2*n-h,c=3*s-2*i-u,d=3*a-2*h-n,f=3*o-2*u-i;return Math.max(l*l,d*d)+Math.max(c*c,f*f)<10*e*e},getArea:function(t){var e=t[0],n=t[1],i=t[2],r=t[3],s=t[4],a=t[5],o=t[6],h=t[7];return(3*r*e-1.5*r*s-1.5*r*o-3*n*i-1.5*n*s-.5*n*o+1.5*a*e+1.5*a*i-3*a*o+.5*h*e+1.5*h*i+3*h*s)/10},getBounds:function(t){for(var e=t.slice(0,2),n=e.slice(),i=[0,0],r=0;2>r;r++)z._addBounds(t[r],t[r+2],t[r+4],t[r+6],r,0,e,n,i);return new f(e[0],e[1],n[0]-e[0],n[1]-e[1])},_addBounds:function(t,e,n,i,r,s,a,h,u){function l(t,e){var n=t-e,i=t+e;n<a[r]&&(a[r]=n),i>h[r]&&(h[r]=i)}var c=3*(e-n)-t+i,d=2*(t+n)-4*e,f=e-t,_=o.solveQuadratic(c,d,f,u),g=1e-5,p=1-g;l(i,0);for(var v=0;_>v;v++){var m=u[v],y=1-m;m>g&&p>m&&l(y*y*y*t+3*y*y*m*e+3*y*m*m*n+m*m*m*i,s)}}}},e.each(["getBounds","getStrokeBounds","getHandleBounds","getRoughBounds"],function(t){this[t]=function(){this._bounds||(this._bounds={});var e=this._bounds[t];return e||(e=this._bounds[t]=T[t]([this._segment1,this._segment2],!1,this._path.getStyle())),e.clone()}},{}),e.each(["getPoint","getTangent","getNormal","getCurvature"],function(t,e){this[t+"At"]=function(t,n){var i=this.getValues();return z.evaluate(i,n?t:z.getParameterAt(i,t,0),e)},this[t]=function(t){return z.evaluate(this.getValues(),t,e)}},{getParameterAt:function(e,n){return z.getParameterAt(this.getValues(),e,n!==t?n:0>e?1:0)},getParameterOf:function(t){var t=h.read(arguments);return z.getParameterOf(this.getValues(),t.x,t.y)},getLocationAt:function(t,e){return e||(t=this.getParameterAt(t)),new I(this,t)},getLocationOf:function(t){var t=h.read(arguments),e=this.getParameterOf(t);return null!=e?new I(this,e):null},getNearestLocation:function(t){function e(e){if(e>=0&&1>=e){var i=t.getDistance(z.evaluate(n,e,0),!0);if(r>i)return r=i,s=e,!0}}for(var t=h.read(arguments),n=this.getValues(),i=100,r=1/0,s=0,a=0;i>=a;a++)e(a/i);for(var o=1/(2*i);o>1e-5;)e(s-o)||e(s+o)||(o/=2);var u=z.evaluate(n,s,0);return new I(this,s,u,null,null,null,t.getDistance(u))},getNearestPoint:function(t){var t=h.read(arguments);return this.getNearestLocation(t).getPoint()}}),new function(){function e(t){var e=t[0],n=t[1],i=t[2],r=t[3],s=t[4],a=t[5],o=t[6],h=t[7],u=9*(i-s)+3*(o-e),l=6*(e+s)-12*i,c=3*(i-e),d=9*(r-a)+3*(h-n),f=6*(n+a)-12*r,_=3*(r-n);return function(t){var e=(u*t+l)*t+c,n=(d*t+f)*t+_;return Math.sqrt(e*e+n*n)}}function n(t,e){return Math.max(2,Math.min(16,Math.ceil(32*Math.abs(e-t))))}return{statics:!0,getLength:function(i,r,s){r===t&&(r=0),s===t&&(s=1);var a=o.isZero;if(0===r&&1===s&&a(i[0]-i[2])&&a(i[1]-i[3])&&a(i[6]-i[4])&&a(i[7]-i[5])){var h=i[6]-i[0],u=i[7]-i[1];return Math.sqrt(h*h+u*u)}var l=e(i);return o.integrate(l,r,s,n(r,s))},getParameterAt:function(t,i,r){function s(t){var e=n(r,t);return f+=t>r?o.integrate(l,r,t,e):-o.integrate(l,t,r,e),r=t,f-i}if(0===i)return r;var a=i>0,h=a?r:0,u=a?1:r,i=Math.abs(i),l=e(t),c=o.integrate(l,h,u,n(h,u));if(i>=c)return a?u:h;var d=i/c,f=0;return o.findRoot(s,l,a?h+d:u-d,h,u,16,1e-5)}}},new function(){function t(t,e,n,i,r,s,a,o){var h=new I(n,i,r,s,a,o);(!e||e(h))&&t.push(h)}function e(r,s,a,o,h,u,l,c,d,f,_,g,v){if(!(v>20)){var m,y,w,x=s[0],b=s[1],C=s[6],S=s[7],P=1e-5,k=1e-9,M=p.getSignedDistance,I=M(x,b,C,S,s[2],s[3])||0,A=M(x,b,C,S,s[4],s[5])||0,T=I*A>0?.75:4/9,O=T*Math.min(0,I,A),L=T*Math.max(0,I,A),E=M(x,b,C,S,r[0],r[1]),N=M(x,b,C,S,r[2],r[3]),j=M(x,b,C,S,r[4],r[5]),D=M(x,b,C,S,r[6],r[7]);if(x===C&&k>=f-d&&v>3)m=(c+l)/2,y=m,w=0;else{var B,R,F=n(E,N,j,D),V=F[0],q=F[1];if(B=i(V,q,O,L),V.reverse(),q.reverse(),R=i(V,q,O,L),null==B||null==R)return!1;r=z.getPart(r,B,R),w=R-B,m=c*B+l*(1-B),y=c*R+l*(1-R)}if(_>.8&&w>.8)if(y-m>f-d){var Z=z.subdivide(r,.5),H=m+(y-m)/2;e(s,Z[0],o,a,h,u,d,f,m,H,w,!g,++v),e(s,Z[1],o,a,h,u,d,f,H,y,w,!g,v)}else{var Z=z.subdivide(s,.5),H=d+(f-d)/2;e(Z[0],r,o,a,h,u,d,H,m,y,w,!g,++v),e(Z[1],r,o,a,h,u,H,f,m,y,w,!g,v)}else if(Math.max(f-d,y-m)<P){var U=m+(y-m)/2,W=d+(f-d)/2;g?t(h,u,o,W,z.evaluate(s,W,0),a,U,z.evaluate(r,U,0)):t(h,u,a,U,z.evaluate(r,U,0),o,W,z.evaluate(s,W,0))}else e(s,r,o,a,h,u,d,f,m,y,w,!g,++v)}}function n(t,e,n,i){var r,s=[0,t],a=[1/3,e],o=[2/3,n],h=[1,i],u=p.getSignedDistance,l=u(0,t,1,i,1/3,e),c=u(0,t,1,i,2/3,n),d=!1;if(0>l*c)r=[[s,a,h],[s,o,h]],d=0>l;else{var f,_=0,g=0===l||0===c;Math.abs(l)>Math.abs(c)?(f=a,_=(i-n-(i-t)/3)*(2*(i-n)-i+e)/3):(f=o,_=(e-t+(t-i)/3)*(-2*(t-e)+t-n)/3),r=0>_||g?[[s,f,h],[s,h]]:[[s,a,o,h],[s,h]],d=l?0>l:0>c}return d?r.reverse():r}function i(t,e,n,i){for(var r,s,a,o,h,u=null,l=0,c=e.length-1;c>l;l++){if(a=e[l][1],h=e[l+1][1],h>a)r=null;else{if(!(i>=h))continue;s=e[l][0],o=e[l+1][0],r=s+(i-a)*(o-s)/(h-a)}break}t[0][1]<=i&&(r=t[0][0]);for(var l=0,c=t.length-1;c>l;l++){if(a=t[l][1],h=t[l+1][1],a>=n)u=r;else if(a>h)u=null;else{if(!(h>=n))continue;s=t[l][0],o=t[l+1][0],u=s+(n-a)*(o-s)/(h-a)}break}return u}function r(e,n,i,r,s,a){for(var o=z.isLinear(e),h=o?n:e,u=o?e:n,l=u[0],c=u[1],d=u[6],f=u[7],_=d-l,g=f-c,p=Math.atan2(-g,_),v=Math.sin(p),m=Math.cos(p),y=_*m-g*v,w=[0,0,0,0,y,0,y,0],x=[],b=0;8>b;b+=2){var C=h[b]-l,S=h[b+1]-c;x.push(C*m-S*v,S*m+C*v)}for(var P=[],k=z.solveCubic(x,1,0,P,0,1),b=0;k>b;b++){var M=P[b],C=z.evaluate(x,M,0).x;if(C>=0&&y>=C){var I=z.getParameterOf(w,C,0),A=o?I:M,T=o?M:I;t(s,a,i,A,z.evaluate(e,A,0),r,T,z.evaluate(n,T,0))}}}function s(e,n,i,r,s,a){var o=p.intersect(e[0],e[1],e[6],e[7],n[0],n[1],n[6],n[7]);if(o){var h=o.x,u=o.y;t(s,a,i,z.getParameterOf(e,h,u),o,r,z.getParameterOf(n,h,u),o)}}return{statics:{getIntersections:function(t,n,i,a,o,h){var u=z.isLinear(t),l=z.isLinear(n);return(u&&l?s:u||l?r:e)(t,n,i,a,o,h,0,1,0,1,0,!1,0),o}}}}),I=e.extend({_class:"CurveLocation",beans:!0,initialize:function me(t,e,n,i,r,s,a){this._id=me._id=(me._id||0)+1,this._curve=t,this._segment1=t._segment1,this._segment2=t._segment2,this._parameter=e,this._point=n,this._curve2=i,this._parameter2=r,this._point2=s,this._distance=a},getSegment:function(t){if(!this._segment){var e=this.getCurve(),n=this.getParameter();if(1===n)this._segment=e._segment2;else if(0===n||t)this._segment=e._segment1;else{if(null==n)return null;this._segment=e.getPartLength(0,n)<e.getPartLength(n,1)?e._segment1:e._segment2}}return this._segment},getCurve:function(t){return(!this._curve||t)&&(this._curve=this._segment1.getCurve(),null==this._curve.getParameterOf(this._point)&&(this._curve=this._segment2.getPrevious().getCurve())),this._curve},getIntersection:function(){var t=this._intersection;if(!t&&this._curve2){var e=this._parameter2;this._intersection=t=new I(this._curve2,e,this._point2||this._point,this),t._intersection=this}return t},getPath:function(){var t=this.getCurve();return t&&t._path},getIndex:function(){var t=this.getCurve();return t&&t.getIndex()},getOffset:function(){var t=this.getPath();return t&&t._getOffset(this)},getCurveOffset:function(){var t=this.getCurve(),e=this.getParameter();return null!=e&&t&&t.getPartLength(0,e)},getParameter:function(t){if((null==this._parameter||t)&&this._point){var e=this.getCurve(t&&this._point);this._parameter=e&&e.getParameterOf(this._point)}return this._parameter},getPoint:function(t){if((!this._point||t)&&null!=this._parameter){var e=this.getCurve();this._point=e&&e.getPointAt(this._parameter,!0)}return this._point},getTangent:function(){var t=this.getParameter(),e=this.getCurve();return null!=t&&e&&e.getTangentAt(t,!0)},getNormal:function(){var t=this.getParameter(),e=this.getCurve();return null!=t&&e&&e.getNormalAt(t,!0)},getDistance:function(){return this._distance},divide:function(){var t=this.getCurve(!0);return t&&t.divide(this.getParameter(!0),!0)},split:function(){var t=this.getCurve(!0);return t&&t.split(this.getParameter(!0),!0)},equals:function(t){var e=o.isZero;return this===t||t&&this._curve===t._curve&&this._curve2===t._curve2&&e(this._parameter-t._parameter)&&e(this._parameter2-t._parameter2)||!1},toString:function(){var t=[],e=this.getPoint(),n=a.instance;e&&t.push("point: "+e);var i=this.getIndex();null!=i&&t.push("index: "+i);var r=this.getParameter();return null!=r&&t.push("parameter: "+n.number(r)),null!=this._distance&&t.push("distance: "+n.number(this._distance)),"{ "+t.join(", ")+" }"}}),A=y.extend({_class:"PathItem",initialize:function(){},getIntersections:function(e,n){function i(t,e){var n=t.getPath(),i=e.getPath();return n===i?t.getIndex()+t.getParameter()-(e.getIndex()+e.getParameter()):n._id-i._id}if(this===e&&(e=null),e&&!this.getBounds().touches(e.getBounds()))return[];for(var r=[],s=this.getCurves(),a=e?e.getCurves():s,o=this._matrix.orNullIfIdentity(),h=e?e._matrix.orNullIfIdentity():o,u=s.length,l=e?a.length:u,c=[],d=1e-11,f=1-1e-11,_=0;l>_;_++)c[_]=a[_].getValues(h);for(var _=0;u>_;_++){var g=s[_],v=e?g.getValues(o):c[_];if(!e){var m=g.getSegment1(),y=g.getSegment2(),w=m._handleOut,x=y._handleIn;if(new p(m._point.subtract(w),w.multiply(2),!0).intersect(new p(y._point.subtract(x),x.multiply(2),!0),!1)){var b=z.subdivide(v);z.getIntersections(b[0],b[1],g,g,r,function(e){return e._parameter<=f?(e._parameter/=2,e._parameter2=.5+e._parameter2/2,!0):t})}}for(var C=e?0:_+1;l>C;C++)z.getIntersections(v,c[C],g,a[C],r,!e&&(C===_+1||C===l-1&&0===_)&&function(t){var e=t._parameter;return e>=d&&f>=e})}for(var S=r.length-1,_=S;_>=0;_--){var P=r[_],k=P._curve.getNext(),M=P._curve2.getNext();k&&P._parameter>=f&&(P._parameter=0,P._curve=k),M&&P._parameter2>=f&&(P._parameter2=0,P._curve2=M)}if(S>0){r.sort(i);for(var _=S;_>=0;_--)r[_].equals(r[0===_?S:_-1])&&(r.splice(_,1),S--)}if(n){for(var _=S;_>=0;_--)r.push(r[_].getIntersection());r.sort(i)}return r},setPathData:function(t){function e(t,e){var n=+i[t];return o&&(n+=u[e]),n}function n(t){return new h(e(t,"x"),e(t+1,"y"))}var i,r,s,a=t.match(/[mlhvcsqtaz][^mlhvcsqtaz]*/gi),o=!1,u=new h,l=new h;this.clear();for(var d=0,f=a.length;f>d;d++){var _=a[d],g=_[0],p=g.toLowerCase();i=_.match(/[+-]?(?:\d*\.\d+|\d+\.?)(?:[eE][+-]?\d+)?/g);var v=i&&i.length;switch(o=g===p,"z"!==r||/[mz]/.test(p)||this.moveTo(u=l),p){case"m":case"l":var m="m"===p;m&&r&&"z"!==r&&this.closePath(!0);for(var y=0;v>y;y+=2)this[0===y&&m?"moveTo":"lineTo"](u=n(y));s=u,m&&(l=u);break;case"h":case"v":for(var w="h"===p?"x":"y",y=0;v>y;y++)u[w]=e(y,w),this.lineTo(u);s=u;break;case"c":for(var y=0;v>y;y+=6)this.cubicCurveTo(n(y),s=n(y+2),u=n(y+4));break;case"s":for(var y=0;v>y;y+=4)this.cubicCurveTo(/[cs]/.test(r)?u.multiply(2).subtract(s):u,s=n(y),u=n(y+2)),r=p;break;case"q":for(var y=0;v>y;y+=4)this.quadraticCurveTo(s=n(y),u=n(y+2));break;case"t":for(var y=0;v>y;y+=2)this.quadraticCurveTo(s=/[qt]/.test(r)?u.multiply(2).subtract(s):u,u=n(y)),r=p;break;case"a":for(var y=0;v>y;y+=7)this.arcTo(u=n(y+5),new c(+i[0],+i[1]),+i[2],+i[4],+i[3]);break;case"z":this.closePath(!0)}r=p}},_canComposite:function(){return!(this.hasFill()&&this.hasStroke())},_contains:function(t){var e=this._getWinding(t,!1,!0);return!!("evenodd"===this.getWindingRule()?1&e:e)}}),T=A.extend({_class:"Path",_serializeFields:{segments:[],closed:!1},initialize:function(e){this._closed=!1,this._segments=[];var n=Array.isArray(e)?"object"==typeof e[0]?e:arguments:!e||e.size!==t||e.x===t&&e.point===t?null:arguments;n&&n.length>0?this.setSegments(n):(this._curves=t,this._selectedSegmentState=0,n||"string"!=typeof e||(this.setPathData(e),e=null)),this._initialize(!n&&e)},_equals:function(t){return e.equals(this._segments,t._segments)},clone:function(e){var n=new T(y.NO_INSERT);return n.setSegments(this._segments),n._closed=this._closed,this._clockwise!==t&&(n._clockwise=this._clockwise),this._clone(n,e)},_changed:function ye(e){if(ye.base.call(this,e),8&e){var n=this._parent;if(n&&(n._currentPath=t),this._length=this._clockwise=t,this._curves&&!(16&e))for(var i=0,r=this._curves.length;r>i;i++)this._curves[i]._changed();this._monoCurves=t}else 32&e&&(this._bounds=t)},getStyle:function(){var t=this._parent;return(t instanceof O?t:this)._style},getSegments:function(){return this._segments},setSegments:function(e){var n=this.isFullySelected();this._segments.length=0,this._selectedSegmentState=0,this._curves=t,e&&e.length>0&&this._add(k.readAll(e)),n&&this.setFullySelected(!0)},getFirstSegment:function(){return this._segments[0]},getLastSegment:function(){return this._segments[this._segments.length-1]},getCurves:function(){var t=this._curves,e=this._segments;if(!t){var n=this._countCurves();t=this._curves=Array(n);for(var i=0;n>i;i++)t[i]=new z(this,e[i],e[i+1]||e[0])}return t},getFirstCurve:function(){return this.getCurves()[0]},getLastCurve:function(){var t=this.getCurves();return t[t.length-1]},isClosed:function(){return this._closed},setClosed:function(t){if(this._closed!=(t=!!t)){if(this._closed=t,this._curves){var e=this._curves.length=this._countCurves();t&&(this._curves[e-1]=new z(this,this._segments[e-1],this._segments[0]))}this._changed(25)}}},{beans:!0,getPathData:function(t){function e(e,n,s){var a=e._point,o=n._point,h=e._handleOut,u=n._handleIn;if(h.isZero()&&u.isZero())s||r.push("L"+i.point(o,t));else{var l=o.subtract(a);r.push("c"+i.point(h,t)+" "+i.point(l.add(u),t)+" "+i.point(l,t))}}var n=this._segments,i=a.instance,r=[];if(0===n.length)return"";r.push("M"+i.point(n[0]._point));for(var s=0,o=n.length-1;o>s;s++)e(n[s],n[s+1],!1);return this._closed&&(e(n[n.length-1],n[0],!0),r.push("z")),r.join("")}},{isEmpty:function(){return 0===this._segments.length},isPolygon:function(){for(var t=0,e=this._segments.length;e>t;t++)if(!this._segments[t].isLinear())return!1;return!0},_transformContent:function(t){for(var e=Array(6),n=0,i=this._segments.length;i>n;n++)this._segments[n]._transformCoordinates(t,e,!0);return!0},_add:function(t,e){for(var n=this._segments,i=this._curves,r=t.length,s=null==e,e=s?n.length:e,a=0;r>a;a++){var o=t[a];o._path&&(o=t[a]=o.clone()),o._path=this,o._index=e+a,o._selectionState&&this._updateSelection(o,0,o._selectionState)}if(s)n.push.apply(n,t);else{n.splice.apply(n,[e,0].concat(t));for(var a=e+r,h=n.length;h>a;a++)n[a]._index=a
}if(i||t._curves){i||(i=this._curves=[]);var u=e>0?e-1:e,l=u,c=Math.min(u+r,this._countCurves());t._curves&&(i.splice.apply(i,[u,0].concat(t._curves)),l+=t._curves.length);for(var a=l;c>a;a++)i.splice(a,0,new z(this,null,null));this._adjustCurves(u,c)}return this._changed(25),t},_adjustCurves:function(t,e){for(var n,i=this._segments,r=this._curves,s=t;e>s;s++)n=r[s],n._path=this,n._segment1=i[s],n._segment2=i[s+1]||i[0];(n=r[this._closed&&0===t?i.length-1:t-1])&&(n._segment2=i[t]||i[0]),(n=r[e])&&(n._segment1=i[e])},_countCurves:function(){var t=this._segments.length;return!this._closed&&t>0?t-1:t},add:function(t){return arguments.length>1&&"number"!=typeof t?this._add(k.readAll(arguments)):this._add([k.read(arguments)])[0]},insert:function(t,e){return arguments.length>2&&"number"!=typeof e?this._add(k.readAll(arguments,1),t):this._add([k.read(arguments,1)],t)[0]},addSegment:function(){return this._add([k.read(arguments)])[0]},insertSegment:function(t){return this._add([k.read(arguments,1)],t)[0]},addSegments:function(t){return this._add(k.readAll(t))},insertSegments:function(t,e){return this._add(k.readAll(e),t)},removeSegment:function(t){return this.removeSegments(t,t+1)[0]||null},removeSegments:function(t,n,i){t=t||0,n=e.pick(n,this._segments.length);var r=this._segments,s=this._curves,a=r.length,o=r.splice(t,n-t),h=o.length;if(!h)return o;for(var u=0;h>u;u++){var l=o[u];l._selectionState&&this._updateSelection(l,l._selectionState,0),l._index=l._path=null}for(var u=t,c=r.length;c>u;u++)r[u]._index=u;if(s){var d=t>0&&n===a+(this._closed?1:0)?t-1:t,s=s.splice(d,h);i&&(o._curves=s.slice(1)),this._adjustCurves(d,d)}return this._changed(25),o},clear:"#removeSegments",isFullySelected:function(){var t=this._segments.length;return this._selected&&t>0&&this._selectedSegmentState===7*t},setFullySelected:function(t){t&&this._selectSegments(!0),this.setSelected(t)},setSelected:function we(t){t||this._selectSegments(!1),we.base.call(this,t)},_selectSegments:function(t){var e=this._segments.length;this._selectedSegmentState=t?7*e:0;for(var n=0;e>n;n++)this._segments[n]._selectionState=t?7:0},_updateSelection:function(t,e,n){t._selectionState=n;var i=this._selectedSegmentState+=n-e;i>0&&this.setSelected(!0)},flatten:function(t){for(var e=new L(this),n=0,i=e.length/Math.ceil(e.length/t),r=e.length+(this._closed?-i:i)/2,s=[];r>=n;)s.push(new k(e.evaluate(n,0))),n+=i;this.setSegments(s)},reduce:function(){for(var t=this.getCurves(),e=t.length-1;e>=0;e--){var n=t[e];n.isLinear()&&0===n.getLength()&&n.remove()}return this},simplify:function(t){if(this._segments.length>2){var e=new E(this,t||2.5);this.setSegments(e.fit())}},split:function(t,e){if(null!==e){if(1===arguments.length){var n=t;"number"==typeof n&&(n=this.getLocationAt(n)),t=n.index,e=n.parameter}var i=1e-5;e>=1-i&&(t++,e--);var r=this.getCurves();if(t>=0&&t<r.length){e>i&&r[t++].divide(e,!0);var s,a=this.removeSegments(t,this._segments.length,!0);return this._closed?(this.setClosed(!1),s=this):t>0&&(s=this._clone((new T).insertAbove(this,!0))),s._add(a,0),this.addSegment(a[0]),s}return null}},isClockwise:function(){return this._clockwise!==t?this._clockwise:T.isClockwise(this._segments)},setClockwise:function(t){this.isClockwise()!=(t=!!t)&&this.reverse(),this._clockwise=t},reverse:function(){this._segments.reverse();for(var e=0,n=this._segments.length;n>e;e++){var i=this._segments[e],r=i._handleIn;i._handleIn=i._handleOut,i._handleOut=r,i._index=e}this._curves=null,this._clockwise!==t&&(this._clockwise=!this._clockwise)},join:function(t){if(t){var e=t._segments,n=this.getLastSegment(),i=t.getLastSegment();n._point.equals(i._point)&&t.reverse();var r,s=t.getFirstSegment();n._point.equals(s._point)?(n.setHandleOut(s._handleOut),this._add(e.slice(1))):(r=this.getFirstSegment(),r._point.equals(s._point)&&t.reverse(),i=t.getLastSegment(),r._point.equals(i._point)?(r.setHandleIn(i._handleIn),this._add(e.slice(0,e.length-1),0)):this._add(e.slice())),t.closed&&this._add([e[0]]),t.remove()}var a=this.getFirstSegment(),o=this.getLastSegment();a!==o&&a._point.equals(o._point)&&(a.setHandleIn(o._handleIn),o.remove(),this.setClosed(!0))},getLength:function(){if(null==this._length){var t=this.getCurves();this._length=0;for(var e=0,n=t.length;n>e;e++)this._length+=t[e].getLength()}return this._length},getArea:function(){for(var t=this.getCurves(),e=0,n=0,i=t.length;i>n;n++)e+=t[n].getArea();return e},_getOffset:function(t){var e=t&&t.getIndex();if(null!=e){for(var n=this.getCurves(),i=0,r=0;e>r;r++)i+=n[r].getLength();var s=n[e],a=t.getParameter();return a>0&&(i+=s.getPartLength(0,a)),i}return null},getLocationOf:function(t){for(var t=h.read(arguments),e=this.getCurves(),n=0,i=e.length;i>n;n++){var r=e[n].getLocationOf(t);if(r)return r}return null},getLocationAt:function(t,e){var n=this.getCurves(),i=0;if(e){var r=~~t;return n[r].getLocationAt(t-r,!0)}for(var s=0,a=n.length;a>s;s++){var o=i,h=n[s];if(i+=h.getLength(),i>t)return h.getLocationAt(t-o)}return t<=this.getLength()?new I(n[n.length-1],1):null},getPointAt:function(t,e){var n=this.getLocationAt(t,e);return n&&n.getPoint()},getTangentAt:function(t,e){var n=this.getLocationAt(t,e);return n&&n.getTangent()},getNormalAt:function(t,e){var n=this.getLocationAt(t,e);return n&&n.getNormal()},getNearestLocation:function(t){for(var t=h.read(arguments),e=this.getCurves(),n=1/0,i=null,r=0,s=e.length;s>r;r++){var a=e[r].getNearestLocation(t);a._distance<n&&(n=a._distance,i=a)}return i},getNearestPoint:function(t){var t=h.read(arguments);return this.getNearestLocation(t).getPoint()},toShape:function(e){function n(t,e){return d[t].isColinear(d[e])}function i(t){return d[t].isOrthogonal()}function r(t){return d[t].isArc()}function s(t,e){return d[t]._point.getDistance(d[e]._point)}if(!this._closed)return null;var a,h,u,l,d=this._segments;if(this.isPolygon()&&4===d.length&&n(0,2)&&n(1,3)&&i(1)?(a=b.Rectangle,h=new c(s(0,3),s(0,1)),l=d[1]._point.add(d[2]._point).divide(2)):8===d.length&&r(0)&&r(2)&&r(4)&&r(6)&&n(1,5)&&n(3,7)?(a=b.Rectangle,h=new c(s(1,6),s(0,3)),u=h.subtract(new c(s(0,7),s(1,2))).divide(2),l=d[3]._point.add(d[4]._point).divide(2)):4===d.length&&r(0)&&r(1)&&r(2)&&r(3)&&(o.isZero(s(0,2)-s(1,3))?(a=b.Circle,u=s(0,2)/2):(a=b.Ellipse,u=new c(s(2,0)/2,s(3,1)/2)),l=d[1]._point),a){var f=this.getPosition(!0),_=new a({center:f,size:h,radius:u,insert:!1});return _.rotate(l.subtract(f).getAngle()+90),_.setStyle(this._style),(e||e===t)&&_.insertAbove(this),_}return null},_hitTest:function(t,e){function n(e,n){return t.subtract(e).divide(n).length<=1}function i(t,i,r){if(!e.selected||i.isSelected()){var s=t._point;if(i!==s&&(i=i.add(s)),n(i,w))return new P(r,_,{segment:t,point:i})}}function r(t,n){return(n||e.segments)&&i(t,t._point,"segment")||!n&&e.handles&&(i(t,t._handleIn,"handle-in")||i(t,t._handleOut,"handle-out"))}function s(t){c.add(t)}function a(e){if(("round"!==o||"round"!==u)&&(c=new T({internal:!0,closed:!0}),m||e._index>0&&e._index<v-1?"round"!==o&&(e._handleIn.isZero()||e._handleOut.isZero())&&T._addBevelJoin(e,o,C,l,s,!0):"round"!==u&&T._addSquareCap(e,u,C,s,!0),!c.isEmpty())){var i;return c.contains(t)||(i=c.getNearestLocation(t))&&n(i.getPoint(),y)}return n(e._point,w)}var o,u,l,c,d,f,_=this,g=this.getStyle(),p=this._segments,v=p.length,m=this._closed,y=e._tolerancePadding,w=y,x=e.stroke&&g.hasStroke(),b=e.fill&&g.hasFill(),C=x?g.getStrokeWidth()/2:b?0:null;if(null!=C&&(C>0?(o=g.getStrokeJoin(),u=g.getStrokeCap(),l=C*g.getMiterLimit(),w=y.add(new h(C,C))):o=u="round"),!e.ends||e.segments||m){if(e.segments||e.handles)for(var S=0;v>S;S++)if(f=r(p[S]))return f}else if(f=r(p[0],!0)||r(p[v-1],!0))return f;if(null!=C){if(d=this.getNearestLocation(t)){var k=d.getParameter();0===k||1===k&&v>1?a(d.getSegment())||(d=null):n(d.getPoint(),w)||(d=null)}if(!d&&"miter"===o&&v>1)for(var S=0;v>S;S++){var M=p[S];if(t.getDistance(M._point)<=l&&a(M)){d=M.getLocation();break}}}return!d&&b&&this._contains(t)||d&&!x?new P("fill",this):d?new P("stroke",this,{location:d,point:d.getPoint()}):null}},new function(){function t(t,e,n,i){function r(e){var n=a[e],i=a[e+1];(c!=n||d!=i)&&(t.beginPath(),t.moveTo(c,d),t.lineTo(n,i),t.stroke(),t.beginPath(),t.arc(n,i,s,0,2*Math.PI,!0),t.fill())}for(var s=i/2,a=Array(6),o=0,h=e.length;h>o;o++){var u=e[o];u._transformCoordinates(n,a,!1);var l=u._selectionState,c=a[0],d=a[1];if(1&l&&r(2),2&l&&r(4),t.fillRect(c-s,d-s,i,i),!(4&l)){var f=t.fillStyle;t.fillStyle="#ffffff",t.fillRect(c-s+1,d-s+1,i-2,i-2),t.fillStyle=f}}}function e(t,e,n){function i(e){var i=d[e];if(n)i._transformCoordinates(n,_,!1),r=_[0],s=_[1];else{var f=i._point;r=f._x,s=f._y}if(g)t.moveTo(r,s),g=!1;else{if(n)h=_[2],u=_[3];else{var p=i._handleIn;h=r+p._x,u=s+p._y}h==r&&u==s&&l==a&&c==o?t.lineTo(r,s):t.bezierCurveTo(l,c,h,u,r,s)}if(a=r,o=s,n)l=_[4],c=_[5];else{var p=i._handleOut;l=a+p._x,c=o+p._y}}for(var r,s,a,o,h,u,l,c,d=e._segments,f=d.length,_=Array(6),g=!0,p=0;f>p;p++)i(p);e._closed&&f>0&&i(0)}return{_draw:function(t,n){function i(t){return u[(t%l+l)%l]}var r=n.dontStart,s=n.dontFinish||n.clip;r||t.beginPath();var a=this.getStyle(),o=a.hasFill(),h=a.hasStroke(),u=a.getDashArray(),l=!paper.support.nativeDash&&h&&u&&u.length;if(!r&&this._currentPath?t.currentPath=this._currentPath:(o||h&&!l||s)&&(e(t,this),this._closed&&t.closePath(),r||(this._currentPath=t.currentPath)),!s&&(o||h)&&(this._setStyles(t),o&&(t.fill(a.getWindingRule()),t.shadowColor="rgba(0,0,0,0)"),h)){if(l){r||t.beginPath();var c,d=new L(this),f=d.length,_=-a.getDashOffset(),g=0;for(_%=f;_>0;)_-=i(g--)+i(g--);for(;f>_;)c=_+i(g++),(_>0||c>0)&&d.drawPart(t,Math.max(_,0),Math.max(c,0)),_=c+i(g++)}t.stroke()}},_drawSelected:function(n,i){n.beginPath(),e(n,this,i),n.stroke(),t(n,this._segments,i,paper.settings.handleSize)}}},new function(){function t(t){var e=t.length,n=[],i=[],r=2;n[0]=t[0]/r;for(var s=1;e>s;s++)i[s]=1/r,r=(e-1>s?4:2)-i[s],n[s]=(t[s]-n[s-1])/r;for(var s=1;e>s;s++)n[e-s-1]-=i[e-s]*n[e-s];return n}return{smooth:function(){var e=this._segments,n=e.length,i=this._closed,r=n,s=0;if(!(2>=n)){i&&(s=Math.min(n,4),r+=2*Math.min(n,s));for(var a=[],o=0;n>o;o++)a[o+s]=e[o]._point;if(i)for(var o=0;s>o;o++)a[o]=e[o+n-s]._point,a[o+n+s]=e[o]._point;else r--;for(var u=[],o=1;r-1>o;o++)u[o]=4*a[o]._x+2*a[o+1]._x;u[0]=a[0]._x+2*a[1]._x,u[r-1]=3*a[r-1]._x;for(var l=t(u),o=1;r-1>o;o++)u[o]=4*a[o]._y+2*a[o+1]._y;u[0]=a[0]._y+2*a[1]._y,u[r-1]=3*a[r-1]._y;var c=t(u);if(i){for(var o=0,d=n;s>o;o++,d++){var f=o/s,_=1-f,g=o+s,p=d+s;l[d]=l[o]*f+l[d]*_,c[d]=c[o]*f+c[d]*_,l[p]=l[g]*_+l[p]*f,c[p]=c[g]*_+c[p]*f}r--}for(var v=null,o=s;r-s>=o;o++){var m=e[o-s];v&&m.setHandleIn(v.subtract(m._point)),r>o&&(m.setHandleOut(new h(l[o],c[o]).subtract(m._point)),v=r-1>o?new h(2*a[o+1]._x-l[o+1],2*a[o+1]._y-c[o+1]):new h((a[r]._x+l[r-1])/2,(a[r]._y+c[r-1])/2))}if(i&&v){var m=this._segments[0];m.setHandleIn(v.subtract(m._point))}}}}},new function(){function t(t){var e=t._segments;if(0===e.length)throw Error("Use a moveTo() command first");return e[e.length-1]}return{moveTo:function(){var t=this._segments;1===t.length&&this.removeSegment(0),t.length||this._add([new k(h.read(arguments))])},moveBy:function(){throw Error("moveBy() is unsupported on Path items.")},lineTo:function(){this._add([new k(h.read(arguments))])},cubicCurveTo:function(){var e=h.read(arguments),n=h.read(arguments),i=h.read(arguments),r=t(this);r.setHandleOut(e.subtract(r._point)),this._add([new k(i,n.subtract(i))])},quadraticCurveTo:function(){var e=h.read(arguments),n=h.read(arguments),i=t(this)._point;this.cubicCurveTo(e.add(i.subtract(e).multiply(1/3)),e.add(n.subtract(e).multiply(1/3)),n)},curveTo:function(){var n=h.read(arguments),i=h.read(arguments),r=e.pick(e.read(arguments),.5),s=1-r,a=t(this)._point,o=n.subtract(a.multiply(s*s)).subtract(i.multiply(r*r)).divide(2*r*s);if(o.isNaN())throw Error("Cannot put a curve through points with parameter = "+r);this.quadraticCurveTo(o,i)},arcTo:function(){var n,i,r,s,a,o=t(this),u=o._point,l=h.read(arguments),d=e.peek(arguments),f=e.pick(d,!0);if("boolean"==typeof f)var _=u.add(l).divide(2),n=_.add(_.subtract(u).rotate(f?-90:90));else if(e.remain(arguments)<=2)n=l,l=h.read(arguments);else{var v=c.read(arguments);if(v.isZero())return this.lineTo(l);var m=e.read(arguments),f=!!e.read(arguments),y=!!e.read(arguments),_=u.add(l).divide(2),w=u.subtract(_).rotate(-m),x=w.x,b=w.y,C=Math.abs,S=1e-11,P=C(v.width),M=C(v.height),z=P*P,I=M*M,A=x*x,T=b*b,O=Math.sqrt(A/z+T/I);if(O>1&&(P*=O,M*=O,z=P*P,I=M*M),O=(z*I-z*T-I*A)/(z*T+I*A),C(O)<S&&(O=0),0>O)throw Error("Cannot create an arc with the given arguments");i=new h(P*b/M,-M*x/P).multiply((y===f?-1:1)*Math.sqrt(O)).rotate(m).add(_),a=(new g).translate(i).rotate(m).scale(P,M),s=a._inverseTransform(u),r=s.getDirectedAngle(a._inverseTransform(l)),!f&&r>0?r-=360:f&&0>r&&(r+=360)}if(n){var L=new p(u.add(n).divide(2),n.subtract(u).rotate(90),!0),E=new p(n.add(l).divide(2),l.subtract(n).rotate(90),!0),N=new p(u,l),j=N.getSide(n);if(i=L.intersect(E,!0),!i){if(!j)return this.lineTo(l);throw Error("Cannot create an arc with the given arguments")}s=u.subtract(i),r=s.getDirectedAngle(l.subtract(i));var D=N.getSide(i);0===D?r=j*Math.abs(r):j===D&&(r+=0>r?360:-360)}for(var B=Math.abs(r),R=B>=360?4:Math.ceil(B/90),F=r/R,V=F*Math.PI/360,q=4/3*Math.sin(V)/(1+Math.cos(V)),Z=[],H=0;R>=H;H++){var w=l,U=null;if(R>H&&(U=s.rotate(90).multiply(q),a?(w=a._transformPoint(s),U=a._transformPoint(s.add(U)).subtract(w)):w=i.add(s)),0===H)o.setHandleOut(U);else{var W=s.rotate(-90).multiply(q);a&&(W=a._transformPoint(s.add(W)).subtract(w)),Z.push(new k(w,W,U))}s=s.rotate(F)}this._add(Z)},lineBy:function(){var e=h.read(arguments),n=t(this)._point;this.lineTo(n.add(e))},curveBy:function(){var n=h.read(arguments),i=h.read(arguments),r=e.read(arguments),s=t(this)._point;this.curveTo(s.add(n),s.add(i),r)},cubicCurveBy:function(){var e=h.read(arguments),n=h.read(arguments),i=h.read(arguments),r=t(this)._point;this.cubicCurveTo(r.add(e),r.add(n),r.add(i))},quadraticCurveBy:function(){var e=h.read(arguments),n=h.read(arguments),i=t(this)._point;this.quadraticCurveTo(i.add(e),i.add(n))},arcBy:function(){var n=t(this)._point,i=n.add(h.read(arguments)),r=e.pick(e.peek(arguments),!0);"boolean"==typeof r?this.arcTo(i,r):this.arcTo(i,n.add(h.read(arguments)))},closePath:function(t){this.setClosed(!0),t&&this.join()}}},{_getBounds:function(t,e){return T[t](this._segments,this._closed,this.getStyle(),e)},statics:{isClockwise:function(t){for(var e=0,n=0,i=t.length;i>n;n++)for(var r=z.getValues(t[n],t[i>n+1?n+1:0]),s=2;8>s;s+=2)e+=(r[s-2]-r[s])*(r[s+1]+r[s-1]);return e>0},getBounds:function(t,e,n,i,r){function s(t){t._transformCoordinates(i,o,!1);for(var e=0;2>e;e++)z._addBounds(h[e],h[e+4],o[e+2],o[e],e,r?r[e]:0,u,l,c);var n=h;h=o,o=n}var a=t[0];if(!a)return new f;for(var o=Array(6),h=a._transformCoordinates(i,Array(6),!1),u=h.slice(0,2),l=u.slice(),c=Array(2),d=1,_=t.length;_>d;d++)s(t[d]);return e&&s(a),new f(u[0],u[1],l[0]-u[0],l[1]-u[1])},getStrokeBounds:function(t,e,n,i){function r(t){d=d.include(i?i._transformPoint(t,t):t)}function s(t){d=d.unite(v.setCenter(i?i._transformPoint(t._point):t._point))}function a(t,e){var n=t._handleIn,i=t._handleOut;"round"===e||!n.isZero()&&!i.isZero()&&n.isColinear(i)?s(t):T._addBevelJoin(t,e,u,p,r)}function o(t,e){"round"===e?s(t):T._addSquareCap(t,e,u,r)}if(!n.hasStroke())return T.getBounds(t,e,n,i);for(var h=t.length-(e?0:1),u=n.getStrokeWidth()/2,l=T._getPenPadding(u,i),d=T.getBounds(t,e,n,i,l),_=n.getStrokeJoin(),g=n.getStrokeCap(),p=u*n.getMiterLimit(),v=new f(new c(l).multiply(2)),m=1;h>m;m++)a(t[m],_);return e?a(t[0],_):h>0&&(o(t[0],g),o(t[t.length-1],g)),d},_getPenPadding:function(t,e){if(!e)return[t,t];var n=e.shiftless(),i=n.transform(new h(t,0)),r=n.transform(new h(0,t)),s=i.getAngleInRadians(),a=i.getLength(),o=r.getLength(),u=Math.sin(s),l=Math.cos(s),c=Math.tan(s),d=-Math.atan(o*c/a),f=Math.atan(o/(c*a));return[Math.abs(a*Math.cos(d)*l-o*Math.sin(d)*u),Math.abs(o*Math.sin(f)*l+a*Math.cos(f)*u)]},_addBevelJoin:function(t,e,n,i,r,s){var a=t.getCurve(),o=a.getPrevious(),u=a.getPointAt(0,!0),l=o.getNormalAt(1,!0),c=a.getNormalAt(0,!0),d=l.getDirectedAngle(c)<0?-n:n;if(l.setLength(d),c.setLength(d),s&&(r(u),r(u.add(l))),"miter"===e){var f=new p(u.add(l),new h(-l.y,l.x),!0).intersect(new p(u.add(c),new h(-c.y,c.x),!0),!0);if(f&&u.getDistance(f)<=i&&(r(f),!s))return}s||r(u.add(l)),r(u.add(c))},_addSquareCap:function(t,e,n,i,r){var s=t._point,a=t.getLocation(),o=a.getNormal().normalize(n);r&&(i(s.subtract(o)),i(s.add(o))),"square"===e&&(s=s.add(o.rotate(0==a.getParameter()?-90:90))),i(s.add(o)),i(s.subtract(o))},getHandleBounds:function(t,e,n,i,r,s){for(var a=Array(6),o=1/0,h=-o,u=o,l=h,c=0,d=t.length;d>c;c++){var _=t[c];_._transformCoordinates(i,a,!1);for(var g=0;6>g;g+=2){var p=0==g?s:r,v=p?p[0]:0,m=p?p[1]:0,y=a[g],w=a[g+1],x=y-v,b=y+v,C=w-m,S=w+m;o>x&&(o=x),b>h&&(h=b),u>C&&(u=C),S>l&&(l=S)}}return new f(o,u,h-o,l-u)},getRoughBounds:function(t,e,n,i){var r=n.hasStroke()?n.getStrokeWidth()/2:0,s=r;return r>0&&("miter"===n.getStrokeJoin()&&(s=r*n.getMiterLimit()),"square"===n.getStrokeCap()&&(s=Math.max(s,r*Math.sqrt(2)))),T.getHandleBounds(t,e,n,i,T._getPenPadding(r,i),T._getPenPadding(s,i))}}});T.inject({statics:new function(){function t(t,n,i){var r=e.getNamed(i),s=new T(r&&r.insert===!1&&y.NO_INSERT);return s._add(t),s._closed=n,s.set(r)}function n(e,n,i){for(var s=Array(4),a=0;4>a;a++){var o=r[a];s[a]=new k(o._point.multiply(n).add(e),o._handleIn.multiply(n),o._handleOut.multiply(n))}return t(s,!0,i)}var i=.5522847498307936,r=[new k([-1,0],[0,i],[0,-i]),new k([0,-1],[-i,0],[i,0]),new k([1,0],[0,-i],[0,i]),new k([0,1],[i,0],[-i,0])];return{Line:function(){return t([new k(h.readNamed(arguments,"from")),new k(h.readNamed(arguments,"to"))],!1,arguments)},Circle:function(){var t=h.readNamed(arguments,"center"),i=e.readNamed(arguments,"radius");return n(t,new c(i),arguments)},Rectangle:function(){var e,n=f.readNamed(arguments,"rectangle"),r=c.readNamed(arguments,"radius",0,{readNull:!0}),s=n.getBottomLeft(!0),a=n.getTopLeft(!0),o=n.getTopRight(!0),h=n.getBottomRight(!0);if(!r||r.isZero())e=[new k(s),new k(a),new k(o),new k(h)];else{r=c.min(r,n.getSize(!0).divide(2));var u=r.width,l=r.height,d=u*i,_=l*i;e=[new k(s.add(u,0),null,[-d,0]),new k(s.subtract(0,l),[0,_]),new k(a.add(0,l),null,[0,-_]),new k(a.add(u,0),[-d,0],null),new k(o.subtract(u,0),null,[d,0]),new k(o.add(0,l),[0,-_],null),new k(h.subtract(0,l),null,[0,_]),new k(h.subtract(u,0),[d,0])]}return t(e,!0,arguments)},RoundRectangle:"#Rectangle",Ellipse:function(){var t=b._readEllipse(arguments);return n(t.center,t.radius,arguments)},Oval:"#Ellipse",Arc:function(){var t=h.readNamed(arguments,"from"),n=h.readNamed(arguments,"through"),i=h.readNamed(arguments,"to"),r=e.getNamed(arguments),s=new T(r&&r.insert===!1&&y.NO_INSERT);return s.moveTo(t),s.arcTo(n,i),s.set(r)},RegularPolygon:function(){for(var n=h.readNamed(arguments,"center"),i=e.readNamed(arguments,"sides"),r=e.readNamed(arguments,"radius"),s=360/i,a=!(i%3),o=new h(0,a?-r:r),u=a?-1:.5,l=Array(i),c=0;i>c;c++)l[c]=new k(n.add(o.rotate((c+u)*s)));return t(l,!0,arguments)},Star:function(){for(var n=h.readNamed(arguments,"center"),i=2*e.readNamed(arguments,"points"),r=e.readNamed(arguments,"radius1"),s=e.readNamed(arguments,"radius2"),a=360/i,o=new h(0,-1),u=Array(i),l=0;i>l;l++)u[l]=new k(n.add(o.rotate(a*l).multiply(l%2?s:r)));return t(u,!0,arguments)}}}});var O=A.extend({_class:"CompoundPath",_serializeFields:{children:[]},initialize:function(t){this._children=[],this._namedChildren={},this._initialize(t)||("string"==typeof t?this.setPathData(t):this.addChildren(Array.isArray(t)?t:arguments))},insertChildren:function xe(e,n,i){n=xe.base.call(this,e,n,i,T);for(var r=0,s=!i&&n&&n.length;s>r;r++){var a=n[r];a._clockwise===t&&a.setClockwise(0===a._index)}return n},reverse:function(){for(var t=this._children,e=0,n=t.length;n>e;e++)t[e].reverse()},smooth:function(){for(var t=0,e=this._children.length;e>t;t++)this._children[t].smooth()},isClockwise:function(){var t=this.getFirstChild();return t&&t.isClockwise()},setClockwise:function(t){this.isClockwise()!==!!t&&this.reverse()},getFirstSegment:function(){var t=this.getFirstChild();return t&&t.getFirstSegment()},getLastSegment:function(){var t=this.getLastChild();return t&&t.getLastSegment()},getCurves:function(){for(var t=this._children,e=[],n=0,i=t.length;i>n;n++)e.push.apply(e,t[n].getCurves());return e},getFirstCurve:function(){var t=this.getFirstChild();return t&&t.getFirstCurve()},getLastCurve:function(){var t=this.getLastChild();return t&&t.getFirstCurve()},getArea:function(){for(var t=this._children,e=0,n=0,i=t.length;i>n;n++)e+=t[n].getArea();return e}},{beans:!0,getPathData:function(t){for(var e=this._children,n=[],i=0,r=e.length;r>i;i++)n.push(e[i].getPathData(t));return n.join(" ")}},{_getChildHitTestOptions:function(t){return"path"===t.type?t:new e(t,{fill:!1})},_draw:function(t,e){var n=this._children;if(0!==n.length){if(this._currentPath)t.currentPath=this._currentPath;else{e=e.extend({dontStart:!0,dontFinish:!0}),t.beginPath();for(var i=0,r=n.length;r>i;i++)n[i].draw(t,e);this._currentPath=t.currentPath}if(!e.clip){this._setStyles(t);var s=this._style;s.hasFill()&&(t.fill(s.getWindingRule()),t.shadowColor="rgba(0,0,0,0)"),s.hasStroke()&&t.stroke()}}},_drawSelected:function(t,e){for(var n=this._children,i=0,r=n.length;r>i;i++){var s=n[i],a=s._matrix;s._drawSelected(t,a.isIdentity()?e:e.clone().concatenate(s._matrix))}}},new function(){function t(t,e){var n=t._children;if(e&&0===n.length)throw Error("Use a moveTo() command first");return n[n.length-1]}var n={moveTo:function(){var e=t(this),n=e&&e.isEmpty()?e:new T;n!==e&&this.addChild(n),n.moveTo.apply(n,arguments)},moveBy:function(){var e=t(this,!0),n=e&&e.getLastSegment(),i=h.read(arguments);this.moveTo(n?i.add(n._point):i)},closePath:function(e){t(this,!0).closePath(e)}};return e.each(["lineTo","cubicCurveTo","quadraticCurveTo","curveTo","arcTo","lineBy","cubicCurveBy","quadraticCurveBy","curveBy","arcBy"],function(e){n[e]=function(){var n=t(this,!0);n[e].apply(n,arguments)}}),n});A.inject(new function(){function t(t,r,s,a){function o(t){return t.clone(!1).reduce().reorient().transform(null,!0)}function h(t){for(var e=0,n=t.length;n>e;e++){var i=t[e];_.push.apply(_,i._segments),g.push.apply(g,i._getMonoCurves())}}var u=o(t),l=r&&t!==r&&o(r);u.isClockwise()||u.reverse(),!l||a^l.isClockwise()||l.reverse(),e(u.getIntersections(l,!0));var c=[],d=[],f=[],_=[],g=[];h(u._children||[u]),l&&h(l._children||[l]),_.sort(function(t,e){var n=t._intersection,i=e._intersection;return!n&&!i||n&&i?0:n?-1:1});for(var p=0,v=_.length;v>p;p++){var m=_[p];if(null==m._winding){c.length=d.length=f.length=0;var y=0,w=m;do c.push(m),f.push(y+=m.getCurve().getLength()),m=m.getNext();while(m&&!m._intersection&&m!==w);for(var x=0;3>x;x++){var b=y*Math.random(),C=f.length,S=0;do if(f[S]>=b){S>0&&(b-=f[S-1]);break}while(++S<C);var P=c[S].getCurve(),k=P.getPointAt(b),M=P.isHorizontal(),z=P._path;z._parent instanceof O&&(z=z._parent),d[x]=a&&l&&(z===u&&l._getWinding(k,M)||z===l&&!u._getWinding(k,M))?0:n(k,g,M)}d.sort();for(var I=d[1],x=c.length-1;x>=0;x--)c[x]._winding=I}}var A=new O;return A.addChildren(i(_,s),!0),u.remove(),l&&l.remove(),A.reduce()}function e(t){function e(){for(var t=0,e=n.length;e>t;t++){var i=n[t];i._handleOut.set(0,0),i._handleIn.set(0,0)}}for(var n,i,r,s=1e-5,a=t.length-1;a>=0;a--){var o=t[a],h=o._parameter;r&&r._curve===o._curve&&r._parameter>0?h/=r._parameter:(n&&e(),i=o._curve,n=i.isLinear()&&[]);var u,l;(u=i.divide(h,!0,!0))?(l=u._segment1,i=u.getPrevious()):l=s>h?i._segment1:h>1-s?i._segment2:i.getPartLength(0,h)<i.getPartLength(h,1)?i._segment1:i._segment2,l._intersection=o.getIntersection(),o._segment=l,n&&n.push(l),r=o}n&&e()}function n(t,e,i,r){var s=1e-5,a=t.x,o=t.y,u=0,l=0,c=[],d=Math.abs,f=1-s;if(i){for(var _=-1/0,g=1/0,p=o-s,v=o+s,m=0,y=e.length;y>m;m++){var w=e[m].values;if(z.solveCubic(w,0,a,c,0,1)>0)for(var x=c.length-1;x>=0;x--){var b=z.evaluate(w,c[x],0).y;p>b&&b>_?_=b:b>v&&g>b&&(g=b)}}_=(_+o)/2,g=(g+o)/2,_>-1/0&&(u=n(new h(a,_),e)),1/0>g&&(l=n(new h(a,g),e))}else for(var C=a-s,S=a+s,m=0,y=e.length;y>m;m++){var P=e[m],w=P.values,k=P.winding,M=P.next;if(k&&(1===k&&o>=w[1]&&o<=w[7]||o>=w[7]&&o<=w[1])&&1===z.solveCubic(w,1,o,c,0,M.winding||M.values[1]!==o?f:1)){var I=c[0],A=z.evaluate(w,I,0).x,T=z.evaluate(w,I,1).y;d(T)<s&&!z.isLinear(w)||s>I&&T*z.evaluate(P.previous.values,I,1).y<0?r&&A>=C&&S>=A&&(++u,++l):C>=A?u+=k:A>=S&&(l+=k)}}return Math.max(d(u),d(l))}function i(t,e,n){e=e||function(){return!0};for(var i,r,s=[],a=.001,o=.999,h=0,u=t.length;u>h;h++)if(i=r=t[h],!i._visited&&e(i._winding)){var l=new T(y.NO_INSERT),c=i._intersection,d=c&&c._segment,f=!1,_=1;do{var g,p=_>0?i._handleIn:i._handleOut,v=_>0?i._handleOut:i._handleIn;if(f&&(!e(i._winding)||n)&&(c=i._intersection)&&(g=c._segment)&&g!==r){if(n)i._visited=g._visited,i=g,_=1;else{var m=i.getCurve();_>0&&(m=m.getPrevious());var w=m.getTangentAt(1>_?a:o,!0),x=g.getCurve(),b=x.getPrevious(),C=b.getTangentAt(o,!0),S=x.getTangentAt(a,!0),P=w.cross(C),M=w.cross(S);if(0!==P*M){var z=M>P?b:x,I=e(z._segment1._winding)?z:M>P?x:b,A=I._segment1;_=I===b?-1:1,A._visited&&i._path!==A._path||!e(A._winding)?_=1:(i._visited=g._visited,i=g,A._visited&&(_=1))}else _=1}v=_>0?i._handleOut:i._handleIn}l.add(new k(i._point,f&&p,v)),f=!0,i._visited=!0,i=_>0?i.getNext():i.getPrevious()}while(i&&!i._visited&&i!==r&&i!==d&&(i._intersection||e(i._winding)));!i||i!==r&&i!==d?l.lastSegment._handleOut.set(0,0):(l.firstSegment.setHandleIn((i===d?d:i)._handleIn),l.setClosed(!0)),l._segments.length>(l._closed?l.isPolygon()?2:0:1)&&s.push(l)}return s}return{_getWinding:function(t,e,i){return n(t,this._getMonoCurves(),e,i)},unite:function(e){return t(this,e,function(t){return 1===t||0===t},!1)},intersect:function(e){return t(this,e,function(t){return 2===t},!1)},subtract:function(e){return t(this,e,function(t){return 1===t},!0)},exclude:function(t){return new w([this.subtract(t),t.subtract(this)])},divide:function(t){return new w([this.subtract(t),this.intersect(t)])}}}),T.inject({_getMonoCurves:function(){function t(t){var e=t[1],r=t[7],s={values:t,winding:e===r?0:e>r?-1:1,previous:n,next:null};n&&(n.next=s),i.push(s),n=s}function e(e){if(0!==z.getLength(e)){var n=e[1],i=e[3],r=e[5],s=e[7];if(z.isLinear(e))t(e);else{var a=3*(i-r)-n+s,h=2*(n+r)-4*i,u=i-n,l=1e-5,c=[],d=o.solveQuadratic(a,h,u,c,l,1-l);if(0===d)t(e);else{c.sort();var f=c[0],_=z.subdivide(e,f);t(_[0]),d>1&&(f=(c[1]-f)/(1-f),_=z.subdivide(_[1],f),t(_[0])),t(_[1])}}}}var n,i=this._monoCurves;if(!i){i=this._monoCurves=[];for(var r=this.getCurves(),s=this._segments,a=0,h=r.length;h>a;a++)e(r[a].getValues());if(!this._closed&&s.length>1){var u=s[s.length-1]._point,l=s[0]._point,c=u._x,d=u._y,f=l._x,_=l._y;e([c,d,c,d,f,_,f,_])}if(i.length>0){var g=i[0],p=i[i.length-1];g.previous=p,p.next=g}}return i},getInteriorPoint:function(){var t=this.getBounds(),e=t.getCenter(!0);if(!this.contains(e)){for(var n=this._getMonoCurves(),i=[],r=e.y,s=[],a=0,o=n.length;o>a;a++){var h=n[a].values;if((1===n[a].winding&&r>=h[1]&&r<=h[7]||r>=h[7]&&r<=h[1])&&z.solveCubic(h,1,r,i,0,1)>0)for(var u=i.length-1;u>=0;u--)s.push(z.evaluate(h,i[u],0).x);if(s.length>1)break}e.x=(s[0]+s[1])/2}return e},reorient:function(){return this.setClockwise(!0),this}}),O.inject({_getMonoCurves:function(){for(var t=this._children,e=[],n=0,i=t.length;i>n;n++)e.push.apply(e,t[n]._getMonoCurves());return e},reorient:function(){var t=this.removeChildren().sort(function(t,e){return e.getBounds().getArea()-t.getBounds().getArea()});this.addChildren(t);for(var e=t[0].isClockwise(),n=1,i=t.length;i>n;n++){for(var r=t[n].getInteriorPoint(),s=0,a=n-1;a>=0;a--)t[a].contains(r)&&s++;t[n].setClockwise(0===s%2&&e)}return this}});var L=e.extend({initialize:function(t){function e(t,e){var n=z.getValues(t,e);s.curves.push(n),s._computeParts(n,t._index,0,1)}this.curves=[],this.parts=[],this.length=0,this.index=0;for(var n,i=t._segments,r=i[0],s=this,a=1,o=i.length;o>a;a++)n=i[a],e(r,n),r=n;t._closed&&e(n,i[0])},_computeParts:function(t,e,n,i){if(i-n>1/32&&!z.isFlatEnough(t,.25)){var r=z.subdivide(t),s=(n+i)/2;this._computeParts(r[0],e,n,s),this._computeParts(r[1],e,s,i)}else{var a=t[6]-t[0],o=t[7]-t[1],h=Math.sqrt(a*a+o*o);h>1e-5&&(this.length+=h,this.parts.push({offset:this.length,value:i,index:e}))}},getParameterAt:function(t){for(var e,n=this.index;e=n,!(0==n||this.parts[--n].offset<t););for(var i=this.parts.length;i>e;e++){var r=this.parts[e];if(r.offset>=t){this.index=e;var s=this.parts[e-1],a=s&&s.index==r.index?s.value:0,o=s?s.offset:0;return{value:a+(r.value-a)*(t-o)/(r.offset-o),index:r.index}}}var r=this.parts[this.parts.length-1];return{value:1,index:r.index}},evaluate:function(t,e){var n=this.getParameterAt(t);return z.evaluate(this.curves[n.index],n.value,e)},drawPart:function(t,e,n){e=this.getParameterAt(e),n=this.getParameterAt(n);for(var i=e.index;i<=n.index;i++){var r=z.getPart(this.curves[i],i==e.index?e.value:0,i==n.index?n.value:1);i==e.index&&t.moveTo(r[0],r[1]),t.bezierCurveTo.apply(t,r.slice(2))}}}),E=e.extend({initialize:function(t,e){this.points=[];for(var n,i=t._segments,r=0,s=i.length;s>r;r++){var a=i[r].point.clone();n&&n.equals(a)||(this.points.push(a),n=a)}this.error=e},fit:function(){var t=this.points,e=t.length;return this.segments=e>0?[new k(t[0])]:[],e>1&&this.fitCubic(0,e-1,t[1].subtract(t[0]).normalize(),t[e-2].subtract(t[e-1]).normalize()),this.segments},fitCubic:function(e,n,i,r){if(1==n-e){var s=this.points[e],a=this.points[n],o=s.getDistance(a)/3;return this.addCurve([s,s.add(i.normalize(o)),a.add(r.normalize(o)),a]),t}for(var h,u=this.chordLengthParameterize(e,n),l=Math.max(this.error,this.error*this.error),c=0;4>=c;c++){var d=this.generateBezier(e,n,u,i,r),f=this.findMaxError(e,n,d,u);if(f.error<this.error)return this.addCurve(d),t;if(h=f.index,f.error>=l)break;this.reparameterize(e,n,u,d),l=f.error}var _=this.points[h-1].subtract(this.points[h]),g=this.points[h].subtract(this.points[h+1]),p=_.add(g).divide(2).normalize();this.fitCubic(e,h,i,p),this.fitCubic(h,n,p.negate(),r)},addCurve:function(t){var e=this.segments[this.segments.length-1];e.setHandleOut(t[1].subtract(t[0])),this.segments.push(new k(t[3],t[2].subtract(t[3])))},generateBezier:function(t,e,n,i,r){for(var s=1e-11,a=this.points[t],o=this.points[e],h=[[0,0],[0,0]],u=[0,0],l=0,c=e-t+1;c>l;l++){var d=n[l],f=1-d,_=3*d*f,g=f*f*f,p=_*f,v=_*d,m=d*d*d,y=i.normalize(p),w=r.normalize(v),x=this.points[t+l].subtract(a.multiply(g+p)).subtract(o.multiply(v+m));h[0][0]+=y.dot(y),h[0][1]+=y.dot(w),h[1][0]=h[0][1],h[1][1]+=w.dot(w),u[0]+=y.dot(x),u[1]+=w.dot(x)}var b,C,S=h[0][0]*h[1][1]-h[1][0]*h[0][1];if(Math.abs(S)>s){var P=h[0][0]*u[1]-h[1][0]*u[0],k=u[0]*h[1][1]-u[1]*h[0][1];b=k/S,C=P/S}else{var M=h[0][0]+h[0][1],z=h[1][0]+h[1][1];b=C=Math.abs(M)>s?u[0]/M:Math.abs(z)>s?u[1]/z:0}var I=o.getDistance(a);return s*=I,(s>b||s>C)&&(b=C=I/3),[a,a.add(i.normalize(b)),o.add(r.normalize(C)),o]},reparameterize:function(t,e,n,i){for(var r=t;e>=r;r++)n[r-t]=this.findRoot(i,this.points[r],n[r-t])},findRoot:function(t,e,n){for(var i=[],r=[],s=0;2>=s;s++)i[s]=t[s+1].subtract(t[s]).multiply(3);for(var s=0;1>=s;s++)r[s]=i[s+1].subtract(i[s]).multiply(2);var a=this.evaluate(3,t,n),o=this.evaluate(2,i,n),h=this.evaluate(1,r,n),u=a.subtract(e),l=o.dot(o)+u.dot(h);return Math.abs(l)<1e-5?n:n-u.dot(o)/l},evaluate:function(t,e,n){for(var i=e.slice(),r=1;t>=r;r++)for(var s=0;t-r>=s;s++)i[s]=i[s].multiply(1-n).add(i[s+1].multiply(n));return i[0]},chordLengthParameterize:function(t,e){for(var n=[0],i=t+1;e>=i;i++)n[i-t]=n[i-t-1]+this.points[i].getDistance(this.points[i-1]);for(var i=1,r=e-t;r>=i;i++)n[i]/=n[r];return n},findMaxError:function(t,e,n,i){for(var r=Math.floor((e-t+1)/2),s=0,a=t+1;e>a;a++){var o=this.evaluate(3,n,i[a-t]),h=o.subtract(this.points[a]),u=h.x*h.x+h.y*h.y;u>=s&&(s=u,r=a)}return{error:s,index:r}}}),N=y.extend({_class:"TextItem",_boundsSelected:!0,_applyMatrix:!1,_canApplyMatrix:!1,_serializeFields:{content:null},_boundsGetter:"getBounds",initialize:function(n){this._content="",this._lines=[];
var i=n&&e.isPlainObject(n)&&n.x===t&&n.y===t;this._initialize(i&&n,!i&&h.read(arguments))},_equals:function(t){return this._content===t._content},_clone:function be(t){return t.setContent(this._content),be.base.call(this,t)},getContent:function(){return this._content},setContent:function(t){this._content=""+t,this._lines=this._content.split(/\r\n|\n|\r/gm),this._changed(265)},isEmpty:function(){return!this._content},getCharacterStyle:"#getStyle",setCharacterStyle:"#setStyle",getParagraphStyle:"#getStyle",setParagraphStyle:"#setStyle"}),j=N.extend({_class:"PointText",initialize:function(){N.apply(this,arguments)},clone:function(t){return this._clone(new j(y.NO_INSERT),t)},getPoint:function(){var t=this._matrix.getTranslation();return new u(t.x,t.y,this,"setPoint")},setPoint:function(){var t=h.read(arguments);this.translate(t.subtract(this._matrix.getTranslation()))},_draw:function(t){if(this._content){this._setStyles(t);var e=this._style,n=this._lines,i=e.getLeading(),r=t.shadowColor;t.font=e.getFontStyle(),t.textAlign=e.getJustification();for(var s=0,a=n.length;a>s;s++){t.shadowColor=r;var o=n[s];e.hasFill()&&(t.fillText(o,0,0),t.shadowColor="rgba(0,0,0,0)"),e.hasStroke()&&t.strokeText(o,0,0),t.translate(0,i)}}},_getBounds:function(t,e){var n=this._style,i=this._lines,r=i.length,s=n.getJustification(),a=n.getLeading(),o=this.getView().getTextWidth(n.getFontStyle(),i),h=0;"left"!==s&&(h-=o/("center"===s?2:1));var u=new f(h,r?-.75*a:0,o,r*a);return e?e._transformBounds(u,u):u}}),D=e.extend(new function(){function t(t){var e,i=t.match(/^#(\w{1,2})(\w{1,2})(\w{1,2})$/);if(i){e=[0,0,0];for(var r=0;3>r;r++){var a=i[r+1];e[r]=parseInt(1==a.length?a+a:a,16)/255}}else if(i=t.match(/^rgba?\((.*)\)$/)){e=i[1].split(",");for(var r=0,o=e.length;o>r;r++){var a=+e[r];e[r]=3>r?a/255:a}}else{var h=s[t];if(!h){n||(n=Q.getContext(1,1),n.globalCompositeOperation="copy"),n.fillStyle="rgba(0,0,0,0)",n.fillStyle=t,n.fillRect(0,0,1,1);var u=n.getImageData(0,0,1,1).data;h=s[t]=[u[0]/255,u[1]/255,u[2]/255]}e=h.slice()}return e}var n,i={gray:["gray"],rgb:["red","green","blue"],hsb:["hue","saturation","brightness"],hsl:["hue","saturation","lightness"],gradient:["gradient","origin","destination","highlight"]},r={},s={},o=[[0,3,1],[2,0,1],[1,0,3],[1,2,0],[3,1,0],[0,1,2]],u={"rgb-hsb":function(t,e,n){var i=Math.max(t,e,n),r=Math.min(t,e,n),s=i-r,a=0===s?0:60*(i==t?(e-n)/s+(n>e?6:0):i==e?(n-t)/s+2:(t-e)/s+4);return[a,0===i?0:s/i,i]},"hsb-rgb":function(t,e,n){t=(t/60%6+6)%6;var i=Math.floor(t),r=t-i,i=o[i],s=[n,n*(1-e),n*(1-e*r),n*(1-e*(1-r))];return[s[i[0]],s[i[1]],s[i[2]]]},"rgb-hsl":function(t,e,n){var i=Math.max(t,e,n),r=Math.min(t,e,n),s=i-r,a=0===s,o=a?0:60*(i==t?(e-n)/s+(n>e?6:0):i==e?(n-t)/s+2:(t-e)/s+4),h=(i+r)/2,u=a?0:.5>h?s/(i+r):s/(2-i-r);return[o,u,h]},"hsl-rgb":function(t,e,n){if(t=(t/360%1+1)%1,0===e)return[n,n,n];for(var i=[t+1/3,t,t-1/3],r=.5>n?n*(1+e):n+e-n*e,s=2*n-r,a=[],o=0;3>o;o++){var h=i[o];0>h&&(h+=1),h>1&&(h-=1),a[o]=1>6*h?s+6*(r-s)*h:1>2*h?r:2>3*h?s+6*(r-s)*(2/3-h):s}return a},"rgb-gray":function(t,e,n){return[.2989*t+.587*e+.114*n]},"gray-rgb":function(t){return[t,t,t]},"gray-hsb":function(t){return[0,0,t]},"gray-hsl":function(t){return[0,0,t]},"gradient-rgb":function(){return[]},"rgb-gradient":function(){return[]}};return e.each(i,function(t,n){r[n]=[],e.each(t,function(t,s){var a=e.capitalize(t),o=/^(hue|saturation)$/.test(t),u=r[n][s]="gradient"===t?function(t){var e=this._components[0];return t=B.read(Array.isArray(t)?t:arguments,0,{readNull:!0}),e!==t&&(e&&e._removeOwner(this),t&&t._addOwner(this)),t}:"gradient"===n?function(){return h.read(arguments,0,{readNull:"highlight"===t,clone:!0})}:function(t){return null==t||isNaN(t)?0:t};this["get"+a]=function(){return this._type===n||o&&/^hs[bl]$/.test(this._type)?this._components[s]:this._convert(n)[s]},this["set"+a]=function(t){this._type===n||o&&/^hs[bl]$/.test(this._type)||(this._components=this._convert(n),this._properties=i[n],this._type=n),t=u.call(this,t),null!=t&&(this._components[s]=t,this._changed())}},this)},{_class:"Color",_readIndex:!0,initialize:function l(e){var n,s,a,o,h=Array.prototype.slice,u=arguments,c=0;Array.isArray(e)&&(u=e,e=u[0]);var d=null!=e&&typeof e;if("string"===d&&e in i&&(n=e,e=u[1],Array.isArray(e)?(s=e,a=u[2]):(this.__read&&(c=1),u=h.call(u,1),d=typeof e)),!s){if(o="number"===d?u:"object"===d&&null!=e.length?e:null){n||(n=o.length>=3?"rgb":"gray");var f=i[n].length;a=o[f],this.__read&&(c+=o===arguments?f+(null!=a?1:0):1),o.length>f&&(o=h.call(o,0,f))}else if("string"===d)n="rgb",s=t(e),4===s.length&&(a=s[3],s.length--);else if("object"===d)if(e.constructor===l){if(n=e._type,s=e._components.slice(),a=e._alpha,"gradient"===n)for(var _=1,g=s.length;g>_;_++){var p=s[_];p&&(s[_]=p.clone())}}else if(e.constructor===B)n="gradient",o=u;else{n="hue"in e?"lightness"in e?"hsl":"hsb":"gradient"in e||"stops"in e||"radial"in e?"gradient":"gray"in e?"gray":"rgb";var v=i[n];y=r[n],this._components=s=[];for(var _=0,g=v.length;g>_;_++){var m=e[v[_]];null==m&&0===_&&"gradient"===n&&"stops"in e&&(m={stops:e.stops,radial:e.radial}),m=y[_].call(this,m),null!=m&&(s[_]=m)}a=e.alpha}this.__read&&n&&(c=1)}if(this._type=n||"rgb","gradient"===n&&(this._id=l._id=(l._id||0)+1),!s){this._components=s=[];for(var y=r[this._type],_=0,g=y.length;g>_;_++){var m=y[_].call(this,o&&o[_]);null!=m&&(s[_]=m)}}this._components=s,this._properties=i[this._type],this._alpha=a,this.__read&&(this.__read=c)},_serialize:function(t,n){var i=this.getComponents();return e.serialize(/^(gray|rgb)$/.test(this._type)?i:[this._type].concat(i),t,!0,n)},_changed:function(){this._canvasStyle=null,this._owner&&this._owner._changed(65)},_convert:function(t){var e;return this._type===t?this._components.slice():(e=u[this._type+"-"+t])?e.apply(this,this._components):u["rgb-"+t].apply(this,u[this._type+"-rgb"].apply(this,this._components))},convert:function(t){return new D(t,this._convert(t),this._alpha)},getType:function(){return this._type},setType:function(t){this._components=this._convert(t),this._properties=i[t],this._type=t},getComponents:function(){var t=this._components.slice();return null!=this._alpha&&t.push(this._alpha),t},getAlpha:function(){return null!=this._alpha?this._alpha:1},setAlpha:function(t){this._alpha=null==t?null:Math.min(Math.max(t,0),1),this._changed()},hasAlpha:function(){return null!=this._alpha},equals:function(t){var n=e.isPlainValue(t)?D.read(arguments):t;return n===this||n&&this._class===n._class&&this._type===n._type&&this._alpha===n._alpha&&e.equals(this._components,n._components)||!1},toString:function(){for(var t=this._properties,e=[],n="gradient"===this._type,i=a.instance,r=0,s=t.length;s>r;r++){var o=this._components[r];null!=o&&e.push(t[r]+": "+(n?o:i.number(o)))}return null!=this._alpha&&e.push("alpha: "+i.number(this._alpha)),"{ "+e.join(", ")+" }"},toCSS:function(t){function e(t){return Math.round(255*(0>t?0:t>1?1:t))}var n=this._convert("rgb"),i=t||null==this._alpha?1:this._alpha;return n=[e(n[0]),e(n[1]),e(n[2])],1>i&&n.push(0>i?0:i),t?"#"+((1<<24)+(n[0]<<16)+(n[1]<<8)+n[2]).toString(16).slice(1):(4==n.length?"rgba(":"rgb(")+n.join(",")+")"},toCanvasStyle:function(t){if(this._canvasStyle)return this._canvasStyle;if("gradient"!==this._type)return this._canvasStyle=this.toCSS();var e,n=this._components,i=n[0],r=i._stops,s=n[1],a=n[2];if(i._radial){var o=a.getDistance(s),h=n[3];if(h){var u=h.subtract(s);u.getLength()>o&&(h=s.add(u.normalize(o-.1)))}var l=h||s;e=t.createRadialGradient(l.x,l.y,0,s.x,s.y,o)}else e=t.createLinearGradient(s.x,s.y,a.x,a.y);for(var c=0,d=r.length;d>c;c++){var f=r[c];e.addColorStop(f._rampPoint,f._color.toCanvasStyle())}return this._canvasStyle=e},transform:function(t){if("gradient"===this._type){for(var e=this._components,n=1,i=e.length;i>n;n++){var r=e[n];t._transformPoint(r,r,!0)}this._changed()}},statics:{_types:i,random:function(){var t=Math.random;return new D(t(),t(),t())}}})},new function(){var t={add:function(t,e){return t+e},subtract:function(t,e){return t-e},multiply:function(t,e){return t*e},divide:function(t,e){return t/e}};return e.each(t,function(t,e){this[e]=function(e){e=D.read(arguments);for(var n=this._type,i=this._components,r=e._convert(n),s=0,a=i.length;a>s;s++)r[s]=t(i[s],r[s]);return new D(n,r,null!=this._alpha?t(this._alpha,e.getAlpha()):null)}},{})});e.each(D._types,function(t,n){var i=this[e.capitalize(n)+"Color"]=function(t){var e=null!=t&&typeof t,i="object"===e&&null!=t.length?t:"string"===e?null:arguments;return i?new D(n,i):new D(t)};if(3==n.length){var r=n.toUpperCase();D[r]=this[r+"Color"]=i}},e.exports);var B=e.extend({_class:"Gradient",initialize:function Ce(t,e){this._id=Ce._id=(Ce._id||0)+1,t&&this._set(t)&&(t=e=null),this._stops||this.setStops(t||["white","black"]),null==this._radial&&this.setRadial("string"==typeof e&&"radial"===e||e||!1)},_serialize:function(t,n){return n.add(this,function(){return e.serialize([this._stops,this._radial],t,!0,n)})},_changed:function(){for(var t=0,e=this._owners&&this._owners.length;e>t;t++)this._owners[t]._changed()},_addOwner:function(t){this._owners||(this._owners=[]),this._owners.push(t)},_removeOwner:function(e){var n=this._owners?this._owners.indexOf(e):-1;-1!=n&&(this._owners.splice(n,1),0===this._owners.length&&(this._owners=t))},clone:function(){for(var t=[],e=0,n=this._stops.length;n>e;e++)t[e]=this._stops[e].clone();return new B(t)},getStops:function(){return this._stops},setStops:function(e){if(this.stops)for(var n=0,i=this._stops.length;i>n;n++)this._stops[n]._owner=t;if(e.length<2)throw Error("Gradient stop list needs to contain at least two stops.");this._stops=R.readAll(e,0,{clone:!0});for(var n=0,i=this._stops.length;i>n;n++){var r=this._stops[n];r._owner=this,r._defaultRamp&&r.setRampPoint(n/(i-1))}this._changed()},getRadial:function(){return this._radial},setRadial:function(t){this._radial=t,this._changed()},equals:function(t){if(t===this)return!0;if(t&&this._class===t._class&&this._stops.length===t._stops.length){for(var e=0,n=this._stops.length;n>e;e++)if(!this._stops[e].equals(t._stops[e]))return!1;return!0}return!1}}),R=e.extend({_class:"GradientStop",initialize:function(e,n){if(e){var i,r;n===t&&Array.isArray(e)?(i=e[0],r=e[1]):e.color?(i=e.color,r=e.rampPoint):(i=e,r=n),this.setColor(i),this.setRampPoint(r)}},clone:function(){return new R(this._color.clone(),this._rampPoint)},_serialize:function(t,n){return e.serialize([this._color,this._rampPoint],t,!0,n)},_changed:function(){this._owner&&this._owner._changed(65)},getRampPoint:function(){return this._rampPoint},setRampPoint:function(t){this._defaultRamp=null==t,this._rampPoint=t||0,this._changed()},getColor:function(){return this._color},setColor:function(t){this._color=D.read(arguments),this._color===t&&(this._color=t.clone()),this._color._owner=this,this._changed()},equals:function(t){return t===this||t&&this._class===t._class&&this._color.equals(t._color)&&this._rampPoint==t._rampPoint||!1}}),F=e.extend(new function(){var n={fillColor:t,strokeColor:t,strokeWidth:1,strokeCap:"butt",strokeJoin:"miter",miterLimit:10,dashOffset:0,dashArray:[],windingRule:"nonzero",shadowColor:t,shadowBlur:0,shadowOffset:new h,selectedColor:t,fontFamily:"sans-serif",fontWeight:"normal",fontSize:12,font:"sans-serif",leading:null,justification:"left"},i={strokeWidth:97,strokeCap:97,strokeJoin:97,miterLimit:97,fontFamily:9,fontWeight:9,fontSize:9,font:9,leading:9,justification:9},r={},s={_defaults:n,_textDefaults:new e(n,{fillColor:new D}),beans:!0};return e.each(n,function(n,a){var o=/Color$/.test(a),h=e.capitalize(a),u=i[a],l="set"+h,c="get"+h;s[l]=function(e){var n=this._owner,i=n&&n._children;if(i&&i.length>0&&!(n instanceof O))for(var r=0,s=i.length;s>r;r++)i[r]._style[l](e);else{var h=this._values[a];h!=e&&(o&&(h&&(h._owner=t),e&&e.constructor===D&&(e._owner&&(e=e.clone()),e._owner=n)),this._values[a]=e,n&&n._changed(u||65))}},s[c]=function(n){var i,r=this._owner,s=r&&r._children;if(!s||0===s.length||n||r instanceof O){var i=this._values[a];return i===t?(i=this._defaults[a],i&&i.clone&&(i=i.clone()),this._values[a]=i):!o||i&&i.constructor===D||(this._values[a]=i=D.read([i],0,{readNull:!0,clone:!0}),i&&(i._owner=r)),i}for(var h=0,u=s.length;u>h;h++){var l=s[h]._style[c]();if(0===h)i=l;else if(!e.equals(i,l))return t}return i},r[c]=function(){return this._style[c]()},r[l]=function(t){this._style[l](t)}}),y.inject(r),s},{_class:"Style",initialize:function(t,e,n){this._values={},this._owner=e,this._project=e&&e._project||n||paper.project,e instanceof N&&(this._defaults=this._textDefaults),t&&this.set(t)},set:function(t){var e=t instanceof F,n=e?t._values:t;if(n)for(var i in n)if(i in this._defaults){var r=n[i];this[i]=r&&e&&r.clone?r.clone():r}},equals:function(t){return t===this||t&&this._class===t._class&&e.equals(this._values,t._values)||!1},hasFill:function(){return!!this.getFillColor()},hasStroke:function(){return!!this.getStrokeColor()&&this.getStrokeWidth()>0},hasShadow:function(){return!!this.getShadowColor()&&this.getShadowBlur()>0},getView:function(){return this._project.getView()},getFontStyle:function(){var t=this.getFontSize();return this.getFontWeight()+" "+t+(/[a-z]/i.test(t+"")?" ":"px ")+this.getFontFamily()},getFont:"#getFontFamily",setFont:"#setFontFamily",getLeading:function Se(){var t=Se.base.call(this),e=this.getFontSize();return/pt|em|%|px/.test(e)&&(e=this.getView().getPixelSize(e)),null!=t?t:1.2*e}}),V=new function(){function n(t,i){for(var r=[],s=0,a=t&&t.length;a>s;){var o=t[s++];if("string"==typeof o)o=document.createElement(o);else if(!o||!o.nodeType)continue;e.isPlainObject(t[s])&&V.set(o,t[s++]),Array.isArray(t[s])&&n(t[s++],o),i&&i.appendChild(o),r.push(o)}return r}function i(t,e,n,i){for(var r=["webkit","moz","Moz","ms","o",""],s=e[0].toUpperCase()+e.substring(1),a=0;6>a;a++){var o=r[a],h=o?o+s:e;if(h in t){if(!n)return t[h];t[h]=i;break}}}var r=/^(checked|value|selected|disabled)$/i,s={text:"textContent",html:"innerHTML"},a={lineHeight:1,zoom:1,zIndex:1,opacity:1};return{create:function(t,e){var i=Array.isArray(t),r=n(i?t:arguments,i?e:null);return 1==r.length?r[0]:r},find:function(t,e){return(e||document).querySelector(t)},findAll:function(t,e){return(e||document).querySelectorAll(t)},get:function(t,e){return t?r.test(e)?"value"===e||"string"!=typeof t[e]?t[e]:!0:e in s?t[s[e]]:t.getAttribute(e):null},set:function(e,n,i){if("string"!=typeof n)for(var a in n)n.hasOwnProperty(a)&&this.set(e,a,n[a]);else{if(!e||i===t)return e;r.test(n)?e[n]=i:n in s?e[s[n]]=i:"style"===n?this.setStyle(e,i):"events"===n?q.add(e,i):e.setAttribute(n,i)}return e},getStyles:function(t){var e=t&&9!==t.nodeType?t.ownerDocument:t,n=e&&e.defaultView;return n&&n.getComputedStyle(t,"")},getStyle:function(t,e){return t&&t.style[e]||this.getStyles(t)[e]||null},setStyle:function(t,e,n){if("string"!=typeof e)for(var i in e)e.hasOwnProperty(i)&&this.setStyle(t,i,e[i]);else!/^-?[\d\.]+$/.test(n)||e in a||(n+="px"),t.style[e]=n;return t},hasClass:function(t,e){return RegExp("\\s*"+e+"\\s*").test(t.className)},addClass:function(t,e){t.className=(t.className+" "+e).trim()},removeClass:function(t,e){t.className=t.className.replace(RegExp("\\s*"+e+"\\s*")," ").trim()},remove:function(t){t.parentNode&&t.parentNode.removeChild(t)},removeChildren:function(t){for(;t.firstChild;)t.removeChild(t.firstChild)},getBounds:function(t,e){var n,i=t.ownerDocument,r=i.body,s=i.documentElement;try{n=t.getBoundingClientRect()}catch(a){n={left:0,top:0,width:0,height:0}}var o=n.left-(s.clientLeft||r.clientLeft||0),h=n.top-(s.clientTop||r.clientTop||0);if(!e){var u=i.defaultView;o+=u.pageXOffset||s.scrollLeft||r.scrollLeft,h+=u.pageYOffset||s.scrollTop||r.scrollTop}return new f(o,h,n.width,n.height)},getViewportBounds:function(t){var e=t.ownerDocument,n=e.defaultView,i=e.documentElement;return new f(0,0,n.innerWidth||i.clientWidth,n.innerHeight||i.clientHeight)},getOffset:function(t,e){return this.getBounds(t,e).getPoint()},getSize:function(t){return this.getBounds(t,!0).getSize()},isInvisible:function(t){return this.getSize(t).equals(new c(0,0))},isInView:function(t){return!this.isInvisible(t)&&this.getViewportBounds(t).intersects(this.getBounds(t,!0))},getPrefixed:function(t,e){return i(t,e)},setPrefixed:function(t,e,n){if("object"==typeof e)for(var r in e)i(t,r,!0,e[r]);else i(t,e,!0,n)}}},q={add:function(t,e){for(var n in e)for(var i=e[n],r=n.split(/[\s,]+/g),s=0,a=r.length;a>s;s++)t.addEventListener(r[s],i,!1)},remove:function(t,e){for(var n in e)for(var i=e[n],r=n.split(/[\s,]+/g),s=0,a=r.length;a>s;s++)t.removeEventListener(r[s],i,!1)},getPoint:function(t){var e=t.targetTouches?t.targetTouches.length?t.targetTouches[0]:t.changedTouches[0]:t;return new h(e.pageX||e.clientX+document.documentElement.scrollLeft,e.pageY||e.clientY+document.documentElement.scrollTop)},getTarget:function(t){return t.target||t.srcElement},getRelatedTarget:function(t){return t.relatedTarget||t.toElement},getOffset:function(t,e){return q.getPoint(t).subtract(V.getOffset(e||q.getTarget(t)))},stop:function(t){t.stopPropagation(),t.preventDefault()}};q.requestAnimationFrame=new function(){function t(){for(var e=s.length-1;e>=0;e--){var o=s[e],h=o[0],u=o[1];(!u||("true"==r.getAttribute(u,"keepalive")||a)&&V.isInView(u))&&(s.splice(e,1),h())}n&&(s.length?n(t):i=!1)}var e,n=V.getPrefixed(window,"requestAnimationFrame"),i=!1,s=[],a=!0;return q.add(window,{focus:function(){a=!0},blur:function(){a=!1}}),function(r,a){s.push([r,a]),n?i||(n(t),i=!0):e||(e=setInterval(t,1e3/60))}};var Z=e.extend(n,{_class:"View",initialize:function Pe(t,e){this._project=t,this._scope=t._scope,this._element=e;var n;this._pixelRatio||(this._pixelRatio=window.devicePixelRatio||1),this._id=e.getAttribute("id"),null==this._id&&e.setAttribute("id",this._id="view-"+Pe._id++),q.add(e,this._viewEvents);var i="none";if(V.setPrefixed(e.style,{userSelect:i,touchAction:i,touchCallout:i,contentZooming:i,userDrag:i,tapHighlightColor:"rgba(0,0,0,0)"}),r.hasAttribute(e,"resize")){var s=V.getOffset(e,!0),a=this;n=V.getViewportBounds(e).getSize().subtract(s),this._windowEvents={resize:function(){V.isInvisible(e)||(s=V.getOffset(e,!0)),a.setViewSize(V.getViewportBounds(e).getSize().subtract(s))}},q.add(window,this._windowEvents)}else if(n=V.getSize(e),n.isNaN()||n.isZero()){var o=function(t){return e[t]||parseInt(e.getAttribute(t),10)};n=new c(o("width"),o("height"))}if(this._setViewSize(n),r.hasAttribute(e,"stats")&&"undefined"!=typeof Stats){this._stats=new Stats;var h=this._stats.domElement,u=h.style,s=V.getOffset(e);u.position="absolute",u.left=s.x+"px",u.top=s.y+"px",document.body.appendChild(h)}Pe._views.push(this),Pe._viewsById[this._id]=this,this._viewSize=n,(this._matrix=new g)._owner=this,this._zoom=1,Pe._focused||(Pe._focused=this),this._frameItems={},this._frameItemCount=0},remove:function(){return this._project?(Z._focused===this&&(Z._focused=null),Z._views.splice(Z._views.indexOf(this),1),delete Z._viewsById[this._id],this._project._view===this&&(this._project._view=null),q.remove(this._element,this._viewEvents),q.remove(window,this._windowEvents),this._element=this._project=null,this.detach("frame"),this._animate=!1,this._frameItems={},!0):!1},_events:{onFrame:{install:function(){this.play()},uninstall:function(){this.pause()}},onResize:{}},_animate:!1,_time:0,_count:0,_requestFrame:function(){var t=this;q.requestAnimationFrame(function(){t._requested=!1,t._animate&&(t._requestFrame(),t._handleFrame())},this._element),this._requested=!0},_handleFrame:function(){paper=this._scope;var t=Date.now()/1e3,n=this._before?t-this._before:0;this._before=t,this._handlingFrame=!0,this.fire("frame",new e({delta:n,time:this._time+=n,count:this._count++})),this._stats&&this._stats.update(),this._handlingFrame=!1,this.update()},_animateItem:function(t,e){var n=this._frameItems;e?(n[t._id]={item:t,time:0,count:0},1===++this._frameItemCount&&this.attach("frame",this._handleFrameItems)):(delete n[t._id],0===--this._frameItemCount&&this.detach("frame",this._handleFrameItems))},_handleFrameItems:function(t){for(var n in this._frameItems){var i=this._frameItems[n];i.item.fire("frame",new e(t,{time:i.time+=t.delta,count:i.count++}))}},_update:function(){this._project._needsUpdate=!0,this._handlingFrame||(this._animate?this._handleFrame():this.update())},_changed:function(t){1&t&&(this._project._needsUpdate=!0)},_transform:function(t){this._matrix.concatenate(t),this._bounds=null,this._update()},getElement:function(){return this._element},getPixelRatio:function(){return this._pixelRatio},getResolution:function(){return 72*this._pixelRatio},getViewSize:function(){var t=this._viewSize;return new d(t.width,t.height,this,"setViewSize")},setViewSize:function(){var t=c.read(arguments),e=t.subtract(this._viewSize);e.isZero()||(this._viewSize.set(t.width,t.height),this._setViewSize(t),this._bounds=null,this.fire("resize",{size:t,delta:e}),this._update())},_setViewSize:function(t){var e=this._element;e.width=t.width,e.height=t.height},getBounds:function(){return this._bounds||(this._bounds=this._matrix.inverted()._transformBounds(new f(new h,this._viewSize))),this._bounds},getSize:function(){return this.getBounds().getSize()},getCenter:function(){return this.getBounds().getCenter()},setCenter:function(t){t=h.read(arguments),this.scrollBy(t.subtract(this.getCenter()))},getZoom:function(){return this._zoom},setZoom:function(t){this._transform((new g).scale(t/this._zoom,this.getCenter())),this._zoom=t},isVisible:function(){return V.isInView(this._element)},scrollBy:function(){this._transform((new g).translate(h.read(arguments).negate()))},play:function(){this._animate=!0,this._requested||this._requestFrame()},pause:function(){this._animate=!1},draw:function(){this.update()},projectToView:function(){return this._matrix._transformPoint(h.read(arguments))},viewToProject:function(){return this._matrix._inverseTransform(h.read(arguments))}},{statics:{_views:[],_viewsById:{},_id:0,create:function(t,e){return"string"==typeof e&&(e=document.getElementById(e)),new H(t,e)}}},new function(){function t(t){var e=q.getTarget(t);return e.getAttribute&&Z._viewsById[e.getAttribute("id")]}function e(t,e){return t.viewToProject(q.getOffset(e,t._element))}function n(){if(!Z._focused||!Z._focused.isVisible())for(var t=0,e=Z._views.length;e>t;t++){var n=Z._views[t];if(n&&n.isVisible()){Z._focused=a=n;break}}}function i(t,e,n){t._handleEvent("mousemove",e,n);var i=t._scope.tool;return i&&i._handleEvent(l&&i.responds("mousedrag")?"mousedrag":"mousemove",e,n),t.update(),i}var r,s,a,o,h,u,l=!1,c=window.navigator;c.pointerEnabled||c.msPointerEnabled?(o="pointerdown MSPointerDown",h="pointermove MSPointerMove",u="pointerup pointercancel MSPointerUp MSPointerCancel"):(o="touchstart",h="touchmove",u="touchend touchcancel","ontouchstart"in window&&c.userAgent.match(/mobile|tablet|ip(ad|hone|od)|android|silk/i)||(o+=" mousedown",h+=" mousemove",u+=" mouseup"));var d={"selectstart dragstart":function(t){l&&t.preventDefault()}},f={mouseout:function(t){var n=Z._focused,r=q.getRelatedTarget(t);!n||r&&"HTML"!==r.nodeName||i(n,e(n,t),t)},scroll:n};return d[o]=function(n){var i=Z._focused=t(n),s=e(i,n);l=!0,i._handleEvent("mousedown",s,n),(r=i._scope.tool)&&r._handleEvent("mousedown",s,n),i.update()},f[h]=function(o){var h=Z._focused;if(!l){var u=t(o);u?(h!==u&&i(h,e(h,o),o),s=h,h=Z._focused=a=u):a&&a===h&&(h=Z._focused=s,n())}if(h){var c=e(h,o);(l||h.getBounds().contains(c))&&(r=i(h,c,o))}},f[u]=function(t){var n=Z._focused;if(n&&l){var i=e(n,t);l=!1,n._handleEvent("mouseup",i,t),r&&r._handleEvent("mouseup",i,t),n.update()}},q.add(document,f),q.add(window,{load:n}),{_viewEvents:d,_handleEvent:function(){},statics:{updateFocus:n}}}),H=Z.extend({_class:"CanvasView",initialize:function(t,e){if(!(e instanceof HTMLCanvasElement)){var n=c.read(arguments);if(n.isZero())throw Error("Cannot create CanvasView with the provided argument: "+e);e=Q.getCanvas(n)}if(this._context=e.getContext("2d"),this._eventCounters={},this._pixelRatio=1,"off"!==r.getAttribute(e,"hidpi")){var i=window.devicePixelRatio||1,s=V.getPrefixed(this._context,"backingStorePixelRatio")||1;this._pixelRatio=i/s}Z.call(this,t,e)},_setViewSize:function(t){var e=t.width,n=t.height,i=this._pixelRatio,r=this._element,s=r.style;r.width=e*i,r.height=n*i,1!==i&&(s.width=e+"px",s.height=n+"px",this._context.scale(i,i))},getPixelSize:function(t){var e=this._context,n=e.font;return e.font=t+" serif",t=parseFloat(e.font),e.font=n,t},getTextWidth:function(t,e){var n=this._context,i=n.font,r=0;n.font=t;for(var s=0,a=e.length;a>s;s++)r=Math.max(r,n.measureText(e[s]).width);return n.font=i,r},update:function(){var t=this._project;if(!t||!t._needsUpdate)return!1;var e=this._context,n=this._viewSize;return e.clearRect(0,0,n.width+1,n.height+1),t.draw(e,this._matrix,this._pixelRatio),t._needsUpdate=!1,!0}},new function(){function e(e,n,i,r,s,a){function o(e){return e.responds(n)&&(h||(h=new $(n,i,r,s,a?r.subtract(a):null)),e.fire(n,h)&&h.isStopped)?(i.preventDefault(),!0):t}for(var h,u=s;u;){if(o(u))return!0;u=u.getParent()}return o(e)?!0:!1}var n,i,r,s,a,o,h,u,l;return{_handleEvent:function(t,c,d){if(this._eventCounters[t]){var f=this._project,_=f.hitTest(c,{tolerance:this._scope.settings.hitTolerance,fill:!0,stroke:!0}),g=_&&_.item,p=!1;switch(t){case"mousedown":for(p=e(this,t,d,c,g),u=a==g&&Date.now()-l<300,s=a=g,n=i=r=c,h=!p&&g;h&&!h.responds("mousedrag");)h=h._parent;break;case"mouseup":p=e(this,t,d,c,g,n),h&&(i&&!i.equals(c)&&e(this,"mousedrag",d,c,h,i),g!==h&&(r=c,e(this,"mousemove",d,c,g,r))),!p&&g&&g===s&&(l=Date.now(),e(this,u&&s.responds("doubleclick")?"doubleclick":"click",d,n,g),u=!1),s=h=null;break;case"mousemove":h&&(p=e(this,"mousedrag",d,c,h,i)),p||(g!==o&&(r=c),p=e(this,t,d,c,g,r)),i=r=c,g!==o&&(e(this,"mouseleave",d,c,o),o=g,e(this,"mouseenter",d,c,g))}return p}}}}),U=e.extend({_class:"Event",initialize:function(t){this.event=t},isPrevented:!1,isStopped:!1,preventDefault:function(){this.isPrevented=!0,this.event.preventDefault()},stopPropagation:function(){this.isStopped=!0,this.event.stopPropagation()},stop:function(){this.stopPropagation(),this.preventDefault()},getModifiers:function(){return G.modifiers}}),W=U.extend({_class:"KeyEvent",initialize:function(t,e,n,i){U.call(this,i),this.type=t?"keydown":"keyup",this.key=e,this.character=n},toString:function(){return"{ type: '"+this.type+"', key: '"+this.key+"', character: '"+this.character+"', modifiers: "+this.getModifiers()+" }"}}),G=new function(){function t(t,n,r,h){var u,l=r?String.fromCharCode(r):"",c=i[n],d=c||l.toLowerCase(),f=t?"keydown":"keyup",_=Z._focused,g=_&&_.isVisible()&&_._scope,p=g&&g.tool;o[d]=t,c&&(u=e.camelize(c))in s&&(s[u]=t),t?a[n]=r:delete a[n],p&&p.responds(f)&&(paper=g,p.fire(f,new W(t,d,l,h)),_&&_.update())}var n,i={8:"backspace",9:"tab",13:"enter",16:"shift",17:"control",18:"option",19:"pause",20:"caps-lock",27:"escape",32:"space",35:"end",36:"home",37:"left",38:"up",39:"right",40:"down",46:"delete",91:"command",93:"command",224:"command"},r={9:!0,13:!0,32:!0},s=new e({shift:!1,control:!1,option:!1,command:!1,capsLock:!1,space:!1}),a={},o={};return q.add(document,{keydown:function(e){var a=e.which||e.keyCode;a in i||s.command?t(!0,a,a in r||s.command?a:0,e):n=a},keypress:function(e){null!=n&&(t(!0,n,e.which||e.keyCode,e),n=null)},keyup:function(e){var n=e.which||e.keyCode;n in a&&t(!1,n,a[n],e)}}),q.add(window,{blur:function(e){for(var n in a)t(!1,n,a[n],e)}}),{modifiers:s,isDown:function(t){return!!o[t]}}},$=U.extend({_class:"MouseEvent",initialize:function(t,e,n,i,r){U.call(this,e),this.type=t,this.point=n,this.target=i,this.delta=r},toString:function(){return"{ type: '"+this.type+"', point: "+this.point+", target: "+this.target+(this.delta?", delta: "+this.delta:"")+", modifiers: "+this.getModifiers()+" }"}});e.extend(n,{_class:"Palette",_events:["onChange"],initialize:function(n,i,r){var s=V.find(".palettejs-panel")||V.find("body").appendChild(V.create("div",{"class":"palettejs-panel"}));this._element=s.appendChild(V.create("table",{"class":"palettejs-pane"})),this._title=n,r||(r={});for(var a in this.components=i){var o=i[a];o instanceof X||(null==o.value&&(o.value=r[a]),o.name=a,o=i[a]=new X(o)),this._element.appendChild(o._element),o._palette=this,r[a]===t&&(r[a]=o.value)}this.values=e.each(r,function(t,n){var s=i[n];s&&e.define(r,n,{enumerable:!0,configurable:!0,get:function(){return s._value},set:function(t){s.setValue(t)}})}),window.paper&&paper.palettes.push(this)},reset:function(){for(var t in this.components)this.components[t].reset()},remove:function(){V.remove(this._element)}});var X=e.extend(n,{_class:"Component",_events:["onChange","onClick"],_types:{"boolean":{type:"checkbox",value:"checked"},string:{type:"text"},number:{type:"number",number:!0},button:{type:"button"},text:{tag:"div",value:"text"},slider:{type:"range",number:!0},list:{tag:"select",setOptions:function(){V.removeChildren(this._input),V.create(e.each(this._options,function(t){this.push("option",{value:t,text:t})},[]),this._input)}},color:{type:"color",getValue:function(t){return new D(t)},setValue:function(t){return new D(t).toCSS("color"===V.get(this._input,"type"))}}},initialize:function ke(t){this._id=ke._id=(ke._id||0)+1,this._type=t.type in this._types?t.type:"options"in t?"list":"onClick"in t?"button":typeof t.value,this._meta=this._types[this._type]||{type:this._type};var n=this,i="component-"+this._id;this._dontFire=!0,this._input=V.create(this._meta.tag||"input",{id:i,type:this._meta.type,events:{change:function(){n.setValue(V.get(this,n._meta.value||"value"))},click:function(){n.fire("click")}}}),this.attach("change",function(t){this._dontFire||this._palette.fire("change",this,this.name,t)}),this._element=V.create("tr",["td",[this._label=V.create("label",{"for":i})],"td",[this._input]]),e.each(t,function(t,e){this[e]=t},this),this._defaultValue=this._value,this._dontFire=!1},getType:function(){return this._type},getLabel:function(){return this.__label},setLabel:function(t){this.__label=t,V.set(this._label,"text",t+":")},getOptions:function(){return this._options},setOptions:function(t){this._options=t;var e=this._meta.setOptions;e&&e.call(this)},getValue:function(){var t=this._value,e=this._meta.getValue;return e?e.call(this,t):t},setValue:function(t){var e=this._meta.value||"value",n=this._meta.setValue;n&&(t=n.call(this,t)),V.set(this._input,e,t),t=V.get(this._input,e),this._meta.number&&(t=parseFloat(t,10)),this._value!==t&&(this._value=t,this._dontFire||this.fire("change",this.getValue()))},getRange:function(){return[parseFloat(V.get(this._input,"min")),parseFloat(V.get(this._input,"max"))]},setRange:function(t,e){var n=Array.isArray(t)?t:[t,e];V.set(this._input,{min:n[0],max:n[1]})},getMin:function(){return this.getRange()[0]},setMin:function(t){this.setRange(t,this.getMax())},getMax:function(){return this.getRange()[1]},setMax:function(t){this.setRange(this.getMin(),t)},getStep:function(){return parseFloat(V.get(this._input,"step"))},setStep:function(t){V.set(this._input,"step",t)},reset:function(){this.setValue(this._defaultValue)}}),J=U.extend({_class:"ToolEvent",_item:null,initialize:function(t,e,n){this.tool=t,this.type=e,this.event=n},_choosePoint:function(t,e){return t?t:e?e.clone():null},getPoint:function(){return this._choosePoint(this._point,this.tool._point)},setPoint:function(t){this._point=t},getLastPoint:function(){return this._choosePoint(this._lastPoint,this.tool._lastPoint)},setLastPoint:function(t){this._lastPoint=t},getDownPoint:function(){return this._choosePoint(this._downPoint,this.tool._downPoint)},setDownPoint:function(t){this._downPoint=t},getMiddlePoint:function(){return!this._middlePoint&&this.tool._lastPoint?this.tool._point.add(this.tool._lastPoint).divide(2):this._middlePoint},setMiddlePoint:function(t){this._middlePoint=t},getDelta:function(){return!this._delta&&this.tool._lastPoint?this.tool._point.subtract(this.tool._lastPoint):this._delta},setDelta:function(t){this._delta=t},getCount:function(){return/^mouse(down|up)$/.test(this.type)?this.tool._downCount:this.tool._count
},setCount:function(t){this.tool[/^mouse(down|up)$/.test(this.type)?"downCount":"count"]=t},getItem:function(){if(!this._item){var t=this.tool._scope.project.hitTest(this.getPoint());if(t){for(var e=t.item,n=e._parent;/^(Group|CompoundPath)$/.test(n._class);)e=n,n=n._parent;this._item=e}}return this._item},setItem:function(t){this._item=t},toString:function(){return"{ type: "+this.type+", point: "+this.getPoint()+", count: "+this.getCount()+", modifiers: "+this.getModifiers()+" }"}}),Y=s.extend({_class:"Tool",_list:"tools",_reference:"tool",_events:["onActivate","onDeactivate","onEditOptions","onMouseDown","onMouseUp","onMouseDrag","onMouseMove","onKeyDown","onKeyUp"],initialize:function(t){s.call(this),this._firstMove=!0,this._count=0,this._downCount=0,this._set(t)},getMinDistance:function(){return this._minDistance},setMinDistance:function(t){this._minDistance=t,null!=this._minDistance&&null!=this._maxDistance&&this._minDistance>this._maxDistance&&(this._maxDistance=this._minDistance)},getMaxDistance:function(){return this._maxDistance},setMaxDistance:function(t){this._maxDistance=t,null!=this._minDistance&&null!=this._maxDistance&&this._maxDistance<this._minDistance&&(this._minDistance=t)},getFixedDistance:function(){return this._minDistance==this._maxDistance?this._minDistance:null},setFixedDistance:function(t){this._minDistance=t,this._maxDistance=t},_updateEvent:function(t,e,n,i,r,s,a){if(!r){if(null!=n||null!=i){var o=null!=n?n:0,h=e.subtract(this._point),u=h.getLength();if(o>u)return!1;var l=null!=i?i:0;if(0!=l)if(u>l)e=this._point.add(h.normalize(l));else if(a)return!1}if(s&&e.equals(this._point))return!1}switch(this._lastPoint=r&&"mousemove"==t?e:this._point,this._point=e,t){case"mousedown":this._lastPoint=this._downPoint,this._downPoint=this._point,this._downCount++;break;case"mouseup":this._lastPoint=this._downPoint}return this._count=r?0:this._count+1,!0},_fireEvent:function(t,e){var n=paper.project._removeSets;if(n){"mouseup"===t&&(n.mousedrag=null);var i=n[t];if(i){for(var r in i){var s=i[r];for(var a in n){var o=n[a];o&&o!=i&&delete o[s._id]}s.remove()}n[t]=null}}return this.responds(t)&&this.fire(t,new J(this,t,e))},_handleEvent:function(t,e,n){paper=this._scope;var i=!1;switch(t){case"mousedown":this._updateEvent(t,e,null,null,!0,!1,!1),i=this._fireEvent(t,n);break;case"mousedrag":for(var r=!1,s=!1;this._updateEvent(t,e,this.minDistance,this.maxDistance,!1,r,s);)i=this._fireEvent(t,n)||i,r=!0,s=!0;break;case"mouseup":!e.equals(this._point)&&this._updateEvent("mousedrag",e,this.minDistance,this.maxDistance,!1,!1,!1)&&(i=this._fireEvent("mousedrag",n)),this._updateEvent(t,e,null,this.maxDistance,!1,!1,!1),i=this._fireEvent(t,n)||i,this._updateEvent(t,e,null,null,!0,!1,!1),this._firstMove=!0;break;case"mousemove":for(;this._updateEvent(t,e,this.minDistance,this.maxDistance,this._firstMove,!0,!1);)i=this._fireEvent(t,n)||i,this._firstMove=!1}return i&&n.preventDefault(),i}}),K={request:function(t,e,n){var i=new(window.ActiveXObject||XMLHttpRequest)("Microsoft.XMLHTTP");return i.open(t.toUpperCase(),e,!0),"overrideMimeType"in i&&i.overrideMimeType("text/plain"),i.onreadystatechange=function(){if(4===i.readyState){var t=i.status;if(0!==t&&200!==t)throw Error("Could not load "+e+" (Error "+t+")");n.call(i,i.responseText)}},i.send(null)}},Q={canvases:[],getCanvas:function(t,e,n){var i,r=!0;"object"==typeof t&&(n=e,e=t.height,t=t.width),n?1!==n&&(t*=n,e*=n):n=1,i=this.canvases.length?this.canvases.pop():document.createElement("canvas");var s=i.getContext("2d");return i.width===t&&i.height===e?r&&s.clearRect(0,0,t+1,e+1):(i.width=t,i.height=e),s.save(),1!==n&&s.scale(n,n),i},getContext:function(t,e,n){return this.getCanvas(t,e,n).getContext("2d")},release:function(t){var e=t.canvas?t.canvas:t;e.getContext("2d").restore(),this.canvases.push(e)}},te=new function(){function t(t,e,n){return.2989*t+.587*e+.114*n}function n(e,n,i,r){var s=r-t(e,n,i);f=e+s,_=n+s,g=i+s;var r=t(f,_,g),a=p(f,_,g),o=v(f,_,g);if(0>a){var h=r-a;f=r+(f-r)*r/h,_=r+(_-r)*r/h,g=r+(g-r)*r/h}if(o>255){var u=255-r,l=o-r;f=r+(f-r)*u/l,_=r+(_-r)*u/l,g=r+(g-r)*u/l}}function i(t,e,n){return v(t,e,n)-p(t,e,n)}function r(t,e,n,i){var r,s=[t,e,n],a=v(t,e,n),o=p(t,e,n);o=o===t?0:o===e?1:2,a=a===t?0:a===e?1:2,r=0===p(o,a)?1===v(o,a)?2:1:0,s[a]>s[o]?(s[r]=(s[r]-s[o])*i/(s[a]-s[o]),s[a]=i):s[r]=s[a]=0,s[o]=0,f=s[0],_=s[1],g=s[2]}var s,a,o,h,u,l,c,d,f,_,g,p=Math.min,v=Math.max,m=Math.abs,y={multiply:function(){f=u*s/255,_=l*a/255,g=c*o/255},screen:function(){f=u+s-u*s/255,_=l+a-l*a/255,g=c+o-c*o/255},overlay:function(){f=128>u?2*u*s/255:255-2*(255-u)*(255-s)/255,_=128>l?2*l*a/255:255-2*(255-l)*(255-a)/255,g=128>c?2*c*o/255:255-2*(255-c)*(255-o)/255},"soft-light":function(){var t=s*u/255;f=t+u*(255-(255-u)*(255-s)/255-t)/255,t=a*l/255,_=t+l*(255-(255-l)*(255-a)/255-t)/255,t=o*c/255,g=t+c*(255-(255-c)*(255-o)/255-t)/255},"hard-light":function(){f=128>s?2*s*u/255:255-2*(255-s)*(255-u)/255,_=128>a?2*a*l/255:255-2*(255-a)*(255-l)/255,g=128>o?2*o*c/255:255-2*(255-o)*(255-c)/255},"color-dodge":function(){f=0===u?0:255===s?255:p(255,255*u/(255-s)),_=0===l?0:255===a?255:p(255,255*l/(255-a)),g=0===c?0:255===o?255:p(255,255*c/(255-o))},"color-burn":function(){f=255===u?255:0===s?0:v(0,255-255*(255-u)/s),_=255===l?255:0===a?0:v(0,255-255*(255-l)/a),g=255===c?255:0===o?0:v(0,255-255*(255-c)/o)},darken:function(){f=s>u?u:s,_=a>l?l:a,g=o>c?c:o},lighten:function(){f=u>s?u:s,_=l>a?l:a,g=c>o?c:o},difference:function(){f=u-s,0>f&&(f=-f),_=l-a,0>_&&(_=-_),g=c-o,0>g&&(g=-g)},exclusion:function(){f=u+s*(255-u-u)/255,_=l+a*(255-l-l)/255,g=c+o*(255-c-c)/255},hue:function(){r(s,a,o,i(u,l,c)),n(f,_,g,t(u,l,c))},saturation:function(){r(u,l,c,i(s,a,o)),n(f,_,g,t(u,l,c))},luminosity:function(){n(u,l,c,t(s,a,o))},color:function(){n(s,a,o,t(u,l,c))},add:function(){f=p(u+s,255),_=p(l+a,255),g=p(c+o,255)},subtract:function(){f=v(u-s,0),_=v(l-a,0),g=v(c-o,0)},average:function(){f=(u+s)/2,_=(l+a)/2,g=(c+o)/2},negation:function(){f=255-m(255-s-u),_=255-m(255-a-l),g=255-m(255-o-c)}},w=this.nativeModes=e.each(["source-over","source-in","source-out","source-atop","destination-over","destination-in","destination-out","destination-atop","lighter","darker","copy","xor"],function(t){this[t]=!0},{}),x=Q.getContext(1,1);e.each(y,function(t,e){var n="darken"===e,i=!1;x.save();try{x.fillStyle=n?"#300":"#a00",x.fillRect(0,0,1,1),x.globalCompositeOperation=e,x.globalCompositeOperation===e&&(x.fillStyle=n?"#a00":"#300",x.fillRect(0,0,1,1),i=x.getImageData(0,0,1,1).data[0]!==n?170:51)}catch(r){}x.restore(),w[e]=i}),Q.release(x),this.process=function(t,e,n,i,r){var p=e.canvas,v="normal"===t;if(v||w[t])n.save(),n.setTransform(1,0,0,1,0,0),n.globalAlpha=i,v||(n.globalCompositeOperation=t),n.drawImage(p,r.x,r.y),n.restore();else{var m=y[t];if(!m)return;for(var x=n.getImageData(r.x,r.y,p.width,p.height),b=x.data,C=e.getImageData(0,0,p.width,p.height).data,S=0,P=b.length;P>S;S+=4){s=C[S],u=b[S],a=C[S+1],l=b[S+1],o=C[S+2],c=b[S+2],h=C[S+3],d=b[S+3],m();var k=h*i/255,M=1-k;b[S]=k*f+M*u,b[S+1]=k*_+M*l,b[S+2]=k*g+M*c,b[S+3]=h*i+M*d}n.putImageData(x,r.x,r.y)}}},ee=e.each({fillColor:["fill","color"],strokeColor:["stroke","color"],strokeWidth:["stroke-width","number"],strokeCap:["stroke-linecap","string"],strokeJoin:["stroke-linejoin","string"],miterLimit:["stroke-miterlimit","number"],dashArray:["stroke-dasharray","array"],dashOffset:["stroke-dashoffset","number"],fontFamily:["font-family","string"],fontWeight:["font-weight","string"],fontSize:["font-size","number"],justification:["text-anchor","lookup",{left:"start",center:"middle",right:"end"}],opacity:["opacity","number"],blendMode:["mix-blend-mode","string"]},function(t,n){var i=e.capitalize(n),r=t[2];this[n]={type:t[1],property:n,attribute:t[0],toSVG:r,fromSVG:r&&e.each(r,function(t,e){this[t]=e},{}),get:"get"+i,set:"set"+i}},{}),ne={href:"http://www.w3.org/1999/xlink",xlink:"http://www.w3.org/2000/xmlns"};return new function(){function t(t,e){for(var n in e){var i=e[n],r=ne[n];"number"==typeof i&&(i=S.number(i)),r?t.setAttributeNS(r,n,i):t.setAttribute(n,i)}return t}function n(e,n){return t(document.createElementNS("http://www.w3.org/2000/svg",e),n)}function r(t,e,n){var i=t._matrix,r=i.getTranslation(),s={};if(e){i=i.shiftless();var a=i._inverseTransform(r);s[n?"cx":"x"]=a.x,s[n?"cy":"y"]=a.y,r=null}if(!i.isIdentity()){var h=i.decompose();if(h&&!h.shearing){var u=[],l=h.rotation,c=h.scaling;r&&!r.isZero()&&u.push("translate("+S.point(r)+")"),l&&u.push("rotate("+S.number(l)+")"),o.isZero(c.x-1)&&o.isZero(c.y-1)||u.push("scale("+S.point(c)+")"),s.transform=u.join(" ")}else s.transform="matrix("+i.getValues().join(",")+")"}return s}function s(e,i){for(var s=r(e),a=e._children,o=n("g",s),h=0,u=a.length;u>h;h++){var l=a[h],c=b(l,i);if(c)if(l.isClipMask()){var d=n("clipPath");d.appendChild(c),w(l,d,"clip"),t(o,{"clip-path":"url(#"+d.id+")"})}else o.appendChild(c)}return o}function h(t){var e=r(t,!0),i=t.getSize();return e.x-=i.width/2,e.y-=i.height/2,e.width=i.width,e.height=i.height,e.href=t.toDataURL(),n("image",e)}function u(t,e){if(e.matchShapes){var r=t.toShape(!1);if(r)return c(r,e)}var s,a,o=t._segments;if(0===o.length)return null;if(t.isPolygon())if(o.length>=3){s=t._closed?"polygon":"polyline";var h=[];for(i=0,l=o.length;l>i;i++)h.push(S.point(o[i]._point));a={points:h.join(" ")}}else{s="line";var u=o[0]._point,d=o[o.length-1]._point;a={x1:u.x,y1:u.y,x2:d.x,y2:d.y}}else{s="path";var f=t.getPathData();a=f&&{d:f}}return n(s,a)}function c(t){var e=t._type,i=t._radius,s=r(t,!0,"rectangle"!==e);if("rectangle"===e){e="rect";var a=t._size,o=a.width,h=a.height;s.x-=o/2,s.y-=h/2,s.width=o,s.height=h,i.isZero()&&(i=null)}return i&&("circle"===e?s.r=i:(s.rx=i.width,s.ry=i.height)),n(e,s)}function d(t){var e=r(t,!0),i=t.getPathData();return i&&(e.d=i),n("path",e)}function f(t,e){var i=r(t,!0),s=t.getSymbol(),a=m(s,"symbol"),o=s.getDefinition(),h=o.getBounds();return a||(a=n("symbol",{viewBox:S.rectangle(h)}),a.appendChild(b(o,e)),w(s,a,"symbol")),i.href="#"+a.id,i.x+=h.x,i.y+=h.y,i.width=S.number(h.width),i.height=S.number(h.height),n("use",i)}function _(t){var e=m(t,"color");if(!e){var i,r=t.getGradient(),s=r._radial,a=t.getOrigin().transform(),o=t.getDestination().transform();if(s){i={cx:a.x,cy:a.y,r:a.getDistance(o)};var h=t.getHighlight();h&&(h=h.transform(),i.fx=h.x,i.fy=h.y)}else i={x1:a.x,y1:a.y,x2:o.x,y2:o.y};i.gradientUnits="userSpaceOnUse",e=n((s?"radial":"linear")+"Gradient",i);for(var u=r._stops,l=0,c=u.length;c>l;l++){var d=u[l],f=d._color,_=f.getAlpha();i={offset:d._rampPoint,"stop-color":f.toCSS(!0)},1>_&&(i["stop-opacity"]=_),e.appendChild(n("stop",i))}w(t,e,"color")}return"url(#"+e.id+")"}function g(t){var e=n("text",r(t,!0));return e.textContent=t._content,e}function p(n,i){var r={},s=n.getParent();return null!=n._name&&(r.id=n._name),e.each(ee,function(t){var i=t.get,a=t.type,o=n[i]();if(!s||!e.equals(s[i](),o)){if("color"===a&&null!=o){var h=o.getAlpha();1>h&&(r[t.attribute+"-opacity"]=h)}r[t.attribute]=null==o?"none":"number"===a?S.number(o):"color"===a?o.gradient?_(o,n):o.toCSS(!0):"array"===a?o.join(","):"lookup"===a?t.toSVG[o]:o}}),1===r.opacity&&delete r.opacity,null==n._visibility||n._visibility||(r.visibility="hidden"),t(i,r)}function m(t,e){return P||(P={ids:{},svgs:{}}),t&&P.svgs[e+"-"+t._id]}function w(t,e,n){P||m();var i=P.ids[n]=(P.ids[n]||0)+1;e.id=n+"-"+i,P.svgs[n+"-"+t._id]=e}function x(t,e){var i=t,r=null;if(P){i="svg"===t.nodeName.toLowerCase()&&t;for(var s in P.svgs)r||(i||(i=n("svg"),i.appendChild(t)),r=i.insertBefore(n("defs"),i.firstChild)),r.appendChild(P.svgs[s]);P=null}return e.asString?(new XMLSerializer).serializeToString(i):i}function b(t,e){var n=k[t._class],i=n&&n(t,e);if(i&&t._data){var r=JSON.stringify(t._data);"{}"!==r&&i.setAttribute("data-paper-data",r)}return i&&p(t,i)}function C(t){return t||(t={}),S=new a(t.precision),t}var S,P,k={Group:s,Layer:s,Raster:h,Path:u,Shape:c,CompoundPath:d,PlacedSymbol:f,PointText:g};y.inject({exportSVG:function(t){return t=C(t),x(b(this,t),t)}}),v.inject({exportSVG:function(t){t=C(t);for(var e=this.layers,i=this.getView().getSize(),r=n("svg",{x:0,y:0,width:i.width,height:i.height,version:"1.1",xmlns:"http://www.w3.org/2000/svg","xmlns:xlink":"http://www.w3.org/1999/xlink"}),s=0,a=e.length;a>s;s++)r.appendChild(b(e[s],t));return x(r,t)}})},new function(){function n(t,e,n,i){var r=ne[e],s=r?t.getAttributeNS(r,e):t.getAttribute(e);return"null"===s&&(s=null),null==s?i?null:n?"":0:n?s:parseFloat(s)}function i(t,e,i,r){return e=n(t,e,!1,r),i=n(t,i,!1,r),!r||null!=e&&null!=i?new h(e,i):null}function r(t,e,i,r){return e=n(t,e,!1,r),i=n(t,i,!1,r),!r||null!=e&&null!=i?new c(e,i):null}function s(t,e,n){return"none"===t?null:"number"===e?parseFloat(t):"array"===e?t?t.split(/[\s,]+/g).map(parseFloat):[]:"color"===e?S(t)||t:"lookup"===e?n[t]:t}function a(t,e,n,i){var r=t.childNodes,s="clippath"===e,a=new w,o=a._project,h=o._currentStyle,u=[];s||(a=x(a,t,n),o._currentStyle=a._style.clone());for(var l=0,c=r.length;c>l;l++){var d,f=r[l];1!==f.nodeType||!(d=P(f,!1,i))||d instanceof m||u.push(d)}return a.addChildren(u),s&&(a=x(a.reduce(),t,n)),o._currentStyle=h,(s||"defs"===e)&&(a.remove(),a=null),a}function o(t,e){for(var n=t.getAttribute("points").match(/[+-]?(?:\d*\.\d+|\d+\.?)(?:[eE][+-]?\d+)?/g),i=[],r=0,s=n.length;s>r;r+=2)i.push(new h(parseFloat(n[r]),parseFloat(n[r+1])));var a=new T(i);return"polygon"===e&&a.closePath(),a}function u(t){var e=t.getAttribute("d"),n={pathData:e};return e.match(/m/gi).length>1||/z\S+/i.test(e)?new O(n):new T(n)}function l(t,e){var r,s=(n(t,"href",!0)||"").substring(1),a="radialgradient"===e;if(s)r=z[s].getGradient();else{for(var o=t.childNodes,h=[],u=0,l=o.length;l>u;u++){var c=o[u];1===c.nodeType&&h.push(x(new R,c))}r=new B(h,a)}var d,f,_;return a?(d=i(t,"cx","cy"),f=d.add(n(t,"r"),0),_=i(t,"fx","fy",!0)):(d=i(t,"x1","y1"),f=i(t,"x2","y2")),x(new D(r,d,f,_),t),null}function d(t,e,n,i){for(var r=(i.getAttribute(n)||"").split(/\)\s*/g),s=new g,a=0,o=r.length;o>a;a++){var h=r[a];if(!h)break;for(var u=h.split("("),l=u[0],c=u[1].split(/[\s,]+/g),d=0,f=c.length;f>d;d++)c[d]=parseFloat(c[d]);switch(l){case"matrix":s.concatenate(new g(c[0],c[1],c[2],c[3],c[4],c[5]));break;case"rotate":s.rotate(c[0],c[1],c[2]);break;case"translate":s.translate(c[0],c[1]);break;case"scale":s.scale(c);break;case"skewX":s.skew(c[0],0);break;case"skewY":s.skew(0,c[0])}}t.transform(s)}function _(t,e,n){var i=t["fill-opacity"===n?"getFillColor":"getStrokeColor"]();i&&i.setAlpha(parseFloat(e))}function p(n,i,r){var s=n.attributes[i],a=s&&s.value;if(!a){var o=e.camelize(i);a=n.style[o],a||r.node[o]===r.parent[o]||(a=r.node[o])}return a?"none"===a?null:a:t}function x(n,i,r){var s={node:V.getStyles(i)||{},parent:!r&&V.getStyles(i.parentNode)||{}};return e.each(M,function(r,a){var o=p(i,a,s);o!==t&&(n=e.pick(r(n,o,a,i,s),n))}),n}function S(t){var e=t&&t.match(/\((?:#|)([^)']+)/);return e&&z[e[1]]}function P(t,e,n){function i(t){paper=s;var i=P(t,e,n),r=n.onLoad,a=s.project&&s.getView();r&&r.call(this,i),a.update()}if(!t)return null;n?"function"==typeof n&&(n={onLoad:n}):n={};var r=t,s=paper;if(e)if("string"!=typeof t||/^.*</.test(t)){if("undefined"!=typeof File&&t instanceof File){var a=new FileReader;return a.onload=function(){i(a.result)},a.readAsText(t)}}else{if(r=document.getElementById(t),!r)return K.request("get",t,i);t=null}if("string"==typeof t&&(r=(new DOMParser).parseFromString(t,"image/svg+xml")),!r.nodeName)throw Error("Unsupported SVG source: "+t);var o,h=r.nodeName.toLowerCase(),u=k[h],l=r.getAttribute&&r.getAttribute("data-paper-data"),c=s.settings,d=c.applyMatrix;return c.applyMatrix=!1,o=u&&u(r,h,e,n)||null,c.applyMatrix=d,o&&(o instanceof w||(o=x(o,r,e)),n.expandShapes&&o instanceof b&&(o.remove(),o=o.toPath()),l&&(o._data=JSON.parse(l))),e&&(z={}),o}var k={"#document":function(t,e,n,i){for(var r=t.childNodes,s=0,a=r.length;a>s;s++){var o=r[s];if(1===o.nodeType){var h=o.nextSibling;document.body.appendChild(o);var u=P(o,n,i);return h?t.insertBefore(o,h):t.appendChild(o),u}}},g:a,svg:a,clippath:a,polygon:o,polyline:o,path:u,lineargradient:l,radialgradient:l,image:function(t){var e=new C(n(t,"href",!0));return e.attach("load",function(){var e=r(t,"width","height");this.setSize(e);var n=this._matrix._transformPoint(i(t,"x","y").add(e.divide(2)));this.translate(n)}),e},symbol:function(t,e,n,i){return new m(a(t,e,n,i),!0)},defs:a,use:function(t){var e=(n(t,"href",!0)||"").substring(1),r=z[e],s=i(t,"x","y");return r?r instanceof m?r.place(s):r.clone().translate(s):null},circle:function(t){return new b.Circle(i(t,"cx","cy"),n(t,"r"))},ellipse:function(t){return new b.Ellipse({center:i(t,"cx","cy"),radius:r(t,"rx","ry")})},rect:function(t){var e=i(t,"x","y"),n=r(t,"width","height"),s=r(t,"rx","ry");return new b.Rectangle(new f(e,n),s)},line:function(t){return new T.Line(i(t,"x1","y1"),i(t,"x2","y2"))},text:function(t){var e=new j(i(t,"x","y").add(i(t,"dx","dy")));return e.setContent(t.textContent.trim()||""),e}},M=e.each(ee,function(t){this[t.attribute]=function(e,n){if(e[t.set](s(n,t.type,t.fromSVG)),"color"===t.type&&e instanceof b){var i=e[t.get]();i&&i.transform((new g).translate(e.getPosition(!0).negate()))}}},{id:function(t,e){z[e]=t,t.setName&&t.setName(e)},"clip-path":function(t,e){var n=S(e);if(n){if(n=n.clone(),n.setClipMask(!0),!(t instanceof w))return new w(n,t);t.insertChild(0,n)}},gradientTransform:d,transform:d,"fill-opacity":_,"stroke-opacity":_,visibility:function(t,e){t.setVisible("visible"===e)},"stop-color":function(t,e){t.setColor&&t.setColor(e)},"stop-opacity":function(t,e){t._color&&t._color.setAlpha(parseFloat(e))},offset:function(t,e){var n=e.match(/(.*)%$/);t.setRampPoint(n?n[1]/100:parseFloat(e))},viewBox:function(t,e,n,i,a){var o=new f(s(e,"array")),h=r(i,"width","height",!0);if(t instanceof w){var u=h?o.getSize().divide(h):1,l=(new g).translate(o.getPoint()).scale(u);t.transform(l.inverted())}else if(t instanceof m){h&&o.setSize(h);var c="visible"!=p(i,"overflow",a),d=t._definition;c&&!o.contains(d.getBounds())&&(c=new b.Rectangle(o).transform(d._matrix),c.setClipMask(!0),d.addChild(c))}}}),z={};y.inject({importSVG:function(t,e){return this.addChild(P(t,!0,e))}}),v.inject({importSVG:function(t,e){return this.activate(),P(t,!0,e)}})},e.exports.PaperScript=function(){function t(t,e,n){var i=d[e];if(t&&t[i]){var r=t[i](n);return"!="===e?!r:r}switch(e){case"+":return t+n;case"-":return t-n;case"*":return t*n;case"/":return t/n;case"%":return t%n;case"==":return t==n;case"!=":return t!=n}}function n(t,e){var n=f[t];if(n&&e&&e[n])return e[n]();switch(t){case"+":return+e;case"-":return-e}}function i(t){function e(t){for(var e=0,n=s.length;n>e;e++){var i=s[e];if(i[0]>=t)break;t+=i[1]}return t}function n(n){return t.substring(e(n.range[0]),e(n.range[1]))}function i(n,i){for(var r=e(n.range[0]),a=e(n.range[1]),o=0,h=s.length-1;h>=0;h--)if(r>s[h][0]){o=h+1;break}s.splice(o,0,[r,i.length-a+r]),t=t.substring(0,r)+i+t.substring(a)}function r(t,e){if(t){for(var s in t)if("range"!==s){var a=t[s];if(Array.isArray(a))for(var o=0,h=a.length;h>o;o++)r(a[o],t);else a&&"object"==typeof a&&r(a,t)}switch(t&&t.type){case"UnaryExpression":if(t.operator in f&&"Literal"!==t.argument.type){var u=n(t.argument);i(t,'$_("'+t.operator+'", '+u+")")}break;case"BinaryExpression":if(t.operator in d&&"Literal"!==t.left.type){var l=n(t.left),c=n(t.right);i(t,"_$_("+l+', "'+t.operator+'", '+c+")")}break;case"UpdateExpression":case"AssignmentExpression":if(!e||!("ForStatement"===e.type||"BinaryExpression"===e.type&&/^[=!<>]/.test(e.operator)||"MemberExpression"===e.type&&e.computed))if("UpdateExpression"===t.type){if(!t.prefix){var u=n(t.argument);i(t,u+" = _$_("+u+', "'+t.operator[0]+'", 1)')}}else if(/^.=$/.test(t.operator)&&"Literal"!==t.left.type){var l=n(t.left),c=n(t.right);i(t,l+" = _$_("+l+', "'+t.operator[0]+'", '+c+")")}}}}var s=[];return r(l.acorn.parse(t,{ranges:!0})),t}function s(r,s){function a(t,e){for(var n in t)!e&&/^_/.test(n)||!RegExp("\\b"+n.replace(/\$/g,"\\$")+"\\b").test(r)||(f.push(n),_.push(t[n]))}paper=s;var o,u=s.getView(),l=/\s+on(?:Key|Mouse)(?:Up|Down|Move|Drag)\b/.test(r)?new Y:null,c=l?l._events:[],d=["onFrame","onResize"].concat(c),f=[],_=[];r=i(r),a({_$_:t,$_:n,view:u,tool:l},!0),a(s),d=e.each(d,function(t){RegExp("\\s+"+t+"\\b").test(r)&&(f.push(t),this.push(t+": "+t))},[]).join(", "),d&&(r+="\nreturn { "+d+" };");var g=window.InstallTrigger;if(g||window.chrome){var p=document.createElement("script"),v=document.head;g&&(r="\n"+r),p.appendChild(document.createTextNode("paper._execute = function("+f+") {"+r+"\n}")),v.appendChild(p),o=paper._execute,delete paper._execute,v.removeChild(p)}else o=Function(f,r);var m=o.apply(s,_)||{};e.each(c,function(t){var e=m[t];e&&(l[t]=e)}),u&&(m.onResize&&u.setOnResize(m.onResize),u.fire("resize",{size:u.size,delta:new h}),m.onFrame&&u.setOnFrame(m.onFrame),u.update())}function a(){e.each(document.getElementsByTagName("script"),function(t){if(/^text\/(?:x-|)paperscript$/.test(t.type)&&!t.getAttribute("data-paper-ignore")){var e=r.getAttribute(t,"canvas"),n=r.get(e)||new r(t).setup(e),i=t.src;i?K.request("get",i,function(t){s(t,n)}):s(t.innerHTML,n),t.setAttribute("data-paper-ignore",!0)}},this)}var o,u,l=this;!function(t,e){return"object"==typeof o&&"object"==typeof module?e(o):"function"==typeof u&&u.amd?u(["exports"],e):(e(t.acorn||(t.acorn={})),void 0)}(this,function(t){"use strict";function e(t){ce=t||{};for(var e in ge)Object.prototype.hasOwnProperty.call(ce,e)||(ce[e]=ge[e]);_e=ce.sourceFile||null}function n(t,e){var n=pe(de,t);e+=" ("+n.line+":"+n.column+")";var i=new SyntaxError(e);throw i.pos=t,i.loc=n,i.raisedAt=ve,i}function i(t){function e(t){if(1==t.length)return n+="return str === "+JSON.stringify(t[0])+";";n+="switch(str){";for(var e=0;e<t.length;++e)n+="case "+JSON.stringify(t[e])+":";n+="return true}return false;"}t=t.split(" ");var n="",i=[];t:for(var r=0;r<t.length;++r){for(var s=0;s<i.length;++s)if(i[s][0].length==t[r].length){i[s].push(t[r]);continue t}i.push([t[r]])}if(i.length>3){i.sort(function(t,e){return e.length-t.length}),n+="switch(str.length){";for(var r=0;r<i.length;++r){var a=i[r];n+="case "+a[0].length+":",e(a)}n+="}"}else e(t);return Function("str",n)}function r(){this.line=Pe,this.column=ve-ke}function s(){Pe=1,ve=ke=0,Se=!0,u()}function a(t,e){ye=ve,ce.locations&&(xe=new r),be=t,u(),Ce=e,Se=t.beforeExpr}function o(){var t=ce.onComment&&ce.locations&&new r,e=ve,i=de.indexOf("*/",ve+=2);if(-1===i&&n(ve-2,"Unterminated comment"),ve=i+2,ce.locations){Yn.lastIndex=e;for(var s;(s=Yn.exec(de))&&s.index<ve;)++Pe,ke=s.index+s[0].length}ce.onComment&&ce.onComment(!0,de.slice(e+2,i),e,ve,t,ce.locations&&new r)}function h(){for(var t=ve,e=ce.onComment&&ce.locations&&new r,n=de.charCodeAt(ve+=2);fe>ve&&10!==n&&13!==n&&8232!==n&&8329!==n;)++ve,n=de.charCodeAt(ve);ce.onComment&&ce.onComment(!1,de.slice(t+2,ve),t,ve,e,ce.locations&&new r)}function u(){for(;fe>ve;){var t=de.charCodeAt(ve);if(32===t)++ve;else if(13===t){++ve;var e=de.charCodeAt(ve);10===e&&++ve,ce.locations&&(++Pe,ke=ve)}else if(10===t)++ve,++Pe,ke=ve;else if(14>t&&t>8)++ve;else if(47===t){var e=de.charCodeAt(ve+1);if(42===e)o();else{if(47!==e)break;h()}}else if(160===t)++ve;else{if(!(t>=5760&&Un.test(String.fromCharCode(t))))break;++ve}}}function l(){var t=de.charCodeAt(ve+1);return t>=48&&57>=t?S(!0):(++ve,a(xn))}function c(){var t=de.charCodeAt(ve+1);return Se?(++ve,x()):61===t?w(Pn,2):w(Cn,1)}function d(){var t=de.charCodeAt(ve+1);return 61===t?w(Pn,2):w(Dn,1)}function f(t){var e=de.charCodeAt(ve+1);return e===t?w(124===t?In:An,2):61===e?w(Pn,2):w(124===t?Tn:Ln,1)}function _(){var t=de.charCodeAt(ve+1);return 61===t?w(Pn,2):w(On,1)}function g(t){var e=de.charCodeAt(ve+1);return e===t?w(Mn,2):61===e?w(Pn,2):w(kn,1)}function p(t){var e=de.charCodeAt(ve+1),n=1;return e===t?(n=62===t&&62===de.charCodeAt(ve+2)?3:2,61===de.charCodeAt(ve+n)?w(Pn,n+1):w(jn,n)):(61===e&&(n=61===de.charCodeAt(ve+2)?3:2),w(Nn,n))}function v(t){var e=de.charCodeAt(ve+1);return 61===e?w(En,61===de.charCodeAt(ve+2)?3:2):w(61===t?Sn:zn,1)}function m(t){switch(t){case 46:return l();case 40:return++ve,a(pn);case 41:return++ve,a(vn);case 59:return++ve,a(yn);case 44:return++ve,a(mn);case 91:return++ve,a(dn);case 93:return++ve,a(fn);case 123:return++ve,a(_n);case 125:return++ve,a(gn);case 58:return++ve,a(wn);case 63:return++ve,a(bn);case 48:var e=de.charCodeAt(ve+1);if(120===e||88===e)return C();case 49:case 50:case 51:case 52:case 53:case 54:case 55:case 56:case 57:return S(!1);case 34:case 39:return P(t);case 47:return c(t);case 37:case 42:return d();case 124:case 38:return f(t);case 94:return _();case 43:case 45:return g(t);case 60:case 62:return p(t);case 61:case 33:return v(t);case 126:return w(zn,1)}return!1}function y(t){if(t?ve=me+1:me=ve,ce.locations&&(we=new r),t)return x();if(ve>=fe)return a(Be);var e=de.charCodeAt(ve);if(Kn(e)||92===e)return z();var i=m(e);if(i===!1){var s=String.fromCharCode(e);if("\\"===s||$n.test(s))return z();n(ve,"Unexpected character '"+s+"'")}return i}function w(t,e){var n=de.slice(ve,ve+e);ve+=e,a(t,n)}function x(){for(var t,e,i="",r=ve;;){ve>=fe&&n(r,"Unterminated regular expression");var s=de.charAt(ve);if(Jn.test(s)&&n(r,"Unterminated regular expression"),t)t=!1;else{if("["===s)e=!0;else if("]"===s&&e)e=!1;else if("/"===s&&!e)break;t="\\"===s}++ve}var i=de.slice(r,ve);++ve;var o=M();return o&&!/^[gmsiy]*$/.test(o)&&n(r,"Invalid regexp flag"),a(Ne,RegExp(i,o))}function b(t,e){for(var n=ve,i=0,r=0,s=null==e?1/0:e;s>r;++r){var a,o=de.charCodeAt(ve);if(a=o>=97?o-97+10:o>=65?o-65+10:o>=48&&57>=o?o-48:1/0,a>=t)break;++ve,i=i*t+a}return ve===n||null!=e&&ve-n!==e?null:i}function C(){ve+=2;var t=b(16);return null==t&&n(me+2,"Expected hexadecimal number"),Kn(de.charCodeAt(ve))&&n(ve,"Identifier directly after number"),a(Ee,t)}function S(t){var e=ve,i=!1,r=48===de.charCodeAt(ve);t||null!==b(10)||n(e,"Invalid number"),46===de.charCodeAt(ve)&&(++ve,b(10),i=!0);var s=de.charCodeAt(ve);(69===s||101===s)&&(s=de.charCodeAt(++ve),(43===s||45===s)&&++ve,null===b(10)&&n(e,"Invalid number"),i=!0),Kn(de.charCodeAt(ve))&&n(ve,"Identifier directly after number");var o,h=de.slice(e,ve);return i?o=parseFloat(h):r&&1!==h.length?/[89]/.test(h)||Oe?n(e,"Invalid number"):o=parseInt(h,8):o=parseInt(h,10),a(Ee,o)}function P(t){ve++;for(var e="";;){ve>=fe&&n(me,"Unterminated string constant");var i=de.charCodeAt(ve);if(i===t)return++ve,a(je,e);if(92===i){i=de.charCodeAt(++ve);var r=/^[0-7]+/.exec(de.slice(ve,ve+3));for(r&&(r=r[0]);r&&parseInt(r,8)>255;)r=r.slice(0,r.length-1);if("0"===r&&(r=null),++ve,r)Oe&&n(ve-2,"Octal literal in strict mode"),e+=String.fromCharCode(parseInt(r,8)),ve+=r.length-1;else switch(i){case 110:e+="\n";break;case 114:e+="\r";break;case 120:e+=String.fromCharCode(k(2));break;case 117:e+=String.fromCharCode(k(4));break;case 85:e+=String.fromCharCode(k(8));break;case 116:e+="	";break;case 98:e+="\b";break;case 118:e+="";break;case 102:e+="\f";break;case 48:e+="\0";break;case 13:10===de.charCodeAt(ve)&&++ve;case 10:ce.locations&&(ke=ve,++Pe);break;default:e+=String.fromCharCode(i)}}else(13===i||10===i||8232===i||8329===i)&&n(me,"Unterminated string constant"),e+=String.fromCharCode(i),++ve}}function k(t){var e=b(16,t);return null===e&&n(me,"Bad character escape sequence"),e}function M(){Rn=!1;for(var t,e=!0,i=ve;;){var r=de.charCodeAt(ve);if(Qn(r))Rn&&(t+=de.charAt(ve)),++ve;else{if(92!==r)break;Rn||(t=de.slice(i,ve)),Rn=!0,117!=de.charCodeAt(++ve)&&n(ve,"Expecting Unicode escape sequence \\uXXXX"),++ve;var s=k(4),a=String.fromCharCode(s);a||n(ve-1,"Invalid Unicode escape"),(e?Kn(s):Qn(s))||n(ve-4,"Invalid Unicode escape"),t+=a}e=!1}return Rn?t:de.slice(i,ve)}function z(){var t=M(),e=De;return Rn||(Hn(t)?e=cn[t]:(ce.forbidReserved&&(3===ce.ecmaVersion?Fn:Vn)(t)||Oe&&qn(t))&&n(me,"The keyword '"+t+"' is reserved")),a(e,t)}function I(){Me=me,ze=ye,Ie=xe,y()}function A(t){for(Oe=t,ve=ze;ke>ve;)ke=de.lastIndexOf("\n",ke-2)+1,--Pe;u(),y()}function T(){this.type=null,this.start=me,this.end=null}function O(){this.start=we,this.end=null,null!==_e&&(this.source=_e)}function L(){var t=new T;return ce.locations&&(t.loc=new O),ce.ranges&&(t.range=[me,0]),t}function E(t){var e=new T;return e.start=t.start,ce.locations&&(e.loc=new O,e.loc.start=t.loc.start),ce.ranges&&(e.range=[t.range[0],0]),e}function N(t,e){return t.type=e,t.end=ze,ce.locations&&(t.loc.end=Ie),ce.ranges&&(t.range[1]=ze),t}function j(t){return ce.ecmaVersion>=5&&"ExpressionStatement"===t.type&&"Literal"===t.expression.type&&"use strict"===t.expression.value}function D(t){return be===t?(I(),!0):void 0}function B(){return!ce.strictSemicolons&&(be===Be||be===gn||Jn.test(de.slice(ze,me)))}function R(){D(yn)||B()||V()}function F(t){be===t?I():V()}function V(){n(me,"Unexpected token")}function q(t){"Identifier"!==t.type&&"MemberExpression"!==t.type&&n(t.start,"Assigning to rvalue"),Oe&&"Identifier"===t.type&&Zn(t.name)&&n(t.start,"Assigning to "+t.name+" in strict mode")}function Z(t){Me=ze=ve,ce.locations&&(Ie=new r),Ae=Oe=null,Te=[],y();var e=t||L(),n=!0;for(t||(e.body=[]);be!==Be;){var i=H();e.body.push(i),n&&j(i)&&A(!0),n=!1}return N(e,"Program")}function H(){be===Cn&&y(!0);var t=be,e=L();switch(t){case Re:case qe:I();var i=t===Re;D(yn)||B()?e.label=null:be!==De?V():(e.label=le(),R());for(var r=0;r<Te.length;++r){var s=Te[r];if(null==e.label||s.name===e.label.name){if(null!=s.kind&&(i||"loop"===s.kind))break;if(e.label&&i)break}}return r===Te.length&&n(e.start,"Unsyntactic "+t.keyword),N(e,i?"BreakStatement":"ContinueStatement");case Ze:return I(),R(),N(e,"DebuggerStatement");case Ue:return I(),Te.push(ti),e.body=H(),Te.pop(),F(nn),e.test=U(),R(),N(e,"DoWhileStatement");case $e:if(I(),Te.push(ti),F(pn),be===yn)return G(e,null);if(be===en){var a=L();return I(),X(a,!0),1===a.declarations.length&&D(ln)?$(e,a):G(e,a)}var a=J(!1,!0);return D(ln)?(q(a),$(e,a)):G(e,a);case Xe:return I(),he(e,!0);case Je:return I(),e.test=U(),e.consequent=H(),e.alternate=D(We)?H():null,N(e,"IfStatement");case Ye:return Ae||n(me,"'return' outside of function"),I(),D(yn)||B()?e.argument=null:(e.argument=J(),R()),N(e,"ReturnStatement");case Ke:I(),e.discriminant=U(),e.cases=[],F(_n),Te.push(ei);for(var o,h;be!=gn;)if(be===Fe||be===He){var u=be===Fe;o&&N(o,"SwitchCase"),e.cases.push(o=L()),o.consequent=[],I(),u?o.test=J():(h&&n(Me,"Multiple default clauses"),h=!0,o.test=null),F(wn)}else o||V(),o.consequent.push(H());return o&&N(o,"SwitchCase"),I(),Te.pop(),N(e,"SwitchStatement");case Qe:return I(),Jn.test(de.slice(ze,me))&&n(ze,"Illegal newline after throw"),e.argument=J(),R(),N(e,"ThrowStatement");case tn:if(I(),e.block=W(),e.handler=null,be===Ve){var l=L();I(),F(pn),l.param=le(),Oe&&Zn(l.param.name)&&n(l.param.start,"Binding "+l.param.name+" in strict mode"),F(vn),l.guard=null,l.body=W(),e.handler=N(l,"CatchClause")}return e.guardedHandlers=Le,e.finalizer=D(Ge)?W():null,e.handler||e.finalizer||n(e.start,"Missing catch or finally clause"),N(e,"TryStatement");case en:return I(),e=X(e),R(),e;case nn:return I(),e.test=U(),Te.push(ti),e.body=H(),Te.pop(),N(e,"WhileStatement");case rn:return Oe&&n(me,"'with' in strict mode"),I(),e.object=U(),e.body=H(),N(e,"WithStatement");case _n:return W();case yn:return I(),N(e,"EmptyStatement");default:var c=Ce,d=J();if(t===De&&"Identifier"===d.type&&D(wn)){for(var r=0;r<Te.length;++r)Te[r].name===c&&n(d.start,"Label '"+c+"' is already declared");var f=be.isLoop?"loop":be===Ke?"switch":null;return Te.push({name:c,kind:f}),e.body=H(),Te.pop(),e.label=d,N(e,"LabeledStatement")}return e.expression=d,R(),N(e,"ExpressionStatement")}}function U(){F(pn);var t=J();return F(vn),t}function W(t){var e,n=L(),i=!0,r=!1;for(n.body=[],F(_n);!D(gn);){var s=H();n.body.push(s),i&&t&&j(s)&&(e=r,A(r=!0)),i=!1}return r&&!e&&A(!1),N(n,"BlockStatement")}function G(t,e){return t.init=e,F(yn),t.test=be===yn?null:J(),F(yn),t.update=be===vn?null:J(),F(vn),t.body=H(),Te.pop(),N(t,"ForStatement")}function $(t,e){return t.left=e,t.right=J(),F(vn),t.body=H(),Te.pop(),N(t,"ForInStatement")
}function X(t,e){for(t.declarations=[],t.kind="var";;){var i=L();if(i.id=le(),Oe&&Zn(i.id.name)&&n(i.id.start,"Binding "+i.id.name+" in strict mode"),i.init=D(Sn)?J(!0,e):null,t.declarations.push(N(i,"VariableDeclarator")),!D(mn))break}return N(t,"VariableDeclaration")}function J(t,e){var n=Y(e);if(!t&&be===mn){var i=E(n);for(i.expressions=[n];D(mn);)i.expressions.push(Y(e));return N(i,"SequenceExpression")}return n}function Y(t){var e=K(t);if(be.isAssign){var n=E(e);return n.operator=Ce,n.left=e,I(),n.right=Y(t),q(e),N(n,"AssignmentExpression")}return e}function K(t){var e=Q(t);if(D(bn)){var n=E(e);return n.test=e,n.consequent=J(!0),F(wn),n.alternate=J(!0,t),N(n,"ConditionalExpression")}return e}function Q(t){return te(ee(),-1,t)}function te(t,e,n){var i=be.binop;if(null!=i&&(!n||be!==ln)&&i>e){var r=E(t);r.left=t,r.operator=Ce,I(),r.right=te(ee(),i,n);var r=N(r,/&&|\|\|/.test(r.operator)?"LogicalExpression":"BinaryExpression");return te(r,e,n)}return t}function ee(){if(be.prefix){var t=L(),e=be.isUpdate;return t.operator=Ce,t.prefix=!0,I(),t.argument=ee(),e?q(t.argument):Oe&&"delete"===t.operator&&"Identifier"===t.argument.type&&n(t.start,"Deleting local variable in strict mode"),N(t,e?"UpdateExpression":"UnaryExpression")}for(var i=ne();be.postfix&&!B();){var t=E(i);t.operator=Ce,t.prefix=!1,t.argument=i,q(i),I(),i=N(t,"UpdateExpression")}return i}function ne(){return ie(re())}function ie(t,e){if(D(xn)){var n=E(t);return n.object=t,n.property=le(!0),n.computed=!1,ie(N(n,"MemberExpression"),e)}if(D(dn)){var n=E(t);return n.object=t,n.property=J(),n.computed=!0,F(fn),ie(N(n,"MemberExpression"),e)}if(!e&&D(pn)){var n=E(t);return n.callee=t,n.arguments=ue(vn,!1),ie(N(n,"CallExpression"),e)}return t}function re(){switch(be){case an:var t=L();return I(),N(t,"ThisExpression");case De:return le();case Ee:case je:case Ne:var t=L();return t.value=Ce,t.raw=de.slice(me,ye),I(),N(t,"Literal");case on:case hn:case un:var t=L();return t.value=be.atomValue,t.raw=be.keyword,I(),N(t,"Literal");case pn:var e=we,n=me;I();var i=J();return i.start=n,i.end=ye,ce.locations&&(i.loc.start=e,i.loc.end=xe),ce.ranges&&(i.range=[n,ye]),F(vn),i;case dn:var t=L();return I(),t.elements=ue(fn,!0,!0),N(t,"ArrayExpression");case _n:return ae();case Xe:var t=L();return I(),he(t,!1);case sn:return se();default:V()}}function se(){var t=L();return I(),t.callee=ie(re(),!0),t.arguments=D(pn)?ue(vn,!1):Le,N(t,"NewExpression")}function ae(){var t=L(),e=!0,i=!1;for(t.properties=[],I();!D(gn);){if(e)e=!1;else if(F(mn),ce.allowTrailingCommas&&D(gn))break;var r,s={key:oe()},a=!1;if(D(wn)?(s.value=J(!0),r=s.kind="init"):ce.ecmaVersion>=5&&"Identifier"===s.key.type&&("get"===s.key.name||"set"===s.key.name)?(a=i=!0,r=s.kind=s.key.name,s.key=oe(),be!==pn&&V(),s.value=he(L(),!1)):V(),"Identifier"===s.key.type&&(Oe||i))for(var o=0;o<t.properties.length;++o){var h=t.properties[o];if(h.key.name===s.key.name){var u=r==h.kind||a&&"init"===h.kind||"init"===r&&("get"===h.kind||"set"===h.kind);u&&!Oe&&"init"===r&&"init"===h.kind&&(u=!1),u&&n(s.key.start,"Redefinition of property")}}t.properties.push(s)}return N(t,"ObjectExpression")}function oe(){return be===Ee||be===je?re():le(!0)}function he(t,e){be===De?t.id=le():e?V():t.id=null,t.params=[];var i=!0;for(F(pn);!D(vn);)i?i=!1:F(mn),t.params.push(le());var r=Ae,s=Te;if(Ae=!0,Te=[],t.body=W(!0),Ae=r,Te=s,Oe||t.body.body.length&&j(t.body.body[0]))for(var a=t.id?-1:0;a<t.params.length;++a){var o=0>a?t.id:t.params[a];if((qn(o.name)||Zn(o.name))&&n(o.start,"Defining '"+o.name+"' in strict mode"),a>=0)for(var h=0;a>h;++h)o.name===t.params[h].name&&n(o.start,"Argument name clash in strict mode")}return N(t,e?"FunctionDeclaration":"FunctionExpression")}function ue(t,e,n){for(var i=[],r=!0;!D(t);){if(r)r=!1;else if(F(mn),e&&ce.allowTrailingCommas&&D(t))break;n&&be===mn?i.push(null):i.push(J(!0))}return i}function le(t){var e=L();return e.name=be===De?Ce:t&&!ce.forbidReserved&&be.keyword||V(),I(),N(e,"Identifier")}t.version="0.3.2";var ce,de,fe,_e;t.parse=function(t,n){return de=t+"",fe=de.length,e(n),s(),Z(ce.program)};var ge=t.defaultOptions={ecmaVersion:5,strictSemicolons:!1,allowTrailingCommas:!0,forbidReserved:!1,locations:!1,onComment:null,ranges:!1,program:null,sourceFile:null},pe=t.getLineInfo=function(t,e){for(var n=1,i=0;;){Yn.lastIndex=i;var r=Yn.exec(t);if(!(r&&r.index<e))break;++n,i=r.index+r[0].length}return{line:n,column:e-i}};t.tokenize=function(t,n){function i(t){return y(t),r.start=me,r.end=ye,r.startLoc=we,r.endLoc=xe,r.type=be,r.value=Ce,r}de=t+"",fe=de.length,e(n),s();var r={};return i.jumpTo=function(t,e){if(ve=t,ce.locations){Pe=1,ke=Yn.lastIndex=0;for(var n;(n=Yn.exec(de))&&n.index<t;)++Pe,ke=n.index+n[0].length}Se=e,u()},i};var ve,me,ye,we,xe,be,Ce,Se,Pe,ke,Me,ze,Ie,Ae,Te,Oe,Le=[],Ee={type:"num"},Ne={type:"regexp"},je={type:"string"},De={type:"name"},Be={type:"eof"},Re={keyword:"break"},Fe={keyword:"case",beforeExpr:!0},Ve={keyword:"catch"},qe={keyword:"continue"},Ze={keyword:"debugger"},He={keyword:"default"},Ue={keyword:"do",isLoop:!0},We={keyword:"else",beforeExpr:!0},Ge={keyword:"finally"},$e={keyword:"for",isLoop:!0},Xe={keyword:"function"},Je={keyword:"if"},Ye={keyword:"return",beforeExpr:!0},Ke={keyword:"switch"},Qe={keyword:"throw",beforeExpr:!0},tn={keyword:"try"},en={keyword:"var"},nn={keyword:"while",isLoop:!0},rn={keyword:"with"},sn={keyword:"new",beforeExpr:!0},an={keyword:"this"},on={keyword:"null",atomValue:null},hn={keyword:"true",atomValue:!0},un={keyword:"false",atomValue:!1},ln={keyword:"in",binop:7,beforeExpr:!0},cn={"break":Re,"case":Fe,"catch":Ve,"continue":qe,"debugger":Ze,"default":He,"do":Ue,"else":We,"finally":Ge,"for":$e,"function":Xe,"if":Je,"return":Ye,"switch":Ke,"throw":Qe,"try":tn,"var":en,"while":nn,"with":rn,"null":on,"true":hn,"false":un,"new":sn,"in":ln,"instanceof":{keyword:"instanceof",binop:7,beforeExpr:!0},"this":an,"typeof":{keyword:"typeof",prefix:!0,beforeExpr:!0},"void":{keyword:"void",prefix:!0,beforeExpr:!0},"delete":{keyword:"delete",prefix:!0,beforeExpr:!0}},dn={type:"[",beforeExpr:!0},fn={type:"]"},_n={type:"{",beforeExpr:!0},gn={type:"}"},pn={type:"(",beforeExpr:!0},vn={type:")"},mn={type:",",beforeExpr:!0},yn={type:";",beforeExpr:!0},wn={type:":",beforeExpr:!0},xn={type:"."},bn={type:"?",beforeExpr:!0},Cn={binop:10,beforeExpr:!0},Sn={isAssign:!0,beforeExpr:!0},Pn={isAssign:!0,beforeExpr:!0},kn={binop:9,prefix:!0,beforeExpr:!0},Mn={postfix:!0,prefix:!0,isUpdate:!0},zn={prefix:!0,beforeExpr:!0},In={binop:1,beforeExpr:!0},An={binop:2,beforeExpr:!0},Tn={binop:3,beforeExpr:!0},On={binop:4,beforeExpr:!0},Ln={binop:5,beforeExpr:!0},En={binop:6,beforeExpr:!0},Nn={binop:7,beforeExpr:!0},jn={binop:8,beforeExpr:!0},Dn={binop:10,beforeExpr:!0};t.tokTypes={bracketL:dn,bracketR:fn,braceL:_n,braceR:gn,parenL:pn,parenR:vn,comma:mn,semi:yn,colon:wn,dot:xn,question:bn,slash:Cn,eq:Sn,name:De,eof:Be,num:Ee,regexp:Ne,string:je};for(var Bn in cn)t.tokTypes["_"+Bn]=cn[Bn];var Rn,Fn=i("abstract boolean byte char class double enum export extends final float goto implements import int interface long native package private protected public short static super synchronized throws transient volatile"),Vn=i("class enum extends super const export import"),qn=i("implements interface let package private protected public static yield"),Zn=i("eval arguments"),Hn=i("break case catch continue debugger default do else finally for function if return switch throw try var while with null true false instanceof typeof void delete new in this"),Un=/[\u1680\u180e\u2000-\u200a\u2028\u2029\u202f\u205f\u3000\ufeff]/,Wn="\xaa\xb5\xba\xc0-\xd6\xd8-\xf6\xf8-\u02c1\u02c6-\u02d1\u02e0-\u02e4\u02ec\u02ee\u0370-\u0374\u0376\u0377\u037a-\u037d\u0386\u0388-\u038a\u038c\u038e-\u03a1\u03a3-\u03f5\u03f7-\u0481\u048a-\u0527\u0531-\u0556\u0559\u0561-\u0587\u05d0-\u05ea\u05f0-\u05f2\u0620-\u064a\u066e\u066f\u0671-\u06d3\u06d5\u06e5\u06e6\u06ee\u06ef\u06fa-\u06fc\u06ff\u0710\u0712-\u072f\u074d-\u07a5\u07b1\u07ca-\u07ea\u07f4\u07f5\u07fa\u0800-\u0815\u081a\u0824\u0828\u0840-\u0858\u08a0\u08a2-\u08ac\u0904-\u0939\u093d\u0950\u0958-\u0961\u0971-\u0977\u0979-\u097f\u0985-\u098c\u098f\u0990\u0993-\u09a8\u09aa-\u09b0\u09b2\u09b6-\u09b9\u09bd\u09ce\u09dc\u09dd\u09df-\u09e1\u09f0\u09f1\u0a05-\u0a0a\u0a0f\u0a10\u0a13-\u0a28\u0a2a-\u0a30\u0a32\u0a33\u0a35\u0a36\u0a38\u0a39\u0a59-\u0a5c\u0a5e\u0a72-\u0a74\u0a85-\u0a8d\u0a8f-\u0a91\u0a93-\u0aa8\u0aaa-\u0ab0\u0ab2\u0ab3\u0ab5-\u0ab9\u0abd\u0ad0\u0ae0\u0ae1\u0b05-\u0b0c\u0b0f\u0b10\u0b13-\u0b28\u0b2a-\u0b30\u0b32\u0b33\u0b35-\u0b39\u0b3d\u0b5c\u0b5d\u0b5f-\u0b61\u0b71\u0b83\u0b85-\u0b8a\u0b8e-\u0b90\u0b92-\u0b95\u0b99\u0b9a\u0b9c\u0b9e\u0b9f\u0ba3\u0ba4\u0ba8-\u0baa\u0bae-\u0bb9\u0bd0\u0c05-\u0c0c\u0c0e-\u0c10\u0c12-\u0c28\u0c2a-\u0c33\u0c35-\u0c39\u0c3d\u0c58\u0c59\u0c60\u0c61\u0c85-\u0c8c\u0c8e-\u0c90\u0c92-\u0ca8\u0caa-\u0cb3\u0cb5-\u0cb9\u0cbd\u0cde\u0ce0\u0ce1\u0cf1\u0cf2\u0d05-\u0d0c\u0d0e-\u0d10\u0d12-\u0d3a\u0d3d\u0d4e\u0d60\u0d61\u0d7a-\u0d7f\u0d85-\u0d96\u0d9a-\u0db1\u0db3-\u0dbb\u0dbd\u0dc0-\u0dc6\u0e01-\u0e30\u0e32\u0e33\u0e40-\u0e46\u0e81\u0e82\u0e84\u0e87\u0e88\u0e8a\u0e8d\u0e94-\u0e97\u0e99-\u0e9f\u0ea1-\u0ea3\u0ea5\u0ea7\u0eaa\u0eab\u0ead-\u0eb0\u0eb2\u0eb3\u0ebd\u0ec0-\u0ec4\u0ec6\u0edc-\u0edf\u0f00\u0f40-\u0f47\u0f49-\u0f6c\u0f88-\u0f8c\u1000-\u102a\u103f\u1050-\u1055\u105a-\u105d\u1061\u1065\u1066\u106e-\u1070\u1075-\u1081\u108e\u10a0-\u10c5\u10c7\u10cd\u10d0-\u10fa\u10fc-\u1248\u124a-\u124d\u1250-\u1256\u1258\u125a-\u125d\u1260-\u1288\u128a-\u128d\u1290-\u12b0\u12b2-\u12b5\u12b8-\u12be\u12c0\u12c2-\u12c5\u12c8-\u12d6\u12d8-\u1310\u1312-\u1315\u1318-\u135a\u1380-\u138f\u13a0-\u13f4\u1401-\u166c\u166f-\u167f\u1681-\u169a\u16a0-\u16ea\u16ee-\u16f0\u1700-\u170c\u170e-\u1711\u1720-\u1731\u1740-\u1751\u1760-\u176c\u176e-\u1770\u1780-\u17b3\u17d7\u17dc\u1820-\u1877\u1880-\u18a8\u18aa\u18b0-\u18f5\u1900-\u191c\u1950-\u196d\u1970-\u1974\u1980-\u19ab\u19c1-\u19c7\u1a00-\u1a16\u1a20-\u1a54\u1aa7\u1b05-\u1b33\u1b45-\u1b4b\u1b83-\u1ba0\u1bae\u1baf\u1bba-\u1be5\u1c00-\u1c23\u1c4d-\u1c4f\u1c5a-\u1c7d\u1ce9-\u1cec\u1cee-\u1cf1\u1cf5\u1cf6\u1d00-\u1dbf\u1e00-\u1f15\u1f18-\u1f1d\u1f20-\u1f45\u1f48-\u1f4d\u1f50-\u1f57\u1f59\u1f5b\u1f5d\u1f5f-\u1f7d\u1f80-\u1fb4\u1fb6-\u1fbc\u1fbe\u1fc2-\u1fc4\u1fc6-\u1fcc\u1fd0-\u1fd3\u1fd6-\u1fdb\u1fe0-\u1fec\u1ff2-\u1ff4\u1ff6-\u1ffc\u2071\u207f\u2090-\u209c\u2102\u2107\u210a-\u2113\u2115\u2119-\u211d\u2124\u2126\u2128\u212a-\u212d\u212f-\u2139\u213c-\u213f\u2145-\u2149\u214e\u2160-\u2188\u2c00-\u2c2e\u2c30-\u2c5e\u2c60-\u2ce4\u2ceb-\u2cee\u2cf2\u2cf3\u2d00-\u2d25\u2d27\u2d2d\u2d30-\u2d67\u2d6f\u2d80-\u2d96\u2da0-\u2da6\u2da8-\u2dae\u2db0-\u2db6\u2db8-\u2dbe\u2dc0-\u2dc6\u2dc8-\u2dce\u2dd0-\u2dd6\u2dd8-\u2dde\u2e2f\u3005-\u3007\u3021-\u3029\u3031-\u3035\u3038-\u303c\u3041-\u3096\u309d-\u309f\u30a1-\u30fa\u30fc-\u30ff\u3105-\u312d\u3131-\u318e\u31a0-\u31ba\u31f0-\u31ff\u3400-\u4db5\u4e00-\u9fcc\ua000-\ua48c\ua4d0-\ua4fd\ua500-\ua60c\ua610-\ua61f\ua62a\ua62b\ua640-\ua66e\ua67f-\ua697\ua6a0-\ua6ef\ua717-\ua71f\ua722-\ua788\ua78b-\ua78e\ua790-\ua793\ua7a0-\ua7aa\ua7f8-\ua801\ua803-\ua805\ua807-\ua80a\ua80c-\ua822\ua840-\ua873\ua882-\ua8b3\ua8f2-\ua8f7\ua8fb\ua90a-\ua925\ua930-\ua946\ua960-\ua97c\ua984-\ua9b2\ua9cf\uaa00-\uaa28\uaa40-\uaa42\uaa44-\uaa4b\uaa60-\uaa76\uaa7a\uaa80-\uaaaf\uaab1\uaab5\uaab6\uaab9-\uaabd\uaac0\uaac2\uaadb-\uaadd\uaae0-\uaaea\uaaf2-\uaaf4\uab01-\uab06\uab09-\uab0e\uab11-\uab16\uab20-\uab26\uab28-\uab2e\uabc0-\uabe2\uac00-\ud7a3\ud7b0-\ud7c6\ud7cb-\ud7fb\uf900-\ufa6d\ufa70-\ufad9\ufb00-\ufb06\ufb13-\ufb17\ufb1d\ufb1f-\ufb28\ufb2a-\ufb36\ufb38-\ufb3c\ufb3e\ufb40\ufb41\ufb43\ufb44\ufb46-\ufbb1\ufbd3-\ufd3d\ufd50-\ufd8f\ufd92-\ufdc7\ufdf0-\ufdfb\ufe70-\ufe74\ufe76-\ufefc\uff21-\uff3a\uff41-\uff5a\uff66-\uffbe\uffc2-\uffc7\uffca-\uffcf\uffd2-\uffd7\uffda-\uffdc",Gn="\u0300-\u036f\u0483-\u0487\u0591-\u05bd\u05bf\u05c1\u05c2\u05c4\u05c5\u05c7\u0610-\u061a\u0620-\u0649\u0672-\u06d3\u06e7-\u06e8\u06fb-\u06fc\u0730-\u074a\u0800-\u0814\u081b-\u0823\u0825-\u0827\u0829-\u082d\u0840-\u0857\u08e4-\u08fe\u0900-\u0903\u093a-\u093c\u093e-\u094f\u0951-\u0957\u0962-\u0963\u0966-\u096f\u0981-\u0983\u09bc\u09be-\u09c4\u09c7\u09c8\u09d7\u09df-\u09e0\u0a01-\u0a03\u0a3c\u0a3e-\u0a42\u0a47\u0a48\u0a4b-\u0a4d\u0a51\u0a66-\u0a71\u0a75\u0a81-\u0a83\u0abc\u0abe-\u0ac5\u0ac7-\u0ac9\u0acb-\u0acd\u0ae2-\u0ae3\u0ae6-\u0aef\u0b01-\u0b03\u0b3c\u0b3e-\u0b44\u0b47\u0b48\u0b4b-\u0b4d\u0b56\u0b57\u0b5f-\u0b60\u0b66-\u0b6f\u0b82\u0bbe-\u0bc2\u0bc6-\u0bc8\u0bca-\u0bcd\u0bd7\u0be6-\u0bef\u0c01-\u0c03\u0c46-\u0c48\u0c4a-\u0c4d\u0c55\u0c56\u0c62-\u0c63\u0c66-\u0c6f\u0c82\u0c83\u0cbc\u0cbe-\u0cc4\u0cc6-\u0cc8\u0cca-\u0ccd\u0cd5\u0cd6\u0ce2-\u0ce3\u0ce6-\u0cef\u0d02\u0d03\u0d46-\u0d48\u0d57\u0d62-\u0d63\u0d66-\u0d6f\u0d82\u0d83\u0dca\u0dcf-\u0dd4\u0dd6\u0dd8-\u0ddf\u0df2\u0df3\u0e34-\u0e3a\u0e40-\u0e45\u0e50-\u0e59\u0eb4-\u0eb9\u0ec8-\u0ecd\u0ed0-\u0ed9\u0f18\u0f19\u0f20-\u0f29\u0f35\u0f37\u0f39\u0f41-\u0f47\u0f71-\u0f84\u0f86-\u0f87\u0f8d-\u0f97\u0f99-\u0fbc\u0fc6\u1000-\u1029\u1040-\u1049\u1067-\u106d\u1071-\u1074\u1082-\u108d\u108f-\u109d\u135d-\u135f\u170e-\u1710\u1720-\u1730\u1740-\u1750\u1772\u1773\u1780-\u17b2\u17dd\u17e0-\u17e9\u180b-\u180d\u1810-\u1819\u1920-\u192b\u1930-\u193b\u1951-\u196d\u19b0-\u19c0\u19c8-\u19c9\u19d0-\u19d9\u1a00-\u1a15\u1a20-\u1a53\u1a60-\u1a7c\u1a7f-\u1a89\u1a90-\u1a99\u1b46-\u1b4b\u1b50-\u1b59\u1b6b-\u1b73\u1bb0-\u1bb9\u1be6-\u1bf3\u1c00-\u1c22\u1c40-\u1c49\u1c5b-\u1c7d\u1cd0-\u1cd2\u1d00-\u1dbe\u1e01-\u1f15\u200c\u200d\u203f\u2040\u2054\u20d0-\u20dc\u20e1\u20e5-\u20f0\u2d81-\u2d96\u2de0-\u2dff\u3021-\u3028\u3099\u309a\ua640-\ua66d\ua674-\ua67d\ua69f\ua6f0-\ua6f1\ua7f8-\ua800\ua806\ua80b\ua823-\ua827\ua880-\ua881\ua8b4-\ua8c4\ua8d0-\ua8d9\ua8f3-\ua8f7\ua900-\ua909\ua926-\ua92d\ua930-\ua945\ua980-\ua983\ua9b3-\ua9c0\uaa00-\uaa27\uaa40-\uaa41\uaa4c-\uaa4d\uaa50-\uaa59\uaa7b\uaae0-\uaae9\uaaf2-\uaaf3\uabc0-\uabe1\uabec\uabed\uabf0-\uabf9\ufb20-\ufb28\ufe00-\ufe0f\ufe20-\ufe26\ufe33\ufe34\ufe4d-\ufe4f\uff10-\uff19\uff3f",$n=RegExp("["+Wn+"]"),Xn=RegExp("["+Wn+Gn+"]"),Jn=/[\n\r\u2028\u2029]/,Yn=/\r\n|[\n\r\u2028\u2029]/g,Kn=t.isIdentifierStart=function(t){return 65>t?36===t:91>t?!0:97>t?95===t:123>t?!0:t>=170&&$n.test(String.fromCharCode(t))},Qn=t.isIdentifierChar=function(t){return 48>t?36===t:58>t?!0:65>t?!1:91>t?!0:97>t?95===t:123>t?!0:t>=170&&Xn.test(String.fromCharCode(t))},ti={kind:"loop"},ei={kind:"switch"}});var d={"+":"__add","-":"__subtract","*":"__multiply","/":"__divide","%":"__modulo","==":"equals","!=":"equals"},f={"-":"__negate","+":null},_=e.each(["add","subtract","multiply","divide","modulo","negate"],function(t){this["__"+t]="#"+t},{});return h.inject(_),c.inject(_),D.inject(_),"complete"===document.readyState?setTimeout(a):q.add(window,{load:a}),{compile:i,execute:s,load:a,lineNumberBase:0}}.call(this),paper=new(r.inject(e.exports,{enumerable:!0,Base:e,Numerical:o,DomElement:V,DomEvent:q,Http:K,Key:G})),"function"==typeof define&&define.amd&&define("paper",paper),paper};
// Mobile detect
!function(a){var b=/iPhone/i,c=/iPod/i,d=/iPad/i,e=/(?=.*\bAndroid\b)(?=.*\bMobile\b)/i,f=/Android/i,g=/IEMobile/i,h=/(?=.*\bWindows\b)(?=.*\bARM\b)/i,i=/BlackBerry/i,j=/Opera Mini/i,k=/(?=.*\bFirefox\b)(?=.*\bMobile\b)/i,l=new RegExp("(?:Nexus 7|BNTV250|Kindle Fire|Silk|GT-P1000)","i"),m=function(a,b){return a.test(b)},n=function(a){var n=a||navigator.userAgent;this.apple={phone:m(b,n),ipod:m(c,n),tablet:m(d,n),device:m(b,n)||m(c,n)||m(d,n)},this.android={phone:m(e,n),tablet:!m(e,n)&&m(f,n),device:m(e,n)||m(f,n)},this.windows={phone:m(g,n),tablet:m(h,n),device:m(g,n)||m(h,n)},this.other={blackberry:m(i,n),opera:m(j,n),firefox:m(k,n),device:m(i,n)||m(j,n)||m(k,n)},this.seven_inch=m(l,n),this.any=this.apple.device||this.android.device||this.windows.device||this.other.device||this.seven_inch,this.phone=this.apple.phone||this.android.phone||this.windows.phone,this.tablet=this.apple.tablet||this.android.tablet||this.windows.tablet},o=new n;o.Class=n,"undefined"!=typeof module&&module.exports?module.exports=o:"function"==typeof define&&define.amd&&define(o),a.isMobile=o}(this);

/** ScrollTo
 * Copyright (c) 2007-2014 Ariel Flesler - aflesler<a>gmail<d>com | http://flesler.blogspot.com
 * Licensed under MIT
 * @author Ariel Flesler
 * @version 1.4.11
 */
;(function(a){if(typeof define==='function'&&define.amd){define(['jquery'],a)}else{a(jQuery)}}(function($){var j=$.scrollTo=function(a,b,c){return $(window).scrollTo(a,b,c)};j.defaults={axis:'xy',duration:parseFloat($.fn.jquery)>=1.3?0:1,limit:true};j.window=function(a){return $(window)._scrollable()};$.fn._scrollable=function(){return this.map(function(){var a=this,isWin=!a.nodeName||$.inArray(a.nodeName.toLowerCase(),['iframe','#document','html','body'])!=-1;if(!isWin)return a;var b=(a.contentWindow||a).document||a.ownerDocument||a;return/webkit/i.test(navigator.userAgent)||b.compatMode=='BackCompat'?b.body:b.documentElement})};$.fn.scrollTo=function(f,g,h){if(typeof g=='object'){h=g;g=0}if(typeof h=='function')h={onAfter:h};if(f=='max')f=9e9;h=$.extend({},j.defaults,h);g=g||h.duration;h.queue=h.queue&&h.axis.length>1;if(h.queue)g/=2;h.offset=both(h.offset);h.over=both(h.over);return this._scrollable().each(function(){if(f==null)return;var d=this,$elem=$(d),targ=f,toff,attr={},win=$elem.is('html,body');switch(typeof targ){case'number':case'string':if(/^([+-]=?)?\d+(\.\d+)?(px|%)?$/.test(targ)){targ=both(targ);break}targ=$(targ,this);if(!targ.length)return;case'object':if(targ.is||targ.style)toff=(targ=$(targ)).offset()}var e=$.isFunction(h.offset)&&h.offset(d,targ)||h.offset;$.each(h.axis.split(''),function(i,a){var b=a=='x'?'Left':'Top',pos=b.toLowerCase(),key='scroll'+b,old=d[key],max=j.max(d,a);if(toff){attr[key]=toff[pos]+(win?0:old-$elem.offset()[pos]);if(h.margin){attr[key]-=parseInt(targ.css('margin'+b))||0;attr[key]-=parseInt(targ.css('border'+b+'Width'))||0}attr[key]+=e[pos]||0;if(h.over[pos])attr[key]+=targ[a=='x'?'width':'height']()*h.over[pos]}else{var c=targ[pos];attr[key]=c.slice&&c.slice(-1)=='%'?parseFloat(c)/100*max:c}if(h.limit&&/^\d+$/.test(attr[key]))attr[key]=attr[key]<=0?0:Math.min(attr[key],max);if(!i&&h.queue){if(old!=attr[key])animate(h.onAfterFirst);delete attr[key]}});animate(h.onAfter);function animate(a){$elem.animate(attr,g,h.easing,a&&function(){a.call(this,targ,h)})}}).end()};j.max=function(a,b){var c=b=='x'?'Width':'Height',scroll='scroll'+c;if(!$(a).is('html,body'))return a[scroll]-$(a)[c.toLowerCase()]();var d='client'+c,html=a.ownerDocument.documentElement,body=a.ownerDocument.body;return Math.max(html[scroll],body[scroll])-Math.min(html[d],body[d])};function both(a){return $.isFunction(a)||typeof a=='object'?a:{top:a,left:a}};return j}));

/***********************
	BACKBONE INIT
***********************/

var	lily = {
	Views: {},
	Extensions: {},
	Models: {},
	Router: null,
	Events: {},
	
	init: function () {
		
		_.extend(lily.Events = Backbone.Events);
		this.app = new lily.Views.App();
		Backbone.history.start();
		
	}
};

var snapper = new Snap({
	element: document.getElementById('lily-wrapper-page'),
	disable: 'right',
	slideIntent: 30,
	minDragDistance: 50,
	touchToDrag: false
});

/***********************
	MENU (Snap.js)
***********************/

$(function() {	
	
	$('.lily-bt-menu').each(function(){
		
		$(this).on('click', function(){
			
			if( snapper.state().state=="left" ){
				snapper.close();
			} else {
				snapper.open('left');
			}
			
		});
		
	});
	
	$('.lily-menu-body li a').click(function() {

		snapper.close();
				
	});
	
});

/***********************/

/* Prevent Safari opening links when viewing as a Mobile App */
(function (a, b, c) {
	if(c in b && b[c]) {
		var d, e = a.location,
			f = /^(a|html)$/i;
		a.addEventListener("click", function (a) {
			d = a.target;
			while(!f.test(d.nodeName)) d = d.parentNode;
			"href" in d && (d.href.indexOf("http") || ~d.href.indexOf(e.host)) && (a.preventDefault(), e.href = d.href)
		}, !1)
	}
})(document, window.navigator, "standalone");


// Event listener for mobile
if (isMobile.phone) {
	$('#icon-iframe-close').click(function(){ open("/", '_self').close(); });
	$('#icon-iframe-fullscreen').css('display', 'none');
}

$(function() {
	lily.init();	
});
var lily = lily || {};

// The Page
// ---------------
// Page transitions Canvas

var isAnimating = false,
	endCurrPage = false,
	endNextPage = false,
	inClass = '',
	outClass = '',
	animEndEventNames = {
		'WebkitAnimation' : 'webkitAnimationEnd',
		'OAnimation' : 'oAnimationEnd',
		'msAnimation' : 'MSAnimationEnd',
		'animation' : 'animationend'
	},
	// animation end event name
	animEndEventName = animEndEventNames[ Modernizr.prefixed( 'animation' ) ],
	// support css animations
	support = Modernizr.cssanimations;



lily.Extensions.View = Backbone.View.extend({
	
	nextTransition: {
		type: '',
		reverse: '' 
	},
	
	initialize: function () {
		this.router = new lily.Router();
	},
	
	setNextTransition: function (el) { 
		
		var view = this;
		
		view.nextTransition.type=$(el).attr("data-transition");
		view.nextTransition.reverse=$(el).attr("data-reverse");
	},
	
	render: function (options) {
		
		options = options || {};
		
		if (options.page === true) {
			this.$el.find('.lily-page-cont').addClass('lily-page');
		}
		
		var view = this
		
		view.$el.find("a").on("touch click",function(e) { /* On regarde data-transition et data-reverse sur le lien cliqué*/
			view.setNextTransition(this);
		});
		
		return this;
		
	},
	
	transitionIn: function (previous, transition, reverse, callback) {
		
		var view = this,
			delay;
		var $nextPage = view.$el.find('.lily-page-cont');
		var $currPage = (previous) ? previous.$el.find('.lily-page-cont') : null;
		var inClass = (reverse !== 'true') ? 'lily-page-moveFromRight': 'lily-page-moveFromLeft';
		var visible = ' lily-page-visible';
//		var animateIn = function () {
			$nextPage.addClass( inClass + visible ).on( animEndEventName, function() {
				$nextPage.off( animEndEventName );
				endNextPage = true
				FastClick.attach(document.body);
				if (_.isFunction(callback)) {
					callback();
				}
				if ($currPage){
					$currPage.parent().remove();
				}
				$nextPage.removeClass( inClass )
			});
//		});
		
//		_.delay(animateIn, 10);
		
	},
	
	transitionOut: function (transition, reverse, callback) {
		
		var view = this;
		var $currPage = view.$el.find('.lily-page-cont');
		var outClass = (reverse !== 'true') ? 'lily-page-moveToLeft': 'lily-page-moveToRight';
		
		$currPage.addClass( outClass ).on( animEndEventName, function() {
			if (_.isFunction(callback)) {
				callback();
			}
			view.$el.find('.lily-page-cont').removeClass( 'lily-page-visible' );
			view.remove();
			$currPage.off( animEndEventName );
		});
	}
	
});

lily.Views.App = lily.Extensions.View.extend({
	
	goTo: function (view, transition, reverse) { /* Déclenche les transitions entre pages */
		
		previous = this.currentPage || null;
		var next = view;
		
		if (previous) {
			var reverse= previous.nextTransition.reverse;
			var transition= previous.nextTransition.transition;
			
			//Get last transition information if exists
			if(previous.nextTransition.type!=undefined) {
				if(previous.nextTransition.reverse!=undefined) {
					reverse=true;
				}
				transition= previous.nextTransition.type;
			}
			
			previous.transitionOut(transition, reverse)
		}
		next.render({ page: true });
		next.transitionIn(previous, transition, reverse, button_callback);
		this.currentPage = next;
	}
	
});


button_callback = function() {
	$('.lily-bt-menu').on('click', function(){
		if( snapper.state().state=="left" ){
			snapper.close();
		} else {
			snapper.open('left');
		}
	});
}

// Session id
var sid = document.cookie.match('PHPSESSID=([^;]*)')[1];
lily.Models.Faq = Backbone.Model.extend({
	
	// Default attributes ensure that each todo created has `title` and `completed` keys.
	defaults: {
		
	}	
});
lily.Models.Content = Backbone.Model.extend({
	
	// Default attributes ensure that each todo created has `title` and `completed` keys.
	defaults: {
		
	}	
});
lily.Messages = Backbone.Collection.extend({
	
    initialize: function () {

    },
    
    defaults: {
		id: ''
	}

});
//var lily = lily || {};

// Model
// ----------

lily.Models.MessageUserSimple = Backbone.Model.extend({
	
	defaults: {
		message_content: ''
	}
	
});
lily.Models.TopQuestions = Backbone.Model.extend({
	
	// Default attributes ensure that each todo created has `title` and `completed` keys.
	defaults: {
		
	}	
});
//var lily = lily || {};

// Message Model
// ----------
// 

lily.Models.MessageLilySimple = Backbone.Model.extend({
	
	defaults: {
		message_content: ''
	}
	
});
//var lily = lily || {};

// Message Model
// ----------
// 

lily.Models.MessageLilyPrecision = Backbone.Model.extend({
	
	// Default attributes ensure that each todo created has `title` and `completed` keys.
	defaults: {
		questions : [
			{id: '',
			 titre: ''}
		],
		idparent: ''
	}	
});

//var lily = lily || {};

// Message Model
// ----------
// 

lily.Models.MessageLilyRedirection = Backbone.Model.extend({
	
	defaults: {
		id: 0,
		mail: '',
		objet: '',
		telephone: '',
		titre: ''
	}
	
});


//var lily = lily || {};

// Message Model
// ----------
// 

lily.Models.MessageLilyNotation = Backbone.Model.extend({
	
	defaults: {
		id: ''
	}
	
});
//var lily = lily || {};

// Message Model
// ----------
// 

lily.Models.MessageLilyCompletion = Backbone.Model.extend({
	
	// Default attributes ensure that each todo created has `title` and `completed` keys.
	defaults: {
		id: ''
	}
	
});

lily.Models.Mail = Backbone.Model.extend({
	
	// Default attributes ensure that each todo created has `title` and `completed` keys.
	defaults: {
		
	}	
});
//var lily = lily || {};

// Todo Item View
// --------------

// The DOM element for a todo item...
lily.Views.MessageView = Backbone.View.extend({
	
	initialize: function() {
		// bind model's changes to the render() method to mantain interface up to date.
		this.model.on( 'change', this.render, this );
	},
	
	render: function() {
		this.$el.html(this.template( this.model.toJSON() ));
		this.$el.appendTo( '#lily-box-messages' );
		this.transitionInMessage();
		this.trigger('render');
		return this;
	},
	
	transitionInMessage: function (callback) {
		
		var $message = this.$el;
		var inClass = 'lily-message-show';
		
		$message.addClass( inClass ).on( animEndEventName, function() {

			$message.off( animEndEventName );
			
			$('#lily-box-messages').animate({
				scrollTop: $('#lily-box-messages').get(0).scrollHeight
			}, 500);
			
		} );
		
	}
	
});
//var lily = lily || {};

// Todo Item View
// --------------

// The DOM element for a todo item...
lily.Views.MessageChatView = Backbone.View.extend({
	
	initialize: function() {
		// bind model's changes to the render() method to mantain interface up to date.
		this.model.on( 'change', this.render, this );
	},
	
	render: function() {
		this.$el.html(this.template( this.model.toJSON() ));
		this.$el.appendTo( '#chat-box-messages' );
		$( '#chat-box-messages:last-child' ).scrollTop(10000);
		this.trigger('render');
		return this;
	},
	
});
//var lily = lily || {};

// View
// --------------

lily.Views.MessageChatVisitor = lily.Views.MessageChatView.extend({
	
	className: 'lily-msg-chat-visitor lily-cst-msg-chat-visitor',
	
	model: lily.Models.MessageLilySimple,
	
	template: _.template( $('#chat-message-visitor').html() )
	
});


//var lily = lily || {};

// View
// --------------

lily.Views.MessageChatOperator = lily.Views.MessageChatView.extend({
	
	className: 'lily-msg-chat-operator lily-cst-msg-chat-operator',
	
	model: lily.Models.MessageLilySimple,
	
	template: _.template( $('#chat-message-operator').html() )
	
});


//var lily = lily || {};

// View
// --------------

lily.Views.MessageLilySimple = lily.Views.MessageView.extend({
	
	className: 'lily-msg-avatar lily-cst-msg-avatar',
	
	model: lily.Models.MessageLilySimple,
	
	template: _.template( $('#lily-message-simple').html() )
	
});


//var lily = lily || {};

// Todo Item View
// --------------

// The DOM element for a todo item...
lily.Views.MessageUserSimple = lily.Views.MessageView.extend({
	
	className: 'lily-msg-user lily-cst-msg-user',
	
	model: lily.Models.MessageUser,
	
	template: _.template( $('#lily-message-user').html() )
});


//var lily = lily || {};


// View
// --------------

lily.Views.MessageLilyPrecision = lily.Views.MessageView.extend({
	
	className: 'lily-msg-precision lily-cst-msg-precision',
	
	model: lily.Models.MessageLilyPrecision,
	
	template: _.template( $('#lily-message-precision').html()),
	
	initialize: function () {
		this.listenTo( this, 'render', this.triggerPrecision );
	},
	
	triggerPrecision: function () {
		var message = this;
		this.$('.lily-precision-list').on( 'click', function() { 
			var list_index = message.$( "li.lily-precision-list" ).index( $(this) );/* on récupère l'index de la question dans la liste (non, c'est pas très propre...) */
			var id = message.model.get('actions')[list_index].id;
			var idparent = message.model.get('idparent');
			lily.Events.trigger('precision', id, idparent, message);
			$(this).off( 'click' );
		})
	}
	
});



lily.Views.MessageLilyRedirection = lily.Views.MessageView.extend({
	
	className: 'lily-msg-redirection lily-cst-msg-redirection',
	
	template: _.template( $('#lily-message-redirection').html()),
	
	initialize: function () {
		this.listenTo( this, 'render', this.triggerRedirectionTel );
		this.listenTo( this, 'render', this.triggerRedirectionMail );
	},
	
	redirectionMail: function() {
		
		$.ajax({
			
			type: 'POST',
			url: 'http://saio.fr/web/app_dev.php/api/'+key+'/redirection/'+this.model.get('data').id+'/mail',
			data: 'mail',
			success:  function( data ) {console.log('Log sent')}
			
		});
		
	},
	
	triggerRedirectionTel: function () {
		var view = this;
		this.$('.lily-redirection-tel').on( 'click', function() {
			var id = view.model.get('data').id;
			lily.Events.trigger('redirectionTel', id, 'true', '', view);
			$(this).off('click');
		});
	},
	
	triggerRedirectionMail: function () {
		var view = this;
		this.$('.lily-redirection-mail').on( 'click', function() {
			var id = view.model.get('data').id;
			lily.Events.trigger('redirectionMail', id, 'true', '', view);
			$(this).off('click');
		});
	}
	
});
lily.Views.MessageLilyNotation = Backbone.View.extend({
	
	className: 'lily-msg-reporting lily-cst-msg-reporting',
	
	model: lily.Models.MessageLilyNotation,
	
	template: _.template( $('#lily-message-notation').html()),
	events: {
		'click .lily-icon-thumb-up': 'satisfied',
		'click .lily-icon-thumb-down': 'notSatisfied'
	},
	
	initialize: function () {
		this.render();
	},
	
	render: function() {
		this.$el.html(this.template( this.model.toJSON() ));
		this.$el.appendTo( '#lily-box-messages .lily-msg-avatar:last' );
		$( '#lily-box-messages .lily-msg-avatar:last' ).addClass('lily-notation-wrapper');
		return this;
	},
	
	satisfied: function () {

		lily.Events.trigger('satisfied', this.model.get('id'), true, '', this);
		
	},
	
	notSatisfied: function () {
	
		lily.Events.trigger('notSatisfied', this.model.get('id'), false, '', this);
		
	}
	
});
lily.Views.MessageLilyCompletion = lily.Views.MessageView.extend({
	
	className: 'lily-msg-reporting lily-cst-msg-reporting',
	
	model: lily.Models.MessageLilyCompletion,
	
	template: _.template( $('#lily-message-completion').html()),
	
	initialize: function () {
		this.listenTo( this, 'render', this.triggerCompletion );
	},
	
	triggerCompletion: function () {
		var view = this;
		this.$('.lily-precision-list').on( 'click', function() {
			var id = view.model.get('id');
			if ( $(this).hasClass('lily-completion-incomplete') ) {
				
				lily.Events.trigger('satisfied', id, 'false', 'incomplete', view);
				
			}
			if ( $(this).hasClass('lily-completion-incorrect') ) {
				
				lily.Events.trigger('satisfied', id, 'false', 'incorrect', view);
				
			}
			else return false;
			$(this).off('click');
		});
	}
	
});
//var lily = lily || {};

/***********************
PAGE THEMATIQUE VIEW
***********************/

lily.Views.Faq = lily.Extensions.View.extend({
	
	//		el: '#lily-wrapper-page',
	model: lily.Models.Faq,
	template: _.template( $('#lily-page-faq-template').html() ),
	
	initialize: function() {
		$(this.render().el).appendTo('#lily-wrapper-page');

	},
	
	render: function () {
		this.$el.html(this.template( this.model.toJSON() ));
		return lily.Extensions.View.prototype.render.apply(this, arguments);
	}
});
//var lily = lily || {};

/***********************
PAGE TOP DES QUESTIONS VIEW
***********************/

lily.Views.TopQuestions = lily.Extensions.View.extend({
	
	//		el: '#lily-wrapper-page',
	model: lily.Models.TopQuestions,
	template: _.template( $('#lily-page-top-questions-template').html() ),
	
	initialize: function() {
		$(this.render().el).appendTo('#lily-wrapper-page');
	},
	
	render: function () {
		this.$el.html(this.template( this.model.toJSON() ));
		return lily.Extensions.View.prototype.render.apply(this, arguments);
	}
});
//var lily = lily || {};

/***********************
PAGE THEMATIQUE VIEW
***********************/

lily.Views.Content = lily.Extensions.View.extend({
	
	//		el: '#lily-wrapper-page',
	model: lily.Models.Content,
	template: _.template( $('#lily-page-content-template').html() ),
	
	initialize: function() {
		$(this.render().el).appendTo('#lily-wrapper-page');


	},
	
	render: function () {
		this.$el.html(this.template( this.model.toJSON() ));
		return lily.Extensions.View.prototype.render.apply(this, arguments);

	}
});
/***********************
PAGE AVI VIEW
***********************/

lily.Views.Avi = lily.Extensions.View.extend({
	
	mood: '',
	messageModel: '',
	messageType: '',
	
	events: {
		'submit #lily-search-form': 'doSearch',
		'click #lily-go': 'doSearch'
	},	
	
	initialize: function() {
		
		this.$input = this.$('#lily-search-form input.lily-search-input');
		
		this.listenTo(this, 'render', this.avatar);
		
		lily.Events.on('precision', this.sendPrecision, this); 		
		lily.Events.on('satisfied', this.sendNotation, this); 		
		lily.Events.on('notSatisfied', this.sendNotation, this); 
		lily.Events.on('redirectionTel', this.sendRedirectionTel, this); 
		lily.Events.on('redirectionMail', this.sendRedirectionMail, this); 
				
		$(this.render().el).appendTo('#lily-wrapper-page');
		
	},
	
	render: function () {
		
		var template= _.template( $('#lily-page-avi-template').html());
		this.$el.html(template());
		this.trigger('render');
		$('input, textarea').placeholder();
		
		return lily.Extensions.View.prototype.render.apply(this, arguments);
	},
	
	doSearch: function (e) {
		
		e.preventDefault();
		
		this.$input = this.$el.find('#lily-search-form input.lily-search-input');
		var query = this.$input.val();
		
		if ( $.trim(query).length > 0 ){/*On vérifie que le champ n'est pas vide ou contient uniquement des espaces*/
			
			this.search( query );
			var messageModel = new lily.Models.MessageUserSimple ({message_content: this.$input.val()});
			this.addItem ( messageModel, 'user-simple');
			this.showLoading();
			
		}
		// clear the search field
		this.clearInput();
	},
	
	search: function ( q ) {
		
		var avi = this;		
		
		ws.sess.call('chat/newAviQuestion', {question: q});
		
		$.ajax({
			type: 'POST',
			url: root+'/query',
			data: { query: q },
			// dataType: 'jsonp',
			success:  function( data, textStatus, request ) {
				// If there is no results we need to trigger a custom event to inform other objects.
				// This way other objects (views) can acts according to this event (display some kind of messages)
				
				var type = request.getResponseHeader('type');
				
				avi.clearLoading();
				
				if ( !data ) {
					this.trigger( 'emptySearch' );
				}
				if ( type === 'insult' ) {
				
					var messageModel = new lily.Models.MessageLilySimple ({message_content: data});
					var messageType = 'lily-simple';
					avi.mood = 'angry';
					avi.addItem( messageModel, messageType );
					
				}
				if ( type === 'answer' ) {
				
					var messageModel = new lily.Models.MessageLilySimple ({message_content: data.answer});
					var messageType = 'lily-simple';
					avi.addItem( messageModel, messageType );
					var messageModel = new lily.Models.MessageLilyNotation ({ id: data.id });
					var messageType = 'lily-notation';
					avi.mood = data.mood;
					avi.addItem( messageModel, messageType );
					
				}
				if ( type === 'personal' ) {
				
					var messageModel = new lily.Models.MessageLilySimple ({message_content: data.answer});
					var messageType = 'lily-simple';
					avi.mood = data.mood;
					avi.addItem( messageModel, messageType );
					
				}
				if ( type === 'misunderstood' ) {
				
					var messageModel = new lily.Models.MessageLilySimple ({message_content: "Désolé, je n\'ai pas compris votre question."});
					var messageType = 'lily-simple';
					avi.addItem( messageModel, messageType );
					if (data.isMail || data.isTel || data.isChat) {
					
						var messageModel = new lily.Models.MessageLilyRedirection ({data: data});
						var messageType = 'lily-redirection';
						avi.mood = 'sceptical';
						avi.addItem( messageModel, messageType );
						
					}
				}
				if (( type === 'precision' )) {
				
					var messageModel = new lily.Models.MessageLilyPrecision ({actions: data.actions, precision: data.parent.answer, idparent: data.parent.id});
					var messageType = 'lily-precision';
					avi.mood = data.mood;
					avi.addItem( messageModel, messageType );
					
				}
				
			}
			
		});
		
	},
	
	sendPrecision: function( id, idparent, parent) {
		
		var avi = this;
		
		$.ajax({
			url: root+'/precision/'+id,
			data: id,
			//			dataType: 'jsonp',
			success:  function( data, textStatus, request ) {
				// If there is no results we need to trigger a custom event to inform other objects.
				// This way other objects (views) can acts according to this event (display some kind of messages)
				console.log(data);
				
				var type = request.getResponseHeader('type');
				console.log (type);
				
				avi.clearLoading();
				
				if ( !data ) {
					this.trigger( 'emptySearch' );
					avi.clearLoading();
				}
				if ( type === 'answer' ) {
					var messageModel = new lily.Models.MessageLilySimple ({message_content: data.answer});
					var messageType = 'lily-simple';
					avi.addItem( messageModel, messageType );
					var messageModel = new lily.Models.MessageLilyNotation ({ id: idparent });
					var messageType = 'lily-notation';
					avi.addItem( messageModel, messageType );
				}
				
				// Delete the parent bubble
				//parent.remove();
			}
		});
	},
	
	sendRedirectionMail: function(id) {
		
		var id = id;
		$.ajax({
			
			type: 'POST',
			url: root+'/logredirection/'+id,
			data: JSON.stringify({ canal: 'mail' }),
			success:  function( data ) {console.log('Log sent')}
			
		});
	},
	
	sendRedirectionTel: function(id) {
		
		var id = id;
		$.ajax({
			
			type: 'POST',
			url: root+'/logredirection/'+id,
			data: JSON.stringify({ canal: 'tel' }),
			success:  function( data ) {console.log('Log sent')}
			
		});
	},
	
	sendNotation: function( id, satisfied, reason, view ) {
		var avi = this;
		var id = id;

		$.ajax({
			
			type: 'POST',
			url: root+'/notation/'+id,
			data: JSON.stringify({ satisfied: satisfied, reason: reason }),
			// dataType: 'jsonp',
			success:  function( data, textStatus, request ) {
				
				if ( satisfied == true ){
					var messageModel = new lily.Models.MessageLilySimple ({message_content: "Merci pour votre réponse! N\'hesitez pas à me poser d'autres questions"});
					var messageType = 'lily-simple';
				}
				else {
					var messageModel = new lily.Models.MessageLilyRedirection ({data: data});
					var messageType = 'lily-redirection';
					
				}
				avi.addItem( messageModel, messageType );
				view.remove();
				
			}
			
		});
	},
	
	addItem: function( messageModel, messageType) {
		
		// remove waiting message if exists.
		
		// create an instance of the sub-view to render the single message item.
		switch ( messageType ) {
			case 'user-simple':
				var message = new lily.Views.MessageUserSimple({
					model: messageModel
				}).render();
				break;
			case 'lily-simple':	
				var message = new lily.Views.MessageLilySimple({
					model: messageModel
				}).render();
				break;
			case 'lily-redirection':
				var message = new lily.Views.MessageLilyRedirection({
					model: messageModel
				}).render();
				break;
			case 'lily-precision':	
				var message = new lily.Views.MessageLilyPrecision({
					model: messageModel
				}).render();
				break;
			case 'lily-notation':
				var message = new lily.Views.MessageLilyNotation({
					model: messageModel
				}).render();
				break;
			case 'lily-completion':	
				var message = new lily.Views.MessageLilyCompletion({
					model: messageModel
				}).render();
				break;
		}
	},
	
	
	showLoading: function() {
		
		this.$('#lily-box-messages').append(
			'<div class="lily-msg-avatar lily-cst-msg-avatar lily-message-show"><p class="lily-loading"><span></span><span></span><span></span></p><i class="lily-avatar-bubble"></i></div>');
		
	},
	
	clearInput: function() {
		
		if (isMobile.phone){
			this.$input.val('').blur();
		}
		else this.$input.val('');
		
	},
	
	clearLoading: function() {
		
		if ( this.$('.lily-loading').length ) {
			setTimeout(function(){
				this.$('.lily-loading').parent().fadeOut(function(){ $(this).remove(); });
			},500);
		}
		
	},
	
	emptySearch: function() {
		
		this.clearLoading();
		// Append and display the new message.
		var model = new lily.Models.MessageLilySimple({message_content: 'Il semblerait qu\'il y ait un problème. Je n\'ai pas trouvé de réponse à votre question'});
		this.message = new lily.Views.MessageLilySimple ({model: model}).render();
		
	},

    avatar: function() {
    	
    	
    	// On charge l'avatar du client
    	avi = this;
    	setTimeout(function() {
	    	$.getScript( root+'/avatar', function( data ) {});
    	}, 500);

    }
	
});
/***********************
PAGE CHAT VIEW
***********************/

lily.Views.Chat = lily.Extensions.View.extend({
	
	
	events: {
		'keyup #lily-search-form' : 'writing',
		'submit #lily-search-form': 'doChat',
		'click #lily-go': 'doChat'
	},	
	
	initialize: function() {
		
		chat = this;

		this.messages = new lily.Messages();
		this.listenTo(this.messages, 'add', this.addItem);
		
		ws.sess.subscribe('visitor/'+sid, function (topic, payload) {
			
			chat.messages.set(payload);
			
		});
		
		ws.sess.call('chat/open');
							
		$(this.render().el).appendTo('#lily-wrapper-page');

		
	},
	
	render: function () {
		
		var template= _.template( $('#lily-page-chat-template').html());
		this.$el.html(template());
		this.trigger('render');
		$('input, textarea').placeholder();
		this.$input = this.$el.find('#lily-search-form input.lily-search-input');
		
		return lily.Extensions.View.prototype.render.apply(this, arguments);
	},
	
	writing: function (e) {

		if( this.$input.val() ) {ws.sess.call('chat/writing', { sid: sid, writing: true } )}
		else {ws.sess.call('chat/writing', { sid: sid, writing: false } )}
		
	},
	
	doChat: function (e) {

		e.preventDefault();
		
		var message = this.$input.val();
		
		if ( $.trim(message).length > 0 ){/*On vérifie que le champ n'est pas vide ou contient uniquement des espaces*/
			
			this.send( message );
			
		}
		// clear the search field
		this.clearInput();
	},
	
	send: function ( m ) {		

		ws.sess.publish('operator', m);
		
	},
	
	addItem: function( message  ) {

		// create an instance of the sub-view to render the single message item.
		switch ( message.get('from') ) {
			case 'visitor':
				var messageView = new lily.Views.MessageChatVisitor({
					model: message,
				}).render();
				break;
			case 'operator':	
				var messageView = new lily.Views.MessageChatOperator({
					model: message
				}).render();
				break;
		}
	},
	
	clearInput: function() {
		
		if (isMobile.phone){
			this.$input.val('').blur();
		}
		else {this.$input.val('').focus().select();}
		
	},
	
    avatar: function() {
    	
    	// On charge l'avatar de l'opérateur
		/*
    	home = this;
		$.getScript( root+licence+'/avatar', function( data ) {});
		*/
		
		return this;
		
    }
	
});
//var lily = lily || {};

/***********************
PAGE MAIL VIEW
***********************/

lily.Views.Mail = lily.Extensions.View.extend({
	
	events: {
	
        'click a': 'send',

    },
    
	//		el: '#lily-wrapper-page',
	model: lily.Models.Mail,
	template: _.template( $('#lily-page-mail-template').html() ),
	
	initialize: function() {
		$(this.render().el).appendTo('#lily-wrapper-page');
	},
	
	render: function () {
		this.$el.html(this.template( ));
		return lily.Extensions.View.prototype.render.apply(this, arguments);
	},
	
	send: function () {
		
		this.from = this.$el.find('#from').val();
		this.object = this.$el.find('#object').val();
		this.msg = this.$el.find('#msg').val();
		
		var that = this;
		
		$.ajax({
		
			type: 'POST',
			url: root+'/send/mail',
			data: { mail: that.from, object: that.object, msg: that.msg },
			// dataType: 'jsonp',
			success:  function( data, textStatus, request ) {				
				
			}
			
		});
		
	}
	
});
// js/router/router.js

var lily = lily || {};

lily.Router = Backbone.Router.extend({
	
	url: '',
	
	routes: {
		'top-questions': 'topQuestions',
		'top-questions/': 'topQuestions',
		'top-questions/:id': 'topQuestions',
		'faq': 'faq',
		'faq/': 'faq',
		'faq/:id': 'faq',
		'faq/content/:id': 'content',
		'': 'home',
		'avi': 'avi',
		'chat': 'chat',
		'mail': 'mail',
		'mail/sent': 'mailSent'
	},
	
	home: function () {
		
		if (config.chat && config.home == 'chat' && isOperatorAvailable ) this.chat();
		else this.avi();
		
	},
	
	avi: function () {
	
		if (typeof(view) !== 'undefined') {view.remove();}
		var view = new lily.Views.Avi();
		lily.instance.goTo(view);
		this.welcome = new lily.Models.MessageLilySimple({message_content: config.aviWelcomeMsg});
		this.message = new lily.Views.MessageLilySimple ({model: this.welcome}).render();

	},
	
	mailSent: function () {
	
		if (typeof(view) !== 'undefined') {view.remove();}
		var view = new lily.Views.Avi();
		lily.instance.goTo(view);
		
		this.welcome = new lily.Models.MessageLilySimple({message_content: 'Votre message a bien été envoyé. Que puis-je faire pour vous ?'});
		this.message = new lily.Views.MessageLilySimple ({model: this.welcome}).render();
		
	},
	
	chat: function () {
		if (typeof(view) !== 'undefined') {view.remove();}
		var view = new lily.Views.Chat();
		lily.instance.goTo(view);
	},

	mail: function () {
		if (typeof(view) !== 'undefined') {view.remove();}
		var view = new lily.Views.Mail();
		lily.instance.goTo(view);
	},
	
	faq: function ( id ) {
		
		if (typeof(view) !== 'undefined') {view.remove();}
		var avi = this;
		
		if (( id == '') || (id == undefined  ) || (id == '/' )) id = "NULL";
		
		$.ajax({
			
			url: root+'/faq/'+id,
			
			success:  function( data, textStatus, request ) {
				// If there is no results we need to trigger a custom event to inform other objects.
				// This way other objects (views) can acts according to this event (display some kind of messages)
	
				if ( !data ) {
					
				}
				if ( data !== '' ) {
		
					/*Quand on a un enfant de type content, on change son id à content/id, 
					pour que l'url soit traitée différement par le router (methode content() */
					
					_.each(data.faqs, function(faq) { 
						if (faq.type === 'content'){
							var id = faq.id;
							faq.id = 'content/'+id;
						}
					});
					
					var sortedData = _.sortBy( data.faqs, data.faqs.position );

					var model = new lily.Models.Faq({ data: {parent: data.parent, title: data.title, faqs: sortedData } });
					var view = new lily.Views.Faq({ model: model });
					lily.instance.goTo(view);
					
				}
			}
		});
	},
	
	content: function ( id ) {
		
		var id = id;
		
		if (typeof(view) !== 'undefined') {view.remove();}
		var avi = this;
		
		$.ajax({
			
			url: root+'/faq/'+id,
			
			success:  function( data, textStatus, request ) {
				// If there is no results we need to trigger a custom event to inform other objects.
				// This way other objects (views) can acts according to this event (display some kind of messages)			
				
				if ( !data ) {
					
				}
				if ( data !== '' ) {
					
					var idParent = data.parent;
					
			
					$.ajax({
						
						url: root+'/faq/'+idParent,
						
						success:  function( data, textStatus, request ) {
							// If there is no results we need to trigger a custom event to inform other objects.
							// This way other objects (views) can acts according to this event (display some kind of messages)
							
							if ( !data ) {
								
							}
							if ( data !== '' ) {
							
								// console.log (_.find(data.faqs, function(obj) { return obj.id == id }));
								/*We find in the array data.faqs, children of the object "data" the right "title" and the right "content"*/
								var content = _.find(data.faqs, function(obj) { return obj.id == id }).content;
								var title = _.find(data.faqs, function(obj) { return obj.id == id }).title;

					// var title = data.title;
				
		
								// var model = new lily.Models.content({parent: idParent, title: title, content: content }); // Attention à la majuscule au C de content de lily.Models.Content
								var model = new lily.Models.Content({parent: idParent, title: title, content: content });
								var view = new lily.Views.Content({ model: model });
								lily.instance.goTo(view);
								
							}
						}
					});
				}
			}
		});
	},
	
	topQuestions: function ( id ) {
		
		if (typeof(view) !== 'undefined') {view.remove();}
		var avi = this;
		
		if (( id == '') || (id == undefined  ) || (id == '/' )) { 
		
			$.ajax({
				
				url: root+'/top-questions/NULL',
				
				success:  function( data, textStatus, request ) {
					// If there is no results we need to trigger a custom event to inform other objects.				
					
					if ( !data ) {
						
					}
					if ( data !== '' ) {
						
						var model = new lily.Models.TopQuestions({ data: data });
						var view = new lily.Views.TopQuestions({ model: model });
						lily.instance.goTo(view);
						
					}
				}
			});

		} else {

			$.ajax({
				
				url: root+'/top-questions/'+id,
				
				success:  function( data, textStatus, request ) {
					// If there is no results we need to trigger a custom event to inform other objects.				
					
					if ( !data ) {
						
					}
					if ( data !== '' ) {
						
						var view = new lily.Views.Avi();
						lily.instance.goTo(view);
						var question = new lily.Models.MessageUserSimple ({message_content: data.title});
						var reponse = new lily.Models.MessageLilySimple ({message_content: data.answer});
						view.addItem ( question, 'user-simple');
						view.addItem ( reponse, 'lily-simple');
						
					}
				}
			});
		}
		
	},

	
});