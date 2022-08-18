create database if not exists library;
drop table if exists `library`.`brainstorming`;
drop table if exists `library`.`issued`;
drop table if exists `library`.`roombooking`;
drop table if exists `library`.`student`;
drop table if exists `library`.`book`;
drop table if exists `library`.`book1`;
drop table if exists `library`.`journal`;
drop table if exists `library`.`room`;
create table if not exists `library`.`student` (
    `ID` VARCHAR(100) NOT NULL,
    `Name` VARCHAR(100) NOT NULL,
    `Password` varchar(100) NOT NULL,
	PRIMARY KEY (`ID`)
);

create table if not exists `library`.`book` (
    `BID` VARCHAR(100) NOT NULL,
    `BName` VARCHAR(100) NOT NULL,
    `PubName` VARCHAR(100) NOT NULL,
    `count` INT NOT NULL,
    `authors` VARCHAR(100) NOT NULL,
    `subject` VARCHAR(100) NOT NULL,
    PRIMARY KEY (`BID`)
);


create table if not exists `library`.`journal` (
    `JID` VARCHAR(100) NOT NULL,
    `JName` VARCHAR(100) NOT NULL,
    `authors` VARCHAR(100) NOT NULL,
    `PubName` VARCHAR(100) NOT NULL,
    `Subject` VARCHAR(100) NOT NULL,
    `Link` varchar(1000) not null,
    PRIMARY KEY (`JID`)
);
create table if not exists `library`.`brainstorming` (
	`date` date not null,
    `starttime` TIME NOT NULL,
    `EndTime` TIME NOT NULL,
    `ID` VARCHAR(100) NOT NULL,
    PRIMARY KEY (`date`,`starttime`),
	FOREIGN KEY (`ID`) references `library`.`student` (`ID`) ON DELETE CASCADE
);

create table if not exists `library`.`room` (
    `RoomID` VARCHAR(100) NOT NULL,
    PRIMARY KEY (`RoomID`)
);


create table if not exists `library`.`roombooking` (
	`date` date not null,
    `starttime` TIME NOT NULL,
    `EndTime` TIME NOT NULL,
    `RoomID` VARCHAR(100) NOT NULL,
    `ID` VARCHAR(100) NOT NULL,
    PRIMARY KEY (`date`,`starttime`, `RoomID`),
    FOREIGN KEY (`ID`) references `library`.`student` (`ID`) ON DELETE CASCADE,
    FOREIGN KEY (`RoomID`) references `library`.`room` (`RoomID`) ON DELETE CASCADE
);

create table if not exists `library`.`issued` (
    `ID` VARCHAR(100) NOT NULL,
    `BID` VARCHAR(100) NOT NULL,
    `issueDate` DATE NOT NULL,
    `dueDate` DATE NOT NULL,
    `Overdue` tinyint(1) not NULL default 0,
    PRIMARY KEY (`ID`, `BID`),
    FOREIGN KEY (`ID`) references `library`.`student` (`ID`) ON DELETE CASCADE,
    FOREIGN KEY (`BID`) references `library`.`book` (`BID`) ON DELETE CASCADE
);


INSERT INTO `library`.`journal` (`JID`, `JName`, `authors`, `PubName`, `Subject`,`Link`)
VALUES (
        '1',
        'Inherent Tradeoffs in Learning Fair Representations',
        'Han Zhao, Geoffrey J. Gordon',
        'Journal of Machine Learning Research',
        'Machine Learning',
        'https://arxiv.org/abs/1906.08386'
    );
INSERT INTO `library`.`journal` (`JID`, `JName`, `authors`, `PubName`, `Subject`,`Link`)
VALUES (
        '2',
        'Analytically Tractable Hidden-States Inference in Bayesian Neural Networks',
        'Luong-Ha Nguyen, James-A. Goulet',
        'Journal of Machine Learning Research',
        'Machine Learning',
        'https://arxiv.org/abs/2107.03759'
    );
INSERT INTO `library`.`journal` (`JID`, `JName`, `authors`, `PubName`, `Subject`,`Link`)
VALUES (
        '3',
        'Bounds on the recurrence probability in periodically-driven quantum systems',
        'Tanmoy Pandit, Alaina M. Green, C. Huerta Alderete, Norbert M. Linke,  Raam Uzdin',
        'Quantum',
        'Quantum Science',
        'https://arxiv.org/abs/2105.11685'
    );
INSERT INTO `library`.`room` (`RoomID`)
VALUES ('1201');
INSERT INTO `library`.`room` (`RoomID`)
VALUES ('1101');
INSERT INTO `library`.`room` (`RoomID`)
VALUES ('1103');
INSERT INTO `library`.`room` (`RoomID`)
VALUES ('1204');
INSERT INTO `library`.`student` (`ID`, `Name`,`Password`)
VALUES ('S1', 'Chris Rock','123');
INSERT INTO `library`.`student` (`ID`, `Name`,`Password`)
VALUES ('S2', 'Will Smith','123');
INSERT INTO `library`.`student` (`ID`, `Name`,`Password`)
VALUES ('S3', 'Jayda Smith','123');
INSERT INTO `library`.`student` (`ID`, `Name`,`Password`)
VALUES ('S4', 'Jennifer Lawrence','123');
INSERT INTO `library`.`student` (`ID`, `Name`,`Password`)
VALUES ('S5', 'Christopher Nolan','123');
-- INSERT INTO `library`.`teacher` (`ID`, `Name`)
-- VALUES ('T1000', 'Harry Potter');
-- INSERT INTO `library`.`teacher` (`ID`, `Name`)
-- VALUES ('T1001', 'Dua Lipa');
-- INSERT INTO `library`.`teacher` (`ID`, `Name`)
-- VALUES ('T1002', 'Virat Kohli');

-- INSERT INTO `library`.`teacher` (`ID`, `Name`)
-- VALUES ('T1003', 'Lionel Messi');
INSERT INTO `library`.`book` (
		`BID`,
        `BName`,
        `PubName`,
        `count`,
        `authors`,
        `subject`
    )
VALUES (
		'1',
        'Angels and Demons',
        'Corgi',
        '1',
        'Dan Brown',
        'Fiction'
    );
INSERT INTO `library`.`book` (
		`BID`,
        `BName`,
        `PubName`,
        `count`,
        `authors`,
        `subject`
    )
VALUES (
		'2',
        'Sapiens',
        'Vintage',
        '2',
        'Yuval Noah Harrari',
        'Non-Fiction'
    );
INSERT INTO `library`.`book` (
		`BID`,
        `BName`,
        `PubName`,
        `count`,
        `authors`,
        `subject`
    )
VALUES (
		'3',
        'The Metamorphosis',
        'Vinatge',
        '1',
        'Franz Kafka',
        'Fiction'
    );
INSERT INTO `library`.`book` (
		`BID`,
        `BName`,
        `PubName`,
        `count`,
        `authors`,
        `subject`
    )
VALUES (
		'4',
        'DBMS',
        'S.Chand',
        '3',
        'Shaurya',
        'Computer Science'
    );
-- INSERT INTO `library`.`book1` (`BName`, `BID`)
-- VALUES ('Angels and Demons', '1');
-- INSERT INTO `library`.`book1` (`BName`, `BID`)
-- VALUES ('Sapiens', '2');
-- INSERT INTO `library`.`book1` (`BName`, `BID`)
-- VALUES ('The Metamorphosis', '3');
-- INSERT INTO `library`.`book1` (`BName`, `BID`)
-- VALUES ('DBMS', '4');
-- INSERT INTO `library`.`brainstorming` (`date`,`starttime`, `EndTime`, `ID`)
-- VALUES (
--         '2022-04-11','10:00:00',
--         '11:00:00',
--         'S1'
--     );
-- INSERT INTO `library`.`brainstorming` (`date`,`starttime`, `EndTime`, `ID`)
-- VALUES (
--         '2022-04-11','13:00:00',
--         '13:30:00',
--         'S3'
--     );
-- INSERT INTO `library`.`brainstorming` (`date`,`starttime`, `EndTime`, `ID`)
-- VALUES (
--         '2022-04-12','13:00:00',
--         '14:00:00',
--         'S5'
--     );
-- INSERT INTO `library`.`roombooking` (`date`,`starttime`, `EndTime`, `RoomID`, `ID`)
-- VALUES (
--         '2022-04-11','12:00:00',
--         '13:00:00',
--         '1204',
--         'S2'
--     );
-- INSERT INTO `library`.`roombooking` (`date`,`starttime`, `EndTime`, `RoomID`, `ID`)
-- VALUES (
--         '2022-04-11','10:00:00',
--         '10:40:00',
--         '1101',
--         '4'
--     );
-- INSERT INTO `library`.`issued` (`ID`, `BID`, `issueDate`, `dueDate`)
-- VALUES ('3', '1', '2022-04-06', '2022-04-15');
-- INSERT INTO `library`.`issued` (`ID`, `BID`, `issueDate`, `dueDate`)
-- VALUES ('4', '4', '2022-04-05', '2022-04-14');
-- INSERT INTO `library`.`issued` (`ID`, `BID`, `issueDate`, `dueDate`)
-- VALUES ('1002', '3', '2022-04-03', '2022-04-12');

drop procedure if exists library.returnbook;
drop procedure if exists library.issuebook;
drop procedure if exists library.brainstormingbooking;
drop procedure if exists library.roombooking;

DELIMITER $$ 
CREATE DEFINER = `root` @`localhost` PROCEDURE `library`.`ReturnBook`(
    IN BID VARCHAR(100),
    IN BNAME varchar(100),
    IN ID varchar(100)
) COMMENT 'Issue book procedure' BEGIN
DECLARE EX_RETURN_DATE Date;
DECLARE RETURN_DATE Date;
DECLARE due TINYINT(1);
SET RETURN_DATE = curdate();
select duedate into ex_return_date
from issued as i
where i.bid = bid
    and i.id = id;
SELECT overdue into due
from issued as i
where i.bid = bid
    and i.id = id;
start transaction;
delete from issued as i
where i.bid = bid
    and i.id = id;
update book as b
set count = count + 1
where b.bname = bname;
-- if due=1 then
-- select datediff(ex_return_date,return_date)*2;
-- end if;
commit;
END $$ DELIMITER ;

DELIMITER $$ 
CREATE DEFINER = `root`@`localhost` PROCEDURE `library`.`BrainStormingBooking`(
    IN ID VARCHAR(100),
    IN `date` date,
    IN StartTime time,
    IN EndTime time
) BEGIN
DECLARE queryCount INT;
select count(*) into queryCount
from library.brainStorming as b
where b.`date`=`date` and (starttime not between b.starttime and b.endtime
    and endtime not between b.starttime and b.endtime)
    and (
        starttime <= b.starttime
        and endtime >= b.endtime
    );
if queryCount != 0 then
select "The timeslot is already taken, please input another";
else
start transaction;
insert into library.brainstorming value (`date`,starttime, endtime, id);
end if;
commit;
end 
$$ delimiter ;




DELIMITER $$ 
CREATE DEFINER = `root` @`localhost` PROCEDURE `library`.`RoomBooking`(
    IN ID VARCHAR(100),
    IN `date` date,
    IN StartTime time,
    IN EndTime time,
    IN roomID varchar(100)
) BEGIN
DECLARE queryCount INT;
select count(*) into queryCount
from library.roombooking as b
where b.`date`=`date` and (starttime not between b.starttime and b.endtime
    and endtime not between b.starttime and b.endtime)
    and (
        starttime <= b.starttime
        and endtime >= b.endtime
    )
    and b.roomID = roomID;
if queryCount != 0 then
select "The timeslot is already taken, please input another";
else
start transaction;
insert into library.roomBooking value (`date`,starttime, endtime, roomID, id);
end if;
commit;
end $$ delimiter ;

select * from LIBRARY.student;


DELIMITER $$ 
CREATE DEFINER = `root`@`localhost` PROCEDURE `library`.`IssueBook`
(IN BID VARCHAR(100),
IN BNAME varchar(100),
IN ID varchar(100)) 
BEGIN
DECLARE bookCount int;
DECLARE ISSUE_DATE Date;
DECLARE RETURN_DATE Date;
SET ISSUE_DATE = curdate();
SET RETURN_DATE = ISSUE_DATE + INTERVAL 15 DAY;
select count into bookCount
from book as b
where b.bname = bname;
start transaction;
if bookCount > 0 then
insert into issued
values (ID, BID, ISSUE_DATE, RETURN_DATE, false);
update book as b
set count = count -1
where b.bname = bname;
else
select 'No book available to issue';
end if;
commit;
END $$ DELIMITER ;