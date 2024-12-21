import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Send, Loader2 } from 'lucide-react';

export const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [modalOpen, setModalOpen] = useState(false); // State to control modal visibility

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');
  
    try {
      const response = await fetch('http://localhost:5000/send-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
  
      if (response.ok) {
        setStatus('success');
        setFormData({ name: '', email: '', message: '' });
      } else {
        setStatus('error');
        setModalOpen(true); // Open the modal if there's an error
      }
    } catch (error) {
      console.error('Error sending email:', error);
      setStatus('error');
      setModalOpen(true); // Open the modal if there's an error
    }
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  return (
    <section className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-500 via-purple-600 to-indigo-800">
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-xl mx-auto w-full bg-black bg-opacity-70 shadow-xl rounded-xl p-8"
        >
          <div className="text-center mb-16">
            <h2 className="text-4xl font-extrabold text-white">Contact Me</h2>
            <p className="mt-4 text-lg text-gray-300">Let's create something amazing together!</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Name Input */}
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-white">
                Name
              </label>
              <input
                type="text"
                id="name"
                value={formData.name}
                onChange={handleChange}
                className="mt-1 block w-full px-4 py-3 rounded-md border border-transparent shadow-sm focus:ring-2 focus:ring-indigo-500 bg-transparent text-white placeholder-gray-400 transition-all duration-300"
                placeholder="Enter your name"
                required
              />
            </div>

            {/* Email Input */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-white">
                Email
              </label>
              <input
                type="email"
                id="email"
                value={formData.email}
                onChange={handleChange}
                className="mt-1 block w-full px-4 py-3 rounded-md border border-transparent shadow-sm focus:ring-2 focus:ring-indigo-500 bg-transparent text-white placeholder-gray-400 transition-all duration-300"
                placeholder="Enter your email"
                required
              />
            </div>

            {/* Message Input */}
            <div>
              <label htmlFor="message" className="block text-sm font-medium text-white">
                Message
              </label>
              <textarea
                id="message"
                rows={4}
                value={formData.message}
                onChange={handleChange}
                className="mt-1 block w-full px-4 py-3 rounded-md border border-transparent shadow-sm focus:ring-2 focus:ring-indigo-500 bg-transparent text-white placeholder-gray-400 transition-all duration-300"
                placeholder="Write your message"
                required
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={
                !formData.name || !formData.email || !formData.message || status === 'loading'
              }
              className={`w-full flex justify-center items-center px-4 py-3 border border-transparent rounded-md shadow-sm text-sm font-medium text-white 
                ${status === 'loading' ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700 hover:ring-4 hover:ring-blue-300'}
                transition-all duration-300 ease-in-out`}
            >
              {status === 'loading' ? (
                <>
                  Sending...
                  <Loader2 className="ml-2 w-4 h-4 animate-spin" />
                </>
              ) : (
                <>
                  Send Message
                  <Send className="ml-2 w-4 h-4" />
                </>
              )}
            </button>

            {/* Success/Failure Message */}
            {status === 'success' && (
              <p className="text-green-600 text-sm text-center">Message sent successfully!</p>
            )}
            {status === 'error' && (
              <p className="text-red-600 text-sm text-center">
                Failed to send message. Please try again.
              </p>
            )}
          </form>
        </motion.div>
      </div>

      {/* Modal for Error */}
      {modalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-8 rounded-lg shadow-xl text-center max-w-sm mx-auto">
            <h3 className="text-2xl font-semibold text-red-600 mb-4">
              Oops! Looks like the dev forgot to add nodemailer 😅
            </h3>
            <p className="text-lg text-gray-800 mb-4">
              No worries, though! You can still reach out via call at <strong>+917301591870</strong>!
            </p>
            <button
              onClick={closeModal}
              className="px-6 py-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition duration-200"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </section>
  );
};
