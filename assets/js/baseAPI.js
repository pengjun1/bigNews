$.ajaxPrefilter(function (options) {
  options.url = "http://ajax.frontend.itheima.net" + options.url;
  options.Autorization = localStorage.getItem("Autorization")
})
