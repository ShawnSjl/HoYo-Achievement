USE HoYo_Achievement;

SELECT
    za.achievement_id,
    za.class_id,
    za.name,
    za.description,
    za.reward_level,
    za.hidden,
    za.game_version,
    COALESCE(zua.complete, 0) AS completed
FROM zzz_achievement za
         LEFT JOIN zzz_user_achievement zua
                   ON za.achievement_id = zua.achievement_id
                       AND zua.user_id = 1
WHERE zua.complete IS NULL OR zua.complete = 0
ORDER BY za.achievement_id;

SELECT
    za.achievement_id,
    za.class_id,
    za.name,
    za.description,
    za.reward_level,
    za.hidden,
    za.game_version,
    COALESCE(zua.complete, 0) AS completed
FROM zzz_achievement za
         LEFT JOIN zzz_user_achievement zua
                   ON za.achievement_id = zua.achievement_id
                       AND zua.user_id = 1
WHERE zua.complete = 1
ORDER BY za.achievement_id;

SELECT
    za.achievement_id,
    za.class_id,
    za.name,
    za.description,
    za.reward_level,
    za.hidden,
    za.game_version,
    COALESCE(zua.complete, 0) AS completed
FROM zzz_achievement za
         LEFT JOIN zzz_user_achievement zua
                   ON za.achievement_id = zua.achievement_id
                       AND zua.user_id = ?
ORDER BY za.achievement_id;

INSERT INTO zzz_user_achievement (user_id, achievement_id, complete)
VALUES (?, ?, ?)
    AS new
ON DUPLICATE KEY UPDATE
                     user_id = new.user_id,
                     achievement_id = new.achievement_id,
                     complete = new.complete;