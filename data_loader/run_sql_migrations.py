import mysql.connector
import os

# 配置数据库连接（可从环境变量读取）
DB_HOST = os.getenv("MYSQL_HOST", "localhost")
DB_PORT = int(os.getenv("MYSQL_PORT", 3306))
DB_USER = os.getenv("MYSQL_USER", "root")
DB_PASSWORD = os.getenv("MYSQL_PASSWORD", "123456")
DB_NAME = os.getenv("MYSQL_DATABASE", "HoYo_Achievement")

SQL_DIR = "../db/data"

# 连接数据库
conn = mysql.connector.connect(
    host=DB_HOST,
    port=DB_PORT,
    user=DB_USER,
    password=DB_PASSWORD,
    database=DB_NAME
)
cursor = conn.cursor()

# 创建一个版本记录表（如果不存在）
cursor.execute("""
    CREATE TABLE IF NOT EXISTS migration_log (
        id INT AUTO_INCREMENT PRIMARY KEY,
        filename VARCHAR(255) NOT NULL UNIQUE,
        executed_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )
""")
conn.commit()

# 获取已执行的文件名集合
cursor.execute("SELECT filename FROM migration_log")
executed_files = {row[0] for row in cursor.fetchall()}

# 执行未执行过的 SQL 文件
for filename in sorted(os.listdir(SQL_DIR)):
    if not filename.endswith(".sql"):
        continue
    if filename in executed_files:
        print(f"✅ 已执行过，跳过: {filename}")
        continue

    file_path = os.path.join(SQL_DIR, filename)
    print(f"🚀 执行中: {filename}...")
    with open(file_path, "r", encoding="utf-8") as f:
        sql = f.read()
        try:
            cursor.execute(sql, multi=True)
            conn.commit()
            cursor.execute("INSERT INTO migration_log (filename) VALUES (%s)", (filename,))
            conn.commit()
            print(f"✅ 执行完成: {filename}")
        except mysql.connector.Error as err:
            print(f"❌ 执行失败: {filename}，错误：{err}")
            conn.rollback()

# 清理
cursor.close()
conn.close()
print("🎉 所有 SQL 执行完毕。")
