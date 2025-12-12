import { Task } from "../model/Task.js";

export const getAllTasks = async (req, res) => {
  // const { filter = "today" } = req.query;
  // const now = new Date();
  // let startDate;

  // switch (filter) {
  //   case "today": {
  //     startDate = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  //     break;
  //   }
  //   case "week": {
  //     const mondayDate =
  //       now.getDate() - (now.getDay() - 1) - (now.getDay() === 0 ? 7 : 0);
  //     startDate = new Date(now.getFullYear(), now.getMonth(), mondayDate);
  //     break;
  //   }
  //   case "month": {
  //     startDate = new Date(now.getFullYear(), now.getMonth(), 1);
  //     break;
  //   }
  //   case "all":
  //   default: {
  //     startDate = null;
  //   }
  // }

  // const query = startDate ? { createdAt: { $gte: startDate } } : {};
  const { filter = "today" } = req.query;
  const now = new Date();
  let startDate;

  switch (filter) {
    case "today": {
      startDate = new Date(now.getFullYear(), now.getMonth(), now.getDate());
      break;
    }
    case "week": {
      const mondayDate =
        now.getDate() - (now.getDay() - 1) - (now.getDay === 0 ? 7 : 0);
      startDate = new Date(now.getFullYear(), now.getMonth(), mondayDate);
      break;
    }
    case "month": {
      startDate = new Date(now.getFullYear(), now.getMonth(), 1);
      break;
    }

    case "all":
    default: {
      startDate = null;
    }
  }

  const query = startDate ? { createdAt: { $gte: startDate } } : {};
  try {
    const result = await Task.aggregate([
      {
        $match: query,
      },
      {
        $facet: {
          tasks: [{ $sort: { createdAt: -1 } }],
          activeCount: [{ $match: { status: "active" } }, { $count: "count" }],
          completedCount: [
            { $match: { status: "completed" } },
            { $count: "count" },
          ],
        },
      },
    ]);
    const tasks = result[0].tasks;
    const activeCount = result[0].activeCount[0]?.count || 0;
    const completedCount = result[0].completedCount[0]?.count || 0;
    res.status(201).json({ tasks, activeCount, completedCount });
  } catch (error) {
    console.error("Lỗi khi truy cập getAllTasks: ", error);
    console.log("Lỗi hệ thống!");
  }
};

export const createTasks = async (req, res) => {
  try {
    const { title } = req.body;
    const task = new Task({ title });
    const newTask = await task.save();
    res.status(201).json(newTask);
  } catch (error) {
    console.error("Lỗi khi truy cập createTasks: ", error);
    console.log("Lỗi hệ thống!");
  }
};

export const updateTasks = async (req, res) => {
  try {
    const { title, status, completedAt } = req.body;
    const updateTasks = await Task.findByIdAndUpdate(
      req.params.id,
      {
        title,
        status,
        completedAt,
      },
      {
        new: true,
      }
    );
    if (!updateTasks) {
      return res.status(404).json({ message: "Task không tồn tại" });
    }
    res.status(202).json(updateTasks);
  } catch (error) {
    console.error("Lỗi khi truy cập updateTasks: ", error);
    console.log("Lỗi hệ thống!");
  }
};

export const deleteTasks = async (req, res) => {
  try {
    const deleteTasks = await Task.findByIdAndDelete(req.params.id);
    if (!deleteTasks) {
      return res.status(404).json({ message: "Task không tồn tại" });
    }
    res.status(202).json(deleteTasks);
  } catch (error) {
    console.error("Lỗi khi truy cập deleteTasks: ", error);
    console.log("Lỗi hệ thống!");
  }
};
