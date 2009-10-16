$(document).ready(function() {
	var map = new GMap2($("#map").get(0));
	var latlng = new GLatLng(35.62665751854956, 139.7216534614563);
	map.setCenter(latlng, 12);
	
	// 基準点を示すためのマーカー
	var marker = new GMarker(latlng);
	map.addOverlay(marker);
	
	var label1 = new GLabel(latlng, "マーカーと同じ緯度経度");
	map.addOverlay(label1);
	
	var label2 = new GLabel(latlng, "下に20ピクセルずらす", new GPoint(0,20));
	map.addOverlay(label2);
	
	var label3 = new GLabel(latlng, "改行\nも\nできる", new GPoint(0,40));
	map.addOverlay(label3);
});