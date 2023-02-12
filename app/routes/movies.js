import { Router} from 'express';
import { DisplayMoviesAddPage, DisplayMoviesList, DisplayMoviesEditPage, ProcessMoviesAddPage, ProcessMoviesDelete, ProcessMoviesEditPage } from '../controllers/movies.js';
import { AuthGuard } from '../utils/index.js';

const router = Router();

//R ead
router.get('/movie-list', AuthGuard, DisplayMoviesList);

//C reate
router.get('/movie-add', AuthGuard, DisplayMoviesAddPage);
router.post('/movie-add', AuthGuard, ProcessMoviesAddPage);

//U pdate
router.get('/movie-edit/:id', AuthGuard, DisplayMoviesEditPage);
router.post('/movie-edit/:id', AuthGuard, ProcessMoviesEditPage);

//D elete
router.get('/movie-delete/:id', AuthGuard, ProcessMoviesDelete);

export default router;