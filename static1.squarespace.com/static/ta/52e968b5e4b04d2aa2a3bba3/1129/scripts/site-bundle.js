! function(e) {
    function t(o) {
        if (n[o]) return n[o].exports;
        var i = n[o] = {
            exports: {},
            id: o,
            loaded: !1
        };
        return e[o].call(i.exports, i, i.exports, t), i.loaded = !0, i.exports
    }
    var n = {};
    return t.m = e, t.c = n, t.p = "", t(0)
}([function(e, t, n) {
    n(1), n(2), n(3), n(4), n(5), n(66), n(67), n(71), e.exports = n(91)
}, function(e, t) {
    Y || (Y = {}), Y.Template || (Y.Template = {}), Y.Template.noYUI = {
        init: function() {
            this.setIndexFullscreenGalleryHeights(), this.scrollYPolyfill(), this.vCenterTopSectionContent()
        },
        scrollYPolyfill: function() {
            window.scrollY || (window.scrollY = window.pageYOffset || document.documentElement.scrollTop, window.addEventListener("scroll", function() {
                window.scrollY = window.pageYOffset || document.documentElement.scrollTop
            }))
        },
        setIndexFullscreenGalleryHeights: function() {
            if (document.querySelectorAll && !(document.body.className.indexOf(" design-grid") > -1)) {
                var e = document.querySelectorAll("body.collection-type-index.slideshow-aspect-ratio-fullscreen .gallery-wrapper");
                if (0 !== e.length)
                    for (var t = window.innerHeight, n = 0; n < e.length; n++) e[n].style.height = t + "px"
            }
        },
        vCenterTopSectionContent: function() {
            var e = window.getComputedStyle(document.getElementById("header"), null).getPropertyValue("position"),
                t = document.querySelector(".main-content .index-section:first-child");
            if (t) {
                var n = t.querySelectorAll(".has-main-media").length > 0,
                    o = t.querySelectorAll(".index-gallery").length > 0;
                if ("absolute" == e && n && !o) {
                    var i = document.querySelector("#header .header-inner"),
                        r = header.querySelector(".title-logo-wrapper"),
                        a = document.querySelector("#mainNavigation"),
                        s = parseInt(window.getComputedStyle(i, null).paddingTop, 10);
                    if (a) {
                        a.style.whiteSpace = "nowrap", a.style.display = "inline";
                        var l = a.offsetWidth + (2 * r.offsetWidth - 18);
                        a.style.whiteSpace = "normal", a.style.display = "block";
                        var c = 0,
                            u = r.offsetHeight;
                        c = i.offsetWidth < l ? (u + s) / 2 + a.offsetHeight : (u + s) / 2, t.querySelector(".content-inner").style.paddingTop = c + "px";
                        var d = function() {
                                return u === r.offsetHeight
                            },
                            h = function() {
                                nIntervId = setInterval(function() {
                                    d() === !1 && (c = i.offsetWidth < l ? (r.offsetHeight + s) / 2 + a.offsetHeight : (r.offsetHeight + s) / 2, t.querySelector(".content-inner").style.paddingTop = c + "px", clearInterval(nIntervId))
                                }, 10), setTimeout(function() {
                                    clearInterval(nIntervId)
                                }, 1e3)
                            };
                        h()
                    }
                }
            }
        }
    }, Y.Template.noYUI.init()
}, function(e, t) {
    ! function() {
        var e, t = ".disable-hover:not(.sqs-layout-editing) #siteWrapper, .disable-hover:not(.sqs-layout-editing) #siteWrapper * {pointer-events: none !important;}",
            n = document.head || document.getElementsByTagName("head")[0],
            o = document.createElement("style"),
            i = document.body;
        o.type = "text/css", o.styleSheet ? o.styleSheet.cssText = t : o.appendChild(document.createTextNode(t)), n.appendChild(o), window.addEventListener("scroll", function() {
            clearTimeout(e), i.classList.contains("disable-hover") || i.classList.add("disable-hover"), e = setTimeout(function() {
                i.classList.remove("disable-hover")
            }, 200)
        }, !1)
    }()
}, function(e, t) {
    Y.namespace("Template").Lazyload = Class.create({
        initialize: function(e) {
            return this.el = e.el, this.mobile = e.mobile || !1, this.loadEvent = e.loadEvent || "throttle", "string" == typeof this.loadEvent && (this.loadEvent = this.loadEvent.toLowerCase()), this.el ? this.mobile === !1 && Y.UA.mobile ? (Y.all(this.el).each(function(e) {
                ImageLoader.load(e, {
                    load: !0
                })
            }), !1) : void this.bindUI() : (console.error("lazyload.js: You must define an element."), !1)
        },
        bindUI: function() {
            Y.all('img[data-load="viewport"]').each(function(e) {
                ImageLoader.load(e)
            }), this.loadImages(), "debounce" == this.loadEvent ? this.mitigate = function() {
                this.timeout && this.timeout.cancel(), this.timeout = Y.later(100, this, this.loadImages)
            } : this.mitigate = Y.throttle(this.loadImages, 200, this), Y.one(window).on("scroll", this.mitigate, this)
        },
        loadImages: function() {
            Y.all(this.el).each(function(e) {
                e.getY() < 1.5 * Y.config.win.innerHeight + Y.config.win.scrollY && ImageLoader.load(e, {
                    load: !0
                })
            })
        },
        refresh: function() {
            this.loadImages()
        }
    })
}, function(e, t) {
    Y.namespace("Template").RevealOnScroll = Class.create({
        initialize: function(e) {
            return this.el = e.el, this.offsetEl = e.offsetEl, this.behavior = e.behavior || "top", "string" == typeof this.behavior && (this.behavior = this.behavior.toLowerCase()), this.el ? !!Y.one(this.el) && void this.bindUI() : (console.error("sticky.js: You must specify an element."), !1)
        },
        bindUI: function() {
            this.getVariables(), Y.one(window).on("resize", function() {
                this.getVariables(), this.showOrHide()
            }, this), this.throttle = Y.throttle(Y.bind(function() {
                this.showOrHide()
            }, this), 200), this.debounce = function() {
                this.timeout && this.timeout.cancel(), this.timeout = Y.later(100, this, this.showOrHide)
            }, Y.one(window).on("scroll", function() {
                this.throttle(), this.debounce()
            }, this), Y.one(window).on("hashchange", this.debounce, this), this.showOrHide()
        },
        getVariables: function() {
            Y.one(this.offsetEl) && ("bottom" == this.behavior ? this.y = Y.one(this.offsetEl).getY() + Y.one(this.offsetEl).get("clientHeight") - Y.one(this.el).get("clientHeight") : this.y = Y.one(this.offsetEl).getY() - Y.one(this.el).get("clientHeight"))
        },
        showOrHide: function() {
            var e = Y.config.win.scrollY;
            e >= this.y ? Y.one(this.el).addClass("show") : Y.one(this.el).removeClass("show")
        }
    })
}, function(e, t, n) {
    var o = n(6);
    Y.namespace("Template").CenterNav = Class.create({
        initialize: function(e) {
            if (this.navItems = e.navItems, this.centerEl = e.centerEl, this.wrapper = e.wrapper, this.innerWrapper = e.innerWrapper, !this.navItems) return console.error("centernav.js: You must specify the nav items selector."), !1;
            if (!this.centerEl) return console.error("centernav.js: You must specify an element to center around."), !1;
            if (!this.wrapper) return console.error("centernav.js: You must specify an outer wrapper that contains the nav items and nav wrapper."), !1;
            if (!this.innerWrapper) return console.error("centernav.js: You must specify an inner nav wrapper."), !1;
            this.refresh();
            var t = new o({
                callback: this.refresh.bind(this),
                targets: ["#siteTitleWrapper"]
            });
            t.init()
        },
        refresh: function() {
            if (Y.all(this.navItems).size() > 1)
                if (this.CENTER_SPACING = 30, this.getVariables(), this.navSpace = (this.wrapperWidth - this.centerElWidth) / 2, Y.one(".custom-cart") && (this.navSpace = (this.wrapperWidth - this.centerElWidth) / 2 - (Y.one(".custom-cart").get("offsetWidth") + parseInt(Y.Squarespace.Template.getTweakValue("headerPadding"), 10))), this.navItemsSplitPoint = Math.round(Y.all(this.navItems).size() / 2), this.splitPointWidth = Y.all(this.navItems).item(this.navItemsSplitPoint - 1).get("offsetWidth"), this.navItemsLeft = Y.all(this.navItems).slice(0, this.navItemsSplitPoint), this.navItemsRight = Y.all(this.navItems).slice(this.navItemsSplitPoint), Y.all(this.navItems).size() % 2 !== 0 && this.navItemsLeft.get("offsetWidth").reduce(this.sum, 0) - this.splitPointWidth > this.navItemsRight.get("offsetWidth").reduce(this.sum, 0) && (this.navItemsSplitPoint = this.navItemsSplitPoint - 1, this.navItemsLeft = Y.all(this.navItems).slice(0, this.navItemsSplitPoint), this.navItemsRight = Y.all(this.navItems).slice(this.navItemsSplitPoint)), this.calculateWidthDiff(), this.leftOfLogo = Y.all(this.navItems).item(this.navItemsSplitPoint - 1), this.rightOfLogo = Y.all(this.navItems).item(this.navItemsSplitPoint), this.navItemsLeft.get("offsetWidth").reduce(this.sum, 0) > this.navSpace - 12 || this.navItemsRight.get("offsetWidth").reduce(this.sum, 0) > this.navSpace - 12) this.destroy(), Y.one(this.innerWrapper).setStyles({
                    marginLeft: 0,
                    marginTop: "10px",
                    marginBottom: 0
                });
                else {
                    this.destroy(), Y.one(this.leftOfLogo).setStyle("marginRight", this.centerElWidth / 2), Y.one(this.rightOfLogo).setStyle("marginLeft", this.centerElWidth / 2);
                    var e = parseInt(Y.one(this.innerWrapper).getComputedStyle("height"), 10);
                    Y.one(this.innerWrapper).setStyles({
                        marginLeft: this.widthDiff,
                        marginTop: Math.ceil(-1 * (this.centerElHeight / 2 + e / 2)),
                        marginBottom: Math.ceil(this.centerElHeight / 2 + e / 2 - e)
                    })
                }
            Y.one(this.innerWrapper).addClass("positioned")
        },
        destroy: function() {
            Y.all(this.navItems).removeAttribute("style")
        },
        getVariables: function() {
            this.wrapperWidth = Y.one(this.wrapper).get("offsetWidth") - 2 * parseInt(Y.Squarespace.Template.getTweakValue("headerPadding"), 10), this.centerElWidth = Y.one(this.centerEl).get("offsetWidth") + 2 * this.CENTER_SPACING, this.centerElHeight = Y.one(this.centerEl).get("offsetHeight")
        },
        calculateWidthDiff: function() {
            this.widthDiff = this.navItemsRight.get("offsetWidth").reduce(this.sum, 0) - this.navItemsLeft.get("offsetWidth").reduce(this.sum, 0)
        },
        sum: function(e, t) {
            return "number" == typeof e && "number" == typeof t ? e + t : (console.warn("centernav.js sum function: can't add non-numbers."), !1)
        }
    })
}, function(e, t, n) {
    "use strict";

    function o(e) {
        return e && e.__esModule ? e : {
            default: e
        }
    }
    Object.defineProperty(t, "__esModule", {
        value: !0
    });
    var i = n(7),
        r = o(i),
        a = n(60),
        s = o(a),
        l = n(61),
        c = o(l),
        u = n(65),
        d = "This browser does not support MutationObserver",
        h = function() {
            function e(t) {
                var n = t.callback,
                    o = t.targets,
                    i = void 0 === o ? [] : o;
                return (0, s.default)(this, e), this.MutationObserver = (0, u.checkForMutationObserver)(), this.MutationObserver ? (this.callback = (0, u.validateCallback)(n), void(this.targets = i)) : void console.error(d)
            }
            return (0, c.default)(e, [{
                key: "init",
                value: function() {
                    return this.MutationObserver ? (this.observer = this.createObserver(), void this.observeTargets()) : void console.error(d)
                }
            }, {
                key: "destroy",
                value: function() {
                    return this.MutationObserver ? (this.observer.disconnect(), this.observer = null, void document.removeEventListener("DOMContentLoaded", this.reactToMutations)) : void console.error(d)
                }
            }, {
                key: "createObserver",
                value: function() {
                    var e = this;
                    return new this.MutationObserver(function(t) {
                        e.evaluateMutations(t)
                    })
                }
            }, {
                key: "observeTargets",
                value: function() {
                    var e = this;
                    this.targets.forEach(function(t) {
                        (0, r.default)(document.querySelectorAll(t)).forEach(function(t) {
                            e.observer.observe(t, {
                                childList: !0,
                                subtree: !0,
                                attributes: !0
                            })
                        })
                    })
                }
            }, {
                key: "evaluateMutations",
                value: function(e) {
                    e && ("loading" === document.readyState ? document.addEventListener("DOMContentLoaded", this.reactToMutations) : this.reactToMutations())
                }
            }, {
                key: "reactToMutations",
                value: function() {
                    this.timer && clearTimeout(this.timer), this.timer = setTimeout(this.callback, 150)
                }
            }]), e
        }();
    t.default = h, e.exports = t.default
}, function(e, t, n) {
    e.exports = {
        default: n(8),
        __esModule: !0
    }
}, function(e, t, n) {
    n(9), n(53), e.exports = n(17).Array.from
}, function(e, t, n) {
    "use strict";
    var o = n(10)(!0);
    n(13)(String, "String", function(e) {
        this._t = String(e), this._i = 0
    }, function() {
        var e, t = this._t,
            n = this._i;
        return n >= t.length ? {
            value: void 0,
            done: !0
        } : (e = o(t, n), this._i += e.length, {
            value: e,
            done: !1
        })
    })
}, function(e, t, n) {
    var o = n(11),
        i = n(12);
    e.exports = function(e) {
        return function(t, n) {
            var r, a, s = String(i(t)),
                l = o(n),
                c = s.length;
            return l < 0 || l >= c ? e ? "" : void 0 : (r = s.charCodeAt(l), r < 55296 || r > 56319 || l + 1 === c || (a = s.charCodeAt(l + 1)) < 56320 || a > 57343 ? e ? s.charAt(l) : r : e ? s.slice(l, l + 2) : (r - 55296 << 10) + (a - 56320) + 65536)
        }
    }
}, function(e, t) {
    var n = Math.ceil,
        o = Math.floor;
    e.exports = function(e) {
        return isNaN(e = +e) ? 0 : (e > 0 ? o : n)(e)
    }
}, function(e, t) {
    e.exports = function(e) {
        if (void 0 == e) throw TypeError("Can't call method on  " + e);
        return e
    }
}, function(e, t, n) {
    "use strict";
    var o = n(14),
        i = n(15),
        r = n(31),
        a = n(20),
        s = n(32),
        l = n(33),
        c = n(49),
        u = n(51),
        d = n(50)("iterator"),
        h = !([].keys && "next" in [].keys()),
        f = "@@iterator",
        p = "keys",
        A = "values",
        g = function() {
            return this
        };
    e.exports = function(e, t, n, v, m, y, b) {
        l(n, t, v);
        var w, T, S, E = function(e) {
                if (!h && e in Y) return Y[e];
                switch (e) {
                    case p:
                        return function() {
                            return new n(this, e)
                        };
                    case A:
                        return function() {
                            return new n(this, e)
                        }
                }
                return function() {
                    return new n(this, e)
                }
            },
            x = t + " Iterator",
            I = m == A,
            k = !1,
            Y = e.prototype,
            C = Y[d] || Y[f] || m && Y[m],
            _ = C || E(m),
            P = m ? I ? E("entries") : _ : void 0,
            O = "Array" == t ? Y.entries || C : C;
        if (O && (S = u(O.call(new e)), S !== Object.prototype && S.next && (c(S, x, !0), o || "function" == typeof S[d] || a(S, d, g))), I && C && C.name !== A && (k = !0, _ = function() {
                return C.call(this)
            }), o && !b || !h && !k && Y[d] || a(Y, d, _), s[t] = _, s[x] = g, m)
            if (w = {
                    values: I ? _ : E(A),
                    keys: y ? _ : E(p),
                    entries: P
                }, b)
                for (T in w) T in Y || r(Y, T, w[T]);
            else i(i.P + i.F * (h || k), t, w);
        return w
    }
}, function(e, t) {
    e.exports = !0
}, function(e, t, n) {
    var o = n(16),
        i = n(17),
        r = n(18),
        a = n(20),
        s = n(30),
        l = "prototype",
        c = function(e, t, n) {
            var u, d, h, f = e & c.F,
                p = e & c.G,
                A = e & c.S,
                g = e & c.P,
                v = e & c.B,
                m = e & c.W,
                y = p ? i : i[t] || (i[t] = {}),
                b = y[l],
                w = p ? o : A ? o[t] : (o[t] || {})[l];
            p && (n = t);
            for (u in n) d = !f && w && void 0 !== w[u], d && s(y, u) || (h = d ? w[u] : n[u], y[u] = p && "function" != typeof w[u] ? n[u] : v && d ? r(h, o) : m && w[u] == h ? function(e) {
                var t = function(t, n, o) {
                    if (this instanceof e) {
                        switch (arguments.length) {
                            case 0:
                                return new e;
                            case 1:
                                return new e(t);
                            case 2:
                                return new e(t, n)
                        }
                        return new e(t, n, o)
                    }
                    return e.apply(this, arguments)
                };
                return t[l] = e[l], t
            }(h) : g && "function" == typeof h ? r(Function.call, h) : h, g && ((y.virtual || (y.virtual = {}))[u] = h, e & c.R && b && !b[u] && a(b, u, h)))
        };
    c.F = 1, c.G = 2, c.S = 4, c.P = 8, c.B = 16, c.W = 32, c.U = 64, c.R = 128, e.exports = c
}, function(e, t) {
    var n = e.exports = "undefined" != typeof window && window.Math == Math ? window : "undefined" != typeof self && self.Math == Math ? self : Function("return this")();
    "number" == typeof __g && (__g = n)
}, function(e, t) {
    var n = e.exports = {
        version: "2.6.12"
    };
    "number" == typeof __e && (__e = n)
}, function(e, t, n) {
    var o = n(19);
    e.exports = function(e, t, n) {
        if (o(e), void 0 === t) return e;
        switch (n) {
            case 1:
                return function(n) {
                    return e.call(t, n)
                };
            case 2:
                return function(n, o) {
                    return e.call(t, n, o)
                };
            case 3:
                return function(n, o, i) {
                    return e.call(t, n, o, i)
                }
        }
        return function() {
            return e.apply(t, arguments)
        }
    }
}, function(e, t) {
    e.exports = function(e) {
        if ("function" != typeof e) throw TypeError(e + " is not a function!");
        return e
    }
}, function(e, t, n) {
    var o = n(21),
        i = n(29);
    e.exports = n(25) ? function(e, t, n) {
        return o.f(e, t, i(1, n))
    } : function(e, t, n) {
        return e[t] = n, e
    }
}, function(e, t, n) {
    var o = n(22),
        i = n(24),
        r = n(28),
        a = Object.defineProperty;
    t.f = n(25) ? Object.defineProperty : function(e, t, n) {
        if (o(e), t = r(t, !0), o(n), i) try {
            return a(e, t, n)
        } catch (e) {}
        if ("get" in n || "set" in n) throw TypeError("Accessors not supported!");
        return "value" in n && (e[t] = n.value), e
    }
}, function(e, t, n) {
    var o = n(23);
    e.exports = function(e) {
        if (!o(e)) throw TypeError(e + " is not an object!");
        return e
    }
}, function(e, t) {
    e.exports = function(e) {
        return "object" == typeof e ? null !== e : "function" == typeof e
    }
}, function(e, t, n) {
    e.exports = !n(25) && !n(26)(function() {
        return 7 != Object.defineProperty(n(27)("div"), "a", {
            get: function() {
                return 7
            }
        }).a
    })
}, function(e, t, n) {
    e.exports = !n(26)(function() {
        return 7 != Object.defineProperty({}, "a", {
            get: function() {
                return 7
            }
        }).a
    })
}, function(e, t) {
    e.exports = function(e) {
        try {
            return !!e()
        } catch (e) {
            return !0
        }
    }
}, function(e, t, n) {
    var o = n(23),
        i = n(16).document,
        r = o(i) && o(i.createElement);
    e.exports = function(e) {
        return r ? i.createElement(e) : {}
    }
}, function(e, t, n) {
    var o = n(23);
    e.exports = function(e, t) {
        if (!o(e)) return e;
        var n, i;
        if (t && "function" == typeof(n = e.toString) && !o(i = n.call(e))) return i;
        if ("function" == typeof(n = e.valueOf) && !o(i = n.call(e))) return i;
        if (!t && "function" == typeof(n = e.toString) && !o(i = n.call(e))) return i;
        throw TypeError("Can't convert object to primitive value")
    }
}, function(e, t) {
    e.exports = function(e, t) {
        return {
            enumerable: !(1 & e),
            configurable: !(2 & e),
            writable: !(4 & e),
            value: t
        }
    }
}, function(e, t) {
    var n = {}.hasOwnProperty;
    e.exports = function(e, t) {
        return n.call(e, t)
    }
}, function(e, t, n) {
    e.exports = n(20)
}, function(e, t) {
    e.exports = {}
}, function(e, t, n) {
    "use strict";
    var o = n(34),
        i = n(29),
        r = n(49),
        a = {};
    n(20)(a, n(50)("iterator"), function() {
        return this
    }), e.exports = function(e, t, n) {
        e.prototype = o(a, {
            next: i(1, n)
        }), r(e, t + " Iterator")
    }
}, function(e, t, n) {
    var o = n(22),
        i = n(35),
        r = n(47),
        a = n(44)("IE_PROTO"),
        s = function() {},
        l = "prototype",
        c = function() {
            var e, t = n(27)("iframe"),
                o = r.length,
                i = "<",
                a = ">";
            for (t.style.display = "none", n(48).appendChild(t), t.src = "javascript:", e = t.contentWindow.document, e.open(), e.write(i + "script" + a + "document.F=Object" + i + "/script" + a), e.close(), c = e.F; o--;) delete c[l][r[o]];
            return c()
        };
    e.exports = Object.create || function(e, t) {
        var n;
        return null !== e ? (s[l] = o(e), n = new s, s[l] = null, n[a] = e) : n = c(), void 0 === t ? n : i(n, t)
    }
}, function(e, t, n) {
    var o = n(21),
        i = n(22),
        r = n(36);
    e.exports = n(25) ? Object.defineProperties : function(e, t) {
        i(e);
        for (var n, a = r(t), s = a.length, l = 0; s > l;) o.f(e, n = a[l++], t[n]);
        return e
    }
}, function(e, t, n) {
    var o = n(37),
        i = n(47);
    e.exports = Object.keys || function(e) {
        return o(e, i)
    }
}, function(e, t, n) {
    var o = n(30),
        i = n(38),
        r = n(41)(!1),
        a = n(44)("IE_PROTO");
    e.exports = function(e, t) {
        var n, s = i(e),
            l = 0,
            c = [];
        for (n in s) n != a && o(s, n) && c.push(n);
        for (; t.length > l;) o(s, n = t[l++]) && (~r(c, n) || c.push(n));
        return c
    }
}, function(e, t, n) {
    var o = n(39),
        i = n(12);
    e.exports = function(e) {
        return o(i(e))
    }
}, function(e, t, n) {
    var o = n(40);
    e.exports = Object("z").propertyIsEnumerable(0) ? Object : function(e) {
        return "String" == o(e) ? e.split("") : Object(e)
    }
}, function(e, t) {
    var n = {}.toString;
    e.exports = function(e) {
        return n.call(e).slice(8, -1)
    }
}, function(e, t, n) {
    var o = n(38),
        i = n(42),
        r = n(43);
    e.exports = function(e) {
        return function(t, n, a) {
            var s, l = o(t),
                c = i(l.length),
                u = r(a, c);
            if (e && n != n) {
                for (; c > u;)
                    if (s = l[u++], s != s) return !0
            } else
                for (; c > u; u++)
                    if ((e || u in l) && l[u] === n) return e || u || 0;
            return !e && -1
        }
    }
}, function(e, t, n) {
    var o = n(11),
        i = Math.min;
    e.exports = function(e) {
        return e > 0 ? i(o(e), 9007199254740991) : 0
    }
}, function(e, t, n) {
    var o = n(11),
        i = Math.max,
        r = Math.min;
    e.exports = function(e, t) {
        return e = o(e), e < 0 ? i(e + t, 0) : r(e, t)
    }
}, function(e, t, n) {
    var o = n(45)("keys"),
        i = n(46);
    e.exports = function(e) {
        return o[e] || (o[e] = i(e))
    }
}, function(e, t, n) {
    var o = n(17),
        i = n(16),
        r = "__core-js_shared__",
        a = i[r] || (i[r] = {});
    (e.exports = function(e, t) {
        return a[e] || (a[e] = void 0 !== t ? t : {})
    })("versions", []).push({
        version: o.version,
        mode: n(14) ? "pure" : "global",
        copyright: "© 2020 Denis Pushkarev (zloirock.ru)"
    })
}, function(e, t) {
    var n = 0,
        o = Math.random();
    e.exports = function(e) {
        return "Symbol(".concat(void 0 === e ? "" : e, ")_", (++n + o).toString(36))
    }
}, function(e, t) {
    e.exports = "constructor,hasOwnProperty,isPrototypeOf,propertyIsEnumerable,toLocaleString,toString,valueOf".split(",")
}, function(e, t, n) {
    var o = n(16).document;
    e.exports = o && o.documentElement
}, function(e, t, n) {
    var o = n(21).f,
        i = n(30),
        r = n(50)("toStringTag");
    e.exports = function(e, t, n) {
        e && !i(e = n ? e : e.prototype, r) && o(e, r, {
            configurable: !0,
            value: t
        })
    }
}, function(e, t, n) {
    var o = n(45)("wks"),
        i = n(46),
        r = n(16).Symbol,
        a = "function" == typeof r,
        s = e.exports = function(e) {
            return o[e] || (o[e] = a && r[e] || (a ? r : i)("Symbol." + e))
        };
    s.store = o
}, function(e, t, n) {
    var o = n(30),
        i = n(52),
        r = n(44)("IE_PROTO"),
        a = Object.prototype;
    e.exports = Object.getPrototypeOf || function(e) {
        return e = i(e), o(e, r) ? e[r] : "function" == typeof e.constructor && e instanceof e.constructor ? e.constructor.prototype : e instanceof Object ? a : null
    }
}, function(e, t, n) {
    var o = n(12);
    e.exports = function(e) {
        return Object(o(e))
    }
}, function(e, t, n) {
    "use strict";
    var o = n(18),
        i = n(15),
        r = n(52),
        a = n(54),
        s = n(55),
        l = n(42),
        c = n(56),
        u = n(57);
    i(i.S + i.F * !n(59)(function(e) {
        Array.from(e)
    }), "Array", {
        from: function(e) {
            var t, n, i, d, h = r(e),
                f = "function" == typeof this ? this : Array,
                p = arguments.length,
                A = p > 1 ? arguments[1] : void 0,
                g = void 0 !== A,
                v = 0,
                m = u(h);
            if (g && (A = o(A, p > 2 ? arguments[2] : void 0, 2)), void 0 == m || f == Array && s(m))
                for (t = l(h.length), n = new f(t); t > v; v++) c(n, v, g ? A(h[v], v) : h[v]);
            else
                for (d = m.call(h), n = new f; !(i = d.next()).done; v++) c(n, v, g ? a(d, A, [i.value, v], !0) : i.value);
            return n.length = v, n
        }
    })
}, function(e, t, n) {
    var o = n(22);
    e.exports = function(e, t, n, i) {
        try {
            return i ? t(o(n)[0], n[1]) : t(n)
        } catch (t) {
            var r = e.return;
            throw void 0 !== r && o(r.call(e)), t
        }
    }
}, function(e, t, n) {
    var o = n(32),
        i = n(50)("iterator"),
        r = Array.prototype;
    e.exports = function(e) {
        return void 0 !== e && (o.Array === e || r[i] === e)
    }
}, function(e, t, n) {
    "use strict";
    var o = n(21),
        i = n(29);
    e.exports = function(e, t, n) {
        t in e ? o.f(e, t, i(0, n)) : e[t] = n
    }
}, function(e, t, n) {
    var o = n(58),
        i = n(50)("iterator"),
        r = n(32);
    e.exports = n(17).getIteratorMethod = function(e) {
        if (void 0 != e) return e[i] || e["@@iterator"] || r[o(e)]
    }
}, function(e, t, n) {
    var o = n(40),
        i = n(50)("toStringTag"),
        r = "Arguments" == o(function() {
            return arguments
        }()),
        a = function(e, t) {
            try {
                return e[t]
            } catch (e) {}
        };
    e.exports = function(e) {
        var t, n, s;
        return void 0 === e ? "Undefined" : null === e ? "Null" : "string" == typeof(n = a(t = Object(e), i)) ? n : r ? o(t) : "Object" == (s = o(t)) && "function" == typeof t.callee ? "Arguments" : s
    }
}, function(e, t, n) {
    var o = n(50)("iterator"),
        i = !1;
    try {
        var r = [7][o]();
        r.return = function() {
            i = !0
        }, Array.from(r, function() {
            throw 2
        })
    } catch (e) {}
    e.exports = function(e, t) {
        if (!t && !i) return !1;
        var n = !1;
        try {
            var r = [7],
                a = r[o]();
            a.next = function() {
                return {
                    done: n = !0
                }
            }, r[o] = function() {
                return a
            }, e(r)
        } catch (e) {}
        return n
    }
}, function(e, t) {
    "use strict";
    t.__esModule = !0, t.default = function(e, t) {
        if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
    }
}, function(e, t, n) {
    "use strict";

    function o(e) {
        return e && e.__esModule ? e : {
            default: e
        }
    }
    t.__esModule = !0;
    var i = n(62),
        r = o(i);
    t.default = function() {
        function e(e, t) {
            for (var n = 0; n < t.length; n++) {
                var o = t[n];
                o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), (0, r.default)(e, o.key, o)
            }
        }
        return function(t, n, o) {
            return n && e(t.prototype, n), o && e(t, o), t
        }
    }()
}, function(e, t, n) {
    e.exports = {
        default: n(63),
        __esModule: !0
    }
}, function(e, t, n) {
    n(64);
    var o = n(17).Object;
    e.exports = function(e, t, n) {
        return o.defineProperty(e, t, n)
    }
}, function(e, t, n) {
    var o = n(15);
    o(o.S + o.F * !n(25), "Object", {
        defineProperty: n(21).f
    })
}, function(e, t) {
    "use strict";
    Object.defineProperty(t, "__esModule", {
        value: !0
    });
    t.checkForMutationObserver = function() {
        var e = window.MutationObserver || window.WebKitMutationObserver || window.MozMutationObserver;
        return e
    }, t.validateCallback = function(e) {
        if ("function" == typeof e) return e;
        var t = "Darwin must receive a callback function, or there is nothing to run when mutations occur.";
        throw new Error(t)
    }
}, function(e, t) {
    Y.namespace("Template").Gallery = Class.create({
        initialize: function(e) {
            return this.slides = e.slides, this.wrapper = e.wrapper, this.slides ? this.wrapper ? !(!Y.one(this.wrapper) || !Y.one(this.slides)) && (this.getTweaks(), this.bindUI(), void this.syncUI()) : (console.error("index-gallery.js: You have to define the wrapper selector."), !1) : (console.error("index-gallery.js: You have to define the slides selector."), !1)
        },
        bindUI: function() {
            if ("grid" == this.tweak.design) this.loadGridImages(), this.lightboxSet = [], Y.one(this.wrapper).all(this.slides).each(function(e) {
                var t = e.one(".sqs-video-wrapper"),
                    n = t ? e.one(".sqs-video-wrapper") : e.one("img"),
                    o = t ? null : e.one(".slide-meta-content") && e.one(".slide-meta-content").getHTML();
                this.lightboxSet.push({
                    content: n,
                    meta: o
                }), e.on("click", function(t) {
                    t.halt(), e.one(".clickthrough-link") ? (t.stopPropagation(), window.location = e.one(".clickthrough-link").getAttribute("href")) : (this.gallery && this.gallery.destroy(), this.gallery = new Y.Squarespace.Lightbox2({
                        controls: {
                            previous: !0,
                            next: !0
                        },
                        currentSetIndex: Y.one(this.wrapper).all(this.slides).indexOf(e),
                        set: this.lightboxSet
                    }), this.gallery.render())
                }, this)
            }, this);
            else {
                var e = !1;
                "auto" == this.tweak.aspect && (e = !0);
                var t = !1;
                this.tweak.autoplay === !0 && (t = !0), "fullscreen" == this.tweak.aspect && "slideshow" == this.tweak.design && this.fullscreen(), this.wrapper.generateID(), this.nodeID = "#" + this.wrapper.get("id"), this.galleryManager = [], this.gallery = new Y.Squarespace.Gallery2({
                    container: this.wrapper,
                    design: "stacked",
                    autoplay: t,
                    designOptions: {
                        autoHeight: e,
                        clickBehavior: "auto",
                        transition: this.tweak.transition
                    },
                    elements: {
                        controls: this.nodeID + " ~ .circles",
                        next: this.nodeID + " ~ .next-slide",
                        previous: this.nodeID + " ~ .previous-slide"
                    },
                    historyHash: !1,
                    keyboard: !1,
                    lazyLoad: !0,
                    loaderOptions: {
                        mode: "fill"
                    },
                    loop: "true",
                    refreshOnResize: !0,
                    slides: this.slides
                }), Y.one(this.wrapper).delegate("click", function(e) {
                    e.halt(), e.currentTarget.ancestor(this.slides).toggleClass("hide-meta")
                }, ".hide-meta-toggle"), this.galleryManager.push(this.gallery), this.keyboardControls()
            }
        },
        syncUI: function() {
            Y.Template.helper.on("resizeend", function() {
                "grid" == this.tweak.design && this.loadGridImages(), Y.UA.touchEnabled || "fullscreen" != this.tweak.aspect || "slideshow" != this.tweak.design || this.fullscreen()
            }, this), Y.Global.on("tweak:reset", this.refresh, this), Y.Global.on("tweak:change", function(e) {
                var t = e.getName();
                "grid-aspect-ratio" != t && "slideshow-aspect-ratio" != t && "design" != t && "gallery-controls" != t && "slideshow-transition" != t && "slideshow-autoplay" != t || this.refresh(), "grid-aspect-ratio" != t && "slideshow-aspect-ratio" != t && "design" != t && "grid-max-columns" != t || Y.one(window).simulate("resize")
            }, this)
        },
        getTweaks: function() {
            this.tweak = {
                aspect: this.getTweakValue("slideshow-aspect-ratio"),
                design: this.getTweakValue("design"),
                nav: this.getTweakValue("gallery-controls"),
                transition: this.getTweakValue("slideshow-transition"),
                autoplay: this.getTweakValue("slideshow-autoplay")
            }
        },
        getTweakValue: function(e) {
            var t = Y.Squarespace.Template.getTweakValue(e);
            return Y.Lang.isString(t) && (t = t.toLowerCase()), "true" === t ? t = !0 : "false" === t && (t = !1), t
        },
        keyboardControls: function() {
            Y.one(window).on("keyup", function(e) {
                Y.all(this.wrapper).each(function(t, n) {
                    if (t.inViewportRegion() && (37 == e.keyCode || 39 == e.keyCode)) {
                        var o = 1;
                        37 == e.keyCode && (o = -1), this.galleryManager[n].set("currentIndex", this.galleryManager[n].get("currentIndex") + o)
                    }
                }, this)
            }, this)
        },
        fullscreen: function() {
            "none" == Y.one("#header .mobile-nav-toggle-label").getComputedStyle("display") ? this.mobileNavShowing = !1 : this.mobileNavShowing = !0, Y.all(this.wrapper).each(function(e) {
                this.mobileNavShowing ? e.setStyle("height", Y.config.win.innerHeight) : Y.one("#siteWrapper #content .index-section.gallery:first-child") && Y.one("#showOnScrollWrapper #mainNavWrapper") ? (e.setStyle("height", Y.config.win.innerHeight - Y.one("#showOnScrollWrapper #mainNavWrapper").get("clientHeight")), Y.one("#siteWrapper #content .index-section.gallery:first-child .gallery-wrapper").setStyle("height", Y.config.win.innerHeight)) : Y.one("#showOnScrollWrapper #mainNavWrapper") ? e.setStyle("height", Y.config.win.innerHeight - Y.one("#showOnScrollWrapper #mainNavWrapper").get("clientHeight")) : e.setStyle("height", Y.config.win.innerHeight)
            }, this)
        },
        loadGridImages: function() {
            Y.one(this.wrapper).all(this.slides).each(function(e) {
                e.one(".sqs-video-wrapper") ? e.one(".sqs-video-wrapper").plug(Y.Squarespace.VideoLoader, {
                    mode: "fill"
                }) : ImageLoader.load(e.one("img"), {
                    load: !0,
                    mode: "fill"
                })
            }, this)
        },
        destroy: function() {
            Y.all(this.wrapper).each(function(e) {
                e.detachAll(), e.removeAttribute("style")
            }, this), Y.all(this.slides).each(function(e) {
                e.detachAll(), e.removeAttribute("style")
            }, this), this.gallery && this.gallery.destroy()
        },
        refresh: function() {
            this.destroy(), this.getTweaks(), this.bindUI()
        }
    })
}, function(e, t, n) {
    var o = n(68);
    Y.use("node", "event-custom", function() {
        Y.namespace("Template").helper = Singleton.create({
            ready: function() {
                Y.on("domready", function() {
                    this.bindUI()
                }, this), Y.augment(this, Y.EventTarget, !0, null, {
                    emitFacade: !0
                })
            },
            bindUI: function() {
                this.dataToggleBody(), this.dataToggleEl(), this.dataLightbox(), "android" === Y.UA.os && (Y.UA.android < 5 || "ffos" === Y.UA.mobile) ? window.matchMedia("(orientation: portrait)").addListener(function() {
                    this.imgLoad(), this.fire("resizeend")
                }) : Y.one(window).on(["resize", "orientationchange"], function() {
                    this._resize && this._resize.cancel(), this._resize = Y.later(150, this, function() {
                        this.imgLoad(), this.fire("resizeend")
                    })
                }, this), this.imgLoad()
            },
            radioCheckboxes: function(e, t, n) {
                return e ? Y.one(e) ? (t = t || '[type="checkbox"]', n = n || "label[for]", void(Y.one(e).all(t).size() > 1 && Y.one(e).delegate("click", function(n) {
                    n.preventDefault();
                    var o = Y.one("#" + n.currentTarget.getAttribute("for"));
                    o.get("checked") === !1 ? (Y.one(e).all(t).each(function(e) {
                        e.set("checked", !1)
                    }), o.set("checked", !0)) : o.set("checked", !1)
                }, n))) : void console.warn("radioCheckboxes: No wrapper found on page.") : void console.warn("radioCheckboxes: Must define a wrapper.")
            },
            folderRedirect: function(e, t) {
                e = e || "label[for]", t = t || "body", Y.one(e) && !Y.one(".touch-styles") && Y.one(t).delegate("click", function(e) {
                    e.preventDefault();
                    var t = e.currentTarget.getData("href");
                    t ? window.location = t : console.warn("folderRedirect: You must add a data-href attribute to the label.")
                }, e)
            },
            dataLightbox: function() {
                var e = {};
                Y.all("[data-lightbox]").each(function(t) {
                    var n = t.getAttribute("data-lightbox");
                    e[n] = e[n] || new Array, e[n].push({
                        content: t,
                        meta: t.getAttribute("alt")
                    }), t.on("click", function(o) {
                        o.halt(), new Y.Squarespace.Lightbox2({
                            set: e[n],
                            currentSetIndex: Y.all("[data-lightbox]").indexOf(t),
                            controls: {
                                previous: !0,
                                next: !0
                            }
                        }).render()
                    })
                })
            },
            dataToggleBody: function() {
                Y.one("body").delegate("click", function(e) {
                    Y.one("body").toggleClass(e.currentTarget.getData("toggle-body"))
                }, "[data-toggle-body]")
            },
            dataToggleEl: function() {
                Y.one("body").delegate("click", function(e) {
                    var t = e.currentTarget;
                    t.toggleClass(t.getData("toggle"))
                }, "[data-toggle]")
            },
            imgLoad: function(e) {
                e = e || "img[data-src]", Y.all(e).each(function(e) {
                    ImageLoader.load(e)
                })
            },
            scrollAnchors: function() {
                if (!history.pushState) return !1;
                var e = 'a[href*="#"]';
                Y.one("body").delegate("click", function(e) {
                    var t = e.currentTarget.get("href"),
                        n = this._getSamePageHash(t);
                    n && Y.one(n) && (e.halt(), Y.Template.Site.mobileNav && Y.one("#mobileNavToggle").set("checked", !1).simulate("change"), this.smoothScrollTo(Y.one(n).getY()), history.pushState({}, n, n))
                }, e, this)
            },
            _getSamePageHash: function(e) {
                var e = new o(e),
                    t = new o(window.location.href);
                return e.host !== t.host || e.pathname !== t.pathname || "" === e.hash ? null : e.hash
            },
            smoothScrollTo: function(e) {
                if (NaN == parseInt(e)) return console.warn("helpers.js: smoothScrollTo must have a scroll point passed to it."), !1;
                if (!Y.Lang.isNumber(e)) try {
                    e = parseInt(e)
                } catch (e) {
                    return console.warn("helpers.js: scrollTo was passed an invalid argument."), !1
                }
                if (Y.UA.mobile) window.scroll(0, e);
                else {
                    var t = Y.UA.gecko || Y.UA.ie || navigator.userAgent.match(/Trident.*rv.11\./) ? "html" : "body",
                        n = new Y.Anim({
                            node: Y.one(document.scrollingElement || t),
                            to: {
                                scrollTop: e
                            },
                            duration: .4,
                            easing: "easeOut"
                        });
                    n.run(), n.on("end", function() {
                        n.destroy()
                    })
                }
            },
            disableScroll: function(e) {
                if (!Y.Lang.isString(e)) return console.warn("helpers.js: disableScroll arg must be a string."), !1;
                var t = Y.config.win.scrollY;
                Y.one(window).on("scroll", function() {
                    Y.one("body").hasClass(e) ? window.scrollTo(0, t) : t = Y.config.win.scrollY
                }, this)
            },
            centerMapPin: function(e, t) {
                var n = e._node.__map;
                if (!n) return console.error("helpers.js: Invalid argument passed to centerMapPin method."), !1;
                var o = n.getCenter();
                o.d = t.location.mapLat, o.e = t.location.mapLng, google.maps.event.trigger(n, "resize"), n.setCenter(o)
            }
        })
    })
}, function(e, t, n) {
    (function(t) {
        "use strict";

        function o(e) {
            return (e ? e : "").toString().replace(f, "")
        }

        function i(e) {
            var n;
            n = "undefined" != typeof window ? window : "undefined" != typeof t ? t : "undefined" != typeof self ? self : {};
            var o = n.location || {};
            e = e || o;
            var i, r = {},
                a = typeof e;
            if ("blob:" === e.protocol) r = new l(unescape(e.pathname), {});
            else if ("string" === a) {
                r = new l(e, {});
                for (i in b) delete r[i]
            } else if ("object" === a) {
                for (i in e) i in b || (r[i] = e[i]);
                void 0 === r.slashes && (r.slashes = A.test(e.href))
            }
            return r
        }

        function r(e) {
            return "file:" === e || "ftp:" === e || "http:" === e || "https:" === e || "ws:" === e || "wss:" === e
        }

        function a(e, t) {
            e = o(e), e = e.replace(p, ""), t = t || {};
            var n, i = v.exec(e),
                a = i[1] ? i[1].toLowerCase() : "",
                s = !!i[2],
                l = !!i[3],
                c = 0;
            return s ? l ? (n = i[2] + i[3] + i[4], c = i[2].length + i[3].length) : (n = i[2] + i[4], c = i[2].length) : l ? (n = i[3] + i[4], c = i[3].length) : n = i[4], "file:" === a ? c >= 2 && (n = n.slice(2)) : r(a) ? n = i[4] : a ? s && (n = n.slice(2)) : c >= 2 && r(t.protocol) && (n = i[4]), {
                protocol: a,
                slashes: s || r(a),
                slashesCount: c,
                rest: n
            }
        }

        function s(e, t) {
            if ("" === e) return t;
            for (var n = (t || "/").split("/").slice(0, -1).concat(e.split("/")), o = n.length, i = n[o - 1], r = !1, a = 0; o--;) "." === n[o] ? n.splice(o, 1) : ".." === n[o] ? (n.splice(o, 1), a++) : a && (0 === o && (r = !0), n.splice(o, 1), a--);
            return r && n.unshift(""), "." !== i && ".." !== i || n.push(""), n.join("/")
        }

        function l(e, t, n) {
            if (e = o(e), e = e.replace(p, ""), !(this instanceof l)) return new l(e, t, n);
            var c, u, f, A, g, v, b = y.slice(),
                w = typeof t,
                T = this,
                S = 0;
            for ("object" !== w && "string" !== w && (n = t, t = null), n && "function" != typeof n && (n = h.parse), t = i(t), u = a(e || "", t), c = !u.protocol && !u.slashes, T.slashes = u.slashes || c && t.slashes, T.protocol = u.protocol || t.protocol || "", e = u.rest, ("file:" === u.protocol && (2 !== u.slashesCount || m.test(e)) || !u.slashes && (u.protocol || u.slashesCount < 2 || !r(T.protocol))) && (b[3] = [/(.*)/, "pathname"]); S < b.length; S++) A = b[S], "function" != typeof A ? (f = A[0], v = A[1], f !== f ? T[v] = e : "string" == typeof f ? (g = "@" === f ? e.lastIndexOf(f) : e.indexOf(f), ~g && ("number" == typeof A[2] ? (T[v] = e.slice(0, g), e = e.slice(g + A[2])) : (T[v] = e.slice(g), e = e.slice(0, g)))) : (g = f.exec(e)) && (T[v] = g[1], e = e.slice(0, g.index)), T[v] = T[v] || (c && A[3] ? t[v] || "" : ""), A[4] && (T[v] = T[v].toLowerCase())) : e = A(e, T);
            n && (T.query = n(T.query)), c && t.slashes && "/" !== T.pathname.charAt(0) && ("" !== T.pathname || "" !== t.pathname) && (T.pathname = s(T.pathname, t.pathname)), "/" !== T.pathname.charAt(0) && r(T.protocol) && (T.pathname = "/" + T.pathname), d(T.port, T.protocol) || (T.host = T.hostname, T.port = ""), T.username = T.password = "", T.auth && (g = T.auth.indexOf(":"), ~g ? (T.username = T.auth.slice(0, g), T.username = encodeURIComponent(decodeURIComponent(T.username)), T.password = T.auth.slice(g + 1), T.password = encodeURIComponent(decodeURIComponent(T.password))) : T.username = encodeURIComponent(decodeURIComponent(T.auth)), T.auth = T.password ? T.username + ":" + T.password : T.username), T.origin = "file:" !== T.protocol && r(T.protocol) && T.host ? T.protocol + "//" + T.host : "null",
                T.href = T.toString()
        }

        function c(e, t, n) {
            var o = this;
            switch (e) {
                case "query":
                    "string" == typeof t && t.length && (t = (n || h.parse)(t)), o[e] = t;
                    break;
                case "port":
                    o[e] = t, d(t, o.protocol) ? t && (o.host = o.hostname + ":" + t) : (o.host = o.hostname, o[e] = "");
                    break;
                case "hostname":
                    o[e] = t, o.port && (t += ":" + o.port), o.host = t;
                    break;
                case "host":
                    o[e] = t, g.test(t) ? (t = t.split(":"), o.port = t.pop(), o.hostname = t.join(":")) : (o.hostname = t, o.port = "");
                    break;
                case "protocol":
                    o.protocol = t.toLowerCase(), o.slashes = !n;
                    break;
                case "pathname":
                case "hash":
                    if (t) {
                        var i = "pathname" === e ? "/" : "#";
                        o[e] = t.charAt(0) !== i ? i + t : t
                    } else o[e] = t;
                    break;
                case "username":
                case "password":
                    o[e] = encodeURIComponent(t);
                    break;
                case "auth":
                    var a = t.indexOf(":");
                    ~a ? (o.username = t.slice(0, a), o.username = encodeURIComponent(decodeURIComponent(o.username)), o.password = t.slice(a + 1), o.password = encodeURIComponent(decodeURIComponent(o.password))) : o.username = encodeURIComponent(decodeURIComponent(t))
            }
            for (var s = 0; s < y.length; s++) {
                var l = y[s];
                l[4] && (o[l[1]] = o[l[1]].toLowerCase())
            }
            return o.auth = o.password ? o.username + ":" + o.password : o.username, o.origin = "file:" !== o.protocol && r(o.protocol) && o.host ? o.protocol + "//" + o.host : "null", o.href = o.toString(), o
        }

        function u(e) {
            e && "function" == typeof e || (e = h.stringify);
            var t, n = this,
                o = n.host,
                i = n.protocol;
            i && ":" !== i.charAt(i.length - 1) && (i += ":");
            var a = i + (n.protocol && n.slashes || r(n.protocol) ? "//" : "");
            return n.username ? (a += n.username, n.password && (a += ":" + n.password), a += "@") : n.password ? (a += ":" + n.password, a += "@") : "file:" !== n.protocol && r(n.protocol) && !o && "/" !== n.pathname && (a += "@"), (":" === o[o.length - 1] || g.test(n.hostname) && !n.port) && (o += ":"), a += o + n.pathname, t = "object" == typeof n.query ? e(n.query) : n.query, t && (a += "?" !== t.charAt(0) ? "?" + t : t), n.hash && (a += n.hash), a
        }
        var d = n(69),
            h = n(70),
            f = /^[\x00-\x20\u00a0\u1680\u2000-\u200a\u2028\u2029\u202f\u205f\u3000\ufeff]+/,
            p = /[\n\r\t]/g,
            A = /^[A-Za-z][A-Za-z0-9+-.]*:\/\//,
            g = /:\d+$/,
            v = /^([a-z][a-z0-9.+-]*:)?(\/\/)?([\\/]+)?([\S\s]*)/i,
            m = /^[a-zA-Z]:/,
            y = [
                ["#", "hash"],
                ["?", "query"],
                function(e, t) {
                    return r(t.protocol) ? e.replace(/\\/g, "/") : e
                },
                ["/", "pathname"],
                ["@", "auth", 1],
                [NaN, "host", void 0, 1, 1],
                [/:(\d*)$/, "port", void 0, 1],
                [NaN, "hostname", void 0, 1, 1]
            ],
            b = {
                hash: 1,
                query: 1
            };
        l.prototype = {
            set: c,
            toString: u
        }, l.extractProtocol = a, l.location = i, l.trimLeft = o, l.qs = h, e.exports = l
    }).call(t, function() {
        return this
    }())
}, function(e, t) {
    "use strict";
    e.exports = function(e, t) {
        if (t = t.split(":")[0], e = +e, !e) return !1;
        switch (t) {
            case "http":
            case "ws":
                return 80 !== e;
            case "https":
            case "wss":
                return 443 !== e;
            case "ftp":
                return 21 !== e;
            case "gopher":
                return 70 !== e;
            case "file":
                return !1
        }
        return 0 !== e
    }
}, function(e, t) {
    "use strict";

    function n(e) {
        try {
            return decodeURIComponent(e.replace(/\+/g, " "))
        } catch (e) {
            return null
        }
    }

    function o(e) {
        try {
            return encodeURIComponent(e)
        } catch (e) {
            return null
        }
    }

    function i(e) {
        for (var t, o = /([^=?#&]+)=?([^&]*)/g, i = {}; t = o.exec(e);) {
            var r = n(t[1]),
                a = n(t[2]);
            null === r || null === a || r in i || (i[r] = a)
        }
        return i
    }

    function r(e, t) {
        t = t || "";
        var n, i, r = [];
        "string" != typeof t && (t = "?");
        for (i in e)
            if (s.call(e, i)) {
                if (n = e[i], n || null !== n && n !== a && !isNaN(n) || (n = ""), i = o(i), n = o(n), null === i || null === n) continue;
                r.push(i + "=" + n)
            }
        return r.length ? t + r.join("&") : ""
    }
    var a, s = Object.prototype.hasOwnProperty;
    t.stringify = r, t.parse = i
}, function(e, t, n) {
    var o = n(72),
        i = n(74).VideoBackground,
        r = n(74).getVideoProps,
        a = n(90);
    Y.use("node", function(e) {
        e.namespace("Template").Site = Singleton.create({
            ready: function() {
                this.regularHeaderForGridGallery(), e.on("domready", function() {
                    this.init()
                }, this)
            },
            init: function() {
                this.setupUserAccountLinks(), this.cartState(), e.one(".index-section .index-section-image") && this.fadeInFirstIndexSectionImageOnLoad(), this.transparentHeaderPadding(), this.textShrink("#siteTitle a", "#siteTitle"), this.textShrink(".index-gallery .slide-meta-content .title", ".index-gallery .slide-meta-content"), this.textShrink(".index-section-wrapper.has-main-media .sqs-block-content h1", ".index-section-wrapper.has-main-media .sqs-block-content"), this.textShrink(".banner-thumbnail-wrapper .desc-wrapper h1", ".banner-thumbnail-wrapper .desc-wrapper"), this.textShrink(".quote-block figure", ".sqs-block.quote-block"), this.textShrink(".page-description p", ".page-description"), this.getVariables(), this.wrapper = e.Node.create('<div class="show-on-scroll-wrapper" id="showOnScrollWrapper"></div>'), this.injectScrollNavContent(), this.syncUI(), this.bindUI(), e.one(".always-use-overlay-nav") || e.config.win.innerWidth <= 768 ? (e.Template.helper.radioCheckboxes("#mainNavigation"), e.Template.helper.radioCheckboxes("#mobileNavigation")) : (e.Template.helper.folderRedirect("#headerNav .folder-toggle-label"), e.Template.helper.folderRedirect("#showOnScrollWrapper .folder-toggle-label"), e.Template.helper.folderRedirect("#footer .folder-toggle-label"));
                var t = Array.prototype.slice.call(document.body.querySelectorAll("div.sqs-video-background"));
                t.map(function(e) {
                    return new i(r(e))
                })
            },
            setupUserAccountLinks: function() {
                e.all(".user-account-link").each(function(e) {
                    var t = o.isUserAuthenticated() ? ".unauth" : ".auth",
                        n = e.one(t);
                    n.remove(), e.on("click", function(e) {
                        e.preventDefault(), o.openAccountScreen()
                    })
                })
            },
            fadeInFirstIndexSectionImageOnLoad: function() {
                if (e.one(".index-section-image img")) {
                    var t = e.one(".index-section-image img"),
                        n = t.getAttribute("src");
                    if (n) {
                        var o = new Image;
                        o.onload = function() {
                            this.addClass("loaded")
                        }.bind(t), o.src = n
                    } else ImageLoader.load(t.removeAttribute("data-load")), t.addClass("loaded")
                }
            },
            mutationObserver: function(t, n, o) {
                var i = window.MutationObserver || window.WebKitMutationObserver || window.MozMutationObserver;
                if (i) {
                    var r = new i(o);
                    r.observe(t, n);
                    var a = e.later(15e3, this, function() {
                        r.disconnect(), a.cancel()
                    })
                } else o(null, null)
            },
            bindUI: function() {
                this.mutationObserver(e.one("#siteWrapper").getDOMNode(), {
                    childList: !0,
                    subtree: !0
                }, this.mutationCallback), e.one(window).on("resize", function() {
                    this.getVariables(), this.syncUI(), e.Template.noYUI.vCenterTopSectionContent()
                }, this), e.Squarespace.Singletons.ShoppingCart.on("change", e.Template.Site.cartState), this.disableScroll(), e.Template.helper.on("resizeend", function() {
                    e.all(".map-block[data-block-json]").each(function(t) {
                        e.Template.helper.centerMapPin(t.one(".page-map"), JSON.parse(t.getData("block-json")))
                    })
                }), e.one("#mobileNavToggle").on("change", function(t) {
                    t.target.get("checked") === !1 && e.all("#overlayNav input.folder-toggle-box").set("checked", !1).each(function(e) {
                        e.simulate("change")
                    })
                }), e.one(".collection-type-index") && (e.all(".index-gallery").each(function(t) {
                    new e.Template.Gallery({
                        wrapper: t.one(".gallery-wrapper"),
                        slides: ".slide-wrapper"
                    })
                }), e.one(".collection-type-index.homepage") && new e.Template.RevealOnScroll({
                    el: "#showOnScrollWrapper",
                    offsetEl: ".index-section-wrapper",
                    behavior: "bottom"
                })), e.one(".index-section-image img") && e.all(".index-section-image img").length >= 2 ? this.lazyload ? this.lazyload.refresh() : this.lazyload = new e.Template.Lazyload({
                    el: ".index-section-image img",
                    mobile: !1,
                    loadEvent: "throttle"
                }) : e.all(".index-section-image img").each(function(e) {
                    ImageLoader.load(e.removeAttribute("data-load"))
                }), this.scrollNav(), this.altSections(e.all(".index-section.no-main-image")), e.Template.helper.scrollAnchors()
            },
            syncUI: function() {
                this.runCenterNav(), this.overlayNavPadding(), this.folderEdgeDetection(), e.Template.helper.on("resizeend", this.scrollNav, this), e.Template.helper.on("resizeend", this.injectScrollNavContent(), this), e.one(".collection-type-index.homepage") ? (this.scrollNavHeight = e.one("#showOnScrollWrapper #mainNavWrapper") ? e.one("#showOnScrollWrapper #mainNavWrapper").get("clientHeight") : 0, e.all(this.navLinks).each(function(t) {
                    t.on("click", function(n) {
                        window.location.hash && history.pushState("", document.title, window.location.pathname), n.halt();
                        var o, i = t.getAttribute("href");
                        "/" === i.charAt(0) && (i = i.substr(2)), document.getElementById(i) && (o = this.mobileNav ? document.getElementById(i).getBoundingClientRect().top + window.scrollY + 1 : document.getElementById(i).getBoundingClientRect().top + window.scrollY - this.scrollNavHeight + 1, this.mobileNav ? (e.one("#mobileNavToggle").set("checked", !1).simulate("change"), e.later(400, this, function() {
                            e.Template.helper.smoothScrollTo(o)
                        })) : e.Template.helper.smoothScrollTo(o))
                    }, this)
                }, this)) : this.mobileNav && e.all(this.navLinks).each(function(t) {
                    t.on("click", function(t) {
                        e.one("#mobileNavToggle").set("checked", !1).simulate("change")
                    }, this)
                }, this)
            },
            mutationCallback: function(t, n) {
                if (t)
                    for (var o = 0; o < t.length; o++) {
                        var i = Array.prototype.slice.call(t[o].addedNodes);
                        i.unshift(t[o].target);
                        for (var r = 0; r < i.length; r++) {
                            var a = e.Node(i[r]);
                            if (a.ancestor(".index-section-wrapper.has-main-media")) {
                                var s = a.ancestor(".index-section-wrapper").one(".index-section-image img");
                                s && ImageLoader.load(s)
                            }
                            if (window.location.hash) {
                                var l = window.location.hash;
                                "/" === l.charAt(0) && (l = l.substr(1)), e.one(l) && e.one(window).set("scrollTop", e.one(l).getY() + 1)
                            }
                        }
                    } else e.on("io:end", function(t) {
                        var n = e.later(1200, this, function() {
                            e.all(".index-section-image img").each(function(e) {
                                ImageLoader.load(e)
                            }), n.cancel()
                        })
                    })
            },
            getVariables: function() {
                this.headerHeight = e.one("#header").get("offsetHeight"), this.mobileNav = e.one(".always-use-overlay-nav") || e.config.win.innerWidth <= 768, this.navLinks = ".nav-wrapper .index.home a", "none" == e.one("#header .mobile-nav-toggle-label").getComputedStyle("display") ? this.mobileNavShowing = !1 : this.mobileNavShowing = !0
            },
            scrollNav: function() {
                if (e.one(".collection-type-index.homepage") && e.one("#header #mainNavWrapper") && e.one(".index.home")) {
                    var t = e.all(".index-section:not(.gallery)"),
                        n = this.mobileNavShowing ? e.all("#mobileNavWrapper .index.home") : e.all("#showOnScrollWrapper #mainNavigation .index.home"),
                        o = 0,
                        i = 0,
                        r = this.mobileNavShowing ? 0 : e.one("#showOnScrollWrapper #mainNavWrapper").get("clientHeight") + 1,
                        s = e.bind(function() {
                            t.each(function(t, n) {
                                n = n++, t.getY() < e.config.win.scrollY + r && (o = n)
                            }, this), e.config.win.scrollY + e.config.win.innerHeight >= e.one("body").get("clientHeight") ? (n.item(n.size() - 1).addClass("active"), o = n.size() - 1) : n.item(o).addClass("active"), o != i && (n.item(i).removeClass("active"), i = o)
                        }, this),
                        l = e.throttle(s, 200);
                    e.one(window).on("scroll", l), e.one(window).on("scroll", function() {
                        a(s, e.Template.Site, 200)
                    })
                }
            },
            cartState: function() {
                var t = e.Squarespace.Singletons.ShoppingCart.get("totalQuantity"),
                    n = e.one(".custom-cart");
                n && (t && t > 0 ? n.removeClass("empty") : n.hasClass("empty") || n.addClass("empty"))
            },
            disableScroll: function() {
                var t = e.one("#mobileNavToggle");
                t.on("change", function() {
                    t.get("checked") === !0 ? e.one("body").addClass("disable-scroll") : e.one("body").removeClass("disable-scroll")
                }), e.Template.helper.disableScroll("disable-scroll")
            },
            textShrink: function(t, n) {
                e.one(t) && e.one(t).ancestor(n) && e.all(t).each(function(t) {
                    t.plug(e.Squarespace.TextShrink, {
                        parentEl: t.ancestor(n)
                    })
                })
            },
            regularHeaderForGridGallery: function() {
                e.one(".collection-type-index.design-grid.has-banner-image") && e.one("#page #content .index-section:first-child .index-section-wrapper .gallery-content") ? e.one("body").removeClass("has-banner-image") : e.one(".collection-type-index.design-slideshow:not(.has-banner-image)") && e.one("#page #content .index-section:first-child .index-section-wrapper .gallery-content") && e.one("body").addClass("has-banner-image")
            },
            fadeIn: function(t) {
                e.one(t) && e.one(t).hasClass("tmpl-loading") && e.all(t).each(function(e) {
                    e.removeClass("tmpl-loading").addClass("tmpl-loaded")
                })
            },
            runCenterNav: function() {
                if (e.one("body:not(.always-use-overlay-nav)")) {
                    var t = "#header #mainNavigation > div";
                    e.one(".index.home") && (t = "#header #mainNavigation > div:not(.home)", e.one(".expand-homepage-index-links") && (t = "#header #mainNavigation > div:not(.base)")), new e.Template.CenterNav({
                        navItems: t,
                        centerEl: "#header .title-logo-wrapper h1",
                        wrapper: "#header",
                        innerWrapper: "#header #headerNav"
                    })
                }
            },
            overlayNavPadding: function() {
                e.config.win.innerWidth > 640 && e.one("#overlayNav #mainNavWrapper") && e.one("#overlayNav #mobileNavWrapper").setStyles({
                    paddingTop: this.headerHeight,
                    paddingBottom: this.headerHeight
                })
            },
            folderEdgeDetection: function() {
                e.all(".subnav").each(function(t) {
                    var n = e.config.win.innerWidth;
                    n - t.getX() <= t.get("offsetWidth") && t.addClass("right-align")
                })
            },
            transparentHeaderPadding: function() {
                var t = e.one("#header").getComputedStyle("position"),
                    n = (e.one("#header .header-inner h1").get("offsetHeight") + parseInt(e.one("#header .header-inner").getComputedStyle("paddingTop"), 10)) / 2;
                if ("absolute" == t && e.one(".main-content .index-section:first-child .index-section-wrapper.has-main-media"));
                else if ("absolute" == t && e.one("body.has-banner-image")) {
                    e.one(".banner-thumbnail-wrapper .desc-wrapper") && e.one(".banner-thumbnail-wrapper .desc-wrapper").setStyle("paddingTop", n);
                    var o = setInterval(function() {
                        document.querySelector("#thumbnail img") && document.querySelector("#thumbnail img").clientHeight != document.querySelector("#thumbnail").clientHeight ? e.all('.banner-thumbnail-wrapper img[data-load="false"]').each(function(e) {
                            ImageLoader.load(e.removeAttribute("data-load"))
                        }) : clearInterval(o)
                    }, 100)
                } else e.all('.banner-thumbnail-wrapper img[data-load="false"]').each(function(e) {
                    ImageLoader.load(e.removeAttribute("data-load"))
                })
            },
            injectScrollNavContent: function() {
                e.one(".collection-type-index.homepage") && e.one("#header #mainNavWrapper") && (e.one("#showOnScrollWrapper") && e.one("#showOnScrollWrapper").empty(), this.fixedEl = this.mobileNav ? ".show-on-scroll-mobile" : ".show-on-scroll", e.one("#mobileNavToggle").insert(this.wrapper.setHTML(e.one(this.fixedEl).get("outerHTML")), "after"), ".show-on-scroll" == this.fixedEl && e.all("#showOnScrollWrapper #mainNavWrapper nav div").removeAttribute("style"))
            },
            altSections: function(e) {
                e.each(function(e) {
                    e.get("nextElementSibling") && e.get("nextElementSibling").hasClass("index-section.no-main-image") && !e.hasClass("alt-section") && e.get("nextElementSibling").addClass("alt-section")
                })
            }
        })
    })
}, function(e, t, n) {
    "use strict";
    Object.defineProperty(t, "__esModule", {
        value: !0
    }), t.default = void 0;
    var o = n(73),
        i = "UserAccounts API not available",
        r = function() {
            console.warn(i)
        },
        a = function() {
            var e, t, n;
            return null !== (e = null === (t = window) || void 0 === t ? void 0 : null === (n = t[o.USER_ACCOUNT_API]) || void 0 === n ? void 0 : n[o.IS_USER_AUTHENTICATED]()) && void 0 !== e ? e : r()
        },
        s = function() {
            var e, t, n;
            return null !== (e = null === (t = window) || void 0 === t ? void 0 : null === (n = t[o.USER_ACCOUNT_API]) || void 0 === n ? void 0 : n[o.OPEN_ACCOUNT_SCREEN]()) && void 0 !== e ? e : r()
        },
        l = {
            isUserAuthenticated: a,
            openAccountScreen: s
        };
    t.default = l, e.exports = t.default
}, function(e, t) {
    "use strict";
    Object.defineProperty(t, "__esModule", {
        value: !0
    }), t.OPEN_ACCOUNT_SCREEN = t.IS_USER_AUTHENTICATED = t.USER_ACCOUNT_API = void 0;
    var n = "UserAccountApi";
    t.USER_ACCOUNT_API = n;
    var o = "isUserAuthenticated";
    t.IS_USER_AUTHENTICATED = o;
    var i = "openAccountScreen";
    t.OPEN_ACCOUNT_SCREEN = i
}, function(e, t, n) {
    var o = n(75).VideoBackground,
        i = n(89);
    e.exports = {
        VideoBackground: o,
        getVideoProps: i
    }
}, function(e, t, n) {
    "use strict";
    Object.defineProperty(t, "__esModule", {
        value: !0
    }), t.videoAutoplayTest = t.VideoFilterPropertyValues = t.VideoBackground = void 0, n(76);
    var o = n(77);
    t.VideoBackground = o.VideoBackground, t.VideoFilterPropertyValues = o.VideoFilterPropertyValues, t.videoAutoplayTest = o.videoAutoplayTest
}, function(e, t) {
    ! function() {
        function e(e, t) {
            t = t || {
                bubbles: !1,
                cancelable: !1,
                detail: void 0
            };
            var n = document.createEvent("CustomEvent");
            return n.initCustomEvent(e, t.bubbles, t.cancelable, t.detail), n
        }
        return "function" != typeof window.CustomEvent && (e.prototype = window.Event.prototype, void(window.CustomEvent = e))
    }()
}, function(e, t, n) {
    "use strict";

    function o(e) {
        return e && e.__esModule ? e : {
            default: e
        }
    }
    Object.defineProperty(t, "__esModule", {
        value: !0
    }), t.videoAutoplayTest = t.VideoFilterPropertyValues = t.VideoBackground = void 0;
    var i = n(78),
        r = o(i),
        a = n(88),
        s = n(81),
        l = o(s);
    t.VideoBackground = r.default, t.VideoFilterPropertyValues = a.filterProperties, t.videoAutoplayTest = l.default
}, function(e, t, n) {
    "use strict";

    function o(e) {
        return e && e.__esModule ? e : {
            default: e
        }
    }

    function i(e, t) {
        if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
    }
    Object.defineProperty(t, "__esModule", {
        value: !0
    });
    var r = function() {
            function e(e, t) {
                for (var n = 0; n < t.length; n++) {
                    var o = t[n];
                    o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, o.key, o)
                }
            }
            return function(t, n, o) {
                return n && e(t.prototype, n), o && e(t, o), t
            }
        }(),
        a = n(79),
        s = o(a),
        l = n(81),
        c = o(l),
        u = n(83),
        d = n(87),
        h = n(85),
        f = n(88),
        p = n(84),
        A = {
            vimeo: {
                api: u.initializeVimeoAPI,
                player: u.initializeVimeoPlayer
            },
            youtube: {
                api: d.initializeYouTubeAPI,
                player: d.initializeYouTubePlayer
            }
        },
        g = function() {
            function e(t) {
                var n = this,
                    o = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : window;
                i(this, e), this.windowContext = o, this.events = [], this.browserCanAutoPlay = !1, this.videoCanAutoPlay = !1, this.setInstanceProperties(t), (0, c.default)().then(function(e) {
                    n.logger(e), n.browserCanAutoPlay = !0, n.initializeVideoAPI()
                }, function(e) {
                    n.logger(e), n.browserCanAutoPlay = !1, n.renderFallbackBehavior()
                }).then(function() {
                    n.setDisplayEffects(), n.bindUI(), n.DEBUG.enabled === !0 && (window.vdbg = n)
                })
            }
            return r(e, [{
                key: "destroy",
                value: function() {
                    this.events && this.events.forEach(function(e) {
                        return e.target.removeEventListener(e.type, e.handler, !0)
                    }), this.events = null, this.player && "function" == typeof this.player.destroy && (this.player.iframe.classList.remove("ready"), clearTimeout(this.playTimeout), this.playTimeout = null, this.player.destroy(), this.player = {}), "number" == typeof this.timer && (clearTimeout(this.timer), this.timer = null)
                }
            }, {
                key: "bindUI",
                value: function() {
                    var e = this,
                        t = function() {
                            e.windowContext.requestAnimationFrame(function() {
                                e.scaleVideo()
                            })
                        };
                    this.events.push({
                        target: this.windowContext,
                        type: "resize",
                        handler: t
                    }), this.windowContext.addEventListener("resize", t, !0)
                }
            }, {
                key: "setInstanceProperties",
                value: function() {
                    var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
                    return e = (0, s.default)({}, h.DEFAULT_PROPERTY_VALUES, e), 1 === e.container.nodeType ? this.container = e.container : "string" == typeof e.container && (this.container = document.querySelector(e.container)), this.container ? (this.videoSource = (0, p.getVideoSource)(e.url), this.videoId = (0, p.getVideoID)(e.url, this.videoSource), this.customFallbackImage = (0, p.validatedImage)(e.customFallbackImage), this.filter = e.filter, this.filterStrength = e.filterStrength, this.fitMode = e.fitMode, this.scaleFactor = e.scaleFactor, this.playbackSpeed = parseFloat(e.playbackSpeed) < .5 ? 1 : parseFloat(e.playbackSpeed), this.timeCode = {
                        start: (0, p.getStartTime)(e.url, this.videoSource) || e.timeCode.start,
                        end: e.timeCode.end
                    }, this.player = {}, void(this.DEBUG = e.DEBUG)) : (console.error("Container " + e.container + " not found"), !1)
                }
            }, {
                key: "setFallbackImage",
                value: function() {
                    var e = this.customFallbackImage;
                    if (!(!e || this.browserCanAutoPlay && this.videoCanAutoPlay)) return e.addEventListener("load", function() {
                        e.classList.add("loaded")
                    }, {
                        once: !0
                    }), this.windowContext.ImageLoader ? void this.windowContext.ImageLoader.load(e, {
                        load: !0
                    }) : void(e.src = e.src)
                }
            }, {
                key: "initializeVideoAPI",
                value: function() {
                    var e = this;
                    if (this.browserCanAutoPlay && this.videoSource && this.videoId) {
                        this.player.ready = !1;
                        var t = A[this.videoSource].api,
                            n = t(this.windowContext);
                        n.then(function(t) {
                            e.logger(t), e.player.ready = !1, e.initializeVideoPlayer()
                        }).catch(function(t) {
                            e.renderFallbackBehavior(), document.body.classList.add("ready"), e.logger(t)
                        })
                    } else this.renderFallbackBehavior(), document.body.classList.add("ready")
                }
            }, {
                key: "initializeVideoPlayer",
                value: function() {
                    var e = this;
                    if (this.player.ready) {
                        try {
                            this.player.destroy()
                        } catch (e) {}
                        this.player.ready = !1
                    }
                    var t = A[this.videoSource].player,
                        n = t({
                            instance: this,
                            container: this.container,
                            win: this.windowContext,
                            videoId: this.videoId,
                            startTime: this.timeCode.start,
                            speed: this.playbackSpeed,
                            readyCallback: function(t, n) {
                                e.player.iframe.classList.add("background-video"), e.videoAspectRatio = (0, p.findPlayerAspectRatio)(e.container, e.player, e.videoSource), e.syncPlayer();
                                var o = new CustomEvent("ready");
                                e.container.dispatchEvent(o)
                            },
                            stateChangeCallback: function(t, n) {
                                switch (t) {
                                    case "buffering":
                                        e.testVideoEmbedAutoplay();
                                        break;
                                    case "playing":
                                        null === e.playTimeout && e.videoCanAutoPlay || e.testVideoEmbedAutoplay(!0)
                                }
                                t && e.logger(t), n && e.logger(n)
                            }
                        });
                    n.then(function(t) {
                        e.player = t
                    }, function(t) {
                        e.logger(t), e.testVideoEmbedAutoplay(!1)
                    })
                }
            }, {
                key: "testVideoEmbedAutoplay",
                value: function() {
                    var e = this,
                        t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : void 0;
                    return void 0 === t && (this.logger("test video autoplay: begin"), this.playTimeout && (clearTimeout(this.playTimeout), this.playTimeout = null), this.playTimeout = setTimeout(function() {
                        e.testVideoEmbedAutoplay(!1)
                    }, h.TIMEOUT)), t === !0 ? (clearTimeout(this.playTimeout), this.logger("test video autoplay: success"), this.playTimeout = null, this.videoCanAutoPlay = !0, this.player.ready = !0, this.player.iframe.classList.add("ready"), void this.container.classList.remove("mobile")) : t === !1 ? (clearTimeout(this.playTimeout), this.logger("test video autoplay: failure"), this.playTimeout = null, this.videoCanAutoPlay = !1, void this.renderFallbackBehavior()) : void 0
                }
            }, {
                key: "renderFallbackBehavior",
                value: function() {
                    this.setFallbackImage(), this.container.classList.add("mobile"), this.logger("added mobile")
                }
            }, {
                key: "syncPlayer",
                value: function() {
                    this.setDisplayEffects(), this.setSpeed(), this.scaleVideo()
                }
            }, {
                key: "scaleVideo",
                value: function(e) {
                    this.setFallbackImage();
                    var t = this.player.iframe;
                    if (t) {
                        var n = e || this.scaleFactor;
                        if ("fill" !== this.fitMode) return t.style.width = "", void(t.style.height = "");
                        var o = t.parentNode.clientWidth,
                            i = t.parentNode.clientHeight,
                            r = o / i,
                            a = 0,
                            s = 0;
                        r > this.videoAspectRatio ? (a = o * n, s = o * n / this.videoAspectRatio) : this.videoAspectRatio > r ? (a = i * n * this.videoAspectRatio, s = i * n) : (a = o * n, s = i * n), t.style.width = a + "px", t.style.height = s + "px", t.style.left = 0 - (a - o) / 2 + "px", t.style.top = 0 - (s - i) / 2 + "px"
                    }
                }
            }, {
                key: "setSpeed",
                value: function(e) {
                    this.playbackSpeed = parseFloat(this.playbackSpeed), this.player.setPlaybackRate && this.player.setPlaybackRate(this.playbackSpeed)
                }
            }, {
                key: "setDisplayEffects",
                value: function() {
                    this.setFilter()
                }
            }, {
                key: "setFilter",
                value: function() {
                    var e = this.container.style,
                        t = f.filterOptions[this.filter - 1],
                        n = "";
                    "none" !== t && (n = this.getFilterStyle(t, this.filterStrength));
                    var o = "blur" === t;
                    e.webkitFilter = o ? "" : n, e.filter = o ? "" : n, this.container.classList.toggle("filter-blur", o), Array.prototype.slice.call(this.container.children).forEach(function(e) {
                        e.style.webkitFilter = o ? n : "", e.style.filter = o ? n : ""
                    })
                }
            }, {
                key: "getFilterStyle",
                value: function(e, t) {
                    return e + "(" + (f.filterProperties[e].modifier(t) + f.filterProperties[e].unit) + ")"
                }
            }, {
                key: "logger",
                value: function(e) {
                    this.DEBUG.enabled && this.DEBUG.verbose && this.windowContext.console.log(e)
                }
            }]), e
        }();
    t.default = g
}, function(e, t, n) {
    (function(e, n) {
        function o(e, t, n) {
            switch (n.length) {
                case 0:
                    return e.call(t);
                case 1:
                    return e.call(t, n[0]);
                case 2:
                    return e.call(t, n[0], n[1]);
                case 3:
                    return e.call(t, n[0], n[1], n[2])
            }
            return e.apply(t, n)
        }

        function i(e, t) {
            for (var n = -1, o = Array(e); ++n < e;) o[n] = t(n);
            return o
        }

        function r(e) {
            return function(t) {
                return e(t)
            }
        }

        function a(e, t) {
            return null == e ? void 0 : e[t]
        }

        function s(e, t) {
            return function(n) {
                return e(t(n))
            }
        }

        function l(e) {
            var t = -1,
                n = null == e ? 0 : e.length;
            for (this.clear(); ++t < n;) {
                var o = e[t];
                this.set(o[0], o[1])
            }
        }

        function c() {
            this.__data__ = Wt ? Wt(null) : {}, this.size = 0
        }

        function u(e) {
            var t = this.has(e) && delete this.__data__[e];
            return this.size -= t ? 1 : 0, t
        }

        function d(e) {
            var t = this.__data__;
            if (Wt) {
                var n = t[e];
                return n === ke ? void 0 : n
            }
            return Et.call(t, e) ? t[e] : void 0
        }

        function h(e) {
            var t = this.__data__;
            return Wt ? void 0 !== t[e] : Et.call(t, e)
        }

        function f(e, t) {
            var n = this.__data__;
            return this.size += this.has(e) ? 0 : 1, n[e] = Wt && void 0 === t ? ke : t, this
        }

        function p(e) {
            var t = -1,
                n = null == e ? 0 : e.length;
            for (this.clear(); ++t < n;) {
                var o = e[t];
                this.set(o[0], o[1])
            }
        }

        function A() {
            this.__data__ = [], this.size = 0
        }

        function g(e) {
            var t = this.__data__,
                n = N(t, e);
            if (n < 0) return !1;
            var o = t.length - 1;
            return n == o ? t.pop() : Ut.call(t, n, 1), --this.size, !0
        }

        function v(e) {
            var t = this.__data__,
                n = N(t, e);
            return n < 0 ? void 0 : t[n][1]
        }

        function m(e) {
            return N(this.__data__, e) > -1
        }

        function y(e, t) {
            var n = this.__data__,
                o = N(n, e);
            return o < 0 ? (++this.size, n.push([e, t])) : n[o][1] = t, this
        }

        function b(e) {
            var t = -1,
                n = null == e ? 0 : e.length;
            for (this.clear(); ++t < n;) {
                var o = e[t];
                this.set(o[0], o[1])
            }
        }

        function w() {
            this.size = 0, this.__data__ = {
                hash: new l,
                map: new(Gt || p),
                string: new l
            }
        }

        function T(e) {
            var t = K(this, e).delete(e);
            return this.size -= t ? 1 : 0, t
        }

        function S(e) {
            return K(this, e).get(e)
        }

        function E(e) {
            return K(this, e).has(e)
        }

        function x(e, t) {
            var n = K(this, e),
                o = n.size;
            return n.set(e, t), this.size += n.size == o ? 0 : 1, this
        }

        function I(e) {
            var t = this.__data__ = new p(e);
            this.size = t.size
        }

        function k() {
            this.__data__ = new p, this.size = 0
        }

        function Y(e) {
            var t = this.__data__,
                n = t.delete(e);
            return this.size = t.size, n
        }

        function C(e) {
            return this.__data__.get(e)
        }

        function _(e) {
            return this.__data__.has(e)
        }

        function P(e, t) {
            var n = this.__data__;
            if (n instanceof p) {
                var o = n.__data__;
                if (!Gt || o.length < Ie - 1) return o.push([e, t]), this.size = ++n.size, this;
                n = this.__data__ = new b(o)
            }
            return n.set(e, t), this.size = n.size, this
        }

        function O(e, t) {
            var n = qt(e),
                o = !n && Zt(e),
                r = !n && !o && Jt(e),
                a = !n && !o && !r && Xt(e),
                s = n || o || r || a,
                l = s ? i(e.length, String) : [],
                c = l.length;
            for (var u in e) !t && !Et.call(e, u) || s && ("length" == u || r && ("offset" == u || "parent" == u) || a && ("buffer" == u || "byteLength" == u || "byteOffset" == u) || ne(u, c)) || l.push(u);
            return l
        }

        function R(e, t, n) {
            (void 0 === n || fe(e[t], n)) && (void 0 !== n || t in e) || U(e, t, n)
        }

        function j(e, t, n) {
            var o = e[t];
            Et.call(e, t) && fe(o, n) && (void 0 !== n || t in e) || U(e, t, n)
        }

        function N(e, t) {
            for (var n = e.length; n--;)
                if (fe(e[n][0], t)) return n;
            return -1
        }

        function U(e, t, n) {
            "__proto__" == t && Mt ? Mt(e, t, {
                configurable: !0,
                enumerable: !0,
                value: n,
                writable: !0
            }) : e[t] = n
        }

        function F(e) {
            return null == e ? void 0 === e ? Qe : Le : Ft && Ft in Object(e) ? ee(e) : le(e)
        }

        function M(e) {
            return ye(e) && F(e) == Pe
        }

        function V(e) {
            if (!me(e) || re(e)) return !1;
            var t = ge(e) ? Yt : st;
            return t.test(he(e))
        }

        function B(e) {
            return ye(e) && ve(e.length) && !!ct[F(e)]
        }

        function L(e) {
            if (!me(e)) return se(e);
            var t = ae(e),
                n = [];
            for (var o in e)("constructor" != o || !t && Et.call(e, o)) && n.push(o);
            return n
        }

        function G(e, t, n, o, i) {
            e !== t && Dt(t, function(r, a) {
                if (i || (i = new I), me(r)) W(e, t, a, n, G, o, i);
                else {
                    var s = o ? o(ue(e, a), r, a + "", e, t, i) : void 0;
                    void 0 === s && (s = r), R(e, a, s)
                }
            }, Te)
        }

        function W(e, t, n, o, i, r, a) {
            var s = ue(e, n),
                l = ue(t, n),
                c = a.get(l);
            if (c) return void R(e, n, c);
            var u = r ? r(s, l, n + "", e, t, a) : void 0,
                d = void 0 === u;
            if (d) {
                var h = qt(l),
                    f = !h && Jt(l),
                    p = !h && !f && Xt(l);
                u = l, h || f || p ? qt(s) ? u = s : Ae(s) ? u = Z(s) : f ? (d = !1, u = D(l, !0)) : p ? (d = !1, u = Q(l, !0)) : u = [] : be(l) || Zt(l) ? (u = s, Zt(s) ? u = we(s) : me(s) && !ge(s) || (u = te(l))) : d = !1
            }
            d && (a.set(l, u), i(u, l, o, r, a), a.delete(l)), R(e, n, u)
        }

        function H(e, t) {
            return Qt(ce(e, t, Ee), e + "")
        }

        function D(e, t) {
            if (t) return e.slice();
            var n = e.length,
                o = Ot ? Ot(n) : new e.constructor(n);
            return e.copy(o), o
        }

        function z(e) {
            var t = new e.constructor(e.byteLength);
            return new Pt(t).set(new Pt(e)), t
        }

        function Q(e, t) {
            var n = t ? z(e.buffer) : e.buffer;
            return new e.constructor(n, e.byteOffset, e.length)
        }

        function Z(e, t) {
            var n = -1,
                o = e.length;
            for (t || (t = Array(o)); ++n < o;) t[n] = e[n];
            return t
        }

        function q(e, t, n, o) {
            var i = !n;
            n || (n = {});
            for (var r = -1, a = t.length; ++r < a;) {
                var s = t[r],
                    l = o ? o(n[s], e[s], s, n, e) : void 0;
                void 0 === l && (l = e[s]), i ? U(n, s, l) : j(n, s, l)
            }
            return n
        }

        function J(e) {
            return H(function(t, n) {
                var o = -1,
                    i = n.length,
                    r = i > 1 ? n[i - 1] : void 0,
                    a = i > 2 ? n[2] : void 0;
                for (r = e.length > 3 && "function" == typeof r ? (i--, r) : void 0, a && oe(n[0], n[1], a) && (r = i < 3 ? void 0 : r, i = 1), t = Object(t); ++o < i;) {
                    var s = n[o];
                    s && e(t, s, o, r)
                }
                return t
            })
        }

        function X(e) {
            return function(t, n, o) {
                for (var i = -1, r = Object(t), a = o(t), s = a.length; s--;) {
                    var l = a[e ? s : ++i];
                    if (n(r[l], l, r) === !1) break
                }
                return t
            }
        }

        function K(e, t) {
            var n = e.__data__;
            return ie(t) ? n["string" == typeof t ? "string" : "hash"] : n.map
        }

        function $(e, t) {
            var n = a(e, t);
            return V(n) ? n : void 0
        }

        function ee(e) {
            var t = Et.call(e, Ft),
                n = e[Ft];
            try {
                e[Ft] = void 0;
                var o = !0
            } catch (e) {}
            var i = It.call(e);
            return o && (t ? e[Ft] = n : delete e[Ft]), i
        }

        function te(e) {
            return "function" != typeof e.constructor || ae(e) ? {} : Ht(Rt(e))
        }

        function ne(e, t) {
            var n = typeof e;
            return t = null == t ? _e : t, !!t && ("number" == n || "symbol" != n && lt.test(e)) && e > -1 && e % 1 == 0 && e < t
        }

        function oe(e, t, n) {
            if (!me(n)) return !1;
            var o = typeof t;
            return !!("number" == o ? pe(n) && ne(t, n.length) : "string" == o && t in n) && fe(n[t], e)
        }

        function ie(e) {
            var t = typeof e;
            return "string" == t || "number" == t || "symbol" == t || "boolean" == t ? "__proto__" !== e : null === e
        }

        function re(e) {
            return !!xt && xt in e
        }

        function ae(e) {
            var t = e && e.constructor,
                n = "function" == typeof t && t.prototype || wt;
            return e === n
        }

        function se(e) {
            var t = [];
            if (null != e)
                for (var n in Object(e)) t.push(n);
            return t
        }

        function le(e) {
            return It.call(e)
        }

        function ce(e, t, n) {
            return t = Bt(void 0 === t ? e.length - 1 : t, 0),
                function() {
                    for (var i = arguments, r = -1, a = Bt(i.length - t, 0), s = Array(a); ++r < a;) s[r] = i[t + r];
                    r = -1;
                    for (var l = Array(t + 1); ++r < t;) l[r] = i[r];
                    return l[t] = n(s), o(e, this, l)
                }
        }

        function ue(e, t) {
            if (("constructor" !== t || "function" != typeof e[t]) && "__proto__" != t) return e[t]
        }

        function de(e) {
            var t = 0,
                n = 0;
            return function() {
                var o = Lt(),
                    i = Ce - (o - n);
                if (n = o, i > 0) {
                    if (++t >= Ye) return arguments[0]
                } else t = 0;
                return e.apply(void 0, arguments)
            }
        }

        function he(e) {
            if (null != e) {
                try {
                    return St.call(e)
                } catch (e) {}
                try {
                    return e + ""
                } catch (e) {}
            }
            return ""
        }

        function fe(e, t) {
            return e === t || e !== e && t !== t
        }

        function pe(e) {
            return null != e && ve(e.length) && !ge(e)
        }

        function Ae(e) {
            return ye(e) && pe(e)
        }

        function ge(e) {
            if (!me(e)) return !1;
            var t = F(e);
            return t == Fe || t == Me || t == Re || t == We
        }

        function ve(e) {
            return "number" == typeof e && e > -1 && e % 1 == 0 && e <= _e
        }

        function me(e) {
            var t = typeof e;
            return null != e && ("object" == t || "function" == t)
        }

        function ye(e) {
            return null != e && "object" == typeof e
        }

        function be(e) {
            if (!ye(e) || F(e) != Ge) return !1;
            var t = Rt(e);
            if (null === t) return !0;
            var n = Et.call(t, "constructor") && t.constructor;
            return "function" == typeof n && n instanceof n && St.call(n) == kt
        }

        function we(e) {
            return q(e, Te(e))
        }

        function Te(e) {
            return pe(e) ? O(e, !0) : L(e)
        }

        function Se(e) {
            return function() {
                return e
            }
        }

        function Ee(e) {
            return e
        }

        function xe() {
            return !1
        }
        var Ie = 200,
            ke = "__lodash_hash_undefined__",
            Ye = 800,
            Ce = 16,
            _e = 9007199254740991,
            Pe = "[object Arguments]",
            Oe = "[object Array]",
            Re = "[object AsyncFunction]",
            je = "[object Boolean]",
            Ne = "[object Date]",
            Ue = "[object Error]",
            Fe = "[object Function]",
            Me = "[object GeneratorFunction]",
            Ve = "[object Map]",
            Be = "[object Number]",
            Le = "[object Null]",
            Ge = "[object Object]",
            We = "[object Proxy]",
            He = "[object RegExp]",
            De = "[object Set]",
            ze = "[object String]",
            Qe = "[object Undefined]",
            Ze = "[object WeakMap]",
            qe = "[object ArrayBuffer]",
            Je = "[object DataView]",
            Xe = "[object Float32Array]",
            Ke = "[object Float64Array]",
            $e = "[object Int8Array]",
            et = "[object Int16Array]",
            tt = "[object Int32Array]",
            nt = "[object Uint8Array]",
            ot = "[object Uint8ClampedArray]",
            it = "[object Uint16Array]",
            rt = "[object Uint32Array]",
            at = /[\\^$.*+?()[\]{}|]/g,
            st = /^\[object .+?Constructor\]$/,
            lt = /^(?:0|[1-9]\d*)$/,
            ct = {};
        ct[Xe] = ct[Ke] = ct[$e] = ct[et] = ct[tt] = ct[nt] = ct[ot] = ct[it] = ct[rt] = !0, ct[Pe] = ct[Oe] = ct[qe] = ct[je] = ct[Je] = ct[Ne] = ct[Ue] = ct[Fe] = ct[Ve] = ct[Be] = ct[Ge] = ct[He] = ct[De] = ct[ze] = ct[Ze] = !1;
        var ut = "object" == typeof e && e && e.Object === Object && e,
            dt = "object" == typeof self && self && self.Object === Object && self,
            ht = ut || dt || Function("return this")(),
            ft = "object" == typeof t && t && !t.nodeType && t,
            pt = ft && "object" == typeof n && n && !n.nodeType && n,
            At = pt && pt.exports === ft,
            gt = At && ut.process,
            vt = function() {
                try {
                    var e = pt && pt.require && pt.require("util").types;
                    return e ? e : gt && gt.binding && gt.binding("util")
                } catch (e) {}
            }(),
            mt = vt && vt.isTypedArray,
            yt = Array.prototype,
            bt = Function.prototype,
            wt = Object.prototype,
            Tt = ht["__core-js_shared__"],
            St = bt.toString,
            Et = wt.hasOwnProperty,
            xt = function() {
                var e = /[^.]+$/.exec(Tt && Tt.keys && Tt.keys.IE_PROTO || "");
                return e ? "Symbol(src)_1." + e : ""
            }(),
            It = wt.toString,
            kt = St.call(Object),
            Yt = RegExp("^" + St.call(Et).replace(at, "\\$&").replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, "$1.*?") + "$"),
            Ct = At ? ht.Buffer : void 0,
            _t = ht.Symbol,
            Pt = ht.Uint8Array,
            Ot = Ct ? Ct.allocUnsafe : void 0,
            Rt = s(Object.getPrototypeOf, Object),
            jt = Object.create,
            Nt = wt.propertyIsEnumerable,
            Ut = yt.splice,
            Ft = _t ? _t.toStringTag : void 0,
            Mt = function() {
                try {
                    var e = $(Object, "defineProperty");
                    return e({}, "", {}), e
                } catch (e) {}
            }(),
            Vt = Ct ? Ct.isBuffer : void 0,
            Bt = Math.max,
            Lt = Date.now,
            Gt = $(ht, "Map"),
            Wt = $(Object, "create"),
            Ht = function() {
                function e() {}
                return function(t) {
                    if (!me(t)) return {};
                    if (jt) return jt(t);
                    e.prototype = t;
                    var n = new e;
                    return e.prototype = void 0, n
                }
            }();
        l.prototype.clear = c, l.prototype.delete = u, l.prototype.get = d, l.prototype.has = h, l.prototype.set = f, p.prototype.clear = A, p.prototype.delete = g, p.prototype.get = v, p.prototype.has = m, p.prototype.set = y, b.prototype.clear = w, b.prototype.delete = T, b.prototype.get = S, b.prototype.has = E, b.prototype.set = x, I.prototype.clear = k, I.prototype.delete = Y, I.prototype.get = C, I.prototype.has = _, I.prototype.set = P;
        var Dt = X(),
            zt = Mt ? function(e, t) {
                return Mt(e, "toString", {
                    configurable: !0,
                    enumerable: !1,
                    value: Se(t),
                    writable: !0
                })
            } : Ee,
            Qt = de(zt),
            Zt = M(function() {
                return arguments
            }()) ? M : function(e) {
                return ye(e) && Et.call(e, "callee") && !Nt.call(e, "callee")
            },
            qt = Array.isArray,
            Jt = Vt || xe,
            Xt = mt ? r(mt) : B,
            Kt = J(function(e, t, n) {
                G(e, t, n)
            });
        n.exports = Kt
    }).call(t, function() {
        return this
    }(), n(80)(e))
}, function(e, t) {
    e.exports = function(e) {
        return e.webpackPolyfill || (e.deprecate = function() {}, e.paths = [], e.children = [], e.webpackPolyfill = 1), e
    }
}, function(e, t, n) {
    "use strict";
    Object.defineProperty(t, "__esModule", {
        value: !0
    });
    var o = !1,
        i = n(82),
        r = i.OggVideo,
        a = i.Mp4Video,
        s = function() {
            return new Promise(function(e, t) {
                if ("resolve" === o) return void e("resolved for debugging");
                if ("reject" === o) return void t("rejected for debugging");
                var n = document.createElement("video");
                n.autoplay = !0, n.setAttribute("autoplay", !0), n.muted = !0, n.setAttribute("muted", !0), n.playsinline = !0, n.setAttribute("playsinline", !0), n.volume = 0, n.setAttribute("data-is-playing", "false"), n.setAttribute("style", "width: 1px; height: 1px; position: fixed; top: 0; left: 0; z-index: 100;"), document.body.appendChild(n);
                var i = null,
                    s = function() {
                        i && (clearTimeout(i), i = null);
                        try {
                            document.body.removeChild(n)
                        } catch (e) {
                            return
                        }
                    };
                try {
                    if (n.canPlayType('video/ogg; codecs="theora"').match(/^(probably)|(maybe)/)) n.src = r;
                    else {
                        if (!n.canPlayType('video/mp4; codecs="avc1.42E01E"').match(/^(probably)|(maybe)/)) return s(), void t("no autoplay: element does not support mp4 or ogg format");
                        n.src = a
                    }
                } catch (e) {
                    return s(), void t("no autoplay: " + e)
                }
                n.addEventListener("play", function() {
                    n.setAttribute("data-is-playing", "true"), i = setTimeout(function() {
                        s(), t("no autoplay: unsure")
                    }, 3e3)
                }), n.addEventListener("canplay", function() {
                    return "true" === n.getAttribute("data-is-playing") ? (s(), e("autoplay supported"), !0) : (s(), t("no autoplay: browser does not support autoplay"), !1)
                }), n.load(), n.play()
            })
        };
    t.default = s
}, function(e, t) {
    "use strict";
    Object.defineProperty(t, "__esModule", {
        value: !0
    });
    var n = "data:video/ogg;base64,T2dnUwACAAAAAAAAAABmnCATAAAAAHDEixYBKoB0aGVvcmEDAgEAAQABAAAQAAAQAAAAAAAFAAAAAQAAAAAAAAAAAGIAYE9nZ1MAAAAAAAAAAAAAZpwgEwEAAAACrA7TDlj///////////////+QgXRoZW9yYSsAAABYaXBoLk9yZyBsaWJ0aGVvcmEgMS4xIDIwMDkwODIyIChUaHVzbmVsZGEpAQAAABoAAABFTkNPREVSPWZmbXBlZzJ0aGVvcmEtMC4yOYJ0aGVvcmG+zSj3uc1rGLWpSUoQc5zmMYxSlKQhCDGMYhCEIQhAAAAAAAAAAAAAEW2uU2eSyPxWEvx4OVts5ir1aKtUKBMpJFoQ/nk5m41mUwl4slUpk4kkghkIfDwdjgajQYC8VioUCQRiIQh8PBwMhgLBQIg4FRba5TZ5LI/FYS/Hg5W2zmKvVoq1QoEykkWhD+eTmbjWZTCXiyVSmTiSSCGQh8PB2OBqNBgLxWKhQJBGIhCHw8HAyGAsFAiDgUCw8PDw8PDw8PDw8PDw8PDw8PDw8PDw8PDw8PDw8PDw8PDw8PDw8PDw8PDw8PDw8PDw8PDw8PDw8PDw8PDw8PDw8PDAwPEhQUFQ0NDhESFRUUDg4PEhQVFRUOEBETFBUVFRARFBUVFRUVEhMUFRUVFRUUFRUVFRUVFRUVFRUVFRUVEAwLEBQZGxwNDQ4SFRwcGw4NEBQZHBwcDhATFhsdHRwRExkcHB4eHRQYGxwdHh4dGxwdHR4eHh4dHR0dHh4eHRALChAYKDM9DAwOExo6PDcODRAYKDlFOA4RFh0zV1A+EhYlOkRtZ00YIzdAUWhxXDFATldneXhlSFxfYnBkZ2MTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTEhIVGRoaGhoSFBYaGhoaGhUWGRoaGhoaGRoaGhoaGhoaGhoaGhoaGhoaGhoaGhoaGhoaGhoaGhoaGhoaGhoaGhESFh8kJCQkEhQYIiQkJCQWGCEkJCQkJB8iJCQkJCQkJCQkJCQkJCQkJCQkJCQkJCQkJCQkJCQkJCQkJCQkJCQREhgvY2NjYxIVGkJjY2NjGBo4Y2NjY2MvQmNjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjFRUVFRUVFRUVFRUVFRUVFRUVFRUVFRUVFRUVFRUVFRUVFRUVFRUVFRUVFRUVFRUVFRUVFRUVFRUVFRUVFRUVFRISEhUXGBkbEhIVFxgZGxwSFRcYGRscHRUXGBkbHB0dFxgZGxwdHR0YGRscHR0dHhkbHB0dHR4eGxwdHR0eHh4REREUFxocIBERFBcaHCAiERQXGhwgIiUUFxocICIlJRcaHCAiJSUlGhwgIiUlJSkcICIlJSUpKiAiJSUlKSoqEBAQFBgcICgQEBQYHCAoMBAUGBwgKDBAFBgcICgwQEAYHCAoMEBAQBwgKDBAQEBgICgwQEBAYIAoMEBAQGCAgAfF5cdH1e3Ow/L66wGmYnfIUbwdUTe3LMRbqON8B+5RJEvcGxkvrVUjTMrsXYhAnIwe0dTJfOYbWrDYyqUrz7dw/JO4hpmV2LsQQvkUeGq1BsZLx+cu5iV0e0eScJ91VIQYrmqfdVSK7GgjOU0oPaPOu5IcDK1mNvnD+K8LwS87f8Jx2mHtHnUkTGAurWZlNQa74ZLSFH9oF6FPGxzLsjQO5Qe0edcpttd7BXBSqMCL4k/4tFrHIPuEQ7m1/uIWkbDMWVoDdOSuRQ9286kvVUlQjzOE6VrNguN4oRXYGkgcnih7t13/9kxvLYKQezwLTrO44sVmMPgMqORo1E0sm1/9SludkcWHwfJwTSybR4LeAz6ugWVgRaY8mV/9SluQmtHrzsBtRF/wPY+X0JuYTs+ltgrXAmlk10xQHmTu9VSIAk1+vcvU4ml2oNzrNhEtQ3CysNP8UeR35wqpKUBdGdZMSjX4WVi8nJpdpHnbhzEIdx7mwf6W1FKAiucMXrWUWVjyRf23chNtR9mIzDoT/6ZLYailAjhFlZuvPtSeZ+2oREubDoWmT3TguY+JHPdRVSLKxfKH3vgNqJ/9emeEYikGXDFNzaLjvTeGAL61mogOoeG3y6oU4rW55ydoj0lUTSR/mmRhPmF86uwIfzp3FtiufQCmppaHDlGE0r2iTzXIw3zBq5hvaTldjG4CPb9wdxAme0SyedVKczJ9AtYbgPOzYKJvZZImsN7ecrxWZg5dR6ZLj/j4qpWsIA+vYwE+Tca9ounMIsrXMB4Stiib2SPQtZv+FVIpfEbzv8ncZoLBXc3YBqTG1HsskTTotZOYTG+oVUjLk6zhP8bg4RhMUNtfZdO7FdpBuXzhJ5Fh8IKlJG7wtD9ik8rWOJxy6iQ3NwzBpQ219mlyv+FLicYs2iJGSE0u2txzed++D61ZWCiHD/cZdQVCqkO2gJpdpNaObhnDfAPrT89RxdWFZ5hO3MseBSIlANppdZNIV/Rwe5eLTDvkfWKzFnH+QJ7m9QWV1KdwnuIwTNtZdJMoXBf74OhRnh2t+OTGL+AVUnIkyYY+QG7g9itHXyF3OIygG2s2kud679ZWKqSFa9n3IHD6MeLv1lZ0XyduRhiDRtrNnKoyiFVLcBm0ba5Yy3fQkDh4XsFE34isVpOzpa9nR8iCpS4HoxG2rJpnRhf3YboVa1PcRouh5LIJv/uQcPNd095ickTaiGBnWLKVWRc0OnYTSyex/n2FofEPnDG8y3PztHrzOLK1xo6RAml2k9owKajOC0Wr4D5x+3nA0UEhK2m198wuBHF3zlWWVKWLN1CHzLClUfuoYBcx4b1llpeBKmbayaR58njtE9onD66lUcsg0Spm2snsb+8HaJRn4dYcLbCuBuYwziB8/5U1C1DOOz2gZjSZtrLJk6vrLF3hwY4Io9xuT/ruUFRSBkNtUzTOWhjh26irLEPx4jPZL3Fo3QrReoGTTM21xYTT9oFdhTUIvjqTkfkvt0bzgVUjq/hOYY8j60IaO/0AzRBtqkTS6R5ellZd5uKdzzhb8BFlDdAcrwkE0rbXTOPB+7Y0FlZO96qFL4Ykg21StJs8qIW7h16H5hGiv8V2Cflau7QVDepTAHa6Lgt6feiEvJDM21StJsmOH/hynURrKxvUpQ8BH0JF7BiyG2qZpnL/7AOU66gt+reLEXY8pVOCQvSsBtqZTNM8bk9ohRcwD18o/WVkbvrceVKRb9I59IEKysjBeTMmmbA21xu/6iHadLRxuIzkLpi8wZYmmbbWi32RVAUjruxWlJ//iFxE38FI9hNKOoCdhwf5fDe4xZ81lgREhK2m1j78vW1CqkuMu/AjBNK210kzRUX/B+69cMMUG5bYrIeZxVSEZISmkzbXOi9yxwIfPgdsov7R71xuJ7rFcACjG/9PzApqFq7wEgzNJm2suWESPuwrQvejj7cbnQxMkxpm21lUYJL0fKmogPPqywn7e3FvB/FCNxPJ85iVUkCE9/tLKx31G4CgNtWTTPFhMvlu8G4/TrgaZttTChljfNJGgOT2X6EqpETy2tYd9cCBI4lIXJ1/3uVUllZEJz4baqGF64yxaZ+zPLYwde8Uqn1oKANtUrSaTOPHkhvuQP3bBlEJ/LFe4pqQOHUI8T8q7AXx3fLVBgSCVpMba55YxN3rv8U1Dv51bAPSOLlZWebkL8vSMGI21lJmmeVxPRwFlZF1CpqCN8uLwymaZyjbXHCRytogPN3o/n74CNykfT+qqRv5AQlHcRxYrC5KvGmbbUwmZY/29BvF6C1/93x4WVglXDLFpmbapmF89HKTogRwqqSlGbu+oiAkcWFbklC6Zhf+NtTLFpn8oWz+HsNRVSgIxZWON+yVyJlE5tq/+GWLTMutYX9ekTySEQPLVNQQ3OfycwJBM0zNtZcse7CvcKI0V/zh16Dr9OSA21MpmmcrHC+6pTAPHPwoit3LHHqs7jhFNRD6W8+EBGoSEoaZttTCZljfduH/fFisn+dRBGAZYtMzbVMwvul/T/crK1NQh8gN0SRRa9cOux6clC0/mDLFpmbarmF8/e6CopeOLCNW6S/IUUg3jJIYiAcDoMcGeRbOvuTPjXR/tyo79LK3kqqkbxkkMRAOB0GODPItnX3Jnxro/25Ud+llbyVVSN4ySGIgHA6DHBnkWzr7kz410f7cqO/Syt5KqpFVJwn6gBEvBM0zNtZcpGOEPiysW8vvRd2R0f7gtjhqUvXL+gWVwHm4XJDBiMpmmZtrLfPwd/IugP5+fKVSysH1EXreFAcEhelGmbbUmZY4Xdo1vQWVnK19P4RuEnbf0gQnR+lDCZlivNM22t1ESmopPIgfT0duOfQrsjgG4tPxli0zJmF5trdL1JDUIUT1ZXSqQDeR4B8mX3TrRro/2McGeUvLtwo6jIEKMkCUXWsLyZROd9P/rFYNtXPBli0z398iVUlVKAjFlY437JXImUTm2r/4ZYtMy61hf16RPJIU9nZ1MABAwAAAAAAAAAZpwgEwIAAABhp658BScAAAAAAADnUFBQXIDGXLhwtttNHDhw5OcpQRMETBEwRPduylKVB0HRdF0A",
        o = "data:video/mp4;base64,AAAAIGZ0eXBpc29tAAACAGlzb21pc28yYXZjMW1wNDEAAAAIZnJlZQAAAs1tZGF0AAACrgYF//+q3EXpvebZSLeWLNgg2SPu73gyNjQgLSBjb3JlIDE0OCByMjYwMSBhMGNkN2QzIC0gSC4yNjQvTVBFRy00IEFWQyBjb2RlYyAtIENvcHlsZWZ0IDIwMDMtMjAxNSAtIGh0dHA6Ly93d3cudmlkZW9sYW4ub3JnL3gyNjQuaHRtbCAtIG9wdGlvbnM6IGNhYmFjPTEgcmVmPTMgZGVibG9jaz0xOjA6MCBhbmFseXNlPTB4MzoweDExMyBtZT1oZXggc3VibWU9NyBwc3k9MSBwc3lfcmQ9MS4wMDowLjAwIG1peGVkX3JlZj0xIG1lX3JhbmdlPTE2IGNocm9tYV9tZT0xIHRyZWxsaXM9MSA4eDhkY3Q9MSBjcW09MCBkZWFkem9uZT0yMSwxMSBmYXN0X3Bza2lwPTEgY2hyb21hX3FwX29mZnNldD0tMiB0aHJlYWRzPTEgbG9va2FoZWFkX3RocmVhZHM9MSBzbGljZWRfdGhyZWFkcz0wIG5yPTAgZGVjaW1hdGU9MSBpbnRlcmxhY2VkPTAgYmx1cmF5X2NvbXBhdD0wIGNvbnN0cmFpbmVkX2ludHJhPTAgYmZyYW1lcz0zIGJfcHlyYW1pZD0yIGJfYWRhcHQ9MSBiX2JpYXM9MCBkaXJlY3Q9MSB3ZWlnaHRiPTEgb3Blbl9nb3A9MCB3ZWlnaHRwPTIga2V5aW50PTI1MCBrZXlpbnRfbWluPTEwIHNjZW5lY3V0PTQwIGludHJhX3JlZnJlc2g9MCByY19sb29rYWhlYWQ9NDAgcmM9Y3JmIG1idHJlZT0xIGNyZj0yMy4wIHFjb21wPTAuNjAgcXBtaW49MCBxcG1heD02OSBxcHN0ZXA9NCBpcF9yYXRpbz0xLjQwIGFxPTE6MS4wMACAAAAAD2WIhAA3//728P4FNjuZQQAAAu5tb292AAAAbG12aGQAAAAAAAAAAAAAAAAAAAPoAAAAZAABAAABAAAAAAAAAAAAAAAAAQAAAAAAAAAAAAAAAAAAAAEAAAAAAAAAAAAAAAAAAEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACAAACGHRyYWsAAABcdGtoZAAAAAMAAAAAAAAAAAAAAAEAAAAAAAAAZAAAAAAAAAAAAAAAAAAAAAAAAQAAAAAAAAAAAAAAAAAAAAEAAAAAAAAAAAAAAAAAAEAAAAAAAgAAAAIAAAAAACRlZHRzAAAAHGVsc3QAAAAAAAAAAQAAAGQAAAAAAAEAAAAAAZBtZGlhAAAAIG1kaGQAAAAAAAAAAAAAAAAAACgAAAAEAFXEAAAAAAAtaGRscgAAAAAAAAAAdmlkZQAAAAAAAAAAAAAAAFZpZGVvSGFuZGxlcgAAAAE7bWluZgAAABR2bWhkAAAAAQAAAAAAAAAAAAAAJGRpbmYAAAAcZHJlZgAAAAAAAAABAAAADHVybCAAAAABAAAA+3N0YmwAAACXc3RzZAAAAAAAAAABAAAAh2F2YzEAAAAAAAAAAQAAAAAAAAAAAAAAAAAAAAAAAgACAEgAAABIAAAAAAAAAAEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAY//8AAAAxYXZjQwFkAAr/4QAYZ2QACqzZX4iIhAAAAwAEAAADAFA8SJZYAQAGaOvjyyLAAAAAGHN0dHMAAAAAAAAAAQAAAAEAAAQAAAAAHHN0c2MAAAAAAAAAAQAAAAEAAAABAAAAAQAAABRzdHN6AAAAAAAAAsUAAAABAAAAFHN0Y28AAAAAAAAAAQAAADAAAABidWR0YQAAAFptZXRhAAAAAAAAACFoZGxyAAAAAAAAAABtZGlyYXBwbAAAAAAAAAAAAAAAAC1pbHN0AAAAJal0b28AAAAdZGF0YQAAAAEAAAAATGF2ZjU2LjQwLjEwMQ==";
    t.OggVideo = n, t.Mp4Video = o
}, function(e, t, n) {
    "use strict";
    Object.defineProperty(t, "__esModule", {
        value: !0
    }), t.initializeVimeoPlayer = t.initializeVimeoAPI = void 0;
    var o = n(84),
        i = n(85),
        r = void 0,
        a = "*",
        s = null,
        l = function() {
            return new Promise(function(e, t) {
                e("no api needed")
            })
        },
        c = function(e, t) {
            var n = {
                method: e
            };
            t && (n.value = t);
            var o = JSON.stringify(n);
            r.ownerDocument.defaultView.eval("(function(playerIframe){ playerIframe.contentWindow.postMessage(" + o + ", " + JSON.stringify(a) + ") })")(r)
        },
        u = function(e) {
            var t = e.win,
                n = e.instance,
                l = e.container,
                u = e.videoId,
                d = e.startTime,
                h = e.readyCallback,
                f = e.stateChangeCallback;
            return new Promise(function(e, p) {
                var A = n.logger || function() {};
                r = t.document.createElement("iframe"), r.id = "vimeoplayer";
                var g = "&background=1";
                r.src = "//player.vimeo.com/video/" + u + "?api=1" + g;
                var v = (0, o.getPlayerElement)(l);
                v.appendChild(r);
                var m = {
                    iframe: r,
                    setPlaybackRate: function() {}
                };
                e(m);
                var y = function() {
                        c("getDuration"), c("getVideoHeight"), c("getVideoWidth")
                    },
                    b = null,
                    w = function() {
                        var e = arguments.length > 0 && void 0 !== arguments[0] && arguments[0];
                        (e || m.dimensions.width && m.dimensions.height && m.duration) && (e && y(), m.dimensions.width = m.dimensions.width || m.iframe.parentNode.offsetWidth, m.dimensions.height = m.dimensions.height || m.iframe.parentNode.offsetHeight, m.duration = m.duration || 10, c("setVolume", "0"), c("setLoop", "true"), c("seekTo", d), c("addEventListener", "playProgress"), h(m))
                    },
                    T = function() {
                        s && (clearTimeout(s), s = null), m.dimensions || (m.dimensions = {}, y(), f("buffering"), b = setTimeout(function() {
                            A.call(n, "retrying"), w(!0)
                        }, .75 * i.TIMEOUT))
                    },
                    S = function(e) {
                        if (!/^https?:\/\/player.vimeo.com/.test(e.origin)) return !1;
                        a = e.origin;
                        var t = e.data;
                        switch ("string" == typeof t && (t = JSON.parse(t)), t.event) {
                            case "ready":
                                T(a);
                                break;
                            case "playProgress":
                            case "timeupdate":
                                b && (clearTimeout(b), b = null), f("playing", t), c("setVolume", "0"), t.data.percent >= .98 && d > 0 && c("seekTo", d)
                        }
                        switch (t.method) {
                            case "getVideoHeight":
                                A.call(n, t.method), m.dimensions.height = t.value, w();
                                break;
                            case "getVideoWidth":
                                A.call(n, t.method), m.dimensions.width = t.value, w();
                                break;
                            case "getDuration":
                                A.call(n, t.method), m.duration = t.value, d >= m.duration && (d = 0), w()
                        }
                    },
                    E = function(e) {
                        S(e)
                    };
                t.addEventListener("message", E, !1), m.destroy = function() {
                    t.removeEventListener("message", E), m.iframe.parentElement && m.iframe.parentElement.removeChild(m.iframe)
                }, s = setTimeout(function() {
                    p("Ran out of time")
                }, i.TIMEOUT)
            })
        };
    t.initializeVimeoAPI = l, t.initializeVimeoPlayer = u
}, function(e, t, n) {
    "use strict";

    function o(e) {
        return e && e.__esModule ? e : {
            default: e
        }
    }
    Object.defineProperty(t, "__esModule", {
        value: !0
    }), t.validatedImage = t.getVideoSource = t.getVideoID = t.getStartTime = t.getPlayerElement = t.findPlayerAspectRatio = void 0;
    var i = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e) {
            return typeof e
        } : function(e) {
            return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e
        },
        r = n(85),
        a = n(68),
        s = o(a),
        l = n(86),
        c = o(l),
        u = function(e) {
            var t = void 0,
                n = void 0;
            for (var o in e) {
                var r = e[o];
                if ("object" === ("undefined" == typeof r ? "undefined" : i(r)) && r.width && r.height) {
                    t = r.width, n = r.height;
                    break
                }
            }
            return {
                w: t,
                h: n
            }
        },
        d = function(e) {
            var t = void 0,
                n = void 0;
            return e.dimensions ? (t = e.dimensions.width, n = e.dimensions.height) : e.iframe && (t = e.iframe.clientWidth, n = e.iframe.clientHeight), {
                w: t,
                h: n
            }
        },
        h = {
            youtube: {
                parsePath: "query.t",
                timeRegex: /[hms]/,
                idRegex: r.YOUTUBE_REGEX,
                getDimensions: u
            },
            vimeo: {
                parsePath: null,
                timeRegex: /[#t=s]/,
                idRegex: r.VIMEO_REGEX,
                getDimensions: d
            }
        },
        f = function(e, t) {
            return h[t].parsePath ? (0, c.default)(e, h[t].parsePath) : null
        },
        p = function(e, t) {
            var n = new s.default(e, !0),
                o = f(n, t);
            if (o) {
                var i = o.split(h[t].timeRegex).filter(Boolean),
                    r = parseInt(i.pop(), 10) || 0,
                    a = 60 * parseInt(i.pop(), 10) || 0,
                    l = 3600 * parseInt(i.pop(), 10) || 0;
                return l + a + r
            }
        },
        A = function() {
            var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : r.DEFAULT_PROPERTY_VALUES.url,
                t = e.match(r.YOUTUBE_REGEX);
            return t && t[2].length ? "youtube" : (t = e.match(r.VIMEO_REGEX), t && t[2].length ? "vimeo" : void console.error("Video source " + e + " does not match supported types"))
        },
        g = function() {
            var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : r.DEFAULT_PROPERTY_VALUES.url,
                t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : null,
                n = e.match(h[t].idRegex);
            return n && n[2].length ? n[2] : void console.error("Video id at " + e + " is not valid")
        },
        v = function(e) {
            if (!e) return !1;
            var t = "IMG" === e.nodeName && e;
            return t || console.warn("Element is not a valid image element."), t
        },
        m = function(e, t, n) {
            var o = void 0,
                i = void 0;
            if (t) {
                var r = h[n].getDimensions(t);
                o = r.w, i = r.h
            }
            return o && i || (o = e.clientWidth, i = e.clientHeight, console.warn("No width and height found in " + n + " player " + t + ". Using container dimensions.")), parseInt(o, 10) / parseInt(i, 10)
        },
        y = function(e) {
            var t = e.querySelector("#player");
            return t || (t = e.ownerDocument.createElement("div"), t.id = "player", e.appendChild(t)), t.setAttribute("style", "position: absolute; top: 0; bottom: 0; left: 0; right: 0;"), t
        };
    t.findPlayerAspectRatio = m, t.getPlayerElement = y, t.getStartTime = p, t.getVideoID = g, t.getVideoSource = A, t.validatedImage = v
}, function(e, t) {
    "use strict";
    Object.defineProperty(t, "__esModule", {
        value: !0
    });
    var n = {
            enabled: !0,
            verbose: !1
        },
        o = {
            container: "body",
            url: "https://youtu.be/xkEmYQvJ_68",
            source: "youtube",
            fitMode: "fill",
            scaleFactor: 1,
            playbackSpeed: 1,
            filter: 1,
            filterStrength: 50,
            timeCode: {
                start: 0,
                end: null
            },
            DEBUG: n
        },
        i = 2500,
        r = /^.*(youtu\.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]{11}).*/,
        a = /^.*(vimeo\.com\/)([0-9]{7,}(#t\=.*s)?)/;
    t.DEBUG = n, t.DEFAULT_PROPERTY_VALUES = o, t.TIMEOUT = i, t.YOUTUBE_REGEX = r, t.VIMEO_REGEX = a
}, function(e, t) {
    (function(t) {
        function n(e, t) {
            return null == e ? void 0 : e[t]
        }

        function o(e) {
            var t = !1;
            if (null != e && "function" != typeof e.toString) try {
                t = !!(e + "")
            } catch (e) {}
            return t
        }

        function i(e) {
            var t = -1,
                n = e ? e.length : 0;
            for (this.clear(); ++t < n;) {
                var o = e[t];
                this.set(o[0], o[1])
            }
        }

        function r() {
            this.__data__ = ge ? ge(null) : {}
        }

        function a(e) {
            return this.has(e) && delete this.__data__[e]
        }

        function s(e) {
            var t = this.__data__;
            if (ge) {
                var n = t[e];
                return n === W ? void 0 : n
            }
            return ue.call(t, e) ? t[e] : void 0
        }

        function l(e) {
            var t = this.__data__;
            return ge ? void 0 !== t[e] : ue.call(t, e)
        }

        function c(e, t) {
            var n = this.__data__;
            return n[e] = ge && void 0 === t ? W : t, this
        }

        function u(e) {
            var t = -1,
                n = e ? e.length : 0;
            for (this.clear(); ++t < n;) {
                var o = e[t];
                this.set(o[0], o[1])
            }
        }

        function d() {
            this.__data__ = []
        }

        function h(e) {
            var t = this.__data__,
                n = T(t, e);
            if (n < 0) return !1;
            var o = t.length - 1;
            return n == o ? t.pop() : pe.call(t, n, 1), !0
        }

        function f(e) {
            var t = this.__data__,
                n = T(t, e);
            return n < 0 ? void 0 : t[n][1]
        }

        function p(e) {
            return T(this.__data__, e) > -1
        }

        function A(e, t) {
            var n = this.__data__,
                o = T(n, e);
            return o < 0 ? n.push([e, t]) : n[o][1] = t, this
        }

        function g(e) {
            var t = -1,
                n = e ? e.length : 0;
            for (this.clear(); ++t < n;) {
                var o = e[t];
                this.set(o[0], o[1])
            }
        }

        function v() {
            this.__data__ = {
                hash: new i,
                map: new(Ae || u),
                string: new i
            }
        }

        function m(e) {
            return k(this, e).delete(e)
        }

        function y(e) {
            return k(this, e).get(e)
        }

        function b(e) {
            return k(this, e).has(e)
        }

        function w(e, t) {
            return k(this, e).set(e, t), this
        }

        function T(e, t) {
            for (var n = e.length; n--;)
                if (N(e[n][0], t)) return n;
            return -1
        }

        function S(e, t) {
            t = C(t, e) ? [t] : I(t);
            for (var n = 0, o = t.length; null != e && n < o;) e = e[O(t[n++])];
            return n && n == o ? e : void 0
        }

        function E(e) {
            if (!F(e) || P(e)) return !1;
            var t = U(e) || o(e) ? he : ee;
            return t.test(R(e))
        }

        function x(e) {
            if ("string" == typeof e) return e;
            if (V(e)) return me ? me.call(e) : "";
            var t = e + "";
            return "0" == t && 1 / e == -H ? "-0" : t
        }

        function I(e) {
            return be(e) ? e : ye(e)
        }

        function k(e, t) {
            var n = e.__data__;
            return _(t) ? n["string" == typeof t ? "string" : "hash"] : n.map
        }

        function Y(e, t) {
            var o = n(e, t);
            return E(o) ? o : void 0
        }

        function C(e, t) {
            if (be(e)) return !1;
            var n = typeof e;
            return !("number" != n && "symbol" != n && "boolean" != n && null != e && !V(e)) || (q.test(e) || !Z.test(e) || null != t && e in Object(t))
        }

        function _(e) {
            var t = typeof e;
            return "string" == t || "number" == t || "symbol" == t || "boolean" == t ? "__proto__" !== e : null === e
        }

        function P(e) {
            return !!le && le in e
        }

        function O(e) {
            if ("string" == typeof e || V(e)) return e;
            var t = e + "";
            return "0" == t && 1 / e == -H ? "-0" : t
        }

        function R(e) {
            if (null != e) {
                try {
                    return ce.call(e)
                } catch (e) {}
                try {
                    return e + ""
                } catch (e) {}
            }
            return ""
        }

        function j(e, t) {
            if ("function" != typeof e || t && "function" != typeof t) throw new TypeError(G);
            var n = function() {
                var o = arguments,
                    i = t ? t.apply(this, o) : o[0],
                    r = n.cache;
                if (r.has(i)) return r.get(i);
                var a = e.apply(this, o);
                return n.cache = r.set(i, a), a
            };
            return n.cache = new(j.Cache || g), n
        }

        function N(e, t) {
            return e === t || e !== e && t !== t
        }

        function U(e) {
            var t = F(e) ? de.call(e) : "";
            return t == D || t == z
        }

        function F(e) {
            var t = typeof e;
            return !!e && ("object" == t || "function" == t)
        }

        function M(e) {
            return !!e && "object" == typeof e
        }

        function V(e) {
            return "symbol" == typeof e || M(e) && de.call(e) == Q
        }

        function B(e) {
            return null == e ? "" : x(e)
        }

        function L(e, t, n) {
            var o = null == e ? void 0 : S(e, t);
            return void 0 === o ? n : o
        }
        var G = "Expected a function",
            W = "__lodash_hash_undefined__",
            H = 1 / 0,
            D = "[object Function]",
            z = "[object GeneratorFunction]",
            Q = "[object Symbol]",
            Z = /\.|\[(?:[^[\]]*|(["'])(?:(?!\1)[^\\]|\\.)*?\1)\]/,
            q = /^\w*$/,
            J = /^\./,
            X = /[^.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(?:\.|\[\])(?:\.|\[\]|$))/g,
            K = /[\\^$.*+?()[\]{}|]/g,
            $ = /\\(\\)?/g,
            ee = /^\[object .+?Constructor\]$/,
            te = "object" == typeof t && t && t.Object === Object && t,
            ne = "object" == typeof self && self && self.Object === Object && self,
            oe = te || ne || Function("return this")(),
            ie = Array.prototype,
            re = Function.prototype,
            ae = Object.prototype,
            se = oe["__core-js_shared__"],
            le = function() {
                var e = /[^.]+$/.exec(se && se.keys && se.keys.IE_PROTO || "");
                return e ? "Symbol(src)_1." + e : ""
            }(),
            ce = re.toString,
            ue = ae.hasOwnProperty,
            de = ae.toString,
            he = RegExp("^" + ce.call(ue).replace(K, "\\$&").replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, "$1.*?") + "$"),
            fe = oe.Symbol,
            pe = ie.splice,
            Ae = Y(oe, "Map"),
            ge = Y(Object, "create"),
            ve = fe ? fe.prototype : void 0,
            me = ve ? ve.toString : void 0;
        i.prototype.clear = r, i.prototype.delete = a, i.prototype.get = s, i.prototype.has = l, i.prototype.set = c, u.prototype.clear = d, u.prototype.delete = h, u.prototype.get = f, u.prototype.has = p, u.prototype.set = A, g.prototype.clear = v, g.prototype.delete = m, g.prototype.get = y, g.prototype.has = b, g.prototype.set = w;
        var ye = j(function(e) {
            e = B(e);
            var t = [];
            return J.test(e) && t.push(""), e.replace(X, function(e, n, o, i) {
                t.push(o ? i.replace($, "$1") : n || e)
            }), t
        });
        j.Cache = g;
        var be = Array.isArray;
        e.exports = L
    }).call(t, function() {
        return this
    }())
}, function(e, t, n) {
    "use strict";
    Object.defineProperty(t, "__esModule", {
        value: !0
    }), t.initializeYouTubePlayer = t.initializeYouTubeAPI = void 0;
    var o = n(84),
        i = function(e) {
            return new Promise(function(t, n) {
                if (e.document.documentElement.querySelector('script[src*="www.youtube.com/iframe_api"].loaded')) return void t("already loaded");
                var o = e.document.createElement("script");
                o.src = "https://www.youtube.com/iframe_api";
                var i = e.document.getElementsByTagName("script")[0];
                i.parentNode.insertBefore(o, i), o.addEventListener("load", function(e) {
                    e.currentTarget.classList.add("loaded"), t("api script tag created and loaded")
                }, !0), o.addEventListener("error", function(e) {
                    n("Failed to load YouTube script: ", e)
                })
            })
        },
        r = function(e, t) {
            var n = e.target;
            n.iframe = n.getIframe(), n.mute(), n.ready = !0, n.seekTo(t < n.getDuration() ? t : 0), n.playVideo()
        },
        a = function(e, t, n) {
            var o = arguments.length > 3 && void 0 !== arguments[3] ? arguments[3] : 1,
                i = e.target,
                r = (i.getDuration() - t) / o,
                a = function e() {
                    i.getCurrentTime() + .1 >= i.getDuration() && (i.pauseVideo(), i.seekTo(t), i.playVideo()), requestAnimationFrame(e)
                };
            return e.data === n.YT.PlayerState.BUFFERING && 1 !== i.getVideoLoadedFraction() && (0 === i.getCurrentTime() || i.getCurrentTime() > r - -.1) ? "buffering" : e.data === n.YT.PlayerState.PLAYING ? (requestAnimationFrame(a), "playing") : void(e.data === n.YT.PlayerState.ENDED && i.playVideo())
        },
        s = function(e) {
            var t = e.container,
                n = e.win,
                i = e.videoId,
                s = e.startTime,
                l = e.speed,
                c = e.readyCallback,
                u = e.stateChangeCallback,
                d = (0, o.getPlayerElement)(t),
                h = function() {
                    return new n.YT.Player(d, {
                        videoId: i,
                        playerVars: {
                            autohide: 1,
                            autoplay: 0,
                            controls: 0,
                            enablejsapi: 1,
                            iv_load_policy: 3,
                            loop: 0,
                            modestbranding: 1,
                            playsinline: 1,
                            rel: 0,
                            showinfo: 0,
                            wmode: "opaque"
                        },
                        events: {
                            onReady: function(e) {
                                r(e, s), c(e.target)
                            },
                            onStateChange: function(e) {
                                var t = a(e, s, n, l);
                                u(t, t)
                            }
                        }
                    })
                };
            return new Promise(function(e, t) {
                var o = function t() {
                    1 === n.YT.loaded ? e(h()) : setTimeout(t, 100)
                };
                o()
            })
        };
    t.initializeYouTubeAPI = i, t.initializeYouTubePlayer = s
}, function(e, t) {
    "use strict";
    Object.defineProperty(t, "__esModule", {
        value: !0
    });
    var n = ["none", "blur", "brightness", "contrast", "invert", "opacity", "saturate", "sepia", "drop-shadow", "grayscale", "hue-rotate"],
        o = {
            blur: {
                modifier: function(e) {
                    return .3 * e
                },
                unit: "px"
            },
            brightness: {
                modifier: function(e) {
                    return .009 * e + .1
                },
                unit: ""
            },
            contrast: {
                modifier: function(e) {
                    return .4 * e + 80
                },
                unit: "%"
            },
            grayscale: {
                modifier: function(e) {
                    return e
                },
                unit: "%"
            },
            "hue-rotate": {
                modifier: function(e) {
                    return 3.6 * e
                },
                unit: "deg"
            },
            invert: {
                modifier: function(e) {
                    return 1
                },
                unit: ""
            },
            opacity: {
                modifier: function(e) {
                    return e
                },
                unit: "%"
            },
            saturate: {
                modifier: function(e) {
                    return 2 * e
                },
                unit: "%"
            },
            sepia: {
                modifier: function(e) {
                    return e
                },
                unit: "%"
            }
        };
    t.filterOptions = n, t.filterProperties = o
}, function(e, t) {
    var n = function(e) {
        var t = {
            container: e
        };
        return e.getAttribute("data-config-url") && (t.url = e.getAttribute("data-config-url")), e.getAttribute("data-config-playback-speed") && (t.playbackSpeed = e.getAttribute("data-config-playback-speed")), e.getAttribute("data-config-filter") && (t.filter = e.getAttribute("data-config-filter")), e.getAttribute("data-config-filter-strength") && (t.filterStrength = e.getAttribute("data-config-filter-strength")), t
    };
    e.exports = n
}, function(e, t) {
    var n = function(e, t, n) {
        t = t || 100, n = n || Y.Template.Site, e && (this._timeout && this._timeout.cancel(), this._timeout = Y.later(t, n, e))
    };
    e.exports = n
}, function(e, t, n) {
    var o = n(90);
    Y.use("node", function(e) {
        e.namespace("Template").Authenticated = Singleton.create({
            ready: function() {
                this.bindUI()
            },
            bindUI: function() {
                var t = e.one("body.transparent-header");
                t && (t = t.getDOMNode(), ["sqs-stacked-items-dom-deleted", "sqs-stacked-items-dom-reorder"].forEach(function(n) {
                    e.config.win.addEventListener(n, function(e) {
                        document.querySelector("#content > div").classList.contains("no-main-image") ? t.classList.remove("has-banner-image") : t.classList.add("has-banner-image")
                    }.bind(this))
                }.bind(this))), e.Global.on("tweak:beforeopen", function(t) {
                    setTimeout(function() {
                        e.one(window).simulate("resize")
                    }, 500)
                }), e.Global.on(["tweak:save", "tweak:discard", "tweak:beforeopen"], function(t) {
                    e.one(".always-use-overlay-nav") && e.one("#mobileNavToggle").set("checked", !1).simulate("change")
                }), e.Global.on("tweak:discard", function(e) {}), e.Global.on("tweak:close", function(t) {
                    setTimeout(function() {
                        e.one(window).simulate("resize")
                    }, 500), e.one("#header.tweaking") && e.one("#header.tweaking").removeClass("tweaking")
                }), e.Global.on("tweak:aftershow", function(t) {
                    e.Template.noYUI.vCenterTopSectionContent(), e.Template.Site.runCenterNav()
                }, this), e.Global.on("tweak:change", function(t) {
                    var n = t.getName(),
                        i = t.getValue();
                    "string" == typeof i && (i = i.toLowerCase(), i = i.replace(" ", "-")), "siteTitleContainerWidth" != n && "logoWidth" != n || (e.one("#header").addClass("tweaking"), o(function() {
                        e.one("#header").removeClass("tweaking")
                    }, 500)), "design" == n && e.Template.Site.regularHeaderForGridGallery(), e.one(".always-use-overlay-nav") && ("nav-font" != n && "navColor" != n && "navActiveColor" != n && "expand-homepage-index-links" != n || e.one("#mobileNavToggle").set("checked", !0).simulate("change")), "always-use-overlay-nav" == n && (e.Template.Site.injectScrollNavContent(), e.Template.noYUI.vCenterTopSectionContent(), e.Template.Site.runCenterNav()), "siteTitleContainerWidth" != n && "logoWidth" != n && "nav-font" != n && "expand-homepage-index-links" != n || e.later(140, this, function() {
                        e.Template.noYUI.vCenterTopSectionContent(), e.Template.Site.runCenterNav()
                    }), "transparent-header" == n && o(function() {
                        e.Template.helper.imgLoad()
                    })
                })
            }
        })
    })
}]);