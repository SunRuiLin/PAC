var proxy = "SOCKS5 localhost:51080", host_rules = [
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
    "*.globalCash.hk",
    // Free Currency Rates
    "*.freeCurrencyRates.com",
    // WordPress
    "*.wordPress.com",
    // MobileRead
    "*.mobileRead.com",
    // Calibre
    "*.calibre-eBook.com",
    // Mail
    "*.mail.com",
    "*.uiCdn.com",
    "*.ui-portal.de",
    "*.deRef-mail.com",
    // IP Tracker
    "www.ip-tracker.org",
    // GitHub
    "*.gitHub.io",
    "gist.gitHub.com",
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
var host_rules_x_google_x = [], host_rules_x_google_com = [], host_rules_www_google_x = [], host_rules_www_google_com = [];
// 规则分类
host_rules.forEach(function (hr) {
    // 匹配类似：*.google.*
    if (/^\*\.\w+\.\*$/.test(hr)) {
        // 分类保存
        host_rules_x_google_x.push(hr.replace(/^\*\.|\.\*$/g, "").replace(/\./g, "\\."));
    }
    else if (/^\*\.\w+/.test(hr)) {
        // 分类保存
        host_rules_x_google_com.push(hr.replace(/^\*\./, "").replace(/\./g, "\\."));
    }
    else if (/\w+\.\*$/.test(hr)) {
        // 分类保存
        host_rules_www_google_x.push(hr.replace(/\.\*$/, "").replace(/\./g, "\\."));
    }
    else {
        // 分类保存
        host_rules_www_google_com.push(hr.replace(/\./g, "\\."));
    }
});
// console && console.log(host_rules_x_google_x.join("|"));
// console && console.log(host_rules_x_google_com.join("|"));
// console && console.log(host_rules_www_google_x.join("|"));
// console && console.log(host_rules_www_google_com.join("|"));
var re_str_domains = "(?:\\.[A-Za-z]+){1,2}", re_arr_all = [];
// 匹配类似：google.com 或者 *.google.* 或者 *.google.com 的头
if (host_rules_x_google_x.length > 0 || host_rules_x_google_com.length > 0) {
    var re_arr_x = [];
    // 匹配类似：*.google.*
    if (host_rules_x_google_x.length > 0) {
        // 类似：(?:google|bing)
        var re_str_x_google_x = "(?:" + host_rules_x_google_x.join("|") + ")";
        // 类似：(?:google|bing)(?:\.com|\.cn)
        re_str_x_google_x += re_str_domains;
        re_arr_x.push(re_str_x_google_x);
    }
    // 匹配类似：*.google.com
    if (host_rules_x_google_com.length > 0) {
        // 类似：(?:google.com|bing.cn)
        var re_str_x_google_com = "(?:" + host_rules_x_google_com.join("|") + ")";
        re_arr_x.push(re_str_x_google_com);
    }
    var re_str_x = "(?:\\w+\\.)?";
    re_arr_all.push(re_str_x + "(?:" + re_arr_x.join("|") + ")");
}
// 匹配类似：www.google.*
if (host_rules_www_google_x.length > 0) {
    // 类似：(?:www.google|abc.bing)
    var re_str_www_google_x = "(?:" + host_rules_www_google_x.join("|") + ")";
    // 类似：(?:www.google|abc.bing)(?:\.com|\.cn)
    re_str_www_google_x += re_str_domains;
    re_arr_all.push(re_str_www_google_x);
}
// 匹配类似：www.google.com
if (host_rules_www_google_com.length > 0) {
    // 类似：(?:www.google.com|abc.bing.cn)
    var re_str_www_google_com = "(?:" + host_rules_www_google_com.join("|") + ")";
    re_arr_all.push(re_str_www_google_com);
}
// 构建正则匹配规则
var re_str_all = "^(?:" + re_arr_all.join("|") + ")$", re = new RegExp(re_str_all, "i");
// console && console.log(re_str_domains);
// console && console.log(re_str_all);
// console && console.log(re.toString());
/**
 * 入口函数
 * @param url URL
 * @param host HOST
 * @return {string} 返回代理
 */
var FindProxyForURL = function (url, host) {
    // if (url) void 0;
    return re.test(host) ? proxy : "DIRECT";
};
// 不会被执行
if (0) {
    function shExpMatch() {
        void 0;
    }
}
if (!shExpMatch && console.group) {
    var hosts = [
        "pan.baiDu.com",
        "www.baiDu.com",
        "google.com",
        "mail.google.com"
    ];
    console.group(re.toString());
    hosts.forEach(function (h) {
        console.log(h + " | " + FindProxyForURL("", h));
    });
    console.groupEnd();
}
//# sourceMappingURL=direct.js.map