import { LightningElement } from 'lwc';
import searchOpportunities from '@salesforce/apex/searchOpportunityController.searchOpportunities';


export default class SearchOpportunity extends LightningElement {
    error = undefined;
    searchName = '';
    searchDate = '';
    sortField = 'Name';
    sortAsc = true;
    opportunityList = [];
    selectedRecordDetail = [];

    // 選択リストを設定
    get sortOptions(){
        return [
            { label: '名前', value: 'Name' },
            { label: '終了日', value: 'ClosedDate' },
            { label: '金額', value: 'Amount' }
        ];
    }

    searchNameChange(event){
        this.searchName = event.target.value;
    }
    searchDateChange(event){
        this.searchDate = event.target.value;
    }
    SortFieldChange(event){
        this.sortField = event.target.value;
    }
    
    // いわゆるトグル処理　eventにしないのは値は必要無いから
    sortToggle(){
        this.sortAsc = !this.sortAsc;
    }
    handleSearchClick(){
        searchOpportunities({
        nameFilter : this.searchName,
        startDate : this.searchDate,
        sortBy : this.sortField,
        isAsc : this.sortAsc,
        })
        .then( result => {
            this.opportunityList = result;
            this.error = undefined;
        })
        .catch( error => {
            this.opportunityList = [];
            this.error = error;
        })
    }
}