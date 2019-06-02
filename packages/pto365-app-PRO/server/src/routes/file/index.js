const config    = require('../../config')
const Multi = require('multi-rest');
const uuid = require('uuid');

var upload_disk = new Multi({
    driver: {
        type: 'local',
        path: "./uploads/"
    },
    filename: (name) => { // the extention will be added automaticlly 
        return uuid.v4();
    },
    filefields: {
        video: {
            type: 'video',
            thumbnail: {
                width: 100,
                time: ['10%'],
                count: 1
            },
            required: false,
            extensions: ['mp4']
        },
        image: {
            type: 'picture',
            thumbnail: {
                width: 400,
                height: 300
            },
            required: false,
            extensions: ['png', 'jpg']
        }
    }
});

module.exports = (server) => {
    server.post({ path: config.basePath('/file'),
        version: '1.0.0' },upload_disk, require('./v1').post)
    server.get({ path: config.basePath('/file/:id'),
        version: '1.0.0' }, require('./v1').get)
}
