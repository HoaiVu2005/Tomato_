import React from "react";
import { Card } from "./ui/card";
import EmptyTask from "./EmptyTask";
import { CheckCircle2, Circle } from "lucide-react";
import { Button } from "./ui/button";
import TaskCard from "./TaskCard";

const TaskList = ({ filter, setFilter, taskBuffer, handleReLoad }) => {
  if (!taskBuffer || taskBuffer.length === 0) {
    return <EmptyTask filter={filter} setFilter={setFilter} />;
  }

  return (
    <>
      {taskBuffer.map((task, index) => (
        <TaskCard
          key={index}
          task={task}
          index={index}
          handleReLoad={handleReLoad}
        />
      ))}
    </>
  );
};

export default TaskList;
