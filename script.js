let data = [
  [34.07849680756057, -118.40605703207703],
  [33.2167977986513, -117.22657713704665],
  [34.10468697846329, -118.41883751200126],
  [33.83308982447039, -117.5504730414748],
  [33.97519149086403, -118.42111070711853],
  [34.169591967498576, -118.37372143748009],
  [32.92544687422003, -96.83631093134231],
  [34.11404728214379, -118.36799679918605],
  [33.7431026677177, -117.0203151550579],
  [34.07833181655819, -117.61673131082242],
  [32.81198802942781, -117.13308154942611],
  [34.065779954852104, -118.38316844432863],
  [33.67546358484016, -117.72471637692058],
  [46.75220576828661, 2.992345455538942],
  [34.42207803616234, -118.57127541116985],
  [33.16390632509808, -117.2334322770585],
  [34.066366541965245, -118.38334010569909],
  [34.177244897202854, -118.6151942475037],
  [34.02757682023447, -118.47366683191012],
  [34.094452416286934, -118.41523262322185],
  [42.28521213689389, -83.48592395577408],
  [39.22595616096303, -84.65935876133675],
  [47.48880129565428, -122.30613208783888],
  [42.5598258405422, -83.1742940268849],
  [41.717395037104, -86.2056119040935],
  [34.028571057255554, -84.24069191420344],
  [37.351128551957224, -121.95075477721393],
  [28.466151257934776, -81.45911774216677],
  [51.520846631245334, -0.0891018880615397],
  [41.70625536303908, -71.46240890912135],
  [37.38862579135246, -122.07646274624842],
  [34.09686902175395, -118.42072578707621],
  [39.107586728483135, -84.5102841689871],
  [39.72466684043727, -84.19385686195973],
  [44.9568563827714, -93.43536914200469],
  [42.38165020459055, -71.1343310693436],
  [30.274980617063914, -81.48855439043352],
  [26.24543534066963, -81.80610474792023],
  [42.304682479960874, -71.12834923575217],
  [42.32999582379946, -83.0402252152621],
  [39.43833177979873, -83.82705310782941],
  [40.62464247006657, -80.0933600382325],
  [39.74020637851053, -75.5537023797999],
  [42.68651581263002, -83.12798863275363],
  [48.079009162618334, 11.522483824544828],
  [43.23628308565879, -71.57360824043084],
  [42.349701319729895, -71.10534664679578],
  [40.18912595478867, -75.16470170887274],
  [25.85808355544774, -80.18448350889692],
  [40.59792489259975, -74.62503628592145],
  [38.89747429486702, -77.04144687014474],
  [40.63802645212078, -73.64203868316487],
  [34.27395912737143, -83.89768139530783],
  [42.32464309060922, -83.48899037151831],
]
// data = [[52, 0]]
const getMapDimensions = () => {
  const mapElemnt = document.getElementById('mapElement')
  //   console.log(mapElemnt)
  const width = mapElemnt.offsetWidth
  const height = mapElemnt.offsetHeight
  // console.log(width, height)
  return { width, height }
}

const createMarkerDiv = ([lat, long]) => {
  const parentDiv = document.createElement('div')
  parentDiv.className = 'marker absolute'
  // const { width, height } = getMapDimensions()
  // const left = ((long + 180 - 20) * width) / 360
  // const top = height / 2 - (height / 2) * Math.sin((lat * Math.PI) / 180)
  // parentDiv.style.left = `${left}px`
  // parentDiv.style.top = `${top}px`
  // console.log('left, top: ', left, top)
  parentDiv.innerHTML = `
  <div class='rm-spacing'>
  <img src="./location-marker.svg" alt="marker" class="markerIcon" />
  <span class="tooltiptext">Info to be displayed goes here!</span>
</div>`
  return parentDiv
}

const applyPositions = () => {
  const { width, height } = getMapDimensions()
  markerWidth = (width * 0.75) / 80
  markerHeight = (markerWidth * 150) / 113
  markersArray.forEach((item, index) => {
    const lat = data[index][0]
    const long = data[index][1]
    const left = ((long + 180) * width) / 360 - markerWidth
    const ratio = 1 - Math.sin((lat * Math.PI) / 180)
    console.log('ratio: ', ratio, height, ratio / height)
    const top = (ratio * height) / 2 - markerHeight
    // height / 2 - (height / 2) * Math.sin((lat * Math.PI) / 180) - markerHeight
    // ((-lat + 90) * height) / 180 - markerHeight
    item.style.left = `${left}px`
    item.style.top = `${top}px`
    console.log('left, top: ', left, top)
  })
}

const innerContainer = document.getElementById('innerContainer')
let markersArray = []

setTimeout(() => {
  markersArray = data.map((item) => {
    const tempDiv = createMarkerDiv(item)
    innerContainer.appendChild(tempDiv)
    return tempDiv
  })
  console.log(markersArray)
  applyPositions()
  // innerContainer.appendChild(createMarkerDiv([51, 0]))
}, 1000)

visualViewport.addEventListener('resize', () => {
  applyPositions()
  console.log(getMapDimensions())
  // console.log(window.innerWidth * 0.8)
  // return
})
