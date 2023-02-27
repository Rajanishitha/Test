/**
 * @description       : 
 * @author            : NiyogAethereus
 * @group             : 
 * @last modified on  : 02-27-2023
 * @last modified by  : NiyogAethereus
**/
import { LightningElement, api, track } from 'lwc';
import { createRecord } from 'lightning/uiRecordApi';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import { refreshApex } from '@salesforce/apex';

export default class PickListChild extends LightningElement {
    @api objectName;
    @api fieldOptions;

    Flag = false;

    @track recordFields = {};

    handleInputChange(event) {
        const field = event.target.label;
        const value = event.target.value;
        this.recordFields[field] = value;
    }

    async handleSave(event) {
        const recordInput = {
            apiName: this.objectName,
            fields: this.recordFields
        };
        this.Flag = true;
        
        try {
            const result = await createRecord(recordInput);
            console.log('Record saved:', result.id);
            const toastEvent = new ShowToastEvent({
                title: 'Record Created',
                message: 'Record has been created successfully',
                variant: 'success'
            });
            this.dispatchEvent(toastEvent);

        } catch (error) {
            console.error(error);
        }
        this.template.querySelector("c-picklist-object").refresh();
        
        
    }

}

