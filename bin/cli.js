#!/usr/bin/env node

/**
 * AccessiSite AI - CLI Arayüzü
 * 
 * Web sitelerini WCAG 2.1 AA standartlarına göre komut satırından taramak için araç.
 */

const { scan, scanToFile } = require('../src/scanner');
const path = require('path');
const fs = require('fs');

// Argümanları işle
const args = process.argv.slice(2);

// Yardım metni
const helpText = `
AccessiSite AI - WCAG 2.1 AA Tarayıcı

Kullanım:
  accessisite-ai scan <url> [options]

Seçenekler:
  --output, -o        Sonuçların kaydedileceği dosya yolu
  --help, -h          Bu yardım metnini göster

Örnekler:
  accessisite-ai scan https://www.example.com
  accessisite-ai scan https://www.example.com -o results.json
`;

async function main() {
  try {
    // Yardım isteği varsa
    if (args.includes('--help') || args.includes('-h') || args.length === 0) {
      console.log(helpText);
      return;
    }

    // Komutu kontrol et
    const command = args[0];
    
    if (command !== 'scan') {
      console.error('Hata: Geçersiz komut. Kullanılabilir komutlar: scan');
      console.log(helpText);
      process.exit(1);
    }

    // URL'yi al
    const url = args[1];
    
    if (!url) {
      console.error('Hata: URL belirtilmedi.');
      console.log(helpText);
      process.exit(1);
    }

    // Output dosyası belirtilmiş mi kontrol et
    let outputPath = null;
    
    for (let i = 2; i < args.length; i++) {
      if (args[i] === '--output' || args[i] === '-o') {
        outputPath = args[i + 1];
        break;
      }
    }

    console.log(`🔍 ${url} sitesi WCAG 2.1 AA standartlarına göre taranıyor...`);
    
    // Tarama yap
    let result;
    
    if (outputPath) {
      // Mutlak yol değilse, çalışma dizinine göreceli yap
      if (!path.isAbsolute(outputPath)) {
        outputPath = path.join(process.cwd(), outputPath);
      }
      
      result = await scanToFile(url, outputPath);
      console.log(`✅ Tarama tamamlandı. Sonuçlar ${outputPath} dosyasına kaydedildi.`);
      console.log(`📊 Toplam ihlal sayısı: ${result.violations.length}`);
    } else {
      result = await scan(url);
      console.log('✅ Tarama tamamlandı.\n');
      console.log('📊 Sonuçlar:');
      console.log(JSON.stringify(result, null, 2));
    }
    
  } catch (error) {
    console.error('❌ İşlem sırasında hata oluştu:', error.message);
    process.exit(1);
  }
}

main(); 