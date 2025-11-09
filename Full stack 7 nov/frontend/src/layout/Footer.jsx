import React from 'react';

export default function Footer() {
  console.log("hai")
  return (
    <footer style={{ padding: '1rem', background: '#eee', textAlign: 'center' }}>
      &copy; {new Date().getFullYear()} My App
    </footer>
  );
}
