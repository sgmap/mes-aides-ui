// this file is for use in CircleCI continuous integration environment
module.exports = {
    bail        : true,
    baseURL     : 'http://localhost:9000/init-ci',
    build       : 'CircleCI-' + process.env.CIRCLE_PROJECT_USERNAME + '-' + process.env.CIRCLE_PROJECT_REPONAME +'#' + process.env.CIRCLE_BUILD_NUM,
    driverCapabilities: {
        platform            : 'Windows 7',
    },
    quit        : 'always', // avoid wasting 90 seconds on SauceLabs
    seleniumServerURL : 'http://localhost:4444/wd/hub',
    tags        : [ 'circle-ci', '#' + process.env.CIRCLE_BUILD_NUM ],
    timeout     : 10000,
    views       : [ 'Verbose' ],
}
