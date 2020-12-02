db.restaurants.find({
    'cuisine':'Hamburgers'
},{
    'address': 1,
    'cuisine': 1
}).pretty()

db.restaurants.find({
   'cuisine': 'American',
   'borough': 'Bronx' 
}, {
    'address': 1,
    'cuisine': 1,
    'borough': 1
}).pretty()

db.restaurants.find({
    'address.street':'Stillwell Avenue'
}, {
    'address': 1
}).pretty()