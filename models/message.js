let connection = require('../config/db');
let moment = require('moment');

class Message {

  constructor (row) {
    this.row = row
  }

  get id () {
    return this.row.id
  }

  get content () {
    return this.row.content
  }

  get created_at () {
    return moment(this.row.created_at)
  }

  static create (content, callb) {
    connection.query('INSERT INTO messages SET content = ?, created_at = ?', [content, new Date()], (err, result) => {
      if (err) throw err
      callb(result)
    })
  }

  static all (cback) {
    connection.query('SELECT * FROM messages', (err, rows) => {
      if(err) throw err
      cback(rows.map((row) => new Message(row)))
    })
  }

  static find (id, calback) {
    connection.query('SELECT * FROM messages WHERE id = ? LIMIT 1', [id], (err, rows) => {
      if(err) throw err
      calback(new Message(rows[0]))
    })
  }

}

module.exports = Message
