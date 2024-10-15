# Sử dụng Node.js chính thức làm image cơ sở
FROM node:20

# Thiết lập thư mục làm việc
WORKDIR /app

# Sao chép package.json và package-lock.json
COPY package*.json ./

# Cài đặt các dependencies
RUN npm install

# Sao chép toàn bộ mã nguồn vào container
COPY . .

# Chạy ứng dụng với Vite
EXPOSE 3002

# Lệnh để chạy ứng dụng
CMD ["npm", "run", "dev", "--", "--host"]
