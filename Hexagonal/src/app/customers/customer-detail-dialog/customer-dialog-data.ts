import { Customer } from "../../models/customer";


export interface CustomerDialogData {
  customer?: Customer; 
  isNew: boolean; 
}