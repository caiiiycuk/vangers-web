(this.webpackJsonpsurweb=this.webpackJsonpsurweb||[]).push([[0],{10:function(e,_,t){"use strict";t.d(_,"f",(function(){return n})),t.d(_,"b",(function(){return r})),t.d(_,"d",(function(){return a})),t.d(_,"e",(function(){return c})),t.d(_,"a",(function(){return i})),t.d(_,"c",(function(){return s}));var n="thechain/mirage/world.ini",r="thechain/mirage/harmony.pal",a="thechain/mirage/output.vmp",c="thechain/mirage/output.vpr",i="bitmap/",s="shape3d/"},102:function(e,_,t){},130:function(e,_,t){},131:function(e,_,t){},132:function(e,_,t){"use strict";t.r(_);var n=t(0),r=t.n(n),a=t(11),c=t.n(a),i=(t(101),t(102),t(14)),s=t(5),o=t(6),l=t(18),u=t(15),d=t(13),b=(t(31),t(1));function O(e){var _=Object(n.useState)("mirage"),t=Object(s.a)(_,2),r=t[0],a=t[1],c=Object(n.useState)(10),i=Object(s.a)(c,2),l=i[0],u=i[1],d=Object(n.useState)(50),O=Object(s.a)(d,2),j=O[0],m=O[1],E=Object(n.useState)(2),h=Object(s.a)(E,2),f=h[0],M=h[1],x=Object(n.useState)(1),P=Object(s.a)(x,2),D=P[0],w=P[1],v=Object(n.useState)(p),R=Object(s.a)(v,2),g=R[0],T=R[1];return Object(b.jsx)("div",{children:Object(b.jsx)("div",{children:Object(b.jsxs)(o.c,{children:[Object(b.jsx)("h5",{children:"Generate World"}),Object(b.jsx)("p",{children:"Options"}),Object(b.jsxs)("div",{className:"open-inputs",children:[Object(b.jsxs)("div",{children:[Object(b.jsx)("label",{className:"open-left-label",children:"Palette"}),Object(b.jsx)(o.g,{minimal:!1,options:["ark-a-znoy","boozeena","fostral","glorx","hmok","knox","necross","threall","weexow","xplo","mirage"],onChange:function(e){return a(e.currentTarget.value)},value:r})]}),Object(b.jsxs)("div",{className:"in-a-row",children:[Object(b.jsxs)("label",{className:"open-left-label",children:["World size (",l,":",Math.pow(2,l),")"]}),Object(b.jsx)(o.j,{className:"short-input",min:10,max:14,value:l,onValueChange:u})]}),Object(b.jsxs)("div",{className:"in-a-row",children:[Object(b.jsxs)("label",{className:"open-left-label",children:["Mesh Value (",j,")"]}),Object(b.jsx)(o.j,{className:"short-input",min:1,max:200,value:j,onValueChange:m})]}),Object(b.jsxs)("div",{className:"in-a-row",children:[Object(b.jsxs)("label",{className:"open-left-label",children:["Noise Amplitude (",f,")"]}),Object(b.jsx)(o.j,{className:"short-input",min:1,max:10,value:f,onValueChange:M})]}),Object(b.jsxs)("div",{className:"in-a-row",children:[Object(b.jsxs)("label",{className:"open-left-label",children:["Terain Type (",D,")"]}),Object(b.jsx)(o.j,{className:"short-input",min:0,max:7,value:D,onValueChange:w})]}),Object(b.jsx)("div",{children:Object(b.jsx)(o.b,{onClick:function(){var _="[Global Parameters]\nMap Power X=11\nMap Power Y=".concat(l,"\nGeoNet Power=6\nSection Size Power=8\nMinimal Square Power=4\n\n").concat(g,"\n\n[Creation Parameters]\nBuild Scenario File=output.vsc\nMesh Value=").concat(j,"\nNoise Amplitude=").concat(f,"\nDefault Terrain Type=").concat(D,"\n");e.openGen(r,_,l)},children:"Generate World"})}),Object(b.jsxs)("div",{children:[Object(b.jsx)("label",{className:"open-left-label",children:"Additional params"}),Object(b.jsx)("br",{}),Object(b.jsx)(o.n,{className:"open-textarea",large:!1,growVertically:!0,value:g,onChange:function(e){return T(e.target.value)}})]})]})]})})})}var p="[Storage]\nVersion=1.4\nCompressed Format Using=0\nFile Name=output\nPalette File=harmony.pal\n\n[Rendering Parameters]\nShadow Offsets= 6 16 4 9 6 3 2 6\nHeight Shifts=  2 4 8 8 5 6 8 6\nBegin Colors=   1 32 64 72 88 104 112 120\nEnd Colors=    31 63 71 87 103 111 119 127\n\n[Dynamic Palette]\nWave Terrain=0\nTerrain Number=3\nTerrains= 5 4 6\nSpeeds= 128 128 256\nAmplitudes= 32 8 32\nRed= 1 1 1\nGreen= 0 1 1\nBlue= 0 0 0\n\n[Lighting Cycle Dynamic Palette]\nWave Terrain=0\nTerrain Number=3\nTerrains= 5 4 6\nSpeeds= 128 128 256\nAmplitudes= 32 8 32\nRed= 1 1 1\nGreen= 0 1 1\nBlue= 0 0 0\n",j=t(8),m=t.n(j),E=t(12);function h(e){var _=Object(n.useState)(void 0),t=Object(s.a)(_,2),r=t[0],a=t[1],c=Object(n.useState)(!1),i=Object(s.a)(c,2),l=i[0],u=i[1];function d(){return(d=Object(E.a)(m.a.mark((function _(){var t;return m.a.wrap((function(_){for(;;)switch(_.prev=_.next){case 0:if(void 0!==r&&!l){_.next=2;break}return _.abrupt("return");case 2:return u(!0),_.next=5,f(r);case 5:t=_.sent,e.openZip(t);case 7:case"end":return _.stop()}}),_)})))).apply(this,arguments)}return Object(b.jsx)("div",{children:Object(b.jsxs)(o.c,{children:[Object(b.jsx)("h5",{children:"Restore world from ZIP"}),Object(b.jsxs)("ul",{children:[Object(b.jsx)("li",{children:Object(b.jsx)("a",{href:"worlds/satadi.zip",children:"satadi.zip"})}),Object(b.jsx)("li",{children:Object(b.jsx)("a",{href:"worlds/empty.zip",children:"empty.zip"})}),Object(b.jsx)("li",{children:Object(b.jsx)("a",{href:"worlds/ark-a-znoy.zip",children:"ark-a-znoy.zip"})}),Object(b.jsx)("li",{children:Object(b.jsx)("a",{href:"worlds/boozeena.zip",children:"boozeena.zip"})}),Object(b.jsx)("li",{children:Object(b.jsx)("a",{href:"worlds/fostral.zip",children:"fostral.zip"})}),Object(b.jsx)("li",{children:Object(b.jsx)("a",{href:"worlds/glorx.zip",children:"glorx.zip"})}),Object(b.jsx)("li",{children:Object(b.jsx)("a",{href:"worlds/hmok.zip",children:"hmok.zip"})}),Object(b.jsx)("li",{children:Object(b.jsx)("a",{href:"worlds/khox.zip",children:"khox.zip"})}),Object(b.jsx)("li",{children:Object(b.jsx)("a",{href:"worlds/necross.zip",children:"necross.zip"})}),Object(b.jsx)("li",{children:Object(b.jsx)("a",{href:"worlds/threall.zip",children:"threall.zip"})}),Object(b.jsx)("li",{children:Object(b.jsx)("a",{href:"worlds/weexow.zip",children:"weexow.zip"})}),Object(b.jsx)("li",{children:Object(b.jsx)("a",{href:"worlds/xplo.zip",children:"xplo.zip"})})]}),Object(b.jsxs)("div",{className:"open-inputs",children:[Object(b.jsx)(o.f,{hasSelection:void 0!==r,text:r?r.name:"Select 'zip' File",onChange:function(e){a(e.target.files[0])}}),Object(b.jsx)(o.b,{disabled:!r||l,onClick:function(){return d.apply(this,arguments)},children:"Restore"})]})]})})}function f(e){return M.apply(this,arguments)}function M(){return(M=Object(E.a)(m.a.mark((function e(_){var t;return m.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return t=new FileReader,e.abrupt("return",new Promise((function(e,n){t.addEventListener("load",(function(_){e(new Uint8Array(t.result))})),t.readAsArrayBuffer(_)})));case 2:case"end":return e.stop()}}),e)})))).apply(this,arguments)}function x(e){var _=Object(n.useState)(""),t=Object(s.a)(_,2),r=t[0],a=t[1];return Object(b.jsxs)("div",{className:"landing-menu",children:[Object(b.jsx)(o.i,{children:Object(b.jsxs)(o.i.Group,{align:l.a.LEFT,children:[Object(b.jsx)(o.i.Heading,{children:"SurWeb"}),Object(b.jsx)(o.i.Divider,{}),Object(b.jsx)(o.i.Heading,{children:Object(b.jsx)("a",{href:"https://caiiiycuk.github.io/vangers-web/",children:"vangers-web"})})]})}),Object(b.jsxs)(o.d,{className:"root-card",interactive:!0,elevation:u.a.TWO,children:[Object(b.jsxs)("div",{className:"start-options",children:[Object(b.jsx)("div",{className:"open-option",children:Object(b.jsx)(o.a,{minimal:!0,intent:d.a.PRIMARY,onClick:function(){return e.openLastSession()},children:"Open SurWeb last session"})}),Object(b.jsx)("div",{className:"open-or",children:"OR"}),"gen"!==r?Object(b.jsx)("div",{className:"open-option",children:Object(b.jsx)(o.a,{intent:d.a.PRIMARY,minimal:!0,onClick:function(){return a("zip")},children:"Restore from ZIP"})}):null,Object(b.jsx)(o.e,{isOpen:"zip"===r,children:Object(b.jsx)(h,Object(i.a)({},e))}),Object(b.jsx)("div",{className:"open-or",children:"OR"}),"gen"!==r?Object(b.jsx)("div",{className:"open-option",children:Object(b.jsx)(o.a,{intent:d.a.PRIMARY,minimal:!0,onClick:function(){return a("gen")},children:"Generate world"})}):null,Object(b.jsx)(o.e,{isOpen:"gen"===r,children:Object(b.jsx)(O,Object(i.a)({},e))}),Object(b.jsx)("div",{className:"open-or",children:"ADVANCED"}),Object(b.jsx)(o.b,{minimal:!0,intent:d.a.PRIMARY,onClick:P,children:"CLEAR SURWEB FS"})]}),Object(b.jsxs)("div",{className:"tutorials",children:[Object(b.jsx)("h1",{children:"Tutorials"}),Object(b.jsx)("iframe",{width:"560",height:"315",src:"https://www.youtube.com/embed/YzZesk81SnQ",title:"YouTube video player",frameBorder:"0",allow:"accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture",allowFullScreen:!0}),Object(b.jsx)("iframe",{width:"560",height:"315",src:"https://www.youtube.com/embed/UPOkIhhQa1Q",title:"YouTube video player",frameBorder:"0",allow:"accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture",allowFullScreen:!0})]})]})]})}function P(){if("undefined"!==typeof indexedDB){var e=indexedDB.deleteDatabase("/idbfs");e.onsuccess=function(){alert("Ok")},e.onerror=function(e){alert("Error occured, look logs for details"),console.error(e)}}else alert("Unable to access indexedDB")}var D=t(49);function w(){var e=Object(n.useState)(""),_=Object(s.a)(e,2),t=_[0],r=_[1],a=Object(n.useState)(null),c=Object(s.a)(a,2),o=c[0],l=c[1],u=Object(n.useState)(null),d=Object(s.a)(u,2),O=d[0],p=d[1],j={route:t,gen:o,openGen:function(e,_,t){l({palette:e,worldIni:_,size:t}),r("gen")},zip:O,openZip:function(e){p(e),r("zip")},openLastSession:function(){r("lastSession")},setVmp:function(e){},getVmp:function(){}};return t.length>0?Object(b.jsx)(D.a,Object(i.a)({},j)):Object(b.jsx)(x,Object(i.a)({},j))}c.a.render(Object(b.jsx)(r.a.StrictMode,{children:Object(b.jsx)(w,{})}),document.getElementById("root"))},21:function(e,_,t){"use strict";t.d(_,"a",(function(){return c}));var n=t(8),r=t.n(n),a=t(12);function c(e,_){return i.apply(this,arguments)}function i(){return(i=Object(a.a)(r.a.mark((function e(_,t){return r.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.abrupt("return",new Promise((function(e,n){var r=new XMLHttpRequest;r.open("GET",_,!0),r.overrideMimeType("text/plain; charset=x-user-defined"),r.addEventListener("error",(function(e){n(new Error("Network error, can't download "+_))})),r.addEventListener("abort",(function(){n(new Error("Request canceled for url "+_))}),!1),r.responseType="arraybuffer",r.onreadystatechange=function(){4===r.readyState&&(200===r.status?(void 0!==t&&t(100),e(new Uint8Array(r.response))):n(new Error("Network error, can't download "+_)))},void 0!==t&&(r.onprogress=function(e){if(e.total&&e.total>0){var _=Math.round(1e4*e.loaded/e.total)/100;t(_)}}),r.send()})));case 1:case"end":return e.stop()}}),e)})))).apply(this,arguments)}},31:function(e,_,t){},49:function(module,__webpack_exports__,__webpack_require__){"use strict";__webpack_require__.d(__webpack_exports__,"a",(function(){return SurWeb}));var _Volumes_macext_caiiiycuk_vangers_web_surweb_node_modules_babel_preset_react_app_node_modules_babel_runtime_helpers_esm_objectSpread2__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__(14),_Volumes_macext_caiiiycuk_vangers_web_surweb_node_modules_babel_preset_react_app_node_modules_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__(8),_Volumes_macext_caiiiycuk_vangers_web_surweb_node_modules_babel_preset_react_app_node_modules_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_1___default=__webpack_require__.n(_Volumes_macext_caiiiycuk_vangers_web_surweb_node_modules_babel_preset_react_app_node_modules_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_1__),_Volumes_macext_caiiiycuk_vangers_web_surweb_node_modules_babel_preset_react_app_node_modules_babel_runtime_helpers_esm_asyncToGenerator__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__(12),_Volumes_macext_caiiiycuk_vangers_web_surweb_node_modules_babel_preset_react_app_node_modules_babel_runtime_helpers_esm_slicedToArray__WEBPACK_IMPORTED_MODULE_3__=__webpack_require__(5),_blueprintjs_core__WEBPACK_IMPORTED_MODULE_4__=__webpack_require__(6),_blueprintjs_core__WEBPACK_IMPORTED_MODULE_5__=__webpack_require__(18),_blueprintjs_core__WEBPACK_IMPORTED_MODULE_6__=__webpack_require__(13),react__WEBPACK_IMPORTED_MODULE_7__=__webpack_require__(0),react__WEBPACK_IMPORTED_MODULE_7___default=__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_7__),_ron__WEBPACK_IMPORTED_MODULE_8__=__webpack_require__(50),_surweb_css__WEBPACK_IMPORTED_MODULE_9__=__webpack_require__(131),_surweb_css__WEBPACK_IMPORTED_MODULE_9___default=__webpack_require__.n(_surweb_css__WEBPACK_IMPORTED_MODULE_9__),_xhr__WEBPACK_IMPORTED_MODULE_10__=__webpack_require__(21),_config__WEBPACK_IMPORTED_MODULE_11__=__webpack_require__(10),react_jsx_runtime__WEBPACK_IMPORTED_MODULE_12__=__webpack_require__(1),react_jsx_runtime__WEBPACK_IMPORTED_MODULE_12___default=__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_12__),WIDTH=1280,HEIGHT=720;function SurWeb(e){var _=Object(react__WEBPACK_IMPORTED_MODULE_7__.useState)((function(){var e={};return window.module=e,e}))[0],t=Object(react__WEBPACK_IMPORTED_MODULE_7__.useRef)(null),n=Object(react__WEBPACK_IMPORTED_MODULE_7__.useState)(null),r=Object(_Volumes_macext_caiiiycuk_vangers_web_surweb_node_modules_babel_preset_react_app_node_modules_babel_runtime_helpers_esm_slicedToArray__WEBPACK_IMPORTED_MODULE_3__.a)(n,2),a=r[0],c=r[1],i=Object(react__WEBPACK_IMPORTED_MODULE_7__.useState)(0),s=Object(_Volumes_macext_caiiiycuk_vangers_web_surweb_node_modules_babel_preset_react_app_node_modules_babel_runtime_helpers_esm_slicedToArray__WEBPACK_IMPORTED_MODULE_3__.a)(i,2),o=s[0],l=s[1],u=Object(react__WEBPACK_IMPORTED_MODULE_7__.useState)(null),d=Object(_Volumes_macext_caiiiycuk_vangers_web_surweb_node_modules_babel_preset_react_app_node_modules_babel_runtime_helpers_esm_slicedToArray__WEBPACK_IMPORTED_MODULE_3__.a)(u,2),b=d[0],O=d[1],p=Object(react__WEBPACK_IMPORTED_MODULE_7__.useState)(!1),j=Object(_Volumes_macext_caiiiycuk_vangers_web_surweb_node_modules_babel_preset_react_app_node_modules_babel_runtime_helpers_esm_slicedToArray__WEBPACK_IMPORTED_MODULE_3__.a)(p,2),m=j[0],E=j[1],h=Object(react__WEBPACK_IMPORTED_MODULE_7__.useState)(null),f=Object(_Volumes_macext_caiiiycuk_vangers_web_surweb_node_modules_babel_preset_react_app_node_modules_babel_runtime_helpers_esm_slicedToArray__WEBPACK_IMPORTED_MODULE_3__.a)(h,2),M=f[0],x=f[1],P=Object(react__WEBPACK_IMPORTED_MODULE_7__.useState)(0),D=Object(_Volumes_macext_caiiiycuk_vangers_web_surweb_node_modules_babel_preset_react_app_node_modules_babel_runtime_helpers_esm_slicedToArray__WEBPACK_IMPORTED_MODULE_3__.a)(P,2),w=D[0],v=D[1],R=Object(react__WEBPACK_IMPORTED_MODULE_7__.useState)(null),g=Object(_Volumes_macext_caiiiycuk_vangers_web_surweb_node_modules_babel_preset_react_app_node_modules_babel_runtime_helpers_esm_slicedToArray__WEBPACK_IMPORTED_MODULE_3__.a)(R,2),T=g[0],A=g[1],C=Object(react__WEBPACK_IMPORTED_MODULE_7__.useState)(!1),L=Object(_Volumes_macext_caiiiycuk_vangers_web_surweb_node_modules_babel_preset_react_app_node_modules_babel_runtime_helpers_esm_slicedToArray__WEBPACK_IMPORTED_MODULE_3__.a)(C,2),y=L[0],U=L[1];function I(e){null!==M&&URL.revokeObjectURL(M);var _=new Blob([e],{type:"application/zip"}),t=URL.createObjectURL(_);x(t)}return Object(react__WEBPACK_IMPORTED_MODULE_7__.useEffect)((function(){function e(){return(e=Object(_Volumes_macext_caiiiycuk_vangers_web_surweb_node_modules_babel_preset_react_app_node_modules_babel_runtime_helpers_esm_asyncToGenerator__WEBPACK_IMPORTED_MODULE_2__.a)(_Volumes_macext_caiiiycuk_vangers_web_surweb_node_modules_babel_preset_react_app_node_modules_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_1___default.a.mark((function e(){var _,t,n,r,a,c;return _Volumes_macext_caiiiycuk_vangers_web_surweb_node_modules_babel_preset_react_app_node_modules_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_1___default.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,Promise.all([Object(_xhr__WEBPACK_IMPORTED_MODULE_10__.a)("surmap/bin.data.js",l),Object(_xhr__WEBPACK_IMPORTED_MODULE_10__.a)("surmap/bin.data",l),Object(_xhr__WEBPACK_IMPORTED_MODULE_10__.a)("surmap/surmap.wasm"),Object(_xhr__WEBPACK_IMPORTED_MODULE_10__.a)("surmap/surmap.js")]);case 2:_=e.sent,t=Object(_Volumes_macext_caiiiycuk_vangers_web_surweb_node_modules_babel_preset_react_app_node_modules_babel_runtime_helpers_esm_slicedToArray__WEBPACK_IMPORTED_MODULE_3__.a)(_,4),n=t[0],r=t[1],a=t[2],c=t[3],O({dataJs:n,data:r,wasm:a,wasmJs:c});case 9:case"end":return e.stop()}}),e)})))).apply(this,arguments)}(function(){return e.apply(this,arguments)})().catch(console.error)}),[]),Object(react__WEBPACK_IMPORTED_MODULE_7__.useEffect)((function(){if(null!==t.current){var e=t.current,_=e.parentElement.getBoundingClientRect();c(e),e.width=WIDTH,e.height=HEIGHT,resizeCanvas(e,_.width,_.height)}}),[t]),Object(react__WEBPACK_IMPORTED_MODULE_7__.useEffect)((function(){null!==a&&null!==b&&instantiateWasm(a,b,_,I,(function(e){return function(e,_){var t=new Blob([_],{type:"image/png"}),n=document.createElement("a");n.href=window.URL.createObjectURL(t),n.download=e,n.click()}("poster.png",e)}),e).then((function(){return E(!0)})).catch(console.error)}),[a,b,_]),Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_12__.jsxs)("div",{className:"surweb-container",children:[Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_12__.jsx)(_blueprintjs_core__WEBPACK_IMPORTED_MODULE_4__.i,{children:Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_12__.jsxs)(_blueprintjs_core__WEBPACK_IMPORTED_MODULE_4__.i.Group,{align:_blueprintjs_core__WEBPACK_IMPORTED_MODULE_5__.a.LEFT,children:[Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_12__.jsx)(_blueprintjs_core__WEBPACK_IMPORTED_MODULE_4__.i.Heading,{children:Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_12__.jsx)(_blueprintjs_core__WEBPACK_IMPORTED_MODULE_4__.a,{intent:_blueprintjs_core__WEBPACK_IMPORTED_MODULE_6__.a.PRIMARY,minimal:!0,onClick:function(){return window.location.reload()},children:"SurWeb"})}),Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_12__.jsx)(_blueprintjs_core__WEBPACK_IMPORTED_MODULE_4__.i.Divider,{}),m?Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_12__.jsxs)("div",{className:"file-container",children:[Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_12__.jsx)(_blueprintjs_core__WEBPACK_IMPORTED_MODULE_4__.f,{disabled:null!==T,text:"Add file",onInputChange:function(e){null===a||void 0===a||a.focus();var t=e.currentTarget.files;if(0!==t.length){var n=t[0],r=new FileReader;r.addEventListener("load",function(){var e=Object(_Volumes_macext_caiiiycuk_vangers_web_surweb_node_modules_babel_preset_react_app_node_modules_babel_runtime_helpers_esm_asyncToGenerator__WEBPACK_IMPORTED_MODULE_2__.a)(_Volumes_macext_caiiiycuk_vangers_web_surweb_node_modules_babel_preset_react_app_node_modules_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_1___default.a.mark((function e(t){var a,c,i;return _Volumes_macext_caiiiycuk_vangers_web_surweb_node_modules_babel_preset_react_app_node_modules_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_1___default.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(a=new Uint8Array(r.result),c=_.FS,i=c.cwd()+"/",n.name.endsWith(".bmp")||n.name.endsWith(".pal")){try{c.unlink(i+_config__WEBPACK_IMPORTED_MODULE_11__.a+n.name)}catch(t){}c.createDataFile(i,_config__WEBPACK_IMPORTED_MODULE_11__.a+n.name,a,!0,!0,!0),c.syncfs((function(e){})),alert("Ok")}else if(n.name.endsWith(".c3d")){try{c.unlink(i+_config__WEBPACK_IMPORTED_MODULE_11__.c+n.name)}catch(s){}c.createDataFile(i,_config__WEBPACK_IMPORTED_MODULE_11__.c+n.name,a,!0,!0,!0),c.syncfs((function(e){})),alert("Ok")}else alert("Only bmp / c3d / pal files are supported");A(null);case 5:case"end":return e.stop()}}),e)})));return function(_){return e.apply(this,arguments)}}()),r.addEventListener("progress",(function(e){return v(e.loaded/e.total)})),r.readAsArrayBuffer(n),A(r)}else A(null)}}),"\xa0\xa0",Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_12__.jsx)(_blueprintjs_core__WEBPACK_IMPORTED_MODULE_4__.m,{size:16,intent:_blueprintjs_core__WEBPACK_IMPORTED_MODULE_6__.a.PRIMARY,value:w})]}):Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_12__.jsxs)(_blueprintjs_core__WEBPACK_IMPORTED_MODULE_4__.i.Heading,{children:["Loading ",o,"%"]}),m?Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_12__.jsx)(_blueprintjs_core__WEBPACK_IMPORTED_MODULE_4__.b,{minimal:!0,onKeyDown:function(){},onClick:function(){return U(!y)},children:"RON"}):null,null!==M?Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_12__.jsx)(_blueprintjs_core__WEBPACK_IMPORTED_MODULE_4__.b,{intent:_blueprintjs_core__WEBPACK_IMPORTED_MODULE_6__.a.PRIMARY,onKeyDown:function(){},minimal:!0,onClick:function(){null===a||void 0===a||a.focus(),null!==M&&downloadUrl(M)},children:"Download ZIP"}):null]})}),Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_12__.jsx)(_blueprintjs_core__WEBPACK_IMPORTED_MODULE_4__.l,{onResize:function(e){null!==a&&resizeCanvas(a,e[0].contentRect.width,e[0].contentRect.height)},children:Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_12__.jsxs)("div",{className:"canvas-container",children:[Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_12__.jsx)("canvas",{id:"canvas",ref:t,tabIndex:0}),m?null:Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_12__.jsx)("div",{className:"spinner-container",children:Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_12__.jsx)(_blueprintjs_core__WEBPACK_IMPORTED_MODULE_4__.m,{size:64})})]})}),Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_12__.jsx)(_blueprintjs_core__WEBPACK_IMPORTED_MODULE_4__.k,{isOpen:y,lazy:!0,hasBackdrop:!1,children:Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_12__.jsx)(_ron__WEBPACK_IMPORTED_MODULE_8__.a,Object(_Volumes_macext_caiiiycuk_vangers_web_surweb_node_modules_babel_preset_react_app_node_modules_babel_runtime_helpers_esm_objectSpread2__WEBPACK_IMPORTED_MODULE_0__.a)(Object(_Volumes_macext_caiiiycuk_vangers_web_surweb_node_modules_babel_preset_react_app_node_modules_babel_runtime_helpers_esm_objectSpread2__WEBPACK_IMPORTED_MODULE_0__.a)({},e),{},{Module:_,close:function(){return U(!1)}}))})]})}function instantiateWasm(e,_,t,n,r,a){return new Promise((function(c,i){try{t.saveZip=function(e){t.FS.syncfs((function(e){})),n(e)},t.onPoster=r,t.canvas=e,t.instantiateWasm=function(){var e=Object(_Volumes_macext_caiiiycuk_vangers_web_surweb_node_modules_babel_preset_react_app_node_modules_babel_runtime_helpers_esm_asyncToGenerator__WEBPACK_IMPORTED_MODULE_2__.a)(_Volumes_macext_caiiiycuk_vangers_web_surweb_node_modules_babel_preset_react_app_node_modules_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_1___default.a.mark((function e(t,n){var r,a;return _Volumes_macext_caiiiycuk_vangers_web_surweb_node_modules_babel_preset_react_app_node_modules_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_1___default.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,WebAssembly.compile(_.wasm);case 2:return r=e.sent,e.next=5,WebAssembly.instantiate(r,t);case 5:a=e.sent,n(a,r);case 7:case"end":return e.stop()}}),e)})));return function(_,t){return e.apply(this,arguments)}}(),t.onRuntimeInitialized=function(){instantiateProps(t,a,_).then((function(e){setTimeout((function(){t.callMain(e),c()}),16)})).catch(console.error)};var s=new TextDecoder;new Function(["Module"],s.decode(_.wasmJs))(t)}catch(o){i(o)}}))}function instantiateProps(Module,props,binaries){return new Promise((function(resolve,reject){Module.FS.chdir("/idbfs"),Module.FS.syncfs(!0,(function(err){var root=Module.FS_cwd()+"/";try{Module.FS.lookupPath(root+_config__WEBPACK_IMPORTED_MODULE_11__.f)}catch(e){Module.getPreloadedPackage=function(e,_){return binaries.data.buffer},eval((new TextDecoder).decode(binaries.dataJs)),Module.FS.syncfs((function(){}))}if("gen"===props.route&&null!==props.gen){window.m=Module;var enc=new TextEncoder;if(Module.FS.unlink(root+_config__WEBPACK_IMPORTED_MODULE_11__.f),Module.FS.createDataFile(root,_config__WEBPACK_IMPORTED_MODULE_11__.f,enc.encode(props.gen.worldIni),!0,!0,!0),"mirage"!==props.gen.palette){Module.FS.unlink(root+_config__WEBPACK_IMPORTED_MODULE_11__.b);var data=Module.FS.readFile(root+"_palette/"+props.gen.palette+".pal");Module.FS.createDataFile(root,_config__WEBPACK_IMPORTED_MODULE_11__.b,data,!0,!0,!0)}resolve(["/I"+props.gen.size,"/G0"])}else if("zip"===props.route&&null!==props.zip){Module.FS.chdir(root+"thechain/mirage/"),Module._clear_cwd();var bytes=props.zip,buffer=Module._malloc(bytes.length);Module.HEAPU8.set(bytes,buffer),Module._zip_to_fs(buffer,bytes.length),Module._free(buffer),Module.FS.chdir(root),resolve([])}else resolve([])}))}))}function resizeCanvas(e,_,t){var n=getSizeWithAspectRatio(_,t,WIDTH/HEIGHT),r=Object(_Volumes_macext_caiiiycuk_vangers_web_surweb_node_modules_babel_preset_react_app_node_modules_babel_runtime_helpers_esm_slicedToArray__WEBPACK_IMPORTED_MODULE_3__.a)(n,2),a=r[0],c=r[1];e.style.position="relative",e.style.top=t/2+"px",e.style.left=_/2+"px",e.style.marginTop=c/2*-1+"px",e.style.marginLeft=a/2*-1+"px",e.style.width=a+"px",e.style.height=c+"px"}function getSizeWithAspectRatio(e,_,t){if(e/_===t)return[e,_];var n=Math.round(_*t);return n<=e?[n,_]:[e,Math.round(e/t)]}function downloadUrl(e){var _=document.createElement("a");_.href=e,_.download="world.zip",_.style.display="none",document.body.appendChild(_),_.click(),_.remove()}},50:function(e,_,t){"use strict";t.d(_,"a",(function(){return u}));var n=t(8),r=t.n(n),a=t(12),c=t(5),i=t(6),s=t(0),o=t(10),l=(t(130),t(1));function u(e){var _=Object(s.useState)(void 0),t=Object(c.a)(_,2),n=t[0],u=t[1],b=Object(s.useState)(void 0),p=Object(c.a)(b,2),j=p[0],m=p[1],E=Object(s.useState)(void 0),h=Object(c.a)(E,2),f=h[0],M=h[1],x=Object(s.useState)(void 0),P=Object(c.a)(x,2),D=P[0],w=P[1],v=Object(s.useState)(!1),R=Object(c.a)(v,2),g=R[0],T=R[1],A=Object(s.useState)(""),C=Object(c.a)(A,2),L=C[0],y=C[1],U=Object(s.useState)(""),I=Object(c.a)(U,2),W=I[0],B=I[1],k=Object(s.useState)(""),K=Object(c.a)(k,2),S=K[0],z=K[1],N=Object(s.useState)(""),F=Object(c.a)(N,2),V=F[0],G=F[1];function q(e,_){_(e.target.files[0])}function H(){return(H=Object(a.a)(r.a.mark((function _(){var t,a,c,i,s,l,u,b;return r.a.wrap((function(_){for(;;)switch(_.prev=_.next){case 0:if(n&&j&&f&&D){_.next=2;break}return _.abrupt("return");case 2:return T(!0),_.next=5,d(n);case 5:return t=_.sent,_.next=8,d(j);case 8:return a=_.sent,_.next=11,d(f);case 11:return c=_.sent,_.next=14,d(D);case 14:i=_.sent,s=ron2vmp(t,a,i,c),l=e.Module,u=l.FS,b=u.cwd()+"/",u.unlink(b+o.d),u.createDataFile(b,o.d,s,!0,!0,!0),l._reloadWorld(),l._updateZipArchive(),T(!1),e.close();case 25:case"end":return _.stop()}}),_)})))).apply(this,arguments)}function Y(){return(Y=Object(a.a)(r.a.mark((function _(){return r.a.wrap((function(_){for(;;)switch(_.prev=_.next){case 0:T(!0),setTimeout((function(){var _=e.Module,t=_.FS;_._updateZipArchive();var n=t.cwd()+"/",r=(new TextDecoder).decode(t.readFile(n+o.f)),a=t.readFile(n+o.d),c=t.readFile(n+o.e),i=t.readFile(n+o.b);vmp2ron(r,a,c,i);var s=get_ron_multi_png(),l=get_height_png(),u=get_material_hi_png(),d=get_material_lo_png();L.length>0&&(URL.revokeObjectURL(L),URL.revokeObjectURL(W),URL.revokeObjectURL(S),URL.revokeObjectURL(V)),y(URL.createObjectURL(new Blob([s],{type:"text"}))),B(URL.createObjectURL(new Blob([l],{type:"image/png"}))),z(URL.createObjectURL(new Blob([u],{type:"image/png"}))),G(URL.createObjectURL(new Blob([d],{type:"image/png"}))),console.log(s,l,u,d),T(!1)}),100);case 2:case"end":return _.stop()}}),_)})))).apply(this,arguments)}return Object(l.jsxs)(i.d,{children:[Object(l.jsxs)("div",{className:"ron-container",children:[Object(l.jsx)("div",{children:g?Object(l.jsx)(i.m,{}):Object(l.jsxs)(i.c,{children:[Object(l.jsx)("h5",{children:"Export WROLD to RON"}),Object(l.jsxs)("div",{className:"open-inputs",children:[L.length>0?Object(l.jsx)(i.b,{className:"ron-download",onKeyDown:function(){},minimal:!0,onClick:function(){return O(L,"world.ron")},children:"Download RON"}):null,W.length>0?Object(l.jsx)(i.b,{className:"ron-download",onKeyDown:function(){},minimal:!0,onClick:function(){return O(W,"height.png")},children:"Download height PNG"}):null,S.length>0?Object(l.jsx)(i.b,{className:"ron-download",onKeyDown:function(){},minimal:!0,onClick:function(){return O(S,"material_hi.png")},children:"Download material HI PNG"}):null,V.length>0?Object(l.jsx)(i.b,{className:"ron-download",onKeyDown:function(){},minimal:!0,onClick:function(){return O(V,"material_lo.png")},children:"Download material LO PNG"}):null,Object(l.jsx)(i.b,{onClick:function(){return Y.apply(this,arguments)},children:"Export world"})]})]})}),Object(l.jsx)("div",{children:g?Object(l.jsx)(i.m,{}):Object(l.jsxs)(i.c,{children:[Object(l.jsx)("h5",{children:"Update WORLD using RON"}),Object(l.jsx)("p",{children:"Provide files"}),Object(l.jsxs)("div",{className:"open-inputs",children:[Object(l.jsx)(i.f,{hasSelection:void 0!==n,text:n?n.name:"Select 'ron' File",onInputCapture:function(e){return q(e,u)}}),Object(l.jsx)(i.f,{hasSelection:void 0!==j,text:j?j.name:"Select 'height' File",onInputCapture:function(e){return q(e,m)}}),Object(l.jsx)(i.f,{hasSelection:void 0!==f,text:f?f.name:"Select 'material_hi' File",onInputCapture:function(e){return q(e,M)}}),Object(l.jsx)(i.f,{hasSelection:void 0!==D,text:D?D.name:"Select 'material_lo' File",onInputCapture:function(e){return q(e,w)}}),Object(l.jsx)(i.b,{disabled:!(n&&j&&f&&D),onClick:function(){return H.apply(this,arguments)},children:"Update world"})]})]})}),Object(l.jsx)(i.h,{className:"ron-close",icon:"cross",onClick:function(){return e.close()}})]}),Object(l.jsxs)("div",{className:"ron-powered-by",children:["Powered by ",Object(l.jsx)("a",{rel:"noreferrer",href:"https://github.com/kvark/vange-rs/wiki/Resource-Converter",target:"_blank",children:"vanger-rs converter"})]})]})}function d(e){return b.apply(this,arguments)}function b(){return(b=Object(a.a)(r.a.mark((function e(_){var t;return r.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return t=new FileReader,e.abrupt("return",new Promise((function(e,n){t.addEventListener("load",(function(_){e(new Uint8Array(t.result))})),t.readAsArrayBuffer(_)})));case 2:case"end":return e.stop()}}),e)})))).apply(this,arguments)}function O(e,_){var t=document.createElement("a");t.href=e,t.download=_,t.style.display="none",document.body.appendChild(t),t.click(),t.remove()}}},[[132,1,2]]]);
//# sourceMappingURL=main.c1763b64.chunk.js.map