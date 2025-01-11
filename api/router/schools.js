const express = require("express");
const router = express.Router();

// Import autoryzacji
const checkAuth = require("../middleware/checkAuth");

// Import kontrolera
const SchoolController = require("../controllers/schools");

// Endpointy
router.get("/", SchoolController.schools_get_all);

router.get("/:schoolId", SchoolController.schools_get_by_id);

router.post("/", checkAuth, SchoolController.schools_add_new);

router.put("/:schoolId", checkAuth, SchoolController.schools_update);

router.patch('/:schoolId', SchoolController.schools_patch); 

router.delete("/:schoolId", checkAuth, SchoolController.schools_delete);

router.head("/:schoolId", checkAuth, SchoolController.schools_head);

router.options('/:schoolId', (req, res) => {
    res.setHeader('Allow', 'GET, POST, PUT, PATCH, DELETE, OPTIONS, HEAD');
    res.status(204).send();
});

router.options('/:schoolId', SchoolController.handleOptions);


module.exports = router;