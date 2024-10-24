<template>
  <div class="blog-detail">
    <div class="header-image">
      <h1>{{ blogTitle }}</h1>
      <p class="blog-date">{{ blogDate }}</p> <!-- 显示博客创建时间 -->
    </div>
    <div class="content-card" v-html="blogContent"></div>
  </div>
</template>

<script>
import { marked } from 'marked';
import yaml from 'js-yaml';

export default {
  name: 'XYBlogDetail',
  data() {
    return {
      blogTitle: '',
      blogContent: '',
      blogDate: '', // 博客创建日期
    };
  },
  created() {
    const blogId = this.$route.params.id;
    this.fetchBlogContent(blogId);
  },
  methods: {
    fetchBlogContent(blogId) {
      const context = require.context('@/posts', false, /\.md$/);
      const blogKey = `./${blogId}.md`;

      if (context.keys().includes(blogKey)) {
        const markdownContent = context(blogKey).default;

        // 提取 YAML front matter
        const yamlFrontMatterMatch = markdownContent.match(/---\s*([\s\S]*?)\s*---/);
        let metadata = { date: '未知日期', title: '未知标题' };

        if (yamlFrontMatterMatch) {
          const yamlContent = yamlFrontMatterMatch[1];
          // 使用 js-yaml 解析 YAML 内容
          metadata = yaml.load(yamlContent);
        }

        this.blogTitle = metadata.title || '未知标题'; // 从 YAML 中获取标题
        this.blogContent = marked(markdownContent.replace(/---\s*([\s\S]*?)\s*---/, '')); // 渲染Markdown内容
        this.blogDate = metadata.date || '未知日期'; // 从 YAML 中获取日期
      } else {
        this.blogTitle = '博客未找到';
        this.blogContent = '抱歉，没有找到您请求的博客内容。';
        this.blogDate = ''; // 未找到博客时清空日期
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
  padding: 20px;
  margin-left: 80px;
  margin-right: 80px;
  margin-bottom: 20px;
  background-color: #444;
  color: #fff;
  border-radius: 20px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  position: relative;
  top: -100px;
}
</style>