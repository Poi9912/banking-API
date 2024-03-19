FROM node:alpine
WORKDIR /api
COPY . .
RUN apk add openssl
#
#RUN openssl req -x509 -out ./ssl/localhost.crt -keyout ./ssl/localhost.key -newkey rsa:2048 -nodes -sha256 -subj '/CN=localhost' -extensions EXT -config <(printf "[dn]\nCN=localhost\n[req]\ndistinguished_name = dn\n[EXT]\nsubjectAltName=DNS:localhost\nkeyUsage=digitalSignature\nextendedKeyUsage=serverAuth")
#RUN openssl genrsa -out localhost-key.pem 2048
#RUN openssl req -new -x509 -sha256 -key localhost-key.pem -out localhost.pem -days 365 -subj '/CN=localhost' -extensions EXT -config <(printf "[dn]\nCN=localhost\n[req]\ndistinguished_name = dn\n[EXT]\nsubjectAltName=DNS:localhost\nkeyUsage=digitalSignature\nextendedKeyUsage=serverAuth")
RUN npm install
EXPOSE 3000
CMD ["npm","start"]

