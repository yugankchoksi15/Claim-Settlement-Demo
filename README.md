::::::::::For Frontent::::::::::

1. Node version required:
20  (nvm use 20 - to set node version to 20)

1. install packages:
npm install

3. in root folder of server create .env file with below shared info

4. to run app in dev env:
npm run dev
default port will be 3000

::::::::::For Backend server:::::::::

1. Node version required:
20  (nvm use 20 - to set node version to 20)

2. install packages:
npm install

3. in root folder of server create .env file with below shared info

4. to run app in dev env:
npm run start



::::::::::For Admin APi (these two are api for admin actions)::::::::::

GET - /claim/approve -- to see the files to be approved/rejected/repaired
PUT - /claim/approve/:id - to change the file status (Approved,Rejected,Repaired)
POST - /user/create - to create admin users who can access the approval apis - to access this api use superadmin credentials (email: superadmin@example.com, password: dt3456mk4m353)
for more api documentation info use swagger doc:

to access swagger doc = <server_url>/api (for local=   http://localhost:<SERVER_PORT>/api)



::::::::::env setup:::::::::::

FE:

NEXT_PUBLIC_API_URL=http://localhost:<SERVER_PORT>


BE:

PORT=5000
JWT_SECRET=jn7567i94tn2yng06456mdew
DB_NAME=claim_settlemant_db
SUPER_ADMIN_EMAIL=superadmin@example.com
SUPER_ADMIN_PASSWORD=dt3456mk4m353
SUPER_ADMIN_FNAME=Super
SUPER_ADMIN_LNAME=Admin