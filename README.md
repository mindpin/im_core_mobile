# 运行项目
```

git clone (Clone or download 下的 url)

npm install

react-native run-android

```
# apk 编译说明
```
cd im_core_mobile
cd android

```
## bash 打包方式
```
./gradlew assembleDemoRelease

```

## cmd 打包方式
```
gradlew.bat assembleDemoRelease

```

## 安装 apk 到手机
```
复制 im_core_mobile/android/app/build/outputs/apk/app-demoRelease.apk 到手机安装

```

# 连接服务端说明
```
运行项目需要连接服务端 
将发布的 IP 地址赋给 app/api/build_url.js 文件下的 SERVER_URL 变量

```