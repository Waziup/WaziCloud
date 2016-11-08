"use strict";

/**
 * Global Variable Configuration
 * Configure which global variables which will be exposed automatically by Sails.
 */

module.exports = {
  wm: {
    /**
     * Expose openchain server endpoint
     * @type {String}
     */
    orionendpoint:"http://broker.waziup.io/",

    /**
     * Expose openchain admin email
     * @type {String}
     */
    mail: "ousmanesamba@gmail.com",

    /**
     * Expose the openchain admin phone number
     * @type {String}
     */
    phone: "775171783",


    /**
     * Expose the openchain system admin Private Key
     * @type {String}
     */
    system_private_key: "",

  }
};
