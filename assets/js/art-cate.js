$(function () {
  //获取文章类别
  getCateList()
  function getCateList() {
    $.ajax({
      url: '/my/article/cates',
      method: 'get',
      headers: {
        Authorization: localStorage.getItem("token")
      },
      success: function (res) {
        console.log(res);
        if (res.status !== 0)
          layui.layer.msg("获取文章列表失败")
        layui.layer.msg("获取文章列表成功")
        //渲染文章列表
        var tableHTML = template("tpl-table", res)
        $("tbody").html(tableHTML)
      }
    })
  }

  //添加类别按钮,点击弹出层
  $("#btnAddList").on('click', function () {
    var addCateIndex = layui.layer.open({
      type: 1,
      area: ['500px', '250px'],
      title: '添加文章分类',
      content: $('#tpl-add').html()
    });
  })

  //添加文章分类
  $("#addCateForm").on('submit', function (e) {
    e.preventDefault()
    $.ajax({
      url: '/my/article/addcates',
      method: 'post',
      data: $(this).serialize(),
      headers: {
        Authorization: localStorage.getItem("token")
      },
      success: function (res) {
        console.log(666);
        console.log(res);
        if (res.status !== 0)
          return layui.layer.msg("添加分类失败")
        layui.layer.msg("添加分类成功")
        getCateList()
        layui.layer.close(addCateIndex)
      }
    })
  })



  // 点击编辑按钮,弹出弹框
  $("body").on("click", "#btnEdit", function () {
    var editCateIndex = layui.layer.open({
      type: 1,
      area: ['500px', '250px'],
      title: '修改文章分类',
      content: $('#tpl-edit').html()
    });
    var cateID = $(this).attr("data-id")
    $.ajax({
      url: `/my/article/cates/${cateID}`,
      method: 'get',
      headers: {
        Authorization: localStorage.getItem("token")
      },
      success: function (res) {
        console.log(res);
        if (res.status !== 0)
          return layui.layer.msg("获取该条数据失败")
        layui.layer.msg("获取该条数据成功")
        layui.form.val("edit-form", res.data)
        // getCateList()

      }
    })
  })

  // 编辑文章分类,并提交
  $("body").on("submit", "#editCateForm", function (e) {
    e.preventDefault()
    console.log($(this).serialize());
    $.ajax({
      url: '/my/article/updatecate',
      method: 'post',
      date: $(this).serialize(),
      headers: {
        Authorization: localStorage.getItem("token")
      },
      success: function (res) {
        console.log(res);
        if (res.status !== 0)
          return layui.layer.msg("获取该条数据失败")
        layui.layer.msg("获取该条数据成功")
        // getCateList()
        layui.layer.close(editCateIndex)
      }
    })
  })

  // 删除文章分类
  $("body").on("click", "#btnDel", function () {
    var cateID = $(this).attr("data-id")
    var delCateIndex = layui.layer.confirm("确认删除?", { icon: 3, title: "提示" }, function (delCateIndex) {
      console.log(cateID);
      $.ajax({
        url: `/my/article/deletecate/${cateID}`,
        method: "get",
        headers: {
          Authorization: localStorage.getItem("token")
        },
        success: function (res) {
          console.log(res);
          if (res.status !== 0)
            return layui.layer.msg(res.message)
          layui.layer.msg(res.message)
          getCateList()

          layui.layer.close(delCateIndex)
        }
      })
    });
  })
})

