FROM node:alpine
WORKDIR /api
COPY . .
RUN npm install
EXPOSE 3000
CMD ["npm","start"]

