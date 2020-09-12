$.ajaxPrefilter(function (options) {
  options.url = "http://ajax.frontend.itheima.net" + options.url

  options.complete = function (res) {
    if (res.status !== 0) {
      // location.href = "./login.html"
      return localStorage.removeItem("Authorization")
    }
  }
})
