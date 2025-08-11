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
    
    // Если указан язык, устанавливаем его через URL
    if (language) {
      await page.goto(`${htmlUrl}?lang=${language}`, { waitUntil: 'networkidle0' });
      
      // Ждем загрузки контента
      await page.waitForFunction(() => {
        return !document.querySelector('.loading') && document.querySelector('header');
      }, { timeout: 10000 });
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
