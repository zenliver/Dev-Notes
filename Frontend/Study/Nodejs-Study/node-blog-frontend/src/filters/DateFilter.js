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
}
export default{
	filters: {
		date(time,fmt){
            if(typeof time ==='string'){
                try{
                    time=parseInt(time);
                }catch(e){}
            }
			fmt=fmt||"yyyy-MM-dd HH:mm";
			var d=new Date(time);
			return d.Format(fmt);
		},
        dateDay(time,fmt){
            if (!time) {
                return "";
            };
            fmt=fmt||"yyyy-MM-dd";
            var d=new Date(time);
            return d.Format(fmt);
        },
        weekStr(time,preffix){
            if(typeof time ==='string'){
                try{
                    time=parseInt(time);
                }catch(e){}
            }
            var d=new Date(time);
            let arr=["日","一","二","三","四","五","六"];
            let weekNum=d.getDay();
            return preffix+arr[weekNum];
        },
        dateSecond(time,fmt){
            fmt=fmt||"yyyy-MM-dd HH:mm:ss";
            var d=new Date(time);
            return d.Format(fmt);
        },
        toDecimals(number){
            number=number/100;
            return number.toFixed(2);
        },
       
        // 文字超出字数变为省略号
        cutNumber(msg,number){
            if(msg.length>number){
                return msg.substring(0,number)+'...';
            }else{
                return msg;
            }
        },
	}
}