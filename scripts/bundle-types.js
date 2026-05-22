import fs from 'fs';
import path from 'path';

const tempDir = './dist/types-temp/src';
const outputFile = './dist/types.d.ts';
const headerFile = './src/types.d.ts';

function bundleTypes() {
    // 1. Читаем заголовок (ваши интерфейсы и declare global)
    let finalContent = '';
    if (fs.existsSync(headerFile)) {
        finalContent += fs.readFileSync(headerFile, 'utf8') + '\n';
    }

    // 2. Получаем список всех .d.ts файлов в папке, исключая index.d.ts
    // (потому что index.d.ts в temp обычно содержит просто export { ... })
    const files = fs
        .readdirSync(tempDir, { recursive: true })
        // @ts-ignore
        .filter(file => file.endsWith('.d.ts') && file !== 'index.d.ts');

    console.log(`Found ${files.length} type files to bundle...`);

    files.forEach(file => {
        // @ts-ignore
        const filePath = path.join(tempDir, file);
        console.log(filePath);
        let content = fs.readFileSync(filePath, 'utf8');

        // 3. Очистка содержимого
        content = content;
        content = content
            // Удаляем стандартные импорты и ре-экспорты
            .replace(/^(import|export).*?from\s+['"].*?['"];?/gm, '')
            // УДАЛЯЕМ ИНЛАЙН-ИМПОРТЫ: заменяем import("../../index.js").TypeName на TypeName
            .replace(/import\(['"].*?['"]\)\./g, '')
            // Удаляем пустые строки
            .trim();

        if (content) {
            finalContent += `\n/* From ${file} */\n` + content + '\n';
        }
    });

    // 4. Финальная чистка: убираем множественные пустые строки
    finalContent = finalContent.replace(/\n{3,}/g, '\n\n');

    fs.writeFileSync(outputFile, finalContent);
    console.log(`Bundle created: ${outputFile}`);
}

bundleTypes();
