(function(window, undefined) {
    "use strict";
    var _ = function() {
        if (_) return _;
        return {
            isArray: function(arr) {
                return Object.prototype.toString.call(arr) === "[object Array]";
            },
            isObject: function(obj) {
                var type = typeof obj;
                return type === "function" || type === "object" && !!obj;
            },
            isFunction: function(obj) {
                if (typeof /./ !== "function" && typeof Int8Array !== "object") {
                    return typeof obj === "function" || false;
                } else {
                    return toString.call(obj) === "[object Function]";
                }
            },
            isString: function(obj) {
                return toString.call(obj) === "[object String]";
            },
            isOwn: function(obj, prop) {
                return Object.prototype.hasOwnProperty.call(obj, prop);
            },
            bind: function(fn, context) {
                if (!this.isFunction(fn)) {
                    return undefined;
                }
                var args = slice.call(arguments, 2);
                return function() {
                    return fn.apply(context || this, args.concat(slice.call(arguments)));
                };
            },
            each: function(obj, iteratee) {
                var i, length;
                if (_.isArray(obj)) {
                    for (i = 0, length = obj.length; i < length; i++) {
                        iteratee(obj[i], i, obj);
                    }
                } else {
                    for (var key in obj) {
                        if (obj.hasOwnProperty(key)) {
                            iteratee(obj[key], key, obj);
                        }
                    }
                }
            },
            extend: function(obj) {
                if (!this.isObject(obj)) {
                    return obj;
                }
                var source, prop;
                for (var i = 1, length = arguments.length; i < length; i++) {
                    source = arguments[i];
                    for (prop in source) {
                        if (Object.getOwnPropertyDescriptor && Object.defineProperty) {
                            var propertyDescriptor = Object.getOwnPropertyDescriptor(source, prop);
                            Object.defineProperty(obj, prop, propertyDescriptor);
                        } else {
                            obj[prop] = source[prop];
                        }
                    }
                }
                return obj;
            },
            throttle: function(func, wait, options) {
                var context, args, result;
                var timeout = null;
                var previous = 0;
                if (!options) options = {};
                var later = function() {
                    previous = options.leading === false ? 0 : _.now();
                    timeout = null;
                    result = func.apply(context, args);
                    if (!timeout) context = args = null;
                };
                return function() {
                    var now = _.now();
                    if (!previous && options.leading === false) previous = now;
                    var remaining = wait - (now - previous);
                    context = this;
                    args = arguments;
                    if (remaining <= 0 || remaining > wait) {
                        if (timeout) {
                            clearTimeout(timeout);
                            timeout = null;
                        }
                        previous = now;
                        result = func.apply(context, args);
                        if (!timeout) context = args = null;
                    } else if (!timeout && options.trailing !== false) {
                        timeout = setTimeout(later, remaining);
                    }
                    return result;
                };
            },
            debounce: function(func, wait, immediate) {
                var timeout, args, context, timestamp, result;
                var later = function() {
                    var last = _.now() - timestamp;
                    if (last < wait && last >= 0) {
                        timeout = setTimeout(later, wait - last);
                    } else {
                        timeout = null;
                        if (!immediate) {
                            result = func.apply(context, args);
                            if (!timeout) context = args = null;
                        }
                    }
                };
                return function() {
                    context = this;
                    args = arguments;
                    timestamp = _.now();
                    var callNow = immediate && !timeout;
                    if (!timeout) timeout = setTimeout(later, wait);
                    if (callNow) {
                        result = func.apply(context, args);
                        context = args = null;
                    }
                    return result;
                };
            },
            once: function(func) {
                var result;
                var wasCalled = false;
                return function() {
                    if (wasCalled) return result; else {
                        wasCalled = true;
                        result = func.apply(this, arguments);
                        func = null;
                        return result;
                    }
                };
            },
            keys: function(obj) {
                if (!_.isObject(obj)) return [];
                if (Object.keys) return Object.keys(obj);
                var keys = [];
                for (var key in obj) if (_.has(obj, key)) keys.push(key);
                return keys;
            },
            addEvent: function(el, type, callback) {
                if (window.addEventListener) {
                    el.addEventListener(type, callback, false);
                } else if (window.attachEvent) {
                    el.attachEvent("on" + type, callback);
                } else {
                    el["on" + type] = callback;
                }
            },
            removeEvent: function(el, type, callback) {
                if (window.removeEventListener) {
                    el.removeEventListener(type, callback, false);
                } else if (window.detachEvent) {
                    el.detachEvent("on" + type, callback);
                } else {
                    el["on" + type] = null;
                }
            },
            stopPropagation: function(type) {
                var e = type || window.event;
                e.cancelBubble = true;
                if (e.stopPropagation) e.stopPropagation();
            },
            isMsie: function() {
                if (/MSIE (\d+\.\d+);/.test(navigator.userAgent)) {
                    var ieversion = +RegExp.$1;
                    if (ieversion < 10) {
                        return true;
                    }
                }
            },
            isUnsuported: function() {
                if (this.isMsie()) return true;
                if (!window.postMessage) return true;
                if (!window.JSON) return true;
                try {
                    window.postMessage("ping", "*");
                } catch (err) {
                    return true;
                }
                return false;
            },
            now: Date.now
        };
    }();
    var Events = function() {
        var idCounter = 0;
        _.uniqueId = function(prefix) {
            var id = ++idCounter + "";
            return prefix ? prefix + id : id;
        };
        var Events = {
            on: function(name, callback, context) {
                if (!eventsApi(this, "on", name, [ callback, context ]) || !callback) return this;
                this._events || (this._events = {});
                var events = this._events[name] || (this._events[name] = []);
                events.push({
                    callback: callback,
                    context: context,
                    ctx: context || this
                });
                return this;
            },
            once: function(name, callback, context) {
                if (!eventsApi(this, "once", name, [ callback, context ]) || !callback) return this;
                var self = this;
                var once = _.once(function() {
                    self.off(name, once);
                    callback.apply(this, arguments);
                });
                once._callback = callback;
                return this.on(name, once, context);
            },
            off: function(name, callback, context) {
                var retain, ev, events, names, i, l, j, k;
                if (!this._events || !eventsApi(this, "off", name, [ callback, context ])) return this;
                if (!name && !callback && !context) {
                    this._events = void 0;
                    return this;
                }
                names = name ? [ name ] : _.keys(this._events);
                for (i = 0, l = names.length; i < l; i++) {
                    name = names[i];
                    if (events = this._events[name]) {
                        this._events[name] = retain = [];
                        if (callback || context) {
                            for (j = 0, k = events.length; j < k; j++) {
                                ev = events[j];
                                if (callback && callback !== ev.callback && callback !== ev.callback._callback || context && context !== ev.context) {
                                    retain.push(ev);
                                }
                            }
                        }
                        if (!retain.length) delete this._events[name];
                    }
                }
                return this;
            },
            trigger: function(name) {
                if (!this._events) return this;
                var args = slice.call(arguments, 1);
                if (!eventsApi(this, "trigger", name, args)) return this;
                var events = this._events[name];
                var allEvents = this._events.all;
                if (events) triggerEvents(events, args);
                if (allEvents) triggerEvents(allEvents, arguments);
                return this;
            },
            stopListening: function(obj, name, callback) {
                var listeningTo = this._listeningTo;
                if (!listeningTo) return this;
                var remove = !name && !callback;
                if (!callback && typeof name === "object") callback = this;
                if (obj) (listeningTo = {})[obj._listenId] = obj;
                for (var id in listeningTo) {
                    obj = listeningTo[id];
                    obj.off(name, callback, this);
                    if (remove || _.isEmpty(obj._events)) delete this._listeningTo[id];
                }
                return this;
            },
            delegateEvents: function(obj, events) {
                if (!events) return;
                this.undelegateEvents();
                for (var key in events) {
                    var method = events[key];
                    if (!_.isFunction(method)) method = this[events[key]];
                    if (!method) continue;
                    method = _.bind(method, this);
                    this.listenTo(obj, key, method);
                }
                return this;
            },
            undelegateEvents: function() {
                this.stopListening();
                return this;
            }
        };
        var eventSplitter = /\s+/;
        var eventsApi = function(obj, action, name, rest) {
            if (!name) return true;
            if (typeof name === "object") {
                for (var key in name) {
                    obj[action].apply(obj, [ key, name[key] ].concat(rest));
                }
                return false;
            }
            if (eventSplitter.test(name)) {
                var names = name.split(eventSplitter);
                for (var i = 0, l = names.length; i < l; i++) {
                    obj[action].apply(obj, [ names[i] ].concat(rest));
                }
                return false;
            }
            return true;
        };
        var triggerEvents = function(events, args) {
            var ev, i = -1, l = events.length, a1 = args[0], a2 = args[1], a3 = args[2];
            switch (args.length) {
              case 0:
                while (++i < l) (ev = events[i]).callback.call(ev.ctx);
                return;

              case 1:
                while (++i < l) (ev = events[i]).callback.call(ev.ctx, a1);
                return;

              case 2:
                while (++i < l) (ev = events[i]).callback.call(ev.ctx, a1, a2);
                return;

              case 3:
                while (++i < l) (ev = events[i]).callback.call(ev.ctx, a1, a2, a3);
                return;

              default:
                while (++i < l) (ev = events[i]).callback.apply(ev.ctx, args);
                return;
            }
        };
        var listenMethods = {
            listenTo: "on",
            listenToOnce: "once"
        };
        _.each(listenMethods, function(implementation, method) {
            Events[method] = function(obj, name, callback) {
                var listeningTo = this._listeningTo || (this._listeningTo = {});
                var id = obj._listenId || (obj._listenId = _.uniqueId("l"));
                listeningTo[id] = obj;
                if (!callback && typeof name === "object") callback = this;
                obj[implementation](name, callback, this);
                return this;
            };
        });
        Events.bind = Events.on;
        Events.unbind = Events.off;
        return Events;
    }();
    var xdm = function() {
        return {
            sendMessage: function(name, data) {
                var message = JSON.stringify({
                    scope: "client",
                    name: name,
                    data: data
                });
                console.log("client" + ": " + name);
                var send = function(target, message) {
                    return function() {
                        var targetWindow = target.window;
                        if (targetWindow) {
                            targetWindow.postMessage(message, target.origin);
                        } else {
                            setTimeout(send, 500);
                        }
                    };
                }(this, message);
                send();
            }
        };
    }();
    var sdk = function() {
        if (sdk) return sdk;
        return {
            config: config,
            api: api
        };
        function config(name, obj) {}
        function api(name, obj) {}
    }();
    var core = function() {
        var stylesUrl = "{{ licence|customerDir|raw }}/css/lily-float.css";
        var appsRegistry = {};
        return _.extend({
            hostDocument: window.document,
            hostWindow: window,
            hostBody: window.document.getElementsByTagName("body")[0],
            emptyLink: window.document.createElement("a"),
            origin: window.location.origin || this.getOrigin(),
            host: window.location.host,
            events: {
                "lily.onReady": "onLilyReady",
                "widget.click": "onWidgetClick",
                "lily.onExpand": "onLilyExpand"
            },
            config: {},
            initialize: function() {
                this.registerApp(this.hostWindow, "host");
                this.loadStylesheet(stylesUrl);
                this.delegateEvents(this, this.events);
                _.addEvent(this.hostWindow, "message", _.bind(this.onTargetMessage, this));
            },
            registerApp: function(frame, uid) {
                appsRegistry[uid] = frame;
            },
            getRegisteredApp: function(uid) {
                return appsRegistry[uid] || undefined;
            },
            getHost: function(href) {
                this.emptyLink.href = href;
                return this.emptyLink.hostname;
            },
            getOrigin: function(url) {
                this.emptyLink.href = url;
                var parts = this.emptyLink.href.split("/");
                return parts[0] + "//" + parts[2];
            },
            onTargetMessage: function(event) {
                var message;
                try {
                    message = JSON.parse(event.data);
                } catch (err) {
                    return;
                }
                var sender = message.sender, hostLocation;
                if (sender && appsRegistry[sender]) {
                    hostLocation = appsRegistry[sender];
                }
                if (hostLocation && this.getHost(event.origin) === hostLocation.host) {
                    if (event.origin === hostLocation.origin) {
                        if (message.scope === "saio") {
                            console.log(message.scope + ": " + message.name);
                            saio.trigger(message.name, message.data);
                        }
                    }
                }
            },
            loadStylesheet: function(url) {
                var link = document.createElement("link");
                link.rel = "stylesheet";
                link.type = "text/css";
                link.href = url;
                var entry = document.getElementsByTagName("script")[0];
                entry.parentNode.insertBefore(link, entry);
            },
            onLilyReady: function() {
                this.isLilyReady = true;
            },
            onWidgetClick: function() {
                this.trigger("lily.expand");
            },
            onLilyExpand: function() {
                this.trigger("widget.hide");
            },
            shouldOpenStandalone: function() {
                return false;
            }
        }, Events, sdk);
    };
    var Iframe = function() {
        return _.extend(xdm, Events, {
            createIframe: function(options) {
                var $iframe = document.createElement("iframe");
                this.setAttributes($iframe, options);
                this.setInlineStyle($iframe, options.styles);
                return $iframe;
            },
            createWidget: function(options) {
                var $widget = document.createElement("div");
                $widget.setAttribute("id", options.frameId);
                $widget.innerHTML = options.html;
                this.setInlineStyle($widget, options.styles);
                return $widget;
            },
            createContainer: function(options) {
                var $container = document.createElement("div");
                $container.setAttribute("id", options.containerId);
                this.setInlineStyle($container, options.styles);
                return $container;
            },
            insertIframe: function(iframe, options) {
                return document.getElementById(options.containerId).appendChild(iframe);
            },
            insertInBody: function(element) {
                saio.hostBody.appendChild(element);
            },
            hide: function() {
                this.setInlineStyle(this.el, "display", "none");
                window.focus();
            },
            show: function() {
                this.removeInlineStyle("display");
            },
            setAttributes: function(element, attributes) {
                _.each(attributes, function(value, attribute) {
                    element.setAttribute(attribute, value);
                });
            },
            setInlineStyle: function(el, property, value) {
                var stylesObj = {}, style = el.style;
                if (_.isString(property)) {
                    stylesObj[property] = value;
                } else {
                    stylesObj = property;
                }
                if ("setProperty" in style) {
                    _.each(stylesObj, function(value, property) {
                        style.setProperty(property, "" + value, "important");
                    });
                } else {
                    _setInlineStyleCompat(el, stylesObj);
                }
            },
            removeInlineStyle: function(property) {
                var style = this.el.style;
                if ("removeProperty" in style) {
                    style.removeProperty(property);
                } else {
                    _removeInlineStyleCompat(property);
                }
            }
        });
        function _setInlineStyleCompat(el, stylesObj) {
            var props = [];
            _.each(stylesObj, function(value, property) {
                props.push(property + ":" + value + " !important");
            });
            el.style.cssText = props.join(";");
        }
        function _removeInlineStyleCompat() {
            this._setInlineStyleCompat({});
        }
    }();
    var LilyIframe = function() {
        return _.extend({
            uid: "lily",
            target: '{{ url("lily_app_index", { licence: licence }) }}',
            origin: saio.getOrigin('{{ url("lily_app_index", { licence: licence }) }}'),
            host: saio.getHost(this.origin),
            window: undefined,
            el: undefined,
            frameId: "lilyApp",
            events: {
                "lily.load": "onLoad",
                "lily.ready": "onReady",
                "lily.expand": "showApp",
                "lily.shrink": "shrink"
            },
            load: function() {
                this.el = this.createLily(this.getElOptions());
                this.window = saio.hostDocument.getElementById(this.frameId).contentWindow;
                this.delegateEvents(saio, this.events);
                saio.registerApp(this, this.uid);
            },
            getElOptions: function() {
                return {
                    iframe: {
                        id: this.frameId,
                        allowTransparency: "true",
                        frameBorder: "0",
                        scrolling: "yes",
                        name: "saio_lily_app",
                        role: "dialog",
                        src: this.target
                    },
                    container: {
                        containerId: "lilyAppContainer",
                        styles: {
                            display: "none"
                        }
                    }
                };
            },
            createLily: function(options) {
                if (!options) return;
                var $lilyContainer = options.container ? this.createContainer(options.container) : null, $lilyIframe = options.iframe ? this.createIframe(options.iframe) : null;
                this.insertInBody($lilyContainer);
                this.insertIframe($lilyIframe, options.container);
                return $lilyContainer;
            },
            onLoad: function(options) {
                this.sendMessage("host.sendInfo", {
                    host: window.location.host || null,
                    path: window.location.pathname || null,
                    href: window.location.href || null,
                    protocol: window.location.protocol || null,
                    referrer: document.referrer || null
                });
            },
            onReady: function(options) {
                if (options && options.displayApp) {
                    saio.trigger("lily.expand");
                } else {
                    saio.trigger("widget.show");
                }
                saio.trigger("lily.onReady");
            },
            shrink: function() {
                this.hide();
                if (saio.shouldOpenStandalone()) return;
                saio.trigger("lily.onShrink");
                saio.trigger("widget.show");
            },
            showApp: function() {
                var firstOpen = this.firstOpen;
                if (saio.shouldOpenStandalone()) {
                    return this.standaloneOpen();
                }
                this.show();
                this.sendMessage("lily.shown", {
                    firstOpen: firstOpen
                });
                saio.trigger("lily.onExpand");
                this.firstOpen = false;
            },
            standaloneOpen: function() {
                var win = window.open(this.target, "_blank");
                win.focus();
            }
        }, Iframe);
    };
    var WidgetIframe = function() {
        return _.extend({
            uid: "widget",
            window: saio.getRegisteredApp("lily").window,
            origin: saio.getRegisteredApp("lily").origin,
            el: undefined,
            frameId: "lily-widget-container",
            firstShow: true,
            events: {
                "widget.show": "showWidget",
                "widget.hide": "hide"
            },
            load: function() {
                this.el = this.createWidget(this.getElOptions());
                this.insertInBody(this.el);
                this.delegateEvents(saio, this.events);
                saio.registerApp(this, this.uid);
                _.addEvent(this.el, "click", _.bind(this.onWidgetClick, this));
            },
            getElOptions: function() {
                return {
                    iframe: {},
                    frameId: this.frameId,
                    html: "{{ widget }}",
                    styles: {
                        display: "none"
                    }
                };
            },
            onWidgetClick: function() {
                this.sendMessage("widget.click");
                saio.trigger("widget.click");
            },
            showWidget: function() {
                if (saio.isLilyReady) {
                    this.show();
                } else {
                    return saio.once("lily.onReady", this.showWidget, this);
                }
                this.sendMessage("widget.show", {
                    firstShow: this.firstShow
                });
                this.firstShow = false;
            }
        }, Iframe, Events);
    };
    var slice = [].slice;
    var toString = {}.toString;
    var saioq = window.saio || [];
    var saio = new core();
    if (_.isUnsuported()) return;
    var snippetVersion = saioq && saioq.SNIPPET_VERSION ? parseFloat(saioq.SNIPPET_VERSION, 10) : 0;
    saio.initialize();
    var lily = new LilyIframe().load();
    var widget = new WidgetIframe().load();
    while (saioq && saioq.length > 0) {
        var args = saioq.shift();
        var method = args.shift();
        if (saio[method]) {
            saio[method].apply(saio, args);
        }
    }
    window.saio = sdk;
})(this);