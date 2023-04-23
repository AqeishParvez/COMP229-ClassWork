import {Router} from "express";
import { Add, Delete, Edit, Get, GetList, GetMany } from "../../controllers/api/survey-results-api.js";

//Import survey controller functions here...

const router = Router();

//We are now effectively using the HTTP Verbs GET, POST, PUT, DELETE
//REST API Methodology

router.get('/list', GetList);
router.get('/list/:id', GetMany);
router.get(':id', Get); //removed the backslash because it resulted in favicon error repeatidly
router.post('/add', Add);
router.put('/edit/:id', Edit);
router.delete('/delete/:id', Delete);

export default router;