$(function () {
  var layer = layui.layer
  //定义参数对象
  var q = {
    pagenum: 1,  //页码值
    pagesize: 2, //每页显示几条
    cate_id: "", //文章分类
    state: ""    //发布状态
  }


  //获取文章列表
  initTable()
  // 获取文章列表数据的方法
  function initTable() {
    $.ajax({
      method: 'GET',
      url: '/my/article/list',
      data: q,
      headers: {
        Authorization: localStorage.getItem("token")
      },
      success: function (res) {
        if (res.status !== 0) {
          return layer.msg('获取文章列表失败！')
        }
        // 使用模板引擎渲染页面的数据
        var htmlStr = template('tpl-table', res)
        $('tbody').html(htmlStr)
        renderPage(res.total)
      }
    })
  }

  //获取文章分类
  initCate()
  //获取文章分类的方法
  function initCate() {
    $.ajax({
      method: 'GET',
      url: '/my/article/cates',
      headers: {
        Authorization: localStorage.getItem("token")
      },
      success: function (res) {
        console.log(res);
        if (res.status !== 0) {
          return layer.msg('获取文章列表失败！')
        }
        // 使用模板引擎渲染页面的数据
        var htmlStr = template('tpl-catelist', res)
        $('select[name="cate_id"]').html(htmlStr)
        layui.form.render("select")
      }
    })
  }

  //筛选文章列表
  $("#form-search").on("submit", function (e) {
    e.preventDefault()
    q.cate_id = $("#form-search [name='cate_id']").val()
    q.state = $("#form-search [name='state']").val()
    initTable()
  })

  // 渲染分页按钮
  function renderPage(total) {
    //执行一个laypage实例
    layui.laypage.render({
      elem: 'pageBox' //注意，这里是 ID，不用加 # 号
      , count: total //数据总数，从服务端得到
      , limit: q.pagesize//每页多少条数据
      , curr: q.pagenum//当前默认选择页数
      , limits: [1, 2, 5, 10, 15, 20]
      , layout: ["count", "limit", "prev", "page", "next", "skip"]
      //分页发生切换时触发回调
      , jump: function (obj, first) {
        //first为true,代表初始化,不执行代码,,防止递归
        //first为undefined,代表点击切换页码,执行代码
        q.pagenum = obj.curr
        q.pagesize = obj.limit
        if (!first) {
          initTable()
        }
      }
    })
  }
})
