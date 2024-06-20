# RentalApp

The app consists of an API and a Web App.

## Requisites
Apache and MySQL are needed as prerequisite.
[Xampp](https://www.apachefriends.org/es/index.html) comes with Apache and MySQL for Windows.
And for Linux there's this option too:
```bash
$ sudo apt-get install apache2
$ sudo apt-get install mysql-server
$ sudo apt-get install phpmyadmin
```
The web-app should be inside /var/www/ folder in Linux. The api can be in any folder it's indifferent  of the place where the code is saved.

## Installation of the api

Use the package manager [npm](https://nodejs.org/es/download/) to install the dependencies for the Api.
Inside the project folder run:

```bash
npm install
```
Start mysql service:
![Start mysql service](https://i.imgur.com/T1adNVS.png)
In Linux:
```bash
sudo /etc/init.d/mysql start
```

Start mysql and apache for:
- The web-app
- To access localhost/phpmyadmin or mysql web GUI
![Apache](https://i.imgur.com/H3r9Glm.png)

Create a DB
```sql
$ mysql -u root -p
$ mysql -u root -p mybd < sql.sql
```
Or by phpmyadmin

![db](https://i.imgur.com/JxMqAyO.png)

Import the DB (The file is in the folder [/sql] inside the project)
![SQL](https://i.imgur.com/CnNKeeJ.png)

## Start the Api

Modify the db connection parameters inside /api/db.js
```node
host: "localhost", // HOST NAME
user: "root", // USER NAME
database: "mydb", // DATABASE NAME
password: "", // DATABASE PASSWORD
```

```node
node /api/index.js
```

## Api Usage
Soon copying all the queries rest for testing the api

## License
[MIT](https://choosealicense.com/licenses/mit/)