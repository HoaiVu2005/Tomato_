import React from "react";
import { Card } from "./ui/card";
import { Circle } from "lucide-react";

const EmptyTask = ({ filter }) => {
  return (
    <Card className="flex flex-col justify-center items-center shadow-2xl">
      <Circle className="size-13 text-slate-500" />
      {filter === "all" ? (
        <p className="font-medium text-[18px]">Chưa có nhiệm vụ</p>
      ) : filter === "active" ? (
        <p className="font-medium text-[18px]">
          {" "}
          Không có nhiệm vụ nào đang làm.
        </p>
      ) : (
        <p className="font-medium text-[18px]">
          Không có nhiệm vụ nào hoàn thành.
        </p>
      )}

      {filter === "all" ? (
        <p className="text-sm text-slate-500">
          Thêm nhiệm vụ đầu tiên để bắt đầu!
        </p>
      ) : filter === "active" ? (
        <p className="text-sm text-slate-500">
          Chuyển sang tất cả để thấy nhiệm vụ đã hoàn thành.
        </p>
      ) : (
        <p className="text-sm text-slate-500">
          Chuyển sang tất cả để thấy nhiệm vụ đang làm.
        </p>
      )}
    </Card>
  );
};

export default EmptyTask;
