# Cloud Resume — Tai Nguyen

This is my implementation of the **Cloud Resume Challenge**, hosting a resume website on AWS and building a visitor counter using serverless infrastructure.

⚠️ **Work in progress** — the project is unfinished and will be enhanced over time.

---

## 📋 Project Overview

This project is a portfolio / resume site served as a **static site on S3 + CloudFront**, with a backend API to count visitors. Its architecture follows the Cloud Resume Challenge pattern:

- The frontend is built in React / TypeScript.
- The static artifacts are deployed to an S3 bucket configured for website hosting.
- A CloudFront distribution sits in front to provide HTTPS, caching, and global delivery.
- On each visitor’s page load, the React app calls an API Gateway endpoint.
- The API Gateway triggers a Lambda function which reads/writes a visitor count stored in DynamoDB.
- All infrastructure is managed via a CloudFormation template.

In short, the flow is:

```
User Browser
   ↓ (HTTP / HTTPS request)
CloudFront → S3 (serves static files)
   ↓ (React JS executes in browser)
React fetch → API Gateway
   ↓
Lambda function
   ↓
DynamoDB (visitor count)
   ↑
Lambda returns count → API Gateway → React → display
```

Here’s a simplified architecture diagram:

```
[User browser]
     ↓
[CloudFront] → [S3 Static Website]
     ↓
React app fetches → [API Gateway] → [Lambda] → [DynamoDB]
```

---

## 🛠️ Features & Components

- **Static Website Hosting**: React app built and deployed to S3; CloudFront in front for distribution and cache.  
- **Visitor Counter**: A serverless backend (Lambda + API Gateway + DynamoDB) increments and fetches visitor count.  
- **Infrastructure as Code**: A CloudFormation template defines all AWS resources (S3 bucket, bucket policy, CloudFront distribution, DynamoDB table, etc.).  
- **React Frontend**: The UI fetches and shows the visitor count.  
- **CI/CD (future / in progress)**: Workflow to auto-deploy to S3 and invalidate CloudFront on merges to `main`.  

---

## 📁 Repository Structure (partial)

```
.
├── public/
├── src/
├── .github/
│   └── workflows/
│       └── deploy.yml   # CI/CD workflow for frontend
├── s3-cloud-resume-tai-nguyen.yaml   # CloudFormation template
├── package.json
├── tsconfig.json
└── README.md
```

---

## 🚀 Deployment & Usage

1. Build the React app:  
   ```bash
   npm run build
   ```
2. Deploy or sync the build output (`build/`) to the S3 bucket.
3. Invalidate CloudFront cache so that new files propagate immediately.
4. The React app’s fetch logic will call the API Gateway endpoint to retrieve and increment visitor count.
5. The Lambda function handles GET / increments via DynamoDB.

*Note:* The backend Lambda, API Gateway, and DynamoDB pieces are partially scaffolded (or planned) — you may need to add or refine permissions, logic, and deployment for full functionality.

---

## ⚠️ Acknowledgments & Notes

- Most of the **design, layout, and textual content** (like this README and descriptive text) were assisted by AI.  
- However, the **AWS backend infrastructure, CloudFormation template, and deployment logic** have been built by me.  
- This is **not yet a complete / final product**. I plan to continuously improve functionality, UX, error handling, authentication, analytics, and more.

---

## 🧠 Learning Points

- Learned to manage AWS costs effectively — Frequent commits and deployments directly affect monthly billing, especially when using AWS services like S3. While costs remain low under the Free Tier, I became more aware of how expenses could grow afterward, which taught me the importance of cost monitoring and optimization.
- Applied AWS knowledge in a practical project — After earning the AWS Solutions Architect – Associate certification, I wanted hands-on experience with real-world cloud services. This project allowed me to apply that knowledge in practice by building and deploying a full serverless application on AWS.

---

Thank you for visiting this repo! If you spot issues, ideas for improvement, or want to contribute, feel free to open an issue or send a PR.  
