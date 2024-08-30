/**
*  Nexacro Professional Training Couse
*  @FileName 	ExtTransaction.js 
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

/**
 * @class 서비스 호출 공통함수 <br>
 * Dataset의 값을 갱신하기 위한 서비스를 호출하고, 트랜젝션이 완료되면 콜백함수을 수행하는 함수
 * @param {String} strSvcId - 서비스 ID
 * @param {String} strSvcUrl - 서비스 호출 URL 
 * @param {String} [inData]	- input Dataset list("입력ID=DataSet ID" 형식으로 설정하며 빈칸으로 구분)
 * @param {String} [outData] - output Dataset list("DataSet ID=출력ID" 형식으로 설정하며 빈칸으로 구분)
 * @param {String} [strArg]	- 서비스 호출시 Agrgument
 * @param {String} [callBackFnc] - 콜백 함수명
 * @param {Boolean} [isAsync] - 비동기통신 여부 
 * @return N/A
 * @example
 * var strSvcUrl = "transactionSaveTest.do";
 * var inData    = "dsList=dsList:U";
 * var outData   = "dsList=dsList";
 * var strArg    = "";
 * this.gfnTransaction("save", strSvcUrl, inData, outData, strArg, "fnCallback", true);
 */ 
pForm.gfnTransaction = function(strSvcId, strSvcUrl, inData, outData, strArg, callBackFnc, isAsync)
{
	if (this.gfnIsNull(strSvcId) || this.gfnIsNull(strSvcUrl))
	{
		trace("Error : gfnTransaction() 함수의 인자값이 부족합니다.");
		return false;
	}
	
	// fnCallback 함수 기본값 설정
	if (this.gfnIsNull(callBackFnc)) callBackFnc = "fnCallback";
	
	var objDate = new Date();
	var nStartTime = objDate.getTime();
    var sStartDate = objDate.getYear()
						+"-"+String(objDate.getMonth()).padLeft(2, '0')
						+"-"+String(objDate.getDate()).padLeft(2, '0')
						+" "+String(objDate.getHours()).padLeft(2, '0')
						+":"+String(objDate.getMinutes()).padLeft(2, '0')
						+":"+String(objDate.getSeconds()).padLeft(2, '0')
						+" "+objDate.getMilliseconds();

	// Async
	if ((isAsync != true) && (isAsync != false)) isAsync = true;	
	
	// 1. callback에서 처리할 서비스 정보 저장
	var objSvcID = { 
			svcId     : strSvcId,
			svcUrl    : strSvcUrl,
			callback  : callBackFnc,
			isAsync   : isAsync,
			startDate : sStartDate,
			startTime : nStartTime };
	
	// 2. strServiceUrl
	var strServiceUrl = "";
	
	if (strSvcUrl.indexOf("::")>-1)
	{
		strServiceUrl = strSvcUrl;
	}
	else
	{
		strServiceUrl = "SvcUrl::" + strSvcUrl;
	}
	
// 	if(strSvcUrl.substr(0,6) == "EduUrl"){
// 		strServiceUrl = strSvcUrl;	//기존 교육샘플에는 Prefix 까지 넘어와서 일단 분기처리
// 	}
// 	else{
// 		strServiceUrl = "SvcUrl::" + strSvcUrl;
// 	}
	
	trace(strServiceUrl);
	// 3. strArg
	var strArguments = "";
	if (this.gfnIsNull(strArg)) {
		strArguments = "";
	}
	else { 
		strArguments = strArg;
	}

	// 개발 및 개발서버 에는 xml, 운영서버는 SSV로 통신
	var nDataType;	
	if (nexacro.getEnvironmentVariable("evRunMode") == "R") {
		nDataType = 2;
	}
	else {
		nDataType = 0;
	}
	
	this.transaction( JSON.stringify(objSvcID)  //1.svcID
					, strServiceUrl             //2.strServiceUrl
					, inData                    //3.inDataSet
					, outData                   //4.outDataSet
					, strArguments              //5.arguments
					, "gfnCallback"				//6.strCallbackFunc
					, isAsync                   //7.bAsync
					, nDataType                 //8.nDataType : 0(XML 타입), 1((Binary 타입),  2(SSV 타입) --> HTML5에서는 Binary 타입은 지원안함
					, false);                   //9.bCompress ( default : false ) 
};

/**
 * @class 공통 Callback 함수 <br>
 * 이 함수가 먼저 수행되고 사용자지정Callback함수가 수행된다.
 * @param {String} svcID - 서비스 ID
 * @param {Number} errorCode - 에러코드(정상 0, 에러 음수값)
 * @param {String} [errorMsg] - 에러메시지
 * @return N/A
 */
pForm.gfnCallback = function(svcID,errorCode,errorMsg)
{
	var objSvcID = JSON.parse(svcID);
	
	// 서비스 실행결과 출력
	var sStartDate = objSvcID.startDate;
	var nStartTime = objSvcID.startTime;
	
	var objDate = new Date();
	var sEndDate = objDate.getYear()
					+"-"+String(objDate.getMonth()).padLeft(2, '0')
					+"-"+String(objDate.getDate()).padLeft(2, '0')
					+" "+String(objDate.getHours()).padLeft(2, '0')
					+":"+String(objDate.getMinutes()).padLeft(2, '0')
					+":"+String(objDate.getSeconds()).padLeft(2, '0')
					+" "+objDate.getMilliseconds();
	var nElapseTime = (objDate.getTime() - nStartTime)/1000;
	
	var sMsg = "";
	// studio 실행시에만 transaction 실행 log 표시
	if (nexacro.getEnvironmentVariable("evRunMode") == "S") {
		if (errorCode == 0)
		{
			sMsg = "gfnCallback : svcID>>"+objSvcID.svcId+ ",  svcUrl>>"+objSvcID.svcUrl+ ",  errorCode>>"+errorCode + ", errorMsg>>"+errorMsg + ", isAsync>>" + objSvcID.isAsync + ", sStartDate>>" + sStartDate + ", sEndDate>>"+sEndDate + ", nElapseTime>>"+nElapseTime;
			trace(sMsg);
		}
		else {
			sMsg = "gfnCallback : svcID>>"+objSvcID.svcId+ ",  svcUrl>>"+objSvcID.svcUrl+ ",  errorCode>>"+errorCode + ", isAsync>>" + objSvcID.isAsync + ", sStartDate>>" + sStartDate + ", sEndDate>>"+sEndDate + ", nElapseTime>>"+nElapseTime;
			sMsg += "\n==================== errorMsg =======================\n"+errorMsg+"\n==================================================";
			trace(sMsg);
		}
	}
	
	// 에러 공통 처리
	if(errorCode != 0)
	{
		switch(errorCode)
		{
			case -1 :
				// 서버 오류입니다.\n관리자에게 문의하세요.
				this.gfnAlert("msg.server.error");
				
				// return; 서버 에러 와 업무 에러 코드 분리시에 return 처리 결정
				break;
				
			case -2463215:
				//@todo : 임의 에러코드  처리
				//return false;
				break;
		}
	}
	
	//공통코드 조회 완료시 처리
	if (objSvcID.svcId.split(":")[0] == "svcCommonCode") {
		var sCallBack = objSvcID.callback;
        var objApp = pForm.gfnGetApplication();
        var objDs = objApp.gdsTemp;        
        this.gfnGetCommonCode(this._commCodeArg, objDs);   //{codeGroup:"C001", obj:this.cbo_pos}, gdsTemp 		
		this._commCodeArg = null;		
	} 	
	

	// 화면의 callBack 함수 실행
	if(!this.gfnIsNull(objSvcID.svcId))
	{
		// form에 callback 함수가 있을때
		if (this[objSvcID.callback]) this.lookupFunc(objSvcID.callback).call(objSvcID.svcId, errorCode, errorMsg);
	}
};


/**
 * @함수설명  				공통코드 조회
 * @param arrCode 	        조회할 공통코드 정보
 * @param isAsync			싱크여부(디폴트 : ansync)
 * @return None
 */ 
this._commCodeArg = null;
pForm.gfnSearchCode = function(arrCode, sCallBack, isAsync) 
{
	var objApp = pForm.gfnGetApplication();
	var objDs = objApp.gdsTemp;    //공통코드 임시 데이터셋
//	objDs.clearData();

	var arrCodeGroup = new Array();
	for(var i=0; i<arrCode.length; i++)
	{
		arrCodeGroup.push(arrCode[i].codeGroup);  //코드 그룹
	}
	
	// 파라미터값 조회
	this._commCodeArg = arrCode;
	
    var sSvcID    = "svcCommonCode";
    var sURL      = "selectCommCode.do";
    var sInDs     = "";
    var sOutDs    = objDs.name+"=ds_commonCode";
    var sParam    = "codeGroup=" + nexacro.wrapQuote(arrCodeGroup.toString());
    
	if(!pForm.gfnIsNull(sCallBack))	sSvcID = sSvcID + ":" + sCallBack;
	if(pForm.gfnIsNull(isAsync))		isAsync = true;    
    
	this.gfnTransaction(sSvcID, sURL, sInDs, sOutDs, sParam, sCallBack); 
}

pForm.gfnGetCommonCode = function(arrCode, objDsTemp) 
{
    if(this.gfnIsNull(objDsTemp)) objDsTemp = this.gfnGetApplication().gdsComCode;
    
	var objDs = null;		// 대상 데이터셋
	var objComp = null;	// 대상 컴포넌트

    for(var i=0; i<arrCode.length; i++)
    {
        var obj = arrCode[i].obj;
        if(obj instanceof nexacro.Combo ||  obj instanceof nexacro.Radio || obj instanceof nexacro.ListBox){
            objDs   = obj.getInnerDataset();
            objComp = obj;
        } 
        else if(obj instanceof Dataset){		//obj 가 데이터셋일경우
            objDs = obj;
            objComp = null;
        }
        
        if(objDs == null){	
            trace("gfnGetCommonCode : Dataset is Null");
            return;
        }
        
        var strFilter = "GROUP_CODE==" + nexacro.wrapQuote(arrCode[i].codeGroup); 		
        //FIlter조건 추가
        if(!this.gfnIsNull(arrCode[i].filter)) {
            strFilter = strFilter + " && " + arrCode[i].filter;
        }
        
        objDsTemp.set_enableevent(false);
        objDs.set_enableevent(false);
        objDsTemp.filter(strFilter);
        objDs.copyData(objDsTemp, true);

        // first set 세팅
        if(!this.gfnIsNull(arrCode[i].first)){
            objDs.insertRow(0);
            var arrFirst = arrCode[i].first.split(":");                    
            if(arrFirst[0] == "0"){
                objDs.setColumn(0, "CODE"     , "ALL");
                objDs.setColumn(0, "CODE_NAME", "All");
            }
            else if(arrFirst[0] == "1"){
                objDs.setColumn(0, "CODE"     , "");
                objDs.setColumn(0, "CODE_NAME", "Selected...");
            }
            else if(arrFirst[0] == "2"){
                objDs.setColumn(0, "CODE"     , arrFirst[1]);
                objDs.setColumn(0, "CODE_NAME", arrFirst[2]);
            }
        }
        
        objDsTemp.filter("");
        objDs.set_enableevent(true);
        objDsTemp.set_enableevent(true);
        
        //컴포넌트를 넘긴 경우 0번째 인덱스 설정
        if(!this.gfnIsNull(objComp)){
            objComp.set_index(0);
        }
    }
};
