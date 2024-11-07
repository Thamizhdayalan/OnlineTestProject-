//using System;
//using System.Collections.Generic;
//using System.IO;
//using System.Linq;
//using System.Web;
//using System.Web.Mvc;
//using Newtonsoft.Json;
//using System.Collections.Concurrent;
//using System.Collections;
//using System.Data.SqlClient;
//using System.Configuration;
//using System.Data;
//
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using Newtonsoft.Json;
using System.Data.SqlClient;
using System.Configuration;
using System.Data;
using OnlineTestProject.Models;
using System.Collections.Concurrent;
using System.Collections;
using System.Data.OleDb;
using System.Web.Security;
using OnlineTestProject.Controllers;
namespace OnlineTestProject.Controllers
{
    public class OnlineTestController : Controller
    {
        //
        // GET: /OnlineTest/

        public ActionResult OnlineTestView()
        {

            return View();

        }


        OnlineTestProjectEntities dbcontext = new OnlineTestProjectEntities();

        public JsonResult AdminLogin(string email, string pwd)
        {

            //var admin = dbcontext.AdminInfoes.FirstOrDefault(a => a.EmailId == email && a.Pass_word == pwd);
            var admin2 = dbcontext.Adminlogin(email, pwd).FirstOrDefault(a => a.EmailId == email && a.Pass_word == pwd);

            var message = "";
            if (admin2.AdminId > 0)
            {

                return Json(admin2, message = "Login Successful", JsonRequestBehavior.AllowGet);
            }

            else
            {
                return Json(message = "Login Failed", JsonRequestBehavior.AllowGet);
            }


        }

        public ActionResult QuestionCreation()
        {
            return View();
        }


        //this method used storeprocedure//
        //public JsonResult SaveSubjetcs(string SUB)
        //{

        //    dbcontext.storesubjects(SUB);
        //    return Json("success");
        //}

        //this method used to get values from table//
        public JsonResult SaveSubjetcs(Subjects formData)
        {

            dbcontext.Subjects1.Add(formData);
            dbcontext.SaveChanges();
            return Json("success");

        }

        //this method is used storeprocedure to show subjects//
        //public JsonResult ShowSubjects()
        //{
        //    var SubjectList = dbcontext.showsubjects().ToList();
        //    return Json(SubjectList, JsonRequestBehavior.AllowGet);
        //}

        //this method is used table to show subjects//
        //public JsonResult ShowSubjects()
        //{
        //    var SubjectList = dbcontext.Subjects1.ToList();
        //    return Json(SubjectList, JsonRequestBehavior.AllowGet);
        //}


        ////this method is used table to show subjects using Datatable parameters. this is effective method. always use this method to show a list 
        //from database //

        public JsonResult ShowSubjects(DataTableParameters dT)
        {


            var SubjectList1 = new DataTableResultSet_SubjectList();
            SubjectList1.draw = dT.Draw;
            List<Subjects> SubjectList2 = dbcontext.Subjects1.ToList();
            SubjectList1.recordsTotal = SubjectList2.Count;
            SubjectList1.recordsFiltered = SubjectList2.Count;
            SubjectList1.data = SubjectList2;
            return Json(SubjectList1, JsonRequestBehavior.AllowGet);
        }


        //this method is used storeprocedure to delete a subject//
        //public JsonResult RemoveSubject(int SUBID)
        //{
        //    dbcontext.DeleteSubject(SUBID);

        //    return Json("Success");

        //}

        //this method is used table to delete a subject///
        public JsonResult RemoveSubject(int SUBID)
        {

            var del = dbcontext.Subjects1.Find(SUBID);
            dbcontext.Subjects1.Remove(del);
            dbcontext.SaveChanges();
            return Json("Success");

        }



        public ActionResult SubjecstDropdown()
        {
            var subjectlist = dbcontext.Subjects1.ToList();
            List<SelectListItem> Subj = subjectlist.ConvertAll(a => new SelectListItem() { Text = a.Subject.ToString(), Value = a.SubjectId.ToString() }).ToList();
            ViewData["Subject"] = Subj;
            //return Json(subjectlist, JsonRequestBehavior.AllowGet);
            return View("QuestionCreationPage");

        }

        //public JsonResult StoreQuestions(string QUESTION, string OPTIONS)
        //{
        //    //dbcontext.Questions.Add(QUESTION);
        //    //dbcontext.Options.Add(Options);
        //    //var questions1 = JsonConvert.SerializeObject(QUESTION);

        //    var questions1 = JsonConvert.DeserializeObject<Question>(QUESTION);

        //    optionlist = JsonConvert.DeserializeObject<List<Option>>(OPTIONS);
        //    dbcontext.Questions.Add(questions1);
        //    //dbcontext.Options.AddRange(options2);

        //    foreach (var option in optionlist)
        //    {
        //        dbcontext.Options.Add(option);
        //    }

        //    dbcontext.SaveChanges();
        //    return Json("Success");

        //}


        public JsonResult StoreQuestions(string QUESTION, string OPTIONS)
        {

            var questions1 = JsonConvert.DeserializeObject<Question>(QUESTION);
            questions1.CreatedDate = DateTime.UtcNow;
            dbcontext.Questions.Add(questions1);
            dbcontext.SaveChanges();

            var quesid = questions1.QuestionId;

            var optionlist = JsonConvert.DeserializeObject<List<Option>>(OPTIONS);


            //optionlist.Add(quesid);

            //this method is direct table method////
            //foreach (var option in optionlist)
            //{
            //    //option.Question = questions1;
            //    option.QuestionId = quesid; // Bind QuestionId to the option
            //    dbcontext.Options.Add(option); // Add option to the context
            //    dbcontext.SaveChanges();
            //}


            //this method is storeprocedure method////
            foreach (var option in optionlist)
            {
                //option.Question = questions1;
                option.QuestionId = quesid; // Bind QuestionId to the option

                dbcontext.StoreOptions1(option.SubjectId,option.QuestionId, option.OptionIndex, option.OptionText, option.IsCorrect);
                dbcontext.SaveChanges();
            }



            return Json("Success");
        }


        public ActionResult TestCreationPage()
        {
            return View();
        }


        public JsonResult TestCreation(TestTable Details)
        {
            //var Details = JsonConvert.DeserializeObject<TestTable>(TESTDETAILS);
            Details.CreatedDate = DateTime.UtcNow;

            if (Details.Startdate >= Details.Expirydate)
            {
                return Json("Start date must be earlier than Expiry date.");
            }
            dbcontext.TestTables.Add(Details);
            dbcontext.SaveChanges();

            return Json("Success");

        }

        public JsonResult ListOfTests(DataTableParameters dT)
        {
            //var QuesList = dbcontext.TestTables.ToList();
            var QuesList1 = new DataTableResultSet_TestTableList();
            QuesList1.draw = dT.Draw;
            var QuesList2 = dbcontext.TestTables.ToList();
            QuesList1.recordsTotal = QuesList2.Count;
            QuesList1.recordsFiltered = QuesList2.Count;
            QuesList1.data = QuesList2;
            return Json(QuesList1, JsonRequestBehavior.AllowGet);
        }

        /// this is also one of the method to convert date and time format to jq datatable but this is unwanted code because 
        /// we can change date and time in javascript itself and compare with this method and javascript, javascript is effective and fast
        /// in this method we directly changed the date and time into string and  sent to javascript as string://///////

        //public JsonResult QuestionList()
        //{

        //var QuesList = dbcontext.TestTables.ToList().Select(q => new
        //{
        //    q.TestId,
        //    q.TestName,
        //    CreatedDate = q.CreatedDate.ToString("yyyy-MM-ddTHH:mm:ss"),
        //    Startdate = q.Startdate.ToString("yyyy-MM-ddTHH:mm:ss"),
        //    Duration = q.Duration.HasValue ? q.Duration.Value.ToString() : null,
        //    Expirydate = q.Expirydate.HasValue ? q.Expirydate.Value.ToString("yyyy-MM-ddTHH:mm:ss") : null
        //}).ToList();

        //    //return Json(QuesList, JsonRequestBehavior.AllowGet);
        //}


        public JsonResult RemoveTest(int testid)
        {

            var del = dbcontext.TestTables.Find(testid);
            dbcontext.TestTables.Remove(del);
            dbcontext.SaveChanges();
            //COMMIT NOW
            return Json("Success");



        }

        public JsonResult EditTest(int testid)
        {

            var edit = dbcontext.TestTables.Find(testid);
            return Json(edit, JsonRequestBehavior.AllowGet);

        }


        [HttpPost]
        public JsonResult Update(TestTable upd)
        {
            //var Update1 = JsonConvert.DeserializeObject<TestTable>(upd);
            var update = dbcontext.TestTables.Find(upd.TestId);

            update.TestId = upd.TestId;
            update.TestName = upd.TestName;
            update.Startdate = upd.Startdate;
            update.Duration = upd.Duration;
            update.Expirydate = upd.Expirydate;

            if (update == null)
            {
                return Json(new { success = false, message = "Test not found." }, JsonRequestBehavior.AllowGet);
            }

            dbcontext.Entry(update).State = EntityState.Modified; // Set the state to Modified
            dbcontext.SaveChanges();

            return Json(new { success = true, message = "Success" }, JsonRequestBehavior.AllowGet);

        }

        [HttpGet]
        public JsonResult ListOfQuestions(DataTableParameters dT)
        {

            var QuesListObj = new DataTableResultSet_QuestionList();
            QuesListObj.draw = dT.Draw;
            var ShowQuestions = dbcontext.QuestionList().ToList();
            QuesListObj.recordsTotal = ShowQuestions.Count;
            QuesListObj.recordsFiltered = ShowQuestions.Count;
            QuesListObj.data = ShowQuestions.ToList();
            //string x = JsonConvert.SerializeObject(QuesListObj);
            return Json(QuesListObj, JsonRequestBehavior.AllowGet);
        }


        public JsonResult RemoveQuestion(int SUBJETID)
        {

            var del = dbcontext.Questions.Find(SUBJETID);
            dbcontext.Questions.Remove(del);
            dbcontext.SaveChanges();
            //COMMIT NOW
            return Json("Success");

        }
    }
}

//this method is used storeprocedure to show subjects//
//public JsonResult ShowSubjects()
//{
//    var SubjectList = dbcontext.showsubjects().ToList();
//    return Json(SubjectList, JsonRequestBehavior.AllowGet);
//}

