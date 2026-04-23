/* eslint-disable react-hooks/rules-of-hooks */
const React = require('react/index.js');

// Add the use polyfill directly to the React object
if (typeof React.use !== 'function') {
  React.use = function(usable) {
    // Check if it's a Context object
    if (usable && (usable.$$typeof === Symbol.for('react.context') || usable.Provider)) {
      return React.useContext(usable);
    }
    
    // Warn/throw for Promises
    if (usable && typeof usable.then === 'function') {
      throw new Error(
        '[KAYTX Polyfill] React.use() was called with a Promise. ' +
        'This polyfill only supports Context objects.'
      );
    }

    // Default fallback to useContext just in case it passes an unrecognized context object format
    return React.useContext(usable);
  };
  
  console.log('[KAYTX] React.use polyfill applied in react-wrapper');
}

module.exports = React;
