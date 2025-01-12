async function postData(url = '', data = {}) {
    
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: localStorage.getItem("token"),
      },
      body: JSON.stringify(data),
    });
    return response.json(); 
}

export const updateXp = async() => {
    
    const email = localStorage.getItem('email')
    postData(import.meta.env.VITE_BACKEND_URL + "updateXp", { email })
      .then((data) => {
        console.log(data); 
        return data;
      })
      .catch((error) => {
        console.error("Error:", error);
        return null
      });
}


