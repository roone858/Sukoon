import { memo, lazy, Suspense } from "react";
import type { ReactElement } from "react";

// Lazy-loaded components with TypeScript types
const Slider = lazy(() => import("../../component/Slider"));
const ExploreSection = lazy(() => import("../../component/ExploreSection"));
const CategoriesSection = lazy(
  () => import("../../component/CategoriesSection")
);
const Banners = lazy(() => import("../../component/Banners"));
const PopularProducts = lazy(() => import("../../component/PopularProducts"));
const DealsSection = lazy(() => import("../../component/DealsSection"));
const CustomerReview = lazy(() => import("../../component/CustomerReview"));
const Newsletter = lazy(() => import("../../components/Newsletter"));

// Skeleton loader components for better UX
const SectionSkeleton = ({
  height = "h-96",
}: {
  height?: string;
}): ReactElement => (
  <div className={`w-full bg-gray-100 animate-pulse rounded-lg ${height}`} />
);
// px-4 sm:px-6 lg:px-8
const Home = memo((): ReactElement => {
  return (
    <>
      {/* Hero Slider */}
      <Suspense fallback={<SectionSkeleton height="h-[500px]" />}>
        <Slider />
      </Suspense>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8  space-y-12 md:space-y-16">
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
      </div>
      {/* Newsletter/Desktop Slider */}
      <Suspense fallback={<SectionSkeleton height="h-64" />}>
        <div className="  bg-gradient-to-r from-purple-100 to-gray-50 py-12 md:py-16 lg:py-20  px-4 sm:px-6 lg:px-8 my-12 ">
          <Newsletter />
        </div>
      </Suspense>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8  space-y-12 md:space-y-16">
        {/* Deals Section */}
        <Suspense fallback={<SectionSkeleton height="h-[500px]" />}>
          <DealsSection />
        </Suspense>

        {/* Customer Reviews */}
        <Suspense fallback={<SectionSkeleton height="h-96" />}>
          <CustomerReview />
        </Suspense>

        {/* Explore Section */}
        <Suspense fallback={<SectionSkeleton height="h-[600px]" />}>
          <ExploreSection />
        </Suspense>
      </div>
    </>
  );
});

Home.displayName = "Home";
export default Home;
