export function formatDate(dateString: string): string {
  try {
    const date = new Date(dateString);
    // Adjust for potential timezone issues by using UTC methods
    const year = date.getUTCFullYear();
    const month = date.toLocaleString('en-US', { month: 'long', timeZone: 'UTC' });
    const day = date.getUTCDate();
    return `${month} ${day}, ${year}`;
  } catch (error) {
    console.error("Error formatting date:", error);
    return dateString; // Return original string if formatting fails
  }
} 