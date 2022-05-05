(window.webpackJsonp=window.webpackJsonp||[]).push([[16],{281:function(t,a,s){"use strict";s.r(a);var n=s(17),e=Object(n.a)({},(function(){var t=this,a=t.$createElement,s=t._self._c||a;return s("ContentSlotsDistributor",{attrs:{"slot-key":t.$parent.slotKey}},[s("h1",{attrs:{id:"静态资源"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#静态资源"}},[t._v("#")]),t._v(" 静态资源")]),t._v(" "),s("h2",{attrs:{id:"配置资源路径"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#配置资源路径"}},[t._v("#")]),t._v(" 配置资源路径")]),t._v(" "),s("p",[t._v("在前面的返回值解析部分已经提到过相关点，Aurora默认的静态资源解析是项目根路径，想要修改默认的解析路径需要通过配置文件application.yml进行配置。\n在项目中创建一个application.yml文件，写入一下配置:")]),t._v(" "),s("div",{staticClass:"language-yaml extra-class"},[s("pre",{pre:!0,attrs:{class:"language-yaml"}},[s("code",[s("span",{pre:!0,attrs:{class:"token key atrule"}},[t._v("aurora")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v("\n  "),s("span",{pre:!0,attrs:{class:"token key atrule"}},[t._v("resource")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token comment"}},[t._v("#path#")]),t._v("\n")])])]),s("h2",{attrs:{id:"html解析"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#html解析"}},[t._v("#")]),t._v(" HTML解析")]),t._v(" "),s("p",[t._v("关于 HTML 的解析，它和其它静态资源解析的方式不太一样，在代码中通过返回一个 HTML 的根路径来实现对 HTML 文件进行视图响应。这个根路径是静态资源的根路径，默认的根路径和项目根路径相同。"),s("br"),s("br"),t._v("\n假设你有以下的项目结构:")]),t._v(" "),s("div",{staticClass:"language-text extra-class"},[s("pre",{pre:!0,attrs:{class:"language-text"}},[s("code",[t._v(".\n|——controller\n|——services\n|——doa\n|——application.yml\n|——static\n| |——html\n| |  |——index.html\n")])])]),s("p",[t._v("application.yml")]),t._v(" "),s("div",{staticClass:"language-yml extra-class"},[s("pre",{pre:!0,attrs:{class:"language-yml"}},[s("code",[s("span",{pre:!0,attrs:{class:"token key atrule"}},[t._v("aurora")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v("\n  "),s("span",{pre:!0,attrs:{class:"token key atrule"}},[t._v("resource")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" static\n")])])]),s("p",[t._v("代码中需要:")]),t._v(" "),s("div",{staticClass:"language-go extra-class"},[s("pre",{pre:!0,attrs:{class:"language-go"}},[s("code",[t._v("a"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("Get")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),s("span",{pre:!0,attrs:{class:"token string"}},[t._v('"/index"')]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("func")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token builtin"}},[t._v("string")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n    "),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("return")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token string"}},[t._v('"/html/index.html"')]),t._v("\n"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n")])])]),s("h2",{attrs:{id:"其它资源"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#其它资源"}},[t._v("#")]),t._v(" 其它资源")]),t._v(" "),s("p",[t._v("对于非 HTML 文件的加载也有着一个约定,主要是相对于 HTML 需要,在静态资源目录中相对 HTML 中能够正常引入的地方即可。")])])}),[],!1,null,null,null);a.default=e.exports}}]);