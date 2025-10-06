Zion Stryker Trading Bot - Design Guidelines
Design Approach

Hybrid Professional Trading Dashboard Drawing inspiration from modern trading platforms (TradingView, Webull) and professional dashboards (Linear, Vercel Dashboard) to create a powerful, data-focused interface that balances technical functionality with modern aesthetics.
Core Design Principles

    Clarity Over Decoration: Every element serves a functional purpose
    Data Hierarchy: Critical trading information takes visual precedence
    Status Transparency: Real-time indicators for bot status, connection, and trade execution
    Professional Trust: Design conveys reliability and technical competence

Color Palette
Dark Mode (Primary)

    Background: 222 8% 8% (Rich charcoal base)
    Surface: 222 8% 12% (Elevated panels)
    Surface Elevated: 222 8% 16% (Cards, modals)
    Primary/Accent: 142 76% 36% (Trading green for active states)
    Danger: 0 84% 60% (Critical alerts, sell signals)
    Success: 142 76% 36% (Profit, buy signals)
    Warning: 38 92% 50% (Caution states)
    Text Primary: 0 0% 98%
    Text Secondary: 0 0% 70%
    Text Tertiary: 0 0% 50%
    Border: 222 8% 20%

Light Mode

    Background: 0 0% 98%
    Surface: 0 0% 100%
    Surface Elevated: 0 0% 100% with shadow
    Primary: 142 76% 36%
    Same semantic colors as dark mode

Typography

Font Families

    Primary: Inter (400, 500, 600, 700) - UI elements, body text
    Monospace: JetBrains Mono (500, 600) - Trading data, timestamps, amounts

Scale

    H1 (Bot Name): 2.5rem (40px), 700 weight, -0.025em tracking
    H2 (Section Headers): 1.5rem (24px), 600 weight
    H3 (Card Titles): 1.125rem (18px), 600 weight
    Body: 0.875rem (14px), 400 weight
    Small (Labels): 0.75rem (12px), 500 weight
    Monospace Data: 0.875rem (14px), 500 weight

Layout System

Spacing Units: Tailwind scale of 2, 3, 4, 6, 8, 12 for consistency

    Compact spacing: p-3, gap-3 for dense data areas
    Standard spacing: p-6, gap-6 for main sections
    Generous spacing: p-8, gap-8 for primary containers

Grid Structure

    Main container: max-w-7xl mx-auto
    Control panel: 2-column grid on lg+ (controls left, status right)
    Trade history: Full-width data table

Component Library
Navigation & Header

    Fixed top header with "Zion Stryker" logo/wordmark (custom typography treatment)
    Connection status indicator (green dot: connected, red: disconnected, yellow: connecting)
    Balance display in header (large, prominent, monospace)
    Settings/SSID management icon button

Core Controls Section

Timeframe Selector

    Segmented button group with pill-style active state
    Options: 15s | 30s | 1m with clear visual feedback
    Active state: primary green background with white text

Asset Selector

    Searchable dropdown with grouped categories (Forex | Stocks)
    Asset pairs in monospace font
    Current price display inline when selected

Strategy Mode

    Two prominent cards: Flash Mode | Super Mode
    Selected state: green border with subtle glow effect
    Include brief strategy description in card
    Visual indicator icons for each mode

Trade Configuration

    Amount input: Large, prominent with $ prefix, default $1
    Time input: Number input with seconds/minutes toggle
    Clear, monospace display of values

Bot Control

Master Start/Stop Toggle

    Large, prominent switch with clear ON/OFF states
    ON: Animated green pulse effect
    OFF: Neutral gray
    Disabled state when configuration incomplete

Status & Monitoring

Connection Panel

    SSID status with masked display (--1234)
    Edit/Remove SSID quick actions
    Connection latency indicator
    Last ping timestamp

Active Scan Indicator

    Real-time countdown to next scan
    Visual progress bar showing scan timing
    Current scanning status (Waiting | Scanning | Signal Found | Trade Placed)

Trade History Table

Data Grid Design

    Sticky header with sort indicators
    Columns: Timestamp | Asset | Strategy | Timeframe | Amount | Result | P/L
    Win rows: subtle green background tint
    Loss rows: subtle red background tint
    Monospace font for all data values
    Pagination controls for 200 record history
    Hover state: slight elevation

Data Display Cards

    Balance card: Large monospace display with change indicator (↑ +$X | ↓ -$X)
    Recent trades summary: Win rate, total trades, P/L today
    Strategy performance: Flash vs Super mode comparison

Interactions & Animations

    Micro-interactions: Subtle scale on button press, smooth color transitions
    Loading states: Skeleton screens for data fetching, spinner for actions
    Trade execution: Brief success/failure notification toast
    Real-time updates: Smooth number transitions for balance changes
    Status changes: Gentle pulse animation for active scanning state

Visual Hierarchy

    Primary: Master Start/Stop control, Balance display
    Secondary: Strategy selection, Timeframe, Asset picker
    Tertiary: Trade history, Configuration inputs
    Quaternary: Settings, Help, Documentation links

PWA Specific Elements

    Install prompt banner (dismissible)
    Offline status indicator in header
    Background sync visual feedback
    Service worker update notification

Responsive Behavior

    Mobile (< 768px): Single column stack, collapsible sections, bottom sheet for strategy selection
    Tablet (768-1024px): 2-column layout for controls, full-width history
    Desktop (> 1024px): Optimal 2-3 column layout with side-by-side panels

Trust & Professional Elements

    Subtle grid background pattern on main surface
    Minimal drop shadows for depth (shadow-sm, shadow-md)
    Professional badge: "Powered by Pocket Option API" in footer
    Disclaimer text in small, muted typography
    No decorative animations that distract from trading focus

Images

No hero images required - this is a utility-first dashboard focused on functionality and real-time data display. Visual interest comes from the custom "Zion Stryker" logo treatment and data visualization.