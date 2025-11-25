import React from "react";
import { cn } from "@/lib/utils";

const NewsSection = ({ title, children, className }) => {
  return (
    <section className={cn(" md:mb-10 py-2 border-b border-black dark:border-gray-700", className)}>
      {title && (
        <h2 className='text-xl font-bold text-foreground mb-6 border-b border-gray-300 dark:border-gray-700 pb-2'>
          {title}
        </h2>
      )}
      <div>{children}</div>
    </section>
  );
};

export default NewsSection;
