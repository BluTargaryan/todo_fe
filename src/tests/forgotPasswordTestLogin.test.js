const users = [
    { email: "user1@example.com", name: "User1", password: "password1" },
    { email: "user2@example.com", name: "User2", password: "password2" },
  ];

  let uEmail = ''
let uMessage = ''

const detailSubmit = (e, email) => {
    e.preventDefault();
  
    const userFound = users.find(user => user.email === email);
    if(userFound){
        uEmail=email
        uMessage="Your name is " + userFound.name + " and your password is " + userFound.password
    }

  };






  describe("detailSubmit", () => {
    beforeEach(() => {
      uEmail = '';
      uMessage = '';
    });
  
    it("should set uEmail and uMessage when user is found", () => {
      // Arrange
      const eventMock = { preventDefault: jest.fn() };
      const email = "user1@example.com";
  
      // Act
      detailSubmit(eventMock, email);
  
      // Assert
      expect(eventMock.preventDefault).toHaveBeenCalled();
      expect(uEmail).toBe(email);
      expect(uMessage).toBe("Your name is User1 and your password is password1");
    });
  
    it("should not set uEmail and uMessage when user is not found", () => {
      // Arrange
      const eventMock = { preventDefault: jest.fn() };
      const email = "nonexistent@example.com";
  
      // Act
      detailSubmit(eventMock, email);
  
      // Assert
      expect(eventMock.preventDefault).toHaveBeenCalled();
      expect(uEmail).toBe('');
      expect(uMessage).toBe('');
    });
  });
 