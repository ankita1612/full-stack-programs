//Example : 1
db.inventory.insertOne(
{
    name: "Neapolitan pizza", 
    shape: "round", 
    title: "Charade",
    genres: ["Comedy", "Romance", "Thriller"],
    year: 1963,
    cast: ["Cary Grant", "Audrey Hepburn", "Walter Matthau"],
    size: { h:28, w:100 , z :1000}
})

//Example : 2
db.inventory.insertMany(
[
    {
        "name": "ankita", 
        "shape": "circle", 
        "title": "this is ankita's doc",
        "genres": ["Suspense"],
        "year": 1983,
        "cast": ["mihir","nitin","sita"],
        "size": { "h":100}
     },
     {
        "name": "margini", 
        "shape": "round", 
        "title": "this is magini's doc",
        "genres": ["Comedy", "Romance"],
        "year": 1990,
        "cast": ["nikhil","janki"],
        "size": { "w":100 , "h":1000}
     }
])

//Example : 3
db.inventory.bulkWrite([
    { "insertOne": {  document: {
        "name": "margini", 
        "shape": "round", 
        "title": "this is magini's doc",
        "genres": ["Comedy", "Romance"],
        "year": 1990,
        "cast": ["nikhil","janki"],
        "size": { "w":100 , "h":1000}
     } } },
    { "updateOne": { filter: { "name": "ankita" }, update: { $set: { "year": 1111 } } } },    

    { "deleteOne": { filter: { "name": "aaa" } } },
    
  ]);