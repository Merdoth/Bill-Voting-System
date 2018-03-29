/*eslint-disable */
module.exports = {
  'Should display homepage and check for available elements': (browser) => {
    browser
      .url('http://localhost:8000/')
      .assert.urlEquals('http://localhost:8000/')
      .waitForElementVisible('body')
      .assert.visible('.home-header')
      .assert.visible('.logo')
      .assert.visible('.logo-text')
      .assert.visible('.home-body')
      .assert.visible('.home-date')
      .assert.visible('#home-desc')
      .assert
      .containsText('#home-desc', 'Making better decision for tomorrows leaders')
      .assert.visible('.quote')
      .assert
      .containsText('.quote', 'We grant people the opportunity to vote for or against bills that affect their lives and existence. We give voice to the citizenry and participants in legislation.')
      .assert.visible('#home-vote-link')
      .assert
      .containsText('#home-vote-link', 'Vote Now')
      .assert.visible('#home-icon')
      .assert
      .containsText('#home-icon', 'chevron_right')
      .assert.visible('.home-image')
      .pause(5000)
  },
  'Should display sign in and check for available elements': (browser) => {
    browser
      .url('http://localhost:8000/')
      .waitForElementVisible('body')
      .click('#sign-link')
      .assert.urlEquals('http://localhost:8000/signin')
      .waitForElementVisible('body')
      .assert.visible('.login-header')
      .assert
      .containsText('.login-header', 'Sign In')
      .assert.visible('#sign-icon')
      .assert
      .containsText('#sign-icon', 'person')
      .assert.visible('form')
      .assert.visible('input[name=email]')
      .assert.visible('input[name=password]')
      .assert.visible('#signIn-button')
      .assert.visible('#signUp-link')
      .click('#signUp-link')
      .pause(2000)
      .assert.urlEquals('http://localhost:8000/register')
      .pause(5000);
  },
  'Should display sign up and check for available elements': (browser) => {
    browser
      .waitForElementVisible('body')
      .assert.urlEquals('http://localhost:8000/register')
      .waitForElementVisible('body')
      .assert.visible('.login-header')
      .assert
      .containsText('.login-header', 'Create an account')
      .assert.visible('#sign-icon')
      .assert
      .containsText('#sign-icon', 'person')
      .assert.visible('form')
      .assert.visible('input[name=fullName]')
      .assert.visible('input[name=userName]')
      .assert.visible('input[name=email]')
      .assert.visible('input[name=password]')
      .setValue('input[name=fullName]', 'Sarah Gigs')
      .setValue('input[name=userName]', 'Sarah')
      .setValue('input[name=email]', 'sarah.gigs@gmail.com')
      .setValue('input[name=password]', '123456789')
      .assert.visible('#disclaimer')
      .assert
      .containsText('#disclaimer', 'Services is provided through a secured connection. If you have difficulty creating a user please contact your site administrator.')
      .waitForElementVisible('#dashboard-btn', 3000)
      .assert.visible('#dashboard-btn')
      .click('#dashboard-btn')
      .pause(5000);
   },
  'Should display all bills page and bill detail page and check for available elements': (browser) => {
    browser
      .waitForElementVisible('body')
      .assert.urlEquals('http://localhost:8000/bills')
      .waitForElementVisible('body')
      .assert.visible('.dashboard-container')
      .assert.visible('.welcome-caption')
      .assert.visible('#search')
      .assert
      .containsText('#search', 'search')
      .assert.visible('#user-img')
      .assert
      .containsText('#user-img', 'account_circle')
      .assert.visible('.username-format')
      .assert
      .containsText('.username-format', 'Welcome,')
      .assert.visible('.bill-header')
      .assert
      .containsText('.bill-header', 'Bills')
      .assert.visible('.bill-body')
      .assert.visible('.upvote-count')
      .assert.visible('.downvote-count')
      .waitForElementVisible('#main-bill-detail', 3000)
      .assert.visible('#main-bill-detail')
      .click('#main-bill-detail')
      .pause(3000)
      .assert.visible('.billProgress')
      .assert.visible('.created-time')
      .assert
      .containsText('.created-time', 'Created')
      .assert.visible('.bill-desc-body')
      .assert.visible('.social-content')
      .assert.visible('.share-button')
      .assert.visible('#desc-desc')
      .assert.visible('.bill-desc-footer')
      .assert.visible('#upvote')
      .assert
      .containsText('#upvote', 'upvote')
      .assert.visible('#downvote')
      .assert
      .containsText('#downvote', 'downvote')
      .assert.visible('form')
      .assert.visible('.opinion-input')
      .assert.visible('input[name=opinion]')
      .setValue('input[name=opinion]', 'this bill but be a joke')
      .click('#opinion-form')
      .assert.visible('#opinion-id')
      .assert
      .containsText('#opinion-id', 'Opinion')
      .assert.visible('.opinions')
      .assert.visible('.opinion-box')
  },
  'Should display user profile page and update user profile and check for available elements': (browser) => {
    browser
      .waitForElementVisible('body')
      .click('#user-profile')
      .waitForElementVisible('body')
      .assert.visible('.dashboard-container')
      .assert.visible('.edit-wrapper')
      .assert
      .containsText('.edit-wrapper', 'Update Profile')
      .assert.visible('form')
      .assert.visible('input[name=fullName]')
      .assert.visible('input[name=userName]')
      .assert.visible('input[name=email]')
      .clearValue('input[name=fullName]')
      .setValue('input[name=fullName]', 'Sarah G')
      .clearValue('input[name=userName]')
      .setValue('input[name=userName]', 'Sarahsweet')
      .clearValue('input[name=email]')
      .setValue('input[name=email]', 'sarah.gi@gmail.com')
      .assert.visible('#update')
      .click('#update')
  },
  'Should allow a user view his/her voted bills': (browser) => {
    browser
      .waitForElementVisible('body')
      .click('#user-votedBills')
      .waitForElementVisible('body')
      .assert.visible('.dashboard-container')
      .assert.visible('.bill-header')
      .assert
      .containsText('.bill-header', 'Bills')
      .assert.visible('#no-votedBills')
      .assert
      .containsText('#no-votedBills', 'Sadly nothing to show :)')
  },
  'Should allow a user logout': (browser) => {
    browser
      .waitForElementVisible('body')
      .assert.visible('#logout')
      .click('#logout')
  },
}
