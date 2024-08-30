/**
*  Nexacro Professional Training Couse
*  @FileName 	ExtGrid.js 
*  @Creator 	TOBESOFT Education
*  @CreateDate 	2023/01/09
*  @Desction    
************** 소스 수정 이력 ***********************************************
*  date          		Modifier                Description
*******************************************************************************
*  2023/01/09      		 TOBESOFT Education	 	  	최초 생성 
*******************************************************************************
*/


var pForm = nexacro.Form.prototype;

//grid propertiy
pForm.defaultmenulis = "sort,colfix,rowfix,filter,initial";														// 기본 메뉴
pForm.selectmenulist = "no,status,checkbox,replace,colhide,export,import,personal,cellcopypaste,userheader";	// 선택(옵션) 메뉴 - griduserproperty 설정시에만 작동
pForm.popupmenulist  = "colfix,rowfix,filter,replace,colhide,export,import,personal,initial";					// 팝업 메뉴 전체 목록

//소트
// 헤더 클릭시 정렬 false= 오름/내림 true= 오름/내림/없음
pForm.SORT_TOGGLE_CANCEL = true;
pForm.MARKER_TYPE = "text"; // 정렬 표시자 구분 (text or image)
// Grid Head 에 정렬 상태를 표시할 텍스트 또는 이미지 경로 지정 
pForm.MARKER = ["▲", "▼"];// [오름차순표시, 내림차순표시]
//cell copy and paste 시 chorme용 textarea 저장 object
pForm.tragetGrid = "";
/**
 * @class Grid에 기능 추가
 * @param {Object} obj	- 대상그리드
 * @return N/A
 * @example
 * this.gfnSetGrid(this.grdMain);	
*/
pForm.gfnSetGrid = function(objGrid)
{
	//Grid의 binddataset설정
	var objDs = objGrid.getBindDataset();
	
	// grid에 바인드된 Dataset이 없는 경우 return;
	if (this.gfnIsNull(objDs)) {
		return;
	}
	// Validation에서 foucus 처리시 사용
	else {
		objDs.bindgrid = objGrid;
	}
	
	//Grid의 UserProperty설정
	var arrProp = this._getGridUserProperty(objGrid);
	if(this.gfnIsNull(arrProp)) return; 		//설정할 속성이 엄쪄용

	objGrid.orgformat = objGrid.getCurFormatString();
	
	objGrid.set_enableevent(false);
	objGrid.set_enableredraw(false);	
	objDs.set_enableevent(false); 

	var objApp = pForm.gfnGetApplication();
	var objGds = objApp.gdsGridPersonal;
	
	var sFormatId = this._getUniqueId(objGrid);
	var sFormat;
	var nFindRow = objGds.findRow("sFormatId", sFormatId);
	if( nFindRow > -1){
		objGrid.orgformat2 = objGds.getColumn(nFindRow, "sOrgFormat");
		
		sFormat = "<Formats>" + objGds.getColumn(nFindRow, "sFormat") + "</Formats>";
		objGrid.set_formats(sFormat);
	}
	else{
		objGrid.orgformat2 = objGrid.getFormatString();
	}
	
	objGrid.arrprop = arrProp;
	this._gfnGridAddProp(objGrid);
	
	this._gfnMakeGridPopupMenu(objGrid,arrProp);//popupmenu 생성
	
	/*********************************************** 이벤트추가 START ***********************************************/	
	objGrid.addEventHandler("onheadclick", 	 this.gfnGrid_onheadclick, 	 this); 	//헤드클릭이벤트추가
	for( var k=0; k< arrProp.length; k++){
		var arr = this.popupmenulist.split(",");
		for( var n=0; n<arr.length; n++){
			if( arrProp[k] == arr[n]){
				//우클릭 이벤트 중 하나라도 있어야 팝업 이벤트 사용 가능
				//우클릭이벤트추가
				objGrid.addEventHandler("onrbuttondown", this.gfnGrid_onrbuttondown, this);	    
				break;
			}
		}
		if( arrProp[k] == "cellcopypaste"){
			objGrid.addEventHandler("onkeydown", this.gfnGrid_onkeydown, this);
		}
	}
	/*********************************************** 이벤트추가 END *************************************************/
	
	objGrid.set_enableevent(true);
	objGrid.set_enableredraw(true);	
	objDs.set_enableevent(true);
};	

/**
 * @class Grid에 기능 추가(addCol..)
 * @param {Object} objGrid	- 대상그리드
 * @return N/A
 * @example
 * this._gfnGridAddProp(this.grdMain);	
*/
pForm._gfnGridAddProp = function (objGrid)
{
	var arrProp = objGrid.arrprop;
	var objDs = objGrid.getBindDataset();
	for( var i=0; i<arrProp.length; i++)
	{
		switch(arrProp[i]) {
			case "checkbox":
				this._gfnGridCheckboxNoStatusAdd(objGrid, objDs, "checkbox");
				break;
			case "no":
				this._gfnGridCheckboxNoStatusAdd(objGrid, objDs, "no");
				break;
			case "status":
				this._gfnGridCheckboxNoStatusAdd(objGrid, objDs, "status");
				break;
			case "sort":
				objGrid.sort = "true";
				break;
			default: break;
		}
	}
	
};

/**
 * @class Grid에 기능 추가(addCol..)
 * @param {Object} objGrid	- 대상그리드
 * @param {Object} objDs	- 대상데이터셋
 * @param {Array} addProp	- 기능
 * @return N/A
 * @example
 * this._gfnGridCheckboxNoStatusAdd(this.grdMain, this.dsList, [checkbox,no,status]);	
*/
pForm._gfnGridCheckboxNoStatusAdd = function (objGrid, objDs, addProp)
{	
	var nHeadColIndex;
	if(this.gfnIsNull(objDs.insertheadcell)) nHeadColIndex = 0;
	else nHeadColIndex = objDs.insertheadcell;	

	var nBodyColIndex;
	if(this.gfnIsNull(objDs.insertbodycell)) nBodyColIndex = 0;
	else nBodyColIndex = objDs.insertbodycell;
	
	var nFormatRowCount = objGrid.getFormatRowCount();
	var nHeadCount=-1;
	var nBodyCount=-1;
	for (var i=0; i<nFormatRowCount; i++)
	{
		if (objGrid.getFormatRowProperty(i, "band") == "head") nHeadCount++;
		if (objGrid.getFormatRowProperty(i, "band") == "body") nBodyCount++;
	}

	var sNo = this.gfnGetWord("cmm.no");		// 순번
	var sStatus = this.gfnGetWord("cmm.status");// 상태

	//체크박스
	if( addProp == "checkbox")
	{
		objDs.set_enableevent(false); 
		var idx=-1;
		for( var j=0; j<objDs.getColCount(); j++){
			var tmpcol = objDs.getColID(j);
			if( tmpcol == "gridcmmcheck"){
				idx = j;
			}
		}
		if( idx < 0 ) objDs.addColumn("gridcmmcheck", "STRING", 1);
		
		
		for( var i=0; i<objGrid.getCellCount("head"); i++){
			//헤드텍스트
			var tmp = objGrid.getCellProperty("head" , i, "text");
			if( tmp == "0"){
				// head cell index 에 해당하는 body cell index
				var bodyCellIndex = this._gfnGridGetBodyCellIndex(objGrid, i);
				// body cell index 에 해당하는 바인드 컬럼명
				var columnName = this._gfnGridGetBindColumnNameByIndex(objGrid, bodyCellIndex);
				if(columnName == "gridcmmcheck") {
					//return;
					objGrid.deleteContentsCol("body", i);
				}
			}
		}
		objGrid.insertContentsCol(nBodyColIndex);			
		objGrid.setFormatColProperty(nBodyColIndex, "size", "40");	
		objGrid.setCellProperty("head", nHeadColIndex, "displaytype", "checkboxcontrol");
		objGrid.setCellProperty("head", nHeadColIndex, "edittype", "checkbox");
		objGrid.setCellProperty("head", nHeadColIndex, "text", "0");
		objGrid.setCellProperty("body", nBodyColIndex, "displaytype", "checkboxcontrol");
		objGrid.setCellProperty("body", nBodyColIndex, "edittype", "checkbox");
		objGrid.setCellProperty("body", nBodyColIndex, "text", "bind:gridcmmcheck");
		
		objGrid.mergeContentsCell("head", 0, nBodyColIndex, nHeadCount, nBodyColIndex, nHeadColIndex, false);	
		objGrid.mergeContentsCell("body", 0, nBodyColIndex, nBodyCount, nBodyColIndex, nBodyColIndex, false);		
		
		nHeadColIndex++;
 		nBodyColIndex++;
	}
	//번호
	if( addProp == "no")
	{
		for( var i=0; i<objGrid.getCellCount("head"); i++){
			var tmp = objGrid.getCellProperty("head" , i, "text");
			if( tmp == "NO" || tmp == "순번"){
				//return;
				objGrid.deleteContentsCol("body", i);
			}
		}
		objGrid.insertContentsCol(nBodyColIndex);	
		objGrid.setFormatColProperty(nBodyColIndex, "size", "50");	
 		objGrid.setCellProperty("head", nHeadColIndex, "text", sNo);	
		objGrid.setCellProperty("head", nHeadColIndex, "textAlign","center");
		objGrid.setCellProperty("body", nBodyColIndex, "text","expr:currow+1");
		objGrid.setCellProperty("body", nBodyColIndex, "textAlign","center");
		objGrid.mergeContentsCell("head", 0, nBodyColIndex, nHeadCount, nBodyColIndex, nHeadColIndex, false);	
		objGrid.mergeContentsCell("body", 0, nBodyColIndex, nBodyCount, nBodyColIndex, nBodyColIndex, false);			
		
		nHeadColIndex++;
 		nBodyColIndex++;
	}
	//상태
	if ( addProp == "status")
	{
		for( var i=0; i<objGrid.getCellCount("head"); i++){
			var tmp = objGrid.getCellProperty("head" , i, "text");
			if( tmp == "상태" || tmp == "Status"){
				//return;
				objGrid.deleteContentsCol("body", i);
			}
		}
		
		var sInsert = nexacro.wrapQuote(this.gfnGetWord("insert")); //입력
		var sUpdate = nexacro.wrapQuote(this.gfnGetWord("modify")); //수정
		var sDelete = nexacro.wrapQuote(this.gfnGetWord("delete")); //삭제
		var sExpr = "expr:"
				  + "dataset.getRowType(currow)==2?"+sInsert
				  + ":dataset.getRowType(currow)==4?"+sUpdate
				  + ":dataset.getRowType(currow)==8?"+sDelete
				  + ":''";
		
		var nSize = 50;
		if( nexacro.getEnvironmentVariable("evLanguage") == "EN") nSize = 80;
		
		objGrid.insertContentsCol(nBodyColIndex);	
		objGrid.setFormatColProperty(nBodyColIndex, "size", nSize);	
		objGrid.setCellProperty("head", nHeadColIndex, "text", sStatus);	
		objGrid.setCellProperty("head", nHeadColIndex, "textAlign","center");
		objGrid.setCellProperty("body", nBodyColIndex, "displaytype", "expr:dataset.getRowType(currow) != 1 ? 'text' : ''");
		objGrid.setCellProperty("body", nBodyColIndex, "text", sExpr);		
		objGrid.setCellProperty("body", nBodyColIndex, "textAlign","center");
		objGrid.mergeContentsCell("head", 0, nBodyColIndex, nHeadCount, nBodyColIndex, nHeadColIndex, false);	
		objGrid.mergeContentsCell("body", 0, nBodyColIndex, nBodyCount, nBodyColIndex, nBodyColIndex, false);			
		
		nHeadColIndex++;
 		nBodyColIndex++;
	}	
};

/**
 * @class  그리드헤드클릭 이벤트 [Sort, Checkbox]
 * @param {Object} objGrid - 대상그리드
 * @param {Evnet}  e	   - 헤드클릭이벤트
 * @return  N/A
 * @example
 * objGrid.addEventHandler("onheadclick", 	 this.gfnGrid_onheadclick, 	 this);
 */
pForm.gfnGrid_onheadclick = function(objGrid, e)
{
	var sType = objGrid.getCellProperty("head", e.cell, "displaytype");
	if (sType == "checkboxcontrol"){
		//head display type이 checkbox일 경우 all/none check기능추가
		this._gfnHeadCheckSelectAll(objGrid, e);
	}else{
		//sort
		if(this.gfnIsNull(objGrid.sort) || objGrid.sort=="false"){
			return;
		}else if(objGrid.sort == "true"){
			var arr = objGrid.arrprop;
			var bUserHeader = this._gfnGridUserHeaderFlg(objGrid);
			var multiple = false;
			if ( e.ctrlkey ) multiple = true;// Ctrl 키
			if(!bUserHeader){
				// 정렬 상태 변경이 성공하면 정렬을 실행한다.
				var rtn = this._gfnGridSetSortStatus(objGrid, e.cell, multiple);
				if(rtn){
					this._gfnGridExecuteSort(objGrid);
				}
			}else{
				this._gfnGirdUserHeaderExcuteSort(objGrid, e.cell, multiple);
			}
		}
	}
};

/**
 * @class  그리드키다운 이벤트 [cellcopypaste]
 * @param {Object} objGrid - 대상그리드
 * @param {Evnet}  e	   - 키다운이벤트
 * @return  N/A
 * @example
 * objGrid.addEventHandler("onheadclick", 	 this.gfnGrid_onheadclick, 	 this);
 */
pForm.gfnGrid_onkeydown =function(objGrid, e){
	var keycode = e.keycode;
	var sBrowser = system.navigatorname;
	if(e.ctrlkey){
		if(keycode == 67){
			//copy
			if( sBrowser == "nexacro" || sBrowser == "IE"){
				this._gfnGridCopyEventForRuntime(objGrid, e);
			}else {
				this._gfnGridCopyEventForChrome(objGrid, e);
			}
		}else if(keycode == 86){
			//paste
			this._gfnGridPasteEvent(objGrid, e);
		}
	}
};

/**
 * @class 유저헤더사용여부반환
 * @param {Object} objGrid - 대상그리드
 * @return 유저헤더사용여부 true/false
 * @example
 * this._gfnGridUserHeaderFlg(this.grdMain);
 */
pForm._gfnGridUserHeaderFlg = function (objGrid)
{
	var arr = objGrid.arrprop;
	var bUserHeader = false;
	for( var i=0; i<arr.length; i++){
		if( arr[i] == "userheader"){
			bUserHeader = true;
		}
	}
	return bUserHeader;
};

/**
 * @class 유저헤더를 이용한 정렬
 * @param {Object} grid - 대상그리드
 * @return N/A
 * @example
 * this._gfnGirdUserHeaderExcuteSort(objGrid);
 */
pForm._gfnGirdUserHeaderExcuteSort = function (objGrid, headCellIndex, multiple)
{
	var bindCol = objGrid.getCellProperty("head", headCellIndex, "calendarweekformat");
	if( this.gfnIsNull(bindCol)) return false; //헤더에 바인드없음

	var bodyCellIdx = 0;
	var nbodyCnt = objGrid.getCellCount("body");
	for( var i=0; i<nbodyCnt; i++){
		var tmp =  objGrid.getCellProperty("body", i, "text");
		if( tmp == bindCol ){
			bodyCellIdx = i;
			break;
		}
	}
	var rtn = this._gfnGridSetSortStatus(objGrid, headCellIndex, multiple, "", bodyCellIdx);
	if(rtn){
		this._gfnGridExecuteSort(objGrid);
	}
};

/**
 * @class 정렬가능여부리턴
 * @param {Object} grid - 대상그리드
 * @param {Number} headCellIndex - 대상셀INDEX
 * @param {Boolean}multiple - 멀티소트여부 
 * @param {Number} sortStatus - 소트상태  
 * @return{Boolean} sort 가능/불가능 여부
 * @example
 * this._gfnGridSetSortStatus(obj, e.cell, multiple);	
 */
pForm._gfnGridSetSortStatus = function(grid, headCellIndex, isMultiple, sortStatus, bodyCellIndex)
{
	// head cell index 에 해당하는 body cell index
	if( this.gfnIsNull(bodyCellIndex)){
		bodyCellIndex = this._gfnGridGetBodyCellIndex(grid, headCellIndex);
	}
	if ( bodyCellIndex < 0 ) return false;
	
	// body cell index 에 해당하는 바인드 컬럼명
	var columnName = this._gfnGridGetBindColumnNameByIndex(grid, bodyCellIndex);
	if ( this.gfnIsNull(columnName) ){
		trace("Check Grid body cell bind value");
		return false;
	}
	
	if ( this.gfnIsNull(isMultiple) ) isMultiple = false;
	if ( this.gfnIsNull(sortStatus) ) sortStatus = -1;
	
	// 대상 grid 에 정렬정보를 가지는 사용자 속성 확인/추가
	if ( this.gfnIsNull(grid.sortInfos) ){
		grid.sortInfos = {};
	}
	
	// 정렬대상컬럼 (순서중요)
	if ( this.gfnIsNull(grid.sortItems) ){
		grid.sortItems = [];
	}
	
	var sortInfos = grid.sortInfos,
		sortItems = grid.sortItems,
		sortInfo = sortInfos[columnName],
		sortItem,
		status;
	
	if ( this.gfnIsNull(sortInfo) )
	{
		var headText = grid.getCellText(-1, headCellIndex);
		
		// executeSort에서 정렬 표시를 위해 cell index 가 필요한데
		// cell moving 될 경우 index는 변하므로 cell object 를 참조하여 값을 얻어온다. 		
		var refCell = this._gfnGridGetGridCellObject(grid, "head", headCellIndex);
		sortInfo = sortInfos[columnName] = { status: 0, text: headText, refCell: refCell};
	}
	// set sort status
	if ( isMultiple ) {		
		status = sortInfo.status;
		if ( sortStatus == -1 ) {
			if ( status == 0 ) {
				sortInfo.status = 1;
			} 
			else if ( status == 1 ) {
				sortInfo.status = 2;
			} 
			else if ( status == 2 ) {
				sortInfo.status = ( this.SORT_TOGGLE_CANCEL ? 0 : 1);
			}
		}
		else {
			sortInfo.status = sortStatus;
		}
	}else {
		for (var p in sortInfos) {
			if ( sortInfos.hasOwnProperty(p) )
			{
				sortInfo = sortInfos[p];
				if ( p == columnName ) {
					status = sortInfo.status;
					if ( sortStatus == -1 ) {
						if ( status == 0 ) {
							sortInfo.status = 1;
						} 
						else if ( status == 1 ) {
							sortInfo.status = 2;
						} 
						else if ( status == 2) {
							sortInfo.status = ( this.SORT_TOGGLE_CANCEL ? 0 : 1);
						}
					}else {
						sortInfo.status = sortStatus;
					}
				}else {
					sortInfo.status = 0;
				}
				if ( sortInfo.status == 0 ){
					for (var j=0, len2=sortItems.length; j<len2; j++) {
						if ( sortItems[j] !== columnName ) {
							sortItems.splice(j, 1);
							break;
						}
					}
				}
			}
		}
	}
	
	// 컬럼정보 등록
	var hasItem = false;
	for (var i=0, len=sortItems.length; i<len; i++) {
		if ( sortItems[i] == columnName ) {
			hasItem = true;
			break;
		}
	}	
	if ( !hasItem ){
		sortItems.push(columnName);
	}
	return true;
}; 

/**
 * @class head cell에 match되는 body cell을 얻어온다
 * @param {Object}  grid 대상 Grid Component
 * @param {Number} eadCellIndex head cell index
 * @return{Number}  body cell index
 * @example
 * this._gfnGridSetSortStatus(obj, e.cell, multiple);	
 */ 
pForm._gfnGridGetBodyCellIndex = function(grid, headCellIndex, useColspan) 
{	//, useColspan) 
	if( this.gfnIsNull(useColspan)) useColspan=false;
	// Max Head Row Index
	var maxHeadRow = 0;
	for (var i=0, len=grid.getCellCount("head"); i<len; i++) {
		var row = grid.getCellProperty("head", i, "row");
		if (maxHeadRow < row) {
			maxHeadRow = row;
		}
	}
	// Max Body Row Index
	var maxBodyRow = 0;
	for (var i=0, len=grid.getCellCount("body"); i<len; i++) {
		var row = grid.getCellProperty("body", i, "row");
		if (maxBodyRow < row) {
			maxBodyRow = row;
		}
	}
	
	if (maxHeadRow == 0 && maxBodyRow == 0) {
// 		var headcolspan = grid.getCellProperty("head", headCellIndex, "colspan");
// 		var bodycolspan = grid.getCellProperty("body", headCellIndex, "colspan");
// 		
// 		if( headcolspan == bodycolspan ){
// 			return headCellIndex;
// 		}
		useColspan = true;
	}
	
	// Body Row 가 1개 이상일 경우
	// Head의 row 가 Body의 row 보다 클 경우 차이 row 를 뺀 것을 대상으로 찾고
	// Body의 row 가 Head의 row 보다 크거나 같을 경우 row index가 같은 대상을 찾는다.			
	var cellIndex = -1;
	var sRow = -1;
	var nRow = parseInt(grid.getCellProperty("head", headCellIndex, "row"));
	var nCol = parseInt(grid.getCellProperty("head", headCellIndex, "col"));
	var nColspan = parseInt(grid.getCellProperty("head", headCellIndex, "colspan"));				
	
	if (maxHeadRow > maxBodyRow) 
	{
		sRow = nRow - (maxHeadRow - maxBodyRow);
		sRow = (sRow < 0 ? 0 : sRow);
	}
	else 
	{
		sRow = nRow;
	}
	var cRow, cCol, cColspan, cRowspan;
	for (var i=0, len=grid.getCellCount("body"); i<len; i++) 
	{
		cRow = parseInt(grid.getCellProperty("body", i, "row"));
		cCol = parseInt(grid.getCellProperty("body", i, "col"));	
		cColspan = parseInt(grid.getCellProperty("body", i, "colspan"));					
		cRowspan = parseInt(grid.getCellProperty("body", i, "rowspan"));
		if( cRowspan > 1 )
		{
			if ( useColspan ){
				if (sRow >= cRow && nCol <= cCol && cCol < (nCol + nColspan)) 
				{		
					cellIndex = i;
					break;
				}		
			}else{
				if (sRow >= cRow && nCol == cCol && nColspan == cColspan) 
				{		
					cellIndex = i;
					break;
				}
			}
		}else{	
			if ( useColspan ){
				if (sRow == cRow && nCol <= cCol && cCol < (nCol + nColspan)) 
				{		
					cellIndex = i;
					break;
				}		
			}else{
				if (sRow == cRow && nCol == cCol && nColspan == cColspan) 
				{		
					cellIndex = i;
					break;
				}
			}
		}
	}
	return cellIndex;
};

/**
 * @class body cell index로 binding 된 컬럼명을 얻어온다.
 * @param {Object}  grid 대상 Grid Component
 * @param {Number} eadCellIndex head cell index
 * @return{String} column id
 * @example
 * this._gfnGridGetBindColumnNameByIndex(obj, e.cell);	
 */  
pForm._gfnGridGetBindColumnNameByIndex = function(grid, index) 
{
	var text = "";
	var columnid = "";
	var subCell = grid.getCellProperty("body", index, "subcell");
	if ( subCell > 0 ){
		text = grid.getSubCellProperty("body", index, 0, "text");
	}
	else{
		text = grid.getCellProperty("body", index, "text");
	}
	
	if ( !this.gfnIsNull(text) ){
		if ( text.search(/^BIND\(/) > -1 ) {	
			columnid = text.replace(/^BIND\(/, "");
			columnid = columnid.substr(0, columnid.length-1);
		} 
		else if ( text.search(/^bind:/) > -1 ) {
			columnid = text.replace(/^bind:/, "");
		}
	}
	return columnid;
};

/**
 * @class 소트를 실행한다
 * @param {Object}  grid 대상 Grid Component
 * @return{String}  N/A
 * @example
 * this._gfnGridExecuteSort(obj);	
 */  
pForm._gfnGridExecuteSort = function(grid) 
{
	var sortInfo, 
		sortItem,
		sortInfos = grid.sortInfos,
		sortItems = grid.sortItems,
		columnName,
		status,
		cell,
		sortString = "";
		
	if ( this.gfnIsNull(sortInfos) || this.gfnIsNull(sortItems) ) return;

	// keystring 조합
	for (var i=0; i<sortItems.length; i++) {
		columnName = sortItems[i];
		sortInfo = sortInfos[columnName];
		status = sortInfo.status;
		cell = sortInfo.refCell;
		
		// 컬럼삭제 등으로 제거될 수 있으므로 실제 column 이 존재하는지
		// 확인하여 없으면 제거해 준다.
		if ( this.gfnIsNull(cell) || grid.getBindCellIndex("body", columnName) < 0 ){
			// 컬럼정보제거
			sortItems.splice(i, 1);
			sortInfos[columnName] = null;
			delete sortInfos[columnName];
			
			i--;
		}else if ( status > 0 ) {
			sortString += (status == 1 ? "+" : "-") + columnName;
		}
	}
	
	var ds = grid.getBindDataset();
	// keystring 확인
	var curKeyString = ds.keystring;
	var groupKeyString = "";
	
	if ( curKeyString.length > 0 && curKeyString.indexOf(",") < 0 ){
		var sIndex = curKeyString.indexOf("S:");
		var gIndex = curKeyString.indexOf("G:");

		if ( sIndex > -1 ){
			groupKeyString = "";
		}else{
			if ( gIndex < 0 )
			{
				groupKeyString = "G:"+curKeyString;
			}
			else
			{
				groupKeyString = curKeyString;
			}
		}
	}else{
		var temps = curKeyString.split(",");
		var temp;
		for (var i=0,len=temps.length; i<len; i++){
			temp = temps[i];
			if ( temp.length > 0 && temp.indexOf("S:") < 0 ){
				if ( temp.indexOf("G:") < 0 )
				{
					groupKeyString = "G:"+temp;
				}else{
					groupKeyString = temp;
				}
			}
		}
	}
	
	if ( sortString.length > 0 ){
		var sortKeyString = "S:"+sortString;
		
		if ( groupKeyString.length > 0 ){
			ds.set_keystring(sortKeyString + "," + groupKeyString);
		}else{
			ds.set_keystring(sortKeyString);
		}
		
		grid.sortKeyString = sortKeyString;
	}else{		
		ds.set_keystring(groupKeyString);
		grid.sortKeyString = "";
	}

	// 정렬표시
	var type = this.MARKER_TYPE;
	var index, marker;
	for (var p in sortInfos) {
		if ( sortInfos.hasOwnProperty(p) )
		{
			sortInfo = sortInfos[p];			
			cell = sortInfo.refCell;
			if ( cell )
			{
				index = cell._cellidx;
				marker = this.gfnDecode(sortInfo.status, 1, this.MARKER[0], 2, this.MARKER[1], "");
				grid.setCellProperty( "head", index, "text", sortInfo.text + marker);
			}
		}
	}
};

/**
 * Cell object 를 반환 (Grid 내부 속성이므로 get 용도로만 사용)
 * @param {Grid} grid 대상 Grid Component
 * @param {string} band 얻고자 하는 cell 의 band (head/body/summ);
 * @param {number} index 얻고자 하는 cell 의 index
 * @return {object} cell object
 */
pForm._gfnGridGetGridCellObject = function(grid, band, index)
{
	// 내부속성을 통해 얻어온다.
	var refCell;
	var format = grid._curFormat;
	if (format){
		if ( band == "head" ){
			refCell = format._headcells[index];
		}
		else if ( band == "body" ){
			refCell = format._bodycells[index];
		}
		else if ( band == "summ" || band == "summary" ){
			refCell = format._summcells[index];
		}
	}
	return refCell;
};

/**
 * @class 그리드의 Sort Mark 제거
 * @param {Object} Grid 대상그리드
 * @return N/A
 */  
pForm._gfnClearSortMark = function(obj)
{
	var sortInfos = obj.sortInfos;
	var sortItems = obj.sortItems;
	
	if ( this.gfnIsNull(sortInfos) || this.gfnIsNull(sortItems) ) return;
	
	// 정렬상태 초기화.
	for( var j=0; j<sortItems.length;j++){
		var col = sortItems[j];
		var sortInfo = sortInfos[col];
		sortInfo.status = 0;
	}
	
	// 정렬실행
	this._gfnGridExecuteSort(obj);
	
	// 정보 초기화
	obj.sortInfos = {};
	obj.sortItems = [];
};

/**
 * @class  마우스 우클릭 이벤트
 * @param  {Object} objGrid	- 대상그리드
 * @param  {Event}  e		- 우클릭이벤트 
 * @return  N/A
 * @example
 * this._gfnGetHeadBodyIndex(this.grdMain, this.dsMain);	
 */
pForm.gfnGrid_onrbuttondown = function (objGrid, e)
{
	var objApp = pForm.gfnGetApplication();
	
	// 대상 그리드와 셀 정보를 추가
	objGrid.popupMenu.grid = objGrid;
	objGrid.popupMenu.cellindex = e.cell;
	objGrid.popupMenu.rowindex = e.row;

// 	// trackPopup 이용 : open시 위치 오류 발생
// 	var x = nexacro.toNumber(system.getCursorX()) - nexacro.toNumber(system.clientToScreenX(objApp.mainframe, 0));
// 	var y = nexacro.toNumber(system.getCursorY()) - nexacro.toNumber(system.clientToScreenY(objApp.mainframe, 0));
// 
// 	// 스튜디오 사용시 팝업메뉴 위치 조정
// 	var sRunMode = nexacro.getEnvironmentVariable("evRunMode");
// 	if (sRunMode == "S") {
// 		y += 83;
// 	}
// 
// 	objGrid.popupMenu.trackPopup(x, y);

	// trackPopupByComponent 이용 : 하단에서 위치 오류 발생, 패치 2018년 9월 예정
	var x = nexacro.toNumber(system.getCursorX()) - nexacro.toNumber(system.clientToScreenX(objGrid, 0));
	var y = nexacro.toNumber(system.getCursorY()) - nexacro.toNumber(system.clientToScreenY(objGrid, 0));
	
	// 스튜디오 사용시 팝업메뉴 위치 조정
	var sRunMode = nexacro.getEnvironmentVariable("evRunMode");
	if (sRunMode == "S") {
		y += 83;
	}	
	objGrid.popupMenu.trackPopupByComponent(objGrid, x, y);
};


/**
 * @class  gfnCreatePopupMenu 내부함수로 팝업메뉴 클릭 시 발생하는 이벤트
 * @param {Object} objGrid	- 대상그리드
 * @param {Evnet}  e 		- 팝업메뉴클릭이벤트
 * @return N/A
 * @example
 * this.gfnPopupmenu_onmenuclick(this.grdMain, nexacro.MenuClickEventInfo);	
 */
pForm.gfnPopupmenu_onmenuclick = function (objMenu, e)
{
	var selectId   = e.id;
	var grid 	   = objMenu.grid;
	var nCellIndex = objMenu.cellindex;	
	var nRowIndex  = objMenu.rowindex;

	switch(selectId) {
		case "colfix"://틀고정 열
			this.fv_CellIndex = nCellIndex;
			this._gfnGridcellFix(grid, this.fv_CellIndex, nRowIndex);
			break;
		case "colfixfree"://틀고정 열 해제
			this._gfnGridCellFree(grid);
			break;
		case "rowfix"://틀고정 행
			if(nRowIndex<0) return;
			grid.fixedRow = nRowIndex;
			this._gfnGridSetCssclass(grid);
			break;
		case "rowfixfree"://틀고정 행 해제
			grid.fixedRow = -1;
			this._gfnGridSetCssclass(grid);
			break;
		case "filter"://필터
			this._gfnGridFilter(grid);
			break;
		case "filterfree"://필터해제
			this._gfnGridCellFilterFree(grid);
			break;
		case "replace"://찾기/바꾸기
			this._gfnGridCellReplace(grid, nCellIndex, nRowIndex);
			break;
		case "colhide"://컬럼숨기기
			this._gfnGridColHideShow(grid, nRowIndex);
			break;	
		case "export"://엑셀내보내기
			this._gfnGridExcelExport(grid, nRowIndex);
			break;	
		case "import"://엑셀가져오기
			this._gfnGridExcelImport(grid, nRowIndex);
			break;	
		case "personal" : //개인화
			this._gfnGridPersonalize(grid);
			break;
		case "initial"://초기화
			grid.set_formats("<Formats>" + grid.orgformat2 + "</Formats>");
			//this._gfnGridCellFree(grid);
			//this._gfnClearSortMark(grid);
			this._gfnGridAddProp(grid);
			break;
		default: break;
	}
};

/**
 * @class  _gfnGridSetCssclass 행고정/해제시 css설정
 * @param {Object} objGrid	- 대상그리드
 * @return N/A
 * @example
 * this._gfnGridSetCssclass(this.grdMain);	
 */
pForm._gfnGridSetCssclass = function (objGrid)
{
	var clname = "Cell_WF_Fixed";
	clname = nexacro.wrapQuote(clname);
			
	objGrid.set_enableredraw(false);

	for( var k=0; k<objGrid.getFormatColCount(); k++){
		var expr = "";
		if( objGrid.fixedRow >= 0 ){
			expr = "expr:comp.fixedRow==currow?"+clname+":''";
		}
		objGrid.setCellProperty("body", k, "cssclass", expr);
	}
	objGrid.set_enableredraw(true);
	objGrid.setFixedRow(objGrid.fixedRow);
};

/**
 * @class  그리드헤드클릭이벤트 내부함수 (헤드클릭시 체크 ALL/None)
 * @param {Object} objGrid - 대상그리드
 * @param {Evnet}  e	   - 헤드클릭이벤트
 * @return  N/A
 * @example
 * this._gfnHeadCheckSelectAll(objGrid, e); //ALL CHECK
 */
pForm._gfnHeadCheckSelectAll = function (objGrid, e)
{
	if(objGrid.readonly == true) return;
	
	var sType;
	var sChk;
	var sVal;
	var sChkVal;
	var oDsObj;
	var nHeadCell  = e.cell;
	var nBodyCell;
	var nSubCnt = objGrid.getSubCellCount("head", nHeadCell);

	oDsObj  = objGrid.getBindDataset();
	
	if(oDsObj.getRowCount() < 1) return;
	
	if(objGrid.getCellCount("body") != objGrid.getCellCount("head")) {
		nBodyCell = parseInt(objGrid.getCellProperty("head", nHeadCell, "col"));
	} else {
		nBodyCell = e.cell;
	}
	sChkVal = objGrid.getCellProperty("body", nBodyCell, "text");
	sChkVal = sChkVal.toString().replace("bind:", "");
		
	// Merge한 셀이 없는 경우
	sType = objGrid.getCellProperty("head", nHeadCell, "displaytype");

	if(sType != "checkboxcontrol") {
		return;
	}

	// Head셋팅
	sVal = objGrid.getCellProperty("head", nHeadCell, "text");

	if (sVal == "1" ){
		objGrid.setCellProperty("head", nHeadCell, "text", "0");
		var bodyCellIndex = this._gfnGridGetBodyCellIndex(objGrid, nHeadCell);
		// body cell index 에 해당하는 바인드 컬럼명
		var columnName = this._gfnGridGetBindColumnNameByIndex(objGrid, bodyCellIndex);
		if(columnName == "gridcmmcheck") {
			 sChk="";
		}else{
			sChk="0";
		}
	}
	//1이외 (0 or undefined 포함)
	else {
		objGrid.setCellProperty("head", nHeadCell, "text", "1");
		sChk="1";
	}
	
	
	// Body셋팅
	oDsObj.set_enableevent(false);
	for(var i=0 ; i< oDsObj.rowcount ; i++) {
		oDsObj.setColumn(i, sChkVal, sChk);
	}
	oDsObj.set_enableevent(true);
};

/**
 * @class  마우스우클릭시 표현될 팝업메뉴생성
 * @param  {Object} objGrid	- 대상그리드
 * @return  N/A
 * @example
 * this._gfnGetHeadBodyIndex(this.grdMain, this.dsMain);	
 */
pForm._gfnMakeGridPopupMenu = function (objGrid, arrProp)
{
	var objApp 		 = pForm.gfnGetApplication();
	var objMenuDs 	 = objApp.gdsGridPopupMenu;
	var objParentForm= objGrid.parent;
	
	var sPopupDsMenu = "dsPopupMenu_"+objGrid.name+"_"+this.name;
	var objPopupDs 	 = new Dataset(sPopupDsMenu);
	objParentForm.addChild(sPopupDsMenu, objPopupDs); 
	objPopupDs.copyData(objApp.gdsGridPopupMenu);
	
	for (var i=0; i<arrProp.length; i++) {
		for (var j=0; j<objPopupDs.rowcount; j++){
			var sMenu = objPopupDs.getColumn(j,"id");
			if (this.gfnIsNull(sMenu)) continue;
			
			if (sMenu.indexOf(arrProp[i]) > -1) {
				objPopupDs.setColumn(j, "enable", "true");
				if (objPopupDs.getColumn(j, "level") == 1) {
					var sUpMenu = objPopupDs.getColumn(j, "upmenu");
					var nUpRow = objPopupDs.findRow("id", sUpMenu);
					if (nUpRow > -1) objPopupDs.setColumn(nUpRow, "enable", "true");
				}
			}
		}
	}
	var sPopMenu = "popMenu_"+objGrid.name+"_"+this.name;
	var objPopMenu = new PopupMenu(sPopMenu, 0, 0, 100, 100);
	
	var oEnvLang = nexacro.getEnvironmentVariable("evLanguage");
	objParentForm.addChild(objPopMenu.name, objPopMenu);
	
	objPopMenu.set_innerdataset(sPopupDsMenu);
	if (oEnvLang == "KO") {
		objPopMenu.set_captioncolumn("caption");
	}
	else {
		objPopMenu.set_captioncolumn("captionEN");
	}
	objPopMenu.set_enablecolumn("enable");
	objPopMenu.set_idcolumn("id");
	objPopMenu.set_levelcolumn("level");
 	objPopMenu.addEventHandler("onmenuclick", this.gfnPopupmenu_onmenuclick, objParentForm);
	objPopMenu.show();
	
//	objPopMenu.set_itemheight(29);
	
	objPopMenu.grid = objGrid;
	objGrid.popupMenu = objPopMenu;
};

/**
 * @class  그리드 설정 내부함수<br>
		   그리드에 유저프로퍼티를 Array형태로 반환한다.
 * @param  {Object}objGrid	- 대상그리드
 * @return {Array} user property
 * @example
 * this._getGridUserProperty(this.grdMain);	
 */
pForm._getGridUserProperty = function (objGrid)
{
	var sProp = objGrid.griduserproperty;
	
	var arrdefault = this.defaultmenulis.split(",");
	var arrprop = [];
	
	if(!this.gfnIsNull(sProp)){
		arrprop = sProp.split(",");
		for( var i=0; i<arrprop.length; i++){
			if( arrprop[i].indexOf("!") == 0 ){
				//TODO.DEFAULT에서제거
				for( var j=0; j<arrdefault.length; j++){
					if( arrdefault[j] == arrprop[i].substr(1) ){
						arrdefault[j] = "";
					}
				}
				arrprop[i] = "";
			}
		}
	}
	
	var arrmyprop = [];
	for( var i=0; i< arrdefault.length; i++){
		if(!this.gfnIsNull(arrdefault[i])){
			arrmyprop.push(arrdefault[i]);
		}
	}
	
	for( var i=0; i< arrprop.length; i++){
		if(!this.gfnIsNull(arrprop[i])){
			arrmyprop.push(arrprop[i]);
		}
	}
	
	return arrmyprop;
};


//////////////////////////////////////////////////////////////////////////Popupmenu//////////////////////////////////////////////////////////////////////////
/**
 * @class 그리드 우클릭 POPUPMENU 내부함수<br>
		  셀고정(colfix)
 * @param {Object} objGrid  - 대상그리드
 * @param {Number} nCellIdx - 셀고정 셀인덱스
 * @param {Number} nRowIdx  - 셀고정 로우 인덱스
 * @return N/A
 * @example
 * this._gfnGridcellFix(this.grdMain, 1, 2);	
 */
pForm._gfnGridcellFix = function (objGrid, nCellIdx, nRowIdx)
{
	var sBandType;
	if(nRowIdx == -1) sBandType = "Head";
	else if(nRowIdx == -2) sBandType = "Summary";
	else sBandType = "Body";
	
	var nCol 	 = nexacro.toNumber(objGrid.getCellProperty(sBandType, nCellIdx, "col"));
	var nColSpan = nexacro.toNumber(objGrid.getCellProperty(sBandType, nCellIdx, "colspan"));
	var nRowSpan = nexacro.toNumber(objGrid.getCellProperty(sBandType, nCellIdx, "rowspan"));
	var nVal = objGrid.getCellpos
	var nMaxCol = 0;
	var i;
	var nRealCol;
	var nRealColSpan;
	var nRealCol_end;
	
	objGrid.set_enableredraw(false);
	
	objGrid.setFormatColProperty(0, "band", "body");	
	
	for (i=0; i<objGrid.getCellCount("Head"); i++)
	{
		nRealCol = nexacro.toNumber(objGrid.getCellProperty("Head", i, "col"));
		nRealColSpan = nexacro.toNumber(objGrid.getCellProperty("Head", i, "colspan"));
		nRealCol_end = nRealCol+nRealColSpan-1;
		if ( nRealCol == nCol||nRealCol_end==nCol)
		{
			if(nRealColSpan>1)
			{
				//objGrid.setCellProperty("Head", i, "line", "1 solid #dcdbdaff,2 solid #919191ff");
				nCol = nRealCol_end;
			}else
			{
				//objGrid.setCellProperty("Head", i, "line", "1 solid #dcdbdaff,2 solid #919191ff");
				nCol = nRealCol_end;
			}
		}else
		{
			objGrid.setCellProperty("Head", i, "line", "");
		}
	}
	
	for (i=0; i<objGrid.getCellCount("Body"); i++)
	{
		if (objGrid.getCellProperty("Body", i, "col") == nCol)
		{
			//objGrid.setCellProperty("Body", i, "line", "1 solid #dcdbdaff,2 solid #919191ff");
			objGrid.setCellProperty("Body", i, "border", "1px solid #dbdee2 , 2px solid aqua , 1px solid #dbdee2 , 1px solid #dbdee2");
		}
		else
		{
			//objGrid.setCellProperty("Body", i, "line", "");
			objGrid.setCellProperty("Body", i, "border", "");
		}
	}	
	
	objGrid.setFormatColProperty(nCol, "band", "left");	
	objGrid.set_enableredraw(true);
};

/**
 * @class 그리드 우클릭 POPUPMENU 내부함수<br>
		  셀고정해제(colfree)
 * @param {Object} objGrid - 대상그리드
 * @return N/A
 * @example
 * this._gfnGridCellFree(this.grdMain);	
 */
pForm._gfnGridCellFree = function(objGrid)
{
	for(i=0; i< objGrid.getFormatColCount(); i++)
	{		
		objGrid.setFormatColProperty(i, "band", "body");	
	}
		
	for (i=0; i<objGrid.getCellCount("Body"); i++)
	{
		objGrid.setCellProperty("Body", i, "border", "");
	}	
	
	this.gv_CellIndex = -1;
};

/**
 * @class 그리드 우클릭 POPUPMENU 내부함수<br>
          셀필터(cellFilter)
 * @param {Object} objGrid - 대상그리드	
 * @param {Number} nCell - 셀필터 셀 인덱스
 * @return N/A
 * @example
 * this._gfnGridFilter(this.grdMain);	
 */
pForm._gfnGridFilter = function(objGrid)
{
	var sTitle = this.gfnGetWord("popup.datafiltersetting");
	var oArg = {pvGrid:objGrid};
	
	var oOption = {title:sTitle};	//top, left를 지정하지 않으면 가운데정렬 //"top=20,left=370"
	var sPopupCallBack = "gfnGridFilterCallback";
	this.gfnOpenPopup( "cmmGridFilter", "Cmm::CmmGridFilter.xfdl",oArg, sPopupCallBack, oOption);	
};

/**
 * @class 그리드 우클릭 POPUPMENU 내부함수<br>
          셀필터해제(cellfilterfree)
 * @param {Object} objGrid - 대상그리드	
 * @param {Number} nCell - 셀필터 셀 인덱스
 * @return N/A
 * @example
 * this._gfnGridCellFilterFree(this.grdMain);	
 */
pForm._gfnGridCellFilterFree = function(objGrid)
{
	var objDs = objGrid.getBindDataset();
	objDs.set_filterstr("");
};

/**
 * @class 그리드 우클릭 POPUPMENU 내부함수<br>
          찾기/바꾸기
 * @param {Object} objGrid - 대상그리드	
 * @param {Number} nCell - 셀필터 셀 인덱스
 * @return N/A
 * @example
 * this._gfnGridCellReplace(this.grdMain);	
 */
pForm._gfnGridCellReplace = function(objGrid,nCellIndex,nRowIndex)
{
	var sTitle = this.gfnGetWord("popup.datafindreplace");
	var orgselecttype = objGrid.selecttype;

	var oArg = {pvGrid:objGrid, pvStrartRow:nRowIndex, pvSelectCell:nCellIndex, pvSelectType:orgselecttype};
	var oOption = {title:sTitle};	//top, left를 지정하지 않으면 가운데정렬 //"top=20,left=370"
	var sPopupCallBack = "gfnReplaceCallback";
	this.gfnOpenPopup( "cmmFindReplace","Cmm::CmmFindReplace.xfdl",oArg,sPopupCallBack,oOption);	
};

/**
 * @class 그리드 우클릭 POPUPMENU 내부함수<br>
          컬럼 숨기기/보이기
 * @param {Object} objGrid - 대상그리드	
 * @param {Number} nCell - 셀필터 셀 인덱스
 * @return N/A
 * @example
 * this._gfnGridColHideShow(this.grdMain);	
 */
pForm._gfnGridColHideShow = function(objGrid)
{
	var sTitle = this.gfnGetWord("popup.colshwohide");
	
	var oArg = {pvGrid:objGrid};
	var oOption = {title:sTitle};	//top, left를 지정하지 않으면 가운데정렬 //"top=20,left=370"
	var sPopupCallBack = "gfnColumnHidCallback";
	this.gfnOpenPopup( "cmmColumnHide","Cmm::CmmColumnHide.xfdl",oArg,sPopupCallBack,oOption);	
};

/**
 * @class 그리드 우클릭 POPUPMENU 내부함수<br>
          엑셀익스포트
 * @param {Object} objGrid - 대상그리드	
 * @return N/A
 * @example
 * this._gfnGridExcelExport(this.grdMain);	
 */
pForm._gfnGridExcelExport = function(objGrid)
{
	this.gfnExcelExport(objGrid, "*?*?*?*?*?*?*?","");
};

/**
 * @class 그리드 우클릭 POPUPMENU 내부함수<br>
          엑셀임포트
 * @param {Object} objGrid - 대상그리드	
 * @return N/A
 * @example
 * this._gfnGridExcelImport(this.grdMain);	
 */
pForm._gfnGridExcelImport = function(objGrid)
{
	var sDataset = objGrid.binddataset;
	this.gfnExcelImport(sDataset, "sheet1", "A2", "fnImportCallback", objGrid.name + sDataset , this);
};

/**
 * @class 그리드 우클릭 POPUPMENU 내부함수<br>
          그리드 개인화
 * @param {Object} objGrid - 대상그리드	
 * @return N/A
 * @example
 * this._gfnGridPersonalize(this.grdMain);	
 */
pForm._gfnGridPersonalize = function(objGrid)
{
	var sOrgFormat = objGrid.orgformat2;
	var sCurFormat = objGrid.getCurFormatString();
	this._gfnGridPersonalizeExcute(objGrid);
//	//변경된 사항 확인 할 경우 아래 스크립트 사용
// 	if( sOrgFormat == sCurFormat ){
// 		this.gfnAlert("msg.save.nochange","","NoChangeFormat");
// 	}else{
// 		var sId = "ChangeFormat|" + objGrid.name;
// 		this.gfnAlert("confirm.before.save","", sId, "gfnGridFormatChangeMsgCallback");
// 	}
};

/**
 * @class 그리드 우클릭 POPUPMENU 내부함수<br>
          그리드 개인화내용 저장을 위해 유니크한 아이디를 구성한다.
 * @param {Object} objGrid - 대상그리드	
 * @return N/A
 * @example
 * this._gfnGridPersonalize(this.grdMain);	
 */
pForm._getUniqueId = function (objGrid)
{
	var sFormId;
	var oForm = objGrid.parent; //대상FORM조회
	while (true)
	{
		if(oForm instanceof nexacro.ChildFrame){
			break;
		}else{
			oForm = oForm.parent;
		}
	}
	sFormId = oForm.name;
	if( sFormId.indexOf("win") > -1 ){
		//팝업과 workform구분
		sFormId = oForm.form.divWork.form.name;
	}
	
	var otf = objGrid.parent.parent;
	if( otf instanceof nexacro.Tabpage){
		//탭안에 그리드가 있을경우
		sFormId += "_" + otf.parent.name +"_"+ otf.name;
	}else if( otf instanceof nexacro.Div && otf.name != "divWork"){
		//div안에 그리드가 있을경우
		sFormId += "_" + otf.name;
	}
	sFormId += "_" + objGrid.name;
	return sFormId;
};

/**
 * @class 그리드 우클릭 POPUPMENU 내부함수<br>
          그리드 개인화실행.
 * @param {Object} objGrid - 대상그리드	
 * @return N/A
 * @example
 * this._gfnGridPersonalize(this.grdMain);	
 */
pForm._gfnGridPersonalizeExcute = function (objGrid)
{
	var sFormatId 	= this._getUniqueId(objGrid);
	var sFormat 	= objGrid.getCurFormatString(false);
	var sOrgFormats = objGrid.getFormatString();

	var objApp = pForm.gfnGetApplication();
	var objGds = objApp.gdsGridPersonal;
	
	var nFindRow = objGds.findRow("sFormatId", sFormatId);
	if( nFindRow == -1 ){
		var nRow = objGds.addRow();
		objGds.setColumn(nRow, "sFormatId", sFormatId);
		objGds.setColumn(nRow, "sFormat", sFormat);
		objGds.setColumn(nRow, "sOrgFormat", sOrgFormats);
	}else{
		objGds.setColumn(nFindRow, "sFormat", sFormat);
		//objGds.setColumn(nFindRow, "sOrgFormat", sOrgFormats);
	}
	var sXML = objGds.saveXML();
	nexacro.setPrivateProfile("gdsGridPersonal", sXML);	
	this.gfnAlert("msg.save.success","","saveSuccess","gfnGridFormatChangeMsgCallback");
};
//////////////////////////////////////////////////////////////////////////POPUPMENU CALLBACK///////////////////////////////////////////////////////////

/**
 * @class 그리드 우클릭 POPUPMENU 내부함수<br>
          그리드 개인화 메세지콜백
 * @param {String} sid - popupid	
 * @param {String} rtn - return value	 
 * @return N/A
 * @example
 * this.gfnGridFormatChangeFormatCallback("TEST", "");	
 */
pForm.gfnGridFormatChangeMsgCallback = function (sid, rtn)
{
	//TODO.
};

/**
 * @class 그리드 우클릭 POPUPMENU 내부함수<br>
          그리드 찾기/바꾸기 팝업 콜백
 * @param {String} sid - popupid	
 * @param {String} rtn - return value	 
 * @return N/A
 * @example
 * this.gfnReplaceCallback("TEST", "");	
 */
pForm.gfnReplaceCallback = function (sid, rtn)
{
	//TODO
};

/**
 * @class 그리드 우클릭 POPUPMENU 내부함수<br>
          그리드 필터 팝업 콜백
 * @param {String} sid - popupid	
 * @param {String} rtn - return value	 
 * @return N/A
 * @example
 * this.gfnGridFilterCallback("TEST", "");	
 */
pForm.gfnGridFilterCallback = function (sid, rtn)
{
	//TODO
};

/**
 * @class 그리드 우클릭 POPUPMENU 내부함수<br>
          그리드 컬럼숨기기/보이기
 * @param {String} sid - popupid	
 * @param {String} rtn - return value	 
 * @return N/A
 * @example
 * this.gfnColumnHidCallback("TEST", "");	
 */
pForm.gfnColumnHidCallback = function (sid, rtn)
{
	//TODO
};

//////////////////////////////////////////////////////////////////////////POPUPMENU FUNCTION///////////////////////////////////////////////////////////
/**
 * @class   주어진 문자열을 그리드에서 찾는다.
 * @param {Object} grid - 대상그리드	
 * @param {String} findText - 찾을 문자열	
 * @param {Object} option - 찾기옵션	
 * @return {Object} 찾은 열과행
 * @example
 * this.gfnFindGridText(this.fv_grid, txt, option);
 */
pForm.gfnFindGridText = function (grid, findText, option)
{
	grid.lastFindText = findText;
	grid.lastFindOption = option;

	// 찾을 옵션
	var direction = option.direction;
	var position = option.position;
	var scope = option.scope;
	var condition = option.condition;
	var strict = option.strict;

	var dataset = grid.getBindDataset();
	var startCell = ( position == "current" ? grid.currentcell : grid.lastFindCell );
	var startRow = ( position == "current" ? grid.currentrow : grid.lastFindRow );
	
	// 바꾸기에서 호출시 (option.cell 은 바꾸기에서만 지정)
	if ( scope == "col" && !this.gfnIsNull(option.cell) )
	{
		startCell = option.cell;
	}
	
	var findRow = findCell = -1;
	var rowCnt = dataset.rowcount;
	var bodyCellCnt = grid.getCellCount("body");
			
	// 대소문자 구분
	if ( !strict )
	{
		findText = findText.toUpperCase();			
	}
		
	if ( direction == "prev" )
	{
		startRow -= 1;	
		if ( startRow < 0 )
		{
			startRow = rowCnt-1;
		}
	}
	else
	{
		startRow += 1;
		if ( startRow >= rowCnt )
		{
			startRow = 0;
		}
	}
	
	var loopCnt = rowCnt;
	while ( loopCnt > 0 )
	{
		// 문자열 비교
		if ( this._compareFindText(grid, startRow, startCell, findText, condition, strict) )
		{
			findRow = startRow;
			findCell = startCell;
			break;
		}
		
		// 방향 (이전, 다음)
		if ( direction == "prev" )
		{
			startRow -= 1;
			if ( startRow < 0 )
			{
				startRow = rowCnt-1;
			}				
		}
		else
		{
			startRow += 1;
			if ( startRow > (rowCnt-1) )
			{
				startRow = 0;
			}
		}
		
		loopCnt--;
	}
	// 마지막 찾은 위치 지정
	// 팝업에서 찾을 방향을 "처음부터" 로 변경 시 초기화
	if ( findRow > -1 && findCell > -1 )
	{
		grid.lastFindRow = findRow;
		grid.lastFindCell = findCell;
	}
	
	return [findRow, findCell];
};

/**
 * @class   주어진 문자열을 그리드에서 찾아서 바꿀 문자열로 변경한다.
 * @param {Object} grid - 대상 Grid Component
 * @param {String} findText - 찾을 문자열
 * @param {String} replaceText - 바꿀 문자열
 * @param {Object} option - 찾을 옵션
 * @param {Boolean} all - 모두 바꾸기 여부
 * @return {Number} 변경 항목 개수.
 * @example
 *this.gfnReplaceGridText(grid, findText, replaceText, option, bAllChg);
 */
pForm.gfnReplaceGridText = function(grid, findText, replaceText, option, all)
{
	// F3 발생 시 마지막 찾은 문자열 계속 찾기 위해 값 지정
	grid.lastFindText = findText;
	grid.lastFindOption = option;
	
	if ( this.gfnIsNull(all) )
	{
		all = false;
	}
	
	
	// 찾을 옵션 ( 바꾸기의 범위는 특정 칼럼만 지원) 
	var direction = option.direction;
	var position = option.position;
	var condition = option.condition;
	var strict = option.strict;
	var cell = option.cell;
	
	var dataset = grid.getBindDataset();//this.gfnLookup(grid.parent, grid.binddataset);
	
	// 바꾸기의 범위는 특정 칼럼만 지원
	var startCell = option.cell;
	var startRow;
	
	if ( position == "current" )
	{
		startRow = grid.currentrow;
	}
	else
	{
		var lastReplaceRow = grid.lastReplaceRow;
		if ( this.gfnIsNull(lastReplaceRow) )
		{
			startRow = 0;
		}
		else
		{
			startRow = lastReplaceRow;
		}
	}
	
	var results = [];
	var findRow = findCell = -1;		
	var rowCnt = dataset.rowcount;
	var bodyCellCnt = grid.getCellCount("body");
	
	// 바꿀 문자열 목록에 등록
	//this.appendFindReplaceCache("replace", replaceText);
	
	// 대소문자 구분
	if ( !strict )
	{
		findText = findText.toUpperCase();	
	}
	
	// 열 범위 바꾸기
	var result;
	var loopCnt = rowCnt;
	while ( loopCnt > 0 )
	{
		// 문자열 비교
		if ( this._compareFindText(grid, startRow, startCell, findText, condition, strict) )
		{
			findRow = startRow;
			findCell = startCell;
			result = this._replaceGridCellText(grid, findRow, findCell, findText, replaceText, strict);
			results.push(result);
			if ( !all ) break;
		}
		
		// 방향 (이전, 다음)
		if ( direction == "prev" )
		{
			startRow -= 1;
			if ( startRow < 0 )
			{
				startRow = rowCnt-1;
			}				
		}
		else
		{
			startRow += 1;
			if ( startRow > (rowCnt-1) )
			{
				startRow = 0;
			}
		}
		
		loopCnt--;
	}
		
	// 마지막 바꾸기 위치 지정
	grid.lastReplaceRow = findRow;
	return results;
};

 /**
 * @class   바꾸기에 의해 찾아진 행, 셀 인덱스에 해당하는 데이터를 실제 변경한다.
 * @param {Object} grid 대상 Grid Component
 * @param {Number} findRow 찾아진 행 인덱스
 * @param {Number} findCell 찾아진 셀 인덱스
 * @param {String} findText 찾을 문자열
 * @param {String} replaceText 바꿀 문자열
 * @param {Boolean} strict 대소문자 구분
 * @return {Object} result - 결과
 * @example
 * this._replaceGridCellText(grid, findText, replaceText, option, bAllChg);
 */
pForm._replaceGridCellText = function(grid, findRow, findCell, findText, replaceText, strict)
{
	var result = {'replace': true, 'message': '처리되었습니다.', 'row': findRow, 'cell': findCell};
	
	// expr 등에 의해 셀이 실제 입력 가능한지 테스트 후 처리
	var dataset = grid.getBindDataset();//this.gfn_Lookup(grid.parent, grid.binddataset);
	dataset.set_rowposition(findRow);
	grid.setCellPos(findCell);
// 	trace(grid + " :::: " + grid.name);
// 	trace("111111111111111111 findRow :: " + findRow + " findCell :: " + findCell)
// 	trace("111111111111111111 dataset :: " + dataset.name);
//	var editable = grid.showEditor(true);
// 	trace("111111111111111111 editable :: " + editable);
// 	if ( editable )
// 	{
// 		grid.showEditor(false);
// 	}
// 	else
// 	{
// 		 return;
// 	}
	var displayType = grid.getCellProperty("body", findCell, "displaytype");
	var editType 	= grid.getCellProperty("body", findCell, "edittype");
	var text 		= grid.getCellProperty("body", findCell, "text");
	var bindColid 	= text.replace("bind:", "");
	
	// displayType 이 normal일 경우
	// dataType 을 체크하여 displayType 을 변경
	var dataType = this.gfnGetBindColumnType(grid, findCell);
	if ( this.gfnIsNull(displayType) || displayType == "normal" )
	{
		switch(dataType)
		{
			case 'INT' :
			case 'FLOAT' :
			case 'BIGDECIMAL' :
				displayType = "number";
				break;
			case 'DATE' :
			case 'DATETIME' :
			case 'TIME' :
				displayType = "date";
				break;
			default :
				displayType = "text";
		}
	}
	
	var replace;
	var replaceVal;
	var columnValue = dataset.getColumn(findRow, bindColid);
	var displayValue = grid.getCellText(findRow, findCell);
	if ( displayType == "number" || displayType == "currency" )
	{
		// currency 의 경우 원(￦) 표시와 역슬레시(\) 다르므로 제거 후 변경
		if ( displayType == "currency" )
		{
			var code = findText.charCodeAt(0);
			if ( code == 65510 || code == 92 )
			{
				findText = findText.substr(1);
			}
			
			code = replaceText.charCodeAt(0);
			if ( code == 65510 || code == 92 )
			{
				replaceText = replaceText.substr(1);
			}
			
			code = displayValue.charCodeAt(0);
			if ( code == 65510 || code == 92 )
			{
				displayValue = displayValue.substr(1);
			}			
		}
		
		// 셀에 보여지는 값에서 찾는 문자열 값을 변경
		
		// 대소문자 구분
		if ( strict )
		{
			displayValue = displayValue.replace(findText, replaceText);
		}
		else
		{
			displayValue = this.gfnReplaceIgnoreCase(displayValue, findText, replaceText);
		}		
		
		// 숫자형 이외 제거
		replaceVal = this._replaceNumberMaskValue(displayValue);
	}
	else if ( displayType == "date"|| displayType == "calendarcontrol" )
	{
		if ( columnValue == null )
		{
			// 값이 없을때 보이는 "0000-01-01" 과 같이 
			// 텍스트에서 찾아 질 경우가 있다.
			result.replace = false;
			result.message = "유효한 날짜가 아닙니다.";
		}
		else	
		{							
			var mask = grid.getCellProperty("body", findCell, "calendardateformat");
			var ret = this._replaceDateMaskValue(columnValue, displayValue, findText, replaceText, mask, strict);			
			replaceVal = ret[1];
			
			if ( ret[0] == false )
			{
				result.replace = false;
				result.message = ret[2];
			}
		}
	}
	else
	{
		// 대소문자 구분
		if ( strict )
		{
			replaceVal = columnValue.replace(findText, replaceText);
		}
		else
		{
			replaceVal = this.gfnReplaceIgnoreCase(columnValue, findText, replaceText);
		}					
	}
		
	if ( result.replace )
	{
		dataset.setColumn(findRow, bindColid, replaceVal);
	}
	
	return result;
};

 /**
 * @class   문자열을 대소문자 구별없이 주어진 변경문자열(문자) 치환한다.
 * @param {String} sOrg - 원래 문자열( 예 : "aaBBbbcc" )
 * @param {String} sRepFrom - 찾고자 하는 문자열( 예 : "bb" )
 * @param {String} sRepTo - 치환될 문자열 ( 예 : "xx" )
 * @return {String} 치환된 문자열 ( 예 : "aaxxxxccxx" ).
 * @example
 * this.gfnReplaceIgnoreCase(str, findStr, "x");
 */
pForm.gfnReplaceIgnoreCase = function( sOrg, sRepFrom, sRepTo )	
{
	var pos, nStart=0, sRet="";
	
	while(1)
	{
		pos = sOrg.toLowerCase().indexOf(sRepFrom.toLowerCase(), nStart)
		
		if( pos < 0 )
		{
			sRet += sOrg.substr( nStart );
			break;
		}
		else
		{
			sRet += sOrg.substr( nStart, pos - nStart);
			sRet += sRepTo;
			nStart = pos+sRepFrom.length;
		}
	}
	
	return sRet;
};

 /**
 * @class  날짜형으로 마스크 처리된 문자열에서 실제 값을 얻어온다.
 * @param {*} columnValue - 변경전 데이터셋의 실제 값
 * @param {String} displayValue - 보여지는 문자열
 * @param {String} findText - 찾을 문자열
 * @param {String} replaceText - 바꿀 문자열
 * @param {String} mask - 마스크 속성값
 * @param {Boolean} strict - 대소문자 구분 여부
 * @return {Object} 변환정보 (날짜여부, 변경된 문자열, 에러메시지)
 * @example
 * this._replaceDateMaskValue(str, findStr, "x");
 */
pForm._replaceDateMaskValue = function(columnValue, displayValue, findText, replaceText, mask, strict)
{		
	if ( this.gfnIsNull(replaceText) )
	{
		// 바꿀 문자열이 빈값이 되지 않도록 패딩
		replaceText = replaceText.padRight(findText.length, " ");
	}
	
	// 1. 현재 보이는 값에서 문자열을 찾아 바꿀 문자열로 변경
	var replaceDisplayValue;
	
	// 대소문자 구분
	if ( strict )
	{
		replaceDisplayValue = displayValue.replace(findText, replaceText);
	}
	else
	{
		replaceDisplayValue = this.gfnReplaceIgnoreCase(displayValue, findText, replaceText);
	}
	
	// 바꿀 값이 없다면 값을 제거한다.
	if ( this.gfnIsNull(replaceDisplayValue.trim()) )
	{
		return [true, null];
	}
	
	// 2. mask 문자 분리
	var arrMask = this._parseDateMask(mask);
	
	// 3. 변경한 값과 마스크 값을 비교하면서 실제 값을 추출하고 유효날짜 판단
	var tmpStr = "";
	var isDate = true;
	var errorMsg = "";
	var valueIndex = 0;
	var displayIndex = 0;
	var dateValue = [];
	var errorValue = [];
	var checkMask;
	var checkDayIndex = -1;
	var checkYearValue = "";
	var checkMonthValue = "";
	
	for ( var i=0,len=arrMask.length; i<len ; i++ )
	{
		checkMask = arrMask[i];
		if ( !this.gfnIsDigit(checkMask) )
		{
			switch (checkMask)
			{
				case 'yyyy' :
					tmpStr = replaceDisplayValue.substr(displayIndex, 4);
					
					if ( tmpStr.length != 4 || !nexacro.isNumeric(tmpStr) )
					{
						isDate = false;	
						errorMsg = "연도가 올바르지 않습니다.";
					}
					
					// 일자체크를 위해
					checkYearValue = tmpStr;
					
					dateValue[dateValue.length] = tmpStr.trim(" ");
					errorValue[errorValue.length] = tmpStr.trim(" ");
					displayIndex += 4;					
					valueIndex += 4;
					break;
				case 'yy' :
				case 'MM' :
				case 'dd' :
				case 'hh' :
				case 'HH' :
				case 'mm' :
				case 'ss' :
					tmpStr = replaceDisplayValue.substr(displayIndex, 2);
										
					if ( tmpStr.length == 2 && nexacro.isNumeric(tmpStr) )
					{
						if ( checkMask == "yy" )
						{
							// 앞 두자리를 원본 데이터로 채운다.
							tmpStr = columnValue.substr(valueIndex, 2) + tmpStr;
							
							// 일자체크를 위해
							checkYearValue = tmpStr;
						}					
						else if ( checkMask == "MM" )
						{
							if ( parseInt(tmpStr) < 1 || parseInt(tmpStr) > 12 )
							{
								isDate = false;
								errorMsg = "월이 올바르지 않습니다.";
							}
							
							// 일자체크를 위해
							checkMonthValue = tmpStr;
						}
						else if ( checkMask == "dd" )
						{
							// 윤년을 적용하기 위해서는 연도가 필요한데 
							// 무조건 연도(yyyy, yy)가 일(dd) 보다 앞에 온다는
							// 보장이 없으므로 루프가 끝난 후 체크한다.
							checkDayIndex = dateValue.length;
						}
						else if ( checkMask == "hh" || checkMask == "HH" )
						{
							if ( parseInt(tmpStr) < 0 || parseInt(tmpStr) > 23 )
							{
								isDate = false;
								errorMsg = "시간이 올바르지 않습니다.";
							}
						}
						else if ( checkMask == "mm" || checkMask == "ss" )
						{
							if ( parseInt(tmpStr) < 0 || parseInt(tmpStr) > 59 )
							{
								isDate = false;
								errorMsg = "분이 올바르지 않습니다.";
							}
						}
					}
					else
					{
						isDate = false;
						errorMsg = "날짜 형식이 올바르지 않습니다.";
					}
					
					dateValue[dateValue.length] = tmpStr.trim(" ");	
					errorValue[errorValue.length] = tmpStr.trim(" ");	
					displayIndex += 2;
					valueIndex += 2;
					break;
			} // end switch
		}
		else
		{
			// dateValue 는 실제 적용할 값이므로 skip 하자
			
			// 마스크 문자가 아닌 경우 표시문자 이므로 원래 값의 것을 사용
			errorValue[errorValue.length] = displayValue.charAt(checkMask);
			displayIndex += 1;
		}
	}
	
	// 일자 유효 체크
	if ( !this.gfnIsNull(checkYearValue) && 
	     !this.gfnIsNull(checkMonthValue) && checkDayIndex > -1 )
	{
		var dt = checkYearValue + checkMonthValue + "01";
		var inputDay = parseInt(dateValue[checkDayIndex]);
		var lastDay = this.gfnGetMonthLastDay(dt);
	}
	
	if ( isDate )
	{
		return [isDate, dateValue.join("")];
	}
	else
	{
		return [isDate, errorValue.join(""), errorMsg];
	}
};

/**
 * @class  날짜형 마스크 구문을 분석합니다.
 * @param {String} mask - mask 마스크 속성값
 * @return {Object} 구문값
 * @example
 * this._parseDateMask("yyyy-MM-dd");
 */
pForm._parseDateMask = function(mask)
{
	arrMask = [];
	var dateMaskCache;
	var maskArr = mask.split("");	
	var tmpStr = "";
	var tokenStr = "";
	var seq = 0;

	for (var i=0,len=mask.length; i<len;)
	{
		tmpStr = mask.substr(i, 4);
		if ( tmpStr == "yyyy" )
		{
			arrMask[seq] = tmpStr;
			i += 4;
			seq++;
			continue;
		}
		
		// ddd => 요일은 입력할 수 없다.		
		tmpStr = mask.substr(i, 3);
		if ( tmpStr == "ddd" )
		{
			//arrMask[seq] = tmpStr;
			i += 3;
			//seq++;
			continue;
		}						
		
		// hh의 경우 (Calendar는 HH이며 그리드는 둘다 동작함)
		tmpStr = mask.substr(i, 2);
		if ( tmpStr == "yy" || tmpStr == "MM" || tmpStr == "dd" ||
			 tmpStr == "HH" || tmpStr == "hh" || tmpStr == "mm" || tmpStr == "ss" )
		{
			arrMask[seq] = tmpStr;
			i += 2;
			seq++;
			continue;
		}
		
		tokenStr = maskArr[i];
		
		// 입력되지 않으므로 skip.
		if ( tokenStr == "H" || tokenStr == "M" ||
			 tokenStr == "d" || tokenStr == "m" || tokenStr == "s" )
		{
			//arrMask[seq] = tokenStr;
			//seq++;
		}
		else
		{
			arrMask[seq] = i;
			seq++;					
		}
		i++;
	}
	
	//dateMaskCache[mask] = arrMask;
	
	return arrMask;
};

 /**
 * @class  숫자형으로 마스크 처리된 문자열에서 실제 값을 얻어온다.
 * @param {String} mask - 숫자형 문자열
 * @return {String} 변환값 문자열
 * @example
 * this._replaceNumberMaskValue("20170808");
 */
pForm._replaceNumberMaskValue = function(numString)
{
	numString = numString.trim();
	
	var numReg = /[0-9]/;
	var bPoint = false; // 소숫점은 1개만 인정.
	var bInside = false; // 부호는 숫자가 나오기 전에만 인정.
	var c, buf = [];
	
	for(var i=0, len=numString.length; i<len; i++ ) 
	{
		c = numString.charAt(i);
		if( ( c == '+' || c == '-') && ( bInside === false) ) 
		{
			// 부호는 숫자가 나오기 전에만 인정.
			buf.push(c);
			bInside = true;
		}
		else if( numReg.test(c) ) 
		{
			// 숫자인경우 인정.
			buf.push(c);
			bInside = true;
		}
		else if( c == "." && bPoint === false ) 
		{
			// 소숫점은 1회만 인정.
			buf.push(c);
			bPoint = true;
			bInside = true;
		}
		else if( c != "," )
		{
			return "";
		}
	}
	return buf.join("");
};

 /**
 * @class   주어진 행, 셀 인덱스에 해당하는 그리드 데이터와 <br>
 * 문자열을 비교하여 찾아진 결과를 반환
 * @param {Object} grid - 대상 Grid Component
 * @param {Number} row - 찾을 행 인덱스
 * @param {Number} cell - 찾을 셀 인덱스
 * @param {String} findText - 찾을 문자열
 * @param {String} condition - 찾을 조건(equal/inclusion)
 * @param {Boolean} strict - 대소문자 구분 (true/false)
 * @return {Boolean} - 찾기 성공.
 * @example
 * this._compareFindText(grid, startRow, startCell, findText, condition, strict) 
 */
pForm._compareFindText = function(grid, row, cell, findText, condition, strict)
{
	var cellText = grid.getCellText(row, cell);
	if( this.gfnIsNull(cellText))return;
	var displayType = grid.getCellProperty("body", cell, "displaytype");
		
	// displayType 이 normal일 경우
	// dataType 을 체크하여 displayType 을 변경
	if ( this.gfnIsNull(displayType) || displayType == "normal" )
	{
		var dataType = this.gfnGetBindColumnType(grid, cell);
		switch(dataType)
		{
			case 'INT' :
			case 'FLOAT' :
			case 'BIGDECIMAL' :
				displayType = "number";
				break;
			case 'DATE' :
			case 'DATETIME' :
			case 'TIME' :
				displayType = "date";
				break;
			default :
				displayType = "string";
		}
	}
	
	// currency 의 경우 원(￦) 표시와 역슬레시(\) 다르므로 제거 후 비교
	if ( displayType == "currency" )
	{
		var code = cellText.charCodeAt(0);
		if ( code == 65510 || code == 92 )
		{
			cellText = cellText.substr(1);
		}
		
		code = findText.charCodeAt(0);
		if ( code == 65510 || code == 92 )
		{
			findText = findText.substr(1);
		}
	}

	// 대소문자 구분
	if ( !strict )
	{
		cellText = cellText.toUpperCase();
	}
	// 일치/포함
	if ( condition == "equal" )
	{
		if ( findText == cellText )
		{
			return true;
		}
	}
	else 
	{
		if ( cellText.indexOf(findText) > -1 )
		{			
			return true;
		}
	}

	return false;
};

 /**
 * @class   데이터의 타입반환
 * @param {Object} grid - 대상 Grid Component
 * @param {Number} cell - 찾을 셀 
 * @return {Object} - 찾기 성공.
 * @example
 *  this.gfnGetBindColumnType(grid, cell);
 */
pForm.gfnGetBindColumnType = function(grid, cell)
{
	var dataType = null;
	var dataset = this.gfnLookup(grid.parent, grid.binddataset);
	var bindColid = grid.getCellProperty("body", cell, "text");
		bindColid = bindColid.replace("bind:", "");
	
	if ( !this.gfnIsNull(bindColid) )
	{
		var colInfo = dataset.getColumnInfo(bindColid);
		if ( !this.gfnIsNull(colInfo) )
		{
			dataType = colInfo.type;
		}
	}
	
	return dataType;
};

//////////////////////////////////////////////////////////////////////////CELL COPY AND PASTE//////////////////////////////////////////////////////////////////////////
/**
 * @class copy event(nexacro, ie)
 * @param {Object} obj- 대상그리드
 * @param {Event}  e - key down event
 * @return N/A
 * @example
 * this._gfnGridCopyEventForRuntime(obj, e);	
*/
pForm._gfnGridCopyEventForRuntime = function (obj, e)
{
	var startrow = nexacro.toNumber(obj.selectstartrow);
	if( startrow == -9) return;

	var endrow   = nexacro.toNumber(obj.selectendrow);
	if( endrow == -9) return;
	
	var startcol = 0;
	var endcol = 0;
	
	if( obj.selecttype == "row" || obj.selecttype == "multirow"){
		startcol = 0;
		endcol = obj.getCellCount("body")-1;
	}else{
		startcol = nexacro.toNumber(obj.selectstartcol);
		endcol   = nexacro.toNumber(obj.selectendcol);
	}
	var colSeperator = "\t";
	var copyData = "";
	var checkIndex = {};
	
	for (var i = startrow; i <= endrow; i++) {
		for (var j = startcol; j <= endcol; j++) {
			var value = obj.getCellValue(i,j);
			if(!this.gfnIsNull(value)) {
				if (j < endcol) {
					copyData += obj.getCellValue(i,j) + colSeperator;
				} else {
					copyData += obj.getCellValue(i,j);
				}
			}
		}
		if (i < obj.selectendrow) {
				copyData += "\r\n";
		}
	}

	copyData += "\r\n";
	system.clearClipboard();
	system.setClipboard("CF_TEXT",copyData);


	var areaInfo = {"startrow": startrow, "startcol": startcol, "endrow": endrow, "endcol": endcol};
};

/**
 * @class paste데이터생성
 * @param {String} browser - 브라우저
 * @return paste데이터 
 * @example
 * this._gfnGirdGetPasteData("nexacro");	
*/
pForm._gfnGirdGetPasteData = function (browser)
{
	var copyData = "";
	if( browser == "nexacro" || browser == "IE"){
		copyData = system.getClipboard("CF_TEXT");
		copyData = new String(copyData);
	}else{
		var ta = this.tragetGrid["ta"];

		if(!ta) return;
		
		copyData = ta.value;
		document.body.removeChild(ta);
		
		this.tragetGrid["ta"] = undefined;		
	}
	return copyData;
	
};

/**
 * @class paste event
 * @param {Object} obj- 대상그리드
 * @param {Event}  e - key down event
 * @return N/A
 * @example
 * this._gfnGridPasteEvent(obj, e);	
*/
pForm._gfnGridPasteEvent = function (obj, e)
{
	var browser = system.navigatorname;
	var copyData = this._gfnGirdGetPasteData(browser);
		
	if( this.gfnIsNull(copyData)){
		var copyData ="";
		var ta = this._createTextarea("");
		
		nexacro._OnceCallbackTimer.callonce(this, function() {
		
			var colSeperator = "\t";
			var rowData ="";
			if( browser == "nexacro" || browser =="IE"){
				rowData = copyData.split("\r\n");
				if(rowDataCount < 1) {
					e.stopPropagation();
					return;
				}
			}else{
				copyData = ta.value;
				rowData = copyData.split(/[\n\f\r]/); 
			}
			var rowDataCount = rowData.length - 1;					
			
			obj.set_enableevent(false);
			obj.set_enableredraw(false); 

			var datasetName = obj.binddataset;
			var ds = obj.getBindDataset();

			ds.set_enableevent(false); 

			var grdCellCount = obj.getCellCount("body");
			var rowCount = ds.getRowCount();
			
			var startrow = nexacro.toNumber(obj.selectstartrow);
			if( startrow == -9) return;

			var endrow   = nexacro.toNumber(obj.selectendrow);
			if( endrow == -9) return;
			
			var startcol = 0;
			var endcol = 0;
			
			if( obj.selecttype == "row" || obj.selecttype == "multirow"){
				startcol = 0;
				endcol = obj.getCellCount("body")-1;
			}else{
				startcol = nexacro.toNumber(obj.selectstartcol);
				endcol   = nexacro.toNumber(obj.selectendcol);
			}

			var currRow = startrow;
			var cellIndex = startcol;
			var maxColumnCount = 0;
			var checkIndex = {};	

			for (var i = 0; i < rowDataCount; i++)
			{
				if(rowCount <= currRow)
				{
					ds.addRow();
				}

				var columnData = rowData[i].split(colSeperator);
				var columnLoopCount = cellIndex + columnData.length;

				if(columnLoopCount > grdCellCount) {
					columnLoopCount = grdCellCount;
				}

				if(maxColumnCount < columnLoopCount) {
					maxColumnCount = columnLoopCount;
				}

				var k = 0;
				for(var j = cellIndex; j < columnLoopCount; j++) 
				{
					var colTemp = obj.getCellProperty("body", j, "text");
					var colid;
					if( this.gfnIsNull(colTemp) )
					{
						colid = obj.getCellProperty("body", j, "text");
					}
					else
					{
						colid = obj.getCellProperty("body", j, "text").substr(5);
					}
					
					var tempValue = columnData[k];
					if(!this.gfnIsNull(tempValue))
					{
						ds.setColumn(currRow, colid, tempValue);
					}
					k++;
				}
				currRow++;
			}

			ds.rowposition = currRow;	

			endrow = endrow + rowDataCount - 1;
			endcol = maxColumnCount - 1;
			
			system.clearClipboard();

			obj.set_enableredraw(true);
			obj.set_enableevent(true);
			ds.set_enableevent(true); 

			obj.selectArea(startrow, startcol, endrow, endcol);
			
			var areaInfo = {"startrow": startrow, "startcol": startcol, "endrow": endrow, "endcol": endcol};
			e.stopPropagation();				
			
		}, 100);		
		
	
	}else{
	
		var colSeperator = "\t";
		var rowData ="";
		if( browser == "nexacro" || browser =="IE"){
			rowData = copyData.split("\r\n");
			if(rowDataCount < 1) {
				e.stopPropagation();
				return;
			}
		}else{
			rowData = copyData.split(/[\n\f\r]/); 
		}
		var rowDataCount = rowData.length - 1;

				
		
		obj.set_enableevent(false);
		obj.set_enableredraw(false); 

		var datasetName = obj.binddataset;
		var ds = obj.getBindDataset();

		ds.set_enableevent(false); 

		var grdCellCount = obj.getCellCount("body");
		var rowCount = ds.getRowCount();
		
		var startrow = nexacro.toNumber(obj.selectstartrow);
		if( startrow == -9) return;

		var endrow   = nexacro.toNumber(obj.selectendrow);
		if( endrow == -9) return;
		
		var startcol = 0;
		var endcol = 0;
		
		if( obj.selecttype == "row" || obj.selecttype == "multirow"){
			startcol = 0;
			endcol = obj.getCellCount("body")-1;
		}else{
			startcol = nexacro.toNumber(obj.selectstartcol);
			endcol   = nexacro.toNumber(obj.selectendcol);
		}

		var currRow = startrow;
		var cellIndex = startcol;
		var maxColumnCount = 0;
		var checkIndex = {};	

		for (var i = 0; i < rowDataCount; i++)
		{
			if(rowCount <= currRow)
			{
				ds.addRow();
			}

			var columnData = rowData[i].split(colSeperator);
			var columnLoopCount = cellIndex + columnData.length;

			if(columnLoopCount > grdCellCount) {
				columnLoopCount = grdCellCount;
			}

			if(maxColumnCount < columnLoopCount) {
				maxColumnCount = columnLoopCount;
			}

			var k = 0;
			for(var j = cellIndex; j < columnLoopCount; j++) 
			{
				var colTemp = obj.getCellProperty("body", j, "text");
				var colid;
				if( this.gfnIsNull(colTemp) )
				{
					colid = obj.getCellProperty("body", j, "text");
				}
				else
				{
					colid = obj.getCellProperty("body", j, "text").substr(5);
				}
				
				var tempValue = columnData[k];
				if(!this.gfnIsNull(tempValue))
				{
					ds.setColumn(currRow, colid, tempValue);
				}
				k++;
			}
			currRow++;
		}

		ds.rowposition = currRow;	

		endrow = endrow + rowDataCount - 1;
		endcol = maxColumnCount - 1;
		
		system.clearClipboard();

		obj.set_enableredraw(true);
		obj.set_enableevent(true);
		ds.set_enableevent(true); 

		obj.selectArea(startrow, startcol, endrow, endcol);
		
		var areaInfo = {"startrow": startrow, "startcol": startcol, "endrow": endrow, "endcol": endcol};
		e.stopPropagation();	
	}	
};

/**
 * @class copy event(chrome)
 * @param {Object} obj- 대상그리드
 * @param {Event}  e - key down event
 * @return N/A
 * @example
 * this._gfnGridCopyEventForChrome(obj, e);	
*/
pForm._gfnGridCopyEventForChrome = function (obj, e)
{
	var startrow = nexacro.toNumber(obj.selectstartrow);
	if( startrow == -9) return;

	var endrow   = nexacro.toNumber(obj.selectendrow);
	if( endrow == -9) return;
	
	var startcol = 0;
	var endcol = 0;
	
	if( obj.selecttype == "row" || obj.selecttype == "multirow"){
		startcol = 0;
		endcol = obj.getCellCount("body")-1;
	}else{
		startcol = nexacro.toNumber(obj.selectstartcol);
		endcol   = nexacro.toNumber(obj.selectendcol);
	}

	var colSeperator = "\t";
	var copyData = "";
	
	for (var i = startrow; i <= endrow; i++) {
		for (var j = startcol; j <= endcol; j++) {
			var value = obj.getCellValue(i,j);
			if(!this.gfnIsNull(value)) {
				if (j < endcol) {
					copyData += obj.getCellValue(i,j) + colSeperator;
				} else {
					copyData += obj.getCellValue(i,j);
				}
			}
		}
		if (i < obj.selectendrow) {
				copyData += "\r\n";
		}
	}

	copyData += "\r\n";
	
	var ta = this._createTextarea(copyData);
	this.tragetGrid = obj;
	this.tragetGrid["ta"] = ta;
	var areaInfo = {"startrow": startrow, "startcol": startcol, "endrow": endrow, "endcol": endcol};
	e.stopPropagation();
};

/**
 * @class cell copy and paste (크롬용 텍스트에어리어생성)
 * @param {String} innerText- value
 * @return{Object} 텍스트에어리어 오브젝트
 * @example
 * this._createTextarea("꼬부기");	
*/
pForm._createTextarea = function(innerText)
{
	var ta = document.createElement('textarea');
	ta.id = "textAreabyCopyAndPaste";
	ta.style.position = 'absolute';
	ta.style.left = '-1000px';
	ta.style.top = document.body.scrollTop + 'px';
	ta.value = innerText;
	
	document.body.appendChild(ta);
	ta.select();
	document.execCommand("copy"); 
	return ta;
};


/************************************************************************************************
*  Grid vscroll 를 통한 Scroll 처리
************************************************************************************************/

pForm.G_GRID_PAGESIZE = "records";   	 // 페이징 조회 시 레코드 갯수
pForm.G_GRID_STARTROW = "recordsOffset";  // 페이징 조회 시 시작 번호

/**
 * @class    대용량 조회시 Grid의 스크롤이 End 로 이동시 자동으로 재 조회해서 Dataset을 Append하게 처리
 * @param 	 {Grid}     대상 그리드
 * @param 	 {Dataset}  검색조건 대상 Dataset
 * @param 	 {String}   조회 함수
 * @param 	 {Integer}  페이징 사이즈 크기
 * @param 	 {Integer}  Total Count 표시
 * @param 	 {Button}   다음 버튼
 * @return 	 N/A
 */
pForm.gfnsetGridAppend = function(grid, dataset, targetfunction, pagesize, objCnt, btnNext)
{
    grid.appendPagesize       = pagesize;
    grid.appendDataset        = dataset;
    grid.appendSearchfunction = targetfunction;
	grid.appendGridcount      = objCnt;

    dataset.appendPagesize    = pagesize;
    dataset.appendDataset     = grid.getBindDataset();
    dataset.appendGrid        = grid;

    // Total Count 표시 처리
    if (objCnt) grid.appendGridcount = objCnt;

    // 다음 버튼 있을 경우 다음 페이지 조회 기능 추가
    if (btnNext)
    {
		grid.nextBtn = btnNext;

		// 다음 버튼 비활성화 및 Grid 설정
		btnNext.set_enable(false);
		btnNext.appendGrid = grid;

		// 다음 버튼시 조회 이벤트 생성
		btnNext.addEventHandler("onclick", this.gfnGridAppendNextBtn, this);
	}
	
    // 조회조건 페이징 정보 설정
    dataset.addColumn(this.G_GRID_PAGESIZE, "STRING");
    dataset.addColumn(this.G_GRID_STARTROW,  "STRING");
	if (dataset.getRowCount() == 0) dataset.addRow();
    dataset.setColumn(0, this.G_GRID_STARTROW, 0);
    dataset.setColumn(0, this.G_GRID_PAGESIZE, parseInt(pagesize));

    // 그리드의 onvscroll 이벤트 추가
    grid.addEventHandler("onvscroll", this.gfnGridAppend, this);
};

/**
 * @class    Grid의 스크롤이 End 로 이동시 조회 처리
 * @param 	 {String}   트랜잭션 ID
 * @param 	 {Dataset}  검색조건 대상 Dataset
 * @param 	 {Integer}  페이징 사이즈크기
 * @param 	 {Grid}     대상 그리드
 * @return 	 N/A
 */
pForm.gfnGridAppend = function(obj, e)
{
    if (e.pos == obj.vscrollbar.max)
    {		
        // 스크롤 이벤트의 중복을 막기 위해서 이벤트 제거
        obj.removeEventHandler("onvscroll", this.gfnGridAppend, this);

        // 조회조건 페이징 정보 설정
        var startrow = parseInt(obj.appendDataset.getColumn(0, this.G_GRID_STARTROW)) + parseInt(obj.appendPagesize);
        var endrow   = parseInt(startrow) + parseInt(obj.appendPagesize);
        obj.appendDataset.setColumn(0, this.G_GRID_STARTROW, startrow);

        // 조회함수 호출
		this.lookupFunc(obj.appendSearchfunction).call("functionCall");
    }
};

/**
 * @class    Next 버튼 클릭시 조회 처리
 * @return 	 N/A
 */
pForm.gfnGridAppendNextBtn = function(obj,  e)
{	
    var objGrd = obj.appendGrid;
	
    // 스크롤 이벤트의 중복을 막기 위해서 이벤트 제거
    objGrd.removeEventHandler("onvscroll", this.gfnGridAppend, this);

	// 조회조건 페이징 정보 설정
	var startrow = parseInt(objGrd.appendDataset.getColumn(0, this.G_GRID_STARTROW)) + parseInt(objGrd.appendPagesize);
	var endrow   = parseInt(startrow) + parseInt(objGrd.appendPagesize);
	objGrd.appendDataset.setColumn(0, this.G_GRID_STARTROW, startrow);

	// 조회함수 호출
	this.lookupFunc(objGrd.appendSearchfunction).call("functionCall");
};

/**
 * @class    그리드에 DATA를 Append 처리 및 페이징 정보 설정
 * @param 	 {Grid}     targetgrid - 대상 Grid Object
 * @param 	 {Dataset}  appendDataset - 조회결과 Dataset
 * @return 	 N/A
 */
pForm.gfnAppendGridData = function(targetgrid, appendDataset)
{
    var targetdataset = targetgrid.getBindDataset();
    var noMore        = false;

    // 다음 레코드가 존재할 경우
    if (appendDataset.getRowCount() >= targetgrid.appendPagesize) {
		// Total Count를 넘겨주면 해당 Dataset을 사용하고(dsPagingInfo의 totalCount 칼럼을 사용해도 관계 없음)
		// Total Count를 넘겨주지 않을 땐 AA와 상의하여
		// 서버에서는 ROW + 1건을 리턴하면 맨 마지막 ROW는 삭제 (20건 설정 시 21건을 리턴하면 맨 마지막 ROW는 삭제)
		// 맨 마지막 자료 조회 시 1회 더 조회할 필요가 없음
        appendDataset.deleteRow(targetgrid.appendPagesize);
		
		noMore = false;
    }
    // 더 이상 다음 레코드가 없을 경우
    else {
        noMore = true;
    }

	// gird 건수 많을때 row 안보임 현상 방지
	targetgrid.set_enableredraw(false);

    // Grid에 바인드 된 dataset에 조회된 dataset를 append
	targetdataset.appendData(appendDataset,true);
	
	// 페이징시 그룹 소계 사라짐 방지
	targetgrid.set_enableevent(false);
	if (this.gfnIsNull(targetdataset.keystring) == false) {
		targetdataset.set_keystring(targetdataset.keystring);
	}
	targetgrid.set_enableevent(true);
	
	//gird 건수 많을때 row 안보임 현상 방지
	targetgrid.set_enableredraw(true);

    // 다음 레코드가 존재할 경우
    if (!noMore) {	
        // 그리드의 onvscroll 이벤트 추가
        targetgrid.addEventHandler("onvscroll", this.gfnGridAppend, this);
    }
    // 더 이상 다음 레코드가 없을 경우
    else {
        // 그리드의 onvscroll 이벤트 삭제
        targetgrid.removeEventHandler("onvscroll", this.gfnGridAppend, this);
    }	
    // append dataset 초기화
    appendDataset.clearData();		
	
    // 다음 버튼 있을 경우
    if (targetgrid.nextBtn)
    {
    	// 다음 레코드가 존재할 경우
		if (!noMore) {
			targetgrid.nextBtn.set_enable(true);
		}
		// 더 이상 다음 레코드가 없을 경우
		else {
			targetgrid.nextBtn.set_enable(false);
		}
	}
	
    // 데이터 건수 표시를 할 경우
    if (targetgrid.appendGridcount)
    {
        targetgrid.appendGridcount.set_text("총 " + parseFloat(targetdataset.getRowCount()) + " 건");

        // 다음 레코드가 존재할 경우
        if (!noMore) {
			targetgrid.appendGridcount.set_enable(true);
        }
		// 더 이상 다음 레코드가 없을 경우
        else {
            targetgrid.appendGridcount.set_enable(false);            
        }
    }
};

/**
 * @class    재조회 시 Grid의 Append 설정 초기화
 * @param 	 {Grid}     targetgrid - 대상 그리드
 * @param 	 {Dataset}  dataset - 검색조건 대상 Dataset
 * @return 	 N/A
 */
pForm.gfnResetGridAppend = function(targetgrid, dataset)
{
	// Grid dataset 초기화
	var bindDataset = targetgrid.getBindDataset();	
	bindDataset.clearData();
	
    // 스크롤 이벤트의 중복을 막기 위해서 이벤트 제거
    targetgrid.removeEventHandler("onvscroll", this.gfnGridAppend, this);

	// 페이징 정보 초기화
    targetgrid.appendDataset.setColumn(0, this.G_GRID_STARTROW, 0);
};
