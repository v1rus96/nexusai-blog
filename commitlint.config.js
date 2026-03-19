/** @type {import('@commitlint/types').UserConfig} */
module.exports = {
  extends: ['@commitlint/config-conventional'],
  
  // Custom rules for this project
  rules: {
    // Type case must be lowercase
    'type-case': [2, 'always', 'lower-case'],
    
    // Type is required
    'type-empty': [2, 'never'],
    
    // Subject case - sentence case preferred
    'subject-case': [2, 'always', 'sentence-case'],
    
    // Subject cannot be empty
    'subject-empty': [2, 'never'],
    
    // Subject max length (GitHub's line limit)
    'subject-max-length': [2, 'always', 72],
    
    // Subject should not end with a period
    'subject-full-stop': [2, 'never', '.'],
    
    // Body max line length
    'body-max-line-length': [2, 'always', 100],
    
    // Footer max line length
    'footer-max-line-length': [2, 'always', 100],
    
    // Allowed types for this project
    'type-enum': [
      2,
      'always',
      [
        // Core types from conventional commits
        'feat',     // New feature
        'fix',      // Bug fix
        'docs',     // Documentation changes
        'style',    // Code style changes (formatting, etc.)
        'refactor', // Code refactoring
        'perf',     // Performance improvements
        'test',     // Adding or updating tests
        'chore',    // Maintenance tasks
        
        // Additional types for this project
        'build',    // Build system or external dependencies
        'ci',       // CI/CD configuration changes
        'revert',   // Reverting previous commits
        'security', // Security improvements
        'content',  // Content changes (blog posts, etc.)
        'config',   // Configuration changes
        'deploy',   // Deployment related changes
        'hotfix'    // Critical fixes for production
      ]
    ],
    
    // Scope validation (optional but recommended areas)
    'scope-case': [2, 'always', 'lower-case'],
    
    // Custom scopes for this project
    'scope-enum': [
      1, // Warning level (not blocking)
      'always',
      [
        // Feature areas
        'blog',
        'content',
        'ui',
        'api',
        'auth',
        'search',
        'seo',
        'analytics',
        
        // Technical areas  
        'deps',
        'config',
        'ci',
        'docs',
        'security',
        'perf',
        'a11y', // accessibility
        
        // Component areas
        'header',
        'footer',
        'navbar',
        'sidebar',
        'post',
        'page',
        'layout',
        
        // Build/Deploy
        'build',
        'deploy',
        'vercel',
        'github'
      ]
    ]
  },
  
  // Help URL for commit format
  helpUrl: 'https://github.com/conventional-changelog/commitlint/#what-is-commitlint',
  
  // Custom prompt messages
  prompt: {
    questions: {
      type: {
        description: "Select the type of change that you're committing:",
        enum: {
          feat: {
            description: 'A new feature',
            title: 'Features',
            emoji: '✨'
          },
          fix: {
            description: 'A bug fix',
            title: 'Bug Fixes',
            emoji: '🐛'
          },
          docs: {
            description: 'Documentation only changes',
            title: 'Documentation',
            emoji: '📚'
          },
          style: {
            description: 'Changes that do not affect the meaning of the code',
            title: 'Styles',
            emoji: '💎'
          },
          refactor: {
            description: 'A code change that neither fixes a bug nor adds a feature',
            title: 'Code Refactoring',
            emoji: '📦'
          },
          perf: {
            description: 'A code change that improves performance',
            title: 'Performance Improvements',
            emoji: '🚀'
          },
          test: {
            description: 'Adding missing tests or correcting existing tests',
            title: 'Tests',
            emoji: '🚨'
          },
          build: {
            description: 'Changes that affect the build system or external dependencies',
            title: 'Builds',
            emoji: '🛠'
          },
          ci: {
            description: 'Changes to our CI configuration files and scripts',
            title: 'Continuous Integrations',
            emoji: '⚙️'
          },
          chore: {
            description: "Other changes that don't modify src or test files",
            title: 'Chores',
            emoji: '♻️'
          },
          revert: {
            description: 'Reverts a previous commit',
            title: 'Reverts',
            emoji: '🗑'
          },
          security: {
            description: 'Security improvements',
            title: 'Security',
            emoji: '🔒'
          },
          content: {
            description: 'Content changes (blog posts, articles)',
            title: 'Content',
            emoji: '📝'
          }
        }
      },
      scope: {
        description: 'What is the scope of this change (e.g. blog, ui, api)'
      },
      subject: {
        description: 'Write a short, imperative tense description of the change'
      },
      body: {
        description: 'Provide a longer description of the change'
      },
      isBreaking: {
        description: 'Are there any breaking changes?'
      },
      breakingBody: {
        description: 'A BREAKING CHANGE commit requires a body. Please enter a longer description of the commit itself'
      },
      breaking: {
        description: 'Describe the breaking changes'
      },
      isIssueAffected: {
        description: 'Does this change affect any open issues?'
      },
      issuesBody: {
        description: 'If issues are closed, the commit requires a body. Please enter a longer description of the commit itself'
      },
      issues: {
        description: 'Add issue references (e.g. "fix #123", "re #123")'
      }
    }
  }
};