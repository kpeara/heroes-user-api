Heroes User API: Docs
=====================

#### To apply add/delete operations and to authenticate users

### Go to API: [http://localhost:3001/api/heroes](http://localhost:3002/api/)

Send **POST** request to **http://localhost:3001/api/user/login** to
login

Send **POST** request to **http://localhost:3001/api/user/register** to
register

Send **DELETE** request to delete a user from the database (NOT
IMPLEMENTED)

Send **PUT** request to reset a users password (NOT IMPLEMENTED)

\

### Request Body:

let user = { name: \"Mario\", password: \"Mushroom\" }
