var PROXY = "SOCKS5 localhost:51080";
var RULES = [
    // IP138
    "*.ip138.com",
    // V2EX
    "*.v2ex.com",
    // Mozilla
    "*.mozilla.org",
    // Regex101
    "*.regex101.com",
    // RegexPer
    "*.regexPer.com",
    // Global Cash
    "*.globalcash.hk",
    // Free Currency Rates
    "*.freeCurrencyRates.com",
    // WordPress
    "*.wordPress.com",
    // MobileRead
    "*.mobileRead.com",
    // Calibre
    "*.calibre-ebook.com",
    // Mail
    "*.mail.com",
    "*.uiCdn.com",
    "*.ui-portal.de",
    "*.deRef-mail.com",
    // IP Tracker
    "www.ip-tracker.org",
    // GitHub
    "*.github.io",
    "gist.github.com",
    // W3Schools
    "*.w3schools.com",
    // Facebook
    "*.facebook.*",
    // Twitter
    "*.twitter.com",
    "*.twImg.com",
    // Wikipedia
    "*.wikipedia.org",
    // Amazon
    // "*.amazon.com",
    // "*.awsStatic.com",
    // "*.cloudFront.net",
    // "*.amazonAws.com",
    // "*.amazon-adSystem.com",
    // "*.amazonWebServices.com",
    // "*.ssl-images-amazon.com",
    // Google
    "*.goo.gl",
    "*.gvt1.com",
    "*.gMail.*",
    "*.ggPht.com",
    "*.ytImg.*",
    "*.google.*",
    "*.chrome.com",
    "*.gStatic.com",
    "*.youtube.*",
    "*.Blogger.*",
    "*.appSpot.*",
    "*.android.com",
    "*.blogSpot.*",
    "*.blogBlog.*",
    "*.chromium.*",
    "*.googleapis.com",
    "*.googleVideo.*",
    "*.doubleClick.net",
    "*.googleSource.*",
    "*.googleAdServices.*",
    "*.google-analytics.com",
    "*.googleTagServices.*",
    "*.googleUserContent.com"
];
var DOMAINS = [
    ".jp",
    ".uk",
    ".in",
    ".kr",
    ".br",
    ".hk",
    ".tw",
    ".au",
    ".sg",
    ".cc",
    ".cn",
    ".com",
    ".org",
    ".net",
    ".co.jp",
    ".co.uk",
    ".co.in",
    ".co.kr",
    ".com.br",
    ".com.sg",
    ".com.cn",
    ".com.hk",
    ".com.tw",
    ".com.au"
], 
// 类似：(?:\.com|\.cn)
RE_DOMAINS = "(?:" + DOMAINS.join("|").replace(/\./g, "\\.") + ")";
var HOSTS_X_GOOGLE_X = "", HOSTS_X_GOOGLE_COM = "", HOSTS_WWW_GOOGLE_X = "", HOSTS_WWW_GOOGLE_COM = "", RE_X_GOOGLE_X = "", RE_X_GOOGLE_COM = "", RE_WWW_GOOGLE_X = "", RE_WWW_GOOGLE_COM = "", RE_X = "";
// 遍历处理
RULES.map(function (host_rule) {
    // 跳过空规则
    if (host_rule === "")
        return;
    // ----------------------------------------
    // 匹配类似：*.google.*
    if (/^\*\..+\.\*$/.test(host_rule)) {
        // 分类保存
        HOSTS_X_GOOGLE_X += host_rule + "|";
    }
    else if (/^\*\./.test(host_rule)) {
        // 分类保存
        HOSTS_X_GOOGLE_COM += host_rule + "|";
    }
    else if (/\.\*$/.test(host_rule)) {
        // 分类保存
        HOSTS_WWW_GOOGLE_X += host_rule + "|";
    }
    else {
        // 分类保存
        HOSTS_WWW_GOOGLE_COM += host_rule + "|";
    }
});
// ------------------------------------------------------------
// 类似：google.com 或者 *.google.com 的头
if (HOSTS_X_GOOGLE_X + HOSTS_X_GOOGLE_COM !== "") {
    RE_X = "(?:.+\\.)?";
}
// ----------------------------------------
// 类似：*.google.*
if (HOSTS_X_GOOGLE_X !== "") {
    // 类似：(?:google|bing)
    RE_X_GOOGLE_X = "(?:" + HOSTS_X_GOOGLE_X.replace(/\*\.|\.\*/g, "").replace(/\./g, "\\.").replace(/\|$/, "") + ")";
    // 类似：(?:google|bing)(?:\.com|\.cn)
    RE_X_GOOGLE_X += RE_DOMAINS;
}
// ----------------------------------------
// 类似：*.google.com
if (HOSTS_X_GOOGLE_COM !== "") {
    // 类似：(?:google.com|bing.cn)
    RE_X_GOOGLE_COM = "(?:" + HOSTS_X_GOOGLE_COM.replace(/\*\./g, "").replace(/\./g, "\\.").replace(/\|$/, "") + ")";
}
// ----------------------------------------
// 类似：www.google.*
if (HOSTS_WWW_GOOGLE_X !== "") {
    // 类似：(?:www.google|abc.bing)
    RE_WWW_GOOGLE_X = "(?:" + HOSTS_WWW_GOOGLE_X.replace(/\.\*/g, "").replace(/\./g, "\\.").replace(/\|$/, "") + ")";
    // 类似：(?:www.google|abc.bing)(?:\.com|\.cn)
    RE_WWW_GOOGLE_X += RE_DOMAINS;
}
// ----------------------------------------
// 类似：www.google.com
if (HOSTS_WWW_GOOGLE_COM !== "") {
    // 类似：(?:www.google.com|abc.bing.cn)
    RE_WWW_GOOGLE_COM = "(?:" + HOSTS_WWW_GOOGLE_COM.replace(/\./g, "\\.").replace(/\|$/, "") + ")";
}
// ------------------------------------------------------------
// 构建正则匹配规则
var RE_ALL = "^(?:" + RE_X + "(?:" + RE_X_GOOGLE_X + "|" + RE_X_GOOGLE_COM + ")" + "|" + RE_WWW_GOOGLE_X + "|" + RE_WWW_GOOGLE_COM + ")$";
// 替换多余字符
RE_ALL = RE_ALL.replace(/:\|+/g, ":").replace(/\|+\)/g, ")").replace(/(\(\?:\))+/g, "").replace(/\|{2,}/g, "|");
// 创建正则对象，并且不区分大小写
var REGEXP = new RegExp(RE_ALL, "i");
// ------------------------------------------------------------
/**
 * 入口函数
 * @param url URL
 * @param host HOST
 * @return {string} 返回代理
 * @constructor
 */
var FindProxyForURL = function (url, host) {
    if (url)
        void 0;
    return REGEXP.test(host) ? PROXY : "DIRECT";
};
/**
 * 不会被执行
 */
if (0) {
    function shExpMatch() {
        void 0;
    }
}
if (!shExpMatch) {
    var hosts = [
        "pan.baiDu.com",
        "www.baiDu.com",
        "google.com",
        "mail.google.com"
    ];
    console.group(REGEXP.toString());
    hosts.map(function (host) {
        console.log(host + " | " + FindProxyForURL("", host));
    });
    console.groupEnd();
}
//# sourceMappingURL=direct.js.map