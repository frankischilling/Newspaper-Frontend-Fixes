// Updated ListedNewsSection with reactions support
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import NewsGrid from "./NewsGrid";
import StandardArticleCard from "./StandardArticleCard";
import { tabsConfig, tabsData } from "@/data/sampleArticles";
import { useAuthModal } from "@/contexts/AuthModalContext";

// Responsive grid configuration
const getResponsiveGridProps = (articles) => {
  return {
    columns: 4,
    gap: 4,
  };
};

const ListedNewsSection = ({
  className,
  dynamicTabsData,
  dynamicTabsConfig,
  newsReactions = {},
  onPostLove,
  onPostComment,
}) => {
  const activeTabsData = dynamicTabsData || tabsData;
  const activeTabsConfig = dynamicTabsConfig || tabsConfig;
  const { openModal } = useAuthModal();

  const defaultTab =
    activeTabsConfig.find((tab) => tab.isDefault)?.key ||
    activeTabsConfig[0]?.key;

  return (
    <div className={`w-full ${className}`}>
      <Tabs defaultValue={defaultTab} className="w-full">
        <TabsList className="flex items-center justify-start gap-2 md:gap-8 p-0 bg-transparent border-b border-border h-auto overflow-x-auto">
          {activeTabsConfig.map((tab) => (
            <TabsTrigger
              key={tab.key}
              value={tab.key}
              className="
                relative
                px-3 py-1.5
                cursor-pointer
                text-sm md:text-base
                font-medium
                rounded-md
                text-gray-600 dark:text-gray-400
                bg-transparent
                border-none
                hover:bg-gray-100 hover:text-primary
                dark:hover:bg-gray-800 dark:hover:text-primary-foreground
                focus-visible:outline-none
                focus-visible:ring-2
                focus-visible:ring-ring
                focus-visible:ring-offset-2
                focus-visible:ring-offset-background
                data-[state=active]:bg-primary
                data-[state=active]:text-primary-foreground
                data-[state=active]:font-semibold
                data-[state=active]:shadow-sm
                transition-all duration-200
                whitespace-nowrap
              "
            >
              {tab.label}
            </TabsTrigger>
          ))}
        </TabsList>

        {activeTabsConfig.map((tab) => {
          const articles = activeTabsData[tab.key] || [];
          const gridProps = getResponsiveGridProps(articles);

          return (
            <TabsContent key={tab.key} value={tab.key} className="mt-0">
              <NewsGrid
                columns={gridProps.columns}
                gap={gridProps.gap}
                className="grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6"
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
                    className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 hover:shadow-lg transition-shadow duration-200"
                  />
                ))}
              </NewsGrid>
              {articles.length === 0 && (
                <div className="text-center py-12 text-gray-500 dark:text-gray-400">
                  <p className="text-lg">
                    No articles are available for this section.
                  </p>
                  <p className="text-sm mt-2">
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

export default ListedNewsSection;
