
var json = require("format-json")
require("../../connect")
var File = require("../../models/file").model

var q = 
// Pipeline
[
	// Stage 1
	{
		$match: {
		}
	},


	// Stage 3
	{
		$project: {
			tenant:"tenant",
			type:"__type"
		}
	},

	// Stage 4
	{
		$group: {
					_id: {
						
						type : "tenant"
					},
					count: {
						$sum: 1
					}
		}
	}

]

File.db.collections.data.aggregate(q, {}, (error, cursor) => {
    if (error) {
        return console.log(error)
    }
    cursor.toArray()
        .then((data) => {
            data.forEach(element => {
                console.log(element._id.name,element.count)
            });
            //console.log(json.plain(data))
            process.exit(0)
        })
        .catch((err) => {
            console.log(err)
            process.exit(1)
        })



})