import CommunityActivities from "@/components/home/CommunityActivities";
import FeaturedEvents from "@/components/home/FeaturedEvents";
import Hero from "@/components/home/Hero";
import Newsletter from "@/components/home/Newsletter";
import PastEvents from "@/components/home/PastEvents";

export default function Home() {
  return (
    <>
      <Hero />
      <CommunityActivities />
      <FeaturedEvents />
      <PastEvents />
      <Newsletter />
    </>
  );
}