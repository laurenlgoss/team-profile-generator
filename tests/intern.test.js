const Intern = require("../lib/intern");

describe("Intern", () => {
    describe("Initialization", () => {
        it("should create an object with 'name', 'id', 'email', and 'school' properties set to the 'name', 'id', 'email', and 'school' arguments provided when called with the 'new' keyword", () => {
            // Arrange
            const name = "Lauren";
            const id = 1;
            const email = "laurenlgoss98@gmail.com";
            const school = "UNC";

            // Act
            const newIntern = new Intern(name, id, email, school);

            // Assert
            expect(newIntern.name).toEqual(name);
            expect(newIntern.id).toEqual(id);
            expect(newIntern.email).toEqual(email);
            expect(newIntern.school).toEqual(school);
        });
    });
    describe("getSchool", () => {
        it("should return the object's value of 'school'", () => {
            // Arrange
            const name = "Lauren";
            const id = 1;
            const email = "laurenlgoss98@gmail.com";
            const school = "UNC";

            // Act
            const newIntern = new Intern(name, id, email, school);

            // Assert
            expect(newIntern.getSchool()).toEqual(school);
        });
    });
    describe("getRole", () => {
        it("should return the string 'Intern'", () => {
            // Arrange
            const name = "Lauren";
            const id = 1;
            const email = "laurenlgoss98@gmail.com";
            const school = "UNC";
            
            // Act
            const newIntern = new Intern(name, id, email, school);

            // Assert
            expect(newIntern.getRole()).toEqual("Intern");
        });
    });
});