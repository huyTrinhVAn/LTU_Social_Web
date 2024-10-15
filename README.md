
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

And there will be 4 main routes in this project and I store them inside ```routes``` folder : <br/>

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
<br/>
You can check all these functions in the ```controllers``` folder<br/>
</details>
<details>
<summary>3.API check</summary>

 ### NOTE: Due to the use of JSON Web Tokens (JWT) for security, some routes cannot be accessed using HTTPie. Therefore, I am using Postman instead. As a result, some outcomes may differ, and it will only provide the data. Additionally, I recommend checking all the APIs using Postman, as I used x-www-form-urlencoded. For most routes, I did not specify the attributes in the URL, as they were created through the Postman UI. In conclusion, this section demonstrates that all APIs are working, but if you copy the same URL, it may not work for you 

### Auth API

1. Create account (POST)
```bash
http post http://localhost:5000/api/auth/signup username:"hungzx2345" password="hungzx234" email="hungzx234@gmail.com" fullName="hung van trinh"
{
    "_id": "670e184fcac0287bd4f943f0",
    "fullName": "hung van trinh",
    "username": "hungzx2345",
    "email": "hungzx234@gmail.com",
    "following": [],
    "profileImg": "",
    "coverImg": ""
}
```
2. Login(POST)
```bash
http post http://localhost:5000/api/auth/login username="hungzx2345"  password="hungzx234"
HTTP/1.1 200 OK
Access-Control-Allow-Origin: *
Connection: keep-alive
Content-Length: 161
Content-Type: application/json; charset=utf-8
Date: Tue, 15 Oct 2024 07:26:17 GMT
ETag: W/"a1-j8DqyiK3eal1TfMcf8B131JojfI"
Keep-Alive: timeout=5
Set-Cookie: jwt=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NzBlMTg0ZmNhYzAyODdiZDRmOTQzZjAiLCJpYXQiOjE3Mjg5NzcxNzcsImV4cCI6MTczMDI3MzE3N30.VHIUou9S2I1Mua_9XvR8Y0TDffKuYRIjQ92_MMapXT4; Max-Age=1296000; Path=/; Expires=Wed, 30 Oct 2024 07:26:17 GMT; HttpOnly; SameSite=Strict
X-Powered-By: Express

{
    "_id": "670e184fcac0287bd4f943f0",
    "coverImg": "",
    "email": "hungzx234@gmail.com",
    "following": [],
    "fullName": "hung van trinh",
    "profileImg": "",
    "username": "hungzx2345"
}
```

3. GET me route(GET)

```bash
http get http://localhost:5000/api/auth/me?username=hungzx2345&password=hungzx234
{
    "_id": "670e184fcac0287bd4f943f0",
    "username": "hungzx2345",
    "fullName": "hung van trinh",
    "email": "hungzx234@gmail.com",
    "followers": [],
    "following": [],
    "profileImg": "",
    "coverImg": "",
    "bio": "",
    "link": "",
    "likedPosts": [],
    "createdAt": "2024-10-15T07:22:55.568Z",
    "updatedAt": "2024-10-15T07:22:55.568Z",
    "__v": 0
}
```
4. LOGOUT(POST)

```bash
http post http://localhost:5000/api/auth/logout
HTTP/1.1 200 OK
Access-Control-Allow-Origin: *
Connection: keep-alive
Content-Length: 37
Content-Type: application/json; charset=utf-8
Date: Tue, 15 Oct 2024 07:34:04 GMT
ETag: W/"25-fV84V/Yw+losvSDMtZrH7rujaw4"
Keep-Alive: timeout=5
Set-Cookie: jwt=; Max-Age=0; Path=/; Expires=Tue, 15 Oct 2024 07:34:04 GMT
X-Powered-By: Express

{
    "message": "Logged out seccessfully"
}
```
### USER ROUTE
1. Get user profile(GET)
```bash
http://localhost:5000/api/users/profile/hungzx2345
{
    "_id": "670e184fcac0287bd4f943f0",
    "username": "hungzx2345",
    "fullName": "hung van trinh",
    "email": "hungzx234@gmail.com",
    "followers": [],
    "following": [
        "670dd9700f51606218f68421"
    ],
    "profileImg": "",
    "coverImg": "",
    "bio": "",
    "link": "",
    "likedPosts": [],
    "createdAt": "2024-10-15T07:22:55.568Z",
    "updatedAt": "2024-10-15T07:40:04.674Z",
    "__v": 0
}
```
2. FollowUnfollow (POST)
```bash
http://localhost:5000/api/users/follow/670dd9700f51606218f68421
{
    "message": "User follow successfully"
}
http://localhost:5000/api/users/follow/670dd9700f51606218f68421
{
    "message": "User unfollow successfully"
}
```
3.Get Suggested User (GET)
```bash
http://localhost:5000/api/users/suggested
[
    {
        "_id": "670dd9700f51606218f68421",
        "username": "huydeptrai",
        "fullName": "huy trinh van",
        "password": null,
        "email": "huydeptrai@gmail.com",
        "followers": [],
        "following": [],
        "profileImg": "",
        "coverImg": "",
        "bio": "",
        "link": "",
        "likedPosts": [],
        "createdAt": "2024-10-15T02:54:40.306Z",
        "updatedAt": "2024-10-15T07:46:32.442Z",
        "__v": 0
    }
]
```
4.. Update user profile
```bash
http://localhost:5000/api/users/update
{
    "_id": "670e184fcac0287bd4f943f0",
    "username": "hungzx2345",
    "fullName": "hung hoang trinh",
    "password": null,
    "email": "hungzx234@gmail.com",
    "followers": [],
    "following": [],
    "profileImg": "",
    "coverImg": "",
    "bio": "",
    "link": "",
    "likedPosts": [],
    "createdAt": "2024-10-15T07:22:55.568Z",
    "updatedAt": "2024-10-15T07:51:27.369Z",
    "__v": 0
}
```

### POST API
1. Create Post (POST)
```bash
http://localhost:5000/api/posts/create
{
    "user": "670e184fcac0287bd4f943f0",
    "text": "Hi everyone",
    "likes": [],
    "_id": "670e2041cac0287bd4f94519",
    "comments": [],
    "createdAt": "2024-10-15T07:56:49.505Z",
    "updatedAt": "2024-10-15T07:56:49.505Z",
    "__v": 0
}
```
2. LikeUnLike post (POST)

```bash
http://localhost:5000/api/posts/like/670e2041cac0287bd4f94519
HTTP/1.1 200 OK
[
    "670e184fcac0287bd4f943f0"
]
```
3. Comment on post (POST)
```bash
http://localhost:5000/api/posts/comment/670e2041cac0287bd4f94519
{
    "_id": "670e2041cac0287bd4f94519",
    "user": "670e184fcac0287bd4f943f0",
    "text": "Hi everyone",
    "likes": [
        "670e184fcac0287bd4f943f0"
    ],
    "comments": [
        {
            "text": "nice",
            "user": "670e184fcac0287bd4f943f0",
            "_id": "670e23afcac0287bd4f94523"
        }
    ],
    "createdAt": "2024-10-15T07:56:49.505Z",
    "updatedAt": "2024-10-15T08:11:27.811Z",
    "__v": 2
}
```
4. Get all post (GET)
```bash
http://localhost:5000/api/posts/all
[
    {
        "_id": "670e2041cac0287bd4f94519",
        "user": {
            "_id": "670e184fcac0287bd4f943f0",
            "username": "hungzx2345",
            "fullName": "hung hoang trinh",
            "email": "hungzx234@gmail.com",
            "followers": [
                "670dd9700f51606218f68421"
            ],
            "following": [],
            "profileImg": "",
            "coverImg": "",
            "bio": "",
            "link": "",
            "likedPosts": [
                "670e1f94cac0287bd4f9446e",
                "670e1f54cac0287bd4f94446",
                "670e2041cac0287bd4f94519"
            ],
            "createdAt": "2024-10-15T07:22:55.568Z",
            "updatedAt": "2024-10-15T08:03:33.018Z",
            "__v": 0
        },
        "text": "Hi everyone",
        "likes": [
            "670e184fcac0287bd4f943f0"
        ],
        "comments": [
            {
                "text": "nice",
                "user": {
                    "_id": "670e184fcac0287bd4f943f0",
                    "username": "hungzx2345",
                    "fullName": "hung hoang trinh",
                    "email": "hungzx234@gmail.com",
                    "followers": [
                        "670dd9700f51606218f68421"
                    ],
                    "following": [],
                    "profileImg": "",
                    "coverImg": "",
                    "bio": "",
                    "link": "",
                    "likedPosts": [
                        "670e1f94cac0287bd4f9446e",
                        "670e1f54cac0287bd4f94446",
                        "670e2041cac0287bd4f94519"
                    ],
                    "createdAt": "2024-10-15T07:22:55.568Z",
                    "updatedAt": "2024-10-15T08:03:33.018Z",
                    "__v": 0
                },
                "_id": "670e23afcac0287bd4f94523"
            }
        ],
        "createdAt": "2024-10-15T07:56:49.505Z",
        "updatedAt": "2024-10-15T08:11:27.811Z",
        "__v": 2
    },
    {
        "_id": "670e1f94cac0287bd4f9446e",
        "user": {
            "_id": "670dd9700f51606218f68421",
            "username": "huydeptrai",
            "fullName": "huy trinh van",
            "email": "huydeptrai@gmail.com",
            "followers": [],
            "following": [
                "670e184fcac0287bd4f943f0"
            ],
            "profileImg": "",
            "coverImg": "",
            "bio": "",
            "link": "",
            "likedPosts": [
                "670e1f94cac0287bd4f9446e",
                "670e1f54cac0287bd4f94446"
            ],
            "createdAt": "2024-10-15T02:54:40.306Z",
            "updatedAt": "2024-10-15T07:54:36.449Z",
            "__v": 0
        },
        "text": "Manchester united",
        "img": null,
        "likes": [
            "670dd9700f51606218f68421",
            "670e184fcac0287bd4f943f0"
        ],
        "comments": [],
        "createdAt": "2024-10-15T07:53:56.017Z",
        "updatedAt": "2024-10-15T07:54:08.981Z",
        "__v": 2
    },
    {
        "_id": "670e1f54cac0287bd4f94446",
        "user": {
            "_id": "670e184fcac0287bd4f943f0",
            "username": "hungzx2345",
            "fullName": "hung hoang trinh",
            "email": "hungzx234@gmail.com",
            "followers": [
                "670dd9700f51606218f68421"
            ],
            "following": [],
            "profileImg": "",
            "coverImg": "",
            "bio": "",
            "link": "",
            "likedPosts": [
                "670e1f94cac0287bd4f9446e",
                "670e1f54cac0287bd4f94446",
                "670e2041cac0287bd4f94519"
            ],
            "createdAt": "2024-10-15T07:22:55.568Z",
            "updatedAt": "2024-10-15T08:03:33.018Z",
            "__v": 0
        },
        "text": "LTU uni iz the bezt",
        "img": null,
        "likes": [
            "670dd9700f51606218f68421",
            "670e184fcac0287bd4f943f0"
        ],
        "comments": [],
        "createdAt": "2024-10-15T07:52:52.484Z",
        "updatedAt": "2024-10-15T07:54:09.616Z",
        "__v": 2
    }
]
```
5.Get liked post(GET)
```bash
http://localhost:5000/api/posts/likes/670e184fcac0287bd4f943f0
[
    {
        "_id": "670e1f54cac0287bd4f94446",
        "user": {
            "_id": "670e184fcac0287bd4f943f0",
            "username": "hungzx2345",
            "fullName": "hung hoang trinh",
            "email": "hungzx234@gmail.com",
            "followers": [
                "670dd9700f51606218f68421"
            ],
            "following": [],
            "profileImg": "",
            "coverImg": "",
            "bio": "",
            "link": "",
            "likedPosts": [
                "670e1f94cac0287bd4f9446e",
                "670e1f54cac0287bd4f94446",
                "670e2041cac0287bd4f94519"
            ],
            "createdAt": "2024-10-15T07:22:55.568Z",
            "updatedAt": "2024-10-15T08:03:33.018Z",
            "__v": 0
        },
        "text": "LTU uni iz the bezt",
        "img": null,
        "likes": [
            "670dd9700f51606218f68421",
            "670e184fcac0287bd4f943f0"
        ],
        "comments": [],
        "createdAt": "2024-10-15T07:52:52.484Z",
        "updatedAt": "2024-10-15T07:54:09.616Z",
        "__v": 2
    },
    {
        "_id": "670e1f94cac0287bd4f9446e",
        "user": {
            "_id": "670dd9700f51606218f68421",
            "username": "huydeptrai",
            "fullName": "huy trinh van",
            "email": "huydeptrai@gmail.com",
            "followers": [],
            "following": [
                "670e184fcac0287bd4f943f0"
            ],
            "profileImg": "",
            "coverImg": "",
            "bio": "",
            "link": "",
            "likedPosts": [
                "670e1f94cac0287bd4f9446e",
                "670e1f54cac0287bd4f94446"
            ],
            "createdAt": "2024-10-15T02:54:40.306Z",
            "updatedAt": "2024-10-15T07:54:36.449Z",
            "__v": 0
        },
        "text": "Manchester united",
        "img": null,
        "likes": [
            "670dd9700f51606218f68421",
            "670e184fcac0287bd4f943f0"
        ],
        "comments": [],
        "createdAt": "2024-10-15T07:53:56.017Z",
        "updatedAt": "2024-10-15T07:54:08.981Z",
        "__v": 2
    },
    {
        "_id": "670e2041cac0287bd4f94519",
        "user": {
            "_id": "670e184fcac0287bd4f943f0",
            "username": "hungzx2345",
            "fullName": "hung hoang trinh",
            "email": "hungzx234@gmail.com",
            "followers": [
                "670dd9700f51606218f68421"
            ],
            "following": [],
            "profileImg": "",
            "coverImg": "",
            "bio": "",
            "link": "",
            "likedPosts": [
                "670e1f94cac0287bd4f9446e",
                "670e1f54cac0287bd4f94446",
                "670e2041cac0287bd4f94519"
            ],
            "createdAt": "2024-10-15T07:22:55.568Z",
            "updatedAt": "2024-10-15T08:03:33.018Z",
            "__v": 0
        },
        "text": "Hi everyone",
        "likes": [
            "670e184fcac0287bd4f943f0"
        ],
        "comments": [
            {
                "text": "nice",
                "user": {
                    "_id": "670e184fcac0287bd4f943f0",
                    "username": "hungzx2345",
                    "fullName": "hung hoang trinh",
                    "email": "hungzx234@gmail.com",
                    "followers": [
                        "670dd9700f51606218f68421"
                    ],
                    "following": [],
                    "profileImg": "",
                    "coverImg": "",
                    "bio": "",
                    "link": "",
                    "likedPosts": [
                        "670e1f94cac0287bd4f9446e",
                        "670e1f54cac0287bd4f94446",
                        "670e2041cac0287bd4f94519"
                    ],
                    "createdAt": "2024-10-15T07:22:55.568Z",
                    "updatedAt": "2024-10-15T08:03:33.018Z",
                    "__v": 0
                },
                "_id": "670e23afcac0287bd4f94523"
            }
        ],
        "createdAt": "2024-10-15T07:56:49.505Z",
        "updatedAt": "2024-10-15T08:11:27.811Z",
        "__v": 2
    }
]
```
6. Get following post (GET)
```bash
http://localhost:5000/api/posts/following
[
    {
        "_id": "670e1f94cac0287bd4f9446e",
        "user": {
            "_id": "670dd9700f51606218f68421",
            "username": "huydeptrai",
            "fullName": "huy trinh van",
            "email": "huydeptrai@gmail.com",
            "followers": [
                "670e184fcac0287bd4f943f0"
            ],
            "following": [
                "670e184fcac0287bd4f943f0"
            ],
            "profileImg": "",
            "coverImg": "",
            "bio": "",
            "link": "",
            "likedPosts": [
                "670e1f94cac0287bd4f9446e",
                "670e1f54cac0287bd4f94446"
            ],
            "createdAt": "2024-10-15T02:54:40.306Z",
            "updatedAt": "2024-10-15T08:22:04.969Z",
            "__v": 0
        },
        "text": "Manchester united",
        "img": null,
        "likes": [
            "670dd9700f51606218f68421",
            "670e184fcac0287bd4f943f0"
        ],
        "comments": [],
        "createdAt": "2024-10-15T07:53:56.017Z",
        "updatedAt": "2024-10-15T07:54:08.981Z",
        "__v": 2
    }
]
```
7. Get user posts (GET)
```bash
http://localhost:5000/api/posts/user/hungzx2345
[
    {
        "_id": "670e2041cac0287bd4f94519",
        "user": {
            "_id": "670e184fcac0287bd4f943f0",
            "username": "hungzx2345",
            "fullName": "hung hoang trinh",
            "email": "hungzx234@gmail.com",
            "followers": [
                "670dd9700f51606218f68421"
            ],
            "following": [
                "670dd9700f51606218f68421"
            ],
            "profileImg": "",
            "coverImg": "",
            "bio": "",
            "link": "",
            "likedPosts": [
                "670e1f94cac0287bd4f9446e",
                "670e1f54cac0287bd4f94446",
                "670e2041cac0287bd4f94519"
            ],
            "createdAt": "2024-10-15T07:22:55.568Z",
            "updatedAt": "2024-10-15T08:22:04.971Z",
            "__v": 0
        },
        "text": "Hi everyone",
        "likes": [
            "670e184fcac0287bd4f943f0"
        ],
        "comments": [
            {
                "text": "nice",
                "user": {
                    "_id": "670e184fcac0287bd4f943f0",
                    "username": "hungzx2345",
                    "fullName": "hung hoang trinh",
                    "email": "hungzx234@gmail.com",
                    "followers": [
                        "670dd9700f51606218f68421"
                    ],
                    "following": [
                        "670dd9700f51606218f68421"
                    ],
                    "profileImg": "",
                    "coverImg": "",
                    "bio": "",
                    "link": "",
                    "likedPosts": [
                        "670e1f94cac0287bd4f9446e",
                        "670e1f54cac0287bd4f94446",
                        "670e2041cac0287bd4f94519"
                    ],
                    "createdAt": "2024-10-15T07:22:55.568Z",
                    "updatedAt": "2024-10-15T08:22:04.971Z",
                    "__v": 0
                },
                "_id": "670e23afcac0287bd4f94523"
            }
        ],
        "createdAt": "2024-10-15T07:56:49.505Z",
        "updatedAt": "2024-10-15T08:11:27.811Z",
        "__v": 2
    },
    {
        "_id": "670e1f54cac0287bd4f94446",
        "user": {
            "_id": "670e184fcac0287bd4f943f0",
            "username": "hungzx2345",
            "fullName": "hung hoang trinh",
            "email": "hungzx234@gmail.com",
            "followers": [
                "670dd9700f51606218f68421"
            ],
            "following": [
                "670dd9700f51606218f68421"
            ],
            "profileImg": "",
            "coverImg": "",
            "bio": "",
            "link": "",
            "likedPosts": [
                "670e1f94cac0287bd4f9446e",
                "670e1f54cac0287bd4f94446",
                "670e2041cac0287bd4f94519"
            ],
            "createdAt": "2024-10-15T07:22:55.568Z",
            "updatedAt": "2024-10-15T08:22:04.971Z",
            "__v": 0
        },
        "text": "LTU uni iz the bezt",
        "img": null,
        "likes": [
            "670dd9700f51606218f68421",
            "670e184fcac0287bd4f943f0"
        ],
        "comments": [],
        "createdAt": "2024-10-15T07:52:52.484Z",
        "updatedAt": "2024-10-15T07:54:09.616Z",
        "__v": 2
    }
]
```
8. Delete post(DELETE)
```bash
http://localhost:5000/api/posts/670e1f54cac0287bd4f94446
{
    "message": "Post deleted sucessfully"
}
```
### Notification routes
1. Get all notification (GET)
```bash
http://localhost:5000/api/notifications
[
    {
        "_id": "670e1f96cac0287bd4f9447f",
        "from": {
            "_id": "670dd9700f51606218f68421",
            "username": "huydeptrai",
            "profileImg": ""
        },
        "to": "670e184fcac0287bd4f943f0",
        "type": "like",
        "read": true,
        "createdAt": "2024-10-15T07:53:58.291Z",
        "updatedAt": "2024-10-15T07:54:50.540Z",
        "__v": 0
    },
    {
        "_id": "670e1fa1cac0287bd4f9449e",
        "from": {
            "_id": "670e184fcac0287bd4f943f0",
            "username": "hungzx2345",
            "profileImg": ""
        },
        "to": "670e184fcac0287bd4f943f0",
        "type": "like",
        "read": true,
        "createdAt": "2024-10-15T07:54:09.617Z",
        "updatedAt": "2024-10-15T07:54:50.540Z",
        "__v": 0
    },
    {
        "_id": "670e1fbccac0287bd4f944e3",
        "from": {
            "_id": "670dd9700f51606218f68421",
            "username": "huydeptrai",
            "profileImg": ""
        },
        "to": "670e184fcac0287bd4f943f0",
        "type": "follow",
        "read": true,
        "createdAt": "2024-10-15T07:54:36.450Z",
        "updatedAt": "2024-10-15T07:54:50.540Z",
        "__v": 0
    },
    {
        "_id": "670e21d5cac0287bd4f9451f",
        "from": {
            "_id": "670e184fcac0287bd4f943f0",
            "username": "hungzx2345",
            "profileImg": ""
        },
        "to": "670e184fcac0287bd4f943f0",
        "type": "like",
        "read": false,
        "createdAt": "2024-10-15T08:03:33.022Z",
        "updatedAt": "2024-10-15T08:03:33.022Z",
        "__v": 0
    }
]
```
2. Delete notification (DELETE)
```bash
http://localhost:5000/api/notifications
{
    "message": "Notifications deleted successfully"
}
```
</details>