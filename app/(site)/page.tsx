import { Metadata } from "next";
import AntyHero from "./components/anty-mama/AntyHero";

export const metadata: Metadata = {
  title: "Anty Mama | Cookware & Lifestyle",
  description: "Premium cookware and lifestyle essentials by Anty Mama.",
};

export default function HomePage() {
  return (
    <main>
      <AntyHero />
    </main>
  );
}
