﻿<%@ page language="C#" autoeventwireup="true" inherits="test, App_Web_agyah52i" %>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html>
<head>
<title>普通地图&全景图</title>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<script type="text/javascript" src="http://api.map.baidu.com/api?v=1.3"></script>
</head>

<body>
<div id="normal_map">
   
</div>
<div id="panorama"> 
    <table rules="all" align="left" cellspacing="1" class="style1">
        <tr>
            <td >
                &nbsp;sssss</td>
            <td>
                &nbsp;ssss</td>
            <td>
                &nbsp;sssss</td>
        </tr>
    </table>
    </div>

<style type="text/css">
body, html{width: 100%;height: 100%;overflow: hidden;margin:0;}
#panorama {height: 50%;overflow: hidden;}
#normal_map {height:50%;overflow: hidden;}
    .style1
    {
        width: 100%;
        border: 1px solid #33CCFF;
        
    }
</style>
<script type="text/javascript">
//全景图展示
//var panorama = new BMap.Panorama('panorama');
//panorama.setPosition(new BMap.Point(120.320032, 31.589666)); //根据经纬度坐标展示全景图
//panorama.setPov({heading: -40, pitch: 6});

//panorama.addEventListener('position_changed', function(e){ //全景图位置改变后，普通地图中心点也随之改变
//    var pos = panorama.getPosition();
//    map.setCenter(new BMap.Point(pos.lng, pos.lat));
//    marker.setPosition(pos);
//});


//普通地图展示
var mapOption = {
        mapType: BMAP_NORMAL_MAP,
        maxZoom: 18,
        drawMargin:0,
        enableFulltimeSpotClick: true,
        enableHighResolution:true
    }
var map = new BMap.Map("normal_map", mapOption);
var testpoint = new BMap.Point(120.320032, 31.589666);
map.centerAndZoom(testpoint, 18);
var marker=new BMap.Marker(testpoint);
marker.enableDragging();
map.addOverlay(marker);  
marker.addEventListener('dragend',function(e){
alert(e.point.lng);
//    panorama.setPosition(e.point); //拖动marker后，全景图位置也随着改变
//    panorama.setPov({heading: -40, pitch: 6});
    }
);

</script>
</body>
</html>