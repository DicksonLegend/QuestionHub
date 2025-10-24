# MongoDB Atlas Setup Guide (Cloud Database)

## 📋 Why MongoDB Atlas?

Using MongoDB Atlas (cloud database) means:
- ✅ No local installation needed
- ✅ Easy deployment to production
- ✅ Works from anywhere
- ✅ Free tier available (512MB storage)
- ✅ Automatic backups and monitoring

---

## 🚀 Step 1: Create MongoDB Atlas Account

### 1. Go to MongoDB Atlas

Visit: **https://www.mongodb.com/cloud/atlas/register**

### 2. Sign Up

- Enter your email, first name, last name
- Create a password
- Click **"Get Started Free"**

### 3. Verify Email

- Check your email inbox
- Click the verification link

---

## � Step 2: Create a Database Cluster

### 1. Create New Project (if prompted)

- Project Name: `QuestionHub` or any name you like
- Click **"Next"** → **"Create Project"**

### 2. Build a Database

- Click **"Build a Database"** button
- Select **"M0 FREE"** tier (perfect for development and small apps)
- Choose your cloud provider: **AWS**, **Google Cloud**, or **Azure**
- Choose region closest to you (or where you'll deploy)
- Cluster Name: Leave default or name it `Cluster0`
- Click **"Create"**

### 3. Create Database User

You'll see a "Security Quickstart" screen:

**Authentication Method:** Username and Password

- **Username:** `questionhub_user` (or any username you prefer)
- **Password:** Click "Autogenerate Secure Password" OR create your own
- **IMPORTANT:** Copy and save this password somewhere safe! You'll need it.

Click **"Create User"**

### 4. Add IP Address (Important!)

**For Development:**
- Choose **"My Local Environment"**
- Click **"Add My Current IP Address"**
- OR for testing from anywhere: Add IP `0.0.0.0/0` (allows all IPs - only for development)

**For Production:**
- Add your deployment server's IP address

Click **"Finish and Close"**

---

## 🔗 Step 3: Get Your Connection String

### 1. Click "Connect" Button

On your cluster dashboard, click the **"Connect"** button

### 2. Choose Connection Method

Select **"Connect your application"**

### 3. Copy Connection String

You'll see a connection string like:
```
mongodb+srv://questionhub_user:<password>@cluster0.xxxxx.mongodb.net/?retryWrites=true&w=majority
```

**IMPORTANT:** 
- Replace `<password>` with your actual password (the one you saved earlier)
- Remove `?retryWrites=true&w=majority` part
- Add your database name at the end: `/doubt-solving-portal`

**Final format should look like:**
```
mongodb+srv://questionhub_user:YourPassword123@cluster0.xxxxx.mongodb.net/doubt-solving-portal
```

---

## 🔧 Step 4: Configure Environment Variables

### Update Your Backend .env File

1. Navigate to your backend folder:
   ```
   D:\FullStack-Development-Project\backend
   ```

2. Open the `.env` file

3. **Replace the entire content** with:
   ```env
   PORT=5000
   MONGO_URI=mongodb+srv://your_username:your_password@cluster0.xxxxx.mongodb.net/doubt-solving-portal
   ```

4. **Replace:**
   - `your_username` → Your MongoDB Atlas username
   - `your_password` → Your MongoDB Atlas password
   - `cluster0.xxxxx.mongodb.net` → Your actual cluster URL from Atlas

### Example .env File

```env
PORT=5000
MONGO_URI=mongodb+srv://questionhub_user:MySecurePass123@cluster0.abc123.mongodb.net/doubt-solving-portal
```

### Understanding the Connection String

- `mongodb+srv://` - MongoDB Atlas protocol (with DNS seedlist)
- `questionhub_user` - Your database username
- `MySecurePass123` - Your database password
- `cluster0.abc123.mongodb.net` - Your cluster address
- `/doubt-solving-portal` - Your database name (created automatically)

---

## ✅ Step 5: Verify Connection (Using MongoDB Compass)

### Option 1: MongoDB Atlas Web Interface

1. Go to **https://cloud.mongodb.com/**
2. Log in to your account
3. Click on **"Browse Collections"** button on your cluster
4. You'll see your database after you post your first question

### Option 2: MongoDB Compass (Desktop App)

If you have MongoDB Compass installed:

1. Open MongoDB Compass
2. Paste your full connection string:
   ```
   mongodb+srv://questionhub_user:YourPassword@cluster0.xxxxx.mongodb.net/doubt-solving-portal
   ```
3. Click **"Connect"**
4. Browse your data visually

---

## 🎯 Step 6: Start Your Application

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

**If you see this, MongoDB Atlas is connected successfully!** ✅

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

## 🧪 Step 7: Test the Connection

### Test by Creating a Question:

1. Open browser: `http://localhost:3000`
2. Click **"Ask Question"** button
3. Fill in the form:
   - **Title:** "Test Question"
   - **Description:** "This is a test"
   - **Subject:** Select any subject
4. Click **"Post Question"**
5. You should be redirected to home page with your question

### Verify in MongoDB Atlas Web Interface:

1. Go to **https://cloud.mongodb.com/**
2. Click **"Browse Collections"** on your cluster
3. Select `doubt-solving-portal` database
4. Click on `questions` collection
5. You should see your test question!

### Or Verify in MongoDB Compass:

1. Connect using your Atlas connection string
2. Navigate to `doubt-solving-portal` → `questions`
3. You should see your test question!

---

## ⚠️ Troubleshooting

### Error: "MongoDB connection error" or "Authentication failed"

**Possible Causes & Solutions:**

#### 1. Wrong Password

- Make sure you copied the password correctly
- Check for extra spaces
- If password contains special characters like `@`, `#`, `%`, etc., you need to URL encode them:
  - `@` → `%40`
  - `#` → `%23`
  - `%` → `%25`
  - Example: `Pass@123` → `Pass%40123`

#### 2. Wrong Connection String

Check your `backend\.env` file:
```env
MONGO_URI=mongodb+srv://username:password@cluster0.xxxxx.mongodb.net/doubt-solving-portal
```

Make sure:
- No extra spaces
- Correct username
- Correct password (URL encoded if needed)
- Correct cluster URL
- Database name at the end

#### 3. IP Address Not Whitelisted

- Go to MongoDB Atlas Dashboard
- Click on **"Network Access"** in left sidebar
- Make sure your current IP is listed
- For development, you can add `0.0.0.0/0` (allows all IPs)
- **Important:** For production, only whitelist your server's IP

#### 4. Database User Not Created

- Go to MongoDB Atlas Dashboard
- Click on **"Database Access"** in left sidebar
- Make sure your user exists
- Check if user has "Read and write to any database" permission

#### 5. Cluster is Paused (Free Tier)

Free tier clusters auto-pause after inactivity:
- Go to your cluster dashboard
- If paused, click **"Resume"** button
- Wait a few seconds for it to start

---

## 📊 Managing Your Data in MongoDB Atlas

### Using Atlas Web Interface

1. **View Data:**
   - Go to **https://cloud.mongodb.com/**
   - Click **"Browse Collections"**
   - Navigate through databases and collections
   - View, edit, or delete documents

2. **Search/Filter:**
   - Use the filter box: `{ subject: "Math" }`
   - Click **"Apply"** to filter results

3. **Insert Document:**
   - Click **"Insert Document"**
   - Add fields manually or paste JSON

4. **Delete Data:**
   - Click on a document
   - Click **"Delete"** button

### Using MongoDB Compass (Desktop)

If you prefer a desktop application:

1. Download MongoDB Compass: **https://www.mongodb.com/try/download/compass**
2. Install and open it
3. Paste your Atlas connection string
4. Click **"Connect"**
5. Browse and manage data visually

---

## � Deployment Ready!

### For Production Deployment:

#### 1. Update IP Whitelist

In MongoDB Atlas:
- Go to **"Network Access"**
- Remove `0.0.0.0/0` (if you added it for testing)
- Add your production server's IP address
- For platforms like Vercel, Render, Heroku - they provide IP addresses or you can keep `0.0.0.0/0`

#### 2. Environment Variables in Production

When deploying (Vercel, Render, Netlify, etc.):
- Add `MONGO_URI` as environment variable in your hosting platform
- Use the SAME connection string from your `.env` file
- **Never commit `.env` file** to Git (already in `.gitignore`)

**Example for Vercel:**
```
MONGO_URI=mongodb+srv://questionhub_user:YourPass@cluster0.xxxxx.mongodb.net/doubt-solving-portal
```

**Example for Render:**
```
MONGO_URI=mongodb+srv://questionhub_user:YourPass@cluster0.xxxxx.mongodb.net/doubt-solving-portal
```

#### 3. Database User Permissions

Your current user already has proper permissions. For production, you might want to create a separate user with more restrictive permissions.

---

## 🔐 Security Best Practices

### ✅ Already Implemented:

1. ✅ `.env` file in `.gitignore` (not pushed to Git)
2. ✅ Using MongoDB Atlas (secure by default)
3. ✅ Username/password authentication

### 🎯 For Production:

1. **Use Strong Passwords:**
   - At least 12 characters
   - Mix of letters, numbers, symbols

2. **Restrict IP Access:**
   - Only whitelist necessary IPs
   - Update when deploying to new servers

3. **Environment Variables:**
   - Never hardcode credentials
   - Use hosting platform's environment variables

4. **Regular Backups:**
   - MongoDB Atlas free tier includes automatic backups
   - View in Atlas Dashboard → "Backup" tab

---

## ✅ Quick Setup Checklist

### Initial Setup (One Time):

- [ ] Created MongoDB Atlas account
- [ ] Created free cluster (M0)
- [ ] Created database user with password
- [ ] Added IP address (0.0.0.0/0 for development)
- [ ] Copied connection string
- [ ] Updated `backend/.env` file with Atlas connection string

### Starting Your App (Every Time):

1. **Terminal 1:** `cd backend` → `npm start`
   - Should see: ✅ MongoDB connected successfully
2. **Terminal 2:** `cd frontend` → `npm run dev`
   - Should see: VITE ready
3. **Browser:** Open `http://localhost:3000`

### Viewing Database:

- **Option 1:** MongoDB Atlas Web → **https://cloud.mongodb.com/** → "Browse Collections"
- **Option 2:** MongoDB Compass → Connect with Atlas connection string

---

## 💡 MongoDB Atlas Free Tier Limits

Your free cluster (M0) includes:
- ✅ 512 MB storage (good for ~10,000-50,000 questions)
- ✅ Shared RAM and CPU
- ✅ Automatic backups
- ✅ 3 node replica set
- ✅ Perfect for development and small production apps

When you need more:
- Upgrade to paid tier (starts at $9/month)
- Monitor usage in Atlas Dashboard

---

## 🎓 Additional Resources

- **MongoDB Atlas Documentation:** https://www.mongodb.com/docs/atlas/
- **MongoDB Atlas Tutorial:** https://www.mongodb.com/docs/atlas/getting-started/
- **Mongoose Documentation:** https://mongoosejs.com/docs/
- **MongoDB University (Free Courses):** https://university.mongodb.com/

---

## 📞 Need Help?

If MongoDB Atlas is not connecting:

1. ✅ Check if cluster is running (not paused)
2. ✅ Verify `.env` file has correct connection string
3. ✅ Check IP whitelist in Network Access
4. ✅ Verify database user in Database Access
5. ✅ Look at backend terminal error messages
6. ✅ Test connection in MongoDB Compass

---

## 🎉 Summary

**You're using MongoDB Atlas, which means:**
- ✅ No local installation needed
- ✅ Database works from anywhere
- ✅ Ready for production deployment
- ✅ Just update `.env` and start coding!

**Next Steps:**
1. Create Atlas account → 2. Get connection string → 3. Update `.env` → 4. Start app! 🚀

---

**Created for QuestionHub Project**
**Last Updated:** October 25, 2025
