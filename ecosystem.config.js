module.exports = {
    apps : [{
        name: "cryptogrowth",
        script: "./server/index.js",
        env: {
            NODE_ENV: "production"
        }
    }, {
        name: "daily job",
        script: "./server/jobs/daily.js",
        autorestart: false,
        cron_restart: "0 1 * * *"
    }]
};
