

var pForm = nexacro.Form.prototype;
pForm.cfnFormLoad = function(objForm)
{
	var arrComp = objForm.components;
	for( var i=0; i<arrComp.length; i++){
	
		if(arrComp[i] instanceof nexacro.Div){
			pForm.cfnFormLoad(arrComp[i].form);
		}
		else{
			if(arrComp[i] instanceof nexacro.Calendar){
				if(arrComp[i].uCalType == "Month"){
					arrComp[i].addEventHandler("ondropdown", this.cfn_calendarMonth, this);
				}
			}
		}	
	}
}

pForm.cfn_calendarMonth = function(obj)
{
	var compID = this.gfnGetCompId(obj);	
	if( this.gfnIsNull( this.components[compID] ) ){
		var objPdiv = new PopupDiv();
		objPdiv.init(compID, 0, 0, 200, 190);
		this.addChild(compID, objPdiv);
		objPdiv.set_cssclass("pdiv_WF_Area");
		objPdiv.set_url("Work::EduComm_CalMonth_Sub.xfdl");
		objPdiv.show();
		objPdiv.calObj = obj;
	}
	else{
		var objPdiv = this.components[compID];
	}
	objPdiv.trackPopupByComponent(obj, 0, obj.height);	
}

pForm.cfnSetMultiCombo = function(obj)
{
	var sInnerDataset = obj.innerdataset;	// "ds_emp"
	var sCodeColumn   = obj.codecolumn;
	var sDataColumn   = obj.datacolumn;
	var nDisplayCnt   = obj.displayrowcount;
	if(this.gfnIsNull(nDisplayCnt))	nDisplayCnt = 10;
	
	if(this.gfnIsNull(sInnerDataset) || this.gfnIsNull(sCodeColumn)	|| this.gfnIsNull(sDataColumn)){
		alert("InnerDataset Error");
		return;
	}

	var objInnerDataset = this.all[sInnerDataset];
	
	if(this.gfnIsNull(objInnerDataset)){
		alert("InnerDataset Object Error");
		return;
	}
	
	var sCompFull = this.gfnGetCompId(obj);	// formid.div00.form.combo00
	var sCompPath = sCompFull.substr(this.name.length+1)	// div00.form.combo00
	var sUniqueID = nexacro.replaceAll(sCompPath, ".", "_");	// div00_form_combo00
	
	// 1. 멀티콤보 데이터 셋 생성 "ds_" + sInnerDataset + sUniqueID
	var strComboDs = "ds_" + sInnerDataset + sUniqueID;
	var objComboDs = this.all[strComboDs];
	
	if(this.gfnIsNull(objComboDs)){
		objComboDs = new Dataset();
		this.addChild(strComboDs, objComboDs);
		
		objComboDs.addColumn("_CHK", "STRING");
		objComboDs.addColumn(sCodeColumn, "STRING");
		objComboDs.addColumn(sDataColumn, "STRING");

		objComboDs.set_enableevent(false);
		var nCount = objInnerDataset.getRowCount();
		for(var i=0; i<nCount; i++){
			objComboDs.addRow();
			objComboDs.setColumn(i, "_CHK", "0");
			objComboDs.setColumn(i, sCodeColumn, objInnerDataset.getColumn(i, sCodeColumn));
			objComboDs.setColumn(i, sDataColumn, objInnerDataset.getColumn(i, sDataColumn));
		}
		objComboDs.set_enableevent(true);
		
		if(nCount < nDisplayCnt)	nDisplayCnt = nCount;
	}

	// Popup Div 생성
	var sPdivID = "_pdv_" + sUniqueID;
	var objPdiv = this.components[sPdivID];
	if(this.gfnIsNull(objPdiv)){
		objPdiv = new PopupDiv();
		objPdiv.init(sPdivID, obj.getOffsetLeft(), obj.getOffsetBottom(), 100, 100);
		this.addChild(sPdivID, objPdiv);
		objPdiv.set_cssclass("pdiv_WF_Area");	
		objPdiv.show();		
		
		var objParam = { combo : obj,
		                 dataset : objComboDs,
						 innerdataset : sInnerDataset,
						 codecolumn : sCodeColumn,
						 datacolumn : sDataColumn
						};
		objPdiv.uParam = objParam;
		objPdiv.addEventHandler("oncloseup", this._pdivMultiComboClose, this);
	}

	// Grid 생성
	var objGrid = objPdiv.form.components["_grdCombo"];
	if(this.gfnIsNull(objGrid)){
		objGrid = new Grid();
		objGrid.init("_grdCombo", 0, 0, null, null, 0, 0);
		objPdiv.addChild("_grdCombo", objGrid);
		
		objGrid.set_binddataset(objComboDs.name);
		objGrid.createFormat();
	
		objGrid.setFormatRowProperty(0, "size", 30);
		objGrid.setFormatRowProperty(1, "size", 30);
		
		objGrid.mergeCell(1, 2, -1, -1);
		objGrid.setCellProperty("head", 0, "displaytype", "checkboxcontrol");
		objGrid.setCellProperty("head", 0, "text", "0");
		objGrid.setCellProperty("head", 1, "text", "Select All");

		objGrid.setCellProperty("body", 0, "displaytype", "checkboxcontrol");
		objGrid.setCellProperty("body", 0, "edittype", "checkbox");
		
		objGrid.set_border("0px none");
		objGrid.set_autosizingtype("col");
		objGrid.set_scrollbarsize(10);
		objGrid.show();	
		
		objGrid.addEventHandler("onheadclick", this._gfnHeadCheckSelectAll, this);
		
		var nGridSize = objGrid.getRealColFullSize();	// 그리드 전체 컬럼 사이즈
		var nGridCol0 = objGrid.getRealColSize(0);		// 첫번째 컬럼 사이즈
		var nGridCol1 = objGrid.getRealColSize(1);		// 두번째 컬럼 사이즈
		var nGridCol2 = objGrid.getRealColSize(2);		// 세번째 컬럼 사이즈
		var nGridRow0 = objGrid.getRealRowSize(-1);
		var nGridRow1 = objGrid.getRealRowSize(0);
		var nScrollSize = objGrid.scrollbarsize;
		var nComboSize = obj.getOffsetWidth()-2 ;
		
		if(nComboSize > nGridSize){
			objGrid.set_autosizingtype("none");
			objGrid.setRealColSize("body", 0, nGridCol0+10);
			objGrid.setRealColSize("body", 1, nGridCol1+10);

			// 스크롤 영역 계산
			if(nCount > nDisplayCnt){
				objGrid.setRealColSize("body", 2, nComboSize-nGridCol0-nGridCol1-nScrollSize-20);
			}
			else{
				objGrid.setRealColSize("body", 2, nComboSize-nGridCol0-nGridCol1-20);
			}
			objPdiv.set_width(nComboSize+2)
		}
		else{
			objPdiv.set_width(nGridSize + nScrollSize + 2);
		}
		objPdiv.set_height(nGridRow0 + (nGridRow1 * nDisplayCnt) + 2);
	}
	obj.set_text("멀티선택");
	objPdiv.trackPopupByComponent(obj, 0, obj.height);
}

pForm._pdivMultiComboClose = function(obj, e)
{
	
	var objDs    = obj.uParam.dataset;
	var objCombo = obj.uParam.combo;
	
	var arrTextList  = [];
	var arrValueList = [];

	for(var i=0; i<objDs.getRowCount(); i++)
	{
		if(objDs.getColumn(i, "_CHK") == "1"){
			arrTextList.push(objDs.getColumn(i, obj.uParam.datacolumn));
			arrValueList.push(objDs.getColumn(i, obj.uParam.codecolumn));
		}
	}
	
	var sComboText  = arrTextList.toString();
	var sComboValue = arrValueList.toString();

	this._setComboText(obj.uParam, arrTextList, arrValueList);
	
	var objfnc = objCombo.getEventHandler("oncloseup", 0);
	
	var objEvent = new nexacro.ComboCloseUpEventInfo();
	objEvent.posttext = sComboText;
	objEvent.postvalue = sComboValue;
	objfnc.call(this, objCombo, objEvent);
	
	
}

pForm._setComboText = function(uParam, arrTextList, arrValueList)
{
	var sComboText = arrTextList.toString();
	var objTextSize = nexacro.getTextSize(sComboText, "normal 14px/normal 'Verdana,Malgun Gothic'");	
	var nComboTextWidth = uParam.combo.getOffsetWidth() - uParam.combo.getOffsetHeight() ;

	uParam.combo.returntext = sComboText;
	uParam.combo.returnvalue = arrValueList.toString();

	uParam.combo.set_innerdataset("");
	uParam.combo.set_codecolumn("");
	uParam.combo.set_datacolumn("");
	
	if(nComboTextWidth > objTextSize.nx){
		uParam.combo.set_text(sComboText);
	}
	else{
		uParam.combo.set_text(arrTextList.length + "개 선택");
		uParam.combo.set_tooltiptext(sComboText);
		uParam.combo.set_tooltiptype("hover");
	}
	
	if(this.gfnIsNull(sComboText))	uParam.combo.set_text("멀티선택");
	
	uParam.combo.set_innerdataset(uParam.innerdataset);
	uParam.combo.set_codecolumn(uParam.codecolumn);
	uParam.combo.set_datacolumn(uParam.datacolumn);

}

var pCombo = nexacro.Combo.prototype;
pCombo.get_value = function()
{
	return this.returnvalue;
}

pCombo.get_text = function()
{
	return this.returntext;
}







