<template>
  <div class="rounded-bg">
    <h1 class="title">阁中帝子今何在？槛外长江空自流</h1>
  </div>
  <div class="bottom-rounded-bg">
    <h2 class="blog-title">sunduskxy</h2>
    <ul class="blog-list">
      <li class="blog-item" v-for="(blog, index) in paginatedBlogs" :key="index" @click="goToBlog(blog.id)">
        <h3>{{ blog.title }}</h3>
        <div v-html="getTruncatedContent(blog.content)"></div> <!-- 显示截断后的内容 -->
        <p class="blog-date">{{ blog.date }}</p>
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

export default {
  name: 'XYHome',
  data() {
    return {
      blogs: [],
      currentPage: 1,
      pageSize: 10,
      contentLimit: 150, // 限制内容字符长度
    };
  },
  computed: {
    totalPages() {
      return Math.ceil(this.blogs.length / this.pageSize);
    },
    paginatedBlogs() {
      const start = (this.currentPage - 1) * this.pageSize;
      return this.blogs.slice(start, start + this.pageSize);
    }
  },
  methods: {
    loadBlogs() {
      try {
        const context = require.context('@/posts', false, /\.md$/);
        const blogs = context.keys().map((key) => {
          const markdownContent = context(key).default;
          const renderedContent = marked(markdownContent); // 渲染整个 Markdown 内容

          return {
            // 使用文件名作为标题，去掉 "./" 和 ".md"
            id: key.slice(2, -3),
            title: key.slice(2, -3), // 文件名作为标题
            content: renderedContent, // 渲染完整的 Markdown 内容
            date: new Date().toISOString().split('T')[0], // 使用当前日期
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
        window.scrollTo({ top: 0, behavior: 'smooth' }); // 自动滚动到页面顶部
      }
    },
    getTruncatedContent(content) {
      // 如果内容长度超过设定的限制，则进行截断
      const plainText = content.replace(/(<([^>]+)>)/gi, ""); // 去除HTML标签
      if (plainText.length > this.contentLimit) {
        return marked(plainText.slice(0, this.contentLimit) + '...'); // 截断并添加省略号
      }
      return content; // 否则返回完整的内容
    }
  },
  mounted() {
    this.loadBlogs();
  }
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

.blog-item div {
  display: -webkit-box;
  -webkit-line-clamp: 2; /* 限制最多显示两行 */
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
}

.blog-item p {
  font-size: 14px;
  color: #bbb;
}

.blog-date {
  text-align: right;
  color: #888;
  font-size: 12px;
}

.pagination {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 20px;
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