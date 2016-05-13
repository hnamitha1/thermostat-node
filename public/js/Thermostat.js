'use strict';

function Thermostat(){
  this.DEFAULT_START_TEMP = 20
  this._temperature = this.DEFAULT_START_TEMP
  this.TEMP_CHANGE = 1
  this.MIN_TEMP = 10
  this.MAX_LIMIT_PSM_OFF = 32
  this.MAX_LIMIT_PSM_ON = 25
  this.powerSavingMode = true
  this.LOWER_ENERGY_LIMIT = 18
  this.UPPER_ENERGY_LIMIT = 25
}

Thermostat.prototype.getTemperature = function() {
  return this._temperature;
};

Thermostat.prototype.increaseTemp = function() {
  if(this.isMaximumTemperature()) {return;}
  return this._temperature += this.TEMP_CHANGE;
};

Thermostat.prototype.decreaseTemp = function() {
  if(this._temperature === this.MIN_TEMP){return;}
  return this._temperature -= this.TEMP_CHANGE;
};

Thermostat.prototype.isPowerSavingModeOn = function() {
  return this.powerSavingMode;
}

Thermostat.prototype.switchPowerSavingModeOn = function() {
  this.powerSavingMode = true;
};

Thermostat.prototype.switchPowerSavingModeOff = function() {
  this.powerSavingMode = false;
};

Thermostat.prototype.resetTemperature = function() {
  return this._temperature = this.DEFAULT_START_TEMP;
};

Thermostat.prototype.energyUsage = function() {
  if( this._temperature < this.LOWER_ENERGY_LIMIT ){return "low-usage";}
  if( this._temperature >= this.UPPER_ENERGY_LIMIT ){return "high-usage";}
  return "medium-usage";
};


Thermostat.prototype.isMaximumTemperature = function() {
  if (this.isPowerSavingModeOn() === false) {
    return this._temperature === this.MAX_LIMIT_PSM_OFF;
  }
  return this._temperature === this.MAX_LIMIT_PSM_ON;
};