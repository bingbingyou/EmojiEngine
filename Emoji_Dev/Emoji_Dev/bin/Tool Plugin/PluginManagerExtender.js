/*:
 * =========================================================================
 *  ■ Basic Header
 * -------------------------------------------------------------------------
 * @plugindesc Extends the pluginManager with many useful built-in method.
 * To be use for create plugins with more clean code.
 * <EmojiEngine>
 * @author Nio Kasgami
 * @version 3.0.0
 * @license  https://github.com/niokasgami/EmojiEngine/blob/master/LICENSE ( Under Tool Plugin license)
 * @requires nothing
 * =========================================================================
 */

'use strict';
var imported = imported || {};
imported.PluginManager = '3.0.0';

//==============================================================================
// ■ PluginManager
//==============================================================================


/**
 * Will convert the parameters in a Array using a list method (Only for number)
 * The format in the pluginManager is number,number,number,againANumber
 * @param {Plugin} plugin The plugin variable.
 * @param {String} parameters The parameters name in string.
 * @static
 * @deprecated since 3.00
 */
PluginManager.toNumberList = function (plugin, parameters) {
    return plugin[parameters].split(',').map(function (i) { return Number(i) || 0; });
};

/**
 * Will conver the parameters in a Array using a list method (Only for string)
 * The format in the pluginManager is string,string,string,againAString
 * @param {Plugin} plugin The plugin variable.
 * @param {String} parameters The parameters name in string.
 * @static
 * @deprecated since 3.00
 */
PluginManager.toStringList = function (plugin, parameters) {
    return plugin[parameters].split(',').map(function (i) { return String(i) || ''; });
};

/**
 * Will convert the parameters string into a boolean or make sure it's a boolean.
 * @param {Plugin} plugin The plugin variable.
 * @param {String} parameters The parameters name in string.
 */
PluginManager.toBoolean = function (plugin, parameters) {
    var n = plugin[parameters];
    if (n === 'true' || n === '1') {
        return true;
    } else if (n === 'false' || n === '0') {
        return false;
    } else {
        throw new Error(parameters + ' is a boolean. Please set it to true or false only.');
    }
};

/**
 * Will get the plugin ID in the plugin description instead of the plugin filename. 
 * Avoiding pluginName Errors.
 * @author Lavra
 * @param {String} plugin The id of the plugin in the format <idName>.
 */
PluginManager.getPluginID = function (plugin) {
    return $plugins.filter(function (p) { return p.description.contains('<' + plugin + '>'); })[0].parameters;
};

/**
 * Will convert the parameters string into a Point.
 * It's will works like using a point variables in code.
 * the syntax in the pluginManager is 1,0
 * @param {Plugin} plugin The plugin variable.
 * @param {String} parameters The parameters name in string.
 */
PluginManager.toPoint = function (plugin, parameters) {
    var param = PluginManager.toArray(plugin, parameters);
    return new Point(param[0], param[1]);
};

// TODO : make sure the bitmap preload on the assignation??
PluginManager.toBitmap = function (plugin, parameters, folder) {
    var bitmap = plugin[parameters];
};

/**
 * Will convert the parameter to a Number.
 * @static
 * @param {PluginManager} plugin 
 * @param {String} parameters
 * @returns {Number}
 */
PluginManager.toNumber = function (plugin, parameters) { 
    return Number(plugin[parameters])
};

/**
 * Will convert the parameters to a probability number 
 * wich is a float number clamped to a value of 0 to 
 * @static
 * @param {PluginManager} plugin
 * @param {String} parameters
 * @returns {Number}
 */
PluginManager.toProbability = function(plugin, parameters){
    return Number(plugin[parameters]).clamp(0,1);
};
/**
 * Will convert the parameters into ANY JS legal Array.
 * The syntax is [someNumber,String,[String,Boolean],andAgainSomeValidArrayOperator]
 * or 1,2,3,4 etc
 * @static 
 * @param {PluginManager} plugin 
 * @param {string} parameters 
 * @returns {Array<any>} 
 */
Pluginmanager.toArray = function (plugin, parameters) {
  var array ;
  try {
     array = JSON.parse(plugin[parameters]);
  } catch (e) {
     try {
         array = JSON.parse('[' + plugin[parameters] + ']');
     } catch (e) {
         throw  "Parameter " + parameters + " is not a valid array";
     }
  }
  if (!array instanceof Array) {
    throw "Parameter " + parameters + " is not a valid array";
  }
  return array;
}

//===============================================================================
// => END : Emoji
//===============================================================================


/**
 * Deprecated Members.
 */
Object.defineProperties(PluginManager,
{
    toNumberList: {
        get: function () {
            console.warn('PluginManager.toNumberList is deprecated and will be removed in the next update. Please use toArray instead.');
        }
    },

    toStringList: {
        get function() {
            console.warn('PluginManager.toStringList is deprecated and will be removed in the next update. Please use toArray instead.');
        }
    }
});
