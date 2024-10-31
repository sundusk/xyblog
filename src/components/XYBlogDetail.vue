<template>
  <div class="blog-detail">
    <div class="header-image">
      <h1>{{ blogTitle }}</h1>
      <p class="blog-date">{{ formattedDate }}</p> <!-- 显示博客创建时间 -->
    </div>
    <div class="content-card" v-html="blogContent"></div> <!-- 使用 v-html 渲染 HTML 内容 -->
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'XYBlogDetail',
  data() {
    return {
      blogTitle: '',
      blogContent: '', // 这里将直接接收后端返回的 HTML 内容
      blogDate: '', // 博客创建日期
    };
  },
  computed: {
    // 格式化日期
    formattedDate() {
      return this.blogDate ? new Date(this.blogDate).toLocaleDateString() : '';
    },
  },
  created() {
    const blogId = this.$route.params.id; // 获取路由中的博客ID
    console.log("接收到的博客ID:", blogId); // 打印接收到的博客ID以调试
    this.fetchBlogContent(blogId);
  },
  methods: {
    async fetchBlogContent(blogId) {
      try {
        console.log("正在获取博客内容，博客ID:", blogId); // 记录请求的博客ID
        const response = await axios.get(`http://localhost:3000/api/blog/${blogId}`);
        const blog = response.data;

        // 从响应中解析数据
        this.blogTitle = blog.title || '未知标题';
        this.blogContent = blog.content || '内容加载失败';
        this.blogDate = blog.date || '未知日期';
      } catch (error) {
        console.error('获取博客内容时出错:', error);
        this.blogTitle = '博客未找到';
        this.blogContent = '抱歉，没有找到您请求的博客内容。';
        this.blogDate = '';
      }
    },
  },
};
</script>

<style>
.blog-detail {
  padding: 0;
  background-color: #fff;
  color: #333;
}

.header-image {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 600px;
  background-image: url('@/assets/whiteBC.jpg');
  background-size: cover;
  text-align: center; /* 使标题和日期居中 */
}

.header-image h1 {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-size: 50px;
  color: #333;
}

.blog-date {
  position: absolute;
  top: 65%; /* 日期位置略低于标题 */
  left: 50%;
  transform: translate(-50%, -50%);
  font-size: 20px;
  color: #0b0b0b; /* 日期颜色 */
}

.content-card {
  margin-top: 600px;
  padding: 100px; /* 调整内容与卡片边框的内边距 */
  margin-left: 300px; /* 增加卡片左右间距 */
  margin-right: 300px; /* 增加卡片左右间距 */
  margin-bottom: 20px;
  background-color: #444;
  color: #fff;
  border-radius: 20px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  position: relative;
  top: -100px;
  text-align: left; /* 内容左对齐 */
}
</style>