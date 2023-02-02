'use strict';

/**
 * account controller
 */

const { uploadProductsImagesData, deleteProductsImagesData } = require('../imageUpload')

const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::account.account', ({ strapi }) => ({
    async find(ctx) {
        const userId = ctx.state.user.id
        const data = await strapi.db.query('api::account.account').findOne({
            where: {
                user: {
                    id: {
                        $eq: userId
                    }
                }
            },
        });
        if (data === null) {
            return { success: true, data: "", message: "Empty Account Info" }
        }
        delete data.id

        return { success: true, data, message: "Get Account Info" }
    },

    async create(ctx) {
        const userId = ctx.state.user.id
        const data = await strapi.db.query('api::account.account').findOne({
            where: {
                user: {
                    id: {
                        $eq: userId
                    }
                }
            }
        });

        const bodyData = JSON.parse(ctx.request.body.data);
        const { bio, category, creatorMode, applyVerification, displayName } = bodyData
        const imageBaseData = ctx.request.body.imageData
        const updateData = {
            bio: bio,
            category: category,
            creator: creatorMode,
            applyVerification: applyVerification,
            displayName: displayName,
            user: userId
        }

        let imageDelete = false
        if (imageBaseData != null) {
            const imgInfo = await uploadProductsImagesData(imageBaseData)
            if (imgInfo.message === 'Successfull') {
                updateData.displayPicture = imgInfo.data.imageURL;
            }
            imageDelete = true
        }
        if (data !== null) {
            if (imageDelete === true) {
                await deleteProductsImagesData(data.displayPicture)
            }
            delete updateData.user
            await strapi.db.query('api::account.account').update({
                where: { id: data.id },
                data: updateData,
            });

            return { success: true, message: "Account Info updated" }
        }
        const checkData = await strapi.db.query('api::account.account').create({
            data: updateData,
        });
        return { success: true, message: "Account Info created" }
    }
}));