import React from 'react';

const Notification = ({ notification, onClose }) => {
  if (!notification) return null;

  const { type, message, title } = notification;

  const getTypeStyles = (type) => {
    switch (type) {
      case 'success':
        return 'bg-green-100 border-green-400 text-green-700';
      case 'error':
        return 'bg-red-100 border-red-400 text-red-700';
      case 'warning':
        return 'bg-yellow-100 border-yellow-400 text-yellow-700';
      case 'info':
        return 'bg-blue-100 border-blue-400 text-blue-700';
      default:
        return 'bg-gray-100 border-gray-400 text-gray-700';
    }
  };

  return (
    <div className="fixed top-4 right-4 z-50 animate-fadeIn">
      <div className={`${getTypeStyles(type)} border px-4 py-3 rounded relative max-w-md`} role="alert">
        <div className="flex items-start">
          <div className="flex-1">
            {title && (
              <strong className="font-bold mr-2">
                {title}
              </strong>
            )}
            <span className="block sm:inline">{message}</span>
          </div>
          <button 
            onClick={onClose}
            className="absolute top-2 right-2 text-xl font-bold leading-none"
          >
            ×
          </button>
        </div>
      </div>
    </div>
  );
};

export default Notification;