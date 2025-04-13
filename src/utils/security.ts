
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
