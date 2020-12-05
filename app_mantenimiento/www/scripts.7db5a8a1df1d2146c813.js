!function(t,e,i,n){"use strict";function r(t,e,i){return setTimeout(u(t,i),e)}function s(t,e,i){return!!Array.isArray(t)&&(o(t,i[e],i),!0)}function o(t,e,i){var r;if(t)if(t.forEach)t.forEach(e,i);else if(t.length!==n)for(r=0;r<t.length;)e.call(i,t[r],r,t),r++;else for(r in t)t.hasOwnProperty(r)&&e.call(i,t[r],r,t)}function a(e,i,n){var r="DEPRECATED METHOD: "+i+"\n"+n+" AT \n";return function(){var i=new Error("get-stack-trace"),n=i&&i.stack?i.stack.replace(/^[^\(]+?[\n$]/gm,"").replace(/^\s+at\s+/gm,"").replace(/^Object.<anonymous>\s*\(/gm,"{anonymous}()@"):"Unknown Stack Trace",s=t.console&&(t.console.warn||t.console.log);return s&&s.call(t.console,r,n),e.apply(this,arguments)}}function h(t,e,i){var n,r=e.prototype;(n=t.prototype=Object.create(r)).constructor=t,n._super=r,i&&nt(n,i)}function u(t,e){return function(){return t.apply(e,arguments)}}function c(t,e){return typeof t==ot?t.apply(e&&e[0]||n,e):t}function l(t,e){return t===n?e:t}function p(t,e,i){o(m(e),function(e){t.addEventListener(e,i,!1)})}function f(t,e,i){o(m(e),function(e){t.removeEventListener(e,i,!1)})}function d(t,e){for(;t;){if(t==e)return!0;t=t.parentNode}return!1}function v(t,e){return t.indexOf(e)>-1}function m(t){return t.trim().split(/\s+/g)}function g(t,e,i){if(t.indexOf&&!i)return t.indexOf(e);for(var n=0;n<t.length;){if(i&&t[n][i]==e||!i&&t[n]===e)return n;n++}return-1}function T(t){return Array.prototype.slice.call(t,0)}function y(t,e,i){for(var n=[],r=[],s=0;s<t.length;){var o=e?t[s][e]:t[s];g(r,o)<0&&n.push(t[s]),r[s]=o,s++}return i&&(n=e?n.sort(function(t,i){return t[e]>i[e]}):n.sort()),n}function E(t,e){for(var i,r,s=e[0].toUpperCase()+e.slice(1),o=0;o<rt.length;){if((r=(i=rt[o])?i+s:e)in t)return r;o++}return n}function I(e){var i=e.ownerDocument||e;return i.defaultView||i.parentWindow||t}function A(t,e){var i=this;this.manager=t,this.callback=e,this.element=t.element,this.target=t.options.inputTarget,this.domHandler=function(e){c(t.options.enable,[t])&&i.handler(e)},this.init()}function _(t,e,i){var n=i.pointers.length,r=i.changedPointers.length,s=e&yt&&n-r==0,o=e&(It|At)&&n-r==0;i.isFirst=!!s,i.isFinal=!!o,s&&(t.session={}),i.eventType=e,function(t,e){var i=t.session,n=e.pointers,r=n.length;i.firstInput||(i.firstInput=S(e)),r>1&&!i.firstMultiple?i.firstMultiple=S(e):1===r&&(i.firstMultiple=!1);var s=i.firstInput,o=i.firstMultiple,a=o?o.center:s.center,h=e.center=b(n);e.timeStamp=ut(),e.deltaTime=e.timeStamp-s.timeStamp,e.angle=w(a,h),e.distance=x(a,h),function(t,e){var i=e.center,n=t.offsetDelta||{},r=t.prevDelta||{},s=t.prevInput||{};e.eventType!==yt&&s.eventType!==It||(r=t.prevDelta={x:s.deltaX||0,y:s.deltaY||0},n=t.offsetDelta={x:i.x,y:i.y}),e.deltaX=r.x+(i.x-n.x),e.deltaY=r.y+(i.y-n.y)}(i,e),e.offsetDirection=D(e.deltaX,e.deltaY);var u=P(e.deltaTime,e.deltaX,e.deltaY);e.overallVelocityX=u.x,e.overallVelocityY=u.y,e.overallVelocity=ht(u.x)>ht(u.y)?u.x:u.y,e.scale=o?function(t,e){return x(e[0],e[1],Rt)/x(t[0],t[1],Rt)}(o.pointers,n):1,e.rotation=o?function(t,e){return w(e[1],e[0],Rt)+w(t[1],t[0],Rt)}(o.pointers,n):0,e.maxPointers=i.prevInput?e.pointers.length>i.prevInput.maxPointers?e.pointers.length:i.prevInput.maxPointers:e.pointers.length,C(i,e);var c=t.element;d(e.srcEvent.target,c)&&(c=e.srcEvent.target),e.target=c}(t,i),t.emit("hammer.input",i),t.recognize(i),t.session.prevInput=i}function C(t,e){var i,r,s,o,a=t.lastInterval||e,h=e.timeStamp-a.timeStamp;if(e.eventType!=At&&(h>Tt||a.velocity===n)){var u=e.deltaX-a.deltaX,c=e.deltaY-a.deltaY,l=P(h,u,c);r=l.x,s=l.y,i=ht(l.x)>ht(l.y)?l.x:l.y,o=D(u,c),t.lastInterval=e}else i=a.velocity,r=a.velocityX,s=a.velocityY,o=a.direction;e.velocity=i,e.velocityX=r,e.velocityY=s,e.direction=o}function S(t){for(var e=[],i=0;i<t.pointers.length;)e[i]={clientX:at(t.pointers[i].clientX),clientY:at(t.pointers[i].clientY)},i++;return{timeStamp:ut(),pointers:e,center:b(e),deltaX:t.deltaX,deltaY:t.deltaY}}function b(t){var e=t.length;if(1===e)return{x:at(t[0].clientX),y:at(t[0].clientY)};for(var i=0,n=0,r=0;e>r;)i+=t[r].clientX,n+=t[r].clientY,r++;return{x:at(i/e),y:at(n/e)}}function P(t,e,i){return{x:e/t||0,y:i/t||0}}function D(t,e){return t===e?_t:ht(t)>=ht(e)?0>t?Ct:St:0>e?bt:Pt}function x(t,e,i){i||(i=Ot);var n=e[i[0]]-t[i[0]],r=e[i[1]]-t[i[1]];return Math.sqrt(n*n+r*r)}function w(t,e,i){i||(i=Ot);var n=e[i[0]]-t[i[0]],r=e[i[1]]-t[i[1]];return 180*Math.atan2(r,n)/Math.PI}function O(){this.evEl=zt,this.evWin=Nt,this.pressed=!1,A.apply(this,arguments)}function R(){this.evEl=Ft,this.evWin=Wt,A.apply(this,arguments),this.store=this.manager.session.pointerEvents=[]}function M(){this.evTarget=kt,this.evWin=Ht,this.started=!1,A.apply(this,arguments)}function z(t,e){var i=T(t.touches),n=T(t.changedTouches);return e&(It|At)&&(i=y(i.concat(n),"identifier",!0)),[i,n]}function N(){this.evTarget=Ut,this.targetIds={},A.apply(this,arguments)}function X(t,e){var i=T(t.touches),n=this.targetIds;if(e&(yt|Et)&&1===i.length)return n[i[0].identifier]=!0,[i,i];var r,s,o=T(t.changedTouches),a=[],h=this.target;if(s=i.filter(function(t){return d(t.target,h)}),e===yt)for(r=0;r<s.length;)n[s[r].identifier]=!0,r++;for(r=0;r<o.length;)n[o[r].identifier]&&a.push(o[r]),e&(It|At)&&delete n[o[r].identifier],r++;return a.length?[y(s.concat(a),"identifier",!0),a]:void 0}function Y(){A.apply(this,arguments);var t=u(this.handler,this);this.touch=new N(this.manager,t),this.mouse=new O(this.manager,t),this.primaryTouch=null,this.lastTouches=[]}function F(t,e){t&yt?(this.primaryTouch=e.changedPointers[0].identifier,W.call(this,e)):t&(It|At)&&W.call(this,e)}function W(t){var e=t.changedPointers[0];if(e.identifier===this.primaryTouch){var i={x:e.clientX,y:e.clientY};this.lastTouches.push(i);var n=this.lastTouches;setTimeout(function(){var t=n.indexOf(i);t>-1&&n.splice(t,1)},Vt)}}function q(t){for(var e=t.srcEvent.clientX,i=t.srcEvent.clientY,n=0;n<this.lastTouches.length;n++){var r=this.lastTouches[n],s=Math.abs(e-r.x),o=Math.abs(i-r.y);if(jt>=s&&jt>=o)return!0}return!1}function k(t,e){this.manager=t,this.set(e)}function H(t){this.options=nt({},this.defaults,t||{}),this.id=pt++,this.manager=null,this.options.enable=l(this.options.enable,!0),this.state=ie,this.simultaneous={},this.requireFail=[]}function L(t){return t&ae?"cancel":t&se?"end":t&re?"move":t&ne?"start":""}function U(t){return t==Pt?"down":t==bt?"up":t==Ct?"left":t==St?"right":""}function V(t,e){var i=e.manager;return i?i.get(t):t}function j(){H.apply(this,arguments)}function G(){j.apply(this,arguments),this.pX=null,this.pY=null}function Z(){j.apply(this,arguments)}function B(){H.apply(this,arguments),this._timer=null,this._input=null}function $(){j.apply(this,arguments)}function J(){j.apply(this,arguments)}function K(){H.apply(this,arguments),this.pTime=!1,this.pCenter=!1,this._timer=null,this._input=null,this.count=0}function Q(t,e){return(e=e||{}).recognizers=l(e.recognizers,Q.defaults.preset),new tt(t,e)}function tt(t,e){this.options=nt({},Q.defaults,e||{}),this.options.inputTarget=this.options.inputTarget||t,this.handlers={},this.session={},this.recognizers=[],this.oldCssProps={},this.element=t,this.input=function(t){return new(t.options.inputClass||(dt?R:vt?N:ft?Y:O))(t,_)}(this),this.touchAction=new k(this,this.options.touchAction),et(this,!0),o(this.options.recognizers,function(t){var e=this.add(new t[0](t[1]));t[2]&&e.recognizeWith(t[2]),t[3]&&e.requireFailure(t[3])},this)}function et(t,e){var i,n=t.element;n.style&&(o(t.options.cssProps,function(r,s){i=E(n.style,s),e?(t.oldCssProps[i]=n.style[i],n.style[i]=r):n.style[i]=t.oldCssProps[i]||""}),e||(t.oldCssProps={}))}function it(t,i){var n=e.createEvent("Event");n.initEvent(t,!0,!0),n.gesture=i,i.target.dispatchEvent(n)}var nt,rt=["","webkit","Moz","MS","ms","o"],st=e.createElement("div"),ot="function",at=Math.round,ht=Math.abs,ut=Date.now;nt="function"!=typeof Object.assign?function(t){if(t===n||null===t)throw new TypeError("Cannot convert undefined or null to object");for(var e=Object(t),i=1;i<arguments.length;i++){var r=arguments[i];if(r!==n&&null!==r)for(var s in r)r.hasOwnProperty(s)&&(e[s]=r[s])}return e}:Object.assign;var ct=a(function(t,e,i){for(var r=Object.keys(e),s=0;s<r.length;)(!i||i&&t[r[s]]===n)&&(t[r[s]]=e[r[s]]),s++;return t},"extend","Use `assign`."),lt=a(function(t,e){return ct(t,e,!0)},"merge","Use `assign`."),pt=1,ft="ontouchstart"in t,dt=E(t,"PointerEvent")!==n,vt=ft&&/mobile|tablet|ip(ad|hone|od)|android/i.test(navigator.userAgent),mt="touch",gt="mouse",Tt=25,yt=1,Et=2,It=4,At=8,_t=1,Ct=2,St=4,bt=8,Pt=16,Dt=Ct|St,xt=bt|Pt,wt=Dt|xt,Ot=["x","y"],Rt=["clientX","clientY"];A.prototype={handler:function(){},init:function(){this.evEl&&p(this.element,this.evEl,this.domHandler),this.evTarget&&p(this.target,this.evTarget,this.domHandler),this.evWin&&p(I(this.element),this.evWin,this.domHandler)},destroy:function(){this.evEl&&f(this.element,this.evEl,this.domHandler),this.evTarget&&f(this.target,this.evTarget,this.domHandler),this.evWin&&f(I(this.element),this.evWin,this.domHandler)}};var Mt={mousedown:yt,mousemove:Et,mouseup:It},zt="mousedown",Nt="mousemove mouseup";h(O,A,{handler:function(t){var e=Mt[t.type];e&yt&&0===t.button&&(this.pressed=!0),e&Et&&1!==t.which&&(e=It),this.pressed&&(e&It&&(this.pressed=!1),this.callback(this.manager,e,{pointers:[t],changedPointers:[t],pointerType:gt,srcEvent:t}))}});var Xt={pointerdown:yt,pointermove:Et,pointerup:It,pointercancel:At,pointerout:At},Yt={2:mt,3:"pen",4:gt,5:"kinect"},Ft="pointerdown",Wt="pointermove pointerup pointercancel";t.MSPointerEvent&&!t.PointerEvent&&(Ft="MSPointerDown",Wt="MSPointerMove MSPointerUp MSPointerCancel"),h(R,A,{handler:function(t){var e=this.store,i=!1,n=t.type.toLowerCase().replace("ms",""),r=Xt[n],s=Yt[t.pointerType]||t.pointerType,o=s==mt,a=g(e,t.pointerId,"pointerId");r&yt&&(0===t.button||o)?0>a&&(e.push(t),a=e.length-1):r&(It|At)&&(i=!0),0>a||(e[a]=t,this.callback(this.manager,r,{pointers:e,changedPointers:[t],pointerType:s,srcEvent:t}),i&&e.splice(a,1))}});var qt={touchstart:yt,touchmove:Et,touchend:It,touchcancel:At},kt="touchstart",Ht="touchstart touchmove touchend touchcancel";h(M,A,{handler:function(t){var e=qt[t.type];if(e===yt&&(this.started=!0),this.started){var i=z.call(this,t,e);e&(It|At)&&i[0].length-i[1].length==0&&(this.started=!1),this.callback(this.manager,e,{pointers:i[0],changedPointers:i[1],pointerType:mt,srcEvent:t})}}});var Lt={touchstart:yt,touchmove:Et,touchend:It,touchcancel:At},Ut="touchstart touchmove touchend touchcancel";h(N,A,{handler:function(t){var e=Lt[t.type],i=X.call(this,t,e);i&&this.callback(this.manager,e,{pointers:i[0],changedPointers:i[1],pointerType:mt,srcEvent:t})}});var Vt=2500,jt=25;h(Y,A,{handler:function(t,e,i){var n=i.pointerType==mt,r=i.pointerType==gt;if(!(r&&i.sourceCapabilities&&i.sourceCapabilities.firesTouchEvents)){if(n)F.call(this,e,i);else if(r&&q.call(this,i))return;this.callback(t,e,i)}},destroy:function(){this.touch.destroy(),this.mouse.destroy()}});var Gt=E(st.style,"touchAction"),Zt=Gt!==n,Bt="compute",$t="auto",Jt="manipulation",Kt="none",Qt="pan-x",te="pan-y",ee=function(){if(!Zt)return!1;var e={},i=t.CSS&&t.CSS.supports;return["auto","manipulation","pan-y","pan-x","pan-x pan-y","none"].forEach(function(n){e[n]=!i||t.CSS.supports("touch-action",n)}),e}();k.prototype={set:function(t){t==Bt&&(t=this.compute()),Zt&&this.manager.element.style&&ee[t]&&(this.manager.element.style[Gt]=t),this.actions=t.toLowerCase().trim()},update:function(){this.set(this.manager.options.touchAction)},compute:function(){var t=[];return o(this.manager.recognizers,function(e){c(e.options.enable,[e])&&(t=t.concat(e.getTouchAction()))}),function(t){if(v(t,Kt))return Kt;var e=v(t,Qt),i=v(t,te);return e&&i?Kt:e||i?e?Qt:te:v(t,Jt)?Jt:$t}(t.join(" "))},preventDefaults:function(t){var e=t.srcEvent,i=t.offsetDirection;if(!this.manager.session.prevented){var n=this.actions,r=v(n,Kt)&&!ee[Kt],s=v(n,te)&&!ee[te],o=v(n,Qt)&&!ee[Qt];if(r){var a=1===t.pointers.length,h=t.distance<2,u=t.deltaTime<250;if(a&&h&&u)return}return o&&s?void 0:r||s&&i&Dt||o&&i&xt?this.preventSrc(e):void 0}e.preventDefault()},preventSrc:function(t){this.manager.session.prevented=!0,t.preventDefault()}};var ie=1,ne=2,re=4,se=8,oe=se,ae=16,he=32;H.prototype={defaults:{},set:function(t){return nt(this.options,t),this.manager&&this.manager.touchAction.update(),this},recognizeWith:function(t){if(s(t,"recognizeWith",this))return this;var e=this.simultaneous;return e[(t=V(t,this)).id]||(e[t.id]=t,t.recognizeWith(this)),this},dropRecognizeWith:function(t){return s(t,"dropRecognizeWith",this)||(t=V(t,this),delete this.simultaneous[t.id]),this},requireFailure:function(t){if(s(t,"requireFailure",this))return this;var e=this.requireFail;return-1===g(e,t=V(t,this))&&(e.push(t),t.requireFailure(this)),this},dropRequireFailure:function(t){if(s(t,"dropRequireFailure",this))return this;t=V(t,this);var e=g(this.requireFail,t);return e>-1&&this.requireFail.splice(e,1),this},hasRequireFailures:function(){return this.requireFail.length>0},canRecognizeWith:function(t){return!!this.simultaneous[t.id]},emit:function(t){function e(e){i.manager.emit(e,t)}var i=this,n=this.state;se>n&&e(i.options.event+L(n)),e(i.options.event),t.additionalEvent&&e(t.additionalEvent),n>=se&&e(i.options.event+L(n))},tryEmit:function(t){return this.canEmit()?this.emit(t):void(this.state=he)},canEmit:function(){for(var t=0;t<this.requireFail.length;){if(!(this.requireFail[t].state&(he|ie)))return!1;t++}return!0},recognize:function(t){var e=nt({},t);return c(this.options.enable,[this,e])?(this.state&(oe|ae|he)&&(this.state=ie),this.state=this.process(e),void(this.state&(ne|re|se|ae)&&this.tryEmit(e))):(this.reset(),void(this.state=he))},process:function(t){},getTouchAction:function(){},reset:function(){}},h(j,H,{defaults:{pointers:1},attrTest:function(t){var e=this.options.pointers;return 0===e||t.pointers.length===e},process:function(t){var e=this.state,i=t.eventType,n=e&(ne|re),r=this.attrTest(t);return n&&(i&At||!r)?e|ae:n||r?i&It?e|se:e&ne?e|re:ne:he}}),h(G,j,{defaults:{event:"pan",threshold:10,pointers:1,direction:wt},getTouchAction:function(){var t=this.options.direction,e=[];return t&Dt&&e.push(te),t&xt&&e.push(Qt),e},directionTest:function(t){var e=this.options,i=!0,n=t.distance,r=t.direction,s=t.deltaX,o=t.deltaY;return r&e.direction||(e.direction&Dt?(r=0===s?_t:0>s?Ct:St,i=s!=this.pX,n=Math.abs(t.deltaX)):(r=0===o?_t:0>o?bt:Pt,i=o!=this.pY,n=Math.abs(t.deltaY))),t.direction=r,i&&n>e.threshold&&r&e.direction},attrTest:function(t){return j.prototype.attrTest.call(this,t)&&(this.state&ne||!(this.state&ne)&&this.directionTest(t))},emit:function(t){this.pX=t.deltaX,this.pY=t.deltaY;var e=U(t.direction);e&&(t.additionalEvent=this.options.event+e),this._super.emit.call(this,t)}}),h(Z,j,{defaults:{event:"pinch",threshold:0,pointers:2},getTouchAction:function(){return[Kt]},attrTest:function(t){return this._super.attrTest.call(this,t)&&(Math.abs(t.scale-1)>this.options.threshold||this.state&ne)},emit:function(t){if(1!==t.scale){var e=t.scale<1?"in":"out";t.additionalEvent=this.options.event+e}this._super.emit.call(this,t)}}),h(B,H,{defaults:{event:"press",pointers:1,time:251,threshold:9},getTouchAction:function(){return[$t]},process:function(t){var e=this.options,i=t.pointers.length===e.pointers,n=t.distance<e.threshold,s=t.deltaTime>e.time;if(this._input=t,!n||!i||t.eventType&(It|At)&&!s)this.reset();else if(t.eventType&yt)this.reset(),this._timer=r(function(){this.state=oe,this.tryEmit()},e.time,this);else if(t.eventType&It)return oe;return he},reset:function(){clearTimeout(this._timer)},emit:function(t){this.state===oe&&(t&&t.eventType&It?this.manager.emit(this.options.event+"up",t):(this._input.timeStamp=ut(),this.manager.emit(this.options.event,this._input)))}}),h($,j,{defaults:{event:"rotate",threshold:0,pointers:2},getTouchAction:function(){return[Kt]},attrTest:function(t){return this._super.attrTest.call(this,t)&&(Math.abs(t.rotation)>this.options.threshold||this.state&ne)}}),h(J,j,{defaults:{event:"swipe",threshold:10,velocity:.3,direction:Dt|xt,pointers:1},getTouchAction:function(){return G.prototype.getTouchAction.call(this)},attrTest:function(t){var e,i=this.options.direction;return i&(Dt|xt)?e=t.overallVelocity:i&Dt?e=t.overallVelocityX:i&xt&&(e=t.overallVelocityY),this._super.attrTest.call(this,t)&&i&t.offsetDirection&&t.distance>this.options.threshold&&t.maxPointers==this.options.pointers&&ht(e)>this.options.velocity&&t.eventType&It},emit:function(t){var e=U(t.offsetDirection);e&&this.manager.emit(this.options.event+e,t),this.manager.emit(this.options.event,t)}}),h(K,H,{defaults:{event:"tap",pointers:1,taps:1,interval:300,time:250,threshold:9,posThreshold:10},getTouchAction:function(){return[Jt]},process:function(t){var e=this.options,i=t.pointers.length===e.pointers,n=t.distance<e.threshold,s=t.deltaTime<e.time;if(this.reset(),t.eventType&yt&&0===this.count)return this.failTimeout();if(n&&s&&i){if(t.eventType!=It)return this.failTimeout();var o=!this.pTime||t.timeStamp-this.pTime<e.interval,a=!this.pCenter||x(this.pCenter,t.center)<e.posThreshold;if(this.pTime=t.timeStamp,this.pCenter=t.center,a&&o?this.count+=1:this.count=1,this._input=t,0===this.count%e.taps)return this.hasRequireFailures()?(this._timer=r(function(){this.state=oe,this.tryEmit()},e.interval,this),ne):oe}return he},failTimeout:function(){return this._timer=r(function(){this.state=he},this.options.interval,this),he},reset:function(){clearTimeout(this._timer)},emit:function(){this.state==oe&&(this._input.tapCount=this.count,this.manager.emit(this.options.event,this._input))}}),Q.VERSION="2.0.7",Q.defaults={domEvents:!1,touchAction:Bt,enable:!0,inputTarget:null,inputClass:null,preset:[[$,{enable:!1}],[Z,{enable:!1},["rotate"]],[J,{direction:Dt}],[G,{direction:Dt},["swipe"]],[K],[K,{event:"doubletap",taps:2},["tap"]],[B]],cssProps:{userSelect:"none",touchSelect:"none",touchCallout:"none",contentZooming:"none",userDrag:"none",tapHighlightColor:"rgba(0,0,0,0)"}};tt.prototype={set:function(t){return nt(this.options,t),t.touchAction&&this.touchAction.update(),t.inputTarget&&(this.input.destroy(),this.input.target=t.inputTarget,this.input.init()),this},stop:function(t){this.session.stopped=t?2:1},recognize:function(t){var e=this.session;if(!e.stopped){this.touchAction.preventDefaults(t);var i,n=this.recognizers,r=e.curRecognizer;(!r||r&&r.state&oe)&&(r=e.curRecognizer=null);for(var s=0;s<n.length;)i=n[s],2===e.stopped||r&&i!=r&&!i.canRecognizeWith(r)?i.reset():i.recognize(t),!r&&i.state&(ne|re|se)&&(r=e.curRecognizer=i),s++}},get:function(t){if(t instanceof H)return t;for(var e=this.recognizers,i=0;i<e.length;i++)if(e[i].options.event==t)return e[i];return null},add:function(t){if(s(t,"add",this))return this;var e=this.get(t.options.event);return e&&this.remove(e),this.recognizers.push(t),t.manager=this,this.touchAction.update(),t},remove:function(t){if(s(t,"remove",this))return this;if(t=this.get(t)){var e=this.recognizers,i=g(e,t);-1!==i&&(e.splice(i,1),this.touchAction.update())}return this},on:function(t,e){if(t!==n&&e!==n){var i=this.handlers;return o(m(t),function(t){i[t]=i[t]||[],i[t].push(e)}),this}},off:function(t,e){if(t!==n){var i=this.handlers;return o(m(t),function(t){e?i[t]&&i[t].splice(g(i[t],e),1):delete i[t]}),this}},emit:function(t,e){this.options.domEvents&&it(t,e);var i=this.handlers[t]&&this.handlers[t].slice();if(i&&i.length){e.type=t,e.preventDefault=function(){e.srcEvent.preventDefault()};for(var n=0;n<i.length;)i[n](e),n++}},destroy:function(){this.element&&et(this,!1),this.handlers={},this.session={},this.input.destroy(),this.element=null}},nt(Q,{INPUT_START:yt,INPUT_MOVE:Et,INPUT_END:It,INPUT_CANCEL:At,STATE_POSSIBLE:ie,STATE_BEGAN:ne,STATE_CHANGED:re,STATE_ENDED:se,STATE_RECOGNIZED:oe,STATE_CANCELLED:ae,STATE_FAILED:he,DIRECTION_NONE:_t,DIRECTION_LEFT:Ct,DIRECTION_RIGHT:St,DIRECTION_UP:bt,DIRECTION_DOWN:Pt,DIRECTION_HORIZONTAL:Dt,DIRECTION_VERTICAL:xt,DIRECTION_ALL:wt,Manager:tt,Input:A,TouchAction:k,TouchInput:N,MouseInput:O,PointerEventInput:R,TouchMouseInput:Y,SingleTouchInput:M,Recognizer:H,AttrRecognizer:j,Tap:K,Pan:G,Swipe:J,Pinch:Z,Rotate:$,Press:B,on:p,off:f,each:o,merge:lt,extend:ct,assign:nt,inherit:h,bindFn:u,prefixed:E}),(void 0!==t?t:"undefined"!=typeof self?self:{}).Hammer=Q,"function"==typeof define&&define.amd?define(function(){return Q}):"undefined"!=typeof module&&module.exports?module.exports=Q:t.Hammer=Q}(window,document);