import React from 'react'
export default ({ onClick, text }) => {
  return <button onClick={onClick}>{text}</button>;
}