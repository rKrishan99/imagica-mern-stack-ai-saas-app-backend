# AI-Powered Image Generator Backend

This is a **Node.js & Express** backend for an AI-powered image generation system. It features **user authentication, password reset functionality, and AI image generation** using the Clipdrop API.

## 🚀 Features

- **User Authentication** (JWT-based login & signup)
- **AI Image Generation** (Clipdrop API)
- **Password Reset System** (Email-based recovery)
- **MongoDB Database** (Mongoose ODM)
- **Secure Password Handling** (Bcrypt Hashing)
- **Role-based Access Control**

---
## 📌 Getting Started

### 1️⃣ **Clone the Repository**
```sh
git clone https://github.com/rKrishan99/imagica-mern-stack-ai-saas-app-backend.git

```

### 2️⃣ **Install Dependencies**
```sh
npm install
```

### 3️⃣ **Set Up Environment Variables**
Create a `.env` file in the root directory and add:

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
CLIPDROP_API=your_clipdrop_api_key
EMAIL=your_email@gmail.com
PASSWORD=your_email_password
CLIENT_URL=http://localhost:3000
```

### 4️⃣ **Start the Server**
```sh
npm start
```
> The server runs on `http://localhost:5000`

---
## 🔗 API Endpoints

### 🔐 **User Authentication**
| Endpoint          | Method | Description       |
|------------------|--------|-------------------|
| `/api/users/signup` | POST  | Register a new user |
| `/api/users/login`  | POST  | Authenticate user |

### 🖼 **AI Image Generation**
| Endpoint            | Method | Description                |
|--------------------|--------|----------------------------|
| `/api/image/generate` | POST  | Generate an image (Auth Required) |

### 🔑 **Password Reset**
| Endpoint               | Method | Description                 |
|-----------------------|--------|-----------------------------|
| `/api/reset-password/request-reset` | POST  | Request password reset |
| `/api/reset-password/reset` | POST  | Reset password with token |

---
## 📚 Technologies Used
- **Node.js & Express.js** - Backend Framework
- **MongoDB & Mongoose** - Database
- **JWT (JSON Web Tokens)** - Authentication
- **Bcrypt.js** - Secure Password Hashing
- **Nodemailer** - Email Handling
- **Axios** - API Calls (Clipdrop)

---
## 🔒 Security Best Practices
✅ **Restrict CORS** to trusted domains.
✅ **Use OAuth2** for email authentication (Avoid storing plaintext passwords).
✅ **Implement Rate Limiting** to prevent brute force attacks.
✅ **Store JWTs in HTTP-Only Cookies** to prevent XSS attacks.

---
## 📜 License
This project is licensed under the MIT License.

---
## 🎯 Future Improvements
- ✅ **OAuth Login** (Google, GitHub, etc.)
- ✅ **Payment Integration** (For AI credits)
- ✅ **Two-Factor Authentication (2FA)**

---
### 💡 Need Help?
If you have any questions or issues, feel free to create an issue or reach out!

📩 **Contact:** [rkrishan894@gmail.com]
