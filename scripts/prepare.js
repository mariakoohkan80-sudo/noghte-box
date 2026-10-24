// فونت و کتابخانه‌ی Supabase رو از node_modules کپی می‌کنه داخل www
// و آدرس‌های اینترنتی داخل index.html رو به فایل‌های لوکال تغییر می‌ده.
const fs = require('fs');
const path = require('path');

const root = path.join(__dirname, '..');
const www = path.join(root, 'www');
fs.rmSync(www, { recursive: true, force: true });
fs.mkdirSync(path.join(www, 'fonts'), { recursive: true });
fs.mkdirSync(path.join(www, 'vendor'), { recursive: true });

function findFile(dir, test) {
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, e.name);
    if (e.isDirectory()) { const r = findFile(p, test); if (r) return r; }
    else if (test(p)) return p;
  }
  return null;
}

// فونت وزیرمتن (نسخه‌ی variable که همه‌ی وزن‌ها رو داره)
const fontSrc = findFile(path.join(root, 'node_modules/vazirmatn'),
  p => /Vazirmatn.*wght.*\.woff2$/i.test(p) && !/RD|UI|NL/i.test(path.basename(p)));
if (!fontSrc) throw new Error('فایل فونت پیدا نشد. اول npm install رو اجرا کن.');
fs.copyFileSync(fontSrc, path.join(www, 'fonts/Vazirmatn.woff2'));

// Supabase UMD
const sbSrc = path.join(root, 'node_modules/@supabase/supabase-js/dist/umd/supabase.js');
if (!fs.existsSync(sbSrc)) throw new Error('supabase.js پیدا نشد. اول npm install رو اجرا کن.');
fs.copyFileSync(sbSrc, path.join(www, 'vendor/supabase.js'));

// اصلاح index.html
let html = fs.readFileSync(path.join(root, 'src/index.html'), 'utf8');
const fontLink = /<link href="https:\/\/fonts\.googleapis\.com\/css2\?family=Vazirmatn[^>]*>/;
const sbScript = /<script src="https:\/\/cdn\.jsdelivr\.net\/npm\/@supabase\/supabase-js@2\/dist\/umd\/supabase\.js"><\/script>/;
if (!fontLink.test(html) || !sbScript.test(html)) throw new Error('تگ فونت یا supabase توی index.html پیدا نشد.');
html = html
  .replace(fontLink, "<style>@font-face{font-family:Vazirmatn;src:url(fonts/Vazirmatn.woff2) format('woff2');font-weight:100 900;font-display:swap}</style>")
  .replace(sbScript, '<script src="vendor/supabase.js"></script>');
fs.writeFileSync(path.join(www, 'index.html'), html);

console.log('www آماده شد ✅');
