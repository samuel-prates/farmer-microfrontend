import reducer, { fetchFarmer } from './farmersSlice';
import axios from 'axios';
import { AnyAction } from '@reduxjs/toolkit';

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe('farmersSlice', () => {
  const initialState = { farmers: [], status: 'idle', error: null };

  it('should handle initial state', () => {
    expect(reducer(undefined, { type: '' })).toEqual(initialState);
  });

  it('should handle fetchFarmer.pending', () => {
    const action = { type: fetchFarmer.pending.type };
    const state = reducer(initialState, action);
    expect(state.status).toBe('loading');
  });

  it('should handle fetchFarmer.fulfilled', () => {
    const farmers = [{ farmerName: 'João', federalIdentification: '123', farms: [] }];
    const action = { type: fetchFarmer.fulfilled.type, payload: farmers };
    const state = reducer(initialState, action);
    expect(state.status).toBe('succeeded');
    expect(state.farmers).toEqual(farmers);
  });

  it('should handle fetchFarmer.rejected', () => {
    const action = { type: fetchFarmer.rejected.type, error: { message: 'Erro' } } as AnyAction;
    const state = reducer(initialState, action);
    expect(state.status).toBe('failed');
    expect(state.error).toBe('Erro');
  });

  it('fetchFarmer thunk dispatches fulfilled on success', async () => {
    mockedAxios.get.mockResolvedValueOnce({ data: [{ farmerName: 'Maria', federalIdentification: '456', farms: [] }] });
    const dispatch = jest.fn();
    const thunk = fetchFarmer();
    await thunk(dispatch, () => ({}), undefined);
    expect(dispatch).toHaveBeenCalledWith(expect.objectContaining({ type: fetchFarmer.pending.type }));
    expect(dispatch).toHaveBeenCalledWith(expect.objectContaining({ type: fetchFarmer.fulfilled.type }));
  });

  it('fetchFarmer thunk dispatches rejected on error', async () => {
    mockedAxios.get.mockRejectedValueOnce(new Error('fail'));
    const dispatch = jest.fn();
    const thunk = fetchFarmer();
    await thunk(dispatch, () => ({}), undefined);
    expect(dispatch).toHaveBeenCalledWith(expect.objectContaining({ type: fetchFarmer.pending.type }));
    expect(dispatch).toHaveBeenCalledWith(expect.objectContaining({ type: fetchFarmer.rejected.type }));
  });
});