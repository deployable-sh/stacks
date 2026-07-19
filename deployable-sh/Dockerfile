FROM node:24-alpine AS build
WORKDIR /site
COPY package.json package-lock.json ./
RUN npm ci
COPY . .
RUN npm run build

FROM nginx:1.27-alpine
RUN apk add --no-cache curl
COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY scripts/submit-indexnow.sh /usr/local/bin/submit-indexnow
RUN chmod +x /usr/local/bin/submit-indexnow
COPY --from=build /site/dist /usr/share/nginx/html
EXPOSE 5000
