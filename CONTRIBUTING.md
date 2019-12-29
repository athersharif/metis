# Contributing

Thank you for contributing to this project! Your feedback, comments, proposed solutions, fixes, concerns, and criticism are very welcome and super appreciated!

## Issues

If you come across an issue that you'd like fixed or propose a solution, the best way to do this is to create a Github issue [here](https://github.com/athersharif/metis/issues). Adding labels is an icing on the cake!

## Pull Requests

If you'd like to add functionality to this project and propose a fix for an issue created as per above, the best way to do this is to create a pull request. Following are some suggestions to get started.

### 1. Forking the repo

You can fork the repo by clicking on the fork button at the top right of the repo page. Once forked, you can clone your fork on your local by doing the following using cli:

`git clone https://github.com/<your-github-username>/metis.git`

### 2. Adding origin and remote branches

In order to keep track and push to the base branch, you can add the origin and remote branch by doing the following using cli:

`git remote add origin https://github.com/<your-github-username>/metis.git`

`git remote add upstream https://github.com/athersharif/metis.git`

### 3. Making changes

You can start making changes by creating a branch for the purpose of the change:

`git checkout -b fix-for-issue-123`

Changes in a branch should be specific to the purpose it's for and should only contain the minimum code needed to achieve that and just that. While it can get tempting to add more than needed, all additional changes should be a branch of their own.

### 4. Adding tests

[Jest](https://jestjs.io/) and [Enzyme](https://airbnb.io/enzyme/) are used as testing frameworks and for coverage. Adding/modifying tests for the proposed changes and ensuring that the coverage is at 100% is crucial. To run tests in watch mode:

`npm run test`

To generate coverage report:

`npm run test:coverage`

### 5. Documentation

[JSDoc](https://github.com/jsdoc/jsdoc) is used for documentation. It's important to follow the guidelines for JSDoc to add informative and descriptive comments and documentation to the code.

### 6. Create a pull request

After doing all the above, you're now ready to create a pull request of your proposed changes. Once you create a pull request and the build passes, one of the admins will review the PR. Review usually results in clarifications or further suggestions, which once addressed would allow the code to be merged into the master branch. Please note that only the admins are allowed to merge the code into the master branch.

Thank you again for contributing! <3