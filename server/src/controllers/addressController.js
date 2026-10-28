const { query, queryOne } = require('../config/db');
const { successResponse, errorResponse } = require('../utils/responseHandler');

// GET /api/addresses
const getAddresses = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const addresses = await query(
      'SELECT * FROM addresses WHERE user_id = ? ORDER BY is_default DESC, created_at DESC',
      [userId]
    );
    return successResponse(res, addresses, 'Customer addresses.');
  } catch (error) {
    next(error);
  }
};

// POST /api/addresses
const addAddress = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const {
      full_name,
      phone,
      address_line1,
      address_line2,
      landmark,
      city,
      state,
      postal_code,
      country = 'India',
      address_type = 'home',
      is_default = false,
    } = req.body;

    // If setting as default, clear other defaults
    if (is_default) {
      await query('UPDATE addresses SET is_default = 0 WHERE user_id = ?', [userId]);
    }

    const result = await query(`
      INSERT INTO addresses (
        user_id, full_name, phone, address_line1, address_line2, landmark,
        city, state, postal_code, country, address_type, is_default
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `, [
      userId, full_name.trim(), phone.trim(), address_line1.trim(),
      address_line2 ? address_line2.trim() : null, landmark ? landmark.trim() : null,
      city.trim(), state.trim(), postal_code.trim(), country, address_type, is_default ? 1 : 0,
    ]);

    const createdAddress = await queryOne('SELECT * FROM addresses WHERE id = ?', [result.insertId]);
    return successResponse(res, createdAddress, 'Address added successfully.', 201);
  } catch (error) {
    next(error);
  }
};

// PUT /api/addresses/:id
const updateAddress = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const addressId = req.params.id;
    const {
      full_name,
      phone,
      address_line1,
      address_line2,
      landmark,
      city,
      state,
      postal_code,
      country,
      address_type,
      is_default,
    } = req.body;

    const existing = await queryOne('SELECT id FROM addresses WHERE id = ? AND user_id = ?', [addressId, userId]);
    if (!existing) {
      return errorResponse(res, 'Address not found.', 404);
    }

    if (is_default) {
      await query('UPDATE addresses SET is_default = 0 WHERE user_id = ?', [userId]);
    }

    await query(`
      UPDATE addresses SET
        full_name = COALESCE(?, full_name),
        phone = COALESCE(?, phone),
        address_line1 = COALESCE(?, address_line1),
        address_line2 = COALESCE(?, address_line2),
        landmark = COALESCE(?, landmark),
        city = COALESCE(?, city),
        state = COALESCE(?, state),
        postal_code = COALESCE(?, postal_code),
        country = COALESCE(?, country),
        address_type = COALESCE(?, address_type),
        is_default = COALESCE(?, is_default)
      WHERE id = ? AND user_id = ?
    `, [
      full_name, phone, address_line1, address_line2, landmark,
      city, state, postal_code, country, address_type,
      is_default !== undefined ? (is_default ? 1 : 0) : null,
      addressId, userId
    ]);

    const updated = await queryOne('SELECT * FROM addresses WHERE id = ?', [addressId]);
    return successResponse(res, updated, 'Address updated.');
  } catch (error) {
    next(error);
  }
};

// DELETE /api/addresses/:id
const deleteAddress = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const addressId = req.params.id;

    await query('DELETE FROM addresses WHERE id = ? AND user_id = ?', [addressId, userId]);
    return successResponse(res, null, 'Address deleted.');
  } catch (error) {
    next(error);
  }
};

// PUT /api/addresses/:id/default
const setDefaultAddress = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const addressId = req.params.id;

    await query('UPDATE addresses SET is_default = 0 WHERE user_id = ?', [userId]);
    await query('UPDATE addresses SET is_default = 1 WHERE id = ? AND user_id = ?', [addressId, userId]);

    return successResponse(res, null, 'Default address updated.');
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAddresses,
  addAddress,
  updateAddress,
  deleteAddress,
  setDefaultAddress,
};
