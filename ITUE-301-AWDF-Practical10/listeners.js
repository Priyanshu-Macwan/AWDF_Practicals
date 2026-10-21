const taskEvents = require("./events");
const User = require("./models/User");

const NOTIFICATION_DELAY_MS = 2000;

taskEvents.on("task-created", async (task) => {
  console.log(
    `[${new Date().toISOString()}] [Listener] task-created handler started: ` +
    JSON.stringify({ title: task.title, emittedAt: task.emittedAt })
  );

  try {
    // Keep the listener pending to make it clear the API does not await it.
    await new Promise((resolve) => setTimeout(resolve, NOTIFICATION_DELAY_MS));
    const assignedUser = await User.findById(task.assignedUserId).select("email").lean();
    const assignedTo = assignedUser?.email || String(task.assignedUserId);

    console.log(
      `[${new Date().toISOString()}] [Notification] Background notification logged: ` +
      JSON.stringify({
        title: task.title,
        taskTimestamp: new Date(task.createdAt).toISOString(),
        assignedUser: assignedTo
      })
    );
  } catch (error) {
    taskEvents.emit("error", error);
  }
});

taskEvents.on("task-deleted", (task) => {
  console.log(
    `[${new Date().toISOString()}] [Notification] Task "${task.title}" deleted.`
  );
});

taskEvents.on("error", (error) => {
  console.error(`[${new Date().toISOString()}] [Event Error]`, error.message);
});

console.log(`[${new Date().toISOString()}] [Listener] Task event listeners registered.`);
