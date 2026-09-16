-- ShopWise AI Seed Data
-- Run this AFTER schema.sql

USE shopwise;

-- DUMMY USERS (passwords are bcrypt hash of 'password123')

INSERT INTO users (name, email, password) VALUES
('Rahul Sharma', 'rahul@example.com', '$2a$10$8KzaNdKIMyOkASjkMaCZ7.WT8JGr3sjbXvqKxQIx0YwDM6pCqPjWa'),
('Priya Patel', 'priya@example.com', '$2a$10$8KzaNdKIMyOkASjkMaCZ7.WT8JGr3sjbXvqKxQIx0YwDM6pCqPjWa');

-- LAPTOPS (10 products)
INSERT INTO products (name, category, brand, price, description, specifications, rating, stock, image_url) VALUES

('HP Pavilion 15', 'laptop', 'HP', 55999.00,
 'A reliable everyday laptop with solid performance for programming and multitasking. Features a Full HD IPS display and fast SSD storage.',
 '{"processor": "Intel Core i5-1235U", "ram": "16GB DDR4", "storage": "512GB SSD", "display": "15.6 inch FHD IPS", "graphics": "Intel Iris Xe", "battery": "41Wh", "os": "Windows 11", "weight": "1.75kg"}',
 4.2, 25, 'https://placehold.co/400x300?text=HP+Pavilion+15'),

('Dell Inspiron 15', 'laptop', 'Dell', 62990.00,
 'Well-built laptop with excellent keyboard and strong performance. Great for students and professionals who need a dependable daily driver.',
 '{"processor": "Intel Core i5-1335U", "ram": "16GB DDR5", "storage": "512GB SSD", "display": "15.6 inch FHD", "graphics": "Intel Iris Xe", "battery": "54Wh", "os": "Windows 11", "weight": "1.65kg"}',
 4.3, 18, 'https://placehold.co/400x300?text=Dell+Inspiron+15'),

('Lenovo IdeaPad Slim 5', 'laptop', 'Lenovo', 67499.00,
 'Slim and lightweight laptop with a stunning 2.5K display. Perfect for coding, content consumption, and light creative work.',
 '{"processor": "AMD Ryzen 5 7530U", "ram": "16GB DDR4", "storage": "512GB SSD", "display": "14 inch 2.5K IPS", "graphics": "AMD Radeon Graphics", "battery": "56.5Wh", "os": "Windows 11", "weight": "1.39kg"}',
 4.4, 12, 'https://placehold.co/400x300?text=Lenovo+IdeaPad+Slim+5'),

('ASUS VivoBook 15', 'laptop', 'ASUS', 48999.00,
 'Budget-friendly laptop that punches above its weight. Solid specs for the price with a comfortable keyboard for long coding sessions.',
 '{"processor": "AMD Ryzen 5 5625U", "ram": "8GB DDR4", "storage": "512GB SSD", "display": "15.6 inch FHD", "graphics": "AMD Radeon Graphics", "battery": "42Wh", "os": "Windows 11", "weight": "1.7kg"}',
 4.0, 30, 'https://placehold.co/400x300?text=ASUS+VivoBook+15'),

('Acer Aspire 5', 'laptop', 'Acer', 43999.00,
 'Affordable laptop with decent specs for students. Handles programming, browsing, and office work without breaking a sweat.',
 '{"processor": "Intel Core i5-1235U", "ram": "8GB DDR4", "storage": "512GB SSD", "display": "15.6 inch FHD IPS", "graphics": "Intel Iris Xe", "battery": "50Wh", "os": "Windows 11", "weight": "1.76kg"}',
 3.9, 22, 'https://placehold.co/400x300?text=Acer+Aspire+5'),

('HP Victus 15 Gaming', 'laptop', 'HP', 72990.00,
 'Entry-level gaming laptop that also excels at programming. Dedicated GPU makes it suitable for machine learning experiments.',
 '{"processor": "Intel Core i5-12450H", "ram": "16GB DDR4", "storage": "512GB SSD", "display": "15.6 inch FHD 144Hz", "graphics": "NVIDIA GTX 1650 4GB", "battery": "52.5Wh", "os": "Windows 11", "weight": "2.37kg"}',
 4.1, 15, 'https://placehold.co/400x300?text=HP+Victus+15'),

('Lenovo ThinkPad E14', 'laptop', 'Lenovo', 69999.00,
 'Business-class laptop with legendary ThinkPad keyboard. Built for professionals who type all day — perfect for developers.',
 '{"processor": "Intel Core i5-1335U", "ram": "16GB DDR5", "storage": "512GB SSD", "display": "14 inch FHD IPS", "graphics": "Intel Iris Xe", "battery": "57Wh", "os": "Windows 11", "weight": "1.59kg"}',
 4.5, 10, 'https://placehold.co/400x300?text=Lenovo+ThinkPad+E14'),

('Dell XPS 13', 'laptop', 'Dell', 124990.00,
 'Premium ultrabook with stunning InfinityEdge display. Top-tier build quality and performance for demanding professionals.',
 '{"processor": "Intel Core i7-1360P", "ram": "16GB DDR5", "storage": "512GB SSD", "display": "13.4 inch FHD+ OLED", "graphics": "Intel Iris Xe", "battery": "55Wh", "os": "Windows 11", "weight": "1.17kg"}',
 4.6, 8, 'https://placehold.co/400x300?text=Dell+XPS+13'),

('ASUS ROG Strix G15', 'laptop', 'ASUS', 109990.00,
 'High-performance gaming laptop with powerful GPU. Also excellent for ML/AI development and video editing workloads.',
 '{"processor": "AMD Ryzen 7 6800H", "ram": "16GB DDR5", "storage": "1TB SSD", "display": "15.6 inch FHD 165Hz", "graphics": "NVIDIA RTX 4060 8GB", "battery": "90Wh", "os": "Windows 11", "weight": "2.3kg"}',
 4.5, 6, 'https://placehold.co/400x300?text=ASUS+ROG+Strix+G15'),

('Acer Nitro V 15', 'laptop', 'Acer', 64999.00,
 'Budget gaming laptop with capable specs. Handles most games at medium settings and works well for programming and content creation.',
 '{"processor": "Intel Core i5-13420H", "ram": "16GB DDR5", "storage": "512GB SSD", "display": "15.6 inch FHD 144Hz", "graphics": "NVIDIA RTX 2050 4GB", "battery": "57Wh", "os": "Windows 11", "weight": "2.1kg"}',
 4.0, 20, 'https://placehold.co/400x300?text=Acer+Nitro+V+15');


-- SMARTPHONES (10 products)

INSERT INTO products (name, category, brand, price, description, specifications, rating, stock, image_url) VALUES

('Samsung Galaxy S24', 'smartphone', 'Samsung', 74999.00,
 'Flagship Samsung phone with Galaxy AI features. Excellent camera, display, and performance in a refined design.',
 '{"processor": "Snapdragon 8 Gen 3", "ram": "8GB", "storage": "256GB", "display": "6.2 inch Dynamic AMOLED 2X 120Hz", "camera": "50MP + 12MP + 10MP", "battery": "4000mAh", "os": "Android 14", "5g": "Yes"}',
 4.5, 20, 'https://placehold.co/400x300?text=Samsung+Galaxy+S24'),

('OnePlus 12', 'smartphone', 'OnePlus', 64999.00,
 'Flagship killer with Hasselblad camera system. Blazing fast performance with smooth 120Hz AMOLED display.',
 '{"processor": "Snapdragon 8 Gen 3", "ram": "12GB", "storage": "256GB", "display": "6.82 inch LTPO AMOLED 120Hz", "camera": "50MP + 48MP + 64MP", "battery": "5400mAh", "os": "Android 14", "5g": "Yes"}',
 4.4, 15, 'https://placehold.co/400x300?text=OnePlus+12'),

('Xiaomi 14', 'smartphone', 'Xiaomi', 59999.00,
 'Compact flagship with Leica optics. Great performance-to-price ratio with premium camera capabilities.',
 '{"processor": "Snapdragon 8 Gen 3", "ram": "12GB", "storage": "256GB", "display": "6.36 inch LTPO AMOLED 120Hz", "camera": "50MP + 50MP + 50MP Leica", "battery": "4610mAh", "os": "Android 14", "5g": "Yes"}',
 4.3, 18, 'https://placehold.co/400x300?text=Xiaomi+14'),

('Samsung Galaxy A55', 'smartphone', 'Samsung', 29999.00,
 'Best mid-range Samsung with premium feel. Excellent display, good cameras, and long software support.',
 '{"processor": "Exynos 1480", "ram": "8GB", "storage": "128GB", "display": "6.6 inch Super AMOLED 120Hz", "camera": "50MP + 12MP + 5MP", "battery": "5000mAh", "os": "Android 14", "5g": "Yes"}',
 4.2, 35, 'https://placehold.co/400x300?text=Samsung+Galaxy+A55'),

('OnePlus Nord 4', 'smartphone', 'OnePlus', 27999.00,
 'Premium mid-ranger with metal unibody design. Flagship-level speed with clean OxygenOS experience.',
 '{"processor": "Snapdragon 7+ Gen 3", "ram": "8GB", "storage": "128GB", "display": "6.74 inch AMOLED 120Hz", "camera": "50MP + 8MP", "battery": "5500mAh", "os": "Android 14", "5g": "Yes"}',
 4.3, 28, 'https://placehold.co/400x300?text=OnePlus+Nord+4'),

('Xiaomi Redmi Note 13 Pro+', 'smartphone', 'Xiaomi', 24999.00,
 'Feature-packed mid-range phone with 200MP camera. Great value for money with fast charging and vibrant display.',
 '{"processor": "MediaTek Dimensity 7200", "ram": "8GB", "storage": "256GB", "display": "6.67 inch AMOLED 120Hz", "camera": "200MP + 8MP + 2MP", "battery": "5000mAh", "os": "Android 14", "5g": "Yes"}',
 4.1, 40, 'https://placehold.co/400x300?text=Redmi+Note+13+Pro+'),

('Apple iPhone 15', 'smartphone', 'Apple', 79990.00,
 'The latest iPhone with Dynamic Island and USB-C. Excellent cameras, strong performance, and industry-leading software support.',
 '{"processor": "A16 Bionic", "ram": "6GB", "storage": "128GB", "display": "6.1 inch Super Retina XDR OLED", "camera": "48MP + 12MP", "battery": "3349mAh", "os": "iOS 17", "5g": "Yes"}',
 4.6, 12, 'https://placehold.co/400x300?text=Apple+iPhone+15'),

('Samsung Galaxy M35', 'smartphone', 'Samsung', 17999.00,
 'Budget Samsung with massive battery. Reliable daily driver with Samsung ecosystem integration.',
 '{"processor": "Exynos 1380", "ram": "6GB", "storage": "128GB", "display": "6.6 inch Super AMOLED 120Hz", "camera": "50MP + 8MP + 2MP", "battery": "6000mAh", "os": "Android 14", "5g": "Yes"}',
 4.0, 45, 'https://placehold.co/400x300?text=Samsung+Galaxy+M35'),

('Realme GT 6T', 'smartphone', 'Realme', 22999.00,
 'Performance-focused mid-ranger with top-tier chipset. Great for gaming and heavy multitasking at an affordable price.',
 '{"processor": "Snapdragon 7+ Gen 3", "ram": "8GB", "storage": "128GB", "display": "6.78 inch LTPO AMOLED 120Hz", "camera": "50MP + 8MP", "battery": "5500mAh", "os": "Android 14", "5g": "Yes"}',
 4.2, 30, 'https://placehold.co/400x300?text=Realme+GT+6T'),

('Poco F6', 'smartphone', 'Poco', 25999.00,
 'Aggressive value proposition with flagship chipset. Best raw performance in its price segment.',
 '{"processor": "Snapdragon 8s Gen 3", "ram": "8GB", "storage": "256GB", "display": "6.67 inch AMOLED 120Hz", "camera": "50MP + 8MP", "battery": "5000mAh", "os": "Android 14", "5g": "Yes"}',
 4.1, 32, 'https://placehold.co/400x300?text=Poco+F6');


-- HEADPHONES (10 products)

INSERT INTO products (name, category, brand, price, description, specifications, rating, stock, image_url) VALUES

('Sony WH-1000XM5', 'headphone', 'Sony', 29990.00,
 'Industry-leading noise cancelling headphones. Exceptional sound quality with 30-hour battery life and premium comfort.',
 '{"type": "Over-ear", "driver": "30mm", "connectivity": "Bluetooth 5.3", "anc": "Yes - Industry Leading", "battery": "30 hours", "weight": "250g", "microphone": "Yes", "foldable": "No"}',
 4.7, 10, 'https://placehold.co/400x300?text=Sony+WH-1000XM5'),

('JBL Tune 770NC', 'headphone', 'JBL', 4999.00,
 'Affordable wireless headphones with active noise cancelling. JBL Pure Bass sound with comfortable fit for all-day wear.',
 '{"type": "Over-ear", "driver": "40mm", "connectivity": "Bluetooth 5.3", "anc": "Yes", "battery": "44 hours", "weight": "252g", "microphone": "Yes", "foldable": "Yes"}',
 4.1, 40, 'https://placehold.co/400x300?text=JBL+Tune+770NC'),

('boAt Rockerz 551ANC', 'headphone', 'boAt', 2499.00,
 'Budget ANC headphones with punchy bass. Great for commuting and casual listening without breaking the bank.',
 '{"type": "Over-ear", "driver": "40mm", "connectivity": "Bluetooth 5.2", "anc": "Yes - Hybrid", "battery": "49 hours", "weight": "240g", "microphone": "Yes", "foldable": "Yes"}',
 3.8, 55, 'https://placehold.co/400x300?text=boAt+Rockerz+551ANC'),

('Sennheiser HD 450BT', 'headphone', 'Sennheiser', 9990.00,
 'Audiophile-grade wireless headphones with balanced sound signature. Perfect for music lovers who value clarity over bass.',
 '{"type": "Over-ear", "driver": "32mm", "connectivity": "Bluetooth 5.0", "anc": "Yes", "battery": "30 hours", "weight": "238g", "microphone": "Yes", "foldable": "Yes"}',
 4.3, 15, 'https://placehold.co/400x300?text=Sennheiser+HD+450BT'),

('Sony WF-1000XM5', 'headphone', 'Sony', 24990.00,
 'Premium true wireless earbuds with best-in-class noise cancelling. Incredibly compact with hi-res audio support.',
 '{"type": "In-ear TWS", "driver": "8.4mm", "connectivity": "Bluetooth 5.3", "anc": "Yes - Industry Leading", "battery": "8h + 16h case", "weight": "5.9g per bud", "microphone": "Yes", "water_resistance": "IPX4"}',
 4.6, 12, 'https://placehold.co/400x300?text=Sony+WF-1000XM5'),

('JBL Live Pro 2', 'headphone', 'JBL', 11999.00,
 'True wireless earbuds with JBL Signature Sound. Excellent call quality and adaptive noise cancelling.',
 '{"type": "In-ear TWS", "driver": "11mm", "connectivity": "Bluetooth 5.3", "anc": "Yes - Adaptive", "battery": "10h + 30h case", "weight": "5.6g per bud", "microphone": "Yes - 6 mic", "water_resistance": "IPX5"}',
 4.2, 22, 'https://placehold.co/400x300?text=JBL+Live+Pro+2'),

('boAt Airdopes 141', 'headphone', 'boAt', 1299.00,
 'Ultra-affordable true wireless earbuds. Impressive battery life and decent sound for the price point.',
 '{"type": "In-ear TWS", "driver": "8mm", "connectivity": "Bluetooth 5.1", "anc": "No", "battery": "6h + 36h case", "weight": "4.5g per bud", "microphone": "Yes", "water_resistance": "IPX4"}',
 3.7, 80, 'https://placehold.co/400x300?text=boAt+Airdopes+141'),

('Samsung Galaxy Buds FE', 'headphone', 'Samsung', 6999.00,
 'Feature-rich earbuds for Samsung users. Active noise cancelling with seamless Galaxy ecosystem integration.',
 '{"type": "In-ear TWS", "driver": "12mm", "connectivity": "Bluetooth 5.2", "anc": "Yes", "battery": "6h + 15h case", "weight": "5.6g per bud", "microphone": "Yes - 3 mic", "water_resistance": "IPX2"}',
 4.1, 28, 'https://placehold.co/400x300?text=Samsung+Galaxy+Buds+FE'),

('Sennheiser Momentum 4', 'headphone', 'Sennheiser', 24990.00,
 'Flagship wireless headphones with audiophile-grade sound. Premium materials with exceptional 60-hour battery life.',
 '{"type": "Over-ear", "driver": "42mm", "connectivity": "Bluetooth 5.2", "anc": "Yes - Adaptive", "battery": "60 hours", "weight": "293g", "microphone": "Yes", "foldable": "Yes"}',
 4.5, 8, 'https://placehold.co/400x300?text=Sennheiser+Momentum+4'),

('OnePlus Buds 3', 'headphone', 'OnePlus', 5499.00,
 'Great value TWS earbuds with hi-res audio and strong ANC. Excellent integration with OnePlus devices.',
 '{"type": "In-ear TWS", "driver": "10.4mm", "connectivity": "Bluetooth 5.3", "anc": "Yes - 49dB", "battery": "7h + 37h case", "weight": "4.8g per bud", "microphone": "Yes - 3 mic", "water_resistance": "IP55"}',
 4.2, 35, 'https://placehold.co/400x300?text=OnePlus+Buds+3');


-- REVIEWS (50 reviews across products)

INSERT INTO reviews (user_id, product_id, rating, comment) VALUES

-- HP Pavilion 15 (product 1)
(1, 1, 4, 'Solid laptop for the price. Runs VS Code and multiple browser tabs without any lag. Battery could be better though.'),
(2, 1, 5, 'Perfect for my college work. Handles programming assignments, web browsing, and video calls smoothly.'),

-- Dell Inspiron 15 (product 2)
(1, 2, 4, 'Great build quality and the keyboard feels premium. DDR5 RAM makes a noticeable difference in multitasking.'),
(2, 2, 5, 'Best laptop I have owned. The display is crisp and the performance is snappy for development work.'),

-- Lenovo IdeaPad Slim 5 (product 3)
(1, 3, 5, 'The 2.5K display is absolutely gorgeous. Everything looks sharp and the colors are vibrant. Lightweight too.'),
(2, 3, 4, 'Good laptop overall. The Ryzen processor handles everything I throw at it. Only wish it had more ports.'),

-- ASUS VivoBook 15 (product 4)
(1, 4, 4, 'Great budget option. 8GB RAM is enough for basic development. Might need to upgrade if running heavy IDEs.'),
(2, 4, 3, 'Decent for the price but the display could be brighter. Works fine for indoor use and coding.'),

-- Acer Aspire 5 (product 5)
(1, 5, 4, 'Affordable and gets the job done. Battery lasts around 6-7 hours which is good enough for classes.'),
(2, 5, 3, 'Build quality feels a bit plasticky but performance is solid for the price. No complaints for coding work.'),

-- HP Victus 15 (product 6)
(1, 6, 4, 'Great for both gaming and coding. The dedicated GPU helps with ML projects. Fan gets loud under load though.'),
(2, 6, 5, 'Best entry-level gaming laptop. I use it for game development and it handles Unity and Unreal without issues.'),

-- Lenovo ThinkPad E14 (product 7)
(1, 7, 5, 'The keyboard is the best I have ever used on a laptop. ThinkPad quality is real. Perfect for long coding sessions.'),
(2, 7, 5, 'Professional build, amazing keyboard, great trackpoint. This is a developer laptop through and through.'),

-- Dell XPS 13 (product 8)
(1, 8, 5, 'Premium in every way. The OLED display is stunning and the build quality is top-notch. Worth every rupee.'),
(2, 8, 4, 'Beautiful laptop but runs a bit warm under heavy loads. The compact size is perfect for travel.'),

-- ASUS ROG Strix G15 (product 9)
(1, 9, 5, 'Beast of a machine. RTX 4060 handles everything from gaming to ML training. The 165Hz display is butter smooth.'),
(2, 9, 4, 'Powerful but heavy. Not ideal for carrying around but perfect as a desktop replacement for heavy workloads.'),

-- Acer Nitro V 15 (product 10)
(1, 10, 4, 'Good gaming laptop on a budget. Handles most games at medium-high settings. Good for learning game development.'),
(2, 10, 4, 'RTX 2050 is decent for the price. Thermals are well managed and the 144Hz screen feels smooth.'),

-- Samsung Galaxy S24 (product 11)
(1, 11, 5, 'Galaxy AI features are genuinely useful. The camera is excellent and the display is best in class.'),
(2, 11, 4, 'Great phone but Samsung bloatware is still annoying. Camera and performance are outstanding though.'),

-- OnePlus 12 (product 12)
(1, 12, 5, 'Fastest phone I have used. 100W charging is insane - full charge in about 25 minutes. Camera is also great.'),
(2, 12, 4, 'Excellent flagship. The Hasselblad camera has improved significantly. OxygenOS is clean and smooth.'),

-- Xiaomi 14 (product 13)
(1, 13, 4, 'Compact flagship that feels great in hand. Leica cameras take amazing photos. Good value for the specs.'),
(2, 13, 4, 'Impressive camera quality for the price. MIUI has improved a lot. Battery life is solid for a compact phone.'),

-- Samsung Galaxy A55 (product 14)
(1, 14, 4, 'Best mid-range Samsung. Display quality is flagship-level. Will get 4 years of updates which is great.'),
(2, 14, 5, 'Amazing value. The Super AMOLED display is beautiful. Performance is smooth for daily tasks and light gaming.'),

-- OnePlus Nord 4 (product 15)
(1, 15, 5, 'The metal design feels premium. Performance is flagship-like at half the price. Best phone under 30K.'),
(2, 15, 4, 'Great phone for the price. Camera is good in daylight, average at night. Fast charging is a lifesaver.'),

-- Xiaomi Redmi Note 13 Pro+ (product 16)
(1, 16, 4, '200MP camera takes incredibly detailed photos. The phone feels premium with the curved display.'),
(2, 16, 3, 'Camera is good but MIUI still has too many ads. Performance is decent for the price.'),

-- Apple iPhone 15 (product 17)
(1, 17, 5, 'Finally USB-C on iPhone. Camera is excellent, performance is top-tier, and iOS is smooth as always.'),
(2, 17, 5, 'Best iPhone for most people. The 48MP camera takes stunning photos. Battery life has improved significantly.'),

-- Samsung Galaxy M35 (product 18)
(1, 18, 4, '6000mAh battery is a beast. Easily lasts 2 days with moderate use. Display is good for the price.'),
(2, 18, 3, 'Good battery phone but performance is just average. Fine for basic use but struggles with heavy games.'),

-- Realme GT 6T (product 19)
(1, 19, 4, 'Great performance phone for gaming. The Snapdragon 7+ Gen 3 handles everything smoothly.'),
(2, 19, 4, 'Excellent value for money. Fast charging, good display, and powerful chipset. Camera is decent.'),

-- Poco F6 (product 20)
(1, 20, 4, 'Raw performance champion in this price range. The chipset is incredibly powerful for the price.'),
(2, 20, 4, 'Best performance under 30K. MIUI for Poco is cleaner than regular MIUI. Highly recommended.'),

-- Sony WH-1000XM5 (product 21)
(1, 21, 5, 'Best noise cancelling headphones ever. The silence is incredible. Sound quality is warm and detailed.'),
(2, 21, 5, 'Worth every penny. ANC blocks out everything. Comfortable for long flights and work sessions.'),

-- JBL Tune 770NC (product 22)
(1, 22, 4, 'Great ANC headphones for the price. Bass is punchy and the 44-hour battery is impressive.'),
(2, 22, 4, 'Good value for money. ANC works well for daily commuting. Comfortable to wear for hours.'),

-- boAt Rockerz 551ANC (product 23)
(1, 23, 3, 'Decent for the price. ANC is basic but works. Bass heavy sound signature which some might not prefer.'),
(2, 23, 4, 'Best headphones under 3000. Battery life is outstanding. ANC blocks out most ambient noise.'),

-- Sennheiser HD 450BT (product 24)
(1, 24, 5, 'Sennheiser sound quality is unmatched at this price. Balanced, detailed, and perfect for music lovers.'),
(2, 24, 4, 'Excellent sound clarity. ANC is good but not as strong as Sony. Build quality is solid.'),

-- Sony WF-1000XM5 (product 25)
(1, 25, 5, 'These tiny earbuds have incredible ANC. Sound quality rivals full-size headphones. Premium in every way.'),
(2, 25, 4, 'Amazing earbuds but expensive. ANC and sound quality are the best in TWS category. Battery could be longer.'),

-- JBL Live Pro 2 (product 26)
(1, 26, 4, 'Great call quality and sound. The adaptive ANC adjusts well to different environments.'),
(2, 26, 4, 'Comfortable fit and excellent battery life. JBL app customization options are a nice bonus.'),

-- boAt Airdopes 141 (product 27)
(1, 27, 3, 'You get what you pay for. Sound is decent for the price. Battery life is the highlight.'),
(2, 27, 4, 'Best earbuds under 1500. Bass is surprisingly good. Build quality is acceptable for the price.'),

-- Samsung Galaxy Buds FE (product 28)
(1, 28, 4, 'Works seamlessly with my Samsung phone. ANC is effective and the sound is well balanced.'),
(2, 28, 4, 'Good earbuds for Samsung users. ANC works well and the Galaxy Wearable app adds nice features.'),

-- Sennheiser Momentum 4 (product 29)
(1, 29, 5, '60 hours of battery is not a joke. Sound quality is exceptional - warm, detailed, and immersive.'),
(2, 29, 5, 'The best sounding wireless headphones I have ever used. Premium build and insane battery life.'),

-- OnePlus Buds 3 (product 30)
(1, 30, 4, 'Great value TWS earbuds. ANC is strong for the price and sound quality is above average.'),
(2, 30, 4, 'Hi-res audio support and strong ANC at this price is impressive. Comfortable for long listening sessions.');
