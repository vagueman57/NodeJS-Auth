# Node.js Authentication API

A complete authentication and authorization system built with Node.js, Express, MongoDB, and JWT. This API includes user registration, login, password management, role-based access control, and image upload functionality with Cloudinary integration.

## 🌐 Live Demo

API is deployed at: [https://nodejs-auth-8-cen8.onrender.com](https://nodejs-auth-8-cen8.onrender.com)

## ✨ Key Features

- User Authentication: Register, login, and change passwords securely
- Role-based Authorization: User and admin role separation
- JWT Authentication: Secure API endpoints with JSON Web Tokens
- Image Upload: Cloud storage with Cloudinary
- Password Encryption: Secure password storage with bcrypt
- Clean Architecture: MVC pattern with controllers, models, and routes

## 🛠️ Tech Stack

- **Backend**: Node.js with Express
- **Database**: MongoDB with Mongoose
- **Authentication**: JSON Web Tokens (JWT)
- **Password Hashing**: bcrypt
- **File Upload**: Multer
- **Cloud Storage**: Cloudinary
- **Environment Variables**: dotenv

## 📁 Project Structure

```
NodeJS-Auth/
├── config/
│   └── cloudinary.js       # Cloudinary configuration
├── controllers/
│   ├── auth-controller.js  # Authentication logic
│   └── image-controller.js # Image handling logic
├── database/
│   └── db.js               # Database connection
├── helpers/
│   └── cloudinaryHelper.js # Helper functions for Cloudinary
├── middleware/
│   ├── admin-middleware.js # Admin authorization
│   ├── auth-middleware.js  # JWT verification
│   └── upload-middleware.js# File upload handling
├── models/
│   ├── Image.js            # Image schema
│   └── User.js             # User schema
├── routes/
│   ├── admin-routes.js     # Admin endpoints
│   ├── auth-routes.js      # Auth endpoints
│   ├── home-routes.js      # Protected user endpoints
│   └── image-routes.js     # Image upload endpoints
├── uploads/                # Temporary storage for uploads
├── .env                    # Environment variables
├── .gitignore              # Git ignore file
├── package.json            # Project dependencies
└── server.js               # Main application entry
```

## 🚀 API Endpoints

### Authentication Routes
- **POST** `/api/auth/register` - Register a new user
- **POST** `/api/auth/login` - Login and get access token
- **POST** `/api/auth/change-password` - Change password (protected)

### User Routes
- **GET** `/api/home/welcome` - Welcome page for authenticated users

### Admin Routes
- **GET** `/api/admin/welcome` - Welcome page for admin users

### Image Routes
- **POST** `/api/image/upload` - Upload an image (admin only)
- **GET** `/api/image/get` - Get all images (authenticated users)
- **DELETE** `/api/image/:id` - Delete an image (admin only)

## Installation & Setup

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd NodeJS-Auth
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**

   Create a `.env` file in the root directory with the following variables:
   ```
   PORT=3000
   MONGO_URI=your_mongodb_connection_string
   JWT_SECRET_KEY=your_jwt_secret_key
   CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
   CLOUDINARY_API_KEY=your_cloudinary_api_key
   CLOUDINARY_API_SECRET=your_cloudinary_api_secret
   ```

4. **Create uploads directory**
   ```bash
   mkdir uploads
   ```

5. **Run the server**
   ```bash
   # Development
   npm run dev

   # Production
   npm start
   ```

## 🔐 Authentication Flow

### Registration:
- User submits username, email, and password
- Password is hashed using bcrypt
- User is stored in MongoDB

### Login:
- User submits username and password
- System verifies credentials
- JWT token is generated and returned

### Accessing Protected Routes:
- Client includes JWT in Authorization header
- Middleware validates token
- Role-based access control is enforced

## 🧩 Models

### User Model
```js
{
  username: String,    // Unique username
  email: String,       // Unique email address
  password: String,    // Hashed password
  role: String,        // 'user' or 'admin'
  createdAt: Date      // Timestamp
}
```

### Image Model
```js
{
  url: String,         // Cloudinary URL
  publicId: String,    // Cloudinary public ID
  uploadedBy: ObjectId // Reference to User
  createdAt: Date      // Timestamp
}
```

## 📦 Scripts

- `npm start` - Start the production server
- `npm run dev` - Start the development server with nodemon
- `npm run build` - Install dependencies

## 👨‍💻 Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

## 📄 License

ISC