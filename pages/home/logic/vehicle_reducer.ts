
interface VehicleValue {
  vehicle: string;
}

const initialState: VehicleValue = {
  vehicle: '',
};

const reducerVehicle = (state = initialState, action) => {
  switch (action.type) {
    case 'Bike':
      return {
        ...state,
        vehicle: action.type,
      };
    case 'Car':
      return {
        ...state,
        vehicle: action.type,
      };
    default:
      return state;
  }
};

export default reducerVehicle;
