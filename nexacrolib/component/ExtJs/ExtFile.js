/**
*  Nexacro Professional Training Couse
*  @FileName 	ExtFile.js 
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

// file upload 및 download 환경 설정
pForm.fileConfig = {
		uploadUrl : "file/saveFile.jsp?path=nexacro",
		downloadUrl : "file/downloadFile.jsp?path=nexacro&fileName=",
		deleteUrl : "file/deleteFile.jsp?path=nexacro",
		downImage : "theme://img_file.png",
		delImage : "theme://btn_del.png",
		allowTypes : ["jpg","jpeg","gif","png","bmp","txt","zip","7z","gzip","doc","docx","ppt","pptx","xls","xlsx","pdf"],
		maxCount : 10,
		maxSize : "20MB",
		maxTotalSize : "200MB"
};

// 아이콘별 확장자 목록
pForm.iconInfo = {
		file_icon_ZIP: ["zip","rar","7z"],
		file_icon_IMG: ["jpg", "jpeg", "gif", "png", "bmp"],
		file_icon_TXT: ["txt", "xml"],
		file_icon_DOC: ["doc", "docx"],
		file_icon_XLS: ["xls", "xlsx"],
		file_icon_PPT: ["ppt", "pptx"],
		file_icon_PDF: ["pdf"],
		file_icon_ETC: ["etc"]		//위 확장자 목록에 일치하지 않을 경우. default icon
	};

//확장자별 아이콘 정보	 
pForm.extToIcon = {};

/**
 * @class 현재 Form 상의 FileUpload 컴포넌트를 서버에 업로드한다. <br>
 * @param {Object} objFileUpload - 파일업로드 컴포넌트
 * @param {String} [sUrl] - 파일업로드 서비스 호출 경로
 * @param {String} [sPath] - 파일업로드시킬 폴더 위치
 * @return N/A
 * @example 
 * this.gfnFileUpload(objFileUpload);
 */
pForm.gfnFileUpload = function(objFileUpload, sUrl, sPath)
{	
	var svcUrl = this.gfnGetServerUrl();
	
	if (this.gfnIsNull(sUrl)) sUrl = svcUrl;
	
	//파일업로드 서비스 호출 경로
	var sFileUrl = sUrl + "fileUpload.jsp";
    
	//파일 업로드 시킬 폴더 위치 지정
	if (this.gfnIsNull(sPath)) sPath = "PATH=upload";
	
	var bSucc = objFileUpload.upload(sFileUrl + "?" + sPath);
	trace("bSucc >> " + bSucc);
};

/**
 * @class 현재 Form 상의 FileDownload 컴포넌트를 이용하여 지정한 위치에서 원하는 파일을 다운로드한다. <br>
 * @param {Object} objFileDownload - 파일다운로드 컴포넌트
 * @param {String} sFilename - 다운로드 할 파일명
 * @param {String} [sUrl] - 파일업로드 서비스 호출 경로
 * @param {String} [sPath] - 파일업로드시킬 폴더 위치
 * @return N/A
 * @example this.gfnFileUpload(objFileUpload, sFilename);
 */
pForm.gfnFileDownload = function(objFileDownload, sFilename, sUrl, sPath)
{
	var svcUrl = this.gfnGetServerUrl();
	if (this.gfnIsNull(sUrl)) sUrl = svcUrl;
	
	
	//파일다운로드 서비스 호출 경로
	var sFileUrl = sUrl + "fileDownload.jsp";
	
	//파일 다운로드할 폴더 위치 지정
	if (this.gfnIsNull(sPath)) sPath = "PATH=upload";
	
	objFileDownload.download(sFileUrl + "?" + sPath + "&file=" + sFilename);
};

/**
 * @class File Path 문자열(예 : C:\a\b\filename.ext)에서 File명(예 : filename)을 추출 <br>
 * @param {String} sPath - File Path 문자열 (예 : "C:\a\b\filename.ext")
 * @param {String} bExt - extend를 return되는 File명에 포함시킬지 여부 ( 옵션 : Default=false )
 * @return {String} 
 * 성공 : <br>
 * bExt가 true인 경우 ==> sPath에서 File명(예 : "filename.ext") <br>
 * bExt가 false인 경우 ==> sPath에서 File명(예 : "filename") <br>
 * 실패 : "" <br>
 */
pForm.gfnGetFileName = function (sPath, bExt)
{
	var start_pos,end_pos,tmp_pos,filename;

	if (this.gfnIsNull(sPath)) 
	{
		return "";
	}
	if (this.gfnIsNull(bExt)) 
	{
		bExt = false;
	}

	start_pos = Math.max(this.gfnPosReverse(sPath, "\\"), this.gfnPosReverse(sPath, "/"));
	tmp_pos = this.gfnPosReverse(sPath, "::");
	if (tmp_pos > 0) 
	{
		tmp_pos++;
	}
	start_pos = Math.max(start_pos, tmp_pos);
	if (bExt == false) 
	{
		end_pos = this.gfnPosReverse(sPath, ".");
		if (end_pos < 0) 
		{
			end_pos = sPath.length;
		}
		filename = sPath.substr(start_pos + 1, end_pos - start_pos - 1);
	}
	else 
	{
		filename = sPath.substr(start_pos + 1);
	}

	return filename;
};

/**
 * @description 확장자별 파일 아이콘 설정
*/
pForm.gfnInitExtToIcon = function ()
{
	var extToIcon = this.extToIcon;
	var iconInfo = this.iconInfo;

	for (var name in iconInfo) {
		var len = iconInfo[name].length;
		for (var i=0; i<len; i++) 
		{
			extToIcon[iconInfo[name][i]] = name;
		}
	}
};

/**
 * @class  파일 확장자에 해당하는 이미지경로 반환.
 * @param  {string} fileName file name
 * @return {string} image full path
*/
pForm.gfnGetFileIcon = function(fileName)
{
	if(this.gfnIsNull(fileName)) return;
	
	fileName = fileName.toLowerCase();
	var ext = (/[.]/.exec(fileName)) ? /[^.]+$/.exec(fileName) : undefined;
	var icon = this.extToIcon[ext];
	
	if(icon == undefined) ext = "etc";

	return "theme://" + this.extToIcon[ext] + ".png";
};

/**
 * @description size를 byte로 변환처리한다.
*/ 
/**
 * @class  size를 byte로 변환처리한다.
 * @param  {string} fileSize - 파일사이즈 및 용량(300MB)
 * @return {integer} 파일 byte사이즈
*/
pForm.gfnSizeToByte = function(fileSize) 
{
	var unit = fileSize.match(/[^\d]+/g),
		size = fileSize.match(/\d+/);

	unit = unit ? unit[0].toLowerCase() : "";
	size = size ? size[0] : fileSize;
	
	if (unit == "mb") {
		return size * 1024 * 1024;
	}
	else if (unit == "gb") {
		return size * 1024 * 1024 * 1024;
	}
	else if (unit == "tb") {
		return size * 1024 * 1024 * 1024 * 1024;
	}
	else if (unit == "") {
		return size;
	}
	else {
		return fileSize;
	}
};