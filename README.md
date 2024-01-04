# Login-Application

## Startup process

create a mongodb account once loggedin create an account
on the top left hand side click on the drop down menu and select new project 
name it something familiar to the application you are creating for instance loginCluster
this cluster will save the login credentials of your users who create an account select next 
now you will create a user to use this cluster and connect to create a username and password 
save them once complete save and continue now its time to connect it go to database and click connect select drivers whithin the drivers tab copy and paste the mongodb+srv connection string and add it to your code 

create folder in visual studio 'Login Application'
open terminal npx create-react app client
create another folder within the Login Application directory name it 'server'
copy the code src within and add it to the client side src code portion
also within the client side open public and edit the index.html
now its time to install the dependencies

right click server and open integrated terminal on the visual studio explorer and within the terminal write these
npm install bcrypt
npm install cors
npm install express
npm install mongoose
npm install socket.io

now to start the application open integrated terminal for server and client within server 
node server.js
within client 
npm start 

your webpage will now open and you will be able to create an account and login once loggedin you can log out
