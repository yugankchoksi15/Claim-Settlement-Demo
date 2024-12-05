1. Node version required:
20

1. install packages:
npm install

2. to run app in dev env:
npm run start



For Admin APi (these two are api for admin actions):  

GET - /claim/approve -- to see the files to be approved/rejected/repaired
PUT - /claim/approve/:id - to change the file status (Approved,Rejected,Repaired)
for more api documentation info use swagger doc:

to access swagger doc = <server_url>/api (for local=   http://localhost:<SERVER_PORT>/api)