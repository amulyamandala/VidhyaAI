# VidyaAI Design Guidelines

## Design Approach
**Reference-Based Approach**: Drawing inspiration from educational platforms like Khan Academy and Coursera, combined with accessibility-first design principles for rural connectivity scenarios.

## Core Design Elements

### Color Palette
**Primary Colors:**
- Brand Primary: 220 85% 35% (Deep educational blue)
- Primary Light: 220 75% 55% (Lighter blue for accents)
- Success: 142 76% 36% (Forest green for achievements)

**Supporting Colors:**
- Background Dark: 220 13% 9% (Deep navy for dark mode)
- Background Light: 220 14% 96% (Soft off-white)
- Text Primary: 220 9% 15% (Nearly black)
- Text Secondary: 220 9% 46% (Medium gray)

### Typography
**Font Families:**
- Primary: Inter (clean, highly legible for forms and UI)
- Display: Poppins (friendly, approachable for headings)

**Sizes & Weights:**
- Hero Heading: text-4xl font-bold
- Section Headings: text-2xl font-semibold  
- Body Text: text-base font-normal
- Button Text: text-sm font-medium

### Layout System
**Spacing Primitives:** Tailwind units of 2, 4, 6, 8, 12, 16
- Micro spacing: p-2, m-2
- Component spacing: p-4, gap-4
- Section spacing: py-8, my-12
- Large spacing: py-16

### Component Library

**Navigation:**
- Fixed header with VidyaAI logo prominently displayed
- Clean navigation with large touch targets (min 44px)
- Hamburger menu for mobile with slide-out drawer

**Authentication Components:**
- Prominent "Sign in with Google" button using OAuth
- Secondary form for personal security password creation
- Large, accessible input fields with clear labels
- Progress indicators for multi-step authentication

**Educational Interface:**
- Card-based layout for worksheets and lessons
- Large action buttons for "Generate Worksheet", "Create Lesson"
- Progress bars and achievement indicators
- Offline status indicators

**Forms:**
- Generous padding and spacing for touch interfaces
- Clear validation states with helpful error messages
- Auto-save functionality indicators
- Large submit buttons with loading states

**Data Displays:**
- Simple charts for student progress (avoid complex visualizations)
- List views with clear hierarchy
- Tabular data with responsive breakpoints

### Visual Hierarchy
- **Primary Actions:** Large buttons with primary brand color
- **Secondary Actions:** Outline buttons with subtle backgrounds
- **Content Hierarchy:** Clear typography scale with ample whitespace
- **Status Indicators:** Color-coded but also include icons for accessibility

### Accessibility Features
- High contrast ratios (4.5:1 minimum)
- Large touch targets (minimum 44px)
- Clear focus indicators
- Keyboard navigation support
- Screen reader friendly markup
- Reduced motion preferences respected

### Mobile-First Considerations
- Single-column layouts on mobile
- Thumb-friendly navigation
- Offline functionality clearly indicated
- Progressive enhancement for slower connections
- Essential features work without JavaScript

### Images
**Hero Section:** Large, inspiring image of rural teachers using technology in classrooms (warm, authentic photography)
**Feature Sections:** Illustration-style graphics showing AI assistance, worksheet generation, and student progress
**Testimonials:** Authentic photos of teachers (with permission) in rural educational settings

The design should feel approachable, trustworthy, and specifically tailored to the needs of rural educators with varying levels of technical expertise.