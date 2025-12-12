import React from "react";
import { Card } from "./ui/card";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Plus } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import api from "@/lib/axios";

const AddTask = ({ handleReLoad }) => {
  const [newTaskTitle, setNewTaskTile] = useState("");

  const addTask = async () => {
    if (newTaskTitle.trim()) {
      try {
        await api.post("/tasks", {
          title: newTaskTitle,
        });
        toast.success("Thêm nhiệm vụ thành công!");
        handleReLoad();
      } catch (error) {
        console.error("Lỗi khi thêm nhiệm vụ:", error);
        toast.error("Lỗi khi thêm nhiệm vụ!");
      }
      setNewTaskTile("");
    } else {
      toast.error("Bạn cần nhập nội dung!");
    }
  };
  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      addTask();
    }
  };
  return (
    <Card className="px-5 flex flex-col sm:flex-row">
      <Input
        value={newTaskTitle}
        onChange={(e) => setNewTaskTile(e.target.value)}
        onKeyPress={handleKeyPress}
        className="h-12 bg-slate-50"
        type="text"
        placeholder="Cần phải làm gì?"
      />
      <Button
        onClick={addTask}
        className="h-12 px-4 shadow-lg bg-gradient-primary transform transition-all duration-200 hover:scale-125 active:scale-95 "
      >
        <Plus className="size-5" />
        Thêm
      </Button>
    </Card>
  );
};

export default AddTask;
