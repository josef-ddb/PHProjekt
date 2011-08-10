/*
	Copyright (c) 2004-2011, The Dojo Foundation All Rights Reserved.
	Available via Academic Free License >= 2.1 OR the modified BSD license.
	see: http://dojotoolkit.org/license for details
*/


if(!dojo._hasResource["dojox.drawing.tools.Path"])dojo._hasResource["dojox.drawing.tools.Path"]=!0,dojo.provide("dojox.drawing.tools.Path"),dojox.drawing.tools.Path=dojox.drawing.util.oo.declare(dojox.drawing.stencil.Path,function(){this.currentPathMode=this.pathMode="";this._started=!1;this.oddEvenClicks=0},{draws:!0,onDown:function(a){if(!this._started)this.onStartPath(a)},makeSubPath:function(a){a&&(this.currentPathMode=="Q"&&this.points.push({x:this.points[0].x,y:this.points[0].y}),this.points.push({t:"Z"}),
this.render());this.currentPathMode="";this.pathMode="M"},onStartPath:function(a){this._started=!0;this.revertRenderHit=this.renderHit;this.closePath=this.renderHit=!1;this.mouse.setEventMode("PathEdit");this.closePoint={x:a.x,y:a.y};this._kc1=this.connect(this.keys,"onEsc",this,function(){this.onCompletePath(!1)});this._kc2=this.connect(this.keys,"onKeyUp",this,function(a){switch(a.letter){case "c":this.onCompletePath(!0);break;case "l":this.pathMode="L";break;case "m":this.makeSubPath(!1);break;
case "q":this.pathMode="Q";break;case "s":this.pathMode="S";break;case "z":this.makeSubPath(!0)}})},onCompletePath:function(a){this.remove(this.closeGuide,this.guide);var b=this.getBounds();if(b.w<this.minimumSize&&b.h<this.minimumSize)this.remove(this.hit,this.shape,this.closeGuide),this._started=!1,this.mouse.setEventMode(""),this.setPoints([]);else{if(a)this.currentPathMode=="Q"&&this.points.push({x:this.points[0].x,y:this.points[0].y}),this.closePath=!0;this.renderHit=this.revertRenderHit;this.renderedOnce=
!0;this.onRender(this);this.disconnect([this._kc1,this._kc2]);this.mouse.setEventMode("");this.render()}},onUp:function(a){if(this._started&&a.withinCanvas)if(this.points.length>2&&this.closeRadius>this.util.distance(a.x,a.y,this.closePoint.x,this.closePoint.y))this.onCompletePath(!0);else{var b={x:a.x,y:a.y};this.oddEvenClicks++;if(this.currentPathMode!=this.pathMode){if(this.pathMode=="Q")b.t="Q",this.oddEvenClicks=0;else if(this.pathMode=="L")b.t="L";else if(this.pathMode=="M")b.t="M",this.closePoint=
{x:a.x,y:a.y};this.currentPathMode=this.pathMode}this.points.push(b);this.points.length>1&&(this.remove(this.guide),this.render())}},createGuide:function(a){if(this.points.length){var b=[].concat(this.points),c={x:a.x,y:a.y};if(this.currentPathMode=="Q"&&this.oddEvenClicks%2)c.t="L";this.points.push(c);this.render();this.points=b;a=this.util.distance(a.x,a.y,this.closePoint.x,this.closePoint.y);if(this.points.length>1)if(a<this.closeRadius&&!this.closeGuide)this.closeGuide=this.container.createEllipse({cx:this.closePoint.x,
cy:this.closePoint.y,rx:this.closeRadius,ry:this.closeRadius}).setFill(this.closeColor);else if(a>this.closeRadius&&this.closeGuide)this.remove(this.closeGuide),this.closeGuide=null}},onMove:function(a){this._started&&this.createGuide(a)},onDrag:function(a){this._started&&this.createGuide(a)}}),dojox.drawing.tools.Path.setup={name:"dojox.drawing.tools.Path",tooltip:"Path Tool",iconClass:"iconLine"},dojox.drawing.register(dojox.drawing.tools.Path.setup,"tool");