export async function PutFetch(id, requestData) {
  try {
    const response = await fetch(`http://localhost:3001/notes/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(requestData),
    });
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
  } catch (error) {
    console.error("Error fetching data:", error);
  }
}

export async function GetFetch(URL) {
  try {
    const response = await fetch(URL, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const fetchedData = await response.json();
    return fetchedData;
  } catch (error) {
    console.error("Error fetching data:", error);
  }
}

export async function PostFetch(note) {
  try {
    const response = await fetch("http://localhost:3001/notes", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(note),
    });
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
  } catch (error) {
    console.error("Error fetching data:", error);
  }
}

export async function DeleteFetch(id) {
  try {
    const response = await fetch(`http://localhost:3001/notes/${id}`, {
      method: "DELETE",
    });
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
  } catch (error) {
    console.error("Error fetching data:", error);
  }
}
