CREATE TABLE subscriptions (
  user_id INT REFERENCES users(id),
  plan VARCHAR(50),
  status VARCHAR(20) DEFAULT 'Pending',
  subscription_expiry TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE file_access (
  user_id INT REFERENCES users(id),
  file_id INT REFERENCES files(id),
  access_granted TIMESTAMPTZ DEFAULT NOW()
);