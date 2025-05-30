import axios from 'axios';
import { Farmer } from '../../types/farmer';

export const createFarmer = (farmer: Farmer) => async (dispatch: any) => {
    try {
        const response = await axios.post('http://localhost:3000/api/farmers', farmer);
        dispatch({ type: 'farmers/createFarmerSuccess', payload: response.data });
    } catch (error) {
        dispatch({ type: 'farmers/createFarmerError', payload: error });
    }
};

// Action thunk para atualizar um farmer
export const updateFarmer = (farmer: Farmer) => async (dispatch: any) => {
    try {
        const response = await axios.put(
            `http://localhost:3000/api/farmers/${farmer.id}`,
            farmer
        );
        dispatch({ type: 'farmers/updateFarmerSuccess', payload: response.data });
    } catch (error) {
        dispatch({ type: 'farmers/updateFarmerError', payload: error });
    }
};

export const deleteFarmer = (farmerId: number | undefined) => async (dispatch: any) => {
    try {
        await axios.delete(`http://localhost:3000/api/farmers/${farmerId}`);
        dispatch({ type: 'farmers/deleteFarmerSuccess', payload: farmerId });
    } catch (error) {
        console.error('Erro ao deletar fazendeiro:', error);
        alert('Erro ao deletar fazendeiro.');
        dispatch({ type: 'farmers/deleteFarmerError', payload: error });
    }
}
