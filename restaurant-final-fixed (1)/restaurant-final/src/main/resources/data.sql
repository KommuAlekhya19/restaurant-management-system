USE restaurant_db;

DELETE FROM menu_items;

INSERT INTO menu_items (name, price, category, image) VALUES 
-- Starters
('Dragon Potato', 180, 'Starters', 'https://images.unsplash.com/photo-1541544741938-0af808871cc0'),
('Chicken 65', 220, 'Starters', 'https://images.unsplash.com/photo-1610057099431-d7aefeedc265'),
('Paneer Tikka', 240, 'Starters', 'https://images.unsplash.com/photo-1567188040759-fb8a883dc6d8'),
('Mushroom Pepper Fry', 190, 'Starters', 'https://images.unsplash.com/photo-1596797038530-2c107229654b'),
('Apollo Fish', 260, 'Starters', 'https://images.unsplash.com/photo-1534422298391-e4f8c172dddb'),
('Veg Spring Rolls', 160, 'Starters', 'https://images.unsplash.com/photo-1544025162-d76694265947'),

-- Main Course
('Mutton Juicy Biryani', 350, 'Main Course', 'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8'),
('Prawns Biryani', 320, 'Main Course', 'https://images.unsplash.com/photo-1633964913295-ceb43826e7c9'),
('Paneer Biryani', 240, 'Main Course', 'https://images.unsplash.com/photo-1645177628172-a94c1f96e6db'),
('Veg Supreme Biryani', 210, 'Main Course', 'https://images.unsplash.com/photo-1589301760014-d929f3979dbc'),
('Mutton Rogan Josh', 340, 'Main Course', 'https://images.unsplash.com/photo-15452c6899-293024933934'),
('Butter Chicken', 280, 'Main Course', 'https://images.unsplash.com/photo-1588166524941-3bf61a9c41db'),
('Dal Makhani', 180, 'Main Course', 'https://images.unsplash.com/photo-1546833999-b9f581a1996d'),
('Kadai Veg', 210, 'Main Course', 'https://images.unsplash.com/photo-1585937421612-70a008356fbe'),
('Egg Masala', 200, 'Main Course', 'https://images.unsplash.com/photo-1565557623262-b51c2513a641'),

-- Breads
('Butter Naan', 45, 'Breads', 'https://images.unsplash.com/photo-1601050690597-df0568f70950'),
('Tandoori Roti', 35, 'Breads', 'https://images.unsplash.com/photo-1565299585323-38d6b0865b47'),
('Garlic Naan', 60, 'Breads', 'https://images.unsplash.com/photo-1626777552726-4a6b54c97e46'),
('Plain Naan', 40, 'Breads', 'https://images.unsplash.com/photo-1589301760014-d929f3979dbc'),
('Laccha Paratha', 50, 'Breads', 'https://images.unsplash.com/photo-1565557623262-b51c2513a641'),
('Rumali Roti', 30, 'Breads', 'https://images.unsplash.com/photo-1601050690597-df0568f70950'),

-- Desserts
('Gulab Jamun', 90, 'Desserts', 'https://images.unsplash.com/photo-1541781774459-bb2af2f05b55'),
('Double Ka Meetha', 110, 'Desserts', 'https://images.unsplash.com/photo-1551024709-8f23befc6f87'),
('Vanilla Ice Cream', 80, 'Desserts', 'https://images.unsplash.com/photo-1570197788417-0e82375c9371'),
('Ras Malai', 100, 'Desserts', 'https://images.unsplash.com/photo-1601392572114-16ebf411634d'),

-- Beverages
('Virgin Mint Mojito', 130, 'Beverages', 'https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd'),
('Thumps Up', 60, 'Beverages', 'https://images.unsplash.com/photo-1622483767028-3f66f32aef97'),
('Blue Lagoon Mocktail', 120, 'Beverages', 'https://images.unsplash.com/photo-1536935338788-846bb9981813'),
('Coke', 60, 'Beverages', 'https://images.unsplash.com/photo-1554866585-cd94860890b7'),
('Fresh Lime Soda', 90, 'Beverages', 'https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd'),
('Mango Milkshake', 140, 'Beverages', 'https://images.unsplash.com/photo-1572490122747-3968b75cc699');