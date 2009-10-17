/**
 * GLabel class
 * copyright (c) 2009 KUOKA Yusuke - d.hatena.ne.jp/mumoshu
 * @version 1.0
 * @author KUOKA Yusuke
 * @requires GOverlay
 * @extends GOverlay
 */

/**
 * @constructor
 * @base GOVerlay
 * @param {GLatLng}
 *            latlng
 * @param {String}
 *            text
 * @param {GPoint}
 *            anchor ラベルのDIV左上隅を基準とした、ラベルが地図に固定される場所のピクセル座標（デフォルト：new
 *            GPoint(0,0)）
 */
function GLabel(latlng, text, anchor) {
	this.latlng_ = latlng;
	this.text_ = text || "";
	this.anchor_ = anchor || new GPoint(0, 0);

	this.weight_ = 1;
}

GLabel.prototype = new GOverlay();

GLabel.prototype.initialize = function(map) {
	var div = document.createElement("div");
	// TODO make it customizable with external css'
	div.style.border = this.weight_ + "px solid #888888";
	div.style.background = "#eeeeee";
	// do not break the line
	div.style.whiteSpace = "pre";
	div.style.position = "absolute";
	div.textContent = this.text_;
	div.className = "glabel";

	map.getPane(G_MAP_MARKER_PANE).appendChild(div);

	this.map_ = map;
	this.div_ = div;
};

/**
 * Remove the main DIV from the map pane
 * 
 * @return
 */
GLabel.prototype.remove = function() {
	this.div_.parentNode.removeChild(this.div_);
};

/**
 * Copy our data to a new GLabel
 * 
 * @return {GLabel}
 */
GLabel.prototype.copy = function() {
	return new GLabel(this.latlng_, this.text_);
};

/**
 * Redraw the GLabel based on the current projection and zoom level
 * 
 * @param {Boolean}
 *            force 地図が動いて入れば<code>true</code>
 * @return
 */
GLabel.prototype.redraw = function(force) {
	// We only need to redraw if the coordinate system has changed
	// TODO clarify what does "force" mean
	if (!force)
		return;

	var p = this.map_.fromLatLngToDivPixel(this.latlng_);

	// Calculate the DIV coordinates
	this.div_.style.left = p.x - this.weight_ + this.anchor_.x
			- (this.div_.clientWidth / 2) + "px";
	this.div_.style.top = p.y - this.weight_ + this.anchor_.y + "px";
};
