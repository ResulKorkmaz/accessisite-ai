/**
 * WCAG Tarayıcı modülü için Jest testleri
 */

const { scan } = require('../src/scanner');

// Testler için jest timeout değerini artır (varsayılan 5 saniye çok kısa)
jest.setTimeout(60000); // 60 saniye

describe('WCAG Scanner Tests', () => {
  
  test('W3.org sitesi WCAG 2.1 AA kurallarına uyumlu olmalı', async () => {
    // Acceptance Test: W3.org sitesi tarandığında ihlal olmamalı
    const result = await scan('https://www.w3.org/');
    expect(result.violations).toBeDefined();
    expect(result.violations.length).toBe(0);
  });
  
  test('Bilinen erişilebilirlik sorunları olan test sayfası ihlaller içermeli', async () => {
    // Bu URL, Jest testleri sırasında basit erişilebilirlik sorunları olan bir test sayfası
    // Gerçek testte, bilinen sorunları olan bir test sayfası kullanmanız önerilir
    const result = await scan('https://axe-core.org/examples/accessibility-issues.html');
    expect(result.violations).toBeDefined();
    expect(result.violations.length).toBeGreaterThan(0);
  });
  
  test('URL formatı geçerli olmalı', async () => {
    // Geçersiz URL girildiğinde hata vermeli
    await expect(scan('invalid-url')).rejects.toThrow();
  });
  
});

// Türkçe siteler için özel testler (opsiyonel)
describe('Türkçe Siteler için WCAG Taraması', () => {
  
  test('Türkçe karakter içeren siteler taranabilmeli', async () => {
    // Türkçe karakter ve içerik barındıran siteyi tara
    const result = await scan('https://www.turkiye.gov.tr/');
    expect(result).toBeDefined();
    // Not: Bu test sadece taramanın çalıştığını doğrular, ihlal sayısı kontrol edilmez
  });
  
}); 