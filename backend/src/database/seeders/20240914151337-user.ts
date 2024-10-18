import { QueryInterface } from "sequelize";

export default {
  up: async (queryInterface: QueryInterface) => {
    await queryInterface.bulkInsert("users", [
      {
        id: 1,
        username: "Admin",
        role: "admin",
        email: "admin@admin.com",
        password: "e10adc3949ba59abbe56e057f20f883e",
      },
      {
        id: 2,
        username: "Example User",
        email: "example@email.com",
        role: "admin",
        password:
          "$2a$12$ZHMkdkgcvSHLRSkMlwLBJuHCSXe8goMFvdtsLmelNoR8t.nubZLN.",

      },
    ]);
  },
  async down(queryInterface: QueryInterface) {
    await queryInterface.bulkDelete("users", {});
  },
};
