import { Router} from 'express';
import { DisplayContactList, DisplayContactsAddPage, DisplayContactsEditPage, ProcessContactsDelete, ProcessContactsAddPage, ProcessContactsEditPage } from '../controllers/businesscontacts.js';
import { AuthGuard } from '../utils/index.js';

const router = Router();

//R ead
router.get('/business-contact-list', AuthGuard, DisplayContactList);

//C reate
router.get('/business-contact-add', AuthGuard, DisplayContactsAddPage);
router.post('/business-contact-add', AuthGuard, ProcessContactsAddPage);

//U pdate
router.get('/business-contact-edit/:id', AuthGuard, DisplayContactsEditPage);
router.post('/business-contact-edit/:id', AuthGuard, ProcessContactsEditPage);

//D elete
router.get('/business-contact-delete/:id', AuthGuard, ProcessContactsDelete);

export default router;