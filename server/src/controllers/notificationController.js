const { query, queryOne } = require('../config/db');
const { successResponse, errorResponse } = require('../utils/responseHandler');

// GET /api/notifications
const getNotifications = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const notifications = await query(
      'SELECT * FROM notifications WHERE user_id = ? ORDER BY created_at DESC LIMIT 30',
      [userId]
    );

    const unreadCountResult = await queryOne(
      'SELECT COUNT(*) AS unread FROM notifications WHERE user_id = ? AND is_read = 0',
      [userId]
    );

    return successResponse(res, {
      notifications,
      unread_count: unreadCountResult ? unreadCountResult.unread : 0,
    }, 'Notifications list.');
  } catch (error) {
    next(error);
  }
};

// PUT /api/notifications/:id/read
const markAsRead = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const notificationId = req.params.id;

    await query('UPDATE notifications SET is_read = 1 WHERE id = ? AND user_id = ?', [notificationId, userId]);
    return successResponse(res, null, 'Marked as read.');
  } catch (error) {
    next(error);
  }
};

// PUT /api/notifications/read-all
const markAllAsRead = async (req, res, next) => {
  try {
    const userId = req.user.id;
    await query('UPDATE notifications SET is_read = 1 WHERE user_id = ?', [userId]);
    return successResponse(res, null, 'All notifications marked as read.');
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getNotifications,
  markAsRead,
  markAllAsRead,
};
