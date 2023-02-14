import businessContactsModel from '../models/businesscontacts.js';
import { UserDisplayName } from "../utils/index.js";


//R ead operations
export function DisplayContactList(req, res, next){
    businessContactsModel.find(function (error, businessContactsCollection){
        if(error){
            console.error(error);
            res.end(error);
        }

        console.log(businessContactsCollection);

        res.render('index', {title: 'Business Contacts List', page: 'businesscontacts/list', businesscontacts: businessContactsCollection, displayName: UserDisplayName(req)})
    })
}


//C reate operations
export function DisplayContactsAddPage(req, res, next){
    res.render('index', {title: 'Add Contact', page: 'businesscontacts/edit', businesscontact: {}, displayName: UserDisplayName(req)})
}

export function ProcessContactsAddPage(req, res, next){
    let newContact = businessContactsModel({
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        address: req.body.address,
        city: req.body.city,
        province: req.body.province,
        postalcode: req.body.postalcode,
        phonenumber: req.body.phonenumber,
        email: req.body.email,
    });

    businessContactsModel.create(newContact, function(error, businesscontact){
        if(error){
            console.error(error);
            res.end(error);
        }

        res.redirect('/business-contact-list');

    })
}

//U pdate operations
export function DisplayContactsEditPage(req, res, next){

    let id = req.params.id;

    businessContactsModel.findById(id, function(error, businesscontact){
        if(error){
            console.error(error);
            res.end(error);
        }

        res.render('index', {title: 'Edit Contact', page: 'businesscontacts/edit', businesscontact, displayName: UserDisplayName(req)})
    })
    
}

export function ProcessContactsEditPage(req, res, next){

    let id = req.params.id;

    let newContact = businessContactsModel({
        _id: req.body.id,
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        address: req.body.address,
        city: req.body.city,
        province: req.body.province,
        postalcode: req.body.postalcode,
        phonenumber: req.body.phonenumber,
        email: req.body.email,
    });

    businessContactsModel.updateOne({_id: id}, editContact, function(error, BusinessContact){
        if(error){
            console.error(error);
            res.end(error);
        }

        res.redirect('/business-contact-list');

    })
}

//D elete operations
export function ProcessContactsDelete(req, res, next){
    let id = req.params.id

    businessContactsModel.remove({_id: id}, function(error){
        if(error){
            console.error(error);
            res.end(error);
        }

        res.redirect('/business-contact-list');

    })
}