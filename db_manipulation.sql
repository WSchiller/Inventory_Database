-- Some database manipulation queries for my website/database project.
-- I used phpMyAdmin to run and verify the queries on a MariaDB server

--display all products inventory information.
SELECT id, ProductName, StartingInventory, UnitsInStock, UnitsOnOrder, UnitPrice, RestockLevel FROM products 

--add a new product to the inventory 
INSERT INTO products (ProductName, StartingInventory, UnitsInStock, UnitsOnOrder, UnitPrice, RestockLevel) VALUES ([ProductName_Input], [StartingInventory_Input], [UnitsInStock_Input], [UnitsOnOrder_Input], [UnitPrice_Input], [RestockLevel_Input]) 

--update product inventory information
UPDATE products SET ProductName = [ProductName_userinput], StartingInventory = [StartingInventory_userinput], UnitsInStock = [UnitsInStock_userinput], UnitsOnOrder = [UnitsOnOrder_userinput], UnitPrice = [UnitPrice_userinput], RestockLevel = [RestockLevel_userinput] WHERE id = [product_id_selected_from_table]

--delete a product from inventory
DELETE FROM products WHERE id = [product_id_selected_from__table]

--display all orders
SELECT orders.id, OrderDate, OrderPrice, suppliers.City AS Suppliers, CONCAT(buyers.FirstName,' ',buyers.LastName) AS Buyers FROM orders INNER JOIN suppliers ON orders.SupplierId=suppliers.id INNER JOIN buyers ON orders.BuyerID=buyers.id

--search/filter orders based on attribute selected by user
SELECT id, OrderDate, SupplierId, BuyerId FROM orders WHERE [user selects OrderId, Date, SupplierId, or BuyerId from dropdown] = [user_input_value]

--create a new order 
INSERT INTO orders (OrderDate, OrderPrice, SupplierId, BuyerId) VALUES ([OrderDate_Input], [OrderPrice_Input], [SupplierId_Input], [BuyerId_Input])

--delete a product from inventory
DELETE FROM orders WHERE id = [order_id_selected_from__table]

--display all products in all orders
SELECT oid, pid, ProductQuantity, TotalUnitPrice FROM order_details

--add a product to an order/shopping cart, associate a product to an order (many-to-many relationship addition)
INSERT INTO order_details (oid, pid, ProductQuantity, TotalUnitPrice) VALUES ([oid_Input], [pid_Input], [ProductQuantity_Input], [TotalUnitPrice_Input])

--disassociate product from an order (many-to-many relationship deletion)
DELETE FROM order_details WHERE pid = [pid_userinput]

--display all buyers
SELECT FirstName, LastName, StreetAddress, City, State, ZipCode, Phone, Email FROM buyers

--add a buyer 
INSERT INTO buyers (FirstName, LastName, StreetAddress, City, State, ZipCode, Phone, Email) VALUES ([FirstName_input], [LastName_input], [StreetAddress_input], [City_input], [State_input], [ZipCode_input], [Phone_input], [Email_input])

--remove buyer from directory
DELETE FROM buyers WHERE id = [id_userinput]

--display all supply locations
SELECT id, City, State FROM suppliers

--add a supplier using form
INSERT INTO suppliers (city, state) VALUES ([cityInput], [stateInput])

--remove supply facility
DELETE FROM suppliers WHERE id = [id_userinput]
