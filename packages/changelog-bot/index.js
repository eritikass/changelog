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
    subject {
      id
    }
    commentEdge {
      node {
        id
      }
    }
  }
}
`

// doesnt work, permissions issue?
const addReaction = `
mutation addReaction($id: ID!) {
  addReaction(input: {subjectId: $id, content:HOORAY, clientMutationId: "AutoChanges"}) {
    clientMutationId
  }
}
`

module.exports = robot => {
    robot.on('pull_request.opened', async context => {
        const pullRequestInfo = await context.github.query(getPullRequestInfo, {
            "owner": context.payload.repository.owner.login,
            "repository": context.payload.repository.name,
            "pullRequest": context.payload.pull_request.number
        })

        console.log('PullRequestInfo: ');
        console.log(pullRequestInfo)

        const commentInfo = await context.github.query(addComment, {
            id: pullRequestInfo.repository.pullRequest.id,
            body: 'AutoChanages bot checked you pull request, preparing Changelog updates!\n\n' +
            '[https://github.com/OmIkRoNiXz/changelog-test/pull/1](url)'
        })

        console.log('CommentInfo: ');
        console.log(commentInfo);
        console.log(commentInfo.addComment.commentEdge);

        const reactionInfo = await context.github.query(addReaction, {
            id: commentInfo.addComment.commentEdge.node.id
        })

        console.log('ReactionInfo: ')
        console.log(reactionInfo);
    })
}
