# User Interface Design Document
## ShortPoint Standalone - SaaS Intranet Solution

---

## Layout Structure

### Root Tenant Dashboard Layout
- **Fixed Left Sidebar**: 230px width, full height navigation panel with white background and subtle border
- **Main Content Area**: Fluid width container with light gray background (#F5F6FA)
- **Header Bar**: Top-aligned with platform branding, search, user profile dropdown, and notifications
- **Card-Based Content**: Responsive grid layout displaying site collections as cards with shadows and spacing

### Site Configuration Layout
- **Fixed Left Sidebar**: 230px width containing site management navigation options
- **Main Content Area**: Two-tier structure:
  - **Horizontal Navigation Bar**: Customizable navigation menu managed through site settings
  - **Content Section**: Dynamic area displaying page content, management interfaces, or configuration panels
- **Top Header Bar**: Shows current site context, breadcrumb navigation path, and action buttons:
  - **Site Context Display**: Shows which site is currently being managed
  - **Breadcrumb Navigation**: Displays navigation path (e.g., "Site Name > Pages > Edit Page")
  - **Edit Button**: Allows editing of the current page content when viewing a published page
  - **Publish Button**: Publishes draft content or updates to live pages
  - **Additional Action Buttons**: Save, Preview, and other contextual actions
- **Responsive Breakpoints**: Sidebar collapses to hamburger menu on tablets/mobile

---

## Core Components

### Branding & Logo
- **Application Logo**: Located at `/public/shortpoint-logo.svg`
  - Used in sidebar navigation header (160px width, 32px height)
  - SVG format for scalability and quality
  - Primary brand colors: #3161D1 (ShortPoint blue) and #474F65 (secondary text)
  - Links to main dashboard when clicked

### Navigation Components
- **Primary Left Navigation**: Fixed sidebar with menu items (Sites, Navigation, Pages, Assets Library, Site Team, Theme, Settings)
  - **Active State**: Light Blue background (#E7F5FF) with Primary Blue text (#3161D1), no borders or border radius
  - **Non-Active State**: Secondary Blue text (#5774A8) with no background, no borders or border radius
  - **Hover State**: Light Blue background with 50% opacity, Primary Blue text (#3161D1), no borders or border radius
  - **Font Size**: 12px with 14px line-height, Inter font family
- **Horizontal Site Navigation**: Configurable top navigation bar with custom links and styling
- **Breadcrumb Navigation**: Contextual path indicator showing current location

### Data Display Components
- **Site Cards**: Visual cards showing department sites with status indicators and quick actions
- **Pages Table**: Comprehensive data table with sortable columns:
  - Page Name/Title
  - Status (Published, Draft, Archived)
  - Created Date
  - Modified Date
  - Actions (Edit, Delete, Duplicate)
- **Assets Grid**: Visual library layout for file management with preview capabilities

### Form & Input Components
- **Rich Text Editor**: Full-featured WYSIWYG editor with formatting toolbar
- **Navigation Structure Editor**: Drag-and-drop interface for menu organization
- **Theme Customization Panel**: Color pickers and style controls
- **Search & Filter Controls**: Input fields with real-time filtering

### Action Components
- **Primary Action Buttons**: Create new site, Add page, Upload assets
- **Page Action Buttons**: 
  - **Edit Button**: Contextual button in top header for editing current page content
  - **Publish Button**: Contextual button in top header for publishing draft content
  - **Save Button**: Saves current changes without publishing
  - **Preview Button**: Shows preview of content before publishing
- **Secondary Actions**: Delete, Duplicate, Publish/Unpublish from management interfaces
- **Bulk Actions**: Multi-select operations for pages and assets

---

## Interaction Patterns

### Navigation Patterns
- **Single-click navigation** for primary menu items
- **Hover states** on interactive elements with subtle color changes
- **Active state indicators** for current page/section (#3161D1 blue accent)
- **Drag-and-drop functionality** for navigation reordering

### Data Management Patterns
- **Inline editing** capabilities for quick content updates
- **Modal dialogs** for confirmations and detailed editing
- **Progressive disclosure** - show basic info first, expand for details
- **Real-time search** with instant filtering as user types

### Content Creation Patterns
- **Step-by-step wizards** for complex setup processes
- **Auto-save functionality** for form inputs and content editing
- **Preview modes** before publishing changes
- **Version history access** through dedicated panels

---

## Visual Design Elements & Color Scheme

### Primary Colors
- **Primary Blue**: #3161D1 (buttons, links, active states)
- **Secondary Blue**: #5774A8 (text, icons)
- **Light Blue**: #E7F5FF (backgrounds, highlights)
- **Border Blue**: #DEEFFF (subtle borders and dividers)

### Background Colors
- **Main Background**: #F5F6FA (light gray for main content areas)
- **Card/Panel Background**: #FFFFFF (white for content containers)
- **Sidebar Background**: #FFFFFF (white with subtle border)

### Interactive States
- **Hover**: Slight opacity change and subtle shadow elevation
- **Active**: Primary blue background with white text
- **Disabled**: Reduced opacity (0.5) with gray tones
- **Focus**: Blue outline for keyboard navigation accessibility

### Visual Hierarchy
- **Drop shadows**: Subtle elevation for cards and modals
- **Border radius**: 4-6px for modern, friendly appearance
- **Spacing**: Consistent 16px/24px grid system
- **Icons**: Line-style icons with consistent stroke width

---

## Mobile, Web App, Desktop Considerations

### Desktop (1200px+)
- **Full sidebar visible** with complete navigation labels
- **Multi-column layouts** for efficient space utilization
- **Hover interactions** and tooltips for enhanced UX
- **Large click targets** (minimum 44px) for all interactive elements

### Tablet (768px - 1199px)
- **Collapsible sidebar** with hamburger menu toggle
- **Condensed table views** with horizontal scrolling if needed
- **Touch-optimized controls** with larger tap targets
- **Simplified navigation** with essential items prioritized

### Mobile (320px - 767px)
- **Full-screen modals** for editing and detailed views
- **Stacked layouts** with single-column arrangements
- **Bottom navigation** for primary actions when appropriate
- **Swipe gestures** for navigation and content management
- **Condensed data tables** with expand/collapse functionality

### Progressive Enhancement
- **Mobile-first approach** with enhanced features for larger screens
- **Flexible grid system** that adapts to any screen size
- **Scalable typography** using relative units (rem/em)
- **Touch and mouse input** compatibility across all devices

---

## Typography

### Font Family
- **Primary**: System fonts (-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif)
- **Fallback**: Arial, Helvetica, sans-serif for maximum compatibility

### Font Sizes & Hierarchy
- **H1 (Page Titles)**: 28px, font-weight: 600
- **H2 (Section Headers)**: 24px, font-weight: 600
- **H3 (Subsection Headers)**: 20px, font-weight: 500
- **Body Text**: 16px, font-weight: 400, line-height: 1.5
- **Small Text**: 14px for captions and secondary information
- **Button Text**: 16px, font-weight: 500

### Text Colors
- **Primary Text**: #333333 (dark gray for high contrast)
- **Secondary Text**: #5774A8 (medium blue-gray)
- **Link Text**: #3161D1 (primary blue)
- **Placeholder Text**: #999999 (light gray)

### Line Heights & Spacing
- **Body text**: 1.5 line-height for optimal readability
- **Headings**: 1.2 line-height for compact presentation
- **Paragraph spacing**: 16px margin bottom
- **Letter spacing**: Default for body, -0.02em for headings

---

## Accessibility

### Color & Contrast
- **WCAG AA compliance** with minimum 4.5:1 contrast ratio for normal text
- **WCAG AAA compliance** for important UI elements (7:1 contrast ratio)
- **Color-blind friendly** palette with sufficient contrast differences
- **No color-only indicators** - always paired with text or icons

### Keyboard Navigation
- **Full keyboard accessibility** with logical tab order
- **Visible focus indicators** with clear blue outline
- **Skip links** for main content areas
- **Keyboard shortcuts** for common actions (Ctrl+S for save, etc.)

### Screen Reader Support
- **Semantic HTML** structure with proper heading hierarchy
- **ARIA labels** and descriptions for interactive elements
- **Alt text** for all images and icons
- **Live regions** for dynamic content updates
- **Form labels** properly associated with inputs

### Motor & Cognitive Accessibility
- **Large click targets** (minimum 44px) for all interactive elements
- **Clear error messages** with specific guidance for resolution
- **Consistent navigation** patterns throughout the application
- **Progress indicators** for multi-step processes
- **Undo functionality** for destructive actions
- **Session timeout warnings** with extension options

### Responsive Text & Zoom
- **Text scales** up to 200% without horizontal scrolling
- **Relative units** (rem/em) for flexible sizing
- **Readable fonts** at all zoom levels
- **Layout adapts** gracefully to different text sizes