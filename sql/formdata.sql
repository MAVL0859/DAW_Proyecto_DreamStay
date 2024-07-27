CREATE DATABASE formdata;
-- DROP SCHEMA formdata;

USE formdata;

CREATE TABLE registerForm(
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  lastname VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  password VARCHAR(255) NOT NULL,
  phonenumber VARCHAR(10)
);

CREATE TABLE hotels (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  description TEXT NOT NULL,
  imagePath VARCHAR(255) NOT NULL,
  location VARCHAR(255) NOT NULL,
  services TEXT,
  createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE reservations (
  id INT AUTO_INCREMENT PRIMARY KEY,
  userId INT,
  hotelId INT,
  checkInDate DATE NOT NULL,
  checkOutDate DATE NOT NULL,
  roomType VARCHAR(50) NOT NULL,
  numGuests INT NOT NULL,
  createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (userId) REFERENCES registerForm(id),
  FOREIGN KEY (hotelId) REFERENCES hotels(id)
);



DROP TABLE reservations;
SELECT * FROM registerForm;

