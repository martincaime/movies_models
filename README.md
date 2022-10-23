# Movies models

To run the index.js first create a .env file with the following structure

```
DB = 'database_engine'
DB_USER = 'user'
DB_PASSWORD = 'password'
DB_HOST = 'localhost'
DB_NAME = 'database_name'
NODE_ENV = 'development'
DB_PORT = port_number
```

Where the engine is the type of database used (mysql, postgresql...)

In the src is the db connection and the initialization of sequelize.

All the models with their Data Structure are in the models folder inside of src.