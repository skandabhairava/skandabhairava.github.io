var ghpages = require('gh-pages');

ghpages.publish(
    'public',
    {
        branch: 'gh-pages',
        repo: 'https://github.com/anthony2be/skandabhairava.github.io.git',
        user: {
            name: 'Anthony2be',
            email: 'adubovitsky1234@gmail.com'
        }
    },
    () => {
        console.log('Deploy Complete!')
    }
)