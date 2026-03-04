# MysteryIdea 💡

**MysteryIdea** is a premium idea marketplace where creators post hidden ideas with optional teaser text and images, set their own prices, and buyers unlock ideas for a fee. Revenue is split automatically via Stripe Connect.

---

## Features

- 🔐 **Hidden Ideas** — Post exclusive or multi-unlock ideas behind a paywall
- 💰 **Creator Monetization** — Set your own price; earn to your wallet, withdraw anytime
- 🎭 **Teasers** — Add text/image teasers to spark buyer curiosity
- 🛒 **Instant Unlock** — Buyers unlock ideas instantly after payment
- 📊 **Creator Dashboard** — Track earnings, manage ideas, and monitor unlocks with full analytics
- 💳 **Wallet System** — Built-in wallet with deposits, withdrawals, and transaction history
- ⭐ **Reviews & Ratings** — Buyers can rate and review purchased ideas
- 🔖 **Bookmarks** — Save ideas for later with a personal wishlist
- 🛡️ **Reports &amp; Moderation** — Flag inappropriate content with structured reporting
- 💸 **Refund Requests** — Buyers can request refunds on purchases
- 🔑 **Auth via Clerk** — Secure sign-in and sign-up flows
- 🖼️ **Image Uploads** — Powered by Uploadthing
- 📧 **Email Notifications** — Transactional emails via Resend

---

## Tech Stack

| Layer        | Technology                     |
|-------------|-------------------------------|
| Framework   | Next.js 15 (App Router)        |
| Language    | TypeScript                     |
| Styling     | Tailwind CSS + shadcn/ui       |
| Auth        | Clerk                          |
| Database    | PostgreSQL (Neon)              |
| ORM         | Prisma                         |
| Payments    | Stripe Connect                 |
| File Upload | Uploadthing                    |
| Email       | Resend                         |

---

## Prerequisites

- Node.js 18+
- PostgreSQL database (e.g., [Neon](https://neon.tech))
- [Clerk](https://clerk.com) account
- [Stripe](https://stripe.com) account with Connect enabled
- [Uploadthing](https://uploadthing.com) account
- [Resend](https://resend.com) account

---

## Getting Started

```bash
# 1. Clone the repository
git clone https://github.com/Cudael/mysterymarket.git
cd mysterymarket

# 2. Install dependencies
npm install

# 3. Copy environment variables
cp .env.example .env.local
# Fill in all values in .env.local

# 4. Run Prisma migrations
npx prisma migrate dev --name init

# 5. Start the development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## Environment Variables

| Variable | Description |
|----------|-------------|
| `DATABASE_URL` | PostgreSQL connection string |
| `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY` | Clerk publishable key |
| `CLERK_SECRET_KEY` | Clerk secret key |
| `NEXT_PUBLIC_CLERK_SIGN_IN_URL` | Sign-in page path (`/sign-in`) |
| `NEXT_PUBLIC_CLERK_SIGN_UP_URL` | Sign-up page path (`/sign-up`) |
| `NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL` | Redirect after sign-in |
| `NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL` | Redirect after sign-up |
| `CLERK_WEBHOOK_SECRET` | Clerk webhook signing secret |
| `STRIPE_SECRET_KEY` | Stripe secret key |
| `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` | Stripe publishable key |
| `STRIPE_WEBHOOK_SECRET` | Stripe webhook signing secret |
| `STRIPE_PLATFORM_FEE_PERCENT` | Platform fee percentage (default: 15) |
| `UPLOADTHING_SECRET` | Uploadthing secret |
| `UPLOADTHING_APP_ID` | Uploadthing app ID |
| `RESEND_API_KEY` | Resend API key |
| `NEXT_PUBLIC_APP_URL` | Public app URL (e.g., `http://localhost:3000`) |

---

## Project Structure

```
src/
├── app/
│   ├── (dashboard)/  # Protected dashboard routes
│   ├── (marketing)/  # Public marketing pages
│   ├── (marketplace)/# Public marketplace pages
│   ├── api/          # API routes (webhooks, uploadthing, health)
│   ├── sign-in/      # Clerk sign-in page
│   └── sign-up/      # Clerk sign-up page
├── components/
│   ├── layout/       # Navbar, footer, hero, sidebars
│   ├── shared/       # Pagination, share buttons, etc.
│   └── ui/           # shadcn/ui base components
├── features/
│   ├── analytics/    # Creator analytics actions
│   ├── bookmarks/    # Bookmark actions & components
│   ├── ideas/        # Idea CRUD actions, schemas & components
│   ├── purchases/    # Purchase actions & components
│   ├── refunds/      # Refund request actions & components
│   ├── reports/      # Report actions & components
│   ├── reviews/      # Review actions & components
│   ├── stripe/       # Stripe Connect actions
│   ├── users/        # User sync & profile actions
│   └── wallet/       # Wallet actions & components
├── hooks/            # Custom React hooks
├── lib/              # Prisma, Stripe, utils, uploadthing, rate-limit, emails
└── types/            # TypeScript type definitions
prisma/
├── schema.prisma     # Database schema
├── seed.ts           # Demo data seeding
└── migrations/       # Database migrations
```

---

## Roadmap

- ✅ Auth, ideas CRUD, purchases, Stripe Connect, wallet system
- ✅ Reviews & ratings, reports, refund requests
- ✅ Creator analytics dashboard
- ✅ Bookmarks / Wishlist
- 🔜 Category landing pages & advanced search
- 🔜 Notifications center
- 🔜 Admin dashboard & moderation console
- 🔜 Creator profile enhancements
- 🔜 Dark mode

---

## License

MIT