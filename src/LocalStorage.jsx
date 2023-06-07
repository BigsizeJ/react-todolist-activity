export const useStorage = () => {
  const storage = localStorage;

  const INIT = () => {
    try {
      const tasks = storage.getItem("tasks");

      if (tasks === null) storage.setItem("tasks", JSON.stringify([]));
    } catch (err) {
      throw new Error(err);
    }
  };

  const GET = () => JSON.parse(storage.getItem("tasks"));

  const POST = (obj) => {
    const tasks = GET();

    storage.setItem("tasks", JSON.stringify([...tasks, obj]));
  };

  const UPDATE = (obj) => {
    const tasks = GET();

    const newTasks = tasks.map((task) => {
      if (task.id === obj.id) return { ...task, name: obj.name };
      return task;
    });

    storage.setItem("tasks", JSON.stringify(newTasks));
  };

  const DELETE = (id) => {
    const tasks = GET();
    const newTasks = tasks.filter((task) => task.id !== id);
    storage.setItem("tasks", JSON.stringify(newTasks));
  };

  return { INIT, GET, POST, UPDATE, DELETE };
};
