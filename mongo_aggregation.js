//Example : 1
db.inventory.aggregate([
  {$match: {"genres":{$in : ['Comedy',"Romance"]}}}
])
db.inventory.aggregate([
  { $match: { genres: { $in: ['Comedy', 'Romance'] } } }
])

//Example : 2
