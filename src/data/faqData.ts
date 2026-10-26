export type FAQCategoryId =
  | 'all'
  | 'materials'
  | 'comfort-sizes'
  | 'delivery-warranty'
  | 'care-support';

export interface FAQCategory {
  id: FAQCategoryId;
  label: string;
}

export interface FAQItemData {
  id: string;
  number: string;
  question: string;
  answer: string;
  category: FAQCategoryId;
  link?: {
    text: string;
    href: string;
  };
}

export const FAQ_CATEGORIES: FAQCategory[] = [
  { id: 'all', label: 'All Questions' },
  { id: 'materials', label: 'Materials' },
  { id: 'comfort-sizes', label: 'Comfort & Sizes' },
  { id: 'delivery-warranty', label: 'Delivery & Warranty' },
  { id: 'care-support', label: 'Care & Support' },
];

export const FAQ_ITEMS: FAQItemData[] = [
  {
    id: 'faq-01',
    number: '01',
    question: 'Which mattress material is right for me?',
    answer:
      'Mindfree offers different mattress materials and constructions, including spring, EP foam, rebound foam, memory foam, and latex options. Explore the available products to compare their construction and comfort characteristics.',
    category: 'materials',
    link: {
      text: 'Explore Mattress Materials →',
      href: '#mattress-selector',
    },
  },
  {
    id: 'faq-02',
    number: '02',
    question: 'What is the difference between Normal Top, Pillow Top, and Euro Top?',
    answer:
      'Normal Top mattresses have a classic top profile, Pillow Top mattresses feature an additional cushioned top layer, and Euro Top mattresses have a more integrated, tailored top construction. The feel and construction vary by product.',
    category: 'comfort-sizes',
    link: {
      text: 'Explore Top Designs →',
      href: '#mattress-selector',
    },
  },
  {
    id: 'faq-03',
    number: '03',
    question: 'How do I choose the correct mattress size?',
    answer:
      'Choose a mattress size that fits your bed frame, available bedroom space, and sleeping requirements. Check the dimensions of each available product before ordering.',
    category: 'comfort-sizes',
    link: {
      text: 'View Available Sizes →',
      href: '#mattress-selector',
    },
  },
  {
    id: 'faq-04',
    number: '04',
    question: 'Are Mindfree mattresses available in different firmness levels?',
    answer:
      'Firmness and comfort options depend on the individual mattress model. Review the product specifications or contact our team for help comparing available options.',
    category: 'comfort-sizes',
    link: {
      text: 'Explore Firmness Options →',
      href: '#signature-collection-showroom',
    },
  },
  {
    id: 'faq-05',
    number: '05',
    question: 'How long does delivery take?',
    answer:
      'Delivery availability and estimated timelines depend on your location, product availability, and order details. Check the delivery information provided during checkout or contact our support team.',
    category: 'delivery-warranty',
    link: {
      text: 'Track Order Status →',
      href: '#track',
    },
  },
  {
    id: 'faq-06',
    number: '06',
    question: 'What warranty is included with my mattress?',
    answer:
      'Warranty coverage depends on the selected mattress and its applicable terms. Please review the warranty information on the product page before placing an order.',
    category: 'delivery-warranty',
    link: {
      text: 'Review Warranty Coverage →',
      href: '#warranty',
    },
  },
  {
    id: 'faq-07',
    number: '07',
    question: 'Can I return or exchange a mattress?',
    answer:
      'Returns and exchanges are subject to the applicable Mindfree policy and product eligibility. Please review the published terms before ordering.',
    category: 'delivery-warranty',
    link: {
      text: '100-Night Trial & Returns →',
      href: '#trial',
    },
  },
  {
    id: 'faq-08',
    number: '08',
    question: 'How should I care for my mattress?',
    answer:
      'Follow the care instructions provided with your mattress. Depending on the model, these may include guidance on ventilation, cleaning, handling, and the use of a suitable bed base.',
    category: 'care-support',
    link: {
      text: 'Contact Us for Product Care Guidance →',
      href: '#contact',
    },
  },
];
