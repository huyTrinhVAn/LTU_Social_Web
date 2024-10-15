. 
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

You can keep the PORT, NODE_ENV, and MONGO_URI the same, but you need to create the rest on your own. To obtain these three, you need to create your own account on Cloudinary and get the required keys from their website. As for JWT_SECRET, you can create any value you like.<br/>
After setting up the .env file, you can easily run this application by using the following command:
```js
docker-compose up --build.
```

</details>