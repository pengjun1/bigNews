$(function () {
  //获取用户基本信息
  getUserInfo()
  //封装获取用户基本信息函数
  function getUserInfo() {
    $.ajax({
      method: "get",
      url: "/my/userinfo",
      headers: {
        Authorization: localStorage.getItem("token")
      },
      success: function (res) {
        console.log(res);
        // if (res.status !== 0) {
        //   return layui.layer.msg("获取用户信息失败")
        //   localStorage.removeItem("token")

        // }
        // layui.layer.msg("获取用户信息成功")
        //渲染用户头像
        renderAvatar(res.data)
      }
    })
  }

  //封装渲染用户头像函数
  function renderAvatar(user) {
    //获取用户名
    var name = user.nickname || user.username
    $(".welcome").html("欢迎您 " + name)
    //判断有没有头像,没有的话渲染文字头像
    if (user.user_pic !== null) {
      $(".text-avatar").hide()
      $(".layui-nav-img").attr("src", user.user_pic).show()
    } else {
      $(".layui-nav-img").hide()
      var firstChar = name[0].toUpperCase()
      $(".text-avatar").html(firstChar).show()
    }
    // .userinfo.text - avatar
    // .layui - layout - right.text - avatar
  }

  // 退出按钮
  $(".btn-exit").on("click", function () {
    layer.confirm('确定退出登录?', { icon: 3, title: '提示' }, function (index) {
      localStorage.removeItem("token")
      location.href = "/login.html"
      layer.close(index);
    })
  })
})
