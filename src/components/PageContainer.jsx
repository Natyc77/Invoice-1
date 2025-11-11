import React from 'react';
import { motion } from 'framer-motion';

const PageContainer = ({ title, children }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="max-w-4xl mx-auto py-12 px-4 sm:px-6 lg:px-8"
    >
      <div className="bg-white rounded-lg shadow-md p-8 md:p-12">
        <h1 className="text-3xl font-bold text-slate-900 mb-8 border-b pb-4">{title}</h1>
        <div className="prose prose-slate max-w-none">
          {children}
        </div>
      </div>
    </motion.div>
  );
};

export default PageContainer;