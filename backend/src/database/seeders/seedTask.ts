import { QueryInterface } from "sequelize";

export default {
  up: async (queryInterface: QueryInterface) => {
    await queryInterface.bulkInsert("tasks", [
      {
        name: "Sample Task 1",
        status: "pending",
        user_id: 1,
        createdAt: new Date(),
      },
      {
        name: "Sample Task 2",
        status: "completed",
        user_id: 2,
        createdAt: new Date(),
      },
    ]);
  },
  async down(queryInterface: QueryInterface) {
    await queryInterface.bulkDelete("tasks", {});
  },
};
