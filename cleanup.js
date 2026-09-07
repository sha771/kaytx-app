const fs = require('fs');
const path = require('path');

function rmDir(dirPath) {
    if (fs.existsSync(dirPath)) {
        fs.readdirSync(dirPath).forEach(entry => {
            const entryPath = path.join(dirPath, entry);
            try {
                const stat = fs.statSync(entryPath);
                if (stat.isDirectory()) {
                    rmDir(entryPath);
                } else {
                    try { fs.unlinkSync(entryPath); } catch (e) {}
                }
            } catch (e) {
                try { fs.rmSync(entryPath, { recursive: true, force: true }); } catch (e2) {}
            }
        });
        try { fs.rmdirSync(dirPath); } catch (e) { try { fs.rmSync(dirPath, { recursive: true, force: true }); } catch (e2) {} }
    }
}

rmDir(path.join(__dirname, 'node_modules'));
console.log('node_modules deleted');
