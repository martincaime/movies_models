# Movies models

To run the index.js first create a .env file with the following structure

```
DB = 'database'
DB_USER = 'user'
DB_PASSWORD = 'password'
DB_HOST = 'localhost'
DB_NAME = 'database_name'
NODE_ENV = 'development'
DB_PORT = port_number
```

Where the DB is the type of database used (mysql, postgresql...)

In the src is the db connection and the initialization of sequelize.

All the models with their Data Structure are in the models folder inside of src.

The routes available are:

- GET /movies/ : gets all the movies available, accepts the query param title to search for movies with one title or similar.
- GET /movies/movieId: Searchs for one movie based on the id
- POST /movies/: Inserts a movie into the database. The body of the request should look like:
    ```
    {
        "title": "The Lord Of The Rings",
        "year": 2000,
        "casting": ["Frodo Baggins", "Bilbo Baggins"],
        "director": ["Gandalf Gray"],
        "producer": ["Frodo Baggins", "Gandalf Gray"]
    }
    ```
- PUT /movies/movieId: Updates a movie based on the id. The body of the request should look like:
    ```
    {
        "title": "The Lord Of The Rings",
        "year": 2000,
        "casting": ["Gandalf Gray", "Bilbo Baggins"],
        "director": ["Bilbo Baggins"],
        "producer": ["Frodo Baggins", "Gandalf Gray"]
    }
    ```   
- DELETE /movies/movieId: deletes a movie based on the id. 

- GET /people/ : gets all the people available, accepts the query param name and last_name to search for people based on their name.
- GET /people/personId: Searchs for one person based on the id
- POST /people/: Inserts a person into the database. The body of the request should look like:
    ```
    {
        "name": "Frodo",
        "last_name": "Baggins",
        "age": 20,
        "casting": ["The Lord Of The Rings 1", "The Lord Of The Rings 2"],
        "director": [],
        "producer": ["The Lord Of The Rings 1"]
    }
    ```
- PUT /people/personId: Updates a person based on the id. The body of the request should look like:
    ```
    {
        "name": "Frodo",
        "last_name": "Baggins",
        "age": 20,
        "casting": ["Mission Impossible"],
        "director": ["The Lord Of The Rings 2"],
        "producer": ["The Lord Of The Rings 1"]
    }
    ```  
- DELETE /people/personId: deletes a person based on the id.

