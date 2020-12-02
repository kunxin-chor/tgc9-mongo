// 1. use database
// assume database already exists
use fake_school;

db.students.insert({
    "name":"Jane Doe",
    "age": 13,
    "subjects": [
        "Defense Against the Dark Arts",
        "Charms",
        "History of Magic"
    ]
})

db.students.insertMany([
    {
        'name':"James Verses",
        'age': 14,
        'subjects':[
            'Transfiguration',
            'Alchemy'
        ]
    },
    {
        'name':'Jonathon Goh',
        'age': 12,
        'subjects':[
            'Divination',
            'Study of Ancient Runes'
        ]
    }
]);