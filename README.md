# ☁️ Cloud-Native Image Management Platform

<div align="center">

![Architecture](https://img.shields.io/badge/Architecture-Cloud--Native-blue)
![CI/CD](https://img.shields.io/badge/CI%2FCD-GitHub%20Actions-green)
![Docker](https://img.shields.io/badge/Container-Docker-blue)
![AWS](https://img.shields.io/badge/Cloud-AWS-orange)
![Node.js](https://img.shields.io/badge/Backend-Node.js-brightgreen)
![React](https://img.shields.io/badge/Frontend-React-61dafb)
![LocalStack](https://img.shields.io/badge/Dev-LocalStack-purple)
![Lambda](https://img.shields.io/badge/Serverless-Lambda-orange)

**A production-ready, event-driven image management platform with serverless post-processing, demonstrating modern Cloud, DevOps, and CI/CD best practices.**

[Features](#-features) • [Architecture](#️-architecture) • [Quick Start](#-quick-start) • [Documentation](#-documentation)

</div>

---

## 📋 Table of Contents

- [Overview](#-overview)
- [Features](#-features)
- [Architecture](#️-architecture)
- [Tech Stack](#️-tech-stack)
- [Prerequisites](#-prerequisites)
- [Quick Start](#-quick-start)
- [Local Development](#-local-development)
- [Docker Usage](#-docker-usage)
- [CI/CD Pipeline](#-cicd-pipeline)
- [API Documentation](#-api-documentation)
- [Configuration](#️-configuration)
- [Security](#-security)
- [AWS Free Tier](#-aws-free-tier)
- [Troubleshooting](#-troubleshooting)
- [Production Deployment](#-production-deployment)
- [Testing](#-testing)
- [Contributing](#-contributing)
- [License](#-license)

---

## 🎯 Overview

This platform enables users to upload, manage, and process images through a responsive web interface with serverless post-processing. Images are stored in AWS S3, metadata is managed in DynamoDB, and AWS Lambda handles automatic post-upload operations like thumbnail generation and metadata enrichment. The project showcases professional-grade cloud architecture, event-driven design, DevOps practices, and modern UI/UX suitable for demonstrating skills to potential employers.

**Perfect for:**
- Cloud Engineering portfolios
- DevOps demonstrations
- Full-stack development showcases
- Serverless architecture examples
- Learning modern deployment practices

---

## ✨ Features

### 🎨 Frontend Features
- **📤 Drag & Drop Upload** - Intuitive file upload with drag-and-drop support
- **🖼️ Image Gallery** - Responsive grid and list view modes
- **👁️ Full Image Modal** - Click to view images in full size with smooth animations
- **🔍 Search & Filter** - Search images by date or ID with real-time filtering
- **📊 Sort Options** - Sort by newest or oldest uploads
- **⬇️ Quick Actions** - Download images or copy URLs with one click
- **📱 Responsive Design** - Works perfectly on desktop, tablet, and mobile
- **🎭 Beautiful UI** - Gradient backgrounds, animations, and modern design
- **⌨️ Keyboard Navigation** - Full keyboard support (Esc to close modals)
- **💬 Toast Notifications** - Success/error messages with icons

### ⚙️ Backend Features
- **☁️ AWS S3 Integration** - Secure image storage in the cloud
- **🗄️ DynamoDB Metadata** - Efficient metadata storage and querying
- **⚡ Lambda Post-Processing** - Serverless thumbnail generation and metadata enrichment
- **🎯 Event-Driven Architecture** - S3 events trigger Lambda functions automatically
- **🏠 LocalStack Support** - Local AWS simulation (S3, DynamoDB, Lambda)
- **♻️ Lifecycle Management** - Automatic TTL-based cleanup
- **🔒 Production-Grade Error Handling** - Custom error classes and structured logging
- **🎯 Upload Abstraction** - Service layer for seamless environment switching
- **✅ File Validation** - Type and size checking (5MB limit)
- **🔄 Automatic Initialization** - Startup scripts create resources automatically
- **🔐 IAM Role Simulation** - Lambda execution roles in LocalStack

### 🚀 DevOps Features
- **🐳 Full Containerization** - Docker + Docker Compose orchestration
- **🔄 CI/CD Pipeline** - 8-stage GitHub Actions workflow
- **🔐 Security Scanning** - Trivy vulnerability scanning
- **🧪 Automated Testing** - Unit, integration, and Docker tests
- **📦 Multi-stage Builds** - Optimized Docker images (90% size reduction)
- **🏥 Health Checks** - Container monitoring and auto-restart
- **📊 Structured Logging** - Comprehensive error tracking

---

## 🏗️ Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                     GitHub Actions CI/CD                     │
│  Build → Test → Security Scan → Integration → Deploy        │
└─────────────────────────────────────────────────────────────┘
                              ↓
┌─────────────────────────────────────────────────────────────┐
│                    Docker Container Registry                 │
│            (GitHub Container Registry / Docker Hub)          │
└─────────────────────────────────────────────────────────────┘
                              ↓
┌──────────────┐    ┌──────────────┐    ┌──────────────┐    ┌──────────────┐
│   React      │    │   Node.js    │    │   AWS S3     │    │  DynamoDB    │
│   Frontend   │───→│   Backend    │───→│   Storage    │    │  Metadata    │
│   (Nginx)    │REST│   (Express)  │SDK │   (Images)   │    │  (Lifecycle) │
│   Port 80    │    │   Port 5001  │    │              │    │              │
└──────────────┘    └──────────────┘    └──────┬───────┘    └──────────────┘
       │                    │                    │                    │
       │                    │                    ↓                    │
       │                    │            ┌──────────────┐            │
       │                    │            │ AWS Lambda   │            │
       │                    │            │ Post-Process │←───────────┘
       │                    │            │ (Thumbnail)  │   Event
       │                    │            └──────────────┘   Trigger
       │                    │                    
       │                    └────────────────────┴────────────────────┘
       │                              LocalStack Container
       │                    (S3, DynamoDB, Lambda - Development Only)
       └──────────────────────────────────────────────────────────────┘
                    Docker Network (app-network)
```

### Event-Driven Flow

```
User Upload → Backend API → S3 Upload → S3 Event → Lambda Trigger
                                ↓
                         DynamoDB Metadata
                                ↓
                         Lambda Processing:
                           • Generate Thumbnail
                           • Update Metadata
                           • Store Thumbnail in S3
                                ↓
                         Frontend Displays Updated Gallery
```

### Component Details

#### **Frontend Container**
- **Framework**: React 18 with Hooks
- **Server**: Nginx (Alpine)
- **Features**: Drag & drop, modal viewer, search/filter, responsive design
- **Build**: Multi-stage Docker build with optimized assets

#### **Backend Container**
- **Runtime**: Node.js 18 (Alpine)
- **Framework**: Express.js with middleware
- **AWS SDK**: v3 for modern service interaction
- **Features**: S3 upload abstraction, DynamoDB integration, Lambda invocation, error handling
- **Initialization**: Automatic resource creation on startup

#### **Lambda Functions** (Serverless)
- **Runtime**: Node.js 18
- **Trigger**: S3 event notifications
- **Functions**: 
  - Thumbnail generation from uploaded images
  - Metadata enrichment and updates
  - Automatic DynamoDB writes
- **Execution**: IAM role-based permissions

#### **LocalStack Container** (Development)
- **Services**: S3, DynamoDB, Lambda, IAM simulation
- **Purpose**: Local development without AWS costs
- **Port**: 4566
- **Features**: Event triggers, Lambda execution, IAM roles

#### **Cloud Infrastructure** (Production)
- **Storage**: AWS S3 bucket with event notifications
- **Database**: DynamoDB with TTL for lifecycle management
- **Compute**: AWS Lambda for serverless processing
- **Access**: IAM roles with least privilege
- **Events**: S3 → Lambda event-driven architecture

---

## 🛠️ Tech Stack

### Frontend
| Technology | Purpose | Version |
|------------|---------|---------|
| React | UI framework | 18.2.0 |
| Axios | HTTP client | 1.5.0 |
| CSS3 | Styling with animations | - |
| Nginx | Production web server | Alpine |

### Backend
| Technology | Purpose | Version |
|------------|---------|---------|
| Node.js | JavaScript runtime | 18 LTS |
| Express.js | Web framework | 4.18.2 |
| Multer | File upload handling | 1.4.5 |
| AWS SDK v3 | S3, DynamoDB, Lambda integration | 3.x |
| UUID | Unique ID generation | 9.0.0 |

### Cloud & Serverless
| Technology | Purpose | Version |
|------------|---------|---------|
| AWS S3 | Object storage | - |
| AWS DynamoDB | NoSQL database | - |
| AWS Lambda | Serverless compute | Node.js 18 |
| AWS IAM | Access management | - |
| LocalStack | AWS simulation | Latest |

### DevOps & Infrastructure
| Technology | Purpose | Version |
|------------|---------|---------|
| Docker | Containerization | 20+ |
| Docker Compose | Multi-container orchestration | 2+ |
| GitHub Actions | CI/CD automation | - |
| Trivy | Security scanning | - |

---

## 📋 Prerequisites

Before you begin, ensure you have installed:

- **[Node.js 18+](https://nodejs.org/)** - JavaScript runtime
- **[Docker 20+](https://www.docker.com/get-started)** - Containerization platform
- **[Docker Compose 2+](https://docs.docker.com/compose/install/)** - Multi-container tool
- **[Git](https://git-scm.com/)** - Version control
- **[AWS Account](https://aws.amazon.com/free/)** - Cloud services (Free Tier eligible) *[Optional for production]*

**Optional but recommended:**
- **[AWS CLI](https://aws.amazon.com/cli/)** - AWS command line interface
- **[Postman](https://www.postman.com/)** - API testing tool

---

## 🚀 Quick Start

### Step 1: Clone the Repository

```bash
git clone https://github.com/alveerraa/Cloud-DevOps-Image-Platform.git
cd Cloud-DevOps-Image-Platform
```

### Step 2: Environment Configuration

Create `.env` file in the project root:

```bash
# Copy example file
cp .env.example .env
```

**For Local Development (LocalStack):**
```bash
# .env file contents
USE_LOCALSTACK=true
AWS_ENDPOINT=http://localstack:4566
AWS_ACCESS_KEY_ID=test
AWS_SECRET_ACCESS_KEY=test
AWS_REGION=us-east-1
S3_BUCKET_NAME=image-platform-bucket
DYNAMODB_TABLE_NAME=ImageMetadata
LAMBDA_FUNCTION_NAME=ImageProcessor
LAMBDA_ROLE_ARN=arn:aws:iam::000000000000:role/lambda-execution-role
```

**For Production (Real AWS):**
```bash
# .env file contents
USE_LOCALSTACK=false
AWS_ACCESS_KEY_ID=your_actual_access_key
AWS_SECRET_ACCESS_KEY=your_actual_secret_key
AWS_REGION=us-east-1
S3_BUCKET_NAME=your-unique-bucket-name
DYNAMODB_TABLE_NAME=ImageMetadata
LAMBDA_FUNCTION_NAME=ImageProcessor
LAMBDA_ROLE_ARN=arn:aws:iam::YOUR_ACCOUNT_ID:role/LambdaExecutionRole
```

⚠️ **Security Warning**: Never commit `.env` to Git!

### Step 3: Launch Application

```bash
# Build and start all services
docker-compose up -d --build

# View logs (optional)
docker-compose logs -f

# Check service status
docker-compose ps
```

### Step 4: Access Application

- **Frontend UI**: http://localhost:3000
- **Backend API**: http://localhost:5001
- **LocalStack**: http://localhost:4566 (dev only)

**Health Checks:**
```bash
# Backend health
curl http://localhost:5001/health

# Frontend health
curl http://localhost:3000/health

# LocalStack health
curl http://localhost:4566/_localstack/health
```

---

## 💻 Local Development

If you prefer to run services without Docker:

### Backend Development

```bash
# Navigate to backend
cd backend

# Install dependencies
npm install

# Create environment file
cp .env.example .env
# Edit .env with your configuration

# Run in development mode (with auto-reload)
npm run dev

# Or run in production mode
npm start
```

Backend will run on `http://localhost:5001`

### Frontend Development

```bash
# Navigate to frontend
cd frontend

# Install dependencies
npm install

# Create environment file
cp .env.example .env
# Add: REACT_APP_API_URL=http://localhost:5001

# Start development server
npm start
```

Frontend will run on `http://localhost:3000`

---

## 🐳 Docker Usage

### Essential Commands

```bash
# Build all images
docker-compose build

# Start services in detached mode
docker-compose up -d

# Start services with logs
docker-compose up

# Stop services
docker-compose down

# Stop and remove volumes (clean slate)
docker-compose down -v

# Rebuild and restart
docker-compose up -d --build

# View logs
docker-compose logs

# Follow logs in real-time
docker-compose logs -f

# View specific service logs
docker-compose logs backend
docker-compose logs frontend
docker-compose logs localstack

# Execute command in running container
docker-compose exec backend sh
docker-compose exec frontend sh

# List running containers
docker-compose ps

# Restart specific service
docker-compose restart backend

# Check resource usage
docker stats
```

### Troubleshooting Commands

```bash
# View container health
docker inspect --format='{{.State.Health.Status}}' image-platform-backend

# Remove all stopped containers
docker container prune

# Remove unused images
docker image prune -a

# Full cleanup (use with caution!)
docker system prune -a --volumes
```

---

## 🔄 CI/CD Pipeline

The GitHub Actions workflow automatically runs on every push and pull request.

### Pipeline Stages

```
┌─────────────────────────────────────────────────────────────┐
│                    CI/CD PIPELINE FLOW                       │
└─────────────────────────────────────────────────────────────┘

1️⃣ BUILD & TEST (Parallel)
   ├── Backend Build & Test
   │   ├── Install dependencies
   │   ├── Run unit tests
   │   ├── Build Docker image
   │   └── Test Docker container
   │
   └── Frontend Build & Test
       ├── Install dependencies
       ├── Run unit tests
       ├── Build production bundle
       └── Test Docker container

2️⃣ SECURITY SCAN
   ├── Trivy vulnerability scan (Backend)
   ├── Trivy vulnerability scan (Frontend)
   └── Upload results to GitHub Security

3️⃣ CODE QUALITY
   ├── Dependency audit
   └── Code linting (if configured)

4️⃣ INTEGRATION TEST
   ├── Start all services with Docker Compose
   ├── Wait for health checks
   ├── Test API endpoints
   └── Validate frontend

5️⃣ PUBLISH (main branch only)
   ├── Build optimized images
   ├── Tag with commit SHA
   ├── Push to GitHub Container Registry
   └── Tag as 'latest'

6️⃣ DEPLOY (main branch only)
   ├── Prepare deployment configuration
   ├── Deploy to target environment
   └── Send notifications

7️⃣ NOTIFY
   └── Success/failure notifications
```

### Viewing Pipeline Results

1. Go to your GitHub repository
2. Click **Actions** tab
3. Select a workflow run
4. View detailed logs for each job

---

## 📚 API Documentation

### Base URL
```
http://localhost:5001
```

### Endpoints

#### 1. Health Check
```http
GET /health
```

**Response:**
```json
{
  "status": "healthy",
  "timestamp": "2026-01-06T10:30:00.000Z",
  "service": "image-platform-backend"
}
```

#### 2. Root Information
```http
GET /
```

**Response:**
```json
{
  "message": "Cloud Image Platform API",
  "version": "1.0.0",
  "endpoints": {
    "health": "/health",
    "upload": "POST /api/upload",
    "images": "GET /api/images"
  }
}
```

#### 3. Upload Image
```http
POST /api/upload
Content-Type: multipart/form-data
```

**Request:**
```bash
curl -X POST http://localhost:5001/api/upload \
  -F "image=@/path/to/image.jpg"
```

**Response (Success - 200):**
```json
{
  "message": "Image uploaded successfully",
  "imageUrl": "https://your-bucket.s3.us-east-1.amazonaws.com/images/uuid-12345.jpg",
  "thumbnail": "https://your-bucket.s3.us-east-1.amazonaws.com/thumbnails/uuid-12345.jpg",
  "imageId": "uuid-12345",
  "metadata": {
    "uploadedAt": "2026-01-06T10:30:00.000Z",
    "fileSize": 245678
  }
}
```

**Response (Error - 400):**
```json
{
  "error": "No image file provided"
}
```

**Constraints:**
- File size: Max 5MB
- File type: Images only (image/*)
- Field name: `image`

#### 4. List Images
```http
GET /api/images
```

**Response:**
```json
{
  "count": 3,
  "images": [
    {
      "imageId": "uuid-12345",
      "url": "https://your-bucket.s3.us-east-1.amazonaws.com/images/uuid-12345.jpg",
      "thumbnail": "https://your-bucket.s3.us-east-1.amazonaws.com/thumbnails/uuid-12345.jpg",
      "uploadedAt": "2026-01-06T10:00:00.000Z",
      "expiresAt": "2026-02-05T10:00:00.000Z"
    }
  ]
}
```

### Error Handling

All errors follow this format:
```json
{
  "error": "Error message description",
  "timestamp": "2026-01-06T10:30:00.000Z"
}
```

**Status Codes:**
- `200` - Success
- `400` - Bad Request (invalid input)
- `404` - Not Found
- `500` - Internal Server Error

---

## ⚙️ Configuration

### Environment Variables

#### Backend (`backend/.env`)

| Variable | Description | Required | Default |
|----------|-------------|----------|---------|
| `PORT` | Backend server port | No | `5001` |
| `NODE_ENV` | Environment mode | No | `development` |
| `USE_LOCALSTACK` | Use LocalStack for AWS | No | `false` |
| `AWS_ENDPOINT` | AWS endpoint URL | No | (AWS default) |
| `AWS_ACCESS_KEY_ID` | AWS access key | Yes | - |
| `AWS_SECRET_ACCESS_KEY` | AWS secret key | Yes | - |
| `AWS_REGION` | AWS region | No | `us-east-1` |
| `S3_BUCKET_NAME` | S3 bucket name | Yes | - |
| `DYNAMODB_TABLE_NAME` | DynamoDB table name | Yes | - |
| `LAMBDA_FUNCTION_NAME` | Lambda function name | Yes | - |
| `LAMBDA_ROLE_ARN` | Lambda execution role ARN | Yes | - |
| `FRONTEND_URL` | Frontend URL for CORS | No | `http://localhost:3000` |

#### Frontend (`frontend/.env`)

| Variable | Description | Required | Default |
|----------|-------------|----------|---------|
| `REACT_APP_API_URL` | Backend API URL | No | `http://localhost:5001` |

---

## 🔒 Security

### Implemented Security Measures

✅ **Environment Variables** - No hardcoded credentials  
✅ **File Validation** - Type and size checking  
✅ **CORS Configuration** - Restricted origins  
✅ **Input Sanitization** - Prevents injection attacks  
✅ **Unique Filenames** - UUID prevents collisions  
✅ **Security Headers** - X-Frame-Options, X-Content-Type-Options  
✅ **Container Isolation** - Separate networks and minimal privileges  
✅ **Health Checks** - Automated service monitoring  
✅ **Error Handling** - Production-grade with custom classes  

### Production Security Recommendations

⚠️ **Additional measures for production:**

1. **Authentication & Authorization**
   - Implement JWT or OAuth2
   - Add user registration/login
   - Restrict upload endpoints

2. **AWS Security**
   - Use IAM roles instead of access keys
   - Enable S3 bucket versioning
   - Configure S3 lifecycle policies
   - Enable CloudTrail logging
   - Implement least privilege access

3. **Application Security**
   - Add rate limiting (express-rate-limit)
   - Implement CSRF protection
   - Use HTTPS/TLS certificates
   - Add image malware scanning
   - Implement content moderation

4. **Infrastructure Security**
   - Run containers as non-root user
   - Scan images for vulnerabilities
   - Use secrets management (AWS Secrets Manager)
   - Implement network policies

5. **Monitoring & Logging**
   - Set up CloudWatch alarms
   - Implement structured logging
   - Add error tracking (Sentry, Rollbar)
   - Monitor resource usage

---

## 💰 AWS Free Tier

This project is designed to stay within AWS Free Tier limits.

### Free Tier Limits (First 12 Months)

| Resource | Free Tier Limit | Estimated Usage |
|----------|----------------|-----------------|
| **S3 Storage** | 5 GB | ~1000 images (5MB each) |
| **S3 PUT Requests** | 2,000/month | ~2000 uploads/month |
| **S3 GET Requests** | 20,000/month | ~20000 views/month |
| **Data Transfer Out** | 15 GB/month | Sufficient for moderate use |
| **DynamoDB Storage** | 25 GB | Metadata for millions of images |
| **DynamoDB Reads** | 25 RCU | ~25 reads/second |
| **DynamoDB Writes** | 25 WCU | ~25 writes/second |
| **Lambda Requests** | 1M requests/month | ~1000 uploads/day with processing |
| **Lambda Compute** | 400,000 GB-seconds/month | Generous for image processing |

### Cost Optimization Tips

1. **Use LocalStack for Development**
   - Zero AWS costs during development
   - Unlimited testing without charges

2. **Set Object Expiration**
   - DynamoDB TTL for automatic cleanup
   - S3 lifecycle policies for old objects

3. **Monitor Usage**
   - Enable AWS Billing Alerts
   - Set up CloudWatch metrics
   - Review AWS Cost Explorer monthly

4. **Implement Compression**
   - Compress images before upload
   - Use WebP format for better compression

### Avoiding Unexpected Charges

⚠️ **Important:**
- Use LocalStack for all development/testing
- Delete S3 bucket and DynamoDB table when done
- Monitor billing dashboard regularly
- Set up budget alerts in AWS Console
- Stop all EC2 instances if used

---

## 🐛 Troubleshooting

### Common Issues and Solutions

#### 1. LocalStack Services Not Starting

**Symptoms:**
```
Error: Cannot connect to LocalStack
```

**Solutions:**
- ✅ Check Docker logs: `docker-compose logs localstack`
- ✅ Verify port 4566 isn't in use
- ✅ Ensure Docker has enough memory (2GB+)
- ✅ Try recreating: `docker-compose down -v && docker-compose up -d`
- ✅ Check LocalStack health: `curl http://localhost:4566/_localstack/health`

#### 2. Frontend Can't Reach Backend

**Symptoms:**
```
Network Error / CORS policy blocked
```

**Solutions:**
- ✅ Check `REACT_APP_API_URL` in `frontend/.env`
- ✅ Verify backend is running: `curl http://localhost:5001/health`
- ✅ Check CORS configuration in `backend/src/server.js`
- ✅ Ensure both containers are on same Docker network

**Debug:**
```bash
# Check if backend is accessible
curl http://localhost:5001/health

# Check Docker networks
docker network ls
docker network inspect image-platform-network
```

#### 3. Images Not Displaying

**Symptoms:**
- Images upload successfully but don't show in gallery
- 403 Forbidden errors in browser console

**Solutions:**
- ✅ For LocalStack: Verify services are running
- ✅ For AWS: Check S3 bucket policy allows public read
- ✅ Verify image URLs are accessible in browser
- ✅ Check DynamoDB for metadata entries

#### 4. DynamoDB Writes Fail

**Symptoms:**
```
Error: Failed to save metadata
```

**Solutions:**
- ✅ Check DynamoDB table exists
- ✅ Verify table name in environment variables
- ✅ For LocalStack: Ensure initialization completed
- ✅ Check IAM permissions for production

#### 5. Docker Build Fails

**Symptoms:**
```
ERROR: failed to solve
```

**Solutions:**
- ✅ Clear Docker cache: `docker system prune -a`
- ✅ Check `package.json` syntax
- ✅ Verify Node.js version compatibility
- ✅ Ensure all dependencies are available

**Rebuild from scratch:**
```bash
docker-compose down -v
docker system prune -a
docker-compose up -d --build
```

---

## 🚀 Production Deployment

### Deployment Options

#### Option 1: AWS ECS with LocalStack-Style Setup

**Benefits:** Easy migration from LocalStack

**Steps:**
1. Create S3 bucket and DynamoDB table in AWS
2. Update environment variables
3. Deploy to ECS with Fargate
4. No code changes needed!

#### Option 2: AWS EC2 with Docker Compose

**Steps:**
1. Launch EC2 instance (t2.micro for Free Tier)
2. Install Docker and Docker Compose
3. Clone repository
4. Update `.env` with production values
5. Run `docker-compose up -d`

#### Option 3: Kubernetes (AWS EKS)

**For Advanced Scaling:**
- Multiple replicas for high availability
- Auto-scaling based on traffic
- Load balancing
- Rolling updates

### Pre-Deployment Checklist

- [ ] Environment variables configured for production
- [ ] S3 bucket created and configured
- [ ] DynamoDB table created with TTL enabled
- [ ] IAM roles/users set up with least privilege
- [ ] Domain name registered (if applicable)
- [ ] SSL/TLS certificates obtained
- [ ] Security groups configured
- [ ] Monitoring and logging set up
- [ ] Backup strategy defined
- [ ] CI/CD pipeline tested
- [ ] Documentation updated

---

## 🧪 Testing

### Manual Testing

**1. Upload Test:**
```bash
curl -X POST http://localhost:5001/api/upload \
  -F "image=@test-image.jpg"
```

**2. List Images Test:**
```bash
curl http://localhost:5001/api/images
```

**3. Health Check Test:**
```bash
curl http://localhost:5001/health
curl http://localhost:3000/health
```

### Automated Testing

**Backend Tests:**
```bash
cd backend
npm test
```

**Frontend Tests:**
```bash
cd frontend
npm test
```

**Integration Tests:**
```bash
docker-compose up -d
# Run integration tests
docker-compose down
```

---

## 🤝 Contributing

Contributions are welcome! Here's how you can help:

### Getting Started

1. **Fork the repository**
2. **Clone your fork**
   ```bash
   git clone https://github.com/yourusername/Cloud-DevOps-Image-Platform.git
   ```
3. **Create a branch**
   ```bash
   git checkout -b feature/amazing-feature
   ```
4. **Make your changes**
5. **Test thoroughly**
   ```bash
   docker-compose up -d --build
   # Run tests
   # Verify functionality
   ```
6. **Commit your changes**
   ```bash
   git commit -m 'Add amazing feature'
   ```
7. **Push to your fork**
   ```bash
   git push origin feature/amazing-feature
   ```
8. **Open a Pull Request**

### Contribution Guidelines

- Write clear, descriptive commit messages
- Add tests for new features
- Update documentation as needed
- Follow existing code style
- Ensure all tests pass
- Keep pull requests focused on a single feature/fix

---

## 📄 License

This project is licensed under the **MIT License**.

```
MIT License

Copyright (c) 2026 [Alveera Ahmad]

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
```

---

## 📞 Contact & Support

### Project Maintainer

**Your Name**
- GitHub: [@alveerraa](https://github.com/alveerraa)
- Email: alveerraaa@gmail.com

### Getting Help

- 📖 [Documentation](#-documentation)
- 🐛 [Report Issues](https://github.com/alveerraa/Cloud-DevOps-Image-Platform/issues)
- 💬 [Discussions](https://github.com/alveerraa/Cloud-DevOps-Image-Platform/discussions)
- ⭐ [Star this repo](https://github.com/alveerraa/Cloud-DevOps-Image-Platform)

---

## 🙏 Acknowledgments

- **AWS** - Cloud infrastructure
- **LocalStack** - Local AWS simulation
- **Docker** - Containerization platform
- **React** - Frontend framework
- **Node.js** - Backend runtime
- **GitHub Actions** - CI/CD automation
- **Open Source Community** - Inspiration and tools

---

## 📊 Project Stats

![GitHub Stars](https://img.shields.io/github/stars/alveerraa/Cloud-DevOps-Image-Platform?style=social)
![GitHub Forks](https://img.shields.io/github/forks/alveerraa/Cloud-DevOps-Image-Platform?style=social)
![GitHub Issues](https://img.shields.io/github/issues/alveerraa/Cloud-DevOps-Image-Platform)
![GitHub Pull Requests](https://img.shields.io/github/issues-pr/alveerraa/Cloud-DevOps-Image-Platform)

---

<p align="center">
  <strong>Made with ☁️ and ❤️ for Cloud & DevOps enthusiasts</strong>
  <br>
  <sub>Built to demonstrate production-ready cloud architecture with serverless processing and modern UI/UX</sub>
</p>

<p align="center">
  <a href="#-overview">Back to Top ↑</a>
</p>