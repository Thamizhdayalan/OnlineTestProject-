﻿
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
            //alert(JSON.stringify(result));
            var res = result;
            //alert(res.AdminId >0);
            if (result.length > 0) {

                //alert(mes);
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
            //dataSrc: "",
            data: function (data) {

               
                //Empty()
                alert(JSON.stringify(data));
               return JSON.stringify(data);


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


//function Next() {

//    alert("hi");

//    $.ajax({

//        type: "POST",
//        url: "/OnlineTest/SubjecstDropdown",
//        dataType: 'json',

//        success: function (result) {

//            //alert(JSON.stringify(result));


//            window.location.href = '/OnlineTest/QuestionCreationPage';

//        },

//        error: function () {
//            alert("Dropdown Failed ");
//        }

//    });
//}


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
        SubjectId: document.getElementById('Subjects').value,
        OptionIndex: document.getElementById('IndexA').value,
        OptionText: document.getElementById('Option1').value,
        IsCorrect: (document.getElementById('AnsIndex').value === 'A') // Update logic as needed
    });

    optionsArray.push({
        SubjectId: document.getElementById('Subjects').value,
        OptionIndex: document.getElementById('IndexB').value,
        OptionText: document.getElementById('Option2').value,
        IsCorrect: (document.getElementById('AnsIndex').value === 'B')
    });

    optionsArray.push({
        SubjectId: document.getElementById('Subjects').value,
        OptionIndex: document.getElementById('IndexC').value,
        OptionText: document.getElementById('Option3').value,
        IsCorrect: (document.getElementById('AnsIndex').value === 'C')
    });

    optionsArray.push({
        SubjectId: document.getElementById('Subjects').value,
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

function Create()
{
  
    var testDetails = $("#Createtest").serialize();
    alert(testDetails);

    $.ajax({ 
        
        type   : "POST",
        url    : "/OnlineTest/TestCreation",
        datatype :"json",
        data: testDetails,

        success  : function(result){
            
            if(result == "Success"){
                alert("Test details Stored Successfully");
            }
        },

        error: function () {
            alert("Test details are not Stored Successfully");
        }
        

    })

}

//var testdetails = {
//    TestId: 0,
//    TestName: $("#TestName").val(),
//    Startdate: $("#Startdate").val(),
//    Duration: $("#duration").val(),
//    Expirydate: $("#ExpiryDate").val()
//};

function TestList() {
    
    $("#Testlist").DataTable({
        // Uncomment if needed
         //destroy: true,
        processing: true,
        pagingType: "full_numbers",
        ordering: false,

        ajax: {
            type: "GET",
            contentType: "application/json",  
            url: "/OnlineTest/ListOfTests",
            //datatype: "json",
             
            //dataSrc: "", // Use this if the response is directly an array
            data: function (d) {
                    alert(JSON.stringify(d));
                return JSON.stringify(d);

            },
            

            error: function (xhr, err) {
                alert("readyState: " + xhr.readyState + "\nstatus: " + xhr.status);
                alert("responseText: " + xhr.responseText);
            }

        },

        "columns": [
            { "data": "TestName", "className": "center", "autoWidth": true },
            {
                "data": "CreatedDate",
                render: function (data) {
                    // Convert the /Date(1729189800000)/ format to a Date object
                    var date = new Date(parseInt(data.match(/\/Date\((\d+)\)\//)[1]));
                    // Format the date to dd/mm/yyyy
                    var day = ('0' + date.getDate()).slice(-2);
                    var month = ('0' + (date.getMonth() + 1)).slice(-2); // Months are zero-based
                    var year = date.getFullYear();
                    return day + '/' + month + '/' + year; // Return formatted date
                }
            },

             //{
             //    "data": "Startdate",
             //    "render": function (data) {
             //        return moment(data).format("DD/MM/YYYY");
             //    }, "autowidth": true

             //},

            
             {
                 "data": "Startdate",
                 render: function (data) {
                     // Convert the /Date(1729189800000)/ format to a Date object
                     var date = new Date(parseInt(data.match(/\/Date\((\d+)\)\//)[1]));
                     // Format the date to dd/mm/yyyy
                     var day = ('0' + date.getDate()).slice(-2);
                     var month = ('0' + (date.getMonth() + 1)).slice(-2); // Months are zero-based
                     var year = date.getFullYear();
                     return day + '/' + month + '/' + year; // Return formatted date
                 }
             },
           
            {
                "data": "Duration",
                render: function (data) {
                    // Assuming 'data' is in the format "HH:mm:ss"
                    //var parts = data.split(":");
                    //var hours = parts[0];
                    //var minutes = parts[1];
                    //return JSON.stringify(data);
                    return data.Hours+":"+data.Minutes;//+ ':' + ('0' + minutes).slice(-2); // Format as HH:mm
                }
            },

           //{ "data": "Duration", "className": "center", "autoWidth": true },

            {
                "data": "Expirydate",
                render: function (data) {
                    // Convert the /Date(1729189800000)/ format to a Date object
                    var date = new Date(parseInt(data.match(/\/Date\((\d+)\)\//)[1]));
                    // Format the date to dd/mm/yyyy
                    var day = ('0' + date.getDate()).slice(-2);
                    var month = ('0' + (date.getMonth() + 1)).slice(-2); // Months are zero-based
                    var year = date.getFullYear();
                    return day + '/' + month + '/' + year; // Return formatted date
                }
            },
           
              {
                  
                  mRender: function (data, type, row) {

                      return '<a onclick="EditTest(' + row.TestId + ')" class = "btn btn-danger"  >Edit</a>'
                      //return '<a onclick="EditTest(' + row.TestId + ')" class = "btn btn-danger" data-toggle="modal" data-target="#myModa
                  },
              },
    {
        
        mRender: function (data, type, row) {
            return '<a onclick="DeleteTest (' + row.TestId + ')" class = "btn btn-danger" >DELETE</a>'

        }
    },

        ]
    });
}



function DeleteTest(ID) {

    $.ajax({

        type: "POST",
        url: "/OnlineTest/RemoveTest",
        data: { testid: ID },
        success: function (Result){
            if(Result == "Success"){
                alert("Test Deleted Successfully:");
            }
        },

        error  : function()  {

            alert("Test is not Deleted:");

        }

    })


}

function EditTest(Id) {

   
    $("#testmodify").hide();
    $.ajax({
        
        type   :  "GET",
        url: "/OnlineTest/EditTest",
        data   : {testid:Id},
        datatype: "json",

        success: function (res) {
            alert(JSON.stringify(res));

            var Stdate = new Date(parseInt(res.Startdate.match(/\/Date\((\d+)\)\//)[1]));
            var Stday = ('0' + Stdate.getDate()).slice(-2);
            var Stmonth = ('0' + (Stdate.getMonth() + 1)).slice(-2);
            var Styear = Stdate.getFullYear();
            var startdate = Styear + '-' + Stmonth + '-' + Stday;
            alert(startdate);

            var Exdate = new Date(parseInt(res.Expirydate.match(/\/Date\((\d+)\)\//)[1]));
            var Exday = ('0' + Exdate.getDate()).slice(-2);
            var Exmonth = ('0' + (Exdate.getMonth() + 1)).slice(-2);
            var Exyear = Exdate.getFullYear();
            var expirydate = Exyear + '-' + Exmonth + '-' + Exday;
            alert(expirydate);

            var DURATION = res.Duration.Hours + ":" + res.Duration.Minutes;
            alert(DURATION);
            //this method for, if the we have more than one form but the the id names are same means we should use this method. 
            //in this method we mentioned the id in inside the form id//

            $("#testmodification").find("[name='TestId']").val(res.TestId);
            $("#testmodification").find("[name='TestName']").val(res.TestName);
            $("#testmodification").find("[name='Startdate']").val(startdate);
            $("#testmodification").find("[name='Duration']").val(DURATION);
            $("#testmodification").find("[name='Expirydate']").val(expirydate);
            $("#testmodify").show();

            //this is for javascript//
           //document.getElementById("testmodification").elements["TestId"].value = res.TestId;
           //document.getElementById("testmodification").elements["TestName"].value = res.TestName;
           //document.getElementById("testmodification").elements["Startdate"].value = startdate;
           //document.getElementById("testmodification").elements["Duration"].value = DURATION;
            //document.getElementById("testmodification").elements["Expirydate"].value = expirydate;

            //this method for different id names for more than one form//
            //$("#testid").val(res.TestId);
            //$("#TestName").val(res.TestName);
            //$("#Startdate").val(startdate);
            //$("#Duration").val(DURATION);
            //$("#Expirydate").val(expirydate);
            ////$("#myModal1").modal('show');
           
        },

        error: function (response) {
            alert(response);
        }

    })
}


function Update() {

    var updatetest = $("#testmodification").serialize();
    //var updat = JSON.stringify(updatetest);
    //var update = {
    //    TestId: $('#testid').val(),
    //    TestName: $('#updatetestname').val(),
    //    Startdate: $('#updatestartdate').val(),
    //    Duration: $('#updateduration').val(),
    //    Expirydate: $('#updateExpiryDate').val(),
    //};

    alert(updatetest);

    $.ajax({
        type: "POST",
        url: "/OnlineTest/Update",
        datatype: "json",
        data: updatetest,
        success: function (result) {

            
            if (result.success)
            {
                alert("Test updated successfully: " + result.message);
            }
            else {
                alert("Error: " + result.message);
            }
        },
        error: function (X) {
            alert(JSON.stringify(X));//"An error occurred while trying to update the test.");
        }
    });
}

//$(document).ready(function () {
//    // Initialize DataTable
//    function ViewQuestions(subjectId) {
//        //// Destroy any existing DataTable instance
//        //if ($.fn.dataTable.isDataTable('#Questionlist')) {
//        //    $('#Questionlist').DataTable().clear().destroy();
//        //}

//        // Initialize new DataTable
//        $("#Questionlist").DataTable({
//            "destroy": true,
//            "processing": true,
//            "pagingType": "full_numbers",
//            "ordering": false,
//            ajax: {
//                type: "GET",
//                url: "/OnlineTest/ListOfQuestions",
//                data: function (data) {
//                    data.SUBJECTID = subjectId; // Send the selected SUBJECTID
//                    return data;
//                },
//                dataType: 'json',
//                error: function (xhr, err) {
//                    alert("Error: " + xhr.responseText);
//                }
//            },
//            "columns": [
//                { "data": "SubjectId", "className": "center" },
//                { "data": "QuestionId", "className": "center" },
//                { "data": "QuestionText", "className": "center" },
//                {
//                    "data": "CreatedDate",
//                    "render": function (data) {
//                        return moment(data).format("DD/MM/YYYY");
//                    }
//                },
//                {
//                    "data": null,
//                    "render": function (data, type, row) {
//                        return '<input type="checkbox" class="question-checkbox" value="' + row.QuestionId + '" />';
//                    },
//                    "orderable": false
//                },
//                {
//                    "data": null,
//                    "render": function (data, type, row) {
//                        return '<button onclick="EditQuestion(' + row.QuestionId + ')" class="btn btn-warning">Edit</button>';
//                    },
//                    "orderable": false
//                },
//                {
//                    "data": null,
//                    "render": function (data, type, row) {
//                        return '<button onclick="DeleteQuestion(' + row.QuestionId + ')" class="btn btn-danger">Delete</button>';
//                    },
//                    "orderable": false
//                }
//            ]
//        });
//    }

//    // Handle subject change event
//    $('#Subjects').on('change', function () {
//        var subjectId = $(this).val();
//        if (subjectId) {
//            ViewQuestions(subjectId);
//        }
//    });
//});

$(document).ready(function () {

    var sub = $("#Subjects").val();
    alert(JSON.stringify(sub));
    function ViewQuestions(subjectId) {

        alert(subjectId);

        $("#Questionlist").DataTable({
            "destroy": true,
            "processing": true,
            "pagingtype": "full_numbers",
            "ordering": false,

            ajax: {

                type: "GET",
                contentType: "application/json",
                url: "/OnlineTest/ListOfQuestions",
                dataType: 'json',
                //dataSrc: "",
                data: function (data) {

                    data.SUBJECTID = subjectId;
                    //Empty()
                    alert(JSON.stringify(data));
                    return data;


                },

                error: function (xhr, err) {
                    alert("readyState: " + xhr.readyState + "\nstatus: " + xhr.status);
                    alert("responseText: " + xhr.responseText);
                }

            },

            "columns": [

                { "data": "SubjectId", "className": "center", "autowidth": true },
                 { "data": "QuestionId", "className": "center", "autowidth": true },
                { "data": "QuestionText", "className": "center", "autowidth": true },

                 {
                     "data": "CreatedDate",
                     "render": function (data) {
                         return moment(data).format("DD/MM/YYYY");
                     }, "autowidth": true

                 },

                 {
                     "data": null,
                     "render": function (data, type, row) {
                         return '<input type="checkbox" class="question-checkbox" value="' + row.QuestionId + '" />';
                     },
                     "orderable": false
                 },


               {

                   mRender: function (data, type, row) {

                       return '<a onclick="EditQuestion(' + row.QuestionId + ')" class = "btn btn-warning" >Edit</a>'

                   },
               },
        {

            mRender: function (data, type, row) {
                return '<a onclick="DeleteQuestion (' + row.QuestionId + ')" class = "btn btn-primary" >DELETE</a>'

            }
        },


            ]

        });
    }

    $('#Subjects').on('change', function () {
        var subjectId = $(this).val();
        if (subjectId != 0) {
            ViewQuestions(subjectId);
        }
        else {
            ViewQuestions();
        }

    });
});




function DeleteQuestion(ID) {

    alert(ID);

    $.ajax({

        type: "POST",
        url: "/OnlineTest/RemoveQuestion",
        data: { SUBJETID: ID },
        success: function (Result) {
            if (Result == "Success") {
                alert("Test Deleted Successfully:");
            }
        },

        error: function () {

            alert("Test is not Deleted:");

        }

    })

}

