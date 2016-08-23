export default function (dateStr) {
    const weekArr = ['周日', '周一', '周二', '周三', '周四', '周五', '周六'];
    let d = new Date(dateStr.replace(/-/g, "/"));
    let todaysDate = new Date();
    let week;
    if (d.setHours(0, 0, 0, 0) == todaysDate.setHours(0, 0, 0, 0)) {
        week = '今天';
    } else {
        week = weekArr[d.getDay()];
    }
    return week
}
