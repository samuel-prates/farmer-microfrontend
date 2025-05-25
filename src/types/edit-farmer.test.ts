import { EditFarmerModalProps } from './edit-farmer';
import { Farmer } from './farmer';

describe('EditFarmerModalProps type', () => {
  it('should accept a valid EditFarmerModalProps object', () => {
    const farmer: Farmer = {
      farmerName: 'João',
      federalIdentification: '12345678900',
      farms: [],
    };

    const props: EditFarmerModalProps = {
      farmer,
      onSave: jest.fn(),
      onClose: jest.fn(),
    };

    expect(props.farmer.farmerName).toBe('João');
    expect(typeof props.onSave).toBe('function');
    expect(typeof props.onClose).toBe('function');
  });
});