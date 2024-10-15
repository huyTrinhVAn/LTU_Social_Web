# backend/Dockerfile
FROM node:20

# Thiết lập thư mục làm việc
WORKDIR /app/backend

# Sao chép tệp package.json và package-lock.json vào container
COPY package*.json ./

# Cài đặt các phụ thuộc
RUN npm install

# Sao chép toàn bộ mã nguồn vào container
COPY . .

# Chạy ứng dụng
CMD ["node", "server.js"]
