/**
 * Jest test yapılandırması
 */
module.exports = {
  // Test ortamı
  testEnvironment: 'node',
  
  // Test dosyalarının bulunduğu dizin
  testMatch: [
    '**/__tests__/**/*.test.js'
  ],
  
  // Test çalıştırmadan önce gerekli modülleri önbelleğe al
  transform: {},
  
  // Test kapsamı raporu için yapılandırma
  collectCoverage: true,
  coverageDirectory: 'coverage',
  coverageReporters: ['text', 'lcov'],
  
  // Test zaman aşımı süresi (ms)
  testTimeout: 60000
}; 