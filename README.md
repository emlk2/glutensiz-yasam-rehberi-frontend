# Frontend - Glutensiz Yaşam Rehberi PWA

React + Vite + Tailwind CSS ile geliştirilmiş Progressive Web App (PWA).

## 🚀 Kurulum

### 1. Node.js Bağımlılıkları
```bash
cd frontend
npm install
```

### 2. Environment Dosyası
```bash
cp .env.example .env
```

`.env` dosyasında API URL'sini ayarlayın:
```
VITE_API_URL=http://localhost:8000
```

## 🏃 Çalıştırma

### Development Modu
```bash
npm run dev
```

Uygulama şu adreste açılır: http://localhost:3000

### Production Build
```bash
npm run build
```

Build çıktısı `dist/` klasöründe oluşturulur.

## 📱 PWA Özellikleri

- ✅ Offline desteği (Service Worker)
- ✅ Ana ekrana kurulum
- ✅ App Icon
- ✅ Manifest.json
- ✅ Responsive tasarım (Mobile, Tablet, Desktop)

## 📂 Dosya Yapısı

```
frontend/
├── public/
│   ├── manifest.json        # PWA manifest
│   ├── service-worker.js    # Service Worker
│   ├── icon-192.png         # PWA icon
│   └── icon-512.png
│
├── src/
│   ├── components/
│   │   ├── BarcodeScanner.jsx       # Barkod tarama arayüzü
│   │   ├── ImageUploader.jsx        # Fotoğraf yükleme
│   │   └── ResultCard.jsx           # Sonuç gösterimi
│   │
│   ├── services/
│   │   └── api.js                   # API çağrıları (Axios)
│   │
│   ├── utils/
│   │   └── riskConfig.js            # Risk seviyeleri konfigürasyonu
│   │
│   ├── App.jsx                      # Ana bileşen
│   ├── main.jsx                     # Entry point
│   └── index.css                    # Tailwind CSS
│
├── index.html
├── package.json
├── vite.config.js
├── tailwind.config.js
└── postcss.config.js
```

## 🔌 API Endpoint'leri

Frontend şu API endpoint'lerini kullanır:

- `POST /api/v1/scan/barcode` - Barkod tarama
- `POST /api/v1/analyze/ingredients` - OCR + NLP analizi
- `POST /api/v1/analyze/text` - Metin analizi
- `GET /api/v1/products/search` - Ürün arama
- `GET /health` - Sağlık kontrolü

## 🎨 Stil

- **Tailwind CSS** - Utility-first CSS framework
- **Responsive Design** - Mobil, tablet, desktop uyumlu
- **Risk Seviyeleri** - Yeşil (Güvenli), Sarı (Riskli), Kırmızı (Tehlikeli)

## 📦 Bağımlılıklar

- **React 18** - UI Library
- **Vite** - Build tool
- **Axios** - HTTP client
- **Tailwind CSS** - Styling
- **html5-qrcode** - QR/Barkod okuyucu (opsiyonel)

## 🚀 Deployment

### Vercel (Önerilen)

```bash
npm i -g vercel
vercel
```

### Netlify

```bash
npm i -g netlify-cli
netlify deploy --prod --dir=dist
```

### Manual

```bash
npm run build
# dist/ klasörünü web sunucusuna yükle
```

## 📝 Lisans

MIT
