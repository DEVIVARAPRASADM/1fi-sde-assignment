import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const productsData = [
  {
    slug: 'iphone-17-pro',
    name: 'Apple iPhone 17 Pro',
    brand: 'Apple',
    description:
      'The pinnacle of iPhone performance featuring an aerospace-grade titanium enclosure, revolutionary A19 Pro silicon, Next-Gen Camera Control, ProMotion 120Hz Super Retina XDR display with Ceramic Shield 2, and intelligent mutual-fund powered financing.',
    mrp: 134900,
    price: 127400,
    rating: 4.9,
    reviewCount: 1420,
    variants: [
      {
        color: 'Silver',
        colorHex: '#E2E4E1',
        storage: '256GB',
        finish: 'Silver Titanium',
        image: '/images/products/iphone-17-pro-silver.jpg',
      },
      {
        color: 'Orange',
        colorHex: '#E07A3B',
        storage: '256GB',
        finish: 'Cosmic Orange Titanium',
        image: '/images/products/iphone-17-pro-orange.jpg',
      },
      {
        color: 'Blue',
        colorHex: '#3A5978',
        storage: '512GB',
        finish: 'Blue Titanium',
        image: '/images/products/iphone-17-pro-blue.jpg',
      },
    ],
    emiPlans: [
      {
        monthlyPayment: 44967,
        tenureMonths: 3,
        interestRate: 0,
        cashback: 7500,
        isRecommended: false,
      },
      {
        monthlyPayment: 22483,
        tenureMonths: 6,
        interestRate: 0,
        cashback: 7500,
        isRecommended: true,
      },
      {
        monthlyPayment: 11242,
        tenureMonths: 12,
        interestRate: 0,
        cashback: 7500,
        isRecommended: false,
      },
      {
        monthlyPayment: 5621,
        tenureMonths: 24,
        interestRate: 0,
        cashback: 7500,
        isRecommended: false,
      },
      {
        monthlyPayment: 4297,
        tenureMonths: 36,
        interestRate: 10.5,
        cashback: 0,
        isRecommended: false,
      },
      {
        monthlyPayment: 3385,
        tenureMonths: 48,
        interestRate: 10.5,
        cashback: 0,
        isRecommended: false,
      },
      {
        monthlyPayment: 2842,
        tenureMonths: 60,
        interestRate: 10.5,
        cashback: 0,
        isRecommended: false,
      },
    ],
  },
  {
    slug: 'samsung-s24-ultra',
    name: 'Samsung Galaxy S24 Ultra',
    brand: 'Samsung',
    description:
      'Unleash Galaxy AI with the sleek Titanium armor frame, built-in precision S Pen, 200MP Quad Telephoto imaging sensor, Snapdragon 8 Gen 3 for Galaxy, and an immersive 6.8-inch Dynamic AMOLED 2X flat display.',
    mrp: 134999,
    price: 121999,
    rating: 4.8,
    reviewCount: 980,
    variants: [
      {
        color: 'Titanium Black',
        colorHex: '#2E3035',
        storage: '256GB',
        finish: 'Titanium Black Satin',
        image: '/images/products/samsung-s24-ultra-black.svg',
      },
      {
        color: 'Titanium Gray',
        colorHex: '#7C7F87',
        storage: '512GB',
        finish: 'Titanium Gray Satin',
        image: '/images/products/samsung-s24-ultra-gray.svg',
      },
    ],
    emiPlans: [
      {
        monthlyPayment: 40666,
        tenureMonths: 3,
        interestRate: 0,
        cashback: 5000,
        isRecommended: false,
      },
      {
        monthlyPayment: 20333,
        tenureMonths: 6,
        interestRate: 0,
        cashback: 5000,
        isRecommended: true,
      },
      {
        monthlyPayment: 10167,
        tenureMonths: 12,
        interestRate: 0,
        cashback: 5000,
        isRecommended: false,
      },
      {
        monthlyPayment: 5083,
        tenureMonths: 24,
        interestRate: 0,
        cashback: 5000,
        isRecommended: false,
      },
      {
        monthlyPayment: 3965,
        tenureMonths: 36,
        interestRate: 10.5,
        cashback: 0,
        isRecommended: false,
      },
      {
        monthlyPayment: 3124,
        tenureMonths: 48,
        interestRate: 10.5,
        cashback: 0,
        isRecommended: false,
      },
    ],
  },
  {
    slug: 'oneplus-13',
    name: 'OnePlus 13',
    brand: 'OnePlus',
    description:
      'Redefining fast and smooth with Snapdragon 8 Elite, 5th Gen Hasselblad Camera system, Crystal Shield ceramic glass, ultra-large 6000mAh battery with 100W SUPERVOOC charging, and 2K Oriental Display.',
    mrp: 72999,
    price: 66999,
    rating: 4.7,
    reviewCount: 640,
    variants: [
      {
        color: 'Black',
        colorHex: '#1F2228',
        storage: '256GB',
        finish: 'Midnight Black Matte',
        image: '/images/products/oneplus-13-black.svg',
      },
      {
        color: 'Blue',
        colorHex: '#2563EB',
        storage: '512GB',
        finish: 'Arctic Blue Silk',
        image: '/images/products/oneplus-13-blue.svg',
      },
    ],
    emiPlans: [
      {
        monthlyPayment: 22333,
        tenureMonths: 3,
        interestRate: 0,
        cashback: 3000,
        isRecommended: false,
      },
      {
        monthlyPayment: 11167,
        tenureMonths: 6,
        interestRate: 0,
        cashback: 3000,
        isRecommended: true,
      },
      {
        monthlyPayment: 7444,
        tenureMonths: 9,
        interestRate: 0,
        cashback: 3000,
        isRecommended: false,
      },
      {
        monthlyPayment: 5583,
        tenureMonths: 12,
        interestRate: 0,
        cashback: 3000,
        isRecommended: false,
      },
      {
        monthlyPayment: 2987,
        tenureMonths: 24,
        interestRate: 10.5,
        cashback: 0,
        isRecommended: false,
      },
    ],
  },
];

async function main() {
  console.log('🌱 Starting database seeding...');

  // Clean existing tables in reverse dependency order
  await prisma.eMIPlan.deleteMany();
  await prisma.variant.deleteMany();
  await prisma.product.deleteMany();

  for (const p of productsData) {
    const { variants, emiPlans, ...productFields } = p;

    const createdProduct = await prisma.product.create({
      data: {
        ...productFields,
        variants: {
          create: variants,
        },
        emiPlans: {
          create: emiPlans,
        },
      },
      include: {
        variants: true,
        emiPlans: true,
      },
    });

    console.log(`✅ Seeded: ${createdProduct.name} (${createdProduct.slug}) with ${createdProduct.variants.length} variants and ${createdProduct.emiPlans.length} EMI plans`);
  }

  console.log('🎉 Database seeding completed successfully!');
}

main()
  .catch((e) => {
    console.error('❌ Error during seeding:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
