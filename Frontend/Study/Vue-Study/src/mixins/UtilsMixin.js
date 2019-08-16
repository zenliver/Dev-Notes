export default {
  methods: {
    randomStr(len) {
  　　len = len || 32;
  　　var $chars = 'ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz2345678';    /****默认去掉了容易混淆的字符oOLl,9gq,Vv,Uu,I1****/
  　　var maxPos = $chars.length;
  　　var pwd = '';
  　　for (let i = 0; i < len; i++) {
  　　　　pwd += $chars.charAt(Math.floor(Math.random() * maxPos));
  　　}
  　  return pwd;
    },
    timestampToDate(time,format) {

      Date.prototype.Format = function (fmt) { //author: meizz

        var o = {
            "M+": this.getMonth() + 1, //月份
            "d+": this.getDate(), //日
           /* "h+": this.getHours(), //小时 */
            "H+": this.getHours(), //小时
            "m+": this.getMinutes(), //分
            "s+": this.getSeconds(), //秒
            "q+": Math.floor((this.getMonth() + 3) / 3), //季度
            "S": this.getMilliseconds() //毫秒
        };

        if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
        for (var k in o)
        if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
        return fmt;
      };

      let date = new Date(time);
      return date.Format(format);

    },
    dateToTimestamp(date) {
      return (new Date(Date.parse(date.replace(/-/g,"/")))).getTime();
    },
    dateToWeek(date,type) {

      let dateObj = new Date(date);
      let day = dateObj.getDay();
      let dateTime = this.dateToTimestamp(date);

      if (type === 'sunday') {
        let sunday = this.timestampToDate(dateTime-(day-0)*24*60*60*1000,'yyyy-MM-dd');
        let saturday = this.timestampToDate(dateTime+(6-day)*24*60*60*1000,'yyyy-MM-dd');
        return {
          start: sunday,
          end: saturday
        };
      }

      if (type === 'monday') {
        let monday = this.timestampToDate(dateTime-(day-1)*24*60*60*1000,'yyyy-MM-dd');
        let sunday = this.timestampToDate(dateTime+(7-day)*24*60*60*1000,'yyyy-MM-dd');
        return {
          start: monday,
          end: sunday
        };
      }

    },
    getPrevNextMonth(date,type,format) {

      let dateObj = new Date(date);
      let year = dateObj.getFullYear();
      let month = dateObj.getMonth();
      let nextYear = null;
      let nextMonth = null;
      let prevYear = null;
      let prevMonth = null;

      if (type === 'next') {

        if (month <= 10) {
          nextMonth = month + 1;
          nextYear = year;
        } else {
          nextMonth = 0;
          nextYear = year + 1;
        }

      }

      if (type === 'prev') {

        if (month >= 1) {
          prevMonth = month - 1;
          prevYear = year;
        } else {
          prevMonth = 11;
          prevYear = year - 1;
        }

      }

      let dateObjNew = new Date();

      if (type === 'next') {
        dateObjNew.setFullYear(nextYear);
        dateObjNew.setMonth(nextMonth);
      }

      if (type === 'prev') {
        dateObjNew.setFullYear(prevYear);
        dateObjNew.setMonth(prevMonth);
      }

      return this.timestampToDate(dateObjNew.getTime(),format);

    },
  },
};
