
$(document).ready(function() {
    $('#Loginform').on('submit', function (e) {
        //alert(JSON.stringify(e));
    
    e.preventDefault();
     
    var EMAIL = $("#Email").val();
    var PWD = $("#pwd").val();

    $.ajax({ 
        type: "POST",
        url : "/OnlineTest/AdminLogin",
        data: {  email:EMAIL , pwd :PWD },

        success: function(result,mes){
            alert(JSON.stringify(result));
            var res = result;
            alert(res.AdminId >0);
            if (result.length > 0) {

                alert(mes);
                window.location.href = '/OnlineTest/QuestionCreation';
            }
            else {
                alert("loginFailed");

            }
           
        },

        error: function(){
            alert("Error");
        }
    });
});
});

function SaveSub() {

    //var ques = $("#Question").val();

    //var formData = $("#subjects").serialize();
    var Sub =
        { SubjectId : 0,
        Subject  : $("#subjects").val()
            }
    alert(Sub);

    $.ajax({

        type: "POST",
        url: "/OnlineTest/SaveSubjetcs",
        data: JSON.stringify(Sub),
        contentType: "application/json",
        dataType: "json",


        success: function (result) {

            //alert(JSON.stringify(result));
            if (result == "success") {
                alert("subject saved successfully");
                ListofSubjects()

            }
        },

        error: function () {
            alert("question is not stored");
        }

    });

}

$(document).ready(function() {
    ListofSubjects();
});

function ListofSubjects() {

    $("#sub").DataTable({
        "destroy": true,
        "processing": true,
        "pagingtype": "full_numbers",
        "ordering": false,

        ajax: {

            type: "GET",
            contentType: "application/json",
            url: "/OnlineTest/ShowSubjects",
            dataSrc: "",
            data: function (d) {

               
                //Empty()
                return JSON.stringify(d);


            },

            error: function (xhr, err) {
                alert("readyState: " + xhr.readyState + "\nstatus: " + xhr.status);
                alert("responseText: " + xhr.responseText);
            }

        },

        "columns": [

            { "data": "SubjectId","className": "center", "autowidth": true },
            { "data": "Subject", "className": "center", "autowidth": true },

           {

               mRender: function (data, type, row) {

                   return '<a onclick="EditSubject(' + row.SubjectId + ')" class = "btn btn-danger" >Edit</a>'

               },
           },
    {

        mRender: function (data, type, row) {
            return '<a onclick="DeleteSubject (' + row.SubjectId + ')" class = "btn btn-danger" >DELETE</a>'

        }
    },


        ]

    });
}


function EditSubject(id) {
    alert(id);

}


function DeleteSubject(id) {
    alert(id);

    $.ajax({

        type: "POST",
        url: "/OnlineTest/RemoveSubject",
        data: { SUBID: id },

        success: function (result) {

            //alert(JSON.stringify(result));
            if (result == "Success") {
                alert("subject deleted successfully");
                ListofSubjects()

            }
        },

        error: function () {
            alert("subject is not deleted ");
        }

    });

}


function Next() {

    alert("hi");

    $.ajax({

        type: "POST",
        url: "/OnlineTest/SubjecstDropdown",
        dataType: 'json',

        success: function (result) {

            //alert(JSON.stringify(result));


            window.location.href = '/OnlineTest/QuestionCreationPage';

        },

        error: function () {
            alert("Dropdown Failed ");
        }

    });
}


//function Submit() {

//    var Ques = {
//        QuestionId: 0,
//        SubjectId: 0,
//        QuestionText: $("#Question").val()
//    };

//    var Question = JSON.stringify(Ques);

//    var IndA = document.getElementById('IndexA').value;
//    var Opt1 = document.getElementById('Option1').value;
//    var IndB = document.getElementById('IndexB').value;
//    var Opt2 = document.getElementById('Option2').value;
//    var IndC = document.getElementById('IndexC').value;
//    var Opt3 = document.getElementById('Option3').value;
//    var IndD = document.getElementById('IndexD').value;
//    var Opt4 = document.getElementById('Option4').value;
//    var ansInd = document.getElementById('AnsIndex').value;
//    var ans = document.getElementById('Answer').value;
    
   
    
//    //var Opt1 = $("#Options").serialize();
//    //var Opt1 = JSON.stringify(Opt);

//    var Option1 = [];

//    var Option2 = {};

//    Option2.INDA = IndA;
//    Option2.OPT1 = Opt1;
//    Option2.INDB = IndB;
//    Option2.OPT2 = Opt2;
//    Option2.INDC = IndC;
//    Option2.OPT3 = Opt3;
//    Option2.INDD = IndD;
//    Option2.OPT4 = Opt4;
//    Option2.ANSIND = ansInd;
//    Option2.ANS = ans;
    

//    alert(JSON.stringify(Option2));

//    Option1.push(Option2);
//    var Option3 = JSON.stringify(Option1);
//    //var Option3 = JSON.stringify({ OptionDetails: Option1 });
   
//    alert(Option3);

//    $.ajax({

//        type: "POST",
//        url: "/OnlineTest/StoreQuestions",
//        datatype: "json",
//        data: { QUESTION: Question, OPTIONS: Option3 },
//            success: function (Result) {

//                if (Result == "Success") {
//                    alert("Question and Options saved successfully");
//                }
//            },


//            error: function () {

//                alert("Question and Options Are Not Stored");
//            }

//        })
//    }



function Submit() {
    var Ques = {
        QuestionId: 0,
        SubjectId: $("#Subjects").val(),
        QuestionText: $("#Question").val()
    };

    var Question = JSON.stringify(Ques);

    // Create an array to hold options
    var optionsArray = [];

    // Collecting options based on the input fields
    optionsArray.push({
        //QuestionId: documnet.getElementById('Question').value,
        OptionIndex: document.getElementById('IndexA').value,
        OptionText: document.getElementById('Option1').value,
        IsCorrect: (document.getElementById('AnsIndex').value === 'A') // Update logic as needed
    });

    optionsArray.push({
        //QuestionId: documnet.getElementById('Question').value,
        OptionIndex: document.getElementById('IndexB').value,
        OptionText: document.getElementById('Option2').value,
        IsCorrect: (document.getElementById('AnsIndex').value === 'B')
    });

    optionsArray.push({
        //QuestionId: documnet.getElementById('Question').value,
        OptionIndex: document.getElementById('IndexC').value,
        OptionText: document.getElementById('Option3').value,
        IsCorrect: (document.getElementById('AnsIndex').value === 'C')
    });

    optionsArray.push({
        //QuestionId: documnet.getElementById('Question').value,
        OptionIndex: document.getElementById('IndexD').value,
        OptionText: document.getElementById('Option4').value,
        IsCorrect: (document.getElementById('AnsIndex').value === 'D')
    });

    // Convert the options array to JSON
    var Option3 = JSON.stringify(optionsArray);

    $.ajax({
        type: "POST",
        url: "/OnlineTest/StoreQuestions",
        datatype: "json",
        data: { QUESTION: Question, OPTIONS: Option3 },
        success: function (Result) {
            if (Result == "Success") {
                alert("Question and Options saved successfully");
            }
        },
        error: function () {
            alert("Question and Options Are Not Stored");
        }
    });
}



