const puppeteer = require('puppeteer');
const path = require('path');
const fs = require('fs');

async function generatePDF(htmlFile, outputFile, language = null) {
  const browser = await puppeteer.launch({
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  try {
    const page = await browser.newPage();
    
    // Путь к HTML файлу
    const htmlPath = path.join(__dirname, '../public/cv', htmlFile);
    const htmlUrl = `file://${htmlPath}`;
    
    // Загружаем HTML файл
    await page.goto(htmlUrl, { waitUntil: 'networkidle0' });
    
    // Если указан язык, переключаемся на него
    if (language) {
      await page.evaluate((lang) => {
        const langBtn = document.querySelector(`[data-lang="${lang}"]`);
        if (langBtn) langBtn.click();
      }, language);
      
      // Ждем переключения языка
      await new Promise(resolve => setTimeout(resolve, 500));
    }

    // Генерируем PDF
    const pdfBuffer = await page.pdf({
      format: 'A4',
      printBackground: true,
      margin: {
        top: '20mm',
        right: '20mm',
        bottom: '20mm',
        left: '20mm'
      }
    });

    // Сохраняем PDF файл
    const outputPath = path.join(__dirname, '../public/cv', outputFile);
    fs.writeFileSync(outputPath, pdfBuffer);
    
    console.log(`✅ PDF файл успешно создан: ${outputPath}`);
    
  } catch (error) {
    console.error(`❌ Ошибка при генерации PDF для ${htmlFile}:`, error);
  } finally {
    await browser.close();
  }
}

async function generateAllPDFs() {
  console.log('🚀 Начинаю генерацию PDF файлов из мультиязычного HTML...');
  
  // Генерируем русскую версию
  await generatePDF('cv.html', 'cv-ru.pdf', 'ru');
  
  // Генерируем английскую версию
  await generatePDF('cv.html', 'cv-en.pdf', 'en');
  
  console.log('🎉 Генерация PDF файлов завершена!');
}

generateAllPDFs();
