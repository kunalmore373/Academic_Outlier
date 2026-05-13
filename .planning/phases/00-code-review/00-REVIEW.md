---
status: issues_found
phase: 00
phase_name: Initial Code Review
date: 2026-05-12
files_reviewed: 2
critical: 0
warning: 3
info: 4
total: 7
---

# Code Review: Phase 00 (Initial Code Review)

## 📋 Summary
Review of key configuration files for Backend (Auth) and Frontend (Global Styles).

## 🔍 Findings

### ⚠️ WARNINGS

#### ### WR-01: Hardcoded Callback URL Fallback
- **File**: `Backend/src/config/passport.js:10`
- **Finding**: The `callbackURL` has a hardcoded fallback to a Render URL.
- **Impact**: If `GOOGLE_CALLBACK_URL` is missing in other environments (local dev, staging), it will redirect to production, causing authentication failures.
- **Recommendation**: Remove the hardcoded fallback or use a relative path if supported by the provider, or ensure the env var is mandatory.

#### ### WR-02: Potential Null Pointer on Profile Emails
- **File**: `Backend/src/config/passport.js:14`
- **Finding**: Accessing `profile.emails[0].value` without checking if `profile.emails` exists.
- **Impact**: If a Google profile is returned without an email (rare but possible depending on scopes), the server will crash.
- **Recommendation**: Use optional chaining: `profile?.emails?.[0]?.value`.

#### ### WR-03: Mix of Vanilla CSS and Tailwind
- **File**: `frontend/academic_outlier/src/index.css`
- **Finding**: Global styles and variables are defined in vanilla CSS instead of Tailwind's configuration.
- **Impact**: Harder to maintain consistency across components that use Tailwind utilities.
- **Recommendation**: Move theme variables (`--primary`, etc.) to `tailwind.config.js` under `theme.extend`.

### ℹ️ INFO

#### ### IN-01: Font Loading via @import
- **File**: `frontend/academic_outlier/src/index.css:5`
- **Finding**: Loading Google Fonts via `@import` in CSS.
- **Impact**: Can cause a slight delay in font rendering (FOIT/FOUT).
- **Recommendation**: Use `<link rel="preconnect">` and `<link rel="stylesheet">` in the HTML head for better performance.

#### ### IN-02: Redundant CSS Reset
- **File**: `frontend/academic_outlier/src/index.css:22`
- **Finding**: Manual `*` box-sizing and margin/padding reset.
- **Impact**: Tailwind's `Preflight` already includes a comprehensive reset.
- **Recommendation**: Remove redundant resets to keep the CSS file lean.

#### ### IN-03: Unused OAuth Tokens
- **File**: `Backend/src/config/passport.js:12`
- **Finding**: `accessToken` and `refreshToken` are received but not stored or used.
- **Impact**: None currently, but if future features require acting on behalf of the user, these will need to be persisted.
- **Recommendation**: Consider if these will be needed; if not, ignore is fine.

#### ### IN-04: Hardcoded Default Profile Values
- **File**: `Backend/src/config/passport.js:30-31`
- **Finding**: `currentDegree: 'Other'` and `annualBudget: 0` are hardcoded defaults.
- **Impact**: New users will always start with these specific values.
- **Recommendation**: Ensure these align with the desired UX for first-time signups.

## 🚀 Next Steps
- [ ] Address **WR-01** by moving all URLs to environment variables.
- [ ] Add safety checks for profile data (**WR-02**).
- [ ] Refactor styles into `tailwind.config.js` (**WR-03**).
