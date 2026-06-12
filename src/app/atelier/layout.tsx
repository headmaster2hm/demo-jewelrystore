import "../globals.css";

export const metadata = {
  title: "Studio Console",
  robots: "noindex, nofollow",
};

export default function AtelierLayout({ children }: { children: React.ReactNode }) {
  return <div className="font-sans antialiased text-charcoal-900">{children}</div>;
}
