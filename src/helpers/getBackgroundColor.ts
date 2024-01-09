export function getBackgroundColor(priority: string) {
  switch (priority) {
    case "low":
      return "low-priority";
    case "medium":
      return "medium-priority";
    case "high":
      return "high-priority";
    default:
      return "";
  }
}
