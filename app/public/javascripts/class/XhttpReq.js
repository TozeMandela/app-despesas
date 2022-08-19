class XhttpReq {

    static get(url, params={}){
        return new XhttpReq().itsAjax('get', url, params);
    }
    static del(url, params={}){
        return new XhttpReq().itsAjax('delete', url, params);
    }
    static post(url, params={}){
        return new XhttpReq().itsAjax('post', url, params);
    }
    static put(url, params={}){
        return new XhttpReq().itsAjax('put', url, params);
    }

    
    itsAjax(method, url, params={}){
        return new Promise((resolve, reject)=>{
            
        let ajax = new XMLHttpRequest();
        ajax.open(method.toUpperCase(), url);

        ajax.setRequestHeader('Content-Type', 'application/json');
        ajax.send(JSON.stringify(params));

        ajax.onload = (evt)=>{
            try{
                resolve(JSON.parse(ajax.responseText))
            }catch(err){
                reject(err);
            }
        }

        })
    }
}