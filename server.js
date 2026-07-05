import 'dotenv/config';
import express from 'express';
import { createProxyMiddleware } from 'http-proxy-middleware';
import path from 'path';
import { fileURLToPath } from 'url';
import { adminRouter } from './server/routes/admin.js';
import { contentRouter } from './server/routes/content.js';
import { mediaRouter, uploadsDir } from './server/routes/media.js';
import { servicesRouter } from './server/routes/services.js';
import { officesRouter } from './server/routes/offices.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const app = express();

// Debug logging
app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
  next();
});

// Admin panel API (MySQL-backed) — must be registered before static/proxy middleware
app.use(express.json());
app.use('/uploads', express.static(uploadsDir));
app.use('/api/admin', adminRouter);
app.use('/api/admin', mediaRouter);
app.use('/api/content', contentRouter);
app.use('/api/services', servicesRouter);
app.use('/api/offices', officesRouter);

const proxyOptions = {
  target: 'http://www.amassdubai.com', // Target the root domain to ensure paths map 1:1
  changeOrigin: true,
  secure: false,
  cookieDomainRewrite: "*", // Allow cookies to be set on localhost/current domain
  cookiePathRewrite: {
    "*": "/" // Ensure cookies are valid for the entire site
  },
  logLevel: 'debug',
  headers: {
    'Referer': 'http://www.amassdubai.com/india_kyc/',
    'Origin': 'http://www.amassdubai.com',
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36',
  },
  onProxyReq: (proxyReq, req, res) => {
    console.log(`[Proxy Request] -> ${new URL(proxyReq.path, proxyOptions.target).href}`);
    
    // Ensure AJAX requests are marked correctly, as some PHP frameworks check this
    if (req.headers['x-requested-with']) {
      proxyReq.setHeader('X-Requested-With', req.headers['x-requested-with']);
    }
  },
  onProxyRes: (proxyRes, req, res) => {
    console.log(`[Proxy Response] Status: ${proxyRes.statusCode} for ${req.url}`);
    
    // Remove all security headers that block iframes
    delete proxyRes.headers['x-frame-options'];
    delete proxyRes.headers['content-security-policy'];
    delete proxyRes.headers['content-security-policy-report-only'];
    delete proxyRes.headers['x-content-type-options'];
    
    // Set permissive CSP
    proxyRes.headers['content-security-policy'] = "default-src * 'unsafe-inline' 'unsafe-eval' data: blob:; script-src * 'unsafe-inline' 'unsafe-eval'; style-src * 'unsafe-inline'; img-src * data: blob: 'unsafe-inline'; font-src * data:; frame-ancestors *;";

    // Rewrite redirects
    if (proxyRes.headers['location']) {
      let location = proxyRes.headers['location'];
      console.log(`[Original Redirect] ${location}`);
      
      // Replace all variations of the target URL
      location = location.replace('http://www.amassdubai.com/india_kyc', '/india_kyc');
      location = location.replace('http://amassdubai.com/india_kyc', '/india_kyc');
      location = location.replace('https://www.amassdubai.com/india_kyc', '/india_kyc');
      location = location.replace('https://amassdubai.com/india_kyc', '/india_kyc');
      
      // Handle root redirects
      if (location === '/index.php' || location === '/' || location === 'index.php') {
        location = '/india_kyc/index.php';
      }
      
      console.log(`[Rewritten Redirect] ${location}`);
      proxyRes.headers['location'] = location;
    }
  },
  onError: (err, req, res) => {
    console.error('[Proxy Error]', err.message);
    res.status(502).json({
      error: 'Proxy Error',
      message: err.message,
      url: req.url
    });
  }
};

// Serve static files (React build) FIRST
// This ensures local assets (like /assets/index.css) are served correctly.
// If a file is not found here, it falls through to the proxy or SPA fallback.
app.use(express.static(path.join(__dirname, 'dist')));

// Proxy middleware for form and common asset paths
// We include common folders like /js, /css, /img because the external form likely references them at the root level.
const proxyPaths = ['/india_kyc', '/js', '/css', '/img', '/images', '/fonts', '/assets', '/vendor', '/lib'];
app.use(proxyPaths, createProxyMiddleware(proxyOptions));

// SPA fallback - MUST exclude proxy paths
// Express 5 dropped bare '*' support in path-to-regexp, so this uses app.use (no path)
// as the final catch-all instead of app.get('*', ...).
app.use((req, res, next) => {
  // Skip SPA fallback for proxy paths
  if (proxyPaths.some(path => req.path.startsWith(path))) {
    console.log(`[Skipping SPA] ${req.path} is a proxy path (but failed to proxy?)`);
    return res.status(404).send('Proxy path not found');
  }
  
  console.log(`[SPA Fallback] Serving index.html for ${req.path}`);
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server running on http://0.0.0.0:${PORT}`);
  console.log(`Proxy endpoint: http://0.0.0.0:${PORT}/india_kyc/`);
});
