# AccessiSite AI - WCAG Scanner

Web sitelerini WCAG 2.1 AA standartlarına göre tarayan ve ihlalleri tespit eden bir tarayıcı modülü.

## Özellikler

- WCAG 2.1 AA standartlarına göre web sayfalarını tarama
- İhlalleri detaylı olarak raporlama (id, etki seviyesi, HTML, açıklama, düzeltme önerisi)
- Türkçe ve İngilizce web sitelerini destekleme
- Komut satırı arayüzü
- Sonuçları JSON formatında dışa aktarma
- 30 saniye maksimum tarama süresi

## Kurulum

### NPM ile

```bash
npm install -g accessisite-ai
```

### Kaynak Koddan

```bash
git clone https://github.com/ResulKorkmaz/accessisite-ai.git
cd accessisite-ai
npm install
npm link
```

### Docker ile

```bash
docker build -t accessisite-ai .
```

## Kullanım

### Programatik Kullanım

```javascript
const { scan } = require('accessisite-ai');

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

### Komut Satırı Kullanımı

```bash
# Yardım
accessisite-ai --help

# Web sitesini tara
accessisite-ai scan https://example.com

# Sonuçları dosyaya kaydet
accessisite-ai scan https://example.com -o results.json
```

### Docker ile Kullanım

```bash
docker run --rm accessisite-ai scan https://example.com
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

## Lisans

MIT 