(window.webpackJsonp=window.webpackJsonp||[]).push([[1,10,11,12],{"/SUP":function(e,t,r){"use strict";r.r(t);var n=r("q1tI"),i=r.n(n),o=r("qKvR");t.default=function(){return Object(o.c)(i.a.Fragment,null,Object(o.c)("h2",null,"発動履歴"))}},"3X/8":function(e,t,r){"use strict";r.r(t);var n=r("q1tI"),i=r("5Fep"),o=r("/SUP"),a=r("a8FM"),c=r("qKvR"),s={name:"k008qs",styles:"display:flex;"},l={name:"2u1lp9",styles:"flex-grow:1;display:flex;flex-direction:column;"},d={name:"1j7mxzg",styles:"width:0px;display:none;@media (min-width: 768px){width:33.333333%;display:block;}"};t.default=function(){var e=function(){var e=new Date;return e.setHours(0),e.setMinutes(0),e.setSeconds(0),e},t=Object(n.useState)(new Date),r=t[0],u=t[1],b=Object(n.useRef)(null),m=Object(n.useState)(e()),g=m[0],f=m[1],w=Object(n.useRef)(null),p=Object(n.useState)(e()),h=p[0],v=p[1],y=Object(n.useRef)(null),x=Object(n.useState)(!1),j=x[0],O=x[1],k=Object(n.useState)([e(),e()]),T=k[0],D=k[1],S=Object(n.useState)("0465"),C=S[0],z=S[1],q=Object(n.useState)(e()),M=q[0],I=q[1],B=Object(n.useRef)(null),L=Object(n.useState)(e()),R=L[0],E=L[1],F=Object(n.useRef)(null),P=Object(n.useRef)(null),N=Object(n.useRef)(null),A=Object(n.useState)([]),W=A[0],H=A[1],K=Object(n.useState)(!1),J=K[0],U=K[1],Q=Object(n.useState)(!0),X=Q[0],Z=Q[1];Object(n.useEffect)((function(){var e=$();return b.current=setTimeout(u.bind(null,ie(e)),50),function(){null!==b.current&&clearTimeout(b.current),b.current=null}}),[r]);var G=Object(n.useState)(),V=G[0],Y=G[1];Object(n.useEffect)((function(){Y([new Audio("../../static/sounds/cursor2.mp3"),new Audio("../../static/sounds/warning1.mp3")])}),[]);var $=function(){var e=new Date,t=Number(e.getHours()+""+("0"+e.getMinutes()).slice(-2));return null!==b.current&&clearTimeout(b.current),ee((t<=800?"8:00":t<=1250?"12:30":t<=1820?"18:00":t<=1920?"19:00":t<=2020?"20:00":t<=2120?"21:00":t<=2220?"22:00":t<=2320?"23:00":"24:00")+":00:00")},_=function(e){return 0,("0"+e.getHours()).slice(-2)+":"+("0"+e.getMinutes()).slice(-2)+":"+("0"+e.getSeconds()).slice(-2)+":0"},ee=function(e){var t=e.split(":"),r=new Date;return r.setHours(Number(t[0])),r.setMinutes(Number(t[1])),r.setSeconds(Number(t[2])),r},te=function(t){var r=e();return r.setTime(r.getTime()+t.getTime()-(new Date).getTime()),r},re=function(e,t){var r=new Date(t);return r.setSeconds(t.getSeconds()+e),r},ne=function(e){V&&V[e]&&V[e].play()},ie=function(t){var r=re(1200,t),n=te(r);return n.getDate()!==(new Date).getDate()&&null!==b.current?(clearTimeout(b.current),b.current=null,e()):n},oe=function(){var t=re(F.current[0],P.current),r=te(t);r.getDate()!=(new Date).getDate()?(ne(1),null!==w.current&&clearInterval(w.current),w.current=null,f((function(){return e()}))):(f(r),60*r.getMinutes()+r.getSeconds()==10&&ne(0))},ae=function(){var t=re(F.current[0]+F.current[1],P.current),r=te(t);r.getDate()!=(new Date).getDate()?(ne(1),U(!1),Z(!0),H([]),null!==y.current&&clearInterval(y.current),y.current=null,v((function(){return e()})),P.current=new Date,F.current=[0,0],O(!1)):(v(r),60*r.getMinutes()+r.getSeconds()==10&&ne(0))},ce=function(t){var r=re(90,t),n=te(r);n.getDate()!=(new Date).getDate()?(null!==B.current&&clearInterval(B.current),B.current=null,I((function(){return e()}))):(I(n),n.getMinutes(),n.getSeconds())},se=Object(n.useCallback)((function(){var e=new Date;E(re(-90,r)),null!==B.current&&clearInterval(B.current),B.current=setInterval(ce.bind(void 0,e),50)}),[r]),le=Object(n.useCallback)((function(){var t=e();f(t),v(t),P.current=new Date,F.current=[0,0],O(!1),D([t,t]),null!==w.current&&clearInterval(w.current),w.current=null,null!==y.current&&clearInterval(y.current),y.current=null,U(!1),Z(!0),H([])}),[]);return Object(c.c)("div",{css:s},Object(c.c)("div",{css:l},Object(c.c)(i.default,{coloCountText:_(r).slice(0,8),coloMareStartTime:_(T[0]).slice(0,8),coloMareEndTime:_(T[1]).slice(0,8),coloMareId:C,readyCountText:_(g).slice(0,8),mareCountText:_(h).slice(0,8),shinmaCountText:_(M).slice(0,8),shinmaEndTime:_(R).slice(0,8)}),Object(c.c)(a.default,{triggers:W,handleTriggers:function(e,t){H(t)},optButtonDisabled:X,startButtonDisabled:J,handleShinmaButton:se,handleStartButton:function(){O(!0),P.current=new Date,N.current=r,ne(0),null!==w.current&&clearInterval(w.current),w.current=null,null!==y.current&&clearInterval(y.current),y.current=null,U(!0)},handleRestartButton:function(){P.current=new Date,D([re(-1-F.current[0],r),re(-1-F.current[0]-F.current[1],r)]),null!==w.current&&clearInterval(w.current),w.current=null,null!==y.current&&clearInterval(y.current),y.current=null,w.current=setInterval(oe,50),y.current=setInterval(ae,50)},handleShorteningButton:function(){P.current=re(-60,P.current),N.current=re(60,N.current),D([re(60,T[0]),re(60,T[1])])},handleMinusButton:function(){P.current=re(-1,P.current),N.current=re(1,N.current),D([re(1,T[0]),re(1,T[1])])},handleClearButton:le,handleNightmareButton:function(e){!1===j&&(P.current=new Date,N.current=r,ne(0)),O(!0);var t=-1!==W.indexOf("90s")?90:-1!==W.indexOf("short")?5:void 0===e.currentTarget.dataset.ready?0:+e.currentTarget.dataset.ready,n=void 0===e.currentTarget.dataset.activate?0:+e.currentTarget.dataset.activate;F.current=[t,n];var i=re(-1-F.current[0],N.current),o=re(-1-F.current[0]-F.current[1],N.current);D([i,o]),z(void 0===e.currentTarget.dataset.id?"0465":e.currentTarget.dataset.id),null!==w.current&&clearInterval(w.current),w.current=null,null!==y.current&&clearInterval(y.current),y.current=null,w.current=setInterval(oe,50),y.current=setInterval(ae,50),U(!0),Z(!1)}})),Object(c.c)("div",{css:d},Object(c.c)(o.default,null)))}},"5Fep":function(e,t,r){"use strict";r.r(t);var n=r("qKvR"),i={timerDisplayTable:{display:"flex",flexDirection:"column",width:"100%",padding:"0.5rem","@media (min-width: 640px)":{width:"33.333333%"}},timerTextLabel4:{width:"9rem",margin:"0.25rem",textAlign:"center",fontWeight:"700",borderBottomWidth:"1px","--tw-border-opacity":"1",borderColor:"rgba(156, 163, 175, var(--tw-border-opacity))"},timerTextLabel2:{width:"4rem",margin:"0.25rem",textAlign:"center",fontWeight:"700",borderBottomWidth:"1px","--tw-border-opacity":"1",borderColor:"rgba(156, 163, 175, var(--tw-border-opacity))"},timerDataLabel:{width:"10rem",margin:"0.25rem",textAlign:"center",fontFamily:'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace',fontWeight:"700",borderBottomWidth:"1px","--tw-border-opacity":"1",borderColor:"rgba(156, 163, 175, var(--tw-border-opacity))"}},o={name:"vaak6u",styles:"display:none;@media (min-width: 640px){display:block;}"},a={name:"ptvzmb",styles:"flex-grow:1;display:flex;align-items:center;width:max-content;margin-left:auto;margin-right:auto;font-size:1.875rem;line-height:2.25rem;@media (min-width: 640px){align-items:flex-start;}"},c={name:"11bbmqx",styles:"width:8rem;margin-right:1rem;text-align:center;display:block;@media (min-width: 640px){display:none;}"},s={name:"j7qwjs",styles:"display:flex;flex-direction:column;"},l={name:"1xhj18k",styles:"display:flex;flex-direction:row;"},d={name:"k008qs",styles:"display:flex;"},u={name:"1fbdxpc",styles:"width:5rem;height:5rem;margin-top:0.25rem;margin-bottom:0.25rem;"},b={name:"k008qs",styles:"display:flex;"},m={name:"k008qs",styles:"display:flex;"},g=function(e){var t=e.coloCountText,r=e.coloMareId,g=e.coloMareStartTime,f=e.coloMareEndTime;return Object(n.c)("div",{css:Object(n.b)([i.timerDisplayTable])},Object(n.c)("h6",{css:o},"コロシアム残り時間"),Object(n.c)("div",{css:a},Object(n.c)("div",{css:c},Object(n.c)("span",null,"コロシアム",Object(n.c)("br",null),"残り時間")),Object(n.c)("div",{css:s},Object(n.c)("div",{css:l},Object(n.c)("div",{css:Object(n.b)([i.timerTextLabel4])},"全体時間"),Object(n.c)("div",{css:Object(n.b)([i.timerDataLabel])},t)),Object(n.c)("div",{css:d},Object(n.c)("div",{css:u},Object(n.c)("div",{"data-id":r})),Object(n.c)("div",null,Object(n.c)("div",{css:b},Object(n.c)("div",{css:Object(n.b)([i.timerTextLabel2])},"発動"),Object(n.c)("div",{css:Object(n.b)([i.timerDataLabel])},g)),Object(n.c)("div",{css:m},Object(n.c)("div",{css:Object(n.b)([i.timerTextLabel2])},"終了"),Object(n.c)("div",{css:Object(n.b)([i.timerDataLabel])},f)))))))},f={name:"vaak6u",styles:"display:none;@media (min-width: 640px){display:block;}"},w={name:"ptvzmb",styles:"flex-grow:1;display:flex;align-items:center;width:max-content;margin-left:auto;margin-right:auto;font-size:1.875rem;line-height:2.25rem;@media (min-width: 640px){align-items:flex-start;}"},p={name:"11bbmqx",styles:"width:8rem;margin-right:1rem;text-align:center;display:block;@media (min-width: 640px){display:none;}"},h={name:"j7qwjs",styles:"display:flex;flex-direction:column;"},v={name:"k008qs",styles:"display:flex;"},y={name:"k008qs",styles:"display:flex;"},x=function(e){var t=e.readyCountText,r=e.mareCountText;return Object(n.c)("div",{css:Object(n.b)([i.timerDisplayTable])},Object(n.c)("h6",{css:f},"メアタイマー"),Object(n.c)("div",{css:w},Object(n.c)("div",{css:p},Object(n.c)("span",null,"メア",Object(n.c)("br",null),"タイマー")),Object(n.c)("div",{css:h},Object(n.c)("div",{css:v},Object(n.c)("div",{css:Object(n.b)([i.timerTextLabel4])},"発動時間"),Object(n.c)("div",{css:Object(n.b)([i.timerDataLabel])},t)),Object(n.c)("div",{css:y},Object(n.c)("div",{css:Object(n.b)([i.timerTextLabel4])},"終了時間"),Object(n.c)("div",{css:Object(n.b)([i.timerDataLabel])},r)))))},j={name:"vaak6u",styles:"display:none;@media (min-width: 640px){display:block;}"},O={name:"ptvzmb",styles:"flex-grow:1;display:flex;align-items:center;width:max-content;margin-left:auto;margin-right:auto;font-size:1.875rem;line-height:2.25rem;@media (min-width: 640px){align-items:flex-start;}"},k={name:"11bbmqx",styles:"width:8rem;margin-right:1rem;text-align:center;display:block;@media (min-width: 640px){display:none;}"},T={name:"j7qwjs",styles:"display:flex;flex-direction:column;"},D={name:"k008qs",styles:"display:flex;"},S={name:"k008qs",styles:"display:flex;"},C=function(e){var t=e.shinmaCountText,r=e.shinmaEndTime;return Object(n.c)("div",{css:Object(n.b)([i.timerDisplayTable])},Object(n.c)("h6",{css:j},"神魔タイマー"),Object(n.c)("div",{css:O},Object(n.c)("div",{css:k},Object(n.c)("span",null,"神魔",Object(n.c)("br",null),"タイマー")),Object(n.c)("div",{css:T},Object(n.c)("div",{css:D},Object(n.c)("div",{css:Object(n.b)([i.timerTextLabel4])},"残り時間"),Object(n.c)("div",{css:Object(n.b)([i.timerDataLabel])},t)),Object(n.c)("div",{css:S},Object(n.c)("div",{css:Object(n.b)([i.timerTextLabel4])},"終了時刻"),Object(n.c)("div",{css:Object(n.b)([i.timerDataLabel])},r)))))},z={name:"2imjyh",styles:"display:flex;flex-wrap:wrap;"};t.default=function(e){var t=e.coloCountText,r=e.coloMareStartTime,i=e.coloMareEndTime,o=e.coloMareId,a=e.readyCountText,c=e.mareCountText,s=e.shinmaCountText,l=e.shinmaEndTime;return Object(n.c)("div",{css:z},Object(n.c)(g,{coloCountText:t,coloMareStartTime:r,coloMareEndTime:i,coloMareId:o}),Object(n.c)(x,{readyCountText:a,mareCountText:c}),Object(n.c)(C,{shinmaCountText:s,shinmaEndTime:l}))}},a8FM:function(e,t,r){"use strict";r.r(t);var n=r("KQm4"),i=r("rePB"),o=r("q1tI"),a=r("7cJT"),c=r("s2Hx"),s=r("5ZAF"),l=r("qKvR");function d(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,n)}return r}var u={name:"olyig7",styles:"padding:0.5rem;"},b={name:"3unn9g",styles:"display:flex;flex-direction:row;justify-content:space-between;align-items:center;padding-left:1rem;padding-right:1rem;"},m={name:"1v35imo",styles:"display:flex;flex-direction:column;margin:0.25rem;"},g={name:"1fjl46i",styles:"display:inline-flex;flex-direction:row;margin-bottom:0.25rem;"},f={name:"fnpwih",styles:"position:relative;height:4rem;border-top-left-radius:0.375rem;border-bottom-left-radius:0.375rem;overflow:hidden;"},w={name:"1q9eof6",styles:"width:4rem;height:4rem;box-sizing:border-box;appearance:none;cursor:pointer;transition-property:background-color, border-color, color, fill, stroke, opacity, box-shadow, transform;transition-timing-function:cubic-bezier(0.4, 0, 0.2, 1);transition-duration:150ms;:focus{outline:2px solid transparent;outline-offset:2px;}:focus-visible{--tw-ring-offset-shadow:var(--tw-ring-inset) 0 0 0 var(--tw-ring-offset-width) var(--tw-ring-offset-color);--tw-ring-shadow:var(--tw-ring-inset) 0 0 0 calc(3px + var(--tw-ring-offset-width)) var(--tw-ring-color);box-shadow:var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow, 0 0 #0000);}border-width:1px;--tw-border-opacity:1;border-color:rgba(156, 163, 175, var(--tw-border-opacity));:hover{background-color:rgba(0, 0, 0, 0.12);}:checked{background-color:rgba(0, 0, 0, 0.38);}.dark &{:checked{background-color:rgba(255, 255, 255, 0.08);}}border-top-left-radius:0.375rem;border-bottom-left-radius:0.375rem;"},p={name:"nv59ju",styles:"position:absolute;left:0px;top:0px;width:100%;height:100%;z-index:-1;"},h={name:"10u1fjz",styles:"position:relative;height:4rem;border-top-right-radius:0.375rem;border-bottom-right-radius:0.375rem;overflow:hidden;"},v={name:"xcj080",styles:"width:4rem;height:4rem;box-sizing:border-box;appearance:none;cursor:pointer;transition-property:background-color, border-color, color, fill, stroke, opacity, box-shadow, transform;transition-timing-function:cubic-bezier(0.4, 0, 0.2, 1);transition-duration:150ms;:focus{outline:2px solid transparent;outline-offset:2px;}:focus-visible{--tw-ring-offset-shadow:var(--tw-ring-inset) 0 0 0 var(--tw-ring-offset-width) var(--tw-ring-offset-color);--tw-ring-shadow:var(--tw-ring-inset) 0 0 0 calc(3px + var(--tw-ring-offset-width)) var(--tw-ring-color);box-shadow:var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow, 0 0 #0000);}border-width:1px;--tw-border-opacity:1;border-color:rgba(156, 163, 175, var(--tw-border-opacity));:hover{background-color:rgba(0, 0, 0, 0.12);}:checked{background-color:rgba(0, 0, 0, 0.38);}.dark &{:checked{background-color:rgba(255, 255, 255, 0.08);}}border-top-right-radius:0.375rem;border-bottom-right-radius:0.375rem;border-left-width:0px;"},y={name:"nv59ju",styles:"position:absolute;left:0px;top:0px;width:100%;height:100%;z-index:-1;"},x={name:"vxcmzt",styles:"display:inline-flex;"},j={name:"1rkuwce",styles:"width:4rem;font-size:0.875rem;line-height:1.25rem;text-align:center;cursor:pointer;overflow:hidden;"},O={name:"1rkuwce",styles:"width:4rem;font-size:0.875rem;line-height:1.25rem;text-align:center;cursor:pointer;overflow:hidden;"},k={name:"l158p4",styles:"font-size:1.5rem;line-height:2rem;--tw-bg-opacity:1;background-color:rgba(37, 99, 235, var(--tw-bg-opacity));--tw-text-opacity:1;color:rgba(255, 255, 255, var(--tw-text-opacity));border-radius:0.5rem;padding-top:0.5rem;padding-bottom:0.5rem;padding-left:1rem;padding-right:1rem;transition-property:background-color, border-color, color, fill, stroke, opacity, box-shadow, transform;transition-timing-function:cubic-bezier(0.4, 0, 0.2, 1);transition-duration:150ms;user-select:none;:hover{--tw-bg-opacity:1;background-color:rgba(30, 64, 175, var(--tw-bg-opacity));}:disabled{--tw-bg-opacity:1;background-color:rgba(156, 163, 175, var(--tw-bg-opacity));}:focus{outline:2px solid transparent;outline-offset:2px;}:focus-visible{--tw-ring-offset-shadow:var(--tw-ring-inset) 0 0 0 var(--tw-ring-offset-width) var(--tw-ring-offset-color);--tw-ring-shadow:var(--tw-ring-inset) 0 0 0 calc(3px + var(--tw-ring-offset-width)) var(--tw-ring-color);box-shadow:var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow, 0 0 #0000);}"},T={name:"mj799w",styles:"width:100%;padding-left:0.5rem;padding-right:0.5rem;"},D={name:"lynckt",styles:"width:100%;font-size:2.25rem;line-height:2.5rem;--tw-bg-opacity:1;background-color:rgba(14, 165, 233, var(--tw-bg-opacity));--tw-text-opacity:1;color:rgba(255, 255, 255, var(--tw-text-opacity));border-radius:1rem;padding:1.5rem;transition-property:background-color, border-color, color, fill, stroke, opacity, box-shadow, transform;transition-timing-function:cubic-bezier(0.4, 0, 0.2, 1);transition-duration:150ms;user-select:none;:hover{--tw-bg-opacity:1;background-color:rgba(3, 105, 161, var(--tw-bg-opacity));}:disabled{--tw-bg-opacity:1;background-color:rgba(156, 163, 175, var(--tw-bg-opacity));}:focus{outline:2px solid transparent;outline-offset:2px;}:focus-visible{--tw-ring-offset-shadow:var(--tw-ring-inset) 0 0 0 var(--tw-ring-offset-width) var(--tw-ring-offset-color);--tw-ring-shadow:var(--tw-ring-inset) 0 0 0 calc(3px + var(--tw-ring-offset-width)) var(--tw-ring-color);box-shadow:var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow, 0 0 #0000);}"},S={name:"1kqifmd",styles:"display:flex;justify-content:space-between;padding:0.5rem;"},C={name:"k008qs",styles:"display:flex;"},z={name:"j7qwjs",styles:"display:flex;flex-direction:column;"},q={name:"7f0yrg",styles:"position:relative;width:4rem;height:4rem;align-items:center;border-radius:9999px;padding:0.25rem;margin-left:0.25rem;transition-property:background-color, border-color, color, fill, stroke, opacity, box-shadow, transform;transition-timing-function:cubic-bezier(0.4, 0, 0.2, 1);transition-duration:150ms;user-select:none;:hover{background-color:rgba(0, 0, 0, 0.12);}:active{background-color:rgba(0, 0, 0, 0.24);}:disabled{background-color:rgba(0, 0, 0, 0.38);}:focus{outline:2px solid transparent;outline-offset:2px;}:focus-visible{--tw-ring-offset-shadow:var(--tw-ring-inset) 0 0 0 var(--tw-ring-offset-width) var(--tw-ring-offset-color);--tw-ring-shadow:var(--tw-ring-inset) 0 0 0 calc(3px + var(--tw-ring-offset-width)) var(--tw-ring-color);box-shadow:var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow, 0 0 #0000);}overflow:hidden;@media (min-width: 640px){padding-left:1rem;padding-right:1rem;padding-top:0.5rem;padding-bottom:0.5rem;margin:0.5rem;}"},M={name:"x0xq6w",styles:"position:absolute;top:-0.5rem;left:-0.5rem;width:5rem;height:5rem;z-index:-1;"},I={name:"1gbrirn",styles:"width:100%;font-size:0.875rem;line-height:1.25rem;text-align:center;cursor:pointer;overflow:hidden;"},B={name:"j7qwjs",styles:"display:flex;flex-direction:column;"},L={name:"7f0yrg",styles:"position:relative;width:4rem;height:4rem;align-items:center;border-radius:9999px;padding:0.25rem;margin-left:0.25rem;transition-property:background-color, border-color, color, fill, stroke, opacity, box-shadow, transform;transition-timing-function:cubic-bezier(0.4, 0, 0.2, 1);transition-duration:150ms;user-select:none;:hover{background-color:rgba(0, 0, 0, 0.12);}:active{background-color:rgba(0, 0, 0, 0.24);}:disabled{background-color:rgba(0, 0, 0, 0.38);}:focus{outline:2px solid transparent;outline-offset:2px;}:focus-visible{--tw-ring-offset-shadow:var(--tw-ring-inset) 0 0 0 var(--tw-ring-offset-width) var(--tw-ring-offset-color);--tw-ring-shadow:var(--tw-ring-inset) 0 0 0 calc(3px + var(--tw-ring-offset-width)) var(--tw-ring-color);box-shadow:var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow, 0 0 #0000);}overflow:hidden;@media (min-width: 640px){padding-left:1rem;padding-right:1rem;padding-top:0.5rem;padding-bottom:0.5rem;margin:0.5rem;}"},R={name:"x0xq6w",styles:"position:absolute;top:-0.5rem;left:-0.5rem;width:5rem;height:5rem;z-index:-1;"},E={name:"1gbrirn",styles:"width:100%;font-size:0.875rem;line-height:1.25rem;text-align:center;cursor:pointer;overflow:hidden;"},F={name:"j7qwjs",styles:"display:flex;flex-direction:column;"},P={name:"1v9vtmd",styles:"width:4rem;height:4rem;align-items:center;--tw-bg-opacity:1;background-color:rgba(16, 185, 129, var(--tw-bg-opacity));--tw-text-opacity:1;color:rgba(255, 255, 255, var(--tw-text-opacity));border-radius:9999px;padding-left:0.5rem;padding-right:0.5rem;padding-top:0.25rem;padding-bottom:0.25rem;margin-left:0.25rem;transition-property:background-color, border-color, color, fill, stroke, opacity, box-shadow, transform;transition-timing-function:cubic-bezier(0.4, 0, 0.2, 1);transition-duration:150ms;user-select:none;:hover{--tw-bg-opacity:1;background-color:rgba(4, 120, 87, var(--tw-bg-opacity));}:disabled{--tw-bg-opacity:1;background-color:rgba(156, 163, 175, var(--tw-bg-opacity));}:focus{outline:2px solid transparent;outline-offset:2px;}:focus-visible{--tw-ring-offset-shadow:var(--tw-ring-inset) 0 0 0 var(--tw-ring-offset-width) var(--tw-ring-offset-color);--tw-ring-shadow:var(--tw-ring-inset) 0 0 0 calc(3px + var(--tw-ring-offset-width)) var(--tw-ring-color);box-shadow:var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow, 0 0 #0000);}@media (min-width: 640px){padding-left:1rem;padding-right:1rem;padding-top:0.5rem;padding-bottom:0.5rem;margin:0.5rem;}"},N={name:"sgbbgb",styles:"display:block;text-align:center;"},A={name:"1gbrirn",styles:"width:100%;font-size:0.875rem;line-height:1.25rem;text-align:center;cursor:pointer;overflow:hidden;"},W={name:"9wklrc",styles:"display:flex;height:4rem;align-items:center;--tw-bg-opacity:1;background-color:rgba(225, 29, 72, var(--tw-bg-opacity));--tw-text-opacity:1;color:rgba(255, 255, 255, var(--tw-text-opacity));border-radius:0.375rem;padding-left:1rem;padding-right:1rem;padding-top:0.25rem;padding-bottom:0.25rem;transition-property:background-color, border-color, color, fill, stroke, opacity, box-shadow, transform;transition-timing-function:cubic-bezier(0.4, 0, 0.2, 1);transition-duration:150ms;user-select:none;:hover{--tw-bg-opacity:1;background-color:rgba(159, 18, 57, var(--tw-bg-opacity));}:focus{outline:2px solid transparent;outline-offset:2px;}:focus-visible{--tw-ring-offset-shadow:var(--tw-ring-inset) 0 0 0 var(--tw-ring-offset-width) var(--tw-ring-offset-color);--tw-ring-shadow:var(--tw-ring-inset) 0 0 0 calc(3px + var(--tw-ring-offset-width)) var(--tw-ring-color);box-shadow:var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow, 0 0 #0000);}@media (min-width: 640px){padding-left:1rem;padding-right:1rem;padding-top:0.5rem;padding-bottom:0.5rem;margin:0.5rem;}"},H={name:"vaak6u",styles:"display:none;@media (min-width: 640px){display:block;}"};t.default=function(e){e.triggers,e.handleTriggers;var t=e.optButtonDisabled,r=e.startButtonDisabled,K=e.handleShinmaButton,J=e.handleStartButton,U=e.handleRestartButton,Q=e.handleShorteningButton,X=e.handleMinusButton,Z=e.handleClearButton,G=e.handleNightmareButton,V=Object(o.useState)([]),Y=V[0],$=V[1],_=Object(o.useState)(!1),ee=_[0],te=_[1],re=Object(o.useState)(void 0),ne=re[0],ie=re[1];Object(o.useEffect)((function(){Y.length&&!ne?(ie(function(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?d(Object(r),!0).forEach((function(t){Object(i.a)(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):d(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}({},Y[0])),$((function(e){return e.slice(1)})),te(!0)):Y.length&&ne&&ee&&te(!1)}),[Y,ne,ee]);var oe=function(e,t){$((function(r){return[].concat(Object(n.a)(r),[{message:e,severity:t,key:(new Date).getTime()}])}))};return Object(l.c)("div",{css:u},Object(l.c)("h6",null,"タイマー設定"),Object(l.c)("div",null,Object(l.c)("div",{css:b},Object(l.c)("div",{css:m},Object(l.c)("div",{css:g},Object(l.c)("div",{css:f},Object(l.c)("input",{type:"checkbox",id:"trigger-5s",css:w}),Object(l.c)("div",{css:p},Object(l.c)(a.a,{filename:"images/cards/CardS5975.png"}))),Object(l.c)("div",{css:h},Object(l.c)("input",{type:"checkbox",id:"trigger-5s",css:v}),Object(l.c)("div",{css:y},Object(l.c)(a.a,{filename:"images/cards/CardS7549.png"})))),Object(l.c)("div",{css:x},Object(l.c)("label",{htmlFor:"trigger-5s",css:j},"3rdユノ"),Object(l.c)("label",{htmlFor:"trigger-90s",css:O},"サルト"))),Object(l.c)("div",null,Object(l.c)("button",{css:k,onClick:function(){return K(),void oe("神魔効果タイマー開始。","info")}},"神魔効果開始"))),Object(l.c)("div",{css:T},Object(l.c)("button",{css:D,onClick:function(){return J()},disabled:r},"ナイトメア準備")),Object(l.c)("div",null,Object(l.c)("div",{css:S},Object(l.c)("div",{css:C},Object(l.c)("div",{css:z},Object(l.c)("button",{css:q,id:"res-restart",onClick:function(){return U(),void oe("[逆刻] 起動メア巻き戻し。","info")},disabled:t},Object(l.c)("div",{css:M},Object(l.c)(a.a,{filename:"images/cards/CardS6416.png"}))),Object(l.c)("label",{htmlFor:"res-restart",css:I},"ロボンゴ")),Object(l.c)("div",{css:B},Object(l.c)("button",{css:L,id:"res-shortening",onClick:function(){return Q(),void oe("[順刻] 起動メア60秒減少。","info")},disabled:t},Object(l.c)("div",{css:R},Object(l.c)(a.a,{filename:"images/cards/CardS2672.png"}))),Object(l.c)("label",{htmlFor:"res-shortening",css:E},"ガリア")),Object(l.c)("div",{css:F},Object(l.c)("button",{css:P,id:"res-minus",onClick:function(){return X(),void oe("-1秒しました。","success")},disabled:t},Object(l.c)("span",{css:N},"-1")),Object(l.c)("label",{htmlFor:"res-minus",css:A},"微調整"))),Object(l.c)("button",{css:W,onClick:function(){return Z(),void oe("クリアしました。","success")}},Object(l.c)(c.g,null),Object(l.c)("span",{css:H},"クリア")))),Object(l.c)("div",null,Object(l.c)(s.default,{handleNightmareButton:G}))))}}}]);
//# sourceMappingURL=component---src-pages-calc-timer-timer-table-tsx-ad6bf375c10b47e82c3b.js.map