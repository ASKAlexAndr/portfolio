const puppeteer = require('puppeteer');
const path = require('path');
const fs = require('fs');

async function generatePDF(htmlFile, outputFile) {
  const browser = await puppeteer.launch({
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  try {
    const page = await browser.newPage();
    
    // Путь к HTML файлу
    const htmlPath = path.join(__dirname, '../public/cv', htmlFile);
    const htmlContent = fs.readFileSync(htmlPath, 'utf8');
    
    // Устанавливаем содержимое страницы
    await page.setContent(htmlContent, {
      waitUntil: 'networkidle0'
    });

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
  console.log('🚀 Начинаю генерацию PDF файлов...');
  
  // Генерируем русскую версию
  await generatePDF('cv-ru.html', 'cv-ru.pdf');
  
  // Генерируем английскую версию
  await generatePDF('cv-en.html', 'cv-en.pdf');
  
  console.log('🎉 Генерация PDF файлов завершена!');
}

generateAllPDFs();
