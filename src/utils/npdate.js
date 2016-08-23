//上一天下一天 nex pre date npdate
import dateFormat from './dateFormat'
export function nextDay(oDate) {
    var arr = oDate.split('-');
    var newDate = new Date(new Date(arr[0], parseInt(arr[1]) - 1, parseInt(arr[2]) + 1));
    return dateFormat(newDate,'yyyy-MM-dd');
}
export function preDay(oDate) {
    var arr = oDate.split('-');
    var newDate = new Date(new Date(arr[0], parseInt(arr[1]) - 1, arr[2]).getTime() - 24 * 60 * 60 * 1000);
    return dateFormat(newDate,'yyyy-MM-dd');
}
