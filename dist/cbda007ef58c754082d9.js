/*! For license information please see cbda007ef58c754082d9.js.LICENSE.txt */
!function(e,t){function n(a,d){var l;this!==e&&this!==t&&(d=a,a=this),l=s({},l=d||{},"flat"===l.style?i.a:"drop"===l.type?i.b:i.c,{inset:l.inset?"inset":"",inverse:l.inverse?-1:1});for(var p=0;p<a.length;++p)f.push(o(a[p],l));return r||(!1!==l.followMouse&&l.angle===t&&(document.body.addEventListener("mousemove",n.frame),r=!0),e.addEventListener("resize",n.update)),n.frame(),a}function o(e,t){return s({node:e,color:e.getAttribute("data-shadow-color")||"0,0,0"},a(e),t)}function a(e){var t=e.clientWidth>>1,n=e.clientHeight>>1;do{t+=e.offsetLeft,n+=e.offsetTop}while(e=e.offsetParent);return{x:t,y:n}}var r,i={c:{length:7,opacity:.05},b:{length:4,opacity:.2},a:{length:40,opacity:1}},d=Math.PI,f=[];n.reset=function(){f=[],document.body.removeEventListener("mousemove",n.frame),e.removeEventListener("resize",n.update),r=!1},n.update=function(){for(var e,t=f.length;t--;)e=f[t],s(e,a(e.node));n.frame()},n.frame=function(n){n||(n={pageX:e.innerWidth>>1,pageY:0});for(var o,a=f.length;a--;){var r=((o=f[a]).pageX===t?n.pageX:o.pageX)-o.x,i=(o.pageY===t?n.pageY:o.pageY)-o.y,s=.0006666666666666666*Math.pow(r*r+i*i,.8)+1;2.3<s&&(s=2.3);var l=o;i=o.angle===t?Math.atan2(r,i)-d:o.angle,o=Array(l.length-1),r=Math.sin(i),i=Math.cos(i);for(var p=void 0,h=1;h<l.length;++h)p=("flat"===l.style?h:Math.pow(h,s))*l.inverse,o[h-1]=(p*r|0)+"px "+(p*i|0)+"px "+("flat"===l.style?0:0|Math.pow(h,1.7))+"px rgba("+l.color+","+l.opacity+")"+l.inset;"drop"===l.type?l.node.style.filter=l.node.style.webkitFilter="drop-shadow("+o.join(") drop-shadow(")+")":l.node.style["text"===l.type?"textShadow":"boxShadow"]=o.join(",")}};var s=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n,o=arguments[t];for(n in o)o.hasOwnProperty(n)&&(e[n]=o[n])}return e},l=!1;"function"==typeof e.jQuery&&($.fn.realshadow=n,l=!0),"function"==typeof define&&define.amd&&(define((function(){return n})),l=!0),"undefined"!=typeof module&&module.exports&&(module.exports=n,l=!0),l||(e.realshadow=n)}(window);