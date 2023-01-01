# Auth Service

This is a auth service that uses JWT to authenticate users.

## How to run

1. Clone the repo
2. Run `npm install`
3. Run `npm run dev`

## How to use

1. Create a user by sending a POST request to `/api/users` with the following body:

```json
{
    "name": "John Doe",
    "username": ""
    "password": "password"
}
```

1. Login by sending a POST request to `/api/auth` with the following body:

```json
{
    "username": ""
    "password": "password"
}
```

1. You will receive a JWT token in the response. Use this token to authenticate your requests by adding it to the `Authorization` header.
