(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-18172740"],{"01c7":function(e,t,o){},"0418":function(e,t,o){"use strict";var i=function(){var e=this,t=e.$createElement,o=e._self._c||t;return o("div",{staticClass:"header"},[o("el-col",{attrs:{span:8}},[o("div",{staticStyle:{display:"flex"}},[o("img",{staticClass:"pointer",staticStyle:{width:"2rem"},attrs:{src:this.$store.state.user.userImg,alt:""},on:{click:function(t){return e.newWindow()}}}),o("div",{staticStyle:{display:"flex","flex-direction":"column","justify-content":"center","margin-left":".5rem"}},[o("span",[e._v("Hi, "),o("span",{staticClass:"pointer",staticStyle:{"font-weight":"bold"}},[e._v(e._s(this.$store.state.user.userName)+"!")])])])])]),o("el-col",{attrs:{span:8}},[o("div",[o("svg-icon",{staticClass:"pointer",staticStyle:{height:"100%",width:"3rem"},attrs:{id:"svg_logo","icon-class":"CLA_SYSTEM_BLACK"},on:{click:function(t){return e.toHome()}}})],1)]),o("el-col",{attrs:{span:8}},[o("div",[o("el-tooltip",{attrs:{effect:"dark",content:"Sign out",placement:"left"}},[o("svg-icon",{staticClass:"pointer",attrs:{id:"svg_loginOut","icon-class":"loginOut"},on:{click:function(t){return e.loginOut()}}})],1)],1)])],1)},a=[],n={name:"Header",computed:{},data:function(){return{}},created:function(){},methods:{toHome:function(){this.$router.push("/home")},loginOut:function(){this.$router.push("/")},newWindow:function(){window.open("https://github.com/ouchengle")}}},s=n,r=(o("a80d"),o("2877")),l=Object(r["a"])(s,i,a,!1,null,"5637794e",null);t["a"]=l.exports},"057f":function(e,t,o){var i=o("fc6a"),a=o("241c").f,n={}.toString,s="object"==typeof window&&window&&Object.getOwnPropertyNames?Object.getOwnPropertyNames(window):[],r=function(e){try{return a(e)}catch(t){return s.slice()}};e.exports.f=function(e){return s&&"[object Window]"==n.call(e)?r(e):a(i(e))}},1276:function(e,t,o){"use strict";var i=o("d784"),a=o("44e7"),n=o("825a"),s=o("1d80"),r=o("4840"),l=o("8aa5"),c=o("50c4"),u=o("14c3"),h=o("9263"),f=o("d039"),g=[].push,p=Math.min,d=4294967295,m=!f((function(){return!RegExp(d,"y")}));i("split",2,(function(e,t,o){var i;return i="c"=="abbc".split(/(b)*/)[1]||4!="test".split(/(?:)/,-1).length||2!="ab".split(/(?:ab)*/).length||4!=".".split(/(.?)(.?)/).length||".".split(/()()/).length>1||"".split(/.?/).length?function(e,o){var i=String(s(this)),n=void 0===o?d:o>>>0;if(0===n)return[];if(void 0===e)return[i];if(!a(e))return t.call(i,e,n);var r,l,c,u=[],f=(e.ignoreCase?"i":"")+(e.multiline?"m":"")+(e.unicode?"u":"")+(e.sticky?"y":""),p=0,m=new RegExp(e.source,f+"g");while(r=h.call(m,i)){if(l=m.lastIndex,l>p&&(u.push(i.slice(p,r.index)),r.length>1&&r.index<i.length&&g.apply(u,r.slice(1)),c=r[0].length,p=l,u.length>=n))break;m.lastIndex===r.index&&m.lastIndex++}return p===i.length?!c&&m.test("")||u.push(""):u.push(i.slice(p)),u.length>n?u.slice(0,n):u}:"0".split(void 0,0).length?function(e,o){return void 0===e&&0===o?[]:t.call(this,e,o)}:t,[function(t,o){var a=s(this),n=void 0==t?void 0:t[e];return void 0!==n?n.call(t,a,o):i.call(String(a),t,o)},function(e,a){var s=o(i,e,this,a,i!==t);if(s.done)return s.value;var h=n(e),f=String(this),g=r(h,RegExp),v=h.unicode,b=(h.ignoreCase?"i":"")+(h.multiline?"m":"")+(h.unicode?"u":"")+(m?"y":"g"),y=new g(m?h:"^(?:"+h.source+")",b),_=void 0===a?d:a>>>0;if(0===_)return[];if(0===f.length)return null===u(y,f)?[f]:[];var C=0,k=0,w=[];while(k<f.length){y.lastIndex=m?k:0;var x,O=u(y,m?f:f.slice(k));if(null===O||(x=p(c(y.lastIndex+(m?0:k)),f.length))===C)k=l(f,k,v);else{if(w.push(f.slice(C,k)),w.length===_)return w;for(var S=1;S<=O.length-1;S++)if(w.push(O[S]),w.length===_)return w;k=C=x}}return w.push(f.slice(C)),w}]}),!m)},"14c3":function(e,t,o){var i=o("c6b6"),a=o("9263");e.exports=function(e,t){var o=e.exec;if("function"===typeof o){var n=o.call(e,t);if("object"!==typeof n)throw TypeError("RegExp exec method returned something other than an Object or null");return n}if("RegExp"!==i(e))throw TypeError("RegExp#exec called on incompatible receiver");return a.call(e,t)}},"44e7":function(e,t,o){var i=o("861d"),a=o("c6b6"),n=o("b622"),s=n("match");e.exports=function(e){var t;return i(e)&&(void 0!==(t=e[s])?!!t:"RegExp"==a(e))}},"4de4":function(e,t,o){"use strict";var i=o("23e7"),a=o("b727").filter,n=o("1dde"),s=o("ae40"),r=n("filter"),l=s("filter");i({target:"Array",proto:!0,forced:!r||!l},{filter:function(e){return a(this,e,arguments.length>1?arguments[1]:void 0)}})},5530:function(e,t,o){"use strict";o.d(t,"a",(function(){return n}));o("a4d3"),o("4de4"),o("4160"),o("e439"),o("dbb4"),o("b64b"),o("159b");var i=o("ade3");function a(e,t){var o=Object.keys(e);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);t&&(i=i.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),o.push.apply(o,i)}return o}function n(e){for(var t=1;t<arguments.length;t++){var o=null!=arguments[t]?arguments[t]:{};t%2?a(Object(o),!0).forEach((function(t){Object(i["a"])(e,t,o[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(o)):a(Object(o)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(o,t))}))}return e}},"615a":function(e,t,o){"use strict";o.d(t,"a",(function(){return i}));var i=function(){return window.innerHeight}},6547:function(e,t,o){var i=o("a691"),a=o("1d80"),n=function(e){return function(t,o){var n,s,r=String(a(t)),l=i(o),c=r.length;return l<0||l>=c?e?"":void 0:(n=r.charCodeAt(l),n<55296||n>56319||l+1===c||(s=r.charCodeAt(l+1))<56320||s>57343?e?r.charAt(l):n:e?r.slice(l,l+2):s-56320+(n-55296<<10)+65536)}};e.exports={codeAt:n(!1),charAt:n(!0)}},"746f":function(e,t,o){var i=o("428f"),a=o("5135"),n=o("e538"),s=o("9bf2").f;e.exports=function(e){var t=i.Symbol||(i.Symbol={});a(t,e)||s(t,e,{value:n.f(e)})}},"8aa5":function(e,t,o){"use strict";var i=o("6547").charAt;e.exports=function(e,t,o){return t+(o?i(e,t).length:1)}},9263:function(e,t,o){"use strict";var i=o("ad6d"),a=o("9f7f"),n=RegExp.prototype.exec,s=String.prototype.replace,r=n,l=function(){var e=/a/,t=/b*/g;return n.call(e,"a"),n.call(t,"a"),0!==e.lastIndex||0!==t.lastIndex}(),c=a.UNSUPPORTED_Y||a.BROKEN_CARET,u=void 0!==/()??/.exec("")[1],h=l||u||c;h&&(r=function(e){var t,o,a,r,h=this,f=c&&h.sticky,g=i.call(h),p=h.source,d=0,m=e;return f&&(g=g.replace("y",""),-1===g.indexOf("g")&&(g+="g"),m=String(e).slice(h.lastIndex),h.lastIndex>0&&(!h.multiline||h.multiline&&"\n"!==e[h.lastIndex-1])&&(p="(?: "+p+")",m=" "+m,d++),o=new RegExp("^(?:"+p+")",g)),u&&(o=new RegExp("^"+p+"$(?!\\s)",g)),l&&(t=h.lastIndex),a=n.call(f?o:h,m),f?a?(a.input=a.input.slice(d),a[0]=a[0].slice(d),a.index=h.lastIndex,h.lastIndex+=a[0].length):h.lastIndex=0:l&&a&&(h.lastIndex=h.global?a.index+a[0].length:t),u&&a&&a.length>1&&s.call(a[0],o,(function(){for(r=1;r<arguments.length-2;r++)void 0===arguments[r]&&(a[r]=void 0)})),a}),e.exports=r},"9f7f":function(e,t,o){"use strict";var i=o("d039");function a(e,t){return RegExp(e,t)}t.UNSUPPORTED_Y=i((function(){var e=a("a","y");return e.lastIndex=2,null!=e.exec("abcd")})),t.BROKEN_CARET=i((function(){var e=a("^r","gy");return e.lastIndex=2,null!=e.exec("str")}))},a4d3:function(e,t,o){"use strict";var i=o("23e7"),a=o("da84"),n=o("d066"),s=o("c430"),r=o("83ab"),l=o("4930"),c=o("fdbf"),u=o("d039"),h=o("5135"),f=o("e8b5"),g=o("861d"),p=o("825a"),d=o("7b0b"),m=o("fc6a"),v=o("c04e"),b=o("5c6c"),y=o("7c73"),_=o("df75"),C=o("241c"),k=o("057f"),w=o("7418"),x=o("06cf"),O=o("9bf2"),S=o("d1e7"),V=o("9112"),E=o("6eeb"),A=o("5692"),L=o("f772"),$=o("d012"),T=o("90e3"),D=o("b622"),R=o("e538"),z=o("746f"),N=o("d44e"),P=o("69f3"),I=o("b727").forEach,j=L("hidden"),F="Symbol",H="prototype",U=D("toPrimitive"),B=P.set,M=P.getterFor(F),W=Object[H],G=a.Symbol,Y=n("JSON","stringify"),q=x.f,K=O.f,J=k.f,Z=S.f,Q=A("symbols"),X=A("op-symbols"),ee=A("string-to-symbol-registry"),te=A("symbol-to-string-registry"),oe=A("wks"),ie=a.QObject,ae=!ie||!ie[H]||!ie[H].findChild,ne=r&&u((function(){return 7!=y(K({},"a",{get:function(){return K(this,"a",{value:7}).a}})).a}))?function(e,t,o){var i=q(W,t);i&&delete W[t],K(e,t,o),i&&e!==W&&K(W,t,i)}:K,se=function(e,t){var o=Q[e]=y(G[H]);return B(o,{type:F,tag:e,description:t}),r||(o.description=t),o},re=c?function(e){return"symbol"==typeof e}:function(e){return Object(e)instanceof G},le=function(e,t,o){e===W&&le(X,t,o),p(e);var i=v(t,!0);return p(o),h(Q,i)?(o.enumerable?(h(e,j)&&e[j][i]&&(e[j][i]=!1),o=y(o,{enumerable:b(0,!1)})):(h(e,j)||K(e,j,b(1,{})),e[j][i]=!0),ne(e,i,o)):K(e,i,o)},ce=function(e,t){p(e);var o=m(t),i=_(o).concat(pe(o));return I(i,(function(t){r&&!he.call(o,t)||le(e,t,o[t])})),e},ue=function(e,t){return void 0===t?y(e):ce(y(e),t)},he=function(e){var t=v(e,!0),o=Z.call(this,t);return!(this===W&&h(Q,t)&&!h(X,t))&&(!(o||!h(this,t)||!h(Q,t)||h(this,j)&&this[j][t])||o)},fe=function(e,t){var o=m(e),i=v(t,!0);if(o!==W||!h(Q,i)||h(X,i)){var a=q(o,i);return!a||!h(Q,i)||h(o,j)&&o[j][i]||(a.enumerable=!0),a}},ge=function(e){var t=J(m(e)),o=[];return I(t,(function(e){h(Q,e)||h($,e)||o.push(e)})),o},pe=function(e){var t=e===W,o=J(t?X:m(e)),i=[];return I(o,(function(e){!h(Q,e)||t&&!h(W,e)||i.push(Q[e])})),i};if(l||(G=function(){if(this instanceof G)throw TypeError("Symbol is not a constructor");var e=arguments.length&&void 0!==arguments[0]?String(arguments[0]):void 0,t=T(e),o=function(e){this===W&&o.call(X,e),h(this,j)&&h(this[j],t)&&(this[j][t]=!1),ne(this,t,b(1,e))};return r&&ae&&ne(W,t,{configurable:!0,set:o}),se(t,e)},E(G[H],"toString",(function(){return M(this).tag})),E(G,"withoutSetter",(function(e){return se(T(e),e)})),S.f=he,O.f=le,x.f=fe,C.f=k.f=ge,w.f=pe,R.f=function(e){return se(D(e),e)},r&&(K(G[H],"description",{configurable:!0,get:function(){return M(this).description}}),s||E(W,"propertyIsEnumerable",he,{unsafe:!0}))),i({global:!0,wrap:!0,forced:!l,sham:!l},{Symbol:G}),I(_(oe),(function(e){z(e)})),i({target:F,stat:!0,forced:!l},{for:function(e){var t=String(e);if(h(ee,t))return ee[t];var o=G(t);return ee[t]=o,te[o]=t,o},keyFor:function(e){if(!re(e))throw TypeError(e+" is not a symbol");if(h(te,e))return te[e]},useSetter:function(){ae=!0},useSimple:function(){ae=!1}}),i({target:"Object",stat:!0,forced:!l,sham:!r},{create:ue,defineProperty:le,defineProperties:ce,getOwnPropertyDescriptor:fe}),i({target:"Object",stat:!0,forced:!l},{getOwnPropertyNames:ge,getOwnPropertySymbols:pe}),i({target:"Object",stat:!0,forced:u((function(){w.f(1)}))},{getOwnPropertySymbols:function(e){return w.f(d(e))}}),Y){var de=!l||u((function(){var e=G();return"[null]"!=Y([e])||"{}"!=Y({a:e})||"{}"!=Y(Object(e))}));i({target:"JSON",stat:!0,forced:de},{stringify:function(e,t,o){var i,a=[e],n=1;while(arguments.length>n)a.push(arguments[n++]);if(i=t,(g(t)||void 0!==e)&&!re(e))return f(t)||(t=function(e,t){if("function"==typeof i&&(t=i.call(this,e,t)),!re(t))return t}),a[1]=t,Y.apply(null,a)}})}G[H][U]||V(G[H],U,G[H].valueOf),N(G,F),$[j]=!0},a80d:function(e,t,o){"use strict";var i=o("d15f"),a=o.n(i);a.a},ac1f:function(e,t,o){"use strict";var i=o("23e7"),a=o("9263");i({target:"RegExp",proto:!0,forced:/./.exec!==a},{exec:a})},ad6d:function(e,t,o){"use strict";var i=o("825a");e.exports=function(){var e=i(this),t="";return e.global&&(t+="g"),e.ignoreCase&&(t+="i"),e.multiline&&(t+="m"),e.dotAll&&(t+="s"),e.unicode&&(t+="u"),e.sticky&&(t+="y"),t}},ade3:function(e,t,o){"use strict";function i(e,t,o){return t in e?Object.defineProperty(e,t,{value:o,enumerable:!0,configurable:!0,writable:!0}):e[t]=o,e}o.d(t,"a",(function(){return i}))},b4ff:function(e,t,o){"use strict";var i=o("01c7"),a=o.n(i);a.a},b64b:function(e,t,o){var i=o("23e7"),a=o("7b0b"),n=o("df75"),s=o("d039"),r=s((function(){n(1)}));i({target:"Object",stat:!0,forced:r},{keys:function(e){return n(a(e))}})},bb51:function(e,t,o){"use strict";o.r(t);var i=function(){var e=this,t=e.$createElement,o=e._self._c||t;return o("div",{style:e.home,attrs:{id:"home"}},[o("Header"),o("el-col",{attrs:{offset:4,span:16,id:"section"}},[o("div",{attrs:{id:"configBtDiv"}},[this.$store.state.showConfigForm?e._e():o("el-button",{staticClass:"configBt",attrs:{type:"primary"},on:{click:function(t){return e.configCla()}}},[e._v(" Configure CLA ")])],1),o("el-row",[e.showConfigForm?o("el-row",[o("div",{staticStyle:{"padding-bottom":"1.5rem","font-size":"1.3rem"}},[e._v("Configure CLA")]),o("el-row",[o("el-col",{attrs:{span:10}},[o("div",{staticStyle:{"background-color":"white"}},[o("div",{staticStyle:{"text-align":"right",padding:"1rem"}},[o("svg-icon",{attrs:{"icon-class":"close"},on:{click:function(t){return e.closeConfigForm()}}})],1),o("div",{staticStyle:{"font-size":"1.2rem",padding:".5rem"}},[e._v(" ① Choose a org or repository "),e.user.isAuthorize?e._e():o("span",{staticStyle:{"font-size":".8rem","text-decoration":"underline",cursor:"pointer"},on:{click:function(t){return e.authorize()}}},[e._v("(want to link an org?)")])]),o("div",{staticStyle:{padding:"0 2rem"}},[o("el-row",{attrs:{gutter:20}},[o("el-col",{attrs:{span:12}},[o("el-select",{staticStyle:{width:"100%"},attrs:{placeholder:"select org",size:"medium",clearable:"",filterable:""},on:{change:e.changeOrg},model:{value:e.orgValue,callback:function(t){e.orgValue=t},expression:"orgValue"}},e._l(e.orgOptions,(function(e){return o("el-option",{key:e.value,attrs:{label:e.label,value:e.value}})})),1)],1),o("el-col",{attrs:{span:12}},[o("el-select",{staticStyle:{width:"100%"},attrs:{placeholder:"select repo",size:"medium",clearable:"",filterable:""},on:{change:e.changeRepository},model:{value:e.repositoryValue,callback:function(t){e.repositoryValue=t},expression:"repositoryValue"}},e._l(e.repositoryOptions,(function(e){return o("el-option",{key:e.value,attrs:{label:e.label,value:e.value}})})),1)],1)],1)],1),o("div",{staticStyle:{"font-size":"1.2rem",padding:".5rem"}},[e._v(" ② Choose a CLA "),o("span",{staticStyle:{"font-size":".8rem","text-decoration":"underline",cursor:"pointer"},on:{click:function(t){return e.createCLA()}}},[e._v("(don't have one?) ")])]),o("div",{staticStyle:{padding:"0 2rem 1rem 2rem"}},[o("el-collapse",{on:{change:e.handleChange},model:{value:e.activeNames,callback:function(t){e.activeNames=t},expression:"activeNames"}},[o("el-collapse-item",{attrs:{title:"cla filter",name:"1"}},[o("el-row",{attrs:{gutter:10}},[o("el-col",{attrs:{span:12}},[o("el-select",{attrs:{placeholder:"cla type",size:"medium",clearable:""},on:{change:e.claTypeChange},model:{value:e.claTypeValue,callback:function(t){e.claTypeValue=t},expression:"claTypeValue"}},e._l(e.claTypeOptions,(function(e){return o("el-option",{key:e.value,attrs:{label:e.label,value:e.value}})})),1)],1),o("el-col",{attrs:{span:12}},[o("el-select",{attrs:{placeholder:"language",size:"medium",clearable:""},on:{change:e.claLanguageChange},model:{value:e.claLanguageValue,callback:function(t){e.claLanguageValue=t},expression:"claLanguageValue"}},e._l(e.languageOptions,(function(e){return o("el-option",{key:e.value,attrs:{label:e.label,value:e.value}})})),1)],1)],1)],1)],1)],1),o("div",{staticStyle:{padding:"0 2rem"}},[o("el-select",{ref:"claSelect",staticStyle:{width:"100%"},attrs:{placeholder:"select cla",size:"medium",filterable:""},on:{"visible-change":e.claVisibleChange,change:e.changeCla},model:{value:e.claValue,callback:function(t){e.claValue=t},expression:"claValue"}},e._l(e.claOptions,(function(e){return o("el-option",{key:e.value,attrs:{label:e.label,value:e.value}})})),1)],1),o("div",{staticStyle:{"font-size":"1.2rem",padding:".5rem"}},[e._v(" ③ Email "),o("span",{staticStyle:{"font-size":".8rem","text-decoration":"underline",cursor:"pointer"},on:{click:function(t){return e.toAuthorizedEmail()}}},[e._v("(click to grant authorized email) ")])]),o("div",{staticStyle:{padding:"0 2rem"}},[o("el-input",{attrs:{readonly:"",size:"medium",placeholder:"authorization email"},on:{input:e.verifyEmail},model:{value:e.email,callback:function(t){e.email=t},expression:"email"}})],1),o("div",{class:{"linkBt pointer":e.claChoose&&e.orgChoose&&e.isEmail,disableClass:!(e.claChoose&&e.repositoryChoose&&e.isEmail)},on:{click:function(t){return e.openLinkDialog()}}},[o("div",[o("svg-icon",{attrs:{"icon-class":"link"}}),e._v(" LINK ")],1)])])]),e.showPreviewCla?o("el-col",{attrs:{span:12,offset:2}},[o("el-input",{staticStyle:{"white-space":"pre-wrap"},attrs:{rows:"16",readonly:"",type:"textarea",placeholder:"preview cla"},model:{value:e.previewText,callback:function(t){e.previewText=t},expression:"previewText"}})],1):e._e()],1)],1):e._e()],1),o("div",[o("el-tabs",{on:{"tab-click":e.tabsHandleClick},model:{value:e.activeName,callback:function(t){e.activeName=t},expression:"activeName"}},[o("el-tab-pane",{staticStyle:{"margin-top":"1rem"},attrs:{label:"Linked Repositories",name:"first"}})],1),o("router-view")],1)],1),o("Footer"),o("el-dialog",{attrs:{top:"5vh",title:"",visible:e.authorizeDialogVisible,width:"35%"},on:{"update:visible":function(t){e.authorizeDialogVisible=t}}},[o("div",{staticStyle:{"text-align":"left"}},[o("p",{staticClass:"dialogDesc"},[e._v("Why link organizations?")]),o("p",[e._v("If you link an organization with your CLA, CLA system sets a web hook on your organization and listens to Pull Requests of all repositories in the organization. That means that your CLA becomes active for each existing and future repositories of your organization.")]),o("p",{staticClass:"dialogDesc"},[e._v("How can I link an organization?")]),o("p",[e._v("CLA system needs an additional authorization from you to be able to create web hooks for organizations. To grant CLA system appropriate rights just click on the button below. For more information on Authorization scopes see github documentation")]),o("div",{staticClass:"linkBt pointer",staticStyle:{"font-size":"1.1rem"},on:{click:function(t){return e.getOrgPermission()}}},[e._v(" Yes,let's go for it ")])])]),o("el-dialog",{attrs:{top:"5vh",title:"",visible:e.createCLADialogVisible,width:"35%"},on:{"update:visible":function(t){e.createCLADialogVisible=t}}},[o("div",{staticStyle:{"text-align":"left"}},[o("p",{staticClass:"dialogDesc"},[e._v("How can I create a CLA Gist?")]),o("p",[e._v("To "),o("span",{staticStyle:{cursor:"pointer","text-decoration":"underline",color:"blue"},on:{click:function(t){return e.toCreateCLA()}}},[e._v("createCLA")]),e._v(" enter a file name and paste the content of your CLA.")]),o("p",{staticClass:"dialogDesc"},[e._v("What happens if I edit the Gist file?")]),o("p",[e._v("CLA system will always show you the current version of your Gist file. Users who accept your CLA sign the current version. If you change the content of your CLA, each contributor has to accept the new version when they create a new pull request.")])]),o("span",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"})]),o("el-dialog",{attrs:{top:"5vh",title:"",visible:e.shareDialogVisible,width:"35%"},on:{"update:visible":function(t){e.shareDialogVisible=t}}},[o("div",{staticStyle:{"text-align":"left"}},[o("p",{staticClass:"dialogDesc"},[e._v("What happens if I choose to share the gist with multiple repos or orgs?")]),o("p",[e._v("Contributors will simply need to sign only once for any of the repos or orgs linked with the same shared gist.")]),o("p",{staticClass:"dialogDesc"},[e._v("Are previous CLA signatures still valid after I choose to share the gist with multiple repos or orgs?")]),o("p",[e._v("Yes, but the scope of the previous signatures are still limited to the previous repo or org.")]),o("p",{staticClass:"dialogDesc"},[e._v("What happens if I uncheck the box and choose NOT to share the gist any more?")]),o("p",[e._v("Previous contributors that have signed the shared gist will have to sign again.")])]),o("span",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"})]),o("el-dialog",{attrs:{top:"5vh",title:"",visible:e.linkDialogVisible,width:"35%"},on:{"update:visible":function(t){e.linkDialogVisible=t}}},[o("div",[o("p",{staticClass:"dialogDesc"},[e._v("Would you like to link this CLA to your repository?")]),o("div",[o("el-row",[o("svg-icon",{staticStyle:{width:"100%",height:"100%"},attrs:{"icon-class":"popup_link"}})],1),o("el-row",[e.claChoose?o("el-col",{attrs:{offset:6,span:5}},[e._v(" "+e._s(e.claOptions[e.claValue].label)+" ")]):e._e(),e.orgChoose&&e.repositoryChoose?o("el-col",{attrs:{offset:2,span:5}},[e._v(" "+e._s(e.orgOptions[e.orgValue].label)+"/"+e._s(e.repositoryOptions[e.repositoryValue].label)+" ")]):e._e(),e.orgChoose&&!e.repositoryChoose?o("el-col",{attrs:{offset:2,span:5}},[e._v(" "+e._s(e.orgOptions[e.orgValue].label)+" ")]):e._e()],1)],1),o("div",{staticStyle:{padding:"0 3rem",color:"#409EFF"}}),o("div",{staticStyle:{padding:"2rem 6rem","text-align":"left","font-size":"1.3rem"}},[o("p",{staticStyle:{"text-align":"center"}},[e._v("CLA system will...")]),o("ul",[o("li",[e._v("Create a webhook in your repository and listen for pull requests")]),o("li",[e._v("Set a pull request CLA status")]),o("li",[e._v("Comment on pull requests")])])]),o("span",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[o("el-button",{on:{click:function(t){e.linkDialogVisible=!1}}},[e._v("Cancel")]),o("el-button",{directives:[{name:"loading",rawName:"v-loading.fullscreen.lock",value:e.linkLoading,expression:"linkLoading",modifiers:{fullscreen:!0,lock:!0}}],attrs:{type:"primary"},on:{click:function(t){return e.linkRepository()}}},[e._v("Yes,Let's do this!")])],1)])]),o("el-dialog",{attrs:{top:"5vh",title:"",visible:e.emailDialogVisible,width:"35%"},on:{"update:visible":function(t){e.emailDialogVisible=t}}},[o("div",[o("p",{staticClass:"dialogDesc"},[e._v("You need to select an email address for your organization to contact")]),o("div",[o("el-row",[o("el-col",{attrs:{offset:6,span:12}},[o("el-select",{attrs:{placeholder:"Select email type",size:"medium",filterable:""},on:{change:e.changeEmailType},model:{value:e.emailType,callback:function(t){e.emailType=t},expression:"emailType"}},e._l(e.emailTypeArr,(function(e){return o("el-option",{key:e.value,attrs:{value:e.value,label:e.label}})})),1)],1)],1)],1),o("div",{staticStyle:{padding:"0 3rem",color:"#409EFF"}}),o("div",{staticStyle:{padding:"2rem 6rem","text-align":"left","font-size":"1.3rem"}},[o("p",{staticStyle:{"text-align":"center"}},[e._v("CLA system will...")]),o("ul",[o("li",[e._v("Send the white list management account number to the enterprise through the mailbox")]),o("li",[e._v("Send PDF signature documents to the signer through this email address")])])]),o("span",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[o("el-button",{on:{click:function(t){e.emailDialogVisible=!1}}},[e._v("Cancel")]),o("el-button",{directives:[{name:"loading",rawName:"v-loading.fullscreen.lock",value:e.linkLoading,expression:"linkLoading",modifiers:{fullscreen:!0,lock:!0}}],attrs:{type:"primary"},on:{click:function(t){return e.authorizeEmail()}}},[e._v("Yes,Let's do this!")])],1)])])],1)},a=[],n=(o("99af"),o("4160"),o("b0c0"),o("ac1f"),o("1276"),o("159b"),o("5530")),s=o("221d"),r=o("615a"),l=o("0418"),c=o("fd2d"),u=o("2f62");window.onresize=function(){r["a"]()>document.getElementById("home").offsetHeight&&(document.getElementById("home").style.height=r["a"]()+"px")};var h={name:"Home",components:{Header:l["a"],Footer:c["a"]},computed:{},watch:{$route:function(e,t){var o=e.path;"/linkedRepo"===o||"/home"===o?this.activeName="first":"/signedRepo"!==o&&"/signedRepoLogin"!==o||(this.activeName="second")}},data:function(){return{emailTypeArr:[{value:"Gmail",label:"Gmail"}],emailType:"",emailDialogVisible:!1,filterChange:!0,claLanguageValue:"",claTypeValue:"",claTypeOptions:[{label:"individual",value:"individual"},{label:"corporation",value:"corporation"}],languageOptions:[{label:"english",value:"english"},{label:"chinese",value:"chinese"},{label:"japanese",value:"japanese"}],createMetadataDialogVisible:!1,linkLoading:!1,platform:this.$store.state.platform,isVerify:!1,activeName:"first",previewShow:!1,previewText:"",loginType:this.$store.state.loginType,tableType:1,tableShow:!0,listCurrentPage:1,dropdownTitle:"Linked Repositories",isEmail:!1,email:"",code:"",gitee_client_id:this.$store.state.gitee_client_id,gitee_client_secret:this.$store.state.gitee_client_secret,gitee_redirect_uri:this.$store.state.gitee_redirect_uri,github_client_id:this.$store.state.github_client_id,github_client_secret:this.$store.state.github_client_secret,github_redirect_uri:this.$store.state.github_redirect_uri,access_token:this.$store.state.access_token,refresh_token:this.$store.state.refresh_token,listDialogVisible:!1,checkClaDialogVisible:!1,unLinkDialogVisible:!1,editDialogVisible:!1,menuVisible:!1,claName:"",repositoryName:"",shareGistChecked:!1,claOptions:[],claValue:"",metadataOptions:[{value:0,label:"",id:"",text:"",language:""}],metadataValue:"",showPreviewCla:!1,claChoose:!1,metadataChoose:!1,linkDialogVisible:!1,shareDialogVisible:!1,createCLADialogVisible:!1,authorizeDialogVisible:!1,fileNumber:"",lineNumber:"",gistUrl:"",orgOptions:[],orgValue:"",orgChoose:!1,repositoryOptions:[],repositoryValue:"",repositoryChoose:"",showConfigForm:!1,home:{height:""},user:{userName:this.$store.state.user.userName,userId:this.$store.state.user.userId,isAuthorize:!1}}},methods:Object(n["a"])(Object(n["a"])({},Object(u["b"])(["setLoginUserAct","setTokenAct","getLinkedRepoListAct"])),{},{authorizeEmail:function(){var e="";switch(this.emailType){case"Gmail":e=s["o"];break}this.$axios({url:"/api"+e}).then((function(e){console.log(e),window.location.href=e.data.url})).catch((function(e){console.log(e)})),console.log("authorizeEmail")},changeEmailType:function(e){console.log("changeEmailType",e)},getEmailTypeArr:function(){var e=this;this.$axios({url:"/api"+s["getEmailTypeArr"]}).then((function(t){console.log(t),e.emailTypeArr=t.data})).catch((function(e){console.log(e)}))},toAuthorizedEmail:function(){this.emailDialogVisible=!0},resetCla:function(){this.claChoose=!1,this.filterChange=!0,this.claValue="",this.previewText="",this.getCLA()},claTypeChange:function(e){console.log(e),this.resetCla()},claLanguageChange:function(e){console.log(e),this.resetCla()},handleChange:function(e){console.log(e)},getPath:function(){var e=this.$route.path;"/linkedRepo"===e||"/home"===e?this.activeName="first":"/signedRepo"!==e&&"/signedRepoLogin"!==e||(this.activeName="second")},tabsHandleClick:function(e,t){console.log(e,t),"0"===e.index?this.$router.push("/linkedRepo"):this.$router.push("/signedRepoLogin")},getOrgPermission:function(){"gitee"===this.platform?window.location.href="https://gitee.com/oauth/authorize?client_id=2632e89d3dfb17ce941d2d2b45efc6f235afb4941ddb67578adda83aa33ab6a2&redirect_uri=http://139.159.224.207:60031/api/v1/login?platform=gitee&response_type=code&scope":window.location.href="https://github.com/login/oauth/authorize?client_id=d86f4915398dad23bffc&redirect_url=http://localhost:8080/home&scope=repo"},listChangePage:function(e){console.log(e)},getPersonalSigned:function(){var e=this;console.log("getPersonalRepositories");var t={userName:this.user.userName};this.$axios({url:s["x"],methods:"post",data:t,headers:{access_token:this.$store.state.access_token,refresh_token:this.refresh_token}}).then((function(t){console.log(t),200===t.data.code&&(e.tableData=t.data.data)})).catch((function(e){console.log(e)}))},getCompanyRepositories:function(){var e=this;console.log("getCompanyRepositories");var t={userName:this.user.userName};this.$axios({url:s["r"],methods:"post",data:t,headers:{access_token:this.$store.state.access_token,refresh_token:this.refresh_token}}).then((function(t){console.log(t),200===t.data.code&&(e.tableData=t.data.data)})).catch((function(e){console.log(e)}))},getCompanyPersonRepositories:function(){var e=this;console.log("getCompanyPersonRepositories");var t={userName:this.user.userName};this.$axios({url:s["q"],methods:"post",data:t,headers:{access_token:this.$store.state.access_token,refresh_token:this.refresh_token}}).then((function(t){console.log(t),200===t.data.code&&(e.tableData=t.data.data)})).catch((function(e){console.log(e)}))},newWindow:function(){window.open("https://github.com/ouchengle")},openLinkDialog:function(){this.orgChoose&&this.claChoose&&this.isEmail&&(this.linkDialogVisible=!0)},verifyEmail:function(){var e=this.email,t=/^([a-zA-Z]|[0-9])(\w|\-)+@[a-zA-Z0-9]+\.([a-zA-Z]{2,4})$/;if(!t.test(e))return this.isEmail=!1,!1;this.isEmail=!0},linkRepository:function(){var e=this;this.linkLoading=!0;var t={repo_id:"".concat(this.repositoryOptions[this.repositoryValue].repoName),cla_id:this.claOptions[this.claValue].id,org_email:this.email,platform:this.platform,org_id:"".concat(this.repositoryOptions[this.repositoryValue].org),cla_language:this.claOptions[this.claValue].language,submitter:"".concat(this.platform,"/").concat(this.$store.state.user.userName),metadata_id:""};console.log(t),this.$axios({url:"/api"+s["B"],method:"post",data:t,headers:{"Access-Token":this.access_token,"Refresh-Token":this.refresh_token,User:"".concat(this.platform,"/").concat(this.user.userName)}}).then((function(t){e.linkLoading=!1,e.$message.success("success"),console.log(t),e.claValue="",e.metadataValue="",e.repositoryValue="",e.claChoose=!1,e.metadataChoose=!1,e.repositoryChoose=!1,e.email="",e.linkDialogVisible=!1;var o={access_token:e.$store.state.access_token,refresh_token:e.$store.state.refresh_token,userName:e.$store.state.user.userName,platform:e.platform};e.getLinkedRepoListAct(o)})).catch((function(t){console.log(t),e.linkLoading=!1,e.$message.closeAll(),e.$message.error("failed")}))},checkCla:function(){console.log("checkCla"),this.$router.push("/checkCla")},editHandleClick:function(e){console.log(e),this.editDialogVisible=!0},toCreateCLA:function(){this.$router.push("/createCLA2")},toCreateMetadata:function(){this.$router.push("/createMetadata")},claVisibleChange:function(e){e&&this.filterChange&&(this.getCLA(),this.filterChange=!1)},changeCla:function(e){this.claValue=e,console.log(this.claOptions,this.claValue),this.showPreviewCla=!0,this.claChoose=!0,this.previewText=this.claOptions[e].text},mataVisibleChange:function(e){""!==this.metadataValue&&e&&(this.previewText=this.metadataOptions[this.metadataValue].text)},changeMetadata:function(e){this.metadataChoose=!0,this.previewText=this.metadataOptions[e].text},createCLA:function(){this.createCLADialogVisible=!0},createMetadata:function(){this.createMetadataDialogVisible=!0},authorize:function(){console.log("authorize"),this.authorizeDialogVisible=!0},changeOrg:function(e){console.log(this.orgValue),""!==this.orgValue?(this.orgChoose=!0,this.getRepositoriesOfOrg(this.orgOptions[this.orgValue].label,this.orgOptions[this.orgValue].id)):(this.orgChoose=!1,this.repositoryOptions=[],this.repositoryValue="",this.repositoryChoose=!1)},changeRepository:function(e){console.log(this.repositoryValue),""!==this.repositoryValue?this.repositoryChoose=!0:this.repositoryChoose=!1},getRepositoriesOfOrg:function(e,t){var o=this,i={access_token:this.$store.state.access_token,org:e,page:1,per_page:10};console.log("getRepositoriesOfOrg",i),this.$axios({url:"https://gitee.com/api/v5/orgs/".concat(e,"/repos"),params:i}).then((function(i){console.log(i),200===i.status&&(o.repositoryOptions=[],i.data.forEach((function(i,a){o.repositoryOptions.push({value:a,org:e,org_id:t,repoName:i.name,label:i.name,id:i.id})})))})).catch((function(e){console.log(e)}))},getOrgsInfo:function(){var e=this,t={access_token:this.$store.state.access_token,admin:!0,page:1,per_page:10};console.log("getOrgsInfo",t),this.$axios({url:s["w"],params:t}).then((function(t){console.log(t),200===t.status&&(e.orgOptions=[],t.data.forEach((function(t,o){e.orgOptions.push({value:o,label:t.login,id:t.id})})))})).catch((function(e){console.log(e)}))},getCLA:function(){var e=this;console.log("getCLA"),this.$axios({url:"/api"+s["p"],params:{language:this.claLanguageValue,apply_to:this.claTypeValue},headers:{"Access-Token":this.$store.state.access_token,"Refresh-Token":this.$store.state.refresh_token,User:"".concat(this.$store.state.platform,"/").concat(this.$store.state.user.userName)}}).then((function(t){console.log(t),e.claOptions=[],t.data.length&&t.data.forEach((function(t,o){e.claOptions.push({value:o,label:t.name,id:t.id,text:t.text,language:t.language})}))})).catch((function(e){console.log(e)}))},closeConfigForm:function(){this.$store.commit("setShowConfigForm",!1),this.showConfigForm=!1,this.setClientHeight()},configCla:function(){this.$store.commit("setShowConfigForm",!0),this.showConfigForm=!0,this.home.height="auto",this.getOrgsInfo()},getMeta:function(){var e=this;console.log("getMeta"),this.$axios({url:"/api"+s["v"],headers:{"Access-Token":this.access_token,"Refresh-Token":this.refresh_token,User:"".concat(this.platform,"/").concat(this.user.userName)}}).then((function(t){console.log(t),t.data.length&&(e.metadataOptions=[],t.data.forEach((function(t,o){e.metadataOptions.push({value:o,label:t.name,id:t.id,text:t.text,language:t.language})})))})).catch((function(e){console.log(e)}))},setClientHeight:function(){var e=this;this.$nextTick((function(){r["a"]()>document.getElementById("home").offsetHeight?e.home.height=r["a"]()+"px":e.home.height=document.getElementById("home").offsetHeight}))},change:function(e){console.log(e),this.value=e},openFullScreen:function(){var e=this.$loading({lock:!0,background:"rgba(255, 255, 255, 0.8)"});setInterval((function(){e.close()}),500)},getCookieData:function(){if(""!==document.cookie){var e=document.cookie.split("; ");console.log(e);var t,o="",i="";e.forEach((function(e,a){var n=e.split("=");"access_token"===n[0]?t=n[1]:"refresh_token"===n[0]?o=n[1]:i="email"===n[0]?n[1]:""})),this.email=i;var a={access_token:t,refresh_token:o};this.setTokenAct(a),this.getUserInfo(t,o)}},getUserInfo:function(e,t){var o=this,i={access_token:e};console.log(i),this.$axios({url:s["z"],params:i}).then((function(i){console.log(i);var a={userId:i.data.id,userName:i.data.login,userImg:i.data.avatar_url,userEmail:i.data.email};o.setLoginUserAct(a);var n={access_token:e,refresh_token:t,userName:i.data.login,platform:o.platform};o.getLinkedRepoListAct(n)})).catch((function(e){console.log(e)}))}}),beforeCreate:function(){console.log("beforeCreate")},created:function(){console.log("created"),this.getPath(),this.openFullScreen(),this.getCookieData()},beforeMount:function(){console.log("beforeMount")},mounted:function(){console.log("mounted"),this.setClientHeight()},beforeUpdate:function(){console.log("beforeUpdate")},updated:function(){console.log("updated")},beforeDestroy:function(){console.log("beforeDestroy")},destroyed:function(){console.log("destroyed")}},f=h,g=(o("b4ff"),o("2877")),p=Object(g["a"])(f,i,a,!1,null,"531c401e",null);t["default"]=p.exports},d15f:function(e,t,o){},d32f:function(e,t,o){"use strict";var i=o("e35a"),a=o.n(i);a.a},d784:function(e,t,o){"use strict";o("ac1f");var i=o("6eeb"),a=o("d039"),n=o("b622"),s=o("9263"),r=o("9112"),l=n("species"),c=!a((function(){var e=/./;return e.exec=function(){var e=[];return e.groups={a:"7"},e},"7"!=="".replace(e,"$<a>")})),u=function(){return"$0"==="a".replace(/./,"$0")}(),h=n("replace"),f=function(){return!!/./[h]&&""===/./[h]("a","$0")}(),g=!a((function(){var e=/(?:)/,t=e.exec;e.exec=function(){return t.apply(this,arguments)};var o="ab".split(e);return 2!==o.length||"a"!==o[0]||"b"!==o[1]}));e.exports=function(e,t,o,h){var p=n(e),d=!a((function(){var t={};return t[p]=function(){return 7},7!=""[e](t)})),m=d&&!a((function(){var t=!1,o=/a/;return"split"===e&&(o={},o.constructor={},o.constructor[l]=function(){return o},o.flags="",o[p]=/./[p]),o.exec=function(){return t=!0,null},o[p](""),!t}));if(!d||!m||"replace"===e&&(!c||!u||f)||"split"===e&&!g){var v=/./[p],b=o(p,""[e],(function(e,t,o,i,a){return t.exec===s?d&&!a?{done:!0,value:v.call(t,o,i)}:{done:!0,value:e.call(o,t,i)}:{done:!1}}),{REPLACE_KEEPS_$0:u,REGEXP_REPLACE_SUBSTITUTES_UNDEFINED_CAPTURE:f}),y=b[0],_=b[1];i(String.prototype,e,y),i(RegExp.prototype,p,2==t?function(e,t){return _.call(e,this,t)}:function(e){return _.call(e,this)})}h&&r(RegExp.prototype[p],"sham",!0)}},dbb4:function(e,t,o){var i=o("23e7"),a=o("83ab"),n=o("56ef"),s=o("fc6a"),r=o("06cf"),l=o("8418");i({target:"Object",stat:!0,sham:!a},{getOwnPropertyDescriptors:function(e){var t,o,i=s(e),a=r.f,c=n(i),u={},h=0;while(c.length>h)o=a(i,t=c[h++]),void 0!==o&&l(u,t,o);return u}})},e35a:function(e,t,o){},e439:function(e,t,o){var i=o("23e7"),a=o("d039"),n=o("fc6a"),s=o("06cf").f,r=o("83ab"),l=a((function(){s(1)})),c=!r||l;i({target:"Object",stat:!0,forced:c,sham:!r},{getOwnPropertyDescriptor:function(e,t){return s(n(e),t)}})},e538:function(e,t,o){var i=o("b622");t.f=i},fd2d:function(e,t,o){"use strict";var i=function(){var e=this,t=e.$createElement,o=e._self._c||t;return o("el-row",{staticClass:"footer"},[o("el-col",{staticClass:"left",attrs:{span:8}},[o("span",[e._v("© 2020 HUAWEI SE")])]),o("el-col",{staticClass:"center",attrs:{span:8}},[o("span",[e._v("Made with "),o("svg-icon",{attrs:{"icon-class":"heart"}}),e._v(" from the GitHub team at HUAWEI ")],1)]),o("el-col",{staticClass:"right",attrs:{span:8}},[o("div",[o("span",{staticClass:"pointer"},[e._v("Terms of Service & Privacy Policy")]),o("span",{staticClass:"pointer"},[o("svg-icon",{attrs:{id:"github_logo","icon-class":"github"}}),e._v("Open an issue")],1)])])],1)},a=[],n={name:"Footer"},s=n,r=(o("d32f"),o("2877")),l=Object(r["a"])(s,i,a,!1,null,"023530e2",null);t["a"]=l.exports}}]);
//# sourceMappingURL=chunk-18172740.47c41e30.js.map