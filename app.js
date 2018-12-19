'use strict';

const Homey = require('homey');
const Log = require('homey-log').Log;

class MyApp extends Homey.App {
	
	onInit() {
		this.log('MyApp is running...');

		// Register triggers for flows
		this._triggerSwitchOneOn = new Homey.FlowCardTriggerDevice('trigger_switch_1_on').register();
		this._triggerSwitchOneOff = new Homey.FlowCardTriggerDevice('trigger_switch_1_off').register();

		this._triggerSwitchTwoOn = new Homey.FlowCardTriggerDevice('trigger_switch_2_on').register();
		this._triggerSwitchTwoOff = new Homey.FlowCardTriggerDevice('trigger_switch_2_off').register();

		this._triggerSwitchThreeOn = new Homey.FlowCardTriggerDevice('trigger_switch_3_on').register();
		this._triggerSwitchThreeOff = new Homey.FlowCardTriggerDevice('trigger_switch_3_off').register();

		this._triggerSwitchFourOn = new Homey.FlowCardTriggerDevice('trigger_switch_4_on').register();
		this._triggerSwitchFourOff = new Homey.FlowCardTriggerDevice('trigger_switch_4_off').register();
	}

}

module.exports = MyApp;