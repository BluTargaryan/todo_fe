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