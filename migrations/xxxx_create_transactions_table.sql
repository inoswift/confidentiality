CREATE TABLE transactions (
    id SERIAL PRIMARY KEY,
    file_id INT REFERENCES files(id),
    creator_id INT REFERENCES users(id),
    amount DECIMAL(10, 2) NOT NULL,
    folderpal_share DECIMAL(10, 2) NOT NULL,
    creator_share DECIMAL(10, 2) NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_creator_id ON transactions(creator_id);