(function(){var t={5131:function(t,e,n){"use strict";n.r(e),e["default"]="　　滕王高阁临江渚，佩玉鸣鸾罢歌舞。\n　　画栋朝飞南浦云，珠帘暮卷西山雨。\n　　闲云潭影日悠悠，物换星移几度秋。\n　　阁中帝子今何在？槛外长江空自流。"},8082:function(t,e,n){"use strict";var o=n(5130),r=n(6768);const i={id:"app"};function a(t,e,n,o,a,l){const s=(0,r.g2)("router-view");return(0,r.uX)(),(0,r.CE)("div",i,[(0,r.bF)(s)])}var l={name:"App"},s=n(1241);const c=(0,s.A)(l,[["render",a]]);var u=c,g=n(973),d=n(4232);const f={class:"bottom-rounded-bg"},h={class:"blog-list"},b=["onClick"],p=["innerHTML"],v={class:"blog-date"},m={class:"pagination"},k=["disabled"],y=["disabled"];function L(t,e,n,o,i,a){return(0,r.uX)(),(0,r.CE)(r.FK,null,[e[3]||(e[3]=(0,r.Lk)("div",{class:"rounded-bg"},[(0,r.Lk)("h1",{class:"title"},"阁中帝子今何在？槛外长江空自流")],-1)),(0,r.Lk)("div",f,[e[2]||(e[2]=(0,r.Lk)("h2",{class:"blog-title"},"sunduskxy",-1)),(0,r.Lk)("ul",h,[((0,r.uX)(!0),(0,r.CE)(r.FK,null,(0,r.pI)(a.paginatedBlogs,((t,e)=>((0,r.uX)(),(0,r.CE)("li",{class:"blog-item",key:e,onClick:e=>a.goToBlog(t.id)},[(0,r.Lk)("h3",null,(0,d.v_)(t.title),1),(0,r.Lk)("div",{innerHTML:a.getTruncatedContent(t.content)},null,8,p),(0,r.Lk)("p",v,(0,d.v_)(t.date),1)],8,b)))),128))]),(0,r.Lk)("div",m,[(0,r.Lk)("button",{onClick:e[0]||(e[0]=t=>a.changePage(i.currentPage-1)),disabled:1===i.currentPage},"上一页",8,k),(0,r.Lk)("span",null,"第 "+(0,d.v_)(i.currentPage)+" 页，共 "+(0,d.v_)(a.totalPages)+" 页",1),(0,r.Lk)("button",{onClick:e[1]||(e[1]=t=>a.changePage(i.currentPage+1)),disabled:i.currentPage===a.totalPages},"下一页",8,y)])])],64)}n(4114);var C=n(357),T={name:"XYHome",data(){return{blogs:[],currentPage:1,pageSize:10,contentLimit:150}},computed:{totalPages(){return Math.ceil(this.blogs.length/this.pageSize)},paginatedBlogs(){const t=(this.currentPage-1)*this.pageSize;return this.blogs.slice(t,t+this.pageSize)}},methods:{loadBlogs(){try{const t=n(653),e=t.keys().map((e=>{const n=t(e).default,o=(0,C.xI)(n);return{id:e.slice(2,-3),title:e.slice(2,-3),content:o,date:(new Date).toISOString().split("T")[0]}}));this.blogs=e}catch(t){console.error("加载博客文章时出错:",t)}},goToBlog(t){this.$router.push({name:"XYBlogDetail",params:{id:t}})},changePage(t){t>=1&&t<=this.totalPages&&(this.currentPage=t,window.scrollTo({top:0,behavior:"smooth"}))},getTruncatedContent(t){const e=t.replace(/(<([^>]+)>)/gi,"");return e.length>this.contentLimit?(0,C.xI)(e.slice(0,this.contentLimit)+"..."):t}},mounted(){this.loadBlogs()}};const O=(0,s.A)(T,[["render",L]]);var P=O;const w={class:"blog-detail"},_={class:"header-image"},S={class:"blog-date"},x=["innerHTML"];function B(t,e,n,o,i,a){return(0,r.uX)(),(0,r.CE)("div",w,[(0,r.Lk)("div",_,[(0,r.Lk)("h1",null,(0,d.v_)(i.blogTitle),1),(0,r.Lk)("p",S,(0,d.v_)(i.blogDate),1)]),(0,r.Lk)("div",{class:"content-card",innerHTML:i.blogContent},null,8,x)])}var D={name:"XYBlogDetail",data(){return{blogTitle:"",blogContent:"",blogDate:""}},created(){const t=this.$route.params.id;this.fetchBlogContent(t)},methods:{fetchBlogContent(t){const e=n(653),o=`./${t}.md`;if(e.keys().includes(o)){const n=e(o).default;this.blogTitle=t,this.blogContent=(0,C.xI)(n),this.blogDate=(new Date).toISOString().split("T")[0]}else this.blogTitle="博客未找到",this.blogContent="抱歉，没有找到您请求的博客内容。",this.blogDate=""}}};const E=(0,s.A)(D,[["render",B]]);var X=E;const j=[{path:"/",name:"XYHome",component:P},{path:"/blog/:id",name:"XYBlogDetail",component:X}],M=(0,g.aE)({history:(0,g.LA)(),routes:j});var H=M;const I=(0,o.Ef)(u);I.use(H),I.mount("#app")},653:function(t,e,n){var o={"./xy.md":5131};function r(t){var e=i(t);return n(e)}function i(t){if(!n.o(o,t)){var e=new Error("Cannot find module '"+t+"'");throw e.code="MODULE_NOT_FOUND",e}return o[t]}r.keys=function(){return Object.keys(o)},r.resolve=i,t.exports=r,r.id=653}},e={};function n(o){var r=e[o];if(void 0!==r)return r.exports;var i=e[o]={exports:{}};return t[o].call(i.exports,i,i.exports,n),i.exports}n.m=t,function(){var t=[];n.O=function(e,o,r,i){if(!o){var a=1/0;for(u=0;u<t.length;u++){o=t[u][0],r=t[u][1],i=t[u][2];for(var l=!0,s=0;s<o.length;s++)(!1&i||a>=i)&&Object.keys(n.O).every((function(t){return n.O[t](o[s])}))?o.splice(s--,1):(l=!1,i<a&&(a=i));if(l){t.splice(u--,1);var c=r();void 0!==c&&(e=c)}}return e}i=i||0;for(var u=t.length;u>0&&t[u-1][2]>i;u--)t[u]=t[u-1];t[u]=[o,r,i]}}(),function(){n.n=function(t){var e=t&&t.__esModule?function(){return t["default"]}:function(){return t};return n.d(e,{a:e}),e}}(),function(){n.d=function(t,e){for(var o in e)n.o(e,o)&&!n.o(t,o)&&Object.defineProperty(t,o,{enumerable:!0,get:e[o]})}}(),function(){n.g=function(){if("object"===typeof globalThis)return globalThis;try{return this||new Function("return this")()}catch(t){if("object"===typeof window)return window}}()}(),function(){n.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)}}(),function(){n.r=function(t){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})}}(),function(){var t={524:0};n.O.j=function(e){return 0===t[e]};var e=function(e,o){var r,i,a=o[0],l=o[1],s=o[2],c=0;if(a.some((function(e){return 0!==t[e]}))){for(r in l)n.o(l,r)&&(n.m[r]=l[r]);if(s)var u=s(n)}for(e&&e(o);c<a.length;c++)i=a[c],n.o(t,i)&&t[i]&&t[i][0](),t[i]=0;return n.O(u)},o=self["webpackChunkmy_blog"]=self["webpackChunkmy_blog"]||[];o.forEach(e.bind(null,0)),o.push=e.bind(null,o.push.bind(o))}();var o=n.O(void 0,[504],(function(){return n(8082)}));o=n.O(o)})();
//# sourceMappingURL=app.1f980fe3.js.map