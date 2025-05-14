# Context
Türk/İngilizce sitelerde WCAG 2.1 AA hatalarını bulacak tarayıcı modülü.

# Inputs
- url (string)

# Outputs
- JSON
  - violations[]:
    - id
    - impact   # minor / moderate / serious / critical
    - html
    - description
    - fix

# Tech Stack
- Node.js 20
- axe-core 4.x
- Puppeteer headless Chrome
- Maksimum tarama süresi: 30 sn
- Docker'da GPU gerekmez.

# Acceptance Test
Given https://www.w3.org/
→ violations.length == 0 