<template>
  <div class="rounded-bg">
    <h1 class="title">闲云潭影日悠悠，物转星移几度秋</h1>
  </div>
  <div class="bottom-rounded-bg">
    <h2 class="blog-title">sunduskxy</h2>
    <ul class="blog-list">
      <li
        class="blog-item"
        v-for="(blog, index) in paginatedBlogs"
        :key="index"
        @click="goToBlog(blog.id)"
      >
        <h3>{{ blog.title }}</h3>
        <div v-html="getTruncatedContent(blog.content)" class="blog-content"></div>
        <!-- 确保日期容器的结构正确 -->
        <div class="blog-title-container">
          <img src="@/assets/riqi.png" alt="日期图标" class="date-icon" />
          <p class="blog-title-content">{{ blog.date }}</p>
        </div>
      </li>
    </ul>
    <!-- 分页控制 -->
    <div class="pagination">
      <button @click="changePage(currentPage - 1)" :disabled="currentPage === 1">上一页</button>
      <span>第 {{ currentPage }} 页，共 {{ totalPages }} 页</span>
      <button @click="changePage(currentPage + 1)" :disabled="currentPage === totalPages">下一页</button>
    </div>
  </div>
</template>

<script>
import { marked } from 'marked';
import yaml from 'js-yaml';

export default {
  name: 'XYHome',
  data() {
    return {
      blogs: [],
      currentPage: 1,
      pageSize: 10,
      contentLimit: 150,
    };
  },
  computed: {
    totalPages() {
      return Math.ceil(this.blogs.length / this.pageSize);
    },
    paginatedBlogs() {
      const start = (this.currentPage - 1) * this.pageSize;
      return this.blogs.slice(start, start + this.pageSize);
    },
  },
  methods: {
    loadBlogs() {
      try {
        const context = require.context('@/posts', false, /\.md$/);
        const blogs = context.keys().map((key) => {
          const markdownContent = context(key).default;

          // 提取 YAML front matter
          const yamlFrontMatterMatch = markdownContent.match(/---\s*([\s\S]*?)\s*---/);
          let metadata = { date: '未知日期', title: '未知标题' };

          if (yamlFrontMatterMatch) {
            const yamlContent = yamlFrontMatterMatch[1];
            // 使用 js-yaml 解析 YAML 内容
            metadata = yaml.load(yamlContent);
          }

          const renderedContent = marked(markdownContent.replace(/---\s*([\s\S]*?)\s*---/, ''));

          return {
            id: key.slice(2, -3),
            title: metadata.title || '未知标题',
            content: renderedContent,
            date: metadata.date || '未知日期',
          };
        });
        this.blogs = blogs;
      } catch (error) {
        console.error('加载博客文章时出错:', error);
      }
    },
    goToBlog(blogId) {
      this.$router.push({ name: 'XYBlogDetail', params: { id: blogId } });
    },
    changePage(page) {
      if (page >= 1 && page <= this.totalPages) {
        this.currentPage = page;
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    },
    getTruncatedContent(content) {
      const plainText = content.replace(/(<([^>]+)>)/gi, '');
      if (plainText.length > this.contentLimit) {
        return marked(plainText.slice(0, this.contentLimit) + '...');
      }
      return content;
    },
  },
  mounted() {
    this.loadBlogs();
  },
};
</script>

<style>
.rounded-bg {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 400px;
  background-image: url('@/assets/whiteBC.jpg');
  background-size: cover;
}

.title {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-size: 50px;
  color: #333;
}

.bottom-rounded-bg {
  margin: 400px 80px 150px 80px;
  height: auto;
  padding: 20px;
  background-color: #444;
  border-radius: 20px;
}

.blog-title {
  font-size: 24px;
  margin-bottom: 20px;
  color: #fff;
}

.blog-list {
  list-style: none;
  padding: 0;
}

.blog-item {
  background-color: #333;
  border-radius: 10px;
  padding: 15px;
  margin-bottom: 15px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.blog-item:hover {
  background-color: #555;
}

.blog-item h3 {
  font-size: 20px;
  color: #fff;
}

.blog-content {
  color: #fff;
  text-align: left; /* 让博客内容左对齐 */
}

.blog-item div.blog-content {
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
}

/* 调整日期容器的样式 */
.blog-title-container {
  display: flex;
  align-items: center;
  margin-top: 10px;
  color: #bbb;
  
}

.date-icon {
  width: 16px;
  height: 16px;
  margin-right: 5px;
}

.blog-title-content {
  margin: 0;
  font-size: 14px;
}

.pagination {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 60px;
}

.pagination button {
  background-color: #333;
  color: #fff;
  border: none;
  padding: 10px 20px;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.pagination button:disabled {
  background-color: #888;
  cursor: not-allowed;
}

.pagination button:hover:not(:disabled) {
  background-color: #555;
}

.pagination span {
  color: #fff;
}
</style>