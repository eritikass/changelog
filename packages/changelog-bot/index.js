const getPullRequestInfo = `
query getPullRequestInfo($owner: String!, $repository: String!, $pullRequest: Int!) {
  repository(owner: $owner, name: $repository) {
    pullRequest(number: $pullRequest) {
      id
      number
      title
      headRefName
      commits(last: 1) {
        edges {
          node {
          	commit {
              message
            }
          }
        }
      }
    }
  }
}
`

const addComment = `
mutation addComment($id: ID!, $body: String!) {
  addComment(input: {subjectId: $id, body: $body, clientMutationId: "AutoChanges"}) {
    clientMutationId
  }
}
`

module.exports = robot => {
    robot.on('pull_request.opened', async context => {
        const resource  = await context.github.query(getPullRequestInfo, {
            "owner": context.payload.repository.owner.login,
            "repository": context.payload.repository.name,
            "pullRequest": context.payload.pull_request.number
        })

        await context.github.query(addComment, {
            id: resource.repository.pullRequest.id,
            body: 'AutoChanages bot checked you pull request, preparing Changelog updates!'
        })

        console.log(resource);
    })
}