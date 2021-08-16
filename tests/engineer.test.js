const Engineer = require("../lib/engineer");

describe("Engineer", () => {
    describe("Initialization", () => {
        it("should create an object with 'name', 'id', 'email', and 'github' properties set to the 'name', 'id', 'email', and 'github' arguments provided when called with the 'new' keyword", () => {
            // Arrange
            const name = "Lauren";
            const id = 1;
            const email = "laurenlgoss98@gmail.com";
            const github = "laurenlgoss";

            // Act
            const newEngineer = new Engineer(name, id, email, github);

            // Assert
            expect(newEngineer.name).toEqual(name);
            expect(newEngineer.id).toEqual(id);
            expect(newEngineer.email).toEqual(email);
            expect(newEngineer.github).toEqual(github);
        });
    });
    describe("getGithub", () => {
        it("should return the object's value of 'github'", () => {
            // Arrange
            const name = "Lauren";
            const id = 1;
            const email = "laurenlgoss98@gmail.com";
            const github = "laurenlgoss";

            // Act
            const newEngineer = new Engineer(name, id, email, github);

            // Assert
            expect(newEngineer.getGithub()).toEqual(github);
        });
    });
    describe("getRole", () => {
        it("should return the string 'Engineer'", () => {
            // Arrange
            const name = "Lauren";
            const id = 1;
            const email = "laurenlgoss98@gmail.com";
            const github = "laurenlgoss";
            
            // Act
            const newEngineer = new Engineer(name, id, email, github);

            // Assert
            expect(newEngineer.getRole()).toEqual("Engineer");
        });
    });
});