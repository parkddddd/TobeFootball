if (!nexacro.UbiViewer) {
	var _ubi_unique_seq = 0;
	
	var _ubi_context = null;
	var _ubi_callback_id = "";

	var _ubi_Browser = null;
	if (nexacro.Version == "17") {
		_ubi_Browser = nexacro._Browser;
	} else {
		_ubi_Browser = nexacro.Browser;
	}
	
	// ==============================================================================
	// nexacro.UbiViewer
	// ==============================================================================
	var _pUbiViewer = null;
	if (nexacro.Version == "17") {
		nexacro.UbiViewer = function (id, left, top, width, height, right, bottom, minwidth, maxwidth, minheight, maxheight, parent) {
			nexacro.Component.call(this, id, left, top, width, height, right, bottom, minwidth, maxwidth, minheight, maxheight, parent);
			this._ubi_context = parent;
			this.width = width;
			this.height = height;
			this.divid_seq = _ubi_unique_seq++; 
		};
		_pUbiViewer = nexacro._createPrototype(nexacro.Component, nexacro.UbiViewer);
	} else {
		nexacro.UbiViewer = function(id, position, left, top, width, height, right, bottom, parent) {
			nexacro.Component.call(this, id, position , left, top, width, height, right, bottom, parent);
			
			this._ubi_context = parent;
			this.width = width;
			this.height = height;	
			this.divid_seq = _ubi_unique_seq++; 
		};
		_pUbiViewer = nexacro._createPrototype(nexacro.Component);
	}

	nexacro.UbiViewer.prototype = _pUbiViewer;
	_pUbiViewer._type = "nexacroUbiViewer";
	_pUbiViewer._type_name = "UbiViewer";
	_pUbiViewer._plugin_elem = null;

	_pUbiViewer.divTarget = null;
	_pUbiViewer.viewer = null;

	_pUbiViewer.ubiserverurl = "";
	_pUbiViewer.resource = "";
	_pUbiViewer.jrffile = "";
	_pUbiViewer.masterfilename = "";
	_pUbiViewer.resid = "";
	_pUbiViewer.arg = '';

	_pUbiViewer.scale = "100";
	_pUbiViewer.toolbar = "true";
	_pUbiViewer.timeout = "600000";
	_pUbiViewer.key = '';

	_pUbiViewer.ismultireport = "false";
	_pUbiViewer.multicount = 1;
	_pUbiViewer.reporttitle = '';
	_pUbiViewer.sheetname = '';
	_pUbiViewer.bgcolor = '#f3f3f3';
	_pUbiViewer.bgimage = '';
	_pUbiViewer.flicking = "false";

	_pUbiViewer.direction = '';
	_pUbiViewer.language = 'ko';
	_pUbiViewer.isexportchartimage = "true";
	_pUbiViewer.scrollpage = "true";

	_pUbiViewer.designDataset = null;
	_pUbiViewer.gridDataset = null;
	_pUbiViewer.datasets = [];
	_pUbiViewer.localdatasets = [];

	// ActiveX 사용을 위한 변수
	_pUbiViewer.reporturl = "";
	_pUbiViewer.fileurl = "";
	_pUbiViewer.datasource = "";
	_pUbiViewer.exportfilename = "";
	_pUbiViewer.excelsheetperpage = "false";
	_pUbiViewer.excelsheetpermasterpage = "false";
	_pUbiViewer.excelsheetperreport = "false";
	_pUbiViewer.excelsheetperpagecount = "100";
	_pUbiViewer.progress = "true";
	_pUbiViewer.printsetmode = "1";
	_pUbiViewer.exportsetmode = "1";
	_pUbiViewer.gatewayProtocolType = "1";
	_pUbiViewer.isRunThread = "true";
	_pUbiViewer.isLocalFile = "true";

//	_pUbiViewer._ubi_callback_id = "";

	// HTML 뷰어에서만 사용
	_pUbiViewer.isStreaming = true;
	_pUbiViewer.isencrypt = false;
	_pUbiViewer.isencrypt64 = false;
	_pUbiViewer.useplugin = false;
	_pUbiViewer.usepluginsave = false;
	_pUbiViewer.pluginprogress = false;
	_pUbiViewer.printIEobj = false;

	_pUbiViewer.excelExportLineItem = false;
	_pUbiViewer.excelSkipMasterItem = false;
	_pUbiViewer.exceladjustpage = false;
	_pUbiViewer.excelPrintPaperSize = "";
	_pUbiViewer.excelPrintfitWidth = "";
	_pUbiViewer.excelPrintfitHeight = "";
	// 사용자 폰트
	_pUbiViewer.fontElement = "";
	// 보이스아이 설정
	_pUbiViewer.isvoiceye = false;
	
	_pUbiViewer.set_ubiserverurl = function(v) {
		this.ubiserverurl = v;
	};
	_pUbiViewer.set_resource = function(v) {
		this.resource = v;
	};
	_pUbiViewer.set_jrffile = function(v) {
		this.jrffile = v;
	};
	_pUbiViewer.set_masterfilename = function(v) {
		this.masterfilename = "";
	};
	_pUbiViewer.set_resid = function(v) {
		this.resid = v;
	};
	_pUbiViewer.set_arg = function(v) {
		this.arg = v;
	};
	_pUbiViewer.set_scale = function(v) {
		this.scale = v;
	};
	_pUbiViewer.set_toolbar = function(v) {
		this.toolbar = v;
	};
	_pUbiViewer.set_timeout = function(v) {
		this.timeout = v;
	};
	_pUbiViewer.set_key = function(v) {
		this.key = v;
	};
	_pUbiViewer.set_ismultireport = function(v) {
		this.ismultireport = v;
	};
	_pUbiViewer.set_multicount = function(v) {
		this.multicount = v;
	};
	_pUbiViewer.set_reporttitle = function(v) {
		this.reporttitle = v;
	};
	_pUbiViewer.set_sheetname = function(v) {
		this.sheetname = v;
	};
	_pUbiViewer.set_bgcolor = function(v) {
		this.bgcolor = v;
	};
	_pUbiViewer.set_bgimage = function(v) {
		this.bgimage = v;
	};
	_pUbiViewer.set_flicking = function(v) {
		this.flicking = v;
	};
	_pUbiViewer.set_direction = function(v) {
		this.direction = v;
	};
	_pUbiViewer.set_language = function(v) {
		this.language = v;
	};
	_pUbiViewer.set_isexportchartimage = function(v) {
		this.isexportchartimage = v;
	};
	_pUbiViewer.set_excelExportLineItem = function(v) {
		this.excelExportLineItem = v;
	};
	_pUbiViewer.set_excelSkipMasterItem = function(v) {
		this.excelSkipMasterItem = v;
	};
	_pUbiViewer.set_exceladjustpage= function(v) {
		this.exceladjustpage = v;
	};
	_pUbiViewer.set_excelPrintPaperSize = function(v) {
		this.excelPrintPaperSize = v;
	};
	_pUbiViewer.set_excelPrintfitWidth = function(v) {
		this.excelPrintfitWidth = v;
	};
	_pUbiViewer.set_excelPrintfitHeight = function(v) {
		this.excelPrintfitHeight = v;
	};
	_pUbiViewer.set_isStreaming = function(v) {
		this.isStreaming = v;
	};
	_pUbiViewer.set_useplugin = function(v) {
		this.useplugin = v;
	};
	_pUbiViewer.set_usepluginsave = function(v) {
		this.usepluginsave = v;
	};
	_pUbiViewer.set_pluginprogress = function(v) {
		this.pluginprogress = v;
	};
	_pUbiViewer.set_printIEobj = function(v) {
		this.printIEobj = v;
	};
	_pUbiViewer.set_userwidth = function(v) {
		this.userwidth = v;
	};
	_pUbiViewer.set_userheight = function(v) {
		this.userheight = v;
	};
	_pUbiViewer.set_scrollpage = function(v) {
		this.scrollpage = v;
	};
	_pUbiViewer.set_isencrypt = function(v) {
		this.isencrypt = v;
	};
	_pUbiViewer.set_isencrypt64 = function(v) {
		this.isencrypt64 = v;
	};

	// ActiveX용
	_pUbiViewer.set_reporturl = function(v) {
		this.reporturl = v;
	};
	_pUbiViewer.set_datasource = function(v) {
		this.datasource = v;
	};
	_pUbiViewer.set_exportfilename = function(v) {
		this.exportfilename = v;
	};
	_pUbiViewer.set_excelsheetperpage = function(v) {
		this.excelsheetperpage = v;
	};
	_pUbiViewer.set_excelsheetpermasterpage = function(v) {
		this.excelsheetpermasterpage = v;
	};
	_pUbiViewer.set_excelsheetperreport = function(v) {
		this.excelsheetperreport = v;
	};
	_pUbiViewer.set_excelsheetperpagecount = function(v) {
		this.excelsheetperpagecount = v;
	};
	_pUbiViewer.set_fontElement = function(v) {
		this.fontElement = v;
	};
	_pUbiViewer.set_isvoiceye = function(v) {
		this.isvoiceye = v;
	};
	_pUbiViewer.set_printsetmode = function(v) {
		this.printsetmode = v;
	};
	_pUbiViewer.set_exportsetmode = function(v) {
		this.exportsetmode = v;
	};
	_pUbiViewer.set_gatewayProtocolType = function(v) {
		this.gatewayProtocolType = v;
	};
	_pUbiViewer.set_isRunThread = function(v) {
		this.isRunThread = v;
	};

	_pUbiViewer.callUrl = function(strUrl, parent, callback) {
		this.execRetrieve(parent, callback, strUrl, true);
	};

	_pUbiViewer.retrieve = function(parent, callback) {
		this.execRetrieve(parent, callback, '', false);
	};

	_pUbiViewer.execRetrieve = function(parent, callback, strUrl, isCallUrl) {
		if (strUrl == undefined) {
			strUrl = '';
		}
		if (isCallUrl == undefined) {
			isCallUrl = false;
		}
		
		if (_ubi_Browser == "Runtime" && isCallUrl) {
			return;
		}
		
		_ubi_context = parent;
		_ubi_callback_id = callback;

		// dataset이 있을 경우 정보 전송
		var _rs_ = String.fromCharCode(30);
		var _cs_ = String.fromCharCode(31);
		var _nrs_ = String.fromCharCode(28);
		var _ncs_ = String.fromCharCode(29);
		var dsinfos = [];

		if (callback)
		{
			this._ubi_callback_id = callback;
		}

		var datasetInfos = this.datasets;
		if (datasetInfos)
		{
			for (var i=0; i<datasetInfos.length; i++)
			{
				if (datasetInfos[i])
				{
					dsinfos.push(""+ _nrs_);
					for (var j=0; j<datasetInfos[i].length; j++)
					{
						dsinfos.push(datasetInfos[i][j]);
						dsinfos.push(""+ _ncs_);
					}
				}
			}
		}
		var localDatasetInfos = this.localdatasets;

		if (_ubi_Browser == "Runtime")
		{
			var plugin_elem = this._plugin_elem;
			if (plugin_elem)
			{
				if (this.reporturl != "" && this.reporturl.substr(this.reporturl.length - 1) != "/")
				{
					this.reporturl += "/";
				}

				plugin_elem._plugin_object.setProperty("isLocalFile", nexacro._toBoolean(this.isLocalFile));

				// 다른 형태의 데이타셑을 받는 경우 초기화 작업
				plugin_elem._plugin_object.callMethod("SetVariable", "initData", "true");
				// ocx 모듈 수정으로 인해 하단 초기화 내용 삭제
				//plugin_elem._plugin_object.callMethod("SetVariable", "Nexacro.DatasetInfos", "");
				//plugin_elem._plugin_object.callMethod("SetVariable", "Nexacro.DesignData", "");
				//plugin_elem._plugin_object.callMethod("SetVariable", "Nexacro.RuntimeData", "");
				
				plugin_elem._plugin_object.callMethod("SetVariable", "ClientType", "nexacro");
				plugin_elem._plugin_object.setProperty("FontRevision", true);
				plugin_elem._plugin_object.setProperty("PrintMarginRevision", true);

				// toolbar 설정
				plugin_elem._plugin_object.callMethod("setToolbar", nexacro._toBoolean(this.toolbar));
				// 프로그레스바 설정
				plugin_elem._plugin_object.callMethod("setProgress", nexacro._toBoolean(this.progress));
				// printsetmode, exportsetmode
				plugin_elem._plugin_object.setProperty("printsetmode", nexacro._toInt(this.printsetmode));
				plugin_elem._plugin_object.setProperty("exportsetmode", nexacro._toInt(this.exportsetmode));
				// gatewayProtocolType
				plugin_elem._plugin_object.callMethod("SetVariable", "GatewayProtocolType", this.gatewayProtocolType);
				// isRunThread
				plugin_elem._plugin_object.callMethod("SetVariable", "Viewer.IsRunThread", nexacro._toBoolean(this.isRunThread));

				// Scale
				plugin_elem._plugin_object.callMethod("setPageScale", nexacro._toInt(this.scale));

				plugin_elem._plugin_object.setProperty("IsMultiReport", nexacro._toBoolean(this.ismultireport));
				plugin_elem._plugin_object.setProperty("MultiCount", nexacro._toInt(this.multicount));
				// 리소스 설정
				plugin_elem._plugin_object.setProperty("fileURL", this.fileurl);
				plugin_elem._plugin_object.setProperty("resource", "fixed");

				// Argument 설정
				plugin_elem._plugin_object.callMethod("setArg", this.arg);

				// ExcelExportLineItem 설정
				plugin_elem._plugin_object.callMethod("SetVariable", "Excel.ExportLineItem", ""+this.excelExportLineItem);
				// excelSkipMasterItem 설정
				plugin_elem._plugin_object.callMethod("SetVariable", "Excel.SkipMasterItem", ""+this.excelSkipMasterItem);
				
				plugin_elem._plugin_object.callMethod("SetVariable", "Excel.AdjustPage", ""+this.excelAdjustPage);
				if(this.excelPrintPaperSize != "") {
					plugin_elem._plugin_object.callMethod("SetVariable", "Excel.PrintPaperSize", ""+this.excelPrintPaperSize);
				}
				if(this.excelPrintfitWidth != "") {
					plugin_elem._plugin_object.callMethod("SetVariable", "Excel.PrintfitWidth", ""+this.excelPrintfitWidth);
				}
				if(this.excelPrintfitHeight != "") {
					plugin_elem._plugin_object.callMethod("SetVariable", "Excel.PrintfitHeight", ""+this.excelPrintfitHeight);
				}

				plugin_elem._plugin_object.callMethod("SetVariable", "Excel.SheetPerPage", ""+this.excelsheetperpage);
				plugin_elem._plugin_object.callMethod("SetVariable", "Excel.SheetPerMasterPage", ""+this.excelsheetpermasterpage);
				plugin_elem._plugin_object.callMethod("SetVariable", "Excel.SheetPerReport", ""+this.excelsheetperreport);
				plugin_elem._plugin_object.callMethod("SetVariable", "Excel.SheetPerPageCount", ""+this.excelsheetperpagecount);
				plugin_elem._plugin_object.callMethod("SetVariable", "sheetName", ""+this.sheetname);
				if(this.reporttitle !="") {
					plugin_elem._plugin_object.callMethod("setReportTitle", this.reporttitle);
				}
				// usePDF2를 true로 사용
				plugin_elem._plugin_object.callMethod("SetVariable", "usePDF2", "true");
				// 파일 저장 목록 정리
				plugin_elem._plugin_object.setProperty("invisibleexporttypes", "Hwp,Text,Urf,Data");
				
				// Dataset 설정
				if (dsinfos != "")
				{
					// 서버의 데이터셋을 이용할 경우
					plugin_elem._plugin_object.setProperty("UbiServerURL", this.ubiserverurl);
//					plugin_elem._plugin_object.setProperty("isLocalFile", nexacro._toBoolean('true'));
					plugin_elem._plugin_object.setProperty("isLocalData", nexacro._toBoolean('false'));
					plugin_elem._plugin_object.callMethod("SetVariable", "Nexacro.DatasetInfos", dsinfos.join(""));
				}
				else if (localDatasetInfos && localDatasetInfos.length > 0)
				{
					// Local Dataset 이용할 경우
//					plugin_elem._plugin_object.setProperty("isLocalFile", nexacro._toBoolean('true'));
					plugin_elem._plugin_object.setProperty("isLocalData", nexacro._toBoolean('true'));
//					plugin_elem._plugin_object.callMethod("SetVariable", "useTobeCSV", "true");
					for (var i=0; i<localDatasetInfos.length; i++)
					{
						if (localDatasetInfos[i] && localDatasetInfos[i].length == 2)
						{
							var ssvdata = [];
							ssvdata.push("SSV:utf-8" + _rs_);
							ssvdata.push(localDatasetInfos[i][1].saveSSV(localDatasetInfos[i][1].name, "A"));
							plugin_elem._plugin_object.callMethod("SetDataset", localDatasetInfos[i][0], ssvdata.join(""));
							ssvdata = "";
						}
					}

				} else {

					plugin_elem._plugin_object.setProperty("UbiServerURL", this.ubiserverurl);
//					plugin_elem._plugin_object.setProperty("isLocalFile", nexacro._toBoolean('true'));
					plugin_elem._plugin_object.setProperty("isLocalData", nexacro._toBoolean('false'));
					plugin_elem._plugin_object.callMethod("setDatasource", this.datasource);
				}
				plugin_elem._plugin_object.callMethod("setJrfFileDir", this.reporturl);
				plugin_elem._plugin_object.callMethod("setJrfFileName", this.jrffile);
				plugin_elem._plugin_object.callMethod("setFontElement", this.fontElement);

				if (this.designDataset && this.designDataset != "")
				{
					// runtime report
					plugin_elem._plugin_object.callMethod("LoadTemplet", this.jrffile);
					plugin_elem._plugin_object.callMethod("SetVariable", "Nexacro.DesignData", this.designDataset);
					plugin_elem._plugin_object.callMethod("SetVariable", "Nexacro.RuntimeData", this.gridDataset);
					plugin_elem._plugin_object.callMethod("RetrieveBind");
				}
				else
				{
					plugin_elem._plugin_object.callMethod("Retrieve");
				}

				this.designDataset = "";
				this.gridDataset = "";

				//this.datasets = [];
				//this.localdatasets = [];
				this.datasets = [];
				this.localdatasets = [];

				//plugin_elem._plugin_object.callMethod("SetVariable", "Nexacro.DatasetInfos","");
				//plugin_elem._plugin_object.callMethod("SetVariable", "Nexacro.DesignData", "");
				//plugin_elem._plugin_object.callMethod("SetVariable", "Nexacro.RuntimeData", "");

				if (callback)
					callback_func();
			}
		}
		else
		{
			// runtime일 경우 runtimedata 생성
			var runtimedata = "";
			var streamdata = "";
			if (this.designDataset)
			{
				// dataset SSV 전송에 필요한 정보 생성
				var ssvlist = [];
				ssvlist.push("SSV:utf-8" + _rs_);
				ssvlist.push(this.designDataset);
				ssvlist.push(this.gridDataset);
				runtimedata = ssvlist.join("");
				dsinfos = [];
			}
			else
			{
				// Local dataset을 이용한는 경우
				if (localDatasetInfos && localDatasetInfos.length > 0)
				{
					// Local Dataset 이용할 경우
					// dataset SSV 전송에 필요한 정보 생성
					var ssvlist = [];
					// sqlid 명
					ssvlist.push("LOCALDATASET:" + _rs_);
					for (var i=0; i<localDatasetInfos.length; i++)
					{
						if (localDatasetInfos[i] && localDatasetInfos[i].length == 2)
						{
							ssvlist.push(localDatasetInfos[i][0] + _cs_);	// SQLID
							ssvlist.push(localDatasetInfos[i][1].name + _cs_);	// Dataset ID
							ssvlist.push(_rs_);
						}
					}
					// local dataset의 data 도출
					ssvlist.push("SSV:utf-8" + _rs_);
					for (var i=0; i<localDatasetInfos.length; i++)
					{
						if (localDatasetInfos[i] && localDatasetInfos[i].length == 2)
						{
							ssvlist.push(localDatasetInfos[i][1].saveSSV(localDatasetInfos[i][1].name, "A"));
						}
					}
					streamdata = ssvlist.join("");
					dsinfos = [];
				}
			}

			// 조회전 Nexacro UbiViewer에 설정된 변수를 viewer에 설정
			this.viewer.params.ubiserverurl = this.ubiserverurl;
			this.viewer.params.resource = this.resource;
			this.viewer.params.jrffile = this.jrffile;
			this.viewer.params.masterfilename = this.masterfilename;
			this.viewer.params.resid = this.resid;
			this.viewer.params.arg = this.arg;
			this.viewer.params.divid = "ubiviewer_" + this.divid_seq;
			this.viewer.params.scale = this.scale;
			this.viewer.params.toolbar = this.toolbar;
			this.viewer.params.timeout = this.timeout;
			this.viewer.params.key = this.key;
			this.viewer.params.ismultireport = this.ismultireport;
			this.viewer.params.multicount = this.multicount;
			this.viewer.params.reporttitle = this.reporttitle;
			this.viewer.params.sheetname = this.sheetname;
			this.viewer.params.bgcolor = (this.bgcolor.length == 9) ? (this.bgcolor.substring(0, 7)) : (this.bgcolor);
			this.viewer.params.bgimage = this.bgimage;
			this.viewer.params.flicking = this.flicking;
			this.viewer.params.direction = this.direction;
			this.viewer.params.language = this.language;
			this.viewer.params.isexportchartimage = this.isexportchartimage;
			this.viewer.params.userwidth = this.userwidth;
			this.viewer.params.userheight = this.userheight;
			this.viewer.params.scrollpage = this.scrollpage;
			this.viewer.params.runtimedata = runtimedata;
			this.viewer.params.datasetinfos = dsinfos.join("");
			this.viewer.params.streamdata = streamdata;
			this.viewer.params.isStreaming = ""+this.isStreaming;
			this.viewer.params.useplugin = ""+this.useplugin;
			this.viewer.params.usepluginsave = ""+this.usepluginsave;
			this.viewer.params.pluginprogress = ""+this.pluginprogress;
			this.viewer.params.printIEobj = ""+this.printIEobj;
			this.viewer.params.excelExportLineItem = ""+this.excelExportLineItem;
			this.viewer.params.excelSkipMasterItem = ""+this.excelSkipMasterItem;
			this.viewer.params.exceladjustpage = this.exceladjustpage;
			this.viewer.params.excelSheetPerReport = this.excelsheetperreport;
			this.viewer.params.excelSheetPerPage = this.excelsheetperpage;
			this.viewer.params.excelSheetPerMasterPage = this.excelsheetpermasterpage;
			this.viewer.params.fontElement = this.fontElement;
			this.viewer.params.isvoiceye = ""+ this.isvoiceye;
			this.viewer.params.reqtype = 0;
			this.viewer.params.isencrypt = ""+ this.isencrypt;
			this.viewer.params.isencrypt64 = ""+ this.isencrypt64;

			if (!isCallUrl) {
				// 런타임리포트 여부에 따른 툴바설정
				if (runtimedata == "") {
					this.viewer.setVisibleToolbar("EXCEL_TYPE1",true);
					this.viewer.setVisibleToolbar("EXCEL_TYPE2",true);
				}
				else {
					this.viewer.setVisibleToolbar("EXCEL_TYPE2",false);
				}
			}

			this.designDataset = "";
			this.gridDataset = "";
			this.localdatasets = [];
			this.datasets = [];

			if (isCallUrl) {
				this.viewer.callUrl(strUrl, callback_func);
			} else {
				// 리포트 조회
				this.viewer.showReport(callback_func);
			}
		}
	};

	// 디자인 정보를 담고있는 dataset 생성
	_pUbiViewer.getDesignDataset = function(parent) {
		var designDataset = new Dataset("dsDesign", parent);
		// 컬럼 생성
		var colnames = ["type", 
						"row", 
						"col", 
						"rowspan", 
						"colspan", 
						"align", "halignexpr", "valignexpr",
						"value", "valueexpr", "text",	// text
						"background", "backgroundexpr", "bgcolor",	// bgcolor
						"foreground", "foregroundexpr",
						"font", "fontexpr",
						"merge",
						"autosize", "autosizeexpr", 
						"autofont", "autofontexpr",
						"linespace", 
						"suppressing",
						// margin
						"leftmargin",
						"topmargin",
						"rightmargin",
						"bottommargin", 
						// ---------- 여기까지 반영되어 있음. ----------
						// border
						"leftborder", "leftborderstyle", "leftborderthickness", "leftbordercolor", "leftborderstyleexpr", "leftborderthicknessexpr", "leftbordercolorexpr", 
						"rightborder", "rightborderstyle", "rightborderthickness", "rightbordercolor", "rightborderstyleexpr", "rightborderthicknessexpr", "rightbordercolorexpr", 
						"topborder", "topborderstyle", "topborderthickness", "topbordercolor", "topborderstyleexpr", "topborderthicknessexpr", "topbordercolorexpr", 
						"bottomborder", "bottomborderstyle", "bottomborderthickness", "bottombordercolor", "bottomborderstyleexpr", "bottomborderthicknessexpr", "bottombordercolorexpr", 
						"updiagonalborder", "updiagonalborderstyle", "updiagonalborderthickness", "updiagonalbordercolor", "updiagonalborderstyleexpr", "updiagonalborderthicknessexpr", "updiagonalbordercolorexpr", 
						"downdiagonalborder", "downdiagonalborderstyle", "downdiagonalborderthickness", "downdiagonalbordercolor", "downdiagonalborderstyleexpr", "downdiagonalborderthicknessexpr", "downdiagonalbordercolorexpr", 
						// 
						"topleftpointexpr",
						"widthexpr",
						"heightexpr",
						"visibleexpr",
						"transperentexpr",
						"underlineexpr",
						"formatexpr",
						"maskexpr",
						"htmlconversionexpr",
						"mergeexpr",
						"summarytype"];

		for (var i=0; i<colnames.length; i++)
		{
			designDataset.addColumn(colnames[i], "string");
		}

		return designDataset;
	};

	callback_func = function(msg)
	{
		if (this._ubi_callback_id) {
			var func = this._ubi_context[this._ubi_callback_id];
			if (func) {
				func.call(this._ubi_context, msg);
			}
		}
	};

	_pUbiViewer.aboutBox = function() {
		if (_ubi_Browser == "Runtime")
		{
			var plugin_elem = this._plugin_elem;
			if (plugin_elem) {
				plugin_elem._plugin_object.callMethod("aboutBox");
			}
		} else {
			this.viewer.aboutbox();
		}
	};
	_pUbiViewer.getEnableNoPage = function() {
		if (_ubi_Browser == "Runtime")
		{
			
		} else {
			var isEnable = this.viewer.isEnableNoPage;
			return isEnable;
		}
	};
	_pUbiViewer.exportFile = function(type, subtype, isautodownload) {
		if (_ubi_Browser == "Runtime")
		{
			var plugin_elem = this._plugin_elem;
			if (plugin_elem) {
				if(this.exportfilename != "") {
					plugin_elem._plugin_object.setProperty("exportFileName",this.exportfilename);
				}
				plugin_elem._plugin_object.callMethod("ExportFile", type);
			}
		} else {
			this.viewer.exportFile(type, subtype, isautodownload);
		}
	};
	_pUbiViewer.exportPdf = function() {
		if (_ubi_Browser == "Runtime")
		{
			var plugin_elem = this._plugin_elem;
			if (plugin_elem) {
				if(this.exportfilename != "") {
					plugin_elem._plugin_object.setProperty("exportFileName",this.exportfilename);
				}
				plugin_elem._plugin_object.callMethod("ExportFile", "PDF");
			}
		} else {
			this.viewer.exportPdf();
		}
	};
	_pUbiViewer.exportExcel = function() {
		if (_ubi_Browser == "Runtime")
		{
			var plugin_elem = this._plugin_elem;
			if (plugin_elem) {
				if(this.exportfilename != "") {
					plugin_elem._plugin_object.setProperty("exportFileName",this.exportfilename);
				}
				//plugin_elem._plugin_object.callMethod("ExportFile", "Excel");
				plugin_elem._plugin_object.callMethod("ExportFile", "Xlsx");
			}
		} else {
			this.viewer.exportExcel();
		}
	};
	_pUbiViewer.exportExcelNo = function() {
		if (_ubi_Browser == "Runtime")
		{
			var plugin_elem = this._plugin_elem;
			if (plugin_elem) {
				if(this.exportfilename != "") {
					plugin_elem._plugin_object.setProperty("exportFileName",this.exportfilename);
				}
				//plugin_elem._plugin_object.callMethod("ExportFile", "Excel_No");
				if (this.excelSkipMasterItem)
				{
					plugin_elem._plugin_object.callMethod("ExportFile", "Xlsx_no_omit");
				}
				else
				{
					plugin_elem._plugin_object.callMethod("ExportFile", "Xlsx_no");
				}
			}
		} else {
			this.viewer.exportExcelNo();
		}
	};
	_pUbiViewer.exportHml = function() {
		if (_ubi_Browser == "Runtime")
		{
			var plugin_elem = this._plugin_elem;
			if (plugin_elem) {
				if(this.exportfilename != "") {
					plugin_elem._plugin_object.setProperty("exportFileName",this.exportfilename);
				}
				plugin_elem._plugin_object.callMethod("ExportFile", "Hml");
			}
		} else {
			this.viewer.exportHml();
		}
	};
	_pUbiViewer.exportCell = function() {
		if (_ubi_Browser == "Runtime")
		{
			var plugin_elem = this._plugin_elem;
			if (plugin_elem) {
				if(this.exportfilename != "") {
					plugin_elem._plugin_object.setProperty("exportFileName",this.exportfilename);
				}
				plugin_elem._plugin_object.callMethod("ExportFile", "Hcell");
			}
		} else {
			this.viewer.exportCell();
		}
	};
	_pUbiViewer.exportPptx = function() {
		if (_ubi_Browser == "Runtime")
		{
			var plugin_elem = this._plugin_elem;
			if (plugin_elem) {
				if(this.exportfilename != "") {
					plugin_elem._plugin_object.setProperty("exportFileName",this.exportfilename);
				}
				plugin_elem._plugin_object.callMethod("ExportFile", "Pptx");
			}
		} else {
			this.viewer.exportPptx();
		}
	};
	_pUbiViewer.exportDocx = function() {
		if (_ubi_Browser == "Runtime")
		{
			var plugin_elem = this._plugin_elem;
			if (plugin_elem) {
				if(this.exportfilename != "") {
					plugin_elem._plugin_object.setProperty("exportFileName",this.exportfilename);
				}
				plugin_elem._plugin_object.callMethod("ExportFile", "Docx");
			}
		} else {
			this.viewer.exportDocx();
		}
	};
	_pUbiViewer.exportImage = function() {
		if (_ubi_Browser == "Runtime")
		{
			var plugin_elem = this._plugin_elem;
			if (plugin_elem) {
				if(this.exportfilename != "") {
					plugin_elem._plugin_object.setProperty("exportFileName",this.exportfilename);
				}
				plugin_elem._plugin_object.callMethod("ExportFile", "Image");
			}
		} else {
			this.viewer.exportImage();
		}
	};
	
	// ActiveX에서만 사용 가능
	_pUbiViewer.exportSet = function(val) {
		if (_ubi_Browser == "Runtime")
		{
			var plugin_elem = this._plugin_elem;
			if (plugin_elem) {
				if (val != undefined) {
					plugin_elem._plugin_object.callMethod("SetVariable", "Export.Type", val);
				}
				plugin_elem._plugin_object.callMethod("exportset");
			}
		}
	};
	
	_pUbiViewer.exportReport = function(type, isplugin) {
		if (_ubi_Browser == "Runtime")
		{
			
		} else {
			this.viewer.exportReport(type, isplugin);
		}
	};
	
	_pUbiViewer.setHmlExtension = function(val) {
		if (_ubi_Browser == "Runtime")
		{
			var plugin_elem = this._plugin_elem;
			if (plugin_elem) {
				if (val != undefined) {
					plugin_elem._plugin_object.callMethod("SetVariable", "Export.HML.DefaultExtension", val);
				}
			}
		} else {
			this.viewer.HmlExtension = val;
		}
	};
	
	_pUbiViewer.setEnableScrollpage = function(flag) {
		if (_ubi_Browser == "Runtime")
		{
			
		} else {
			this.viewer.setEnableScrollpage(flag);
		}
	};
	
	_pUbiViewer.setEnableDefaultSave = function(flag) {
		if (_ubi_Browser == "Runtime")
		{
			
		} else {
			this.viewer.setEnableDefaultSave(flag);
		}
	};
	
	_pUbiViewer.print = function() {
		if (_ubi_Browser == "Runtime")
		{
			var plugin_elem = this._plugin_elem;
			if (plugin_elem) {
				plugin_elem._plugin_object.callMethod("directPrint");
			}
		} else {
			this.viewer.print();
		}
	};
	_pUbiViewer.printSet = function() {
		if (_ubi_Browser == "Runtime")
		{
			var plugin_elem = this._plugin_elem;
			if (plugin_elem) {
				plugin_elem._plugin_object.callMethod("printset");
			}
		} else {
			this.viewer.printSet();
		}
	};
	_pUbiViewer.printPDF = function() {
		if (_ubi_Browser == "Runtime")
		{
			var plugin_elem = this._plugin_elem;
			if (plugin_elem) {
				plugin_elem._plugin_object.callMethod("directPrint");
			}
		} else {
			this.viewer.printPDF();
		}
	};
	_pUbiViewer.printHTML = function() {
		if (_ubi_Browser == "Runtime")
		{
			var plugin_elem = this._plugin_elem;
			if (plugin_elem) {
				plugin_elem._plugin_object.callMethod("directPrint");
			}
		} else {
			this.viewer.printHTML();
		}
	};
	_pUbiViewer.previous = function() {
		if (_ubi_Browser == "Runtime")
		{
			var plugin_elem = this._plugin_elem;
			if (plugin_elem) {
				plugin_elem._plugin_object.callMethod("previousPage");
			}
		} else {
			this.viewer.previous();
		}
	};
	_pUbiViewer.next = function() {
		if (_ubi_Browser == "Runtime")
		{
			var plugin_elem = this._plugin_elem;
			if (plugin_elem) {
				plugin_elem._plugin_object.callMethod("nextPage");
			}
		} else {
			this.viewer.next();
		}
	};
	_pUbiViewer.first = function() {
		if (_ubi_Browser == "Runtime")
		{
			var plugin_elem = this._plugin_elem;
			if (plugin_elem) {
				plugin_elem._plugin_object.callMethod("firstPage");
			}
		} else {
			this.viewer.first();
		}
	};
	_pUbiViewer.last = function() {
		if (_ubi_Browser == "Runtime")
		{
			var plugin_elem = this._plugin_elem;
			if (plugin_elem) {
				plugin_elem._plugin_object.callMethod("lastPage");
			}
		} else {
			this.viewer.last();
		}
	};
	_pUbiViewer.gopage = function(iPage) {
		if (iPage == null || iPage == undefined) {
			return;
		}
		
		if (_ubi_Browser == "Runtime")
		{
			var plugin_elem = this._plugin_elem;
			if (plugin_elem) {
				plugin_elem._plugin_object.callMethod("setPage", nexacro._toInt(iPage));
			}
		} else {
			this.viewer.gopage(iPage);
		}
	};
	_pUbiViewer.zoomIn = function() {
		if (_ubi_Browser == "Runtime")
		{
			var plugin_elem = this._plugin_elem;
			if (plugin_elem) {
				plugin_elem._plugin_object.callMethod("zoomIn");
			}
		} else {
			this.viewer.zoomIn();
		}
	};
	_pUbiViewer.zoomOut = function() {
		if (_ubi_Browser == "Runtime")
		{
			var plugin_elem = this._plugin_elem;
			if (plugin_elem) {
				plugin_elem._plugin_object.callMethod("zoomOut");
			}
		} else {
			this.viewer.zoomOut();
		}
	};
	_pUbiViewer.refresh = function() {
		if (_ubi_Browser == "Runtime")
		{
			var plugin_elem = this._plugin_elem;
			if (plugin_elem) {
				plugin_elem._plugin_object.callMethod("refresh");
			}
		} else {
			this.viewer.refresh();
		}
	};
	_pUbiViewer.setMenuTextToolbar = function(menu, val) {
		this.viewer.setMenuTextToolbar(menu, val);
	};

	// 툴바의 보임/안보임 속섲 지정
	_pUbiViewer.setToolbar = function(val) {
		if (_ubi_Browser == "Runtime")
		{
			var plugin_elem = this._plugin_elem;
			if (plugin_elem)
			{
				// toolbar 설정
				var bool = false;
				if (val == 'true') {
					bool = true;
				}
				plugin_elem._plugin_object.callMethod("setToolbar", nexacro._toBoolean(bool));
			}
		} else {
			this.viewer.setToolbar(val);
		}
		this.toolbar = ""+val;
	};
	// 스케일 지정
	_pUbiViewer.changeScale = function(val) {
		if (_ubi_Browser == "Runtime")
		{
			var plugin_elem = this._plugin_elem;
			if (plugin_elem)
			{
				// toolbar 설정
				plugin_elem._plugin_object.callMethod("changeScale", nexacro._toInt(val));
			}
		} else {
			this.viewer.changeScale(val);
		}
		this.scale = ""+val;
	};
	
	_pUbiViewer.setUserSaveList = function(list) {
		if (_ubi_Browser == "Runtime") {
			
		} else {
			this.viewer.setUserSaveList(list);
		}
	};
	
	_pUbiViewer.setUserPrintList = function(list) {
		if (_ubi_Browser == "Runtime") {
			
		} else {
			this.viewer.setUserPrintList(list);
		}
	};
	
	_pUbiViewer.setVisibleToolbar = function(menu, val) {
		if (_ubi_Browser == "Runtime")
		{
			var plugin_elem = this._plugin_elem;
			if (plugin_elem)
			{
				// toolbar 설정
				plugin_elem._plugin_object.callMethod("SetVisibleTbButton", menu, nexacro._toBoolean(val));
			}
		} else {
			this.viewer.setVisibleToolbar(menu, val);
		}
	};
	_pUbiViewer.setEnableToolbar = function(menu, val) {
		if (_ubi_Browser == "Runtime") {
			
		} else {
			this.viewer.setEnableToolbar(menu, val);
		}
	};
	_pUbiViewer.setSaveMenu = function(menu) {
		if (_ubi_Browser == "Runtime") {
			
		} else {
			this.viewer.setSaveMenu(menu);
		}
	};
	_pUbiViewer.setPrintMenu = function(menu) {
		if (_ubi_Browser == "Runtime") {
			
		} else {
			this.viewer.setPrintMenu(menu);
		}
	};
	_pUbiViewer.setSaveExcelMenu = function(menu) {
		if (_ubi_Browser == "Runtime") {
			
		} else {
			this.viewer.setSaveExcelMenu(menu);
		}
	};

	_pUbiViewer.getTotalPage = function() {
		var totalpage = 0;
		if (_ubi_Browser == "Runtime")
		{
			var plugin_elem = this._plugin_elem;
			if (plugin_elem)
			{
				totalpage = plugin_elem._plugin_object.callMethod("getTotalPage");
			}
		} else {
			totalpage = this.viewer.totalPage;
		}
		
		return totalpage;
	};
	
	_pUbiViewer.getVariable = function(val) {
		var variable = '';
		if (_ubi_Browser == "Runtime")
		{
			var plugin_elem = this._plugin_elem;
			if (plugin_elem)
			{
				variable = plugin_elem._plugin_object.callMethod("GetVariable", val);
			}
		}
		
		return variable;
	};
	
	_pUbiViewer.setVariable = function(key, val) {
		if (_ubi_Browser == "Runtime")
		{
			var plugin_elem = this._plugin_elem;
			if (plugin_elem)
			{
				plugin_elem._plugin_object.callMethod("SetVariable", key, val);
			}
		}
	};
	
	_pUbiViewer.getPrintStatus = function() {
		var status = '';
		if (_ubi_Browser == "Runtime")
		{
			var plugin_elem = this._plugin_elem;
			if (plugin_elem)
			{
				status = plugin_elem._plugin_object.callMethod("getPrintStatus");
			}
		}
		
		return status;
	};
	
	// 전용 뷰어 전용
	_pUbiViewer.setPluginProgress = function(val) {
		if (_ubi_Browser == "Runtime")
		{
			var plugin_elem = this._plugin_elem;
			if (plugin_elem)
			{
				plugin_elem._plugin_object.callMethod("setProgress", nexacro._toBoolean(val));
			}
		}
		else {
			this.set_pluginprogress(val);
			this.viewer.setPluginprogress(val);
		}
	};
	
	_pUbiViewer.setPluginVariable = function(key, val) {
		if (_ubi_Browser == "Runtime")
		{
			var plugin_elem = this._plugin_elem;
			if (plugin_elem)
			{
				plugin_elem._plugin_object.callMethod("SetVariable", key, val);
			}
		}
		else {
			this.viewer.setPluginVariable(key, val);
		}
	};
	
	_pUbiViewer.clearPluginVariable = function() {
		if (_ubi_Browser == "Runtime") {
		}
		else {
			this.viewer.clearPluginVariable();
		}
	};

/*
	_pUbiViewer.setDataset = function (id, url, datasetid, args, datatype)
    {
		if (_ubi_Browser != "Runtime")
		{
			this.datasets.SetAt(id, [url, datasetid, args, datatype]);
		}
    };
*/

	_pUbiViewer.setRuntimeData = function(designDataset, gridDataset) {
		this.designDataset = designDataset.saveSSV("dsDesign", "A");
		this.gridDataset = gridDataset.saveSSV("dsGrid", "A");
	};

	_pUbiViewer.addTransaction = function (parent, strSvcID, strURL, strInDatasets, strOutDatasets, strArgument, nDataType)
    {
		var loadItem = new nexacro.TransactionItem(strURL, parent, strSvcID, strInDatasets, strOutDatasets, strArgument, nDataType, false);
		var sendData = loadItem._sendData;
		// Data가 encoding 되어있을 경우 Decoding
		if (sendData.indexOf("&") == 0)
		{
			sendData = nexacro._decodeXml(sendData);
		}

		this.datasets.push([strURL, sendData, strOutDatasets, nDataType]);
    };

	_pUbiViewer.addTransaction2 = function (parent, strSvcID, strURL, strInDatasets, strOutDatasets, strArgument, nInDataType, nOutDataType)
    {
		var loadItem = new nexacro.TransactionItem(strURL, parent, strSvcID, strInDatasets, strOutDatasets, strArgument, nInDataType, false);
		var sendData = loadItem._sendData;
		// Data가 encoding 되어있을 경우 Decoding
		if (sendData.indexOf("&") == 0)
		{
			sendData = nexacro._decodeXml(sendData);
		}

		this.datasets.push([strURL, sendData, strOutDatasets, nOutDataType]);
    };
    
	_pUbiViewer.setDataset = function (sqlId, dataset)
    {
		this.localdatasets.push([sqlId, dataset]);
    };

	_pUbiViewer.removeAllDataset = function() {
    	
    };

	_pUbiViewer.on_attach_contents_handle = function (win) {
		if (_ubi_Browser == "Runtime")
		{
			if (this._obj_elem) {
				this._obj_elem.attachHandle(win);
			}
		}
		else
		{
			this.on_created_contents(win);
		}
	};

    _pUbiViewer.on_create_contents = function() 
	{
		if (_ubi_Browser == "Runtime")
		{
			//alert('현재 지원하지 않는 기능입니다.');
			//return;
			
			var control_elem = this.getElement();
			if (control_elem)
			{
				var obj_elem = null;
				if (nexacro.Version == "17") {
					obj_elem = this._plugin_elem = this._obj_elem = new nexacro.PluginElement(control_elem);
				} else {
					// Runtime일 경우 테두리 없앰.
					this.style.set_border("0 solid #808080ff");
					obj_elem = this._plugin_elem = new nexacro.PluginElement(control_elem);
				}
				obj_elem.setElementSize(this.getClientWidth(), this.getClientHeight());

				obj_elem.classid = "{9BE79626-84B2-489D-BBFC-8492339AF9C2}";
				obj_elem.windowed = true;
				obj_elem.popupstyle = false;
			}
		}
		else 
		{
			nexacro.Component.prototype.on_create_contents.call(this);
		}
	};

	_pUbiViewer.on_created_contents = function(win) {
		if (_ubi_Browser == "Runtime")
		{
			var plugin_elem = null;
			plugin_elem = this._plugin_elem;

			if (plugin_elem)
			{
				plugin_elem.component = this;
				plugin_elem.create(win);
				plugin_elem.initEvent();
				this.document = plugin_elem._document;
				this.window = plugin_elem._winodw;
			}
		}
		else
		{
			var divTarget = null;
			var clientWidth = 0;
			var clientHeight = 0;
			
			nexacro.Component.prototype.on_created_contents.call(this);
			divTarget = document.getElementById(this._unique_id);

			// IE7일 경우 상위 div 도출
			if (__ubi_isIE && __ubi_ieVersion < 8) {
				divTarget = divTarget.parentNode; 
			}
			
			/*
			divTarget.innerHTML = "<div id='ubiviewer_" + this._unique_id
					+ "' style='border:0px solid red;width:" + this.width
					+ "px;height:" + this.height + "px'></div>";
			*/
			
			var viewerId = "ubiviewer_" + this.divid_seq;
			divTarget.innerHTML = "<div id='" + viewerId
					+ "' style='border:0px solid red; width:" + this.getClientWidth()
					+ "px;height:" + this.getClientHeight() + "px'></div>";

			this.viewer = new UbiViewer({
				ubiserverurl : this.ubiserverurl,
				resource : this.resource,
				jrffile : this.jrffile,
				masterfilename : this.masterfilename,
				resid : this.resid,
				arg : this.arg,
				divid : viewerId,
				scale : this.scale,
				toolbar : this.toolbar,
				timeout : this.timeout,
				key : this.key,
				ismultireport : this.ismultireport,
				multicount : this.multicount,
				reporttitle : this.reporttitle,
				sheetname : this.sheetname,
				bgcolor : (this.bgcolor.length == 9) ? (this.bgcolor.substring(0, 7)) : (this.bgcolor),
				bgimage : this.bgimage,
				flicking : this.flicking || "false",
				direction : this.direction,
				language : this.language,
				isexportchartimage : this.isexportchartimage,
				userwidth : this.userwidth,
				userheight : this.userheight,
				clienttype : "nexacro",
				scrollpage : this.scrollpage,
				runtimedata : "",
				iswa : "false"
			});
		}
	};

	_pUbiViewer.on_destroy_contents = function ()
    {
		if (_ubi_Browser == "Runtime")
		{
			var plugin_elem = this._plugin_elem;
			if (plugin_elem) 
			{
				this.window = null;
				this.document = null;
				plugin_elem.destroy();
				this._plugin_elem = null;
			}
		}
		else
		{
			if (this.viewer)
			{
				this.viewer.destroy();
				this.viewer = null;
			}
			
			var divComp = document.getElementById(this._unique_id);
			if (divComp) {
				divComp.innerHTML = '';
			}
		}
    };

	_pUbiViewer.on_update_position = function (resize_flag, move_flag)
	{
		if (_ubi_Browser == "Runtime")
		{
			nexacro.Component.prototype.on_update_position.call(this, resize_flag, move_flag);
			var plugin_elem = this._plugin_elem;
			if (plugin_elem)
			{
				plugin_elem.on_update_position();
			}
		} else {
			nexacro.Component.prototype.on_update_position.call(this, resize_flag, move_flag);
		}
    }; 

	_pUbiViewer.on_change_containerRect = function(width, height) 
	{
		if (_ubi_Browser == "Runtime")
		{
			var plugin_elem = this._plugin_elem;
			if (plugin_elem) 
			{
				plugin_elem.setElementSize(width, height);
			}
		} else {
			nexacro.Component.prototype.on_change_containerRect.call(this, width, height);

			// HTML Viewer Size 조정
			var divTarget = document.getElementById("ubiviewer_" + this.divid_seq);
			if (divTarget) {
				divTarget.style.width = width +"px";
				divTarget.style.height = height +"px";
				if (this.viewer)
				{
					this.viewer.resize();
				}
			}
		}
	};
	
	_pUbiViewer.set_enable = function (v)
	{
		v = nexacro._toBoolean(v);
		if (this.enable != v)
		{
			if (_ubi_Browser == "Runtime")
			{
				var plugin_elem = this._plugin_elem;
				this.enable = v;
				if (this._is_created)
				{
					var enable_flag = (this.parent._real_enable && v);
					if (this._real_enable != enable_flag)
					{
						this._real_enable = enable_flag;
						this._stat_change(enable_flag ? "enable" : "disable", this._pseudo);
						this.on_apply_prop_enable(this._real_enable);
						this._plugin_elem.setElementEnable(enable_flag);
					}
				}
			} else {
			}
		}
	};
	
	_pUbiViewer.on_apply_custom_setfocus = function (evt_name)
	{
		if (nexacro._enableaccessibility)
		{
			nexacro.Component.prototype.on_apply_custom_setfocus.call(this, evt_name);
		}

//		if (_ubi_Browser != "Runtime")
//		{
//			document.getElementById("ubiviewer_mainframe_childframe_form_UbiViewerUbiToolbarButton_SaveButton").focus();
//		}

//		var ifrm_elem = this._ifrm_elem;
//		if (ifrm_elem)
//		{
//			ifrm_elem._setElementFocus();
//		}
	}; 

	_pUbiViewer._setAccessibilityOutfocusAction = function ()
	{
		var accessibility = this.on_find_CurrentStyle_accessibility("enable");

//		if (accessibility)
//		{
//			var _ifrm_elem = this._ifrm_elem;
//			if (_ifrm_elem)
//			{
//				if (_ifrm_elem._prev_outfocus_message_elem)
//					_ifrm_elem._prev_outfocus_message_elem.setElementText(accessibility.action);
//				if (_ifrm_elem._next_outfocus_message_elem)
//					_ifrm_elem._next_outfocus_message_elem.setElementText(accessibility.action);
//			}
//		}
	};


	// Event 추가
	_pUbiViewer.addEventHandler = function (evt_id, func, target) {
		if (_ubi_Browser == "Runtime")
		{
			var plugin_elem = this._plugin_elem;
			var ret = false;
			if (plugin_elem) 
			{
				ret = plugin_elem.addEventHandler(evt_id, func);

				if (ret == false) {
					this._events.add_item(evt_id, func);
				}
				if (evt_id in this._event_list == false) {
					this._event_list[evt_id] = 1;
				}
				nexacro.Component.prototype.addEventHandler.call(this, evt_id, func, target);
				if (this[evt_id]) {
					this[evt_id]._firePluginEvent = _pPlugin._fireEvent;
				}
			}
		} else {
			if (this.viewer && this.viewer.events) {
				if (evt_id == 'ExportEnd') {
					this.viewer.events.exportEnd = func;
				} else if (evt_id == 'PrintEnd') {
					this.viewer.events.printEnd = func;
				} else if (evt_id == 'LinkButtonDown') {
					this.viewer.events.linkButtonDown = func;
				}
			}
		}
	};

	// Event 삭제
	_pUbiViewer.removeEventHandler = function (evt_id, func, target) {
		if (_ubi_Browser == "Runtime")
		{
			var plugin_elem = this._plugin_elem;
			if (plugin_elem) {
				plugin_elem.removeEventHandler(evt_id, func);
			}
			else {
				this._events.delete_item(evt_id);
			}
			nexacro.Component.prototype.removeEventHandler.call(this, evt_id, func, target);
		} else {
		}
	};

	_pUbiViewer.getClientWidth = function() {
		var clientWidth = 0;
		if (nexacro.Version == "17") {
			clientWidth = this._getClientWidth();
		} else {
			clientWidth = this._client_width;
		}
		return clientWidth;
	};

	_pUbiViewer.getClientHeight = function() {
		var clientHeight = 0;
		if (nexacro.Version == "17") {
			clientHeight = this._getClientHeight();
		} else {
			clientHeight = this._client_height;
		}
		return clientHeight;
	};
	
	delete _pUbiViewer;
}