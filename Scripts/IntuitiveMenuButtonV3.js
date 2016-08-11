//=========================================================================
// Emoji Engine
//=========================================================================

/*:
 * =========================================================================
 *  ■ Basic Header
 * -------------------------------------------------------------------------
 * @plugindesc Permit to create Menu/back button for menu, battle and map.
 * <EmojiEngine>
 * @author Nio Kasgami
 * @version 3.00
 * @requires nothing
 * =========================================================================
 * 
 * =========================================================================
 *  ■ Exclude Files from being erased on deployment
 * -------------------------------------------------------------------------
 * @requiredAssets img/System/mapMenuButton
 * @requiredAssets img/System/backMenuButton
 * =========================================================================
 * 
 * =========================================================================
 *  -> pluginParameters
 * -------------------------------------------------------------------------
 * @param Main_Menu_Pos
 * @desc The position X and Y of the main menu back button.
 * @default [10, 0]
 * 
 * @param Map_Button_Pos
 * @desc The position X and Y of the map menu button.
 * @default [10, 0]
 */

if (Utils.RPGMAKER_VERSION === "1.0.0" || Utils.RPGMAKER_VERSION === "1.1.0" || Utils.RPGMAKER_VERSION === "1.2.0" ) {
    throw new Error("IntuitiveMobileButton was meant to work with RPG Maker MV 1.3 or above, please update your project");
}

var imported = imported || {};
imported.Emoji = imported.Emoji || {};
imported.Emoji.IntuitiveMobileButton = '3.00';

//==============================================================================
// ■ Emoji
//==============================================================================

/**
 * The static class who hold useful plugin params conversion. (little version)
 * @static
 */
function Emoji() {
    throw new Error("This a static class");
}

/**
 * Will convert a parameters to a boolean.
 * @param { PluginManager } plugin the plugin variable.
 * @param { String } parameters the parameters name in string.
 */
Emoji.toBoolean = function (plugin, parameters) {
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
 * Will convert the parameter string into a array.
 * @param {PluginManager} plugin the plugin variable.
 * @param {String} parameters the parameters name in string.
 */
Emoji.toArray = function (plugin, parameters) {
    var oldString = String(plugin[parameters]);
    var newString = oldString.slice(1, -1);
    return newString.split(',').map(function (i) { return Number(i) || 0; });
};

/**
 * Will get the plugin id instead of the plugin name avoiding errors.
 * @author Lavra
 * @param {String} plugin The id of the plugin.
 */
Emoji.setPluginID = function (plugin) {
    return $plugins.filter(function (p) { return p.description.contains("<" + plugin + ">"); })[0].parameters;
};

//===============================================================================
// => END : Emoji
//===============================================================================

//==============================================================================
// ■ Emoji.PluginParam
//==============================================================================

var emoji = emoji || {};
emoji.alias = emoji.alias || {}; // used for store alias.
emoji.parameters = Emoji.setPluginID('EmojiEngine');
emoji.params = emoji.params || {};

emoji.params.mainMenuPos = Emoji.toArray(emoji.parameters, 'Main_Menu_Pos');
emoji.params.mapPos = Emoji.toArray(emoji.parameters, 'Map_Button_Pos');

//===============================================================================
// => END : Emoji
//===============================================================================

//==============================================================================
// ■ SceneManager
//==============================================================================

/**
 * Return the current scene who are rendering.
 * @static
 * @returns {Stage} return a scene.
 */
SceneManager.currentScene = function () {
    return this._scene;
};

//===============================================================================
// => END : SceneManager
//===============================================================================

//==============================================================================
// ■ Game_Temp
//==============================================================================

emoji.alias.N01 = Game_Temp.prototype.setDestination;
Game_Temp.prototype.setDestination = function (x, y) {
    var button = SceneManager.currentScene()._button;
    if (!button.isButtonTouched()) {
        emoji.alias.N01.call(this, x, y);
    }
};

//===============================================================================
// => END : Game_Temp
//===============================================================================

//==============================================================================
// ■ Scene_Boot
//==============================================================================

emoji.alias.N02 = Scene_Boot.prototype.create;
Scene_Boot.prototype.create = function () {
    emoji.alias.N02.call(this);
    ImageManager.loadSystem('mapMenuButton');
    ImageManager.loadSystem('backButton');
};

//===============================================================================
// => END : Scene_Boot
//===============================================================================

//==============================================================================
// ■ Scene_MenuBase
//==============================================================================

Scene_MenuBase.prototype._currentWindow = null; // the current window selected.

/**
 * Will create the button.
 */
Scene_MenuBase.prototype.createButton = function () { };

/**
 * Define wich action happen when the user click on the button.
 */
Scene_MenuBase.prototype.currentHandler = function () {
    SoundManager.playCancel();
};

/**
 * Will Pop the scene when the user click on the button.
 */
Scene_MenuBase.prototype.onMain = function () {
    this.setTrigger('Main');
    this.popScene();
};

/**
 * Will return the current window the button is setup
 * @returns {String} The current window.
 */
Scene_MenuBase.prototype.currentWindow = function () {
    return this._currentWindow;
};

Scene_MenuBase.prototype.update = function () {
    Scene_Base.prototype.update.call(this);
    if (Input.isRepeated('escape') || TouchInput.isCancelled()) {
        this.updateTheCurrentFlag();
    }
};

/**
 * Will make sure the current window don't bug when clicking escape or right mouse.
 */
Scene_MenuBase.prototype.updateTheCurrentFlag = function () { };

/**
 * Will setup the Trigger for the window.
 * @param { String } trigger The trigger from the current window who are selected.
 */
Scene_MenuBase.prototype.setTrigger = function (trigger) {
    this._currentWindow = trigger;
};

//===============================================================================
// => END : Scene_MenuBase
//===============================================================================

//==============================================================================
// ■ Scene_Menu
//==============================================================================

Scene_Menu.prototype.createButton = function () {
    Scene_MenuBase.prototype.createButton.call(this);
    this._button = new Sprite_Button();
    this._button.bitmap = ImageManager.loadSystem('backButton');
    this._button.x = this.buttonScreenX();
    this._button.y = this.buttonScreenY();
    this._button.setClickHandler(this.currentHandler.bind(this));
    this.setTrigger('Main');
    this.addChild(this._button);
};

Scene_Menu.prototype.buttonScreenX = function () {
    return (Graphics.boxWidth / 2) + emoji.params.mainMenuPos[0];
};

Scene_Menu.prototype.buttonScreenY = function () {
    return (Graphics.boxHeight / 2) + emoji.params.mainMenuPos[1];
};

Scene_Menu.prototype.currentHandler = function () {
    Scene_MenuBase.prototype.currentHandler.call(this);
    switch (this.currentWindow()) {
        case 'Main': this.onMain(); break;
        case 'OnActor': this.onActorCancel(); break;
        case 'OnFormation': this.onFormationActorCancel(); break;
    }
};

Scene_Menu.prototype.onActorCancel = function () {
    this.setTrigger('Main');
    this.onPersonalCancel();
};

Scene_Menu.prototype.onFormationActorCancel = function () {
    this.setTrigger('Main');
    this.onFormationCancel();
};

