USE HoYo_Achievement;

INSERT INTO zzz_user_achievement (user_id, achievement_id, complete)
VALUES
    ('1', '1001001', '1'),
    ('1', '1001002', '1'),
    ('1', '1001003', '1'),
    ('1', '1001008', '1'),
    ('1', '1001007', '1'),
    ('1', '1001010', '1'),
    ('1', '1001014', '1'),
    ('1', '1001011', '1'),
    ('1', '1001012', '1'),
    ('1', '1001013', '1'),
    ('1', '1001015', '1'),
    ('1', '1001016', '1')
    AS new
ON DUPLICATE KEY UPDATE
                     user_id = new.user_id,
                     achievement_id = new.achievement_id,
                     complete = new.complete;