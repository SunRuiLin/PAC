const proxy = "SOCKS5 localhost:51080",
    host_rules = [
        // IP138
        "*.ip138.com",

        // PIXNET
        "*.pixnet.net",

        // GitBooks
        "*.gitBooks.io",

        // V2EX
        "*.v2ex.com",

        // Mozilla
        "*.mozilla.*",

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

        // 1&1
        "*.gmx.*",
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
        "*.t.co",
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
        "*.googleUserContent.com",
    ],
    domains = [
        "au",
        "cn",
        "ca",
        "br",
        "de",
        "es",
        "fr",
        "gl",
        "hk",
        "in",
        "it",
        "io",
        "jp",
        "mx",
        "nl",
        "sg",
        "tw",
        "uk",
        "com",
        "net",
        "org",
        "co.jp",
        "co.uk",
        "com.sg",
        "com.au",
        "com.cn",
        "com.hk",
        "com.br",
        "com.mx",
        "com.tw",
    ];

let host_rules_x_google_x: string[] = [],
    host_rules_x_google_com: string[] = [],
    host_rules_www_google_x: string[] = [],
    host_rules_www_google_com: string[] = [];

// 规则分类
host_rules.forEach(hr => {
    // 匹配类似：*.google.*
    if (/^\*\.\w+\.\*$/.test(hr)) {
        // 分类保存
        host_rules_x_google_x.push(hr.replace(/^\*\.|\.\*$/g, "").replace(/\./g, "\\."));
    }
    // 匹配类似：*.google.com
    else if (/^\*\.\w+/.test(hr)) {
        // 分类保存
        host_rules_x_google_com.push(hr.replace(/^\*\./, "").replace(/\./g, "\\."));
    }
    // 匹配类似：www.google.*
    else if (/\w+\.\*$/.test(hr)) {
        // 分类保存
        host_rules_www_google_x.push(hr.replace(/\.\*$/, "").replace(/\./g, "\\."));
    }
    // 其他类似：www.google.com
    else {
        // 分类保存
        host_rules_www_google_com.push(hr.replace(/\./g, "\\."));
    }
});

const str_domains = domains.join("|").replace(/^\./, "").replace(/\./g, "\\."),
    re_str_domains = `\\.${domains.length > 1 ? `(?:${str_domains})` : str_domains}`,
    re_arr_all: string[] = [];

// 匹配类似：google.com 或者 *.google.* 或者 *.google.com 的头
if (host_rules_x_google_x.length > 0 || host_rules_x_google_com.length > 0) {
    let re_arr_x: string[] = [];

    // 匹配类似：*.google.*
    if (host_rules_x_google_x.length > 0) {
        // 类似：(?:google|bing)
        let str_x_google_x = host_rules_x_google_x.join("|"),
            re_str_x_google_x = host_rules_x_google_x.length > 1 ? `(?:${str_x_google_x})` : str_x_google_x;
        // 类似：(?:google|bing)(?:\.com|\.cn)
        re_str_x_google_x += re_str_domains;

        re_arr_x.push(re_str_x_google_x);
    }

    // 匹配类似：*.google.com
    if (host_rules_x_google_com.length > 0) {
        // 类似：(?:google.com|bing.cn)
        let str_x_google_com = host_rules_x_google_com.join("|"),
            re_str_x_google_com = host_rules_x_google_com.length > 1 ? `(?:${str_x_google_com})` : str_x_google_com;

        re_arr_x.push(re_str_x_google_com);
    }

    let str_x = re_arr_x.join("|"),
        re_str_x = `(?:\\S+\\.)?`;
    re_str_x += re_arr_x.length > 1 ? `(?:${str_x})` : str_x;
    re_arr_all.push(re_str_x);
}

// 匹配类似：www.google.*
if (host_rules_www_google_x.length > 0) {
    // 类似：(?:www.google|abc.bing)
    let str_www_google_x = host_rules_www_google_x.join("|"),
        re_str_www_google_x = host_rules_www_google_x.length > 1 ? `(?:${str_www_google_x})` : str_www_google_x;
    // 类似：(?:www.google|abc.bing)(?:\.com|\.cn)
    re_str_www_google_x += re_str_domains;

    re_arr_all.push(re_str_www_google_x);
}

// 匹配类似：www.google.com
if (host_rules_www_google_com.length > 0) {
    // 类似：(?:www.google.com|abc.bing.cn)
    let str_www_google_com = host_rules_www_google_com.join("|"),
        re_str_www_google_com = host_rules_www_google_com.length > 1 ? `(?:${str_www_google_com})` : str_www_google_com;

    re_arr_all.push(re_str_www_google_com);
}

// 构建正则匹配规则
const str_all = re_arr_all.join("|"),
    re_str_all = `^${re_arr_all.length > 1 ? `(?:${str_all})` : str_all}$`,
    re = new RegExp(re_str_all, "i");

/**
 * 入口函数
 * @param url URL
 * @param host HOST
 * @return {string} 返回代理
 * @constructor
 */
const FindProxyForURL = (url: string, host: string) => {
    0 && url && void 0;
    return re.test(host) ? proxy : "DIRECT";
};

// 不会被执行
if (0) {
    function shExpMatch() {
        void 0;
    }
}

if (!shExpMatch && console.group) {
    const hosts = [
        "pan.baiDu.com",
        "www.baiDu.com",
        "google.com",
        "mail.google.com"
    ];
    console.group(re.toString());
    hosts.forEach(h => {
        console.log(h + " | " + FindProxyForURL("", h));
    });
    console.groupEnd();
}