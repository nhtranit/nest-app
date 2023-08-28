module.exports = {
  apps: [
    {
      name: 'nest-app', // Tên ứng dụng
      script: 'dist/main.js', // Đường dẫn đến tệp chính sau khi build
      instances: 1, // Số lượng instances (chạy ứng dụng)
      autorestart: true, // Tự động khởi động lại khi có lỗi
      watch: false, // Theo dõi thay đổi tệp và tự động khởi động lại
      max_memory_restart: '1G', // Số lượng memory tối đa để khởi động lại ứng dụng
    },
  ],
};
