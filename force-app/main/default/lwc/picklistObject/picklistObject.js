/**
 * @description       : 
 * @author            : NiyogAethereus
 * @group             : 
 * @last modified on  : 02-27-2023
 * @last modified by  : NiyogAethereus
**/
import { LightningElement, wire, track,api} from 'lwc';
import { refreshApex } from '@salesforce/apex';
import getObjectOptions from '@salesforce/apex/ObjectOptionController.getObjectOptions';
import getRecords from '@salesforce/apex/RecordController.getRecords';

export default class PickListObject extends LightningElement {
  @track objectOptions = [];
  @track selectedObject = '';
  @track data ;
  @track columns = [];
  @api flags;
  wiredData;

  handleObjectChange(event) {
    this.selectedObject = event.detail.value;
    this.columns = this.objectOptions.find(option => option.value === this.selectedObject).columns;
    // Refresh the wired data adapter
  }

  @wire(getObjectOptions)
  wiredGetObjectOptions({ error, data }) {
    if (data) {
      this.objectOptions = data.map(record => ({
        label: record.Label,
        value: record.Object__c,
        columns: [
          { label: record.Field1__c, fieldName: record.Field1__c },
          { label: record.Field2__c, fieldName: record.Field2__c },
          { label: record.Field3__c, fieldName: record.Field3__c }
        ]
      }));
    } else if (error) {
      console.error(error);
    }
  }
 

  @wire(getRecords, { objectName: '$selectedObject' })
  wiredGetData(result) {
    
    const { error, data } = result;
    if (data) {
      this.wiredData = data;
    } else if (error) {
      console.error(error);
    }
    refreshApex(this.wiredData);
  }
  @api refresh(){

    refreshApex(this.wiredData);

}

}