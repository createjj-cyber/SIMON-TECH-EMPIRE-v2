const pairing = {
  getPairingKeyboard: () => ({
    reply_markup: {
      inline_keyboard: [
        [
          { text: '📱 QR Code', callback_data: 'pair_qr' },
          { text: '☎️ Phone Number', callback_data: 'pair_phone' },
        ],
        [
          { text: '🔗 Link Code', callback_data: 'pair_link' },
        ],
      ],
    },
  }),

  getSettingsKeyboard: () => ({
    reply_markup: {
      inline_keyboard: [
        [
          { text: '⚙️ Auto Reply', callback_data: 'setting_autoreply' },
          { text: '🔔 Notifications', callback_data: 'setting_notifications' },
        ],
        [
          { text: '🔙 Back', callback_data: 'settings_back' },
        ],
      ],
    },
  }),

  getMainKeyboard: () => ({
    reply_markup: {
      inline_keyboard: [
        [
          { text: '🔗 Pair Account', callback_data: 'main_pair' },
          { text: '📊 Status', callback_data: 'main_status' },
        ],
        [
          { text: '📱 Sessions', callback_data: 'main_sessions' },
          { text: '⚙️ Settings', callback_data: 'main_settings' },
        ],
      ],
    },
  }),
};

export default pairing;
