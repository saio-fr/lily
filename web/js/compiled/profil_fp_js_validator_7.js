function FpJsFormElement(){this.id="";this.name="";this.type="";this.invalidMessage="";this.cascade=false;this.bubbling=false;this.disabled=false;this.transformers=[];this.data={};this.children={};this.parent=null;this.domNode=null;this.callbacks={};this.errors={};this.groups=function(){return["Default"]};this.validate=function(){if(this.disabled){return true}var self=this;var sourceId="form-error-"+String(this.id).replace(/_/g,"-");self.errors[sourceId]=FpJsFormValidator.validateElement(self);var errorPath=FpJsFormValidator.getErrorPathElement(self);var domNode=errorPath.domNode;if(!domNode){for(var childName in errorPath.children){var childDomNode=errorPath.children[childName].domNode;if(childDomNode){domNode=childDomNode;break}}}errorPath.showErrors.apply(domNode,[self.errors[sourceId],sourceId]);return self.errors[sourceId].length==0};this.validateRecursively=function(){this.validate();for(var childName in this.children){this.children[childName].validateRecursively()}};this.isValid=function(){for(var id in this.errors){if(this.errors[id].length>0){return false}}for(var childName in this.children){if(!this.children[childName].isValid()){return false}}return true};this.showErrors=function(errors,sourceId){if(!(this instanceof HTMLElement)){return}var domNode=this;var ul=FpJsFormValidator.getDefaultErrorContainerNode(domNode);if(ul){var len=ul.childNodes.length;while(len--){if(sourceId==ul.childNodes[len].className){ul.removeChild(ul.childNodes[len])}}}if(!errors.length){if(ul&&!ul.childNodes){ul.parentNode.removeChild(ul)}return}if(!ul){ul=document.createElement("ul");ul.className=FpJsFormValidator.errorClass;domNode.parentNode.insertBefore(ul,domNode)}var li;for(var i in errors){li=document.createElement("li");li.className=sourceId;li.innerHTML=errors[i];ul.appendChild(li)}};this.onValidate=function(errors,event){}}function FpJsAjaxRequest(){this.queue=0;this.callbacks=[];this.sendRequest=function(path,data,callback){var self=this;var request=this.createRequest();try{request.open("POST",path,true);request.setRequestHeader("Content-Type","application/x-www-form-urlencoded");request.onreadystatechange=function(){if(4==request.readyState&&200==request.status){callback(request.responseText);self.queue--;self.checkQueue()}};request.send(this.serializeData(data,null));self.queue++}catch(e){console.log(e.message)}};this.checkQueue=function(){if(0==this.queue){for(var i in this.callbacks){this.callbacks[i]()}}};this.serializeData=function(obj,prefix){var queryParts=[];for(var paramName in obj){var key=prefix?prefix+"["+paramName+"]":paramName;var child=obj[paramName];queryParts.push(typeof child=="object"?this.serializeData(child,key):encodeURIComponent(key)+"="+encodeURIComponent(child))}return queryParts.join("&")};this.createRequest=function(){var request=null;if(window.XMLHttpRequest){request=new XMLHttpRequest}else{try{request=new ActiveXObject("Microsoft.XMLHTTP")}catch(e){}try{request=new ActiveXObject("Msxml2.XMLHTTP")}catch(e){}try{request=new ActiveXObject("Msxml2.XMLHTTP.6.0")}catch(e){}try{request=new ActiveXObject("Msxml2.XMLHTTP.3.0")}catch(e){}}return request}}function FpJsCustomizeMethods(){this.init=function(options){FpJsFormValidator.each(this,function(item){if(!item.jsFormValidator){item.jsFormValidator={}}for(var optName in options){switch(optName){case"customEvents":options[optName].apply(item);break;default:item.jsFormValidator[optName]=options[optName];break}}},false);return this};this.validate=function(opts){var isValid=true;FpJsFormValidator.each(this,function(item){var method=opts&&true===opts["recursive"]?"validateRecursively":"validate";var validateUnique=!opts||false!==opts["findUniqueConstraint"];if(validateUnique&&item.jsFormValidator.parent){var data=item.jsFormValidator.parent.data;if(data["entity"]&&data["entity"]["constraints"]){for(var i in data["entity"]["constraints"]){var constraint=data["entity"]["constraints"][i];if(constraint instanceof FpJsFormValidatorBundleFormConstraintUniqueEntity&&constraint.fields.indexOf(item.name)){var owner=item.jsFormValidator.parent;constraint.validate(null,owner)}}}}if(!item.jsFormValidator[method]()){isValid=false}});return isValid};this.showErrors=function(opts){FpJsFormValidator.each(this,function(item){item.jsFormValidator.errors[opts["sourceId"]]=opts["errors"];item.jsFormValidator.showErrors.apply(item,[opts["errors"],opts["sourceId"]])})};this.submitForm=function(event){FpJsFormValidator.each(this,function(item){var element=item.jsFormValidator;if(event){event.preventDefault()}element.validateRecursively();if(FpJsFormValidator.ajax.queue){if(event){event.preventDefault()}FpJsFormValidator.ajax.callbacks.push(function(){element.onValidate.apply(element.domNode,[FpJsFormValidator.getAllErrors(element,{}),event]);if(element.isValid()){item.submit()}})}else{element.onValidate.apply(element.domNode,[FpJsFormValidator.getAllErrors(element,{}),event]);if(element.isValid()){item.submit()}}})};this.get=function(){var elements=[];FpJsFormValidator.each(this,function(item){elements.push(item.jsFormValidator)});return elements};this.addPrototype=function(name){FpJsFormValidator.each(this,function(item){var prototype=FpJsFormValidator.preparePrototype(FpJsFormValidator.cloneObject(item.jsFormValidator.prototype),name,item.jsFormValidator.id+"_"+name);item.jsFormValidator.children[name]=FpJsFormValidator.createElement(prototype);item.jsFormValidator.children[name].parent=item.jsFormValidator})};this.delPrototype=function(name){FpJsFormValidator.each(this,function(item){delete item.jsFormValidator.children[name]})}}var FpJsBaseConstraint={prepareMessage:function(message,params,plural){var realMsg=message;var listMsg=message.split("|");if(listMsg.length>1){if(plural==1){realMsg=listMsg[0]}else{realMsg=listMsg[1]}}for(var paramName in params){var regex=new RegExp(paramName,"g");realMsg=realMsg.replace(regex,params[paramName])}return realMsg}};var FpJsFormValidator=new function(){this.forms={};this.errorClass="form-errors";this.config={};this.ajax=new FpJsAjaxRequest;this.customizeMethods=new FpJsCustomizeMethods;this.constraintsCounter=0;this.addModel=function(model,onLoad){var self=this;if(!model)return;if(onLoad!==false){this.onDocumentReady(function(){self.forms[model.id]=self.initModel(model)})}else{self.forms[model.id]=self.initModel(model)}};this.onDocumentReady=function(callback){var addListener=document.addEventListener||document.attachEvent;var removeListener=document.removeEventListener||document.detachEvent;var eventName=document.addEventListener?"DOMContentLoaded":"onreadystatechange";addListener.call(document,eventName,function(){removeListener.call(this,eventName,arguments.callee,false);callback()},false)};this.initModel=function(model){var element=this.createElement(model);var form=this.findFormElement(element);element.domNode=form;this.attachElement(element);if(form){this.attachDefaultEvent(element,form)}return element};this.createElement=function(model){var element=new FpJsFormElement;element.domNode=this.findDomElement(model);if(model.children instanceof Array&&!model.length&&!element.domNode){return null}for(var key in model){if("children"==key){for(var childName in model.children){var childElement=this.createElement(model.children[childName]);if(childElement){element.children[childName]=childElement;element.children[childName].parent=element}}}else if("transformers"==key){element.transformers=this.parseTransformers(model[key])}else{element[key]=model[key]}}for(var type in element.data){var constraints=[];if(element.data[type].constraints){constraints=this.parseConstraints(element.data[type].constraints)}element.data[type].constraints=constraints;var getters={};if(element.data[type].getters){for(var getterName in element.data[type].getters){getters[getterName]=this.parseConstraints(element.data[type].getters[getterName])}}element.data[type].getters=getters}this.attachElement(element);return element};this.validateElement=function(element){var errors=[];var value=this.getElementValue(element);for(var type in element.data){if(!this.checkParentCascadeOption(element)&&"entity"==type){continue}if(element.parent&&!this.checkParentCascadeOption(element.parent)&&"parent"==type){continue}var groupsValue=element.data[type]["groups"];if(typeof groupsValue=="string"){groupsValue=this.getParentElementById(groupsValue,element).groups.apply(element.domNode)}errors=errors.concat(this.validateConstraints(value,element.data[type]["constraints"],groupsValue,element));for(var getterName in element.data[type]["getters"]){if(typeof element.callbacks[getterName]=="function"){var receivedValue=element.callbacks[getterName].apply(element.domNode);errors=errors.concat(this.validateConstraints(receivedValue,element.data[type]["getters"][getterName],groupsValue,element))}}}return errors};this.checkParentCascadeOption=function(element){var result=true;if(element.parent&&!element.parent.cascade&&"collection"!=element.parent.type){result=false}else if(element.parent){result=this.checkParentCascadeOption(element.parent)}return result};this.validateConstraints=function(value,constraints,groups,owner){var errors=[];var i=constraints.length;while(i--){if(this.checkValidationGroups(groups,constraints[i].groups)){errors=errors.concat(constraints[i].validate(value,owner))}}return errors};this.checkValidationGroups=function(needle,haystack){var result=false;var i=needle.length;while(i--){if(-1!==haystack.indexOf(needle[i])){result=true;break}}return result};this.getElementValue=function(element){var i=element.transformers.length;var value=this.getInputValue(element);if(i&&undefined===value){value=this.getMappedValue(element)}else if("collection"==element.type){value={};for(var childName in element.children){value[childName]=this.getMappedValue(element.children[childName])}}else{value=this.getSpecifiedElementTypeValue(element)}while(i--){value=element.transformers[i].reverseTransform(value,element)}return value};this.getInputValue=function(element){return element.domNode?element.domNode.value:undefined};this.getMappedValue=function(element){var result=this.getSpecifiedElementTypeValue(element);if(undefined===result){result={};for(var childName in element.children){var child=element.children[childName];result[child.name]=this.getMappedValue(child)}}return result};this.getSpecifiedElementTypeValue=function(element){if(!element.domNode){return undefined}var value;if("checkbox"==element.type||"radio"==element.type){value=element.domNode.checked}else if("select"===element.domNode.tagName.toLowerCase()){value=[];var field=element.domNode;var len=field.length;while(len--){if(field.options[len].selected){value.push(field.options[len].value)}}}else{value=this.getInputValue(element)}return value};this.parseConstraints=function(list){var constraints=[];for(var name in list){var className=name.replace(/\\/g,"");if(undefined!==window[className]){var i=list[name].length;while(i--){var constraint=new window[className];for(var param in list[name][i]){constraint[param]=list[name][i][param]}constraint.uniqueId=this.constraintsCounter;this.constraintsCounter++;if(typeof constraint.onCreate==="function"){constraint.onCreate()}constraints.push(constraint)}}}return constraints};this.parseTransformers=function(list){var transformers=[];var i=list.length;while(i--){var className=String(list[i]["name"]).replace(/\\/g,"");if(undefined!==window[className]){var transformer=new window[className];for(var propName in list[i]){transformer[propName]=list[i][propName]}if(undefined!==transformer.transformers){transformer.transformers=this.parseTransformers(transformer.transformers)}transformers.push(transformer)}}return transformers};this.getParentElementById=function(id,element){if(id==element.id){return element}else if(element.parent){return this.getParentElementById(id,element.parent)}else{return null}};this.attachElement=function(element){if(!element.domNode){return}if(undefined!==element.domNode.jsFormValidator){for(var key in element.domNode.jsFormValidator){element[key]=element.domNode.jsFormValidator[key]}}element.domNode.jsFormValidator=element};this.attachDefaultEvent=function(element,form){form.addEventListener("submit",function(event){FpJsFormValidator.customize(form,"submitForm",event)})};this.findDomElement=function(model){var domElement=document.getElementById(model.id);if(!domElement){var list=document.getElementsByName(model.name);if(list.length){domElement=list[0]}}return domElement};this.findFormElement=function(element){var form=null;if(element.domNode&&"form"==element.domNode.tagName.toLowerCase()){form=element.domNode}else{var realChild=this.findRealChildElement(element);if(realChild){form=this.findParentForm(realChild)}}return form};this.findRealChildElement=function(element){var child=element.domNode;if(!child){for(var childName in element.children){child=element.children[childName].domNode;if(child){break}}}return child};this.findParentForm=function(child){if("form"==child.tagName.toLowerCase()){return child}else if(child.parentNode){return this.findParentForm(child.parentNode)}else{return null}};this.getDefaultErrorContainerNode=function(htmlElement){var ul=htmlElement.previousSibling;if(!ul||ul.className!==this.errorClass){return null}else{return ul}};this.getErrorPathElement=function(element){if(!element.bubbling){return element}else{return this.getRootElement(element)}};this.getRootElement=function(element){if(element.parent){return this.getRootElement(element.parent)}else{return element}};this.customize=function(items,method){if(!Array.isArray(items)){items=[items]}if(!method){return this.customizeMethods.get.apply(items,Array.prototype.slice.call(arguments,1))}else if(typeof method==="object"){return this.customizeMethods.init.apply(items,Array.prototype.slice.call(arguments,1))}else if(this.customizeMethods[method]){return this.customizeMethods[method].apply(items,Array.prototype.slice.call(arguments,2))}else{$.error("Method "+method+" does not exist");return this}};this.each=function(list,callback,skipEmpty){skipEmpty=undefined==skipEmpty?true:skipEmpty;var len=list.length;while(len--){if(skipEmpty&&(!list[len]||!list[len].jsFormValidator)){continue}callback(list[len])}};this.getRealCallback=function(element,data){var className=null;var methodName=null;if(typeof data=="string"){methodName=data}else if(Array.isArray(data)){if(1==data.length){methodName=data[0]}else{className=data[0];methodName=data[1]}}var callback=null;if(!element.callbacks[className]&&typeof element.callbacks[methodName]=="function"){callback=element.callbacks[methodName]}else if(element.callbacks[className]&&typeof element.callbacks[className][methodName]=="function"){callback=element.callbacks[className][methodName]}else if(typeof element.callbacks[methodName]=="function"){callback=element.callbacks[methodName]}return callback};this.getAllErrors=function(element,container){if(container==null||typeof container!=="object"){container={}}var hasErrors=false;for(var sourceId in element.errors){if(element.errors[sourceId].length){hasErrors=true;break}}if(hasErrors){container[element.id]=element.errors}for(var childName in element.children){container=this.getAllErrors(element.children[childName],container)}return container};this.preparePrototype=function(prototype,name,id){prototype.name=prototype.name.replace(/__name__/g,name);prototype.id=prototype.id.replace(/__name__/g,id);if(typeof prototype.children=="object"){for(var childName in prototype.children){prototype[childName]=this.preparePrototype(prototype.children[childName],name,id)}}return prototype};this.cloneObject=function(object){var clone={};for(var i in object){if(typeof object[i]=="object"&&!(object[i]instanceof Array)){clone[i]=this.cloneObject(object[i])}else{clone[i]=object[i]}}return clone};this.isValueEmty=function(value){return[undefined,null,false].indexOf(value)>=0||0===this.getValueLength(value)};this.isValueArray=function(value){return value instanceof Array};this.isValueObject=function(value){return typeof value=="object"&&null!==value};this.getValueLength=function(value){var length=null;if(typeof value=="number"||typeof value=="string"||this.isValueArray(value)){length=value.length}else if(this.isValueObject(value)){var count=0;for(var propName in value){if(value.hasOwnProperty(propName)){count++}}length=count}return length}};function SymfonyComponentValidatorConstraintsBlank(){this.message="";this.validate=function(value){var errors=[];var f=FpJsFormValidator;if(!f.isValueEmty(value)){errors.push(this.message.replace("{{ value }}",String(value)))}return errors}}function SymfonyComponentValidatorConstraintsCallback(){this.callback=null;this.methods=[];this.validate=function(value,element){if(!this.callback){this.callback=[]}if(!this.methods){this.methods=[this.callback]}for(var i in this.methods){var method=FpJsFormValidator.getRealCallback(element,this.methods[i]);if(null!==method){method.apply(element.domNode)}else{throw new Error('Can not find a "'+this.callback+'" callback for the element id="'+element.id+'" to validate the Callback constraint.')}}return[]}}function SymfonyComponentValidatorConstraintsChoice(){this.choices=[];this.callback=null;this.max=null;this.min=null;this.message="";this.maxMessage="";this.minMessage="";this.multiple=false;this.multipleMessage="";this.strict=false;this.validate=function(value,element){var errors=[];value=this.getValue(value);if(null===value){return errors}var invalidList=this.getInvalidChoices(value,this.getChoicesList(element));var invalidCnt=invalidList.length;if(this.multiple){if(invalidCnt){while(invalidCnt--){errors.push(this.multipleMessage.replace("{{ value }}",String(invalidList[invalidCnt])))}}if(!isNaN(this.min)&&value.length<this.min){errors.push(this.minMessage)}if(!isNaN(this.max)&&value.length>this.max){errors.push(this.maxMessage)}}else if(invalidCnt){while(invalidCnt--){errors.push(this.message.replace("{{ value }}",String(invalidList[invalidCnt])))}}return errors};this.onCreate=function(){this.min=parseInt(this.min);this.max=parseInt(this.max);this.minMessage=FpJsBaseConstraint.prepareMessage(this.minMessage,{"{{ limit }}":this.min},this.min);this.maxMessage=FpJsBaseConstraint.prepareMessage(this.maxMessage,{"{{ limit }}":this.max},this.max)};this.getValue=function(value){if(-1!==[undefined,null,""].indexOf(value)){return null}else if(!(value instanceof Array)){return[value]}else{return value}};this.getChoicesList=function(element){var choices=null;if(this.callback){var callback=FpJsFormValidator.getRealCallback(element,this.callback);if(null!==callback){choices=callback.apply(element.domNode)}else{throw new Error('Can not find a "'+this.callback+'" callback for the element id="'+element.id+'" to get a choices list.')}}if(null==choices){choices=null==this.choices?[]:this.choices}return choices};this.getInvalidChoices=function(value,validChoices){var callbackFilter=function(n){return validChoices.indexOf(n)==-1};if(this.strict){callbackFilter=function(n){var result=false;for(var i in validChoices){if(n!==validChoices[i]){result=true}}return result}}return value.filter(callbackFilter)}}function SymfonyComponentValidatorConstraintsCount(){this.maxMessage="";this.minMessage="";this.exactMessage="";this.max=null;this.min=null;this.validate=function(value){var errors=[];var f=FpJsFormValidator;if(!f.isValueArray(value)&&!f.isValueObject(value)){return errors}var count=f.getValueLength(value);if(null!==count){if(this.max===this.min&&count!==this.min){errors.push(this.exactMessage);return errors}if(!isNaN(this.max)&&count>this.max){errors.push(this.maxMessage)}if(!isNaN(this.min)&&count<this.min){errors.push(this.minMessage)}}return errors};this.onCreate=function(){this.min=parseInt(this.min);this.max=parseInt(this.max);this.minMessage=FpJsBaseConstraint.prepareMessage(this.minMessage,{"{{ limit }}":this.min},this.min);this.maxMessage=FpJsBaseConstraint.prepareMessage(this.maxMessage,{"{{ limit }}":this.max},this.max);this.exactMessage=FpJsBaseConstraint.prepareMessage(this.exactMessage,{"{{ limit }}":this.min},this.min)}}function SymfonyComponentValidatorConstraintsDate(){this.message="";this.validate=function(value){var regexp=/^(\d{4})-(\d{2})-(\d{2})$/;var errors=[];var f=FpJsFormValidator;if(!f.isValueEmty(value)&&!regexp.test(value)){errors.push(this.message.replace("{{ value }}",String(value)))}return errors}}function SymfonyComponentValidatorConstraintsDateTime(){this.message="";this.validate=function(value){var regexp=/^(\d{4})-(\d{2})-(\d{2}) (0[0-9]|1[0-9]|2[0-3]):([0-5][0-9]):([0-5][0-9])$/;var errors=[];var f=FpJsFormValidator;if(!f.isValueEmty(value)&&!regexp.test(value)){errors.push(this.message.replace("{{ value }}",String(value)))}return errors}}function SymfonyComponentValidatorConstraintsEmail(){this.message="";this.validate=function(value){var regexp=/^[-a-z0-9~!$%^&*_=+}{'?]+(\.[-a-z0-9~!$%^&*_=+}{'?]+)*@([a-z0-9_][-a-z0-9_]*(\.[-a-z0-9_]+)*\.(aero|arpa|biz|com|coop|edu|gov|info|int|mil|museum|name|net|org|pro|travel|mobi|[a-z][a-z])|([0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}))(:[0-9]{1,5})?$/i;var errors=[];var f=FpJsFormValidator;if(!f.isValueEmty(value)&&!regexp.test(value)){errors.push(this.message.replace("{{ value }}",String(value)))}return errors}}function SymfonyComponentValidatorConstraintsEqualTo(){this.message="";this.value=null;this.validate=function(value){var errors=[];var f=FpJsFormValidator;if(!f.isValueEmty(value)&&this.value!=value){errors.push(this.message.replace("{{ value }}",String(this.value)).replace("{{ compared_value }}",String(this.value)).replace("{{ compared_value_type }}",String(this.value)))}return errors}}function SymfonyComponentValidatorConstraintsFalse(){this.message="";this.validate=function(value){var errors=[];if(""!==value&&false!==value){errors.push(this.message.replace("{{ value }}",value))}return errors}}function SymfonyComponentValidatorConstraintsGreaterThan(){this.message="";this.value=null;this.validate=function(value){var f=FpJsFormValidator;if(f.isValueEmty(value)||value>this.value){return[]}else{return[this.message.replace("{{ value }}",String(this.value)).replace("{{ compared_value }}",String(this.value))]}}}function SymfonyComponentValidatorConstraintsGreaterThanOrEqual(){this.message="";this.value=null;this.validate=function(value){var f=FpJsFormValidator;if(f.isValueEmty(value)||value>=this.value){return[]}else{return[this.message.replace("{{ value }}",String(this.value)).replace("{{ compared_value }}",String(this.value))]}}}function SymfonyComponentValidatorConstraintsIdenticalTo(){this.message="";this.value=null;this.validate=function(value){var errors=[];if(""!==value&&this.value!==value){errors.push(this.message.replace("{{ value }}",String(value)).replace("{{ compared_value }}",String(this.value)).replace("{{ compared_value_type }}",String(this.value)))}return errors}}function SymfonyComponentValidatorConstraintsIp(){this.message="";this.validate=function(value){var regexp=/^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/;var errors=[];var f=FpJsFormValidator;if(!f.isValueEmty(value)&&!regexp.test(value)){errors.push(this.message.replace("{{ value }}",String(value)))}return errors}}function SymfonyComponentValidatorConstraintsLength(){this.maxMessage="";this.minMessage="";this.exactMessage="";this.max=null;this.min=null;this.validate=function(value){var errors=[];var f=FpJsFormValidator;var length=f.getValueLength(value);if(""!==value&&null!==length){if(this.max===this.min&&length!==this.min){errors.push(this.exactMessage);return errors}if(!isNaN(this.max)&&length>this.max){errors.push(this.maxMessage)}if(!isNaN(this.min)&&length<this.min){errors.push(this.minMessage)}}return errors};this.onCreate=function(){this.min=parseInt(this.min);this.max=parseInt(this.max);this.minMessage=FpJsBaseConstraint.prepareMessage(this.minMessage,{"{{ limit }}":this.min},this.min);this.maxMessage=FpJsBaseConstraint.prepareMessage(this.maxMessage,{"{{ limit }}":this.max},this.max);this.exactMessage=FpJsBaseConstraint.prepareMessage(this.exactMessage,{"{{ limit }}":this.min},this.min)}}function SymfonyComponentValidatorConstraintsLessThan(){this.message="";this.value=null;this.validate=function(value){var f=FpJsFormValidator;if(f.isValueEmty(value)||value<this.value){return[]}else{return[this.message.replace("{{ value }}",String(this.value)).replace("{{ compared_value }}",String(this.value))]}}}function SymfonyComponentValidatorConstraintsLessThanOrEqual(){this.message="";this.value=null;this.validate=function(value){var f=FpJsFormValidator;if(f.isValueEmty(value)||value<=this.value){return[]}else{return[this.message.replace("{{ value }}",String(this.value)).replace("{{ compared_value }}",String(this.value))]}}}function SymfonyComponentValidatorConstraintsNotBlank(){this.message="";this.validate=function(value){var errors=[];var f=FpJsFormValidator;if(f.isValueEmty(value)){errors.push(this.message.replace("{{ value }}",String(value)))}return errors}}function SymfonyComponentValidatorConstraintsNotEqualTo(){this.message="";this.value=null;this.validate=function(value){var errors=[];if(""!==value&&this.value==value){errors.push(this.message.replace("{{ value }}",String(this.value)).replace("{{ compared_value }}",String(this.value)).replace("{{ compared_value_type }}",String(this.value)))}return errors}}function SymfonyComponentValidatorConstraintsNotIdenticalTo(){this.message="";this.value=null;this.validate=function(value){var errors=[];if(""!==value&&this.value===value){errors.push(this.message.replace("{{ value }}",String(value)).replace("{{ compared_value }}",String(this.value)).replace("{{ compared_value_type }}",String(this.value)))}return errors}}function SymfonyComponentValidatorConstraintsNotNull(){this.message="";this.validate=function(value){var errors=[];if(null===value){errors.push(this.message.replace("{{ value }}",String(value)))}return errors}}function SymfonyComponentValidatorConstraintsNull(){this.message="";this.validate=function(value){var errors=[];if(null!==value){errors.push(this.message.replace("{{ value }}",String(value)))}return errors}}function SymfonyComponentValidatorConstraintsRange(){this.maxMessage="";this.minMessage="";this.invalidMessage="";this.max=null;this.min=null;this.validate=function(value){var errors=[];var f=FpJsFormValidator;if(f.isValueEmty(value)){return errors}if(isNaN(value)){errors.push(this.invalidMessage.replace("{{ value }}",String(value)))}if(!isNaN(this.max)&&value>this.max){errors.push(this.maxMessage.replace("{{ value }}",String(value)).replace("{{ limit }}",this.max))}if(!isNaN(this.min)&&value<this.min){errors.push(this.minMessage.replace("{{ value }}",String(value)).replace("{{ limit }}",this.min))}return errors};this.onCreate=function(){this.min=parseInt(this.min);this.max=parseInt(this.max)}}function SymfonyComponentValidatorConstraintsRegex(){this.message="";this.pattern="";this.match=true;this.validate=function(value){var errors=[];var f=FpJsFormValidator;if(!f.isValueEmty(value)&&!this.pattern.test(value)){errors.push(this.message.replace("{{ value }}",String(value)))}return errors};this.onCreate=function(){var flags=this.pattern.match(/[\/#](\w*)$/);this.pattern=new RegExp(this.pattern.trim().replace(/(^[\/#])|([\/#]\w*$)/g,""),flags[1])}}function SymfonyComponentValidatorConstraintsTime(){this.message="";this.validate=function(value){var regexp=/^(0[0-9]|1[0-9]|2[0-3]):([0-5][0-9]):([0-5][0-9])$/;var errors=[];var f=FpJsFormValidator;if(!f.isValueEmty(value)&&!regexp.test(value)){errors.push(this.message.replace("{{ value }}",String(value)))}return errors}}function SymfonyComponentValidatorConstraintsTrue(){this.message="";this.validate=function(value){if(""===value){return[]}var errors=[];if(true!==value){errors.push(this.message.replace("{{ value }}",value))}return errors}}function SymfonyComponentValidatorConstraintsType(){this.message="";this.type="";this.validate=function(value){if(""===value){return[]}var errors=[];var isValid=false;switch(this.type){case"array":isValid=value instanceof Array;break;case"bool":case"boolean":isValid=typeof value==="boolean";break;case"callable":isValid=typeof value==="function";break;case"float":case"double":case"real":isValid=typeof value==="number"&&value%1!=0;break;case"int":case"integer":case"long":isValid=value===parseInt(value);break;case"null":isValid=null===value;break;case"numeric":isValid=!isNaN(value);break;case"object":isValid=null!==value&&typeof value==="object";break;case"scalar":isValid=/boolean|number|string/.test(typeof value);value="Array";break;case"":case"string":isValid=typeof value==="string";break;case"resource":isValid=true;break;default:throw'The wrong "'+this.type+'" type was passed to the Type constraint'}if(!isValid){errors.push(this.message.replace("{{ value }}",value).replace("{{ type }}",this.type))}return errors}}function FpJsFormValidatorBundleFormConstraintUniqueEntity(){this.message="This value is already used.";this.service="doctrine.orm.validator.unique";this.em=null;this.repositoryMethod="findBy";this.fields=[];this.errorPath=null;this.ignoreNull=true;this.entityName=null;this.groups=[];this.validate=function(value,element){var self=this;var route=null;var config=FpJsFormValidator.config;var errorPath=this.getErrorPathElement(element);if(config["routing"]&&config["routing"]["check_unique_entity"]){route=config["routing"]["check_unique_entity"]}if(!route){return[]}FpJsFormValidator.ajax.sendRequest(route,{message:this.message,service:this.service,em:this.em,repositoryMethod:this.repositoryMethod,fields:this.fields,errorPath:this.errorPath,ignoreNull:this.ignoreNull?1:0,groups:this.groups,entityName:this.entityName,data:this.getValues(element,this.fields)},function(response){response=JSON.parse(response);var errors=[];if(false===response){errors.push(self.message)}FpJsFormValidator.customize(errorPath.domNode,"showErrors",{errors:errors,sourceId:"unique-entity-"+self.uniqueId})});return[]};this.onCreate=function(){if(typeof this.fields==="string"){this.fields=[this.fields]}};this.getValues=function(element,fields){var value;var result={};for(var i=0;i<fields.length;i++){value=FpJsFormValidator.getElementValue(element.children[this.fields[i]]);value=value?value:"";result[fields[i]]=value}return result};this.getErrorPathElement=function(element){var errorPath=this.fields[0];if(this.errorPath){errorPath=this.errorPath}return element.children[errorPath]}}function SymfonyComponentValidatorConstraintsUrl(){this.message="";this.validate=function(value,element){var regexp=/(ftp|https?):\/\/(www\.)?[\w\-\.@:%_\+~#=]+\.\w{2,3}(\/\w+)*(\?.*)?/;var errors=[];var f=FpJsFormValidator;if(!f.isValueEmty(value)&&!regexp.test(value)){element.domNode.value="http://"+value;errors.push(this.message.replace("{{ value }}",String("http://"+value)))}return errors}}function SymfonyComponentFormExtensionCoreDataTransformerArrayToPartsTransformer(){this.partMapping={};this.reverseTransform=function(value){if(typeof value!=="object"){throw new Error("Expected an object.")}var result={};for(var partKey in this.partMapping){if(undefined!==value[partKey]){var i=this.partMapping[partKey].length;while(i--){var originalKey=this.partMapping[partKey][i];if(undefined!==value[partKey][originalKey]){result[originalKey]=value[partKey][originalKey]}}}}return result}}function SymfonyComponentFormExtensionCoreDataTransformerBooleanToStringTransformer(){this.trueValue=null;this.reverseTransform=function(value){if(typeof value==="boolean"){return value}else if(value===this.trueValue){return true}else if(!value){return false}else{throw new Error("Wrong type of value")}}}function SymfonyComponentFormExtensionCoreDataTransformerChoiceToBooleanArrayTransformer(){this.choiceList={};this.placeholderPresent=false;this.reverseTransform=function(value){if(typeof value!=="object"){throw new Error("Unexpected value type")}for(var i in value){if(value[i]){if(undefined!==this.choiceList[i]){return this.choiceList[i]===""?null:this.choiceList[i]
}else if(this.placeholderPresent&&"placeholder"==i){return null}else{throw new Error('The choice "'+i+'" does not exist')}}}return null}}function SymfonyComponentFormExtensionCoreDataTransformerChoiceToValueTransformer(){this.choiceList={};this.reverseTransform=function(value){for(var i in value){if(""===value[i]){value.splice(i,1)}}return value}}function SymfonyComponentFormExtensionCoreDataTransformerChoicesToBooleanArrayTransformer(){this.choiceList={};this.reverseTransform=function(value){if(typeof value!=="object"){throw new Error("Unexpected value type")}var result=[];var unknown=[];for(var i in value){if(value[i]){if(undefined!==this.choiceList[i]){result.push(this.choiceList[i])}else{unknown.push(i)}}}if(unknown.length){throw new Error('The choices "'+unknown.join(", ")+'" were not found.')}return result}}function SymfonyComponentFormExtensionCoreDataTransformerChoicesToValuesTransformer(){this.choiceList={};this.reverseTransform=function(value){for(var i in value){if(""===value[i]){value.splice(i,1)}}return value}}function SymfonyComponentFormExtensionCoreDataTransformerDataTransformerChain(transformers){this.transformers=transformers;this.reverseTransform=function(value,element){var len=this.transformers.length;for(var i=0;i<len;i++){value=this.transformers[i].reverseTransform(value,element)}return value}}function SymfonyComponentFormExtensionCoreDataTransformerDateTimeToArrayTransformer(){this.dateFormat="{0}-{1}-{2}";this.timeFormat="{0}:{1}:{2}";this.reverseTransform=function(value){var result=[];if(value["year"]||value["month"]||value["day"]){result.push(this.formatDate(this.dateFormat,[value["year"]?value["year"]:"1970",value["month"]?this.twoDigits(value["month"]):"01",value["day"]?this.twoDigits(value["day"]):"01"]))}if(value["hour"]||value["minute"]||value["second"]){result.push(this.formatDate(this.timeFormat,[value["hour"]?this.twoDigits(value["hour"]):"00",value["minute"]?this.twoDigits(value["minute"]):"00",value["second"]?this.twoDigits(value["second"]):"00"]))}return result.join(" ")};this.twoDigits=function(value){return("0"+value).slice(-2)};this.formatDate=function(format,date){return format.replace(/{(\d+)}/g,function(match,number){return typeof date[number]!="undefined"?date[number]:match})}}function SymfonyComponentFormExtensionCoreDataTransformerValueToDuplicatesTransformer(){this.keys=[];this.reverseTransform=function(value,element){var initialValue=undefined;var errors=[];for(var key in value){if(undefined===initialValue){initialValue=value[key]}var child=element.children[this.keys[0]];if(value[key]!==initialValue){errors.push(element.invalidMessage);break}}FpJsFormValidator.customize(child.domNode,"showErrors",{errors:errors,sourceId:"value-to-duplicates-"+child.id});return initialValue}}if(window.jQuery){(function($){$.fn.jsFormValidator=function(method){if(!method){return FpJsFormValidator.customizeMethods.get.apply($.makeArray(this),arguments)}else if(typeof method==="object"){return $(FpJsFormValidator.customizeMethods.init.apply($.makeArray(this),arguments))}else if(FpJsFormValidator.customizeMethods[method]){return FpJsFormValidator.customizeMethods[method].apply($.makeArray(this),Array.prototype.slice.call(arguments,1))}else{$.error("Method "+method+" does not exist");return this}}})(jQuery)}