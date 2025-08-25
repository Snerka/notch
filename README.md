
# Notch Contact Form Automation

[![Node.js](https://img.shields.io/badge/Node.js-18%2B-brightgreen)](https://nodejs.org/)
[![Playwright](https://img.shields.io/badge/Playwright-1.36-blue)](https://playwright.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-4.9-blue)](https://www.typescriptlang.org/)

Automated tests for the [Notch contact form](https://wearenotch.com/qa_task/) using **Playwright + TypeScript**.

---

## 🚀 Setup & Run

```bash
git clone <repo-url>
cd <repo-folder>
npm install
npx playwright test
```

---

## 🗂 Project Structure

| Folder   | Description              |
|----------|--------------------------|
| `pages/` | Page Object classes      |
| `tests/` | Test cases               |
| `utils/` | Test data                |
| `reports/` | Test reports and screenshots |

---

## 📝 Notes

- Node.js 18+ required  
- Reports/screenshots are generated automatically in `reports/`  
- Show report with: npx playwright show-report reports/html

---

## 📌 References

- [Playwright Documentation](https://playwright.dev/docs/intro)  
- [TypeScript Documentation](https://www.typescriptlang.org/docs/)  
