var proxy = "SOCKS5 localhost:53080", localhost = [
    "127.0.0.1",
    "192.168.1.1",
    "localhost"
];
/**
 * 入口函数
 * @param url URL
 * @param host HOST
 * @return {string} 返回代理
 * @constructor
 */
var FindProxyForURL = function (url, host) {
    if (0)
        void [FindProxyForURL, url];
    if (localhost.indexOf(host) !== -1) {
        return "DIRECT";
    }
    return proxy;
};
