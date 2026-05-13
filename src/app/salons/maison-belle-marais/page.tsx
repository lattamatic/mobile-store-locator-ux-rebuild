import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, CalendarDays, Clock, MapPin, Phone, Sparkles, Star } from "lucide-react";
import { Badge } from "@/components/ui/Badge";

const salon = {
  name: "Maison Belle Marais",
  address: "18 Rue Vieille du Temple",
  city: "Paris",
  postalCode: "75003",
  phone: "+33 1 42 00 18 03",
  rating: 4.8,
  reviewCount: 184,
  closingTime: "20:00",
  coordinates: {
    latitude: 48.8589,
    longitude: 2.3617
  },
  services: [
    { name: "Color consultation", duration: "45 min", price: "from 45 EUR" },
    { name: "Signature cut", duration: "60 min", price: "from 68 EUR" },
    { name: "Brow bar", duration: "30 min", price: "from 32 EUR" },
    { name: "Gloss treatment", duration: "40 min", price: "from 55 EUR" }
  ],
  hours: [
    ["Monday", "10:00-19:30"],
    ["Tuesday", "10:00-19:30"],
    ["Wednesday", "10:00-20:00"],
    ["Thursday", "10:00-20:00"],
    ["Friday", "10:00-20:00"],
    ["Saturday", "09:30-19:00"],
    ["Sunday", "Closed"]
  ]
};

export const metadata: Metadata = {
  title: `${salon.name} | Beauty Salon in Paris ${salon.postalCode}`,
  description:
    "Discover Maison Belle Marais, a premium beauty salon in Paris 75003 offering color, cut, brow bar, and gloss treatments near Le Marais.",
  alternates: {
    canonical: "/salons/maison-belle-marais"
  },
  openGraph: {
    title: `${salon.name} | Beauty Salon in Paris`,
    description: "Premium salon services in Le Marais with color, cut, brow bar, and gloss treatments.",
    type: "website"
  }
};

export default function SalonPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BeautySalon",
    name: salon.name,
    address: {
      "@type": "PostalAddress",
      streetAddress: salon.address,
      addressLocality: salon.city,
      postalCode: salon.postalCode,
      addressCountry: "FR"
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: salon.coordinates.latitude,
      longitude: salon.coordinates.longitude
    },
    telephone: salon.phone,
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: salon.rating,
      reviewCount: salon.reviewCount
    },
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

        <div className="mt-6 grid gap-6 lg:grid-cols-[1.15fr_0.85fr] lg:items-start">
          <section className="rounded-[1.75rem] bg-white p-5 shadow-soft lg:p-8">
            <div className="flex flex-wrap gap-2">
              <Badge tone="success">Open now</Badge>
              <Badge>Le Marais</Badge>
              <Badge>Paris {salon.postalCode}</Badge>
            </div>

            <h1 className="mt-5 text-4xl font-bold text-ink lg:text-6xl">{salon.name}</h1>
            <p className="mt-4 max-w-2xl text-lg leading-8 text-ink/68">
              Premium beauty salon in Paris 3e for polished color, precision cuts, brow shaping, and express glow services.
            </p>

            <div className="mt-6 grid gap-3 sm:grid-cols-3">
              <div className="rounded-[1.25rem] border border-champagne bg-pearl p-4">
                <MapPin className="h-5 w-5 text-rosewood" />
                <strong className="mt-3 block text-sm text-ink">{salon.address}</strong>
                <span className="text-sm text-ink/60">
                  {salon.city} {salon.postalCode}
                </span>
              </div>
              <div className="rounded-[1.25rem] border border-champagne bg-pearl p-4">
                <Star className="h-5 w-5 text-rosewood" />
                <strong className="mt-3 block text-sm text-ink">{salon.rating} average rating</strong>
                <span className="text-sm text-ink/60">{salon.reviewCount} client reviews</span>
              </div>
              <div className="rounded-[1.25rem] border border-champagne bg-pearl p-4">
                <Clock className="h-5 w-5 text-rosewood" />
                <strong className="mt-3 block text-sm text-ink">Closes at {salon.closingTime}</strong>
                <span className="text-sm text-ink/60">Extended weekday hours</span>
              </div>
            </div>

            <div className="mt-7 flex flex-col gap-3 sm:flex-row">
              <a
                href={`tel:${salon.phone.replaceAll(" ", "")}`}
                className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-ink px-5 text-sm font-semibold text-white transition hover:bg-rosewood"
              >
                <Phone className="h-4 w-4" />
                Call salon
              </a>
              <a
                href={`https://www.google.com/maps/search/?api=1&query=${salon.coordinates.latitude},${salon.coordinates.longitude}`}
                className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full border border-champagne bg-white px-5 text-sm font-semibold text-ink transition hover:border-rosewood"
              >
                <MapPin className="h-4 w-4" />
                Get directions
              </a>
            </div>
          </section>

          <aside className="rounded-[1.75rem] border border-champagne bg-white p-5 shadow-soft lg:sticky lg:top-8">
            <h2 className="text-sm font-bold uppercase tracking-wide text-rosewood">Opening hours</h2>
            <div className="mt-4 divide-y divide-champagne/70">
              {salon.hours.map(([day, hours]) => (
                <div key={day} className="flex items-center justify-between py-3 text-sm">
                  <span className="font-semibold text-ink">{day}</span>
                  <span className="text-ink/65">{hours}</span>
                </div>
              ))}
            </div>
          </aside>
        </div>

        <section className="mt-8 grid gap-5 lg:grid-cols-[1fr_360px]">
          <div className="rounded-[1.75rem] bg-white p-5 shadow-soft lg:p-8">
            <div className="flex items-center gap-2">
              <Sparkles className="h-5 w-5 text-rosewood" />
              <h2 className="text-2xl font-bold text-ink">Services at this salon</h2>
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
            <h2 className="mt-3 text-xl font-bold text-ink">Why clients choose this location</h2>
            <p className="mt-3 text-sm leading-6 text-ink/65">
              A central Le Marais address, extended evening hours, and a service mix built for both planned appointments and quick
              walk-in decisions.
            </p>
          </div>
        </section>

        <section className="mt-8 rounded-[1.75rem] bg-white p-5 shadow-soft lg:p-8">
          <h2 className="text-2xl font-bold text-ink">Maison Belle Marais FAQs</h2>
          <div className="mt-5 grid gap-4 md:grid-cols-3">
            <article>
              <h3 className="font-bold text-ink">Can I visit without an appointment?</h3>
              <p className="mt-2 text-sm leading-6 text-ink/65">Walk-ins are accepted when stylists are available, but calling ahead is recommended.</p>
            </article>
            <article>
              <h3 className="font-bold text-ink">Which services are best for first-time clients?</h3>
              <p className="mt-2 text-sm leading-6 text-ink/65">Color consultation, signature cut, and brow bar are the most useful starter services.</p>
            </article>
            <article>
              <h3 className="font-bold text-ink">Is this salon easy to reach?</h3>
              <p className="mt-2 text-sm leading-6 text-ink/65">The salon is located in central Paris near Le Marais shopping and transit corridors.</p>
            </article>
          </div>
        </section>
      </section>
    </main>
  );
}
