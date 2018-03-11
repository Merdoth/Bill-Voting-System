import express from 'express';
import userController from '../controllers/userControllers';
import adminController from '../controllers/adminControllers';
import validators from '../middlewares/validators';

const router = express.Router();
router.post('/api/v1/admin/signup', validators.validateAdmin, adminController.adminSignUp);
router.post('/api/v1/admin/bills', validators.validateToken, validators.validateBillInput, adminController.createBill);
router.post('/api/v1/admin/addpermission', validators.validateToken, adminController.addPermission);
router.put('/api/v1/admin/bills/:billId', validators.validateToken, validators.validateBillInput, adminController.editBill);
router.delete('/api/v1/admin/bills/:billId', validators.validateToken, adminController.deleteBill);
router.get('/api/v1/admin/users', validators.validateToken, adminController.getAllUsers);
router.post('/api/v1/user/signup', userController.signUp);
router.post('/api/v1/user/signin', userController.signIn);
router.post('/api/v1/bill/upvotes/:billId', validators.validateToken, userController.upVoteBill);
router.post('/api/v1/bill/downvotes/:billId', validators.validateToken, userController.downVoteBill);
router.post('/api/v1/bill/:billId/opinions', validators.validateToken, userController.addOpinion);
router.post('/api/v1/bills/search', validators.validateToken, userController.searchBills);
router.put('/api/v1/user/updateprofile', validators.validateToken, userController.updateUserProfile);
router.get('/api/v1/user/votedbills', validators.validateToken, userController.fetchUserVotedBill);
router.get('/api/v1/bill/:billId/opinions', validators.validateToken, userController.fetchOpinion);
router.get('/api/v1/bills/:billId', validators.validateToken, userController.getABill);


export default router;
