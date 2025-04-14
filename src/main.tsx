
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'

// Use a clean DOM element to prevent script injection
const rootElement = document.getElementById("root");

// Sanitize the root element before rendering
if (rootElement) {
  // Clear any potential malicious content
  rootElement.innerHTML = '';
  
  createRoot(rootElement).render(<App />);
} else {
  console.error("Root element not found. Application cannot be rendered.");
}
