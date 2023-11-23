import './engine/mp3-engine.js'
import './engine/wav.js'
import './engine/mp3.js'
import './jquery-3.6.0.min.js'
import 'https://cdn.jsdelivr.net/npm/js-base64@3.7.2/base64.min.js'

let name_of_machine = ['旋轉軸', '機械手臂','切削機','工具機','臥式洗床','刀具磨床','車床','磨床','線切割','雷雕機'];
let machine_num = 1;
let name_num=0;
var rec,wave,recBlob;
let color_in = document.getElementById(name_of_machine[name_num]);
let machine_now = name_of_machine[name_num]+machine_num;
let Myelement = document.getElementById(machine_now);
Myelement.focus();
color_in.style.color = 'blue';
const yes = document.getElementById("是");
const no = document.getElementById("否");
const confirm =document.getElementById("確定");
const cancel = document.getElementById("取消");
const last_group = document.getElementById("上一組");
const next_group = document.getElementById("下一組");
const first_group = document.getElementById("第一組");
const last_one = document.getElementById("上一筆");
const next_one = document.getElementById("下一筆");
const first_one = document.getElementById("第一筆");
const store = document.getElementById("暫存");
const upload = document.getElementById("上傳");
const lock = document.getElementById("鎖定");
const last_dot = document.getElementById("上一點");
const next_dot = document.getElementById("下一點");
const record = document.getElementById("紀錄");
const clean = document.getElementById("清除");
const last_page = document.getElementById("上一頁");
const next_page = document.getElementById("下一頁");
const positive = document.getElementById("正");
const negative = document.getElementById("負");

const initial_word = "透過語音指令輸入上一筆、下一筆、第一筆、上一組、下一組、第一組、數字";
const after_word = "透過語音指令輸入是、否";
const after_whole_one = "透過語音指令輸入確認、取消";


function clean_all_command(){
    
    yes.style.color = '#000000';
    no.style.color = '#000000';
    confirm.style.color = '#000000';
    cancel.style.color = '#000000';
    last_group.style.color = '#000000';
    next_group.style.color = '#000000';
    first_group.style.color = '#000000';
    last_one.style.color = '#000000';
    next_one.style.color = '#000000';
    first_one.style.color = '#000000';
    store.style.color = '#000000';
    upload.style.color = '#000000';
    lock.style.color = '#000000';
    last_dot.style.color = '#000000';
    next_dot.style.color = '#000000';
    record.style.color = '#000000';
    clean.style.color = '#000000';
    last_page.style.color = '#000000';
    next_page.style.color = '#000000';
    positive.style.color = '#000000';
    negative.style.color = '#000000';
} 
function getCookie(name)
{ 
const value = "; " + document.cookie; 
const parts = value.split("; " + name + "="); 
if (parts.length == 2)
{
const vlu = parts.pop().split(";").shift(); 
const decode_vlu = decodeURIComponent(vlu) ; 
console.log('decode_vlu') ; 
const replace_vlu = decode_vlu.replace(/[+]/g, ' ');
console.log(replace_vlu)
return replace_vlu ; 
}
else
return '' ;
}
function startRec(){
    rec=null;
	wave=null;
	recBlob=null;
	var newRec=Recorder({
		type:"wav",sampleRate:16000,bitRate:256 //mp3格式，指定采样率hz、比特率kbps，其他参数使用默认配置；注意：是数字的参数必须提供数字，不要用字符串；需要使用的type类型，需提前把格式支持文件加载进来，比如使用wav格式需要提前加载wav.js编码引擎
		,onProcess:function(buffers,powerLevel,bufferDuration,bufferSampleRate,newBufferIdx,asyncEnd){
		}
	});

	
    newRec.open(function()
    { //開始錄音 
        rec=newRec;
        rec.start(); 
    },function(msg,isUserNotAllow){ 
        //用戶拒絕了權限或瀏覽器不支持 
        alert((isUserNotAllow?"用戶拒絕了權限，":"")+"無法錄音:"+msg); }); 
   
	
};

function playRec(){

    //停止錄音，得到了錄音文件blob二進位對象，想幹嘛就幹嘛 
    rec.stop(function(blob,duration){ 
        recBlob=blob;       
        

        console.log(blob);
      
        // a.click(); 
        var fileReader = new FileReader();
        fileReader.readAsText(blob);
        console.log(fileReader);


        console.log("JIJJIHJUHUISHIUHSIHSUI");

        var start = new Date().getTime()
        fileReader.onload = function() {
          
            var indexBase64 =  fileReader.result;
            console.log(indexBase64);
            console.log(fileReader);
            
            console.log("UUUUUUUUUUUU");

            var start_time = new Date().getTime();
            fetch(`./server.php`, {method:"POST", body:blob})
            .then(response => {
                if (response.ok) return response;
                else throw Error(`Server returned ${response.status}: ${response.statusText}`)
            })
            .then(response => {
                console.log(response.text());
                var end = new Date().getTime()
                console.log('cost is', `${end - start}ms`)
                var out = getCookie("test4");
                console.log(out);
                if(out!=""){

                    var result = document.getElementById("result");
                    

                    console.log(out);
                    console.log(typeof(out));

                    out = JSON.parse(out);
                    console.log(out);

                    console.log(name_of_machine);
                    console.log(name_num);
                    console.log(name_of_machine[name_num]);
                    if(out=="下一筆"){

                        
                        clean_all_command();
                        next_one.style.color = 'blue';
                        color_in = document.getElementById(name_of_machine[name_num]);
                        color_in.style.color = '#000000';
                        name_num+=1;
                        if(name_num==10){
                            name_num = 0;
                        }
                        color_in = document.getElementById(name_of_machine[name_num]);
                        color_in.style.color = 'blue';
                        machine_num = 1;
                        machine_now = name_of_machine[name_num]+machine_num;
                        Myelement = document.getElementById(machine_now);
                        Myelement.focus();
                    }
                    else if(out=="上一筆"){
                        
                        clean_all_command();
                        last_one.style.color = 'blue';
                        color_in = document.getElementById(name_of_machine[name_num]);
                        color_in.style.color = '#000000';
                        name_num-=1;
                        if(name_num<0){
                            name_num = 9;
                        }
                        color_in = document.getElementById(name_of_machine[name_num]);
                        color_in.style.color = 'blue';
                        machine_num =1;
                        machine_now = name_of_machine[name_num]+machine_num;
                        Myelement = document.getElementById(machine_now);
                        Myelement.focus();
                    }
                    else if(out=="下一組"){
                       
                        clean_all_command();
                        next_group.style.color = 'blue';
                        machine_num+=1;
                        if(machine_num>2)
                            machine_num=1;
                        machine_now = name_of_machine[name_num]+machine_num;
                        Myelement = document.getElementById(machine_now);
                        Myelement.focus();
                    }
                    else if(out=="上一組"){
                        
                        clean_all_command();
                        last_group.style.color = 'blue';
                        machine_num-=1;
                        if(machine_num<1)
                            machine_num=2;
                        machine_now = name_of_machine[name_num]+machine_num;
                        Myelement = document.getElementById(machine_now);
                        Myelement.focus();
                    }
                    else if(out=="第一組"){
                        
                        clean_all_command();
                        first_group.style.color = 'blue';
                        machine_num=1;

                        machine_now = name_of_machine[name_num]+machine_num;
                        Myelement = document.getElementById(machine_now);
                        Myelement.focus();
                    }
                    else if(out=="第一筆"){
                        
                        clean_all_command();
                        first_one.style.color = 'blue';
                        color_in.style.color = '#000000';
                        name_num=0;
                        color_in = document.getElementById(name_of_machine[name_num]);
                        color_in.style.color = 'blue';
                        machine_num = 1;
                        machine_now = name_of_machine[name_num]+machine_num;
                        Myelement = document.getElementById(machine_now);
                        Myelement.focus();
                    }
                    else if(out=="確定"){
                        
                        clean_all_command();
                        confirm.style.color = 'blue';
                        let give_out = [name_of_machine[name_num]];
                        for(var i=1;i<3;i++){
                            console.log(name_of_machine[name_num]+i);
                            var temp = document.getElementById(name_of_machine[name_num]+i);
                            give_out.push(temp.value);
                            console.log(temp.value);
                        }
                        Myelement.focus();
                        console.log(give_out)
                        $.post("./insert.php", {
                            name:give_out[0],
                            variable1:give_out[1],
                            variable2:give_out[2]
                        }, function(data) {
                            if (data != "") {
                                //alert('We sent Jquery string to PHP : ' + data);
                            }
                        });
                        for(var i=1;i<3;i++){
                            console.log(name_of_machine[name_num]+i);
                            var temp = document.getElementById(name_of_machine[name_num]+i);
                            temp.value="";
                        }
                        machine_num=1;

                        machine_now = name_of_machine[name_num]+machine_num;
                        console.log(machine_now);
                        Myelement = document.getElementById(machine_now);
                        Myelement.focus();
                    }
                    else if(out=="是"){
                        clean_all_command();
                        yes.style.color = 'blue';
                        machine_num+=1;
                        
                        if(machine_num>2){
                            machine_num=2;
                           
                        }
                        machine_now = name_of_machine[name_num]+machine_num;
                        Myelement = document.getElementById(machine_now);
                        Myelement.focus();
                    }
                    else if(out=="否"){
                        
                        clean_all_command();
                        no.style.color = 'blue';
                        Myelement.value="";
                        Myelement.focus();
                    }
                    else if(out=="取消"){
                       
                        clean_all_command();
                        cancel.style.color = 'blue';
                        for(var i=1;i<3;i++){
                            console.log(name_of_machine[name_num]+i);
                            var temp = document.getElementById(name_of_machine[name_num]+i);
                            temp.value="";
                        }
                        machine_num=1;

                        machine_now = name_of_machine[name_num]+machine_num;
                        console.log(machine_now);
                        Myelement = document.getElementById(machine_now);
                        Myelement.focus();
                    }
                    else if(out=="暫存"){
                        clean_all_command();
                        store.style.color = 'blue';
                        Myelement.focus();
                    }
                    else if(out=="上傳"){
                        clean_all_command();
                        upload.style.color = 'blue';
                        Myelement.focus();
                    }
                    else if(out=="鎖定"){
                        clean_all_command();
                        lock.style.color = 'blue';
                        Myelement.focus();
                    }
                    else if(out=="上一點"){
                        clean_all_command();
                        last_dot.style.color = 'blue';
                        Myelement.focus();
                    }
                    else if(out=="下一點"){
                        clean_all_command();
                        next_dot.style.color = 'blue';
                        Myelement.focus();
                    }
                    else if(out=="紀錄"){
                        clean_all_command();
                        record.style.color = 'blue';
                        Myelement.focus();
                    }
                    else if(out=="清除"){
                        clean_all_command();
                        clean.style.color = 'blue';
                        Myelement.focus();
                    }
                    else if(out=="上一頁"){
                        clean_all_command();
                        last_page.style.color = 'blue';
                        Myelement.focus();
                    }
                    else if(out=="下一頁"){
                        clean_all_command();
                        next_page.style.color = 'blue';
                        Myelement.focus();
                    }
                    else if(out=="正"){
                        clean_all_command();
                        positive.style.color = 'blue';
                        Myelement.focus();
                    }
                    else if(out=="負"){
                        clean_all_command();
                        negative.style.color = 'blue';
                        Myelement.focus();
                    }

                    else{
                        if(!isNaN(out) && out[0]!='-')
                            out = '+'+out;
                        
                        clean_all_command();
                        Myelement.value=out;
                        Myelement.focus();
                    }

                    result.value = out;
                    
                }
             



            
            })
            .catch(err => {
                alert(err);
            });


            


            
            
        };
        

        

        },function(msg){ 
            alert("錄音失敗:"+msg); }); 
    };


document.getElementById("myBtnStart").addEventListener("click", startRec);
document.getElementById("myBtnPlay").addEventListener("click", playRec);


		
