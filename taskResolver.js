let tasks = [
  {
    id: '1',
    title: 'Front-end React',
    description: 'UI development',
    completed: false,
    duration: 5
  },
  {
    id: '2',
    title: 'Backend API',
    description: 'Node.js API',
    completed: false,
    duration: 3
  }
];

const taskResolver = {
  Query: {
    task: (_, { id }) => tasks.find(t => t.id === id),
    tasks: () => tasks
  },

  Mutation: {
    addTask: (_, { title, description, completed, duration }) => {
      const task = {
        id: String(tasks.length + 1),
        title,
        description,
        completed,
        duration
      };
      tasks.push(task);
      return task;
    },

    completeTask: (_, { id }) => {
      const task = tasks.find(t => t.id === id);
      if (!task) return null;
      task.completed = true;
      return task;
    },

    changeDescription: (_, { id, description }) => {
      const task = tasks.find(t => t.id === id);
      if (!task) return null;
      task.description = description;
      return task;
    },

    deleteTask: (_, { id }) => {
      const index = tasks.findIndex(t => t.id === id);
      if (index === -1) return null;
      const removed = tasks.splice(index, 1);
      return removed[0];
    }
  }
};

module.exports = taskResolver;