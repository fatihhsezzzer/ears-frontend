# PM2 Deployment Rehberi

## Gereksinimler

Sunucunuzda aşağıdakilerin yüklü olması gerekir:

- Node.js (v18+)
- PM2 (`npm install -g pm2`)
- Git

## Sunucuda İlk Kurulum

1. Projeyi sunucuya klonlayın:

```bash
git clone https://github.com/username/ears.git
cd ears
```

2. Bağımlılıkları yükleyin:

```bash
npm install
```

3. Projeyi build edin:

```bash
npm run build
```

4. PM2 ile başlatın:

```bash
npm run pm2:start
```

## Güncellemeler

Kodda değişiklik yaptıktan sonra:

1. Sunucuda git pull:

```bash
git pull origin main
```

2. Projeyi yeniden build edin:

```bash
npm run build
```

3. PM2'yi yeniden başlatın:

```bash
npm run pm2:reload
```

## PM2 Komutları

- **Başlat**: `npm run pm2:start`
- **Durdur**: `npm run pm2:stop`
- **Yeniden başlat**: `npm run pm2:restart`
- **Reload (zero-downtime)**: `npm run pm2:reload`
- **Logları görüntüle**: `npm run pm2:logs`
- **Monitoring**: `npm run pm2:monitor`
- **Sil**: `npm run pm2:delete`

## Environment Ayarları

`ecosystem.config.js` dosyasında aşağıdaki ayarları kontrol edin:

- **PORT**: Uygulama portu (varsayılan: 3000)
- **HOSTNAME**: Sunucu adresi (varsayılan: 0.0.0.0)
- **NODE_ENV**: Ortam (production/development)
- **API URLs**: API endpoint adresleri

## Nginx Konfigürasyonu (Opsiyonel)

Nginx ile reverse proxy kurmak için:

```nginx
server {
    listen 80;
    server_name yourdomain.com;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
    }
}
```

## SSL/HTTPS (Certbot)

```bash
sudo apt install certbot python3-certbot-nginx
sudo certbot --nginx -d yourdomain.com
```

## Monitoring

PM2 monitoring dashboard:

```bash
pm2 web
```

## Troubleshooting

1. **Port kullanımda hatası**:

   - `lsof -i :3000` ile portu kontrol edin
   - `pm2 stop all` ile tüm PM2 processlerini durdurun

2. **Memory sızıntısı**:

   - `ecosystem.config.js` dosyasında `max_memory_restart` ayarı vardır (1G)

3. **Build hatası**:
   - `npm run build` komutunu manuel çalıştırıp hataları kontrol edin

## Auto Start (Sunucu yeniden başlatıldığında)

```bash
pm2 startup
pm2 save
```

Bu komutlar sunucu yeniden başladığında PM2'nin otomatik olarak uygulamanızı başlatmasını sağlar.
