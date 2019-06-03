const { app, BrowserWindow, shell, ipcMain, Menu, TouchBar } = require('electron');
const { TouchBarButton, TouchBarLabel, TouchBarSpacer } = TouchBar;

const path = require('path');
const isDev = require('electron-is-dev');

let mainWindow;

createWindow = () => {
	mainWindow = new BrowserWindow({
		backgroundColor: '#F7F7F7',
		minWidth: 480,
		show: false,
		titleBarStyle: 'default',
		webPreferences: {
			nodeIntegration: true,
			preload: __dirname + '/preload.js',
		},
		height: 860,
		width: 1280,
	});

	mainWindow.loadURL(
		isDev
			? 'http://localhost:3001'
			: `file://${path.join(__dirname, '../build/index.html')}`,
	);

	if (isDev) {
		const {
			default: installExtension,
			REACT_DEVELOPER_TOOLS,
			REDUX_DEVTOOLS,
		} = require('electron-devtools-installer');

		installExtension(REACT_DEVELOPER_TOOLS)
			.then(name => {
				console.log(`Added Extension: ${name}`);
			})
			.catch(err => {
				console.log('An error occurred: ', err);
			});

		installExtension(REDUX_DEVTOOLS)
			.then(name => {
				console.log(`Added Extension: ${name}`);
			})
			.catch(err => {
				console.log('An error occurred: ', err);
			});
	}

	mainWindow.once('ready-to-show', () => {
		mainWindow.show();

		ipcMain.on('open-external-window', (event, arg) => {
			shell.openExternal(arg);
		});
	});
};

generateMenu = () => {
	const template = [
		{
			label: 'File',
			submenu: [{ role: 'about' }, { role: 'quit' }],
		},
		// {
		// 	label: 'Edit',
		// 	submenu: [
		// 		{ role: 'undo' },
		// 		{ role: 'redo' },
		// 		{ type: 'separator' },
		// 		{ role: 'cut' },
		// 		{ role: 'copy' },
		// 		{ role: 'paste' },
		// 		{ role: 'pasteandmatchstyle' },
		// 		{ role: 'delete' },
		// 		{ role: 'selectall' },
		// 	],
		// },
		{
			label: 'View',
			submenu: [
				{ role: 'reload' },
				{ role: 'forcereload' },
				{ role: 'toggledevtools' },
				{ type: 'separator' },
				{ role: 'resetzoom' },
				{ role: 'back' },
				{ role: 'zoomin' },
				{ role: 'zoomout' },
				{ type: 'separator' },
				{ role: 'togglefullscreen' },
			],
		},
		{
			role: 'window',
			submenu: [{ role: 'minimize' }, { role: 'close' }],
		},
		{
			role: 'help',
			submenu: [
				{
					click() {
						require('electron').shell.openExternal(
							'https://jumpto365.zendesk.com/hc/en-us/categories/360001116531-General',
						);
					},
					label: 'Learn More',
				},
				{
					click() {
						require('electron').shell.openExternal(
							'https://jumpto365.zendesk.com/hc/en-us/requests/new',
						);
					},
					label: 'File Issue',
				},
			],
		},
	];

	Menu.setApplicationMenu(Menu.buildFromTemplate(template));
};

app.on('ready', () => {
	createWindow();
	generateMenu();
});

app.on('window-all-closed', () => {
	app.quit();
});

app.on('activate', () => {
	if (mainWindow === null) {
		createWindow();
	}
});

ipcMain.on('load-page', (event, arg) => {
	mainWindow.loadURL(arg);
});