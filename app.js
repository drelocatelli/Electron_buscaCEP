const { app, BrowserWindow } = require('electron')
const {ipcMain, ipcRenderer} = require('electron')

// electron-reload
// require('electron-reload')(__dirname, {
//     electron: require(`${__dirname}/node_modules/electron`)
// })

//--------------------------

process.env['ELECTRON_DISABLE_SECURITY_WARNINGS'] = 'true';


function changeWindow (path, dimensions, attr) {
    const win = new BrowserWindow({
      width: dimensions.width,
      height: dimensions.height,
      webPreferences: {
        nodeIntegration: true,
        contextIsolation:false,
        enableRemoteModule:true,
        
        devTools: true
      }
    })
  
    win.setMenu(null)
    win.setResizable(false)
    win.loadURL(`file://${__dirname}/${path}`)
}

// recebe cep enviado
let cep;
ipcMain.on('form-values', (event, arg) =>{
    cep = arg
    changeWindow(`result.html?cep=${cep}`, {width:800, height:450})
})

app.whenReady().then(() => {
    changeWindow('index.html', {width:300, height:300})
})
