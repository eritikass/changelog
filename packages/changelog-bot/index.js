const createScheduler = require('probot-scheduler')

module.exports = async robot => {
    const scheduler = createScheduler(robot)

    const events = [
        'pull_request',
    ]

    robot.on(events, foobar)

    async function foobar (context) {
        if (!context.isBot) {
            context.log('test');
        }
    }
}