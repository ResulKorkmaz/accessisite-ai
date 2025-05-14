# AccessiSite Scanner Module

WCAG 2.1 AA standartlarına göre web sitelerini tarayan erişilebilirlik tarayıcı modülü.

## Özellikler

- WCAG 2.1 AA standartlarına göre web sayfalarını tarama
- İhlalleri detaylı olarak raporlama (id, etki seviyesi, HTML, açıklama, düzeltme önerisi)
- Türkçe ve İngilizce web sitelerini destekleme
- 30 saniye maksimum tarama süresi

## Kurulum

```bash
cd scanner
npm install
```

## Kullanım

```javascript
const { scan } = require('accessisite-scanner');

async function example() {
  try {
    const result = await scan('https://example.com');
    console.log(result.violations);
  } catch (error) {
    console.error('Tarama hatası:', error);
  }
}

example();
```

## Testler

```bash
npm test
```

## Teknik Detaylar

- Node.js 20
- axe-core 4.x
- Puppeteer (headless Chrome)
- Jest (testler için) 