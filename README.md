# React app with Express server

## How to launch the app

How to launch the app client and server side:

### 1. Install dependencies

In the project directory, run:

#### `npm install`
(on the root folder for server dependencies)

#### `cd client`
#### `npm install`
(this travels to the react side of the app, in the "client" folder, and installs its dependencies)

You may need to individually install: "concurrently", "nodemon", "sequelize" and "sequelize-cli". (example: npm install -g sequelize)

### 2. Get the Database ready

Install a mySQL database, easy way (and the one i will explain) would be to install **[XAMPP](https://www.apachefriends.org/es/index.html)**.

Once installed, launch its control panel and click "start" on both apache and mySQL. Make sure mySQL is running on the 3306 port.
This will run the mySQL server, but we need to create the connection our app will use to store the Tables, and the user to create and manage them (we don't want the user root running it for safety purposes).


#### Create Database Connection and New User

With Apache and MySQL running, press "admin" on the mySQL row in XAMPP's control pannel, this will open a tab with database information in a browser.
On the left side of the screen we should see a list of existing database connections and the option to make a new one.

(names will be required to be the same in order to find and log into those connections and users from the server automaticaly, all this can/must be changed in '/config/config.json' to whatever name, password and db name you want or have)
1. Press the "new" option on top of the database conections, asign it the name "aradandb", and "utf8mb4_bin" in the drop down menu next to it, then press "create".
2. Select the newly created database connection "aradandb", this will show it's information and tables (none for now). 
3. On the options bar on top, go to "Privileges".
4. Under the existing users (for now probably just Root users) press "Add user account".
5. On the Add User Form, set the fields username: "aradan" and password: "aradan1234". Make sure the box "Grant all privileges on database aradandb." is checked, and scroll all the way down to press the button "Go" on the bottom left corner or the form. Now the user is created and has access to this database.

(in step 1 we select "utf8mb4_bin" because the other options ended in "ci" stand for case insensitive, and queries in the database with those charsets would result in 'A' and 'a' being seen as the same charater).

The rest of the work is already done by the Server, let's go launch the scripts.

#### Database Migration

The scripts to work the database are run using **"Sequelize"**, this tool gives us and easier time creating Tables from terminal, and as long as we work through it we can all easyly keep the same structure with a couple commands.

To update your Database to the one used in the project open a terminal in the project's root folder and run `sequelize db:migrate`. This will check all migrations that haven't been run and execute them, if the Database is up to date nothing will be run.

##### Now everything's ready, to start the app just run **`npm start`** in your root folder, this will launch the ExpressJS server and the ReactJS client.
"# ReactTest" 
