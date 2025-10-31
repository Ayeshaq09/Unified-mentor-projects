const { createContext, useState } = require("react");

// ProductContext
const FloorContext = createContext();

export default FloorContext;

// ProductProvider
export const FloorProvider = (props) => {
  const host = process.env.REACT_APP_API_HOST;

  const [floors, setFloors] = useState([]);

  const fetchFloors = async () => {
    const url = `${host}/floor/fetchfloors`;

    try {
      const response = await fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "auth-token": localStorage.getItem("authToken"),
        },
      });

      const json = await response.json();
      if (json.success) {
        setFloors(json.floors);
        return true;
      } else {
        console.log(json.error);
        return false;
      }
    } catch (error) {
      console.log(error.message);
      return false;
    }
  };

  const addFloor = async (floor) => {
    const url = `${host}/floor/addfloor`;

    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "auth-token": localStorage.getItem("authToken"),
        },
        body: JSON.stringify({
          floorName: floor
        }),
      });

      const json = await response.json();
      if (json.success) {
        setFloors(floors.concat(json.floor));
        return true;
      } else {
        console.log(json.error);
        return false;
      }
    } catch (error) {
      console.log(error.message);
      return false;
    }
  };

  const deleteFloor = async (id) => {
    const url = `${host}/floor/deletefloor/${id}`;

    try {
      const response = await fetch(url, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          "auth-token": localStorage.getItem("authToken"),
        },
      });

      const json = await response.json();
      if (json.success) {
        setFloors(floors.filter((item) => item.id !== id));
        return true;
      } else {
        console.log(json.error);
        return false;
      }
    } catch (error) {
      console.log(error.message);
      return false;
    }
  };

  const updateFloor = async (floorItem) => {
    const { id, floor } = floorItem;
    const url = `${host}/floor/updatefloor/${id}`;

    try {
      const response = await fetch(url, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "auth-token": localStorage.getItem("authToken"),
        },
        body: JSON.stringify({
          floor
        }),
      });

      const json = await response.json();
      if (json.success) {
        const newFloors = JSON.parse(JSON.stringify(floors));
        for (let i = 0; i < floors.length; i++) {
          if (floors[i].id === id) {
            newFloors[i].floor = floor;
            break;
          }
        }
        setFloors(newFloors);
        return true;
      } else {
        console.log(json.error);
        return false;
      }
    } catch (error) {
      console.log(error.message);
      return false;
    }
  };

  return (
    <FloorContext.Provider
      value={{
        floors,
        fetchFloors,
        addFloor,
        updateFloor,
        deleteFloor,
      }}
    >
      {props.children}
    </FloorContext.Provider>
  );
};
