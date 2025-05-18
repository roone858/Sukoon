import { memo, lazy, Suspense } from "react";
import type { ReactElement } from "react";

// Lazy-loaded components with TypeScript types
const Slider = lazy(() => import("../../component/Slider"));
const ExploreSection = lazy(() => import("../../component/ExploreSection"));
const CategoriesSection = lazy(() => import("../../component/CategoriesSection"));
const Banners = lazy(() => import("../../component/Banners"));
const PopularProducts = lazy(() => import("../../component/PopularProducts"));
const DealsSection = lazy(() => import("../../component/DealsSection"));
const CustomerReview = lazy(() => import("../../component/CustomerReview"));
const DesktopSlider = lazy(() => import("../../components/Newsletter"));

// Skeleton loader components for better UX
const SectionSkeleton = ({ height = 'h-96' }: { height?: string }): ReactElement => (
  <div className={`w-full bg-gray-100 animate-pulse rounded-lg ${height}`} />
);

const Home = memo((): ReactElement => {
  return (
    <div className="">
      {/* Hero Slider */}
      <Suspense fallback={<SectionSkeleton height="h-[500px]" />}>
        <Slider />
      </Suspense>

      {/* Categories Section */}
      <Suspense fallback={<SectionSkeleton height="h-64" />}>
        <CategoriesSection />
      </Suspense>

      {/* Banners */}
      <Suspense fallback={<SectionSkeleton height="h-48" />}>
        <Banners />
      </Suspense>

      {/* Popular Products */}
      <Suspense fallback={<SectionSkeleton height="h-[500px]" />}>
        <PopularProducts />
      </Suspense>

      {/* Newsletter/Desktop Slider */}
      <Suspense fallback={<SectionSkeleton height="h-64" />}>
        <DesktopSlider />
      </Suspense>

      {/* Deals Section */}
      <Suspense fallback={<SectionSkeleton height="h-[500px]" />}>
        <DealsSection />
      </Suspense>

      {/* Customer Reviews */}
      <Suspense fallback={<SectionSkeleton height="h-96" />}>
        <CustomerReview />
      </Suspense>

      {/* Main Content */}
      <main className="container mx-auto px-4 sm:px-6 lg:px-8 space-y-12 md:space-y-16">
        {/* Commented sections can be uncommented as needed */}
      </main>

      {/* Explore Section */}
      <Suspense fallback={<SectionSkeleton height="h-[600px]" />}>
        <ExploreSection />
      </Suspense>
    </div>
  );
});

Home.displayName = "Home";
export default Home;