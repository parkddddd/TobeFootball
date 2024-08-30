if (typeof nexacro == 'undefined' || (typeof nexacro.Browser != 'undefined' && nexacro.Browser != "Runtime") || (typeof nexacro._Browser != 'undefined' && nexacro._Browser != "Runtime")) {
//====================================================================================================
// 모든 변수와 함수는 JavaScript 응용 프로그램과의 충돌을 막기 위하여 UbiJS_ 로 시작.
//====================================================================================================

//----------------------------------------------------------------------------------------------------
// Context / Viewer 설정
//----------------------------------------------------------------------------------------------------
var UbiJS_App = "UbiServer";
var UbiJS_ViewerType = "UNICODE";				// UNICODE로 통일

var UbiJS_PlguinInstallFile = "UbiViewer.exe";	// 플러그인 통합설치 파일명
var UbiJS_PluginCabFile = "UbiViewerX4.cab";	// 뷰어 파일명
var UbiJS_PluginVersion = "";		// 플러그인 배포 파일
var UbiJS_ViewerVersion = "";		// 플러그인 Cab 파일 버전

var UbiJS_WsVersion = "4, 0, 1712, 601";				// 웹소켓 뷰어 버전
var UbiJS_WsInstallFile = "Setup_UbiViewerWS_v4.exe";	// 웹소켓 뷰어 설치 파일
//var UbiJS_NonaxInstallFile = "UbiViewer_Setup.exe";

// 언어 설정
var UbiJS_Language = "ko";
if ( navigator ) {
	var _lang = 'ko';
    if ( navigator.language ) {
    	// IE 11 이상
    	_lang = navigator.language;
    }
    else if ( navigator.browserLanguage ) {
    	_lang = navigator.browserLanguage;
    }
    else if ( navigator.systemLanguage ) {
    	_lang = navigator.systemLanguage;
    }
    else if ( navigator.userLanguage ) {
    	_lang = navigator.userLanguage;
    }
    
    // ko-KR이 아니면 모두 en으로 처리
    if (_lang.indexOf('ko') > -1) {
    	UbiJS_Language = 'ko';
    } else {
    	UbiJS_Language = 'en';
    }
}

//----------------------------------------------------------------------------------------------------
// 배포 설치본 관리
//----------------------------------------------------------------------------------------------------
var UbiJS_Host = self.location.host;
var UbiJS_BaseUrl = self.location.protocol + "//" + UbiJS_Host;
if( UbiJS_App != "" )
	UbiJS_BaseUrl = UbiJS_BaseUrl + "/" + UbiJS_App;

var UbiJS_PluginInstallPath = UbiJS_BaseUrl + "/ubi4/ubiviewer/" + UbiJS_PlguinInstallFile;	// 플러그인 통합본 설치
var UbiJS_InstallCabPath = UbiJS_BaseUrl + "/ubi4/ubiviewer/" + UbiJS_PluginCabFile;			// 뷰어 파일 설치
var UbiJS_WsInstallPath = UbiJS_BaseUrl + "/ubi4/ubiviewer/" + UbiJS_WsInstallFile;			// WS 설치 파일 경로

var UbiJS_CabUpdateXml = "";
UbiJS_CabUpdateXml += "<update>";
UbiJS_CabUpdateXml += "<file title='UbiViewer' url='" + UbiJS_InstallCabPath + "' version='" + UbiJS_ViewerVersion + "'/>";
UbiJS_CabUpdateXml += "</update>";

//----------------------------------------------------------------------------------------------------
// 안내 메세지
//----------------------------------------------------------------------------------------------------
var UbiJS_HelpSafari = "ㆍSafari 브라우저에서는 설치 후에 브라우저를 닫았다가 <font color='#ff6600'>다시 접속</font>하시기 바랍니다.<br>";
var UbiJS_HelpFireFox = "ㆍFireFox 브라우저에서 실행 권한을 요구하는 경우 반드시 <font color='#ff6600'>[허가]→[허가하고 기억]</font> 버튼을 차례대로 눌러주십시오.<br>ㆍ설치가 안된다면 플러그인 차단 여부를 확인해 주십시오.<br>";
var UbiJS_HelpChrome = "ㆍChrome 브라우저에서 실행 권한이 필요하다고 요구하는 경우 반드시 <font color='#ff6600'>[이 사이트에서 항상 실행]</font> 버튼을 눌러주십시오.<br>ㆍ설치가 안된다면 플러그인 차단 여부를 확인해 주십시오.<br>";
var UbiJS_HelpOpera = "ㆍOpera 브라우저입니다. 다운로드 받은 파일을 직접 실행하여 주십시오.<br>";
var UbiJS_HelpIE = "ㆍIE 브라우저에서 파일 다운로드가 차단된 경우 [다운로드] 로 실행하여 주십시오.<br>";

var UbiJS_msgboxColor = new Object();
UbiJS_msgboxColor["amber"] = "color:#000!important;background-color:#ffc107!important";
UbiJS_msgboxColor["aqua"] = "color:#000!important;background-color:#00ffff!important";
UbiJS_msgboxColor["blue"] = "color:#fff!important;background-color:#2196F3!important";
UbiJS_msgboxColor["light-blue"] = "color:#000!important;background-color:#87CEEB!important";
UbiJS_msgboxColor["brown"] = "color:#fff!important;background-color:#795548!important";
UbiJS_msgboxColor["cyan"] = "color:#000!important;background-color:#00bcd4!important";
UbiJS_msgboxColor["blue-grey"] = "color:#fff!important;background-color:#607d8b!important";
UbiJS_msgboxColor["green"] = "color:#fff!important;background-color:#4CAF50!important";
UbiJS_msgboxColor["light-green"] = "color:#000!important;background-color:#8bc34a!important";
UbiJS_msgboxColor["indigo"] = "color:#fff!important;background-color:#3f51b5!important";
UbiJS_msgboxColor["khaki"] = "color:#000!important;background-color:#f0e68c!important";
UbiJS_msgboxColor["lime"] = "color:#000!important;background-color:#cddc39!important";
UbiJS_msgboxColor["orange"] = "color:#000!important;background-color:#ff9800!important";
UbiJS_msgboxColor["deep-orange"] = "color:#fff!important;background-color:#ff5722!important";
UbiJS_msgboxColor["pink"] = "color:#fff!important;background-color:#e91e63!important";
UbiJS_msgboxColor["purple"] = "color:#fff!important;background-color:#9c27b0!important";
UbiJS_msgboxColor["deep-purple"] = "color:#fff!important;background-color:#673ab7!important";
UbiJS_msgboxColor["red"] = "color:#fff!important;background-color:#f44336!important";
UbiJS_msgboxColor["sand"] = "color:#000!important;background-color:#fdf5e6!important";
UbiJS_msgboxColor["teal"] = "color:#fff!important;background-color:#009688!important";
UbiJS_msgboxColor["yellow"] = "color:#000!important;background-color:#ffeb3b!important";
UbiJS_msgboxColor["white"] = "color:#000!important;background-color:#fff!important";
UbiJS_msgboxColor["black"] = "color:#fff!important;background-color:#000!important";
UbiJS_msgboxColor["grey"] = "color:#000!important;background-color:#9e9e9e!important";
UbiJS_msgboxColor["light-grey"] = "color:#000!important;background-color:#f1f1f1!important";
UbiJS_msgboxColor["dark-grey"] = "color:#fff!important;background-color:#616161!important";
UbiJS_msgboxColor["pale-red"] = "color:#000!important;background-color:#ffdddd!important";
UbiJS_msgboxColor["pale-green"] = "color:#000!important;background-color:#ddffdd!important";
UbiJS_msgboxColor["pale-yellow"] = "color:#000!important;background-color:#ffffcc!important";
UbiJS_msgboxColor["pale-blue"] = "color:#000!important;background-color:#ddffff!important";

var UbiJS_InstallHeader = UbiJS_msgboxColor["blue-grey"]; 
var UbiJS_NoticeHeader = UbiJS_msgboxColor["brown"]; 
var UbiJS_StandbyHeader = UbiJS_msgboxColor["teal"];
var UbiJS_CompleteHeader = UbiJS_msgboxColor["teal"];
var UbiJS_CancelHeader = UbiJS_msgboxColor["teal"];
var UbiJS_FailHeader = UbiJS_msgboxColor["teal"];

//미설치시 설치화면에서 자동으로 다운로드할지의 여부 ( true : 설치화면으로 이동시 자동으로 다운로드 실행  / false : 다운로드 클릭 버튼을 이용해야만 다운로드 )
var UbiJS_IE_AutoDownload = false;

//전역 객체로 사용
var UbiJS_WINDOC = null;
try {
	//UbiJS_WINDOC = window.top.document;
	UbiJS_WINDOC = document;
}
catch(e){}

var UbiJS_MS_XMLDOM = null;
try {
	UbiJS_MS_XMLDOM = new ActiveXObject("Microsoft.XMLDOM");
}
catch(e){}

//====================================================================================================
// OS check 관련
//====================================================================================================
var UbiJS_Match = navigator.userAgent.match(/(CrOS\ \w+|Windows\ NT|Mac\ OS\ X|Linux)\ ([\d\._]+)?/);
var UbiJS_Os = (UbiJS_Match || [])[1] || "Unknown";

//====================================================================================================
// 플러그인 모듈 관리 프로그램 - 아래를 수정하거나 지우지 마십시오.
//====================================================================================================
var UbiJS_CurrentInstalledVersion = "";
var Ubi_Object = null;
var UbiJS_PluginId = "__object_ubiviewer_plugin";
var UbiJS_Div_PluginId = "__hidden_div_ubiviewer_plugin";
var UbiJS_Object = null;
var UbiJS_IsPluginUpdate = false;

var UbiJS_IsIE = /*@cc_on!@*/false || !!document.documentMode;
var UbiJS_IsIE10 = document.all && !window.atob;
var UbiJS_IsIE11 = navigator.appName == 'Netscape' && navigator.userAgent.search('Trident') != -1;
var UbiJS_IsEdge = navigator.userAgent.indexOf("AppleWebKit") >= 0 && navigator.userAgent.indexOf("Edge") != -1;
var UbiJS_IsOpera = !!window.opera || navigator.userAgent.indexOf(' OPR/') >= 0;
var UbiJS_IsFirefox = typeof InstallTrigger !== 'undefined';
var UbiJS_IsSafari = Object.prototype.toString.call(window.HTMLElement).indexOf('Constructor') > 0;
var UbiJS_IsChrome = !!window.chrome && !UbiJS_IsOpera;

////////////////////////////////////////////////////////////////////////////////////////////////////////////
// HTML 뷰어에서 Plugin(WebSocket) 뷰어를 임베디드하여 호출이 되는 경우 사용되는 스크립트 
////////////////////////////////////////////////////////////////////////////////////////////////////////////
var UbiJS_Run_Plugin = UbiJS_PluginAvailableBrowser();

var UbiJS_Object_PluginViewer = "__object_plugin_viewer";
var UbiJS_Div_PluginViewer = "__hidden_div_plugin_viewer";
var UbiJS_Object_PluginViewerVersion = "__object_plugin_viewer_version";

var UbiJS_PlguinViewer = null;
var UbiJS_PluginViewer_ActType= -1;
var UbiJS_PluginViewer_Arg = "";
var UbiJS_PluginViewer_RetrieveUrfUrl = "";

//var UbiJS_WsPort = "16886";
var UbiJS_WsProtocol = "ubi-protocol";
var UbiJS_WsPorts = [16886, 56888, 56889];
var UbiJS_WsCheckIndex = 0;
var UbiJS_WsWaitCheckCount = 0;
var UbiJS_WsCheckComplete = false;

var UbiJS_WsViewer = null;
var UbiJS_WsViewer_ActType = -1;

var UbiJS_WS_RS_ = String.fromCharCode(30);
var UbiJS_WS_CS_ = String.fromCharCode(31);
var UbiJS_WS_EOF_ = String.fromCharCode(27);
var UbiJS_WS_VER_EOF_ = String.fromCharCode(29); // version check용 eof

var UbiJS_WsInstallFlag = false;

var UbiJS_Div_Install = "__div_ubi_install_message";
var UbiJS_Div_Notice = "__div_ubi_notice_message";
var UbiJS_Div_64Warning = "__div_ubi_64warning_message";
var UbiJS_Div_PrintStandby = "__div_ubi_printstandby_message";
var UbiJS_Div_PrintComplete = "__div_ubi_printcomplete_message";
var UbiJS_Div_PrintCancel = "__div_ubi_printcancel_message";
var UbiJS_Div_PrintFail = "__div_ubi_printfail_message";

var UbiJS_Div_ExportStandby = "__div_ubi_exportstandby_message";
var UbiJS_Div_ExportComplete = "__div_ubi_exportcomplete_message";
var UbiJS_Div_ExportCancel = "__div_ubi_exportcancel_message";
var UbiJS_Frame_Download = "__frame_ubi_download_exe";

var UbiJS_Is_PrintJob = true;
var UbiJS_Viewer_Progress = false;

// 브라우저 종료 및 페이지가 변경되는 경우 Viewer close 처리
window.onbeforeunload = function(e) {
	
	if( UbiJS_WsViewer != null ) {
		
		UbiJS_WsViewer.close();
		UbiJS_WsViewer = null;
	}
};

// 페이지 로드 완료 시 필요 요소 초기화
// <body onload= 와 같이 앞에서 뭔가를 사용하면 아래 소스는 타지 않음.
window.onload = function(e) {
	if( UbiJS_WINDOC == null ) {
		try {
			UbiJS_WINDOC = document;	
		}
		catch(e){}
	}
	
	//IE 때문에 미리 생성해 둠.
	UbiJS_InitPrintStandby();
	UbiJS_InitExportStandby();
};

function _ubinonax_getMessage(language, key) {
	var lang = language;
	if (language == 'ko' || language == 'kr') {
		lang = 'korean';
	}
	else if (language == 'en' || language == 'us') {
		lang = 'english';
	}
	
	var rtnstr = "";
	if (_ubinonax_msg[lang]) {
		if (_ubinonax_msg[lang][key] != undefined)
			rtnstr = _ubinonax_msg[lang][key];
	}
	
	return rtnstr;
};

/**
 * 아규먼트 값 설정. 리포트 조회 시 자동 호출
 * @returns {String}
 */
function getArg() {

	return UbiJS_PluginViewer_Arg;
}

/**
 * 미리보기 완료 후 자동 호출(플러그인)
 */
function finishLoad() {

	// 준비 메시지를 닫음
	try { UbiJS_WINDOC.getElementById(UbiJS_Div_PrintStandby).style.display = "none"; } catch(e) { }
	try { UbiJS_WINDOC.getElementById(UbiJS_Div_ExportStandby).style.display = "none"; } catch(e) { }

	// 프로그래스바 보임으로 설정
	//UbiJS_PlguinViewer.setProgress(true);

	switch(UbiJS_PluginViewer_ActType) {

	case __ubi_EXPORT_PDF :
		UbiJS_PlguinViewer.exportFile('PDF');
		break;
	case __ubi_EXPORT_EXCEL1 :
		//UbiJS_PlguinViewer.exportFile('EXCEL');
		UbiJS_PlguinViewer.exportFile('XLSX');
		break;
	case __ubi_EXPORT_EXCEL2 :
		//UbiJS_PlguinViewer.exportFile('EXCEL_NO');
		UbiJS_PlguinViewer.exportFile('XLSX_NO');
		break;
	case __ubi_EXPORT_RTF :
		UbiJS_PlguinViewer.exportFile('RTF');
		break;
	case __ubi_EXPORT_PPTX :
		UbiJS_PlguinViewer.exportFile('PPTX');
		break;
	case __ubi_EXPORT_HWP :
		UbiJS_PlguinViewer.exportFile('HWP');
		break;
	case __ubi_EXPORT_HML :
		UbiJS_PlguinViewer.exportFile('HWPML');
		break;
	case __ubi_EXPORT_DOCX :
		UbiJS_PlguinViewer.exportFile('DOCX');
		break;
	case __ubi_EXPORT_CELL :
		UbiJS_PlguinViewer.exportFile('HCELL');
		break;
	}
}

/**
 * 미리보기 완료 후 자동 호출(웹소켓)
 */
function RetrieveEnd() {

	// 준비 메시지를 닫음
	try { UbiJS_WINDOC.getElementById(UbiJS_Div_PrintStandby).style.display = "none"; } catch(e) { }
	try { UbiJS_WINDOC.getElementById(UbiJS_Div_ExportStandby).style.display = "none"; } catch(e) { }

	if (UbiJS_WsViewer) {
		// 프로그래스바 보임으로 설정
		//UbiJS_WsViewer.setProgress(true);
	
		if( UbiJS_WsViewer_ActType == 0 ) {
			
			UbiJS_WsViewer.directPrint();
		}
		else if( UbiJS_WsViewer_ActType == 1 ) {
			
			UbiJS_WsViewer.printset();
		}
		else {
			switch(UbiJS_WsViewer_ActType) {
	
			case __ubi_EXPORT_PDF :
				UbiJS_WsViewer.ExportFile('PDF');
				break;
			case __ubi_EXPORT_EXCEL1 :
				//UbiJS_WsViewer.ExportFile('EXCEL');
				UbiJS_WsViewer.ExportFile('XLSX');
				break;
			case __ubi_EXPORT_EXCEL2 :
				//UbiJS_WsViewer.ExportFile('EXCEL_NO');
				UbiJS_WsViewer.ExportFile('XLSX_NO');
				break;
			case __ubi_EXPORT_RTF :
				UbiJS_WsViewer.ExportFile('RTF');
				break;
			case __ubi_EXPORT_PPTX :
				UbiJS_WsViewer.ExportFile('PPTX');
				break;
			case __ubi_EXPORT_HWP :
				UbiJS_WsViewer.ExportFile('HWP');
				break;
			case __ubi_EXPORT_HML :
				UbiJS_WsViewer.ExportFile('HWPML');
				break;
			case __ubi_EXPORT_DOCX :
				UbiJS_WsViewer.ExportFile('DOCX');
				break;
			case __ubi_EXPORT_CELL :
				UbiJS_WsViewer.ExportFile('HCELL');
				break;
			}
		}
	}
};

/**
 * 인쇄 완료 후 자동 호출
 */
function PrintEnd(status) {
	// status
	// 0 : success
	// 1 : fail
	// -999 : cancel
	if( UbiJS_Run_Plugin ) {
		
		status = "" + UbiJS_PlguinViewer.getPrintStatus();

		if( status.indexOf("0") == 0 )
			UbiJS_ShowPrintComplete();
		else if( status.indexOf("1") == 0 )
			UbiJS_ShowPrintFail();
		else
			UbiJS_ShowPrintCancel();
	}
	else {
		// 전용 뷰어인 경우
		if( UbiJS_WsViewer != null ) {
			if( status.indexOf("0") == 0 )
				UbiJS_ShowPrintComplete();
			else if( status.indexOf("1") == 0 )
				UbiJS_ShowPrintFail();
			else
				UbiJS_ShowPrintCancel();
	
			UbiJS_WsViewer.close();
			UbiJS_WsViewer = null;
		}
	}
}

/**
 * 파일 저장 완료 후 자동 호출.
 */
function ExportEnd(filepath) {

	if( UbiJS_Run_Plugin ) {
		
		filepath = UbiJS_PlguinViewer.GetVariable("exportFilePath");

		if( filepath.length == 0 )
			UbiJS_ShowExportCancel();		
		else
			UbiJS_ShowExportComplete();
	}
	else {
		// 전용 뷰어인 경우
		if( UbiJS_WsViewer != null ) {
			// 취소의 경우 상황 또는 환경에 따라 다음과 같이 결과가 나오기에 이와 같이 처리함([0 ][top ][忠?? ], 공백이 아니라 특수문자 같음)
			if( filepath.indexOf("0") == 0 ||  filepath.length < 5 ||  filepath.indexOf("top") == 0)
				UbiJS_ShowExportCancel();		
			else
				UbiJS_ShowExportComplete();
			
			UbiJS_WsViewer.close();
			UbiJS_WsViewer = null;
		}
	}
}

/**
 * 뷰어 버전 확인. 플러그인. 웹소켓 
 */
function UbiJS_Version() {

	if( UbiJS_Run_Plugin )
		UbiJS_Alert("Plugin[ " + UbiJS_Object.GetVersion() + " ] , OCX[ " + UbiJS_WINDOC.getElementById(UbiJS_Object_PluginViewer).GetOcxVersion() + ", " + UbiJS_ActiveXEdition() + " ]");
	else
		UbiJS_WsViewer.aboutBox();
}

/////////////////////////////////////////////////////////////////////////////////////

/**
 * HTML 뷰어에서 인쇄 클릭 시 호출되는 함수
 */
function exePrint(isPrintSet, htmlViewer) {
	
	if( UbiJS_WINDOC == null ) {
		try {
			UbiJS_WINDOC = document;	
		}
		catch(e){}
	}

	UbiJS_Is_PrintJob = true;
	UbiJS_Viewer_Progress = _ubi_strToBool(htmlViewer.params.pluginprogress);
	// 전용 뷰어 출력인 경우 HTML 뷰어에 설정한 언어로 변경
	UbiJS_Language = htmlViewer.params.language;
	
	if( !UbiJS_Viewer_Progress ) {	// Plugin 뷰어의 프로그래스바 설정이 False이면 메시지를 보여준다.
		
		if( UbiJS_Is_PrintJob )
			UbiJS_ShowPrintStandby();
		else
			UbiJS_ShowExportStandby();
	}

	var ubiserverurl = htmlViewer.params.ubiserverurl;
	ubiserverurl = ubiserverurl.toUpperCase();
	// ubiserverurl이 상대 경로로 되어 있을 경우 앞에 주소를 붙인다. 
	if (ubiserverurl.indexOf("HTTP") != 0) {
		ubiserverurl = self.location.protocol +"//"+ self.location.host + htmlViewer.params.ubiserverurl;
	} else {
		ubiserverurl = htmlViewer.params.ubiserverurl;
	}
	
	if( UbiJS_Run_Plugin ) {
 
		try { UbiJS_WINDOC.body.removeChild(UbiJS_WINDOC.getElementById(UbiJS_Div_PluginViewer)); } catch(e) {}
		UbiJS_PlguinViewer = null;

		if( UbiJS_PluginCheck() ) {
			
			UbiJS_PluginViewer_Arg = htmlViewer.params.arg;
			
			var i = 0;
			var pluginScript = [];
			pluginScript[i++] = "<object id='" + UbiJS_Object_PluginViewer + "' type='" + UbiJS_PluginType() + "' width='1px' height='1px'>";
			pluginScript[i++] = "	<param name='ocxtype'				value='" + UbiJS_ActiveXEdition() + "'>";
			pluginScript[i++] = "	<param name='ubiServerURL'			value='" + ubiserverurl + "'>";
			pluginScript[i++] = "	<param name='jrfFileDir'			value=''>";
			pluginScript[i++] = "	<param name='jrfFileName'			value=''>";
			pluginScript[i++] = "	<param name='dataSource'			value=''>";
			pluginScript[i++] = "	<param name='progress'				value='" + htmlViewer.params.pluginprogress + "'>";
			pluginScript[i++] = "	<param name='printsetmode'			value='1'>";
			pluginScript[i++] = "	<param name='scale'					value='100'>";
			pluginScript[i++] = "	<param name='toolbar'				value='false'>";
			pluginScript[i++] = "	<param name='margin'				value='false'>";
			pluginScript[i++] = "	<param name='fontRevision'			value='true'>";  // 폰트보정. 변경 불가.
			pluginScript[i++] = "	<param name='printMarginRevision'	value='true'>";  // 출력보정. 변경 불가.
			pluginScript[i++] = "	<param name='Viewer.IsRunThread'	value='true'>";
			pluginScript[i++] = "</object>";
			
			var obj = document.createElement("div");
			obj.id = UbiJS_Div_PluginViewer;
			obj.style.cssText = "position:absolute; width:0px; height:0px; left:50%; top:50%;";
			obj.innerHTML = pluginScript.join("");
			UbiJS_WINDOC.body.appendChild(obj);

			if( isPrintSet )
				UbiJS_PluginViewer_ActType = 1;	// PrintSet
			else
				UbiJS_PluginViewer_ActType = 0;	// Direct 인쇄
			
			UbiJS_PluginViewer_RetrieveUrfUrl = htmlViewer.retrieveUrfUrl;
			
			UbiJS_PlguinViewer = UbiJS_WINDOC.getElementById(UbiJS_Object_PluginViewer);
		}
	}
	else {

		function UbiJS_LoadReport(ws) {
			UbiJS_WsViewer = new UbiWSViewer(ws);
			
			// 전용 뷰어 설정
			var _params = htmlViewer.pluginparams;
			if (_params != undefined) {
				for (var i = 0; i < _params.length; i+=2) {
					//console.log(_params[i] + ' - ' + _params[i+1]);	
					UbiJS_WsViewer.SetVariable(_params[i], _params[i+1]);
				}
			}
			
			UbiJS_WsViewer.arg = htmlViewer.params.arg;
			UbiJS_WsViewer.ubiserverurl = ubiserverurl;
			UbiJS_WsViewer.jrffiledir = '';
			UbiJS_WsViewer.jrffilename = '';
			UbiJS_WsViewer.datasource = '';
			UbiJS_WsViewer.progress = htmlViewer.params.pluginprogress;
			UbiJS_WsViewer.printsetmode = '1';
			UbiJS_WsViewer.scale = '100';
			UbiJS_WsViewer.toolbar = 'false';
			UbiJS_WsViewer.margin = 'false';
			UbiJS_WsViewer.fontrevision = 'true';
			UbiJS_WsViewer.printmarginrevision = 'true';
			UbiJS_WsViewer.SetVariable("Viewer.IsRunThread", "true");
			UbiJS_WsViewer.setResize("hide");	//창 안보임
			
			if (htmlViewer.params.reporttitle != '') {
				UbiJS_WsViewer.reporttitle = htmlViewer.params.reporttitle;
			} else {
				//UbiJS_WsViewer.reporttitle = htmlViewer.params.jrffile;
				UbiJS_WsViewer.jrffilename = htmlViewer.params.jrffile;
			}
			
			UbiJS_WsViewer.PrintHtmlUrf(isPrintSet, htmlViewer.params.isStreaming, 
										htmlViewer.totalPage, htmlViewer.toolbar.page, htmlViewer.retrieveUrfUrl);

		};
		
		try {
			
			if( UbiJS_WsViewer != null ) {
				
				UbiJS_WsViewer.close();
				UbiJS_WsViewer = null;
			}
		}
		catch(e) {}
		
		InitWebSocket(UbiJS_LoadReport, htmlViewer);
		
	}
}

/**
 * HTML 뷰어에서 저장 클릭 시 호출되는 함수
 */
function exeExport(exportType, htmlViewer) {

	if( UbiJS_WINDOC == null ) {
		try {
			UbiJS_WINDOC = document;	
		}
		catch(e){}
	}

	UbiJS_Is_PrintJob = false;
	UbiJS_Viewer_Progress = _ubi_strToBool(htmlViewer.params.pluginprogress);
	// 전용 뷰어 출력인 경우 HTML 뷰어에 설정한 언어로 변경
	UbiJS_Language = htmlViewer.params.language;

	// Plugin 뷰어의 프로그래스바 설정이 False이면 메시지를 보여준다.
	if( !UbiJS_Viewer_Progress ) {
		
		if( UbiJS_Is_PrintJob )
			UbiJS_ShowPrintStandby();
		else
			UbiJS_ShowExportStandby();
	}
	
	if( UbiJS_Run_Plugin ) {

		try { UbiJS_WINDOC.body.removeChild(UbiJS_WINDOC.getElementById(UbiJS_Div_PluginViewer)); } catch(e) {}
		UbiJS_PlguinViewer = null;
		
		if( UbiJS_PluginCheck() ) {
			
			UbiJS_PluginViewer_Arg = htmlViewer.params.arg;
			
			var i = 0;
			var pluginScript = [];
			
			pluginScript[i++] = "<object id='" + UbiJS_Object_PluginViewer + "' type='" + UbiJS_PluginType() + "' width='1px' height='1px'>";
			pluginScript[i++] = "	<param name='ocxtype'				value='" + UbiJS_ActiveXEdition() + "'>";
			pluginScript[i++] = "	<param name='ubiServerURL'			value='" + htmlViewer.params.ubiserverurl + "'>";
			pluginScript[i++] = "	<param name='jrfFileDir'			value=''>";
			pluginScript[i++] = "	<param name='jrfFileName'			value=''>";
			pluginScript[i++] = "	<param name='dataSource'			value=''>";
			pluginScript[i++] = "	<param name='progress'				value='" + htmlViewer.params.pluginprogress + "'>";
			pluginScript[i++] = "	<param name='printsetmode'			value='1'>";
			pluginScript[i++] = "	<param name='scale'					value='100'>";
			pluginScript[i++] = "	<param name='toolbar'				value='false'>";
			pluginScript[i++] = "	<param name='margin'				value='false'>";
			pluginScript[i++] = "	<param name='fontRevision'			value='true'>";  // 폰트보정. 변경 불가.
			pluginScript[i++] = "	<param name='printMarginRevision'	value='true'>";  // 출력보정. 변경 불가.
			pluginScript[i++] = "	<param name='Viewer.IsRunThread'	value='true'>";
			pluginScript[i++] = "</object>";

			var obj = document.createElement("div");
			obj.id = UbiJS_Div_PluginViewer;
			obj.style.cssText = "position:absolute; width:0px; height:0px; left:50%; top:50%;";
			obj.innerHTML = pluginScript.join("");
			UbiJS_WINDOC.body.appendChild(obj);

			UbiJS_PluginViewer_ActType = exportType;
			// 여기 추가
			UbiJS_PluginViewer_RetrieveUrfUrl = htmlViewer.retrieveUrfUrl;
			
			UbiJS_PlguinViewer = UbiJS_WINDOC.getElementById(UbiJS_Object_PluginViewer);
		}

	}
	else {
		
		function UbiJS_LoadReport(ws) {

			UbiJS_WsViewer = new UbiWSViewer(ws);
			
			// 전용 뷰어 설정
			var _params = htmlViewer.pluginparams;
			if (_params != undefined) {
				for (var i = 0; i < _params.length; i+=2) {
					//console.log(_params[i] + ' - ' + _params[i+1]);	
					UbiJS_WsViewer.SetVariable(_params[i], _params[i+1]);
				}	
			}
			
			// HWPML 저장 시 옵션 반영
			if (exportType == 17) {
				
				UbiJS_WsViewer.SetVariable("Export.HML.DefaultExtension", htmlViewer.HmlExtension);
				UbiJS_WsViewer.SetVariable("Export.HML.TextWrap", htmlViewer.params.hmlTextWrap);
				UbiJS_WsViewer.SetVariable("Export.HML.TableProtect", htmlViewer.params.hmlTableProtect);
			}
			// Excel 저장 시 옵션 반영
//			else if (exportType == 12) {
//			}
			
			UbiJS_WsViewer.arg = htmlViewer.params.arg;
			UbiJS_WsViewer.ubiserverurl = htmlViewer.params.ubiserverurl;
			UbiJS_WsViewer.jrffiledir = '';
			UbiJS_WsViewer.jrffilename = '';
			UbiJS_WsViewer.datasource = '';
			UbiJS_WsViewer.progress = htmlViewer.params.pluginprogress;
			UbiJS_WsViewer.printsetmode = '1';
			UbiJS_WsViewer.scale = '100';
			UbiJS_WsViewer.toolbar = 'false';
			UbiJS_WsViewer.margin = 'false';
			UbiJS_WsViewer.fontrevision = 'true';
			UbiJS_WsViewer.printmarginrevision = 'true';
			UbiJS_WsViewer.SetVariable("Viewer.IsRunThread", "true");
			UbiJS_WsViewer.setResize("hide");	//창 안보임
			
			if (htmlViewer.params.reporttitle != '') {
				UbiJS_WsViewer.reporttitle = htmlViewer.params.reporttitle;
			} else {
				var jrffilename = htmlViewer.params.jrffile;
				jrffilename = jrffilename.substring(0, jrffilename.lastIndexOf("."));
				UbiJS_WsViewer.reporttitle = jrffilename;
				//UbiJS_WsViewer.reporttitle = htmlViewer.params.jrffile;
			}
			
			UbiJS_WsViewer.ExportHtmlUrf(exportType, htmlViewer.params.isStreaming, htmlViewer.totalPage, 
										htmlViewer.toolbar.page, htmlViewer.retrieveUrfUrl);
		};

		try {
			
			if( UbiJS_WsViewer != null ) {
				
				UbiJS_WsViewer.close();
				UbiJS_WsViewer = null;
			}
		}
		catch(e) {}
		
		InitWebSocket(UbiJS_LoadReport, htmlViewer);
		
	}
}

/*******************************************************************
Plugin 전용 함수
*******************************************************************/

/**
 * 플러그인 설치 확인
 */
function UbiJS_PluginCheck() {

	if( UbiJS_Run_Plugin ) {
		
		if( UbiJS_PluginInstallCheck(UbiJS_GetPluginType(), "UbiDecision.UbiViewerPlugin.1") ) {
			
			if( UbiJS_PluginUpdateCheck() ) {

				UbiJS_CabUpdateCheck();
				return true;
			}
			else {
				// 플러그인 설치 버전 업데이트로 인해 설치 페이지로 이동
				UbiJS_ShowPluginInstall(true);
				return false;
			}
		}
		else {
			// 플러그인 미설치로 인해 설치 페이지로 이동
			UbiJS_ShowPluginInstall(false);
			return false;
		}
	}
	else {
		// 플러그인 미지원 브라우져 안내 페이지로 이동
		UbiJS_ShowPluginWarning();
		return false;
	}
}

/**
 * 플러그인 타입명 가져오기
 */
function UbiJS_GetPluginType() {

	return "application/x-ubiviewerplugin";
}

/**
 * 플러그인 모듈명 반환
 */
function UbiJS_PluginType() {

	return "application/x-ubiviewer";
}

/**
 * 플러그인 설치 버전 체크
 */
function UbiJS_PluginInstallCheck(mimetype, progid) {

	if( UbiJS_WINDOC.getElementById(UbiJS_PluginId) == null ) {
		
		var i = 0;
		var pluginScript = [];

		pluginScript[i++] = "<object id='" + UbiJS_PluginId + "' type='" + UbiJS_GetPluginType() + "' width='1px' height='1px'></object>";
		
		var obj = document.createElement("div");
		obj.id = UbiJS_Div_PluginId;
		obj.style.cssText = "position:absolute; width:0px; height:0px; left:0px; top:0px;";
		obj.innerHTML = pluginScript.join("");
		UbiJS_WINDOC.body.appendChild(obj);
	}
	UbiJS_Object = UbiJS_WINDOC.getElementById(UbiJS_PluginId);
	try {

		UbiJS_CurrentInstalledVersion = UbiJS_Object.GetVersion();
		return true; // 설치버전 있음
	}
	catch(e) {

		return false; // 설치안됨
	}
	return false;
}

/**
 * 플러그인의 업그레이드 버전 체크
 */
function UbiJS_PluginUpdateCheck() {

	if( UbiJS_PluginVersion == UbiJS_CurrentInstalledVersion )
		return true;

	UbiJS_CurrentInstalledVersion = UbiJS_CurrentInstalledVersion.replace(/,/gi, ".");
	var ver1 = UbiJS_CurrentInstalledVersion.split(".");
	var ver2 = UbiJS_PluginVersion.split(".");
	if( parseInt(ver1[0])>parseInt(ver2[0]) ) {return true;}
	else if( parseInt(ver1[0])<parseInt(ver2[0]) ) {return false;}
	else if( parseInt(ver1[1])>parseInt(ver2[1]) ) {return true;}
	else if( parseInt(ver1[1])<parseInt(ver2[1]) ) {return false;}
	else if( parseInt(ver1[2])>parseInt(ver2[2]) ) {return true;}
	else if( parseInt(ver1[2])<parseInt(ver2[2]) ) {return false;}
	else if( parseInt(ver1[3])>parseInt(ver2[3]) ) {return true;}
	return false;
}

/**
 * Cab 파일 업데이트 체크
 */
function UbiJS_CabUpdateCheck() {

	var xmlDoc;
	var url;
	var title;
	var version;

	var XML = "";
	var resultXML = '';

	if( UbiJS_IsIE ) {

		try {
			xmlDoc = UbiJS_MS_XMLDOM;
		}
		catch(e) {
			xmlDoc=new ActiveXObject("Microsoft.XMLDOM");
		}
		xmlDoc.async = false;
		xmlDoc.loadXML(UbiJS_CabUpdateXml);
	}
	else {

		if( window.DOMParser ) {

			parser=new DOMParser();
			xmlDoc=parser.parseFromString(UbiJS_CabUpdateXml,"text/xml");
		}
	}

	if( xmlDoc ) {

		for( var i=0;i<xmlDoc.getElementsByTagName("file").length;i++ ) {

			title = xmlDoc.getElementsByTagName("file")[i].attributes[0].value; // title
			try {
				url = xmlDoc.getElementsByTagName("file")[i].attributes['url'].value; // url
				version = xmlDoc.getElementsByTagName("file")[i].attributes['version'].value; // version
			}
			catch(e) {
				url = xmlDoc.getElementsByTagName("file")[i].attributes[1].value; // url
				version = xmlDoc.getElementsByTagName("file")[i].attributes[2].value; // version
			}

			var result = UbiJS_CheckCabVersion(UbiJS_Object.getFileVersion(url.substring(url.lastIndexOf("/")+1,url.length)), version);

			if( result==false ) {

				XML += "<file title='"+title+"' url='"+url+"'>";
			}
		}
		resultXML = "<update>"+XML+"</update>";
	}

	if( XML=='' ) {

		return true;
	}
	else {

		UbiJS_Object.setUpdateXml(resultXML);
		return false;
	}
}

/**
 * Cab 버전 체크를 통한 업데이트 여부 반환
 */
function UbiJS_CheckCabVersion(cur, last) {

	last = last.replace(/,/gi, ".");

	if(last == cur) return true;
	var ver1 = cur.split(".");
	var ver2 = last.split(".");

	if(parseInt(ver1[0])>parseInt(ver2[0])) {return true;}
	else if(parseInt(ver1[0])<parseInt(ver2[0])) {return false;}
	else if(parseInt(ver1[1])>parseInt(ver2[1])) {return true;}
	else if(parseInt(ver1[1])<parseInt(ver2[1])) {return false;}
	else if(parseInt(ver1[2])>parseInt(ver2[2])) {return true;}
	else if(parseInt(ver1[2])<parseInt(ver2[2])) {return false;}
	else if(parseInt(ver1[3])>parseInt(ver2[3])) {return true;}
	return false;
}

/**
 * 플러그인 지원 브라우져 여부
 */
function UbiJS_PluginAvailableBrowser() {

	// 우선 WS만 가능하도록
	return false;
	
	// Edge or Chrome 45 이상 버전이면 플러그인 미지원 브라우져
/*	if( UbiJS_IsEdge || ( UbiJS_IsChrome && UbiJS_GetBrowserVersion() > 44 ) || ( UbiJS_IsOpera && UbiJS_GetBrowserVersion() > 32 ) )
		return false;
	return true;*/
}

/**
 * 브라우저별 설치 가이드 가져오기
 */
function UbiJS_GetInstallContents() {

	if(UbiJS_IsSafari){return UbiJS_HelpSafari;}
	if(UbiJS_IsFirefox){return UbiJS_HelpFireFox;}
	if(UbiJS_IsChrome){return UbiJS_HelpChrome;}
	if(UbiJS_IsOpera){return UbiJS_HelpOpera;}
	if(UbiJS_IsIE){return UbiJS_HelpIE;}
	return "";
}

/**
 * 브라우저별로 메세지 표시 처리
 */
function UbiJS_Alert(msg, title) {

	if( UbiJS_IsIE ) {

		alert(msg); // IE 는 alert 함수 그대로 이용.
	}
	else {

		if(!title) {

			title='UbiReport';
		}
		
		var i = 0;
		var pluginScript = [];
		
		pluginScript[i++] = "<object id='" + UbiJS_Object_PluginViewerVersion + "' type='" + UbiJS_PluginType() + "' width='1px' height='1px'></object>";
		
		var obj = document.createElement("div");
		obj.style.cssText = "position:absolute; width:0px; height:0px; left:0px; top:0px;";
		obj.innerHTML = pluginScript.join("");
		UbiJS_WINDOC.body.appendChild(obj);
		UbiJS_CurrentInstalledVersion = UbiJS_WINDOC.getElementById('UbiJS_Object_PluginViewerVersion').Alert(msg, title); //브라우저 특성상 내부 메세지 창 이용
		UbiJS_WINDOC.body.removeChild(obj);
	}
}

/**
 * 뷰어 유형 반환
 */
function UbiJS_ActiveXEdition() {

	var cab_edition = "";
	if( UbiJS_CabUpdateXml.indexOf("UbiViewerXP.cab")>=0 ) {
		cab_edition = "MBCS";
	}
	else if( UbiJS_CabUpdateXml.indexOf("UbiViewerXUniP.cab")>=0 ) {
		cab_edition = "UNICODE";
	}
	else if( UbiJS_CabUpdateXml.indexOf("UbiViewerXMarkAnyP.cab")>=0 ) {
		cab_edition = "MARKANY";
	}
	else if( UbiJS_CabUpdateXml.indexOf("UbiViewerXBcqreP.cab")>=0 ) {
		cab_edition = "BCQRE";
	}
	else if( UbiJS_CabUpdateXml.indexOf("UbiViewerXBcqreUniP.cab")>=0 ) {
		cab_edition = "BCQREUNI";
	}
	return cab_edition;
}

/**
 * 플러그인 이벤트 추가
 */
function UbiJS_AddEvent(obj, name, func) {

	if(obj) {
		if(obj.attachEvent) {
			obj.attachEvent("on"+name,func);
		}
		else{ obj.addEventListener(name,func,false);
		}
	}
}


/*******************************************************************
WebSocket 전용 함수
*******************************************************************/
//----------------------------------------------------------------------------------------------------
// WebSocket 뷰어 객체 정보
//----------------------------------------------------------------------------------------------------
var UbiWSViewer = function(websocket) {

	var ws = websocket;
	
	// property
	this.fileurl = "";
	this.ubiserverurl = "",
	this.jrffiledir = "",
	this.jrffilename = "",
	this.datasource = "",
	this.islocalfile = "false",
	this.islocaldata = "false",
	this.scale = "100",
	this.resource = "fixed",
	this.invisibletoolbar = "",
	this.rowdim = "",
	this.coldim = "",
	this.margin = "",
	this.progress = "",
	this.toolbar = "",
	this.popupmenu = "",
	this.servletrooturl = "",
	this.exportfilename = "",
	this.exportds = "",
	this.invisibleexporttypes = "",
	this.isurf = "",
	this.printcopies = "1",
	this.printleftmargin = "",
	this.printtopmargin = "",
	this.isencrypt = "false",
	this.isencrypt64 = "false",
	this.barcodeposition = "",
	this.cdposition = "",
	this.docname = "",
	this.pagenames = "",
	this.isdrm = "",
	this.reportid = "",
	this.printmarginrevision = "true",
	this.printsetmode = "",
	this.printpapersize = "",
	this.imagecache = "false",
	this.fontelement = "",
	this.reporttitle = "",
	this.printautofit = "",
	this.fontrevision = "true",
	this.exportsetmode = "",
	this.ismultireport = "false",
	this.multicount = "1",
	this.ispluginasync = "false",
	this.arg = "",
	this.reqtype = "retrieve",
	this.variable = "",
	this.resize = "",
	
	// method
	this.retrieve = function() {
		// UbiServer와 연결되어 있는 지 체크
		//if (this.checkWebSocket() == false)
		//	return;
		
		var propery = this.GetUbiProperty();
		var msg = "reqtype" + UbiJS_WS_CS_ + "retrieve" + UbiJS_WS_RS_ + propery;

		// SetVariable을 통해 설정한 속성
		if (this.variable != '') {
			msg += this.variable;
			this.variable = '';
		}
		
		if (this.resize != '') {
			//msg += this.resize;
			msg = this.resize + msg;
			this.resize = '';
		}
		
		this.UbiJS_WsSend(msg);
		UbiJS_WsSleep(100);
	};
	
	this.RetrieveBind = function() {
		var propery = this.GetUbiProperty();
		var msg = "reqtype" + UbiJS_WS_CS_ + "retrievebind" + UbiJS_WS_RS_ + propery;

		//SetVariable을 통해 설정한 속성
		if (this.variable != '') {
			msg += this.variable;
			this.variable = '';
		}
		
		if (this.resize != '') {
			msg = this.resize + msg;
			this.resize = '';
		}
		
		this.UbiJS_WsSend(msg);
		sleep(100);
	};
	
	this.RetrieveUrf = function(s1) {
		// s1 : urf file path
		var propery = this.GetUbiProperty();
		var msg = "reqtype" + UbiJS_WS_CS_ + ("retrieveurf#" + s1) + UbiJS_WS_RS_ + propery;
		
		//SetVariable을 통해 설정한 속성
		if (this.variable != '') {
			msg += this.variable;
			this.variable = '';
		}
		
		if (this.resize != '') {
			msg = this.resize + msg;
			this.resize = '';
		}
		
		this.UbiJS_WsSend(msg);
	};
	
	this.PrintHtmlUrf = function(isPrintSet, isStreaming, totalpage, currentpage, urfurl) {
		// s1 : urf file path
		var propery = this.GetUbiProperty();
		var printtype = 1;
		if (isPrintSet) {
			printtype = 1;
		} else {
			printtype = 0;
		}
		var msg = "reqtype" + UbiJS_WS_CS_ + "printhtmlurf" + UbiJS_WS_RS_ 
				+ "isprintsetup" + UbiJS_WS_CS_ + printtype + UbiJS_WS_RS_
				+ "isstreaming" + UbiJS_WS_CS_ + isStreaming + UbiJS_WS_RS_
				+ "totalpage" + UbiJS_WS_CS_ + totalpage + UbiJS_WS_RS_
				+ "currentpage" + UbiJS_WS_CS_ + currentpage + UbiJS_WS_RS_
				+ "urfurl" + UbiJS_WS_CS_ + urfurl + UbiJS_WS_RS_
				+ propery;
		//SetVariable을 통해 설정한 속성
		if (this.variable != '') {
			msg += this.variable;
			this.variable = '';
		}
		
		if (this.resize != '') {
			msg = this.resize + msg;
			this.resize = '';
		}
		
		this.UbiJS_WsSend(msg);
	};
	
	this.ExportHtmlUrf = function(exportType, isStreaming, totalpage, currentpage, urfurl) {
		var propery = this.GetUbiProperty();
		
		var msg = "reqtype" + UbiJS_WS_CS_ + "exporthtmlurf" + UbiJS_WS_RS_ 
				+ "exporttype" + UbiJS_WS_CS_ + exportType + UbiJS_WS_RS_
				+ "isstreaming" + UbiJS_WS_CS_ + isStreaming + UbiJS_WS_RS_
				+ "totalpage" + UbiJS_WS_CS_ + totalpage + UbiJS_WS_RS_
				+ "currentpage" + UbiJS_WS_CS_ + currentpage + UbiJS_WS_RS_
				+ "urfurl" + UbiJS_WS_CS_ + urfurl + UbiJS_WS_RS_
				+ propery;
		//SetVariable을 통해 설정한 속성
		if (this.variable != '') {
			msg += this.variable;
			this.variable = '';
		}
		
		if (this.resize != '') {
			msg = this.resize + msg;
			this.resize = '';
		}
		
		this.UbiJS_WsSend(msg);
	};
	
	this.GetUbiProperty = function() {
	var msg = "isPluginAsync" + UbiJS_WS_CS_ +	this.ispluginasync + UbiJS_WS_RS_
			+ "isPlugin" + UbiJS_WS_CS_ +	"true" + UbiJS_WS_RS_
			+ "isencrypt" + UbiJS_WS_CS_ +	this.isencrypt + UbiJS_WS_RS_
			+ "isencrypt64" + UbiJS_WS_CS_ +	this.isencrypt64 + UbiJS_WS_RS_
			+ "fileurl" + UbiJS_WS_CS_ +	this.fileurl + UbiJS_WS_RS_
			+ "ubiserverurl" + UbiJS_WS_CS_ +	this.ubiserverurl + UbiJS_WS_RS_
			+ "jrffiledir" + UbiJS_WS_CS_ +	this.jrffiledir + UbiJS_WS_RS_
			+ "jrffilename" + UbiJS_WS_CS_ +	this.jrffilename + UbiJS_WS_RS_
			+ "datasource" + UbiJS_WS_CS_ +	this.datasource + UbiJS_WS_RS_
			+ "islocalfile" + UbiJS_WS_CS_ + this.islocalfile + UbiJS_WS_RS_
			+ "islocaldata" + UbiJS_WS_CS_ + this.islocaldata + UbiJS_WS_RS_
			+ "scale" + UbiJS_WS_CS_ +	this.scale + UbiJS_WS_RS_
			+ "resource" + UbiJS_WS_CS_ +	this.resource + UbiJS_WS_RS_
			+ "invisibletoolbar" + UbiJS_WS_CS_ +	this.invisibletoolbar + UbiJS_WS_RS_
			+ "rowdim" + UbiJS_WS_CS_ +	this.rowdim + UbiJS_WS_RS_
			+ "coldim" + UbiJS_WS_CS_ +	this.coldim + UbiJS_WS_RS_
			+ "margin" + UbiJS_WS_CS_ +	this.margin + UbiJS_WS_RS_
			+ "progress" + UbiJS_WS_CS_ + this.progress + UbiJS_WS_RS_
			+ "toolbar" + UbiJS_WS_CS_ + this.toolbar + UbiJS_WS_RS_
			+ "popupmenu" + UbiJS_WS_CS_ +	this.popupmenu + UbiJS_WS_RS_
			+ "servletrooturl" + UbiJS_WS_CS_ +	this.servletrooturl + UbiJS_WS_RS_
			+ "exportfilename" + UbiJS_WS_CS_ +	this.exportfilename + UbiJS_WS_RS_
			+ "exportds" + UbiJS_WS_CS_ +	this.exportds + UbiJS_WS_RS_
			+ "invisibleexporttypes" + UbiJS_WS_CS_ +	this.invisibleexporttypes + UbiJS_WS_RS_
			+ "isurf" + UbiJS_WS_CS_ +	this.isurf + UbiJS_WS_RS_
			+ "printcopies" + UbiJS_WS_CS_ +	this.printcopies + UbiJS_WS_RS_
			+ "printleftmargin" + UbiJS_WS_CS_ +	this.printleftmargin + UbiJS_WS_RS_
			+ "printtopmargin" + UbiJS_WS_CS_ +	this.printtopmargin + UbiJS_WS_RS_
			+ "reportid" + UbiJS_WS_CS_ +	this.reportid + UbiJS_WS_RS_
			+ "printmarginrevision" + UbiJS_WS_CS_ +	this.printmarginrevision + UbiJS_WS_RS_
			+ "printsetmode" + UbiJS_WS_CS_ +	this.printsetmode + UbiJS_WS_RS_
			+ "printpapersize" + UbiJS_WS_CS_ +	this.printpapersize + UbiJS_WS_RS_
			+ "reporttitle" + UbiJS_WS_CS_ +	this.reporttitle + UbiJS_WS_RS_
			+ "imagecache" + UbiJS_WS_CS_ +	this.imagecache + UbiJS_WS_RS_
			+ "fontelement" + UbiJS_WS_CS_ +	this.fontelement + UbiJS_WS_RS_
			+ "printautofit" + UbiJS_WS_CS_ +	this.printautofit + UbiJS_WS_RS_
			+ "fontrevision" + UbiJS_WS_CS_ +	this.fontrevision + UbiJS_WS_RS_
			+ "exportsetmode" + UbiJS_WS_CS_ +	this.exportsetmode + UbiJS_WS_RS_
			+ "ismultireport" + UbiJS_WS_CS_ +	this.ismultireport + UbiJS_WS_RS_
			+ "multicount" + UbiJS_WS_CS_ +	this.multicount + UbiJS_WS_RS_
			+ "arg" + UbiJS_WS_CS_ + this.arg + UbiJS_WS_RS_;
		
		return msg;
	};
	
	this.ExportFile = function(s1) {
		
		var filetype = s1;
		var msg = "reqtype" + UbiJS_WS_CS_ + ("exportfile#"+filetype) + UbiJS_WS_RS_
				+ "exportfilename" + UbiJS_WS_CS_ + this.exportfilename + UbiJS_WS_RS_;
		this.UbiJS_WsSend(msg);
	};
	
	this.exportset = function() {
		var msg = "reqtype" + UbiJS_WS_CS_ + "exportset" + UbiJS_WS_RS_;
		this.UbiJS_WsSend(msg);
	};
	
	this.exportReport = function(s1, s2, s3) {
		var jrffilename = s1;
		var args = s2;
		var exporttype = s3;
		
		var msg = "reqtype" + UbiJS_WS_CS_ + "exportreport" + UbiJS_WS_RS_
				+ "jrffilename" + UbiJS_WS_CS_ + jrffilename + UbiJS_WS_RS_
				+ "args" + UbiJS_WS_CS_ + args + UbiJS_WS_RS_
				+ "exporttype" + UbiJS_WS_CS_ + exporttype + UbiJS_WS_RS_;
		this.UbiJS_WsSend(msg);
	};
	
	this.exportsetReport = function(s1, s2, s3) {
		var jrffilename = s1;
		var args = s2;
		var exporttype = s3;
		
		var msg = "reqtype" + UbiJS_WS_CS_ + "exportsetreport" + UbiJS_WS_RS_
				+ "jrffilename" + UbiJS_WS_CS_ + jrffilename + UbiJS_WS_RS_
				+ "args" + UbiJS_WS_CS_ + args + UbiJS_WS_RS_
				+ "exporttype" + UbiJS_WS_CS_ + exporttype + UbiJS_WS_RS_;
		this.UbiJS_WsSend(msg);
	};
	
	this.print = function() {
		var msg = "reqtype" + UbiJS_WS_CS_ + "print" + UbiJS_WS_RS_;
		this.UbiJS_WsSend(msg);
	};
	
	this.printset = function() {
		var msg = "reqtype" + UbiJS_WS_CS_ + "printset" + UbiJS_WS_RS_;
		this.UbiJS_WsSend(msg);
	};
	
	this.directPrint = function() {
		var msg = "reqtype" + UbiJS_WS_CS_ + "directprint" + UbiJS_WS_RS_;
		this.UbiJS_WsSend(msg);
		UbiJS_WsSleep(100);
		
		this.close();
	};
	
	this.printReport = function(s1, s2) {
		var jrffilename = s1;
		var args = s2;
		
		var msg = "reqtype" + UbiJS_WS_CS_ + "printreport" + UbiJS_WS_RS_
				+ "jrffilename" + UbiJS_WS_CS_ + jrffilename + UbiJS_WS_RS_
				+ "args" + UbiJS_WS_CS_ + args + UbiJS_WS_RS_;
		this.UbiJS_WsSend(msg);
	};
	
	this.printReportResizing = function(s1, s2, s3) {
		var jrffilename = s1;
		var args = s2;
		var papersize = s3;
		
		var msg = "reqtype" + UbiJS_WS_CS_ + "printreportresizing" + UbiJS_WS_RS_
				+ "jrffilename" + UbiJS_WS_CS_ + jrffilename + UbiJS_WS_RS_
				+ "args" + UbiJS_WS_CS_ + args + UbiJS_WS_RS_
				+ "papersize" + UbiJS_WS_CS_ + papersize + UbiJS_WS_RS_;
		this.UbiJS_WsSend(msg);
	};
	
	this.printsetReport = function(s1, s2, s3) {
		var jrffilename = s1;
		var args = s2;
		var pagenum = s3;
		
		var msg = "reqtype" + UbiJS_WS_CS_ + "printsetreport" + UbiJS_WS_RS_
				+ "jrffilename" + UbiJS_WS_CS_ + jrffilename + UbiJS_WS_RS_
				+ "args" + UbiJS_WS_CS_ + args + UbiJS_WS_RS_
				+ "pagenum" + UbiJS_WS_CS_ + pagenum + UbiJS_WS_RS_;
		this.UbiJS_WsSend(msg);
	};
	
	this.SetDataset = function(s1, s2) {
		var dsid = s1;
		var dsdata = s2;
	
		var msg = "reqtype" + UbiJS_WS_CS_ + "setdataset" + UbiJS_WS_RS_
				+ dsid + "#" + dsdata;
		this.UbiJS_WsSend(msg);
	};
	
	this.DrmStart = function() {
		var msg = "reqtype" + UbiJS_WS_CS_ + "drmstart" + UbiJS_WS_RS_
				+ "isencrypt" + UbiJS_WS_CS_ +	this.isencrypt + UbiJS_WS_RS_
				+ "isencrypt64" + UbiJS_WS_CS_ +	this.isencrypt64 + UbiJS_WS_RS_
				+ "ubiserverurl" + UbiJS_WS_CS_ +	this.ubiserverurl + UbiJS_WS_RS_
				+ "barcodeposition" + UbiJS_WS_CS_ +	this.barcodeposition + UbiJS_WS_RS_
				+ "cdposition" + UbiJS_WS_CS_ +	this.cdposition + UbiJS_WS_RS_
				+ "docname" + UbiJS_WS_CS_ +	this.docname + UbiJS_WS_RS_
				+ "pagenames" + UbiJS_WS_CS_ +	this.pagenames + UbiJS_WS_RS_
				+ "isdrm" + UbiJS_WS_CS_ +	this.isdrm + UbiJS_WS_RS_;
		this.UbiJS_WsSend(msg);
		UbiJS_WsSleep(200);
	};
	
	this.firstPage = function() {
		var msg = "reqtype" + UbiJS_WS_CS_ + "firstpage" + UbiJS_WS_RS_;
		this.UbiJS_WsSend(msg);
	};
	
	this.previousPage = function() {
		var msg = "reqtype" + UbiJS_WS_CS_ + "previouspage" + UbiJS_WS_RS_;
		this.UbiJS_WsSend(msg);
	};
	
	this.nextPage = function() {
		var msg = "reqtype" + UbiJS_WS_CS_ + "nextpage" + UbiJS_WS_RS_;
		this.UbiJS_WsSend(msg);
	};
	
	this.lastPage = function() {
		var msg = "reqtype" + UbiJS_WS_CS_ + "lastpage" + UbiJS_WS_RS_;
		this.UbiJS_WsSend(msg);
	};
	
	this.setPage = function(s1) {
		var page = s1;
		var msg = "reqtype" + UbiJS_WS_CS_ + ("setpage#" + page) + UbiJS_WS_RS_;
		this.UbiJS_WsSend(msg);
	};
	
	this.zoomIn = function() {
		var msg = "reqtype" + UbiJS_WS_CS_ + "zoomin" + UbiJS_WS_RS_;
		this.UbiJS_WsSend(msg);
	};
	
	this.zoomOut = function() {
		var msg = "reqtype" + UbiJS_WS_CS_ + "zoomout" + UbiJS_WS_RS_;
		this.UbiJS_WsSend(msg);
	};
	
	this.LoadTemplet = function(s1) {
		var jrffilename = s1;
		var msg = "reqtype" + UbiJS_WS_CS_ + ("loadtemplet#" + jrffilename) + UbiJS_WS_RS_;
		this.UbiJS_WsSend(msg);
	};
	
	this.SetVariable = function(s1, s2) {
		if (s1 == 'Nexacro.DatasetInfos' || s1 == 'Nexacro.DesignData' || s1 == 'Nexacro.RuntimeData') {	
			var msg = "reqtype" + UbiJS_WS_CS_ + "setvariable_nexacro" + UbiJS_WS_RS_
					+ (s1 + "#" + s2);
			this.UbiJS_WsSend(msg);
		}
		else if (s1 == 'exportfilename') {
			this.exportfilename = s2;
			var msg = "reqtype" + UbiJS_WS_CS_ + "setvariable" + UbiJS_WS_RS_
					+ ('exportFileName' + UbiJS_WS_CS_ + s2 + UbiJS_WS_RS_);
			this.UbiJS_WsSend(msg);
		}
		else {
			this.variable += (s1 + UbiJS_WS_CS_ + s2 + UbiJS_WS_RS_);	
		}
	};
	
	this.refresh = function() {
		var msg = "reqtype" + UbiJS_WS_CS_ + "refresh" + UbiJS_WS_RS_;
		this.UbiJS_WsSend(msg);
	};
	
	this.sendVariable = function() {
		if (this.variable == '')
			return;
		
		var msg = "reqtype" + UbiJS_WS_CS_ + "setvariable" + UbiJS_WS_RS_
					+ this.variable;
		this.UbiJS_WsSend(msg);
		this.variable = "";
	};
	
	this.setProgress = function(s1) {
		var msg = "reqtype" + UbiJS_WS_CS_ + ("setprogress#"+s1) + UbiJS_WS_RS_;
		this.UbiJS_WsSend(msg);
	};
	
	this.SetVisibleTbButton = function(s1, s2) {
		// s1 : button id, s2 : flag
		var btnflag = s1 + '#' + s2;
		var msg = "reqtype" + UbiJS_WS_CS_ + ("setvisibletbbutton#"+btnflag) + UbiJS_WS_RS_;
		this.ubiWS_Send(msg);
	};
	
	// Viewer의 버전 정보를 확인한다.
	this.aboutBox = function() {
		var msg = "reqtype" + UbiJS_WS_CS_ + "aboutbox" + UbiJS_WS_RS_;
		this.UbiJS_WsSend(msg);
	};
	
	this.checkWebSocket = function() {
		// 0 : CONNECTING
		// 1 : OPEN
		// 2 : CLOSING
		// 3 : CLOSED
		if (ws.readyState != 1) {
			alert('UbiViewerWS\uc640 \uc5f0\uacb0\ub418\uc9c0 \uc54a\uc558\uc2b5\ub2c8\ub2e4.');
			return false;
		}
		
		return true;
	};
	
	// UbiServerWS 전체에 대한 버전을 확인한다.
	this.checkVersion = function() {
//		var msg = "reqtype" + UbiJS_WS_CS_ + "checkversion#" + UbiJS_WsVersion + UbiJS_WS_RS_ + UbiJS_WS_VER_EOF_;
		var msg = "reqtype" + UbiJS_WS_CS_ + "checkversion#" + UbiJS_WsVersion + UbiJS_WS_RS_ + UbiJS_WS_VER_EOF_ + UbiJS_WS_EOF_;
		ws.send(msg);
	};
	
	this.close = function() {
		var msg = "reqtype" + UbiJS_WS_CS_ + "close" + UbiJS_WS_RS_;
		this.UbiJS_WsSend(msg);
	};
	
	this.setResize = function(s1, s2, s3, s4) {
		// 최대화
		if (s2 == undefined && s3 == undefined && s4 == undefined) {
			var max = s1;
			this.resize = '';
			this.resize = "resize" + UbiJS_WS_CS_ + (max + "#") + UbiJS_WS_RS_;
		} else {
			var top = s1; // x
			var left = s2; // y
			var width = s3;
			var height = s4;
		
			this.resize = '';
			this.resize = "resize" + UbiJS_WS_CS_ + (left + "#" + top + "#" + width + "#" + height + "#") + UbiJS_WS_RS_;
		}
	};

	this.UbiJS_WsSend = function(msg) {
		msg += UbiJS_WS_EOF_;
		ws.send(msg);
	};
	
	//KKD 20170118. HTML 임베디드 시 재호출을 막기위해 사용함.
	this.quickPrint = function() {
		var msg = "reqtype" + UbiJS_WS_CS_ + "directprint" + UbiJS_WS_RS_;
		this.UbiJS_WsSend(msg);
		UbiJS_WsSleep(100);
		
		//this.close();
	};
};

/**
 * WebSocket 초기화 및 설치 여부 확인
 */
function InitWebSocket(callback, _htmlviewer) {
	
	if( !UbiJS_CheckSupportWS() ) {
		UbiJS_ShowWsWarning();
		return;
	}
	
	UbiJS_createWebSocket(callback, _htmlviewer);
}

/**
 * WebSocket 생성
 * @param callback
 */
function UbiJS_createWebSocket(callback, _htmlviewer) {
	// 모든 포트가 연결이 안될 경우 신규 설치
	if (UbiJS_WsCheckIndex > 2) {
		UbiJS_createWebSocketEnd(null, callback);
		return;
	}
	
	if (UbiJS_WsCheckComplete) {
		return;
	}
	
	var htmlviewer = _htmlviewer;
	var ws = null;
	var cur_protocolName = window.location.protocol;
	
	if (cur_protocolName === 'https:')
		ws = new WebSocket('wss://127.0.0.1:' + UbiJS_WsPorts[UbiJS_WsCheckIndex], UbiJS_WsProtocol);
	else
		ws = new WebSocket('ws://127.0.0.1:' + UbiJS_WsPorts[UbiJS_WsCheckIndex], UbiJS_WsProtocol);

	ws.onopen = function(e) {
		//console.log('ws.onopen === url : ' + ws.url);
	};

	ws.onmessage = function(e) {

		//console.log('ws.onmessage === data : ' + e.data);
		var message = e.data;
		var result = '';
		
		if( message.indexOf('RETRIEVEEND') != -1 ) {

			RetrieveEnd();
		}
		else if( message.indexOf('EXPORTEND') != -1 ) {

			message = message.replace(/\0/g, "");
			result = message.substring(message.indexOf('#')+1, message.length);
			ExportEnd(result);
			
			// HTML 뷰어에 선언된 ExportEnd 이벤트가 있다면 결과를 리턴
			if (htmlviewer) {
				if (htmlviewer.events.exportEnd) {
					// flag, exporturl
					var bResult = (result == '0') ? false : true;
					htmlviewer.events.exportEnd(bResult, result);
				}
			}
		}
		else if( message.indexOf('PRINTEND') != -1 ) {

			message = message.replace(/\0/g, "");
			result = message.substring(message.indexOf('#')+1, message.length);
			PrintEnd(result);
			
			// HTML 뷰어에 선언된 PrintEnd 이벤트가 있다면 결과를 리턴
			if (htmlviewer) {
				if (htmlviewer.events.printEnd) {
					var bResult = (result == '0') ? true : false;
					htmlviewer.events.printEnd(bResult);
				}
			}
		}
		else if( message.indexOf('CHECKVERSION') != -1 ) {
			
			result = message.substring(message.indexOf('#')+1, message.length);
			if( result == 'true' ) {	// 설치 OK. 미리보기
				if( callback ) {
					callback(ws);
				}
			}
			else {	// 업데이트 설치
				UbiJS_ShowWsInstall(true);
			}
		}
	};
	
	ws.onerror = function(e) {
		//console.log('ws.onerror === code : '+ e.code);
		try { UbiJS_WINDOC.getElementById(UbiJS_Div_PrintStandby).style.display = "none"; } catch(e) { }
		try { UbiJS_WINDOC.getElementById(UbiJS_Div_ExportStandby).style.display = "none"; } catch(e) { }
	};
	
	ws.onclose = function(e) {
		//console.log('ws.onclose === code : '+ e.code);
		try { UbiJS_WINDOC.getElementById(UbiJS_Div_PrintStandby).style.display = "none"; } catch(e) { }
		try { UbiJS_WINDOC.getElementById(UbiJS_Div_ExportStandby).style.display = "none"; } catch(e) { }
	};
	
	UbiJS_WsWaitCheckCount = 0;
	UbiJS_waitForWebSocketConnection(ws, callback);
}

function UbiJS_createWebSocketEnd(ws, callback) {
	// 재사용을 위한 변수 초기화
	UbiJS_WsCheckIndex = 0;
	UbiJS_WsCheckComplete = false;
	UbiJS_WsWaitCheckCount = 0;
	
	// 신규 설치
	if (ws == null) {
		UbiJS_ShowWsInstall(false);
		return;
	}

	// Version Check
	UbiJS_WsSleep(300);
	var checkmsg = "reqtype" + UbiJS_WS_CS_ + "checkversion#" + UbiJS_WsVersion + UbiJS_WS_RS_ + UbiJS_WS_VER_EOF_ + UbiJS_WS_EOF_;
	ws.send(checkmsg);
}

/**
 * WebSocket의 상태가 준비상태일때까지 대기 (3번연속 비정상이면 연결이 안되는것으로 판단) 
 * @param ws
 * @param callback
 */
function UbiJS_waitForWebSocketConnection(ws, callback){
	// 3번 연속 연결이 확인 안될 경우 다음 포트를 호출
	if (UbiJS_WsWaitCheckCount > 3) {
		if (ws) { 
			ws.close();
		}
		UbiJS_WsCheckIndex++;
		UbiJS_createWebSocket(callback);
		return;
	}
	
    setTimeout(
        function () {
            if (ws.readyState === 1) {
				//console.log("Connection is made");
                UbiJS_WsCheckComplete = true;
                UbiJS_createWebSocketEnd(ws, callback);
                return;
            } else {
				//console.log("wait for connection...["+ UbiJS_WsWaitCheckCount +"] : "+ ws.url);
                UbiJS_WsWaitCheckCount++;
                UbiJS_waitForWebSocketConnection(ws, callback);
            }
        }, 100);
}

/**
 * WebSocket 지원 가능 여부 확인
 */
function UbiJS_WSCheckBrowser() {
	
	if( UbiJS_Os === 'Windows NT' && UbiJS_GetBrowser() === 'MSIE' && UbiJS_GetBrowserVersion() < 10)		// IE10 미만 미지원
		return false;
	if (UbiJS_Os === 'Windows NT' && UbiJS_GetBrowser() === 'Chrome' && UbiJS_GetBrowserVersion() < 19)		// Chrome 19 미만 미지원
		return false;
	if (UbiJS_Os === 'Windows NT' && UbiJS_GetBrowser() === 'Firefox' && UbiJS_GetBrowserVersion() < 18)	// Firefox 18 미만 미지원
		return false;
	if (UbiJS_Os === 'Windows NT' && UbiJS_GetBrowser() === 'Safari')										// 해당 OS의 Safari 미지원
		return false;
	if (UbiJS_Os === 'Windows NT' && UbiJS_GetBrowser() === 'Opera' && UbiJS_GetBrowserVersion() < 15)		// Opera 15 미만 미지원
		return false;
	if (UbiJS_Os === 'Mac OS X' || UbiJS_Os === 'Linux')													// Mac/Linux 미지원
		return false;
	return true;
}

/**
 * WebSocket 지원 가능 여부 확인
 */
function UbiJS_CheckSupportWS() {
	
	if (!window.WebSocket) {
		return false;
	}
	
	if (!UbiJS_WSCheckBrowser()) {
		return false;
	}
	
	return true;
};

/**
 * 지정된 시간 내 WebSocket 연결 대기 설치 페이지 이동
 */
function UbiJS_WsStopCheck() {

	if( !UbiJS_WsInstallFlag ) {

		UbiJS_ShowWsInstall(false);
	}
}

/**
 * 지연 시간 발생.
 */
function UbiJS_WsSleep(delay) {

	var start = new Date().getTime();
	while (new Date().getTime() < start + delay);
}

/*******************************************************************
Plugin / WebSocke 메시지 보여주기
*******************************************************************/
/**
 * 플러그인 설치 및 업데이트 안내 메시지
 */
function UbiJS_ShowPluginInstall(isUpdate) {

	if( navigator.userAgent.indexOf('x64')>-1 && navigator.userAgent.indexOf('Win64')>-1 ) {

		UbiJS_ShowPlugin64Warning();
	}
	else {

		if( UbiJS_IE_AutoDownload ) {

			if( UbiJS_WINDOC.getElementById(UbiJS_Frame_Download) == null ) {
				
				var obj = UbiJS_CreateUbiDownloadFrame(UbiJS_Frame_Download);
				UbiJS_WINDOC.body.appendChild(obj);
			}
			else {

				UbiJS_WINDOC.getElementById(UbiJS_Frame_Download).src = UbiJS_PluginInstallPath;
			}			
		}

		if( UbiJS_WINDOC.getElementById(UbiJS_Div_Install) == null ) {
			
			var str = [];
			var i = 0;
			
			str[i++] = "<div style='background:#216aad; height:30px; padding:15px 15px; font: bold 20px Dotum; color:#fff;'>{MSG_TITLE}</div>";
			str[i++] = "<div style='width:418px; border-left:1px solid #555555; border-right:1px solid #555555; border-bottom:1px solid #555555; padding:15px 15px; background:#fff;'>";
			str[i++] = "	<div style='height:30px; font: normal 12px Dotum;border-bottom:1px solid #555555;'>{MSG_SUBJECT}</div>";
			str[i++] = "	<div style='height:120px; margin-top:10px; font: normal 12px Dotum;line-height: 20px;'>{MSG_CONTENTS}</div>";
			str[i++] = "	<div style='height:40px; margin-top:15px; text-align:center; overflow:hidden; '>";
			str[i++] = "		<button id='ubibtn_download' style='background-color: transparent; border: 0 none; cursor: pointer; vertical-align: middle;min-width:100px; font: bold 14px Dotum; color:#fff; padding:12px 0 12px 0; text-align:center; background:#2372ba;' onclick=\"location.href='{DOWNLOAD_URL}'\">" + _ubinonax_getMessage(UbiJS_Language, 'BTN_Download') + "</button>";
			str[i++] = "		<button id='ubibtn_close' style='background-color: transparent; border: 0 none; cursor: pointer; vertical-align: middle;min-width:100px; font: bold 14px Dotum; color:#fff; padding:12px 0 12px 0; text-align:center; background:#666666;' onclick=\"UbiJS_WINDOC.getElementById('{MSG_ID}').style.display='none'\">" + _ubinonax_getMessage(UbiJS_Language, 'BTN_Cancel') + "</button>";
			str[i++] = "	</div>";
			str[i++] = "</div>";
			
			var width ="500";
			var height ="350";
			var color = UbiJS_InstallHeader;
			var title = isUpdate ? _ubinonax_getMessage(UbiJS_Language, 'Update_Title') : _ubinonax_getMessage(UbiJS_Language, 'Install_Title');
			var subject = isUpdate ? _ubinonax_getMessage(UbiJS_Language, 'Update_Subject') : _ubinonax_getMessage(UbiJS_Language, 'Install_Subject');
			var contents = "";
			if( isUpdate ) {
				
				contents = _ubinonax_getMessage(UbiJS_Language, 'Update_Contents');
			}
			else {
				
				contents = _ubinonax_getMessage(UbiJS_Language, 'Install_Contents');
			}
			var installpath = UbiJS_PluginInstallPath;
			var html = str.join("");
			UbiJS_ShowMessage(UbiJS_Div_Install, width, height, color, title, subject, contents, installpath, html);
		}
		else {
			
			UbiJS_WINDOC.getElementById(UbiJS_Div_Install).style.display = "";
		}
	}
	try { UbiJS_WINDOC.getElementById(UbiJS_Div_PrintStandby).style.display = "none"; } catch(e) { }
	try { UbiJS_WINDOC.getElementById(UbiJS_Div_ExportStandby).style.display = "none"; } catch(e) { }
}

/**
 * 플러그인 64bit 브라우저 미지원 안내 메시지
 */
function UbiJS_ShowPlugin64Warning() {
	
	if( UbiJS_WINDOC.getElementById(UbiJS_Div_64Warning) == null ) {
		
		var str = [];
		var i = 0;

		str[i++] = "<div style='background:#a22020; height:30px; padding:15px 15px; font: bold 20px Dotum; color:#fff;'>{MSG_TITLE}</div>";
		str[i++] = "<div style='width:418px; border-left:1px solid #555555; border-right:1px solid #555555; border-bottom:1px solid #555555; padding:15px 15px; background:#fff;'>";
		str[i++] = "	<div style='height:30px; font: normal 12px Dotum;border-bottom:1px solid #555555;'>{MSG_SUBJECT}</div>";
		str[i++] = "	<div style='height:70px; margin-top:10px; font: normal 12px Dotum;line-height: 20px;'>{MSG_CONTENTS}</div>";
		str[i++] = "	<div style='height:40px; margin-top:15px; text-align:center; overflow:hidden; '>";
		str[i++] = "		<button id='ubibtn_close' style='background-color: transparent; border: 0 none; cursor: pointer; vertical-align: middle;min-width:100px; font: bold 14px Dotum; color:#fff; padding:12px 0 12px 0; text-align:center; background:#666666;' onclick=\"UbiJS_WINDOC.getElementById('{MSG_ID}').style.display='none'\">" + _ubinonax_getMessage(UbiJS_Language, 'BTN_OK') + "</button>";
		str[i++] = "	</div>";
		str[i++] = "</div>";
		
		var width ="500";
		var height ="350";
		var color = UbiJS_NoticeHeader;
		var title = _ubinonax_getMessage(UbiJS_Language, 'Guide_Title');
		var subject = _ubinonax_getMessage(UbiJS_Language, '64_Subject');
		var contents = _ubinonax_getMessage(UbiJS_Language, '64_Contents');
		var installpath = UbiJS_PluginInstallPath;
		var html = str.join("");
		
		UbiJS_ShowMessage(UbiJS_Div_64Warning, width, height, color, title, subject, contents, installpath, html);
	}
	else {
		
		UbiJS_WINDOC.getElementById(UbiJS_Div_64Warning).style.display = "";
	}
	try { UbiJS_WINDOC.getElementById(UbiJS_Div_PrintStandby).style.display = "none"; } catch(e) { }
	try { UbiJS_WINDOC.getElementById(UbiJS_Div_ExportStandby).style.display = "none"; } catch(e) { }
}

/**
 * 플러그인 미지원 브라우저 안내 메시지
 */
function UbiJS_ShowPluginWarning() {

	if( UbiJS_WINDOC.getElementById(UbiJS_Div_Notice) == null ) {

		var str = [];
		var i = 0;
		
		str[i++] = "<div style='background:#a22020; height:30px; padding:15px 15px; font: bold 20px Dotum; color:#fff;'>{MSG_TITLE}</div>";
		str[i++] = "<div style='width:418px; border-left:1px solid #555555; border-right:1px solid #555555; border-bottom:1px solid #555555; padding:15px 15px; background:#fff;'>";
		str[i++] = "	<div style='height:30px; font: normal 12px Dotum;border-bottom:1px solid #555555;'>{MSG_SUBJECT}</div>";
		str[i++] = "	<div style='height:70px; margin-top:10px; font: normal 12px Dotum;line-height: 20px;'>{MSG_CONTENTS}</div>";
		str[i++] = "	<div style='height:40px; margin-top:15px; text-align:center; overflow:hidden; '>";
		str[i++] = "		<button id='ubibtn_close' style='background-color: transparent; border: 0 none; cursor: pointer; vertical-align: middle;min-width:100px; font: bold 14px Dotum; color:#fff; padding:12px 0 12px 0; text-align:center; background:#666666;' onclick=\"UbiJS_WINDOC.getElementById('{MSG_ID}').style.display='none'\">" + _ubinonax_getMessage(UbiJS_Language, 'BTN_OK') + "</button>";
		str[i++] = "	</div>";
		str[i++] = "</div>";
		
		var width ="500";
		var height ="350";
		var color = UbiJS_NoticeHeader;
		var title = _ubinonax_getMessage(UbiJS_Language, 'Guide_Title');
		var subject = _ubinonax_getMessage(UbiJS_Language, 'Plugin_Subject');
		var contents = _ubinonax_getMessage(UbiJS_Language, 'Plugin_Contents');
		var installpath = "";
		var html = "";
		
		UbiJS_ShowMessage(UbiJS_Div_Notice, width, height, color, title, subject, contents, installpath, html);
	}
	else {
		
		UbiJS_WINDOC.getElementById(UbiJS_Div_Notice).style.display = "";
	}
	try { UbiJS_WINDOC.getElementById(UbiJS_Div_PrintStandby).style.display = "none"; } catch(e) { }
	try { UbiJS_WINDOC.getElementById(UbiJS_Div_ExportStandby).style.display = "none"; } catch(e) { }
}

/**
 * WS 미지원 브라우저 안내 메시지
 */
function UbiJS_ShowWsWarning() {
	
	if( UbiJS_WINDOC.getElementById(UbiJS_Div_Notice) == null ) {
		
		var str = [];
		var i = 0;
		
		str[i++] = "<div style='background:#a22020; height:30px; padding:15px 15px; font: bold 20px Dotum; color:#fff;'>{MSG_TITLE}</div>";
		str[i++] = "<div style='width:418px; border-left:1px solid #555555; border-right:1px solid #555555; border-bottom:1px solid #555555; padding:15px 15px; background:#fff;'>";
		str[i++] = "	<div style='height:30px; font: normal 12px Dotum;border-bottom:1px solid #555555;'>{MSG_SUBJECT}</div>";
		str[i++] = "	<div style='height:60px; margin-top:10px; font: normal 12px Dotum;line-height: 20px;'>{MSG_CONTENTS}</div>";
		str[i++] = "	<div style='height:40px; margin-top:15px; text-align:center; overflow:hidden; '>";
		str[i++] = "		<button id='ubibtn_close' style='background-color: transparent; border: 0 none; cursor: pointer; vertical-align: middle;min-width:100px; font: bold 14px Dotum; color:#fff; padding:12px 0 12px 0; text-align:center; background:#666666;' onclick=\"UbiJS_WINDOC.getElementById('{MSG_ID}').style.display='none'\">" + _ubinonax_getMessage(UbiJS_Language, 'BTN_OK') + "</button>";
		str[i++] = "	</div>";
		str[i++] = "</div>";
		
		var width ="500";
		var height ="350";
		var color = UbiJS_NoticeHeader;
		var title = _ubinonax_getMessage(UbiJS_Language, 'Guide_Title');
		var subject = _ubinonax_getMessage(UbiJS_Language, 'WS_Subject');
		var contents = _ubinonax_getMessage(UbiJS_Language, 'WS_Contents');
		var installpath = "";
		var html = str.join("");
		
		UbiJS_ShowMessage(UbiJS_Div_Notice, width, height, color, title, subject, contents, installpath, html);
	}
	else {
		
		UbiJS_WINDOC.getElementById(UbiJS_Div_Notice).style.display = "";
	}
	try { UbiJS_WINDOC.getElementById(UbiJS_Div_PrintStandby).style.display = "none"; } catch(e) { }
	try { UbiJS_WINDOC.getElementById(UbiJS_Div_ExportStandby).style.display = "none"; } catch(e) { }
}

/**
 * 설치(업데이트) 안내 메시지 창 보이기
 */
function UbiJS_ShowWsInstall(isUpdate) {

	try { UbiJS_WINDOC.getElementById(UbiJS_Div_PrintStandby).style.display = "none"; } catch(e) { }
	try { UbiJS_WINDOC.getElementById(UbiJS_Div_ExportStandby).style.display = "none"; } catch(e) { }

	if( UbiJS_WINDOC.getElementById(UbiJS_Div_Install) == null ) {

		var str = [];
		var i = 0;
		
		str[i++] = "<div style='background:#216aad; height:30px; padding:15px 15px; font: bold 20px Dotum; color:#fff;'>{MSG_TITLE}</div>";
		str[i++] = "<div style='width:418px; border-left:1px solid #555555; border-right:1px solid #555555; border-bottom:1px solid #555555; padding:15px 15px; background:#fff;'>";
		str[i++] = "	<div style='height:30px; font: normal 12px Dotum;border-bottom:1px solid #555555;'>{MSG_SUBJECT}</div>";
		str[i++] = "	<div style='height:120px; margin-top:10px; font: normal 12px Dotum;line-height: 20px;'>{MSG_CONTENTS}</div>";
		str[i++] = "	<div style='height:40px; margin-top:15px; text-align:center; overflow:hidden; '>";
		str[i++] = "		<button id='ubibtn_download' style='background-color: transparent; border: 0 none; cursor: pointer; vertical-align: middle;min-width:100px; font: bold 14px Dotum; color:#fff; padding:12px 0 12px 0; text-align:center; background:#2372ba;' onclick=\"location.href='{DOWNLOAD_URL}'\">" + _ubinonax_getMessage(UbiJS_Language, 'BTN_Download') + "</button>";
		str[i++] = "		<button id='ubibtn_close' style='background-color: transparent; border: 0 none; cursor: pointer; vertical-align: middle;min-width:100px; font: bold 14px Dotum; color:#fff; padding:12px 0 12px 0; text-align:center; background:#666666;' onclick=\"UbiJS_WINDOC.getElementById('{MSG_ID}').style.display='none'\">" + _ubinonax_getMessage(UbiJS_Language, 'BTN_Cancel') + "</button>";
		str[i++] = "	</div>";
		str[i++] = "</div>";
		
		var width ="500";
		var height ="350";
		var color = UbiJS_InstallHeader;
		var title = isUpdate ? _ubinonax_getMessage(UbiJS_Language, 'Update_Title') : _ubinonax_getMessage(UbiJS_Language, 'Install_Title');
		var subject = isUpdate ? _ubinonax_getMessage(UbiJS_Language, 'Update_Subject') : _ubinonax_getMessage(UbiJS_Language, 'Install_Subject');
		var contents = _ubinonax_getMessage(UbiJS_Language, 'Install_Contents');
		var installpath = UbiJS_WsInstallPath;
		var html = str.join("");
		
		UbiJS_ShowMessage(UbiJS_Div_Install, width, height, color, title, subject, contents, installpath, html);
	}
	else {
		
		UbiJS_WINDOC.getElementById(UbiJS_Div_Install).style.display = "";
	}
}

/**
 * 인쇄 준비 메시지 생성
 */
function UbiJS_InitPrintStandby() {

	var width ="420";
	var height ="300";
	var color = UbiJS_StandbyHeader;
	var title = "인쇄 준비 중";
	var subject = "<br>사용자 PC환경 및 페이지양에 따라 5초~1분 정도 소요됩니다.<br><br>잠시만 기다려 주세요.<br><br>";
	var contents = "";
	var installpath = "";
	
	UbiJS_HideMessage(UbiJS_Div_PrintStandby, width, height, color, title, subject, contents, installpath);
}

/**
 * 인쇄 준비 메시지
 */
function UbiJS_ShowPrintStandby() {
	var color = UbiJS_StandbyHeader;
	var title = _ubinonax_getMessage(UbiJS_Language, "Print_Stanby_Title");
	var subject = _ubinonax_getMessage(UbiJS_Language, "Print_Stanby_Subject");
	var contents = "";
	var installpath = "";
	var id = UbiJS_Div_PrintStandby;

	var obj = UbiJS_WINDOC.getElementById(id);
	if (obj) {
		var html = obj.innerHTML;
		obj.innerHTML = html.replace(/{HEADER_BG}/g, color).replace(/{MSG_TITLE}/g, title).replace(/{MSG_SUBJECT}/g, subject).replace(/{MSG_CONTENTS}/g, contents).replace(/{MSG_ID}/g, id).replace(/{DOWNLOAD_URL}/g, installpath);
		try { UbiJS_WINDOC.getElementById(UbiJS_Div_PrintStandby).style.display = ""; } catch(e) { }
	}
}

/**
 * 인쇄 완료 메시지
 */
function UbiJS_ShowPrintComplete() {

	if( UbiJS_WINDOC.getElementById(UbiJS_Div_PrintComplete) == null ) {

		var width ="420";
		var height ="300";
		var color = UbiJS_CompleteHeader;
		var title = _ubinonax_getMessage(UbiJS_Language, "Print_Complete_Title");
		var subject = _ubinonax_getMessage(UbiJS_Language, "Print_Complete_Subject");
		var contents = "";
		var installpath = "";
		var html = "";
		
		var str = [];
		var i = 0;
		str[i++] = "<div style='background:#216aad; height:30px; padding:15px 15px; font: bold 20px Dotum; color:#fff;'>{MSG_TITLE}</div>";
		str[i++] = "<div style='width:418px; border-left:1px solid #555555; border-right:1px solid #555555; border-bottom:1px solid #555555; padding:15px 15px; background:#fff;'>";
		str[i++] = "	<div style='height:60px; font: normal 12px Dotum;'>{MSG_SUBJECT}</div>";
		str[i++] = "	<div style='height:40px; margin-top:15px; text-align:center; overflow:hidden; '>";
		str[i++] = "		<button id='ubibtn_close' style='background-color: transparent; border: 0 none; cursor: pointer; vertical-align: middle;min-width:100px; font: bold 14px Dotum; color:#fff; padding:12px 0 12px 0; text-align:center; background:#2372ba;' onclick=\"UbiJS_WINDOC.getElementById('{MSG_ID}').style.display='none'\">" + _ubinonax_getMessage(UbiJS_Language, "BTN_OK") + "</button>";
		str[i++] = "	</div>";
		str[i++] = "</div>";
		
		html = str.join("");
		
		UbiJS_ShowMessage(UbiJS_Div_PrintComplete, width, height, color, title, subject, contents, installpath, html);
	}
	else {

		UbiJS_WINDOC.getElementById(UbiJS_Div_PrintComplete).style.display = "";
	}
	try { UbiJS_WINDOC.getElementById(UbiJS_Div_PrintStandby).style.display = "none"; } catch(e) { }
	try { UbiJS_WINDOC.getElementById(UbiJS_Div_ExportStandby).style.display = "none"; } catch(e) { }
}

/**
 * 인쇄 취소 메시지
 */
function UbiJS_ShowPrintCancel() {

	if( UbiJS_WINDOC.getElementById(UbiJS_Div_PrintCancel) == null ) {
		
		var width ="420";
		var height ="300";
		var color = UbiJS_CancelHeader;
		var title = _ubinonax_getMessage(UbiJS_Language, "Print_Cancel_Title");
		var subject = _ubinonax_getMessage(UbiJS_Language, "Print_Cancel_Subject");
		var contents = "";
		var installpath = "";
		var html = "";
		
		var str = [];
		var i = 0;
		str[i++] = "<div style='background:#216aad; height:30px; padding:15px 15px; font: bold 20px Dotum; color:#fff;'>{MSG_TITLE}</div>";
		str[i++] = "<div style='width:418px; border-left:1px solid #555555; border-right:1px solid #555555; border-bottom:1px solid #555555; padding:15px 15px; background:#fff;'>";
		str[i++] = "	<div style='height:60px; font: normal 12px Dotum;'>{MSG_SUBJECT}</div>";
		str[i++] = "	<div style='height:40px; margin-top:15px; text-align:center; overflow:hidden; '>";
		str[i++] = "		<button id='ubibtn_close' style='background-color: transparent; border: 0 none; cursor: pointer; vertical-align: middle;min-width:100px; font: bold 14px Dotum; color:#fff; padding:12px 0 12px 0; text-align:center; background:#2372ba;' onclick=\"UbiJS_WINDOC.getElementById('{MSG_ID}').style.display='none'\">" + _ubinonax_getMessage(UbiJS_Language, "BTN_OK") + "</button>";
		str[i++] = "	</div>";
		str[i++] = "</div>";
		
		html = str.join("");
		
		UbiJS_ShowMessage(UbiJS_Div_PrintCancel, width, height, color, title, subject, contents, installpath, html);
	}
	else {
		
		UbiJS_WINDOC.getElementById(UbiJS_Div_PrintCancel).style.display = "";
	}
	try { UbiJS_WINDOC.getElementById(UbiJS_Div_PrintStandby).style.display = "none"; } catch(e) { }
	try { UbiJS_WINDOC.getElementById(UbiJS_Div_ExportStandby).style.display = "none"; } catch(e) { }
}

/**
 * 인쇄 오류 메시지
 */
function UbiJS_ShowPrintFail() {

	if( UbiJS_WINDOC.getElementById(UbiJS_Div_PrintFail) == null ) {

		var width ="420";
		var height ="300";
		var color = UbiJS_FailHeader;
		var title = _ubinonax_getMessage(UbiJS_Language, "Print_Fail_Title");
		var subject = _ubinonax_getMessage(UbiJS_Language, "Print_Fail_Subject");
		var contents = "";
		var installpath = "";
		var html = "";
		
		var str = [];
		var i = 0;
		str[i++] = "<div style='background:#a22020; height:30px; padding:15px 15px; font: bold 20px Dotum; color:#fff;'>{MSG_TITLE}</div>";
		str[i++] = "<div style='width:418px; border-left:1px solid #555555; border-right:1px solid #555555; border-bottom:1px solid #555555; padding:15px 15px; background:#fff;'>";
		str[i++] = "	<div style='height:60px; font: normal 12px Dotum;'>{MSG_SUBJECT}</div>";
		str[i++] = "	<div style='height:40px; margin-top:15px; text-align:center; overflow:hidden; '>";
		str[i++] = "		<button id='ubibtn_close' style='background-color: transparent; border: 0 none; cursor: pointer; vertical-align: middle;min-width:100px; font: bold 14px Dotum; color:#fff; padding:12px 0 12px 0; text-align:center; background:#666666;' onclick=\"UbiJS_WINDOC.getElementById('{MSG_ID}').style.display='none'\">" + _ubinonax_getMessage(UbiJS_Language, "BTN_OK") + "</button>";
		str[i++] = "	</div>";
		str[i++] = "</div>";
		
		html = str.join("");
		
		UbiJS_ShowMessage(UbiJS_Div_PrintFail, width, height, color, title, subject, contents, installpath, html);
	}
	else {

		UbiJS_WINDOC.getElementById(UbiJS_Div_PrintFail).style.display = "";
	}
	try { UbiJS_WINDOC.getElementById(UbiJS_Div_PrintStandby).style.display = "none"; } catch(e) { }
	try { UbiJS_WINDOC.getElementById(UbiJS_Div_ExportStandby).style.display = "none"; } catch(e) { }
}

/**
 * 파일 저장 준비 메시지 생성
 */
function UbiJS_InitExportStandby() {

	var width ="420";
	var height ="300";
	var color = UbiJS_StandbyHeader;
	var title = "파일 저장 준비 중";
	var subject = "<br>사용자 PC 환경에 따라 5초 ~ 1분 정도 소요됩니다.<br><br>잠시만 기다려 주세요.<br><br>";
	var contents = "";
	var installpath = "";
	
	UbiJS_HideMessage(UbiJS_Div_ExportStandby, width, height, color, title, subject, contents, installpath);
}

/**
 * 파일 저장 준비 메시지
 */
function UbiJS_ShowExportStandby() {
	
	var color = UbiJS_StandbyHeader;
	var title = _ubinonax_getMessage(UbiJS_Language, "Export_Standby_Title");
	var subject = _ubinonax_getMessage(UbiJS_Language, "Export_Standby_Subject");
	var contents = "";
	var installpath = "";
	var id = UbiJS_Div_ExportStandby;
	
	var obj = UbiJS_WINDOC.getElementById(id);
	if (obj) {
		var html = obj.innerHTML;
		obj.innerHTML = html.replace(/{HEADER_BG}/g, color).replace(/{MSG_TITLE}/g, title).replace(/{MSG_SUBJECT}/g, subject).replace(/{MSG_CONTENTS}/g, contents).replace(/{MSG_ID}/g, id).replace(/{DOWNLOAD_URL}/g, installpath);
		try { UbiJS_WINDOC.getElementById(UbiJS_Div_ExportStandby).style.display = ""; } catch(e) { }
	}
}

/**
 * 파일 저장 완료 메시지
 */
function UbiJS_ShowExportComplete() {

	if( UbiJS_WINDOC.getElementById(UbiJS_Div_ExportComplete) == null ) {
		
		var width ="420";
		var height ="300";
		var color = UbiJS_CompleteHeader;
		var title = _ubinonax_getMessage(UbiJS_Language, "Export_Complete_Title");
		var subject = _ubinonax_getMessage(UbiJS_Language, "Export_Complete_Subject");
		var contents = "";
		var installpath = "";
		var html = "";

		var str = [];
		var i = 0;
		str[i++] = "<div style='background:#216aad; height:30px; padding:15px 15px; font: bold 20px Dotum; color:#fff;'>{MSG_TITLE}</div>";
		str[i++] = "<div style='width:418px; border-left:1px solid #555555; border-right:1px solid #555555; border-bottom:1px solid #555555; padding:15px 15px; background:#fff;'>";
		str[i++] = "	<div style='height:60px; font: normal 12px Dotum;'>{MSG_SUBJECT}</div>";
		str[i++] = "	<div style='height:40px; margin-top:15px; text-align:center; overflow:hidden; '>";
		str[i++] = "		<button id='ubibtn_close' style='background-color: transparent; border: 0 none; cursor: pointer; vertical-align: middle;min-width:100px; font: bold 14px Dotum; color:#fff; padding:12px 0 12px 0; text-align:center; background:#2372ba;' onclick=\"UbiJS_WINDOC.getElementById('{MSG_ID}').style.display='none'\">" + _ubinonax_getMessage(UbiJS_Language, "BTN_OK") + "</button>";
		str[i++] = "	</div>";
		str[i++] = "</div>";
		
		html = str.join("");
		UbiJS_ShowMessage(UbiJS_Div_ExportComplete, width, height, color, title, subject, contents, installpath, html);
	}
	else {
		
		UbiJS_WINDOC.getElementById(UbiJS_Div_ExportComplete).style.display = "";
	}
	try { UbiJS_WINDOC.getElementById(UbiJS_Div_PrintStandby).style.display = "none"; } catch(e) { }
	try { UbiJS_WINDOC.getElementById(UbiJS_Div_ExportStandby).style.display = "none"; } catch(e) { }
}

/**
 * 파일 저장 취소 메시지
 */
function UbiJS_ShowExportCancel() {

	if( UbiJS_WINDOC.getElementById(UbiJS_Div_ExportCancel) == null ) {
		
		var width ="500";
		var height ="300";
		var color = UbiJS_CancelHeader;
		var title = _ubinonax_getMessage(UbiJS_Language, "Export_Cancel_Title");
		var subject = _ubinonax_getMessage(UbiJS_Language, "Export_Cancel_Subject");
		var contents = "";
		var installpath = "";
		var html = "";
		
		var str = [];
		var i = 0;
		str[i++] = "<div style='background:#216aad; height:30px; padding:15px 15px; font: bold 20px Dotum; color:#fff;'>{MSG_TITLE}</div>";
		str[i++] = "<div style='width:418px; border-left:1px solid #555555; border-right:1px solid #555555; border-bottom:1px solid #555555; padding:15px 15px; background:#fff;'>";
		str[i++] = "	<div style='height:60px; font: normal 12px Dotum;'>{MSG_SUBJECT}</div>";
		str[i++] = "	<div style='height:40px; margin-top:15px; text-align:center; overflow:hidden; '>";
		str[i++] = "		<button id='ubibtn_close' style='background-color: transparent; border: 0 none; cursor: pointer; vertical-align: middle;min-width:100px; font: bold 14px Dotum; color:#fff; padding:12px 0 12px 0; text-align:center; background:#2372ba;' onclick=\"UbiJS_WINDOC.getElementById('{MSG_ID}').style.display='none'\">" + _ubinonax_getMessage(UbiJS_Language, "BTN_OK") + "</button>";
		str[i++] = "	</div>";
		str[i++] = "</div>";
		
		html = str.join("");
		UbiJS_ShowMessage(UbiJS_Div_ExportCancel, width, height, color, title, subject, contents, installpath, html);
	}
	else {
		
		UbiJS_WINDOC.getElementById(UbiJS_Div_ExportCancel).style.display = "";
	}
	try { UbiJS_WINDOC.getElementById(UbiJS_Div_PrintStandby).style.display = "none"; } catch(e) { }
	try { UbiJS_WINDOC.getElementById(UbiJS_Div_ExportStandby).style.display = "none"; } catch(e) { }
}


/*******************************************************************
                    Plugin / WebSocke 공통 함수
*******************************************************************/
/**
 * 브라우저명 가져오기
 */
function UbiJS_GetBrowser() {

    var ua = navigator.userAgent, tem, M = ua.match(/(opera|chrome|safari|firefox|msie|trident(?=\/))\/?\s*(\d+)/i) || [];
    if (/trident/i.test(M[1])) {
        tem = /\brv[ :]+(\d+)/g.exec(ua) || [];
        return 'MSIE';
    }
    if (M[1] === 'Chrome') {
        tem = ua.match(/\bOPR\/(\d+)/);
        if (tem != null) {
            return 'Opera';
        }
    }
    M = M[2] ? [M[1], M[2]] : [navigator.appName, navigator.appVersion, '-?'];
    if ((tem = ua.match(/version\/(\d+)/i)) != null) {
        M.splice(1, 1, tem[1]);
    }
    return M[0];
}

/**
 * 브라우저 버전 정보 가져오기
 * @returns
 */
function UbiJS_GetBrowserVersion() {

	var ua = navigator.userAgent, tem, M = ua.match(/(opera|chrome|safari|firefox|msie|trident(?=\/))\/?\s*(\d+)/i) || [];
	
	if (/trident/i.test(M[1])) {
		
		tem = /\brv[ :]+(\d+)/g.exec(ua) || [];
		return tem[1];
	}
	
	if (M[1] === 'Chrome') {
		
		tem = ua.match(/\bOPR\/(\d+)/);
		if (tem != null) {
			
			return tem[1];
		}
	}

	M = M[2] ? [M[1], M[2]] : [navigator.appName, navigator.appVersion, '-?'];
	if ((tem = ua.match(/version\/(\d+)/i)) != null) {
		
		M.splice(1, 1, tem[1]);
	}
	return M[1];
}

/**
 * 다운로드를 위해 동적 Frame 생성
 * @param id
 * @returns {___obj9}
 */
function UbiJS_CreateUbiDownloadFrame(id) {
	
	var obj = document.createElement("iframe");
	obj.id = id;
	obj.style.cssText = "position:absolute; width:0px; height:0px; left:0px; top:0px; frameborder:0px;";
	obj.src = UbiJS_PluginInstallPath;
	return obj;
}

/**
 * 디자인 내용 가져오기
 * @param options
 */
function UbiJS_AjaxCall(options) {

	options={type: options.type || "POST", url: options.url || "", onComplete: options.onComplete || function(){}, onSuccess: options.onSuccess || function(){}};
	if(typeof XMLHttpRequest == "undefined"){XMLHttpRequest = function() {return new ActiveXObject(navigator.userAgent.indexOf("MSIE 5") >= 0 ? "Microsoft.XMLHTTP" : "Msxml2.XMLHTTP");};}
	var xml = new XMLHttpRequest();
	xml.open(options.type, options.url, true);
	var requestDone = false;
	setTimeout(function() {requestDone = true;}, 20000);
	xml.onreadystatechange = function() {if( xml.readyState == 4 && !requestDone) {if(httpSuccess(xml) ) {options.onSuccess(xml.responseText);}options.onComplete();xml = null;}};
	xml.send();
	
	function httpSuccess(r) {

		try{return (!r.status && location.protocol == "file:") ||(r.status >= 200 && r.status < 300) || r.status == 304 || navigator.userAgent.indexOf("Safari") >= 0 && typeof r.status == "undefined;";}catch(e){}
		return false;
	}
}

/**
 * 메시지 보여주기
 */
function UbiJS_ShowMessage(id, width, height, color, title, subject, contents, installpath, html) {

	var obj = document.createElement("div");
	obj.id = id;
//	obj.style.cssText = "position:absolute; z-index:999999104; left:50%; top:50%; width:" + width + "px; height:" + height + "px; margin-left: -" + (width/2) + "px; margin-top:-" + (height/2) + "px;";
	obj.style.cssText = "position:absolute; z-index:999999104; left:50%; top:50%; width:450px; height:" + height + "px; margin-left: -225px; margin-top:-" + (height/2) + "px;";
	obj.innerHTML = html.replace(/{HEADER_BG}/g, color).replace(/{MSG_TITLE}/g, title).replace(/{MSG_SUBJECT}/g, subject).replace(/{MSG_CONTENTS}/g, contents).replace(/{MSG_ID}/g, id).replace(/{DOWNLOAD_URL}/g, installpath);
	UbiJS_WINDOC.body.appendChild(obj);
}

/**
 * 메시지창 미리 생성 (인쇄/저장 준비창)
 */
function UbiJS_HideMessage(id, width, height, color, title, subject, contents, installpath/*, html*/) {

	var obj = document.createElement("div");
	UbiJS_WINDOC.body.appendChild(obj);
	obj.id = id;
	obj.style.cssText = "display:none; position:absolute; z-index:999999104; left:50%; top:50%; width:450px; height:" + height + "px; margin-left: -225px; margin-top:-" + (height/2) + "px;";
	var str = [];
	var i = 0;
	str[i++] = "<div style='background:#216aad; height:30px; padding:15px 15px; font: bold 20px Dotum; color:#fff;'>{MSG_TITLE}</div>";
	str[i++] = "<div style='width:418px; border-left:1px solid #555555; border-right:1px solid #555555; border-bottom:1px solid #555555; padding:15px 15px; background:#fff;'>";
	str[i++] = "	<div style='height:80px; font: normal 12px Dotum;'>{MSG_SUBJECT}</div>";
	str[i++] = "</div>";
	
	var html = str.join("");
	obj.innerHTML = html;
	// language에 따라 문구를 변경하기 위하여 주석 처리
	//obj.innerHTML = html.replace(/{HEADER_BG}/g, color).replace(/{MSG_TITLE}/g, title).replace(/{MSG_SUBJECT}/g, subject).replace(/{MSG_CONTENTS}/g, contents).replace(/{MSG_ID}/g, id).replace(/{DOWNLOAD_URL}/g, installpath);
}

function UbiJS_Trim(str) {
	
    return str.replace(/(^\s*)|(\s*$)/gi, "");
}
}