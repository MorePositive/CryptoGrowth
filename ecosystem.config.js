module.exports = {
    apps : [{
        name: "cryptogrowth",
        script: "~/cryptogrowth/server/index.js",
        env: {
            NODE_ENV: "production"
        }
    }, {
        name: "daily job",
        script: "~/cryptogrowth/server/jobs/daily.js",
        cron_restart: "0 1 * * *"
    }]
};
