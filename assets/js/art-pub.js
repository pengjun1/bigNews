$(function () {
  var layer = layui.layer
  var form = layui.form
  form.render()

  //获取文章分类列表
  getArtCateList()
  function getArtCateList() {
    $.ajax({
      url: 'http://ajax.frontend.itheima.net/my/article/cates',
      type: 'get',
      headers: {
        Authorization: localStorage.getItem("token")
      },
      success: function (res) {
        if (res.status !== 0)
          return layer.msg(res.message)
        layer.msg(res.message)
        var cateListHTML = template('tpl-catelist', res)
        $('#selectCateList').html(cateListHTML)
        form.render()
      }
    })
  }

  // 初始化富文本编辑器
  initEditor()

  // 1. 初始化图片裁剪器
  var $image = $('#image')
  // 2. 裁剪选项
  var options = {
    aspectRatio: 400 / 280,//裁剪比例
    preview: '.img-preview'//预览区域
  }
  // 3. 初始化裁剪区域
  $image.cropper(options)

  // 选择封面
  $('#selectImage').on('click', function () {
    $('#file').click()
  })

  // 将图片替换裁剪区域
  $('#file').on('change', function (e) {
    var files = e.target.files
    if (files.length === 0)
      return layer.msg('图片上传失败')
    layer.msg('图片上传成功')
    var newImageURL = URL.createObjectURL(files[0])
    console.log(newImageURL);
    $image
      .cropper('destroy')      // 销毁旧的裁剪区域
      .attr('src', newImageURL)  // 重新设置图片路径
      .cropper(options)        // 重新初始化裁剪区域
  })

  var artState = "已发布"
  $('#btnSave2').on('click', function () {
    artState = "草稿"
  })

  $('#form-pub').on('submit', function (e) {
    e.preventDefault()
    var fd = new FormData($(this)[0])
    fd.append('state', artState)
    $image
      .cropper('getCroppedCavas', {
        width: 400, height: 300
      })
      .toBlob(function (blob) {
        fd.append('cover_img', blob)
      })

    //发布文章
    pubArt(fd)
    function pubArt(fd) {
      $.ajax({
        url: "/my/article/add",
        type: "post",
        data: fd,
        contentType: false,//不是值
        processData: false,
        success: function (res) {
          if (res.status !== 0)
            return layer.msg(res.message)
          layer.msg(res.message)

        }
      })
    }
  })
})
