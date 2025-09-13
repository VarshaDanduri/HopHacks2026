# CharityVerifier - Trust Your Donations

A modern web application built with Next.js and Tailwind CSS that helps users verify charity legitimacy, check tax-deductible status, and make informed donations with confidence.

## 🚀 Features

### Core Functionality
- **Charity Search**: Browse and filter charities by location, cause, and demographic
- **Fundraiser Verification**: Paste any fundraiser URL to verify its legitimacy
- **Trust Score System**: Color-coded trust ratings (green/yellow/red) based on transparency and compliance
- **Tax-Deductible Labels**: Clear indicators for tax-deductible donations
- **Donation Checkout**: Secure, multi-step donation process with payment processing
- **User Dashboard**: Track donation history, saved charities, and account settings

### Key Components
- **Trust Score Cards**: Visual trust indicators with green (high), yellow (medium), red (low) ratings
- **Smart Filters**: Location, cause, and demographic-based charity filtering
- **Verification Engine**: URL analysis and charity legitimacy checking
- **Responsive Design**: Mobile-first design with modern UI/UX

## 🛠️ Tech Stack

- **Framework**: Next.js 15 with App Router
- **Styling**: Tailwind CSS 4
- **Language**: TypeScript
- **Icons**: Custom emoji-based icons
- **Fonts**: Geist Sans & Geist Mono

## 📱 Pages & Flows

### 1. Home Page (`/`)
- Hero section with clear value proposition
- Feature highlights with trust score demonstrations
- Call-to-action buttons for main flows

### 2. Charity Search (`/search`)
- Search bar with real-time filtering
- Advanced filters (location, cause, demographic)
- Sort options (trust score, name, location)
- Charity cards with trust scores and tax-deductible status

### 3. Fundraiser Verification (`/verify`)
- URL input with validation
- Real-time verification process
- Detailed results with warnings and recommendations
- Trust score and tax-deductible status display

### 4. Donation Checkout (`/donate`)
- Multi-step donation process
- Amount selection with frequency options
- Donor information collection
- Payment confirmation with security notices

### 5. User Dashboard (`/dashboard`)
- Donation history and statistics
- Saved charities management
- Account settings and preferences
- Tax receipt tracking

## 🎨 Design System

### Color Palette
- **Primary Green**: #10b981 (Trust, success, positive actions)
- **Warning Yellow**: #f59e0b (Medium trust, caution)
- **Error Red**: #ef4444 (Low trust, warnings)
- **Neutral Grays**: Various shades for text and backgrounds

### Trust Score System
- **Green (80-100)**: High Trust - Excellent transparency and compliance
- **Yellow (60-79)**: Medium Trust - Good with room for improvement
- **Red (0-59)**: Low Trust - Limited transparency or concerns

### Typography
- **Headings**: Bold, clear hierarchy
- **Body Text**: Readable, accessible contrast
- **Labels**: Consistent sizing and spacing

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd charity-verifier
```

2. Install dependencies:
```bash
npm install
```

3. Run the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

### Available Scripts

- `npm run dev` - Start development server with Turbopack
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

## 📁 Project Structure

```
charity-verifier/
├── src/
│   ├── app/                 # Next.js App Router pages
│   │   ├── dashboard/       # User dashboard
│   │   ├── donate/          # Donation checkout
│   │   ├── search/          # Charity search
│   │   ├── verify/          # Fundraiser verification
│   │   ├── globals.css      # Global styles
│   │   ├── layout.tsx       # Root layout
│   │   └── page.tsx         # Home page
│   └── components/          # Reusable components
│       ├── Footer.tsx       # Site footer
│       ├── LoadingSpinner.tsx # Loading indicator
│       ├── Navigation.tsx   # Main navigation
│       ├── Toast.tsx        # Notification component
│       └── TrustScore.tsx   # Trust score display
├── public/                  # Static assets
├── package.json
├── tailwind.config.js
└── tsconfig.json
```

## 🎯 Hackathon Deliverable

This application provides a **clickable prototype** with:

✅ **Complete User Flows**: All major user journeys are functional
✅ **Polished UI**: Modern, professional design suitable for demo
✅ **Trust Score System**: Clear visual indicators for charity trustworthiness
✅ **Tax-Deductible Labels**: Prominent labeling for tax implications
✅ **Responsive Design**: Works on desktop and mobile devices
✅ **Interactive Components**: Hover effects, transitions, and animations

## 🔮 Future Enhancements

- **Real API Integration**: Connect to actual charity databases
- **Payment Processing**: Integrate with Stripe or similar services
- **User Authentication**: Login/signup functionality
- **Advanced Analytics**: Donation impact tracking
- **Social Features**: Share donations and causes
- **Mobile App**: React Native version

## 📄 License

MIT License - see LICENSE file for details

## 🤝 Contributing

This is a hackathon project. For production use, additional security measures, testing, and API integrations would be required.

---

**Built with ❤️ for transparent and trustworthy charitable giving**