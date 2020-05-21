/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */
const renderTweets = function(tweets) {
  if (Array.isArray(tweets)) {
    return tweets.forEach(tweet => {
      $('#tweets-container').prepend(createTweetElement(tweet));
    });
  } else {
    return $('#tweets-container').prepend(createTweetElement(tweets));
  }
};

