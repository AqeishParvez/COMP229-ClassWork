import surveyModel from '../models/surveys.js';
import { UserDisplayName } from "../utils/index.js";


//R ead operations
export function DisplaySurveyList(req, res, next){
    surveyModel.find(function (error, surveyCollection){
        if(error){
            console.error(error);
            res.end(error);
        }

        console.log(surveyCollection);

        res.render('index', {title: 'Survey List', page: 'surveys/list', surveys: surveyCollection, displayName: UserDisplayName(req)})
    })
}


//C reate operations
export function DisplaySurveysAddPage(req, res, next){
    res.render('index', {title: 'Add Survey', page: 'surveys/edit', survey: {}, displayName: UserDisplayName(req)})
}

export function ProcessSurveysAddPage(req, res, next){
    let newSurvey = surveyModel({
        name: req.body.name,
        surveyId: req.body.surveyId,
        json: req.body.json
    });

    surveyModel.create(newSurvey, function(error, Survey){
        if(error){
            console.error(error);
            res.end(error);
        }

        res.redirect('/survey-list');

    })
}

//U pdate operations
export function DisplaySurveysEditPage(req, res, next){

    let id = req.params.id;

    surveyModel.findById(id, function(error, survey){
        if(error){
            console.error(error);
            res.end(error);
        }

        res.render('index', {title: 'Edit Survey', page: 'surveys/edit', survey, displayName: UserDisplayName(req)})
    })
    
}

export function ProcessSurveysEditPage(req, res, next){

    let id = req.params.id;

    let newSurvey = surveyModel({
        _id: req.body.id,
        name: req.body.name,
        surveyId: req.body.surveyId,
        json: req.body.json
    });

    surveyModel.updateOne({_id: id}, editSurvey, function(error, Survey){
        if(error){
            console.error(error);
            res.end(error);
        }

        res.redirect('/survey-list');

    })
}

//D elete operations
export function ProcessSurveysDelete(req, res, next){
    let id = req.params.id

    surveyModel.remove({_id: id}, function(error){
        if(error){
            console.error(error);
            res.end(error);
        }

        res.redirect('/survey-list');

    })
}