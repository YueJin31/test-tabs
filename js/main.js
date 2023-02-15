$(".tabs-content__item").hide();
$(".tabs-content__item:first").show();

$(".tabs__list-item").on("click", function () {
  $(".tabs-content__item").hide();

  const activeTab = $(this).attr("rel");

  $("#" + activeTab).fadeIn("slow");

  $(".tabs__list-item").removeClass("active");
  $(this).addClass("active");

  $(".tabs-content__mobile").removeClass("active");
  $(".tabs-content__mobile[rel^='" + activeTab + "']").addClass("active");
});

$(".tabs-content__mobile").on("click", function () {
  $(".tabs-content__item").hide();

  const activeMobileTab = $(this).attr("rel");

  $("#" + activeMobileTab).fadeIn("slow");

  $(".tabs-content__mobile").removeClass("active");
  $(this).addClass("active");

  $(".tabs__list-item").removeClass("active");
  $(".tabs__list-item[rel^='" + activeMobileTab + "']").addClass("active");
});
