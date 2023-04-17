import InMemoryDBAdapter from '../inmemorydbadapter.js';
import surveyModel from '../../models/surveys.js'


//R ead operations
export function GetList(req, res, next){
    surveyModel.find(function (error, surveyCollection){
        if(error){
            console.error(error);
            res.end(error);
        }

        console.log(surveyCollection);

        res.json({success: true, msg: 'Success', surveys: surveyCollection, user: req.user})
    })
}

export function Get(req, res, next){
    let id = req.params._id;

    surveyModel.findById(id, function (error, survey){
        if(error){
            console.error(error);
            res.end(error);
        }

        console.log(survey);

        res.json({success: true, msg: 'Success', survey, user: req.user}) 
    })
}

export function Add(req, res, next){
    console.log(req.body);
    let newSurvey = surveyModel({
       ...req.body
    });

    surveyModel.create(newSurvey, function(error){
        if(error){
            console.error(error);
            res.end(error);
        }

        res.json({success: true, msg: 'Success', newSurvey, user: req.user})

    })
}

//U pdate operations

export function Edit(req, res, next){

    let id = req.params.id;

    let editSurvey = surveyModel({
        "_id": id,
        ...req.body
    });

    surveyModel.updateOne({_id: id}, editSurvey, function(error){
        if(error){
            console.error(error);
            res.end(error);
        }

        res.json({success: true, msg: 'Success', editSurvey, user: req.user})

    })
}

//D elete operations
export function Delete(req, res, next){
    let id = req.params.id

    surveyModel.remove({_id: id}, function(error){
        if(error){
            console.error(error);
            res.end(error);
        }

        res.json({success: true, msg: 'Delete Successful'});

    })
}

//Code no longer in use but may need later

// var currentId;

// var count = surveyModel.countDocuments({}, function(err, docCount) {
//   if (err) { return handleError(err) }
//   console.log(docCount)
//   currentId = docCount;
//   console.log(currentId);
// });

// //Get dbAdapter
// var db = new InMemoryDBAdapter();

// //Send results
// export function sendJsonResult(res, obj) {
//     res.setHeader("Content-Type", "application/json");
//     res.send(obj);
// }

// //R ead operations
// export function GetList(req, res) {
//   surveyModel.find(function (error, surveyCollection){
//     if(error){
//         console.error(error);
//         res.end(error);
//     }

//     console.log(surveyCollection);
//     //res.json({success: true, msg: 'Success', surveys: surveyCollection})
//     sendJsonResult(res, surveyCollection);
//   })
// }

// export function Get(req, res) {
//       let id = req.query["surveyId"];
//       console.log(req.query)
//       console.log(id);

//       let survey = surveyModel.find({surveyId: id}).limit(1).exec(function(err, survey){
//         if(err) console.log("Error: " + JSON.stringify(err));
//         else if(survey) console.log("Survey Returned is : " + survey);
//       });
//       console.log(survey.name);
        
//         // id, function (error, survey){
//         //   if(error){
//         //       console.error(error);
//         //       res.end(error);
//         //   }

//         //   console.log(survey);

//         //   //res.json({success: true, msg: 'Success', survey}) 
//           sendJsonResult(res, survey);
//         // })
// };

// export function Add(req, res) {
//     var name = req.body.name;
//     var newObj = {
//       id: '' + currentId++,
//       surveyId: '' + currentId++,
//       name: name || "New Survey " + currentId,
//       ...req.body
//     };

//     surveyModel.create(newObj, function(error){
//       if(error){
//           console.error(error);
//           res.end(error);
//       }

//       //res.json({success: true, msg: 'Success', newObj})
//       sendJsonResult(res, newObj);

//      });
// };

// export function PostResults(req, res) {
//     var postId = req.body.postId;
//     var surveyResult = req.body.surveyResult;
//     db.postResults(postId, surveyResult, function (result) {
//       sendJsonResult(res, result.json);
//     });
// };

// export function GetResults(req, res) {
//     var postId = req.query["postId"];
//     db.getResults(postId, function (result) {
//       sendJsonResult(res, result);
//     });
// };

// export function SendFile(req, res, next) {
//     res.sendFile("index.html", { root: __dirname + "/public" });
// }

// //U pdate operations

// export function ChangeName(req, res) {
//     var id = req.params.id;
//     var name = req.body.name;
//     db.changeName(id, name, function (result) {
//       sendJsonResult(res, result);
//     });
// }

// export function Edit(req, res) {
//       console.log(req);
//       var id = req.body.id;
//       var json = req.body.json;
//       console.log(id);
//       console.log(json);

//       let survey = surveyModel.find().select({surveyId: id});

//       console.log(survey);

//       var surveyDefaultId = survey._id;
//       let editSurvey = surveyModel({
//         "_id": surveyDefaultId,
//         json: json,
//         ...req.body
//       });

//       if (!!survey) {

//         surveyModel.updateOne({_id: surveyDefaultId}, editSurvey, function(error){
//           if(error){
//               console.error(error);
//               res.end(error);
//           }

//           //res.json({success: true, msg: 'Success', editMovie})
//       });
//       } else {
//         editSurvey = {
//           surveyId: id,
//           name: null || id,
//           json: json
//         };
//       }

//       sendJsonResult(res, editSurvey);

// };

// //D elete operations
// export function Delete(req, res) {
//     let id = req.query["id"];
//     console.log(req);
//     console.log(id);
//     surveyModel.deleteOne({"surveyId": id}, function(error){
//       if(error){
//           console.error(error);
//           res.end(error);
//       }

//       //res.json({success: true, msg: 'Delete Successful'});
//       sendJsonResult(res, {id: id})

//   })
// };