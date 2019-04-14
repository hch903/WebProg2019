import React from 'react';
export default ({onKeyPress}) => {
  return <input type="text" 
                placeholder="Enter a number..."
                onKeyPress={onKeyPress}
         />;
}