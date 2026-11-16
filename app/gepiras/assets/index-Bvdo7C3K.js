var e=Object.create,t=Object.defineProperty,n=Object.getOwnPropertyDescriptor,r=Object.getOwnPropertyNames,i=Object.getPrototypeOf,a=Object.prototype.hasOwnProperty,o=(e,t)=>()=>(t||(e((t={exports:{}}).exports,t,t.exports),e=null),t.exports),s=(e,i,o,s)=>{if(i&&typeof i==`object`||typeof i==`function`)for(var c=r(i),l=0,u=c.length,d;l<u;l++)d=c[l],!a.call(e,d)&&d!==o&&t(e,d,{get:(e=>i[e]).bind(null,d),enumerable:!(s=n(i,d))||s.enumerable});return e},c=(n,r,o)=>(o=n==null?{}:e(i(n)),s(r||!n||!n.__esModule||!a.call(n,`default`)?t(o,`default`,{value:n,enumerable:!0}):o,n));(function(){let e=document.createElement(`link`).relList;if(e&&e.supports&&e.supports(`modulepreload`))return;for(let e of document.querySelectorAll(`link[rel="modulepreload"]`))n(e);new MutationObserver(e=>{for(let t of e)if(t.type===`childList`)for(let e of t.addedNodes)e.tagName===`LINK`&&e.rel===`modulepreload`&&n(e)}).observe(document,{childList:!0,subtree:!0});function t(e){let t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),t.credentials=e.crossOrigin===`use-credentials`?`include`:e.crossOrigin===`anonymous`?`omit`:`same-origin`,t}function n(e){if(e.ep)return;e.ep=!0;let n=t(e);fetch(e.href,n)}})();var l=Array.isArray,u=Array.prototype.indexOf,d=Array.prototype.includes,f=Array.from,p=Object.defineProperty,m=Object.getOwnPropertyDescriptor,h=Object.getOwnPropertyDescriptors,g=Object.prototype,_=Array.prototype,v=Object.getPrototypeOf,y=Object.isExtensible,b=()=>{};function x(e){return e()}function S(e){for(var t=0;t<e.length;t++)e[t]()}function C(){var e,t;return{promise:new Promise((n,r)=>{e=n,t=r}),resolve:e,reject:t}}function w(e,t){if(Array.isArray(e))return e;if(t===void 0||!(Symbol.iterator in e))return Array.from(e);let n=[];for(let r of e)if(n.push(r),n.length===t)break;return n}var T=1<<24,E=1024,D=2048,ee=4096,te=8192,ne=16384,re=32768,ie=1<<25,ae=65536,oe=1<<19,se=1<<20,ce=1<<25,le=1<<21,ue=1<<22,de=1<<23,fe=Symbol(`$state`),pe=Symbol(`component`),me=Symbol(`legacy props`),he=Symbol(``),ge=Symbol(`attributes`),_e=Symbol(`class`),ve=Symbol(`style`),ye=Symbol(`text`),be=Symbol(`form reset`),xe=new class extends Error{name=`StaleReactionError`;message="The reaction that called `getAbortSignal()` was re-run or destroyed"},Se=!!globalThis.document?.contentType&&globalThis.document.contentType.includes(`xml`),Ce={},we=Symbol(`uninitialized`),Te=`http://www.w3.org/1999/xhtml`,Ee=`http://www.w3.org/2000/svg`,De=`http://www.w3.org/1998/Math/MathML`;function Oe(){console.warn(`https://svelte.dev/e/derived_inert`)}function ke(e){console.warn(`https://svelte.dev/e/hydration_mismatch`)}function Ae(){console.warn(`https://svelte.dev/e/select_multiple_invalid_value`)}function je(){console.warn(`https://svelte.dev/e/svelte_boundary_reset_noop`)}var O=!1;function Me(e){O=e}var k;function Ne(e){if(e===null)throw ke(),Ce;return k=e}function Pe(){return Ne(bn(k))}function A(e){if(O){if(bn(k)!==null)throw ke(),Ce;k=e}}function j(e=1){if(O){for(var t=e,n=k;t--;)n=bn(n);k=n}}function Fe(e=!0){for(var t=0,n=k;;){if(n.nodeType===8){var r=n.data;if(r===`]`){if(t===0)return n;--t}else(r===`[`||r===`[!`||r[0]===`[`&&!isNaN(Number(r.slice(1))))&&(t+=1)}var i=bn(n);e&&n.remove(),n=i}}function Ie(e){if(!e||e.nodeType!==8)throw ke(),Ce;return e.data}function Le(e){return e===this.v}function Re(e,t){return e==e?e!==t||typeof e==`object`&&!!e||typeof e==`function`:t==t}function ze(e){return!Re(e,this.v)}function Be(e){throw Error(`https://svelte.dev/e/lifecycle_outside_component`)}function Ve(){throw Error(`https://svelte.dev/e/async_derived_orphan`)}function He(e,t,n){throw Error(`https://svelte.dev/e/each_key_duplicate`)}function Ue(e){throw Error(`https://svelte.dev/e/effect_in_teardown`)}function We(){throw Error(`https://svelte.dev/e/effect_in_unowned_derived`)}function Ge(e){throw Error(`https://svelte.dev/e/effect_orphan`)}function Ke(){throw Error(`https://svelte.dev/e/effect_update_depth_exceeded`)}function qe(e){throw Error(`https://svelte.dev/e/props_invalid_value`)}function Je(){throw Error(`https://svelte.dev/e/state_descriptors_fixed`)}function Ye(){throw Error(`https://svelte.dev/e/state_prototype_fixed`)}function Xe(){throw Error(`https://svelte.dev/e/state_unsafe_mutation`)}function Ze(){throw Error(`https://svelte.dev/e/svelte_boundary_reset_onerror`)}var Qe=!1;function $e(){Qe=!0}var et=[];function tt(e,t=!1,n=!1){return nt(e,new Map,``,et,null,n)}function nt(e,t,n,r,i=null,a=!1){if(typeof e==`object`&&e){var o=t.get(e);if(o!==void 0)return o;if(e instanceof Map)return new Map(e);if(e instanceof Set)return new Set(e);if(l(e)){var s=Array(e.length);t.set(e,s),i!==null&&t.set(i,s);for(var c=0;c<e.length;c+=1){var u=e[c];c in e&&(s[c]=nt(u,t,n,r,null,a))}return s}if(v(e)===g){s={},t.set(e,s),i!==null&&t.set(i,s);for(var d of Object.keys(e))s[d]=nt(e[d],t,n,r,null,a);return s}if(e instanceof Date)return e.getTime(),structuredClone(e);if(typeof e.toJSON==`function`&&!a)return nt(e.toJSON(),t,n,r,e)}if(e instanceof EventTarget)return e;try{return structuredClone(e)}catch{return e}}var M=null;function rt(e){M=e}function it(e,t=!1,n){M={p:M,i:!1,c:null,e:null,s:e,x:null,r:W,l:Qe&&!t?{s:null,u:null,$:[]}:null}}function at(e){var t=M,n=t.e;if(n!==null){t.e=null;for(var r of n)Nn(r)}return e!==void 0&&(t.x=e),t.i=!0,M=t.p,ot(e)}function ot(e={}){return p(e,pe,{value:!0}),e}function st(){return!Qe||M!==null&&M.l===null}var ct=[];function lt(){var e=ct;ct=[],S(e)}function ut(e){if(ct.length===0&&!Rt){var t=ct;queueMicrotask(()=>{t===ct&&lt()})}ct.push(e)}function dt(){for(;ct.length>0;)lt()}var ft=~(D|ee|E);function pt(e,t){e.f=e.f&ft|t}function mt(e){e.f&512||e.deps===null?pt(e,E):pt(e,ee)}function ht(e,t){e.f&2048?t.set(e,D):e.f&4096&&t.get(e)!==2048&&t.set(e,ee),pt(e,E)}function gt(e,t){if(t){let t=document.body;e.autofocus=!0,ut(()=>{document.activeElement===t&&e.focus()})}}var _t=!1;function vt(){_t||(_t=!0,document.addEventListener(`reset`,e=>{Promise.resolve().then(()=>{if(!e.defaultPrevented)for(let t of e.target.elements)t[be]?.()})},{capture:!0}))}function yt(e){var t=U,n=W;rr(null),ir(null);try{return e()}finally{rr(t),ir(n)}}function bt(e,t,n,r=n){e.addEventListener(t,()=>yt(n));let i=e[be];e[be]=i?()=>{i(),r(!0)}:()=>r(!0),vt()}function xt(e,t,n,r){let i=st()?Tt:Ot;var a=e.filter(e=>!e.settled),o=t.map(i);if(n.length===0&&a.length===0){r(o);return}var s=W,c=St(),l=a.length===1?a[0].promise:a.length>1?Promise.all(a.map(e=>e.promise)):null;function u(e){if(!(s.f&16384)){c();try{r([...o,...e])}catch(e){En(e,s)}Ct()}}var d=wt();if(n.length===0){l.then(()=>u([])).finally(d);return}function f(){Promise.all(n.map(e=>Dt(e))).then(u).catch(e=>En(e,s)).finally(d)}l?l.then(()=>{s.f&16384?d():(c(),f(),Ct())}):f()}function St(){var e=W,t=U,n=M,r=P;return function(i=!0){ir(e),rr(t),rt(n),i&&!(e.f&16384)&&(r?.activate(),r?.apply())}}function Ct(e=!0){ir(null),rr(null),rt(null),e&&P?.deactivate()}function wt(){var e=W,t=e.b,n=P,r=!!t?.is_rendered();return t?.update_pending_count(1,n),n.increment(r,e),()=>{t?.update_pending_count(-1,n),n.decrement(r,e)}}function Tt(e){var t=2|D;return W!==null&&(W.f|=oe),{ctx:M,deps:null,effects:null,equals:Le,f:t,fn:e,reactions:null,rv:0,v:we,wv:0,parent:W,ac:null}}var Et=Symbol(`obsolete`);function Dt(e,t,n){let r=W;r===null&&Ve();var i=void 0,a=tn(we),o=!U,s=new Set;return Ln(()=>{var t=W,n=C();i=n.promise;try{Promise.resolve(e()).then(n.resolve,e=>{e!==xe&&n.reject(e)}).finally(Ct)}catch(e){n.reject(e),Ct()}var c=P;if(o){if(t.f&32768)var l=wt();if(r.b?.is_rendered())c.async_deriveds.get(t)?.reject(Et);else for(let e of s.values())e.reject(Et);s.add(n),c.async_deriveds.set(t,n)}let u=(e,t=void 0)=>{l?.(),s.delete(n),t!==Et&&(c.activate(),t?(a.f|=de,on(a,t)):(a.f&8388608&&(a.f^=de),on(a,e)),c.deactivate())};n.promise.then(u,e=>u(null,e||`unknown`))}),jn(()=>{for(let e of s)e.reject(Et)}),new Promise(e=>{function t(n){function r(){n===i?e(a):t(i)}n.then(r,r)}t(i)})}function N(e){let t=Tt(e);return or(t),t}function Ot(e){let t=Tt(e);return t.equals=ze,t}function kt(e){var t=e.effects;if(t!==null){e.effects=null;for(var n=0;n<t.length;n+=1)Gn(t[n])}}function At(e){var t,n=W,r=e.parent;if(!er&&r!==null&&e.v!==we&&r.f&24576)return Oe(),e.v;ir(r);try{kt(e),t=vr(e)}finally{ir(n)}return t}function jt(e){var t=At(e);!e.equals(t)&&(e.wv=hr(),(!P?.is_fork||e.deps===null)&&(P===null?e.v=t:(P.capture(e,t,!0),Ft?.capture(e,t,!0)),e.deps===null))?pt(e,E):er||(It===null?mt(e):(An()||P?.is_fork)&&It.set(e,t))}function Mt(e){if(e.effects!==null)for(let t of e.effects)(t.teardown||t.ac)&&(t.teardown?.(),t.ac!==null&&yt(()=>{t.ac.abort(xe),t.ac=null}),t.fn!==null&&(t.teardown=b),xr(t,0),Un(t))}function Nt(e){if(e.effects!==null)for(let t of e.effects)t.teardown&&t.fn!==null&&Sr(t)}var Pt=null,P=null,Ft=null,It=null,Lt=null,Rt=!1,zt=!1,Bt=null,Vt=null,Ht=0,Ut=1,Wt=class e{id=Ut++;started=!1;linked=!0;prev=null;next=null;async_deriveds=new Map;current=new Map;previous=new Map;#e=new Set;#t=new Set;#n=0;#r=new Map;#i=null;#a=[];#o=[];#s=new Map;#c=new Map;#l=new Set;is_fork=!1;#u=!1;constructor(){Pt===null?Pt=this:(Pt.next=this,this.prev=Pt),Pt=this}#d(){if(this.is_fork)return!0;for(let e of this.#r.keys())if(!this.#f(e))return!0;return!1}#f(e){for(var t=e;t!==null;t=t.parent)if(this.#c.has(t))return!0;return!1}skip_effect(e){this.#c.has(e)||this.#c.set(e,{d:[],m:[]}),this.#l.delete(e)}unskip_effect(e,t=e=>this.schedule(e)){var n=this.#c.get(e);if(n){this.#c.delete(e);for(var r of n.d)pt(r,D),t(r);for(r of n.m)pt(r,ee),t(r)}this.#l.add(e)}#p(){var e=[];for(let i of this.#a)if(!(i.f&16384||!(i.f&6144))){for(var t=i,n=!1;t.parent!==null;){t=t.parent;var r=t.f;if(r&96){if(!(r&1024)){n=!0;break}t.f^=E}}n||e.push(t)}return this.#a=[],e}#m(){this.started=!0;for(let[e,t]of this.#s)pt(e,t),this.schedule(e);this.apply();for(var t=Bt=[],n=[],r=Vt=[];this.#a.length>0;){Ht++>1e3&&(this.#b(),Kt());for(let e of this.#p())try{this.#h(e,t,n)}catch(t){throw Zt(e),this.#d()||this.discard(),t}}if(P=null,r.length>0){var i=e.ensure();for(let e of r)i.schedule(e)}if(Bt=null,Vt=null,this.#d()){this.#y(n),this.#y(t);for(let[e,t]of this.#c)Xt(e,t);r.length>0&&P.#m();return}let a=this.#g();if(a)this.#y(n),this.#y(t),a.#v(this);else{this.#s.clear();for(let e of this.#e)e(this);this.#e.clear(),Ft=this,Jt(n),Jt(t),Ft=null,this.#i?.resolve();var o=P;this.#n===0&&(this.#a.length===0||o!==null)&&this.#b(),o!==null&&($t.clear(),o.#m())}}#h(e,t,n){e.f^=E;for(var r=e.first;r!==null;){var i=r.f,a=!!(i&96);if(!(a&&i&1024||i&8192||this.#c.has(r))&&r.fn!==null){a?r.f^=E:i&4?t.push(r):gr(r)&&(i&16&&this.add_dirty_reaction(r,ee),Sr(r));var o=r.first;if(o!==null){r=o;continue}}for(;r!==null;){var s=r.next;if(s!==null){r=s;break}r=r.parent}}}#g(){for(var e=this.prev;e!==null;e=e.prev)if(!e.is_fork&&this.#_(e))return e;return null}#_(e){for(let[t,[,n]]of this.current)if(!n&&e.current.has(t))return!0;return!1}#v(e){for(let[t,n]of e.current)!this.previous.has(t)&&e.previous.has(t)&&this.previous.set(t,e.previous.get(t)),this.current.set(t,n);for(let[t,n]of e.async_deriveds){let e=this.async_deriveds.get(t);e&&n.promise.then(e.resolve).catch(e.reject)}e.async_deriveds.clear(),this.transfer_reactions(e.#s);let t=e=>{var n=e.reactions;if(n!==null&&!(e.f&2&&!(e.f&6144)))for(let e of n){var r=e.f;if(r&2)t(e);else{var i=e;r&4194320&&!this.async_deriveds.has(i)&&(this.#s.delete(i),pt(i,D),this.schedule(i))}}};for(let e of this.current.keys())t(e);this.oncommit(()=>e.discard()),e.#b(),P=this,this.#m()}#y(e){for(var t=0;t<e.length;t+=1)ht(e[t],this.#s)}capture(e,t,n=!1){e.v!==we&&!this.previous.has(e)&&this.previous.set(e,e.v),e.f&8388608||(this.current.set(e,[t,n]),It?.set(e,t)),this.is_fork||(e.v=t)}activate(){P=this}deactivate(){P=null,It=null}flush(){try{zt=!0,P=this,this.#m()}finally{Ht=0,Lt=null,Bt=null,Vt=null,zt=!1,P=null,It=null,$t.clear()}}discard(){for(let e of this.#t)e(this);this.#t.clear();for(let e of this.async_deriveds.values())e.reject(Et);this.#b(),this.#i?.resolve()}register_created_effect(e){this.#o.push(e)}increment(e,t){if(this.#n+=1,e){let e=this.#r.get(t)??0;this.#r.set(t,e+1)}}decrement(e,t){if(--this.#n,e){let e=this.#r.get(t)??0;e===1?this.#r.delete(t):this.#r.set(t,e-1)}this.#u||(this.#u=!0,ut(()=>{this.#u=!1,this.linked&&this.flush()}))}transfer_reactions(e){for(let[t,n]of e)this.add_dirty_reaction(t,n);e.clear()}add_dirty_reaction(e,t){(t===2048||this.#s.get(e)!==2048)&&this.#s.set(e,t)}oncommit(e){this.#e.add(e)}ondiscard(e){this.#t.add(e)}settled(){return(this.#i??=C()).promise}static ensure(){if(P===null){let t=P=new e;!zt&&!Rt&&ut(()=>{t.started||t.flush()})}return P}apply(){It=null}schedule(e){Lt=e,e.b?.is_pending&&e.f&16777228&&!(e.f&32768)?e.b.defer_effect(e):this.#a.push(e)}#b(){if(this.linked){var e=this.prev,t=this.next;e===null||(e.next=t),t===null?Pt=e:t.prev=e,this.linked=!1}}};function Gt(e){var t=Rt,n=Ft;Ft=null,Rt=!0;try{var r;for(e&&(Gt(),r=e());;){if(dt(),P===null)return r;P.flush()}}finally{Rt=t,Ft=n}}function Kt(){try{Ke()}catch(e){En(e,Lt)}}var qt=null;function Jt(e){var t=e.length;if(t!==0){for(var n=0;n<t;){var r=e[n++];if(!(r.f&24576)&&gr(r)&&(qt=new Set,Sr(r),r.deps===null&&r.first===null&&r.nodes===null&&r.teardown===null&&r.ac===null&&qn(r),qt?.size>0)){$t.clear();for(let e of qt){if(e.f&24576)continue;let t=[e],n=e.parent;for(;n!==null;)qt.has(n)&&(qt.delete(n),t.push(n)),n=n.parent;for(let e=t.length-1;e>=0;e--){let n=t[e];n.f&24576||Sr(n)}}qt.clear()}}qt=null}}function Yt(e){P.schedule(e)}function Xt(e,t){if(!(e.f&32&&e.f&1024)){e.f&2048?t.d.push(e):e.f&4096&&t.m.push(e),pt(e,E);for(var n=e.first;n!==null;)Xt(n,t),n=n.next}}function Zt(e){pt(e,E);for(var t=e.first;t!==null;)Zt(t),t=t.next}var Qt=new Set,$t=new Map,en=!1;function tn(e,t){return{f:0,v:e,reactions:null,equals:Le,rv:0,wv:0}}function F(e,t){let n=tn(e,t);return or(n),n}function nn(e,t=!1,n=!0){let r=tn(e);return t||(r.equals=ze),Qe&&n&&M!==null&&M.l!==null&&(M.l.s??=[]).push(r),r}function I(e,t,n=!1){return U!==null&&(!nr||U.f&131072)&&st()&&U.f&4325394&&(ar===null||!ar.has(e))&&Xe(),on(e,n?L(t):t,Vt)}var rn=null,an=0;function on(e,t,n=null){if(!e.equals(t)){er?$t.set(e,t):$t.has(e)||$t.set(e,e.v);var r=Wt.ensure();if(r.capture(e,t),e.f&2){let t=e;e.f&2048&&At(t),It===null&&mt(t)}e.wv=hr(),rn=null,an=0,un(e,D,n),rn=null,st()&&W!==null&&W.f&1024&&!(W.f&96)&&(lr===null?ur([e]):lr.push(e)),!r.is_fork&&Qt.size>0&&!en&&sn()}return t}function sn(){en=!1;for(let e of Qt){e.f&1024&&pt(e,ee);let t;try{t=gr(e)}catch{t=!0}t&&Sr(e)}Qt.clear()}function cn(e,t=1){var n=G(e),r=t===1?n++:n--;return I(e,n),r}function ln(e){I(e,e.v+1)}function un(e,t,n){var r=e.reactions;if(r!==null){var i=st(),a=r.length;if(an+=a,an>1e5&&rn===null&&(rn=new Set),rn!==null){if(rn.has(e))return;rn.add(e)}for(var o=0;o<a;o++){var s=r[o],c=s.f;if(i||s!==W){var l=(c&D)===0;if(l&&pt(s,t),c&131072)Qt.add(s);else if(c&2){var u=s;It?.delete(u),un(u,ee,n)}else if(l){var d=s;c&16&&qt!==null&&qt.add(d),n===null?Yt(d):n.push(d)}}}}}function L(e){if(typeof e!=`object`||!e||fe in e||pe in e)return e;let t=v(e);if(t!==g&&t!==_)return e;var n=new Map,r=l(e),i=F(0),a=null,o=pr,s=e=>{if(pr===o)return e();var t=U,n=pr;rr(null),mr(o);var r=e();return rr(t),mr(n),r};return r&&n.set(`length`,F(e.length,a)),new Proxy(e,{defineProperty(e,t,r){`value`in r&&r.configurable!==!1&&r.enumerable!==!1&&r.writable!==!1||Je();var i=n.get(t);return i===void 0?s(()=>{var e=F(r.value,a);return n.set(t,e),e}):I(i,r.value,!0),!0},deleteProperty(e,t){var r=n.get(t);if(r===void 0){if(t in e){let e=s(()=>F(we,a));n.set(t,e),ln(i)}}else I(r,we),ln(i);return!0},get(t,r,i){if(r===fe)return e;var o=n.get(r),c=r in t;if(o===void 0&&(!c||m(t,r)?.writable)&&(o=s(()=>F(L(c?t[r]:we),a)),n.set(r,o)),o!==void 0){var l=G(o);return l===we?void 0:l}return Reflect.get(t,r,i)},getOwnPropertyDescriptor(e,t){this.has?.(e,t);var r=Reflect.getOwnPropertyDescriptor(e,t),i=n.get(t);if(i!==void 0){var a=G(i);if(a===we)return;if(r&&`value`in r)r.value=a;else return{enumerable:!0,configurable:!0,value:a,writable:!0}}return r},has(e,t){if(t===fe)return!0;var r=n.get(t),i=r!==void 0&&r.v!==we||Reflect.has(e,t);return(r!==void 0||(W!==null||U!==null)&&(!i||m(e,t)?.writable))&&(r===void 0&&(r=s(()=>F(i?L(e[t]):we,a)),n.set(t,r)),G(r)===we)?!1:i},set(e,t,o,c){var l=n.get(t),u=t in e;if(r&&t===`length`)for(var d=o;d<l.v;d+=1){var f=n.get(d+``);f===void 0?d in e&&(f=s(()=>F(we,a)),n.set(d+``,f)):I(f,we)}if(l===void 0)(!u||m(e,t)?.writable)&&(l=s(()=>F(void 0,a)),I(l,L(o)),n.set(t,l));else{u=l.v!==we;var p=s(()=>L(o));I(l,p)}var h=Reflect.getOwnPropertyDescriptor(e,t);if(h?.set&&h.set.call(c,o),!u){if(r&&typeof t==`string`){var g=n.get(`length`),_=Number(t);Number.isInteger(_)&&_>=g.v&&I(g,_+1)}ln(i)}return!0},ownKeys(e){G(i);var t=Reflect.ownKeys(e).filter(e=>{var t=n.get(e);return t===void 0||t.v!==we});for(var[r,a]of n)a.v!==we&&!(r in e)&&t.push(r);return t},setPrototypeOf(){Ye()}})}function dn(e){try{if(typeof e==`object`&&e&&fe in e)return e[fe]}catch{}return e}function fn(e,t){return Object.is(dn(e),dn(t))}var pn,mn,hn,gn;function _n(){if(pn===void 0){pn=window,mn=/Firefox/.test(navigator.userAgent);var e=Element.prototype,t=Node.prototype,n=Text.prototype;hn=m(t,`firstChild`).get,gn=m(t,`nextSibling`).get,y(e)&&(e[_e]=void 0,e[ge]=null,e[ve]=void 0,e.__e=void 0),y(n)&&(n[ye]=void 0)}}function vn(e=``){return document.createTextNode(e)}function yn(e){return hn.call(e)}function bn(e){return gn.call(e)}function R(e,t){if(!O)return yn(e);var n=yn(k);if(n===null)n=k.appendChild(vn());else if(t&&n.nodeType!==3){var r=vn();return n?.before(r),Ne(r),r}return t&&wn(n),Ne(n),n}function z(e,t=!1){if(!O){var n=yn(e);return n instanceof Comment&&n.data===``?bn(n):n}if(t){if(k?.nodeType!==3){var r=vn();return k?.before(r),Ne(r),r}wn(k)}return k}function B(e,t=!1){if(!O)return yn(e);var n=R(e,t);return A(e),n}function V(e,t=1,n=!1){let r=O?k:e;for(var i;t--;)i=r,r=bn(r);if(!O)return r;if(n){if(r?.nodeType!==3){var a=vn();return r===null?i?.after(a):r.before(a),Ne(a),a}wn(r)}return Ne(r),r}function xn(e){e.textContent=``}function Sn(){return!1}function Cn(e,t,n){return t==null||t===`http://www.w3.org/1999/xhtml`?n?document.createElement(e,{is:n}):document.createElement(e):n?document.createElementNS(t,e,{is:n}):document.createElementNS(t,e)}function wn(e){if(e.nodeValue.length<65536)return;let t=e.nextSibling;for(;t!==null&&t.nodeType===3;)t.remove(),e.nodeValue+=t.nodeValue,t=e.nextSibling}function Tn(e){var t=W;if(t===null)return U.f|=de,e;if(!(t.f&32768)&&!(t.f&4))throw e;En(e,t)}function En(e,t){if(e===Ce)throw e;if(!(t!==null&&t.f&16384)){for(;t!==null;){if(t.f&128&&!(t.f&33570816)){if(!(t.f&32768))throw e;try{t.b.error(e);return}catch(t){e=t}}t=t.parent}throw e}}function Dn(e){W===null&&(U===null&&Ge(e),We()),er&&Ue(e)}function On(e,t){var n=t.last;n===null?t.last=t.first=e:(n.next=e,e.prev=n,t.last=e)}function kn(e,t){var n=W;n!==null&&n.f&8192&&(e|=te);var r={ctx:M,deps:null,nodes:null,f:e|D|512,first:null,fn:t,last:null,next:null,parent:n,b:n&&n.b,prev:null,teardown:null,wv:0,ac:null};P?.register_created_effect(r);var i=r;if(e&4)Bt===null?Wt.ensure().schedule(r):Bt.push(r);else if(t!==null){try{Sr(r)}catch(e){throw Gn(r),e}i.deps===null&&i.teardown===null&&i.nodes===null&&i.first===i.last&&!(i.f&524288)&&(i=i.first,e&16&&e&65536&&i!==null&&(i.f|=ae))}if(i!==null&&(i.parent=n,n!==null&&On(i,n),U!==null&&U.f&2&&!(e&64))){var a=U;(a.effects??=[]).push(i)}return r}function An(){return U!==null&&!nr}function jn(e){let t=kn(8,null);return pt(t,E),t.teardown=e,t}function Mn(e){Dn(`$effect`);var t=W.f;if(!U&&t&32&&M!==null&&!M.i){var n=M;(n.e??=[]).push(e)}else return Nn(e)}function Nn(e){return kn(4|se,e)}function Pn(e){return Dn(`$effect.pre`),kn(8|se,e)}function Fn(e){Wt.ensure();let t=kn(64|oe,e);return(e={})=>new Promise(n=>{e.outro?Jn(t,()=>{Gn(t),n(void 0)}):(Gn(t),n(void 0))})}function In(e){return kn(4,e)}function Ln(e){return kn(ue|oe,e)}function Rn(e,t=0){return kn(8|t,e)}function H(e,t=[],n=[],r=[]){xt(r,t,n,t=>{kn(8,()=>{e(...t.map(G))})})}function zn(e,t=0){return kn(16|t,e)}function Bn(e,t=0){return kn(T|t,e)}function Vn(e){return kn(32|oe,e)}function Hn(e){var t=e.teardown;if(t!==null){let n=er,r=U;tr(!0),rr(null);try{t.call(null)}catch(t){En(t,e.parent)}finally{tr(n),rr(r)}}}function Un(e,t=!1){var n=e.first;for(e.first=e.last=null;n!==null;){let e=n.ac;e!==null&&yt(()=>{e.abort(xe)});var r=n.next;n.f&64?n.parent=null:Gn(n,t),n=r}}function Wn(e){for(var t=e.first;t!==null;){var n=t.next;t.f&32||Gn(t),t=n}}function Gn(e,t=!0){var n=!1;(t||e.f&262144)&&e.nodes!==null&&e.nodes.end!==null&&(Kn(e.nodes.start,e.nodes.end),n=!0),e.f|=ie,Un(e,t&&!n),xr(e,0);var r=e.nodes&&e.nodes.t;if(r!==null)for(let e of r)e.stop();Hn(e),e.f^=ie,e.f|=ne;var i=e.parent;i!==null&&i.first!==null&&qn(e),e.next=e.prev=e.teardown=e.ctx=e.deps=e.fn=e.nodes=e.ac=e.b=null}function Kn(e,t){for(;e!==null;){var n=e===t?null:bn(e);e.remove(),e=n}}function qn(e){var t=e.parent,n=e.prev,r=e.next;n!==null&&(n.next=r),r!==null&&(r.prev=n),t!==null&&(t.first===e&&(t.first=r),t.last===e&&(t.last=n))}function Jn(e,t,n=!0){var r=[];e.f|=256,Yn(e,r,!0);var i=()=>{n&&Gn(e),t&&t()},a=r.length;if(a>0){var o=()=>--a||i();for(var s of r)s.out(o)}else i()}function Yn(e,t,n){if(!(e.f&8192)){e.f^=te;var r=e.nodes&&e.nodes.t;if(r!==null)for(let e of r)(e.is_global||n)&&t.push(e);for(var i=e.first;i!==null;){var a=i.next;if(!(i.f&64)){var o=!!(i.f&65536)||!!(i.f&32)&&!!(e.f&16);Yn(i,t,o?n:!1)}i=a}}}function Xn(e){e.f&=-257,Zn(e,!0)}function Zn(e,t){if(!(e.f&256)&&e.f&8192){e.f^=te,e.f&1024||(pt(e,D),Wt.ensure().schedule(e));for(var n=e.first;n!==null;){var r=n.next,i=!!(n.f&65536)||!!(n.f&32);Zn(n,i?t:!1),n=r}var a=e.nodes&&e.nodes.t;if(a!==null)for(let e of a)(e.is_global||t)&&e.in()}}function Qn(e,t){if(e.nodes)for(var n=e.nodes.start,r=e.nodes.end;n!==null;){var i=n===r?null:bn(n);t.append(n),n=i}}var $n=null,er=!1;function tr(e){er=e}var U=null,nr=!1;function rr(e){U=e}var W=null;function ir(e){W=e}var ar=null;function or(e){U!==null&&(U.f&2097152||U.f&2)&&(ar??=new Set).add(e)}var sr=null,cr=0,lr=null;function ur(e){lr=e}var dr=1,fr=0,pr=fr;function mr(e){pr=e}function hr(){return++dr}function gr(e){var t=e.f;if(t&2048)return!0;if(t&4096){for(var n=e.deps,r=n.length,i=0;i<r;i++){var a=n[i];if(gr(a)&&jt(a),a.wv>e.wv)return!0}t&512&&It===null&&pt(e,E)}return!1}function _r(e,t,n=!0){var r=e.reactions;if(r!==null&&!(ar!==null&&ar.has(e)))for(var i=0;i<r.length;i++){var a=r[i];a.f&2?_r(a,t,!1):t===a&&(n?pt(a,D):a.f&1024&&pt(a,ee),Yt(a))}}function vr(e){var t=sr,n=cr,r=lr,i=U,a=ar,o=M,s=nr,c=pr,l=e.f;sr=null,cr=0,lr=null,U=l&96?null:e,ar=null,rt(e.ctx),nr=!1,pr=++fr,e.ac!==null&&(yt(()=>{e.ac.abort(xe)}),e.ac=null);try{e.f|=le;var u=e.fn,d=u();e.f|=re;var f=yr(e);if(st()&&lr!==null&&!nr&&f!==null&&!(e.f&6146))for(var p=0;p<lr.length;p++)_r(lr[p],e);if(i!==null&&i!==e){if(fr++,i.deps!==null)for(let e=0;e<n;e+=1)i.deps[e].rv=fr;if(t!==null)for(let e of t)e.rv=fr;lr!==null&&(r===null?r=lr:r.push(...lr))}return e.f&8388608&&(e.f^=de),d}catch(t){return yr(e),Tn(t)}finally{e.f^=le,sr=t,cr=n,lr=r,U=i,ar=a,rt(o),nr=s,pr=c}}function yr(e){var t=e.deps,n=P?.is_fork;if(sr!==null){var r;if(n||xr(e,cr),t!==null&&cr>0)for(t.length=cr+sr.length,r=0;r<sr.length;r++)t[cr+r]=sr[r];else e.deps=t=sr;if(An()&&e.f&512)for(r=cr;r<t.length;r++)(t[r].reactions??=[]).push(e)}else!n&&t!==null&&cr<t.length&&(xr(e,cr),t.length=cr);return t}function br(e,t){let n=t.reactions;if(n!==null){var r=u.call(n,e);if(r!==-1){var i=n.length-1;i===0?n=t.reactions=null:(n[r]=n[i],n.pop())}}if(n===null&&t.f&2&&(sr===null||!d.call(sr,t))){var a=t;a.f&512&&(a.f^=512),a.v!==we&&mt(a),a.ac!==null&&yt(()=>{a.ac.abort(xe),a.ac=null,pt(a,D)}),Mt(a),xr(a,0)}}function xr(e,t){var n=e.deps;if(n!==null)for(var r=t;r<n.length;r++)br(e,n[r])}function Sr(e){var t=e.f;if(!(t&16384)){pt(e,E);var n=W;W=e;try{t&16777232?Wn(e):Un(e),Hn(e);var r=vr(e);e.teardown=typeof r==`function`?r:null,e.wv=dr}finally{W=n}}}async function Cr(){await Promise.resolve(),Gt()}function G(e){var t=!!(e.f&2);if($n?.add(e),U!==null&&!nr&&!(W!==null&&W.f&16384)&&(ar===null||!ar.has(e))){var n=U.deps;if(U.f&2097152)e.rv<fr&&(e.rv=fr,sr===null&&n!==null&&n[cr]===e?cr++:sr===null?sr=[e]:sr.push(e));else{U.deps??=[],d.call(U.deps,e)||U.deps.push(e);var r=e.reactions;r===null?e.reactions=[U]:d.call(r,U)||r.push(U)}}if(er&&$t.has(e))return $t.get(e);if(t){var i=e;if(er){var a=i.v;return(!(i.f&1024)&&i.reactions!==null||Tr(i))&&(a=At(i)),$t.set(i,a),a}var o=!(i.f&512)&&!nr&&U!==null&&!!(U.f&512),s=(i.f&re)===0;gr(i)&&(o&&(i.f|=512),jt(i)),o&&!s&&(Nt(i),wr(i))}if(It?.has(e))return It.get(e);if(e.f&8388608)throw e.v;return e.v}function wr(e){if(e.f|=512,e.deps!==null)for(let n of e.deps){var t=n.reactions;t===null?n.reactions=[e]:d.call(t,e)||t.push(e),n.f&2&&!(n.f&512)&&(Nt(n),wr(n))}}function Tr(e){if(e.v===we)return!0;if(e.deps===null)return!1;for(let t of e.deps)if($t.has(t)||t.f&2&&Tr(t))return!0;return!1}function Er(e){var t=nr;try{return nr=!0,e()}finally{nr=t}}function Dr(e){if(!(typeof e!=`object`||!e||e instanceof EventTarget)){if(fe in e)Or(e);else if(!Array.isArray(e))for(let t in e){let n=e[t];typeof n==`object`&&n&&fe in n&&Or(n)}}}function Or(e,t=new Set){if(typeof e==`object`&&e&&!(e instanceof EventTarget)&&!t.has(e)){t.add(e),e instanceof Date&&e.getTime();for(let n in e)try{Or(e[n],t)}catch{}let n=v(e);if(n!==Object.prototype&&n!==Array.prototype&&n!==Map.prototype&&n!==Set.prototype&&n!==Date.prototype){let t=h(n);for(let n in t){let r=t[n].get;if(r)try{r.call(e)}catch{}}}}}function kr(e){return e.endsWith(`capture`)&&e!==`gotpointercapture`&&e!==`lostpointercapture`}var Ar=[`beforeinput`,`click`,`change`,`dblclick`,`contextmenu`,`focusin`,`focusout`,`input`,`keydown`,`keyup`,`mousedown`,`mousemove`,`mouseout`,`mouseover`,`mouseup`,`pointerdown`,`pointermove`,`pointerout`,`pointerover`,`pointerup`,`touchend`,`touchmove`,`touchstart`];function jr(e){return Ar.includes(e)}var Mr=`allowfullscreen.async.autofocus.autoplay.checked.controls.default.disabled.formnovalidate.indeterminate.inert.ismap.loop.multiple.muted.nomodule.novalidate.open.playsinline.readonly.required.reversed.seamless.selected.webkitdirectory.defer.disablepictureinpicture.disableremoteplayback`.split(`.`),Nr={formnovalidate:`formNoValidate`,ismap:`isMap`,nomodule:`noModule`,playsinline:`playsInline`,readonly:`readOnly`,defaultvalue:`defaultValue`,defaultchecked:`defaultChecked`,srcobject:`srcObject`,novalidate:`noValidate`,allowfullscreen:`allowFullscreen`,disablepictureinpicture:`disablePictureInPicture`,disableremoteplayback:`disableRemotePlayback`};function Pr(e){return e=e.toLowerCase(),Nr[e]??e}[...Mr];var Fr=[`touchstart`,`touchmove`];function Ir(e){return Fr.includes(e)}var Lr=[`textarea`,`script`,`style`,`title`];function Rr(e){return Lr.includes(e)}var zr=Symbol(`events`),Br=new Set,Vr=new Set;function Hr(e,t,n,r={}){function i(e){if(r.capture||qr.call(t,e),!e.cancelBubble)return yt(()=>n?.call(this,e))}return e.startsWith(`pointer`)||e.startsWith(`touch`)||e===`wheel`?(i.__removed=!1,ut(()=>{i.__removed||t.addEventListener(e,i,r)})):t.addEventListener(e,i,r),i}function Ur(e,t,n,r,i){var a={capture:r,passive:i},o=Hr(e,t,n,a);(t===document.body||t===window||t===document||t instanceof HTMLMediaElement)&&jn(()=>{o.__removed=!0,t.removeEventListener(e,o,a)})}function K(e,t,n){(t[zr]??={})[e]=n}function Wr(e){for(var t=0;t<e.length;t++)Br.add(e[t]);for(var n of Vr)n(e)}var Gr=null,Kr=!1;function qr(e){var t=this,n=t.ownerDocument,r=e.type,i=e.composedPath?.()||[],a=i[0]||e.target;Gr=e,Kr||(Kr=!0,setTimeout(()=>{Kr=!1,Gr=null}));var o=0,s=Gr===e&&e[zr];if(s){var c=i.indexOf(s);if(c!==-1&&(t===document||t===window)){e[zr]=t;return}var l=i.indexOf(t);if(l===-1)return;c<=l&&(o=c)}if(a=i[o]||e.target,a!==t){p(e,`currentTarget`,{configurable:!0,get(){return a||n}});var u=U,d=W;rr(null),ir(null);try{for(var f,m=[];a!==null&&a!==t;){try{var h=a[zr]?.[r];h==null||a.disabled&&e.target!==a||h.call(a,e)}catch(e){f?m.push(e):f=e}if(e.cancelBubble)break;o++,a=o<i.length?i[o]:null}if(f){for(let e of m)queueMicrotask(()=>{throw e});throw f}}finally{e[zr]=t,delete e.currentTarget,rr(u),ir(d)}}}var Jr=globalThis?.window?.trustedTypes&&globalThis.window.trustedTypes.createPolicy(`svelte-trusted-html`,{createHTML:e=>e});function Yr(e){return Jr?.createHTML(e)??e}function Xr(e){var t=Cn(`template`);return t.innerHTML=Yr(e.replaceAll(`<!>`,`<!---->`)),t.content}function Zr(e,t){var n=W;n.nodes===null&&(n.nodes={start:e,end:t,a:null,t:null})}function q(e,t){var n=!!(t&1),r=!!(t&2),i,a=!e.startsWith(`<!>`);return()=>{if(O)return Zr(k,null),k;i===void 0&&(i=Xr(a?e:`<!>`+e),n||(i=yn(i)));var t=r||mn?document.importNode(i,!0):i.cloneNode(!0);if(n){var o=yn(t),s=t.lastChild;Zr(o,s)}else Zr(t,t);return t}}function Qr(e=``){if(!O){var t=vn(e+``);return Zr(t,t),t}var n=k;return n.nodeType===3?wn(n):(n.before(n=vn()),Ne(n)),Zr(n,n),n}function $r(){if(O)return Zr(k,null),k;var e=document.createDocumentFragment(),t=document.createComment(``),n=vn();return e.append(t,n),Zr(t,n),e}function J(e,t){if(O){var n=W;n.f&32768&&n.nodes.end!==null||(n.nodes.end=k),Pe()}else e!==null&&e.before(t)}function ei(e){let t=0,n=tn(0),r;return()=>{An()&&(G(n),Rn(()=>(t===0&&(r=Er(()=>e(()=>ln(n)))),t+=1,()=>{ut(()=>{--t,t===0&&(r?.(),r=void 0,ln(n))})})))}}var ti=ae|oe;function ni(e,t,n,r){new ri(e,t,n,r)}var ri=class{parent;is_pending=!1;transform_error;#e;#t=O?k:null;#n;#r;#i;#a=null;#o=null;#s=null;#c=null;#l=0;#u=0;#d=!1;#f=new Map;#p=null;#m=ei(()=>(this.#p=tn(this.#l),()=>{this.#p=null}));constructor(e,t,n,r){this.#e=e,this.#n=t,this.#r=e=>{var t=W;t.b=this,t.f|=128,n(e)},this.parent=W.b,this.transform_error=r??this.parent?.transform_error??(e=>e),this.#i=zn(()=>{if(O){let e=Ie(this.#t);Pe();let t=e===`[!`;if(e.startsWith(`[?`)){let t=JSON.parse(e.slice(2));this.#g(t)}else t?this.#y():this.#h()}else this.#b()},ti),O&&(this.#e=k)}#h(){try{this.#a=Vn(()=>this.#r(this.#e))}catch(e){this.error(e)}}#g(e){let t=this.#n.failed,{reset:n,invoke_onerror:r}=this.#_(e);ut(r),t&&(this.#s=Vn(()=>{t(this.#e,()=>e,()=>n)}))}#_(e){var t=!1,n=!1;let r=()=>{this.#v()||(t?je():(t=!0,n&&Ze(),this.#s!==null&&Jn(this.#s,()=>{this.#s=null}),this.#S(()=>{this.#b()})))};return{reset:r,invoke_onerror:()=>{if(!this.#v())try{n=!0,this.#n.onerror?.(e,r),n=!1}catch(e){En(e,this.#i&&this.#i.parent)}}}}#v(){return(this.#i.f&(ne|ie))!==0}#y(){let e=this.#n.pending;e&&(this.is_pending=!0,this.#o=Vn(()=>e(this.#e)),ut(()=>{if(!this.#v()){var e=this.#c=document.createDocumentFragment(),t=vn(),n=!1;e.append(t),this.#a=this.#S(()=>{try{return Vn(()=>this.#r(t))}catch(e){try{this.error(e),n=!0}catch(e){En(e,this.#i.parent)}return null}}),this.#a===null?(this.#c=null,n&&this.#x(P)):this.#u===0&&(this.#e.before(e),this.#c=null,Jn(this.#o,()=>{this.#o=null}),this.#x(P))}}))}#b(){try{if(this.is_pending=this.has_pending_snippet(),this.#u=0,this.#l=0,this.#a=Vn(()=>{this.#r(this.#e)}),this.#u>0){var e=this.#c=document.createDocumentFragment();Qn(this.#a,e);let t=this.#n.pending;this.#o=Vn(()=>t(this.#e))}else this.#x(P)}catch(e){this.error(e)}}#x(e){this.is_pending=!1,e.transfer_reactions(this.#f)}defer_effect(e){ht(e,this.#f)}is_rendered(){return!this.is_pending&&(!this.parent||this.parent.is_rendered())}has_pending_snippet(){return!!this.#n.pending}#S(e){var t=W,n=U,r=M;ir(this.#i),rr(this.#i),rt(this.#i.ctx);try{return Wt.ensure(),e()}finally{ir(t),rr(n),rt(r)}}#C(e,t){this.has_pending_snippet()?(this.#u+=e,this.#u===0&&(this.#x(t),this.#o&&Jn(this.#o,()=>{this.#o=null}),this.#c&&=(this.#e.before(this.#c),null))):this.parent&&this.parent.#C(e,t)}update_pending_count(e,t){this.#C(e,t),this.#l+=e,!this.#p||this.#d||(this.#d=!0,ut(()=>{this.#d=!1,this.#p&&on(this.#p,this.#l)}))}get_effect_pending(){return this.#m(),G(this.#p)}error(e){if(e===Ce||!this.#n.onerror&&!this.#n.failed)throw e;P?.is_fork?(this.#a&&P.skip_effect(this.#a),this.#o&&P.skip_effect(this.#o),this.#s&&P.skip_effect(this.#s),P.oncommit(()=>{this.#v()||this.#w(e)})):this.#w(e)}#w(e){this.#a&&=(Gn(this.#a),null),this.#o&&=(Gn(this.#o),null),this.#s&&=(Gn(this.#s),null),O&&(Ne(this.#t),j(),Ne(Fe()));let t=this.#n.failed,n=e=>{if(this.#v())return;let{reset:n,invoke_onerror:r}=this.#_(e);r(),t&&!this.#v()&&(this.#s=this.#S(()=>{try{return Vn(()=>{var r=W;r.b=this,r.f|=128,t(this.#e,()=>e,()=>n)})}catch(e){return En(e,this.#i.parent),null}}))};ut(()=>{if(!this.#v()){var t;try{t=this.transform_error(e)}catch(e){En(e,this.#i&&this.#i.parent);return}typeof t==`object`&&t&&typeof t.then==`function`?t.then(n,e=>En(e,this.#i&&this.#i.parent)):n(t)}})}};function Y(e,t){var n=t==null?``:typeof t==`object`?`${t}`:t;n!==(e[ye]??=e.nodeValue)&&(e[ye]=n,e.nodeValue=`${n}`)}function ii(e,t){return oi(e,t)}var ai=new Map;function oi(e,{target:t,anchor:n,props:r={},events:i,context:a,intro:o=!0,transformError:s}){_n();var c=void 0,l=Fn(()=>{var o=n??t.appendChild(vn());ni(o,{pending:()=>{}},t=>{it({});var n=M;if(a&&(n.c=a),i&&(r.$$events=i),O&&Zr(t,null),c=e(t,r)||ot(),O&&(W.nodes.end=k,k===null||k.nodeType!==8||k.data!==`]`))throw ke(),Ce;at()},s);var l=new Set,u=e=>{for(var n=0;n<e.length;n++){var r=e[n];if(!l.has(r)){l.add(r);var i=Ir(r);for(let e of[t,document]){var a=ai.get(e);a===void 0&&(a=new Map,ai.set(e,a));var o=a.get(r);o===void 0?(e.addEventListener(r,qr,{passive:i}),a.set(r,1)):a.set(r,o+1)}}}};return u(f(Br)),Vr.add(u),()=>{for(var e of l)for(let n of[t,document]){var r=ai.get(n),i=r.get(e);--i==0?(n.removeEventListener(e,qr),r.delete(e),r.size===0&&ai.delete(n)):r.set(e,i)}Vr.delete(u),o!==n&&o.parentNode?.removeChild(o)}});return si.set(c,l),c}var si=new WeakMap,ci=class{anchor;#e=new Map;#t=new Map;#n=new Map;#r=new Set;#i=!0;constructor(e,t=!0){this.anchor=e,this.#i=t}#a=e=>{if(this.#e.has(e)){var t=this.#e.get(e),n=this.#t.get(t);if(n)Xn(n),this.#r.delete(t);else{var r=this.#n.get(t);r&&(Xn(r.effect),this.#t.set(t,r.effect),this.#n.delete(t),r.fragment.lastChild.remove(),this.anchor.before(r.fragment),n=r.effect)}for(let[t,n]of this.#e){if(this.#e.delete(t),t===e)break;let r=this.#n.get(n);r&&(Gn(r.effect),this.#n.delete(n))}for(let[e,r]of this.#t){if(e===t||this.#r.has(e))continue;let i=()=>{if(Array.from(this.#e.values()).includes(e)){var t=document.createDocumentFragment();Qn(r,t),t.append(vn()),this.#n.set(e,{effect:r,fragment:t})}else Gn(r);this.#r.delete(e),this.#t.delete(e)};this.#i||!n?(this.#r.add(e),Jn(r,i,!1)):i()}}};#o=e=>{this.#e.delete(e);let t=Array.from(this.#e.values());for(let[e,n]of this.#n)t.includes(e)||(Gn(n.effect),this.#n.delete(e))};ensure(e,t){var n=P,r=Sn();if(t&&!this.#t.has(e)&&!this.#n.has(e)){if(r){var i=document.createDocumentFragment(),a=vn();i.append(a),this.#n.set(e,{effect:Vn(()=>t(a)),fragment:i})}else this.#t.set(e,Vn(()=>t(this.anchor)))}if(this.#e.set(n,e),r){for(let[t,r]of this.#t)t===e?n.unskip_effect(r):n.skip_effect(r);for(let[t,r]of this.#n)t===e?n.unskip_effect(r.effect):n.skip_effect(r.effect);n.oncommit(this.#a),n.ondiscard(this.#o)}else O&&(this.anchor=k),this.#a(n)}};function X(e,t,n=!1){var r;O&&(r=k,Pe());var i=new ci(e),a=n?ae:0;function o(e,t){if(O){var n=Ie(r);if(e!==parseInt(n.substring(1))){var a=Fe();Ne(a),i.anchor=a,Me(!1),i.ensure(e,t),Me(!0);return}}i.ensure(e,t)}zn(()=>{var e=!1;t((t,n=0)=>{e=!0,o(n,t)}),e||o(-1,null)},a)}var li=Symbol(`NaN`);function ui(e,t,n){O&&Pe();var r=new ci(e),i=!st();zn(()=>{var e=t();e!==e&&(e=li),i&&typeof e==`object`&&e&&(e={}),r.ensure(e,n)})}function di(e,t){return t}function fi(e,t,n){for(var r=[],i=t.length,a,o=t.length,s=0;s<i;s++){let n=t[s];Jn(n,()=>{if(a){if(a.pending.delete(n),a.done.add(n),a.pending.size===0){var t=e.outrogroups;pi(e,f(a.done)),t.delete(a),t.size===0&&(e.outrogroups=null)}}else--o},!1)}if(o===0){var c=r.length===0&&n!==null&&e.pending.size===0;if(c){var l=n,u=l.parentNode;xn(u),u.append(l),e.items.clear()}pi(e,t,!c)}else a={pending:new Set(t),done:new Set},(e.outrogroups??=new Set).add(a)}function pi(e,t,n=!0){var r;if(e.pending.size>0){r=new Set;for(let t of e.pending.values())for(let n of t)r.add(e.items.get(n).e)}for(var i=0;i<t.length;i++){var a=t[i];r?.has(a)?(a.f|=ce,Qn(a,document.createDocumentFragment())):Gn(t[i],n)}}var mi;function Z(e,t,n,r,i,a=null){var o=e,s=new Map;if(t&4){var c=e;o=O?Ne(yn(c)):c.appendChild(vn())}O&&Pe();var u=null,d=Ot(()=>{var e=n();return l(e)?e:e==null?[]:f(e)}),p=new Map,m=!0;function h(e){if(!(_.effect.f&16384)){_.pending.delete(e);var n=G(d);_.fallback=u,gi(_,n,o,t,r),u!==null&&(n.length===0?u.f&33554432?(u.f^=ce,vi(u,null,o)):Xn(u):Jn(u,()=>{u=null}))}}function g(e){_.pending.delete(e)}var _={effect:zn(()=>{var e=G(d),c=e.length;let l=!1;O&&Ie(o)===`[!`!=(c===0)&&(o=Fe(),Ne(o),Me(!1),l=!0);for(var f=new Set,_=P,v=Sn(),y=0;y<c;y+=1){O&&k.nodeType===8&&k.data===`]`&&(o=k,l=!0,Me(!1));var b=e[y],x=r(b,y),S=m?null:s.get(x);S?(S.v&&on(S.v,b),S.i&&on(S.i,y),v&&_.unskip_effect(S.e)):(S=_i(s,m?o:mi??=vn(),b,x,y,i,t,n),m||(S.e.f|=ce),s.set(x,S)),f.add(x)}if(c===0&&a&&!u&&(m?u=Vn(()=>a(o)):(u=Vn(()=>a(mi??=vn())),u.f|=ce)),c>f.size&&He(``,``,``),O&&c>0&&Ne(Fe()),!m){if(p.set(_,f),v){for(let[e,t]of s)f.has(e)||_.skip_effect(t.e);_.oncommit(h),_.ondiscard(g)}else h(_)}l&&Me(!0),G(d)}),flags:t,items:s,pending:p,outrogroups:null,fallback:u};m=!1,O&&(o=k)}function hi(e){for(;e!==null&&!(e.f&32);)e=e.next;return e}function gi(e,t,n,r,i){var a=!!(r&8),o=t.length,s=e.items,c=hi(e.effect.first),l,u=null,d,p=[],m=[],h,g,_,v;if(a)for(v=0;v<o;v+=1)h=t[v],g=i(h,v),_=s.get(g).e,_.f&33554432||(_.nodes?.a?.measure(),(d??=new Set).add(_));for(v=0;v<o;v+=1){if(h=t[v],g=i(h,v),_=s.get(g).e,e.outrogroups!==null)for(let t of e.outrogroups)t.pending.delete(_),t.done.delete(_);if(_.f&8192&&(Xn(_),a&&(_.nodes?.a?.unfix(),(d??=new Set).delete(_))),_.f&33554432){if(_.f^=ce,_===c)vi(_,null,n);else{var y=u?u.next:c;_===e.effect.last&&(e.effect.last=_.prev),_.prev&&(_.prev.next=_.next),_.next&&(_.next.prev=_.prev),yi(e,u,_),yi(e,_,y),vi(_,y,n),u=_,p=[],m=[],c=hi(u.next);continue}}if(_!==c){if(l!==void 0&&l.has(_)){if(p.length<m.length){var b=m[0],x;u=b.prev;var S=p[0],C=p[p.length-1];for(x=0;x<p.length;x+=1)vi(p[x],b,n);for(x=0;x<m.length;x+=1)l.delete(m[x]);yi(e,S.prev,C.next),yi(e,u,S),yi(e,C,b),c=b,u=C,--v,p=[],m=[]}else l.delete(_),vi(_,c,n),yi(e,_.prev,_.next),yi(e,_,u===null?e.effect.first:u.next),yi(e,u,_),u=_;continue}for(p=[],m=[];c!==null&&c!==_;)(l??=new Set).add(c),m.push(c),c=hi(c.next);if(c===null)continue}_.f&33554432||p.push(_),u=_,c=hi(_.next)}if(e.outrogroups!==null){for(let t of e.outrogroups)t.pending.size===0&&(pi(e,f(t.done)),e.outrogroups?.delete(t));e.outrogroups.size===0&&(e.outrogroups=null)}if(c!==null||l!==void 0){var w=[];if(l!==void 0)for(_ of l)_.f&8192||w.push(_);for(;c!==null;)!(c.f&8192)&&c!==e.fallback&&w.push(c),c=hi(c.next);var T=w.length;if(T>0){var E=r&4&&o===0?n:null;if(a){for(v=0;v<T;v+=1)w[v].nodes?.a?.measure();for(v=0;v<T;v+=1)w[v].nodes?.a?.fix()}fi(e,w,E)}}a&&ut(()=>{if(d!==void 0)for(_ of d)_.nodes?.a?.apply()})}function _i(e,t,n,r,i,a,o,s){var c=o&1?o&16?tn(n):nn(n,!1,!1):null,l=o&2?tn(i):null;return{v:c,i:l,e:Vn(()=>(a(t,c??n,l??i,s),()=>{e.delete(r)}))}}function vi(e,t,n){if(e.nodes)for(var r=e.nodes.start,i=e.nodes.end,a=t&&!(t.f&33554432)?t.nodes.start:n;r!==null;){var o=bn(r);if(a.before(r),r===i)return;r=o}}function yi(e,t,n){t===null?e.effect.first=n:t.next=n,n===null?e.effect.last=t:n.prev=t}function bi(e,t,n=!1,r=!1,i=!1,a=!1){var o=e,s=``;if(n){var c=e;O&&(o=Ne(yn(c)))}H(()=>{var e=W;if(s===(s=t()??``))O&&Pe();else if(n&&!O)e.nodes=null,c.innerHTML=s,s!==``&&Zr(yn(c),c.lastChild);else if(e.nodes!==null&&(Kn(e.nodes.start,e.nodes.end),e.nodes=null),s!==``){if(O){for(var a=k.data,l=Pe(),u=l;l!==null&&(l.nodeType!==8||l.data!==``);)u=l,l=bn(l);if(l===null)throw ke(),Ce;Zr(k,u),o=Ne(l)}else{var d=Cn(r?`svg`:i?`math`:`template`,r?Ee:i?De:void 0);d.innerHTML=s;var f=r||i?d:d.content;if(Zr(yn(f),f.lastChild),r||i)for(;yn(f);)o.before(yn(f));else o.before(f)}}})}function xi(e,t,n,r,i,a){let o=O;O&&Pe();var s=null;O&&k.nodeType===1&&(s=k,Pe());var c=O?k:e,l=new ci(c,!1);zn(()=>{let e=t()||null;var a=i?i():n||e===`svg`?Ee:void 0;if(e===null)l.ensure(null,null);else return l.ensure(e,t=>{if(e){var n=O;if(s=O?s:Cn(e,a),Zr(s,s),r){var i=null;O&&Rr(e)&&s.append(i=document.createComment(``));var o=O?yn(s):s.appendChild(vn());O&&(o===null?Me(!1):Ne(o)),r(s,o),i?.remove()}W.nodes.end=s,n||t.before(s)}O&&Ne(t)}),()=>{}},ae),jn(()=>{}),o&&(Me(!0),Ne(c))}function Si(e,t){var n=void 0,r;Bn(()=>{n!==(n=t())&&(r&&=(Gn(r),null),n&&(r=Vn(()=>{In(()=>n(e))})))})}function Ci(e){var t,n,r=``;if(typeof e==`string`||typeof e==`number`)r+=e;else if(typeof e==`object`){if(Array.isArray(e)){var i=e.length;for(t=0;t<i;t++)e[t]&&(n=Ci(e[t]))&&(r&&(r+=` `),r+=n)}else for(n in e)e[n]&&(r&&(r+=` `),r+=n)}return r}function wi(){for(var e,t,n=0,r=``,i=arguments.length;n<i;n++)(e=arguments[n])&&(t=Ci(e))&&(r&&(r+=` `),r+=t);return r}function Ti(e){return typeof e==`object`?wi(e):e??``}var Ei=[...` 	
\r\f\xA0\v﻿`];function Di(e,t,n){var r=e==null?``:``+e;if(t&&(r=r?r+` `+t:t),n){for(var i of Object.keys(n))if(n[i])r=r?r+` `+i:i;else if(r.length)for(var a=i.length,o=0;(o=r.indexOf(i,o))>=0;){var s=o+a;(o===0||Ei.includes(r[o-1]))&&(s===r.length||Ei.includes(r[s]))?r=(o===0?``:r.substring(0,o))+r.substring(s+1):o=s}}return r===``?null:r}function Oi(e,t=!1){var n=t?` !important;`:`;`,r=``;for(var i of Object.keys(e)){var a=e[i];a!=null&&a!==``&&(r+=` `+i+`: `+a+n)}return r}function ki(e){return e[0]!==`-`||e[1]!==`-`?e.toLowerCase():e}function Ai(e,t){if(t){var n=``,r,i;if(Array.isArray(t)?(r=t[0],i=t[1]):r=t,e){e=String(e).replaceAll(/\/\*.*?\*\//g,``).trim();var a=!1,o=0,s=!1,c=[];r&&c.push(...Object.keys(r).map(ki)),i&&c.push(...Object.keys(i).map(ki));var l=0,u=-1;let t=e.length;for(var d=0;d<t;d++){var f=e[d];if(s?f===`/`&&e[d-1]===`*`&&(s=!1):a?a===f&&(a=!1):f===`/`&&e[d+1]===`*`?s=!0:f===`"`||f===`'`?a=f:f===`(`?o++:f===`)`&&o--,!s&&a===!1&&o===0){if(f===`:`&&u===-1)u=d;else if(f===`;`||d===t-1){if(u!==-1){var p=ki(e.substring(l,u).trim());if(!c.includes(p)){f!==`;`&&d++;var m=e.substring(l,d).trim();n+=` `+m+`;`}}l=d+1,u=-1}}}}return r&&(n+=Oi(r)),i&&(n+=Oi(i,!0)),n=n.trim(),n===``?null:n}return e==null?null:String(e)}function ji(e,t,n,r,i,a){var o=e[_e];if(O||o!==n||o===void 0){var s=Di(n,r,a);O&&s===e.getAttribute(`class`)||(s==null?e.removeAttribute(`class`):t?e.className=s:e.setAttribute(`class`,s)),e[_e]=n}else if(a&&i!==a)for(var c in a){var l=!!a[c];(i==null||l!==!!i[c])&&e.classList.toggle(c,l)}return a}function Mi(e,t={},n,r){for(var i in n){var a=n[i];t[i]!==a&&(n[i]==null?e.style.removeProperty(i):e.style.setProperty(i,a,r))}}function Ni(e,t,n,r){var i=e[ve];if(O||i!==t){var a=Ai(t,r);O&&a===e.getAttribute(`style`)||(a==null?e.removeAttribute(`style`):e.style.cssText=a),e[ve]=t}else r&&(Array.isArray(r)?(Mi(e,n?.[0],r[0]),Mi(e,n?.[1],r[1],`important`)):Mi(e,n,r));return r}function Pi(e,t){t?e.hasAttribute(`selected`)||e.setAttribute(`selected`,``):e.removeAttribute(`selected`)}function Fi(e,t){var n=!(`__defaultValue`in e);(n||e.__defaultValue!==t)&&(e.__defaultValue=t,Ii(e,!n||`__value`in e))}function Ii(e,t){var n=e.__defaultValue,r=e.multiple,i=r?n??[]:null;if(!r||l(i)){var a=e.selectedIndex,o=t&&r?new Set(e.selectedOptions):null;for(var s of e.options){var c=Bi(s);Pi(s,r?i.includes(c):fn(c,n))}if(t){if(o!==null)for(s of e.options){var u=o.has(s);s.selected!==u&&(s.selected=u)}else e.selectedIndex!==a&&(e.selectedIndex=a)}}}function Li(e,t,n=!1){if(e.multiple){if(t==null)return;if(!l(t))return Ae();for(var r of e.options)r.selected=t.includes(Bi(r))}else{for(r of e.options)if(fn(Bi(r),t)){r.selected=!0;return}n&&t===void 0||(e.selectedIndex=-1)}}function Ri(e){var t=new MutationObserver(t=>{t.every(Vi)||(`__defaultValue`in e&&Ii(e,!1),`__value`in e&&Li(e,e.__value))});t.observe(e,{childList:!0,subtree:!0,attributes:!0,attributeFilter:[`value`]}),jn(()=>{t.disconnect()})}function zi(e,t,n=t){var r=new WeakSet,i=!0;bt(e,`change`,t=>{var i=t?`[selected]`:`:checked`,a;if(e.multiple)a=[].map.call(e.querySelectorAll(i),Bi);else{var o=e.querySelector(i)??e.querySelector(`option:not([disabled])`);a=o&&Bi(o)}n(a),e.__value=a,P!==null&&r.add(P)}),In(()=>{var a=t();if(e===document.activeElement){var o=P;if(r.has(o))return}if(Li(e,a,i),i&&a===void 0){var s=e.querySelector(`:checked`);s!==null&&(a=Bi(s),n(a))}e.__value=a,i=!1})}function Bi(e){return`__value`in e?e.__value:e.value}function Vi(e){if(e.target.closest(`selectedcontent`)!==null)return!0;if(e.type===`childList`){var t=[...e.addedNodes,...e.removedNodes];return t.length>0&&t.every(e=>e.nodeName===`SELECTEDCONTENT`)}return!1}var Hi=Symbol(`class`),Ui=Symbol(`style`),Wi=Symbol(`is custom element`),Gi=Symbol(`is html`),Ki=Se?`link`:`LINK`,qi=Se?`input`:`INPUT`,Ji=Se?`option`:`OPTION`,Yi=Se?`select`:`SELECT`,Xi=Se?`progress`:`PROGRESS`;function Zi(e){if(O){var t=!1,n=()=>{if(!t){if(t=!0,e.hasAttribute(`value`)){var n=e.value;$i(e,`value`,null),e.value=n}if(e.hasAttribute(`checked`)){var r=e.checked;$i(e,`checked`,null),e.checked=r}}};e[be]=n,ut(n),vt()}}function Qi(e,t){var n=na(e);n.checked!==(n.checked=t??void 0)&&(e.checked=t)}function $i(e,t,n,r){var i=na(e);if(!(O&&(i[t]=e.getAttribute(t),t===`src`||t===`srcset`||t===`href`&&e.nodeName===Ki))){var a=i[t];a!==(i[t]=n)&&(t===`loading`&&(e[he]=n),n==null?e.removeAttribute(t):typeof n!=`string`&&ia(e).has(t)?e[t]=n:(!O||typeof n!=`number`&&typeof n!=`boolean`||a!==String(n))&&e.setAttribute(t,n))}}function ea(e,t,n,r,i=!1,a=!1){O&&i&&e.nodeName===qi&&(`defaultValue`in n||`defaultChecked`in n||Zi(e));var o=na(e),s=o[Wi],c=!o[Gi];let l=O&&s;l&&Me(!1);var u=t||{},d=e.nodeName===Ji,f=e.nodeName===Yi;try{for(var p in t)!(p in n)&&p[0]+p[1]!==`$$`&&(n[p]=null);n.class?n.class=Ti(n.class):(r||n[Hi])&&(n.class=null),n[Ui]&&(n.style??=null);var m=ia(e);if(e.nodeName===qi&&`type`in n&&(`value`in n||`__value`in n)){var h=n.type;(h!==u.type||h===void 0&&e.hasAttribute(`type`))&&(u.type=h,$i(e,`type`,h,a))}for(let i in n){let l=n[i];if(d&&i===`value`&&l==null)e.value=e.__value=``,u[i]=l;else if(i===`class`)ji(e,e.namespaceURI===`http://www.w3.org/1999/xhtml`,l,r,t?.[Hi],n[Hi]),u[i]=l,u[Hi]=n[Hi];else if(i===`style`)Ni(e,l,t?.[Ui],n[Ui]),u[i]=l,u[Ui]=n[Ui];else{var g=u[i];if(l!==g||l===void 0&&e.hasAttribute(i)){u[i]=l;var _=i[0]+i[1];if(_!==`$$`){if(_===`on`){let t={},n=`$$`+i,r=i.slice(2);var v=jr(r);if(kr(r)&&(r=r.slice(0,-7),t.capture=!0),!v&&g){if(l!=null)continue;e.removeEventListener(r,u[n],t),u[n]=null}if(v)K(r,e,l),Wr([r]);else if(l!=null){function a(e){u[i].call(this,e)}u[n]=Hr(r,e,a,t)}}else if(i===`style`)$i(e,i,l);else if(i===`autofocus`)gt(e,!!l);else if(!s&&(i===`__value`||i===`value`&&l!=null))e.__value=l,(g==null||e.value!==l||l===0&&e.nodeName===Xi)&&(e.value=l);else if(i===`selected`&&d)Pi(e,l);else{var y=i;c||(y=Pr(y));var b=y===`defaultValue`||y===`defaultChecked`;if(f&&y===`defaultValue`)continue;if(l==null&&!s&&!b){if(o[i]=null,y===`value`||y===`checked`){let n=e,r=t===void 0;if(y===`value`){let e=n.defaultValue;n.removeAttribute(y),n.defaultValue=e,n.value=n.__value=r?e:null}else{let e=n.defaultChecked;n.removeAttribute(y),n.defaultChecked=e,n.checked=r?e:!1}}else e.removeAttribute(i)}else b||(s||typeof l!=`string`)&&m.has(y)?(e[y]=l,y in o&&(o[y]=we)):typeof l!=`function`&&$i(e,y,l,a)}}}}}}finally{l&&Me(!0)}return u}function ta(e,t,n=[],r=[],i=[],a,o=!1,s=!1){xt(i,n,r,n=>{var r=void 0,i={},c=e.nodeName===Yi,l=!1;if(Bn(()=>{var u=t(...n.map(G)),d=ea(e,r,u,a,o,s);if(l&&c){var f=e;`defaultValue`in u&&Fi(f,u.defaultValue),`value`in u&&Li(f,u.value)}for(let e of Object.getOwnPropertySymbols(i))u[e]||Gn(i[e]);for(let t of Object.getOwnPropertySymbols(u)){var p=u[t];t.description!==`@attach`||r&&p===r[t]||(i[t]&&Gn(i[t]),i[t]=Vn(()=>Si(e,()=>p))),d[t]=p}r=d}),c){var u=e;In(()=>{var e=r;`defaultValue`in e&&Fi(u,e.defaultValue),Li(u,e.value,!0),Ri(u)})}l=!0})}function na(e){return e[ge]??={[Wi]:e.nodeName.includes(`-`),[Gi]:e.namespaceURI===Te}}var ra=new Map;function ia(e){var t=e.getAttribute(`is`)||e.nodeName,n=ra.get(t);if(n)return n;ra.set(t,n=new Set);for(var r,i=e,a=Element.prototype;a!==i;){for(var o in r=h(i),r)r[o].set&&o!==`innerHTML`&&o!==`textContent`&&o!==`innerText`&&n.add(o);i=v(i)}return n}function aa(e,t,n=t){var r=new WeakSet;bt(e,`input`,async i=>{var a=i?e.defaultValue:e.value;if(a=sa(e)?ca(a):a,n(a),P!==null&&r.add(P),await Cr(),a!==(a=t())){var o=e.selectionStart,s=e.selectionEnd,c=e.value.length;if(e.value=a??``,s!==null){var l=e.value.length;o===s&&s===c&&l>c?(e.selectionStart=l,e.selectionEnd=l):(e.selectionStart=o,e.selectionEnd=Math.min(s,l))}}}),(O&&e.defaultValue!==e.value||Er(t)==null&&e.value)&&(n(sa(e)?ca(e.value):e.value),P!==null&&r.add(P)),Rn(()=>{var n=t();if(e===document.activeElement){var i=P;if(r.has(i))return}sa(e)&&n===ca(e.value)||(e.type!==`date`||n||e.value)&&n!==e.value&&(e.value=n??``)})}function oa(e,t,n=t){bt(e,`change`,t=>{n(t?e.defaultChecked:e.checked)}),(O&&e.defaultChecked!==e.checked||Er(t)==null)&&n(e.checked),Rn(()=>{e.checked=!!t()})}function sa(e){var t=e.type;return t===`number`||t===`range`}function ca(e){return e===``?null:+e}function la(e,t){return e===t||e?.[fe]===t}function ua(e=ot(),t,n,r){var i=M.r,a=W;return In(()=>{var o,s;return Rn(()=>{o=s,s=r?.()||[],Er(()=>{la(n(...s),e)||(t(e,...s),o&&la(n(...o),e)&&t(null,...o))})}),()=>{let r=a;for(;r!==i&&r.parent!==null&&r.parent.f&33554432;)r=r.parent;let o=()=>{s&&la(n(...s),e)&&t(null,...s)},c=r.teardown;r.teardown=()=>{o(),c?.()}}}),e}function da(e=!1){let t=M,n=t.l.u;if(!n)return;let r=()=>Dr(t.s);if(e){let e=0,n={},i=Tt(()=>{let r=!1,i=t.s;for(let e in i)i[e]!==n[e]&&(n[e]=i[e],r=!0);return r&&e++,e});r=()=>G(i)}n.b.length&&Pn(()=>{fa(t,r),S(n.b)}),Mn(()=>{let e=Er(()=>n.m.map(x));return()=>{for(let t of e)typeof t==`function`&&t()}}),n.a.length&&Mn(()=>{fa(t,r),S(n.a)})}function fa(e,t){if(e.l.s)for(let t of e.l.s)G(t);t()}var pa=!1;function ma(e){var t=pa;try{return pa=!1,[e(),pa]}finally{pa=t}}function ha(e,t,n,r){var i=!Qe||!!(n&2),a=!!(n&8),o=!!(n&16),s=r,c=!0,l=void 0,u=()=>o&&i?(l??=Tt(r),G(l)):(c&&(c=!1,s=o?Er(r):r),s);let d;if(a){var f=fe in e||me in e;d=m(e,t)?.set??(f&&t in e?n=>e[t]=n:void 0)}var p,h=!1;a?[p,h]=ma(()=>e[t]):p=e[t],p===void 0&&r!==void 0&&(p=u(),d&&(i&&qe(t),d(p)));var g=i?()=>{var n=e[t];return n===void 0?u():(c=!0,n)}:()=>{var n=e[t];return n!==void 0&&(s=void 0),n===void 0?s:n};if(i&&!(n&4))return g;if(d){var _=e.$$legacy;return(function(e,t){return arguments.length>0?((!i||!t||_||h)&&d(t?g():e),e):g()})}var v=!1,y=(n&1?Tt:Ot)(()=>(v=!1,g()));a&&G(y);var b=W;return(function(e,t){if(arguments.length>0){let n=t?G(y):i&&a?L(e):e;return I(y,n),v=!0,s!==void 0&&(s=n),e}return er&&v||b.f&16384?y.v:G(y)})}function ga(e){M===null&&Be(`onMount`),Qe&&M.l!==null?va(M).m.push(e):Mn(()=>{let t=Er(e);if(typeof t==`function`)return t})}function _a(e){M===null&&Be(`onDestroy`),ga(()=>()=>Er(e))}function va(e){var t=e.l;return t.u??={a:[],b:[],m:[]}}typeof window<`u`&&((window.__svelte??={}).v??=new Set).add(`5`);var ya=L({path:location.hash.slice(1)||`/`});addEventListener(`hashchange`,()=>{ya.path=location.hash.slice(1)||`/`});function ba(e){location.hash=e}function xa(e,t=ya.path){let n=e.split(`/`),r=t.split(`?`)[0].split(`/`);if(n.length!==r.length)return null;let i={};for(let e=0;e<n.length;e++)if(n[e].startsWith(`:`))i[n[e].slice(1)]=decodeURIComponent(r[e]);else if(n[e]!==r[e])return null;return i}var Sa={keyboard:!0,dictation:!1,tempo:100,clickSound:!1,gameSound:!0},Ca=[`lpinky`,`lring`,`lmiddle`,`lindex`,`rindex`,`rmiddle`,`rring`,`rpinky`,`thumb`],wa={lpinky:`bal kisujj`,lring:`bal gyűrűsujj`,lmiddle:`bal középsőujj`,lindex:`bal mutatóujj`,rindex:`jobb mutatóujj`,rmiddle:`jobb középsőujj`,rring:`jobb gyűrűsujj`,rpinky:`jobb kisujj`,thumb:`hüvelykujj`},Ta={};for(let[e,t]of[[`lpinky`,`0 1 2 Q A Í Y`],[`lring`,`3 W S X`],[`lmiddle`,`4 E D C`],[`lindex`,`5 6 R T F G V B`],[`rindex`,`7 8 Z U H J N M`],[`rmiddle`,`9 I K ,`],[`rring`,`Ö O L .`],[`rpinky`,`Ü Ó P Ő Ú É Á Ű -`]])for(let n of t.split(` `))Ta[n]=e;function Ea(e){if(e===` `)return`Space`;if(e===`
`)return`Enter`;let t=e.toLocaleUpperCase(`hu`);if(Ta[t])return t;let n={"'":`1`,'"':`2`,"+":`3`,"!":`4`,"%":`5`,"/":`6`,"=":`7`,"(":`8`,")":`9`,"§":`0`,"?":`,`,":":`.`,_:`-`};return n[e]?n[e]:null}function Da(e){if(e===` `)return`thumb`;let t=Ea(e);return t?Ta[t]??null:null}function Oa(e){return e!==e.toLocaleLowerCase(`hu`)||`'"+!%/=()§?:_`.includes(e)}function ka(e){return`U+`+e.codePointAt(0).toString(16).toUpperCase().padStart(4,`0`)}function Aa(e){return String.fromCodePoint(parseInt(e.slice(2),16))}var ja={a:`a`,á:`á`,b:`bé`,c:`cé`,d:`dé`,e:`e`,é:`é`,f:`ef`,g:`gé`,h:`há`,i:`i`,í:`í`,j:`jé`,k:`ká`,l:`el`,m:`em`,n:`en`,o:`o`,ó:`ó`,ö:`ö`,ő:`ő`,p:`pé`,q:`kú`,r:`er`,s:`es`,t:`té`,u:`u`,ú:`ú`,ü:`ü`,ű:`ű`,v:`vé`,w:`dupla vé`,x:`iksz`,y:`ipszilon`,z:`zé`,",":`vessző`,".":`pont`,"-":`kötőjel`," ":`köz`},Ma=class{lines;text;lineStarts;pos=0;marks;log=[];opts;constructor(e,t={}){this.lines=e,this.opts=t,this.lineStarts=[];let n=0;for(let t of e)this.lineStarts.push(n),n+=t.length;this.text=e.join(``),this.marks=Array(this.text.length).fill(void 0)}get done(){return this.pos>=this.text.length}get expected(){return this.done?null:this.text[this.pos]}where(e=this.pos){let t=0;for(;t+1<this.lineStarts.length&&this.lineStarts[t+1]<=e;)t++;return{line:t,col:e-this.lineStarts[t]}}type(e,t=performance.now()){if(this.done||e.length!==1)return null;let n=this.text[this.pos],r=e===n;return this.log.push({expected:n,typed:e,finger:Da(n),t}),this.marks[this.pos]=r,this.pos++,r}backspace(){return!this.opts.allowBackspace||this.pos===0?!1:(this.pos--,this.marks[this.pos]=void 0,!0)}handleKey(e,t){return e.key===`Backspace`||e.key===`Delete`?(this.backspace(),!0):e.ctrlKey||e.metaKey||e.key.length!==1?!1:(this.type(e.key,t),!0)}result(){return Pa(this.log)}};function Na(e){return e>=98?3:e>=95?2:+(e>=90)}function Pa(e){let t=e.length,n=e.filter(e=>e.typed!==e.expected).length,r=[],i=0;for(let t=1;t<e.length;t++){let n=e[t].t-e[t-1].t;n<=1e4&&(i+=n,r.push(n))}let a=r.length?r.reduce((e,t)=>e+t,0)/r.length:0,o=r.length?Math.sqrt(r.reduce((e,t)=>e+(t-a)**2,0)/r.length):0,s=t?Math.round((t-n)/t*1e3)/10:0,c=i>0?Math.round((t-1)/(i/6e4)):0;return{strokes:t,errors:n,accuracy:s,activeMs:i,lpm:c,rhythmSd:Math.round(o),stars:Na(s)}}function Fa(){return{keys:{},bigrams:{},fingers:{},confusions:{},totals:{strokes:0,errors:0,seconds:0,lessons:0},days:{},lastPractice:0}}function Ia(e,t,n,r){let i=e[t]??={n:0,err:0,ms:0};i.n++,n&&i.err++,i.ms+=r}function La(e){let t={keys:{},bigrams:{},fingers:{},confusions:{},missedKeys:{},fingerErrors:{}};for(let n=0;n<e.length;n++){let r=e[n],i=r.typed!==r.expected,a=n>0?r.t-e[n-1].t:0,o=a>0&&a<=1e4?a:0;if(Ia(t.keys,ka(r.expected),i,o),n>0&&Ia(t.bigrams,`${ka(e[n-1].expected)}_${ka(r.expected)}`,i,o),r.finger){let e=t.fingers[r.finger]??={n:0,err:0};e.n++,i&&e.err++}if(i){let e=`${ka(r.expected)}>${ka(r.typed)}`;t.confusions[e]=(t.confusions[e]??0)+1,t.missedKeys[r.expected]=(t.missedKeys[r.expected]??0)+1,r.finger&&(t.fingerErrors[r.finger]=(t.fingerErrors[r.finger]??0)+1)}}return t}function Ra(e=Date.now()){let t=new Date(e);return`${t.getFullYear()}-${String(t.getMonth()+1).padStart(2,`0`)}-${String(t.getDate()).padStart(2,`0`)}`}function za(e,t){for(let[n,r]of Object.entries(t)){let t=e[n]??={n:0,err:0,ms:0};t.n+=r.n,t.err+=r.err,t.ms+=r.ms}}function Ba(e,t,n,r,i=Date.now()){za(e.keys,t.keys),za(e.bigrams,t.bigrams);for(let[n,r]of Object.entries(t.fingers)){let t=e.fingers[n]??={n:0,err:0};t.n+=r.n,t.err+=r.err}for(let[n,r]of Object.entries(t.confusions))e.confusions[n]=(e.confusions[n]??0)+r;let a=Math.round(n.activeMs/1e3);e.totals.strokes+=n.strokes,e.totals.errors+=n.errors,e.totals.seconds+=a,r&&e.totals.lessons++;let o=e.days[Ra(i)]??={seconds:0,strokes:0,errors:0,lessons:0};return o.seconds+=a,o.strokes+=n.strokes,o.errors+=n.errors,r&&o.lessons++,e.lastPractice=i,e}function Va(e,t){let n=structuredClone(e);za(n.keys,t.keys),za(n.bigrams,t.bigrams);for(let[e,r]of Object.entries(t.fingers)){let t=n.fingers[e]??={n:0,err:0};t.n+=r.n,t.err+=r.err}for(let[e,r]of Object.entries(t.confusions))n.confusions[e]=(n.confusions[e]??0)+r;for(let e of[`strokes`,`errors`,`seconds`,`lessons`])n.totals[e]+=t.totals[e];for(let[e,r]of Object.entries(t.days)){let t=n.days[e]??={seconds:0,strokes:0,errors:0,lessons:0};t.seconds+=r.seconds,t.strokes+=r.strokes,t.errors+=r.errors,t.lessons+=r.lessons}return n.lastPractice=Math.max(e.lastPractice,t.lastPractice),n}var Ha=`gepiras-demo-v1`,Ua=`guest`,Wa=e=>JSON.parse(JSON.stringify(e)),Ga=null,Ka=new Set;function qa(){return{users:{},admins:[],schools:{},joinCodes:{},groups:{},progress:{},stats:{},results:[]}}function Q(){if(Ga)return Ga;try{let e=localStorage.getItem(Ha);Ga=e?JSON.parse(e):$a()}catch{Ga=$a()}return Ga}function Ja(){try{localStorage.setItem(Ha,JSON.stringify(Ga))}catch{}for(let e of Ka)e()}function Ya(e){return Ka.add(e),()=>Ka.delete(e)}function Xa(e){return e+Math.random().toString(36).slice(2,10)}function Za(){let e=``;for(let t=0;t<6;t++)e+=`ABCDEFGHJKLMNPRSTUVZ23456789`[Math.floor(Math.random()*28)];return e}var Qa={sequential:!0,allowBackspace:!1};function $a(){let e=qa(),t=Date.now(),n=(e,n,r,i,a,o)=>({uid:e,name:n,email:r,role:i,schoolId:a,groupId:o,createdAt:t,lastLogin:t});return e.users[`u-admin`]=n(`u-admin`,`Üzemeltető (demó)`,`admin@pelda.hu`,`admin`,null,null),e.admins.push(`u-admin`),e.schools[`s-demo`]={id:`s-demo`,name:`Demó Gimnázium`,teacherIds:[`u-tanar`],joinCode:`DEMO42`,disabled:!1,createdAt:t},e.joinCodes.DEMO42=`s-demo`,e.users[`u-tanar`]=n(`u-tanar`,`Tanár Teréz (demó)`,`tanar@pelda.hu`,`teacher`,`s-demo`,null),e.groups[`g-9a`]={id:`g-9a`,schoolId:`s-demo`,name:`9.a gépírás`,teacherIds:[`u-tanar`],settings:{...Qa},createdAt:t},e.users[`u-anna`]=n(`u-anna`,`Kiss Anna`,`anna@pelda.hu`,`student`,`s-demo`,`g-9a`),e.users[`u-bence`]=n(`u-bence`,`Nagy Bence`,`bence@pelda.hu`,`student`,`s-demo`,`g-9a`),e.users[`u-csilla`]=n(`u-csilla`,`Tóth Csilla`,`csilla@pelda.hu`,`student`,`s-demo`,null),e.progress[`u-anna`]={lessons:{l01:{stars:2,accuracy:96.4,lpm:92,date:t-864e5,completed:!0,steps:{}}},games:{betueso:{kezdo:420}},settings:{...Sa}},e.results.push({id:`r-demo1`,uid:`u-anna`,schoolId:`s-demo`,groupId:`g-9a`,lessonId:`l01`,kind:`typing`,stars:2,accuracy:96.4,lpm:92,strokes:2900,errors:104,activeMs:189e4,rhythmSd:140,missedKeys:{é:31,l:22,a:18},fingerErrors:{rpinky:31,rring:22,lpinky:18},dictation:!1,tempo:100,at:t-864e5}),e}async function eo(){Ga=$a(),Ja()}async function to(e){return Q().users[e]??null}async function no(){return Object.values(Q().users)}async function ro(e){return Q().admins.includes(e)}async function io(e,t){let n=Q(),r=Date.now(),i={uid:Xa(`u-`),name:e,email:t,role:`student`,schoolId:null,groupId:null,createdAt:r,lastLogin:r};return n.users[i.uid]=i,Ja(),i}async function ao(e){let t=Q().users[e];t&&(t.lastLogin=Date.now(),Ja())}async function oo(e,t){let n=Q(),r=n.users[e];if(!r)throw Error(`Nincs ilyen felhasználó.`);if(r.schoolId)throw Error(`Már tartozik iskolához; áthelyezni csak a tanár tudja.`);let i=n.joinCodes[t.trim().toUpperCase()],a=i?n.schools[i]:void 0;if(!a||a.disabled)throw Error(`Érvénytelen iskolakód.`);return r.schoolId=a.id,r.groupId=null,r.role=`student`,Ja(),a}async function so(e){let t=Q(),n=t.users[e];if(!n)return null;let r=t.progress[e],i={},a=null,o=0;for(let[e,t]of Object.entries(r?.lessons??{}))i[e]=t.stars,t.date>o&&(o=t.date,a=e);return{uid:e,name:n.name,schoolId:n.schoolId,groupId:n.groupId,lastLesson:a,stars:i}}async function co(e){let t=Object.values(Q().users).filter(t=>t.groupId===e&&t.role===`student`).map(e=>e.uid);return(await Promise.all(t.map(so))).filter(Boolean).sort((e,t)=>e.name.localeCompare(t.name,`hu`))}async function lo(){return Object.values(Q().schools).sort((e,t)=>e.name.localeCompare(t.name,`hu`))}async function uo(e){return Q().schools[e]??null}async function fo(e){let t=Q(),n=Za(),r={id:Xa(`s-`),name:e,teacherIds:[],joinCode:n,disabled:!1,createdAt:Date.now()};return t.schools[r.id]=r,t.joinCodes[n]=r.id,Ja(),r}async function po(e,t){let n=Q().schools[e];n&&(n.disabled=t,Ja())}async function mo(e){let t=Q(),n=t.schools[e];if(!n)throw Error(`Nincs ilyen iskola.`);return delete t.joinCodes[n.joinCode],n.joinCode=Za(),t.joinCodes[n.joinCode]=n.id,Ja(),n.joinCode}async function ho(e,t){let n=Q(),r=n.users[e],i=n.schools[t];if(!r||!i)throw Error(`Nincs ilyen felhasználó vagy iskola.`);r.role=`teacher`,r.schoolId=t,r.groupId=null,i.teacherIds.includes(e)||i.teacherIds.push(e),Ja()}async function go(e,t){let n=Q(),r=n.users[e];if(!r||!r.schoolId)return;let i=n.schools[r.schoolId];if(i&&i.teacherIds.length<=1&&!t)throw Error(`Az utolsó tanártól a szerepet csak az üzemeltető veheti el.`);i&&(i.teacherIds=i.teacherIds.filter(t=>t!==e));for(let t of Object.values(n.groups))t.teacherIds=t.teacherIds.filter(t=>t!==e);r.role=`student`,r.groupId=null,Ja()}async function _o(e){return Object.values(Q().users).filter(t=>t.schoolId===e).sort((e,t)=>e.name.localeCompare(t.name,`hu`))}async function vo(e){return Object.values(Q().groups).filter(t=>t.schoolId===e).sort((e,t)=>e.name.localeCompare(t.name,`hu`))}async function yo(e){return Q().groups[e]??null}async function bo(e,t,n){let r={id:Xa(`g-`),schoolId:e,name:t,teacherIds:[n],settings:{...Qa},createdAt:Date.now()};return Q().groups[r.id]=r,Ja(),r}async function xo(e,t){let n=Q().groups[e];n&&(Object.assign(n,t),Ja())}async function So(e){let t=Q();for(let n of Object.values(t.users))n.groupId===e&&(n.groupId=null);delete t.groups[e],Ja()}async function Co(e,t){let n=Q(),r=n.users[e];if(!r||r.role!==`student`)throw Error(`Csak diákot lehet csoportba sorolni.`);if(t&&n.groups[t]?.schoolId!==r.schoolId)throw Error(`A csoport másik iskoláé.`);r.groupId=t,Ja()}async function wo(e,t){let n=Q(),r=n.users[e],i=n.joinCodes[t.trim().toUpperCase()],a=i?n.schools[i]:void 0;if(!r||r.role!==`student`)throw Error(`Csak diákot lehet áthelyezni.`);if(!a||a.disabled)throw Error(`Érvénytelen iskolakód.`);return r.schoolId=a.id,r.groupId=null,Ja(),a}async function To(e){let t=Q();delete t.users[e],delete t.progress[e],delete t.stats[e],t.results=t.results.filter(t=>t.uid!==e);for(let n of Object.values(t.schools))n.teacherIds=n.teacherIds.filter(t=>t!==e);Ja()}async function Eo(e){let t=Q().users[e];return(t?.groupId?Q().groups[t.groupId]:void 0)?.settings??Qa}function Do(){return{lessons:{},games:{},settings:{...Sa}}}async function Oo(e){let t=Q().progress[e];return t?Wa(t):Do()}async function ko(e,t){Q().progress[e]=Wa(t),Ja()}async function Ao(e){let t=Q().stats[e];return t?Wa(t):Fa()}async function jo(e,t){Q().stats[e]=Wa(t),Ja()}async function Mo(e){let t={...e,id:Xa(`r-`)};return Q().results.push(t),Ja(),t}async function No(e){return Q().results.filter(t=>t.uid===e).sort((e,t)=>t.at-e.at)}async function Po(e){return Q().results.filter(t=>t.schoolId===e).sort((e,t)=>t.at-e.at)}async function Fo(e){let t=Q(),n=t.progress[Ua];if(n){let r=t.progress[e]??Do();for(let[e,t]of Object.entries(n.lessons)){let n=r.lessons[e];(!n||t.accuracy>n.accuracy||t.completed&&!n.completed)&&(r.lessons[e]=t)}for(let[e,t]of Object.entries(n.games)){let n=r.games[e]??={};for(let[e,r]of Object.entries(t))n[e]=Math.max(n[e]??0,r)}t.progress[e]=r,delete t.progress[Ua]}t.stats.guest&&(t.stats[e]=t.stats[e]?Va(t.stats[e],t.stats[Ua]):t.stats[Ua],delete t.stats[Ua]);let r=t.users[e];for(let n of t.results)n.uid===`guest`&&(n.uid=e,n.schoolId=r?.schoolId??null,n.groupId=r?.groupId??null);Ja()}var Io=`gepiras-session`;function Lo(){try{return localStorage.getItem(Io)||`guest`}catch{return Ua}}var $=L({uid:Lo(),user:null,admin:!1,progress:Do(),settings:Qa,ready:!1});async function Ro(){$.user=$.uid===`guest`?null:await to($.uid),$.uid!==`guest`&&!$.user?await Bo():($.admin=$.user?await ro($.uid):!1,$.progress=await Oo($.uid),$.settings=await Eo($.uid),$.ready=!0)}async function zo(e){$.uid=e;try{localStorage.setItem(Io,e)}catch{}await ao(e),await Fo(e),await Ro()}async function Bo(){$.uid=Ua;try{localStorage.removeItem(Io)}catch{}await Ro()}async function Vo(e){$.progress=e,await ko($.uid,e)}Ya(()=>{Ro()}),$e();var Ho=(e,t=1)=>(Math.round(e*10**t)/10**t).toString().replace(`.`,`,`),Uo=[{id:`l01`,number:1,title:`1. gyakorlat`,subtitle:`Az alaptartás betűi I.`,newKeys:`A S D F | J K L É`,steps:[{section:`Az alaptartás betűi I.`,instructions:[`Helyezzük a két kezünk nyolc ujját az alaptartás billentyűire, és folyamatosan érintsük a billentyűket!
Hüvelykujjunkat könnyedén tartsuk a közbillentyű felett. A három azonos betű leütése után üssünk egy közt!`],lines:[`jjjj jjjj jjjj jjjj jjjj jjjj jjjj jjjj jjjj jjjj jjjj jjjj`,`kkkk kkkk kkkk kkkk kkkk kkkk kkkk kkkk kkkk kkkk kkkk kkkk`,`ffff ffff ffff ffff ffff ffff ffff ffff ffff ffff ffff ffff`,`dddd dddd dddd dddd dddd dddd dddd dddd dddd dddd dddd dddd`,`ssss ssss ssss ssss ssss ssss ssss ssss ssss ssss ssss ssss`,`aaaa aaaa aaaa aaaa aaaa aaaa aaaa aaaa aaaa aaaa aaaa aaaa`,`llll llll llll llll llll llll llll llll llll llll llll llll`,`éééé éééé éééé éééé éééé éééé éééé éééé éééé éééé éééé éééé`,`jjj kkk fff ddd jjj kkk fff ddd jjj kkk fff ddd jjj kkk fff`,`lll ééé sss aaa lll ééé sss aaa lll ééé sss aaa lll ééé sss`]},{section:`Gyakorlatok a k é f s betűkhöz`,instructions:[`Lassan ütemesen, folyamatosan írjunk, a minta szerint öt sort!
Hangosan mondjuk a betűket, vagy legalább szájmozgással kövessük a billentést!
Sorváltáskor ne álljunk meg! Folyamatosan írjunk, csak az ötödik sor végén nyomjuk meg az entert!`,`Ne nézzünk a billentyűzetre!`],lines:[`kéké kéké fsfs fsfs kéké kéké fsfs fsfs kéké kéké fsfs fsfs`,`kéké kéké fsfs fsfs kéké kéké fsfs fsfs kéké kéké fsfs fsfs`,`kéké kéké fsfs fsfs kéké kéké fsfs fsfs kéké kéké fsfs fsfs`,`kéké kéké fsfs fsfs kéké kéké fsfs fsfs kéké kéké fsfs fsfs`,`kéké kéké fsfs fsfs kéké kéké fsfs fsfs kéké kéké fsfs fsfs`]},{section:`Gyakorlatok a k é f s betűkhöz`,instructions:[],lines:[`kéfs kéfs kéfs kéfs kéfs kéfs kéfs kéfs kéfs kéfs kéfs kéfs`,`kéfs kéfs kéfs kéfs kéfs kéfs kéfs kéfs kéfs kéfs kéfs kéfs`,`kéfs kéfs kéfs kéfs kéfs kéfs kéfs kéfs kéfs kéfs kéfs kéfs`,`kéfs kéfs kéfs kéfs kéfs kéfs kéfs kéfs kéfs kéfs kéfs kéfs`,`kéfs kéfs kéfs kéfs kéfs kéfs kéfs kéfs kéfs kéfs kéfs kéfs`]},{section:`Gyakorlatok a k é f s betűkhöz`,instructions:[],lines:[`kés kés fék fék kés kés fék fék kés kés fék fék kés kés fék`,`kés kés fék fék kés kés fék fék kés kés fék fék kés kés fék`,`kés kés fék fék kés kés fék fék kés kés fék fék kés kés fék`,`kés kés fék fék kés kés fék fék kés kés fék fék kés kés fék`,`kés kés fék fék kés kés fék fék kés kés fék fék kés kés fék`]},{section:`Gyakorlatok a k é f s betűkhöz`,instructions:[],lines:[`ék és késs ék és késs ék és késs ék és késs ék és késs ék s`,`ék és késs ék és késs ék és késs ék és késs ék és késs ék s`,`ék és késs ék és késs ék és késs ék és késs ék és késs ék s`,`ék és késs ék és késs ék és késs ék és késs ék és késs ék s`,`ék és késs ék és késs ék és késs ék és késs ék és késs ék s`]},{section:`Gyakorlatok a j l d a betűkhöz`,instructions:[`A gépírás tanulása az akaratnevelés iskolája`],lines:[`jljl jljl dada dada jljl jljl dada dada jljl jljl dada dada`,`jljl jljl dada dada jljl jljl dada dada jljl jljl dada dada`,`jljl jljl dada dada jljl jljl dada dada jljl jljl dada dada`,`jljl jljl dada dada jljl jljl dada dada jljl jljl dada dada`,`jljl jljl dada dada jljl jljl dada dada jljl jljl dada dada`]},{section:`Gyakorlatok a j l d a betűkhöz`,instructions:[],lines:[`jlda jlda jlda jlda jlda jlda jlda jlda jlda jlda jlda jlda`,`jlda jlda jlda jlda jlda jlda jlda jlda jlda jlda jlda jlda`,`jlda jlda jlda jlda jlda jlda jlda jlda jlda jlda jlda jlda`,`jlda jlda jlda jlda jlda jlda jlda jlda jlda jlda jlda jlda`,`jlda jlda jlda jlda jlda jlda jlda jlda jlda jlda jlda jlda`]},{section:`Gyakorlatok a j l d a betűkhöz`,instructions:[],lines:[`dal dal adj adj dal dal adj adj dal dal adj adj dal dal adj`,`dal dal adj adj dal dal adj adj dal dal adj adj dal dal adj`,`dal dal adj adj dal dal adj adj dal dal adj adj dal dal adj`,`dal dal adj adj dal dal adj adj dal dal adj adj dal dal adj`,`dal dal adj adj dal dal adj adj dal dal adj adj dal dal adj`]},{section:`Gyakorlatok a j l d a betűkhöz`,instructions:[],lines:[`al ad alja al ad alja al ad alja al ad alja al ad alja al a`,`al ad alja al ad alja al ad alja al ad alja al ad alja al a`,`al ad alja al ad alja al ad alja al ad alja al ad alja al a`,`al ad alja al ad alja al ad alja al ad alja al ad alja al a`,`al ad alja al ad alja al ad alja al ad alja al ad alja al a`]}],image:`img/ASDFJKLE.svg`},{id:`l02`,number:2,title:`2. gyakorlat`,subtitle:`Az alaptartás betűi II.`,newKeys:`A S D F | J K L É`,steps:[{section:`Az alaptartás betűi II.`,instructions:[`Lassan ütemesen, folyamatosan írjunk, lágyan billentsünk!
Sorvégi megállás nélkül, a minta szerint öt sort írjunk!
Hangosan mondjuk, vagy némán szájmozgással ejtsük ki a betűket!`,`Ne nézzünk a billentyűzetre!`],lines:[`élkj élkj fdsa fdsa élkj élkj fdsa fdsa élkj élkj fdsa fdsa`,`élkj élkj fdsa fdsa élkj élkj fdsa fdsa élkj élkj fdsa fdsa`,`élkj élkj fdsa fdsa élkj élkj fdsa fdsa élkj élkj fdsa fdsa`,`élkj élkj fdsa fdsa élkj élkj fdsa fdsa élkj élkj fdsa fdsa`,`élkj élkj fdsa fdsa élkj élkj fdsa fdsa élkj élkj fdsa fdsa`]},{section:`Az alaptartás betűi II.`,instructions:[],lines:[`jlké jlké dasf dasf jlké jlké dasf dasf jlké jlké dasf dasf`,`jlké jlké dasf dasf jlké jlké dasf dasf jlké jlké dasf dasf`,`jlké jlké dasf dasf jlké jlké dasf dasf jlké jlké dasf dasf`,`jlké jlké dasf dasf jlké jlké dasf dasf jlké jlké dasf dasf`,`jlké jlké dasf dasf jlké jlké dasf dasf jlké jlké dasf dasf`]},{section:`Az alaptartás betűi II.`,instructions:[],lines:[`kélj kélj fsda fsda kélj kélj fsda fsda kélj kélj fsda fsda`,`kélj kélj fsda fsda kélj kélj fsda fsda kélj kélj fsda fsda`,`kélj kélj fsda fsda kélj kélj fsda fsda kélj kélj fsda fsda`,`kélj kélj fsda fsda kélj kélj fsda fsda kélj kélj fsda fsda`,`kélj kélj fsda fsda kélj kélj fsda fsda kélj kélj fsda fsda`]},{section:`Az alaptartás betűi II.`,instructions:[],lines:[`akad akad félj félj akad akad félj félj akad akad félj félj`,`akad akad félj félj akad akad félj félj akad akad félj félj`,`akad akad félj félj akad akad félj félj akad akad félj félj`,`akad akad félj félj akad akad félj félj akad akad félj félj`,`akad akad félj félj akad akad félj félj akad akad félj félj`]},{section:`Az alaptartás betűi II.`,instructions:[],lines:[`késés késés dajka dajka késés késés dajka dajka késés késés`,`dajka dajka késés késés dajka dajka késés késés dajka dajka`,`késés késés dajka dajka késés késés dajka dajka késés késés`,`dajka dajka késés késés dajka dajka késés késés dajka dajka`,`késés késés dajka dajka késés késés dajka dajka késés késés`]},{section:`Az alaptartás betűi II.`,instructions:[],lines:[`fakad fakad félés félés fakad fakad félés félés fakad fakad`,`félés félés fakad fakad félés félés fakad fakad félés félés`,`fakad fakad félés félés fakad fakad félés félés fakad fakad`,`félés félés fakad fakad félés félés fakad fakad félés félés`,`fakad fakad félés félés fakad fakad félés félés fakad fakad`]},{section:`Az alaptartás betűi II.`,instructions:[],lines:[`sasfélék sasfélék salakkal salakkal sasfélék sasfélék salak`,`sasfélék sasfélék salakkal salakkal sasfélék sasfélék salak`,`sasfélék sasfélék salakkal salakkal sasfélék sasfélék salak`,`sasfélék sasfélék salakkal salakkal sasfélék sasfélék salak`,`sasfélék sasfélék salakkal salakkal sasfélék sasfélék salak`]},{section:`Az alaptartás betűi II.`,instructions:[],lines:[`kés fék ék késs dal al ad alja akad félj késés dajka fakadj`,`kés fék ék késs dal al ad alja akad félj késés dajka fakadj`,`kés fék ék késs dal al ad alja akad félj késés dajka fakadj`,`kés fék ék késs dal al ad alja akad félj késés dajka fakadj`,`kés fék ék késs dal al ad alja akad félj késés dajka fakadj`]}],image:`img/ASDFJKLE.svg`}],Wo=[{kind:`typing`,id:`l01`,lesson:Uo[0]},{kind:`game`,id:`g-betueso`,game:`betueso`,title:`Betűeső`,after:`l01`},{kind:`typing`,id:`l02`,lesson:Uo[1]}];function Go(e){return Uo.find(t=>t.id===e)}function Ko(e,t){return!!e.lessons[t]?.completed}function qo(e,t,n){if(t.kind===`game`)return Ko(e,t.after);if(!n.sequential)return!0;let r=Uo.findIndex(e=>e.id===t.id);return r<=0||Ko(e,Uo[r-1].id)}function Jo(e){let t=new Set;for(let n of e.steps)for(let e of n.lines)for(let n of e.split(` `))n.length<2||/^(.)\1+$/.test(n)||t.add(n);return[...t]}var Yo=`aáeéiíoóöőuúüű`,Xo=e=>Yo.includes(e);function Zo(e){if(![...e].some(Xo)||e.length>=2&&!Xo(e[0])&&!Xo(e[1]))return!0;let t=e.match(/[^aáeéiíoóöőuúüű]+$/)?.[0]??``;return t.length>=3||t.length===2&&t[0]!==t[1]&&![`lj`,`dj`,`nj`].includes(t)}function Qo(e){let t=Uo.findIndex(t=>t.id===e),n=Uo.slice(0,t+1).flatMap(Jo).filter(e=>!Zo(e)),r=[...new Set(n)],i=r.filter(e=>e.length>=3&&e.length<=8);return i.length>=8?i:r}var $o=q(`<p class="note svelte-1muhseh">Besorolásra vár – a leckéket addig is végezheti.</p>`),es=q(`<p class="note svelte-1muhseh">Vendégként a haladása csak ebben a böngészőben tárolódik.</p>`),ts=q(`<span class="stars" title="legjobb eredmény"> </span> <span class="muted"> </span>`,1),ns=q(`<span> </span>`),rs=q(`<div class="main"><div class="title svelte-1muhseh"> </div> <div class="muted">Új billentyűk: <span class="keys svelte-1muhseh"> </span> </div></div> <div class="side svelte-1muhseh"><!> <!></div>`,1),is=q(`<li><!></li>`),as=q(`<div class="main"><div class="title svelte-1muhseh"> </div> <div class="muted"> </div></div>`),os=q(`<h1>Leckék</h1> <p class="intro svelte-1muhseh">Gyakoroljon a Kökény-módszer szerint: tematikus, ritmikus gyakorlással tanulunk, a leckék sorban építik fel a billentyűzetet.
  A hibát nem javítjuk, hanem folytatjuk az írást. Ne nézzen a billentyűzetre, a szemét tartsa a szövegen!</p> <!> <ul class="list svelte-1muhseh"></ul>`,1);function ss(e,t){it(t,!1);let n=e=>`★`.repeat(e)+`☆`.repeat(3-e);function r(e,t){let n=$.progress.lessons[e];if(!n)return`Kezdés`;if(n.completed)return`Kész`;let r=Object.keys(n.steps).length;return r?`Folytatás (${Math.min(r+1,t)}/${t}. lépés)`:`Kezdés`}let i=e=>qo($.progress,e,$.settings);da();var a=os(),o=V(z(a),4),s=e=>{J(e,$o())},c=e=>{J(e,es())};X(o,e=>{$.user?.role===`student`&&!$.user.groupId?e(s):$.user||e(c,1)});var l=V(o,2);Z(l,5,()=>Wo,e=>e.id,(e,t)=>{let a=Ot(()=>i(G(t)));var o=$r(),s=z(o),c=e=>{let i=Ot(()=>$.progress.lessons[G(t).id]);var o=is();let s;xi(R(o),()=>G(a)?`a`:`div`,!1,(e,o)=>{ta(e,()=>({class:`row`,href:G(a)?`#/lecke/${G(t).id}`:void 0}),void 0,void 0,void 0,`svelte-1muhseh`);var s=rs(),c=z(s),l=R(c),u=B(l),d=V(l,2),f=V(R(d)),p=B(f,!0),m=V(f);A(d),A(c);var h=V(c,2),g=R(h),_=e=>{var t=ts(),r=z(t),a=B(r,!0),o=B(V(r,2));H((e,t)=>{Y(a,e),Y(o,`${t??``}% · ${G(i).lpm??``} leütés/perc`)},[()=>n(G(i).stars),()=>Ho(G(i).accuracy)]),J(e,t)},v=N(()=>G(i)&&Object.keys(G(i).steps).length);X(g,e=>{G(v)&&e(_)});var y=V(g,2),b=e=>{var n=ns();let a;var o=B(n,!0);H(e=>{a=ji(n,1,`badge svelte-1muhseh`,null,a,{done:G(i)?.completed}),Y(o,e)},[()=>r(G(t).id,G(t).lesson.steps.length)]),J(e,n)};X(y,e=>{G(a)&&e(b)}),A(h),H(()=>{Y(u,`${G(a)?``:`🔒 `}${G(t).lesson.number??``}. lecke – ${G(t).lesson.subtitle??``}`),Y(p,G(t).lesson.newKeys),Y(m,` · ${G(t).lesson.steps.length??``} lépés`)}),J(o,s)}),A(o),H(()=>s=ji(o,1,`card svelte-1muhseh`,null,s,{locked:!G(a)})),J(e,o)},l=e=>{var n=is();let r;xi(R(n),()=>G(a)?`a`:`div`,!1,(e,n)=>{ta(e,()=>({class:`row`,href:G(a)?`#/jatek/betueso`:void 0}),void 0,void 0,void 0,`svelte-1muhseh`);var r=as(),i=R(r),o=B(i),s=B(V(i,2),!0);A(r),H(()=>{Y(o,`${G(a)?`🎮`:`🔒`} ${G(t).title??``} – játék`),Y(s,G(a)?`Gyakoroljon játékosan a megtanult betűkkel!`:`Az 1. lecke teljesítése után nyílik meg.`)}),J(n,r)}),A(n),H(()=>r=ji(n,1,`card game svelte-1muhseh`,null,r,{locked:!G(a)})),J(e,n)};X(s,e=>{G(t).kind===`typing`?e(c):e(l,-1)}),J(e,o)}),A(l),J(e,a),at()}function cs(e){return JSON.parse(JSON.stringify(e))}function ls(e,t){let n=Object.values(e.steps),r=e=>n.length?n.reduce((t,n)=>t+e(n),0)/n.length:0;e.accuracy=Math.round(r(e=>e.accuracy)*10)/10,e.lpm=Math.round(r(e=>e.lpm)),e.stars=Na(e.accuracy),e.date=Math.max(0,...n.map(e=>e.date)),e.completed=Array.from({length:t},(t,n)=>e.steps[n]).every(e=>!!e&&e.accuracy>=90)}async function us(e,t,n,r,i){let a=Date.now(),o=cs($.progress),s=o.lessons[e]??={stars:0,accuracy:0,lpm:0,date:a,completed:!1,steps:{}},c=s.completed,l=s.steps[t];(!l||i.accuracy>=l.accuracy)&&(s.steps[t]={accuracy:i.accuracy,lpm:i.lpm,stars:i.stars,date:a}),ls(s,n);let u=s.completed&&!c;await Vo(o);let d=$.user,f=La(r);await Mo({kind:`typing`,lessonId:`${e}#${t+1}`,uid:$.uid,schoolId:d?.schoolId??null,groupId:d?.groupId??null,stars:i.stars,accuracy:i.accuracy,lpm:i.lpm,strokes:i.strokes,errors:i.errors,activeMs:i.activeMs,rhythmSd:i.rhythmSd,missedKeys:f.missedKeys,fingerErrors:f.fingerErrors,dictation:o.settings.dictation,tempo:o.settings.tempo,at:a});let p=await Ao($.uid);return Ba(p,f,i,u,a),await jo($.uid,p),{lessonJustCompleted:u}}var ds=null,fs=null;function ps(){try{if(ds??=new AudioContext,ds.state===`suspended`&&ds.resume(),!fs){let e=Math.floor(ds.sampleRate*.015);fs=ds.createBuffer(1,e,ds.sampleRate);let t=fs.getChannelData(0);for(let n=0;n<e;n++)t[n]=(Math.random()*2-1)*(1-n/e)**2}let e=ds.createBufferSource();e.buffer=fs;let t=ds.createBiquadFilter();t.type=`lowpass`,t.frequency.value=2500;let n=ds.createGain();n.gain.value=.15,e.connect(t).connect(n).connect(ds.destination),e.start()}catch{}}var ms=class{available=!1;timer=null;voice=null;constructor(){if(typeof speechSynthesis>`u`)return;let e=()=>{this.voice=speechSynthesis.getVoices().find(e=>e.lang.toLowerCase().startsWith(`hu`))??null,this.available=!!this.voice};e(),speechSynthesis.addEventListener?.(`voiceschanged`,e)}start(e,t){if(this.stop(),typeof speechSynthesis>`u`)return;let n=6e4/Math.min(150,Math.max(60,t)),r=[...e],i=0,a=()=>{i>=r.length?this.timer=null:(this.speak(r[i++]),this.timer=setTimeout(a,n))};a()}speak(e){if(e===` `)return;let t=ja[e.toLowerCase()]??e;speechSynthesis.speaking&&speechSynthesis.cancel();let n=new SpeechSynthesisUtterance(t);n.lang=`hu-HU`,n.rate=1.3,this.voice&&(n.voice=this.voice),speechSynthesis.speak(n)}stop(){this.timer&&clearTimeout(this.timer),this.timer=null,typeof speechSynthesis<`u`&&speechSynthesis.cancel()}},hs=`<?xml version="1.0" encoding="UTF-8" standalone="no"?>
<svg
   width="830"
   height="340"
   viewBox="0 0 830 340"
   version="1.1"
   id="svg79"
   sodipodi:docname="abc_jav.svg"
   inkscape:version="1.3 (0e150ed6c4, 2023-07-21)"
   xmlns:inkscape="http://www.inkscape.org/namespaces/inkscape"
   xmlns:sodipodi="http://sodipodi.sourceforge.net/DTD/sodipodi-0.dtd"
   xmlns="http://www.w3.org/2000/svg"
   xmlns:svg="http://www.w3.org/2000/svg">
  <defs
     id="defs79" />
  <sodipodi:namedview
     id="namedview79"
     pagecolor="#ffffff"
     bordercolor="#999999"
     borderopacity="1"
     inkscape:showpageshadow="2"
     inkscape:pageopacity="0"
     inkscape:pagecheckerboard="0"
     inkscape:deskcolor="#d1d1d1"
     inkscape:zoom="1"
     inkscape:cx="600"
     inkscape:cy="200"
     inkscape:window-width="1920"
     inkscape:window-height="1009"
     inkscape:window-x="-8"
     inkscape:window-y="-8"
     inkscape:window-maximized="1"
     inkscape:current-layer="svg79" />
  <style
     id="style1">
		.key {
			rx: 8;
			ry: 8;
			stroke-width: 2;
		}
		.label {
			font-family: &quot;Arial&quot;, &quot;Helvetica&quot;, sans-serif;
			font-weight: bold;
			font-size: 16px;
			text-anchor: middle;
			dominant-baseline: middle;
			fill: #000000;
		}   
	 /* Ujjak szerinti színek */
	 
		.lpinky   { fill:#F2A63F; stroke:#C76F1F; }
		.lring    { fill:#A3D977; stroke:#7FBF5C; }
		.lmiddle  { fill:#6EC6E6; stroke:#4FA9C9; }
		.lindex   { fill:#F7E967; stroke:#D6C84F; }
		.rindex   { fill:#F7C948; stroke:#D6A837; }
		.rmiddle  { fill:#5EB6E6; stroke:#4FA9C9; }
		.rring    { fill:#83D957; stroke:#7FBF5C; }
		.rpinky   { fill:#F28C28; stroke:#C76F1F; }
		.thumb    { fill:#CCCCCC; stroke:#999999; }
	</style>
  <!-- Alap méretek -->
  <!-- base = 50x50, gap = 5, szélesebb: 1.5x=75, 2x=100, 3x=150, 4x=200, 6x=300 -->
  <!-- FELSŐ SOR: 0 1 2 3 4 5 6 7 8 9 ö ü ó Backspace -->
  <!-- x0 = 20 -->
  
  <rect x="5" y="5" width="810" height="320" fill="#EBEBEB" stroke="#171717" stroke-width="2" rx="5" ry="5" />
 

  <!-- Nagy enter, Á mellett ű -->
  <g
     id="g28">
    <path
       id="rect28"
       class="key rpinky"
	   
	   d="M 758,80
    h 34
    a 8,8 0 0 1 8,8
    v 94
    a 8,8 0 0 1 -8,8
    h -30
    a 2,8 0 0 1 -2,-8
    v -46
    a 8,8 0 0 0 -8,-8
	h -0
    a 2,8 0 0 1 -2,-8
    v -32
    a 8,8 0 0 1 8,-8
    Z" 
     />
	 
    <title
       id="title28">Jobb kisujj – Enter</title>
    <text
       class="label"
       x="775"
       y="105"
       id="text28">Enter</text>
  </g>
  
   <g
     id="g41">
    <rect
       class="key rpinky"
       x="705"
       y="140"
       width="50"
       height="50"
       id="rect41" />
    <title
       id="title41">Jobb kisujj – Ű</title>
    <text
       class="label"
       x="730"
       y="165"
       id="text41">Ű</text>
  </g> 

 <!-- Á mellett Enter felette Ű 
  <g
     id="g28">
    <rect
       id="rect28"
       class="key rpinky"
       x="705"
       y="140"
       width="95"
       height="50"
     />
    <title
       id="title28">Jobb kisujj – Enter</title>
    <text
       class="label"
       x="750"
       y="165"
       id="text28">Enter</text>
  </g> 
  
   <g
     id="g41">
    <rect
       class="key rpinky"
       x="750"
       y="80"
       width="50"
       height="50"
       id="rect41" />
    <title
       id="title41">Jobb kisujj – Ű</title>
    <text
       class="label"
       x="775"
       y="105"
       id="text41">Ű</text>
  </g> 
  
  Változatok vége --> 
  <g
     id="g1">
    <rect
       class="key lpinky"
       x="20"
       y="20"
       width="50"
       height="50"
       id="rect1" />
    <title
       id="title1">Bal kisujj – 0</title>
    <text
       class="label"
       x="45"
       y="45"
       id="text1">0</text>
  </g>
  <g
     id="g2">
    <rect
       class="key lpinky"
       x="75"
       y="20"
       width="50"
       height="50"
       id="rect2" />
    <title
       id="title2">Bal kisujj – 1</title>
    <text
       class="label"
       x="100"
       y="45"
       id="text2">1</text>
  </g>
  <g
     id="g3">
    <rect
       class="key lpinky"
       x="130"
       y="20"
       width="50"
       height="50"
       id="rect3" />
    <title
       id="title3">Bal kisujj – 2</title>
    <text
       class="label"
       x="155"
       y="45"
       id="text3">2</text>
  </g>
  <g
     id="g4">
    <rect
       class="key lring"
       x="185"
       y="20"
       width="50"
       height="50"
       id="rect4" />
    <title
       id="title4">Bal gyűrűsujj – 3</title>
    <text
       class="label"
       x="210"
       y="45"
       id="text4">3</text>
  </g>
  <g
     id="g5">
    <rect
       class="key lmiddle"
       x="240"
       y="20"
       width="50"
       height="50"
       id="rect5" />
    <title
       id="title5">Bal középsőujj – 4</title>
    <text
       class="label"
       x="265"
       y="45"
       id="text5">4</text>
  </g>
  <g
     id="g6">
    <rect
       class="key lindex"
       x="295"
       y="20"
       width="50"
       height="50"
       id="rect6" />
    <title
       id="title6">Bal mutatóujj – 5</title>
    <text
       class="label"
       x="320"
       y="45"
       id="text6">5</text>
  </g>
  <g
     id="g7">
    <rect
       class="key lindex"
       x="350"
       y="20"
       width="50"
       height="50"
       id="rect7" />
    <title
       id="title7">Bal mutatóujj – 6</title>
    <text
       class="label"
       x="375"
       y="45"
       id="text7">6</text>
  </g>
  <g
     id="g8">
    <rect
       class="key rindex"
       x="405"
       y="20"
       width="50"
       height="50"
       id="rect8" />
    <title
       id="title8">Jobb mutatóujj – 7</title>
    <text
       class="label"
       x="430"
       y="45"
       id="text8">7</text>
  </g>
  <g
     id="g9">
    <rect
       class="key rindex"
       x="460"
       y="20"
       width="50"
       height="50"
       id="rect9" />
    <title
       id="title9">Jobb mutatóujj – 8</title>
    <text
       class="label"
       x="485"
       y="45"
       id="text9">8</text>
  </g>
  <g
     id="g10">
    <rect
       class="key rmiddle"
       x="515"
       y="20"
       width="50"
       height="50"
       id="rect10" />
    <title
       id="title10">Jobb középsőujj – 9</title>
    <text
       class="label"
       x="540"
       y="45"
       id="text10">9</text>
  </g>
  <g
     id="g11">
    <rect
       class="key rring"
       x="570"
       y="20"
       width="50"
       height="50"
       id="rect11" />
    <title
       id="title11">Jobb gyűrűsujj – ö</title>
    <text
       class="label"
       x="595"
       y="45"
       id="text11">Ö</text>
  </g>
  <g
     id="g12">
    <rect
       class="key rpinky"
       x="625"
       y="20"
       width="50"
       height="50"
       id="rect12" />
    <title
       id="title12">Jobb kisujj – ü</title>
    <text
       class="label"
       x="650"
       y="45"
       id="text12">Ü</text>
  </g>
  <g
     id="g13">
    <rect
       class="key rpinky"
       x="680"
       y="20"
       width="50"
       height="50"
       id="rect13" />
    <title
       id="title13">Jobb kisujj – ó</title>
    <text
       class="label"
       x="705"
       y="45"
       id="text13">Ó</text>
  </g>
  <!-- Jobb kisujj: Backspace (2x szélesség) -->
  <g
     id="g14">
    <rect
       class="key rpinky"
       x="735"
       y="20"
       width="65"
       height="50"
       id="rect14" />
    <title
       id="title14">Jobb kisujj – Backspace</title>
    <text
       class="label"
       x="767.2"
       y="45"
       id="text14">Bcksp</text>
  </g>
  <!-- MÁSODIK SOR: Tab, Q W E R T Z U I O P Ő Ú -->
  <!-- Tab: 1.5x -->
  <g
     id="g15">
    <rect
       class="key lpinky"
       x="20"
       y="80"
       width="65"
       height="50"
       id="rect15" />
    <title
       id="title15">Bal kisujj – Tab</title>
    <text
       class="label"
       x="51.5"
       y="105"
       id="text15">Tab</text>
  </g>
  <!-- Q W E R T Z – bal mutatóig -->
  <g
     id="g16">
    <rect
       class="key lpinky"
       x="90"
       y="80"
       width="50"
       height="50"
       id="rect16" />
    <title
       id="title16">Bal kisujj – Q</title>
    <text
       class="label"
       x="115"
       y="105"
       id="text16">Q</text>
  </g>
  <g
     id="g17">
    <rect
       class="key lring"
       x="145"
       y="80"
       width="50"
       height="50"
       id="rect17" />
    <title
       id="title17">Bal gyűrűsujj – W</title>
    <text
       class="label"
       x="170"
       y="105"
       id="text17">W</text>
  </g>
  <g
     id="g18">
    <rect
       class="key lmiddle"
       x="200"
       y="80"
       width="50"
       height="50"
       id="rect18" />
    <title
       id="title18">Bal középső ujj – E</title>
    <text
       class="label"
       x="225"
       y="105"
       id="text18">E</text>
  </g>
  <g
     id="g19">
    <rect
       class="key lindex"
       x="255"
       y="80"
       width="50"
       height="50"
       id="rect19" />
    <title
       id="title19">Bal mutatóujj – R</title>
    <text
       class="label"
       x="280"
       y="105"
       id="text19">R</text>
  </g>
  <g
     id="g20">
    <rect
       class="key lindex"
       x="310"
       y="80"
       width="50"
       height="50"
       id="rect20" />
    <title
       id="title20">Bal mutatóujj – T</title>
    <text
       class="label"
       x="335"
       y="105"
       id="text20">T</text>
  </g>
  <g
     id="g21">
    <rect
       class="key rindex"
       x="365"
       y="80"
       width="50"
       height="50"
       id="rect21" />
    <title
       id="title21">Jobb mutatóujj – Z</title>
    <text
       class="label"
       x="390"
       y="105"
       id="text21">Z</text>
  </g>
  <g
     id="g22">
    <rect
       class="key rindex"
       x="420"
       y="80"
       width="50"
       height="50"
       id="rect22" />
    <title
       id="title22">Jobb mutatóujj – U</title>
    <text
       class="label"
       x="445"
       y="105"
       id="text22">U</text>
  </g>
  <g
     id="g23">
    <rect
       class="key rmiddle"
       x="475"
       y="80"
       width="50"
       height="50"
       id="rect23" />
    <title
       id="title23">Jobb középsőujj – I</title>
    <text
       class="label"
       x="500"
       y="105"
       id="text23">I</text>
  </g>
  <g
     id="g24">
    <rect
       class="key rring"
       x="530"
       y="80"
       width="50"
       height="50"
       id="rect24" />
    <title
       id="title24">Jobb gyűrűsujj – O</title>
    <text
       class="label"
       x="555"
       y="105"
       id="text24">O</text>
  </g>
  <g
     id="g25">
    <rect
       class="key rpinky"
       x="585"
       y="80"
       width="50"
       height="50"
       id="rect25" />
    <title
       id="title25">Jobb kisujj – P</title>
    <text
       class="label"
       x="610"
       y="105"
       id="text25">P</text>
  </g>
  <g
     id="g26">
    <rect
       class="key rpinky"
       x="640"
       y="80"
       width="50"
       height="50"
       id="rect26" />
    <title
       id="title26">Jobb kisujj – Ő</title>
    <text
       class="label"
       x="665"
       y="105"
       id="text26">Ő</text>
  </g>
  <g
     id="g27">
    <rect
       class="key rpinky"
       x="695"
       y="80"
       width="50"
       height="50"
       id="rect27" />
    <title
       id="title27">Jobb kisujj – Ú</title>
    <text
       class="label"
       x="720"
       y="105"
       id="text27">Ú</text>
  </g>

  <!-- HARMADIK SOR: Caps, A S D F G H J K L É Á Ű -->
  <!-- Caps Lock: 1.5x -->
  <g
     id="g29">
    <rect
       class="key lpinky"
       x="20"
       y="140"
       width="75"
       height="50"
       id="rect29" />
    <title
       id="title29">Bal kisujj – Caps Lock</title>
    <text
       class="label"
       x="57.5"
       y="165"
       id="text29">Caps</text>
  </g>
  <g
     id="g30">
    <rect
       class="key lpinky"
       x="100"
       y="140"
       width="50"
       height="50"
       id="rect30" />
    <title
       id="title30">Bal kisujj – A</title>
    <text
       class="label"
       x="125"
       y="165"
       id="text30">A</text>
  </g>
  <g
     id="g31">
    <rect
       class="key lring"
       x="155"
       y="140"
       width="50"
       height="50"
       id="rect31" />
    <title
       id="title31">Bal gyűrűsujj – S</title>
    <text
       class="label"
       x="180"
       y="165"
       id="text31">S</text>
  </g>
  <g
     id="g32">
    <rect
       class="key lmiddle"
       x="210"
       y="140"
       width="50"
       height="50"
       id="rect32" />
    <title
       id="title32">Bal középsőujj – D</title>
    <text
       class="label"
       x="235"
       y="165"
       id="text32">D</text>
  </g>
  <g
     id="g33">
    <rect
       class="key lindex"
       x="265"
       y="140"
       width="50"
       height="50"
       id="rect33" />
    <title
       id="title33">Bal mutatóujj – F</title>
    <text
       class="label"
       x="290"
       y="165"
       id="text33">F</text>
  </g>
  <g
     id="g34">
    <rect
       class="key lindex"
       x="320"
       y="140"
       width="50"
       height="50"
       id="rect34" />
    <title
       id="title34">Bal mutatóujj – G</title>
    <text
       class="label"
       x="345"
       y="165"
       id="text34">G</text>
  </g>
  <g
     id="g35">
    <rect
       class="key rindex"
       x="375"
       y="140"
       width="50"
       height="50"
       id="rect35" />
    <title
       id="title35">Jobb mutatóujj – H</title>
    <text
       class="label"
       x="400"
       y="165"
       id="text35">H</text>
  </g>
  <g
     id="g36">
    <rect
       class="key rindex"
       x="430"
       y="140"
       width="50"
       height="50"
       id="rect36" />
    <title
       id="title36">Jobb mutatóujj ujj – J</title>
    <text
       class="label"
       x="455"
       y="165"
       id="text36">J</text>
  </g>
  <g
     id="g37">
    <rect
       class="key rmiddle"
       x="485"
       y="140"
       width="50"
       height="50"
       id="rect37" />
    <title
       id="title37">Jobb mutatóujj – K</title>
    <text
       class="label"
       x="510"
       y="165"
       id="text37">K</text>
  </g>
  <g
     id="g38">
    <rect
       class="key rring"
       x="540"
       y="140"
       width="50"
       height="50"
       id="rect38" />
    <title
       id="title38">Jobb gyűrűsujj – L</title>
    <text
       class="label"
       x="565"
       y="165"
       id="text38">L</text>
  </g>
  <g
     id="g39">
    <rect
       class="key rpinky"
       x="595"
       y="140"
       width="50"
       height="50"
       id="rect39" />
    <title
       id="title39">Jobb kisujj – É</title>
    <text
       class="label"
       x="620"
       y="165"
       id="text39">É</text>
  </g>
  <g
     id="g40">
    <rect
       class="key rpinky"
       x="650"
       y="140"
       width="50"
       height="50"
       id="rect40" />
    <title
       id="title40">Jobb kisujj – Á</title>
    <text
       class="label"
       x="675"
       y="165"
       id="text40">Á</text>
  </g>

  <!-- NEGYEDIK SOR: Shift, Í Y X C V B N M , . - Shift -->
  <!-- Bal Shift: 2x -->
  <g
     id="g42">
    <rect
       class="key lpinky"
       x="20"
       y="200"
       width="50"
       height="50"
       id="rect42"/>
    <title
       id="title54-4">Bal kisujj – Shift</title>
    <text
       class="label"
       x="45"
       y="225"
       id="text42">Shift</text>
  </g>

  <g
     id="g43">
    <rect
       class="key lpinky"
       x="75"
       y="200"
       width="50"
       height="50"
       id="rect43" />
    <title
       id="title43">Bal kisujj – Í</title>
    <text
       class="label"
       x="100"
       y="225"
       id="text43">Í</text>
  </g>
  <g
     id="g44">
    <rect
       class="key lpinky"
       x="130"
       y="200"
       width="50"
       height="50"
       id="rect44" />
    <title
       id="title44">Bal kisujj – Y</title>
    <text
       class="label"
       x="155"
       y="225"
       id="text44">Y</text>
  </g>
  <g
     id="g45">
    <rect
       class="key lring"
       x="185"
       y="200"
       width="50"
       height="50"
       id="rect45" />
    <title
       id="title45">Bal gyűrűsujj – X</title>
    <text
       class="label"
       x="210"
       y="225"
       id="text45">X</text>
  </g>
  <g
     id="g46">
    <rect
       class="key lmiddle"
       x="240"
       y="200"
       width="50"
       height="50"
       id="rect46" />
    <title
       id="title46">Bal középsőujj – C</title>
    <text
       class="label"
       x="265"
       y="225"
       id="text46">C</text>
  </g>
  <g
     id="g47">
    <rect
       class="key lindex"
       x="295"
       y="200"
       width="50"
       height="50"
       id="rect47" />
    <title
       id="title47">Bal mutatóujj – V</title>
    <text
       class="label"
       x="320"
       y="225"
       id="text47">V</text>
  </g>
  <g
     id="g48">
    <rect
       class="key lindex"
       x="350"
       y="200"
       width="50"
       height="50"
       id="rect48" />
    <title
       id="title48">Bal mutatóujj – B</title>
    <text
       class="label"
       x="375"
       y="225"
       id="text48">B</text>
  </g>
  <g
     id="g49">
    <rect
       class="key rindex"
       x="405"
       y="200"
       width="50"
       height="50"
       id="rect49" />
    <title
       id="title49">Jobb mutatóujj – N</title>
    <text
       class="label"
       x="430"
       y="225"
       id="text49">N</text>
  </g>
  <g
     id="g50">
    <rect
       class="key rindex"
       x="460"
       y="200"
       width="50"
       height="50"
       id="rect50" />
    <title
       id="title50">Jobb mutatóujj – M</title>
    <text
       class="label"
       x="485"
       y="225"
       id="text50">M</text>
  </g>
  <g
     id="g51">
    <rect
       class="key rmiddle"
       x="515"
       y="200"
       width="50"
       height="50"
       id="rect51" />
    <title
       id="title51">Jobb középsőujj – ,</title>
    <text
       class="label"
       x="540"
       y="225"
       id="text51">,</text>
  </g>
  <g
     id="g52">
    <rect
       class="key rring"
       x="570"
       y="200"
       width="50"
       height="50"
       id="rect52" />
    <title
       id="title52">Jobb gyűrűsujj – .</title>
    <text
       class="label"
       x="595"
       y="225"
       id="text52">.</text>
  </g>
  <g
     id="g53">
    <rect
       class="key rpinky"
       x="625"
       y="200"
       width="50"
       height="50"
       id="rect53" />
    <title
       id="title53">Jobb kisujj – -</title>
    <text
       class="label"
       x="650"
       y="225"
       id="text53">-</text>
  </g>
  <!-- Jobb Shift: 2x -->
  <g
     id="g54">
    <rect
       class="key rpinky"
       x="680"
       y="200"
       width="100"
       height="50"
       id="rect54" />
    <title
       id="title54">Jobb kisujj – Shift</title>
    <text
       class="label"
       x="730"
       y="225"
       id="text54">Shift</text>
  </g>
  <!-- ALSÓ SOR: Ctrl, Win, Alt, Space, AltGr, Win, Menu, Ctrl -->
  <g
     id="g55">
    <rect
       class="key lpinky"
       x="20"
       y="260"
       width="50"
       height="50"
       id="rect55" />
    <title
       id="title55">Bal kisujj – Ctrl</title>
    <text
       class="label"
       x="45.171875"
       y="285"
       id="text55">Ctrl</text>
  </g>
  <g
      id="g60">
    <rect
       class="key lpinky"
       x="75"
       y="260"
       width="50"
       height="50"
       id="rect60" />
    <title
       id="title60">Bal kisujj – Win</title>
    <text
       class="label"
       x="100"
       y="285"
       id="text60">Fn</text>
  </g>
  <g
     id="g56">
    <rect
       class="key lring"
       x="130"
       y="260"
       width="50"
       height="50"
       id="rect56" />
    <title
       id="title56">Bal gyűrűsujj – Win</title>
    <text
       class="label"
       x="155"
       y="285"
       id="text56">Win</text>
  </g>
  <g
     id="g57">
    <rect
       class="key thumb"
       x="185"
       y="260"
       width="50"
       height="50"
       id="rect57" />
    <title
       id="title57">Hüvelykujj – Alt</title>
    <text
       class="label"
       x="210"
       y="285"
       id="text57">Alt</text>
  </g>
  <!-- Space: 5x -->
  <g
     id="g58">
    <rect
       class="key thumb"
       x="240"
       y="260"
       width="270"
       height="50"
       id="rect58" />
    <title
       id="title58">Hüvelykujj – Szóköz</title>
    <text
       class="label"
       x="375"
       y="285"
       id="text58">Space</text>
  </g>
  <g
     id="g59">
    <rect
       class="key thumb"
       x="515"
       y="260"
       width="50"
       height="50"
       id="rect59" />
    <title
       id="title59">Hüvelykujj – AltGr</title>
    <text
       class="label"
       x="540"
       y="285"
       id="text59">AltGr</text>
  </g>

  <g
     id="g61">
    <rect
       class="key rpinky"
       x="570"
       y="260"
       width="50"
       height="50"
       id="rect61" />
    <title
       id="title61">Jobb kisujj – Menu</title>
    <text
       class="label"
       x="595"
       y="285"
       id="text61">Menu</text>
  </g>
  <g
     id="g62">
    <rect
       class="key rpinky"
       x="625"
       y="260"
       width="75"
       height="50"
       id="rect62" />
    <title
       id="title62">Jobb kisujj – Ctrl</title>
    <text
       class="label"
       x="662.5"
       y="285"
       id="text62">Ctrl</text>
  </g>
  

</svg>
`,gs=q(`<div class="kb svelte-1dlz8xf" aria-hidden="true"></div>`);function _s(e,t){it(t,!0);let n=ha(t,`highlight`,3,null),r=ha(t,`heat`,3,null),i=ha(t,`home`,3,!1),a,o=new Map,s=hs.replace(/<\?xml[^>]*>/,``).replace(/<sodipodi:namedview[\s\S]*?\/>/,``);Mn(()=>{o.clear();for(let e of a.querySelectorAll(`g`)){let t=e.querySelector(`text`)?.textContent?.trim();if(!t)continue;let n=t===`Bcksp`?`Backspace`:t;o.has(n)||o.set(n,[]),o.get(n).push(e)}}),Mn(()=>{for(let e of o.values())for(let t of e)t.classList.remove(`next`,`home`);if(i())for(let e of[`A`,`S`,`D`,`F`,`J`,`K`,`L`,`É`,`Space`])o.get(e)?.forEach(e=>e.classList.add(`home`));if(n()){let e=Ea(n());if(e&&o.get(e)?.forEach(e=>e.classList.add(`next`)),Oa(n())){let e=Da(n())?.startsWith(`l`),t=o.get(`Shift`)??[];(e?t[t.length-1]:t[0])?.classList.add(`next`)}}}),Mn(()=>{for(let[e,t]of o)for(let n of t){let t=n.querySelector(`rect, path`);if(t){if(r()&&e in r()){let n=Math.max(0,Math.min(1,r()[e]));t.style.fill=`hsl(${120-120*n} 70% ${85-30*n}%)`}else r()?t.style.fill=`#f1f1f1`:t.style.fill=``}}});var c=gs();bi(c,()=>s,!0),A(c),ua(c,e=>a=e,()=>a),J(e,c),at()}var vs=q(`<p class="svelte-1x08you">Nincs ilyen lecke. <a href="#/" class="svelte-1x08you">Vissza a leckékhez</a></p>`),ys=q(`<h1 class="svelte-1x08you">Ujjtorna – bemelegítés</h1> <p class="svelte-1x08you">Gépelés előtt mindig melegítse be a kezét! Masszírozza át röviden a tenyerét és az ujjait, majd végezze el a két gyakorlatot.</p> <div class="ex svelte-1x08you"><img src="./ujjimg/ujj_01.png" alt="Az első ujjgyakorlat" class="svelte-1x08you"/> <p class="svelte-1x08you"><b class="svelte-1x08you">1. gyakorlat.</b> Kiinduló tartás. Feszítsük ki tenyerünket és ujjainkat, amennyire csak tudjuk! Ujjaink szorosan tapadjanak egymáshoz! Erősen hajlítsuk be ujjainkat! Csuklóból feszítsük előre, majd hátra kezefejünket! A gyakorlatot mindkét kezünkkel tízszer végezzük el!</p></div> <div class="ex svelte-1x08you"><img src="./ujjimg/ujj_02.png" alt="A második ujjgyakorlat" class="svelte-1x08you"/> <p class="svelte-1x08you"><b class="svelte-1x08you">2. gyakorlat.</b> Feszítsük ki tenyerünket és ujjainkat, amennyire csak tudjuk! Hajlítsuk jobb, majd bal oldalra kezünk fejét! A gyakorlatot mindkét kezünkkel tízszer végezzük el!</p></div> <p class="svelte-1x08you"><button class="svelte-1x08you">Tovább</button> <span class="muted svelte-1x08you">vagy nyomja meg az Entert</span></p>`,1),bs=q(`<ul class="posture svelte-1x08you"><li class="svelte-1x08you">Üljön egyenesen, a lába legyen a földön, a keze könnyedén a billentyűzeten.</li> <li class="svelte-1x08you">Mind a nyolc ujját helyezze az alaptartás billentyűire: bal kéz <b class="svelte-1x08you">A S D F</b>, jobb kéz <b class="svelte-1x08you">J K L É</b>.</li> <li class="svelte-1x08you">A hüvelykujjait tartsa könnyedén a szóköz felett.</li> <li class="svelte-1x08you">Az <b class="svelte-1x08you">F</b> és a <b class="svelte-1x08you">J</b> billentyűn kis kiemelkedés van: erről tapintással is megtalálja az alaptartást.</li></ul>`),xs=q(`<p class="svelte-1x08you">Az ujjai álljanak az alaptartás billentyűin (<b class="svelte-1x08you">A S D F</b> – <b class="svelte-1x08you">J K L É</b>), a hüvelykujjai a szóköz felett; tapintsa meg az <b class="svelte-1x08you">F</b> és <b class="svelte-1x08you">J</b> kiemelkedését.</p>`),Ss=q(`<h1 class="svelte-1x08you"> </h1> <!> <p class="big warn svelte-1x08you">Ne nézzen a billentyűzetre!</p> <!> <div class="newkeys svelte-1x08you"><img src="./img/ASDFJKLE.svg" alt="Az alaptartás billentyűi" class="svelte-1x08you"/> <p class="svelte-1x08you">Ebben a leckében: <b class="mono svelte-1x08you"> </b></p></div> <p class="svelte-1x08you"><button class="svelte-1x08you">Tovább</button> <span class="muted svelte-1x08you">vagy nyomja meg az Entert</span></p>`,1),Cs=q(`<span class="muted svelte-1x08you"> </span> <span class="stars svelte-1x08you"> </span>`,1),ws=q(`<li class="svelte-1x08you"><button class="secondary svelte-1x08you"> </button> <!></li>`),Ts=q(`<h1 class="svelte-1x08you">Lépés választása</h1> <ol class="picklist svelte-1x08you"></ol> <p class="svelte-1x08you"><button class="link svelte-1x08you">Vissza</button> <span class="muted svelte-1x08you">(Esc)</span></p>`,1),Es=q(`<p class="svelte-1x08you"> </p>`),Ds=q(`<div class="panel svelte-1x08you"><!> <p class="muted svelte-1x08you">Az első betű leütésével indul a gyakorlat. <button class="link svelte-1x08you">Lépés választása</button></p></div>`),Os=q(`<p class="error svelte-1x08you">Nincs magyar felolvasóhang a böngészőben.</p>`),ks=q(`<span> </span>`),As=q(`<div></div>`),js=q(`<h2 class="svelte-1x08you"> </h2> <!> <!> <div class="text mono svelte-1x08you" aria-label="Gépelendő szöveg"></div> <div class="live svelte-1x08you"><span class="svelte-1x08you">Pontosság: <b class="svelte-1x08you"> </b></span> <span class="svelte-1x08you">Sebesség: <b class="svelte-1x08you"> </b> leütés/perc</span> <span class="svelte-1x08you">Haladás: <b class="svelte-1x08you"> </b> leütés</span></div> <!>`,1),Ms=q(`<p class="error svelte-1x08you"> </p>`),Ns=q(`<h2 class="svelte-1x08you"> </h2> <div class="card result svelte-1x08you"><div class="stars big svelte-1x08you"> </div> <p class="svelte-1x08you">Pontosság: <b class="svelte-1x08you"> </b> · Sebesség: <b class="svelte-1x08you"> </b> </p> <p class="muted svelte-1x08you"> </p> <!></div> <p class="svelte-1x08you"><button class="svelte-1x08you"> </button> <span class="muted svelte-1x08you">Enter: tovább</span> · <button class="secondary svelte-1x08you">Újra</button> <span class="muted svelte-1x08you">R: újra</span></p>`,1),Ps=q(`<h1 class="svelte-1x08you">Lazítás</h1> <div class="ex svelte-1x08you"><img src="./ujjimg/ujj_11.png" alt="Lazító gyakorlat" class="svelte-1x08you"/> <p class="svelte-1x08you">Laza kézzel körözzünk csuklóból, ujjainkat ne hajlítsuk! A gyakorlatot mindkét kezünkkel tízszer végezzük el!</p></div> <div class="ex svelte-1x08you"><img src="./ujjimg/ujj_12.png" alt="Lazító gyakorlat" class="svelte-1x08you"/> <p class="svelte-1x08you">Mozgassuk a tenyerünket csuklóból föl és le, tízszer!</p></div> <p class="svelte-1x08you"><button class="svelte-1x08you">Tovább</button> <span class="muted svelte-1x08you">vagy nyomja meg az Entert</span></p>`,1),Fs=q(`<tr class="svelte-1x08you"><td class="svelte-1x08you"> </td><td class="svelte-1x08you"> </td><td class="svelte-1x08you"> </td><td class="stars svelte-1x08you"> </td></tr>`),Is=q(`<div class="card result svelte-1x08you"><div class="stars big svelte-1x08you"> </div> <p class="svelte-1x08you">Pontosság: <b class="svelte-1x08you"> </b> · Sebesség: <b class="svelte-1x08you"> </b> </p></div> <div class="table-wrap svelte-1x08you"><table class="svelte-1x08you"><thead class="svelte-1x08you"><tr class="svelte-1x08you"><th class="svelte-1x08you">Lépés</th><th class="svelte-1x08you">Pontosság</th><th class="svelte-1x08you">Leütés/perc</th><th class="svelte-1x08you">Csillag</th></tr></thead><tbody class="svelte-1x08you"></tbody></table></div>`,1),Ls=q(`<p class="muted svelte-1x08you">Ebben a körben nem készült el lépés.</p>`),Rs=q(`<p class="unlock svelte-1x08you"><a class="btn big svelte-1x08you" href="#/jatek/betueso">Megnyílt a Betűeső játék!</a></p>`),zs=q(`<p class="svelte-1x08you"><b class="svelte-1x08you">A lecke teljesítve!</b></p> <!>`,1),Bs=q(`<p class="muted svelte-1x08you"> </p>`),Vs=q(`<h1 class="svelte-1x08you">A lecke értékelése</h1> <!> <!> <p class="svelte-1x08you"><a class="btn secondary svelte-1x08you" href="#/">Vissza a leckékhez</a> <span class="muted svelte-1x08you">Enter</span></p>`,1),Hs=q(`<div class="bar svelte-1x08you"><span class="muted svelte-1x08you"> </span> <a href="#/" class="svelte-1x08you">× Kilépés</a></div> <!>`,1);function Us(e,t){it(t,!0);let n=ha(t,`id`,3,``),r=Go(n()),i=r?.steps.length??0,a=N(()=>$.progress.settings),o=new ms;function s(){let e=$.progress.lessons[n()];for(let t=0;t<i;t++){let n=e?.steps[t];if(!n||n.accuracy<90)return t}return 0}let c=F(`warmup`),l=F(L(s())),u=F(null),d=F(0),f=F(null),p=F(!1),m=L({}),h=F(!!$.progress.lessons[n()]?.completed),g=N(()=>r?.steps[G(l)]),_=n()===`l01`||n()===`l02`,v=N(()=>{let e=Wo.findIndex(e=>e.id===n());return e>=0?Wo[e+1]:void 0});Mn(()=>()=>o.stop());function y(){o.stop(),ba(`/`)}function b(e){o.stop(),I(l,e,!0),I(u,new Ma(r.steps[e].lines,{allowBackspace:$.settings.allowBackspace})),cn(d),I(f,null),I(p,G(a).dictation&&!o.available,!0),I(c,`step`)}function x(){_?I(c,`intro`):b(G(l))}async function S(){o.stop();let e=G(u),t=e.result();if(I(f,t,!0),m[G(l)]=t,I(c,`result`),t.strokes>0){let{lessonJustCompleted:r}=await us(n(),G(l),i,e.log,t);r&&I(h,!0)}}function C(){G(l)+1<i?b(G(l)+1):I(c,`cooldown`)}function w(e){if(r){if(e.key===`Escape`)e.preventDefault(),G(c)===`pick`?I(c,`step`):y();else if(e.repeat)G(c)===`step`&&e.preventDefault();else switch(G(c)){case`warmup`:e.key===`Enter`&&(e.preventDefault(),x());break;case`intro`:e.key===`Enter`&&(e.preventDefault(),b(G(l)));break;case`cooldown`:e.key===`Enter`&&(e.preventDefault(),I(c,`summary`));break;case`summary`:e.key===`Enter`&&(e.preventDefault(),y());break;case`result`:e.key===`Enter`?(e.preventDefault(),C()):(e.key===`r`||e.key===`R`)&&(e.preventDefault(),b(G(l)));break;case`step`:{let t=G(u);if(t.done||!t.handleKey(e))return;e.preventDefault(),e.key.length===1&&G(a).clickSound&&ps(),cn(d),t.log.length===1&&G(a).dictation&&e.key.length===1&&o.start(t.text.slice(t.pos),G(a).tempo),t.done&&S();break}}}}let T=e=>`★`.repeat(e)+`☆`.repeat(3-e),E=N(()=>(G(d),G(u)?G(u).result():null)),D=N(()=>(G(d),G(u)&&!G(u).done?G(u).where():null)),ee=N(()=>(G(d),G(u)?.expected??null)),te=N(()=>(G(d),G(u)?.pos??0));function ne(e,t){G(d);let n=G(u),r=e+t;return n.marks[r]===!0?`ok`:n.marks[r]===!1?`bad`:r===n.pos?`cur`:``}let re=N(()=>{let e=Object.values(m),t=e.reduce((e,t)=>e+t.strokes,0),n=e.reduce((e,t)=>e+t.errors,0),r=e.reduce((e,t)=>e+t.activeMs,0),i=t?Math.round((t-n)/t*1e3)/10:0;return{strokes:t,accuracy:i,lpm:r>0?Math.round((t-e.length)/(r/6e4)):0,stars:Na(i),n:e.length}}),ie=N(()=>$.progress.lessons[n()]);var ae=$r();Ur(`keydown`,pn,w);var oe=z(ae),se=e=>{J(e,vs())},ce=e=>{var t=Hs(),o=z(t),s=R(o),d=B(s),_=V(s,2);A(o);var S=V(o,2),w=e=>{var t=ys(),n=V(z(t),8),r=R(n);j(2),A(n),K(`click`,r,x),J(e,t)},ae=e=>{var t=Ss(),i=z(t),a=B(i,!0),o=V(i,2),s=e=>{J(e,bs())},c=e=>{J(e,xs())};X(o,e=>{n()===`l01`?e(s):e(c,-1)});var u=V(o,4);_s(u,{home:!0});var d=V(u,2),f=V(R(d),2),p=B(V(R(f)),!0);A(f),A(d);var m=V(d,2),h=R(m);j(2),A(m),H(()=>{Y(a,n()===`l01`?`Az alaptartás`:`Emlékeztető`),Y(p,r.newKeys)}),K(`click`,h,()=>b(G(l))),J(e,t)},oe=e=>{var t=Ts(),n=V(z(t),2);Z(n,21,()=>r.steps,di,(e,t,n)=>{let r=N(()=>G(ie)?.steps[n]);var i=ws(),a=R(i),o=B(a),s=V(a,2),c=e=>{var t=Cs(),n=z(t),i=B(n),a=B(V(n,2),!0);H((e,t)=>{Y(i,`${e??``}% · ${G(r).lpm??``} leütés/perc`),Y(a,t)},[()=>Ho(G(r).accuracy),()=>T(G(r).stars)]),J(e,t)};X(s,e=>{G(r)&&e(c)}),A(i),H(()=>Y(o,`${n+1}. ${G(t).section??``}`)),K(`click`,a,()=>b(n)),J(e,i)}),A(n);var i=V(n,2),a=R(i);j(2),A(i),K(`click`,a,()=>I(c,`step`)),J(e,t)},se=e=>{var t=js(),n=z(t),r=B(n),o=V(n,2),s=e=>{var t=Ds(),n=R(t);Z(n,17,()=>G(g).instructions,di,(e,t)=>{var n=Es(),r=B(n,!0);H(()=>Y(r,G(t))),J(e,n)});var r=V(n,2),i=V(R(r));A(r),A(t),K(`click`,i,()=>I(c,`pick`)),J(e,t)};X(o,e=>{G(te)===0&&e(s)});var d=V(o,2),f=e=>{J(e,Os())};X(d,e=>{G(p)&&e(f)});var m=V(d,2);Z(m,21,()=>G(u).lines,di,(e,t,n)=>{var r=As();let i;Z(r,21,()=>[...G(t)],di,(e,t,r)=>{var i=ks(),a=B(i,!0);H(e=>{ji(i,1,e,`svelte-1x08you`),Y(a,G(t))},[()=>Ti(ne(G(u).lineStarts[n],r))]),J(e,i)}),A(r),H(()=>i=ji(r,1,`line svelte-1x08you`,null,i,{active:G(D)?.line===n})),J(e,r)}),A(m);var h=V(m,2),_=R(h),v=B(V(R(_)),!0);A(_);var y=V(_,2),b=B(V(R(y)),!0);j(),A(y);var x=V(y,2),S=B(V(R(x)));j(),A(x),A(h);var C=V(h,2),w=e=>{_s(e,{get highlight(){return G(ee)}})};X(C,e=>{G(a).keyboard&&e(w)}),H(e=>{Y(r,`${G(l)+1}/${i??``}. lépés – ${G(g).section??``}`),Y(v,e),Y(b,G(E)&&G(E).lpm?G(E).lpm:`–`),Y(S,`${G(te)??``}/${G(u).text.length??``}`)},[()=>G(E)?.strokes?Ho(G(E).accuracy)+`%`:`–`]),J(e,t)},ce=e=>{var t=Ns(),n=z(t),r=B(n),a=V(n,2),o=R(a),s=B(o,!0),c=V(o,2),u=V(R(c)),d=B(u),p=V(u,2),m=B(p),h=V(p);A(c);var g=V(c,2),_=B(g),v=V(g,2),y=e=>{var t=Ms(),n=B(t);H(()=>Y(n,`A pontosság 90% alatt maradt, ezért érdemes megismételni a lépést. Ha mégis folytatná, azt is megteheti.`)),J(e,t)};X(v,e=>{G(f).accuracy<90&&e(y)}),A(a);var x=V(a,2),S=R(x),w=B(S,!0),E=V(S,4);j(2),A(x),H((e,t)=>{Y(r,`${G(l)+1}/${i??``}. lépés kész`),Y(s,e),Y(d,`${t??``}%`),Y(m,`${G(f).lpm??``} leütés/perc`),Y(h,` · ${G(f).errors??``} hiba`),Y(_,`Ritmus egyenletessége: ±${G(f).rhythmSd??``} ms`),Y(w,G(l)+1<i?`Tovább`:`Lazítás`)},[()=>T(G(f).stars),()=>Ho(G(f).accuracy)]),K(`click`,S,C),K(`click`,E,()=>b(G(l))),J(e,t)},le=e=>{var t=Ps(),n=V(z(t),6),r=R(n);j(2),A(n),K(`click`,r,()=>I(c,`summary`)),J(e,t)},ue=e=>{var t=Vs(),n=V(z(t),2),i=e=>{var t=Is(),n=z(t),i=R(n),a=B(i,!0),o=V(i,2),s=V(R(o)),c=B(s),l=V(s,2),u=B(l),d=V(l);A(o),A(n);var f=V(n,2),p=R(f),h=V(R(p));Z(h,21,()=>r.steps,di,(e,t,n)=>{let r=N(()=>m[n]);var i=$r(),a=z(i),o=e=>{var i=Fs(),a=R(i),o=B(a),s=V(a),c=B(s),l=V(s),u=B(l,!0),d=B(V(l),!0);A(i),H((e,i)=>{Y(o,`${n+1}. ${G(t).section??``}`),Y(c,`${e??``}%`),Y(u,G(r).lpm),Y(d,i)},[()=>Ho(G(r).accuracy),()=>T(G(r).stars)]),J(e,i)};X(a,e=>{G(r)&&e(o)}),J(e,i)}),A(h),A(p),A(f),H((e,t)=>{Y(a,e),Y(c,`${t??``}%`),Y(u,`${G(re).lpm??``} leütés/perc`),Y(d,` · ${G(re).strokes??``} leütés`)},[()=>T(G(re).stars),()=>Ho(G(re).accuracy)]),J(e,t)},a=e=>{J(e,Ls())};X(n,e=>{G(re).n?e(i):e(a,-1)});var o=V(n,2),s=e=>{var t=zs(),n=V(z(t),2),r=e=>{J(e,Rs())};X(n,e=>{G(v)?.kind===`game`&&e(r)}),J(e,t)},c=e=>{var t=Bs(),n=B(t);H(()=>Y(n,`A lecke teljesítéséhez minden lépést legalább 90%-os pontossággal kell elvégezni.`)),J(e,t)};X(o,e=>{G(h)?e(s):e(c,-1)}),j(2),J(e,t)};X(S,e=>{G(c)===`warmup`?e(w):G(c)===`intro`?e(ae,1):G(c)===`pick`?e(oe,2):G(c)===`step`&&G(u)&&G(g)?e(se,3):G(c)===`result`&&G(f)?e(ce,4):G(c)===`cooldown`?e(le,5):G(c)===`summary`&&e(ue,6)}),H(()=>Y(d,`${r.number??``}. lecke – ${r.subtitle??``}`)),K(`click`,_,e=>{e.preventDefault(),y()}),J(e,t)};X(oe,e=>{r?e(ce,-1):e(se)}),J(e,ae),at()}Wr([`click`]);var Ws=`modulepreload`,Gs=function(e,t){return new URL(e,t).href},Ks={},qs=function(e){return e.pathname.endsWith(`.css`)},Js=function(e,t,n){if(t in e)return e[t];let r=n();if(!r){e[t]=void 0;return}let i=r.then(()=>{e[t]=void 0},n=>{throw e[t]=void 0,n});return e[t]=i,i},Ys=function(e,t,n){let r=Promise.resolve();if(t&&t.length>0){let e,i=document.querySelector(`meta[property=csp-nonce]`),a=i?.nonce||i?.getAttribute(`nonce`);function o(e){return Promise.all(e.map(e=>Promise.resolve(e).then(e=>({status:`fulfilled`,value:e}),e=>({status:`rejected`,reason:e}))))}function s(e){return import.meta.resolve?new URL(import.meta.resolve(e)):new URL(e,import.meta.url)}r=o(t.map(t=>{t=Gs(t,n);let r=s(t),i=qs(r);return Js(Ks,r.href,()=>{if(e===void 0){e={all:new Set,styles:new Set};let t=document.getElementsByTagName(`link`);for(let n=t.length-1;n>=0;n--){let r=t[n];e.all.add(r.href),r.rel===`stylesheet`&&e.styles.add(r.href)}}if((i?e.styles:e.all).has(r.href))return;let t=document.createElement(`link`);if(t.rel=i?`stylesheet`:Ws,i||(t.as=`script`),t.crossOrigin=``,t.href=r.href,a&&t.setAttribute(`nonce`,a),document.head.appendChild(t),i)return new Promise((e,n)=>{let i=a=>{t.removeEventListener(`load`,i),t.removeEventListener(`error`,i),a.type===`error`?n(Error(`Unable to preload CSS for ${r}`)):e(a)};t.addEventListener(`load`,i),t.addEventListener(`error`,i)})})}).filter(e=>e!==void 0))}function i(e){let t=new Event(`vite:preloadError`,{cancelable:!0});if(t.payload=e,window.dispatchEvent(t),!t.defaultPrevented)throw e}return r.then(t=>{for(let e of t||[])e.status===`rejected`&&i(e.reason);return e().catch(i)})},Xs=[{id:`csecsemo`,name:`csecsemő`,multiplier:1,lpm:40,fallSec:24},{id:`kezdo`,name:`kezdő`,multiplier:2,lpm:80,fallSec:16},{id:`halado`,name:`haladó`,multiplier:3,lpm:120,fallSec:11},{id:`gyakorlott`,name:`gyakorlott`,multiplier:4,lpm:180,fallSec:8},{id:`profi`,name:`profi`,multiplier:5,lpm:250,fallSec:6.5}],Zs=960,Qs=600,$s=548,ec=36,tc=-30,nc=54,rc=`Cascadia Mono, Consolas, DejaVu Sans Mono, monospace`,ic=[15167313,16032353,2792847,5016534,10185681,14707098];function ac(e){return Xs.find(t=>t.id===e)??Xs[0]}function oc(e,t=30){let n=[...new Set(e.filter(e=>e.length>=2))],r=n.filter(e=>e.length>=4&&e.length<=6),i=n.filter(e=>e.length>=3&&e.length<=8),a=r.length>=8?r:i.length>=4?i:n.length?n:[`a`],o=[],s=[];for(;o.length<t;){s.length||(s=sc(a));let e=s.findIndex(e=>!o.length||e[0]!==o[o.length-1][0]);e<0&&(e=0),o.push(s.splice(e,1)[0])}return o}function sc(e){let t=[...e];for(let e=t.length-1;e>0;e--){let n=Math.floor(Math.random()*(e+1));[t[e],t[n]]=[t[n],t[e]]}return t}var cc=class{ctx=null;constructor(e){if(e)try{this.ctx=new(window.AudioContext||window.webkitAudioContext)}catch{this.ctx=null}}tone(e,t,n,r,i,a=0){let o=this.ctx;if(!o)return;o.state===`suspended`&&o.resume();let s=o.currentTime+a,c=o.createOscillator(),l=o.createGain();c.type=r,c.frequency.setValueAtTime(e,s),c.frequency.exponentialRampToValueAtTime(t,s+n),l.gain.setValueAtTime(1e-4,s),l.gain.exponentialRampToValueAtTime(i,s+.01),l.gain.exponentialRampToValueAtTime(1e-4,s+n),c.connect(l).connect(o.destination),c.start(s),c.stop(s+n+.02)}pop(){this.tone(520,880,.1,`sine`,.18),this.tone(880,1320,.12,`sine`,.12,.07)}error(){this.tone(200,150,.09,`triangle`,.07)}miss(){this.tone(260,120,.25,`sine`,.12)}end(){this.tone(523,523,.12,`sine`,.12),this.tone(659,659,.12,`sine`,.12,.12),this.tone(784,784,.22,`sine`,.12,.24)}close(){try{this.ctx?.close()}catch{}this.ctx=null}};function lc(e,t,n,r){let i=ac(t.level),a=oc(t.words);return class extends e.Scene{drops=[];target=null;spawned=0;nextIn=900;popped=0;missed=0;score=0;strokes=0;errors=0;elapsed=0;finished=!1;ended=!1;hud;clouds=[];constructor(){super(`betueso`)}create(){let e=this.textures.createCanvas(`sky`,Zs,Qs),t=e.getContext(),n=t.createLinearGradient(0,0,0,$s);n.addColorStop(0,`#7ec8f5`),n.addColorStop(1,`#e6f6ff`),t.fillStyle=n,t.fillRect(0,0,Zs,Qs),e.refresh(),this.add.image(0,0,`sky`).setOrigin(0,0).setDepth(0);for(let e=0;e<4;e++){let t=this.add.graphics().setDepth(1).setAlpha(.8);t.fillStyle(16777215,1),t.fillEllipse(0,0,130,38),t.fillEllipse(-30,-14,70,40),t.fillEllipse(24,-10,80,44),t.setPosition(Math.random()*Zs,80+e*110+Math.random()*30),this.clouds.push(t)}let a=this.add.graphics().setDepth(2);a.fillStyle(7126890,1),a.fillRect(0,$s,Zs,52),a.fillStyle(5152845,1),a.fillRect(0,$s,Zs,6),a.fillStyle(5811543,1);for(let e=12;e<Zs;e+=34)a.fillTriangle(e,$s,e+8,536,e+16,$s);this.add.rectangle(0,0,Zs,ec,2046807,.62).setOrigin(0,0).setDepth(20),this.hud=this.add.text(14,ec/2,``,{fontFamily:rc,fontSize:`20px`,color:`#ffffff`}).setOrigin(0,.5).setDepth(21),this.add.text(946,ec/2,`szint: ${i.name}`,{fontFamily:rc,fontSize:`20px`,color:`#cfe6fb`}).setOrigin(1,.5).setDepth(21),this.refreshHud(),r(this)}typeChar(e){if(this.ended)return;if(!this.target){let t=this.drops.filter(t=>!t.gone&&t.word[0]===e);if(!t.length){this.strokes++,this.errors++,n.error(),this.refreshHud();return}t.sort((e,t)=>t.c.y-e.c.y),this.setTarget(t[0])}let r=this.target,i=r.word[r.typed],a=e===i;this.strokes++,t.onStroke?.(i,e,a),a?(r.typed++,this.layout(r),r.typed>=r.word.length&&this.pop(r)):(this.errors++,n.error(),this.tweens.add({targets:r.c,x:r.c.x+6,duration:40,yoyo:!0,repeat:1}),r.rest.setColor(`#c0392b`),this.time.delayedCall(140,()=>{r.gone||r.rest.setColor(`#1f2a44`)})),this.refreshHud()}setTarget(e){this.target&&this.target.ring.setVisible(!1),this.target=e,e&&e.ring.setVisible(!0)}layout(e){e.done.setText(e.word.slice(0,e.typed)).setVisible(e.typed>0),e.rest.setText(e.word.slice(e.typed)),e.done.x=-e.width/2,e.rest.x=-e.width/2+(e.typed>0?e.done.width:0)}spawn(){let e=a[this.spawned],t={fontFamily:rc,fontSize:`30px`,fontStyle:`bold`,color:`#1f2a44`},n=this.add.text(0,0,e,t),r=n.width;n.destroy();let o=r+40,s=Zs/2,c=-1;for(let e=0;e<8;e++){let e=20+o/2+Math.random()*(920-o),t=this.drops.filter(e=>!e.gone&&e.c.y<110),n=t.length?Math.min(...t.map(t=>Math.abs(t.c.x-e)-(t.width+o)/2)):1e6;n>c&&(c=n,s=e)}let l=ic[this.spawned%ic.length],u=this.add.graphics();u.fillStyle(0,.12),u.fillRoundedRect(-o/2+2,-22,o,nc,nc/2),u.fillStyle(16777215,.96),u.fillRoundedRect(-o/2,-27,o,nc,nc/2),u.lineStyle(4,l,1),u.strokeRoundedRect(-o/2,-27,o,nc,nc/2),u.fillStyle(16777215,.9),u.fillEllipse(-o/2+22,-17,18,7);let d=this.add.graphics();d.lineStyle(6,16761856,1),d.strokeRoundedRect(-o/2-4,-31,o+8,62,31),d.setVisible(!1);let f=this.add.text(-r/2,0,``,{...t,color:`#15803d`}).setOrigin(0,.5).setVisible(!1),p=this.add.text(-r/2,0,e,t).setOrigin(0,.5),m={word:e,c:this.add.container(s,tc,[u,d,f,p]).setDepth(10),done:f,rest:p,ring:d,width:r,typed:0,gone:!1};this.drops.push(m),this.spawned++,this.nextIn=6e4*(e.length+1)/i.lpm,this.spawned>=30&&(this.finished=!0)}pop(e){e.gone=!0,this.target===e&&this.setTarget(null),this.popped++;let t=e.word.length*i.multiplier;this.score+=t,n.pop();let{x:r,y:a}=e.c;this.tweens.add({targets:e.c,scale:1.5,alpha:0,duration:220,onComplete:()=>e.c.destroy()});let o=[16761856,5016534,15167313,2792847,14707098];for(let e=0;e<12;e++){let t=e/12*Math.PI*2,n=this.add.circle(r,a,5+Math.random()*4,o[e%o.length]).setDepth(12);this.tweens.add({targets:n,x:r+Math.cos(t)*(50+Math.random()*30),y:a+Math.sin(t)*(40+Math.random()*25),alpha:0,scale:.2,duration:380,onComplete:()=>n.destroy()})}let s=this.add.text(r,a-10,`+${t}`,{fontFamily:rc,fontSize:`24px`,fontStyle:`bold`,color:`#fff6c4`,stroke:`#1f3b57`,strokeThickness:4}).setOrigin(.5).setDepth(13);this.tweens.add({targets:s,y:a-60,alpha:0,duration:700,onComplete:()=>s.destroy()}),this.refreshHud()}miss(e){e.gone=!0,this.target===e&&this.setTarget(null),this.missed++,n.miss();let t=e.c.x,r=this.add.ellipse(t,550,20,8,12597547,.7).setDepth(5);this.tweens.add({targets:r,scaleX:5,alpha:0,duration:600,onComplete:()=>r.destroy()}),this.tweens.add({targets:e.c,alpha:0,scaleY:.4,y:538,duration:250,onComplete:()=>e.c.destroy()}),this.refreshHud()}accuracy(){return this.strokes?Math.round((this.strokes-this.errors)/this.strokes*1e3)/10:100}refreshHud(){this.hud.setText(`Pontszám ${this.score}  Kipukkadt ${this.popped}/30  Elmaradt ${this.missed}  Pontosság ${Math.round(this.accuracy())}%`)}update(e,r){if(this.ended)return;let a=Math.min(r,100);this.elapsed+=a;for(let e of this.clouds)e.x+=a*.008,e.x>1060&&(e.x=-100);this.finished||(this.nextIn-=a,this.drops.some(e=>!e.gone)||(this.nextIn=Math.min(this.nextIn,600)),this.nextIn<=0&&this.spawn());let o=578/(i.fallSec*1e3);for(let e of this.drops)e.gone||(e.c.y+=o*a,e.c.y+nc/2>=$s&&this.miss(e));if(this.drops=this.drops.filter(e=>!e.gone),this.finished&&!this.drops.length&&!this.ended){this.ended=!0,n.end();let e=Math.max(this.elapsed,1)/6e4,r={score:this.score,popped:this.popped,missed:this.missed,total:30,keystrokes:this.strokes,errors:this.errors,accuracy:this.accuracy(),lpm:Math.round(this.strokes/e),durationMs:Math.round(this.elapsed)};this.time.delayedCall(700,()=>t.onEnd(r))}}}}async function uc(e,t){let n=await Ys(()=>import(`./phaser-5xbn0cVO.js`).then(e=>c(e.default,1)),[],import.meta.url),r=n.default??n,i=new cc(t.sound),a=null,o=!1,s=null,l={...t,onEnd:e=>{o||t.onEnd(e)}};return await new Promise(t=>{let n=lc(r,l,i,e=>{a=e,t()});s=new r.Game({type:r.AUTO,parent:e,width:Zs,height:Qs,backgroundColor:`#7ec8f5`,banner:!1,audio:{noAudio:!0},input:{keyboard:!1},scale:{mode:r.Scale.FIT,autoCenter:r.Scale.CENTER_HORIZONTALLY},scene:n})}),{typeChar(e){!o&&a&&a.typeChar(e)},destroy(){if(!o){o=!0,i.close();try{s?.destroy(!0)}catch{}}}}}var dc=q(`<div class="card locked svelte-gmkzdc"><h1>Betűeső</h1> <p>A játék az 1. lecke elvégzése után nyílik meg.</p> <p><a class="btn" href="#/">Vissza a leckékhez</a></p></div>`),fc=q(`<button type="button"><strong class="svelte-gmkzdc"> </strong> <span class="muted"> </span> <span class="muted"> </span></button>`),pc=q(`<option> </option>`),mc=q(`<h2>Szóanyag</h2> <select aria-label="Szóanyag"></select>`,1),hc=q(`<p class="error"> </p>`),gc=q(`<div class="card start svelte-gmkzdc"><h1>Betűeső</h1> <p>A szavak fentről hullanak. Gépelje be őket, mielőtt leérnek, így kipukkadnak. A játék nem gyorsul: a kiválasztott sebesség végig ugyanaz marad.</p> <h2>Válasszon sebességet</h2> <div class="levels svelte-gmkzdc"></div> <!> <p class="opts svelte-gmkzdc"><label><input type="checkbox"/> Hang</label></p> <p class="muted"> </p> <!> <p class="actions svelte-gmkzdc"><button type="button">Indítás (Enter)</button> <a class="btn secondary" href="#/">Vissza a leckékhez</a></p></div>`),_c=q(`<div class="stage svelte-gmkzdc"></div> <p class="muted hint svelte-gmkzdc"> </p>`,1),vc=q(`<p class="record svelte-gmkzdc">Új rekord!</p>`),yc=q(`<div class="card end svelte-gmkzdc"><h1> </h1> <!> <div class="figures svelte-gmkzdc"><div class="svelte-gmkzdc"><span class="big svelte-gmkzdc"> </span><span class="muted"> </span></div> <div class="svelte-gmkzdc"><span class="big svelte-gmkzdc"> </span><span class="muted">kipukkadt</span></div> <div class="svelte-gmkzdc"><span class="big svelte-gmkzdc"> </span><span class="muted">elmaradt</span></div> <div class="svelte-gmkzdc"><span class="big svelte-gmkzdc"> </span><span class="muted">pontosság</span></div> <div class="svelte-gmkzdc"><span class="big svelte-gmkzdc"> </span><span class="muted">leütés/perc</span></div></div> <p class="muted"> </p> <p class="actions svelte-gmkzdc"><button type="button">Újra (Enter)</button> <button type="button" class="secondary">Más szint vagy szóanyag</button> <a class="btn secondary" href="#/">Vissza a leckékhez</a></p></div>`);function bc(e,t){it(t,!0);let n=N(()=>Ko($.progress,`l01`)),r=N(()=>Uo.filter(e=>Ko($.progress,e.id))),i=F(`start`),a=F(`csecsemo`),o=F(L([...Uo].reverse().find(e=>Ko($.progress,e.id))?.id??`l01`)),s=F(L($.progress.settings.gameSound)),c=F(null),l=F(!1),u=F(``),d=null,f=[],p=!1,m=F(null),h=F(0),g=F(!1),_=F(0),v=N(()=>Xs.find(e=>e.id===G(a))??Xs[0]);function y(e){let t=Uo.find(t=>t.id===e)?.number??1;return t===1?`1. lecke szavai`:`1–${t}. lecke szavai`}function b(e){return $.progress.games.betueso?.[e]??0}async function x(){let e=tt($.progress);e.settings.gameSound=G(s),await Vo(e)}async function S(){if(!(G(l)||G(i)===`playing`)){if(I(u,``),I(l,!0),f=[],I(m,null),I(i,`playing`),await Cr(),!G(c))I(l,!1);else try{let e=await uc(G(c),{words:Qo(G(o)),level:G(a),sound:G(s),onStroke:(e,t)=>{f.push({expected:e,typed:t,finger:Da(e),t:performance.now()})},onEnd:e=>{w(e)}});if(p){e.destroy();return}d=e}catch(e){I(u,`A játékot nem sikerült elindítani.`),I(i,`start`),console.error(e)}finally{I(l,!1)}}}function C(){d?.destroy(),d=null}async function w(e){C();let t=G(a),n=b(t);I(m,e,!0),I(_,Math.max(n,e.score),!0),I(g,e.score>n);let r=Pa(f);if(I(h,r.lpm,!0),I(i,`end`),G(g)){let r=tt($.progress);r.games.betueso={...r.games.betueso??{},[t]:Math.max(n,e.score)},await Vo(r)}let o=La(f);await Mo({uid:$.uid,schoolId:$.user?.schoolId??null,groupId:$.user?.groupId??null,lessonId:`g-betueso`,kind:`game`,stars:r.stars,accuracy:r.accuracy,lpm:r.lpm,strokes:r.strokes,errors:r.errors,activeMs:r.activeMs,rhythmSd:r.rhythmSd,missedKeys:o.missedKeys,fingerErrors:o.fingerErrors,dictation:!1,tempo:0,score:e.score,level:t,at:Date.now()});let s=await Ao($.uid);Ba(s,o,r,!1),await jo($.uid,s)}function T(e){if(e.key===`Escape`)e.preventDefault(),C(),ba(`/`);else if(G(i)===`playing`){if(e.ctrlKey||e.metaKey||e.altKey)return;e.key.length===1&&(e.preventDefault(),e.key!==` `&&d?.typeChar(e.key))}else if(e.key===`Enter`){let t=e.target;if(t&&(t.tagName===`SELECT`||t.tagName===`A`))return;(G(i)===`end`||G(i)===`start`&&G(n))&&(e.preventDefault(),S())}}_a(()=>{p=!0,C()});var E=$r();Ur(`keydown`,pn,T);var D=z(E),ee=e=>{J(e,dc())},te=e=>{var t=gc(),n=V(R(t),6);Z(n,21,()=>Xs,e=>e.id,(e,t)=>{var n=fc();let r;var i=R(n),o=B(i,!0),s=V(i,2),c=B(s),l=B(V(s,2));A(n),H(e=>{r=ji(n,1,`level svelte-gmkzdc`,null,r,{sel:G(a)===G(t).id}),$i(n,`aria-pressed`,G(a)===G(t).id),Y(o,G(t).name),Y(c,`×${G(t).multiplier??``} pont`),Y(l,`rekord: ${e??``}`)},[()=>b(G(t).id)]),K(`click`,n,()=>I(a,G(t).id,!0)),J(e,n)}),A(n);var i=V(n,2),c=e=>{var t=mc(),n=V(z(t),2);Z(n,21,()=>G(r),e=>e.id,(e,t)=>{var n=pc(),r=B(n,!0),i={};H(e=>{Y(r,e),i!==(i=G(t).id)&&(n.value=(n.__value=i)??``)},[()=>y(G(t).id)]),J(e,n)}),A(n),Ri(n),zi(n,()=>G(o),e=>I(o,e)),J(e,t)};X(i,e=>{G(r).length>1&&e(c)});var d=V(i,2),f=R(d),p=R(f);Zi(p),j(),A(f),A(d);var m=V(d,2),h=B(m),g=V(m,2),_=e=>{var t=hc(),n=B(t,!0);H(()=>Y(n,G(u))),J(e,t)};X(g,e=>{G(u)&&e(_)});var v=V(g,2),C=R(v);j(2),A(v),A(t),H(()=>{Y(h,`30 szó lesz. Kilépés: Esc.`),C.disabled=G(l)}),K(`change`,p,x),oa(p,()=>G(s),e=>I(s,e)),K(`click`,C,S),J(e,t)},ne=e=>{var t=_c(),n=z(t);ua(n,e=>I(c,e),()=>G(c));var r=B(V(n,2),!0);H(()=>Y(r,G(l)?`Betöltés…`:`Szint: ${G(v).name}. Kilépés: Esc.`)),J(e,t)},re=e=>{var t=yc(),n=R(t),r=B(n,!0),a=V(n,2),o=e=>{J(e,vc())};X(a,e=>{G(g)&&e(o)});var s=V(a,2),c=R(s),l=R(c),u=B(l,!0),d=B(V(l));A(c);var f=V(c,2),p=B(R(f));j(),A(f);var y=V(f,2),b=B(R(y),!0);j(),A(y);var x=V(y,2),C=B(R(x));j(),A(x);var w=V(x,2),T=B(R(w),!0);j(),A(w),A(s);var E=V(s,2),D=B(E),ee=V(E,2),te=R(ee),ne=V(te,2);j(2),A(ee),A(t),H(e=>{Y(r,G(m).missed===0?`Hibátlan menet!`:`Vége a játéknak`),Y(u,G(m).score),Y(d,`pont (szint: ${G(v).name??``})`),Y(p,`${G(m).popped??``}/${G(m).total??``}`),Y(b,G(m).missed),Y(C,`${e??``}%`),Y(T,G(h)),Y(D,`A szint rekordja: ${G(_)??``} pont.`)},[()=>Math.round(G(m).accuracy)]),K(`click`,te,S),K(`click`,ne,()=>I(i,`start`)),J(e,t)};X(D,e=>{G(n)?G(i)===`start`?e(te,1):G(i)===`playing`?e(ne,2):G(m)&&e(re,3):e(ee)}),J(e,E),at()}Wr([`click`,`change`]);function xc(e){return String(e).padStart(2,`0`)}function Sc(e){return`${e.getFullYear()}-${xc(e.getMonth()+1)}-${xc(e.getDate())}`}function Cc(e){let t=new Date(e.getFullYear(),e.getMonth(),e.getDate()),n=(t.getDay()+6)%7,r=new Date(t);r.setDate(t.getDate()-n);let i=new Date(r);i.setDate(r.getDate()+3);let a=new Date(i.getFullYear(),0,1),o=1+Math.floor(Math.round((i.getTime()-a.getTime())/864e5)/7);return{key:`${i.getFullYear()}-H${xc(o)}`,monday:r}}function wc(e){let[t,n,r]=e.split(`-`).map(Number);return new Date(t,n-1,r)}function Tc(e,t,n=new Date){let r=[],i=Cc(n).monday;for(let e=t-1;e>=0;e--){let t=new Date(i);t.setDate(i.getDate()-7*e),r.push({key:Cc(t).key,monday:t,seconds:0})}let a=new Map(r.map(e=>[e.key,e]));for(let t of e)for(let[e,n]of Object.entries(t.days)){let t=a.get(Cc(wc(e)).key);t&&(t.seconds+=n.seconds)}return r}function Ec(e){let t=Math.round(e/60);return t<60?`${t} perc`:`${Math.floor(t/60)} óra ${t%60} perc`}var Dc=q(`<p class="muted">Még nincs adat.</p>`),Oc=q(`<div class="fb svelte-1fwyujl"><span class="name"> </span> <span class="track svelte-1fwyujl"><span class="bar svelte-1fwyujl"></span></span> <span class="val svelte-1fwyujl"> <small class="muted"> </small></span></div>`);function kc(e,t){it(t,!0);let n=N(()=>Ca.filter(e=>(t.fingers[e]?.n??0)>0).map(e=>{let n=t.fingers[e];return{f:e,pct:100*n.err/n.n,n:n.n}})),r=N(()=>Math.max(5,...G(n).map(e=>e.pct)));var i=$r(),a=z(i),o=e=>{J(e,Dc())},s=e=>{var t=$r();Z(z(t),17,()=>G(n),e=>e.f,(e,t)=>{var n=Oc(),i=R(n),a=B(i,!0),o=V(i,2),s=R(o);let c;A(o);var l=V(o,2),u=R(l),d=B(V(u));A(l),A(n),H(e=>{Y(a,wa[G(t).f]),c=Ni(s,``,c,{width:`${100*G(t).pct/G(r)}%`}),Y(u,`${e??``}% `),Y(d,`(${G(t).n??``})`)},[()=>G(t).pct.toFixed(1).replace(`.`,`,`)]),J(e,n)}),J(e,t)};X(a,e=>{G(n).length===0?e(o):e(s,-1)}),J(e,i),at()}var Ac=q(`<span class="svelte-2vfj1t"> </span>`),jc=q(`<span></span>`),Mc=q(`<div class="col svelte-2vfj1t"></div>`),Nc=q(`<div class="cal svelte-2vfj1t"><div class="dn svelte-2vfj1t"></div> <!></div>`);function Pc(e,t){it(t,!0);let n=ha(t,`weeks`,3,5),r=[`H`,`K`,`Sze`,`Cs`,`P`,`Szo`,`V`],i=N(()=>{let e=new Date,r=Cc(e).monday;r.setDate(r.getDate()-7*(n()-1));let i=[];for(let a=0;a<n();a++){let n=[];for(let i=0;i<7;i++){let o=new Date(r);o.setDate(r.getDate()+7*a+i);let s=Sc(o);n.push({date:s,min:Math.round((t.days[s]?.seconds??0)/60),future:o>e})}i.push(n)}return i});function a(e){if(e<=0)return`var(--surface)`;let t=Math.min(1,.25+e/40);return`color-mix(in srgb, var(--accent) ${Math.round(t*100)}%, var(--surface))`}var o=Nc(),s=R(o);Z(s,21,()=>r,di,(e,t)=>{var n=Ac(),r=B(n,!0);H(()=>Y(r,G(t))),J(e,n)}),A(s),Z(V(s,2),17,()=>G(i),di,(e,t)=>{var n=Mc();Z(n,21,()=>G(t),e=>e.date,(e,t)=>{var n=jc();let r,i;H(e=>{r=ji(n,1,`day svelte-2vfj1t`,null,r,{future:G(t).future}),$i(n,`title`,`${G(t).date??``}: ${G(t).min??``} perc`),i=Ni(n,``,i,{background:e})},[()=>a(G(t).min)]),J(e,n)}),A(n),J(e,n)}),A(o),J(e,o),at()}var Fc=q(`<p class="muted">Betöltés…</p>`),Ic=q(`<div class="card"><p>Még nincs gyakorlási adat. Az első leckék után itt jelennek meg a statisztikák.</p></div>`),Lc=q(`<p class="muted">Nincs adat.</p>`),Rc=q(`<li> </li>`),zc=q(`<ul class="svelte-xotdq2"></ul> <p class="muted note svelte-xotdq2">elvárt → leütött</p>`,1),Bc=q(`<p class="muted">Még kevés adat (legalább 5 előfordulás kell).</p>`),Vc=q(`<li> <span class="muted"> </span></li>`),Hc=q(`<ul class="svelte-xotdq2"></ul>`),Uc=q(`<tr><td> </td><td> </td><td> </td></tr>`),Wc=q(`<p class="muted">Még nincs lezárt lecke.</p>`),Gc=q(`<tr><td> </td><td> </td><td> </td><td> </td><td><span class="stars"> </span></td></tr>`),Kc=q(`<div class="table-wrap"><table><thead><tr><th>Dátum</th><th>Lecke</th><th>Pontosság</th><th>Leütés/perc</th><th>Csillag</th></tr></thead><tbody></tbody></table></div>`),qc=q(`<div class="grid tot svelte-xotdq2"><div class="card"><div class="muted">Összes gyakorlási idő</div><strong class="svelte-xotdq2"> </strong></div> <div class="card"><div class="muted">Leütések</div><strong class="svelte-xotdq2"> </strong></div> <div class="card"><div class="muted">Pontosság</div><strong class="svelte-xotdq2"> </strong></div> <div class="card"><div class="muted">Teljesített feladatok</div><strong class="svelte-xotdq2"> </strong></div></div> <h2>Billentyűzet hőtérkép</h2> <p class="muted">Minél pirosabb egy billentyű, annál gyakrabban hibázott rajta.</p> <div class="card"><!></div> <h2>Hibaarány ujjanként</h2> <div class="card"><!></div> <div class="grid two svelte-xotdq2"><div><h2>Leggyakoribb tévesztések</h2> <div class="card"><!></div></div> <div><h2>Leglassabb betűpárok</h2> <div class="card"><!></div></div></div> <h2>Gyakorlási naptár</h2> <div class="card cal svelte-xotdq2"><!></div> <h2>Heti gyakorlási idő</h2> <div class="card"><table><thead><tr><th>Hét</th><th>Hétfő</th><th>Gyakorlás</th></tr></thead><tbody></tbody></table></div> <h2>Fejlődés leckénként</h2> <!>`,1);function Jc(e,t){it(t,!0);let n=F(null),r=F(L([]));async function i(e,t){let[i,a]=await Promise.all([Ao(e),No(e),Oo(e)]);t()&&(I(n,i,!0),I(r,a,!0))}Mn(()=>{let e=t.uid,n=!0;i(e,()=>n);let r=Ya(()=>void i(e,()=>n));return()=>{n=!1,r()}});let a=e=>e.toFixed(1).replace(`.`,`,`)+`%`,o=N(()=>!G(n)||G(n).totals.strokes===0&&G(r).length===0),s=N(()=>G(n)&&G(n).totals.strokes?100-100*G(n).totals.errors/G(n).totals.strokes:0),c=N(()=>{let e={},t={};for(let[e,r]of Object.entries(G(n)?.keys??{})){let n=Ea(Aa(e));if(!n)continue;let i=t[n]??={n:0,err:0};i.n+=r.n,i.err+=r.err}for(let[n,r]of Object.entries(t))r.n>0&&(e[n]=Math.min(1,r.err/r.n/.2));return e});function l(e){return e===` `?`␣`:e}let u=N(()=>Object.entries(G(n)?.confusions??{}).sort((e,t)=>t[1]-e[1]).slice(0,8).map(([e,t])=>{let[n,r]=e.split(`>`);return{text:`${l(Aa(n))} → ${l(Aa(r))}`,n:t}})),d=N(()=>Object.entries(G(n)?.bigrams??{}).filter(([,e])=>e.n>=5).map(([e,t])=>{let[n,r]=e.split(`_`);return{text:l(Aa(n))+l(Aa(r)),ms:t.ms/t.n,n:t.n}}).sort((e,t)=>t.ms-e.ms).slice(0,8)),f=N(()=>G(n)?Tc([G(n)],6):[]),p=N(()=>[...G(r)].filter(e=>e.kind!==`game`).sort((e,t)=>e.at-t.at));function m(e){let t=e.split(`#`)[0],n=Go(t),r=e.includes(`#`)?`, ${e.split(`#`)[1]}. lépés`:``;return n?`${n.number}. lecke${r}`:e}let h=e=>new Date(e).toLocaleString(`hu-HU`,{dateStyle:`short`,timeStyle:`short`});var g=$r(),_=z(g),v=e=>{J(e,Fc())},y=e=>{J(e,Ic())},b=e=>{var t=qc(),r=z(t),i=R(r),o=B(V(R(i)),!0);A(i);var l=V(i,2),g=B(V(R(l)),!0);A(l);var _=V(l,2),v=B(V(R(_)),!0);A(_);var y=V(_,2),b=B(V(R(y)),!0);A(y),A(r);var x=V(r,6);_s(R(x),{get heat(){return G(c)}}),A(x);var S=V(x,4);kc(R(S),{get fingers(){return G(n).fingers}}),A(S);var C=V(S,2),w=R(C),T=V(R(w),2),E=R(T),D=e=>{J(e,Lc())},ee=e=>{var t=zc(),n=z(t);Z(n,21,()=>G(u),di,(e,t)=>{var n=Rc(),r=B(n);H(()=>Y(r,`${G(t).text??``}: ${G(t).n??``}×`)),J(e,n)}),A(n),j(2),J(e,t)};X(E,e=>{G(u).length===0?e(D):e(ee,-1)}),A(T),A(w);var te=V(w,2),ne=V(R(te),2),re=R(ne),ie=e=>{J(e,Bc())},ae=e=>{var t=Hc();Z(t,21,()=>G(d),di,(e,t)=>{var n=Vc(),r=R(n),i=B(V(r));A(n),H(e=>{Y(r,`${G(t).text??``}: ${e??``} ms `),Y(i,`(${G(t).n??``}×)`)},[()=>Math.round(G(t).ms)]),J(e,n)}),A(t),J(e,t)};X(re,e=>{G(d).length===0?e(ie):e(ae,-1)}),A(ne),A(te),A(C);var oe=V(C,4);Pc(R(oe),{get days(){return G(n).days}}),A(oe);var se=V(oe,4),ce=R(se),le=V(R(ce));Z(le,21,()=>[...G(f)].reverse(),e=>e.key,(e,t)=>{var n=Uc(),r=R(n),i=B(r,!0),a=V(r),o=B(a,!0),s=B(V(a),!0);A(n),H((e,n)=>{Y(i,G(t).key),Y(o,e),Y(s,n)},[()=>G(t).monday.toLocaleDateString(`hu-HU`),()=>Ec(G(t).seconds)]),J(e,n)}),A(le),A(ce),A(se);var ue=V(se,4),de=e=>{J(e,Wc())},fe=e=>{var t=Kc(),n=R(t),r=V(R(n));Z(r,21,()=>G(p),e=>e.id,(e,t)=>{var n=Gc(),r=R(n),i=B(r,!0),o=V(r),s=B(o,!0),c=V(o),l=B(c,!0),u=V(c),d=B(u,!0),f=V(u),p=B(R(f));A(f),A(n),H((e,t,n,r,a,o)=>{Y(i,e),Y(s,t),Y(l,n),Y(d,r),Y(p,`${a??``}${o??``}`)},[()=>h(G(t).at),()=>m(G(t).lessonId),()=>a(G(t).accuracy),()=>Math.round(G(t).lpm),()=>`★`.repeat(G(t).stars),()=>`☆`.repeat(Math.max(0,3-G(t).stars))]),J(e,n)}),A(r),A(n),A(t),J(e,t)};X(ue,e=>{G(p).length===0?e(de):e(fe,-1)}),H((e,t)=>{Y(o,e),Y(g,G(n).totals.strokes),Y(v,t),Y(b,G(n).totals.lessons)},[()=>Ec(G(n).totals.seconds),()=>a(G(s))]),J(e,t)};X(_,e=>{G(n)?G(o)?e(y,1):e(b,-1):e(v)}),J(e,g),at()}var Yc=q(`<p class="muted">Vendégként gyakorol: az eredmények csak ebben a böngészőben vannak meg. Belépés után összefésüljük őket a fiókjával.</p>`),Xc=q(`<p class="muted">Még nincs játékrekord.</p>`),Zc=q(`<tr><td> </td><td> </td><td> </td></tr>`),Qc=q(`<div class="table-wrap"><table><thead><tr><th>Játék</th><th>Szint</th><th>Rekord</th></tr></thead><tbody></tbody></table></div>`),$c=q(`<h1>Eredményeim</h1> <!> <!> <h2>Játékrekordok</h2> <!>`,1);function el(e,t){it(t,!0);let n=N(()=>Object.entries($.progress.games)),r={betueso:`Betűeső`};var i=$c(),a=V(z(i),2),o=e=>{J(e,Yc())};X(a,e=>{$.user||e(o)});var s=V(a,2);Jc(s,{get uid(){return $.uid}});var c=V(s,4),l=e=>{J(e,Xc())},u=e=>{var t=Qc(),i=R(t),a=V(R(i));Z(a,21,()=>G(n),([e,t])=>e,(e,t)=>{var n=N(()=>w(G(t),2));let i=()=>G(n)[0],a=()=>G(n)[1];var o=$r();Z(z(o),17,()=>Object.entries(a()),([e,t])=>e,(e,t)=>{var n=N(()=>w(G(t),2));let a=()=>G(n)[0],o=()=>G(n)[1];var s=Zc(),c=R(s),l=B(c,!0),u=V(c),d=B(u,!0),f=B(V(u),!0);A(s),H(()=>{Y(l,r[i()]??i()),Y(d,a()),Y(f,o())}),J(e,s)}),J(e,o)}),A(a),A(i),A(t),J(e,t)};X(c,e=>{G(n).length===0?e(l):e(u,-1)}),J(e,i),at()}var tl=q(`<p class="muted">A csoport megtekintéséhez lépjen be.</p>`),nl=q(`<p class="muted">Még nincs csoportba sorolva. A tanára fogja besorolni.</p>`),rl=q(`<th> </th>`),il=q(`<span class="stars"> </span>`),al=q(`<span class="muted">–</span>`),ol=q(`<td><!></td>`),sl=q(`<tr><td> </td><td> </td><!></tr>`),cl=q(`<p><strong> </strong> – a csoporttársak neve és haladása. Nincs rangsor: mindenki a saját ütemében halad.</p> <div class="table-wrap"><table><thead><tr><th>Név</th><th>Utolsó lecke</th><!></tr></thead><tbody></tbody></table></div>`,1),ll=q(`<p class="muted">Betöltés…</p>`),ul=q(`<h1>Csoportom</h1> <!>`,1);function dl(e,t){it(t,!0);let n=F(null),r=F(L([]));async function i(e){if(!e){I(n,null),I(r,[],!0);return}let[t,i]=await Promise.all([yo(e),co(e)]);I(n,t,!0),I(r,i,!0)}Mn(()=>{let e=$.user?.groupId??null;return i(e),Ya(()=>void i(e))});function a(e){if(!e)return`–`;let t=Go(e);return t?`${t.number}. lecke`:e}var o=ul(),s=V(z(o),2),c=e=>{J(e,tl())},l=e=>{J(e,nl())},u=e=>{var t=cl(),i=z(t),o=B(R(i),!0);j(),A(i);var s=V(i,2),c=R(s),l=R(c),u=R(l);Z(V(R(u),2),17,()=>Uo,e=>e.id,(e,t)=>{var n=rl(),r=B(n);H(()=>Y(r,`${G(t).number??``}. lecke`)),J(e,n)}),A(u),A(l);var d=V(l);Z(d,21,()=>G(r),e=>e.uid,(e,t)=>{var n=sl(),r=R(n),i=B(r),o=V(r),s=B(o,!0);Z(V(o),17,()=>Uo,e=>e.id,(e,n)=>{var r=ol(),i=R(r),a=e=>{var r=il(),i=B(r);H((e,a)=>{$i(r,`title`,`${G(t).stars[G(n).id]??``} csillag`),Y(i,`${e??``}${a??``}`)},[()=>`★`.repeat(G(t).stars[G(n).id]),()=>`☆`.repeat(Math.max(0,3-G(t).stars[G(n).id]))]),J(e,r)},o=e=>{J(e,al())};X(i,e=>{G(t).stars[G(n).id]===void 0?e(o,-1):e(a)}),A(r),J(e,r)}),A(n),H(e=>{Y(i,`${G(t).name??``}${G(t).uid===$.uid?` (Ön)`:``}`),Y(s,e)},[()=>a(G(t).lastLesson)]),J(e,n)}),A(d),A(c),A(s),H(()=>Y(o,G(n).name)),J(e,t)},d=e=>{J(e,ll())};X(s,e=>{$.user?$.user.groupId?G(n)?e(u,2):e(d,-1):e(l,1):e(c)}),J(e,o),at()}var fl=q(`<div class="card onboard svelte-1428x5h"><h2>Iskolakód</h2> <p> </p> <form><input type="text" placeholder="pl. DEMO42" autocomplete="off"/> <button type="submit">Csatlakozás</button> <button type="button" class="secondary">Később</button></form> <p class="muted">Iskolakód nélkül is gyakorolhat, de a tanára nem látja az eredményeit. Demó iskolakód: <strong>DEMO42</strong>.</p></div>`),pl=q(`<p class="error"> </p>`),ml=q(`<p> </p>`),hl=q(`<button><strong> </strong> <span class="muted"> </span> <span> </span></button>`),gl=q(`<h1>Belépés</h1> <p>Az éles változatban Google-fiókkal lehet belépni; ebben a demóban válasszon egy felhasználót, vagy regisztráljon.</p> <p><button disabled="" title="hamarosan">Bejelentkezés Google-fiókkal</button></p> <!> <!> <!> <h2>Demó felhasználók</h2> <div class="grid"></div> <h2>Regisztráció</h2> <form class="card reg svelte-1428x5h"><label>Név <input type="text"/></label> <label>E-mail <input type="email"/></label> <button type="submit">Regisztráció és belépés</button></form> <p class="muted">Ha a tanárától iskolakódot kapott, regisztráció után adja meg. A demó iskola kódja: DEMO42.</p> <p><button class="secondary small">Demó adatok visszaállítása</button></p>`,1);function _l(e,t){it(t,!0);let n=F(L([])),r=F(``),i=F(``),a=F(``),o=F(``),s=F(``),c=F(!1);async function l(){I(n,(await no()).sort((e,t)=>e.name.localeCompare(t.name,`hu`)),!0)}Mn(()=>(l(),Ya(()=>void l())));let u={admin:`üzemeltető`,teacher:`tanár`,student:`diák`};function d(e){return e.role===`student`&&!e.schoolId?`diák, iskola nélkül`:u[e.role]}let f=N(()=>!!$.user&&!$.admin&&!$.user.schoolId&&!G(c));async function p(e){I(o,``),I(c,!1),await zo(e.uid),(e.role!==`student`||e.schoolId)&&ba(`/`)}async function m(e){if(e.preventDefault(),I(o,``),!G(r).trim()||!G(i).trim()){I(o,`Adja meg a nevét és az e-mail-címét.`);return}let t=await io(G(r).trim(),G(i).trim());I(r,``),I(i,``),I(c,!1),await zo(t.uid)}async function h(e){if(e.preventDefault(),I(o,``),I(s,``),$.user)try{let e=await oo($.user.uid,G(a));I(s,`Csatlakozott: ${e.name}.`),I(a,``),ba(`/`)}catch(e){I(o,e instanceof Error?e.message:String(e),!0)}}async function g(){confirm(`Biztosan visszaállítja a demó adatokat? Minden helyben tárolt adat elvész.`)&&(await eo(),await Bo())}var _=gl(),v=V(z(_),6),y=e=>{var t=fl(),n=V(R(t),2),r=B(n),i=V(n,2),o=R(i);Zi(o);var s=V(o,4);A(i),j(2),A(t),H(()=>Y(r,`Üdvözöljük, ${$.user?.name??``}! Írja be a tanárától kapott iskolakódot, hogy bekerüljön az iskolájába. Az iskola később már nem módosítható; áthelyezést csak a tanár tud kérni.`)),Ur(`submit`,i,h),aa(o,()=>G(a),e=>I(a,e)),K(`click`,s,()=>{I(c,!0),ba(`/`)}),J(e,t)};X(v,e=>{G(f)&&e(y)});var b=V(v,2),x=e=>{var t=pl(),n=B(t,!0);H(()=>Y(n,G(o))),J(e,t)};X(b,e=>{G(o)&&e(x)});var S=V(b,2),C=e=>{var t=ml(),n=B(t,!0);H(()=>Y(n,G(s))),J(e,t)};X(S,e=>{G(s)&&e(C)});var w=V(S,4);Z(w,21,()=>G(n),e=>e.uid,(e,t)=>{var n=hl();let r;var i=R(n),a=B(i,!0),o=V(i,2),s=B(o,!0),c=V(o,2),l=B(c,!0);A(n),H(e=>{r=ji(n,1,`card user svelte-1428x5h`,null,r,{current:G(t).uid===$.uid}),Y(a,G(t).name),Y(s,G(t).email),ji(c,1,`badge ${G(t).role??``}`,`svelte-1428x5h`),Y(l,e)},[()=>d(G(t))]),K(`click`,n,()=>p(G(t))),J(e,n)}),A(w);var T=V(w,4),E=R(T),D=V(R(E));Zi(D),A(E);var ee=V(E,2),te=V(R(ee));Zi(te),A(ee),j(2),A(T);var ne=B(V(T,4));Ur(`submit`,T,m),aa(D,()=>G(r),e=>I(r,e)),aa(te,()=>G(i),e=>I(i,e)),K(`click`,ne,g),J(e,_),at()}Wr([`click`]);function vl(e){if(e==null)return``;let t=typeof e==`number`?String(e).replace(`.`,`,`):String(e);return/[;"\n\r]/.test(t)?`"${t.replace(/"/g,`""`)}"`:t}function yl(e,t){return`﻿`+[e,...t].map(e=>e.map(vl).join(`;`)).join(`\r
`)+`\r
`}function bl(e,t){let n=URL.createObjectURL(new Blob([t],{type:`text/csv;charset=utf-8`})),r=document.createElement(`a`);r.href=n,r.download=e,document.body.appendChild(r),r.click(),r.remove(),setTimeout(()=>URL.revokeObjectURL(n),1e3)}var xl=q(`<tr><td> </td><td> </td><td><span class="stars"> </span></td><td> </td><td> </td><td> </td></tr>`),Sl=q(`<tr><td colspan="6" class="muted">Még nincs eredmény.</td></tr>`),Cl=q(`<p><button class="secondary small">← Vissza az áttekintőhöz</button></p> <h2> </h2> <p class="muted"> </p> <h3>Eredmények</h3> <div class="table-wrap"><table><thead><tr><th>Időpont</th><th>Lecke</th><th>Csillag</th><th>Pontosság</th><th>Leütés/perc</th><th>Hibák</th></tr></thead><tbody></tbody></table></div> <h3>Statisztika</h3> <!>`,1),wl=q(`<p class="muted">Még nincs csoport. Hozzon létre egyet a Csoportok lapon.</p>`),Tl=q(`<option> </option>`),El=q(`<th> </th>`),Dl=q(`<span class="stars"> </span><br/> <small> </small>`,1),Ol=q(`<span class="muted">–</span>`),kl=q(`<td><!></td>`),Al=q(`<tr><td><button class="link"> </button></td><!></tr>`),jl=q(`<tr><td class="muted">Ebben a csoportban még nincs diák.</td></tr>`),Ml=q(`<div class="card row svelte-3jij1k"><label>Csoport <select></select></label> <button class="secondary">Eredmények letöltése (CSV)</button> <button class="secondary">Összesítő letöltése (CSV)</button></div> <div class="table-wrap"><table><thead><tr><th>Diák</th><!></tr></thead><tbody></tbody></table></div>`,1);function Nl(e,t){it(t,!0);let n=F(L([])),r=F(L([])),i=F(L({})),a=F(L({})),o=F(L([])),s=F(``),c=F(null);Mn(()=>{let e=t.school.id,c=!0,l=async()=>{let[t,l,u]=await Promise.all([vo(e),_o(e),Po(e)]),d=l.filter(e=>e.role===`student`),[f,p]=await Promise.all([Promise.all(d.map(e=>Oo(e.uid))),Promise.all(d.map(e=>Ao(e.uid)))]);c&&(I(n,t,!0),I(r,l,!0),I(o,u,!0),I(i,Object.fromEntries(d.map((e,t)=>[e.uid,f[t]])),!0),I(a,Object.fromEntries(d.map((e,t)=>[e.uid,p[t]])),!0),G(s)&&t.some(e=>e.id===G(s))||I(s,t[0]?.id??``,!0))};l();let u=Ya(()=>void l());return()=>{c=!1,u()}});let l=N(()=>G(n).find(e=>e.id===G(s))??null),u=N(()=>G(r).filter(e=>e.role===`student`&&e.groupId===G(s))),d=e=>e.toFixed(0)+`%`,f=N(()=>G(c)?G(r).find(e=>e.uid===G(c))??null:null),p=e=>new Date(e).toLocaleString(`hu-HU`,{dateStyle:`short`,timeStyle:`short`}),m=e=>`★`.repeat(e)+`☆`.repeat(Math.max(0,3-e));function h(e){let t=e.split(`#`)[0],n=Go(t),r=e.includes(`#`)?`, ${e.split(`#`)[1]}. lépés`:``;return n?`${n.number}. lecke${r}`:e}function g(e,t){let n=Object.values(e?.games[t]??{});return n.length?Math.max(...n):null}function _(){if(!G(l))return;let e=new Set(G(u).map(e=>e.uid)),t=new Map(G(r).map(e=>[e.uid,e])),n=G(o).filter(t=>e.has(t.uid)).sort((e,t)=>e.at-t.at).map(e=>[new Date(e.at).toLocaleString(`hu-HU`),t.get(e.uid)?.name??``,G(l).name,h(e.lessonId),e.kind===`game`?`játék`:`gépelés`,e.stars,Math.round(e.accuracy*10)/10,Math.round(e.lpm),e.strokes,e.errors,Math.round(e.activeMs/1e3),e.score??``]);bl(`eredmenyek-${G(l).name}.csv`,yl([`Időpont`,`Név`,`Csoport`,`Lecke`,`Típus`,`Csillag`,`Pontosság (%)`,`Leütés/perc`,`Leütések`,`Hibák`,`Aktív idő (mp)`,`Pontszám`],n))}function v(){if(!G(l))return;let e=G(u).map(e=>{let t=G(i)[e.uid],n=G(a)[e.uid],r=Object.entries(t?.lessons??{}).filter(([e,t])=>t.completed&&Go(e)).length,s=G(o).filter(t=>t.uid===e.uid&&t.kind===`typing`),c=s.length?s.reduce((e,t)=>e+t.lpm,0)/s.length:0,u=n&&n.totals.strokes?100-100*n.totals.errors/n.totals.strokes:0;return[e.name,G(l).name,r,Math.round((n?.totals.seconds??0)/60),Math.round(u*10)/10,Math.round(c)]});bl(`osszesito-${G(l).name}.csv`,yl([`Név`,`Csoport`,`Teljesített leckék`,`Gyakorlási idő (perc)`,`Pontosság (%)`,`Átlagos leütés/perc`],e))}var y=$r(),b=z(y),x=e=>{var t=Cl(),n=z(t),r=B(n),i=V(n,2),a=B(i,!0),s=V(i,2),l=B(s,!0),u=V(s,4),d=R(u),g=V(R(d));Z(g,21,()=>G(o).filter(e=>e.uid===G(f).uid),e=>e.id,(e,t)=>{var n=xl(),r=R(n),i=B(r,!0),a=V(r),o=B(a,!0),s=V(a),c=B(R(s),!0);A(s);var l=V(s),u=B(l),d=V(l),f=B(d,!0),g=B(V(d),!0);A(n),H((e,n,r,a,s)=>{Y(i,e),Y(o,n),Y(c,r),Y(u,`${a??``}%`),Y(f,s),Y(g,G(t).errors)},[()=>p(G(t).at),()=>G(t).kind===`game`?`Játék`:h(G(t).lessonId),()=>m(G(t).stars),()=>G(t).accuracy.toFixed(1).replace(`.`,`,`),()=>Math.round(G(t).lpm)]),J(e,n)},e=>{J(e,Sl())}),A(g),A(d),A(u),Jc(V(u,4),{get uid(){return G(f).uid}}),H(()=>{Y(a,G(f).name),Y(l,G(f).email)}),K(`click`,r,()=>I(c,null)),J(e,t)},S=e=>{J(e,wl())},C=e=>{var t=Ml(),r=z(t),a=R(r),o=V(R(a));Z(o,21,()=>G(n),e=>e.id,(e,t)=>{var n=Tl(),r=B(n,!0),i={};H(()=>{Y(r,G(t).name),i!==(i=G(t).id)&&(n.value=(n.__value=i)??``)}),J(e,n)}),A(o),Ri(o),A(a);var l=V(a,2),f=V(l,2);A(r);var p=V(r,2),h=R(p),y=R(h),b=R(y);Z(V(R(b)),17,()=>Wo,e=>e.id,(e,t)=>{var n=El(),r=B(n,!0);H(()=>Y(r,G(t).kind===`typing`?`${G(t).lesson.number}. lecke`:G(t).title)),J(e,n)}),A(b),A(y);var x=V(y);Z(x,21,()=>G(u),e=>e.uid,(e,t)=>{var n=Al(),r=R(n),a=R(r),o=B(a,!0);A(r),Z(V(r),17,()=>Wo,e=>e.id,(e,n)=>{let r=N(()=>G(i)[G(t).uid]?.lessons[G(n).id]);var a=kl(),o=R(a),s=e=>{var t=$r(),n=z(t),i=e=>{var t=Dl(),n=z(t),i=B(n,!0),a=B(V(n,3));H((e,t,n)=>{Y(i,e),Y(a,`${t??``} · ${n??``}/perc`)},[()=>m(G(r).stars),()=>d(G(r).accuracy),()=>Math.round(G(r).lpm)]),J(e,t)},a=e=>{J(e,Ol())};X(n,e=>{G(r)?e(i):e(a,-1)}),J(e,t)},c=e=>{let r=N(()=>g(G(i)[G(t).uid],G(n).game));var a=$r(),o=z(a),s=e=>{var t=Qr();H(()=>Y(t,`${G(r)??``} pont`)),J(e,t)},c=e=>{J(e,Ol())};X(o,e=>{G(r)===null?e(c,-1):e(s)}),J(e,a)};X(o,e=>{G(n).kind===`typing`?e(s):e(c,-1)}),A(a),J(e,a)}),A(n),H(()=>Y(o,G(t).name)),K(`click`,a,()=>I(c,G(t).uid,!0)),J(e,n)},e=>{var t=jl(),n=B(t);H(()=>$i(n,`colspan`,Wo.length+1)),J(e,t)}),A(x),A(h),A(p),zi(o,()=>G(s),e=>I(s,e)),K(`click`,l,_),K(`click`,f,v),J(e,t)};X(b,e=>{G(f)?e(x):G(n).length===0?e(S,1):e(C,-1)}),J(e,y),at()}Wr([`click`]);var Pl=q(`<option> </option>`),Fl=q(`<p class="error"> </p>`),Il=q(`<p> </p>`),Ll=q(`<select aria-label="Csoport"><option>besorolásra vár</option><!></select>`),Rl=q(`<span class="muted">–</span>`),zl=q(`<input type="text" placeholder="céliskola kódja" size="10"/> <button class="small">Áthelyez</button> <button class="small secondary">Mégse</button>`,1),Bl=q(`<button class="small secondary">Áthelyezés másik iskolába</button>`),Vl=q(`<tr><td> </td><td> </td><td> </td><td><!></td><td class="actions svelte-1n2aiew"><button class="small secondary"> </button> <!> <button class="small danger">Törlés</button></td></tr>`),Hl=q(`<tr><td colspan="5" class="muted">Nincs a szűrésnek megfelelő felhasználó.</td></tr>`),Ul=q(`<div class="card row svelte-1n2aiew"><label>Keresés <input type="text" placeholder="név vagy e-mail"/></label> <label>Csoport <select><option>Mindenki</option><option>Besorolásra vár</option><!></select></label></div> <!> <!> <div class="table-wrap"><table><thead><tr><th>Név</th><th>E-mail</th><th>Szerep</th><th>Csoport</th><th>Műveletek</th></tr></thead><tbody></tbody></table></div>`,1);function Wl(e,t){it(t,!0);let n=F(L([])),r=F(L([])),i=F(``),a=F(``),o=F(``),s=F(``),c=L({}),l=F(null);Mn(()=>{let e=t.school.id,i=async()=>{await(async e=>{var t=w(e,2);I(n,t[0],!0),I(r,t[1],!0)})(await Promise.all([_o(e),vo(e)]))};return i(),Ya(()=>void i())});let u=N(()=>G(n).filter(e=>G(i)&&!(e.name+` `+e.email).toLocaleLowerCase(`hu`).includes(G(i).toLocaleLowerCase(`hu`))?!1:G(a)===`__none`?e.role===`student`&&!e.groupId:!G(a)||e.groupId===G(a)));async function d(e,t=``){I(o,``),I(s,``);try{await e(),I(s,t,!0)}catch(e){I(o,e instanceof Error?e.message:String(e),!0)}}let f=e=>d(()=>e.role===`teacher`?go(e.uid,!1):ho(e.uid,t.school.id)),p=(e,t)=>d(()=>Co(e.uid,t||null));async function m(e){let t=c[e.uid]??``;t.trim()?confirm(`${e.name} átkerül a másik iskolába, és kikerül a csoportjából. A haladása megmarad. Folytatja?`)&&await d(async()=>{let n=await wo(e.uid,t);I(l,null),c[e.uid]=``,I(s,`${e.name} átkerült: ${n.name}.`)}):I(o,`Adja meg a céliskola kódját.`)}async function h(e){e.uid===t.me.uid?I(o,`A saját fiókját itt nem törölheti.`):confirm(`Véglegesen törli ${e.name} fiókját és minden adatát? Ez nem vonható vissza.`)&&await d(()=>To(e.uid),`${e.name} fiókja törölve.`)}var g=Ul(),_=z(g),v=R(_),y=V(R(v));Zi(y),A(v);var b=V(v,2),x=V(R(b)),S=R(x);S.value=S.__value=``;var C=V(S);C.value=C.__value=`__none`,Z(V(C),17,()=>G(r),e=>e.id,(e,t)=>{var n=Pl(),r=B(n,!0),i={};H(()=>{Y(r,G(t).name),i!==(i=G(t).id)&&(n.value=(n.__value=i)??``)}),J(e,n)}),A(x),Ri(x),A(b),A(_);var T=V(_,2),E=e=>{var t=Fl(),n=B(t,!0);H(()=>Y(n,G(o))),J(e,t)};X(T,e=>{G(o)&&e(E)});var D=V(T,2),ee=e=>{var t=Il(),n=B(t,!0);H(()=>Y(n,G(s))),J(e,t)};X(D,e=>{G(s)&&e(ee)});var te=V(D,2),ne=R(te),re=V(R(ne));Z(re,21,()=>G(u),e=>e.uid,(e,t)=>{var n=Vl(),i=R(n),a=B(i,!0),o=V(i),s=B(o,!0),u=V(o),d=B(u,!0),g=V(u),_=R(g),v=e=>{var n=Ll(),i=R(n);i.value=i.__value=``,Z(V(i),17,()=>G(r),e=>e.id,(e,t)=>{var n=Pl(),r=B(n,!0),i={};H(()=>{Y(r,G(t).name),i!==(i=G(t).id)&&(n.value=(n.__value=i)??``)}),J(e,n)}),A(n);var a;Ri(n),H(()=>{a!==(a=G(t).groupId??``)&&(n.value=(n.__value=a)??``,Li(n,a))}),K(`change`,n,e=>p(G(t),e.currentTarget.value)),J(e,n)},y=e=>{J(e,Rl())};X(_,e=>{G(t).role===`student`?e(v):e(y,-1)}),A(g);var b=V(g),x=R(b),S=B(x,!0),C=V(x,2),w=e=>{var n=$r(),r=z(n),i=e=>{var n=zl(),r=z(n);Zi(r);var i=V(r,2),a=V(i,2);aa(r,()=>c[G(t).uid],e=>c[G(t).uid]=e),K(`click`,i,()=>m(G(t))),K(`click`,a,()=>I(l,null)),J(e,n)},a=e=>{var n=Bl();K(`click`,n,()=>I(l,G(t).uid,!0)),J(e,n)};X(r,e=>{G(l)===G(t).uid?e(i):e(a,-1)}),J(e,n)};X(C,e=>{G(t).role===`student`&&e(w)});var T=V(C,2);A(b),A(n),H(()=>{Y(a,G(t).name),Y(s,G(t).email),Y(d,G(t).role===`teacher`?`tanár`:`diák`),Y(S,G(t).role===`teacher`?`Tanári szerep elvétele`:`Tanárrá nevezés`)}),K(`click`,x,()=>f(G(t))),K(`click`,T,()=>h(G(t))),J(e,n)},e=>{J(e,Hl())}),A(re),A(ne),A(te),aa(y,()=>G(i),e=>I(i,e)),zi(x,()=>G(a),e=>I(a,e)),J(e,g),at()}Wr([`change`,`click`]);var Gl=q(`<p class="error"> </p>`),Kl=q(`<label><input type="checkbox"/> </label>`),ql=q(`<span class="muted"> </span>`),Jl=q(`<label><input type="checkbox"/> <!></label>`),Yl=q(`<span class="muted">Még nincs diák az iskolában.</span>`),Xl=q(`<details class="card g svelte-7we9zm"><summary><strong> </strong> <span class="muted"> </span></summary> <div class="sec svelte-7we9zm"><label>Név <input type="text"/></label> <button class="small">Átnevezés</button> <button class="small danger">Csoport törlése</button></div> <div class="sec svelte-7we9zm"><strong class="svelte-7we9zm">Beállítások</strong> <label><input type="checkbox"/> Sorban haladás megkövetelése</label> <label><input type="checkbox"/> Backspace/Delete engedélyezése</label></div> <div class="sec svelte-7we9zm"><strong class="svelte-7we9zm">Tanárok</strong> <!></div> <div class="sec svelte-7we9zm"><strong class="svelte-7we9zm">Tagok</strong> <!></div></details>`),Zl=q(`<p class="muted">Még nincs csoport.</p>`),Ql=q(`<form class="card row svelte-7we9zm"><label>Új csoport neve <input type="text"/></label> <button type="submit">Csoport létrehozása</button></form> <!> <!>`,1);function $l(e,t){it(t,!0);let n=F(L([])),r=F(L([])),i=F(``),a=L({}),o=F(``);Mn(()=>{let e=t.school.id,i=async()=>{await(async e=>{var t=w(e,2);I(n,t[0],!0),I(r,t[1],!0)})(await Promise.all([_o(e),vo(e)]));for(let e of G(r))a[e.id]===void 0&&(a[e.id]=e.name)};return i(),Ya(()=>void i())});let s=N(()=>G(n).filter(e=>e.role===`teacher`)),c=N(()=>G(n).filter(e=>e.role===`student`)),l=e=>G(r).find(t=>t.id===e)?.name??``;async function u(e){I(o,``);try{await e()}catch(e){I(o,e instanceof Error?e.message:String(e),!0)}}async function d(e){e.preventDefault(),G(i).trim()&&await u(async()=>{await bo(t.school.id,G(i).trim(),t.me.uid),I(i,``)})}let f=e=>a[e.id]?.trim()&&a[e.id].trim()!==e.name?u(()=>xo(e.id,{name:a[e.id].trim()})):void 0;function p(e,t,n){let r=n?[...new Set([...e.teacherIds,t])]:e.teacherIds.filter(e=>e!==t);return u(()=>xo(e.id,{teacherIds:r}))}let m=(e,t,n)=>u(()=>xo(e.id,{settings:{...e.settings,[t]:n}})),h=(e,t,n)=>u(()=>Co(t,n?e.id:null));async function g(e){confirm(`Törli a(z) „${e.name}” csoportot? A tagok „besorolásra vár” állapotba kerülnek, az eredményeik megmaradnak.`)&&await u(()=>So(e.id))}var _=Ql(),v=z(_),y=R(v),b=V(R(y));Zi(b),A(y),j(2),A(v);var x=V(v,2),S=e=>{var t=Gl(),n=B(t,!0);H(()=>Y(n,G(o))),J(e,t)};X(x,e=>{G(o)&&e(S)}),Z(V(x,2),17,()=>G(r),e=>e.id,(e,t)=>{var n=Xl(),r=R(n),i=R(r),o=B(i,!0),u=B(V(i,2));A(r);var d=V(r,2),_=R(d),v=V(R(_));Zi(v),A(_);var y=V(_,2),b=V(y,2);A(d);var x=V(d,2),S=V(R(x),2),C=R(S);Zi(C),j(),A(S);var w=V(S,2),T=R(w);Zi(T),j(),A(w),A(x);var E=V(x,2);Z(V(R(E),2),17,()=>G(s),e=>e.uid,(e,n)=>{var r=Kl(),i=R(r);Zi(i);var a=V(i);A(r),H(e=>{Qi(i,e),Y(a,` ${G(n).name??``}`)},[()=>G(t).teacherIds.includes(G(n).uid)]),K(`change`,i,e=>p(G(t),G(n).uid,e.currentTarget.checked)),J(e,r)}),A(E);var D=V(E,2);Z(V(R(D),2),17,()=>G(c),e=>e.uid,(e,n)=>{var r=Jl(),i=R(r);Zi(i);var a=V(i),o=V(a),s=e=>{var t=ql(),r=B(t);H(e=>Y(r,`(most: ${e??``}; bejelölésére átkerül ide)`),[()=>l(G(n).groupId)]),J(e,t)};X(o,e=>{G(n).groupId&&G(n).groupId!==G(t).id&&e(s)}),A(r),H(()=>{Qi(i,G(n).groupId===G(t).id),Y(a,` ${G(n).name??``} `)}),K(`change`,i,e=>h(G(t),G(n).uid,e.currentTarget.checked)),J(e,r)},e=>{J(e,Yl())}),A(D),A(n),H(e=>{Y(o,G(t).name),Y(u,`(${e??``} diák)`),Qi(C,G(t).settings.sequential),Qi(T,G(t).settings.allowBackspace)},[()=>G(c).filter(e=>e.groupId===G(t).id).length]),aa(v,()=>a[G(t).id],e=>a[G(t).id]=e),K(`click`,y,()=>f(G(t))),K(`click`,b,()=>g(G(t))),K(`change`,C,e=>m(G(t),`sequential`,e.currentTarget.checked)),K(`change`,T,e=>m(G(t),`allowBackspace`,e.currentTarget.checked)),J(e,n)},e=>{J(e,Zl())}),Ur(`submit`,v,d),aa(b,()=>G(i),e=>I(i,e)),J(e,_),at()}Wr([`click`,`change`]);var eu=q(`<p class="error"> </p>`),tu=q(`<div class="card"><h2>Iskolakód</h2> <p class="code svelte-1maok2y"> </p> <button class="secondary">Új kód készítése</button> <!></div> <div class="card" style="margin-top:1rem"><h2>Mit adjon a diákoknak?</h2> <ol><li>A diák megnyitja a Gépírás oldalt, és belép (Google-fiókkal; a demóban regisztrál).</li> <li>Az első belépéskor megadja a nevét és ezt az iskolakódot.</li> <li>A diák „besorolásra vár” állapotban jelenik meg a Felhasználók lapon; ott csoportba sorolhatja.</li></ol> <p class="muted">Az iskolakódot csak a diákjainak adja meg. Ha kiszivárog, készítsen újat.</p></div>`,1);function nu(e,t){it(t,!0);let n=F(``);async function r(){if(confirm(`Új iskolakódot készít? A régi kód azonnal érvénytelen lesz (a már csatlakozott diákokat ez nem érinti).`)){I(n,``);try{await mo(t.school.id)}catch(e){I(n,e instanceof Error?e.message:String(e),!0)}}}var i=tu(),a=z(i),o=V(R(a),2),s=B(o,!0),c=V(o,2),l=V(c,2),u=e=>{var t=eu(),r=B(t,!0);H(()=>Y(r,G(n))),J(e,t)};X(l,e=>{G(n)&&e(u)}),A(a),j(2),H(()=>Y(s,t.school.joinCode)),K(`click`,c,r),J(e,i),at()}Wr([`click`]);var ru=q(`<p class="muted">Még nincs csoport.</p>`),iu=q(`<th> </th>`),au=q(`<td> </td>`),ou=q(`<tr><td> </td><!></tr>`),su=q(`<div class="table-wrap"><table><thead><tr><th>Csoport</th><!></tr></thead><tbody></tbody></table></div>`),cu=q(`<p class="muted">A csoport tagjainak összes gyakorlási ideje az utolsó 6 ISO-hétben.</p> <!>`,1);function lu(e,t){it(t,!0);let n=F(L([])),r=F(L({}));Mn(()=>{let e=t.school.id,i=!0,a=async()=>{let[t,a]=await Promise.all([vo(e),_o(e)]),o={};for(let e of t)o[e.id]=await Promise.all(a.filter(t=>t.groupId===e.id&&t.role===`student`).map(e=>Ao(e.uid)));i&&(I(n,t,!0),I(r,o,!0))};a();let o=Ya(()=>void a());return()=>{i=!1,o()}});let i=N(()=>G(n).map(e=>({g:e,weeks:Tc(G(r)[e.id]??[],6)}))),a=N(()=>G(i)[0]?.weeks??Tc([],6));var o=cu(),s=V(z(o),2),c=e=>{J(e,ru())},l=e=>{var t=su(),n=R(t),r=R(n),o=R(r);Z(V(R(o)),17,()=>G(a),e=>e.key,(e,t)=>{var n=iu(),r=B(n,!0);H(e=>{$i(n,`title`,`hétfő: ${e??``}`),Y(r,G(t).key)},[()=>G(t).monday.toLocaleDateString(`hu-HU`)]),J(e,n)}),A(o),A(r);var s=V(r);Z(s,21,()=>G(i),e=>e.g.id,(e,t)=>{var n=ou(),r=R(n),i=B(r,!0);Z(V(r),17,()=>G(t).weeks,e=>e.key,(e,t)=>{var n=au(),r=B(n,!0);H(e=>Y(r,e),[()=>Ec(G(t).seconds)]),J(e,n)}),A(n),H(()=>Y(i,G(t).g.name)),J(e,n)}),A(s),A(n),A(t),J(e,t)};X(s,e=>{G(n).length===0?e(c):e(l,-1)}),J(e,o),at()}var uu=q(`<p class="error">Ehhez az oldalhoz tanári jogosultság kell.</p>`),du=q(`<p class="muted">Betöltés…</p>`),fu=q(`<button> </button>`),pu=q(`<p class="muted"> </p> <div class="tabs"></div> <!>`,1),mu=q(`<h1>Tanári felület</h1> <!>`,1);function hu(e,t){it(t,!0);let n=[[`overview`,`Áttekintő`],[`users`,`Felhasználók`],[`groups`,`Csoportok`],[`code`,`Iskolakód`],[`weekly`,`Gyakorlási idő`]],r=F(`overview`),i=F(null);Mn(()=>{let e=$.user?.schoolId??null,t=async()=>{I(i,e?await uo(e):null,!0)};return t(),Ya(()=>void t())});var a=mu(),o=V(z(a),2),s=e=>{J(e,uu())},c=e=>{J(e,du())},l=e=>{var t=pu(),a=z(t),o=B(a),s=V(a,2);Z(s,21,()=>n,([e,t])=>e,(e,t)=>{var n=N(()=>w(G(t),2));let i=()=>G(n)[0],a=()=>G(n)[1];var o=fu();let s;var c=B(o,!0);H(()=>{s=ji(o,1,``,null,s,{active:G(r)===i()}),Y(c,a())}),K(`click`,o,()=>I(r,i(),!0)),J(e,o)}),A(s);var c=V(s,2),l=e=>{Nl(e,{get school(){return G(i)}})},u=e=>{Wl(e,{get school(){return G(i)},get me(){return $.user}})},d=e=>{$l(e,{get school(){return G(i)},get me(){return $.user}})},f=e=>{nu(e,{get school(){return G(i)}})},p=e=>{lu(e,{get school(){return G(i)}})};X(c,e=>{G(r)===`overview`?e(l):G(r)===`users`?e(u,1):G(r)===`groups`?e(d,2):G(r)===`code`?e(f,3):e(p,-1)}),H(()=>Y(o,`${G(i).name??``}${G(i).disabled?` (az iskola le van tiltva)`:``}`)),J(e,t)};X(o,e=>{$.user?.role===`teacher`?G(i)?e(l,-1):e(c,1):e(s)}),J(e,a),at()}Wr([`click`]);var gu=q(`<p class="error">Ehhez az oldalhoz üzemeltetői jogosultság kell.</p>`),_u=q(`<p class="error"> </p>`),vu=q(`<option> </option>`),yu=q(`<tr><td> </td><td><code> </code></td><td> </td><td> </td><td> </td><td class="actions svelte-1jknolv"><select aria-label="Tanár kijelölése"><option>Első tanár kijelölése…</option><!></select> <button class="small">Kijelöl</button> <button class="small secondary"> </button></td></tr>`),bu=q(`<form class="card row svelte-1jknolv"><label>Új iskola neve <input type="text"/></label> <button type="submit">Iskola létrehozása</button></form> <div class="table-wrap"><table><thead><tr><th>Iskola</th><th>Iskolakód</th><th>Tanárok</th><th>Diákok</th><th>Állapot</th><th>Műveletek</th></tr></thead><tbody></tbody></table></div>`,1),xu=q(`<button class="small secondary">Tanári szerep elvétele</button>`),Su=q(`<button class="small danger">Törlés</button>`),Cu=q(`<tr><td> </td><td> </td><td> </td><td> </td><td class="actions svelte-1jknolv"><!> <!></td></tr>`),wu=q(`<div class="table-wrap"><table><thead><tr><th>Név</th><th>E-mail</th><th>Szerep</th><th>Iskola</th><th>Műveletek</th></tr></thead><tbody></tbody></table></div>`),Tu=q(`<div class="tabs"><button>Iskolák</button> <button>Felhasználók</button></div> <!> <!>`,1),Eu=q(`<h1>Üzemeltetés</h1> <!>`,1);function Du(e,t){it(t,!0);let n=F(`schools`),r=F(L([])),i=F(L([])),a=F(L([])),o=F(``),s=L({}),c=F(``);async function l(){I(r,(await no()).sort((e,t)=>e.name.localeCompare(t.name,`hu`)),!0),I(i,await lo(),!0);let e=[];for(let t of G(r))await ro(t.uid)&&e.push(t.uid);I(a,e,!0)}Mn(()=>(l(),Ya(()=>void l())));let u=N(()=>new Map(G(r).map(e=>[e.uid,e]))),d=e=>e?G(i).find(t=>t.id===e)?.name??`?`:`–`,f=e=>G(r).filter(t=>t.schoolId===e&&t.role===`student`).length,p=e=>e.teacherIds.map(e=>G(u).get(e)?.name??`?`).join(`, `)||`–`,m=e=>G(r).filter(t=>!G(a).includes(t.uid)&&t.role!==`teacher`&&(!t.schoolId||t.schoolId===e.id));async function h(e){I(c,``);try{await e()}catch(e){I(c,e instanceof Error?e.message:String(e),!0)}}async function g(e){e.preventDefault(),G(o).trim()&&await h(async()=>{await fo(G(o).trim()),I(o,``)})}async function _(e){let t=s[e.id];t&&await h(async()=>{await ho(t,e.id),s[e.id]=``})}async function v(e){confirm(`Elveszi ${e.name} tanári szerepét? Ha ő az utolsó tanár, az iskolának nem marad tanára.`)&&await h(()=>go(e.uid,!0))}async function y(e){confirm(`Véglegesen törli ${e.name} fiókját és minden adatát (haladás, statisztika, eredmények)? Ez nem vonható vissza.`)&&await h(async()=>{await To(e.uid),e.uid===$.uid&&(location.hash=`/belepes`)})}let b={admin:`üzemeltető`,teacher:`tanár`,student:`diák`};var x=Eu(),S=V(z(x),2),C=e=>{J(e,gu())},w=e=>{var t=Tu(),l=z(t),u=R(l);let x;var S=V(u,2);let C;A(l);var w=V(l,2),T=e=>{var t=_u(),n=B(t,!0);H(()=>Y(n,G(c))),J(e,t)};X(w,e=>{G(c)&&e(T)});var E=V(w,2),D=e=>{var t=bu(),n=z(t),r=R(n),a=V(R(r));Zi(a),A(r),j(2),A(n);var c=V(n,2),l=R(c),u=V(R(l));Z(u,21,()=>G(i),e=>e.id,(e,t)=>{var n=yu(),r=R(n),i=B(r,!0),a=V(r),o=B(R(a),!0);A(a);var c=V(a),l=B(c,!0),u=V(c),d=B(u,!0),g=V(u),v=B(g,!0),y=V(g),b=R(y),x=R(b);x.value=x.__value=``,Z(V(x),17,()=>m(G(t)),e=>e.uid,(e,t)=>{var n=vu(),r=B(n),i={};H(()=>{Y(r,`${G(t).name??``} (${G(t).email??``})`),i!==(i=G(t).uid)&&(n.value=(n.__value=i)??``)}),J(e,n)}),A(b),Ri(b);var S=V(b,2),C=V(S,2),w=B(C,!0);A(y),A(n),H((e,n)=>{Y(i,G(t).name),Y(o,G(t).joinCode),Y(l,e),Y(d,n),Y(v,G(t).disabled?`letiltva`:`aktív`),S.disabled=!s[G(t).id],Y(w,G(t).disabled?`Engedélyezés`:`Letiltás`)},[()=>p(G(t)),()=>f(G(t).id)]),zi(b,()=>s[G(t).id],e=>s[G(t).id]=e),K(`click`,S,()=>_(G(t))),K(`click`,C,()=>h(()=>po(G(t).id,!G(t).disabled))),J(e,n)}),A(u),A(l),A(c),Ur(`submit`,n,g),aa(a,()=>G(o),e=>I(o,e)),J(e,t)},ee=e=>{var t=wu(),n=R(t),i=V(R(n));Z(i,21,()=>G(r),e=>e.uid,(e,t)=>{var n=Cu(),r=R(n),i=B(r,!0),o=V(r),s=B(o,!0),c=V(o),l=B(c,!0),u=V(c),f=B(u,!0),p=V(u),m=R(p),h=e=>{var n=xu();K(`click`,n,()=>v(G(t))),J(e,n)};X(m,e=>{G(t).role===`teacher`&&e(h)});var g=V(m,2),_=e=>{var n=Su();K(`click`,n,()=>y(G(t))),J(e,n)},x=N(()=>!G(a).includes(G(t).uid));X(g,e=>{G(x)&&e(_)}),A(p),A(n),H((e,n)=>{Y(i,G(t).name),Y(s,G(t).email),Y(l,e),Y(f,n)},[()=>G(a).includes(G(t).uid)?`üzemeltető`:b[G(t).role],()=>d(G(t).schoolId)]),J(e,n)}),A(i),A(n),A(t),J(e,t)};X(E,e=>{G(n)===`schools`?e(D):e(ee,-1)}),H(()=>{x=ji(u,1,``,null,x,{active:G(n)===`schools`}),C=ji(S,1,``,null,C,{active:G(n)===`users`})}),K(`click`,u,()=>I(n,`schools`)),K(`click`,S,()=>I(n,`users`)),J(e,t)};X(S,e=>{$.admin?e(w,-1):e(C)}),J(e,x),at()}Wr([`click`]);var Ou=q(`<span class="error">Nincs magyar felolvasóhang a böngészőben.</span>`),ku=q(`<h1>Beállítások</h1> <div class="card box svelte-1ozf5k3"><h2 class="svelte-1ozf5k3">Saját beállítások</h2> <label><input type="checkbox"/> Képernyő-billentyűzet</label> <label><input type="checkbox"/> Diktálás (betűzés)</label> <div><label>Tempó: <input type="range" min="60" max="150" step="5"/> <b> </b> hang/perc</label> <button class="secondary small svelte-1ozf5k3">Próba</button> <!></div> <p class="muted small svelte-1ozf5k3">Jelenleg a böngésző magyar hangja betűz; a felvett diktálóhangok később érkeznek.</p> <label><input type="checkbox"/> Leütéshang</label> <label><input type="checkbox"/> Játék hangjai</label></div> <div class="card box svelte-1ozf5k3"><h2 class="svelte-1ozf5k3">Csoport beállításai</h2> <p class="svelte-1ozf5k3">Sorban haladás: <b> </b></p> <p class="svelte-1ozf5k3">Backspace engedélyezése: <b> </b></p> <p class="muted small svelte-1ozf5k3">Ezeket a tanár állítja be, Ön nem módosíthatja.</p></div>`,1);function Au(e,t){it(t,!0);let n=N(()=>$.progress.settings),r=new ms,i=F(!1);function a(){Vo(JSON.parse(JSON.stringify({...$.progress,settings:G(n)})))}function o(){I(i,!r.available),r.start(`kéké fsfs`,G(n).tempo)}Mn(()=>()=>r.stop());var s=ku(),c=V(z(s),2),l=V(R(c),2),u=R(l);Zi(u),j(),A(l);var d=V(l,2),f=R(d);Zi(f),j(),A(d);var p=V(d,2);let m;var h=R(p),g=V(R(h));Zi(g);var _=B(V(g,2),!0);j(),A(h);var v=V(h,2),y=V(v,2),b=e=>{J(e,Ou())};X(y,e=>{G(i)&&e(b)}),A(p);var x=V(p,4),S=R(x);Zi(S),j(),A(x);var C=V(x,2),w=R(C);Zi(w),j(),A(C),A(c);var T=V(c,2),E=V(R(T),2),D=B(V(R(E)),!0);A(E);var ee=V(E,2),te=B(V(R(ee)),!0);A(ee),j(2),A(T),H(()=>{m=ji(p,1,`tempo svelte-1ozf5k3`,null,m,{off:!G(n).dictation}),Y(_,G(n).tempo),Y(D,$.settings.sequential?`be`:`ki`),Y(te,$.settings.allowBackspace?`igen`:`nem`)}),K(`change`,u,a),oa(u,()=>G(n).keyboard,e=>G(n).keyboard=e),K(`change`,f,a),oa(f,()=>G(n).dictation,e=>G(n).dictation=e),K(`change`,g,a),aa(g,()=>G(n).tempo,e=>G(n).tempo=e),K(`click`,v,o),K(`change`,S,a),oa(S,()=>G(n).clickSound,e=>G(n).clickSound=e),K(`change`,w,a),oa(w,()=>G(n).gameSound,e=>G(n).gameSound=e),J(e,s),at()}Wr([`change`,`click`]);var ju=q(`<h1>Adatkezelési tájékoztató</h1> <div class="card"><p>Ez a gépírás-oktató alkalmazás <strong>próbaváltozata</strong>. Ebben a változatban minden adat (nevek, eredmények, statisztikák) <strong>csak ebben a böngészőben</strong> tárolódik, sehová nem kerül el.</p> <p>Az éles változatban a bejelentkezés Google-fiókkal történik. Csak a felhasználó nevét, e-mail-címét és gépelési eredményeit tároljuk, a Google Firebase szolgáltatásában (Európai Unióban). Az adatokat a felhasználó iskolájának tanárai látják; a csoporttársak csak a nevet és a haladást (hol tart, csillagok), e-mail-címet és részletes statisztikát nem.</p> <p>A fiók és az adatok kérésre törölhetők: a diák kérésére a tanára vagy az üzemeltető törli.</p></div>`,1);function Mu(e){var t=ju();j(2),J(e,t)}var Nu=q(`<a href="#/csoportom">Csoportom</a>`),Pu=q(`<a href="#/tanar">Tanári felület</a>`),Fu=q(`<a href="#/admin">Üzemeltetés</a>`),Iu=q(`<span> </span> <button class="link">Kilépés</button>`,1),Lu=q(`<span class="muted">Vendég</span> <a class="btn small" href="#/belepes">Belépés</a>`,1),Ru=q(`<header class="top"><a class="brand" href="#/">Gépírás</a> <nav><a href="#/">Leckék</a> <a href="#/eredmenyeim">Eredményeim</a> <!> <!> <!> <a href="#/beallitasok">Beállítások</a></nav> <div class="who"><!></div></header> <div class="demo-banner">Demó változat: az adatok csak ebben a böngészőben tárolódnak. <a href="#/belepes">Felhasználó váltása</a></div>`,1),zu=q(`<p class="muted">Betöltés…</p>`),Bu=q(`<footer><a href="#/adatkezeles">Adatkezelési tájékoztató</a></footer>`),Vu=q(`<!> <main><!></main> <!>`,1);function Hu(e,t){it(t,!0),Ro();let n=N(()=>ya.path),r=N(()=>xa(`/lecke/:id`,G(n))),i=N(()=>$.user?.role??null),a=N(()=>!!G(r)||G(n).startsWith(`/jatek`));var o=Vu(),s=z(o),c=e=>{var t=Ru(),r=z(t),a=V(R(r),2),o=R(a);let s;var c=V(o,2);let l;var u=V(c,2),d=e=>{var t=Nu();let r;H(()=>r=ji(t,1,``,null,r,{active:G(n)===`/csoportom`})),J(e,t)};X(u,e=>{G(i)===`student`&&$.user?.groupId&&e(d)});var f=V(u,2),p=e=>{var t=Pu();let r;H(e=>r=ji(t,1,``,null,r,{active:e}),[()=>G(n).startsWith(`/tanar`)]),J(e,t)};X(f,e=>{G(i)===`teacher`&&e(p)});var m=V(f,2),h=e=>{var t=Fu();let r;H(e=>r=ji(t,1,``,null,r,{active:e}),[()=>G(n).startsWith(`/admin`)]),J(e,t)};X(m,e=>{$.admin&&e(h)});var g=V(m,2);let _;A(a);var v=V(a,2),y=R(v),b=e=>{var t=Iu(),n=z(t),r=B(n,!0),i=V(n,2);H(()=>Y(r,$.user.name)),K(`click`,i,()=>Bo()),J(e,t)},x=e=>{var t=Lu();j(2),J(e,t)};X(y,e=>{$.user?e(b):e(x,-1)}),A(v),A(r),j(2),H(()=>{s=ji(o,1,``,null,s,{active:G(n)===`/`}),l=ji(c,1,``,null,l,{active:G(n)===`/eredmenyeim`}),_=ji(g,1,``,null,_,{active:G(n)===`/beallitasok`})}),J(e,t)};X(s,e=>{G(a)||e(c)});var l=V(s,2);let u;var d=R(l),f=e=>{J(e,zu())},p=e=>{var t=$r();ui(z(t),()=>G(r).id,e=>{Us(e,{get id(){return G(r).id}})}),J(e,t)},m=e=>{bc(e,{})},h=N(()=>G(n).startsWith(`/jatek/betueso`)),g=e=>{el(e,{})},_=e=>{dl(e,{})},v=e=>{_l(e,{})},y=e=>{hu(e,{})},b=N(()=>G(n).startsWith(`/tanar`)),x=e=>{Du(e,{})},S=N(()=>G(n).startsWith(`/admin`)),C=e=>{Au(e,{})},w=e=>{Mu(e,{})},T=e=>{ss(e,{})};X(d,e=>{$.ready?G(r)?e(p,1):G(h)?e(m,2):G(n)===`/eredmenyeim`?e(g,3):G(n)===`/csoportom`?e(_,4):G(n)===`/belepes`?e(v,5):G(b)?e(y,6):G(S)?e(x,7):G(n)===`/beallitasok`?e(C,8):G(n)===`/adatkezeles`?e(w,9):e(T,-1):e(f)}),A(l);var E=V(l,2),D=e=>{J(e,Bu())};X(E,e=>{G(a)||e(D)}),H(()=>u=ji(l,1,``,null,u,{focus:G(a)})),J(e,o),at()}Wr([`click`]),ii(Hu,{target:document.getElementById(`app`)});export{o as t};