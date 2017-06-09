/**
 * Created by Administrator on 2017/3/22 0022.
 */

//var ApiHost = "http://192.168.19.123:8080";//host
var ApiHost = "http://www.0001wan.com";//host;
function toUrlPar(obj) {
    var s = ""
    for (var itm in obj) {
        if (obj[itm] instanceof Array == true) {
            //是数组
            s += "&" + itm + "_count=" + obj[itm].length
            for (var i = 0; i < obj[itm].length; i++) {
                if (obj[itm][i] instanceof Array == true) {
                    s += ergodicJson2(obj[itm][i]);
                } else if (obj[itm][i] instanceof Object == true) {
                    s += ergodicJson2(obj[itm][i]);
                } else {
                    s += "&" + encodeURI(obj[itm][i]) + "=" + encodeURI(obj[itm][i]);
                }
            }
        } else if (obj[itm] instanceof Object == true) {
            //是json对象。
            s += ergodicJson2(obj[itm]);
        }
        else {
            //是简单数值
            s += "&" + encodeURI(itm) + "=" + encodeURI(obj[itm]);
        }
    }
    if(s){
        s = "?"+s.substring(1,s.length);
        return s;
    }else{
        return '';
    }

}
var ajaxHelper = (function(http){
    http=http||{};
    //post请求
    http.post = function(url,data,callBack,header,callErrBack){
        //document.getElementById('ajaxloading').style.display = 'block';
        header = header||void(0);
        var xhr = new plus.net.XMLHttpRequest();//xhr对象;
        xhr.onreadystatechange = function () {
            switch ( xhr.readyState ) {
                case 4:
                    if ( xhr.status == 200 ) {
                        callBack( JSON.parse(xhr.responseText) );
                        //document.getElementById("ajaxloading").style.display = 'none';
                    } else {
                        //document.getElementById("ajaxloading").style.display = 'none';
                        callErrBack&&callErrBack();
                        console.log( "xhr请求失败："+xhr.responseText );
                    }
                    break;
                default :
                    break;
            }
        };
        //超时处理
        xhr.ontimeout = function(e){
            //LayaSample.littleTip.showThis("网络超时");
            //document.getElementById("ajaxloading").style.display = 'none';
        }
        xhr.timeout = 10000;
        xhr.overrideMimeType( "json; charset=utf-8" );
        xhr.open( "POST", ApiHost+url );
        //请求头设置
        xhr.setRequestHeader('Accept','*/*');
        xhr.setRequestHeader('Accept-Encoding',' deflate, sdch');
        xhr.setRequestHeader('Accept-Language','h-CN,zh;q=0.8');
        xhr.setRequestHeader('Connection','keep-alive');
        xhr.setRequestHeader('Content-Type','application/json');
        xhr.setRequestHeader('Host','www.0001wan.com');
        xhr.setRequestHeader('Referer','http://www.0001wan.com/');
        xhr.setRequestHeader('Authorization','bearer ' + oauth.getToken());

        xhr.send(data);
        console.log(data)
    };

    //get请求
    http.get = function(url,data,callBack,header,callErrBack){
        //document.getElementById('ajaxloading').style.display = 'block';
        header = header||void(0);
        var xhr = new plus.net.XMLHttpRequest();
        xhr.onreadystatechange = function () {
            switch ( xhr.readyState ) {
                case 4:
                    if ( xhr.status == 200 ) {
                        callBack( JSON.parse(xhr.responseText) );
                        //document.getElementById("ajaxloading").style.display = 'none';
                    } else {
                        //document.getElementById("ajaxloading").style.display = 'none';
                        callErrBack&&callErrBack();
                        console.log( "xhr请求失败："+xhr.responseText);
                    }
                    break;
                default :
                    break;
            }
        }
        //超时处理
        xhr.ontimeout = function(e){
            //if(LayaSample!='undefine'){
            //    LayaSample.littleTip.showThis("网络超时");
            //}
            //document.getElementById("ajaxloading").style.display = 'none';
        }
        xhr.timeout = 10000;
        xhr.overrideMimeType( "json; charset=utf-8" );
        //打开请求
        xhr.open( "GET", ApiHost+url+toUrlPar(data) );
        //请求头设置
        xhr.setRequestHeader('Accept','*/*');
        xhr.setRequestHeader('Accept-Encoding',' deflate, sdch');
        xhr.setRequestHeader('Accept-Language','h-CN,zh;q=0.8');
        xhr.setRequestHeader('Connection','keep-alive');
        xhr.setRequestHeader('Content-Type','application/json');
        xhr.setRequestHeader('Host','www.0001wan.com');
        xhr.setRequestHeader('Referer','http://www.0001wan.com/');
        xhr.setRequestHeader('Authorization','bearer ' + oauth.getToken());

        xhr.send();
    }
    return http;
})(ajaxHelper);


/*
var ajaxHelper = {
    //purl 是接口url
    //data是传入参数
    //callbacl是成功后的回调函数
    //async是同步异步开发，默认异步可不传，如需同步，则必须传false
    post: function (purl, data, callback, async) {
        var async = async == void(0) ? true : false;
        $.ajax({
            type: 'POST',
            url: purl,
            async: async,
            contentType: "application/json; charset=utf-8",
            data: JSON.stringify(data),
            dataType: 'json',
            success: function (result) {
                var code = result.code;
                if (code == '401') {

                    layer.confirm('亲爱的玩家，您尚未登陆', {
                        btn: ['去登录','取消'] //按钮
                    }, function(){
                        window.location.href = '/login.html';
                    }, function(){

                    });
                }
                callback && callback(result);
            },
            error: function (info) {
                oauth.clean();
                console.log(info);

                layer.confirm('亲爱的玩家，您尚未登陆', {
                    btn: ['去登录','取消'] //按钮
                }, function(){
                    window.location.href = '/login.html';
                }, function(){

                });

            },
            complete: function (xhr, status) {

            }, beforeSend: function (request) {
                request.setRequestHeader("Authorization", 'bearer ' + oauth.getToken());
            }
        });
    },
    get: function (purl, data, callback, async) {
        // $.showLoading();
        //data.token = util.getToken();
        //data.token_str = util.getTokenStr(data.token, API_TOKEN);
        var async = async == void(0) ? true : false;
        $.ajax({
            type: 'GET',
            url: purl,
            data: data,
            async: async,
            contentType: "application/json; charset=utf-8",
            dataType: 'json',
            success: function (result) {
                var code = result.code;
                if (code == '401') {
                    layer.confirm('亲爱的玩家，您尚未登陆', {
                        btn: ['去登录','取消'] //按钮
                    }, function(){
                        window.location.href = '/login.html';
                    }, function(){

                    });
                }
                callback && callback(result);
            },
            error: function (info) {
                console.log(info);
                layer.confirm('亲爱的玩家，您尚未登陆', {
                    btn: ['去登录','取消'] //按钮
                }, function(){
                    window.location.href = '/login.html';
                }, function(){

                });
            },
            complete: function (xhr, status) {
            }, beforeSend: function (request) {
                request.setRequestHeader("Authorization", 'bearer ' + oauth.getToken());
            }
        });
    }
}
*/


var Util = {
    getQueryString: function (name) {
        var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
        var r = window.location.search.substr(1).match(reg);
        if (r != null)return unescape(r[2]);
        return null;
    },
    getQueryParam: function () {
        var paras = [];
        var r = window.location.search;
        if (r.indexOf("?") >= 0) {
            r = r.substr(1);
        }
        var urlStr;
        if (r && r != '') {
            urlStr = r.split('&');
        }
        if (urlStr && urlStr.length > 0) {
            for (var i = 0; i < urlStr.length; i++) {
                var p = urlStr[i].split('=');
                var v = {};
                if (p.length > 1) {
                    v = {key: p[0], val: p[1]};
                } else if (p.length = 1) {
                    v = {key: p[0], val: ''};
                }
                paras.push(v);
            }
        }
        return paras;
    },
    formatDate: function (now) {
        var year = new Date(now).getFullYear();
        var month = new Date(now).getMonth() + 1 >= 10 ? new Date(now).getMonth() + 1 : '0' + (new Date(now).getMonth() + 1);
        var date = new Date(now).getDate() >= 10 ? new Date(now).getDate() : '0' + new Date(now).getDate();
        var hour = new Date(now).getHours() >= 10 ? new Date(now).getHours() : '0' + new Date(now).getHours();
        var minute = new Date(now).getMinutes() >= 10 ? new Date(now).getMinutes() : '0' + new Date(now).getMinutes();
        var second = new Date(now).getSeconds() >= 10 ? new Date(now).getSeconds() : '0' + new Date(now).getSeconds();
        return year + "-" + month + "-" + date + "&nbsp;&nbsp;" + (hour == '0' ? '00' : hour) + ":" + (minute == '0' ? '00' : minute) + ":" + (second == '0' ? '00' : second);
    },
    isWeiXin: function () {
        var ua = window.navigator.userAgent.toLowerCase();
        if (ua.match(/MicroMessenger/i) == 'micromessenger') {
            return true;
        } else {
            return false;
        }
    },
    checkEquipment: function () {
        var ua = window.navigator.userAgent.toLowerCase();//微信
        var u = navigator.userAgent;//手机类型android或ios
        if (ua.match(/MicroMessenger/i) == 'micromessenger') {//微信
            if(ua.match(/WindowsWechat/) == 'WindowsWechat'){
                alert(1)
            }else{
                alert(2)
            }
            console.log('微信');
            return 'WX';
        } else if (u.indexOf('Android') > -1 || u.indexOf('Linux') > -1) {//安卓手机
            console.log('android');
            return 'android';
        } else if (u.indexOf('iPhone') > -1) {//苹果手机
            console.log('ios');
            return 'ios';
        } else {//其他设备
            console.log('other');
            return 'other';
        }
    },
    formatMoney: function (amount, len) {
        var a = new Number(amount);
        if (!a) {
            return '0.00';
        } else {
            return a.toFixed(len);
        }
    },
    checkMobile: function (mobile) {
        if (!(/^1[3|4|5|8][0-9]\d{4,8}$/.test(mobile))) {
            return false;
        } else {
            return true;
        }
    },
    goGame: function(){
        window.location.href = gameUrl;
    },
    goDownload:function(){
        window.location.href = downloadUrl;
    }

}


var oauth = {
    getToken: function () {
        var token = localStorage.getItem('AUTHORIZATION');
        return token;
    },
    setToken: function (token) {
        localStorage.setItem('AUTHORIZATION', token);
    },
    clean: function () {
        localStorage.removeItem('AUTHORIZATION');
    }
}

function initPara() {
    localStorage.setItem('field1', Util.getQueryString('field1'));
    localStorage.setItem('field2', Util.getQueryString('field2'));
    localStorage.setItem('field3', Util.getQueryString('field3'));
    localStorage.setItem('field4', Util.getQueryString('field4'));
    localStorage.setItem('field5', Util.getQueryString('field5'));
    localStorage.setItem('superiorId', Util.getQueryString('superiorId'));
}
initPara();
