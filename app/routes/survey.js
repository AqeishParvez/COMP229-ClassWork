import { Router} from 'express';
import { DisplaySurveyList, DisplaySurveysAddPage, DisplaySurveysEditPage, ProcessSurveysAddPage, ProcessSurveysDelete, ProcessSurveysEditPage } from '../controllers/surveys.js';
import { AuthGuard } from '../utils/index.js';

const router = Router();

//R ead
router.get('/survey-list', AuthGuard, DisplaySurveyList);

//C reate
router.get('/survey-add', AuthGuard, DisplaySurveysAddPage);
router.post('/survey-add', AuthGuard, ProcessSurveysAddPage);

//U pdate
router.get('/survey-edit/:id', AuthGuard, DisplaySurveysEditPage);
router.post('/survey-edit/:id', AuthGuard, ProcessSurveysEditPage);

//D elete
router.get('/survey-delete/:id', AuthGuard, ProcessSurveysDelete);

export default router;