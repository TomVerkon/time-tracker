import { app, BrowserWindow, screen, Menu, Tray, nativeImage, ipcMain } from 'electron'
import installExtension, { REACT_DEVELOPER_TOOLS } from 'electron-devtools-installer'
import { enableLiveReload } from 'electron-compile'
import path from 'path'

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow
let tray

const isDevMode = process.execPath.match(/[\\/]electron/)

if (isDevMode) enableLiveReload({ strategy: 'react-hmr' })

const setupApplicationTray = (mainWindow) => {
  // Setup the menubar with an icon
  const icon = nativeImage.createFromPath(path.join(__dirname, 'assets/icon32.png'))
  tray = new Tray(icon)

  // Rendering Context Menu based on platform
  let contextMenu
  if (process.platform === 'darwin') {
    contextMenu = Menu.buildFromTemplate([
      {
        label: 'Show timers',
        type: 'normal',
        click: () => {
          showWindow()
        }
      },
      {
        label: 'Quit Application',
        type: 'normal',
        click: () => {
          app.quit()
        }
      }
    ])
  } else {
    contextMenu = Menu.buildFromTemplate([
      {
        label: 'Quit Application',
        type: 'normal',
        click: () => {
          app.quit()
        }
      }
    ])
  }
  tray.setToolTip('Timer')
  tray.setContextMenu(contextMenu)

  // Add a click handler so that when the user clicks on the menubar icon, it shows
  // our popup window
  tray.on('click', (event) => {
    if (process.platform !== 'darwin') {
      toggleWindow()
    } else {
      mainWindow.isVisible() ? mainWindow.hide() : mainWindow.show()
    }

    // Show devtools when command clicked
    if (mainWindow.isVisible() && process.defaultApp && event.metaKey) {
      mainWindow.openDevTools({ mode: 'detach' })
    }
  })
}

const main = async () => {
  // Create the browser window.
  mainWindow = new BrowserWindow({
    width: 300,
    height: 300,
    icon: path.join(__dirname, 'assets/icon32.png'),
    show: false,
    frame: false,
    resizable: false,
    skipTaskbar: true,
  })
  // and load the index.html of the app.
  mainWindow.loadURL(`file://${__dirname}/index.html`)
  // Open the DevTools.
  if (isDevMode) {
    await installExtension(REACT_DEVELOPER_TOOLS)
    mainWindow.openDevTools({ mode: 'detach' })
  }

  // Emitted when the window is closed.
  mainWindow.on('closed', () => {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    mainWindow = null
  })

  mainWindow.on('blur', () => {
    if (isDevMode) {
      return undefined
    }
    mainWindow.hide()
  })

  // Setting up the tray icon, references above function
  setupApplicationTray(mainWindow)
  // IPC  Handlers for local storage file
  require('./storageHandlers')
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', main)

const toggleWindow = () => {
  if (mainWindow.isVisible()) {
    mainWindow.hide()
  } else {
    if (process.platform === 'darwin') {
      mainWindow.show()
    } else {
      showWindow()
    }
  }
}

const showWindow = () => {
  let trayPos = tray.getBounds()
  const windowPos = mainWindow.getBounds()
  let x = 0
  let y = 0

  // Any of these will break if the taskbar is not in a usual position
  // TODO: Figure out how to fix position in weird taskbar locations
  if (process.platform === 'darwin') {
    x = Math.round(trayPos.x + (trayPos.width / 2) - (windowPos.width / 2))
    y = Math.round(trayPos.y + trayPos.height)
  } else if (process.platform === 'linux') {
    trayPos = screen.getCursorScreenPoint()
    x = Math.round(trayPos.x - (windowPos.width / 2))
    y = Math.round(trayPos.y)
  } else {
    x = Math.round(trayPos.x + (trayPos.width / 2) - (windowPos.width / 2))
    // This sets the window just on top of a bottom taskbar
    y = Math.round(trayPos.y - (windowPos.height))
  }

  mainWindow.setPosition(x, y, false)
  mainWindow.show()
  mainWindow.focus()
}

ipcMain.on('show-window', () => {
  showWindow()
})

// Quit when all windows are closed.
app.on('window-all-closed', () => {
  // On OS X it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

// app.on('activate', () => {
//   // On OS X it's common to re-create a window in the app when the
//   // dock icon is clicked and there are no other windows open.
//   if (mainWindow === null) {
//     createWindow()
//   }
// })

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and import them here.
