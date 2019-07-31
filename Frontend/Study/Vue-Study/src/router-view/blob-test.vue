<template lang="html">
  <div id="blob_test">
    <p>
      <img :src="imgDataUrl" alt="">
    </p>
    <p>调试信息：</p>
    <p id="error_tips"></p>
    <p id="test_finished_tips"></p>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        imgDataUrl: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACgAAAAoCAYAAACM/rhtAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyRpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMy1jMDExIDY2LjE0NTY2MSwgMjAxMi8wMi8wNi0xNDo1NjoyNyAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENTNiAoTWFjaW50b3NoKSIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDowMzQwNjJGMzEyMDMxMUUzODk2Q0JFM0Q1RjE4QkExQyIgeG1wTU06RG9jdW1lbnRJRD0ieG1wLmRpZDowMzQwNjJGNDEyMDMxMUUzODk2Q0JFM0Q1RjE4QkExQyI+IDx4bXBNTTpEZXJpdmVkRnJvbSBzdFJlZjppbnN0YW5jZUlEPSJ4bXAuaWlkOjAzNDA2MkYxMTIwMzExRTM4OTZDQkUzRDVGMThCQTFDIiBzdFJlZjpkb2N1bWVudElEPSJ4bXAuZGlkOjAzNDA2MkYyMTIwMzExRTM4OTZDQkUzRDVGMThCQTFDIi8+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwveDp4bXBtZXRhPiA8P3hwYWNrZXQgZW5kPSJyIj8+tQEWygAAAsdJREFUeNrM2E1oE0EUB/D/zmwSt6lJ6EdaPAhaq6itVWNbhEIP9aCgJ8GjUAQPFTz04AceFEFPIoj24EURRMWLRU8iwepJ8RApSg+2ghRFiqUpLcZNOjO+Talf/dpupmYGBhIym/nxZt6bSazEjTwMbueZyTjqF5jJOO8FMxlnIvAvnGnAeTiTgAviTAEuijMBuCSu3MBlceUE+sKVC+gbVw7ginD/G7hinNfsUmd9nroFaXNEYzVgMgSbO7DDMUQicTDbgVQKWx7WB8JpAXLOUVu9AUJWUh9FmHEwlUMhJ+C6Cql0KjBOyxJXVSfhOFEoJVAoeL0AJVyKplsyTksE3YKD3MQkJJuGFYrBnRH4Uchh78vOknFaIljpNNK+q0Y+n4eAA8uOEm6/FpwWIKtgiNckEAqvA0cO7ekObTg9Zcbi1KO0D2vRlt4XCJeIAMeaGJprLP1AqWxKkBBanjQGjtyZNo4rnRyHGph+oEURbLgfD4zrWm+hezvDFP24fPZJ6gdufhActzY8G70w7ZK+twJvvirtwJISoqeFYU+dhcyYws1BqT1JSsLtSlro2cnhCuDiK4GsqzeLl8RVhoCNcWvRh9fQ8XCunSNGS3znvcTAqNJaZpbEcXKd3M0xcMTGWdpfET5/zNFtrJgcHycVrmWk1jq47LJKCsbQuEKIvvlUK0NfF0ey4vfnmxIWelO8OO7Sa4kv00ob0Nee86Z7NCzR/VTgM01+uJHh7gEbW6tml/w0oesI3E9jHo/I5cuYz3+3AiVEE50MV6kAt9ZbGM4qqnMKx3cwjOeAg/0z+DChtABLylZveS938GIk51rvC4Hb76Sv5+3VxHlt7DtwIi0wkqXztplRxkrcG5K+n7dXE/frzki17npGYPCbKiaQ9973UbrIEmu9Mum+bhmDWwhoFO5foHG4P4FG4uaAxuK89lOAAQB29OXDkHc5ugAAAABJRU5ErkJggg==',
      };
    },
    methods: {
      base64ToBlob(urlData) {
        var arr = urlData.split(',');
        var mime = arr[0].match(/:(.*?);/)[1] || 'image/png';
        // 去掉url的头，并转化为byte
        var bytes = window.atob(arr[1]);
        // 处理异常,将ascii码小于0的转换为大于0
        var ab = new ArrayBuffer(bytes.length);
        // 生成视图（直接针对内存）：8位无符号整数，长度1个字节
        var ia = new Uint8Array(ab);

        for (var i = 0; i < bytes.length; i++) {
            ia[i] = bytes.charCodeAt(i);
        }

        return new Blob([ab], {
            type: mime
        });
      },
      testBlobFunc() {

        let errorTips = document.querySelector('#error_tips');

        try {
          let imgBlob = this.base64ToBlob(this.imgDataUrl);
          console.log(imgBlob);
          if (imgBlob) {
            alert('图片的格式是：'+imgBlob.type+'，图片的大小是：'+(imgBlob.size)+'B');
          }

          window.setTimeout(function () {
            try {
              test();
            } catch (e) {
              errorTips.innerHTML = e.toString();
            } finally {

            }
          },2000);

        } catch (e) {
          errorTips.innerHTML = e.toString();
        } finally {
          let test_finished_tips = document.querySelector('#test_finished_tips');
          test_finished_tips.innerHTML = '测试完成';
        }

      },
    },
    mounted () {
      this.testBlobFunc();
    },
  }
</script>

<style lang="css" scoped>
</style>
