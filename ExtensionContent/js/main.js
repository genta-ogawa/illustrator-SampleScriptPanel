/*  v1.0.3でやりたいこと
	日本語表記部分をランゲージパックで分岐させ、マルチランゲージに対応したいかも。
	キー個別でショートカットキーを割り当てられるようにしたいかも。
	OS毎に占有されている特殊なキー割り当ては自動回避して採番してくれるようにしたいかも。
	UIのパレットをもう少し綺麗に表示できるようにしたいかも。
	こんなものかな
*/

//global Reference value.
var sckeystring = new String();
    sckeystring = "patternA";
//Flyout Menu sauce
//from :PS-Panels-Boilerplate/src/com.undavide.flyout/js/main.js
/*jslint vars: true, plusplus: true, devel: true, nomen: true, regexp: true, indent: 4, maxerr: 50 */
/*global $, window, location, CSInterface, SystemPath, themeManager*/

(function () {
	'use strict';

	var csInterface = new CSInterface();
	
	function init() {

		// Ugly workaround to keep track of "checked" and "enabled" statuses
		var checkableMenuItem_isChecked = true;
		var targetMenuItem_isEnabled = true;
		if(sckeystring == "patternA"){			//Reference value.
			var patternA_isChecked = true;		//default choose.
			var patternB_isChecked = false;
			var patternC_isChecked = false;
		}
		var patternA_Label = "ショートカットキーを Function + Shift で採番";
		var patternB_Label = "ショートカットキーを Function + Command で採番";
		var patternC_Label = "ショートカットキーを Function + Shift + Command で採番";
				
		// Flyout menu XML string 
		var flyoutXML = '<Menu> \
							<MenuItem Id="enabledMenuItem" Label="Enabled Menu Item" Enabled="true" Checked="false"/> \
							<MenuItem Id="disabledMenuItem" Label="Disabled Menu Item" Enabled="false" Checked="false"/> \
							\
							<MenuItem Label="---" /> \
							\
							<MenuItem Id="checkableMenuItem" Label="Checkable Menu Item" Enabled="true" Checked="true"/> \
							\
							<MenuItem Label="---" /> \
							\
							<MenuItem Id="actionMenuItem" Label="Click me to enable/disable the Target Menu!" Enabled="true" Checked="false"/> \
							<MenuItem Id="targetMenuItem" Label="Target Menu Item" Enabled="true" Checked="false"/> \
							\
							<MenuItem Label="---" /> \
							\
							<MenuItem Id="patternA" Label="' + patternA_Label.toString() + '" Enabled="false" Checked="true"/> \
							<MenuItem Id="patternB" Label="' + patternB_Label.toString() + '" Enabled="true" Checked="false"/> \
							<MenuItem Id="patternC" Label="' + patternC_Label.toString() + '" Enabled="true" Checked="false"/> \
							\
							<MenuItem Label="---" /> \
							\
							<MenuItem Label="Parent Menu (wont work on PS CC 2014.2.0)"> \
								<MenuItem Label="Child Menu 1"/> \
								<MenuItem Label="Child Menu 2"/> \
							\
							<MenuItem Label="---" /> \
							</MenuItem> \
						</Menu>';

		// Uses the XML string to build the menu
		csInterface.setPanelFlyoutMenu(flyoutXML);

		// Flyout Menu Click Callback
		function flyoutMenuClickedHandler (event) {

			// the event's "data" attribute is an object, which contains "menuId" and "menuName"
			console.dir(event); 
			switch (event.data.menuId) {
				
				case "checkableMenuItem": 
					checkableMenuItem_isChecked = !checkableMenuItem_isChecked;
					csInterface.updatePanelMenuItem("Checkable Menu Item", true, checkableMenuItem_isChecked);
					break;

				case "actionMenuItem": 
					targetMenuItem_isEnabled = !targetMenuItem_isEnabled;
					csInterface.updatePanelMenuItem("Target Menu Item", targetMenuItem_isEnabled, false);
					break;
				//A-B-C menu is Toggled.
				case "patternA":
					patternA_isChecked = !patternA_isChecked;
					csInterface.updatePanelMenuItem(patternA_Label, true, patternA_isChecked);
					if(patternB_isChecked == true || patternC_isChecked == true){
						csInterface.updatePanelMenuItem(patternB_Label, true, false);
						patternB_isChecked = false;
						csInterface.updatePanelMenuItem(patternC_Label, true, false);
						patternC_isChecked = false;
					}
					if(patternA_isChecked == true){
						csInterface.updatePanelMenuItem(patternA_Label, false, true);
					}
					sckeystring = "patternA";
					scrRead();
					break;
				case "patternB":
					patternB_isChecked = !patternB_isChecked;
					csInterface.updatePanelMenuItem(patternB_Label, true, patternB_isChecked);
					if(patternA_isChecked == true || patternC_isChecked == true){
						csInterface.updatePanelMenuItem(patternA_Label, true, false);
						patternA_isChecked = false;
						csInterface.updatePanelMenuItem(patternC_Label, true, false);
						patternC_isChecked = false;
					}
					if(patternB_isChecked == true){
						csInterface.updatePanelMenuItem(patternB_Label, false, true);
					}
					sckeystring = "patternB";
					scrRead();
					break;
				case "patternC":
					patternC_isChecked = !patternC_isChecked;
					csInterface.updatePanelMenuItem(patternC_Label, true, patternC_isChecked);
					if(patternA_isChecked == true || patternB_isChecked == true){
						csInterface.updatePanelMenuItem(patternA_Label, true, false);
						patternA_isChecked = false;
						csInterface.updatePanelMenuItem(patternB_Label, true, false);
						patternB_isChecked = false;
					}
					if(patternC_isChecked == true){
						csInterface.updatePanelMenuItem(patternC_Label, false, true);
					}
					sckeystring = "patternC";
					scrRead();
					break;

				default: 
					//console.log(event.data.menuName + " clicked!");
			}

			//csInterface.evalScript("alert('Clicked!\\n \"" + event.data.menuName + "\"');");
		}

		// Listen for the Flyout menu clicks
		csInterface.addEventListener("com.adobe.csxs.events.flyoutMenuClicked", flyoutMenuClickedHandler);

		themeManager.init();

	}
		
	init();

}());

var csInterface = new CSInterface();
scrRead();

//スクリプトリストを作成する
function scrRead(){
    csInterface.evalScript("userScriptGet()",function(dat){
        console.log(dat)
        var files=dat.split("#");
        var jsxPathList=files[0].split(",");
        var jsxList=files[1].split(",");
        $(".jsx").remove();
        //ここにアクションリストを削除するスクリプトを起動させるキッカーを用意し起動させる。
        csInterface.evalScript('userClearAction()');
        
        //idsを入れる配列を用意する。
        var idsA = [];// ids array
        var gi = jsxList.length;
        
        for(var i=0;i<jsxList.length;i++){
            var ids=jsxList[i].replace(/.jsx/g,"").replace(/\ /g,"")
            $("#jsxList").append($("<option>").attr({
                id:escapeSelectorString(ids),
                //class:"jsx",
                value:jsxPathList[i]
            }).addClass("jsx"));
//            alert(escapeSelectorString(ids) + "     " + (jsxList[i]));
			if(sckeystring == "patternA"){
	            $("#"+escapeSelectorString(ids)).text("F[" + ( i + 1 ) + "] + S " + (jsxList[i]));
            }
            else if(sckeystring == "patternB"){
            	$("#"+escapeSelectorString(ids)).text("F[" + ( i + 1 ) + "] + C " + (jsxList[i]));
            }
            else if(sckeystring == "patternC"){
            	$("#"+escapeSelectorString(ids)).text("F[" + ( i + 1 ) + "] + S + C " + (jsxList[i]));
            }
            $("#"+escapeSelectorString(ids)).attr("ondblclick","scriptPlay('"+jsxPathList[i]+"')");
            //ここにアクションを自動生成するスクリプトを起動させるキッカーを用意して起動させる。
            idsA[i] = ids;
        };
        
        //配列にしたVer + sckeystring
        csInterface.evalScript('userCreateAction("' + idsA + '","' + gi + '","' + sckeystring + '")');
        
    });
        
    //渡すのがスクリプトのパスになるようにする。
    //Fxx + Shift はリスト上から規定の順になるようにすればいい。
//           $("body").keypress( function( event ) {
//				if( event.shiftKey === true){
//					alert( "KyeCode Shift キーが押されました。" );
//				}
//            });

}

//外部スクリプトファイルの実行
function scriptPlay(jsxPath){
    csInterface.evalScript('$.evalFile("' + jsxPath + '")');
}

function escapeSelectorString(trstring){
	//JQuery escape use method chain. for SelectorString to ids.
	return trstring.replace(/[ !"#$%&'()*+,.\/:;<=>?@\[\\\]^`{|}~]/g, "\\$&")
				   .replace(/[\\(]/g,"")
				   .replace(/[\\)]/g,"");
}