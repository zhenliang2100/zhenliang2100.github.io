document.addEventListener('DOMContentLoaded', function() {
  // 获取返回按钮元素
  const backButton = document.getElementById('back-button');
  
  if (backButton) {
    // 添加点击事件监听器
    backButton.addEventListener('click', function() {
      // 检查当前页面URL，决定返回到哪个页面
      const currentPath = window.location.pathname;
      
      // 根据当前页面路径决定返回逻辑
      if (currentPath.includes('论坛首页.html')) {
        // 论坛首页可以返回上一页
        window.history.back();
      } else if (currentPath.includes('工单列表.html')) {
        // 工单列表可以返回上一页
        window.history.back();
      } else if (currentPath.includes('帖子详情.html')) {
        // 帖子详情页已经有返回按钮逻辑
        // 如果需要可以在这里重写
      } else if (currentPath.includes('员工历程.html')) {
        // 员工历程可以返回上一页
        window.history.back();
      } else if (currentPath.includes('展业助手.html')) {
        // 展业助手可以返回上一页
        window.history.back();
      } else if (currentPath.includes('数据统计.html')) {
        // 数据统计可以返回上一页
        window.history.back();
      } else if (currentPath.includes('帖子管理.html')) {
        // 帖子管理可以返回论坛首页或上一页
        window.history.back();
      } else if (currentPath.includes('评论管理.html')) {
        // 评论管理可以返回帖子管理或上一页
        window.history.back();
      } else if (currentPath.includes('发帖后台.html')) {
        // 发帖后台可以返回帖子管理或上一页
        window.history.back();
      } else if (currentPath.includes('运营SOP列表.html')) {
        // 运营SOP列表可以返回上一页
        window.history.back();
      } else if (currentPath.includes('编辑评估单.html') || 
                 currentPath.includes('工单列表.html') || 
                 currentPath.includes('评估单详情.html') || 
                 currentPath.includes('新增评估单.html')) {
        // 评估单相关页面返回工单列表
        window.location.href = '../2025-09/工单列表.html';
      } else {
        // 默认行为：返回上一页
        window.history.back();
      }
    });
  }
});