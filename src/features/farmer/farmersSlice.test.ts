import reducer, { fetchFarmer, setPage } from './farmersSlice';
import axios from 'axios';
import { AnyAction } from '@reduxjs/toolkit';

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe('farmersSlice', () => {
  const initialState = { 
    farmers: [], 
    status: 'idle', 
    error: null,
    pagination: {
      page: 1,
      limit: 10,
      total: 0,
      totalPages: 0
    }
  };

  it('should handle initial state', () => {
    expect(reducer(undefined, { type: '' })).toEqual(initialState);
  });

  it('should handle fetchFarmer.pending', () => {
    const action = { type: fetchFarmer.pending.type };
    const state = reducer(initialState, action);
    expect(state.status).toBe('loading');
  });

  it('should handle fetchFarmer.fulfilled', () => {
    const paginatedResult = {
      items: [{ farmerName: 'João', federalIdentification: '123', farms: [] }],
      total: 1,
      page: 1,
      limit: 10,
      totalPages: 1
    };
    const action = { type: fetchFarmer.fulfilled.type, payload: paginatedResult };
    const state = reducer(initialState, action);
    expect(state.status).toBe('succeeded');
    expect(state.farmers).toEqual(paginatedResult.items);
    expect(state.pagination).toEqual({
      page: paginatedResult.page,
      limit: paginatedResult.limit,
      total: paginatedResult.total,
      totalPages: paginatedResult.totalPages
    });
  });

  it('should handle fetchFarmer.rejected', () => {
    const action = { type: fetchFarmer.rejected.type, error: { message: 'Erro' } } as AnyAction;
    const state = reducer(initialState, action);
    expect(state.status).toBe('failed');
    expect(state.error).toBe('Erro');
  });

  it('fetchFarmer thunk dispatches fulfilled on success', async () => {
    const paginatedResult = {
      items: [{ farmerName: 'Maria', federalIdentification: '456', farms: [] }],
      total: 1,
      page: 1,
      limit: 10,
      totalPages: 1
    };
    mockedAxios.get.mockResolvedValueOnce({ data: paginatedResult });
    const dispatch = jest.fn();
    const thunk = fetchFarmer({ page: 1, limit: 10 });
    await thunk(dispatch, () => ({}), undefined);
    expect(mockedAxios.get).toHaveBeenCalledWith('http://localhost:3000/api/farmers?page=1&limit=10');
    expect(dispatch).toHaveBeenCalledWith(expect.objectContaining({ type: fetchFarmer.pending.type }));
    expect(dispatch).toHaveBeenCalledWith(expect.objectContaining({ 
      type: fetchFarmer.fulfilled.type,
      payload: paginatedResult
    }));
  });

  it('fetchFarmer thunk dispatches rejected on error', async () => {
    mockedAxios.get.mockRejectedValueOnce(new Error('fail'));
    const dispatch = jest.fn();
    const thunk = fetchFarmer({ page: 1, limit: 10 });
    await thunk(dispatch, () => ({}), undefined);
    expect(mockedAxios.get).toHaveBeenCalledWith('http://localhost:3000/api/farmers?page=1&limit=10');
    expect(dispatch).toHaveBeenCalledWith(expect.objectContaining({ type: fetchFarmer.pending.type }));
    expect(dispatch).toHaveBeenCalledWith(expect.objectContaining({ type: fetchFarmer.rejected.type }));
  });

  it('should handle setPage action', () => {
    const action = setPage(2);
    const state = reducer(initialState, action);
    expect(state.pagination.page).toBe(2);
  });
});
