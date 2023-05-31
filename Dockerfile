FROM node 
ARG mongouri
ENV mongouri $mongouri
WORKDIR /app
COPY package.json /app
RUN npm install
COPY . /app
CMD ["npm","start"]
