
const development = {
    name: 'development',
    asset_path: './assets',
    session_cookie_key: 'lolololol',
    db:'employee_review-sys', 

}

const production = {
    name : 'production',
    asset_path: process.env.EMP_SYS_ASSET_PATH ,
    session_cookie_key: process.env.EMP_SYS_SESSION_COOKIE_KEY,
    db: process.env.EMP_SYS_DB,
}

module.exports = eval(process.env.ENVIRONMENT) == undefined ? development : eval(process.env.ENVIRONMENT);
