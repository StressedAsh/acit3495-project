Here's a **comprehensive README.md** file for your project. It provides an overview, setup instructions, usage guide, and troubleshooting steps.

---

### 📌 **README.md**

````md
# 🚀 User Data Collection & Authentication System

This is a **User Data Collection System** that integrates:

- ✅ **Authentication Service** (User Login & Registration)
- ✅ **Data Service** (Stores User Information)
- ✅ **MongoDB Integration** (For Analytics Storage)
- ✅ **MySQL Database** (User Data Storage)
- ✅ **Dockerized Deployment** (With `docker-compose`)

---

## 📌 **Project Architecture**

The system follows a **microservices** architecture with the following components:

1. **Auth Service (`auth_service`)** - Handles user **registration, login, and logout**.
2. **Data Service (`data_service`)** - Collects and **stores user data in MySQL**.
3. **MongoDB Integration** - Stores **aggregated user analytics**.
4. **Docker Compose** - Manages **containerized services** (MySQL, MongoDB, Backend Services).

---

## 📌 **Tech Stack**

| Component        | Technology Used                            |
| ---------------- | ------------------------------------------ |
| Backend API      | **Flask (Python) & Express.js (Node.js)**  |
| Database         | **MySQL & MongoDB**                        |
| Authentication   | **JWT (JSON Web Tokens)**                  |
| Containerization | **Docker & Docker Compose**                |
| Frontend         | **HTML, CSS (Dark Mode), Jinja Templates** |

---

## 📌 **Setup & Installation**

### **🔹 1. Clone the Repository**

```sh
git clone https://github.com/your-username/your-repo.git
cd your-repo
```
````

### **🔹 2. Start the Services with Docker**

Make sure you have **Docker & Docker Compose** installed.

```sh
docker-compose up --build -d
```

- `-d` runs containers in **detached mode**.
- `--build` ensures all images are rebuilt.

### **🔹 3. Verify Running Containers**

Run:

```sh
docker ps
```

Expected services:

```
CONTAINER ID   IMAGE                   PORTS                     STATUS
xxxxxxxxxx     app-auth_service        0.0.0.0:5001->5001/tcp    Up
xxxxxxxxxx     app-data_service        0.0.0.0:5002->5002/tcp    Up
xxxxxxxxxx     mysql:latest            0.0.0.0:3306->3306/tcp    Up (healthy)
xxxxxxxxxx     mongo:latest            0.0.0.0:27017->27017/tcp  Up (healthy)
```

### **🔹 4. Create the Database & Tables**

Once MySQL is running, **enter the container** and manually create the database.

```sh
docker exec -it mysql_db mysql -u root -p
# Enter password: root

# Run these SQL commands inside MySQL shell:
CREATE DATABASE data_collection;
USE data_collection;

CREATE TABLE IF NOT EXISTS user_data (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    age INT NOT NULL,
    wage FLOAT NOT NULL
);
```

💡 **Optional**: You can automate this in `db.py`.

---

## 📌 **Usage**

### 🔹 **1. Register a New User**

- Visit: [`http://localhost:5001/register`](http://localhost:5001/register)
- Fill in **Username & Password** → Click **Register**
- Redirects to **Login Page**

### 🔹 **2. Login**

- Visit: [`http://localhost:5001/login`](http://localhost:5001/login)
- Enter **Username & Password**
- Redirects to **Data Entry Page**

### 🔹 **3. Enter User Data**

- Visit: [`http://localhost:5002/`](http://localhost:5002/)
- Fill in **Name, Age, Wage** → Click **Save**
- Data gets stored in **MySQL** and displayed **below the form**.

### 🔹 **4. View Saved Data**

- Previously entered data is **shown on the same page** (`data_service`).
- This updates **dynamically**.

### 🔹 **5. Logout**

- Click **Logout** (on `data_service`).
- Redirects back to **Login Page**.

---

## 📌 **Project Structure**

```
/app
│── /auth_service
│   ├── views/                # HTML Pages (Login, Register)
│   ├── routes.js             # Express API Routes
│   ├── server.js             # Server Entry Point
│   ├── package.json          # Node.js Dependencies
│   ├── Dockerfile            # Docker Configuration
│
│── /data_service
│   ├── templates/            # Jinja HTML Templates
│   ├── static/               # CSS Stylesheets
│   ├── app.py                # Flask Backend
│   ├── db.py                 # Database Connection (MySQL & MongoDB)
│   ├── Dockerfile            # Docker Configuration
│
│── docker-compose.yml        # Multi-Service Deployment
│── README.md                 # Documentation
```

---

## 📌 **Environment Variables**

Ensure your `.env` files in **both `auth_service` & `data_service`** contain:

```
DB_HOST=mysql
DB_USER=user
DB_PASSWORD=password
DB_NAME=data_collection
JWT_SECRET=supersecretkey
MONGO_HOST=mongo
MONGO_DB=analytics_results
```

---

## 📌 **API Endpoints**

### **🔹 Auth Service**

| Method | Endpoint         | Description                   |
| ------ | ---------------- | ----------------------------- |
| POST   | `/auth/register` | Registers a new user          |
| POST   | `/auth/login`    | Logs in a user (JWT Token)    |
| GET    | `/auth/logout`   | Logs out user & clears cookie |

### **🔹 Data Service**

| Method | Endpoint     | Description                         |
| ------ | ------------ | ----------------------------------- |
| GET    | `/`          | Displays the user data form         |
| POST   | `/save-data` | Saves user input to MySQL & MongoDB |

---

## 📌 **MongoDB Integration**

💡 **Where is MongoDB used?**

- Instead of storing user analytics in MySQL, we **store analytics data in MongoDB**.
- Each **new entry** gets logged in the collection.

**Example MongoDB Data (Stored in `analytics_results` DB)**

```json
{
  "total_users": 10,
  "avg_age": 25,
  "highest_wage": 75000,
  "lowest_wage": 20000
}
```

---

## 📌 **Troubleshooting**

### **1. Containers Won't Start?**

Run:

```sh
docker-compose up --build
```

- Ensure **MySQL & MongoDB** are running (`docker ps`).
- If MySQL isn’t healthy, restart it:
  ```sh
  docker-compose restart mysql
  ```

### **2. Database Connection Errors?**

- Check **environment variables** inside each service:
  ```sh
  docker exec -it data_service printenv
  ```
- Verify MySQL **has the correct tables**:
  ```sh
  docker exec -it mysql_db mysql -u root -p
  ```

### **3. Forms Not Submitting?**

- Open **Browser Console (`F12`)** → Check for **JavaScript Errors**.
- Ensure API requests are sent to **correct ports (`5001`, `5002`)**.

---

## 📌 **Future Enhancements**

✅ **Add More User Roles (Admin, Guest, etc.)**  
✅ **Improve Frontend UI (Using React or Vue.js)**  
✅ **Expand Analytics (Charts, Graphs, Reports)**  
✅ **Deploy on AWS/GCP (Using Kubernetes or ECS)**

---

## 📌 **Contributing**

## Feel free to fork, improve, and submit PRs!

## 📌 **License**

📝 MIT License. Feel free to modify and use! 🎉

```

---

### 🎯 **What This README Includes**
✅ **Clear Project Overview**
✅ **How to Install & Run** (Step-by-Step)
✅ **Database Setup** (MySQL & MongoDB)
✅ **How to Use the App**
✅ **Troubleshooting Section**
✅ **Future Improvements**

This is **professional, detailed, and ready to use**! 🚀 Let me know if you need changes! 🎉
```
