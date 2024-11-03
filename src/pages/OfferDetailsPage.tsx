import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { Download, Copy, Loader2, Eye } from 'lucide-react';
import { offers } from '../data/offers';
import YouTube from 'react-youtube';
import EarningsButton from '../components/EarningsButton';
import ReactMarkdown from 'react-markdown';

export default function OfferDetailsPage() {
  const { id } = useParams<{ id: string }>();
  const offer = offers.find(o => o.id === id);
  const [creativeType, setCreativeType] = useState<'organic' | 'paid'>('organic');
  const [isVideoLoading, setIsVideoLoading] = useState(true);

  if (!offer) {
    return <div>Offer not found</div>;
  }

  const handleLandingPagePreview = () => {
    if (offer.id === 'skore-ai') {
      window.open('https://whop.com/skore-ai/', '_blank');
    } else {
      window.open('https://faceless-twitter.webflow.io/', '_blank');
    }
  };

  const handleWebflowDuplicate = () => {
    if (offer.id !== 'skore-ai') {
      window.open('https://webflow.com/made-in-webflow/website/faceless-twitter', '_blank');
    }
  };

  return (
    <div className="animate-fadeIn space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">{offer.name}</h1>
          <p className="mt-2 text-lg text-gray-600">{offer.description}</p>
        </div>
        <EarningsButton offerId={offer.id} />
      </div>

      {/* Offer Guidelines */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold text-gray-900">Offer Guidelines</h2>
        <div className="space-y-2">
          {offer.guidelines.map((guideline, index) => (
            <div key={index} className="text-gray-600">
              <ReactMarkdown
                components={{
                  a: ({ node, ...props }) => (
                    <a
                      {...props}
                      className="text-blue-600 hover:underline"
                      target="_blank"
                      rel="noopener noreferrer"
                    />
                  ),
                }}
              >
                {guideline}
              </ReactMarkdown>
            </div>
          ))}
        </div>
      </section>

      {/* Payout Box */}
      <section className="bg-blue-50 rounded-lg p-6">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-medium text-gray-900">Payout Details</h3>
            <p className="text-blue-600 font-semibold mt-1">
              ${offer.payout} Payout ({offer.commission}% Commission)
            </p>
          </div>
          {offer.isRecurring && (
            <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm">
              Recurring
            </span>
          )}
        </div>
      </section>

      {/* Landing Page Section */}
      <section className="space-y-6 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-8 animate-fadeIn">
        <h2 className="text-xl font-semibold text-gray-900">Landing Page</h2>
        
        <div className="grid md:grid-cols-2 gap-6">
          <div className="space-y-4">
            {offer.id === 'skore-ai' ? (
              <>
                <p className="text-gray-600">
                  You can create your own landing page as long as it complies with these rules:
                </p>
                <ul className="list-disc list-inside space-y-2 text-gray-600">
                  <li>Avoid guaranteeing users any specific amount of income</li>
                  <li>Avoid using phrases that imply certainty of financial gain</li>
                </ul>
              </>
            ) : (
              <p className="text-gray-600">
                Use our high-converting landing page template to maximize your earnings.
                Watch the tutorial below to learn how to customize it for your needs.
              </p>
            )}
            
            <div className="flex flex-col sm:flex-row gap-3">
              <button
                onClick={handleLandingPagePreview}
                className="flex-1 inline-flex items-center justify-center px-4 py-2 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 transition-all duration-200 group"
              >
                <Eye className="mr-2 h-4 w-4 text-gray-600 group-hover:text-blue-600" />
                <span className="text-gray-700 group-hover:text-gray-900">Preview Landing Page</span>
              </button>
              
              {offer.id !== 'skore-ai' && (
                <button
                  onClick={handleWebflowDuplicate}
                  className="flex-1 inline-flex items-center justify-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all duration-200"
                >
                  <Copy className="mr-2 h-4 w-4" />
                  <span>Duplicate to Webflow</span>
                </button>
              )}
            </div>
          </div>

          {offer.id !== 'skore-ai' && (
            <div className="relative aspect-video rounded-lg overflow-hidden bg-white shadow-md">
              {isVideoLoading && (
                <div className="absolute inset-0 flex items-center justify-center bg-gray-50">
                  <Loader2 className="w-8 h-8 text-blue-600 animate-spin" />
                </div>
              )}
              <YouTube
                videoId="dQw4w9WgXcQ"
                className="w-full"
                onReady={() => setIsVideoLoading(false)}
                opts={{
                  width: '100%',
                  height: '100%',
                  playerVars: {
                    autoplay: 0,
                    modestbranding: 1,
                    rel: 0,
                  },
                }}
              />
            </div>
          )}
        </div>
      </section>

      {/* Creatives Section */}
      <section className="space-y-6">
        <h2 className="text-xl font-semibold text-gray-900">Creatives</h2>
        
        <div className="flex space-x-4 mb-6">
          <button
            onClick={() => setCreativeType('organic')}
            className={`px-4 py-2 rounded-md text-sm font-medium ${
              creativeType === 'organic'
                ? 'bg-blue-600 text-white'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            Organic
          </button>
          <button
            onClick={() => setCreativeType('paid')}
            className={`px-4 py-2 rounded-md text-sm font-medium ${
              creativeType === 'paid'
                ? 'bg-blue-600 text-white'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            Paid Ads
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {offer.creatives[creativeType].map((creative, index) => (
            <div
              key={index}
              className="border rounded-lg p-4 space-y-4"
            >
              <div className="flex items-center justify-between">
                <h3 className="font-medium text-gray-900">{creative.platform}</h3>
                <a
                  href={creative.url}
                  download
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center px-3 py-1 border border-gray-300 rounded text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
                >
                  <Download className="mr-1 h-4 w-4" />
                  Download
                </a>
              </div>
              {creative.type === 'image' ? (
                <img
                  src={creative.url}
                  alt={`${creative.platform} creative`}
                  className="w-full h-48 object-cover rounded"
                />
              ) : (
                <video
                  src={creative.url}
                  className="w-full h-48 object-cover rounded"
                  controls
                />
              )}
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}