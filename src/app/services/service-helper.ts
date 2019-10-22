import {Response} from "@angular/http";

export function ExtractData(res: Response): any {
	//let body = res.json();
	//return body  && body.data ? body.data: {};
	var bomTemplate = sessionStorage.getItem('bomTemplate');
	var returnData = [];
	var resData =  res.json();

	var i=1;
	for (let bom of resData[bomTemplate]) {
		var familyStartDate = bom.items[0]['startDate'];
		var familyEndDate = bom.items[bom.items.length-1]['endDate'];
		var familyDuration = dateDifference(familyStartDate, familyEndDate);

		returnData.push({id: 'p_'+i, solutionType: bom.Family, text: "", duration: familyDuration, start_date: familyStartDate});

		var j=1;
		for (let item of bom.items) {
			returnData.push({id: 'c_'+i+'_'+j, solutionType: item.solutionType, text: item.itemName, duration: item.duration, start_date: item.startDate,progress:item.progress,parent:'p_'+i});
			j++;
		}
		i++;
	}

	return returnData;
}

function dateDifference(date1, date2) {
	var tDate2 = new Date(date2);
	var tDate1 = new Date(date1);
	var timeDiff = Math.abs(tDate2.getTime() - tDate1.getTime());

	return Math.ceil(timeDiff / (1000 * 3600 * 24))
}

export function HandleError(error: any): Promise<any>{
	return Promise.reject(error);
}


/*return [
	{id: 1, solutionType: "SDWAN", text: "SDWAN", duration: 18, start_date: "2018/01/22"},
	{id: 2, solutionType: "fulfillment", text: "uCPE", duration: 5, start_date: "2018/01/22"},
	{id: 3, solutionType: "Day 0 Config", text: "Basic Config", duration: 1, start_date: "2018/01/22"},
	{id: 4, solutionType: "Installation", text: "Installation Service", duration: 3, start_date: "2018/02/05"}
];*/
