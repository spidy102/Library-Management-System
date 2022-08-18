Prerequisities
- NodeJS installed on your Local machine
- MySql version 8 installed on your local machine
- Run the .sql file available with the project zip.
- Populate the .env file in the root folder with the following credentials
	DB_HOST=<Database Host>
	DB_PORT=<Database Port>
	DB_USER=<Database User>
	DB_PASSWORD=<Database User Password>
	JWT_SECRET=<Random string sequence used for hashing passwords>
- Run the command `npm install` to install project dependencies.
- Run the command `npm run server` in the command line
- Just in case the access to mysql is denied
	-- double check db_password
	-- run `ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY '{your_db_password}';
		flush privileges;`
- Browse to localhost:5000.

--.sql file can be accessed from db folder in the root directory.
