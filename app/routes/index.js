//File Name: index.js, Student Name: Aqeish Parvez, Student ID: 301225795, Date: February 4th, 2023
import { Router } from "express";
import { displayHomePage, displayAboutPage, displayContactPage, displayProjectsPage, displayServicesPage} from "../controllers/index.js";

const router = Router();

router.get('/', displayHomePage);
router.get('/home', displayHomePage);
router.get('/about', displayAboutPage);
router.get('/contact', displayContactPage);
router.get('/projects', displayProjectsPage);
router.get('/services', displayServicesPage);


export default router;