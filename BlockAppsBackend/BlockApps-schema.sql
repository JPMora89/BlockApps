CREATE TABLE general_treasury (
    treasury_id SERIAL PRIMARY KEY,
    groupcoin_pool DECIMAL NOT NULL,
    exchange_rate DECIMAL NOT NULL
);

CREATE TABLE subsidiaries (
    subsidiary_id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    budget DECIMAL NOT NULL,
    deleted BOOLEAN DEFAULT FALSE -- New column for soft deletion
);

CREATE TABLE transactions (
    transaction_id SERIAL PRIMARY KEY,
    sender_id INT REFERENCES subsidiaries(subsidiary_id),
    receiver_id INT REFERENCES subsidiaries(subsidiary_id),
    amount DECIMAL NOT NULL,
    timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE balances (
    balance_id SERIAL PRIMARY KEY,
    subsidiary_id INT REFERENCES subsidiaries(subsidiary_id) UNIQUE,
    balance DECIMAL NOT NULL
);

CREATE TABLE settlement_transactions (
    settlement_id SERIAL PRIMARY KEY,
    subsidiary_id INT REFERENCES subsidiaries(subsidiary_id),
    amount DECIMAL NOT NULL,
    timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
