# MongoDB Setup & Connection Guide

## 📋 Prerequisites

You already have MongoDB installed on your system. Now let's configure and connect it to your project.

---

## 🔧 Step 1: Configure Environment Variables

### Backend .env File Configuration

1. Navigate to your backend folder:
   ```
   D:\FullStack-Development-Project\backend
   ```

2. Open the `.env` file (already created)

3. The file should contain:
   ```env
   PORT=5000
   MONGO_URI=mongodb://localhost:27017/doubt-solving-portal
   ```

### Understanding the Connection String

- `mongodb://` - MongoDB protocol
- `localhost` - Your local machine
- `27017` - Default MongoDB port
- `doubt-solving-portal` - Your database name (will be created automatically)

### Alternative Connection Strings

If you're using MongoDB Atlas (cloud) instead of local:
```env
MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/doubt-solving-portal
```

If MongoDB is running on a different port:
```env
MONGO_URI=mongodb://localhost:27018/doubt-solving-portal
```

---

## 🚀 Step 2: Start MongoDB Server

### Option A: If MongoDB is Installed as a Windows Service

#### Check if MongoDB Service is Running:

Open **PowerShell** and run:

```powershell
Get-Service MongoDB
```

**Output should show:**
```
Status   Name               DisplayName
------   ----               -----------
Running  MongoDB            MongoDB Server
```

#### If Service is Stopped, Start it:

```powershell
Start-Service MongoDB
```

#### To Stop MongoDB Service (when needed):

```powershell
Stop-Service MongoDB
```

#### To Restart MongoDB Service:

```powershell
Restart-Service MongoDB
```

---

### Option B: If MongoDB is NOT a Service (Manual Start)

#### Find MongoDB Installation Directory:

Typically located at:
```
C:\Program Files\MongoDB\Server\7.0\bin
```
or
```
C:\Program Files\MongoDB\Server\6.0\bin
```

#### Create Data Directory (First Time Only):

```powershell
New-Item -ItemType Directory -Path "C:\data\db" -Force
```

#### Start MongoDB Manually:

```powershell
# Navigate to MongoDB bin folder
cd "C:\Program Files\MongoDB\Server\7.0\bin"

# Start MongoDB server
.\mongod.exe --dbpath "C:\data\db"
```

**Keep this terminal window open** while using the application.

---

## 🔍 Step 3: Verify MongoDB Connection

### Method 1: Using MongoDB Shell (mongosh)

Open a **new PowerShell window** and run:

```powershell
mongosh
```

**You should see:**
```
Current Mongosh Log ID: xxxxxxxxxxxxx
Connecting to: mongodb://127.0.0.1:27017/?directConnection=true
Using MongoDB: 7.x.x
Using Mongosh: 2.x.x
```

#### Basic MongoDB Shell Commands:

```javascript
// Show all databases
show dbs

// Switch to your project database
use doubt-solving-portal

// Show collections (tables)
show collections

// View all questions
db.questions.find()

// View all questions (pretty format)
db.questions.find().pretty()

// View all answers
db.answers.find()

// Count questions
db.questions.countDocuments()

// Find questions by subject
db.questions.find({ subject: "Math" })

// Delete all questions (careful!)
db.questions.deleteMany({})

// Exit MongoDB shell
exit
```

---

### Method 2: Using MongoDB Compass (GUI - Recommended for Beginners)

#### Open MongoDB Compass:

1. Search for **MongoDB Compass** in Windows Start Menu
2. Open the application

#### Connect to Database:

1. You'll see a connection screen
2. **Connection String:** Enter `mongodb://localhost:27017`
3. Click **Connect**

#### Browse Your Data:

1. After connecting, you'll see the left sidebar with databases
2. Look for `doubt-solving-portal` database (will appear after you post your first question)
3. Click on it to expand
4. You'll see two collections:
   - `questions`
   - `answers`
5. Click on any collection to view, edit, or delete documents

---

## 🎯 Step 4: Start Your Application

### Terminal 1: Start Backend

```powershell
cd D:\FullStack-Development-Project\backend
npm start
```

**Expected Output:**
```
✅ MongoDB connected successfully
🚀 Server is running on port 5000
```

**If you see this, MongoDB is connected successfully!** ✅

---

### Terminal 2: Start Frontend

Open a **new PowerShell terminal**:

```powershell
cd D:\FullStack-Development-Project\frontend
npm run dev
```

**Expected Output:**
```
VITE v7.x.x  ready in xxx ms
➜  Local:   http://localhost:3000/
```

---

## 🧪 Step 5: Test the Connection

### Test by Creating a Question:

1. Open browser: `http://localhost:3000`
2. Click **"Ask Question"** button
3. Fill in the form:
   - **Title:** "Test Question"
   - **Description:** "This is a test"
   - **Subject:** Select any subject
4. Click **"Post Question"**
5. You should be redirected to home page with your question

### Verify in MongoDB Compass:

1. Open MongoDB Compass
2. Refresh the connection
3. Click on `doubt-solving-portal` → `questions`
4. You should see your test question!

### Verify in MongoDB Shell:

```powershell
mongosh
use doubt-solving-portal
db.questions.find().pretty()
```

You should see your question data!

---

## ⚠️ Troubleshooting

### Error: "MongoDB connection error"

**Possible Causes & Solutions:**

#### 1. MongoDB is not running

```powershell
# Check service status
Get-Service MongoDB

# If stopped, start it
Start-Service MongoDB
```

#### 2. Wrong connection string

Check your `backend\.env` file:
```env
MONGO_URI=mongodb://localhost:27017/doubt-solving-portal
```

Make sure:
- No extra spaces
- Correct port (27017 is default)
- No typos

#### 3. Port 27017 is blocked

```powershell
# Check if MongoDB is listening on port 27017
netstat -an | findstr "27017"
```

You should see:
```
TCP    0.0.0.0:27017          0.0.0.0:0              LISTENING
```

#### 4. Firewall blocking MongoDB

Temporarily disable Windows Firewall to test, or add exception for MongoDB.

---

### Error: "mongosh: command not found"

MongoDB Shell might not be in your PATH.

**Solution:** Navigate to MongoDB bin folder:

```powershell
cd "C:\Program Files\MongoDB\Server\7.0\bin"
.\mongosh.exe
```

---

### Error: "Get-Service: Cannot find service MongoDB"

MongoDB is not installed as a Windows Service.

**Solution:** Start MongoDB manually (see Option B above):

```powershell
cd "C:\Program Files\MongoDB\Server\7.0\bin"
.\mongod.exe --dbpath "C:\data\db"
```

---

## 📊 Useful MongoDB Commands Reference

### Database Operations

```javascript
// List all databases
show dbs

// Switch to database
use doubt-solving-portal

// Drop (delete) database
db.dropDatabase()
```

### Collection Operations

```javascript
// List all collections
show collections

// Get collection stats
db.questions.stats()

// Rename collection
db.questions.renameCollection("newName")

// Drop collection
db.questions.drop()
```

### Query Operations

```javascript
// Find all documents
db.questions.find()

// Find with filter
db.questions.find({ subject: "Math" })

// Find one document
db.questions.findOne()

// Find with sorting (newest first)
db.questions.find().sort({ createdAt: -1 })

// Find with limit
db.questions.find().limit(5)

// Count documents
db.questions.countDocuments()

// Count with filter
db.questions.countDocuments({ subject: "Physics" })
```

### Update Operations

```javascript
// Update one document
db.questions.updateOne(
  { _id: ObjectId("...") },
  { $set: { upvotes: 10 } }
)

// Update many documents
db.questions.updateMany(
  { subject: "Math" },
  { $inc: { upvotes: 1 } }
)

// Increment upvotes
db.questions.updateOne(
  { _id: ObjectId("...") },
  { $inc: { upvotes: 1 } }
)
```

### Delete Operations

```javascript
// Delete one document
db.questions.deleteOne({ _id: ObjectId("...") })

// Delete many documents
db.questions.deleteMany({ subject: "Math" })

// Delete all documents
db.questions.deleteMany({})
```

---

## 🔐 Security Notes (For Production)

If you plan to deploy this application:

1. **Never commit `.env` file** to Git (already in `.gitignore`)
2. **Use strong passwords** for MongoDB Atlas
3. **Enable authentication** on MongoDB:
   ```javascript
   // Create admin user in mongosh
   use admin
   db.createUser({
     user: "admin",
     pwd: "strongPassword123",
     roles: ["root"]
   })
   ```
4. **Update connection string** with credentials:
   ```env
   MONGO_URI=mongodb://admin:strongPassword123@localhost:27017/doubt-solving-portal?authSource=admin
   ```

---

## 📱 MongoDB Compass Features

### 1. Visual Query Builder
- Click on "Filter" field
- Build queries visually
- Example: `{ subject: "Math" }`

### 2. Schema Analysis
- Click on "Schema" tab
- See data types and structure
- View value distributions

### 3. Export/Import Data
- Click on collection
- Click "Collection" menu → "Export Collection"
- Choose format (JSON, CSV)

### 4. Performance Monitoring
- View query execution time
- Check indexes
- Monitor database performance

---

## ✅ Quick Reference Checklist

**Before Starting Your App:**

- [ ] MongoDB service is running (`Get-Service MongoDB`)
- [ ] `.env` file has correct `MONGO_URI`
- [ ] Can connect with `mongosh` or MongoDB Compass
- [ ] Backend folder has `node_modules` installed
- [ ] Frontend folder has `node_modules` installed

**To Start Application:**

1. **Terminal 1:** `cd backend` → `npm start`
2. **Terminal 2:** `cd frontend` → `npm run dev`
3. **Browser:** Open `http://localhost:3000`

**To View Database:**

- **Option 1:** MongoDB Compass → Connect to `mongodb://localhost:27017`
- **Option 2:** PowerShell → `mongosh` → `use doubt-solving-portal` → `db.questions.find()`

---

## 🎓 Additional Resources

- **MongoDB Documentation:** https://docs.mongodb.com/
- **MongoDB Compass Guide:** https://docs.mongodb.com/compass/
- **Mongoose Documentation:** https://mongoosejs.com/docs/
- **MongoDB University (Free Courses):** https://university.mongodb.com/

---

## 📞 Need Help?

If MongoDB is not connecting:

1. Check MongoDB service status
2. Verify `.env` file configuration
3. Check backend terminal for error messages
4. Try connecting with MongoDB Compass
5. Review the troubleshooting section above

---

**Created for QuestionHub Project**
**Date:** October 24, 2025
