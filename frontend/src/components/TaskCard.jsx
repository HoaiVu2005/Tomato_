import React, { useState } from "react";
import { Card } from "./ui/card";
import { cn } from "@/lib/utils";
import { Button } from "./ui/button";
import {
  Calendar,
  CheckCircle2,
  Circle,
  SquarePen,
  Trash2,
} from "lucide-react";
import { Input } from "./ui/input";
import api from "@/lib/axios";
import { toast } from "sonner";

const TaskCard = ({ task, index, handleReLoad }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [updateTitle, setUpdateTitle] = useState(task.title);
  const deleteTask = async (taskId) => {
    try {
      await api.delete(`/tasks/${taskId}`);
      toast.success("Xóa thành công!");
      handleReLoad();
    } catch (error) {
      console.error("Lỗi khi xóa nhiệm vụ: ", error);
      toast.error("Lỗi khi xóa nhiệm vụ");
    }
  };

  const toggleTask = async () => {
    try {
      if (task.status === "active") {
        await api.put(`/tasks/${task._id}`, {
          status: "completed",
          completedAt: new Date().toISOString(),
        });
        toast.success(`${task.title} đã hoàn thành!`);
      } else {
        await api.put(`/tasks/${task._id}`, {
          status: "active",
          completedAt: null,
        });
        toast.success(`${task.title} chưa hoàn thành!`);
      }
      handleReLoad();
    } catch (error) {
      console.error("Lỗi khi update  nhiệm vụ: ", error);
      toast.error("Lỗi khi update nhiệm vụ");
    }
  };

  const updateTask = async () => {
    try {
      setIsEditing(false);
      await api.put(`/tasks/${task._id}`, { title: updateTitle });
      toast.success("Cập nhật thành công!");
      handleReLoad();
    } catch (error) {
      console.error("Lỗi khi cập nhật nhiệm vụ: ", error);
      toast.error("Lỗi khi cập nhật nhiệm vụ");
    }
  };
  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      updateTask();
    }
  };
  return (
    <Card
      className={cn(
        "p-4  shadow-md hover:shadow-lg transition-all duration-200 animate-fade-in group ",
        task.status === "completed" && "opacity-75"
      )}
      style={{ animationDelay: `${index * 50}ms` }}
    >
      <div className="flex items-center gap-4 justify-between">
        <div className="flex gap-4 items-center flex-1 min-w-0">
          <Button
            onClick={toggleTask}
            size="icon"
            variant="ghost"
            className={cn(
              "bg-transparent flex-shrink-0 size-8 rounded-full transition-all duration-200",
              task.status === "completed"
                ? "text-success hover:text-primary"
                : "text-muted-foreground hover:text-primary"
            )}
          >
            {task.status === "completed" ? (
              <CheckCircle2 className="size-5" />
            ) : (
              <Circle className="size-5" />
            )}
          </Button>

          {/* edit */}
          <div className=" flex-1 min-w-0">
            {isEditing ? (
              <Input
                onBlur={() => {
                  setIsEditing(false), setUpdateTitle(task.title || "");
                }}
                autoFocus
                value={updateTitle}
                onChange={(e) => setUpdateTitle(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Cần phải làm gì?"
                type="text"
                className="h-12 !flex-1  text-base"
              />
            ) : (
              <p
                className={cn(
                  "text-base transition-all duration-200 ",
                  task.status === "completed"
                    ? "line-through"
                    : "text-foreground"
                )}
              >
                {task.title}
              </p>
            )}

            {/* date time */}
            <div className="flex item gap-2 mt-1 items-center">
              <Calendar className="size-3 " />
              <span className="text-xs text-slate-500">
                {new Date(task.createdAt).toLocaleString()}
              </span>
              {task.completedAt && (
                <>
                  <span className="text-xs text-slate-500">-</span>
                  <Calendar className="size-3 " />
                  <span className="text-xs text-slate-500">
                    {new Date(task.completedAt).toLocaleString()}
                  </span>
                </>
              )}
            </div>
          </div>
        </div>

        {/* edit and delete */}
        <div className="sm:hidden group-hover:inline-block gap-2 animate-slide-up">
          <Button
            onClick={() => {
              setIsEditing(true), setUpdateTitle(task.title || "");
            }}
            variant="ghost "
            size="icon"
            className="flex-shrink-0 transition-colors size-8 text-muted-foreground hover:text-info"
          >
            <SquarePen className="size-4" />
          </Button>

          <Button
            onClick={() => deleteTask(task._id)}
            variant="ghost "
            className="flex-shrink-0 transition-colors size-8 text-muted-foreground hover:text-destructive "
          >
            <Trash2 className="size-4" />
          </Button>
        </div>
      </div>
    </Card>
  );
};

export default TaskCard;
