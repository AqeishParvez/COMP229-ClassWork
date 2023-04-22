import { json } from 'express';
import surveyResultsModel from '../../models/survey-results.js'


//R ead operations
export function GetList(req, res, next){
    surveyResultsModel.find(function (error, surveyResultsCollection){
        if(error){
            console.error(error);
            res.end(error);
        }

        console.log(surveyResultsCollection);

        res.json({success: true, msg: 'Success', surveyResults: surveyResultsCollection, user: req.user})
    })
}

//R ead operations
export function GetMany(req, res){
    let id = req.params.id;

    var results = [];
    surveyResultsModel.find({}).exec((error, resultsArray) => {
        if(error){
            console.error(error);
            res.end(error);
        }

        resultsArray.forEach((singleResult) => {
            if(singleResult.surveyId===id){
                //console.log(meme.json);
                results.push(singleResult.json);
                console.log(results);
            }
        });

        res.json({success: true, msg: 'Success Many', surveyResults: results, user: req.user})
    });

    // surveyResultsModel.find({'surveyId': id}, {"json":1, "_id":0}, {$objectToArray: "$json"} ,function (error, surveyResultsCollection){
    // if(error){
    //     console.error(error);
    //     res.end(error);
    // }

    // console.log(surveyResultsCollection);

    // res.json({success: true, msg: 'Success Many', surveyResults: surveyResultsCollection, user: req.user})
    // })



}

export function Get(req, res){
    let id = req.params.id;
    console.log(id);

    surveyResultsModel.findById(id, function (error, surveyResults){
        if(error){
            console.error(error);
            res.end(error);
        }

        console.log(survey);

        res.json({success: true, msg: 'Success', surveyResults, user: req.user}) 
    })
}

export function Add(req, res, next){
    console.log(req.body);
    let newSurveyResults = surveyResultsModel({
       ...req.body
    });

    surveyResultsModel.create(newSurveyResults, function(error){
        if(error){
            console.error(error);
            res.end(error);
        }

        res.json({success: true, msg: 'Success', newSurveyResults, user: req.user})

    })
}

//U pdate operations

export function Edit(req, res, next){

    let id = req.params.id;

    let editSurveyResults = surveyResultsModel({
        "_id": id,
        ...req.body
    });

    surveyResultsModel.updateOne({_id: id}, editSurveyResults, function(error){
        if(error){
            console.error(error);
            res.end(error);
        }

        res.json({success: true, msg: 'Success', editSurveyResults, user: req.user})

    })
}

//D elete operations
export function Delete(req, res, next){
    let id = req.params.id

    surveyResultsModel.remove({_id: id}, function(error){
        if(error){
            console.error(error);
            res.end(error);
        }

        res.json({success: true, msg: 'Delete Successful'});

    })
}