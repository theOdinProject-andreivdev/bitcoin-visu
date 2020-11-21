(this["webpackJsonpbitcoin-visu"]=this["webpackJsonpbitcoin-visu"]||[]).push([[0],{44:function(t,e,n){},45:function(t,e,n){},67:function(t,e,n){"use strict";n.r(e);var s=n(6),c=n(1),a=n.n(c),o=n(34),r=n.n(o),i=(n(44),n(5)),b=n(11),u=n(0),l=n(4),h=n(2),f=n(3),j=(n(45),n(24)),d=n.n(j),O=n(35),p=n(36),v=n.n(p),x=function(){var t=new WebSocket("wss://ws.blockchain.info/inv");return{subscribeTo:function(){var e=Object(O.a)(d.a.mark((function e(n){return d.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(t.readyState===t.OPEN){e.next=12;break}return e.prev=1,e.next=4,new Promise((function(e,n){var s=0,c=setInterval((function(){s>99?(clearInterval(c),n(new Error("Maximum number of attempts exceeded"))):t.readyState===t.OPEN&&(clearInterval(c),e()),s++}),100)}));case 4:t.send(JSON.stringify({op:n})),e.next=10;break;case 7:e.prev=7,e.t0=e.catch(1),console.error(e.t0);case 10:e.next=13;break;case 12:t.send(JSON.stringify({op:n}));case 13:case"end":return e.stop()}}),e,null,[[1,7]])})));return function(t){return e.apply(this,arguments)}}(),startListen:function(e,n){t.onmessage=function(t){var s=JSON.parse(t.data);"utx"===s.op&&e(s.x.hash),"block"===s.op&&n(s.x.hash)}},getTxForBlock:function(t,e){v.a.get("https://blockchain.info/rawblock/"+t+"?&cors=true").then((function(t){e(t.data.tx)})).catch((function(t){console.log(t)})).then((function(){}))}}},k=n(14),m=function(t){var e=Object(c.useState)(.09*t.width),n=Object(i.a)(e,2),a=n[0],o=(n[1],Object(c.useState)(20*t.number-75)),r=Object(i.a)(o,2),b=r[0],u=(r[1],Object(c.useState)(0)),l=Object(i.a)(u,2),h=l[0],f=l[1],j=Object(c.useState)(0),d=Object(i.a)(j,2),O=d[0],p=d[1];return Object(k.b)((function(){f(h+.01),p(O+.01)})),Object(s.jsxs)("mesh",{position:[a,b,0],rotation:[h,O,0],scale:[10,10,10],children:[Object(s.jsx)("boxBufferGeometry",{args:[1,1,1]}),Object(s.jsx)("meshStandardMaterial",{color:"orange"})]})},g=function(t){console.log(t.width+" "+t.height);var e=Object(c.useState)(-.1*t.width),n=Object(i.a)(e,2),a=n[0],o=(n[1],Object(c.useState)(Math.random()*(.1*t.height)-.1*t.height/2)),r=Object(i.a)(o,2),b=r[0],u=(r[1],Object(c.useState)(0)),l=Object(i.a)(u,2),h=l[0],f=(l[1],Object(c.useState)(0)),j=Object(i.a)(f,2),d=j[0],O=(j[1],Object(c.useRef)());return Object(k.b)((function(){var e,n;O.current.position.x<.08*t.width&&(O.current.position.x=O.current.position.x+(e=.2,n=.2,Math.random()*(n-e)+e))})),Object(s.jsxs)("mesh",{ref:O,position:[a,b,0],rotation:[h,d,0],scale:[.5,.5,.5],children:[Object(s.jsx)("sphereBufferGeometry",{args:[1]}),Object(s.jsx)("meshStandardMaterial",{color:"hotpink"})]})},S=function(t){Object(h.a)(n,t);var e=Object(f.a)(n);function n(){var t;return Object(u.a)(this,n),(t=e.call(this)).transactions=new Map,t.transactionsInBlocks=0,t.blocks=new Map,t.init(),t}return Object(l.a)(n,[{key:"init",value:function(){var t=this;if(console.log("Init"),"WebSocket"in window){var e=x();e.subscribeTo("unconfirmed_sub"),e.subscribeTo("blocks_sub");var n=function(e){console.log("Size before block: "+t.transactions.size),e.forEach((function(e){t.transactions.has(e.hash)&&(t.transactions.delete(e.hash),t.transactionsInBlocks++)})),console.log("Size after block: "+t.transactions.size)};e.startListen((function(e){var n=t.transactions.get(e);n>0&&t.transactions.set(e,n+1),t.transactions.set(e,1),t.forceUpdate()}),(function(s){var c=t.blocks.get(s);c>0&&t.blocks.set(s,c+1),t.blocks.size>5&&t.blocks.clear(),t.blocks.set(s,1),e.getTxForBlock(s,n)}))}else alert("WebSocket NOT supported by your Browser!")}},{key:"render",value:function(){var t,e=[],n=[],c=Object(b.a)(this.transactions);try{for(c.s();!(t=c.n()).done;){var a=Object(i.a)(t.value,2),o=a[0];a[1];e.push(o)}}catch(j){c.e(j)}finally{c.f()}var r,u=0,l=Object(b.a)(this.blocks);try{for(l.s();!(r=l.n()).done;){var h=Object(i.a)(r.value,2);h[0],h[1];n.push(u),u++}}catch(j){l.e(j)}finally{l.f()}var f=document.querySelector("canvas");return Object(s.jsx)("div",{className:"App",children:Object(s.jsxs)("div",{style:{display:"grid",height:"100%"},children:[Object(s.jsxs)("div",{className:"card",children:[Object(s.jsxs)("div",{className:"card-body",children:["Pending transactions: ",this.transactions.size]}),Object(s.jsxs)("div",{className:"card-body",children:["Transactions in blocks: ",this.transactionsInBlocks]})]}),Object(s.jsxs)(k.a,{className:"canvas",camera:{fov:50,position:[0,0,200]},children:[Object(s.jsx)("ambientLight",{}),Object(s.jsx)("pointLight",{position:[10,10,10]}),e.map((function(t){return Object(s.jsx)(g,{width:f.offsetWidth,height:f.offsetHeight},t)})),n.map((function(t){return Object(s.jsx)(m,{number:t,width:f.offsetWidth,height:f.offsetHeight},t)}))]})]})})}}]),n}(c.Component);r.a.render(Object(s.jsx)(a.a.StrictMode,{children:Object(s.jsx)(S,{})}),document.getElementById("root"))}},[[67,1,2]]]);
//# sourceMappingURL=main.b3514716.chunk.js.map