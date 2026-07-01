const exporess = require('express');
const router = exporess.Router();

const {registerUser, loginUser} = require('../controllers/authControllers');

router.post('/register', registerUser);
router.post('/login', loginUser);

module.exports = router;