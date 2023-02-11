import { Router} from 'express';
import { DisplayMoviesAddPage, DisplayMoviesList, DisplayMoviesEditPage, ProcessMoviesAddPage, ProcessMoviesDelete, ProcessMoviesEditPage } from '../controllers/movies.js';

const router = Router();

//R ead
router.get('/movie-list', DisplayMoviesList);

//C reate
router.get('/movie-add', DisplayMoviesAddPage);
router.post('/movie-add', ProcessMoviesAddPage);

//U pdate
router.get('/movie-edit/:id', DisplayMoviesEditPage);
router.post('/movie-edit/:id', ProcessMoviesEditPage);

//D elete
router.get('/movie-delete/:id', ProcessMoviesDelete);

export default router;