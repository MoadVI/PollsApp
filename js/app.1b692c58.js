(function(){"use strict";var t={6540:function(t,o,e){var n=e(5130),l=e(6768);function s(t,o){const e=(0,l.g2)("router-link"),n=(0,l.g2)("router-view");return(0,l.uX)(),(0,l.CE)(l.FK,null,[(0,l.Lk)("nav",null,[(0,l.bF)(e,{to:"/",class:"buttons"},{default:(0,l.k6)((()=>o[0]||(o[0]=[(0,l.eW)("Home")]))),_:1})]),(0,l.bF)(n)],64)}var a=e(1241);const i={},u=(0,a.A)(i,[["render",s]]);var r=u,c=e(1387),p=e(4232);const d={class:"home-container"},v={class:"form-container"},f={class:"options-container"},h=["onUpdate:modelValue","placeholder"],b={class:"buttons"},k={class:"Polls"},m={class:"question"},y={class:"participants"};function O(t,o,e,s,a,i){const u=(0,l.g2)("router-link");return(0,l.uX)(),(0,l.CE)("div",d,[(0,l.Lk)("div",v,[(0,l.Lk)("form",{onSubmit:o[2]||(o[2]=(0,n.D$)(((...t)=>s.createPoll&&s.createPoll(...t)),["prevent"]))},[o[4]||(o[4]=(0,l.Lk)("label",null,"Type a poll question below",-1)),(0,l.bo)((0,l.Lk)("input",{type:"text",minlength:"10",placeholder:"Enter a question",class:"poll-option","onUpdate:modelValue":o[0]||(o[0]=t=>s.pollQuestion=t),required:""},null,512),[[n.Jo,s.pollQuestion]]),o[5]||(o[5]=(0,l.Lk)("label",null,"Enter as many poll choices as you like",-1)),(0,l.Lk)("div",f,[((0,l.uX)(!0),(0,l.CE)(l.FK,null,(0,l.pI)(s.pollOptions,((t,o)=>(0,l.bo)(((0,l.uX)(),(0,l.CE)("input",{key:o,"onUpdate:modelValue":t=>s.pollOptions[o]=t,type:"text",placeholder:"Option "+(o+1),class:"poll-option",required:""},null,8,h)),[[n.Jo,s.pollOptions[o]]]))),128))]),(0,l.Lk)("div",b,[o[3]||(o[3]=(0,l.Lk)("button",{type:"submit",class:"btn btn-create"},"Create this poll",-1)),(0,l.Lk)("button",{type:"button",onClick:o[1]||(o[1]=(...t)=>s.addOption&&s.addOption(...t)),class:"btn btn-add"},"Add another option")])],32)]),(0,l.Lk)("div",k,[((0,l.uX)(!0),(0,l.CE)(l.FK,null,(0,l.pI)(s.polls_data,(t=>((0,l.uX)(),(0,l.CE)("div",{key:t.id},[(0,l.bF)(u,{to:`/result/${t.id}`,id:"link"},{default:(0,l.k6)((()=>[(0,l.Lk)("div",m,[(0,l.eW)((0,p.v_)(t.question)+" ",1),(0,l.Lk)("div",y,(0,p.v_)(s.total(t))+" participants",1)])])),_:2},1032,["to"])])))),128))])])}e(4114),e(8111),e(1701);var g=e(144),w={name:"PollsHome",setup(){const t=(0,g.KR)([]),o=(0,g.KR)(""),e=(0,g.KR)(["","",""]),n=(0,c.rd)();function s(){e.value.push("")}async function a(){const t={question:o.value,options:e.value.map((t=>({name:t,votes:0})))},l=await fetch("http://localhost:5000/polls",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(t)}),s=await l.json();n.push(`/result/${s.id}`)}const i=t=>{let o=0;for(let e=0;e<t.options.length;e++)o+=t.options[e].votes;return o};async function u(){const o=await fetch("http://localhost:5000/polls"),e=await o.json();t.value=e}return(0,l.sV)((()=>{u()})),{pollQuestion:o,pollOptions:e,addOption:s,createPoll:a,polls_data:t,total:i}}};const L=(0,a.A)(w,[["render",O],["__scopeId","data-v-57402e71"]]);var _=L;const C={class:"vote"},E={class:"option-label"},K=["value"],P={class:"btn"};function V(t,o,e,s,a,i){const u=(0,l.g2)("router-link");return(0,l.uX)(),(0,l.CE)("div",C,[(0,l.Lk)("h1",null,(0,p.v_)(s.pollQuestion),1),((0,l.uX)(!0),(0,l.CE)(l.FK,null,(0,l.pI)(s.pollOptions,((t,e)=>((0,l.uX)(),(0,l.CE)("div",{key:e,class:"option"},[(0,l.Lk)("label",E,[(0,l.bo)((0,l.Lk)("input",{type:"checkbox",value:t.name,"onUpdate:modelValue":o[0]||(o[0]=t=>s.selectedOptions=t)},null,8,K),[[n.lH,s.selectedOptions]]),(0,l.eW)(" "+(0,p.v_)(t.name),1)])])))),128)),(0,l.Lk)("div",P,[(0,l.Lk)("button",{onClick:o[1]||(o[1]=(...t)=>s.submitVotes&&s.submitVotes(...t)),class:"submit"},"Submit"),(0,l.bF)(u,{to:`/result/${s.pollId}`,class:"results-page"},{default:(0,l.k6)((()=>o[2]||(o[2]=[(0,l.eW)("View Results")]))),_:1},8,["to"])])])}e(7588);var j={name:"PollVote",setup(){const t=(0,c.lq)(),o=(0,c.rd)(),e=(0,g.KR)(""),n=(0,g.KR)([]),s=(0,g.KR)([]),a=(0,g.KR)(0);(0,l.sV)((async()=>{const o=await fetch(`http://localhost:5000/polls/${t.params.id}`),l=await o.json();a.value=l.id,e.value=l.question,n.value=l.options}));const i=async()=>{const e=await fetch(`http://localhost:5000/polls/${t.params.id}`),n=await e.json();n.options.forEach((t=>{s.value.includes(t.name)&&(t.votes+=1)})),await fetch(`http://localhost:5000/polls/${t.params.id}`,{method:"PUT",headers:{"Content-Type":"application/json"},body:JSON.stringify(n)}),o.push(`/result/${a.value}`)};return{pollQuestion:e,pollOptions:n,pollId:a,selectedOptions:s,submitVotes:i}}};const F=(0,a.A)(j,[["render",V],["__scopeId","data-v-7bd209fe"]]);var R=F;const X={class:"results"},q={id:"percentage"},I={class:"btn"};function $(t,o,e,n,s,a){const i=(0,l.g2)("router-link");return(0,l.uX)(),(0,l.CE)("div",X,[(0,l.Lk)("h1",null,(0,p.v_)(n.pollQuestion),1),(0,l.Lk)("ul",null,[((0,l.uX)(!0),(0,l.CE)(l.FK,null,(0,l.pI)(n.pollOptions,((t,o)=>((0,l.uX)(),(0,l.CE)("li",{key:o},[(0,l.eW)((0,p.v_)(t.name)+" ",1),(0,l.Lk)("div",q,(0,p.v_)(n.calculatePercentage(t.votes))+"%",1)])))),128))]),(0,l.Lk)("div",I,[(0,l.bF)(i,{to:`/vote/${n.pollId}`,class:"vote-section"},{default:(0,l.k6)((()=>o[0]||(o[0]=[(0,l.eW)("Vote")]))),_:1},8,["to"]),(0,l.bF)(i,{to:"/",class:"back-button"},{default:(0,l.k6)((()=>o[1]||(o[1]=[(0,l.eW)("Back")]))),_:1})])])}var x={name:"PollResult",setup(){const t=(0,c.lq)(),o=(0,g.KR)(""),e=(0,g.KR)([]),n=(0,g.KR)("");(0,l.sV)((async()=>{const l=await fetch(`http://localhost:5000/polls/${t.params.id}`),s=await l.json();n.value=s.id,o.value=s.question,e.value=s.options}));const s=t=>{let o=0;for(let n=0;n<e.value.length;n++)o+=e.value[n].votes;return o>0?(t/o*100).toFixed(2):0};return{pollQuestion:o,pollOptions:e,pollId:n,calculatePercentage:s}}};const Q=(0,a.A)(x,[["render",$],["__scopeId","data-v-55c6ea4f"]]);var T=Q;const W=[{path:"/",name:"home",component:_},{path:"/vote/:id",name:"PollVote",component:R},{path:"/result/:id",name:"PollResult",component:T}],A=(0,c.aE)({history:(0,c.Bt)(),routes:W});var S=A;(0,n.Ef)(r).use(S).mount("#app")}},o={};function e(n){var l=o[n];if(void 0!==l)return l.exports;var s=o[n]={exports:{}};return t[n].call(s.exports,s,s.exports,e),s.exports}e.m=t,function(){var t=[];e.O=function(o,n,l,s){if(!n){var a=1/0;for(c=0;c<t.length;c++){n=t[c][0],l=t[c][1],s=t[c][2];for(var i=!0,u=0;u<n.length;u++)(!1&s||a>=s)&&Object.keys(e.O).every((function(t){return e.O[t](n[u])}))?n.splice(u--,1):(i=!1,s<a&&(a=s));if(i){t.splice(c--,1);var r=l();void 0!==r&&(o=r)}}return o}s=s||0;for(var c=t.length;c>0&&t[c-1][2]>s;c--)t[c]=t[c-1];t[c]=[n,l,s]}}(),function(){e.n=function(t){var o=t&&t.__esModule?function(){return t["default"]}:function(){return t};return e.d(o,{a:o}),o}}(),function(){e.d=function(t,o){for(var n in o)e.o(o,n)&&!e.o(t,n)&&Object.defineProperty(t,n,{enumerable:!0,get:o[n]})}}(),function(){e.g=function(){if("object"===typeof globalThis)return globalThis;try{return this||new Function("return this")()}catch(t){if("object"===typeof window)return window}}()}(),function(){e.o=function(t,o){return Object.prototype.hasOwnProperty.call(t,o)}}(),function(){var t={524:0};e.O.j=function(o){return 0===t[o]};var o=function(o,n){var l,s,a=n[0],i=n[1],u=n[2],r=0;if(a.some((function(o){return 0!==t[o]}))){for(l in i)e.o(i,l)&&(e.m[l]=i[l]);if(u)var c=u(e)}for(o&&o(n);r<a.length;r++)s=a[r],e.o(t,s)&&t[s]&&t[s][0](),t[s]=0;return e.O(c)},n=self["webpackChunkapp"]=self["webpackChunkapp"]||[];n.forEach(o.bind(null,0)),n.push=o.bind(null,n.push.bind(n))}();var n=e.O(void 0,[504],(function(){return e(6540)}));n=e.O(n)})();
//# sourceMappingURL=app.1b692c58.js.map