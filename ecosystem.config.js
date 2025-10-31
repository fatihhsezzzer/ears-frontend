module.exports = {
  apps: [
    {
      name: 'ears-website',
      script: 'server.js',
      instances: 'max', // CPU çekirdeği sayısı kadar instance
      exec_mode: 'cluster',
      env: {
        NODE_ENV: 'production',
        PORT: 3000,
        HOSTNAME: '0.0.0.0',
        NEXT_PUBLIC_API_BASE_URL: 'https://api.softana.com.tr',
        NEXT_PUBLIC_CUSTOMER_ID: 'ad4037cf-3808-40d2-a477-289fadf2d804'
      },
      env_development: {
        NODE_ENV: 'development',
        PORT: 3001,
        HOSTNAME: 'localhost',
        NEXT_PUBLIC_API_BASE_URL: 'https://api.softana.com.tr',
        NEXT_PUBLIC_CUSTOMER_ID: 'ad4037cf-3808-40d2-a477-289fadf2d804'
      },
      // Logging
      log_file: './logs/combined.log',
      out_file: './logs/out.log',
      error_file: './logs/error.log',
      log_date_format: 'YYYY-MM-DD HH:mm Z',
      
      // Performance
      max_memory_restart: '1G',
      node_args: '--max-old-space-size=1024',
      
      // Restart policy
      restart_delay: 4000,
      max_restarts: 10,
      min_uptime: '10s',
      
      // Process management
      kill_timeout: 5000,
      listen_timeout: 3000,
      
      // Auto restart when files change (sadece development için)
      watch: false,
      ignore_watch: [
        'node_modules',
        '.next',
        'logs',
        '.git'
      ],
      
      // Health check
      health_check_url: 'http://localhost:3000',
      health_check_grace_period: 3000
    }
  ],

  deploy: {
    production: {
      user: 'root', // Sunucu kullanıcı adınız
      host: ['your-server-ip'], // Sunucu IP adresiniz
      ref: 'origin/main',
      repo: 'git@github.com:username/ears.git', // Git repo adresiniz
      path: '/var/www/ears',
      'pre-deploy-local': '',
      'post-deploy': 'npm install && npm run build && pm2 reload ecosystem.config.js --env production',
      'pre-setup': 'mkdir -p /var/www/ears/logs'
    }
  }
}