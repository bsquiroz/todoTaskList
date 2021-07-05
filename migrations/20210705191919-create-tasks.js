"use strict";
module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.createTable("tasks", {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER,
            },
            title: {
                type: Sequelize.STRING,
                allowNull: false,
            },
            description: {
                allowNull: false,
                type: Sequelize.TEXT,
            },
            due_date: {
                allowNull: false,
                type: Sequelize.DATE,
            },
            completed: {
                type: Sequelize.BOOLEAN,
                defaultvalue: false,
            },
            user_id: {
                type: Sequelize.INTEGER,
                references: {
                    model: "users",
                    key: "id",
                },
            },
            category_id: {
                type: Sequelize.INTEGER,
                references: {
                    model: "categories",
                    key: "id",
                },
            },
            atatus_id: {
                type: Sequelize.INTEGER,
                references: {
                    model: "statuses",
                    key: "id",
                },
            },
            updatedAt: {
                allowNull: false,
                type: Sequelize.DATE,
            },
        });
    },
    down: async (queryInterface, Sequelize) => {
        await queryInterface.dropTable("tasks");
    },
};
