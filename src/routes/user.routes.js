const express = require('express');
const router = express.Router();
const userController = require('../controllers/user.controller')
const auth  = require('../middleware/auth.middleware')

// ==> Rota responsavel por criar o novo 'User': (POST) localhost:3000/api/v1/register
router.post('/register', userController.registerNewUser);

// ==> Rota responsavel por fazer o login de usuarios e verifica;'ao: (POST) localhost:3000/api/v1/login
router.post('/login', userController.loginUser)


// ==> Rota responsavel por acessar o perfil do usuario: (GET) localhost:3000/api/v1/userProfile
router.get('/profile', auth, userController.returnUserProfile)

router.post('/validate-token', auth, (req, res)=>{
    return res.json({ isAuthenticated: true, ok: true, isValid:  true })
})

// ==> Rota responsavel por atualizar o perfil do usuario: (PUT) localhost:3000/api/v1/user/update/:id
router.put('/user/update/:id', auth, userController.updateUserProfile);

module.exports = router