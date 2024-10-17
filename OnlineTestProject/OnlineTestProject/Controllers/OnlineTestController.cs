using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using Newtonsoft.Json;

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

                return Json(admin2, message = "Login Successful",JsonRequestBehavior.AllowGet);
            }

            else{
            return Json( message = "Login Failed",JsonRequestBehavior.AllowGet);
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
        public JsonResult ShowSubjects()
        {
            var SubjectList= dbcontext.Subjects1.ToList();
            return Json(SubjectList, JsonRequestBehavior.AllowGet);
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
            List<SelectListItem> Subj= subjectlist.ConvertAll(a => new SelectListItem() { Text = a.Subject.ToString(), Value = a.SubjectId.ToString() }).ToList();
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
        
            dbcontext.StoreOptions(option.QuestionId,option.OptionIndex,option.OptionText,option.IsCorrect);
            dbcontext.SaveChanges();
        }

        
        
        return Json("Success");
    }

    }


}

//var optionsJson = JsonConvert.SerializeObject(OPTIONS);
//        var options = JsonConvert.DeserializeObject<OptionsModel>(optionsJson);