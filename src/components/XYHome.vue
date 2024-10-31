<template>
  <div class="rounded-bg">
    <!-- 这里通过动态绑定获取的title展示 -->
    <h1 class="title">{{ pageTitle }}</h1>
  </div>
  <div class="bottom-rounded-bg">
    <h2 class="blog-title">sunduskxy</h2>
    <ul class="blog-list">
      <li
        class="blog-item"
        v-for="(blog, index) in paginatedBlogs"
        :key="index"
        @click="goToBlog(blog._id)"  
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
import axios from 'axios'; // 使用axios请求后端数据

export default {
  name: 'XYHome',
  data() {
    return {
      pageTitle: '加载中...', // 初始默认标题
      backgroundImage: '', // 存储背景图URL
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
    loadTitle() {
      axios.get('http://localhost:3000/api/title')
        .then(response => {
          this.pageTitle = response.data.title;
        })
        .catch(error => {
          console.error('获取标题时出错:', error);
        });
    },
    loadBackgroundImage() {
      axios.get('http://localhost:3000/api/background')
        .then(response => {
          this.backgroundImage = response.data.backgroundImage;
          document.querySelector('.rounded-bg').style.backgroundImage = `url(${this.backgroundImage})`;
        })
        .catch(error => {
          console.error('获取背景图时出错:', error);
        });
    },
    loadBlogs() {
      axios.get('http://localhost:3000/api/blogs')  // 请求后端API
        .then(response => {
          this.blogs = response.data;  // 获取到的博客数据存储到 blogs
        })
        .catch(error => {
          console.error('加载博客文章时出错:', error);
        });
    },
    goToBlog(blogId) {
      console.log("即将跳转的博客ID:", blogId); // 打印博客ID以调试
      this.$router.push({ name: 'XYBlogDetail', params: { id: blogId } });
    },
    changePage(page) {
      if (page >= 1 && page <= this.totalPages) {
        this.currentPage = page;
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    },
    getTruncatedContent(content) {
      const plainText = content.replace(/(<([^>]+)>)/gi, '');  // 移除 HTML 标签
      if (plainText.length > this.contentLimit) {
        return plainText.slice(0, this.contentLimit) + '...';
      }
      return content;
    },
  },
  mounted() {
    this.loadTitle(); // 页面挂载时加载动态标题
    this.loadBackgroundImage(); // 页面挂载时加载背景图
    this.loadBlogs(); // 加载博客内容
  },
};
</script>

<style>
/* 样式代码保持不变 */
.rounded-bg {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 400px;
  background-size: cover;
  background-position: center;
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
  text-align: left;
}

.blog-item div.blog-content {
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
}

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