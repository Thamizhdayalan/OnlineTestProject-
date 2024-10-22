using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using Newtonsoft.Json;

namespace OnlineTestProject
{
    public class DataTableParameters
    {

        public List<DataTableColumn> Columns { get; set; }
        public int Draw { get; set; }
        public int Length { get; set; }
        public List<DataOrder> Order { get; set; }
        public Search Search { get; set; }
        public int Start { get; set; }
        public string TransactionId { get; set; } //Added the purpose of getting additional paramenter 
        public string StartDate { get; set; }
        public string EndDate { get; set; }
        public int IsPaid { get; set; }
        public string Date { get; set; }
        public string FileNumber { get; set; }
        public string selectbutton { get; set; }
        public string CreatedDate { get; set; }
        public string FromDate { get; set; }
        public string ToDate { get; set; }
        public string SelectedValue { get; set; }
        public string Year { get; set; }
        public string Month { get; set; }
        public string Filter { get; set; }
    }

    public class Search
    {
        public bool Regex { get; set; }
        public string Value { get; set; }
    }

    public class DataTableColumn
    {
        public int Data { get; set; }
        public string Name { get; set; }
        public bool Orderable { get; set; }
        public bool Searchable { get; set; }
        public Search Search { get; set; }

    }

    public class DataOrder
    {
        public int Column { get; set; }
        public string Dir { get; set; }


    }

    public class DataTableResultSet1
    {
        /// <summary>Array of records. Each element of the array is itself an array of columns</summary>
        //public List<Dictionary<string, string>> data = new List<Dictionary<string, string>>();

        //public List<AdminEntity> ContainerData = new List<AdminEntity>();

        public List<Subjects> data = new List<Subjects>();

        public List<Subjects> ContainerData = new List<Subjects>();


        /// <summary>value of draw parameter sent by client</summary>
        public int draw;

        /// <summary>filtered record count</summary>
        public int recordsFiltered;

        /// <summary>total record count in resultset</summary>
        public int recordsTotal;

        public string ToJSON()
        {
            return JsonConvert.SerializeObject(this);
        }
    }

    public class DataTableResultSet2
    {
        

        public List<TestTable> data = new List<TestTable>();

        public List<TestTable> ContainerData = new List<TestTable>();


        /// <summary>value of draw parameter sent by client</summary>
        public int draw;

        /// <summary>filtered record count</summary>
        public int recordsFiltered;

        /// <summary>total record count in resultset</summary>
        public int recordsTotal;

        public string ToJSON()
        {
            return JsonConvert.SerializeObject(this);
        }
    }

}
