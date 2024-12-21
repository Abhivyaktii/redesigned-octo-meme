import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Calendar, Clock } from 'lucide-react';

// Define the shape of the blog post data
interface BlogPost {
  id: number;
  title: string;
  description: string;
  social_image: string | null; // Allow null for missing images
  created_at: string;
  readable_publish_date: string;
  url: string; // URL field for the blog post
  tag_list: string[]; // Array of tags
}

export const Blog = () => {
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([]); // Explicitly define the type of blogPosts
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch blog posts from Dev.to API
    const fetchBlogPosts = async () => {
      try {
        const response = await fetch('https://dev.to/api/articles?username=abhivyaktii');
        const data = await response.json();
        setBlogPosts(data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching blog posts:", error);
        setLoading(false);
      }
    };

    fetchBlogPosts();
  }, []);

  if (loading) {
    return <div className="text-center py-20">Loading...</div>; // Loading state
  }

  return (
    <section className="py-20 bg-gray-50 relative">
      {/* Animated Gradient */}
      <motion.div
        initial={{ backgroundPosition: "0% 50%" }}
        animate={{ backgroundPosition: "100% 50%" }}
        transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
        className="absolute inset-0 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 bg-[length:200%_200%] opacity-30"
      ></motion.div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-gray-900">Blogs</h2>
          <p className="mt-4 text-lg text-gray-600">Thoughts, tutorials, and insights</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogPosts.map((post, index) => {
            const hasImage = Boolean(post.social_image);

            return (
              <motion.a
                key={post.id}
                href={post.url} // Link to the blog post
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className={`rounded-2xl shadow-xl overflow-hidden transition-transform transform hover:scale-105 hover:shadow-2xl duration-300 ease-in-out block ${
                  index % 2 === 0 ? 'bg-blue-50' : 'bg-green-50'
                }`}
              >
                {/* Image Container or Title as Fallback */}
                <div
                  className={`w-full h-48 relative flex items-center justify-center ${
                    hasImage ? '' : 'bg-gray-200 text-gray-800'
                  }`}
                >
                  {hasImage ? (
                    <img
                      src={post.social_image || ''}
                      alt={post.title}
                      className="w-full h-full object-cover rounded-t-2xl"
                    />
                  ) : (
                    <h3 className="text-xl font-semibold px-4 text-center">{post.title}</h3>
                  )}
                </div>

                <div className="p-6">
                  {/* <h3 className="text-xl font-semibold text-gray-900 mb-3">{post.title}</h3> */}
                  <p className="text-gray-600 mb-4">{post.description}</p>
                  <div className="mb-4 flex flex-wrap gap-2">
                    {post.tag_list.map((tag) => (
                      <span
                        key={tag}
                        className="bg-indigo-100 text-indigo-700 text-sm font-medium px-3 py-1 rounded-full"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                  <div className="flex items-center text-sm text-gray-500 space-x-4">
                    <div className="flex items-center">
                      <Calendar className="w-4 h-4 mr-1" />
                      <span>{new Date(post.created_at).toLocaleDateString()}</span>
                    </div>
                    <div className="flex items-center">
                      <Clock className="w-4 h-4 mr-1" />
                      <span>{post.readable_publish_date}</span>
                    </div>
                  </div>
                </div>
              </motion.a>
            );
          })}
        </div>
      </div>
    </section>
  );
};
