# TinyMCE-Editor-Vue

通用tinymce编辑器组件 by ZHJ

支持v-model绑定编辑器内容，开箱即用

功能：除常用编辑功能外，可上传视频和音频，可多图批量上传。

## 依赖的npm包

```bash
npm install tinymce@4.9.4 --save
npm install @tinymce/tinymce-vue@1.1.2 --save
npm install axios@0.16.2 --save
```

`axios` 的版本跟上面的版本有出入问题不大，但 `tinymce` 和 `@tinymce/tinymce-vue` 这两个依赖的版本必须跟上面的一致。

## 使用方法

将tinymce基础依赖库（本项目中 `tinymce` 文件夹）复制到开发项目的 `static` 或其他存放静态资源的目录下，通过 `props` 传入打包后的静态资源目录的路径即可。

## props

`fileUploadUrl` : 文件上传地址（type: String）

`staticFolderPath` : 打包后系统静态资源目录的路径（type: String）

`height` : 编辑器内容区域的高度（type: Number）

`fileUploadSuccessCondition` ：文件上传接口上传成功的判断条件（type：Function）

`fileUploadSuccessFileUrl` ：文件上传接口上传成功后返回的文件地址（type: Function）

`fileSizeLimit` : 最大允许上传的文件大小（type: Number, 单位：字节）
