/**
*  Nexacro Professional Training Couse
*  @FileName 	ExtMessage.js 
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
 * @class 메세지팝업오픈
 * @param {String} sMsgId - 메세지ID	
 * @param {Array} arrArg - 메세지에 치환될 부분은 "{0~N}"이 되고 치환값은 배열로 넘김 
 * @param {String} [sPopId] - 팝업ID(하나의 callback함수에서 중복된 메시지 처리를 할 경우 PopId구분을 위해 unique한 ID 반드시 사용)
 * @param {String} [sCallback] - 팝업콜백 (confirm성 메시지를 사용시 반드시 필요)
 * @return N/A
 * @example
 * this.gfnAlert(this, "A", "확인하세요");	
 */
pForm.gfnAlert = function (sMsgId, arrArg, sPopId, sCallback)
{
    var objApp = pForm.gfnGetApplication();
	if(objApp.gdsMessage.findRow("MSG_ID", sMsgId) < 0) return false;

	// 다국어 처리
	var sNowLang = nexacro.getEnvironmentVariable("evLanguage");
	var sColumn  = "MSG_TEXT";
	if (sNowLang != "KO") {
		sColumn = sColumn + "_" + sNowLang;
	}
	
	var sMsg = objApp.gdsMessage.lookup("MSG_ID", sMsgId, sColumn);

	if( this.gfnIsNull(sMsg) ) sMsg = "확인";
	// 줄바꿈 변경
	sMsg = sMsg.replace(/\\n/g, String.fromCharCode(10));
	sMsg =  pForm.gfnConvertMessage(sMsg, arrArg);
	
	var sMsgType = objApp.gdsMessage.lookup("MSG_ID", sMsgId, "MSG_TYPE");	
	if( this.gfnIsNull(sPopId) ) sPopId = sMsgId;
	
	var sMsgUrl ="";
	switch(sMsgType) {
		case "A":
			sMsgUrl = "Cmm::CmmAlert.xfdl";
			break;
		case "C":
			sMsgUrl = "Cmm::CmmConfirm.xfdl";
			if(this.gfnIsNull(sCallback)) trace("callback함수를 지정하지 않았습니다");
			break;
	}

	var oArg = {paramContents:sMsg};
	var oOption = {titlebar:"false"};	
	
	// messagePopup
	if (nexacro.getEnvironmentVariable("evMessagePopup") == "true") {
		this.gfnOpenPopup(sPopId,sMsgUrl,oArg,sCallback,oOption);
	}
	// alert-cofirm
	else {
		if (sMsgType == "A") {
			alert(sMsg);
		}
		else {
			confirm(sMsg);
		}
	}
};

/**
 * @class 메세지 치환
 * @param {String} msg - 메세지	
 * @param {Array} values - 메세지에 치환될 부분은 "{0~N}"이 되고 치환값은 배열로 넘김 
 * @return {String}
 */
pForm.gfnConvertMessage = function(msg, values) 
{
    return msg.replace(/\{(\d+)\}/g, function() {
        return values[arguments[1]];
    });
};

/**
 * @class 메세지 치환 후 완성된 메시지 리턴
 * @param {String} sMsgId - 메세지ID	
 * @param {Array}  arrArg - 메세지에 치환될 부분은 "{0~N}"이 되고 치환값은 배열로 넘김 
 * @return {String}
 */
pForm.gfnGetMessage = function(sMsgId, arrArg) 
{
    var objApp = pForm.gfnGetApplication();
	if(objApp.gdsMessage.findRow("MSG_ID", sMsgId) < 0) return false;

	// 다국어 처리
	var sNowLang = nexacro.getEnvironmentVariable("evLanguage");
	var sColumn  = "MSG_TEXT";
	if (sNowLang != "KO") {
		sColumn = sColumn + "_" + sNowLang;
	}
	
	var sMsg = objApp.gdsMessage.lookup("MSG_ID", sMsgId, sColumn);

	// 줄바꿈 변경
	sMsg = sMsg.replace(/\\n/g, String.fromCharCode(10));
	sMsg =  pForm.gfnConvertMessage(sMsg, arrArg);
	
	return sMsg;
};