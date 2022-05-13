var ghpages = require('gh-pages');

ghpages.publish(
    'public',
    {
        branch: 'gh-pages',
        repo: 'https://github.com/skandabhairava/skandabhairava.github.io.git',
        user: {
            name: 'skandabhairava',
            email: 'skandabhairava@gmail.com'
        }
    },
    () => {
        console.log('Deploy Complete!')
    }
)
