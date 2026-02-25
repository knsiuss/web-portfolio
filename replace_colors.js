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

            // Safe replacements for standard classes only
            content = content.replace(/text-white(?![-\w])/g, 'text-foreground');
            content = content.replace(/text-white\/([0-9]+)/g, 'text-foreground/$1');
            content = content.replace(/border-white(?![-\w])/g, 'border-foreground');
            content = content.replace(/border-white\/([0-9]+)/g, 'border-foreground/$1');

            // bg-[#111] -> bg-black/5 dark:bg-white/5 for cards
            content = content.replace(/bg-\[\#111\]/g, 'bg-black/5 dark:bg-white/5 backdrop-blur-sm border border-black/10 dark:border-white/10');
            // bg-black -> bg-foreground (usually meaning the opposite of background text on hover)
            content = content.replace(/bg-black/g, 'bg-foreground');
            content = content.replace(/text-black/g, 'text-background');

            if (content !== original) {
                fs.writeFileSync(fullPath, content, 'utf8');
                console.log(`Updated: ${fullPath}`);
            }
        }
    }
}

processDirectory(path.join(process.cwd(), 'components'));
processDirectory(path.join(process.cwd(), 'app'));
console.log("Done.");
