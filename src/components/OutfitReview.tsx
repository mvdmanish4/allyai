import React from 'react';

interface Source {
  icon: string;
  title: string;
  description: string;
  url: string;
}

export default function OutfitReview() {
  const sources: Source[] = [
    {
      icon: "SF",
      title: "StyleForum - Black Denim Fit and Style Guide",
      description: "A comprehensive guide to finding the perfect fit and maintaining style with black denim.",
      url: "https://www.styleforum.net"
    },
    {
      icon: "IG",
      title: "Instagram - Fashion Inspirations Featuring Black Straight Jeans",
      description: "Discover how to style black straight jeans for various occasions.",
      url: "https://www.instagram.com"
    },
    {
      icon: "R",
      title: "Reddit - Denim Enthusiasts Discussing Quality Jeans",
      description: "Community insights on durability and fit for black denim.",
      url: "https://www.reddit.com"
    },
    {
      icon: "N",
      title: "Nordstrom Reviews - Straight Black Jeans Collection",
      description: "Customer reviews highlighting fit, comfort, and quality of black straight jeans.",
      url: "https://www.nordstrom.com"
    },
    {
      icon: "A",
      title: "Amazon Reviews - Popular Black Jeans",
      description: "Reviews of top-selling black jeans, detailing pros and cons from verified buyers.",
      url: "https://www.amazon.com"
    }
  ];
  

  return (
    <div className="bg-gray-100 p-4 rounded-lg">
      <div className="space-y-6">
        <p className="text-gray-600">
        Black straight jeans are a staple in many wardrobes due to their versatility and timeless style. Here's a concise overview of public sentiment based on various reviews and sources:
        </p>

        {/* Pros Section */}
        <div>
          <h3 className="font-bold mb-2">Pros:</h3>
          <ul className="list-disc pl-5 space-y-2">
            <li>
              <span className="font-semibold">Flattering Fit: </span>
              <span className="text-gray-600">The bag is noted for its ample space, making it practical for daily use. The magnetic snap closure adds to its convenience and security </span>
              <a href="https://www.purseblog.com" className="text-indigo-600 hover:underline">(PurseBlog)</a>
            </li>
            <li>
              <span className="font-semibold">Versatile Style: </span>
              <span className="text-gray-600">Easily dressed up or down, these jeans pair seamlessly with casual tees or formal blazers</span>
              <a href="https://www.instagram.com" className="text-indigo-600 hover:underline">(Instagram)</a>
            </li>
            <li>
              <span className="font-semibold">Durable Material: </span>
              <span className="text-gray-600">Many users praise the high-quality denim, which holds its shape even after multiple washes</span>
              <a href="https://www.reddit.com" className="text-indigo-600 hover:underline">(Reddit)</a>
            </li>
          </ul>
        </div>

        {/* Cons Section */}
        <div>
          <h3 className="font-bold mb-2">Cons:</h3>
          <ul className="list-disc pl-5 space-y-2">
            <li>
              <span className="font-semibold">Lint Magnet: </span>
              <span className="text-gray-600">Some reviews note that black denim tends to attract lint, requiring regular maintenance to stay looking sharp </span>
              <a href="https://www.reddit.com" className="text-indigo-600 hover:underline">(Reddit)</a>
            </li>
            <li>
              <span className="font-semibold">Sizing Variability: </span>
              <span className="text-gray-600"> A few users reported inconsistencies in sizing, suggesting that trying them on before purchase is advisable </span>
              <a href="https://www.etsy.com" className="text-indigo-600 hover:underline">(Etsy)</a>
            </li>
          </ul>
        </div>

        {/* Overall Sentiment */}
        <div>
          <h3 className="font-bold mb-2">Overall Sentiment:</h3>
          <ul className="list-disc pl-5 space-y-2">
            <li>
              <span className="font-semibold">Positive Reception: </span>
              <span className="text-gray-600">Black straight jeans are widely appreciated for their classic style and functionality, making them a wardrobe essential</span>
            </li>
            <li>
              <span className="font-semibold">Vintage Appeal: </span>
              <span className="text-gray-600"> They are particularly favored for their ability to transition seamlessly between casual and formal occasions while remaining comfortable.</span>
            </li>
          </ul>
        </div>

        <p className="text-gray-600">
          For more detailed insights, you can check out the full reviews on{' '}
          <a href="https://www.purseblog.com" className="text-indigo-600 hover:underline">PurseBlog</a>
          {' '}and other sources mentioned.
        </p>

        {/* Sources */}
        <div>
          <h3 className="font-bold mb-3">Sources</h3>
          <div className="flex overflow-x-auto gap-4 pb-4 -mx-4 px-4">
            {sources.map((source, index) => (
              <a
                key={index}
                href={source.url}
                className="flex-shrink-0 w-72 bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-shadow"
              >
                <div className="p-4">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-8 h-8 flex items-center justify-center bg-gray-100 rounded text-sm font-medium">
                      {source.icon}
                    </div>
                    <h4 className="text-sm font-medium text-gray-900 line-clamp-1">{source.title}</h4>
                  </div>
                  <p className="text-sm text-gray-500 line-clamp-2">{source.description}</p>
                </div>
              </a>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}