export { default } from "../page";

export function generateStaticParams() {
  return [
    { locale: 'en' },
    { locale: 'ru' }
  ];
}


