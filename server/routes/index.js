import express from 'express';
import userController from '../controllers/userControllers';
import adminController from '../controllers/adminControllers';
import validators from '../middlewares/validators';

const router = express.Router();
router.post('/admin/signup', validators.validateAdmin, adminController.adminSignUp);
router.post('/admin/bills', validators.validateToken, validators.validateBillInput, adminController.createBill);
router.post('/admin/addpermission', validators.validateToken, adminController.addPermission);
router.put('/admin/bills/:billId', validators.validateToken, validators.validateBillInput, adminController.editBill);
router.delete('/api/v1/admin/bills/:billId', validators.validateToken, adminController.deleteBill);
router.get('/admin/users', validators.validateToken, adminController.getAllUsers);
router.post('/user/signup', userController.signUp);
router.post('/user/signin', userController.signIn);
router.post('/bill/upvotes/:billId', validators.validateToken, userController.upVoteBill);
router.post('/bill/downvotes/:billId', validators.validateToken, userController.downVoteBill);
router.post('/bill/:billId/opinions', validators.validateToken, userController.addOpinion);
router.post('/bills/search', validators.validateToken, userController.searchBills);
router.put('/user/updateprofile', validators.validateToken, userController.updateUserProfile);
router.get('/user/votedbills', validators.validateToken, userController.fetchUserVotedBill);
router.get('/bill/:billId/opinions', validators.validateToken, userController.fetchOpinion);
router.get('/bills/:billId', validators.validateToken, userController.getABill);


export default router;
