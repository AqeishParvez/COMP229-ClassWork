import {Router} from "express";
import { Add, Delete, Edit, Get, GetList } from "../../controllers/api/survey-api.js";

//Import survey controller functions here...

const router = Router();

//We are now effectively using the HTTP Verbs GET, POST, PUT, DELETE
//REST API Methodology

router.get('/list', GetList);
router.get('/:id', Get);
router.post('/add', Add);
router.put('/edit/:id', Edit);
router.delete('/delete/:id', Delete);

//code no longer used may use later
// router.get('/getActive', GetList);
// router.get('/getSurvey', Get);
// router.get('/create', Add);
// router.post('/changeJson', Edit);
// router.post('/post', PostResults);
// router.get('/results', GetResults);
// router.get('/delete', Delete);
// router.get(["/", "/about", "/run/*", "/edit/*", "/results/*"], SendFile);

export default router;