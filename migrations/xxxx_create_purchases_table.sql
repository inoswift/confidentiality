CREATE TABLE purchases (
    id SERIAL PRIMARY KEY,
    user_id INT REFERENCES users(id),
    file_id INT REFERENCES files(id),
    status VARCHAR(20) DEFAULT 'Pending',
    expiration_date TIMESTAMPTZ,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_user_id ON purchases(user_id);