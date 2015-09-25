var locationsMap = new Array();
    locationsMap['LONDON-USER'] = '1';
    locationsMap['LIVERPOOL-USER'] = '2';

module.exports.getLocation = function(userLocation) {
    return locationsMap[userLocation] ? locationsMap[userLocation] : null;
}