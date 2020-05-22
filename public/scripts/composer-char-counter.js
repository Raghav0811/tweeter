var $;

$(function() {
  const characterCount = ".new-tweet textarea";
  function updateCount() {
    let remaining = 140 - $(this).val().length;
    $(this).siblings("span").text(remaining);
    if (remaining < 0) {
      $(this).siblings("span").addClass("alertText");
    } else {
      $(this).siblings("span").removeClass("alertText");
    }
  }

  $(characterCount).keyup(updateCount);
  $(characterCount).mouseup(updateCount);
  $(characterCount).mouseout(updateCount);
  $(characterCount).change(updateCount);

});