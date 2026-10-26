import React from 'react';
import { getProductBySlug } from '../../data/pdpData';
import { getCatalogueProductBySlug } from '../../data/bedPriceCatalogueData';
import { useHomePageContent } from '../../context/HomePageContentContext';
import { CatalogueProductDetailPage } from '../catalogue/CatalogueProductDetailPage';
import { ProductGallery } from './ProductGallery';
import { ProductPurchasePanel } from './ProductPurchasePanel';
import { ProductSpecifications } from './ProductSpecifications';
import { ProductLayersVisualizer } from './ProductLayersVisualizer';
import { ProductTrustAndPolicies } from './ProductTrustAndPolicies';
import { ProductReviewsSection } from './ProductReviewsSection';
import { RelatedMattresses } from './RelatedMattresses';
import { ProductStickyMobileBar } from './ProductStickyMobileBar';

interface MindfreeProductDetailPageProps {
  slug: string;
}

export const MindfreeProductDetailPage: React.FC<MindfreeProductDetailPageProps> = ({ slug }) => {
  const { mattressesData } = useHomePageContent();
  const normalizedSlug = slug.toLowerCase().trim();
  const cmsProduct = mattressesData.mattressModels.find(
    (p) => p.slug.toLowerCase() === normalizedSlug || p.id.toLowerCase() === normalizedSlug
  );
  const catalogueProduct = cmsProduct || getCatalogueProductBySlug(slug);
  if (catalogueProduct) {
    return <CatalogueProductDetailPage product={catalogueProduct} />;
  }

  const product = getProductBySlug(slug);

  return (
    <article className="w-full bg-[#F8FAFC] min-h-screen text-[#071F52] font-sans relative">
      {/* 1. PDP Hero Section (Two-Column Asymmetric on Desktop) */}
      <section className="w-full pt-8 sm:pt-12 pb-16 lg:pb-20 relative">
        <div className="max-w-[1440px] mx-auto px-5 sm:px-8 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 xl:gap-16 items-start">
            
            {/* Left: Product Gallery (Col 1-7, ~58% width) */}
            <div className="lg:col-span-7 sticky top-28">
              <ProductGallery
                gallery={product.gallery}
                badge={product.badge}
                productName={product.name}
              />
            </div>

            {/* Right: Purchasing Information (Col 8-12, ~42% width) */}
            <div className="lg:col-span-5">
              <ProductPurchasePanel product={product} />
            </div>

          </div>
        </div>
      </section>

      {/* 2. Product Specifications & Posture Alignment */}
      <ProductSpecifications product={product} />

      {/* 3. Exploded Layer Visualizer */}
      <ProductLayersVisualizer layers={product.layers} productName={product.name} />

      {/* 4. Trust, Delivery & FAQs */}
      <ProductTrustAndPolicies
        faqs={product.faqs}
        warrantyYears={product.specifications.warranty.split(' ')[0]}
        productName={product.name}
      />

      {/* 5. Verified Customer Reviews */}
      <ProductReviewsSection
        reviews={product.reviews}
        rating={product.rating}
        reviewsCount={product.reviewsCount}
        productName={product.name}
      />

      {/* 6. Related Mattress Models */}
      <RelatedMattresses currentSlug={product.slug} />

      {/* 7. Mobile Sticky Bottom Purchase Bar */}
      <ProductStickyMobileBar product={product} />
    </article>
  );
};
