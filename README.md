## 微信小程序国际化i18n

## Quick Start

```js
// index.js
import i18n from "./../../utils/i18n/index";

Page({
    data: {},
    onLoad(query) {
        i18n.init(this,'$t.home.title');
    }
})
```

```wxml
<!--index.wxml-->
<view>{{$t.home.title}}</view>
```

## API

- **i18n.init(that:object, title: string)**

    设置 data 对象里 $t 绑定语言包数据
- - **i18n.ref(that:object, keys:string, params:object, cache:boolen)**

    设置<code>this.data</code>对象<code>$t</code>新的对象,在原来<code>keys</code>添加新的后缀<code>_value</code>

```js
// index.js
import i18n from "./../../utils/i18n/index";

Page({
    data: {
        userInfo :{
            name: 'Tom',
            age:'Two years old'
        }
    },
    onLoad(query) {
        i18n.init(this,'$t.home.title');
        i18n.ref(this,'$t.home.user.desc',this.data.userInfo)
    }
})
```

```wxml
<!--index.wxml-->
<view>{{$t.home.user.desc_value}}</view>
```
- **i18n.join(keys:string,params:object)**

    返回拼接 <code>params</code> 参数后，新的字符串
- **i18n.getLocale**

    获取当前语言包类型
  - **i18n.switchLanguage(lang:string)**

     改变当前语言包数据
- **i18n.setNavigationBarTitle(that:object, lang:string)**
  
    设置导航栏标题


## 参考
- [miniprogram-i18n-plus](https://github.com/hefeng6500/miniprogram-i18n-plus)




