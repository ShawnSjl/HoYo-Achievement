USE HoYo_Achievement;
CREATE TABLE zzz_achievement (
    achievement_id INT NOT NULL,
    class_id INT,
    name VARCHAR(128) NOT NULL,
    description VARCHAR(256) NOT NULL,
    reward_level INT DEFAULT 1,
    hidden INT DEFAULT 0,
    game_version VARCHAR(16) NOT NULL,
    PRIMARY KEY (achievement_id)
);