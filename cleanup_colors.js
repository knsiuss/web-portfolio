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

            // Fix the botched bg-[#111] replacements
            content = content.replace(/bg-foreground\/5 dark:bg-white\/5 backdrop-blur-sm border border-black\/10 dark:border-foreground\/10( border border-foreground\/10)?/g, 'bg-foreground/5 backdrop-blur-md border border-foreground/10');

            // Fix WebkitTextStroke in ProjectsSection.tsx
            content = content.replace(/WebkitTextStroke: '2px white'/g, "WebkitTextStroke: '2px var(--color-foreground)'");

            // Fix bg-black to bg-background or bg-foreground based on context
            content = content.replace(/bg-black text-white/g, 'bg-background text-foreground');

            if (content !== original) {
                fs.writeFileSync(fullPath, content, 'utf8');
                console.log(`Updated: ${fullPath}`);
            }
        }
    }
}

processDirectory(path.join(process.cwd(), 'components'));
console.log("Cleanup Done.");
