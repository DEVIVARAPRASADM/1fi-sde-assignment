import { Router } from 'express';
import {
  getProducts,
  getProductBySlug,
  getProductVariants,
  getProductEMIPlans,
} from '../controllers/productController.js';

const router = Router();

// Products collection
router.get('/', getProducts);

// Single product by slug
router.get('/:slug', getProductBySlug);

// Specific sub-resources (optional endpoints for clean architecture)
router.get('/:slug/variants', getProductVariants);
router.get('/:slug/emi-plans', getProductEMIPlans);

export default router;
