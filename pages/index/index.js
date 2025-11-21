// index.js
const defaultAvatarUrl = 'https://mmbiz.qpic.cn/mmbiz/icTdbqWNOwNRna42FI242Lcia07jQodd2FJGIYQfG0LAJGFxM4FbnQP6yfMxBgJ0F3YRqJCJ1aPAK2dQagdusBZg/0'

import i18n from "./../../utils/i18n/index";

Page({
    data: {
        userInfo: {
            avatarUrl: defaultAvatarUrl,
            name: '',
            age:'',
            sex: '',
            desc: '',
        }
    },
    onLoad(query) {

        i18n.init(this,'$t.home.title');

        this.loadUserInfo();
        i18n.ref(this,'$t.home.user.desc',this.data.userInfo);
        console.log('$t', this.data.$t);
    },
    loadUserInfo: async function () {
        let userInfo = {};
        const language = i18n.getLocale()
        switch (language) {
            case 'en':
                userInfo = {
                    name: 'Tom',
                    age:'Two years old',
                    sex: 'Male',
                    desc: i18n.join('$t.home.user.desc',{name:'Tom',age:'Two years old'})
                }
                break;
            case 'zh':
                userInfo = {
                    name: '汤姆',
                    age:'2岁',
                    sex: '男',
                    desc: i18n.join('$t.home.user.desc',{name:'汤姆',age:'2岁'})
                }
                break
        }

        this.setData({'userInfo': userInfo})
        //i18n.ref(this,'$t.home.user.desc',this.data.userInfo);

    },
    switchLanguage(event) {
       // const {language} = event.currentTarget.dataset;
        const {value} = event.detail;
        if(value == i18n.getLocale()) {
            return false;
        }

        this.setData({'lang': value});
        i18n.switchLanguage(this, value);
        i18n.setNavigationBarTitle('$t.home.title')

        this.loadUserInfo()
    }
})
