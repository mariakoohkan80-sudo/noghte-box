# ساخت APK بازی نقطه و جعبه

## پیش‌نیازها (یک بار نصب کن)
1. Node.js نسخه‌ی 20 یا بالاتر
2. Android Studio (همراه خودش JDK و Android SDK نصب می‌شه)

## مراحل
داخل پوشه‌ی پروژه ترمینال باز کن و به ترتیب اجرا کن:

```
npm install
npm run prepare-web
npx cap add android
npx cap sync android
npx cap open android
```

توی Android Studio صبر کن Gradle sync تموم شه، بعد:
- **APK برای تست:** Build ← Build Bundle(s) / APK(s) ← Build APK(s)
- **برای مارکت (AAB / APK امضاشده):** Build ← Generate Signed Bundle / APK

## بعد از هر تغییر توی بازی
فقط `src/index.html` رو ویرایش کن و بعد:
```
npm run sync
```
و دوباره از Android Studio بیلد بگیر.

## قبل از انتشار توی مارکت
- `appId` توی `capacitor.config.json` رو به یه شناسه‌ی یکتای خودت تغییر بده (مثلاً `ir.yourname.noghtebox`) و **بعد از انتشار دیگه عوضش نکن**.
- آیکون: یه عکس ۱۰۲۴×۱۰۲۴ بساز و با `npm i -D @capacitor/assets` و `npx capacitor-assets generate --android` آیکون‌ها رو بساز (عکس رو بذار توی `assets/icon-only.png`).
- فایل keystore که برای امضا می‌سازی رو حتماً نگه دار و پسوردش رو گم نکن؛ بدونش نمی‌تونی آپدیت بدی.
