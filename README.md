# Logistics Flow Optimization and Integration System
A logistics flow optimization and integration system to improve warehouse, production, and raw material order management. The system enhances logistics efficiency by preventing material shortages, reducing production costs, and providing data-driven insights for process optimization.
## Technology Stack
### Backend
![Python](https://img.shields.io/badge/python-3670A0?style=for-the-badge&logo=python&logoColor=ffdd54)
![FastAPI](https://img.shields.io/badge/FastAPI-005571?style=for-the-badge&logo=fastapi)
![Postgres](https://img.shields.io/badge/postgres-%23316192.svg?style=for-the-badge&logo=postgresql&logoColor=white)
![Nginx](https://img.shields.io/badge/nginx-%23009639.svg?style=for-the-badge&logo=nginx&logoColor=white)
![RabbitMQ](https://img.shields.io/badge/Rabbitmq-FF6600?style=for-the-badge&logo=rabbitmq&logoColor=white)
![JWT](https://img.shields.io/badge/JWT-black?style=for-the-badge&logo=JSON%20web%20tokens)
![Docker](https://img.shields.io/badge/docker-%230db7ed.svg?style=for-the-badge&logo=docker&logoColor=white)
![Pandas](https://img.shields.io/badge/pandas-%23150458.svg?style=for-the-badge&logo=pandas&logoColor=white)
![NumPy](https://img.shields.io/badge/numpy-%23013243.svg?style=for-the-badge&logo=numpy&logoColor=white)
### Frontend
![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)
![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/tailwindcss-%2338B2AC.svg?style=for-the-badge&logo=tailwind-css&logoColor=white)
## Features
- Warehouse Management – Material and product CRUD, stock monitoring, automated demand generation, and reservation for production.
- User Management – User CRUD, roles and permissions, and operation history tracking.
- Order Handling – Internal and supplier order management, recurring orders, delivery tracking, and shortage notifications.
- Analytics & Optimization – Logistics performance reports, supply chain optimization, dashboards, and demand forecasting.
- Web Application – Role-based panels for admins, warehouse staff, planners, and logistics managers, with real-time data visualization.

## Architecture
The system is built using a microservices architecture, where each service is responsible for a distinct domain such as warehouse management, user access, ordering, and analytics. Services communicate asynchronously via RabbitMQ, ensuring scalability, fault tolerance, and modular development.
