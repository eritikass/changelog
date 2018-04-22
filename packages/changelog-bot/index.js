const Render = require('./render')
var sys = require('sys')
var exec = require('child_process').exec;

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

exec('git config --global user.email "omikronixz@gmail.com"')
exec('git config --global user.name "Pavel Krolov"')
exec('git config --global hub.protocol https')

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
            body: 'AutoChanages bot checked you pull request, preparing Changelog updates!\n\n'
        })

        console.log('CommentInfo: ');
        console.log(commentInfo);
        console.log(commentInfo.addComment.commentEdge);
    })

    robot.on('pull_request.closed', async context => {
        console.log(context)

        const username = process.env.GIT_USER;
        const password = process.env.GIT_PASS;

        const repo_owner = 'eritikass';        // Replace with the owner of your repo.
        const repo_name  = 'alfa-beeta';             // Replace with the name of your repo

        console.log(process.env);
        const repo = Render.start(repo_owner, repo_name, username, password);
        Render.push_changelog(repo).then(() => console.log('Pushed changelog.'));
    })
}
