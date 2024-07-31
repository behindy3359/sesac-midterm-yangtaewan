const express =require('express');
const controller = require('../controller/Ctodo');
const router = express.Router();

router.get('/todos',controller.todoGet);
router.post('/todos',controller.todoPost)
router.get('/todos/:id',controller.todoGetById);
router.patch('/todos/:id',controller.todoPatch);
router.delete('/todos/:id',controller.todoDelete);

module.exports = router;