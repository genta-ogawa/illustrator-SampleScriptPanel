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
            $("#"+escapeSelectorString(ids)).text("S + F[" + ( i + 1 ) + "] " + (jsxList[i]));
            $("#"+escapeSelectorString(ids)).attr("ondblclick","scriptPlay('"+jsxPathList[i]+"')");
            //ここにアクションを自動生成するスクリプトを起動させるキッカーを用意して起動させる。
            idsA[i] = ids;
        };
        
        //配列にしたVer
        csInterface.evalScript('userCreateAction("' + idsA + '","' + gi + '")');
        
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
