export function cn(
  ...classNames: Array<string | false | null | undefined>
): string {
  return classNames.filter(Boolean).join(" ");
}

export const site = {
  developerName: "Alexandr Korotkov",
  email: "ask.97.alexandr@gmail.com",
  linkedin: "alexandr-korotkov-rn",
  github: "ASKAlexAndr",
  telegram: "@ASKAlexAndr",
  location: "Moscow, Russia",
};

export function getAssetPath(path: string): string {
  // Add /portfolio prefix in production for GitHub Pages
  if (process.env.NODE_ENV === 'production') {
    return `/portfolio${path}`;
  }
  return path;
}
