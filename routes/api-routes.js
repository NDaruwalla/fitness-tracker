// // Require the express router and workout model
// const router = require("express").Router();
// const db = require("../models/exercise");

// // Create GET request for returning all workouts
// router.get("/api/workouts", (req, res) => {
// 	db.find()
// 		.then((dbData) => {
// 			res.json(dbData);
// 		})
// 		.catch((err) => {
// 			res.json(err);
// 		});
// });

// router.get("/api/workouts/range", (req, res) => {
// 	db.find()
// 		.then((dbData) => {
// 			res.json(dbData);
// 		})
// 		.catch((err) => {
// 			res.json(err);
// 		});
// });

// // Create POST workout
// router.post("/api/workouts", ({ body }, res) => {
// 	db.create(body)
// 		.then((dbData) => {
// 			res.json(dbData);
// 		})
// 		.catch((err) => {
// 			res.json(err);
// 		});
// });

// // Create PUT to update the workout
// router.put("/api/workouts/:id", ({ body, params }, res) => {
// 	db.findByIdAndUpdate(params.id, { $push: { exercises: body } })
// 		.then((dbData) => {
// 			res.json(dbData);
// 		})
// 		.catch((err) => {
// 			res.json(err);
// 		});
// });

// // Export the API routes
// module.exports = router;

// NEW
  
const db = require("../models");
const router = require("express").Router();

//commnet in to prepopulate database
// db.Workout.find({}).then(function (res) {
//     console.log("Checking if db is populated");
//     if (res.length === 0) {
//         console.log("DB is empty");
//         require("./seeders/seed.js");
//     }
// });

//get workouts
router.get("/api/workouts", (req, res) => {

    db.Workout.find({}).then(dbWorkout => {
        // console.log("ALL WORKOUTS");
        // console.log(dbWorkout);
        dbWorkout.forEach(workout => {
            var total = 0;
            workout.exercises.forEach(e => {
                total += e.duration;
            });
            workout.totalDuration = total;

        });

        res.json(dbWorkout);
    }).catch(err => {
        res.json(err);
    });
});

// add exercise
router.put("/api/workouts/:id", (req, res) => {

    db.Workout.findOneAndUpdate(
        { _id: req.params.id },
        {
            $inc: { totalDuration: req.body.duration },
            $push: { exercises: req.body }
        },
        { new: true }).then(dbWorkout => {
            res.json(dbWorkout);
        }).catch(err => {
            res.json(err);
        });

});

//create workout
router.post("/api/workouts", ({ body }, res) => {
    // console.log("WORKOUT TO BE ADDED");
    // console.log(body);

    db.Workout.create(body).then((dbWorkout => {
        res.json(dbWorkout);
    })).catch(err => {
        res.json(err);
    });
});

// get workouts in range
router.get("/api/workouts/range", (req, res) => {

    db.Workout.find({}).then(dbWorkout => {
        console.log("ALL WORKOUTS");
        console.log(dbWorkout);

        res.json(dbWorkout);
    }).catch(err => {
        res.json(err);
    });

});


module.exports = router;