# cego-interview
This is my solution for the interview assignment.

## Description:
I have created my solution using Node.js (v.12.18.2) and MySQL (8.0.20).
The solution uses multiple Node.js modules to facilitate the solution, and those are the modules HTTP, MySQL, FS, URL. The MySQL database was set up using the sqldump provided in the interview-assignment repository (https://github.com/cego/interview-assignment).

The application parses the url of a received API call for a SELECT query, which it then executes. The returned data from the SELECT query is then written to a file called result.txt, which is deleted each time the application is run. This is done so old data from previous runs is not confused for data from current runs.

After the data has been written to the file, the query is executed again, albeit slightly modified. The SELECT keyword is replaced with the DELETE keyword, in order to delete the data from the database.

During development, I used Postman to perform API calls to the application, with the intention of testing various queries by altering the url sent to the server. I then used PopSQL to verify that the application performed the action on the database, as intended.

I had problems understanding exactly what is implied with, "verify that data integrity is maintained". As the solution is now, it does not directly verify the integrity of the data written, but should the integrity be compromised I would expect fs.appendFileSync to produce an error. This would of course only be, if it is during the writing process that the data is compromise, and not in a different part of the process.

## Setup:
* Install the newest version for: node, MySQL module, and MySQL
* Create "cego" database on localhost with root password as "password" (can be changed on line 8-11 of server.js)
* Set up the database using the provided sqldump (Command line client or similar)
* Launch server.js via node command in the console

## Use/Test:
* Use API caller (Postman or similar), where url is in the format "localhost:8000/?sql=select+*+from+users" and query spaces are '+' characters.
* Confirm output by using Command line client or similar, and by reading the result.txt file.

## Next steps (security etc.):
The current response is a placeholder, and this would have to be expanded to better communicate what errors occur. As without the console one would not have a chance to notice and diagnose error. 

The application uses HTTP, and so communication between the server and client is not encrypted. This is something that would be necessary when communicating over the web, as it would otherwise expose the database schema as well as users, were they to be implemented.

The application currently does not have any users besides the root, and so the received queries are all executed without question, but this is not how it should be. So creating accounts with more limited authorisation would help keep the database safe from problematic queries.

The application in its current state, can receive any SELECT query in the correct format, but if the format is wrong the solution would not be able to parse the query correctly, which would result in an error. If the query isn't a SELECT query, the DELETE query, which is based on the assumption that the received is a SELECT query, would also result in an error.

For testing, it would be advantageous for the database to be set up each time the application is run. Currently each time the database needs to be restored one has to execute all the queries from the sqldump.
