import React, { useState, useEffect } from "react";
import loadJs from "load-js";

export default function InlandDriveVworld() {

  const [redraw, setRedraw] = useState(0);
  const apiKey = "987DB43F-A2A1-3C3B-818F-68E7B9D7E786";
  

  useEffect(() => {
    console.log("redraw:", redraw);
  }, [redraw]);

  useEffect(() => {
    loadJs(
      "http://map.vworld.kr/js/vworldMapInit.js.do?version=2.0&apiKey=${apiKey}&domain=booking.plism.com"
    ).then(function () {
      // console.log(window.vw);
      // console.log("1. jQuery and react are loaded");

      loadJs("http://map.vworld.kr/jquery/ol3/jquery-1.11.3.min.js").then(
        function () {
          // console.log(window.vw);
          // console.log("2. jQuery and react are loaded");

          loadJs("http://map.vworld.kr/jquery/ol3/jquery-ui.min.js").then(
            function () {
              // console.log(window.vw);
              // console.log("4. jQuery and react are loaded");

              loadJs(
                "http://map.vworld.kr/js/map/OpenLayers-3.10.1/ol.js"
              ).then(function () {
                // console.log(window.vw);
                // console.log("5. jQuery and react are loaded");

                loadJs(
                  "http://map.vworld.kr/js/map/chart/ol3/v2.raphael.js"
                ).then(function () {
                  // console.log(window.Raphael);
                  // console.log("6. jQuery and react are loaded");

                  loadJs(
                    "http://map.vworld.kr/js/map/chart/ol3/v2.g.raphael.max.js"
                  ).then(function () {
                    // console.log(window.Raphael);
                    // console.log("7. jQuery and react are loaded");

                    loadJs(
                      "http://map.vworld.kr/js/map/chart/ol3/v2.g.bar.max.js"
                    ).then(function () {
                      // console.log("8. jQuery and react are loaded");

                      loadJs(
                        "http://map.vworld.kr/js/map/chart/ol3/v2.g.pie.max.js"
                      ).then(function () {
                        // console.log("9. jQuery and react are loaded");

                        loadJs("vw.ol3.2DMapClassInit_v30.js").then(
                          function () {
                            // console.log("10. jQuery and react are loaded");

                            loadJs(
                              "http://map.vworld.kr/js/sopMapInit.js.do?version=2.0&amp;apiKey=${apiKey}"
                            ).then(function () {
                              // console.log("11. jQuery and react are loaded");

                              loadJs(
                                "http://map.vworld.kr/check2DNum.do?version=2.0&amp;key=${apiKey}"
                              ).then(function () {
                                // console.log("12. jQuery and react are loaded");
                                
                                let point = [
                                  ["반출지", "PNDKC	신항다목적터미널", 35.0741, 128.8341],
                                  ["반입지", "KCTCC	KCTC 부산C", 35.1082, 129.095],
                                  ["도어지", "도어지", 35.5229200184625, 129.243116174947],
                                ];
                            
                                let move = [
                                  [
                                    "작업지출발 부산98사1680 (2021-10-21 오전 8:42:08)",
                                    "충청북도 청주시 청원구 오창읍 주성리 648-0 도레이비에스에프코팅한국 120m지점",
                                    36.731132,
                                    127.446426,
                                  ],
                                  [
                                    "하차도착 부산98사1680 (2021-10-21 오후 2:27:02)",
                                    "부산광역시 남구 감만동 521-10 한진택배감만택배터미널 58m지점",
                                    35.109359,
                                    129.078888,
                                  ],
                                  [
                                    "부산98사1680 (2021-10-21 오전 2:27:05)",
                                    "부산광역시 남구 감만동 521-10 한진택배감만택배터미널 59m지점",
                                    35.109291,
                                    129.078876,
                                  ],
                                  [
                                    "부산98사1680 (2021-10-21 오전 2:27:10)",
                                    "부산광역시 남구 감만동 521-10 한진택배감만택배터미널 58m지점",
                                    35.109285,
                                    129.078886,
                                  ],
                                ];
                                drawMap(point, move);
                              });
                            });
                          }
                        );
                      });
                    });
                  });
                });
              });
            }
          );
        }
      );
    });

    return () => {
      console.log("unload");
      window.jQuery(".ol-viewport").remove();
    };
  }, []);


  const mapClassinit = () => {
    
  }

  const drawMap = (point, move) => {
    console.log("vworldMapExecute.......");

    const vw = window.vw;
    const ol = window.ol;

    let vmap;
    

    let coordinates = []; //좌표 설정 라인 좌표를 저장

    let features = new Array(); // feature 배열

    vw.ol3.MapOptions = {
      basemapType: vw.ol3.BasemapType.GRAPHIC,
      controlDensity: vw.ol3.DensityType.EMPTY,
      interactionDensity: vw.ol3.DensityType.FULL,
      controlsAutoArrange: true,
      homePosition: vw.ol3.CameraPosition,
      initPosition: vw.ol3.CameraPosition,
    };

    vmap = new vw.ol3.Map("map", vw.ol3.MapOptions); //객체 생성

    let markerLayer = new vw.ol3.layer.Marker(vmap);
    vmap.addLayer(markerLayer);

    for (let i = 0; i < point.length; i++) {
      vw.ol3.markerOption = {
        x: point[i][3] * 1,
        y: point[i][2] * 1,
        epsg: "EPSG:4326",
        title: point[i][0],
        contents: point[i][1],
        iconUrl: "http://maps.google.com/mapfiles/ms/icons/red-dot.png",
        text: {
          offsetX: 0.5, //위치설정
          offsetY: 20, //위치설정
          font: "12px Calibri,sans-serif",
          fill: { color: "#000" },
          stroke: { color: "#fff", width: 2 },
          text: "테스트마커" + i,
        },
        attr: { id: "maker" + i, name: "속성명" + i },
      };
      markerLayer.addMarker(vw.ol3.markerOption);
    }

    for (let i = 0; i < move.length; i++) {
      vw.ol3.markerOption = {
        x: move[i][3] * 1,
        y: move[i][2] * 1,
        epsg: "EPSG:4326",
        title: move[i][0],
        contents: move[i][1],
        iconUrl: "http://map.vworld.kr/images/ol3/marker_blue.png",
        text: {
          offsetX: 0.5, //위치설정
          offsetY: 20, //위치설정
          font: "12px Calibri,sans-serif",
          fill: { color: "#000" },
          stroke: { color: "#fff", width: 2 },
          text: "테스트마커",
        },
        attr: { id: "makera", namea: "속성명" },
      };
      markerLayer.addMarker(vw.ol3.markerOption);
    }

    let style = new ol.style.Style({
      stroke: new ol.style.Stroke({
        color: [0, 100, 0, 0.7], //투명도
        width: 3, //두께
      }),
    }); // 스타일 설정

    let iconStyle = new ol.style.Style({
      image: new ol.style.Icon({
        anchor: [0.5, 25], // 위치설정
        anchorXUnits: "fraction",
        anchorYUnits: "pixels",
        src: "http://map.vworld.kr/images/ol3/marker_blue.png",
      }),
    }); //Point에 마커 디자인을 설정

    //feature 배열 셋팅 feature 에 속성 정보를 저장
    for (let i = 0; i < move.length; i++) {
      //Feature 객체에 저장하여 활용
      features[i] = new ol.Feature({
        geometry: new ol.geom.Point(
          ol.proj.transform(
            [move[i][3] * 1, move[i][2] * 1],
            "EPSG:4326",
            "EPSG:900913"
          )
        ),
        title: move[i][0],
        road: move[i][1],
      }); // get, set 과 같으며 속성값을 저장함

      features[i].set("id", "dron1_point_" + (i + 1));
      features[i].setStyle(iconStyle); // 스타일 지정
      coordinates.push(
        ol.proj.transform(
          [move[i][3] * 1, move[i][2] * 1],
          "EPSG:4326",
          "EPSG:900913"
        )
      );
    }

    //라인 저장
    let line_feature = new ol.Feature({
      geometry: new ol.geom.LineString(coordinates),
      id: "dron1_line",
    });

    line_feature.setStyle(style);
    features.push(line_feature);

    let vectorSource = new ol.source.Vector({
      features: features,
      id: "dron1_vector",
    });

    let vectorLayer = new ol.layer.Vector({
      source: vectorSource,
      id: "dron1_layer",
    });

    vmap.getLayers().forEach(function (layer) {
      if (layer.get("id") == "dron1_layer") {
        vmap.removeLayer(layer);
      }
    });
    vmap.addLayer(vectorLayer);
  };

  const handleClick = (e) => {
    setRedraw(redraw + 1);
    // console.log(window.vw);
  };

  return (
    <div id={redraw}>
      <div id="map" style={{ width: "500px", height: "400px" }}></div>
      <button text="test" onClick={handleClick}>
        button
      </button>
    </div>
  );
}
