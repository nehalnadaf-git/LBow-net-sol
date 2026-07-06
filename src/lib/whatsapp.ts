/**
 * whatsapp.ts
 * -----------
 * Centralised helper for generating WhatsApp deep-link URLs with pre-filled,
 * context-specific messages. No emojis — plain text only.
 *
 * All functions return a wa.me deep-link ready to be used as an href.
 */

const PHONE = '918123501407'; // E.164 without "+"

function waUrl(message: string): string {
  return `https://wa.me/${PHONE}?text=${encodeURIComponent(message)}`;
}

/** Product page — "Interested in PPR Green Pipe" */
export function productWhatsAppUrl(productName: string): string {
  return waUrl(
    `Hello, I am interested in ${productName} from LBow Network Solutions. Please share pricing and availability details.`
  );
}

/** Location page — enquiry scoped to a city / zone */
export function locationWhatsAppUrl(locationDisplayName: string): string {
  return waUrl(
    `Hello, I would like to enquire about PPR and PPCH piping solutions for ${locationDisplayName}. Please share details and pricing.`
  );
}

/** Brand page — enquiry scoped to a brand */
export function brandWhatsAppUrl(brandName: string): string {
  return waUrl(
    `Hello, I am interested in ${brandName} products from LBow Network Solutions. Please share availability and pricing details.`
  );
}

/** Blog / FAQ / Contact — general enquiry */
export function generalWhatsAppUrl(): string {
  return waUrl(
    `Hello, I have an enquiry about piping solutions from LBow Network Solutions. Please get in touch.`
  );
}
