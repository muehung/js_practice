	// 1. 按鈕按下觸發監聽事件
	// 2. 抓填入框內的文字，放到ul 待辦事項區
	// 3. 清空填入框
    // 4. 刪除待辦事項 li

$('#btn').click(function() {
    	var inputTxt = $('#inputTxt').val();
    	$('#outPut').append('<li class="list-group-item"><span class="input listData">' + inputTxt + '</span><a class="btn btnDel">X 刪除</a><a class="btn btnEdit"><i class="fa fa-pencil" aria-hidden="true"></i> 編輯</li>');
    	$('#inputTxt').val('');
    }
);

// 4. delete
$('#outPut').on('click','.btnDel',function(){
    // console.log(this);  this === .btnDel
    var thisLi = $(this).parent('li');
    var thisData = thisLi.find('.listData').text();
    var Delete = confirm('Are u sure DELETE ' + thisData +' ?');
    if(Delete === true){
        $(thisLi).remove();
    }
    
});

// 5. edit
$('#outPut').on('click','.btnEdit',function(){
    var thisLi = $(this).parent('li');
    var thisData = thisLi.find('.listData').text();
    // console.log(thisData);
    var editData = prompt('EDIT something',thisData);
    // console.log(editData);
    thisLi.find('.listData').text(editData); 
});

// Save
$('#btnSave').on('click',function(){
    var savePut = $('#outPut').html();
    window.localStorage.setItem('saveData',JSON.stringify(savePut));
});

var storData = JSON.parse(localStorage.getItem('saveData'));

$('#outPut').append(storData);
// JSON.parseHTML('savePut');
// console.log("username = " + localStorage.getItem("saveData[]"));



// 動態綁定事件
// https://api.jquery.com/on/
// `$( "#dataTable tbody" ).on( "click", "tr", function() {
//   console.log( $( this ).text() );
// });`
// 教學
// https://ithelp.ithome.com.tw/articles/10195522


// $(document).ready(function(){
//     localStorage.getItem('saveData');
//     console.log(saveData);
// });


// var getStorage = function(){ 

    // 改成字串
    // var saveData = $('#outPut').toString();
    // var saveData = localStorage.setItem();
    // console.log(saveData);
    // localStorage.setItem(0,saveData);


// };


