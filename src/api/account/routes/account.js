'use strict';

/**
 * account router
 */

const { createCoreRouter } = require('@strapi/strapi').factories;

module.exports = createCoreRouter('api::account.account', {
    prefix: '',
    only: ['find', 'create'],
    except: [],
    config: {
        find: {},
        create: {}
    }
});