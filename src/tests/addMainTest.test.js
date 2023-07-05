const newTask = {
    userId:1,
    priority:"High",
    title: "title",
    imageUrl: "url",
    expectedDateTime:"date",
    isCompleted:true
  };
  
  
  const addTask = (newTask) => {
    fetch("http://localhost:8080/task/add", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newTask),
    })
      .catch((error) => {
        // Handle errors if any
        console.error("Error adding task:", error);
      });
  };

  

  describe("addTask", () => {
    let fetchMock;
    let consoleErrorMock;
  
    beforeEach(() => {
      consoleErrorMock = jest.spyOn(console, "error").mockImplementation();
      fetchMock = jest.fn().mockRejectedValue(new Error("Network Error"));
  
      global.fetch = fetchMock;
    });
  
    afterEach(() => {
      consoleErrorMock.mockRestore();
      jest.clearAllMocks();
    });
  
    it("should call fetch with the correct URL and request options", async () => {
      const newTask = {
        userId: 1,
        priority: "High",
        title: "task",
        imageUrl: "httpsimageurl",
        expectedDateTime: "date",
        isCompleted: false,
      };
  
      await addTask(newTask);
  
      expect(fetchMock).toHaveBeenCalledWith("http://localhost:8080/task/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newTask),
      });
    });
  
    it("should handle task addition error", async () => {
      const newTask = {
        userId: 1,
        priority: "High",
        title: "task",
        imageUrl: "httpsimageurl",
        expectedDateTime: "date",
        isCompleted: false,
      };
  
      await addTask(newTask);
  
      expect(consoleErrorMock).toHaveBeenCalledWith(
        "Error adding task:",
        expect.any(Error)
      );
    });
  });
  