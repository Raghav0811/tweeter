/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */
var $;

const escape =  function(str) {
  let div = document.createElement('div');
  div.appendChild(document.createTextNode(str));
  return div.innerHTML;
}

$(function() {

  const addingTweets = {
    successfulTweet: function (event) {
      event.preventDefault();
      const input = $("textarea");
      if (input.val().length > 140) {
        $(".submit-tweet").prepend($("<div>").addClass("tweet-error").text("Slow down babe, 140 is the magic number").fadeIn(200).fadeOut(3000));
        return;
      }
      if (!input.val()) {
        $(".submit-tweet").prepend($("<div>").addClass("tweet-error").text("Couldn't catch that, you talkin to me?").fadeIn(200).fadeOut(3000));
        return;
      }
      if (input.val() === null) {
        $(".submit-tweet").prepend($("<div>").addClass("tweet-error").text("Couldn't catch that, you talkin to me").fadeIn(200).fadeOut(3500));
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

  //Toggle New-Tweet Menu//
  $(".compose").on("click", function () {
    $(".new-tweet").slideToggle("fast", function() {
    });
    $("textarea").focus();
  });

  //Button change when clicked//
  $(".compose").on("click", function () {
    $(".compose").stop().toggleClass("compose-clicked");
  });

  //Function for time ago on tweets//
  function timeSince(date) {
    var seconds = Math.floor((new Date() - date) / 1000);
    var interval = Math.floor(seconds / 31536000);
    if (interval > 1) {
      return interval + " years";
    }
    interval = Math.floor(seconds / 2592000);
    if (interval > 1) {
      return interval + " months";
    }
    interval = Math.floor(seconds / 86400);
    if (interval > 1) {
      return interval + " days";
    }
    interval = Math.floor(seconds / 3600);
    if (interval > 1) {
      return interval + " hours";
    }
    interval = Math.floor(seconds / 60);
    if (interval > 1) {
      return interval + " minutes";
    }
    return Math.floor(seconds) + " seconds";
  }

  function createTweetElement(tweetObject) {
    const $tweet = $("<article>").addClass("tweet");

    const $img = $("<img>").addClass("avatar").attr("src", tweetObject.user.avatars);
    const $handle = $("<p>").addClass("handle").text(tweetObject.user.handle);
    const $user = $("<p>").addClass("user").text(tweetObject.user.name);

    const $header = $("<header>")
      .append($img)
      .append($user)
      .append($handle);

    $tweet.append($header);

    //Tweet Content//
    const $contentDetail = $("<p>").addClass("tweet-detail").text(tweetObject.content.text);
    const $contentContainer = $("<div>").addClass("tweet-content").append($contentDetail);

    $tweet.append($contentContainer);

    //Tweet Footer//
    const createdAt = $("<p>").text(timeSince(tweetObject.created_at) + " ago");
    const favouriteIcon = $("<i>").addClass("fa fa-star-o");
    const retweetIcon = $("<i>").addClass("fa fa-retweet");
    const flagIcon = $("<i>").addClass("fa fa-exclamation-triangle");

    const $footerTime = $("<div>").addClass("time-ago").append(createdAt);
    const $footerIcons = $("<div>").addClass("icons").append(favouriteIcon, retweetIcon, flagIcon);

    const $footer = $("<footer>")
      .append($footerTime)
      .append($footerIcons);

    $tweet.append($footer);
    return $tweet;
  }
});