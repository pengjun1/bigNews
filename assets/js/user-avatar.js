$(function () {
  // 1. 初始化图片裁剪器
  var $image = $('#image')

  // 2. 裁剪选项
  var options = {
    aspectRatio: 1,
    preview: '.img-preview'
  }

  // 3. 初始化裁剪区域
  $image.cropper(options)


  //上传按钮
  $("#btnChooseImage").on("click", function () {
    //模拟文件上传点击事件
    $("input.file").click()
  })

  //文件上传控件改变后
  $("input.file").on("change", function (e) {
    var filelist = e.target.files
    if (filelist.length === 0)
      return layer.msg("请选择照片")
    var file = e.target.files[0]
    var imgURL = URL.createObjectURL(file)
    $("#image").cropper("destroy")
    //重设图片地址
    $("#image").attr("src", imgURL)
    //重新初始化
    $("#image").cropper(options)
  })

  //点击确定按钮,上传裁剪后的图片
  $("#btnUpload").on("click", function () {
    var dataURL = $image
      .cropper('getCroppedCanvas', {
        width: 100,
        height: 100
      })
      .toDataURL('image/png')

    $.ajax({
      url: '/my/update/avatar',
      type: 'post',
      data: {
        avatar: dataURL
      },
      headers: {
        Authorization: localStorage.getItem("token")
      },
      success: function (res) {
        console.log(res);
        if (res.status !== 0) {
          return layui.layer.msg('头像上传失败')
        }
        layui.layer.msg('头像修改成功')
        window.parent.location.reload()
      }
    })
  })
})
