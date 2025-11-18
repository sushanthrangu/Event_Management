const express = require('express');
const{isLoggedIn, isAuthor, isNotAuthor} = require('../middleware/auth');
const {fileUpload} = require('../middleware/fileUpload');
const {validateId, validateConnection, validateResult, validateRSVP} = require('../middleware/validator');



const router = express.Router();

const connectionController = require('../controllers/connectionController');

router.get('/', connectionController.index);

router.get('/new', isLoggedIn, connectionController.new);

router.post('/', isLoggedIn, validateResult,validateConnection,fileUpload, connectionController.create);

router.get('/:id', validateId, connectionController.show);

router.get('/:id/edit', validateId, isLoggedIn, isAuthor, connectionController.edit);

router.put('/:id', validateId, isLoggedIn, isAuthor,validateConnection,  validateResult, connectionController.update);

router.delete('/:id', validateId, isLoggedIn, isAuthor, connectionController.delete);

router.post('/:id/rsvp', validateId, isLoggedIn, isNotAuthor, validateRSVP, validateResult, connectionController.editRsvp);


module.exports = router;