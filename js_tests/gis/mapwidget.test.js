/* global module, test, MapWidget */
/* eslint global-strict: 0, strict: 0 */
'use strict';

module('gis.OLMapWidget');

test('MapWidget.featureAdded', function(assert) {
    var options = {id: 'id_point', map_id: 'id_point_map', geom_name: 'Point'};
    var widget = new MapWidget(options);
    assert.equal(widget.featureCollection.getLength(), 1);
    widget.serializeFeatures();
    assert.equal(
        document.getElementById('id_point').value,
        '{"type":"Point","coordinates":[7.8177,47.397]}',
        'Point added to vector layer'
    );
});

test('MapWidget.map_srid', function(assert) {
    var options = {id: 'id_point', map_id: 'id_point_map', geom_name: 'Point'};
    var widget = new MapWidget(options);
    assert.equal(widget.map.getView().getProjection().getCode(), 'EPSG:3857', 'SRID 3857');
});

test('MapWidget.defaultCenter', function(assert) {
    var options = {id: 'id_point', map_id: 'id_point_map', geom_name: 'Point'};
    var widget = new MapWidget(options);
    assert.equal(widget.defaultCenter().toString(), '0,0', 'Default center at 0, 0');
    options.default_lat = 47.08;
    options.default_lon = 6.81;
    widget = new MapWidget(options);
    assert.equal(
        widget.defaultCenter().toString(),
        '6.81,47.08',
        'Default center at 6.81, 47.08'
    );
    assert.equal(widget.map.getView().getZoom(), 12);
});

test('MapWidget.interactions', function(assert) {
    var options = {id: 'id_point', map_id: 'id_point_map', geom_name: 'Point'};
    var widget = new MapWidget(options);
    assert.equal(Object.keys(widget.interactions).length, 2);
    assert.equal(widget.interactions.draw.getActive(), false, "Draw is inactive with an existing point");
    assert.equal(widget.interactions.modify.getActive(), true, "Modify is active with an existing point");
});

test('MapWidget.clearFeatures', function(assert) {
    var options = {id: 'id_point', map_id: 'id_point_map', geom_name: 'Point'};
    var widget = new MapWidget(options);
    widget.clearFeatures();
    assert.equal(document.getElementById('id_point').value, "");
});

test('MapWidget.multipolygon', function(assert) {
    var options = {id: 'id_multipolygon', map_id: 'id_multipolygon_map', geom_name: 'MultiPolygon'};
    var widget = new MapWidget(options);
    assert.ok(widget.options.isCollection);
    assert.equal(widget.interactions.draw.getActive(), true, "Draw is active with no existing content");
});
