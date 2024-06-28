FROM node:18.20.1 as Builder

RUN mkdir -p /home/cla-webui
WORKDIR /home/cla-webui
COPY . /home/cla-webui

RUN npm install
RUN npm run build

FROM nginx:1.19.2
COPY --from=Builder /home/cla-webui/dist /usr/share/nginx/html/
COPY ./deploy/default.conf /etc/nginx/conf.d/
COPY ./deploy/mime.types /etc/nginx/mime.types
RUN chmod -R 755 /usr/share/nginx/html
ENV RUN_USER nginx
ENV RUN_GROUP nginx
EXPOSE 8080
ENTRYPOINT ["nginx", "-g", "daemon off;"]
