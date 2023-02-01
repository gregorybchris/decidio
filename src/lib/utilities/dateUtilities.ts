import { DateTime } from "luxon";

export function formatDate(date: string) {
  const datetime = DateTime.fromISO(date);
  if (datetime.year == DateTime.now().year) {
    return datetime.toFormat("LLL d");
  }
  return datetime.toFormat("LLL d, yyyy");
}
