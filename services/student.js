const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")

// Sign up service
const issuedBooks = (req, res, next) => {
  let query = `
        SELECT * FROM LIBRARY.ISSUED NATURAL JOIN LIBRARY.BOOK WHERE ID="${req.user.id}";
    `
  db.query(query, (err, response) => {
    if (err) {
      return res.status(404).json({
        success: false,
        message: "Internal server error, please try again later.",
      })
    }
    return res.status(200).json({
      success: true,
      result: response,
    })
  })
}

const searchBooks = (req, res, next) => {
  const { keyword } = req.query
  let query
  if (keyword.length === 0) {
    query = `select b.BName as BName,b.PubName as PubName,b.count as count,b.subject as subject,b.BID as BID,b.authors as authors from library.book as b left join library.issued as i on i.id="${req.user.id}" where b.bid!=i.bid or i.bid is null;`
  } else {
    query = `select b.BName as BName,b.PubName as PubName,b.count as count,b.subject as subject,b.BID as BID,b.authors as authors from library.book as b left join library.issued as i on i.id="2019B3A70459P" where (b.bid!=i.bid or i.bid is null) and BName like "%${keyword}%";`
  }
  db.query(query, (err, response) => {
    if (err) {
      console.log(err)
      return res.status(404).json({
        success: false,
        message: "Internal server error, please try again later.",
      })
    }
    return res.status(200).json({
      success: true,
      result: response,
    })
  })
}

const searchBrainstorming = (req, res, next) => {
  const { date } = req.query
  let query = `select starttime,endtime from library.brainstorming where date="${date}"`
  db.query(query, (err, response) => {
    if (err) {
      return res.status(404).json({
        success: false,
        message: "Internal server error, please try again later.",
      })
    }
    return res.status(200).json({
      success: true,
      result: response,
    })
  })
}

const searchRoom = (req, res, next) => {
  const { room, date } = req.query
  let query = `select starttime,endtime from library.roombooking where date="${date}" and roomID="${room}"`
  db.query(query, (err, response) => {
    if (err) {
      return res.status(404).json({
        success: false,
        message: "Internal server error, please try again later.",
      })
    }
    return res.status(200).json({
      success: true,
      result: response,
    })
  })
}

const bookIssue = (req, res, next) => {
  let query = `
        call library.issuebook("${req.body.bid}","${req.body.bname}","${req.user.id}");
    `
  db.query(query, (err, response) => {
    if (err) {
      console.log(err)
      return res.status(404).json({
        success: false,
        message: "Internal server error, please try again later.",
      })
    }
    if (response[0] && response[0][0] && Object.keys(response[0][0])) {
      return res.status(400).json({
        success: false,
        message: Object.keys(response[0][0])[0],
      })
    }
    return res.status(200).json({
      success: true,
      message: "Book issued successfully",
    })
  })
}

const returnBook = (req, res, next) => {
  let query = `
          call library.returnbook("${req.body.bid}","${req.body.bname}","${req.user.id}");
      `
  console.log("hello")
  db.query(query, (err, response) => {
    if (err) {
      console.log(err)
      return res.status(404).json({
        success: false,
        message: "Internal server error, please try again later.",
      })
    }
    return res.status(200).json({
      success: true,
      message: "Book returned successfully",
    })
  })
}

const brainstorming = (req, res, next) => {
  if (
    new Date(`${req.body.date} ${req.body.starttime}`) >=
    new Date(`${req.body.date} ${req.body.endtime}`)
  ) {
    return res.status(400).json({
      message: "End time should be greater than start time",
      success: false,
    })
  }
  let query = `
            call library.brainstormingbooking("${req.user.id}","${req.body.date}","${req.body.starttime}","${req.body.endtime}");
        `
  db.query(query, (err, response) => {
    if (err) {
      console.log(err)
      return res.status(404).json({
        success: false,
        message: "Internal server error, please try again later.",
      })
    }
    if (response[0] && response[0][0] && Object.keys(response[0][0])) {
      return res.status(400).json({
        success: false,
        message: Object.keys(response[0][0])[0],
      })
    }
    return res.status(200).json({
      success: true,
      message: "Booking successful",
    })
  })
}

const roomBook = (req, res, next) => {
  if (
    new Date(`${req.body.date} ${req.body.starttime}`) >=
    new Date(`${req.body.date} ${req.body.endtime}`)
  ) {
    return res.status(400).json({
      message: "End time should be greater than start time",
      success: false,
    })
  }
  let query = `
              call library.roombooking("${req.user.id}","${req.body.date}","${req.body.starttime}","${req.body.endtime}","${req.body.roomID}");
          `
  db.query(query, (err, response) => {
    if (err) {
      console.log(err)
      return res.status(404).json({
        success: false,
        message: "Internal server error, please try again later.",
      })
    }
    if (response[0] && response[0][0] && Object.keys(response[0][0])) {
      return res.status(400).json({
        success: false,
        message: Object.keys(response[0][0])[0],
      })
    }
    return res.status(200).json({
      success: true,
      message: "Booking successful",
    })
  })
}

const searchJournal = (req, res, next) => {
  const { keyword } = req.query
  let query
  if (keyword.length === 0) {
    query = `
    select * from LIBRARY.JOURNAL;
    `
  } else {
    query = `select * from library.journal where jname like "%${keyword}%"`
  }
  db.query(query, (err, response) => {
    if (err) {
      console.log(err)
      return res.status(404).json({
        success: false,
        message: "Internal server error, please try again later.",
      })
    }
    return res.status(200).json({
      success: true,
      result: response,
    })
  })
}

const getRooms = (req, res, next) => {
  let query = `select * from library.room`
  db.query(query, (err, response) => {
    if (err) {
      return res.status(404).json({
        success: false,
        message: "Internal server error, please try again later.",
      })
    }
    return res.status(200).json({
      success: true,
      result: response,
    })
  })
}

module.exports = {
  issuedBooks,
  searchBooks,
  searchBrainstorming,
  searchRoom,
  bookIssue,
  returnBook,
  brainstorming,
  roomBook,
  searchJournal,
  getRooms,
}
