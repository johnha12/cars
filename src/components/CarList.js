import { useSelector, useDispatch } from "react-redux";
import { createSelector } from "@reduxjs/toolkit";
import { removeCar } from "../store";
 
const memoizedCars = createSelector(
  [(state) => state.cars.data, (state) => state.cars.searchTerm],
  (data, searchTerm) =>
    data.filter((car) =>
      car.name.toLowerCase().includes(searchTerm.toLowerCase())
    )
);

// const cars = useSelector(memoizedCars);
// const name = useSelector((state) => state.form.name); 
 

function CarList() {
  const dispatch = useDispatch();
  // const {cars, name} = useSelector(({ form, cars: { data, searchTerm } }) => {
  //   const filteredCars = data.filter((car) =>
  //     car.name.toLowerCase().includes(searchTerm.toLowerCase())
  //   );
  //   return {
  //     cars: filteredCars,
  //     name: form.name
  //   }
  // });

  const cars = useSelector(memoizedCars);
  const name = useSelector((state) => state.form.name);

  const handleCarDelete = (car) =>{
    dispatch(removeCar(car.id));
  };

  const renderedCars = cars.map((car)=>{
    // add logic to see if should be bold
    const bold = name && car.name.toLowerCase().includes(name.toLowerCase())
    return (
      <div key={car.id} className={`panel ${bold && 'bold'}`}>
        <p>
          {car.name} - ${car.cost}
        </p>
        <button className="button is-danger" onClick={() => handleCarDelete(car)}>
          Delete
        </button>
      </div>
    )
  });

  return (
    <div className="car-list">
      {renderedCars}
      <hr />
    </div>)
}



export default CarList;