# Velvet Brew Cafe

Website landing page dan sistem reservasi sederhana untuk cafe.

## Struktur utama
- `index.html` — halaman utama dan form reservasi
- `admin-login.html` — login admin
- `admin.html` — dashboard admin
- `google-apps-script.js` — backend untuk Google Sheet

## Deploy ke Netlify
1. Upload folder project ini ke Netlify atau hubungkan repositori GitHub.
2. Pastikan publish directory adalah root project.
3. Tidak perlu build command karena ini project static.
4. Setelah publish, website akan tersedia di URL Netlify.

## Konfigurasi Google Sheet
1. Buka file `google-apps-script.js`.
2. Salin kode ke Google Apps Script project.
3. Deploy sebagai Web App.
4. Copy URL web app.
5. Ubah nilai `SHEET_WEBAPP_URL` di `index.html` dan `admin.html`.

## Admin login
- Password default: `admin123`

## Catatan
- File ini siap untuk deployment static tanpa framework.
- Untuk produksi, ganti nomor WhatsApp, alamat, dan email sesuai brand yang asli.
