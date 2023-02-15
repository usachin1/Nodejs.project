cmd to install n create node_modules required for running project (mysql node server , expressjs server & package.json file)
1) npm init 
2) npm install --save express mysql body-parser 
3) Install phpmyadmin
-----------------------------------------
1) Place restful_api_project inside xampp->htdocs
2) In my case i have been using mysql so i have phpmyadmin installed.
3) In phpmyadmin import sql file.
4) run inside project folder --> node index
5) Should o/p this -> Node server running on port 3000...
                      Mysql Connected successfully
6) Run request via postmon in vscode extension.
7)  + firstly insert category via below api 
    + Then add product selective from category id which have being created recently
    + Then perform crud operation

    --> insert api call for Category Table --> http://localhost:3000/insertproductcategory
    {
    "categoryName": "**Item"
    }

    --> insert api call for product Table: --> http://localhost:3000/insertproduct
    {
    "productName": "Rice",
    "qtyPerUnit": 30,
    "unitPrice": 300,
    "unitInStock": 40,
    "discontinued": 1,
    "categoryId": 2
    }

    --> update api call for product Table: --> http://localhost:3000/updateproduct/1
    {
    "productName": "Rice",
    "qtyPerUnit": 30,
    "unitPrice": 300,
    "unitInStock": 40,
    "discontinued": 1,
    "categoryId": 2
    }

    --> delete api call for product Table: --> http://localhost:3000/deleteproduct/1

    --> fetch all api call for both product and category Tables:  --> http://localhost:3000/getproducts

    --> read particular entry via api call from both table's via inner join --> http://localhost:3000/particularproduct/4


