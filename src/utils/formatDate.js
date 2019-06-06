export default function Format(fmt = 'yyyy-MM-dd', time = Date.now()) {
    let b = new Date(time)
    var weekday = ['日', '一', '二', '三', '四', '五', '六']
    var o = {
      'M+': b.getMonth() + 1, // 月份
      'd+': b.getDate(), // 日
      'h+': b.getHours(), // 小时
      'm+': b.getMinutes(), // 分
      's+': b.getSeconds(), // 秒
      'q+': Math.floor((b.getMonth() + 3) / 3), // 季度
      'S': b.getMilliseconds(), // 毫秒
      'w': weekday[b.getDay()]
    }
    if (/(y+)/.test(fmt)) {
      fmt = fmt.replace(
        RegExp.$1,
        (b.getFullYear() + '').substr(4 - RegExp.$1.length)
      )
    }
    for (var k in o) {
      if (new RegExp('(' + k + ')').test(fmt)) {
        fmt = fmt.replace(
          RegExp.$1,
          RegExp.$1.length === 1 ? o[k] : ('00' + o[k]).substr(('' + o[k]).length)
        )
      }
    }
    return fmt
  }
  