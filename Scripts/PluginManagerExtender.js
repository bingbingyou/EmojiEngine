/*:
 * =========================================================================
 *  ■ Basic Header
 * -------------------------------------------------------------------------
 * @plugindesc Extends the pluginManager with many useful built-in method.
 * To be use for create plugins with more clean code.
 * <EmojiEngine>
 * @author Nio Kasgami
 * @version 3.00
 * @license  MIT
 * @requires nothing
 * =========================================================================
 */

//==============================================================================
// ■ PluginManager
//==============================================================================

/**
 * Will convert the parameters in a Array containing only numbers.
 * The format in the pluginManager is [number,number,number,againNumber]
 * @param {Plugin} plugin The plugin variable.
 * @param {String} parameters The parameters name in string.
 * @static
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
    return plugin[parameters].split(',').map(function (i) { return Number(i) || 0; });
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
    if (n === 'true') {
        return true;
    } else if (n === 'false') {
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
PluginManager.setPluginID = function (plugin) {
    return $plugins.filter(function (p) { return p.description.contains("<" + + ">"); })[0].parameters;
};




