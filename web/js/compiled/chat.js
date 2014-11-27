/* jquery.sparkline 2.1.2 - http://omnipotent.net/jquery.sparkline/ 
** Licensed under the New BSD License - see above site for details */

(function(a,b,c){(function(a){typeof define=="function"&&define.amd?define(["jquery"],a):jQuery&&!jQuery.fn.sparkline&&a(jQuery)})(function(d){"use strict";var e={},f,g,h,i,j,k,l,m,n,o,p,q,r,s,t,u,v,w,x,y,z,A,B,C,D,E,F,G,H,I,J,K,L=0;f=function(){return{common:{type:"line",lineColor:"#00f",fillColor:"#cdf",defaultPixelsPerValue:3,width:"auto",height:"auto",composite:!1,tagValuesAttribute:"values",tagOptionsPrefix:"spark",enableTagOptions:!1,enableHighlight:!0,highlightLighten:1.4,tooltipSkipNull:!0,tooltipPrefix:"",tooltipSuffix:"",disableHiddenCheck:!1,numberFormatter:!1,numberDigitGroupCount:3,numberDigitGroupSep:",",numberDecimalMark:".",disableTooltips:!1,disableInteraction:!1},line:{spotColor:"#f80",highlightSpotColor:"#5f5",highlightLineColor:"#f22",spotRadius:1.5,minSpotColor:"#f80",maxSpotColor:"#f80",lineWidth:1,normalRangeMin:c,normalRangeMax:c,normalRangeColor:"#ccc",drawNormalOnTop:!1,chartRangeMin:c,chartRangeMax:c,chartRangeMinX:c,chartRangeMaxX:c,tooltipFormat:new h('<span style="color: {{color}}">&#9679;</span> {{prefix}}{{y}}{{suffix}}')},bar:{barColor:"#3366cc",negBarColor:"#f44",stackedBarColor:["#3366cc","#dc3912","#ff9900","#109618","#66aa00","#dd4477","#0099c6","#990099"],zeroColor:c,nullColor:c,zeroAxis:!0,barWidth:4,barSpacing:1,chartRangeMax:c,chartRangeMin:c,chartRangeClip:!1,colorMap:c,tooltipFormat:new h('<span style="color: {{color}}">&#9679;</span> {{prefix}}{{value}}{{suffix}}')},tristate:{barWidth:4,barSpacing:1,posBarColor:"#6f6",negBarColor:"#f44",zeroBarColor:"#999",colorMap:{},tooltipFormat:new h('<span style="color: {{color}}">&#9679;</span> {{value:map}}'),tooltipValueLookups:{map:{"-1":"Loss",0:"Draw",1:"Win"}}},discrete:{lineHeight:"auto",thresholdColor:c,thresholdValue:0,chartRangeMax:c,chartRangeMin:c,chartRangeClip:!1,tooltipFormat:new h("{{prefix}}{{value}}{{suffix}}")},bullet:{targetColor:"#f33",targetWidth:3,performanceColor:"#33f",rangeColors:["#d3dafe","#a8b6ff","#7f94ff"],base:c,tooltipFormat:new h("{{fieldkey:fields}} - {{value}}"),tooltipValueLookups:{fields:{r:"Range",p:"Performance",t:"Target"}}},pie:{offset:0,sliceColors:["#3366cc","#dc3912","#ff9900","#109618","#66aa00","#dd4477","#0099c6","#990099"],borderWidth:0,borderColor:"#000",tooltipFormat:new h('<span style="color: {{color}}">&#9679;</span> {{value}} ({{percent.1}}%)')},box:{raw:!1,boxLineColor:"#000",boxFillColor:"#cdf",whiskerColor:"#000",outlierLineColor:"#333",outlierFillColor:"#fff",medianColor:"#f00",showOutliers:!0,outlierIQR:1.5,spotRadius:1.5,target:c,targetColor:"#4a2",chartRangeMax:c,chartRangeMin:c,tooltipFormat:new h("{{field:fields}}: {{value}}"),tooltipFormatFieldlistKey:"field",tooltipValueLookups:{fields:{lq:"Lower Quartile",med:"Median",uq:"Upper Quartile",lo:"Left Outlier",ro:"Right Outlier",lw:"Left Whisker",rw:"Right Whisker"}}}}},E='.jqstooltip { position: absolute;left: 0px;top: 0px;visibility: hidden;background: rgb(0, 0, 0) transparent;background-color: rgba(0,0,0,0.6);filter:progid:DXImageTransform.Microsoft.gradient(startColorstr=#99000000, endColorstr=#99000000);-ms-filter: "progid:DXImageTransform.Microsoft.gradient(startColorstr=#99000000, endColorstr=#99000000)";color: white;font: 10px arial, san serif;text-align: left;white-space: nowrap;padding: 5px;border: 1px solid white;z-index: 10000;}.jqsfield { color: white;font: 10px arial, san serif;text-align: left;}',g=function(){var a,b;return a=function(){this.init.apply(this,arguments)},arguments.length>1?(arguments[0]?(a.prototype=d.extend(new arguments[0],arguments[arguments.length-1]),a._super=arguments[0].prototype):a.prototype=arguments[arguments.length-1],arguments.length>2&&(b=Array.prototype.slice.call(arguments,1,-1),b.unshift(a.prototype),d.extend.apply(d,b))):a.prototype=arguments[0],a.prototype.cls=a,a},d.SPFormatClass=h=g({fre:/\{\{([\w.]+?)(:(.+?))?\}\}/g,precre:/(\w+)\.(\d+)/,init:function(a,b){this.format=a,this.fclass=b},render:function(a,b,d){var e=this,f=a,g,h,i,j,k;return this.format.replace(this.fre,function(){var a;return h=arguments[1],i=arguments[3],g=e.precre.exec(h),g?(k=g[2],h=g[1]):k=!1,j=f[h],j===c?"":i&&b&&b[i]?(a=b[i],a.get?b[i].get(j)||j:b[i][j]||j):(n(j)&&(d.get("numberFormatter")?j=d.get("numberFormatter")(j):j=s(j,k,d.get("numberDigitGroupCount"),d.get("numberDigitGroupSep"),d.get("numberDecimalMark"))),j)})}}),d.spformat=function(a,b){return new h(a,b)},i=function(a,b,c){return a<b?b:a>c?c:a},j=function(a,c){var d;return c===2?(d=b.floor(a.length/2),a.length%2?a[d]:(a[d-1]+a[d])/2):a.length%2?(d=(a.length*c+c)/4,d%1?(a[b.floor(d)]+a[b.floor(d)-1])/2:a[d-1]):(d=(a.length*c+2)/4,d%1?(a[b.floor(d)]+a[b.floor(d)-1])/2:a[d-1])},k=function(a){var b;switch(a){case"undefined":a=c;break;case"null":a=null;break;case"true":a=!0;break;case"false":a=!1;break;default:b=parseFloat(a),a==b&&(a=b)}return a},l=function(a){var b,c=[];for(b=a.length;b--;)c[b]=k(a[b]);return c},m=function(a,b){var c,d,e=[];for(c=0,d=a.length;c<d;c++)a[c]!==b&&e.push(a[c]);return e},n=function(a){return!isNaN(parseFloat(a))&&isFinite(a)},s=function(a,b,c,e,f){var g,h;a=(b===!1?parseFloat(a).toString():a.toFixed(b)).split(""),g=(g=d.inArray(".",a))<0?a.length:g,g<a.length&&(a[g]=f);for(h=g-c;h>0;h-=c)a.splice(h,0,e);return a.join("")},o=function(a,b,c){var d;for(d=b.length;d--;){if(c&&b[d]===null)continue;if(b[d]!==a)return!1}return!0},p=function(a){var b=0,c;for(c=a.length;c--;)b+=typeof a[c]=="number"?a[c]:0;return b},r=function(a){return d.isArray(a)?a:[a]},q=function(b){var c;a.createStyleSheet?a.createStyleSheet().cssText=b:(c=a.createElement("style"),c.type="text/css",a.getElementsByTagName("head")[0].appendChild(c),c[typeof a.body.style.WebkitAppearance=="string"?"innerText":"innerHTML"]=b)},d.fn.simpledraw=function(b,e,f,g){var h,i;if(f&&(h=this.data("_jqs_vcanvas")))return h;if(d.fn.sparkline.canvas===!1)return!1;if(d.fn.sparkline.canvas===c){var j=a.createElement("canvas");if(!j.getContext||!j.getContext("2d")){if(!a.namespaces||!!a.namespaces.v)return d.fn.sparkline.canvas=!1,!1;a.namespaces.add("v","urn:schemas-microsoft-com:vml","#default#VML"),d.fn.sparkline.canvas=function(a,b,c,d){return new J(a,b,c)}}else d.fn.sparkline.canvas=function(a,b,c,d){return new I(a,b,c,d)}}return b===c&&(b=d(this).innerWidth()),e===c&&(e=d(this).innerHeight()),h=d.fn.sparkline.canvas(b,e,this,g),i=d(this).data("_jqs_mhandler"),i&&i.registerCanvas(h),h},d.fn.cleardraw=function(){var a=this.data("_jqs_vcanvas");a&&a.reset()},d.RangeMapClass=t=g({init:function(a){var b,c,d=[];for(b in a)a.hasOwnProperty(b)&&typeof b=="string"&&b.indexOf(":")>-1&&(c=b.split(":"),c[0]=c[0].length===0?-Infinity:parseFloat(c[0]),c[1]=c[1].length===0?Infinity:parseFloat(c[1]),c[2]=a[b],d.push(c));this.map=a,this.rangelist=d||!1},get:function(a){var b=this.rangelist,d,e,f;if((f=this.map[a])!==c)return f;if(b)for(d=b.length;d--;){e=b[d];if(e[0]<=a&&e[1]>=a)return e[2]}return c}}),d.range_map=function(a){return new t(a)},u=g({init:function(a,b){var c=d(a);this.$el=c,this.options=b,this.currentPageX=0,this.currentPageY=0,this.el=a,this.splist=[],this.tooltip=null,this.over=!1,this.displayTooltips=!b.get("disableTooltips"),this.highlightEnabled=!b.get("disableHighlight")},registerSparkline:function(a){this.splist.push(a),this.over&&this.updateDisplay()},registerCanvas:function(a){var b=d(a.canvas);this.canvas=a,this.$canvas=b,b.mouseenter(d.proxy(this.mouseenter,this)),b.mouseleave(d.proxy(this.mouseleave,this)),b.click(d.proxy(this.mouseclick,this))},reset:function(a){this.splist=[],this.tooltip&&a&&(this.tooltip.remove(),this.tooltip=c)},mouseclick:function(a){var b=d.Event("sparklineClick");b.originalEvent=a,b.sparklines=this.splist,this.$el.trigger(b)},mouseenter:function(b){d(a.body).unbind("mousemove.jqs"),d(a.body).bind("mousemove.jqs",d.proxy(this.mousemove,this)),this.over=!0,this.currentPageX=b.pageX,this.currentPageY=b.pageY,this.currentEl=b.target,!this.tooltip&&this.displayTooltips&&(this.tooltip=new v(this.options),this.tooltip.updatePosition(b.pageX,b.pageY)),this.updateDisplay()},mouseleave:function(){d(a.body).unbind("mousemove.jqs");var b=this.splist,c=b.length,e=!1,f,g;this.over=!1,this.currentEl=null,this.tooltip&&(this.tooltip.remove(),this.tooltip=null);for(g=0;g<c;g++)f=b[g],f.clearRegionHighlight()&&(e=!0);e&&this.canvas.render()},mousemove:function(a){this.currentPageX=a.pageX,this.currentPageY=a.pageY,this.currentEl=a.target,this.tooltip&&this.tooltip.updatePosition(a.pageX,a.pageY),this.updateDisplay()},updateDisplay:function(){var a=this.splist,b=a.length,c=!1,e=this.$canvas.offset(),f=this.currentPageX-e.left,g=this.currentPageY-e.top,h,i,j,k,l;if(!this.over)return;for(j=0;j<b;j++)i=a[j],k=i.setRegionHighlight(this.currentEl,f,g),k&&(c=!0);if(c){l=d.Event("sparklineRegionChange"),l.sparklines=this.splist,this.$el.trigger(l);if(this.tooltip){h="";for(j=0;j<b;j++)i=a[j],h+=i.getCurrentRegionTooltip();this.tooltip.setContent(h)}this.disableHighlight||this.canvas.render()}k===null&&this.mouseleave()}}),v=g({sizeStyle:"position: static !important;display: block !important;visibility: hidden !important;float: left !important;",init:function(b){var c=b.get("tooltipClassname","jqstooltip"),e=this.sizeStyle,f;this.container=b.get("tooltipContainer")||a.body,this.tooltipOffsetX=b.get("tooltipOffsetX",10),this.tooltipOffsetY=b.get("tooltipOffsetY",12),d("#jqssizetip").remove(),d("#jqstooltip").remove(),this.sizetip=d("<div/>",{id:"jqssizetip",style:e,"class":c}),this.tooltip=d("<div/>",{id:"jqstooltip","class":c}).appendTo(this.container),f=this.tooltip.offset(),this.offsetLeft=f.left,this.offsetTop=f.top,this.hidden=!0,d(window).unbind("resize.jqs scroll.jqs"),d(window).bind("resize.jqs scroll.jqs",d.proxy(this.updateWindowDims,this)),this.updateWindowDims()},updateWindowDims:function(){this.scrollTop=d(window).scrollTop(),this.scrollLeft=d(window).scrollLeft(),this.scrollRight=this.scrollLeft+d(window).width(),this.updatePosition()},getSize:function(a){this.sizetip.html(a).appendTo(this.container),this.width=this.sizetip.width()+1,this.height=this.sizetip.height(),this.sizetip.remove()},setContent:function(a){if(!a){this.tooltip.css("visibility","hidden"),this.hidden=!0;return}this.getSize(a),this.tooltip.html(a).css({width:this.width,height:this.height,visibility:"visible"}),this.hidden&&(this.hidden=!1,this.updatePosition())},updatePosition:function(a,b){if(a===c){if(this.mousex===c)return;a=this.mousex-this.offsetLeft,b=this.mousey-this.offsetTop}else this.mousex=a-=this.offsetLeft,this.mousey=b-=this.offsetTop;if(!this.height||!this.width||this.hidden)return;b-=this.height+this.tooltipOffsetY,a+=this.tooltipOffsetX,b<this.scrollTop&&(b=this.scrollTop),a<this.scrollLeft?a=this.scrollLeft:a+this.width>this.scrollRight&&(a=this.scrollRight-this.width),this.tooltip.css({left:a,top:b})},remove:function(){this.tooltip.remove(),this.sizetip.remove(),this.sizetip=this.tooltip=c,d(window).unbind("resize.jqs scroll.jqs")}}),F=function(){q(E)},d(F),K=[],d.fn.sparkline=function(b,e){return this.each(function(){var f=new d.fn.sparkline.options(this,e),g=d(this),h,i;h=function(){var e,h,i,j,k,l,m;if(b==="html"||b===c){m=this.getAttribute(f.get("tagValuesAttribute"));if(m===c||m===null)m=g.html();e=m.replace(/(^\s*<!--)|(-->\s*$)|\s+/g,"").split(",")}else e=b;h=f.get("width")==="auto"?e.length*f.get("defaultPixelsPerValue"):f.get("width");if(f.get("height")==="auto"){if(!f.get("composite")||!d.data(this,"_jqs_vcanvas"))j=a.createElement("span"),j.innerHTML="a",g.html(j),i=d(j).innerHeight()||d(j).height(),d(j).remove(),j=null}else i=f.get("height");f.get("disableInteraction")?k=!1:(k=d.data(this,"_jqs_mhandler"),k?f.get("composite")||k.reset():(k=new u(this,f),d.data(this,"_jqs_mhandler",k)));if(f.get("composite")&&!d.data(this,"_jqs_vcanvas")){d.data(this,"_jqs_errnotify")||(alert("Attempted to attach a composite sparkline to an element with no existing sparkline"),d.data(this,"_jqs_errnotify",!0));return}l=new(d.fn.sparkline[f.get("type")])(this,e,f,h,i),l.render(),k&&k.registerSparkline(l)};if(d(this).html()&&!f.get("disableHiddenCheck")&&d(this).is(":hidden")||!d(this).parents("body").length){if(!f.get("composite")&&d.data(this,"_jqs_pending"))for(i=K.length;i;i--)K[i-1][0]==this&&K.splice(i-1,1);K.push([this,h]),d.data(this,"_jqs_pending",!0)}else h.call(this)})},d.fn.sparkline.defaults=f(),d.sparkline_display_visible=function(){var a,b,c,e=[];for(b=0,c=K.length;b<c;b++)a=K[b][0],d(a).is(":visible")&&!d(a).parents().is(":hidden")?(K[b][1].call(a),d.data(K[b][0],"_jqs_pending",!1),e.push(b)):!d(a).closest("html").length&&!d.data(a,"_jqs_pending")&&(d.data(K[b][0],"_jqs_pending",!1),e.push(b));for(b=e.length;b;b--)K.splice(e[b-1],1)},d.fn.sparkline.options=g({init:function(a,b){var c,f,g,h;this.userOptions=b=b||{},this.tag=a,this.tagValCache={},f=d.fn.sparkline.defaults,g=f.common,this.tagOptionsPrefix=b.enableTagOptions&&(b.tagOptionsPrefix||g.tagOptionsPrefix),h=this.getTagSetting("type"),h===e?c=f[b.type||g.type]:c=f[h],this.mergedOptions=d.extend({},g,c,b)},getTagSetting:function(a){var b=this.tagOptionsPrefix,d,f,g,h;if(b===!1||b===c)return e;if(this.tagValCache.hasOwnProperty(a))d=this.tagValCache.key;else{d=this.tag.getAttribute(b+a);if(d===c||d===null)d=e;else if(d.substr(0,1)==="["){d=d.substr(1,d.length-2).split(",");for(f=d.length;f--;)d[f]=k(d[f].replace(/(^\s*)|(\s*$)/g,""))}else if(d.substr(0,1)==="{"){g=d.substr(1,d.length-2).split(","),d={};for(f=g.length;f--;)h=g[f].split(":",2),d[h[0].replace(/(^\s*)|(\s*$)/g,"")]=k(h[1].replace(/(^\s*)|(\s*$)/g,""))}else d=k(d);this.tagValCache.key=d}return d},get:function(a,b){var d=this.getTagSetting(a),f;return d!==e?d:(f=this.mergedOptions[a])===c?b:f}}),d.fn.sparkline._base=g({disabled:!1,init:function(a,b,e,f,g){this.el=a,this.$el=d(a),this.values=b,this.options=e,this.width=f,this.height=g,this.currentRegion=c},initTarget:function(){var a=!this.options.get("disableInteraction");(this.target=this.$el.simpledraw(this.width,this.height,this.options.get("composite"),a))?(this.canvasWidth=this.target.pixelWidth,this.canvasHeight=this.target.pixelHeight):this.disabled=!0},render:function(){return this.disabled?(this.el.innerHTML="",!1):!0},getRegion:function(a,b){},setRegionHighlight:function(a,b,d){var e=this.currentRegion,f=!this.options.get("disableHighlight"),g;return b>this.canvasWidth||d>this.canvasHeight||b<0||d<0?null:(g=this.getRegion(a,b,d),e!==g?(e!==c&&f&&this.removeHighlight(),this.currentRegion=g,g!==c&&f&&this.renderHighlight(),!0):!1)},clearRegionHighlight:function(){return this.currentRegion!==c?(this.removeHighlight(),this.currentRegion=c,!0):!1},renderHighlight:function(){this.changeHighlight(!0)},removeHighlight:function(){this.changeHighlight(!1)},changeHighlight:function(a){},getCurrentRegionTooltip:function(){var a=this.options,b="",e=[],f,g,i,j,k,l,m,n,o,p,q,r,s,t;if(this.currentRegion===c)return"";f=this.getCurrentRegionFields(),q=a.get("tooltipFormatter");if(q)return q(this,a,f);a.get("tooltipChartTitle")&&(b+='<div class="jqs jqstitle">'+a.get("tooltipChartTitle")+"</div>\n"),g=this.options.get("tooltipFormat");if(!g)return"";d.isArray(g)||(g=[g]),d.isArray(f)||(f=[f]),m=this.options.get("tooltipFormatFieldlist"),n=this.options.get("tooltipFormatFieldlistKey");if(m&&n){o=[];for(l=f.length;l--;)p=f[l][n],(t=d.inArray(p,m))!=-1&&(o[t]=f[l]);f=o}i=g.length,s=f.length;for(l=0;l<i;l++){r=g[l],typeof r=="string"&&(r=new h(r)),j=r.fclass||"jqsfield";for(t=0;t<s;t++)if(!f[t].isNull||!a.get("tooltipSkipNull"))d.extend(f[t],{prefix:a.get("tooltipPrefix"),suffix:a.get("tooltipSuffix")}),k=r.render(f[t],a.get("tooltipValueLookups"),a),e.push('<div class="'+j+'">'+k+"</div>")}return e.length?b+e.join("\n"):""},getCurrentRegionFields:function(){},calcHighlightColor:function(a,c){var d=c.get("highlightColor"),e=c.get("highlightLighten"),f,g,h,j;if(d)return d;if(e){f=/^#([0-9a-f])([0-9a-f])([0-9a-f])$/i.exec(a)||/^#([0-9a-f]{2})([0-9a-f]{2})([0-9a-f]{2})$/i.exec(a);if(f){h=[],g=a.length===4?16:1;for(j=0;j<3;j++)h[j]=i(b.round(parseInt(f[j+1],16)*g*e),0,255);return"rgb("+h.join(",")+")"}}return a}}),w={changeHighlight:function(a){var b=this.currentRegion,c=this.target,e=this.regionShapes[b],f;e&&(f=this.renderRegion(b,a),d.isArray(f)||d.isArray(e)?(c.replaceWithShapes(e,f),this.regionShapes[b]=d.map(f,function(a){return a.id})):(c.replaceWithShape(e,f),this.regionShapes[b]=f.id))},render:function(){var a=this.values,b=this.target,c=this.regionShapes,e,f,g,h;if(!this.cls._super.render.call(this))return;for(g=a.length;g--;){e=this.renderRegion(g);if(e)if(d.isArray(e)){f=[];for(h=e.length;h--;)e[h].append(),f.push(e[h].id);c[g]=f}else e.append(),c[g]=e.id;else c[g]=null}b.render()}},d.fn.sparkline.line=x=g(d.fn.sparkline._base,{type:"line",init:function(a,b,c,d,e){x._super.init.call(this,a,b,c,d,e),this.vertices=[],this.regionMap=[],this.xvalues=[],this.yvalues=[],this.yminmax=[],this.hightlightSpotId=null,this.lastShapeId=null,this.initTarget()},getRegion:function(a,b,d){var e,f=this.regionMap;for(e=f.length;e--;)if(f[e]!==null&&b>=f[e][0]&&b<=f[e][1])return f[e][2];return c},getCurrentRegionFields:function(){var a=this.currentRegion;return{isNull:this.yvalues[a]===null,x:this.xvalues[a],y:this.yvalues[a],color:this.options.get("lineColor"),fillColor:this.options.get("fillColor"),offset:a}},renderHighlight:function(){var a=this.currentRegion,b=this.target,d=this.vertices[a],e=this.options,f=e.get("spotRadius"),g=e.get("highlightSpotColor"),h=e.get("highlightLineColor"),i,j;if(!d)return;f&&g&&(i=b.drawCircle(d[0],d[1],f,c,g),this.highlightSpotId=i.id,b.insertAfterShape(this.lastShapeId,i)),h&&(j=b.drawLine(d[0],this.canvasTop,d[0],this.canvasTop+this.canvasHeight,h),this.highlightLineId=j.id,b.insertAfterShape(this.lastShapeId,j))},removeHighlight:function(){var a=this.target;this.highlightSpotId&&(a.removeShapeId(this.highlightSpotId),this.highlightSpotId=null),this.highlightLineId&&(a.removeShapeId(this.highlightLineId),this.highlightLineId=null)},scanValues:function(){var a=this.values,c=a.length,d=this.xvalues,e=this.yvalues,f=this.yminmax,g,h,i,j,k;for(g=0;g<c;g++)h=a[g],i=typeof a[g]=="string",j=typeof a[g]=="object"&&a[g]instanceof Array,k=i&&a[g].split(":"),i&&k.length===2?(d.push(Number(k[0])),e.push(Number(k[1])),f.push(Number(k[1]))):j?(d.push(h[0]),e.push(h[1]),f.push(h[1])):(d.push(g),a[g]===null||a[g]==="null"?e.push(null):(e.push(Number(h)),f.push(Number(h))));this.options.get("xvalues")&&(d=this.options.get("xvalues")),this.maxy=this.maxyorg=b.max.apply(b,f),this.miny=this.minyorg=b.min.apply(b,f),this.maxx=b.max.apply(b,d),this.minx=b.min.apply(b,d),this.xvalues=d,this.yvalues=e,this.yminmax=f},processRangeOptions:function(){var a=this.options,b=a.get("normalRangeMin"),d=a.get("normalRangeMax");b!==c&&(b<this.miny&&(this.miny=b),d>this.maxy&&(this.maxy=d)),a.get("chartRangeMin")!==c&&(a.get("chartRangeClip")||a.get("chartRangeMin")<this.miny)&&(this.miny=a.get("chartRangeMin")),a.get("chartRangeMax")!==c&&(a.get("chartRangeClip")||a.get("chartRangeMax")>this.maxy)&&(this.maxy=a.get("chartRangeMax")),a.get("chartRangeMinX")!==c&&(a.get("chartRangeClipX")||a.get("chartRangeMinX")<this.minx)&&(this.minx=a.get("chartRangeMinX")),a.get("chartRangeMaxX")!==c&&(a.get("chartRangeClipX")||a.get("chartRangeMaxX")>this.maxx)&&(this.maxx=a.get("chartRangeMaxX"))},drawNormalRange:function(a,d,e,f,g){var h=this.options.get("normalRangeMin"),i=this.options.get("normalRangeMax"),j=d+b.round(e-e*((i-this.miny)/g)),k=b.round(e*(i-h)/g);this.target.drawRect(a,j,f,k,c,this.options.get("normalRangeColor")).append()},render:function(){var a=this.options,e=this.target,f=this.canvasWidth,g=this.canvasHeight,h=this.vertices,i=a.get("spotRadius"),j=this.regionMap,k,l,m,n,o,p,q,r,s,u,v,w,y,z,A,B,C,D,E,F,G,H,I,J,K;if(!x._super.render.call(this))return;this.scanValues(),this.processRangeOptions(),I=this.xvalues,J=this.yvalues;if(!this.yminmax.length||this.yvalues.length<2)return;n=o=0,k=this.maxx-this.minx===0?1:this.maxx-this.minx,l=this.maxy-this.miny===0?1:this.maxy-this.miny,m=this.yvalues.length-1,i&&(f<i*4||g<i*4)&&(i=0);if(i){G=a.get("highlightSpotColor")&&!a.get("disableInteraction");if(G||a.get("minSpotColor")||a.get("spotColor")&&J[m]===this.miny)g-=b.ceil(i);if(G||a.get("maxSpotColor")||a.get("spotColor")&&J[m]===this.maxy)g-=b.ceil(i),n+=b.ceil(i);if(G||(a.get("minSpotColor")||a.get("maxSpotColor"))&&(J[0]===this.miny||J[0]===this.maxy))o+=b.ceil(i),f-=b.ceil(i);if(G||a.get("spotColor")||a.get("minSpotColor")||a.get("maxSpotColor")&&(J[m]===this.miny||J[m]===this.maxy))f-=b.ceil(i)}g--,a.get("normalRangeMin")!==c&&!a.get("drawNormalOnTop")&&this.drawNormalRange(o,n,g,f,l),q=[],r=[q],z=A=null,B=J.length;for(K=0;K<B;K++)s=I[K],v=I[K+1],u=J[K],w=o+b.round((s-this.minx)*(f/k)),y=K<B-1?o+b.round((v-this.minx)*(f/k)):f,A=w+(y-w)/2,j[K]=[z||0,A,K],z=A,u===null?K&&(J[K-1]!==null&&(q=[],r.push(q)),h.push(null)):(u<this.miny&&(u=this.miny),u>this.maxy&&(u=this.maxy),q.length||q.push([w,n+g]),p=[w,n+b.round(g-g*((u-this.miny)/l))],q.push(p),h.push(p));C=[],D=[],E=r.length;for(K=0;K<E;K++)q=r[K],q.length&&(a.get("fillColor")&&(q.push([q[q.length-1][0],n+g]),D.push(q.slice(0)),q.pop()),q.length>2&&(q[0]=[q[0][0],q[1][1]]),C.push(q));E=D.length;for(K=0;K<E;K++)e.drawShape(D[K],a.get("fillColor"),a.get("fillColor")).append();a.get("normalRangeMin")!==c&&a.get("drawNormalOnTop")&&this.drawNormalRange(o,n,g,f,l),E=C.length;for(K=0;K<E;K++)e.drawShape(C[K],a.get("lineColor"),c,a.get("lineWidth")).append();if(i&&a.get("valueSpots")){F=a.get("valueSpots"),F.get===c&&(F=new t(F));for(K=0;K<B;K++)H=F.get(J[K]),H&&e.drawCircle(o+b.round((I[K]-this.minx)*(f/k)),n+b.round(g-g*((J[K]-this.miny)/l)),i,c,H).append()}i&&a.get("spotColor")&&J[m]!==null&&e.drawCircle(o+b.round((I[I.length-1]-this.minx)*(f/k)),n+b.round(g-g*((J[m]-this.miny)/l)),i,c,a.get("spotColor")).append(),this.maxy!==this.minyorg&&(i&&a.get("minSpotColor")&&(s=I[d.inArray(this.minyorg,J)],e.drawCircle(o+b.round((s-this.minx)*(f/k)),n+b.round(g-g*((this.minyorg-this.miny)/l)),i,c,a.get("minSpotColor")).append()),i&&a.get("maxSpotColor")&&(s=I[d.inArray(this.maxyorg,J)],e.drawCircle(o+b.round((s-this.minx)*(f/k)),n+b.round(g-g*((this.maxyorg-this.miny)/l)),i,c,a.get("maxSpotColor")).append())),this.lastShapeId=e.getLastShapeId(),this.canvasTop=n,e.render()}}),d.fn.sparkline.bar=y=g(d.fn.sparkline._base,w,{type:"bar",init:function(a,e,f,g,h){var j=parseInt(f.get("barWidth"),10),n=parseInt(f.get("barSpacing"),10),o=f.get("chartRangeMin"),p=f.get("chartRangeMax"),q=f.get("chartRangeClip"),r=Infinity,s=-Infinity,u,v,w,x,z,A,B,C,D,E,F,G,H,I,J,K,L,M,N,O,P,Q,R;y._super.init.call(this,a,e,f,g,h);for(A=0,B=e.length;A<B;A++){O=e[A],u=typeof O=="string"&&O.indexOf(":")>-1;if(u||d.isArray(O))J=!0,u&&(O=e[A]=l(O.split(":"))),O=m(O,null),v=b.min.apply(b,O),w=b.max.apply(b,O),v<r&&(r=v),w>s&&(s=w)}this.stacked=J,this.regionShapes={},this.barWidth=j,this.barSpacing=n,this.totalBarWidth=j+n,this.width=g=e.length*j+(e.length-1)*n,this.initTarget(),q&&(H=o===c?-Infinity:o,I=p===c?Infinity:p),z=[],x=J?[]:z;var S=[],T=[];for(A=0,B=e.length;A<B;A++)if(J){K=e[A],e[A]=N=[],S[A]=0,x[A]=T[A]=0;for(L=0,M=K.length;L<M;L++)O=N[L]=q?i(K[L],H,I):K[L],O!==null&&(O>0&&(S[A]+=O),r<0&&s>0?O<0?T[A]+=b.abs(O):x[A]+=O:x[A]+=b.abs(O-(O<0?s:r)),z.push(O))}else O=q?i(e[A],H,I):e[A],O=e[A]=k(O),O!==null&&z.push(O);this.max=G=b.max.apply(b,z),this.min=F=b.min.apply(b,z),this.stackMax=s=J?b.max.apply(b,S):G,this.stackMin=r=J?b.min.apply(b,z):F,f.get("chartRangeMin")!==c&&(f.get("chartRangeClip")||f.get("chartRangeMin")<F)&&(F=f.get("chartRangeMin")),f.get("chartRangeMax")!==c&&(f.get("chartRangeClip")||f.get("chartRangeMax")>G)&&(G=f.get("chartRangeMax")),this.zeroAxis=D=f.get("zeroAxis",!0),F<=0&&G>=0&&D?E=0:D==0?E=F:F>0?E=F:E=G,this.xaxisOffset=E,C=J?b.max.apply(b,x)+b.max.apply(b,T):G-F,this.canvasHeightEf=D&&F<0?this.canvasHeight-2:this.canvasHeight-1,F<E?(Q=J&&G>=0?s:G,P=(Q-E)/C*this.canvasHeight,P!==b.ceil(P)&&(this.canvasHeightEf-=2,P=b.ceil(P))):P=this.canvasHeight,this.yoffset=P,d.isArray(f.get("colorMap"))?(this.colorMapByIndex=f.get("colorMap"),this.colorMapByValue=null):(this.colorMapByIndex=null,this.colorMapByValue=f.get("colorMap"),this.colorMapByValue&&this.colorMapByValue.get===c&&(this.colorMapByValue=new t(this.colorMapByValue))),this.range=C},getRegion:function(a,d,e){var f=b.floor(d/this.totalBarWidth);return f<0||f>=this.values.length?c:f},getCurrentRegionFields:function(){var a=this.currentRegion,b=r(this.values[a]),c=[],d,e;for(e=b.length;e--;)d=b[e],c.push({isNull:d===null,value:d,color:this.calcColor(e,d,a),offset:a});return c},calcColor:function(a,b,e){var f=this.colorMapByIndex,g=this.colorMapByValue,h=this.options,i,j;return this.stacked?i=h.get("stackedBarColor"):i=b<0?h.get("negBarColor"):h.get("barColor"),b===0&&h.get("zeroColor")!==c&&(i=h.get("zeroColor")),g&&(j=g.get(b))?i=j:f&&f.length>e&&(i=f[e]),d.isArray(i)?i[a%i.length]:i},renderRegion:function(a,e){var f=this.values[a],g=this.options,h=this.xaxisOffset,i=[],j=this.range,k=this.stacked,l=this.target,m=a*this.totalBarWidth,n=this.canvasHeightEf,p=this.yoffset,q,r,s,t,u,v,w,x,y,z;f=d.isArray(f)?f:[f],w=f.length,x=f[0],t=o(null,f),z=o(h,f,!0);if(t)return g.get("nullColor")?(s=e?g.get("nullColor"):this.calcHighlightColor(g.get("nullColor"),g),q=p>0?p-1:p,l.drawRect(m,q,this.barWidth-1,0,s,s)):c;u=p;for(v=0;v<w;v++){x=f[v];if(k&&x===h){if(!z||y)continue;y=!0}j>0?r=b.floor(n*(b.abs(x-h)/j))+1:r=1,x<h||x===h&&p===0?(q=u,u+=r):(q=p-r,p-=r),s=this.calcColor(v,x,a),e&&(s=this.calcHighlightColor(s,g)),i.push(l.drawRect(m,q,this.barWidth-1,r-1,s,s))}return i.length===1?i[0]:i}}),d.fn.sparkline.tristate=z=g(d.fn.sparkline._base,w,{type:"tristate",init:function(a,b,e,f,g){var h=parseInt(e.get("barWidth"),10),i=parseInt(e.get("barSpacing"),10);z._super.init.call(this,a,b,e,f,g),this.regionShapes={},this.barWidth=h,this.barSpacing=i,this.totalBarWidth=h+i,this.values=d.map(b,Number),this.width=f=b.length*h+(b.length-1)*i,d.isArray(e.get("colorMap"))?(this.colorMapByIndex=e.get("colorMap"),this.colorMapByValue=null):(this.colorMapByIndex=null,this.colorMapByValue=e.get("colorMap"),this.colorMapByValue&&this.colorMapByValue.get===c&&(this.colorMapByValue=new t(this.colorMapByValue))),this.initTarget()},getRegion:function(a,c,d){return b.floor(c/this.totalBarWidth)},getCurrentRegionFields:function(){var a=this.currentRegion;return{isNull:this.values[a]===c,value:this.values[a],color:this.calcColor(this.values[a],a),offset:a}},calcColor:function(a,b){var c=this.values,d=this.options,e=this.colorMapByIndex,f=this.colorMapByValue,g,h;return f&&(h=f.get(a))?g=h:e&&e.length>b?g=e[b]:c[b]<0?g=d.get("negBarColor"):c[b]>0?g=d.get("posBarColor"):g=d.get("zeroBarColor"),g},renderRegion:function(a,c){var d=this.values,e=this.options,f=this.target,g,h,i,j,k,l;g=f.pixelHeight,i=b.round(g/2),j=a*this.totalBarWidth,d[a]<0?(k=i,h=i-1):d[a]>0?(k=0,h=i-1):(k=i-1,h=2),l=this.calcColor(d[a],a);if(l===null)return;return c&&(l=this.calcHighlightColor(l,e)),f.drawRect(j,k,this.barWidth-1,h-1,l,l)}}),d.fn.sparkline.discrete=A=g(d.fn.sparkline._base,w,{type:"discrete",init:function(a,e,f,g,h){A._super.init.call(this,a,e,f,g,h),this.regionShapes={},this.values=e=d.map(e,Number),this.min=b.min.apply(b,e),this.max=b.max.apply(b,e),this.range=this.max-this.min,this.width=g=f.get("width")==="auto"?e.length*2:this.width,this.interval=b.floor(g/e.length),this.itemWidth=g/e.length,f.get("chartRangeMin")!==c&&(f.get("chartRangeClip")||f.get("chartRangeMin")<this.min)&&(this.min=f.get("chartRangeMin")),f.get("chartRangeMax")!==c&&(f.get("chartRangeClip")||f.get("chartRangeMax")>this.max)&&(this.max=f.get("chartRangeMax")),this.initTarget(),this.target&&(this.lineHeight=f.get("lineHeight")==="auto"?b.round(this.canvasHeight*.3):f.get("lineHeight"))},getRegion:function(a,c,d){return b.floor(c/this.itemWidth)},getCurrentRegionFields:function(){var a=this.currentRegion;return{isNull:this.values[a]===c,value:this.values[a],offset:a}},renderRegion:function(a,c){var d=this.values,e=this.options,f=this.min,g=this.max,h=this.range,j=this.interval,k=this.target,l=this.canvasHeight,m=this.lineHeight,n=l-m,o,p,q,r;return p=i(d[a],f,g),r=a*j,o=b.round(n-n*((p-f)/h)),q=e.get("thresholdColor")&&p<e.get("thresholdValue")?e.get("thresholdColor"):e.get("lineColor"),c&&(q=this.calcHighlightColor(q,e)),k.drawLine(r,o,r,o+m,q)}}),d.fn.sparkline.bullet=B=g(d.fn.sparkline._base,{type:"bullet",init:function(a,d,e,f,g){var h,i,j;B._super.init.call(this,a,d,e,f,g),this.values=d=l(d),j=d.slice(),j[0]=j[0]===null?j[2]:j[0],j[1]=d[1]===null?j[2]:j[1],h=b.min.apply(b,d),i=b.max.apply(b,d),e.get("base")===c?h=h<0?h:0:h=e.get("base"),this.min=h,this.max=i,this.range=i-h,this.shapes={},this.valueShapes={},this.regiondata={},this.width=f=e.get("width")==="auto"?"4.0em":f,this.target=this.$el.simpledraw(f,g,e.get("composite")),d.length||(this.disabled=!0),this.initTarget()},getRegion:function(a,b,d){var e=this.target.getShapeAt(a,b,d);return e!==c&&this.shapes[e]!==c?this.shapes[e]:c},getCurrentRegionFields:function(){var a=this.currentRegion;return{fieldkey:a.substr(0,1),value:this.values[a.substr(1)],region:a}},changeHighlight:function(a){var b=this.currentRegion,c=this.valueShapes[b],d;delete this.shapes[c];switch(b.substr(0,1)){case"r":d=this.renderRange(b.substr(1),a);break;case"p":d=this.renderPerformance(a);break;case"t":d=this.renderTarget(a)}this.valueShapes[b]=d.id,this.shapes[d.id]=b,this.target.replaceWithShape(c,d)},renderRange:function(a,c){var d=this.values[a],e=b.round(this.canvasWidth*((d-this.min)/this.range)),f=this.options.get("rangeColors")[a-2];return c&&(f=this.calcHighlightColor(f,this.options)),this.target.drawRect(0,0,e-1,this.canvasHeight-1,f,f)},renderPerformance:function(a){var c=this.values[1],d=b.round(this.canvasWidth*((c-this.min)/this.range)),e=this.options.get("performanceColor");return a&&(e=this.calcHighlightColor(e,this.options)),this.target.drawRect(0,b.round(this.canvasHeight*.3),d-1,b.round(this.canvasHeight*.4)-1,e,e)},renderTarget:function(a){var c=this.values[0],d=b.round(this.canvasWidth*((c-this.min)/this.range)-this.options.get("targetWidth")/2),e=b.round(this.canvasHeight*.1),f=this.canvasHeight-e*2,g=this.options.get("targetColor");return a&&(g=this.calcHighlightColor(g,this.options)),this.target.drawRect(d,e,this.options.get("targetWidth")-1,f-1,g,g)},render:function(){var a=this.values.length,b=this.target,c,d;if(!B._super.render.call(this))return;for(c=2;c<a;c++)d=this.renderRange(c).append(),this.shapes[d.id]="r"+c,this.valueShapes["r"+c]=d.id;this.values[1]!==null&&(d=this.renderPerformance().append(),this.shapes[d.id]="p1",this.valueShapes.p1=d.id),this.values[0]!==null&&(d=this.renderTarget().append(),this.shapes[d.id]="t0",this.valueShapes.t0=d.id),b.render()}}),d.fn.sparkline.pie=C=g(d.fn.sparkline._base,{type:"pie",init:function(a,c,e,f,g){var h=0,i;C._super.init.call(this,a,c,e,f,g),this.shapes={},this.valueShapes={},this.values=c=d.map(c,Number),e.get("width")==="auto"&&(this.width=this.height);if(c.length>0)for(i=c.length;i--;)h+=c[i];this.total=h,this.initTarget(),this.radius=b.floor(b.min(this.canvasWidth,this.canvasHeight)/2)},getRegion:function(a,b,d){var e=this.target.getShapeAt(a,b,d);return e!==c&&this.shapes[e]!==c?this.shapes[e]:c},getCurrentRegionFields:function(){var a=this.currentRegion;return{isNull:this.values[a]===c,value:this.values[a],percent:this.values[a]/this.total*100,color:this.options.get("sliceColors")[a%this.options.get("sliceColors").length],offset:a}},changeHighlight:function(a){var b=this.currentRegion,c=this.renderSlice(b,a),d=this.valueShapes[b];delete this.shapes[d],this.target.replaceWithShape(d,c),this.valueShapes[b]=c.id,this.shapes[c.id]=b},renderSlice:function(a,d){var e=this.target,f=this.options,g=this.radius,h=f.get("borderWidth"),i=f.get("offset"),j=2*b.PI,k=this.values,l=this.total,m=i?2*b.PI*(i/360):0,n,o,p,q,r;q=k.length;for(p=0;p<q;p++){n=m,o=m,l>0&&(o=m+j*(k[p]/l));if(a===p)return r=f.get("sliceColors")[p%f.get("sliceColors").length],d&&(r=this.calcHighlightColor(r,f)),e.drawPieSlice(g,g,g-h,n,o,c,r);m=o}},render:function(){var a=this.target,d=this.values,e=this.options,f=this.radius,g=e.get("borderWidth"),h,i;if(!C._super.render.call(this))return;g&&a.drawCircle(f,f,b.floor(f-g/2),e.get("borderColor"),c,g).append();for(i=d.length;i--;)d[i]&&(h=this.renderSlice(i).append(),this.valueShapes[i]=h.id,this.shapes[h.id]=i);a.render()}}),d.fn.sparkline.box=D=g(d.fn.sparkline._base,{type:"box",init:function(a,b,c,e,f){D._super.init.call(this,a,b,c,e,f),this.values=d.map(b,Number),this.width=c.get("width")==="auto"?"4.0em":e,this.initTarget(),this.values.length||(this.disabled=1)},getRegion:function(){return 1},getCurrentRegionFields:function(){var a=[{field:"lq",value:this.quartiles[0]},{field:"med",value:this.quartiles
[1]},{field:"uq",value:this.quartiles[2]}];return this.loutlier!==c&&a.push({field:"lo",value:this.loutlier}),this.routlier!==c&&a.push({field:"ro",value:this.routlier}),this.lwhisker!==c&&a.push({field:"lw",value:this.lwhisker}),this.rwhisker!==c&&a.push({field:"rw",value:this.rwhisker}),a},render:function(){var a=this.target,d=this.values,e=d.length,f=this.options,g=this.canvasWidth,h=this.canvasHeight,i=f.get("chartRangeMin")===c?b.min.apply(b,d):f.get("chartRangeMin"),k=f.get("chartRangeMax")===c?b.max.apply(b,d):f.get("chartRangeMax"),l=0,m,n,o,p,q,r,s,t,u,v,w;if(!D._super.render.call(this))return;if(f.get("raw"))f.get("showOutliers")&&d.length>5?(n=d[0],m=d[1],p=d[2],q=d[3],r=d[4],s=d[5],t=d[6]):(m=d[0],p=d[1],q=d[2],r=d[3],s=d[4]);else{d.sort(function(a,b){return a-b}),p=j(d,1),q=j(d,2),r=j(d,3),o=r-p;if(f.get("showOutliers")){m=s=c;for(u=0;u<e;u++)m===c&&d[u]>p-o*f.get("outlierIQR")&&(m=d[u]),d[u]<r+o*f.get("outlierIQR")&&(s=d[u]);n=d[0],t=d[e-1]}else m=d[0],s=d[e-1]}this.quartiles=[p,q,r],this.lwhisker=m,this.rwhisker=s,this.loutlier=n,this.routlier=t,w=g/(k-i+1),f.get("showOutliers")&&(l=b.ceil(f.get("spotRadius")),g-=2*b.ceil(f.get("spotRadius")),w=g/(k-i+1),n<m&&a.drawCircle((n-i)*w+l,h/2,f.get("spotRadius"),f.get("outlierLineColor"),f.get("outlierFillColor")).append(),t>s&&a.drawCircle((t-i)*w+l,h/2,f.get("spotRadius"),f.get("outlierLineColor"),f.get("outlierFillColor")).append()),a.drawRect(b.round((p-i)*w+l),b.round(h*.1),b.round((r-p)*w),b.round(h*.8),f.get("boxLineColor"),f.get("boxFillColor")).append(),a.drawLine(b.round((m-i)*w+l),b.round(h/2),b.round((p-i)*w+l),b.round(h/2),f.get("lineColor")).append(),a.drawLine(b.round((m-i)*w+l),b.round(h/4),b.round((m-i)*w+l),b.round(h-h/4),f.get("whiskerColor")).append(),a.drawLine(b.round((s-i)*w+l),b.round(h/2),b.round((r-i)*w+l),b.round(h/2),f.get("lineColor")).append(),a.drawLine(b.round((s-i)*w+l),b.round(h/4),b.round((s-i)*w+l),b.round(h-h/4),f.get("whiskerColor")).append(),a.drawLine(b.round((q-i)*w+l),b.round(h*.1),b.round((q-i)*w+l),b.round(h*.9),f.get("medianColor")).append(),f.get("target")&&(v=b.ceil(f.get("spotRadius")),a.drawLine(b.round((f.get("target")-i)*w+l),b.round(h/2-v),b.round((f.get("target")-i)*w+l),b.round(h/2+v),f.get("targetColor")).append(),a.drawLine(b.round((f.get("target")-i)*w+l-v),b.round(h/2),b.round((f.get("target")-i)*w+l+v),b.round(h/2),f.get("targetColor")).append()),a.render()}}),G=g({init:function(a,b,c,d){this.target=a,this.id=b,this.type=c,this.args=d},append:function(){return this.target.appendShape(this),this}}),H=g({_pxregex:/(\d+)(px)?\s*$/i,init:function(a,b,c){if(!a)return;this.width=a,this.height=b,this.target=c,this.lastShapeId=null,c[0]&&(c=c[0]),d.data(c,"_jqs_vcanvas",this)},drawLine:function(a,b,c,d,e,f){return this.drawShape([[a,b],[c,d]],e,f)},drawShape:function(a,b,c,d){return this._genShape("Shape",[a,b,c,d])},drawCircle:function(a,b,c,d,e,f){return this._genShape("Circle",[a,b,c,d,e,f])},drawPieSlice:function(a,b,c,d,e,f,g){return this._genShape("PieSlice",[a,b,c,d,e,f,g])},drawRect:function(a,b,c,d,e,f){return this._genShape("Rect",[a,b,c,d,e,f])},getElement:function(){return this.canvas},getLastShapeId:function(){return this.lastShapeId},reset:function(){alert("reset not implemented")},_insert:function(a,b){d(b).html(a)},_calculatePixelDims:function(a,b,c){var e;e=this._pxregex.exec(b),e?this.pixelHeight=e[1]:this.pixelHeight=d(c).height(),e=this._pxregex.exec(a),e?this.pixelWidth=e[1]:this.pixelWidth=d(c).width()},_genShape:function(a,b){var c=L++;return b.unshift(c),new G(this,c,a,b)},appendShape:function(a){alert("appendShape not implemented")},replaceWithShape:function(a,b){alert("replaceWithShape not implemented")},insertAfterShape:function(a,b){alert("insertAfterShape not implemented")},removeShapeId:function(a){alert("removeShapeId not implemented")},getShapeAt:function(a,b,c){alert("getShapeAt not implemented")},render:function(){alert("render not implemented")}}),I=g(H,{init:function(b,e,f,g){I._super.init.call(this,b,e,f),this.canvas=a.createElement("canvas"),f[0]&&(f=f[0]),d.data(f,"_jqs_vcanvas",this),d(this.canvas).css({display:"inline-block",width:b,height:e,verticalAlign:"top"}),this._insert(this.canvas,f),this._calculatePixelDims(b,e,this.canvas),this.canvas.width=this.pixelWidth,this.canvas.height=this.pixelHeight,this.interact=g,this.shapes={},this.shapeseq=[],this.currentTargetShapeId=c,d(this.canvas).css({width:this.pixelWidth,height:this.pixelHeight})},_getContext:function(a,b,d){var e=this.canvas.getContext("2d");return a!==c&&(e.strokeStyle=a),e.lineWidth=d===c?1:d,b!==c&&(e.fillStyle=b),e},reset:function(){var a=this._getContext();a.clearRect(0,0,this.pixelWidth,this.pixelHeight),this.shapes={},this.shapeseq=[],this.currentTargetShapeId=c},_drawShape:function(a,b,d,e,f){var g=this._getContext(d,e,f),h,i;g.beginPath(),g.moveTo(b[0][0]+.5,b[0][1]+.5);for(h=1,i=b.length;h<i;h++)g.lineTo(b[h][0]+.5,b[h][1]+.5);d!==c&&g.stroke(),e!==c&&g.fill(),this.targetX!==c&&this.targetY!==c&&g.isPointInPath(this.targetX,this.targetY)&&(this.currentTargetShapeId=a)},_drawCircle:function(a,d,e,f,g,h,i){var j=this._getContext(g,h,i);j.beginPath(),j.arc(d,e,f,0,2*b.PI,!1),this.targetX!==c&&this.targetY!==c&&j.isPointInPath(this.targetX,this.targetY)&&(this.currentTargetShapeId=a),g!==c&&j.stroke(),h!==c&&j.fill()},_drawPieSlice:function(a,b,d,e,f,g,h,i){var j=this._getContext(h,i);j.beginPath(),j.moveTo(b,d),j.arc(b,d,e,f,g,!1),j.lineTo(b,d),j.closePath(),h!==c&&j.stroke(),i&&j.fill(),this.targetX!==c&&this.targetY!==c&&j.isPointInPath(this.targetX,this.targetY)&&(this.currentTargetShapeId=a)},_drawRect:function(a,b,c,d,e,f,g){return this._drawShape(a,[[b,c],[b+d,c],[b+d,c+e],[b,c+e],[b,c]],f,g)},appendShape:function(a){return this.shapes[a.id]=a,this.shapeseq.push(a.id),this.lastShapeId=a.id,a.id},replaceWithShape:function(a,b){var c=this.shapeseq,d;this.shapes[b.id]=b;for(d=c.length;d--;)c[d]==a&&(c[d]=b.id);delete this.shapes[a]},replaceWithShapes:function(a,b){var c=this.shapeseq,d={},e,f,g;for(f=a.length;f--;)d[a[f]]=!0;for(f=c.length;f--;)e=c[f],d[e]&&(c.splice(f,1),delete this.shapes[e],g=f);for(f=b.length;f--;)c.splice(g,0,b[f].id),this.shapes[b[f].id]=b[f]},insertAfterShape:function(a,b){var c=this.shapeseq,d;for(d=c.length;d--;)if(c[d]===a){c.splice(d+1,0,b.id),this.shapes[b.id]=b;return}},removeShapeId:function(a){var b=this.shapeseq,c;for(c=b.length;c--;)if(b[c]===a){b.splice(c,1);break}delete this.shapes[a]},getShapeAt:function(a,b,c){return this.targetX=b,this.targetY=c,this.render(),this.currentTargetShapeId},render:function(){var a=this.shapeseq,b=this.shapes,c=a.length,d=this._getContext(),e,f,g;d.clearRect(0,0,this.pixelWidth,this.pixelHeight);for(g=0;g<c;g++)e=a[g],f=b[e],this["_draw"+f.type].apply(this,f.args);this.interact||(this.shapes={},this.shapeseq=[])}}),J=g(H,{init:function(b,c,e){var f;J._super.init.call(this,b,c,e),e[0]&&(e=e[0]),d.data(e,"_jqs_vcanvas",this),this.canvas=a.createElement("span"),d(this.canvas).css({display:"inline-block",position:"relative",overflow:"hidden",width:b,height:c,margin:"0px",padding:"0px",verticalAlign:"top"}),this._insert(this.canvas,e),this._calculatePixelDims(b,c,this.canvas),this.canvas.width=this.pixelWidth,this.canvas.height=this.pixelHeight,f='<v:group coordorigin="0 0" coordsize="'+this.pixelWidth+" "+this.pixelHeight+'"'+' style="position:absolute;top:0;left:0;width:'+this.pixelWidth+"px;height="+this.pixelHeight+'px;"></v:group>',this.canvas.insertAdjacentHTML("beforeEnd",f),this.group=d(this.canvas).children()[0],this.rendered=!1,this.prerender=""},_drawShape:function(a,b,d,e,f){var g=[],h,i,j,k,l,m,n;for(n=0,m=b.length;n<m;n++)g[n]=""+b[n][0]+","+b[n][1];return h=g.splice(0,1),f=f===c?1:f,i=d===c?' stroked="false" ':' strokeWeight="'+f+'px" strokeColor="'+d+'" ',j=e===c?' filled="false"':' fillColor="'+e+'" filled="true" ',k=g[0]===g[g.length-1]?"x ":"",l='<v:shape coordorigin="0 0" coordsize="'+this.pixelWidth+" "+this.pixelHeight+'" '+' id="jqsshape'+a+'" '+i+j+' style="position:absolute;left:0px;top:0px;height:'+this.pixelHeight+"px;width:"+this.pixelWidth+'px;padding:0px;margin:0px;" '+' path="m '+h+" l "+g.join(", ")+" "+k+'e">'+" </v:shape>",l},_drawCircle:function(a,b,d,e,f,g,h){var i,j,k;return b-=e,d-=e,i=f===c?' stroked="false" ':' strokeWeight="'+h+'px" strokeColor="'+f+'" ',j=g===c?' filled="false"':' fillColor="'+g+'" filled="true" ',k='<v:oval  id="jqsshape'+a+'" '+i+j+' style="position:absolute;top:'+d+"px; left:"+b+"px; width:"+e*2+"px; height:"+e*2+'px"></v:oval>',k},_drawPieSlice:function(a,d,e,f,g,h,i,j){var k,l,m,n,o,p,q,r;if(g===h)return"";h-g===2*b.PI&&(g=0,h=2*b.PI),l=d+b.round(b.cos(g)*f),m=e+b.round(b.sin(g)*f),n=d+b.round(b.cos(h)*f),o=e+b.round(b.sin(h)*f);if(l===n&&m===o){if(h-g<b.PI)return"";l=n=d+f,m=o=e}return l===n&&m===o&&h-g<b.PI?"":(k=[d-f,e-f,d+f,e+f,l,m,n,o],p=i===c?' stroked="false" ':' strokeWeight="1px" strokeColor="'+i+'" ',q=j===c?' filled="false"':' fillColor="'+j+'" filled="true" ',r='<v:shape coordorigin="0 0" coordsize="'+this.pixelWidth+" "+this.pixelHeight+'" '+' id="jqsshape'+a+'" '+p+q+' style="position:absolute;left:0px;top:0px;height:'+this.pixelHeight+"px;width:"+this.pixelWidth+'px;padding:0px;margin:0px;" '+' path="m '+d+","+e+" wa "+k.join(", ")+' x e">'+" </v:shape>",r)},_drawRect:function(a,b,c,d,e,f,g){return this._drawShape(a,[[b,c],[b,c+e],[b+d,c+e],[b+d,c],[b,c]],f,g)},reset:function(){this.group.innerHTML=""},appendShape:function(a){var b=this["_draw"+a.type].apply(this,a.args);return this.rendered?this.group.insertAdjacentHTML("beforeEnd",b):this.prerender+=b,this.lastShapeId=a.id,a.id},replaceWithShape:function(a,b){var c=d("#jqsshape"+a),e=this["_draw"+b.type].apply(this,b.args);c[0].outerHTML=e},replaceWithShapes:function(a,b){var c=d("#jqsshape"+a[0]),e="",f=b.length,g;for(g=0;g<f;g++)e+=this["_draw"+b[g].type].apply(this,b[g].args);c[0].outerHTML=e;for(g=1;g<a.length;g++)d("#jqsshape"+a[g]).remove()},insertAfterShape:function(a,b){var c=d("#jqsshape"+a),e=this["_draw"+b.type].apply(this,b.args);c[0].insertAdjacentHTML("afterEnd",e)},removeShapeId:function(a){var b=d("#jqsshape"+a);this.group.removeChild(b[0])},getShapeAt:function(a,b,c){var d=a.id.substr(8);return d},render:function(){this.rendered||(this.group.innerHTML=this.prerender,this.rendered=!0)}})})})(document,Math);
// Generated by CoffeeScript 1.6.3
/*
Easy pie chart is a jquery plugin to display simple animated pie charts for only one value

Dual licensed under the MIT (http://www.opensource.org/licenses/mit-license.php)
and GPL (http://www.opensource.org/licenses/gpl-license.php) licenses.

Built on top of the jQuery library (http://jquery.com)

@source: http://github.com/rendro/easy-pie-chart/
@autor: Robert Fleischmann
@version: 1.2.5

Inspired by: http://dribbble.com/shots/631074-Simple-Pie-Charts-II?list=popular&offset=210
Thanks to Philip Thrasher for the jquery plugin boilerplate for coffee script
*/

(function($) {
  $.easyPieChart = function(el, options) {
    var addScaleLine, animateLine, drawLine, easeInOutQuad, rAF, renderBackground, renderScale, renderTrack,
      _this = this;
    this.el = el;
    this.$el = $(el);
    this.$el.data("easyPieChart", this);
    this.init = function() {
      var percent, scaleBy;
      _this.options = $.extend({}, $.easyPieChart.defaultOptions, options);
      percent = parseInt(_this.$el.data('percent'), 10);
      _this.percentage = 0;
      _this.canvas = $("<canvas width='" + _this.options.size + "' height='" + _this.options.size + "'></canvas>").get(0);
      _this.$el.append(_this.canvas);
      if (typeof G_vmlCanvasManager !== "undefined" && G_vmlCanvasManager !== null) {
        G_vmlCanvasManager.initElement(_this.canvas);
      }
      _this.ctx = _this.canvas.getContext('2d');
      if (window.devicePixelRatio > 1) {
        scaleBy = window.devicePixelRatio;
        $(_this.canvas).css({
          width: _this.options.size,
          height: _this.options.size
        });
        _this.canvas.width *= scaleBy;
        _this.canvas.height *= scaleBy;
        _this.ctx.scale(scaleBy, scaleBy);
      }
      _this.ctx.translate(_this.options.size / 2, _this.options.size / 2);
      _this.ctx.rotate(_this.options.rotate * Math.PI / 180);
      _this.$el.addClass('easyPieChart');
      _this.$el.css({
        width: _this.options.size,
        height: _this.options.size,
        lineHeight: "" + _this.options.size + "px"
      });
      _this.update(percent);
      return _this;
    };
    this.update = function(percent) {
      percent = parseFloat(percent) || 0;
      if (_this.options.animate === false) {
        drawLine(percent);
      } else {
        if (_this.options.delay) {
          animateLine(_this.percentage, 0);
          setTimeout(function() {
            return animateLine(_this.percentage, percent);
          }, _this.options.delay);
        } else {
          animateLine(_this.percentage, percent);
        }
      }
      return _this;
    };
    renderScale = function() {
      var i, _i, _results;
      _this.ctx.fillStyle = _this.options.scaleColor;
      _this.ctx.lineWidth = 1;
      _results = [];
      for (i = _i = 0; _i <= 24; i = ++_i) {
        _results.push(addScaleLine(i));
      }
      return _results;
    };
    addScaleLine = function(i) {
      var offset;
      offset = i % 6 === 0 ? 0 : _this.options.size * 0.017;
      _this.ctx.save();
      _this.ctx.rotate(i * Math.PI / 12);
      _this.ctx.fillRect(_this.options.size / 2 - offset, 0, -_this.options.size * 0.05 + offset, 1);
      _this.ctx.restore();
    };
    renderTrack = function() {
      var offset;
      offset = _this.options.size / 2 - _this.options.lineWidth / 2;
      if (_this.options.scaleColor !== false) {
        offset -= _this.options.size * 0.08;
      }
      _this.ctx.beginPath();
      _this.ctx.arc(0, 0, offset, 0, Math.PI * 2, true);
      _this.ctx.closePath();
      _this.ctx.strokeStyle = _this.options.trackColor;
      _this.ctx.lineWidth = _this.options.lineWidth;
      _this.ctx.stroke();
    };
    renderBackground = function() {
      if (_this.options.scaleColor !== false) {
        renderScale();
      }
      if (_this.options.trackColor !== false) {
        renderTrack();
      }
    };
    drawLine = function(percent) {
      var offset;
      renderBackground();
      _this.ctx.strokeStyle = $.isFunction(_this.options.barColor) ? _this.options.barColor(percent) : _this.options.barColor;
      _this.ctx.lineCap = _this.options.lineCap;
      _this.ctx.lineWidth = _this.options.lineWidth;
      offset = _this.options.size / 2 - _this.options.lineWidth / 2;
      if (_this.options.scaleColor !== false) {
        offset -= _this.options.size * 0.08;
      }
      _this.ctx.save();
      _this.ctx.rotate(-Math.PI / 2);
      _this.ctx.beginPath();
      _this.ctx.arc(0, 0, offset, 0, Math.PI * 2 * percent / 100, false);
      _this.ctx.stroke();
      _this.ctx.restore();
    };
    rAF = (function() {
      return window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || function(callback) {
        return window.setTimeout(callback, 1000 / 60);
      };
    })();
    animateLine = function(from, to) {
      var anim, startTime;
      _this.options.onStart.call(_this);
      _this.percentage = to;
      Date.now || (Date.now = function() {
        return +(new Date);
      });
      startTime = Date.now();
      anim = function() {
        var currentValue, process;
        process = Math.min(Date.now() - startTime, _this.options.animate);
        _this.ctx.clearRect(-_this.options.size / 2, -_this.options.size / 2, _this.options.size, _this.options.size);
        renderBackground.call(_this);
        currentValue = [easeInOutQuad(process, from, to - from, _this.options.animate)];
        _this.options.onStep.call(_this, currentValue);
        drawLine.call(_this, currentValue);
        if (process >= _this.options.animate) {
          return _this.options.onStop.call(_this, currentValue, to);
        } else {
          return rAF(anim);
        }
      };
      rAF(anim);
    };
    easeInOutQuad = function(t, b, c, d) {
      var easeIn, easing;
      easeIn = function(t) {
        return Math.pow(t, 2);
      };
      easing = function(t) {
        if (t < 1) {
          return easeIn(t);
        } else {
          return 2 - easeIn((t / 2) * -2 + 2);
        }
      };
      t /= d / 2;
      return c / 2 * easing(t) + b;
    };
    return this.init();
  };
  $.easyPieChart.defaultOptions = {
    barColor: '#ef1e25',
    trackColor: '#f2f2f2',
    scaleColor: '#dfe0e0',
    lineCap: 'round',
    rotate: 0,
    size: 110,
    lineWidth: 3,
    animate: false,
    delay: false,
    onStart: $.noop,
    onStop: $.noop,
    onStep: $.noop
  };
  $.fn.easyPieChart = function(options) {
    return $.each(this, function(i, el) {
      var $el, instanceOptions;
      $el = $(el);
      if (!$el.data('easyPieChart')) {
        instanceOptions = $.extend({}, options, $el.data());
        return $el.data('easyPieChart', new $.easyPieChart(el, instanceOptions));
      }
    });
  };
  return void 0;
})(jQuery);

/**
 * Full HTML5 compatibility rule set
 * These rules define which tags and CSS classes are supported and which tags should be specially treated.
 *
 * Examples based on this rule set:
 *
 *    <a href="http://foobar.com">foo</a>
 *    ... becomes ...
 *    <a href="http://foobar.com" target="_blank" rel="nofollow">foo</a>
 *
 *    <img align="left" src="http://foobar.com/image.png">
 *    ... becomes ...
 *    <img class="wysiwyg-float-left" src="http://foobar.com/image.png" alt="">
 *
 *    <div>foo<script>alert(document.cookie);</script></div>
 *    ... becomes ...
 *    <div>foo</div>
 *
 *    <marquee>foo</marquee>
 *    ... becomes ...
 *    <span>foo</span>
 *
 *    foo <br clear="both"> bar
 *    ... becomes ...
 *    foo <br class="wysiwyg-clear-both"> bar
 *
 *    <div>hello <iframe src="http://google.com"></iframe></div>
 *    ... becomes ...
 *    <div>hello </div>
 *
 *    <center>hello</center>
 *    ... becomes ...
 *    <div class="wysiwyg-text-align-center">hello</div>
 */
var wysihtml5ParserRules = {
    /**
     * CSS Class white-list
     * Following CSS classes won't be removed when parsed by the wysihtml5 HTML parser
     * If all classes should pass "any" as classes value. Ex: "classes": "any"
     */
    "classes": {
        "wysiwyg-clear-both": 1,
        "wysiwyg-clear-left": 1,
        "wysiwyg-clear-right": 1,
        "wysiwyg-color-aqua": 1,
        "wysiwyg-color-black": 1,
        "wysiwyg-color-blue": 1,
        "wysiwyg-color-fuchsia": 1,
        "wysiwyg-color-gray": 1,
        "wysiwyg-color-green": 1,
        "wysiwyg-color-lime": 1,
        "wysiwyg-color-maroon": 1,
        "wysiwyg-color-navy": 1,
        "wysiwyg-color-olive": 1,
        "wysiwyg-color-purple": 1,
        "wysiwyg-color-red": 1,
        "wysiwyg-color-silver": 1,
        "wysiwyg-color-teal": 1,
        "wysiwyg-color-white": 1,
        "wysiwyg-color-yellow": 1,
        "wysiwyg-float-left": 1,
        "wysiwyg-float-right": 1,
        "wysiwyg-font-size-large": 1,
        "wysiwyg-font-size-larger": 1,
        "wysiwyg-font-size-medium": 1,
        "wysiwyg-font-size-small": 1,
        "wysiwyg-font-size-smaller": 1,
        "wysiwyg-font-size-x-large": 1,
        "wysiwyg-font-size-x-small": 1,
        "wysiwyg-font-size-xx-large": 1,
        "wysiwyg-font-size-xx-small": 1,
        "wysiwyg-text-align-center": 1,
        "wysiwyg-text-align-justify": 1,
        "wysiwyg-text-align-left": 1,
        "wysiwyg-text-align-right": 1
    },
    
    
    "type_definitions": {

        "visible_content_object": {
            "methods": {
                "has_visible_contet": 1
            }
        },
        
        "alignment_object": {
            "classes": {
                "wysiwyg-text-align-center": 1,
                "wysiwyg-text-align-justify": 1,
                "wysiwyg-text-align-left": 1,
                "wysiwyg-text-align-right": 1,
                "wysiwyg-float-left": 1,
                "wysiwyg-float-right": 1
            },
            "styles": {
                "float": ["left", "right"],
                "text-align": ["left", "right", "center"]
            }
        },
        
        "valid_image_src": {
            "attrs": {
                "src": /^[^data\:]/i
            }
        },
        
        "text_color_object": {
          "styles": {
            "color": true,
            "background-color": true
          }
        },
        
        "text_fontsize_object": {
          "styles": {
            "font-size": true
          }
        },
        
        "text_formatting_object": {
            "classes": {
                "wysiwyg-color-aqua": 1,
                "wysiwyg-color-black": 1,
                "wysiwyg-color-blue": 1,
                "wysiwyg-color-fuchsia": 1,
                "wysiwyg-color-gray": 1,
                "wysiwyg-color-green": 1,
                "wysiwyg-color-lime": 1,
                "wysiwyg-color-maroon": 1,
                "wysiwyg-color-navy": 1,
                "wysiwyg-color-olive": 1,
                "wysiwyg-color-purple": 1,
                "wysiwyg-color-red": 1,
                "wysiwyg-color-silver": 1,
                "wysiwyg-color-teal": 1,
                "wysiwyg-color-white": 1,
                "wysiwyg-color-yellow": 1,
                "wysiwyg-font-size-large": 1,
                "wysiwyg-font-size-larger": 1,
                "wysiwyg-font-size-medium": 1,
                "wysiwyg-font-size-small": 1,
                "wysiwyg-font-size-smaller": 1,
                "wysiwyg-font-size-x-large": 1,
                "wysiwyg-font-size-x-small": 1,
                "wysiwyg-font-size-xx-large": 1,
                "wysiwyg-font-size-xx-small": 1
            }
        }
    },
    
    /**
     * Tag list
     *
     * The following options are available:
     *
     *    - add_class:        converts and deletes the given HTML4 attribute (align, clear, ...) via the given method to a css class
     *                        The following methods are implemented in wysihtml5.dom.parse:
     *                          - align_text:  converts align attribute values (right/left/center/justify) to their corresponding css class "wysiwyg-text-align-*")
     *                            <p align="center">foo</p> ... becomes ... <p class="wysiwyg-text-align-center">foo</p>
     *                          - clear_br:    converts clear attribute values left/right/all/both to their corresponding css class "wysiwyg-clear-*"
     *                            <br clear="all"> ... becomes ... <br class="wysiwyg-clear-both">
     *                          - align_img:    converts align attribute values (right/left) on <img> to their corresponding css class "wysiwyg-float-*"
     *
     *    - add_style:        converts and deletes the given HTML4 attribute (align) via the given method to a css style
     *                        The following methods are implemented in wysihtml5.dom.parse:
     *                          - align_text:  converts align attribute values (right/left/center) to their corresponding css style)
     *                            <p align="center">foo</p> ... becomes ... <p style="text-align:center">foo</p>
     *
     *    - remove:             removes the element and its content
     *
     *    - unwrap              removes element but leaves content
     *
     *    - rename_tag:         renames the element to the given tag
     *
     *    - set_class:          adds the given class to the element (note: make sure that the class is in the "classes" white list above)
     *
     *    - set_attributes:     sets/overrides the given attributes
     *
     *    - check_attributes:   checks the given HTML attribute via the given method
     *                            - url:            allows only valid urls (starting with http:// or https://)
     *                            - src:            allows something like "/foobar.jpg", "http://google.com", ...
     *                            - href:           allows something like "mailto:bert@foo.com", "http://google.com", "/foobar.jpg"
     *                            - alt:            strips unwanted characters. if the attribute is not set, then it gets set (to ensure valid and compatible HTML)
     *                            - numbers:  ensures that the attribute only contains numeric characters
     *                            - any:            allows anything to pass 
     */
    "tags": {
        "tr": {
            "add_class": {
                "align": "align_text"
            }
        },
        "strike": {
            "unwrap": 1
        },
        "form": {
            "unwrap": 1
        },
        "rt": {
            "rename_tag": "span"
        },
        "code": {},
        "acronym": {
            "rename_tag": "span"
        },
        "br": {
            "add_class": {
                "clear": "clear_br"
            }
        },
        "details": {
            "unwrap": 1
        },
        "h4": {
            "add_class": {
                "align": "align_text"
            }
        },
        "em": {},
        "title": {
            "remove": 1
        },
        "multicol": {
            "unwrap": 1
        },
        "figure": {
            "unwrap": 1
        },
        "xmp": {
            "unwrap": 1
        },
        "small": {
            "rename_tag": "span",
            "set_class": "wysiwyg-font-size-smaller"
        },
        "area": {
            "remove": 1
        },
        "time": {
            "unwrap": 1
        },
        "dir": {
            "rename_tag": "ul"
        },
        "bdi": {
            "unwrap": 1
        },
        "command": {
            "unwrap": 1
        },
        "ul": {},
        "progress": {
            "rename_tag": "span"
        },
        "dfn": {
            "unwrap": 1
        },
        "iframe": {
            "remove": 1
        },
        "figcaption": {
            "unwrap": 1
        },
        "a": {
            "check_attributes": {
                "href": "href", // if you compiled master manually then change this from 'url' to 'href'
            },
            "set_attributes": {
                "rel": "nofollow",
                "target": "_blank"
            }
        },
        "img": {
            "one_of_type": {
                "valid_image_src": 1
            },
            "check_attributes": {
                "width": "numbers",
                "alt": "alt",
                "src": "src", // if you compiled master manually then change this from 'url' to 'src'
                "height": "numbers"
            },
            "add_class": {
                "align": "align_img"
            }
        },
        "rb": {
            "unwrap": 1
        },
        "footer": {
            "rename_tag": "div"
        },
        "noframes": {
            "remove": 1
        },
        "abbr": {
            "unwrap": 1
        },
        "u": {},
        "bgsound": {
            "remove": 1
        },
        "sup": {
            "unwrap": 1
        },
        "address": {
            "unwrap": 1
        },
        "basefont": {
            "remove": 1
        },
        "nav": {
            "unwrap": 1
        },
        "h1": {
            "add_class": {
                "align": "align_text"
            }
        },
        "head": {
            "unwrap": 1
        },
        "tbody": {
            "add_class": {
                "align": "align_text"
            }
        },
        "dd": {
            "unwrap": 1
        },
        "s": {
            "unwrap": 1
        },
        "li": {},
        "td": {
            "check_attributes": {
                "rowspan": "numbers",
                "colspan": "numbers",
                "valign": "any",
                "align": "any"
            },
            "add_class": {
                "align": "align_text"
            }
        },
        "object": {
            "remove": 1
        },
        
        "div": {
            "one_of_type": {
                "visible_content_object": 1
            },
            "remove_action": "unwrap",
            "keep_styles": {
                "textAlign": 1,
                "float": 1
            },
            "add_class": {
                "align": "align_text"
            }
        },
        
        "option": {
            "remove":1
        },
        "select": {
            "remove":1
        },
        "i": {},
        "track": {
            "remove": 1
        },
        "wbr": {
            "remove": 1
        },
        "fieldset": {
            "unwrap": 1
        },
        "big": {
            "rename_tag": "span",
            "set_class": "wysiwyg-font-size-larger"
        },
        "button": {
            "unwrap": 1
        },
        "noscript": {
            "remove": 1
        },
        "svg": {
            "remove": 1
        },
        "input": {
            "remove": 1
        },
        "table": {},
        "keygen": {
            "remove": 1
        },
        "h5": {
            "add_class": {
                "align": "align_text"
            }
        },
        "meta": {
            "remove": 1
        },
        "map": {
            "remove": 1
        },
        "isindex": {
            "remove": 1
        },
        "mark": {
            "unwrap": 1
        },
        "caption": {
            "add_class": {
                "align": "align_text"
            }
        },
        "tfoot": {
            "add_class": {
                "align": "align_text"
            }
        },
        "base": {
            "remove": 1
        },
        "video": {
            "remove": 1
        },
        "strong": {},
        "canvas": {
            "remove": 1
        },
        "output": {
            "unwrap": 1
        },
        "marquee": {
            "unwrap": 1
        },
        "b": {},
        "q": {
            "check_attributes": {
                "cite": "url"
            }
        },
        "applet": {
            "remove": 1
        },
        "span": {
            "one_of_type": {
                "text_formatting_object": 1,
                "text_color_object": 1,
                "text_fontsize_object": 1
            },
            "keep_styles": {
                "color": 1,
                "backgroundColor": 1,
                "fontSize": 1
            },
            "remove_action": "unwrap"
        },
        "rp": {
            "unwrap": 1
        },
        "spacer": {
            "remove": 1
        },
        "source": {
            "remove": 1
        },
        "aside": {
            "rename_tag": "div"
        },
        "frame": {
            "remove": 1
        },
        "section": {
            "rename_tag": "div"
        },
        "body": {
            "unwrap": 1
        },
        "ol": {},
        "nobr": {
            "unwrap": 1
        },
        "html": {
            "unwrap": 1
        },
        "summary": {
            "unwrap": 1
        },
        "var": {
            "unwrap": 1
        },
        "del": {
            "unwrap": 1
        },
        "blockquote": {
            "check_attributes": {
                "cite": "url"
            }
        },
        "style": {
            "remove": 1
        },
        "device": {
            "remove": 1
        },
        "meter": {
            "unwrap": 1
        },
        "h3": {
            "add_class": {
                "align": "align_text"
            }
        },
        "textarea": {
            "unwrap": 1
        },
        "embed": {
            "remove": 1
        },
        "hgroup": {
            "unwrap": 1
        },
        "font": {
            "rename_tag": "span",
            "add_class": {
                "size": "size_font"
            }
        },
        "tt": {
            "unwrap": 1
        },
        "noembed": {
            "remove": 1
        },
        "thead": {
            "add_class": {
                "align": "align_text"
            }
        },
        "blink": {
            "unwrap": 1
        },
        "plaintext": {
            "unwrap": 1
        },
        "xml": {
            "remove": 1
        },
        "h6": {
            "add_class": {
                "align": "align_text"
            }
        },
        "param": {
            "remove": 1
        },
        "th": {
            "check_attributes": {
                "rowspan": "numbers",
                "colspan": "numbers"
            },
            "add_class": {
                "align": "align_text"
            }
        },
        "legend": {
            "unwrap": 1
        },
        "hr": {},
        "label": {
            "unwrap": 1
        },
        "dl": {
            "unwrap": 1
        },
        "kbd": {
            "unwrap": 1
        },
        "listing": {
            "unwrap": 1
        },
        "dt": {
            "unwrap": 1
        },
        "nextid": {
            "remove": 1
        },
        "pre": {},
        "center": {
            "rename_tag": "div",
            "set_class": "wysiwyg-text-align-center"
        },
        "audio": {
            "remove": 1
        },
        "datalist": {
            "unwrap": 1
        },
        "samp": {
            "unwrap": 1
        },
        "col": {
            "remove": 1
        },
        "article": {
            "rename_tag": "div"
        },
        "cite": {},
        "link": {
            "remove": 1
        },
        "script": {
            "remove": 1
        },
        "bdo": {
            "unwrap": 1
        },
        "menu": {
            "rename_tag": "ul"
        },
        "colgroup": {
            "remove": 1
        },
        "ruby": {
            "unwrap": 1
        },
        "h2": {
            "add_class": {
                "align": "align_text"
            }
        },
        "ins": {
            "unwrap": 1
        },
        "p": {
            "add_class": {
                "align": "align_text"
            }
        },
        "sub": {
            "unwrap": 1
        },
        "comment": {
            "remove": 1
        },
        "frameset": {
            "remove": 1
        },
        "optgroup": {
            "unwrap": 1
        },
        "header": {
            "rename_tag": "div"
        }
    }
};
// TODO: in future try to replace most inline compability checks with polyfills for code readability 

// element.textContent polyfill.
// Unsupporting browsers: IE8

if (Object.defineProperty && Object.getOwnPropertyDescriptor && Object.getOwnPropertyDescriptor(Element.prototype, "textContent") && !Object.getOwnPropertyDescriptor(Element.prototype, "textContent").get) {
	(function() {
		var innerText = Object.getOwnPropertyDescriptor(Element.prototype, "innerText");
		Object.defineProperty(Element.prototype, "textContent",
			{
				get: function() {
					return innerText.get.call(this);
				},
				set: function(s) {
					return innerText.set.call(this, s);
				}
			}
		);
	})();
}

// isArray polyfill for ie8
if(!Array.isArray) {
  Array.isArray = function(arg) {
    return Object.prototype.toString.call(arg) === '[object Array]';
  };
};/**
 * @license wysihtml5x v0.4.12
 * https://github.com/Edicy/wysihtml5
 *
 * Author: Christopher Blum (https://github.com/tiff)
 * Secondary author of extended features: Oliver Pulges (https://github.com/pulges)
 *
 * Copyright (C) 2012 XING AG
 * Licensed under the MIT license (MIT)
 *
 */
var wysihtml5 = {
  version: "0.4.12",

  // namespaces
  commands:   {},
  dom:        {},
  quirks:     {},
  toolbar:    {},
  lang:       {},
  selection:  {},
  views:      {},

  INVISIBLE_SPACE: "\uFEFF",

  EMPTY_FUNCTION: function() {},

  ELEMENT_NODE: 1,
  TEXT_NODE:    3,

  BACKSPACE_KEY:  8,
  ENTER_KEY:      13,
  ESCAPE_KEY:     27,
  SPACE_KEY:      32,
  DELETE_KEY:     46
};
;/**
 * Rangy, a cross-browser JavaScript range and selection library
 * http://code.google.com/p/rangy/
 *
 * Copyright 2013, Tim Down
 * Licensed under the MIT license.
 * Version: 1.3alpha.804
 * Build date: 8 December 2013
 */

(function(global) {
    var amdSupported = (typeof global.define == "function" && global.define.amd);

    var OBJECT = "object", FUNCTION = "function", UNDEFINED = "undefined";

    // Minimal set of properties required for DOM Level 2 Range compliance. Comparison constants such as START_TO_START
    // are omitted because ranges in KHTML do not have them but otherwise work perfectly well. See issue 113.
    var domRangeProperties = ["startContainer", "startOffset", "endContainer", "endOffset", "collapsed",
        "commonAncestorContainer"];

    // Minimal set of methods required for DOM Level 2 Range compliance
    var domRangeMethods = ["setStart", "setStartBefore", "setStartAfter", "setEnd", "setEndBefore",
        "setEndAfter", "collapse", "selectNode", "selectNodeContents", "compareBoundaryPoints", "deleteContents",
        "extractContents", "cloneContents", "insertNode", "surroundContents", "cloneRange", "toString", "detach"];

    var textRangeProperties = ["boundingHeight", "boundingLeft", "boundingTop", "boundingWidth", "htmlText", "text"];

    // Subset of TextRange's full set of methods that we're interested in
    var textRangeMethods = ["collapse", "compareEndPoints", "duplicate", "moveToElementText", "parentElement", "select",
        "setEndPoint", "getBoundingClientRect"];

    /*----------------------------------------------------------------------------------------------------------------*/

    // Trio of functions taken from Peter Michaux's article:
    // http://peter.michaux.ca/articles/feature-detection-state-of-the-art-browser-scripting
    function isHostMethod(o, p) {
        var t = typeof o[p];
        return t == FUNCTION || (!!(t == OBJECT && o[p])) || t == "unknown";
    }

    function isHostObject(o, p) {
        return !!(typeof o[p] == OBJECT && o[p]);
    }

    function isHostProperty(o, p) {
        return typeof o[p] != UNDEFINED;
    }

    // Creates a convenience function to save verbose repeated calls to tests functions
    function createMultiplePropertyTest(testFunc) {
        return function(o, props) {
            var i = props.length;
            while (i--) {
                if (!testFunc(o, props[i])) {
                    return false;
                }
            }
            return true;
        };
    }

    // Next trio of functions are a convenience to save verbose repeated calls to previous two functions
    var areHostMethods = createMultiplePropertyTest(isHostMethod);
    var areHostObjects = createMultiplePropertyTest(isHostObject);
    var areHostProperties = createMultiplePropertyTest(isHostProperty);

    function isTextRange(range) {
        return range && areHostMethods(range, textRangeMethods) && areHostProperties(range, textRangeProperties);
    }

    function getBody(doc) {
        return isHostObject(doc, "body") ? doc.body : doc.getElementsByTagName("body")[0];
    }

    var modules = {};

    var api = {
        version: "1.3alpha.804",
        initialized: false,
        supported: true,

        util: {
            isHostMethod: isHostMethod,
            isHostObject: isHostObject,
            isHostProperty: isHostProperty,
            areHostMethods: areHostMethods,
            areHostObjects: areHostObjects,
            areHostProperties: areHostProperties,
            isTextRange: isTextRange,
            getBody: getBody
        },

        features: {},

        modules: modules,
        config: {
            alertOnFail: true,
            alertOnWarn: false,
            preferTextRange: false
        }
    };

    function consoleLog(msg) {
        if (isHostObject(window, "console") && isHostMethod(window.console, "log")) {
            window.console.log(msg);
        }
    }

    function alertOrLog(msg, shouldAlert) {
        if (shouldAlert) {
            window.alert(msg);
        } else  {
            consoleLog(msg);
        }
    }

    function fail(reason) {
        api.initialized = true;
        api.supported = false;
        alertOrLog("Rangy is not supported on this page in your browser. Reason: " + reason, api.config.alertOnFail);
    }

    api.fail = fail;

    function warn(msg) {
        alertOrLog("Rangy warning: " + msg, api.config.alertOnWarn);
    }

    api.warn = warn;

    // Add utility extend() method
    if ({}.hasOwnProperty) {
        api.util.extend = function(obj, props, deep) {
            var o, p;
            for (var i in props) {
                if (props.hasOwnProperty(i)) {
                    o = obj[i];
                    p = props[i];
                    //if (deep) alert([o !== null, typeof o == "object", p !== null, typeof p == "object"])
                    if (deep && o !== null && typeof o == "object" && p !== null && typeof p == "object") {
                        api.util.extend(o, p, true);
                    }
                    obj[i] = p;
                }
            }
            return obj;
        };
    } else {
        fail("hasOwnProperty not supported");
    }

    // Test whether Array.prototype.slice can be relied on for NodeLists and use an alternative toArray() if not
    (function() {
        var el = document.createElement("div");
        el.appendChild(document.createElement("span"));
        var slice = [].slice;
        var toArray;
        try {
            if (slice.call(el.childNodes, 0)[0].nodeType == 1) {
                toArray = function(arrayLike) {
                    return slice.call(arrayLike, 0);
                };
            }
        } catch (e) {}

        if (!toArray) {
            toArray = function(arrayLike) {
                var arr = [];
                for (var i = 0, len = arrayLike.length; i < len; ++i) {
                    arr[i] = arrayLike[i];
                }
                return arr;
            };
        }

        api.util.toArray = toArray;
    })();


    // Very simple event handler wrapper function that doesn't attempt to solve issues such as "this" handling or
    // normalization of event properties
    var addListener;
    if (isHostMethod(document, "addEventListener")) {
        addListener = function(obj, eventType, listener) {
            obj.addEventListener(eventType, listener, false);
        };
    } else if (isHostMethod(document, "attachEvent")) {
        addListener = function(obj, eventType, listener) {
            obj.attachEvent("on" + eventType, listener);
        };
    } else {
        fail("Document does not have required addEventListener or attachEvent method");
    }

    api.util.addListener = addListener;

    var initListeners = [];

    function getErrorDesc(ex) {
        return ex.message || ex.description || String(ex);
    }

    // Initialization
    function init() {
        if (api.initialized) {
            return;
        }
        var testRange;
        var implementsDomRange = false, implementsTextRange = false;

        // First, perform basic feature tests

        if (isHostMethod(document, "createRange")) {
            testRange = document.createRange();
            if (areHostMethods(testRange, domRangeMethods) && areHostProperties(testRange, domRangeProperties)) {
                implementsDomRange = true;
            }
            testRange.detach();
        }

        var body = getBody(document);
        if (!body || body.nodeName.toLowerCase() != "body") {
            fail("No body element found");
            return;
        }

        if (body && isHostMethod(body, "createTextRange")) {
            testRange = body.createTextRange();
            if (isTextRange(testRange)) {
                implementsTextRange = true;
            }
        }

        if (!implementsDomRange && !implementsTextRange) {
            fail("Neither Range nor TextRange are available");
            return;
        }

        api.initialized = true;
        api.features = {
            implementsDomRange: implementsDomRange,
            implementsTextRange: implementsTextRange
        };

        // Initialize modules
        var module, errorMessage;
        for (var moduleName in modules) {
            if ( (module = modules[moduleName]) instanceof Module ) {
                module.init(module, api);
            }
        }

        // Call init listeners
        for (var i = 0, len = initListeners.length; i < len; ++i) {
            try {
                initListeners[i](api);
            } catch (ex) {
                errorMessage = "Rangy init listener threw an exception. Continuing. Detail: " + getErrorDesc(ex);
                consoleLog(errorMessage);
            }
        }
    }

    // Allow external scripts to initialize this library in case it's loaded after the document has loaded
    api.init = init;

    // Execute listener immediately if already initialized
    api.addInitListener = function(listener) {
        if (api.initialized) {
            listener(api);
        } else {
            initListeners.push(listener);
        }
    };

    var createMissingNativeApiListeners = [];

    api.addCreateMissingNativeApiListener = function(listener) {
        createMissingNativeApiListeners.push(listener);
    };

    function createMissingNativeApi(win) {
        win = win || window;
        init();

        // Notify listeners
        for (var i = 0, len = createMissingNativeApiListeners.length; i < len; ++i) {
            createMissingNativeApiListeners[i](win);
        }
    }

    api.createMissingNativeApi = createMissingNativeApi;

    function Module(name, dependencies, initializer) {
        this.name = name;
        this.dependencies = dependencies;
        this.initialized = false;
        this.supported = false;
        this.initializer = initializer;
    }

    Module.prototype = {
        init: function(api) {
            var requiredModuleNames = this.dependencies || [];
            for (var i = 0, len = requiredModuleNames.length, requiredModule, moduleName; i < len; ++i) {
                moduleName = requiredModuleNames[i];

                requiredModule = modules[moduleName];
                if (!requiredModule || !(requiredModule instanceof Module)) {
                    throw new Error("required module '" + moduleName + "' not found");
                }

                requiredModule.init();

                if (!requiredModule.supported) {
                    throw new Error("required module '" + moduleName + "' not supported");
                }
            }
            
            // Now run initializer
            this.initializer(this)
        },
        
        fail: function(reason) {
            this.initialized = true;
            this.supported = false;
            throw new Error("Module '" + this.name + "' failed to load: " + reason);
        },

        warn: function(msg) {
            api.warn("Module " + this.name + ": " + msg);
        },

        deprecationNotice: function(deprecated, replacement) {
            api.warn("DEPRECATED: " + deprecated + " in module " + this.name + "is deprecated. Please use "
                + replacement + " instead");
        },

        createError: function(msg) {
            return new Error("Error in Rangy " + this.name + " module: " + msg);
        }
    };
    
    function createModule(isCore, name, dependencies, initFunc) {
        var newModule = new Module(name, dependencies, function(module) {
            if (!module.initialized) {
                module.initialized = true;
                try {
                    initFunc(api, module);
                    module.supported = true;
                } catch (ex) {
                    var errorMessage = "Module '" + name + "' failed to load: " + getErrorDesc(ex);
                    consoleLog(errorMessage);
                }
            }
        });
        modules[name] = newModule;
        
/*
        // Add module AMD support
        if (!isCore && amdSupported) {
            global.define(["rangy-core"], function(rangy) {
                
            });
        }
*/
    }

    api.createModule = function(name) {
        // Allow 2 or 3 arguments (second argument is an optional array of dependencies)
        var initFunc, dependencies;
        if (arguments.length == 2) {
            initFunc = arguments[1];
            dependencies = [];
        } else {
            initFunc = arguments[2];
            dependencies = arguments[1];
        }
        createModule(false, name, dependencies, initFunc);
    };

    api.createCoreModule = function(name, dependencies, initFunc) {
        createModule(true, name, dependencies, initFunc);
    };

    /*----------------------------------------------------------------------------------------------------------------*/

    // Ensure rangy.rangePrototype and rangy.selectionPrototype are available immediately

    function RangePrototype() {}
    api.RangePrototype = RangePrototype;
    api.rangePrototype = new RangePrototype();

    function SelectionPrototype() {}
    api.selectionPrototype = new SelectionPrototype();

    /*----------------------------------------------------------------------------------------------------------------*/

    // Wait for document to load before running tests

    var docReady = false;

    var loadHandler = function(e) {
        if (!docReady) {
            docReady = true;
            if (!api.initialized) {
                init();
            }
        }
    };

    // Test whether we have window and document objects that we will need
    if (typeof window == UNDEFINED) {
        fail("No window found");
        return;
    }
    if (typeof document == UNDEFINED) {
        fail("No document found");
        return;
    }

    if (isHostMethod(document, "addEventListener")) {
        document.addEventListener("DOMContentLoaded", loadHandler, false);
    }

    // Add a fallback in case the DOMContentLoaded event isn't supported
    addListener(window, "load", loadHandler);

    /*----------------------------------------------------------------------------------------------------------------*/
    
    // AMD, for those who like this kind of thing

    if (amdSupported) {
        // AMD. Register as an anonymous module.
        global.define(function() {
            api.amd = true;
            return api;
        });
    }
    
    // Create a "rangy" property of the global object in any case. Other Rangy modules (which use Rangy's own simple
    // module system) rely on the existence of this global property
    global.rangy = api;
})(this);    

rangy.createCoreModule("DomUtil", [], function(api, module) {
    var UNDEF = "undefined";
    var util = api.util;

    // Perform feature tests
    if (!util.areHostMethods(document, ["createDocumentFragment", "createElement", "createTextNode"])) {
        module.fail("document missing a Node creation method");
    }

    if (!util.isHostMethod(document, "getElementsByTagName")) {
        module.fail("document missing getElementsByTagName method");
    }

    var el = document.createElement("div");
    if (!util.areHostMethods(el, ["insertBefore", "appendChild", "cloneNode"] ||
            !util.areHostObjects(el, ["previousSibling", "nextSibling", "childNodes", "parentNode"]))) {
        module.fail("Incomplete Element implementation");
    }

    // innerHTML is required for Range's createContextualFragment method
    if (!util.isHostProperty(el, "innerHTML")) {
        module.fail("Element is missing innerHTML property");
    }

    var textNode = document.createTextNode("test");
    if (!util.areHostMethods(textNode, ["splitText", "deleteData", "insertData", "appendData", "cloneNode"] ||
            !util.areHostObjects(el, ["previousSibling", "nextSibling", "childNodes", "parentNode"]) ||
            !util.areHostProperties(textNode, ["data"]))) {
        module.fail("Incomplete Text Node implementation");
    }

    /*----------------------------------------------------------------------------------------------------------------*/

    // Removed use of indexOf because of a bizarre bug in Opera that is thrown in one of the Acid3 tests. I haven't been
    // able to replicate it outside of the test. The bug is that indexOf returns -1 when called on an Array that
    // contains just the document as a single element and the value searched for is the document.
    var arrayContains = /*Array.prototype.indexOf ?
        function(arr, val) {
            return arr.indexOf(val) > -1;
        }:*/

        function(arr, val) {
            var i = arr.length;
            while (i--) {
                if (arr[i] === val) {
                    return true;
                }
            }
            return false;
        };

    // Opera 11 puts HTML elements in the null namespace, it seems, and IE 7 has undefined namespaceURI
    function isHtmlNamespace(node) {
        var ns;
        return typeof node.namespaceURI == UNDEF || ((ns = node.namespaceURI) === null || ns == "http://www.w3.org/1999/xhtml");
    }

    function parentElement(node) {
        var parent = node.parentNode;
        return (parent.nodeType == 1) ? parent : null;
    }

    function getNodeIndex(node) {
        var i = 0;
        while( (node = node.previousSibling) ) {
            ++i;
        }
        return i;
    }

    function getNodeLength(node) {
        switch (node.nodeType) {
            case 7:
            case 10:
                return 0;
            case 3:
            case 8:
                return node.length;
            default:
                return node.childNodes.length;
        }
    }

    function getCommonAncestor(node1, node2) {
        var ancestors = [], n;
        for (n = node1; n; n = n.parentNode) {
            ancestors.push(n);
        }

        for (n = node2; n; n = n.parentNode) {
            if (arrayContains(ancestors, n)) {
                return n;
            }
        }

        return null;
    }

    function isAncestorOf(ancestor, descendant, selfIsAncestor) {
        var n = selfIsAncestor ? descendant : descendant.parentNode;
        while (n) {
            if (n === ancestor) {
                return true;
            } else {
                n = n.parentNode;
            }
        }
        return false;
    }

    function isOrIsAncestorOf(ancestor, descendant) {
        return isAncestorOf(ancestor, descendant, true);
    }

    function getClosestAncestorIn(node, ancestor, selfIsAncestor) {
        var p, n = selfIsAncestor ? node : node.parentNode;
        while (n) {
            p = n.parentNode;
            if (p === ancestor) {
                return n;
            }
            n = p;
        }
        return null;
    }

    function isCharacterDataNode(node) {
        var t = node.nodeType;
        return t == 3 || t == 4 || t == 8 ; // Text, CDataSection or Comment
    }

    function isTextOrCommentNode(node) {
        if (!node) {
            return false;
        }
        var t = node.nodeType;
        return t == 3 || t == 8 ; // Text or Comment
    }

    function insertAfter(node, precedingNode) {
        var nextNode = precedingNode.nextSibling, parent = precedingNode.parentNode;
        if (nextNode) {
            parent.insertBefore(node, nextNode);
        } else {
            parent.appendChild(node);
        }
        return node;
    }

    // Note that we cannot use splitText() because it is bugridden in IE 9.
    function splitDataNode(node, index, positionsToPreserve) {
        var newNode = node.cloneNode(false);
        newNode.deleteData(0, index);
        node.deleteData(index, node.length - index);
        insertAfter(newNode, node);

        // Preserve positions
        if (positionsToPreserve) {
            for (var i = 0, position; position = positionsToPreserve[i++]; ) {
                // Handle case where position was inside the portion of node after the split point
                if (position.node == node && position.offset > index) {
                    position.node = newNode;
                    position.offset -= index;
                }
                // Handle the case where the position is a node offset within node's parent
                else if (position.node == node.parentNode && position.offset > getNodeIndex(node)) {
                    ++position.offset;
                }
            }
        }
        return newNode;
    }

    function getDocument(node) {
        if (node.nodeType == 9) {
            return node;
        } else if (typeof node.ownerDocument != UNDEF) {
            return node.ownerDocument;
        } else if (typeof node.document != UNDEF) {
            return node.document;
        } else if (node.parentNode) {
            return getDocument(node.parentNode);
        } else {
            throw module.createError("getDocument: no document found for node");
        }
    }

    function getWindow(node) {
        var doc = getDocument(node);
        if (typeof doc.defaultView != UNDEF) {
            return doc.defaultView;
        } else if (typeof doc.parentWindow != UNDEF) {
            return doc.parentWindow;
        } else {
            throw module.createError("Cannot get a window object for node");
        }
    }

    function getIframeDocument(iframeEl) {
        if (typeof iframeEl.contentDocument != UNDEF) {
            return iframeEl.contentDocument;
        } else if (typeof iframeEl.contentWindow != UNDEF) {
            return iframeEl.contentWindow.document;
        } else {
            throw module.createError("getIframeDocument: No Document object found for iframe element");
        }
    }

    function getIframeWindow(iframeEl) {
        if (typeof iframeEl.contentWindow != UNDEF) {
            return iframeEl.contentWindow;
        } else if (typeof iframeEl.contentDocument != UNDEF) {
            return iframeEl.contentDocument.defaultView;
        } else {
            throw module.createError("getIframeWindow: No Window object found for iframe element");
        }
    }

    // This looks bad. Is it worth it?
    function isWindow(obj) {
        return obj && util.isHostMethod(obj, "setTimeout") && util.isHostObject(obj, "document");
    }

    function getContentDocument(obj, module, methodName) {
        var doc;

        if (!obj) {
            doc = document;
        }

        // Test if a DOM node has been passed and obtain a document object for it if so
        else if (util.isHostProperty(obj, "nodeType")) {
            doc = (obj.nodeType == 1 && obj.tagName.toLowerCase() == "iframe")
                ? getIframeDocument(obj) : getDocument(obj);
        }

        // Test if the doc parameter appears to be a Window object
        else if (isWindow(obj)) {
            doc = obj.document;
        }

        if (!doc) {
            throw module.createError(methodName + "(): Parameter must be a Window object or DOM node");
        }

        return doc;
    }

    function getRootContainer(node) {
        var parent;
        while ( (parent = node.parentNode) ) {
            node = parent;
        }
        return node;
    }

    function comparePoints(nodeA, offsetA, nodeB, offsetB) {
        // See http://www.w3.org/TR/DOM-Level-2-Traversal-Range/ranges.html#Level-2-Range-Comparing
        var nodeC, root, childA, childB, n;
        if (nodeA == nodeB) {
            // Case 1: nodes are the same
            return offsetA === offsetB ? 0 : (offsetA < offsetB) ? -1 : 1;
        } else if ( (nodeC = getClosestAncestorIn(nodeB, nodeA, true)) ) {
            // Case 2: node C (container B or an ancestor) is a child node of A
            return offsetA <= getNodeIndex(nodeC) ? -1 : 1;
        } else if ( (nodeC = getClosestAncestorIn(nodeA, nodeB, true)) ) {
            // Case 3: node C (container A or an ancestor) is a child node of B
            return getNodeIndex(nodeC) < offsetB  ? -1 : 1;
        } else {
            root = getCommonAncestor(nodeA, nodeB);
            if (!root) {
                throw new Error("comparePoints error: nodes have no common ancestor");
            }

            // Case 4: containers are siblings or descendants of siblings
            childA = (nodeA === root) ? root : getClosestAncestorIn(nodeA, root, true);
            childB = (nodeB === root) ? root : getClosestAncestorIn(nodeB, root, true);

            if (childA === childB) {
                // This shouldn't be possible
                throw module.createError("comparePoints got to case 4 and childA and childB are the same!");
            } else {
                n = root.firstChild;
                while (n) {
                    if (n === childA) {
                        return -1;
                    } else if (n === childB) {
                        return 1;
                    }
                    n = n.nextSibling;
                }
            }
        }
    }

    /*----------------------------------------------------------------------------------------------------------------*/

    // Test for IE's crash (IE 6/7) or exception (IE >= 8) when a reference to garbage-collected text node is queried
    var crashyTextNodes = false;

    function isBrokenNode(node) {
        try {
            node.parentNode;
            return false;
        } catch (e) {
            return true;
        }
    }

    (function() {
        var el = document.createElement("b");
        el.innerHTML = "1";
        var textNode = el.firstChild;
        el.innerHTML = "<br>";
        crashyTextNodes = isBrokenNode(textNode);

        api.features.crashyTextNodes = crashyTextNodes;
    })();

    /*----------------------------------------------------------------------------------------------------------------*/

    function inspectNode(node) {
        if (!node) {
            return "[No node]";
        }
        if (crashyTextNodes && isBrokenNode(node)) {
            return "[Broken node]";
        }
        if (isCharacterDataNode(node)) {
            return '"' + node.data + '"';
        }
        if (node.nodeType == 1) {
            var idAttr = node.id ? ' id="' + node.id + '"' : "";
            return "<" + node.nodeName + idAttr + ">[" + getNodeIndex(node) + "][" + node.childNodes.length + "][" + (node.innerHTML || "[innerHTML not supported]").slice(0, 25) + "]";
        }
        return node.nodeName;
    }

    function fragmentFromNodeChildren(node) {
        var fragment = getDocument(node).createDocumentFragment(), child;
        while ( (child = node.firstChild) ) {
            fragment.appendChild(child);
        }
        return fragment;
    }

    var getComputedStyleProperty;
    if (typeof window.getComputedStyle != UNDEF) {
        getComputedStyleProperty = function(el, propName) {
            return getWindow(el).getComputedStyle(el, null)[propName];
        };
    } else if (typeof document.documentElement.currentStyle != UNDEF) {
        getComputedStyleProperty = function(el, propName) {
            return el.currentStyle[propName];
        };
    } else {
        module.fail("No means of obtaining computed style properties found");
    }

    function NodeIterator(root) {
        this.root = root;
        this._next = root;
    }

    NodeIterator.prototype = {
        _current: null,

        hasNext: function() {
            return !!this._next;
        },

        next: function() {
            var n = this._current = this._next;
            var child, next;
            if (this._current) {
                child = n.firstChild;
                if (child) {
                    this._next = child;
                } else {
                    next = null;
                    while ((n !== this.root) && !(next = n.nextSibling)) {
                        n = n.parentNode;
                    }
                    this._next = next;
                }
            }
            return this._current;
        },

        detach: function() {
            this._current = this._next = this.root = null;
        }
    };

    function createIterator(root) {
        return new NodeIterator(root);
    }

    function DomPosition(node, offset) {
        this.node = node;
        this.offset = offset;
    }

    DomPosition.prototype = {
        equals: function(pos) {
            return !!pos && this.node === pos.node && this.offset == pos.offset;
        },

        inspect: function() {
            return "[DomPosition(" + inspectNode(this.node) + ":" + this.offset + ")]";
        },

        toString: function() {
            return this.inspect();
        }
    };

    function DOMException(codeName) {
        this.code = this[codeName];
        this.codeName = codeName;
        this.message = "DOMException: " + this.codeName;
    }

    DOMException.prototype = {
        INDEX_SIZE_ERR: 1,
        HIERARCHY_REQUEST_ERR: 3,
        WRONG_DOCUMENT_ERR: 4,
        NO_MODIFICATION_ALLOWED_ERR: 7,
        NOT_FOUND_ERR: 8,
        NOT_SUPPORTED_ERR: 9,
        INVALID_STATE_ERR: 11
    };

    DOMException.prototype.toString = function() {
        return this.message;
    };

    api.dom = {
        arrayContains: arrayContains,
        isHtmlNamespace: isHtmlNamespace,
        parentElement: parentElement,
        getNodeIndex: getNodeIndex,
        getNodeLength: getNodeLength,
        getCommonAncestor: getCommonAncestor,
        isAncestorOf: isAncestorOf,
        isOrIsAncestorOf: isOrIsAncestorOf,
        getClosestAncestorIn: getClosestAncestorIn,
        isCharacterDataNode: isCharacterDataNode,
        isTextOrCommentNode: isTextOrCommentNode,
        insertAfter: insertAfter,
        splitDataNode: splitDataNode,
        getDocument: getDocument,
        getWindow: getWindow,
        getIframeWindow: getIframeWindow,
        getIframeDocument: getIframeDocument,
        getBody: util.getBody,
        isWindow: isWindow,
        getContentDocument: getContentDocument,
        getRootContainer: getRootContainer,
        comparePoints: comparePoints,
        isBrokenNode: isBrokenNode,
        inspectNode: inspectNode,
        getComputedStyleProperty: getComputedStyleProperty,
        fragmentFromNodeChildren: fragmentFromNodeChildren,
        createIterator: createIterator,
        DomPosition: DomPosition
    };

    api.DOMException = DOMException;
});
rangy.createCoreModule("DomRange", ["DomUtil"], function(api, module) {
    var dom = api.dom;
    var util = api.util;
    var DomPosition = dom.DomPosition;
    var DOMException = api.DOMException;

    var isCharacterDataNode = dom.isCharacterDataNode;
    var getNodeIndex = dom.getNodeIndex;
    var isOrIsAncestorOf = dom.isOrIsAncestorOf;
    var getDocument = dom.getDocument;
    var comparePoints = dom.comparePoints;
    var splitDataNode = dom.splitDataNode;
    var getClosestAncestorIn = dom.getClosestAncestorIn;
    var getNodeLength = dom.getNodeLength;
    var arrayContains = dom.arrayContains;
    var getRootContainer = dom.getRootContainer;
    var crashyTextNodes = api.features.crashyTextNodes;

    /*----------------------------------------------------------------------------------------------------------------*/

    // Utility functions

    function isNonTextPartiallySelected(node, range) {
        return (node.nodeType != 3) &&
               (isOrIsAncestorOf(node, range.startContainer) || isOrIsAncestorOf(node, range.endContainer));
    }

    function getRangeDocument(range) {
        return range.document || getDocument(range.startContainer);
    }

    function getBoundaryBeforeNode(node) {
        return new DomPosition(node.parentNode, getNodeIndex(node));
    }

    function getBoundaryAfterNode(node) {
        return new DomPosition(node.parentNode, getNodeIndex(node) + 1);
    }

    function insertNodeAtPosition(node, n, o) {
        var firstNodeInserted = node.nodeType == 11 ? node.firstChild : node;
        if (isCharacterDataNode(n)) {
            if (o == n.length) {
                dom.insertAfter(node, n);
            } else {
                n.parentNode.insertBefore(node, o == 0 ? n : splitDataNode(n, o));
            }
        } else if (o >= n.childNodes.length) {
            n.appendChild(node);
        } else {
            n.insertBefore(node, n.childNodes[o]);
        }
        return firstNodeInserted;
    }

    function rangesIntersect(rangeA, rangeB, touchingIsIntersecting) {
        assertRangeValid(rangeA);
        assertRangeValid(rangeB);

        if (getRangeDocument(rangeB) != getRangeDocument(rangeA)) {
            throw new DOMException("WRONG_DOCUMENT_ERR");
        }

        var startComparison = comparePoints(rangeA.startContainer, rangeA.startOffset, rangeB.endContainer, rangeB.endOffset),
            endComparison = comparePoints(rangeA.endContainer, rangeA.endOffset, rangeB.startContainer, rangeB.startOffset);

        return touchingIsIntersecting ? startComparison <= 0 && endComparison >= 0 : startComparison < 0 && endComparison > 0;
    }

    function cloneSubtree(iterator) {
        var partiallySelected;
        for (var node, frag = getRangeDocument(iterator.range).createDocumentFragment(), subIterator; node = iterator.next(); ) {
            partiallySelected = iterator.isPartiallySelectedSubtree();
            node = node.cloneNode(!partiallySelected);
            if (partiallySelected) {
                subIterator = iterator.getSubtreeIterator();
                node.appendChild(cloneSubtree(subIterator));
                subIterator.detach(true);
            }

            if (node.nodeType == 10) { // DocumentType
                throw new DOMException("HIERARCHY_REQUEST_ERR");
            }
            frag.appendChild(node);
        }
        return frag;
    }

    function iterateSubtree(rangeIterator, func, iteratorState) {
        var it, n;
        iteratorState = iteratorState || { stop: false };
        for (var node, subRangeIterator; node = rangeIterator.next(); ) {
            if (rangeIterator.isPartiallySelectedSubtree()) {
                if (func(node) === false) {
                    iteratorState.stop = true;
                    return;
                } else {
                    // The node is partially selected by the Range, so we can use a new RangeIterator on the portion of
                    // the node selected by the Range.
                    subRangeIterator = rangeIterator.getSubtreeIterator();
                    iterateSubtree(subRangeIterator, func, iteratorState);
                    subRangeIterator.detach(true);
                    if (iteratorState.stop) {
                        return;
                    }
                }
            } else {
                // The whole node is selected, so we can use efficient DOM iteration to iterate over the node and its
                // descendants
                it = dom.createIterator(node);
                while ( (n = it.next()) ) {
                    if (func(n) === false) {
                        iteratorState.stop = true;
                        return;
                    }
                }
            }
        }
    }

    function deleteSubtree(iterator) {
        var subIterator;
        while (iterator.next()) {
            if (iterator.isPartiallySelectedSubtree()) {
                subIterator = iterator.getSubtreeIterator();
                deleteSubtree(subIterator);
                subIterator.detach(true);
            } else {
                iterator.remove();
            }
        }
    }

    function extractSubtree(iterator) {
        for (var node, frag = getRangeDocument(iterator.range).createDocumentFragment(), subIterator; node = iterator.next(); ) {

            if (iterator.isPartiallySelectedSubtree()) {
                node = node.cloneNode(false);
                subIterator = iterator.getSubtreeIterator();
                node.appendChild(extractSubtree(subIterator));
                subIterator.detach(true);
            } else {
                iterator.remove();
            }
            if (node.nodeType == 10) { // DocumentType
                throw new DOMException("HIERARCHY_REQUEST_ERR");
            }
            frag.appendChild(node);
        }
        return frag;
    }

    function getNodesInRange(range, nodeTypes, filter) {
        var filterNodeTypes = !!(nodeTypes && nodeTypes.length), regex;
        var filterExists = !!filter;
        if (filterNodeTypes) {
            regex = new RegExp("^(" + nodeTypes.join("|") + ")$");
        }

        var nodes = [];
        iterateSubtree(new RangeIterator(range, false), function(node) {
            if (filterNodeTypes && !regex.test(node.nodeType)) {
                return;
            }
            if (filterExists && !filter(node)) {
                return;
            }
            // Don't include a boundary container if it is a character data node and the range does not contain any
            // of its character data. See issue 190.
            var sc = range.startContainer;
            if (node == sc && isCharacterDataNode(sc) && range.startOffset == sc.length) {
                return;
            }

            var ec = range.endContainer;
            if (node == ec && isCharacterDataNode(ec) && range.endOffset == 0) {
                return;
            }

            nodes.push(node);
        });
        return nodes;
    }

    function inspect(range) {
        var name = (typeof range.getName == "undefined") ? "Range" : range.getName();
        return "[" + name + "(" + dom.inspectNode(range.startContainer) + ":" + range.startOffset + ", " +
                dom.inspectNode(range.endContainer) + ":" + range.endOffset + ")]";
    }

    /*----------------------------------------------------------------------------------------------------------------*/

    // RangeIterator code partially borrows from IERange by Tim Ryan (http://github.com/timcameronryan/IERange)

    function RangeIterator(range, clonePartiallySelectedTextNodes) {
        this.range = range;
        this.clonePartiallySelectedTextNodes = clonePartiallySelectedTextNodes;


        if (!range.collapsed) {
            this.sc = range.startContainer;
            this.so = range.startOffset;
            this.ec = range.endContainer;
            this.eo = range.endOffset;
            var root = range.commonAncestorContainer;

            if (this.sc === this.ec && isCharacterDataNode(this.sc)) {
                this.isSingleCharacterDataNode = true;
                this._first = this._last = this._next = this.sc;
            } else {
                this._first = this._next = (this.sc === root && !isCharacterDataNode(this.sc)) ?
                    this.sc.childNodes[this.so] : getClosestAncestorIn(this.sc, root, true);
                this._last = (this.ec === root && !isCharacterDataNode(this.ec)) ?
                    this.ec.childNodes[this.eo - 1] : getClosestAncestorIn(this.ec, root, true);
            }
        }
    }

    RangeIterator.prototype = {
        _current: null,
        _next: null,
        _first: null,
        _last: null,
        isSingleCharacterDataNode: false,

        reset: function() {
            this._current = null;
            this._next = this._first;
        },

        hasNext: function() {
            return !!this._next;
        },

        next: function() {
            // Move to next node
            var current = this._current = this._next;
            if (current) {
                this._next = (current !== this._last) ? current.nextSibling : null;

                // Check for partially selected text nodes
                if (isCharacterDataNode(current) && this.clonePartiallySelectedTextNodes) {
                    if (current === this.ec) {
                        (current = current.cloneNode(true)).deleteData(this.eo, current.length - this.eo);
                    }
                    if (this._current === this.sc) {
                        (current = current.cloneNode(true)).deleteData(0, this.so);
                    }
                }
            }

            return current;
        },

        remove: function() {
            var current = this._current, start, end;

            if (isCharacterDataNode(current) && (current === this.sc || current === this.ec)) {
                start = (current === this.sc) ? this.so : 0;
                end = (current === this.ec) ? this.eo : current.length;
                if (start != end) {
                    current.deleteData(start, end - start);
                }
            } else {
                if (current.parentNode) {
                    current.parentNode.removeChild(current);
                } else {
                }
            }
        },

        // Checks if the current node is partially selected
        isPartiallySelectedSubtree: function() {
            var current = this._current;
            return isNonTextPartiallySelected(current, this.range);
        },

        getSubtreeIterator: function() {
            var subRange;
            if (this.isSingleCharacterDataNode) {
                subRange = this.range.cloneRange();
                subRange.collapse(false);
            } else {
                subRange = new Range(getRangeDocument(this.range));
                var current = this._current;
                var startContainer = current, startOffset = 0, endContainer = current, endOffset = getNodeLength(current);

                if (isOrIsAncestorOf(current, this.sc)) {
                    startContainer = this.sc;
                    startOffset = this.so;
                }
                if (isOrIsAncestorOf(current, this.ec)) {
                    endContainer = this.ec;
                    endOffset = this.eo;
                }

                updateBoundaries(subRange, startContainer, startOffset, endContainer, endOffset);
            }
            return new RangeIterator(subRange, this.clonePartiallySelectedTextNodes);
        },

        detach: function(detachRange) {
            if (detachRange) {
                this.range.detach();
            }
            this.range = this._current = this._next = this._first = this._last = this.sc = this.so = this.ec = this.eo = null;
        }
    };

    /*----------------------------------------------------------------------------------------------------------------*/

    // Exceptions

    function RangeException(codeName) {
        this.code = this[codeName];
        this.codeName = codeName;
        this.message = "RangeException: " + this.codeName;
    }

    RangeException.prototype = {
        BAD_BOUNDARYPOINTS_ERR: 1,
        INVALID_NODE_TYPE_ERR: 2
    };

    RangeException.prototype.toString = function() {
        return this.message;
    };

    /*----------------------------------------------------------------------------------------------------------------*/

    var beforeAfterNodeTypes = [1, 3, 4, 5, 7, 8, 10];
    var rootContainerNodeTypes = [2, 9, 11];
    var readonlyNodeTypes = [5, 6, 10, 12];
    var insertableNodeTypes = [1, 3, 4, 5, 7, 8, 10, 11];
    var surroundNodeTypes = [1, 3, 4, 5, 7, 8];

    function createAncestorFinder(nodeTypes) {
        return function(node, selfIsAncestor) {
            var t, n = selfIsAncestor ? node : node.parentNode;
            while (n) {
                t = n.nodeType;
                if (arrayContains(nodeTypes, t)) {
                    return n;
                }
                n = n.parentNode;
            }
            return null;
        };
    }

    var getDocumentOrFragmentContainer = createAncestorFinder( [9, 11] );
    var getReadonlyAncestor = createAncestorFinder(readonlyNodeTypes);
    var getDocTypeNotationEntityAncestor = createAncestorFinder( [6, 10, 12] );

    function assertNoDocTypeNotationEntityAncestor(node, allowSelf) {
        if (getDocTypeNotationEntityAncestor(node, allowSelf)) {
            throw new RangeException("INVALID_NODE_TYPE_ERR");
        }
    }

    function assertNotDetached(range) {
        if (!range.startContainer) {
            throw new DOMException("INVALID_STATE_ERR");
        }
    }

    function assertValidNodeType(node, invalidTypes) {
        if (!arrayContains(invalidTypes, node.nodeType)) {
            throw new RangeException("INVALID_NODE_TYPE_ERR");
        }
    }

    function assertValidOffset(node, offset) {
        if (offset < 0 || offset > (isCharacterDataNode(node) ? node.length : node.childNodes.length)) {
            throw new DOMException("INDEX_SIZE_ERR");
        }
    }

    function assertSameDocumentOrFragment(node1, node2) {
        if (getDocumentOrFragmentContainer(node1, true) !== getDocumentOrFragmentContainer(node2, true)) {
            throw new DOMException("WRONG_DOCUMENT_ERR");
        }
    }

    function assertNodeNotReadOnly(node) {
        if (getReadonlyAncestor(node, true)) {
            throw new DOMException("NO_MODIFICATION_ALLOWED_ERR");
        }
    }

    function assertNode(node, codeName) {
        if (!node) {
            throw new DOMException(codeName);
        }
    }

    function isOrphan(node) {
        return (crashyTextNodes && dom.isBrokenNode(node)) ||
            !arrayContains(rootContainerNodeTypes, node.nodeType) && !getDocumentOrFragmentContainer(node, true);
    }

    function isValidOffset(node, offset) {
        return offset <= (isCharacterDataNode(node) ? node.length : node.childNodes.length);
    }

    function isRangeValid(range) {
        return (!!range.startContainer && !!range.endContainer
                && !isOrphan(range.startContainer)
                && !isOrphan(range.endContainer)
                && isValidOffset(range.startContainer, range.startOffset)
                && isValidOffset(range.endContainer, range.endOffset));
    }

    function assertRangeValid(range) {
        assertNotDetached(range);
        if (!isRangeValid(range)) {
            throw new Error("Range error: Range is no longer valid after DOM mutation (" + range.inspect() + ")");
        }
    }

    /*----------------------------------------------------------------------------------------------------------------*/

    // Test the browser's innerHTML support to decide how to implement createContextualFragment
    var styleEl = document.createElement("style");
    var htmlParsingConforms = false;
    try {
        styleEl.innerHTML = "<b>x</b>";
        htmlParsingConforms = (styleEl.firstChild.nodeType == 3); // Opera incorrectly creates an element node
    } catch (e) {
        // IE 6 and 7 throw
    }

    api.features.htmlParsingConforms = htmlParsingConforms;

    var createContextualFragment = htmlParsingConforms ?

        // Implementation as per HTML parsing spec, trusting in the browser's implementation of innerHTML. See
        // discussion and base code for this implementation at issue 67.
        // Spec: http://html5.org/specs/dom-parsing.html#extensions-to-the-range-interface
        // Thanks to Aleks Williams.
        function(fragmentStr) {
            // "Let node the context object's start's node."
            var node = this.startContainer;
            var doc = getDocument(node);

            // "If the context object's start's node is null, raise an INVALID_STATE_ERR
            // exception and abort these steps."
            if (!node) {
                throw new DOMException("INVALID_STATE_ERR");
            }

            // "Let element be as follows, depending on node's interface:"
            // Document, Document Fragment: null
            var el = null;

            // "Element: node"
            if (node.nodeType == 1) {
                el = node;

            // "Text, Comment: node's parentElement"
            } else if (isCharacterDataNode(node)) {
                el = dom.parentElement(node);
            }

            // "If either element is null or element's ownerDocument is an HTML document
            // and element's local name is "html" and element's namespace is the HTML
            // namespace"
            if (el === null || (
                el.nodeName == "HTML"
                && dom.isHtmlNamespace(getDocument(el).documentElement)
                && dom.isHtmlNamespace(el)
            )) {

            // "let element be a new Element with "body" as its local name and the HTML
            // namespace as its namespace.""
                el = doc.createElement("body");
            } else {
                el = el.cloneNode(false);
            }

            // "If the node's document is an HTML document: Invoke the HTML fragment parsing algorithm."
            // "If the node's document is an XML document: Invoke the XML fragment parsing algorithm."
            // "In either case, the algorithm must be invoked with fragment as the input
            // and element as the context element."
            el.innerHTML = fragmentStr;

            // "If this raises an exception, then abort these steps. Otherwise, let new
            // children be the nodes returned."

            // "Let fragment be a new DocumentFragment."
            // "Append all new children to fragment."
            // "Return fragment."
            return dom.fragmentFromNodeChildren(el);
        } :

        // In this case, innerHTML cannot be trusted, so fall back to a simpler, non-conformant implementation that
        // previous versions of Rangy used (with the exception of using a body element rather than a div)
        function(fragmentStr) {
            assertNotDetached(this);
            var doc = getRangeDocument(this);
            var el = doc.createElement("body");
            el.innerHTML = fragmentStr;

            return dom.fragmentFromNodeChildren(el);
        };

    function splitRangeBoundaries(range, positionsToPreserve) {
        assertRangeValid(range);

        var sc = range.startContainer, so = range.startOffset, ec = range.endContainer, eo = range.endOffset;
        var startEndSame = (sc === ec);

        if (isCharacterDataNode(ec) && eo > 0 && eo < ec.length) {
            splitDataNode(ec, eo, positionsToPreserve);
        }

        if (isCharacterDataNode(sc) && so > 0 && so < sc.length) {
            sc = splitDataNode(sc, so, positionsToPreserve);
            if (startEndSame) {
                eo -= so;
                ec = sc;
            } else if (ec == sc.parentNode && eo >= getNodeIndex(sc)) {
                eo++;
            }
            so = 0;
        }
        range.setStartAndEnd(sc, so, ec, eo);
    }

    /*----------------------------------------------------------------------------------------------------------------*/

    var rangeProperties = ["startContainer", "startOffset", "endContainer", "endOffset", "collapsed",
        "commonAncestorContainer"];

    var s2s = 0, s2e = 1, e2e = 2, e2s = 3;
    var n_b = 0, n_a = 1, n_b_a = 2, n_i = 3;

    util.extend(api.rangePrototype, {
        compareBoundaryPoints: function(how, range) {
            assertRangeValid(this);
            assertSameDocumentOrFragment(this.startContainer, range.startContainer);

            var nodeA, offsetA, nodeB, offsetB;
            var prefixA = (how == e2s || how == s2s) ? "start" : "end";
            var prefixB = (how == s2e || how == s2s) ? "start" : "end";
            nodeA = this[prefixA + "Container"];
            offsetA = this[prefixA + "Offset"];
            nodeB = range[prefixB + "Container"];
            offsetB = range[prefixB + "Offset"];
            return comparePoints(nodeA, offsetA, nodeB, offsetB);
        },

        insertNode: function(node) {
            assertRangeValid(this);
            assertValidNodeType(node, insertableNodeTypes);
            assertNodeNotReadOnly(this.startContainer);

            if (isOrIsAncestorOf(node, this.startContainer)) {
                throw new DOMException("HIERARCHY_REQUEST_ERR");
            }

            // No check for whether the container of the start of the Range is of a type that does not allow
            // children of the type of node: the browser's DOM implementation should do this for us when we attempt
            // to add the node

            var firstNodeInserted = insertNodeAtPosition(node, this.startContainer, this.startOffset);
            this.setStartBefore(firstNodeInserted);
        },

        cloneContents: function() {
            assertRangeValid(this);

            var clone, frag;
            if (this.collapsed) {
                return getRangeDocument(this).createDocumentFragment();
            } else {
                if (this.startContainer === this.endContainer && isCharacterDataNode(this.startContainer)) {
                    clone = this.startContainer.cloneNode(true);
                    clone.data = clone.data.slice(this.startOffset, this.endOffset);
                    frag = getRangeDocument(this).createDocumentFragment();
                    frag.appendChild(clone);
                    return frag;
                } else {
                    var iterator = new RangeIterator(this, true);
                    clone = cloneSubtree(iterator);
                    iterator.detach();
                }
                return clone;
            }
        },

        canSurroundContents: function() {
            assertRangeValid(this);
            assertNodeNotReadOnly(this.startContainer);
            assertNodeNotReadOnly(this.endContainer);

            // Check if the contents can be surrounded. Specifically, this means whether the range partially selects
            // no non-text nodes.
            var iterator = new RangeIterator(this, true);
            var boundariesInvalid = (iterator._first && (isNonTextPartiallySelected(iterator._first, this)) ||
                    (iterator._last && isNonTextPartiallySelected(iterator._last, this)));
            iterator.detach();
            return !boundariesInvalid;
        },

        surroundContents: function(node) {
            assertValidNodeType(node, surroundNodeTypes);

            if (!this.canSurroundContents()) {
                throw new RangeException("BAD_BOUNDARYPOINTS_ERR");
            }

            // Extract the contents
            var content = this.extractContents();

            // Clear the children of the node
            if (node.hasChildNodes()) {
                while (node.lastChild) {
                    node.removeChild(node.lastChild);
                }
            }

            // Insert the new node and add the extracted contents
            insertNodeAtPosition(node, this.startContainer, this.startOffset);
            node.appendChild(content);

            this.selectNode(node);
        },

        cloneRange: function() {
            assertRangeValid(this);
            var range = new Range(getRangeDocument(this));
            var i = rangeProperties.length, prop;
            while (i--) {
                prop = rangeProperties[i];
                range[prop] = this[prop];
            }
            return range;
        },

        toString: function() {
            assertRangeValid(this);
            var sc = this.startContainer;
            if (sc === this.endContainer && isCharacterDataNode(sc)) {
                return (sc.nodeType == 3 || sc.nodeType == 4) ? sc.data.slice(this.startOffset, this.endOffset) : "";
            } else {
                var textParts = [], iterator = new RangeIterator(this, true);
                iterateSubtree(iterator, function(node) {
                    // Accept only text or CDATA nodes, not comments
                    if (node.nodeType == 3 || node.nodeType == 4) {
                        textParts.push(node.data);
                    }
                });
                iterator.detach();
                return textParts.join("");
            }
        },

        // The methods below are all non-standard. The following batch were introduced by Mozilla but have since
        // been removed from Mozilla.

        compareNode: function(node) {
            assertRangeValid(this);

            var parent = node.parentNode;
            var nodeIndex = getNodeIndex(node);

            if (!parent) {
                throw new DOMException("NOT_FOUND_ERR");
            }

            var startComparison = this.comparePoint(parent, nodeIndex),
                endComparison = this.comparePoint(parent, nodeIndex + 1);

            if (startComparison < 0) { // Node starts before
                return (endComparison > 0) ? n_b_a : n_b;
            } else {
                return (endComparison > 0) ? n_a : n_i;
            }
        },

        comparePoint: function(node, offset) {
            assertRangeValid(this);
            assertNode(node, "HIERARCHY_REQUEST_ERR");
            assertSameDocumentOrFragment(node, this.startContainer);

            if (comparePoints(node, offset, this.startContainer, this.startOffset) < 0) {
                return -1;
            } else if (comparePoints(node, offset, this.endContainer, this.endOffset) > 0) {
                return 1;
            }
            return 0;
        },

        createContextualFragment: createContextualFragment,

        toHtml: function() {
            assertRangeValid(this);
            var container = this.commonAncestorContainer.parentNode.cloneNode(false);
            container.appendChild(this.cloneContents());
            return container.innerHTML;
        },

        // touchingIsIntersecting determines whether this method considers a node that borders a range intersects
        // with it (as in WebKit) or not (as in Gecko pre-1.9, and the default)
        intersectsNode: function(node, touchingIsIntersecting) {
            assertRangeValid(this);
            assertNode(node, "NOT_FOUND_ERR");
            if (getDocument(node) !== getRangeDocument(this)) {
                return false;
            }

            var parent = node.parentNode, offset = getNodeIndex(node);
            assertNode(parent, "NOT_FOUND_ERR");

            var startComparison = comparePoints(parent, offset, this.endContainer, this.endOffset),
                endComparison = comparePoints(parent, offset + 1, this.startContainer, this.startOffset);

            return touchingIsIntersecting ? startComparison <= 0 && endComparison >= 0 : startComparison < 0 && endComparison > 0;
        },

        isPointInRange: function(node, offset) {
            assertRangeValid(this);
            assertNode(node, "HIERARCHY_REQUEST_ERR");
            assertSameDocumentOrFragment(node, this.startContainer);

            return (comparePoints(node, offset, this.startContainer, this.startOffset) >= 0) &&
                   (comparePoints(node, offset, this.endContainer, this.endOffset) <= 0);
        },

        // The methods below are non-standard and invented by me.

        // Sharing a boundary start-to-end or end-to-start does not count as intersection.
        intersectsRange: function(range) {
            return rangesIntersect(this, range, false);
        },

        // Sharing a boundary start-to-end or end-to-start does count as intersection.
        intersectsOrTouchesRange: function(range) {
            return rangesIntersect(this, range, true);
        },

        intersection: function(range) {
            if (this.intersectsRange(range)) {
                var startComparison = comparePoints(this.startContainer, this.startOffset, range.startContainer, range.startOffset),
                    endComparison = comparePoints(this.endContainer, this.endOffset, range.endContainer, range.endOffset);

                var intersectionRange = this.cloneRange();
                if (startComparison == -1) {
                    intersectionRange.setStart(range.startContainer, range.startOffset);
                }
                if (endComparison == 1) {
                    intersectionRange.setEnd(range.endContainer, range.endOffset);
                }
                return intersectionRange;
            }
            return null;
        },

        union: function(range) {
            if (this.intersectsOrTouchesRange(range)) {
                var unionRange = this.cloneRange();
                if (comparePoints(range.startContainer, range.startOffset, this.startContainer, this.startOffset) == -1) {
                    unionRange.setStart(range.startContainer, range.startOffset);
                }
                if (comparePoints(range.endContainer, range.endOffset, this.endContainer, this.endOffset) == 1) {
                    unionRange.setEnd(range.endContainer, range.endOffset);
                }
                return unionRange;
            } else {
                throw new RangeException("Ranges do not intersect");
            }
        },

        containsNode: function(node, allowPartial) {
            if (allowPartial) {
                return this.intersectsNode(node, false);
            } else {
                return this.compareNode(node) == n_i;
            }
        },

        containsNodeContents: function(node) {
            return this.comparePoint(node, 0) >= 0 && this.comparePoint(node, getNodeLength(node)) <= 0;
        },

        containsRange: function(range) {
            var intersection = this.intersection(range);
            return intersection !== null && range.equals(intersection);
        },

        containsNodeText: function(node) {
            var nodeRange = this.cloneRange();
            nodeRange.selectNode(node);
            var textNodes = nodeRange.getNodes([3]);
            if (textNodes.length > 0) {
                nodeRange.setStart(textNodes[0], 0);
                var lastTextNode = textNodes.pop();
                nodeRange.setEnd(lastTextNode, lastTextNode.length);
                var contains = this.containsRange(nodeRange);
                nodeRange.detach();
                return contains;
            } else {
                return this.containsNodeContents(node);
            }
        },

        getNodes: function(nodeTypes, filter) {
            assertRangeValid(this);
            return getNodesInRange(this, nodeTypes, filter);
        },

        getDocument: function() {
            return getRangeDocument(this);
        },

        collapseBefore: function(node) {
            assertNotDetached(this);

            this.setEndBefore(node);
            this.collapse(false);
        },

        collapseAfter: function(node) {
            assertNotDetached(this);

            this.setStartAfter(node);
            this.collapse(true);
        },
        
        getBookmark: function(containerNode) {
            var doc = getRangeDocument(this);
            var preSelectionRange = api.createRange(doc);
            containerNode = containerNode || dom.getBody(doc);
            preSelectionRange.selectNodeContents(containerNode);
            var range = this.intersection(preSelectionRange);
            var start = 0, end = 0;
            if (range) {
                preSelectionRange.setEnd(range.startContainer, range.startOffset);
                start = preSelectionRange.toString().length;
                end = start + range.toString().length;
                preSelectionRange.detach();
            }

            return {
                start: start,
                end: end,
                containerNode: containerNode
            };
        },
        
        moveToBookmark: function(bookmark) {
            var containerNode = bookmark.containerNode;
            var charIndex = 0;
            this.setStart(containerNode, 0);
            this.collapse(true);
            var nodeStack = [containerNode], node, foundStart = false, stop = false;
            var nextCharIndex, i, childNodes;

            while (!stop && (node = nodeStack.pop())) {
                if (node.nodeType == 3) {
                    nextCharIndex = charIndex + node.length;
                    if (!foundStart && bookmark.start >= charIndex && bookmark.start <= nextCharIndex) {
                        this.setStart(node, bookmark.start - charIndex);
                        foundStart = true;
                    }
                    if (foundStart && bookmark.end >= charIndex && bookmark.end <= nextCharIndex) {
                        this.setEnd(node, bookmark.end - charIndex);
                        stop = true;
                    }
                    charIndex = nextCharIndex;
                } else {
                    childNodes = node.childNodes;
                    i = childNodes.length;
                    while (i--) {
                        nodeStack.push(childNodes[i]);
                    }
                }
            }
        },

        getName: function() {
            return "DomRange";
        },

        equals: function(range) {
            return Range.rangesEqual(this, range);
        },

        isValid: function() {
            return isRangeValid(this);
        },
        
        inspect: function() {
            return inspect(this);
        }
    });

    function copyComparisonConstantsToObject(obj) {
        obj.START_TO_START = s2s;
        obj.START_TO_END = s2e;
        obj.END_TO_END = e2e;
        obj.END_TO_START = e2s;

        obj.NODE_BEFORE = n_b;
        obj.NODE_AFTER = n_a;
        obj.NODE_BEFORE_AND_AFTER = n_b_a;
        obj.NODE_INSIDE = n_i;
    }

    function copyComparisonConstants(constructor) {
        copyComparisonConstantsToObject(constructor);
        copyComparisonConstantsToObject(constructor.prototype);
    }

    function createRangeContentRemover(remover, boundaryUpdater) {
        return function() {
            assertRangeValid(this);

            var sc = this.startContainer, so = this.startOffset, root = this.commonAncestorContainer;

            var iterator = new RangeIterator(this, true);

            // Work out where to position the range after content removal
            var node, boundary;
            if (sc !== root) {
                node = getClosestAncestorIn(sc, root, true);
                boundary = getBoundaryAfterNode(node);
                sc = boundary.node;
                so = boundary.offset;
            }

            // Check none of the range is read-only
            iterateSubtree(iterator, assertNodeNotReadOnly);

            iterator.reset();

            // Remove the content
            var returnValue = remover(iterator);
            iterator.detach();

            // Move to the new position
            boundaryUpdater(this, sc, so, sc, so);

            return returnValue;
        };
    }

    function createPrototypeRange(constructor, boundaryUpdater, detacher) {
        function createBeforeAfterNodeSetter(isBefore, isStart) {
            return function(node) {
                assertNotDetached(this);
                assertValidNodeType(node, beforeAfterNodeTypes);
                assertValidNodeType(getRootContainer(node), rootContainerNodeTypes);

                var boundary = (isBefore ? getBoundaryBeforeNode : getBoundaryAfterNode)(node);
                (isStart ? setRangeStart : setRangeEnd)(this, boundary.node, boundary.offset);
            };
        }

        function setRangeStart(range, node, offset) {
            var ec = range.endContainer, eo = range.endOffset;
            if (node !== range.startContainer || offset !== range.startOffset) {
                // Check the root containers of the range and the new boundary, and also check whether the new boundary
                // is after the current end. In either case, collapse the range to the new position
                if (getRootContainer(node) != getRootContainer(ec) || comparePoints(node, offset, ec, eo) == 1) {
                    ec = node;
                    eo = offset;
                }
                boundaryUpdater(range, node, offset, ec, eo);
            }
        }

        function setRangeEnd(range, node, offset) {
            var sc = range.startContainer, so = range.startOffset;
            if (node !== range.endContainer || offset !== range.endOffset) {
                // Check the root containers of the range and the new boundary, and also check whether the new boundary
                // is after the current end. In either case, collapse the range to the new position
                if (getRootContainer(node) != getRootContainer(sc) || comparePoints(node, offset, sc, so) == -1) {
                    sc = node;
                    so = offset;
                }
                boundaryUpdater(range, sc, so, node, offset);
            }
        }

        // Set up inheritance
        var F = function() {};
        F.prototype = api.rangePrototype;
        constructor.prototype = new F();

        util.extend(constructor.prototype, {
            setStart: function(node, offset) {
                assertNotDetached(this);
                assertNoDocTypeNotationEntityAncestor(node, true);
                assertValidOffset(node, offset);

                setRangeStart(this, node, offset);
            },

            setEnd: function(node, offset) {
                assertNotDetached(this);
                assertNoDocTypeNotationEntityAncestor(node, true);
                assertValidOffset(node, offset);

                setRangeEnd(this, node, offset);
            },

            /**
             * Convenience method to set a range's start and end boundaries. Overloaded as follows:
             * - Two parameters (node, offset) creates a collapsed range at that position
             * - Three parameters (node, startOffset, endOffset) creates a range contained with node starting at
             *   startOffset and ending at endOffset
             * - Four parameters (startNode, startOffset, endNode, endOffset) creates a range starting at startOffset in
             *   startNode and ending at endOffset in endNode
             */
            setStartAndEnd: function() {
                assertNotDetached(this);

                var args = arguments;
                var sc = args[0], so = args[1], ec = sc, eo = so;

                switch (args.length) {
                    case 3:
                        eo = args[2];
                        break;
                    case 4:
                        ec = args[2];
                        eo = args[3];
                        break;
                }

                boundaryUpdater(this, sc, so, ec, eo);
            },
            
            setBoundary: function(node, offset, isStart) {
                this["set" + (isStart ? "Start" : "End")](node, offset);
            },

            setStartBefore: createBeforeAfterNodeSetter(true, true),
            setStartAfter: createBeforeAfterNodeSetter(false, true),
            setEndBefore: createBeforeAfterNodeSetter(true, false),
            setEndAfter: createBeforeAfterNodeSetter(false, false),

            collapse: function(isStart) {
                assertRangeValid(this);
                if (isStart) {
                    boundaryUpdater(this, this.startContainer, this.startOffset, this.startContainer, this.startOffset);
                } else {
                    boundaryUpdater(this, this.endContainer, this.endOffset, this.endContainer, this.endOffset);
                }
            },

            selectNodeContents: function(node) {
                assertNotDetached(this);
                assertNoDocTypeNotationEntityAncestor(node, true);

                boundaryUpdater(this, node, 0, node, getNodeLength(node));
            },

            selectNode: function(node) {
                assertNotDetached(this);
                assertNoDocTypeNotationEntityAncestor(node, false);
                assertValidNodeType(node, beforeAfterNodeTypes);

                var start = getBoundaryBeforeNode(node), end = getBoundaryAfterNode(node);
                boundaryUpdater(this, start.node, start.offset, end.node, end.offset);
            },

            extractContents: createRangeContentRemover(extractSubtree, boundaryUpdater),

            deleteContents: createRangeContentRemover(deleteSubtree, boundaryUpdater),

            canSurroundContents: function() {
                assertRangeValid(this);
                assertNodeNotReadOnly(this.startContainer);
                assertNodeNotReadOnly(this.endContainer);

                // Check if the contents can be surrounded. Specifically, this means whether the range partially selects
                // no non-text nodes.
                var iterator = new RangeIterator(this, true);
                var boundariesInvalid = (iterator._first && (isNonTextPartiallySelected(iterator._first, this)) ||
                        (iterator._last && isNonTextPartiallySelected(iterator._last, this)));
                iterator.detach();
                return !boundariesInvalid;
            },

            detach: function() {
                detacher(this);
            },

            splitBoundaries: function() {
                splitRangeBoundaries(this);
            },

            splitBoundariesPreservingPositions: function(positionsToPreserve) {
                splitRangeBoundaries(this, positionsToPreserve);
            },

            normalizeBoundaries: function() {
                assertRangeValid(this);

                var sc = this.startContainer, so = this.startOffset, ec = this.endContainer, eo = this.endOffset;

                var mergeForward = function(node) {
                    var sibling = node.nextSibling;
                    if (sibling && sibling.nodeType == node.nodeType) {
                        ec = node;
                        eo = node.length;
                        node.appendData(sibling.data);
                        sibling.parentNode.removeChild(sibling);
                    }
                };

                var mergeBackward = function(node) {
                    var sibling = node.previousSibling;
                    if (sibling && sibling.nodeType == node.nodeType) {
                        sc = node;
                        var nodeLength = node.length;
                        so = sibling.length;
                        node.insertData(0, sibling.data);
                        sibling.parentNode.removeChild(sibling);
                        if (sc == ec) {
                            eo += so;
                            ec = sc;
                        } else if (ec == node.parentNode) {
                            var nodeIndex = getNodeIndex(node);
                            if (eo == nodeIndex) {
                                ec = node;
                                eo = nodeLength;
                            } else if (eo > nodeIndex) {
                                eo--;
                            }
                        }
                    }
                };

                var normalizeStart = true;

                if (isCharacterDataNode(ec)) {
                    if (ec.length == eo) {
                        mergeForward(ec);
                    }
                } else {
                    if (eo > 0) {
                        var endNode = ec.childNodes[eo - 1];
                        if (endNode && isCharacterDataNode(endNode)) {
                            mergeForward(endNode);
                        }
                    }
                    normalizeStart = !this.collapsed;
                }

                if (normalizeStart) {
                    if (isCharacterDataNode(sc)) {
                        if (so == 0) {
                            mergeBackward(sc);
                        }
                    } else {
                        if (so < sc.childNodes.length) {
                            var startNode = sc.childNodes[so];
                            if (startNode && isCharacterDataNode(startNode)) {
                                mergeBackward(startNode);
                            }
                        }
                    }
                } else {
                    sc = ec;
                    so = eo;
                }

                boundaryUpdater(this, sc, so, ec, eo);
            },

            collapseToPoint: function(node, offset) {
                assertNotDetached(this);
                assertNoDocTypeNotationEntityAncestor(node, true);
                assertValidOffset(node, offset);
                this.setStartAndEnd(node, offset);
            }
        });

        copyComparisonConstants(constructor);
    }

    /*----------------------------------------------------------------------------------------------------------------*/

    // Updates commonAncestorContainer and collapsed after boundary change
    function updateCollapsedAndCommonAncestor(range) {
        range.collapsed = (range.startContainer === range.endContainer && range.startOffset === range.endOffset);
        range.commonAncestorContainer = range.collapsed ?
            range.startContainer : dom.getCommonAncestor(range.startContainer, range.endContainer);
    }

    function updateBoundaries(range, startContainer, startOffset, endContainer, endOffset) {
        range.startContainer = startContainer;
        range.startOffset = startOffset;
        range.endContainer = endContainer;
        range.endOffset = endOffset;
        range.document = dom.getDocument(startContainer);

        updateCollapsedAndCommonAncestor(range);
    }

    function detach(range) {
        assertNotDetached(range);
        range.startContainer = range.startOffset = range.endContainer = range.endOffset = range.document = null;
        range.collapsed = range.commonAncestorContainer = null;
    }

    function Range(doc) {
        this.startContainer = doc;
        this.startOffset = 0;
        this.endContainer = doc;
        this.endOffset = 0;
        this.document = doc;
        updateCollapsedAndCommonAncestor(this);
    }

    createPrototypeRange(Range, updateBoundaries, detach);

    util.extend(Range, {
        rangeProperties: rangeProperties,
        RangeIterator: RangeIterator,
        copyComparisonConstants: copyComparisonConstants,
        createPrototypeRange: createPrototypeRange,
        inspect: inspect,
        getRangeDocument: getRangeDocument,
        rangesEqual: function(r1, r2) {
            return r1.startContainer === r2.startContainer &&
                r1.startOffset === r2.startOffset &&
                r1.endContainer === r2.endContainer &&
                r1.endOffset === r2.endOffset;
        }
    });

    api.DomRange = Range;
    api.RangeException = RangeException;
});
rangy.createCoreModule("WrappedRange", ["DomRange"], function(api, module) {
    var WrappedRange, WrappedTextRange;
    var dom = api.dom;
    var util = api.util;
    var DomPosition = dom.DomPosition;
    var DomRange = api.DomRange;
    var getBody = dom.getBody;
    var getContentDocument = dom.getContentDocument;
    var isCharacterDataNode = dom.isCharacterDataNode;


    /*----------------------------------------------------------------------------------------------------------------*/

    if (api.features.implementsDomRange) {
        // This is a wrapper around the browser's native DOM Range. It has two aims:
        // - Provide workarounds for specific browser bugs
        // - provide convenient extensions, which are inherited from Rangy's DomRange

        (function() {
            var rangeProto;
            var rangeProperties = DomRange.rangeProperties;

            function updateRangeProperties(range) {
                var i = rangeProperties.length, prop;
                while (i--) {
                    prop = rangeProperties[i];
                    range[prop] = range.nativeRange[prop];
                }
                // Fix for broken collapsed property in IE 9.
                range.collapsed = (range.startContainer === range.endContainer && range.startOffset === range.endOffset);
            }

            function updateNativeRange(range, startContainer, startOffset, endContainer, endOffset) {
                var startMoved = (range.startContainer !== startContainer || range.startOffset != startOffset);
                var endMoved = (range.endContainer !== endContainer || range.endOffset != endOffset);
                var nativeRangeDifferent = !range.equals(range.nativeRange);

                // Always set both boundaries for the benefit of IE9 (see issue 35)
                if (startMoved || endMoved || nativeRangeDifferent) {
                    range.setEnd(endContainer, endOffset);
                    range.setStart(startContainer, startOffset);
                }
            }

            function detach(range) {
                range.nativeRange.detach();
                range.detached = true;
                var i = rangeProperties.length;
                while (i--) {
                    range[ rangeProperties[i] ] = null;
                }
            }

            var createBeforeAfterNodeSetter;

            WrappedRange = function(range) {
                if (!range) {
                    throw module.createError("WrappedRange: Range must be specified");
                }
                this.nativeRange = range;
                updateRangeProperties(this);
            };

            DomRange.createPrototypeRange(WrappedRange, updateNativeRange, detach);

            rangeProto = WrappedRange.prototype;

            rangeProto.selectNode = function(node) {
                this.nativeRange.selectNode(node);
                updateRangeProperties(this);
            };

            rangeProto.cloneContents = function() {
                return this.nativeRange.cloneContents();
            };

            // Due to a long-standing Firefox bug that I have not been able to find a reliable way to detect,
            // insertNode() is never delegated to the native range.

            rangeProto.surroundContents = function(node) {
                this.nativeRange.surroundContents(node);
                updateRangeProperties(this);
            };

            rangeProto.collapse = function(isStart) {
                this.nativeRange.collapse(isStart);
                updateRangeProperties(this);
            };

            rangeProto.cloneRange = function() {
                return new WrappedRange(this.nativeRange.cloneRange());
            };

            rangeProto.refresh = function() {
                updateRangeProperties(this);
            };

            rangeProto.toString = function() {
                return this.nativeRange.toString();
            };

            // Create test range and node for feature detection

            var testTextNode = document.createTextNode("test");
            getBody(document).appendChild(testTextNode);
            var range = document.createRange();

            /*--------------------------------------------------------------------------------------------------------*/

            // Test for Firefox 2 bug that prevents moving the start of a Range to a point after its current end and
            // correct for it

            range.setStart(testTextNode, 0);
            range.setEnd(testTextNode, 0);

            try {
                range.setStart(testTextNode, 1);

                rangeProto.setStart = function(node, offset) {
                    this.nativeRange.setStart(node, offset);
                    updateRangeProperties(this);
                };

                rangeProto.setEnd = function(node, offset) {
                    this.nativeRange.setEnd(node, offset);
                    updateRangeProperties(this);
                };

                createBeforeAfterNodeSetter = function(name) {
                    return function(node) {
                        this.nativeRange[name](node);
                        updateRangeProperties(this);
                    };
                };

            } catch(ex) {

                rangeProto.setStart = function(node, offset) {
                    try {
                        this.nativeRange.setStart(node, offset);
                    } catch (ex) {
                        this.nativeRange.setEnd(node, offset);
                        this.nativeRange.setStart(node, offset);
                    }
                    updateRangeProperties(this);
                };

                rangeProto.setEnd = function(node, offset) {
                    try {
                        this.nativeRange.setEnd(node, offset);
                    } catch (ex) {
                        this.nativeRange.setStart(node, offset);
                        this.nativeRange.setEnd(node, offset);
                    }
                    updateRangeProperties(this);
                };

                createBeforeAfterNodeSetter = function(name, oppositeName) {
                    return function(node) {
                        try {
                            this.nativeRange[name](node);
                        } catch (ex) {
                            this.nativeRange[oppositeName](node);
                            this.nativeRange[name](node);
                        }
                        updateRangeProperties(this);
                    };
                };
            }

            rangeProto.setStartBefore = createBeforeAfterNodeSetter("setStartBefore", "setEndBefore");
            rangeProto.setStartAfter = createBeforeAfterNodeSetter("setStartAfter", "setEndAfter");
            rangeProto.setEndBefore = createBeforeAfterNodeSetter("setEndBefore", "setStartBefore");
            rangeProto.setEndAfter = createBeforeAfterNodeSetter("setEndAfter", "setStartAfter");

            /*--------------------------------------------------------------------------------------------------------*/

            // Always use DOM4-compliant selectNodeContents implementation: it's simpler and less code than testing
            // whether the native implementation can be trusted
            rangeProto.selectNodeContents = function(node) {
                this.setStartAndEnd(node, 0, dom.getNodeLength(node));
            };

            /*--------------------------------------------------------------------------------------------------------*/

            // Test for and correct WebKit bug that has the behaviour of compareBoundaryPoints round the wrong way for
            // constants START_TO_END and END_TO_START: https://bugs.webkit.org/show_bug.cgi?id=20738

            range.selectNodeContents(testTextNode);
            range.setEnd(testTextNode, 3);

            var range2 = document.createRange();
            range2.selectNodeContents(testTextNode);
            range2.setEnd(testTextNode, 4);
            range2.setStart(testTextNode, 2);

            if (range.compareBoundaryPoints(range.START_TO_END, range2) == -1 &&
                    range.compareBoundaryPoints(range.END_TO_START, range2) == 1) {
                // This is the wrong way round, so correct for it

                rangeProto.compareBoundaryPoints = function(type, range) {
                    range = range.nativeRange || range;
                    if (type == range.START_TO_END) {
                        type = range.END_TO_START;
                    } else if (type == range.END_TO_START) {
                        type = range.START_TO_END;
                    }
                    return this.nativeRange.compareBoundaryPoints(type, range);
                };
            } else {
                rangeProto.compareBoundaryPoints = function(type, range) {
                    return this.nativeRange.compareBoundaryPoints(type, range.nativeRange || range);
                };
            }

            /*--------------------------------------------------------------------------------------------------------*/

            // Test for IE 9 deleteContents() and extractContents() bug and correct it. See issue 107.

            var el = document.createElement("div");
            el.innerHTML = "123";
            var textNode = el.firstChild;
            var body = getBody(document);
            body.appendChild(el);

            range.setStart(textNode, 1);
            range.setEnd(textNode, 2);
            range.deleteContents();

            if (textNode.data == "13") {
                // Behaviour is correct per DOM4 Range so wrap the browser's implementation of deleteContents() and
                // extractContents()
                rangeProto.deleteContents = function() {
                    this.nativeRange.deleteContents();
                    updateRangeProperties(this);
                };

                rangeProto.extractContents = function() {
                    var frag = this.nativeRange.extractContents();
                    updateRangeProperties(this);
                    return frag;
                };
            } else {
            }

            body.removeChild(el);
            body = null;

            /*--------------------------------------------------------------------------------------------------------*/

            // Test for existence of createContextualFragment and delegate to it if it exists
            if (util.isHostMethod(range, "createContextualFragment")) {
                rangeProto.createContextualFragment = function(fragmentStr) {
                    return this.nativeRange.createContextualFragment(fragmentStr);
                };
            }

            /*--------------------------------------------------------------------------------------------------------*/

            // Clean up
            getBody(document).removeChild(testTextNode);
            range.detach();
            range2.detach();

            rangeProto.getName = function() {
                return "WrappedRange";
            };

            api.WrappedRange = WrappedRange;

            api.createNativeRange = function(doc) {
                doc = getContentDocument(doc, module, "createNativeRange");
                return doc.createRange();
            };
        })();
    }
    
    if (api.features.implementsTextRange) {
        /*
        This is a workaround for a bug where IE returns the wrong container element from the TextRange's parentElement()
        method. For example, in the following (where pipes denote the selection boundaries):

        <ul id="ul"><li id="a">| a </li><li id="b"> b |</li></ul>

        var range = document.selection.createRange();
        alert(range.parentElement().id); // Should alert "ul" but alerts "b"

        This method returns the common ancestor node of the following:
        - the parentElement() of the textRange
        - the parentElement() of the textRange after calling collapse(true)
        - the parentElement() of the textRange after calling collapse(false)
        */
        var getTextRangeContainerElement = function(textRange) {
            var parentEl = textRange.parentElement();
            var range = textRange.duplicate();
            range.collapse(true);
            var startEl = range.parentElement();
            range = textRange.duplicate();
            range.collapse(false);
            var endEl = range.parentElement();
            var startEndContainer = (startEl == endEl) ? startEl : dom.getCommonAncestor(startEl, endEl);

            return startEndContainer == parentEl ? startEndContainer : dom.getCommonAncestor(parentEl, startEndContainer);
        };

        var textRangeIsCollapsed = function(textRange) {
            return textRange.compareEndPoints("StartToEnd", textRange) == 0;
        };

        // Gets the boundary of a TextRange expressed as a node and an offset within that node. This function started out as
        // an improved version of code found in Tim Cameron Ryan's IERange (http://code.google.com/p/ierange/) but has
        // grown, fixing problems with line breaks in preformatted text, adding workaround for IE TextRange bugs, handling
        // for inputs and images, plus optimizations.
        var getTextRangeBoundaryPosition = function(textRange, wholeRangeContainerElement, isStart, isCollapsed, startInfo) {
            var workingRange = textRange.duplicate();
            workingRange.collapse(isStart);
            var containerElement = workingRange.parentElement();

            // Sometimes collapsing a TextRange that's at the start of a text node can move it into the previous node, so
            // check for that
            if (!dom.isOrIsAncestorOf(wholeRangeContainerElement, containerElement)) {
                containerElement = wholeRangeContainerElement;
            }


            // Deal with nodes that cannot "contain rich HTML markup". In practice, this means form inputs, images and
            // similar. See http://msdn.microsoft.com/en-us/library/aa703950%28VS.85%29.aspx
            if (!containerElement.canHaveHTML) {
                var pos = new DomPosition(containerElement.parentNode, dom.getNodeIndex(containerElement));
                return {
                    boundaryPosition: pos,
                    nodeInfo: {
                        nodeIndex: pos.offset,
                        containerElement: pos.node
                    }
                };
            }

            var workingNode = dom.getDocument(containerElement).createElement("span");

            // Workaround for HTML5 Shiv's insane violation of document.createElement(). See Rangy issue 104 and HTML5
            // Shiv issue 64: https://github.com/aFarkas/html5shiv/issues/64
            if (workingNode.parentNode) {
                workingNode.parentNode.removeChild(workingNode);
            }

            var comparison, workingComparisonType = isStart ? "StartToStart" : "StartToEnd";
            var previousNode, nextNode, boundaryPosition, boundaryNode;
            var start = (startInfo && startInfo.containerElement == containerElement) ? startInfo.nodeIndex : 0;
            var childNodeCount = containerElement.childNodes.length;
            var end = childNodeCount;

            // Check end first. Code within the loop assumes that the endth child node of the container is definitely
            // after the range boundary.
            var nodeIndex = end;

            while (true) {
                if (nodeIndex == childNodeCount) {
                    containerElement.appendChild(workingNode);
                } else {
                    containerElement.insertBefore(workingNode, containerElement.childNodes[nodeIndex]);
                }
                workingRange.moveToElementText(workingNode);
                comparison = workingRange.compareEndPoints(workingComparisonType, textRange);
                if (comparison == 0 || start == end) {
                    break;
                } else if (comparison == -1) {
                    if (end == start + 1) {
                        // We know the endth child node is after the range boundary, so we must be done.
                        break;
                    } else {
                        start = nodeIndex;
                    }
                } else {
                    end = (end == start + 1) ? start : nodeIndex;
                }
                nodeIndex = Math.floor((start + end) / 2);
                containerElement.removeChild(workingNode);
            }


            // We've now reached or gone past the boundary of the text range we're interested in
            // so have identified the node we want
            boundaryNode = workingNode.nextSibling;

            if (comparison == -1 && boundaryNode && isCharacterDataNode(boundaryNode)) {
                // This is a character data node (text, comment, cdata). The working range is collapsed at the start of the
                // node containing the text range's boundary, so we move the end of the working range to the boundary point
                // and measure the length of its text to get the boundary's offset within the node.
                workingRange.setEndPoint(isStart ? "EndToStart" : "EndToEnd", textRange);

                var offset;

                if (/[\r\n]/.test(boundaryNode.data)) {
                    /*
                    For the particular case of a boundary within a text node containing rendered line breaks (within a <pre>
                    element, for example), we need a slightly complicated approach to get the boundary's offset in IE. The
                    facts:
                    
                    - Each line break is represented as \r in the text node's data/nodeValue properties
                    - Each line break is represented as \r\n in the TextRange's 'text' property
                    - The 'text' property of the TextRange does not contain trailing line breaks
                    
                    To get round the problem presented by the final fact above, we can use the fact that TextRange's
                    moveStart() and moveEnd() methods return the actual number of characters moved, which is not necessarily
                    the same as the number of characters it was instructed to move. The simplest approach is to use this to
                    store the characters moved when moving both the start and end of the range to the start of the document
                    body and subtracting the start offset from the end offset (the "move-negative-gazillion" method).
                    However, this is extremely slow when the document is large and the range is near the end of it. Clearly
                    doing the mirror image (i.e. moving the range boundaries to the end of the document) has the same
                    problem.
                    
                    Another approach that works is to use moveStart() to move the start boundary of the range up to the end
                    boundary one character at a time and incrementing a counter with the value returned by the moveStart()
                    call. However, the check for whether the start boundary has reached the end boundary is expensive, so
                    this method is slow (although unlike "move-negative-gazillion" is largely unaffected by the location of
                    the range within the document).
                    
                    The method below is a hybrid of the two methods above. It uses the fact that a string containing the
                    TextRange's 'text' property with each \r\n converted to a single \r character cannot be longer than the
                    text of the TextRange, so the start of the range is moved that length initially and then a character at
                    a time to make up for any trailing line breaks not contained in the 'text' property. This has good
                    performance in most situations compared to the previous two methods.
                    */
                    var tempRange = workingRange.duplicate();
                    var rangeLength = tempRange.text.replace(/\r\n/g, "\r").length;

                    offset = tempRange.moveStart("character", rangeLength);
                    while ( (comparison = tempRange.compareEndPoints("StartToEnd", tempRange)) == -1) {
                        offset++;
                        tempRange.moveStart("character", 1);
                    }
                } else {
                    offset = workingRange.text.length;
                }
                boundaryPosition = new DomPosition(boundaryNode, offset);
            } else {

                // If the boundary immediately follows a character data node and this is the end boundary, we should favour
                // a position within that, and likewise for a start boundary preceding a character data node
                previousNode = (isCollapsed || !isStart) && workingNode.previousSibling;
                nextNode = (isCollapsed || isStart) && workingNode.nextSibling;
                if (nextNode && isCharacterDataNode(nextNode)) {
                    boundaryPosition = new DomPosition(nextNode, 0);
                } else if (previousNode && isCharacterDataNode(previousNode)) {
                    boundaryPosition = new DomPosition(previousNode, previousNode.data.length);
                } else {
                    boundaryPosition = new DomPosition(containerElement, dom.getNodeIndex(workingNode));
                }
            }

            // Clean up
            workingNode.parentNode.removeChild(workingNode);

            return {
                boundaryPosition: boundaryPosition,
                nodeInfo: {
                    nodeIndex: nodeIndex,
                    containerElement: containerElement
                }
            };
        };

        // Returns a TextRange representing the boundary of a TextRange expressed as a node and an offset within that node.
        // This function started out as an optimized version of code found in Tim Cameron Ryan's IERange
        // (http://code.google.com/p/ierange/)
        var createBoundaryTextRange = function(boundaryPosition, isStart) {
            var boundaryNode, boundaryParent, boundaryOffset = boundaryPosition.offset;
            var doc = dom.getDocument(boundaryPosition.node);
            var workingNode, childNodes, workingRange = getBody(doc).createTextRange();
            var nodeIsDataNode = isCharacterDataNode(boundaryPosition.node);

            if (nodeIsDataNode) {
                boundaryNode = boundaryPosition.node;
                boundaryParent = boundaryNode.parentNode;
            } else {
                childNodes = boundaryPosition.node.childNodes;
                boundaryNode = (boundaryOffset < childNodes.length) ? childNodes[boundaryOffset] : null;
                boundaryParent = boundaryPosition.node;
            }

            // Position the range immediately before the node containing the boundary
            workingNode = doc.createElement("span");

            // Making the working element non-empty element persuades IE to consider the TextRange boundary to be within the
            // element rather than immediately before or after it
            workingNode.innerHTML = "&#feff;";

            // insertBefore is supposed to work like appendChild if the second parameter is null. However, a bug report
            // for IERange suggests that it can crash the browser: http://code.google.com/p/ierange/issues/detail?id=12
            if (boundaryNode) {
                boundaryParent.insertBefore(workingNode, boundaryNode);
            } else {
                boundaryParent.appendChild(workingNode);
            }

            workingRange.moveToElementText(workingNode);
            workingRange.collapse(!isStart);

            // Clean up
            boundaryParent.removeChild(workingNode);

            // Move the working range to the text offset, if required
            if (nodeIsDataNode) {
                workingRange[isStart ? "moveStart" : "moveEnd"]("character", boundaryOffset);
            }

            return workingRange;
        };

        /*------------------------------------------------------------------------------------------------------------*/

        // This is a wrapper around a TextRange, providing full DOM Range functionality using rangy's DomRange as a
        // prototype

        WrappedTextRange = function(textRange) {
            this.textRange = textRange;
            this.refresh();
        };

        WrappedTextRange.prototype = new DomRange(document);

        WrappedTextRange.prototype.refresh = function() {
            var start, end, startBoundary;

            // TextRange's parentElement() method cannot be trusted. getTextRangeContainerElement() works around that.
            var rangeContainerElement = getTextRangeContainerElement(this.textRange);

            if (textRangeIsCollapsed(this.textRange)) {
                end = start = getTextRangeBoundaryPosition(this.textRange, rangeContainerElement, true,
                    true).boundaryPosition;
            } else {
                startBoundary = getTextRangeBoundaryPosition(this.textRange, rangeContainerElement, true, false);
                start = startBoundary.boundaryPosition;

                // An optimization used here is that if the start and end boundaries have the same parent element, the
                // search scope for the end boundary can be limited to exclude the portion of the element that precedes
                // the start boundary
                end = getTextRangeBoundaryPosition(this.textRange, rangeContainerElement, false, false,
                    startBoundary.nodeInfo).boundaryPosition;
            }

            this.setStart(start.node, start.offset);
            this.setEnd(end.node, end.offset);
        };

        WrappedTextRange.prototype.getName = function() {
            return "WrappedTextRange";
        };

        DomRange.copyComparisonConstants(WrappedTextRange);

        WrappedTextRange.rangeToTextRange = function(range) {
            if (range.collapsed) {
                return createBoundaryTextRange(new DomPosition(range.startContainer, range.startOffset), true);
            } else {
                var startRange = createBoundaryTextRange(new DomPosition(range.startContainer, range.startOffset), true);
                var endRange = createBoundaryTextRange(new DomPosition(range.endContainer, range.endOffset), false);
                var textRange = getBody( DomRange.getRangeDocument(range) ).createTextRange();
                textRange.setEndPoint("StartToStart", startRange);
                textRange.setEndPoint("EndToEnd", endRange);
                return textRange;
            }
        };

        api.WrappedTextRange = WrappedTextRange;

        // IE 9 and above have both implementations and Rangy makes both available. The next few lines sets which
        // implementation to use by default.
        if (!api.features.implementsDomRange || api.config.preferTextRange) {
            // Add WrappedTextRange as the Range property of the global object to allow expression like Range.END_TO_END to work
            var globalObj = (function() { return this; })();
            if (typeof globalObj.Range == "undefined") {
                globalObj.Range = WrappedTextRange;
            }

            api.createNativeRange = function(doc) {
                doc = getContentDocument(doc, module, "createNativeRange");
                return getBody(doc).createTextRange();
            };

            api.WrappedRange = WrappedTextRange;
        }
    }

    api.createRange = function(doc) {
        doc = getContentDocument(doc, module, "createRange");
        return new api.WrappedRange(api.createNativeRange(doc));
    };

    api.createRangyRange = function(doc) {
        doc = getContentDocument(doc, module, "createRangyRange");
        return new DomRange(doc);
    };

    api.createIframeRange = function(iframeEl) {
        module.deprecationNotice("createIframeRange()", "createRange(iframeEl)");
        return api.createRange(iframeEl);
    };

    api.createIframeRangyRange = function(iframeEl) {
        module.deprecationNotice("createIframeRangyRange()", "createRangyRange(iframeEl)");
        return api.createRangyRange(iframeEl);
    };

    api.addCreateMissingNativeApiListener(function(win) {
        var doc = win.document;
        if (typeof doc.createRange == "undefined") {
            doc.createRange = function() {
                return api.createRange(doc);
            };
        }
        doc = win = null;
    });
});
// This module creates a selection object wrapper that conforms as closely as possible to the Selection specification
// in the HTML Editing spec (http://dvcs.w3.org/hg/editing/raw-file/tip/editing.html#selections)
rangy.createCoreModule("WrappedSelection", ["DomRange", "WrappedRange"], function(api, module) {
    api.config.checkSelectionRanges = true;

    var BOOLEAN = "boolean";
    var NUMBER = "number";
    var dom = api.dom;
    var util = api.util;
    var isHostMethod = util.isHostMethod;
    var DomRange = api.DomRange;
    var WrappedRange = api.WrappedRange;
    var DOMException = api.DOMException;
    var DomPosition = dom.DomPosition;
    var getNativeSelection;
    var selectionIsCollapsed;
    var features = api.features;
    var CONTROL = "Control";
    var getDocument = dom.getDocument;
    var getBody = dom.getBody;
    var rangesEqual = DomRange.rangesEqual;


    // Utility function to support direction parameters in the API that may be a string ("backward" or "forward") or a
    // Boolean (true for backwards).
    function isDirectionBackward(dir) {
        return (typeof dir == "string") ? /^backward(s)?$/i.test(dir) : !!dir;
    }

    function getWindow(win, methodName) {
        if (!win) {
            return window;
        } else if (dom.isWindow(win)) {
            return win;
        } else if (win instanceof WrappedSelection) {
            return win.win;
        } else {
            var doc = dom.getContentDocument(win, module, methodName);
            return dom.getWindow(doc);
        }
    }

    function getWinSelection(winParam) {
        return getWindow(winParam, "getWinSelection").getSelection();
    }

    function getDocSelection(winParam) {
        return getWindow(winParam, "getDocSelection").document.selection;
    }
    
    function winSelectionIsBackward(sel) {
        var backward = false;
        if (sel.anchorNode) {
            backward = (dom.comparePoints(sel.anchorNode, sel.anchorOffset, sel.focusNode, sel.focusOffset) == 1);
        }
        return backward;
    }

    // Test for the Range/TextRange and Selection features required
    // Test for ability to retrieve selection
    var implementsWinGetSelection = isHostMethod(window, "getSelection"),
        implementsDocSelection = util.isHostObject(document, "selection");

    features.implementsWinGetSelection = implementsWinGetSelection;
    features.implementsDocSelection = implementsDocSelection;

    var useDocumentSelection = implementsDocSelection && (!implementsWinGetSelection || api.config.preferTextRange);

    if (useDocumentSelection) {
        getNativeSelection = getDocSelection;
        api.isSelectionValid = function(winParam) {
            var doc = getWindow(winParam, "isSelectionValid").document, nativeSel = doc.selection;

            // Check whether the selection TextRange is actually contained within the correct document
            return (nativeSel.type != "None" || getDocument(nativeSel.createRange().parentElement()) == doc);
        };
    } else if (implementsWinGetSelection) {
        getNativeSelection = getWinSelection;
        api.isSelectionValid = function() {
            return true;
        };
    } else {
        module.fail("Neither document.selection or window.getSelection() detected.");
    }

    api.getNativeSelection = getNativeSelection;

    var testSelection = getNativeSelection();
    var testRange = api.createNativeRange(document);
    var body = getBody(document);

    // Obtaining a range from a selection
    var selectionHasAnchorAndFocus = util.areHostProperties(testSelection,
        ["anchorNode", "focusNode", "anchorOffset", "focusOffset"]);

    features.selectionHasAnchorAndFocus = selectionHasAnchorAndFocus;

    // Test for existence of native selection extend() method
    var selectionHasExtend = isHostMethod(testSelection, "extend");
    features.selectionHasExtend = selectionHasExtend;
    
    // Test if rangeCount exists
    var selectionHasRangeCount = (typeof testSelection.rangeCount == NUMBER);
    features.selectionHasRangeCount = selectionHasRangeCount;

    var selectionSupportsMultipleRanges = false;
    var collapsedNonEditableSelectionsSupported = true;

    var addRangeBackwardToNative = selectionHasExtend ?
        function(nativeSelection, range) {
            var doc = DomRange.getRangeDocument(range);
            var endRange = api.createRange(doc);
            endRange.collapseToPoint(range.endContainer, range.endOffset);
            nativeSelection.addRange(getNativeRange(endRange));
            nativeSelection.extend(range.startContainer, range.startOffset);
        } : null;

    if (util.areHostMethods(testSelection, ["addRange", "getRangeAt", "removeAllRanges"]) &&
            typeof testSelection.rangeCount == NUMBER && features.implementsDomRange) {

        (function() {
            // Previously an iframe was used but this caused problems in some circumstances in IE, so tests are
            // performed on the current document's selection. See issue 109.

            // Note also that if a selection previously existed, it is wiped by these tests. This should usually be fine
            // because initialization usually happens when the document loads, but could be a problem for a script that
            // loads and initializes Rangy later. If anyone complains, code could be added to save and restore the
            // selection.
            var sel = window.getSelection();
            if (sel) {
                // Store the current selection
                var originalSelectionRangeCount = sel.rangeCount;
                var selectionHasMultipleRanges = (originalSelectionRangeCount > 1);
                var originalSelectionRanges = [];
                var originalSelectionBackward = winSelectionIsBackward(sel); 
                for (var i = 0; i < originalSelectionRangeCount; ++i) {
                    originalSelectionRanges[i] = sel.getRangeAt(i);
                }
                
                // Create some test elements
                var body = getBody(document);
                var testEl = body.appendChild( document.createElement("div") );
                testEl.contentEditable = "false";
                var textNode = testEl.appendChild( document.createTextNode("\u00a0\u00a0\u00a0") );

                // Test whether the native selection will allow a collapsed selection within a non-editable element
                var r1 = document.createRange();

                r1.setStart(textNode, 1);
                r1.collapse(true);
                sel.addRange(r1);
                collapsedNonEditableSelectionsSupported = (sel.rangeCount == 1);
                sel.removeAllRanges();

                // Test whether the native selection is capable of supporting multiple ranges
                if (!selectionHasMultipleRanges) {
                    var r2 = r1.cloneRange();
                    r1.setStart(textNode, 0);
                    r2.setEnd(textNode, 3);
                    r2.setStart(textNode, 2);
                    sel.addRange(r1);
                    sel.addRange(r2);

                    selectionSupportsMultipleRanges = (sel.rangeCount == 2);
                    r2.detach();
                }

                // Clean up
                body.removeChild(testEl);
                sel.removeAllRanges();
                r1.detach();

                for (i = 0; i < originalSelectionRangeCount; ++i) {
                    if (i == 0 && originalSelectionBackward) {
                        if (addRangeBackwardToNative) {
                            addRangeBackwardToNative(sel, originalSelectionRanges[i]);
                        } else {
                            api.warn("Rangy initialization: original selection was backwards but selection has been restored forwards because browser does not support Selection.extend");
                            sel.addRange(originalSelectionRanges[i])
                        }
                    } else {
                        sel.addRange(originalSelectionRanges[i])
                    }
                }
            }
        })();
    }

    features.selectionSupportsMultipleRanges = selectionSupportsMultipleRanges;
    features.collapsedNonEditableSelectionsSupported = collapsedNonEditableSelectionsSupported;

    // ControlRanges
    var implementsControlRange = false, testControlRange;

    if (body && isHostMethod(body, "createControlRange")) {
        testControlRange = body.createControlRange();
        if (util.areHostProperties(testControlRange, ["item", "add"])) {
            implementsControlRange = true;
        }
    }
    features.implementsControlRange = implementsControlRange;

    // Selection collapsedness
    if (selectionHasAnchorAndFocus) {
        selectionIsCollapsed = function(sel) {
            return sel.anchorNode === sel.focusNode && sel.anchorOffset === sel.focusOffset;
        };
    } else {
        selectionIsCollapsed = function(sel) {
            return sel.rangeCount ? sel.getRangeAt(sel.rangeCount - 1).collapsed : false;
        };
    }

    function updateAnchorAndFocusFromRange(sel, range, backward) {
        var anchorPrefix = backward ? "end" : "start", focusPrefix = backward ? "start" : "end";
        sel.anchorNode = range[anchorPrefix + "Container"];
        sel.anchorOffset = range[anchorPrefix + "Offset"];
        sel.focusNode = range[focusPrefix + "Container"];
        sel.focusOffset = range[focusPrefix + "Offset"];
    }

    function updateAnchorAndFocusFromNativeSelection(sel) {
        var nativeSel = sel.nativeSelection;
        sel.anchorNode = nativeSel.anchorNode;
        sel.anchorOffset = nativeSel.anchorOffset;
        sel.focusNode = nativeSel.focusNode;
        sel.focusOffset = nativeSel.focusOffset;
    }

    function updateEmptySelection(sel) {
        sel.anchorNode = sel.focusNode = null;
        sel.anchorOffset = sel.focusOffset = 0;
        sel.rangeCount = 0;
        sel.isCollapsed = true;
        sel._ranges.length = 0;
    }

    function getNativeRange(range) {
        var nativeRange;
        if (range instanceof DomRange) {
            nativeRange = api.createNativeRange(range.getDocument());
            nativeRange.setEnd(range.endContainer, range.endOffset);
            nativeRange.setStart(range.startContainer, range.startOffset);
        } else if (range instanceof WrappedRange) {
            nativeRange = range.nativeRange;
        } else if (features.implementsDomRange && (range instanceof dom.getWindow(range.startContainer).Range)) {
            nativeRange = range;
        }
        return nativeRange;
    }

    function rangeContainsSingleElement(rangeNodes) {
        if (!rangeNodes.length || rangeNodes[0].nodeType != 1) {
            return false;
        }
        for (var i = 1, len = rangeNodes.length; i < len; ++i) {
            if (!dom.isAncestorOf(rangeNodes[0], rangeNodes[i])) {
                return false;
            }
        }
        return true;
    }

    function getSingleElementFromRange(range) {
        var nodes = range.getNodes();
        if (!rangeContainsSingleElement(nodes)) {
            throw module.createError("getSingleElementFromRange: range " + range.inspect() + " did not consist of a single element");
        }
        return nodes[0];
    }

    // Simple, quick test which only needs to distinguish between a TextRange and a ControlRange
    function isTextRange(range) {
        return !!range && typeof range.text != "undefined";
    }

    function updateFromTextRange(sel, range) {
        // Create a Range from the selected TextRange
        var wrappedRange = new WrappedRange(range);
        sel._ranges = [wrappedRange];

        updateAnchorAndFocusFromRange(sel, wrappedRange, false);
        sel.rangeCount = 1;
        sel.isCollapsed = wrappedRange.collapsed;
    }

    function updateControlSelection(sel) {
        // Update the wrapped selection based on what's now in the native selection
        sel._ranges.length = 0;
        if (sel.docSelection.type == "None") {
            updateEmptySelection(sel);
        } else {
            var controlRange = sel.docSelection.createRange();
            if (isTextRange(controlRange)) {
                // This case (where the selection type is "Control" and calling createRange() on the selection returns
                // a TextRange) can happen in IE 9. It happens, for example, when all elements in the selected
                // ControlRange have been removed from the ControlRange and removed from the document.
                updateFromTextRange(sel, controlRange);
            } else {
                sel.rangeCount = controlRange.length;
                var range, doc = getDocument(controlRange.item(0));
                for (var i = 0; i < sel.rangeCount; ++i) {
                    range = api.createRange(doc);
                    range.selectNode(controlRange.item(i));
                    sel._ranges.push(range);
                }
                sel.isCollapsed = sel.rangeCount == 1 && sel._ranges[0].collapsed;
                updateAnchorAndFocusFromRange(sel, sel._ranges[sel.rangeCount - 1], false);
            }
        }
    }

    function addRangeToControlSelection(sel, range) {
        var controlRange = sel.docSelection.createRange();
        var rangeElement = getSingleElementFromRange(range);

        // Create a new ControlRange containing all the elements in the selected ControlRange plus the element
        // contained by the supplied range
        var doc = getDocument(controlRange.item(0));
        var newControlRange = getBody(doc).createControlRange();
        for (var i = 0, len = controlRange.length; i < len; ++i) {
            newControlRange.add(controlRange.item(i));
        }
        try {
            newControlRange.add(rangeElement);
        } catch (ex) {
            throw module.createError("addRange(): Element within the specified Range could not be added to control selection (does it have layout?)");
        }
        newControlRange.select();

        // Update the wrapped selection based on what's now in the native selection
        updateControlSelection(sel);
    }

    var getSelectionRangeAt;

    if (isHostMethod(testSelection, "getRangeAt")) {
        // try/catch is present because getRangeAt() must have thrown an error in some browser and some situation.
        // Unfortunately, I didn't write a comment about the specifics and am now scared to take it out. Let that be a
        // lesson to us all, especially me.
        getSelectionRangeAt = function(sel, index) {
            try {
                return sel.getRangeAt(index);
            } catch (ex) {
                return null;
            }
        };
    } else if (selectionHasAnchorAndFocus) {
        getSelectionRangeAt = function(sel) {
            var doc = getDocument(sel.anchorNode);
            var range = api.createRange(doc);
            range.setStartAndEnd(sel.anchorNode, sel.anchorOffset, sel.focusNode, sel.focusOffset);

            // Handle the case when the selection was selected backwards (from the end to the start in the
            // document)
            if (range.collapsed !== this.isCollapsed) {
                range.setStartAndEnd(sel.focusNode, sel.focusOffset, sel.anchorNode, sel.anchorOffset);
            }

            return range;
        };
    }

    function WrappedSelection(selection, docSelection, win) {
        this.nativeSelection = selection;
        this.docSelection = docSelection;
        this._ranges = [];
        this.win = win;
        this.refresh();
    }

    WrappedSelection.prototype = api.selectionPrototype;

    function deleteProperties(sel) {
        sel.win = sel.anchorNode = sel.focusNode = sel._ranges = null;
        sel.rangeCount = sel.anchorOffset = sel.focusOffset = 0;
        sel.detached = true;
    }

    var cachedRangySelections = [];

    function actOnCachedSelection(win, action) {
        var i = cachedRangySelections.length, cached, sel;
        while (i--) {
            cached = cachedRangySelections[i];
            sel = cached.selection;
            if (action == "deleteAll") {
                deleteProperties(sel);
            } else if (cached.win == win) {
                if (action == "delete") {
                    cachedRangySelections.splice(i, 1);
                    return true;
                } else {
                    return sel;
                }
            }
        }
        if (action == "deleteAll") {
            cachedRangySelections.length = 0;
        }
        return null;
    }

    var getSelection = function(win) {
        // Check if the parameter is a Rangy Selection object
        if (win && win instanceof WrappedSelection) {
            win.refresh();
            return win;
        }

        win = getWindow(win, "getNativeSelection");

        var sel = actOnCachedSelection(win);
        var nativeSel = getNativeSelection(win), docSel = implementsDocSelection ? getDocSelection(win) : null;
        if (sel) {
            sel.nativeSelection = nativeSel;
            sel.docSelection = docSel;
            sel.refresh();
        } else {
            sel = new WrappedSelection(nativeSel, docSel, win);
            cachedRangySelections.push( { win: win, selection: sel } );
        }
        return sel;
    };

    api.getSelection = getSelection;

    api.getIframeSelection = function(iframeEl) {
        module.deprecationNotice("getIframeSelection()", "getSelection(iframeEl)");
        return api.getSelection(dom.getIframeWindow(iframeEl));
    };

    var selProto = WrappedSelection.prototype;

    function createControlSelection(sel, ranges) {
        // Ensure that the selection becomes of type "Control"
        var doc = getDocument(ranges[0].startContainer);
        var controlRange = getBody(doc).createControlRange();
        for (var i = 0, el, len = ranges.length; i < len; ++i) {
            el = getSingleElementFromRange(ranges[i]);
            try {
                controlRange.add(el);
            } catch (ex) {
                throw module.createError("setRanges(): Element within one of the specified Ranges could not be added to control selection (does it have layout?)");
            }
        }
        controlRange.select();

        // Update the wrapped selection based on what's now in the native selection
        updateControlSelection(sel);
    }

    // Selecting a range
    if (!useDocumentSelection && selectionHasAnchorAndFocus && util.areHostMethods(testSelection, ["removeAllRanges", "addRange"])) {
        selProto.removeAllRanges = function() {
            this.nativeSelection.removeAllRanges();
            updateEmptySelection(this);
        };

        var addRangeBackward = function(sel, range) {
            addRangeBackwardToNative(sel.nativeSelection, range);
            sel.refresh();
        };

        if (selectionHasRangeCount) {
            selProto.addRange = function(range, direction) {
                if (implementsControlRange && implementsDocSelection && this.docSelection.type == CONTROL) {
                    addRangeToControlSelection(this, range);
                } else {
                    if (isDirectionBackward(direction) && selectionHasExtend) {
                        addRangeBackward(this, range);
                    } else {
                        var previousRangeCount;
                        if (selectionSupportsMultipleRanges) {
                            previousRangeCount = this.rangeCount;
                        } else {
                            this.removeAllRanges();
                            previousRangeCount = 0;
                        }
                        // Clone the native range so that changing the selected range does not affect the selection.
                        // This is contrary to the spec but is the only way to achieve consistency between browsers. See
                        // issue 80.
                        this.nativeSelection.addRange(getNativeRange(range).cloneRange());

                        // Check whether adding the range was successful
                        this.rangeCount = this.nativeSelection.rangeCount;

                        if (this.rangeCount == previousRangeCount + 1) {
                            // The range was added successfully

                            // Check whether the range that we added to the selection is reflected in the last range extracted from
                            // the selection
                            if (api.config.checkSelectionRanges) {
                                var nativeRange = getSelectionRangeAt(this.nativeSelection, this.rangeCount - 1);
                                if (nativeRange && !rangesEqual(nativeRange, range)) {
                                    // Happens in WebKit with, for example, a selection placed at the start of a text node
                                    range = new WrappedRange(nativeRange);
                                }
                            }
                            this._ranges[this.rangeCount - 1] = range;
                            updateAnchorAndFocusFromRange(this, range, selectionIsBackward(this.nativeSelection));
                            this.isCollapsed = selectionIsCollapsed(this);
                        } else {
                            // The range was not added successfully. The simplest thing is to refresh
                            this.refresh();
                        }
                    }
                }
            };
        } else {
            selProto.addRange = function(range, direction) {
                if (isDirectionBackward(direction) && selectionHasExtend) {
                    addRangeBackward(this, range);
                } else {
                    this.nativeSelection.addRange(getNativeRange(range));
                    this.refresh();
                }
            };
        }

        selProto.setRanges = function(ranges) {
            if (implementsControlRange && ranges.length > 1) {
                createControlSelection(this, ranges);
            } else {
                this.removeAllRanges();
                for (var i = 0, len = ranges.length; i < len; ++i) {
                    this.addRange(ranges[i]);
                }
            }
        };
    } else if (isHostMethod(testSelection, "empty") && isHostMethod(testRange, "select") &&
               implementsControlRange && useDocumentSelection) {

        selProto.removeAllRanges = function() {
            // Added try/catch as fix for issue #21
            try {
                this.docSelection.empty();

                // Check for empty() not working (issue #24)
                if (this.docSelection.type != "None") {
                    // Work around failure to empty a control selection by instead selecting a TextRange and then
                    // calling empty()
                    var doc;
                    if (this.anchorNode) {
                        doc = getDocument(this.anchorNode);
                    } else if (this.docSelection.type == CONTROL) {
                        var controlRange = this.docSelection.createRange();
                        if (controlRange.length) {
                            doc = getDocument( controlRange.item(0) );
                        }
                    }
                    if (doc) {
                        var textRange = getBody(doc).createTextRange();
                        textRange.select();
                        this.docSelection.empty();
                    }
                }
            } catch(ex) {}
            updateEmptySelection(this);
        };

        selProto.addRange = function(range) {
            if (this.docSelection.type == CONTROL) {
                addRangeToControlSelection(this, range);
            } else {
                api.WrappedTextRange.rangeToTextRange(range).select();
                this._ranges[0] = range;
                this.rangeCount = 1;
                this.isCollapsed = this._ranges[0].collapsed;
                updateAnchorAndFocusFromRange(this, range, false);
            }
        };

        selProto.setRanges = function(ranges) {
            this.removeAllRanges();
            var rangeCount = ranges.length;
            if (rangeCount > 1) {
                createControlSelection(this, ranges);
            } else if (rangeCount) {
                this.addRange(ranges[0]);
            }
        };
    } else {
        module.fail("No means of selecting a Range or TextRange was found");
        return false;
    }

    selProto.getRangeAt = function(index) {
        if (index < 0 || index >= this.rangeCount) {
            throw new DOMException("INDEX_SIZE_ERR");
        } else {
            // Clone the range to preserve selection-range independence. See issue 80.
            return this._ranges[index].cloneRange();
        }
    };

    var refreshSelection;

    if (useDocumentSelection) {
        refreshSelection = function(sel) {
            var range;
            if (api.isSelectionValid(sel.win)) {
                range = sel.docSelection.createRange();
            } else {
                range = getBody(sel.win.document).createTextRange();
                range.collapse(true);
            }

            if (sel.docSelection.type == CONTROL) {
                updateControlSelection(sel);
            } else if (isTextRange(range)) {
                updateFromTextRange(sel, range);
            } else {
                updateEmptySelection(sel);
            }
        };
    } else if (isHostMethod(testSelection, "getRangeAt") && typeof testSelection.rangeCount == NUMBER) {
        refreshSelection = function(sel) {
            if (implementsControlRange && implementsDocSelection && sel.docSelection.type == CONTROL) {
                updateControlSelection(sel);
            } else {
                sel._ranges.length = sel.rangeCount = sel.nativeSelection.rangeCount;
                if (sel.rangeCount) {
                    for (var i = 0, len = sel.rangeCount; i < len; ++i) {
                        sel._ranges[i] = new api.WrappedRange(sel.nativeSelection.getRangeAt(i));
                    }
                    updateAnchorAndFocusFromRange(sel, sel._ranges[sel.rangeCount - 1], selectionIsBackward(sel.nativeSelection));
                    sel.isCollapsed = selectionIsCollapsed(sel);
                } else {
                    updateEmptySelection(sel);
                }
            }
        };
    } else if (selectionHasAnchorAndFocus && typeof testSelection.isCollapsed == BOOLEAN && typeof testRange.collapsed == BOOLEAN && features.implementsDomRange) {
        refreshSelection = function(sel) {
            var range, nativeSel = sel.nativeSelection;
            if (nativeSel.anchorNode) {
                range = getSelectionRangeAt(nativeSel, 0);
                sel._ranges = [range];
                sel.rangeCount = 1;
                updateAnchorAndFocusFromNativeSelection(sel);
                sel.isCollapsed = selectionIsCollapsed(sel);
            } else {
                updateEmptySelection(sel);
            }
        };
    } else {
        module.fail("No means of obtaining a Range or TextRange from the user's selection was found");
        return false;
    }

    selProto.refresh = function(checkForChanges) {
        var oldRanges = checkForChanges ? this._ranges.slice(0) : null;
        var oldAnchorNode = this.anchorNode, oldAnchorOffset = this.anchorOffset;

        refreshSelection(this);
        if (checkForChanges) {
            // Check the range count first
            var i = oldRanges.length;
            if (i != this._ranges.length) {
                return true;
            }

            // Now check the direction. Checking the anchor position is the same is enough since we're checking all the
            // ranges after this
            if (this.anchorNode != oldAnchorNode || this.anchorOffset != oldAnchorOffset) {
                return true;
            }

            // Finally, compare each range in turn
            while (i--) {
                if (!rangesEqual(oldRanges[i], this._ranges[i])) {
                    return true;
                }
            }
            return false;
        }
    };

    // Removal of a single range
    var removeRangeManually = function(sel, range) {
        var ranges = sel.getAllRanges();
        sel.removeAllRanges();
        for (var i = 0, len = ranges.length; i < len; ++i) {
            if (!rangesEqual(range, ranges[i])) {
                sel.addRange(ranges[i]);
            }
        }
        if (!sel.rangeCount) {
            updateEmptySelection(sel);
        }
    };

    if (implementsControlRange) {
        selProto.removeRange = function(range) {
            if (this.docSelection.type == CONTROL) {
                var controlRange = this.docSelection.createRange();
                var rangeElement = getSingleElementFromRange(range);

                // Create a new ControlRange containing all the elements in the selected ControlRange minus the
                // element contained by the supplied range
                var doc = getDocument(controlRange.item(0));
                var newControlRange = getBody(doc).createControlRange();
                var el, removed = false;
                for (var i = 0, len = controlRange.length; i < len; ++i) {
                    el = controlRange.item(i);
                    if (el !== rangeElement || removed) {
                        newControlRange.add(controlRange.item(i));
                    } else {
                        removed = true;
                    }
                }
                newControlRange.select();

                // Update the wrapped selection based on what's now in the native selection
                updateControlSelection(this);
            } else {
                removeRangeManually(this, range);
            }
        };
    } else {
        selProto.removeRange = function(range) {
            removeRangeManually(this, range);
        };
    }

    // Detecting if a selection is backward
    var selectionIsBackward;
    if (!useDocumentSelection && selectionHasAnchorAndFocus && features.implementsDomRange) {
        selectionIsBackward = winSelectionIsBackward;

        selProto.isBackward = function() {
            return selectionIsBackward(this);
        };
    } else {
        selectionIsBackward = selProto.isBackward = function() {
            return false;
        };
    }

    // Create an alias for backwards compatibility. From 1.3, everything is "backward" rather than "backwards"
    selProto.isBackwards = selProto.isBackward;

    // Selection stringifier
    // This is conformant to the old HTML5 selections draft spec but differs from WebKit and Mozilla's implementation.
    // The current spec does not yet define this method.
    selProto.toString = function() {
        var rangeTexts = [];
        for (var i = 0, len = this.rangeCount; i < len; ++i) {
            rangeTexts[i] = "" + this._ranges[i];
        }
        return rangeTexts.join("");
    };

    function assertNodeInSameDocument(sel, node) {
        if (sel.win.document != getDocument(node)) {
            throw new DOMException("WRONG_DOCUMENT_ERR");
        }
    }

    // No current browser conforms fully to the spec for this method, so Rangy's own method is always used
    selProto.collapse = function(node, offset) {
        assertNodeInSameDocument(this, node);
        var range = api.createRange(node);
        range.collapseToPoint(node, offset);
        this.setSingleRange(range);
        this.isCollapsed = true;
    };

    selProto.collapseToStart = function() {
        if (this.rangeCount) {
            var range = this._ranges[0];
            this.collapse(range.startContainer, range.startOffset);
        } else {
            throw new DOMException("INVALID_STATE_ERR");
        }
    };

    selProto.collapseToEnd = function() {
        if (this.rangeCount) {
            var range = this._ranges[this.rangeCount - 1];
            this.collapse(range.endContainer, range.endOffset);
        } else {
            throw new DOMException("INVALID_STATE_ERR");
        }
    };

    // The spec is very specific on how selectAllChildren should be implemented so the native implementation is
    // never used by Rangy.
    selProto.selectAllChildren = function(node) {
        assertNodeInSameDocument(this, node);
        var range = api.createRange(node);
        range.selectNodeContents(node);
        this.setSingleRange(range);
    };

    selProto.deleteFromDocument = function() {
        // Sepcial behaviour required for IE's control selections
        if (implementsControlRange && implementsDocSelection && this.docSelection.type == CONTROL) {
            var controlRange = this.docSelection.createRange();
            var element;
            while (controlRange.length) {
                element = controlRange.item(0);
                controlRange.remove(element);
                element.parentNode.removeChild(element);
            }
            this.refresh();
        } else if (this.rangeCount) {
            var ranges = this.getAllRanges();
            if (ranges.length) {
                this.removeAllRanges();
                for (var i = 0, len = ranges.length; i < len; ++i) {
                    ranges[i].deleteContents();
                }
                // The spec says nothing about what the selection should contain after calling deleteContents on each
                // range. Firefox moves the selection to where the final selected range was, so we emulate that
                this.addRange(ranges[len - 1]);
            }
        }
    };

    // The following are non-standard extensions
    selProto.eachRange = function(func, returnValue) {
        for (var i = 0, len = this._ranges.length; i < len; ++i) {
            if ( func( this.getRangeAt(i) ) ) {
                return returnValue;
            }
        }
    };

    selProto.getAllRanges = function() {
        var ranges = [];
        this.eachRange(function(range) {
            ranges.push(range);
        });
        return ranges;
    };

    selProto.setSingleRange = function(range, direction) {
        this.removeAllRanges();
        this.addRange(range, direction);
    };

    selProto.callMethodOnEachRange = function(methodName, params) {
        var results = [];
        this.eachRange( function(range) {
            results.push( range[methodName].apply(range, params) );
        } );
        return results;
    };
    
    function createStartOrEndSetter(isStart) {
        return function(node, offset) {
            var range;
            if (this.rangeCount) {
                range = this.getRangeAt(0);
                range["set" + (isStart ? "Start" : "End")](node, offset);
            } else {
                range = api.createRange(this.win.document);
                range.setStartAndEnd(node, offset);
            }
            this.setSingleRange(range, this.isBackward());
        };
    }

    selProto.setStart = createStartOrEndSetter(true);
    selProto.setEnd = createStartOrEndSetter(false);
    
    // Add select() method to Range prototype. Any existing selection will be removed.
    api.rangePrototype.select = function(direction) {
        getSelection( this.getDocument() ).setSingleRange(this, direction);
    };

    selProto.changeEachRange = function(func) {
        var ranges = [];
        var backward = this.isBackward();

        this.eachRange(function(range) {
            func(range);
            ranges.push(range);
        });

        this.removeAllRanges();
        if (backward && ranges.length == 1) {
            this.addRange(ranges[0], "backward");
        } else {
            this.setRanges(ranges);
        }
    };

    selProto.containsNode = function(node, allowPartial) {
        return this.eachRange( function(range) {
            return range.containsNode(node, allowPartial);
        }, true );
    };

    selProto.getBookmark = function(containerNode) {
        return {
            backward: this.isBackward(),
            rangeBookmarks: this.callMethodOnEachRange("getBookmark", [containerNode])
        };
    };

    selProto.moveToBookmark = function(bookmark) {
        var selRanges = [];
        for (var i = 0, rangeBookmark, range; rangeBookmark = bookmark.rangeBookmarks[i++]; ) {
            range = api.createRange(this.win);
            range.moveToBookmark(rangeBookmark);
            selRanges.push(range);
        }
        if (bookmark.backward) {
            this.setSingleRange(selRanges[0], "backward");
        } else {
            this.setRanges(selRanges);
        }
    };

    selProto.toHtml = function() {
        return this.callMethodOnEachRange("toHtml").join("");
    };

    function inspect(sel) {
        var rangeInspects = [];
        var anchor = new DomPosition(sel.anchorNode, sel.anchorOffset);
        var focus = new DomPosition(sel.focusNode, sel.focusOffset);
        var name = (typeof sel.getName == "function") ? sel.getName() : "Selection";

        if (typeof sel.rangeCount != "undefined") {
            for (var i = 0, len = sel.rangeCount; i < len; ++i) {
                rangeInspects[i] = DomRange.inspect(sel.getRangeAt(i));
            }
        }
        return "[" + name + "(Ranges: " + rangeInspects.join(", ") +
                ")(anchor: " + anchor.inspect() + ", focus: " + focus.inspect() + "]";
    }

    selProto.getName = function() {
        return "WrappedSelection";
    };

    selProto.inspect = function() {
        return inspect(this);
    };

    selProto.detach = function() {
        actOnCachedSelection(this.win, "delete");
        deleteProperties(this);
    };

    WrappedSelection.detachAll = function() {
        actOnCachedSelection(null, "deleteAll");
    };

    WrappedSelection.inspect = inspect;
    WrappedSelection.isDirectionBackward = isDirectionBackward;

    api.Selection = WrappedSelection;

    api.selectionPrototype = selProto;

    api.addCreateMissingNativeApiListener(function(win) {
        if (typeof win.getSelection == "undefined") {
            win.getSelection = function() {
                return getSelection(win);
            };
        }
        win = null;
    });
});
;/**
 * Selection save and restore module for Rangy.
 * Saves and restores user selections using marker invisible elements in the DOM.
 *
 * Part of Rangy, a cross-browser JavaScript range and selection library
 * http://code.google.com/p/rangy/
 *
 * Depends on Rangy core.
 *
 * Copyright 2013, Tim Down
 * Licensed under the MIT license.
 * Version: 1.3alpha.804
 * Build date: 8 December 2013
 */
rangy.createModule("SaveRestore", ["WrappedRange"], function(api, module) {
    var dom = api.dom;

    var markerTextChar = "\ufeff";

    function gEBI(id, doc) {
        return (doc || document).getElementById(id);
    }

    function insertRangeBoundaryMarker(range, atStart) {
        var markerId = "selectionBoundary_" + (+new Date()) + "_" + ("" + Math.random()).slice(2);
        var markerEl;
        var doc = dom.getDocument(range.startContainer);

        // Clone the Range and collapse to the appropriate boundary point
        var boundaryRange = range.cloneRange();
        boundaryRange.collapse(atStart);

        // Create the marker element containing a single invisible character using DOM methods and insert it
        markerEl = doc.createElement("span");
        markerEl.id = markerId;
        markerEl.style.lineHeight = "0";
        markerEl.style.display = "none";
        markerEl.className = "rangySelectionBoundary";
        markerEl.appendChild(doc.createTextNode(markerTextChar));

        boundaryRange.insertNode(markerEl);
        boundaryRange.detach();
        return markerEl;
    }

    function setRangeBoundary(doc, range, markerId, atStart) {
        var markerEl = gEBI(markerId, doc);
        if (markerEl) {
            range[atStart ? "setStartBefore" : "setEndBefore"](markerEl);
            markerEl.parentNode.removeChild(markerEl);
        } else {
            module.warn("Marker element has been removed. Cannot restore selection.");
        }
    }

    function compareRanges(r1, r2) {
        return r2.compareBoundaryPoints(r1.START_TO_START, r1);
    }

    function saveRange(range, backward) {
        var startEl, endEl, doc = api.DomRange.getRangeDocument(range), text = range.toString();

        if (range.collapsed) {
            endEl = insertRangeBoundaryMarker(range, false);
            return {
                document: doc,
                markerId: endEl.id,
                collapsed: true
            };
        } else {
            endEl = insertRangeBoundaryMarker(range, false);
            startEl = insertRangeBoundaryMarker(range, true);

            return {
                document: doc,
                startMarkerId: startEl.id,
                endMarkerId: endEl.id,
                collapsed: false,
                backward: backward,
                toString: function() {
                    return "original text: '" + text + "', new text: '" + range.toString() + "'";
                }
            };
        }
    }

    function restoreRange(rangeInfo, normalize) {
        var doc = rangeInfo.document;
        if (typeof normalize == "undefined") {
            normalize = true;
        }
        var range = api.createRange(doc);
        if (rangeInfo.collapsed) {
            var markerEl = gEBI(rangeInfo.markerId, doc);
            if (markerEl) {
                markerEl.style.display = "inline";
                var previousNode = markerEl.previousSibling;

                // Workaround for issue 17
                if (previousNode && previousNode.nodeType == 3) {
                    markerEl.parentNode.removeChild(markerEl);
                    range.collapseToPoint(previousNode, previousNode.length);
                } else {
                    range.collapseBefore(markerEl);
                    markerEl.parentNode.removeChild(markerEl);
                }
            } else {
                module.warn("Marker element has been removed. Cannot restore selection.");
            }
        } else {
            setRangeBoundary(doc, range, rangeInfo.startMarkerId, true);
            setRangeBoundary(doc, range, rangeInfo.endMarkerId, false);
        }

        if (normalize) {
            range.normalizeBoundaries();
        }

        return range;
    }

    function saveRanges(ranges, backward) {
        var rangeInfos = [], range, doc;

        // Order the ranges by position within the DOM, latest first, cloning the array to leave the original untouched
        ranges = ranges.slice(0);
        ranges.sort(compareRanges);

        for (var i = 0, len = ranges.length; i < len; ++i) {
            rangeInfos[i] = saveRange(ranges[i], backward);
        }

        // Now that all the markers are in place and DOM manipulation over, adjust each range's boundaries to lie
        // between its markers
        for (i = len - 1; i >= 0; --i) {
            range = ranges[i];
            doc = api.DomRange.getRangeDocument(range);
            if (range.collapsed) {
                range.collapseAfter(gEBI(rangeInfos[i].markerId, doc));
            } else {
                range.setEndBefore(gEBI(rangeInfos[i].endMarkerId, doc));
                range.setStartAfter(gEBI(rangeInfos[i].startMarkerId, doc));
            }
        }

        return rangeInfos;
    }

    function saveSelection(win) {
        if (!api.isSelectionValid(win)) {
            module.warn("Cannot save selection. This usually happens when the selection is collapsed and the selection document has lost focus.");
            return null;
        }
        var sel = api.getSelection(win);
        var ranges = sel.getAllRanges();
        var backward = (ranges.length == 1 && sel.isBackward());

        var rangeInfos = saveRanges(ranges, backward);

        // Ensure current selection is unaffected
        if (backward) {
            sel.setSingleRange(ranges[0], "backward");
        } else {
            sel.setRanges(ranges);
        }

        return {
            win: win,
            rangeInfos: rangeInfos,
            restored: false
        };
    }

    function restoreRanges(rangeInfos) {
        var ranges = [];

        // Ranges are in reverse order of appearance in the DOM. We want to restore earliest first to avoid
        // normalization affecting previously restored ranges.
        var rangeCount = rangeInfos.length;

        for (var i = rangeCount - 1; i >= 0; i--) {
            ranges[i] = restoreRange(rangeInfos[i], true);
        }

        return ranges;
    }

    function restoreSelection(savedSelection, preserveDirection) {
        if (!savedSelection.restored) {
            var rangeInfos = savedSelection.rangeInfos;
            var sel = api.getSelection(savedSelection.win);
            var ranges = restoreRanges(rangeInfos), rangeCount = rangeInfos.length;

            if (rangeCount == 1 && preserveDirection && api.features.selectionHasExtend && rangeInfos[0].backward) {
                sel.removeAllRanges();
                sel.addRange(ranges[0], true);
            } else {
                sel.setRanges(ranges);
            }

            savedSelection.restored = true;
        }
    }

    function removeMarkerElement(doc, markerId) {
        var markerEl = gEBI(markerId, doc);
        if (markerEl) {
            markerEl.parentNode.removeChild(markerEl);
        }
    }

    function removeMarkers(savedSelection) {
        var rangeInfos = savedSelection.rangeInfos;
        for (var i = 0, len = rangeInfos.length, rangeInfo; i < len; ++i) {
            rangeInfo = rangeInfos[i];
            if (rangeInfo.collapsed) {
                removeMarkerElement(savedSelection.doc, rangeInfo.markerId);
            } else {
                removeMarkerElement(savedSelection.doc, rangeInfo.startMarkerId);
                removeMarkerElement(savedSelection.doc, rangeInfo.endMarkerId);
            }
        }
    }

    api.util.extend(api, {
        saveRange: saveRange,
        restoreRange: restoreRange,
        saveRanges: saveRanges,
        restoreRanges: restoreRanges,
        saveSelection: saveSelection,
        restoreSelection: restoreSelection,
        removeMarkerElement: removeMarkerElement,
        removeMarkers: removeMarkers
    });
});
;/*
	Base.js, version 1.1a
	Copyright 2006-2010, Dean Edwards
	License: http://www.opensource.org/licenses/mit-license.php
*/

var Base = function() {
	// dummy
};

Base.extend = function(_instance, _static) { // subclass
	var extend = Base.prototype.extend;
	
	// build the prototype
	Base._prototyping = true;
	var proto = new this;
	extend.call(proto, _instance);
  proto.base = function() {
    // call this method from any other method to invoke that method's ancestor
  };
	delete Base._prototyping;
	
	// create the wrapper for the constructor function
	//var constructor = proto.constructor.valueOf(); //-dean
	var constructor = proto.constructor;
	var klass = proto.constructor = function() {
		if (!Base._prototyping) {
			if (this._constructing || this.constructor == klass) { // instantiation
				this._constructing = true;
				constructor.apply(this, arguments);
				delete this._constructing;
			} else if (arguments[0] != null) { // casting
				return (arguments[0].extend || extend).call(arguments[0], proto);
			}
		}
	};
	
	// build the class interface
	klass.ancestor = this;
	klass.extend = this.extend;
	klass.forEach = this.forEach;
	klass.implement = this.implement;
	klass.prototype = proto;
	klass.toString = this.toString;
	klass.valueOf = function(type) {
		//return (type == "object") ? klass : constructor; //-dean
		return (type == "object") ? klass : constructor.valueOf();
	};
	extend.call(klass, _static);
	// class initialisation
	if (typeof klass.init == "function") klass.init();
	return klass;
};

Base.prototype = {	
	extend: function(source, value) {
		if (arguments.length > 1) { // extending with a name/value pair
			var ancestor = this[source];
			if (ancestor && (typeof value == "function") && // overriding a method?
				// the valueOf() comparison is to avoid circular references
				(!ancestor.valueOf || ancestor.valueOf() != value.valueOf()) &&
				/\bbase\b/.test(value)) {
				// get the underlying method
				var method = value.valueOf();
				// override
				value = function() {
					var previous = this.base || Base.prototype.base;
					this.base = ancestor;
					var returnValue = method.apply(this, arguments);
					this.base = previous;
					return returnValue;
				};
				// point to the underlying method
				value.valueOf = function(type) {
					return (type == "object") ? value : method;
				};
				value.toString = Base.toString;
			}
			this[source] = value;
		} else if (source) { // extending with an object literal
			var extend = Base.prototype.extend;
			// if this object has a customised extend method then use it
			if (!Base._prototyping && typeof this != "function") {
				extend = this.extend || extend;
			}
			var proto = {toSource: null};
			// do the "toString" and other methods manually
			var hidden = ["constructor", "toString", "valueOf"];
			// if we are prototyping then include the constructor
			var i = Base._prototyping ? 0 : 1;
			while (key = hidden[i++]) {
				if (source[key] != proto[key]) {
					extend.call(this, key, source[key]);

				}
			}
			// copy each of the source object's properties to this object
			for (var key in source) {
				if (!proto[key]) extend.call(this, key, source[key]);
			}
		}
		return this;
	}
};

// initialise
Base = Base.extend({
	constructor: function() {
		this.extend(arguments[0]);
	}
}, {
	ancestor: Object,
	version: "1.1",
	
	forEach: function(object, block, context) {
		for (var key in object) {
			if (this.prototype[key] === undefined) {
				block.call(context, object[key], key, object);
			}
		}
	},
		
	implement: function() {
		for (var i = 0; i < arguments.length; i++) {
			if (typeof arguments[i] == "function") {
				// if it's a function, call it
				arguments[i](this.prototype);
			} else {
				// add the interface using the extend method
				this.prototype.extend(arguments[i]);
			}
		}
		return this;
	},
	
	toString: function() {
		return String(this.valueOf());
	}
});;/**
 * Detect browser support for specific features
 */
wysihtml5.browser = (function() {
  var userAgent   = navigator.userAgent,
      testElement = document.createElement("div"),
      // Browser sniffing is unfortunately needed since some behaviors are impossible to feature detect
      isIE        = userAgent.indexOf("MSIE")         !== -1 && userAgent.indexOf("Opera") === -1,
      isGecko     = userAgent.indexOf("Gecko")        !== -1 && userAgent.indexOf("KHTML") === -1,
      isWebKit    = userAgent.indexOf("AppleWebKit/") !== -1,
      isChrome    = userAgent.indexOf("Chrome/")      !== -1,
      isOpera     = userAgent.indexOf("Opera/")       !== -1;

  function iosVersion(userAgent) {
    return +((/ipad|iphone|ipod/.test(userAgent) && userAgent.match(/ os (\d+).+? like mac os x/)) || [undefined, 0])[1];
  }

  function androidVersion(userAgent) {
    return +(userAgent.match(/android (\d+)/) || [undefined, 0])[1];
  }

  return {
    // Static variable needed, publicly accessible, to be able override it in unit tests
    USER_AGENT: userAgent,

    /**
     * Exclude browsers that are not capable of displaying and handling
     * contentEditable as desired:
     *    - iPhone, iPad (tested iOS 4.2.2) and Android (tested 2.2) refuse to make contentEditables focusable
     *    - IE < 8 create invalid markup and crash randomly from time to time
     *
     * @return {Boolean}
     */
    supported: function() {
      var userAgent                   = this.USER_AGENT.toLowerCase(),
          // Essential for making html elements editable
          hasContentEditableSupport   = "contentEditable" in testElement,
          // Following methods are needed in order to interact with the contentEditable area
          hasEditingApiSupport        = document.execCommand && document.queryCommandSupported && document.queryCommandState,
          // document selector apis are only supported by IE 8+, Safari 4+, Chrome and Firefox 3.5+
          hasQuerySelectorSupport     = document.querySelector && document.querySelectorAll,
          // contentEditable is unusable in mobile browsers (tested iOS 4.2.2, Android 2.2, Opera Mobile, WebOS 3.05)
          isIncompatibleMobileBrowser = (this.isIos() && iosVersion(userAgent) < 5) || (this.isAndroid() && androidVersion(userAgent) < 4) || userAgent.indexOf("opera mobi") !== -1 || userAgent.indexOf("hpwos/") !== -1;
      return hasContentEditableSupport
        && hasEditingApiSupport
        && hasQuerySelectorSupport
        && !isIncompatibleMobileBrowser;
    },

    isTouchDevice: function() {
      return this.supportsEvent("touchmove");
    },

    isIos: function() {
      return (/ipad|iphone|ipod/i).test(this.USER_AGENT);
    },

    isAndroid: function() {
      return this.USER_AGENT.indexOf("Android") !== -1;
    },

    /**
     * Whether the browser supports sandboxed iframes
     * Currently only IE 6+ offers such feature <iframe security="restricted">
     *
     * http://msdn.microsoft.com/en-us/library/ms534622(v=vs.85).aspx
     * http://blogs.msdn.com/b/ie/archive/2008/01/18/using-frames-more-securely.aspx
     *
     * HTML5 sandboxed iframes are still buggy and their DOM is not reachable from the outside (except when using postMessage)
     */
    supportsSandboxedIframes: function() {
      return isIE;
    },

    /**
     * IE6+7 throw a mixed content warning when the src of an iframe
     * is empty/unset or about:blank
     * window.querySelector is implemented as of IE8
     */
    throwsMixedContentWarningWhenIframeSrcIsEmpty: function() {
      return !("querySelector" in document);
    },

    /**
     * Whether the caret is correctly displayed in contentEditable elements
     * Firefox sometimes shows a huge caret in the beginning after focusing
     */
    displaysCaretInEmptyContentEditableCorrectly: function() {
      return isIE;
    },

    /**
     * Opera and IE are the only browsers who offer the css value
     * in the original unit, thx to the currentStyle object
     * All other browsers provide the computed style in px via window.getComputedStyle
     */
    hasCurrentStyleProperty: function() {
      return "currentStyle" in testElement;
    },

    /**
     * Firefox on OSX navigates through history when hitting CMD + Arrow right/left
     */
    hasHistoryIssue: function() {
      return isGecko && navigator.platform.substr(0, 3) === "Mac";
    },

    /**
     * Whether the browser inserts a <br> when pressing enter in a contentEditable element
     */
    insertsLineBreaksOnReturn: function() {
      return isGecko;
    },

    supportsPlaceholderAttributeOn: function(element) {
      return "placeholder" in element;
    },

    supportsEvent: function(eventName) {
      return "on" + eventName in testElement || (function() {
        testElement.setAttribute("on" + eventName, "return;");
        return typeof(testElement["on" + eventName]) === "function";
      })();
    },

    /**
     * Opera doesn't correctly fire focus/blur events when clicking in- and outside of iframe
     */
    supportsEventsInIframeCorrectly: function() {
      return !isOpera;
    },

    /**
     * Everything below IE9 doesn't know how to treat HTML5 tags
     *
     * @param {Object} context The document object on which to check HTML5 support
     *
     * @example
     *    wysihtml5.browser.supportsHTML5Tags(document);
     */
    supportsHTML5Tags: function(context) {
      var element = context.createElement("div"),
          html5   = "<article>foo</article>";
      element.innerHTML = html5;
      return element.innerHTML.toLowerCase() === html5;
    },

    /**
     * Checks whether a document supports a certain queryCommand
     * In particular, Opera needs a reference to a document that has a contentEditable in it's dom tree
     * in oder to report correct results
     *
     * @param {Object} doc Document object on which to check for a query command
     * @param {String} command The query command to check for
     * @return {Boolean}
     *
     * @example
     *    wysihtml5.browser.supportsCommand(document, "bold");
     */
    supportsCommand: (function() {
      // Following commands are supported but contain bugs in some browsers
      var buggyCommands = {
        // formatBlock fails with some tags (eg. <blockquote>)
        "formatBlock":          isIE,
         // When inserting unordered or ordered lists in Firefox, Chrome or Safari, the current selection or line gets
         // converted into a list (<ul><li>...</li></ul>, <ol><li>...</li></ol>)
         // IE and Opera act a bit different here as they convert the entire content of the current block element into a list
        "insertUnorderedList":  isIE || isWebKit,
        "insertOrderedList":    isIE || isWebKit
      };

      // Firefox throws errors for queryCommandSupported, so we have to build up our own object of supported commands
      var supported = {
        "insertHTML": isGecko
      };

      return function(doc, command) {
        var isBuggy = buggyCommands[command];
        if (!isBuggy) {
          // Firefox throws errors when invoking queryCommandSupported or queryCommandEnabled
          try {
            return doc.queryCommandSupported(command);
          } catch(e1) {}

          try {
            return doc.queryCommandEnabled(command);
          } catch(e2) {
            return !!supported[command];
          }
        }
        return false;
      };
    })(),

    /**
     * IE: URLs starting with:
     *    www., http://, https://, ftp://, gopher://, mailto:, new:, snews:, telnet:, wasis:, file://,
     *    nntp://, newsrc:, ldap://, ldaps://, outlook:, mic:// and url:
     * will automatically be auto-linked when either the user inserts them via copy&paste or presses the
     * space bar when the caret is directly after such an url.
     * This behavior cannot easily be avoided in IE < 9 since the logic is hardcoded in the mshtml.dll
     * (related blog post on msdn
     * http://blogs.msdn.com/b/ieinternals/archive/2009/09/17/prevent-automatic-hyperlinking-in-contenteditable-html.aspx).
     */
    doesAutoLinkingInContentEditable: function() {
      return isIE;
    },

    /**
     * As stated above, IE auto links urls typed into contentEditable elements
     * Since IE9 it's possible to prevent this behavior
     */
    canDisableAutoLinking: function() {
      return this.supportsCommand(document, "AutoUrlDetect");
    },

    /**
     * IE leaves an empty paragraph in the contentEditable element after clearing it
     * Chrome/Safari sometimes an empty <div>
     */
    clearsContentEditableCorrectly: function() {
      return isGecko || isOpera || isWebKit;
    },

    /**
     * IE gives wrong results for getAttribute
     */
    supportsGetAttributeCorrectly: function() {
      var td = document.createElement("td");
      return td.getAttribute("rowspan") != "1";
    },

    /**
     * When clicking on images in IE, Opera and Firefox, they are selected, which makes it easy to interact with them.
     * Chrome and Safari both don't support this
     */
    canSelectImagesInContentEditable: function() {
      return isGecko || isIE || isOpera;
    },

    /**
     * All browsers except Safari and Chrome automatically scroll the range/caret position into view
     */
    autoScrollsToCaret: function() {
      return !isWebKit;
    },

    /**
     * Check whether the browser automatically closes tags that don't need to be opened
     */
    autoClosesUnclosedTags: function() {
      var clonedTestElement = testElement.cloneNode(false),
          returnValue,
          innerHTML;

      clonedTestElement.innerHTML = "<p><div></div>";
      innerHTML                   = clonedTestElement.innerHTML.toLowerCase();
      returnValue                 = innerHTML === "<p></p><div></div>" || innerHTML === "<p><div></div></p>";

      // Cache result by overwriting current function
      this.autoClosesUnclosedTags = function() { return returnValue; };

      return returnValue;
    },

    /**
     * Whether the browser supports the native document.getElementsByClassName which returns live NodeLists
     */
    supportsNativeGetElementsByClassName: function() {
      return String(document.getElementsByClassName).indexOf("[native code]") !== -1;
    },

    /**
     * As of now (19.04.2011) only supported by Firefox 4 and Chrome
     * See https://developer.mozilla.org/en/DOM/Selection/modify
     */
    supportsSelectionModify: function() {
      return "getSelection" in window && "modify" in window.getSelection();
    },

    /**
     * Opera needs a white space after a <br> in order to position the caret correctly
     */
    needsSpaceAfterLineBreak: function() {
      return isOpera;
    },

    /**
     * Whether the browser supports the speech api on the given element
     * See http://mikepultz.com/2011/03/accessing-google-speech-api-chrome-11/
     *
     * @example
     *    var input = document.createElement("input");
     *    if (wysihtml5.browser.supportsSpeechApiOn(input)) {
     *      // ...
     *    }
     */
    supportsSpeechApiOn: function(input) {
      var chromeVersion = userAgent.match(/Chrome\/(\d+)/) || [undefined, 0];
      return chromeVersion[1] >= 11 && ("onwebkitspeechchange" in input || "speech" in input);
    },

    /**
     * IE9 crashes when setting a getter via Object.defineProperty on XMLHttpRequest or XDomainRequest
     * See https://connect.microsoft.com/ie/feedback/details/650112
     * or try the POC http://tifftiff.de/ie9_crash/
     */
    crashesWhenDefineProperty: function(property) {
      return isIE && (property === "XMLHttpRequest" || property === "XDomainRequest");
    },

    /**
     * IE is the only browser who fires the "focus" event not immediately when .focus() is called on an element
     */
    doesAsyncFocus: function() {
      return isIE;
    },

    /**
     * In IE it's impssible for the user and for the selection library to set the caret after an <img> when it's the lastChild in the document
     */
    hasProblemsSettingCaretAfterImg: function() {
      return isIE;
    },

    hasUndoInContextMenu: function() {
      return isGecko || isChrome || isOpera;
    },

    /**
     * Opera sometimes doesn't insert the node at the right position when range.insertNode(someNode)
     * is used (regardless if rangy or native)
     * This especially happens when the caret is positioned right after a <br> because then
     * insertNode() will insert the node right before the <br>
     */
    hasInsertNodeIssue: function() {
      return isOpera;
    },

    /**
     * IE 8+9 don't fire the focus event of the <body> when the iframe gets focused (even though the caret gets set into the <body>)
     */
    hasIframeFocusIssue: function() {
      return isIE;
    },

    /**
     * Chrome + Safari create invalid nested markup after paste
     *
     *  <p>
     *    foo
     *    <p>bar</p> <!-- BOO! -->
     *  </p>
     */
    createsNestedInvalidMarkupAfterPaste: function() {
      return isWebKit;
    },

    supportsMutationEvents: function() {
        return ("MutationEvent" in window);
    }
  };
})();
;wysihtml5.lang.array = function(arr) {
  return {
    /**
     * Check whether a given object exists in an array
     *
     * @example
     *    wysihtml5.lang.array([1, 2]).contains(1);
     *    // => true
     *
     * Can be used to match array with array. If intersection is found true is returned
     */
    contains: function(needle) {
      if (Array.isArray(needle)) {
        for (var i = needle.length; i--;) {
          if (wysihtml5.lang.array(arr).indexOf(needle[i]) !== -1) {
            return true;
          }
        }
        return false;
      } else {
        return wysihtml5.lang.array(arr).indexOf(needle) !== -1;
      }
    },

    /**
     * Check whether a given object exists in an array and return index
     * If no elelemt found returns -1
     *
     * @example
     *    wysihtml5.lang.array([1, 2]).indexOf(2);
     *    // => 1
     */
    indexOf: function(needle) {
        if (arr.indexOf) {
          return arr.indexOf(needle);
        } else {
          for (var i=0, length=arr.length; i<length; i++) {
            if (arr[i] === needle) { return i; }
          }
          return -1;
        }
    },

    /**
     * Substract one array from another
     *
     * @example
     *    wysihtml5.lang.array([1, 2, 3, 4]).without([3, 4]);
     *    // => [1, 2]
     */
    without: function(arrayToSubstract) {
      arrayToSubstract = wysihtml5.lang.array(arrayToSubstract);
      var newArr  = [],
          i       = 0,
          length  = arr.length;
      for (; i<length; i++) {
        if (!arrayToSubstract.contains(arr[i])) {
          newArr.push(arr[i]);
        }
      }
      return newArr;
    },

    /**
     * Return a clean native array
     *
     * Following will convert a Live NodeList to a proper Array
     * @example
     *    var childNodes = wysihtml5.lang.array(document.body.childNodes).get();
     */
    get: function() {
      var i        = 0,
          length   = arr.length,
          newArray = [];
      for (; i<length; i++) {
        newArray.push(arr[i]);
      }
      return newArray;
    },

    /**
     * Creates a new array with the results of calling a provided function on every element in this array.
     * optionally this can be provided as second argument
     *
     * @example
     *    var childNodes = wysihtml5.lang.array([1,2,3,4]).map(function (value, index, array) {
            return value * 2;
     *    });
     *    // => [2,4,6,8]
     */
    map: function(callback, thisArg) {
      if (Array.prototype.map) {
        return arr.map(callback, thisArg);
      } else {
        var len = arr.length >>> 0,
            A = new Array(len),
            i = 0;
        for (; i < len; i++) {
           A[i] = callback.call(thisArg, arr[i], i, arr);
        }
        return A;
      }
    },

    /* ReturnS new array without duplicate entries
     *
     * @example
     *    var uniq = wysihtml5.lang.array([1,2,3,2,1,4]).unique();
     *    // => [1,2,3,4]
     */
    unique: function() {
      var vals = [],
          max = arr.length,
          idx = 0;

      while (idx < max) {
        if (!wysihtml5.lang.array(vals).contains(arr[idx])) {
          vals.push(arr[idx]);
        }
        idx++;
      }
      return vals;
    }

  };
};
;wysihtml5.lang.Dispatcher = Base.extend(
  /** @scope wysihtml5.lang.Dialog.prototype */ {
  on: function(eventName, handler) {
    this.events = this.events || {};
    this.events[eventName] = this.events[eventName] || [];
    this.events[eventName].push(handler);
    return this;
  },

  off: function(eventName, handler) {
    this.events = this.events || {};
    var i = 0,
        handlers,
        newHandlers;
    if (eventName) {
      handlers    = this.events[eventName] || [],
      newHandlers = [];
      for (; i<handlers.length; i++) {
        if (handlers[i] !== handler && handler) {
          newHandlers.push(handlers[i]);
        }
      }
      this.events[eventName] = newHandlers;
    } else {
      // Clean up all events
      this.events = {};
    }
    return this;
  },

  fire: function(eventName, payload) {
    this.events = this.events || {};
    var handlers = this.events[eventName] || [],
        i        = 0;
    for (; i<handlers.length; i++) {
      handlers[i].call(this, payload);
    }
    return this;
  },

  // deprecated, use .on()
  observe: function() {
    return this.on.apply(this, arguments);
  },

  // deprecated, use .off()
  stopObserving: function() {
    return this.off.apply(this, arguments);
  }
});
;wysihtml5.lang.object = function(obj) {
  return {
    /**
     * @example
     *    wysihtml5.lang.object({ foo: 1, bar: 1 }).merge({ bar: 2, baz: 3 }).get();
     *    // => { foo: 1, bar: 2, baz: 3 }
     */
    merge: function(otherObj) {
      for (var i in otherObj) {
        obj[i] = otherObj[i];
      }
      return this;
    },

    get: function() {
      return obj;
    },

    /**
     * @example
     *    wysihtml5.lang.object({ foo: 1 }).clone();
     *    // => { foo: 1 }
     */
    clone: function() {
      var newObj = {},
          i;
      for (i in obj) {
        newObj[i] = obj[i];
      }
      return newObj;
    },

    /**
     * @example
     *    wysihtml5.lang.object([]).isArray();
     *    // => true
     */
    isArray: function() {
      return Object.prototype.toString.call(obj) === "[object Array]";
    }
  };
};
;(function() {
  var WHITE_SPACE_START = /^\s+/,
      WHITE_SPACE_END   = /\s+$/,
      ENTITY_REG_EXP    = /[&<>"]/g,
      ENTITY_MAP = {
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        '"': "&quot;"
      };
  wysihtml5.lang.string = function(str) {
    str = String(str);
    return {
      /**
       * @example
       *    wysihtml5.lang.string("   foo   ").trim();
       *    // => "foo"
       */
      trim: function() {
        return str.replace(WHITE_SPACE_START, "").replace(WHITE_SPACE_END, "");
      },

      /**
       * @example
       *    wysihtml5.lang.string("Hello #{name}").interpolate({ name: "Christopher" });
       *    // => "Hello Christopher"
       */
      interpolate: function(vars) {
        for (var i in vars) {
          str = this.replace("#{" + i + "}").by(vars[i]);
        }
        return str;
      },

      /**
       * @example
       *    wysihtml5.lang.string("Hello Tom").replace("Tom").with("Hans");
       *    // => "Hello Hans"
       */
      replace: function(search) {
        return {
          by: function(replace) {
            return str.split(search).join(replace);
          }
        };
      },

      /**
       * @example
       *    wysihtml5.lang.string("hello<br>").escapeHTML();
       *    // => "hello&lt;br&gt;"
       */
      escapeHTML: function() {
        return str.replace(ENTITY_REG_EXP, function(c) { return ENTITY_MAP[c]; });
      }
    };
  };
})();
;/**
 * Find urls in descendant text nodes of an element and auto-links them
 * Inspired by http://james.padolsey.com/javascript/find-and-replace-text-with-javascript/
 *
 * @param {Element} element Container element in which to search for urls
 *
 * @example
 *    <div id="text-container">Please click here: www.google.com</div>
 *    <script>wysihtml5.dom.autoLink(document.getElementById("text-container"));</script>
 */
(function(wysihtml5) {
  var /**
       * Don't auto-link urls that are contained in the following elements:
       */
      IGNORE_URLS_IN        = wysihtml5.lang.array(["CODE", "PRE", "A", "SCRIPT", "HEAD", "TITLE", "STYLE"]),
      /**
       * revision 1:
       *    /(\S+\.{1}[^\s\,\.\!]+)/g
       *
       * revision 2:
       *    /(\b(((https?|ftp):\/\/)|(www\.))[-A-Z0-9+&@#\/%?=~_|!:,.;\[\]]*[-A-Z0-9+&@#\/%=~_|])/gim
       *
       * put this in the beginning if you don't wan't to match within a word
       *    (^|[\>\(\{\[\s\>])
       */
      URL_REG_EXP           = /((https?:\/\/|www\.)[^\s<]{3,})/gi,
      TRAILING_CHAR_REG_EXP = /([^\w\/\-](,?))$/i,
      MAX_DISPLAY_LENGTH    = 100,
      BRACKETS              = { ")": "(", "]": "[", "}": "{" };

  function autoLink(element, ignoreInClasses) {
    if (_hasParentThatShouldBeIgnored(element, ignoreInClasses)) {
      return element;
    }

    if (element === element.ownerDocument.documentElement) {
      element = element.ownerDocument.body;
    }

    return _parseNode(element, ignoreInClasses);
  }

  /**
   * This is basically a rebuild of
   * the rails auto_link_urls text helper
   */
  function _convertUrlsToLinks(str) {
    return str.replace(URL_REG_EXP, function(match, url) {
      var punctuation = (url.match(TRAILING_CHAR_REG_EXP) || [])[1] || "",
          opening     = BRACKETS[punctuation];
      url = url.replace(TRAILING_CHAR_REG_EXP, "");

      if (url.split(opening).length > url.split(punctuation).length) {
        url = url + punctuation;
        punctuation = "";
      }
      var realUrl    = url,
          displayUrl = url;
      if (url.length > MAX_DISPLAY_LENGTH) {
        displayUrl = displayUrl.substr(0, MAX_DISPLAY_LENGTH) + "...";
      }
      // Add http prefix if necessary
      if (realUrl.substr(0, 4) === "www.") {
        realUrl = "http://" + realUrl;
      }

      return '<a href="' + realUrl + '">' + displayUrl + '</a>' + punctuation;
    });
  }

  /**
   * Creates or (if already cached) returns a temp element
   * for the given document object
   */
  function _getTempElement(context) {
    var tempElement = context._wysihtml5_tempElement;
    if (!tempElement) {
      tempElement = context._wysihtml5_tempElement = context.createElement("div");
    }
    return tempElement;
  }

  /**
   * Replaces the original text nodes with the newly auto-linked dom tree
   */
  function _wrapMatchesInNode(textNode) {
    var parentNode  = textNode.parentNode,
        nodeValue   = wysihtml5.lang.string(textNode.data).escapeHTML(),
        tempElement = _getTempElement(parentNode.ownerDocument);

    // We need to insert an empty/temporary <span /> to fix IE quirks
    // Elsewise IE would strip white space in the beginning
    tempElement.innerHTML = "<span></span>" + _convertUrlsToLinks(nodeValue);
    tempElement.removeChild(tempElement.firstChild);

    while (tempElement.firstChild) {
      // inserts tempElement.firstChild before textNode
      parentNode.insertBefore(tempElement.firstChild, textNode);
    }
    parentNode.removeChild(textNode);
  }

  function _hasParentThatShouldBeIgnored(node, ignoreInClasses) {
    var nodeName;
    while (node.parentNode) {
      node = node.parentNode;
      nodeName = node.nodeName;
      if (node.className && wysihtml5.lang.array(node.className.split(' ')).contains(ignoreInClasses)) {
        return true;
      }
      if (IGNORE_URLS_IN.contains(nodeName)) {
        return true;
      } else if (nodeName === "body") {
        return false;
      }
    }
    return false;
  }

  function _parseNode(element, ignoreInClasses) {
    if (IGNORE_URLS_IN.contains(element.nodeName)) {
      return;
    }

    if (element.className && wysihtml5.lang.array(element.className.split(' ')).contains(ignoreInClasses)) {
      return;
    }

    if (element.nodeType === wysihtml5.TEXT_NODE && element.data.match(URL_REG_EXP)) {
      _wrapMatchesInNode(element);
      return;
    }

    var childNodes        = wysihtml5.lang.array(element.childNodes).get(),
        childNodesLength  = childNodes.length,
        i                 = 0;

    for (; i<childNodesLength; i++) {
      _parseNode(childNodes[i], ignoreInClasses);
    }

    return element;
  }

  wysihtml5.dom.autoLink = autoLink;

  // Reveal url reg exp to the outside
  wysihtml5.dom.autoLink.URL_REG_EXP = URL_REG_EXP;
})(wysihtml5);
;(function(wysihtml5) {
  var api = wysihtml5.dom;

  api.addClass = function(element, className) {
    var classList = element.classList;
    if (classList) {
      return classList.add(className);
    }
    if (api.hasClass(element, className)) {
      return;
    }
    element.className += " " + className;
  };

  api.removeClass = function(element, className) {
    var classList = element.classList;
    if (classList) {
      return classList.remove(className);
    }

    element.className = element.className.replace(new RegExp("(^|\\s+)" + className + "(\\s+|$)"), " ");
  };

  api.hasClass = function(element, className) {
    var classList = element.classList;
    if (classList) {
      return classList.contains(className);
    }

    var elementClassName = element.className;
    return (elementClassName.length > 0 && (elementClassName == className || new RegExp("(^|\\s)" + className + "(\\s|$)").test(elementClassName)));
  };
})(wysihtml5);
;wysihtml5.dom.contains = (function() {
  var documentElement = document.documentElement;
  if (documentElement.contains) {
    return function(container, element) {
      if (element.nodeType !== wysihtml5.ELEMENT_NODE) {
        element = element.parentNode;
      }
      return container !== element && container.contains(element);
    };
  } else if (documentElement.compareDocumentPosition) {
    return function(container, element) {
      // https://developer.mozilla.org/en/DOM/Node.compareDocumentPosition
      return !!(container.compareDocumentPosition(element) & 16);
    };
  }
})();
;/**
 * Converts an HTML fragment/element into a unordered/ordered list
 *
 * @param {Element} element The element which should be turned into a list
 * @param {String} listType The list type in which to convert the tree (either "ul" or "ol")
 * @return {Element} The created list
 *
 * @example
 *    <!-- Assume the following dom: -->
 *    <span id="pseudo-list">
 *      eminem<br>
 *      dr. dre
 *      <div>50 Cent</div>
 *    </span>
 *
 *    <script>
 *      wysihtml5.dom.convertToList(document.getElementById("pseudo-list"), "ul");
 *    </script>
 *
 *    <!-- Will result in: -->
 *    <ul>
 *      <li>eminem</li>
 *      <li>dr. dre</li>
 *      <li>50 Cent</li>
 *    </ul>
 */
wysihtml5.dom.convertToList = (function() {
  function _createListItem(doc, list) {
    var listItem = doc.createElement("li");
    list.appendChild(listItem);
    return listItem;
  }

  function _createList(doc, type) {
    return doc.createElement(type);
  }

  function convertToList(element, listType, uneditableClass) {
    if (element.nodeName === "UL" || element.nodeName === "OL" || element.nodeName === "MENU") {
      // Already a list
      return element;
    }

    var doc               = element.ownerDocument,
        list              = _createList(doc, listType),
        lineBreaks        = element.querySelectorAll("br"),
        lineBreaksLength  = lineBreaks.length,
        childNodes,
        childNodesLength,
        childNode,
        lineBreak,
        parentNode,
        isBlockElement,
        isLineBreak,
        currentListItem,
        i;

    // First find <br> at the end of inline elements and move them behind them
    for (i=0; i<lineBreaksLength; i++) {
      lineBreak = lineBreaks[i];
      while ((parentNode = lineBreak.parentNode) && parentNode !== element && parentNode.lastChild === lineBreak) {
        if (wysihtml5.dom.getStyle("display").from(parentNode) === "block") {
          parentNode.removeChild(lineBreak);
          break;
        }
        wysihtml5.dom.insert(lineBreak).after(lineBreak.parentNode);
      }
    }

    childNodes        = wysihtml5.lang.array(element.childNodes).get();
    childNodesLength  = childNodes.length;

    for (i=0; i<childNodesLength; i++) {
      currentListItem   = currentListItem || _createListItem(doc, list);
      childNode         = childNodes[i];
      isBlockElement    = wysihtml5.dom.getStyle("display").from(childNode) === "block";
      isLineBreak       = childNode.nodeName === "BR";

      // consider uneditable as an inline element
      if (isBlockElement && (!uneditableClass || !wysihtml5.dom.hasClass(childNode, uneditableClass))) {
        // Append blockElement to current <li> if empty, otherwise create a new one
        currentListItem = currentListItem.firstChild ? _createListItem(doc, list) : currentListItem;
        currentListItem.appendChild(childNode);
        currentListItem = null;
        continue;
      }

      if (isLineBreak) {
        // Only create a new list item in the next iteration when the current one has already content
        currentListItem = currentListItem.firstChild ? null : currentListItem;
        continue;
      }

      currentListItem.appendChild(childNode);
    }

    if (childNodes.length === 0) {
      _createListItem(doc, list);
    }

    element.parentNode.replaceChild(list, element);
    return list;
  }

  return convertToList;
})();
;/**
 * Copy a set of attributes from one element to another
 *
 * @param {Array} attributesToCopy List of attributes which should be copied
 * @return {Object} Returns an object which offers the "from" method which can be invoked with the element where to
 *    copy the attributes from., this again returns an object which provides a method named "to" which can be invoked
 *    with the element where to copy the attributes to (see example)
 *
 * @example
 *    var textarea    = document.querySelector("textarea"),
 *        div         = document.querySelector("div[contenteditable=true]"),
 *        anotherDiv  = document.querySelector("div.preview");
 *    wysihtml5.dom.copyAttributes(["spellcheck", "value", "placeholder"]).from(textarea).to(div).andTo(anotherDiv);
 *
 */
wysihtml5.dom.copyAttributes = function(attributesToCopy) {
  return {
    from: function(elementToCopyFrom) {
      return {
        to: function(elementToCopyTo) {
          var attribute,
              i         = 0,
              length    = attributesToCopy.length;
          for (; i<length; i++) {
            attribute = attributesToCopy[i];
            if (typeof(elementToCopyFrom[attribute]) !== "undefined" && elementToCopyFrom[attribute] !== "") {
              elementToCopyTo[attribute] = elementToCopyFrom[attribute];
            }
          }
          return { andTo: arguments.callee };
        }
      };
    }
  };
};
;/**
 * Copy a set of styles from one element to another
 * Please note that this only works properly across browsers when the element from which to copy the styles
 * is in the dom
 *
 * Interesting article on how to copy styles
 *
 * @param {Array} stylesToCopy List of styles which should be copied
 * @return {Object} Returns an object which offers the "from" method which can be invoked with the element where to
 *    copy the styles from., this again returns an object which provides a method named "to" which can be invoked
 *    with the element where to copy the styles to (see example)
 *
 * @example
 *    var textarea    = document.querySelector("textarea"),
 *        div         = document.querySelector("div[contenteditable=true]"),
 *        anotherDiv  = document.querySelector("div.preview");
 *    wysihtml5.dom.copyStyles(["overflow-y", "width", "height"]).from(textarea).to(div).andTo(anotherDiv);
 *
 */
(function(dom) {

  /**
   * Mozilla, WebKit and Opera recalculate the computed width when box-sizing: boder-box; is set
   * So if an element has "width: 200px; -moz-box-sizing: border-box; border: 1px;" then
   * its computed css width will be 198px
   *
   * See https://bugzilla.mozilla.org/show_bug.cgi?id=520992
   */
  var BOX_SIZING_PROPERTIES = ["-webkit-box-sizing", "-moz-box-sizing", "-ms-box-sizing", "box-sizing"];

  var shouldIgnoreBoxSizingBorderBox = function(element) {
    if (hasBoxSizingBorderBox(element)) {
       return parseInt(dom.getStyle("width").from(element), 10) < element.offsetWidth;
    }
    return false;
  };

  var hasBoxSizingBorderBox = function(element) {
    var i       = 0,
        length  = BOX_SIZING_PROPERTIES.length;
    for (; i<length; i++) {
      if (dom.getStyle(BOX_SIZING_PROPERTIES[i]).from(element) === "border-box") {
        return BOX_SIZING_PROPERTIES[i];
      }
    }
  };

  dom.copyStyles = function(stylesToCopy) {
    return {
      from: function(element) {
        if (shouldIgnoreBoxSizingBorderBox(element)) {
          stylesToCopy = wysihtml5.lang.array(stylesToCopy).without(BOX_SIZING_PROPERTIES);
        }

        var cssText = "",
            length  = stylesToCopy.length,
            i       = 0,
            property;
        for (; i<length; i++) {
          property = stylesToCopy[i];
          cssText += property + ":" + dom.getStyle(property).from(element) + ";";
        }

        return {
          to: function(element) {
            dom.setStyles(cssText).on(element);
            return { andTo: arguments.callee };
          }
        };
      }
    };
  };
})(wysihtml5.dom);
;/**
 * Event Delegation
 *
 * @example
 *    wysihtml5.dom.delegate(document.body, "a", "click", function() {
 *      // foo
 *    });
 */
(function(wysihtml5) {

  wysihtml5.dom.delegate = function(container, selector, eventName, handler) {
    return wysihtml5.dom.observe(container, eventName, function(event) {
      var target    = event.target,
          match     = wysihtml5.lang.array(container.querySelectorAll(selector));

      while (target && target !== container) {
        if (match.contains(target)) {
          handler.call(target, event);
          break;
        }
        target = target.parentNode;
      }
    });
  };

})(wysihtml5);
;// TODO: Refactor dom tree traversing here
(function(wysihtml5) {
  wysihtml5.dom.domNode = function(node) {
    var defaultNodeTypes = [wysihtml5.ELEMENT_NODE, wysihtml5.TEXT_NODE];

    var _isBlankText = function(node) {
      return node.nodeType === wysihtml5.TEXT_NODE && (/^\s*$/g).test(node.data);
    };

    return {

      // var node = wysihtml5.dom.domNode(element).prev({nodeTypes: [1,3], ignoreBlankTexts: true});
      prev: function(options) {
        var prevNode = node.previousSibling,
            types = (options && options.nodeTypes) ? options.nodeTypes : defaultNodeTypes;
        
        if (!prevNode) {
          return null;
        }

        if (
          (!wysihtml5.lang.array(types).contains(prevNode.nodeType)) || // nodeTypes check.
          (options && options.ignoreBlankTexts && _isBlankText(prevNode)) // Blank text nodes bypassed if set
        ) {
          return wysihtml5.dom.domNode(prevNode).prev(options);
        }
        
        return prevNode;
      },

      // var node = wysihtml5.dom.domNode(element).next({nodeTypes: [1,3], ignoreBlankTexts: true});
      next: function(options) {
        var nextNode = node.nextSibling,
            types = (options && options.nodeTypes) ? options.nodeTypes : defaultNodeTypes;
        
        if (!nextNode) {
          return null;
        }

        if (
          (!wysihtml5.lang.array(types).contains(nextNode.nodeType)) || // nodeTypes check.
          (options && options.ignoreBlankTexts && _isBlankText(nextNode)) // blank text nodes bypassed if set
        ) {
          return wysihtml5.dom.domNode(nextNode).next(options);
        }
        
        return nextNode;
      }



    };
  };
})(wysihtml5);;/**
 * Returns the given html wrapped in a div element
 *
 * Fixing IE's inability to treat unknown elements (HTML5 section, article, ...) correctly
 * when inserted via innerHTML
 *
 * @param {String} html The html which should be wrapped in a dom element
 * @param {Obejct} [context] Document object of the context the html belongs to
 *
 * @example
 *    wysihtml5.dom.getAsDom("<article>foo</article>");
 */
wysihtml5.dom.getAsDom = (function() {

  var _innerHTMLShiv = function(html, context) {
    var tempElement = context.createElement("div");
    tempElement.style.display = "none";
    context.body.appendChild(tempElement);
    // IE throws an exception when trying to insert <frameset></frameset> via innerHTML
    try { tempElement.innerHTML = html; } catch(e) {}
    context.body.removeChild(tempElement);
    return tempElement;
  };

  /**
   * Make sure IE supports HTML5 tags, which is accomplished by simply creating one instance of each element
   */
  var _ensureHTML5Compatibility = function(context) {
    if (context._wysihtml5_supportsHTML5Tags) {
      return;
    }
    for (var i=0, length=HTML5_ELEMENTS.length; i<length; i++) {
      context.createElement(HTML5_ELEMENTS[i]);
    }
    context._wysihtml5_supportsHTML5Tags = true;
  };


  /**
   * List of html5 tags
   * taken from http://simon.html5.org/html5-elements
   */
  var HTML5_ELEMENTS = [
    "abbr", "article", "aside", "audio", "bdi", "canvas", "command", "datalist", "details", "figcaption",
    "figure", "footer", "header", "hgroup", "keygen", "mark", "meter", "nav", "output", "progress",
    "rp", "rt", "ruby", "svg", "section", "source", "summary", "time", "track", "video", "wbr"
  ];

  return function(html, context) {
    context = context || document;
    var tempElement;
    if (typeof(html) === "object" && html.nodeType) {
      tempElement = context.createElement("div");
      tempElement.appendChild(html);
    } else if (wysihtml5.browser.supportsHTML5Tags(context)) {
      tempElement = context.createElement("div");
      tempElement.innerHTML = html;
    } else {
      _ensureHTML5Compatibility(context);
      tempElement = _innerHTMLShiv(html, context);
    }
    return tempElement;
  };
})();
;/**
 * Walks the dom tree from the given node up until it finds a match
 * Designed for optimal performance.
 *
 * @param {Element} node The from which to check the parent nodes
 * @param {Object} matchingSet Object to match against (possible properties: nodeName, className, classRegExp)
 * @param {Number} [levels] How many parents should the function check up from the current node (defaults to 50)
 * @return {null|Element} Returns the first element that matched the desiredNodeName(s)
 * @example
 *    var listElement = wysihtml5.dom.getParentElement(document.querySelector("li"), { nodeName: ["MENU", "UL", "OL"] });
 *    // ... or ...
 *    var unorderedListElement = wysihtml5.dom.getParentElement(document.querySelector("li"), { nodeName: "UL" });
 *    // ... or ...
 *    var coloredElement = wysihtml5.dom.getParentElement(myTextNode, { nodeName: "SPAN", className: "wysiwyg-color-red", classRegExp: /wysiwyg-color-[a-z]/g });
 */
wysihtml5.dom.getParentElement = (function() {

  function _isSameNodeName(nodeName, desiredNodeNames) {
    if (!desiredNodeNames || !desiredNodeNames.length) {
      return true;
    }

    if (typeof(desiredNodeNames) === "string") {
      return nodeName === desiredNodeNames;
    } else {
      return wysihtml5.lang.array(desiredNodeNames).contains(nodeName);
    }
  }

  function _isElement(node) {
    return node.nodeType === wysihtml5.ELEMENT_NODE;
  }

  function _hasClassName(element, className, classRegExp) {
    var classNames = (element.className || "").match(classRegExp) || [];
    if (!className) {
      return !!classNames.length;
    }
    return classNames[classNames.length - 1] === className;
  }

  function _hasStyle(element, cssStyle, styleRegExp) {
    var styles = (element.getAttribute('style') || "").match(styleRegExp) || [];
    if (!cssStyle) {
      return !!styles.length;
    }
    return styles[styles.length - 1] === cssStyle;
  }

  return function(node, matchingSet, levels, container) {
    var findByStyle = (matchingSet.cssStyle || matchingSet.styleRegExp),
        findByClass = (matchingSet.className || matchingSet.classRegExp);

    levels = levels || 50; // Go max 50 nodes upwards from current node

    while (levels-- && node && node.nodeName !== "BODY" && (!container || node !== container)) {
      if (_isElement(node) && _isSameNodeName(node.nodeName, matchingSet.nodeName) &&
          (!findByStyle || _hasStyle(node, matchingSet.cssStyle, matchingSet.styleRegExp)) &&
          (!findByClass || _hasClassName(node, matchingSet.className, matchingSet.classRegExp))
      ) {
        return node;
      }
      node = node.parentNode;
    }
    return null;
  };
})();
;/**
 * Get element's style for a specific css property
 *
 * @param {Element} element The element on which to retrieve the style
 * @param {String} property The CSS property to retrieve ("float", "display", "text-align", ...)
 *
 * @example
 *    wysihtml5.dom.getStyle("display").from(document.body);
 *    // => "block"
 */
wysihtml5.dom.getStyle = (function() {
  var stylePropertyMapping = {
        "float": ("styleFloat" in document.createElement("div").style) ? "styleFloat" : "cssFloat"
      },
      REG_EXP_CAMELIZE = /\-[a-z]/g;

  function camelize(str) {
    return str.replace(REG_EXP_CAMELIZE, function(match) {
      return match.charAt(1).toUpperCase();
    });
  }

  return function(property) {
    return {
      from: function(element) {
        if (element.nodeType !== wysihtml5.ELEMENT_NODE) {
          return;
        }

        var doc               = element.ownerDocument,
            camelizedProperty = stylePropertyMapping[property] || camelize(property),
            style             = element.style,
            currentStyle      = element.currentStyle,
            styleValue        = style[camelizedProperty];
        if (styleValue) {
          return styleValue;
        }

        // currentStyle is no standard and only supported by Opera and IE but it has one important advantage over the standard-compliant
        // window.getComputedStyle, since it returns css property values in their original unit:
        // If you set an elements width to "50%", window.getComputedStyle will give you it's current width in px while currentStyle
        // gives you the original "50%".
        // Opera supports both, currentStyle and window.getComputedStyle, that's why checking for currentStyle should have higher prio
        if (currentStyle) {
          try {
            return currentStyle[camelizedProperty];
          } catch(e) {
            //ie will occasionally fail for unknown reasons. swallowing exception
          }
        }

        var win                 = doc.defaultView || doc.parentWindow,
            needsOverflowReset  = (property === "height" || property === "width") && element.nodeName === "TEXTAREA",
            originalOverflow,
            returnValue;

        if (win.getComputedStyle) {
          // Chrome and Safari both calculate a wrong width and height for textareas when they have scroll bars
          // therfore we remove and restore the scrollbar and calculate the value in between
          if (needsOverflowReset) {
            originalOverflow = style.overflow;
            style.overflow = "hidden";
          }
          returnValue = win.getComputedStyle(element, null).getPropertyValue(property);
          if (needsOverflowReset) {
            style.overflow = originalOverflow || "";
          }
          return returnValue;
        }
      }
    };
  };
})();
;wysihtml5.dom.getTextNodes = function(node, ingoreEmpty){
  var all = [];
  for (node=node.firstChild;node;node=node.nextSibling){
    if (node.nodeType == 3) {
      if (!ingoreEmpty || !(/^\s*$/).test(node.innerText || node.textContent)) {
        all.push(node);
      }
    } else {
      all = all.concat(wysihtml5.dom.getTextNodes(node, ingoreEmpty));
    }
  }
  return all;
};;/**
 * High performant way to check whether an element with a specific tag name is in the given document
 * Optimized for being heavily executed
 * Unleashes the power of live node lists
 *
 * @param {Object} doc The document object of the context where to check
 * @param {String} tagName Upper cased tag name
 * @example
 *    wysihtml5.dom.hasElementWithTagName(document, "IMG");
 */
wysihtml5.dom.hasElementWithTagName = (function() {
  var LIVE_CACHE          = {},
      DOCUMENT_IDENTIFIER = 1;

  function _getDocumentIdentifier(doc) {
    return doc._wysihtml5_identifier || (doc._wysihtml5_identifier = DOCUMENT_IDENTIFIER++);
  }

  return function(doc, tagName) {
    var key         = _getDocumentIdentifier(doc) + ":" + tagName,
        cacheEntry  = LIVE_CACHE[key];
    if (!cacheEntry) {
      cacheEntry = LIVE_CACHE[key] = doc.getElementsByTagName(tagName);
    }

    return cacheEntry.length > 0;
  };
})();
;/**
 * High performant way to check whether an element with a specific class name is in the given document
 * Optimized for being heavily executed
 * Unleashes the power of live node lists
 *
 * @param {Object} doc The document object of the context where to check
 * @param {String} tagName Upper cased tag name
 * @example
 *    wysihtml5.dom.hasElementWithClassName(document, "foobar");
 */
(function(wysihtml5) {
  var LIVE_CACHE          = {},
      DOCUMENT_IDENTIFIER = 1;

  function _getDocumentIdentifier(doc) {
    return doc._wysihtml5_identifier || (doc._wysihtml5_identifier = DOCUMENT_IDENTIFIER++);
  }

  wysihtml5.dom.hasElementWithClassName = function(doc, className) {
    // getElementsByClassName is not supported by IE<9
    // but is sometimes mocked via library code (which then doesn't return live node lists)
    if (!wysihtml5.browser.supportsNativeGetElementsByClassName()) {
      return !!doc.querySelector("." + className);
    }

    var key         = _getDocumentIdentifier(doc) + ":" + className,
        cacheEntry  = LIVE_CACHE[key];
    if (!cacheEntry) {
      cacheEntry = LIVE_CACHE[key] = doc.getElementsByClassName(className);
    }

    return cacheEntry.length > 0;
  };
})(wysihtml5);
;wysihtml5.dom.insert = function(elementToInsert) {
  return {
    after: function(element) {
      element.parentNode.insertBefore(elementToInsert, element.nextSibling);
    },

    before: function(element) {
      element.parentNode.insertBefore(elementToInsert, element);
    },

    into: function(element) {
      element.appendChild(elementToInsert);
    }
  };
};
;wysihtml5.dom.insertCSS = function(rules) {
  rules = rules.join("\n");

  return {
    into: function(doc) {
      var styleElement = doc.createElement("style");
      styleElement.type = "text/css";

      if (styleElement.styleSheet) {
        styleElement.styleSheet.cssText = rules;
      } else {
        styleElement.appendChild(doc.createTextNode(rules));
      }

      var link = doc.querySelector("head link");
      if (link) {
        link.parentNode.insertBefore(styleElement, link);
        return;
      } else {
        var head = doc.querySelector("head");
        if (head) {
          head.appendChild(styleElement);
        }
      }
    }
  };
};
;// TODO: Refactor dom tree traversing here
(function(wysihtml5) {
  wysihtml5.dom.lineBreaks = function(node) {

    function _isLineBreak(n) {
      return n.nodeName === "BR";
    }

    /**
     * Checks whether the elment causes a visual line break
     * (<br> or block elements)
     */
    function _isLineBreakOrBlockElement(element) {
      if (_isLineBreak(element)) {
        return true;
      }

      if (wysihtml5.dom.getStyle("display").from(element) === "block") {
        return true;
      }

      return false;
    }

    return {

      /* wysihtml5.dom.lineBreaks(element).add();
       *
       * Adds line breaks before and after the given node if the previous and next siblings
       * aren't already causing a visual line break (block element or <br>)
       */
      add: function(options) {
        var doc             = node.ownerDocument,
          nextSibling     = wysihtml5.dom.domNode(node).next({ignoreBlankTexts: true}),
          previousSibling = wysihtml5.dom.domNode(node).prev({ignoreBlankTexts: true});

        if (nextSibling && !_isLineBreakOrBlockElement(nextSibling)) {
          wysihtml5.dom.insert(doc.createElement("br")).after(node);
        }
        if (previousSibling && !_isLineBreakOrBlockElement(previousSibling)) {
          wysihtml5.dom.insert(doc.createElement("br")).before(node);
        }
      },

      /* wysihtml5.dom.lineBreaks(element).remove();
       *
       * Removes line breaks before and after the given node
       */
      remove: function(options) {
        var nextSibling     = wysihtml5.dom.domNode(node).next({ignoreBlankTexts: true}),
            previousSibling = wysihtml5.dom.domNode(node).prev({ignoreBlankTexts: true});

        if (nextSibling && _isLineBreak(nextSibling)) {
          nextSibling.parentNode.removeChild(nextSibling);
        }
        if (previousSibling && _isLineBreak(previousSibling)) {
          previousSibling.parentNode.removeChild(previousSibling);
        }
      }
    };
  };
})(wysihtml5);;/**
 * Method to set dom events
 *
 * @example
 *    wysihtml5.dom.observe(iframe.contentWindow.document.body, ["focus", "blur"], function() { ... });
 */
wysihtml5.dom.observe = function(element, eventNames, handler) {
  eventNames = typeof(eventNames) === "string" ? [eventNames] : eventNames;

  var handlerWrapper,
      eventName,
      i       = 0,
      length  = eventNames.length;

  for (; i<length; i++) {
    eventName = eventNames[i];
    if (element.addEventListener) {
      element.addEventListener(eventName, handler, false);
    } else {
      handlerWrapper = function(event) {
        if (!("target" in event)) {
          event.target = event.srcElement;
        }
        event.preventDefault = event.preventDefault || function() {
          this.returnValue = false;
        };
        event.stopPropagation = event.stopPropagation || function() {
          this.cancelBubble = true;
        };
        handler.call(element, event);
      };
      element.attachEvent("on" + eventName, handlerWrapper);
    }
  }

  return {
    stop: function() {
      var eventName,
          i       = 0,
          length  = eventNames.length;
      for (; i<length; i++) {
        eventName = eventNames[i];
        if (element.removeEventListener) {
          element.removeEventListener(eventName, handler, false);
        } else {
          element.detachEvent("on" + eventName, handlerWrapper);
        }
      }
    }
  };
};
;/**
 * HTML Sanitizer
 * Rewrites the HTML based on given rules
 *
 * @param {Element|String} elementOrHtml HTML String to be sanitized OR element whose content should be sanitized
 * @param {Object} [rules] List of rules for rewriting the HTML, if there's no rule for an element it will
 *    be converted to a "span". Each rule is a key/value pair where key is the tag to convert, and value the
 *    desired substitution.
 * @param {Object} context Document object in which to parse the html, needed to sandbox the parsing
 *
 * @return {Element|String} Depends on the elementOrHtml parameter. When html then the sanitized html as string elsewise the element.
 *
 * @example
 *    var userHTML = '<div id="foo" onclick="alert(1);"><p><font color="red">foo</font><script>alert(1);</script></p></div>';
 *    wysihtml5.dom.parse(userHTML, {
 *      tags {
 *        p:      "div",      // Rename p tags to div tags
 *        font:   "span"      // Rename font tags to span tags
 *        div:    true,       // Keep them, also possible (same result when passing: "div" or true)
 *        script: undefined   // Remove script elements
 *      }
 *    });
 *    // => <div><div><span>foo bar</span></div></div>
 *
 *    var userHTML = '<table><tbody><tr><td>I'm a table!</td></tr></tbody></table>';
 *    wysihtml5.dom.parse(userHTML);
 *    // => '<span><span><span><span>I'm a table!</span></span></span></span>'
 *
 *    var userHTML = '<div>foobar<br>foobar</div>';
 *    wysihtml5.dom.parse(userHTML, {
 *      tags: {
 *        div: undefined,
 *        br:  true
 *      }
 *    });
 *    // => ''
 *
 *    var userHTML = '<div class="red">foo</div><div class="pink">bar</div>';
 *    wysihtml5.dom.parse(userHTML, {
 *      classes: {
 *        red:    1,
 *        green:  1
 *      },
 *      tags: {
 *        div: {
 *          rename_tag:     "p"
 *        }
 *      }
 *    });
 *    // => '<p class="red">foo</p><p>bar</p>'
 */

wysihtml5.dom.parse = (function() {

  /**
   * It's not possible to use a XMLParser/DOMParser as HTML5 is not always well-formed XML
   * new DOMParser().parseFromString('<img src="foo.gif">') will cause a parseError since the
   * node isn't closed
   *
   * Therefore we've to use the browser's ordinary HTML parser invoked by setting innerHTML.
   */
  var NODE_TYPE_MAPPING = {
        "1": _handleElement,
        "3": _handleText
      },
      // Rename unknown tags to this
      DEFAULT_NODE_NAME   = "span",
      WHITE_SPACE_REG_EXP = /\s+/,
      defaultRules        = { tags: {}, classes: {} },
      currentRules        = {},
      uneditableClass     = false;

  /**
   * Iterates over all childs of the element, recreates them, appends them into a document fragment
   * which later replaces the entire body content
   */
   function parse(elementOrHtml, config) {
    wysihtml5.lang.object(currentRules).merge(defaultRules).merge(config.rules).get();

    var context       = config.context || elementOrHtml.ownerDocument || document,
        fragment      = context.createDocumentFragment(),
        isString      = typeof(elementOrHtml) === "string",
        clearInternals = false,
        element,
        newNode,
        firstChild;

    if (config.clearInternals === true) {
      clearInternals = true;
    }

    if (config.uneditableClass) {
      uneditableClass = config.uneditableClass;
    }

    if (isString) {
      element = wysihtml5.dom.getAsDom(elementOrHtml, context);
    } else {
      element = elementOrHtml;
    }

    while (element.firstChild) {
      firstChild = element.firstChild;
      newNode = _convert(firstChild, config.cleanUp, clearInternals);
      if (newNode) {
        fragment.appendChild(newNode);
      }
      if (firstChild !== newNode) {
        element.removeChild(firstChild);
      }
    }

    // Clear element contents
    element.innerHTML = "";

    // Insert new DOM tree
    element.appendChild(fragment);

    return isString ? wysihtml5.quirks.getCorrectInnerHTML(element) : element;
  }

  function _convert(oldNode, cleanUp, clearInternals) {
    var oldNodeType     = oldNode.nodeType,
        oldChilds       = oldNode.childNodes,
        oldChildsLength = oldChilds.length,
        method          = NODE_TYPE_MAPPING[oldNodeType],
        i               = 0,
        fragment,
        newNode,
        newChild;

    // Passes directly elemets with uneditable class
    if (uneditableClass && oldNodeType === 1 && wysihtml5.dom.hasClass(oldNode, uneditableClass)) {
        return oldNode;
    }

    newNode = method && method(oldNode, clearInternals);

    // Remove or unwrap node in case of return value null or false
    if (!newNode) {
        if (newNode === false) {
            // false defines that tag should be removed but contents should remain (unwrap)
            fragment = oldNode.ownerDocument.createDocumentFragment();

            for (i = oldChildsLength; i--;) {
              if (oldChilds[i]) {
                newChild = _convert(oldChilds[i], cleanUp, clearInternals);
                if (newChild) {
                  if (oldChilds[i] === newChild) {
                    i--;
                  }
                  fragment.insertBefore(newChild, fragment.firstChild);
                }
              }
            }

            // TODO: try to minimize surplus spaces
            if (wysihtml5.lang.array([
                "div", "pre", "p",
                "table", "td", "th",
                "ul", "ol", "li",
                "dd", "dl",
                "footer", "header", "section",
                "h1", "h2", "h3", "h4", "h5", "h6"
            ]).contains(oldNode.nodeName.toLowerCase()) && oldNode.parentNode.lastChild !== oldNode) {
                // add space at first when unwraping non-textflow elements
                if (!oldNode.nextSibling || oldNode.nextSibling.nodeType !== 3 || !(/^\s/).test(oldNode.nextSibling.nodeValue)) {
                  fragment.appendChild(oldNode.ownerDocument.createTextNode(" "));
                }
            }

            if (fragment.normalize) {
              fragment.normalize();
            }
            return fragment;
        } else {
          // Remove
          return null;
        }
    }

    // Converts all childnodes
    for (i=0; i<oldChildsLength; i++) {
      if (oldChilds[i]) {
        newChild = _convert(oldChilds[i], cleanUp, clearInternals);
        if (newChild) {
          if (oldChilds[i] === newChild) {
            i--;
          }
          newNode.appendChild(newChild);
        }
      }
    }

    // Cleanup senseless <span> elements
    if (cleanUp &&
        newNode.nodeName.toLowerCase() === DEFAULT_NODE_NAME &&
        (!newNode.childNodes.length ||
         ((/^\s*$/gi).test(newNode.innerHTML) && (clearInternals || (oldNode.className !== "_wysihtml5-temp-placeholder" && oldNode.className !== "rangySelectionBoundary"))) ||
         !newNode.attributes.length)
        ) {
      fragment = newNode.ownerDocument.createDocumentFragment();
      while (newNode.firstChild) {
        fragment.appendChild(newNode.firstChild);
      }
      if (fragment.normalize) {
        fragment.normalize();
      }
      return fragment;
    }

    if (newNode.normalize) {
      newNode.normalize();
    }
    return newNode;
  }

  function _handleElement(oldNode, clearInternals) {
    var rule,
        newNode,
        tagRules    = currentRules.tags,
        nodeName    = oldNode.nodeName.toLowerCase(),
        scopeName   = oldNode.scopeName;

    /**
     * We already parsed that element
     * ignore it! (yes, this sometimes happens in IE8 when the html is invalid)
     */
    if (oldNode._wysihtml5) {
      return null;
    }
    oldNode._wysihtml5 = 1;

    if (oldNode.className === "wysihtml5-temp") {
      return null;
    }

    /**
     * IE is the only browser who doesn't include the namespace in the
     * nodeName, that's why we have to prepend it by ourselves
     * scopeName is a proprietary IE feature
     * read more here http://msdn.microsoft.com/en-us/library/ms534388(v=vs.85).aspx
     */
    if (scopeName && scopeName != "HTML") {
      nodeName = scopeName + ":" + nodeName;
    }
    /**
     * Repair node
     * IE is a bit bitchy when it comes to invalid nested markup which includes unclosed tags
     * A <p> doesn't need to be closed according HTML4-5 spec, we simply replace it with a <div> to preserve its content and layout
     */
    if ("outerHTML" in oldNode) {
      if (!wysihtml5.browser.autoClosesUnclosedTags() &&
          oldNode.nodeName === "P" &&
          oldNode.outerHTML.slice(-4).toLowerCase() !== "</p>") {
        nodeName = "div";
      }
    }

    if (nodeName in tagRules) {
      rule = tagRules[nodeName];
      if (!rule || rule.remove) {
        return null;
      } else if (rule.unwrap) {
        return false;
      }
      rule = typeof(rule) === "string" ? { rename_tag: rule } : rule;
    } else if (oldNode.firstChild) {
      rule = { rename_tag: DEFAULT_NODE_NAME };
    } else {
      // Remove empty unknown elements
      return null;
    }

    newNode = oldNode.ownerDocument.createElement(rule.rename_tag || nodeName);
    _handleAttributes(oldNode, newNode, rule, clearInternals);
    _handleStyles(oldNode, newNode, rule);
    // tests if type condition is met or node should be removed/unwrapped
    if (rule.one_of_type && !_testTypes(oldNode, currentRules, rule.one_of_type, clearInternals)) {
      return (rule.remove_action && rule.remove_action == "unwrap") ? false : null;
    }

    oldNode = null;

    if (newNode.normalize) { newNode.normalize(); }
    return newNode;
  }

  function _testTypes(oldNode, rules, types, clearInternals) {
    var definition, type;

    // do not interfere with placeholder span or pasting caret position is not maintained
    if (oldNode.nodeName === "SPAN" && !clearInternals && (oldNode.className === "_wysihtml5-temp-placeholder" || oldNode.className === "rangySelectionBoundary")) {
      return true;
    }

    for (type in types) {
      if (types.hasOwnProperty(type) && rules.type_definitions && rules.type_definitions[type]) {
        definition = rules.type_definitions[type];
        if (_testType(oldNode, definition)) {
          return true;
        }
      }
    }
    return false;
  }

  function array_contains(a, obj) {
      var i = a.length;
      while (i--) {
         if (a[i] === obj) {
             return true;
         }
      }
      return false;
  }

  function _testType(oldNode, definition) {

    var nodeClasses = oldNode.getAttribute("class"),
        nodeStyles =  oldNode.getAttribute("style"),
        classesLength, s, s_corrected, a, attr, currentClass, styleProp;

    // test for methods
    if (definition.methods) {
      for (var m in definition.methods) {
        if (definition.methods.hasOwnProperty(m) && typeCeckMethods[m]) {

          if (typeCeckMethods[m](oldNode)) {
            return true;
          }
        }
      }
    }

    // test for classes, if one found return true
    if (nodeClasses && definition.classes) {
      nodeClasses = nodeClasses.replace(/^\s+/g, '').replace(/\s+$/g, '').split(WHITE_SPACE_REG_EXP);
      classesLength = nodeClasses.length;
      for (var i = 0; i < classesLength; i++) {
        if (definition.classes[nodeClasses[i]]) {
          return true;
        }
      }
    }

    // test for styles, if one found return true
    if (nodeStyles && definition.styles) {

      nodeStyles = nodeStyles.split(';');
      for (s in definition.styles) {
        if (definition.styles.hasOwnProperty(s)) {
          for (var sp = nodeStyles.length; sp--;) {
            styleProp = nodeStyles[sp].split(':');

            if (styleProp[0].replace(/\s/g, '').toLowerCase() === s) {
              if (definition.styles[s] === true || definition.styles[s] === 1 || wysihtml5.lang.array(definition.styles[s]).contains(styleProp[1].replace(/\s/g, '').toLowerCase()) ) {
                return true;
              }
            }
          }
        }
      }
    }

    // test for attributes in general against regex match
    if (definition.attrs) {
        for (a in definition.attrs) {
            if (definition.attrs.hasOwnProperty(a)) {
                attr = _getAttribute(oldNode, a);
                if (typeof(attr) === "string") {
                    if (attr.search(definition.attrs[a]) > -1) {
                        return true;
                    }
                }
            }
        }
    }
    return false;
  }

  function _handleStyles(oldNode, newNode, rule) {
    var s;
    if(rule && rule.keep_styles) {
      for (s in rule.keep_styles) {
        if (rule.keep_styles.hasOwnProperty(s)) {
          if (s == "float") {
            // IE compability
            if (oldNode.style.styleFloat) {
              newNode.style.styleFloat = oldNode.style.styleFloat;
            }
            if (oldNode.style.cssFloat) {
              newNode.style.cssFloat = oldNode.style.cssFloat;
            }
           } else if (oldNode.style[s]) {
             newNode.style[s] = oldNode.style[s];
           }
        }
      }
    }
  }

  // TODO: refactor. Too long to read
  function _handleAttributes(oldNode, newNode, rule, clearInternals) {
    var attributes          = {},                         // fresh new set of attributes to set on newNode
        setClass            = rule.set_class,             // classes to set
        addClass            = rule.add_class,             // add classes based on existing attributes
        addStyle            = rule.add_style,             // add styles based on existing attributes
        setAttributes       = rule.set_attributes,        // attributes to set on the current node
        checkAttributes     = rule.check_attributes,      // check/convert values of attributes
        allowedClasses      = currentRules.classes,
        i                   = 0,
        classes             = [],
        styles              = [],
        newClasses          = [],
        oldClasses          = [],
        classesLength,
        newClassesLength,
        currentClass,
        newClass,
        attributeName,
        newAttributeValue,
        method;

    if (setAttributes) {
      attributes = wysihtml5.lang.object(setAttributes).clone();
    }

    if (checkAttributes) {
      for (attributeName in checkAttributes) {
        method = attributeCheckMethods[checkAttributes[attributeName]];
        if (!method) {
          continue;
        }
        oldAttribute = _getAttribute(oldNode, attributeName);
        if (oldAttribute || (attributeName === "alt" && oldNode.nodeName == "IMG")) {
          newAttributeValue = method(oldAttribute);
          if (typeof(newAttributeValue) === "string") {
            attributes[attributeName] = newAttributeValue;
          }
        }
      }
    }

    if (setClass) {
      classes.push(setClass);
    }

    if (addClass) {
      for (attributeName in addClass) {
        method = addClassMethods[addClass[attributeName]];
        if (!method) {
          continue;
        }
        newClass = method(_getAttribute(oldNode, attributeName));
        if (typeof(newClass) === "string") {
          classes.push(newClass);
        }
      }
    }

    if (addStyle) {
      for (attributeName in addStyle) {
        method = addStyleMethods[addStyle[attributeName]];
        if (!method) {
          continue;
        }

        newStyle = method(_getAttribute(oldNode, attributeName));
        if (typeof(newStyle) === "string") {
          styles.push(newStyle);
        }
      }
    }


    if (typeof(allowedClasses) === "string" && allowedClasses === "any" && oldNode.getAttribute("class")) {
      attributes["class"] = oldNode.getAttribute("class");
    } else {
      // make sure that wysihtml5 temp class doesn't get stripped out
      if (!clearInternals) {
        allowedClasses["_wysihtml5-temp-placeholder"] = 1;
        allowedClasses["_rangySelectionBoundary"] = 1;
        allowedClasses["wysiwyg-tmp-selected-cell"] = 1;
      }

      // add old classes last
      oldClasses = oldNode.getAttribute("class");
      if (oldClasses) {
        classes = classes.concat(oldClasses.split(WHITE_SPACE_REG_EXP));
      }
      classesLength = classes.length;
      for (; i<classesLength; i++) {
        currentClass = classes[i];
        if (allowedClasses[currentClass]) {
          newClasses.push(currentClass);
        }
      }

      if (newClasses.length) {
        attributes["class"] = wysihtml5.lang.array(newClasses).unique().join(" ");
      }
    }

    // remove table selection class if present
    if (attributes["class"] && clearInternals) {
      attributes["class"] = attributes["class"].replace("wysiwyg-tmp-selected-cell", "");
      if ((/^\s*$/g).test(attributes["class"])) {
        delete attributes.class;
      }
    }

    if (styles.length) {
      attributes["style"] = wysihtml5.lang.array(styles).unique().join(" ");
    }

    // set attributes on newNode
    for (attributeName in attributes) {
      // Setting attributes can cause a js error in IE under certain circumstances
      // eg. on a <img> under https when it's new attribute value is non-https
      // TODO: Investigate this further and check for smarter handling
      try {
        newNode.setAttribute(attributeName, attributes[attributeName]);
      } catch(e) {}
    }

    // IE8 sometimes loses the width/height attributes when those are set before the "src"
    // so we make sure to set them again
    if (attributes.src) {
      if (typeof(attributes.width) !== "undefined") {
        newNode.setAttribute("width", attributes.width);
      }
      if (typeof(attributes.height) !== "undefined") {
        newNode.setAttribute("height", attributes.height);
      }
    }
  }

  /**
   * IE gives wrong results for hasAttribute/getAttribute, for example:
   *    var td = document.createElement("td");
   *    td.getAttribute("rowspan"); // => "1" in IE
   *
   * Therefore we have to check the element's outerHTML for the attribute
   */
  var HAS_GET_ATTRIBUTE_BUG = !wysihtml5.browser.supportsGetAttributeCorrectly();
  function _getAttribute(node, attributeName) {
    attributeName = attributeName.toLowerCase();
    var nodeName = node.nodeName;
    if (nodeName == "IMG" && attributeName == "src" && _isLoadedImage(node) === true) {
      // Get 'src' attribute value via object property since this will always contain the
      // full absolute url (http://...)
      // this fixes a very annoying bug in firefox (ver 3.6 & 4) and IE 8 where images copied from the same host
      // will have relative paths, which the sanitizer strips out (see attributeCheckMethods.url)
      return node.src;
    } else if (HAS_GET_ATTRIBUTE_BUG && "outerHTML" in node) {
      // Don't trust getAttribute/hasAttribute in IE 6-8, instead check the element's outerHTML
      var outerHTML      = node.outerHTML.toLowerCase(),
          // TODO: This might not work for attributes without value: <input disabled>
          hasAttribute   = outerHTML.indexOf(" " + attributeName +  "=") != -1;

      return hasAttribute ? node.getAttribute(attributeName) : null;
    } else{
      return node.getAttribute(attributeName);
    }
  }

  /**
   * Check whether the given node is a proper loaded image
   * FIXME: Returns undefined when unknown (Chrome, Safari)
   */
  function _isLoadedImage(node) {
    try {
      return node.complete && !node.mozMatchesSelector(":-moz-broken");
    } catch(e) {
      if (node.complete && node.readyState === "complete") {
        return true;
      }
    }
  }

  var INVISIBLE_SPACE_REG_EXP = /\uFEFF/g;
  function _handleText(oldNode) {
    var nextSibling = oldNode.nextSibling;
    if (nextSibling && nextSibling.nodeType === wysihtml5.TEXT_NODE) {
      // Concatenate text nodes
      nextSibling.data = oldNode.data.replace(INVISIBLE_SPACE_REG_EXP, "") + nextSibling.data.replace(INVISIBLE_SPACE_REG_EXP, "");
    } else {
      // \uFEFF = wysihtml5.INVISIBLE_SPACE (used as a hack in certain rich text editing situations)
      var data = oldNode.data.replace(INVISIBLE_SPACE_REG_EXP, "");
      return oldNode.ownerDocument.createTextNode(data);
    }
  }


  // ------------ attribute checks ------------ \\
  var attributeCheckMethods = {
    url: (function() {
      var REG_EXP = /^https?:\/\//i;
      return function(attributeValue) {
        if (!attributeValue || !attributeValue.match(REG_EXP)) {
          return null;
        }
        return attributeValue.replace(REG_EXP, function(match) {
          return match.toLowerCase();
        });
      };
    })(),

    src: (function() {
      var REG_EXP = /^(\/|https?:\/\/)/i;
      return function(attributeValue) {
        if (!attributeValue || !attributeValue.match(REG_EXP)) {
          return null;
        }
        return attributeValue.replace(REG_EXP, function(match) {
          return match.toLowerCase();
        });
      };
    })(),

    href: (function() {
      var REG_EXP = /^(#|\/|https?:\/\/|mailto:)/i;
      return function(attributeValue) {
        if (!attributeValue || !attributeValue.match(REG_EXP)) {
          return null;
        }
        return attributeValue.replace(REG_EXP, function(match) {
          return match.toLowerCase();
        });
      };
    })(),

    alt: (function() {
      var REG_EXP = /[^ a-z0-9_\-]/gi;
      return function(attributeValue) {
        if (!attributeValue) {
          return "";
        }
        return attributeValue.replace(REG_EXP, "");
      };
    })(),

    numbers: (function() {
      var REG_EXP = /\D/g;
      return function(attributeValue) {
        attributeValue = (attributeValue || "").replace(REG_EXP, "");
        return attributeValue || null;
      };
    })(),

    any: (function() {
      return function(attributeValue) {
        return attributeValue;
      };
    })()
  };

  // ------------ style converter (converts an html attribute to a style) ------------ \\
  var addStyleMethods = {
    align_text: (function() {
      var mapping = {
        left:     "text-align: left;",
        right:    "text-align: right;",
        center:   "text-align: center;"
      };
      return function(attributeValue) {
        return mapping[String(attributeValue).toLowerCase()];
      };
    })(),
  };

  // ------------ class converter (converts an html attribute to a class name) ------------ \\
  var addClassMethods = {
    align_img: (function() {
      var mapping = {
        left:   "wysiwyg-float-left",
        right:  "wysiwyg-float-right"
      };
      return function(attributeValue) {
        return mapping[String(attributeValue).toLowerCase()];
      };
    })(),

    align_text: (function() {
      var mapping = {
        left:     "wysiwyg-text-align-left",
        right:    "wysiwyg-text-align-right",
        center:   "wysiwyg-text-align-center",
        justify:  "wysiwyg-text-align-justify"
      };
      return function(attributeValue) {
        return mapping[String(attributeValue).toLowerCase()];
      };
    })(),

    clear_br: (function() {
      var mapping = {
        left:   "wysiwyg-clear-left",
        right:  "wysiwyg-clear-right",
        both:   "wysiwyg-clear-both",
        all:    "wysiwyg-clear-both"
      };
      return function(attributeValue) {
        return mapping[String(attributeValue).toLowerCase()];
      };
    })(),

    size_font: (function() {
      var mapping = {
        "1": "wysiwyg-font-size-xx-small",
        "2": "wysiwyg-font-size-small",
        "3": "wysiwyg-font-size-medium",
        "4": "wysiwyg-font-size-large",
        "5": "wysiwyg-font-size-x-large",
        "6": "wysiwyg-font-size-xx-large",
        "7": "wysiwyg-font-size-xx-large",
        "-": "wysiwyg-font-size-smaller",
        "+": "wysiwyg-font-size-larger"
      };
      return function(attributeValue) {
        return mapping[String(attributeValue).charAt(0)];
      };
    })()
  };

  // checks if element is possibly visible
  var typeCeckMethods = {
    has_visible_contet: (function() {
      var txt,
          isVisible = false,
          visibleElements = ['img', 'video', 'picture', 'br', 'script', 'noscript',
                             'style', 'table', 'iframe', 'object', 'embed', 'audio',
                             'svg', 'input', 'button', 'select','textarea', 'canvas'];

      return function(el) {

        // has visible innertext. so is visible
        txt = (el.innerText || el.textContent).replace(/\s/g, '');
        if (txt && txt.length > 0) {
          return true;
        }

        // matches list of visible dimensioned elements
        for (var i = visibleElements.length; i--;) {
          if (el.querySelector(visibleElements[i])) {
            return true;
          }
        }

        // try to measure dimesions in last resort. (can find only of elements in dom)
        if (el.offsetWidth && el.offsetWidth > 0 && el.offsetHeight && el.offsetHeight > 0) {
          return true;
        }

        return false;
      };
    })()
  };

  return parse;
})();
;/**
 * Checks for empty text node childs and removes them
 *
 * @param {Element} node The element in which to cleanup
 * @example
 *    wysihtml5.dom.removeEmptyTextNodes(element);
 */
wysihtml5.dom.removeEmptyTextNodes = function(node) {
  var childNode,
      childNodes        = wysihtml5.lang.array(node.childNodes).get(),
      childNodesLength  = childNodes.length,
      i                 = 0;
  for (; i<childNodesLength; i++) {
    childNode = childNodes[i];
    if (childNode.nodeType === wysihtml5.TEXT_NODE && childNode.data === "") {
      childNode.parentNode.removeChild(childNode);
    }
  }
};
;/**
 * Renames an element (eg. a <div> to a <p>) and keeps its childs
 *
 * @param {Element} element The list element which should be renamed
 * @param {Element} newNodeName The desired tag name
 *
 * @example
 *    <!-- Assume the following dom: -->
 *    <ul id="list">
 *      <li>eminem</li>
 *      <li>dr. dre</li>
 *      <li>50 Cent</li>
 *    </ul>
 *
 *    <script>
 *      wysihtml5.dom.renameElement(document.getElementById("list"), "ol");
 *    </script>
 *
 *    <!-- Will result in: -->
 *    <ol>
 *      <li>eminem</li>
 *      <li>dr. dre</li>
 *      <li>50 Cent</li>
 *    </ol>
 */
wysihtml5.dom.renameElement = function(element, newNodeName) {
  var newElement = element.ownerDocument.createElement(newNodeName),
      firstChild;
  while (firstChild = element.firstChild) {
    newElement.appendChild(firstChild);
  }
  wysihtml5.dom.copyAttributes(["align", "className"]).from(element).to(newElement);
  element.parentNode.replaceChild(newElement, element);
  return newElement;
};
;/**
 * Takes an element, removes it and replaces it with it's childs
 *
 * @param {Object} node The node which to replace with it's child nodes
 * @example
 *    <div id="foo">
 *      <span>hello</span>
 *    </div>
 *    <script>
 *      // Remove #foo and replace with it's children
 *      wysihtml5.dom.replaceWithChildNodes(document.getElementById("foo"));
 *    </script>
 */
wysihtml5.dom.replaceWithChildNodes = function(node) {
  if (!node.parentNode) {
    return;
  }

  if (!node.firstChild) {
    node.parentNode.removeChild(node);
    return;
  }

  var fragment = node.ownerDocument.createDocumentFragment();
  while (node.firstChild) {
    fragment.appendChild(node.firstChild);
  }
  node.parentNode.replaceChild(fragment, node);
  node = fragment = null;
};
;/**
 * Unwraps an unordered/ordered list
 *
 * @param {Element} element The list element which should be unwrapped
 *
 * @example
 *    <!-- Assume the following dom: -->
 *    <ul id="list">
 *      <li>eminem</li>
 *      <li>dr. dre</li>
 *      <li>50 Cent</li>
 *    </ul>
 *
 *    <script>
 *      wysihtml5.dom.resolveList(document.getElementById("list"));
 *    </script>
 *
 *    <!-- Will result in: -->
 *    eminem<br>
 *    dr. dre<br>
 *    50 Cent<br>
 */
(function(dom) {
  function _isBlockElement(node) {
    return dom.getStyle("display").from(node) === "block";
  }

  function _isLineBreak(node) {
    return node.nodeName === "BR";
  }

  function _appendLineBreak(element) {
    var lineBreak = element.ownerDocument.createElement("br");
    element.appendChild(lineBreak);
  }

  function resolveList(list, useLineBreaks) {
    if (!list.nodeName.match(/^(MENU|UL|OL)$/)) {
      return;
    }

    var doc             = list.ownerDocument,
        fragment        = doc.createDocumentFragment(),
        previousSibling = wysihtml5.dom.domNode(list).prev({ignoreBlankTexts: true}),
        firstChild,
        lastChild,
        isLastChild,
        shouldAppendLineBreak,
        paragraph,
        listItem;

    if (useLineBreaks) {
      // Insert line break if list is after a non-block element
      if (previousSibling && !_isBlockElement(previousSibling) && !_isLineBreak(previousSibling)) {
        _appendLineBreak(fragment);
      }

      while (listItem = (list.firstElementChild || list.firstChild)) {
        lastChild = listItem.lastChild;
        while (firstChild = listItem.firstChild) {
          isLastChild           = firstChild === lastChild;
          // This needs to be done before appending it to the fragment, as it otherwise will lose style information
          shouldAppendLineBreak = isLastChild && !_isBlockElement(firstChild) && !_isLineBreak(firstChild);
          fragment.appendChild(firstChild);
          if (shouldAppendLineBreak) {
            _appendLineBreak(fragment);
          }
        }

        listItem.parentNode.removeChild(listItem);
      }
    } else {
      while (listItem = (list.firstElementChild || list.firstChild)) {
        if (listItem.querySelector && listItem.querySelector("div, p, ul, ol, menu, blockquote, h1, h2, h3, h4, h5, h6")) {
          while (firstChild = listItem.firstChild) {
            fragment.appendChild(firstChild);
          }
        } else {
          paragraph = doc.createElement("p");
          while (firstChild = listItem.firstChild) {
            paragraph.appendChild(firstChild);
          }
          fragment.appendChild(paragraph);
        }
        listItem.parentNode.removeChild(listItem);
      }
    }

    list.parentNode.replaceChild(fragment, list);
  }

  dom.resolveList = resolveList;
})(wysihtml5.dom);
;/**
 * Sandbox for executing javascript, parsing css styles and doing dom operations in a secure way
 *
 * Browser Compatibility:
 *  - Secure in MSIE 6+, but only when the user hasn't made changes to his security level "restricted"
 *  - Partially secure in other browsers (Firefox, Opera, Safari, Chrome, ...)
 *
 * Please note that this class can't benefit from the HTML5 sandbox attribute for the following reasons:
 *    - sandboxing doesn't work correctly with inlined content (src="javascript:'<html>...</html>'")
 *    - sandboxing of physical documents causes that the dom isn't accessible anymore from the outside (iframe.contentWindow, ...)
 *    - setting the "allow-same-origin" flag would fix that, but then still javascript and dom events refuse to fire
 *    - therefore the "allow-scripts" flag is needed, which then would deactivate any security, as the js executed inside the iframe
 *      can do anything as if the sandbox attribute wasn't set
 *
 * @param {Function} [readyCallback] Method that gets invoked when the sandbox is ready
 * @param {Object} [config] Optional parameters
 *
 * @example
 *    new wysihtml5.dom.Sandbox(function(sandbox) {
 *      sandbox.getWindow().document.body.innerHTML = '<img src=foo.gif onerror="alert(document.cookie)">';
 *    });
 */
(function(wysihtml5) {
  var /**
       * Default configuration
       */
      doc                 = document,
      /**
       * Properties to unset/protect on the window object
       */
      windowProperties    = [
        "parent", "top", "opener", "frameElement", "frames",
        "localStorage", "globalStorage", "sessionStorage", "indexedDB"
      ],
      /**
       * Properties on the window object which are set to an empty function
       */
      windowProperties2   = [
        "open", "close", "openDialog", "showModalDialog",
        "alert", "confirm", "prompt",
        "openDatabase", "postMessage",
        "XMLHttpRequest", "XDomainRequest"
      ],
      /**
       * Properties to unset/protect on the document object
       */
      documentProperties  = [
        "referrer",
        "write", "open", "close"
      ];

  wysihtml5.dom.Sandbox = Base.extend(
    /** @scope wysihtml5.dom.Sandbox.prototype */ {

    constructor: function(readyCallback, config) {
      this.callback = readyCallback || wysihtml5.EMPTY_FUNCTION;
      this.config   = wysihtml5.lang.object({}).merge(config).get();
      this.editableArea   = this._createIframe();
    },

    insertInto: function(element) {
      if (typeof(element) === "string") {
        element = doc.getElementById(element);
      }

      element.appendChild(this.editableArea);
    },

    getIframe: function() {
      return this.editableArea;
    },

    getWindow: function() {
      this._readyError();
    },

    getDocument: function() {
      this._readyError();
    },

    destroy: function() {
      var iframe = this.getIframe();
      iframe.parentNode.removeChild(iframe);
    },

    _readyError: function() {
      throw new Error("wysihtml5.Sandbox: Sandbox iframe isn't loaded yet");
    },

    /**
     * Creates the sandbox iframe
     *
     * Some important notes:
     *  - We can't use HTML5 sandbox for now:
     *    setting it causes that the iframe's dom can't be accessed from the outside
     *    Therefore we need to set the "allow-same-origin" flag which enables accessing the iframe's dom
     *    But then there's another problem, DOM events (focus, blur, change, keypress, ...) aren't fired.
     *    In order to make this happen we need to set the "allow-scripts" flag.
     *    A combination of allow-scripts and allow-same-origin is almost the same as setting no sandbox attribute at all.
     *  - Chrome & Safari, doesn't seem to support sandboxing correctly when the iframe's html is inlined (no physical document)
     *  - IE needs to have the security="restricted" attribute set before the iframe is
     *    inserted into the dom tree
     *  - Believe it or not but in IE "security" in document.createElement("iframe") is false, even
     *    though it supports it
     *  - When an iframe has security="restricted", in IE eval() & execScript() don't work anymore
     *  - IE doesn't fire the onload event when the content is inlined in the src attribute, therefore we rely
     *    on the onreadystatechange event
     */
    _createIframe: function() {
      var that   = this,
          iframe = doc.createElement("iframe");
      iframe.className = "wysihtml5-sandbox";
      wysihtml5.dom.setAttributes({
        "security":           "restricted",
        "allowtransparency":  "true",
        "frameborder":        0,
        "width":              0,
        "height":             0,
        "marginwidth":        0,
        "marginheight":       0
      }).on(iframe);

      // Setting the src like this prevents ssl warnings in IE6
      if (wysihtml5.browser.throwsMixedContentWarningWhenIframeSrcIsEmpty()) {
        iframe.src = "javascript:'<html></html>'";
      }

      iframe.onload = function() {
        iframe.onreadystatechange = iframe.onload = null;
        that._onLoadIframe(iframe);
      };

      iframe.onreadystatechange = function() {
        if (/loaded|complete/.test(iframe.readyState)) {
          iframe.onreadystatechange = iframe.onload = null;
          that._onLoadIframe(iframe);
        }
      };

      return iframe;
    },

    /**
     * Callback for when the iframe has finished loading
     */
    _onLoadIframe: function(iframe) {
      // don't resume when the iframe got unloaded (eg. by removing it from the dom)
      if (!wysihtml5.dom.contains(doc.documentElement, iframe)) {
        return;
      }

      var that           = this,
          iframeWindow   = iframe.contentWindow,
          iframeDocument = iframe.contentWindow.document,
          charset        = doc.characterSet || doc.charset || "utf-8",
          sandboxHtml    = this._getHtml({
            charset:      charset,
            stylesheets:  this.config.stylesheets
          });

      // Create the basic dom tree including proper DOCTYPE and charset
      iframeDocument.open("text/html", "replace");
      iframeDocument.write(sandboxHtml);
      iframeDocument.close();

      this.getWindow = function() { return iframe.contentWindow; };
      this.getDocument = function() { return iframe.contentWindow.document; };

      // Catch js errors and pass them to the parent's onerror event
      // addEventListener("error") doesn't work properly in some browsers
      // TODO: apparently this doesn't work in IE9!
      iframeWindow.onerror = function(errorMessage, fileName, lineNumber) {
        throw new Error("wysihtml5.Sandbox: " + errorMessage, fileName, lineNumber);
      };

      if (!wysihtml5.browser.supportsSandboxedIframes()) {
        // Unset a bunch of sensitive variables
        // Please note: This isn't hack safe!
        // It more or less just takes care of basic attacks and prevents accidental theft of sensitive information
        // IE is secure though, which is the most important thing, since IE is the only browser, who
        // takes over scripts & styles into contentEditable elements when copied from external websites
        // or applications (Microsoft Word, ...)
        var i, length;
        for (i=0, length=windowProperties.length; i<length; i++) {
          this._unset(iframeWindow, windowProperties[i]);
        }
        for (i=0, length=windowProperties2.length; i<length; i++) {
          this._unset(iframeWindow, windowProperties2[i], wysihtml5.EMPTY_FUNCTION);
        }
        for (i=0, length=documentProperties.length; i<length; i++) {
          this._unset(iframeDocument, documentProperties[i]);
        }
        // This doesn't work in Safari 5
        // See http://stackoverflow.com/questions/992461/is-it-possible-to-override-document-cookie-in-webkit
        this._unset(iframeDocument, "cookie", "", true);
      }

      this.loaded = true;

      // Trigger the callback
      setTimeout(function() { that.callback(that); }, 0);
    },

    _getHtml: function(templateVars) {
      var stylesheets = templateVars.stylesheets,
          html        = "",
          i           = 0,
          length;
      stylesheets = typeof(stylesheets) === "string" ? [stylesheets] : stylesheets;
      if (stylesheets) {
        length = stylesheets.length;
        for (; i<length; i++) {
          html += '<link rel="stylesheet" href="' + stylesheets[i] + '">';
        }
      }
      templateVars.stylesheets = html;

      return wysihtml5.lang.string(
        '<!DOCTYPE html><html><head>'
        + '<meta charset="#{charset}">#{stylesheets}</head>'
        + '<body></body></html>'
      ).interpolate(templateVars);
    },

    /**
     * Method to unset/override existing variables
     * @example
     *    // Make cookie unreadable and unwritable
     *    this._unset(document, "cookie", "", true);
     */
    _unset: function(object, property, value, setter) {
      try { object[property] = value; } catch(e) {}

      try { object.__defineGetter__(property, function() { return value; }); } catch(e) {}
      if (setter) {
        try { object.__defineSetter__(property, function() {}); } catch(e) {}
      }

      if (!wysihtml5.browser.crashesWhenDefineProperty(property)) {
        try {
          var config = {
            get: function() { return value; }
          };
          if (setter) {
            config.set = function() {};
          }
          Object.defineProperty(object, property, config);
        } catch(e) {}
      }
    }
  });
})(wysihtml5);
;(function(wysihtml5) {
  var doc = document;
  wysihtml5.dom.ContentEditableArea = Base.extend({
      getContentEditable: function() {
        return this.element;
      },

      getWindow: function() {
        return this.element.ownerDocument.defaultView;
      },

      getDocument: function() {
        return this.element.ownerDocument;
      },

      constructor: function(readyCallback, config, contentEditable) {
        this.callback = readyCallback || wysihtml5.EMPTY_FUNCTION;
        this.config   = wysihtml5.lang.object({}).merge(config).get();
        if (contentEditable) {
            this.element = this._bindElement(contentEditable);
        } else {
            this.element = this._createElement();
        }
      },

      // creates a new contenteditable and initiates it
      _createElement: function() {
        var element = doc.createElement("div");
        element.className = "wysihtml5-sandbox";
        this._loadElement(element);
        return element;
      },

      // initiates an allready existent contenteditable
      _bindElement: function(contentEditable) {
        contentEditable.className = (contentEditable.className && contentEditable.className != '') ? contentEditable.className + " wysihtml5-sandbox" : "wysihtml5-sandbox";
        this._loadElement(contentEditable, true);
        return contentEditable;
      },

      _loadElement: function(element, contentExists) {
          var that = this;
        if (!contentExists) {
            var sandboxHtml = this._getHtml();
            element.innerHTML = sandboxHtml;
        }

        this.getWindow = function() { return element.ownerDocument.defaultView; };
        this.getDocument = function() { return element.ownerDocument; };

        // Catch js errors and pass them to the parent's onerror event
        // addEventListener("error") doesn't work properly in some browsers
        // TODO: apparently this doesn't work in IE9!
        // TODO: figure out and bind the errors logic for contenteditble mode
        /*iframeWindow.onerror = function(errorMessage, fileName, lineNumber) {
          throw new Error("wysihtml5.Sandbox: " + errorMessage, fileName, lineNumber);
        }
        */
        this.loaded = true;
        // Trigger the callback
        setTimeout(function() { that.callback(that); }, 0);
      },

      _getHtml: function(templateVars) {
        return '';
      }

  });
})(wysihtml5);
;(function() {
  var mapping = {
    "className": "class"
  };
  wysihtml5.dom.setAttributes = function(attributes) {
    return {
      on: function(element) {
        for (var i in attributes) {
          element.setAttribute(mapping[i] || i, attributes[i]);
        }
      }
    };
  };
})();
;wysihtml5.dom.setStyles = function(styles) {
  return {
    on: function(element) {
      var style = element.style;
      if (typeof(styles) === "string") {
        style.cssText += ";" + styles;
        return;
      }
      for (var i in styles) {
        if (i === "float") {
          style.cssFloat = styles[i];
          style.styleFloat = styles[i];
        } else {
          style[i] = styles[i];
        }
      }
    }
  };
};
;/**
 * Simulate HTML5 placeholder attribute
 *
 * Needed since
 *    - div[contentEditable] elements don't support it
 *    - older browsers (such as IE8 and Firefox 3.6) don't support it at all
 *
 * @param {Object} parent Instance of main wysihtml5.Editor class
 * @param {Element} view Instance of wysihtml5.views.* class
 * @param {String} placeholderText
 *
 * @example
 *    wysihtml.dom.simulatePlaceholder(this, composer, "Foobar");
 */
(function(dom) {
  dom.simulatePlaceholder = function(editor, view, placeholderText) {
    var CLASS_NAME = "placeholder",
        unset = function() {
          if (view.hasPlaceholderSet()) {
            view.clear();
            view.element.focus();
            setTimeout(function() {
              var sel = view.selection.getSelection();
              if (!sel.focusNode || !sel.anchorNode) {
                view.selection.selectNode(view.element.firstChild || view.element);
              }
            }, 0);
          }
          view.placeholderSet = false;
          dom.removeClass(view.element, CLASS_NAME);
        },
        set = function() {
          if (view.isEmpty()) {
            view.placeholderSet = true;
            view.setValue(placeholderText);
            dom.addClass(view.element, CLASS_NAME);
          }
        };

    editor
      .on("set_placeholder", set)
      .on("unset_placeholder", unset)
      .on("focus:composer", unset)
      .on("paste:composer", unset)
      .on("blur:composer", set);

    set();
  };
})(wysihtml5.dom);
;(function(dom) {
  var documentElement = document.documentElement;
  if ("textContent" in documentElement) {
    dom.setTextContent = function(element, text) {
      element.textContent = text;
    };

    dom.getTextContent = function(element) {
      return element.textContent;
    };
  } else if ("innerText" in documentElement) {
    dom.setTextContent = function(element, text) {
      element.innerText = text;
    };

    dom.getTextContent = function(element) {
      return element.innerText;
    };
  } else {
    dom.setTextContent = function(element, text) {
      element.nodeValue = text;
    };

    dom.getTextContent = function(element) {
      return element.nodeValue;
    };
  }
})(wysihtml5.dom);

;/**
 * Get a set of attribute from one element
 *
 * IE gives wrong results for hasAttribute/getAttribute, for example:
 *    var td = document.createElement("td");
 *    td.getAttribute("rowspan"); // => "1" in IE
 *
 * Therefore we have to check the element's outerHTML for the attribute
*/

wysihtml5.dom.getAttribute = function(node, attributeName) {
  var HAS_GET_ATTRIBUTE_BUG = !wysihtml5.browser.supportsGetAttributeCorrectly();
  attributeName = attributeName.toLowerCase();
  var nodeName = node.nodeName;
  if (nodeName == "IMG" && attributeName == "src" && _isLoadedImage(node) === true) {
    // Get 'src' attribute value via object property since this will always contain the
    // full absolute url (http://...)
    // this fixes a very annoying bug in firefox (ver 3.6 & 4) and IE 8 where images copied from the same host
    // will have relative paths, which the sanitizer strips out (see attributeCheckMethods.url)
    return node.src;
  } else if (HAS_GET_ATTRIBUTE_BUG && "outerHTML" in node) {
    // Don't trust getAttribute/hasAttribute in IE 6-8, instead check the element's outerHTML
    var outerHTML      = node.outerHTML.toLowerCase(),
        // TODO: This might not work for attributes without value: <input disabled>
        hasAttribute   = outerHTML.indexOf(" " + attributeName +  "=") != -1;

    return hasAttribute ? node.getAttribute(attributeName) : null;
  } else{
    return node.getAttribute(attributeName);
  }
};
;(function(wysihtml5) {

    var api = wysihtml5.dom;

    var MapCell = function(cell) {
      this.el = cell;
      this.isColspan= false;
      this.isRowspan= false;
      this.firstCol= true;
      this.lastCol= true;
      this.firstRow= true;
      this.lastRow= true;
      this.isReal= true;
      this.spanCollection= [];
      this.modified = false;
    };

    var TableModifyerByCell = function (cell, table) {
        if (cell) {
            this.cell = cell;
            this.table = api.getParentElement(cell, { nodeName: ["TABLE"] });
        } else if (table) {
            this.table = table;
            this.cell = this.table.querySelectorAll('th, td')[0];
        }
    };

    function queryInList(list, query) {
        var ret = [],
            q;
        for (var e = 0, len = list.length; e < len; e++) {
            q = list[e].querySelectorAll(query);
            if (q) {
                for(var i = q.length; i--; ret.unshift(q[i]));
            }
        }
        return ret;
    }

    function removeElement(el) {
        el.parentNode.removeChild(el);
    }

    function insertAfter(referenceNode, newNode) {
        referenceNode.parentNode.insertBefore(newNode, referenceNode.nextSibling);
    }

    function nextNode(node, tag) {
        var element = node.nextSibling;
        while (element.nodeType !=1) {
            element = element.nextSibling;
            if (!tag || tag == element.tagName.toLowerCase()) {
                return element;
            }
        }
        return null;
    }

    TableModifyerByCell.prototype = {

        addSpannedCellToMap: function(cell, map, r, c, cspan, rspan) {
            var spanCollect = [],
                rmax = r + ((rspan) ? parseInt(rspan, 10) - 1 : 0),
                cmax = c + ((cspan) ? parseInt(cspan, 10) - 1 : 0);

            for (var rr = r; rr <= rmax; rr++) {
                if (typeof map[rr] == "undefined") { map[rr] = []; }
                for (var cc = c; cc <= cmax; cc++) {
                    map[rr][cc] = new MapCell(cell);
                    map[rr][cc].isColspan = (cspan && parseInt(cspan, 10) > 1);
                    map[rr][cc].isRowspan = (rspan && parseInt(rspan, 10) > 1);
                    map[rr][cc].firstCol = cc == c;
                    map[rr][cc].lastCol = cc == cmax;
                    map[rr][cc].firstRow = rr == r;
                    map[rr][cc].lastRow = rr == rmax;
                    map[rr][cc].isReal = cc == c && rr == r;
                    map[rr][cc].spanCollection = spanCollect;

                    spanCollect.push(map[rr][cc]);
                }
            }
        },

        setCellAsModified: function(cell) {
            cell.modified = true;
            if (cell.spanCollection.length > 0) {
              for (var s = 0, smax = cell.spanCollection.length; s < smax; s++) {
                cell.spanCollection[s].modified = true;
              }
            }
        },

        setTableMap: function() {
            var map = [];
            var tableRows = this.getTableRows(),
                ridx, row, cells, cidx, cell,
                c,
                cspan, rspan;

            for (ridx = 0; ridx < tableRows.length; ridx++) {
                row = tableRows[ridx];
                cells = this.getRowCells(row);
                c = 0;
                if (typeof map[ridx] == "undefined") { map[ridx] = []; }
                for (cidx = 0; cidx < cells.length; cidx++) {
                    cell = cells[cidx];

                    // If cell allready set means it is set by col or rowspan,
                    // so increase cols index until free col is found
                    while (typeof map[ridx][c] != "undefined") { c++; }

                    cspan = api.getAttribute(cell, 'colspan');
                    rspan = api.getAttribute(cell, 'rowspan');

                    if (cspan || rspan) {
                        this.addSpannedCellToMap(cell, map, ridx, c, cspan, rspan);
                        c = c + ((cspan) ? parseInt(cspan, 10) : 1);
                    } else {
                        map[ridx][c] = new MapCell(cell);
                        c++;
                    }
                }
            }
            this.map = map;
            return map;
        },

        getRowCells: function(row) {
            var inlineTables = this.table.querySelectorAll('table'),
                inlineCells = (inlineTables) ? queryInList(inlineTables, 'th, td') : [],
                allCells = row.querySelectorAll('th, td'),
                tableCells = (inlineCells.length > 0) ? wysihtml5.lang.array(allCells).without(inlineCells) : allCells;

            return tableCells;
        },

        getTableRows: function() {
          var inlineTables = this.table.querySelectorAll('table'),
              inlineRows = (inlineTables) ? queryInList(inlineTables, 'tr') : [],
              allRows = this.table.querySelectorAll('tr'),
              tableRows = (inlineRows.length > 0) ? wysihtml5.lang.array(allRows).without(inlineRows) : allRows;

          return tableRows;
        },

        getMapIndex: function(cell) {
          var r_length = this.map.length,
              c_length = (this.map && this.map[0]) ? this.map[0].length : 0;

          for (var r_idx = 0;r_idx < r_length; r_idx++) {
              for (var c_idx = 0;c_idx < c_length; c_idx++) {
                  if (this.map[r_idx][c_idx].el === cell) {
                      return {'row': r_idx, 'col': c_idx};
                  }
              }
          }
          return false;
        },

        getElementAtIndex: function(idx) {
            this.setTableMap();
            if (this.map[idx.row] && this.map[idx.row][idx.col] && this.map[idx.row][idx.col].el) {
                return this.map[idx.row][idx.col].el;
            }
            return null;
        },

        getMapElsTo: function(to_cell) {
            var els = [];
            this.setTableMap();
            this.idx_start = this.getMapIndex(this.cell);
            this.idx_end = this.getMapIndex(to_cell);

            // switch indexes if start is bigger than end
            if (this.idx_start.row > this.idx_end.row || (this.idx_start.row == this.idx_end.row && this.idx_start.col > this.idx_end.col)) {
                var temp_idx = this.idx_start;
                this.idx_start = this.idx_end;
                this.idx_end = temp_idx;
            }
            if (this.idx_start.col > this.idx_end.col) {
                var temp_cidx = this.idx_start.col;
                this.idx_start.col = this.idx_end.col;
                this.idx_end.col = temp_cidx;
            }

            if (this.idx_start != null && this.idx_end != null) {
                for (var row = this.idx_start.row, maxr = this.idx_end.row; row <= maxr; row++) {
                    for (var col = this.idx_start.col, maxc = this.idx_end.col; col <= maxc; col++) {
                        els.push(this.map[row][col].el);
                    }
                }
            }
            return els;
        },

        orderSelectionEnds: function(secondcell) {
            this.setTableMap();
            this.idx_start = this.getMapIndex(this.cell);
            this.idx_end = this.getMapIndex(secondcell);

            // switch indexes if start is bigger than end
            if (this.idx_start.row > this.idx_end.row || (this.idx_start.row == this.idx_end.row && this.idx_start.col > this.idx_end.col)) {
                var temp_idx = this.idx_start;
                this.idx_start = this.idx_end;
                this.idx_end = temp_idx;
            }
            if (this.idx_start.col > this.idx_end.col) {
                var temp_cidx = this.idx_start.col;
                this.idx_start.col = this.idx_end.col;
                this.idx_end.col = temp_cidx;
            }

            return {
                "start": this.map[this.idx_start.row][this.idx_start.col].el,
                "end": this.map[this.idx_end.row][this.idx_end.col].el
            };
        },

        createCells: function(tag, nr, attrs) {
            var doc = this.table.ownerDocument,
                frag = doc.createDocumentFragment(),
                cell;
            for (var i = 0; i < nr; i++) {
                cell = doc.createElement(tag);

                if (attrs) {
                    for (var attr in attrs) {
                        if (attrs.hasOwnProperty(attr)) {
                            cell.setAttribute(attr, attrs[attr]);
                        }
                    }
                }

                // add non breaking space
                cell.appendChild(document.createTextNode("\u00a0"));

                frag.appendChild(cell);
            }
            return frag;
        },

        // Returns next real cell (not part of spanned cell unless first) on row if selected index is not real. I no real cells -1 will be returned
        correctColIndexForUnreals: function(col, row) {
            var r = this.map[row],
                corrIdx = -1;
            for (var i = 0, max = col; i < col; i++) {
                if (r[i].isReal){
                    corrIdx++;
                }
            }
            return corrIdx;
        },

        getLastNewCellOnRow: function(row, rowLimit) {
            var cells = this.getRowCells(row),
                cell, idx;

            for (var cidx = 0, cmax = cells.length; cidx < cmax; cidx++) {
                cell = cells[cidx];
                idx = this.getMapIndex(cell);
                if (idx === false || (typeof rowLimit != "undefined" && idx.row != rowLimit)) {
                    return cell;
                }
            }
            return null;
        },

        removeEmptyTable: function() {
            var cells = this.table.querySelectorAll('td, th');
            if (!cells || cells.length == 0) {
                removeElement(this.table);
                return true;
            } else {
                return false;
            }
        },

        // Splits merged cell on row to unique cells
        splitRowToCells: function(cell) {
            if (cell.isColspan) {
                var colspan = parseInt(api.getAttribute(cell.el, 'colspan') || 1, 10),
                    cType = cell.el.tagName.toLowerCase();
                if (colspan > 1) {
                    var newCells = this.createCells(cType, colspan -1);
                    insertAfter(cell.el, newCells);
                }
                cell.el.removeAttribute('colspan');
            }
        },

        getRealRowEl: function(force, idx) {
            var r = null,
                c = null;

            idx = idx || this.idx;

            for (var cidx = 0, cmax = this.map[idx.row].length; cidx < cmax; cidx++) {
                c = this.map[idx.row][cidx];
                if (c.isReal) {
                    r = api.getParentElement(c.el, { nodeName: ["TR"] });
                    if (r) {
                        return r;
                    }
                }
            }

            if (r === null && force) {
                r = api.getParentElement(this.map[idx.row][idx.col].el, { nodeName: ["TR"] }) || null;
            }

            return r;
        },

        injectRowAt: function(row, col, colspan, cType, c) {
            var r = this.getRealRowEl(false, {'row': row, 'col': col}),
                new_cells = this.createCells(cType, colspan);

            if (r) {
                var n_cidx = this.correctColIndexForUnreals(col, row);
                if (n_cidx >= 0) {
                    insertAfter(this.getRowCells(r)[n_cidx], new_cells);
                } else {
                    r.insertBefore(new_cells, r.firstChild);
                }
            } else {
                var rr = this.table.ownerDocument.createElement('tr');
                rr.appendChild(new_cells);
                insertAfter(api.getParentElement(c.el, { nodeName: ["TR"] }), rr);
            }
        },

        canMerge: function(to) {
            this.to = to;
            this.setTableMap();
            this.idx_start = this.getMapIndex(this.cell);
            this.idx_end = this.getMapIndex(this.to);

            // switch indexes if start is bigger than end
            if (this.idx_start.row > this.idx_end.row || (this.idx_start.row == this.idx_end.row && this.idx_start.col > this.idx_end.col)) {
                var temp_idx = this.idx_start;
                this.idx_start = this.idx_end;
                this.idx_end = temp_idx;
            }
            if (this.idx_start.col > this.idx_end.col) {
                var temp_cidx = this.idx_start.col;
                this.idx_start.col = this.idx_end.col;
                this.idx_end.col = temp_cidx;
            }

            for (var row = this.idx_start.row, maxr = this.idx_end.row; row <= maxr; row++) {
                for (var col = this.idx_start.col, maxc = this.idx_end.col; col <= maxc; col++) {
                    if (this.map[row][col].isColspan || this.map[row][col].isRowspan) {
                        return false;
                    }
                }
            }
            return true;
        },

        decreaseCellSpan: function(cell, span) {
            var nr = parseInt(api.getAttribute(cell.el, span), 10) - 1;
            if (nr >= 1) {
                cell.el.setAttribute(span, nr);
            } else {
                cell.el.removeAttribute(span);
                if (span == 'colspan') {
                    cell.isColspan = false;
                }
                if (span == 'rowspan') {
                    cell.isRowspan = false;
                }
                cell.firstCol = true;
                cell.lastCol = true;
                cell.firstRow = true;
                cell.lastRow = true;
                cell.isReal = true;
            }
        },

        removeSurplusLines: function() {
            var row, cell, ridx, rmax, cidx, cmax, allRowspan;

            this.setTableMap();
            if (this.map) {
                ridx = 0;
                rmax = this.map.length;
                for (;ridx < rmax; ridx++) {
                    row = this.map[ridx];
                    allRowspan = true;
                    cidx = 0;
                    cmax = row.length;
                    for (; cidx < cmax; cidx++) {
                        cell = row[cidx];
                        if (!(api.getAttribute(cell.el, "rowspan") && parseInt(api.getAttribute(cell.el, "rowspan"), 10) > 1 && cell.firstRow !== true)) {
                            allRowspan = false;
                            break;
                        }
                    }
                    if (allRowspan) {
                        cidx = 0;
                        for (; cidx < cmax; cidx++) {
                            this.decreaseCellSpan(row[cidx], 'rowspan');
                        }
                    }
                }

                // remove rows without cells
                var tableRows = this.getTableRows();
                ridx = 0;
                rmax = tableRows.length;
                for (;ridx < rmax; ridx++) {
                    row = tableRows[ridx];
                    if (row.childNodes.length == 0 && (/^\s*$/.test(row.textContent || row.innerText))) {
                        removeElement(row);
                    }
                }
            }
        },

        fillMissingCells: function() {
            var r_max = 0,
                c_max = 0,
                prevcell = null;

            this.setTableMap();
            if (this.map) {

                // find maximal dimensions of broken table
                r_max = this.map.length;
                for (var ridx = 0; ridx < r_max; ridx++) {
                    if (this.map[ridx].length > c_max) { c_max = this.map[ridx].length; }
                }

                for (var row = 0; row < r_max; row++) {
                    for (var col = 0; col < c_max; col++) {
                        if (this.map[row] && !this.map[row][col]) {
                            if (col > 0) {
                                this.map[row][col] = new MapCell(this.createCells('td', 1));
                                prevcell = this.map[row][col-1];
                                if (prevcell && prevcell.el && prevcell.el.parent) { // if parent does not exist element is removed from dom
                                    insertAfter(this.map[row][col-1].el, this.map[row][col].el);
                                }
                            }
                        }
                    }
                }
            }
        },

        rectify: function() {
            if (!this.removeEmptyTable()) {
                this.removeSurplusLines();
                this.fillMissingCells();
                return true;
            } else {
                return false;
            }
        },

        unmerge: function() {
            if (this.rectify()) {
                this.setTableMap();
                this.idx = this.getMapIndex(this.cell);

                if (this.idx) {
                    var thisCell = this.map[this.idx.row][this.idx.col],
                        colspan = (api.getAttribute(thisCell.el, "colspan")) ? parseInt(api.getAttribute(thisCell.el, "colspan"), 10) : 1,
                        cType = thisCell.el.tagName.toLowerCase();

                    if (thisCell.isRowspan) {
                        var rowspan = parseInt(api.getAttribute(thisCell.el, "rowspan"), 10);
                        if (rowspan > 1) {
                            for (var nr = 1, maxr = rowspan - 1; nr <= maxr; nr++){
                                this.injectRowAt(this.idx.row + nr, this.idx.col, colspan, cType, thisCell);
                            }
                        }
                        thisCell.el.removeAttribute('rowspan');
                    }
                    this.splitRowToCells(thisCell);
                }
            }
        },

        // merges cells from start cell (defined in creating obj) to "to" cell
        merge: function(to) {
            if (this.rectify()) {
                if (this.canMerge(to)) {
                    var rowspan = this.idx_end.row - this.idx_start.row + 1,
                        colspan = this.idx_end.col - this.idx_start.col + 1;

                    for (var row = this.idx_start.row, maxr = this.idx_end.row; row <= maxr; row++) {
                        for (var col = this.idx_start.col, maxc = this.idx_end.col; col <= maxc; col++) {

                            if (row == this.idx_start.row && col == this.idx_start.col) {
                                if (rowspan > 1) {
                                    this.map[row][col].el.setAttribute('rowspan', rowspan);
                                }
                                if (colspan > 1) {
                                    this.map[row][col].el.setAttribute('colspan', colspan);
                                }
                            } else {
                                // transfer content
                                if (!(/^\s*<br\/?>\s*$/.test(this.map[row][col].el.innerHTML.toLowerCase()))) {
                                    this.map[this.idx_start.row][this.idx_start.col].el.innerHTML += ' ' + this.map[row][col].el.innerHTML;
                                }
                                removeElement(this.map[row][col].el);
                            }
                        }
                    }
                    this.rectify();
                } else {
                    if (window.console) {
                        console.log('Do not know how to merge allready merged cells.');
                    }
                }
            }
        },

        // Decreases rowspan of a cell if it is done on first cell of rowspan row (real cell)
        // Cell is moved to next row (if it is real)
        collapseCellToNextRow: function(cell) {
            var cellIdx = this.getMapIndex(cell.el),
                newRowIdx = cellIdx.row + 1,
                newIdx = {'row': newRowIdx, 'col': cellIdx.col};

            if (newRowIdx < this.map.length) {

                var row = this.getRealRowEl(false, newIdx);
                if (row !== null) {
                    var n_cidx = this.correctColIndexForUnreals(newIdx.col, newIdx.row);
                    if (n_cidx >= 0) {
                        insertAfter(this.getRowCells(row)[n_cidx], cell.el);
                    } else {
                        var lastCell = this.getLastNewCellOnRow(row, newRowIdx);
                        if (lastCell !== null) {
                            insertAfter(lastCell, cell.el);
                        } else {
                            row.insertBefore(cell.el, row.firstChild);
                        }
                    }
                    if (parseInt(api.getAttribute(cell.el, 'rowspan'), 10) > 2) {
                        cell.el.setAttribute('rowspan', parseInt(api.getAttribute(cell.el, 'rowspan'), 10) - 1);
                    } else {
                        cell.el.removeAttribute('rowspan');
                    }
                }
            }
        },

        // Removes a cell when removing a row
        // If is rowspan cell then decreases the rowspan
        // and moves cell to next row if needed (is first cell of rowspan)
        removeRowCell: function(cell) {
            if (cell.isReal) {
               if (cell.isRowspan) {
                   this.collapseCellToNextRow(cell);
               } else {
                   removeElement(cell.el);
               }
            } else {
                if (parseInt(api.getAttribute(cell.el, 'rowspan'), 10) > 2) {
                    cell.el.setAttribute('rowspan', parseInt(api.getAttribute(cell.el, 'rowspan'), 10) - 1);
                } else {
                    cell.el.removeAttribute('rowspan');
                }
            }
        },

        getRowElementsByCell: function() {
            var cells = [];
            this.setTableMap();
            this.idx = this.getMapIndex(this.cell);
            if (this.idx !== false) {
                var modRow = this.map[this.idx.row];
                for (var cidx = 0, cmax = modRow.length; cidx < cmax; cidx++) {
                    if (modRow[cidx].isReal) {
                        cells.push(modRow[cidx].el);
                    }
                }
            }
            return cells;
        },

        getColumnElementsByCell: function() {
            var cells = [];
            this.setTableMap();
            this.idx = this.getMapIndex(this.cell);
            if (this.idx !== false) {
                for (var ridx = 0, rmax = this.map.length; ridx < rmax; ridx++) {
                    if (this.map[ridx][this.idx.col] && this.map[ridx][this.idx.col].isReal) {
                        cells.push(this.map[ridx][this.idx.col].el);
                    }
                }
            }
            return cells;
        },

        // Removes the row of selected cell
        removeRow: function() {
            var oldRow = api.getParentElement(this.cell, { nodeName: ["TR"] });
            if (oldRow) {
                this.setTableMap();
                this.idx = this.getMapIndex(this.cell);
                if (this.idx !== false) {
                    var modRow = this.map[this.idx.row];
                    for (var cidx = 0, cmax = modRow.length; cidx < cmax; cidx++) {
                        if (!modRow[cidx].modified) {
                            this.setCellAsModified(modRow[cidx]);
                            this.removeRowCell(modRow[cidx]);
                        }
                    }
                }
                removeElement(oldRow);
            }
        },

        removeColCell: function(cell) {
            if (cell.isColspan) {
                if (parseInt(api.getAttribute(cell.el, 'colspan'), 10) > 2) {
                    cell.el.setAttribute('colspan', parseInt(api.getAttribute(cell.el, 'colspan'), 10) - 1);
                } else {
                    cell.el.removeAttribute('colspan');
                }
            } else if (cell.isReal) {
                removeElement(cell.el);
            }
        },

        removeColumn: function() {
            this.setTableMap();
            this.idx = this.getMapIndex(this.cell);
            if (this.idx !== false) {
                for (var ridx = 0, rmax = this.map.length; ridx < rmax; ridx++) {
                    if (!this.map[ridx][this.idx.col].modified) {
                        this.setCellAsModified(this.map[ridx][this.idx.col]);
                        this.removeColCell(this.map[ridx][this.idx.col]);
                    }
                }
            }
        },

        // removes row or column by selected cell element
        remove: function(what) {
            if (this.rectify()) {
                switch (what) {
                    case 'row':
                        this.removeRow();
                    break;
                    case 'column':
                        this.removeColumn();
                    break;
                }
                this.rectify();
            }
        },

        addRow: function(where) {
            var doc = this.table.ownerDocument;

            this.setTableMap();
            this.idx = this.getMapIndex(this.cell);
            if (where == "below" && api.getAttribute(this.cell, 'rowspan')) {
                this.idx.row = this.idx.row + parseInt(api.getAttribute(this.cell, 'rowspan'), 10) - 1;
            }

            if (this.idx !== false) {
                var modRow = this.map[this.idx.row],
                    newRow = doc.createElement('tr');

                for (var ridx = 0, rmax = modRow.length; ridx < rmax; ridx++) {
                    if (!modRow[ridx].modified) {
                        this.setCellAsModified(modRow[ridx]);
                        this.addRowCell(modRow[ridx], newRow, where);
                    }
                }

                switch (where) {
                    case 'below':
                        insertAfter(this.getRealRowEl(true), newRow);
                    break;
                    case 'above':
                        var cr = api.getParentElement(this.map[this.idx.row][this.idx.col].el, { nodeName: ["TR"] });
                        if (cr) {
                            cr.parentNode.insertBefore(newRow, cr);
                        }
                    break;
                }
            }
        },

        addRowCell: function(cell, row, where) {
            var colSpanAttr = (cell.isColspan) ? {"colspan" : api.getAttribute(cell.el, 'colspan')} : null;
            if (cell.isReal) {
                if (where != 'above' && cell.isRowspan) {
                    cell.el.setAttribute('rowspan', parseInt(api.getAttribute(cell.el,'rowspan'), 10) + 1);
                } else {
                    row.appendChild(this.createCells('td', 1, colSpanAttr));
                }
            } else {
                if (where != 'above' && cell.isRowspan && cell.lastRow) {
                    row.appendChild(this.createCells('td', 1, colSpanAttr));
                } else if (c.isRowspan) {
                    cell.el.attr('rowspan', parseInt(api.getAttribute(cell.el, 'rowspan'), 10) + 1);
                }
            }
        },

        add: function(where) {
            if (this.rectify()) {
                if (where == 'below' || where == 'above') {
                    this.addRow(where);
                }
                if (where == 'before' || where == 'after') {
                    this.addColumn(where);
                }
            }
        },

        addColCell: function (cell, ridx, where) {
            var doAdd,
                cType = cell.el.tagName.toLowerCase();

            // defines add cell vs expand cell conditions
            // true means add
            switch (where) {
                case "before":
                    doAdd = (!cell.isColspan || cell.firstCol);
                break;
                case "after":
                    doAdd = (!cell.isColspan || cell.lastCol || (cell.isColspan && c.el == this.cell));
                break;
            }

            if (doAdd){
                // adds a cell before or after current cell element
                switch (where) {
                    case "before":
                        cell.el.parentNode.insertBefore(this.createCells(cType, 1), cell.el);
                    break;
                    case "after":
                        insertAfter(cell.el, this.createCells(cType, 1));
                    break;
                }

                // handles if cell has rowspan
                if (cell.isRowspan) {
                    this.handleCellAddWithRowspan(cell, ridx+1, where);
                }

            } else {
                // expands cell
                cell.el.setAttribute('colspan',  parseInt(api.getAttribute(cell.el, 'colspan'), 10) + 1);
            }
        },

        addColumn: function(where) {
            var row, modCell;

            this.setTableMap();
            this.idx = this.getMapIndex(this.cell);
            if (where == "after" && api.getAttribute(this.cell, 'colspan')) {
              this.idx.col = this.idx.col + parseInt(api.getAttribute(this.cell, 'colspan'), 10) - 1;
            }

            if (this.idx !== false) {
                for (var ridx = 0, rmax = this.map.length; ridx < rmax; ridx++ ) {
                    row = this.map[ridx];
                    if (row[this.idx.col]) {
                        modCell = row[this.idx.col];
                        if (!modCell.modified) {
                            this.setCellAsModified(modCell);
                            this.addColCell(modCell, ridx , where);
                        }
                    }
                }
            }
        },

        handleCellAddWithRowspan: function (cell, ridx, where) {
            var addRowsNr = parseInt(api.getAttribute(this.cell, 'rowspan'), 10) - 1,
                crow = api.getParentElement(cell.el, { nodeName: ["TR"] }),
                cType = cell.el.tagName.toLowerCase(),
                cidx, temp_r_cells,
                doc = this.table.ownerDocument,
                nrow;

            for (var i = 0; i < addRowsNr; i++) {
                cidx = this.correctColIndexForUnreals(this.idx.col, (ridx + i));
                crow = nextNode(crow, 'tr');
                if (crow) {
                    if (cidx > 0) {
                        switch (where) {
                            case "before":
                                temp_r_cells = this.getRowCells(crow);
                                if (cidx > 0 && this.map[ridx + i][this.idx.col].el != temp_r_cells[cidx] && cidx == temp_r_cells.length - 1) {
                                     insertAfter(temp_r_cells[cidx], this.createCells(cType, 1));
                                } else {
                                    temp_r_cells[cidx].parentNode.insertBefore(this.createCells(cType, 1), temp_r_cells[cidx]);
                                }

                            break;
                            case "after":
                                insertAfter(this.getRowCells(crow)[cidx], this.createCells(cType, 1));
                            break;
                        }
                    } else {
                        crow.insertBefore(this.createCells(cType, 1), crow.firstChild);
                    }
                } else {
                    nrow = doc.createElement('tr');
                    nrow.appendChild(this.createCells(cType, 1));
                    this.table.appendChild(nrow);
                }
            }
        }
    };

    api.table = {
        getCellsBetween: function(cell1, cell2) {
            var c1 = new TableModifyerByCell(cell1);
            return c1.getMapElsTo(cell2);
        },

        addCells: function(cell, where) {
            var c = new TableModifyerByCell(cell);
            c.add(where);
        },

        removeCells: function(cell, what) {
            var c = new TableModifyerByCell(cell);
            c.remove(what);
        },

        mergeCellsBetween: function(cell1, cell2) {
            var c1 = new TableModifyerByCell(cell1);
            c1.merge(cell2);
        },

        unmergeCell: function(cell) {
            var c = new TableModifyerByCell(cell);
            c.unmerge();
        },

        orderSelectionEnds: function(cell, cell2) {
            var c = new TableModifyerByCell(cell);
            return c.orderSelectionEnds(cell2);
        },

        indexOf: function(cell) {
            var c = new TableModifyerByCell(cell);
            c.setTableMap();
            return c.getMapIndex(cell);
        },

        findCell: function(table, idx) {
            var c = new TableModifyerByCell(null, table);
            return c.getElementAtIndex(idx);
        },

        findRowByCell: function(cell) {
            var c = new TableModifyerByCell(cell);
            return c.getRowElementsByCell();
        },

        findColumnByCell: function(cell) {
            var c = new TableModifyerByCell(cell);
            return c.getColumnElementsByCell();
        },

        canMerge: function(cell1, cell2) {
            var c = new TableModifyerByCell(cell1);
            return c.canMerge(cell2);
        }
    };



})(wysihtml5);
;// does a selector query on element or array of elements

wysihtml5.dom.query = function(elements, query) {
    var ret = [],
        q;

    if (elements.nodeType) {
        elements = [elements];
    }

    for (var e = 0, len = elements.length; e < len; e++) {
        q = elements[e].querySelectorAll(query);
        if (q) {
            for(var i = q.length; i--; ret.unshift(q[i]));
        }
    }
    return ret;
};
;wysihtml5.dom.compareDocumentPosition = (function() {
  var documentElement = document.documentElement;
  if (documentElement.compareDocumentPosition) {
    return function(container, element) {
      return container.compareDocumentPosition(element);
    };
  } else {
    return function( container, element ) {
      // implementation borrowed from https://github.com/tmpvar/jsdom/blob/681a8524b663281a0f58348c6129c8c184efc62c/lib/jsdom/level3/core.js // MIT license
      var thisOwner, otherOwner;

      if( container.nodeType === 9) // Node.DOCUMENT_NODE
        thisOwner = container;
      else
        thisOwner = container.ownerDocument;

      if( element.nodeType === 9) // Node.DOCUMENT_NODE
        otherOwner = element;
      else
        otherOwner = element.ownerDocument;

      if( container === element ) return 0;
      if( container === element.ownerDocument ) return 4 + 16; //Node.DOCUMENT_POSITION_FOLLOWING + Node.DOCUMENT_POSITION_CONTAINED_BY;
      if( container.ownerDocument === element ) return 2 + 8;  //Node.DOCUMENT_POSITION_PRECEDING + Node.DOCUMENT_POSITION_CONTAINS;
      if( thisOwner !== otherOwner ) return 1; // Node.DOCUMENT_POSITION_DISCONNECTED;

      // Text nodes for attributes does not have a _parentNode. So we need to find them as attribute child.
      if( container.nodeType === 2 /*Node.ATTRIBUTE_NODE*/ && container.childNodes && wysihtml5.lang.array(container.childNodes).indexOf( element ) !== -1)
        return 4 + 16; //Node.DOCUMENT_POSITION_FOLLOWING + Node.DOCUMENT_POSITION_CONTAINED_BY;

      if( element.nodeType === 2 /*Node.ATTRIBUTE_NODE*/ && element.childNodes && wysihtml5.lang.array(element.childNodes).indexOf( container ) !== -1)
        return 2 + 8; //Node.DOCUMENT_POSITION_PRECEDING + Node.DOCUMENT_POSITION_CONTAINS;

      var point = container;
      var parents = [ ];
      var previous = null;
      while( point ) {
        if( point == element ) return 2 + 8; //Node.DOCUMENT_POSITION_PRECEDING + Node.DOCUMENT_POSITION_CONTAINS;
        parents.push( point );
        point = point.parentNode;
      }
      point = element;
      previous = null;
      while( point ) {
        if( point == container ) return 4 + 16; //Node.DOCUMENT_POSITION_FOLLOWING + Node.DOCUMENT_POSITION_CONTAINED_BY;
        var location_index = wysihtml5.lang.array(parents).indexOf( point );
        if( location_index !== -1) {
         var smallest_common_ancestor = parents[ location_index ];
         var this_index = wysihtml5.lang.array(smallest_common_ancestor.childNodes).indexOf( parents[location_index - 1]);//smallest_common_ancestor.childNodes.toArray().indexOf( parents[location_index - 1] );
         var other_index = wysihtml5.lang.array(smallest_common_ancestor.childNodes).indexOf( previous ); //smallest_common_ancestor.childNodes.toArray().indexOf( previous );
         if( this_index > other_index ) {
               return 2; //Node.DOCUMENT_POSITION_PRECEDING;
         }
         else {
           return 4; //Node.DOCUMENT_POSITION_FOLLOWING;
         }
        }
        previous = point;
        point = point.parentNode;
      }
      return 1; //Node.DOCUMENT_POSITION_DISCONNECTED;
    };
  }
})();
;wysihtml5.dom.unwrap = function(node) {
  if (node.parentNode) {
    while (node.lastChild) {
      wysihtml5.dom.insert(node.lastChild).after(node);
    }
    node.parentNode.removeChild(node);
  }
};;/**
 * Fix most common html formatting misbehaviors of browsers implementation when inserting
 * content via copy & paste contentEditable
 *
 * @author Christopher Blum
 */
wysihtml5.quirks.cleanPastedHTML = (function() {
  // TODO: We probably need more rules here
  var defaultRules = {
    // When pasting underlined links <a> into a contentEditable, IE thinks, it has to insert <u> to keep the styling
    "a u": wysihtml5.dom.replaceWithChildNodes
  };

  function cleanPastedHTML(elementOrHtml, rules, context) {
    rules   = rules || defaultRules;
    context = context || elementOrHtml.ownerDocument || document;

    var element,
        isString = typeof(elementOrHtml) === "string",
        method,
        matches,
        matchesLength,
        i,
        j = 0, n;
    if (isString) {
      element = wysihtml5.dom.getAsDom(elementOrHtml, context);
    } else {
      element = elementOrHtml;
    }

    for (i in rules) {
      matches       = element.querySelectorAll(i);
      method        = rules[i];
      matchesLength = matches.length;
      for (; j<matchesLength; j++) {
        method(matches[j]);
      }
    }

    // replace joined non-breakable spaces with unjoined
    var txtnodes = wysihtml5.dom.getTextNodes(element);
    for (n = txtnodes.length; n--;) {
      txtnodes[n].nodeValue = txtnodes[n].nodeValue.replace(/([\S\u00A0])\u00A0/gi, "$1 ");
    }

    matches = elementOrHtml = rules = null;

    return isString ? element.innerHTML : element;
  }

  return cleanPastedHTML;
})();
;/**
 * IE and Opera leave an empty paragraph in the contentEditable element after clearing it
 *
 * @param {Object} contentEditableElement The contentEditable element to observe for clearing events
 * @exaple
 *    wysihtml5.quirks.ensureProperClearing(myContentEditableElement);
 */
wysihtml5.quirks.ensureProperClearing = (function() {
  var clearIfNecessary = function() {
    var element = this;
    setTimeout(function() {
      var innerHTML = element.innerHTML.toLowerCase();
      if (innerHTML == "<p>&nbsp;</p>" ||
          innerHTML == "<p>&nbsp;</p><p>&nbsp;</p>") {
        element.innerHTML = "";
      }
    }, 0);
  };

  return function(composer) {
    wysihtml5.dom.observe(composer.element, ["cut", "keydown"], clearIfNecessary);
  };
})();
;// See https://bugzilla.mozilla.org/show_bug.cgi?id=664398
//
// In Firefox this:
//      var d = document.createElement("div");
//      d.innerHTML ='<a href="~"></a>';
//      d.innerHTML;
// will result in:
//      <a href="%7E"></a>
// which is wrong
(function(wysihtml5) {
  var TILDE_ESCAPED = "%7E";
  wysihtml5.quirks.getCorrectInnerHTML = function(element) {
    var innerHTML = element.innerHTML;
    if (innerHTML.indexOf(TILDE_ESCAPED) === -1) {
      return innerHTML;
    }

    var elementsWithTilde = element.querySelectorAll("[href*='~'], [src*='~']"),
        url,
        urlToSearch,
        length,
        i;
    for (i=0, length=elementsWithTilde.length; i<length; i++) {
      url         = elementsWithTilde[i].href || elementsWithTilde[i].src;
      urlToSearch = wysihtml5.lang.string(url).replace("~").by(TILDE_ESCAPED);
      innerHTML   = wysihtml5.lang.string(innerHTML).replace(urlToSearch).by(url);
    }
    return innerHTML;
  };
})(wysihtml5);
;/**
 * Force rerendering of a given element
 * Needed to fix display misbehaviors of IE
 *
 * @param {Element} element The element object which needs to be rerendered
 * @example
 *    wysihtml5.quirks.redraw(document.body);
 */
(function(wysihtml5) {
  var CLASS_NAME = "wysihtml5-quirks-redraw";

  wysihtml5.quirks.redraw = function(element) {
    wysihtml5.dom.addClass(element, CLASS_NAME);
    wysihtml5.dom.removeClass(element, CLASS_NAME);

    // Following hack is needed for firefox to make sure that image resize handles are properly removed
    try {
      var doc = element.ownerDocument;
      doc.execCommand("italic", false, null);
      doc.execCommand("italic", false, null);
    } catch(e) {}
  };
})(wysihtml5);
;wysihtml5.quirks.tableCellsSelection = function(editable, editor) {

    var dom = wysihtml5.dom,
        select = {
            table: null,
            start: null,
            end: null,
            cells: null,
            select: selectCells
        },
        selection_class = "wysiwyg-tmp-selected-cell",
        moveHandler = null,
        upHandler = null;

    function init () {

        dom.observe(editable, "mousedown", function(event) {
          var target = wysihtml5.dom.getParentElement(event.target, { nodeName: ["TD", "TH"] });
          if (target) {
              handleSelectionMousedown(target);
          }
        });

        return select;
    }

    function handleSelectionMousedown (target) {
      select.start = target;
      select.end = target;
      select.cells = [target];
      select.table = dom.getParentElement(select.start, { nodeName: ["TABLE"] });

      if (select.table) {
        removeCellSelections();
        dom.addClass(target, selection_class);
        moveHandler = dom.observe(editable, "mousemove", handleMouseMove);
        upHandler = dom.observe(editable, "mouseup", handleMouseUp);
        editor.fire("tableselectstart").fire("tableselectstart:composer");
      }
    }

    // remove all selection classes
    function removeCellSelections () {
        if (editable) {
            var selectedCells = editable.querySelectorAll('.' + selection_class);
            if (selectedCells.length > 0) {
              for (var i = 0; i < selectedCells.length; i++) {
                  dom.removeClass(selectedCells[i], selection_class);
              }
            }
        }
    }

    function addSelections (cells) {
      for (var i = 0; i < cells.length; i++) {
        dom.addClass(cells[i], selection_class);
      }
    }

    function handleMouseMove (event) {
      var curTable = null,
          cell = dom.getParentElement(event.target, { nodeName: ["TD","TH"] }),
          oldEnd;

      if (cell && select.table && select.start) {
        curTable =  dom.getParentElement(cell, { nodeName: ["TABLE"] });
        if (curTable && curTable === select.table) {
          removeCellSelections();
          oldEnd = select.end;
          select.end = cell;
          select.cells = dom.table.getCellsBetween(select.start, cell);
          if (select.cells.length > 1) {
            editor.composer.selection.deselect();
          }
          addSelections(select.cells);
          if (select.end !== oldEnd) {
            editor.fire("tableselectchange").fire("tableselectchange:composer");
          }
        }
      }
    }

    function handleMouseUp (event) {
      moveHandler.stop();
      upHandler.stop();
      editor.fire("tableselect").fire("tableselect:composer");
      setTimeout(function() {
        bindSideclick();
      },0);
    }

    function bindSideclick () {
        var sideClickHandler = dom.observe(editable.ownerDocument, "click", function(event) {
          sideClickHandler.stop();
          if (dom.getParentElement(event.target, { nodeName: ["TABLE"] }) != select.table) {
              removeCellSelections();
              select.table = null;
              select.start = null;
              select.end = null;
              editor.fire("tableunselect").fire("tableunselect:composer");
          }
        });
    }

    function selectCells (start, end) {
        select.start = start;
        select.end = end;
        select.table = dom.getParentElement(select.start, { nodeName: ["TABLE"] });
        selectedCells = dom.table.getCellsBetween(select.start, select.end);
        addSelections(selectedCells);
        bindSideclick();
        editor.fire("tableselect").fire("tableselect:composer");
    }

    return init();

};
;(function(wysihtml5) {
  var RGBA_REGEX     = /^rgba\(\s*(\d{1,3})\s*,\s*(\d{1,3})\s*,\s*(\d{1,3})\s*,\s*([\d\.]+)\s*\)/i,
      RGB_REGEX      = /^rgb\(\s*(\d{1,3})\s*,\s*(\d{1,3})\s*,\s*(\d{1,3})\s*\)/i,
      HEX6_REGEX     = /^#([0-9a-f][0-9a-f])([0-9a-f][0-9a-f])([0-9a-f][0-9a-f])/i,
      HEX3_REGEX     = /^#([0-9a-f])([0-9a-f])([0-9a-f])/i;

  var param_REGX = function (p) {
    return new RegExp("(^|\\s|;)" + p + "\\s*:\\s*[^;$]+" , "gi");
  };

  wysihtml5.quirks.styleParser = {

    parseColor: function(stylesStr, paramName) {
      var paramRegex = param_REGX(paramName),
          params = stylesStr.match(paramRegex),
          radix = 10,
          str, colorMatch;

      if (params) {
        for (var i = params.length; i--;) {
          params[i] = wysihtml5.lang.string(params[i].split(':')[1]).trim();
        }
        str = params[params.length-1];

        if (RGBA_REGEX.test(str)) {
          colorMatch = str.match(RGBA_REGEX);
        } else if (RGB_REGEX.test(str)) {
          colorMatch = str.match(RGB_REGEX);
        } else if (HEX6_REGEX.test(str)) {
          colorMatch = str.match(HEX6_REGEX);
          radix = 16;
        } else if (HEX3_REGEX.test(str)) {
          colorMatch = str.match(HEX3_REGEX);
          colorMatch.shift();
          colorMatch.push(1);
          return wysihtml5.lang.array(colorMatch).map(function(d, idx) {
            return (idx < 3) ? (parseInt(d, 16) * 16) + parseInt(d, 16): parseFloat(d);
          });
        }

        if (colorMatch) {
          colorMatch.shift();
          if (!colorMatch[3]) {
            colorMatch.push(1);
          }
          return wysihtml5.lang.array(colorMatch).map(function(d, idx) {
            return (idx < 3) ? parseInt(d, radix): parseFloat(d);
          });
        }
      }
      return false;
    },

    unparseColor: function(val, props) {
      if (props) {
        if (props == "hex") {
          return (val[0].toString(16).toUpperCase()) + (val[1].toString(16).toUpperCase()) + (val[2].toString(16).toUpperCase());
        } else if (props == "hash") {
          return "#" + (val[0].toString(16).toUpperCase()) + (val[1].toString(16).toUpperCase()) + (val[2].toString(16).toUpperCase());
        } else if (props == "rgb") {
          return "rgb(" + val[0] + "," + val[1] + "," + val[2] + ")";
        } else if (props == "rgba") {
          return "rgba(" + val[0] + "," + val[1] + "," + val[2] + "," + val[3] + ")";
        } else if (props == "csv") {
          return  val[0] + "," + val[1] + "," + val[2] + "," + val[3];
        }
      }

      if (val[3] && val[3] !== 1) {
        return "rgba(" + val[0] + "," + val[1] + "," + val[2] + "," + val[3] + ")";
      } else {
        return "rgb(" + val[0] + "," + val[1] + "," + val[2] + ")";
      }
    },

    parseFontSize: function(stylesStr) {
      var params = stylesStr.match(param_REGX('font-size'));
      if (params) {
        return wysihtml5.lang.string(params[params.length - 1].split(':')[1]).trim();
      }
      return false;
    }
  };

})(wysihtml5);
;/**
 * Selection API
 *
 * @example
 *    var selection = new wysihtml5.Selection(editor);
 */
(function(wysihtml5) {
  var dom = wysihtml5.dom;

  function _getCumulativeOffsetTop(element) {
    var top = 0;
    if (element.parentNode) {
      do {
        top += element.offsetTop || 0;
        element = element.offsetParent;
      } while (element);
    }
    return top;
  }

  // Provides the depth of ``descendant`` relative to ``ancestor``
  function getDepth(ancestor, descendant) {
      var ret = 0;
      while (descendant !== ancestor) {
          ret++;
          descendant = descendant.parentNode;
          if (!descendant)
              throw new Error("not a descendant of ancestor!");
      }
      return ret;
  }

  // Should fix the obtained ranges that cannot surrond contents normally to apply changes upon
  // Being considerate to firefox that sets range start start out of span and end inside on doubleclick initiated selection
  function expandRangeToSurround(range) {
      if (range.canSurroundContents()) return;

      var common = range.commonAncestorContainer,
          start_depth = getDepth(common, range.startContainer),
          end_depth = getDepth(common, range.endContainer);

      while(!range.canSurroundContents()) {
        // In the following branches, we cannot just decrement the depth variables because the setStartBefore/setEndAfter may move the start or end of the range more than one level relative to ``common``. So we need to recompute the depth.
        if (start_depth > end_depth) {
            range.setStartBefore(range.startContainer);
            start_depth = getDepth(common, range.startContainer);
        }
        else {
            range.setEndAfter(range.endContainer);
            end_depth = getDepth(common, range.endContainer);
        }
      }
  }

  wysihtml5.Selection = Base.extend(
    /** @scope wysihtml5.Selection.prototype */ {
    constructor: function(editor, contain, unselectableClass) {
      // Make sure that our external range library is initialized
      window.rangy.init();

      this.editor   = editor;
      this.composer = editor.composer;
      this.doc      = this.composer.doc;
      this.contain = contain;
      this.unselectableClass = unselectableClass || false;
    },

    /**
     * Get the current selection as a bookmark to be able to later restore it
     *
     * @return {Object} An object that represents the current selection
     */
    getBookmark: function() {
      var range = this.getRange();
      if (range) expandRangeToSurround(range);
      return range && range.cloneRange();
    },

    /**
     * Restore a selection retrieved via wysihtml5.Selection.prototype.getBookmark
     *
     * @param {Object} bookmark An object that represents the current selection
     */
    setBookmark: function(bookmark) {
      if (!bookmark) {
        return;
      }

      this.setSelection(bookmark);
    },

    /**
     * Set the caret in front of the given node
     *
     * @param {Object} node The element or text node where to position the caret in front of
     * @example
     *    selection.setBefore(myElement);
     */
    setBefore: function(node) {
      var range = rangy.createRange(this.doc);
      range.setStartBefore(node);
      range.setEndBefore(node);
      return this.setSelection(range);
    },

    /**
     * Set the caret after the given node
     *
     * @param {Object} node The element or text node where to position the caret in front of
     * @example
     *    selection.setBefore(myElement);
     */
    setAfter: function(node) {
      var range = rangy.createRange(this.doc);

      range.setStartAfter(node);
      range.setEndAfter(node);
      return this.setSelection(range);
    },

    /**
     * Ability to select/mark nodes
     *
     * @param {Element} node The node/element to select
     * @example
     *    selection.selectNode(document.getElementById("my-image"));
     */
    selectNode: function(node, avoidInvisibleSpace) {
      var range           = rangy.createRange(this.doc),
          isElement       = node.nodeType === wysihtml5.ELEMENT_NODE,
          canHaveHTML     = "canHaveHTML" in node ? node.canHaveHTML : (node.nodeName !== "IMG"),
          content         = isElement ? node.innerHTML : node.data,
          isEmpty         = (content === "" || content === wysihtml5.INVISIBLE_SPACE),
          displayStyle    = dom.getStyle("display").from(node),
          isBlockElement  = (displayStyle === "block" || displayStyle === "list-item");

      if (isEmpty && isElement && canHaveHTML && !avoidInvisibleSpace) {
        // Make sure that caret is visible in node by inserting a zero width no breaking space
        try { node.innerHTML = wysihtml5.INVISIBLE_SPACE; } catch(e) {}
      }

      if (canHaveHTML) {
        range.selectNodeContents(node);
      } else {
        range.selectNode(node);
      }

      if (canHaveHTML && isEmpty && isElement) {
        range.collapse(isBlockElement);
      } else if (canHaveHTML && isEmpty) {
        range.setStartAfter(node);
        range.setEndAfter(node);
      }

      this.setSelection(range);
    },

    /**
     * Get the node which contains the selection
     *
     * @param {Boolean} [controlRange] (only IE) Whether it should return the selected ControlRange element when the selection type is a "ControlRange"
     * @return {Object} The node that contains the caret
     * @example
     *    var nodeThatContainsCaret = selection.getSelectedNode();
     */
    getSelectedNode: function(controlRange) {
      var selection,
          range;

      if (controlRange && this.doc.selection && this.doc.selection.type === "Control") {
        range = this.doc.selection.createRange();
        if (range && range.length) {
          return range.item(0);
        }
      }

      selection = this.getSelection(this.doc);
      if (selection.focusNode === selection.anchorNode) {
        return selection.focusNode;
      } else {
        range = this.getRange(this.doc);
        return range ? range.commonAncestorContainer : this.doc.body;
      }
    },

    fixSelBorders: function() {
      var range = this.getRange();
      expandRangeToSurround(range);
      this.setSelection(range);
    },

    getSelectedOwnNodes: function(controlRange) {
      var selection,
          ranges = this.getOwnRanges(),
          ownNodes = [];

      for (var i = 0, maxi = ranges.length; i < maxi; i++) {
          ownNodes.push(ranges[i].commonAncestorContainer || this.doc.body);
      }
      return ownNodes;
    },

    findNodesInSelection: function(nodeTypes) {
      var ranges = this.getOwnRanges(),
          nodes = [], curNodes;
      for (var i = 0, maxi = ranges.length; i < maxi; i++) {
        curNodes = ranges[i].getNodes([1], function(node) {
            return wysihtml5.lang.array(nodeTypes).contains(node.nodeName);
        });
        nodes = nodes.concat(curNodes);
      }
      return nodes;
    },

    containsUneditable: function() {
      var uneditables = this.getOwnUneditables(),
          selection = this.getSelection();

      for (var i = 0, maxi = uneditables.length; i < maxi; i++) {
        if (selection.containsNode(uneditables[i])) {
          return true;
        }
      }

      return false;
    },

    deleteContents: function()  {
      var ranges = this.getOwnRanges();
      for (var i = ranges.length; i--;) {
        ranges[i].deleteContents();
      }
      this.setSelection(ranges[0]);
    },

    getPreviousNode: function(node, ignoreEmpty) {
      if (!node) {
        var selection = this.getSelection();
        node = selection.anchorNode;
      }

      if (node === this.contain) {
          return false;
      }

      var ret = node.previousSibling,
          parent;

      if (ret === this.contain) {
          return false;
      }

      if (ret && ret.nodeType !== 3 && ret.nodeType !== 1) {
         // do not count comments and other node types
         ret = this.getPreviousNode(ret, ignoreEmpty);
      } else if (ret && ret.nodeType === 3 && (/^\s*$/).test(ret.textContent)) {
        // do not count empty textnodes as previus nodes
        ret = this.getPreviousNode(ret, ignoreEmpty);
      } else if (ignoreEmpty && ret && ret.nodeType === 1 && !wysihtml5.lang.array(["BR", "HR", "IMG"]).contains(ret.nodeName) && (/^[\s]*$/).test(ret.innerHTML)) {
        // Do not count empty nodes if param set.
        // Contenteditable tends to bypass and delete these silently when deleting with caret
        ret = this.getPreviousNode(ret, ignoreEmpty);
      } else if (!ret && node !== this.contain) {
        parent = node.parentNode;
        if (parent !== this.contain) {
            ret = this.getPreviousNode(parent, ignoreEmpty);
        }
      }

      return (ret !== this.contain) ? ret : false;
    },

    getSelectionParentsByTag: function(tagName) {
      var nodes = this.getSelectedOwnNodes(),
          curEl, parents = [];

      for (var i = 0, maxi = nodes.length; i < maxi; i++) {
        curEl = (nodes[i].nodeName &&  nodes[i].nodeName === 'LI') ? nodes[i] : wysihtml5.dom.getParentElement(nodes[i], { nodeName: ['LI']}, false, this.contain);
        if (curEl) {
          parents.push(curEl);
        }
      }
      return (parents.length) ? parents : null;
    },

    getRangeToNodeEnd: function() {
      if (this.isCollapsed()) {
        var range = this.getRange(),
            sNode = range.startContainer,
            pos = range.startOffset,
            lastR = rangy.createRange(this.doc);

        lastR.selectNodeContents(sNode);
        lastR.setStart(sNode, pos);
        return lastR;
      }
    },

    caretIsLastInSelection: function() {
      var r = rangy.createRange(this.doc),
          s = this.getSelection(),
          endc = this.getRangeToNodeEnd().cloneContents(),
          endtxt = endc.textContent;

      return (/^\s*$/).test(endtxt);
    },

    caretIsFirstInSelection: function() {
      var r = rangy.createRange(this.doc),
          s = this.getSelection(),
          range = this.getRange(),
          startNode = range.startContainer;
      
      if (startNode.nodeType === wysihtml5.TEXT_NODE) {
        return this.isCollapsed() && (startNode.nodeType === wysihtml5.TEXT_NODE && (/^\s*$/).test(startNode.data.substr(0,range.startOffset)));
      } else {
        r.selectNodeContents(this.getRange().commonAncestorContainer);
        r.collapse(true);
        return (this.isCollapsed() && (r.startContainer === s.anchorNode || r.endContainer === s.anchorNode) && r.startOffset === s.anchorOffset);
      }
    },

    caretIsInTheBeginnig: function(ofNode) {
        var selection = this.getSelection(),
            node = selection.anchorNode,
            offset = selection.anchorOffset;
        if (ofNode) {
          return (offset === 0 && (node.nodeName && node.nodeName === ofNode.toUpperCase() || wysihtml5.dom.getParentElement(node.parentNode, { nodeName: ofNode }, 1)));
        } else {
          return (offset === 0 && !this.getPreviousNode(node, true));
        }
    },

    caretIsBeforeUneditable: function() {
      var selection = this.getSelection(),
          node = selection.anchorNode,
          offset = selection.anchorOffset;

      if (offset === 0) {
        var prevNode = this.getPreviousNode(node, true);
        if (prevNode) {
          var uneditables = this.getOwnUneditables();
          for (var i = 0, maxi = uneditables.length; i < maxi; i++) {
            if (prevNode === uneditables[i]) {
              return uneditables[i];
            }
          }
        }
      }
      return false;
    },

    // TODO: Figure out a method from following 3 that would work universally
    executeAndRestoreRangy: function(method, restoreScrollPosition) {
      var win = this.doc.defaultView || this.doc.parentWindow,
          sel = rangy.saveSelection(win);

      if (!sel) {
        method();
      } else {
        try {
          method();
        } catch(e) {
          setTimeout(function() { throw e; }, 0);
        }
      }
      rangy.restoreSelection(sel);
    },

    // TODO: has problems in chrome 12. investigate block level and uneditable area inbetween
    executeAndRestore: function(method, restoreScrollPosition) {
      var body                  = this.doc.body,
          oldScrollTop          = restoreScrollPosition && body.scrollTop,
          oldScrollLeft         = restoreScrollPosition && body.scrollLeft,
          className             = "_wysihtml5-temp-placeholder",
          placeholderHtml       = '<span class="' + className + '">' + wysihtml5.INVISIBLE_SPACE + '</span>',
          range                 = this.getRange(true),
          caretPlaceholder,
          newCaretPlaceholder,
          nextSibling, prevSibling,
          node, node2, range2,
          newRange;

      // Nothing selected, execute and say goodbye
      if (!range) {
        method(body, body);
        return;
      }

      if (!range.collapsed) {
        range2 = range.cloneRange();
        node2 = range2.createContextualFragment(placeholderHtml);
        range2.collapse(false);
        range2.insertNode(node2);
        range2.detach();
      }

      node = range.createContextualFragment(placeholderHtml);
      range.insertNode(node);

      if (node2) {
        caretPlaceholder = this.contain.querySelectorAll("." + className);
        range.setStartBefore(caretPlaceholder[0]);
        range.setEndAfter(caretPlaceholder[caretPlaceholder.length -1]);
      }
      this.setSelection(range);

      // Make sure that a potential error doesn't cause our placeholder element to be left as a placeholder
      try {
        method(range.startContainer, range.endContainer);
      } catch(e) {
        setTimeout(function() { throw e; }, 0);
      }
      caretPlaceholder = this.contain.querySelectorAll("." + className);
      if (caretPlaceholder && caretPlaceholder.length) {
        newRange = rangy.createRange(this.doc);
        nextSibling = caretPlaceholder[0].nextSibling;
        if (caretPlaceholder.length > 1) {
          prevSibling = caretPlaceholder[caretPlaceholder.length -1].previousSibling;
        }
        if (prevSibling && nextSibling) {
          newRange.setStartBefore(nextSibling);
          newRange.setEndAfter(prevSibling);
        } else {
          newCaretPlaceholder = this.doc.createTextNode(wysihtml5.INVISIBLE_SPACE);
          dom.insert(newCaretPlaceholder).after(caretPlaceholder[0]);
          newRange.setStartBefore(newCaretPlaceholder);
          newRange.setEndAfter(newCaretPlaceholder);
        }
        this.setSelection(newRange);
        for (var i = caretPlaceholder.length; i--;) {
         caretPlaceholder[i].parentNode.removeChild(caretPlaceholder[i]);
        }

      } else {
        // fallback for when all hell breaks loose
        this.contain.focus();
      }

      if (restoreScrollPosition) {
        body.scrollTop  = oldScrollTop;
        body.scrollLeft = oldScrollLeft;
      }

      // Remove it again, just to make sure that the placeholder is definitely out of the dom tree
      try {
        caretPlaceholder.parentNode.removeChild(caretPlaceholder);
      } catch(e2) {}
    },

    set: function(node, offset) {
      var newRange = rangy.createRange(this.doc);
      newRange.setStart(node, offset || 0);
      this.setSelection(newRange);
    },

    /**
     * Insert html at the caret position and move the cursor after the inserted html
     *
     * @param {String} html HTML string to insert
     * @example
     *    selection.insertHTML("<p>foobar</p>");
     */
    insertHTML: function(html) {
      var range     = rangy.createRange(this.doc),
          node      = range.createContextualFragment(html),
          lastChild = node.lastChild;

      this.insertNode(node);
      if (lastChild) {
        this.setAfter(lastChild);
      }
    },

    /**
     * Insert a node at the caret position and move the cursor behind it
     *
     * @param {Object} node HTML string to insert
     * @example
     *    selection.insertNode(document.createTextNode("foobar"));
     */
    insertNode: function(node) {
      var range = this.getRange();
      if (range) {
        range.insertNode(node);
      }
    },

    /**
     * Wraps current selection with the given node
     *
     * @param {Object} node The node to surround the selected elements with
     */
    surround: function(nodeOptions) {
      var ranges = this.getOwnRanges(),
          node, nodes = [];
      if (ranges.length == 0) {
        return nodes;
      }

      for (var i = ranges.length; i--;) {
        node = this.doc.createElement(nodeOptions.nodeName);
        nodes.push(node);
        if (nodeOptions.className) {
          node.className = nodeOptions.className;
        }
        if (nodeOptions.cssStyle) {
          node.setAttribute('style', nodeOptions.cssStyle);
        }
        try {
          // This only works when the range boundaries are not overlapping other elements
          ranges[i].surroundContents(node);
          this.selectNode(node);
        } catch(e) {
          // fallback
          node.appendChild(ranges[i].extractContents());
          ranges[i].insertNode(node);
        }
      }
      return nodes;
    },

    deblockAndSurround: function(nodeOptions) {
      var tempElement = this.doc.createElement('div'),
          range = rangy.createRange(this.doc),
          tempDivElements,
          tempElements,
          firstChild;

      tempElement.className = nodeOptions.className;

      this.composer.commands.exec("formatBlock", nodeOptions.nodeName, nodeOptions.className);
      tempDivElements = this.contain.querySelectorAll("." + nodeOptions.className);
      if (tempDivElements[0]) {
        tempDivElements[0].parentNode.insertBefore(tempElement, tempDivElements[0]);

        range.setStartBefore(tempDivElements[0]);
        range.setEndAfter(tempDivElements[tempDivElements.length - 1]);
        tempElements = range.extractContents();

        while (tempElements.firstChild) {
          firstChild = tempElements.firstChild;
          if (firstChild.nodeType == 1 && wysihtml5.dom.hasClass(firstChild, nodeOptions.className)) {
            while (firstChild.firstChild) {
              tempElement.appendChild(firstChild.firstChild);
            }
            if (firstChild.nodeName !== "BR") { tempElement.appendChild(this.doc.createElement('br')); }
            tempElements.removeChild(firstChild);
          } else {
            tempElement.appendChild(firstChild);
          }
        }
      } else {
        tempElement = null;
      }

      return tempElement;
    },

    /**
     * Scroll the current caret position into the view
     * FIXME: This is a bit hacky, there might be a smarter way of doing this
     *
     * @example
     *    selection.scrollIntoView();
     */
    scrollIntoView: function() {
      var doc           = this.doc,
          tolerance     = 5, // px
          hasScrollBars = doc.documentElement.scrollHeight > doc.documentElement.offsetHeight,
          tempElement   = doc._wysihtml5ScrollIntoViewElement = doc._wysihtml5ScrollIntoViewElement || (function() {
            var element = doc.createElement("span");
            // The element needs content in order to be able to calculate it's position properly
            element.innerHTML = wysihtml5.INVISIBLE_SPACE;
            return element;
          })(),
          offsetTop;

      if (hasScrollBars) {
        this.insertNode(tempElement);
        offsetTop = _getCumulativeOffsetTop(tempElement);
        tempElement.parentNode.removeChild(tempElement);
        if (offsetTop >= (doc.body.scrollTop + doc.documentElement.offsetHeight - tolerance)) {
          doc.body.scrollTop = offsetTop;
        }
      }
    },

    /**
     * Select line where the caret is in
     */
    selectLine: function() {
      if (wysihtml5.browser.supportsSelectionModify()) {
        this._selectLine_W3C();
      } else if (this.doc.selection) {
        this._selectLine_MSIE();
      }
    },

    /**
     * See https://developer.mozilla.org/en/DOM/Selection/modify
     */
    _selectLine_W3C: function() {
      var win       = this.doc.defaultView,
          selection = win.getSelection();
      selection.modify("move", "left", "lineboundary");
      selection.modify("extend", "right", "lineboundary");
    },

    _selectLine_MSIE: function() {
      var range       = this.doc.selection.createRange(),
          rangeTop    = range.boundingTop,
          scrollWidth = this.doc.body.scrollWidth,
          rangeBottom,
          rangeEnd,
          measureNode,
          i,
          j;

      if (!range.moveToPoint) {
        return;
      }

      if (rangeTop === 0) {
        // Don't know why, but when the selection ends at the end of a line
        // range.boundingTop is 0
        measureNode = this.doc.createElement("span");
        this.insertNode(measureNode);
        rangeTop = measureNode.offsetTop;
        measureNode.parentNode.removeChild(measureNode);
      }

      rangeTop += 1;

      for (i=-10; i<scrollWidth; i+=2) {
        try {
          range.moveToPoint(i, rangeTop);
          break;
        } catch(e1) {}
      }

      // Investigate the following in order to handle multi line selections
      // rangeBottom = rangeTop + (rangeHeight ? (rangeHeight - 1) : 0);
      rangeBottom = rangeTop;
      rangeEnd = this.doc.selection.createRange();
      for (j=scrollWidth; j>=0; j--) {
        try {
          rangeEnd.moveToPoint(j, rangeBottom);
          break;
        } catch(e2) {}
      }

      range.setEndPoint("EndToEnd", rangeEnd);
      range.select();
    },

    getText: function() {
      var selection = this.getSelection();
      return selection ? selection.toString() : "";
    },

    getNodes: function(nodeType, filter) {
      var range = this.getRange();
      if (range) {
        return range.getNodes([nodeType], filter);
      } else {
        return [];
      }
    },

    fixRangeOverflow: function(range) {
      if (this.contain && this.contain.firstChild && range) {
        var containment = range.compareNode(this.contain);
        if (containment !== 2) {
          if (containment === 1) {
            range.setStartBefore(this.contain.firstChild);
          }
          if (containment === 0) {
            range.setEndAfter(this.contain.lastChild);
          }
          if (containment === 3) {
            range.setStartBefore(this.contain.firstChild);
            range.setEndAfter(this.contain.lastChild);
          }
        } else if (this._detectInlineRangeProblems(range)) {
          var previousElementSibling = range.endContainer.previousElementSibling;
          if (previousElementSibling) {
            range.setEnd(previousElementSibling, this._endOffsetForNode(previousElementSibling));
          }
        }
      }
    },

    _endOffsetForNode: function(node) {
      var range = document.createRange();
      range.selectNodeContents(node);
      return range.endOffset;
    },

    _detectInlineRangeProblems: function(range) {
      position = dom.compareDocumentPosition(range.startContainer, range.endContainer);
      return (
        range.endOffset == 0 &&
        position & 4 //Node.DOCUMENT_POSITION_FOLLOWING
      );
    },

    getRange: function(dontFix) {
      var selection = this.getSelection(),
          range = selection && selection.rangeCount && selection.getRangeAt(0);

      if (dontFix !== true) {
        this.fixRangeOverflow(range);
      }

      return range;
    },

    getOwnUneditables: function() {
      var allUneditables = dom.query(this.contain, '.' + this.unselectableClass),
          deepUneditables = dom.query(allUneditables, '.' + this.unselectableClass);

      return wysihtml5.lang.array(allUneditables).without(deepUneditables);
    },

    // Returns an array of ranges that belong only to this editable
    // Needed as uneditable block in contenteditabel can split range into pieces
    // If manipulating content reverse loop is usually needed as manipulation can shift subsequent ranges
    getOwnRanges: function()  {
      var ranges = [],
          r = this.getRange(),
          tmpRanges;

      if (r) { ranges.push(r); }

      if (this.unselectableClass && this.contain && r) {
          var uneditables = this.getOwnUneditables(),
              tmpRange;
          if (uneditables.length > 0) {
            for (var i = 0, imax = uneditables.length; i < imax; i++) {
              tmpRanges = [];
              for (var j = 0, jmax = ranges.length; j < jmax; j++) {
                if (ranges[j]) {
                  switch (ranges[j].compareNode(uneditables[i])) {
                    case 2:
                      // all selection inside uneditable. remove
                    break;
                    case 3:
                      //section begins before and ends after uneditable. spilt
                      tmpRange = ranges[j].cloneRange();
                      tmpRange.setEndBefore(uneditables[i]);
                      tmpRanges.push(tmpRange);

                      tmpRange = ranges[j].cloneRange();
                      tmpRange.setStartAfter(uneditables[i]);
                      tmpRanges.push(tmpRange);
                    break;
                    default:
                      // in all other cases uneditable does not touch selection. dont modify
                      tmpRanges.push(ranges[j]);
                  }
                }
                ranges = tmpRanges;
              }
            }
          }
      }
      return ranges;
    },

    getSelection: function() {
      return rangy.getSelection(this.doc.defaultView || this.doc.parentWindow);
    },

    setSelection: function(range) {
      var win       = this.doc.defaultView || this.doc.parentWindow,
          selection = rangy.getSelection(win);
      return selection.setSingleRange(range);
    },

    createRange: function() {
      return rangy.createRange(this.doc);
    },

    isCollapsed: function() {
        return this.getSelection().isCollapsed;
    },

    isEndToEndInNode: function(nodeNames) {
      var range = this.getRange(),
          parentElement = range.commonAncestorContainer,
          startNode = range.startContainer,
          endNode = range.endContainer;


        if (parentElement.nodeType === wysihtml5.TEXT_NODE) {
          parentElement = parentElement.parentNode;
        }

        if (startNode.nodeType === wysihtml5.TEXT_NODE && !(/^\s*$/).test(startNode.data.substr(range.startOffset))) {
          return false;
        }

        if (endNode.nodeType === wysihtml5.TEXT_NODE && !(/^\s*$/).test(endNode.data.substr(range.endOffset))) {
          return false;
        }

        while (startNode && startNode !== parentElement) {
          if (startNode.nodeType !== wysihtml5.TEXT_NODE && !wysihtml5.dom.contains(parentElement, startNode)) {
            return false;
          }
          if (wysihtml5.dom.domNode(startNode).prev({ignoreBlankTexts: true})) {
            return false;
          }
          startNode = startNode.parentNode;
        }

        while (endNode && endNode !== parentElement) {
          if (endNode.nodeType !== wysihtml5.TEXT_NODE && !wysihtml5.dom.contains(parentElement, endNode)) {
            return false;
          }
          if (wysihtml5.dom.domNode(endNode).next({ignoreBlankTexts: true})) {
            return false;
          }
          endNode = endNode.parentNode;
        }

        return (wysihtml5.lang.array(nodeNames).contains(parentElement.nodeName)) ? parentElement : false;
    },

    deselect: function() {
      var sel = this.getSelection();
      sel && sel.removeAllRanges();
    }
  });

})(wysihtml5);
;/**
 * Inspired by the rangy CSS Applier module written by Tim Down and licensed under the MIT license.
 * http://code.google.com/p/rangy/
 *
 * changed in order to be able ...
 *    - to use custom tags
 *    - to detect and replace similar css classes via reg exp
 */
(function(wysihtml5, rangy) {
  var defaultTagName = "span";

  var REG_EXP_WHITE_SPACE = /\s+/g;

  function hasClass(el, cssClass, regExp) {
    if (!el.className) {
      return false;
    }

    var matchingClassNames = el.className.match(regExp) || [];
    return matchingClassNames[matchingClassNames.length - 1] === cssClass;
  }

  function hasStyleAttr(el, regExp) {
    if (!el.getAttribute || !el.getAttribute('style')) {
      return false;
    }
    var matchingStyles = el.getAttribute('style').match(regExp);
    return  (el.getAttribute('style').match(regExp)) ? true : false;
  }

  function addStyle(el, cssStyle, regExp) {
    if (el.getAttribute('style')) {
      removeStyle(el, regExp);
      if (el.getAttribute('style') && !(/^\s*$/).test(el.getAttribute('style'))) {
        el.setAttribute('style', cssStyle + ";" + el.getAttribute('style'));
      } else {
        el.setAttribute('style', cssStyle);
      }
    } else {
      el.setAttribute('style', cssStyle);
    }
  }

  function addClass(el, cssClass, regExp) {
    if (el.className) {
      removeClass(el, regExp);
      el.className += " " + cssClass;
    } else {
      el.className = cssClass;
    }
  }

  function removeClass(el, regExp) {
    if (el.className) {
      el.className = el.className.replace(regExp, "");
    }
  }

  function removeStyle(el, regExp) {
    var s,
        s2 = [];
    if (el.getAttribute('style')) {
      s = el.getAttribute('style').split(';');
      for (var i = s.length; i--;) {
        if (!s[i].match(regExp) && !(/^\s*$/).test(s[i])) {
          s2.push(s[i]);
        }
      }
      if (s2.length) {
        el.setAttribute('style', s2.join(';'));
      } else {
        el.removeAttribute('style');
      }
    }
  }

  function getMatchingStyleRegexp(el, style) {
    var regexes = [],
        sSplit = style.split(';'),
        elStyle = el.getAttribute('style');

    if (elStyle) {
      elStyle = elStyle.replace(/\s/gi, '').toLowerCase();
      regexes.push(new RegExp("(^|\\s|;)" + style.replace(/\s/gi, '').replace(/([\(\)])/gi, "\\$1").toLowerCase().replace(";", ";?").replace(/rgb\\\((\d+),(\d+),(\d+)\\\)/gi, "\\s?rgb\\($1,\\s?$2,\\s?$3\\)"), "gi"));

      for (var i = sSplit.length; i-- > 0;) {
        if (!(/^\s*$/).test(sSplit[i])) {
          regexes.push(new RegExp("(^|\\s|;)" + sSplit[i].replace(/\s/gi, '').replace(/([\(\)])/gi, "\\$1").toLowerCase().replace(";", ";?").replace(/rgb\\\((\d+),(\d+),(\d+)\\\)/gi, "\\s?rgb\\($1,\\s?$2,\\s?$3\\)"), "gi"));
        }
      }
      for (var j = 0, jmax = regexes.length; j < jmax; j++) {
        if (elStyle.match(regexes[j])) {
          return regexes[j];
        }
      }
    }

    return false;
  }

  function isMatchingAllready(node, tags, style, className) {
    if (style) {
      return getMatchingStyleRegexp(node, style);
    } else if (className) {
      return wysihtml5.dom.hasClass(node, className);
    } else {
      return rangy.dom.arrayContains(tags, node.tagName.toLowerCase());
    }
  }

  function areMatchingAllready(nodes, tags, style, className) {
    for (var i = nodes.length; i--;) {
      if (!isMatchingAllready(nodes[i], tags, style, className)) {
        return false;
      }
    }
    return nodes.length ? true : false;
  }

  function removeOrChangeStyle(el, style, regExp) {

    var exactRegex = getMatchingStyleRegexp(el, style);
    if (exactRegex) {
      // adding same style value on property again removes style
      removeStyle(el, exactRegex);
      return "remove";
    } else {
      // adding new style value changes value
      addStyle(el, style, regExp);
      return "change";
    }
  }

  function hasSameClasses(el1, el2) {
    return el1.className.replace(REG_EXP_WHITE_SPACE, " ") == el2.className.replace(REG_EXP_WHITE_SPACE, " ");
  }

  function replaceWithOwnChildren(el) {
    var parent = el.parentNode;
    while (el.firstChild) {
      parent.insertBefore(el.firstChild, el);
    }
    parent.removeChild(el);
  }

  function elementsHaveSameNonClassAttributes(el1, el2) {
    if (el1.attributes.length != el2.attributes.length) {
      return false;
    }
    for (var i = 0, len = el1.attributes.length, attr1, attr2, name; i < len; ++i) {
      attr1 = el1.attributes[i];
      name = attr1.name;
      if (name != "class") {
        attr2 = el2.attributes.getNamedItem(name);
        if (attr1.specified != attr2.specified) {
          return false;
        }
        if (attr1.specified && attr1.nodeValue !== attr2.nodeValue) {
          return false;
        }
      }
    }
    return true;
  }

  function isSplitPoint(node, offset) {
    if (rangy.dom.isCharacterDataNode(node)) {
      if (offset == 0) {
        return !!node.previousSibling;
      } else if (offset == node.length) {
        return !!node.nextSibling;
      } else {
        return true;
      }
    }

    return offset > 0 && offset < node.childNodes.length;
  }

  function splitNodeAt(node, descendantNode, descendantOffset, container) {
    var newNode;
    if (rangy.dom.isCharacterDataNode(descendantNode)) {
      if (descendantOffset == 0) {
        descendantOffset = rangy.dom.getNodeIndex(descendantNode);
        descendantNode = descendantNode.parentNode;
      } else if (descendantOffset == descendantNode.length) {
        descendantOffset = rangy.dom.getNodeIndex(descendantNode) + 1;
        descendantNode = descendantNode.parentNode;
      } else {
        newNode = rangy.dom.splitDataNode(descendantNode, descendantOffset);
      }
    }
    if (!newNode) {
      if (!container || descendantNode !== container) {

        newNode = descendantNode.cloneNode(false);
        if (newNode.id) {
          newNode.removeAttribute("id");
        }
        var child;
        while ((child = descendantNode.childNodes[descendantOffset])) {
          newNode.appendChild(child);
        }
        rangy.dom.insertAfter(newNode, descendantNode);

      }
    }
    return (descendantNode == node) ? newNode :  splitNodeAt(node, newNode.parentNode, rangy.dom.getNodeIndex(newNode), container);
  }

  function Merge(firstNode) {
    this.isElementMerge = (firstNode.nodeType == wysihtml5.ELEMENT_NODE);
    this.firstTextNode = this.isElementMerge ? firstNode.lastChild : firstNode;
    this.textNodes = [this.firstTextNode];
  }

  Merge.prototype = {
    doMerge: function() {
      var textBits = [], textNode, parent, text;
      for (var i = 0, len = this.textNodes.length; i < len; ++i) {
        textNode = this.textNodes[i];
        parent = textNode.parentNode;
        textBits[i] = textNode.data;
        if (i) {
          parent.removeChild(textNode);
          if (!parent.hasChildNodes()) {
            parent.parentNode.removeChild(parent);
          }
        }
      }
      this.firstTextNode.data = text = textBits.join("");
      return text;
    },

    getLength: function() {
      var i = this.textNodes.length, len = 0;
      while (i--) {
        len += this.textNodes[i].length;
      }
      return len;
    },

    toString: function() {
      var textBits = [];
      for (var i = 0, len = this.textNodes.length; i < len; ++i) {
        textBits[i] = "'" + this.textNodes[i].data + "'";
      }
      return "[Merge(" + textBits.join(",") + ")]";
    }
  };

  function HTMLApplier(tagNames, cssClass, similarClassRegExp, normalize, cssStyle, similarStyleRegExp, container) {
    this.tagNames = tagNames || [defaultTagName];
    this.cssClass = cssClass || ((cssClass === false) ? false : "");
    this.similarClassRegExp = similarClassRegExp;
    this.cssStyle = cssStyle || "";
    this.similarStyleRegExp = similarStyleRegExp;
    this.normalize = normalize;
    this.applyToAnyTagName = false;
    this.container = container;
  }

  HTMLApplier.prototype = {
    getAncestorWithClass: function(node) {
      var cssClassMatch;
      while (node) {
        cssClassMatch = this.cssClass ? hasClass(node, this.cssClass, this.similarClassRegExp) : (this.cssStyle !== "") ? false : true;
        if (node.nodeType == wysihtml5.ELEMENT_NODE && node.getAttribute("contenteditable") != "false" &&  rangy.dom.arrayContains(this.tagNames, node.tagName.toLowerCase()) && cssClassMatch) {
          return node;
        }
        node = node.parentNode;
      }
      return false;
    },

    // returns parents of node with given style attribute
    getAncestorWithStyle: function(node) {
      var cssStyleMatch;
      while (node) {
        cssStyleMatch = this.cssStyle ? hasStyleAttr(node, this.similarStyleRegExp) : false;

        if (node.nodeType == wysihtml5.ELEMENT_NODE && node.getAttribute("contenteditable") != "false" && rangy.dom.arrayContains(this.tagNames, node.tagName.toLowerCase()) && cssStyleMatch) {
          return node;
        }
        node = node.parentNode;
      }
      return false;
    },

    getMatchingAncestor: function(node) {
      var ancestor = this.getAncestorWithClass(node),
          matchType = false;

      if (!ancestor) {
        ancestor = this.getAncestorWithStyle(node);
        if (ancestor) {
          matchType = "style";
        }
      } else {
        if (this.cssStyle) {
          matchType = "class";
        }
      }

      return {
        "element": ancestor,
        "type": matchType
      };
    },

    // Normalizes nodes after applying a CSS class to a Range.
    postApply: function(textNodes, range) {
      var firstNode = textNodes[0], lastNode = textNodes[textNodes.length - 1];

      var merges = [], currentMerge;

      var rangeStartNode = firstNode, rangeEndNode = lastNode;
      var rangeStartOffset = 0, rangeEndOffset = lastNode.length;

      var textNode, precedingTextNode;

      for (var i = 0, len = textNodes.length; i < len; ++i) {
        textNode = textNodes[i];
        precedingTextNode = null;
        if (textNode && textNode.parentNode) {
          precedingTextNode = this.getAdjacentMergeableTextNode(textNode.parentNode, false);
        }
        if (precedingTextNode) {
          if (!currentMerge) {
            currentMerge = new Merge(precedingTextNode);
            merges.push(currentMerge);
          }
          currentMerge.textNodes.push(textNode);
          if (textNode === firstNode) {
            rangeStartNode = currentMerge.firstTextNode;
            rangeStartOffset = rangeStartNode.length;
          }
          if (textNode === lastNode) {
            rangeEndNode = currentMerge.firstTextNode;
            rangeEndOffset = currentMerge.getLength();
          }
        } else {
          currentMerge = null;
        }
      }
      // Test whether the first node after the range needs merging
      if(lastNode && lastNode.parentNode) {
        var nextTextNode = this.getAdjacentMergeableTextNode(lastNode.parentNode, true);
        if (nextTextNode) {
          if (!currentMerge) {
            currentMerge = new Merge(lastNode);
            merges.push(currentMerge);
          }
          currentMerge.textNodes.push(nextTextNode);
        }
      }
      // Do the merges
      if (merges.length) {
        for (i = 0, len = merges.length; i < len; ++i) {
          merges[i].doMerge();
        }
        // Set the range boundaries
        range.setStart(rangeStartNode, rangeStartOffset);
        range.setEnd(rangeEndNode, rangeEndOffset);
      }
    },

    getAdjacentMergeableTextNode: function(node, forward) {
        var isTextNode = (node.nodeType == wysihtml5.TEXT_NODE);
        var el = isTextNode ? node.parentNode : node;
        var adjacentNode;
        var propName = forward ? "nextSibling" : "previousSibling";
        if (isTextNode) {
          // Can merge if the node's previous/next sibling is a text node
          adjacentNode = node[propName];
          if (adjacentNode && adjacentNode.nodeType == wysihtml5.TEXT_NODE) {
            return adjacentNode;
          }
        } else {
          // Compare element with its sibling
          adjacentNode = el[propName];
          if (adjacentNode && this.areElementsMergeable(node, adjacentNode)) {
            return adjacentNode[forward ? "firstChild" : "lastChild"];
          }
        }
        return null;
    },

    areElementsMergeable: function(el1, el2) {
      return rangy.dom.arrayContains(this.tagNames, (el1.tagName || "").toLowerCase())
        && rangy.dom.arrayContains(this.tagNames, (el2.tagName || "").toLowerCase())
        && hasSameClasses(el1, el2)
        && elementsHaveSameNonClassAttributes(el1, el2);
    },

    createContainer: function(doc) {
      var el = doc.createElement(this.tagNames[0]);
      if (this.cssClass) {
        el.className = this.cssClass;
      }
      if (this.cssStyle) {
        el.setAttribute('style', this.cssStyle);
      }
      return el;
    },

    applyToTextNode: function(textNode) {
      var parent = textNode.parentNode;
      if (parent.childNodes.length == 1 && rangy.dom.arrayContains(this.tagNames, parent.tagName.toLowerCase())) {

        if (this.cssClass) {
          addClass(parent, this.cssClass, this.similarClassRegExp);
        }
        if (this.cssStyle) {
          addStyle(parent, this.cssStyle, this.similarStyleRegExp);
        }
      } else {
        var el = this.createContainer(rangy.dom.getDocument(textNode));
        textNode.parentNode.insertBefore(el, textNode);
        el.appendChild(textNode);
      }
    },

    isRemovable: function(el) {
      return rangy.dom.arrayContains(this.tagNames, el.tagName.toLowerCase()) &&
              wysihtml5.lang.string(el.className).trim() === "" &&
              (
                !el.getAttribute('style') ||
                wysihtml5.lang.string(el.getAttribute('style')).trim() === ""
              );
    },

    undoToTextNode: function(textNode, range, ancestorWithClass, ancestorWithStyle) {
      var styleMode = (ancestorWithClass) ? false : true,
          ancestor = ancestorWithClass || ancestorWithStyle,
          styleChanged = false;
      if (!range.containsNode(ancestor)) {
        // Split out the portion of the ancestor from which we can remove the CSS class
        var ancestorRange = range.cloneRange();
            ancestorRange.selectNode(ancestor);

        if (ancestorRange.isPointInRange(range.endContainer, range.endOffset) && isSplitPoint(range.endContainer, range.endOffset)) {
            splitNodeAt(ancestor, range.endContainer, range.endOffset, this.container);
            range.setEndAfter(ancestor);
        }
        if (ancestorRange.isPointInRange(range.startContainer, range.startOffset) && isSplitPoint(range.startContainer, range.startOffset)) {
            ancestor = splitNodeAt(ancestor, range.startContainer, range.startOffset, this.container);
        }
      }

      if (!styleMode && this.similarClassRegExp) {
        removeClass(ancestor, this.similarClassRegExp);
      }

      if (styleMode && this.similarStyleRegExp) {
        styleChanged = (removeOrChangeStyle(ancestor, this.cssStyle, this.similarStyleRegExp) === "change");
      }
      if (this.isRemovable(ancestor) && !styleChanged) {
        replaceWithOwnChildren(ancestor);
      }
    },

    applyToRange: function(range) {
        var textNodes;
        for (var ri = range.length; ri--;) {
            textNodes = range[ri].getNodes([wysihtml5.TEXT_NODE]);

            if (!textNodes.length) {
              try {
                var node = this.createContainer(range[ri].endContainer.ownerDocument);
                range[ri].surroundContents(node);
                this.selectNode(range[ri], node);
                return;
              } catch(e) {}
            }

            range[ri].splitBoundaries();
            textNodes = range[ri].getNodes([wysihtml5.TEXT_NODE]);
            if (textNodes.length) {
              var textNode;

              for (var i = 0, len = textNodes.length; i < len; ++i) {
                textNode = textNodes[i];
                if (!this.getMatchingAncestor(textNode).element) {
                  this.applyToTextNode(textNode);
                }
              }

              range[ri].setStart(textNodes[0], 0);
              textNode = textNodes[textNodes.length - 1];
              range[ri].setEnd(textNode, textNode.length);

              if (this.normalize) {
                this.postApply(textNodes, range[ri]);
              }
            }

        }
    },

    undoToRange: function(range) {
      var textNodes, textNode, ancestorWithClass, ancestorWithStyle;
      for (var ri = range.length; ri--;) {

          textNodes = range[ri].getNodes([wysihtml5.TEXT_NODE]);
          if (textNodes.length) {
            range[ri].splitBoundaries();
            textNodes = range[ri].getNodes([wysihtml5.TEXT_NODE]);
          } else {
            var doc = range[ri].endContainer.ownerDocument,
                node = doc.createTextNode(wysihtml5.INVISIBLE_SPACE);
            range[ri].insertNode(node);
            range[ri].selectNode(node);
            textNodes = [node];
          }

          for (var i = 0, len = textNodes.length; i < len; ++i) {
            if (range[ri].isValid()) {
              textNode = textNodes[i];

              ancestor = this.getMatchingAncestor(textNode);
              if (ancestor.type === "style") {
                this.undoToTextNode(textNode, range[ri], false, ancestor.element);
              } else if (ancestor.element) {
                this.undoToTextNode(textNode, range[ri], ancestor.element);
              }
            }
          }

          if (len == 1) {
            this.selectNode(range[ri], textNodes[0]);
          } else {
            range[ri].setStart(textNodes[0], 0);
            textNode = textNodes[textNodes.length - 1];
            range[ri].setEnd(textNode, textNode.length);

            if (this.normalize) {
              this.postApply(textNodes, range[ri]);
            }
          }

      }
    },

    selectNode: function(range, node) {
      var isElement       = node.nodeType === wysihtml5.ELEMENT_NODE,
          canHaveHTML     = "canHaveHTML" in node ? node.canHaveHTML : true,
          content         = isElement ? node.innerHTML : node.data,
          isEmpty         = (content === "" || content === wysihtml5.INVISIBLE_SPACE);

      if (isEmpty && isElement && canHaveHTML) {
        // Make sure that caret is visible in node by inserting a zero width no breaking space
        try { node.innerHTML = wysihtml5.INVISIBLE_SPACE; } catch(e) {}
      }
      range.selectNodeContents(node);
      if (isEmpty && isElement) {
        range.collapse(false);
      } else if (isEmpty) {
        range.setStartAfter(node);
        range.setEndAfter(node);
      }
    },

    getTextSelectedByRange: function(textNode, range) {
      var textRange = range.cloneRange();
      textRange.selectNodeContents(textNode);

      var intersectionRange = textRange.intersection(range);
      var text = intersectionRange ? intersectionRange.toString() : "";
      textRange.detach();

      return text;
    },

    isAppliedToRange: function(range) {
      var ancestors = [],
          appliedType = "full",
          ancestor, styleAncestor, textNodes;

      for (var ri = range.length; ri--;) {

        textNodes = range[ri].getNodes([wysihtml5.TEXT_NODE]);
        if (!textNodes.length) {
          ancestor = this.getMatchingAncestor(range[ri].startContainer).element;

          return (ancestor) ? {
            "elements": [ancestor],
            "coverage": appliedType
          } : false;
        }

        for (var i = 0, len = textNodes.length, selectedText; i < len; ++i) {
          selectedText = this.getTextSelectedByRange(textNodes[i], range[ri]);
          ancestor = this.getMatchingAncestor(textNodes[i]).element;
          if (ancestor && selectedText != "") {
            ancestors.push(ancestor);

            if (wysihtml5.dom.getTextNodes(ancestor, true).length === 1) {
              appliedType = "full";
            } else if (appliedType === "full") {
              appliedType = "inline";
            }
          } else if (!ancestor) {
            appliedType = "partial";
          }
        }

      }

      return (ancestors.length) ? {
        "elements": ancestors,
        "coverage": appliedType
      } : false;
    },

    toggleRange: function(range) {
      var isApplied = this.isAppliedToRange(range),
          parentsExactMatch;

      if (isApplied) {
        if (isApplied.coverage === "full") {
          this.undoToRange(range);
        } else if (isApplied.coverage === "inline") {
          parentsExactMatch = areMatchingAllready(isApplied.elements, this.tagNames, this.cssStyle, this.cssClass);
          this.undoToRange(range);
          if (!parentsExactMatch) {
            this.applyToRange(range);
          }
        } else {
          // partial
          if (!areMatchingAllready(isApplied.elements, this.tagNames, this.cssStyle, this.cssClass)) {
            this.undoToRange(range);
          }
          this.applyToRange(range);
        }
      } else {
        this.applyToRange(range);
      }
    }
  };

  wysihtml5.selection.HTMLApplier = HTMLApplier;

})(wysihtml5, rangy);
;/**
 * Rich Text Query/Formatting Commands
 *
 * @example
 *    var commands = new wysihtml5.Commands(editor);
 */
wysihtml5.Commands = Base.extend(
  /** @scope wysihtml5.Commands.prototype */ {
  constructor: function(editor) {
    this.editor   = editor;
    this.composer = editor.composer;
    this.doc      = this.composer.doc;
  },

  /**
   * Check whether the browser supports the given command
   *
   * @param {String} command The command string which to check (eg. "bold", "italic", "insertUnorderedList")
   * @example
   *    commands.supports("createLink");
   */
  support: function(command) {
    return wysihtml5.browser.supportsCommand(this.doc, command);
  },

  /**
   * Check whether the browser supports the given command
   *
   * @param {String} command The command string which to execute (eg. "bold", "italic", "insertUnorderedList")
   * @param {String} [value] The command value parameter, needed for some commands ("createLink", "insertImage", ...), optional for commands that don't require one ("bold", "underline", ...)
   * @example
   *    commands.exec("insertImage", "http://a1.twimg.com/profile_images/113868655/schrei_twitter_reasonably_small.jpg");
   */
  exec: function(command, value) {
    var obj     = wysihtml5.commands[command],
        args    = wysihtml5.lang.array(arguments).get(),
        method  = obj && obj.exec,
        result  = null;

    this.editor.fire("beforecommand:composer");

    if (method) {
      args.unshift(this.composer);
      result = method.apply(obj, args);
    } else {
      try {
        // try/catch for buggy firefox
        result = this.doc.execCommand(command, false, value);
      } catch(e) {}
    }

    this.editor.fire("aftercommand:composer");
    return result;
  },

  /**
   * Check whether the current command is active
   * If the caret is within a bold text, then calling this with command "bold" should return true
   *
   * @param {String} command The command string which to check (eg. "bold", "italic", "insertUnorderedList")
   * @param {String} [commandValue] The command value parameter (eg. for "insertImage" the image src)
   * @return {Boolean} Whether the command is active
   * @example
   *    var isCurrentSelectionBold = commands.state("bold");
   */
  state: function(command, commandValue) {
    var obj     = wysihtml5.commands[command],
        args    = wysihtml5.lang.array(arguments).get(),
        method  = obj && obj.state;
    if (method) {
      args.unshift(this.composer);
      return method.apply(obj, args);
    } else {
      try {
        // try/catch for buggy firefox
        return this.doc.queryCommandState(command);
      } catch(e) {
        return false;
      }
    }
  },

  /* Get command state parsed value if command has stateValue parsing function */
  stateValue: function(command) {
    var obj     = wysihtml5.commands[command],
        args    = wysihtml5.lang.array(arguments).get(),
        method  = obj && obj.stateValue;
    if (method) {
      args.unshift(this.composer);
      return method.apply(obj, args);
    } else {
      return false;
    }
  }
});
;wysihtml5.commands.bold = {
  exec: function(composer, command) {
    wysihtml5.commands.formatInline.execWithToggle(composer, command, "b");
  },

  state: function(composer, command) {
    // element.ownerDocument.queryCommandState("bold") results:
    // firefox: only <b>
    // chrome:  <b>, <strong>, <h1>, <h2>, ...
    // ie:      <b>, <strong>
    // opera:   <b>, <strong>
    return wysihtml5.commands.formatInline.state(composer, command, "b");
  }
};

;(function(wysihtml5) {
  var undef,
      NODE_NAME = "A",
      dom       = wysihtml5.dom;

  function _format(composer, attributes) {
    var doc             = composer.doc,
        tempClass       = "_wysihtml5-temp-" + (+new Date()),
        tempClassRegExp = /non-matching-class/g,
        i               = 0,
        length,
        anchors,
        anchor,
        hasElementChild,
        isEmpty,
        elementToSetCaretAfter,
        textContent,
        whiteSpace,
        j;
    wysihtml5.commands.formatInline.exec(composer, undef, NODE_NAME, tempClass, tempClassRegExp, undef, undef, true, true);
    anchors = doc.querySelectorAll(NODE_NAME + "." + tempClass);
    length  = anchors.length;
    for (; i<length; i++) {
      anchor = anchors[i];
      anchor.removeAttribute("class");
      for (j in attributes) {
        // Do not set attribute "text" as it is meant for setting string value if created link has no textual data
        if (j !== "text") {
          anchor.setAttribute(j, attributes[j]);
        }
      }
    }

    elementToSetCaretAfter = anchor;
    if (length === 1) {
      textContent = dom.getTextContent(anchor);
      hasElementChild = !!anchor.querySelector("*");
      isEmpty = textContent === "" || textContent === wysihtml5.INVISIBLE_SPACE;
      if (!hasElementChild && isEmpty) {
        dom.setTextContent(anchor, attributes.text || anchor.href);
        whiteSpace = doc.createTextNode(" ");
        composer.selection.setAfter(anchor);
        dom.insert(whiteSpace).after(anchor);
        elementToSetCaretAfter = whiteSpace;
      }
    }
    composer.selection.setAfter(elementToSetCaretAfter);
  }

  // Changes attributes of links
  function _changeLinks(composer, anchors, attributes) {
    var oldAttrs;
    for (var a = anchors.length; a--;) {

      // Remove all old attributes
      oldAttrs = anchors[a].attributes;
      for (var oa = oldAttrs.length; oa--;) {
        anchors[a].removeAttribute(oldAttrs.item(oa).name);
      }

      // Set new attributes
      for (var j in attributes) {
        if (attributes.hasOwnProperty(j)) {
          anchors[a].setAttribute(j, attributes[j]);
        }
      }

    }
  }

  wysihtml5.commands.createLink = {
    /**
     * TODO: Use HTMLApplier or formatInline here
     *
     * Turns selection into a link
     * If selection is already a link, it just changes the attributes
     *
     * @example
     *    // either ...
     *    wysihtml5.commands.createLink.exec(composer, "createLink", "http://www.google.de");
     *    // ... or ...
     *    wysihtml5.commands.createLink.exec(composer, "createLink", { href: "http://www.google.de", target: "_blank" });
     */
    exec: function(composer, command, value) {
      var anchors = this.state(composer, command);
      if (anchors) {
        // Selection contains links then change attributes of these links
        composer.selection.executeAndRestore(function() {
          _changeLinks(composer, anchors, value);
        });
      } else {
        // Create links
        value = typeof(value) === "object" ? value : { href: value };
        _format(composer, value);
      }
    },

    state: function(composer, command) {
      return wysihtml5.commands.formatInline.state(composer, command, "A");
    }
  };
})(wysihtml5);
;(function(wysihtml5) {
  var dom = wysihtml5.dom;

  function _removeFormat(composer, anchors) {
    var length  = anchors.length,
        i       = 0,
        anchor,
        codeElement,
        textContent;
    for (; i<length; i++) {
      anchor      = anchors[i];
      codeElement = dom.getParentElement(anchor, { nodeName: "code" });
      textContent = dom.getTextContent(anchor);

      // if <a> contains url-like text content, rename it to <code> to prevent re-autolinking
      // else replace <a> with its childNodes
      if (textContent.match(dom.autoLink.URL_REG_EXP) && !codeElement) {
        // <code> element is used to prevent later auto-linking of the content
        codeElement = dom.renameElement(anchor, "code");
      } else {
        dom.replaceWithChildNodes(anchor);
      }
    }
  }

  wysihtml5.commands.removeLink = {
    /*
     * If selection is a link, it removes the link and wraps it with a <code> element
     * The <code> element is needed to avoid auto linking
     *
     * @example
     *    wysihtml5.commands.createLink.exec(composer, "removeLink");
     */

    exec: function(composer, command) {
      var anchors = this.state(composer, command);
      if (anchors) {
        composer.selection.executeAndRestore(function() {
          _removeFormat(composer, anchors);
        });
      }
    },

    state: function(composer, command) {
      return wysihtml5.commands.formatInline.state(composer, command, "A");
    }
  };
})(wysihtml5);
;/**
 * document.execCommand("fontSize") will create either inline styles (firefox, chrome) or use font tags
 * which we don't want
 * Instead we set a css class
 */
(function(wysihtml5) {
  var REG_EXP = /wysiwyg-font-size-[0-9a-z\-]+/g;

  wysihtml5.commands.fontSize = {
    exec: function(composer, command, size) {
        wysihtml5.commands.formatInline.execWithToggle(composer, command, "span", "wysiwyg-font-size-" + size, REG_EXP);
    },

    state: function(composer, command, size) {
      return wysihtml5.commands.formatInline.state(composer, command, "span", "wysiwyg-font-size-" + size, REG_EXP);
    }
  };
})(wysihtml5);
;/* In case font size adjustment to any number defined by user is preferred, we cannot use classes and must use inline styles. */
(function(wysihtml5) {
  var REG_EXP = /(\s|^)font-size\s*:\s*[^;\s]+;?/gi;

  wysihtml5.commands.fontSizeStyle = {
    exec: function(composer, command, size) {
      size = (typeof(size) == "object") ? size.size : size;
      if (!(/^\s*$/).test(size)) {
        wysihtml5.commands.formatInline.execWithToggle(composer, command, "span", false, false, "font-size:" + size, REG_EXP);
      }
    },

    state: function(composer, command, size) {
      return wysihtml5.commands.formatInline.state(composer, command, "span", false, false, "font-size", REG_EXP);
    },

    stateValue: function(composer, command) {
      var st = this.state(composer, command),
          styleStr, fontsizeMatches,
          val = false;

      if (st && wysihtml5.lang.object(st).isArray()) {
          st = st[0];
      }
      if (st) {
        styleStr = st.getAttribute('style');
        if (styleStr) {
          return wysihtml5.quirks.styleParser.parseFontSize(styleStr);
        }
      }
      return false;
    }
  };
})(wysihtml5);
;/**
 * document.execCommand("foreColor") will create either inline styles (firefox, chrome) or use font tags
 * which we don't want
 * Instead we set a css class
 */
(function(wysihtml5) {
  var REG_EXP = /wysiwyg-color-[0-9a-z]+/g;

  wysihtml5.commands.foreColor = {
    exec: function(composer, command, color) {
        wysihtml5.commands.formatInline.execWithToggle(composer, command, "span", "wysiwyg-color-" + color, REG_EXP);
    },

    state: function(composer, command, color) {
      return wysihtml5.commands.formatInline.state(composer, command, "span", "wysiwyg-color-" + color, REG_EXP);
    }
  };
})(wysihtml5);
;/**
 * document.execCommand("foreColor") will create either inline styles (firefox, chrome) or use font tags
 * which we don't want
 * Instead we set a css class
 */
(function(wysihtml5) {
  var REG_EXP = /(\s|^)color\s*:\s*[^;\s]+;?/gi;

  wysihtml5.commands.foreColorStyle = {
    exec: function(composer, command, color) {
      var colorVals  = wysihtml5.quirks.styleParser.parseColor((typeof(color) == "object") ? "color:" + color.color : "color:" + color, "color"),
          colString;

      if (colorVals) {
        colString = "color: rgb(" + colorVals[0] + ',' + colorVals[1] + ',' + colorVals[2] + ');';
        if (colorVals[3] !== 1) {
          colString += "color: rgba(" + colorVals[0] + ',' + colorVals[1] + ',' + colorVals[2] + ',' + colorVals[3] + ');';
        }
        wysihtml5.commands.formatInline.execWithToggle(composer, command, "span", false, false, colString, REG_EXP);
      }
    },

    state: function(composer, command) {
      return wysihtml5.commands.formatInline.state(composer, command, "span", false, false, "color", REG_EXP);
    },

    stateValue: function(composer, command, props) {
      var st = this.state(composer, command),
          colorStr;

      if (st && wysihtml5.lang.object(st).isArray()) {
        st = st[0];
      }

      if (st) {
        colorStr = st.getAttribute('style');
        if (colorStr) {
          if (colorStr) {
            val = wysihtml5.quirks.styleParser.parseColor(colorStr, "color");
            return wysihtml5.quirks.styleParser.unparseColor(val, props);
          }
        }
      }
      return false;
    }

  };
})(wysihtml5);
;/* In case background adjustment to any color defined by user is preferred, we cannot use classes and must use inline styles. */
(function(wysihtml5) {
  var REG_EXP = /(\s|^)background-color\s*:\s*[^;\s]+;?/gi;

  wysihtml5.commands.bgColorStyle = {
    exec: function(composer, command, color) {
      var colorVals  = wysihtml5.quirks.styleParser.parseColor((typeof(color) == "object") ? "background-color:" + color.color : "background-color:" + color, "background-color"),
          colString;

      if (colorVals) {
        colString = "background-color: rgb(" + colorVals[0] + ',' + colorVals[1] + ',' + colorVals[2] + ');';
        if (colorVals[3] !== 1) {
          colString += "background-color: rgba(" + colorVals[0] + ',' + colorVals[1] + ',' + colorVals[2] + ',' + colorVals[3] + ');';
        }
        wysihtml5.commands.formatInline.execWithToggle(composer, command, "span", false, false, colString, REG_EXP);
      }
    },

    state: function(composer, command) {
      return wysihtml5.commands.formatInline.state(composer, command, "span", false, false, "background-color", REG_EXP);
    },

    stateValue: function(composer, command, props) {
      var st = this.state(composer, command),
          colorStr,
          val = false;

      if (st && wysihtml5.lang.object(st).isArray()) {
        st = st[0];
      }

      if (st) {
        colorStr = st.getAttribute('style');
        if (colorStr) {
          val = wysihtml5.quirks.styleParser.parseColor(colorStr, "background-color");
          return wysihtml5.quirks.styleParser.unparseColor(val, props);
        }
      }
      return false;
    }

  };
})(wysihtml5);
;(function(wysihtml5) {
  var dom                     = wysihtml5.dom,
      // Following elements are grouped
      // when the caret is within a H1 and the H4 is invoked, the H1 should turn into H4
      // instead of creating a H4 within a H1 which would result in semantically invalid html
      BLOCK_ELEMENTS_GROUP    = ["H1", "H2", "H3", "H4", "H5", "H6", "P", "PRE", "DIV"];

  /**
   * Remove similiar classes (based on classRegExp)
   * and add the desired class name
   */
  function _addClass(element, className, classRegExp) {
    if (element.className) {
      _removeClass(element, classRegExp);
      element.className = wysihtml5.lang.string(element.className + " " + className).trim();
    } else {
      element.className = className;
    }
  }

  function _addStyle(element, cssStyle, styleRegExp) {
    _removeStyle(element, styleRegExp);
    if (element.getAttribute('style')) {
      element.setAttribute('style', wysihtml5.lang.string(element.getAttribute('style') + " " + cssStyle).trim());
    } else {
      element.setAttribute('style', cssStyle);
    }
  }

  function _removeClass(element, classRegExp) {
    var ret = classRegExp.test(element.className);
    element.className = element.className.replace(classRegExp, "");
    if (wysihtml5.lang.string(element.className).trim() == '') {
        element.removeAttribute('class');
    }
    return ret;
  }

  function _removeStyle(element, styleRegExp) {
    var ret = styleRegExp.test(element.getAttribute('style'));
    element.setAttribute('style', (element.getAttribute('style') || "").replace(styleRegExp, ""));
    if (wysihtml5.lang.string(element.getAttribute('style') || "").trim() == '') {
      element.removeAttribute('style');
    }
    return ret;
  }

  function _removeLastChildIfLineBreak(node) {
    var lastChild = node.lastChild;
    if (lastChild && _isLineBreak(lastChild)) {
      lastChild.parentNode.removeChild(lastChild);
    }
  }

  function _isLineBreak(node) {
    return node.nodeName === "BR";
  }

  /**
   * Execute native query command
   * and if necessary modify the inserted node's className
   */
  function _execCommand(doc, composer, command, nodeName, className) {
    var ranges = composer.selection.getOwnRanges();
    for (var i = ranges.length; i--;){
      composer.selection.getSelection().removeAllRanges();
      composer.selection.setSelection(ranges[i]);
      if (className) {
        var eventListener = dom.observe(doc, "DOMNodeInserted", function(event) {
          var target = event.target,
              displayStyle;
          if (target.nodeType !== wysihtml5.ELEMENT_NODE) {
            return;
          }
          displayStyle = dom.getStyle("display").from(target);
          if (displayStyle.substr(0, 6) !== "inline") {
            // Make sure that only block elements receive the given class
            target.className += " " + className;
          }
        });
      }
      doc.execCommand(command, false, nodeName);

      if (eventListener) {
        eventListener.stop();
      }
    }
  }

  function _selectionWrap(composer, options) {
    if (composer.selection.isCollapsed()) {
        composer.selection.selectLine();
    }

    var surroundedNodes = composer.selection.surround(options);
    for (var i = 0, imax = surroundedNodes.length; i < imax; i++) {
      wysihtml5.dom.lineBreaks(surroundedNodes[i]).remove();
      _removeLastChildIfLineBreak(surroundedNodes[i]);
    }

    // rethink restoring selection
    // composer.selection.selectNode(element, wysihtml5.browser.displaysCaretInEmptyContentEditableCorrectly());
  }

  function _hasClasses(element) {
    return !!wysihtml5.lang.string(element.className).trim();
  }

  function _hasStyles(element) {
    return !!wysihtml5.lang.string(element.getAttribute('style') || '').trim();
  }

  wysihtml5.commands.formatBlock = {
    exec: function(composer, command, nodeName, className, classRegExp, cssStyle, styleRegExp) {
      var doc             = composer.doc,
          blockElements    = this.state(composer, command, nodeName, className, classRegExp, cssStyle, styleRegExp),
          useLineBreaks   = composer.config.useLineBreaks,
          defaultNodeName = useLineBreaks ? "DIV" : "P",
          selectedNodes, classRemoveAction, blockRenameFound, styleRemoveAction;
      nodeName = typeof(nodeName) === "string" ? nodeName.toUpperCase() : nodeName;

      if (blockElements.length) {
        composer.selection.executeAndRestoreRangy(function() {
          for (var b = blockElements.length; b--;) {
            if (classRegExp) {
              classRemoveAction = _removeClass(blockElements[b], classRegExp);
            }
            if (styleRegExp) {
              styleRemoveAction = _removeStyle(blockElements[b], styleRegExp);
            }

            if ((styleRemoveAction || classRemoveAction) && nodeName === null && blockElements[b].nodeName != defaultNodeName) {
              // dont rename or remove element when just setting block formating class or style
              return;
            }

            var hasClasses = _hasClasses(blockElements[b]),
                hasStyles = _hasStyles(blockElements[b]);

            if (!hasClasses && !hasStyles && (useLineBreaks || nodeName === "P")) {
              // Insert a line break afterwards and beforewards when there are siblings
              // that are not of type line break or block element
              wysihtml5.dom.lineBreaks(blockElements[b]).add();
              dom.replaceWithChildNodes(blockElements[b]);
            } else {
              // Make sure that styling is kept by renaming the element to a <div> or <p> and copying over the class name
              dom.renameElement(blockElements[b], nodeName === "P" ? "DIV" : defaultNodeName);
            }
          }
        });

        return;
      }

      // Find similiar block element and rename it (<h2 class="foo"></h2>  =>  <h1 class="foo"></h1>)
      if (nodeName === null || wysihtml5.lang.array(BLOCK_ELEMENTS_GROUP).contains(nodeName)) {
        selectedNodes = composer.selection.findNodesInSelection(BLOCK_ELEMENTS_GROUP).concat(composer.selection.getSelectedOwnNodes());
        composer.selection.executeAndRestoreRangy(function() {
          for (var n = selectedNodes.length; n--;) {
            blockElement = dom.getParentElement(selectedNodes[n], {
              nodeName: BLOCK_ELEMENTS_GROUP
            });
            if (blockElement == composer.element) {
              blockElement = null;
            }
            if (blockElement) {
                // Rename current block element to new block element and add class
                if (nodeName) {
                  blockElement = dom.renameElement(blockElement, nodeName);
                }
                if (className) {
                  _addClass(blockElement, className, classRegExp);
                }
                if (cssStyle) {
                  _addStyle(blockElement, cssStyle, styleRegExp);
                }
              blockRenameFound = true;
            }
          }

        });

        if (blockRenameFound) {
          return;
        }
      }

      _selectionWrap(composer, {
        "nodeName": (nodeName || defaultNodeName),
        "className": className || null,
        "cssStyle": cssStyle || null
      });
    },

    state: function(composer, command, nodeName, className, classRegExp, cssStyle, styleRegExp) {
      var nodes = composer.selection.getSelectedOwnNodes(),
          parents = [],
          parent;

      nodeName = typeof(nodeName) === "string" ? nodeName.toUpperCase() : nodeName;

      //var selectedNode = composer.selection.getSelectedNode();
      for (var i = 0, maxi = nodes.length; i < maxi; i++) {
        parent = dom.getParentElement(nodes[i], {
          nodeName:     nodeName,
          className:    className,
          classRegExp:  classRegExp,
          cssStyle:     cssStyle,
          styleRegExp:  styleRegExp
        });
        if (parent && wysihtml5.lang.array(parents).indexOf(parent) == -1) {
          parents.push(parent);
        }
      }
      if (parents.length == 0) {
        return false;
      }
      return parents;
    }


  };
})(wysihtml5);
;/* Formats block for as a <pre><code class="classname"></code></pre> block
 * Useful in conjuction for sytax highlight utility: highlight.js
 *
 * Usage:
 *
 * editorInstance.composer.commands.exec("formatCode", "language-html");
*/

wysihtml5.commands.formatCode = {

  exec: function(composer, command, classname) {
    var pre = this.state(composer),
        code, range, selectedNodes;
    if (pre) {
      // caret is already within a <pre><code>...</code></pre>
      composer.selection.executeAndRestore(function() {
        code = pre.querySelector("code");
        wysihtml5.dom.replaceWithChildNodes(pre);
        if (code) {
          wysihtml5.dom.replaceWithChildNodes(code);
        }
      });
    } else {
      // Wrap in <pre><code>...</code></pre>
      range = composer.selection.getRange();
      selectedNodes = range.extractContents();
      pre = composer.doc.createElement("pre");
      code = composer.doc.createElement("code");

      if (classname) {
        code.className = classname;
      }

      pre.appendChild(code);
      code.appendChild(selectedNodes);
      range.insertNode(pre);
      composer.selection.selectNode(pre);
    }
  },

  state: function(composer) {
    var selectedNode = composer.selection.getSelectedNode();
    if (selectedNode && selectedNode.nodeName && selectedNode.nodeName == "PRE"&&
        selectedNode.firstChild && selectedNode.firstChild.nodeName && selectedNode.firstChild.nodeName == "CODE") {
      return selectedNode;
    } else {
      return wysihtml5.dom.getParentElement(selectedNode, { nodeName: "CODE" }) && wysihtml5.dom.getParentElement(selectedNode, { nodeName: "PRE" });
    }
  }
};;/**
 * formatInline scenarios for tag "B" (| = caret, |foo| = selected text)
 *
 *   #1 caret in unformatted text:
 *      abcdefg|
 *   output:
 *      abcdefg<b>|</b>
 *
 *   #2 unformatted text selected:
 *      abc|deg|h
 *   output:
 *      abc<b>|deg|</b>h
 *
 *   #3 unformatted text selected across boundaries:
 *      ab|c <span>defg|h</span>
 *   output:
 *      ab<b>|c </b><span><b>defg</b>|h</span>
 *
 *   #4 formatted text entirely selected
 *      <b>|abc|</b>
 *   output:
 *      |abc|
 *
 *   #5 formatted text partially selected
 *      <b>ab|c|</b>
 *   output:
 *      <b>ab</b>|c|
 *
 *   #6 formatted text selected across boundaries
 *      <span>ab|c</span> <b>de|fgh</b>
 *   output:
 *      <span>ab|c</span> de|<b>fgh</b>
 */
(function(wysihtml5) {
  var // Treat <b> as <strong> and vice versa
      ALIAS_MAPPING = {
        "strong": "b",
        "em":     "i",
        "b":      "strong",
        "i":      "em"
      },
      htmlApplier = {};

  function _getTagNames(tagName) {
    var alias = ALIAS_MAPPING[tagName];
    return alias ? [tagName.toLowerCase(), alias.toLowerCase()] : [tagName.toLowerCase()];
  }

  function _getApplier(tagName, className, classRegExp, cssStyle, styleRegExp, container) {
    var identifier = tagName;
    
    if (className) {
      identifier += ":" + className;
    }
    if (cssStyle) {
      identifier += ":" + cssStyle;
    }

    if (!htmlApplier[identifier]) {
      htmlApplier[identifier] = new wysihtml5.selection.HTMLApplier(_getTagNames(tagName), className, classRegExp, true, cssStyle, styleRegExp, container);
    }

    return htmlApplier[identifier];
  }

  wysihtml5.commands.formatInline = {
    exec: function(composer, command, tagName, className, classRegExp, cssStyle, styleRegExp, dontRestoreSelect, noCleanup) {
      var range = composer.selection.createRange();
          ownRanges = composer.selection.getOwnRanges();

      if (!ownRanges || ownRanges.length == 0) {
        return false;
      }
      composer.selection.getSelection().removeAllRanges();

      _getApplier(tagName, className, classRegExp, cssStyle, styleRegExp, composer.element).toggleRange(ownRanges);

      if (!dontRestoreSelect) {
        range.setStart(ownRanges[0].startContainer,  ownRanges[0].startOffset);
        range.setEnd(
          ownRanges[ownRanges.length - 1].endContainer,
          ownRanges[ownRanges.length - 1].endOffset
        );
        composer.selection.setSelection(range);
        composer.selection.executeAndRestore(function() {
          if (!noCleanup) {
            composer.cleanUp();
          }
        }, true, true);
      } else if (!noCleanup) {
        composer.cleanUp();
      }
    },

    // Executes so that if collapsed caret is in a state and executing that state it should unformat that state
    // It is achieved by selecting the entire state element before executing.
    // This works on built in contenteditable inline format commands
    execWithToggle: function(composer, command, tagName, className, classRegExp, cssStyle, styleRegExp) {
      var that = this;

      if (this.state(composer, command, tagName, className, classRegExp, cssStyle, styleRegExp) &&
        composer.selection.isCollapsed() &&
        !composer.selection.caretIsLastInSelection() &&
        !composer.selection.caretIsFirstInSelection()
      ) {
        var state_element = that.state(composer, command, tagName, className, classRegExp)[0];
        composer.selection.executeAndRestoreRangy(function() {
          var parent = state_element.parentNode;
          composer.selection.selectNode(state_element, true);
          wysihtml5.commands.formatInline.exec(composer, command, tagName, className, classRegExp, cssStyle, styleRegExp, true, true);
        });
      } else {
        if (this.state(composer, command, tagName, className, classRegExp, cssStyle, styleRegExp) && !composer.selection.isCollapsed()) {
          composer.selection.executeAndRestoreRangy(function() {
            wysihtml5.commands.formatInline.exec(composer, command, tagName, className, classRegExp, cssStyle, styleRegExp, true, true);
          });
        } else {
          wysihtml5.commands.formatInline.exec(composer, command, tagName, className, classRegExp, cssStyle, styleRegExp);
        }
      }
    },

    state: function(composer, command, tagName, className, classRegExp, cssStyle, styleRegExp) {
      var doc           = composer.doc,
          aliasTagName  = ALIAS_MAPPING[tagName] || tagName,
          ownRanges, isApplied;

      // Check whether the document contains a node with the desired tagName
      if (!wysihtml5.dom.hasElementWithTagName(doc, tagName) &&
          !wysihtml5.dom.hasElementWithTagName(doc, aliasTagName)) {
        return false;
      }

       // Check whether the document contains a node with the desired className
      if (className && !wysihtml5.dom.hasElementWithClassName(doc, className)) {
         return false;
      }

      ownRanges = composer.selection.getOwnRanges();

      if (!ownRanges || ownRanges.length === 0) {
        return false;
      }

      isApplied = _getApplier(tagName, className, classRegExp, cssStyle, styleRegExp, composer.element).isAppliedToRange(ownRanges);

      return (isApplied && isApplied.elements) ? isApplied.elements : false;
    }
  };
})(wysihtml5);
;(function(wysihtml5) {

  wysihtml5.commands.insertBlockQuote = {
    exec: function(composer, command) {
      var state = this.state(composer, command),
          endToEndParent = composer.selection.isEndToEndInNode(['H1', 'H2', 'H3', 'H4', 'H5', 'H6', 'P']),
          prevNode, nextNode;

      composer.selection.executeAndRestore(function() {
        if (state) {
          if (composer.config.useLineBreaks) {
             wysihtml5.dom.lineBreaks(state).add();
          }
          wysihtml5.dom.unwrap(state);
        } else {
          if (composer.selection.isCollapsed()) {
            composer.selection.selectLine();
          }
          
          if (endToEndParent) {
            var qouteEl = endToEndParent.ownerDocument.createElement('blockquote');
            wysihtml5.dom.insert(qouteEl).after(endToEndParent);
            qouteEl.appendChild(endToEndParent);
          } else {
            composer.selection.surround({nodeName: "blockquote"});
          }
        }
      });
    },
    state: function(composer, command) {
      var selectedNode  = composer.selection.getSelectedNode(),
          node = wysihtml5.dom.getParentElement(selectedNode, { nodeName: "BLOCKQUOTE" }, false, composer.element);

      return (node) ? node : false;
    }
  };

})(wysihtml5);;wysihtml5.commands.insertHTML = {
  exec: function(composer, command, html) {
    if (composer.commands.support(command)) {
      composer.doc.execCommand(command, false, html);
    } else {
      composer.selection.insertHTML(html);
    }
  },

  state: function() {
    return false;
  }
};
;(function(wysihtml5) {
  var NODE_NAME = "IMG";

  wysihtml5.commands.insertImage = {
    /**
     * Inserts an <img>
     * If selection is already an image link, it removes it
     *
     * @example
     *    // either ...
     *    wysihtml5.commands.insertImage.exec(composer, "insertImage", "http://www.google.de/logo.jpg");
     *    // ... or ...
     *    wysihtml5.commands.insertImage.exec(composer, "insertImage", { src: "http://www.google.de/logo.jpg", title: "foo" });
     */
    exec: function(composer, command, value) {
      value = typeof(value) === "object" ? value : { src: value };

      var doc     = composer.doc,
          image   = this.state(composer),
          textNode,
          parent;

      if (image) {
        // Image already selected, set the caret before it and delete it
        composer.selection.setBefore(image);
        parent = image.parentNode;
        parent.removeChild(image);

        // and it's parent <a> too if it hasn't got any other relevant child nodes
        wysihtml5.dom.removeEmptyTextNodes(parent);
        if (parent.nodeName === "A" && !parent.firstChild) {
          composer.selection.setAfter(parent);
          parent.parentNode.removeChild(parent);
        }

        // firefox and ie sometimes don't remove the image handles, even though the image got removed
        wysihtml5.quirks.redraw(composer.element);
        return;
      }

      image = doc.createElement(NODE_NAME);

      for (var i in value) {
        image.setAttribute(i === "className" ? "class" : i, value[i]);
      }

      composer.selection.insertNode(image);
      if (wysihtml5.browser.hasProblemsSettingCaretAfterImg()) {
        textNode = doc.createTextNode(wysihtml5.INVISIBLE_SPACE);
        composer.selection.insertNode(textNode);
        composer.selection.setAfter(textNode);
      } else {
        composer.selection.setAfter(image);
      }
    },

    state: function(composer) {
      var doc = composer.doc,
          selectedNode,
          text,
          imagesInSelection;

      if (!wysihtml5.dom.hasElementWithTagName(doc, NODE_NAME)) {
        return false;
      }

      selectedNode = composer.selection.getSelectedNode();
      if (!selectedNode) {
        return false;
      }

      if (selectedNode.nodeName === NODE_NAME) {
        // This works perfectly in IE
        return selectedNode;
      }

      if (selectedNode.nodeType !== wysihtml5.ELEMENT_NODE) {
        return false;
      }

      text = composer.selection.getText();
      text = wysihtml5.lang.string(text).trim();
      if (text) {
        return false;
      }

      imagesInSelection = composer.selection.getNodes(wysihtml5.ELEMENT_NODE, function(node) {
        return node.nodeName === "IMG";
      });

      if (imagesInSelection.length !== 1) {
        return false;
      }

      return imagesInSelection[0];
    }
  };
})(wysihtml5);
;(function(wysihtml5) {
  var LINE_BREAK = "<br>" + (wysihtml5.browser.needsSpaceAfterLineBreak() ? " " : "");

  wysihtml5.commands.insertLineBreak = {
    exec: function(composer, command) {
      if (composer.commands.support(command)) {
        composer.doc.execCommand(command, false, null);
        if (!wysihtml5.browser.autoScrollsToCaret()) {
          composer.selection.scrollIntoView();
        }
      } else {
        composer.commands.exec("insertHTML", LINE_BREAK);
      }
    },

    state: function() {
      return false;
    }
  };
})(wysihtml5);
;wysihtml5.commands.insertOrderedList = {
  exec: function(composer, command) {
    wysihtml5.commands.insertList.exec(composer, command, "OL");
  },

  state: function(composer, command) {
    return wysihtml5.commands.insertList.state(composer, command, "OL");
  }
};
;wysihtml5.commands.insertUnorderedList = {
  exec: function(composer, command) {
    wysihtml5.commands.insertList.exec(composer, command, "UL");
  },

  state: function(composer, command) {
    return wysihtml5.commands.insertList.state(composer, command, "UL");
  }
};
;wysihtml5.commands.insertList = (function(wysihtml5) {

  var isNode = function(node, name) {
    if (node && node.nodeName) {
      if (typeof name === 'string') {
        name = [name];
      }
      for (var n = name.length; n--;) {
        if (node.nodeName === name[n]) {
          return true;
        }
      }
    }
    return false;
  };

  var findListEl = function(node, nodeName, composer) {
    var ret = {
          el: null,
          other: false
        };

    if (node) {
      var parentLi = wysihtml5.dom.getParentElement(node, { nodeName: "LI" });
          otherNodeName = (nodeName === "UL") ? "OL" : "UL";

      if (isNode(node, nodeName)) {
        ret.el = node;
      } else if (isNode(node, otherNodeName)) {
        ret = {
          el: node,
          other: true
        };
      } else if (parentLi) {
        if (isNode(parentLi.parentNode, nodeName)) {
          ret.el = parentLi.parentNode;
        } else if (isNode(parentLi.parentNode, otherNodeName)) {
          ret = {
            el : parentLi.parentNode,
            other: true
          };
        }
      }
    }

    // do not count list elements outside of composer
    if (ret.el && !composer.element.contains(ret.el)) {
      ret.el = null;
    }

    return ret;
  };

  var handleSameTypeList = function(el, nodeName, composer) {
    var otherNodeName = (nodeName === "UL") ? "OL" : "UL",
        otherLists, innerLists;
    // Unwrap list
    // <ul><li>foo</li><li>bar</li></ul>
    // becomes:
    // foo<br>bar<br>
    composer.selection.executeAndRestore(function() {
      var otherLists = getListsInSelection(otherNodeName, composer);
      if (otherLists.length) {
        for (var l = otherLists.length; l--;) {
          wysihtml5.dom.renameElement(otherLists[l], nodeName.toLowerCase());
        }
      } else {
        innerLists = getListsInSelection(['OL', 'UL'], composer);
        for (var i = innerLists.length; i--;) {
          wysihtml5.dom.resolveList(innerLists[i], composer.config.useLineBreaks);
        }
        wysihtml5.dom.resolveList(el, composer.config.useLineBreaks);
      }
    });
  };

  var handleOtherTypeList =  function(el, nodeName, composer) {
    var otherNodeName = (nodeName === "UL") ? "OL" : "UL";
    // Turn an ordered list into an unordered list
    // <ol><li>foo</li><li>bar</li></ol>
    // becomes:
    // <ul><li>foo</li><li>bar</li></ul>
    // Also rename other lists in selection
    composer.selection.executeAndRestore(function() {
      var renameLists = [el].concat(getListsInSelection(otherNodeName, composer));

      // All selection inner lists get renamed too
      for (var l = renameLists.length; l--;) {
        wysihtml5.dom.renameElement(renameLists[l], nodeName.toLowerCase());
      }
    });
  };

  var getListsInSelection = function(nodeName, composer) {
      var ranges = composer.selection.getOwnRanges(),
          renameLists = [];

      for (var r = ranges.length; r--;) {
        renameLists = renameLists.concat(ranges[r].getNodes([1], function(node) {
          return isNode(node, nodeName);
        }));
      }

      return renameLists;
  };

  var createListFallback = function(nodeName, composer) {
    // Fallback for Create list
    composer.selection.executeAndRestoreRangy(function() {
      var tempClassName =  "_wysihtml5-temp-" + new Date().getTime(),
          tempElement = composer.selection.deblockAndSurround({
            "nodeName": "div",
            "className": tempClassName
          }),
          isEmpty, list;

      // This space causes new lists to never break on enter 
      var INVISIBLE_SPACE_REG_EXP = /\uFEFF/g;
      tempElement.innerHTML = tempElement.innerHTML.replace(INVISIBLE_SPACE_REG_EXP, "");
      
      if (tempElement) {
        isEmpty = wysihtml5.lang.array(["", "<br>", wysihtml5.INVISIBLE_SPACE]).contains(tempElement.innerHTML);
        list = wysihtml5.dom.convertToList(tempElement, nodeName.toLowerCase(), composer.parent.config.uneditableContainerClassname);
        if (isEmpty) {
          composer.selection.selectNode(list.querySelector("li"), true);
        }
      }
    });
  };

  return {
    exec: function(composer, command, nodeName) {
      var doc           = composer.doc,
          cmd           = (nodeName === "OL") ? "insertorderedlist" : "insertunorderedlist",
          selectedNode  = composer.selection.getSelectedNode(),
          list          = findListEl(selectedNode, nodeName, composer);

      if (!list.el) {
        if (composer.commands.support(cmd)) {
          doc.execCommand(cmd, false, null);
        } else {
          createListFallback(nodeName, composer);
        }
      } else if (list.other) {
        handleOtherTypeList(list.el, nodeName, composer);
      } else {
        handleSameTypeList(list.el, nodeName, composer);
      }
    },

    state: function(composer, command, nodeName) {
      var selectedNode = composer.selection.getSelectedNode(),
          list         = findListEl(selectedNode, nodeName, composer);

      return (list.el && !list.other) ? list.el : false;
    }
  };

})(wysihtml5);;wysihtml5.commands.italic = {
  exec: function(composer, command) {
    wysihtml5.commands.formatInline.execWithToggle(composer, command, "i");
  },

  state: function(composer, command) {
    // element.ownerDocument.queryCommandState("italic") results:
    // firefox: only <i>
    // chrome:  <i>, <em>, <blockquote>, ...
    // ie:      <i>, <em>
    // opera:   only <i>
    return wysihtml5.commands.formatInline.state(composer, command, "i");
  }
};
;(function(wysihtml5) {
  var CLASS_NAME  = "wysiwyg-text-align-center",
      REG_EXP     = /wysiwyg-text-align-[0-9a-z]+/g;

  wysihtml5.commands.justifyCenter = {
    exec: function(composer, command) {
      return wysihtml5.commands.formatBlock.exec(composer, "formatBlock", null, CLASS_NAME, REG_EXP);
    },

    state: function(composer, command) {
      return wysihtml5.commands.formatBlock.state(composer, "formatBlock", null, CLASS_NAME, REG_EXP);
    }
  };
})(wysihtml5);
;(function(wysihtml5) {
  var CLASS_NAME  = "wysiwyg-text-align-left",
      REG_EXP     = /wysiwyg-text-align-[0-9a-z]+/g;

  wysihtml5.commands.justifyLeft = {
    exec: function(composer, command) {
      return wysihtml5.commands.formatBlock.exec(composer, "formatBlock", null, CLASS_NAME, REG_EXP);
    },

    state: function(composer, command) {
      return wysihtml5.commands.formatBlock.state(composer, "formatBlock", null, CLASS_NAME, REG_EXP);
    }
  };
})(wysihtml5);
;(function(wysihtml5) {
  var CLASS_NAME  = "wysiwyg-text-align-right",
      REG_EXP     = /wysiwyg-text-align-[0-9a-z]+/g;

  wysihtml5.commands.justifyRight = {
    exec: function(composer, command) {
      return wysihtml5.commands.formatBlock.exec(composer, "formatBlock", null, CLASS_NAME, REG_EXP);
    },

    state: function(composer, command) {
      return wysihtml5.commands.formatBlock.state(composer, "formatBlock", null, CLASS_NAME, REG_EXP);
    }
  };
})(wysihtml5);
;(function(wysihtml5) {
  var CLASS_NAME  = "wysiwyg-text-align-justify",
      REG_EXP     = /wysiwyg-text-align-[0-9a-z]+/g;

  wysihtml5.commands.justifyFull = {
    exec: function(composer, command) {
      return wysihtml5.commands.formatBlock.exec(composer, "formatBlock", null, CLASS_NAME, REG_EXP);
    },

    state: function(composer, command) {
      return wysihtml5.commands.formatBlock.state(composer, "formatBlock", null, CLASS_NAME, REG_EXP);
    }
  };
})(wysihtml5);
;(function(wysihtml5) {
  var STYLE_STR  = "text-align: right;",
      REG_EXP = /(\s|^)text-align\s*:\s*[^;\s]+;?/gi;

  wysihtml5.commands.alignRightStyle = {
    exec: function(composer, command) {
      return wysihtml5.commands.formatBlock.exec(composer, "formatBlock", null, null, null, STYLE_STR, REG_EXP);
    },

    state: function(composer, command) {
      return wysihtml5.commands.formatBlock.state(composer, "formatBlock", null, null, null, STYLE_STR, REG_EXP);
    }
  };
})(wysihtml5);
;(function(wysihtml5) {
  var STYLE_STR  = "text-align: left;",
      REG_EXP = /(\s|^)text-align\s*:\s*[^;\s]+;?/gi;

  wysihtml5.commands.alignLeftStyle = {
    exec: function(composer, command) {
      return wysihtml5.commands.formatBlock.exec(composer, "formatBlock", null, null, null, STYLE_STR, REG_EXP);
    },

    state: function(composer, command) {
      return wysihtml5.commands.formatBlock.state(composer, "formatBlock", null, null, null, STYLE_STR, REG_EXP);
    }
  };
})(wysihtml5);
;(function(wysihtml5) {
  var STYLE_STR  = "text-align: center;",
      REG_EXP = /(\s|^)text-align\s*:\s*[^;\s]+;?/gi;

  wysihtml5.commands.alignCenterStyle = {
    exec: function(composer, command) {
      return wysihtml5.commands.formatBlock.exec(composer, "formatBlock", null, null, null, STYLE_STR, REG_EXP);
    },

    state: function(composer, command) {
      return wysihtml5.commands.formatBlock.state(composer, "formatBlock", null, null, null, STYLE_STR, REG_EXP);
    }
  };
})(wysihtml5);
;wysihtml5.commands.redo = {
  exec: function(composer) {
    return composer.undoManager.redo();
  },

  state: function(composer) {
    return false;
  }
};
;wysihtml5.commands.underline = {
  exec: function(composer, command) {
    wysihtml5.commands.formatInline.execWithToggle(composer, command, "u");
  },

  state: function(composer, command) {
    return wysihtml5.commands.formatInline.state(composer, command, "u");
  }
};
;wysihtml5.commands.undo = {
  exec: function(composer) {
    return composer.undoManager.undo();
  },

  state: function(composer) {
    return false;
  }
};
;wysihtml5.commands.createTable = {
  exec: function(composer, command, value) {
      var col, row, html;
      if (value && value.cols && value.rows && parseInt(value.cols, 10) > 0 && parseInt(value.rows, 10) > 0) {
          if (value.tableStyle) {
            html = "<table style=\"" + value.tableStyle + "\">";
          } else {
            html = "<table>";
          }
          html += "<tbody>";
          for (row = 0; row < value.rows; row ++) {
              html += '<tr>';
              for (col = 0; col < value.cols; col ++) {
                  html += "<td>&nbsp;</td>";
              }
              html += '</tr>';
          }
          html += "</tbody></table>";
          composer.commands.exec("insertHTML", html);
          //composer.selection.insertHTML(html);
      }


  },

  state: function(composer, command) {
      return false;
  }
};
;wysihtml5.commands.mergeTableCells = {
  exec: function(composer, command) {
      if (composer.tableSelection && composer.tableSelection.start && composer.tableSelection.end) {
          if (this.state(composer, command)) {
              wysihtml5.dom.table.unmergeCell(composer.tableSelection.start);
          } else {
              wysihtml5.dom.table.mergeCellsBetween(composer.tableSelection.start, composer.tableSelection.end);
          }
      }
  },

  state: function(composer, command) {
      if (composer.tableSelection) {
          var start = composer.tableSelection.start,
              end = composer.tableSelection.end;
          if (start && end && start == end &&
              ((
                  wysihtml5.dom.getAttribute(start, "colspan") &&
                  parseInt(wysihtml5.dom.getAttribute(start, "colspan"), 10) > 1
              ) || (
                  wysihtml5.dom.getAttribute(start, "rowspan") &&
                  parseInt(wysihtml5.dom.getAttribute(start, "rowspan"), 10) > 1
              ))
          ) {
              return [start];
          }
      }
      return false;
  }
};
;wysihtml5.commands.addTableCells = {
  exec: function(composer, command, value) {
      if (composer.tableSelection && composer.tableSelection.start && composer.tableSelection.end) {

          // switches start and end if start is bigger than end (reverse selection)
          var tableSelect = wysihtml5.dom.table.orderSelectionEnds(composer.tableSelection.start, composer.tableSelection.end);
          if (value == "before" || value == "above") {
              wysihtml5.dom.table.addCells(tableSelect.start, value);
          } else if (value == "after" || value == "below") {
              wysihtml5.dom.table.addCells(tableSelect.end, value);
          }
          setTimeout(function() {
              composer.tableSelection.select(tableSelect.start, tableSelect.end);
          },0);
      }
  },

  state: function(composer, command) {
      return false;
  }
};
;wysihtml5.commands.deleteTableCells = {
  exec: function(composer, command, value) {
      if (composer.tableSelection && composer.tableSelection.start && composer.tableSelection.end) {
          var tableSelect = wysihtml5.dom.table.orderSelectionEnds(composer.tableSelection.start, composer.tableSelection.end),
              idx = wysihtml5.dom.table.indexOf(tableSelect.start),
              selCell,
              table = composer.tableSelection.table;

          wysihtml5.dom.table.removeCells(tableSelect.start, value);
          setTimeout(function() {
              // move selection to next or previous if not present
              selCell = wysihtml5.dom.table.findCell(table, idx);

              if (!selCell){
                  if (value == "row") {
                      selCell = wysihtml5.dom.table.findCell(table, {
                          "row": idx.row - 1,
                          "col": idx.col
                      });
                  }

                  if (value == "column") {
                      selCell = wysihtml5.dom.table.findCell(table, {
                          "row": idx.row,
                          "col": idx.col - 1
                      });
                  }
              }
              if (selCell) {
                  composer.tableSelection.select(selCell, selCell);
              }
          }, 0);

      }
  },

  state: function(composer, command) {
      return false;
  }
};
;wysihtml5.commands.indentList = {
  exec: function(composer, command, value) {
    var listEls = composer.selection.getSelectionParentsByTag('LI');
    if (listEls) {
      return this.tryToPushLiLevel(listEls, composer.selection);
    }
    return false;
  },

  state: function(composer, command) {
      return false;
  },

  tryToPushLiLevel: function(liNodes, selection) {
    var listTag, list, prevLi, liNode, prevLiList,
        found = false;

    selection.executeAndRestoreRangy(function() {

      for (var i = liNodes.length; i--;) {
        liNode = liNodes[i];
        listTag = (liNode.parentNode.nodeName === 'OL') ? 'OL' : 'UL';
        list = liNode.ownerDocument.createElement(listTag);
        prevLi = wysihtml5.dom.domNode(liNode).prev({nodeTypes: [wysihtml5.ELEMENT_NODE]});
        prevLiList = (prevLi) ? prevLi.querySelector('ul, ol') : null;

        if (prevLi) {
          if (prevLiList) {
            prevLiList.appendChild(liNode);
          } else {
            list.appendChild(liNode);
            prevLi.appendChild(list);
          }
          found = true;
        }
      }

    });
    return found;
  }
};
;wysihtml5.commands.outdentList = {
  exec: function(composer, command, value) {
    var listEls = composer.selection.getSelectionParentsByTag('LI');
    if (listEls) {
      return this.tryToPullLiLevel(listEls, composer);
    }
    return false;
  },

  state: function(composer, command) {
      return false;
  },

  tryToPullLiLevel: function(liNodes, composer) {
    var listNode, outerListNode, outerLiNode, list, prevLi, liNode, afterList,
        found = false,
        that = this;

    composer.selection.executeAndRestoreRangy(function() {

      for (var i = liNodes.length; i--;) {
        liNode = liNodes[i];
        if (liNode.parentNode) {
          listNode = liNode.parentNode;

          if (listNode.tagName === 'OL' || listNode.tagName === 'UL') {
            found = true;

            outerListNode = wysihtml5.dom.getParentElement(listNode.parentNode, { nodeName: ['OL', 'UL']}, false, composer.element);
            outerLiNode = wysihtml5.dom.getParentElement(listNode.parentNode, { nodeName: ['LI']}, false, composer.element);

            if (outerListNode && outerLiNode) {

              if (liNode.nextSibling) {
                afterList = that.getAfterList(listNode, liNode);
                liNode.appendChild(afterList);
              }
              outerListNode.insertBefore(liNode, outerLiNode.nextSibling);

            } else {

              if (liNode.nextSibling) {
                afterList = that.getAfterList(listNode, liNode);
                liNode.appendChild(afterList);
              }

              for (var j = liNode.childNodes.length; j--;) {
                listNode.parentNode.insertBefore(liNode.childNodes[j], listNode.nextSibling);
              }

              listNode.parentNode.insertBefore(document.createElement('br'), listNode.nextSibling);
              liNode.parentNode.removeChild(liNode);

            }

            // cleanup
            if (listNode.childNodes.length === 0) {
                listNode.parentNode.removeChild(listNode);
            }
          }
        }
      }

    });
    return found;
  },

  getAfterList: function(listNode, liNode) {
    var nodeName = listNode.nodeName,
        newList = document.createElement(nodeName);

    while (liNode.nextSibling) {
      newList.appendChild(liNode.nextSibling);
    }
    return newList;
  }

};;/**
 * Undo Manager for wysihtml5
 * slightly inspired by http://rniwa.com/editing/undomanager.html#the-undomanager-interface
 */
(function(wysihtml5) {
  var Z_KEY               = 90,
      Y_KEY               = 89,
      BACKSPACE_KEY       = 8,
      DELETE_KEY          = 46,
      MAX_HISTORY_ENTRIES = 25,
      DATA_ATTR_NODE      = "data-wysihtml5-selection-node",
      DATA_ATTR_OFFSET    = "data-wysihtml5-selection-offset",
      UNDO_HTML           = '<span id="_wysihtml5-undo" class="_wysihtml5-temp">' + wysihtml5.INVISIBLE_SPACE + '</span>',
      REDO_HTML           = '<span id="_wysihtml5-redo" class="_wysihtml5-temp">' + wysihtml5.INVISIBLE_SPACE + '</span>',
      dom                 = wysihtml5.dom;

  function cleanTempElements(doc) {
    var tempElement;
    while (tempElement = doc.querySelector("._wysihtml5-temp")) {
      tempElement.parentNode.removeChild(tempElement);
    }
  }

  wysihtml5.UndoManager = wysihtml5.lang.Dispatcher.extend(
    /** @scope wysihtml5.UndoManager.prototype */ {
    constructor: function(editor) {
      this.editor = editor;
      this.composer = editor.composer;
      this.element = this.composer.element;

      this.position = 0;
      this.historyStr = [];
      this.historyDom = [];

      this.transact();

      this._observe();
    },

    _observe: function() {
      var that      = this,
          doc       = this.composer.sandbox.getDocument(),
          lastKey;

      // Catch CTRL+Z and CTRL+Y
      dom.observe(this.element, "keydown", function(event) {
        if (event.altKey || (!event.ctrlKey && !event.metaKey)) {
          return;
        }

        var keyCode = event.keyCode,
            isUndo = keyCode === Z_KEY && !event.shiftKey,
            isRedo = (keyCode === Z_KEY && event.shiftKey) || (keyCode === Y_KEY);

        if (isUndo) {
          that.undo();
          event.preventDefault();
        } else if (isRedo) {
          that.redo();
          event.preventDefault();
        }
      });

      // Catch delete and backspace
      dom.observe(this.element, "keydown", function(event) {
        var keyCode = event.keyCode;
        if (keyCode === lastKey) {
          return;
        }

        lastKey = keyCode;

        if (keyCode === BACKSPACE_KEY || keyCode === DELETE_KEY) {
          that.transact();
        }
      });

      this.editor
        .on("newword:composer", function() {
          that.transact();
        })

        .on("beforecommand:composer", function() {
          that.transact();
        });
    },

    transact: function() {
      var previousHtml      = this.historyStr[this.position - 1],
          currentHtml       = this.composer.getValue(false, false);

      if (currentHtml === previousHtml) {
        return;
      }

      var length = this.historyStr.length = this.historyDom.length = this.position;
      if (length > MAX_HISTORY_ENTRIES) {
        this.historyStr.shift();
        this.historyDom.shift();
        this.position--;
      }

      this.position++;

      var range   = this.composer.selection.getRange(),
          node    = (range && range.startContainer) ? range.startContainer : this.element,
          offset  = (range && range.startOffset) ? range.startOffset : 0,
          element,
          position;

      if (node.nodeType === wysihtml5.ELEMENT_NODE) {
        element = node;
      } else {
        element  = node.parentNode;
        position = this.getChildNodeIndex(element, node);
      }

      element.setAttribute(DATA_ATTR_OFFSET, offset);
      if (typeof(position) !== "undefined") {
        element.setAttribute(DATA_ATTR_NODE, position);
      }

      var clone = this.element.cloneNode(!!currentHtml);
      this.historyDom.push(clone);
      this.historyStr.push(currentHtml);

      element.removeAttribute(DATA_ATTR_OFFSET);
      element.removeAttribute(DATA_ATTR_NODE);
    },

    undo: function() {
      this.transact();

      if (!this.undoPossible()) {
        return;
      }

      this.set(this.historyDom[--this.position - 1]);
      this.editor.fire("undo:composer");
    },

    redo: function() {
      if (!this.redoPossible()) {
        return;
      }

      this.set(this.historyDom[++this.position - 1]);
      this.editor.fire("redo:composer");
    },

    undoPossible: function() {
      return this.position > 1;
    },

    redoPossible: function() {
      return this.position < this.historyStr.length;
    },

    set: function(historyEntry) {
      this.element.innerHTML = "";

      var i = 0,
          childNodes = historyEntry.childNodes,
          length = historyEntry.childNodes.length;

      for (; i<length; i++) {
        this.element.appendChild(childNodes[i].cloneNode(true));
      }

      // Restore selection
      var offset,
          node,
          position;

      if (historyEntry.hasAttribute(DATA_ATTR_OFFSET)) {
        offset    = historyEntry.getAttribute(DATA_ATTR_OFFSET);
        position  = historyEntry.getAttribute(DATA_ATTR_NODE);
        node      = this.element;
      } else {
        node      = this.element.querySelector("[" + DATA_ATTR_OFFSET + "]") || this.element;
        offset    = node.getAttribute(DATA_ATTR_OFFSET);
        position  = node.getAttribute(DATA_ATTR_NODE);
        node.removeAttribute(DATA_ATTR_OFFSET);
        node.removeAttribute(DATA_ATTR_NODE);
      }

      if (position !== null) {
        node = this.getChildNodeByIndex(node, +position);
      }

      this.composer.selection.set(node, offset);
    },

    getChildNodeIndex: function(parent, child) {
      var i           = 0,
          childNodes  = parent.childNodes,
          length      = childNodes.length;
      for (; i<length; i++) {
        if (childNodes[i] === child) {
          return i;
        }
      }
    },

    getChildNodeByIndex: function(parent, index) {
      return parent.childNodes[index];
    }
  });
})(wysihtml5);
;/**
 * TODO: the following methods still need unit test coverage
 */
wysihtml5.views.View = Base.extend(
  /** @scope wysihtml5.views.View.prototype */ {
  constructor: function(parent, textareaElement, config) {
    this.parent   = parent;
    this.element  = textareaElement;
    this.config   = config;
    if (!this.config.noTextarea) {
        this._observeViewChange();
    }
  },

  _observeViewChange: function() {
    var that = this;
    this.parent.on("beforeload", function() {
      that.parent.on("change_view", function(view) {
        if (view === that.name) {
          that.parent.currentView = that;
          that.show();
          // Using tiny delay here to make sure that the placeholder is set before focusing
          setTimeout(function() { that.focus(); }, 0);
        } else {
          that.hide();
        }
      });
    });
  },

  focus: function() {
    if (this.element.ownerDocument.querySelector(":focus") === this.element) {
      return;
    }

    try { this.element.focus(); } catch(e) {}
  },

  hide: function() {
    this.element.style.display = "none";
  },

  show: function() {
    this.element.style.display = "";
  },

  disable: function() {
    this.element.setAttribute("disabled", "disabled");
  },

  enable: function() {
    this.element.removeAttribute("disabled");
  }
});
;(function(wysihtml5) {
  var dom       = wysihtml5.dom,
      browser   = wysihtml5.browser;

  wysihtml5.views.Composer = wysihtml5.views.View.extend(
    /** @scope wysihtml5.views.Composer.prototype */ {
    name: "composer",

    // Needed for firefox in order to display a proper caret in an empty contentEditable
    CARET_HACK: "<br>",

    constructor: function(parent, editableElement, config) {
      this.base(parent, editableElement, config);
      if (!this.config.noTextarea) {
          this.textarea = this.parent.textarea;
      } else {
          this.editableArea = editableElement;
      }
      if (this.config.contentEditableMode) {
          this._initContentEditableArea();
      } else {
          this._initSandbox();
      }
    },

    clear: function() {
      this.element.innerHTML = browser.displaysCaretInEmptyContentEditableCorrectly() ? "" : this.CARET_HACK;
    },

    getValue: function(parse, clearInternals) {
      var value = this.isEmpty() ? "" : wysihtml5.quirks.getCorrectInnerHTML(this.element);
      if (parse !== false) {
        value = this.parent.parse(value, (clearInternals === false) ? false : true);
      }

      return value;
    },

    setValue: function(html, parse) {
      if (parse) {
        html = this.parent.parse(html);
      }

      try {
        this.element.innerHTML = html;
      } catch (e) {
        this.element.innerText = html;
      }
    },

    cleanUp: function() {
        this.parent.parse(this.element);
    },

    show: function() {
      this.editableArea.style.display = this._displayStyle || "";

      if (!this.config.noTextarea && !this.textarea.element.disabled) {
        // Firefox needs this, otherwise contentEditable becomes uneditable
        this.disable();
        this.enable();
      }
    },

    hide: function() {
      this._displayStyle = dom.getStyle("display").from(this.editableArea);
      if (this._displayStyle === "none") {
        this._displayStyle = null;
      }
      this.editableArea.style.display = "none";
    },

    disable: function() {
      this.parent.fire("disable:composer");
      this.element.removeAttribute("contentEditable");
    },

    enable: function() {
      this.parent.fire("enable:composer");
      this.element.setAttribute("contentEditable", "true");
    },

    focus: function(setToEnd) {
      // IE 8 fires the focus event after .focus()
      // This is needed by our simulate_placeholder.js to work
      // therefore we clear it ourselves this time
      if (wysihtml5.browser.doesAsyncFocus() && this.hasPlaceholderSet()) {
        this.clear();
      }

      this.base();

      var lastChild = this.element.lastChild;
      if (setToEnd && lastChild && this.selection) {
        if (lastChild.nodeName === "BR") {
          this.selection.setBefore(this.element.lastChild);
        } else {
          this.selection.setAfter(this.element.lastChild);
        }
      }
    },

    getTextContent: function() {
      return dom.getTextContent(this.element);
    },

    hasPlaceholderSet: function() {
      return this.getTextContent() == ((this.config.noTextarea) ? this.editableArea.getAttribute("data-placeholder") : this.textarea.element.getAttribute("placeholder")) && this.placeholderSet;
    },

    isEmpty: function() {
      var innerHTML = this.element.innerHTML.toLowerCase();
      return (/^(\s|<br>|<\/br>|<p>|<\/p>)*$/i).test(innerHTML)  ||
             innerHTML === ""            ||
             innerHTML === "<br>"        ||
             innerHTML === "<p></p>"     ||
             innerHTML === "<p><br></p>" ||
             this.hasPlaceholderSet();
    },

    _initContentEditableArea: function() {
        var that = this;

        if (this.config.noTextarea) {
            this.sandbox = new dom.ContentEditableArea(function() {
                that._create();
            }, {}, this.editableArea);
        } else {
            this.sandbox = new dom.ContentEditableArea(function() {
                that._create();
            });
            this.editableArea = this.sandbox.getContentEditable();
            dom.insert(this.editableArea).after(this.textarea.element);
            this._createWysiwygFormField();
        }
    },

    _initSandbox: function() {
      var that = this;

      this.sandbox = new dom.Sandbox(function() {
        that._create();
      }, {
        stylesheets:  this.config.stylesheets
      });
      this.editableArea  = this.sandbox.getIframe();

      var textareaElement = this.textarea.element;
      dom.insert(this.editableArea).after(textareaElement);

      this._createWysiwygFormField();
    },

    // Creates hidden field which tells the server after submit, that the user used an wysiwyg editor
    _createWysiwygFormField: function() {
        if (this.textarea.element.form) {
          var hiddenField = document.createElement("input");
          hiddenField.type   = "hidden";
          hiddenField.name   = "_wysihtml5_mode";
          hiddenField.value  = 1;
          dom.insert(hiddenField).after(this.textarea.element);
        }
    },

    _create: function() {
      var that = this;
      this.doc                = this.sandbox.getDocument();
      this.element            = (this.config.contentEditableMode) ? this.sandbox.getContentEditable() : this.doc.body;
      if (!this.config.noTextarea) {
          this.textarea           = this.parent.textarea;
          this.element.innerHTML  = this.textarea.getValue(true, false);
      } else {
          this.cleanUp(); // cleans contenteditable on initiation as it may contain html
      }

      // Make sure our selection handler is ready
      this.selection = new wysihtml5.Selection(this.parent, this.element, this.config.uneditableContainerClassname);

      // Make sure commands dispatcher is ready
      this.commands  = new wysihtml5.Commands(this.parent);

      if (!this.config.noTextarea) {
          dom.copyAttributes([
              "className", "spellcheck", "title", "lang", "dir", "accessKey"
          ]).from(this.textarea.element).to(this.element);
      }

      dom.addClass(this.element, this.config.composerClassName);
      //
      // Make the editor look like the original textarea, by syncing styles
      if (this.config.style && !this.config.contentEditableMode) {
        this.style();
      }

      this.observe();

      var name = this.config.name;
      if (name) {
        dom.addClass(this.element, name);
        if (!this.config.contentEditableMode) { dom.addClass(this.editableArea, name); }
      }

      this.enable();

      if (!this.config.noTextarea && this.textarea.element.disabled) {
        this.disable();
      }

      // Simulate html5 placeholder attribute on contentEditable element
      var placeholderText = typeof(this.config.placeholder) === "string"
        ? this.config.placeholder
        : ((this.config.noTextarea) ? this.editableArea.getAttribute("data-placeholder") : this.textarea.element.getAttribute("placeholder"));
      if (placeholderText) {
        dom.simulatePlaceholder(this.parent, this, placeholderText);
      }

      // Make sure that the browser avoids using inline styles whenever possible
      this.commands.exec("styleWithCSS", false);

      this._initAutoLinking();
      this._initObjectResizing();
      this._initUndoManager();
      this._initLineBreaking();

      // Simulate html5 autofocus on contentEditable element
      // This doesn't work on IOS (5.1.1)
      if (!this.config.noTextarea && (this.textarea.element.hasAttribute("autofocus") || document.querySelector(":focus") == this.textarea.element) && !browser.isIos()) {
        setTimeout(function() { that.focus(true); }, 100);
      }

      // IE sometimes leaves a single paragraph, which can't be removed by the user
      if (!browser.clearsContentEditableCorrectly()) {
        wysihtml5.quirks.ensureProperClearing(this);
      }

      // Set up a sync that makes sure that textarea and editor have the same content
      if (this.initSync && this.config.sync) {
        this.initSync();
      }

      // Okay hide the textarea, we are ready to go
      if (!this.config.noTextarea) { this.textarea.hide(); }

      // Fire global (before-)load event
      this.parent.fire("beforeload").fire("load");
    },

    _initAutoLinking: function() {
      var that                           = this,
          supportsDisablingOfAutoLinking = browser.canDisableAutoLinking(),
          supportsAutoLinking            = browser.doesAutoLinkingInContentEditable();
      if (supportsDisablingOfAutoLinking) {
        this.commands.exec("autoUrlDetect", false);
      }

      if (!this.config.autoLink) {
        return;
      }

      // Only do the auto linking by ourselves when the browser doesn't support auto linking
      // OR when he supports auto linking but we were able to turn it off (IE9+)
      if (!supportsAutoLinking || (supportsAutoLinking && supportsDisablingOfAutoLinking)) {
        this.parent.on("newword:composer", function() {
          if (dom.getTextContent(that.element).match(dom.autoLink.URL_REG_EXP)) {
            that.selection.executeAndRestore(function(startContainer, endContainer) {
              var uneditables = that.element.querySelectorAll("." + that.config.uneditableContainerClassname),
                  isInUneditable = false;

              for (var i = uneditables.length; i--;) {
                if (wysihtml5.dom.contains(uneditables[i], endContainer)) {
                  isInUneditable = true;
                }
              }

              if (!isInUneditable) dom.autoLink(endContainer.parentNode, [that.config.uneditableContainerClassname]);
            });
          }
        });

        dom.observe(this.element, "blur", function() {
          dom.autoLink(that.element, [that.config.uneditableContainerClassname]);
        });
      }

      // Assuming we have the following:
      //  <a href="http://www.google.de">http://www.google.de</a>
      // If a user now changes the url in the innerHTML we want to make sure that
      // it's synchronized with the href attribute (as long as the innerHTML is still a url)
      var // Use a live NodeList to check whether there are any links in the document
          links           = this.sandbox.getDocument().getElementsByTagName("a"),
          // The autoLink helper method reveals a reg exp to detect correct urls
          urlRegExp       = dom.autoLink.URL_REG_EXP,
          getTextContent  = function(element) {
            var textContent = wysihtml5.lang.string(dom.getTextContent(element)).trim();
            if (textContent.substr(0, 4) === "www.") {
              textContent = "http://" + textContent;
            }
            return textContent;
          };

      dom.observe(this.element, "keydown", function(event) {
        if (!links.length) {
          return;
        }

        var selectedNode = that.selection.getSelectedNode(event.target.ownerDocument),
            link         = dom.getParentElement(selectedNode, { nodeName: "A" }, 4),
            textContent;

        if (!link) {
          return;
        }

        textContent = getTextContent(link);
        // keydown is fired before the actual content is changed
        // therefore we set a timeout to change the href
        setTimeout(function() {
          var newTextContent = getTextContent(link);
          if (newTextContent === textContent) {
            return;
          }

          // Only set href when new href looks like a valid url
          if (newTextContent.match(urlRegExp)) {
            link.setAttribute("href", newTextContent);
          }
        }, 0);
      });
    },

    _initObjectResizing: function() {
      this.commands.exec("enableObjectResizing", true);

      // IE sets inline styles after resizing objects
      // The following lines make sure that the width/height css properties
      // are copied over to the width/height attributes
      if (browser.supportsEvent("resizeend")) {
        var properties        = ["width", "height"],
            propertiesLength  = properties.length,
            element           = this.element;

        dom.observe(element, "resizeend", function(event) {
          var target = event.target || event.srcElement,
              style  = target.style,
              i      = 0,
              property;

          if (target.nodeName !== "IMG") {
            return;
          }

          for (; i<propertiesLength; i++) {
            property = properties[i];
            if (style[property]) {
              target.setAttribute(property, parseInt(style[property], 10));
              style[property] = "";
            }
          }

          // After resizing IE sometimes forgets to remove the old resize handles
          wysihtml5.quirks.redraw(element);
        });
      }
    },

    _initUndoManager: function() {
      this.undoManager = new wysihtml5.UndoManager(this.parent);
    },

    _initLineBreaking: function() {
      var that                              = this,
          USE_NATIVE_LINE_BREAK_INSIDE_TAGS = ["LI", "P", "H1", "H2", "H3", "H4", "H5", "H6"],
          LIST_TAGS                         = ["UL", "OL", "MENU"];

      function adjust(selectedNode) {
        var parentElement = dom.getParentElement(selectedNode, { nodeName: ["P", "DIV"] }, 2);
        if (parentElement && dom.contains(that.element, parentElement)) {
          that.selection.executeAndRestore(function() {
            if (that.config.useLineBreaks) {
              dom.replaceWithChildNodes(parentElement);
            } else if (parentElement.nodeName !== "P") {
              dom.renameElement(parentElement, "p");
            }
          });
        }
      }

      if (!this.config.useLineBreaks) {
        dom.observe(this.element, ["focus", "keydown"], function() {
          if (that.isEmpty()) {
            var paragraph = that.doc.createElement("P");
            that.element.innerHTML = "";
            that.element.appendChild(paragraph);
            if (!browser.displaysCaretInEmptyContentEditableCorrectly()) {
              paragraph.innerHTML = "<br>";
              that.selection.setBefore(paragraph.firstChild);
            } else {
              that.selection.selectNode(paragraph, true);
            }
          }
        });
      }

      // Under certain circumstances Chrome + Safari create nested <p> or <hX> tags after paste
      // Inserting an invisible white space in front of it fixes the issue
      // This is too hacky and causes selection not to replace content on paste in chrome
     /* if (browser.createsNestedInvalidMarkupAfterPaste()) {
        dom.observe(this.element, "paste", function(event) {
          var invisibleSpace = that.doc.createTextNode(wysihtml5.INVISIBLE_SPACE);
          that.selection.insertNode(invisibleSpace);
        });
      }*/


      dom.observe(this.element, "keydown", function(event) {
        var keyCode = event.keyCode;

        if (event.shiftKey) {
          return;
        }

        if (keyCode !== wysihtml5.ENTER_KEY && keyCode !== wysihtml5.BACKSPACE_KEY) {
          return;
        }
        var blockElement = dom.getParentElement(that.selection.getSelectedNode(), { nodeName: USE_NATIVE_LINE_BREAK_INSIDE_TAGS }, 4);
        if (blockElement) {
          setTimeout(function() {
            // Unwrap paragraph after leaving a list or a H1-6
            var selectedNode = that.selection.getSelectedNode(),
                list;

            if (blockElement.nodeName === "LI") {
              if (!selectedNode) {
                return;
              }

              list = dom.getParentElement(selectedNode, { nodeName: LIST_TAGS }, 2);

              if (!list) {
                adjust(selectedNode);
              }
            }

            if (keyCode === wysihtml5.ENTER_KEY && blockElement.nodeName.match(/^H[1-6]$/)) {
              adjust(selectedNode);
            }
          }, 0);
          return;
        }

        if (that.config.useLineBreaks && keyCode === wysihtml5.ENTER_KEY && !wysihtml5.browser.insertsLineBreaksOnReturn()) {
          event.preventDefault();
          that.commands.exec("insertLineBreak");

        }
      });
    }
  });
})(wysihtml5);
;(function(wysihtml5) {
  var dom             = wysihtml5.dom,
      doc             = document,
      win             = window,
      HOST_TEMPLATE   = doc.createElement("div"),
      /**
       * Styles to copy from textarea to the composer element
       */
      TEXT_FORMATTING = [
        "background-color",
        "color", "cursor",
        "font-family", "font-size", "font-style", "font-variant", "font-weight",
        "line-height", "letter-spacing",
        "text-align", "text-decoration", "text-indent", "text-rendering",
        "word-break", "word-wrap", "word-spacing"
      ],
      /**
       * Styles to copy from textarea to the iframe
       */
      BOX_FORMATTING = [
        "background-color",
        "border-collapse",
        "border-bottom-color", "border-bottom-style", "border-bottom-width",
        "border-left-color", "border-left-style", "border-left-width",
        "border-right-color", "border-right-style", "border-right-width",
        "border-top-color", "border-top-style", "border-top-width",
        "clear", "display", "float",
        "margin-bottom", "margin-left", "margin-right", "margin-top",
        "outline-color", "outline-offset", "outline-width", "outline-style",
        "padding-left", "padding-right", "padding-top", "padding-bottom",
        "position", "top", "left", "right", "bottom", "z-index",
        "vertical-align", "text-align",
        "-webkit-box-sizing", "-moz-box-sizing", "-ms-box-sizing", "box-sizing",
        "-webkit-box-shadow", "-moz-box-shadow", "-ms-box-shadow","box-shadow",
        "-webkit-border-top-right-radius", "-moz-border-radius-topright", "border-top-right-radius",
        "-webkit-border-bottom-right-radius", "-moz-border-radius-bottomright", "border-bottom-right-radius",
        "-webkit-border-bottom-left-radius", "-moz-border-radius-bottomleft", "border-bottom-left-radius",
        "-webkit-border-top-left-radius", "-moz-border-radius-topleft", "border-top-left-radius",
        "width", "height"
      ],
      ADDITIONAL_CSS_RULES = [
        "html                 { height: 100%; }",
        "body                 { height: 100%; padding: 1px 0 0 0; margin: -1px 0 0 0; }",
        "body > p:first-child { margin-top: 0; }",
        "._wysihtml5-temp     { display: none; }",
        wysihtml5.browser.isGecko ?
          "body.placeholder { color: graytext !important; }" :
          "body.placeholder { color: #a9a9a9 !important; }",
        // Ensure that user see's broken images and can delete them
        "img:-moz-broken      { -moz-force-broken-image-icon: 1; height: 24px; width: 24px; }"
      ];

  /**
   * With "setActive" IE offers a smart way of focusing elements without scrolling them into view:
   * http://msdn.microsoft.com/en-us/library/ms536738(v=vs.85).aspx
   *
   * Other browsers need a more hacky way: (pssst don't tell my mama)
   * In order to prevent the element being scrolled into view when focusing it, we simply
   * move it out of the scrollable area, focus it, and reset it's position
   */
  var focusWithoutScrolling = function(element) {
    if (element.setActive) {
      // Following line could cause a js error when the textarea is invisible
      // See https://github.com/xing/wysihtml5/issues/9
      try { element.setActive(); } catch(e) {}
    } else {
      var elementStyle = element.style,
          originalScrollTop = doc.documentElement.scrollTop || doc.body.scrollTop,
          originalScrollLeft = doc.documentElement.scrollLeft || doc.body.scrollLeft,
          originalStyles = {
            position:         elementStyle.position,
            top:              elementStyle.top,
            left:             elementStyle.left,
            WebkitUserSelect: elementStyle.WebkitUserSelect
          };

      dom.setStyles({
        position:         "absolute",
        top:              "-99999px",
        left:             "-99999px",
        // Don't ask why but temporarily setting -webkit-user-select to none makes the whole thing performing smoother
        WebkitUserSelect: "none"
      }).on(element);

      element.focus();

      dom.setStyles(originalStyles).on(element);

      if (win.scrollTo) {
        // Some browser extensions unset this method to prevent annoyances
        // "Better PopUp Blocker" for Chrome http://code.google.com/p/betterpopupblocker/source/browse/trunk/blockStart.js#100
        // Issue: http://code.google.com/p/betterpopupblocker/issues/detail?id=1
        win.scrollTo(originalScrollLeft, originalScrollTop);
      }
    }
  };


  wysihtml5.views.Composer.prototype.style = function() {
    var that                  = this,
        originalActiveElement = doc.querySelector(":focus"),
        textareaElement       = this.textarea.element,
        hasPlaceholder        = textareaElement.hasAttribute("placeholder"),
        originalPlaceholder   = hasPlaceholder && textareaElement.getAttribute("placeholder"),
        originalDisplayValue  = textareaElement.style.display,
        originalDisabled      = textareaElement.disabled,
        displayValueForCopying;

    this.focusStylesHost      = HOST_TEMPLATE.cloneNode(false);
    this.blurStylesHost       = HOST_TEMPLATE.cloneNode(false);
    this.disabledStylesHost   = HOST_TEMPLATE.cloneNode(false);

    // Remove placeholder before copying (as the placeholder has an affect on the computed style)
    if (hasPlaceholder) {
      textareaElement.removeAttribute("placeholder");
    }

    if (textareaElement === originalActiveElement) {
      textareaElement.blur();
    }

    // enable for copying styles
    textareaElement.disabled = false;

    // set textarea to display="none" to get cascaded styles via getComputedStyle
    textareaElement.style.display = displayValueForCopying = "none";

    if ((textareaElement.getAttribute("rows") && dom.getStyle("height").from(textareaElement) === "auto") ||
        (textareaElement.getAttribute("cols") && dom.getStyle("width").from(textareaElement) === "auto")) {
      textareaElement.style.display = displayValueForCopying = originalDisplayValue;
    }

    // --------- iframe styles (has to be set before editor styles, otherwise IE9 sets wrong fontFamily on blurStylesHost) ---------
    dom.copyStyles(BOX_FORMATTING).from(textareaElement).to(this.editableArea).andTo(this.blurStylesHost);

    // --------- editor styles ---------
    dom.copyStyles(TEXT_FORMATTING).from(textareaElement).to(this.element).andTo(this.blurStylesHost);

    // --------- apply standard rules ---------
    dom.insertCSS(ADDITIONAL_CSS_RULES).into(this.element.ownerDocument);

    // --------- :disabled styles ---------
    textareaElement.disabled = true;
    dom.copyStyles(BOX_FORMATTING).from(textareaElement).to(this.disabledStylesHost);
    dom.copyStyles(TEXT_FORMATTING).from(textareaElement).to(this.disabledStylesHost);
    textareaElement.disabled = originalDisabled;

    // --------- :focus styles ---------
    textareaElement.style.display = originalDisplayValue;
    focusWithoutScrolling(textareaElement);
    textareaElement.style.display = displayValueForCopying;

    dom.copyStyles(BOX_FORMATTING).from(textareaElement).to(this.focusStylesHost);
    dom.copyStyles(TEXT_FORMATTING).from(textareaElement).to(this.focusStylesHost);

    // reset textarea
    textareaElement.style.display = originalDisplayValue;

    dom.copyStyles(["display"]).from(textareaElement).to(this.editableArea);

    // Make sure that we don't change the display style of the iframe when copying styles oblur/onfocus
    // this is needed for when the change_view event is fired where the iframe is hidden and then
    // the blur event fires and re-displays it
    var boxFormattingStyles = wysihtml5.lang.array(BOX_FORMATTING).without(["display"]);

    // --------- restore focus ---------
    if (originalActiveElement) {
      originalActiveElement.focus();
    } else {
      textareaElement.blur();
    }

    // --------- restore placeholder ---------
    if (hasPlaceholder) {
      textareaElement.setAttribute("placeholder", originalPlaceholder);
    }

    // --------- Sync focus/blur styles ---------
    this.parent.on("focus:composer", function() {
      dom.copyStyles(boxFormattingStyles) .from(that.focusStylesHost).to(that.editableArea);
      dom.copyStyles(TEXT_FORMATTING)     .from(that.focusStylesHost).to(that.element);
    });

    this.parent.on("blur:composer", function() {
      dom.copyStyles(boxFormattingStyles) .from(that.blurStylesHost).to(that.editableArea);
      dom.copyStyles(TEXT_FORMATTING)     .from(that.blurStylesHost).to(that.element);
    });

    this.parent.observe("disable:composer", function() {
      dom.copyStyles(boxFormattingStyles) .from(that.disabledStylesHost).to(that.editableArea);
      dom.copyStyles(TEXT_FORMATTING)     .from(that.disabledStylesHost).to(that.element);
    });

    this.parent.observe("enable:composer", function() {
      dom.copyStyles(boxFormattingStyles) .from(that.blurStylesHost).to(that.editableArea);
      dom.copyStyles(TEXT_FORMATTING)     .from(that.blurStylesHost).to(that.element);
    });

    return this;
  };
})(wysihtml5);
;/**
 * Taking care of events
 *  - Simulating 'change' event on contentEditable element
 *  - Handling drag & drop logic
 *  - Catch paste events
 *  - Dispatch proprietary newword:composer event
 *  - Keyboard shortcuts
 */
(function(wysihtml5) {
  var dom       = wysihtml5.dom,
      browser   = wysihtml5.browser,
      /**
       * Map keyCodes to query commands
       */
      shortcuts = {
        "66": "bold",     // B
        "73": "italic",   // I
        "85": "underline" // U
      };

  var deleteAroundEditable = function(selection, uneditable, element) {
    // merge node with previous node from uneditable
    var prevNode = selection.getPreviousNode(uneditable, true),
        curNode = selection.getSelectedNode();

    if (curNode.nodeType !== 1 && curNode.parentNode !== element) { curNode = curNode.parentNode; }
    if (prevNode) {
      if (curNode.nodeType == 1) {
        var first = curNode.firstChild;

        if (prevNode.nodeType == 1) {
          while (curNode.firstChild) {
            prevNode.appendChild(curNode.firstChild);
          }
        } else {
          while (curNode.firstChild) {
            uneditable.parentNode.insertBefore(curNode.firstChild, uneditable);
          }
        }
        if (curNode.parentNode) {
          curNode.parentNode.removeChild(curNode);
        }
        selection.setBefore(first);
      } else {
        if (prevNode.nodeType == 1) {
          prevNode.appendChild(curNode);
        } else {
          uneditable.parentNode.insertBefore(curNode, uneditable);
        }
        selection.setBefore(curNode);
      }
    }
  };

  var handleDeleteKeyPress = function(event, selection, element, composer) {
    if (selection.isCollapsed()) {
      if (selection.caretIsInTheBeginnig('LI')) {
        event.preventDefault();
        composer.commands.exec('outdentList');
      } else if (selection.caretIsInTheBeginnig()) {
        event.preventDefault();
      } else {

        if (selection.caretIsFirstInSelection() &&
            selection.getPreviousNode() &&
            selection.getPreviousNode().nodeName &&
            (/^H\d$/gi).test(selection.getPreviousNode().nodeName)
        ) {
          var prevNode = selection.getPreviousNode();
          event.preventDefault();
          if ((/^\s*$/).test(prevNode.textContent || prevNode.innerText)) {
            // heading is empty
            prevNode.parentNode.removeChild(prevNode);
          } else {
            var range = prevNode.ownerDocument.createRange();
            range.selectNodeContents(prevNode);
            range.collapse(false);
            selection.setSelection(range);
          }
        }

        var beforeUneditable = selection.caretIsBeforeUneditable();
        // Do a special delete if caret would delete uneditable
        if (beforeUneditable) {
          event.preventDefault();
          deleteAroundEditable(selection, beforeUneditable, element);
        }
      }
    } else {
      if (selection.containsUneditable()) {
        event.preventDefault();
        selection.deleteContents();
      }
    }
  };

  var handleTabKeyDown = function(composer, element) {
    if (!composer.selection.isCollapsed()) {
      composer.selection.deleteContents();
    } else if (composer.selection.caretIsInTheBeginnig('LI')) {
      if (composer.commands.exec('indentList')) return;
    }

    // Is &emsp; close enough to tab. Could not find enough counter arguments for now.
    composer.commands.exec("insertHTML", "&emsp;");
  };

  wysihtml5.views.Composer.prototype.observe = function() {
    var that                = this,
        state               = this.getValue(false, false),
        container           = (this.sandbox.getIframe) ? this.sandbox.getIframe() : this.sandbox.getContentEditable(),
        element             = this.element,
        focusBlurElement    = (browser.supportsEventsInIframeCorrectly() || this.sandbox.getContentEditable) ? element : this.sandbox.getWindow(),
        pasteEvents         = ["drop", "paste"],
        interactionEvents   = ["drop", "paste", "mouseup", "focus", "keyup"];

    // --------- destroy:composer event ---------
    dom.observe(container, "DOMNodeRemoved", function() {
      clearInterval(domNodeRemovedInterval);
      that.parent.fire("destroy:composer");
    });

    // DOMNodeRemoved event is not supported in IE 8
    if (!browser.supportsMutationEvents()) {
        var domNodeRemovedInterval = setInterval(function() {
          if (!dom.contains(document.documentElement, container)) {
            clearInterval(domNodeRemovedInterval);
            that.parent.fire("destroy:composer");
          }
        }, 250);
    }

    // --------- User interaction tracking --

    dom.observe(focusBlurElement, interactionEvents, function() {
      setTimeout(function() {
        that.parent.fire("interaction").fire("interaction:composer");
      }, 0);
    });


    if (this.config.handleTables) {
      if(this.doc.execCommand && wysihtml5.browser.supportsCommand(this.doc, "enableObjectResizing") && wysihtml5.browser.supportsCommand(this.doc, "enableInlineTableEditing")) {
        setTimeout(function() {
          that.doc.execCommand("enableObjectResizing", false, "false");
          that.doc.execCommand("enableInlineTableEditing", false, "false");
        }, 0);
      }
      this.tableSelection = wysihtml5.quirks.tableCellsSelection(element, that.parent);
    }

    // --------- Focus & blur logic ---------
    dom.observe(focusBlurElement, "focus", function() {
      that.parent.fire("focus").fire("focus:composer");

      // Delay storing of state until all focus handler are fired
      // especially the one which resets the placeholder
      setTimeout(function() { state = that.getValue(false, false); }, 0);
    });

    dom.observe(focusBlurElement, "blur", function() {
      if (state !== that.getValue(false, false)) {
        that.parent.fire("change").fire("change:composer");
      }
      that.parent.fire("blur").fire("blur:composer");
    });

    // --------- Drag & Drop logic ---------
    dom.observe(element, "dragenter", function() {
      that.parent.fire("unset_placeholder");
    });

    dom.observe(element, pasteEvents, function() {
      setTimeout(function() {
        that.parent.fire("paste").fire("paste:composer");
      }, 0);
    });

    // --------- neword event ---------
    dom.observe(element, "keyup", function(event) {
      var keyCode = event.keyCode;
      if (keyCode === wysihtml5.SPACE_KEY || keyCode === wysihtml5.ENTER_KEY) {
        that.parent.fire("newword:composer");
      }
    });

    this.parent.on("paste:composer", function() {
      setTimeout(function() { that.parent.fire("newword:composer"); }, 0);
    });

    // --------- Make sure that images are selected when clicking on them ---------
    if (!browser.canSelectImagesInContentEditable()) {
      dom.observe(element, "mousedown", function(event) {
        var target = event.target;
        var allImages = element.querySelectorAll('img'),
            notMyImages = element.querySelectorAll('.' + that.config.uneditableContainerClassname + ' img'),
            myImages = wysihtml5.lang.array(allImages).without(notMyImages);

        if (target.nodeName === "IMG" && wysihtml5.lang.array(myImages).contains(target)) {
          that.selection.selectNode(target);
        }
      });
    }

    if (!browser.canSelectImagesInContentEditable()) {
        dom.observe(element, "drop", function(event) {
            // TODO: if I knew how to get dropped elements list from event I could limit it to only IMG element case
            setTimeout(function() {
                that.selection.getSelection().removeAllRanges();
            }, 0);
        });
    }

    if (browser.hasHistoryIssue() && browser.supportsSelectionModify()) {
      dom.observe(element, "keydown", function(event) {
        if (!event.metaKey && !event.ctrlKey) {
          return;
        }

        var keyCode   = event.keyCode,
            win       = element.ownerDocument.defaultView,
            selection = win.getSelection();

        if (keyCode === 37 || keyCode === 39) {
          if (keyCode === 37) {
            selection.modify("extend", "left", "lineboundary");
            if (!event.shiftKey) {
              selection.collapseToStart();
            }
          }
          if (keyCode === 39) {
            selection.modify("extend", "right", "lineboundary");
            if (!event.shiftKey) {
              selection.collapseToEnd();
            }
          }
          event.preventDefault();
        }
      });
    }

    // --------- Shortcut logic ---------
    dom.observe(element, "keydown", function(event) {
      var keyCode  = event.keyCode,
          command  = shortcuts[keyCode];
      if ((event.ctrlKey || event.metaKey) && !event.altKey && command) {
        that.commands.exec(command);
        event.preventDefault();
      }
      if (keyCode === 8) {
        // delete key
        handleDeleteKeyPress(event, that.selection, element, that);
      } else if (that.config.handleTabKey && keyCode === 9) {
        event.preventDefault();
        handleTabKeyDown(that, element);
      }
    });

    // --------- Make sure that when pressing backspace/delete on selected images deletes the image and it's anchor ---------
    dom.observe(element, "keydown", function(event) {
      var target  = that.selection.getSelectedNode(true),
          keyCode = event.keyCode,
          parent;
      if (target && target.nodeName === "IMG" && (keyCode === wysihtml5.BACKSPACE_KEY || keyCode === wysihtml5.DELETE_KEY)) { // 8 => backspace, 46 => delete
        parent = target.parentNode;
        // delete the <img>
        parent.removeChild(target);
        // and it's parent <a> too if it hasn't got any other child nodes
        if (parent.nodeName === "A" && !parent.firstChild) {
          parent.parentNode.removeChild(parent);
        }

        setTimeout(function() { wysihtml5.quirks.redraw(element); }, 0);
        event.preventDefault();
      }
    });

    // --------- IE 8+9 focus the editor when the iframe is clicked (without actually firing the 'focus' event on the <body>) ---------
    if (!this.config.contentEditableMode && browser.hasIframeFocusIssue()) {
      dom.observe(container, "focus", function() {
        setTimeout(function() {
          if (that.doc.querySelector(":focus") !== that.element) {
            that.focus();
          }
        }, 0);
      });

      dom.observe(this.element, "blur", function() {
        setTimeout(function() {
          that.selection.getSelection().removeAllRanges();
        }, 0);
      });
    }

    // --------- Show url in tooltip when hovering links or images ---------
    var titlePrefixes = {
      IMG: "Image: ",
      A:   "Link: "
    };

    dom.observe(element, "mouseover", function(event) {
      var target   = event.target,
          nodeName = target.nodeName,
          title;
      if (nodeName !== "A" && nodeName !== "IMG") {
        return;
      }
      var hasTitle = target.hasAttribute("title");
      if(!hasTitle){
        title = titlePrefixes[nodeName] + (target.getAttribute("href") || target.getAttribute("src"));
        target.setAttribute("title", title);
      }
    });
  };
})(wysihtml5);
;/**
 * Class that takes care that the value of the composer and the textarea is always in sync
 */
(function(wysihtml5) {
  var INTERVAL = 400;

  wysihtml5.views.Synchronizer = Base.extend(
    /** @scope wysihtml5.views.Synchronizer.prototype */ {

    constructor: function(editor, textarea, composer) {
      this.editor   = editor;
      this.textarea = textarea;
      this.composer = composer;

      this._observe();
    },

    /**
     * Sync html from composer to textarea
     * Takes care of placeholders
     * @param {Boolean} shouldParseHtml Whether the html should be sanitized before inserting it into the textarea
     */
    fromComposerToTextarea: function(shouldParseHtml) {
      this.textarea.setValue(wysihtml5.lang.string(this.composer.getValue(false, false)).trim(), shouldParseHtml);
    },

    /**
     * Sync value of textarea to composer
     * Takes care of placeholders
     * @param {Boolean} shouldParseHtml Whether the html should be sanitized before inserting it into the composer
     */
    fromTextareaToComposer: function(shouldParseHtml) {
      var textareaValue = this.textarea.getValue(false, false);
      if (textareaValue) {
        this.composer.setValue(textareaValue, shouldParseHtml);
      } else {
        this.composer.clear();
        this.editor.fire("set_placeholder");
      }
    },

    /**
     * Invoke syncing based on view state
     * @param {Boolean} shouldParseHtml Whether the html should be sanitized before inserting it into the composer/textarea
     */
    sync: function(shouldParseHtml) {
      if (this.editor.currentView.name === "textarea") {
        this.fromTextareaToComposer(shouldParseHtml);
      } else {
        this.fromComposerToTextarea(shouldParseHtml);
      }
    },

    /**
     * Initializes interval-based syncing
     * also makes sure that on-submit the composer's content is synced with the textarea
     * immediately when the form gets submitted
     */
    _observe: function() {
      var interval,
          that          = this,
          form          = this.textarea.element.form,
          startInterval = function() {
            interval = setInterval(function() { that.fromComposerToTextarea(); }, INTERVAL);
          },
          stopInterval  = function() {
            clearInterval(interval);
            interval = null;
          };

      startInterval();

      if (form) {
        // If the textarea is in a form make sure that after onreset and onsubmit the composer
        // has the correct state
        wysihtml5.dom.observe(form, "submit", function() {
          that.sync(true);
        });
        wysihtml5.dom.observe(form, "reset", function() {
          setTimeout(function() { that.fromTextareaToComposer(); }, 0);
        });
      }

      this.editor.on("change_view", function(view) {
        if (view === "composer" && !interval) {
          that.fromTextareaToComposer(true);
          startInterval();
        } else if (view === "textarea") {
          that.fromComposerToTextarea(true);
          stopInterval();
        }
      });

      this.editor.on("destroy:composer", stopInterval);
    }
  });
})(wysihtml5);
;wysihtml5.views.Textarea = wysihtml5.views.View.extend(
  /** @scope wysihtml5.views.Textarea.prototype */ {
  name: "textarea",

  constructor: function(parent, textareaElement, config) {
    this.base(parent, textareaElement, config);

    this._observe();
  },

  clear: function() {
    this.element.value = "";
  },

  getValue: function(parse) {
    var value = this.isEmpty() ? "" : this.element.value;
    if (parse !== false) {
      value = this.parent.parse(value);
    }
    return value;
  },

  setValue: function(html, parse) {
    if (parse) {
      html = this.parent.parse(html);
    }
    this.element.value = html;
  },

  cleanUp: function() {
      var html = this.parent.parse(this.element.value);
      this.element.value = html;
  },

  hasPlaceholderSet: function() {
    var supportsPlaceholder = wysihtml5.browser.supportsPlaceholderAttributeOn(this.element),
        placeholderText     = this.element.getAttribute("placeholder") || null,
        value               = this.element.value,
        isEmpty             = !value;
    return (supportsPlaceholder && isEmpty) || (value === placeholderText);
  },

  isEmpty: function() {
    return !wysihtml5.lang.string(this.element.value).trim() || this.hasPlaceholderSet();
  },

  _observe: function() {
    var element = this.element,
        parent  = this.parent,
        eventMapping = {
          focusin:  "focus",
          focusout: "blur"
        },
        /**
         * Calling focus() or blur() on an element doesn't synchronously trigger the attached focus/blur events
         * This is the case for focusin and focusout, so let's use them whenever possible, kkthxbai
         */
        events = wysihtml5.browser.supportsEvent("focusin") ? ["focusin", "focusout", "change"] : ["focus", "blur", "change"];

    parent.on("beforeload", function() {
      wysihtml5.dom.observe(element, events, function(event) {
        var eventName = eventMapping[event.type] || event.type;
        parent.fire(eventName).fire(eventName + ":textarea");
      });

      wysihtml5.dom.observe(element, ["paste", "drop"], function() {
        setTimeout(function() { parent.fire("paste").fire("paste:textarea"); }, 0);
      });
    });
  }
});
;/**
 * WYSIHTML5 Editor
 *
 * @param {Element} editableElement Reference to the textarea which should be turned into a rich text interface
 * @param {Object} [config] See defaultConfig object below for explanation of each individual config option
 *
 * @events
 *    load
 *    beforeload (for internal use only)
 *    focus
 *    focus:composer
 *    focus:textarea
 *    blur
 *    blur:composer
 *    blur:textarea
 *    change
 *    change:composer
 *    change:textarea
 *    paste
 *    paste:composer
 *    paste:textarea
 *    newword:composer
 *    destroy:composer
 *    undo:composer
 *    redo:composer
 *    beforecommand:composer
 *    aftercommand:composer
 *    enable:composer
 *    disable:composer
 *    change_view
 */
(function(wysihtml5) {
  var undef;

  var defaultConfig = {
    // Give the editor a name, the name will also be set as class name on the iframe and on the iframe's body
    name:                 undef,
    // Whether the editor should look like the textarea (by adopting styles)
    style:                true,
    // Id of the toolbar element, pass falsey value if you don't want any toolbar logic
    toolbar:              undef,
    // Whether toolbar is displayed after init by script automatically.
    // Can be set to false if toolobar is set to display only on editable area focus
    showToolbarAfterInit: true,
    // Whether urls, entered by the user should automatically become clickable-links
    autoLink:             true,
    // Includes table editing events and cell selection tracking
    handleTables:         true,
    // Tab key inserts tab into text as default behaviour. It can be disabled to regain keyboard navigation
    handleTabKey:         true,
    // Object which includes parser rules to apply when html gets inserted via copy & paste
    // See parser_rules/*.js for examples
    parserRules:          { tags: { br: {}, span: {}, div: {}, p: {} }, classes: {} },
    // Parser method to use when the user inserts content via copy & paste
    parser:               wysihtml5.dom.parse,
    // Class name which should be set on the contentEditable element in the created sandbox iframe, can be styled via the 'stylesheets' option
    composerClassName:    "wysihtml5-editor",
    // Class name to add to the body when the wysihtml5 editor is supported
    bodyClassName:        "wysihtml5-supported",
    // By default wysihtml5 will insert a <br> for line breaks, set this to false to use <p>
    useLineBreaks:        true,
    // Array (or single string) of stylesheet urls to be loaded in the editor's iframe
    stylesheets:          [],
    // Placeholder text to use, defaults to the placeholder attribute on the textarea element
    placeholderText:      undef,
    // Whether the rich text editor should be rendered on touch devices (wysihtml5 >= 0.3.0 comes with basic support for iOS 5)
    supportTouchDevices:  true,
    // Whether senseless <span> elements (empty or without attributes) should be removed/replaced with their content
    cleanUp:              true,
    // Whether to use div instead of secure iframe
    contentEditableMode: false,
    // Classname of container that editor should not touch and pass through
    // Pass false to disable
    uneditableContainerClassname: "wysihtml5-uneditable-container"
  };

  wysihtml5.Editor = wysihtml5.lang.Dispatcher.extend(
    /** @scope wysihtml5.Editor.prototype */ {
    constructor: function(editableElement, config) {
      this.editableElement  = typeof(editableElement) === "string" ? document.getElementById(editableElement) : editableElement;
      this.config           = wysihtml5.lang.object({}).merge(defaultConfig).merge(config).get();
      this._isCompatible    = wysihtml5.browser.supported();

      if (this.editableElement.nodeName.toLowerCase() != "textarea") {
          this.config.contentEditableMode = true;
          this.config.noTextarea = true;
      }
      if (!this.config.noTextarea) {
          this.textarea         = new wysihtml5.views.Textarea(this, this.editableElement, this.config);
          this.currentView      = this.textarea;
      }

      // Sort out unsupported/unwanted browsers here
      if (!this._isCompatible || (!this.config.supportTouchDevices && wysihtml5.browser.isTouchDevice())) {
        var that = this;
        setTimeout(function() { that.fire("beforeload").fire("load"); }, 0);
        return;
      }

      // Add class name to body, to indicate that the editor is supported
      wysihtml5.dom.addClass(document.body, this.config.bodyClassName);

      this.composer = new wysihtml5.views.Composer(this, this.editableElement, this.config);
      this.currentView = this.composer;

      if (typeof(this.config.parser) === "function") {
        this._initParser();
      }

      this.on("beforeload", this.handleBeforeLoad);
    },

    handleBeforeLoad: function() {
        if (!this.config.noTextarea) {
            this.synchronizer = new wysihtml5.views.Synchronizer(this, this.textarea, this.composer);
        }
        if (this.config.toolbar) {
          this.toolbar = new wysihtml5.toolbar.Toolbar(this, this.config.toolbar, this.config.showToolbarAfterInit);
        }
    },

    isCompatible: function() {
      return this._isCompatible;
    },

    clear: function() {
      this.currentView.clear();
      return this;
    },

    getValue: function(parse, clearInternals) {
      return this.currentView.getValue(parse, clearInternals);
    },

    setValue: function(html, parse) {
      this.fire("unset_placeholder");

      if (!html) {
        return this.clear();
      }

      this.currentView.setValue(html, parse);
      return this;
    },

    cleanUp: function() {
        this.currentView.cleanUp();
    },

    focus: function(setToEnd) {
      this.currentView.focus(setToEnd);
      return this;
    },

    /**
     * Deactivate editor (make it readonly)
     */
    disable: function() {
      this.currentView.disable();
      return this;
    },

    /**
     * Activate editor
     */
    enable: function() {
      this.currentView.enable();
      return this;
    },

    isEmpty: function() {
      return this.currentView.isEmpty();
    },

    hasPlaceholderSet: function() {
      return this.currentView.hasPlaceholderSet();
    },

    parse: function(htmlOrElement, clearInternals) {
      var parseContext = (this.config.contentEditableMode) ? document : ((this.composer) ? this.composer.sandbox.getDocument() : null);
      var returnValue = this.config.parser(htmlOrElement, {
        "rules": this.config.parserRules,
        "cleanUp": this.config.cleanUp,
        "context": parseContext,
        "uneditableClass": this.config.uneditableContainerClassname,
        "clearInternals" : clearInternals
      });
      if (typeof(htmlOrElement) === "object") {
        wysihtml5.quirks.redraw(htmlOrElement);
      }
      return returnValue;
    },

    /**
     * Prepare html parser logic
     *  - Observes for paste and drop
     */
    _initParser: function() {
      this.on("paste:composer", function() {
        var keepScrollPosition  = true,
            that                = this;
        that.composer.selection.executeAndRestore(function() {
          wysihtml5.quirks.cleanPastedHTML(that.composer.element);
          that.parse(that.composer.element);
        }, keepScrollPosition);
      });
    }
  });
})(wysihtml5);
;/**
 * Toolbar Dialog
 *
 * @param {Element} link The toolbar link which causes the dialog to show up
 * @param {Element} container The dialog container
 *
 * @example
 *    <!-- Toolbar link -->
 *    <a data-wysihtml5-command="insertImage">insert an image</a>
 *
 *    <!-- Dialog -->
 *    <div data-wysihtml5-dialog="insertImage" style="display: none;">
 *      <label>
 *        URL: <input data-wysihtml5-dialog-field="src" value="http://">
 *      </label>
 *      <label>
 *        Alternative text: <input data-wysihtml5-dialog-field="alt" value="">
 *      </label>
 *    </div>
 *
 *    <script>
 *      var dialog = new wysihtml5.toolbar.Dialog(
 *        document.querySelector("[data-wysihtml5-command='insertImage']"),
 *        document.querySelector("[data-wysihtml5-dialog='insertImage']")
 *      );
 *      dialog.observe("save", function(attributes) {
 *        // do something
 *      });
 *    </script>
 */
(function(wysihtml5) {
  var dom                     = wysihtml5.dom,
      CLASS_NAME_OPENED       = "wysihtml5-command-dialog-opened",
      SELECTOR_FORM_ELEMENTS  = "input, select, textarea",
      SELECTOR_FIELDS         = "[data-wysihtml5-dialog-field]",
      ATTRIBUTE_FIELDS        = "data-wysihtml5-dialog-field";


  wysihtml5.toolbar.Dialog = wysihtml5.lang.Dispatcher.extend(
    /** @scope wysihtml5.toolbar.Dialog.prototype */ {
    constructor: function(link, container) {
      this.link       = link;
      this.container  = container;
    },

    _observe: function() {
      if (this._observed) {
        return;
      }

      var that = this,
          callbackWrapper = function(event) {
            var attributes = that._serialize();
            if (attributes == that.elementToChange) {
              that.fire("edit", attributes);
            } else {
              that.fire("save", attributes);
            }
            that.hide();
            event.preventDefault();
            event.stopPropagation();
          };

      dom.observe(that.link, "click", function() {
        if (dom.hasClass(that.link, CLASS_NAME_OPENED)) {
          setTimeout(function() { that.hide(); }, 0);
        }
      });

      dom.observe(this.container, "keydown", function(event) {
        var keyCode = event.keyCode;
        if (keyCode === wysihtml5.ENTER_KEY) {
          callbackWrapper(event);
        }
        if (keyCode === wysihtml5.ESCAPE_KEY) {
          that.fire("cancel");
          that.hide();
        }
      });

      dom.delegate(this.container, "[data-wysihtml5-dialog-action=save]", "click", callbackWrapper);

      dom.delegate(this.container, "[data-wysihtml5-dialog-action=cancel]", "click", function(event) {
        that.fire("cancel");
        that.hide();
        event.preventDefault();
        event.stopPropagation();
      });

      var formElements  = this.container.querySelectorAll(SELECTOR_FORM_ELEMENTS),
          i             = 0,
          length        = formElements.length,
          _clearInterval = function() { clearInterval(that.interval); };
      for (; i<length; i++) {
        dom.observe(formElements[i], "change", _clearInterval);
      }

      this._observed = true;
    },

    /**
     * Grabs all fields in the dialog and puts them in key=>value style in an object which
     * then gets returned
     */
    _serialize: function() {
      var data    = this.elementToChange || {},
          fields  = this.container.querySelectorAll(SELECTOR_FIELDS),
          length  = fields.length,
          i       = 0;

      for (; i<length; i++) {
        data[fields[i].getAttribute(ATTRIBUTE_FIELDS)] = fields[i].value;
      }
      return data;
    },

    /**
     * Takes the attributes of the "elementToChange"
     * and inserts them in their corresponding dialog input fields
     *
     * Assume the "elementToChange" looks like this:
     *    <a href="http://www.google.com" target="_blank">foo</a>
     *
     * and we have the following dialog:
     *    <input type="text" data-wysihtml5-dialog-field="href" value="">
     *    <input type="text" data-wysihtml5-dialog-field="target" value="">
     *
     * after calling _interpolate() the dialog will look like this
     *    <input type="text" data-wysihtml5-dialog-field="href" value="http://www.google.com">
     *    <input type="text" data-wysihtml5-dialog-field="target" value="_blank">
     *
     * Basically it adopted the attribute values into the corresponding input fields
     *
     */
    _interpolate: function(avoidHiddenFields) {
      var field,
          fieldName,
          newValue,
          focusedElement = document.querySelector(":focus"),
          fields         = this.container.querySelectorAll(SELECTOR_FIELDS),
          length         = fields.length,
          i              = 0;
      for (; i<length; i++) {
        field = fields[i];

        // Never change elements where the user is currently typing in
        if (field === focusedElement) {
          continue;
        }

        // Don't update hidden fields
        // See https://github.com/xing/wysihtml5/pull/14
        if (avoidHiddenFields && field.type === "hidden") {
          continue;
        }

        fieldName = field.getAttribute(ATTRIBUTE_FIELDS);
        newValue  = (this.elementToChange && typeof(this.elementToChange) !== 'boolean') ? (this.elementToChange.getAttribute(fieldName) || "") : field.defaultValue;
        field.value = newValue;
      }
    },

    /**
     * Show the dialog element
     */
    show: function(elementToChange) {
      if (dom.hasClass(this.link, CLASS_NAME_OPENED)) {
        return;
      }

      var that        = this,
          firstField  = this.container.querySelector(SELECTOR_FORM_ELEMENTS);
      this.elementToChange = elementToChange;
      this._observe();
      this._interpolate();
      if (elementToChange) {
        this.interval = setInterval(function() { that._interpolate(true); }, 500);
      }
      dom.addClass(this.link, CLASS_NAME_OPENED);
      this.container.style.display = "";
      this.fire("show");
      if (firstField && !elementToChange) {
        try {
          firstField.focus();
        } catch(e) {}
      }
    },

    /**
     * Hide the dialog element
     */
    hide: function() {
      clearInterval(this.interval);
      this.elementToChange = null;
      dom.removeClass(this.link, CLASS_NAME_OPENED);
      this.container.style.display = "none";
      this.fire("hide");
    }
  });
})(wysihtml5);
;/**
 * Converts speech-to-text and inserts this into the editor
 * As of now (2011/03/25) this only is supported in Chrome >= 11
 *
 * Note that it sends the recorded audio to the google speech recognition api:
 * http://stackoverflow.com/questions/4361826/does-chrome-have-buil-in-speech-recognition-for-input-type-text-x-webkit-speec
 *
 * Current HTML5 draft can be found here
 * http://lists.w3.org/Archives/Public/public-xg-htmlspeech/2011Feb/att-0020/api-draft.html
 *
 * "Accessing Google Speech API Chrome 11"
 * http://mikepultz.com/2011/03/accessing-google-speech-api-chrome-11/
 */
(function(wysihtml5) {
  var dom = wysihtml5.dom;

  var linkStyles = {
    position: "relative"
  };

  var wrapperStyles = {
    left:     0,
    margin:   0,
    opacity:  0,
    overflow: "hidden",
    padding:  0,
    position: "absolute",
    top:      0,
    zIndex:   1
  };

  var inputStyles = {
    cursor:     "inherit",
    fontSize:   "50px",
    height:     "50px",
    marginTop:  "-25px",
    outline:    0,
    padding:    0,
    position:   "absolute",
    right:      "-4px",
    top:        "50%"
  };

  var inputAttributes = {
    "x-webkit-speech": "",
    "speech":          ""
  };

  wysihtml5.toolbar.Speech = function(parent, link) {
    var input = document.createElement("input");
    if (!wysihtml5.browser.supportsSpeechApiOn(input)) {
      link.style.display = "none";
      return;
    }
    var lang = parent.editor.textarea.element.getAttribute("lang");
    if (lang) {
      inputAttributes.lang = lang;
    }

    var wrapper = document.createElement("div");

    wysihtml5.lang.object(wrapperStyles).merge({
      width:  link.offsetWidth  + "px",
      height: link.offsetHeight + "px"
    });

    dom.insert(input).into(wrapper);
    dom.insert(wrapper).into(link);

    dom.setStyles(inputStyles).on(input);
    dom.setAttributes(inputAttributes).on(input);

    dom.setStyles(wrapperStyles).on(wrapper);
    dom.setStyles(linkStyles).on(link);

    var eventName = "onwebkitspeechchange" in input ? "webkitspeechchange" : "speechchange";
    dom.observe(input, eventName, function() {
      parent.execCommand("insertText", input.value);
      input.value = "";
    });

    dom.observe(input, "click", function(event) {
      if (dom.hasClass(link, "wysihtml5-command-disabled")) {
        event.preventDefault();
      }

      event.stopPropagation();
    });
  };
})(wysihtml5);
;/**
 * Toolbar
 *
 * @param {Object} parent Reference to instance of Editor instance
 * @param {Element} container Reference to the toolbar container element
 *
 * @example
 *    <div id="toolbar">
 *      <a data-wysihtml5-command="createLink">insert link</a>
 *      <a data-wysihtml5-command="formatBlock" data-wysihtml5-command-value="h1">insert h1</a>
 *    </div>
 *
 *    <script>
 *      var toolbar = new wysihtml5.toolbar.Toolbar(editor, document.getElementById("toolbar"));
 *    </script>
 */
(function(wysihtml5) {
  var CLASS_NAME_COMMAND_DISABLED   = "wysihtml5-command-disabled",
      CLASS_NAME_COMMANDS_DISABLED  = "wysihtml5-commands-disabled",
      CLASS_NAME_COMMAND_ACTIVE     = "wysihtml5-command-active",
      CLASS_NAME_ACTION_ACTIVE      = "wysihtml5-action-active",
      dom                           = wysihtml5.dom;

  wysihtml5.toolbar.Toolbar = Base.extend(
    /** @scope wysihtml5.toolbar.Toolbar.prototype */ {
    constructor: function(editor, container, showOnInit) {
      this.editor     = editor;
      this.container  = typeof(container) === "string" ? document.getElementById(container) : container;
      this.composer   = editor.composer;

      this._getLinks("command");
      this._getLinks("action");

      this._observe();
      if (showOnInit) { this.show(); }

      var speechInputLinks  = this.container.querySelectorAll("[data-wysihtml5-command=insertSpeech]"),
          length            = speechInputLinks.length,
          i                 = 0;
      for (; i<length; i++) {
        new wysihtml5.toolbar.Speech(this, speechInputLinks[i]);
      }
    },

    _getLinks: function(type) {
      var links   = this[type + "Links"] = wysihtml5.lang.array(this.container.querySelectorAll("[data-wysihtml5-" + type + "]")).get(),
          length  = links.length,
          i       = 0,
          mapping = this[type + "Mapping"] = {},
          link,
          group,
          name,
          value,
          dialog;
      for (; i<length; i++) {
        link    = links[i];
        name    = link.getAttribute("data-wysihtml5-" + type);
        value   = link.getAttribute("data-wysihtml5-" + type + "-value");
        group   = this.container.querySelector("[data-wysihtml5-" + type + "-group='" + name + "']");
        dialog  = this._getDialog(link, name);

        mapping[name + ":" + value] = {
          link:   link,
          group:  group,
          name:   name,
          value:  value,
          dialog: dialog,
          state:  false
        };
      }
    },

    _getDialog: function(link, command) {
      var that          = this,
          dialogElement = this.container.querySelector("[data-wysihtml5-dialog='" + command + "']"),
          dialog,
          caretBookmark;

      if (dialogElement) {
        if (wysihtml5.toolbar["Dialog_" + command]) {
            dialog = new wysihtml5.toolbar["Dialog_" + command](link, dialogElement);
        } else {
            dialog = new wysihtml5.toolbar.Dialog(link, dialogElement);
        }

        dialog.on("show", function() {
          caretBookmark = that.composer.selection.getBookmark();

          that.editor.fire("show:dialog", { command: command, dialogContainer: dialogElement, commandLink: link });
        });

        dialog.on("save", function(attributes) {
          if (caretBookmark) {
            that.composer.selection.setBookmark(caretBookmark);
          }
          that._execCommand(command, attributes);

          that.editor.fire("save:dialog", { command: command, dialogContainer: dialogElement, commandLink: link });
        });

        dialog.on("cancel", function() {
          that.editor.focus(false);
          that.editor.fire("cancel:dialog", { command: command, dialogContainer: dialogElement, commandLink: link });
        });
      }
      return dialog;
    },

    /**
     * @example
     *    var toolbar = new wysihtml5.Toolbar();
     *    // Insert a <blockquote> element or wrap current selection in <blockquote>
     *    toolbar.execCommand("formatBlock", "blockquote");
     */
    execCommand: function(command, commandValue) {
      if (this.commandsDisabled) {
        return;
      }

      var commandObj = this.commandMapping[command + ":" + commandValue];

      // Show dialog when available
      if (commandObj && commandObj.dialog && !commandObj.state) {
        commandObj.dialog.show();
      } else {
        this._execCommand(command, commandValue);
      }
    },

    _execCommand: function(command, commandValue) {
      // Make sure that composer is focussed (false => don't move caret to the end)
      this.editor.focus(false);

      this.composer.commands.exec(command, commandValue);
      this._updateLinkStates();
    },

    execAction: function(action) {
      var editor = this.editor;
      if (action === "change_view") {
        if (editor.textarea) {
            if (editor.currentView === editor.textarea) {
              editor.fire("change_view", "composer");
            } else {
              editor.fire("change_view", "textarea");
            }
        }
      }
      if (action == "showSource") {
          editor.fire("showSource");
      }
    },

    _observe: function() {
      var that      = this,
          editor    = this.editor,
          container = this.container,
          links     = this.commandLinks.concat(this.actionLinks),
          length    = links.length,
          i         = 0;

      for (; i<length; i++) {
        // 'javascript:;' and unselectable=on Needed for IE, but done in all browsers to make sure that all get the same css applied
        // (you know, a:link { ... } doesn't match anchors with missing href attribute)
        if (links[i].nodeName === "A") {
          dom.setAttributes({
            href:         "javascript:;",
            unselectable: "on"
          }).on(links[i]);
        } else {
          dom.setAttributes({ unselectable: "on" }).on(links[i]);
        }
      }

      // Needed for opera and chrome
      dom.delegate(container, "[data-wysihtml5-command], [data-wysihtml5-action]", "mousedown", function(event) { event.preventDefault(); });

      dom.delegate(container, "[data-wysihtml5-command]", "click", function(event) {
        var link          = this,
            command       = link.getAttribute("data-wysihtml5-command"),
            commandValue  = link.getAttribute("data-wysihtml5-command-value");
        that.execCommand(command, commandValue);
        event.preventDefault();
      });

      dom.delegate(container, "[data-wysihtml5-action]", "click", function(event) {
        var action = this.getAttribute("data-wysihtml5-action");
        that.execAction(action);
        event.preventDefault();
      });

      editor.on("interaction:composer", function() {
          that._updateLinkStates();
      });

      editor.on("focus:composer", function() {
        that.bookmark = null;
      });

      if (this.editor.config.handleTables) {
          editor.on("tableselect:composer", function() {
              that.container.querySelectorAll('[data-wysihtml5-hiddentools="table"]')[0].style.display = "";
          });
          editor.on("tableunselect:composer", function() {
              that.container.querySelectorAll('[data-wysihtml5-hiddentools="table"]')[0].style.display = "none";
          });
      }

      editor.on("change_view", function(currentView) {
        // Set timeout needed in order to let the blur event fire first
        if (editor.textarea) {
            setTimeout(function() {
              that.commandsDisabled = (currentView !== "composer");
              that._updateLinkStates();
              if (that.commandsDisabled) {
                dom.addClass(container, CLASS_NAME_COMMANDS_DISABLED);
              } else {
                dom.removeClass(container, CLASS_NAME_COMMANDS_DISABLED);
              }
            }, 0);
        }
      });
    },

    _updateLinkStates: function() {

      var commandMapping    = this.commandMapping,
          actionMapping     = this.actionMapping,
          i,
          state,
          action,
          command;
      // every millisecond counts... this is executed quite often
      for (i in commandMapping) {
        command = commandMapping[i];
        if (this.commandsDisabled) {
          state = false;
          dom.removeClass(command.link, CLASS_NAME_COMMAND_ACTIVE);
          if (command.group) {
            dom.removeClass(command.group, CLASS_NAME_COMMAND_ACTIVE);
          }
          if (command.dialog) {
            command.dialog.hide();
          }
        } else {
          state = this.composer.commands.state(command.name, command.value);
          dom.removeClass(command.link, CLASS_NAME_COMMAND_DISABLED);
          if (command.group) {
            dom.removeClass(command.group, CLASS_NAME_COMMAND_DISABLED);
          }
        }
        if (command.state === state) {
          continue;
        }

        command.state = state;
        if (state) {
          dom.addClass(command.link, CLASS_NAME_COMMAND_ACTIVE);
          if (command.group) {
            dom.addClass(command.group, CLASS_NAME_COMMAND_ACTIVE);
          }
          if (command.dialog) {
            if (typeof(state) === "object" || wysihtml5.lang.object(state).isArray()) {

              if (!command.dialog.multiselect && wysihtml5.lang.object(state).isArray()) {
                // Grab first and only object/element in state array, otherwise convert state into boolean
                // to avoid showing a dialog for multiple selected elements which may have different attributes
                // eg. when two links with different href are selected, the state will be an array consisting of both link elements
                // but the dialog interface can only update one
                state = state.length === 1 ? state[0] : true;
                command.state = state;
              }
              command.dialog.show(state);
            } else {
              command.dialog.hide();
            }
          }
        } else {
          dom.removeClass(command.link, CLASS_NAME_COMMAND_ACTIVE);
          if (command.group) {
            dom.removeClass(command.group, CLASS_NAME_COMMAND_ACTIVE);
          }
          if (command.dialog) {
            command.dialog.hide();
          }
        }
      }

      for (i in actionMapping) {
        action = actionMapping[i];

        if (action.name === "change_view") {
          action.state = this.editor.currentView === this.editor.textarea;
          if (action.state) {
            dom.addClass(action.link, CLASS_NAME_ACTION_ACTIVE);
          } else {
            dom.removeClass(action.link, CLASS_NAME_ACTION_ACTIVE);
          }
        }
      }
    },

    show: function() {
      this.container.style.display = "";
    },

    hide: function() {
      this.container.style.display = "none";
    }
  });

})(wysihtml5);
;(function(wysihtml5) {
    wysihtml5.toolbar.Dialog_createTable = wysihtml5.toolbar.Dialog.extend({
        show: function(elementToChange) {
            this.base(elementToChange);

        }

    });
})(wysihtml5);
;(function(wysihtml5) {
  var dom                     = wysihtml5.dom,
      SELECTOR_FIELDS         = "[data-wysihtml5-dialog-field]",
      ATTRIBUTE_FIELDS        = "data-wysihtml5-dialog-field";

  wysihtml5.toolbar.Dialog_foreColorStyle = wysihtml5.toolbar.Dialog.extend({
    multiselect: true,

    _serialize: function() {
      var data    = {},
          fields  = this.container.querySelectorAll(SELECTOR_FIELDS),
          length  = fields.length,
          i       = 0;

      for (; i<length; i++) {
        data[fields[i].getAttribute(ATTRIBUTE_FIELDS)] = fields[i].value;
      }
      return data;
    },

    _interpolate: function(avoidHiddenFields) {
      var field,
          fieldName,
          newValue,
          focusedElement = document.querySelector(":focus"),
          fields         = this.container.querySelectorAll(SELECTOR_FIELDS),
          length         = fields.length,
          i              = 0,
          firstElement   = (this.elementToChange) ? ((wysihtml5.lang.object(this.elementToChange).isArray()) ? this.elementToChange[0] : this.elementToChange) : null,
          colorStr       = (firstElement) ? firstElement.getAttribute('style') : null,
          color          = (colorStr) ? wysihtml5.quirks.styleParser.parseColor(colorStr, "color") : null;

      for (; i<length; i++) {
        field = fields[i];
        // Never change elements where the user is currently typing in
        if (field === focusedElement) {
          continue;
        }
        // Don't update hidden fields3
        if (avoidHiddenFields && field.type === "hidden") {
          continue;
        }
        if (field.getAttribute(ATTRIBUTE_FIELDS) === "color") {
          if (color) {
            if (color[3] && color[3] != 1) {
              field.value = "rgba(" + color[0] + "," + color[1] + "," + color[2] + "," + color[3] + ");";
            } else {
              field.value = "rgb(" + color[0] + "," + color[1] + "," + color[2] + ");";
            }
          } else {
            field.value = "rgb(0,0,0);";
          }
        }
      }
    }

  });
})(wysihtml5);
;(function(wysihtml5) {
  var dom                     = wysihtml5.dom,
      SELECTOR_FIELDS         = "[data-wysihtml5-dialog-field]",
      ATTRIBUTE_FIELDS        = "data-wysihtml5-dialog-field";

  wysihtml5.toolbar.Dialog_fontSizeStyle = wysihtml5.toolbar.Dialog.extend({
    multiselect: true,

    _serialize: function() {
      return {"size" : this.container.querySelector('[data-wysihtml5-dialog-field="size"]').value};
    },

    _interpolate: function(avoidHiddenFields) {
      var focusedElement = document.querySelector(":focus"),
          field          = this.container.querySelector("[data-wysihtml5-dialog-field='size']"),
          firstElement   = (this.elementToChange) ? ((wysihtml5.lang.object(this.elementToChange).isArray()) ? this.elementToChange[0] : this.elementToChange) : null,
          styleStr       = (firstElement) ? firstElement.getAttribute('style') : null,
          size           = (styleStr) ? wysihtml5.quirks.styleParser.parseFontSize(styleStr) : null;

      if (field && field !== focusedElement && size && !(/^\s*$/).test(size)) {
        field.value = size;
      }
    }

  });
})(wysihtml5);
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
//! moment.js
//! version : 2.8.3
//! authors : Tim Wood, Iskren Chernev, Moment.js contributors
//! license : MIT
//! momentjs.com

(function (undefined) {
    /************************************
        Constants
    ************************************/

    var moment,
        VERSION = '2.8.3',
        // the global-scope this is NOT the global object in Node.js
        globalScope = typeof global !== 'undefined' ? global : this,
        oldGlobalMoment,
        round = Math.round,
        hasOwnProperty = Object.prototype.hasOwnProperty,
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

        // timezone chunker '+10:00' > ['10', '00'] or '-1530' > ['-15', '30']
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

    function hasOwnProp(a, b) {
        return hasOwnProperty.call(a, b);
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
            console.warn('Deprecation warning: ' + msg);
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
            if (hasOwnProp(b, i)) {
                a[i] = b[i];
            }
        }

        if (hasOwnProp(b, 'toString')) {
            a.toString = b.toString;
        }

        if (hasOwnProp(b, 'valueOf')) {
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
                deprecateSimple(name, 'moment().' + name  + '(period, number) is deprecated. Please use moment().' + name + '(number, period).');
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
            if (hasOwnProp(inputObject, prop)) {
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
            if (config._useUTC != null) {
                tempConfig._useUTC = config._useUTC;
            }
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
                    // match[5] should be 'T' or undefined
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

    function map(arr, fn) {
        var res = [], i;
        for (i = 0; i < arr.length; ++i) {
            res.push(fn(arr[i], i));
        }
        return res;
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
            config._a = map(input.slice(0), function (obj) {
                return parseInt(obj, 10);
            });
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

        if (typeof(locale) === 'boolean') {
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

        if (typeof(locale) === 'boolean') {
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

        if (moment.isDuration(input) && hasOwnProp(input, '_locale')) {
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
        'moment.lang is deprecated. Use moment.locale instead.',
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
            if (typeof(values) !== 'undefined') {
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
        'moment.langData is deprecated. Use moment.localeData instead.',
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
            (obj != null && hasOwnProp(obj, '_isAMomentObject'));
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
            return this.clone().locale('en').format('ddd MMM DD YYYY HH:mm:ss [GMT]ZZ');
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
                    this.add(this._dateTzOffset(), 'm');
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
                diff, output, daysAdjust;

            units = normalizeUnits(units);

            if (units === 'year' || units === 'month') {
                // average number of days in the months in the given dates
                diff = (this.daysInMonth() + that.daysInMonth()) * 432e5; // 24 * 60 * 60 * 1000 / 2
                // difference in months
                output = ((this.year() - that.year()) * 12) + (this.month() - that.month());
                // adjust by taking difference in days, average number of days
                // and dst in the given months.
                daysAdjust = (this - moment(this).startOf('month')) -
                    (that - moment(that).startOf('month'));
                // same as above but with zones, to negate all dst
                daysAdjust -= ((this.zone() - moment(this).startOf('month').zone()) -
                        (that.zone() - moment(that).startOf('month').zone())) * 6e4;
                output += daysAdjust / diff;
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
            units = normalizeUnits(typeof units !== 'undefined' ? units : 'millisecond');
            if (units === 'millisecond') {
                input = moment.isMoment(input) ? input : moment(input);
                return +this > +input;
            } else {
                return +this.clone().startOf(units) > +moment(input).startOf(units);
            }
        },

        isBefore: function (input, units) {
            units = normalizeUnits(typeof units !== 'undefined' ? units : 'millisecond');
            if (units === 'millisecond') {
                input = moment.isMoment(input) ? input : moment(input);
                return +this < +input;
            } else {
                return +this.clone().startOf(units) < +moment(input).startOf(units);
            }
        },

        isSame: function (input, units) {
            units = normalizeUnits(units || 'millisecond');
            if (units === 'millisecond') {
                input = moment.isMoment(input) ? input : moment(input);
                return +this === +input;
            } else {
                return +this.clone().startOf(units) === +makeAs(input, this).startOf(units);
            }
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
                    localAdjust = this._dateTzOffset();
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
                return this._isUTC ? offset : this._dateTzOffset();
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
            var newLocaleData;

            if (key === undefined) {
                return this._locale._abbr;
            } else {
                newLocaleData = moment.localeData(key);
                if (newLocaleData != null) {
                    this._locale = newLocaleData;
                }
                return this;
            }
        },

        lang : deprecate(
            'moment().lang() is deprecated. Use moment().localeData() instead.',
            function (key) {
                if (key === undefined) {
                    return this.localeData();
                } else {
                    return this.locale(key);
                }
            }
        ),

        localeData : function () {
            return this._locale;
        },

        _dateTzOffset : function () {
            // On Firefox.24 Date#getTimezoneOffset returns a floating point.
            // https://github.com/moment/moment/pull/1871
            return Math.round(this._d.getTimezoneOffset() / 15) * 15;
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

            if (units === 'month' || units === 'year') {
                days = this._days + this._milliseconds / 864e5;
                months = this._months + daysToYears(days) * 12;
                return units === 'month' ? months : months / 12;
            } else {
                // handle milliseconds separately because of floating point math errors (issue #1867)
                days = this._days + yearsToDays(this._months / 12);
                switch (units) {
                    case 'week': return days / 7 + this._milliseconds / 6048e5;
                    case 'day': return days + this._milliseconds / 864e5;
                    case 'hour': return days * 24 + this._milliseconds / 36e5;
                    case 'minute': return days * 24 * 60 + this._milliseconds / 6e4;
                    case 'second': return days * 24 * 60 * 60 + this._milliseconds / 1000;
                    // Math.floor prevents floating point math errors here
                    case 'millisecond': return Math.floor(days * 24 * 60 * 60 * 1000) + this._milliseconds;
                    default: throw new Error('Unknown unit ' + units);
                }
            }
        },

        lang : moment.fn.lang,
        locale : moment.fn.locale,

        toIsoString : deprecate(
            'toIsoString() is deprecated. Please use toISOString() instead ' +
            '(notice the capitals)',
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

    moment.duration.fn.toString = moment.duration.fn.toISOString;

    function makeDurationGetter(name) {
        moment.duration.fn[name] = function () {
            return this._data[name];
        };
    }

    for (i in unitMillisecondFactors) {
        if (hasOwnProp(unitMillisecondFactors, i)) {
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
// Mobile detect
!function(a){var b=/iPhone/i,c=/iPod/i,d=/iPad/i,e=/(?=.*\bAndroid\b)(?=.*\bMobile\b)/i,f=/Android/i,g=/IEMobile/i,h=/(?=.*\bWindows\b)(?=.*\bARM\b)/i,i=/BlackBerry/i,j=/Opera Mini/i,k=/(?=.*\bFirefox\b)(?=.*\bMobile\b)/i,l=new RegExp("(?:Nexus 7|BNTV250|Kindle Fire|Silk|GT-P1000)","i"),m=function(a,b){return a.test(b)},n=function(a){var n=a||navigator.userAgent;this.apple={phone:m(b,n),ipod:m(c,n),tablet:m(d,n),device:m(b,n)||m(c,n)||m(d,n)},this.android={phone:m(e,n),tablet:!m(e,n)&&m(f,n),device:m(e,n)||m(f,n)},this.windows={phone:m(g,n),tablet:m(h,n),device:m(g,n)||m(h,n)},this.other={blackberry:m(i,n),opera:m(j,n),firefox:m(k,n),device:m(i,n)||m(j,n)||m(k,n)},this.seven_inch=m(l,n),this.any=this.apple.device||this.android.device||this.windows.device||this.other.device||this.seven_inch,this.phone=this.apple.phone||this.android.phone||this.windows.phone,this.tablet=this.apple.tablet||this.android.tablet||this.windows.tablet},o=new n;o.Class=n,"undefined"!=typeof module&&module.exports?module.exports=o:"function"==typeof define&&define.amd&&define(o),a.isMobile=o}(this);

/** ScrollTo
 * Copyright (c) 2007-2014 Ariel Flesler - aflesler<a>gmail<d>com | http://flesler.blogspot.com
 * Licensed under MIT
 * @author Ariel Flesler
 * @version 1.4.11
 */
;(function(a){if(typeof define==='function'&&define.amd){define(['jquery'],a)}else{a(jQuery)}}(function($){var j=$.scrollTo=function(a,b,c){return $(window).scrollTo(a,b,c)};j.defaults={axis:'xy',duration:parseFloat($.fn.jquery)>=1.3?0:1,limit:true};j.window=function(a){return $(window)._scrollable()};$.fn._scrollable=function(){return this.map(function(){var a=this,isWin=!a.nodeName||$.inArray(a.nodeName.toLowerCase(),['iframe','#document','html','body'])!=-1;if(!isWin)return a;var b=(a.contentWindow||a).document||a.ownerDocument||a;return/webkit/i.test(navigator.userAgent)||b.compatMode=='BackCompat'?b.body:b.documentElement})};$.fn.scrollTo=function(f,g,h){if(typeof g=='object'){h=g;g=0}if(typeof h=='function')h={onAfter:h};if(f=='max')f=9e9;h=$.extend({},j.defaults,h);g=g||h.duration;h.queue=h.queue&&h.axis.length>1;if(h.queue)g/=2;h.offset=both(h.offset);h.over=both(h.over);return this._scrollable().each(function(){if(f==null)return;var d=this,$elem=$(d),targ=f,toff,attr={},win=$elem.is('html,body');switch(typeof targ){case'number':case'string':if(/^([+-]=?)?\d+(\.\d+)?(px|%)?$/.test(targ)){targ=both(targ);break}targ=$(targ,this);if(!targ.length)return;case'object':if(targ.is||targ.style)toff=(targ=$(targ)).offset()}var e=$.isFunction(h.offset)&&h.offset(d,targ)||h.offset;$.each(h.axis.split(''),function(i,a){var b=a=='x'?'Left':'Top',pos=b.toLowerCase(),key='scroll'+b,old=d[key],max=j.max(d,a);if(toff){attr[key]=toff[pos]+(win?0:old-$elem.offset()[pos]);if(h.margin){attr[key]-=parseInt(targ.css('margin'+b))||0;attr[key]-=parseInt(targ.css('border'+b+'Width'))||0}attr[key]+=e[pos]||0;if(h.over[pos])attr[key]+=targ[a=='x'?'width':'height']()*h.over[pos]}else{var c=targ[pos];attr[key]=c.slice&&c.slice(-1)=='%'?parseFloat(c)/100*max:c}if(h.limit&&/^\d+$/.test(attr[key]))attr[key]=attr[key]<=0?0:Math.min(attr[key],max);if(!i&&h.queue){if(old!=attr[key])animate(h.onAfterFirst);delete attr[key]}});animate(h.onAfter);function animate(a){$elem.animate(attr,g,h.easing,a&&function(){a.call(this,targ,h)})}}).end()};j.max=function(a,b){var c=b=='x'?'Width':'Height',scroll='scroll'+c;if(!$(a).is('html,body'))return a[scroll]-$(a)[c.toLowerCase()]();var d='client'+c,html=a.ownerDocument.documentElement,body=a.ownerDocument.body;return Math.max(html[scroll],body[scroll])-Math.min(html[d],body[d])};function both(a){return $.isFunction(a)||typeof a=='object'?a:{top:a,left:a}};return j}));

var	chat = {
	Views: {},
	Extensions: {},
	Models: {},
	Router: null,
	Events: {},
	
	init: function () {
		
		_.extend(chat.Events = Backbone.Events);
		this.app = new chat.Views.App();
		Backbone.history.start();
		
	}
};

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


$(function() {
	
	$.ajaxPrefilter(function (options) {
	    options.url = root + options.url;
	});
	chat.init();	
});
chat.Views.App = Backbone.View.extend({
	
	el: $('#chat'),
	
	events: {
		'click a[data="unavailable"]': 'setUnavailable',
		'click a[data="available"]': 'setAvailable',
		'click .windows ul li' : 'setMaxWindows',
		'click .parameters-nav' : 'showParameters',
		'click .dashboard-nav' : 'showDashboard',
		'click .live-nav' : 'showLive'
	},
	
	initialize: function() {	
		/*		
		// Get a list of all enterprise' operators
		this.operators = new chat.Operators();
		this.operators.fetch();
		*/
		
		// Create the view to show who's connecting and start chatting
		this.records = new chat.Records();
		this.live = new chat.LiveView( this.records );

		// Variables
		this.windows = [];
		this.maxWindows = 1;
		
		// Adjust windows on navigator resize
		$(window).resize(function() {
			chat.app.setWindows();
			chat.app.setInformationsWidth();
		});
		
		this.listenTo(this, 'change:windows', this.setWindows);
		
		// Connection to our WS Server
		sess = new ab.connect(
		
			'ws://ws.saio.fr/' + licence +'/chat' // The host 		    
		    , function(session) {  // Once the connection has been established
				
				sess = session;
				sess.subscribe('operator/'+licence, function (topic, payload) { chat.app.records.set(payload); console.log(payload) });
				
				chat.app.setWindows();
				
				sess.call('chat/isAvailable').then(function(event) {
					if (event.result) { 
						chat.app.available = true;
						chat.app.setAvailable(); 
					} else { 
						chat.app.available = false; 
						chat.app.setUnavailable();
					}
				});	
							
			}

		    , function(code, reason, detail) { // When the connection is closed
		    	console.warn(code + reason + detail);
		    }
		    , { // Additional parameters, we're ignoring the WAMP sub-protocol for older browsers
				'skipSubprotocolCheck': true,
				'maxRetries': 60,
				'retryDelay': 2000
		      }
		);
		
	},
	
	timers: function( record, type ) {

		// Setting up timer variables
		now = new moment();
		start = moment(record.model.get('startTime')*1000-1000);
		last = moment(record.model.get('lastMsgTime')*1000-1000);
		
		switch ( type ) {
			// Timer for chat			
			case 'chat':
			
				if (now.diff(start) > 0) timer = moment(now.diff(start));
				else timer = moment(0);
				hours = timer.hours()-1;
				minutes = timer.minutes();
				seconds = timer.seconds();
				
				if (hours == 0) {
					record.$el.find('.timer-chat').html( minutes + 'm ' + seconds + 's' );
					return;
				}
				
				if (this.hours == 0 && this.minutes == 0) {
					record.$el.find('.timer-chat').html( seconds + 's' );
					return;
				}
				
				record.$el.find('.timer-chat').html( hours + 'h ' + minutes + 'm ' + seconds + 's' );
				
				break;
			// Timer for last msg
			case 'lastMsg':	
			
				if (now.diff(last) > 0) timer = moment(now.diff(last));
				else timer = moment(0);
				hours = timer.hours()-1;
				minutes = timer.minutes();
				seconds = timer.seconds();

				if (record.model.get('messages').length > 0) {
					// If the visitor waited over 2 minutes for an answer
					if (timer.minutes() >= 2 && record.model.get('messages')[record.model.get('messages').length-1].from == 'visitor') {
						record.model.trigger('urgent');
					}
				}
				
				// Don't show the minutes
				if (minutes == 0) {
					record.$el.find('.timer-lastmsg').html( seconds );
					return;
				}
				
				record.$el.find('.timer-lastmsg').html( minutes + ' : ' + seconds );	
				
				break;
		}
		
	},

	interval: function( record, type ) {

		this.timers( record, type );
		// Handle all records timer
		setInterval(function() {
			chat.app.timers( record, type );					
		// Called every second	
		}, 1000);
		
	},
	
	setAvailable: function() {
		
		// Set the operator available on the server
		if (!this.available) {  sess.call('chat/available');  this.available = true; }
		
		this.$el.find('.status i').removeClass('unavailable').addClass('available');
		this.$el.find('.status span').html('Disponible');
		
		$('.nav-tabs .active').removeClass('active');
		$('.live-nav').addClass('active');
		$('.live-nav').removeClass('disable');
		
		if (typeof(this.view) !== 'undefined') this.view.remove();	
		this.live.$el.removeClass('hide');	
		
	},
	
	setUnavailable: function() {
	
		// Set the operator unavailable on the server
		if (this.available) {  sess.call('chat/unavailable');  this.available = false; }
		
		this.$el.find('.status span').html('Indisponible');
		this.$el.find('.status i').removeClass('available').addClass('unavailable');

		this.live.$el.addClass('hide');
		if (typeof(this.view) !== 'undefined') {
			this.view.remove();
			this.view = new chat.DashboardView( this.records );
		} else this.view = new chat.DashboardView( this.records );
		
		$('.nav-tabs .active').removeClass('active');
		$('.dashboard-nav').addClass('active');
		$('.live-nav').addClass('disable');
		
	},
	
	setMaxWindows: function( ev ) {

		if ( typeof(ev) !== 'undefined' ) { this.maxWindows = $(ev.target).attr('data'); }
		
		if ( this.maxWindows < this.windows.length ) {
			
			diff = this.windows.length - this.maxWindows;
			for (var i = 0; i < diff ; i++ ) {
				this.windows[this.windows.length-1].minus();
			}
			
		}
		
	},
	
	setWindows: function () {		
		
		// If there is more 1 windows, add "multiple" class to show them all
		if ( this.windows.length > 1 ) {
		
			$('.conversations').children().addClass('multiple');
			$('.conversations').children().addClass('half-width');
			if (this.windows.length > 2) $('.conversations').children().addClass('half-height');
			chat.app.setInformationsWidth();
			
		} else {
			
			$('.conversations').children().removeClass('multiple');
			$('.conversations').children().removeClass('half-width');
			chat.app.setInformationsWidth();
			
		}
		
		if (this.windows.length < 3) { $('.conversations').children().removeClass('half-height') }
		
		if ( $('#live').width() > 1090 ) { $('.btn-group.windows').show(); } 
		else { 
		
			$('.windows .dropdown-select li:first-child a').trigger( "click" );
			this.$el.find('.btn-group.windows').hide(); 
			$('.conversations').children().removeClass('multiple full-width half-width');
		
		}
		
		if ( $('#live').height() < 750) {
		
			$('.windows .dropdown-select li:nth-child(3) a').hide();
			if (this.maxWindows == 4) { 	
				$('.windows .dropdown-select li:nth-child(2) a').trigger( "click" );
				$('.conversations').children().removeClass('half-height');
			}		
		} else {
			$('.windows .dropdown-select li:nth-child(3) a').show();
		}
		
		if ($(window).width() > 768) $('.aside-chat-left').css({display: 'table-cell'});
		else {
			if (this.windows.length > 0) $('.aside-chat-left').css({display: 'none'});
			else $('.aside-chat-left').css({display: 'block'});
		}
		
	},	
	
	setInformationsWidth: function () {
			
		if (typeof(this.live.informations) !== 'undefined') {
		
			// Hide informations if the window is too small
			if ($('#live').width() < 950 || ($('#live').width() < 1300 && $('.conversations').children().hasClass('multiple')) ) this.live.informations.$el.addClass('hide');
			else this.live.informations.$el.removeClass('hide');
			
		}
		
	},
	
/*
	showParameters: function () {
		
		if (!$('.icon-gear').hasClass('active')) {
			
			$('.header-control .active').removeClass('active');
			$('.icon-gear').addClass('active');
			this.live.$el.addClass('hide');
			if (typeof(this.view) !== 'undefined') this.view.remove();
			this.view = new chat.ParametersView();
			
		}
		
	},
*/
	
	showDashboard: function () {
	
		if (!$('.dashboard-nav').hasClass('active')) {
		
			$('.nav-tabs .active').removeClass('active');
			$('.dashboard-nav').addClass('active');
			this.live.$el.addClass('hide');
			if (typeof(this.view) !== 'undefined') this.view.remove();
			this.view = new chat.DashboardView( this.records );
			
		}
		
	},
	
	showLive: function () {
	
		if (!$('.live-nav').hasClass('active') && this.available) {
		
			$('.nav-tabs .active').removeClass('active');
			$('.live-nav').addClass('active');
			if (typeof(this.view) !== 'undefined') this.view.remove();
			this.live.$el.removeClass('hide');
			
		}
		
	}
	
});
chat.Models.Message = Backbone.Model.extend({
	
	defaults: {
		message_content: ''
	}
	
});
chat.Messages = Backbone.Collection.extend({
	
	model: chat.Models.Message,
	
    initialize: function () {

    },
    
    defaults: {
		id: ''
	}

});
chat.Models.Operator = Backbone.Model.extend({
	
	defaults: {
	}
	
});
chat.Operators = Backbone.Collection.extend({
	
	model: chat.Models.Operator,
	url: 'users',
	
    initialize: function () {

    },

});
chat.Models.Record = Backbone.Model.extend({
	
	defaults: {
		id: '',
		email: '',
		firstname: '',
		lastname: '',
		questions: '',
		pages: ''
	}
	
});
chat.Records = Backbone.Collection.extend({
	
	model: chat.Models.Record,
	
    initialize: function () {

    },

});
chat.Models.Parameters = Backbone.Model.extend({
	
	defaults: {
		id: ''
	}
	
});
chat.Views.RecordCurrent = Backbone.View.extend({
	
	tagName: 'li',
	className: 'list-record-item animated fadeInUp',
	template: _.template( $('#record').html()),
	
	events: {
		'click' : 'doChat'
	},
	
	initialize: function() {
		
		// Get the messages list
		this.listenTo(this.model, 'change:messages', this.status);
		this.listenTo(this.model, 'change:messages', chat.app.changeBadge);
		this.listenTo(this.model, 'change:operator', this.close);
		this.listenTo(this.model, 'change:closed', this.remove);
		this.listenTo(this.model, 'change:banned', this.remove);
		this.listenTo(this.model, 'change:name', this.render);
		this.listenTo(this.model, 'unactive', this.unactive);
		this.listenTo(this.model, 'active', this.active);
		this.listenTo(this.model, 'urgent', this.urgent);
		// After an half hour of inactivity, the model is removed on the server
		this.listenTo(this.model, 'remove', this.close);
		this.render();
		
	},
	
	render: function() {

		this.$el.html(this.template( this.model.toJSON() ));
		this.$el.appendTo( '.list-current' );
		
		this.timers();
		this.status();

		this.model.trigger('render');

		return this;
	},
	
	status: function() {

		if (this.model.get('messages').length <= 0) return;

		// If the last message come from a visitor, set unanswered status
		if ( this.model.get('messages')[this.model.get('messages').length-1].from == 'visitor' ) {
			this.$el.find('.status').removeClass('answered').addClass('unanswered');
		} else {
			this.$el.find('.status').removeClass('unanswered urgent').addClass('answered');
		}
		
	},
	
	timers: function() {
		
		chat.app.interval( this, 'chat' );
		chat.app.interval( this, 'lastMsg' );				
		
	},
	
	active: function() {		
		this.$el.addClass('active');		
	},
	
	unactive: function() {
		this.$el.removeClass('active');			
	},
    
    urgent: function () {	  
		this.$el.find('.status').addClass('urgent');	    
    },
    
    close: function() {
		this.model.trigger('minus');
		this.remove();
    },
	
	doChat: function() {
	
		var that = this;
		
		if ($(window).width() < 768) $('.aside-chat-left').css({display: 'none'});
		
		// If the view already exists and only a view is show, do nothing
		if ( this.$el.hasClass('active') && chat.app.windows.length <= 1 ) { return; }
		
		// If the view already exists, show it first in the view list
		if ( this.$el.hasClass('active') ) {
			$.each( chat.app.windows , function (index, value) {

				if ( value.model.id == that.model.get('id') ) {
				
					value.remove();
					chat.app.windows.splice(index,1);
					chat.app.windows.unshift( new chat.Views.Conversation({ model: that.model }) );
					chat.app.trigger('change:windows');
					return;
					
				}
			});
			return;
		}
		
		if (chat.app.windows.length < chat.app.maxWindows) {

			// Create a new conversation view
			chat.app.windows.unshift( new chat.Views.Conversation({ model: this.model }) );	
			chat.app.trigger('change:windows');
		
		} else {
	
			// Delete the last conversation view
			chat.app.windows[chat.app.windows.length-1].model.trigger('minus');
			
			// Create a new conversation view 
			chat.app.windows.unshift( new chat.Views.Conversation({ model: this.model }) );
			chat.app.trigger('change:windows');
			
		}
	}
	
});
chat.Views.RecordWaiting = Backbone.View.extend({
	
	tagName: 'li',
	className: 'list-record-item animated fadeInUp',
	template: _.template( $('#record').html()),
	
	events: {
		'click': 'doChat'
	},
	
	initialize: function() {
		
		this.listenTo(this.model, 'change:operator', this.update); 
    	this.listenTo(this.model, 'change:closed', this.update);
		this.listenTo(this.model, 'change:messages', this.status);
		this.listenTo(this.model, 'change:name', this.render);
		// The visitor has been waiting over 2 minutes without reply
		this.listenTo(this.model, 'urgent', this.urgent);
		// After an half hour of inactivity, the model is removed on the server
		this.listenTo(this.model, 'remove', this.close);
		this.render();
		
	},
	
	render: function() {

		this.$el.html(this.template( this.model.toJSON() ));
		this.$el.appendTo( '.list-waiting' );
		
		this.status();
		this.timers();

		return this;
	},
	
	status: function() {
				
		if (this.model.get('messages').length <= 0) return;

		// If the last message come from a visitor, set unanswered status
		if ( this.model.get('messages')[this.model.get('messages').length-1].from == 'visitor' ) {
			this.$el.find('.status').removeClass('answered').addClass('unanswered');			
		} else {
			this.$el.find('.status').removeClass('unanswered').addClass('answered');
		}

		
	},
	
	timers: function() {
		
		chat.app.interval( this, 'chat' );
		chat.app.interval( this, 'lastMsg' );				
		
	},
    
    urgent: function () {
	  
		this.$el.find('.status').addClass('urgent');
	    
    },
    
    close: function () {
	  	this.remove();
  		// Change waiting counter
  		chat.app.live.counter.waiting -=1;
  		$('.header-waiting span').html(chat.app.live.counter.waiting);  
    },
	
	doChat: function() {
		
		that = this;
		
		if ($(window).width() < 768) $('.aside-chat-left').css({display: 'none'});
		
		sess.call('chat/set_operator', { sid: this.model.get('id') } ).then(function (result) {
   
		   if (chat.app.windows.length < chat.app.maxWindows) {
		   
				// Create a new conversation view
				chat.app.windows.unshift( new chat.Views.Conversation({ model: that.model }) );				
				chat.app.trigger('change:windows');
			
			} else {
		
				// Delete the last conversation view
				chat.app.windows[chat.app.windows.length-1].model.trigger('minus');
				
				// Create a new conversation view 
				chat.app.windows.unshift( new chat.Views.Conversation({ model: that.model }) );
				chat.app.trigger('change:windows');
				
			}
			
		   // Delete this view
		   that.remove();
		   		   
		}, function(error) {
		   
		});		
		
	},
	
	update: function() {

		if (this.model.get('operator') !== null) this.remove();
		if (this.model.get('closed')) this.remove();		
		
	}
	
});
/*========================================
Records list
=========================================*/
	
chat.LiveView = Backbone.View.extend({
		
	tagName: 'section',
	id: 'live',
	className: 'hbox stretch hide',
			
    initialize: function (records) {
    	
    	this.render(); 
    	
    	this.collection = records;
    	this.listenTo(this.collection, 'add', this.add);
    	this.listenTo(this.collection, 'change:operator', this.add); 
    	this.listenTo(this.collection, 'change:closed', this.add);
    	this.listenTo(this.collection, 'add', this.counters); 
		this.listenTo(this.collection, 'change', this.counters);
		this.listenTo(this.collection, 'remove', this.counters);
	
		this.counter = {};
		this.counter.current = 0;
		this.counter.waiting = 0;
	
		this.showInformations = true;
    	
    },
    
    render: function () {
    
	    var template= _.template( $('#live').html());
	    this.$el.html( template() );
		this.$el.appendTo( '#chat-section' );
	    
    },
    
    add: function (record) {      

		if (record.get('type') == 'operator' || record.get('banned') == true || record.get('closed') == true) return;
		if (record.get('operator') == user.id) { 
			this.recordView = new chat.Views.RecordCurrent({model: record}); 
			this.recordView.render();
		
		}
		
		if (record.get('operator') == null) {

     		this.recordView = new chat.Views.RecordWaiting({model: record});	   	
	 		this.recordView.render();
		
		}
		
    },
    
    remove: function () {
    	
		this.$el.empty();
		this.stopListening();
		return this;
			   		
    },
    
    counters: function() {
    
	    this.counter.current = this.$el.find('.list-current').children().length;
		this.$el.find('.header-current span').html(chat.app.live.counter.current);
		
		this.counter.waiting = this.$el.find('.list-waiting').children().length;
		this.$el.find('.header-waiting span').html(chat.app.live.counter.waiting);
		
    }
    
});
/***********************
CONVERSATION VIEW
***********************/
chat.Views.Conversation = Backbone.View.extend({
	
	tagName: 'section',
	className: 'vbox animated fadeInRight',
	
	events: {
		'click' : 'selected',
		'click .conversation-close': 'close',
		'click .conversation-minus': 'minus',
		'click .ban' : 'ban',
		'click .transfer' : 'transfer',
		'click .conversation-form button.send' : 'send',
		'click .conversation-form .icon-trash' : 'clearInput',
		'focusout input[name=name]': 'changeName'
	},	
	
	initialize: function() {
		
		var that = this;
		
		// Create a collection of this view messages
		this.messages = new chat.Messages();
		
		// Create the informations view and select the window
		this.selected();
		
		// Listen to new messages					
		this.listenTo(this.model, 'change:messages', this.getMessages);
		this.listenTo(this.messages, 'add', this.addItem);
		this.listenTo(this.messages, 'add', this.status);
		this.listenTo(this.model, 'urgent', this.urgent);
		this.listenTo(this.model, 'render', this.active);
		this.listenTo(this.model, 'minus', this.minus);
		this.listenTo(this.model, 'change:writing', this.writing);
		
		// Add Active class to record view
		this.active();
		
		// Render the view	
		$(this.render().el).prependTo('.conversations');
		
		this.$input = this.$el.find('textarea');
		
		this.editor = new wysihtml5.Editor( that.$el.find('textarea').get(0) , { // id of textarea element
			toolbar: that.$el.find('.toolbar').get(0) , // id of toolbar element
			parserRules:    wysihtml5ParserRules,
			useLineBreaks:  true
		});
		
		this.$el.find('.wysihtml5-sandbox').contents().find('body').on('click',function() {
        	that.selected();
		});
		
		// If the operator type enter, send the message
		this.$el.find('.wysihtml5-sandbox').contents().find('body').on("keydown",function(e) {
			that.sendOnEnter(e);
		});
		
		// Get the messages
		this.getMessages();
		
		// If the visitor is writing, show it
	    this.$writing = this.$el.find('.alert-writing');	
				
	},
	
	render: function () {
		
		var template= _.template( $('#conversation').html());
		this.$el.html(template( this.model.toJSON() ));

		$('input, textarea').placeholder();
		
		return Backbone.View.prototype.render.apply(this, arguments);
	},
	
	selected: function (e) {
	
		$('.conversations .selected').removeClass('selected');
		this.$el.addClass('selected');

		if (typeof(chat.app.live.informations) == 'undefined') {
			chat.app.live.informations = new chat.Views.Informations({model: this.model});
			return;
		}
		
		if (chat.app.live.informations.model.get('id') !== this.model.get('id')) {
		
			chat.app.live.informations.remove(); 
			chat.app.live.informations = new chat.Views.Informations({model: this.model});
			chat.app.setInformationsWidth();
			
		}
		
	},
	
	getMessages: function() {
	
		this.messages.set(this.model.get('messages'));
								
	},
	
	sendOnEnter: function(e) {
		
		if (e.keyCode == 13 && !e.shiftKey) { this.send(); }
		
	},
	
	send: function () {

		this.message = this.editor.getValue();

		if ( $.trim(this.message).length > 0 ){ /*On vérifie que le champ n'est pas vide ou contient uniquement des espaces*/
			
			sess.publish('visitor/'+licence+'/'+this.model.id, this.message);
			
		}
		// clear the search field
		this.clearInput();

	},
	
	addItem: function(message) {	
	
		// create an instance of the sub-view to render the single message item.
		switch ( message.get('from') ) {
			case 'operator':
				new chat.Views.MessageOperator({
					model: message
				}).render( this.$el.find('.conversation-section-list') );
				this.$el.find('.status').removeClass('text-urgent');				
				break;
			case 'visitor':	
				new chat.Views.MessageVisitor({
					model: message
				}).render( this.$el.find('.conversation-section-list') );
				break;
			case 'server':	
				new chat.Views.MessageServer({
					model: message
				}).render( this.$el.find('.conversation-section-list') );
				break;
		}	
		
		// Scroll to bottom of chat
		this.$el.find( '.conversation-section' ).scrollTop(10000);
			
	},
	
	clearInput: function() {
		
		this.editor.clear();
		
	},
		    
    minus: function(e) {

		if (typeof(e) !== 'undefined') e.stopPropagation();
		
		if ($(window).width() < 768) $('.aside-chat-left').css({display: 'block'});
		else $('.aside-chat-left').css({display: 'table-cell'});
		
	  	var that = this;
		
		this.model.trigger('unactive');
		
		chat.app.windows.splice( $.inArray(that, chat.app.windows), 1 );
	  	chat.app.trigger('change:windows');
	  	
	  	if (chat.app.live.informations.model.get('id') == this.model.get('id')) {
	  		chat.app.live.informations.remove();
	  		if (chat.app.windows.length == 1) {
	  			chat.app.live.informations = new chat.Views.Informations({model: chat.app.windows[chat.app.windows.length-1].model}); 
	  		}
	  	}

		this.remove();
		  
    },
	
	close: function() {
		
		var that = this;
		
		new chat.Views.ModalClose();
		
		$('.modal-close-confirm').click(function() {

			sess.call('chat/close', { sid: that.model.get('id') } );			
			that.minus();
			
		});
		
	},
	
	ban: function() {
	
		var that = this;
		
		new chat.Views.ModalBan();
		
		$('.modal-ban-confirm').click(function() {
	
			chat.app.windows.splice( $.inArray(that, chat.app.windows), 1 );
			chat.app.trigger('change:windows');
			sess.call('chat/ban', { sid: that.model.get('id') } );

			that.minus();
		
		});
			
	},
	
	transfer: function() {

		this.connected = chat.app.records.filter(function(model) {
			return ((model.get('type') == 'operator') && (model.get('available')) && (model.get('id') != user.id));
		});		
		
		if (typeof(chat.app.modalTransfer) !== 'undefined') chat.app.modalTransfer.remove();
		chat.app.modalTransfer = new chat.Views.ModalTransfer({collection: this.connected, visitor: this.model});
		
	},
	
	urgent: function () {	  
		this.$el.find('.status').addClass('text-urgent');	    
    },
    
    active: function() {
	    this.model.trigger('active');
    },    
    
    status: function () {
	    
	    // Test if status is unanswered
		if ( this.messages.at(this.messages.length-1).get('from') == 'visitor' ) {
			this.$el.find('.status').removeClass('text-answered').addClass('text-unanswered');			
		} else {
			this.$el.find('.status').removeClass('text-unanswered').addClass('text-answered');
		}
	    
    },
    
    writing: function () { 
	    
	    if ( this.model.get('writing') ) { 
	    	this.$writing.removeClass('fadeOut').addClass('fadeIn');
	    	this.$writing.show(); 
	    } 
	    else { 
	    	this.$writing.removeClass('fadeIn').addClass('fadeOut'); 
	    }
	    
    },
    
    changeName: function(e) {
		
		this.name = this.$el.find('input[name="name"]').val();
		
		sess.call('chat/changeName', {sid: this.model.get('id'), name: this.name});
		
	}
	
});
/***********************
INFORMATIONS VIEW
***********************/
chat.Views.Informations = Backbone.View.extend({
	
	tagName: 'aside',
	className: 'vbox bg-white aside-chat-right animated fadeInRight',
	
    events: {
		'click .informations-header .icon-angle-right': 'reduce',
		'click .informations-header .icon-angle-left': 'extend',
		'focusout input': 'update'
	},	
	
	initialize: function() {
		
		// Change the informations view if pages or questions changed
		this.listenTo(this.model, 'change:pages', this.render);
		this.listenTo(this.model, 'change:questions', this.render);
		
		this.render();
	},
	
	render: function () {
		
		var template= _.template( $('#informations').html());
		this.$el.html(template( this.model.toJSON() ));
		
		this.$el.appendTo( '#live' );
		
		if (chat.app.live.showInformations) this.extend();
		else this.reduce();
		
		return Backbone.View.prototype.render.apply(this, arguments);
	},
	
	reduce: function() {
		
		this.$el.find('.informations-header h5').addClass('hide');
		this.$el.find('.informations-section').addClass('hide');
		this.$el.find('.informations-header .icon-angle-right').addClass('hide');
		this.$el.find('.informations-header .icon-angle-left').removeClass('hide');
		this.$el.width('50');
		
		chat.app.live.showInformations = false;
		
	},
	
	extend: function() {
		
		this.$el.find('.informations-header h5').removeClass('hide');
		this.$el.find('.informations-section').removeClass('hide');
		this.$el.find('.informations-header .icon-angle-right').removeClass('hide');
		this.$el.find('.informations-header .icon-angle-left').addClass('hide');
		this.$el.width('275');
		
		chat.app.live.showInformations = true;
		
	},
	
	update: function(e) {
		
		this.firstname = this.$el.find('input[name="firstname"]').val();
		this.lastname = this.$el.find('input[name="lastname"]').val();
		this.email = this.$el.find('input[name="email"]').val();
		
		sess.call('chat/updateInformations', {sid: this.model.get('id'), firstname: this.firstname, lastname: this.lastname, email: this.email});
		
	}
	
});
chat.Views.Message = Backbone.View.extend({
	
	initialize: function() {
		// bind model's changes to the render() method to mantain interface up to date.
		this.model.on( 'change', this.render, this );
	},
	
	render: function( section ) {
		this.$el.html(this.template( this.model.toJSON() ));
		this.$el.appendTo( section );
		
		date = moment(this.model.get('date')*1000);
		$('<span class="date">' + date.format('hh:mm') + '</span>').appendTo(this.$el.find('p'));
		
		this.trigger('render');
		return this;
	}
	
});
chat.Views.MessageServer = chat.Views.Message.extend({
	
	tagName: 'p',
	className: 'msg-server',
	template: _.template( $('#message-server').html() ),

});


chat.Views.MessageOperator = chat.Views.Message.extend({
	
	tagName: 'li',
	className: 'conversation-section-item animated',
	template: _.template( $('#message-operator').html() )
	
});


chat.Views.MessageVisitor = chat.Views.Message.extend({
	
	tagName: 'li',
	className: 'conversation-section-item animated',
	template: _.template( $('#message-visitor').html() )
	
});
chat.Views.ModalClose = Backbone.View.extend({
	
	id: 'close',
	className: 'modal fade',
	template: _.template( $('#modal-close').html()),
	
	initialize: function() {		
		this.render();
	},
	
	render: function() {
		this.$el.html(this.template());
		this.$el.appendTo('#chat');
		this.$el.attr( { 'tabindex':'-1', 'role':'dialog', 'aria-labelledby':'close', 'aria-hidden':'true' } )
		this.$el.modal('show');
		return this;
	}
	
});
chat.Views.ModalBan = Backbone.View.extend({
	
	id: 'close',
	className: 'modal fade',
	template: _.template( $('#modal-ban').html()),
	
	initialize: function() {		
		this.render();
	},
	
	render: function() {
		this.$el.html(this.template());
		this.$el.appendTo('#chat');
		this.$el.attr( { 'tabindex':'-1', 'role':'dialog', 'aria-labelledby':'close', 'aria-hidden':'true' } )
		this.$el.modal('show');
		return this;
	}
	
});
chat.Views.ModalTransfer = Backbone.View.extend({
	
	id: 'transfer',
	className: 'modal fade',
	template: _.template( $('#modal-transfer').html()),
	
	initialize: function(options) {
		this.options = options;	
		this.render();
	},
	
	render: function() {
		
		this.$el.html(this.template());
		this.$el.appendTo('#chat');
		this.$el.attr( { 'tabindex':'-1', 'role':'dialog', 'aria-labelledby':'close', 'aria-hidden':'true' } )
	    var self = this;

		if (_.isEmpty(this.collection)) {
			this.$el.find('.modal-body').html('Aucun opérateur disponible.');
		} else {
		
		    $.each(self.collection, function(index, operator) { // iterate through the collection
				var transferView = new chat.TransferView({model: operator, visitor: self.options.visitor}); 
				self.$el.find('.modal-body').append(transferView.el);
			});
			
		}

		this.$el.modal('show');
		return this;
	}
	
});
/*========================================
Dashboard Connected View
=========================================*/
	
chat.TransferView = Backbone.View.extend({
		
	tagName: 'li',
	className: 'list-group-item',
	
	events: {
		'click .media' : 'select',
		'click .btn-danger' : 'unselect',
		'click .btn-success' : 'transfer'
	},	
			
    initialize: function (options) {
    
    	this.options = options;
    	this.render(); 
    	
    },
    
    render: function () {
    
	    var template= _.template( $('#transfer-view').html());
	    this.$el.html( template(this.model.toJSON()) );
	    
    },
    
    select: function () {
	    
	    this.$el.find('.media').addClass('hide');
	    this.$el.find('.validate').removeClass('hide');
	    
    },
    
    unselect: function () {
	    
	    this.$el.find('.media').removeClass('hide');
	    this.$el.find('.validate').addClass('hide');
	    
    },
    
    transfer: function () {

	    sess.call('chat/transfer', { sid: this.options.visitor.get('id'), operator: this.model.get('id')} );
	    this.options.visitor.trigger('minus');
	    
    }
    
});
/*========================================
Parameters list
=========================================*/
	
chat.ParametersView = Backbone.View.extend({
		
	tagName: 'section',
	id: 'parameters-section',
	className: 'vbox stretch hide',
			
    initialize: function (records) {
    	
    	this.render(); 
    	
    },
    
    render: function () {
    
	    var template= _.template( $('#parameters').html());
	    this.$el.html( template() );
		this.$el.appendTo( '#chat-section' );
	    
    }
        
});
/*========================================
Records list
=========================================*/
	
chat.DashboardView = Backbone.View.extend({
		
	tagName: 'section',
	id: 'dashboard-section',
	className: 'vbox stretch',
			
    initialize: function (records) {
    	
    	this.render();
    	
    	this.collection = records;
    	
    	this.visitors = {};
    	this.operators = {};
    	this.stats = {};
    	
    	this.listenTo(this.collection, 'add', this.update);
    	this.listenTo(this.collection, 'change', this.update);
    	
    	// Show a graph representing the load of the chat, depending on numbers of visitors & operators
	    $('.easypiechart').each(function(){
	    	var $barColor = $(this).data("barColor") || function($percent) {
	            $percent /= 100;
	            return "rgb(" + Math.round(255 * $percent) + ", " + Math.round(255 * (1-$percent)) + ", 0)";
	        },
			$trackColor = $(this).data("trackColor") || "#c8d2db",
			$scaleColor = $(this).data("scaleColor"),
			$lineWidth = $(this).data("lineWidth") || 12,
			$size = $(this).data("size") || 130,
			$animate = $(this).data("animate") || 1000;
	
			$(this).easyPieChart({
		        barColor: $barColor,
		        trackColor: $trackColor,
		        scaleColor: $scaleColor,
		        lineCap: 'butt',
		        lineWidth: $lineWidth,
		        size: $size,
		        animate: $animate,
		        onStep: function(value) {
		          this.$el.find('span').text(parseInt(value));
		        }
		    });
		    
		});
		
		this.update();
    	
    },
    
    render: function () {
    
	    var template= _.template( $('#dashboard').html());
	    this.$el.html( template() );
		this.$el.appendTo( '#chat-section' );
	    
    },
    
    update: function () {  
		
		// Variable initialisation
		that = this;

		this.visitors = this.collection.where({ type: 'visitor', closed: false, banned: false });
		this.visitors.chatting = this.visitors.filter(function(model) {
			var v = model.get('operator');
			return ((typeof(v)!=='undefined') && (v!==null));
		});		
		
		this.operators = this.collection.where({ type: 'operator' });
		this.available = this.collection.where({ type: 'operator', available: true });	
			
		this.stats.duration = 0;
		this.stats.messages = 0;
		this.stats.chats = 0;
		this.stats.waiting = 0;
		this.stats.pages = 0;
		this.stats.satisfaction = 100;
		this.stats.satisfactions = 0;
		this.stats.satisfied = 0;
		this.stats.now = moment();
		
		// Calculs
		if (this.available.length > 0 && this.visitors.length > 0) {
			
			$.each(this.visitors, function(key, visitor) {
				
				o = visitor.get('operator');
				if (typeof(o) !== 'undefined' && o!==null) {
													
					that.stats.messages += visitor.get('messages').length;
					that.stats.waiting += visitor.get('startChatTime') - visitor.get('startTime');
					that.stats.duration += that.stats.now.diff(moment(visitor.get('startChatTime')*1000));
					if (visitor.get('satisfaction') !== null) that.stats.satisfactions += 1;
					if (visitor.get('satisfaction')) that.stats.satisfied += 1;
					
				}
				
				$.each(visitor.get('pages'), function(key, page) {
					that.stats.pages += 1;
				});
				
			});
			
			// Messages per chat
			this.stats.messages = Math.round( this.stats.messages / this.visitors.chatting.length );
			
			// Waiting time for visitor before chat
			this.stats.waiting = Math.round( this.stats.waiting / this.visitors.chatting.length * 1000 );
			this.stats.waiting = moment( this.stats.waiting ).format('mm:ss');
			
			// Time spent by operators per chat
			this.stats.duration = Math.round( this.stats.duration / this.visitors.chatting.length );
			this.stats.duration = moment( this.stats.duration ).format('mm:ss');
			
			// Simultaneous chats per operator
			this.stats.chats = Math.round( this.visitors.chatting.length / this.available.length *10 ) / 10;
			
			// Pages seen by visitors
			this.stats.pages = Math.round( this.stats.pages / this.visitors.length );
			
			// Visitors' satisfaction
			if (this.stats.satisfactions !== 0) this.stats.satisfaction = Math.round( 100 * (this.stats.satisfied / this.stats.satisfactions) );
			else this.stats.satisfaction = 100;
							
		} 
		
		// Operators
		$('.operators .connected span').text( this.available.length );
		$('.operators .icon-male').text( this.stats.chats );
		$('.operators .icon-time').text( this.stats.duration );
		$('.operators .icon-comments').text( this.stats.messages );
		
		// Visitors
		$('.visitors .connected span').text( this.visitors.length );
		$('.visitors .icon-time').text( this.stats.waiting );
		$('.visitors .icon-eye-open').text( this.stats.pages );
		$('.visitors .icon-thumbs-up').text( this.stats.satisfaction + '%' );

		// List of connected operators
		if (typeof(this.connected) !== 'undefined') this.connected.remove();
		this.connected = new chat.DashboardListConnectedView({collection: this.operators});
		
		// Pie Chart
		this.updatePieChart();
    	
    },
    
    updatePieChart: function () {

	    this.stats.load = ( this.visitors.length / this.available.length ) * 20;
	    
	    if (this.stats.load > 100) this.stats.load = 100;
	    if (this.operators.length == 0) this.stats.load = 0;

	    $('.easypiechart').data('easyPieChart').update( this.stats.load );
	    
    }
    
});
/*========================================
Dashboard Connected View
=========================================*/
	
chat.DashboardListConnectedView = Backbone.View.extend({
		
	tagName: 'ul',
	className: 'list-group alt',
			
    initialize: function () {
    
    	$(this.render().el).appendTo('.list-connected');
    	
    },
    
    render: function () {
    	var self = this;

	    $.each(self.collection, function(index, operator) { // iterate through the collection
			var connectedView = new chat.DashboardConnectedView({model: operator}); 
			self.$el.append(connectedView.el);
		});

		return this;
	    
    }
    
});
/*========================================
Dashboard Connected View
=========================================*/
	
chat.DashboardConnectedView = Backbone.View.extend({
		
	tagName: 'li',
	className: 'list-group-item',
			
    initialize: function () {
    
    	this.render(); 
    	
    },
    
    render: function () {
    
	    var template= _.template( $('#dashboard_connected').html());
	    this.$el.html( template(this.model.toJSON()) );
		this.$el.prependTo( '.list-connected' );
	    
    }
    
});