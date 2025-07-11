// LoadingContext.js
import { useState } from 'react';

import { LoadingContext } from './LoadingContext';


export const LoadingProvider = ({ children }) => {
  const [loading, setLoading] = useState(false);
  const [requestCount, setRequestCount] = useState(0);

  const showLoading = () => {
    setRequestCount(prev => prev + 1);
    setLoading(true);
  };

  const hideLoading = () => {
    setRequestCount(prev => {
      const newCount = prev - 1;
      if (newCount === 0) {
        setLoading(false);
      }
      return newCount;
    });
  };

  return (
    <LoadingContext.Provider value={{ loading, showLoading, hideLoading }}>
      {children}
      {loading && (
        <div className="spinner-overlay">
          <div className="spinner"></div>
        </div>
      )}
    </LoadingContext.Provider>
  );
};

