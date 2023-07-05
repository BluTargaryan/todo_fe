




const updatedTask = {
    userId:1,
    priority:"High",
    title: "title",
    imageUrl: "url",
    expectedDateTime:"date",
    isCompleted:true
  };
  
let taskId = 1

  const editTask = (taskId, updatedTask) => {
    fetch(`http://localhost:8080/task/${taskId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedTask),
    })
      .catch((error) => {
        // Handle errors if any
        console.error("Error editing task:", error);
      });
  };







describe("editTask", () => {
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
      const updatedTask = {
        userId: 1,
        priority: "High",
        title: "title",
        imageUrl: "url",
        expectedDateTime: "date",
        isCompleted: true,
      };
  
      const taskId = 1;
  
      await editTask(taskId, updatedTask);
  
      expect(fetchMock).toHaveBeenCalledWith(
        `http://localhost:8080/task/${taskId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updatedTask),
        }
      );
    });
  
    it("should handle task editing error", async () => {
      const updatedTask = {
        userId: 1,
        priority: "High",
        title: "title",
        imageUrl: "url",
        expectedDateTime: "date",
        isCompleted: true,
      };
  
      const taskId = 1;
  
      await editTask(taskId, updatedTask);
  
      expect(consoleErrorMock).toHaveBeenCalledWith(
        "Error editing task:",
        expect.any(Error)
      );
    });
  });
  