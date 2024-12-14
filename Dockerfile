# Этап сборки
FROM node:21-alpine
RUN npm install -g vite

# Устанавливаем рабочую директорию
WORKDIR /app

# Копируем package.json и package-lock.json
COPY package*.json ./

# Устанавливаем зависимости, игнорируя необязательные
RUN rm -rf node_modules package-lock.json
RUN npm install --legacy-peer-deps

# Копируем исходный код приложения
COPY . .

# Собираем приложение
RUN npm run build

CMD ["npm", "run", "start", "--", "--host"]