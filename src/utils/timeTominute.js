/**
 * Created by hfcb on 16/8/29.
 */
export default function (str){
    var time  = str*60;
    if (time != null && time != ""){
        if (time < 60) {
            var s = time;
            time = s + '秒';
        } else if (time > 60 && time < 3600) {
            var m = parseInt(time / 60);
            time = m + "分" ;
        } else if (time >= 3600 && time < 86400) {
            var h = parseInt(time / 3600);
            var m = parseInt(time % 3600 / 60);
            time = h + "时" + m + "分";
        } else if (time >= 86400) {
            var d = parseInt(time / 86400);
            var h = parseInt(time % 86400 / 3600);
            var m = parseInt(time % 86400 % 3600 / 60)
            time = d + '天' + h + "时" + m + "分";
        }
    }
    return time;
};
