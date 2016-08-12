/*:
 * @plugindesc It's a dummy lolololol.
 * <Dummy>
 * @author Nio Kasgami
 * @version 1.00
 * @requires PluginManagerExtender
 * @license None it's a dummy projects
 * 
 * @param ArrayNumber
 * @desc for show that array works
 * @default [10,0]
 */

var dummy = PluginManager.setPluginID('Dummy');
dummy.params = dummy.params || {};

dummy.params.arrayNumber = PluginManager.toNumberArray(dummy, 'ArrayNumber');