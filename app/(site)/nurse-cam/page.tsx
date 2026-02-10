import { Metadata } from "next";
import NurseHero from "../components/nurse-cam/NurseHero";

export const metadata: Metadata = {
  title: "Nurse Cam | Nursing Education",
  description: "Professional nursing education products by Nurse Cam.",
};

export default function NurseCamPage() {
  return (
    <main>
      <NurseHero />
    </main>
  );
}
