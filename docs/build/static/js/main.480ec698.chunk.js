(window.webpackJsonp=window.webpackJsonp||[]).push([[0],[,,,,,,,,function(e,t,n){e.exports=n(17)},,,,,,function(e,t,n){},function(e,t,n){},function(e,t,n){},function(e,t,n){"use strict";n.r(t);var a=n(0),i=n.n(a),o=n(7),r=n.n(o),s=(n(14),n(1)),c=n(2),l=n(4),u=n(3),m=n(5),f=(n(15),function(){function e(){self.remainingTicks--,console.log(self.remainingTicks),a(),0===self.remainingTicks&&(new Notification("Break complete."),clearInterval(self.countdown),n())}function t(){self.remainingTicks--,console.log(self.remainingTicks),a(),0===self.remainingTicks&&(new Notification("Look away from the screen for 20 seconds."),clearInterval(self.countdown),self.remainingTicks=20,self.mode="break",self.countdown=setInterval(e,1e3))}function n(){self.remainingTicks=1200,self.mode="screenTime",self.countdown=setInterval(t,1e3)}function a(){self.postMessage({mode:self.mode,remainingTicks:self.remainingTicks})}self.addEventListener("message",function(e){"start"===e.data?n():(clearInterval(self.countdown),self.mode="stopped",self.remainingTicks=1200),a()},!1)}),d=function e(t){Object(s.a)(this,e);var n=t.toString(),a=new Blob(["("+n+")()"]);return new Worker(URL.createObjectURL(a))},h=function(e){function t(e){var n;Object(s.a)(this,t),n=Object(l.a)(this,Object(u.a)(t).call(this,e));var a=new d(f);return a.addEventListener("message",function(e){n.setState(e.data),console.log("Message from Worker: "+e.data)}),n.state={worker:a,formatter:new Intl.RelativeTimeFormat("en",{localeMatcher:"best fit",number:"always",style:"short"}),mode:"stopped",remainingTicks:1200},n}return Object(m.a)(t,e),Object(c.a)(t,[{key:"startTimer",value:function(){this.state.worker.postMessage("start")}},{key:"stopTimer",value:function(){this.state.worker.postMessage("stop")}},{key:"render",value:function(){var e=this,t=this.state.remainingTicks/1200*100,n=this.state.remainingTicks%60,a=(this.state.remainingTicks-n)/60;return i.a.createElement("div",{className:"timer"},i.a.createElement("div",{className:"donut-chart"},i.a.createElement("svg",{width:"100%",height:"100%",viewBox:"0 0 42 42",className:"donut"},i.a.createElement("circle",{class:"donut-hole",cx:"21",cy:"21",r:"15.91549430918954",fill:"transparent"}),i.a.createElement("circle",{class:"donut-ring",cx:"21",cy:"21",r:"15.91549430918954",fill:"transparent",stroke:"#FFFFFF22","stroke-width":"5"}),i.a.createElement("circle",{class:"donut-segment",cx:"21",cy:"21",r:"15.91549430918954",fill:"transparent",stroke:"#FFFFFFAA","stroke-width":"5","stroke-dasharray":"".concat(100-t," ").concat(t),"stroke-dashoffset":"25"})),i.a.createElement("span",{className:"count-down"},"".concat(a,":").concat(("0"+n).slice(-2)))),"stopped"===this.state.mode?i.a.createElement("button",{onClick:function(){return e.startTimer()}},"Start"):i.a.createElement("button",{onClick:function(){return e.stopTimer()}},"Stop"))}}]),t}(i.a.Component),k=(n(16),function(e){function t(){return Object(s.a)(this,t),Object(l.a)(this,Object(u.a)(t).apply(this,arguments))}return Object(m.a)(t,e),Object(c.a)(t,[{key:"render",value:function(){var e=this;return i.a.createElement("div",null,i.a.createElement("h3",null,"You must have nofications enabled to use this website."),i.a.createElement("button",{onClick:function(){return e.props.enableNotifications()}},"ENABLE"))}}]),t}(i.a.Component)),p=function(e){function t(){var e,n;Object(s.a)(this,t);for(var a=arguments.length,i=new Array(a),o=0;o<a;o++)i[o]=arguments[o];return(n=Object(l.a)(this,(e=Object(u.a)(t)).call.apply(e,[this].concat(i)))).state={notificationsEnabled:"granted"===Notification.permission},n}return Object(m.a)(t,e),Object(c.a)(t,[{key:"enableNotifications",value:function(){var e=this;Notification.requestPermission().then(function(t){e.setState({notificationsEnabled:"granted"===t})})}},{key:"render",value:function(){var e=this;return i.a.createElement("div",{className:"App"},i.a.createElement("h1",null,"Prevent Computer Eye Strain with the 20-20-20 Rule"),i.a.createElement("h2",null,"Every ",i.a.createElement("em",null,"20")," minutes of screen time look at least ",i.a.createElement("em",null,"20")," feet away for ",i.a.createElement("em",null,"20")," seconds"),this.state.notificationsEnabled?i.a.createElement(h,null):i.a.createElement(k,{enableNotifications:function(){return e.enableNotifications()}}))}}]),t}(i.a.Component);Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));r.a.render(i.a.createElement(p,null),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then(function(e){e.unregister()})}],[[8,1,2]]]);
//# sourceMappingURL=main.480ec698.chunk.js.map