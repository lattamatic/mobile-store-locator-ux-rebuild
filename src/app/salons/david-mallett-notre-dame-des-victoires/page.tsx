import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, CalendarDays, Clock, ExternalLink, MapPin, Phone, ShieldCheck, Sparkles } from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { getGooglePlacesSalonData } from "@/lib/google-places";

const salon = {
  name: "Salon David Mallett - Notre Dame des Victoires",
  shortName: "David Mallett Notre Dame des Victoires",
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
    "Google/Places rating, review count, current open status, and verified map coordinates should be populated through Places API once a Place ID is stored."
  ]
};

export const metadata: Metadata = {
  title: `${salon.shortName} | Luxury Hair Salon in Paris ${salon.postalCode}`,
  description:
    "Discover Salon David Mallett Notre Dame des Victoires in Paris 75002, a luxury hair salon offering cuts, color, balayage, Tokio treatments, and beauty services.",
  alternates: {
    canonical: "/salons/david-mallett-notre-dame-des-victoires"
  },
  openGraph: {
    title: `${salon.shortName} | Luxury Hair Salon in Paris`,
    description: "Luxury Paris hair salon near Place des Victoires and Galerie Vivienne.",
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

  const fullAddress = `${salon.name}, ${salon.address}, ${salon.postalCode} ${salon.city}, France`;
  const displayName = placesData.name ?? salon.name;
  const displayAddress = placesData.formattedAddress ?? `${salon.address}, ${salon.postalCode} ${salon.city}`;
  const displayPhone = placesData.phone ?? salon.phone;
  const displayWebsite = placesData.website ?? salon.website;
  const directionsUrl = placesData.googleMapsUri ?? `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(fullAddress)}`;
  const heroImage = placesData.photoUrl ?? salon.heroImage;
  const weekdayDescriptions = placesData.weekdayDescriptions;
  const isGoogleSourced = placesData.source === "google-places";
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
    ...(placesData.latitude && placesData.longitude
      ? {
          geo: {
            "@type": "GeoCoordinates",
            latitude: placesData.latitude,
            longitude: placesData.longitude
          }
        }
      : {}),
    telephone: displayPhone,
    ...(placesData.rating && placesData.userRatingCount
      ? {
          aggregateRating: {
            "@type": "AggregateRating",
            ratingValue: placesData.rating,
            reviewCount: placesData.userRatingCount
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
              A luxury Paris hair salon in a 17th-century hotel particulier, positioned between Place des Victoires and Galerie Vivienne.
            </p>
          </div>
        </section>

        <div className="mt-6 grid gap-6 lg:grid-cols-[1.15fr_0.85fr] lg:items-start">
          <section className="rounded-[1.75rem] bg-white p-5 shadow-soft lg:p-8">
            <div className="flex flex-wrap gap-2">
              <Badge tone={placesData.openNow === false ? "neutral" : "success"}>
                {placesData.openNow === undefined ? "Open today" : placesData.openNow ? "Open now" : "Closed now"}
              </Badge>
              <Badge>{placesData.primaryType ?? "Luxury hair salon"}</Badge>
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
                  {placesData.rating ? `${placesData.rating} Google rating` : "Source-backed profile"}
                </strong>
                <span className="text-sm text-ink/60">
                  {placesData.userRatingCount ? `${placesData.userRatingCount} Google reviews` : "Connect Places API for rating and reviews"}
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
              {isGoogleSourced ? "Live Google Places data loaded at build time" : "Fallback data shown until Places API env vars are configured"}
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
            <h2 className="mt-3 text-xl font-bold text-ink">Why this page matters</h2>
            <p className="mt-3 text-sm leading-6 text-ink/65">
              This page shows how a real salon profile can combine first-party content, Google Places data, local SEO structure, and
              conversion CTAs.
            </p>
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
