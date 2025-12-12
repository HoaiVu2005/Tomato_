import React from "react";
import { Badge } from "./ui/badge";

import { Button } from "./ui/button";
import { Filter } from "lucide-react";
import { FilterType } from "@/lib/FilterType.js";
const StatsAndFilter = ({
  ActiveCount = 0,
  CompletedCount = 0,
  filter,
  setFilter,
}) => {
  return (
    <div className="flex flex-col sm:flex-row justify-between items-center">
      <div className="flex gap-3 ">
        <Badge
          variant="secondary"
          className="border-orange-400 px-3  text-white bg-orange-400 "
        >
          {ActiveCount} {FilterType.active}
        </Badge>
        <Badge
          variant="secondary"
          className="border-orange-400/50 px-3 text-orange-400 "
        >
          {CompletedCount} {FilterType.completed}
        </Badge>
      </div>

      <div className="flex gap-2 flex-col mt-5 sm:mt-0 sm:flex-row">
        {Object.keys(FilterType).map((type) => (
          <Button
            key={type}
            onClick={() => setFilter(type)}
            className="capitalize"
            variant={filter === type ? "gradient" : "ghost"}
          >
            {" "}
            <Filter className="size-4" /> {FilterType[type]}
          </Button>
        ))}
      </div>
    </div>
  );
};

export default StatsAndFilter;
