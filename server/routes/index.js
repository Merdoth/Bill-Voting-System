import express from 'express';
import userController from '../controllers/userControllers';
import adminController from '../controllers/adminControllers';
import validators from '../middlewares/validators';
const router = express.Router();
router.post('/api/v1/admin/signup', validators.validateAdmin, adminController.adminSignUp);
router.post('/api/v1/admin/signin', validators.validateAdmin, adminController.adminSignIn);
router.post('/api/v1/admin/bills', validators.validateToken, validators.validateBillInput, adminController.createBill);
router.post('/api/v1/admin/addpermission', validators.validateToken, adminController.addPermission);
router.put('/api/v1/admin/bills/:billId', validators.validateToken, validators.validateBillInput, adminController.editBill);
router.delete('/api/v1/admin/bills/:billId', validators.validateToken, adminController.deleteBill);
router.post('/api/v1/user/signup', validators.validateSignUp, userController.signUp);
router.post('/api/v1/user/signin', validators.validateSignIn, userController.signIn);
router.post('/api/v1/bill/upvotes/:billId', validators.validateToken, userController.upVoteBill);
router.post('/api/v1/bill/downvotes/:billId', validators.validateToken, userController.downVoteBill);
router.put('/api/v1/user/updateprofile', validators.validateToken, validators.validateProfile, userController.updateUserProfile);
router.post('/api/v1/bill/:billId/opinions', validators.validateToken, userController.addOpinion);

export default router;
