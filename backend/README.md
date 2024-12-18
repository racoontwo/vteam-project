# Access the database

In order to get access to the database you need to add a .env file in the root of /backend.
The file should contain the following:

//Connect to MongoDB Atlas
ATLAS_USERNAME="pokr23"
ATLAS_PASSWORD="ZGflIkHYako1vQiZ"

//Used for tests
API_KEY='6b00bafa-4f70-463b-a4c3-1234c317a09f'

# API-keys

- '9d2f30e0-7c3a-471f-9b94-48e8bc743ec9'
- 'f8c43cd9-12e0-42bd-b5ad-d72449e25a4c'
- 'b2165d45-330a-4aa1-86c6-7111973cb64b'
- 'cf14b9e7-c826-4227-97cf-d90eb51a6631'
- '6b00bafa-4f70-463b-a4c3-1234c317a09f'

### Example usage for requests

```
const response = await fetch(
    'http://localhost:5001/api/v1/customers/all-customers',
    {
        method: 'GET',
        headers: {
            'x-api-key': '9d2f30e0-7c3a-471f-9b94-48e8bc743ec9',
            'Content-Type': 'application/json'
        },
    },);
```
