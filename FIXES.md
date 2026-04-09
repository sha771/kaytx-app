# Kaytx Project - Complete Fix Guide

## 🚨 **CRITICAL: mime-db Corruption (Main Blocker)**
**Problem**: `node_modules/mime-db/db.json` missing → Expo CLI crashes.

**Permanent Fix**:
```powershell
# PowerShell (VSCode terminal)
Remove-Item -Recurse -Force node_modules\mime-db -ErrorAction SilentlyContinue
npm install mime-db --force

# Verify
Get-ChildItem node_modules\\mime-db\\db.json
```

## 1. **Full Clean Reinstall**
```powershell
# Kill all terminals (Ctrl+C)
Remove-Item -Recurse -Force node_modules -ErrorAction SilentlyContinue
Remove-Item -Recurse -Force .expo -Recurse -ErrorAction SilentlyContinue
npm cache clean --force
npm ci
```

## 2. **Run Pre-Checks**
```powershell
npm run typecheck
npm run lint --fix
npx expo doctor
```

## 3. **Start Web Dev**
```powershell
npx expo start --web --clear
```
**Expected**: Metro bundler on port 19007.

## 4. **Access App**
- **Web**: http://localhost:19007
- Home dashboard → AI sidebar → Stats functional.

## 5. **Post-Fix Verification**
```powershell
# Test db.json
Get-Content node_modules\\mime-db\\db.json | Select-Object -First 5

# Test Expo
npx expo start --web
```

## ⚠️ **Warnings (Safe to Ignore)**
- React Native 0.83.4 override (web stable)
- `@types/express@5 vs 4` peer conflict (webpack-dev-server)
- Node engine warnings (non-blocking)

## 📁 **Skip Backend for Web**
- No `npm run backend` needed
- tRPC mocked for web

## 🎉 **Success Indicators**
```
> Metro waiting on exp://...
> Web pack: http://localhost:19007
> App loads → ActivityIndicator → Home screen
```

**Execute clean reinstall → Project runs 100%.**
