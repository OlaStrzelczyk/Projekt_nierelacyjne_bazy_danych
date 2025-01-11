const express = require("express"); 
const router = express.Router();

// autoryzacja
const checkAuth = require("../middleware/checkAuth");

// importuję kontroler
const TrainerController = require("../controllers/trainers");

// Endpointy
router.get("/", checkAuth, TrainerController.trainers_get_all);

router.get("/:trainerId", checkAuth, TrainerController.trainers_get_by_id);

router.post("/", checkAuth, TrainerController.trainers_add_new);

router.put("/:trainerId", checkAuth, TrainerController.trainers_update);

router.patch('/:trainerId', checkAuth, TrainerController.trainers_patch); 

router.delete("/:trainerId", checkAuth, TrainerController.trainers_delete);

router.head("/:trainerId", checkAuth, TrainerController.trainers_head);

router.options('/:trainerId', (req, res) => {
    res.setHeader('Allow', 'GET, POST, PUT, PATCH, DELETE, OPTIONS, HEAD');
    res.status(204).send(); 
});

router.options('/:trainerId', checkAuth, TrainerController.handleOptions);


module.exports = router;