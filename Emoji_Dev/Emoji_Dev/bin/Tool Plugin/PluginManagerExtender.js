/*:
 * =========================================================================
 *  ■ Basic Header
 * -------------------------------------------------------------------------
 * @plugindesc Extends the pluginManager with many useful built-in method.
 * To be use for create plugins with more clean code.
 * <EmojiEngine>
 * @author Nio Kasgami
 * @version 2.0.0
 * @license  https://github.com/niokasgami/EmojiEngine/blob/master/LICENSE ( Under Tool Plugin license)
 * @requires nothing
 * =========================================================================
 */

"use strict";
var imported = imported || {};
imported.PluginManager = "2.0.0";

//==============================================================================
// ■ PluginManager
//==============================================================================

/**
 * Will convert the parameters in a Array containing only numbers.
 * The format in the pluginManager is [number,number,number,againNumber]
 * @param {Plugin} plugin The plugin variable.
 * @param {String} parameters The parameters name in string.
 * @static
 * @deprecated since 2.0.0
 */
PluginManager.toNumberArray = function (plugin, parameters) {
    var oldString = String(plugin[parameters]);
    var newString = oldString.slice(1, -1);
    return newString.split(',').map(function (i) { return Number(i) || 0; });
};

/**
 * Will convert the parameters in a Array containing only strings.
 * The format in the pluginManager is [string, string,againsString]
 * @param {Plugin} plugin The plugin variable.
 * @param {String} parameters The parameters name in string.
 * @static
 * @deprecated since 2.00
 */
PluginManager.toStringArray = function (plugin, parameters) {
    var oldString = String(plugin[parameters]);
    var newString = oldString.slice(1, -1);
    return newString.split(',').map(function (i) { return String(i) || ""; });
};

/**
 * Will convert the parameters in a Array using a list method (Only for number)
 * The format in the pluginManager is number,number,number,againANumber
 * @param {Plugin} plugin The plugin variable.
 * @param {String} parameters The parameters name in string.
 * @static
 */
PluginManager.toNumberList = function (plugin, parameters) {
    return plugin[parameters].split(",").map(function (i) { return Number(i) || 0; });
};

/**
 * Will conver the parameters in a Array using a list method (Only for string)
 * The format in the pluginManager is string,string,string,againAString
 * @param {Plugin} plugin The plugin variable.
 * @param {String} parameters The parameters name in string.
 * @static
 */
PluginManager.toStringList = function (plugin, parameters) {
    return plugin[parameters].split(',').map(function (i) { return String(i) || ""; });
};

/**
 * Will convert the parameters string into a boolean or make sure it's a boolean.
 * @param {Plugin} plugin The plugin variable.
 * @param {String} parameters The parameters name in string.
 */
PluginManager.toBoolean = function (plugin, parameters) {
    var n = plugin[parameters];
    if (n === "true" || n === "1") {
        return true;
    } else if (n === "false" || n === "0") {
        return false;
    } else {
        throw new Error(parameters + " is a boolean. Please set it to true or false only.");
    }
};

/**
 * Will get the plugin ID in the plugin description instead of the plugin filename. 
 * Avoiding pluginName Errors.
 * @author Lavra
 * @param {String} plugin The id of the plugin in the format <idName>.
 */
PluginManager.getPluginID = function (plugin) {
    return $plugins.filter(function (p) { return p.description.contains("<" + plugin + ">"); })[0].parameters;
};

/**
 * Will convert the parameters string into a Point.
 * It's will works like using a point variables in code.
 * the syntax in the pluginManager is 1,0
 * @param {Plugin} plugin The plugin variable.
 * @param {String} parameters The parameters name in string.
 */
PluginManager.toPoint = function (plugin, parameters) {
    var param = PluginManager.toNumberList(plugin, parameters);
    return new Point(param[0], param[1]);
};

// TODO : make sure the bitmap preload on the assignation??
PluginManager.toBitmap = function (plugin, parameters, folder) {
    var bitmap = plugin[parameters];
};

// Convert to number I guess? Not that super useful since it's a easy to do methods.
PluginManager.toNumber = function (plugin, parameters) { };


/**
 * Will convert the parameters into ANY JS legal Array.
 * The syntax is [someNumber,String,[String,Boolean],andAgainSomeValidArrayOperator]
 * @static 
 * @param {PluginManager} plugin 
 * @param {string} parameters 
 * @returns {Array<any>} 
 */
PluginManager.toArray = function(plugin, parameters) {
    var array = JSON.parse(plugin[parameters]);
    try {
        if (!(array instanceof Array)) {
            throw "Let's force our parameters to be an array...";
        }
    } catch (e) {
        throw new Error(parameters + " is not a valid array");
    }
    return array;
};
//===============================================================================
// => END : Emoji
//===============================================================================


/**
 * Deprecated Members.
 */
Object.defineProperties(PluginManager,
{
    toNumberArray : {
        get: function() {
            console.warn("PluginManager.ToNumberArray is deprecated and will be removed in the next update. Please use toArray instead.");
        }
    },

    toStringArray : {
        get function() {
            console.warn("PluginManager.toStringArray is deprecated and will be removed in the next update. Please use toArray instead.")
        }
    }
});
