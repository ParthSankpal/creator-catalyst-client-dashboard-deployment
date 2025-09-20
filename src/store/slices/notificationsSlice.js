import { createSlice } from "@reduxjs/toolkit";

const notificationsSlice = createSlice({
  name: "notifications",
  initialState: {
    list: [],
    unreadCount: 0,
  },
  reducers: {
    addNotification: (state, action) => {
      state.list.unshift({
        ...action.payload,
        read: false, // 🔔 all new notifications unread
      });
      state.unreadCount += 1;
    },
    toggleReadStatus: (state, action) => {
      const id = action.payload;
      const notif = state.list.find((n) => n.id === id);

      if (notif) {
        notif.read = !notif.read;
        state.unreadCount += notif.read ? -1 : 1;
        if (state.unreadCount < 0) state.unreadCount = 0;
      }
    },
    markAllRead: (state) => {
      state.list = state.list.map((n) => ({ ...n, read: true }));
      state.unreadCount = 0;
    },
    clearNotifications: (state) => {
      state.list = [];
      state.unreadCount = 0;
    },
  },
});

export const {
  addNotification,
  toggleReadStatus,
  markAllRead,
  clearNotifications,
} = notificationsSlice.actions;

export default notificationsSlice.reducer;

// ✅ Selectors
export const selectAllNotifications = (state) => state.notifications.list;
export const selectUnreadNotifications = (state) =>
  state.notifications.list.filter((n) => !n.read);
export const selectUnreadCount = (state) => state.notifications.unreadCount;
