-- Run this once in phpMyAdmin (or `mysql -u ... -p u546576758_ggl_india < schema.sql`)
-- against database u546576758_ggl_india.

CREATE TABLE IF NOT EXISTS admin_users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  email VARCHAR(255) NOT NULL UNIQUE,
  password_hash VARCHAR(255) NOT NULL,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Generic per-page content store. content_key examples: home, home-about, about-page,
-- careers, contact, footer, header, global-presence, privacy-policy, terms-of-use,
-- plus "<page>-seo" keys for meta title/description/ogImage.
CREATE TABLE IF NOT EXISTS site_content (
  content_key VARCHAR(64) PRIMARY KEY,
  data LONGTEXT NOT NULL,
  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE IF NOT EXISTS media (
  id INT AUTO_INCREMENT PRIMARY KEY,
  url VARCHAR(500) NOT NULL,
  original_name VARCHAR(255) NOT NULL,
  uploaded_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- The 8 core service pages (Ocean Freight, Air Freight, etc.) and any extra
-- service pages an admin adds beyond those, served by the /services/:slug route.
CREATE TABLE IF NOT EXISTS services (
  id INT AUTO_INCREMENT PRIMARY KEY,
  slug VARCHAR(191) NOT NULL UNIQUE,
  title VARCHAR(255) NOT NULL,
  subtitle TEXT,
  hero_image VARCHAR(500),
  icon_name VARCHAR(100),
  handling_steps LONGTEXT,
  why_choose_us LONGTEXT,
  sort_order INT DEFAULT 99,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Global office network shown on the Global Presence page, sidebar, and footer.
CREATE TABLE IF NOT EXISTS offices (
  id INT AUTO_INCREMENT PRIMARY KEY,
  country_code VARCHAR(8),
  country_name VARCHAR(191) NOT NULL,
  country_lat DECIMAL(9,6),
  country_lng DECIMAL(9,6),
  city_name VARCHAR(191) NOT NULL,
  lat DECIMAL(9,6),
  lng DECIMAL(9,6),
  address TEXT NOT NULL,
  contacts LONGTEXT,
  email VARCHAR(255),
  map_embed_url VARCHAR(1000),
  sort_order INT DEFAULT 99,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Seed admin account: admin@gglindia.com / Gglindia@123
-- (password_hash is a bcrypt hash, generated once — never store plaintext passwords)
INSERT INTO admin_users (email, password_hash)
VALUES ('admin@gglindia.com', '$2b$10$Xha7andF5HOUAyeZcXC8ZOtPSXb9MSQ1WB7l9yr3BaaDr9UZvy4By')
ON DUPLICATE KEY UPDATE password_hash = VALUES(password_hash);
