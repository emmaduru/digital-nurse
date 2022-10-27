const router = require("express").Router();
const {add_patient_page, add_patient, edit_patient_page, edit_patient, add_patient_observation_page, add_patient_observation, add_patient_note, add_patient_note_page, add_patient_handover_page, add_patient_handover, patient_detail, all_patients} = require("../controllers/patient");
const {protect} = require("../middleware/authMiddleware");

router.route("/").get(protect, all_patients);
router.route("/add").get(protect, add_patient_page).post(protect, add_patient);
router.route("/:id").get(protect, patient_detail)
router.route("/:id/edit").get(protect, edit_patient_page).put(protect, edit_patient);
router.route("/:id/add_obs").get(protect, add_patient_observation_page).post(protect, add_patient_observation);
router.route("/:id/add_note").get(protect, add_patient_note_page).post(protect, add_patient_note);
router.route("/:id/add_handover").get(protect, add_patient_handover_page).post(protect, add_patient_handover)

module.exports = router;