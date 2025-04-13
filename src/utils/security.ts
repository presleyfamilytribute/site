
// Basic client-side security utility
// Note: For serious security needs, server-side solutions are recommended

/**
 * Simple rate limiting for form submissions
 */
export const createRateLimiter = (maxAttempts: number = 5, timeWindow: number = 60000) => {
  const attempts: Record<string, number[]> = {};
  
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
    return true;
  };
};

/**
 * Basic bot detection (not foolproof)
 */
export const detectBasicBot = (): boolean => {
  const navigatorObj = window.navigator;
  const userAgent = navigatorObj.userAgent.toLowerCase();
  
  // Very basic checks that might indicate a bot
  const botPatterns = [
    'bot', 'crawler', 'spider', 'headless', 'phantom', 'selenium', 'puppeteer'
  ];
  
  const hasWebdriver = 'webdriver' in navigatorObj;
  const hasBotPattern = botPatterns.some(pattern => userAgent.includes(pattern));
  
  return hasWebdriver || hasBotPattern;
};

/**
 * Store visitor info in session storage
 */
export const trackVisit = (): void => {
  try {
    const visitCount = parseInt(sessionStorage.getItem('visitCount') || '0');
    sessionStorage.setItem('visitCount', (visitCount + 1).toString());
    sessionStorage.setItem('lastVisit', new Date().toString());
  } catch (e) {
    // Session storage might be disabled
    console.log('Session storage not available');
  }
};

/**
 * Enhanced password strength checker
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

  // Length check
  if (password.length < 8) {
    feedback = 'Password should be at least 8 characters';
  } else {
    score += 1;
  }

  // Complexity checks
  if (/[A-Z]/.test(password)) score += 1;
  if (/[a-z]/.test(password)) score += 1;
  if (/[0-9]/.test(password)) score += 1;
  if (/[^A-Za-z0-9]/.test(password)) score += 1;

  // Provide feedback based on score
  if (score < 3) {
    feedback = 'Weak password. Add uppercase, numbers, or special characters';
  } else if (score < 5) {
    feedback = 'Medium strength password';
  } else {
    feedback = 'Strong password';
  }

  return { score, feedback };
};

/**
 * Content Security Policy violation reporter
 */
export const setupCSPReporting = (): void => {
  document.addEventListener('securitypolicyviolation', (e) => {
    console.error('CSP violation:', {
      blockedURI: e.blockedURI,
      violatedDirective: e.violatedDirective,
      originalPolicy: e.originalPolicy,
    });
    
    // Could send to a reporting endpoint here
  });
};

/**
 * Basic XSS sanitizer for user input
 * Note: For production, use a dedicated library like DOMPurify
 */
export const sanitizeInput = (input: string): string => {
  return input
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
};
