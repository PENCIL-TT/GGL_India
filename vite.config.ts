import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');
  const backendPort = env.PORT || '3000';
  
  return {
    server: {
      host: "::",
      port: 8080,
      proxy: {
        '/api': {
          target: `http://127.0.0.1:${backendPort}`,
          changeOrigin: true,
          secure: false,
        },
      '/india_kyc': {
        target: 'http://www.amassdubai.com',
        changeOrigin: true,
        secure: false,
        rewrite: (path) => path, // Ensure path is passed through as-is
        headers: {
          'Referer': 'http://www.amassdubai.com/india_kyc/',
          'Origin': 'http://www.amassdubai.com',
          // Mimic a real browser to avoid being blocked
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36'
        },
        configure: (proxy, _options) => {
          proxy.on('proxyRes', (proxyRes, req, _res) => {
            // Remove security headers that block iframes
            delete proxyRes.headers['x-frame-options'];
            delete proxyRes.headers['content-security-policy'];
            delete proxyRes.headers['content-security-policy-report-only'];
            delete proxyRes.headers['x-content-type-options'];
            
            // Set permissive CSP to allow scripts and eval
            proxyRes.headers['content-security-policy'] = "default-src * 'unsafe-inline' 'unsafe-eval' data: blob:; script-src * 'unsafe-inline' 'unsafe-eval'; style-src * 'unsafe-inline'; img-src * data: blob: 'unsafe-inline'; font-src * data:; frame-ancestors *;";

            // Handle redirects
            if (proxyRes.headers['location']) {
              let location = proxyRes.headers['location'];
              location = location.replace('http://www.amassdubai.com/india_kyc', '/india_kyc');
              location = location.replace('https://www.amassdubai.com/india_kyc', '/india_kyc');
              
              if (location === '/index.php' || location === '/' || location === 'index.php') {
                location = '/india_kyc/index.php';
              }
              
              proxyRes.headers['location'] = location;
            }
          });
        }
      }
    },
  },
  plugins: [
    react(),
    mode === 'development' && componentTagger(),
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  };
});