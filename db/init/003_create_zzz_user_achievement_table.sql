USE HoYo_Achievement;
CREATE TABLE zzz_user_achievement (
    user_id INT NOT NULL,
    achievement_id INT NOT NULL,
    complete INT default 0,
    PRIMARY KEY (user_id, achievement_id),
    FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE,
    FOREIGN KEY (achievement_id) REFERENCES zzz_achievement(achievement_id) ON DELETE CASCADE
);