
# ResQMap – AI-Powered Disaster Response System

![React](https://img.shields.io/badge/React-19-blue)
![Node.js](https://img.shields.io/badge/Node.js-Express-green)
![Firebase](https://img.shields.io/badge/Firebase-Firestore-orange)
![PyTorch](https://img.shields.io/badge/PyTorch-DeepLearning-red)
![DistilBERT](https://img.shields.io/badge/Model-DistilBERT-purple)
![License](https://img.shields.io/badge/License-MIT-lightgrey)
---

## Overview

ResQMap is an AI-powered disaster and incident management platform designed to improve emergency response through real-time reporting, intelligent severity analysis, and efficient coordination between citizens, responders, and administrators.

We developed this system to bridge the gap between incident reporting and actionable emergency response using AI and cloud-based technologies. 

This is a collaborative Final Year Project developed by a team of three Software Engineering students, combining Artificial Intelligence, cloud technologies, and modern web development to support faster, data-driven emergency response.

---

## Objectives

- Enable real-time incident reporting with location and evidence  
- Automate severity analysis using machine learning  
- Provide admin tools for verification and management  
- Support responder assignment and tracking  
- Deliver analytics for decision-making  

---

## System Architecture

```
Citizen App (React Native)
        ↓
Backend API (Node.js + Express)
        ↓
AI Service (FastAPI + DistilBERT)
        ↓
Firestore Database + Firebase Storage
        ↓
Admin Dashboard (React)
``` 

### Flow Explanation:
1. Citizen submits incident  
2. Backend sends data to AI service  
3. AI predicts severity  
4. Data stored in Firestore  
5. Admin verifies and assigns  
6. Responder updates status  
7. Analytics generated for admin  

---

##  User Roles

###  Citizen
- Submit incidents  
- Upload images  
- Provide location  

###  Admin
- Review & verify incidents  
- Override severity  
- Assign responders  
- View analytics dashboard  

###  Responder
- View assigned incidents  
- Update progress (triaged → resolved)  

---

##  Key Features

###  Incident Reporting
- Real-time submission  
- Location-based reporting  
- Image upload support  

###  AI Severity Classification
- DistilBERT model  
- Labels: Low / Medium / High  
- Confidence score  
- Fallback logic  

###  Reports & Analytics
- Status distribution (Bar chart)  
- Severity distribution (Pie chart)  
- Incident trends (Line chart)  
- Responder workload  
- PDF export  

###  Map Integration
- Real-time incident visualization  
- Geo-based tracking  

---

##  Machine Learning

| Component | Details |
|----------|--------|
| Model | DistilBERT |
| Task | Text Classification |
| Dataset | CrisisMMD-derived |
| Output | Severity + Confidence |

### Pipeline

```
Text Input → Tokenizer ([CLS], [SEP])
→ DistilBERT → Logits → Softmax
→ Severity Prediction
``` 

---

##  Database Schema (Incident)

```json
{
  "type": "Fire",
  "description": "Fire in building",
  "latitude": 31.5,
  "longitude": 73.0,
  "severity": "high",
  "status": "pending_review",
  "assignedTo": null,
  "createdAt": "timestamp"
}
```

---

##  API Documentation

###  Incident APIs

| Method | Endpoint | Description |
|------|--------|------------|
| POST | /api/incidents/submit | Submit incident |
| GET | /api/incidents/pending | Get pending |
| GET | /api/incidents/verified | Get verified |
| GET | /api/incidents/assigned | Get assigned |
| PATCH | /api/incidents/:id/review | Verify/Reject |
| PATCH | /api/incidents/:id/assign | Assign responder |

---

###  Reports API

| Method | Endpoint | Description |
|------|--------|------------|
| GET | /api/reports/summary | Analytics data |

---

###  User APIs

| Method | Endpoint | Description |
|------|--------|------------|
| GET | /api/profile/responders | Get responders |

---

##  Technologies Used

### Frontend
- React.js  
- React Native (Expo)  
- Recharts  

### Backend
- Node.js  
- Express.js  

### Database
- Firebase Firestore  

### Storage
- Firebase Storage  

### AI
- FastAPI  
- HuggingFace Transformers  
- DistilBERT  

### Tools
- Axios  
- jsPDF  
- jspdf-autotable  

---

##  Performance Optimizations

We improved performance by:

- Using Firestore aggregation queries (fast counts)  
- Limiting dataset for charts  
- Lazy loading responders  
- Separating AI service  

---

##  Future Enhancements

- Risk prediction overlays  
- Real-time notifications  
- Geo-fencing alerts  
- Live responder tracking  
- Advanced analytics  

---

##  Setup Instructions

### Backend
```bash 
cd backend
npm install
npm run dev
```

### AI Service
```bash 
cd ai-service
pip install -r requirements.txt
uvicorn main:app --reload
```

### Frontend
```bash 
cd frontend
npm install
npm run dev
```

---

## Contributors

- Syeda Zainab Rashid
- Ayesha Naseem  
- Alishba Shabbir  

---

## Conclusion

ResQMap demonstrates how Artificial Intelligence, Natural Language Processing, and modern cloud technologies can be combined to build an intelligent disaster management platform. By transforming real-time incident reports into actionable insights, the system supports faster, more informed emergency response while showcasing the potential of AI to solve meaningful real-world problems.

---
