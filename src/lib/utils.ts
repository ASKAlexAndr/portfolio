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
  // В продакшене добавляем префикс /portfolio для GitHub Pages
  if (typeof window !== 'undefined') {
    // Проверяем, находимся ли мы на GitHub Pages
    if (window.location.hostname === 'aleksandrkorotkov.github.io' || 
        window.location.pathname.startsWith('/portfolio')) {
      return `/portfolio${path}`;
    }
  }
  return path;
}


