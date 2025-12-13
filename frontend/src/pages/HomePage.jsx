import AddTask from "@/components/AddTask";
import DateTimeFilterTask from "@/components/DateTimeFilterTask";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import StatsAndFilter from "@/components/StatsAndFilter";
import TaskList from "@/components/TaskList";
import TaskPagination from "@/components/TaskPagination";
import api from "@/lib/axios";
import { visibleTaskLimit } from "@/lib/FilterType";
import React, { useEffect, useState } from "react";
import { toast } from "sonner";

const HomePage = () => {
  const [filter, setFilter] = useState("all");
  const [taskBuffer, setTaskBuffer] = useState([]);
  const [activeCount, setActiveCount] = useState(0);
  const [completedCount, setCompletedCount] = useState(0);
  const [dateQuery, setDateQuery] = useState("today");
  const [page, setPage] = useState(1);
  const fetchTasks = async () => {
    try {
      const res = await api.get(`/tasks?filter=${dateQuery}`);
      setTaskBuffer(res.data.tasks);
      setActiveCount(res.data.activeCount);
      setCompletedCount(res.data.completedCount);
    } catch (error) {
      console.error("Lỗi khi truy xuất Tasks: ", error);
      toast.error("Lỗi khi truy xuất Tasks");
    }
  };
  const handleReLoad = () => {
    fetchTasks();
  };

  useEffect(() => {
    const loadTasks = async () => {
      await fetchTasks();
    };

    loadTasks();
  }, [dateQuery]);

  const FilteredTask = taskBuffer.filter((task) => {
    switch (filter) {
      case "active":
        return task.status === "active";
      case "completed":
        return task.status === "completed";
      case "all":
        return true;
    }
  });

  const visibleTask = FilteredTask.slice(
    (page - 1) * visibleTaskLimit,
    page * visibleTaskLimit
  );

  const totalPages = Math.ceil(FilteredTask.length / visibleTaskLimit);
  const handleNext = () => {
    if (page < totalPages) {
      setPage((prev) => prev + 1);
    }
  };
  const handlePrev = () => {
    if (page > 1) {
      setPage((prev) => prev - 1);
    }
  };
  const handlePageChange = (newPage) => {
    setPage(newPage);
  };
  if (visibleTask.length === 0) {
    handlePrev();
  }
  return (
    <div className="min-h-screen w-full bg-white relative">
      {/* Dual Gradient Overlay Background */}
      <div
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: `
        linear-gradient(to right, rgba(229,231,235,0.8) 1px, transparent 1px),
        linear-gradient(to bottom, rgba(229,231,235,0.8) 1px, transparent 1px),
        radial-gradient(circle 500px at 20% 80%, rgba(255, 140, 60, 0.5), transparent),
        radial-gradient(circle 500px at 80% 20%, rgba(255, 140, 60, 0.5), transparent)
      `,
          backgroundSize: "48px 48px, 48px 48px, 100% 100%, 100% 100%",
        }}
      />
      <div className=" container pt-1 mx-auto relative z-10 ">
        <div className="w-full max-w-2xl p-6 mx-auto space-y-3">
          <Header />
          <AddTask handleReLoad={handleReLoad} />
          <StatsAndFilter
            filter={filter}
            setFilter={setFilter}
            ActiveCount={activeCount}
            CompletedCount={completedCount}
          />
          <TaskList
            filter={filter}
            setFilter={setFilter}
            taskBuffer={visibleTask}
            ActiveCount={activeCount}
            CompletedCount={completedCount}
            handleReLoad={handleReLoad}
          />

          <div className="flex items-center space-y-5 justify-between sm:flex-row flex-col">
            <TaskPagination
              handleNext={handleNext}
              handlePrev={handlePrev}
              handlePageChange={handlePageChange}
              totalPages={totalPages}
              page={page}
            />
            <DateTimeFilterTask
              className="mt-10 sm:mt-0"
              dateQuery={dateQuery}
              setDateQuery={setDateQuery}
            />
          </div>

          <Footer ActiveCount={activeCount} CompletedCount={completedCount} />
        </div>
      </div>
    </div>
  );
};

export default HomePage;
