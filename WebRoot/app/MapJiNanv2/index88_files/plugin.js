(function(a){function d(b){var c=b||window.event,d=[].slice.call(arguments,1),e=0,g=0,h=0;return b=a.event.fix(c),b.type="mousewheel",c.wheelDelta&&(e=c.wheelDelta/120),c.detail&&(e=-c.detail/3),h=e,void 0!==c.axis&&c.axis===c.HORIZONTAL_AXIS&&(h=0,g=-1*e),void 0!==c.wheelDeltaY&&(h=c.wheelDeltaY/120),void 0!==c.wheelDeltaX&&(g=-1*c.wheelDeltaX/120),d.unshift(b,e,g,h),(a.event.dispatch||a.event.handle).apply(this,d)}var b=["DOMMouseScroll","mousewheel"];if(a.event.fixHooks)for(var c=b.length;c;)a.event.fixHooks[b[--c]]=a.event.mouseHooks;a.event.special.mousewheel={setup:function(){if(this.addEventListener)for(var a=b.length;a;)this.addEventListener(b[--a],d,!1);else this.onmousewheel=d},teardown:function(){if(this.removeEventListener)for(var a=b.length;a;)this.removeEventListener(b[--a],d,!1);else this.onmousewheel=null}},a.fn.extend({mousewheel:function(a){return a?this.bind("mousewheel",a):this.trigger("mousewheel")},unmousewheel:function(a){return this.unbind("mousewheel",a)}})})(jQuery),function(a,b,c){a.fn.jScrollPane=function(d){function e(d,e){function U(b){var e,g,r,s,u,v,x=!1,y=!1;if(f=b,h===c)u=d.scrollTop(),v=d.scrollLeft(),d.css({overflow:"hidden",padding:0}),i=d.innerWidth()+M,j=d.innerHeight(),d.width(i),h=a('<div class="jspPane" />').css("padding",L).append(d.children()),k=a('<div class="jspContainer" />').css({width:i+"px",height:j+"px"}).append(h).appendTo(d);else{if(d.css("width",""),x=f.stickToBottom&&pb(),y=f.stickToRight&&qb(),s=d.innerWidth()+M!=i||d.outerHeight()!=j,s&&(i=d.innerWidth()+M,j=d.innerHeight(),k.css({width:i+"px",height:j+"px"})),!s&&N==l&&h.outerHeight()==m)return d.width(i),c;N=l,h.css("width",""),d.width(i),k.find(">.jspVerticalBar,>.jspHorizontalBar").remove().end()}h.css("overflow","auto"),l=b.contentWidth?b.contentWidth:h[0].scrollWidth,m=h[0].scrollHeight,h.css("overflow",""),n=l/i,o=m/j,p=o>1,q=n>1,q||p?(d.addClass("jspScrollable"),e=f.maintainPosition&&(t||w),e&&(g=nb(),r=ob()),V(),X(),Z(),e&&(lb(y?l-i:g,!1),kb(x?m-j:r,!1)),ub(),rb(),Ab(),f.enableKeyboardNavigation&&wb(),f.clickOnTrack&&bb(),yb(),f.hijackInternalLinks&&zb()):(d.removeClass("jspScrollable"),h.css({top:0,width:k.width()-M}),sb(),vb(),xb(),cb()),f.autoReinitialise&&!K?K=setInterval(function(){U(f)},f.autoReinitialiseDelay):!f.autoReinitialise&&K&&clearInterval(K),u&&d.scrollTop(0)&&kb(u,!1),v&&d.scrollLeft(0)&&lb(v,!1),d.trigger("jsp-initialised",[q||p])}function V(){p&&(k.append(a('<div class="jspVerticalBar" />').append(a('<div class="jspCap jspCapTop" />'),a('<div class="jspTrack" />').append(a('<div class="jspDrag" />').append(a('<div class="jspDragTop" />'),a('<div class="jspDragBottom" />'))),a('<div class="jspCap jspCapBottom" />'))),x=k.find(">.jspVerticalBar"),y=x.find(">.jspTrack"),r=y.find(">.jspDrag"),f.showArrows&&(C=a('<a class="jspArrow jspArrowUp" />').bind("mousedown.jsp",_(0,-1)).bind("click.jsp",tb),D=a('<a class="jspArrow jspArrowDown" />').bind("mousedown.jsp",_(0,1)).bind("click.jsp",tb),f.arrowScrollOnHover&&(C.bind("mouseover.jsp",_(0,-1,C)),D.bind("mouseover.jsp",_(0,1,D))),$(y,f.verticalArrowPositions,C,D)),A=j,k.find(">.jspVerticalBar>.jspCap:visible,>.jspVerticalBar>.jspArrow").each(function(){A-=a(this).outerHeight()}),r.hover(function(){r.addClass("jspHover")},function(){r.removeClass("jspHover")}).bind("mousedown.jsp",function(b){a("html").bind("dragstart.jsp selectstart.jsp",tb),r.addClass("jspActive");var c=b.pageY-r.position().top;return a("html").bind("mousemove.jsp",function(a){eb(a.pageY-c,!1)}).bind("mouseup.jsp mouseleave.jsp",db),!1}),W())}function W(){y.height(A+"px"),t=0,z=f.verticalGutter+y.outerWidth(),h.width(i-z-M)}function X(){q&&(k.append(a('<div class="jspHorizontalBar" />').append(a('<div class="jspCap jspCapLeft" />'),a('<div class="jspTrack" />').append(a('<div class="jspDrag" />').append(a('<div class="jspDragLeft" />'),a('<div class="jspDragRight" />'))),a('<div class="jspCap jspCapRight" />'))),E=k.find(">.jspHorizontalBar"),F=E.find(">.jspTrack"),u=F.find(">.jspDrag"),f.showArrows&&(I=a('<a class="jspArrow jspArrowLeft" />').bind("mousedown.jsp",_(-1,0)).bind("click.jsp",tb),J=a('<a class="jspArrow jspArrowRight" />').bind("mousedown.jsp",_(1,0)).bind("click.jsp",tb),f.arrowScrollOnHover&&(I.bind("mouseover.jsp",_(-1,0,I)),J.bind("mouseover.jsp",_(1,0,J))),$(F,f.horizontalArrowPositions,I,J)),u.hover(function(){u.addClass("jspHover")},function(){u.removeClass("jspHover")}).bind("mousedown.jsp",function(b){a("html").bind("dragstart.jsp selectstart.jsp",tb),u.addClass("jspActive");var c=b.pageX-u.position().left;return a("html").bind("mousemove.jsp",function(a){gb(a.pageX-c,!1)}).bind("mouseup.jsp mouseleave.jsp",db),!1}),G=k.innerWidth(),Y())}function Y(){k.find(">.jspHorizontalBar>.jspCap:visible,>.jspHorizontalBar>.jspArrow").each(function(){G-=a(this).outerWidth()}),F.width(G+"px"),w=0}function Z(){if(q&&p){var b=F.outerHeight(),c=y.outerWidth();A-=b,a(E).find(">.jspCap:visible,>.jspArrow").each(function(){G+=a(this).outerWidth()}),G-=c,j-=c,i-=b,F.parent().append(a('<div class="jspCorner" />').css("width",b+"px")),W(),Y()}q&&h.width(k.outerWidth()-M+"px"),m=h.outerHeight(),o=m/j,q&&(H=Math.ceil(1/n*G),H>f.horizontalDragMaxWidth?H=f.horizontalDragMaxWidth:f.horizontalDragMinWidth>H&&(H=f.horizontalDragMinWidth),u.width(H-r.outerWidth()+"px"),v=G-H,hb(w)),p&&(B=Math.ceil(1/o*A),B>f.verticalDragMaxHeight?B=f.verticalDragMaxHeight:f.verticalDragMinHeight>B&&(B=f.verticalDragMinHeight),r.height(B-r.outerHeight()+"px"),s=A-B,fb(t))}function $(a,b,c,d){var g,e="before",f="after";"os"==b&&(b=/Mac/.test(navigator.platform)?"after":"split"),b==e?f=b:b==f&&(e=b,g=c,c=d,d=g),a[e](c)[f](d)}function _(a,b,c){return function(){return ab(a,b,this,c),this.blur(),!1}}function ab(b,c,d,e){d=a(d).addClass("jspActive");var h,i,j=!0,k=function(){0!==b&&g.scrollByX(b*f.arrowButtonSpeed),0!==c&&g.scrollByY(c*f.arrowButtonSpeed),i=setTimeout(k,j?f.initialDelay:f.arrowRepeatFreq),j=!1};k(),h=e?"mouseout.jsp":"mouseup.jsp",e=e||a("html"),e.bind(h,function(){d.removeClass("jspActive"),i&&clearTimeout(i),i=null,e.unbind(h)})}function bb(){cb(),p&&y.bind("mousedown.jsp",function(b){if(b.originalTarget===c||b.originalTarget==b.currentTarget){var i,d=a(this),e=d.offset(),h=b.pageY-e.top-t,k=!0,l=function(){var a=d.offset(),e=b.pageY-a.top-B/2,o=j*f.scrollPagePercent,p=s*o/(m-j);if(0>h)t-p>e?g.scrollByY(-o):eb(e);else{if(!(h>0))return n(),c;e>t+p?g.scrollByY(o):eb(e)}i=setTimeout(l,k?f.initialDelay:f.trackClickRepeatFreq),k=!1},n=function(){i&&clearTimeout(i),i=null,a(document).unbind("mouseup.jsp",n)};return l(),a(document).bind("mouseup.jsp",n),!1}}),q&&F.bind("mousedown.jsp",function(b){if(b.originalTarget===c||b.originalTarget==b.currentTarget){var j,d=a(this),e=d.offset(),h=b.pageX-e.left-w,k=!0,m=function(){var a=d.offset(),e=b.pageX-a.left-H/2,o=i*f.scrollPagePercent,p=v*o/(l-i);if(0>h)w-p>e?g.scrollByX(-o):gb(e);else{if(!(h>0))return n(),c;e>w+p?g.scrollByX(o):gb(e)}j=setTimeout(m,k?f.initialDelay:f.trackClickRepeatFreq),k=!1},n=function(){j&&clearTimeout(j),j=null,a(document).unbind("mouseup.jsp",n)};return m(),a(document).bind("mouseup.jsp",n),!1}})}function cb(){F&&F.unbind("mousedown.jsp"),y&&y.unbind("mousedown.jsp")}function db(){a("html").unbind("dragstart.jsp selectstart.jsp mousemove.jsp mouseup.jsp mouseleave.jsp"),r&&r.removeClass("jspActive"),u&&u.removeClass("jspActive")}function eb(a,b){p&&(0>a?a=0:a>s&&(a=s),b===c&&(b=f.animateScroll),b?g.animate(r,"top",a,fb):(r.css("top",a),fb(a)))}function fb(a){a===c&&(a=r.position().top),k.scrollTop(0),t=a;var b=0===t,e=t==s,f=a/s,g=-f*(m-j);(O!=b||Q!=e)&&(O=b,Q=e,d.trigger("jsp-arrow-change",[O,Q,P,R])),ib(b,e),h.css("top",g),d.trigger("jsp-scroll-y",[-g,b,e]).trigger("scroll")}function gb(a,b){q&&(0>a?a=0:a>v&&(a=v),b===c&&(b=f.animateScroll),b?g.animate(u,"left",a,hb):(u.css("left",a),hb(a)))}function hb(a){a===c&&(a=u.position().left),k.scrollTop(0),w=a;var b=0===w,e=w==v,f=a/v,g=-f*(l-i);(P!=b||R!=e)&&(P=b,R=e,d.trigger("jsp-arrow-change",[O,Q,P,R])),jb(b,e),h.css("left",g),d.trigger("jsp-scroll-x",[-g,b,e]).trigger("scroll")}function ib(a,b){f.showArrows&&(C[a?"addClass":"removeClass"]("jspDisabled"),D[b?"addClass":"removeClass"]("jspDisabled"))}function jb(a,b){f.showArrows&&(I[a?"addClass":"removeClass"]("jspDisabled"),J[b?"addClass":"removeClass"]("jspDisabled"))}function kb(a,b){var c=a/(m-j);eb(c*s,b)}function lb(a,b){var c=a/(l-i);gb(c*v,b)}function mb(b,c,d){var e,g,h,n,o,p,q,r,s,l=0,m=0;try{e=a(b)}catch(t){return}for(g=e.outerHeight(),h=e.outerWidth(),k.scrollTop(0),k.scrollLeft(0);!e.is(".jspPane");)if(l+=e.position().top,m+=e.position().left,e=e.offsetParent(),/^body|html$/i.test(e[0].nodeName))return;n=ob(),p=n+j,n>l||c?r=l-f.verticalGutter:l+g>p&&(r=l-j+g+f.verticalGutter),r&&kb(r,d),o=nb(),q=o+i,o>m||c?s=m-f.horizontalGutter:m+h>q&&(s=m-i+h+f.horizontalGutter),s&&lb(s,d)}function nb(){return-h.position().left}function ob(){return-h.position().top}function pb(){var a=m-j;return a>20&&10>a-ob()}function qb(){var a=l-i;return a>20&&10>a-nb()}function rb(){k.unbind(T).bind(T,function(a,b,c,d){var e=w,h=t;return g.scrollBy(c*f.mouseWheelSpeed,-d*f.mouseWheelSpeed,!1),e==w&&h==t})}function sb(){k.unbind(T)}function tb(){return!1}function ub(){h.find(":input,a").unbind("focus.jsp").bind("focus.jsp",function(a){mb(a.target,!1)})}function vb(){h.find(":input,a").unbind("focus.jsp")}function wb(){function i(){var a=w,d=t;switch(b){case 40:g.scrollByY(f.keyboardSpeed,!1);break;case 38:g.scrollByY(-f.keyboardSpeed,!1);break;case 34:case 32:g.scrollByY(j*f.scrollPagePercent,!1);break;case 33:g.scrollByY(-j*f.scrollPagePercent,!1);break;case 39:g.scrollByX(f.keyboardSpeed,!1);break;case 37:g.scrollByX(-f.keyboardSpeed,!1)}return c=a!=w||d!=t}var b,c,e=[];q&&e.push(E[0]),p&&e.push(x[0]),h.focus(function(){d.focus()}),d.attr("tabindex",0).unbind("keydown.jsp keypress.jsp").bind("keydown.jsp",function(d){if(d.target===this||e.length&&a(d.target).closest(e).length){var f=w,g=t;switch(d.keyCode){case 40:case 38:case 34:case 32:case 33:case 39:case 37:b=d.keyCode,i();break;case 35:kb(m-j),b=null;break;case 36:kb(0),b=null}return c=d.keyCode==b&&f!=w||g!=t,!c}}).bind("keypress.jsp",function(a){return a.keyCode==b&&i(),!c}),f.hideFocus?(d.css("outline","none"),"hideFocus"in k[0]&&d.attr("hideFocus",!0)):(d.css("outline",""),"hideFocus"in k[0]&&d.attr("hideFocus",!1))}function xb(){d.attr("tabindex","-1").removeAttr("tabindex").unbind("keydown.jsp keypress.jsp")}function yb(){if(location.hash&&location.hash.length>1){var b,c,d=escape(location.hash.substr(1));try{b=a("#"+d+', a[name="'+d+'"]')}catch(e){return}b.length&&h.find(d)&&(0===k.scrollTop()?c=setInterval(function(){k.scrollTop()>0&&(mb(b,!0),a(document).scrollTop(k.position().top),clearInterval(c))},50):(mb(b,!0),a(document).scrollTop(k.position().top)))}}function zb(){a(document.body).data("jspHijack")||(a(document.body).data("jspHijack",!0),a(document.body).delegate("a[href*=#]","click",function(c){var f,g,h,i,j,k,d=this.href.substr(0,this.href.indexOf("#")),e=location.href;if(-1!==location.href.indexOf("#")&&(e=location.href.substr(0,location.href.indexOf("#"))),d===e){f=escape(this.href.substr(this.href.indexOf("#")+1));try{g=a("#"+f+', a[name="'+f+'"]')}catch(l){return}g.length&&(h=g.closest(".jspScrollable"),i=h.data("jsp"),i.scrollToElement(g,!0),h[0].scrollIntoView&&(j=a(b).scrollTop(),k=g.offset().top,(j>k||k>j+a(b).height())&&h[0].scrollIntoView()),c.preventDefault())}}))}function Ab(){var a,b,d,e,f,h=!1;k.unbind("touchstart.jsp touchmove.jsp touchend.jsp click.jsp-touchclick").bind("touchstart.jsp",function(c){var g=c.originalEvent.touches[0];a=nb(),b=ob(),d=g.pageX,e=g.pageY,f=!1,h=!0}).bind("touchmove.jsp",function(c){if(h){var i=c.originalEvent.touches[0],j=w,k=t;return g.scrollTo(a+d-i.pageX,b+e-i.pageY),f=f||Math.abs(d-i.pageX)>5||Math.abs(e-i.pageY)>5,j==w&&k==t}}).bind("touchend.jsp",function(){h=!1}).bind("click.jsp-touchclick",function(){return f?(f=!1,!1):c})}function Bb(){var a=ob(),b=nb();d.removeClass("jspScrollable").unbind(".jsp"),d.replaceWith(S.append(h.children())),S.scrollTop(a),S.scrollLeft(b),K&&clearInterval(K)}var f,h,i,j,k,l,m,n,o,p,q,r,s,t,u,v,w,x,y,z,A,B,C,D,E,F,G,H,I,J,K,L,M,N,g=this,O=!0,P=!0,Q=!1,R=!1,S=d.clone(!1,!1).empty(),T=a.fn.mwheelIntent?"mwheelIntent.jsp":"mousewheel.jsp";L=d.css("paddingTop")+" "+d.css("paddingRight")+" "+d.css("paddingBottom")+" "+d.css("paddingLeft"),M=(parseInt(d.css("paddingLeft"),10)||0)+(parseInt(d.css("paddingRight"),10)||0),a.extend(g,{reinitialise:function(b){b=a.extend({},f,b),U(b)},scrollToElement:function(a,b,c){mb(a,b,c)},scrollTo:function(a,b,c){lb(a,c),kb(b,c)},scrollToX:function(a,b){lb(a,b)},scrollToY:function(a,b){kb(a,b)},scrollToPercentX:function(a,b){lb(a*(l-i),b)},scrollToPercentY:function(a,b){kb(a*(m-j),b)},scrollBy:function(a,b,c){g.scrollByX(a,c),g.scrollByY(b,c)},scrollByX:function(a,b){var c=nb()+Math[0>a?"floor":"ceil"](a),d=c/(l-i);gb(d*v,b)},scrollByY:function(a,b){var c=ob()+Math[0>a?"floor":"ceil"](a),d=c/(m-j);eb(d*s,b)},positionDragX:function(a,b){gb(a,b)},positionDragY:function(a,b){eb(a,b)},animate:function(a,b,c,d){var e={};e[b]=c,a.animate(e,{duration:f.animateDuration,easing:f.animateEase,queue:!1,step:d})},getContentPositionX:function(){return nb()},getContentPositionY:function(){return ob()},getContentWidth:function(){return l},getContentHeight:function(){return m},getPercentScrolledX:function(){return nb()/(l-i)},getPercentScrolledY:function(){return ob()/(m-j)},getIsScrollableH:function(){return q},getIsScrollableV:function(){return p},getContentPane:function(){return h},scrollToBottom:function(a){eb(s,a)},hijackInternalLinks:a.noop,destroy:function(){Bb()}}),U(e)}return d=a.extend({},a.fn.jScrollPane.defaults,d),a.each(["mouseWheelSpeed","arrowButtonSpeed","trackClickSpeed","keyboardSpeed"],function(){d[this]=d[this]||d.speed}),this.each(function(){var b=a(this),c=b.data("jsp");c?c.reinitialise(d):(a("script",b).filter('[type="text/javascript"],:not([type])').remove(),c=new e(b,d),b.data("jsp",c))})},a.fn.jScrollPane.defaults={showArrows:!1,maintainPosition:!0,stickToBottom:!1,stickToRight:!1,clickOnTrack:!0,autoReinitialise:!1,autoReinitialiseDelay:500,verticalDragMinHeight:0,verticalDragMaxHeight:99999,horizontalDragMinWidth:0,horizontalDragMaxWidth:99999,contentWidth:c,animateScroll:!1,animateDuration:300,animateEase:"linear",hijackInternalLinks:!1,verticalGutter:4,horizontalGutter:4,mouseWheelSpeed:0,arrowButtonSpeed:0,arrowRepeatFreq:50,arrowScrollOnHover:!1,trackClickSpeed:0,trackClickRepeatFreq:70,verticalArrowPositions:"split",horizontalArrowPositions:"split",enableKeyboardNavigation:!0,hideFocus:!1,keyboardSpeed:0,initialDelay:300,speed:30,scrollPagePercent:.8}}(jQuery,this),function(a){a.fn.wresize=function(b){function c(){if(a.browser.msie)if(wresize.fired){var b=parseInt(a.browser.version,10);if(wresize.fired=!1,7>b)return!1;if(7==b){var c=a(window).width();if(c!=wresize.width)return wresize.width=c,!1}}else wresize.fired=!0;return!0}function d(a){return c()?b.apply(this,[a]):void 0}return version="1.1",wresize={fired:!1,width:0},this.each(function(){this==window?a(this).resize(d):a(this).resize(b)}),this}}(jQuery);