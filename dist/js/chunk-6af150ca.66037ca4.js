(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-6af150ca"],{"0054":function(t,e,r){"use strict";r.r(e);var n=function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("div",[r("el-row",[r("el-col",{staticStyle:{padding:"3rem"},attrs:{span:8,offset:8}},[r("el-row",{attrs:{gutter:20}},[r("el-col",[r("svg-icon",{staticClass:"loginIcon",attrs:{"icon-class":"giteelogin"},on:{click:function(e){return t.login("gitee")}}}),r("svg-icon",{staticClass:"loginIcon",attrs:{"icon-class":"githublogin"},on:{click:function(e){return t.login("github")}}})],1)],1),r("el-row",{staticStyle:{margin:"3rem 0"},attrs:{gutter:20}},[t._v(" Select the platform you want to authorize to log in ")])],1)],1)],1)},o=[],i=r("5530"),c=r("2f62"),f={name:"PlatformSelect",data:function(){return{platform:""}},methods:Object(i["a"])(Object(i["a"])({},Object(c["b"])(["setPlatformAct"])),{},{submit:function(){console.log("submit")},login:function(t){this.setPlatformAct(t),console.log(t),"gitee"===t?setTimeout((function(){window.location.href="https://gitee.com/oauth/authorize?client_id=2632e89d3dfb17ce941d2d2b45efc6f235afb4941ddb67578adda83aa33ab6a2&redirect_uri=http://139.159.224.207:60031/api/v1/login?platform=gitee&response_type=code&scope=user_info%20groups%20emails"}),5e3):window.location.href="https://github.com/login/oauth/authorize?client_id=d86f4915398dad23bffc&redirect_uri=http://localhost:8080/home&scope=user,user:email"}})},a=f,u=(r("7706"),r("2877")),s=Object(u["a"])(a,n,o,!1,null,"5bd58494",null);e["default"]=s.exports},"057f":function(t,e,r){var n=r("fc6a"),o=r("241c").f,i={}.toString,c="object"==typeof window&&window&&Object.getOwnPropertyNames?Object.getOwnPropertyNames(window):[],f=function(t){try{return o(t)}catch(e){return c.slice()}};t.exports.f=function(t){return c&&"[object Window]"==i.call(t)?f(t):o(n(t))}},"4de4":function(t,e,r){"use strict";var n=r("23e7"),o=r("b727").filter,i=r("1dde"),c=r("ae40"),f=i("filter"),a=c("filter");n({target:"Array",proto:!0,forced:!f||!a},{filter:function(t){return o(this,t,arguments.length>1?arguments[1]:void 0)}})},5530:function(t,e,r){"use strict";r.d(e,"a",(function(){return i}));r("a4d3"),r("4de4"),r("4160"),r("e439"),r("dbb4"),r("b64b"),r("159b");var n=r("ade3");function o(t,e){var r=Object.keys(t);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(t);e&&(n=n.filter((function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable}))),r.push.apply(r,n)}return r}function i(t){for(var e=1;e<arguments.length;e++){var r=null!=arguments[e]?arguments[e]:{};e%2?o(Object(r),!0).forEach((function(e){Object(n["a"])(t,e,r[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(r)):o(Object(r)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(r,e))}))}return t}},"746f":function(t,e,r){var n=r("428f"),o=r("5135"),i=r("e538"),c=r("9bf2").f;t.exports=function(t){var e=n.Symbol||(n.Symbol={});o(e,t)||c(e,t,{value:i.f(t)})}},7706:function(t,e,r){"use strict";var n=r("d223"),o=r.n(n);o.a},a4d3:function(t,e,r){"use strict";var n=r("23e7"),o=r("da84"),i=r("d066"),c=r("c430"),f=r("83ab"),a=r("4930"),u=r("fdbf"),s=r("d039"),l=r("5135"),b=r("e8b5"),d=r("861d"),p=r("825a"),g=r("7b0b"),h=r("fc6a"),y=r("c04e"),m=r("5c6c"),v=r("7c73"),O=r("df75"),w=r("241c"),j=r("057f"),P=r("7418"),S=r("06cf"),k=r("9bf2"),_=r("d1e7"),D=r("9112"),E=r("6eeb"),N=r("5692"),J=r("f772"),x=r("d012"),z=r("90e3"),A=r("b622"),C=r("e538"),I=r("746f"),T=r("d44e"),F=r("69f3"),Q=r("b727").forEach,W=J("hidden"),$="Symbol",q="prototype",B=A("toPrimitive"),G=F.set,H=F.getterFor($),K=Object[q],L=o.Symbol,M=i("JSON","stringify"),R=S.f,U=k.f,V=j.f,X=_.f,Y=N("symbols"),Z=N("op-symbols"),tt=N("string-to-symbol-registry"),et=N("symbol-to-string-registry"),rt=N("wks"),nt=o.QObject,ot=!nt||!nt[q]||!nt[q].findChild,it=f&&s((function(){return 7!=v(U({},"a",{get:function(){return U(this,"a",{value:7}).a}})).a}))?function(t,e,r){var n=R(K,e);n&&delete K[e],U(t,e,r),n&&t!==K&&U(K,e,n)}:U,ct=function(t,e){var r=Y[t]=v(L[q]);return G(r,{type:$,tag:t,description:e}),f||(r.description=e),r},ft=u?function(t){return"symbol"==typeof t}:function(t){return Object(t)instanceof L},at=function(t,e,r){t===K&&at(Z,e,r),p(t);var n=y(e,!0);return p(r),l(Y,n)?(r.enumerable?(l(t,W)&&t[W][n]&&(t[W][n]=!1),r=v(r,{enumerable:m(0,!1)})):(l(t,W)||U(t,W,m(1,{})),t[W][n]=!0),it(t,n,r)):U(t,n,r)},ut=function(t,e){p(t);var r=h(e),n=O(r).concat(pt(r));return Q(n,(function(e){f&&!lt.call(r,e)||at(t,e,r[e])})),t},st=function(t,e){return void 0===e?v(t):ut(v(t),e)},lt=function(t){var e=y(t,!0),r=X.call(this,e);return!(this===K&&l(Y,e)&&!l(Z,e))&&(!(r||!l(this,e)||!l(Y,e)||l(this,W)&&this[W][e])||r)},bt=function(t,e){var r=h(t),n=y(e,!0);if(r!==K||!l(Y,n)||l(Z,n)){var o=R(r,n);return!o||!l(Y,n)||l(r,W)&&r[W][n]||(o.enumerable=!0),o}},dt=function(t){var e=V(h(t)),r=[];return Q(e,(function(t){l(Y,t)||l(x,t)||r.push(t)})),r},pt=function(t){var e=t===K,r=V(e?Z:h(t)),n=[];return Q(r,(function(t){!l(Y,t)||e&&!l(K,t)||n.push(Y[t])})),n};if(a||(L=function(){if(this instanceof L)throw TypeError("Symbol is not a constructor");var t=arguments.length&&void 0!==arguments[0]?String(arguments[0]):void 0,e=z(t),r=function(t){this===K&&r.call(Z,t),l(this,W)&&l(this[W],e)&&(this[W][e]=!1),it(this,e,m(1,t))};return f&&ot&&it(K,e,{configurable:!0,set:r}),ct(e,t)},E(L[q],"toString",(function(){return H(this).tag})),E(L,"withoutSetter",(function(t){return ct(z(t),t)})),_.f=lt,k.f=at,S.f=bt,w.f=j.f=dt,P.f=pt,C.f=function(t){return ct(A(t),t)},f&&(U(L[q],"description",{configurable:!0,get:function(){return H(this).description}}),c||E(K,"propertyIsEnumerable",lt,{unsafe:!0}))),n({global:!0,wrap:!0,forced:!a,sham:!a},{Symbol:L}),Q(O(rt),(function(t){I(t)})),n({target:$,stat:!0,forced:!a},{for:function(t){var e=String(t);if(l(tt,e))return tt[e];var r=L(e);return tt[e]=r,et[r]=e,r},keyFor:function(t){if(!ft(t))throw TypeError(t+" is not a symbol");if(l(et,t))return et[t]},useSetter:function(){ot=!0},useSimple:function(){ot=!1}}),n({target:"Object",stat:!0,forced:!a,sham:!f},{create:st,defineProperty:at,defineProperties:ut,getOwnPropertyDescriptor:bt}),n({target:"Object",stat:!0,forced:!a},{getOwnPropertyNames:dt,getOwnPropertySymbols:pt}),n({target:"Object",stat:!0,forced:s((function(){P.f(1)}))},{getOwnPropertySymbols:function(t){return P.f(g(t))}}),M){var gt=!a||s((function(){var t=L();return"[null]"!=M([t])||"{}"!=M({a:t})||"{}"!=M(Object(t))}));n({target:"JSON",stat:!0,forced:gt},{stringify:function(t,e,r){var n,o=[t],i=1;while(arguments.length>i)o.push(arguments[i++]);if(n=e,(d(e)||void 0!==t)&&!ft(t))return b(e)||(e=function(t,e){if("function"==typeof n&&(e=n.call(this,t,e)),!ft(e))return e}),o[1]=e,M.apply(null,o)}})}L[q][B]||D(L[q],B,L[q].valueOf),T(L,$),x[W]=!0},ade3:function(t,e,r){"use strict";function n(t,e,r){return e in t?Object.defineProperty(t,e,{value:r,enumerable:!0,configurable:!0,writable:!0}):t[e]=r,t}r.d(e,"a",(function(){return n}))},b64b:function(t,e,r){var n=r("23e7"),o=r("7b0b"),i=r("df75"),c=r("d039"),f=c((function(){i(1)}));n({target:"Object",stat:!0,forced:f},{keys:function(t){return i(o(t))}})},d223:function(t,e,r){},dbb4:function(t,e,r){var n=r("23e7"),o=r("83ab"),i=r("56ef"),c=r("fc6a"),f=r("06cf"),a=r("8418");n({target:"Object",stat:!0,sham:!o},{getOwnPropertyDescriptors:function(t){var e,r,n=c(t),o=f.f,u=i(n),s={},l=0;while(u.length>l)r=o(n,e=u[l++]),void 0!==r&&a(s,e,r);return s}})},e439:function(t,e,r){var n=r("23e7"),o=r("d039"),i=r("fc6a"),c=r("06cf").f,f=r("83ab"),a=o((function(){c(1)})),u=!f||a;n({target:"Object",stat:!0,forced:u,sham:!f},{getOwnPropertyDescriptor:function(t,e){return c(i(t),e)}})},e538:function(t,e,r){var n=r("b622");e.f=n}}]);
//# sourceMappingURL=chunk-6af150ca.66037ca4.js.map