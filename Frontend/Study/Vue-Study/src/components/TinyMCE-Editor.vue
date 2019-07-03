<!-- 通用tinymce编辑器组件 by ZHJ ver:201905151814 -->
<!-- 只依赖tinymce-vue和axios，简单易用 -->
<template lang="html">
  <div class="tinymce_editor_component">
    <TinyMCE id="tinymce-editor" :init="initOptions" v-model="content"></TinyMCE>

    <!-- 多图上传对话框 -->
    <div class="multiple_images_upload_dialog" v-if="showMultiImagesUploadDialog">

      <div class="multiple_images_upload_dialog_content">

        <div class="multiple_images_upload_dialog_head clearfix">
          <div class="multiple_images_upload_dialog_title left">多图上传</div>
          <div class="multiple_images_upload_dialog_close_btn right" @click="showMultiImagesUploadDialog = false">
            <i class="mce-ico mce-i-remove"></i>
          </div>
        </div>

        <div class="multiple_images_upload_dialog_body">

          <div class="multiple_images_upload_dialog_oper_area mt5 mb5 pl15 pr15 clearfix">
            <div class="multiple_images_upload_dialog_oper_area_files_info left">
              <span>已选择{{multiUploadImgs.length}}张图片(共{{allImgsSize}}M)，已上传{{imgUploadedNum}}张(共{{imgUploadedSize}}M)</span>
              <span v-if="notImgFilteredNum">，已过滤{{notImgFilteredNum}}个非图片文件</span>
            </div>
            <div class="multiple_images_upload_dialog_oper_area_btns right">
              <div class="multiple_images_upload_dialog_btn" @click="selectImgs">添加图片</div>
              <div class="multiple_images_upload_dialog_btn colored_btn" @click="uploadImgs" v-if="multiUploadImgs.length && !isAllImgsUploaded">开始上传</div>
            </div>
          </div>

          <div class="multiple_images_upload_dialog_imglist">
            <ul class="clearfix">
              <li v-for="(img,imgIndex) in multiUploadImgs" :key="imgIndex">
                <div class="img_preview_container" :class="'img_preview_container_'+imgIndex">
                  <img :src="img.imgPreviewUrl" alt="" :class="'img_preview_'+imgIndex" v-if="setImgCentered(imgIndex)">
                  <div class="upload_del_img" v-if="!img.isUploaded">
                    <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAABCElEQVRYR+2X4XHCMAyFvzcBI5QNIBuwQVfoCDAJjMAIjMAG0A3KBmzwOOeAC4bEThraP9avnCzJT09WLIuE2N4An8A0ZRut/wA7SasuP3Ut2l4C654bx+YrSSGJl5ICcARmQCUpfGeL7TlwAI6SqqEAHBwldQJtC2476V8Htn3LNDvDEQxrZv4TwLek+Z3aRs1Ccr1rnmKkLf5DbXNqltoo0VVPZ6IAyGLg2iWO+3mAflgJ2s7GGPpcBl7+UAqAwkBhoDBQGCgM/CUD9UgeZrjmxHO9jvvoh13HvxnDIsAFQB4D7x7Lmy+teCI6A5Oxat4S5yTp/tKOASyALfDxJhAn4EvS/hb/Ale/uDDHewJCAAAAAElFTkSuQmCC" alt="" @click="delImg(imgIndex)">
                  </div>
                  <div class="upload_progress" v-show="img.isUploading">
                    <div class="upload_progress_bar">
                      <div class="upload_progress_bar_percent"></div>
                    </div>
                  </div>
                  <div class="upload_success" v-show="img.isUploaded">
                    <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACgAAAAoCAYAAACM/rhtAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyRpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMy1jMDExIDY2LjE0NTY2MSwgMjAxMi8wMi8wNi0xNDo1NjoyNyAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENTNiAoTWFjaW50b3NoKSIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDowMzQwNjJGMzEyMDMxMUUzODk2Q0JFM0Q1RjE4QkExQyIgeG1wTU06RG9jdW1lbnRJRD0ieG1wLmRpZDowMzQwNjJGNDEyMDMxMUUzODk2Q0JFM0Q1RjE4QkExQyI+IDx4bXBNTTpEZXJpdmVkRnJvbSBzdFJlZjppbnN0YW5jZUlEPSJ4bXAuaWlkOjAzNDA2MkYxMTIwMzExRTM4OTZDQkUzRDVGMThCQTFDIiBzdFJlZjpkb2N1bWVudElEPSJ4bXAuZGlkOjAzNDA2MkYyMTIwMzExRTM4OTZDQkUzRDVGMThCQTFDIi8+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwveDp4bXBtZXRhPiA8P3hwYWNrZXQgZW5kPSJyIj8+tQEWygAAAsdJREFUeNrM2E1oE0EUB/D/zmwSt6lJ6EdaPAhaq6itVWNbhEIP9aCgJ8GjUAQPFTz04AceFEFPIoj24EURRMWLRU8iwepJ8RApSg+2ghRFiqUpLcZNOjO+Talf/dpupmYGBhIym/nxZt6bSazEjTwMbueZyTjqF5jJOO8FMxlnIvAvnGnAeTiTgAviTAEuijMBuCSu3MBlceUE+sKVC+gbVw7ginD/G7hinNfsUmd9nroFaXNEYzVgMgSbO7DDMUQicTDbgVQKWx7WB8JpAXLOUVu9AUJWUh9FmHEwlUMhJ+C6Cql0KjBOyxJXVSfhOFEoJVAoeL0AJVyKplsyTksE3YKD3MQkJJuGFYrBnRH4Uchh78vOknFaIljpNNK+q0Y+n4eAA8uOEm6/FpwWIKtgiNckEAqvA0cO7ekObTg9Zcbi1KO0D2vRlt4XCJeIAMeaGJprLP1AqWxKkBBanjQGjtyZNo4rnRyHGph+oEURbLgfD4zrWm+hezvDFP24fPZJ6gdufhActzY8G70w7ZK+twJvvirtwJISoqeFYU+dhcyYws1BqT1JSsLtSlro2cnhCuDiK4GsqzeLl8RVhoCNcWvRh9fQ8XCunSNGS3znvcTAqNJaZpbEcXKd3M0xcMTGWdpfET5/zNFtrJgcHycVrmWk1jq47LJKCsbQuEKIvvlUK0NfF0ey4vfnmxIWelO8OO7Sa4kv00ob0Nee86Z7NCzR/VTgM01+uJHh7gEbW6tml/w0oesI3E9jHo/I5cuYz3+3AiVEE50MV6kAt9ZbGM4qqnMKx3cwjOeAg/0z+DChtABLylZveS938GIk51rvC4Hb76Sv5+3VxHlt7DtwIi0wkqXztplRxkrcG5K+n7dXE/frzki17npGYPCbKiaQ9973UbrIEmu9Mum+bhmDWwhoFO5foHG4P4FG4uaAxuK89lOAAQB29OXDkHc5ugAAAABJRU5ErkJggg==" alt="">
                  </div>
                  <div class="upload_error"></div>
                </div>
              </li>
            </ul>
          </div>

        </div>

        <div class="multiple_images_upload_dialog_footer pt10 text-center">
          <div class="multiple_images_upload_dialog_btn colored_btn" @click="confirmInsertMultiImgs">确定</div>
          <div class="multiple_images_upload_dialog_btn" @click="showMultiImagesUploadDialog = false">取消</div>
        </div>

      </div>

      <input id="multiple_images_upload_file_input" type="file" name="" value="" accept="image/*" multiple style="display: none;" v-if="renderFileInput">

    </div>

  </div>
</template>

<script>
  import TinyMCE from '@tinymce/tinymce-vue';
  import axios from 'axios';

  export default {
    components: {
      TinyMCE
    },
    props: {
      fileUploadUrl: {
        type: String
      },
      value: {
        type: String
      },
    },
    data () {
      return {
        initOptions: {
          language_url: '/static/tinymce/langs/zh_CN.js',
          language: 'zh_CN',
          skin_url: '/static/tinymce/skins/lightgray',
          height: 400,
          branding: false,
          menubar: false,
          plugins: 'textcolor colorpicker link lists table image media code emoticons preview wordcount fullscreen help',
          toolbar: 'undo redo |  formatselect fontselect fontsizeselect | bold italic underline strikethrough forecolor backcolor | alignleft aligncenter alignright alignjustify outdent indent | bullist numlist table | emoticons link image media multiImages | preview code removeformat fullscreen help',
          external_plugins: {
            'help': '/static/tinymce/plugins/help/plugin.min.js',
            'emoticons': '/static/tinymce/plugins/emoticons/plugin.min.js',
          },
          font_formats: 'Helvetica=Helvetica;Arial=Arial;微软雅黑=Microsoft YaHei',
          fontsize_formats: '11px 12px 14px 16px 18px 24px 36px 48px',
          plugin_preview_width: 1000,
          plugin_preview_height: 500,

          setup:  (editor) => {
            editor.addButton('multiImages',{
              text: '多图上传',
              icon: 'image',
              tooltip: '多图上传',
              onclick:  () => {
                this.showMultiImagesUploadDialog = true;

                this.multiUploadImgs = [];
                this.multiUploadImgBlobs = [];
                this.notImgFilteredNum = 0;
              },
            });
          },

          file_picker_types: 'image media',

          file_picker_callback:  (callback, value, meta) => {
            console.log(meta);

            // 创建文件上传input
            let fileInput = document.createElement('input');
            document.body.appendChild(fileInput);
            fileInput.style.display = 'none';
            fileInput.type = 'file';

            if (meta.filetype === 'image') {
              fileInput.accept = 'image/*';
            }

            if (meta.filetype === 'media') {
              fileInput.accept = 'video/*,audio/*';
            }

            // fileInput.multiple = true;

            // type='file'的input都有files属性，存储用户所选的文件信息
            console.log(fileInput.files);

            // 模拟点击
            fileInput.click();

            // 选择了文件后
            fileInput.onchange =  () => {
              console.log(fileInput.files);

              let formData = new FormData();
              formData.append('file',fileInput.files[0]);

              // 手动实现上传进度显示
              let loadingTips = document.createElement('div');
              loadingTips.className = 'tinymce_editor_upload_loading_tips_container';
              // loadingTips.style.display = 'none';
              loadingTips.innerHTML = '<div class="tinymce_editor_upload_loading_tips"><div class="tinymce_editor_upload_loading_tips_progress"><div class="tinymce_editor_upload_loading_tips_progress_bar" style="width: 0;"></div></div><div class="tinymce_editor_upload_loading_tips_progress_txt"></div></div>';

              let uploadDialog = document.querySelector('.mce-container.mce-panel.mce-floatpanel.mce-window.mce-in');
              uploadDialog.appendChild(loadingTips);

              axios.request({
                url: this.fileUploadUrl,
                method: 'post',
                data: formData,
                onUploadProgress:  (progressEvent) => {

                  // console.log(progressEvent);
                  let uploadPercentOrigin = ( (progressEvent.loaded)/(progressEvent.total) ).toFixed(2);
                  let uploadPercent = (uploadPercentOrigin*100).toFixed()+'%';
                  console.log(uploadPercent);

                  let uploadProgressBar = document.querySelector('.tinymce_editor_upload_loading_tips_progress_bar');
                  let uploadProgressTxt = document.querySelector('.tinymce_editor_upload_loading_tips_progress_txt');

                  uploadProgressBar.style.width = uploadPercent;
                  uploadProgressTxt.innerHTML = '正在上传：'+uploadPercent;

                }
              }).then( (response) => {

                // 上传结束后
                // 删除 loadingTips
                loadingTips.remove();
                // 删除 fileInput
                fileInput.remove();

                console.log(response);

                let fileUrl = response.data.fileUrl;

                // 将文件地址填入对话框中
                callback(fileUrl);

              }).catch( (error) => {
                console.log(error);

              });

            };

          },

          // images_upload_url: null,

          // images_upload_handler:  (blobInfo, success, failure) => {
          //   console.log(blobInfo.blob());
          //   console.log(blobInfo.filename());
          //
          //   let formData = new FormData();
          //   formData.append('file',blobInfo.blob());
          //
          //   let imgUrl = null;
          //
          //   axios.post(this.initOptions.images_upload_url,formData).then( (response) => {
          //     console.log(response);
          //     if (response.status === 200) {
          //       imgUrl = response.data.fileUrl;
          //
          //       // 将图片地址填入对话框
          //       success(imgUrl);
          //
          //     }
          //   });
          //
          // },

        },
        content: '',
        showMultiImagesUploadDialog: false,
        multiUploadImgs: [],
        multiUploadImgBlobs: [],
        renderFileInput: false,
        notImgFilteredNum: 0,
      };
    },
    computed: {
      isAllImgsUploaded () {

        let findRule = function (obj) {
          if (!obj.isUploaded) {
            return obj;
          }
        };

        if (this.multiUploadImgs.findIndex(findRule) >= 0) {
          return false;
        } else {
          return true;
        }

      },
      imgUploadedNum () {

        let imgUploadedNum = 0;
        this.multiUploadImgs.forEach( (img) => {
          if (img.isUploaded) {
            imgUploadedNum ++;
          }
        });
        return imgUploadedNum;

      },
      allImgsSize () {

        let allImgsSize = 0;
        this.multiUploadImgBlobs.forEach( (blob) => {
          allImgsSize += blob.size;
        });
        return (allImgsSize/1024/1024).toFixed(2);

      },
      imgUploadedSize () {

        let imgUploadedSize = 0;
        this.multiUploadImgBlobs.forEach( (blob,index) => {
          if (this.multiUploadImgs[index].isUploaded) {
            imgUploadedSize += blob.size;
          }
        });
        return (imgUploadedSize/1024/1024).toFixed(2);

      },
    },
    methods: {
      selectImgs() {
        this.renderFileInput = true;

        this.$nextTick(function () {
          let fileInput = document.querySelector('#multiple_images_upload_file_input');
          console.log(fileInput.files);
          fileInput.click();

          fileInput.onchange =  () => {
            console.log(fileInput.files);

            let fileList = fileInput.files;
            let notImgNum = 0;
            for (let i = 0; i < fileList.length; i++) {

              if (fileList[i].type.indexOf('image') === 0) { // 是图片

                let imgPreviewUrl = window.URL.createObjectURL(fileList[i]);
                this.multiUploadImgs.push(
                  {
                    imgPreviewUrl: imgPreviewUrl,
                    imgUploadedUrl: '',
                    imgSize: fileList[i].size,
                    isUploading: false,
                    isUploaded: false
                  }
                );

                this.multiUploadImgBlobs.push(fileList[i]);

              } else { // 不是图片

                notImgNum ++;

              }

            }

            this.notImgFilteredNum = notImgNum;
            this.renderFileInput = false;

          };

        });

      },
      uploadImgs() {

        this.multiUploadImgBlobs.forEach( (blob,index) => {
          console.log(blob);
          console.log(index);

          if (!this.multiUploadImgs[index].isUploaded) {

            let formData = new FormData();
            formData.append('file',blob);

            this.multiUploadImgs[index].isUploading = true;

            axios.request({
              url: this.fileUploadUrl,
              method: 'post',
              data: formData,
              onUploadProgress:  (progressEvent) => {

                // console.log(progressEvent);
                let uploadPercentOrigin = ( (progressEvent.loaded)/(progressEvent.total) ).toFixed(2);
                let uploadPercent = (uploadPercentOrigin*100).toFixed()+'%';
                console.log(uploadPercent);

                let progressBarPercent = document.querySelector('.tinymce_editor_component .multiple_images_upload_dialog_imglist .img_preview_container_'+index+' .upload_progress_bar_percent');
                progressBarPercent.style.width = uploadPercent;

              }
            }).then( (response) => {
              console.log(response);
              this.multiUploadImgs[index].isUploading = false;
              this.multiUploadImgs[index].isUploaded = true;
              this.multiUploadImgs[index].imgUploadedUrl = response.data.fileUrl;
            }).catch( (error) => {

            });

          }

        });

      },
      confirmInsertMultiImgs() {

        if (this.multiUploadImgs.length) { // 选择了图片

          let findRule = function (obj) {
            if (!obj.isUploaded) {
              return obj;
            }
          };

          if (this.multiUploadImgs.findIndex(findRule) >= 0) {

            alert('请先上传图片');

          } else {

            let multiImgsHTML = '';
            this.multiUploadImgs.forEach( (img) => {
              multiImgsHTML += '<p><img src="'+img.imgUploadedUrl+'"></p>';
            });

            console.log(tinymce); // tinymce 是 tinymce库中定义的全局变量
            tinymce.activeEditor.insertContent(multiImgsHTML);
            this.showMultiImagesUploadDialog = false;

          }

        } else { // 未选择图片

          alert('请先添加图片');

        }


      },
      setImgCentered(index) {

        // DOM渲染完成以后再执行（这里是异步操作，后面的 return true 会先执行）
        this.$nextTick(function () {
          let curImg = document.querySelector('.tinymce_editor_component .multiple_images_upload_dialog_imglist .img_preview_'+index);

          curImg.onload =  () => {
            let curImgDisplayHeight = 0;
            if (curImg.width <= 120 && curImg.height <= 120) {
              curImgDisplayHeight = curImg.height;
            } else {
              if (curImg.width <= curImg.height) {
                curImgDisplayHeight = 120;
              } else {
                curImgDisplayHeight = Number( 120*(curImg.height/curImg.width).toFixed() );
              }
            }
            // console.log(curImgDisplayHeight);

            let marginTop = (120-curImgDisplayHeight)/2;
            if (marginTop) {
              marginTop += 'px';
            }
            console.log(marginTop);

            // 这里用vue自带的 :style 有问题，改用原生js实现
            curImg.style.marginTop = marginTop;

          };

        });

        return true;

      },
      delImg(index) {
        this.multiUploadImgs.splice(index,1);
        this.multiUploadImgBlobs.splice(index,1);
      },
    },
    mounted () {

    },
    watch: {
      'content': function (newVal,oldVal) {
        this.$emit('input',this.content);
      },
    },
  }
</script>

<style lang="scss">

  // 屏蔽tinymce Cloud提示
  .mce-widget.mce-notification.mce-notification-warning.mce-has-close.mce-in {
    display: none !important;
  }

  // 通用样式
  .clearfix:before, .clearfix:after {
    content: "";
    display: table;
  }
  .clearfix:after {
    clear: both;
  }
  .clearfix {
    *zoom: 1;/*IE/7/6*/
  }

  .left {
    float: left;
  }
  .right {
    float: right;
  }

  .text-center {
    text-align: center;
  }

  .mt5 {
    margin-top: 5px;
  }
  .mb5 {
    margin-bottom: 5px;
  }
  .pl15 {
    padding-left: 15px;
  }
  .pr15 {
    padding-right: 15px;
  }
  .pt10 {
    padding-top: 10px;
  }

  // 组件样式
  .tinymce_editor_upload_loading_tips_container {
    box-sizing: border-box !important;
    position: absolute !important;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(255,255,255,0.7) !important;
    * {
      box-sizing: border-box !important;
    }
  }

  .tinymce_editor_upload_loading_tips {
    position: absolute !important;
    top: 50% !important;
    margin-top: -23px !important;
    left: 50% !important;
    margin-left: -125px !important;
    width: 250px !important;
    height: 46px !important;
  }

  .tinymce_editor_upload_loading_tips_progress {
    background-color: #fff !important;
    border: 1px solid #409EFF !important;
    width: 100%;
    height: 22px;
  }

  .tinymce_editor_upload_loading_tips_progress_bar {
    width: 0;
    height: 20px !important;
    background-color: #2d8ac7 !important;
  }

  .tinymce_editor_upload_loading_tips_progress_txt {
    text-align: center !important;
    height: 24px !important;
    line-height: 24px !important;
  }

  // 给上传文件对话框浏览图标添加“上传”字样
  .mce-combobox.mce-filepicker.mce-abs-layout-item.mce-last.mce-has-open {
    input.mce-textbox {
      width: calc(100% - 76px) !important;
    }
    .mce-btn.mce-open {
      > button {
        &:after {
          content: "上传";
          margin-left: 5px;
        }
      }
    }
  }

  // 多图上传对话框
  .tinymce_editor_component {

    .multiple_images_upload_dialog {
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background-color: rgba(0,0,0,0.3);
      z-index: 10001;
      line-height: 40px;
      box-sizing: border-box;
      * {
        box-sizing: border-box;
      }
    }

    .multiple_images_upload_dialog_head {
      border-bottom: 1px solid #c5c5c5;
      padding: 0 15px;
    }
    .multiple_images_upload_dialog_title {
      font-size: 20px;
      font-weight: bold;
    }
    .multiple_images_upload_dialog_close_btn {
      width: 20px;
      height: 20px;
      line-height: 20px;
      margin-top: 10px;
      text-align: center;
      cursor: pointer;
      i.mce-ico.mce-i-remove {
        font-size: 20px;
        color: #858585;
        line-height: 20px;
      }
    }
    .multiple_images_upload_dialog_content {
      position: absolute;
      top: 50%;
      margin-top: -225px;
      left: 50%;
      margin-left: -350px;
      width: 720px;
      height: 450px;
      background-color: #fff;
      box-shadow: 0 3px 7px rgba(0,0,0,0.3);
      z-index: 10002;
    }
    .multiple_images_upload_dialog_btn {
      display: inline-block;
      line-height: 28px;
      height: 30px;
      padding: 0 10px;
      border: 1px solid #c5c5c5;
      cursor: pointer;
      &.colored_btn {
        background-color: #2d8ac7;
        color: #fff;
      }
    }
    .multiple_images_upload_dialog_imglist {
      width: 695px;
      height: 300px;
      margin-left: auto;
      margin-right: auto;
      padding: 5px;
      border: 1px solid #c5c5c5;
      overflow-y: scroll;
      ul {
        li {
          float: left;
          width: 20%;
          height: 132px;
          padding: 5px;
          .img_preview_container {
            position: relative;
            border: 1px dashed #c5c5c5;
            width: 100%;
            height: 100%;
            background-color: #ddd;
            &:hover {
              .upload_del_img {
                display: block;
              }
            }
            > img {
              max-width: 100%;
              max-height: 100%;
              display: block;
              margin-left: auto;
              margin-right: auto;
            }
            > .upload_success {
              position: absolute;
              width: 40px;
              height: 40px;
              right: 0;
              bottom: 0;
            }
            > .upload_del_img {
              display: none;
              position: absolute;
              top: 0;
              left: 0;
              right: 0;
              height: 30px;
              background-color: #000;
              opacity: 0.7;
              img {
                display: block;
                width: 15px;
                margin-left: auto;
                margin-right: auto;
                margin-top: 7.5px;
                cursor: pointer;
              }
            }
            > .upload_progress {
              position: absolute;
              bottom: 0;
              left: 0;
              right: 0;
              height: 10px;
            }
            .upload_progress_bar {
              border: 1px solid #2d8ac7;
              height: 100%;
              background-color: #fff;
            }
            .upload_progress_bar_percent {
              height: 100%;
              width: 0;
              background-color: #2d8ac7;
            }
          }
        }
      }
    }
  }

</style>
