public with sharing class searchOpportunityController {
    @AuraEnabled
    public static List<Opportunity> searchOpportunities(
        String nameFilter,
        Date startDate,
        String sortBy,
        Boolean isAsc
    ){
        // ホワイトリストによるリストチェック
        Set<String> SortFields = new Set<String>{'Name','CloseDate','Amount'};
        if (!SortFields.contains(sortBy)) {
            sortBy = 'Name';
        }
    
        if(isAsc == null){
            isAsc = true; // デフォルトを標準にする
        }

        // SOQLの動的組み込み
        String query = 'SELECT Id, Name, CloseDate, Amount FROM Opportunity WHERE IsDeleted = false ';

        if (String.isNotBlank(nameFilter)){
            query += 'AND Name LIKE \'%' + String.escapeSingleQuotes(nameFilter) + '%\' ';
        }
        if (startDate != null){   
            query += 'AND CreatedDate >= :startDate ';
        }
        query += 'ORDER BY ' + sortBy + (isAsc ? ' ASC ' : ' DESC ');

        return Database.query(query);
    }
}