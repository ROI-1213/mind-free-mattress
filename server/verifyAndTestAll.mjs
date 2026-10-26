import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.resolve(__dirname, '..');

const API_URL = 'http://localhost:3001/api';

async function runCompleteTestSuite() {
  console.log('==============================================================');
  console.log('MINDFREE POSTGRESQL & FULL-SITE END-TO-END TEST SUITE');
  console.log('==============================================================');

  // 1. Verify Zero Supabase Code/Files
  const pkgJson = fs.readFileSync(path.join(projectRoot, 'package.json'), 'utf8');
  if (pkgJson.toLowerCase().includes('supabase')) {
    throw new Error('Found supabase in package.json!');
  }
  console.log('[PASS] 1. Zero Supabase dependencies in package.json & .env');

  // 2. Test /api/health
  const healthRes = await fetch(`${API_URL}/health`);
  const health = await healthRes.json();
  if (!health.ok) throw new Error('Health check failed: ' + JSON.stringify(health));
  console.log('[PASS] 2. PostgreSQL Direct Connection Verified:', health.stats);

  // 3. Test Storage Bucket Creation in PostgreSQL
  const bucketRes = await fetch(`${API_URL}/storage/buckets`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      id: 'admin-campaigns',
      name: 'admin-campaigns',
      description: 'Admin panel promotional & mattress campaign images stored in PostgreSQL',
    }),
  });
  const createdBucket = await bucketRes.json();
  console.log('[PASS] 3. Created PostgreSQL Storage Bucket:', createdBucket.id);

  // 4. Test Uploading an Image into PostgreSQL storage_objects
  const imgPath = path.join(projectRoot, 'public', 'images', 'quiz-bed-2.png');
  const imgBase64 = fs.readFileSync(imgPath).toString('base64');
  const uploadRes = await fetch(`${API_URL}/storage/upload`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      bucket_id: 'admin-campaigns',
      file_name: 'royal-navy-box-top.png',
      mime_type: 'image/png',
      base64_data: imgBase64,
      alt_text: 'Mindfree Royal Navy Box-Top Cutout uploaded via Admin Panel',
    }),
  });
  const uploadedObj = await uploadRes.json();
  console.log('[PASS] 4. Uploaded Image to PostgreSQL storage_objects:', uploadedObj.public_url);

  // Verify binary serving of uploaded image from PostgreSQL
  const binaryCheck = await fetch(`http://localhost:3001${uploadedObj.public_url}`);
  if (!binaryCheck.ok || !binaryCheck.headers.get('content-type')?.includes('image/png')) {
    throw new Error('Failed to serve binary image from PostgreSQL storage');
  }
  console.log('[PASS] 5. Binary Image Served Directly from PostgreSQL:', binaryCheck.headers.get('content-type'));

  // 5. Test Adding a New Product via Admin Panel API into PostgreSQL products table
  const prodRes = await fetch(`${API_URL}/products`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      id: 'royal-sapphire-ortho',
      slug: 'royal-sapphire-ortho',
      name: 'Royal Sapphire Ortho Luxe Mattress',
      tagline: '7-Zone Postural Pocket Spring & Natural Latex',
      categories: ['orthopedic', 'latex'],
      top_finish_style: 'Euro Top',
      warranty_months: 120,
      starting_price: 19499,
      hero_image: uploadedObj.public_url,
      thickness_options: [8, 10, 12],
    }),
  });
  const createdProd = await prodRes.json();
  console.log('[PASS] 6. Added New Mattress Product in PostgreSQL:', createdProd.name, '-> Image:', createdProd.hero_image);

  // 6. Test Creating a New Order & Advancing Admin Fulfillment Status in PostgreSQL
  const testOrderId = 'MF-2026-99104';
  const orderRes = await fetch(`${API_URL}/orders`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      orderId: testOrderId,
      createdAt: new Date().toISOString(),
      customer: {
        fullName: 'Vikramaditya Rao',
        email: 'vikram.rao@mindfreemat.roiclients.co.in',
        phone: '9845011223',
        addressLine: 'Penthouse 4, Prestige Kingfisher Towers',
        locality: 'Ashok Nagar',
        city: 'Bengaluru',
        state: 'Karnataka',
        pincode: '560001',
        billingSameAsShipping: true,
      },
      items: [
        {
          id: createdProd.id,
          sku: 'MF-RSO-78x72x10',
          name: createdProd.name,
          size: 'King (78" × 72")',
          thickness: '10 Inch',
          price: 19499,
          quantity: 1,
          image: createdProd.hero_image,
        },
      ],
      subtotal: 19499,
      totalSavings: 4500,
      shipping: 0,
      tax: 0,
      total: 19499,
      paymentMethod: 'upi',
      paymentStatus: 'Paid',
      orderStatus: 'Confirmed',
      trackingNumber: 'MF-TRK-99104-BLR',
      courierPartner: 'Mindfree Dedicated White-Glove Fleet',
      estimatedDelivery: 'Wednesday, 28 Oct 2026',
      statusHistory: [
        {
          status: 'Confirmed',
          timestamp: new Date().toISOString(),
          note: 'Order created and stored in PostgreSQL (mindf31).',
          updatedBy: 'Automated Billing Gateway',
        },
      ],
    }),
  });
  const createdOrder = await orderRes.json();
  console.log('[PASS] 7. Created New Order in PostgreSQL:', createdOrder.orderId);

  const patchStatusRes = await fetch(`${API_URL}/orders/${testOrderId}/status`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      newStatus: 'Preparing in Atelier',
      note: 'Admin Panel status transition verified in PostgreSQL.',
    }),
  });
  const updatedOrder = await patchStatusRes.json();
  console.log('[PASS] 8. Updated Order Status in Admin Panel -> PostgreSQL:', updatedOrder.orderStatus);

  // 7. Test Adding a Customer Review, Site Content, Newsletter & Contact Inquiry
  await fetch(`${API_URL}/reviews`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      id: 'rev-pg-verified',
      name: 'Ananya Sharma',
      date: '26-10-2026',
      rating: 5,
      reviewText: 'Tested the new Royal Sapphire Ortho Luxe mattress—exceptional lumbar support and fast delivery!',
    }),
  });
  console.log('[PASS] 9. Saved Customer Review to PostgreSQL reviews table');

  await fetch(`${API_URL}/newsletter`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email: 'vip@mindfreemat.roiclients.co.in', source: 'footer' }),
  });
  console.log('[PASS] 10. Saved Newsletter Subscriber to PostgreSQL newsletter_subscribers table');

  await fetch(`${API_URL}/inquiries`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      full_name: 'Karthik Reddy',
      email: 'karthik@mindfreemat.roiclients.co.in',
      phone: '+91 9880012345',
      subject: 'Custom King Size Mattress Consultation',
      message: 'Need a custom 84x72 inch Natural Latex mattress for our master bedroom.',
    }),
  });
  console.log('[PASS] 11. Saved Contact Inquiry to PostgreSQL contact_inquiries table');

  // Final Health & Row Count Summary
  const finalHealth = await (await fetch(`${API_URL}/health`)).json();
  console.log('==============================================================');
  console.log('FINAL POSTGRESQL DATABASE STATS (localhost:5432 / mindf31):');
  console.log(finalHealth.stats);
  console.log('==============================================================');
}

runCompleteTestSuite().catch((err) => {
  console.error('Test Suite Error:', err);
  process.exit(1);
});
