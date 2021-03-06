"use strict";

function init() {
    var n = require("../dist/lib/react.js"),
        e = require("../dist/lib/react-dom.js"),
        i = require("../dist/common/loadInit/init.js"),
        o = require("../dist/components/ContainController.js"),
        t = require("../dist/common/proxy/startProxy.js"),
        r = require("../dist/actions/windowActions.js"),
        s = require("../dist/actions/webviewActions.js"),
        u = require("../dist/stores/webviewStores.js"),
        d = require("../dist/common/log/log.js"),
        c = require("../dist/common/shortCut/shortCut.js"),
        l = global.appConfig.isDev;
    if ("darwin" === process.platform) {
        var a = require("../dist/common/menu/menu.js");
        nw.Window.get().menu = a
    }
    nw.App.on("open", function(n) {
        var e = tools.getArgsURL(n);
        if (e) {
            d.info("index.js Reopen App with url: " + e);
            var i = u.getCurrentWebviewID();
            s.getA8keyWebview(i, { url: e, isSync: !0, from: "urlbar" })
        }
        nw.Window.get().focus()
    }), nw.App.argv.indexOf("inspect") !== -1 && tools.openInspectWin();
    var w = tools.getArgsURL(nw.App.argv);
    w && (d.info("index.js Open App with url: " + w), s.setInitURL(w)), c.register(), global.weinreWin = {};
    var p = void 0;
    window.addEventListener("resize", function() { p = setTimeout(function() { clearTimeout(p), r.resize(document.body.offsetHeight) }, 20) }), window.addEventListener("keydown", function(n) {
        var e = n.keyCode;
        123 === e && (r.changeDevtools(), n.preventDefault())
    }), !l && window.addEventListener("contextmenu", function(n) { n.preventDefault() }), Win.on("focus", function() { r.focus(), c.register() }), Win.on("blur", function() { r.blur(), c.unRegister() }), Win.on("navigation", function(n, e, i) { d.info("index.js navigation " + e + " ignore"), nw.Shell.openExternal(e), i.ignore() }), Win.on("new-win-policy", function(n, e, i) { d.info("index.js new-win-policy " + e + " ignore"), i.ignore() }), Win.on("close", function() { d.info("index.js close"), process.exit() }), Win.setMinimumSize(nw.App.manifest.window.width, nw.App.manifest.window.height), t(function(t) {
        i(), d.info("index.js init proxy with " + t + " success!!");
        var s = function() { r.resize(document.body.offsetHeight), e.render(n.createElement(o, null), document.querySelector("#container")) };
        "complete" === document.readyState ? s() : window.addEventListener("load", s)
    })
}
var tools = require("../dist/utils/tools.js"),
    Win = nw.Window.get();
global.Win = Win, global.appConfig = tools.getAppConfig(), global.contentDocument = document, global.contentDocumentBody = document.body, global.contentWindow = window, tools.up(init);
