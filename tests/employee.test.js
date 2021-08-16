const Employee = require("../lib/employee");

describe("Employee", () => {
    describe("Initialization", () => {
        it("should create an object with 'name', 'id', and 'email' properties set to the 'name', 'id', and 'email' arguments provided when called with the 'new' keyword", () => {
            // Arrange
            const name = "Lauren";
            const id = 1;
            const email = "laurenlgoss98@gmail.com";

            // Act
            const newEmployee = new Employee(name, id, email);

            // Assert
            expect(newEmployee.name).toEqual(name);
            expect(newEmployee.id).toEqual(id);
            expect(newEmployee.email).toEqual(email);
        });
    });
    describe("getName", () => {
        it("should return the object's value of 'name'", () => {
            // Arrange
            const name = "Lauren";
            const id = 1;
            const email = "laurenlgoss98@gmail.com";
            
            // Act
            const newEmployee = new Employee(name, id, email);

            // Assert
            expect(newEmployee.getName()).toEqual(name);
        });
    });
    describe("getId", () => {
        it("should return the object's value of 'id'", () => {
            // Arrange
            const name = "Lauren";
            const id = 1;
            const email = "laurenlgoss98@gmail.com";
            
            // Act
            const newEmployee = new Employee(name, id, email);

            // Assert
            expect(newEmployee.getId()).toEqual(id);
        });
    });
    describe("getEmail", () => {
        it("should return the object's value of 'email'", () => {
            // Arrange
            const name = "Lauren";
            const id = 1;
            const email = "laurenlgoss98@gmail.com";
            
            // Act
            const newEmployee = new Employee(name, id, email);

            // Assert
            expect(newEmployee.getEmail()).toEqual(email);
        });
    });
    describe("getRole", () => {
        it("should return the string 'Employee'", () => {
            // Arrange
            const name = "Lauren";
            const id = 1;
            const email = "laurenlgoss98@gmail.com";
            
            // Act
            const newEmployee = new Employee(name, id, email);

            // Assert
            expect(newEmployee.getRole()).toEqual("Employee");
        });
    });
});