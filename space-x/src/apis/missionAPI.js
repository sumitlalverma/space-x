
// A mock function to mimic making an async request for data
export function fetchSpacexLaunchesAPI(selectedFilter = {}) {
  return new Promise((resolve) => {
    let URL = `https://api.spacexdata.com/v3/launches?limit=100`;
    Object.keys(selectedFilter).forEach((filter) => {
      if (selectedFilter[filter]) URL += `&${filter}=${selectedFilter[filter]}`;
    })

    fetch(URL)
      .then(resp => resp.json())
      .then(resp => {
        resolve({ data: resp });
      })
  });
}
