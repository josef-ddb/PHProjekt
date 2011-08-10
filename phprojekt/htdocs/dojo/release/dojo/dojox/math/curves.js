/*
	Copyright (c) 2004-2011, The Dojo Foundation All Rights Reserved.
	Available via Academic Free License >= 2.1 OR the modified BSD license.
	see: http://dojotoolkit.org/license for details
*/


dojo._hasResource["dojox.math.curves"]||(dojo._hasResource["dojox.math.curves"]=!0,dojo.provide("dojox.math.curves"),dojo.getObject("math.curves",!0,dojox),dojo.mixin(dojox.math.curves,{Line:function(a,b){this.start=a;this.end=b;this.dimensions=a.length;for(var c=0;c<a.length;c++)a[c]=Number(a[c]);for(c=0;c<b.length;c++)b[c]=Number(b[c]);this.getValue=function(c){for(var b=Array(this.dimensions),d=0;d<this.dimensions;d++)b[d]=(this.end[d]-this.start[d])*c+this.start[d];return b};return this},Bezier:function(a){this.getValue=
function(b){if(b>=1)return this.p[this.p.length-1];if(b<=0)return this.p[0];for(var c=Array(this.p[0].length),a=0;f<this.p[0].length;a++)c[a]=0;for(var f=0;f<this.p[0].length;f++){for(var d=a=0,e=0;e<this.p.length;e++)a+=this.p[e][f]*this.p[this.p.length-1][0]*dojox.math.bernstein(b,this.p.length,e);for(e=0;e<this.p.length;e++)d+=this.p[this.p.length-1][0]*dojox.math.bernstein(b,this.p.length,e);c[f]=a/d}return c};this.p=a;return this},CatmullRom:function(a,b){this.getValue=function(c){var b=c*(this.p.length-
1),c=Math.floor(b);b-=c;var a=c-1;a<0&&(a=0);var d=c+1;d>=this.p.length&&(d=this.p.length-1);var e=c+2;e>=this.p.length&&(e=this.p.length-1);for(var k=b*b,i=b*b*b,j=Array(this.p[0].length),g=0;g<this.p[0].length;g++)j[g]=(-this.c*this.p[a][g]+(2-this.c)*this.p[c][g]+(this.c-2)*this.p[d][g]+this.c*this.p[e][g])*i+(2*this.c*this.p[a][g]+(this.c-3)*this.p[c][g]+(3-2*this.c)*this.p[d][g]+-this.c*this.p[e][g])*k+(-this.c*this.p[a][g]+this.c*this.p[d][g])*b+this.p[c][g];return j};this.c=b?b:0.7;this.p=
a;return this},Arc:function(a,b,c){var b=dojox.math.midpoint(a,b),a=function(d,b){for(var a=Array(d.length),c=0;c<d.length;c++)a[c]=d[c]+b[c];return a}(function(b){for(var c=Array(b.length),a=0;a<b.length;a++)c[a]=-b[a];return c}(b),a),h=Math.sqrt(Math.pow(a[0],2)+Math.pow(a[1],2)),f=dojox.math.radiansToDegrees(Math.atan(a[1]/a[0]));a[0]<0?f-=90:f+=90;dojox.math.curves.CenteredArc.call(this,b,h,f,f+(c?-180:180))},CenteredArc:function(a,b,c,h){this.center=a;this.radius=b;this.start=c||0;this.end=h;
this.getValue=function(b){var a=Array(2),b=dojox.math.degreesToRadians(this.start+(this.end-this.start)*b);a[0]=this.center[0]+this.radius*Math.sin(b);a[1]=this.center[1]-this.radius*Math.cos(b);return a};return this},Circle:function(a,b){dojox.math.curves.CenteredArc.call(this,a,b,0,360);return this},Path:function(){function a(){for(var b=0,a=0;a<c.length;a++){var k=b+c[a]/f;h[a]=[b,k,k-b];b=k}}var b=[],c=[],h=[],f=0;this.add=function(d,e){e<0&&console.error("dojox.math.curves.Path.add: weight cannot be less than 0");
b.push(d);c.push(e);f+=e;a()};this.remove=function(d){for(var e=0;e<b.length;e++)if(b[e]==d){b.splice(e,1);f-=c.splice(e,1)[0];break}a()};this.removeAll=function(){b=[];c=[];f=0};this.getValue=function(a){for(var c=!1,f=0,i=0;i<h.length;i++){var j=h[i];if(a>=j[0]&&a<j[1]){f=b[i].getValue((a-j[0])/j[2]);c=!0;break}}c||(f=b[b.length-1].getValue(1));for(a=0;a<i;a++)f=dojox.math.points.translate(f,b[a].getValue(1));return f};return this}}));