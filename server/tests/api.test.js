const test = require('node:test');
const assert = require('node:assert');
const http = require('node:http');
const app = require('../src/app');
const { calculateOrderTotals } = require('../src/utils/calculations');

let server;
let baseUrl;

test.before((t, done) => {
  server = app.listen(0, () => {
    const port = server.address().port;
    baseUrl = `http://127.0.0.1:${port}`;
    done();
  });
});

test.after((t, done) => {
  server.close(done);
});

// Helper for making HTTP requests in tests
const makeRequest = (path, options = {}, bodyData = null) => {
  return new Promise((resolve, reject) => {
    const url = new URL(path, baseUrl);
    const req = http.request(
      url,
      {
        method: options.method || 'GET',
        headers: {
          'Content-Type': 'application/json',
          ...(options.headers || {}),
        },
      },
      (res) => {
        let raw = '';
        res.on('data', (chunk) => (raw += chunk));
        res.on('end', () => {
          try {
            resolve({
              statusCode: res.statusCode,
              headers: res.headers,
              body: JSON.parse(raw),
            });
          } catch (e) {
            resolve({
              statusCode: res.statusCode,
              headers: res.headers,
              body: raw,
            });
          }
        });
      }
    );

    req.on('error', reject);
    if (bodyData) {
      req.write(JSON.stringify(bodyData));
    }
    req.end();
  });
};

test('GET /api/health returns 200 and healthy status', async () => {
  const res = await makeRequest('/api/health');
  assert.strictEqual(res.statusCode, 200);
  assert.strictEqual(res.body.status, 'healthy');
});

test('GET /api/categories returns all 11 seeded categories', async () => {
  const res = await makeRequest('/api/categories');
  assert.strictEqual(res.statusCode, 200);
  assert.strictEqual(res.body.success, true);
  assert.ok(Array.isArray(res.body.data));
  assert.strictEqual(res.body.data.length, 11);
});

test('GET /api/products returns paginated products with primary image', async () => {
  const res = await makeRequest('/api/products?limit=8');
  assert.strictEqual(res.statusCode, 200);
  assert.strictEqual(res.body.success, true);
  assert.ok(Array.isArray(res.body.data));
  assert.strictEqual(res.body.data.length, 8);
  assert.ok(res.body.pagination);
  assert.strictEqual(res.body.pagination.total >= 24, true);
  assert.ok(res.body.data[0].primary_image);
});

test('GET /api/products/deals returns deals of the day', async () => {
  const res = await makeRequest('/api/products/deals');
  assert.strictEqual(res.statusCode, 200);
  assert.strictEqual(res.body.success, true);
  assert.ok(Array.isArray(res.body.data));
  assert.strictEqual(res.body.data.length > 0, true);
});

test('POST /api/auth/login authenticates customer and returns JWT', async () => {
  const res = await makeRequest(
    '/api/auth/login',
    { method: 'POST' },
    { email: 'customer@shopsphere.com', password: 'Customer@123' }
  );

  assert.strictEqual(res.statusCode, 200);
  assert.strictEqual(res.body.success, true);
  assert.ok(res.body.data.token);
  assert.strictEqual(res.body.data.user.email, 'customer@shopsphere.com');
  assert.strictEqual(res.body.data.user.role, 'customer');
});

test('POST /api/auth/login rejects invalid credentials', async () => {
  const res = await makeRequest(
    '/api/auth/login',
    { method: 'POST' },
    { email: 'customer@shopsphere.com', password: 'WrongPassword' }
  );

  assert.strictEqual(res.statusCode, 401);
  assert.strictEqual(res.body.success, false);
});

test('RBAC: Non-admin customer cannot access admin dashboard', async () => {
  const loginRes = await makeRequest(
    '/api/auth/login',
    { method: 'POST' },
    { email: 'customer@shopsphere.com', password: 'Customer@123' }
  );
  const token = loginRes.body.data.token;

  const adminRes = await makeRequest('/api/admin/dashboard', {
    headers: { Authorization: `Bearer ${token}` },
  });

  assert.strictEqual(adminRes.statusCode, 403);
  assert.strictEqual(adminRes.body.success, false);
});

test('RBAC: Admin user can access admin dashboard KPIs', async () => {
  const loginRes = await makeRequest(
    '/api/auth/login',
    { method: 'POST' },
    { email: 'admin@shopsphere.com', password: 'Admin@123' }
  );
  const token = loginRes.body.data.token;

  const adminRes = await makeRequest('/api/admin/dashboard', {
    headers: { Authorization: `Bearer ${token}` },
  });

  assert.strictEqual(adminRes.statusCode, 200);
  assert.strictEqual(adminRes.body.success, true);
  assert.ok(adminRes.body.data.kpi);
  assert.strictEqual(adminRes.body.data.kpi.total_products >= 24, true);
});

test('Unit Test: calculateOrderTotals correctly calculates subtotal, 18% GST, and delivery', () => {
  const items = [
    { price: 1000, quantity: 2 }, // 2000
  ];
  const coupon = {
    code: 'WELCOME500',
    discount_type: 'flat',
    discount_value: 500,
    min_order_amount: 2000,
    is_active: 1,
  };

  const totals = calculateOrderTotals({ items, coupon });
  assert.strictEqual(totals.subtotal, 2000);
  assert.strictEqual(totals.discountAmount, 500);
  assert.strictEqual(totals.deliveryCharge, 0); // >= 1000 free delivery
  // Taxable: 1500 * 0.18 = 270
  assert.strictEqual(totals.taxAmount, 270);
  // Total: 1500 + 0 + 270 = 1770
  assert.strictEqual(totals.totalAmount, 1770);
});
