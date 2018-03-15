import express from 'express';
import userController from '../controllers/userControllers';
import adminController from '../controllers/adminControllers';
import validators from '../middlewares/validators';

const router = express.Router();

// admin route
router.post('/admin/signup', validators.validateAdmin, adminController.adminSignUp);
router.post('/admin/bills', validators.validateToken, validators.validateBillInput, adminController.createBill);
router.post('/admin/addpermission', validators.validateToken, adminController.addPermission);
router.put('/admin/bills/:billId', validators.validateToken, validators.validateBillInput, adminController.editBill);
router.delete('/admin/bills/:billId', validators.validateToken, adminController.deleteBill);
router.get('/admin/users', validators.validateToken, adminController.getAllUsers);

// users route
router.post('/user/signup', userController.signUp);
router.post('/user/signin', userController.signIn);
router.get('/user/:userId', validators.validateToken, userController.getAUser);
router.get('/user/votedbills', validators.validateToken, userController.fetchUserVotedBill);
router.put('/user/updateprofile', validators.validateToken, userController.updateUserProfile);

// bills route
router.post('/bill/upvotes/:billId', validators.validateToken, userController.upVoteBill);
router.post('/bill/downvotes/:billId', validators.validateToken, userController.downVoteBill);
router.post('/bill/:billId/opinions', validators.validateToken, userController.addOpinion);
router.post('/bills/search', validators.validateToken, userController.searchBills);
router.get('/bill/:billId/opinions', validators.validateToken, userController.fetchOpinion);
router.get('/bills/:billId', validators.validateToken, userController.getABill);
router.get('/bills', validators.validateToken, userController.getAllBills);


export default router;
