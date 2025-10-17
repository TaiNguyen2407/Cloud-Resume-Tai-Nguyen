# Cloud Resume — Tai Nguyen

This is my implementation of the **Cloud Resume Challenge**, hosting a resume website on AWS with **real-time visitor tracking** using serverless infrastructure.

⚠️ **Work in progress** — the project is continually being enhanced.

---

## 📋 Project Overview

This project is a portfolio / resume site served as a **static site on S3 + CloudFront**, with a **real-time backend** to track visitors and show presence notifications.  

The architecture now uses **WebSockets** for live updates:

- The frontend is built in React / TypeScript.  
- Static files are deployed to an S3 bucket configured for website hosting.  
- CloudFront provides HTTPS, caching, and global distribution.  
- On page load, the React app connects to a **WebSocket API Gateway**.  
- A **DBUpdater Lambda** handles `$connect` and `$disconnect` events:
  - `$connect` → increments total visitor count in DynamoDB and stores the connection ID.  
  - `$disconnect` → removes the connection ID.  
- A **DBStreamProcessor Lambda** is triggered by DynamoDB Streams on the visitor count table and broadcasts the updated visitor count to all active WebSocket connections.  
- Presence notifications are sent to other active users whenever someone new connects.

Simplified flow:

```
User Browser
↓ (WebSocket connection)
WebSocket API Gateway
↓
DBUpdater Lambda
↓
VisitorCount DynamoDB (increment)
ConnectionIDs DynamoDB (store connection ID)
↓
DBStreamProcessor Lambda (triggered by stream)
↓
WebSocket messages → all connected users
```

---

## 🛠️ Features & Components

- **Static Website Hosting**: React app built and deployed to S3; CloudFront in front.  
- **Real-Time Visitor Counter**: Tracks total visitors and updates all users instantly using WebSockets.  
- **Presence Notifications**: Displays messages like *“Someone else is viewing this with you”* when new users connect.  
- **Infrastructure as Code**: CloudFormation template defines S3 buckets, WebSocket API, Lambda functions, and DynamoDB tables.  
- **React Frontend**: Connects to WebSocket API, displays visitor count, and shows presence notifications.  
- **CI/CD (planned)**: Workflow to auto-deploy frontend and invalidate CloudFront cache on merges to `main`.

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
