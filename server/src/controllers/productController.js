import prisma from '../db.js';

/**
 * GET /api/products
 * Returns all products with their variants and EMI plans
 */
export async function getProducts(req, res, next) {
  try {
    const products = await prisma.product.findMany({
      include: {
        variants: {
          orderBy: { id: 'asc' },
        },
        emiPlans: {
          orderBy: { tenureMonths: 'asc' },
        },
      },
      orderBy: { id: 'asc' },
    });

    res.json(products);
  } catch (error) {
    next(error);
  }
}

/**
 * GET /api/products/:slug
 * Returns a single product with variants and EMI plans by slug
 */
export async function getProductBySlug(req, res, next) {
  try {
    const { slug } = req.params;

    if (!slug) {
      return res.status(400).json({
        success: false,
        message: 'Product slug is required',
      });
    }

    const product = await prisma.product.findUnique({
      where: { slug: slug.toLowerCase() },
      include: {
        variants: {
          orderBy: { id: 'asc' },
        },
        emiPlans: {
          orderBy: { tenureMonths: 'asc' },
        },
      },
    });

    if (!product) {
      return res.status(404).json({
        success: false,
        message: `Product not found with slug '${slug}'`,
      });
    }

    res.json(product);
  } catch (error) {
    next(error);
  }
}

/**
 * GET /api/products/:slug/variants
 * Optional endpoint for fetching variants of a product
 */
export async function getProductVariants(req, res, next) {
  try {
    const { slug } = req.params;
    const product = await prisma.product.findUnique({
      where: { slug: slug.toLowerCase() },
      select: {
        id: true,
        slug: true,
        name: true,
        variants: {
          orderBy: { id: 'asc' },
        },
      },
    });

    if (!product) {
      return res.status(404).json({
        success: false,
        message: `Product not found with slug '${slug}'`,
      });
    }

    res.json(product.variants);
  } catch (error) {
    next(error);
  }
}

/**
 * GET /api/products/:slug/emi-plans
 * Optional endpoint for fetching EMI plans of a product
 */
export async function getProductEMIPlans(req, res, next) {
  try {
    const { slug } = req.params;
    const product = await prisma.product.findUnique({
      where: { slug: slug.toLowerCase() },
      select: {
        id: true,
        slug: true,
        name: true,
        emiPlans: {
          orderBy: { tenureMonths: 'asc' },
        },
      },
    });

    if (!product) {
      return res.status(404).json({
        success: false,
        message: `Product not found with slug '${slug}'`,
      });
    }

    res.json(product.emiPlans);
  } catch (error) {
    next(error);
  }
}
