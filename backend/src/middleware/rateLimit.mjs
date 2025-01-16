import rateLimit from 'express-rate-limit';

export const rateLimiter = rateLimit({
    windowMs: 5 * 60 * 1000, // 5 minutes
    max: 1000, // Limit each API key or IP to 100 requests per windowMs
    message:
        'Too many requests from this API key or IP. Please try again later.',
    standardHeaders: true, // Send rate limit info in headers
    legacyHeaders: false // Disable legacy X-RateLimit headers
});
