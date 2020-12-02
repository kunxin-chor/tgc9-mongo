# Show all databases

```
show all databases
```

# Switch database

```
use sample_airbnb
```

Once we have switched to a database, we have a variable name `db`. It
represents the currently used database.

# Show all collections

```
show collections
```

# Retrieve documents from collections
```
db.listingsAndReviews.find()
```

# Projecting only certain fields in the documents
```
db.listingsAndReviews.find({},{
    'name': 1,
    'summary': 1,
    'property_type': 1
}).pretty()
```

# Filtering

## Find by an exact value for a field

Show all listings with exactly 2 beds.

```
db.listingsAndReviews.find({
    'beds': 2
}, {
    'name': 1,
    'beds': 1
}).pretty()
```

##  Find by a field inside an object

```
db.listingsAndReviews.find({
    'address.country':'Brazil'
},{
    'name': 1,
    'address.country': 1
}).pretty()
```

## Find by multiple critera?

If we want more than one criteria, then we just put them 
as additional properties in the first argument (which is an object)

```
db.listingsAndReviews.find({
    'address.country': 'Brazil',
    'beds': 2
}, {
    'name': 1,
    'beds': 1,
    'address.country': 1
}).pretty()
```

## Find by inequality (a range)

```
db.listingsAndReviews.find({
    'beds': {
        '$gte': 3
    },
    'address.country':'Brazil'
},{
    'name': 1,
    'beds': 1,
    'address.country': 1
}).pretty()
```

* `$gt` is greater than
* `$lt` is lesser than
* `$gte` is greater than or equal
* `$lte` is lesser than or equal

### Combining inequality

We just put more ineqality properties into the `beds` object.

```
db.listingsAndReviews.find({
    'beds': {
        '$gte': 3,
        '$lte': 5
    },
    'address.country': 'Brazil'
}, {
    'name': 1,
    'address.country': 1,
    'beds': 1
}).pretty()
```

Eg. Find listings in Brazil that have between 3 to 5 beds but no more than 4 bedrooms

```
db.listingsAndReviews.find({
    'beds': {
        '$gte': 3,
        '$lte': 5
    },
    'bedrooms: {
        '$lte': 4
    },
    'address.country': 'Brazil'
}, {
    'name': 1,
    'address.country': 1,
    'beds': 1,
    'bedrooms': 1
}).pretty()
```

# Solutions to question 1

Q1
```
db.restaurants.find({
    'cuisine':'Hamburgers'
},{
    'address': 1,
    'cuisine': 1
}).pretty()
```

Q2
```
db.restaurants.find({
   'cuisine': 'American',
   'borough': 'Bronx' 
}, {
    'address': 1,
    'cuisine': 1,
    'borough': 1
}).pretty()
```

Q3
```
db.restaurants.find({
    'address.street':'Stillwell Avenue'
}, {
    'address': 1
}).pretty()
```

## Count how many records there in a results?

Find the number of listings in Brazil that more than 10 beds

```
db.listingsAndReviews.find({
    'address.country':'Brazil',
    'beds': {
        '$gt': 10
    }
}).count()
```

## Find by an element inside an array

Find all listings that has waterfront as an amentity.

```
db.listingsAndReviews.find({
    'amenities':'Waterfront'
},{
    'name': 1,
    'amenities': 1
}).pretty()
```

## Find by more than one element in array, and all those elements must match

Find all listings that have both Watefront and Beachfront in the amenities array.

```
db.listingsAndReviews.find({
    'amenities': {
        '$all':['Waterfront', 'Beachfront']
    }
},{
    'name': 1,
    'amenities': 1
}).pretty()
```

## Find by elements in array where at least one exists

```
db.listingsAndReviews.find({
    'amenities': {
        '$in': ['Stove', 'Oven', 'Microwave']
    }
},{
    'name': 1,
    'amenities': 1
}).pretty()
```

## Find all listings in either Canada or Brazil
```
db.listingsAndReviews.find({
    'address.country': {
        '$in':['Brazil', 'Canada']
    }
},{
    'name': 1,
    'address.country': 1
}).pretty()
```

## Find all listings not from Brazil
```
db.listingsAndReviews.find({
    'address.country': {
        '$not':{
            '$in':['Brazil']
        }
    }
},{
    'name': 1,
    'address.country': 1
}).pretty().limit(10)
```

## Find all listings reviewed before 2017
```
db.listingsAndReviews.find({
    'first_review': {
        '$lt': ISODate('2017-01-01')
    }
},{
    'name': 1,
    'first_review': 1
}).pretty()
```

