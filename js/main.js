const tabs = document.querySelectorAll(".tabs__list-item");
const tabsContent = document.querySelectorAll(".tabs-content__item");

window.innerWidth < 768 ? initMobileTabs() : initDesktopTabs();

window.addEventListener("resize", function () {
  window.innerWidth < 768 ? initMobileTabs() : initDesktopTabs();
});

function initMobileTabs() {
  tabs.forEach(function (tab) {
    const activeTab = tab.getAttribute("rel");
    const activeContent = document.querySelector("#" + activeTab);

    tab.appendChild(activeContent);
  });
}

function initDesktopTabs() {
  const deskTabContent = document.querySelectorAll(".tabs__list .tabs-content__item");
  const deskTabContainer = document.querySelector(".tabs-content");

  deskTabContent.forEach((el) => {
    deskTabContainer.append(el);
  });
}

tabs.forEach(function (tab) {
  tab.addEventListener("click", function () {
    const activeTab = tab.getAttribute("rel");
    const activeTabContent = document.querySelector("#" + activeTab);

    if (this.classList.contains("active")) return;

    tabsContent.forEach((el) => {
      el.classList.remove("fadeIn");
    });

    activeTabContent.classList.add("fadeIn");

    tabs.forEach((el) => {
      el.classList.remove("active");
    });

    this.classList.add("active");
  });
});
