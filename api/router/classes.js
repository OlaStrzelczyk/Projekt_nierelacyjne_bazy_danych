const express = require("express");
const router = express.Router();

// autoryzacja
const checkAuth = require("../middleware/checkAuth");

// importuję kontroler
const ClassController = require("../controllers/classes");

// Endpointy
router.get("/", ClassController.classes_get_all);

router.get("/:classId/reviews", ClassController.classes_get_reviews);

router.get("/:classId", ClassController.classes_get_by_id);

router.post("/", checkAuth, ClassController.classes_add_new);

// Dodaj opinię do zajęć tanecznych
router.post('/:classId/reviews', checkAuth, ClassController.classes_add_review);

router.put("/:classId", checkAuth, ClassController.classes_update);

router.patch('/:classId', ClassController.classes_patch); 

router.delete("/:classId", checkAuth, ClassController.classes_delete);

router.head("/:classId", checkAuth, ClassController.classes_head);

// Usunięcie podwójnej definicji OPTIONS
router.options('/:classId', ClassController.handleOptions);

module.exports = router;