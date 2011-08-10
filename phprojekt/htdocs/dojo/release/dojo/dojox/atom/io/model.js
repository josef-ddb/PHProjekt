/*
	Copyright (c) 2004-2011, The Dojo Foundation All Rights Reserved.
	Available via Academic Free License >= 2.1 OR the modified BSD license.
	see: http://dojotoolkit.org/license for details
*/


if(!dojo._hasResource["dojox.atom.io.model"])dojo._hasResource["dojox.atom.io.model"]=!0,dojo.provide("dojox.atom.io.model"),dojo.require("dojox.xml.parser"),dojo.require("dojo.string"),dojo.require("dojo.date.stamp"),dojox.atom.io.model._Constants={ATOM_URI:"http://www.w3.org/2005/Atom",ATOM_NS:"http://www.w3.org/2005/Atom",PURL_NS:"http://purl.org/atom/app#",APP_NS:"http://www.w3.org/2007/app"},dojox.atom.io.model._actions={link:function(a,b){if(a.links===null)a.links=[];var c=new dojox.atom.io.model.Link;
c.buildFromDom(b);a.links.push(c)},author:function(a,b){if(a.authors===null)a.authors=[];var c=new dojox.atom.io.model.Person("author");c.buildFromDom(b);a.authors.push(c)},contributor:function(a,b){if(a.contributors===null)a.contributors=[];var c=new dojox.atom.io.model.Person("contributor");c.buildFromDom(b);a.contributors.push(c)},category:function(a,b){if(a.categories===null)a.categories=[];var c=new dojox.atom.io.model.Category;c.buildFromDom(b);a.categories.push(c)},icon:function(a,b){a.icon=
dojox.xml.parser.textContent(b)},id:function(a,b){a.id=dojox.xml.parser.textContent(b)},rights:function(a,b){a.rights=dojox.xml.parser.textContent(b)},subtitle:function(a,b){var c=new dojox.atom.io.model.Content("subtitle");c.buildFromDom(b);a.subtitle=c},title:function(a,b){var c=new dojox.atom.io.model.Content("title");c.buildFromDom(b);a.title=c},updated:function(a,b){a.updated=dojox.atom.io.model.util.createDate(b)},issued:function(a,b){a.issued=dojox.atom.io.model.util.createDate(b)},modified:function(a,
b){a.modified=dojox.atom.io.model.util.createDate(b)},published:function(a,b){a.published=dojox.atom.io.model.util.createDate(b)},entry:function(a,b){if(a.entries===null)a.entries=[];var c=a.createEntry?a.createEntry():new dojox.atom.io.model.Entry;c.buildFromDom(b);a.entries.push(c)},content:function(a,b){var c=new dojox.atom.io.model.Content("content");c.buildFromDom(b);a.content=c},summary:function(a,b){var c=new dojox.atom.io.model.Content("summary");c.buildFromDom(b);a.summary=c},name:function(a,
b){a.name=dojox.xml.parser.textContent(b)},email:function(a,b){a.email=dojox.xml.parser.textContent(b)},uri:function(a,b){a.uri=dojox.xml.parser.textContent(b)},generator:function(a,b){a.generator=new dojox.atom.io.model.Generator;a.generator.buildFromDom(b)}},dojox.atom.io.model.util={createDate:function(a){return(a=dojox.xml.parser.textContent(a))?dojo.date.stamp.fromISOString(dojo.trim(a)):null},escapeHtml:function(a){return a.replace(/&/gm,"&amp;").replace(/</gm,"&lt;").replace(/>/gm,"&gt;").replace(/"/gm,
"&quot;").replace(/'/gm,"&#39;")},unEscapeHtml:function(a){return a.replace(/&lt;/gm,"<").replace(/&gt;/gm,">").replace(/&quot;/gm,'"').replace(/&#39;/gm,"'").replace(/&amp;/gm,"&")},getNodename:function(a){var b=null;a!==null&&(b=a.localName?a.localName:a.nodeName,b!==null&&(a=b.indexOf(":"),a!==-1&&(b=b.substring(a+1,b.length))));return b}},dojo.declare("dojox.atom.io.model.Node",null,{constructor:function(a,b,c,d,e){this.name_space=a;this.name=b;this.attributes=[];if(c)this.attributes=c;this.content=
[];this.rawNodes=[];this.textContent=null;d&&this.content.push(d);this.shortNs=e;this._objName="Node"},buildFromDom:function(a){this._saveAttributes(a);this.name_space=a.namespaceURI;this.shortNs=a.prefix;this.name=dojox.atom.io.model.util.getNodename(a);for(var b=0;b<a.childNodes.length;b++){var c=a.childNodes[b];if(dojox.atom.io.model.util.getNodename(c)!="#text"){this.rawNodes.push(c);var d=new dojox.atom.io.model.Node;d.buildFromDom(c,!0);this.content.push(d)}else this.content.push(c.nodeValue)}this.textContent=
dojox.xml.parser.textContent(a)},_saveAttributes:function(a){if(!this.attributes)this.attributes=[];if(function(a){a=a.attributes;return a===null?!1:a.length!==0}(a)&&this._getAttributeNames){var b=this._getAttributeNames(a);if(b&&b.length>0)for(var c in b){var d=a.getAttribute(b[c]);d&&(this.attributes[b[c]]=d)}}},addAttribute:function(a,b){this.attributes[a]=b},getAttribute:function(a){return this.attributes[a]},_getAttributeNames:function(a){for(var b=[],c=0;c<a.attributes.length;c++)b.push(a.attributes[c].nodeName);
return b},toString:function(){var a=[],b,c=(this.shortNs?this.shortNs+":":"")+this.name;if(this.name=="#cdata-section")a.push("<![CDATA["),a.push(this.textContent),a.push("]]\>");else{a.push("<");a.push(c);this.name_space&&a.push(" xmlns='"+this.name_space+"'");if(this.attributes)for(b in this.attributes)a.push(" "+b+"='"+this.attributes[b]+"'");if(this.content){a.push(">");for(b in this.content)a.push(this.content[b]);a.push("</"+c+">\n")}else a.push("/>\n")}return a.join("")},addContent:function(a){this.content.push(a)}}),
dojo.declare("dojox.atom.io.model.AtomItem",dojox.atom.io.model.Node,{constructor:function(){this.ATOM_URI=dojox.atom.io.model._Constants.ATOM_URI;this.entries=this.extensions=this.content=this.issued=this.modified=this.updated=this.published=this.subtitle=this.title=this.icon=this.id=this.logo=this.xmlBase=this.rights=this.contributors=this.categories=this.authors=this.links=null;this.name_spaces={};this._objName="AtomItem"},_getAttributeNames:function(){return null},_accepts:{},accept:function(a){return Boolean(this._accepts[a])},
_postBuild:function(){},buildFromDom:function(a){var b,c,d;for(b=0;b<a.attributes.length;b++)c=a.attributes.item(b),d=dojox.atom.io.model.util.getNodename(c),c.prefix=="xmlns"&&c.prefix!=d&&this.addNamespace(c.nodeValue,d);c=a.childNodes;for(b=0;b<c.length;b++)if(c[b].nodeType==1&&(d=dojox.atom.io.model.util.getNodename(c[b]))){if(c[b].namespaceURI!=dojox.atom.io.model._Constants.ATOM_NS&&d!="#text"){if(!this.extensions)this.extensions=[];var e=new dojox.atom.io.model.Node;e.buildFromDom(c[b]);this.extensions.push(e)}this.accept(d.toLowerCase())&&
(d=dojox.atom.io.model._actions[d])&&d(this,c[b])}this._saveAttributes(a);this._postBuild&&this._postBuild()},addNamespace:function(a,b){a&&b&&(this.name_spaces[b]=a)},addAuthor:function(a,b,c){if(!this.authors)this.authors=[];this.authors.push(new dojox.atom.io.model.Person("author",a,b,c))},addContributor:function(a,b,c){if(!this.contributors)this.contributors=[];this.contributors.push(new dojox.atom.io.model.Person("contributor",a,b,c))},addLink:function(a,b,c,d,e){if(!this.links)this.links=[];
this.links.push(new dojox.atom.io.model.Link(a,b,c,d,e))},removeLink:function(a,b){if(this.links&&dojo.isArray(this.links)){for(var c=0,d=0;d<this.links.length;d++)if((!a||this.links[d].href===a)&&(!b||this.links[d].rel===b))this.links.splice(d,1),c++;return c}},removeBasicLinks:function(){if(this.links){for(var a=0,b=0;b<this.links.length;b++)this.links[b].rel||(this.links.splice(b,1),a++,b--);return a}},addCategory:function(a,b,c){if(!this.categories)this.categories=[];this.categories.push(new dojox.atom.io.model.Category(a,
b,c))},getCategories:function(a){if(!a)return this.categories;var b=[],c;for(c in this.categories)this.categories[c].scheme===a&&b.push(this.categories[c]);return b},removeCategories:function(a,b){if(this.categories){for(var c=0,d=0;d<this.categories.length;d++)if((!a||this.categories[d].scheme===a)&&(!b||this.categories[d].term===b))this.categories.splice(d,1),c++,d--;return c}},setTitle:function(a,b){if(a&&(this.title=new dojox.atom.io.model.Content("title"),this.title.value=a,b))this.title.type=
b},addExtension:function(a,b,c,d,e){if(!this.extensions)this.extensions=[];this.extensions.push(new dojox.atom.io.model.Node(a,b,c,d,e||"ns"+this.extensions.length))},getExtensions:function(a,b){var c=[];if(!this.extensions)return c;for(var d in this.extensions)(this.extensions[d].name_space===a||this.extensions[d].shortNs===a)&&(!b||this.extensions[d].name===b)&&c.push(this.extensions[d]);return c},removeExtensions:function(a,b){if(this.extensions)for(var c=0;c<this.extensions.length;c++)if((this.extensions[c].name_space==
a||this.extensions[c].shortNs===a)&&this.extensions[c].name===b)this.extensions.splice(c,1),c--},destroy:function(){this.entries=this.extensions=this.content=this.issued=this.modified=this.updated=this.published=this.subtitle=this.title=this.icon=this.id=this.logo=this.xmlBase=this.rights=this.contributors=this.categories=this.authors=this.links=null}}),dojo.declare("dojox.atom.io.model.Category",dojox.atom.io.model.Node,{constructor:function(a,b,c){this.scheme=a;this.term=b;this.label=c;this._objName=
"Category"},_postBuild:function(){},_getAttributeNames:function(){return["label","scheme","term"]},toString:function(){var a=[];a.push("<category ");this.label&&a.push(' label="'+this.label+'" ');this.scheme&&a.push(' scheme="'+this.scheme+'" ');this.term&&a.push(' term="'+this.term+'" ');a.push("/>\n");return a.join("")},buildFromDom:function(a){this._saveAttributes(a);this.label=this.attributes.label;this.scheme=this.attributes.scheme;this.term=this.attributes.term;this._postBuild&&this._postBuild()}}),
dojo.declare("dojox.atom.io.model.Content",dojox.atom.io.model.Node,{constructor:function(a,b,c,d,e){this.tagName=a;this.value=b;this.src=c;this.type=d;this.xmlLang=e;this.HTML="html";this.TEXT="text";this.XHTML="xhtml";this.XML="xml";this._useTextContent="true"},_getAttributeNames:function(){return["type","src"]},_postBuild:function(){},buildFromDom:function(a){var b=a.getAttribute("type");b?(b.toLowerCase(),b=this.XML):b="text";if(b===this.XML){if(a.firstChild){this.value="";for(b=0;b<a.childNodes.length;b++){var c=
a.childNodes[b];c&&(this.value+=dojox.xml.parser.innerXML(c))}}}else this.value=a.innerHTML?a.innerHTML:dojox.xml.parser.textContent(a);this._saveAttributes(a);if(this.attributes)this.type=this.attributes.type,this.scheme=this.attributes.scheme,this.term=this.attributes.term;if(!this.type)this.type="text";a=this.type.toLowerCase();if(a==="html"||a==="text/html"||a==="xhtml"||a==="text/xhtml")this.value=this.value?dojox.atom.io.model.util.unEscapeHtml(this.value):"";this._postBuild&&this._postBuild()},
toString:function(){var a=[];a.push("<"+this.tagName+" ");if(!this.type)this.type="text";this.type&&a.push(' type="'+this.type+'" ');this.xmlLang&&a.push(' xml:lang="'+this.xmlLang+'" ');this.xmlBase&&a.push(' xml:base="'+this.xmlBase+'" ');this.type.toLowerCase()==this.HTML?a.push(">"+dojox.atom.io.model.util.escapeHtml(this.value)+"</"+this.tagName+">\n"):a.push(">"+this.value+"</"+this.tagName+">\n");return a.join("")}}),dojo.declare("dojox.atom.io.model.Link",dojox.atom.io.model.Node,{constructor:function(a,
b,c,d,e){this.href=a;this.hrefLang=c;this.rel=b;this.title=d;this.type=e},_getAttributeNames:function(){return["href","jrefLang","rel","title","type"]},_postBuild:function(){},buildFromDom:function(a){this._saveAttributes(a);this.href=this.attributes.href;this.hrefLang=this.attributes.hreflang;this.rel=this.attributes.rel;this.title=this.attributes.title;this.type=this.attributes.type;this._postBuild&&this._postBuild()},toString:function(){var a=[];a.push("<link ");this.href&&a.push(' href="'+this.href+
'" ');this.hrefLang&&a.push(' hrefLang="'+this.hrefLang+'" ');this.rel&&a.push(' rel="'+this.rel+'" ');this.title&&a.push(' title="'+this.title+'" ');this.type&&a.push(' type = "'+this.type+'" ');a.push("/>\n");return a.join("")}}),dojo.declare("dojox.atom.io.model.Person",dojox.atom.io.model.Node,{constructor:function(a,b,c,d){this.author="author";this.contributor="contributor";if(!a)a=this.author;this.personType=a;this.name=b||"";this.email=c||"";this.uri=d||"";this._objName="Person"},_getAttributeNames:function(){return null},
_postBuild:function(){},accept:function(a){return Boolean(this._accepts[a])},buildFromDom:function(a){for(var b=a.childNodes,c=0;c<b.length;c++){var d=dojox.atom.io.model.util.getNodename(b[c]);if(d){if(b[c].namespaceURI!=dojox.atom.io.model._Constants.ATOM_NS&&d!="#text"){if(!this.extensions)this.extensions=[];var e=new dojox.atom.io.model.Node;e.buildFromDom(b[c]);this.extensions.push(e)}this.accept(d.toLowerCase())&&(d=dojox.atom.io.model._actions[d])&&d(this,b[c])}}this._saveAttributes(a);this._postBuild&&
this._postBuild()},_accepts:{name:!0,uri:!0,email:!0},toString:function(){var a=[];a.push("<"+this.personType+">\n");this.name&&a.push("\t<name>"+this.name+"</name>\n");this.email&&a.push("\t<email>"+this.email+"</email>\n");this.uri&&a.push("\t<uri>"+this.uri+"</uri>\n");a.push("</"+this.personType+">\n");return a.join("")}}),dojo.declare("dojox.atom.io.model.Generator",dojox.atom.io.model.Node,{constructor:function(a,b,c){this.uri=a;this.version=b;this.value=c},_postBuild:function(){},buildFromDom:function(a){this.value=
dojox.xml.parser.textContent(a);this._saveAttributes(a);this.uri=this.attributes.uri;this.version=this.attributes.version;this._postBuild&&this._postBuild()},toString:function(){var a=[];a.push("<generator ");this.uri&&a.push(' uri="'+this.uri+'" ');this.version&&a.push(' version="'+this.version+'" ');a.push(">"+this.value+"</generator>\n");return a.join("")}}),dojo.declare("dojox.atom.io.model.Entry",dojox.atom.io.model.AtomItem,{constructor:function(a){this.id=a;this._objName="Entry";this.feedUrl=
null},_getAttributeNames:function(){return null},_accepts:{author:!0,content:!0,category:!0,contributor:!0,created:!0,id:!0,link:!0,published:!0,rights:!0,summary:!0,title:!0,updated:!0,xmlbase:!0,issued:!0,modified:!0},toString:function(a){var b=[],c;a?(b.push("<?xml version='1.0' encoding='UTF-8'?>"),b.push("<entry xmlns='"+dojox.atom.io.model._Constants.ATOM_URI+"'")):b.push("<entry");this.xmlBase&&b.push(' xml:base="'+this.xmlBase+'" ');for(c in this.name_spaces)b.push(" xmlns:"+c+'="'+this.name_spaces[c]+
'"');b.push(">\n");b.push("<id>"+(this.id?this.id:"")+"</id>\n");if(this.issued&&!this.published)this.published=this.issued;this.published&&b.push("<published>"+dojo.date.stamp.toISOString(this.published)+"</published>\n");this.created&&b.push("<created>"+dojo.date.stamp.toISOString(this.created)+"</created>\n");this.issued&&b.push("<issued>"+dojo.date.stamp.toISOString(this.issued)+"</issued>\n");this.modified&&b.push("<modified>"+dojo.date.stamp.toISOString(this.modified)+"</modified>\n");if(this.modified&&
!this.updated)this.updated=this.modified;this.updated&&b.push("<updated>"+dojo.date.stamp.toISOString(this.updated)+"</updated>\n");this.rights&&b.push("<rights>"+this.rights+"</rights>\n");this.title&&b.push(this.title.toString());this.summary&&b.push(this.summary.toString());var a=[this.authors,this.categories,this.links,this.contributors,this.extensions],d;for(d in a)if(a[d])for(var e in a[d])b.push(a[d][e]);this.content&&b.push(this.content.toString());b.push("</entry>\n");return b.join("")},
getEditHref:function(){if(this.links===null||this.links.length===0)return null;for(var a in this.links)if(this.links[a].rel&&this.links[a].rel=="edit")return this.links[a].href;return null},setEditHref:function(a){if(this.links===null)this.links=[];for(var b in this.links)if(this.links[b].rel&&this.links[b].rel=="edit"){this.links[b].href=a;return}this.addLink(a,"edit")}}),dojo.declare("dojox.atom.io.model.Feed",dojox.atom.io.model.AtomItem,{_accepts:{author:!0,content:!0,category:!0,contributor:!0,
created:!0,id:!0,link:!0,published:!0,rights:!0,summary:!0,title:!0,updated:!0,xmlbase:!0,entry:!0,logo:!0,issued:!0,modified:!0,icon:!0,subtitle:!0},addEntry:function(a){if(!a.id)throw Error("The entry object must be assigned an ID attribute.");if(!this.entries)this.entries=[];a.feedUrl=this.getSelfHref();this.entries.push(a)},getFirstEntry:function(){return!this.entries||this.entries.length===0?null:this.entries[0]},getEntry:function(a){if(!this.entries)return null;for(var b in this.entries)if(this.entries[b].id==
a)return this.entries[b];return null},removeEntry:function(a){if(this.entries){for(var b=0,c=0;c<this.entries.length;c++)this.entries[c]===a&&(this.entries.splice(c,1),b++);return b}},setEntries:function(a){for(var b in a)this.addEntry(a[b])},toString:function(){var a=[],b;a.push('<?xml version="1.0" encoding="utf-8"?>\n');a.push('<feed xmlns="'+dojox.atom.io.model._Constants.ATOM_URI+'"');this.xmlBase&&a.push(' xml:base="'+this.xmlBase+'"');for(b in this.name_spaces)a.push(" xmlns:"+b+'="'+this.name_spaces[b]+
'"');a.push(">\n");a.push("<id>"+(this.id?this.id:"")+"</id>\n");this.title&&a.push(this.title);if(this.copyright&&!this.rights)this.rights=this.copyright;this.rights&&a.push("<rights>"+this.rights+"</rights>\n");this.issued&&a.push("<issued>"+dojo.date.stamp.toISOString(this.issued)+"</issued>\n");this.modified&&a.push("<modified>"+dojo.date.stamp.toISOString(this.modified)+"</modified>\n");if(this.modified&&!this.updated)this.updated=this.modified;this.updated&&a.push("<updated>"+dojo.date.stamp.toISOString(this.updated)+
"</updated>\n");this.published&&a.push("<published>"+dojo.date.stamp.toISOString(this.published)+"</published>\n");this.icon&&a.push("<icon>"+this.icon+"</icon>\n");this.language&&a.push("<language>"+this.language+"</language>\n");this.logo&&a.push("<logo>"+this.logo+"</logo>\n");this.subtitle&&a.push(this.subtitle.toString());this.tagline&&a.push(this.tagline.toString());var c=[this.alternateLinks,this.authors,this.categories,this.contributors,this.otherLinks,this.extensions,this.entries];for(b in c)if(c[b])for(var d in c[b])a.push(c[b][d]);
a.push("</feed>");return a.join("")},createEntry:function(){var a=new dojox.atom.io.model.Entry;a.feedUrl=this.getSelfHref();return a},getSelfHref:function(){if(this.links===null||this.links.length===0)return null;for(var a in this.links)if(this.links[a].rel&&this.links[a].rel=="self")return this.links[a].href;return null}}),dojo.declare("dojox.atom.io.model.Service",dojox.atom.io.model.AtomItem,{constructor:function(a){this.href=a},buildFromDom:function(a){this.workspaces=[];if(a.tagName=="service"&&
!(a.namespaceURI!=dojox.atom.io.model._Constants.PURL_NS&&a.namespaceURI!=dojox.atom.io.model._Constants.APP_NS)){var b=a.namespaceURI;this.name_space=a.namespaceURI;var c;if(typeof a.getElementsByTagNameNS!="undefined")c=a.getElementsByTagNameNS(b,"workspace");else{c=[];for(var d=a.getElementsByTagName("workspace"),a=0;a<d.length;a++)d[a].namespaceURI==b&&c.push(d[a])}if(c&&c.length>0)for(a=b=0;a<c.length;a++){var d=typeof c.item==="undefined"?c[a]:c.item(a),e=new dojox.atom.io.model.Workspace;e.buildFromDom(d);
this.workspaces[b++]=e}}},getCollection:function(a){for(var b=0;b<this.workspaces.length;b++)for(var c=this.workspaces[b].collections,d=0;d<c.length;d++)if(c[d].href==a)return c;return null}}),dojo.declare("dojox.atom.io.model.Workspace",dojox.atom.io.model.AtomItem,{constructor:function(a){this.title=a;this.collections=[]},buildFromDom:function(a){var b=dojox.atom.io.model.util.getNodename(a);if(b=="workspace")for(var a=a.childNodes,c=0,d=0;d<a.length;d++){var e=a[d];if(e.nodeType===1)if(b=dojox.atom.io.model.util.getNodename(e),
e.namespaceURI==dojox.atom.io.model._Constants.PURL_NS||e.namespaceURI==dojox.atom.io.model._Constants.APP_NS)b==="collection"&&(b=new dojox.atom.io.model.Collection,b.buildFromDom(e),this.collections[c++]=b);else if(e.namespaceURI===dojox.atom.io.model._Constants.ATOM_NS&&b==="title")this.title=dojox.xml.parser.textContent(e)}}}),dojo.declare("dojox.atom.io.model.Collection",dojox.atom.io.model.AtomItem,{constructor:function(a,b){this.href=a;this.title=b;this.attributes=[];this.features=[];this.children=
[];this.id=this.memberType=null},buildFromDom:function(a){this.href=a.getAttribute("href");for(var a=a.childNodes,b=0;b<a.length;b++){var c=a[b];if(c.nodeType===1){var d=dojox.atom.io.model.util.getNodename(c);if(c.namespaceURI==dojox.atom.io.model._Constants.PURL_NS||c.namespaceURI==dojox.atom.io.model._Constants.APP_NS)d==="member-type"?this.memberType=dojox.xml.parser.textContent(c):d=="feature"?c.getAttribute("id")&&this.features.push(c.getAttribute("id")):(d=new dojox.atom.io.model.Node,d.buildFromDom(c),
this.children.push(d));else if(c.namespaceURI===dojox.atom.io.model._Constants.ATOM_NS)if(d==="id")this.id=dojox.xml.parser.textContent(c);else if(d==="title")this.title=dojox.xml.parser.textContent(c)}}}});