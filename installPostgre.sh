# 1. Update package list
sudo apt update

# 2. Install PostgreSQL
sudo apt install postgresql postgresql-contrib

# 3. Check if it's running
sudo systemctl status postgresql

# 4. Start PostgreSQL if not running
sudo systemctl start postgresql

# 5. Enable PostgreSQL to start on boot
sudo systemctl enable postgresql