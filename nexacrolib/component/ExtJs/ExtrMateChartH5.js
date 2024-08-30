/**
*  Nexacro Professional Training Couse
*  @FileName 	ExtrMateChartH5.js 
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
 * 차트생성
 * @param 	{object} objChart	차트로 그릴 WebBrowser Object
 * @return 	없음
 * @example gfnCreateChart(objChart)
 */
pForm.gfnCreateChart = function(objChart)
{
	var svc_url = this.gfnGetServerUrl();
	var htmlUrl = svc_url + "rMateChartH5/nexacroChartH5Sample.html";	// 차트를 그릴 html의 url
	var scriptRootUrl = svc_url + "rMateChartH5/rMateChartH5";			// rMateChartH5의 assets과 js가 저장된 url (이 디렉토리의 아래에 JS/ 와 Assets/ 디렉토리가 있어야 함)

	// Form이 완성된 후 차트를 생성합니다.
	this.rMateChartCreate(objChart, scriptRootUrl, htmlUrl, this.gfnMakeChartVars());
};

/**
 * gfn_CreateChart 함수의 내부함수
 * @param 	없음
 * @return 	없음
 * @example gfnMakeChartVars()
 */
pForm.gfnMakeChartVars = function() {
	var chartVars = "";
	var rMateOnLoadCallFunction = "rMateChartOnLoad";
	chartVars += "rMateOnLoadCallFunction="+rMateOnLoadCallFunction;

	return chartVars;
};

/**
 * 차트 세팅함수
 * @param 	objChart		{object}	차트로 그릴 WebBrowser Object
			objDs			{dataset}	차트에 연동할 Dataset
			sLayoutType		{string}	차트종류(LINE/BAR/PIE/COLUMN)
			arrOption		{array}		차트옵션(문서참조)
 * @return 	없음
 * @example gfnSetChart(objChart, objDs, sLayoutType, arrOption)
 */
pForm.gfnSetChart = function(objChart, objDs, sLayoutType, arrOption)
{
	var sLayout = "";

	if (sLayoutType == "Line")
	{
		sLayout+= "<rMateChart backgroundColor='0xFFFFFF' cornerRadius='12' borderThickness='1' borderStyle='none'>\n";
		sLayout+= "<Options>\n";
		sLayout+= "<Caption text='" + arrOption.title + "' />\n";
		sLayout+= "<SubCaption text='" + arrOption.subtitle + "' textAlign='right' />\n";
		sLayout+= "<Legend />\n";
		sLayout+= "</Options>\n";
		sLayout+= "<Line2DChart showDataTips='true' dataTipDisplayMode='axis' paddingTop='0' fontFamily='Dotum' color='#555555'>\n";
		sLayout+= "<horizontalAxis>\n";
		sLayout+= "<CategoryAxis categoryField='" + arrOption.xfield + "'/>\n";
		sLayout+= "</horizontalAxis>\n";
		sLayout+= "<verticalAxis>\n";
		sLayout+= "<LinearAxis minimum='" + arrOption.minimum + "' maximum='" + arrOption.maximum + "' interval='" + arrOption.interval + "' />\n";
		sLayout+= "</verticalAxis>\n";
		sLayout+= "<series>\n";
		sLayout+= "<Line2DSeries yField='" + arrOption.yfield + "' displayName='" + arrOption.displayName + "'>\n";
		sLayout+= "<showDataEffect>\n";
		sLayout+= "<SeriesInterpolate/>\n";
		sLayout+= "</showDataEffect>\n";		
		sLayout+= "</Line2DSeries>\n";
		sLayout+= "</series>\n";
		sLayout+= "</Line2DChart>\n";
		sLayout+= "</rMateChart>\n";
	}	
	else if (sLayoutType == "Bar")
	{
		sLayout+= "<rMateChart backgroundColor='#FFFFFF'  borderStyle='none'>\n";
		sLayout+= "<Options>\n";
		sLayout+= "<Caption text='" + arrOption.title + "' />\n";
		sLayout+= "<SubCaption text='" + arrOption.subtitle + "' textAlign='right' />\n";
		sLayout+= "<Legend />\n";
		sLayout+= "</Options>\n";
		sLayout+= "<Bar2DChart showDataTips='true'>\n";
		sLayout+= "<horizontalAxis>\n";
		sLayout+= "<LinearAxis minimum='" + arrOption.minimum + "' maximum='" + arrOption.maximum + "' interval='" + arrOption.interval + "'/>\n";
		sLayout+= "</horizontalAxis>\n";
		sLayout+= "<verticalAxis>\n";
		sLayout+= "<CategoryAxis categoryField='" + arrOption.yfield + "'/>\n";
		sLayout+= "</verticalAxis>\n";
		sLayout+= "<series>\n";
		sLayout+= "<Bar2DSeries labelPosition='outside' xField='" + arrOption.xfield + "' displayName='" + arrOption.xfielddisplayname + "' itemRenderer='SemiCircleBarItemRenderer' color='#ffffff'>\n";
		sLayout+= "<showDataEffect>\n";
		sLayout+= "<SeriesInterpolate/>\n";
		sLayout+= "</showDataEffect>\n";	
		sLayout+= "</Bar2DSeries>\n";
		sLayout+= "</series>\n";
		sLayout+= "</Bar2DChart>\n";
		sLayout+= "</rMateChart>\n";
	}
	else if (sLayoutType == "Column")
	{
		sLayout+= "<rMateChart backgroundColor='0xFFFFFF' cornerRadius='12' borderThickness='1' borderStyle='none'>\n";
		sLayout+= "<Options>\n";
		sLayout+= "<Caption text='" + arrOption.title + "' />\n";
		sLayout+= "<SubCaption text='" + arrOption.subtitle + "' textAlign='right' />\n";
		sLayout+= "<Legend />\n";
		sLayout+= "</Options>\n";
		sLayout+= "<Column2DChart showDataTips='true' dataTipDisplayMode='axis' paddingTop='0' fontFamily='Dotum' color='#555555'>\n";
		sLayout+= "<horizontalAxis>\n";
		sLayout+= "<CategoryAxis categoryField='" + arrOption.xfield + "'/>\n";
		sLayout+= "</horizontalAxis>\n";
		sLayout+= "<verticalAxis>\n";
		sLayout+= "<LinearAxis minimum='" + arrOption.minimum + "' maximum='" + arrOption.maximum + "' interval='" + arrOption.interval + "' />\n";
		sLayout+= "</verticalAxis>\n";
		sLayout+= "<series>\n";
		sLayout+= "<Column2DSeries yField='" + arrOption.yfield + "' displayName='" + arrOption.displayName + "'>\n";
		sLayout+= "<showDataEffect>\n";
		sLayout+= "<SeriesInterpolate/>\n";
		sLayout+= "</showDataEffect>\n";	
		sLayout+= "</Column2DSeries>\n";
		sLayout+= "</series>\n";
		sLayout+= "</Column2DChart>\n";
		sLayout+= "</rMateChart>\n";
	}
	else if (sLayoutType == "Pie")
	{
		sLayout+= "<rMateChart backgroundColor='0xFFFFFF' borderStyle='none' cornerRadius='5'>\n";
		sLayout+= "<Options>\n";
		sLayout+= "<Caption text='" + arrOption.title + "'/>\n";
		sLayout+= "<SubCaption text='" + arrOption.subtitle + "'/>\n";
		sLayout+= "<Legend position='right' direction='vertical' labelPlacement='right'/>\n";
		sLayout+= "</Options>\n";
		sLayout+= "<Pie2DChart showDataTips='true'>\n";
		sLayout+= "<series>\n";
		sLayout+= "<Pie2DSeries nameField='" + arrOption.fieldname + "' field='" + arrOption.field + "' labelPosition='callout' startAngle='90' fontFamily='Dotum' color='#555555'>\n";
		sLayout+= "<showDataEffect>\n";
		sLayout+= "<SeriesInterpolate duration='500'/>\n";
		sLayout+= "</showDataEffect>\n";
		sLayout+= "</Pie2DSeries>\n";
		sLayout+= "</series>\n";
		sLayout+= "</Pie2DChart>\n";
		sLayout+= "</rMateChart>\n";
	}
	this.rMateChartSetLayout(objChart, sLayout);
	this.rMateChartSetData(objChart, this.rMateChartDataSetToXml(objDs));
};

/**
 * 차트 세팅함수
 * @param 	objChart		{object}	차트로 그릴 WebBrowser Object
			objDs			{dataset}	차트에 연동할 Dataset
			sLayoutType		{string}	차트종류(LINE/BAR/PIE/COLUMN)
			arrOption		{array}		차트옵션(문서참조)
 * @return 	없음
 * @example gfnSetChart(objChart, objDs, sLayoutType, arrOption)
 */
pForm.gfnSetMultiChart = function(objChart, objDs, sLayoutType, arrOption)
{
	var sLayout = "";
	if (sLayoutType == "Line")
	{
	    var arrYfield = arrOption.yfield.split(",");
		var arrDisplayName = arrOption.displayName.split(",");

		sLayout+= "<rMateChart backgroundColor='0xFFFFFF' cornerRadius='12' borderThickness='1' borderStyle='none'>\n";
		sLayout+= "<Options>\n";
		sLayout+= "<Caption text='" + arrOption.title + "' />\n";
		sLayout+= "<SubCaption text='" + arrOption.subtitle + "' textAlign='right' />\n";
		sLayout+= "<Legend />\n";
		sLayout+= "</Options>\n";
		sLayout+= "<Line2DChart showDataTips='true'>\n";
		sLayout+= "<horizontalAxis>\n";
		sLayout+= "<CategoryAxis categoryField='" + arrOption.xfield + "'/>\n";
		sLayout+= "</horizontalAxis>\n";
		sLayout+= "<verticalAxis>\n";
		sLayout+= "<LinearAxis minimum='" + arrOption.minimum + "' maximum='" + arrOption.maximum + "' interval='" + arrOption.interval + "' />\n";
		sLayout+= "</verticalAxis>\n";
		sLayout+= "<series>\n";
						
		for(var i=0; i<arrYfield.length;i++)
		{
			sLayout+= "<Line2DSeries yField='" + arrYfield[i] + "' displayName='" + arrDisplayName[i] + "'>\n";
			sLayout+= "<showDataEffect>\n";
			sLayout+= "<SeriesInterpolate/>\n";
			sLayout+= "</showDataEffect>\n";	
			sLayout+= "</Line2DSeries>\n";
		}		
		
		sLayout+= "</series>\n";
		sLayout+= "</Line2DChart>\n";
		sLayout+= "</rMateChart>\n";
	}	
	else if (sLayoutType == "Bar")
	{
	    var arrXfield = arrOption.xfield.split(",");
		var arrXfieldDisplayName = arrOption.xfielddisplayname.split(",");
		sLayout+= "<rMateChart backgroundColor='#FFFFFF'  borderStyle='none'>\n";
		sLayout+= "<Options>\n";
		sLayout+= "<Caption text='" + arrOption.title + "' />\n";
		sLayout+= "<SubCaption text='" + arrOption.subtitle + "' textAlign='right' />\n";
		sLayout+= "<Legend />\n";
		sLayout+= "</Options>\n";
		sLayout+= "<Bar2DChart showDataTips='true'>\n";
		sLayout+= "<horizontalAxis>\n";
		sLayout+= "<LinearAxis minimum='" + arrOption.minimum + "' maximum='" + arrOption.maximum + "' interval='" + arrOption.interval + "'/>\n";
		sLayout+= "</horizontalAxis>\n";
		sLayout+= "<verticalAxis>\n";
		sLayout+= "<CategoryAxis categoryField='" + arrOption.yfield + "'/>\n";
		sLayout+= "</verticalAxis>\n";
		sLayout+= "<series>\n";
					
		for(var i=0; i<arrXfield.length;i++)
		{						
			sLayout+= "<Bar2DSeries labelPosition='outside' xField='" + arrXfield[i] + "' displayName='" + arrXfieldDisplayName[i] + "' itemRenderer='SemiCircleBarItemRenderer'>\n";
			sLayout+= "<showDataEffect>\n";
			sLayout+= "<SeriesInterpolate/>\n";
			sLayout+= "</showDataEffect>\n";	
			sLayout+= "</Bar2DSeries>\"n";
		}		
		
		sLayout+= "</series>\n";
		sLayout+= "</Bar2DChart>\n";
		sLayout+= "</rMateChart>\n";
	}
	else if (sLayoutType == "Column")
	{
	    var arrYfield = arrOption.yfield.split(",");
		var arrDisplayName = arrOption.displayName.split(",");

		sLayout+= "<rMateChart backgroundColor='0xFFFFFF' cornerRadius='12' borderThickness='1' borderStyle='none'>\n";
		sLayout+= "<Options>\n";
		sLayout+= "<Caption text='" + arrOption.title + "' />\n";
		sLayout+= "<SubCaption text='" + arrOption.subtitle + "' textAlign='right' />\n";
		sLayout+= "<Legend />\n";
		sLayout+= "</Options>\n";
		sLayout+= "<Column2DChart showDataTips='true'>\n";
		sLayout+= "<horizontalAxis>\n";
		sLayout+= "<CategoryAxis categoryField='" + arrOption.xfield + "'/>\n";
		sLayout+= "</horizontalAxis>\n";
		sLayout+= "<verticalAxis>\n";
		sLayout+= "<LinearAxis minimum='" + arrOption.minimum + "' maximum='" + arrOption.maximum + "' interval='" + arrOption.interval + "' />\n";
		sLayout+= "</verticalAxis>\n";
		sLayout+= "<series>\n";
						
		for(var i=0; i<arrYfield.length;i++)
		{
			sLayout+= "<Column2DSeries yField='" + arrYfield[i] + "' displayName='" + arrDisplayName[i] + "'>\n";
			sLayout+= "<showDataEffect>\n";
			sLayout+= "<SeriesInterpolate/>\n";
			sLayout+= "</showDataEffect>\n";	
			sLayout+= "</Column2DSeries>\n";
		}		
		
		sLayout+= "</series>\n";
		sLayout+= "</Column2DChart>\n";
		sLayout+= "</rMateChart>\n";
	}	
	
	this.rMateChartSetLayout(objChart, sLayout);
	this.rMateChartSetData(objChart, this.rMateChartDataSetToXml(objDs));
};

/**
 * 차트 세팅함수
 * @param 	objChart		{object}	차트로 그릴 WebBrowser Object
			objDs			{dataset}	차트에 연동할 Dataset
			sLayoutType		{string}	차트종류(LINE/BAR/PIE/COLUMN)
			arrOption		{array}		차트옵션(문서참조)
 * @return 	없음
 * @example gfnSetChart(objChart, objDs, sLayoutType, arrOption)
 */
pForm.gfnSetCombinationChart = function(objChart, objDs, arrOption)
{
	var sLayout = "";
	var arrYfield = arrOption.yfield.split(",");
	var arrDisplayName = arrOption.displayName.split(",");

	sLayout+= "<rMateChart backgroundColor='#FFFFFF'  borderStyle='none'>\n";
	sLayout+= "<Options>\n";
	sLayout+= "<Caption text='Annual Report'/>\n";
	sLayout+= "</Options>\n";
	sLayout+= "<NumberFormatter id='numfmt' useThousandsSeparator='true'/>\n";
	sLayout+= "<Combination2DChart showDataTips='true'>\n";
	sLayout+= "<horizontalAxis>\n";
	sLayout+= "<CategoryAxis categoryField='Month' padding='1'/>\n";
	sLayout+= "</horizontalAxis>\n";
	sLayout+= "<verticalAxis>\n";
	sLayout+= "<LinearAxis id='vAxis1' formatter='{numfmt}' maximum='100' interval='10'/>\n";
	sLayout+= "</verticalAxis>\n";
	sLayout+= "<series>\n";

	sLayout+= "<Column2DSeries labelPosition='outside' yField='" + arrYfield[0] + "' displayName='" + arrDisplayName[0] + "'>\n";
	sLayout+= "<fill>\n";
	sLayout+= "<SolidColor color='#41b2e6'/>\n";
	sLayout+= "</fill>\n";
	sLayout+= "<showDataEffect>\n";
	sLayout+= "<SeriesInterpolate/>\n";
	sLayout+= "</showDataEffect>\n";
	sLayout+= "</Column2DSeries>\n";

	sLayout+= "<Line2DSeries radius='6' yField='" + arrYfield[1] + "' displayName='" + arrDisplayName[1] + "'>\n";
	sLayout+= "<verticalAxis>\n";
	sLayout+= "<LinearAxis id='vAxis2'/>\n";
	sLayout+= "</verticalAxis>\n";
	sLayout+= "<showDataEffect>\n";
	sLayout+= "<SeriesInterpolate/>\n";
	sLayout+= "</showDataEffect>\n";
	sLayout+= "<lineStroke>\n";
	sLayout+= "<Stroke color='#f9bd03' weight='4'/>\n";
	sLayout+= "</lineStroke>\n";
	sLayout+= "<stroke>\n";
	sLayout+= "<Stroke color='#f9bd03' weight='3'/>\n";
	sLayout+= "</stroke>\n";	
	sLayout+= "</Line2DSeries>\n";

	
	sLayout+= "</series>\n";
	sLayout+= "<verticalAxisRenderers>\n";
	sLayout+= "<Axis2DRenderer axis='{vAxis1}' showLine='false'/>\n";
	sLayout+= "<Axis2DRenderer axis='{vAxis2}' showLine='false'/>\n";
	sLayout+= "</verticalAxisRenderers>\n";
	sLayout+= "</Combination2DChart>\n";
	sLayout+= "</rMateChart>\n";
	
	this.rMateChartSetLayout(objChart, sLayout);
	this.rMateChartSetData(objChart, this.rMateChartDataSetToXml(objDs));
};