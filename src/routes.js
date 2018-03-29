const { ipcMain } = require('electron')
const storage = require('electron-json-storage')
const axios = require('axios')

// ipc basically seems to be like the event emitters in Meteor.js, I.E. works be magic

ipcMain.on('/get-cookies', (event, data) => {
  event.sender.send('/get-cookies-reply', 'Hello from your electron process!')
})
ipcMain.on('storage-test', (event, data) => {
  axios.get('http://localhost:3000')
    .then((res) => {
      console.log(res.data)
      storage.set('test', { msg: res.data}, (error) => {
        if (error) {
          console.error(error)
        } else {
          storage.get('test', (error, data) => {
            if (error) {
              console.error(error)
            } else {
              event.sender.send('storage-test-reply', data)
            }
          })
        }
      })
    })
  // storage.get('test', (error, data) => {
  //   if (error) {
  //     console.error(error)
  //   } else {
  //     event.sender.send('storage-test-reply', data)
  //   }
  // })
})