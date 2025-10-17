# Quick Test Checklist - Portfolio

## 🚀 Quick Start

Your dev server is running at: **http://localhost:3000**

---

## ✅ Essential Tests (5 minutes)

### 1. Basic Load Test

```
@TestSprite open http://localhost:3000 and verify page loads
```

- [ ] Page loads without errors
- [ ] No console errors
- [ ] All sections visible

### 2. Mobile WebGL Test (CRITICAL!)

```
@TestSprite open http://localhost:3000 on iPhone 13 viewport
@TestSprite scroll to skills section and check for white canvases
```

- [ ] Hero orb shows (3D or ⚡ fallback)
- [ ] No white canvases in skills section
- [ ] All skill orbs display content

### 3. Responsive Test

```
@TestSprite test on mobile, tablet, and desktop viewports
```

- [ ] Mobile (390x844): All content readable
- [ ] Tablet (768x1024): Layout adapts
- [ ] Desktop (1920x1080): Full layout works

### 4. Performance Test

```
@TestSprite measure page load time
```

- [ ] Load time < 3 seconds
- [ ] No layout shifts
- [ ] Smooth scrolling

### 5. LeetCode Integration Test

```
@TestSprite scroll to LeetCode section and verify stats display
```

- [ ] Stats load from API
- [ ] Numbers count up smoothly
- [ ] Donut chart renders

---

## 🎯 Priority Tests

### High Priority (Must Pass) 🔴

1. ✅ Mobile WebGL rendering
2. ✅ Page loads without errors
3. ✅ Responsive on all devices
4. ✅ No console errors

### Medium Priority (Should Pass) 🟡

5. ⬜ LeetCode API working
6. ⬜ Lazy loading sections
7. ⬜ Smooth animations
8. ⬜ Cross-browser compatible

### Low Priority (Nice to Have) 🟢

9. ⬜ Accessibility score > 90
10. ⬜ Perfect performance metrics

---

## 📱 Device-Specific Tests

### iPhone Testing

```
@TestSprite test on iPhone SE (375x667)
@TestSprite test on iPhone 13 Pro (390x844)
@TestSprite test on iPhone 15 Pro Max (430x932)
```

### Android Testing

```
@TestSprite test on Samsung Galaxy S21 (360x800)
@TestSprite test on Pixel 7 (412x915)
```

### Tablet Testing

```
@TestSprite test on iPad (768x1024)
@TestSprite test on iPad Pro (1024x1366)
```

---

## 🐛 Bug Verification Checklist

### Recently Fixed Issues:

- [ ] ✅ Mobile white canvases (should be fixed)
- [ ] ✅ First 2 skills broken (should be fixed)
- [ ] ✅ WebGL context limit (should be managed)
- [ ] ✅ Texture loading timeout (should work)

### If Issues Persist:

1. Hard refresh: `Ctrl+Shift+R` (Windows) / `Cmd+Shift+R` (Mac)
2. Clear cache and reload
3. Check browser console for errors
4. Test in incognito/private mode

---

## 🎬 Quick TestSprite Commands

### Visual Testing

```bash
@TestSprite take screenshot of homepage
@TestSprite capture hero section
@TestSprite screenshot skills section
```

### Interaction Testing

```bash
@TestSprite scroll to bottom of page
@TestSprite click navigation menu
@TestSprite hover over skill orb
```

### Performance Testing

```bash
@TestSprite measure Core Web Vitals
@TestSprite check memory usage
@TestSprite simulate slow 3G network
```

### Mobile Testing

```bash
@TestSprite rotate to landscape mode
@TestSprite test touch interactions
@TestSprite verify mobile menu
```

---

## 📊 Expected Results

### ✅ PASS Criteria:

- No white canvases on any device
- Page loads in < 3 seconds
- All sections display correctly
- Smooth animations (60fps)
- No console errors
- Responsive on 320px - 2560px

### ❌ FAIL Criteria:

- White canvases appear
- Console errors present
- Page takes > 5 seconds to load
- Layout breaks on mobile
- WebGL crashes
- Memory leaks detected

---

## 🔄 Test Workflow

1. **Start Dev Server** ✅ (Already running!)

   ```
   http://localhost:3000
   ```

2. **Run Quick Tests** (5 min)

   - Basic load
   - Mobile WebGL
   - Responsive layout

3. **Run Full Tests** (15 min)

   - All device sizes
   - Performance metrics
   - Cross-browser

4. **Document Results**

   - Note any issues
   - Take screenshots
   - Record metrics

5. **Fix Issues** (if any)
   - Reproduce bug
   - Apply fix
   - Re-test

---

## 💬 Example Test Session

### Start Testing:

```
Me: @TestSprite open http://localhost:3000
TestSprite: Opening http://localhost:3000...

Me: @TestSprite verify page loads without errors
TestSprite: ✅ Page loaded successfully. No errors found.

Me: @TestSprite test on iPhone 13 Pro viewport
TestSprite: ✅ Viewport set to iPhone 13 Pro (390x844)

Me: @TestSprite scroll to skills section
TestSprite: ✅ Scrolled to skills section

Me: @TestSprite check for white canvases
TestSprite: ✅ No white canvases detected. All skill orbs display content.

Me: @TestSprite take screenshot
TestSprite: ✅ Screenshot captured
```

---

## 🎯 Today's Focus: Mobile WebGL

Since we just fixed the mobile WebGL issues, focus on these tests:

### Test 1: Hero Section

```
@TestSprite open http://localhost:3000 on mobile
@TestSprite verify hero orb is visible
@TestSprite check if orb is 3D or shows fallback icon
```

### Test 2: Skills Section

```
@TestSprite scroll to skills section
@TestSprite count how many skill orbs are visible
@TestSprite verify no white canvases exist
@TestSprite check if logos load correctly
```

### Test 3: Context Limit

```
@TestSprite count canvas elements on page
@TestSprite verify less than 7 WebGL contexts on mobile
```

### Test 4: Fallback UI

```
@TestSprite simulate WebGL disabled
@TestSprite verify fallback UI shows logos or badges
@TestSprite check no white screens appear
```

---

## 📝 Quick Notes

**Current Status:**

- ✅ Dev server running: http://localhost:3000
- ✅ Mobile fixes applied
- ✅ Build successful
- ⏳ Ready for testing

**Next Steps:**

1. Run basic load test
2. Test mobile WebGL rendering
3. Verify no white canvases
4. Check responsive design
5. Document any issues

---

## 🆘 Need Help?

### If TestSprite isn't working:

1. Check if MCP server is running
2. Restart VS Code
3. Verify settings.json configuration
4. Try manual testing in browser

### If tests fail:

1. Check browser console
2. Hard refresh page
3. Clear cache
4. Test in incognito mode
5. Try different browser

---

**Ready?** Start with this command:

```
@TestSprite open http://localhost:3000 and verify homepage loads successfully
```

🚀 Happy Testing!
