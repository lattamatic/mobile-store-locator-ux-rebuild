type PlacesOpeningPeriod = {
  open?: { day?: number; hour?: number; minute?: number };
  close?: { day?: number; hour?: number; minute?: number };
};

type GooglePlace = {
  id?: string;
  displayName?: { text?: string };
  formattedAddress?: string;
  googleMapsUri?: string;
  internationalPhoneNumber?: string;
  nationalPhoneNumber?: string;
  websiteUri?: string;
  businessStatus?: string;
  rating?: number;
  userRatingCount?: number;
  location?: {
    latitude?: number;
    longitude?: number;
  };
  currentOpeningHours?: {
    openNow?: boolean;
    weekdayDescriptions?: string[];
    periods?: PlacesOpeningPeriod[];
  };
  regularOpeningHours?: {
    weekdayDescriptions?: string[];
    periods?: PlacesOpeningPeriod[];
  };
  photos?: Array<{
    name?: string;
    widthPx?: number;
    heightPx?: number;
  }>;
  primaryTypeDisplayName?: { text?: string };
};

export type PlacesSalonData = {
  placeId?: string;
  name?: string;
  formattedAddress?: string;
  googleMapsUri?: string;
  phone?: string;
  website?: string;
  businessStatus?: string;
  rating?: number;
  userRatingCount?: number;
  latitude?: number;
  longitude?: number;
  openNow?: boolean;
  weekdayDescriptions?: string[];
  primaryType?: string;
  photoUrl?: string;
  source: "google-places" | "fallback";
};

const PLACE_DETAILS_FIELDS = [
  "id",
  "displayName",
  "formattedAddress",
  "googleMapsUri",
  "internationalPhoneNumber",
  "nationalPhoneNumber",
  "websiteUri",
  "businessStatus",
  "rating",
  "userRatingCount",
  "location",
  "currentOpeningHours",
  "regularOpeningHours",
  "photos",
  "primaryTypeDisplayName"
].join(",");

const TEXT_SEARCH_FIELDS = [
  "places.id",
  "places.displayName",
  "places.formattedAddress",
  "places.location",
  "places.googleMapsUri"
].join(",");

const PLACES_REQUEST_TIMEOUT_MS = 8000;

function createPlacesRequestSignal() {
  return AbortSignal.timeout(PLACES_REQUEST_TIMEOUT_MS);
}

function getPhotoUrl(photoName: string | undefined, apiKey: string) {
  if (!photoName) return undefined;

  const params = new URLSearchParams({
    maxWidthPx: "1600",
    key: apiKey
  });

  return `https://places.googleapis.com/v1/${photoName}/media?${params.toString()}`;
}

function normalizePlace(place: GooglePlace, apiKey: string): PlacesSalonData {
  return {
    placeId: place.id,
    name: place.displayName?.text,
    formattedAddress: place.formattedAddress,
    googleMapsUri: place.googleMapsUri,
    phone: place.internationalPhoneNumber ?? place.nationalPhoneNumber,
    website: place.websiteUri,
    businessStatus: place.businessStatus,
    rating: place.rating,
    userRatingCount: place.userRatingCount,
    latitude: place.location?.latitude,
    longitude: place.location?.longitude,
    openNow: place.currentOpeningHours?.openNow,
    weekdayDescriptions: place.currentOpeningHours?.weekdayDescriptions ?? place.regularOpeningHours?.weekdayDescriptions,
    primaryType: place.primaryTypeDisplayName?.text,
    photoUrl: getPhotoUrl(place.photos?.[0]?.name, apiKey),
    source: "google-places"
  };
}

async function fetchPlaceDetails(placeId: string, apiKey: string) {
  const response = await fetch(`https://places.googleapis.com/v1/places/${placeId}`, {
    signal: createPlacesRequestSignal(),
    headers: {
      "X-Goog-Api-Key": apiKey,
      "X-Goog-FieldMask": PLACE_DETAILS_FIELDS
    }
  });

  if (!response.ok) {
    throw new Error(`Google Place Details failed with ${response.status}`);
  }

  return normalizePlace((await response.json()) as GooglePlace, apiKey);
}

async function findPlaceIdByText(query: string, apiKey: string) {
  const response = await fetch("https://places.googleapis.com/v1/places:searchText", {
    method: "POST",
    signal: createPlacesRequestSignal(),
    headers: {
      "Content-Type": "application/json",
      "X-Goog-Api-Key": apiKey,
      "X-Goog-FieldMask": TEXT_SEARCH_FIELDS
    },
    body: JSON.stringify({
      textQuery: query,
      languageCode: "en",
      regionCode: "FR"
    })
  });

  if (!response.ok) {
    throw new Error(`Google Text Search failed with ${response.status}`);
  }

  const payload = (await response.json()) as { places?: GooglePlace[] };
  return payload.places?.[0]?.id;
}

export async function getGooglePlacesSalonData({
  fallbackQuery,
  placeId
}: {
  fallbackQuery: string;
  placeId?: string;
}): Promise<PlacesSalonData> {
  const apiKey = process.env.GOOGLE_PLACES_API_KEY;
  const configuredPlaceId = placeId ?? process.env.DAVID_MALLETT_PLACE_ID;

  if (!apiKey) {
    return { source: "fallback" };
  }

  try {
    const resolvedPlaceId = configuredPlaceId ?? (await findPlaceIdByText(fallbackQuery, apiKey));

    if (!resolvedPlaceId) {
      return { source: "fallback" };
    }

    return await fetchPlaceDetails(resolvedPlaceId, apiKey);
  } catch (error) {
    console.warn("[places-build-diagnostic]", {
      status: "fallback",
      reason: error instanceof Error ? error.message : "Unknown Google Places error"
    });

    return { source: "fallback" };
  }
}
