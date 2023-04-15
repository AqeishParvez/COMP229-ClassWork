import surveyModel from "../models/surveys.js"

var currentId;

var count = surveyModel.countDocuments({}, function(err, docCount) {
  if (err) { return handleError(err) }
  console.log(docCount)
  currentId = docCount;
  console.log(currentId);
});

function InMemoryDBAdapter() {
  function getTable(tableName) {
    var table = surveyModel[tableName];
    if (!table) {
      table = [];
      surveyModel[tableName] = table;
    }
    return table;
  }

  function getObjectsFromStorage(tableName, callback) {
    // var objects = {};
    var table = surveyModel.surveys;
    callback(table);
    // table.forEach(function(item) {
    //   objects[item.name] = item;
    // });
    // callback(objects);
  }

  function findById(id) {
    var survey = surveyModel.findById(id, function (error, survey){
      if(error){
          console.error(error);
          res.end(error);
      }

      console.log(survey);

      //res.json({success: true, msg: 'Success', movie, user: req.user}) 
    })
    return survey;
  }

  function addSurvey(name, callback) {
    var newObj = {
      name: name || "New Survey " + currentId,
      json: "{}"
    };
    surveyModel.create(newObj, function(error){
      if(error){
          console.error(error);
          res.end(error);
      }

      //res.json({success: true, msg: 'Success', newObj, user: req.user})

     });
  }

  function postResults(postId, json, callback) {
    var table = getTable("results");
    var results = findById(table, postId);
    if (!results) {
      results = {
        id: postId,
        data: []
      }
      table.push(results);
    }
    results.data.push(json);
    callback({});
  }

  function getResults(postId, callback) {
    var table = getTable("results");
    var results = findById(table, postId);
    callback(results);
  }

  function deleteSurvey(surveyId, callback) {

    var survey = findById(surveyId);

    surveyModel.deleteOne({_id: surveyId}, function(error){
        if(error){
            console.error(error);
            res.end(error);
        }

        //res.json({success: true, msg: 'Delete Successful'});

    })
    
    callback(survey);
  }

  function storeSurvey(id, name, json, callback) {
    var survey = findById(id);
    if (!!survey) {
      survey.json = json;
    } else {
      survey = {
        "_id": id,
        name: name || id,
        json: json
      };
  
      surveyModel.updateOne({_id: id}, survey, function(error){
          if(error){
              console.error(error);
              res.end(error);
          }
  
          //res.json({success: true, msg: 'Success', editMovie, user: req.user})
  
      });
    }
    callback && callback(survey);
  }

  function changeName(id, name, callback) {
    var table = getTable("surveys");
    var survey = findById(table, id);
    if (!!survey) {
      survey.name = name;
    }
    callback && callback(survey);
  }

  function getSurvey(surveyId, callback){
      var survey = findById(surveyId);
      callback(survey);
  }

  function getSurveys(callback) {

      surveyModel.find(function (error, surveyCollection){
        if(error){
            console.error(error);
            res.end(error);
        }

        console.log(surveyCollection);
        callback(surveyCollection);

        //res.json({success: true, msg: 'Success', movies: movieCollection, user: req.user})
      })
      // if (currentId > 0) {
      //   callback(objects);
      // } else {
      //   var surveys = getTable("surveys");
      //   surveyModel.surveys.forEach(function (survey) {
      //     surveys.push(JSON.parse(JSON.stringify(survey)));
      //   })
      //   var results = getTable("results");
      //   surveyModel.results.forEach(function (result) {
      //     results.push(JSON.parse(JSON.stringify(result)));
      //   })
      //   getObjectsFromStorage("surveys", callback);
      // }
  }

  return {
    addSurvey: addSurvey,
    getSurvey: getSurvey,
    storeSurvey: storeSurvey,
    getSurveys: getSurveys,
    deleteSurvey: deleteSurvey,
    postResults: postResults,
    getResults: getResults,
    changeName: changeName
  };
}

export default InMemoryDBAdapter;
