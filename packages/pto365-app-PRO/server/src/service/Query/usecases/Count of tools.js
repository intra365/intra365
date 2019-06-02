db.getCollection("data").aggregate(

	// Pipeline
	[
		// Stage 1
		{
			$match: {
			"tenant":"hexatown.com",
			"__type": "Usecase"
			}
		},

		// Stage 2
		{
			$unwind: { "path": "$tools"}
		},

		// Stage 3
		{
			$project: {
			    toolname:"$tools.name" // specifications
			}
		},

		// Stage 4
		{
			$group: {
			            _id: {
			                name : "$toolname"
			            },
			            count: {
			                $sum: 1
			            }
			}
		},

	]

	// Created with Studio 3T, the IDE for MongoDB - https://studio3t.com/

);
