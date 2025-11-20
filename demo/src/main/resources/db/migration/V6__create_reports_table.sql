CREATE TABLE IF NOT EXISTS reports (
    id SERIAL PRIMARY KEY,
    post_id INT NOT NULL,
    user_id int not null,
    created_at int,
    content VARCHAR(255),
    CONSTRAINT fk_user
        FOREIGN KEY(user_id)
        REFERENCES users(id)
        ON DELETE CASCADE,
    CONSTRAINT fk_posts
        FOREIGN KEY(post_id)
        REFERENCES posts(id)
        ON DELETE CASCADE
);