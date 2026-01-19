// Authentication check script - include this in all protected pages
(function() {
    const AUTH_KEY = 'pem_auth_token';
    const LOGIN_PAGE = '/login.html';
    
    // Skip auth check if we're already on the login page
    if (window.location.pathname.endsWith('login.html')) {
        return;
    }
    
    // Check if user is authenticated
    const authToken = sessionStorage.getItem(AUTH_KEY);
    
    if (!authToken) {
        // Not authenticated - redirect to login with return URL
        const returnUrl = encodeURIComponent(window.location.pathname + window.location.search);
        window.location.href = LOGIN_PAGE + '?returnUrl=' + returnUrl;
    }
})();
