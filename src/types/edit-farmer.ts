import { Farmer } from "./farmer";

export type EditFarmerModalProps = {
  farmer: Farmer;
  onSave: (farmer: Farmer) => void;
  onClose: () => void;
};