
// Enhanced client-side security utilities

/**
 * Advanced rate limiting for form submissions with persistence
 */
export const createRateLimiter = (maxAttempts: number = 5, timeWindow: number = 60000) => {
  const attempts: Record<string, number[]> = {};
  
  // Load previous attempts from sessionStorage if available
  try {
    const storedAttempts = sessionStorage.getItem('rateLimiterData');
    if (storedAttempts) {
      const parsedAttempts = JSON.parse(storedAttempts);
      Object.keys(parsedAttempts).forEach(key => {
        attempts[key] = parsedAttempts[key];
      });
    }
  } catch (e) {
    console.log('Session storage not available for rate limiter');
  }
  
  return (identifier: string): boolean => {
    const now = Date.now();
    
    // Initialize or clean old attempts
    if (!attempts[identifier]) {
      attempts[identifier] = [];
    } else {
      attempts[identifier] = attempts[identifier].filter(time => now - time < timeWindow);
    }
    
    // Check if too many attempts
    if (attempts[identifier].length >= maxAttempts) {
      return false;
    }
    
    // Record this attempt
    attempts[identifier].push(now);
    
    // Store attempts in sessionStorage
    try {
      sessionStorage.setItem('rateLimiterData', JSON.stringify(attempts));
    } catch (e) {
      // Silent fail if storage isn't available
    }
    
    return true;
  };
};

/**
 * Enhanced bot detection with more signals
 */
export const detectBasicBot = (): boolean => {
  const navigatorObj = window.navigator;
  const userAgent = navigatorObj.userAgent.toLowerCase();
  
  // Enhanced bot patterns detection
  const botPatterns = [
    'bot', 'crawler', 'spider', 'headless', 'phantom', 'selenium', 'puppeteer',
    'lighthouse', 'pagespeed', 'pingdom', 'gtmetrix', 'chrome-lighthouse'
  ];
  
  // Additional bot detection signals
  const hasWebdriver = 'webdriver' in navigatorObj;
  const hasBotPattern = botPatterns.some(pattern => userAgent.includes(pattern));
  const hasPlugins = 'plugins' in navigatorObj && navigatorObj.plugins.length === 0;
  const hasLanguages = 'languages' in navigatorObj && navigatorObj.languages.length === 0;
  
  // Suspicious behavior detection
  const hasInconsistentTiming = (): boolean => {
    const start = performance.now();
    const iterations = 10;
    for (let i = 0; i < iterations; i++) {
      for (let j = 0; j < 1000000; j++) {
        // CPU intensive operation
        Math.sqrt(j);
      }
    }
    const end = performance.now();
    const duration = end - start;
    // Unusually fast execution might indicate a headless browser
    return duration < 50; 
  };
  
  return hasWebdriver || hasBotPattern || hasPlugins || hasLanguages || hasInconsistentTiming();
};

/**
 * Track visitor info with enhanced metrics
 */
export const trackVisit = (): void => {
  try {
    const visitCount = parseInt(sessionStorage.getItem('visitCount') || '0');
    sessionStorage.setItem('visitCount', (visitCount + 1).toString());
    sessionStorage.setItem('lastVisit', new Date().toString());
    
    // Track navigation timing metrics
    if (window.performance && window.performance.timing) {
      const timing = window.performance.timing;
      const pageLoadTime = timing.loadEventEnd - timing.navigationStart;
      sessionStorage.setItem('pageLoadTime', pageLoadTime.toString());
    }
    
    // Track device info
    const deviceInfo = {
      screenWidth: window.screen.width,
      screenHeight: window.screen.height,
      colorDepth: window.screen.colorDepth,
      pixelRatio: window.devicePixelRatio,
      platform: window.navigator.platform,
    };
    sessionStorage.setItem('deviceInfo', JSON.stringify(deviceInfo));
  } catch (e) {
    // Session storage might be disabled
    console.log('Session storage not available for visit tracking');
  }
};

/**
 * Enhanced password strength checker with zxcvbn-like scoring
 */
export const checkPasswordStrength = (password: string): { 
  score: number; 
  feedback: string;
} => {
  let score = 0;
  let feedback = '';

  if (!password) {
    return { score, feedback: 'Password is required' };
  }

  // Length check with better scoring
  if (password.length < 8) {
    feedback = 'Password should be at least 8 characters';
  } else if (password.length >= 12) {
    score += 2;
  } else {
    score += 1;
  }

  // Complexity checks
  if (/[A-Z]/.test(password)) score += 1;
  if (/[a-z]/.test(password)) score += 1;
  if (/[0-9]/.test(password)) score += 1;
  if (/[^A-Za-z0-9]/.test(password)) score += 1;
  
  // Pattern checks (negative factors)
  if (/(.)\1{2,}/.test(password)) { // Repeated characters
    score -= 1;
    feedback += ' Avoid repeated characters. ';
  }
  
  if (/^(12345|qwerty|password|admin|welcome|abc123)/i.test(password)) {
    score -= 2;
    feedback += ' Avoid common passwords. ';
  }
  
  // Entropy bonus for mixed character types
  let hasUpper = /[A-Z]/.test(password);
  let hasLower = /[a-z]/.test(password);
  let hasDigit = /[0-9]/.test(password);
  let hasSpecial = /[^A-Za-z0-9]/.test(password);
  
  let charTypesCount = [hasUpper, hasLower, hasDigit, hasSpecial].filter(Boolean).length;
  if (charTypesCount >= 3) score += 1;
  if (charTypesCount >= 4) score += 1;

  // Provide feedback based on score
  if (score < 3) {
    feedback = 'Weak password. ' + feedback + ' Add uppercase, numbers, or special characters.';
  } else if (score < 5) {
    feedback = 'Medium strength password. ' + feedback;
  } else {
    feedback = 'Strong password';
  }

  // Ensure score is between 0-5
  score = Math.max(0, Math.min(5, score));

  return { score, feedback };
};

/**
 * Content Security Policy violation reporter with enhanced details
 */
export const setupCSPReporting = (): void => {
  document.addEventListener('securitypolicyviolation', (e) => {
    console.error('CSP violation:', {
      blockedURI: e.blockedURI,
      violatedDirective: e.violatedDirective,
      originalPolicy: e.originalPolicy,
      disposition: e.disposition,
      documentURI: e.documentURI,
      effectiveDirective: e.effectiveDirective,
      timeStamp: e.timeStamp,
      statusCode: e.statusCode
    });
    
    // Could send to a reporting endpoint here
    // Example:
    // fetch('/api/csp-report', {
    //   method: 'POST',
    //   body: JSON.stringify({
    //     blockedURI: e.blockedURI,
    //     violatedDirective: e.violatedDirective,
    //     originalPolicy: e.originalPolicy,
    //   }),
    //   headers: { 'Content-Type': 'application/json' }
    // });
  });
  
  // Set CSP headers programmatically if supported
  try {
    if ('securitypolicyviolation' in document) {
      const meta = document.createElement('meta');
      meta.httpEquiv = 'Content-Security-Policy';
      meta.content = "default-src 'self'; script-src 'self' https://www.google.com https://www.gstatic.com; style-src 'self' 'unsafe-inline'; img-src 'self' data: https:; connect-src 'self' https://*.supabase.co; frame-src 'self' https://www.google.com;";
      document.head.appendChild(meta);
    }
  } catch (e) {
    console.log('Could not set CSP meta tag:', e);
  }
};

/**
 * Enhanced X-CSRF protection
 */
export const setupCSRFProtection = (): string => {
  const generateToken = (): string => {
    const array = new Uint8Array(16);
    window.crypto.getRandomValues(array);
    return Array.from(array, byte => byte.toString(16).padStart(2, '0')).join('');
  };
  
  try {
    let csrfToken = sessionStorage.getItem('csrfToken');
    
    if (!csrfToken) {
      csrfToken = generateToken();
      sessionStorage.setItem('csrfToken', csrfToken);
    }
    
    // Add csrf token to all fetch requests
    const originalFetch = window.fetch;
    window.fetch = function(input, init) {
      init = init || {};
      init.headers = init.headers || {};
      
      // Add CSRF token to non-GET requests
      const method = init.method || 'GET';
      if (method.toUpperCase() !== 'GET') {
        Object.assign(init.headers, {
          'X-CSRF-Token': csrfToken
        });
      }
      
      return originalFetch.call(this, input, init);
    };
    
    return csrfToken;
  } catch (e) {
    console.log('CSRF protection setup failed:', e);
    return '';
  }
};

/**
 * Enhanced XSS sanitizer for user input with HTML entity encoding
 * For production, use a dedicated library like DOMPurify
 */
export const sanitizeInput = (input: string): string => {
  if (!input) return '';
  
  return input
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;')
    .replace(/\//g, '&#x2F;')
    .replace(/\\/g, '&#x5C;')
    .replace(/`/g, '&#96;');
};

/**
 * Safe HTML renderer (for when you need to show formatted content)
 */
export const createSafeHTML = (html: string): { __html: string } => {
  // This is a simplified version - use DOMPurify in production
  const allowedTags = ['b', 'i', 'em', 'strong', 'a', 'p', 'br'];
  const tempDiv = document.createElement('div');
  tempDiv.innerHTML = html;
  
  // Remove any disallowed tags
  const allElements = tempDiv.getElementsByTagName('*');
  for (let i = allElements.length - 1; i >= 0; i--) {
    const el = allElements[i];
    if (!allowedTags.includes(el.tagName.toLowerCase())) {
      if (el.textContent) {
        const text = document.createTextNode(el.textContent);
        el.parentNode?.replaceChild(text, el);
      } else {
        el.parentNode?.removeChild(el);
      }
    }
    
    // Remove all attributes except href on anchors
    const attrs = el.attributes;
    for (let j = attrs.length - 1; j >= 0; j--) {
      const attrName = attrs[j].name;
      if (el.tagName.toLowerCase() === 'a' && attrName === 'href') {
        // Only allow http, https protocols in URLs
        const href = el.getAttribute('href') || '';
        if (!/^https?:\/\//i.test(href)) {
          el.removeAttribute('href');
        }
      } else {
        el.removeAttribute(attrName);
      }
    }
  }
  
  return { __html: tempDiv.innerHTML };
};
