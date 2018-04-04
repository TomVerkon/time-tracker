const { ipcMain } = require('electron')
const storage = require('electron-json-storage')

// ipc basically seems to be like the event emitters in Meteor.js, I.E. works be magic
ipcMain.on('fetch-timers', (event, data) => {
  const file = `${data._createdBy}-timers`
  storage.get(file, (error, timers) => {
    if (error) {
      console.log(error)
    } else {
      event.sender.send('fetch-timers-success', timers)
    }
  })
})
ipcMain.on('store-timer', (event, data) => {
  const file = `${data._createdBy}-timers`
  // Nullifying UI state properties
  // TODO: make it possible to sync timer states across devices
  data.timer.interval = null
  data.timer.timerActive = false
  // First we check if there's a storage file already
  storage.get(file, (error, existingData) => {
    if (error) {
      console.error(error)
    } else if (existingData) {
      if (existingData[0] == undefined) {
        // If there's no data stored already
        storage.set(file, [data.timer], (storageError) => {
          if (error) {
            // TODO: Add error handler to front end liek the Application Modal
            event.sender.send('timers-stored-failure', storageError)
          }
        })
      } else {
        // If there IS existing stored data
        existingData[data.index] = data.timer
        storage.set(file, [...existingData], (err) => {
          if (err) {
            event.sender.send('timers-stored-failure', err)
          }
        })
      }
    }
  })
})
ipcMain.on('add-timer', (event, data) => {
  const file = `${data._createdBy}-timers`
  storage.get(file, (readError, existingData) => {
    if (readError) {
      event.sender.send('timers-read-failure', readError)
    } else if (existingData[0] == undefined) {
      storage.set(file, [data.timer], (writeError) => {
        if (writeError) {
          event.sender.send('timers-stored-failure', { error: writeError })
        } else {
          storage.get(file, (error, storedTimers) => {
            event.sender.send('add-timer-success', { msg: 'Stored Successfully' })
          })
        }
      })
    } else {
      storage.set(file, [...existingData, data.timer], (writeError) => {
        if (writeError) {
          event.sender.send('timers-stored-failure', writeError)
        } else {
          storage.get(file, (error, storedTimers) => {
            event.sender.send('add-timer-success', { msg: 'Stored Successfully', storedTimers })
          })
        }
      })
    }
  })
})

ipcMain.on('delete-timer', (event, data) => {
  const file = `${data._createdBy}-timers`
  storage.get(file, (error, existingData) => {
    if (error) {
      event.sender.send('timers-read-failure', { msg: 'Error reading storage', error })
    } else {
      existingData.splice(data.index, 1)
      storage.set(file, [...existingData], (writeError) => {
        if (writeError) {
          event.sender.send('timers-stored-failure', { msg: 'Error deleting timer', writeError })
        } else {
          event.sender.send('delete-timer-success', { msg: 'Timer has been Deleted' })
        }
      })
    }
  })
})
