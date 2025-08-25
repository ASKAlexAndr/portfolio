#!/bin/bash

echo "🚀 Начинаем деплой на GitHub Pages..."

# Проверяем, что мы в правильной директории
if [ ! -f "package.json" ]; then
    echo "❌ Ошибка: package.json не найден. Убедитесь, что вы в корневой папке проекта."
    exit 1
fi

# Проверяем статус git
if [ -n "$(git status --porcelain)" ]; then
    echo "⚠️  Внимание: есть незакоммиченные изменения"
    echo "Хотите закоммитить их? (y/n)"
    read -r response
    if [[ "$response" =~ ^[Yy]$ ]]; then
        git add .
        git commit -m "Auto-commit before deployment"
    fi
fi

# Собираем проект
echo "📦 Собираем проект..."
npm run build

if [ $? -ne 0 ]; then
    echo "❌ Ошибка сборки. Проверьте логи выше."
    exit 1
fi

echo "✅ Сборка завершена успешно!"

# Пушим изменения
echo "📤 Пушим изменения в репозиторий..."
git push origin main

if [ $? -ne 0 ]; then
    echo "❌ Ошибка при пуше. Проверьте настройки git."
    exit 1
fi

echo "✅ Изменения отправлены в репозиторий!"
echo "🌐 GitHub Actions автоматически задеплоит сайт на GitHub Pages"
echo "📋 Проверьте статус деплоя: https://github.com/yourusername/portfolio/actions"
echo "🔗 После деплоя сайт будет доступен: https://yourusername.github.io/portfolio/"
