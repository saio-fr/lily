/* Javascript plotting library for jQuery, version 0.8.1.

Copyright (c) 2007-2013 IOLA and Ole Laursen.
Licensed under the MIT license.

*/// first an inline dependency, jquery.colorhelpers.js, we inline it here
// for convenience
/* Plugin for jQuery for working with colors.
 *
 * Version 1.1.
 *
 * Inspiration from jQuery color animation plugin by John Resig.
 *
 * Released under the MIT license by Ole Laursen, October 2009.
 *
 * Examples:
 *
 *   $.color.parse("#fff").scale('rgb', 0.25).add('a', -0.5).toString()
 *   var c = $.color.extract($("#mydiv"), 'background-color');
 *   console.log(c.r, c.g, c.b, c.a);
 *   $.color.make(100, 50, 25, 0.4).toString() // returns "rgba(100,50,25,0.4)"
 *
 * Note that .scale() and .add() return the same modified object
 * instead of making a new one.
 *
 * V. 1.1: Fix error handling so e.g. parsing an empty string does
 * produce a color rather than just crashing.
 */(function(e){e.color={},e.color.make=function(t,n,r,i){var s={};return s.r=t||0,s.g=n||0,s.b=r||0,s.a=i!=null?i:1,s.add=function(e,t){for(var n=0;n<e.length;++n)s[e.charAt(n)]+=t;return s.normalize()},s.scale=function(e,t){for(var n=0;n<e.length;++n)s[e.charAt(n)]*=t;return s.normalize()},s.toString=function(){return s.a>=1?"rgb("+[s.r,s.g,s.b].join(",")+")":"rgba("+[s.r,s.g,s.b,s.a].join(",")+")"},s.normalize=function(){function e(e,t,n){return t<e?e:t>n?n:t}return s.r=e(0,parseInt(s.r),255),s.g=e(0,parseInt(s.g),255),s.b=e(0,parseInt(s.b),255),s.a=e(0,s.a,1),s},s.clone=function(){return e.color.make(s.r,s.b,s.g,s.a)},s.normalize()},e.color.extract=function(t,n){var r;do{r=t.css(n).toLowerCase();if(r!=""&&r!="transparent")break;t=t.parent()}while(!e.nodeName(t.get(0),"body"));return r=="rgba(0, 0, 0, 0)"&&(r="transparent"),e.color.parse(r)},e.color.parse=function(n){var r,i=e.color.make;if(r=/rgb\(\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*\)/.exec(n))return i(parseInt(r[1],10),parseInt(r[2],10),parseInt(r[3],10));if(r=/rgba\(\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*,\s*([0-9]+(?:\.[0-9]+)?)\s*\)/.exec(n))return i(parseInt(r[1],10),parseInt(r[2],10),parseInt(r[3],10),parseFloat(r[4]));if(r=/rgb\(\s*([0-9]+(?:\.[0-9]+)?)\%\s*,\s*([0-9]+(?:\.[0-9]+)?)\%\s*,\s*([0-9]+(?:\.[0-9]+)?)\%\s*\)/.exec(n))return i(parseFloat(r[1])*2.55,parseFloat(r[2])*2.55,parseFloat(r[3])*2.55);if(r=/rgba\(\s*([0-9]+(?:\.[0-9]+)?)\%\s*,\s*([0-9]+(?:\.[0-9]+)?)\%\s*,\s*([0-9]+(?:\.[0-9]+)?)\%\s*,\s*([0-9]+(?:\.[0-9]+)?)\s*\)/.exec(n))return i(parseFloat(r[1])*2.55,parseFloat(r[2])*2.55,parseFloat(r[3])*2.55,parseFloat(r[4]));if(r=/#([a-fA-F0-9]{2})([a-fA-F0-9]{2})([a-fA-F0-9]{2})/.exec(n))return i(parseInt(r[1],16),parseInt(r[2],16),parseInt(r[3],16));if(r=/#([a-fA-F0-9])([a-fA-F0-9])([a-fA-F0-9])/.exec(n))return i(parseInt(r[1]+r[1],16),parseInt(r[2]+r[2],16),parseInt(r[3]+r[3],16));var s=e.trim(n).toLowerCase();return s=="transparent"?i(255,255,255,0):(r=t[s]||[0,0,0],i(r[0],r[1],r[2]))};var t={aqua:[0,255,255],azure:[240,255,255],beige:[245,245,220],black:[0,0,0],blue:[0,0,255],brown:[165,42,42],cyan:[0,255,255],darkblue:[0,0,139],darkcyan:[0,139,139],darkgrey:[169,169,169],darkgreen:[0,100,0],darkkhaki:[189,183,107],darkmagenta:[139,0,139],darkolivegreen:[85,107,47],darkorange:[255,140,0],darkorchid:[153,50,204],darkred:[139,0,0],darksalmon:[233,150,122],darkviolet:[148,0,211],fuchsia:[255,0,255],gold:[255,215,0],green:[0,128,0],indigo:[75,0,130],khaki:[240,230,140],lightblue:[173,216,230],lightcyan:[224,255,255],lightgreen:[144,238,144],lightgrey:[211,211,211],lightpink:[255,182,193],lightyellow:[255,255,224],lime:[0,255,0],magenta:[255,0,255],maroon:[128,0,0],navy:[0,0,128],olive:[128,128,0],orange:[255,165,0],pink:[255,192,203],purple:[128,0,128],violet:[128,0,128],red:[255,0,0],silver:[192,192,192],white:[255,255,255],yellow:[255,255,0]}})(jQuery),function(e){function n(t,n){var r=n.children("."+t)[0];if(r==null){r=document.createElement("canvas"),r.className=t,e(r).css({direction:"ltr",position:"absolute",left:0,top:0}).appendTo(n);if(!r.getContext){if(!window.G_vmlCanvasManager)throw new Error("Canvas is not available. If you're using IE with a fall-back such as Excanvas, then there's either a mistake in your conditional include, or the page has no DOCTYPE and is rendering in Quirks Mode.");r=window.G_vmlCanvasManager.initElement(r)}}this.element=r;var i=this.context=r.getContext("2d"),s=window.devicePixelRatio||1,o=i.webkitBackingStorePixelRatio||i.mozBackingStorePixelRatio||i.msBackingStorePixelRatio||i.oBackingStorePixelRatio||i.backingStorePixelRatio||1;this.pixelRatio=s/o,this.resize(n.width(),n.height()),this.textContainer=null,this.text={},this._textCache={}}function r(t,r,s,o){function E(e,t){t=[w].concat(t);for(var n=0;n<e.length;++n)e[n].apply(this,t)}function S(){var t={Canvas:n};for(var r=0;r<o.length;++r){var i=o[r];i.init(w,t),i.options&&e.extend(!0,a,i.options)}}function x(n){e.extend(!0,a,n),n&&n.colors&&(a.colors=n.colors),a.xaxis.color==null&&(a.xaxis.color=e.color.parse(a.grid.color).scale("a",.22).toString()),a.yaxis.color==null&&(a.yaxis.color=e.color.parse(a.grid.color).scale("a",.22).toString()),a.xaxis.tickColor==null&&(a.xaxis.tickColor=a.grid.tickColor||a.xaxis.color),a.yaxis.tickColor==null&&(a.yaxis.tickColor=a.grid.tickColor||a.yaxis.color),a.grid.borderColor==null&&(a.grid.borderColor=a.grid.color),a.grid.tickColor==null&&(a.grid.tickColor=e.color.parse(a.grid.color).scale("a",.22).toString());var r,i,s,o={style:t.css("font-style"),size:Math.round(.8*(+t.css("font-size").replace("px","")||13)),variant:t.css("font-variant"),weight:t.css("font-weight"),family:t.css("font-family")};o.lineHeight=o.size*1.15,s=a.xaxes.length||1;for(r=0;r<s;++r)i=a.xaxes[r],i&&!i.tickColor&&(i.tickColor=i.color),i=e.extend(!0,{},a.xaxis,i),a.xaxes[r]=i,i.font&&(i.font=e.extend({},o,i.font),i.font.color||(i.font.color=i.color));s=a.yaxes.length||1;for(r=0;r<s;++r)i=a.yaxes[r],i&&!i.tickColor&&(i.tickColor=i.color),i=e.extend(!0,{},a.yaxis,i),a.yaxes[r]=i,i.font&&(i.font=e.extend({},o,i.font),i.font.color||(i.font.color=i.color));a.xaxis.noTicks&&a.xaxis.ticks==null&&(a.xaxis.ticks=a.xaxis.noTicks),a.yaxis.noTicks&&a.yaxis.ticks==null&&(a.yaxis.ticks=a.yaxis.noTicks),a.x2axis&&(a.xaxes[1]=e.extend(!0,{},a.xaxis,a.x2axis),a.xaxes[1].position="top"),a.y2axis&&(a.yaxes[1]=e.extend(!0,{},a.yaxis,a.y2axis),a.yaxes[1].position="right"),a.grid.coloredAreas&&(a.grid.markings=a.grid.coloredAreas),a.grid.coloredAreasColor&&(a.grid.markingsColor=a.grid.coloredAreasColor),a.lines&&e.extend(!0,a.series.lines,a.lines),a.points&&e.extend(!0,a.series.points,a.points),a.bars&&e.extend(!0,a.series.bars,a.bars),a.shadowSize!=null&&(a.series.shadowSize=a.shadowSize),a.highlightColor!=null&&(a.series.highlightColor=a.highlightColor);for(r=0;r<a.xaxes.length;++r)O(d,r+1).options=a.xaxes[r];for(r=0;r<a.yaxes.length;++r)O(v,r+1).options=a.yaxes[r];for(var u in b)a.hooks[u]&&a.hooks[u].length&&(b[u]=b[u].concat(a.hooks[u]));E(b.processOptions,[a])}function T(e){u=N(e),M(),_()}function N(t){var n=[];for(var r=0;r<t.length;++r){var i=e.extend(!0,{},a.series);t[r].data!=null?(i.data=t[r].data,delete t[r].data,e.extend(!0,i,t[r]),t[r].data=i.data):i.data=t[r],n.push(i)}return n}function C(e,t){var n=e[t+"axis"];return typeof n=="object"&&(n=n.n),typeof n!="number"&&(n=1),n}function k(){return e.grep(d.concat(v),function(e){return e})}function L(e){var t={},n,r;for(n=0;n<d.length;++n)r=d[n],r&&r.used&&(t["x"+r.n]=r.c2p(e.left));for(n=0;n<v.length;++n)r=v[n],r&&r.used&&(t["y"+r.n]=r.c2p(e.top));return t.x1!==undefined&&(t.x=t.x1),t.y1!==undefined&&(t.y=t.y1),t}function A(e){var t={},n,r,i;for(n=0;n<d.length;++n){r=d[n];if(r&&r.used){i="x"+r.n,e[i]==null&&r.n==1&&(i="x");if(e[i]!=null){t.left=r.p2c(e[i]);break}}}for(n=0;n<v.length;++n){r=v[n];if(r&&r.used){i="y"+r.n,e[i]==null&&r.n==1&&(i="y");if(e[i]!=null){t.top=r.p2c(e[i]);break}}}return t}function O(t,n){return t[n-1]||(t[n-1]={n:n,direction:t==d?"x":"y",options:e.extend(!0,{},t==d?a.xaxis:a.yaxis)}),t[n-1]}function M(){var t=u.length,n=-1,r;for(r=0;r<u.length;++r){var i=u[r].color;i!=null&&(t--,typeof i=="number"&&i>n&&(n=i))}t<=n&&(t=n+1);var s,o=[],f=a.colors,l=f.length,c=0;for(r=0;r<t;r++)s=e.color.parse(f[r%l]||"#666"),r%l==0&&r&&(c>=0?c<.5?c=-c-.2:c=0:c=-c),o[r]=s.scale("rgb",1+c);var h=0,p;for(r=0;r<u.length;++r){p=u[r],p.color==null?(p.color=o[h].toString(),++h):typeof p.color=="number"&&(p.color=o[p.color].toString());if(p.lines.show==null){var m,g=!0;for(m in p)if(p[m]&&p[m].show){g=!1;break}g&&(p.lines.show=!0)}p.lines.zero==null&&(p.lines.zero=!!p.lines.fill),p.xaxis=O(d,C(p,"x")),p.yaxis=O(v,C(p,"y"))}}function _(){function x(e,t,n){t<e.datamin&&t!=-r&&(e.datamin=t),n>e.datamax&&n!=r&&(e.datamax=n)}var t=Number.POSITIVE_INFINITY,n=Number.NEGATIVE_INFINITY,r=Number.MAX_VALUE,i,s,o,a,f,l,c,h,p,d,v,m,g,y,w,S;e.each(k(),function(e,r){r.datamin=t,r.datamax=n,r.used=!1});for(i=0;i<u.length;++i)l=u[i],l.datapoints={points:[]},E(b.processRawData,[l,l.data,l.datapoints]);for(i=0;i<u.length;++i){l=u[i],w=l.data,S=l.datapoints.format;if(!S){S=[],S.push({x:!0,number:!0,required:!0}),S.push({y:!0,number:!0,required:!0});if(l.bars.show||l.lines.show&&l.lines.fill){var T=!!(l.bars.show&&l.bars.zero||l.lines.show&&l.lines.zero);S.push({y:!0,number:!0,required:!1,defaultValue:0,autoscale:T}),l.bars.horizontal&&(delete S[S.length-1].y,S[S.length-1].x=!0)}l.datapoints.format=S}if(l.datapoints.pointsize!=null)continue;l.datapoints.pointsize=S.length,h=l.datapoints.pointsize,c=l.datapoints.points;var N=l.lines.show&&l.lines.steps;l.xaxis.used=l.yaxis.used=!0;for(s=o=0;s<w.length;++s,o+=h){y=w[s];var C=y==null;if(!C)for(a=0;a<h;++a)m=y[a],g=S[a],g&&(g.number&&m!=null&&(m=+m,isNaN(m)?m=null:m==Infinity?m=r:m==-Infinity&&(m=-r)),m==null&&(g.required&&(C=!0),g.defaultValue!=null&&(m=g.defaultValue))),c[o+a]=m;if(C)for(a=0;a<h;++a)m=c[o+a],m!=null&&(g=S[a],g.autoscale&&(g.x&&x(l.xaxis,m,m),g.y&&x(l.yaxis,m,m))),c[o+a]=null;else if(N&&o>0&&c[o-h]!=null&&c[o-h]!=c[o]&&c[o-h+1]!=c[o+1]){for(a=0;a<h;++a)c[o+h+a]=c[o+a];c[o+1]=c[o-h+1],o+=h}}}for(i=0;i<u.length;++i)l=u[i],E(b.processDatapoints,[l,l.datapoints]);for(i=0;i<u.length;++i){l=u[i],c=l.datapoints.points,h=l.datapoints.pointsize,S=l.datapoints.format;var L=t,A=t,O=n,M=n;for(s=0;s<c.length;s+=h){if(c[s]==null)continue;for(a=0;a<h;++a){m=c[s+a],g=S[a];if(!g||g.autoscale===!1||m==r||m==-r)continue;g.x&&(m<L&&(L=m),m>O&&(O=m)),g.y&&(m<A&&(A=m),m>M&&(M=m))}}if(l.bars.show){var _;switch(l.bars.align){case"left":_=0;break;case"right":_=-l.bars.barWidth;break;case"center":_=-l.bars.barWidth/2;break;default:throw new Error("Invalid bar alignment: "+l.bars.align)}l.bars.horizontal?(A+=_,M+=_+l.bars.barWidth):(L+=_,O+=_+l.bars.barWidth)}x(l.xaxis,L,O),x(l.yaxis,A,M)}e.each(k(),function(e,r){r.datamin==t&&(r.datamin=null),r.datamax==n&&(r.datamax=null)})}function D(){t.css("padding",0).children(":not(.flot-base,.flot-overlay)").remove(),t.css("position")=="static"&&t.css("position","relative"),f=new n("flot-base",t),l=new n("flot-overlay",t),h=f.context,p=l.context,c=e(l.element).unbind();var r=t.data("plot");r&&(r.shutdown(),l.clear()),t.data("plot",w)}function P(){a.grid.hoverable&&(c.mousemove(at),c.bind("mouseleave",ft)),a.grid.clickable&&c.click(lt),E(b.bindEvents,[c])}function H(){ot&&clearTimeout(ot),c.unbind("mousemove",at),c.unbind("mouseleave",ft),c.unbind("click",lt),E(b.shutdown,[c])}function B(e){function t(e){return e}var n,r,i=e.options.transform||t,s=e.options.inverseTransform;e.direction=="x"?(n=e.scale=g/Math.abs(i(e.max)-i(e.min)),r=Math.min(i(e.max),i(e.min))):(n=e.scale=y/Math.abs(i(e.max)-i(e.min)),n=-n,r=Math.max(i(e.max),i(e.min))),i==t?e.p2c=function(e){return(e-r)*n}:e.p2c=function(e){return(i(e)-r)*n},s?e.c2p=function(e){return s(r+e/n)}:e.c2p=function(e){return r+e/n}}function j(e){var t=e.options,n=e.ticks||[],r=t.labelWidth||0,i=t.labelHeight||0,s=r||e.direction=="x"?Math.floor(f.width/(n.length||1)):null;legacyStyles=e.direction+"Axis "+e.direction+e.n+"Axis",layer="flot-"+e.direction+"-axis flot-"+e.direction+e.n+"-axis "+legacyStyles,font=t.font||"flot-tick-label tickLabel";for(var o=0;o<n.length;++o){var u=n[o];if(!u.label)continue;var a=f.getTextInfo(layer,u.label,font,null,s);r=Math.max(r,a.width),i=Math.max(i,a.height)}e.labelWidth=t.labelWidth||r,e.labelHeight=t.labelHeight||i}function F(t){var n=t.labelWidth,r=t.labelHeight,i=t.options.position,s=t.options.tickLength,o=a.grid.axisMargin,u=a.grid.labelMargin,l=t.direction=="x"?d:v,c,h,p=e.grep(l,function(e){return e&&e.options.position==i&&e.reserveSpace});e.inArray(t,p)==p.length-1&&(o=0);if(s==null){var g=e.grep(l,function(e){return e&&e.reserveSpace});h=e.inArray(t,g)==0,h?s="full":s=5}isNaN(+s)||(u+=+s),t.direction=="x"?(r+=u,i=="bottom"?(m.bottom+=r+o,t.box={top:f.height-m.bottom,height:r}):(t.box={top:m.top+o,height:r},m.top+=r+o)):(n+=u,i=="left"?(t.box={left:m.left+o,width:n},m.left+=n+o):(m.right+=n+o,t.box={left:f.width-m.right,width:n})),t.position=i,t.tickLength=s,t.box.padding=u,t.innermost=h}function I(e){e.direction=="x"?(e.box.left=m.left-e.labelWidth/2,e.box.width=f.width-m.left-m.right+e.labelWidth):(e.box.top=m.top-e.labelHeight/2,e.box.height=f.height-m.bottom-m.top+e.labelHeight)}function q(){var t=a.grid.minBorderMargin,n={x:0,y:0},r,i;if(t==null){t=0;for(r=0;r<u.length;++r)t=Math.max(t,2*(u[r].points.radius+u[r].points.lineWidth/2))}n.x=n.y=Math.ceil(t),e.each(k(),function(e,t){var r=t.direction;t.reserveSpace&&(n[r]=Math.ceil(Math.max(n[r],(r=="x"?t.labelWidth:t.labelHeight)/2)))}),m.left=Math.max(n.x,m.left),m.right=Math.max(n.x,m.right),m.top=Math.max(n.y,m.top),m.bottom=Math.max(n.y,m.bottom)}function R(){var t,n=k(),r=a.grid.show;for(var i in m){var s=a.grid.margin||0;m[i]=typeof s=="number"?s:s[i]||0}E(b.processOffset,[m]);for(var i in m)typeof a.grid.borderWidth=="object"?m[i]+=r?a.grid.borderWidth[i]:0:m[i]+=r?a.grid.borderWidth:0;e.each(n,function(e,t){t.show=t.options.show,t.show==null&&(t.show=t.used),t.reserveSpace=t.show||t.options.reserveSpace,U(t)});if(r){var o=e.grep(n,function(e){return e.reserveSpace});e.each(o,function(e,t){z(t),W(t),X(t,t.ticks),j(t)});for(t=o.length-1;t>=0;--t)F(o[t]);q(),e.each(o,function(e,t){I(t)})}g=f.width-m.left-m.right,y=f.height-m.bottom-m.top,e.each(n,function(e,t){B(t)}),r&&G(),it()}function U(e){var t=e.options,n=+(t.min!=null?t.min:e.datamin),r=+(t.max!=null?t.max:e.datamax),i=r-n;if(i==0){var s=r==0?1:.01;t.min==null&&(n-=s);if(t.max==null||t.min!=null)r+=s}else{var o=t.autoscaleMargin;o!=null&&(t.min==null&&(n-=i*o,n<0&&e.datamin!=null&&e.datamin>=0&&(n=0)),t.max==null&&(r+=i*o,r>0&&e.datamax!=null&&e.datamax<=0&&(r=0)))}e.min=n,e.max=r}function z(t){var n=t.options,r;typeof n.ticks=="number"&&n.ticks>0?r=n.ticks:r=.3*Math.sqrt(t.direction=="x"?f.width:f.height);var s=(t.max-t.min)/r,o=-Math.floor(Math.log(s)/Math.LN10),u=n.tickDecimals;u!=null&&o>u&&(o=u);var a=Math.pow(10,-o),l=s/a,c;l<1.5?c=1:l<3?(c=2,l>2.25&&(u==null||o+1<=u)&&(c=2.5,++o)):l<7.5?c=5:c=10,c*=a,n.minTickSize!=null&&c<n.minTickSize&&(c=n.minTickSize),t.delta=s,t.tickDecimals=Math.max(0,u!=null?u:o),t.tickSize=n.tickSize||c;if(n.mode=="time"&&!t.tickGenerator)throw new Error("Time mode requires the flot.time plugin.");t.tickGenerator||(t.tickGenerator=function(e){var t=[],n=i(e.min,e.tickSize),r=0,s=Number.NaN,o;do o=s,s=n+r*e.tickSize,t.push(s),++r;while(s<e.max&&s!=o);return t},t.tickFormatter=function(e,t){var n=t.tickDecimals?Math.pow(10,t.tickDecimals):1,r=""+Math.round(e*n)/n;if(t.tickDecimals!=null){var i=r.indexOf("."),s=i==-1?0:r.length-i-1;if(s<t.tickDecimals)return(s?r:r+".")+(""+n).substr(1,t.tickDecimals-s)}return r}),e.isFunction(n.tickFormatter)&&(t.tickFormatter=function(e,t){return""+n.tickFormatter(e,t)});if(n.alignTicksWithAxis!=null){var h=(t.direction=="x"?d:v)[n.alignTicksWithAxis-1];if(h&&h.used&&h!=t){var p=t.tickGenerator(t);p.length>0&&(n.min==null&&(t.min=Math.min(t.min,p[0])),n.max==null&&p.length>1&&(t.max=Math.max(t.max,p[p.length-1]))),t.tickGenerator=function(e){var t=[],n,r;for(r=0;r<h.ticks.length;++r)n=(h.ticks[r].v-h.min)/(h.max-h.min),n=e.min+n*(e.max-e.min),t.push(n);return t};if(!t.mode&&n.tickDecimals==null){var m=Math.max(0,-Math.floor(Math.log(t.delta)/Math.LN10)+1),g=t.tickGenerator(t);g.length>1&&/\..*0$/.test((g[1]-g[0]).toFixed(m))||(t.tickDecimals=m)}}}}function W(t){var n=t.options.ticks,r=[];n==null||typeof n=="number"&&n>0?r=t.tickGenerator(t):n&&(e.isFunction(n)?r=n(t):r=n);var i,s;t.ticks=[];for(i=0;i<r.length;++i){var o=null,u=r[i];typeof u=="object"?(s=+u[0],u.length>1&&(o=u[1])):s=+u,o==null&&(o=t.tickFormatter(s,t)),isNaN(s)||t.ticks.push({v:s,label:o})}}function X(e,t){e.options.autoscaleMargin&&t.length>0&&(e.options.min==null&&(e.min=Math.min(e.min,t[0].v)),e.options.max==null&&t.length>1&&(e.max=Math.max(e.max,t[t.length-1].v)))}function V(){f.clear(),E(b.drawBackground,[h]);var e=a.grid;e.show&&e.backgroundColor&&K(),e.show&&!e.aboveData&&Q();for(var t=0;t<u.length;++t)E(b.drawSeries,[h,u[t]]),Y(u[t]);E(b.draw,[h]),e.show&&e.aboveData&&Q(),f.render(),ht()}function J(e,t){var n,r,i,s,o=k();for(var u=0;u<o.length;++u){n=o[u];if(n.direction==t){s=t+n.n+"axis",!e[s]&&n.n==1&&(s=t+"axis");if(e[s]){r=e[s].from,i=e[s].to;break}}}e[s]||(n=t=="x"?d[0]:v[0],r=e[t+"1"],i=e[t+"2"]);if(r!=null&&i!=null&&r>i){var a=r;r=i,i=a}return{from:r,to:i,axis:n}}function K(){h.save(),h.translate(m.left,m.top),h.fillStyle=bt(a.grid.backgroundColor,y,0,"rgba(255, 255, 255, 0)"),h.fillRect(0,0,g,y),h.restore()}function Q(){var t,n,r,i;h.save(),h.translate(m.left,m.top);var s=a.grid.markings;if(s){e.isFunction(s)&&(n=w.getAxes(),n.xmin=n.xaxis.min,n.xmax=n.xaxis.max,n.ymin=n.yaxis.min,n.ymax=n.yaxis.max,s=s(n));for(t=0;t<s.length;++t){var o=s[t],u=J(o,"x"),f=J(o,"y");u.from==null&&(u.from=u.axis.min),u.to==null&&(u.to=u.axis.max),f.from==null&&(f.from=f.axis.min),f.to==null&&(f.to=f.axis.max);if(u.to<u.axis.min||u.from>u.axis.max||f.to<f.axis.min||f.from>f.axis.max)continue;u.from=Math.max(u.from,u.axis.min),u.to=Math.min(u.to,u.axis.max),f.from=Math.max(f.from,f.axis.min),f.to=Math.min(f.to,f.axis.max);if(u.from==u.to&&f.from==f.to)continue;u.from=u.axis.p2c(u.from),u.to=u.axis.p2c(u.to),f.from=f.axis.p2c(f.from),f.to=f.axis.p2c(f.to),u.from==u.to||f.from==f.to?(h.beginPath(),h.strokeStyle=o.color||a.grid.markingsColor,h.lineWidth=o.lineWidth||a.grid.markingsLineWidth,h.moveTo(u.from,f.from),h.lineTo(u.to,f.to),h.stroke()):(h.fillStyle=o.color||a.grid.markingsColor,h.fillRect(u.from,f.to,u.to-u.from,f.from-f.to))}}n=k(),r=a.grid.borderWidth;for(var l=0;l<n.length;++l){var c=n[l],p=c.box,d=c.tickLength,v,b,E,S;if(!c.show||c.ticks.length==0)continue;h.lineWidth=1,c.direction=="x"?(v=0,d=="full"?b=c.position=="top"?0:y:b=p.top-m.top+(c.position=="top"?p.height:0)):(b=0,d=="full"?v=c.position=="left"?0:g:v=p.left-m.left+(c.position=="left"?p.width:0)),c.innermost||(h.strokeStyle=c.options.color,h.beginPath(),E=S=0,c.direction=="x"?E=g+1:S=y+1,h.lineWidth==1&&(c.direction=="x"?b=Math.floor(b)+.5:v=Math.floor(v)+.5),h.moveTo(v,b),h.lineTo(v+E,b+S),h.stroke()),h.strokeStyle=c.options.tickColor,h.beginPath();for(t=0;t<c.ticks.length;++t){var x=c.ticks[t].v;E=S=0;if(isNaN(x)||x<c.min||x>c.max||d=="full"&&(typeof r=="object"&&r[c.position]>0||r>0)&&(x==c.min||x==c.max))continue;c.direction=="x"?(v=c.p2c(x),S=d=="full"?-y:d,c.position=="top"&&(S=-S)):(b=c.p2c(x),E=d=="full"?-g:d,c.position=="left"&&(E=-E)),h.lineWidth==1&&(c.direction=="x"?v=Math.floor(v)+.5:b=Math.floor(b)+.5),h.moveTo(v,b),h.lineTo(v+E,b+S)}h.stroke()}r&&(i=a.grid.borderColor,typeof r=="object"||typeof i=="object"?(typeof r!="object"&&(r={top:r,right:r,bottom:r,left:r}),typeof i!="object"&&(i={top:i,right:i,bottom:i,left:i}),r.top>0&&(h.strokeStyle=i.top,h.lineWidth=r.top,h.beginPath(),h.moveTo(0-r.left,0-r.top/2),h.lineTo(g,0-r.top/2),h.stroke()),r.right>0&&(h.strokeStyle=i.right,h.lineWidth=r.right,h.beginPath(),h.moveTo(g+r.right/2,0-r.top),h.lineTo(g+r.right/2,y),h.stroke()),r.bottom>0&&(h.strokeStyle=i.bottom,h.lineWidth=r.bottom,h.beginPath(),h.moveTo(g+r.right,y+r.bottom/2),h.lineTo(0,y+r.bottom/2),h.stroke()),r.left>0&&(h.strokeStyle=i.left,h.lineWidth=r.left,h.beginPath(),h.moveTo(0-r.left/2,y+r.bottom),h.lineTo(0-r.left/2,0),h.stroke())):(h.lineWidth=r,h.strokeStyle=a.grid.borderColor,h.strokeRect(-r/2,-r/2,g+r,y+r))),h.restore()}function G(){e.each(k(),function(e,t){if(!t.show||t.ticks.length==0)return;var n=t.box,r=t.direction+"Axis "+t.direction+t.n+"Axis",i="flot-"+t.direction+"-axis flot-"+t.direction+t.n+"-axis "+r,s=t.options.font||"flot-tick-label tickLabel",o,u,a,l,c;f.removeText(i);for(var h=0;h<t.ticks.length;++h){o=t.ticks[h];if(!o.label||o.v<t.min||o.v>t.max)continue;t.direction=="x"?(l="center",u=m.left+t.p2c(o.v),t.position=="bottom"?a=n.top+n.padding:(a=n.top+n.height-n.padding,c="bottom")):(c="middle",a=m.top+t.p2c(o.v),t.position=="left"?(u=n.left+n.width-n.padding,l="right"):u=n.left+n.padding),f.addText(i,u,a,o.label,s,null,null,l,c)}})}function Y(e){e.lines.show&&Z(e),e.bars.show&&nt(e),e.points.show&&et(e)}function Z(e){function t(e,t,n,r,i){var s=e.points,o=e.pointsize,u=null,a=null;h.beginPath();for(var f=o;f<s.length;f+=o){var l=s[f-o],c=s[f-o+1],p=s[f],d=s[f+1];if(l==null||p==null)continue;if(c<=d&&c<i.min){if(d<i.min)continue;l=(i.min-c)/(d-c)*(p-l)+l,c=i.min}else if(d<=c&&d<i.min){if(c<i.min)continue;p=(i.min-c)/(d-c)*(p-l)+l,d=i.min}if(c>=d&&c>i.max){if(d>i.max)continue;l=(i.max-c)/(d-c)*(p-l)+l,c=i.max}else if(d>=c&&d>i.max){if(c>i.max)continue;p=(i.max-c)/(d-c)*(p-l)+l,d=i.max}if(l<=p&&l<r.min){if(p<r.min)continue;c=(r.min-l)/(p-l)*(d-c)+c,l=r.min}else if(p<=l&&p<r.min){if(l<r.min)continue;d=(r.min-l)/(p-l)*(d-c)+c,p=r.min}if(l>=p&&l>r.max){if(p>r.max)continue;c=(r.max-l)/(p-l)*(d-c)+c,l=r.max}else if(p>=l&&p>r.max){if(l>r.max)continue;d=(r.max-l)/(p-l)*(d-c)+c,p=r.max}(l!=u||c!=a)&&h.moveTo(r.p2c(l)+t,i.p2c(c)+n),u=p,a=d,h.lineTo(r.p2c(p)+t,i.p2c(d)+n)}h.stroke()}function n(e,t,n){var r=e.points,i=e.pointsize,s=Math.min(Math.max(0,n.min),n.max),o=0,u,a=!1,f=1,l=0,c=0;for(;;){if(i>0&&o>r.length+i)break;o+=i;var p=r[o-i],d=r[o-i+f],v=r[o],m=r[o+f];if(a){if(i>0&&p!=null&&v==null){c=o,i=-i,f=2;continue}if(i<0&&o==l+i){h.fill(),a=!1,i=-i,f=1,o=l=c+i;continue}}if(p==null||v==null)continue;if(p<=v&&p<t.min){if(v<t.min)continue;d=(t.min-p)/(v-p)*(m-d)+d,p=t.min}else if(v<=p&&v<t.min){if(p<t.min)continue;m=(t.min-p)/(v-p)*(m-d)+d,v=t.min}if(p>=v&&p>t.max){if(v>t.max)continue;d=(t.max-p)/(v-p)*(m-d)+d,p=t.max}else if(v>=p&&v>t.max){if(p>t.max)continue;m=(t.max-p)/(v-p)*(m-d)+d,v=t.max}a||(h.beginPath(),h.moveTo(t.p2c(p),n.p2c(s)),a=!0);if(d>=n.max&&m>=n.max){h.lineTo(t.p2c(p),n.p2c(n.max)),h.lineTo(t.p2c(v),n.p2c(n.max));continue}if(d<=n.min&&m<=n.min){h.lineTo(t.p2c(p),n.p2c(n.min)),h.lineTo(t.p2c(v),n.p2c(n.min));continue}var g=p,y=v;d<=m&&d<n.min&&m>=n.min?(p=(n.min-d)/(m-d)*(v-p)+p,d=n.min):m<=d&&m<n.min&&d>=n.min&&(v=(n.min-d)/(m-d)*(v-p)+p,m=n.min),d>=m&&d>n.max&&m<=n.max?(p=(n.max-d)/(m-d)*(v-p)+p,d=n.max):m>=d&&m>n.max&&d<=n.max&&(v=(n.max-d)/(m-d)*(v-p)+p,m=n.max),p!=g&&h.lineTo(t.p2c(g),n.p2c(d)),h.lineTo(t.p2c(p),n.p2c(d)),h.lineTo(t.p2c(v),n.p2c(m)),v!=y&&(h.lineTo(t.p2c(v),n.p2c(m)),h.lineTo(t.p2c(y),n.p2c(m)))}}h.save(),h.translate(m.left,m.top),h.lineJoin="round";var r=e.lines.lineWidth,i=e.shadowSize;if(r>0&&i>0){h.lineWidth=i,h.strokeStyle="rgba(0,0,0,0.1)";var s=Math.PI/18;t(e.datapoints,Math.sin(s)*(r/2+i/2),Math.cos(s)*(r/2+i/2),e.xaxis,e.yaxis),h.lineWidth=i/2,t(e.datapoints,Math.sin(s)*(r/2+i/4),Math.cos(s)*(r/2+i/4),e.xaxis,e.yaxis)}h.lineWidth=r,h.strokeStyle=e.color;var o=rt(e.lines,e.color,0,y);o&&(h.fillStyle=o,n(e.datapoints,e.xaxis,e.yaxis)),r>0&&t(e.datapoints,0,0,e.xaxis,e.yaxis),h.restore()}function et(e){function t(e,t,n,r,i,s,o,u){var a=e.points,f=e.pointsize;for(var l=0;l<a.length;l+=f){var c=a[l],p=a[l+1];if(c==null||c<s.min||c>s.max||p<o.min||p>o.max)continue;h.beginPath(),c=s.p2c(c),p=o.p2c(p)+r,u=="circle"?h.arc(c,p,t,0,i?Math.PI:Math.PI*2,!1):u(h,c,p,t,i),h.closePath(),n&&(h.fillStyle=n,h.fill()),h.stroke()}}h.save(),h.translate(m.left,m.top);var n=e.points.lineWidth,r=e.shadowSize,i=e.points.radius,s=e.points.symbol;n==0&&(n=1e-4);if(n>0&&r>0){var o=r/2;h.lineWidth=o,h.strokeStyle="rgba(0,0,0,0.1)",t(e.datapoints,i,null,o+o/2,!0,e.xaxis,e.yaxis,s),h.strokeStyle="rgba(0,0,0,0.2)",t(e.datapoints,i,null,o/2,!0,e.xaxis,e.yaxis,s)}h.lineWidth=n,h.strokeStyle=e.color,t(e.datapoints,i,rt(e.points,e.color),0,!1,e.xaxis,e.yaxis,s),h.restore()}function tt(e,t,n,r,i,s,o,u,a,f,l,c){var h,p,d,v,m,g,y,b,w;l?(b=g=y=!0,m=!1,h=n,p=e,v=t+r,d=t+i,p<h&&(w=p,p=h,h=w,m=!0,g=!1)):(m=g=y=!0,b=!1,h=e+r,p=e+i,d=n,v=t,v<d&&(w=v,v=d,d=w,b=!0,y=!1));if(p<u.min||h>u.max||v<a.min||d>a.max)return;h<u.min&&(h=u.min,m=!1),p>u.max&&(p=u.max,g=!1),d<a.min&&(d=a.min,b=!1),v>a.max&&(v=a.max,y=!1),h=u.p2c(h),d=a.p2c(d),p=u.p2c(p),v=a.p2c(v),o&&(f.beginPath(),f.moveTo(h,d),f.lineTo(h,v),f.lineTo(p,v),f.lineTo(p,d),f.fillStyle=o(d,v),f.fill()),c>0&&(m||g||y||b)&&(f.beginPath(),f.moveTo(h,d+s),m?f.lineTo(h,v+s):f.moveTo(h,v+s),y?f.lineTo(p,v+s):f.moveTo(p,v+s),g?f.lineTo(p,d+s):f.moveTo(p,d+s),b?f.lineTo(h,d+s):f.moveTo(h,d+s),f.stroke())}function nt(e){function t(t,n,r,i,s,o,u){var a=t.points,f=t.pointsize;for(var l=0;l<a.length;l+=f){if(a[l]==null)continue;tt(a[l],a[l+1],a[l+2],n,r,i,s,o,u,h,e.bars.horizontal,e.bars.lineWidth)}}h.save(),h.translate(m.left,m.top),h.lineWidth=e.bars.lineWidth,h.strokeStyle=e.color;var n;switch(e.bars.align){case"left":n=0;break;case"right":n=-e.bars.barWidth;break;case"center":n=-e.bars.barWidth/2;break;default:throw new Error("Invalid bar alignment: "+e.bars.align)}var r=e.bars.fill?function(t,n){return rt(e.bars,e.color,t,n)}:null;t(e.datapoints,n,n+e.bars.barWidth,0,r,e.xaxis,e.yaxis),h.restore()}function rt(t,n,r,i){var s=t.fill;if(!s)return null;if(t.fillColor)return bt(t.fillColor,r,i,n);var o=e.color.parse(n);return o.a=typeof s=="number"?s:.4,o.normalize(),o.toString()}function it(){t.find(".legend").remove();if(!a.legend.show)return;var n=[],r=[],i=!1,s=a.legend.labelFormatter,o,f;for(var l=0;l<u.length;++l)o=u[l],o.label&&(f=s?s(o.label,o):o.label,f&&r.push({label:f,color:o.color}));if(a.legend.sorted)if(e.isFunction(a.legend.sorted))r.sort(a.legend.sorted);else if(a.legend.sorted=="reverse")r.reverse();else{var c=a.legend.sorted!="descending";r.sort(function(e,t){return e.label==t.label?0:e.label<t.label!=c?1:-1})}for(var l=0;l<r.length;++l){var h=r[l];l%a.legend.noColumns==0&&(i&&n.push("</tr>"),n.push("<tr>"),i=!0),n.push('<td class="legendColorBox"><div style="border:1px solid '+a.legend.labelBoxBorderColor+';padding:1px"><div style="width:4px;height:0;border:5px solid '+h.color+';overflow:hidden"></div></div></td>'+'<td class="legendLabel">'+h.label+"</td>")}i&&n.push("</tr>");if(n.length==0)return;var p='<table style="font-size:smaller;color:'+a.grid.color+'">'+n.join("")+"</table>";if(a.legend.container!=null)e(a.legend.container).html(p);else{var d="",v=a.legend.position,g=a.legend.margin;g[0]==null&&(g=[g,g]),v.charAt(0)=="n"?d+="top:"+(g[1]+m.top)+"px;":v.charAt(0)=="s"&&(d+="bottom:"+(g[1]+m.bottom)+"px;"),v.charAt(1)=="e"?d+="right:"+(g[0]+m.right)+"px;":v.charAt(1)=="w"&&(d+="left:"+(g[0]+m.left)+"px;");var y=e('<div class="legend">'+p.replace('style="','style="position:absolute;'+d+";")+"</div>").appendTo(t);if(a.legend.backgroundOpacity!=0){var b=a.legend.backgroundColor;b==null&&(b=a.grid.backgroundColor,b&&typeof b=="string"?b=e.color.parse(b):b=e.color.extract(y,"background-color"),b.a=1,b=b.toString());var w=y.children();e('<div style="position:absolute;width:'+w.width()+"px;height:"+w.height()+"px;"+d+"background-color:"+b+';"> </div>').prependTo(y).css("opacity",a.legend.backgroundOpacity)}}}function ut(e,t,n){var r=a.grid.mouseActiveRadius,i=r*r+1,s=null,o=!1,f,l,c;for(f=u.length-1;f>=0;--f){if(!n(u[f]))continue;var h=u[f],p=h.xaxis,d=h.yaxis,v=h.datapoints.points,m=p.c2p(e),g=d.c2p(t),y=r/p.scale,b=r/d.scale;c=h.datapoints.pointsize,p.options.inverseTransform&&(y=Number.MAX_VALUE),d.options.inverseTransform&&(b=Number.MAX_VALUE);if(h.lines.show||h.points.show)for(l=0;l<v.length;l+=c){var w=v[l],E=v[l+1];if(w==null)continue;if(w-m>y||w-m<-y||E-g>b||E-g<-b)continue;var S=Math.abs(p.p2c(w)-e),x=Math.abs(d.p2c(E)-t),T=S*S+x*x;T<i&&(i=T,s=[f,l/c])}if(h.bars.show&&!s){var N=h.bars.align=="left"?0:-h.bars.barWidth/2,C=N+h.bars.barWidth;for(l=0;l<v.length;l+=c){var w=v[l],E=v[l+1],k=v[l+2];if(w==null)continue;if(u[f].bars.horizontal?m<=Math.max(k,w)&&m>=Math.min(k,w)&&g>=E+N&&g<=E+C:m>=w+N&&m<=w+C&&g>=Math.min(k,E)&&g<=Math.max(k,E))s=[f,l/c]}}}return s?(f=s[0],l=s[1],c=u[f].datapoints.pointsize,{datapoint:u[f].datapoints.points.slice(l*c,(l+1)*c),dataIndex:l,series:u[f],seriesIndex:f}):null}function at(e){a.grid.hoverable&&ct("plothover",e,function(e){return e["hoverable"]!=0})}function ft(e){a.grid.hoverable&&ct("plothover",e,function(e){return!1})}function lt(e){ct("plotclick",e,function(e){return e["clickable"]!=0})}function ct(e,n,r){var i=c.offset(),s=n.pageX-i.left-m.left,o=n.pageY-i.top-m.top,u=L({left:s,top:o});u.pageX=n.pageX,u.pageY=n.pageY;var f=ut(s,o,r);f&&(f.pageX=parseInt(f.series.xaxis.p2c(f.datapoint[0])+i.left+m.left,10),f.pageY=parseInt(f.series.yaxis.p2c(f.datapoint[1])+i.top+m.top,10));if(a.grid.autoHighlight){for(var l=0;l<st.length;++l){var h=st[l];h.auto==e&&(!f||h.series!=f.series||h.point[0]!=f.datapoint[0]||h.point[1]!=f.datapoint[1])&&vt(h.series,h.point)}f&&dt(f.series,f.datapoint,e)}t.trigger(e,[u,f])}function ht(){var e=a.interaction.redrawOverlayInterval;if(e==-1){pt();return}ot||(ot=setTimeout(pt,e))}function pt(){ot=null,p.save(),l.clear(),p.translate(m.left,m.top);var e,t;for(e=0;e<st.length;++e)t=st[e],t.series.bars.show?yt(t.series,t.point):gt(t.series,t.point);p.restore(),E(b.drawOverlay,[p])}function dt(e,t,n){typeof e=="number"&&(e=u[e]);if(typeof t=="number"){var r=e.datapoints.pointsize;t=e.datapoints.points.slice(r*t,r*(t+1))}var i=mt(e,t);i==-1?(st.push({series:e,point:t,auto:n}),ht()):n||(st[i].auto=!1)}function vt(e,t){if(e==null&&t==null){st=[],ht();return}typeof e=="number"&&(e=u[e]);if(typeof t=="number"){var n=e.datapoints.pointsize;t=e.datapoints.points.slice(n*t,n*(t+1))}var r=mt(e,t);r!=-1&&(st.splice(r,1),ht())}function mt(e,t){for(var n=0;n<st.length;++n){var r=st[n];if(r.series==e&&r.point[0]==t[0]&&r.point[1]==t[1])return n}return-1}function gt(t,n){var r=n[0],i=n[1],s=t.xaxis,o=t.yaxis,u=typeof t.highlightColor=="string"?t.highlightColor:e.color.parse(t.color).scale("a",.5).toString();if(r<s.min||r>s.max||i<o.min||i>o.max)return;var a=t.points.radius+t.points.lineWidth/2;p.lineWidth=a,p.strokeStyle=u;var f=1.5*a;r=s.p2c(r),i=o.p2c(i),p.beginPath(),t.points.symbol=="circle"?p.arc(r,i,f,0,2*Math.PI,!1):t.points.symbol(p,r,i,f,!1),p.closePath(),p.stroke()}function yt(t,n){var r=typeof t.highlightColor=="string"?t.highlightColor:e.color.parse(t.color).scale("a",.5).toString(),i=r,s=t.bars.align=="left"?0:-t.bars.barWidth/2;p.lineWidth=t.bars.lineWidth,p.strokeStyle=r,tt(n[0],n[1],n[2]||0,s,s+t.bars.barWidth,0,function(){return i},t.xaxis,t.yaxis,p,t.bars.horizontal,t.bars.lineWidth)}function bt(t,n,r,i){if(typeof t=="string")return t;var s=h.createLinearGradient(0,r,0,n);for(var o=0,u=t.colors.length;o<u;++o){var a=t.colors[o];if(typeof a!="string"){var f=e.color.parse(i);a.brightness!=null&&(f=f.scale("rgb",a.brightness)),a.opacity!=null&&(f.a*=a.opacity),a=f.toString()}s.addColorStop(o/(u-1),a)}return s}var u=[],a={colors:["#edc240","#afd8f8","#cb4b4b","#4da74d","#9440ed"],legend:{show:!0,noColumns:1,labelFormatter:null,labelBoxBorderColor:"#ccc",container:null,position:"ne",margin:5,backgroundColor:null,backgroundOpacity:.85,sorted:null},xaxis:{show:null,position:"bottom",mode:null,font:null,color:null,tickColor:null,transform:null,inverseTransform:null,min:null,max:null,autoscaleMargin:null,ticks:null,tickFormatter:null,labelWidth:null,labelHeight:null,reserveSpace:null,tickLength:null,alignTicksWithAxis:null,tickDecimals:null,tickSize:null,minTickSize:null},yaxis:{autoscaleMargin:.02,position:"left"},xaxes:[],yaxes:[],series:{points:{show:!1,radius:3,lineWidth:2,fill:!0,fillColor:"#ffffff",symbol:"circle"},lines:{lineWidth:2,fill:!1,fillColor:null,steps:!1},bars:{show:!1,lineWidth:2,barWidth:1,fill:!0,fillColor:null,align:"left",horizontal:!1,zero:!0},shadowSize:3,highlightColor:null},grid:{show:!0,aboveData:!1,color:"#545454",backgroundColor:null,borderColor:null,tickColor:null,margin:0,labelMargin:5,axisMargin:8,borderWidth:2,minBorderMargin:null,markings:null,markingsColor:"#f4f4f4",markingsLineWidth:2,clickable:!1,hoverable:!1,autoHighlight:!0,mouseActiveRadius:10},interaction:{redrawOverlayInterval:1e3/60},hooks:{}},f=null,l=null,c=null,h=null,p=null,d=[],v=[],m={left:0,right:0,top:0,bottom
:0},g=0,y=0,b={processOptions:[],processRawData:[],processDatapoints:[],processOffset:[],drawBackground:[],drawSeries:[],draw:[],bindEvents:[],drawOverlay:[],shutdown:[]},w=this;w.setData=T,w.setupGrid=R,w.draw=V,w.getPlaceholder=function(){return t},w.getCanvas=function(){return f.element},w.getPlotOffset=function(){return m},w.width=function(){return g},w.height=function(){return y},w.offset=function(){var e=c.offset();return e.left+=m.left,e.top+=m.top,e},w.getData=function(){return u},w.getAxes=function(){var t={},n;return e.each(d.concat(v),function(e,n){n&&(t[n.direction+(n.n!=1?n.n:"")+"axis"]=n)}),t},w.getXAxes=function(){return d},w.getYAxes=function(){return v},w.c2p=L,w.p2c=A,w.getOptions=function(){return a},w.highlight=dt,w.unhighlight=vt,w.triggerRedrawOverlay=ht,w.pointOffset=function(e){return{left:parseInt(d[C(e,"x")-1].p2c(+e.x)+m.left,10),top:parseInt(v[C(e,"y")-1].p2c(+e.y)+m.top,10)}},w.shutdown=H,w.resize=function(){var e=t.width(),n=t.height();f.resize(e,n),l.resize(e,n)},w.hooks=b,S(w),x(s),D(),T(r),R(),V(),P();var st=[],ot=null}function i(e,t){return t*Math.floor(e/t)}var t=Object.prototype.hasOwnProperty;n.prototype.resize=function(e,t){if(e<=0||t<=0)throw new Error("Invalid dimensions for plot, width = "+e+", height = "+t);var n=this.element,r=this.context,i=this.pixelRatio;this.width!=e&&(n.width=e*i,n.style.width=e+"px",this.width=e),this.height!=t&&(n.height=t*i,n.style.height=t+"px",this.height=t),r.restore(),r.save(),r.scale(i,i)},n.prototype.clear=function(){this.context.clearRect(0,0,this.width,this.height)},n.prototype.render=function(){var e=this._textCache;for(var n in e)if(t.call(e,n)){var r=this.getTextLayer(n),i=e[n];r.hide();for(var s in i)if(t.call(i,s)){var o=i[s];for(var u in o)if(t.call(o,u)){var a=o[u].positions;for(var f=0,l;l=a[f];f++)l.active?l.rendered||(r.append(l.element),l.rendered=!0):(a.splice(f--,1),l.rendered&&l.element.detach());a.length==0&&delete o[u]}}r.show()}},n.prototype.getTextLayer=function(t){var n=this.text[t];return n==null&&(this.textContainer==null&&(this.textContainer=e("<div class='flot-text'></div>").css({position:"absolute",top:0,left:0,bottom:0,right:0,"font-size":"smaller",color:"#545454"}).insertAfter(this.element)),n=this.text[t]=e("<div></div>").addClass(t).css({position:"absolute",top:0,left:0,bottom:0,right:0}).appendTo(this.textContainer)),n},n.prototype.getTextInfo=function(t,n,r,i,s){var o,u,a,f;n=""+n,typeof r=="object"?o=r.style+" "+r.variant+" "+r.weight+" "+r.size+"px/"+r.lineHeight+"px "+r.family:o=r,u=this._textCache[t],u==null&&(u=this._textCache[t]={}),a=u[o],a==null&&(a=u[o]={}),f=a[n];if(f==null){var l=e("<div></div>").html(n).css({position:"absolute","max-width":s,top:-9999}).appendTo(this.getTextLayer(t));typeof r=="object"?l.css({font:o,color:r.color}):typeof r=="string"&&l.addClass(r),f=a[n]={width:l.outerWidth(!0),height:l.outerHeight(!0),element:l,positions:[]},l.detach()}return f},n.prototype.addText=function(e,t,n,r,i,s,o,u,a){var f=this.getTextInfo(e,r,i,s,o),l=f.positions;u=="center"?t-=f.width/2:u=="right"&&(t-=f.width),a=="middle"?n-=f.height/2:a=="bottom"&&(n-=f.height);for(var c=0,h;h=l[c];c++)if(h.x==t&&h.y==n){h.active=!0;return}h={active:!0,rendered:!1,element:l.length?f.element.clone():f.element,x:t,y:n},l.push(h),h.element.css({top:Math.round(n),left:Math.round(t),"text-align":u})},n.prototype.removeText=function(e,n,r,i,s,o){if(i==null){var u=this._textCache[e];if(u!=null)for(var a in u)if(t.call(u,a)){var f=u[a];for(var l in f)if(t.call(f,l)){var c=f[l].positions;for(var h=0,p;p=c[h];h++)p.active=!1}}}else{var c=this.getTextInfo(e,i,s,o).positions;for(var h=0,p;p=c[h];h++)p.x==n&&p.y==r&&(p.active=!1)}},e.plot=function(t,n,i){var s=new r(e(t),n,i,e.plot.plugins);return s},e.plot.version="0.8.1",e.plot.plugins=[],e.fn.plot=function(t,n){return this.each(function(){e.plot(this,t,n)})}}(jQuery);
/*
 * jquery.flot.tooltip
 * 
 * description: easy-to-use tooltips for Flot charts
 * version: 0.6.1
 * author: Krzysztof Urbas @krzysu [myviews.pl]
 * website: https://github.com/krzysu/flot.tooltip
 * 
 * build on 2013-07-10
 * released under MIT License, 2012
*/ 
(function(t){var i={tooltip:!1,tooltipOpts:{content:"%s | X: %x | Y: %y",xDateFormat:null,yDateFormat:null,shifts:{x:10,y:20},defaultTheme:!0,onHover:function(){}}},o=function(t){this.tipPosition={x:0,y:0},this.init(t)};o.prototype.init=function(i){var o=this;i.hooks.bindEvents.push(function(i,e){if(o.plotOptions=i.getOptions(),o.plotOptions.tooltip!==!1&&void 0!==o.plotOptions.tooltip){o.tooltipOptions=o.plotOptions.tooltipOpts;var s=o.getDomElement();t(i.getPlaceholder()).bind("plothover",function(t,i,e){if(e){var n;n=o.stringFormat(o.tooltipOptions.content,e),s.html(n),o.updateTooltipPosition({x:i.pageX,y:i.pageY}),s.css({left:o.tipPosition.x+o.tooltipOptions.shifts.x,top:o.tipPosition.y+o.tooltipOptions.shifts.y}).show(),"function"==typeof o.tooltipOptions.onHover&&o.tooltipOptions.onHover(e,s)}else s.hide().html("")}),e.mousemove(function(t){var i={};i.x=t.pageX,i.y=t.pageY,o.updateTooltipPosition(i)})}})},o.prototype.getDomElement=function(){var i;return t("#flotTip").length>0?i=t("#flotTip"):(i=t("<div />").attr("id","flotTip"),i.appendTo("body").hide().css({position:"absolute"}),this.tooltipOptions.defaultTheme&&i.css({background:"#333536","z-index":"100",padding:"0.4em 0.6em","border-radius":"0.5em","font-size":"0.8em",border:"1px solid #111",display:"inline-block","white-space":"nowrap"})),i},o.prototype.updateTooltipPosition=function(i){var o=t("#flotTip").outerWidth()+this.tooltipOptions.shifts.x,e=t("#flotTip").outerHeight()+this.tooltipOptions.shifts.y;i.x-t(window).scrollLeft()>t(window).innerWidth()-o&&(i.x-=o),i.y-t(window).scrollTop()>t(window).innerHeight()-e&&(i.y-=e),this.tipPosition.x=i.x,this.tipPosition.y=i.y},o.prototype.stringFormat=function(t,i){var o=/%p\.{0,1}(\d{0,})/,e=/%s/,s=/%x\.{0,1}(?:\d{0,})/,n=/%y\.{0,1}(?:\d{0,})/;return"function"==typeof t&&(t=t(i.series.label,i.series.data[i.dataIndex][0],i.series.data[i.dataIndex][1])),i.series.percent!==void 0&&(t=this.adjustValPrecision(o,t,i.series.percent)),i.series.label!==void 0&&(t=t.replace(e,i.series.label)),this.isTimeMode("xaxis",i)&&this.isXDateFormat(i)&&(t=t.replace(s,this.timestampToDate(i.series.data[i.dataIndex][0],this.tooltipOptions.xDateFormat))),this.isTimeMode("yaxis",i)&&this.isYDateFormat(i)&&(t=t.replace(n,this.timestampToDate(i.series.data[i.dataIndex][1],this.tooltipOptions.yDateFormat))),"number"==typeof i.series.data[i.dataIndex][0]&&(t=this.adjustValPrecision(s,t,i.series.data[i.dataIndex][0])),"number"==typeof i.series.data[i.dataIndex][1]&&(t=this.adjustValPrecision(n,t,i.series.data[i.dataIndex][1])),i.series.xaxis.tickFormatter!==void 0&&(t=t.replace(s,i.series.xaxis.tickFormatter(i.series.data[i.dataIndex][0],i.series.xaxis))),i.series.yaxis.tickFormatter!==void 0&&(t=t.replace(n,i.series.yaxis.tickFormatter(i.series.data[i.dataIndex][1],i.series.yaxis))),t},o.prototype.isTimeMode=function(t,i){return i.series[t].options.mode!==void 0&&"time"===i.series[t].options.mode},o.prototype.isXDateFormat=function(){return this.tooltipOptions.xDateFormat!==void 0&&null!==this.tooltipOptions.xDateFormat},o.prototype.isYDateFormat=function(){return this.tooltipOptions.yDateFormat!==void 0&&null!==this.tooltipOptions.yDateFormat},o.prototype.timestampToDate=function(i,o){var e=new Date(i);return t.plot.formatDate(e,o)},o.prototype.adjustValPrecision=function(t,i,o){var e,s=i.match(t);return null!==s&&""!==RegExp.$1&&(e=RegExp.$1,o=o.toFixed(e),i=i.replace(t,o)),i};var e=function(t){new o(t)};t.plot.plugins.push({init:e,options:i,name:"tooltip",version:"0.6.1"})})(jQuery);
/*
Flot plugin for automatically redrawing plots when the placeholder
size changes, e.g. on window resizes.

It works by listening for changes on the placeholder div (through the
jQuery resize event plugin) - if the size changes, it will redraw the
plot.

There are no options. If you need to disable the plugin for some
plots, you can just fix the size of their placeholders.
*/


/* Inline dependency: 
 * jQuery resize event - v1.1 - 3/14/2010
 * http://benalman.com/projects/jquery-resize-plugin/
 * 
 * Copyright (c) 2010 "Cowboy" Ben Alman
 * Dual licensed under the MIT and GPL licenses.
 * http://benalman.com/about/license/
 */
(function($,h,c){var a=$([]),e=$.resize=$.extend($.resize,{}),i,k="setTimeout",j="resize",d=j+"-special-event",b="delay",f="throttleWindow";e[b]=250;e[f]=true;$.event.special[j]={setup:function(){if(!e[f]&&this[k]){return false}var l=$(this);a=a.add(l);$.data(this,d,{w:l.width(),h:l.height()});if(a.length===1){g()}},teardown:function(){if(!e[f]&&this[k]){return false}var l=$(this);a=a.not(l);l.removeData(d);if(!a.length){clearTimeout(i)}},add:function(l){if(!e[f]&&this[k]){return false}var n;function m(s,o,p){var q=$(this),r=$.data(this,d);r.w=o!==c?o:q.width();r.h=p!==c?p:q.height();n.apply(this,arguments)}if($.isFunction(l)){n=l;return m}else{n=l.handler;l.handler=m}}};function g(){i=h[k](function(){a.each(function(){var n=$(this),m=n.width(),l=n.height(),o=$.data(this,d);if(m!==o.w||l!==o.h){n.trigger(j,[o.w=m,o.h=l])}});g()},e[b])}})(jQuery,this);


(function ($) {
    var options = { }; // no options

    function init(plot) {
        function onResize() {
            var placeholder = plot.getPlaceholder();

            // somebody might have hidden us and we can't plot
            // when we don't have the dimensions
            if (placeholder.width() == 0 || placeholder.height() == 0)
                return;

            plot.resize();
            plot.setupGrid();
            plot.draw();
        }
        
        function bindEvents(plot, eventHolder) {
            plot.getPlaceholder().resize(onResize);
        }

        function shutdown(plot, eventHolder) {
            plot.getPlaceholder().unbind("resize", onResize);
        }
        
        plot.hooks.bindEvents.push(bindEvents);
        plot.hooks.shutdown.push(shutdown);
    }
    
    $.plot.plugins.push({
        init: init,
        options: options,
        name: 'resize',
        version: '1.0'
    });
})(jQuery);

/*
 * Flot plugin to order bars side by side.
 * 
 * Released under the MIT license by Benjamin BUFFET, 20-Sep-2010.
 *
 * This plugin is an alpha version.
 *
 * To activate the plugin you must specify the parameter "order" for the specific serie :
 *
 *  $.plot($("#placeholder"), [{ data: [ ... ], bars :{ order = null or integer }])
 *
 * If 2 series have the same order param, they are ordered by the position in the array;
 *
 * The plugin adjust the point by adding a value depanding of the barwidth
 * Exemple for 3 series (barwidth : 0.1) :
 *
 *          first bar décalage : -0.15
 *          second bar décalage : -0.05
 *          third bar décalage : 0.05
 *
 */

(function($){
    function init(plot){
        var orderedBarSeries;
        var nbOfBarsToOrder;
        var borderWidth;
        var borderWidthInXabsWidth;
        var pixelInXWidthEquivalent = 1;
        var isHorizontal = false;

        /*
         * This method add shift to x values
         */
        function reOrderBars(plot, serie, datapoints){
            var shiftedPoints = null;
            
            if(serieNeedToBeReordered(serie)){                
                checkIfGraphIsHorizontal(serie);
                calculPixel2XWidthConvert(plot);
                retrieveBarSeries(plot);
                calculBorderAndBarWidth(serie);
                
                if(nbOfBarsToOrder >= 2){  
                    var position = findPosition(serie);
                    var decallage = 0;
                    
                    var centerBarShift = calculCenterBarShift();

                    if (isBarAtLeftOfCenter(position)){
                        decallage = -1*(sumWidth(orderedBarSeries,position-1,Math.floor(nbOfBarsToOrder / 2)-1)) - centerBarShift;
                    }else{
                        decallage = sumWidth(orderedBarSeries,Math.ceil(nbOfBarsToOrder / 2),position-2) + centerBarShift + borderWidthInXabsWidth*2;
                    }

                    shiftedPoints = shiftPoints(datapoints,serie,decallage);
                    datapoints.points = shiftedPoints;
               }
           }
           return shiftedPoints;
        }

        function serieNeedToBeReordered(serie){
            return serie.bars != null
                && serie.bars.show
                && serie.bars.order != null;
        }

        function calculPixel2XWidthConvert(plot){
            var gridDimSize = isHorizontal ? plot.getPlaceholder().innerHeight() : plot.getPlaceholder().innerWidth();
            var minMaxValues = isHorizontal ? getAxeMinMaxValues(plot.getData(),1) : getAxeMinMaxValues(plot.getData(),0);
            var AxeSize = minMaxValues[1] - minMaxValues[0];
            pixelInXWidthEquivalent = AxeSize / gridDimSize;
        }

        function getAxeMinMaxValues(series,AxeIdx){
            var minMaxValues = new Array();
            for(var i = 0; i < series.length; i++){
                minMaxValues[0] = series[i].data[0][AxeIdx];
                minMaxValues[1] = series[i].data[series[i].data.length - 1][AxeIdx];
            }
            return minMaxValues;
        }

        function retrieveBarSeries(plot){
            orderedBarSeries = findOthersBarsToReOrders(plot.getData());
            nbOfBarsToOrder = orderedBarSeries.length;
        }

        function findOthersBarsToReOrders(series){
            var retSeries = new Array();

            for(var i = 0; i < series.length; i++){
                if(series[i].bars.order != null && series[i].bars.show){
                    retSeries.push(series[i]);
                }
            }

            return retSeries.sort(sortByOrder);
        }

        function sortByOrder(serie1,serie2){
            var x = serie1.bars.order;
            var y = serie2.bars.order;
            return ((x < y) ? -1 : ((x > y) ? 1 : 0));
        }

        function  calculBorderAndBarWidth(serie){
            borderWidth = serie.bars.lineWidth ? serie.bars.lineWidth  : 2;
            borderWidthInXabsWidth = borderWidth * pixelInXWidthEquivalent;
        }
        
        function checkIfGraphIsHorizontal(serie){
            if(serie.bars.horizontal){
                isHorizontal = true;
            }
        }

        function findPosition(serie){
            var pos = 0
            for (var i = 0; i < orderedBarSeries.length; ++i) {
                if (serie == orderedBarSeries[i]){
                    pos = i;
                    break;
                }
            }

            return pos+1;
        }

        function calculCenterBarShift(){
            var width = 0;

            if(nbOfBarsToOrder%2 != 0)
                width = (orderedBarSeries[Math.ceil(nbOfBarsToOrder / 2)].bars.barWidth)/2;

            return width;
        }

        function isBarAtLeftOfCenter(position){
            return position <= Math.ceil(nbOfBarsToOrder / 2);
        }

        function sumWidth(series,start,end){
            var totalWidth = 0;

            for(var i = start; i <= end; i++){
                totalWidth += series[i].bars.barWidth+borderWidthInXabsWidth*2;
            }

            return totalWidth;
        }

        function shiftPoints(datapoints,serie,dx){
            var ps = datapoints.pointsize;
            var points = datapoints.points;
            var j = 0;           
            for(var i = isHorizontal ? 1 : 0;i < points.length; i += ps){
                points[i] += dx;
                //Adding the new x value in the serie to be abble to display the right tooltip value,
                //using the index 3 to not overide the third index.
                serie.data[j][3] = points[i];
                j++;
            }

            return points;
        }

        plot.hooks.processDatapoints.push(reOrderBars);

    }

    var options = {
        series : {
            bars: {order: null} // or number/string
        }
    };

    $.plot.plugins.push({
        init: init,
        options: options,
        name: "orderBars",
        version: "0.2"
    });

})(jQuery)


/* Flot plugin for rendering pie charts.

Copyright (c) 2007-2013 IOLA and Ole Laursen.
Licensed under the MIT license.

The plugin assumes that each series has a single data value, and that each
value is a positive integer or zero.  Negative numbers don't make sense for a
pie chart, and have unpredictable results.  The values do NOT need to be
passed in as percentages; the plugin will calculate the total and per-slice
percentages internally.

* Created by Brian Medendorp

* Updated with contributions from btburnett3, Anthony Aragues and Xavi Ivars

The plugin supports these options:

	series: {
		pie: {
			show: true/false
			radius: 0-1 for percentage of fullsize, or a specified pixel length, or 'auto'
			innerRadius: 0-1 for percentage of fullsize or a specified pixel length, for creating a donut effect
			startAngle: 0-2 factor of PI used for starting angle (in radians) i.e 3/2 starts at the top, 0 and 2 have the same result
			tilt: 0-1 for percentage to tilt the pie, where 1 is no tilt, and 0 is completely flat (nothing will show)
			offset: {
				top: integer value to move the pie up or down
				left: integer value to move the pie left or right, or 'auto'
			},
			stroke: {
				color: any hexidecimal color value (other formats may or may not work, so best to stick with something like '#FFF')
				width: integer pixel width of the stroke
			},
			label: {
				show: true/false, or 'auto'
				formatter:  a user-defined function that modifies the text/style of the label text
				radius: 0-1 for percentage of fullsize, or a specified pixel length
				background: {
					color: any hexidecimal color value (other formats may or may not work, so best to stick with something like '#000')
					opacity: 0-1
				},
				threshold: 0-1 for the percentage value at which to hide labels (if they're too small)
			},
			combine: {
				threshold: 0-1 for the percentage value at which to combine slices (if they're too small)
				color: any hexidecimal color value (other formats may or may not work, so best to stick with something like '#CCC'), if null, the plugin will automatically use the color of the first slice to be combined
				label: any text value of what the combined slice should be labeled
			}
			highlight: {
				opacity: 0-1
			}
		}
	}

More detail and specific examples can be found in the included HTML file.

*/(function(e){function r(r){function p(t,n,r){l||(l=!0,s=t.getCanvas(),o=e(s).parent(),i=t.getOptions(),t.setData(d(t.getData())))}function d(t){var n=0,r=0,s=0,o=i.series.pie.combine.color,u=[];for(var a=0;a<t.length;++a){var f=t[a].data;e.isArray(f)&&f.length==1&&(f=f[0]),e.isArray(f)?!isNaN(parseFloat(f[1]))&&isFinite(f[1])?f[1]=+f[1]:f[1]=0:!isNaN(parseFloat(f))&&isFinite(f)?f=[1,+f]:f=[1,0],t[a].data=[f]}for(var a=0;a<t.length;++a)n+=t[a].data[0][1];for(var a=0;a<t.length;++a){var f=t[a].data[0][1];f/n<=i.series.pie.combine.threshold&&(r+=f,s++,o||(o=t[a].color))}for(var a=0;a<t.length;++a){var f=t[a].data[0][1];(s<2||f/n>i.series.pie.combine.threshold)&&u.push({data:[[1,f]],color:t[a].color,label:t[a].label,angle:f*Math.PI*2/n,percent:f/(n/100)})}return s>1&&u.push({data:[[1,r]],color:o,label:i.series.pie.combine.label,angle:r*Math.PI*2/n,percent:r/(n/100)}),u}function v(r,s){function y(){c.clearRect(0,0,h,p),o.children().filter(".pieLabel, .pieLabelBackground").remove()}function b(){var e=i.series.pie.shadow.left,t=i.series.pie.shadow.top,n=10,r=i.series.pie.shadow.alpha,s=i.series.pie.radius>1?i.series.pie.radius:u*i.series.pie.radius;if(s>=h/2-e||s*i.series.pie.tilt>=p/2-t||s<=n)return;c.save(),c.translate(e,t),c.globalAlpha=r,c.fillStyle="#000",c.translate(a,f),c.scale(1,i.series.pie.tilt);for(var o=1;o<=n;o++)c.beginPath(),c.arc(0,0,s,0,Math.PI*2,!1),c.fill(),s-=o;c.restore()}function w(){function l(e,t,i){if(e<=0||isNaN(e))return;i?c.fillStyle=t:(c.strokeStyle=t,c.lineJoin="round"),c.beginPath(),Math.abs(e-Math.PI*2)>1e-9&&c.moveTo(0,0),c.arc(0,0,n,r,r+e/2,!1),c.arc(0,0,n,r+e/2,r+e,!1),c.closePath(),r+=e,i?c.fill():c.stroke()}function d(){function l(t,n,s){if(t.data[0][1]==0)return!0;var u=i.legend.labelFormatter,l,c=i.series.pie.label.formatter;u?l=u(t.label,t):l=t.label,c&&(l=c(l,t));var d=(n+t.angle+n)/2,v=a+Math.round(Math.cos(d)*r),m=f+Math.round(Math.sin(d)*r)*i.series.pie.tilt,g="<span class='pieLabel' id='pieLabel"+s+"' style='position:absolute;top:"+m+"px;left:"+v+"px;'>"+l+"</span>";o.append(g);var y=o.children("#pieLabel"+s),b=m-y.height()/2,w=v-y.width()/2;y.css("top",b),y.css("left",w);if(0-b>0||0-w>0||p-(b+y.height())<0||h-(w+y.width())<0)return!1;if(i.series.pie.label.background.opacity!=0){var E=i.series.pie.label.background.color;E==null&&(E=t.color);var S="top:"+b+"px;left:"+w+"px;";e("<div class='pieLabelBackground' style='position:absolute;width:"+y.width()+"px;height:"+y.height()+"px;"+S+"background-color:"+E+";'></div>").css("opacity",i.series.pie.label.background.opacity).insertBefore(y)}return!0}var n=t,r=i.series.pie.label.radius>1?i.series.pie.label.radius:u*i.series.pie.label.radius;for(var s=0;s<v.length;++s){if(v[s].percent>=i.series.pie.label.threshold*100&&!l(v[s],n,s))return!1;n+=v[s].angle}return!0}var t=Math.PI*i.series.pie.startAngle,n=i.series.pie.radius>1?i.series.pie.radius:u*i.series.pie.radius;c.save(),c.translate(a,f),c.scale(1,i.series.pie.tilt),c.save();var r=t;for(var s=0;s<v.length;++s)v[s].startAngle=r,l(v[s].angle,v[s].color,!0);c.restore();if(i.series.pie.stroke.width>0){c.save(),c.lineWidth=i.series.pie.stroke.width,r=t;for(var s=0;s<v.length;++s)l(v[s].angle,i.series.pie.stroke.color,!1);c.restore()}return m(c),c.restore(),i.series.pie.label.show?d():!0}if(!o)return;var h=r.getPlaceholder().width(),p=r.getPlaceholder().height(),d=o.children().filter(".legend").children().width()||0;c=s,l=!1,u=Math.min(h,p/i.series.pie.tilt)/2,f=p/2+i.series.pie.offset.top,a=h/2,i.series.pie.offset.left=="auto"?i.legend.position.match("w")?a+=d/2:a-=d/2:a+=i.series.pie.offset.left,a<u?a=u:a>h-u&&(a=h-u);var v=r.getData(),g=0;do g>0&&(u*=n),g+=1,y(),i.series.pie.tilt<=.8&&b();while(!w()&&g<t);g>=t&&(y(),o.prepend("<div class='error'>Could not draw pie with labels contained inside canvas</div>")),r.setSeries&&r.insertLegend&&(r.setSeries(v),r.insertLegend())}function m(e){if(i.series.pie.innerRadius>0){e.save();var t=i.series.pie.innerRadius>1?i.series.pie.innerRadius:u*i.series.pie.innerRadius;e.globalCompositeOperation="destination-out",e.beginPath(),e.fillStyle=i.series.pie.stroke.color,e.arc(0,0,t,0,Math.PI*2,!1),e.fill(),e.closePath(),e.restore(),e.save(),e.beginPath(),e.strokeStyle=i.series.pie.stroke.color,e.arc(0,0,t,0,Math.PI*2,!1),e.stroke(),e.closePath(),e.restore()}}function g(e,t){for(var n=!1,r=-1,i=e.length,s=i-1;++r<i;s=r)(e[r][1]<=t[1]&&t[1]<e[s][1]||e[s][1]<=t[1]&&t[1]<e[r][1])&&t[0]<(e[s][0]-e[r][0])*(t[1]-e[r][1])/(e[s][1]-e[r][1])+e[r][0]&&(n=!n);return n}function y(e,t){var n=r.getData(),i=r.getOptions(),s=i.series.pie.radius>1?i.series.pie.radius:u*i.series.pie.radius,o,l;for(var h=0;h<n.length;++h){var p=n[h];if(p.pie.show){c.save(),c.beginPath(),c.moveTo(0,0),c.arc(0,0,s,p.startAngle,p.startAngle+p.angle/2,!1),c.arc(0,0,s,p.startAngle+p.angle/2,p.startAngle+p.angle,!1),c.closePath(),o=e-a,l=t-f;if(c.isPointInPath){if(c.isPointInPath(e-a,t-f))return c.restore(),{datapoint:[p.percent,p.data],dataIndex:0,series:p,seriesIndex:h}}else{var d=s*Math.cos(p.startAngle),v=s*Math.sin(p.startAngle),m=s*Math.cos(p.startAngle+p.angle/4),y=s*Math.sin(p.startAngle+p.angle/4),b=s*Math.cos(p.startAngle+p.angle/2),w=s*Math.sin(p.startAngle+p.angle/2),E=s*Math.cos(p.startAngle+p.angle/1.5),S=s*Math.sin(p.startAngle+p.angle/1.5),x=s*Math.cos(p.startAngle+p.angle),T=s*Math.sin(p.startAngle+p.angle),N=[[0,0],[d,v],[m,y],[b,w],[E,S],[x,T]],C=[o,l];if(g(N,C))return c.restore(),{datapoint:[p.percent,p.data],dataIndex:0,series:p,seriesIndex:h}}c.restore()}}return null}function b(e){E("plothover",e)}function w(e){E("plotclick",e)}function E(e,t){var n=r.offset(),s=parseInt(t.pageX-n.left),u=parseInt(t.pageY-n.top),a=y(s,u);if(i.grid.autoHighlight)for(var f=0;f<h.length;++f){var l=h[f];l.auto==e&&(!a||l.series!=a.series)&&x(l.series)}a&&S(a.series,e);var c={pageX:t.pageX,pageY:t.pageY};o.trigger(e,[c,a])}function S(e,t){var n=T(e);n==-1?(h.push({series:e,auto:t}),r.triggerRedrawOverlay()):t||(h[n].auto=!1)}function x(e){e==null&&(h=[],r.triggerRedrawOverlay());var t=T(e);t!=-1&&(h.splice(t,1),r.triggerRedrawOverlay())}function T(e){for(var t=0;t<h.length;++t){var n=h[t];if(n.series==e)return t}return-1}function N(e,t){function s(e){if(e.angle<=0||isNaN(e.angle))return;t.fillStyle="rgba(255, 255, 255, "+n.series.pie.highlight.opacity+")",t.beginPath(),Math.abs(e.angle-Math.PI*2)>1e-9&&t.moveTo(0,0),t.arc(0,0,r,e.startAngle,e.startAngle+e.angle/2,!1),t.arc(0,0,r,e.startAngle+e.angle/2,e.startAngle+e.angle,!1),t.closePath(),t.fill()}var n=e.getOptions(),r=n.series.pie.radius>1?n.series.pie.radius:u*n.series.pie.radius;t.save(),t.translate(a,f),t.scale(1,n.series.pie.tilt);for(var i=0;i<h.length;++i)s(h[i].series);m(t),t.restore()}var s=null,o=null,u=null,a=null,f=null,l=!1,c=null,h=[];r.hooks.processOptions.push(function(e,t){t.series.pie.show&&(t.grid.show=!1,t.series.pie.label.show=="auto"&&(t.legend.show?t.series.pie.label.show=!1:t.series.pie.label.show=!0),t.series.pie.radius=="auto"&&(t.series.pie.label.show?t.series.pie.radius=.75:t.series.pie.radius=1),t.series.pie.tilt>1?t.series.pie.tilt=1:t.series.pie.tilt<0&&(t.series.pie.tilt=0))}),r.hooks.bindEvents.push(function(e,t){var n=e.getOptions();n.series.pie.show&&(n.grid.hoverable&&t.unbind("mousemove").mousemove(b),n.grid.clickable&&t.unbind("click").click(w))}),r.hooks.processDatapoints.push(function(e,t,n,r){var i=e.getOptions();i.series.pie.show&&p(e,t,n,r)}),r.hooks.drawOverlay.push(function(e,t){var n=e.getOptions();n.series.pie.show&&N(e,t)}),r.hooks.draw.push(function(e,t){var n=e.getOptions();n.series.pie.show&&v(e,t)})}var t=10,n=.95,i={series:{pie:{show:!1,radius:"auto",innerRadius:0,startAngle:1.5,tilt:1,shadow:{left:5,top:15,alpha:.02},offset:{top:0,left:"auto"},stroke:{color:"#fff",width:1},label:{show:"auto",formatter:function(e,t){return"<div style='font-size:x-small;text-align:center;padding:2px;color:"+t.color+";'>"+e+"<br/>"+Math.round(t.percent)+"%</div>"},radius:1,background:{color:null,opacity:0},threshold:0},combine:{threshold:-1,color:null,label:"Other"},highlight:{opacity:.5}}}};e.plot.plugins.push({init:r,options:i,name:"pie",version:"1.1"})})(jQuery);
/* Pretty handling of time axes.

Copyright (c) 2007-2013 IOLA and Ole Laursen.
Licensed under the MIT license.

Set axis.mode to "time" to enable. See the section "Time series data" in
API.txt for details.

*/

(function($) {

	var options = {
		xaxis: {
			timezone: null,		// "browser" for local to the client or timezone for timezone-js
			timeformat: null,	// format string to use
			twelveHourClock: false,	// 12 or 24 time in time mode
			monthNames: null	// list of names of months
		}
	};

	// round to nearby lower multiple of base

	function floorInBase(n, base) {
		return base * Math.floor(n / base);
	}

	// Returns a string with the date d formatted according to fmt.
	// A subset of the Open Group's strftime format is supported.

	function formatDate(d, fmt, monthNames, dayNames) {

		if (typeof d.strftime == "function") {
			return d.strftime(fmt);
		}

		var leftPad = function(n, pad) {
			n = "" + n;
			pad = "" + (pad == null ? "0" : pad);
			return n.length == 1 ? pad + n : n;
		};

		var r = [];
		var escape = false;
		var hours = d.getHours();
		var isAM = hours < 12;

		if (monthNames == null) {
			monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
		}

		if (dayNames == null) {
			dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
		}

		var hours12;

		if (hours > 12) {
			hours12 = hours - 12;
		} else if (hours == 0) {
			hours12 = 12;
		} else {
			hours12 = hours;
		}

		for (var i = 0; i < fmt.length; ++i) {

			var c = fmt.charAt(i);

			if (escape) {
				switch (c) {
					case 'a': c = "" + dayNames[d.getDay()]; break;
					case 'b': c = "" + monthNames[d.getMonth()]; break;
					case 'd': c = leftPad(d.getDate()); break;
					case 'e': c = leftPad(d.getDate(), " "); break;
					case 'h':	// For back-compat with 0.7; remove in 1.0
					case 'H': c = leftPad(hours); break;
					case 'I': c = leftPad(hours12); break;
					case 'l': c = leftPad(hours12, " "); break;
					case 'm': c = leftPad(d.getMonth() + 1); break;
					case 'M': c = leftPad(d.getMinutes()); break;
					// quarters not in Open Group's strftime specification
					case 'q':
						c = "" + (Math.floor(d.getMonth() / 3) + 1); break;
					case 'S': c = leftPad(d.getSeconds()); break;
					case 'y': c = leftPad(d.getFullYear() % 100); break;
					case 'Y': c = "" + d.getFullYear(); break;
					case 'p': c = (isAM) ? ("" + "am") : ("" + "pm"); break;
					case 'P': c = (isAM) ? ("" + "AM") : ("" + "PM"); break;
					case 'w': c = "" + d.getDay(); break;
				}
				r.push(c);
				escape = false;
			} else {
				if (c == "%") {
					escape = true;
				} else {
					r.push(c);
				}
			}
		}

		return r.join("");
	}

	// To have a consistent view of time-based data independent of which time
	// zone the client happens to be in we need a date-like object independent
	// of time zones.  This is done through a wrapper that only calls the UTC
	// versions of the accessor methods.

	function makeUtcWrapper(d) {

		function addProxyMethod(sourceObj, sourceMethod, targetObj, targetMethod) {
			sourceObj[sourceMethod] = function() {
				return targetObj[targetMethod].apply(targetObj, arguments);
			};
		};

		var utc = {
			date: d
		};

		// support strftime, if found

		if (d.strftime != undefined) {
			addProxyMethod(utc, "strftime", d, "strftime");
		}

		addProxyMethod(utc, "getTime", d, "getTime");
		addProxyMethod(utc, "setTime", d, "setTime");

		var props = ["Date", "Day", "FullYear", "Hours", "Milliseconds", "Minutes", "Month", "Seconds"];

		for (var p = 0; p < props.length; p++) {
			addProxyMethod(utc, "get" + props[p], d, "getUTC" + props[p]);
			addProxyMethod(utc, "set" + props[p], d, "setUTC" + props[p]);
		}

		return utc;
	};

	// select time zone strategy.  This returns a date-like object tied to the
	// desired timezone

	function dateGenerator(ts, opts) {
		if (opts.timezone == "browser") {
			return new Date(ts);
		} else if (!opts.timezone || opts.timezone == "utc") {
			return makeUtcWrapper(new Date(ts));
		} else if (typeof timezoneJS != "undefined" && typeof timezoneJS.Date != "undefined") {
			var d = new timezoneJS.Date();
			// timezone-js is fickle, so be sure to set the time zone before
			// setting the time.
			d.setTimezone(opts.timezone);
			d.setTime(ts);
			return d;
		} else {
			return makeUtcWrapper(new Date(ts));
		}
	}
	
	// map of app. size of time units in milliseconds

	var timeUnitSize = {
		"second": 1000,
		"minute": 60 * 1000,
		"hour": 60 * 60 * 1000,
		"day": 24 * 60 * 60 * 1000,
		"month": 30 * 24 * 60 * 60 * 1000,
		"quarter": 3 * 30 * 24 * 60 * 60 * 1000,
		"year": 365.2425 * 24 * 60 * 60 * 1000
	};

	// the allowed tick sizes, after 1 year we use
	// an integer algorithm

	var baseSpec = [
		[1, "second"], [2, "second"], [5, "second"], [10, "second"],
		[30, "second"], 
		[1, "minute"], [2, "minute"], [5, "minute"], [10, "minute"],
		[30, "minute"], 
		[1, "hour"], [2, "hour"], [4, "hour"],
		[8, "hour"], [12, "hour"],
		[1, "day"], [2, "day"], [3, "day"],
		[0.25, "month"], [0.5, "month"], [1, "month"],
		[2, "month"]
	];

	// we don't know which variant(s) we'll need yet, but generating both is
	// cheap

	var specMonths = baseSpec.concat([[3, "month"], [6, "month"],
		[1, "year"]]);
	var specQuarters = baseSpec.concat([[1, "quarter"], [2, "quarter"],
		[1, "year"]]);

	function init(plot) {
		plot.hooks.processOptions.push(function (plot, options) {
			$.each(plot.getAxes(), function(axisName, axis) {

				var opts = axis.options;

				if (opts.mode == "time") {
					axis.tickGenerator = function(axis) {

						var ticks = [];
						var d = dateGenerator(axis.min, opts);
						var minSize = 0;

						// make quarter use a possibility if quarters are
						// mentioned in either of these options

						var spec = (opts.tickSize && opts.tickSize[1] ===
							"quarter") ||
							(opts.minTickSize && opts.minTickSize[1] ===
							"quarter") ? specQuarters : specMonths;

						if (opts.minTickSize != null) {
							if (typeof opts.tickSize == "number") {
								minSize = opts.tickSize;
							} else {
								minSize = opts.minTickSize[0] * timeUnitSize[opts.minTickSize[1]];
							}
						}

						for (var i = 0; i < spec.length - 1; ++i) {
							if (axis.delta < (spec[i][0] * timeUnitSize[spec[i][1]]
											  + spec[i + 1][0] * timeUnitSize[spec[i + 1][1]]) / 2
								&& spec[i][0] * timeUnitSize[spec[i][1]] >= minSize) {
								break;
							}
						}

						var size = spec[i][0];
						var unit = spec[i][1];

						// special-case the possibility of several years

						if (unit == "year") {

							// if given a minTickSize in years, just use it,
							// ensuring that it's an integer

							if (opts.minTickSize != null && opts.minTickSize[1] == "year") {
								size = Math.floor(opts.minTickSize[0]);
							} else {

								var magn = Math.pow(10, Math.floor(Math.log(axis.delta / timeUnitSize.year) / Math.LN10));
								var norm = (axis.delta / timeUnitSize.year) / magn;

								if (norm < 1.5) {
									size = 1;
								} else if (norm < 3) {
									size = 2;
								} else if (norm < 7.5) {
									size = 5;
								} else {
									size = 10;
								}

								size *= magn;
							}

							// minimum size for years is 1

							if (size < 1) {
								size = 1;
							}
						}

						axis.tickSize = opts.tickSize || [size, unit];
						var tickSize = axis.tickSize[0];
						unit = axis.tickSize[1];

						var step = tickSize * timeUnitSize[unit];

						if (unit == "second") {
							d.setSeconds(floorInBase(d.getSeconds(), tickSize));
						} else if (unit == "minute") {
							d.setMinutes(floorInBase(d.getMinutes(), tickSize));
						} else if (unit == "hour") {
							d.setHours(floorInBase(d.getHours(), tickSize));
						} else if (unit == "month") {
							d.setMonth(floorInBase(d.getMonth(), tickSize));
						} else if (unit == "quarter") {
							d.setMonth(3 * floorInBase(d.getMonth() / 3,
								tickSize));
						} else if (unit == "year") {
							d.setFullYear(floorInBase(d.getFullYear(), tickSize));
						}

						// reset smaller components

						d.setMilliseconds(0);

						if (step >= timeUnitSize.minute) {
							d.setSeconds(0);
						}
						if (step >= timeUnitSize.hour) {
							d.setMinutes(0);
						}
						if (step >= timeUnitSize.day) {
							d.setHours(0);
						}
						if (step >= timeUnitSize.day * 4) {
							d.setDate(1);
						}
						if (step >= timeUnitSize.month * 2) {
							d.setMonth(floorInBase(d.getMonth(), 3));
						}
						if (step >= timeUnitSize.quarter * 2) {
							d.setMonth(floorInBase(d.getMonth(), 6));
						}
						if (step >= timeUnitSize.year) {
							d.setMonth(0);
						}

						var carry = 0;
						var v = Number.NaN;
						var prev;

						do {

							prev = v;
							v = d.getTime();
							ticks.push(v);

							if (unit == "month" || unit == "quarter") {
								if (tickSize < 1) {

									// a bit complicated - we'll divide the
									// month/quarter up but we need to take
									// care of fractions so we don't end up in
									// the middle of a day

									d.setDate(1);
									var start = d.getTime();
									d.setMonth(d.getMonth() +
										(unit == "quarter" ? 3 : 1));
									var end = d.getTime();
									d.setTime(v + carry * timeUnitSize.hour + (end - start) * tickSize);
									carry = d.getHours();
									d.setHours(0);
								} else {
									d.setMonth(d.getMonth() +
										tickSize * (unit == "quarter" ? 3 : 1));
								}
							} else if (unit == "year") {
								d.setFullYear(d.getFullYear() + tickSize);
							} else {
								d.setTime(v + step);
							}
						} while (v < axis.max && v != prev);

						return ticks;
					};

					axis.tickFormatter = function (v, axis) {

						var d = dateGenerator(v, axis.options);

						// first check global format

						if (opts.timeformat != null) {
							return formatDate(d, opts.timeformat, opts.monthNames, opts.dayNames);
						}

						// possibly use quarters if quarters are mentioned in
						// any of these places

						var useQuarters = (axis.options.tickSize &&
								axis.options.tickSize[1] == "quarter") ||
							(axis.options.minTickSize &&
								axis.options.minTickSize[1] == "quarter");

						var t = axis.tickSize[0] * timeUnitSize[axis.tickSize[1]];
						var span = axis.max - axis.min;
						var suffix = (opts.twelveHourClock) ? " %p" : "";
						var hourCode = (opts.twelveHourClock) ? "%I" : "%H";
						var fmt;

						if (t < timeUnitSize.minute) {
							fmt = hourCode + ":%M:%S" + suffix;
						} else if (t < timeUnitSize.day) {
							if (span < 2 * timeUnitSize.day) {
								fmt = hourCode + ":%M" + suffix;
							} else {
								fmt = "%b %d " + hourCode + ":%M" + suffix;
							}
						} else if (t < timeUnitSize.month) {
							fmt = "%b %d";
						} else if ((useQuarters && t < timeUnitSize.quarter) ||
							(!useQuarters && t < timeUnitSize.year)) {
							if (span < timeUnitSize.year) {
								fmt = "%b";
							} else {
								fmt = "%b %Y";
							}
						} else if (useQuarters && t < timeUnitSize.year) {
							if (span < timeUnitSize.year) {
								fmt = "Q%q";
							} else {
								fmt = "Q%q %Y";
							}
						} else {
							fmt = "%Y";
						}

						var rt = formatDate(d, fmt, opts.monthNames, opts.dayNames);

						return rt;
					};
				}
			});
		});
	}

	$.plot.plugins.push({
		init: init,
		options: options,
		name: 'time',
		version: '1.0'
	});

	// Time-axis support used to be in Flot core, which exposed the
	// formatDate function on the plot object.  Various plugins depend
	// on the function, so we need to re-expose it here.

	$.plot.formatDate = formatDate;
	$.plot.dateGenerator = dateGenerator;

})(jQuery);
// ┌─────────────────────────────────────────────────────────────────────┐ \\
// │ Raphaël 2.0.1 - JavaScript Vector Library                           │ \\
// ├─────────────────────────────────────────────────────────────────────┤ \\
// │ Copyright (c) 2008-2011 Dmitry Baranovskiy (http://raphaeljs.com)   │ \\
// │ Copyright (c) 2008-2011 Sencha Labs (http://sencha.com)             │ \\
// │ Licensed under the MIT (http://raphaeljs.com/license.html) license. │ \\
// └─────────────────────────────────────────────────────────────────────┘ \\
(function(a){var b="0.4.0",c="hasOwnProperty",d=/[\.\/]/,e="*",f=function(){},g=function(a,b){return a-b},h,i,j={n:{}},k=function(a,b){var c=j,d=i,e=Array.prototype.slice.call(arguments,2),f=k.listeners(a),l=0,m=!1,n,o=[],p={},q=[],r=[];h=a,i=0;for(var s=0,t=f.length;s<t;s++)"zIndex"in f[s]&&(o.push(f[s].zIndex),f[s].zIndex<0&&(p[f[s].zIndex]=f[s]));o.sort(g);while(o[l]<0){n=p[o[l++]],q.push(n.apply(b,e));if(i){i=d;return q}}for(s=0;s<t;s++){n=f[s];if("zIndex"in n)if(n.zIndex==o[l]){q.push(n.apply(b,e));if(i){i=d;return q}do{l++,n=p[o[l]],n&&q.push(n.apply(b,e));if(i){i=d;return q}}while(n)}else p[n.zIndex]=n;else{q.push(n.apply(b,e));if(i){i=d;return q}}}i=d;return q.length?q:null};k.listeners=function(a){var b=a.split(d),c=j,f,g,h,i,k,l,m,n,o=[c],p=[];for(i=0,k=b.length;i<k;i++){n=[];for(l=0,m=o.length;l<m;l++){c=o[l].n,g=[c[b[i]],c[e]],h=2;while(h--)f=g[h],f&&(n.push(f),p=p.concat(f.f||[]))}o=n}return p},k.on=function(a,b){var c=a.split(d),e=j;for(var g=0,h=c.length;g<h;g++)e=e.n,!e[c[g]]&&(e[c[g]]={n:{}}),e=e[c[g]];e.f=e.f||[];for(g=0,h=e.f.length;g<h;g++)if(e.f[g]==b)return f;e.f.push(b);return function(a){+a==+a&&(b.zIndex=+a)}},k.stop=function(){i=1},k.nt=function(a){if(a)return(new RegExp("(?:\\.|\\/|^)"+a+"(?:\\.|\\/|$)")).test(h);return h},k.unbind=function(a,b){var f=a.split(d),g,h,i,k,l,m,n,o=[j];for(k=0,l=f.length;k<l;k++)for(m=0;m<o.length;m+=i.length-2){i=[m,1],g=o[m].n;if(f[k]!=e)g[f[k]]&&i.push(g[f[k]]);else for(h in g)g[c](h)&&i.push(g[h]);o.splice.apply(o,i)}for(k=0,l=o.length;k<l;k++){g=o[k];while(g.n){if(b){if(g.f){for(m=0,n=g.f.length;m<n;m++)if(g.f[m]==b){g.f.splice(m,1);break}!g.f.length&&delete g.f}for(h in g.n)if(g.n[c](h)&&g.n[h].f){var p=g.n[h].f;for(m=0,n=p.length;m<n;m++)if(p[m]==b){p.splice(m,1);break}!p.length&&delete g.n[h].f}}else{delete g.f;for(h in g.n)g.n[c](h)&&g.n[h].f&&delete g.n[h].f}g=g.n}}},k.once=function(a,b){var c=function(){b.apply(this,arguments),k.unbind(a,c)};return k.on(a,c)},k.version=b,k.toString=function(){return"You are running Eve "+b},typeof module!="undefined"&&module.exports?module.exports=k:a.eve=k})(this),function(){function cr(b,d,e,f,h,i){e=Q(e);var j,k,l,m=[],o,p,q,t=b.ms,u={},v={},w={};if(f)for(y=0,z=cl.length;y<z;y++){var x=cl[y];if(x.el.id==d.id&&x.anim==b){x.percent!=e?(cl.splice(y,1),l=1):k=x,d.attr(x.totalOrigin);break}}else f=+v;for(var y=0,z=b.percents.length;y<z;y++){if(b.percents[y]==e||b.percents[y]>f*b.top){e=b.percents[y],p=b.percents[y-1]||0,t=t/b.top*(e-p),o=b.percents[y+1],j=b.anim[e];break}f&&d.attr(b.anim[b.percents[y]])}if(!!j){if(!k){for(var A in j)if(j[g](A))if(U[g](A)||d.paper.customAttributes[g](A)){u[A]=d.attr(A),u[A]==null&&(u[A]=T[A]),v[A]=j[A];switch(U[A]){case C:w[A]=(v[A]-u[A])/t;break;case"colour":u[A]=a.getRGB(u[A]);var B=a.getRGB(v[A]);w[A]={r:(B.r-u[A].r)/t,g:(B.g-u[A].g)/t,b:(B.b-u[A].b)/t};break;case"path":var D=bG(u[A],v[A]),E=D[1];u[A]=D[0],w[A]=[];for(y=0,z=u[A].length;y<z;y++){w[A][y]=[0];for(var F=1,G=u[A][y].length;F<G;F++)w[A][y][F]=(E[y][F]-u[A][y][F])/t}break;case"transform":var H=d._,I=bP(H[A],v[A]);if(I){u[A]=I.from,v[A]=I.to,w[A]=[],w[A].real=!0;for(y=0,z=u[A].length;y<z;y++){w[A][y]=[u[A][y][0]];for(F=1,G=u[A][y].length;F<G;F++)w[A][y][F]=(v[A][y][F]-u[A][y][F])/t}}else{var J=d.matrix||new bQ,K={_:{transform:H.transform},getBBox:function(){return d.getBBox(1)}};u[A]=[J.a,J.b,J.c,J.d,J.e,J.f],bN(K,v[A]),v[A]=K._.transform,w[A]=[(K.matrix.a-J.a)/t,(K.matrix.b-J.b)/t,(K.matrix.c-J.c)/t,(K.matrix.d-J.d)/t,(K.matrix.e-J.e)/t,(K.matrix.e-J.f)/t]}break;case"csv":var L=r(j[A])[s](c),M=r(u[A])[s](c);if(A=="clip-rect"){u[A]=M,w[A]=[],y=M.length;while(y--)w[A][y]=(L[y]-u[A][y])/t}v[A]=L;break;default:L=[][n](j[A]),M=[][n](u[A]),w[A]=[],y=d.paper.customAttributes[A].length;while(y--)w[A][y]=((L[y]||0)-(M[y]||0))/t}}var O=j.easing,P=a.easing_formulas[O];if(!P){P=r(O).match(N);if(P&&P.length==5){var R=P;P=function(a){return cp(a,+R[1],+R[2],+R[3],+R[4],t)}}else P=be}q=j.start||b.start||+(new Date),x={anim:b,percent:e,timestamp:q,start:q+(b.del||0),status:0,initstatus:f||0,stop:!1,ms:t,easing:P,from:u,diff:w,to:v,el:d,callback:j.callback,prev:p,next:o,repeat:i||b.times,origin:d.attr(),totalOrigin:h},cl.push(x);if(f&&!k&&!l){x.stop=!0,x.start=new Date-t*f;if(cl.length==1)return cn()}l&&(x.start=new Date-x.ms*f),cl.length==1&&cm(cn)}else k.initstatus=f,k.start=new Date-k.ms*f;eve("anim.start."+d.id,d,b)}}function cq(a,b){var c=[],d={};this.ms=b,this.times=1;if(a){for(var e in a)a[g](e)&&(d[Q(e)]=a[e],c.push(Q(e)));c.sort(bc)}this.anim=d,this.top=c[c.length-1],this.percents=c}function cp(a,b,c,d,e,f){function o(a,b){var c,d,e,f,j,k;for(e=a,k=0;k<8;k++){f=m(e)-a;if(z(f)<b)return e;j=(3*i*e+2*h)*e+g;if(z(j)<1e-6)break;e=e-f/j}c=0,d=1,e=a;if(e<c)return c;if(e>d)return d;while(c<d){f=m(e);if(z(f-a)<b)return e;a>f?c=e:d=e,e=(d-c)/2+c}return e}function n(a,b){var c=o(a,b);return((l*c+k)*c+j)*c}function m(a){return((i*a+h)*a+g)*a}var g=3*b,h=3*(d-b)-g,i=1-g-h,j=3*c,k=3*(e-c)-j,l=1-j-k;return n(a,1/(200*f))}function cd(){return this.x+q+this.y+q+this.width+" × "+this.height}function cc(){return this.x+q+this.y}function bQ(a,b,c,d,e,f){a!=null?(this.a=+a,this.b=+b,this.c=+c,this.d=+d,this.e=+e,this.f=+f):(this.a=1,this.b=0,this.c=0,this.d=1,this.e=0,this.f=0)}function bw(a){var b=[];for(var c=0,d=a.length;d-2>c;c+=2){var e=[{x:+a[c],y:+a[c+1]},{x:+a[c],y:+a[c+1]},{x:+a[c+2],y:+a[c+3]},{x:+a[c+4],y:+a[c+5]}];d-4==c?(e[0]={x:+a[c-2],y:+a[c-1]},e[3]=e[2]):c&&(e[0]={x:+a[c-2],y:+a[c-1]}),b.push(["C",(-e[0].x+6*e[1].x+e[2].x)/6,(-e[0].y+6*e[1].y+e[2].y)/6,(e[1].x+6*e[2].x-e[3].x)/6,(e[1].y+6*e[2].y-e[3].y)/6,e[2].x,e[2].y])}return b}function bv(){return this.hex}function bt(a,b,c){function d(){var e=Array.prototype.slice.call(arguments,0),f=e.join("␀"),h=d.cache=d.cache||{},i=d.count=d.count||[];if(h[g](f)){bs(i,f);return c?c(h[f]):h[f]}i.length>=1e3&&delete h[i.shift()],i.push(f),h[f]=a[m](b,e);return c?c(h[f]):h[f]}return d}function bs(a,b){for(var c=0,d=a.length;c<d;c++)if(a[c]===b)return a.push(a.splice(c,1)[0])}function a(c){if(a.is(c,"function"))return b?c():eve.on("DOMload",c);if(a.is(c,E))return a._engine.create[m](a,c.splice(0,3+a.is(c[0],C))).add(c);var d=Array.prototype.slice.call(arguments,0);if(a.is(d[d.length-1],"function")){var e=d.pop();return b?e.call(a._engine.create[m](a,d)):eve.on("DOMload",function(){e.call(a._engine.create[m](a,d))})}return a._engine.create[m](a,arguments)}a.version="2.0.1",a.eve=eve;var b,c=/[, ]+/,d={circle:1,rect:1,path:1,ellipse:1,text:1,image:1},e=/\{(\d+)\}/g,f="prototype",g="hasOwnProperty",h={doc:document,win:window},i={was:Object.prototype[g].call(h.win,"Raphael"),is:h.win.Raphael},j=function(){this.ca=this.customAttributes={}},k,l="appendChild",m="apply",n="concat",o="createTouch"in h.doc,p="",q=" ",r=String,s="split",t="click dblclick mousedown mousemove mouseout mouseover mouseup touchstart touchmove touchend touchcancel"[s](q),u={mousedown:"touchstart",mousemove:"touchmove",mouseup:"touchend"},v=r.prototype.toLowerCase,w=Math,x=w.max,y=w.min,z=w.abs,A=w.pow,B=w.PI,C="number",D="string",E="array",F="toString",G="fill",H=Object.prototype.toString,I={},J="push",K=a._ISURL=/^url\(['"]?([^\)]+?)['"]?\)$/i,L=/^\s*((#[a-f\d]{6})|(#[a-f\d]{3})|rgba?\(\s*([\d\.]+%?\s*,\s*[\d\.]+%?\s*,\s*[\d\.]+%?(?:\s*,\s*[\d\.]+%?)?)\s*\)|hsba?\(\s*([\d\.]+(?:deg|\xb0|%)?\s*,\s*[\d\.]+%?\s*,\s*[\d\.]+(?:%?\s*,\s*[\d\.]+)?)%?\s*\)|hsla?\(\s*([\d\.]+(?:deg|\xb0|%)?\s*,\s*[\d\.]+%?\s*,\s*[\d\.]+(?:%?\s*,\s*[\d\.]+)?)%?\s*\))\s*$/i,M={NaN:1,Infinity:1,"-Infinity":1},N=/^(?:cubic-)?bezier\(([^,]+),([^,]+),([^,]+),([^\)]+)\)/,O=w.round,P="setAttribute",Q=parseFloat,R=parseInt,S=r.prototype.toUpperCase,T=a._availableAttrs={"arrow-end":"none","arrow-start":"none",blur:0,"clip-rect":"0 0 1e9 1e9",cursor:"default",cx:0,cy:0,fill:"#fff","fill-opacity":1,font:'10px "Arial"',"font-family":'"Arial"',"font-size":"10","font-style":"normal","font-weight":400,gradient:0,height:0,href:"http://raphaeljs.com/","letter-spacing":0,opacity:1,path:"M0,0",r:0,rx:0,ry:0,src:"",stroke:"#000","stroke-dasharray":"","stroke-linecap":"butt","stroke-linejoin":"butt","stroke-miterlimit":0,"stroke-opacity":1,"stroke-width":1,target:"_blank","text-anchor":"middle",title:"Raphael",transform:"",width:0,x:0,y:0},U=a._availableAnimAttrs={blur:C,"clip-rect":"csv",cx:C,cy:C,fill:"colour","fill-opacity":C,"font-size":C,height:C,opacity:C,path:"path",r:C,rx:C,ry:C,stroke:"colour","stroke-opacity":C,"stroke-width":C,transform:"transform",width:C,x:C,y:C},V=/\s*,\s*/,W={hs:1,rg:1},X=/,?([achlmqrstvxz]),?/gi,Y=/([achlmrqstvz])[\s,]*((-?\d*\.?\d*(?:e[\-+]?\d+)?\s*,?\s*)+)/ig,Z=/([rstm])[\s,]*((-?\d*\.?\d*(?:e[\-+]?\d+)?\s*,?\s*)+)/ig,$=/(-?\d*\.?\d*(?:e[\-+]?\d+)?)\s*,?\s*/ig,_=a._radial_gradient=/^r(?:\(([^,]+?)\s*,\s*([^\)]+?)\))?/,ba={},bb=function(a,b){return a.key-b.key},bc=function(a,b){return Q(a)-Q(b)},bd=function(){},be=function(a){return a},bf=a._rectPath=function(a,b,c,d,e){if(e)return[["M",a+e,b],["l",c-e*2,0],["a",e,e,0,0,1,e,e],["l",0,d-e*2],["a",e,e,0,0,1,-e,e],["l",e*2-c,0],["a",e,e,0,0,1,-e,-e],["l",0,e*2-d],["a",e,e,0,0,1,e,-e],["z"]];return[["M",a,b],["l",c,0],["l",0,d],["l",-c,0],["z"]]},bg=function(a,b,c,d){d==null&&(d=c);return[["M",a,b],["m",0,-d],["a",c,d,0,1,1,0,2*d],["a",c,d,0,1,1,0,-2*d],["z"]]},bh=a._getPath={path:function(a){return a.attr("path")},circle:function(a){var b=a.attrs;return bg(b.cx,b.cy,b.r)},ellipse:function(a){var b=a.attrs;return bg(b.cx,b.cy,b.rx,b.ry)},rect:function(a){var b=a.attrs;return bf(b.x,b.y,b.width,b.height,b.r)},image:function(a){var b=a.attrs;return bf(b.x,b.y,b.width,b.height)},text:function(a){var b=a._getBBox();return bf(b.x,b.y,b.width,b.height)}},bi=a.mapPath=function(a,b){if(!b)return a;var c,d,e,f,g,h,i;a=bG(a);for(e=0,g=a.length;e<g;e++){i=a[e];for(f=1,h=i.length;f<h;f+=2)c=b.x(i[f],i[f+1]),d=b.y(i[f],i[f+1]),i[f]=c,i[f+1]=d}return a};a._g=h,a.type=h.win.SVGAngle||h.doc.implementation.hasFeature("http://www.w3.org/TR/SVG11/feature#BasicStructure","1.1")?"SVG":"VML";if(a.type=="VML"){var bj=h.doc.createElement("div"),bk;bj.innerHTML='<v:shape adj="1"/>',bk=bj.firstChild,bk.style.behavior="url(#default#VML)";if(!bk||typeof bk.adj!="object")return a.type=p;bj=null}a.svg=!(a.vml=a.type=="VML"),a._Paper=j,a.fn=k=j.prototype=a.prototype,a._id=0,a._oid=0,a.is=function(a,b){b=v.call(b);if(b=="finite")return!M[g](+a);if(b=="array")return a instanceof Array;return b=="null"&&a===null||b==typeof a&&a!==null||b=="object"&&a===Object(a)||b=="array"&&Array.isArray&&Array.isArray(a)||H.call(a).slice(8,-1).toLowerCase()==b},a.angle=function(b,c,d,e,f,g){if(f==null){var h=b-d,i=c-e;if(!h&&!i)return 0;return(180+w.atan2(-i,-h)*180/B+360)%360}return a.angle(b,c,f,g)-a.angle(d,e,f,g)},a.rad=function(a){return a%360*B/180},a.deg=function(a){return a*180/B%360},a.snapTo=function(b,c,d){d=a.is(d,"finite")?d:10;if(a.is(b,E)){var e=b.length;while(e--)if(z(b[e]-c)<=d)return b[e]}else{b=+b;var f=c%b;if(f<d)return c-f;if(f>b-d)return c-f+b}return c};var bl=a.createUUID=function(a,b){return function(){return"xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(a,b).toUpperCase()}}(/[xy]/g,function(a){var b=w.random()*16|0,c=a=="x"?b:b&3|8;return c.toString(16)});a.setWindow=function(b){eve("setWindow",a,h.win,b),h.win=b,h.doc=h.win.document,a._engine.initWin&&a._engine.initWin(h.win)};var bm=function(b){if(a.vml){var c=/^\s+|\s+$/g,d;try{var e=new ActiveXObject("htmlfile");e.write("<body>"),e.close(),d=e.body}catch(f){d=createPopup().document.body}var g=d.createTextRange();bm=bt(function(a){try{d.style.color=r(a).replace(c,p);var b=g.queryCommandValue("ForeColor");b=(b&255)<<16|b&65280|(b&16711680)>>>16;return"#"+("000000"+b.toString(16)).slice(-6)}catch(e){return"none"}})}else{var i=h.doc.createElement("i");i.title="Raphaël Colour Picker",i.style.display="none",h.doc.body.appendChild(i),bm=bt(function(a){i.style.color=a;return h.doc.defaultView.getComputedStyle(i,p).getPropertyValue("color")})}return bm(b)},bn=function(){return"hsb("+[this.h,this.s,this.b]+")"},bo=function(){return"hsl("+[this.h,this.s,this.l]+")"},bp=function(){return this.hex},bq=function(b,c,d){c==null&&a.is(b,"object")&&"r"in b&&"g"in b&&"b"in b&&(d=b.b,c=b.g,b=b.r);if(c==null&&a.is(b,D)){var e=a.getRGB(b);b=e.r,c=e.g,d=e.b}if(b>1||c>1||d>1)b/=255,c/=255,d/=255;return[b,c,d]},br=function(b,c,d,e){b*=255,c*=255,d*=255;var f={r:b,g:c,b:d,hex:a.rgb(b,c,d),toString:bp};a.is(e,"finite")&&(f.opacity=e);return f};a.color=function(b){var c;a.is(b,"object")&&"h"in b&&"s"in b&&"b"in b?(c=a.hsb2rgb(b),b.r=c.r,b.g=c.g,b.b=c.b,b.hex=c.hex):a.is(b,"object")&&"h"in b&&"s"in b&&"l"in b?(c=a.hsl2rgb(b),b.r=c.r,b.g=c.g,b.b=c.b,b.hex=c.hex):(a.is(b,"string")&&(b=a.getRGB(b)),a.is(b,"object")&&"r"in b&&"g"in b&&"b"in b?(c=a.rgb2hsl(b),b.h=c.h,b.s=c.s,b.l=c.l,c=a.rgb2hsb(b),b.v=c.b):(b={hex:"none"},b.r=b.g=b.b=b.h=b.s=b.v=b.l=-1)),b.toString=bp;return b},a.hsb2rgb=function(a,b,c,d){this.is(a,"object")&&"h"in a&&"s"in a&&"b"in a&&(c=a.b,b=a.s,a=a.h,d=a.o),a*=360;var e,f,g,h,i;a=a%360/60,i=c*b,h=i*(1-z(a%2-1)),e=f=g=c-i,a=~~a,e+=[i,h,0,0,h,i][a],f+=[h,i,i,h,0,0][a],g+=[0,0,h,i,i,h][a];return br(e,f,g,d)},a.hsl2rgb=function(a,b,c,d){this.is(a,"object")&&"h"in a&&"s"in a&&"l"in a&&(c=a.l,b=a.s,a=a.h);if(a>1||b>1||c>1)a/=360,b/=100,c/=100;a*=360;var e,f,g,h,i;a=a%360/60,i=2*b*(c<.5?c:1-c),h=i*(1-z(a%2-1)),e=f=g=c-i/2,a=~~a,e+=[i,h,0,0,h,i][a],f+=[h,i,i,h,0,0][a],g+=[0,0,h,i,i,h][a];return br(e,f,g,d)},a.rgb2hsb=function(a,b,c){c=bq(a,b,c),a=c[0],b=c[1],c=c[2];var d,e,f,g;f=x(a,b,c),g=f-y(a,b,c),d=g==0?null:f==a?(b-c)/g:f==b?(c-a)/g+2:(a-b)/g+4,d=(d+360)%6*60/360,e=g==0?0:g/f;return{h:d,s:e,b:f,toString:bn}},a.rgb2hsl=function(a,b,c){c=bq(a,b,c),a=c[0],b=c[1],c=c[2];var d,e,f,g,h,i;g=x(a,b,c),h=y(a,b,c),i=g-h,d=i==0?null:g==a?(b-c)/i:g==b?(c-a)/i+2:(a-b)/i+4,d=(d+360)%6*60/360,f=(g+h)/2,e=i==0?0:f<.5?i/(2*f):i/(2-2*f);return{h:d,s:e,l:f,toString:bo}},a._path2string=function(){return this.join(",").replace(X,"$1")};var bu=a._preload=function(a,b){var c=h.doc.createElement("img");c.style.cssText="position:absolute;left:-9999em;top:-9999em",c.onload=function(){b.call(this),this.onload=null,h.doc.body.removeChild(this)},c.onerror=function(){h.doc.body.removeChild(this)},h.doc.body.appendChild(c),c.src=a};a.getRGB=bt(function(b){if(!b||!!((b=r(b)).indexOf("-")+1))return{r:-1,g:-1,b:-1,hex:"none",error:1,toString:bv};if(b=="none")return{r:-1,g:-1,b:-1,hex:"none",toString:bv};!W[g](b.toLowerCase().substring(0,2))&&b.charAt()!="#"&&(b=bm(b));var c,d,e,f,h,i,j,k=b.match(L);if(k){k[2]&&(f=R(k[2].substring(5),16),e=R(k[2].substring(3,5),16),d=R(k[2].substring(1,3),16)),k[3]&&(f=R((i=k[3].charAt(3))+i,16),e=R((i=k[3].charAt(2))+i,16),d=R((i=k[3].charAt(1))+i,16)),k[4]&&(j=k[4][s](V),d=Q(j[0]),j[0].slice(-1)=="%"&&(d*=2.55),e=Q(j[1]),j[1].slice(-1)=="%"&&(e*=2.55),f=Q(j[2]),j[2].slice(-1)=="%"&&(f*=2.55),k[1].toLowerCase().slice(0,4)=="rgba"&&(h=Q(j[3])),j[3]&&j[3].slice(-1)=="%"&&(h/=100));if(k[5]){j=k[5][s](V),d=Q(j[0]),j[0].slice(-1)=="%"&&(d*=2.55),e=Q(j[1]),j[1].slice(-1)=="%"&&(e*=2.55),f=Q(j[2]),j[2].slice(-1)=="%"&&(f*=2.55),(j[0].slice(-3)=="deg"||j[0].slice(-1)=="°")&&(d/=360),k[1].toLowerCase().slice(0,4)=="hsba"&&(h=Q(j[3])),j[3]&&j[3].slice(-1)=="%"&&(h/=100);return a.hsb2rgb(d,e,f,h)}if(k[6]){j=k[6][s](V),d=Q(j[0]),j[0].slice(-1)=="%"&&(d*=2.55),e=Q(j[1]),j[1].slice(-1)=="%"&&(e*=2.55),f=Q(j[2]),j[2].slice(-1)=="%"&&(f*=2.55),(j[0].slice(-3)=="deg"||j[0].slice(-1)=="°")&&(d/=360),k[1].toLowerCase().slice(0,4)=="hsla"&&(h=Q(j[3])),j[3]&&j[3].slice(-1)=="%"&&(h/=100);return a.hsl2rgb(d,e,f,h)}k={r:d,g:e,b:f,toString:bv},k.hex="#"+(16777216|f|e<<8|d<<16).toString(16).slice(1),a.is(h,"finite")&&(k.opacity=h);return k}return{r:-1,g:-1,b:-1,hex:"none",error:1,toString:bv}},a),a.hsb=bt(function(b,c,d){return a.hsb2rgb(b,c,d).hex}),a.hsl=bt(function(b,c,d){return a.hsl2rgb(b,c,d).hex}),a.rgb=bt(function(a,b,c){return"#"+(16777216|c|b<<8|a<<16).toString(16).slice(1)}),a.getColor=function(a){var b=this.getColor.start=this.getColor.start||{h:0,s:1,b:a||.75},c=this.hsb2rgb(b.h,b.s,b.b);b.h+=.075,b.h>1&&(b.h=0,b.s-=.2,b.s<=0&&(this.getColor.start={h:0,s:1,b:b.b}));return c.hex},a.getColor.reset=function(){delete this.start},a.parsePathString=bt(function(b){if(!b)return null;var c={a:7,c:6,h:1,l:2,m:2,r:4,q:4,s:4,t:2,v:1,z:0},d=[];a.is(b,E)&&a.is(b[0],E)&&(d=by(b)),d.length||r(b).replace(Y,function(a,b,e){var f=[],g=b.toLowerCase();e.replace($,function(a,b){b&&f.push(+b)}),g=="m"&&f.length>2&&(d.push([b][n](f.splice(0,2))),g="l",b=b=="m"?"l":"L");if(g=="r")d.push([b][n](f));else while(f.length>=c[g]){d.push([b][n](f.splice(0,c[g])));if(!c[g])break}}),d.toString=a._path2string;return d}),a.parseTransformString=bt(function(b){if(!b)return null;var c={r:3,s:4,t:2,m:6},d=[];a.is(b,E)&&a.is(b[0],E)&&(d=by(b)),d.length||r(b).replace(Z,function(a,b,c){var e=[],f=v.call(b);c.replace($,function(a,b){b&&e.push(+b)}),d.push([b][n](e))}),d.toString=a._path2string;return d}),a.findDotsAtSegment=function(a,b,c,d,e,f,g,h,i){var j=1-i,k=A(j,3),l=A(j,2),m=i*i,n=m*i,o=k*a+l*3*i*c+j*3*i*i*e+n*g,p=k*b+l*3*i*d+j*3*i*i*f+n*h,q=a+2*i*(c-a)+m*(e-2*c+a),r=b+2*i*(d-b)+m*(f-2*d+b),s=c+2*i*(e-c)+m*(g-2*e+c),t=d+2*i*(f-d)+m*(h-2*f+d),u=j*a+i*c,v=j*b+i*d,x=j*e+i*g,y=j*f+i*h,z=90-w.atan2(q-s,r-t)*180/B;(q>s||r<t)&&(z+=180);return{x:o,y:p,m:{x:q,y:r},n:{x:s,y:t},start:{x:u,y:v},end:{x:x,y:y},alpha:z}},a._removedFactory=function(a){return function(){throw new Error("Raphaël: you are calling to method “"+a+"” of removed object")}};var bx=bt(function(a){if(!a)return{x:0,y:0,width:0,height:0};a=bG(a);var b=0,c=0,d=[],e=[],f;for(var g=0,h=a.length;g<h;g++){f=a[g];if(f[0]=="M")b=f[1],c=f[2],d.push(b),e.push(c);else{var i=bF(b,c,f[1],f[2],f[3],f[4],f[5],f[6]);d=d[n](i.min.x,i.max.x),e=e[n](i.min.y,i.max.y),b=f[5],c=f[6]}}var j=y[m](0,d),k=y[m](0,e);return{x:j,y:k,width:x[m](0,d)-j,height:x[m](0,e)-k}},null,function(a){return{x:a.x,y:a.y,width:a.width,height:a.height}}),by=function(b){var c=[];if(!a.is(b,E)||!a.is(b&&b[0],E))b=a.parsePathString(b);for(var d=0,e=b.length;d<e;d++){c[d]=[];for(var f=0,g=b[d].length;f<g;f++)c[d][f]=b[d][f]}c.toString=a._path2string;return c},bz=a._pathToRelative=bt(function(b){if(!a.is(b,E)||!a.is(b&&b[0],E))b=a.parsePathString(b);var c=[],d=0,e=0,f=0,g=0,h=0;b[0][0]=="M"&&(d=b[0][1],e=b[0][2],f=d,g=e,h++,c.push(["M",d,e]));for(var i=h,j=b.length;i<j;i++){var k=c[i]=[],l=b[i];if(l[0]!=v.call(l[0])){k[0]=v.call(l[0]);switch(k[0]){case"a":k[1]=l[1],k[2]=l[2],k[3]=l[3],k[4]=l[4],k[5]=l[5],k[6]=+(l[6]-d).toFixed(3),k[7]=+(l[7]-e).toFixed(3);break;case"v":k[1]=+(l[1]-e).toFixed(3);break;case"m":f=l[1],g=l[2];default:for(var m=1,n=l.length;m<n;m++)k[m]=+(l[m]-(m%2?d:e)).toFixed(3)}}else{k=c[i]=[],l[0]=="m"&&(f=l[1]+d,g=l[2]+e);for(var o=0,p=l.length;o<p;o++)c[i][o]=l[o]}var q=c[i].length;switch(c[i][0]){case"z":d=f,e=g;break;case"h":d+=+c[i][q-1];break;case"v":e+=+c[i][q-1];break;default:d+=+c[i][q-2],e+=+c[i][q-1]}}c.toString=a._path2string;return c},0,by),bA=a._pathToAbsolute=bt(function(b){if(!a.is(b,E)||!a.is(b&&b[0],E))b=a.parsePathString(b);if(!b||!b.length)return[["M",0,0]];var c=[],d=0,e=0,f=0,g=0,h=0;b[0][0]=="M"&&(d=+b[0][1],e=+b[0][2],f=d,g=e,h++,c[0]=["M",d,e]);for(var i,j,k=h,l=b.length;k<l;k++){c.push(i=[]),j=b[k];if(j[0]!=S.call(j[0])){i[0]=S.call(j[0]);switch(i[0]){case"A":i[1]=j[1],i[2]=j[2],i[3]=j[3],i[4]=j[4],i[5]=j[5],i[6]=+(j[6]+d),i[7]=+(j[7]+e);break;case"V":i[1]=+j[1]+e;break;case"H":i[1]=+j[1]+d;break;case"R":var m=[d,e][n](j.slice(1));for(var o=2,p=m.length;o<p;o++)m[o]=+m[o]+d,m[++o]=+m[o]+e;c.pop(),c=c[n](bw(m));break;case"M":f=+j[1]+d,g=+j[2]+e;default:for(o=1,p=j.length;o<p;o++)i[o]=+j[o]+(o%2?d:e)}}else if(j[0]=="R")m=[d,e][n](j.slice(1)),c.pop(),c=c[n](bw(m)),i=["R"][n](j.slice(-2));else for(var q=0,r=j.length;q<r;q++)i[q]=j[q];switch(i[0]){case"Z":d=f,e=g;break;case"H":d=i[1];break;case"V":e=i[1];break;case"M":f=i[i.length-2],g=i[i.length-1];default:d=i[i.length-2],e=i[i.length-1]}}c.toString=a._path2string;return c},null,by),bB=function(a,b,c,d){return[a,b,c,d,c,d]},bC=function(a,b,c,d,e,f){var g=1/3,h=2/3;return[g*a+h*c,g*b+h*d,g*e+h*c,g*f+h*d,e,f]},bD=function(a,b,c,d,e,f,g,h,i,j){var k=B*120/180,l=B/180*(+e||0),m=[],o,p=bt(function(a,b,c){var d=a*w.cos(c)-b*w.sin(c),e=a*w.sin(c)+b*w.cos(c);return{x:d,y:e}});if(!j){o=p(a,b,-l),a=o.x,b=o.y,o=p(h,i,-l),h=o.x,i=o.y;var q=w.cos(B/180*e),r=w.sin(B/180*e),t=(a-h)/2,u=(b-i)/2,v=t*t/(c*c)+u*u/(d*d);v>1&&(v=w.sqrt(v),c=v*c,d=v*d);var x=c*c,y=d*d,A=(f==g?-1:1)*w.sqrt(z((x*y-x*u*u-y*t*t)/(x*u*u+y*t*t))),C=A*c*u/d+(a+h)/2,D=A*-d*t/c+(b+i)/2,E=w.asin(((b-D)/d).toFixed(9)),F=w.asin(((i-D)/d).toFixed(9));E=a<C?B-E:E,F=h<C?B-F:F,E<0&&(E=B*2+E),F<0&&(F=B*2+F),g&&E>F&&(E=E-B*2),!g&&F>E&&(F=F-B*2)}else E=j[0],F=j[1],C=j[2],D=j[3];var G=F-E;if(z(G)>k){var H=F,I=h,J=i;F=E+k*(g&&F>E?1:-1),h=C+c*w.cos(F),i=D+d*w.sin(F),m=bD(h,i,c,d,e,0,g,I,J,[F,H,C,D])}G=F-E;var K=w.cos(E),L=w.sin(E),M=w.cos(F),N=w.sin(F),O=w.tan(G/4),P=4/3*c*O,Q=4/3*d*O,R=[a,b],S=[a+P*L,b-Q*K],T=[h+P*N,i-Q*M],U=[h,i];S[0]=2*R[0]-S[0],S[1]=2*R[1]-S[1];if(j)return[S,T,U][n](m);m=[S,T,U][n](m).join()[s](",");var V=[];for(var W=0,X=m.length;W<X;W++)V[W]=W%2?p(m[W-1],m[W],l).y:p(m[W],m[W+1],l).x;return V},bE=function(a,b,c,d,e,f,g,h,i){var j=1-i;return{x:A(j,3)*a+A(j,2)*3*i*c+j*3*i*i*e+A(i,3)*g,y:A(j,3)*b+A(j,2)*3*i*d+j*3*i*i*f+A(i,3)*h}},bF=bt(function(a,b,c,d,e,f,g,h){var i=e-2*c+a-(g-2*e+c),j=2*(c-a)-2*(e-c),k=a-c,l=(-j+w.sqrt(j*j-4*i*k))/2/i,n=(-j-w.sqrt(j*j-4*i*k))/2/i,o=[b,h],p=[a,g],q;z(l)>"1e12"&&(l=.5),z(n)>"1e12"&&(n=.5),l>0&&l<1&&(q=bE(a,b,c,d,e,f,g,h,l),p.push(q.x),o.push(q.y)),n>0&&n<1&&(q=bE(a,b,c,d,e,f,g,h,n),p.push(q.x),o.push(q.y)),i=f-2*d+b-(h-2*f+d),j=2*(d-b)-2*(f-d),k=b-d,l=(-j+w.sqrt(j*j-4*i*k))/2/i,n=(-j-w.sqrt(j*j-4*i*k))/2/i,z(l)>"1e12"&&(l=.5),z(n)>"1e12"&&(n=.5),l>0&&l<1&&(q=bE(a,b,c,d,e,f,g,h,l),p.push(q.x),o.push(q.y)),n>0&&n<1&&(q=bE(a,b,c,d,e,f,g,h,n),p.push(q.x),o.push(q.y));return{min:{x:y[m](0,p),y:y[m](0,o)},max:{x:x[m](0,p),y:x[m](0,o)}}}),bG=a._path2curve=bt(function(a,b){var c=bA(a),d=b&&bA(b),e={x:0,y:0,bx:0,by:0,X:0,Y:0,qx:null,qy:null},f={x:0,y:0,bx:0,by:0,X:0,Y:0,qx:null,qy:null},g=function(a,b){var c,d;if(!a)return["C",b.x,b.y,b.x,b.y,b.x,b.y];!(a[0]in{T:1,Q:1})&&(b.qx=b.qy=null);switch(a[0]){case"M":b.X=a[1],b.Y=a[2];break;case"A":a=["C"][n](bD[m](0,[b.x,b.y][n](a.slice(1))));break;case"S":c=b.x+(b.x-(b.bx||b.x)),d=b.y+(b.y-(b.by||b.y)),a=["C",c,d][n](a.slice(1));break;case"T":b.qx=b.x+(b.x-(b.qx||b.x)),b.qy=b.y+(b.y-(b.qy||b.y)),a=["C"][n](bC(b.x,b.y,b.qx,b.qy,a[1],a[2]));break;case"Q":b.qx=a[1],b.qy=a[2],a=["C"][n](bC(b.x,b.y,a[1],a[2],a[3],a[4]));break;case"L":a=["C"][n](bB(b.x,b.y,a[1],a[2]));break;case"H":a=["C"][n](bB(b.x,b.y,a[1],b.y));break;case"V":a=["C"][n](bB(b.x,b.y,b.x,a[1]));break;case"Z":a=["C"][n](bB(b.x,b.y,b.X,b.Y))}return a},h=function(a,b){if(a[b].length>7){a[b].shift();var e=a[b];while(e.length)a.splice(b++,0,["C"][n](e.splice(0,6)));a.splice(b,1),k=x(c.length,d&&d.length||0)}},i=function(a,b,e,f,g){a&&b&&a[g][0]=="M"&&b[g][0]!="M"&&(b.splice(g,0,["M",f.x,f.y]),e.bx=0,e.by=0,e.x=a[g][1],e.y=a[g][2],k=x(c.length,d&&d.length||0))};for(var j=0,k=x(c.length,d&&d.length||0);j<k;j++){c[j]=g(c[j],e),h(c,j),d&&(d[j]=g(d[j],f)),d&&h(d,j),i(c,d,e,f,j),i(d,c,f,e,j);var l=c[j],o=d&&d[j],p=l.length,q=d&&o.length;e.x=l[p-2],e.y=l[p-1],e.bx=Q(l[p-4])||e.x,e.by=Q(l[p-3])||e.y,f.bx=d&&(Q(o[q-4])||f.x),f.by=d&&(Q(o[q-3])||f.y),f.x=d&&o[q-2],f.y=d&&o[q-1]}return d?[c,d]:c},null,by),bH=a._parseDots=bt(function(b){var c=[];for(var d=0,e=b.length;d<e;d++){var f={},g=b[d].match(/^([^:]*):?([\d\.]*)/);f.color=a.getRGB(g[1]);if(f.color.error)return null;f.color=f.color.hex,g[2]&&(f.offset=g[2]+"%"),c.push(f)}for(d=1,e=c.length-1;d<e;d++)if(!c[d].offset){var h=Q(c[d-1].offset||0),i=0;for(var j=d+1;j<e;j++)if(c[j].offset){i=c[j].offset;break}i||(i=100,j=e),i=Q(i);var k=(i-h)/(j-d+1);for(;d<j;d++)h+=k,c[d].offset=h+"%"}return c}),bI=a._tear=function(a,b){a==b.top&&(b.top=a.prev),a==b.bottom&&(b.bottom=a.next),a.next&&(a.next.prev=a.prev),a.prev&&(a.prev.next=a.next)},bJ=a._tofront=function(a,b){b.top!==a&&(bI(a,b),a.next=null,a.prev=b.top,b.top.next=a,b.top=a)},bK=a._toback=function(a,b){b.bottom!==a&&(bI(a,b),a.next=b.bottom,a.prev=null,b.bottom.prev=a,b.bottom=a)},bL=a._insertafter=function(a,b,c){bI(a,c),b==c.top&&(c.top=a),b.next&&(b.next.prev=a),a.next=b.next,a.prev=b,b.next=a},bM=a._insertbefore=function(a,b,c){bI(a,c),b==c.bottom&&(c.bottom=a),b.prev&&(b.prev.next=a),a.prev=b.prev,b.prev=a,a.next=b},bN=a._extractTransform=function(b,c){if(c==null)return b._.transform;c=r(c).replace(/\.{3}|\u2026/g,b._.transform||p);var d=a.parseTransformString(c),e=0,f=0,g=0,h=1,i=1,j=b._,k=new bQ;j.transform=d||[];if(d)for(var l=0,m=d.length;l<m;l++){var n=d[l],o=n.length,q=r(n[0]).toLowerCase(),s=n[0]!=q,t=s?k.invert():0,u,v,w,x,y;q=="t"&&o==3?s?(u=t.x(0,0),v=t.y(0,0),w=t.x(n[1],n[2]),x=t.y(n[1],n[2]),k.translate(w-u,x-v)):k.translate(n[1],n[2]):q=="r"?o==2?(y=y||b.getBBox(1),k.rotate(n[1],y.x+y.width/2,y.y+y.height/2),e+=n[1]):o==4&&(s?(w=t.x(n[2],n[3]),x=t.y(n[2],n[3]),k.rotate(n[1],w,x)):k.rotate(n[1],n[2],n[3]),e+=n[1]):q=="s"?o==2||o==3?(y=y||b.getBBox(1),k.scale(n[1],n[o-1],y.x+y.width/2,y.y+y.height/2),h*=n[1],i*=n[o-1]):o==5&&(s?(w=t.x(n[3],n[4]),x=t.y(n[3],n[4]),k.scale(n[1],n[2],w,x)):k.scale(n[1],n[2],n[3],n[4]),h*=n[1],i*=n[2]):q=="m"&&o==7&&k.add(n[1],n[2],n[3],n[4],n[5],n[6]),j.dirtyT=1,b.matrix=k}b.matrix=k,j.sx=h,j.sy=i,j.deg=e,j.dx=f=k.e,j.dy=g=k.f,h==1&&i==1&&!e&&j.bbox?(j.bbox.x+=+f,j.bbox.y+=+g):j.dirtyT=1},bO=function(a){var b=a[0];switch(b.toLowerCase()){case"t":return[b,0,0];case"m":return[b,1,0,0,1,0,0];case"r":return a.length==4?[b,0,a[2],a[3]]:[b,0];case"s":return a.length==5?[b,1,1,a[3],a[4]]:a.length==3?[b,1,1]:[b,1]}},bP=a._equaliseTransform=function(b,c){c=r(c).replace(/\.{3}|\u2026/g,b),b=a.parseTransformString(b)||[],c=a.parseTransformString(c)||[];var d=x(b.length,c.length),e=[],f=[],g=0,h,i,j,k;for(;g<d;g++){j=b[g]||bO(c[g]),k=c[g]||bO(j);if(j[0]!=k[0]||j[0].toLowerCase()=="r"&&(j[2]!=k[2]||j[3]!=k[3])||j[0].toLowerCase()=="s"&&(j[3]!=k[3]||j[4]!=k[4]))return;e[g]=[],f[g]=[];for(h=0,i=x(j.length,k.length);h<i;h++)h in j&&(e[g][h]=j[h]),h in k&&(f[g][h]=k[h])}return{from:e,to:f}};a._getContainer=function(b,c,d,e){var f;f=e==null&&!a.is(b,"object")?h.doc.getElementById(b):b;if(f!=null){if(f.tagName)return c==null?{container:f,width:f.style.pixelWidth||f.offsetWidth,height:f.style.pixelHeight||f.offsetHeight}:{container:f,width:c,height:d};return{container:1,x:b,y:c,width:d,height:e}}},a.pathToRelative=bz,a._engine={},a.path2curve=bG,a.matrix=function(a,b,c,d,e,f){return new bQ(a,b,c,d,e,f)},function(b){function d(a){var b=w.sqrt(c(a));a[0]&&(a[0]/=b),a[1]&&(a[1]/=b)}function c(a){return a[0]*a[0]+a[1]*a[1]}b.add=function(a,b,c,d,e,f){var g=[[],[],[]],h=[[this.a,this.c,this.e],[this.b,this.d,this.f],[0,0,1]],i=[[a,c,e],[b,d,f],[0,0,1]],j,k,l,m;a&&a instanceof bQ&&(i=[[a.a,a.c,a.e],[a.b,a.d,a.f],[0,0,1]]);for(j=0;j<3;j++)for(k=0;k<3;k++){m=0;for(l=0;l<3;l++)m+=h[j][l]*i[l][k];g[j][k]=m}this.a=g[0][0],this.b=g[1][0],this.c=g[0][1],this.d=g[1][1],this.e=g[0][2],this.f=g[1][2]},b.invert=function(){var a=this,b=a.a*a.d-a.b*a.c;return new bQ(a.d/b,-a.b/b,-a.c/b,a.a/b,(a.c*a.f-a.d*a.e)/b,(a.b*a.e-a.a*a.f)/b)},b.clone=function(){return new bQ(this.a,this.b,this.c,this.d,this.e,this.f)},b.translate=function(a,b){this.add(1,0,0,1,a,b)},b.scale=function(a,b,c,d){b==null&&(b=a),(c||d)&&this.add(1,0,0,1,c,d),this.add(a,0,0,b,0,0),(c||d)&&this.add(1,0,0,1,-c,-d)},b.rotate=function(b,c,d){b=a.rad(b),c=c||0,d=d||0;var e=+w.cos(b).toFixed(9),f=+w.sin(b).toFixed(9);this.add(e,f,-f,e,c,d),this.add(1,0,0,1,-c,-d)},b.x=function(a,b){return a*this.a+b*this.c+this.e},b.y=function(a,b){return a*this.b+b*this.d+this.f},b.get=function(a){return+this[r.fromCharCode(97+a)].toFixed(4)},b.toString=function(){return a.svg?"matrix("+[this.get(0),this.get(1),this.get(2),this.get(3),this.get(4),this.get(5)].join()+")":[this.get(0),this.get(2),this.get(1),this.get(3),0,0].join()},b.toFilter=function(){return"progid:DXImageTransform.Microsoft.Matrix(M11="+this.get(0)+", M12="+this.get(2)+", M21="+this.get(1)+", M22="+this.get(3)+", Dx="+this.get(4)+", Dy="+this.get(5)+", sizingmethod='auto expand')"},b.offset=function(){return[this.e.toFixed(4),this.f.toFixed(4)]},b.split=function(){var b={};b.dx=this.e,b.dy=this.f;var e=[[this.a,this.c],[this.b,this.d]];b.scalex=w.sqrt(c(e[0])),d(e[0]),b.shear=e[0][0]*e[1][0]+e[0][1]*e[1][1],e[1]=[e[1][0]-e[0][0]*b.shear,e[1][1]-e[0][1]*b.shear],b.scaley=w.sqrt(c(e[1])),d(e[1]),b.shear/=b.scaley;var f=-e[0][1],g=e[1][1];g<0?(b.rotate=a.deg(w.acos(g)),f<0&&(b.rotate=360-b.rotate)):b.rotate=a.deg(w.asin(f)),b.isSimple=!+b.shear.toFixed(9)&&(b.scalex.toFixed(9)==b.scaley.toFixed(9)||!b.rotate),b.isSuperSimple=!+b.shear.toFixed(9)&&b.scalex.toFixed(9)==b.scaley.toFixed(9)&&!b.rotate,b.noRotation=!+b.shear.toFixed(9)&&!b.rotate;return b},b.toTransformString=function(a){var b=a||this[s]();if(b.isSimple){b.scalex=+b.scalex.toFixed(4),b.scaley=+b.scaley.toFixed(4),b.rotate=+b.rotate.toFixed(4);return(b.dx&&b.dy?"t"+[b.dx,b.dy]:p)+(b.scalex!=1||b.scaley!=1?"s"+[b.scalex,b.scaley,0,0]:p)+(b.rotate?"r"+[b.rotate,0,0]:p)}return"m"+[this.get(0),this.get(1),this.get(2),this.get(3),this.get(4),this.get(5)]}}(bQ.prototype);var bR=navigator.userAgent.match(/Version\/(.*?)\s/)||navigator.userAgent.match(/Chrome\/(\d+)/);navigator.vendor=="Apple Computer, Inc."&&(bR&&bR[1]<4||navigator.platform.slice(0,2)=="iP")||navigator.vendor=="Google Inc."&&bR&&bR[1]<8?k.safari=function(){var a=this.rect(-99,-99,this.width+99,this.height+99).attr({stroke:"none"});setTimeout(function(){a.remove()})}:k.safari=bd;var bS=function(){this.returnValue=!1},bT=function(){return this.originalEvent.preventDefault()},bU=function(){this.cancelBubble=!0},bV=function(){return this.originalEvent.stopPropagation()},bW=function(){if(h.doc.addEventListener)return function(a,b,c,d){var e=o&&u[b]?u[b]:b,f=function(e){var f=h.doc.documentElement.scrollTop||h.doc.body.scrollTop,i=h.doc.documentElement.scrollLeft||h.doc.body.scrollLeft,j=e.clientX+i,k=e.clientY+f;if(o&&u[g](b))for(var l=0,m=e.targetTouches&&e.targetTouches.length;l<m;l++)if(e.targetTouches[l].target==a){var n=e;e=e.targetTouches[l],e.originalEvent=n,e.preventDefault=bT,e.stopPropagation=bV;break}return c.call(d,e,j,k)};a.addEventListener(e,f,!1);return function(){a.removeEventListener(e,f,!1);return!0}};if(h.doc.attachEvent)return function(a,b,c,d){var e=function(a){a=a||h.win.event;var b=h.doc.documentElement.scrollTop||h.doc.body.scrollTop,e=h.doc.documentElement.scrollLeft||h.doc.body.scrollLeft,f=a.clientX+e,g=a.clientY+b;a.preventDefault=a.preventDefault||bS,a.stopPropagation=a.stopPropagation||bU;return c.call(d,a,f,g)};a.attachEvent("on"+b,e);var f=function(){a.detachEvent("on"+b,e);return!0};return f}}(),bX=[],bY=function(a){var b=a.clientX,c=a.clientY,d=h.doc.documentElement.scrollTop||h.doc.body.scrollTop,e=h.doc.documentElement.scrollLeft||h.doc.body.scrollLeft,f,g=bX.length;while(g--){f=bX[g];if(o){var i=a.touches.length,j;while(i--){j=a.touches[i];if(j.identifier==f.el._drag.id){b=j.clientX,c=j.clientY,(a.originalEvent?a.originalEvent:a).preventDefault();break}}}else a.preventDefault();var k=f.el.node,l,m=k.nextSibling,n=k.parentNode,p=k.style.display;h.win.opera&&n.removeChild(k),k.style.display="none",l=f.el.paper.getElementByPoint(b,c),k.style.display=p,h.win.opera&&(m?n.insertBefore(k,m):n.appendChild(k)),l&&eve("drag.over."+f.el.id,f.el,l),b+=e,c+=d,eve("drag.move."+f.el.id,f.move_scope||f.el,b-f.el._drag.x,c-f.el._drag.y,b,c,a)}},bZ=function(b){a.unmousemove(bY).unmouseup(bZ);var c=bX.length,d;while(c--)d=bX[c],d.el._drag={},eve("drag.end."+d.el.id,d.end_scope||d.start_scope||d.move_scope||d.el,b);bX=[]},b$=a.el={};for(var b_=t.length;b_--;)(function(b){a[b]=b$[b]=function(c,d){a.is(c,"function")&&(this.events=this.events||[],this.events.push({name:b,f:c,unbind:bW(this.shape||this.node||h.doc,b,c,d||this)}));return this},a["un"+b]=b$["un"+b]=function(a){var c=this.events,d=c.length;while(d--)if(c[d].name==b&&c[d].f==a){c[d].unbind(),c.splice(d,1),!c.length&&delete this.events;return this}return this}})(t[b_]);b$.data=function(b,c){var d=ba[this.id]=ba[this.id]||{};if(arguments.length==1){if(a.is(b,"object")){for(var e in b)b[g](e)&&this.data(e,b[e]);return this}eve("data.get."+this.id,this,d[b],b);return d[b]}d[b]=c,eve("data.set."+this.id,this,c,b);return this},b$.removeData=function(a){a==null?ba[this.id]={}:ba[this.id]&&delete ba[this.id][a];return this},b$.hover=function(a,b,c,d){return this.mouseover(a,c).mouseout(b,d||c)},b$.unhover=function(a,b){return this.unmouseover(a).unmouseout(b)};var ca=[];b$.drag=function(b,c,d,e,f,g){function i(i){(i.originalEvent||i).preventDefault();var j=h.doc.documentElement.scrollTop||h.doc.body.scrollTop,k=h.doc.documentElement.scrollLeft||h.doc.body.scrollLeft;this._drag.x=i.clientX+k,this._drag.y=i.clientY+j,this._drag.id=i.identifier,!bX.length&&a.mousemove(bY).mouseup(bZ),bX.push({el:this,move_scope:e,start_scope:f,end_scope:g}),c&&eve.on("drag.start."+this.id,c),b&&eve.on("drag.move."+this.id,b),d&&eve.on("drag.end."+this.id,d),eve("drag.start."+this.id,f||e||this,i.clientX+k,i.clientY+j,i)}this._drag={},ca.push({el:this,start:i}),this.mousedown(i);return this},b$.onDragOver=function(a){a?eve.on("drag.over."+this.id,a):eve.unbind("drag.over."+this.id)},b$.undrag=function(){var b=ca.length;while(b--)ca[b].el==this&&(this.unmousedown(ca[b].start),ca.splice(b,1),eve.unbind("drag.*."+this.id));!ca.length&&a.unmousemove(bY).unmouseup(bZ)},k.circle=function(b,c,d){var e=a._engine.circle(this,b||0,c||0,d||0);this.__set__&&this.__set__.push(e);return e},k.rect=function(b,c,d,e,f){var g=a._engine.rect(this,b||0,c||0,d||0,e||0,f||0);this.__set__&&this.__set__.push(g);return g},k.ellipse=function(b,c,d,e){var f=a._engine.ellipse(this,b||0,c||0,d||0,e||0);this.__set__&&this.__set__.push(f);return f},k.path=function(b){b&&!a.is(b,D)&&!a.is(b[0],E)&&(b+=p);var c=a._engine.path(a.format[m](a,arguments),this);this.__set__&&this.__set__.push(c);return c},k.image=function(b,c,d,e,f){var g=a._engine.image(this,b||"about:blank",c||0,d||0,e||0,f||0);this.__set__&&this.__set__.push(g);return g},k.text=function(b,c,d){var e=a._engine.text(this,b||0,c||0,r(d));this.__set__&&this.__set__.push(e);return e},k.set=function(b){!a.is(b,"array")&&(b=Array.prototype.splice.call(arguments,0,arguments.length));var c=new cs(b);this.__set__&&this.__set__.push(c);return c},k.setStart=function(a){this.__set__=a||this.set()},k.setFinish=function(a){var b=this.__set__;delete this.__set__;return b},k.setSize=function(b,c){return a._engine.setSize.call(this,b,c)},k.setViewBox=function(b,c,d,e,f){return a._engine.setViewBox.call(this,b,c,d,e,f)},k.top=k.bottom=null,k.raphael=a;var cb=function(a){var b=a.getBoundingClientRect(),c=a.ownerDocument,d=c.body,e=c.documentElement,f=e.clientTop||d.clientTop||0,g=e.clientLeft||d.clientLeft||0,i=b.top+(h.win.pageYOffset||e.scrollTop||d.scrollTop)-f,j=b.left+(h.win.pageXOffset||e.scrollLeft||d.scrollLeft)-g;return{y:i,x:j}};k.getElementByPoint=function(a,b){var c=this,d=c.canvas,e=h.doc.elementFromPoint(a,b);if(h.win.opera&&e.tagName=="svg"){var f=cb(d),g=d.createSVGRect();g.x=a-f.x,g.y=b-f.y,g.width=g.height=1;var i=d.getIntersectionList(g,null);i.length&&(e=i[i.length-1])}if(!e)return null;while(e.parentNode&&e!=d.parentNode&&!e.raphael)e=e.parentNode;e==c.canvas.parentNode&&(e=d),e=e&&e.raphael?c.getById(e.raphaelid):null;return e},k.getById=function(a){var b=this.bottom;while(b){if(b.id==a)return b;b=b.next}return null},k.forEach=function(a,b){var c=this.bottom;while(c){if(a.call(b,c)===!1)return this;c=c.next}return this},b$.getBBox=function(a){if(this.removed)return{};var b=this._;if(a){if(b.dirty||!b.bboxwt)this.realPath=bh[this.type](this),b.bboxwt=bx(this.realPath),b.bboxwt.toString=cd,b.dirty=0;return b.bboxwt}if(b.dirty||b.dirtyT||!b.bbox){if(b.dirty||!this.realPath)b.bboxwt=0,this.realPath=bh[this.type](this);b.bbox=bx(bi(this.realPath,this.matrix)),b.bbox.toString=cd,b.dirty=b.dirtyT=0}return b.bbox},b$.clone=function(){if(this.removed)return null;var a=this.paper[this.type]().attr(this.attr());this.__set__&&this.__set__.push(a);return a},b$.glow=function(a){if(this.type=="text")return null;a=a||{};var b={width:(a.width||10)+(+this.attr("stroke-width")||1),fill:a.fill||!1,opacity:a.opacity||.5,offsetx:a.offsetx||0,offsety:a.offsety||0,color:a.color||"#000"},c=b.width/2,d=this.paper,e=d.set(),f=this.realPath||bh[this.type](this);f=this.matrix?bi(f,this.matrix):f;for(var g=1;g<c+1;g++)e.push(d.path(f).attr({stroke:b.color,fill:b.fill?b.color:"none","stroke-linejoin":"round","stroke-linecap":"round","stroke-width":+(b.width/c*g).toFixed(3),opacity:+(b.opacity/c).toFixed(3)}));return e.insertBefore(this).translate(b.offsetx,b.offsety)};var ce={},cf=function(b,c,d,e,f,g,h,i,j){var k=0,l=100,m=[b,c,d,e,f,g,h,i].join(),n=ce[m],o,p;!n&&(ce[m]=n={data:[]}),n.timer&&clearTimeout(n.timer),n.timer=setTimeout(function(){delete ce[m]},2e3);if(j!=null&&!n.precision){var q=cf(b,c,d,e,f,g,h,i);n.precision=~~q*10,n.data=[]}l=n.precision||l;for(var r=0;r<l+1;r++){n.data[r*l]?p=n.data[r*l]:(p=a.findDotsAtSegment(b,c,d,e,f,g,h,i,r/l),n.data[r*l]=p),r&&(k+=A(A(o.x-p.x,2)+A(o.y-p.y,2),.5));if(j!=null&&k>=j)return p;o=p}if(j==null)return k},cg=function(b,c){return function(d,e,f){d=bG(d);var g,h,i,j,k="",l={},m,n=0;for(var o=0,p=d.length;o<p;o++){i=d[o];if(i[0]=="M")g=+i[1],h=+i[2];else{j=cf(g,h,i[1],i[2],i[3],i[4],i[5],i[6]);if(n+j>e){if(c&&!l.start){m=cf(g,h,i[1],i[2],i[3],i[4],i[5],i[6],e-n),k+=["C"+m.start.x,m.start.y,m.m.x,m.m.y,m.x,m.y];if(f)return k;l.start=k,k=["M"+m.x,m.y+"C"+m.n.x,m.n.y,m.end.x,m.end.y,i[5],i[6]].join(),n+=j,g=+i[5],h=+i[6];continue}if(!b&&!c){m=cf(g,h,i[1],i[2],i[3],i[4],i[5],i[6],e-n);return{x:m.x,y:m.y,alpha:m.alpha}}}n+=j,g=+i[5],h=+i[6]}k+=i.shift()+i}l.end=k,m=b?n:c?l:a.findDotsAtSegment(g,h,i[0],i[1],i[2],i[3],i[4],i[5],1),m.alpha&&(m={x:m.x,y:m.y,alpha:m.alpha});return m}},ch=cg(1),ci=cg(),cj=cg(0,1);a.getTotalLength=ch,a.getPointAtLength=ci,a.getSubpath=function(a,b,c){if(this.getTotalLength(a)-c<1e-6)return cj(a,b).end;var d=cj(a,c,1);return b?cj(d,b).end:d},b$.getTotalLength=function(){if(this.type=="path"){if(this.node.getTotalLength)return this.node.getTotalLength();return ch(this.attrs.path)}},b$.getPointAtLength=function(a){if(this.type=="path")return ci(this.attrs.path,a)},b$.getSubpath=function(b,c){if(this.type=="path")return a.getSubpath(this.attrs.path,b,c)};var ck=a.easing_formulas={linear:function(a){return a},"<":function(a){return A(a,1.7)},">":function(a){return A(a,.48)},"<>":function(a){var b=.48-a/1.04,c=w.sqrt(.1734+b*b),d=c-b,e=A(z(d),1/3)*(d<0?-1:1),f=-c-b,g=A(z(f),1/3)*(f<0?-1:1),h=e+g+.5;return(1-h)*3*h*h+h*h*h},backIn:function(a){var b=1.70158;return a*a*((b+1)*a-b)},backOut:function(a){a=a-1;var b=1.70158;return a*a*((b+1)*a+b)+1},elastic:function(a){if(a==!!a)return a;return A(2,-10*a)*w.sin((a-.075)*2*B/.3)+1},bounce:function(a){var b=7.5625,c=2.75,d;a<1/c?d=b*a*a:a<2/c?(a-=1.5/c,d=b*a*a+.75):a<2.5/c?(a-=2.25/c,d=b*a*a+.9375):(a-=2.625/c,d=b*a*a+.984375);return d}};ck.easeIn=ck["ease-in"]=ck["<"],ck.easeOut=ck["ease-out"]=ck[">"],ck.easeInOut=ck["ease-in-out"]=ck["<>"],ck["back-in"]=ck.backIn,ck["back-out"]=ck.backOut;var cl=[],cm=window.requestAnimationFrame||window.webkitRequestAnimationFrame||window.mozRequestAnimationFrame||window.oRequestAnimationFrame||window.msRequestAnimationFrame||function(a){setTimeout(a,16)},cn=function(){var b=+(new Date),c=0;for(;c<cl.length;c++){var d=cl[c];if(d.el.removed||d.paused)continue;var e=b-d.start,f=d.ms,h=d.easing,i=d.from,j=d.diff,k=d.to,l=d.t,m=d.el,o={},p,r={},s;d.initstatus?(e=(d.initstatus*d.anim.top-d.prev)/(d.percent-d.prev)*f,d.status=d.initstatus,delete d.initstatus,d.stop&&cl.splice(c--,1)):d.status=(d.prev+(d.percent-d.prev)*(e/f))/d.anim.top;if(e<0)continue;if(e<f){var t=h(e/f);for(var u in i)if(i[g](u)){switch(U[u]){case C:p=+i[u]+t*f*j[u];break;case"colour":p="rgb("+[co(O(i[u].r+t*f*j[u].r)),co(O(i[u].g+t*f*j[u].g)),co(O(i[u].b+t*f*j[u].b))].join(",")+")";break;case"path":p=[];for(var v=0,w=i[u].length;v<w;v++){p[v]=[i[u][v][0]];for(var x=1,y=i[u][v].length;x<y;x++)p[v][x]=+i[u][v][x]+t*f*j[u][v][x];p[v]=p[v].join(q)}p=p.join(q);break;case"transform":if(j[u].real){p=[];for(v=0,w=i[u].length;v<w;v++){p[v]=[i[u][v][0]];for(x=1,y=i[u][v].length;x<y;x++)p[v][x]=i[u][v][x]+t*f*j[u][v][x]}}else{var z=function(a){return+i[u][a]+t*f*j[u][a]};p=[["m",z(0),z(1),z(2),z(3),z(4),z(5)]]}break;case"csv":if(u=="clip-rect"){p=[],v=4;while(v--)p[v]=+i[u][v]+t*f*j[u][v]}break;default:var A=[][n](i[u]);p=[],v=m.paper.customAttributes[u].length;while(v--)p[v]=+A[v]+t*f*j[u][v]}o[u]=p}m.attr(o),function(a,b,c){setTimeout(function(){eve("anim.frame."+a,b,c)})}(m.id,m,d.anim)}else{(function(b,c,d){setTimeout(function(){eve("anim.frame."+c.id,c,d),eve("anim.finish."+c.id,c,d),a.is(b,"function")&&b.call(c)})})(d.callback,m,d.anim),m.attr(k),cl.splice(c--,1);if(d.repeat>1&&!d.next){for(s in k)k[g](s)&&(r[s]=d.totalOrigin[s]);d.el.attr(r),cr(d.anim,d.el,d.anim.percents[0],null,d.totalOrigin,d.repeat-1)}d.next&&!d.stop&&cr(d.anim,d.el,d.next,null,d.totalOrigin,d.repeat)}}a.svg&&m&&m.paper&&m.paper.safari(),cl.length&&cm(cn)},co=function(a){return a>255?255:a<0?0:a};b$.animateWith=function(b,c,d,e,f,g){var h=d?a.animation(d,e,f,g):c,i=b.status(c);return this.animate(h).status(h,i*c.ms/h.ms)},b$.onAnimation=function(a){a?eve.on("anim.frame."+this.id,a):eve.unbind("anim.frame."+this.id);return this},cq.prototype.delay=function(a){var b=new cq(this.anim,this.ms);b.times=this.times,b.del=+a||0;return b},cq.prototype.repeat=function(a){var b=new cq(this.anim,this.ms);b.del=this.del,b.times=w.floor(x(a,0))||1;return b},a.animation=function(b,c,d,e){if(b instanceof cq)return b;if(a.is(d,"function")||!d)e=e||d||null,d=null;b=Object(b),c=+c||0;var f={},h,i;for(i in b)b[g](i)&&Q(i)!=i&&Q(i)+"%"!=i&&(h=!0,f[i]=b[i]);if(!h)return new cq(b,c);d&&(f.easing=d),e&&(f.callback=e);return new cq({100:f},c)},b$.animate=function(b,c,d,e){var f=this;if(f.removed){e&&e.call(f);return f}var g=b instanceof cq?b:a.animation(b,c,d,e);cr(g,f,g.percents[0],null,f.attr());return f},b$.setTime=function(a,b){a&&b!=null&&this.status(a,y(b,a.ms)/a.ms);return this},b$.status=function(a,b){var c=[],d=0,e,f;if(b!=null){cr(a,this,-1,y(b,1));return this}e=cl.length;for(;d<e;d++){f=cl[d];if(f.el.id==this.id&&(!a||f.anim==a)){if(a)return f.status;c.push({anim:f.anim,status:f.status})}}if(a)return 0;return c},b$.pause=function(a){for(var b=0;b<cl.length;b++)cl[b].el.id==this.id&&(!a||cl[b].anim==a)&&eve("anim.pause."+this.id,this,cl[b].anim)!==!1&&(cl[b].paused=!0);return this},b$.resume=function(a){for(var b=0;b<cl.length;b++)if(cl[b].el.id==this.id&&(!a||cl[b].anim==a)){var c=cl[b];eve("anim.resume."+this.id,this,c.anim)!==!1&&(delete c.paused,this.status(c.anim,c.status))}return this},b$.stop=function(a){for(var b=0;b<cl.length;b++)cl[b].el.id==this.id&&(!a||cl[b].anim==a)&&eve("anim.stop."+this.id,this,cl[b].anim)!==!1&&cl.splice(b--,1);return this},b$.toString=function(){return"Raphaël’s object"};var cs=function(a){this.items=[],this.length=0,this.type="set";if(a)for(var b=0,c=a.length;b<c;b++)a[b]&&(a[b].constructor==b$.constructor||a[b].constructor==cs)&&(this[this.items.length]=this.items[this.items.length]=a[b],this.length++)},ct=cs.prototype;ct.push=function(){var a,b;for(var c=0,d=arguments.length;c<d;c++)a=arguments[c],a&&(a.constructor==b$.constructor||a.constructor==cs)&&(b=this.items.length,this[b]=this.items[b]=a,this.length++);return this},ct.pop=function(){this.length&&delete this[this.length--];return this.items.pop()},ct.forEach=function(a,b){for(var c=0,d=this.items.length;c<d;c++)if(a.call(b,this.items[c],c)===!1)return this;return this};for(var cu in b$)b$[g](cu)&&(ct[cu]=function(a){return function(){var b=arguments;return this.forEach(function(c){c[a][m](c,b)})}}(cu));ct.attr=function(b,c){if(b&&a.is(b,E)&&a.is(b[0],"object"))for(var d=0,e=b.length;d<e;d++)this.items[d].attr(b[d]);else for(var f=0,g=this.items.length;f<g;f++)this.items[f].attr(b,c);return this},ct.clear=function(){while(this.length)this.pop()},ct.splice=function(a,b,c){a=a<0?x(this.length+a,0):a,b=x(0,y(this.length-a,b));var d=[],e=[],f=[],g;for(g=2;g<arguments.length;g++)f.push(arguments[g]);for(g=0;g<b;g++)e.push(this[a+g]);for(;g<this.length-a;g++)d.push(this[a+g]);var h=f.length;for(g=0;g<h+d.length;g++)this.items[a+g]=this[a+g]=g<h?f[g]:d[g-h];g=this.items.length=this.length-=b-h;while(this[g])delete this[g++];return new cs(e)},ct.exclude=function(a){for(var b=0,c=this.length;b<c;b++)if(this[b]==a){this.splice(b,1);return!0}},ct.animate=function(b,c,d,e){(a.is(d,"function")||!d)&&(e=d||null);var f=this.items.length,g=f,h,i=this,j;if(!f)return this;e&&(j=function(){!--f&&e.call(i)}),d=a.is(d,D)?d:j;var k=a.animation(b,c,d,j);h=this.items[--g].animate(k);while(g--)this.items[g]&&!this.items[g].removed&&this.items[g].animateWith(h,k);return this},ct.insertAfter=function(a){var b=this.items.length;while(b--)this.items[b].insertAfter(a);return this},ct.getBBox=function(){var a=[],b=[],c=[],d=[];for(var e=this.items.length;e--;)if(!this.items[e].removed){var f=this.items[e].getBBox();a.push(f.x),b.push(f.y),c.push(f.x+f.width),d.push(f.y+f.height)}a=y[m](0,a),b=y[m](0,b);return{x:a,y:b,width:x[m](0,c)-a,height:x[m](0,d)-b}},ct.clone=function(a){a=new cs;for(var b=0,c=this.items.length;b<c;b++)a.push(this.items[b].clone());return a},ct.toString=function(){return"Raphaël‘s set"},a.registerFont=function(a){if(!a.face)return a;this.fonts=this.fonts||{};var b={w:a.w,face:{},glyphs:{}},c=a.face["font-family"];for(var d in a.face)a.face[g](d)&&(b.face[d]=a.face[d]);this.fonts[c]?this.fonts[c].push(b):this.fonts[c]=[b];if(!a.svg){b.face["units-per-em"]=R(a.face["units-per-em"],10);for(var e in a.glyphs)if(a.glyphs[g](e)){var f=a.glyphs[e];b.glyphs[e]={w:f.w,k:{},d:f.d&&"M"+f.d.replace(/[mlcxtrv]/g,function(a){return{l:"L",c:"C",x:"z",t:"m",r:"l",v:"c"}[a]||"M"})+"z"};if(f.k)for(var h in f.k)f[g](h)&&(b.glyphs[e].k[h]=f.k[h])}}return a},k.getFont=function(b,c,d,e){e=e||"normal",d=d||"normal",c=+c||{normal:400,bold:700,lighter:300,bolder:800}[c]||400;if(!!a.fonts){var f=a.fonts[b];if(!f){var h=new RegExp("(^|\\s)"+b.replace(/[^\w\d\s+!~.:_-]/g,p)+"(\\s|$)","i");for(var i in a.fonts)if(a.fonts[g](i)&&h.test(i)){f=a.fonts[i];break}}var j;if(f)for(var k=0,l=f.length;k<l;k++){j=f[k];if(j.face["font-weight"]==c&&(j.face["font-style"]==d||!j.face["font-style"])&&j.face["font-stretch"]==e)break}return j}},k.print=function(b,d,e,f,g,h,i){h=h||"middle",i=x(y(i||0,1),-1);var j=this.set(),k=r(e)[s](p),l=0,m=p,n;a.is(f,e)&&(f=this.getFont(f));if(f){n=(g||16)/f.face["units-per-em"];var o=f.face.bbox[s](c),q=+o[0],t=+o[1]+(h=="baseline"?o[3]-o[1]+ +f.face.descent:(o[3]-o[1])/2);for(var u=0,v=k.length;u<v;u++){var w=u&&f.glyphs[k[u-1]]||{},z=f.glyphs[k[u]];l+=u?(w.w||f.w)+(w.k&&w.k[k[u]]||0)+f.w*i:0,z&&z.d&&j.push(this.path(z.d).attr({fill:"#000",stroke:"none",transform:[["t",l*n,0]]}))}j.transform(["...s",n,n,q,t,"t",(b-q)/n,(d-t)/n])}return j},k.add=function(b){if(a.is(b,"array")){var c=this.set(),e=0,f=b.length,h;for(;e<f;e++)h=b[e]||{},d[g](h.type)&&c.push(this[h.type]().attr(h))}return c},a.format=function(b,c){var d=a.is(c,E)?[0][n](c):arguments;b&&a.is(b,D)&&d.length-1&&(b=b.replace(e,function(a,b){return d[++b]==null?p:d[b]}));return b||p},a.fullfill=function(){var a=/\{([^\}]+)\}/g,b=/(?:(?:^|\.)(.+?)(?=\[|\.|$|\()|\[('|")(.+?)\2\])(\(\))?/g,c=function(a,c,d){var e=d;c.replace(b,function(a,b,c,d,f){b=b||d,e&&(b in e&&(e=e[b]),typeof e=="function"&&f&&(e=e()))}),e=(e==null||e==d?a:e)+"";return e};return function(b,d){return String(b).replace(a,function(a,b){return c(a,b,d)})}}(),a.ninja=function(){i.was?h.win.Raphael=i.is:delete Raphael;return a},a.st=ct,function(b,c,d){function e(){/in/.test(b.readyState)?setTimeout(e,9):a.eve("DOMload")}b.readyState==null&&b.addEventListener&&(b.addEventListener(c,d=function(){b.removeEventListener(c,d,!1),b.readyState="complete"},!1),b.readyState="loading"),e()}(document,"DOMContentLoaded"),i.was?h.win.Raphael=a:Raphael=a,eve.on("DOMload",function(){b=!0})}(),window.Raphael.svg&&function(a){var b="hasOwnProperty",c=String,d=parseFloat,e=parseInt,f=Math,g=f.max,h=f.abs,i=f.pow,j=/[, ]+/,k=a.eve,l="",m=" ",n="http://www.w3.org/1999/xlink",o={block:"M5,0 0,2.5 5,5z",classic:"M5,0 0,2.5 5,5 3.5,3 3.5,2z",diamond:"M2.5,0 5,2.5 2.5,5 0,2.5z",open:"M6,1 1,3.5 6,6",oval:"M2.5,0A2.5,2.5,0,0,1,2.5,5 2.5,2.5,0,0,1,2.5,0z"},p={};a.toString=function(){return"Your browser supports SVG.\nYou are running Raphaël "+this.version};var q=function(d,e){if(e){typeof d=="string"&&(d=q(d));for(var f in e)e[b](f)&&(f.substring(0,6)=="xlink:"?d.setAttributeNS(n,f.substring(6),c(e[f])):d.setAttribute(f,c(e[f])))}else d=a._g.doc.createElementNS("http://www.w3.org/2000/svg",d),d.style&&(d.style.webkitTapHighlightColor="rgba(0,0,0,0)");return d},r=function(b,e){var j="linear",k=b.id+e,m=.5,n=.5,o=b.node,p=b.paper,r=o.style,s=a._g.doc.getElementById(k);if(!s){e=c(e).replace(a._radial_gradient,function(a,b,c){j="radial";if(b&&c){m=d(b),n=d(c);var e=(n>.5)*2-1;i(m-.5,2)+i(n-.5,2)>.25&&(n=f.sqrt(.25-i(m-.5,2))*e+.5)&&n!=.5&&(n=n.toFixed(5)-1e-5*e)}return l}),e=e.split(/\s*\-\s*/);if(j=="linear"){var t=e.shift();t=-d(t);if(isNaN(t))return null;var u=[0,0,f.cos(a.rad(t)),f.sin(a.rad(t))],v=1/(g(h(u[2]),h(u[3]))||1);u[2]*=v,u[3]*=v,u[2]<0&&(u[0]=-u[2],u[2]=0),u[3]<0&&(u[1]=-u[3],u[3]=0)}var w=a._parseDots(e);if(!w)return null;k=k.replace(/[\(\)\s,\xb0#]/g,"_"),b.gradient&&k!=b.gradient.id&&(p.defs.removeChild(b.gradient),delete b.gradient);if(!b.gradient){s=q(j+"Gradient",{id:k}),b.gradient=s,q(s,j=="radial"?{fx:m,fy:n}:{x1:u[0],y1:u[1],x2:u[2],y2:u[3],gradientTransform:b.matrix.invert()}),p.defs.appendChild(s);for(var x=0,y=w.length;x<y;x++)s.appendChild(q("stop",{offset:w[x].offset?w[x].offset:x?"100%":"0%","stop-color":w[x].color||"#fff"}))}}q(o,{fill:"url(#"+k+")",opacity:1,"fill-opacity":1}),r.fill=l,r.opacity=1,r.fillOpacity=1;return 1},s=function(a){var b=a.getBBox(1);q(a.pattern,{patternTransform:a.matrix.invert()+" translate("+b.x+","+b.y+")"})},t=function(d,e,f){if(d.type=="path"){var g=c(e).toLowerCase().split("-"),h=d.paper,i=f?"end":"start",j=d.node,k=d.attrs,l=k["stroke-width"],n=g.length,r="classic",s,t,u,v,w,x=3,y=3,z=5;while(n--)switch(g[n]){case"block":case"classic":case"oval":case"diamond":case"open":case"none":r=g[n];break;case"wide":y=5;break;case"narrow":y=2;break;case"long":x=5;break;case"short":x=2}r=="open"?(x+=2,y+=2,z+=2,u=1,v=f?4:1,w={fill:"none",stroke:k.stroke}):(v=u=x/2,w={fill:k.stroke,stroke:"none"}),d._.arrows?f?(d._.arrows.endPath&&p[d._.arrows.endPath]--,d._.arrows.endMarker&&p[d._.arrows.endMarker]--):(d._.arrows.startPath&&p[d._.arrows.startPath]--,d._.arrows.startMarker&&p[d._.arrows.startMarker]--):d._.arrows={};if(r!="none"){var A="raphael-marker-"+r,B="raphael-marker-"+i+r+x+y;a._g.doc.getElementById(A)?p[A]++:(h.defs.appendChild(q(q("path"),{"stroke-linecap":"round",d:o[r],id:A})),p[A]=1);var C=a._g.doc.getElementById(B),D;C?(p[B]++,D=C.getElementsByTagName("use")[0]):(C=q(q("marker"),{id:B,markerHeight:y,markerWidth:x,orient:"auto",refX:v,refY:y/2}),D=q(q("use"),{"xlink:href":"#"+A,transform:(f?" rotate(180 "+x/2+" "+y/2+") ":m)+"scale("+x/z+","+y/z+")","stroke-width":1/((x/z+y/z)/2)}),C.appendChild(D),h.defs.appendChild(C),p[B]=1),q(D,w);var E=u*(r!="diamond"&&r!="oval");f?(s=d._.arrows.startdx*l||0,t=a.getTotalLength(k.path)-E*l):(s=E*l,t=a.getTotalLength(k.path)-(d._.arrows.enddx*l||0)),w={},w["marker-"+i]="url(#"+B+")";if(t||s)w.d=Raphael.getSubpath(k.path,s,t);q(j,w),d._.arrows[i+"Path"]=A,d._.arrows[i+"Marker"]=B,d._.arrows[i+"dx"]=E,d._.arrows[i+"Type"]=r,d._.arrows[i+"String"]=e}else f?(s=d._.arrows.startdx*l||0,t=a.getTotalLength(k.path)-s):(s=0,t=a.getTotalLength(k.path)-(d._.arrows.enddx*l||0)),d._.arrows[i+"Path"]&&q(j,{d:Raphael.getSubpath(k.path,s,t)}),delete d._.arrows[i+"Path"],delete d._.arrows[i+"Marker"],delete d._.arrows[i+"dx"],delete d._.arrows[i+"Type"],delete d._.arrows[i+"String"];for(w in p)if(p[b](w)&&!p[w]){var F=a._g.doc.getElementById(w);F&&F.parentNode.removeChild(F)}}},u={"":[0],none:[0],"-":[3,1],".":[1,1],"-.":[3,1,1,1],"-..":[3,1,1,1,1,1],". ":[1,3],"- ":[4,3],"--":[8,3],"- .":[4,3,1,3],"--.":[8,3,1,3],"--..":[8,3,1,3,1,3]},v=function(a,b,d){b=u[c(b).toLowerCase()];if(b){var e=a.attrs["stroke-width"]||"1",f={round:e,square:e,butt:0}[a.attrs["stroke-linecap"]||d["stroke-linecap"]]||0,g=[],h=b.length;while(h--)g[h]=b[h]*e+(h%2?1:-1)*f;q(a.node,{"stroke-dasharray":g.join(",")})}},w=function(d,f){var i=d.node,k=d.attrs,m=i.style.visibility;i.style.visibility="hidden";for(var o in f)if(f[b](o)){if(!a._availableAttrs[b](o))continue;var p=f[o];k[o]=p;switch(o){case"blur":d.blur(p);break;case"href":case"title":case"target":var u=i.parentNode;if(u.tagName.toLowerCase()!="a"){var w=q("a");u.insertBefore(w,i),w.appendChild(i),u=w}o=="target"&&p=="blank"?u.setAttributeNS(n,"show","new"):u.setAttributeNS(n,o,p);break;case"cursor":i.style.cursor=p;break;case"transform":d.transform(p);break;case"arrow-start":t(d,p);break;case"arrow-end":t(d,p,1);break;case"clip-rect":var x=c(p).split(j);if(x.length==4){d.clip&&d.clip.parentNode.parentNode.removeChild(d.clip.parentNode);var z=q("clipPath"),A=q("rect");z.id=a.createUUID(),q(A,{x:x[0],y:x[1],width:x[2],height:x[3]}),z.appendChild(A),d.paper.defs.appendChild(z),q(i,{"clip-path":"url(#"+z.id+")"}),d.clip=A}if(!p){var B=i.getAttribute("clip-path");if(B){var C=a._g.doc.getElementById(B.replace(/(^url\(#|\)$)/g,l));C&&C.parentNode.removeChild(C),q(i,{"clip-path":l}),delete d.clip}}break;case"path":d.type=="path"&&(q(i,{d:p?k.path=a._pathToAbsolute(p):"M0,0"}),d._.dirty=1,d._.arrows&&("startString"in d._.arrows&&t(d,d._.arrows.startString),"endString"in d._.arrows&&t(d,d._.arrows.endString,1)));break;case"width":i.setAttribute(o,p),d._.dirty=1;if(k.fx)o="x",p=k.x;else break;case"x":k.fx&&(p=-k.x-(k.width||0));case"rx":if(o=="rx"&&d.type=="rect")break;case"cx":i.setAttribute(o,p),d.pattern&&s(d),d._.dirty=1;break;case"height":i.setAttribute(o,p),d._.dirty=1;if(k.fy)o="y",p=k.y;else break;case"y":k.fy&&(p=-k.y-(k.height||0));case"ry":if(o=="ry"&&d.type=="rect")break;case"cy":i.setAttribute(o,p),d.pattern&&s(d),d._.dirty=1;break;case"r":d.type=="rect"?q(i,{rx:p,ry:p}):i.setAttribute(o,p),d._.dirty=1;break;case"src":d.type=="image"&&i.setAttributeNS(n,"href",p);break;case"stroke-width":if(d._.sx!=1||d._.sy!=1)p/=g(h(d._.sx),h(d._.sy))||1;d.paper._vbSize&&(p*=d.paper._vbSize),i.setAttribute(o,p),k["stroke-dasharray"]&&v(d,k["stroke-dasharray"],f),d._.arrows&&("startString"in d._.arrows&&t(d,d._.arrows.startString),"endString"in d._.arrows&&t(d,d._.arrows.endString,1));break;case"stroke-dasharray":v(d,p,f);break;case"fill":var D=c(p).match(a._ISURL);if(D){z=q("pattern");var F=q("image");z.id=a.createUUID(),q(z,{x:0,y:0,patternUnits:"userSpaceOnUse",height:1,width:1}),q(F,{x:0,y:0,"xlink:href":D[1]}),z.appendChild(F),function(b){a._preload(D[1],function(){var a=this.offsetWidth,c=this.offsetHeight;q(b,{width:a,height:c}),q(F,{width:a,height:c}),d.paper.safari()})}(z),d.paper.defs.appendChild(z),i.style.fill="url(#"+z.id+")",q(i,{fill:"url(#"+z.id+")"}),d.pattern=z,d.pattern&&s(d);break}var G=a.getRGB(p);if(!G.error)delete f.gradient,delete k.gradient,!a.is(k.opacity,"undefined")&&a.is(f.opacity,"undefined")&&q(i,{opacity:k.opacity}),!a.is(k["fill-opacity"],"undefined")&&a.is(f["fill-opacity"],"undefined")&&q(i,{"fill-opacity":k["fill-opacity"]});else if((d.type=="circle"||d.type=="ellipse"||c(p).charAt()!="r")&&r(d,p)){if("opacity"in k||"fill-opacity"in k){var H=a._g.doc.getElementById(i.getAttribute("fill").replace(/^url\(#|\)$/g,l));if(H){var I=H.getElementsByTagName("stop");q(I[I.length-1],{"stop-opacity":("opacity"in k?k.opacity:1)*("fill-opacity"in k?k["fill-opacity"]:1)})}}k.gradient=p,k.fill="none";break}G[b]("opacity")&&q(i,{"fill-opacity":G.opacity>1?G.opacity/100:G.opacity});case"stroke":G=a.getRGB(p),i.setAttribute(o,G.hex),o=="stroke"&&G[b]("opacity")&&q(i,{"stroke-opacity":G.opacity>1?G.opacity/100:G.opacity}),o=="stroke"&&d._.arrows&&("startString"in d._.arrows&&t(d,d._.arrows.startString),"endString"in d._.arrows&&t(d,d._.arrows.endString,1));break;case"gradient":(d.type=="circle"||d.type=="ellipse"||c(p).charAt()!="r")&&r(d,p);break;case"opacity":k.gradient&&!k[b]("stroke-opacity")&&q(i,{"stroke-opacity":p>1?p/100:p});case"fill-opacity":if(k.gradient){H=a._g.doc.getElementById(i.getAttribute("fill").replace(/^url\(#|\)$/g,l)),H&&(I=H.getElementsByTagName("stop"),q(I[I.length-1],{"stop-opacity":p}));break};default:o=="font-size"&&(p=e(p,10)+"px");var J=o.replace(/(\-.)/g,function(a){return a.substring(1).toUpperCase()});i.style[J]=p,d._.dirty=1,i.setAttribute(o,p)}}y(d,f),i.style.visibility=m},x=1.2,y=function(d,f){if(d.type=="text"&&!!(f[b]("text")||f[b]("font")||f[b]("font-size")||f[b]("x")||f[b]("y"))){var g=d.attrs,h=d.node,i=h.firstChild?e(a._g.doc.defaultView.getComputedStyle(h.firstChild,l).getPropertyValue("font-size"),10):10;if(f[b]("text")){g.text=f.text;while(h.firstChild)h.removeChild(h.firstChild);var j=c(f.text).split("\n"),k=[],m;for(var n=0,o=j.length;n<o;n++)m=q("tspan"),n&&q(m,{dy:i*x,x:g.x}),m.appendChild(a._g.doc.createTextNode(j[n])),h.appendChild(m),k[n]=m}else{k=h.getElementsByTagName("tspan");for(n=0,o=k.length;n<o;n++)n?q(k[n],{dy:i*x,x:g.x}):q(k[0],{dy:0})}q(h,{x:g.x,y:g.y}),d._.dirty=1;var p=d._getBBox(),r=g.y-(p.y+p.height/2);r&&a.is(r,"finite")&&q(k[0],{dy:r})}},z=function(b,c){var d=0,e=0;this[0]=this.node=b,b.raphael=!0,this.id=a._oid++,b.raphaelid=this.id,this.matrix=a.matrix(),this.realPath=null,this.paper=c,this.attrs=this.attrs||{},this._={transform:[],sx:1,sy:1,deg:0,dx:0,dy:0,dirty:1},!c.bottom&&(c.bottom=this),this.prev=c.top,c.top&&(c.top.next=this),c.top=this,this.next=null},A=a.el;z.prototype=A,A.constructor=z,a._engine.path=function(a,b){var c=q("path");b.canvas&&b.canvas.appendChild(c);var d=new z(c,b);d.type="path",w(d,{fill:"none",stroke:"#000",path:a});return d},A.rotate=function(a,b,e){if(this.removed)return this;a=c(a).split(j),a.length-1&&(b=d(a[1]),e=d(a[2])),a=d(a[0]),e==null&&(b=e);if(b==null||e==null){var f=this.getBBox(1);b=f.x+f.width/2,e=f.y+f.height/2}this.transform(this._.transform.concat([["r",a,b,e]]));return this},A.scale=function(a,b,e,f){if(this.removed)return this;a=c(a).split(j),a.length-1&&(b=d(a[1]),e=d(a[2]),f=d(a[3])),a=d(a[0]),b==null&&(b=a),f==null&&(e=f);if(e==null||f==null)var g=this.getBBox(1);e=e==null?g.x+g.width/2:e,f=f==null?g.y+g.height/2:f,this.transform(this._.transform.concat([["s",a,b,e,f]]));return this},A.translate=function(a,b){if(this.removed)return this;a=c(a).split(j),a.length-1&&(b=d(a[1])),a=d(a[0])||0,b=+b||0,this.transform(this._.transform.concat([["t",a,b]]));return this},A.transform=function(c){var d=this._;if(c==null)return d.transform;a._extractTransform(this,c),this.clip&&q(this.clip,{transform:this.matrix.invert()}),this.pattern&&s(this),this.node&&q(this.node,{transform:this.matrix});if(d.sx!=1||d.sy!=1){var e=this.attrs[b]("stroke-width")?this.attrs["stroke-width"]:1;this.attr({"stroke-width":e})}return this},A.hide=function(){!this.removed&&this.paper.safari(this.node.style.display="none");return this},A.show=function(){!this.removed&&this.paper.safari(this.node.style.display="");return this},A.remove=function(){if(!this.removed){var b=this.paper;b.__set__&&b.__set__.exclude(this),k.unbind("*.*."+this.id),this.gradient&&b.defs.removeChild(this.gradient),a._tear(this,b),this.node.parentNode.removeChild(this.node);for(var c in this)this[c]=typeof this[c]=="function"?a._removedFactory(c):null;this.removed=!0}},A._getBBox=function(){if(this.node.style.display=="none"){this.show();var a=!0}var b={};try{b=this.node.getBBox()}catch(c){}finally{b=b||{}}a&&this.hide();return b},A.attr=function(c,d){if(this.removed)return this;if(c==null){var e={};for(var f in this.attrs)this.attrs[b](f)&&(e[f]=this.attrs[f]);e.gradient&&e.fill=="none"&&(e.fill=e.gradient)&&delete e.gradient,e.transform=this._.transform;return e}if(d==null&&a.is(c,"string")){if(c=="fill"&&this.attrs.fill=="none"&&this.attrs.gradient)return this.attrs.gradient;if(c=="transform")return this._.transform;var g=c.split(j),h={};for(var i=0,l=g.length;i<l;i++)c=g[i],c in this.attrs?h[c]=this.attrs[c]:a.is(this.paper.customAttributes[c],"function")?h[c]=this.paper.customAttributes[c].def:h[c]=a._availableAttrs[c];return l-1?h:h[g[0]]}if(d==null&&a.is(c,"array")){h={};for(i=0,l=c.length;i<l;i++)h[c[i]]=this.attr(c[i]);return h}if(d!=null){var m={};m[c]=d}else c!=null&&a.is(c,"object")&&(m=c);for(var n in m)k("attr."+n+"."+this.id,this,m[n]);for(n in this.paper.customAttributes)if(this.paper.customAttributes[b](n)&&m[b](n)&&a.is(this.paper.customAttributes[n],"function")){var o=this.paper.customAttributes[n].apply(this,[].concat(m[n]));this.attrs[n]=m[n];for(var p in o)o[b](p)&&(m[p]=o[p])}w(this,m);return this},A.toFront=function(){if(this.removed)return this;this.node.parentNode.tagName.toLowerCase()=="a"?this.node.parentNode.parentNode.appendChild(this.node.parentNode):this.node.parentNode.appendChild(this.node);var b=this.paper;b.top!=this&&a._tofront(this,b);return this},A.toBack=function(){if(this.removed)return this;var b=this.node.parentNode;b.tagName.toLowerCase()=="a"?b.parentNode.insertBefore(this.node.parentNode,this.node.parentNode.parentNode.firstChild):b.firstChild!=this.node&&b.insertBefore(this.node,this.node.parentNode.firstChild),a._toback(this,this.paper);var c=this.paper;return this},A.insertAfter=function(b){if(this.removed)return this;var c=b.node||b[b.length-1].node;c.nextSibling?c.parentNode.insertBefore(this.node,c.nextSibling):c.parentNode.appendChild(this.node),a._insertafter(this,b,this.paper);return this},A.insertBefore=function(b){if(this.removed)return this;var c=b.node||b[0].node;c.parentNode.insertBefore(this.node,c),a._insertbefore(this,b,this.paper);return this},A.blur=function(b){var c=this;if(+b!==0){var d=q("filter"),e=q("feGaussianBlur");c.attrs.blur=b,d.id=a.createUUID(),q(e,{stdDeviation:+b||1.5}),d.appendChild(e),c.paper.defs.appendChild(d),c._blur=d,q(c.node,{filter:"url(#"+d.id+")"})}else c._blur&&(c._blur.parentNode.removeChild(c._blur),delete c._blur,delete c.attrs.blur),c.node.removeAttribute("filter")},a._engine.circle=function(a,b,c,d){var e=q("circle");a.canvas&&a.canvas.appendChild(e);var f=new z(e,a);f.attrs={cx:b,cy:c,r:d,fill:"none",stroke:"#000"},f.type="circle",q(e,f.attrs);return f},a._engine.rect=function(a,b,c,d,e,f){var g=q("rect");a.canvas&&a.canvas.appendChild(g);var h=new z(g,a);h.attrs={x:b,y:c,width:d,height:e,r:f||0,rx:f||0,ry:f||0,fill:"none",stroke:"#000"},h.type="rect",q(g,h.attrs);return h},a._engine.ellipse=function(a,b,c,d,e){var f=q("ellipse");a.canvas&&a.canvas.appendChild(f);var g=new z(f,a);g.attrs={cx:b,cy:c,rx:d,ry:e,fill:"none",stroke:"#000"},g.type="ellipse",q(f,g.attrs);return g},a._engine.image=function(a,b,c,d,e,f){var g=q("image");q(g,{x:c,y:d,width:e,height:f,preserveAspectRatio:"none"}),g.setAttributeNS(n,"href",b),a.canvas&&a.canvas.appendChild(g);var h=new z(g,a);h.attrs={x:c,y:d,width:e,height:f,src:b},h.type="image";return h},a._engine.text=function(b,c,d,e){var f=q("text");b.canvas&&b.canvas.appendChild(f);var g=new z(f,b);g.attrs={x:c,y:d,"text-anchor":"middle",text:e,font:a._availableAttrs.font,stroke:"none",fill:"#000"},g.type="text",w(g,g.attrs);return g},a._engine.setSize=function(a,b){this.width=a||this.width,this.height=b||this.height,this.canvas.setAttribute("width",this.width),this.canvas.setAttribute("height",this.height),this._viewBox&&this.setViewBox.apply(this,this._viewBox);return this},a._engine.create=function(){var b=a._getContainer.apply(0,arguments),c=b&&b.container,d=b.x,e=b.y,f=b.width,g=b.height;if(!c)throw new Error("SVG container not found.");var h=q("svg"),i="overflow:hidden;",j;d=d||0,e=e||0,f=f||512,g=g||342,q(h,{height:g,version:1.1,width:f,xmlns:"http://www.w3.org/2000/svg"}),c==1?(h.style.cssText=i+"position:absolute;left:"+d+"px;top:"+e+"px",a._g.doc.body.appendChild(h),j=1):(h.style.cssText=i+"position:relative",c.firstChild?c.insertBefore(h,c.firstChild):c.appendChild(h)),c=new a._Paper,c.width=f,c.height=g,c.canvas=h,c.clear(),c._left=c._top=0,j&&(c.renderfix=function(){}),c.renderfix();return c},a._engine.setViewBox=function(a,b,c,d,e){k("setViewBox",this,this._viewBox,[a,b,c,d,e]);var f=g(c/this.width,d/this.height),h=this.top,i=e?"meet":"xMinYMin",j,l;a==null?(this._vbSize&&(f=1),delete this._vbSize,j="0 0 "+this.width+m+this.height):(this._vbSize=f,j=a+m+b+m+c+m+d),q(this.canvas,{viewBox:j,preserveAspectRatio:i});while(f&&h)l="stroke-width"in h.attrs?h.attrs["stroke-width"]:1,h.attr({"stroke-width":l}),h._.dirty=1,h._.dirtyT=1,h=h.prev;this._viewBox=[a,b,c,d,!!e];return this},a.prototype.renderfix=function(){var a=this.canvas,b=a.style,c=a.getScreenCTM()||a.createSVGMatrix(),d=-c.e%1,e=-c.f%1;if(d||e)d&&(this._left=(this._left+d)%1,b.left=this._left+"px"),e&&(this._top=(this._top+e)%1,b.top=this._top+"px")},a.prototype.clear=function(){a.eve("clear",this);var b=this.canvas;while(b.firstChild)b.removeChild(b.firstChild);this.bottom=this.top=null,(this.desc=q("desc")).appendChild(a._g.doc.createTextNode("Created with Raphaël "+a.version)),b.appendChild(this.desc),b.appendChild(this.defs=q("defs"))},a.prototype.remove=function(){k("remove",this),this.canvas.parentNode&&this.canvas.parentNode.removeChild(this.canvas);for(var b in this)this[b]=typeof this[b]=="function"?a._removedFactory(b):null};var B=a.st;for(var C in A)A[b](C)&&!B[b](C)&&(B[C]=function(a){return function(){var b=arguments;return this.forEach(function(c){c[a].apply(c,b)})}}(C))}(window.Raphael),window.Raphael.vml&&function(a){var b="hasOwnProperty",c=String,d=parseFloat,e=Math,f=e.round,g=e.max,h=e.min,i=e.abs,j="fill",k=/[, ]+/,l=a.eve,m=" progid:DXImageTransform.Microsoft",n=" ",o="",p={M:"m",L:"l",C:"c",Z:"x",m:"t",l:"r",c:"v",z:"x"},q=/([clmz]),?([^clmz]*)/gi,r=/ progid:\S+Blur\([^\)]+\)/g,s=/-?[^,\s-]+/g,t="position:absolute;left:0;top:0;width:1px;height:1px",u=21600,v={path:1,rect:1,image:1},w={circle:1,ellipse:1},x=function(b){var d=/[ahqstv]/ig,e=a._pathToAbsolute;c(b).match(d)&&(e=a._path2curve),d=/[clmz]/g;if(e==a._pathToAbsolute&&!c(b).match(d)){var g=c(b).replace(q,function(a,b,c){var d=[],e=b.toLowerCase()=="m",g=p[b];c.replace(s,function(a){e&&d.length==2&&(g+=d+p[b=="m"?"l":"L"],d=[]),d.push(f(a*u))});return g+d});return g}var h=e(b),i,j;g=[];for(var k=0,l=h.length;k<l;k++){i=h[k],j=h[k][0].toLowerCase(),j=="z"&&(j="x");for(var m=1,r=i.length;m<r;m++)j+=f(i[m]*u)+(m!=r-1?",":o);g.push(j)}return g.join(n)},y=function(b,c,d){var e=a.matrix();e.rotate(-b,.5,.5);return{dx:e.x(c,d),dy:e.y(c,d)}},z=function(a,b,c,d,e,f){var g=a._,h=a.matrix,k=g.fillpos,l=a.node,m=l.style,o=1,p="",q,r=u/b,s=u/c;m.visibility="hidden";if(!!b&&!!c){l.coordsize=i(r)+n+i(s),m.rotation=f*(b*c<0?-1:1);if(f){var t=y(f,d,e);d=t.dx,e=t.dy}b<0&&(p+="x"),c<0&&(p+=" y")&&(o=-1),m.flip=p,l.coordorigin=d*-r+n+e*-s;if(k||g.fillsize){var v=l.getElementsByTagName(j);v=v&&v[0],l.removeChild(v),k&&(t=y(f,h.x(k[0],k[1]),h.y(k[0],k[1])),v.position=t.dx*o+n+t.dy*o),g.fillsize&&(v.size=g.fillsize[0]*i(b)+n+g.fillsize[1]*i(c)),l.appendChild(v)}m.visibility="visible"}};a.toString=function(){return"Your browser doesn’t support SVG. Falling down to VML.\nYou are running Raphaël "+this.version};var A=function(a,b,d){var e=c(b).toLowerCase().split("-"),f=d?"end":"start",g=e.length,h="classic",i="medium",j="medium";while(g--)switch(e[g]){case"block":case"classic":case"oval":case"diamond":case"open":case"none":h=e[g];break;case"wide":case"narrow":j=e[g];break;case"long":case"short":i=e[g]}var k=a.node.getElementsByTagName("stroke")[0];k[f+"arrow"]=h,k[f+"arrowlength"]=i,k[f+"arrowwidth"]=j},B=function(e,i){e.attrs=e.attrs||{};var l=e.node,m=e.attrs,p=l.style,q,r=v[e.type]&&(i.x!=m.x||i.y!=m.y||i.width!=m.width||i.height!=m.height||i.cx!=m.cx||i.cy!=m.cy||i.rx!=m.rx||i.ry!=m.ry||i.r!=m.r),s=w[e.type]&&(m.cx!=i.cx||m.cy!=i.cy||m.r!=i.r||m.rx!=i.rx||m.ry!=i.ry),t=e;for(var y in i)i[b](y)&&(m[y]=i[y]);r&&(m.path=a._getPath[e.type](e),e._.dirty=1),i.href&&(l.href=i.href),i.title&&(l.title=i.title),i.target&&(l.target=i.target),i.cursor&&(p.cursor=i.cursor),"blur"in i&&e.blur(i.blur);if(i.path&&e.type=="path"||r)l.path=x(~c(m.path).toLowerCase().indexOf("r")?a._pathToAbsolute(m.path):m.path),e.type=="image"&&(e._.fillpos=[m.x,m.y],e._.fillsize=[m.width,m.height],z(e,1,1,0,0,0));"transform"in i&&e.transform(i.transform);if(s){var B=+m.cx,D=+m.cy,E=+m.rx||+m.r||0,G=+m.ry||+m.r||0;l.path=a.format("ar{0},{1},{2},{3},{4},{1},{4},{1}x",f((B-E)*u),f((D-G)*u),f((B+E)*u),f((D+G)*u),f(B*u))}if("clip-rect"in i){var H=c(i["clip-rect"]).split(k);if(H.length==4){H[2]=+H[2]+ +H[0],H[3]=+H[3]+ +H[1];var I=l.clipRect||a._g.doc.createElement("div"),J=I.style;J.clip=a.format("rect({1}px {2}px {3}px {0}px)",H),l.clipRect||(J.position="absolute",J.top=0,J.left=0,J.width=e.paper.width+"px",J.height=e.paper.height+"px",l.parentNode.insertBefore(I,l),I.appendChild(l),l.clipRect=I)}i["clip-rect"]||l.clipRect&&(l.clipRect.style.clip="auto")}if(e.textpath){var K=e.textpath.style;i.font&&(K.font=i.font),i["font-family"]&&(K.fontFamily='"'+i["font-family"].split(",")[0].replace(/^['"]+|['"]+$/g,o)+'"'),i["font-size"]&&(K.fontSize=i["font-size"]),i["font-weight"]&&(K.fontWeight=i["font-weight"]),i["font-style"]&&(K.fontStyle=i["font-style"])}"arrow-start"in i&&A(t,i["arrow-start"]),"arrow-end"in i&&A(t,i["arrow-end"],1);if(i.opacity!=null||i["stroke-width"]!=null||i.fill!=null||i.src!=null||i.stroke!=null||i["stroke-width"]!=null||i["stroke-opacity"]!=null||i["fill-opacity"]!=null||i["stroke-dasharray"]!=null||i["stroke-miterlimit"]!=null||i["stroke-linejoin"]!=null||i["stroke-linecap"]!=null){var L=l.getElementsByTagName(j),M=!1;L=L&&L[0],!L&&(M=L=F(j)),e.type=="image"&&i.src&&(L.src=i.src),i.fill&&(L.on=!0);if(L.on==null||i.fill=="none"||i.fill===null)L.on=!1;if(L.on&&i.fill){var N=c(i.fill).match(a._ISURL);if(N){L.parentNode==l&&l.removeChild(L),L.rotate=!0,L.src=N[1],L.type="tile";var O=e.getBBox(1);L.position=O.x+n+O.y,e._.fillpos=[O.x,O.y],a._preload(N[1],function(){e._.fillsize=[this.offsetWidth,this.offsetHeight]})}else L.color=a.getRGB(i.fill).hex,L.src=o,L.type="solid",a.getRGB(i.fill).error&&(t.type in{circle:1,ellipse:1}||c(i.fill).charAt()!="r")&&C(t,i.fill,L)&&(m.fill="none",m.gradient=i.fill,L.rotate=!1)}if("fill-opacity"in i||"opacity"in i){var P=((+m["fill-opacity"]+1||2)-1)*((+m.opacity+1||2)-1)*((+a.getRGB(i.fill).o+1||2)-1);P=h(g(P,0),1),L.opacity=P,L.src&&(L.color="none")}l.appendChild(L);var Q=l.getElementsByTagName("stroke")&&l.getElementsByTagName("stroke")[0],T=!1;!Q&&(T=Q=F("stroke"));if(i.stroke&&i.stroke!="none"||i["stroke-width"]||i["stroke-opacity"]!=null||i["stroke-dasharray"]||i["stroke-miterlimit"]||i["stroke-linejoin"]||i["stroke-linecap"])Q.on=!0;(i.stroke=="none"||i.stroke===null||Q.on==null||i.stroke==0||i["stroke-width"]==0)&&(Q.on=!1);var U=a.getRGB(i.stroke);Q.on&&i.stroke&&(Q.color=U.hex),P=((+m["stroke-opacity"]+1||2)-1)*((+m.opacity+1||2)-1)*((+U.o+1||2)-1);var V=(d(i["stroke-width"])||1)*.75;P=h(g(P,0),1),i["stroke-width"]==null&&(V=m["stroke-width"]),i["stroke-width"]&&(Q.weight=V),V&&V<1&&(P*=V)&&(Q.weight=1),Q.opacity=P,i["stroke-linejoin"]&&(Q.joinstyle=i["stroke-linejoin"]||"miter"),Q.miterlimit=i["stroke-miterlimit"]||8,i["stroke-linecap"]&&(Q.endcap=i["stroke-linecap"]=="butt"?"flat":i["stroke-linecap"]=="square"?"square":"round");if(i["stroke-dasharray"]){var W={"-":"shortdash",".":"shortdot","-.":"shortdashdot","-..":"shortdashdotdot",". ":"dot","- ":"dash","--":"longdash","- .":"dashdot","--.":"longdashdot","--..":"longdashdotdot"};Q.dashstyle=W[b](i["stroke-dasharray"])?W[i["stroke-dasharray"]]:o}T&&l.appendChild(Q)}if(t.type=="text"){t.paper.canvas.style.display=o;var X=t.paper.span,Y=100,Z=m.font&&m.font.match(/\d+(?:\.\d*)?(?=px)/);p=X.style,m.font&&(p.font=m.font),m["font-family"]&&(p.fontFamily=m["font-family"]),m["font-weight"]&&(p.fontWeight=m["font-weight"]),m["font-style"]&&(p.fontStyle=m["font-style"]),Z=d(m["font-size"]||Z&&Z[0])||10,p.fontSize=Z*Y+"px",t.textpath.string&&(X.innerHTML=c(t.textpath.string).replace(/</g,"&#60;").replace(/&/g,"&#38;").replace(/\n/g,"<br>"));var $=X.getBoundingClientRect();t.W=m.w=($.right-$.left)/Y,t.H=m.h=($.bottom-$.top)/Y,t.X=m.x,t.Y=m.y+t.H/2,("x"in i||"y"in i)&&(t.path.v=a.format("m{0},{1}l{2},{1}",f(m.x*u),f(m.y*u),f(m.x*u)+1));var _=["x","y","text","font","font-family","font-weight","font-style","font-size"];for(var ba=0,bb=_.length;ba<bb;ba++)if(_[ba]in i){t._.dirty=1;break}switch(m["text-anchor"]){case"start":t.textpath.style["v-text-align"]="left",t.bbx=t.W/2;break;case"end":t.textpath.style["v-text-align"]="right",t.bbx=-t.W/2;break;default:t.textpath.style["v-text-align"]="center",t.bbx=0}t.textpath.style["v-text-kern"]=!0}},C=function(b,f,g){b.attrs=b.attrs||{};var h=b.attrs,i=Math.pow,j,k,l="linear",m=".5 .5";b.attrs.gradient=f,f=c(f).replace(a._radial_gradient,function(a,b,c){l="radial",b&&c&&(b=d(b),c=d(c),i(b-.5,2)+i(c-.5,2)>.25&&(c=e.sqrt(.25-i(b-.5,2))*((c>.5)*2-1)+.5),m=b+n+c);return o}),f=f.split(/\s*\-\s*/);if(l=="linear"){var p=f.shift();p=-d(p);if(isNaN(p))return null}var q=a._parseDots(f);if(!q)return null;b=b.shape||b.node;if(q.length){b.removeChild(g),g.on=!0,g.method="none",g.color=q[0].color,g.color2=q[q.length-1].color;var r=[];for(var s=0,t=q.length;s<t;s++)q[s].offset&&r.push(q[s].offset+n+q[s].color);g.colors=r.length?r.join():"0% "+g.color,l=="radial"?(g.type="gradientTitle",g.focus="100%",g.focussize="0 0",g.focusposition=m,g.angle=0):(g.type="gradient",g.angle=(270-p)%360),b.appendChild(g)}return 1},D=function(b,c){this[0]=this.node=b,b.raphael=!0,this.id=a._oid++,b.raphaelid=this.id,this.X=0,this.Y=0,this.attrs={},this.paper=c,this.matrix=a.matrix(),this._={transform:[],sx:1,sy:1,dx:0,dy:0,deg:0,dirty:1,dirtyT:1},!c.bottom&&(c.bottom=this),this.prev=c.top,c.top&&(c.top.next=this),c.top=this,this.next=null},E=a.el;D.prototype=E,E.constructor=D,E.transform=function(b){if(b==null)return this._.transform;var d=this.paper._viewBoxShift,e=d?"s"+[d.scale,d.scale]+"-1-1t"+[d.dx,d.dy]:o,f;d&&(f=b=c(b).replace(/\.{3}|\u2026/g,this._.transform||o)),a._extractTransform(this,e+b);var g=this.matrix.clone(),h=this.skew,i=this.node,j,k=~c(this.attrs.fill).indexOf("-"),l=!c(this.attrs.fill).indexOf("url(");g.translate(-0.5,-0.5);if(l||k||this.type=="image"){h.matrix="1 0 0 1",h.offset="0 0",j=g.split();if(k&&j.noRotation||!j.isSimple){i.style.filter=g.toFilter();var m=this.getBBox(),p=this.getBBox(1),q=m.x-p.x,r=m.y-p.y;i.coordorigin=q*-u+n+r*-u,z(this,1,1,q,r,0)}else i.style.filter=o,z(this,j.scalex,j.scaley,j.dx,j.dy,j.rotate)}else i.style.filter=o,h.matrix=c(g),h.offset=g.offset();f&&(this._.transform=f);return this},E.rotate=function(a,b,e){if(this.removed)return this;if(a!=null){a=c(a).split(k),a.length-1&&(b=d(a[1]),e=d(a[2])),a=d(a[0]),e==null&&(b=e);if(b==null||e==null){var f=this.getBBox(1);b=f.x+f.width/2,e=f.y+f.height/2}this._.dirtyT=1,this.transform(this._.transform.concat([["r",a,b,e]]));return this}},E.translate=function(a,b){if(this.removed)return this;a=c(a).split(k),a.length-1&&(b=d(a[1])),a=d(a[0])||0,b=+b||0,this._.bbox&&(this._.bbox.x+=a,this._.bbox.y+=b),this.transform(this._.transform.concat([["t",a,b]]));return this},E.scale=function(a,b,e,f){if(this.removed)return this;a=c(a).split(k),a.length-1&&(b=d(a[1]),e=d(a[2]),f=d(a[3]),isNaN(e)&&(e=null),isNaN(f)&&(f=null)),a=d(a[0]),b==null&&(b=a),f==null&&(e=f);if(e==null||f==null)var g=this.getBBox(1);e=e==null?g.x+g.width/2:e,f=f==null?g.y+g.height/2:f,this.transform(this._.transform.concat([["s",a,b,e,f]])),this._.dirtyT=1;return this},E.hide=function(){!this.removed&&(this.node.style.display="none");return this},E.show=function(){!this.removed&&(this.node.style.display=o);return this},E._getBBox=function(){if(this.removed)return{};return{x:this.X+(this.bbx||0)-this.W/2,y:this.Y-this.H,width:this.W,height:this.H}},E.remove=function(){if(!this.removed){this.paper.__set__&&this.paper.__set__.exclude(this),a.eve.unbind("*.*."+this.id),a._tear(this,this.paper),this.node.parentNode.removeChild(this.node),this.shape&&this.shape.parentNode.removeChild(this.shape);for(var b in this)this[b]=typeof this[b]=="function"?a._removedFactory(b):null;this.removed=!0}},E.attr=function(c,d){if(this.removed)return this;if(c==null){var e={};for(var f in this.attrs)this.attrs[b](f)&&(e[f]=this.attrs[f]);e.gradient&&e.fill=="none"&&(e.fill=e.gradient)&&delete e.gradient,e.transform=this._.transform;return e}if(d==null&&a.is(c,"string")){if(c==j&&this.attrs.fill=="none"&&this.attrs.gradient)return this.attrs.gradient;var g=c.split(k),h={};for(var i=0,m=g.length;i<m;i++)c=g[i],c in this.attrs?h[c]=this.attrs[c]:a.is(this.paper.customAttributes[c],"function")?h[c]=this.paper.customAttributes[c].def:h[c]=a._availableAttrs[c];return m-1?h:h[g[0]]}if(this.attrs&&d==null&&a.is(c,"array")){h={};for(i=0,m=c.length;i<m;i++)h[c[i]]=this.attr(c[i]);return h}var n;d!=null&&(n={},n[c]=d),d==null&&a.is(c,"object")&&(n=c);for(var o in n)l("attr."+o+"."+this.id,this,n[o]);if(n){for(o in this.paper.customAttributes)if(this.paper.customAttributes[b](o)&&n[b](o)&&a.is(this.paper.customAttributes[o],"function")){var p=this.paper.customAttributes[o].apply(this,[].concat(n[o]));this.attrs[o]=n[o];for(var q in p)p[b](q)&&(n[q]=p[q])}n.text&&this.type=="text"&&(this.textpath.string=n.text),B(this,n)}return this},E.toFront=function(){!this.removed&&this.node.parentNode.appendChild(this.node),this.paper&&this.paper.top!=this&&a._tofront(this,this.paper);return this},E.toBack=function(){if(this.removed)return this;this.node.parentNode.firstChild!=this.node&&(this.node.parentNode.insertBefore(this.node,this.node.parentNode.firstChild),a._toback(this,this.paper));return this},E.insertAfter=function(b){if(this.removed)return this;b.constructor==a.st.constructor&&(b=b[b.length-1]),b.node.nextSibling?b.node.parentNode.insertBefore(this.node,b.node.nextSibling):b.node.parentNode.appendChild(this.node),a._insertafter(this,b,this.paper);return this},E.insertBefore=function(b){if(this.removed)return this;b.constructor==a.st.constructor&&(b=b[0]),b.node.parentNode.insertBefore(this.node,b.node),a._insertbefore(this,b,this.paper);return this},E.blur=function(b){var c=this.node.runtimeStyle,d=c.filter;d=d.replace(r,o),+b!==0?(this.attrs.blur=b,c.filter=d+n+m+".Blur(pixelradius="+(+b||1.5)+")",c.margin=a.format("-{0}px 0 0 -{0}px",f(+b||1.5))):(c.filter=d,c.margin=0,delete this.attrs.blur)},a._engine.path=function(a,b){var c=F("shape");c.style.cssText=t,c.coordsize=u+n+u,c.coordorigin=b.coordorigin;var d=new D(c,b),e={fill:"none",stroke:"#000"};a&&(e.path=a),d.type="path",d.path=[],d.Path=o,B(d,e),b.canvas.appendChild(c);var f=F("skew");f.on=!0,c.appendChild(f),d.skew=f,d.transform(o);return d},a._engine.rect=function(b,c,d,e,f,g){var h=a._rectPath(c,d,e,f,g),i=b.path(h),j=i.attrs;i.X=j.x=c,i.Y=j.y=d,i.W=j.width=e,i.H=j.height=f,j.r=g,j.path=h,i.type="rect";return i},a._engine.ellipse=function(a,b,c,d,e){var f=a.path(),g=f.attrs;f.X=b-d,f.Y=c-e,f.W=d*2,f.H=e*2,f.type="ellipse",B(f,{cx:b,cy:c,rx:d,ry:e});return f},a._engine.circle=function(a,b,c,d){var e=a.path(),f=e.attrs;e.X=b-d,e.Y=c-d,e.W=e.H=d*2,e.type="circle",B(e,{cx:b,cy:c,r:d});return e},a._engine.image=function(b,c,d,e,f,g){var h=a._rectPath(d,e,f,g),i=b.path(h).attr({stroke:"none"}),k=i.attrs,l=i.node,m=l.getElementsByTagName(j)[0];k.src=c,i.X=k.x=d,i.Y=k.y=e,i.W=k.width=f,i.H=k.height=g,k.path=h,i.type="image",m.parentNode==l&&l.removeChild(m),m.rotate=!0,m.src=c,m.type="tile",i._.fillpos=[d,e],i._.fillsize=[f,g],l.appendChild(m),z(i,1,1,0,0,0);return i},a._engine.text=function(b,d,e,g){var h=F("shape"),i=F("path"),j=F("textpath");d=d||0,e=e||0,g=g||"",i.v=a.format("m{0},{1}l{2},{1}",f(d*u),f(e*u),f(d*u)+1),i.textpathok=!0,j.string=c(g),j.on=!0,h.style.cssText=t,h.coordsize=u+n+u,h.coordorigin="0 0";var k=new D(h,b),l={fill:"#000",stroke:"none",font:a._availableAttrs.font,text:g};k.shape=h,k.path=i,k.textpath=j,k.type="text",k.attrs.text=c(g),k.attrs.x=d,k.attrs.y=e,k.attrs.w=1,k.attrs.h=1,B(k,l),h.appendChild(j),h.appendChild(i),b.canvas.appendChild(h);var m=F("skew");m.on=!0,h.appendChild(m),k.skew=m,k.transform(o);return k},a._engine.setSize=function(b,c){var d=this.canvas.style;this.width=b,this.height=c,b==+b&&(b+="px"),c==+c&&(c+="px"),d.width=b,d.height=c,d.clip="rect(0 "+b+" "+c+" 0)",this._viewBox&&a._engine.setViewBox.apply(this,this._viewBox);return this},a._engine.setViewBox=function(b,c,d,e,f){a.eve("setViewBox",this,this._viewBox,[b,c,d,e,f]);var h=this.width,i=this.height,j=1/g(d/h,e/i),k,l;f&&(k=i/e,l=h/d,d*k<h&&(b-=(h-d*k)/2/k),e*l<i&&(c-=(i-e*l)/2/l)),this._viewBox=[b,c,d,e,!!f],this._viewBoxShift={dx:-b,dy:-c,scale:j},this.forEach(function(a){a.transform("...")});return this};var F;a._engine.initWin=function(a){var b=a.document;b.createStyleSheet().addRule(".rvml","behavior:url(#default#VML)");try{!b.namespaces.rvml&&b.namespaces.add("rvml","urn:schemas-microsoft-com:vml"),F=function(a){return b.createElement("<rvml:"+a+' class="rvml">')}}catch(c){F=function(a){return b.createElement("<"+a+' xmlns="urn:schemas-microsoft.com:vml" class="rvml">')}}},a._engine.initWin(a._g.win),a._engine.create=function(){var b=a._getContainer.apply(0,arguments),c=b.container,d=b.height,e,f=b.width,g=b.x,h=b.y;if(!c)throw new Error("VML container not found.");var i=new a._Paper,j=i.canvas=a._g.doc.createElement("div"),k=j.style;g=g||0,h=h||0,f=f||512,d=d||342,i.width=f,i.height=d,f==+f&&(f+="px"),d==+d&&(d+="px"),i.coordsize=u*1e3+n+u*1e3,i.coordorigin="0 0",i.span=a._g.doc.createElement("span"),i.span.style.cssText="position:absolute;left:-9999em;top:-9999em;padding:0;margin:0;line-height:1;",j.appendChild(i.span),k.cssText=a.format("top:0;left:0;width:{0};height:{1};display:inline-block;position:relative;clip:rect(0 {0} {1} 0);overflow:hidden",f,d),c==1?(a._g.doc.body.appendChild(j),k.left=g+"px",k.top=h+"px",k.position="absolute"):c.firstChild?c.insertBefore(j,c.firstChild):c.appendChild(j),i.renderfix=function(){};return i},a.prototype.clear=function(){a.eve("clear",this),this.canvas.innerHTML=o,this.span=a._g.doc.createElement("span"),this.span.style.cssText="position:absolute;left:-9999em;top:-9999em;padding:0;margin:0;line-height:1;display:inline;",this.canvas.appendChild(this.span),this.bottom=this.top=null},a.prototype.remove=function(){a.eve("remove",this),this.canvas.parentNode.removeChild(this.canvas);for(var b in this)this[b]=typeof this[b]=="function"?a._removedFactory(b):null;return!0};var G=a.st;for(var H in E)E[b](H)&&!G[b](H)&&(G[H]=function(a){return function(){var b=arguments;return this.forEach(function(c){c[a].apply(c,b)})}}(H))}(window.Raphael);
(function(){var e,t,n,r,i=[].slice,s={}.hasOwnProperty,o=function(e,t){function r(){this.constructor=e}for(var n in t)s.call(t,n)&&(e[n]=t[n]);return r.prototype=t.prototype,e.prototype=new r,e.__super__=t.prototype,e},u=function(e,t){return function(){return e.apply(t,arguments)}},a=[].indexOf||function(e){for(var t=0,n=this.length;t<n;t++)if(t in this&&this[t]===e)return t;return-1};t=window.Morris={},e=jQuery,t.EventEmitter=function(){function e(){}return e.prototype.on=function(e,t){return this.handlers==null&&(this.handlers={}),this.handlers[e]==null&&(this.handlers[e]=[]),this.handlers[e].push(t),this},e.prototype.fire=function(){var e,t,n,r,s,o,u;n=arguments[0],e=2<=arguments.length?i.call(arguments,1):[];if(this.handlers!=null&&this.handlers[n]!=null){o=this.handlers[n],u=[];for(r=0,s=o.length;r<s;r++)t=o[r],u.push(t.apply(null,e));return u}},e}(),t.commas=function(e){var t,n,r,i;return e!=null?(r=e<0?"-":"",t=Math.abs(e),n=Math.floor(t).toFixed(0),r+=n.replace(/(?=(?:\d{3})+$)(?!^)/g,","),i=t.toString(),i.length>n.length&&(r+=i.slice(n.length)),r):"-"},t.pad2=function(e){return(e<10?"0":"")+e},t.Grid=function(n){function r(t){var n=this;typeof t.element=="string"?this.el=e(document.getElementById(t.element)):this.el=e(t.element);if(this.el==null||this.el.length===0)throw new Error("Graph container element not found");this.el.css("position")==="static"&&this.el.css("position","relative"),this.options=e.extend({},this.gridDefaults,this.defaults||{},t),typeof this.options.units=="string"&&(this.options.postUnits=t.units),this.raphael=new Raphael(this.el[0]),this.elementWidth=null,this.elementHeight=null,this.dirty=!1,this.init&&this.init(),this.setData(this.options.data),this.el.bind("mousemove",function(e){var t;return t=n.el.offset(),n.fire("hovermove",e.pageX-t.left,e.pageY-t.top)}),this.el.bind("mouseout",function(e){return n.fire("hoverout")}),this.el.bind("touchstart touchmove touchend",function(e){var t,r;return r=e.originalEvent.touches[0]||e.originalEvent.changedTouches[0],t=n.el.offset(),n.fire("hover",r.pageX-t.left,r.pageY-t.top),r}),this.el.bind("click",function(e){var t;return t=n.el.offset(),n.fire("gridclick",e.pageX-t.left,e.pageY-t.top)}),this.postInit&&this.postInit()}return o(r,n),r.prototype.gridDefaults={dateFormat:null,axes:!0,grid:!0,gridLineColor:"#aaa",gridStrokeWidth:.5,gridTextColor:"#888",gridTextSize:12,gridTextFamily:"sans-serif",gridTextWeight:"normal",hideHover:!1,yLabelFormat:null,xLabelAngle:0,numLines:5,padding:25,parseTime:!0,postUnits:"",preUnits:"",ymax:"auto",ymin:"auto 0",goals:[],goalStrokeWidth:1,goalLineColors:["#666633","#999966","#cc6666","#663333"],events:[],eventStrokeWidth:1,eventLineColors:["#005a04","#ccffbb","#3a5f0b","#005502"]},r.prototype.setData=function(e,n){var r,i,s,o,u,a,f,l,c,h,p,d,v,m;n==null&&(n=!0),this.options.data=e;if(e==null||e.length===0){this.data=[],this.raphael.clear(),this.hover!=null&&this.hover.hide();return}d=this.cumulative?0:null,v=this.cumulative?0:null,this.options.goals.length>0&&(u=Math.min.apply(null,this.options.goals),o=Math.max.apply(null,this.options.goals),v=v!=null?Math.min(v,u):u,d=d!=null?Math.max(d,o):o),this.data=function(){var n,r,o;o=[];for(s=n=0,r=e.length;n<r;s=++n)f=e[s],a={},a.label=f[this.options.xkey],this.options.parseTime?(a.x=t.parseDate(a.label),this.options.dateFormat?a.label=this.options.dateFormat(a.x):typeof a.label=="number"&&(a.label=(new Date(a.label)).toString())):(a.x=s,this.options.xLabelFormat&&(a.label=this.options.xLabelFormat(a))),c=0,a.y=function(){var e,t,n,r;n=this.options.ykeys,r=[];for(i=e=0,t=n.length;e<t;i=++e)p=n[i],m=f[p],typeof m=="string"&&(m=parseFloat(m)),m!=null&&typeof m!="number"&&(m=null),m!=null&&(this.cumulative?c+=m:d!=null?(d=Math.max(m,d),v=Math.min(m,v)):d=v=m),this.cumulative&&c!=null&&(d=Math.max(c,d),v=Math.min(c,v)),r.push(m);return r}.call(this),o.push(a);return o}.call(this),this.options.parseTime&&(this.data=this.data.sort(function(e,t){return(e.x>t.x)-(t.x>e.x)})),this.xmin=this.data[0].x,this.xmax=this.data[this.data.length-1].x,this.events=[],this.options.parseTime&&this.options.events.length>0&&(this.events=function(){var e,n,i,s;i=this.options.events,s=[];for(e=0,n=i.length;e<n;e++)r=i[e],s.push(t.parseDate(r));return s}.call(this),this.xmax=Math.max(this.xmax,Math.max.apply(null,this.events)),this.xmin=Math.min(this.xmin,Math.min.apply(null,this.events))),this.xmin===this.xmax&&(this.xmin-=1,this.xmax+=1),this.ymin=this.yboundary("min",v),this.ymax=this.yboundary("max",d),this.ymin===this.ymax&&(v&&(this.ymin-=1),this.ymax+=1);if(this.options.axes===!0||this.options.grid===!0)this.options.ymax===this.gridDefaults.ymax&&this.options.ymin===this.gridDefaults.ymin?(this.grid=this.autoGridLines(this.ymin,this.ymax,this.options.numLines),this.ymin=Math.min(this.ymin,this.grid[0]),this.ymax=Math.max(this.ymax,this.grid[this.grid.length-1])):(l=(this.ymax-this.ymin)/(this.options.numLines-1),this.grid=function(){var e,t,n,r;r=[];for(h=e=t=this.ymin,n=this.ymax;t<=n?e<=n:e>=n;h=e+=l)r.push(h);return r}.call(this));this.dirty=!0;if(n)return this.redraw()},r.prototype.yboundary=function(e,t){var n,r;return n=this.options["y"+e],typeof n=="string"?n.slice(0,4)==="auto"?n.length>5?(r=parseInt(n.slice(5),10),t==null?r:Math[e](t,r)):t!=null?t:0:parseInt(n,10):n},r.prototype.autoGridLines=function(e,t,n){var r,i,s,o,u,a,f,l,c;return u=t-e,c=Math.floor(Math.log(u)/Math.log(10)),f=Math.pow(10,c),i=Math.floor(e/f)*f,r=Math.ceil(t/f)*f,a=(r-i)/(n-1),f===1&&a>1&&Math.ceil(a)!==a&&(a=Math.ceil(a),r=i+a*(n-1)),i<0&&r>0&&(i=Math.floor(e/a)*a,r=Math.ceil(t/a)*a),a<1?(o=Math.floor(Math.log(a)/Math.log(10)),s=function(){var e,t;t=[];for(l=e=i;i<=r?e<=r:e>=r;l=e+=a)t.push(parseFloat(l.toFixed(1-o)));return t}()):s=function(){var e,t;t=[];for(l=e=i;i<=r?e<=r:e>=r;l=e+=a)t.push(l);return t}(),s},r.prototype._calc=function(){var e,t,n,r,i,s;i=this.el.width(),n=this.el.height();if(this.elementWidth!==i||this.elementHeight!==n||this.dirty){this.elementWidth=i,this.elementHeight=n,this.dirty=!1,this.left=this.options.padding,this.right=this.elementWidth-this.options.padding,this.top=this.options.padding,this.bottom=this.elementHeight-this.options.padding,this.options.axes&&(s=function(){var e,n,r,i;r=this.grid,i=[];for(e=0,n=r.length;e<n;e++)t=r[e],i.push(this.measureText(this.yAxisFormat(t)).width);return i}.call(this),this.left+=Math.max.apply(Math,s),e=function(){var e,t,n;n=[];for(r=e=0,t=this.data.length;0<=t?e<t:e>t;r=0<=t?++e:--e)n.push(this.measureText(this.data[r].text,-this.options.xLabelAngle).height);return n}.call(this),this.bottom-=Math.max.apply(Math,e)),this.width=Math.max(1,this.right-this.left),this.height=Math.max(1,this.bottom-this.top),this.dx=this.width/(this.xmax-this.xmin),this.dy=this.height/(this.ymax-this.ymin);if(this.calc)return this.calc()}},r.prototype.transY=function(e){return this.bottom-(e-this.ymin)*this.dy},r.prototype.transX=function(e){return this.data.length===1?(this.left+this.right)/2:this.left+(e-this.xmin)*this.dx},r.prototype.redraw=function(){this.raphael.clear(),this._calc(),this.drawGrid(),this.drawGoals(),this.drawEvents();if(this.draw)return this.draw()},r.prototype.measureText=function(e,t){var n,r;return t==null&&(t=0),r=this.raphael.text(100,100,e).attr("font-size",this.options.gridTextSize).attr("font-family",this.options.gridTextFamily).attr("font-weight",this.options.gridTextWeight).rotate(t),n=r.getBBox(),r.remove(),n},r.prototype.yAxisFormat=function(e){return this.yLabelFormat(e)},r.prototype.yLabelFormat=function(e){return typeof this.options.yLabelFormat=="function"?this.options.yLabelFormat(e):""+this.options.preUnits+t.commas(e)+this.options.postUnits},r.prototype.updateHover=function(e,t){var n,r;n=this.hitTest(e,t);if(n!=null)return(r=this.hover).update.apply(r,n)},r.prototype.drawGrid=function(){var e,t,n,r,i,s;if(this.options.grid===!1&&this.options.axes===!1)return;i=this.grid,s=[];for(n=0,r=i.length;n<r;n++)e=i[n],t=this.transY(e),this.options.axes&&this.drawYAxisLabel(this.left-this.options.padding/2,t,this.yAxisFormat(e)),this.options.grid?s.push(this.drawGridLine("M"+this.left+","+t+"H"+(this.left+this.width))):s.push(void 0);return s},r.prototype.drawGoals=function(){var e,t,n,r,i,s,o;s=this.options.goals,o=[];for(n=r=0,i=s.length;r<i;n=++r)t=s[n],e=this.options.goalLineColors[n%this.options.goalLineColors.length],o.push(this.drawGoal(t,e));return o},r.prototype.drawEvents=function(){var e,t,n,r,i,s,o;s=this.events,o=[];for(n=r=0,i=s.length;r<i;n=++r)t=s[n],e=this.options.eventLineColors[n%this.options.eventLineColors.length],o.push(this.drawEvent(t,e));return o},r.prototype.drawGoal=function(e,t){return this.raphael.path("M"+this.left+","+this.transY(e)+"H"+this.right).attr("stroke",t).attr("stroke-width",this.options.goalStrokeWidth)},r.prototype.drawEvent=function(e,t){return this.raphael.path("M"+this.transX(e)+","+this.bottom+"V"+this.top).attr("stroke",t).attr("stroke-width",this.options.eventStrokeWidth)},r.prototype.drawYAxisLabel=function(e,t,n){return this.raphael.text(e,t,n).attr("font-size",this.options.gridTextSize).attr("font-family",this.options.gridTextFamily).attr("font-weight",this.options.gridTextWeight).attr("fill",this.options.gridTextColor).attr("text-anchor","end")},r.prototype.drawGridLine=function(e){return this.raphael.path(e).attr("stroke",this.options.gridLineColor).attr("stroke-width",this.options.gridStrokeWidth)},r}(t.EventEmitter),t.parseDate=function(e){var t,n,r,i,s,o,u,a,f,l,c;return typeof e=="number"?e:(n=e.match(/^(\d+) Q(\d)$/),i=e.match(/^(\d+)-(\d+)$/),s=e.match(/^(\d+)-(\d+)-(\d+)$/),u=e.match(/^(\d+) W(\d+)$/),a=e.match(/^(\d+)-(\d+)-(\d+)[ T](\d+):(\d+)(Z|([+-])(\d\d):?(\d\d))?$/),f=e.match(/^(\d+)-(\d+)-(\d+)[ T](\d+):(\d+):(\d+(\.\d+)?)(Z|([+-])(\d\d):?(\d\d))?$/),n?(new Date(parseInt(n[1],10),parseInt(n[2],10)*3-1,1)).getTime():i?(new Date(parseInt(i[1],10),parseInt(i[2],10)-1,1)).getTime():s?(new Date(parseInt(s[1],10),parseInt(s[2],10)-1,parseInt(s[3],10))).getTime():u?(l=new Date(parseInt(u[1],10),0,1),l.getDay()!==4&&l.setMonth(0,1+(4-l.getDay()+7)%7),l.getTime()+parseInt(u[2],10)*6048e5):a?a[6]?(o=0,a[6]!=="Z"&&(o=parseInt(a[8],10)*60+parseInt(a[9],10),a[7]==="+"&&(o=0-o)),Date.UTC(parseInt(a[1],10),parseInt(a[2],10)-1,parseInt(a[3],10),parseInt(a[4],10),parseInt(a[5],10)+o)):(new Date(parseInt(a[1],10),parseInt(a[2],10)-1,parseInt(a[3],10),parseInt(a[4],10),parseInt(a[5],10))).getTime():f?(c=parseFloat(f[6]),t=Math.floor(c),r=Math.round((c-t)*1e3),f[8]?(o=0,f[8]!=="Z"&&(o=parseInt(f[10],10)*60+parseInt(f[11],10),f[9]==="+"&&(o=0-o)),Date.UTC(parseInt(f[1],10),parseInt(f[2],10)-1,parseInt(f[3],10),parseInt(f[4],10),parseInt(f[5],10)+o,t,r)):(new Date(parseInt(f[1],10),parseInt(f[2],10)-1,parseInt(f[3],10),parseInt(f[4],10),parseInt(f[5],10),t,r)).getTime()):(new Date(parseInt(e,10),0,1)).getTime())},t.Hover=function(){function n(n){n==null&&(n={}),this.options=e.extend({},t.Hover.defaults,n),this.el=e("<div class='"+this.options["class"]+"'></div>"),this.el.hide(),this.options.parent.append(this.el)}return n.defaults={"class":"morris-hover morris-default-style"},n.prototype.update=function(e,t,n){return this.html(e),this.show(),this.moveTo(t,n)},n.prototype.html=function(e){return this.el.html(e)},n.prototype.moveTo=function(e,t){var n,r,i,s,o,u;return o=this.options.parent.innerWidth(),s=this.options.parent.innerHeight(),r=this.el.outerWidth(),n=this.el.outerHeight(),i=Math.min(Math.max(0,e-r/2),o-r),t!=null?(u=t-n-10,u<0&&(u=t+10,u+n>s&&(u=s/2-n/2))):u=s/2-n/2,this.el.css({left:i+"px",top:parseInt(u)+"px"})},n.prototype.show=function(){return this.el.show()},n.prototype.hide=function(){return this.el.hide()},n}(),t.Line=function(e){function n(e){this.hilight=u(this.hilight,this),this.onHoverOut=u(this.onHoverOut,this),this.onHoverMove=u(this.onHoverMove,this),this.onGridClick=u(this.onGridClick,this);if(!(this instanceof t.Line))return new t.Line(e);n.__super__.constructor.call(this,e)}return o(n,e),n.prototype.init=function(){this.pointGrow=Raphael.animation({r:this.options.pointSize+3},25,"linear"),this.pointShrink=Raphael.animation({r:this.options.pointSize},25,"linear");if(this.options.hideHover!=="always")return this.hover=new t.Hover({parent:this.el}),this.on("hovermove",this.onHoverMove),this.on("hoverout",this.onHoverOut),this.on("gridclick",this.onGridClick)},n.prototype.defaults={lineWidth:3,pointSize:4,lineColors:["#0b62a4","#7A92A3","#4da74d","#afd8f8","#edc240","#cb4b4b","#9440ed"],pointWidths:[1],pointStrokeColors:["#ffffff"],pointFillColors:[],smooth:!0,xLabels:"auto",xLabelFormat:null,xLabelMargin:24,continuousLine:!0,hideHover:!1},n.prototype.calc=function(){return this.calcPoints(),this.generatePaths()},n.prototype.calcPoints=function(){var e,t,n,r,i,s;i=this.data,s=[];for(n=0,r=i.length;n<r;n++)e=i[n],e._x=this.transX(e.x),e._y=function(){var n,r,i,s;i=e.y,s=[];for(n=0,r=i.length;n<r;n++)t=i[n],t!=null?s.push(this.transY(t)):s.push(t);return s}.call(this),s.push(e._ymax=Math.min.apply(null,[this.bottom].concat(function(){var n,r,i,s;i=e._y,s=[];for(n=0,r=i.length;n<r;n++)t=i[n],t!=null&&s.push(t);return s}())));return s},n.prototype.hitTest=function(e,t){var n,r,i,s,o;if(this.data.length===0)return null;o=this.data.slice(1);for(n=i=0,s=o.length;i<s;n=++i){r=o[n];if(e<(r._x+this.data[n]._x)/2)break}return n},n.prototype.onGridClick=function(e,t){var n;return n=this.hitTest(e,t),this.fire("click",n,this.options.data[n],e,t)},n.prototype.onHoverMove=function(e,t){var n;return n=this.hitTest(e,t),this.displayHoverForRow(n)},n.prototype.onHoverOut=function(){if(this.options.hideHover!==!1)return this.displayHoverForRow(null)},n.prototype.displayHoverForRow=function(e){var t;return e!=null?((t=this.hover).update.apply(t,this.hoverContentForRow(e)),this.hilight(e)):(this.hover.hide(),this.hilight())},n.prototype.hoverContentForRow=function(e){var t,n,r,i,s,o,u;r=this.data[e],t="<div class='morris-hover-row-label'>"+r.label+"</div>",u=r.y;for(n=s=0,o=u.length;s<o;n=++s)i=u[n],t+="<div class='morris-hover-point' style='color: "+this.colorFor(r,n,"label")+"'>\n  "+this.options.labels[n]+":\n  "+this.yLabelFormat(i)+"\n</div>";return typeof this.options.hoverCallback=="function"&&(t=this.options.hoverCallback(e,this.options,t)),[t,r._x,r._ymax]},n.prototype.generatePaths=function(){var e,n,r,i,s;return this.paths=function(){var o,u,f,l;l=[];for(r=o=0,u=this.options.ykeys.length;0<=u?o<u:o>u;r=0<=u?++o:--o)s=this.options.smooth===!0||(f=this.options.ykeys[r],a.call(this.options.smooth,f)>=0),n=function(){var e,t,n,s;n=this.data,s=[];for(e=0,t=n.length;e<t;e++)i=n[e],i._y[r]!==void 0&&s.push({x:i._x,y:i._y[r]});return s}.call(this),this.options.continuousLine&&(n=function(){var t,r,i;i=[];for(t=0,r=n.length;t<r;t++)e=n[t],e.y!==null&&i.push(e);return i}()),n.length>1?l.push(t.Line.createPath(n,s,this.bottom)):l.push(null);return l}.call(this)},n.prototype.draw=function(){this.options.axes&&this.drawXAxis(),this.drawSeries();if(this.options.hideHover===!1)return this.displayHoverForRow(this.data.length-1)},n.prototype.drawXAxis=function(){var e,n,r,i,s,o,u,a,f,l,c=this;u=this.bottom+this.options.padding/2,s=null,i=null,e=function(e,t){var n,r,o,a,f;return n=c.drawXAxisLabel(c.transX(t),u,e),f=n.getBBox(),n.transform("r"+ -c.options.xLabelAngle),r=n.getBBox(),n.transform("t0,"+r.height/2+"..."),c.options.xLabelAngle!==0&&(a=-0.5*f.width*Math.cos(c.options.xLabelAngle*Math.PI/180),n.transform("t"+a+",0...")),r=n.getBBox(),(s==null||s>=r.x+r.width||i!=null&&i>=r.x)&&r.x>=0&&r.x+r.width<c.el.width()?(c.options.xLabelAngle!==0&&(o=1.25*c.options.gridTextSize/Math.sin(c.options.xLabelAngle*Math.PI/180),i=r.x-o),s=r.x-c.options.xLabelMargin):n.remove()},this.options.parseTime?this.data.length===1&&this.options.xLabels==="auto"?r=[[this.data[0].label,this.data[0].x]]:r=t.labelSeries(this.xmin,this.xmax,this.width,this.options.xLabels,this.options.xLabelFormat):r=function(){var e,t,n,r;n=this.data,r=[];for(e=0,t=n.length;e<t;e++)o=n[e],r.push([o.label,o.x]);return r}.call(this),r.reverse(),l=[];for(a=0,f=r.length;a<f;a++)n=r[a],l.push(e(n[0],n[1]));return l},n.prototype.drawSeries=function(){var e,t,n,r,i,s;this.seriesPoints=[];for(e=t=r=this.options.ykeys.length-1;r<=0?t<=0:t>=0;e=r<=0?++t:--t)this._drawLineFor(e);s=[];for(e=n=i=this.options.ykeys.length-1;i<=0?n<=0:n>=0;e=i<=0?++n:--n)s.push(this._drawPointFor(e));return s},n.prototype._drawPointFor=function(e){var t,n,r,i,s,o;this.seriesPoints[e]=[],s=this.data,o=[];for(r=0,i=s.length;r<i;r++)n=s[r],t=null,n._y[e]!=null&&(t=this.drawLinePoint(n._x,n._y[e],this.options.pointSize,this.colorFor(n,e,"point"),e)),o.push(this.seriesPoints[e].push(t));return o},n.prototype._drawLineFor=function(e){var t;t=this.paths[e];if(t!==null)return this.drawLinePath(t,this.colorFor(null,e,"line"))},n.createPath=function(e,n,r){var i,s,o,u,a,f,l,c,h,p,d,v,m,g;l="",n&&(o=t.Line.gradients(e)),c={y:null};for(u=m=0,g=e.length;m<g;u=++m){i=e[u];if(i.y!=null)if(c.y!=null)n?(s=o[u],f=o[u-1],a=(i.x-c.x)/4,h=c.x+a,d=Math.min(r,c.y+a*f),p=i.x-a,v=Math.min(r,i.y-a*s),l+="C"+h+","+d+","+p+","+v+","+i.x+","+i.y):l+="L"+i.x+","+i.y;else if(!n||o[u]!=null)l+="M"+i.x+","+i.y;c=i}return l},n.gradients=function(e){var t,n,r,i,s,o,u,a;n=function(e,t){return(e.y-t.y)/(e.x-t.x)},a=[];for(r=o=0,u=e.length;o<u;r=++o)t=e[r],t.y!=null?(i=e[r+1]||{y:null},s=e[r-1]||{y:null},s.y!=null&&i.y!=null?a.push(n(s,i)):s.y!=null?a.push(n(s,t)):i.y!=null?a.push(n(t,i)):a.push(null)):a.push(null);return a},n.prototype.hilight=function(e){var t,n,r,i,s;if(this.prevHilight!==null&&this.prevHilight!==e)for(t=n=0,i=this.seriesPoints.length-1;0<=i?n<=i:n>=i;t=0<=i?++n:--n)this.seriesPoints[t][this.prevHilight]&&this.seriesPoints[t][this.prevHilight].animate(this.pointShrink);if(e!==null&&this.prevHilight!==e)for(t=r=0,s=this.seriesPoints.length-1;0<=s?r<=s:r>=s;t=0<=s?++r:--r)this.seriesPoints[t][e]&&this.seriesPoints[t][e].animate(this.pointGrow);return this.prevHilight=e},n.prototype.colorFor=function(e,t,n){return typeof this.options.lineColors=="function"?this.options.lineColors.call(this,e,t,n):n==="point"?this.options.pointFillColors[t%this.options.pointFillColors.length]||this.options.lineColors[t%this.options.lineColors.length]:this.options.lineColors[t%this.options.lineColors.length]},n.prototype.drawXAxisLabel=function(e,t,n){return this.raphael.text(e,t,n).attr("font-size",this.options.gridTextSize).attr("font-family",this.options.gridTextFamily).attr("font-weight",this.options.gridTextWeight).attr("fill",this.options.gridTextColor)},n.prototype.drawLinePath=function(e,t){return this.raphael.path(e).attr("stroke",t).attr("stroke-width",this.options.lineWidth)},n.prototype.drawLinePoint=function(e,t,n,r,i){return this.raphael.circle(e,t,n).attr("fill",r).attr("stroke-width",this.strokeWidthForSeries(i)).attr("stroke",this.strokeForSeries(i))},n.prototype.strokeWidthForSeries=function(e){return this.options.pointWidths[e%this.options.pointWidths.length]},n.prototype.strokeForSeries=function(e){return this.options.pointStrokeColors[e%this.options.pointStrokeColors.length]},n}(t.Grid),t.labelSeries=function(n,r,i,s,o){var u,a,f,l,c,h,p,d,v,m,g;f=200*(r-n)/i,a=new Date(n),p=t.LABEL_SPECS[s];if(p===void 0){g=t.AUTO_LABEL_ORDER;for(v=0,m=g.length;v<m;v++){l=g[v],h=t.LABEL_SPECS[l];if(f>=h.span){p=h;break}}}p===void 0&&(p=t.LABEL_SPECS.second),o&&(p=e.extend({},p,{fmt:o})),u=p.start(a),c=[];while((d=u.getTime())<=r)d>=n&&c.push([p.fmt(u),d]),p.incr(u);return c},n=function(e){return{span:e*60*1e3,start:function(e){return new Date(e.getFullYear(),e.getMonth(),e.getDate(),e.getHours())},fmt:function(e){return""+t.pad2(e.getHours())+":"+t.pad2(e.getMinutes())},incr:function(t){return t.setUTCMinutes(t.getUTCMinutes()+e)}}},r=function(e){return{span:e*1e3,start:function(e){return new Date(e.getFullYear(),e.getMonth(),e.getDate(),e.getHours(),e.getMinutes())},fmt:function(e){return""+t.pad2(e.getHours())+":"+t.pad2(e.getMinutes())+":"+t.pad2(e.getSeconds())},incr:function(t){return t.setUTCSeconds(t.getUTCSeconds()+e)}}},t.LABEL_SPECS={decade:{span:1728e8,start:function(e){return new Date(e.getFullYear()-e.getFullYear()%10,0,1)},fmt:function(e){return""+e.getFullYear()},incr:function(e){return e.setFullYear(e.getFullYear()+10)}},year:{span:1728e7,start:function(e){return new Date(e.getFullYear(),0,1)},fmt:function(e){return""+e.getFullYear()},incr:function(e){return e.setFullYear(e.getFullYear()+1)}},month:{span:24192e5,start:function(e){return new Date(e.getFullYear(),e.getMonth(),1)},fmt:function(e){return""+e.getFullYear()+"-"+t.pad2(e.getMonth()+1)},incr:function(e){return e.setMonth(e.getMonth()+1)}},day:{span:864e5,start:function(e){return new Date(e.getFullYear(),e.getMonth(),e.getDate())},fmt:function(e){return""+e.getFullYear()+"-"+t.pad2(e.getMonth()+1)+"-"+t.pad2(e.getDate())},incr:function(e){return e.setDate(e.getDate()+1)}},hour:n(60),"30min":n(30),"15min":n(15),"10min":n(10),"5min":n(5),minute:n(1),"30sec":r(30),"15sec":r(15),"10sec":r(10),"5sec":r(5),second:r(1)},t.AUTO_LABEL_ORDER=["decade","year","month","day","hour","30min","15min","10min","5min","minute","30sec","15sec","10sec","5sec","second"],t.Area=function(n){function i(n){var s;if(!(this instanceof t.Area))return new t.Area(n);s=e.extend({},r,n),this.cumulative=!s.behaveLikeLine,s.fillOpacity==="auto"&&(s.fillOpacity=s.behaveLikeLine?.8:1),i.__super__.constructor.call(this,s)}var r;return o(i,n),r={fillOpacity:"auto",behaveLikeLine:!1},i.prototype.calcPoints=function(){var e,t,n,r,i,s,o;s=this.data,o=[];for(r=0,i=s.length;r<i;r++)e=s[r],e._x=this.transX(e.x),t=0,e._y=function(){var r,i,s,o;s=e.y,o=[];for(r=0,i=s.length;r<i;r++)n=s[r],this.options.behaveLikeLine?o.push(this.transY(n)):(t+=n||0,o.push(this.transY(t)));return o}.call(this),o.push(e._ymax=Math.max.apply(Math,e._y));return o},i.prototype.drawSeries=function(){var e,t,n,r,i,s,o,u,a,f,l;this.seriesPoints=[],this.options.behaveLikeLine?t=function(){a=[];for(var e=0,t=this.options.ykeys.length-1;0<=t?e<=t:e>=t;0<=t?e++:e--)a.push(e);return a}.apply(this):t=function(){f=[];for(var e=u=this.options.ykeys.length-1;u<=0?e<=0:e>=0;u<=0?e++:e--)f.push(e);return f}.apply(this),l=[];for(i=0,s=t.length;i<s;i++)e=t[i],this._drawFillFor(e),this._drawLineFor(e),l.push(this._drawPointFor(e));return l},i.prototype._drawFillFor=function(e){var t;t=this.paths[e];if(t!==null)return t+="L"+this.transX(this.xmax)+","+this.bottom+"L"+this.transX(this.xmin)+","+this.bottom+"Z",this.drawFilledPath(t,this.fillForSeries(e))},i.prototype.fillForSeries=function(e){var t;return t=Raphael.rgb2hsl(this.colorFor(this.data[e],e,"line")),Raphael.hsl(t.h,this.options.behaveLikeLine?t.s*.9:t.s*.75,Math.min(.98,this.options.behaveLikeLine?t.l*1.2:t.l*1.25))},i.prototype.drawFilledPath=function(e,t){return this.raphael.path(e).attr("fill",t).attr("fill-opacity",this.options.fillOpacity).attr("stroke-width",0)},i}(t.Line),t.Bar=function(n){function r(n){this.onHoverOut=u(this.onHoverOut,this),this.onHoverMove=u(this.onHoverMove,this),this.onGridClick=u(this.onGridClick,this);if(!(this instanceof t.Bar))return new t.Bar(n);r.__super__.constructor.call(this,e.extend({},n,{parseTime:!1}))}return o(r,n),r.prototype.init=function(){this.cumulative=this.options.stacked;if(this.options.hideHover!=="always")return this.hover=new t.Hover({parent:this.el}),this.on("hovermove",this.onHoverMove),this.on("hoverout",this.onHoverOut),this.on("gridclick",this.onGridClick)},r.prototype.defaults={barSizeRatio:.75,barGap:3,barColors:["#0b62a4","#7a92a3","#4da74d","#afd8f8","#edc240","#cb4b4b","#9440ed"],xLabelMargin:50},r.prototype.calc=function(){var e;this.calcBars();if(this.options.hideHover===!1)return(e=this.hover).update.apply(e,this.hoverContentForRow(this.data.length-1))},r.prototype.calcBars=function(){var e,t,n,r,i,s,o;s=this.data,o=[];for(e=r=0,i=s.length;r<i;e=++r)t=s[e],t._x=this.left+this.width*(e+.5)/this.data.length,o.push(t._y=function(){var e,r,i,s;i=t.y,s=[];for(e=0,r=i.length;e<r;e++)n=i[e],n!=null?s.push(this.transY(n)):s.push(null);return s}.call(this));return o},r.prototype.draw=function(){return this.options.axes&&this.drawXAxis(),this.drawSeries()},r.prototype.drawXAxis=function(){var e,t,n,r,i,s,o,u,a,f,l,c,h;f=this.bottom+this.options.padding/2,o=null,s=null,h=[];for(e=l=0,c=this.data.length;0<=c?l<c:l>c;e=0<=c?++l:--l)u=this.data[this.data.length-1-e],t=this.drawXAxisLabel(u._x,f,u.label),a=t.getBBox(),t.transform("r"+ -this.options.xLabelAngle),n=t.getBBox(),t.transform("t0,"+n.height/2+"..."),this.options.xLabelAngle!==0&&(i=-0.5*a.width*Math.cos(this.options.xLabelAngle*Math.PI/180),t.transform("t"+i+",0...")),(o==null||o>=n.x+n.width||s!=null&&s>=n.x)&&n.x>=0&&n.x+n.width<this.el.width()?(this.options.xLabelAngle!==0&&(r=1.25*this.options.gridTextSize/Math.sin(this.options.xLabelAngle*Math.PI/180),s=n.x-r),h.push(o=n.x-this.options.xLabelMargin)):h.push(t.remove());return h},r.prototype.drawSeries=function(){var e,t,n,r,i,s,o,u,a,f,l,c,h,p;return n=this.width/this.options.data.length,u=this.options.stacked!=null?1:this.options.ykeys.length,e=(n*this.options.barSizeRatio-this.options.barGap*(u-1))/u,o=n*(1-this.options.barSizeRatio)/2,p=this.ymin<=0&&this.ymax>=0?this.transY(0):null,this.bars=function(){var u,d,v,m;v=this.data,m=[];for(r=u=0,d=v.length;u<d;r=++u)a=v[r],i=0,m.push(function(){var u,d,v,m;v=a._y,m=[];for(f=u=0,d=v.length;u<d;f=++u)h=v[f],h!==null?(p?(c=Math.min(h,p),t=Math.max(h,p)):(c=h,t=this.bottom),s=this.left+r*n+o,this.options.stacked||(s+=f*(e+this.options.barGap)),l=t-c,this.options.stacked&&(c-=i),this.drawBar(s,c,e,l,this.colorFor(a,f,"bar")),m.push(i+=l)):m.push(null);return m}.call(this));return m}.call(this)},r.prototype.colorFor=function(e,t,n){var r,i;return typeof this.options.barColors=="function"?(r={x:e.x,y:e.y[t],label:e.label},i={index:t,key:this.options.ykeys[t],label:this.options.labels[t]},this.options.barColors.call(this,r,i,n)):this.options.barColors[t%this.options.barColors.length]},r.prototype.hitTest=function(e,t){return this.data.length===0?null:(e=Math.max(Math.min(e,this.right),this.left),Math.min(this.data.length-1,Math.floor((e-this.left)/(this.width/this.data.length))))},r.prototype.onGridClick=function(e,t){var n;return n=this.hitTest(e,t),this.fire("click",n,this.options.data[n],e,t)},r.prototype.onHoverMove=function(e,t){var n,r;return n=this.hitTest(e,t),(r=this.hover).update.apply(r,this.hoverContentForRow(n))},r.prototype.onHoverOut=function(){if(this.options.hideHover!==!1)return this.hover.hide()},r.prototype.hoverContentForRow=function(e){var t,n,r,i,s,o,u,a;r=this.data[e],t="<div class='morris-hover-row-label'>"+r.label+"</div>",a=r.y;for(n=o=0,u=a.length;o<u;n=++o)s=a[n],t+="<div class='morris-hover-point' style='color: "+this.colorFor(r,n,"label")+"'>\n  "+this.options.labels[n]+":\n  "+this.yLabelFormat(s)+"\n</div>";return typeof this.options.hoverCallback=="function"&&(t=this.options.hoverCallback(e,this.options,t)),i=this.left+(e+.5)*this.width/this.data.length,[t,i]},r.prototype.drawXAxisLabel=function(e,t,n){var r;return r=this.raphael.text(e,t,n).attr("font-size",this.options.gridTextSize).attr("font-family",this.options.gridTextFamily).attr("font-weight",this.options.gridTextWeight).attr("fill",this.options.gridTextColor)},r.prototype.drawBar=function(e,t,n,r,i){return this.raphael.rect(e,t,n,r).attr("fill",i).attr("stroke-width",0)},r}(t.Grid),t.Donut=function(n){function r(n){this.select=u(this.select,this),this.click=u(this.click,this);var r;if(!(this instanceof t.Donut))return new t.Donut(n);typeof n.element=="string"?this.el=e(document.getElementById(n.element)):this.el=e(n.element),this.options=e.extend({},this.defaults,n);if(this.el===null||this.el.length===0)throw new Error("Graph placeholder not found.");if(n.data===void 0||n.data.length===0)return;this.data=n.data,this.values=function(){var e,t,n,i;n=this.data,i=[];for(e=0,t=n.length;e<t;e++)r=n[e],i.push(parseFloat(r.value));return i}.call(this),this.redraw()}return o(r,n),r.prototype.defaults={colors:["#0B62A4","#3980B5","#679DC6","#95BBD7","#B0CCE1","#095791","#095085","#083E67","#052C48","#042135"],backgroundColor:"#FFFFFF",labelColor:"#000000",formatter:t.commas},r.prototype.redraw=function(){var e,n,r,i,s,o,u,a,f,l,c,h,p,d,v,m,g,y,b,w,E,S,x;this.el.empty(),this.raphael=new Raphael(this.el[0]),n=this.el.width()/2,r=this.el.height()/2,p=(Math.min(n,r)-10)/3,c=0,w=this.values;for(d=0,g=w.length;d<g;d++)h=w[d],c+=h;a=5/(2*p),e=1.9999*Math.PI-a*this.data.length,o=0,s=0,this.segments=[],E=this.values;for(i=v=0,y=E.length;v<y;i=++v)h=E[i],f=o+a+e*(h/c),l=new t.DonutSegment(n,r,p*2,p,o,f,this.options.colors[s%this.options.colors.length],this.options.backgroundColor,s,this.raphael),l.render(),this.segments.push(l),l.on("hover",this.select),l.on("click",this.click),o=f,s+=1;this.text1=this.drawEmptyDonutLabel(n,r-10,this.options.labelColor,15,800),this.text2=this.drawEmptyDonutLabel(n,r+10,this.options.labelColor,14),u=Math.max.apply(null,function(){var e,t,n,r;n=this.values,r=[];for(e=0,t=n.length;e<t;e++)h=n[e],r.push(h);return r}.call(this)),s=0,S=this.values,x=[];for(m=0,b=S.length;m<b;m++){h=S[m];if(h===u){this.select(s);break}x.push(s+=1)}return x},r.prototype.click=function(e){return this.fire("click",e,this.data[e])},r.prototype.select=function(e){var t,n,r,i,s,o;o=this.segments;for(i=0,s=o.length;i<s;i++)n=o[i],n.deselect();return r=this.segments[e],r.select(),t=this.data[e],this.setLabels(t.label,this.options.formatter(t.value,t))},r.prototype.setLabels=function(e,t){var n,r,i,s,o,u,a,f;return n=(Math.min(this.el.width()/2,this.el.height()/2)-10)*2/3,s=1.8*n,i=n/2,r=n/3,this.text1.attr({text:e,transform:""}),o=this.text1.getBBox(),u=Math.min(s/o.width,i/o.height),this.text1.attr({transform:"S"+u+","+u+","+(o.x+o.width/2)+","+(o.y+o.height)}),this.text2.attr({text:t,transform:""}),a=this.text2.getBBox(),f=Math.min(s/a.width,r/a.height),this.text2.attr({transform:"S"+f+","+f+","+(a.x+a.width/2)+","+a.y})},r.prototype.drawEmptyDonutLabel=function(e,t,n,r,i){var s;return s=this.raphael.text(e,t,"").attr("font-size",r).attr("fill",n),i!=null&&s.attr("font-weight",i),s},r}(t.EventEmitter),t.DonutSegment=function(e){function t(e,t,n,r,i,s,o,a,f,l){this.cx=e,this.cy=t,this.inner=n,this.outer=r,this.color=o,this.backgroundColor=a,this.index=f,this.raphael=l,this.deselect=u(this.deselect,this),this.select=u(this.select,this),this.sin_p0=Math.sin(i),this.cos_p0=Math.cos(i),this.sin_p1=Math.sin(s),this.cos_p1=Math.cos(s),this.is_long=s-i>Math.PI?1:0,this.path=this.calcSegment(this.inner+3,this.inner+this.outer-5),this.selectedPath=this.calcSegment(this.inner+3,this.inner+this.outer),this.hilight=this.calcArc(this.inner)}return o(t,e),t.prototype.calcArcPoints=function(e){return[this.cx+e*this.sin_p0,this.cy+e*this.cos_p0,this.cx+e*this.sin_p1,this.cy+e*this.cos_p1]},t.prototype.calcSegment=function(e,t){var n,r,i,s,o,u,a,f,l,c;return l=this.calcArcPoints(e),n=l[0],i=l[1],r=l[2],s=l[3],c=this.calcArcPoints(t),o=c[0],a=c[1],u=c[2],f=c[3],"M"+n+","+i+("A"+e+","+e+",0,"+this.is_long+",0,"+r+","+s)+("L"+u+","+f)+("A"+t+","+t+",0,"+this.is_long+",1,"+o+","+a)+"Z"},t.prototype.calcArc=function(e){var t,n,r,i,s;return s=this.calcArcPoints(e),t=s[0],r=s[1],n=s[2],i=s[3],"M"+t+","+r+("A"+e+","+e+",0,"+this.is_long+",0,"+n+","+i)},t.prototype.render=function(){var e=this;return this.arc=this.drawDonutArc(this.hilight,this.color),this.seg=this.drawDonutSegment(this.path,this.color,this.backgroundColor,function(){return e.fire("hover",e.index)},function(){return e.fire("click",e.index)})},t.prototype.drawDonutArc=function(e,t){return this.raphael.path(e).attr({stroke:t,"stroke-width":2,opacity:0})},t.prototype.drawDonutSegment=function(e,t,n,r,i){return this.raphael.path(e).attr({fill:t,stroke:n,"stroke-width":3}).hover(r).click(i)},t.prototype.select=function(){if(!this.selected)return this.seg.animate({path:this.selectedPath},150,"<>"),this.arc.animate({opacity:1},150,"<>"),this.selected=!0},t.prototype.deselect=function(){if(this.selected)return this.seg.animate({path:this.path},150,"<>"),this.arc.animate({opacity:0},150,"<>"),this.selected=!1},t}(t.EventEmitter)}).call(this);
//! moment.js
//! version : 2.8.1
//! authors : Tim Wood, Iskren Chernev, Moment.js contributors
//! license : MIT
//! momentjs.com

(function (undefined) {
    /************************************
        Constants
    ************************************/

    var moment,
        VERSION = '2.8.1',
        // the global-scope this is NOT the global object in Node.js
        globalScope = typeof global !== 'undefined' ? global : this,
        oldGlobalMoment,
        round = Math.round,
        i,

        YEAR = 0,
        MONTH = 1,
        DATE = 2,
        HOUR = 3,
        MINUTE = 4,
        SECOND = 5,
        MILLISECOND = 6,

        // internal storage for locale config files
        locales = {},

        // extra moment internal properties (plugins register props here)
        momentProperties = [],

        // check for nodeJS
        hasModule = (typeof module !== 'undefined' && module.exports),

        // ASP.NET json date format regex
        aspNetJsonRegex = /^\/?Date\((\-?\d+)/i,
        aspNetTimeSpanJsonRegex = /(\-)?(?:(\d*)\.)?(\d+)\:(\d+)(?:\:(\d+)\.?(\d{3})?)?/,

        // from http://docs.closure-library.googlecode.com/git/closure_goog_date_date.js.source.html
        // somewhat more in line with 4.4.3.2 2004 spec, but allows decimal anywhere
        isoDurationRegex = /^(-)?P(?:(?:([0-9,.]*)Y)?(?:([0-9,.]*)M)?(?:([0-9,.]*)D)?(?:T(?:([0-9,.]*)H)?(?:([0-9,.]*)M)?(?:([0-9,.]*)S)?)?|([0-9,.]*)W)$/,

        // format tokens
        formattingTokens = /(\[[^\[]*\])|(\\)?(Mo|MM?M?M?|Do|DDDo|DD?D?D?|ddd?d?|do?|w[o|w]?|W[o|W]?|Q|YYYYYY|YYYYY|YYYY|YY|gg(ggg?)?|GG(GGG?)?|e|E|a|A|hh?|HH?|mm?|ss?|S{1,4}|X|zz?|ZZ?|.)/g,
        localFormattingTokens = /(\[[^\[]*\])|(\\)?(LT|LL?L?L?|l{1,4})/g,

        // parsing token regexes
        parseTokenOneOrTwoDigits = /\d\d?/, // 0 - 99
        parseTokenOneToThreeDigits = /\d{1,3}/, // 0 - 999
        parseTokenOneToFourDigits = /\d{1,4}/, // 0 - 9999
        parseTokenOneToSixDigits = /[+\-]?\d{1,6}/, // -999,999 - 999,999
        parseTokenDigits = /\d+/, // nonzero number of digits
        parseTokenWord = /[0-9]*['a-z\u00A0-\u05FF\u0700-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+|[\u0600-\u06FF\/]+(\s*?[\u0600-\u06FF]+){1,2}/i, // any word (or two) characters or numbers including two/three word month in arabic.
        parseTokenTimezone = /Z|[\+\-]\d\d:?\d\d/gi, // +00:00 -00:00 +0000 -0000 or Z
        parseTokenT = /T/i, // T (ISO separator)
        parseTokenTimestampMs = /[\+\-]?\d+(\.\d{1,3})?/, // 123456789 123456789.123
        parseTokenOrdinal = /\d{1,2}/,

        //strict parsing regexes
        parseTokenOneDigit = /\d/, // 0 - 9
        parseTokenTwoDigits = /\d\d/, // 00 - 99
        parseTokenThreeDigits = /\d{3}/, // 000 - 999
        parseTokenFourDigits = /\d{4}/, // 0000 - 9999
        parseTokenSixDigits = /[+-]?\d{6}/, // -999,999 - 999,999
        parseTokenSignedNumber = /[+-]?\d+/, // -inf - inf

        // iso 8601 regex
        // 0000-00-00 0000-W00 or 0000-W00-0 + T + 00 or 00:00 or 00:00:00 or 00:00:00.000 + +00:00 or +0000 or +00)
        isoRegex = /^\s*(?:[+-]\d{6}|\d{4})-(?:(\d\d-\d\d)|(W\d\d$)|(W\d\d-\d)|(\d\d\d))((T| )(\d\d(:\d\d(:\d\d(\.\d+)?)?)?)?([\+\-]\d\d(?::?\d\d)?|\s*Z)?)?$/,

        isoFormat = 'YYYY-MM-DDTHH:mm:ssZ',

        isoDates = [
            ['YYYYYY-MM-DD', /[+-]\d{6}-\d{2}-\d{2}/],
            ['YYYY-MM-DD', /\d{4}-\d{2}-\d{2}/],
            ['GGGG-[W]WW-E', /\d{4}-W\d{2}-\d/],
            ['GGGG-[W]WW', /\d{4}-W\d{2}/],
            ['YYYY-DDD', /\d{4}-\d{3}/]
        ],

        // iso time formats and regexes
        isoTimes = [
            ['HH:mm:ss.SSSS', /(T| )\d\d:\d\d:\d\d\.\d+/],
            ['HH:mm:ss', /(T| )\d\d:\d\d:\d\d/],
            ['HH:mm', /(T| )\d\d:\d\d/],
            ['HH', /(T| )\d\d/]
        ],

        // timezone chunker "+10:00" > ["10", "00"] or "-1530" > ["-15", "30"]
        parseTimezoneChunker = /([\+\-]|\d\d)/gi,

        // getter and setter names
        proxyGettersAndSetters = 'Date|Hours|Minutes|Seconds|Milliseconds'.split('|'),
        unitMillisecondFactors = {
            'Milliseconds' : 1,
            'Seconds' : 1e3,
            'Minutes' : 6e4,
            'Hours' : 36e5,
            'Days' : 864e5,
            'Months' : 2592e6,
            'Years' : 31536e6
        },

        unitAliases = {
            ms : 'millisecond',
            s : 'second',
            m : 'minute',
            h : 'hour',
            d : 'day',
            D : 'date',
            w : 'week',
            W : 'isoWeek',
            M : 'month',
            Q : 'quarter',
            y : 'year',
            DDD : 'dayOfYear',
            e : 'weekday',
            E : 'isoWeekday',
            gg: 'weekYear',
            GG: 'isoWeekYear'
        },

        camelFunctions = {
            dayofyear : 'dayOfYear',
            isoweekday : 'isoWeekday',
            isoweek : 'isoWeek',
            weekyear : 'weekYear',
            isoweekyear : 'isoWeekYear'
        },

        // format function strings
        formatFunctions = {},

        // default relative time thresholds
        relativeTimeThresholds = {
            s: 45,  // seconds to minute
            m: 45,  // minutes to hour
            h: 22,  // hours to day
            d: 26,  // days to month
            M: 11   // months to year
        },

        // tokens to ordinalize and pad
        ordinalizeTokens = 'DDD w W M D d'.split(' '),
        paddedTokens = 'M D H h m s w W'.split(' '),

        formatTokenFunctions = {
            M    : function () {
                return this.month() + 1;
            },
            MMM  : function (format) {
                return this.localeData().monthsShort(this, format);
            },
            MMMM : function (format) {
                return this.localeData().months(this, format);
            },
            D    : function () {
                return this.date();
            },
            DDD  : function () {
                return this.dayOfYear();
            },
            d    : function () {
                return this.day();
            },
            dd   : function (format) {
                return this.localeData().weekdaysMin(this, format);
            },
            ddd  : function (format) {
                return this.localeData().weekdaysShort(this, format);
            },
            dddd : function (format) {
                return this.localeData().weekdays(this, format);
            },
            w    : function () {
                return this.week();
            },
            W    : function () {
                return this.isoWeek();
            },
            YY   : function () {
                return leftZeroFill(this.year() % 100, 2);
            },
            YYYY : function () {
                return leftZeroFill(this.year(), 4);
            },
            YYYYY : function () {
                return leftZeroFill(this.year(), 5);
            },
            YYYYYY : function () {
                var y = this.year(), sign = y >= 0 ? '+' : '-';
                return sign + leftZeroFill(Math.abs(y), 6);
            },
            gg   : function () {
                return leftZeroFill(this.weekYear() % 100, 2);
            },
            gggg : function () {
                return leftZeroFill(this.weekYear(), 4);
            },
            ggggg : function () {
                return leftZeroFill(this.weekYear(), 5);
            },
            GG   : function () {
                return leftZeroFill(this.isoWeekYear() % 100, 2);
            },
            GGGG : function () {
                return leftZeroFill(this.isoWeekYear(), 4);
            },
            GGGGG : function () {
                return leftZeroFill(this.isoWeekYear(), 5);
            },
            e : function () {
                return this.weekday();
            },
            E : function () {
                return this.isoWeekday();
            },
            a    : function () {
                return this.localeData().meridiem(this.hours(), this.minutes(), true);
            },
            A    : function () {
                return this.localeData().meridiem(this.hours(), this.minutes(), false);
            },
            H    : function () {
                return this.hours();
            },
            h    : function () {
                return this.hours() % 12 || 12;
            },
            m    : function () {
                return this.minutes();
            },
            s    : function () {
                return this.seconds();
            },
            S    : function () {
                return toInt(this.milliseconds() / 100);
            },
            SS   : function () {
                return leftZeroFill(toInt(this.milliseconds() / 10), 2);
            },
            SSS  : function () {
                return leftZeroFill(this.milliseconds(), 3);
            },
            SSSS : function () {
                return leftZeroFill(this.milliseconds(), 3);
            },
            Z    : function () {
                var a = -this.zone(),
                    b = '+';
                if (a < 0) {
                    a = -a;
                    b = '-';
                }
                return b + leftZeroFill(toInt(a / 60), 2) + ':' + leftZeroFill(toInt(a) % 60, 2);
            },
            ZZ   : function () {
                var a = -this.zone(),
                    b = '+';
                if (a < 0) {
                    a = -a;
                    b = '-';
                }
                return b + leftZeroFill(toInt(a / 60), 2) + leftZeroFill(toInt(a) % 60, 2);
            },
            z : function () {
                return this.zoneAbbr();
            },
            zz : function () {
                return this.zoneName();
            },
            X    : function () {
                return this.unix();
            },
            Q : function () {
                return this.quarter();
            }
        },

        deprecations = {},

        lists = ['months', 'monthsShort', 'weekdays', 'weekdaysShort', 'weekdaysMin'];

    // Pick the first defined of two or three arguments. dfl comes from
    // default.
    function dfl(a, b, c) {
        switch (arguments.length) {
            case 2: return a != null ? a : b;
            case 3: return a != null ? a : b != null ? b : c;
            default: throw new Error('Implement me');
        }
    }

    function defaultParsingFlags() {
        // We need to deep clone this object, and es5 standard is not very
        // helpful.
        return {
            empty : false,
            unusedTokens : [],
            unusedInput : [],
            overflow : -2,
            charsLeftOver : 0,
            nullInput : false,
            invalidMonth : null,
            invalidFormat : false,
            userInvalidated : false,
            iso: false
        };
    }

    function printMsg(msg) {
        if (moment.suppressDeprecationWarnings === false &&
                typeof console !== 'undefined' && console.warn) {
            console.warn("Deprecation warning: " + msg);
        }
    }

    function deprecate(msg, fn) {
        var firstTime = true;
        return extend(function () {
            if (firstTime) {
                printMsg(msg);
                firstTime = false;
            }
            return fn.apply(this, arguments);
        }, fn);
    }

    function deprecateSimple(name, msg) {
        if (!deprecations[name]) {
            printMsg(msg);
            deprecations[name] = true;
        }
    }

    function padToken(func, count) {
        return function (a) {
            return leftZeroFill(func.call(this, a), count);
        };
    }
    function ordinalizeToken(func, period) {
        return function (a) {
            return this.localeData().ordinal(func.call(this, a), period);
        };
    }

    while (ordinalizeTokens.length) {
        i = ordinalizeTokens.pop();
        formatTokenFunctions[i + 'o'] = ordinalizeToken(formatTokenFunctions[i], i);
    }
    while (paddedTokens.length) {
        i = paddedTokens.pop();
        formatTokenFunctions[i + i] = padToken(formatTokenFunctions[i], 2);
    }
    formatTokenFunctions.DDDD = padToken(formatTokenFunctions.DDD, 3);


    /************************************
        Constructors
    ************************************/

    function Locale() {
    }

    // Moment prototype object
    function Moment(config, skipOverflow) {
        if (skipOverflow !== false) {
            checkOverflow(config);
        }
        copyConfig(this, config);
        this._d = new Date(+config._d);
    }

    // Duration Constructor
    function Duration(duration) {
        var normalizedInput = normalizeObjectUnits(duration),
            years = normalizedInput.year || 0,
            quarters = normalizedInput.quarter || 0,
            months = normalizedInput.month || 0,
            weeks = normalizedInput.week || 0,
            days = normalizedInput.day || 0,
            hours = normalizedInput.hour || 0,
            minutes = normalizedInput.minute || 0,
            seconds = normalizedInput.second || 0,
            milliseconds = normalizedInput.millisecond || 0;

        // representation for dateAddRemove
        this._milliseconds = +milliseconds +
            seconds * 1e3 + // 1000
            minutes * 6e4 + // 1000 * 60
            hours * 36e5; // 1000 * 60 * 60
        // Because of dateAddRemove treats 24 hours as different from a
        // day when working around DST, we need to store them separately
        this._days = +days +
            weeks * 7;
        // It is impossible translate months into days without knowing
        // which months you are are talking about, so we have to store
        // it separately.
        this._months = +months +
            quarters * 3 +
            years * 12;

        this._data = {};

        this._locale = moment.localeData();

        this._bubble();
    }

    /************************************
        Helpers
    ************************************/


    function extend(a, b) {
        for (var i in b) {
            if (b.hasOwnProperty(i)) {
                a[i] = b[i];
            }
        }

        if (b.hasOwnProperty('toString')) {
            a.toString = b.toString;
        }

        if (b.hasOwnProperty('valueOf')) {
            a.valueOf = b.valueOf;
        }

        return a;
    }

    function copyConfig(to, from) {
        var i, prop, val;

        if (typeof from._isAMomentObject !== 'undefined') {
            to._isAMomentObject = from._isAMomentObject;
        }
        if (typeof from._i !== 'undefined') {
            to._i = from._i;
        }
        if (typeof from._f !== 'undefined') {
            to._f = from._f;
        }
        if (typeof from._l !== 'undefined') {
            to._l = from._l;
        }
        if (typeof from._strict !== 'undefined') {
            to._strict = from._strict;
        }
        if (typeof from._tzm !== 'undefined') {
            to._tzm = from._tzm;
        }
        if (typeof from._isUTC !== 'undefined') {
            to._isUTC = from._isUTC;
        }
        if (typeof from._offset !== 'undefined') {
            to._offset = from._offset;
        }
        if (typeof from._pf !== 'undefined') {
            to._pf = from._pf;
        }
        if (typeof from._locale !== 'undefined') {
            to._locale = from._locale;
        }

        if (momentProperties.length > 0) {
            for (i in momentProperties) {
                prop = momentProperties[i];
                val = from[prop];
                if (typeof val !== 'undefined') {
                    to[prop] = val;
                }
            }
        }

        return to;
    }

    function absRound(number) {
        if (number < 0) {
            return Math.ceil(number);
        } else {
            return Math.floor(number);
        }
    }

    // left zero fill a number
    // see http://jsperf.com/left-zero-filling for performance comparison
    function leftZeroFill(number, targetLength, forceSign) {
        var output = '' + Math.abs(number),
            sign = number >= 0;

        while (output.length < targetLength) {
            output = '0' + output;
        }
        return (sign ? (forceSign ? '+' : '') : '-') + output;
    }

    function positiveMomentsDifference(base, other) {
        var res = {milliseconds: 0, months: 0};

        res.months = other.month() - base.month() +
            (other.year() - base.year()) * 12;
        if (base.clone().add(res.months, 'M').isAfter(other)) {
            --res.months;
        }

        res.milliseconds = +other - +(base.clone().add(res.months, 'M'));

        return res;
    }

    function momentsDifference(base, other) {
        var res;
        other = makeAs(other, base);
        if (base.isBefore(other)) {
            res = positiveMomentsDifference(base, other);
        } else {
            res = positiveMomentsDifference(other, base);
            res.milliseconds = -res.milliseconds;
            res.months = -res.months;
        }

        return res;
    }

    // TODO: remove 'name' arg after deprecation is removed
    function createAdder(direction, name) {
        return function (val, period) {
            var dur, tmp;
            //invert the arguments, but complain about it
            if (period !== null && !isNaN(+period)) {
                deprecateSimple(name, "moment()." + name  + "(period, number) is deprecated. Please use moment()." + name + "(number, period).");
                tmp = val; val = period; period = tmp;
            }

            val = typeof val === 'string' ? +val : val;
            dur = moment.duration(val, period);
            addOrSubtractDurationFromMoment(this, dur, direction);
            return this;
        };
    }

    function addOrSubtractDurationFromMoment(mom, duration, isAdding, updateOffset) {
        var milliseconds = duration._milliseconds,
            days = duration._days,
            months = duration._months;
        updateOffset = updateOffset == null ? true : updateOffset;

        if (milliseconds) {
            mom._d.setTime(+mom._d + milliseconds * isAdding);
        }
        if (days) {
            rawSetter(mom, 'Date', rawGetter(mom, 'Date') + days * isAdding);
        }
        if (months) {
            rawMonthSetter(mom, rawGetter(mom, 'Month') + months * isAdding);
        }
        if (updateOffset) {
            moment.updateOffset(mom, days || months);
        }
    }

    // check if is an array
    function isArray(input) {
        return Object.prototype.toString.call(input) === '[object Array]';
    }

    function isDate(input) {
        return Object.prototype.toString.call(input) === '[object Date]' ||
            input instanceof Date;
    }

    // compare two arrays, return the number of differences
    function compareArrays(array1, array2, dontConvert) {
        var len = Math.min(array1.length, array2.length),
            lengthDiff = Math.abs(array1.length - array2.length),
            diffs = 0,
            i;
        for (i = 0; i < len; i++) {
            if ((dontConvert && array1[i] !== array2[i]) ||
                (!dontConvert && toInt(array1[i]) !== toInt(array2[i]))) {
                diffs++;
            }
        }
        return diffs + lengthDiff;
    }

    function normalizeUnits(units) {
        if (units) {
            var lowered = units.toLowerCase().replace(/(.)s$/, '$1');
            units = unitAliases[units] || camelFunctions[lowered] || lowered;
        }
        return units;
    }

    function normalizeObjectUnits(inputObject) {
        var normalizedInput = {},
            normalizedProp,
            prop;

        for (prop in inputObject) {
            if (inputObject.hasOwnProperty(prop)) {
                normalizedProp = normalizeUnits(prop);
                if (normalizedProp) {
                    normalizedInput[normalizedProp] = inputObject[prop];
                }
            }
        }

        return normalizedInput;
    }

    function makeList(field) {
        var count, setter;

        if (field.indexOf('week') === 0) {
            count = 7;
            setter = 'day';
        }
        else if (field.indexOf('month') === 0) {
            count = 12;
            setter = 'month';
        }
        else {
            return;
        }

        moment[field] = function (format, index) {
            var i, getter,
                method = moment._locale[field],
                results = [];

            if (typeof format === 'number') {
                index = format;
                format = undefined;
            }

            getter = function (i) {
                var m = moment().utc().set(setter, i);
                return method.call(moment._locale, m, format || '');
            };

            if (index != null) {
                return getter(index);
            }
            else {
                for (i = 0; i < count; i++) {
                    results.push(getter(i));
                }
                return results;
            }
        };
    }

    function toInt(argumentForCoercion) {
        var coercedNumber = +argumentForCoercion,
            value = 0;

        if (coercedNumber !== 0 && isFinite(coercedNumber)) {
            if (coercedNumber >= 0) {
                value = Math.floor(coercedNumber);
            } else {
                value = Math.ceil(coercedNumber);
            }
        }

        return value;
    }

    function daysInMonth(year, month) {
        return new Date(Date.UTC(year, month + 1, 0)).getUTCDate();
    }

    function weeksInYear(year, dow, doy) {
        return weekOfYear(moment([year, 11, 31 + dow - doy]), dow, doy).week;
    }

    function daysInYear(year) {
        return isLeapYear(year) ? 366 : 365;
    }

    function isLeapYear(year) {
        return (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;
    }

    function checkOverflow(m) {
        var overflow;
        if (m._a && m._pf.overflow === -2) {
            overflow =
                m._a[MONTH] < 0 || m._a[MONTH] > 11 ? MONTH :
                m._a[DATE] < 1 || m._a[DATE] > daysInMonth(m._a[YEAR], m._a[MONTH]) ? DATE :
                m._a[HOUR] < 0 || m._a[HOUR] > 23 ? HOUR :
                m._a[MINUTE] < 0 || m._a[MINUTE] > 59 ? MINUTE :
                m._a[SECOND] < 0 || m._a[SECOND] > 59 ? SECOND :
                m._a[MILLISECOND] < 0 || m._a[MILLISECOND] > 999 ? MILLISECOND :
                -1;

            if (m._pf._overflowDayOfYear && (overflow < YEAR || overflow > DATE)) {
                overflow = DATE;
            }

            m._pf.overflow = overflow;
        }
    }

    function isValid(m) {
        if (m._isValid == null) {
            m._isValid = !isNaN(m._d.getTime()) &&
                m._pf.overflow < 0 &&
                !m._pf.empty &&
                !m._pf.invalidMonth &&
                !m._pf.nullInput &&
                !m._pf.invalidFormat &&
                !m._pf.userInvalidated;

            if (m._strict) {
                m._isValid = m._isValid &&
                    m._pf.charsLeftOver === 0 &&
                    m._pf.unusedTokens.length === 0;
            }
        }
        return m._isValid;
    }

    function normalizeLocale(key) {
        return key ? key.toLowerCase().replace('_', '-') : key;
    }

    // pick the locale from the array
    // try ['en-au', 'en-gb'] as 'en-au', 'en-gb', 'en', as in move through the list trying each
    // substring from most specific to least, but move to the next array item if it's a more specific variant than the current root
    function chooseLocale(names) {
        var i = 0, j, next, locale, split;

        while (i < names.length) {
            split = normalizeLocale(names[i]).split('-');
            j = split.length;
            next = normalizeLocale(names[i + 1]);
            next = next ? next.split('-') : null;
            while (j > 0) {
                locale = loadLocale(split.slice(0, j).join('-'));
                if (locale) {
                    return locale;
                }
                if (next && next.length >= j && compareArrays(split, next, true) >= j - 1) {
                    //the next array item is better than a shallower substring of this one
                    break;
                }
                j--;
            }
            i++;
        }
        return null;
    }

    function loadLocale(name) {
        var oldLocale = null;
        if (!locales[name] && hasModule) {
            try {
                oldLocale = moment.locale();
                require('./locale/' + name);
                // because defineLocale currently also sets the global locale, we want to undo that for lazy loaded locales
                moment.locale(oldLocale);
            } catch (e) { }
        }
        return locales[name];
    }

    // Return a moment from input, that is local/utc/zone equivalent to model.
    function makeAs(input, model) {
        return model._isUTC ? moment(input).zone(model._offset || 0) :
            moment(input).local();
    }

    /************************************
        Locale
    ************************************/


    extend(Locale.prototype, {

        set : function (config) {
            var prop, i;
            for (i in config) {
                prop = config[i];
                if (typeof prop === 'function') {
                    this[i] = prop;
                } else {
                    this['_' + i] = prop;
                }
            }
        },

        _months : 'January_February_March_April_May_June_July_August_September_October_November_December'.split('_'),
        months : function (m) {
            return this._months[m.month()];
        },

        _monthsShort : 'Jan_Feb_Mar_Apr_May_Jun_Jul_Aug_Sep_Oct_Nov_Dec'.split('_'),
        monthsShort : function (m) {
            return this._monthsShort[m.month()];
        },

        monthsParse : function (monthName) {
            var i, mom, regex;

            if (!this._monthsParse) {
                this._monthsParse = [];
            }

            for (i = 0; i < 12; i++) {
                // make the regex if we don't have it already
                if (!this._monthsParse[i]) {
                    mom = moment.utc([2000, i]);
                    regex = '^' + this.months(mom, '') + '|^' + this.monthsShort(mom, '');
                    this._monthsParse[i] = new RegExp(regex.replace('.', ''), 'i');
                }
                // test the regex
                if (this._monthsParse[i].test(monthName)) {
                    return i;
                }
            }
        },

        _weekdays : 'Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday'.split('_'),
        weekdays : function (m) {
            return this._weekdays[m.day()];
        },

        _weekdaysShort : 'Sun_Mon_Tue_Wed_Thu_Fri_Sat'.split('_'),
        weekdaysShort : function (m) {
            return this._weekdaysShort[m.day()];
        },

        _weekdaysMin : 'Su_Mo_Tu_We_Th_Fr_Sa'.split('_'),
        weekdaysMin : function (m) {
            return this._weekdaysMin[m.day()];
        },

        weekdaysParse : function (weekdayName) {
            var i, mom, regex;

            if (!this._weekdaysParse) {
                this._weekdaysParse = [];
            }

            for (i = 0; i < 7; i++) {
                // make the regex if we don't have it already
                if (!this._weekdaysParse[i]) {
                    mom = moment([2000, 1]).day(i);
                    regex = '^' + this.weekdays(mom, '') + '|^' + this.weekdaysShort(mom, '') + '|^' + this.weekdaysMin(mom, '');
                    this._weekdaysParse[i] = new RegExp(regex.replace('.', ''), 'i');
                }
                // test the regex
                if (this._weekdaysParse[i].test(weekdayName)) {
                    return i;
                }
            }
        },

        _longDateFormat : {
            LT : 'h:mm A',
            L : 'MM/DD/YYYY',
            LL : 'MMMM D, YYYY',
            LLL : 'MMMM D, YYYY LT',
            LLLL : 'dddd, MMMM D, YYYY LT'
        },
        longDateFormat : function (key) {
            var output = this._longDateFormat[key];
            if (!output && this._longDateFormat[key.toUpperCase()]) {
                output = this._longDateFormat[key.toUpperCase()].replace(/MMMM|MM|DD|dddd/g, function (val) {
                    return val.slice(1);
                });
                this._longDateFormat[key] = output;
            }
            return output;
        },

        isPM : function (input) {
            // IE8 Quirks Mode & IE7 Standards Mode do not allow accessing strings like arrays
            // Using charAt should be more compatible.
            return ((input + '').toLowerCase().charAt(0) === 'p');
        },

        _meridiemParse : /[ap]\.?m?\.?/i,
        meridiem : function (hours, minutes, isLower) {
            if (hours > 11) {
                return isLower ? 'pm' : 'PM';
            } else {
                return isLower ? 'am' : 'AM';
            }
        },

        _calendar : {
            sameDay : '[Today at] LT',
            nextDay : '[Tomorrow at] LT',
            nextWeek : 'dddd [at] LT',
            lastDay : '[Yesterday at] LT',
            lastWeek : '[Last] dddd [at] LT',
            sameElse : 'L'
        },
        calendar : function (key, mom) {
            var output = this._calendar[key];
            return typeof output === 'function' ? output.apply(mom) : output;
        },

        _relativeTime : {
            future : 'in %s',
            past : '%s ago',
            s : 'a few seconds',
            m : 'a minute',
            mm : '%d minutes',
            h : 'an hour',
            hh : '%d hours',
            d : 'a day',
            dd : '%d days',
            M : 'a month',
            MM : '%d months',
            y : 'a year',
            yy : '%d years'
        },

        relativeTime : function (number, withoutSuffix, string, isFuture) {
            var output = this._relativeTime[string];
            return (typeof output === 'function') ?
                output(number, withoutSuffix, string, isFuture) :
                output.replace(/%d/i, number);
        },

        pastFuture : function (diff, output) {
            var format = this._relativeTime[diff > 0 ? 'future' : 'past'];
            return typeof format === 'function' ? format(output) : format.replace(/%s/i, output);
        },

        ordinal : function (number) {
            return this._ordinal.replace('%d', number);
        },
        _ordinal : '%d',

        preparse : function (string) {
            return string;
        },

        postformat : function (string) {
            return string;
        },

        week : function (mom) {
            return weekOfYear(mom, this._week.dow, this._week.doy).week;
        },

        _week : {
            dow : 0, // Sunday is the first day of the week.
            doy : 6  // The week that contains Jan 1st is the first week of the year.
        },

        _invalidDate: 'Invalid date',
        invalidDate: function () {
            return this._invalidDate;
        }
    });

    /************************************
        Formatting
    ************************************/


    function removeFormattingTokens(input) {
        if (input.match(/\[[\s\S]/)) {
            return input.replace(/^\[|\]$/g, '');
        }
        return input.replace(/\\/g, '');
    }

    function makeFormatFunction(format) {
        var array = format.match(formattingTokens), i, length;

        for (i = 0, length = array.length; i < length; i++) {
            if (formatTokenFunctions[array[i]]) {
                array[i] = formatTokenFunctions[array[i]];
            } else {
                array[i] = removeFormattingTokens(array[i]);
            }
        }

        return function (mom) {
            var output = '';
            for (i = 0; i < length; i++) {
                output += array[i] instanceof Function ? array[i].call(mom, format) : array[i];
            }
            return output;
        };
    }

    // format date using native date object
    function formatMoment(m, format) {
        if (!m.isValid()) {
            return m.localeData().invalidDate();
        }

        format = expandFormat(format, m.localeData());

        if (!formatFunctions[format]) {
            formatFunctions[format] = makeFormatFunction(format);
        }

        return formatFunctions[format](m);
    }

    function expandFormat(format, locale) {
        var i = 5;

        function replaceLongDateFormatTokens(input) {
            return locale.longDateFormat(input) || input;
        }

        localFormattingTokens.lastIndex = 0;
        while (i >= 0 && localFormattingTokens.test(format)) {
            format = format.replace(localFormattingTokens, replaceLongDateFormatTokens);
            localFormattingTokens.lastIndex = 0;
            i -= 1;
        }

        return format;
    }


    /************************************
        Parsing
    ************************************/


    // get the regex to find the next token
    function getParseRegexForToken(token, config) {
        var a, strict = config._strict;
        switch (token) {
        case 'Q':
            return parseTokenOneDigit;
        case 'DDDD':
            return parseTokenThreeDigits;
        case 'YYYY':
        case 'GGGG':
        case 'gggg':
            return strict ? parseTokenFourDigits : parseTokenOneToFourDigits;
        case 'Y':
        case 'G':
        case 'g':
            return parseTokenSignedNumber;
        case 'YYYYYY':
        case 'YYYYY':
        case 'GGGGG':
        case 'ggggg':
            return strict ? parseTokenSixDigits : parseTokenOneToSixDigits;
        case 'S':
            if (strict) {
                return parseTokenOneDigit;
            }
            /* falls through */
        case 'SS':
            if (strict) {
                return parseTokenTwoDigits;
            }
            /* falls through */
        case 'SSS':
            if (strict) {
                return parseTokenThreeDigits;
            }
            /* falls through */
        case 'DDD':
            return parseTokenOneToThreeDigits;
        case 'MMM':
        case 'MMMM':
        case 'dd':
        case 'ddd':
        case 'dddd':
            return parseTokenWord;
        case 'a':
        case 'A':
            return config._locale._meridiemParse;
        case 'X':
            return parseTokenTimestampMs;
        case 'Z':
        case 'ZZ':
            return parseTokenTimezone;
        case 'T':
            return parseTokenT;
        case 'SSSS':
            return parseTokenDigits;
        case 'MM':
        case 'DD':
        case 'YY':
        case 'GG':
        case 'gg':
        case 'HH':
        case 'hh':
        case 'mm':
        case 'ss':
        case 'ww':
        case 'WW':
            return strict ? parseTokenTwoDigits : parseTokenOneOrTwoDigits;
        case 'M':
        case 'D':
        case 'd':
        case 'H':
        case 'h':
        case 'm':
        case 's':
        case 'w':
        case 'W':
        case 'e':
        case 'E':
            return parseTokenOneOrTwoDigits;
        case 'Do':
            return parseTokenOrdinal;
        default :
            a = new RegExp(regexpEscape(unescapeFormat(token.replace('\\', '')), 'i'));
            return a;
        }
    }

    function timezoneMinutesFromString(string) {
        string = string || '';
        var possibleTzMatches = (string.match(parseTokenTimezone) || []),
            tzChunk = possibleTzMatches[possibleTzMatches.length - 1] || [],
            parts = (tzChunk + '').match(parseTimezoneChunker) || ['-', 0, 0],
            minutes = +(parts[1] * 60) + toInt(parts[2]);

        return parts[0] === '+' ? -minutes : minutes;
    }

    // function to convert string input to date
    function addTimeToArrayFromToken(token, input, config) {
        var a, datePartArray = config._a;

        switch (token) {
        // QUARTER
        case 'Q':
            if (input != null) {
                datePartArray[MONTH] = (toInt(input) - 1) * 3;
            }
            break;
        // MONTH
        case 'M' : // fall through to MM
        case 'MM' :
            if (input != null) {
                datePartArray[MONTH] = toInt(input) - 1;
            }
            break;
        case 'MMM' : // fall through to MMMM
        case 'MMMM' :
            a = config._locale.monthsParse(input);
            // if we didn't find a month name, mark the date as invalid.
            if (a != null) {
                datePartArray[MONTH] = a;
            } else {
                config._pf.invalidMonth = input;
            }
            break;
        // DAY OF MONTH
        case 'D' : // fall through to DD
        case 'DD' :
            if (input != null) {
                datePartArray[DATE] = toInt(input);
            }
            break;
        case 'Do' :
            if (input != null) {
                datePartArray[DATE] = toInt(parseInt(input, 10));
            }
            break;
        // DAY OF YEAR
        case 'DDD' : // fall through to DDDD
        case 'DDDD' :
            if (input != null) {
                config._dayOfYear = toInt(input);
            }

            break;
        // YEAR
        case 'YY' :
            datePartArray[YEAR] = moment.parseTwoDigitYear(input);
            break;
        case 'YYYY' :
        case 'YYYYY' :
        case 'YYYYYY' :
            datePartArray[YEAR] = toInt(input);
            break;
        // AM / PM
        case 'a' : // fall through to A
        case 'A' :
            config._isPm = config._locale.isPM(input);
            break;
        // 24 HOUR
        case 'H' : // fall through to hh
        case 'HH' : // fall through to hh
        case 'h' : // fall through to hh
        case 'hh' :
            datePartArray[HOUR] = toInt(input);
            break;
        // MINUTE
        case 'm' : // fall through to mm
        case 'mm' :
            datePartArray[MINUTE] = toInt(input);
            break;
        // SECOND
        case 's' : // fall through to ss
        case 'ss' :
            datePartArray[SECOND] = toInt(input);
            break;
        // MILLISECOND
        case 'S' :
        case 'SS' :
        case 'SSS' :
        case 'SSSS' :
            datePartArray[MILLISECOND] = toInt(('0.' + input) * 1000);
            break;
        // UNIX TIMESTAMP WITH MS
        case 'X':
            config._d = new Date(parseFloat(input) * 1000);
            break;
        // TIMEZONE
        case 'Z' : // fall through to ZZ
        case 'ZZ' :
            config._useUTC = true;
            config._tzm = timezoneMinutesFromString(input);
            break;
        // WEEKDAY - human
        case 'dd':
        case 'ddd':
        case 'dddd':
            a = config._locale.weekdaysParse(input);
            // if we didn't get a weekday name, mark the date as invalid
            if (a != null) {
                config._w = config._w || {};
                config._w['d'] = a;
            } else {
                config._pf.invalidWeekday = input;
            }
            break;
        // WEEK, WEEK DAY - numeric
        case 'w':
        case 'ww':
        case 'W':
        case 'WW':
        case 'd':
        case 'e':
        case 'E':
            token = token.substr(0, 1);
            /* falls through */
        case 'gggg':
        case 'GGGG':
        case 'GGGGG':
            token = token.substr(0, 2);
            if (input) {
                config._w = config._w || {};
                config._w[token] = toInt(input);
            }
            break;
        case 'gg':
        case 'GG':
            config._w = config._w || {};
            config._w[token] = moment.parseTwoDigitYear(input);
        }
    }

    function dayOfYearFromWeekInfo(config) {
        var w, weekYear, week, weekday, dow, doy, temp;

        w = config._w;
        if (w.GG != null || w.W != null || w.E != null) {
            dow = 1;
            doy = 4;

            // TODO: We need to take the current isoWeekYear, but that depends on
            // how we interpret now (local, utc, fixed offset). So create
            // a now version of current config (take local/utc/offset flags, and
            // create now).
            weekYear = dfl(w.GG, config._a[YEAR], weekOfYear(moment(), 1, 4).year);
            week = dfl(w.W, 1);
            weekday = dfl(w.E, 1);
        } else {
            dow = config._locale._week.dow;
            doy = config._locale._week.doy;

            weekYear = dfl(w.gg, config._a[YEAR], weekOfYear(moment(), dow, doy).year);
            week = dfl(w.w, 1);

            if (w.d != null) {
                // weekday -- low day numbers are considered next week
                weekday = w.d;
                if (weekday < dow) {
                    ++week;
                }
            } else if (w.e != null) {
                // local weekday -- counting starts from begining of week
                weekday = w.e + dow;
            } else {
                // default to begining of week
                weekday = dow;
            }
        }
        temp = dayOfYearFromWeeks(weekYear, week, weekday, doy, dow);

        config._a[YEAR] = temp.year;
        config._dayOfYear = temp.dayOfYear;
    }

    // convert an array to a date.
    // the array should mirror the parameters below
    // note: all values past the year are optional and will default to the lowest possible value.
    // [year, month, day , hour, minute, second, millisecond]
    function dateFromConfig(config) {
        var i, date, input = [], currentDate, yearToUse;

        if (config._d) {
            return;
        }

        currentDate = currentDateArray(config);

        //compute day of the year from weeks and weekdays
        if (config._w && config._a[DATE] == null && config._a[MONTH] == null) {
            dayOfYearFromWeekInfo(config);
        }

        //if the day of the year is set, figure out what it is
        if (config._dayOfYear) {
            yearToUse = dfl(config._a[YEAR], currentDate[YEAR]);

            if (config._dayOfYear > daysInYear(yearToUse)) {
                config._pf._overflowDayOfYear = true;
            }

            date = makeUTCDate(yearToUse, 0, config._dayOfYear);
            config._a[MONTH] = date.getUTCMonth();
            config._a[DATE] = date.getUTCDate();
        }

        // Default to current date.
        // * if no year, month, day of month are given, default to today
        // * if day of month is given, default month and year
        // * if month is given, default only year
        // * if year is given, don't default anything
        for (i = 0; i < 3 && config._a[i] == null; ++i) {
            config._a[i] = input[i] = currentDate[i];
        }

        // Zero out whatever was not defaulted, including time
        for (; i < 7; i++) {
            config._a[i] = input[i] = (config._a[i] == null) ? (i === 2 ? 1 : 0) : config._a[i];
        }

        config._d = (config._useUTC ? makeUTCDate : makeDate).apply(null, input);
        // Apply timezone offset from input. The actual zone can be changed
        // with parseZone.
        if (config._tzm != null) {
            config._d.setUTCMinutes(config._d.getUTCMinutes() + config._tzm);
        }
    }

    function dateFromObject(config) {
        var normalizedInput;

        if (config._d) {
            return;
        }

        normalizedInput = normalizeObjectUnits(config._i);
        config._a = [
            normalizedInput.year,
            normalizedInput.month,
            normalizedInput.day,
            normalizedInput.hour,
            normalizedInput.minute,
            normalizedInput.second,
            normalizedInput.millisecond
        ];

        dateFromConfig(config);
    }

    function currentDateArray(config) {
        var now = new Date();
        if (config._useUTC) {
            return [
                now.getUTCFullYear(),
                now.getUTCMonth(),
                now.getUTCDate()
            ];
        } else {
            return [now.getFullYear(), now.getMonth(), now.getDate()];
        }
    }

    // date from string and format string
    function makeDateFromStringAndFormat(config) {
        if (config._f === moment.ISO_8601) {
            parseISO(config);
            return;
        }

        config._a = [];
        config._pf.empty = true;

        // This array is used to make a Date, either with `new Date` or `Date.UTC`
        var string = '' + config._i,
            i, parsedInput, tokens, token, skipped,
            stringLength = string.length,
            totalParsedInputLength = 0;

        tokens = expandFormat(config._f, config._locale).match(formattingTokens) || [];

        for (i = 0; i < tokens.length; i++) {
            token = tokens[i];
            parsedInput = (string.match(getParseRegexForToken(token, config)) || [])[0];
            if (parsedInput) {
                skipped = string.substr(0, string.indexOf(parsedInput));
                if (skipped.length > 0) {
                    config._pf.unusedInput.push(skipped);
                }
                string = string.slice(string.indexOf(parsedInput) + parsedInput.length);
                totalParsedInputLength += parsedInput.length;
            }
            // don't parse if it's not a known token
            if (formatTokenFunctions[token]) {
                if (parsedInput) {
                    config._pf.empty = false;
                }
                else {
                    config._pf.unusedTokens.push(token);
                }
                addTimeToArrayFromToken(token, parsedInput, config);
            }
            else if (config._strict && !parsedInput) {
                config._pf.unusedTokens.push(token);
            }
        }

        // add remaining unparsed input length to the string
        config._pf.charsLeftOver = stringLength - totalParsedInputLength;
        if (string.length > 0) {
            config._pf.unusedInput.push(string);
        }

        // handle am pm
        if (config._isPm && config._a[HOUR] < 12) {
            config._a[HOUR] += 12;
        }
        // if is 12 am, change hours to 0
        if (config._isPm === false && config._a[HOUR] === 12) {
            config._a[HOUR] = 0;
        }

        dateFromConfig(config);
        checkOverflow(config);
    }

    function unescapeFormat(s) {
        return s.replace(/\\(\[)|\\(\])|\[([^\]\[]*)\]|\\(.)/g, function (matched, p1, p2, p3, p4) {
            return p1 || p2 || p3 || p4;
        });
    }

    // Code from http://stackoverflow.com/questions/3561493/is-there-a-regexp-escape-function-in-javascript
    function regexpEscape(s) {
        return s.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');
    }

    // date from string and array of format strings
    function makeDateFromStringAndArray(config) {
        var tempConfig,
            bestMoment,

            scoreToBeat,
            i,
            currentScore;

        if (config._f.length === 0) {
            config._pf.invalidFormat = true;
            config._d = new Date(NaN);
            return;
        }

        for (i = 0; i < config._f.length; i++) {
            currentScore = 0;
            tempConfig = copyConfig({}, config);
            tempConfig._pf = defaultParsingFlags();
            tempConfig._f = config._f[i];
            makeDateFromStringAndFormat(tempConfig);

            if (!isValid(tempConfig)) {
                continue;
            }

            // if there is any input that was not parsed add a penalty for that format
            currentScore += tempConfig._pf.charsLeftOver;

            //or tokens
            currentScore += tempConfig._pf.unusedTokens.length * 10;

            tempConfig._pf.score = currentScore;

            if (scoreToBeat == null || currentScore < scoreToBeat) {
                scoreToBeat = currentScore;
                bestMoment = tempConfig;
            }
        }

        extend(config, bestMoment || tempConfig);
    }

    // date from iso format
    function parseISO(config) {
        var i, l,
            string = config._i,
            match = isoRegex.exec(string);

        if (match) {
            config._pf.iso = true;
            for (i = 0, l = isoDates.length; i < l; i++) {
                if (isoDates[i][1].exec(string)) {
                    // match[5] should be "T" or undefined
                    config._f = isoDates[i][0] + (match[6] || ' ');
                    break;
                }
            }
            for (i = 0, l = isoTimes.length; i < l; i++) {
                if (isoTimes[i][1].exec(string)) {
                    config._f += isoTimes[i][0];
                    break;
                }
            }
            if (string.match(parseTokenTimezone)) {
                config._f += 'Z';
            }
            makeDateFromStringAndFormat(config);
        } else {
            config._isValid = false;
        }
    }

    // date from iso format or fallback
    function makeDateFromString(config) {
        parseISO(config);
        if (config._isValid === false) {
            delete config._isValid;
            moment.createFromInputFallback(config);
        }
    }

    function makeDateFromInput(config) {
        var input = config._i, matched;
        if (input === undefined) {
            config._d = new Date();
        } else if (isDate(input)) {
            config._d = new Date(+input);
        } else if ((matched = aspNetJsonRegex.exec(input)) !== null) {
            config._d = new Date(+matched[1]);
        } else if (typeof input === 'string') {
            makeDateFromString(config);
        } else if (isArray(input)) {
            config._a = input.slice(0);
            dateFromConfig(config);
        } else if (typeof(input) === 'object') {
            dateFromObject(config);
        } else if (typeof(input) === 'number') {
            // from milliseconds
            config._d = new Date(input);
        } else {
            moment.createFromInputFallback(config);
        }
    }

    function makeDate(y, m, d, h, M, s, ms) {
        //can't just apply() to create a date:
        //http://stackoverflow.com/questions/181348/instantiating-a-javascript-object-by-calling-prototype-constructor-apply
        var date = new Date(y, m, d, h, M, s, ms);

        //the date constructor doesn't accept years < 1970
        if (y < 1970) {
            date.setFullYear(y);
        }
        return date;
    }

    function makeUTCDate(y) {
        var date = new Date(Date.UTC.apply(null, arguments));
        if (y < 1970) {
            date.setUTCFullYear(y);
        }
        return date;
    }

    function parseWeekday(input, locale) {
        if (typeof input === 'string') {
            if (!isNaN(input)) {
                input = parseInt(input, 10);
            }
            else {
                input = locale.weekdaysParse(input);
                if (typeof input !== 'number') {
                    return null;
                }
            }
        }
        return input;
    }

    /************************************
        Relative Time
    ************************************/


    // helper function for moment.fn.from, moment.fn.fromNow, and moment.duration.fn.humanize
    function substituteTimeAgo(string, number, withoutSuffix, isFuture, locale) {
        return locale.relativeTime(number || 1, !!withoutSuffix, string, isFuture);
    }

    function relativeTime(posNegDuration, withoutSuffix, locale) {
        var duration = moment.duration(posNegDuration).abs(),
            seconds = round(duration.as('s')),
            minutes = round(duration.as('m')),
            hours = round(duration.as('h')),
            days = round(duration.as('d')),
            months = round(duration.as('M')),
            years = round(duration.as('y')),

            args = seconds < relativeTimeThresholds.s && ['s', seconds] ||
                minutes === 1 && ['m'] ||
                minutes < relativeTimeThresholds.m && ['mm', minutes] ||
                hours === 1 && ['h'] ||
                hours < relativeTimeThresholds.h && ['hh', hours] ||
                days === 1 && ['d'] ||
                days < relativeTimeThresholds.d && ['dd', days] ||
                months === 1 && ['M'] ||
                months < relativeTimeThresholds.M && ['MM', months] ||
                years === 1 && ['y'] || ['yy', years];

        args[2] = withoutSuffix;
        args[3] = +posNegDuration > 0;
        args[4] = locale;
        return substituteTimeAgo.apply({}, args);
    }


    /************************************
        Week of Year
    ************************************/


    // firstDayOfWeek       0 = sun, 6 = sat
    //                      the day of the week that starts the week
    //                      (usually sunday or monday)
    // firstDayOfWeekOfYear 0 = sun, 6 = sat
    //                      the first week is the week that contains the first
    //                      of this day of the week
    //                      (eg. ISO weeks use thursday (4))
    function weekOfYear(mom, firstDayOfWeek, firstDayOfWeekOfYear) {
        var end = firstDayOfWeekOfYear - firstDayOfWeek,
            daysToDayOfWeek = firstDayOfWeekOfYear - mom.day(),
            adjustedMoment;


        if (daysToDayOfWeek > end) {
            daysToDayOfWeek -= 7;
        }

        if (daysToDayOfWeek < end - 7) {
            daysToDayOfWeek += 7;
        }

        adjustedMoment = moment(mom).add(daysToDayOfWeek, 'd');
        return {
            week: Math.ceil(adjustedMoment.dayOfYear() / 7),
            year: adjustedMoment.year()
        };
    }

    //http://en.wikipedia.org/wiki/ISO_week_date#Calculating_a_date_given_the_year.2C_week_number_and_weekday
    function dayOfYearFromWeeks(year, week, weekday, firstDayOfWeekOfYear, firstDayOfWeek) {
        var d = makeUTCDate(year, 0, 1).getUTCDay(), daysToAdd, dayOfYear;

        d = d === 0 ? 7 : d;
        weekday = weekday != null ? weekday : firstDayOfWeek;
        daysToAdd = firstDayOfWeek - d + (d > firstDayOfWeekOfYear ? 7 : 0) - (d < firstDayOfWeek ? 7 : 0);
        dayOfYear = 7 * (week - 1) + (weekday - firstDayOfWeek) + daysToAdd + 1;

        return {
            year: dayOfYear > 0 ? year : year - 1,
            dayOfYear: dayOfYear > 0 ?  dayOfYear : daysInYear(year - 1) + dayOfYear
        };
    }

    /************************************
        Top Level Functions
    ************************************/

    function makeMoment(config) {
        var input = config._i,
            format = config._f;

        config._locale = config._locale || moment.localeData(config._l);

        if (input === null || (format === undefined && input === '')) {
            return moment.invalid({nullInput: true});
        }

        if (typeof input === 'string') {
            config._i = input = config._locale.preparse(input);
        }

        if (moment.isMoment(input)) {
            return new Moment(input, true);
        } else if (format) {
            if (isArray(format)) {
                makeDateFromStringAndArray(config);
            } else {
                makeDateFromStringAndFormat(config);
            }
        } else {
            makeDateFromInput(config);
        }

        return new Moment(config);
    }

    moment = function (input, format, locale, strict) {
        var c;

        if (typeof(locale) === "boolean") {
            strict = locale;
            locale = undefined;
        }
        // object construction must be done this way.
        // https://github.com/moment/moment/issues/1423
        c = {};
        c._isAMomentObject = true;
        c._i = input;
        c._f = format;
        c._l = locale;
        c._strict = strict;
        c._isUTC = false;
        c._pf = defaultParsingFlags();

        return makeMoment(c);
    };

    moment.suppressDeprecationWarnings = false;

    moment.createFromInputFallback = deprecate(
        'moment construction falls back to js Date. This is ' +
        'discouraged and will be removed in upcoming major ' +
        'release. Please refer to ' +
        'https://github.com/moment/moment/issues/1407 for more info.',
        function (config) {
            config._d = new Date(config._i);
        }
    );

    // Pick a moment m from moments so that m[fn](other) is true for all
    // other. This relies on the function fn to be transitive.
    //
    // moments should either be an array of moment objects or an array, whose
    // first element is an array of moment objects.
    function pickBy(fn, moments) {
        var res, i;
        if (moments.length === 1 && isArray(moments[0])) {
            moments = moments[0];
        }
        if (!moments.length) {
            return moment();
        }
        res = moments[0];
        for (i = 1; i < moments.length; ++i) {
            if (moments[i][fn](res)) {
                res = moments[i];
            }
        }
        return res;
    }

    moment.min = function () {
        var args = [].slice.call(arguments, 0);

        return pickBy('isBefore', args);
    };

    moment.max = function () {
        var args = [].slice.call(arguments, 0);

        return pickBy('isAfter', args);
    };

    // creating with utc
    moment.utc = function (input, format, locale, strict) {
        var c;

        if (typeof(locale) === "boolean") {
            strict = locale;
            locale = undefined;
        }
        // object construction must be done this way.
        // https://github.com/moment/moment/issues/1423
        c = {};
        c._isAMomentObject = true;
        c._useUTC = true;
        c._isUTC = true;
        c._l = locale;
        c._i = input;
        c._f = format;
        c._strict = strict;
        c._pf = defaultParsingFlags();

        return makeMoment(c).utc();
    };

    // creating with unix timestamp (in seconds)
    moment.unix = function (input) {
        return moment(input * 1000);
    };

    // duration
    moment.duration = function (input, key) {
        var duration = input,
            // matching against regexp is expensive, do it on demand
            match = null,
            sign,
            ret,
            parseIso,
            diffRes;

        if (moment.isDuration(input)) {
            duration = {
                ms: input._milliseconds,
                d: input._days,
                M: input._months
            };
        } else if (typeof input === 'number') {
            duration = {};
            if (key) {
                duration[key] = input;
            } else {
                duration.milliseconds = input;
            }
        } else if (!!(match = aspNetTimeSpanJsonRegex.exec(input))) {
            sign = (match[1] === '-') ? -1 : 1;
            duration = {
                y: 0,
                d: toInt(match[DATE]) * sign,
                h: toInt(match[HOUR]) * sign,
                m: toInt(match[MINUTE]) * sign,
                s: toInt(match[SECOND]) * sign,
                ms: toInt(match[MILLISECOND]) * sign
            };
        } else if (!!(match = isoDurationRegex.exec(input))) {
            sign = (match[1] === '-') ? -1 : 1;
            parseIso = function (inp) {
                // We'd normally use ~~inp for this, but unfortunately it also
                // converts floats to ints.
                // inp may be undefined, so careful calling replace on it.
                var res = inp && parseFloat(inp.replace(',', '.'));
                // apply sign while we're at it
                return (isNaN(res) ? 0 : res) * sign;
            };
            duration = {
                y: parseIso(match[2]),
                M: parseIso(match[3]),
                d: parseIso(match[4]),
                h: parseIso(match[5]),
                m: parseIso(match[6]),
                s: parseIso(match[7]),
                w: parseIso(match[8])
            };
        } else if (typeof duration === 'object' &&
                ('from' in duration || 'to' in duration)) {
            diffRes = momentsDifference(moment(duration.from), moment(duration.to));

            duration = {};
            duration.ms = diffRes.milliseconds;
            duration.M = diffRes.months;
        }

        ret = new Duration(duration);

        if (moment.isDuration(input) && input.hasOwnProperty('_locale')) {
            ret._locale = input._locale;
        }

        return ret;
    };

    // version number
    moment.version = VERSION;

    // default format
    moment.defaultFormat = isoFormat;

    // constant that refers to the ISO standard
    moment.ISO_8601 = function () {};

    // Plugins that add properties should also add the key here (null value),
    // so we can properly clone ourselves.
    moment.momentProperties = momentProperties;

    // This function will be called whenever a moment is mutated.
    // It is intended to keep the offset in sync with the timezone.
    moment.updateOffset = function () {};

    // This function allows you to set a threshold for relative time strings
    moment.relativeTimeThreshold = function (threshold, limit) {
        if (relativeTimeThresholds[threshold] === undefined) {
            return false;
        }
        if (limit === undefined) {
            return relativeTimeThresholds[threshold];
        }
        relativeTimeThresholds[threshold] = limit;
        return true;
    };

    moment.lang = deprecate(
        "moment.lang is deprecated. Use moment.locale instead.",
        function (key, value) {
            return moment.locale(key, value);
        }
    );

    // This function will load locale and then set the global locale.  If
    // no arguments are passed in, it will simply return the current global
    // locale key.
    moment.locale = function (key, values) {
        var data;
        if (key) {
            if (typeof(values) !== "undefined") {
                data = moment.defineLocale(key, values);
            }
            else {
                data = moment.localeData(key);
            }

            if (data) {
                moment.duration._locale = moment._locale = data;
            }
        }

        return moment._locale._abbr;
    };

    moment.defineLocale = function (name, values) {
        if (values !== null) {
            values.abbr = name;
            if (!locales[name]) {
                locales[name] = new Locale();
            }
            locales[name].set(values);

            // backwards compat for now: also set the locale
            moment.locale(name);

            return locales[name];
        } else {
            // useful for testing
            delete locales[name];
            return null;
        }
    };

    moment.langData = deprecate(
        "moment.langData is deprecated. Use moment.localeData instead.",
        function (key) {
            return moment.localeData(key);
        }
    );

    // returns locale data
    moment.localeData = function (key) {
        var locale;

        if (key && key._locale && key._locale._abbr) {
            key = key._locale._abbr;
        }

        if (!key) {
            return moment._locale;
        }

        if (!isArray(key)) {
            //short-circuit everything else
            locale = loadLocale(key);
            if (locale) {
                return locale;
            }
            key = [key];
        }

        return chooseLocale(key);
    };

    // compare moment object
    moment.isMoment = function (obj) {
        return obj instanceof Moment ||
            (obj != null &&  obj.hasOwnProperty('_isAMomentObject'));
    };

    // for typechecking Duration objects
    moment.isDuration = function (obj) {
        return obj instanceof Duration;
    };

    for (i = lists.length - 1; i >= 0; --i) {
        makeList(lists[i]);
    }

    moment.normalizeUnits = function (units) {
        return normalizeUnits(units);
    };

    moment.invalid = function (flags) {
        var m = moment.utc(NaN);
        if (flags != null) {
            extend(m._pf, flags);
        }
        else {
            m._pf.userInvalidated = true;
        }

        return m;
    };

    moment.parseZone = function () {
        return moment.apply(null, arguments).parseZone();
    };

    moment.parseTwoDigitYear = function (input) {
        return toInt(input) + (toInt(input) > 68 ? 1900 : 2000);
    };

    /************************************
        Moment Prototype
    ************************************/


    extend(moment.fn = Moment.prototype, {

        clone : function () {
            return moment(this);
        },

        valueOf : function () {
            return +this._d + ((this._offset || 0) * 60000);
        },

        unix : function () {
            return Math.floor(+this / 1000);
        },

        toString : function () {
            return this.clone().locale('en').format("ddd MMM DD YYYY HH:mm:ss [GMT]ZZ");
        },

        toDate : function () {
            return this._offset ? new Date(+this) : this._d;
        },

        toISOString : function () {
            var m = moment(this).utc();
            if (0 < m.year() && m.year() <= 9999) {
                return formatMoment(m, 'YYYY-MM-DD[T]HH:mm:ss.SSS[Z]');
            } else {
                return formatMoment(m, 'YYYYYY-MM-DD[T]HH:mm:ss.SSS[Z]');
            }
        },

        toArray : function () {
            var m = this;
            return [
                m.year(),
                m.month(),
                m.date(),
                m.hours(),
                m.minutes(),
                m.seconds(),
                m.milliseconds()
            ];
        },

        isValid : function () {
            return isValid(this);
        },

        isDSTShifted : function () {
            if (this._a) {
                return this.isValid() && compareArrays(this._a, (this._isUTC ? moment.utc(this._a) : moment(this._a)).toArray()) > 0;
            }

            return false;
        },

        parsingFlags : function () {
            return extend({}, this._pf);
        },

        invalidAt: function () {
            return this._pf.overflow;
        },

        utc : function (keepLocalTime) {
            return this.zone(0, keepLocalTime);
        },

        local : function (keepLocalTime) {
            if (this._isUTC) {
                this.zone(0, keepLocalTime);
                this._isUTC = false;

                if (keepLocalTime) {
                    this.add(this._d.getTimezoneOffset(), 'm');
                }
            }
            return this;
        },

        format : function (inputString) {
            var output = formatMoment(this, inputString || moment.defaultFormat);
            return this.localeData().postformat(output);
        },

        add : createAdder(1, 'add'),

        subtract : createAdder(-1, 'subtract'),

        diff : function (input, units, asFloat) {
            var that = makeAs(input, this),
                zoneDiff = (this.zone() - that.zone()) * 6e4,
                diff, output;

            units = normalizeUnits(units);

            if (units === 'year' || units === 'month') {
                // average number of days in the months in the given dates
                diff = (this.daysInMonth() + that.daysInMonth()) * 432e5; // 24 * 60 * 60 * 1000 / 2
                // difference in months
                output = ((this.year() - that.year()) * 12) + (this.month() - that.month());
                // adjust by taking difference in days, average number of days
                // and dst in the given months.
                output += ((this - moment(this).startOf('month')) -
                        (that - moment(that).startOf('month'))) / diff;
                // same as above but with zones, to negate all dst
                output -= ((this.zone() - moment(this).startOf('month').zone()) -
                        (that.zone() - moment(that).startOf('month').zone())) * 6e4 / diff;
                if (units === 'year') {
                    output = output / 12;
                }
            } else {
                diff = (this - that);
                output = units === 'second' ? diff / 1e3 : // 1000
                    units === 'minute' ? diff / 6e4 : // 1000 * 60
                    units === 'hour' ? diff / 36e5 : // 1000 * 60 * 60
                    units === 'day' ? (diff - zoneDiff) / 864e5 : // 1000 * 60 * 60 * 24, negate dst
                    units === 'week' ? (diff - zoneDiff) / 6048e5 : // 1000 * 60 * 60 * 24 * 7, negate dst
                    diff;
            }
            return asFloat ? output : absRound(output);
        },

        from : function (time, withoutSuffix) {
            return moment.duration({to: this, from: time}).locale(this.locale()).humanize(!withoutSuffix);
        },

        fromNow : function (withoutSuffix) {
            return this.from(moment(), withoutSuffix);
        },

        calendar : function (time) {
            // We want to compare the start of today, vs this.
            // Getting start-of-today depends on whether we're zone'd or not.
            var now = time || moment(),
                sod = makeAs(now, this).startOf('day'),
                diff = this.diff(sod, 'days', true),
                format = diff < -6 ? 'sameElse' :
                    diff < -1 ? 'lastWeek' :
                    diff < 0 ? 'lastDay' :
                    diff < 1 ? 'sameDay' :
                    diff < 2 ? 'nextDay' :
                    diff < 7 ? 'nextWeek' : 'sameElse';
            return this.format(this.localeData().calendar(format, this));
        },

        isLeapYear : function () {
            return isLeapYear(this.year());
        },

        isDST : function () {
            return (this.zone() < this.clone().month(0).zone() ||
                this.zone() < this.clone().month(5).zone());
        },

        day : function (input) {
            var day = this._isUTC ? this._d.getUTCDay() : this._d.getDay();
            if (input != null) {
                input = parseWeekday(input, this.localeData());
                return this.add(input - day, 'd');
            } else {
                return day;
            }
        },

        month : makeAccessor('Month', true),

        startOf : function (units) {
            units = normalizeUnits(units);
            // the following switch intentionally omits break keywords
            // to utilize falling through the cases.
            switch (units) {
            case 'year':
                this.month(0);
                /* falls through */
            case 'quarter':
            case 'month':
                this.date(1);
                /* falls through */
            case 'week':
            case 'isoWeek':
            case 'day':
                this.hours(0);
                /* falls through */
            case 'hour':
                this.minutes(0);
                /* falls through */
            case 'minute':
                this.seconds(0);
                /* falls through */
            case 'second':
                this.milliseconds(0);
                /* falls through */
            }

            // weeks are a special case
            if (units === 'week') {
                this.weekday(0);
            } else if (units === 'isoWeek') {
                this.isoWeekday(1);
            }

            // quarters are also special
            if (units === 'quarter') {
                this.month(Math.floor(this.month() / 3) * 3);
            }

            return this;
        },

        endOf: function (units) {
            units = normalizeUnits(units);
            return this.startOf(units).add(1, (units === 'isoWeek' ? 'week' : units)).subtract(1, 'ms');
        },

        isAfter: function (input, units) {
            units = typeof units !== 'undefined' ? units : 'millisecond';
            return +this.clone().startOf(units) > +moment(input).startOf(units);
        },

        isBefore: function (input, units) {
            units = typeof units !== 'undefined' ? units : 'millisecond';
            return +this.clone().startOf(units) < +moment(input).startOf(units);
        },

        isSame: function (input, units) {
            units = units || 'ms';
            return +this.clone().startOf(units) === +makeAs(input, this).startOf(units);
        },

        min: deprecate(
                 'moment().min is deprecated, use moment.min instead. https://github.com/moment/moment/issues/1548',
                 function (other) {
                     other = moment.apply(null, arguments);
                     return other < this ? this : other;
                 }
         ),

        max: deprecate(
                'moment().max is deprecated, use moment.max instead. https://github.com/moment/moment/issues/1548',
                function (other) {
                    other = moment.apply(null, arguments);
                    return other > this ? this : other;
                }
        ),

        // keepLocalTime = true means only change the timezone, without
        // affecting the local hour. So 5:31:26 +0300 --[zone(2, true)]-->
        // 5:31:26 +0200 It is possible that 5:31:26 doesn't exist int zone
        // +0200, so we adjust the time as needed, to be valid.
        //
        // Keeping the time actually adds/subtracts (one hour)
        // from the actual represented time. That is why we call updateOffset
        // a second time. In case it wants us to change the offset again
        // _changeInProgress == true case, then we have to adjust, because
        // there is no such time in the given timezone.
        zone : function (input, keepLocalTime) {
            var offset = this._offset || 0,
                localAdjust;
            if (input != null) {
                if (typeof input === 'string') {
                    input = timezoneMinutesFromString(input);
                }
                if (Math.abs(input) < 16) {
                    input = input * 60;
                }
                if (!this._isUTC && keepLocalTime) {
                    localAdjust = this._d.getTimezoneOffset();
                }
                this._offset = input;
                this._isUTC = true;
                if (localAdjust != null) {
                    this.subtract(localAdjust, 'm');
                }
                if (offset !== input) {
                    if (!keepLocalTime || this._changeInProgress) {
                        addOrSubtractDurationFromMoment(this,
                                moment.duration(offset - input, 'm'), 1, false);
                    } else if (!this._changeInProgress) {
                        this._changeInProgress = true;
                        moment.updateOffset(this, true);
                        this._changeInProgress = null;
                    }
                }
            } else {
                return this._isUTC ? offset : this._d.getTimezoneOffset();
            }
            return this;
        },

        zoneAbbr : function () {
            return this._isUTC ? 'UTC' : '';
        },

        zoneName : function () {
            return this._isUTC ? 'Coordinated Universal Time' : '';
        },

        parseZone : function () {
            if (this._tzm) {
                this.zone(this._tzm);
            } else if (typeof this._i === 'string') {
                this.zone(this._i);
            }
            return this;
        },

        hasAlignedHourOffset : function (input) {
            if (!input) {
                input = 0;
            }
            else {
                input = moment(input).zone();
            }

            return (this.zone() - input) % 60 === 0;
        },

        daysInMonth : function () {
            return daysInMonth(this.year(), this.month());
        },

        dayOfYear : function (input) {
            var dayOfYear = round((moment(this).startOf('day') - moment(this).startOf('year')) / 864e5) + 1;
            return input == null ? dayOfYear : this.add((input - dayOfYear), 'd');
        },

        quarter : function (input) {
            return input == null ? Math.ceil((this.month() + 1) / 3) : this.month((input - 1) * 3 + this.month() % 3);
        },

        weekYear : function (input) {
            var year = weekOfYear(this, this.localeData()._week.dow, this.localeData()._week.doy).year;
            return input == null ? year : this.add((input - year), 'y');
        },

        isoWeekYear : function (input) {
            var year = weekOfYear(this, 1, 4).year;
            return input == null ? year : this.add((input - year), 'y');
        },

        week : function (input) {
            var week = this.localeData().week(this);
            return input == null ? week : this.add((input - week) * 7, 'd');
        },

        isoWeek : function (input) {
            var week = weekOfYear(this, 1, 4).week;
            return input == null ? week : this.add((input - week) * 7, 'd');
        },

        weekday : function (input) {
            var weekday = (this.day() + 7 - this.localeData()._week.dow) % 7;
            return input == null ? weekday : this.add(input - weekday, 'd');
        },

        isoWeekday : function (input) {
            // behaves the same as moment#day except
            // as a getter, returns 7 instead of 0 (1-7 range instead of 0-6)
            // as a setter, sunday should belong to the previous week.
            return input == null ? this.day() || 7 : this.day(this.day() % 7 ? input : input - 7);
        },

        isoWeeksInYear : function () {
            return weeksInYear(this.year(), 1, 4);
        },

        weeksInYear : function () {
            var weekInfo = this.localeData()._week;
            return weeksInYear(this.year(), weekInfo.dow, weekInfo.doy);
        },

        get : function (units) {
            units = normalizeUnits(units);
            return this[units]();
        },

        set : function (units, value) {
            units = normalizeUnits(units);
            if (typeof this[units] === 'function') {
                this[units](value);
            }
            return this;
        },

        // If passed a locale key, it will set the locale for this
        // instance.  Otherwise, it will return the locale configuration
        // variables for this instance.
        locale : function (key) {
            if (key === undefined) {
                return this._locale._abbr;
            } else {
                this._locale = moment.localeData(key);
                return this;
            }
        },

        lang : deprecate(
            "moment().lang() is deprecated. Use moment().localeData() instead.",
            function (key) {
                if (key === undefined) {
                    return this.localeData();
                } else {
                    this._locale = moment.localeData(key);
                    return this;
                }
            }
        ),

        localeData : function () {
            return this._locale;
        }
    });

    function rawMonthSetter(mom, value) {
        var dayOfMonth;

        // TODO: Move this out of here!
        if (typeof value === 'string') {
            value = mom.localeData().monthsParse(value);
            // TODO: Another silent failure?
            if (typeof value !== 'number') {
                return mom;
            }
        }

        dayOfMonth = Math.min(mom.date(),
                daysInMonth(mom.year(), value));
        mom._d['set' + (mom._isUTC ? 'UTC' : '') + 'Month'](value, dayOfMonth);
        return mom;
    }

    function rawGetter(mom, unit) {
        return mom._d['get' + (mom._isUTC ? 'UTC' : '') + unit]();
    }

    function rawSetter(mom, unit, value) {
        if (unit === 'Month') {
            return rawMonthSetter(mom, value);
        } else {
            return mom._d['set' + (mom._isUTC ? 'UTC' : '') + unit](value);
        }
    }

    function makeAccessor(unit, keepTime) {
        return function (value) {
            if (value != null) {
                rawSetter(this, unit, value);
                moment.updateOffset(this, keepTime);
                return this;
            } else {
                return rawGetter(this, unit);
            }
        };
    }

    moment.fn.millisecond = moment.fn.milliseconds = makeAccessor('Milliseconds', false);
    moment.fn.second = moment.fn.seconds = makeAccessor('Seconds', false);
    moment.fn.minute = moment.fn.minutes = makeAccessor('Minutes', false);
    // Setting the hour should keep the time, because the user explicitly
    // specified which hour he wants. So trying to maintain the same hour (in
    // a new timezone) makes sense. Adding/subtracting hours does not follow
    // this rule.
    moment.fn.hour = moment.fn.hours = makeAccessor('Hours', true);
    // moment.fn.month is defined separately
    moment.fn.date = makeAccessor('Date', true);
    moment.fn.dates = deprecate('dates accessor is deprecated. Use date instead.', makeAccessor('Date', true));
    moment.fn.year = makeAccessor('FullYear', true);
    moment.fn.years = deprecate('years accessor is deprecated. Use year instead.', makeAccessor('FullYear', true));

    // add plural methods
    moment.fn.days = moment.fn.day;
    moment.fn.months = moment.fn.month;
    moment.fn.weeks = moment.fn.week;
    moment.fn.isoWeeks = moment.fn.isoWeek;
    moment.fn.quarters = moment.fn.quarter;

    // add aliased format methods
    moment.fn.toJSON = moment.fn.toISOString;

    /************************************
        Duration Prototype
    ************************************/


    function daysToYears (days) {
        // 400 years have 146097 days (taking into account leap year rules)
        return days * 400 / 146097;
    }

    function yearsToDays (years) {
        // years * 365 + absRound(years / 4) -
        //     absRound(years / 100) + absRound(years / 400);
        return years * 146097 / 400;
    }

    extend(moment.duration.fn = Duration.prototype, {

        _bubble : function () {
            var milliseconds = this._milliseconds,
                days = this._days,
                months = this._months,
                data = this._data,
                seconds, minutes, hours, years = 0;

            // The following code bubbles up values, see the tests for
            // examples of what that means.
            data.milliseconds = milliseconds % 1000;

            seconds = absRound(milliseconds / 1000);
            data.seconds = seconds % 60;

            minutes = absRound(seconds / 60);
            data.minutes = minutes % 60;

            hours = absRound(minutes / 60);
            data.hours = hours % 24;

            days += absRound(hours / 24);

            // Accurately convert days to years, assume start from year 0.
            years = absRound(daysToYears(days));
            days -= absRound(yearsToDays(years));

            // 30 days to a month
            // TODO (iskren): Use anchor date (like 1st Jan) to compute this.
            months += absRound(days / 30);
            days %= 30;

            // 12 months -> 1 year
            years += absRound(months / 12);
            months %= 12;

            data.days = days;
            data.months = months;
            data.years = years;
        },

        abs : function () {
            this._milliseconds = Math.abs(this._milliseconds);
            this._days = Math.abs(this._days);
            this._months = Math.abs(this._months);

            this._data.milliseconds = Math.abs(this._data.milliseconds);
            this._data.seconds = Math.abs(this._data.seconds);
            this._data.minutes = Math.abs(this._data.minutes);
            this._data.hours = Math.abs(this._data.hours);
            this._data.months = Math.abs(this._data.months);
            this._data.years = Math.abs(this._data.years);

            return this;
        },

        weeks : function () {
            return absRound(this.days() / 7);
        },

        valueOf : function () {
            return this._milliseconds +
              this._days * 864e5 +
              (this._months % 12) * 2592e6 +
              toInt(this._months / 12) * 31536e6;
        },

        humanize : function (withSuffix) {
            var output = relativeTime(this, !withSuffix, this.localeData());

            if (withSuffix) {
                output = this.localeData().pastFuture(+this, output);
            }

            return this.localeData().postformat(output);
        },

        add : function (input, val) {
            // supports only 2.0-style add(1, 's') or add(moment)
            var dur = moment.duration(input, val);

            this._milliseconds += dur._milliseconds;
            this._days += dur._days;
            this._months += dur._months;

            this._bubble();

            return this;
        },

        subtract : function (input, val) {
            var dur = moment.duration(input, val);

            this._milliseconds -= dur._milliseconds;
            this._days -= dur._days;
            this._months -= dur._months;

            this._bubble();

            return this;
        },

        get : function (units) {
            units = normalizeUnits(units);
            return this[units.toLowerCase() + 's']();
        },

        as : function (units) {
            var days, months;
            units = normalizeUnits(units);

            days = this._days + this._milliseconds / 864e5;
            if (units === 'month' || units === 'year') {
                months = this._months + daysToYears(days) * 12;
                return units === 'month' ? months : months / 12;
            } else {
                days += yearsToDays(this._months / 12);
                switch (units) {
                    case 'week': return days / 7;
                    case 'day': return days;
                    case 'hour': return days * 24;
                    case 'minute': return days * 24 * 60;
                    case 'second': return days * 24 * 60 * 60;
                    case 'millisecond': return days * 24 * 60 * 60 * 1000;
                    default: throw new Error('Unknown unit ' + units);
                }
            }
        },

        lang : moment.fn.lang,
        locale : moment.fn.locale,

        toIsoString : deprecate(
            "toIsoString() is deprecated. Please use toISOString() instead " +
            "(notice the capitals)",
            function () {
                return this.toISOString();
            }
        ),

        toISOString : function () {
            // inspired by https://github.com/dordille/moment-isoduration/blob/master/moment.isoduration.js
            var years = Math.abs(this.years()),
                months = Math.abs(this.months()),
                days = Math.abs(this.days()),
                hours = Math.abs(this.hours()),
                minutes = Math.abs(this.minutes()),
                seconds = Math.abs(this.seconds() + this.milliseconds() / 1000);

            if (!this.asSeconds()) {
                // this is the same as C#'s (Noda) and python (isodate)...
                // but not other JS (goog.date)
                return 'P0D';
            }

            return (this.asSeconds() < 0 ? '-' : '') +
                'P' +
                (years ? years + 'Y' : '') +
                (months ? months + 'M' : '') +
                (days ? days + 'D' : '') +
                ((hours || minutes || seconds) ? 'T' : '') +
                (hours ? hours + 'H' : '') +
                (minutes ? minutes + 'M' : '') +
                (seconds ? seconds + 'S' : '');
        },

        localeData : function () {
            return this._locale;
        }
    });

    function makeDurationGetter(name) {
        moment.duration.fn[name] = function () {
            return this._data[name];
        };
    }

    for (i in unitMillisecondFactors) {
        if (unitMillisecondFactors.hasOwnProperty(i)) {
            makeDurationGetter(i.toLowerCase());
        }
    }

    moment.duration.fn.asMilliseconds = function () {
        return this.as('ms');
    };
    moment.duration.fn.asSeconds = function () {
        return this.as('s');
    };
    moment.duration.fn.asMinutes = function () {
        return this.as('m');
    };
    moment.duration.fn.asHours = function () {
        return this.as('h');
    };
    moment.duration.fn.asDays = function () {
        return this.as('d');
    };
    moment.duration.fn.asWeeks = function () {
        return this.as('weeks');
    };
    moment.duration.fn.asMonths = function () {
        return this.as('M');
    };
    moment.duration.fn.asYears = function () {
        return this.as('y');
    };

    /************************************
        Default Locale
    ************************************/


    // Set default locale, other locale will inherit from English.
    moment.locale('en', {
        ordinal : function (number) {
            var b = number % 10,
                output = (toInt(number % 100 / 10) === 1) ? 'th' :
                (b === 1) ? 'st' :
                (b === 2) ? 'nd' :
                (b === 3) ? 'rd' : 'th';
            return number + output;
        }
    });

    /* EMBED_LOCALES */

    /************************************
        Exposing Moment
    ************************************/

    function makeGlobal(shouldDeprecate) {
        /*global ender:false */
        if (typeof ender !== 'undefined') {
            return;
        }
        oldGlobalMoment = globalScope.moment;
        if (shouldDeprecate) {
            globalScope.moment = deprecate(
                    'Accessing Moment through the global scope is ' +
                    'deprecated, and will be removed in an upcoming ' +
                    'release.',
                    moment);
        } else {
            globalScope.moment = moment;
        }
    }

    // CommonJS module is defined
    if (hasModule) {
        module.exports = moment;
    } else if (typeof define === 'function' && define.amd) {
        define('moment', function (require, exports, module) {
            if (module.config && module.config() && module.config().noGlobal === true) {
                // release the global variable
                globalScope.moment = oldGlobalMoment;
            }

            return moment;
        });
        makeGlobal(true);
    } else {
        makeGlobal();
    }
}).call(this);

moment.locale('fr', {
    months : "janvier_février_mars_avril_mai_juin_juillet_août_septembre_octobre_novembre_décembre".split("_"),
    monthsShort : "janv._févr._mars_avr._mai_juin_juil._août_sept._oct._nov._déc.".split("_"),
    weekdays : "dimanche_lundi_mardi_mercredi_jeudi_vendredi_samedi".split("_"),
    weekdaysShort : "dim._lun._mar._mer._jeu._ven._sam.".split("_"),
    weekdaysMin : "Di_Lu_Ma_Me_Je_Ve_Sa".split("_"),
    longDateFormat : {
        LT : "HH:mm",
        L : "DD/MM/YYYY",
        LL : "D MMMM YYYY",
        LLL : "D MMMM YYYY LT",
        LLLL : "dddd D MMMM YYYY LT"
    },
    calendar : {
        sameDay: "[Aujourd'hui à] LT",
        nextDay: '[Demain à] LT',
        nextWeek: 'dddd [à] LT',
        lastDay: '[Hier à] LT',
        lastWeek: 'dddd [dernier à] LT',
        sameElse: 'L'
    },
    relativeTime : {
        future : "dans %s",
        past : "il y a %s",
        s : "quelques secondes",
        m : "une minute",
        mm : "%d minutes",
        h : "une heure",
        hh : "%d heures",
        d : "un jour",
        dd : "%d jours",
        M : "un mois",
        MM : "%d mois",
        y : "une année",
        yy : "%d années"
    },
    ordinal : function (number) {
        return number + (number === 1 ? 'er' : 'ème');
    },
    week : {
        dow : 1, // Monday is the first day of the week.
        doy : 4  // The week that contains Jan 4th is the first week of the year.
    }
});
/**
* @version: 1.3.2
* @author: Dan Grossman http://www.dangrossman.info/
* @date: 2014-01-22
* @copyright: Copyright (c) 2012-2014 Dan Grossman. All rights reserved.
* @license: Licensed under Apache License v2.0. See http://www.apache.org/licenses/LICENSE-2.0
*/
!function ($) {

    var DateRangePicker = function (element, options, cb) {

        // by default, the daterangepicker element is placed at the bottom of HTML body
        this.parentEl = 'body';

        //element that triggered the date range picker
        this.element = $(element);

        //create the picker HTML object
        var DRPTemplate = '<div class="daterangepicker dropdown-menu">' +
                '<div class="calendar left"></div>' +
                '<div class="calendar right"></div>' +
                '<div class="ranges">' +
                '</div>' +
              '</div>';

        this.parentEl = (typeof options == 'object' && options.parentEl && $(options.parentEl)) || $(this.parentEl);
        this.container = $(DRPTemplate).appendTo(this.parentEl);

        //custom options
        if (typeof options != 'object')
            options = {};
        this.setOptions(options, cb);

        //apply CSS classes and labels to buttons
        var c = this.container;
        $.each(this.buttonClasses, function (idx, val) {
            c.find('button').addClass(val);
        });
        this.container.find('.daterangepicker_start_input label').html(this.locale.fromLabel);
        this.container.find('.daterangepicker_end_input label').html(this.locale.toLabel);
        if (this.applyClass.length)
            this.container.find('.applyBtn').addClass(this.applyClass);
        if (this.cancelClass.length)
            this.container.find('.cancelBtn').addClass(this.cancelClass);
        this.container.find('.applyBtn').html(this.locale.applyLabel);
        this.container.find('.cancelBtn').html(this.locale.cancelLabel);

        //event listeners
        this.container.on('mousedown', $.proxy(this.mousedown, this));

        this.container.find('.calendar')
            .on('click', '.prev', $.proxy(this.clickPrev, this))
            .on('click', '.next', $.proxy(this.clickNext, this))
            .on('click', 'td.available', $.proxy(this.clickDate, this))
            .on('mouseenter', 'td.available', $.proxy(this.enterDate, this))
            .on('mouseleave', 'td.available', $.proxy(this.updateFormInputs, this))
            .on('change', 'select.yearselect', $.proxy(this.updateMonthYear, this))
            .on('change', 'select.monthselect', $.proxy(this.updateMonthYear, this))
            .on('change', 'select.hourselect,select.minuteselect,select.ampmselect', $.proxy(this.updateTime, this));

        this.container.find('.ranges')
            .on('click', 'button.applyBtn', $.proxy(this.clickApply, this))
            .on('click', 'button.cancelBtn', $.proxy(this.clickCancel, this))
            .on('click', '.daterangepicker_start_input,.daterangepicker_end_input', $.proxy(this.showCalendars, this))
            .on('click', 'li', $.proxy(this.clickRange, this))
            .on('mouseenter', 'li', $.proxy(this.enterRange, this))
            .on('mouseleave', 'li', $.proxy(this.updateFormInputs, this));

        if (this.element.is('input')) {
            this.element.on({
                'click.daterangepicker': $.proxy(this.show, this),
                'focus.daterangepicker': $.proxy(this.show, this),
                'keyup.daterangepicker': $.proxy(this.updateFromControl, this)
            });
        } else {
            this.element.on('click.daterangepicker', $.proxy(this.show, this));
        }

    };

    DateRangePicker.prototype = {

        constructor: DateRangePicker,

        setOptions: function(options, callback) {

            this.startDate = moment().startOf('day');
            this.endDate = moment().startOf('day');
            this.minDate = false;
            this.maxDate = false;
            this.dateLimit = false;

            this.showDropdowns = false;
            this.showWeekNumbers = false;
            this.timePicker = false;
            this.timePickerIncrement = 30;
            this.timePicker12Hour = true;
            this.singleDatePicker = false;
            this.ranges = {};

            this.opens = 'right';
            if (this.element.hasClass('pull-right'))
                this.opens = 'left';

            this.buttonClasses = ['btn', 'btn-small'];
            this.applyClass = 'btn-success';
            this.cancelClass = 'btn-default';

            this.format = 'MM/DD/YYYY';
            this.separator = ' - ';

            this.locale = {
                applyLabel: 'Modifier',
                cancelLabel: 'Annuler',
                fromLabel: 'De',
                toLabel: 'A',
                weekLabel: 'S',
                customRangeLabel: 'Personnaliser',
                daysOfWeek: moment()._lang._weekdaysMin.slice(),
                monthNames: moment()._lang._monthsShort.slice(),
                firstDay: 0
            };

            this.cb = function () { };

            if (typeof options.format == 'string')
                this.format = options.format;

            if (typeof options.separator == 'string')
                this.separator = options.separator;

            if (typeof options.startDate == 'string')
                this.startDate = moment(options.startDate, this.format);

            if (typeof options.endDate == 'string')
                this.endDate = moment(options.endDate, this.format);

            if (typeof options.minDate == 'string')
                this.minDate = moment(options.minDate, this.format);

            if (typeof options.maxDate == 'string')
                this.maxDate = moment(options.maxDate, this.format);

            if (typeof options.startDate == 'object')
                this.startDate = moment(options.startDate);

            if (typeof options.endDate == 'object')
                this.endDate = moment(options.endDate);

            if (typeof options.minDate == 'object')
                this.minDate = moment(options.minDate);

            if (typeof options.maxDate == 'object')
                this.maxDate = moment(options.maxDate);

            if (typeof options.applyClass == 'string')
                this.applyClass = options.applyClass;

            if (typeof options.cancelClass == 'string')
                this.cancelClass = options.cancelClass;

            if (typeof options.dateLimit == 'object')
                this.dateLimit = options.dateLimit;

            // update day names order to firstDay
            if (typeof options.locale == 'object') {

                if (typeof options.locale.daysOfWeek == 'object') {
                    // Create a copy of daysOfWeek to avoid modification of original
                    // options object for reusability in multiple daterangepicker instances
                    this.locale.daysOfWeek = options.locale.daysOfWeek.slice();
                }

                if (typeof options.locale.monthNames == 'object') {
                  this.locale.monthNames = options.locale.monthNames.slice();
                }

                if (typeof options.locale.firstDay == 'number') {
                    this.locale.firstDay = options.locale.firstDay;
                    var iterator = options.locale.firstDay;
                    while (iterator > 0) {
                        this.locale.daysOfWeek.push(this.locale.daysOfWeek.shift());
                        iterator--;
                    }
                }

                if (typeof options.locale.applyLabel == 'string') {
                  this.locale.applyLabel = options.locale.applyLabel;
                }

                if (typeof options.locale.cancelLabel == 'string') {
                  this.locale.cancelLabel = options.locale.cancelLabel;
                }

                if (typeof options.locale.fromLabel == 'string') {
                  this.locale.fromLabel = options.locale.fromLabel;
                }

                if (typeof options.locale.toLabel == 'string') {
                  this.locale.toLabel = options.locale.toLabel;
                }

                if (typeof options.locale.weekLabel == 'string') {
                  this.locale.weekLabel = options.locale.weekLabel;
                }

                if (typeof options.locale.customRangeLabel == 'string') {
                  this.locale.customRangeLabel = options.locale.customRangeLabel;
                }
            }

            if (typeof options.opens == 'string')
                this.opens = options.opens;

            if (typeof options.showWeekNumbers == 'boolean') {
                this.showWeekNumbers = options.showWeekNumbers;
            }

            if (typeof options.buttonClasses == 'string') {
                this.buttonClasses = [options.buttonClasses];
            }

            if (typeof options.buttonClasses == 'object') {
                this.buttonClasses = options.buttonClasses;
            }

            if (typeof options.showDropdowns == 'boolean') {
                this.showDropdowns = options.showDropdowns;
            }

            if (typeof options.singleDatePicker == 'boolean') {
                this.singleDatePicker = options.singleDatePicker;
            }

            if (typeof options.timePicker == 'boolean') {
                this.timePicker = options.timePicker;
            }

            if (typeof options.timePickerIncrement == 'number') {
                this.timePickerIncrement = options.timePickerIncrement;
            }

            if (typeof options.timePicker12Hour == 'boolean') {
                this.timePicker12Hour = options.timePicker12Hour;
            }

            //if no start/end dates set, check if an input element contains initial values
            if (typeof options.startDate == 'undefined' && typeof options.endDate == 'undefined') {
                if ($(this.element).is('input[type=text]')) {
                    var val = $(this.element).val();
                    var split = val.split(this.separator);
                    var start, end;
                    if (split.length == 2) {
                        start = moment(split[0], this.format);
                        end = moment(split[1], this.format);
                    } else if (this.singleDatePicker) {
                        start = moment(val, this.format);
                        end = moment(val, this.format);
                    }
                    if (start != null && end != null) {
                        this.startDate = start;
                        this.endDate = end;
                    }
                }
            }

            if (typeof options.ranges == 'object') {
                for (var range in options.ranges) {

                    var start = moment(options.ranges[range][0]);
                    var end = moment(options.ranges[range][1]);

                    // If we have a min/max date set, bound this range
                    // to it, but only if it would otherwise fall
                    // outside of the min/max.
                    if (this.minDate && start.isBefore(this.minDate))
                        start = moment(this.minDate);

                    if (this.maxDate && end.isAfter(this.maxDate))
                        end = moment(this.maxDate);

                    // If the end of the range is before the minimum (if min is set) OR
                    // the start of the range is after the max (also if set) don't display this
                    // range option.
                    if ((this.minDate && end.isBefore(this.minDate)) || (this.maxDate && start.isAfter(this.maxDate))) {
                        continue;
                    }

                    this.ranges[range] = [start, end];
                }

                var list = '<ul>';
                for (var range in this.ranges) {
                    list += '<li>' + range + '</li>';
                }
                list += '<li>' + this.locale.customRangeLabel + '</li>';
                list += '</ul>';
                this.container.find('.ranges ul').remove();
                this.container.find('.ranges').prepend(list);
            }

            if (typeof callback == 'function') {
                this.cb = callback;
            }

            if (!this.timePicker) {
                this.startDate = this.startDate.startOf('day');
                this.endDate = this.endDate.startOf('day');
            }

            if (this.singleDatePicker) {
                this.opens = 'right';
                this.container.find('.calendar.right').show();
                this.container.find('.calendar.left').hide();
                this.container.find('.ranges').hide();
                if (!this.container.find('.calendar.right').hasClass('single'))
                    this.container.find('.calendar.right').addClass('single');
            } else {
                this.container.find('.calendar.right').removeClass('single');
                this.container.find('.ranges').show();
            }

            this.oldStartDate = this.startDate.clone();
            this.oldEndDate = this.endDate.clone();

            this.leftCalendar = {
                month: moment([this.startDate.year(), this.startDate.month(), 1, this.startDate.hour(), this.startDate.minute()]),
                calendar: []
            };

            this.rightCalendar = {
                month: moment([this.endDate.year(), this.endDate.month(), 1, this.endDate.hour(), this.endDate.minute()]),
                calendar: []
            };

            if (this.opens == 'right') {
                //swap calendar positions
                var left = this.container.find('.calendar.left');
                var right = this.container.find('.calendar.right');
                left.removeClass('left').addClass('right');
                right.removeClass('right').addClass('left');
            }

            if (typeof options.ranges == 'undefined' && !this.singleDatePicker) {
                this.container.find('.calendar').show();
            }

            this.container.addClass('opens' + this.opens);

            this.updateView();
            this.updateCalendars()

        },

        setStartDate: function(startDate) {
            if (typeof startDate == 'string')
                this.startDate = moment(startDate, this.format);

            if (typeof startDate == 'object')
                this.startDate = moment(startDate);

            if (!this.timePicker)
                this.startDate = this.startDate.startOf('day');

            this.oldStartDate = this.startDate.clone();

            this.updateView();
            this.updateCalendars();
        },

        setEndDate: function(endDate) {
            if (typeof endDate == 'string')
                this.endDate = moment(endDate, this.format);

            if (typeof endDate == 'object')
                this.endDate = moment(endDate);

            if (!this.timePicker)
                this.endDate = this.endDate.startOf('day');

            this.oldEndDate = this.endDate.clone();

            this.updateView();
            this.updateCalendars();
        },

        mousedown: function (e) {
            e.stopPropagation();
        },

        updateView: function () {
            this.leftCalendar.month.month(this.startDate.month()).year(this.startDate.year());
            this.rightCalendar.month.month(this.endDate.month()).year(this.endDate.year());
            this.updateFormInputs();
        },

        updateFormInputs: function () {
            this.container.find('input[name=daterangepicker_start]').val(this.startDate.format(this.format));
            this.container.find('input[name=daterangepicker_end]').val(this.endDate.format(this.format));

            if (this.startDate.isSame(this.endDate) || this.startDate.isBefore(this.endDate)) {
                this.container.find('button.applyBtn').removeAttr('disabled');
            } else {
                this.container.find('button.applyBtn').attr('disabled', 'disabled');
            }
        },

        updateFromControl: function () {
            if (!this.element.is('input')) return;
            if (!this.element.val().length) return;

            var dateString = this.element.val().split(this.separator);
            var start = moment(dateString[0], this.format);
            var end = moment(dateString[1], this.format);

            if (this.singleDatePicker) {
                start = moment(this.element.val(), this.format);
                end = start;
            }

            if (start == null || end == null) return;
            if (end.isBefore(start)) return;

            this.oldStartDate = this.startDate.clone();
            this.oldEndDate = this.endDate.clone();

            this.startDate = start;
            this.endDate = end;

            if (!this.startDate.isSame(this.oldStartDate) || !this.endDate.isSame(this.oldEndDate))
                this.notify();

            this.updateCalendars();
        },

        notify: function () {
            this.updateView();
            this.cb(this.startDate, this.endDate);
        },

        move: function () {
            var parentOffset = { top: 0, left: 0 };
            if (!this.parentEl.is('body')) {
                parentOffset = {
                    top: this.parentEl.offset().top - this.parentEl.scrollTop(),
                    left: this.parentEl.offset().left - this.parentEl.scrollLeft()
                };
            }
            
            if (this.opens == 'left') {
                this.container.css({
                    top: this.element.offset().top + this.element.outerHeight() - parentOffset.top,
                    right: $(window).width() - this.element.offset().left - this.element.outerWidth() - parentOffset.left,
                    left: 'auto'
                });
                if (this.container.offset().left < 0) {
                    this.container.css({
                        right: 'auto',
                        left: 9
                    });
                }
            } else {
                this.container.css({
                    top: this.element.offset().top + this.element.outerHeight() - parentOffset.top,
                    left: this.element.offset().left - parentOffset.left,
                    right: 'auto'
                });
                if (this.container.offset().left + this.container.outerWidth() > $(window).width()) {
                    this.container.css({
                        left: 'auto',
                        right: 0
                    });
                }
            }
        },

        show: function (e) {
            this.container.show();
            this.move();

            if (e) {
                e.stopPropagation();
                e.preventDefault();
            }

            $(document).on('mousedown', $.proxy(this.hide, this));
            this.element.trigger('show', this);
        },

        hide: function (e) {
            this.container.hide();

            if (!this.startDate.isSame(this.oldStartDate) || !this.endDate.isSame(this.oldEndDate))
                this.notify();

            this.oldStartDate = this.startDate.clone();
            this.oldEndDate = this.endDate.clone();

            $(document).off('mousedown', this.hide);
            this.element.trigger('hide', this);
        },

        enterRange: function (e) {
            var label = e.target.innerHTML;
            if (label == this.locale.customRangeLabel) {
                this.updateView();
            } else {
                var dates = this.ranges[label];
                this.container.find('input[name=daterangepicker_start]').val(dates[0].format(this.format));
                this.container.find('input[name=daterangepicker_end]').val(dates[1].format(this.format));
            }
        },

        showCalendars: function() {
            this.container.find('.calendar').show();
            this.move();
        },

        updateInputText: function() {
            if (this.element.is('input') && !this.singleDatePicker) {
                this.element.val(this.startDate.format(this.format) + this.separator + this.endDate.format(this.format));
            } else if (this.element.is('input')) {
                this.element.val(this.startDate.format(this.format));
            }

        },

        clickRange: function (e) {
            var label = e.target.innerHTML;
            if (label == this.locale.customRangeLabel) {
                this.showCalendars();
            } else {
                var dates = this.ranges[label];

                this.startDate = dates[0];
                this.endDate = dates[1];

                if (!this.timePicker) {
                    this.startDate.startOf('day');
                    this.endDate.startOf('day');
                }

                this.leftCalendar.month.month(this.startDate.month()).year(this.startDate.year()).hour(this.startDate.hour()).minute(this.startDate.minute());
                this.rightCalendar.month.month(this.endDate.month()).year(this.endDate.year()).hour(this.endDate.hour()).minute(this.endDate.minute());
                this.updateCalendars();

                this.updateInputText();

                this.container.find('.calendar').hide();
                this.hide();
                this.element.trigger('apply', this);
            }
        },

        clickPrev: function (e) {
            var cal = $(e.target).parents('.calendar');
            if (cal.hasClass('left')) {
                this.leftCalendar.month.subtract('month', 1);
            } else {
                this.rightCalendar.month.subtract('month', 1);
            }
            this.updateCalendars();
        },

        clickNext: function (e) {
            var cal = $(e.target).parents('.calendar');
            if (cal.hasClass('left')) {
                this.leftCalendar.month.add('month', 1);
            } else {
                this.rightCalendar.month.add('month', 1);
            }
            this.updateCalendars();
        },

        enterDate: function (e) {

            var title = $(e.target).attr('data-title');
            var row = title.substr(1, 1);
            var col = title.substr(3, 1);
            var cal = $(e.target).parents('.calendar');

            if (cal.hasClass('left')) {
                this.container.find('input[name=daterangepicker_start]').val(this.leftCalendar.calendar[row][col].format(this.format));
            } else {
                this.container.find('input[name=daterangepicker_end]').val(this.rightCalendar.calendar[row][col].format(this.format));
            }

        },

        clickDate: function (e) {
            var title = $(e.target).attr('data-title');
            var row = title.substr(1, 1);
            var col = title.substr(3, 1);
            var cal = $(e.target).parents('.calendar');

            if (cal.hasClass('left')) {
                var startDate = this.leftCalendar.calendar[row][col];
                var endDate = this.endDate;
                if (typeof this.dateLimit == 'object') {
                    var maxDate = moment(startDate).add(this.dateLimit).startOf('day');
                    if (endDate.isAfter(maxDate)) {
                        endDate = maxDate;
                    }
                }
            } else {
                var startDate = this.startDate;
                var endDate = this.rightCalendar.calendar[row][col];
                if (typeof this.dateLimit == 'object') {
                    var minDate = moment(endDate).subtract(this.dateLimit).startOf('day');
                    if (startDate.isBefore(minDate)) {
                        startDate = minDate;
                    }
                }
            }

            if (this.singleDatePicker && cal.hasClass('left')) {
                endDate = startDate;
            } else if (this.singleDatePicker && cal.hasClass('right')) {
                startDate = endDate;
            }

            cal.find('td').removeClass('active');

            if (startDate.isSame(endDate) || startDate.isBefore(endDate)) {
                $(e.target).addClass('active');
                this.startDate = startDate;
                this.endDate = endDate;
            } else if (startDate.isAfter(endDate)) {
                $(e.target).addClass('active');
                this.startDate = startDate;
                this.endDate = moment(startDate).add('day', 1).startOf('day');
            }

            this.leftCalendar.month.month(this.startDate.month()).year(this.startDate.year());
            this.rightCalendar.month.month(this.endDate.month()).year(this.endDate.year());
            this.updateCalendars();

            if (this.singleDatePicker)
                this.clickApply();
        },

        clickApply: function (e) {
            this.updateInputText();
            this.hide();
            this.element.trigger('apply', this);
        },

        clickCancel: function (e) {
            this.startDate = this.oldStartDate;
            this.endDate = this.oldEndDate;
            this.updateView();
            this.updateCalendars();
            this.hide();
            this.element.trigger('cancel', this);
        },

        updateMonthYear: function (e) {

            var isLeft = $(e.target).closest('.calendar').hasClass('left');
            var cal = this.container.find('.calendar.left');
            if (!isLeft)
                cal = this.container.find('.calendar.right');

            // Month must be Number for new moment versions
            var month = parseInt(cal.find('.monthselect').val(), 10);
            var year = cal.find('.yearselect').val();

            if (isLeft) {
                this.leftCalendar.month.month(month).year(year);
            } else {
                this.rightCalendar.month.month(month).year(year);
            }

            this.updateCalendars();

        },

        updateTime: function(e) {

            var isLeft = $(e.target).closest('.calendar').hasClass('left');
            var cal = this.container.find('.calendar.left');
            if (!isLeft)
                cal = this.container.find('.calendar.right');

            var hour = parseInt(cal.find('.hourselect').val());
            var minute = parseInt(cal.find('.minuteselect').val());

            if (this.timePicker12Hour) {
                var ampm = cal.find('.ampmselect').val();
                if (ampm == 'PM' && hour < 12)
                    hour += 12;
                if (ampm == 'AM' && hour == 12)
                    hour = 0;
            }

            if (isLeft) {
                var start = this.startDate.clone();
                start.hour(hour);
                start.minute(minute);
                this.startDate = start;
                this.leftCalendar.month.hour(hour).minute(minute);
            } else {
                var end = this.endDate.clone();
                end.hour(hour);
                end.minute(minute);
                this.endDate = end;
                this.rightCalendar.month.hour(hour).minute(minute);
            }

            this.updateCalendars();

        },

        updateCalendars: function () {
            this.leftCalendar.calendar = this.buildCalendar(this.leftCalendar.month.month(), this.leftCalendar.month.year(), this.leftCalendar.month.hour(), this.leftCalendar.month.minute(), 'left');
            this.rightCalendar.calendar = this.buildCalendar(this.rightCalendar.month.month(), this.rightCalendar.month.year(), this.rightCalendar.month.hour(), this.rightCalendar.month.minute(), 'right');
            this.container.find('.calendar.left').html(this.renderCalendar(this.leftCalendar.calendar, this.startDate, this.minDate, this.maxDate));
            this.container.find('.calendar.right').html(this.renderCalendar(this.rightCalendar.calendar, this.endDate, this.startDate, this.maxDate));

            this.container.find('.ranges li').removeClass('active');
            var customRange = true;
            var i = 0;
            for (var range in this.ranges) {
                if (this.timePicker) {
                    if (this.startDate.isSame(this.ranges[range][0]) && this.endDate.isSame(this.ranges[range][1])) {
                        customRange = false;
                        this.container.find('.ranges li:eq(' + i + ')').addClass('active');
                    }
                } else {
                    //ignore times when comparing dates if time picker is not enabled
                    if (this.startDate.format('YYYY-MM-DD') == this.ranges[range][0].format('YYYY-MM-DD') && this.endDate.format('YYYY-MM-DD') == this.ranges[range][1].format('YYYY-MM-DD')) {
                        customRange = false;
                        this.container.find('.ranges li:eq(' + i + ')').addClass('active');
                    }
                }
                i++;
            }
            if (customRange)
                this.container.find('.ranges li:last').addClass('active');
        },

        buildCalendar: function (month, year, hour, minute, side) {

            var firstDay = moment([year, month, 1]);
            var lastMonth = moment(firstDay).subtract('month', 1).month();
            var lastYear = moment(firstDay).subtract('month', 1).year();

            var daysInLastMonth = moment([lastYear, lastMonth]).daysInMonth();

            var dayOfWeek = firstDay.day();

            //initialize a 6 rows x 7 columns array for the calendar
            var calendar = [];
            for (var i = 0; i < 6; i++) {
                calendar[i] = [];
            }

            //populate the calendar with date objects
            var startDay = daysInLastMonth - dayOfWeek + this.locale.firstDay + 1;
            if (startDay > daysInLastMonth)
                startDay -= 7;

            if (dayOfWeek == this.locale.firstDay)
                startDay = daysInLastMonth - 6;

            var curDate = moment([lastYear, lastMonth, startDay, 12, minute]);
            for (var i = 0, col = 0, row = 0; i < 42; i++, col++, curDate = moment(curDate).add('hour', 24)) {
                if (i > 0 && col % 7 == 0) {
                    col = 0;
                    row++;
                }
                calendar[row][col] = curDate.clone().hour(hour);
                curDate.hour(12);
            }

            return calendar;

        },

        renderDropdowns: function (selected, minDate, maxDate) {
            var currentMonth = selected.month();
            var monthHtml = '<select class="monthselect">';
            var inMinYear = false;
            var inMaxYear = false;

            for (var m = 0; m < 12; m++) {
                if ((!inMinYear || m >= minDate.month()) && (!inMaxYear || m <= maxDate.month())) {
                    monthHtml += "<option value='" + m + "'" +
                        (m === currentMonth ? " selected='selected'" : "") +
                        ">" + this.locale.monthNames[m] + "</option>";
                }
            }
            monthHtml += "</select>";

            var currentYear = selected.year();
            var maxYear = (maxDate && maxDate.year()) || (currentYear + 5);
            var minYear = (minDate && minDate.year()) || (currentYear - 50);
            var yearHtml = '<select class="yearselect">';

            for (var y = minYear; y <= maxYear; y++) {
                yearHtml += '<option value="' + y + '"' +
                    (y === currentYear ? ' selected="selected"' : '') +
                    '>' + y + '</option>';
            }

            yearHtml += '</select>';

            return monthHtml + yearHtml;
        },

        renderCalendar: function (calendar, selected, minDate, maxDate) {

            var html = '<div class="calendar-date">';
            html += '<table class="table-condensed">';
            html += '<thead>';
            html += '<tr>';

            // add empty cell for week number
            if (this.showWeekNumbers)
                html += '<th></th>';

            if (!minDate || minDate.isBefore(calendar[1][1])) {
                html += '<th class="prev available"><i class="fa fa-arrow-left icon-arrow-left glyphicon glyphicon-arrow-left"></i></th>';
            } else {
                html += '<th></th>';
            }

            var dateHtml = this.locale.monthNames[calendar[1][1].month()] + calendar[1][1].format(" YYYY");

            if (this.showDropdowns) {
                dateHtml = this.renderDropdowns(calendar[1][1], minDate, maxDate);
            }

            html += '<th colspan="5" class="month">' + dateHtml + '</th>';
            if (!maxDate || maxDate.isAfter(calendar[1][1])) {
                html += '<th class="next available"><i class="fa fa-arrow-right icon-arrow-right glyphicon glyphicon-arrow-right"></i></th>';
            } else {
                html += '<th></th>';
            }

            html += '</tr>';
            html += '<tr>';

            // add week number label
            if (this.showWeekNumbers)
                html += '<th class="week">' + this.locale.weekLabel + '</th>';

            $.each(this.locale.daysOfWeek, function (index, dayOfWeek) {
                html += '<th>' + dayOfWeek + '</th>';
            });

            html += '</tr>';
            html += '</thead>';
            html += '<tbody>';

            for (var row = 0; row < 6; row++) {
                html += '<tr>';

                // add week number
                if (this.showWeekNumbers)
                    html += '<td class="week">' + calendar[row][0].week() + '</td>';

                for (var col = 0; col < 7; col++) {
                    var cname = 'available ';
                    cname += (calendar[row][col].month() == calendar[1][1].month()) ? '' : 'off';

                    if ((minDate && calendar[row][col].isBefore(minDate)) || (maxDate && calendar[row][col].isAfter(maxDate))) {
                        cname = ' off disabled ';
                    } else if (calendar[row][col].format('YYYY-MM-DD') == selected.format('YYYY-MM-DD')) {
                        cname += ' active ';
                        if (calendar[row][col].format('YYYY-MM-DD') == this.startDate.format('YYYY-MM-DD')) {
                            cname += ' start-date ';
                        }
                        if (calendar[row][col].format('YYYY-MM-DD') == this.endDate.format('YYYY-MM-DD')) {
                            cname += ' end-date ';
                        }
                    } else if (calendar[row][col] >= this.startDate && calendar[row][col] <= this.endDate) {
                        cname += ' in-range ';
                        if (calendar[row][col].isSame(this.startDate)) { cname += ' start-date '; }
                        if (calendar[row][col].isSame(this.endDate)) { cname += ' end-date '; }
                    }

                    var title = 'r' + row + 'c' + col;
                    html += '<td class="' + cname.replace(/\s+/g, ' ').replace(/^\s?(.*?)\s?$/, '$1') + '" data-title="' + title + '">' + calendar[row][col].date() + '</td>';
                }
                html += '</tr>';
            }

            html += '</tbody>';
            html += '</table>';
            html += '</div>';

            if (this.timePicker) {

                html += '<div class="calendar-time">';
                html += '<select class="hourselect">';
                var start = 0;
                var end = 23;
                var selected_hour = selected.hour();
                if (this.timePicker12Hour) {
                    start = 1;
                    end = 12;
                    if (selected_hour >= 12)
                        selected_hour -= 12;
                    if (selected_hour == 0)
                        selected_hour = 12;
                }

                for (var i = start; i <= end; i++) {
                    if (i == selected_hour) {
                        html += '<option value="' + i + '" selected="selected">' + i + '</option>';
                    } else {
                        html += '<option value="' + i + '">' + i + '</option>';
                    }
                }

                html += '</select> : ';

                html += '<select class="minuteselect">';

                for (var i = 0; i < 60; i += this.timePickerIncrement) {
                    var num = i;
                    if (num < 10)
                        num = '0' + num;
                    if (i == selected.minute()) {
                        html += '<option value="' + i + '" selected="selected">' + num + '</option>';
                    } else {
                        html += '<option value="' + i + '">' + num + '</option>';
                    }
                }

                html += '</select> ';

                if (this.timePicker12Hour) {
                    html += '<select class="ampmselect">';
                    if (selected.hour() >= 12) {
                        html += '<option value="AM">AM</option><option value="PM" selected="selected">PM</option>';
                    } else {
                        html += '<option value="AM" selected="selected">AM</option><option value="PM">PM</option>';
                    }
                    html += '</select>';
                }

                html += '</div>';

            }

            return html;

        },

        remove: function() {

            this.container.remove();
            this.element.off('.daterangepicker');
            this.element.removeData('daterangepicker');

        }

    };

    $.fn.daterangepicker = function (options, cb) {
        this.each(function () {
            var el = $(this);
            if (el.data('daterangepicker'))
                el.data('daterangepicker').remove();
            el.data('daterangepicker', new DateRangePicker(el, options, cb));
        });
        return this;
    };

}(window.jQuery);
$(function(){

	$.ajaxPrefilter(function (options) {
	    options.url = root + options.url;
	});
	var lily = lily || {};
	
	/*================================
	Création du model Data
	====================================*/
	
	lily.Data = Backbone.Model.extend({
	
	    initialize: function () {
	        this.url = "/data";
	    },	
	});
	
	/*========================================
	  Utilisation Vue
	=========================================*/
	
	lily.UsageView = Backbone.View.extend({
	
		el: '#statistics-row',
	    template: _.template($('#usage').html()),
	    initialize: function () {
	    
	        this.render();
	               
	    },
	    render: function () {
	    	
	        this.$el.html(this.template());
	        return this;
	        
	    },
	    remove: function () {
	    	
			this.$el.empty();
			this.$el.unbind();
			return this;
	   		
	    },
	
	});
	
	/*========================================
	  Dialogue Vue
	=========================================*/
	
	lily.DialogueView = Backbone.View.extend({
	
		el: '#statistics-row',
	    template: _.template($('#dialogue').html()),
	    initialize: function () {
	    
	        this.render();
	               
	    },
	    render: function () {
	    	
	        this.$el.html(this.template());
	        return this;
	        
	    },
	    remove: function () {
	    	
			this.$el.empty();
			this.$el.unbind();
			return this;
	   		
	    },
	
	});
	
	/*======================================
	Graph Dialogue
	=========================================*/
	
	lily.DialogueGraphView = Backbone.View.extend({
	    model: lily.Data,
	    el: '#graph',
	    template: _.template($('#graph-dialogue').html()),
	    templateFooter: _.template($('#graph-dialogue-footer').html()),
	    initialize: function() {
	    	this.data = new lily.Data();
	    	this.footer = new lily.Data();
	    	if (typeof this.start == 'undefined') {
	        	this.start = moment().subtract('days', 30);
				this.end = moment();
			}
	    	this.render(); 
	    },
	    render: function () {
	        this.footer = new lily.Data();
	    	this.footer.url = '/dialogue/footer/'+this.start+'/'+this.end;
	    	$(this.$el).find('.loader').css({'opacity':'1'});
	    	var that = this;
	    	this.footer.fetch({
		    	success: function() {
		    		that.$el.html(that.template());
			    	
			    	// On affiche le loader
					$(that.$el).find('footer').css({'opacity':0});
			    	
			    	$('#reportrange').daterangepicker({
						ranges: {
					         'Cette semaine': [moment().subtract('days', 6), moment()],
					         'Ce mois': [moment().subtract('days', 30), moment()],
					         'Ce semestre': [moment().subtract('month', 4).startOf('month'), moment()],
					         'Cette année': [moment().subtract('month', 12), moment()]
					      },
					      startDate: moment().subtract('days', 29),
					      endDate: moment(),
					      dateLimit: { months: 36 }
					    },
					    function(start, end) {
					    
					        $('#reportrange span').html(start.format('D MMMM YYYY') + ' - ' + end.format('D MMMM YYYY'));
					        
					        that.start = start;
							that.end = end;
							
					    }
					);
					
					$('#reportrange span').html(that.start.format('D MMMM YYYY') + ' - ' + that.end.format('D MMMM YYYY'));
					
					that.range();
					
		    	}
	    	});
	    },
	    events: {
	        'hide #reportrange' : 'range',
	    },
	    dialogueFooter: function() {
	    	var that = this;
		    this.footer.url = '/dialogue/footer/'+this.start+'/'+this.end;
		    this.footer.fetch({
			    success: function() {
			    	that.$el.find('footer').remove();
					that.$el.append(that.templateFooter(that.footer.toJSON()));
			    }
		    });
	    },
	    range: function () {
		    // On affiche le loader
	    	$(this.$el).find('.loader').removeClass('hide');
			    		    	
	    	this.data.url = '/dialogue/graph/'+this.start+'/'+this.end;
	    	$(this.$el).find('#graph-dialogue').css({'opacity':0});
	    	$(this.$el).find('.loader').css({'opacity':1});
	    	var that = this;
	    	
	    	this.data.fetch({
		    	success: function (data) {
		    		
					that.graph(data);
					that.dialogueFooter();
					
		    		$(that.$el).find('#graph-usage').animate({'opacity':1});
		    		$(that.$el).find('footer').animate({'opacity':1});
			    	$(that.$el).find('.loader').animate({'opacity':0});
			    	
				}
	    	});	
	    },
	    graph: function(data) {
	    	
	    	d1 = [];
	    	var i = 0;
			while (typeof data.attributes.values.questions[i] != 'undefined') {
				d1.push([data.attributes.values.questions[i][0], data.attributes.values.questions[i][1]]);
				i++;
			}
			
			d2 = [];
	    	var i = 0;
			while (typeof data.attributes.values.answered[i] != 'undefined') {
				d2.push([data.attributes.values.answered[i][0], data.attributes.values.answered[i][1]]);
				i++;
			}
	    	
	    	function getTooltip(label, x, y) {
	    		if (data.attributes.period == 'hour') {
		    		var date = moment(x/1000, 'X').format('HH');
					return y + " à " + date + " heures"; 
	    		}
	    		if (data.attributes.period == 'day') {
		    		var date = moment(x/1000, 'X').format('DD/MM/YYYY');
					return y + " le " + date; 
				}
				if (data.attributes.period == 'month') {
					var date = moment(x/1000, 'X').format('MMMM');
					return y + " en " + date; 
				}
			}
	    	
			var plot = $.plot($("#graph-usage"), [{
	            data: d1,
	        }, {
	            data: d2,
	        }], 
	        {
	        series: {
	            lines: {
	                show: true,
	                lineWidth: 2,
	                fill: true,
	                fillColor: {
	                    colors: [{
	                        opacity: 0.1
	                    }, {
	                        opacity: 0.1
	                    }]
	                }
	            },
	            points: {
	                radius: 5,
	                show: true
	            },
	            shadowSize: 2
	        },
	        grid: {
	            color: "#fff",
	            hoverable: true,
	            clickable: true,
	            tickColor: "#f0f0f0",
	            borderWidth: 0
	        },
	        colors: ["#6eaee8", "#92d050"],
	        xaxis: {
				min: d1[d1.length - 1][0],
	            max: d1[0][0],
	            mode: "time",
				tickSize: [data.attributes.step, data.attributes.period], 
	            tickLength: 0      
	        },
	        yaxis: {
	            ticks: 2,
	            tickDecimals: 0,            
	        },
	        tooltip: true,
	        tooltipOpts: {
	          content: getTooltip,
	          defaultTheme: false,
	          shifts: {
	            x: 0,
	            y: 20
	          },
	        }
	        }
	        );
	    
	    },
	});


/*======================================
	Dialogue -> Redirection
	=========================================*/
	
	lily.RedirectionsMediaView = Backbone.View.extend({
		model: lily.Data,
	    initialize: function() {
	    	this.render(); 
	    },
	    render: function () {
	        this.redirections = new lily.Data();
	    	this.redirections.url = '/usage/redirections';
	    	var that = this;
	    	this.redirections.fetch({
		    	success: function(data) {
		    	
		    	da = [];
		    	
		    	for (var i = 0; i < 2; i++) {
			      da[i] = {
			      label: data.attributes[i].label,
			      data: data.attributes[i].data
			    }
			  }
			  
					$.plot($("#redirections"), da, {
					    series: {
					      pie: {
					        combine: {
					              color: "#999",
					              threshold: 0.05
					            },
					        show: true,
					        label: {
								show: true,
								formatter: function(label, series){
									return '<div style="font-size:8pt;text-align:center;padding:2px;color:#4c5567;">'+label+'<br/>'+Math.round(series.percent)+'%</div>';
								},    
							},
					      }
					    },    
					    colors: ["#aeb6cb", "#f3f5f9"],
					    legend: {
					      show: false
					    },
					    grid: {
					        hoverable: false,
					        clickable: false
					    },
					    tooltip: true,
					    tooltipOpts: {
					      content: "%s: %p.0%"
					    }
					 });
				 
		    	}
	    	});
	    },
	});

	
	/*======================================
	Graph Utilisation
	=========================================*/
	
	lily.UsageGraphView = Backbone.View.extend({
	    model: lily.Data,
	    el: '#graph',
	    template: _.template($('#graph-usage').html()),
	    templateFooter: _.template($('#graph-usage-footer').html()),
	    initialize: function() {
	    	if (typeof this.start == 'undefined') {
	        	this.start = moment().subtract('days', 30);
				this.end = moment();
			}
	    	this.render(); 
	    },
	    render: function () {
	        this.footer = new lily.Data();
	    	this.footer.url = '/usage/footer/'+this.start+'/'+this.end;
	    	$(this.$el).find('.loader').css({'opacity':'1'});
	    	var that = this;
	    	this.footer.fetch({
		    	success: function() {
			    	that.$el.html(that.template());
			    	that.$el.append(that.templateFooter(that.footer.toJSON()));
			    	
			    	// On affiche le loader
					$(that.$el).find('footer').css({'opacity':0});
			    	
			    	$('#reportrange').daterangepicker({
						ranges: {
					         'Cette semaine': [moment().subtract('days', 6), moment()],
					         'Ce mois': [moment().subtract('days', 30), moment()],
					         'Ce semestre': [moment().subtract('month', 4).startOf('month'), moment()],
					         'Cette année': [moment().subtract('month', 12), moment()]
					      },
					      startDate: moment().subtract('days', 29),
					      endDate: moment(),
					      dateLimit: { months: 36 }
					    },
					    function(start, end) {
					    
					        $('#reportrange span').html(start.format('D MMMM YYYY') + ' - ' + end.format('D MMMM YYYY'));
					        
					        that.start = start;
							that.end = end;
							
					    }
					);
					
					$('#reportrange span').html(that.start.format('D MMMM YYYY') + ' - ' + that.end.format('D MMMM YYYY'));
					
			    	that.loadings();
					return this;
		    	}
	    	});
	    },
	    events: {
	        'click .loadings': 'loadings',
	        'click .usage': 'usage',
	        'click .redirection': 'redirection',
	        'click .satisfaction': 'satisfaction',
	        'hide #reportrange' : 'range',
	    },
	    loadings: function () {
	    	
			// On affiche le loader
	    	$(this.$el).find('.loader').removeClass('hide');
			    	
	    	
	    	data = new lily.Data();
	    	data.url = '/usage/graph/loadings/'+this.start+'/'+this.end;
	    	$(this.$el).find('#graph-usage').css({'opacity':0});
	    	$(this.$el).find('.loader').css({'opacity':1});
	    	var that = this;
	    	data.fetch({
		    	success: function (data) {
		    		$('#graph .active').removeClass('active');
		    		$('.loadings').addClass('active');
		    		
					that.graph(data);
					
		    		$(that.$el).find('#graph-usage').animate({'opacity':1});
		    		$(that.$el).find('footer').animate({'opacity':1});
			    	$(that.$el).find('.loader').animate({'opacity':0});
		    	}
	    	});	
	    },
	    usage: function () {
	    
	    	data = new lily.Data();
	    	data.url = '/usage/graph/usage/'+this.start+'/'+this.end;
	    	$(this.$el).find('#graph-usage').css({'opacity':0});
	    	$(this.$el).find('.loader').css({'opacity':1});
	    	var that = this;
	    	data.fetch({
		    	success: function (data) {
		    		$('#graph .active').removeClass('active');
		    		$('.usage').addClass('active');
					$(that.$el).find('#graph-usage').css({'opacity':0});
		    		
					that.graph(data);
					
		    		$(that.$el).find('#graph-usage').animate({'opacity':1});
		    		$(that.$el).find('footer').animate({'opacity':1});
			    	$(that.$el).find('.loader').animate({'opacity':0});
		    	}
	    	});	
	    },
	    usageFooter: function(type) {
	    	that = this;
		    this.footer.url = '/usage/footer/'+this.start+'/'+this.end;
		    this.footer.fetch({
			    success: function(data) {
			    	that.$el.find('footer').remove();
				    that.$el.append(that.templateFooter(that.footer.toJSON()));
				    that.$el.find('footer .' + type).addClass('active');
			    }
		    });
	    },
	    redirection: function () {
	    
	    	data = new lily.Data();
	    	data.url = '/usage/graph/redirection/'+this.start+'/'+this.end;
	    	$(this.$el).find('#graph-usage').css({'opacity':0});
	    	$(this.$el).find('.loader').css({'opacity':1});
	    	var that = this;
	    	data.fetch({
		    	success: function (data) {
		    		$('#graph .active').removeClass('active');
		    		$('.redirection').addClass('active');
		    		$(that.$el).find('#graph-usage').css({'opacity':0});
		    		
					that.graph(data);
					
		    		$(that.$el).find('#graph-usage').animate({'opacity':1});
		    		$(that.$el).find('footer').animate({'opacity':1});
			    	$(that.$el).find('.loader').animate({'opacity':0});
		    	}
	    	});	
	    },
	    satisfaction: function () {
	    
	    	data = new lily.Data();
	    	data.url = '/usage/graph/satisfaction/'+this.start+'/'+this.end;
	    	$(this.$el).find('#graph-usage').css({'opacity':0});
	    	$(this.$el).find('.loader').css({'opacity':1});
	    	var that = this;
	    	data.fetch({
		    	success: function (data) {
		    		$('#graph .active').removeClass('active');
		    		$('.satisfaction').addClass('active');
		    		$(that.$el).find('#graph-usage').css({'opacity':0});
		    		
					that.graph(data);
					
		    		$(that.$el).find('#graph-usage').animate({'opacity':1});
		    		$(that.$el).find('footer').animate({'opacity':1});
			    	$(that.$el).find('.loader').animate({'opacity':0});
		    	}
	    	});	
	    },
	    range: function () {
		    if (this.$el.find('.active').hasClass('loadings')) {
		    	this.loadings(); 
		    	this.usageFooter('loadings');
		    }
		    if (this.$el.find('.active').hasClass('redirection')) {
		    	this.redirection();
		    	this.usageFooter('redirections');
		    }
		    if (this.$el.find('.active').hasClass('usage')) {
		    	this.usage();
		    	this.usageFooter('usage');
		    }
		    if (this.$el.find('.active').hasClass('satisfaction')) {
		    	this.satisfaction();
		    	this.usageFooter('satisfaction');
		    }
	    },
	    graph: function(data) {
	    	
	    	d1 = [];
	    	var i = 0;
			while (typeof data.attributes.values[i] != 'undefined') {
				d1.push([data.attributes.values[i][0], data.attributes.values[i][1]]);
				i++;
			}
	    	
	    	function getTooltip(label, x, y) {
	    		if (data.attributes.period == 'hour') {
		    		var date = moment(x/1000, 'X').format('HH');
					return y + " à " + date + " heures"; 
	    		}
	    		if (data.attributes.period == 'day') {
		    		var date = moment(x/1000, 'X').format('DD/MM/YYYY');
					return y + " le " + date; 
				}
				if (data.attributes.period == 'month') {
					var date = moment(x/1000, 'X').format('MMMM');
					return y + " en " + date; 
				}
			}
	    	
			var plot = $.plot($("#graph-usage"), [{
	          data: d1
			}], 
	        {
	        series: {
	            lines: {
	                show: true,
	                lineWidth: 2,
	                fill: true,
	                fillColor: {
	                    colors: [{
	                        opacity: 0.0
	                    }, {
	                        opacity: 0.2
	                    }]
	                }
	            },
	            points: {
	                radius: 5,
	                show: true
	            },
	            shadowSize: 2
	        },
	        grid: {
	            color: "#fff",
	            hoverable: true,
	            clickable: true,
	            tickColor: "#f0f0f0",
	            borderWidth: 0
	        },
	        colors: ["#6eaee8"],
	        xaxis: {
				min: d1[d1.length - 1][0],
	            max: d1[0][0],
	            mode: "time",
				tickSize: [data.attributes.step, data.attributes.period], 
	            tickLength: 0      
	        },
	        yaxis: {
	            ticks: 2,
	            tickDecimals: 0,            
	        },
	        tooltip: true,
	        tooltipOpts: {
	          content: getTooltip,
	          defaultTheme: false,
	          shifts: {
	            x: 0,
	            y: 20
	          },
	        }
	        }
	        );
	    
	    },
	});
	
	/*======================================
	Utilisation -> Supports
	=========================================*/
	
	lily.UsageMediaView = Backbone.View.extend({
		model: lily.Data,
	    initialize: function() {
	    	this.render(); 
	    },
	    render: function () {
	        this.media = new lily.Data();
	    	this.media.url = '/usage/media';
	    	var that = this;
	    	this.media.fetch({
		    	success: function(data) {
		    		    		
		    		d2 = [];
			    	var i = 0;
					while (typeof data.attributes[i] != 'undefined') {
						d2.push([data.attributes[i]['x'], data.attributes[i]['y']]);
						i++;
					}
					
				    var graph = function() {
				    
					    Morris.Bar({
							  element: 'media',
							  data: d2,
							  xkey: 0,
							  ykeys: [1],
							  labels: [''],
							  barRatio: 0.4,
							  hideHover: 'auto',
							  barColors:['#aeb6cb'],
						});
					}
					graph();
					$(window).on('resize', function() { 
						$('#media').empty();
						graph();
					});
		    	}
	    	});
	    },
	});
	
	/*========================================
		  Router
		=========================================*/
		
	var AppRouter = Backbone.Router.extend({
	
		routes: {
		  "" : "usage",
		  "usage" : "usage",
		  "dialogue" : "dialogue",
		},
		
		initialize: function () {
		},
		
		usage: function() {
			
		  $('#statistics-nav .active').removeClass('active');
		  $('#statistics-nav .usage-nav').addClass('active');
		  
		  var usage = new lily.UsageView();
		  var usage_graph = new lily.UsageGraphView();	
		  var usage_media = new lily.UsageMediaView();
		  var usage_redirections = new lily.RedirectionsMediaView();
	 
	    }, 
	    dialogue: function() {
	    
 		  $('#statistics-nav .active').removeClass('active');
		  $('#statistics-nav .dialogue-nav').addClass('active');
		  
		  var dialogue = new lily.DialogueView();
		  var dialogue_graph = new lily.DialogueGraphView();
		  
	    },   		
	});
	
	// Let's rock
	var app = new AppRouter();	
	Backbone.history.start();
	

});