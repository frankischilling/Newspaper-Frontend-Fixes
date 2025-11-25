// Updated TabbedNewsSection with reactions support
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import NewsGrid from "./NewsGrid";
import StandardArticleCard from "./StandardArticleCard";
import { tabsConfig, tabsData } from "@/data/sampleArticles";

const getResponsiveClasses = (columns) => {
  const baseClasses = "grid gap-2 md:gap-4";
  switch (columns) {
    case 2:
      return `${baseClasses} grid-cols-1 sm:grid-cols-2`;
    case 3:
      return `${baseClasses} grid-cols-1 sm:grid-cols-2 lg:grid-cols-3`;
    case 4:
    default:
      return `${baseClasses} grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 `;
  }
};

const TabbedNewsSection = ({
  className,
  dynamicTabsData,
  dynamicTabsConfig,
  newsReactions = {}, // Rename to newsReactions, default to empty object
  onPostLove,
  onPostComment,
}) => {
  const activeTabsData = dynamicTabsData || tabsData;
  const activeTabsConfig = dynamicTabsConfig || tabsConfig;
  const defaultTab =
    activeTabsConfig.find((tab) => tab.isDefault)?.key ||
    activeTabsConfig[0]?.key;

  return (
    <div className={`w-full ${className}`}>
      <Tabs defaultValue={defaultTab} className='w-full'>
        <TabsList className='flex gap-2 items-center mb-5 p-1 bg-transparent md:mx-auto overflow-x-auto border-b border-border'>
          {activeTabsConfig.map((tab) => (
            <TabsTrigger
              key={tab.key}
              value={tab.key}
              className='
                data-[state=active]:h-11
                cursor-pointer
                rounded-md
                px-3 py-1.5
                text-sm md:text-base
                font-medium
                text-custom-gray dark:text-gray-400
                hover:text-primary hover:bg-gray-100
                dark:hover:text-primary-foreground dark:hover:bg-gray-800
                data-[state=active]:bg-primary
                data-[state=active]:text-primary-foreground
                data-[state=active]:font-semibold
                data-[state=active]:shadow-sm
                focus-visible:outline-none
                focus-visible:ring-2
                focus-visible:ring-ring
                focus-visible:ring-offset-2
                focus-visible:ring-offset-background
                whitespace-nowrap
                transition-all duration-200
              '
            >
              {tab.label}
            </TabsTrigger>
          ))}
        </TabsList>

        {activeTabsConfig.map((tab) => {
          const articles = activeTabsData[tab.key] || [];
          const gridClasses = getResponsiveClasses(tab.columns || 4);

          return (
            <TabsContent key={tab.key} value={tab.key} className='mt-0'>
              <NewsGrid
                columns={tab.columns || 4}
                gap={tab.gap || 4}
                className={gridClasses}
              >
                {articles.map((article) => (
                  <StandardArticleCard
                    key={article.id}
                    article={article}
                    reactions={newsReactions[article.id] || []} // Use newsReactions with article ID
                    onPostLove={(loveStatus) =>
                      onPostLove(article.id, loveStatus)
                    }
                    onPostComment={(commentText) =>
                      onPostComment(article.id, commentText)
                    }
                    className='bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 hover:shadow-lg transition-shadow duration-200'
                  />
                ))}
              </NewsGrid>
              {articles.length === 0 && (
                <div className='text-center py-12 text-gray-500 dark:text-gray-400'>
                  <p className='text-lg'>
                    No articles are available for this section.
                  </p>
                  <p className='text-sm mt-2'>
                    Please check back later for updates.
                  </p>
                </div>
              )}
            </TabsContent>
          );
        })}
      </Tabs>
    </div>
  );
};

export default TabbedNewsSection;
