//Example : 1
db.inventory.find()
db.inventory.find({})
db.inventory.find({"year":1983})
db.inventory.find({"year1":"123"})
db.inventory.find({"shape":{$in : ['round',"circle"]}})
db.inventory.find({"genres":{$in : ['Comedy',"Romance"]}})
db.inventory.find(
  {"genres":{$in : ['Comedy',"Romance"]}}
)

db.inventory.find(
  {"genres":{$in : ['Comedy',"Romance"]}},
  {"genres":1, "name":1}
)


db.inventory.find(
  {"genres":{$in : ['Comedy',"Romance"]}},
  {"genres":1, "name":1,"year":1}
)
.sort({"year":1})

//example : genres: ("Romance"  or  year: 1983 ) . all data
db.inventory.find({
  $or: [
    { "genres":{$in : ['Comedy',"Romance"]} },
    { year: 1983 }
  ]
})

//example : genres: ("Romance"  or  year: 1983 ) . name , genres
db.inventory.find({
    $or: [
      { "genres":{$in : ['Comedy',"Romance"]} },
      { "year": 1983 }
    ]
  },
  {"name" :1 , "genres":1}
)

//example : ( genres: "Romance"  and  year: 1983 )  OR (shape = "round" and year: 1983)
db.inventory.find({
 $or:[
    {
      $and :[{genres: "Romance" ,  year: 1983}] 
    },
    {
      $and :[{shape: "round" ,  year: 1983}] 
    },
    ]
})

db.inventory.find({
  $or: [
    { $and: [ { genres: "Romance" }, { year: 1983 } ] },
    { $and: [ { shape: "round" }, { year: 1990 } ] }
  ]
},{genres:1, year:1, shape:1 , _id:0})


db.inventory.find({
  $or: [
    { $and: [ { genres: "Romance",  year: 1983 } ] },
    { $and: [ { shape: "round" , year: 1990 } ] }
  ]
},{genres:1, year:1, shape:1 , _id:0})

//example : genres: ("Romance"  or  year: 1983 ) and shape = "round"
db.movies.find({
  $and: [
    {
      $or: [
        { "genres": "Romance" },
        { "year": 1983 }
      ]
    },
    { "shape": "round" }
  ]
})


//Example : 2
