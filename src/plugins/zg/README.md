#### ZG
   这个包是全应用通用包，是对[Vuetify](https://vuetifyjs.com/)的再度封装，具体提供了一些工具方法和部分Vue原型方法，具体使用方法是将<zg-app></zg-app>代替Vuetify的<v-app></v-app>即可。
   
#### 使用方法  
```bash
import zg from "@/plugins/zg"
Vue.use(zg)    
```
##### 例子
```bash
this.$notify({
    text: ""信息,
}) 
```
   
#### 开源协议  
[MIT](https://opensource.org/licenses/MIT)
