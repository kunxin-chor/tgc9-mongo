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

## Pattern matching (like using LIKE in SQL)
Find all the movies that have `Star Wars` (regardless of casing) in it.

```
db.movies.find({
    'title': {
        '$regex':"Star Wars", 
        '$options':'i'
    }
},{
    'title':1
}).pretty()
```

## Doing logical or
Find movies directed by Steven Spielburg and before the year 1999 or directed by Charles Chaplin.

```
db.movies.find({
    '$or':[
        {
            'directors': 'Steven Spielberg',
            'year': {
                '$lt': 1999
            }
        },
        {
            'directors': 'Charles Chaplin'
        }
    ]
},{
    'title': 1,
    'directors': 1,
    'year': 1
}).pretty()
```


# Solutions to Q2

1. Show how many movies there are in the collection
    ```
    db.movies.find().count()
    ```

2. Show how many movies there in the collection before the year 2000 
    ```
    db.movies.find({
        'year': {
            '$lt': 2000
        }
    }).count()
    ```

3. First ten movies pro
   ```
   db.movies.find({
       'type':'movie',
       'countries': {
           '$in': [
               'USA'
           ]
       }
   }, {
       'title': 1
   }).pretty().limit(10)
    ```

4. Find the first ten movies not from the USA
   ```
   db.movies.find({
       'countries': {
           '$not': {
               '$in': ['USA']
           }
       }
   },{
       'title': 1,
       'countries': 1
   }).pretty().limit(10)
   ```

    Altenrative answer using `$nin`
   ```
   db.movies.find({
       'countries': {
           '$nin': ['USA']
       }
   },{
       'title':1,
       'countries':1
   }).pretty().limit(10)
   ```

5.

```
db.movies.find({
    'awards.wins': {
        '$gte': 3
    }
}, {
    'title': 1,
    'awards.wins':1
}).pretty()
```

6. Find movies at least 3 nominations
```
db.movies.find({
    'awards.nominations':{
        '$gte':3
    }
}, {
    'title': 1,
    'awards.nominations': 1
}).pretty()
```

Bonus: At least 3 wins and 3 nominations:

db.movies.find({
    'awards.nominations':{
        '$gte':3
    },
    'awards.wins':{
        '$gte':3
    }
}, {
    'title': 1,
    'awards': 1
}).pretty()

7.
```
db.movies.find({
    'cast':'Tom Cruise'
}, {
    'title': 1,
    'cast': 1
}).pretty()
```
8.
```
db.movies.find({
    'directors': {
        '$in': [
            'Charles Chaplin'
        ]
    }
},{
    'title': 1,
    'directors': 1
})
```

# Designing our Swimming Coach App

## allow the parent to book a slot for a Coach

**Sessions**
* available slots
  * venue
    * address
      * street
      * building name
      * postal code
  * coach
    * first name
    * last name
    * gender
    * awards
  * date and time

**Bookings**
* each Bookings
  * the ID of the Sessions
  * particulars of the person who booked

# Creating a Mongo Database

Let's say we are doing an animal shelter database.

Provide a listing of all the animals, and like their
health conditions, also other kind of useful information,
like their breed, age etc.

## Create a new database
```
use <name of the new database>
```

The moment we insert a document in a collection, in the db,
then it will be created.

## Insert a new document into a new collection

Just insert, even though the collection does not exist. 

```
db.animals.insert({
    'name': 'Fluffy',
    'breed': 'Golden Retriever',
    'species': 'Dog',
    'age': 3
})
```
Insert many:

```
db.animals.insertMany([
    {
        'name':'Fancy',
        'breed':'Orange Tabby',
        'species': 'Cat',
        'age': 10
    },
    {
        'name':'Carrots',
        'breed':'Bunny',
        'species':'Bunny',
        'age':2
    }
])
```

# Update

Specify WHICH document(s) to update.

If one document, must provide ID

## Update by providing a totally new document
```
db.animals.update({
    '_id':ObjectId('5fc74f19a54a20c14c7876eb')
},{
    "name": "Carrots",
    "breed": "Holland Lop",
    "species": "Bunny",
    "age": 4
})
```

## Update one or few fields in a document
```
db.animals.update({
    '_id':ObjectId('5fc74e7ca54a20c14c7876e9')
},{
    '$set':{
        'age': 4
    }
})
```

## Delete
```
db.animals.remove({
    '_id':ObjectId('5fc74e7ca54a20c14c7876e9')
})
```