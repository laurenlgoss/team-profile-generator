const Manager = require("../lib/manager");

describe("Manager", () => {
    describe("Initialization", () => {
        it("should create an object with 'name', 'id', 'email', and 'officeNumber' properties set to the 'name', 'id', 'email', and 'officeNumber' arguments provided when called with the 'new' keyword", () => {
            // Arrange
            const name = "Lauren";
            const id = 1;
            const email = "laurenlgoss98@gmail.com";
            const officeNumber = 2;

            // Act
            const newManager = new Manager(name, id, email, officeNumber);

            // Assert
            expect(newManager.name).toEqual(name);
            expect(newManager.id).toEqual(id);
            expect(newManager.email).toEqual(email);
            expect(newManager.officeNumber).toEqual(officeNumber);
        });
    });
    describe("getRole", () => {
        it("should return the string 'Manager'", () => {
            // Arrange
            const name = "Lauren";
            const id = 1;
            const email = "laurenlgoss98@gmail.com";
            const officeNumber = 2;
            
            // Act
            const newManager = new Manager(name, id, email, officeNumber);

            // Assert
            expect(newManager.getRole()).toEqual("Manager");
        });
    });
});