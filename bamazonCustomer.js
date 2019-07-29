
var inquirer = require('inquirer')
var mysql = require('mysql')

var connection = mysql.createConnection({
  host: 'localhost',
  port: 3306,

  user: 'root',

  password: 'password',
  database: 'Bamazon'
})

// to makes sure that the user is supplying only positive integers for their inputs
function InputVal (value) {
  var integer = Number.isInteger(parseFloat(value))
  var sign = Math.sign(value)

  if (integer && (sign === 1)) {
    return true
  } else {
    return 'no zeroes allowed.'
  }
}

// prompt the user for the item and quantity they to purchase
function promptUserPurchase () {
  // console.log('___ENTER promptUserPurchase___');

  // user to select an item
  inquirer.prompt([
    {
      type: 'input',
      name: 'item_id',
      message: 'Please enter the Item ID which you would like to purchase. No ID of "0".',
      validate: InputVal,
      filter: Number
    },
    {
      type: 'input',
      name: 'quantity',
      message: 'How many do you need?',
      validate: InputVal,
      filter: Number
    }
  ]).then(function (input) {
    var item = input.item_id
    var quantity = input.quantity

    // Query db to confirm that the given item ID exists in the desired quantity
    var queryStr = 'SELECT * FROM products WHERE ?'

    connection.query(queryStr, { item_id: item }, function (err, data) {
      if (err) throw err

     

      if (data.length === 0) {
        console.log('ERROR: Invalid Item ID. Please select a valid Item ID.')
        showInventory()
      } else {
        var productData = data[0]


        if (quantity <= productData.stock_quantity) {
          console.log('YES!, the product you requested is in stock! Placing order!')

          // Construct updating query string
          var updateQueryStr = 'UPDATE products SET stock_quantity = ' + (productData.stock_quantity - quantity) + ' WHERE item_id = ' + item

          // Updates the inventory
          connection.query(updateQueryStr, function (err, data) {
            if (err) throw err

            console.log('Your oder has been placed! Your total is $' + productData.price * quantity)
            console.log('Thank you for shopping with us!')
            console.log('\n---------------------------------------------------------------------\n')

            // End the database connection
            connection.end()
          })
        } else {
          console.log('Sorry, there is not enough product in stock, your order can not be placed as is.')
          console.log('Please modify your order.')
          console.log('\n---------------------------------------------------------------------\n')

          showInventory()
        }
      }
    })
  })
}

// retrieves inventory from db and outputs to console
function showInventory () {
  // console.log('___ENTER showInventory___');

  // Construct the db query string
  queryStr = 'SELECT * FROM products'

  // Make the db query
  connection.query(queryStr, function (err, data) {
    if (err) throw err

    console.log('Existing Inventory: ')
    console.log('...................\n')

    var strOut = ''
    for (var i = 0; i < data.length; i++) {
      strOut = ''
      strOut += 'Item ID: ' + data[i].item_id + '  //  '
      strOut += 'Product Name: ' + data[i].product_name + '  //  '
      strOut += 'Department: ' + data[i].department_name + '  //  '
      strOut += 'Price: $' + data[i].price + '\n'

      console.log(strOut)
    }

    console.log('---------------------------------------------------------------------\n')

    // Prompts  user for item/quantity they would like to purchase
    promptUserPurchase()
  })
}

// exaecutes bamazon
function runBamazon () {
  // console.log('___ENTER runBamazon___');

  // available inventory
  showInventory()
}

runBamazon()
