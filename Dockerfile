FROM node:18-slim
WORKDIR /app
COPY package.json package-lock.json* ./
RUN npm ci --omit=dev \
  && npm audit fix --force \
  && npm cache clean --force
COPY . .
EXPOSE 4000
CMD ["node", "server/index.js"]
