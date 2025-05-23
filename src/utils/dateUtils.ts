export function calculateDuration(dateRange: string): string {
  if (!dateRange || !dateRange.includes(" - ")) {
    return "";
  }

  const [start, end] = dateRange.split(" - ");

  if (!start || !end) {
    return "";
  }

  try {
    const startDate = parseDate(start);
    const endDate = end.toLowerCase() === "present" ? new Date() : parseDate(end);

    const diff = Math.abs(endDate.getTime() - startDate.getTime());
    const years = Math.floor(diff / (1000 * 60 * 60 * 24 * 365));
    const months = Math.floor(
      (diff % (1000 * 60 * 60 * 24 * 365)) / (1000 * 60 * 60 * 24 * 30.4375)
    );

    if (years === 0) {
      return `${months} month${months !== 1 ? "s" : ""}`;
    } else {
      return `${years} year${years !== 1 ? "s" : ""} ${months} month${
        months !== 1 ? "s" : ""
      }`;
    }
  } catch (error) {
    return "";
  }
}

function parseDate(dateString: string): Date {
  if (dateString.toLowerCase() === "present") {
    return new Date();
  }

  try {
    const [month, year] = dateString.split(" ");
    return new Date(`${month} 1, ${year}`);
  } catch (error) {
    return new Date();
  }
}
