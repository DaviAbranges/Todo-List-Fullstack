import { QueryInterface } from "sequelize";
import { username } from "../config/database";

export default {
  up: async (queryInterface: QueryInterface) => {
    await queryInterface.bulkInsert("users", [
      {
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
        password: "c33367701511b4f6020ec61ded352059",
      },
    ]);
  },
  async down(queryInterface: QueryInterface) {
    await queryInterface.bulkDelete("users", {});
  },
};
