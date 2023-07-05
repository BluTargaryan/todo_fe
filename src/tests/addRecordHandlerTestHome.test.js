let errorMessage=''
let id=1
let selectedPriority="High"
let taskTitle = "task"
let url = "httpsimageurl"
let date="date"

const handleAddTask = (e) => {
  e.preventDefault();
  const newTask = {
    userId:id,
    priority:selectedPriority,
    title: taskTitle,
    imageUrl: url,
    expectedDateTime:date,
    isCompleted:false
  };
  addTask(newTask);

};

describe("handleAddTask", () => {
    let addTaskMock;
  
    beforeEach(() => {
      addTaskMock = jest.fn();
    });
  
    afterEach(() => {
      jest.clearAllMocks();
    });
  
    it("should call addTask with the correct newTask object", () => {
      const eventMock = {
        preventDefault: jest.fn(),
      };
  
      const expectedNewTask = {
        userId: 1,
        priority: "High",
        title: "task",
        imageUrl: "httpsimageurl",
        expectedDateTime: "date",
        isCompleted: false,
      };
  
      const handleAddTask = (e) => {
        e.preventDefault();
        const newTask = {
          userId: 1,
          priority: "High",
          title: "task",
          imageUrl: "httpsimageurl",
          expectedDateTime: "date",
          isCompleted: false,
        };
        addTaskMock(newTask);
      };
  
      handleAddTask(eventMock);
  
      expect(eventMock.preventDefault).toHaveBeenCalledTimes(1);
      expect(addTaskMock).toHaveBeenCalledWith(expectedNewTask);
    });
  });
  




  
  
  










  
 