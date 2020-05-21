/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */
var $;

$(function() {

  const addingTweets = {
    successfulTweet: function (event) {
      event.preventDefault();
      const input = $("textarea");
      if (input.val().length > 140) {
        $(".submit-tweet").prepend($("<div>").addClass("tweet-error").text("Slow down babe, 140 is the magic number").fadeIn(200).fadeOut(5000));
        return;
      }
      if (!input.val()) {
        $(".submit-tweet").prepend($("<div>").addClass("tweet-error").text("Couldn't catch that, you talkin to me?").fadeIn(200).fadeOut(5000));
        return;
      }
      if (input.val() === null) {
        $(".submit-tweet").prepend($("<div>").addClass("tweet-error").text("Couldn't catch that, you talkin to me").fadeIn(200).fadeOut(5000));
        return;
      }

      const tweetContent = $(".submit-tweet").serialize();
      $.post("/tweets", tweetContent, function () {
        $("textarea").val("");
        loadTweets();
      });
    },
  };
  $(".submit-tweet").submit(addingTweets.successfulTweet);

  function loadTweets() {
    $.ajax({
      url: "/tweets",
      method: "GET",
      data: $(".submit-tweet").serialize(),
      dataType: "json",
      success: function (data) {
        renderTweets(data);
      }
    });
  }
  loadTweets();

  function renderTweets(tweetsArray) {
    $(".all-tweets").empty();
    tweetsArray.forEach(tweetData => {
      $(".all-tweets").prepend(createTweetElement(tweetData));
    });
  }

  