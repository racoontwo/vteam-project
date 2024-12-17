import rateLimit from 'express-rate-limit';

export const rateLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // Limit each API key or IP to 100 requests per windowMs
    message: 'Too many requests from this API key or IP. Please try again later.',
    standardHeaders: true, // Send rate limit info in headers
    legacyHeaders: false, // Disable legacy X-RateLimit headers
});
