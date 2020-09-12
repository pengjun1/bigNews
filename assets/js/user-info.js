$(function () {

  //引入form模块
  var form = layui.form

  //验证基本资料
  form.verify({
    nickname: function (value) {
      if (value.length > 8) {
        return "用户昵称在1-8位之间"
      }
    }
  })

  //获取用户基本信息
  $.ajax({
    method: "get",
    url: "/my/userinfo",
    headers: {
      Authorization: localStorage.getItem("token")
    },
    success: function (res) {
      console.log(res);
      if (res.status !== 0) {
        return layui.layer.msg("获取用户信息失败")
      }
      layui.layer.msg("获取用户信息成功")
      $(".formUserInfo [name='username']").val(res.data.username)
      $(".formUserInfo [name='nickname']").val(res.data.nickname)
      $(".formUserInfo [name='email']").val(res.data.email)
    }
  })

  //上传用户基本信息
  $.ajax({
    url: '/my/userinfo',

  })
})
