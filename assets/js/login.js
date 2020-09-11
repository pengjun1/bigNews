window.onload = function () {
  // 切换登录,注册界面
  var linkReg = document.querySelector("#reg"),
    linkLog = document.querySelector("#log"),
    regBox = document.querySelector(".reg-box"),
    logBox = document.querySelector(".log-box")
  linkReg.onclick = function () {
    regBox.style.display = "none"
    logBox.style.display = "block"
  }
  linkLog.onclick = function () {
    logBox.style.display = "none"
    regBox.style.display = "block"
  }

  // 表单校验
  var form = layui.form
  form.verify({
    pwd: [
      /^[\S]{6,12}$/
      , '密码必须6到12位，且不能出现空格'
    ],
    repwd: function (value) {
      var pwd = $(".password").val()
      if (pwd != value) {
        return "两次密码不一致"
      }
    }
  });

  //注册功能
  $(".reg-box form").on("submit", function (e) {
    e.preventDefault()
    $.post(
      "http://ajax.frontend.itheima.net/api/reguser",
      {
        username: $(".reg-box .username").val(),
        password: $(".reg-box .password").val()
      },
      function (res) {
        if (res.status != 0)
          return layer.msg(res.message)
        layer.msg(res.message)
        $("#reg").click()
      }
    )
  })

  // 登录行为
  $(".log-box form").on("submit", function (e) {
    e.preventDefault()
    $.ajax({
      url: "/api/login",
      type: "post",
      data: $(this).serialize(),
      success: function (res) {
        if (res.status != 0)
          return layer.msg(res.message)
        console.log(res);
        layer.msg(res.message)
        //获取token,存储到本地
        localStorage.setItem("Autorization", res.token)
        localStorage.getItem("Autorization")
        //登录成功跳转页面
        // location.href = "http://www.baidu.com"
        // location.href = "/index.html"
      }
    })
  })
}
