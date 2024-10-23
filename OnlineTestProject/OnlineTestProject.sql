create table AdminInfo(
AdminId int primary key identity(1,1),
AdminName varchar (100) not null,
EmailId varchar (100) not null,
PhoneNumber bigint not null,
Pass_word varchar(100) not null,
AdminCreatedDate datetime DEFAULT CURRENT_TIMESTAMP,
LastLoginInfo datetime
)


insert into AdminInfo (AdminName,EmailId,PhoneNumber,Pass_word)
values('Tamilarasan','tamilarasan@gmail.com',9940337388,12345678),
('Raja','raja@gmail.com',9940337399,123456789),
('thamizhdayalan','thamizhdayalan@gmail.com',9840401209,987654321);

create table Subjects (
SubjectId int primary key identity (1,1) not null,
Subject varchar (50) not null
)

insert into Subjects(Subject)
values('Asp.Net'),('Java'),('SQL')


ALTER TABLE Subjects
DROP CONSTRAINT [FK__Questions__Subje__52593CB8];

create table Questions(
QuestionId int Primary Key identity(1,1) not null,
SubjectId int ,
QuestionText varchar (500) not null,
CreatedDate date DEFAULT CURRENT_TIMESTAMP not null
)

select * from questions
truncate table questions
drop table questions
insert into Questions(QuestionText)
values ('Which of the following are some common RDBMS in use?'),('What command is used to create a new table in SQL?'),
('Which of the following commands is used to delete a trigger in SQL?'),('Which of the following are types of Unicode character string types in SQL?'), 
('What does BLOB in SQL stand for?'),
('Which of the following datatype is most appropriate for storing a string of up to 255 characters?'),('What happens when no value is inserted in an ENUM list?'),
('What is the range of integers that can be held in the MEDIUMINT datatype of SQL?'),('Which of the following commands is used to delete all rows and free up space from a table?'),
('Which of the following commands are a part of Data Control Language?'),('When is the wildcard in WHERE clause used?'),
('Which of the following is the full form of DDL?'),('Which SQL constraint do we use to set some value to a field whose value has not been added explicitly?'),
('What are rows of a relation known as?'),('During transaction before commit which of the following statements is done automatically in case of shutdown?'),
('Which of the following allows you to uniquely identify a tuple?'),('How many operations are considered to be the most basic SQL operations?'),
('Which of the following matches the definition given below: It is an artificial key that aims to uniquely identify each record'),
('Which of the following commands are used to put a restriction on the number of rows returned from a query?'),('Which of the following are valid logical operators in SQL?')

create table Options( 
OptionId int primary key identity(1,1),
QuestionId int foreign key references Questions (QuestionId) not null,
OptionIndex varchar (5) not null,
OptionText varchar(100) not null,
IsCorrect bit 
)

drop table Options
select * from Questions

select * from Options

truncate table questions

insert into Options(QuestionId,OptionIndex,OptionText)
values (1,'A','Oracle'),(1,'B','MySQL'),(1,'C','HeidiSQL'),(1,'D','All of the above'),
(2,'A','CREATE TABLE'),(2,'B','BUILD TABLE'),(2,'C','GENERATE TABLE'),(2,'D','None of the above'),
(3,'A','DROP'),(3,'B','DELETE'),(3,'C','ALTER'),(3,'D','None of the above'),
(4,'A','nchar'),(4,'B','ntext'),(4,'C','Both A and B'),(4,'D','All of the above'),
(5,'A','Binary Large Objects'),(5,'B','Big Large Objects'),(5,'C','Binary Language for Objects'),(5,'D','All of the above'),
(6,'A','TEXT'),(6,'B','TINY TEXT'),(6,'C','BLOB'),(6,'D','BINARY'),
(7,'A','Nothing happends'),(7,'B','The code will crash'),(7,'C','A blank value is inserted in that case'),(7,'D','None of the above'),
(8,'A','Singned Numbers in the range of 8388608 - 8388607'),(8,'B','UnSingned Numbers in the range of 0 to 16777215'),(8,'C','Both A and B'),(8,'D','None of the above'),
(9,'A','TRUNCATE'),(9,'B','DROP'),(9,'C','DELETE'),(9,'D','ALTER'),
(10,'A','Revoke'),(10,'B','Grant'),(10,'C','Both A and B'),(10,'D','None of the above'),
(11,'A','An Exact match is necessary for a CREATE statement'),(11,'B','An Exact match is not possible in a SELECT statement'),(11,'C','An Exact match is necessary for a SELECT statement'),(11,'D','None of the above'),
(12,'A','Data definition language'),(12,'B','Data derivation language'),(12,'C','Dynamic data language'),(12,'D','Detailed data language'),
(13,'A','UNIQUE'),(13,'B','NOT NULL'),(13,'C','DEFAULT'),(13,'D','CHECK'),
(14,'A','Degree'),(14,'B','Entity'),(14,'C','Tuple'),(14,'D','None'),
(15,'A','Rollback'),(15,'B','Commit'),(15,'C','View'),(15,'D','Flashback'),
(16,'A','SChema'),(16,'B','Attribute'),(16,'C','Super key'),(16,'D','Domain'),
(17,'A','4'),(17,'B','3'),(17,'C','2'),(17,'D','1'),
(18,'A','Primary key'),(18,'B','Foreign key'),(18,'C','Surrogate key'),(18,'D','Composite key'),
(19,'A','LIMIT'),(19,'B','LIKE'),(19,'C','WHERE'),(19,'D','GROUP BY'),
(20,'A','SOME'),(20,'B','ALL'),(20,'C','AND'),(20,'D','All of the above')

ALTER TABLE Options
DROP CONSTRAINT [FK__Options__Questio__7F2BE32F];

create table TestTable (
TestId int primary key identity (1,1) not null,
TestName varchar (100) not null,
CreatedDate date default getdate() not null,
Startdate date not null,
Duration time,
Expirydate date 
)

drop table TestTable

create table TestQuestionsMapping (
TestId int primary key  not null,
QuestionId int not null,
CreatedDate date default CURRENT_TIMESTAMP,
Created_AdminId int 
)


create table UserInfo (
UserId int primary key identity(101,1),
UserName varchar(100) not null,
EmailId varchar(100) not null,
Mobile bigint not null,
Pass_word varchar(50) not null,
Registered_date date default current_timestamp,
Logininfo datetime
)

drop table UserAnswers

create table UserAnswers(
userId int primary key not null,
TestId int,
QuestionId int not null,
AnswerIndex varchar(10) not null,
AnswerText varchar(100) not null
)

create table UserScore(
UserId int primary key not null,
TestId int not null,
Score int 
)


create procedure Adminlogin @Email varchar(100), @Password varchar(100)
as
begin 
select * from AdminInfo
where EmailId = @Email and Pass_word = @Password
end

select * from testtable
select * from Subjects

create procedure savequestions @questiontext varchar (500), @Subject varchar (50)
as
begin 
insert into Subjects(Subject)
values(@Subject)
insert into Questions(QuestionText)
values(@questiontext)
end 

drop procedure storequestions

truncate table questions
create procedure storesubjects @subject varchar(50)
as
begin
insert into Subjects (subject)
values(@subject)
end 

select * from subjects

truncate table subjects


create procedure showsubjects 
as
begin 
select * from Subjects
end

create procedure DeleteSubject @subjectid int
as
begin 
delete from subjects
where subjectid=@subjectid
end

create procedure StoreOptions @QuestionId int, @optionIndex varchar(10), @OptionText varchar (200),@iscorrect bit
as 
begin 
insert into options (Questionid, OptionIndex,optiontext,iscorrect)
values(@QuestionId,@optionIndex,@OptionText,@iscorrect)
end 


select * from options
select * from questions
select * from testtable
select * from subjects
