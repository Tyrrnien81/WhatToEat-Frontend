/**
 * Calendar date in the device's local timezone (not UTC).
 * Use for API ?date= params so they match menu rows keyed by local service_date.
 */
export function toLocalYmd(d: Date = new Date()): string {
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${y}-${m}-${day}`;
}
