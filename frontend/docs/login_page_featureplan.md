BORGai Login Page - Design Specification

Gültig für: BORGai - Intelligent Core Supply Forecasting Platform
Design Fokus: Modern, Professional, TUM Corporate Design
TUM Corporate Colors: TUM Blue (#0065BD) + Grey (#6E685F) + Supporting Colors
Status: Updated Specification aligned with PRD Design System
Version: 2.0 - Ready for Implementation
1. DESIGN APPROACH: LEAN & APPEALING ⭐ FINAL DECISION

**Selected Pattern: Minimalist Focus Model**

**Core Design Philosophy:**
- **Lean**: Maximum white space, minimal elements, zero clutter
- **Appealing**: Clean typography, subtle shadows, professional color palette
- **Functional**: Single-purpose page - get user authenticated quickly

**Key Design Principles:**
1. **Generous White Space**: 40px+ margins around form card
2. **Single Column Layout**: All elements vertically stacked, centered
3. **Subtle Depth**: Light shadow on card (no heavy borders)
4. **Clear Hierarchy**: Large title → subtle subtitle → clean form
5. **Minimal Distractions**: No navigation, no sidebars, just login

**Visual Appeal Strategy:**
- Crisp borders with TUM Blue accent on focus
- Smooth transitions (150ms) for professional feel
- Consistent 4px border-radius for modern look
- Ample padding (32px in card) for breathing room
- Logo placement: Small, top center, non-distracting

2. FINAL LEAN STRUCTURE - SIMPLIFIED (UPDATED V2.1)

**Actual Implementation (Lean Version with Footer):**

```
┌─────────────────────────────────────────────────────────┐
│                    FULL PAGE BACKGROUND                  │
│                    (#FAFAFA - Light Grey)                │
│                                                          │
│                     (40px whitespace)                    │
│                                                          │
│  ┌─────────────────────────────────────────────────┐   │
│  │              TOP BRANDING (centered)             │   │
│  │    [BORGai Logo - logo_no_bg.svg] (96px height) │   │
│  │    BORGai                (36px, TUM Blue, bold) │   │
│  │    Intelligent Core Supply Forecasting Platform │   │
│  │    (16px, Grey, weight 600)                     │   │
│  └─────────────────────────────────────────────────┘   │
│                                                          │
│                     (24px whitespace)                    │
│                                                          │
│  ┌─────────────────────────────────────────────────┐   │
│  │              WHITE CARD (max-width 400px)        │   │
│  │              shadow: 0 2px 4px rgba(0,0,0,0.1)  │   │
│  │              padding: 32px                       │   │
│  │                                                  │   │
│  │    Email Address             (14px label)       │   │
│  │    [_________________________]                  │   │
│  │                                                  │   │
│  │    Password                  (14px label)       │   │
│  │    [_______________________👁]                  │   │
│  │                                                  │   │
│  │    [✓] Remember me                              │   │
│  │                                                  │   │
│  │    [     → Login      ]      (BLACK button)     │   │
│  │                                                  │   │
│  │    ─────────────────── (16px gap)               │   │
│  │                                                  │   │
│  │    📋 Demo Credentials (subtle background)      │   │
│  │    Email: demo@borgai.platform                  │   │
│  │    Password: demo1234 (copy icon)               │   │
│  │                                                  │   │
│  └─────────────────────────────────────────────────┘   │
│                                                          │
│                     (40px whitespace)                    │
│                                                          │
│  ┌─────────────────────────────────────────────────┐   │
│  │               FOOTER (centered)                  │   │
│  │    powered by                                    │   │
│  │    Team 66 | Christian Güttler and Robert Hoffmann│
│  │    REMAN Challenge 2025 - The Power of AI...    │   │
│  │    [TUM Logo]  [BORGai Logo]                     │   │
│  └─────────────────────────────────────────────────┘   │
│                                                          │
└─────────────────────────────────────────────────────────┘
```

**REMOVED FOR LEAN DESIGN:**
- ❌ Footer links (not needed for demo)
- ❌ "Forgot Password" link (not functional in demo)
- ❌ "Sign Up" link (not needed)
- ❌ Heavy branding text (keep it minimal)

**KEPT FOR FUNCTIONALITY:**
- ✅ Email + Password inputs
- ✅ Remember me checkbox
- ✅ Login button
- ✅ Demo credentials (clearly visible, easy to use)

3. FINAL LAYOUT SPECIFICATION

**Desktop (≥768px):**
```
Viewport: 100vw × 100vh
Background: #FAFAFA (fills entire screen)

Card Container:
  - Width: 400px (fixed)
  - Position: Centered (margin: auto)
  - Vertical positioning: 10vh from top
  - Background: White (#FFFFFF)
  - Shadow: 0 2px 4px rgba(0,0,0,0.1)
  - Border-radius: 8px
  - Padding: 32px

Logo Section (above card):
  - Width: 400px
  - Centered
  - Height: 40px
  - Margin-bottom: 24px
  - Logos: 24px height each
```

**Mobile (<768px):**
```
Card Container:
  - Width: calc(100vw - 40px) [20px margins each side]
  - Max-width: 400px
  - Position: Centered
  - Vertical positioning: 5vh from top
  - Padding: 24px (reduced)

Logo Section:
  - Width: Match card
  - Logos: 20px height (smaller)
  
Inputs:
  - Font-size: 16px (prevents iOS zoom)

Button:
  - Height: 56px (easier touch target)
```

**Spacing Inside Card:**
- Title → Subtitle: 8px
- Subtitle → First input: 24px
- Between inputs: 16px
- Input → Checkbox: 16px
- Checkbox → Button: 20px
- Button → Demo section: 20px
- Demo section padding: 12px (compact)

4. COLOR STRATEGY (TUM Corporate Design - Per PRD Section 6)
Primary Palette (TUM Official)

text
TUM Blue (Primary):   #0065BD (buttons, links, accents, focus states)
TUM Blue Hover:       #004E92 (darker for hover states)
TUM Blue Light:       #E6F0F9 (subtle backgrounds, 10% opacity)

Grey (Secondary):     #6E685F (secondary text, borders)
Grey Light:           #E5E3E0 (lighter borders, dividers - Grey 20%)
Grey Dark:            #333333 (primary text - Grey 80%)

White:                #FFFFFF (backgrounds, card surfaces)
Black:                #000000 (high-contrast text, minimal use)

Accent/Error:         #E37222 (Orange - for validation, alerts)
Success:              #A2AD00 (Green - for confirmations)
Warning:              #FFDC00 (Yellow - for warnings)

Application Rules (Per PRD)

    Buttons: Background #0065BD (TUM Blue), white text, hover #004E92

    Links: TUM Blue #0065BD with underline on hover

    Input Fields: 1px solid #E5E3E0 (Grey Light), focus ring 2px #0065BD

    Form Background: White card (#FFFFFF) with subtle shadow on light grey backdrop

    Primary Text: #333333 (Grey 80%)

    Secondary Text: #6E685F (Grey)

    Logo Colors: Use SVG files provided (TUM logo, REMAN logo)

5. TYPOGRAPHY HIERARCHY (Per PRD Section 6)
Typography Stack (TUM Corporate)

text
Font Family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Helvetica, sans-serif
Note: TUM uses Helvetica/Arial family for corporate design

H1 - Page Title: 32px | weight 600 | color #333333 | line-height 1.2
      "BORGai"

H2 - Subtitle: 16px | weight 400 | color #6E685F | line-height 1.5
      "Intelligent Core Supply Forecasting Platform"

Form Labels: 14px | weight 500 | color #333333 | line-height 1.4
      "Email Address" / "Password"

Body/Inputs: 14px | weight 400 | color #333333 | line-height 1.6
      Input placeholder text (#6E685F for placeholders)

Small/Hints: 12px | weight 400 | color #6E685F
      "Forgot password?" / "Demo credentials"

Footer: 11px | weight 400 | color #6E685F

6. COMPONENT DETAILS
Email Input Field

text
┌─────────────────────────────────┐
│ Email Address                   │ (label above, 14px, #333333)
│ ┌─────────────────────────────┐ │
│ │ you@company.com             │ (placeholder, #6E685F)
│ │█                              │ (cursor)
│ └─────────────────────────────┘ │
│ 1px border: #E5E3E0 (Grey Light) │
│ focus: 2px solid #0065BD         │
│ padding: 12px 16px               │
│ border-radius: 4px               │
└─────────────────────────────────┘

Password Input Field

text
┌─────────────────────────────────┐
│ Password                        │ (label, 14px, #333333)
│ ┌─────────────────────────────┐ │
│ │ ••••••••                    👁 │ (show/hide toggle, #6E685F)
│ └─────────────────────────────┘ │
│ 1px border: #E5E3E0 (Grey Light) │
│ focus: 2px solid #0065BD         │
│ padding: 12px 16px               │
│ border-radius: 4px               │
└─────────────────────────────────┘

Primary Login Button (Per PRD Button Styles)

text
┌──────────────────────────────────┐
│  → Login                         │
│  (arrow icon left-aligned)       │
│  background: #0065BD (TUM Blue)  │
│  text: #FFFFFF                   │
│  height: 48px (mobile: 56px)     │
│  border-radius: 4px              │
│  padding: 12px 24px              │
│  font: 14px, weight 500          │
│  hover: background #004E92       │
│  active: scale 0.98              │
│  disabled: opacity 0.5           │
│  transition: 150ms ease          │
└──────────────────────────────────┘

Alternative: Rounded button instead of arrow (choose one style)
Secondary Options Row

text
[✓] Remember me              [Forgot Password?]

Font: 12px
Color: #6E685F (TUM Grey)
Checkbox: TUM Blue #0065BD accent when checked

Sign Up / Need Help Links

text
Don't have an account? [Sign Up] →
[Contact Support] | [Documentation]

Color: #0065BD (TUM Blue)
Weight: 400
Decoration: underline on hover
Hover: #004E92

7. DEMO LOGIN SECTION (Optional Expandable)
Design Pattern

text
┌─────────────────────────────────┐
│ 📋 Demo Login Credentials        │ (header with icon)
│ ─────────────────────────────────│
│                                 │
│ Email:    demo@borgai.platform  │ (copiable)
│ Password: [••••••] [copy]       │ (masked, reveal on click)
│                                 │
│ Pro Tip: Use this to explore   │
│          the forecasting        │
│          dashboard.             │
│                                 │
└─────────────────────────────────┘

Interactive Features:
- Click email → auto-copy
- Click password icon → reveal/mask
- [Copy] buttons with feedback animation
- Subtle background: rgba(0, 101, 189, 0.05) (TUM Blue 5% opacity)
- Border: 1px solid #E5E3E0
- Border-radius: 4px
- Padding: 16px

8. HEADER ELEMENTS PLACEMENT
Top Header Section (Updated with provided logos)

text
┌────────────────────────────────────────────────┐
│  [BORGai Logo - logo_no_bg.svg] (96px height)  │
│  BORGai (36px, TUM Blue, bold)                 │
│  Intelligent Core Supply Forecasting Platform  │
└────────────────────────────────────────────────┘

Logo Implementation:
- BORGai Logo: Use logo_no_bg.svg (96px height, centered)
- Platform title: "BORGai" - 36px, weight 700, #0065BD
- Subtitle: 16px, weight 600, #6E685F
- Spacing: 16px between logo and title

Footer Section (Updated structure):

text
┌──────────────────────────────────────────────────────────────────────┐
│  powered by (12px, #6E685F)                                      │
│  Team 66 | Christian Güttler and Robert Hoffmann                 │
│  REMAN Challenge 2025 - The Power of AI for Circular Industries │
│  [TUM Logo] [BORGai Logo]                                        │
└──────────────────────────────────────────────────────────────────────┘

Footer Implementation:
- "powered by" text: 12px, #6E685F
- Team text: 12px, weight 500, #6E685F
- Challenge text: 12px, #6E685F
- TUM Logo: 32px height
- BORGai Logo: 32px height (logo_no_bg.svg)
- Spacing: 40px margin-top from card, 16px between text lines, logos with 16px gap

9. MODERN UI FEATURES (Optional Enhancements)
A. Animated Focus States (Per PRD)

    Input field: 2px solid #0065BD border + subtle glow (0 0 0 3px rgba(0, 101, 189, 0.2))

    Button: Slight scale animation on hover (scale 0.98 on active)

B. Loading State

text
[→ Login] → [⟳ Logging in...] (disabled, spinner)

Width stays same, text grayed, cursor: not-allowed
Spinner color: #0065BD

C. Error Messaging (TUM Orange for errors)

text
┌─────────────────────────────────────┐
│ ⚠️  Invalid email or password        │
│                                     │
│ Email: [________]  (error state)    │
└─────────────────────────────────────┘

Color: #E37222 (TUM Orange)
Position: Below field or above form
Border color on error: #E37222
Icon: ⚠️ (consistent throughout)

D. Success/Redirect (TUM Green)

text
✅ Login successful. Redirecting...

Color: #A2AD00 (TUM Green)
Show briefly before navigation (2-3 seconds)

10. RESPONSIVE BREAKPOINTS
Desktop (1024px+)

    Form: 400px width, centered

    Header: horizontal layout

    Footer: full-width bottom

Tablet (768px - 1024px)

    Form: 90vw width (max 400px)

    Header: responsive flex

    Adjust padding/margins

Mobile (< 768px)

    Form: 100vw, 20px padding

    Input fields: 16px font (no zoom on iOS)

    Button: 56px height

    Header: vertical stack

    Logo sizes reduced (20px)

11. VISUAL STYLE GUIDE (Per PRD Section 6)
Spacing System (8px base unit)

text
4px   - micro adjustments
8px   - small elements (icon padding)
12px  - form fields padding (vertical)
16px  - standard section padding, card padding
20px  - medium gaps
24px  - buttons, larger elements
32px  - section separation
40px  - major whitespace between sections

Corner Radius (Per PRD)

text
4px   - standard (buttons, inputs, cards, badges)
8px   - larger cards with depth
12px  - large containers
Note: PRD specifies 4px as standard, use consistently

Shadows (Per PRD)

text
Subtle:      0 2px 4px rgba(0,0,0,0.1)   - card elevation
Standard:    0 4px 8px rgba(0,0,0,0.1)   - hover states
Prominent:   0 10px 20px rgba(0,0,0,0.15) - modals, dropdowns
Focus ring:  0 0 0 3px rgba(0, 101, 189, 0.2) - TUM Blue glow

Transitions

text
All interactive elements:
transition: all 150ms cubic-bezier(0.4, 0, 0.2, 1);

Fastest: 100ms (hover states)
Standard: 150ms (button clicks)
Slower: 300ms (redirects, page changes)

12. ACCESSIBILITY CHECKLIST

    Form labels connected to inputs (for="id" + id="")

    Color contrast: 4.5:1 for text (WCAG AA)

    Keyboard navigation: Tab through form logically

    Focus indicators visible (blue outline min 2px)

    Password show/hide button clearly labeled

    Error messages linked to inputs (aria-describedby)

    Submit button: clear, action-oriented text

    Mobile: Touch targets min 44x44px

    Font sizes responsive, min 16px on mobile

    Alt text for all logos/icons

13. COPY & MICROCOPY
Button Text

text
Primary:      "→ Login" (arrow + text)
Loading:      "Logging in..." (with spinner)
Error:        "Try again"
Secondary:    "Need an account? Sign up"
Help:         "Forgot password?" / "Contact support"

Labels & Placeholders (Per PRD User Stories)

text
Email:              "Email Address"
Placeholder:        "you@company.com"
Password:           "Password"
Placeholder:        "Enter your password"
Demo Title:         "Demo Login Credentials"
Demo Instructions:  "Use these credentials to explore the forecasting dashboard"

Error Messages (Professional tone)

text
⚠️ "Invalid email or password. Please try again."
⚠️ "Please enter a valid email address."
⚠️ "Password must be at least 8 characters."
⚠️ "Both fields are required."

14. DESIGN DECISION MATRIX (Updated for TUM Corporate Design)
Aspect	Option A	Option B	FINAL DECISION
Background	White Card	Dark	White Card on Light Grey (#FAFAFA)
Button Style	Arrow Icon	Solid Text	Arrow + Text (unique, modern)
Form Width	350px	500px	400px (optimal readability)
Layout	Centered	Side-by-Side	Centered (mobile-first, PRD aligned)
Color Theme	TUM Blue	Dark Mode	TUM Blue (#0065BD) + Grey (#6E685F)
Demo Section	Always Show	Accordion	Visible with subtle styling
Social Login	Yes	No	No (B2B enterprise focus)
Logo Position	Top Center	Top Left	Top Center (symmetric layout)
15. IMPLEMENTATION SPECIFICATION (Ready for Execution)

EXACT SPECIFICATIONS FOR IMPLEMENTATION:

**Page Layout:**
- Background: #FAFAFA (light grey)
- Form card: White (#FFFFFF) with shadow: 0 2px 4px rgba(0,0,0,0.1)
- Max-width: 400px
- Centered on viewport
- Padding: 32px
- Border-radius: 8px

**Top Branding (Above card):**
- Logo: logo_no_bg.svg - 96px height (centered, above text)
- "BORGai" - 36px, weight 700, color #0065BD (TUM Blue)
- "Intelligent Core Supply Forecasting Platform" - 16px, weight 600, color #6E685F (Grey)
- Centered alignment
- Spacing: 16px padding between logo and text, 24px margin-bottom

**Footer (Bottom of page, below card):**
- Text line 1: "powered by" - 12px, #6E685F
- Text line 2: "Team 66 | Christian Güttler and Robert Hoffmann" - 12px, #6E685F, weight 500
- Text line 3: "REMAN Challenge 2025 - The Power of AI for Circular Industries" - 12px, #6E685F
- Logos row: [TUM Logo] [BORGai Logo - logo_no_bg.svg]
- Logos: 32px height each, horizontal layout with 16px gap
- Centered alignment
- Spacing: 40px margin-top from card, 8px between text lines, 16px before logos

**Form Card Content:**
1. Email input:
   - Label: "Email Address" - 14px, weight 500, #333333
   - Border: 1px solid #E5E3E0
   - Focus: 2px solid #0065BD + shadow
   - Padding: 12px 16px
   - Border-radius: 4px
2. Password input: (same styling)
   - Label: "Password"
   - Eye icon for show/hide (#6E685F)
3. Remember me checkbox - TUM Blue (#0065BD) when checked
4. Login button:
   - Background: #000000 (BLACK)
   - Text: "→ Login" (white, 14px, weight 500)
   - Hover: #333333 (Dark Grey)
   - Height: 48px
   - Border-radius: 4px
   - Full width

**Demo Section (Lean & Clear):**
- Background: rgba(0, 101, 189, 0.05) [Very subtle blue tint]
- Border: 1px solid #E5E3E0
- Padding: 12px [Compact]
- Border-radius: 4px
- Font-size: 12px
- Icon: 📋 (clipboard emoji)
- Text: Grey #6E685F
- Credentials in monospace font for clarity
- Click-to-copy functionality with visual feedback

**Colors Reference (Updated V2.1):**
```css
--tum-blue: #0065BD;        /* Branding title only */
--tum-blue-hover: #004E92;  /* Links/accents */
--tum-grey: #6E685F;        /* Secondary text */
--grey-light: #E5E3E0;      /* Borders */
--grey-dark: #333333;       /* Primary text */
--black: #000000;           /* Login button background */
--button-hover: #333333;    /* Login button hover */
--white: #FFFFFF;           /* Card, button text */
--background: #FAFAFA;      /* Page background */
--error: #E37222;           /* Error messages */
--success: #A2AD00;         /* Success messages */
```

**Interactions:**
- Focus states: 2px #0065BD + glow shadow
- Loading spinner: #0065BD color
- Error text: #E37222 with ⚠️ icon
- Success: #A2AD00 with ✅ icon
- Transitions: 150ms ease for all interactive elements

**Responsive (Mobile < 768px):**
- Card width: 90vw (20px padding each side)
- Input font-size: 16px (prevents iOS zoom)
- Button height: 56px
- Logo heights: 24px

16. IMPLEMENTATION CHECKLIST

**Files to Create/Modify:**
- [x] `app/login/page.tsx` - Main login page component
- [ ] `components/features/auth/LoginForm.tsx` - Login form component (optional refactor)
- [x] `public/logos/logo_no_bg.svg` - borgAI logo (no background)
- [x] `public/logos/tum-logo.svg` - TUM logo
- [x] `public/logos/reman-logo.svg` - REMAN logo

**Simplified Component Structure (LEAN):**
```
LoginPage (page.tsx)
├── TopBranding (inline, centered)
│   ├── BORGai Logo (logo_no_bg.svg)
│   ├── Title "BORGai"
│   └── Subtitle "Intelligent Core Supply..."
└── LoginCard (white card, centered)
    ├── EmailInput (shadcn/ui Input)
    ├── EmailInput (shadcn/ui Input)
    ├── PasswordInput (shadcn/ui Input + eye icon)
    ├── RememberCheckbox (shadcn/ui Checkbox)
    ├── LoginButton (shadcn/ui Button with arrow icon)
    └── DemoCredentials (subtle box)
        ├── "📋 Demo Credentials"
        ├── Email: demo@borgai.platform
        └── Password: demo1234
```

**Simplified Validation (Demo-focused):**
- Accept demo credentials: `demo@borgai.platform` / `demo1234`
- Accept any other credentials (no real validation for MVP demo)
- Empty fields: Show "Please fill in all fields"
- On successful login: Redirect to `/dashboard`

**Implementation Flow:**
1. User lands on page → sees clean login card
2. User clicks demo credentials → auto-fills form
3. User clicks login → validates → redirects to dashboard
4. Remember me → stores in localStorage (simple demo persistence)

**Key Features for Lean Appeal:**
- **Generous padding**: 32px in card creates breathing room
- **Subtle shadow**: Just enough depth without being heavy
- **Smooth transitions**: 150ms on all interactions
- **Clean focus states**: TUM Blue ring appears smoothly
- **No unnecessary elements**: No footer, no extra links
- **Mobile-optimized**: Larger touch targets, no zoom

**TailwindCSS Classes to Use (Updated V2.1):**
```css
/* Top Branding */
text-4xl font-bold text-[#0065BD] text-center  /* BORGai */
text-base font-semibold text-[#6E685F] text-center mt-2  /* Subtitle */
h-24 w-auto  /* Logo size (96px height) */

/* Card */
max-w-md mx-auto bg-white rounded-lg shadow-sm p-8

/* Input */
border border-gray-300 focus:border-[#0065BD] focus:ring-2 focus:ring-[#0065BD]/20

/* Button - BLACK */
bg-black hover:bg-[#333333] text-white h-12 rounded transition-colors

/* Demo box */
bg-[#0065BD]/5 border border-gray-300 rounded p-3 text-xs

/* Footer */
text-xs text-[#6E685F] text-center mt-10
```

---

## 📋 FINAL IMPLEMENTATION SUMMARY

**DESIGN GOAL ACHIEVED:** Lean, appealing, professional login page

**VISUAL APPEAL ELEMENTS:**
✓ Generous white space (40px margins, 32px padding)
✓ Subtle depth with light shadow
✓ Clean TUM Blue accents on focus
✓ Professional typography hierarchy
✓ Smooth 150ms transitions
✓ Minimal, distraction-free layout

**FUNCTIONAL SIMPLICITY:**
✓ Demo credentials clearly visible
✓ One-click copy functionality
✓ Simple validation (demo-focused)
✓ Quick redirect to dashboard
✓ Mobile-responsive (touch-friendly)

**BRAND ALIGNMENT:**
✓ TUM Blue (#0065BD) + Grey (#6E685F)
✓ Official TUM logo + REMAN logo
✓ Professional, enterprise aesthetic
✓ Consistent with PRD design system

**READY TO BUILD:** All specifications finalized ✓

**NEXT ACTION:** Implement `app/login/page.tsx` using this specification
