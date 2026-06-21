import { useEffect, useRef, useState } from "react";
import {
  ShoppingCart,
  Star,
  ShieldCheck,
  Truck,
  Tag,
  RotateCcw,
  ArrowRight,
  ChevronRight,
  Menu,
  X,
  Search,
  Cpu,
  Shirt,
  Home as HomeIcon,
  Dumbbell,
  Sparkles,
  ShoppingBasket,
  Quote,
  Send,
} from "lucide-react";
import "./LandingPage.css";

/* -------------------------------------------------------------------------
   Brand social icons (lucide doesn't ship accurate wordmark glyphs for these,
   so they're hand-drawn to match real proportions).
   ------------------------------------------------------------------------- */

const InstagramIcon = (props) => (
  <svg
    viewBox="0 0 24 24"
    width="18"
    height="18"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.8"
    {...props}
  >
    <rect x="3" y="3" width="18" height="18" rx="5" />
    <circle cx="12" cy="12" r="4.2" />
    <circle cx="17.4" cy="6.6" r="1.1" fill="currentColor" stroke="none" />
  </svg>
);

const FacebookIcon = (props) => (
  <svg
    viewBox="0 0 24 24"
    width="18"
    height="18"
    fill="currentColor"
    {...props}
  >
    <path d="M13.5 21v-7.6h2.55l.38-2.96h-2.93V8.55c0-.86.24-1.44 1.47-1.44h1.57V4.46c-.27-.04-1.2-.12-2.28-.12-2.26 0-3.8 1.38-3.8 3.91v2.18H7.99v2.96h2.47V21h3.04z" />
  </svg>
);

const WhatsAppIcon = (props) => (
  <svg
    viewBox="0 0 24 24"
    width="18"
    height="18"
    fill="currentColor"
    {...props}
  >
    <path d="M17.47 14.38c-.3-.15-1.74-.86-2-.96-.27-.1-.47-.15-.66.15-.2.3-.76.96-.93 1.16-.17.2-.34.22-.64.07-.3-.15-1.27-.47-2.42-1.5-.9-.8-1.5-1.78-1.68-2.08-.17-.3-.02-.46.13-.6.14-.14.3-.34.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.02-.52-.07-.15-.66-1.6-.91-2.18-.24-.58-.48-.5-.66-.5l-.56-.01c-.2 0-.52.07-.79.37-.27.3-1.04 1.02-1.04 2.48 0 1.46 1.06 2.87 1.21 3.07.15.2 2.1 3.2 5.08 4.49.71.31 1.26.49 1.69.62.71.23 1.36.2 1.87.12.57-.09 1.74-.71 1.99-1.4.25-.69.25-1.28.17-1.4-.07-.12-.27-.2-.57-.34z" />
    <path d="M12.04 2c-5.5 0-9.96 4.45-9.96 9.93 0 1.75.46 3.45 1.33 4.95L2 22l5.27-1.38a9.96 9.96 0 0 0 4.77 1.21h.01c5.5 0 9.96-4.45 9.96-9.93C21.99 6.45 17.54 2 12.04 2zm0 18.14h-.01c-1.5 0-2.97-.4-4.25-1.16l-.3-.18-3.13.82.84-3.04-.2-.31a8.18 8.18 0 0 1-1.27-4.34c0-4.5 3.68-8.16 8.32-8.16 2.23 0 4.32.87 5.89 2.43a8.07 8.07 0 0 1 2.43 5.74c0 4.5-3.68 8.2-8.32 8.2z" />
  </svg>
);

const XIcon = (props) => (
  <svg
    viewBox="0 0 24 24"
    width="16"
    height="16"
    fill="currentColor"
    {...props}
  >
    <path d="M18.24 3h3.05l-6.66 7.62L22.5 21h-6.13l-4.8-6.28L5.05 21H2l7.13-8.15L1.5 3h6.28l4.34 5.74L18.24 3zm-1.07 16.17h1.69L7.93 4.74H6.11l11.06 14.43z" />
  </svg>
);

/* -------------------------------------------------------------------------
   Content
   ------------------------------------------------------------------------- */

const categories = [
  {
    name: "Electronics",
    desc: "Audio, wearables, smart home & more.",
    icon: Cpu,
    color: "linear-gradient(135deg,#3b82f6,#1d4ed8)",
  },
  {
    name: "Fashion",
    desc: "Everyday wear to statement pieces.",
    icon: Shirt,
    color: "linear-gradient(135deg,#fb7185,#e11d48)",
  },
  {
    name: "Home & Living",
    desc: "Furniture, decor and kitchen finds.",
    icon: HomeIcon,
    color: "linear-gradient(135deg,#f59e0b,#d97706)",
  },
  {
    name: "Sports & Fitness",
    desc: "Gear for the next personal best.",
    icon: Dumbbell,
    color: "linear-gradient(135deg,#2f9670,#0f6b4c)",
  },
  {
    name: "Beauty",
    desc: "Skincare and grooming, vetted by us.",
    icon: Sparkles,
    color: "linear-gradient(135deg,#a855f7,#7c3aed)",
  },
  {
    name: "Grocery",
    desc: "Daily essentials, delivered same-day.",
    icon: ShoppingBasket,
    color: "linear-gradient(135deg,#22c55e,#15803d)",
  },
];

const features = [
  {
    icon: ShieldCheck,
    title: "Bank-grade security",
    desc: "256-bit encryption on every order, plus OTP verification at checkout — every single time.",
  },
  {
    icon: Truck,
    title: "Delivered in 24–48 hrs",
    desc: "Same-day dispatch from regional warehouses, with live tracking from your door to ours.",
  },
  {
    icon: Tag,
    title: "Lowest price promise",
    desc: "Found it cheaper elsewhere within 7 days of purchase? We refund the difference, no forms.",
  },
  {
    icon: RotateCcw,
    title: "7-day easy returns",
    desc: "Free pickup and instant refund initiation — no questions, no restocking fees.",
  },
];

const reviews = [
  {
    quote:
      "Ordered a pair of running shoes Tuesday night, they showed up Thursday morning before I'd even finished my coffee. Return process for a size swap took two minutes.",
    name: "Priya Sharma",
    loc: "Mumbai",
    rating: 5,
    initials: "PS",
    color: "linear-gradient(135deg,#f59e0b,#d97706)",
  },
  {
    quote:
      "I was skeptical about buying electronics online after a bad experience elsewhere. Kartify's price-match actually worked — saved me ₹1,200 on a pair of headphones.",
    name: "Arjun Mehta",
    loc: "Bengaluru",
    rating: 5,
    initials: "AM",
    color: "linear-gradient(135deg,#3b82f6,#1d4ed8)",
  },
  {
    quote:
      "The home decor section is genuinely curated, not just a dump of random listings. Found a lamp I still get compliments on. Checkout took under a minute.",
    name: "Sneha Kapoor",
    loc: "New Delhi",
    rating: 4,
    initials: "SK",
    color: "linear-gradient(135deg,#a855f7,#7c3aed)",
  },
];

const tickerItems = [
  <>
    ⚡ <strong>Flash sale</strong> — up to 60% off electronics
  </>,
  <>🚚 Free shipping over ₹999</>,
  <>🌱 New: the sustainable fashion edit</>,
  <>💬 24/7 customer support</>,
  <>💵 Cash on delivery available</>,
];

/* -------------------------------------------------------------------------
   Scroll-reveal hook
   ------------------------------------------------------------------------- */

function useReveal(rootRef) {
  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    const els = root.querySelectorAll(".reveal");
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("in-view");
            obs.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15 },
    );
    els.forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, [rootRef]);
}

/* -------------------------------------------------------------------------
   Component
   ------------------------------------------------------------------------- */

export default function LandingPage() {
  const rootRef = useRef(null);
  const [menuOpen, setMenuOpen] = useState(false);
  useReveal(rootRef);

  return (
    <div className="kartify-landing" ref={rootRef}>
      {/* ---------------- Navbar ---------------- */}
      <header className="navbar">
        <div className="wrap nav-inner">
          <a href="#top" className="nav-logo">
            <span className="nav-logo-mark">
              <ShoppingCart size={18} strokeWidth={2.4} />
            </span>
            Kartify
          </a>

          <nav className="nav-links">
            <a href="#categories">Categories</a>
            <a href="#features">Why Kartify</a>
            <a href="#reviews">Reviews</a>
          </nav>

          <div className="nav-actions">
            <button className="nav-icon-btn" aria-label="Search">
              <Search size={17} />
            </button>
            <a href="#login" className="btn btn-ghost">
              Log in
            </a>
            <a href="#register" className="btn btn-primary">
              Sign up
            </a>
            <button
              className="nav-menu-toggle"
              aria-label="Toggle menu"
              onClick={() => setMenuOpen((v) => !v)}
            >
              {menuOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>
        <div className={`nav-mobile ${menuOpen ? "open" : ""}`}>
          <a href="#categories" onClick={() => setMenuOpen(false)}>
            Categories
          </a>
          <a href="#features" onClick={() => setMenuOpen(false)}>
            Why Kartify
          </a>
          <a href="#reviews" onClick={() => setMenuOpen(false)}>
            Reviews
          </a>
          <a href="#login" onClick={() => setMenuOpen(false)}>
            Log in
          </a>
          <a href="#register" onClick={() => setMenuOpen(false)}>
            Sign up
          </a>
        </div>
      </header>

      {/* ---------------- Hero ---------------- */}
      <section className="hero" id="top">
        <div className="hero-glow" aria-hidden="true" />
        <div className="wrap hero-inner">
          <div>
            <div className="eyebrow hero-eyebrow">
              <span className="dot" /> New season drop is live
            </div>

            <h1 className="hero-title">
              Good taste,
              <br />
              delivered <em>before you</em>
              <br />
              change your mind.
            </h1>

            <p className="hero-sub">
              Kartify curates premium electronics, fashion and home goods from
              vetted sellers — with checkout in under 30 seconds and returns
              that don't require an argument.
            </p>

            <div className="hero-cta-row">
              <a href="#categories" className="btn btn-primary">
                Start shopping <ArrowRight size={16} />
              </a>
              <a href="#features" className="btn btn-ghost">
                Why shop with us
              </a>
            </div>

            <div className="hero-trust">
              <div className="trust-item">
                <strong>50K+</strong>
                <span>Happy customers</span>
              </div>
              <span className="trust-dot" />
              <div className="trust-item">
                <strong>4.8★</strong>
                <span>Average rating</span>
              </div>
              <span className="trust-dot" />
              <div className="trust-item">
                <strong>Free</strong>
                <span>Shipping over ₹999</span>
              </div>
            </div>
          </div>

          <div className="hero-visual">
            <div className="card-stack">
              <div className="product-card card-back" />
              <div className="product-card card-mid" />
              <div className="product-card card-front">
                <div className="card-front-top">
                  <span className="card-tag">Bestseller</span>
                  <span className="card-icon-circle">
                    <Star size={18} fill="currentColor" />
                  </span>
                </div>
                <div className="card-front-info">
                  <div>
                    <p className="card-product-name">Wireless Earbuds Pro</p>
                    <p className="card-product-price">
                      ₹2,499 <span className="strike">₹4,999</span>
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="float-badge badge-discount">
              <Tag size={16} />
              <span>Up to 60% off</span>
            </div>

            <div className="float-badge badge-rating">
              <div className="stars">★★★★★</div>
              <p>4.8 from 12,400 reviews</p>
            </div>
          </div>
        </div>

        {/* ---------------- Marquee ticker ---------------- */}
        <div className="ticker">
          <div className="ticker-track">
            {[0, 1].map((dup) => (
              <div className="ticker-row" key={dup} style={{ display: "flex" }}>
                {tickerItems.map((item, i) => (
                  <span className="ticker-item" key={`${dup}-${i}`}>
                    {item} <span className="sep">•</span>
                  </span>
                ))}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ---------------- Categories ---------------- */}
      <section className="section section-paper" id="categories">
        <div className="wrap">
          <div className="section-head reveal">
            <div>
              <div className="eyebrow section-eyebrow">
                <span className="dot" /> Browse by category
              </div>
              <h2 className="section-title">Six departments, one checkout.</h2>
            </div>
            <p className="section-desc">
              Every category is hand-vetted for quality and seller reliability
              before it ever reaches the shelf.
            </p>
          </div>

          <div className="cat-grid">
            {categories.map((cat, i) => {
              const Icon = cat.icon;
              return (
                <div
                  className={`cat-card reveal reveal-d${(i % 4) + 1}`}
                  key={cat.name}
                >
                  <div className="cat-thumb" style={{ background: cat.color }}>
                    <Icon size={26} color="#fff" />
                  </div>
                  <h3 className="cat-name">{cat.name}</h3>
                  <p className="cat-desc">{cat.desc}</p>
                  <a href="#" className="cat-link">
                    Shop now <ChevronRight size={15} />
                  </a>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ---------------- Features ---------------- */}
      <section className="section" id="features">
        <div className="wrap">
          <div className="section-head reveal">
            <div>
              <div className="eyebrow section-eyebrow">
                <span className="dot" /> Why Kartify
              </div>
              <h2 className="section-title">
                Built for people who hate online-shopping anxiety.
              </h2>
            </div>
            <p className="section-desc">
              No fine print. No fake urgency timers. Just the basics, done
              properly.
            </p>
          </div>

          <div className="feat-grid">
            {features.map((f, i) => {
              const Icon = f.icon;
              return (
                <div
                  className={`feat-card reveal reveal-d${i + 1}`}
                  key={f.title}
                >
                  <div className="feat-icon">
                    <Icon size={22} />
                  </div>
                  <h3 className="feat-title">{f.title}</h3>
                  <p className="feat-desc">{f.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ---------------- Reviews ---------------- */}
      <section className="section section-paper" id="reviews">
        <div className="wrap">
          <div className="section-head reveal">
            <div>
              <div className="eyebrow section-eyebrow">
                <span className="dot" /> Customer reviews
              </div>
              <h2 className="section-title">12,400+ reviews, 4.8 average.</h2>
            </div>
            <p className="section-desc">
              Pulled straight from verified orders — no incentives, no filtering
              out the rough ones.
            </p>
          </div>

          <div className="review-grid">
            {reviews.map((r, i) => (
              <div
                className={`review-card reveal reveal-d${i + 1}`}
                key={r.name}
              >
                <Quote size={22} color="#d8cfae" />
                <div className="review-stars">
                  {"★".repeat(r.rating)}
                  {"☆".repeat(5 - r.rating)}
                </div>
                <p className="review-quote">{r.quote}</p>
                <div className="review-person">
                  <div
                    className="review-avatar"
                    style={{ background: r.color }}
                  >
                    {r.initials}
                  </div>
                  <div>
                    <p className="review-name">{r.name}</p>
                    <p className="review-loc">{r.loc}, India</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ---------------- Footer ---------------- */}
      <footer className="footer">
        <div className="wrap">
          <div className="footer-top">
            <div>
              <a href="#top" className="nav-logo">
                <span className="nav-logo-mark">
                  <ShoppingCart size={18} strokeWidth={2.4} />
                </span>
                Kartify
              </a>
              <p className="footer-brand-desc">
                Premium products, vetted sellers, and a checkout that doesn't
                fight you. Shopping that respects your time.
              </p>
              <div className="footer-social">
                <a href="#" className="social-btn" aria-label="Instagram">
                  <InstagramIcon />
                </a>
                <a href="#" className="social-btn" aria-label="Facebook">
                  <FacebookIcon />
                </a>
                <a href="#" className="social-btn" aria-label="WhatsApp">
                  <WhatsAppIcon />
                </a>
                <a href="#" className="social-btn" aria-label="X (Twitter)">
                  <XIcon />
                </a>
              </div>
            </div>

            <div className="footer-col">
              <p className="footer-col-title">Shop</p>
              <a href="#">Electronics</a>
              <a href="#">Fashion</a>
              <a href="#">Home & Living</a>
              <a href="#">Today's deals</a>
            </div>

            <div className="footer-col">
              <p className="footer-col-title">Support</p>
              <a href="#">Track order</a>
              <a href="#">Returns & refunds</a>
              <a href="#">Shipping info</a>
              <a href="#">Contact us</a>
            </div>

            <div className="footer-col">
              <p className="footer-col-title">Stay in the loop</p>
              <p className="footer-brand-desc" style={{ marginTop: 0 }}>
                One email a week. New drops and price drops only.
              </p>
              <form
                className="newsletter-form"
                onSubmit={(e) => e.preventDefault()}
              >
                <input
                  type="email"
                  required
                  placeholder="you@email.com"
                  className="newsletter-input"
                  aria-label="Email address"
                />
                <button
                  type="submit"
                  className="newsletter-btn"
                  aria-label="Subscribe"
                >
                  <Send size={16} />
                </button>
              </form>
            </div>
          </div>

          <div className="footer-bottom">
            <p>© 2026 Kartify. All rights reserved.</p>
            <div className="footer-bottom-links">
              <a href="#">Privacy policy</a>
              <a href="#">Terms of service</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
