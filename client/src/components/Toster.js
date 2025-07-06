import React, { useState, useEffect } from 'react';

const Toster = ({ type = 'info', message, duration = 3000, onClose }) => {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    if (duration > 0) {
      const timer = setTimeout(() => {
        setVisible(false);
        if (onClose) onClose();
      }, duration);
      return () => clearTimeout(timer);
    }
  }, [duration, onClose]);

  const handleClose = () => {
    setVisible(false);
    if (onClose) onClose();
  };

  const getBackgroundColor = () => {
    switch (type) {
      case 'success':
        return 'bg-green-500';
      case 'error':
        return 'bg-red-500';
      default:
        return 'bg-blue-500';
    }
  };

  return (
    visible && (
      <div className={`fixed top-4 right-4 z-50 p-4 rounded-md shadow-lg ${getBackgroundColor()} text-white flex justify-between items-center`}>
        <span>{message}</span>
        <button
          onClick={handleClose}
          className="ml-4 text-white hover:text-gray-200"
        >
          ×
        </button>
      </div>
    )
  );
};

export default Toster;