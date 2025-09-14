import React, { createContext, useContext, useState } from 'react';
import Notification from '../components/Notification';

const NotificationContext = createContext();

export const useNotification = () => {
  const context = useContext(NotificationContext);
  if (!context) {
    throw new Error('useNotification must be used within a NotificationProvider');
  }
  return context;
};

export const NotificationProvider = ({ children }) => {
  const [notification, setNotification] = useState(null);

  const showNotification = (type, message, title = '') => {
    setNotification({ type, message, title });
    
    // Tự động đóng sau 5 giây
    setTimeout(() => {
      setNotification(null);
    }, 5000);
  };

  const hideNotification = () => {
    setNotification(null);
  };

  const showSuccess = (message, title = 'Thành công!') => {
    showNotification('success', message, title);
  };

  const showError = (message, title = 'Lỗi!') => {
    showNotification('error', message, title);
  };

  const showWarning = (message, title = 'Cảnh báo!') => {
    showNotification('warning', message, title);
  };

  const showInfo = (message, title = 'Thông tin!') => {
    showNotification('info', message, title);
  };

  return (
    <NotificationContext.Provider value={{
      showSuccess,
      showError,
      showWarning,
      showInfo,
      hideNotification
    }}>
      {children}
      <Notification 
        notification={notification} 
        onClose={hideNotification} 
      />
    </NotificationContext.Provider>
  );
};