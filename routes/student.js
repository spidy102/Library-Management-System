const express = require("express")
const router = express.Router()
const {
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
} = require("../services/student")
const { checkAuthentication } = require("../middleware/auth")

router.route("/issued").get(checkAuthentication, issuedBooks)
router.route("/searchBooks").get(checkAuthentication, searchBooks)
router.route("/brainstorming").get(checkAuthentication, searchBrainstorming)
router.route("/roomSearch").get(checkAuthentication, searchRoom)
router.route("/issueBook").post(checkAuthentication, bookIssue)
router.route("/returnBook").post(checkAuthentication, returnBook)
router.route("/brainstormingBooking").post(checkAuthentication, brainstorming)
router.route("/roomBooking").post(checkAuthentication, roomBook)
router.route("/searchJournals").get(checkAuthentication, searchJournal)
router.route("/getRooms").get(checkAuthentication, getRooms)

module.exports = router
