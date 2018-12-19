'use strict';

const Homey = require('homey');
const ZigBeeDevice = require('homey-meshdriver').ZigBeeDevice;

class WallSwitch4 extends ZigBeeDevice {

	async onMeshInit() {
		// enable debugging
		this.enableDebug();

		// print the node's info to the console
		this.printNode();


		// Register onoff.1 capability
		this.registerCapability('onoff.1', 'genOnOff', {
			getOpts: {
				pollInterval: 2000,
			},
			endpoint: 0
		});
		this.registerAttrReportListener('genOnOff', 'onOff', 1, 3600, 1,
			this.switchOneAttrListener.bind(this), 0, true);

		// Register conditions for flows
		this._conditionSwitchOne = new Homey.FlowCardCondition('condition_switch_1').register()
			.registerRunListener((args, state) => {
				return Promise.resolve(this.getCapabilityValue('onoff.1'));
			});

		// Register actions for flows
		this._actionSwitchOneOn = new Homey.FlowCardAction('action_switch_1_on').register()
			.registerRunListener((args, state) => {
				return this.triggerCapabilityListener('onoff.1', true, {});
			});
		this._actionSwitchOneOff = new Homey.FlowCardAction('action_switch_1_off').register()
			.registerRunListener((args, state) => {
				return this.triggerCapabilityListener('onoff.1', false, {});
			});


		// Register onoff.2 capability
		this.registerCapability('onoff.2', 'genOnOff', {
			getOpts: {
				pollInterval: 2000,
			},
			endpoint: 2
		});
		this.registerAttrReportListener('genOnOff', 'onOff', 1, 3600, 1,
			this.switchTwoAttrListener.bind(this), 2, true);

		// Register conditions for flows
		this._conditionSwitchTwo = new Homey.FlowCardCondition('condition_switch_2').register()
			.registerRunListener((args, state) => {
				return Promise.resolve(this.getCapabilityValue('onoff.2'));
			});

		// Register actions for flows
		this._actionSwitchTwoOn = new Homey.FlowCardAction('action_switch_2_on').register()
			.registerRunListener((args, state) => {
				return this.triggerCapabilityListener('onoff.2', true, {});
			});
		this._actionSwitchTwoOff = new Homey.FlowCardAction('action_switch_2_off').register()
			.registerRunListener((args, state) => {
				return this.triggerCapabilityListener('onoff.2', false, {});
			});


		// Register onoff.3 capability
		this.registerCapability('onoff.3', 'genOnOff', {
			getOpts: {
				pollInterval: 2000,
			},
			endpoint: 4
		});
		this.registerAttrReportListener('genOnOff', 'onOff', 1, 3600, 1,
			this.switchThreeAttrListener.bind(this), 4, true);

		// Register conditions for flows
		this._conditionSwitchThree = new Homey.FlowCardCondition('condition_switch_3').register()
			.registerRunListener((args, state) => {
				return Promise.resolve(this.getCapabilityValue('onoff.3'));
			});

		// Register actions for flows
		this._actionSwitchThreeOn = new Homey.FlowCardAction('action_switch_3_on').register()
			.registerRunListener((args, state) => {
				return this.triggerCapabilityListener('onoff.3', true, {});
			});
		this._actionSwitchThreeOff = new Homey.FlowCardAction('action_switch_3_off').register()
			.registerRunListener((args, state) => {
				return this.triggerCapabilityListener('onoff.3', false, {});
			});


		// Register onoff.4 capability
		this.registerCapability('onoff.4', 'genOnOff', {
			getOpts: {
				pollInterval: 2000,
			},
			endpoint: 6
		});
		this.registerAttrReportListener('genOnOff', 'onOff', 1, 3600, 1,
			this.switchFourAttrListener.bind(this), 6, true);

		// Register conditions for flows
		this._conditionSwitchFour = new Homey.FlowCardCondition('condition_switch_4').register()
			.registerRunListener((args, state) => {
				return Promise.resolve(this.getCapabilityValue('onoff.4'));
			});

		// Register actions for flows
		this._actionSwitchFourOn = new Homey.FlowCardAction('action_switch_4_on').register()
			.registerRunListener((args, state) => {
				return this.triggerCapabilityListener('onoff.4', true, {});
			});
		this._actionSwitchFourOff = new Homey.FlowCardAction('action_switch_4_off').register()
			.registerRunListener((args, state) => {
				return this.triggerCapabilityListener('onoff.4', false, {});
			});
	}


	// Method to handle changes to attributes
	switchOneAttrListener(data) {
		this.log('[switchOneAttrListener] Received data =', data);
		let currentValue = this.getCapabilityValue('onoff.1');
		this.setCapabilityValue('onoff.1', data === 1);
		if (currentValue !== (data === 1)) {
			Homey.app[`_triggerSwitchOne${data === 1 ? 'On' : 'Off'}`].trigger(this, {}, {}).catch(this.error);
		}
	}

	switchTwoAttrListener(data) {
		this.log('[switchTwoAttrListener] Received data =', data);
		let currentValue = this.getCapabilityValue('onoff.2');
		this.setCapabilityValue('onoff.2', data === 1);
		if (currentValue !== (data === 1)) {
			Homey.app[`_triggerSwitchTwo${data === 1 ? 'On' : 'Off'}`].trigger(this, {}, {}).catch(this.error);
		}
	}

	switchThreeAttrListener(data) {
		this.log('[switchThreeAttrListener] Received data =', data);
		let currentValue = this.getCapabilityValue('onoff.3');
		this.setCapabilityValue('onoff.3', data === 1);
		if (currentValue !== (data === 1)) {
			Homey.app[`_triggerSwitchThree${data === 1 ? 'On' : 'Off'}`].trigger(this, {}, {}).catch(this.error);
		}
	}

	switchFourAttrListener(data) {
		this.log('[switchFourAttrListener] Received data =', data);
		let currentValue = this.getCapabilityValue('onoff.4');
		this.setCapabilityValue('onoff.4', data === 1);
		if (currentValue !== (data === 1)) {
			Homey.app[`_triggerSwitchFour${data === 1 ? 'On' : 'Off'}`].trigger(this, {}, {}).catch(this.error);
		}
	}


	// <<<< Temporary till until Zigbee Meshdriver bug is fixed.
	// See https://github.com/athombv/homey/issues/2137
	// Rewrite parent method to overcome Zigbee Meshdriver bug.
	_mergeSystemAndUserOpts(capabilityId, clusterId, userOpts) {

		// Merge systemOpts & userOpts
		let systemOpts = {};

		let tempCapabilityId = capabilityId;
		let index = tempCapabilityId.lastIndexOf('.');
		if (index !== -1) {
			tempCapabilityId = tempCapabilityId.slice(0, index)
		}

		try {
			systemOpts = Homey.util.recursiveDeepCopy(require(`../../node_modules/homey-meshdriver/lib/zigbee/system/capabilities/${tempCapabilityId}/${clusterId}.js`));

			// Bind correct scope
			for (let i in systemOpts) {
				if (systemOpts.hasOwnProperty(i) && typeof systemOpts[i] == 'function') {
					systemOpts[i] = systemOpts[i].bind(this);
				}
			}
		}
		catch (err) {
			if (err.code !== 'MODULE_NOT_FOUND' || err.message.indexOf(`../../node_modules/homey-meshdriver/lib/zigbee/system/capabilities/${tempCapabilityId}/${clusterId}.js`) < 0) {
				process.nextTick(() => {
					throw err;
				});
			}
		}

		// Insert default endpoint zero
		if (userOpts && !userOpts.hasOwnProperty('endpoint')) userOpts.endpoint = this.getClusterEndpoint(clusterId);
		else if (typeof userOpts == 'undefined') userOpts = {
			endpoint: this.getClusterEndpoint(clusterId)
		};

		this._capabilities[capabilityId][clusterId] = Object.assign(
			systemOpts || {},
			userOpts || {}
		);
	}
}

module.exports = WallSwitch4;