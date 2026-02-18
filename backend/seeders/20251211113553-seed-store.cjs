'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */

    await queryInterface.bulkInsert('stores', 
      [
        {
          name: "adidas",
          phone: JSON.stringify(["+201111111411", "+201111111412", "+201111111413"]),
          owner: JSON.stringify([
            { name: "Ahmed", role: "Manager" },
            { name: "Sara", role: "Co-owner" }
          ]),
          address: JSON.stringify(["address1", "address2"]),
          createdAt: new Date(),
          updatedAt: null,
        },

        {
          name: "nike",
          phone: JSON.stringify(["+201111111411", "+201111111412", "+201111111413"]),
          owner: JSON.stringify([
            { name: "Ahmed", role: "Manager" },
            { name: "Sara", role: "Co-owner" }
          ]),
          address: JSON.stringify(["address1", "address2"]),
          createdAt: new Date(),
          updatedAt: null,
        },

        {
          name: "puma",
          phone: JSON.stringify(["+201111111411", "+201111111412", "+201111111413"]),
          owner: JSON.stringify([
            { name: "Ahmed", role: "Manager" },
            { name: "Sara", role: "Co-owner" }
          ]),
          address: JSON.stringify(["address1", "address2"]),
          createdAt: new Date(),
          updatedAt: null,
        },

        {
          name: "bata",
          phone: JSON.stringify(["+201111111411", "+201111111412", "+201111111413"]),
          owner: JSON.stringify([
            { name: "Ahmed", role: "Manager" },
            { name: "Sara", role: "Co-owner" }
          ]),
          address: JSON.stringify(["address1", "address2"]),
          createdAt: new Date(),
          updatedAt: null,
        },

        {
          name: "gucci",
          phone: JSON.stringify(["+201111111411", "+201111111412", "+201111111413"]),
          owner: JSON.stringify([
            { name: "Ahmed", role: "Manager" },
            { name: "Sara", role: "Co-owner" }
          ]),
          address: JSON.stringify(["address1", "address2"]),
          createdAt: new Date(),
          updatedAt: null,
        },
        {
          name: "wakiki",
          phone: JSON.stringify(["+201111111411", "+201111111412", "+201111111413"]),
          owner: JSON.stringify([
            { name: "Ahmed", role: "Manager" },
            { name: "Sara", role: "Co-owner" }
          ]),
          address: JSON.stringify(["address1", "address2"]),
          createdAt: new Date(),
          updatedAt: null,
        },
        {
          name: "zara",
          phone: JSON.stringify(["+201111111411", "+201111111412", "+201111111413"]),
          owner: JSON.stringify([
            { name: "Ahmed", role: "Manager" },
            { name: "Sara", role: "Co-owner" }
          ]),
          address: JSON.stringify(["address1", "address2"]),
          createdAt: new Date(),
          updatedAt: null,
        },
        {
          name: "or",
          phone: JSON.stringify(["+201111111411", "+201111111412", "+201111111413"]),
          owner: JSON.stringify([
            { name: "Ahmed", role: "Manager" },
            { name: "Sara", role: "Co-owner" }
          ]),
          address: JSON.stringify(["address1", "address2"]),
          createdAt: new Date(),
          updatedAt: null,
        },
      ]
    )
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */

    await queryInterface.bulkDelete('stores', null, {});
  }
};
