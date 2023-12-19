/* eslint-disable no-empty */
import config from '../config'
import { Client, Databases, Storage, Query } from 'appwrite'

export class Service {
    client = new Client()
    databases;
    bucket;

    constructor() {
        this.client.setEndpoint(config.appWriteUrl).setProject(config.appWriteProjectId);
        this.databases = new Databases(this.client)
        this.bucket = new Storage(this.client)
    }

    async createPost({ title, slug, discription, featureImage, status, userId }) {
        try {
            return await this.databases.createDocument(config.appWriteDataBaseId,
                config.appWriteCollectionId,
                slug, { title, discription, featureImage, status, userId })
        } catch (error) {
            console.log("🚀 ~ file: appwriteConfig.js:20 ~ Service ~ createPost ~ error:", error)
            throw error
        }
    }
    async updatePost(slug, { title, discription, featureImage, status }) {
        try {
            return await this.databases.updateDocument(config.appWriteDataBaseId,
                config.appWriteCollectionId,
                slug, { title, discription, featureImage, status })
        } catch (error) {
            console.log("🚀 ~ file: appwriteConfig.js:33 ~ Service ~ updatePost ~ error:", error)
            throw error
        }
    }
    async deletePost(slug) {
        try {
            return await this.databases.deleteDocument(config.appWriteDataBaseId,
                config.appWriteCollectionId,
                slug)
        } catch (error) {
            console.log("🚀 ~ file: appwriteConfig.js:33 ~ Service ~ updatePost ~ error:", error)
            throw error
        }
    }
    async getPosts(queries = [Query.equal("status", true)]) {
        try {
            return await this.databases.listDocuments(config.appWriteDataBaseId,
                config.appWriteCollectionId, queries
            )
        } catch (error) {
            console.log("🚀 ~ file: appwriteConfig.js:33 ~ Service ~ updatePost ~ error:", error)
            throw error
        }
    }
    async getPost(slug) {
        try {
            return await this.databases.getDocument(config.appWriteDataBaseId,
                config.appWriteCollectionId, slug
            )
        } catch (error) {
            console.log("🚀 ~ file: appwriteConfig.js:33 ~ Service ~ updatePost ~ error:", error)
            throw error
        }
    }

}

const service = new Service()
export default service

