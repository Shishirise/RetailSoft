PRAGMA foreign_keys = ON;

DROP TABLE categories_t;
DROP TABLE products_t;
DROP TABLE sales_t;
DROP TABLE restock_orders_t;
DROP TABLE sale_line_items_t;


CREATE TABLE categories_t (

	category_id INTEGER PRIMARY KEY,
	category_name TEXT NOT NULL
);

CREATE TABLE products_t (

	product_id INTEGER PRIMARY KEY,
	category_id INTEGER,
	name TEXT NOT NULL,
	brand TEXT,
	variation TEXT,
	unit_price REAL NOT NULL,
	stock_quantity INTEGER DEFAULT 0,
	reorder_level INTEGER DEFAULT 10,
	FOREIGN KEY (category_id) 
	REFERENCES categories_t(category_id)
	ON DELETE CASCADE
	ON UPDATE CASCADE
);

CREATE TABLE sales_t (
	sale_id INTEGER PRIMARY KEY,
	sale_datetime DATETIME CURRENT_TIMESTAMP,
	total_amount REAL NOT NULL,
	payment_method TEXT,
	is_refund INTEGER DEFAULT 0
);

CREATE TABLE restock_orders_t (
	restock_order_id INTEGER PRIMARY KEY,
	product_id INTEGER,
	quantity_ordered INTEGER NOT NULL,
	order_date DATETIME CURRENT_TIMESTAMP,
	projected_arrival DATE,
	status TEXT,
	FOREIGN KEY (product_id) 
	REFERENCES products_t(product_id)
	ON DELETE CASCADE
	ON UPDATE CASCADE
);

CREATE TABLE sale_line_items_t (
	sale_id INTEGER,
	product_id INTEGER,
	quantity INTEGER NOT NULL,
	price_at_sale REAL NOT NULL,
	is_broken INTEGER DEFAULT 0,
	FOREIGN KEY (sale_id)
	REFERENCES sales_t(sale_id)
	ON DELETE CASCADE
	ON UPDATE CASCADE,
	FOREIGN KEY (product_id)
	REFERENCES products_t(product_id)
	ON DELETE CASCADE 
	ON UPDATE CASCADE,
	PRIMARY KEY (sale_id, product_id)
);

PRAGMA table_info(categories_t);
PRAGMA table_info(products_t);
PRAGMA table_info(sales_t);
PRAGMA table_info(restock_orders_t);
PRAGMA table_info(sale_line_items_t);
 

	