
Van Huy Trinh's shared repository: https://github.com/huyTrinhVAn/LTU_Social_Web
<details>

<summary>1.Instruction</summary>

To run this application , you have to create an ```.env``` file  in ```backend``` folder. This file will be like this:<br/>

```js

MONGO_URI=mongodb://hungzx234:hungzx234@mongodb:27017

PORT = 5000

JWT_SECRET = 
NODE_ENV = development

CLOUDINARY_CLOUD_NAME=
CLOUDINARY_API_KEY=
CLOUDINARY_API_SECRET = 
```

You can keep the PORT, NODE_ENV, and MONGO_URI the same, but you need to create the rest on your own. To obtain these three, you need to create your own account on https://cloudinary.com/  and get the required keys from their website. As for JWT_SECRET, you can create any value you like.<br/>
After setting up the ```.env``` file, you can easily run this application by using the following command:

```js
docker-compose up --build.

```
This is how the container looks like after running the command above<br/>
![alt text](./frontend/public/img/img1T1.png)
You can easily manipulate your database by accessing :

```js 
http://localhost:8081/
``` 
and  basicAuth credentials are "admin:pass" 
</details> 

<details>
<summary>2.Inside the project</summary>

There will be 3 tables in this project which are Notification , Post , User. I define them and their attibute inside the ```models``` folder.<br/>
And this is the summary of these 3 tables:</br>

```js
[User]
  - userId (Primary Key)
  - username
  - fullName
  - email
  - password
  - followers (Array of userId references)
  - following (Array of userId references)
  - likedPosts (Array of postId references)
  - profileImg
  - coverImg
  - bio
  - link

[Post]
  - postId (Primary Key)
  - user (Foreign Key referencing User)
  - text
  - img
  - likes (Array of userId references)
  - comments
    - text
    - user (Foreign Key referencing User)

[Notification]
  - notificationId (Primary Key)
  - from (Foreign Key referencing User)
  - to (Foreign Key referencing User)
  - type (follow, like)
  - read (Boolean)

```

And there wiil be 4 main routes in this project and I store them inside ```routes``` folder : <br/>

```bash
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/posts", postRoutes);
app.use("/api/notifications", notificationRoutes);
```
And this is a list of funcions in this app: <br/>
-   ⚛️ Tech Stack: React.js, MongoDB, Node.js, Express, Tailwind
-   🔐 Authentication with JSONWEBTOKENS (JWT)
-   🔥 React Query for Data Fetching, Caching etc.
-   👥 Suggested Users to Follow
-   ✍️ Creating Posts
-   🗑️ Deleting Posts
-   💬 Commenting on Posts
-   ❤️ Liking Posts
-   🔒 Delete Posts (if you are the owner)
-   📝 Edit Profile Info
-   🖼️ Edit Cover Image and Profile Image
-   📷 Image Uploads using Cloudinary
-   🔔 Send Notifications
You can check all these functions in the ```controllers``` folder<br/>
</details>
<details>
<summary>3.API check</summary>
</details>