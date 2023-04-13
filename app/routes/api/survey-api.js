import {Router} from "express";
import { Add, Delete, Edit, Get, GetList } from "../../controllers/api/movies-api.js";

//Import movies controller functions here...

const router = Router();

//We are now effectively using the HTTP Verbs GET, POST, PUT, DELETE
//REST API Methodology
router.get('/list', GetList);
router.get('/:id', Get);
router.post('/add', Add);
router.put('/edit/:id', Edit);
router.delete('/delete/:id', Delete);

export default router;