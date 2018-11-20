//get params from url
export function getParams(url) {
    url = url || window.location.href;
    if (url.indexOf('#') != -1) {
        url = url.split('#')[1];
    }

    let params = '';

    if (url.indexOf('?') != -1) {
        params = url.substr(url.indexOf('?') + 1);
    }

    let obj = {};

    if (params) {
        let arr = [];

        if (params.indexOf('&') == -1) {
            arr = [params];
        } else {
            arr = params.split('&');
        }
        for (let i = 0; i < arr.length; i++) {
            let s = arr[i].split('=');

            obj[s[0]] = decodeURIComponent(s[1]);
        }
    }
    return obj;
}

//set session
export function setSen(k, val) {
    if (typeof val == 'string') {
        sessionStorage.setItem(k, val);
        return val;
    }
    sessionStorage.setItem(k, JSON.stringify(val));
    return val;
}

//get session
export function getSen(k) {
    let uu = sessionStorage.getItem(k);

    try {
        if (typeof JSON.parse(uu) != 'number') {
            uu = JSON.parse(uu);
        }
    } catch (e) {}
    return uu;
}

//set local
export function setLoc(k, val) {
    if (typeof val == 'string') {
        localStorage.setItem(k, val);
        return val;
    }
    localStorage.setItem(k, JSON.stringify(val));
    return val;
}

//get local
export function getLoc(k) {
    let uu = localStorage.getItem(k);

    try {
        if (typeof JSON.parse(uu) != 'number') {
            uu = JSON.parse(uu);
        }
    } catch (e) {}
    return uu;
}

//clear session
export function clearKey(k) {
    if (k) {
        sessionStorage.removeItem(k);
    } else {
        sessionStorage.clear();
    }
}

// get cookie
export function getCookie(name) {
    var arr,
        reg = new RegExp('(^| )' + name + '=([^;]*)(;|$)');
    if ((arr = document.cookie.match(reg))) {
        // return true;
        return arr[2];
    } else {
        return [];
    }
}

// set cookie   name为cookie的名字，value是值，expiredays为过期时间（天数）
export function setCookie(name, value, expiredays) {
    var exdate = new Date();
    exdate.setDate(exdate.getDate() + expiredays);
    document.cookie = c_name + '=' + escape(value) + (expiredays == null ? '' : ';expires=' + exdate.toGMTString());
}

// del cookie
export function delCookie(name) {
    var exp = new Date();
    exp.setTime(exp.getTime() - 1);
    var cval = getCookie(name);
    if (cval != null) document.cookie = name + '=' + cval + ';expires=' + exp.toGMTString();
}

//获取屏幕宽度高度
export function getClient() {
    let clientWidth = document.documentElement.clientWidth;
    let clientHeight = document.documentElement.clientHeight;

    return {
        clientWidth,
        clientHeight
    };
}

//格式化距离
export function formatDistance(distance) {
    if (distance < 0.1) {
        return '<100m';
    } else if (distance >= 0.1 && distance < 1) {
        return distance * 1000 + 'm';
    } else if (distance >= 1) {
        return distance.toFixed(1) + 'km';
    }
}

//序列化对象和数组
export function serialize(data) {
    if (data != null && data != '') {
        try {
            return JSON.parse(JSON.stringify(data));
        } catch (e) {
            if (data instanceof Array) {
                return [];
            }
            return {};
        }
    }
    return data;
}

//计算金额加减时防止金额失去精度
export function calculatePrice(price = 0) {
    if (typeof price === 'string') {
        price = parseFloat(price);
    }

    if (isNaN(price)) {
        return 0;
    }

    return Math.round(price * 100) / 100;
}

//格式化金额
export function formatPrice(price = 0) {
    if (typeof price === 'string') {
        price = parseFloat(price);
    }

    if (isNaN(price)) {
        return 0;
    }

    if (parseInt(price) === price) {
        return price;
    }

    return price.toFixed(2);
}

//判断当前运行的浏览器环境
export function browser() {
    let os = {};
    let ua = window.navigator.userAgent.toLowerCase();

    os.isAndroid = /android/.test(ua); //browser,wechat,android
    os.isIOS = /iphone|ipad|ipod/.test(ua); //browser,wechat,ios
    os.isBrowser = /macintel|win32/.test(navigator.platform.toLowerCase()); //browser
    os.isWeixin = ua.indexOf('micromessenger') != -1; //wechat
    os.isAlipay = ua.indexOf('alipayclient') != -1; //ali
    os.isApp = function() {
        return (this.isAndroid || this.isIOS) && !this.isWeixin && !this.isBrowser && !this.isAlipay;
    };

    return os;
}

//格式化日期
Date.prototype.format = function(fmt) {
    let o = {
        'M+': this.getMonth() + 1, //月份
        'd+': this.getDate(), //日
        'h+': this.getHours(), //小时
        'm+': this.getMinutes(), //分
        's+': this.getSeconds(), //秒
        'q+': Math.floor((this.getMonth() + 3) / 3), //季度
        S: this.getMilliseconds() //毫秒
    };

    if (/(y+)/.test(fmt)) {
        fmt = fmt.replace(RegExp.$1, String(this.getFullYear()).substr(4 - RegExp.$1.length));
    }
    for (let k in o) {
        if (new RegExp('(' + k + ')').test(fmt)) {
            fmt = fmt.replace(RegExp.$1, RegExp.$1.length == 1 ? o[k] : ('00' + o[k]).substr(String(o[k]).length));
        }
    }
    return fmt;
};

//格式化日期
export function formatDate(nS, format) {
    //日期格式化
    if (!nS) {
        return '';
    }
    format = format || 'yyyy-MM-dd hh:mm:ss';
    return new Date(nS).format(format);
}

//验证手机号码
export function checkPhone(phone) {
    return Boolean(/^1[3578]\d{9}$/.test(phone));
}

//验证密码
export function checkPassword(pwd) {
    return Boolean(/^[a-z0-9_-]{6,16}$/.test(pwd));
}

//验证验证吗
export function checkVerify(code) {
    return Boolean(/^\d{4}$/.test(code));
}

//去除字符串左右两边的空格
export function trim(str) {
    return str.replace(/(^\s*)|(\s*$)/g, '');
}

//类似于findIndex
Array.prototype.indexOfArr = function(obj) {
    let res = -1;

    this.filter(function(e, i) {
        let keys = '';

        for (let key in obj) {
            keys = key;
        }
        if (obj[keys] == e[keys]) {
            res = i;
        }
    });
    return res;
};

//重写findIndex(某些手机不支持findIndex)
Array.prototype.findIndex = function(func) {
    let result = -1;

    this.forEach((item, index) => {
        var flag = func(item);

        if (flag) {
            result = index;
        }
    });
    return result;
};

Array.prototype.max = function(prop) {
    let result;
    if (!this.length) {
        return null;
    }

    if (prop.length) {
        result = this[0];
        this.forEach(item => {
            if (item[prop] > result[prop]) {
                result = item;
            }
        });
    } else {
        result = this[0];
        this.forEach(item => {
            if (item > result) {
                result = item;
            }
        });
    }
    return result;
};

Array.prototype.min = function(prop) {
    let result;
    if (!this.length) {
        return null;
    }

    if (prop.length) {
        result = this[0];
        this.forEach(item => {
            if (item[prop] < result[prop]) {
                result = item;
            }
        });
    } else {
        result = this[0];
        this.forEach(item => {
            if (item < result) {
                result = item;
            }
        });
    }
    return result;
};

//拆分数组参数
export function spread(cb) {
    return res => {
        // cb(...res);
        cb.apply(null, res);
    };
}

//后台默认数据格式
export function jsonCallback(data) {
    return { data, errorCode: [], status: 10000000 };
}
