import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowLeft,
  CalendarDays,
  Clock,
  ExternalLink,
  Facebook,
  Images,
  Instagram,
  MapPin,
  Music2,
  Phone,
  ShieldCheck,
  Sparkles,
  Star,
  Youtube
} from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { getGooglePlacesSalonData } from "@/lib/google-places";

const salon = {
  name: "David Mallett",
  shortName: "David Mallett",
  locationLabel: "Notre Dame des Victoires",
  address: "14 rue Notre Dame des Victoires",
  city: "Paris",
  postalCode: "75002",
  phone: "+33 1 40 20 00 23",
  email: "info@david-mallett.com",
  website: "https://david-mallett.com/pages/notre-dame",
  closingTime: "20:00",
  heroImage:
    "https://commons.wikimedia.org/wiki/Special:FilePath/Paris%20-%2014%20rue%20Notre-Dame-des-Victoires%20-%20facade.jpg",
  services: [
    { name: "David Mallett cut and blow-dry", duration: "Signature service", price: "330 EUR" },
    { name: "Senior stylist cut and blow-dry", duration: "Precision haircut", price: "180 EUR" },
    { name: "Tokio hair treatment", duration: "60 min", price: "from 120 EUR" },
    { name: "Classic balayage", duration: "Color service", price: "from 200 EUR" },
    { name: "Root color touch-up", duration: "Color service", price: "from 175 EUR" },
    { name: "Manicure", duration: "Beauty service", price: "70 EUR" }
  ],
  hours: [
    ["Monday", "09:00-20:00"],
    ["Tuesday", "08:00-20:00"],
    ["Wednesday", "08:00-20:00"],
    ["Thursday", "08:00-20:00"],
    ["Friday", "08:00-20:00"],
    ["Saturday", "09:00-20:00"],
    ["Sunday", "Closed"]
  ],
  sourceNotes: [
    "Official David Mallett page: address, phone, salon description, selected prices, and opening hours.",
    "Google Places: rating, review count, reviews, owner photos, current open status, directions link, and verified map coordinates."
  ]
};

const verifiedPlacesFallback = {
  name: "David Mallett",
  formattedAddress: "14 Rue Notre Dame des Victoires, 75002 Paris, France",
  googleMapsUri: "https://maps.google.com/?cid=6413607516223484014",
  phone: "+33 1 40 20 00 23",
  website: "https://david-mallett.com/",
  rating: 4.6,
  userRatingCount: 356,
  latitude: 48.867073500000004,
  longitude: 2.3415016,
  openNow: false,
  weekdayDescriptions: [
    "Monday: 8:00 AM - 7:00 PM",
    "Tuesday: 8:00 AM - 8:00 PM",
    "Wednesday: 8:00 AM - 7:00 PM",
    "Thursday: 8:00 AM - 8:00 PM",
    "Friday: 8:00 AM - 7:00 PM",
    "Saturday: 9:00 AM - 7:00 PM",
    "Sunday: Closed"
  ],
  primaryType: "Hair Salon"
};

const googlePlaceId = "ChIJr6dAxjxu5kcRbrBGJQ62AVk";
const allReviewsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
  "David Mallett, 14 Rue Notre Dame des Victoires, 75002 Paris"
)}&query_place_id=${googlePlaceId}`;

const verifiedPlacesPhotos = [
  {
    url: "https://lh3.googleusercontent.com/place-photos/AG9NLjAqh1nS-ztNUXXEaVRvbnHJBgTSSkTggOGwtHJr0835wnXMLJ1Wz3YNfkCYlYWtV25LnibleCA1GR6krWhv34nwqK_u4U_zw_608WRVFzXLGYWDWJ5nFPMmRL9-J_P78g4S3KgZzup6arn-nQ=s4800-w1200",
    alt: "Interior salon image from the David Mallett Google Places profile",
    credit: "Google Places photo by David Mallett"
  },
  {
    url: "https://lh3.googleusercontent.com/place-photos/AG9NLjD1dDGD4LxU4AKR1WKg1iTQaZsRuc1m1ujy7RThzKJLRCr25-T4Ea4XwCghDlPuTtINunBD59GMIvupxfbFG-G1A2XjWd4bA-rfjPk10uQFPmGrlgl1r8VRjWeoX-f29c_j2_rhxpfduvVWog=s4800-w901",
    alt: "Salon detail image from the David Mallett Google Places profile",
    credit: "Google Places photo by David Mallett"
  },
  {
    url: "https://lh3.googleusercontent.com/place-photos/AG9NLjDP75gENmVmg29ANzupo09nt3wiCfUfQ3i3_1iOywMDAah_ipjDYGzakmGSosT6HQy18aYKJ2U3yX92x7cRIB0DvBcMywbflgAkegT8zhP9UfmYX3oxUGkZWL-9bplhs2PCOAg02PwDMtaYvA=s4800-w1200",
    alt: "Salon interior image from the David Mallett Google Places profile",
    credit: "Google Places photo by David Mallett"
  }
];

const verifiedPlacesReviews = [
  {
    author: "Judi Hausmann",
    rating: 5,
    date: "3 months ago",
    url: "https://www.google.com/maps/reviews/data=!4m6!14m5!1m4!2m3!1sCi9DQUlRQUNvZENodHljRjlvT2taaVJucElVMXBWVjFkME16VjFVbkJpZUdKd05sRRAB!2m1!1s0x47e66e3cc640a7af:0x5901b60e2546b06e",
    text:
      "Exceptional experience every single time. I visit Paris several times each year and the first thing I do is go to the salon for a cut with David and a manicure with Laurence. David is the best hair cutter in the world."
  },
  {
    author: "S B",
    rating: 5,
    date: "3 months ago",
    url: "https://www.google.com/maps/reviews/data=!4m6!14m5!1m4!2m3!1sCi9DQUlRQUNvZENodHljRjlvT2sxT04zZFpiRE51YlMwMGIwbHhjSE54TW1GalVIYxAB!2m1!1s0x47e66e3cc640a7af:0x5901b60e2546b06e",
    text:
      "I treated myself to a visit at David Mallett Hairdressing for my birthday, and it turned out to be one of the best decisions I have made. David is kind, elegant, easy to talk to, and made the experience special."
  },
  {
    author: "angie ferrer",
    rating: 5,
    date: "6 months ago",
    url: "https://www.google.com/maps/reviews/data=!4m6!14m5!1m4!2m3!1sCi9DQUlRQUNvZENodHljRjlvT2tWVVdtNHpORGhLUzBkV01rMDJURGx6Tm01cVZrRRAB!2m1!1s0x47e66e3cc640a7af:0x5901b60e2546b06e",
    text:
      "I was in Paris and had the best experience with color by Sarah and cut by Alain. From the service to the results and the ambience of the salon, everything was perfect."
  }
];

const salonFaqs = [
  {
    question: "Do I need an appointment at David Mallett?",
    answer: "For a premium salon experience, users should book ahead or call the salon before visiting."
  },
  {
    question: "Where is the salon located?",
    answer: "The salon is at 14 Rue Notre Dame des Victoires in Paris 75002, near Place des Victoires and Galerie Vivienne."
  },
  {
    question: "What information should a real salon page combine?",
    answer: "A strong local SEO page combines Google Places trust data, owner photos, first-party service content, FAQs, and clear conversion CTAs."
  },
  {
    question: "Are services and prices from Google Places?",
    answer: "No. Services and prices should come from the salon website or internal catalog because Google Places does not reliably provide salon service menus or price lists."
  }
];

const socialLinks = [
  {
    name: "TikTok",
    handle: "@david_mallett",
    url: "https://www.tiktok.com/@david_mallett",
    icon: Music2
  },
  {
    name: "YouTube",
    handle: "@DavidMallettParis",
    url: "https://www.youtube.com/@DavidMallettParis",
    icon: Youtube
  },
  {
    name: "Instagram",
    handle: "@davidmallett",
    url: "https://www.instagram.com/davidmallett/",
    icon: Instagram
  },
  {
    name: "Facebook",
    handle: "davidmallett.paris",
    url: "https://www.facebook.com/davidmallett.paris/",
    icon: Facebook
  }
];

export const metadata: Metadata = {
  title: `${salon.shortName} | Hair Salon in Paris ${salon.postalCode}`,
  description:
    "Discover David Mallett in Paris 75002 with Google rating, reviews, owner photos, hours, directions, services, and local salon FAQ.",
  alternates: {
    canonical: "/salons/david-mallett-notre-dame-des-victoires"
  },
  openGraph: {
    title: `${salon.shortName} | Hair Salon in Paris`,
    description: "Paris hair salon profile with Google rating, reviews, owner photos, hours, and directions.",
    type: "website",
    images: [{ url: salon.heroImage, alt: "Facade at 14 rue Notre Dame des Victoires in Paris" }]
  }
};

export default async function SalonPage() {
  const placesData = await getGooglePlacesSalonData({
    fallbackQuery: `${salon.name}, ${salon.address}, ${salon.postalCode} ${salon.city}, France`
  });
  console.info("[places-build-diagnostic]", {
    hasGooglePlacesApiKey: Boolean(process.env.GOOGLE_PLACES_API_KEY),
    hasDavidMallettPlaceId: Boolean(process.env.DAVID_MALLETT_PLACE_ID),
    placesSource: placesData.source,
    hasRating: Boolean(placesData.rating),
    hasReviewCount: Boolean(placesData.userRatingCount),
    hasPhoto: Boolean(placesData.photoUrl)
  });

  const enrichedSalon = placesData.source === "google-places" ? placesData : verifiedPlacesFallback;
  const fullAddress = `${salon.name}, ${salon.address}, ${salon.postalCode} ${salon.city}, France`;
  const displayName = enrichedSalon.name ?? salon.name;
  const displayAddress = enrichedSalon.formattedAddress ?? `${salon.address}, ${salon.postalCode} ${salon.city}`;
  const displayPhone = enrichedSalon.phone ?? salon.phone;
  const displayWebsite = enrichedSalon.website ?? salon.website;
  const directionsUrl = enrichedSalon.googleMapsUri ?? `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(fullAddress)}`;
  const heroImage = verifiedPlacesPhotos[0]?.url ?? salon.heroImage;
  const weekdayDescriptions = enrichedSalon.weekdayDescriptions;
  const hasVerifiedPlacesProfile = true;
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "HairSalon",
    name: displayName,
    image: heroImage,
    url: displayWebsite,
    email: salon.email,
    address: {
      "@type": "PostalAddress",
      streetAddress: displayAddress,
      addressLocality: salon.city,
      postalCode: salon.postalCode,
      addressCountry: "FR"
    },
    ...(enrichedSalon.latitude && enrichedSalon.longitude
      ? {
          geo: {
            "@type": "GeoCoordinates",
            latitude: enrichedSalon.latitude,
            longitude: enrichedSalon.longitude
          }
        }
      : {}),
    telephone: displayPhone,
    sameAs: socialLinks.map((social) => social.url),
    ...(enrichedSalon.rating && enrichedSalon.userRatingCount
      ? {
          aggregateRating: {
            "@type": "AggregateRating",
            ratingValue: enrichedSalon.rating,
            reviewCount: enrichedSalon.userRatingCount
          }
        }
      : {}),
    openingHoursSpecification: salon.hours
      .filter(([, hours]) => hours !== "Closed")
      .map(([day, hours]) => {
        const [opens, closes] = hours.split("-");
        return {
          "@type": "OpeningHoursSpecification",
          dayOfWeek: day,
          opens,
          closes
        };
      }),
    makesOffer: salon.services.map((service) => ({
      "@type": "Offer",
      price: service.price.replace("from ", "").replace(" EUR", ""),
      priceCurrency: "EUR",
      itemOffered: {
        "@type": "Service",
        name: service.name
      }
    }))
  };

  return (
    <main className="min-h-screen bg-pearl">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <section className="mx-auto max-w-6xl px-4 py-5 lg:px-8 lg:py-8">
        <Link href="/" className="inline-flex items-center gap-2 text-sm font-semibold text-rosewood">
          <ArrowLeft className="h-4 w-4" />
          Back to store locator
        </Link>

        <section
          className="mt-6 min-h-[300px] overflow-hidden rounded-[1.75rem] bg-cover bg-center shadow-soft lg:min-h-[440px]"
          style={{
            backgroundImage: `linear-gradient(90deg, rgba(25,21,18,0.66), rgba(25,21,18,0.16)), url('${heroImage}')`
          }}
          aria-label="Facade of the David Mallett salon building in Paris"
        >
          <div className="flex min-h-[300px] max-w-3xl flex-col justify-end p-6 text-white lg:min-h-[440px] lg:p-10">
            <Badge tone="success">Real salon example</Badge>
            <h1 className="mt-4 text-4xl font-bold lg:text-6xl">{salon.shortName}</h1>
            <p className="mt-4 text-lg leading-8 text-white/84">
              {salon.locationLabel} · Paris {salon.postalCode}
            </p>
          </div>
        </section>

        <div className="mt-6 grid gap-6 lg:grid-cols-[1.15fr_0.85fr] lg:items-start">
          <section className="rounded-[1.75rem] bg-white p-5 shadow-soft lg:p-8">
            <div className="flex flex-wrap gap-2">
              <Badge tone={enrichedSalon.openNow === false ? "neutral" : "success"}>
                {enrichedSalon.openNow === undefined ? "Open today" : enrichedSalon.openNow ? "Open now" : "Closed now"}
              </Badge>
              <Badge>{enrichedSalon.primaryType ?? "Luxury hair salon"}</Badge>
              <Badge>Paris {salon.postalCode}</Badge>
            </div>

            <h2 className="mt-5 text-3xl font-bold text-ink lg:text-5xl">{displayName}</h2>
            <p className="mt-4 max-w-2xl text-lg leading-8 text-ink/68">
              The original David Mallett salon opened in 2003 and is known for cut, styling, color, keratin care, Tokio treatments,
              manicure, and private salon services.
            </p>

            <div className="mt-6 grid gap-3 sm:grid-cols-3">
              <a
                href={directionsUrl}
                target="_blank"
                rel="noreferrer"
                className="rounded-[1.25rem] border border-champagne bg-pearl p-4 transition hover:border-rosewood hover:bg-white"
                aria-label={`Get directions to ${salon.name}`}
              >
                <MapPin className="h-5 w-5 text-rosewood" />
                <strong className="mt-3 block text-sm text-ink">{displayAddress}</strong>
                <span className="text-sm text-ink/60">Open in Google Maps</span>
              </a>
              <div className="rounded-[1.25rem] border border-champagne bg-pearl p-4">
                <ShieldCheck className="h-5 w-5 text-rosewood" />
                <strong className="mt-3 block text-sm text-ink">
                  {enrichedSalon.rating ? `${enrichedSalon.rating} Google rating` : "Source-backed profile"}
                </strong>
                <span className="text-sm text-ink/60">
                  {enrichedSalon.userRatingCount ? `${enrichedSalon.userRatingCount} Google reviews` : "Verified Google Places profile"}
                </span>
              </div>
              <div className="rounded-[1.25rem] border border-champagne bg-pearl p-4">
                <Clock className="h-5 w-5 text-rosewood" />
                <strong className="mt-3 block text-sm text-ink">Closes at {salon.closingTime}</strong>
                <span className="text-sm text-ink/60">Monday to Saturday schedule</span>
              </div>
            </div>

            <div className="mt-7 flex flex-col gap-3 sm:flex-row">
              <a
                href={`tel:${displayPhone.replaceAll(" ", "")}`}
                className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-ink px-5 text-sm font-semibold text-white transition hover:bg-rosewood"
              >
                <Phone className="h-4 w-4" />
                Call salon
              </a>
              <a
                href={directionsUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full border border-champagne bg-white px-5 text-sm font-semibold text-ink transition hover:border-rosewood"
              >
                <MapPin className="h-4 w-4" />
                Get directions
              </a>
              <a
                href={displayWebsite}
                target="_blank"
                rel="noreferrer"
                className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full border border-champagne bg-white px-5 text-sm font-semibold text-ink transition hover:border-rosewood"
              >
                <ExternalLink className="h-4 w-4" />
                Official site
              </a>
            </div>
          </section>

          <aside className="rounded-[1.75rem] border border-champagne bg-white p-5 shadow-soft lg:sticky lg:top-8">
            <h2 className="text-sm font-bold uppercase tracking-wide text-rosewood">Opening hours</h2>
            <div className="mt-4 divide-y divide-champagne/70">
              {weekdayDescriptions
                ? weekdayDescriptions.map((description) => (
                    <div key={description} className="py-3 text-sm text-ink/70">
                      {description}
                    </div>
                  ))
                : salon.hours.map(([day, hours]) => (
                    <div key={day} className="flex items-center justify-between py-3 text-sm">
                      <span className="font-semibold text-ink">{day}</span>
                      <span className="text-ink/65">{hours}</span>
                    </div>
                  ))}
            </div>
            <div className="mt-4 rounded-2xl bg-pearl p-3 text-xs font-semibold text-rosewood">
              {placesData.source === "google-places" && hasVerifiedPlacesProfile
                ? "Live Google Places data loaded at build time"
                : "Verified Google Places snapshot shown for this prototype"}
            </div>
          </aside>
        </div>

        <section className="mt-8 grid gap-5 lg:grid-cols-[1fr_360px]">
          <div className="rounded-[1.75rem] bg-white p-5 shadow-soft lg:p-8">
            <div className="flex items-center gap-2">
              <Sparkles className="h-5 w-5 text-rosewood" />
              <h2 className="text-2xl font-bold text-ink">Selected services and prices</h2>
            </div>
            <div className="mt-5 grid gap-3 sm:grid-cols-2">
              {salon.services.map((service) => (
                <article key={service.name} className="rounded-[1.25rem] border border-champagne bg-pearl p-4">
                  <h3 className="font-bold text-ink">{service.name}</h3>
                  <p className="mt-2 text-sm text-ink/60">
                    {service.duration} · {service.price}
                  </p>
                </article>
              ))}
            </div>
          </div>

          <div className="rounded-[1.75rem] border border-champagne bg-white p-5 shadow-soft">
            <CalendarDays className="h-5 w-5 text-rosewood" />
            <h2 className="mt-3 text-xl font-bold text-ink">Plan your visit</h2>
            <div className="mt-4 space-y-3 text-sm leading-6 text-ink/65">
              <p>Check today&apos;s hours, call the salon, or open Google Maps before deciding.</p>
              <a href={directionsUrl} target="_blank" rel="noreferrer" className="inline-flex font-bold text-rosewood">
                Open location
              </a>
            </div>
          </div>
        </section>

        <section className="mt-8 rounded-[1.75rem] bg-white p-5 shadow-soft lg:p-8">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-2">
              <Star className="h-5 w-5 fill-rosewood text-rosewood" />
              <h2 className="text-2xl font-bold text-ink">Top Google reviews</h2>
            </div>
            <a href={allReviewsUrl} target="_blank" rel="noreferrer" className="text-sm font-bold text-rosewood">
              Read all reviews
            </a>
          </div>
          <div className="mt-5 grid gap-4 lg:grid-cols-3">
            {verifiedPlacesReviews.map((review) => (
              <article key={review.author} className="rounded-[1.25rem] border border-champagne bg-pearl p-4">
                <div className="flex items-center justify-between gap-3">
                  <div>
                    <h3 className="font-bold text-ink">{review.author}</h3>
                    <p className="text-xs font-semibold text-ink/50">{review.date}</p>
                  </div>
                  <div className="flex shrink-0 items-center gap-1 rounded-full bg-white px-2.5 py-1 text-xs font-bold text-rosewood">
                    <Star className="h-3.5 w-3.5 fill-rosewood text-rosewood" />
                    {review.rating}
                  </div>
                </div>
                <p className="mt-4 text-sm leading-6 text-ink/68">{review.text}</p>
                <a href={review.url} target="_blank" rel="noreferrer" className="mt-4 inline-flex text-sm font-bold text-rosewood">
                  Read full review
                </a>
              </article>
            ))}
          </div>
          <p className="mt-4 text-xs font-semibold text-ink/45">
            Review excerpts are sourced from Google Places. Each card links to the full review on Google Maps.
          </p>
        </section>

        <section className="mt-8 rounded-[1.75rem] bg-white p-5 shadow-soft lg:p-8">
          <div className="flex items-center gap-2">
            <Images className="h-5 w-5 text-rosewood" />
            <h2 className="text-2xl font-bold text-ink">Owner photos from Google Places</h2>
          </div>
          <div className="mt-5 grid gap-3 md:grid-cols-3">
            {verifiedPlacesPhotos.map((photo) => (
              <figure key={photo.url} className="overflow-hidden rounded-[1.25rem] border border-champagne bg-pearl">
                <Image src={photo.url} alt={photo.alt} width={1200} height={900} className="h-64 w-full object-cover" />
                <figcaption className="px-3 py-2 text-xs font-semibold text-ink/50">{photo.credit}</figcaption>
              </figure>
            ))}
          </div>
        </section>

        <section className="mt-8 rounded-[1.75rem] bg-white p-5 shadow-soft lg:p-8">
          <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <h2 className="text-2xl font-bold text-ink">Follow David Mallett</h2>
              <p className="mt-2 text-sm leading-6 text-ink/60">
                Brand-managed social links are kept outside Google Places so the salon team can control the official channels.
              </p>
            </div>
            <Badge>Brand-level content</Badge>
          </div>
          <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {socialLinks.map((social) => {
              const Icon = social.icon;

              return (
                <a
                  key={social.name}
                  href={social.url}
                  target="_blank"
                  rel="noreferrer"
                  className="group flex items-center gap-3 rounded-[1.25rem] border border-champagne bg-pearl p-4 transition hover:border-rosewood hover:bg-white"
                  aria-label={`Follow ${salon.name} on ${social.name}`}
                >
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-white text-rosewood shadow-sm transition group-hover:bg-rosewood group-hover:text-white">
                    <Icon className="h-5 w-5" />
                  </span>
                  <span className="min-w-0">
                    <strong className="block text-sm text-ink">{social.name}</strong>
                    <span className="block truncate text-sm text-ink/55">{social.handle}</span>
                  </span>
                </a>
              );
            })}
          </div>
        </section>

        <section className="mt-8 rounded-[1.75rem] bg-white p-5 shadow-soft lg:p-8">
          <h2 className="text-2xl font-bold text-ink">Salon FAQ</h2>
          <div className="mt-5 grid gap-3 md:grid-cols-2">
            {salonFaqs.map((faq) => (
              <article key={faq.question} className="rounded-[1.25rem] border border-champagne bg-pearl p-4">
                <h3 className="font-bold text-ink">{faq.question}</h3>
                <p className="mt-2 text-sm leading-6 text-ink/65">{faq.answer}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="mt-8 rounded-[1.75rem] bg-white p-5 shadow-soft lg:p-8">
          <h2 className="text-2xl font-bold text-ink">Local SEO notes for this salon page</h2>
          <div className="mt-5 grid gap-4 md:grid-cols-3">
            <article>
              <h3 className="font-bold text-ink">What comes from the brand site?</h3>
              <p className="mt-2 text-sm leading-6 text-ink/65">
                Address, phone, official booking context, opening hours, salon story, and selected service prices.
              </p>
            </article>
            <article>
              <h3 className="font-bold text-ink">What would come from Places API?</h3>
              <p className="mt-2 text-sm leading-6 text-ink/65">
                Google rating, review count, photos, Google Maps URI, business status, phone, website, and current opening hours.
              </p>
            </article>
            <article>
              <h3 className="font-bold text-ink">What stays editorial?</h3>
              <p className="mt-2 text-sm leading-6 text-ink/65">
                SEO title, service descriptions, FAQs, brand positioning, and conversion-oriented page hierarchy.
              </p>
            </article>
          </div>
          <div className="mt-6 rounded-[1.25rem] border border-champagne bg-pearl p-4 text-sm leading-6 text-ink/65">
            <strong className="block text-ink">Source notes</strong>
            {salon.sourceNotes.map((note) => (
              <p key={note} className="mt-2">
                {note}
              </p>
            ))}
          </div>
        </section>
      </section>
    </main>
  );
}
