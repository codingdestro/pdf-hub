import React from "react";
import FeaturedToolsCard from "./FeaturedToolsCard";

const FeaturedTools = () => {
  return (
    <section className="p-5 flex flex-col items-center min-h-[60vh] h-full" id="services">
      <div className="text-center py-5">
        <h1 className="text-3xl font-bold">Featured Tools</h1>
      </div>
      <div className="flex items-center justify-center gap-5 flex-wrap h-full ">
        <FeaturedToolsCard
          url="/icons/merge.png"
          title="Merge two or more PDF into one PDF —"
          link="/editor/merge"
        />
        <FeaturedToolsCard
          url="/icons/extract.png"
          title="Extract PDF Pages with ease of tools —"
          link="/editor/extract"
        />
        <FeaturedToolsCard
          url="/icons/remove.png"
          title="Remove PDF Pages from PDF —"
          link="/editor/extract"
        />
      </div>
    </section>
  );
};

export default FeaturedTools;
