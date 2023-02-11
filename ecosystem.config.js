module.exports = {
    apps : [{
        name:'my-app',
        script: 'source/index.js',
        watch: true,
        instances:'max-1',
        exec_mode:'cluster',
        max_memory_restart:'300M',
        ignore_watch:['node_modules','logs'],
        wait_ready:true,
        restart_delay:3000,
        autorestart:true,
        env:{
            PORT:8000,
            NODE_ENV:'development'
        },

        env_production: {
            PORT:8080,
            NODE_ENV: 'production'
        }
    }]

    // deploy : {
    //   production : {
    //     user : 'SSH_USERNAME',
    //     host : 'SSH_HOSTMACHINE',
    //     ref  : 'origin/master',
    //     repo : 'GIT_REPOSITORY',
    //     path : 'DESTINATION_PATH',
    //     'pre-deploy-local': '',
    //     'post-deploy' : 'npm install && pm2 reload ecosystem.config.js --env production',
    //     'pre-setup': ''
    //   }
    // }

};
