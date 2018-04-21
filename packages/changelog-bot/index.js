const getPullRequestInfo = `
query getPullRequestInfo($owner: String!, $repository: String!, $pullRequest: Int!) {
  repository(owner: $owner, name: $repository) {
    pullRequest(number: $pullRequest) {
      id
      number
      title
    }
  }
}
`

module.exports = robot => {
    robot.on('pull_request', async context => {
        console.log(context.payload);

        const resource  = await context.github.query(getPullRequestInfo, {
            "owner": context.payload.repository.owner.login,
            "repository": context.payload.repository.name,
            "pullRequest": context.payload.pull_request.number
        })

        console.log(resource);
    })
}