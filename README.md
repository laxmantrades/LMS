
# MERN application (Docker,Kubernetes,Github Actions)
### By the end of this setup, you will have a fully automated, scalable, and secure MERN stack application running on a Kubernetes cluster, accessible through an Ingress controller. GitHub Actions will streamline the process of building and deploying your application, making the development and deployment process more efficient and reliable.

## Prerequisites
- Basic knowledge of Docker, and AWS services.
- An AWS account with necessary permissions.


## Getting Started 
#### Step 1: Create a ‘Dockerfile’ for the Client and Server and k8s_manifests.
```bash
/YourRepo
├── /Client                 # Frontend (React) code
│   ├── Dockerfile          # Dockerfile for the frontend app
│   ├── package.json        # Frontend dependencies
│   ├── package-lock.json   # Frontend lock file
│   └── ...                 # Other frontend app files (src, components, etc.)
├── /Server                 # Backend (Node.js + Express) code
│   ├── Dockerfile          # Dockerfile for the backend app
│   ├── package.json        # Backend dependencies
│   ├── package-lock.json   # Backend lock file
│   └── ...                 # Other backend app files (models, routes, etc.)
└── k8s_manifests/          # Kubernetes manifests (YAML files)
    └── ...                 # Deployment, Service, Ingress YAMLs,etc
````
#

#### Step 2: Now create Dockerfile for Client first(If confused look at the folder structure or go to my current Repo).





```bash

# Step 1: Build Stage
# The first stage is used to build your application. This stage will use the 'node:20' image as the base image.
# We're using multi-stage builds to create a smaller production image later.

FROM node:20 AS build

# Set the working directory for the build stage.
# This means that every subsequent command will run in the '/app' directory inside the container.
WORKDIR /app

# Copy the package.json and package-lock.json files into the container.
# These files contain all the dependencies your application needs to run.
# COPY package*.json ./ will copy both package.json and package-lock.json into the working directory.
COPY package*.json ./

# Install the dependencies listed in package.json inside the container.
# RUN npm install will install all the required dependencies (from package.json) in the container.
RUN npm install

# Copy the rest of your application files into the container.
# This includes all your source code files (like React components, HTML, etc.)
COPY . .

# Run the build command to create a production build of your app.
# We're using Vite to bundle the app into optimized static files (in the 'dist' directory).
# This command prepares the app for deployment, optimizing it for production.
RUN npm run build

# Step 2: Production Stage (final image)
# This is the second stage where we create the final image for production.
# It's a fresh image based on 'node:20' but smaller since we are copying only the built assets from the previous stage.

FROM node:20

# Set the working directory for the production container.
# This is where your app will live in the production environment.
WORKDIR /app

# Install 'serve', a simple static file server that we'll use to serve the built files.
# 'serve' will be used to serve the production build from the 'dist' folder.
RUN npm install -g serve

# Expose port 3000 so that the application will be accessible on that port when running in the container.
EXPOSE 3000

# Copy only the necessary files from the build stage to the production image:
# - The 'dist' folder contains the production build of the app.
# - The 'node_modules' folder contains the installed dependencies.
# - The 'package*.json' files contain the necessary metadata for your app.
COPY --from=build /app/dist /app/dist
COPY --from=build /app/node_modules /app/node_modules
COPY --from=build /app/package*.json /app/

# Set the default command to run when the container starts.
# In this case, it runs the 'serve' command, which will serve the static files (the 'dist' folder).
# '-s' indicates that we're serving the app in "single-page" mode, useful for React apps.
CMD ["serve", "-s", "dist"]

  
```
#
#### Step 3:Create Dockerfile for Backend 


```bash
# Use a minimal and lightweight Node.js image for production
# "alpine" is a small Linux distribution that reduces the size of the final Docker image
FROM node:20-alpine

# Set the working directory inside the container
# This is where all files will be placed and commands will run from
WORKDIR /app

# Copy the package.json and package-lock.json (or yarn.lock) files
# These files contain the dependencies needed for the project
COPY package*.json ./

# Install all dependencies using npm ci (clean install)
# "npm ci" is faster and ensures that the installed dependencies exactly match package-lock.json
RUN npm ci

# Copy all source code files from the current directory on the host to the /app directory in the container
COPY . .



# Set the default command to start the Node.js application
# "server.js" is assumed to be the entry point of your backend application
CMD ["node", "server.js"]

```
#
### We will get back to k8s_manifests later, let's first setup aws instances

# 🌟 Setting Up Your AWS Account! 🚀
##  📝1. Log in to AWS
- Go to the AWS Management Console
- Enter your credentials and sign in to your account
## 🔧 2. Search Ec2 and Launch instances and select Ubuntu and select free-tier(t2/t3)

 <p align="center">
  <img src="https://i.imghippo.com/files/OLA7543Cvw.png" alt="Login" width="500">
</p>

## 🔑 3. Create a New Key Pair

- While launching the instance, create a new key pair for secure SSH access.
- Download the .pem file and keep it safe! You will need it to connect to your instance.

<p align="center">
    <img src="https://i.imghippo.com/files/OLA7543Cvw.png" alt="Login" width="500">
    </p>
  

### 🔗 4. Connect to Your EC2 Instance
- Navigate to EC2 Dashboard → Running Instances.
- Select your instance, then click "Connect".
- Choose the SSH Client option and copy the provided SSH command. 
- Move the LMS.pem file to desktop
- Open terminal on yoour mac
```bash
cd Desktop
```
```bash
chmod 400 LMSapp.pem
```
- Paste the code and press enter 
#### Now you are successfully connected to AWS instances through terminal 

#


# Git clone
### Clone the repository
```bash
git clone https://github.com/laxmantrades/LMS.git
```

- Go to the folder where your env file was in the local for my case:
```bash
cd LMS/Server
```
```bash
 nano .env 
```

### Copy your env files from local to the .env in ubuntu

## Install Docker on ubuntu

```bash
Navigate to root folder eg:ubuntu@ip-172-31-26-237:~$ 
sudo apt-get update
sudo apt install docker.io
```
```bash
sudo chown $USER /var/run/docker.sock
```
- To check docker is working:

```bash
docker ps
```
#

## Build and Run Dockerfile

### Let's build dockerfile for frontend

- Navigate to where the dockerfile is for my case:
```bash
cd LMS/Client
```
```bash
docker build -t lms-frontend
```
- After building to check run the below command and you will see lms-frontend with other files

```bash
docker images 
```
- To run DockerImages
```bash
docker run -d -p 3000:3000 lms-frontend:latest
```
- To check Docker is running
```bash 
docker ps
```


### Let's run the the docker on AWS
- Login to AWS
- Go to instance you have created and click on the instance id 
- Go to the security
- Go to Security Groups and Click on launch wizard
- Click on edit inbound rule
  -Click on add rule and add  

  ```bash
  Type         Port Range     Source 
  CustomTCP     3000           Anywhere-IPv4
 
  ```
 - Go to ec2 Dashboard => Instance Id and you will see Public IPv4 address and open that address
 - Make sure it is http 
```bash
 http://13.49.75.253:3000/
```
- Then you will see your frontend running on the address


## Install AWS CLI 


- Go to AWS and search IAM
- Go to Users=> Create User
- Give name and create User
- Click on attach policies direct
- Mark AdministratorAccess and click on next and create user

### Now a user with a role is created 

- Click on user you have created
- Click on security credentials --> Create Access Key
- Click on CommandLineInterface and ignore other things and create access key (Don't close the tab)
- Now run the follwoing command 




```bash
curl "https://awscli.amazonaws.com/awscli-exe-linux-x86_64.zip" -o "awscliv2.zip"
sudo apt install unzip
unzip awscliv2.zip
sudo ./aws/install -i /usr/local/aws-cli -b /usr/local/bin --update
aws configure
```
- AWS Access kEy: Paste
- AWS Secret KEy: Paste
- Default region name: Press enter
- Default output format: Press enter


## Create Respository on ECR

### ECR for Frontend
- Search ECR and create repository
- Name=lms-frontend and create repository
- After creating click again on the repo you have created (lms-frontend) and there you will see view push command 
- Copy that each code and run one by one(Make sure you are on location where dockerfile is (LMS/Client))
- After pushing the docker file you can see image in lms-frontend

### ECR for Backend
- Search ECR and create repository
- Name=lms-backend and create repository
- After creating click again on the repo you have created (lms-backend) and there you will see view push command 
- Copy that each code and run one by one(Make sure you are on location where dockerfile is (LMS/Server))
- To check docker is running successfully or not:
```bash
  docker ps
```
```bash
  docker logs containerid
```

- After pushing the docker file you can see image in lms-backend



















## Install Kubectl
```bash
curl -o kubectl https://amazon-eks.s3.us-west-2.amazonaws.com/1.19.6/2021-01-05/bin/linux/amd64/kubectl
chmod +x ./kubectl
sudo mv ./kubectl /usr/local/bin
kubectl version --short --client
```

## Install EKSCTL

 ```bash
 curl --silent --location "https://github.com/weaveworks/eksctl/releases/latest/download/eksctl_$(uname -s)_amd64.tar.gz" | tar xz -C /tmp
sudo mv /tmp/eksctl /usr/local/bin
eksctl version
```

## SetUp EKS cluster

- Region should be your region and name should be your cluster name(or lms-cluster) && t2 or t3 based on your region
- It will take 10-15 minutes based on your internet speed!

```bash
eksctl create cluster --name lms-cluster --region eu-north-1 --node-type t3.medium --nodes-min 2 --nodes-max 2
```

```bash
aws eks update-kubeconfig --region eu-north-1 --name lms-cluster
```

```bash
kubectl get nodes
```

## Run Manifests 
```bash
kubectl create namespace workshop

```
- Just replace eu-north-1 with your region leave others as it is
```bash
kubectl create secret docker-registry ecr-registry-secret \
--docker-server=53012.dkr.ecr.eu-north-1.amazonaws.com \
--docker-username=AWS \
--docker-password="$(aws ecr get-login-password --region eu-north-1)" \
--docker-email=youremail@example.com \
-n workshop
```
```bash 
kubectl create secret generic app-secrets \
  --from-env-file=.env \
  -n workshop

```

 
### For Database
- go to where the Database manifests file are
```bash
cd LMS/k8s_manifests/Database
```
```bash
kubectl apply -f secrets.yaml
kubectl apply -f mongo-pv.yaml
kubectl apply -f mongo-pvc.yaml
kubectl apply -f service.yaml
kubectl apply -f deployment.yaml
```
```bash
kubectl get pods -n workshop
```

- After running this code you should see Ready 1/1 


### For Frontend

- go to where the Client manifests file are

- Now you need to change something in frontend-deployment.yaml
- Copy URI from lms-frontend from ECR(If you don't know Go to AWS and Search ECR ) and replace it in image inside frontend-deployment.yaml 
- Change value of REACT_APP_BACKEND_URL with your domain backend 
- After changing the frontend-deployment.yaml  , git pull!




```bash
cd LMS/k8s_manifests/Client
```

```bash

kubectl apply -f frontend-service.yaml
kubectl apply -f frontend-deployment.yaml
```
```bash
kubectl get pods -n workshop
```
- After running this code you should see Ready 1/1 


### For Backend

- go to where the Server manifests file are

- Now you need to change something in backend-deployment.yaml
- Copy URI from lms-backend from ECR(If you don't know Go to AWS and Search ECR ) and replace it in image inside frontend-deployment.yaml 
- Change value of REACT_APP_BACKEND_URL with your domain backend 
- After changing the backend-deployment.yaml  , git pull!
-You can comment the lines or remove from livenessProbe if you don't have a code in server.js or index.js_
```bash
app.get("/api/v1/health",(req,res)=>{
  res.json({
    message:"ok"
  })
})


```
-You should change the database also to 
```bash
value: mongodb://mongodb-svc:27017/LMS?directConnection=true
LMS should be replaced with your collection name 
```




```bash
cd LMS/k8s_manifests/Server
```

```bash

kubectl apply -f backend-service.yaml
kubectl apply -f backend-deployment.yaml
```
```bash
kubectl get pods -n workshop
```
- After running this code you should see Ready 1/1
- To be continued ....
























