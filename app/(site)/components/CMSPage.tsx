"use client";

import { FiLoader, FiAlertCircle } from "react-icons/fi";
import { useGetCMSPageQuery } from "@/lib/api/cmsApi";

interface CMSPageProps {
  slug: string;
  title: string;
}

const PAGE_MAP: Record<string, string> = {
  "privacy-policy": "privacyPolicy",
  "terms-conditions": "termsConditions",
  "refund-policy": "refundPolicy",
  "shipping-policy": "shippingPolicy",
  "about-us": "aboutUs",
};

export default function CMSPage({ slug, title }: CMSPageProps) {
  const pageKey = PAGE_MAP[slug];

  const { data, isLoading, isError } = useGetCMSPageQuery(pageKey, {
    skip: !pageKey,
  });

  if (isLoading)
    return (
      <div className="flex flex-col h-[80vh] items-center justify-center space-y-4">
        <FiLoader className="animate-spin text-4xl text-amber-600" />
        <p className="text-lg text-gray-700">Loading content...</p>
      </div>
    );

  if (isError || !data?.content)
    return (
      <div className="flex flex-col h-[80vh] items-center justify-center space-y-4">
        <FiAlertCircle className="text-4xl text-red-500" />
        <p className="text-lg text-gray-700">Content not found.</p>
      </div>
    );

  return (
    <div className="max-w-4xl mx-auto px-6 py-16 bg-white">
      <h1 className="text-4xl font-bold text-gray-900 mb-6">{title}</h1>

      <div
        className="prose prose-lg text-gray-700 max-w-none"
        dangerouslySetInnerHTML={{ __html: data.content }}
      />

      {data.updatedAt && (
        <p className="text-sm text-gray-500 mt-8">
          Last updated: {new Date(data.updatedAt).toLocaleDateString()}
        </p>
      )}
    </div>
  );
}
