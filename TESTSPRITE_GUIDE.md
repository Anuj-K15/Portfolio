# TestSprite Testing Guide for Portfolio

## 🎯 Test Coverage Plan

### Critical Features to Test

#### 1. **Mobile WebGL Rendering** (HIGH PRIORITY)

**Why**: This was just fixed - need to verify it works

**Test Scenarios:**

- [ ] Hero section loads without white canvas
- [ ] HoloAvatar shows 3D orb or fallback (⚡ icon)
- [ ] All skill orbs display content (no white boxes)
- [ ] First 2 skills work properly (previously broken)
- [ ] WebGL context limit enforced (max 6 on mobile)
- [ ] Fallback UI shows logos when WebGL unavailable

**TestSprite Commands:**

```
Test mobile rendering on iPhone 13 viewport
Verify hero orb loads without errors
Check skill section for white canvases
Test WebGL fallback behavior
```

---

#### 2. **LeetCode Stats Integration**

**Why**: Dynamic data fetching from GraphQL API

**Test Scenarios:**

- [ ] Stats load from LeetCode API
- [ ] Count-up animations work smoothly
- [ ] Donut chart renders correctly
- [ ] Difficulty breakdown displays (Easy/Medium/Hard)
- [ ] Error handling when API fails
- [ ] Loading states show properly

**TestSprite Commands:**

```
Navigate to LeetCode section
Verify stats are displayed
Test animation performance
Check error handling
```

---

#### 3. **Lazy Loading Sections**

**Why**: Performance optimization - sections load on scroll

**Test Scenarios:**

- [ ] Sections don't load until scrolled into view
- [ ] Smooth fade-in animations
- [ ] No white placeholder boxes
- [ ] IntersectionObserver triggers correctly
- [ ] Performance improvement vs loading all at once

**TestSprite Commands:**

```
Load homepage
Check if all sections are mounted initially
Scroll to each section
Verify lazy loading behavior
Measure performance metrics
```

---

#### 4. **Responsive Design**

**Why**: Portfolio must work on all device sizes

**Test Scenarios:**

- [ ] Mobile (320px - 768px)
- [ ] Tablet (768px - 1024px)
- [ ] Desktop (1024px+)
- [ ] Navigation adapts to screen size
- [ ] Text remains readable
- [ ] Images scale properly

**TestSprite Commands:**

```
Test on iPhone SE viewport
Test on iPad viewport
Test on desktop 1920x1080
Check responsive breakpoints
```

---

#### 5. **Performance & Loading**

**Why**: Fast load times crucial for user experience

**Test Scenarios:**

- [ ] Initial page load < 3 seconds
- [ ] First Contentful Paint (FCP) < 1.8s
- [ ] Largest Contentful Paint (LCP) < 2.5s
- [ ] Time to Interactive (TTI) < 3.5s
- [ ] No layout shifts (CLS score)

**TestSprite Commands:**

```
Measure page load time
Check Core Web Vitals
Test on slow 3G connection
Verify bundle size
```

---

#### 6. **Cross-Browser Compatibility**

**Why**: Users have different browsers

**Test Scenarios:**

- [ ] Chrome/Edge (Chromium)
- [ ] Safari (WebKit)
- [ ] Firefox (Gecko)
- [ ] Mobile Safari (iOS)
- [ ] Mobile Chrome (Android)

**TestSprite Commands:**

```
Test on Chrome
Test on Safari
Test on Firefox
Check mobile browsers
```

---

#### 7. **3D Canvas Interactions**

**Why**: Core visual feature

**Test Scenarios:**

- [ ] HoloAvatar orbits smoothly
- [ ] Skill orbs rotate in sync
- [ ] Logo billboards face camera
- [ ] OrbitControls work (desktop)
- [ ] Animations don't lag
- [ ] Transparent backgrounds render correctly

**TestSprite Commands:**

```
Test HoloAvatar animations
Verify skill orb rotations
Check canvas transparency
Test interaction controls
```

---

#### 8. **Accessibility (a11y)**

**Why**: Portfolio should be accessible to all users

**Test Scenarios:**

- [ ] Keyboard navigation works
- [ ] Screen reader compatible
- [ ] Color contrast ratios meet WCAG AA
- [ ] Alt text for images
- [ ] Focus indicators visible
- [ ] Semantic HTML structure

**TestSprite Commands:**

```
Run accessibility audit
Test keyboard navigation
Check ARIA labels
Verify color contrast
```

---

#### 9. **Contact Form**

**Why**: Users need to reach you

**Test Scenarios:**

- [ ] Form validation works
- [ ] Email field validates format
- [ ] Required fields show errors
- [ ] Submit button functions
- [ ] Success/error messages display
- [ ] No spam submissions

**TestSprite Commands:**

```
Test form validation
Submit with invalid data
Submit with valid data
Check error messages
```

---

#### 10. **Experience Timeline**

**Why**: Showcase your work history

**Test Scenarios:**

- [ ] Timeline renders chronologically
- [ ] Company logos load
- [ ] Descriptions readable
- [ ] Responsive on mobile
- [ ] Animations smooth

**TestSprite Commands:**

```
Navigate to experience section
Verify timeline order
Check logo loading
Test mobile layout
```

---

## 🚀 Getting Started with TestSprite

### Step 1: Verify TestSprite MCP is Running

In VS Code, check the MCP status:

1. Open GitHub Copilot Chat
2. Type: `@TestSprite help`
3. You should see TestSprite respond

### Step 2: Basic Test Commands

```bash
# Test homepage load
@TestSprite open http://localhost:3000 and verify the page loads

# Test mobile viewport
@TestSprite test on iPhone 13 Pro viewport

# Take screenshot
@TestSprite take a screenshot of the hero section

# Check for errors
@TestSprite check console for errors
```

### Step 3: Advanced Testing

```bash
# Performance test
@TestSprite measure Core Web Vitals for http://localhost:3000

# Mobile WebGL test
@TestSprite open http://localhost:3000 on mobile viewport and check for white canvases

# Lazy loading test
@TestSprite scroll to each section and verify lazy loading

# API integration test
@TestSprite wait for LeetCode stats to load and verify data
```

---

## 📊 Test Prioritization

### 🔴 **Critical (Test First)**

1. Mobile WebGL rendering (just fixed!)
2. Page loads without errors
3. All sections visible
4. Responsive design works

### 🟡 **Important (Test Next)**

5. LeetCode API integration
6. Lazy loading performance
7. Cross-browser compatibility
8. 3D animations smooth

### 🟢 **Nice to Have (Test Later)**

9. Accessibility audit
10. Form validation
11. Experience timeline
12. SEO optimization

---

## 🐛 Known Issues to Verify Fixed

### Issue #1: Mobile White Canvases

**Status**: Should be fixed ✅
**Test**:

```
@TestSprite open http://localhost:3000 on iPhone SE viewport
@TestSprite scroll to skills section
@TestSprite verify no white canvases exist
```

### Issue #2: WebGL Context Limits

**Status**: Should be managed ✅
**Test**:

```
@TestSprite check how many canvas elements exist
@TestSprite verify max 6 WebGL contexts on mobile
```

### Issue #3: Texture Loading Timeouts

**Status**: Should timeout properly ✅
**Test**:

```
@TestSprite simulate slow 3G network
@TestSprite verify textures load or fallback shows
```

---

## 📝 TestSprite Command Examples

### Visual Testing

```bash
# Compare before/after
@TestSprite take screenshot of hero section
@TestSprite compare with previous screenshot

# Visual regression
@TestSprite capture full page screenshot
@TestSprite check for visual differences
```

### Performance Testing

```bash
# Load time
@TestSprite measure page load time

# Resource usage
@TestSprite check memory usage
@TestSprite monitor CPU usage

# Network
@TestSprite throttle to slow 3G
@TestSprite measure load time
```

### Functional Testing

```bash
# Navigation
@TestSprite click on navigation links
@TestSprite verify smooth scrolling

# Interactions
@TestSprite hover over skill orb
@TestSprite verify animation plays
```

### Mobile Testing

```bash
# Different devices
@TestSprite test on iPhone 13 Pro
@TestSprite test on Samsung Galaxy S21
@TestSprite test on iPad Pro

# Orientations
@TestSprite rotate to landscape
@TestSprite verify layout adapts
```

---

## 🎯 Success Criteria

### ✅ All Tests Pass When:

1. **No console errors** in any browser
2. **All sections load** without white screens
3. **Mobile WebGL works** or shows proper fallbacks
4. **Page loads in < 3 seconds** on 4G
5. **Responsive on all devices** (320px - 2560px)
6. **LeetCode stats display** correctly
7. **Animations run smoothly** (60fps)
8. **Accessibility score > 90** (Lighthouse)
9. **No memory leaks** after 5 minutes
10. **Works in Chrome, Safari, Firefox**

---

## 📋 Test Report Template

After testing, document results:

```markdown
## Test Report - [Date]

### Environment

- URL: http://localhost:3000
- Browser: Chrome 120
- Viewport: iPhone 13 Pro (390x844)

### Results

- [ ] ✅ Mobile WebGL rendering
- [ ] ✅ LeetCode API integration
- [ ] ✅ Lazy loading works
- [ ] ✅ Responsive design
- [ ] ❌ Performance (needs optimization)

### Issues Found

1. **Issue**: [Description]
   **Severity**: High/Medium/Low
   **Steps**: [How to reproduce]

### Performance Metrics

- Load Time: 2.1s
- FCP: 1.2s
- LCP: 1.8s
- CLS: 0.05

### Recommendations

1. [Suggestion 1]
2. [Suggestion 2]
```

---

## 🔗 Useful Resources

- **Your Portfolio**: http://localhost:3000
- **TestSprite Docs**: Available via `@TestSprite help`
- **Next.js Docs**: https://nextjs.org/docs
- **Three.js Docs**: https://threejs.org/docs

---

## 💡 Pro Tips

1. **Test mobile first** - most issues appear there
2. **Use real devices** when possible (not just DevTools)
3. **Test on slow connections** (3G throttling)
4. **Check multiple browsers** - WebGL behaves differently
5. **Monitor performance** - watch for memory leaks
6. **Document everything** - screenshots help debug issues

---

## 🚨 Common TestSprite Issues

### Issue: TestSprite not responding

**Solution**: Restart VS Code or check MCP server status

### Issue: Can't access localhost

**Solution**: Make sure dev server is running (`npm run dev`)

### Issue: Tests timing out

**Solution**: Increase timeout or check network connection

### Issue: Screenshots not capturing

**Solution**: Wait for page load complete before screenshot

---

**Ready to start testing?** 🧪

Run this command in Copilot Chat:

```
@TestSprite open http://localhost:3000 and verify the homepage loads without errors
```

Good luck! 🚀
