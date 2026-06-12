# E. Harrington Jewelry Store

A private online jewelry store inspired by [eha-jewelry.com](https://eha-jewelry.com/). List and sell engagement rings, necklaces, bracelets, brooches, and custom designs.

## Features

- **Homepage** — Hero banner, category showcase, featured pieces, trending collection
- **Shop** — Browse all jewelry with category filters
- **Product pages** — Detail view with images, specs, and add-to-cart
- **Shopping cart** — Persistent cart (saved in browser)
- **Checkout** — Order request form that saves to your store database
- **About & Contact** — Studio information and inquiry forms
- **Studio Console** (`/atelier`) — Private management portal (no "admin" in the URL)

### Studio Console (`/atelier`)

A secured back-office for managing your store:

| Section    | What you can do                                      |
|-----------|-------------------------------------------------------|
| Overview  | Dashboard with revenue, orders, and recent activity   |
| Orders    | View and update order status                          |
| Customers | Manage customer records                               |
| Payments  | Track and mark payments as paid/refunded              |
| Inventory | Add, edit, and remove products                        |
| Team      | Manage staff accounts and roles                       |
| Settings  | Store name, phones, promo banner, and more            |

**Default login** (set in `.env`):

```
ATELIER_EMAIL=owner@eha-jewelry.com
ATELIER_PASSWORD=changeme123
ATELIER_SECRET=your-random-secret
```

Copy `.env.example` to `.env.local` and change these values before going live.

## Getting Started

```bash
cp .env.example .env.local   # then edit credentials
npm install
npm run dev
```

- Store: [http://localhost:3000](http://localhost:3000)
- Studio Console: [http://localhost:3000/atelier](http://localhost:3000/atelier)

## Customizing Your Store

### Products

Edit `src/data/products.ts` to add, remove, or update jewelry items. Each product includes:

- SKU, name, price, description
- Category (engagement-rings, necklaces, bracelets, brooches, custom)
- Images (use your own image URLs)
- Metal, gemstone, stock status

### Branding

- **Store name & contact** — Update `src/components/Header.tsx` and `src/components/Footer.tsx`
- **Colors** — Adjust the gold/charcoal palette in `tailwind.config.ts`
- **Images** — Replace Unsplash placeholder URLs with your own product photos

### Adding Real Payments

The checkout form currently submits an order request. To accept payments, integrate Stripe, Square, or PayPal in `src/app/checkout/page.tsx`.

## Tech Stack

- Next.js 15 (App Router)
- TypeScript
- Tailwind CSS
- Lucide React icons

## Build for Production

```bash
npm run build
npm start
```

Deploy to Vercel, Netlify, or any Node.js host.
