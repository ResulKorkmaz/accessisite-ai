/**
 * WCAG 2.1 AA Accessibility Scanner
 * 
 * Türkçe ve İngilizce web sitelerinde WCAG 2.1 AA erişilebilirlik 
 * standartlarına göre ihlalleri tespit eden tarayıcı modülü.
 */

const puppeteer = require('puppeteer');
const axeCore = require('axe-core');
const fs = require('fs').promises;
const path = require('path');

/**
 * Web sayfasını WCAG 2.1 AA standartlarına göre tarayan fonksiyon
 * 
 * @param {string} url - Taranacak web sayfasının URL'si
 * @param {Object} options - Tarama seçenekleri
 * @param {number} options.timeout - Tarama zaman aşımı (ms cinsinden)
 * @returns {Promise<Object>} - Tarama sonuçlarını içeren promise
 */
async function scanPage(url, options = {}) {
  const timeout = options.timeout || 30000; // Varsayılan 30 saniye
  
  let browser;
  try {
    // Headless Chrome başlat
    browser = await puppeteer.launch({
      headless: 'new',
      args: ['--no-sandbox', '--disable-setuid-sandbox']
    });
    
    const page = await browser.newPage();
    
    // Timeout ayarla
    page.setDefaultNavigationTimeout(timeout);
    
    // URL'ye git
    await page.goto(url, { waitUntil: 'networkidle2' });
    
    // axe-core'u sayfaya enjekte et
    await page.evaluate(axeSource => {
      const script = document.createElement('script');
      script.text = axeSource;
      document.head.appendChild(script);
    }, axeCore.source);
    
    // axe analizini çalıştır
    const results = await page.evaluate(() => {
      return new Promise(resolve => {
        // WCAG 2.1 AA standartlarına göre tara
        axe.run({
          runOnly: {
            type: 'tag',
            values: ['wcag2a', 'wcag2aa', 'best-practice']
          }
        }, (err, results) => {
          if (err) throw err;
          resolve(results);
        });
      });
    });
    
    // Sonuçları formatla
    const violations = results.violations.map(violation => {
      return {
        id: violation.id,
        impact: violation.impact,
        description: violation.description,
        html: violation.nodes.map(node => node.html).join('\n'),
        fix: violation.help
      };
    });
    
    return { violations };
    
  } catch (error) {
    console.error('Tarama sırasında hata:', error);
    throw error;
  } finally {
    if (browser) {
      await browser.close();
    }
  }
}

/**
 * Web sitesini tara ve sonuçları JSON olarak döndür
 * 
 * @param {string} url - Taranacak web sayfasının URL'si 
 * @returns {Promise<Object>} - İhlalleri içeren JSON nesnesi
 */
async function scan(url) {
  try {
    const results = await scanPage(url);
    return results;
  } catch (error) {
    console.error('Tarama hatası:', error);
    throw error;
  }
}

/**
 * Web sitesini tara ve sonuçları dosyaya kaydet
 * 
 * @param {string} url - Taranacak web sayfasının URL'si
 * @param {string} outputPath - Sonuçların kaydedileceği dosya yolu
 * @returns {Promise<Object>} - İşlem sonucunu içeren promise
 */
async function scanToFile(url, outputPath) {
  try {
    const results = await scanPage(url);
    await fs.writeFile(outputPath, JSON.stringify(results, null, 2), 'utf8');
    return { success: true, message: `Sonuçlar ${outputPath} dosyasına kaydedildi.`, violations: results.violations };
  } catch (error) {
    console.error('Dosyaya yazma hatası:', error);
    throw error;
  }
}

module.exports = {
  scan,
  scanPage,
  scanToFile
}; 