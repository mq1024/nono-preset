# toast

## 安装

```javascript
npm install ui --save-dev

```

## 引用

```javascript
import Vue from 'vue';
import { toast } from 'ui'; //按需引用

Vue.use(toast, {
  duration: 3000, //时长
  bgColor: 'rgba(0,0,0,.7)' //背景色
});
```

## 基本用法

```javascript
export default {
  mounted() {
    /**
     * msg{String}//显示文案
     * options{Object} //配置参数，详见api 可不传
     */
    this.$toast.info(msg, options);
  }
};
```

## API

| 字段                | 说明                                                                          | 类型   | 默认值           |
| :------------------ | :---------------------------------------------------------------------------- | :----- | :--------------- |
| msg                 | 消息文案                                                                      | String | ''               |
| options.duration    | 展示时间,毫秒                                                                 | Number | 3000             |
| options.positon     | 展示位置：'top','center', 'bottom'                                            | String | 'center'         |
| options.bgColor     | 背景色                                                                        | String | 'rgba(0,0,0,.7)' |
| options.customClass | 自定义class                                                                   | String | ''               |
| options.cusIcon     | 自定义图标， Data URI 格式                                                    | String | ''               |
| options.id          | 标识符，相同者共用一个实例。loading类型默认使用一个实例，其他类型默认不共用。 | String | 'toast_default'  |

