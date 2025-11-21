import en from './locales/en';
import zh from './locales/zh';

const options = {
    default: 'zh',
    key: 'wx_locale_language',
    locale: '',
    locales: {
        en: en,
        zh: zh
    },
    cache: {}
}

const getLocale = function () {
    return options.locale
}

const setLocale = function (locale) {
    options.locale = locale;
    wx.setStorageSync(options.key,locale)
}

const getLanguage = function () {
    const locale = options.locale;
    return locale.includes('zh') ? options.locales['zh']: options.locales['en']
}

const getSystemLanguage = function () {
    const {language} = wx.getSystemInfoSync();
    if(isEmpty(language)) {
        return options.default;
    }
    return language.toLowerCase();
}

const init = function (that, title = null) {
    setDefaultLanguage();
    setLocaleLanguage(that);
    setNavigationBarTitle(title)
}

const setDefaultLanguage = function () {
    let locale = wx.getStorageSync(options.key) || null;
    if(isEmpty(locale)) {
        locale = getSystemLanguage();
        locale = locale.includes('en') ? 'en' : 'zh';
    }

    setLocale(locale);
}

const setLocaleLanguage = function (that) {
    const object = {
        lang: options.locale,
        $t: getLanguage()
    }
    that.setData(object)
}

const switchLanguage = function (that, locale) {
    setLocale(locale);
    setLocaleLanguage(that);
    syncLocaleLanguageCache(that);
}

const syncLocaleLanguageCache = function (that) {
    if(isEmpty(options.cache)) {
        return false;
    }

    for(let i in options.cache) {
        ref(that,i,options.cache[i], false)
    }
}

const setCacheData = function (key, value) {
    options.cache[key] = value
}

const ref = function (that, keys, params, cache = true) {
    const value = join(keys, params);

    if(isEmpty(value)) {
        return false;
    }

    const object = {};
    object[keys+'_value'] = value;
    that.setData(object);

    cache && setCacheData(keys, params);
}

const join = function (keys, params) {
    let value = getKeysValue(keys)
    for(let i in params) {
        value = value.replace('${'+i+'}', params[i])
    }

    return value;
}

const getKeysValue = function (keys) {
    if(isEmpty(keys)) {
        return '';
    }

    const max = 6;
    const arr = keys.replace('$t.','').split('.');
    const total = arr.length;
    const data = getLanguage();
    if(total > max) {
        console.error(`i18n getKeysValue 函数最大支持解构字符长度为:${max}, 请手动修改`);
        return '';
    }

    try {
        switch (total) {
            case 1:
                return data[arr[0]];
            case 2:
                return data[arr[0]][arr[1]];
            case 3:
                return data[arr[0]][arr[1]][arr[2]];
            case 4:
                return data[arr[0]][arr[1]][arr[2]][arr[3]];
            case 5:
                return data[arr[0]][arr[1]][arr[2]][arr[3]][arr[4]];
            case 6:
                return data[arr[0]][arr[1]][arr[2]][arr[3]][arr[4]][arr[5]];
        }
    } catch (err) {
        console.error(`i18n > locales > ${options.locale}.js 未设置 ${keys} 的值`);
        return  '';
    }
}

const setNavigationBarTitle = function (keys) {
    const title = getKeysValue(keys);
    if(isEmpty(title)) {
        console.error(`i18n > locales > ${options.locale}.js 未设置 ${keys} 的值`);
        return false;
    }

    if(typeof title !== 'string') {
        console.error(`i18n > locales > ${options.locale}.js 通过 ${keys} 的键名, 获取的值不是字符串`);
        return false;
    }

    wx.setNavigationBarTitle({title: title})
}

const isEmpty = function (value) {
    if (value === '' || value === undefined || value === null) {
        return true;
    }

    if(typeof value == 'object') {
        for (let i in value) {
            return false;
        }

        return true;
    }

    return false;
}

module.exports = {
    init: init,
    ref: ref,
    join: join,
    getLocale: getLocale,
    switchLanguage: switchLanguage,
    setNavigationBarTitle: setNavigationBarTitle,
}
