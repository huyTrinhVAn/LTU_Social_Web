FROM node:20

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

# Build Tailwind CSS trong production
# RUN npm run build:css  # Nếu có script này

EXPOSE 3000

CMD ["npm", "run", "dev"]