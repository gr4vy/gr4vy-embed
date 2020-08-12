# Using the latest Node 14
FROM node:14

# Set a working directory to use
WORKDIR /code

# Copy package management files to 
# the working directory
COPY package.json yarn.lock ./

# Install dependencies
RUN yarn install

# Port for Storybook
EXPOSE 6007
# Port for a dev build of the embedded component
EXPOSE 8081

# Start the dev server
CMD yarn dev