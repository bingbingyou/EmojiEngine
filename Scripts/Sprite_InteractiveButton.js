/**
 * The class who hold interactive button
 */

function Sprite_InteractiveButton() {
    this.initialize.apply(this, arguments);
}
Sprite_InteractiveButton.prototype.constructor = Sprite_InteractiveButton;
Sprite_InteractiveButton.prototype = Object.create(Sprite_Button.prototype);

Sprite_InteractiveButton.prototype.initialize = function (bitmap) {
    Sprite_Button.prototype.initialize.call(this, bitmap);
    
};