import axios from 'axios';
import { createFarmer, updateFarmer, deleteFarmer } from './farmerActions';

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe('farmerActions', () => {
  const dispatch = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('createFarmer dispatches success on success', async () => {
    mockedAxios.post.mockResolvedValueOnce({ data: { id: 1, farmerName: 'Test' } });
    await createFarmer({ farmerName: 'Test', federalIdentification: '123', farms: [] } as any)(dispatch);
    expect(dispatch).toHaveBeenCalledWith({
      type: 'farmers/createFarmerSuccess',
      payload: { id: 1, farmerName: 'Test' },
    });
  });

  it('createFarmer dispatches error on failure', async () => {
    mockedAxios.post.mockRejectedValueOnce(new Error('fail'));
    await createFarmer({ farmerName: 'Test', federalIdentification: '123', farms: [] } as any)(dispatch);
    expect(dispatch).toHaveBeenCalledWith({
      type: 'farmers/createFarmerError',
      payload: expect.any(Error),
    });
  });

  it('updateFarmer dispatches success on success', async () => {
    mockedAxios.put.mockResolvedValueOnce({ data: { id: 1, farmerName: 'Updated' } });
    await updateFarmer({ id: 1, farmerName: 'Updated', federalIdentification: '123', farms: [] } as any)(dispatch);
    expect(dispatch).toHaveBeenCalledWith({
      type: 'farmers/updateFarmerSuccess',
      payload: { id: 1, farmerName: 'Updated' },
    });
  });

  it('updateFarmer dispatches error on failure', async () => {
    mockedAxios.put.mockRejectedValueOnce(new Error('fail'));
    await updateFarmer({ id: 1, farmerName: 'Updated', federalIdentification: '123', farms: [] } as any)(dispatch);
    expect(dispatch).toHaveBeenCalledWith({
      type: 'farmers/updateFarmerError',
      payload: expect.any(Error),
    });
  });

  it('deleteFarmer dispatches success action on success', async () => {
    mockedAxios.delete.mockResolvedValueOnce({});
    await deleteFarmer(1)(dispatch);
    expect(dispatch).toHaveBeenCalledWith({ 
      type: 'farmers/deleteFarmerSuccess',
      payload: 1
    });
  });

  it('deleteFarmer alerts and dispatches error action on failure', async () => {
    const error = new Error('fail');
    mockedAxios.delete.mockRejectedValueOnce(error);
    window.alert = jest.fn();
    await deleteFarmer(1)(dispatch);
    expect(window.alert).toHaveBeenCalledWith('Erro ao deletar fazendeiro.');
    expect(dispatch).toHaveBeenCalledWith({
      type: 'farmers/deleteFarmerError',
      payload: error
    });
  });
});
