--
-- Clear Database
--

DROP TABLE IF EXISTS `order_details`;
DROP TABLE IF EXISTS `orders`;
DROP TABLE IF EXISTS `suppliers`;
DROP TABLE IF EXISTS `products`;
DROP TABLE IF EXISTS `buyers`;

--
-- Create tables and populate
--


--
-- Table structure for table `buyers`
--

CREATE TABLE `buyers` (
`id` int(11) NOT NULL AUTO_INCREMENT,
`FirstName` varchar(30) NOT NULL, 
`LastName` varchar(30) NOT NULL,
`StreetAddress` varchar(50) NOT NULL,
`City` varchar(30) NOT NULL,
`State` varchar(30) NOT NULL,
`ZipCode` int(5) NOT NULL,
`Phone` varchar(13) NOT NULL,
`Email` varchar(35) DEFAULT NULL,
 PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Table structure for table `products`
--

CREATE TABLE `products` (
`id` int(11) NOT NULL AUTO_INCREMENT,
`ProductName` varchar(40) NOT NULL, 
`StartingInventory` int(6) NOT NULL,
`UnitsInStock` int(6) NOT NULL,
`UnitsOnOrder` int(6) NOT NULL,
`UnitPrice` decimal(6,2) NOT NULL,
`RestockLevel` int(4) DEFAULT 500,
 PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Table structure for table `suppliers`
--

CREATE TABLE `suppliers` (
`id` int(11) NOT NULL AUTO_INCREMENT,
`City` varchar(30) NOT NULL, 
`State` varchar(30) NOT NULL,
 PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Table structure for table `orders`
--

CREATE TABLE `orders` (
`id` int(11) NOT NULL AUTO_INCREMENT, 
`OrderDate` DATE NOT NULL,
`OrderPrice` decimal(8,2) NOT NULL,
`SupplierId` int(11) NOT NULL,
`BuyerId` int(11) NOT NULL,
PRIMARY KEY (`id`),
KEY `SupplierId` (`SupplierId`),
KEY `BuyerId` (`BuyerId`), 
CONSTRAINT `orders_ibfk_1` FOREIGN KEY (`SupplierId`) REFERENCES `suppliers` (`id`) ON UPDATE CASCADE ON DELETE CASCADE,
CONSTRAINT `orders_ibfk_2` FOREIGN KEY (`BuyerId`) REFERENCES `buyers` (`id`) ON UPDATE CASCADE ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=1000 DEFAULT CHARSET=utf8;

--
-- Table structure for table `order_details`
--

CREATE TABLE `order_details` (
`oid` int(11) NOT NULL,	
`pid` int(11) NOT NULL, 
`ProductQuantity` int(5) NOT NULL,
`TotalUnitPrice` decimal(8,2) NOT NULL, 
PRIMARY KEY (`oid`, `pid`),
KEY `oid` (`oid`),
KEY `pid` (`pid`),
CONSTRAINT `order__details_ibfk_1` FOREIGN KEY (`pid`) REFERENCES `products` (`id`) ON UPDATE CASCADE ON DELETE CASCADE, 
CONSTRAINT `order_details_ibfk_2` FOREIGN KEY (`oid`) REFERENCES `orders` (`id`) ON UPDATE CASCADE ON DELETE CASCADE 
) ENGINE=InnoDB DEFAULT CHARSET=utf8;


--
-- Dumping data for table `buyers`
--

-- Made up customer data
LOCK TABLES `buyers` WRITE;
INSERT INTO `buyers` VALUES (1, 'John', 'Mickelson', '839 Kleberg Ct.', 'Southlake', 'Texas', 72096, '(682)932-2761', 'jmickelson@tx.com'), (2, 'Rachel', 'Ishikawa', '478 Barbara Ave.', 'Solana Beach', 'California', 92075, '(858)755-9861', 'cupcakelover@cpsu.com'), (3, 'Tim', 'Reed', '1019 Old Stratford St.', 'Charlottesville', 'Virginia', 22901, '(434)903-3041', 'tritim@trisport.com'), (4, 'Brooks', 'Kopa', '822 Birmingham Dr.', 'Cardiff', 'California', 92024, '(760)478-0298', NULL), (5, 'Jill', 'Armstrong', '1189 Heia Beach Rd.', 'Kailua', 'Hawaii', 96782, '(808)932-3840', 'swimmore@kailuaswimclub.com'), (6, 'Nicholas', 'Smith', '460E Broadway', 'New York City', 'New York', 10001, '(718)522-1001', NULL), (7, 'Jessica', 'Vonn', '1019 Sky Valley Ln.', 'Butte', 'Montana', 22901, '(406)924-7336', 'jburn@statepark.gov'); 
UNLOCK TABLES;

--
-- Dumping data for table `products`
--

LOCK TABLES `products` WRITE;
INSERT INTO `products` VALUES (1, 'Peanut Butter Kiss Cupcake', 5000, 3500, 1500, 3.50, 100), (2, 'Bella Nutella Cupcake', 5000, 1250, 3750, 3.25,200), (3, 'Coffee and Cream Wedding Cake', 50, 35, 15, 550.00, 5), (4, 'Wonder Bar', 10000, 3000, 7000, 2.00, 1500), (5, 'Rosies Red Velvet Cupcake', 6000, 4500, 1500, 3.25, 400), (6, 'German Chocolate Cupcake', 4000, 533, 1788, 3.00, 300), (7, 'Molasses Ginger Cookie', 2000, 750, 300, 1.25, 200), (8, 'Irish Cream Cheesecake', 500, 125, 307, 29.00, 40), (9, 'Pumpkin Crumble Pie', 300, 100, 175, 13.75, 25), (10, 'Snickerdoodle', 7500, 4701, 1343, 2.00, 750);
UNLOCK TABLES;

--
-- Dumping data for table `suppliers`
--

LOCK TABLES `suppliers` WRITE;
INSERT INTO `suppliers` VALUES (1, 'Dallas', 'Texas'), (2, 'Los Angeles', 'California'), (3, 'Seattle', 'Washington'), (4, 'Denver', 'Colorado'), (5, 'Chicago', 'Illinois'), (6, 'Indianapolis', 'Indiana'), (7, 'Louisville', 'Kentucky'), (8, 'Atlanta', 'Georgia'), (9, 'Edison', 'New Jersey'), (10, 'Allentown', 'Pennsylvania'), (11, 'Orlando', 'Florida'); 
UNLOCK TABLES;

--
-- Dumping data for table `orders`
--

LOCK TABLES `orders` WRITE;
INSERT INTO `orders` VALUES (1000,'2018-07-10', 81.00, 1, 1), (1001, '2018-07-12', 550.00, 1, 1), (1002, '2018-07-13', 62.00, 2, 2), (1003, '2018-07-11', 168.00, 9, 3), (1004, '2018-08-03', 1065.00, 6, 7), (1005, '2018-08-11', 585.00, 2, 5); 
UNLOCK TABLES;

--
-- Dumping data for table `order_details`
--

LOCK TABLES `order_details` WRITE;
INSERT INTO `order_details` VALUES (1000, 1, 12, 42.00), (1000, 2, 21, 39.00), (1001, 6, 21, 63.00), (1002, 1, 4, 14.00), (1002, 4, 24, 48.00), (1003, 1, 48, 168.00), (1004, 5, 200, 650.00), (1004, 7, 100, 125.00), (1004, 8, 10, 290.00), (1005, 3, 1, 555.00), (1005, 7, 24, 30.00); 
UNLOCK TABLES;

