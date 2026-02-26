import fs from 'fs';
import path from 'path';

function processDirectory(directory) {
    const files = fs.readdirSync(directory);

    for (const file of files) {
        const fullPath = path.join(directory, file);
        const stat = fs.statSync(fullPath);

        if (stat.isDirectory()) {
            processDirectory(fullPath);
        } else if (fullPath.endsWith('.tsx') || fullPath.endsWith('.ts')) {
            let content = fs.readFileSync(fullPath, 'utf8');
            const original = content;

            // Fix #0a0a0a
            content = content.replace(/bg-\[\#0a0a0a\]/g, 'bg-foreground/5 dark:bg-background');

            if (content !== original) {
                fs.writeFileSync(fullPath, content, 'utf8');
                console.log(`Updated: ${fullPath}`);
            }
        }
    }
}

processDirectory(path.join(process.cwd(), 'components'));
processDirectory(path.join(process.cwd(), 'app'));
console.log("Cleanup #0a0a0a Done.");
