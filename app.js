// app.js
// import zh from './utils/i18n/zh.json';

import i18nInstance from "./miniprogram_npm/miniprogram-i18n-plus/index";

App({
    onLaunch() {

        const locales = {
            zh_CN: {
                test: "测试1234123",
            },
            en_US: {
                test: "Test",
            },
        };

        i18nInstance.setLocale("zh_CN");

        i18nInstance.loadTranslations(locales);


        // console.error('language',444)
        // const systemInfo = wx.getSystemInfoSync();
        // const language = systemInfo.language; // 获取系统语言
        // this.globalData.language = language; // 设置全局语言变量
        //
        // console.error('language',language)
        // this.loadLanguage(language);

        // 展示本地存储能力
        const logs = wx.getStorageSync('logs') || []
        logs.unshift(Date.now())
        wx.setStorageSync('logs', logs)

        // 登录
        wx.login({
            success: res => {
                // 发送 res.code 到后台换取 openId, sessionKey, unionId
            }
        })
    },
    // // 加载对应的语言包
    // loadLanguage(language) {
    //     if (language.startsWith('zh')) {
    //         this.globalData.languagePack = require('./utils/i18n/zh.js');
    //     } else {
    //         this.globalData.languagePack = require('./utils/i18n/en.js');
    //     }
    // },
    globalData: {
        userInfo: null,
        // language:　'',
        // languagePack: {}
    }
})
