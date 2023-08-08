FROM node:18.12.1 as Builder

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
RUN touch /var/run/nginx.pid \
    && chown -R nginx:nginx /var/log/nginx \ 
    && chown -R nginx:nginx /var/run/nginx.pid \ 
    && chown -R nginx:nginx /etc/nginx
EXPOSE 8080
USER nginx
ENTRYPOINT ["nginx", "-g", "daemon off;"]
