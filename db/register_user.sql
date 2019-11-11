INSERT INTO users (username, hash_password, email)
VALUES ($1, $2, $3)
RETURNING *;