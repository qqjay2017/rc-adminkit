/**
 * 关闭浏览器窗口
 */
export function closeWindow(type?: number) {
  console.log(type)

  if (window.sessionStorage.getItem('noclose')) {
    window.sessionStorage.removeItem('noclose')
    return
  }
  // if (window.location.pathname.includes('portal') && type === 3)
  //   return

  // if (navigator.userAgent.indexOf("MSIE") > 0) {
  //   if (navigator.userAgent.indexOf("MSIE 6.0") > 0) {
  //     window.opener = null;
  //     window.close();
  //   } else {
  //     window.open('', '_top');
  //     window?.top?.close();
  //   }
  // } else if (navigator.userAgent.indexOf("Firefox") > 0) {
  //   window.location.href = 'about:blank ';
  // } else {
  //   window.opener = null;
  //   window.open('', '_self', '');
  //   window.close();
  // }

  if (
    navigator.userAgent.includes('Firefox')
    || navigator.userAgent.includes('Chrome')
  ) {
    open(location as any, '_self')?.close()
    window.location.href = 'about:blank'
    window.close()
  }
  else {
    window.opener = null
    window.open('', '_self')
    window.close()
    open(location as any, '_self')?.close()
  }
  window.close()
}
