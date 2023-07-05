let name = '';
let email = '';
let password = '';
let passwordCheck = '';
let alertMessage1 = '';
let alertMessage2 = '';
let alertMessage3 = '';
let alertMessage4 = '';
let alertMessage5 = '';
let consentCheck = false;

const handleClick = (e) => {
  e.preventDefault();

  if (!name || !email || !password) {
    alertMessage1 = "Please fill in all the required fields";
    return;
  }

  // Email format validation using a regular expression
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    alertMessage2 = "Please enter a valid email address";
    return;
  }

  if (password !== passwordCheck) {
    alertMessage3 = "Make sure your password is the same as your second password";
    return;
  }

  if (consentCheck !== true) {
    alertMessage4 = "Please check the consent checkbox if you agree to our terms and want to create an account";
    return;
  }

  const user = { email, name, password };

  fetch("http://localhost:8082/user/add", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(user),
  });

};



describe("handleClick", () => {
    let originalFetch;
    let mockFetch;
  
    beforeEach(() => {
      originalFetch = global.fetch;
      mockFetch = jest.fn();
      global.fetch = mockFetch;
    });
  
    afterEach(() => {
      global.fetch = originalFetch;
    });
  
    test("should set alertMessage1 if required fields are not filled", () => {
      const event = { preventDefault: jest.fn() };
      name = '';
      email = '';
      password = '';
      handleClick(event);
  
      expect(alertMessage1).toBe("Please fill in all the required fields");
      expect(event.preventDefault).toHaveBeenCalled();
      expect(mockFetch).not.toHaveBeenCalled();
    });
  
    test("should set alertMessage2 if an invalid email address is entered", () => {
      const event = { preventDefault: jest.fn() };
      name = 'John Doe';
      email = 'invalidemail';
      password = 'password';
      handleClick(event);
  
      expect(alertMessage2).toBe("Please enter a valid email address");
      expect(event.preventDefault).toHaveBeenCalled();
      expect(mockFetch).not.toHaveBeenCalled();
    });
  
    test("should set alertMessage3 if passwords do not match", () => {
      const event = { preventDefault: jest.fn() };
      name = 'John Doe';
      email = 'johndoe@example.com';
      password = 'password1';
      passwordCheck = 'password2';
      handleClick(event);
  
      expect(alertMessage3).toBe("Make sure your password is the same as your second password");
      expect(event.preventDefault).toHaveBeenCalled();
      expect(mockFetch).not.toHaveBeenCalled();
    });
  
    test("should set alertMessage4 if consent checkbox is not checked", () => {
      const event = { preventDefault: jest.fn() };
      name = 'John Doe';
      email = 'johndoe@example.com';
      password = 'password';
      passwordCheck = 'password';
      consentCheck = false;
      handleClick(event);
  
      expect(alertMessage4).toBe("Please check the consent checkbox if you agree to our terms and want to create an account");
      expect(event.preventDefault).toHaveBeenCalled();
      expect(mockFetch).not.toHaveBeenCalled();
    });
  
    test("should send a POST request with user data", () => {
      const event = { preventDefault: jest.fn() };
      name = 'John Doe';
      email = 'johndoe@example.com';
      password = 'password';
      passwordCheck = 'password';
      consentCheck = true;
      const user = { email, name, password };
  
      handleClick(event);
  
      expect(mockFetch).toHaveBeenCalledWith("http://localhost:8082/user/add", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(user),
      });
      expect(event.preventDefault).toHaveBeenCalled();
    });
  });
  


  
  