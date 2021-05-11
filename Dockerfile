FROM node:alpine as Builder

MAINTAINER TommyLike<tommylikehu@gmail.com>

RUN mkdir -p /home/cla-webui
WORKDIR /home/cla-webui
COPY . /home/cla-webui
RUN npm install -g vue && \
    npm install && \
    npm run build

FROM nginx:1.20.0
COPY --from=Builder /home/cla-webui/dist /usr/share/nginx/html/
COPY ./deploy/default.conf /etc/nginx/conf.d/
RUN chmod -R 755 /usr/share/nginx/html
ENV RUN_USER nginx
ENV RUN_GROUP nginx
EXPOSE 8080
ENTRYPOINT ["nginx", "-g", "daemon off;"]
