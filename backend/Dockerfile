FROM node:15.15.0

# create a directory in the container
RUN mkdir -p /app

COPY package.json /app

# copy all the files to the container
COPY . /app

# set working directory
WORKDIR /app

# install all dependencies
RUN npm install

 
# expose the port to outside world
EXPOSE 3000

# CMD ["npm", "run", "dev"]
CMD ["npm", "start"]