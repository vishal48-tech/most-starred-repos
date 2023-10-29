document.addEventListener("DOMContentLoaded", () => {
  const startDate = document.getElementById("start-date");
  const endDate = document.getElementById("end-date");
  const btnSearch = document.getElementById("btn-search");

  const today = new Date();

  const year = today.getFullYear();
  const month = today.getMonth() + 1;
  const day = today.getDate();

  const formattedDate = year + "-" + month + "-" + day;

  response = () => {
    const response = document.getElementById("show");
    if (startDate.value > formattedDate) {
      response.innerHTML = `<h1>Select start date today or less than today</h1>`;
      setTimeout(function () {
        response.innerHTML = ``;
      }, 3000);
    } else {
      if (endDate.value > formattedDate) {
        endDate.value = formattedDate;
      } else if (endDate.value < startDate.value) {
        response.innerHTML = `<h1>End date should be greater than the start date</h1>`;
        setTimeout(function () {
          response.innerHTML = ``;
        }, 3000);
      } else {
        isoStartDate = new Date(startDate.value).toISOString();
        isoEndDate = new Date(endDate.value).toISOString();
        fetch(`https://api.github.com/search/repositories?q=+created:${isoStartDate}..${isoEndDate}&sort=stars&order=desc`)
          .then((response) => response.json())
          .then((data) => {
            let displayItems = ``;
            for (let i = 0; i < 30; i++) {
              const item = data.items[i];
              let itemname = item.name;
              let stars = item.stargazers_count;
              let itempage = item.html_url;
              let desc = item.description;
              if(desc ==null){
                desc="";
              }
              displayItems += `
              <div id="card">
                <div id="name">
                <h4>Name: </h4><a href="${itempage}" target="blank">${itemname}</a>
                </div>
                <p>Description: ${desc}</p>
                <p>Stars: ${stars}</p>
              </div>
            `;
            }
            response.innerHTML = displayItems;
          });
      }
    }
  };
});
