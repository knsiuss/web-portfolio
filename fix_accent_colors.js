const fs = require('fs');
const path = require('path');

// Directories to scan
const dirs = [
    'components/sections',
    'components/ui',
    'components',
    'app',
];

const ROOT = path.join(__dirname);

// Text color replacements: only for foreground text (not bg-, border-, or hover:text-)
// We replace text-[#DFFF00] with text-racing-red so that in light mode it shows as dark olive
// We do NOT touch hover: states as those are intentional accent interactions
const finalText = (content) => {
    // Replace standalone text-[#DFFF00] (not bg-, border-, hover:, dark:, group-hover:)
    // Also replace fill-[#DFFF00] and stroke-[#DFFF00] for SVG elements
    return content
        // Text color - standalone (not in dark:/hover:/group-hover:)
        .replace(/(?<!dark:|hover:|group-hover:)text-\[#DFFF00\]/g, 'text-racing-red')
        // Also fix the "HERE" webkit text stroke
        .replace(/WebkitTextStroke: ['"]1\.5px #DFFF00['"]/g, "WebkitTextStroke: '1.5px var(--racing-red)'");
};

let totalChanged = 0;

for (const dir of dirs) {
    const fullDir = path.join(ROOT, dir);
    if (!fs.existsSync(fullDir)) continue;

    const files = fs.readdirSync(fullDir).filter(f => f.endsWith('.tsx') || f.endsWith('.ts'));

    for (const file of files) {
        const filePath = path.join(fullDir, file);
        const original = fs.readFileSync(filePath, 'utf8');
        const updated = finalText(original);

        if (original !== updated) {
            fs.writeFileSync(filePath, updated, 'utf8');
            const count = (original.match(/(?<!dark:|hover:|group-hover:)text-\[#DFFF00\]/g) || []).length;
            console.log(`✓ ${file}: replaced ${count} text-[#DFFF00] instances`);
            totalChanged++;
        }
    }
}

console.log(`\nDone. Updated ${totalChanged} files.`);
